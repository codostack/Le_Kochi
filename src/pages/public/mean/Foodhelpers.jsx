import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance/page";

/* ─── constants ──────────────────────────────────────────────── */
export const DISCOUNT_PERCENT = 10;

/* ─── utils ──────────────────────────────────────────────────── */
export function rupee(n) {
  return `$${Number(n).toFixed(2)}`;
}

export function getToken() {
  return localStorage.getItem("token") || null;
}

/**
 * Verify token with the backend by hitting /auth/verify-token.
 * axiosInstance already injects the Authorization header from localStorage.
 * Returns true only when the server responds { success: true }.
 */
export async function verifyTokenWithBackend() {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await axiosInstance.get("/auth/verify-token");
    console.log("token validation",res);
    
    return res.data?.success === true;
  } catch {
    // 401 / network error → invalid
    return false;
  }
}

// Foodhelpers.jsx — add after getToken()

export function isTokenValid(token) {
  if (!token) return false;
  try {
    // Decode the JWT payload (no library needed — just base64)
    const payload = JSON.parse(atob(token.split(".")[1]));
    // exp is in seconds; Date.now() is in ms
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

/**
 * useAuth — verifies token against the backend on mount.
 * Re-verifies when another tab changes localStorage["token"].
 * Returns { authed, loading, recheck }.
 */
export function useAuth() {
  const [authed,  setAuthed]  = useState(false);
  const [loading, setLoading] = useState(true);

  const check = async () => {
    setLoading(true);
    const valid = await verifyTokenWithBackend();
    setAuthed(valid);
    setLoading(false);
  };

  useEffect(() => {
    console.log("checking");
    
    check();
    const onStorage = (e) => {
      if (e.key === "token") check();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { authed, loading, recheck: check };
}

/**
 * Save cart to localStorage["pending_cart"] before auth redirect.
 */
export function saveCartForLogin(cart) {
  try {
    if (cart && Object.keys(cart).length > 0) {
      localStorage.setItem("pending_cart", JSON.stringify(cart));
    }
  } catch (_) {}
}

/**
 * Restore pending cart after login. Merges with currentCart.
 * Returns merged cart or null.
 */
export function restorePendingCart() {
  try {
    const pending = localStorage.getItem("pending_cart");

    if (!pending) return null;

    const parsed = JSON.parse(pending);

    // save as main cart
    localStorage.setItem("cart", JSON.stringify(parsed));

    // remove temporary cart
    localStorage.removeItem("pending_cart");

    return parsed;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/* ─── Stars ──────────────────────────────────────────────────── */
export const Stars = ({ rating = 0, size = 13 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 12 12"
        fill={i <= Math.round(Number(rating)) ? "#d4af37" : "#2a2a2a"}>
        <path d="M6 1l1.4 2.8L10.5 4.3l-2.25 2.2.53 3.1L6 8.05 3.22 9.6l.53-3.1L1.5 4.3l3.1-.5z" />
      </svg>
    ))}
    <span style={{ fontSize: 11, color: "#666", marginLeft: 3 }}>
      {Number(rating).toFixed(1)}
    </span>
  </div>
);

/* ─── StockBadge ─────────────────────────────────────────────── */
export const StockBadge = ({ stock }) => {
  const n = Number(stock);
  const base = {
    fontSize: 10, fontWeight: 700, padding: "3px 10px",
    borderRadius: 99, display: "inline-block",
  };
  if (n === 0) return (
    <span style={{ ...base, background: "rgba(127,29,29,0.3)", color: "#f87171", border: "1px solid rgba(127,29,29,0.5)" }}>
      Out of Stock
    </span>
  );
  if (n <= 5) return (
    <span style={{ ...base, background: "rgba(120,53,15,0.3)", color: "#fbbf24", border: "1px solid rgba(120,53,15,0.5)" }}>
      Only {n} left
    </span>
  );
  return (
    <span style={{ ...base, background: "rgba(20,83,45,0.3)", color: "#4ade80", border: "1px solid rgba(20,83,45,0.5)" }}>
      In Stock
    </span>
  );
};