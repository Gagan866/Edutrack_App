import React from "react";
// import Dashboard from "../components/Dashboard";
import StudentDashboard from "../features/dashboard/StudentDashboard";
import TeacherDashboard from "../features/dashboard/TeacherDashboard";
import AdminDashboard from "../features/dashboard/AdminDashboard";

function DashboardPage() {
  // Example: Render dashboard based on role
  const role = localStorage.getItem("edutract_role");
  if (role === "teacher") return <TeacherDashboard />;
  if (role === "admin") return <AdminDashboard />;
  return <StudentDashboard />;
}

export default DashboardPage;
