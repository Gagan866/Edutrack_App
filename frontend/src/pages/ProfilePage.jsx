import React from "react";
import StudentProfileCards from "../features/dashboard/StudentProfileCards";
import "../styles/profile.css";
export default function ProfilePage() {
  return (
    <div className="glass-card profile-container">
      <h2>Student Profile</h2>
      <StudentProfileCards />
    </div>
  );
}
