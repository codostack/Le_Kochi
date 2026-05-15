import { useEffect, useState } from "react";
import MobileBottomBar from "./BottomBar";
import { useNavigate } from "react-router-dom";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
  </svg>
);

const WebIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);

const DirectionsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);

const BagIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
  </svg>
);

// ─── Breakpoints ────────────────────────────────────────────────
const BP = { mobile: 480, tablet: 768, desktop: 1024 };

function useBreakpoint() {
  const getSize = () => {
    const w = window.innerWidth;
    if (w <= BP.mobile) return "mobile";
    if (w <= BP.tablet) return "tablet";
    return "desktop";
  };
  const [size, setSize] = useState(getSize);
  useEffect(() => {
    const handler = () => setSize(getSize());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return size;
}

export default function LeKochiFooter() {
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);
  const bp = useBreakpoint();

const isMobile = window.innerWidth <= 480;
  const isTablet = bp === "tablet";

  const quickLinks = [
    { label: "Home",     path: "/" },
    { label: "Menu",     path: "/menu" },
    { label: "About Us", path: "/about" },
    { label: "Catering", path: "/catering" },
    { label: "Gallery",  path: "/gallery" },
    { label: "Contact",  path: "/contact" },
  ];

  const socialLinks = [
    { icon: <InstagramIcon />, label: "Instagram" },
    { icon: <FacebookIcon />,  label: "Facebook" },
    { icon: <WhatsAppIcon />,  label: "WhatsApp" },
    { icon: <GoogleIcon />,    label: "Google" },
  ];

  const contactInfo = [
    { icon: <LocationIcon />, text: "17 Advance Boulevard, Brampton, ON" },
    { icon: <PhoneIcon />,    text: "(905) 456-2015" },
    { icon: <EmailIcon />,    text: "info@lekochi.ca" },
    { icon: <WebIcon />,      text: "www.lekochi.ca" },
  ];

  const ctaButtons = [
    { label: "CALL NOW",      icon: <PhoneIcon />,      bg: "#c0392b", path: "/call" },
    { label: "DIRECTIONS",    icon: <DirectionsIcon />, bg: "#d4a017", path: "/directions" },
    { label: "WHATSAPP",      icon: <WhatsAppIcon />,   bg: "#25a244", path: "/whatsapp" },
    { label: "ORDER ONLINE",  icon: <BagIcon />,        bg: "#c0392b", path: "/order" },
  ];

  // Grid columns: 1 col mobile, 2 col tablet, 4 col desktop
  const gridCols = isMobile
    ? "1fr"
    : isTablet
    ? "repeat(2, 1fr)"
    : "repeat(4, minmax(0, 1fr))";

  return (
    <footer
      style={{
        backgroundColor: "#0d0d0d",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#ccc",
        borderTop: "1px solid #1a1a1a",
      }}
    >
<>
  {/* Hide full footer on very small screens */}
  {!isMobile && (
        <>
          {/* ── MAIN GRID ── */}
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: isTablet ? "40px 20px" : "50px 32px",
              display: "grid",
              gridTemplateColumns: gridCols,
              gap: isTablet ? "32px" : "40px",
            }}
          >
            {/* BRAND */}
            <div>
              <h2 style={{ fontSize: isTablet ? "26px" : "32px", color: "#f5c518", margin: "0 0 10px" }}>
                Le Kochi
              </h2>
              <p style={{ fontSize: "14px", lineHeight: "1.8", color: "#999", margin: 0 }}>
                We bring you the authentic taste of Kerala with the freshest
                ingredients and traditional recipes.
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
                {socialLinks.map((s) => (
                  <button
                    key={s.label}
                    aria-label={s.label}
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      border: "1px solid #333",
                      background: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#aaa",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 style={{ color: "#f5c518", margin: "0 0 20px", letterSpacing: "1px", fontSize: "14px" }}>
                QUICK LINKS
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {quickLinks.map((link) => (
                  <li key={link.label} style={{ marginBottom: "10px" }}>
                    <button
                      onClick={() => navigate(link.path)}
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        color: hoveredLink === link.label ? "#f5c518" : "#bbb",
                        transition: "color 0.2s",
                        fontSize: "15px",
                      }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* HOURS */}
            <div>
              <h4 style={{ color: "#f5c518", margin: "0 0 20px", letterSpacing: "1px", fontSize: "14px" }}>
                HOURS
              </h4>
              <div style={{ marginBottom: "16px" }}>
                <p style={{ color: "#fff", margin: "0 0 4px", fontSize: "14px" }}>Mon – Thu</p>
                <p style={{ color: "#888", margin: 0, fontSize: "14px" }}>11:00 AM – 10:00 PM</p>
              </div>
              <div>
                <p style={{ color: "#fff", margin: "0 0 4px", fontSize: "14px" }}>Fri – Sun</p>
                <p style={{ color: "#888", margin: 0, fontSize: "14px" }}>11:00 AM – 11:00 PM</p>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h4 style={{ color: "#f5c518", margin: "0 0 20px", letterSpacing: "1px", fontSize: "14px" }}>
                CONTACT
              </h4>
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "#f5c518", flexShrink: 0, marginTop: "2px" }}>
                    {item.icon}
                  </span>
                  <span style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.5", wordBreak: "break-word" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA BUTTONS ── */}
          <div
            style={{
              borderTop: "1px solid #1a1a1a",
              padding: isTablet ? "20px 20px" : "24px 32px",
              display: "grid",
              // 2-col on tablet, 4-col on desktop
              gridTemplateColumns: isTablet
                ? "repeat(2, minmax(0, 1fr))"
                : "repeat(4, minmax(0, 1fr))",
              gap: "12px",
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            {ctaButtons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => navigate(btn.path)}
                style={{
                  border: "none",
                  padding: "14px 16px",
                  borderRadius: "8px",
                  backgroundColor: btn.bg,
                  color: "#fff",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  width: "100%",
                  whiteSpace: "nowrap",
                }}
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}
          </div>

          {/* ── COPYRIGHT ── */}
          <div
            style={{
              borderTop: "1px solid #161616",
              padding: "16px",
              textAlign: "center",
              backgroundColor: "#080808",
            }}
          >
            <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>
              © {new Date().getFullYear()} Le Kochi Café & Kitchen. All rights reserved.
            </p>
          </div>
        </>
      )}

      {/* Show only MobileBottomBar below 400px */}
      {isMobile && <MobileBottomBar />}
    </>
    </footer>
  );
}