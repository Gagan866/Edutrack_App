import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SchoolIcon from "@mui/icons-material/School";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/navbar.css";

function Navbar() {
  const isLoggedIn = Boolean(localStorage.getItem("edutract_token"));
  const role = localStorage.getItem("edutract_role");
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current tab based on route
  let currentTab = "student";
  if (location.pathname.startsWith("/register/teacher")) currentTab = "teacher";
  if (location.pathname.startsWith("/login")) currentTab = "login";

  // Role-based dashboard menu
  const renderRoleMenu = () => {
    if (role === "student") {
      return (
        <>
          <Button
            className="navbar-role-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            className="navbar-role-btn"
            onClick={() => navigate("/profile")}
          >
            Profile
          </Button>
          <Button
            className="navbar-role-btn"
            onClick={() => navigate("/update")}
          >
            Update Details
          </Button>
          <Button
            className="navbar-role-btn"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </Button>
        </>
      );
    }
    if (role === "teacher") {
      return (
        <>
          <Button
            className="navbar-role-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            className="navbar-role-btn"
            onClick={() => navigate("/view-students")}
          >
            View Students
          </Button>
        </>
      );
    }
    if (role === "admin") {
      return (
        <>
          <Button
            className="navbar-role-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            className="navbar-role-btn"
            onClick={() => navigate("/admin-panel")}
          >
            Admin Panel
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <AppBar position="static" elevation={0} className="navbar-appbar">
      <Toolbar className="navbar-toolbar">
        <Box className="navbar-brand">
          <SchoolIcon sx={{ fontSize: 36, color: "#2193b0" }} />
          <Typography variant="h5" className="navbar-title">
            EduTrack
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!isLoggedIn ? (
            <Tabs
              value={
                currentTab === "teacher" || currentTab === "student"
                  ? "register"
                  : currentTab
              }
              onChange={(_, v) => {
                if (v === "login") navigate("/login");
                else if (v === "register") navigate("/register");
              }}
              textColor="primary"
              indicatorColor="primary"
              className="navbar-tabs"
            >
              <Tab label="Register" value="register" />
              <Tab label="Login" value="login" />
            </Tabs>
          ) : (
            <>{renderRoleMenu()}</>
          )}
          {isLoggedIn && (
            <Button
              variant="contained"
              color="primary"
              className="navbar-logout-btn"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
