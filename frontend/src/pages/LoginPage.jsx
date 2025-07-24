import React from "react";
import LoginForm from "../LoginForm";

function LoginPage({ onLogin }) {
  return <LoginForm onLogin={onLogin} />;
}

export default LoginPage;
