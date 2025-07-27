import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "https://edutrack-app-kep0.onrender.com";

export default function TopBarCard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const email = localStorage.getItem("edutract_email");
      if (!email) {
        setError("No email found in localStorage. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        console.log("Fetching student details for:", email);
        const res = await axios.get("/api/student/me", {
          headers: { "X-User-Email": email },
        });
        console.log("Student API response:", res.data);
        setStudent(res.data);
      } catch (err) {
        setError("Failed to load student details");
        console.error("Student API error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  if (loading)
    return <div className="student-dashboard-topbar">Loading...</div>;
  if (error)
    return <div className="student-dashboard-topbar error">{error}</div>;
  if (!student)
    return (
      <div className="student-dashboard-topbar error">
        No student details found.
      </div>
    );

  return (
    <div className="student-dashboard-topbar student-dashboard-topbar-lines">
      <div className="student-topbar-info">
        <div className="student-topbar-line">Welcome</div>
        <div className="student-topbar-line">{student.name}</div>
        <div className="student-topbar-line">{student.regNumber}</div>
        <div className="student-topbar-line">
          Semester {student.semester}
          {student.branch && (
            <span className="student-topbar-branch">| {student.branch}</span>
          )}
        </div>
      </div>
      <div className="student-topbar-image-container">
        <img
          className="student-topbar-profile-image"
          src={
            student.profileImage
              ? `data:image/jpeg;base64,${student.profileImage}`
              : "/default-avatar.png"
          }
          alt={student.profileImage ? "Profile" : "No profile image"}
        />
      </div>
    </div>
  );
}
