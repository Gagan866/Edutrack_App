import React from "react";
import TeacherProfileCards from "../features/dashboard/TeacherProfileCards";
import "../styles/profile.css";
export default function TeacherProfilePage() {
  return (
    <div className="glass-card profile-container">
      <h2>Teacher Profile</h2>
      <TeacherProfileCards />
    </div>
  );
}
