import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MultiStepStudentRegistration from "../components/student/MultiStepStudentRegistration";

function StudentRegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
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
  return <MultiStepStudentRegistration userInfo={location.state} />;
}

export default StudentRegisterPage;
