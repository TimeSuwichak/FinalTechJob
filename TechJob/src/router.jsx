import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";

import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNavbar from "./components/AdminNavbar";
import Datauser from "./pages/Datauser";
import Report from "./pages/Report";
import WorkOders from "./pages/WorkOders";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginPage /> },

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
        element: <Datauser />,
      },
      {
        path: "Report",
        element: <Report />,
      },
      {
        path: "WorkOders",
        element:<WorkOders/>,
      },
    ],
  },

  { path: "*", element: <Navigate to="/login" replace /> },
]);

export default router;