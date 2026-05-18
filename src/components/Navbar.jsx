import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FiShoppingCart,
  FiChevronRight,
  FiPhone,
  FiMail,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import { FaWhatsapp, FaGoogle } from "react-icons/fa";

import logo from "../assets/images/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  const allNavItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About Us", path: "/about" },
    { name: "Catering", path: "/catering" },
    { name: "Gallery", path: "/gallery" },
    { name: "Careers", path: "/careers", mobileOnly: true },
    { name: "Contact", path: "/contact" },
  ];

  const desktopItems = allNavItems.filter((item) => !item.mobileOnly);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-black/90 backdrop-blur-md shadow-lg"
            : "bg-[#041a13]"
        }`}
      >
        {/* TOP BAR */}
        <div className="max-w-[1920px] mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-12 py-3 lg:py-4">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Le Kochi Logo"
              className="w-auto h-[45px] sm:h-[55px] lg:h-[70px]"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <ul className="hidden lg:flex items-center gap-x-8 xl:gap-x-12 text-[13px] font-bold tracking-widest uppercase">
            {desktopItems.map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className={`transition-colors duration-300 ${
                    location.pathname === item.path
                      ? "text-[#FFD700]"
                      : "text-white hover:text-[#FFD700]"
                  }`}
                >
                  {item.name}
                </Link>

                {location.pathname === item.path && (
                  <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-red-600" />
                )}
              </li>
            ))}
          </ul>

          {/* DESKTOP ORDER BUTTON */}
          <div className="hidden lg:block shrink-0">
            <Link
              to="/menu"
              className="flex items-center gap-3 border-2 border-red-600 px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300 group"
            >
              <span className="text-[#FFD700] group-hover:text-white text-[12px] font-bold tracking-tighter uppercase">
                Order Online
              </span>

              <FiShoppingCart className="text-[#FFD700] group-hover:text-white text-lg" />
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white text-3xl focus:outline-none z-[1101]"
          >
            {menuOpen ? (
              <HiX className="text-gray-400 text-2xl" />
            ) : (
              <HiMenu className="text-[#FFD700]" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`fixed inset-0 h-screen w-full transition-all duration-500 ease-in-out bg-[#041a13] z-[1100] ${
            menuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex flex-col h-full px-8 pt-8 pb-8 overflow-y-auto">

            {/* HEADER */}
            <div className="flex flex-col items-start mb-6">
              <img
                src={logo}
                alt="Le Kochi"
                className="h-16 w-auto mb-4"
              />

              <div className="w-full h-[0.5px] bg-gray-700/50" />
            </div>

            {/* NAV LINKS */}
            <ul className="flex flex-col">
              {allNavItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.name} className="w-full">
                    <Link
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between py-4 text-[17px] font-semibold tracking-widest uppercase transition-all ${
                        isActive ? "text-[#c29b40]" : "text-white"
                      }`}
                    >
                      {item.name}

                      {isActive && (
                        <FiChevronRight className="text-[#c29b40] text-xl" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* DIVIDER */}
            <div className="w-full h-[0.5px] bg-gray-700/50 mt-4 mb-6" />

            {/* CONTACT + QR SECTION */}
            <div className="flex items-end justify-between gap-4 mb-8">

              {/* LEFT SIDE */}
              <div className="flex flex-col gap-5">

                {/* CONTACT */}
                <div className="flex flex-col gap-4">

                  <a
                    href="tel:9054562015"
                    className="flex items-center gap-4 text-white/90"
                  >
                    <FiPhone className="text-[#c29b40] text-xl shrink-0" />

                    <span className="text-[15px] font-semibold tracking-wide">
                      (905) 456-2015
                    </span>
                  </a>

                  <a
                    href="mailto:info@lekochi.ca"
                    className="flex items-center gap-4 text-white/90"
                  >
                    <FiMail className="text-[#c29b40] text-xl shrink-0" />

                    <span className="text-[15px] font-semibold tracking-wide">
                      info@lekochi.ca
                    </span>
                  </a>
                </div>

                {/* SOCIAL ICONS */}
                <div className="flex items-center gap-6 pt-1">
                  <FiInstagram className="text-[#c29b40] text-[22px] cursor-pointer" />

                  <FiFacebook className="text-[#c29b40] text-[22px] cursor-pointer" />

                  <FaWhatsapp className="text-[#25D366] text-[22px] cursor-pointer" />

                  <FaGoogle className="text-[#c29b40] text-[22px] cursor-pointer" />
                </div>
              </div>

              {/* QR CODE */}
              <div className="flex flex-col items-center shrink-0">

                <div className="bg-white rounded-xl p-2 shadow-2xl border border-white/20">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://wa.me/919999999999"
                    alt="WhatsApp QR"
                    className="w-[90px] h-[90px] object-contain rounded-md"
                  />
                </div>

                <p className="text-[9px] text-[#c29b40] tracking-[0.18em] uppercase mt-2 text-center">
                  Scan To Join
                </p>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-[0.5px] bg-[#c29b40]/30 mb-6" />

            {/* ORDER BUTTON */}
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className="mt-auto flex items-center justify-center gap-3 bg-red-700 hover:bg-red-800 transition-colors text-white w-full py-4 rounded-md uppercase text-sm font-bold"
            >
              Order Online
              <FiShoppingCart />
            </Link>
          </div>
        </div>
      </nav>

      {/* SPACER */}
      <div className="h-[68px] sm:h-[80px] lg:h-[95px]" />
    </>
  );
}