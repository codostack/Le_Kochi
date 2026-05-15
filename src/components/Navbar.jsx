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
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-300 ${
          location.pathname !== "/" || scrolled
            ? "bg-black shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center leading-none">
            <h1 className="text-[32px] font-bold text-[#FFD700] tracking-tight">
              Le Kochi
            </h1>

            <div className="flex items-center w-full mt-1">
              <div className="h-[1px] flex-grow bg-red-600"></div>

              <span className="text-[#FFD700] text-[10px] px-2 whitespace-nowrap font-medium uppercase tracking-widest">
                Café & Kitchen
              </span>

              <div className="h-[1px] flex-grow bg-red-600"></div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 text-[13px] font-bold mx-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={item.name} className="relative group">
                  <Link
                    to={item.path}
                    className={`uppercase transition-colors duration-300 ${
                      isActive
                        ? "text-[#FFD700]"
                        : "text-white hover:text-[#FFD700]"
                    }`}
                  >
                    {item.name}
                  </Link>

                  {/* Active Underline */}
                  {isActive && (
                    <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-red-600" />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Order Button */}
          <Link
            to="/order"
            className="hidden md:flex items-center gap-3 border-2 border-red-600 px-6 py-2 rounded-full hover:bg-red-600/10 transition-all duration-300 group"
          >
            <span className="text-[#FFD700] text-sm font-bold tracking-widest uppercase">
              Order Online
            </span>

            <FiShoppingCart className="text-[#FFD700] text-lg" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#FFD700] text-4xl"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-black ${
            menuOpen ? "max-h-screen py-8" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-6 text-lg font-bold">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`uppercase transition-colors duration-300 ${
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

            {/* Mobile Order Button */}
            <li>
              <Link
                to="/order"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 border-2 border-red-600 text-[#FFD700] px-8 py-3 rounded-full mt-4 uppercase text-sm font-bold hover:bg-red-600/10 transition-all duration-300"
              >
                Order Online

                <FiShoppingCart />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[100px]" />
    </>
  );
}