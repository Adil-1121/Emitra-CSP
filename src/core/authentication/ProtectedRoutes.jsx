import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
    const token = localStorage.getItem("token");
    const locked = localStorage.getItem("locked") === "true";

    if (!token) return <Navigate to="/login" replace />;
    if (locked) return <Navigate to="/lock-screen" replace />;

    return <Outlet />;
}

export default ProtectedRoutes;
