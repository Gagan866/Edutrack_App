import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/studentDashboard.css";
import TeacherTopBarCard from "./TeacherTopBarCard";
import logo from "../../assets/Logo.png";

export default function TeacherDashboard() {
  return (
    <div className="student-dashboard-container">
      <nav className="student-sidebar">
        <img src={logo} alt="Logo" className="student-sidebar-logo" />
        <NavLink
          to="/dashboard/teacher/profile"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/teacher/course"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Course
        </NavLink>
        <NavLink
          to="/dashboard/teacher/assignment"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Assignment
        </NavLink>
        <NavLink
          to="/dashboard/teacher/attendance"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Attendance
        </NavLink>
        <NavLink
          to="/dashboard/teacher/assessment"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Assessment
        </NavLink>
        <NavLink
          to="/dashboard/teacher/performance-monitoring"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Performance Monitoring
        </NavLink>
        <NavLink
          to="/dashboard/teacher/reports"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Reports & Analytics
        </NavLink>
        <NavLink
          to="/dashboard/teacher/communication"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Communication
        </NavLink>
      </nav>
      <div className="student-dashboard-main-content">
        <TeacherTopBarCard />
        <div className="student-dashboard-page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
