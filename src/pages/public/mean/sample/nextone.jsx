import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../../../axiosInstance/page";
import FoodDetailPage from "../Fooddetailpage";
import CartPage from "../Cartpage";
import OrdersPage from "../OrdersPage";

const VIEW = { MENU: "menu", DETAIL: "detail", CART: "cart", ORDERS: "orders" };

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
    if (Object.keys(cart).length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axiosInstance.get("/menu");
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

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = allItems.find((i) => String(i.id) === String(id));
    return sum + (item ? Number(item.price) * qty : 0);
  }, 0);

  const goCart = () => setView(VIEW.CART);
  const goMenu = () => { setView(VIEW.MENU); setSelectedItem(null); };
  const goDetail = (item) => { setSelectedItem(item); setView(VIEW.DETAIL); };

  if (view === VIEW.ORDERS) {
    return <OrdersPage onBack={goMenu} />;
  }

  if (view === VIEW.CART) {
    return (
      <CartPage
        cart={cart}
        setCart={setCart}
        allItems={allItems}
        onBack={() => setView(selectedItem ? VIEW.DETAIL : VIEW.MENU)}
        onOrderPlaced={fetchMenu}
      />
    );
  }

  if (view === VIEW.DETAIL && selectedItem) {
    return (
      <FoodDetailPage
        item={selectedItem}
        allItems={allItems}
        onBack={goMenu}
        onNavigateCart={goCart}
        cart={cart}
        setCart={setCart}
        onOrderPlaced={fetchMenu}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#06120a",
        fontFamily: "'Poppins', sans-serif",
        color: "white",
        paddingBottom: cartCount > 0 ? 110 : 40,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        /* ── TABS ── */
        .tab-scroll::-webkit-scrollbar { display: none; }

        /* ── RESPONSIVE TWEAKS ── */
        @media (max-width: 640px) {
          .menu-title       { font-size: 18px !important; letter-spacing: 4px !important; }
          .header-actions   { gap: 8px !important; }
          .orders-btn-label { display: none; }
          .cart-btn-label   { display: none; }
          .card-img-wrap    { height: 100px !important; width: 100px !important; }
          .card-title       { font-size: 16px !important; }
          .card-price       { font-size: 18px !important; }
        }

        /* ── CATEGORY TABS ── */
        .cat-tab {
          position: relative;
          background: transparent;
          border: none;
          color: #6b7280;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 1.5px;
          padding: 10px 4px;
          cursor: pointer;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: color 0.25s, border-color 0.25s;
        }
        .cat-tab.active {
          color: #eab308;
          border-color: #eab308;
        }
        .cat-tab:hover:not(.active) {
          color: #fbbf24;
        }

        /* ── HEADER BUTTONS ── */
        .hdr-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 14px;
          border: 1px solid #0d2f22;
          background: #041a13;
          color: #6b7280;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          transition: all 0.2s;
        }
        .hdr-btn:hover {
          border-color: rgba(194,155,64,0.5);
          color: #d4af37;
          background: #0a1f10;
        }
        .cart-hdr-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 14px;
          border: 1px solid #0d2f22;
          background: #041a13;
          color: #6b7280;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          transition: all 0.2s;
        }
        .cart-hdr-btn.has-items {
          border-color: #d4af37;
          background: #0e1f07;
          color: #d4af37;
        }
        .cart-hdr-btn:hover {
          border-color: #f0c842;
          color: #f0c842;
          background: #121f08;
        }
      `}</style>

      {/* ── STICKY HEADER ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          width: "100%",
          padding: "16px 24px",
          background: "#06120a",
          borderBottom: "1px solid #0d2f22",
        }}
      >
        <div style={{ margin: "0 auto", width: "100%", maxWidth: 1600 }}>

          {/* title row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 18,
              gap: 16,
            }}
          >
            {/* left spacer */}
            <div style={{ flex: 1 }} />

            {/* centred title with decorative lines */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  height: 1,
                  width: 60,
                  background: "linear-gradient(to right, transparent, #b45309)",
                }}
              />
              <h2
                className="menu-title"
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "6px",
                  color: "#eab308",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                OUR MENU
              </h2>
              <div
                style={{
                  height: 1,
                  width: 60,
                  background: "linear-gradient(to left, transparent, #b45309)",
                }}
              />
            </div>

            {/* right — action buttons */}
            <div
              className="header-actions"
              style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10 }}
            >
              {/* My Orders */}
              <button
                className="hdr-btn"
                onClick={() => setView(VIEW.ORDERS)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
                <span className="orders-btn-label">My Orders</span>
              </button>

              {/* View Cart */}
              {/* <button
                className={`cart-hdr-btn${cartCount > 0 ? " has-items" : ""}`}
                onClick={goCart}
              >
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
                      ${cartTotal.toFixed(2)}
                    </span>
                  </>
                )}
              </button> */}
            </div>
          </div>

          {/* ── CATEGORY TABS ── */}
          <nav
            className="tab-scroll"
            style={{
              display: "flex",
              gap: 24,
              overflowX: "auto",
              borderBottom: "1px solid #0d2f22",
              paddingBottom: 0,
            }}
          >
            {Object.keys(menuData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cat-tab${activeTab === tab ? " active" : ""}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── MENU GRID ── */}
{/* ── MENU LIST ── */}
<div
  style={{
    margin: "0 auto",
    width: "100%",
    maxWidth: 1600,
    padding: "20px 24px 40px",
  }}
>
  <div className="space-y-5">
    {menuData[activeTab]
      ?.filter((item) => item.available)
      .map((item) => {
        const inCart = cart[item.id] || 0;
        const stock = Number(item.stock ?? 0);

        const imgSrc =
          item.image ||
          `https://placehold.co/120x120/041a13/d4af37?text=${encodeURIComponent(
            item.name
          )}`;

        return (
          <div
            key={item.id}
            onClick={() => goDetail(item)}
            className="relative flex items-center gap-4 border border-[#0d2f22] bg-[#041a13] rounded-2xl p-4 group cursor-pointer hover:border-[#c29b40]/40 transition-all duration-300"
          >
            {/* Cart Badge */}
            {inCart > 0 && (
              <div
                className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                style={{
                  background: "#d4af37",
                  color: "#0b0b0b",
                }}
              >
                {inCart}
              </div>
            )}

            {/* Out Of Stock */}
            {stock === 0 && (
              <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center z-10">
                <span className="px-4 py-1 rounded-full border border-red-500 text-red-400 text-xs font-bold bg-black/80">
                  Out of Stock
                </span>
              </div>
            )}

            {/* LEFT CONTENT */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-[#f3e9d2] group-hover:text-yellow-500 transition">
                {item.name}
              </h3>

              {item.description && (
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              )}

              <div className="mt-3 text-yellow-500 font-bold text-lg">
                ${Number(item.price).toFixed(2)}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-[120px] h-[90px] rounded-2xl overflow-hidden border border-yellow-800/20 shadow-xl shrink-0">
              <img
                src={imgSrc}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
          </div>
        );
      })}
  </div>
</div>

      {/* ── FLOATING CART BAR ── */}
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
              boxShadow: "0 8px 40px rgba(212,175,55,0.4)",
              fontFamily: "'Poppins', sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0c842")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#d4af37")}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {cartCount}
            </div>
            <span
              style={{ flex: 1, fontWeight: 600, fontSize: 14, letterSpacing: "0.03em" }}
            >
              View Cart
            </span>
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              ${cartTotal.toFixed(2)}
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}