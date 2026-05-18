// OrdersPage.jsx
import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance/page";
import { rupee, Stars, getToken, isTokenValid } from "./Foodhelpers";

/* ── Status config ── */
const STATUS_CONFIG = {
  Pending:          { color: "#f4a325", bg: "rgba(244,163,37,0.1)",  border: "rgba(244,163,37,0.3)",  icon: "⏳", step: 0 },
  Confirmed:        { color: "#60a5fa", bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.3)",  icon: "✅", step: 1 },
  Preparing:        { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)", icon: "👨‍🍳", step: 2 },
  "Out for Delivery":{ color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)", icon: "🛵", step: 3 },
  Delivered:        { color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  icon: "🎉", step: 4 },
  Cancelled:        { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)", icon: "❌", step: -1 },
};

const STEPS = ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];

const DISCOUNT_PERCENT = 10;

/* ── StatusBadge ── */
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: "3px 10px",
      borderRadius: 99, display: "inline-flex", alignItems: "center", gap: 4,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
    }}>
      {cfg.icon} {status}
    </span>
  );
}

/* ── ProgressBar ── */
function ProgressBar({ status }) {
  if (status === "Cancelled") return (
    <div style={{ padding: "10px 0", textAlign: "center" }}>
      <span style={{ color: "#f87171", fontSize: 12, fontWeight: 600 }}>
        ❌ Order Cancelled
      </span>
    </div>
  );

  const currentStep = STATUS_CONFIG[status]?.step ?? 0;

  return (
    <div style={{ padding: "8px 0 4px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {STEPS.map((step, idx) => {
          const done    = idx < currentStep;
          const active  = idx === currentStep;
          const cfg     = STATUS_CONFIG[step];
          return (
            <div key={step} style={{ display: "flex", alignItems: "center", flex: idx < STEPS.length - 1 ? 1 : 0 }}>
              {/* circle */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: active ? 28 : 22, height: active ? 28 : 22,
                  borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: done || active ? cfg.bg : "#1a1a1a",
                  border: `2px solid ${done || active ? cfg.color : "#2a2a2a"}`,
                  fontSize: active ? 13 : 10,
                  transition: "all 0.3s",
                  boxShadow: active ? `0 0 12px ${cfg.color}40` : "none",
                }}>
                  {done ? "✓" : active ? cfg.icon : ""}
                </div>
                <span style={{
                  fontSize: 8, color: done || active ? cfg.color : "#444",
                  fontWeight: active ? 700 : 400, whiteSpace: "nowrap",
                  maxWidth: 55, textAlign: "center", lineHeight: 1.2,
                }}>
                  {step}
                </span>
              </div>
              {/* connector line */}
              {idx < STEPS.length - 1 && (
                <div style={{
                  flex: 1, height: 2, margin: "0 2px",
                  marginBottom: 20,
                  background: done ? "#d4af37" : "#1e1e1e",
                  transition: "background 0.3s",
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── OrderCard ── */
function OrderCard({ order, onViewDetail }) {
  const cfg       = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.Pending;
  const itemCount = order.items?.reduce((s, i) => s + i.quantity, 0) ?? 0;
  const date      = new Date(`${order.orderDate}T${order.orderTime}`);

  return (
    <div
      onClick={() => onViewDetail(order)}
      style={{
        borderRadius: 20, padding: "16px 18px",
        background: "#151515", border: `1px solid #222`,
        cursor: "pointer", transition: "all 0.25s",
        display: "flex", flexDirection: "column", gap: 12,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = cfg.color;
        e.currentTarget.style.boxShadow = `0 6px 24px ${cfg.color}15`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#222";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <StatusBadge status={order.orderStatus} />
            <span style={{ fontSize: 10, color: "#555" }}>
              {date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              {" · "}
              {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <p style={{ fontSize: 11, color: "#555", margin: "6px 0 0", fontFamily: "monospace" }}>
            #{order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#d4af37", margin: 0 }}>
            {rupee(order.amount)}
          </p>
          <p style={{ fontSize: 10, color: "#555", margin: "2px 0 0" }}>
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* item image strip */}
      {order.items?.length > 0 && (
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          {order.items.slice(0, 4).map((item, idx) => {
            const imgSrc = item.image ||
              `https://placehold.co/56x56/151515/d4af37?text=${encodeURIComponent(item.name ?? "?")}`;
            return (
              <div key={idx} style={{ position: "relative", flexShrink: 0 }}>
                <img src={imgSrc} alt={item.name} style={{
                  width: 52, height: 52, borderRadius: 10,
                  objectFit: "cover", border: "1px solid #2a2a2a",
                }} />
                {item.quantity > 1 && (
                  <span style={{
                    position: "absolute", bottom: -4, right: -4,
                    width: 16, height: 16, borderRadius: "50%",
                    background: "#d4af37", color: "#0b0b0b",
                    fontSize: 9, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.quantity}
                  </span>
                )}
              </div>
            );
          })}
          {order.items.length > 4 && (
            <div style={{
              width: 52, height: 52, borderRadius: 10,
              background: "#1a1a1a", border: "1px solid #2a2a2a",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: "#666", flexShrink: 0,
            }}>
              +{order.items.length - 4}
            </div>
          )}
        </div>
      )}

      {/* progress bar */}
      <ProgressBar status={order.orderStatus} />

      {/* footer */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: 8, borderTop: "1px solid #1a1a1a",
      }}>
        <span style={{ fontSize: 10, color: "#555" }}>
          💳 {order.paymentMethod}
        </span>
        <span style={{ fontSize: 11, color: "#d4af37", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
          View Details
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ── OrderDetailPage ── */
function OrderDetailPage({ order, onBack }) {
  const cfg       = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.Pending;
  const subtotal  = order.items?.reduce((s, i) => s + Number(i.price) * i.quantity, 0) ?? 0;
  const discount  = Math.round(subtotal * DISCOUNT_PERCENT / 100);
  const date      = new Date(`${order.orderDate}T${order.orderTime}`);

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0b", color: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* navbar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 40,
        padding: "14px 20px",
        background: "rgba(11,11,11,0.96)",
        borderBottom: "1px solid #1d1d1d",
        backdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 12,
            background: "#1a1a1a", border: "1px solid #2a2a2a",
            color: "#aaa", fontSize: 12, fontWeight: 500, cursor: "pointer",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#d4af37" }}>ORDER DETAILS</p>
          <p style={{ margin: 0, fontSize: 10, color: "#555", fontFamily: "monospace" }}>
            #{order.id.toUpperCase()}
          </p>
        </div>
        <StatusBadge status={order.orderStatus} />
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* Status tracker */}
        <div style={{
          borderRadius: 20, padding: "20px 24px",
          background: "#111", border: `1px solid ${cfg.border ?? "#1e1e1e"}`,
          marginBottom: 16,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#555", marginBottom: 16, marginTop: 0 }}>
            Order Status
          </p>
          <ProgressBar status={order.orderStatus} />

          <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 2px" }}>Order Date</p>
              <p style={{ fontSize: 12, color: "#ccc", fontWeight: 600, margin: 0 }}>
                {date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 2px" }}>Order Time</p>
              <p style={{ fontSize: 12, color: "#ccc", fontWeight: 600, margin: 0 }}>
                {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 2px" }}>Payment</p>
              <p style={{ fontSize: 12, color: "#ccc", fontWeight: 600, margin: 0 }}>💳 {order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div style={{ borderRadius: 20, background: "#111", border: "1px solid #1e1e1e", marginBottom: 16, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#d4af37", margin: 0 }}>
              Ordered Items
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {order.items?.map((item, idx) => {
              const imgSrc = item.image ||
                `https://placehold.co/64x64/151515/d4af37?text=${encodeURIComponent(item.name ?? "?")}`;
              return (
                <div key={idx} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 20px",
                  borderBottom: idx < order.items.length - 1 ? "1px solid #1a1a1a" : "none",
                }}>
                  <img src={imgSrc} alt={item.name} style={{
                    width: 60, height: 60, borderRadius: 12,
                    objectFit: "cover", border: "1px solid #2a2a2a", flexShrink: 0,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#e5e5e5", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: 10, color: "#555", margin: "0 0 4px" }}>{item.category}</p>
                    {item.rating && <Stars rating={item.rating} size={10} />}
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#d4af37", margin: "0 0 2px" }}>
                      {rupee(Number(item.price) * item.quantity)}
                    </p>
                    <p style={{ fontSize: 10, color: "#666", margin: 0 }}>
                      {rupee(item.price)} × {item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bill */}
        <div style={{ borderRadius: 20, background: "#111", border: "1px solid #1e1e1e", padding: "20px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#555", margin: "0 0 14px" }}>
            Bill Summary
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#aaa" }}>
              <span>Subtotal</span><span>{rupee(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#4ade80" }}>
              <span>Discount ({DISCOUNT_PERCENT}%)</span><span>− {rupee(discount)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#aaa" }}>
              <span>Delivery</span><span style={{ color: "#4ade80" }}>Free</span>
            </div>
            <div style={{ borderTop: "1px dashed #2a2a2a", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Total Paid</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: "#d4af37" }}>{rupee(order.amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main OrdersPage ── */
export default function OrdersPage({ onBack }) {
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [detail,   setDetail]   = useState(null); // selected order for detail view
  const [filter,   setFilter]   = useState("All");

  const authed = isTokenValid(getToken());

  useEffect(() => {
    if (!authed) { setLoading(false); return; }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/customer/orders/my-orders");
      if (res.data.success) setOrders(res.data.orders);
      else setError("Failed to load orders.");
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Detail view ── */
  if (detail) return <OrderDetailPage order={detail} onBack={() => setDetail(null)} />;

  /* ── Filter tabs ── */
  const FILTERS = ["All", "Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
  const filtered = filter === "All" ? orders : orders.filter((o) => o.orderStatus === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0b", color: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* navbar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 40,
        padding: "14px 20px",
        background: "rgba(11,11,11,0.96)",
        borderBottom: "1px solid #1d1d1d",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onBack}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", borderRadius: 12,
              background: "#1a1a1a", border: "1px solid #2a2a2a",
              color: "#aaa", fontSize: 12, fontWeight: 500, cursor: "pointer",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 style={{ flex: 1, margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: 2, color: "#d4af37" }}>
            MY ORDERS
          </h1>
          <button
            onClick={fetchOrders}
            style={{
              width: 34, height: 34, borderRadius: 10,
              background: "#1a1a1a", border: "1px solid #2a2a2a",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#888",
            }}
            title="Refresh"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
        </div>

        {/* filter tabs */}
        <div style={{ maxWidth: 960, margin: "12px auto 0", display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
          {FILTERS.map((f) => {
            const count = f === "All" ? orders.length : orders.filter((o) => o.orderStatus === f).length;
            const active = filter === f;
            const cfg = f !== "All" ? STATUS_CONFIG[f] : null;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "5px 12px", borderRadius: 99, whiteSpace: "nowrap",
                  fontSize: 11, fontWeight: 600, cursor: "pointer", flexShrink: 0,
                  border: active
                    ? `1px solid ${cfg?.color ?? "#d4af37"}`
                    : "1px solid #1e1e1e",
                  background: active
                    ? (cfg?.bg ?? "rgba(212,175,55,0.1)")
                    : "#111",
                  color: active
                    ? (cfg?.color ?? "#d4af37")
                    : "#555",
                  transition: "all 0.2s",
                }}
              >
                {f} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* body */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px 40px" }}>

        {/* not logged in */}
        {!authed && (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#ccc", marginBottom: 8 }}>Sign in to view orders</p>
            <p style={{ fontSize: 13, color: "#555" }}>You need to be logged in to see your order history.</p>
          </div>
        )}

        {/* loading */}
        {authed && loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                borderRadius: 20, padding: "20px", background: "#151515",
                border: "1px solid #1e1e1e", height: 160,
                animation: "pulse 1.5s ease-in-out infinite",
              }} />
            ))}
            <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.8} }`}</style>
          </div>
        )}

        {/* error */}
        {authed && !loading && error && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ color: "#f87171", fontSize: 13, marginBottom: 16 }}>{error}</p>
            <button
              onClick={fetchOrders}
              style={{
                padding: "10px 24px", borderRadius: 12,
                background: "#d4af37", color: "#0b0b0b",
                border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* empty */}
        {authed && !loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🛍️</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#ccc", marginBottom: 8 }}>
              {filter === "All" ? "No orders yet" : `No ${filter} orders`}
            </p>
            <p style={{ fontSize: 12, color: "#555" }}>
              {filter === "All" ? "Your order history will appear here." : "Try a different filter."}
            </p>
          </div>
        )}

        {/* order cards */}
        {authed && !loading && !error && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.map((order) => (
              <OrderCard key={order.id} order={order} onViewDetail={setDetail} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}