import Redis from "ioredis";
const redisClient = new Redis(); // configure if needed
redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("error", (err) => console.error("Redis error:", err));

export default redisClient;
