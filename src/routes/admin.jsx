import { Routes, Route } from "react-router-dom";
import CustomerPanel from "../pages/customer/CustomerPanel";
import AdminDashboard from "../pages/admin/page";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;