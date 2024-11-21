import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("authToken");

        const response = await axios.post(
          "http://localhost:8080/protected",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.response?.data?.message || err.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-zinc-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
        <p className="text-red-500">{error}</p>
        <Link to="/login" className="mt-4 text-blue-400 hover:underline">
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {user && (
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          Cookies.remove("authToken", { path: "/" });
          navigate("/login");
        }}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
