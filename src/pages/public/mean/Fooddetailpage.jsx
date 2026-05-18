// Fooddetailpage.jsx

import { useState, useMemo } from "react";
import CartPage from "./Cartpage";
import {
  DISCOUNT_PERCENT,
  rupee,
  Stars,
  StockBadge,
  AuthPanel,
  DeliveryNote,
  PaymentMethodSelector,
  InlineMenuBrowser,
  saveCartForLogin,
} from "./Foodhelpers";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axiosInstance from "../../../axiosInstance/page";

// ─── Height of the MobileBottomBar (from BottomBar.jsx) ───────
// 64px padding + safe area; add this as bottom offset so MobileOrderBar
// never overlaps the persistent navigation bar on mobile.

/* ─── PaymentPanel ────────────────────────────────────────────── */
function PaymentPanel({ cart, allItems, onViewCart, setCart, onOrderPlaced }) {
  const [method, setMethod] = useState("upi");
  const [upi, setUpi] = useState("");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState("");

  const lineItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({
          item: allItems.find((i) => String(i.id) === String(id)),
          qty,
        }))
        .filter((x) => x.item && x.qty > 0),
    [cart, allItems]
  );

  const subtotal = lineItems.reduce((s, { item, qty }) => s + Number(item.price) * qty, 0);
  const discount = Math.round(subtotal * DISCOUNT_PERCENT / 100);
  const total = subtotal - discount;
  const totalQty = lineItems.reduce((s, { qty }) => s + qty, 0);

  const handlePlaceOrder = async () => {
    if (totalQty === 0) return;
    setPlacing(true);
    setError("");
    try {
      const items = lineItems.map(({ item, qty }) => ({
        itemId: item.id,
        quantity: qty,
      }));

      // Map frontend method value to DB ENUM value
      const methodMap = {
        upi: "UPI",
        card: "Card",
        nb: "Net Banking",
        cod: "Cash on Delivery",
      };

      await axiosInstance.post("/customer/orders/place", {
        items,
        paymentMethod: methodMap[method],
        amount: total,
      });

      localStorage.removeItem("cart");
      setCart({});           // ← fixes the View Cart not clearing bug
      setPlaced(true);
      onOrderPlaced?.();     // refresh menu stock in MenuPage
    } catch (err) {
      setError(err.response?.data?.message || "Order failed. Try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (placed) return (
    <div className="p-6 sm:p-8 text-center flex flex-col items-center gap-3">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-950/50 border border-green-900/50 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p className="text-sm sm:text-base font-bold text-neutral-100">Order Placed!</p>
      <p className="text-xs text-neutral-500 leading-relaxed">
        {totalQty} item(s) confirmed.<br />Check your cart for details.
      </p>
      <span className="text-sm font-bold text-green-400">{rupee(total)} paid</span>
    </div>
  );

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-3">
      {/* item list */}
      <div className="flex flex-col gap-2 max-h-32 sm:max-h-36 overflow-y-auto pr-1 scrollbar-thin">
        {lineItems.length === 0 ? (
          <p className="text-xs text-neutral-600 text-center py-3">No items selected yet</p>
        ) : (
          lineItems.map(({ item, qty }) => (
            <div key={item.id} className="flex justify-between items-center text-xs">
              <span className="text-neutral-400 truncate max-w-[120px] sm:max-w-[140px]">
                {item.name} ×{qty}
              </span>
              <span className="text-neutral-300 font-medium flex-shrink-0 ml-2">
                {rupee(Number(item.price) * qty)}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-dashed border-neutral-800 my-1" />

      <div className="flex justify-between text-xs">
        <span className="text-neutral-500">Subtotal</span>
        <span>{rupee(subtotal)}</span>
      </div>
      <div className="flex justify-between text-xs text-green-400">
        <span>Discount ({DISCOUNT_PERCENT}%)</span>
        <span>− {rupee(discount)}</span>
      </div>

      <div className="border-t border-neutral-800 my-1" />

      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">Total</span>
        <span className="text-xl sm:text-2xl font-bold text-[#d4af37]">
          {totalQty > 0 ? rupee(total) : "₹0.00"}
        </span>
      </div>

      {totalQty > 0 && (
        <div className="rounded-xl px-3 py-2 bg-green-950/30 border border-green-900/40 text-green-400 text-xs text-center">
          🎉 You save {rupee(discount)} on this order!
        </div>
      )}

      <PaymentMethodSelector
        method={method}
        setMethod={setMethod}
        upi={upi}
        setUpi={setUpi}
        nameAttr="pay"
      />

      <button
        onClick={onViewCart}
        className="w-full py-2.5 sm:py-3 rounded-xl border border-neutral-700 text-neutral-300 text-xs font-semibold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
      >
        View Full Cart
      </button>
      {error && (
        <p className="text-xs text-red-400 text-center">{error}</p>
      )}
      <button
        disabled={totalQty === 0 || placing}
        onClick={handlePlaceOrder}
        className={`w-full py-3.5 sm:py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${totalQty > 0
            ? "bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842] cursor-pointer"
            : "bg-neutral-900 text-neutral-600 cursor-not-allowed"
          } ${placing ? "opacity-60" : ""}`}
      >
        {placing
          ? "Placing Order…"
          : totalQty === 0
            ? "Select Items"
            : `Place Order · ${rupee(total)}`}
      </button>
    </div>
  );
}

/* ─── MobileOrderBar ─────────────────────────────────────────── */
// Fixed bottom bar for mobile — sits ABOVE the MobileBottomBar.
// bottomOffset should equal the height of MobileBottomBar (64px default).
function MobileOrderBar({
  qty, total, totalQty, onViewCart, onPlaceOrder,
  placing, placed, authed, onLogin }) {
  if (!authed) {
    return (
      <div
        className="
    lg:hidden fixed left-0 right-0 z-50
    bg-[#0b0b0b]/95 backdrop-blur-xl
    border-t border-neutral-800 px-4 py-3
    bottom-0
    max-[480px]:bottom-[64px]
  "
      >
        <button
          onClick={onLogin}
          className="w-full py-3.5 rounded-xl bg-[#d4af37] text-neutral-950 text-sm font-bold tracking-wide hover:bg-[#f0c842] transition-colors"
        >
          Sign In to Order
        </button>
      </div>
    );
  }

  return (
    <div
      className="
    lg:hidden fixed left-0 right-0 z-50
    bg-[#0b0b0b]/95 backdrop-blur-xl
    border-t border-neutral-800 px-4 py-3
    bottom-0
    max-[480px]:bottom-[64px]
  "
    >
      <div className="flex items-center gap-3">
        {totalQty > 0 && (
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-500">Total</span>
            <span className="text-base font-bold text-[#d4af37]">{rupee(total)}</span>
          </div>
        )}
        <button
          onClick={onViewCart}
          className="flex-1 py-3 rounded-xl border border-neutral-700 text-neutral-300 text-xs font-semibold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
        >
          View Cart {totalQty > 0 && `(${totalQty})`}
        </button>
        <button
          disabled={totalQty === 0 || placing}
          onClick={onPlaceOrder}
          className={`flex-[2] py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${totalQty > 0
              ? "bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842] cursor-pointer"
              : "bg-neutral-900 text-neutral-600 cursor-not-allowed"
            } ${placing ? "opacity-60" : ""}`}
        >
          {placing ? "Placing…" : totalQty === 0 ? "Select Items" : "Place Order"}
        </button>
      </div>
    </div>
  );
}

/* ─── FoodDetailPage ─────────────────────────────────────────── */
export default function FoodDetailPage({
  item,
  allItems = [],
  onBack,
  onNavigateCart,
  cart,
  setCart,onOrderPlaced
}) {
  const qty = cart[item.id] || 0;
  const stock = Number(item.stock ?? 99);
  const navigate = useNavigate();
  const { authed, loading } = useAuth();
  const [showCart, setShowCart] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderError, setOrderError] = useState("");


  const setQty = (val) => {
    const capped = Math.min(val, stock);
    setCart((prev) => {
      const next = { ...prev };
      if (capped <= 0) delete next[item.id];
      else next[item.id] = capped;
      return next;
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = qty * Number(item.price);

  // Mobile bar totals
  const lineItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, q]) => ({
          item: allItems.find((i) => String(i.id) === String(id)),
          qty: q,
        }))
        .filter((x) => x.item && x.qty > 0),
    [cart, allItems]
  );
  const mobileSubtotal = lineItems.reduce((s, { item: it, qty: q }) => s + Number(it.price) * q, 0);
  const mobileDiscount = Math.round(mobileSubtotal * DISCOUNT_PERCENT / 100);
  const mobileTotal = mobileSubtotal - mobileDiscount;
  const totalQty = lineItems.reduce((s, { qty: q }) => s + q, 0);

  const handlePlaceOrder = async () => {
    if (totalQty === 0) return;
    setPlacing(true);
    setOrderError("");
    try {
      const items = lineItems.map(({ item: it, qty: q }) => ({
        itemId: it.id,
        quantity: q,
      }));

      const methodMap = {
        upi: "UPI", card: "Card",
        nb: "Net Banking", cod: "Cash on Delivery",
      };

      // Read selected method from PaymentPanel — simplest: pass method up
      // OR just send "UPI" as default from mobile bar (no method selector there)
      await axiosInstance.post("/customer/orders/place", {
        items,
        paymentMethod: "UPI",   // mobile bar has no selector; adjust if needed
        amount: mobileTotal,
      });

      localStorage.removeItem("cart");
      setCart({});
      setPlaced(true);
      onOrderPlaced?.();
    } catch (err) {
      setOrderError(err.response?.data?.message || "Order failed. Try again.");
    } finally {
      setPlacing(false);
    }
  };

  // ── Login handler — save cart first ──
  const handleLogin = () => {
    saveCartForLogin(cart);
    navigate("/login", { state: { from: "/menu" } });
  };

  const imgSrc =
    item.image ||
    `https://placehold.co/400x400/151515/d4af37?text=${encodeURIComponent(item.name)}`;

  const handleNavigateCart = () => {
    if (onNavigateCart) onNavigateCart();
    else setShowCart(true);
  };

  if (showCart) {
    return (
      <CartPage
        cart={cart}
        setCart={setCart}
        allItems={allItems}
        onBack={() => setShowCart(false)}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0b0b0b] text-white font-[Poppins,sans-serif]">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ── Navbar ── */}
      <div className="sticky top-0 z-40 px-3 sm:px-4 md:px-6 py-3 sm:py-3.5 bg-[rgba(11,11,11,0.96)] border-b border-neutral-800 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 sm:gap-3">

          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 md:px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs sm:text-[13px] font-medium hover:border-[#d4af37] hover:text-[#d4af37] transition-all flex-shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Back to Menu</span>
            <span className="sm:hidden">Back</span>
          </button>

          <span className="text-neutral-700 text-sm hidden md:inline">·</span>
          <span className="text-neutral-600 text-xs sm:text-sm truncate flex-1 hidden md:block">
            {item.name}
          </span>

          <span className="text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-600 border border-neutral-800 flex-shrink-0 hidden sm:block">
            {item.category}
          </span>

          <span className="flex-1 md:hidden" />

          {/* Cart button */}
          <button
            onClick={handleNavigateCart}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 md:px-4 py-2 rounded-xl border transition-all flex-shrink-0 text-xs sm:text-[13px] font-semibold ${cartCount > 0
                ? "bg-[#1e1a0a] border-[#d4af37] text-[#d4af37] hover:bg-[#2a2010]"
                : "bg-neutral-950 border-neutral-800 text-neutral-600 hover:border-neutral-600"
              }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="hidden sm:inline">View Cart</span>
            {cartCount > 0 && (
              <span className="w-[17px] h-[17px] rounded-full bg-[#d4af37] text-neutral-950 text-[10px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth buttons */}
          {!authed && (
            <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
              <button
                onClick={handleLogin}
                className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-[#d4af37] text-neutral-950 text-xs font-bold hover:bg-[#f0c842] transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  saveCartForLogin(cart);
                  navigate("/registration", { state: { from: "/menu" } });
                }}
                className="hidden sm:block px-3.5 py-1.5 rounded-xl border border-neutral-700 text-neutral-400 text-xs font-semibold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      <div
className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-10 flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-9 items-start     bottom-0
    max-[480px]:bottom-[64px]"
      >
        {/* Override with lg-specific padding */}
        <style>{`.lg\\:pb-10 { padding-bottom: 2.5rem; }`}</style>

        {/* ── LEFT COLUMN ── */}
        <div className="flex-1 w-full flex flex-col gap-4 sm:gap-5 md:gap-6">

          {/* Hero section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
            <div className="w-full sm:w-52 md:w-64 lg:w-72 h-52 sm:h-52 md:h-64 lg:h-72 flex-shrink-0 rounded-2xl overflow-hidden border border-neutral-800 relative">
              <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
              <span className="absolute bottom-3 left-3 text-[11px] font-semibold px-3 py-1 rounded-full bg-black/70 text-[#d4af37] border border-neutral-700 backdrop-blur-sm">
                {item.category}
              </span>
            </div>

            <div className="flex-1 pt-0 sm:pt-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">{item.name}</h1>
                <StockBadge stock={item.stock} />
              </div>

              <Stars rating={item.rating} />

              <div className="mt-2.5 sm:mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {item.quality}
              </div>

              {item.description && (
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-2.5 sm:mt-3 md:mt-4">
                  {item.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-2.5 sm:mt-3 md:mt-4">
                {item.cooking_time && (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f4a325" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    {item.cooking_time}
                  </div>
                )}
                {stock > 0 && (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
                      <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                    </svg>
                    {stock} in stock
                  </div>
                )}
              </div>

              <div className="mt-3 sm:mt-4 md:mt-5">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#d4af37]">
                  {rupee(item.price)}
                </span>
                <span className="text-xs text-neutral-600 ml-2">per item</span>
              </div>
            </div>
          </div>

          {/* Quantity controls */}
          <div className="rounded-2xl p-4 sm:p-5 md:p-6 bg-neutral-900 border border-neutral-800">
            <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-600 mb-3 sm:mb-4">
              Quantity
            </p>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-wrap">
              <button
                disabled={qty === 0}
                onClick={() => setQty(qty - 1)}
                className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold transition-all border ${qty === 0
                    ? "border-neutral-800 text-neutral-700 bg-neutral-950 cursor-not-allowed"
                    : "border-[#d4af37] text-[#d4af37] bg-neutral-900 hover:bg-neutral-800 cursor-pointer"
                  }`}
              >
                −
              </button>

              <span className="text-2xl sm:text-3xl font-bold w-8 sm:w-10 text-center tabular-nums">
                {qty}
              </span>

              <button
                disabled={stock === 0 || qty >= stock}
                onClick={() => setQty(qty + 1)}
                className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold transition-all border-none ${stock === 0 || qty >= stock
                    ? "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                    : "bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842] cursor-pointer"
                  }`}
              >
                +
              </button>

              {qty > 0 && (
                <div className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl bg-green-950/30 border border-green-900/40 text-green-400 text-xs sm:text-sm font-medium flex-wrap">
                  {qty} × {rupee(item.price)} = <strong className="ml-1">{rupee(subtotal)}</strong>
                </div>
              )}
              {stock > 0 && qty >= stock && (
                <span className="text-xs text-amber-400">Max stock reached</span>
              )}
            </div>
          </div>

          {/* Inline menu browser */}
          {allItems.length > 1 && (
            <InlineMenuBrowser
              allItems={allItems}
              cart={cart}
              setCart={setCart}
              currentItemId={item.id}
            />
          )}
        </div>

        {/* ── RIGHT COLUMN: lg+ ── */}
        <div className="hidden lg:block w-[320px] xl:w-[340px] flex-shrink-0 lg:sticky lg:top-20 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
          <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
            <p className="text-xs font-bold tracking-widest uppercase text-[#d4af37]">
              {authed ? "Order Summary" : "Sign In to Order"}
            </p>
            {authed && (
              <span className="text-[10px] flex items-center gap-1 text-green-400">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Signed in
              </span>
            )}
          </div>

          {authed ? (
            <PaymentPanel cart={cart} allItems={allItems} onViewCart={handleNavigateCart} setCart={setCart} />
          ) : (
            <AuthPanel cart={cart} />
          )}

          <DeliveryNote />
        </div>

        {/* ── Tablet: inline summary ── */}
        <div className="hidden sm:block lg:hidden w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 mt-1">
          <div className="px-4 sm:px-5 py-3.5 border-b border-neutral-800 flex items-center justify-between">
            <p className="text-xs font-bold tracking-widest uppercase text-[#d4af37]">
              {authed ? "Order Summary" : "Sign In to Order"}
            </p>
            {authed && (
              <span className="text-[10px] flex items-center gap-1 text-green-400">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Signed in
              </span>
            )}
          </div>

          {authed ? (
            <PaymentPanel cart={cart} allItems={allItems} onViewCart={handleNavigateCart} setCart={setCart} />
          ) : (
            <AuthPanel cart={cart} />
          )}

          <DeliveryNote />
        </div>
      </div>

      {/* ── Fixed bottom order bar — sits ABOVE MobileBottomBar ── */}
      <MobileOrderBar
        qty={qty}
        total={mobileTotal}
        totalQty={totalQty}
        onViewCart={handleNavigateCart}
        onPlaceOrder={handlePlaceOrder}
        placing={placing}
        placed={placed}
        authed={authed}
        onLogin={handleLogin}
      />
    </div>
  );
}