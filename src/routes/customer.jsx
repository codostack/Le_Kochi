import { Routes, Route } from "react-router-dom";
import CustomerPanel from "../pages/customer/CustomerPanel";

const CustomerRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<CustomerPanel />} />
      </Routes>
    </>
  );
};

export default CustomerRoutes;