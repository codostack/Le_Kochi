import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import BottomBar from "../components/footer";

import About from "../pages/public/about/page";
import Contact from "../pages/public/contact/page";
import Login from "../pages/api/login";
import CareersPage from "../pages/public/careers/page";
import CallPage from "../pages/call/page";
import DirectionsPage from "../pages/directions/page";
import WhatsappPage from "../pages/whatsapp/page";
import OrderPage from "../pages/order/page";
import RestaurantMenu from "../pages/public/mean/page";
import CateringPage from "../pages/public/catering&event/page";
import Home from "../pages/public/home/page";
import CateringGallery from "../pages/public/gallery/page";
import RegistrationPage from "../pages/api/registration";

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
        <Route path="/menu" element={<RestaurantMenu />} />
        <Route path="/catering" element={<CateringPage />} />
        <Route path="/gallery" element={<CateringGallery />} />

        {/* BottomBar Pages */}
        <Route path="/call" element={<CallPage />} />
        <Route path="/directions" element={<DirectionsPage />} />
        <Route path="/whatsapp" element={<WhatsappPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>

      <BottomBar />
    </>
  );
};

export default PublicRoutes;