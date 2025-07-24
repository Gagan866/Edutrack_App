import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/studentDashboard.css";
import TopBarCard from "./TopBarCard";
import logo from "../../assets/Logo.png";

export default function StudentDashboard() {
  return (
    <div className="student-dashboard-container">
      <nav className="student-sidebar">
        <img src={logo} alt="Logo" className="student-sidebar-logo" />
        <NavLink
          to="/dashboard/student/profile"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/student/academic-performance"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Academic Performance
        </NavLink>
        <NavLink
          to="/dashboard/student/attendance"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Attendance
        </NavLink>
        <NavLink
          to="/dashboard/student/assignment"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Assignment
        </NavLink>
        <NavLink
          to="/dashboard/student/trainings"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Trainings
        </NavLink>
        <NavLink
          to="/dashboard/student/achievements"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Achievements
        </NavLink>
      </nav>
      <div className="student-dashboard-main-content">
        <TopBarCard />
        <div className="student-dashboard-page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
