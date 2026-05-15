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
    { label: "CALL", icon: <PhoneIcon />, path: "/call" },
    { label: "DIRECTIONS", icon: <LocationIcon />, path: "/directions" },
    { label: "WHATSAPP", icon: <WhatsappIcon />, path: "/whatsapp" },
    { label: "ORDER", icon: <OrderIcon />, path: "/order", order: true },
  ];

  return (
    <div style={styles.bar}>
      {btns.map(({ label, icon, path, order }) => {
        const active = location.pathname === path;

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              ...styles.btn,
              background: active
                ? colors.red
                : order
                ? colors.bgDeep
                : "#000",
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
    maxWidth: 430,
    background: "#000",
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