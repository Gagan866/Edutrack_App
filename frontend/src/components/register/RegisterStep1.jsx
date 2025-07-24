import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import InputField from "../common/InputField";

const RegisterStep1 = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    setError("");
    if (!role) return setError("Please select a role.");
    if (!email) return setError("Email is required.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return setError("Invalid email format.");
    if (!password || password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return setError("Password must contain at least one special character.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");
    if (role === "student") {
      navigate("/register/student", { state: { email, password, role } });
    } else if (role === "teacher") {
      navigate("/register/teacher", { state: { email, password, role } });
    }
  };

  return (
    <Box
      className="registration-container"
      component="form"
      onSubmit={handleNext}
    >
      <h1>Register</h1>
      {error && <Alert severity="error">{error}</Alert>}
      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Select Role</FormLabel>
        <RadioGroup
          row
          value={role}
          onChange={(e) => setRole(e.target.value)}
          name="role"
        >
          <FormControlLabel
            value="student"
            control={<Radio />}
            label="Student"
          />
          <FormControlLabel
            value="teacher"
            control={<Radio />}
            label="Teacher"
          />
        </RadioGroup>
      </FormControl>
      <InputField
        label="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default RegisterStep1;
