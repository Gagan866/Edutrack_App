import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { registerTeacher } from "../../services/api";
import "../../styles/registration.css";

const initialFormData = {
  email: "",
  password: "",
  role: "teacher",
  fullName: "",
  employeeId: "",
  phoneNumber: "",
  gender: "",
  qualification: "",
  designation: "",
  department: "",
  dateOfJoining: "",
};

const qualificationOptions = [
  { value: "B E", label: "B E" },
  { value: "M E", label: "M E" },
  { value: "B Tech", label: "B Tech" },
  { value: "M Tech", label: "M Tech" },
  { value: "PHD", label: "PHD" },
];

const designationOptions = [
  { value: "lecturer", label: "Lecturer" },
  { value: "senior scale lecturer", label: "Senior Scale Lecturer" },
  { value: "selection grade lecturer", label: "Selection Grade Lecturer" },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const departmentOptions = [
  {
    value: "Computer Science & Engineering",
    label: "Computer Science & Engineering",
  },
];

export default function MultiStepTeacherRegistration({ userInfo }) {
  if (!userInfo || !userInfo.email || !userInfo.password || !userInfo.role) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Invalid registration flow. Please <a href="/register">start again</a>.
      </div>
    );
  }
  const [formData, setFormData] = useState({
    ...initialFormData,
    email: userInfo.email,
    password: userInfo.password,
    role: userInfo.role,
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showValidationError, setShowValidationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = async () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Name is required";
    if (!formData.employeeId.trim())
      errors.employeeId = "Employee ID is required";
    else if (formData.employeeId.length !== 7)
      errors.employeeId = "Employee ID must be exactly 7 characters";
    else {
      try {
        const res = await import("../../services/api").then((api) =>
          api.checkEmployeeIdExists(formData.employeeId)
        );
        if (res.exists) errors.employeeId = "Employee ID already exists";
      } catch (e) {
        errors.employeeId = "Could not validate Employee ID";
      }
    }
    if (!formData.phoneNumber.trim())
      errors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      errors.phoneNumber = "Phone number must be exactly 10 digits";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.qualification)
      errors.qualification = "Qualification is required";
    if (!formData.designation) errors.designation = "Designation is required";
    if (!formData.department) errors.department = "Department is required";
    if (!formData.dateOfJoining)
      errors.dateOfJoining = "Date of joining is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setShowValidationError(false);
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, dateOfJoining: date }));
    setFieldErrors((prev) => ({ ...prev, dateOfJoining: undefined }));
    setShowValidationError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!(await validate())) {
      setShowValidationError(true);
      return;
    }
    setShowValidationError(false);
    setError("");
    setLoading(true);
    try {
      const { email, password, role } = formData;
      const userRes = await import("../../services/api").then((api) =>
        api.registerUser({ email, password, role })
      );
      await registerTeacher({ ...formData, userId: userRes.userId });
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
      <h1>Teacher Registration</h1>
      {success && (
        <Alert severity="success">
          Profile created! Redirecting to login...
        </Alert>
      )}
      {showValidationError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Please fix the errors in the form.
        </Alert>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} className="step-content">
        <div className="form-row">
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={!!fieldErrors.fullName}
            helperText={fieldErrors.fullName}
          />
          <TextField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            select
            error={!!fieldErrors.gender}
            helperText={fieldErrors.gender}
          >
            {genderOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="form-row">
          <TextField
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 7 }}
            error={!!fieldErrors.employeeId}
            helperText={fieldErrors.employeeId}
          />
          <TextField
            label="Qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            select
            error={!!fieldErrors.qualification}
            helperText={fieldErrors.qualification}
          >
            {qualificationOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="form-row">
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={!!fieldErrors.phoneNumber}
            helperText={fieldErrors.phoneNumber}
          />
          <TextField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            select
            error={!!fieldErrors.designation}
            helperText={fieldErrors.designation}
          >
            {designationOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="form-row">
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            select
            error={!!fieldErrors.department}
            helperText={fieldErrors.department}
          >
            {departmentOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="form-row">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Joining"
              value={formData.dateOfJoining || null}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  name: "dateOfJoining",
                  required: true,
                  margin: "normal",
                  error: !!fieldErrors.dateOfJoining,
                  helperText: fieldErrors.dateOfJoining,
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          className="submit-btn"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
