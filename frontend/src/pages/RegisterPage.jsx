import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { checkEmailExists } from "../services/api";
import "../styles/registration.css";

const RegisterPage = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = async (e) => {
    e.preventDefault();
    setError("");
    if (!role) return setError("Please select a role.");
    if (!email) return setError("Email is required.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return setError("Invalid email format.");
    // Password validation: min 8, upper, lower, number, special char
    const passwordPolicy =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordPolicy.test(password)) {
      return setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
    }
    if (password !== confirmPassword)
      return setError("Passwords do not match.");
    if (role === "admin") return setError("Admin registration is disabled.");
    setLoading(true);
    try {
      const result = await checkEmailExists(email);
      if (result.exists) {
        setError("Email already exists. Please use a different email.");
        setLoading(false);
        return;
      }
      sessionStorage.setItem("register_email", email);
      sessionStorage.setItem("register_password", password);
      sessionStorage.setItem("register_role", role);
      if (role === "student")
        navigate("/register/student", { state: { email, password, role } });
      else if (role === "teacher")
        navigate("/register/teacher", { state: { email, password, role } });
    } catch (err) {
      setError("Error checking email. Please try again.");
    } finally {
      setLoading(false);
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
          <FormControlLabel
            value="admin"
            control={<Radio />}
            label="Admin"
            disabled
          />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        helperText={
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
        }
      />
      <TextField
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        required
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={() => setShowConfirmPassword((show) => !show)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? "Registering..." : "Next"}
      </Button>
    </Box>
  );
};

export default RegisterPage;
