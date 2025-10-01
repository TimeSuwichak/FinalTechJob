import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";

import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNavbar from "./components/AdminNavbar";
import Datauser from "./pages/Datauser";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  // Layout ของ admin
  {
    path: "/admin",
    element: <AdminNavbar />, // ✅ ใช้ AdminNavbar เป็น Layout หลักของ ADMIN
    children: [
      {
        path: "AdminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "Datauser",
        element: <Datauser/>,
      },
      {
        path: "settings",
        element: <h2 className="text-white">ตั้งค่าระบบ</h2>,
      },
    ],
  },

  { path: "*", element: <Navigate to="/login" replace /> },
]);

export default router;