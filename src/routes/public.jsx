import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import BottomBar from "../components/footer";

import About from "../pages/public/about/page";
import Contact from "../pages/public/contact/page";
import Login from "../pages/customer/api/login";
import CareersPage from "../pages/public/careers/page";
import RestaurantMenu from "../pages/public/mean/page";
import CateringPage from "../pages/public/catering&event/page";
import Home from "../pages/public/home/page";
import CateringGallery from "../pages/public/review/page";
import RegistrationPage from "../pages/customer/api/registration";
import CardPaymentPage from "../pages/public/mean/CardPaymentPage";
import PaymentMethod from "../pages/public/mean/PaymentMethod";
import OrderConfirmationPage from "../pages/public/mean/OrderConfirm";
import PaymentSuccessPage from "../pages/public/mean/PaymentSuccessPage";
import MyOrdersPage from "../pages/public/mean/MyOrders";
import CartPage from "../pages/public/mean/Cartpage";
import EnquiryPage from "../pages/public/catering&event/components/Enquirypage";
import CareerPage from "../pages/public/careers/Careerpage";

const PublicRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/career-form" element={<CareerPage />} />
        <Route path="/menu" element={<RestaurantMenu />} />
        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route path="/payment" element={<CardPaymentPage />} />
        <Route path="/order-confirm" element={<OrderConfirmationPage />} />
        <Route path="/payment-successful" element={<PaymentSuccessPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/cart" element={<CartPage />} />


        <Route path="/catering" element={<CateringPage />} />
        <Route path="/enquiry" element={<EnquiryPage />} />
        <Route path="/gallery" element={<CateringGallery />} />
      </Routes>

      <BottomBar />
    </>
  );
};

export default PublicRoutes;