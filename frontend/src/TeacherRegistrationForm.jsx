import React from "react";
import MultiStepTeacherRegistration from "./components/teacher/MultiStepTeacherRegistration";

export default function TeacherRegistrationForm({ userInfo }) {
  return <MultiStepTeacherRegistration userInfo={userInfo} />;
}
