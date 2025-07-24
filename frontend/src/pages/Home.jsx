import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SchoolIcon from "@mui/icons-material/School";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Box
        className="glass-card"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          borderRadius: 4,
          boxShadow: 3,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <SchoolIcon sx={{ fontSize: 64, color: "#2193b0", mb: 2 }} />
        <h1
          style={{
            fontFamily: "Poppins, Inter, sans-serif",
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          EduTrack Portal
        </h1>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{
            mb: 2,
            borderRadius: 999,
            fontWeight: 600,
            fontSize: "1.1rem",
            boxShadow: 2,
          }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          fullWidth
          sx={{
            borderRadius: 999,
            fontWeight: 600,
            fontSize: "1.1rem",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
