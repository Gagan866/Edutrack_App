import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "https://edutrack-app-kep0.onrender.com";

export default function TeacherTopBarCard() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      const email = localStorage.getItem("edutract_email");
      if (!email) {
        setError("No email found in localStorage. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("/api/teacher/me", {
          headers: { "X-User-Email": email },
        });
        setTeacher(res.data);
      } catch (err) {
        setError("Failed to load teacher details");
      } finally {
        setLoading(false);
      }
    };
    fetchTeacher();
  }, []);

  if (loading)
    return <div className="student-dashboard-topbar">Loading...</div>;
  if (error)
    return <div className="student-dashboard-topbar error">{error}</div>;
  if (!teacher)
    return (
      <div className="student-dashboard-topbar error">
        No teacher details found.
      </div>
    );

  return (
    <div className="student-dashboard-topbar student-dashboard-topbar-lines">
      <div className="student-topbar-line">Welcome</div>
      <div className="student-topbar-line">{teacher.fullName}</div>
      <div className="student-topbar-line">{teacher.designation}</div>
    </div>
  );
}
