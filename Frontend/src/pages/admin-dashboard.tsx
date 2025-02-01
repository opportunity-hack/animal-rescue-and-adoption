import React, { useEffect, useState } from "react";
import AnimalManagement from "../components/admin/AnimalManagement";
import TaskManagement from "../components/admin/TaskManagement";
import Navbar from "../components/Navbar";
import Users from "../components/admin/Users";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../hooks/useUser";
import NotLoggedIn from "../components/admin/NotLoggedIn";
import axios from "axios";

const AdminDashboard: React.FC = () => {
  const [hasAccess, setAccess] = useState<boolean | null>(null)
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await axios.post(`${import.meta.env.VITE_G_API_URL}/logout`, {}, { withCredentials: true })
    .then(() => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    })
    .then(() => {
      setTimeout(() => {
        navigate("/");
      }, 3000)
    });
  };

  const adminLinks = [
    { name: "Management", href: "#management" },
    { name: "Admins", href: "#admins" },
    { name: "Animals", href: "#animals" },
    { name: "Log out", href: "#", onClick: handleLogout },
  ];

  const { data: user } = useUser();

  useEffect(() => {
    const hasPerms = () => {
      if (!user || !user.data) return false;
      return user.data.role.perm_level > 5;
    };

    setAccess(hasPerms())
  }, [user])

  if(!user) return <NotLoggedIn hasUser={false}/>;
  if(!hasAccess) return <NotLoggedIn hasUser={true}/>;
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        links={adminLinks}
        title="NEWRR Admin Dashboard"
        onClick={() => navigate("/admin/dashboard")}
      />

      <div id="management">
        <TaskManagement />
      </div>
      <div id="admins">
        <Users />
      </div>
      <div id="animals">
        <AnimalManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;
