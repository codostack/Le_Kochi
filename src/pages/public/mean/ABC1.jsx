import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../../axiosInstance/page";
import FoodDetailPage from "./Fooddetailpage";
import CartPage from "./Cartpage";
import OrdersPage from "./OrdersPage";   // ← add import

/* ─── view states ─────────────────────────────────────────── */
const VIEW = { MENU: "menu", DETAIL: "detail", CART: "cart", ORDERS: "orders" }; // ← add ORDERS

export default function MenuPage() {
  const [menuData, setMenuData] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || {};
    } catch {
      return {};
    }
  });
  const [view, setView] = useState(VIEW.MENU);

  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

useEffect(() => {
  if (Object.keys(cart).length > 0) {
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    localStorage.removeItem("cart");   // clean up when cart is emptied
  }
}, [cart]);

  /* ── fetch ── */
  useEffect(() => { fetchMenu(); }, []);

  const fetchMenu = async () => {
    try {
      const res = await axiosInstance.get("/admin/menu");
      if (res.data.success) {
        const grouped = res.data.items.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {});
        setMenuData(grouped);
        const first = Object.keys(grouped)[0];
        if (first) setActiveTab(first);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const allItems = useMemo(() => Object.values(menuData).flat(), [menuData]);

  /* cart totals */
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = allItems.find((i) => String(i.id) === String(id));
    return sum + (item ? Number(item.price) * qty : 0);
  }, 0);

  /* ── navigation helpers ── */
  const goCart = () => setView(VIEW.CART);
  const goMenu = () => { setView(VIEW.MENU); setSelectedItem(null); };
  const goDetail = (item) => { setSelectedItem(item); setView(VIEW.DETAIL); };

// MenuPage.jsx — wire onOrderPlaced so stock refreshes after order
if (view === VIEW.ORDERS) {
  return <OrdersPage onBack={goMenu} />;
}

// CartPage render:
if (view === VIEW.CART) {
  return (
    <CartPage
      cart={cart}
      setCart={setCart}
      allItems={allItems}
      onBack={() => setView(selectedItem ? VIEW.DETAIL : VIEW.MENU)}
      onOrderPlaced={fetchMenu}   // ← ADD
    />
  );
}

// FoodDetailPage render:
if (view === VIEW.DETAIL && selectedItem) {
  return (
    <FoodDetailPage
      item={selectedItem}
      allItems={allItems}
      onBack={goMenu}
      onNavigateCart={goCart}
      cart={cart}
      setCart={setCart}
      onOrderPlaced={fetchMenu}   // ← ADD
    />
  );
}

  /* ── MenuPage ── */
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#0b0b0b",
        fontFamily: "'Poppins', sans-serif",
        color: "white",
        paddingBottom: cartCount > 0 ? 100 : 0,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ── STICKY HEADER ── */}
      <div
        style={{
          position: "sticky",
          top: 90,
          zIndex: 40,
          width: "100%",
          padding: "18px 24px",
          background: "#0b0b0b",
          borderBottom: "1px solid #1d1d1d",
        }}
      >
        <div style={{ margin: "0 auto", width: "100%", maxWidth: 1600 }}>

          {/* title row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 22,
              gap: 16,
            }}
          >
            <div style={{ flex: 1 }} />

            <h2
              className="menu-title"
              style={{
                fontSize: 30,
                fontWeight: 500,
                letterSpacing: "3px",
                color: "#d4af37",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              OUR MENU
            </h2>

            {/* cart button — top right */}
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <button
    onClick={() => setView(VIEW.ORDERS)}
    style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "8px 14px", borderRadius: 14,
      border: "1px solid #2a2a2a", background: "#151515",
      color: "#888", cursor: "pointer",
      fontSize: 13, fontWeight: 600,
      fontFamily: "'Poppins', sans-serif",
      transition: "all 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "#d4af37";
      e.currentTarget.style.color = "#d4af37";
      e.currentTarget.style.background = "#1a1a0a";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "#2a2a2a";
      e.currentTarget.style.color = "#888";
      e.currentTarget.style.background = "#151515";
    }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
    <span className="cart-btn-label">My Orders</span>  {/* ← reuses existing class that hides on mobile */}
  </button>

             
              <button
                onClick={goCart}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: 14,
                  border: cartCount > 0 ? "1px solid #d4af37" : "1px solid #2a2a2a",
                  background: cartCount > 0 ? "#1e1a0a" : "#151515",
                  color: cartCount > 0 ? "#d4af37" : "#666",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#2a2010";
                  e.currentTarget.style.borderColor = "#f0c842";
                  e.currentTarget.style.color = "#f0c842";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = cartCount > 0 ? "#1e1a0a" : "#151515";
                  e.currentTarget.style.borderColor = cartCount > 0 ? "#d4af37" : "#2a2a2a";
                  e.currentTarget.style.color = cartCount > 0 ? "#d4af37" : "#666";
                }}
              >
                {/* cart icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span className="cart-btn-label">View Cart</span>
                {cartCount > 0 && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "#d4af37",
                        color: "#0b0b0b",
                        fontSize: 10,
                        fontWeight: 800,
                      }}
                    >
                      {cartCount}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>
                      ₹{cartTotal.toFixed(2)}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* category tabs */}
          <nav style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 2 }}>
            {Object.keys(menuData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="tab-btn"
                style={{
                  position: "relative",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                  paddingBottom: 10,
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "'Poppins', sans-serif",
                  color: activeTab === tab ? "#ffffff" : "#bfbfbf",
                }}
              >
                {tab}
                {activeTab === tab && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: 3,
                      width: "100%",
                      borderRadius: 10,
                      background: "#f4a325",
                    }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── GRID ── */}
      <div
        className="menu-grid-wrap"
        style={{ margin: "0 auto", width: "100%", maxWidth: 1600, padding: "50px 24px" }}
      >
        <div className="menu-grid">
          {menuData[activeTab]
            ?.filter((item) => item.available)
            .map((item) => {
              const inCart = cart[item.id] || 0;
              const stock = Number(item.stock ?? 0);
              const imgSrc =
                item.image ||
                `https://placehold.co/120x120/151515/d4af37?text=${encodeURIComponent(item.name)}`;

              return (
                <div
                  key={item.id}
                  onClick={() => goDetail(item)}
                  className="menu-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    minHeight: 190,
                    borderRadius: 22,
                    padding: 18,
                    background: "#151515",
                    border: "1px solid #222",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.borderColor = "#d4af37";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(212,175,55,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "#222";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* cart qty badge */}
                  {inCart > 0 && (
                    <div
                      style={{
                        position: "absolute", top: 10, left: 10,
                        width: 22, height: 22, borderRadius: "50%",
                        background: "#d4af37", color: "#0b0b0b",
                        fontSize: 11, fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        zIndex: 2,
                      }}
                    >
                      {inCart}
                    </div>
                  )}

                  {/* out of stock overlay */}
                  {stock === 0 && (
                    <div
                      style={{
                        position: "absolute", inset: 0, borderRadius: 22,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        zIndex: 3, pointerEvents: "none",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12, fontWeight: 700, color: "#e84040",
                          padding: "5px 14px", borderRadius: 99,
                          background: "rgba(0,0,0,0.8)", border: "1px solid #e84040",
                        }}
                      >
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* left — text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      className="card-title"
                      style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.3, color: "white", margin: "0 0 6px" }}
                    >
                      {item.name}
                    </h3>

                    <span
                      style={{
                        display: "inline-block", fontSize: 10, fontWeight: 500,
                        padding: "2px 9px", borderRadius: 99,
                        background: "#1e1e1e", color: "#888", border: "1px solid #2a2a2a",
                        marginBottom: 8,
                      }}
                    >
                      {item.quality}
                    </span>

                    {item.description && (
                      <p
                        className="card-desc"
                        style={{
                          fontSize: 12, lineHeight: 1.5, color: "#777", margin: "0 0 10px",
                          overflow: "hidden", display: "-webkit-box",
                          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.description}
                      </p>
                    )}

                    {item.cooking_time && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f4a325" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span style={{ fontSize: 11, color: "#666" }}>{item.cooking_time}</span>
                      </div>
                    )}

                    {item.rating && (
                      <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 10 }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg key={i} width="11" height="11" viewBox="0 0 12 12"
                            fill={i <= Math.round(Number(item.rating)) ? "#d4af37" : "#2a2a2a"}>
                            <path d="M6 1l1.4 2.8L10.5 4.3l-2.25 2.2.53 3.1L6 8.05 3.22 9.6l.53-3.1L1.5 4.3l3.1-.5z" />
                          </svg>
                        ))}
                        <span style={{ fontSize: 11, color: "#666", marginLeft: 3 }}>
                          {Number(item.rating).toFixed(1)}
                        </span>
                      </div>
                    )}

                    <h4
                      className="card-price"
                      style={{ fontSize: 22, fontWeight: 700, color: "#d4af37", margin: 0 }}
                    >
                      ₹{Number(item.price).toFixed(2)}
                    </h4>
                  </div>

                  {/* right — image */}
                  <div
                    className="card-img-wrap"
                    style={{ height: 120, width: 120, flexShrink: 0, overflow: "hidden", borderRadius: 16 }}
                  >
                    <img
                      src={imgSrc}
                      alt={item.name}
                      style={{ height: "100%", width: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* ── FLOATING CART BAR (mobile-first, visible when items in cart) ── */}
      {cartCount > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
          }}
        >
          <button
            onClick={goCart}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 24px",
              borderRadius: 18,
              background: "#d4af37",
              color: "#0b0b0b",
              border: "none",
              minWidth: 280,
              cursor: "pointer",
              boxShadow: "0 8px 40px rgba(212,175,55,0.35)",
              fontFamily: "'Poppins', sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0c842")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#d4af37")}
          >
            <div
              style={{
                width: 32, height: 32, borderRadius: 10,
                background: "rgba(0,0,0,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14,
              }}
            >
              {cartCount}
            </div>
            <span style={{ flex: 1, fontWeight: 600, fontSize: 14, letterSpacing: "0.03em" }}>
              View Cart
            </span>
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              ₹{cartTotal.toFixed(2)}
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 768px) {
          .menu-title      { font-size: 20px !important; letter-spacing: 2px !important; }
          .menu-grid-wrap  { padding: 35px 14px !important; }
          .tab-btn         { font-size: 12px !important; }
          .cart-btn-label  { display: none; }
        }

        /* GRID */
        .menu-grid { display: grid; gap: 20px; grid-template-columns: repeat(4, 1fr); }

        @media (min-width: 1600px) { .menu-grid { grid-template-columns: repeat(5, 1fr); } }
        @media (max-width: 1280px) { .menu-grid { grid-template-columns: repeat(2, 1fr); } }

        /* MOBILE — 1 col */
        @media (max-width: 768px) {
          .menu-grid      { grid-template-columns: 1fr; gap: 14px; }
          .menu-card      { min-height: 0 !important; border-radius: 18px !important; padding: 14px !important; gap: 14px !important; }
          .card-title     { font-size: 17px !important; }
          .card-desc      { font-size: 11px !important; }
          .card-price     { font-size: 18px !important; }
          .card-img-wrap  { height: 110px !important; width: 110px !important; border-radius: 14px !important; }
        }
      `}</style>
    </div>
  );
}