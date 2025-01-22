import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user && location.pathname === "/login") {
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;