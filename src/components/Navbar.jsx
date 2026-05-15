import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About Us", path: "/about" },
    { name: "Catering", path: "/catering" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${
          location.pathname !== "/" || scrolled
            ? "bg-black/95 backdrop-blur-xl shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          
          {/* NAV CONTENT */}
          <div className="flex items-center justify-between h-[78px] md:h-[92px]">
            
            {/* LOGO */}
            <Link
              to="/"
              className="flex flex-col justify-center leading-none shrink-0"
            >
              <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#FFD700] tracking-tight">
                Le Kochi
              </h1>

              <div className="flex items-center mt-1">
                <div className="h-[1px] w-4 sm:w-6 bg-red-600"></div>

                <span className="text-[#FFD700] text-[7px] sm:text-[8px] md:text-[10px] px-2 uppercase tracking-[0.25em] whitespace-nowrap">
                  Café & Kitchen
                </span>

                <div className="h-[1px] w-4 sm:w-6 bg-red-600"></div>
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <ul className="hidden lg:flex items-center gap-8 xl:gap-10 text-[12px] xl:text-[13px] font-bold">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.name} className="relative">
                    <Link
                      to={item.path}
                      className={`uppercase transition-all duration-300 ${
                        isActive
                          ? "text-[#FFD700]"
                          : "text-white hover:text-[#FFD700]"
                      }`}
                    >
                      {item.name}
                    </Link>

                    {isActive && (
                      <div className="absolute left-0 -bottom-2 w-full h-[2px] bg-red-600 rounded-full"></div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* DESKTOP ORDER BUTTON */}
            <Link
              to="/order"
              className="hidden lg:flex items-center gap-3 border border-red-600 px-5 xl:px-6 py-2.5 rounded-full hover:bg-red-600/10 transition-all duration-300 group"
            >
              <span className="text-[#FFD700] text-xs xl:text-sm font-bold tracking-[0.2em] uppercase">
                Order Online
              </span>

              <FiShoppingCart className="text-[#FFD700] text-lg" />
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#FFD700] text-3xl sm:text-4xl flex items-center justify-center w-11 h-11"
            >
              {menuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-black/98 backdrop-blur-2xl transition-all duration-300 overflow-hidden ${
            menuOpen
              ? "max-h-screen opacity-100 border-t border-white/10"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-8">
            <ul className="flex flex-col gap-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`block uppercase text-base font-bold tracking-[0.15em] transition-all duration-300 ${
                        isActive
                          ? "text-[#FFD700]"
                          : "text-white hover:text-[#FFD700]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* MOBILE BUTTON */}
            <Link
              to="/order"
              className="mt-8 flex items-center justify-center gap-3 border border-red-600 text-[#FFD700] px-6 py-4 rounded-full uppercase text-sm font-bold tracking-[0.15em] hover:bg-red-600/10 transition-all duration-300"
            >
              Order Online
              <FiShoppingCart className="text-lg" />
            </Link>
          </div>
        </div>
      </nav>

      {/* SPACER */}
      <div className="h-[78px] md:h-[92px]" />
    </>
  );
} 