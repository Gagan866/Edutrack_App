import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "https://edutrackbackend-o13s.onrender.com";
import "../../styles/profile.css";

const sectionOrder = [
  {
    title: "Personal Details",
    fields: [
      { label: "Full Name", key: "name" },
      { label: "Date of Birth", key: "dob", isDate: true },
      { label: "Gender", key: "gender" },
      { label: "Phone Number", key: "phoneNumber" },
      { label: "Secondary Email", key: "secondaryEmail" },
      { label: "Aadhaar Number", key: "aadhaar" },
    ],
  },
  {
    title: "Address Details",
    fields: [
      { label: "Address", key: "address" },
      { label: "Pincode", key: "pincode" },
      { label: "City", key: "city" },
      { label: "District", key: "district" },
      { label: "State", key: "state" },
    ],
  },
  {
    title: "Academic Details",
    fields: [
      { label: "Department", key: "department" },
      { label: "Year", key: "year" },
      { label: "Semester", key: "semester" },
      { label: "Registration Number", key: "regNumber" },
      { label: "Religion", key: "religion" },
      { label: "Category", key: "category" },
      { label: "Caste", key: "caste" },
      { label: "SSLC Marks", key: "sslcMarks" },
      { label: "Admission Year", key: "admissionYear" },
      { label: "Admission Type", key: "admissionType" },
      { label: "Education Board", key: "eduBoard" },
      { label: "SSP ID", key: "sspId" },
      { label: "NSP ID", key: "nspId" },
      { label: "APAAR ID", key: "apaarId" },
    ],
  },
  {
    title: "Parent Details",
    fields: [
      { label: "Father's Name", key: "fatherName" },
      { label: "Mother's Name", key: "motherName" },
      { label: "Parent's Mobile", key: "parentMobile" },
    ],
  },
];

export default function StudentProfileCards() {
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
        const res = await axios.get("/api/student/me", {
          headers: { "X-User-Email": email },
        });
        setStudent(res.data);
      } catch (err) {
        setError("Failed to load student details");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;
  if (!student)
    return <div className="profile-error">No student details found.</div>;

  return (
    <div className="profile-sections-container">
      {sectionOrder.map((section) => (
        <div className="profile-section-card" key={section.title}>
          <div className="profile-section-title">{section.title}</div>
          <div className="profile-section-fields">
            {section.fields.map(({ label, key, isDate }) => (
              <div className="profile-field-row" key={key}>
                <span className="profile-field-label">{label}:</span>
                <span className="profile-field-value">
                  {isDate && student[key]
                    ? new Date(student[key]).toISOString().slice(0, 10)
                    : student[key] || "-"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
