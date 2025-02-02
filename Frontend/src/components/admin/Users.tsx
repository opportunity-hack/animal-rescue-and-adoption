import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, User, Mail, Shield } from "lucide-react";
import { UserDetails } from "../../interfaces/User";
import axios from "axios";

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [email, setEmail] = useState<string>("");

  const fetchUsers = async () => {
    const response = await axios.get<UserDetails[]>(
      `${import.meta.env.VITE_G_API_URL}/get-admin-users`,
      { withCredentials: true }
    );
    const users = response.data;
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_G_API_URL}/add-admin-user`,
        { email },
        { withCredentials: true }
      );
      setEmail("");
      await fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-darkergreen text-white p-6 px-4 md:px-6 rounded-lg shadow-lg m-8"
    >
      <h2 className="text-2xl font-bold mb-4">Admin Users</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 p-2 rounded-md flex-grow w-full md:w-auto"
            placeholder="Add new admin email"
            required
          />
          <button
            type="submit"
            className="bg-sage text-darkestgreen px-4 py-2 rounded-md w-full md:w-auto flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Admin
          </button>
        </div>
      </form>
      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 p-4 rounded-md flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div className="flex items-center mb-2 md:mb-0">
                <User className="w-5 h-5 mr-2" />
                <span className="font-semibold">{user.email}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                <span className="text-sm mr-4">{user.email}</span>
                <Shield className="w-4 h-4 mr-1" />
                <span className="text-sm">{user.role.name}</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-4">No users found</div>
        )}
      </div>
    </motion.div>
  );
};

export default Users;
