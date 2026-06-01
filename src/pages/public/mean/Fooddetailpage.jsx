import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Stars,
  StockBadge,
  saveCartForLogin,
} from "./Foodhelpers";


// ==========================================
// 0. SUB-COMPONENT: MINI ITEM CARD (used inside InlineMenuBrowser)
// ==========================================
function MiniItemCard({ item, qty, onAdd, onRemove }) {
  const stock = Number(item.stock ?? 99);
  const imgSrc =
    item.image ||
    `https://placehold.co/200x200/0a1411/d4af37?text=${encodeURIComponent(item.name)}`;

  return (
    <div
      style={{
        minWidth: 140,
        maxWidth: 140,
        background: "#11201b",
        border: "1px solid rgba(212, 175, 55, 0.2)",
        borderRadius: 14,
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", width: "100%", height: 90 }}>
        <img
          src={imgSrc}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {stock === 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(10,20,17,0.85)",
              display: "flex",
              alignItems: "center",
              justify: "center",
              fontSize: 10,
              color: "rgba(212, 175, 55, 0.4)",
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            OUT OF STOCK
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "8px 10px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <p
          style={{
            fontSize: 11,
            color: "#eab308",
            margin: 0,
            fontWeight: 500,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.name}
        </p>
        <p style={{ fontSize: 12, color: "#ca8a04", margin: 0, fontWeight: 600 }}>
          ${Number(item.price).toFixed(2)}
        </p>
      </div>

      {/* Add / Counter */}
      <div style={{ padding: "0 10px 10px" }}>
        {qty === 0 ? (
          <button
            disabled={stock === 0}
            onClick={() => onAdd(item)}
            style={{
              width: "100%",
              padding: "6px 0",
              background: "transparent",
              border: "1.5px solid #eab308",
              borderRadius: 8,
              color: "#eab308",
              fontSize: 11,
              fontWeight: 700,
              cursor: stock === 0 ? "not-allowed" : "pointer",
              opacity: stock === 0 ? 0.4 : 1,
              letterSpacing: 1,
            }}
          >
            ADD
          </button>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#eab308",
              borderRadius: 8,
              padding: "3px 6px",
            }}
          >
            <button
              onClick={() => onRemove(item)}
              style={{
                background: "none",
                border: "none",
                color: "#0a1411",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                lineHeight: 1,
                padding: "0 2px",
              }}
            >
              −
            </button>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0a1411" }}>{qty}</span>
            <button
              disabled={qty >= stock}
              onClick={() => onAdd(item)}
              style={{
                background: "none",
                border: "none",
                color: "#0a1411",
                fontSize: 16,
                fontWeight: 700,
                cursor: qty >= stock ? "not-allowed" : "pointer",
                opacity: qty >= stock ? 0.4 : 1,
                lineHeight: 1,
                padding: "0 2px",
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// ==========================================
// 1. SUB-COMPONENT: INLINE MENU BROWSER
// ==========================================
export function InlineMenuBrowser({ allItems, cart, setCart, currentItemId }) {
  const categories = useMemo(() => {
    return [
      ...new Set(
        allItems.filter((item) => item.category).map((item) => item.category)
      ),
    ];
  }, [allItems]);

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  const filtered = useMemo(() => {
    return allItems.filter(
      (item) =>
        item.category === activeTab &&
        String(item.id) !== String(currentItemId) &&
        item.available !== false
    );
  }, [allItems, activeTab, currentItemId]);

  const addItem = (item) => {
    const stock = Number(item.stock ?? 99);
    setCart((prev) => {
      const current = prev[item.id]?.qty || 0;
      if (current >= stock) return prev;
      return {
        ...prev,
        [item.id]: {
          qty: current + 1,
          extraPrice: prev[item.id]?.extraPrice || 0,
        },
      };
    });
  };

  const removeItem = (item) => {
    setCart((prev) => {
      const current = prev[item.id]?.qty || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[item.id];
        return next;
      }
      return {
        ...prev,
        [item.id]: {
          qty: current - 1,
          extraPrice: prev[item.id]?.extraPrice || 0,
        },
      };
    });
  };

  return (
    <div
      style={{
        borderRadius: 20,
        background: "#11201b",
        border: "1px solid rgba(234, 179, 8, 0.15)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(234, 179, 8, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#eab308",
              margin: 0,
            }}
          >
            Add More Items
          </p>
          <p style={{ fontSize: 10, color: "#ca8a04", opacity: 0.6, margin: "4px 0 0" }}>
            Browse our menu
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          borderBottom: "1px solid rgba(234, 179, 8, 0.1)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            style={{
              padding: "10px 16px",
              fontSize: 12,
              fontWeight: 600,
              whiteSpace: "nowrap",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: activeTab === cat ? "#eab308" : "#ca8a04",
              opacity: activeTab === cat ? 1 : 0.5,
              borderBottom:
                activeTab === cat
                  ? "2px solid #eab308"
                  : "2px solid transparent",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Row */}
      <div
        style={{
          padding: 16,
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {filtered.length === 0 ? (
          <p style={{ color: "#ca8a04", opacity: 0.5, fontSize: 12 }}>No items found</p>
        ) : (
          filtered.map((item) => (
            <MiniItemCard
              key={item.id}
              item={item}
              qty={cart[item.id]?.qty || 0}
              onAdd={addItem}
              onRemove={removeItem}
            />
          ))
        )}
      </div>
    </div>
  );
}


// ==========================================
// 2. SUB-COMPONENT: ACCOMPANIMENTS MODAL
// ==========================================
function AccompanimentsModal({ isOpen, onClose, itemName, basePrice, onAddItem }) {
  const [selectedAccompaniments, setSelectedAccompaniments] = useState({
    chutney: false,
    sambar: false,
  });
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const itemPrices = {
    chutney: 1.25,
    sambar: 2.0,
  };

  const handleCheckboxChange = (key) => {
    setSelectedAccompaniments((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateUnitPrice = () => {
    let extra = 0;
    if (selectedAccompaniments.chutney) extra += itemPrices.chutney;
    if (selectedAccompaniments.sambar) extra += itemPrices.sambar;
    return Number(basePrice) + extra;
  };

  const currentUnitPrice = calculateUnitPrice();
  const totalPrice = currentUnitPrice * quantity;

  const handleAddClick = () => {
    onAddItem({ quantity, selectedAccompaniments, totalPrice });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm antialiased animate-fadeIn p-2 pb-6 sm:p-0">
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      <div className="w-full sm:max-w-[450px] bg-[#0a1411] border border-yellow-600/10 rounded-[20px] overflow-hidden shadow-2xl flex flex-col max-h-[80vh] animate-slideUp">

        {/* Header */}
        <div className="relative p-4 bg-[#11201b]/60 flex items-center justify-between border-b border-yellow-600/10">
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 flex items-center justify-center border border-yellow-500 p-0.5 rounded-sm">
              <span className="w-2 h-2 block bg-yellow-500 rounded-full"></span>
            </span>
            <h3 className="text-[15px] font-semibold text-yellow-500 truncate max-w-[280px]">
              {itemName || "Customization Options"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#11201b] flex items-center justify-center text-yellow-500 hover:bg-yellow-950/40 transition-colors cursor-pointer"
          >
            <span className="text-xs font-normal">✕</span>
          </button>
        </div>

        {/* Options */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          <div className="px-1">
            <h4 className="text-[14px] font-semibold text-yellow-500">Accompaniments</h4>
            <p className="text-[11px] text-yellow-600/50 font-normal">Select up to 2</p>
          </div>

          <div className="bg-[#11201b]/40 rounded-[16px] overflow-hidden p-1 space-y-0.5 border border-yellow-600/10 shadow-sm">
            {/* Chutney */}
            <label className="flex items-center justify-between p-3.5 hover:bg-[#11201b]/60 transition-all cursor-pointer border-b border-yellow-600/5">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 flex items-center justify-center border border-yellow-500 p-0.5 rounded-sm mt-0.5">
                  <span className="w-1.5 h-1.5 block bg-yellow-500 rounded-full"></span>
                </div>
                <span className="text-[13px] font-medium text-yellow-500/90">Coconut Chutney</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-normal text-yellow-600/60 tabular-nums">
                  + ${itemPrices.chutney.toFixed(2)}
                </span>
                <input
                  type="checkbox"
                  checked={selectedAccompaniments.chutney}
                  onChange={() => handleCheckboxChange("chutney")}
                  className="w-4 h-4 rounded border-yellow-600/30 text-yellow-500 bg-[#0a1411] focus:ring-0 cursor-pointer accent-yellow-500"
                />
              </div>
            </label>

            {/* Sambar */}
            <label className="flex items-center justify-between p-3.5 hover:bg-[#11201b]/60 transition-all cursor-pointer border-b border-yellow-600/5">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 flex items-center justify-center border border-yellow-500 p-0.5 rounded-sm mt-0.5">
                  <span className="w-1.5 h-1.5 block bg-yellow-500 rounded-full"></span>
                </div>
                <span className="text-[13px] font-medium text-yellow-500/90">Extra Sambar Bowl</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-normal text-yellow-600/60 tabular-nums">
                  + ${itemPrices.sambar.toFixed(2)}
                </span>
                <input
                  type="checkbox"
                  checked={selectedAccompaniments.sambar}
                  onChange={() => handleCheckboxChange("sambar")}
                  className="w-4 h-4 rounded border-yellow-600/30 text-yellow-500 bg-[#0a1411] focus:ring-0 cursor-pointer accent-yellow-500"
                />
              </div>
            </label>

            {/* Unavailable item */}
            <div className="p-3.5 opacity-40 select-none bg-black/10">
              <span className="text-[11px] font-normal text-amber-500 block mb-1">
                Unavailable at the moment
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 flex items-center justify-center border border-yellow-500/50 p-0.5 rounded-sm">
                    <span className="w-1.5 h-1.5 block bg-yellow-500/50 rounded-full"></span>
                  </div>
                  <span className="text-[13px] font-normal text-yellow-600/50 line-through">
                    Green Salad (200 Gms)
                  </span>
                </div>
                <input
                  type="checkbox"
                  disabled
                  className="w-4 h-4 rounded border-yellow-600/20 cursor-not-allowed bg-[#0a1411]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 pb-14 sm:pb-4 bg-[#11201b]/60 border-t border-yellow-600/10 flex items-center justify-between gap-4 shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
          <div className="flex items-center bg-[#0a1411] border border-yellow-600/20 rounded-lg p-0.5 h-10 min-w-[90px] justify-between shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-full flex items-center justify-center text-yellow-600/40 hover:text-yellow-500 font-normal text-sm transition-colors cursor-pointer"
            >
              —
            </button>
            <span className="text-[13px] text-yellow-500 font-semibold tabular-nums">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-full flex items-center justify-center text-yellow-500 hover:text-yellow-400 font-normal text-lg transition-colors cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddClick}
            className="flex-1 h-10 bg-yellow-500 text-[#0a1411] rounded-lg text-[13px] font-bold transition-all hover:bg-yellow-600 flex items-center justify-center px-4 shadow-sm cursor-pointer"
          >
            <span className="tabular-nums">Add Item | ${totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 3. MAIN COMPONENT: FOOD DETAIL PAGE
// ==========================================
export default function FoodDetailPage({
  item,
  allItems = [],
  onBack,
  onNavigateCart,
  cart,
  setCart,
  onOrderPlaced,
}) {
  const qty = cart[item.id]?.qty || 0;
  const stock = Number(item.stock ?? 99);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const authed = !!token;
  const loading = false;

  const [isAccompanimentOpen, setIsAccompanimentOpen] = useState(false);

  const setQty = (val) => {
    const capped = Math.min(val, stock);
    setCart((prev) => {
      const next = { ...prev };
      if (capped <= 0) {
        delete next[item.id];
      } else {
        next[item.id] = {
          qty: capped,
          extraPrice: prev[item.id]?.extraPrice || 0,
        };
      }
      return next;
    });
  };

  const cartCount = Object.values(cart).reduce(
    (sum, entry) => sum + (entry?.qty || 0),
    0
  );

  const totalQty = Object.values(cart).reduce(
    (sum, entry) => sum + (entry?.qty || 0),
    0
  );

  const cartTotal = Object.entries(cart).reduce((sum, [id, cartItem]) => {
    const product = allItems.find((i) => String(i.id) === String(id));
    if (!product) return sum;
    return (
      sum +
      (Number(product.price) + (cartItem?.extraPrice || 0)) * (cartItem?.qty || 0)
    );
  }, 0);

  const finalTotal = cartTotal;

  const handleLogin = () => {
    saveCartForLogin(cart);
    navigate("/login", { state: { from: "/menu" } });
  };

  const handleNavigateCart = () => {
    if (onNavigateCart) onNavigateCart();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0a1411]/90 z-50 flex items-center justify-center text-yellow-500 antialiased">
        <div className="animate-pulse text-yellow-500 font-normal">
          LOADING ITEM DETAILS...
        </div>
      </div>
    );
  }

  const imgSrc =
    item.image ||
    `https://placehold.co/400x400/0a1411/eab308?text=${encodeURIComponent(item.name)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm sm:p-4 antialiased animate-fadeIn">
      <div className="absolute inset-0 -z-10 cursor-pointer" onClick={onBack} />

      {/* Main Popup Surface */}
      <div className="relative w-full sm:max-w-[550px] md:max-w-[650px] bg-[#0a1411] border border-yellow-600/10 rounded-[24px] max-h-[96vh] sm:max-h-[92vh] flex flex-col overflow-hidden text-yellow-500 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">

        {/* TOP HEADER */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0a1411]/90 border-b border-yellow-600/10 backdrop-blur-md">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-yellow-600 uppercase mb-0.5">
              {item.category}
            </span>
            <h2 className="text-base font-bold text-yellow-500 truncate max-w-[280px] sm:max-w-[380px]">
              {item.name}
            </h2>
          </div>
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-[#11201b] border border-yellow-600/10 flex items-center justify-center text-yellow-500 hover:bg-yellow-950/40 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* SCROLLABLE INTERIOR CONTENT */}
        <div className="flex-1 overflow-y-auto scrollbar-none pb-8">

          {/* Hero Visual Area */}
          <div className="relative w-full aspect-[4/3] sm:h-[360px] bg-gradient-to-b from-[#11201b] to-[#0a1411] border-b border-yellow-600/5">
            <img
              src={imgSrc}
              alt={item.name}
              className="w-full h-full object-cover mix-blend-lighten"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1411] via-[#0a1411]/40 to-transparent" />

            <div className="absolute bottom-10 sm:bottom-8 left-6 right-6 flex items-end justify-between z-10">
              <div>
                <div className="text-2xl font-bold text-yellow-500 tabular-nums">
                  ${Number(item.price).toFixed(2)}
                </div>
                <div className="text-[10px] text-yellow-600/60 font-normal mt-0.5">
                  Customizable Extra Base
                </div>
              </div>

              {/* Add / Counter */}
              <div className="shadow-lg">
                {qty === 0 ? (
                  <button
                    disabled={stock === 0}
                    onClick={() => setIsAccompanimentOpen(true)}
                    className={`px-8 py-2.5 rounded-xl bg-[#0a1411] border-2 border-yellow-500 text-yellow-500 text-xs font-bold uppercase transition-all shadow-[0_4px_20px_rgba(234,179,8,0.15)] hover:bg-yellow-500 hover:text-[#0a1411] cursor-pointer ${stock === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    {stock === 0 ? "Out of Stock" : "ADD"}
                  </button>
                ) : (
                  <div className="flex items-center bg-yellow-500 text-[#0a1411] rounded-xl px-1 py-1 min-w-[110px] justify-between font-bold shadow-[0_4px_25px_rgba(234,179,8,0.3)]">
                    <button
                      onClick={() => setQty(qty - 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/10 text-lg cursor-pointer"
                    >
                      ─
                    </button>
                    <span className="text-sm px-2 tabular-nums font-bold">{qty}</span>
                    <button
                      disabled={qty >= stock}
                      onClick={() => setIsAccompanimentOpen(true)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/10 text-lg cursor-pointer disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LOWER BODY CONTENT */}
          <div className="p-3 space-y-6">

            {/* Meta Information Grid */}
            <div className="flex flex-wrap gap-2 items-center">
              <StockBadge stock={item.stock} />
              <Stars rating={item.rating || 4.5} />
              {item.cooking_time && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#11201b] border border-yellow-600/10 text-[11px] text-yellow-600/70 font-medium">
                  ⏱ {item.cooking_time}
                </div>
              )}
              {item.quality && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#11201b] border border-yellow-600/10 text-[11px] text-yellow-500 font-medium">
                  ★ {item.quality}
                </div>
              )}
            </div>

            {/* Product Description */}
            {item.description && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase text-yellow-600/50">
                  Item Detail
                </h4>
                <p className="text-xs sm:text-sm text-yellow-600/80 leading-relaxed bg-[#11201b]/40 p-4 rounded-xl border border-yellow-600/10">
                  {item.description}
                </p>
              </div>
            )}

            {/* Action HUD */}
            <div className="p-4 bg-[#11201b]/20 rounded-2xl border border-yellow-600/10 flex gap-3 items-center">
              <button
                onClick={handleNavigateCart}
                className={`flex items-center justify-center gap-2 h-12 px-4 rounded-xl border font-medium text-xs transition-all ${
                  cartCount > 0
                    ? "bg-[#11201b] border-yellow-500 text-yellow-500"
                    : "bg-[#11201b]/40 border-yellow-600/10 text-yellow-600/40"
                }`}
              >
                🛒{" "}
                {cartCount > 0 && (
                  <span className="bg-yellow-500 text-[#0a1411] px-1.5 py-0.5 rounded-md text-[10px] font-bold tabular-nums">
                    {cartCount}
                  </span>
                )}
              </button>

              {authed ? (
                <button
                  disabled={totalQty === 0}
                  onClick={() =>
                    navigate("/payment-method", {
                      state: { total: finalTotal, cart, allItems },
                    })
                  }
                  className={`flex-1 h-12 rounded-xl text-xs font-bold uppercase transition-all shadow-lg flex items-center justify-between px-5 ${
                    totalQty > 0
                      ? "bg-yellow-500 text-[#0a1411] hover:bg-yellow-600 cursor-pointer"
                      : "bg-[#11201b]/40 text-yellow-600/30 border border-yellow-600/5 cursor-not-allowed"
                  }`}
                >
                  <span>
                    {totalQty > 0 ? `Buy Now (${totalQty})` : "Select Quantities"}
                  </span>
                  {totalQty > 0 && (
                    <span className="font-bold text-sm tabular-nums">
                      ${finalTotal.toFixed(2)} ➔
                    </span>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex-1 h-12 rounded-xl bg-yellow-500 text-[#0a1411] text-xs font-bold hover:bg-yellow-600 transition-colors cursor-pointer"
                >
                  🔐 Sign In to Checkout
                </button>
              )}
            </div>

            {/* Related Items */}
            {allItems.length > 1 && (
              <div className="pt-2">
                <p className="text-xs font-bold uppercase text-yellow-600/50 mb-3">
                  Explore More Items
                </p>
                <InlineMenuBrowser
                  allItems={allItems}
                  cart={cart}
                  setCart={setCart}
                  currentItemId={item.id}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ACCOMPANIMENTS MODAL */}
      <AccompanimentsModal
        isOpen={isAccompanimentOpen}
        onClose={() => setIsAccompanimentOpen(false)}
        itemName={item.name}
        basePrice={item.price}
        onAddItem={(payload) => {
          setCart((prev) => {
            const current = prev[item.id] || { qty: 0, extraPrice: 0 };
            const perUnitExtra =
              (payload.totalPrice - Number(item.price) * payload.quantity) /
              payload.quantity;
            return {
              ...prev,
              [item.id]: {
                qty: current.qty + payload.quantity,
                extraPrice: perUnitExtra,
              },
            };
          });
        }}
      />
    </div>
  );
}