import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "https://edutrackbackend-o13s.onrender.com/api";
import "../../styles/studentDashboard.css";

export default function StudentHomeCard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("edutract_token");
        const res = await axios.get("/api/student/me", {
          headers: { Authorization: `Bearer ${token}` },
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

  if (loading) return null;
  if (error) return null;
  if (!student) return null;

  return null;
}
