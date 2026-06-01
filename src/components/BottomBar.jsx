import { useNavigate, useLocation } from "react-router-dom";
import {
  PhoneIcon,
  LocationIcon,
  WhatsappIcon,
  OrderIcon,
} from "./Icons";

import { colors, fonts } from "./theme";

export default function MobileBottomBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const btns = [
    { label: "CALL", icon: <PhoneIcon /> },
    { label: "DIRECTIONS", icon: <LocationIcon /> },
    { label: "WHATSAPP", icon: <WhatsappIcon /> },
    { label: "ORDER", icon: <OrderIcon />, path: "/menu", order: true },
  ];

  return (
    <div style={styles.bar}>
      {btns.map(({ label, icon, path, order }) => {
        const active = location.pathname === path;

        return (
          <button
            // Use label as the key since path doesn't exist on all buttons
            key={label} 
            onClick={() => {
              // OPEN PHONE DIALER
              if (label === "CALL") {
                window.location.href = "tel:9057940444";
                return;
              }

              // OPEN GOOGLE MAPS
              if (label === "DIRECTIONS") {
                const address = "52-6141 Mayfield road Brampton L7A0C4, Ontario";
                // Fixed the template literal syntax here
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  address
                )}`;

                window.open(mapsUrl, "_blank");
                return;
              }

              // OPEN WHATSAPP APP
              if (label === "WHATSAPP") {
                window.location.href = "https://wa.me/14168333222";
                return;
              }

              // NORMAL PAGE
              if (path) navigate(path);
            }}
            style={{
              ...styles.btn,
              background: active
                ? colors.red
                : order
                ? colors.bgDeep
                : "rgb(4, 26, 19)", // Updated button background
              borderRight:
                path !== "/order"
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
            }}
          >
            {icon}

            <span
              style={{
                ...styles.label,
                color: active ? "#fff" : colors.text,
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  bar: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 476,
    background: "rgb(4, 26, 19)", // Updated bar background
    borderTop: `1px solid ${colors.goldBorder}`,
    display: "flex",
    zIndex: 50,
  },

  btn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 0 14px",
    border: "none",
    cursor: "pointer",
    gap: 5,
    fontFamily: fonts.sans,
    transition: "0.2s ease",
  },

  label: {
    fontSize: 9,
    letterSpacing: 1.5,
    fontWeight: 600,
  },
};