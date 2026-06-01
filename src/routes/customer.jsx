import { Routes, Route } from "react-router-dom";
import AccountCenter from "../pages/customer/CustomerAccount";
import SettingsPage from "../pages/customer/Settings";
import FoodCart from "../pages/customer/Cart";
import LogoutPage from "../pages/customer/LogoutPage";
import EditAccount from "../pages/customer/EditAccount";
import HelpSupport from "../pages/customer/HelpSupport";
import PastOrdersHistory from "../pages/customer/PastOrdersHistory";
import PaymentHistory from "../pages/customer/PaymentHistory";
import AddressManagement from "../pages/customer/AddressManagement";
import MobileBottomBar from "../components/BottomBar";
import Navbar from "../components/Navbar";

const CustomerRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/account" element={<AccountCenter />} />
        <Route path="/edit" element={<EditAccount />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/cart" element={<FoodCart />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/past-orders" element={<PastOrdersHistory />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/address-management" element={<AddressManagement />} />
      </Routes>
      <MobileBottomBar />

    </>
  );
};

export default CustomerRoutes;
