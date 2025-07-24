import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TeacherRegistrationForm from "../TeacherRegistrationForm";

function TeacherRegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      !location.state ||
      !location.state.email ||
      !location.state.password ||
      !location.state.role
    ) {
      navigate("/register", { replace: true });
    }
  }, [location, navigate]);

  if (
    !location.state ||
    !location.state.email ||
    !location.state.password ||
    !location.state.role
  ) {
    return null;
  }
  return <TeacherRegistrationForm userInfo={location.state} />;
}

export default TeacherRegisterPage;
