import React, { useEffect } from "react";
import Navbar from "./Navbar";
import AppRouter from "./router/AppRouter";
import "./styles/global.css";
import "./styles/app.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    // If on dashboard or protected route and not logged in, redirect to login
    const isLoggedIn = Boolean(localStorage.getItem("edutract_token"));
    const protectedRoutes = [
      "/dashboard",
      "/profile",
      "/update",
      "/change-password",
      "/view-students",
      "/admin-panel",
    ];
    if (
      !isLoggedIn &&
      protectedRoutes.some((r) => window.location.pathname.startsWith(r))
    ) {
      navigate("/login", { replace: true });
    }
  }, [window.location.pathname, navigate]);

  return (
    <>
      <Navbar />
      <main className="app-main">
        <AppRouter />
      </main>
    </>
  );
}

export default App;
