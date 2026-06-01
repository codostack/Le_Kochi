import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLogin from "../pages/admin/api/AdminLogin";
import ForgotPassword from "../pages/admin/api/ForgotPassword";
import ResetPassword from "../pages/admin/api/ResetPassword";
import VerifyOtp from "../pages/admin/api/VerifyOtp";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

      </Routes>
    </>
  );
};

export default AdminRoutes;