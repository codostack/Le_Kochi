// Foodhelpers.jsx
// Shared utilities, atoms, and the InlineMenuBrowser used by
// FoodDetailPage and CartPage.

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance/page";

/* ─── constants ──────────────────────────────────────────────── */
export const DISCOUNT_PERCENT = 10;

/* ─── utils ──────────────────────────────────────────────────── */
export function rupee(n) {
  return `₹${Number(n).toFixed(2)}`;
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

/* ─── AuthPanel ──────────────────────────────────────────────── */
export function AuthPanel({ cart = {} }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    saveCartForLogin(cart);
    navigate("/login", { state: { from: "/menu" } });
  };
  const handleRegister = () => {
    saveCartForLogin(cart);
    navigate("/registration", { state: { from: "/menu" } });
  };

  return (
    <div style={{ padding: "20px 16px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "#1a1a1a", border: "1px solid #2a2a2a",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 10px",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.8">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Sign in to Order</p>
        <p style={{ fontSize: 11, color: "#666", lineHeight: 1.5, margin: 0 }}>
          You need an account to place orders
        </p>
      </div>

      <button onClick={handleLogin} style={{
        width: "100%", padding: "11px 0", borderRadius: 12,
        background: "#d4af37", color: "#0b0b0b", border: "none",
        fontSize: 11, fontWeight: 700, letterSpacing: "1px",
        textTransform: "uppercase", cursor: "pointer",
      }}>
        Login
      </button>
      <button onClick={handleRegister} style={{
        width: "100%", padding: "11px 0", borderRadius: 12,
        background: "transparent", color: "#999",
        border: "1px solid #2a2a2a", fontSize: 11, fontWeight: 600, cursor: "pointer",
      }}>
        Create Account
      </button>

      <div style={{
        borderRadius: 10, padding: "8px 12px",
        background: "#0d0d0d", border: "1px solid #1a1a1a",
        fontSize: 10, color: "#555", textAlign: "center",
      }}>
        🔒 Your order data is encrypted and secure
      </div>

      <div style={{ marginTop: 4 }}>
        <p style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 6 }}>
          Accepted after login
        </p>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          {["UPI", "Card", "Net Banking", "COD"].map((m) => (
            <span key={m} style={{ fontSize: 9, padding: "3px 8px", borderRadius: 6, background: "#111", border: "1px solid #1e1e1e", color: "#555" }}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── DeliveryNote ───────────────────────────────────────────── */
export function DeliveryNote() {
  return (
    <div style={{
      margin: "12px 16px 16px", borderRadius: 12,
      padding: "10px 14px", background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      display: "flex", alignItems: "center", gap: 10,
      fontSize: 11, color: "#666",
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f4a325" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
      Free delivery on orders above ₹500
    </div>
  );
}

/* ─── PaymentMethodSelector ──────────────────────────────────── */
export function PaymentMethodSelector({ method, setMethod, upi, setUpi, nameAttr = "pay" }) {
  const methods = [
    { id: "upi",  label: "UPI",                icon: "💳" },
    { id: "card", label: "Credit / Debit Card", icon: "🏦" },
    { id: "nb",   label: "Net Banking",         icon: "🌐" },
    { id: "cod",  label: "Cash on Delivery",    icon: "💵" },
  ];
  return (
    <div>
      <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#555", marginBottom: 8, marginTop: 4 }}>
        Payment Method
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {methods.map((m) => (
          <label key={m.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 12, cursor: "pointer",
            border: `1px solid ${method === m.id ? "#d4af37" : "#1e1e1e"}`,
            background: method === m.id ? "#1a1a0a" : "#0d0d0d",
            transition: "all 0.15s",
          }}>
            <input type="radio" name={nameAttr} value={m.id}
              checked={method === m.id} onChange={() => setMethod(m.id)}
              style={{ accentColor: "#d4af37", width: 12, height: 12 }} />
            <span style={{ fontSize: 14 }}>{m.icon}</span>
            <span style={{ fontSize: 12, color: method === m.id ? "#d4af37" : "#666", fontWeight: method === m.id ? 600 : 400 }}>
              {m.label}
            </span>
          </label>
        ))}
      </div>
      {method === "upi" && (
        <input type="text" placeholder="yourname@upi" value={upi}
          onChange={(e) => setUpi(e.target.value)}
          style={{
            width: "100%", marginTop: 8, padding: "10px 12px",
            borderRadius: 12, background: "#111",
            border: "1px solid #222", color: "#ccc",
            fontSize: 12, outline: "none", boxSizing: "border-box",
          }} />
      )}
    </div>
  );
}

/* ─── MiniItemCard ───────────────────────────────────────────── */
function MiniItemCard({ item, qty, onAdd, onRemove }) {
  const stock = Number(item.stock ?? 99);
  const imgSrc = item.image || `https://placehold.co/120x90/151515/d4af37?text=${encodeURIComponent(item.name)}`;
  const outOfStock = stock === 0;

  return (
    <div style={{
      position: "relative", flexShrink: 0, width: 176, borderRadius: 16,
      overflow: "hidden", border: `1px solid ${qty > 0 ? "#d4af37" : "#222"}`,
      background: "#151515", transition: "border-color 0.2s",
    }}>
      {qty > 0 && (
        <div style={{
          position: "absolute", top: 8, left: 8, zIndex: 10,
          width: 20, height: 20, borderRadius: "50%",
          background: "#d4af37", color: "#0b0b0b", fontSize: 10, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{qty}</div>
      )}
      {outOfStock && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10, pointerEvents: "none",
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#f87171", padding: "3px 8px", borderRadius: 99, background: "rgba(0,0,0,0.8)", border: "1px solid #7f1d1d" }}>
            Out of Stock
          </span>
        </div>
      )}
      <img src={imgSrc} alt={item.name} style={{ width: "100%", height: 96, objectFit: "cover" }} />
      <div style={{ padding: 12 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "#e5e5e5", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
        <p style={{ fontSize: 10, color: "#555", margin: "0 0 8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.category}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#d4af37" }}>{rupee(item.price)}</span>
          {!outOfStock && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {qty > 0 && (
                <button onClick={() => onRemove(item)} style={{
                  width: 24, height: 24, borderRadius: "50%", border: "1px solid #333",
                  background: "none", color: "#ccc", fontSize: 14, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                }}>−</button>
              )}
              <button onClick={() => onAdd(item)} disabled={qty >= stock} style={{
                width: 24, height: 24, borderRadius: "50%", border: "none",
                background: qty >= stock ? "#222" : "#d4af37",
                color: qty >= stock ? "#555" : "#0b0b0b",
                fontSize: 14, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: qty >= stock ? "not-allowed" : "pointer",
              }}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── InlineMenuBrowser ──────────────────────────────────────── */
export function InlineMenuBrowser({ allItems, cart, setCart, currentItemId }) {
  const categories = useMemo(() => [...new Set(allItems.map((i) => i.category))], [allItems]);
  const [activeTab, setActiveTab] = useState(categories[0] || "");

  const filtered = useMemo(
    () => allItems.filter(
      (i) => i.category === activeTab &&
        String(i.id) !== String(currentItemId) &&
        i.available !== false
    ),
    [allItems, activeTab, currentItemId]
  );

  const addItem = (item) => {
    const stock = Number(item.stock ?? 99);
    setCart((prev) => {
      const cur = prev[item.id] || 0;
      if (cur >= stock) return prev;
      return { ...prev, [item.id]: cur + 1 };
    });
  };
  const removeItem = (item) => {
    setCart((prev) => {
      const cur = prev[item.id] || 0;
      if (cur <= 1) { const n = { ...prev }; delete n[item.id]; return n; }
      return { ...prev, [item.id]: cur - 1 };
    });
  };

  return (
    <div style={{ borderRadius: 20, background: "#111", border: "1px solid #1e1e1e", overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#d4af37", margin: "0 0 2px" }}>Add More Items</p>
          <p style={{ fontSize: 10, color: "#555", margin: 0 }}>Browse our full menu below</p>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </div>
      <div style={{ display: "flex", overflowX: "auto", borderBottom: "1px solid #1a1a1a" }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveTab(cat)} style={{
            padding: "10px 16px", fontSize: 12, fontWeight: 600,
            whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer",
            border: "none", background: "none",
            borderBottom: `2px solid ${activeTab === cat ? "#d4af37" : "transparent"}`,
            color: activeTab === cat ? "#d4af37" : "#666", transition: "all 0.15s",
          }}>{cat}</button>
        ))}
      </div>
      <div style={{ padding: 16, display: "flex", gap: 12, overflowX: "auto" }}>
        {filtered.length === 0
          ? <p style={{ fontSize: 12, color: "#555", padding: "12px 8px" }}>No items in this category</p>
          : filtered.map((item) => (
            <MiniItemCard key={item.id} item={item} qty={cart[item.id] || 0} onAdd={addItem} onRemove={removeItem} />
          ))
        }
      </div>
    </div>
  );
}