import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import redisClient from "../utils/redisClient.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id);
  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  };

  await redisClient.set(
    `user:${user._id}`,
    JSON.stringify(userData),
    "EX",
    3600
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 60 * 60 * 1000,
  });

  res.json({ message: "Logged in successfully" });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    // Generate JWT
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    // Cache user in Redis (excluding password)
    const userToCache = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    await redisClient.set(`user:${user._id}`, JSON.stringify(userToCache), {
      EX: 3600, // Set expiration in seconds (1 hour)
    });

    res.status(201).json(userToCache);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  await redisClient.del(`user:${req.user._id}`);
  res.json({ message: "Logged out successfully" });
};

export const adminOnlyRoute = (req, res) => {
  res.json({ message: "Welcome Admin!" });
};
