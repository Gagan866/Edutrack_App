import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import StudentRegisterPage from "../pages/StudentRegisterPage";
import TeacherRegisterPage from "../pages/TeacherRegisterPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import ViewStudentsPage from "../pages/ViewStudentsPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import RegisterPage from "../pages/RegisterPage";
import StudentDashboard from "../features/dashboard/StudentDashboard";
import TeacherDashboard from "../features/dashboard/TeacherDashboard";
import AcademicPerformance from "../features/dashboard/AcademicPerformance";
import Attendance from "../features/dashboard/Attendance";
import Assignment from "../features/dashboard/Assignment";
import Trainings from "../features/dashboard/Trainings";
import Achievements from "../features/dashboard/Achievements";
import TeacherProfilePage from "../pages/TeacherProfilePage";
import TeacherCoursePage from "../pages/TeacherCoursePage";
import TeacherAssignmentPage from "../pages/TeacherAssignmentPage";
import TeacherAttendancePage from "../pages/TeacherAttendancePage";
import TeacherAssessmentPage from "../pages/TeacherAssessmentPage";
import TeacherPerformanceMonitoringPage from "../pages/TeacherPerformanceMonitoringPage";
import TeacherReportsPage from "../pages/TeacherReportsPage";
import TeacherCommunicationPage from "../pages/TeacherCommunicationPage";

export default function AppRouter() {
  const isLoggedIn = Boolean(localStorage.getItem("edutract_token"));
  const role = localStorage.getItem("edutract_role");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register/student" element={<StudentRegisterPage />} />
      <Route path="/register/teacher" element={<TeacherRegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard/student/*"
        element={
          isLoggedIn && role === "student" ? (
            <StudentDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route path="profile" element={<ProfilePage />} />
        <Route path="academic-performance" element={<AcademicPerformance />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="assignment" element={<Assignment />} />
        <Route path="trainings" element={<Trainings />} />
        <Route path="achievements" element={<Achievements />} />
      </Route>
      <Route
        path="/dashboard/teacher/*"
        element={
          isLoggedIn && role === "teacher" ? (
            <TeacherDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route path="profile" element={<TeacherProfilePage />} />
        <Route path="course" element={<TeacherCoursePage />} />
        <Route path="assignment" element={<TeacherAssignmentPage />} />
        <Route path="attendance" element={<TeacherAttendancePage />} />
        <Route path="assessment" element={<TeacherAssessmentPage />} />
        <Route
          path="performance-monitoring"
          element={<TeacherPerformanceMonitoringPage />}
        />
        <Route path="reports" element={<TeacherReportsPage />} />
        <Route path="communication" element={<TeacherCommunicationPage />} />
      </Route>
      <Route
        path="/profile"
        element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/change-password"
        element={isLoggedIn ? <ChangePasswordPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/view-students"
        element={
          isLoggedIn && role === "teacher" ? (
            <ViewStudentsPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin-panel"
        element={
          isLoggedIn && role === "admin" ? (
            <AdminPanelPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
