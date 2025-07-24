import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import SectionForm from "./SectionForm";
import { registerStudent, checkAadhaarExists } from "../../services/api";
import "../../styles/registration.css";

const initialFormData = {
  // Auth
  email: "",
  password: "",
  confirmPassword: "",
  role: "student", // Default role
  // Personal
  fullName: "",
  dob: "",
  gender: "",
  phoneNumber: "",
  secondaryEmail: "",
  aadhaar: "",
  // Address
  address: "",
  pincode: "",
  city: "",
  district: "",
  state: "",
  // Academic
  department: "Computer Science & Engineering",
  semester: "",
  year: "",
  religion: "",
  category: "",
  caste: "",
  sslcMarks: "",
  regNumber: "",
  admissionYear: "",
  sspId: "",
  nspId: "",
  apaarId: "",
  admissionType: "",
  eduBoard: "",
  // Parent
  fatherName: "",
  motherName: "",
  parentMobile: "",
  profileImage: null,
};

const stepFields = [
  ["fullName", "dob", "gender", "phoneNumber", "aadhaar"],
  ["address", "pincode", "city", "district", "state"],
  [
    "department",
    "semester",
    "year",
    "religion",
    "category",
    "caste",
    "sslcMarks",
    "admissionYear",
    "admissionType",
    "eduBoard",
  ],
  ["fatherName", "motherName", "parentMobile"],
];

const steps = [
  "Personal Details",
  "Address Details",
  "Academic Details",
  "Parent Details",
];

const MultiStepStudentRegistration = ({ userInfo }) => {
  if (!userInfo || !userInfo.email || !userInfo.password || !userInfo.role) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Invalid registration flow. Please <a href="/register">start again</a>.
      </div>
    );
  }

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    ...initialFormData,
    email: userInfo.email,
    password: userInfo.password,
    role: userInfo.role,
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateStep = () => {
    const requiredFields = stepFields[activeStep];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = "Required";
      }
    });
    // Custom validation for Personal Details step
    if (activeStep === 0) {
      // DOB: min age 15
      if (formData.dob) {
        let dobDate;
        if (typeof formData.dob === "string") {
          dobDate = new Date(formData.dob);
        } else if (formData.dob instanceof Date) {
          dobDate = formData.dob;
        } else {
          dobDate = new Date(String(formData.dob));
        }
        if (!isNaN(dobDate)) {
          const today = new Date();
          const minDate = new Date(
            today.getFullYear() - 15,
            today.getMonth(),
            today.getDate()
          );
          if (dobDate > minDate) {
            newErrors.dob = "You must be at least 15 years old.";
          }
        } else {
          newErrors.dob = "Invalid date.";
        }
      }
      // Phone: 10 digits
      if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Mobile number must be exactly 10 digits.";
      }
      // Aadhaar: 12 digits
      if (formData.aadhaar && !/^\d{12}$/.test(formData.aadhaar)) {
        newErrors.aadhaar = "Aadhaar number must be exactly 12 digits.";
      }
    }
    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    setError("");
    if (!validateStep()) return;
    // Aadhaar uniqueness check before moving to Address step
    if (activeStep === 0 && formData.aadhaar) {
      try {
        const res = await checkAadhaarExists(formData.aadhaar);
        if (res.exists) {
          setFieldErrors((prev) => ({
            ...prev,
            aadhaar: "Aadhaar number already exists.",
          }));
          return;
        }
      } catch (err) {
        setError("Error checking Aadhaar. Please try again.");
        return;
      }
    }
    setAnimating(true);
    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
      setAnimating(false);
    }, 200);
  };
  const handleBack = () => {
    setError("");
    setAnimating(true);
    setTimeout(() => {
      setActiveStep((prev) => prev - 1);
      setAnimating(false);
    }, 200);
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "year") {
      setFormData((prev) => ({ ...prev, year: value, semester: "" }));
      setFieldErrors((prev) => ({
        ...prev,
        year: undefined,
        semester: undefined,
      }));
    } else if (name === "profileImage") {
      // File input: validate and convert to base64
      const file = files && files[0];
      if (!file) {
        setFormData((prev) => ({ ...prev, profileImage: null }));
        setFieldErrors((prev) => ({ ...prev, profileImage: undefined }));
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setFormData((prev) => ({ ...prev, profileImage: null }));
        setFieldErrors((prev) => ({
          ...prev,
          profileImage: "Only JPEG/PNG allowed.",
        }));
        return;
      }
      if (file.size > 51200) {
        setFormData((prev) => ({ ...prev, profileImage: null }));
        setFieldErrors((prev) => ({
          ...prev,
          profileImage: "Image must be 50KB or less.",
        }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        setFormData((prev) => ({ ...prev, profileImage: base64 }));
        setFieldErrors((prev) => ({ ...prev, profileImage: undefined }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent double submit
    if (!validateStep()) return;
    setError("");
    setLoading(true);
    try {
      // Register user first
      const { email, password, role, ...rest } = formData;
      if (!email || !password || !role) {
        setError("Email, password, and role are required for registration.");
        setLoading(false);
        return;
      }
      console.log("Registering user with:", { email, password, role });
      const userRes = await import("../../services/api").then((api) =>
        api.registerUser({ email, password, role })
      );
      // Register student with userId
      await registerStudent({
        ...rest,
        userId: userRes.userId,
        profileImage: formData.profileImage,
      });
      sessionStorage.removeItem("register_email");
      sessionStorage.removeItem("register_password");
      sessionStorage.removeItem("register_role");
      sessionStorage.removeItem("register_userId");
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h1>Student Registration</h1>
      {success && (
        <Alert severity="success">
          Profile created! Redirecting to login...
        </Alert>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <SectionForm
          activeStep={activeStep}
          formData={formData}
          handleChange={handleChange}
          fieldErrors={fieldErrors}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          loading={loading}
          animating={animating}
        />
      </form>
      <div className="step-indicator">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`step ${index === activeStep ? "active" : ""}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiStepStudentRegistration;
