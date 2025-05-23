import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Header_1, Profile } from "../assets";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get<User>("/api/auth/me", {
        withCredentials: true,
      });
      setUser(data);
      setForm({ name: data.name, email: data.email });
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put<User>(`/api/users/${user?._id}`, form, {
        withCredentials: true,
      });
      fetchProfile();
      setEditMode(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      await axios.delete(`/api/users/${user?._id}`, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (!user)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center px-4 py-8"
      style={{ backgroundImage: `url(${Header_1})` }}
    >
      <Link to="/">
        <img src="/icon.png" alt="Logo" className="h-16 mb-14" />
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <img
              src={Profile}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover mb-2 border-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Name</label>
            {editMode ? (
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 p-2 border rounded-md"
              />
            ) : (
              <p className="text-gray-800">{user.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            {editMode ? (
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mt-1 p-2 border rounded-md"
              />
            ) : (
              <p className="text-gray-800">{user.email}</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-6">
            {editMode ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Edit Profile
              </button>
            )}

            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={logout}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              <LogOut />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
