import { useState, useEffect, useMemo } from "react";
import {
  DISCOUNT_PERCENT,
  rupee,
  isTokenValid,
  getToken,
  Stars,
  AuthPanel,
  DeliveryNote,
  PaymentMethodSelector,
} from "./Foodhelpers";
import axiosInstance from "../../../axiosInstance/page";

export default function CartPage({
  cart, setCart, allItems, onBack, onLogin, onRegister, onOrderPlaced,
}) {
  const [authed, setAuthed]     = useState(false);
  const [method, setMethod]     = useState("upi");
  const [upi, setUpi]           = useState("");
  const [placing, setPlacing]   = useState(false);
  const [placed, setPlaced]     = useState(false);
  const [showSummary, setShowSummary] = useState(false); // mobile drawer toggle
  const [orderError, setOrderError] = useState("");

  /* auth check */
  useEffect(() => {
    const check = () => setAuthed(isTokenValid(getToken()));
    check();
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  /* derived data */
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

  const subtotal = lineItems.reduce(
    (s, { item, qty }) => s + Number(item.price) * qty,
    0
  );
  const discount = Math.round(subtotal * DISCOUNT_PERCENT / 100);
  const total    = subtotal - discount;
  const totalQty = lineItems.reduce((s, { qty }) => s + qty, 0);

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const cur = (prev[id] || 0) + delta;
      const n   = { ...prev };
      if (cur <= 0) delete n[id];
      else n[id] = cur;
      return n;
    });
  };

 const handlePlaceOrder = async () => {
    if (totalQty === 0) return;
    setPlacing(true);
    setOrderError("");
    try {
      const items = lineItems.map(({ item, qty }) => ({
        itemId: item.id,
        quantity: qty,
      }));

      const methodMap = {
        upi: "UPI", card: "Card",
        nb: "Net Banking", cod: "Cash on Delivery",
      };

      await axiosInstance.post("/orders/placeOrders", {
        items,
        paymentMethod: methodMap[method],
        amount: total,
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


  /* ── Order Confirmed screen ── */
  if (placed) return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4 py-8 font-[Poppins,sans-serif]">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div className="text-center flex flex-col items-center gap-4 sm:gap-5 w-full max-w-sm">
        {/* success icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-950/40 border border-green-900/50 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Order Confirmed!</h2>
          <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
            Your order of {totalQty} item{totalQty !== 1 ? "s" : ""} has been placed.
            <br />Estimated delivery: 30–45 mins.
          </p>
        </div>

        {/* receipt card */}
        <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-col gap-2 sm:gap-2.5">
          <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-600 mb-0.5 sm:mb-1">
            Order Summary
          </p>
          {lineItems.map(({ item, qty }) => (
            <div key={item.id} className="flex justify-between text-xs sm:text-sm">
              <span className="text-neutral-400 truncate max-w-[160px] sm:max-w-[180px]">
                {item.name} ×{qty}
              </span>
              <span className="text-neutral-200 font-medium flex-shrink-0 ml-2">
                {rupee(Number(item.price) * qty)}
              </span>
            </div>
          ))}
          <div className="border-t border-dashed border-neutral-800 my-1" />
          <div className="flex justify-between text-xs text-green-400">
            <span>Discount ({DISCOUNT_PERCENT}%)</span>
            <span>− {rupee(discount)}</span>
          </div>
          <div className="flex justify-between items-center mt-0.5 sm:mt-1">
            <span className="text-neutral-300 font-semibold text-xs sm:text-sm">Total Paid</span>
            <span className="text-[#d4af37] font-bold text-lg sm:text-xl">{rupee(total)}</span>
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full py-3 sm:py-3.5 rounded-xl bg-[#d4af37] text-neutral-950 text-sm font-bold hover:bg-[#f0c842] transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );

  /* ── Order Summary Panel (shared between sidebar and mobile drawer) ── */
  const OrderSummaryPanel = ({ compact = false }) => (
    <div className={`rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden ${compact ? "" : ""}`}>
      <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-neutral-800 flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest uppercase text-[#d4af37]">
          {authed ? "Order Summary" : "Sign In to Order"}
        </p>
        {authed && totalQty > 0 && (
          <span className="text-[10px] text-neutral-500">{totalQty} item{totalQty !== 1 ? "s" : ""}</span>
        )}
      </div>

      {authed ? (
        <div className="p-4 sm:p-5 flex flex-col gap-2.5 sm:gap-3">
          {/* per-item breakdown */}
          <div className="flex flex-col gap-1.5 sm:gap-2 max-h-32 sm:max-h-40 overflow-y-auto pr-1">
            {lineItems.length === 0 ? (
              <p className="text-xs text-neutral-600 text-center py-3">No items in cart</p>
            ) : (
              lineItems.map(({ item, qty }) => (
                <div key={item.id} className="flex justify-between text-xs">
                  <span className="text-neutral-500 truncate max-w-[140px] sm:max-w-[160px]">
                    {item.name} ×{qty}
                  </span>
                  <span className="text-neutral-300 font-medium flex-shrink-0 ml-2">
                    {rupee(Number(item.price) * qty)}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-dashed border-neutral-800 my-0.5" />

          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">Subtotal</span>
            <span>{rupee(subtotal)}</span>
          </div>
          <div className="flex justify-between text-xs text-green-400">
            <span>Discount ({DISCOUNT_PERCENT}%)</span>
            <span>− {rupee(discount)}</span>
          </div>

          <div className="border-t border-neutral-800 my-0.5" />

          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold">Total Payable</span>
            <span className="text-xl sm:text-2xl font-bold text-[#d4af37]">{rupee(total)}</span>
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
            nameAttr="cpay"
          />

          <button
            disabled={totalQty === 0 || placing}
            onClick={handlePlaceOrder}
            className={`w-full py-3.5 sm:py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all mt-0.5 sm:mt-1 ${
              totalQty > 0
                ? "bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842] cursor-pointer"
                : "bg-neutral-800 text-neutral-600 cursor-not-allowed"
            } ${placing ? "opacity-60" : ""}`}
          >
            {placing
              ? "Placing Order…"
              : totalQty === 0
              ? "Cart Empty"
              : `Place Order · ${rupee(total)}`}
          </button>
        </div>
      ) : (
        <AuthPanel onLogin={onLogin} onRegister={onRegister} />
      )}

      <DeliveryNote />
    </div>
  );

  /* ── Main cart view ── */
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-[Poppins,sans-serif]">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* ── Navbar ── */}
      <div className="sticky top-0 z-40 px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-[rgba(11,11,11,0.96)] border-b border-neutral-800 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs sm:text-sm font-medium hover:border-[#d4af37] hover:text-[#d4af37] transition-all flex-shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>

          <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-wider text-[#d4af37] flex-1">
            YOUR CART
          </h1>

          {/* item count */}
          <span className="text-[10px] sm:text-xs text-neutral-600 flex-shrink-0">
            {totalQty} item{totalQty !== 1 ? "s" : ""}
          </span>

          {/* mobile: tap to open summary drawer */}
          {authed && totalQty > 0 && (
            <button
              onClick={() => setShowSummary(true)}
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#1e1a0a] border border-[#d4af37] text-[#d4af37] text-xs font-semibold flex-shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              <span className="hidden sm:inline">Summary</span>
              <span className="sm:hidden">{rupee(total)}</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile Summary Drawer ── */}
      {showSummary && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowSummary(false)}
          />
          {/* sheet */}
          <div className="relative bg-[#111] border-t border-neutral-800 rounded-t-3xl max-h-[85vh] overflow-y-auto">
            {/* drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-neutral-700" />
            </div>
            <div className="px-4 pb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white">Order Summary</span>
                <button
                  onClick={() => setShowSummary(false)}
                  className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <OrderSummaryPanel compact />
            </div>
          </div>
        </div>
      )}

      {/* ── Body ── */}
      {/* pb-24 on mobile for fixed bottom bar */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 pb-28 lg:pb-8 flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8 items-start">

        {/* ── LEFT: Cart items ── */}
        <div className="w-full flex-1">
          {lineItems.length === 0 ? (
            /* empty state */
            <div className="text-center py-16 sm:py-20 md:py-24 flex flex-col items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <div>
                <p className="text-neutral-400 text-sm font-semibold">Your cart is empty</p>
                <p className="text-neutral-600 text-xs mt-1">Add some delicious items from the menu</p>
              </div>
              <button
                onClick={onBack}
                className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-neutral-950 text-xs font-bold hover:bg-[#f0c842] transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 sm:gap-3 sm:gap-4">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-neutral-600 mb-0.5 sm:mb-1">
                Order Items · {totalQty} item{totalQty !== 1 ? "s" : ""}
              </p>

              {lineItems.map(({ item, qty }) => {
                const stock  = Number(item.stock ?? 99);
                const imgSrc =
                  item.image ||
                  `https://placehold.co/80x80/151515/d4af37?text=${encodeURIComponent(item.name)}`;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2.5 sm:gap-3 md:gap-4 p-3 sm:p-3.5 md:p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
                  >
                    {/* image */}
                    <img
                      src={imgSrc}
                      alt={item.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-xl flex-shrink-0"
                    />

                    {/* details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-neutral-100 truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-neutral-600 mt-0.5 truncate">
                        {item.category}
                      </p>
                      <div className="mt-0.5 sm:mt-1">
                        <Stars rating={item.rating} size={10} />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[#d4af37] mt-1 sm:mt-1.5">
                        {rupee(Number(item.price) * qty)}
                        <span className="text-neutral-600 font-normal text-[10px] ml-1">
                          ({rupee(item.price)} each)
                        </span>
                      </p>
                    </div>

                    {/* qty controls — vertical on very small screens */}
                    <div className="flex flex-col xs:flex-row items-center gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-neutral-700 text-neutral-300 text-sm font-bold flex items-center justify-center hover:border-red-500 hover:text-red-400 transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-bold w-4 sm:w-5 text-center tabular-nums">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        disabled={qty >= stock}
                        className={`w-7 h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full text-sm font-bold flex items-center justify-center transition-colors ${
                          qty >= stock
                            ? "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                            : "bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842] cursor-pointer"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Subtotal pill — visible on mobile below items */}
              {totalQty > 0 && (
                <div className="lg:hidden mt-1 flex items-center justify-between px-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-600 uppercase tracking-widest">Subtotal</span>
                    <span className="text-sm font-bold text-neutral-200">{rupee(subtotal)}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-green-500">−{DISCOUNT_PERCENT}% off</span>
                    <span className="text-lg font-bold text-[#d4af37]">{rupee(total)}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT: Order summary — desktop sidebar ── */}
        <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-20">
          <OrderSummaryPanel />
        </div>

        {/* ── Tablet: inline panel below cart ── */}
        <div className="hidden sm:block lg:hidden w-full mt-1">
          <OrderSummaryPanel />
        </div>
      </div>

      {/* ── Fixed bottom bar — mobile only ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b0b0b]/95 backdrop-blur-xl border-t border-neutral-800 px-4 py-3">
        {!authed ? (
          <button
            onClick={onLogin}
            className="w-full py-3.5 rounded-xl bg-[#d4af37] text-neutral-950 text-sm font-bold tracking-wide hover:bg-[#f0c842] transition-colors"
          >
            Sign In to Order
          </button>
        ) : lineItems.length === 0 ? (
          <button
            onClick={onBack}
            className="w-full py-3.5 rounded-xl border border-neutral-700 text-neutral-400 text-sm font-semibold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
          >
            Browse Menu
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {/* total display */}
            <div className="flex flex-col flex-shrink-0">
              <span className="text-[10px] text-neutral-500 leading-none">Total</span>
              <span className="text-base font-bold text-[#d4af37] leading-tight">{rupee(total)}</span>
              {discount > 0 && (
                <span className="text-[9px] text-green-500">−{rupee(discount)} saved</span>
              )}
            </div>
            {/* summary button */}
            <button
              onClick={() => setShowSummary(true)}
              className="flex-1 py-3 rounded-xl border border-neutral-700 text-neutral-300 text-xs font-semibold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
            >
              Payment Options
            </button>
            {/* place order */}
            <button
              disabled={placing}
              onClick={handlePlaceOrder}
              className={`flex-[2] py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842] ${placing ? "opacity-60" : ""}`}
            >
              {placing ? "Placing…" : "Place Order"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}