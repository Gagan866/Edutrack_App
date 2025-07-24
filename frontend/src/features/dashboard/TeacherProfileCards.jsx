import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "https://edutrackbackend-o13s.onrender.com";
import "../../styles/profile.css";

const teacherSectionOrder = [
  {
    title: "Personal Details",
    fields: [
      { label: "Full Name", key: "fullName" },
      { label: "Employee ID", key: "employeeId" },
      { label: "Gender", key: "gender" },
      { label: "Phone Number", key: "phoneNumber" },
      { label: "Email", key: "email" },
      { label: "Date of Joining", key: "dateOfJoining", isDate: true },
    ],
  },
  {
    title: "Professional Details",
    fields: [
      { label: "Qualification", key: "qualification" },
      { label: "Designation", key: "designation" },
      { label: "Department", key: "department" },
    ],
  },
];

export default function TeacherProfileCards() {
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

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;
  if (!teacher)
    return <div className="profile-error">No teacher details found.</div>;

  return (
    <div className="profile-sections-container">
      {teacherSectionOrder.map((section) => (
        <div className="profile-section-card" key={section.title}>
          <div className="profile-section-title">{section.title}</div>
          <div className="profile-section-fields">
            {section.fields.map(({ label, key, isDate }) => (
              <div className="profile-field-row" key={key}>
                <span className="profile-field-label">{label}:</span>
                <span className="profile-field-value">
                  {isDate && teacher[key]
                    ? new Date(teacher[key]).toISOString().slice(0, 10)
                    : teacher[key] || "-"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
