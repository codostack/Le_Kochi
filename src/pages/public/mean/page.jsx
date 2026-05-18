import { useState } from "react";

// ─── DUMMY DATA ────────────────────────────────────────────────────────────────
const DISCOUNT = 10;

const ALL_ITEMS = [
  { id: 1,  name: "Rose Sharbat",     category: "Drinks",      price: 80,  rating: 4.4, stock: 35, cooking_time: "3 mins",  quality: "Regular",  description: "Cold rose flavored milk drink with basil seeds.",                       emoji: "🌹", grad: ["#3d1a1a","#6b2d2d"] },
  { id: 2,  name: "Malabar Biryani",  category: "Biryani",     price: 220, rating: 4.8, stock: 12, cooking_time: "25 mins", quality: "Premium",  description: "Slow-cooked Malabar style biryani with aromatic spices and tender meat.",emoji: "🍛", grad: ["#1a1200","#3d2d00"] },
  { id: 3,  name: "Kerala Fish Curry",category: "Main Course", price: 180, rating: 4.6, stock: 8,  cooking_time: "20 mins", quality: "Premium",  description: "Traditional Kerala fish curry with coconut milk and kodampuli.",        emoji: "🐟", grad: ["#001a1a","#003d3d"] },
  { id: 4,  name: "Appam",            category: "Breads",      price: 40,  rating: 4.2, stock: 0,  cooking_time: "10 mins", quality: "Regular",  description: "Soft lacy rice pancake, best served with stew.",                       emoji: "🥞", grad: ["#1a1500","#3d3200"] },
  { id: 5,  name: "Beef Fry",         category: "Starters",    price: 160, rating: 4.7, stock: 15, cooking_time: "15 mins", quality: "Premium",  description: "Spicy Kerala style beef dry fry with coconut pieces.",                 emoji: "🥩", grad: ["#2d0a0a","#5c1a1a"] },
  { id: 6,  name: "Payasam",          category: "Desserts",    price: 60,  rating: 4.5, stock: 20, cooking_time: "5 mins",  quality: "Regular",  description: "Sweet rice pudding with cardamom and cashews.",                        emoji: "🍮", grad: ["#1a0d00","#3d2000"] },
  { id: 7,  name: "Ghee Rice",        category: "Rice",        price: 90,  rating: 4.3, stock: 25, cooking_time: "15 mins", quality: "Regular",  description: "Fragrant basmati rice cooked in pure ghee with spices.",               emoji: "🍚", grad: ["#0d1a00","#1f3d00"] },
  { id: 8,  name: "Masala Tea",       category: "Beverages",   price: 30,  rating: 4.1, stock: 50, cooking_time: "5 mins",  quality: "Regular",  description: "Strong spiced Indian chai with ginger and cardamom.",                  emoji: "☕", grad: ["#1a0d00","#4d2600"] },
  { id: 9,  name: "Chicken Stew",     category: "Main Course", price: 190, rating: 4.7, stock: 10, cooking_time: "22 mins", quality: "Premium",  description: "Kerala chicken stew with coconut milk and vegetables.",                emoji: "🍲", grad: ["#001a0d","#003d1f"] },
  { id: 10, name: "Puttu",            category: "Breads",      price: 50,  rating: 4.3, stock: 18, cooking_time: "8 mins",  quality: "Regular",  description: "Steamed rice cake with grated coconut layers.",                        emoji: "🫙", grad: ["#0d0d1a","#1a1a3d"] },
  { id: 11, name: "Prawn Masala",     category: "Starters",    price: 200, rating: 4.9, stock: 6,  cooking_time: "18 mins", quality: "Premium",  description: "Juicy prawns in a rich masala gravy.",                                 emoji: "🦐", grad: ["#1a0a00","#4d2000"] },
  { id: 12, name: "Fresh Lime Soda",  category: "Drinks",      price: 50,  rating: 4.0, stock: 40, cooking_time: "2 mins",  quality: "Regular",  description: "Chilled lime soda with mint.",                                         emoji: "🍋", grad: ["#0d1a00","#253d00"] },
];

const DUMMY_ORDERS = [
  { id: "6b5c408a-51d4-11f1-b718-74d4dd45acea", customerId: "c1", itemIds: [{ itemId: 1, quantity: 1 }, { itemId: 2, quantity: 1 }], orderTime: "15:10:20", orderDate: "2026-05-17", orderStatus: "Preparing",           paymentMethod: "UPI",             amount: 225.00 },
  { id: "36ace0c4-51d6-11f1-b718-74d4dd45acea", customerId: "c1", itemIds: [{ itemId: 2, quantity: 4 }, { itemId: 9, quantity: 1 }], orderTime: "15:23:10", orderDate: "2026-05-17", orderStatus: "Confirmed",           paymentMethod: "UPI",             amount: 774.00 },
  { id: "121fb2c8-51d6-11f1-b718-74d4dd45acea", customerId: "c1", itemIds: [{ itemId: 3, quantity: 3 }],                             orderTime: "15:22:09", orderDate: "2026-05-17", orderStatus: "Pending",             paymentMethod: "UPI",             amount: 297.00 },
  { id: "83b9f61d-51d2-11f1-b718-74d4dd45acea", customerId: "c1", itemIds: [{ itemId: 5, quantity: 2 }, { itemId: 8, quantity: 1 }], orderTime: "14:56:42", orderDate: "2026-05-16", orderStatus: "Delivered",           paymentMethod: "Cash on Delivery",amount: 198.00 },
  { id: "a1b2c3d4-51d0-11f1-b718-74d4dd45acea", customerId: "c1", itemIds: [{ itemId: 11, quantity: 1 }, { itemId: 7, quantity: 2 }],orderTime: "12:30:00", orderDate: "2026-05-15", orderStatus: "Out for Delivery",   paymentMethod: "Card",            amount: 290.00 },
  { id: "f9e8d7c6-51d1-11f1-b718-74d4dd45acea", customerId: "c1", itemIds: [{ itemId: 6, quantity: 2 }],                             orderTime: "19:05:10", orderDate: "2026-05-14", orderStatus: "Cancelled",           paymentMethod: "Net Banking",     amount: 120.00 },
];

const ENRICHED_ORDERS = DUMMY_ORDERS.map((order) => ({
  ...order,
  items: order.itemIds.map(({ itemId, quantity }) => ({
    quantity,
    ...ALL_ITEMS.find((i) => i.id === itemId),
  })),
}));

// ─── CONSTANTS ─────────────────────────────────────────────────
const STATUS_CONFIG = {
  Pending:            { color: "#f4a325", bg: "rgba(244,163,37,0.12)",  border: "rgba(244,163,37,0.35)",  icon: "⏳", step: 0 },
  Confirmed:          { color: "#60a5fa", bg: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.35)",  icon: "✅", step: 1 },
  Preparing:          { color: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.35)", icon: "👨‍🍳", step: 2 },
  "Out for Delivery": { color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.35)",  icon: "🛵", step: 3 },
  Delivered:          { color: "#4ade80", bg: "rgba(74,222,128,0.12)",  border: "rgba(74,222,128,0.35)",  icon: "🎉", step: 4 },
  Cancelled:          { color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.35)", icon: "❌", step: -1 },
};
const STEPS = ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];
const CATEGORIES = [...new Set(ALL_ITEMS.map((i) => i.category))];

// ─── UTILS ─────────────────────────────────────────────────────
const rupee = (n) => `₹${Number(n).toFixed(2)}`;

// ─── ITEM IMAGE — emoji on gradient ────────────────────────────
function ItemImage({ item, className = "", style = {} }) {
  const [from, to] = item.grad || ["#1a1a1a", "#2a2a2a"];
  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        border: "1px solid rgba(212,175,55,0.15)",
        ...style,
      }}
    >
      <span style={{ fontSize: "clamp(20px, 35%, 52px)", lineHeight: 1, userSelect: "none" }}>
        {item.emoji}
      </span>
    </div>
  );
}

function Stars({ rating = 0, size = 11 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12"
          fill={i <= Math.round(Number(rating)) ? "#d4af37" : "#2a2a2a"}>
          <path d="M6 1l1.4 2.8L10.5 4.3l-2.25 2.2.53 3.1L6 8.05 3.22 9.6l.53-3.1L1.5 4.3l3.1-.5z" />
        </svg>
      ))}
      <span className="text-[10px] text-neutral-600 ml-1">{Number(rating).toFixed(1)}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
      className="text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
      {cfg.icon} {status}
    </span>
  );
}

function StockBadge({ stock }) {
  const n = Number(stock);
  if (n === 0) return <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-950/30 text-red-400 border border-red-900/50">Out of Stock</span>;
  if (n <= 5)  return <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-950/30 text-amber-400 border border-amber-900/50">Only {n} left</span>;
  return <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-950/30 text-green-400 border border-green-900/50">In Stock</span>;
}

function ProgressBar({ status }) {
  if (status === "Cancelled") return (
    <div className="text-center py-3 text-red-400 text-xs font-semibold">❌ Order Cancelled</div>
  );
  const currentStep = STATUS_CONFIG[status]?.step ?? 0;
  return (
    <div className="flex items-center w-full">
      {STEPS.map((step, idx) => {
        const done = idx < currentStep;
        const active = idx === currentStep;
        const cfg = STATUS_CONFIG[step];
        return (
          <div key={step} className={`flex items-center ${idx < STEPS.length - 1 ? "flex-1" : ""}`}>
            <div className="flex flex-col items-center gap-1">
              <div style={{
                width: active ? 28 : 22, height: active ? 28 : 22,
                background: done || active ? cfg.bg : "#1a1a1a",
                border: `2px solid ${done || active ? cfg.color : "#2a2a2a"}`,
                boxShadow: active ? `0 0 10px ${cfg.color}40` : "none",
              }} className="rounded-full flex items-center justify-center text-[9px] transition-all duration-300">
                {done ? <span style={{ color: cfg.color }}>✓</span> : active ? <span style={{ fontSize: 11 }}>{cfg.icon}</span> : ""}
              </div>
              <span style={{ color: done || active ? cfg.color : "#333" }}
                className="text-[7px] font-medium whitespace-nowrap max-w-[42px] text-center leading-tight">
                {step}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div style={{ background: done ? "#d4af37" : "#1e1e1e" }}
                className="flex-1 h-0.5 mx-1 mb-4 transition-all duration-300" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PaymentMethodSelector({ method, setMethod, upi, setUpi, nameAttr = "pay" }) {
  const methods = [
    { id: "upi",  label: "UPI",               icon: "💳" },
    { id: "card", label: "Credit / Debit Card",icon: "🏦" },
    { id: "nb",   label: "Net Banking",        icon: "🌐" },
    { id: "cod",  label: "Cash on Delivery",   icon: "💵" },
  ];
  return (
    <div>
      <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-600 mb-2 mt-1">Payment Method</p>
      <div className="flex flex-col gap-1.5">
        {methods.map((m) => (
          <label key={m.id} onClick={() => setMethod(m.id)}
            style={{ border: `1px solid ${method === m.id ? "#d4af37" : "#1e1e1e"}`, background: method === m.id ? "#1a1a0a" : "#0d0d0d" }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all">
            <input type="radio" name={nameAttr} value={m.id} checked={method === m.id}
              onChange={() => setMethod(m.id)} className="accent-[#d4af37] w-3 h-3" />
            <span className="text-sm">{m.icon}</span>
            <span style={{ color: method === m.id ? "#d4af37" : "#666" }}
              className="text-xs font-medium">{m.label}</span>
          </label>
        ))}
      </div>
      {method === "upi" && (
        <input type="text" placeholder="yourname@upi" value={upi} onChange={(e) => setUpi(e.target.value)}
          className="w-full mt-2 px-3 py-2 rounded-xl bg-[#111] border border-[#222] text-neutral-300 text-xs outline-none" />
      )}
    </div>
  );
}

function OrderSummaryPanel({ lineItems, subtotal, discount, total, totalQty, method, setMethod, upi, setUpi, placing, onPlaceOrder, nameAttr = "pay" }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
        {lineItems.length === 0
          ? <p className="text-xs text-neutral-600 text-center py-3">No items in cart</p>
          : lineItems.map(({ item, qty }) => (
            <div key={item.id} className="flex justify-between text-xs">
              <span className="text-neutral-500 truncate max-w-[140px]">{item.name} ×{qty}</span>
              <span className="text-neutral-300 font-medium ml-2">{rupee(item.price * qty)}</span>
            </div>
          ))}
      </div>
      <div className="border-t border-dashed border-neutral-800 my-0.5" />
      <div className="flex justify-between text-xs"><span className="text-neutral-500">Subtotal</span><span>{rupee(subtotal)}</span></div>
      <div className="flex justify-between text-xs text-green-400"><span>Discount ({DISCOUNT}%)</span><span>− {rupee(discount)}</span></div>
      <div className="border-t border-neutral-800 my-0.5" />
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">Total Payable</span>
        <span className="text-2xl font-bold text-[#d4af37]">{rupee(total)}</span>
      </div>
      {totalQty > 0 && (
        <div className="rounded-xl px-3 py-2 bg-green-950/30 border border-green-900/40 text-green-400 text-xs text-center">
          🎉 You save {rupee(discount)} on this order!
        </div>
      )}
      <PaymentMethodSelector method={method} setMethod={setMethod} upi={upi} setUpi={setUpi} nameAttr={nameAttr} />
      <button
        disabled={totalQty === 0 || placing}
        onClick={onPlaceOrder}
        className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all mt-1
          ${totalQty > 0 ? "bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842] cursor-pointer" : "bg-neutral-800 text-neutral-600 cursor-not-allowed"}
          ${placing ? "opacity-60" : ""}`}>
        {placing ? "Placing Order…" : totalQty === 0 ? "Cart Empty" : `Place Order · ${rupee(total)}`}
      </button>
    </div>
  );
}

function DeliveryNote() {
  return (
    <div className="mx-4 mb-4 mt-3 rounded-xl px-3 py-2 bg-[#0d0d0d] border border-[#1a1a1a] flex items-center gap-2 text-[11px] text-neutral-600">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f4a325" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
      Free delivery on orders above ₹500
    </div>
  );
}

// ─── MINI ITEM CARD ─────────────────────────────────────────────
function MiniItemCard({ item, qty, onAdd, onRemove }) {
  const stock = Number(item.stock ?? 99);
  const outOfStock = stock === 0;
  return (
    <div style={{ border: `1px solid ${qty > 0 ? "#d4af37" : "#222"}` }}
      className="relative flex-shrink-0 w-44 rounded-2xl overflow-hidden bg-[#151515] transition-all">
      {qty > 0 && (
        <div className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-[#d4af37] text-neutral-950 text-[10px] font-bold flex items-center justify-center">{qty}</div>
      )}
      {outOfStock && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 pointer-events-none">
          <span className="text-[10px] font-bold text-red-400 px-2 py-0.5 rounded-full bg-black/80 border border-red-900">Out of Stock</span>
        </div>
      )}
      {/* FIXED: use ItemImage instead of <img> */}
      <ItemImage item={item} className="w-full h-24 rounded-none" style={{ borderRadius: 0, border: "none", borderBottom: "1px solid rgba(212,175,55,0.1)" }} />
      <div className="p-3">
        <p className="text-xs font-semibold text-neutral-200 truncate mb-0.5">{item.name}</p>
        <p className="text-[10px] text-neutral-600 truncate mb-2">{item.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#d4af37]">{rupee(item.price)}</span>
          {!outOfStock && (
            <div className="flex items-center gap-1">
              {qty > 0 && (
                <button onClick={() => onRemove(item)}
                  className="w-6 h-6 rounded-full border border-[#333] text-neutral-300 text-sm font-bold flex items-center justify-center hover:border-red-500 hover:text-red-400 transition-colors">−</button>
              )}
              <button onClick={() => onAdd(item)} disabled={qty >= stock}
                className={`w-6 h-6 rounded-full text-sm font-bold flex items-center justify-center transition-colors
                  ${qty >= stock ? "bg-[#222] text-neutral-600 cursor-not-allowed" : "bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842] cursor-pointer"}`}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── INLINE MENU BROWSER ───────────────────────────────────────
function InlineMenuBrowser({ allItems, cart, setCart, currentItemId }) {
  const categories = [...new Set(allItems.map((i) => i.category))];
  const [activeTab, setActiveTab] = useState(categories[0] || "");
  const filtered = allItems.filter((i) => i.category === activeTab && String(i.id) !== String(currentItemId));

  const addItem = (item) => {
    const stock = Number(item.stock ?? 99);
    setCart((prev) => { const cur = prev[item.id] || 0; if (cur >= stock) return prev; return { ...prev, [item.id]: cur + 1 }; });
  };
  const removeItem = (item) => {
    setCart((prev) => { const cur = prev[item.id] || 0; if (cur <= 1) { const n = { ...prev }; delete n[item.id]; return n; } return { ...prev, [item.id]: cur - 1 }; });
  };

  return (
    <div className="rounded-2xl bg-[#111] border border-[#1e1e1e] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a1a1a] flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-[#d4af37] mb-0.5">Add More Items</p>
          <p className="text-[10px] text-neutral-600">Browse our full menu below</p>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
      <div className="flex overflow-x-auto border-b border-[#1a1a1a]">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveTab(cat)}
            style={{ borderBottom: `2px solid ${activeTab === cat ? "#d4af37" : "transparent"}`, color: activeTab === cat ? "#d4af37" : "#666" }}
            className="px-4 py-2.5 text-xs font-semibold whitespace-nowrap flex-shrink-0 bg-none border-none cursor-pointer transition-all">{cat}</button>
        ))}
      </div>
      <div className="p-4 flex gap-3 overflow-x-auto">
        {filtered.length === 0
          ? <p className="text-xs text-neutral-600 py-3 px-2">No items in this category</p>
          : filtered.map((item) => (
            <MiniItemCard key={item.id} item={item} qty={cart[item.id] || 0} onAdd={addItem} onRemove={removeItem} />
          ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE 1: MENU PAGE
// ═══════════════════════════════════════════════════════════════
function MenuPage({ onGoOrders }) {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [cart, setCart] = useState({});
  const [view, setView] = useState("menu");
  const [selectedItem, setSelectedItem] = useState(null);
  const [method, setMethod] = useState("upi");
  const [upi, setUpi] = useState("");
  const [placing, setPlacing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((s, [id, q]) => {
    const it = ALL_ITEMS.find((i) => String(i.id) === String(id));
    return s + (it ? it.price * q : 0);
  }, 0);
  const cartDiscount = Math.round(cartTotal * DISCOUNT / 100);
  const cartFinal = cartTotal - cartDiscount;

  const lineItems = Object.entries(cart)
    .map(([id, qty]) => ({ item: ALL_ITEMS.find((i) => String(i.id) === String(id)), qty }))
    .filter((x) => x.item && x.qty > 0);

  const handlePlaceOrder = () => {
    if (lineItems.length === 0) return;
    setPlacing(true);
    setTimeout(() => { setPlacing(false); setCart({}); setView("confirmed"); }, 1500);
  };

  // ── CONFIRMED SCREEN ──
  if (view === "confirmed") return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4 w-full max-w-sm text-center">
        <div className="w-20 h-20 rounded-full bg-green-950/40 border border-green-900/50 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Order Confirmed!</h2>
          <p className="text-neutral-500 text-sm">Estimated delivery: 30–45 mins.</p>
        </div>
        <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-2 text-left">
          <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-600 mb-1">Order Summary</p>
          {lineItems.map(({ item, qty }) => (
            <div key={item.id} className="flex justify-between text-xs">
              <span className="text-neutral-400 truncate max-w-[160px]">{item.name} ×{qty}</span>
              <span className="text-neutral-200 font-medium ml-2">{rupee(item.price * qty)}</span>
            </div>
          ))}
          <div className="border-t border-dashed border-neutral-800 my-1" />
          <div className="flex justify-between text-xs text-green-400"><span>Discount ({DISCOUNT}%)</span><span>− {rupee(cartDiscount)}</span></div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-neutral-300 font-semibold text-sm">Total Paid</span>
            <span className="text-[#d4af37] font-bold text-xl">{rupee(cartFinal)}</span>
          </div>
        </div>
        <button onClick={() => setView("menu")}
          className="w-full py-3.5 rounded-xl bg-[#d4af37] text-neutral-950 text-sm font-bold hover:bg-[#f0c842] transition-colors">
          Back to Menu
        </button>
        <button onClick={onGoOrders}
          className="w-full py-3 rounded-xl border border-neutral-700 text-neutral-400 text-sm font-semibold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
          View My Orders
        </button>
      </div>
    </div>
  );

  // ── CART VIEW ──
  if (view === "cart") {
    const totalQty = lineItems.reduce((s, { qty }) => s + qty, 0);
    const updateQty = (id, delta) => setCart((prev) => {
      const cur = (prev[id] || 0) + delta;
      const n = { ...prev };
      if (cur <= 0) delete n[id]; else n[id] = cur;
      return n;
    });

    const CartSummaryPanel = () => (
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <p className="text-xs font-bold tracking-widest uppercase text-[#d4af37]">Order Summary</p>
          {totalQty > 0 && <span className="text-[10px] text-neutral-500">{totalQty} items</span>}
        </div>
        <div className="p-5">
          <OrderSummaryPanel
            lineItems={lineItems} subtotal={cartTotal} discount={cartDiscount}
            total={cartFinal} totalQty={totalQty} method={method} setMethod={setMethod}
            upi={upi} setUpi={setUpi} placing={placing} onPlaceOrder={handlePlaceOrder} nameAttr="cpay" />
        </div>
        <DeliveryNote />
      </div>
    );

    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white">
        <div className="sticky top-0 z-40 px-4 py-3 bg-[rgba(11,11,11,0.96)] border-b border-neutral-800 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto flex items-center gap-3">
            <button onClick={() => setView("menu")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-medium hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            <h1 className="text-sm font-bold tracking-wider text-[#d4af37] flex-1">YOUR CART</h1>
            <span className="text-xs text-neutral-600">{totalQty} items</span>
            {totalQty > 0 && (
              <button onClick={() => setShowSummary(true)}
                className="lg:hidden flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#1e1a0a] border border-[#d4af37] text-[#d4af37] text-xs font-semibold">
                {rupee(cartFinal)}
              </button>
            )}
          </div>
        </div>

        {showSummary && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSummary(false)} />
            <div className="relative bg-[#111] border-t border-neutral-800 rounded-t-3xl max-h-[85vh] overflow-y-auto">
              <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-neutral-700" /></div>
              <div className="px-4 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-white">Order Summary</span>
                  <button onClick={() => setShowSummary(false)}
                    className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <CartSummaryPanel />
              </div>
            </div>
          </div>
        )}

        <div className="max-w-5xl mx-auto px-4 py-6 pb-28 lg:pb-8 flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full flex-1">
            {lineItems.length === 0 ? (
              <div className="text-center py-24 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                </div>
                <div>
                  <p className="text-neutral-400 font-semibold">Your cart is empty</p>
                  <p className="text-neutral-600 text-xs mt-1">Add items from the menu</p>
                </div>
                <button onClick={() => setView("menu")}
                  className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-neutral-950 text-xs font-bold hover:bg-[#f0c842] transition-colors">
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-neutral-600 mb-1">Order Items · {totalQty} items</p>
                {lineItems.map(({ item, qty }) => {
                  const stock = Number(item.stock ?? 99);
                  return (
                    <div key={item.id}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
                      {/* FIXED: ItemImage instead of <img> */}
                      <ItemImage item={item} className="w-16 h-16 rounded-xl" style={{ borderRadius: "0.75rem" }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-100 truncate">{item.name}</p>
                        <p className="text-[11px] text-neutral-600 mt-0.5 truncate">{item.category}</p>
                        <Stars rating={item.rating} size={10} />
                        <p className="text-sm font-bold text-[#d4af37] mt-1">
                          {rupee(item.price * qty)}
                          <span className="text-neutral-600 font-normal text-[10px] ml-1">({rupee(item.price)} each)</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button onClick={() => updateQty(item.id, -1)}
                          className="w-7 h-7 rounded-full border border-neutral-700 text-neutral-300 text-sm font-bold flex items-center justify-center hover:border-red-500 hover:text-red-400 transition-colors">−</button>
                        <span className="text-sm font-bold w-5 text-center">{qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} disabled={qty >= stock}
                          className={`w-7 h-7 rounded-full text-sm font-bold flex items-center justify-center transition-colors
                            ${qty >= stock ? "bg-neutral-800 text-neutral-600 cursor-not-allowed" : "bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842] cursor-pointer"}`}>+</button>
                      </div>
                    </div>
                  );
                })}
                {totalQty > 0 && (
                  <div className="lg:hidden mt-1 flex items-center justify-between px-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <div><span className="text-[10px] text-neutral-600 block uppercase tracking-widest">Subtotal</span>
                      <span className="text-sm font-bold text-neutral-200">{rupee(cartTotal)}</span></div>
                    <div className="text-right"><span className="text-[10px] text-green-500 block">−{DISCOUNT}% off</span>
                      <span className="text-lg font-bold text-[#d4af37]">{rupee(cartFinal)}</span></div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="hidden lg:block w-80 flex-shrink-0 lg:sticky lg:top-20"><CartSummaryPanel /></div>
          <div className="hidden sm:block lg:hidden w-full mt-1"><CartSummaryPanel /></div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b0b0b]/95 backdrop-blur-xl border-t border-neutral-800 px-4 py-3">
          {lineItems.length === 0 ? (
            <button onClick={() => setView("menu")}
              className="w-full py-3.5 rounded-xl border border-neutral-700 text-neutral-400 text-sm font-semibold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">Browse Menu</button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <span className="text-[10px] text-neutral-500 block leading-none">Total</span>
                <span className="text-base font-bold text-[#d4af37] leading-tight">{rupee(cartFinal)}</span>
                {cartDiscount > 0 && <span className="text-[9px] text-green-500">−{rupee(cartDiscount)} saved</span>}
              </div>
              <button onClick={() => setShowSummary(true)}
                className="flex-1 py-3 rounded-xl border border-neutral-700 text-neutral-300 text-xs font-semibold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">Payment Options</button>
              <button disabled={placing} onClick={handlePlaceOrder}
                className={`flex-[2] py-3 rounded-xl text-xs font-bold tracking-widest uppercase bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842] ${placing ? "opacity-60" : ""}`}>
                {placing ? "Placing…" : "Place Order"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── DETAIL VIEW ──
  if (view === "detail" && selectedItem) {
    const item = selectedItem;
    const stock = Number(item.stock ?? 99);
    const qty = cart[item.id] || 0;
    const setQty = (val) => {
      const capped = Math.min(val, stock);
      setCart((prev) => { const next = { ...prev }; if (capped <= 0) delete next[item.id]; else next[item.id] = capped; return next; });
    };
    const subtotal = qty * item.price;
    const totalQty = lineItems.reduce((s, { qty: q }) => s + q, 0);
    const mobileDiscount = Math.round(cartTotal * DISCOUNT / 100);
    const mobileTotal = cartTotal - mobileDiscount;

    const DetailPaymentPanel = () => (
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
          {lineItems.length === 0
            ? <p className="text-xs text-neutral-600 text-center py-3">No items selected yet</p>
            : lineItems.map(({ item: it, qty: q }) => (
              <div key={it.id} className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 truncate max-w-[130px]">{it.name} ×{q}</span>
                <span className="text-neutral-300 font-medium ml-2">{rupee(it.price * q)}</span>
              </div>
            ))}
        </div>
        <div className="border-t border-dashed border-neutral-800 my-1" />
        <div className="flex justify-between text-xs"><span className="text-neutral-500">Subtotal</span><span>{rupee(cartTotal)}</span></div>
        <div className="flex justify-between text-xs text-green-400"><span>Discount ({DISCOUNT}%)</span><span>− {rupee(mobileDiscount)}</span></div>
        <div className="border-t border-neutral-800 my-1" />
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">Total</span>
          <span className="text-2xl font-bold text-[#d4af37]">{totalQty > 0 ? rupee(mobileTotal) : "₹0.00"}</span>
        </div>
        {totalQty > 0 && <div className="rounded-xl px-3 py-2 bg-green-950/30 border border-green-900/40 text-green-400 text-xs text-center">🎉 You save {rupee(mobileDiscount)}!</div>}
        <PaymentMethodSelector method={method} setMethod={setMethod} upi={upi} setUpi={setUpi} nameAttr="dpay" />
        <button onClick={() => setView("cart")}
          className="w-full py-2.5 rounded-xl border border-neutral-700 text-neutral-300 text-xs font-semibold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">View Full Cart</button>
        <button disabled={totalQty === 0 || placing} onClick={handlePlaceOrder}
          className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all
            ${totalQty > 0 ? "bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842] cursor-pointer" : "bg-neutral-900 text-neutral-600 cursor-not-allowed"}
            ${placing ? "opacity-60" : ""}`}>
          {placing ? "Placing Order…" : totalQty === 0 ? "Select Items" : `Place Order · ${rupee(mobileTotal)}`}
        </button>
      </div>
    );

    return (
      <div className="min-h-screen w-full bg-[#0b0b0b] text-white">
        <div className="sticky top-0 z-40 px-3 sm:px-4 py-3 bg-[rgba(11,11,11,0.96)] border-b border-neutral-800 backdrop-blur-xl">
          <div className="max-w-[1400px] mx-auto flex items-center gap-2 sm:gap-3">
            <button onClick={() => setView("menu")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-medium hover:border-[#d4af37] hover:text-[#d4af37] transition-all flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <span className="hidden sm:inline">Back to Menu</span><span className="sm:hidden">Back</span>
            </button>
            <span className="text-neutral-600 text-sm truncate flex-1 hidden md:block">{item.name}</span>
            <span className="flex-1 md:hidden" />
            <button onClick={() => setView("cart")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all flex-shrink-0 text-xs font-semibold
                ${cartCount > 0 ? "bg-[#1e1a0a] border-[#d4af37] text-[#d4af37]" : "bg-neutral-950 border-neutral-800 text-neutral-600"}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="hidden sm:inline">View Cart</span>
              {cartCount > 0 && <span className="w-[17px] h-[17px] rounded-full bg-[#d4af37] text-neutral-950 text-[10px] font-black flex items-center justify-center">{cartCount}</span>}
            </button>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-6 lg:py-10 flex flex-col lg:flex-row gap-6 lg:gap-9 items-start pb-32 lg:pb-10">
          <div className="flex-1 w-full flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
              {/* FIXED: ItemImage instead of <img> */}
              <div className="w-full sm:w-64 lg:w-72 h-52 sm:h-64 lg:h-72 flex-shrink-0 rounded-2xl overflow-hidden border border-neutral-800 relative">
                <ItemImage item={item} className="w-full h-full" style={{ borderRadius: 0, border: "none" }} />
                <span className="absolute bottom-3 left-3 text-[11px] font-semibold px-3 py-1 rounded-full bg-black/70 text-[#d4af37] border border-neutral-700">{item.category}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{item.name}</h1>
                  <StockBadge stock={item.stock} />
                </div>
                <Stars rating={item.rating} size={13} />
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  {item.quality}
                </div>
                {item.description && <p className="text-sm text-neutral-500 leading-relaxed mt-3">{item.description}</p>}
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.cooking_time && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f4a325" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {item.cooking_time}
                    </div>
                  )}
                  {stock > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2"><path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                      {stock} in stock
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <span className="text-3xl sm:text-4xl font-bold text-[#d4af37]">{rupee(item.price)}</span>
                  <span className="text-xs text-neutral-600 ml-2">per item</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-neutral-900 border border-neutral-800">
              <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-600 mb-4">Quantity</p>
              <div className="flex items-center gap-4 flex-wrap">
                <button disabled={qty === 0} onClick={() => setQty(qty - 1)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl font-bold transition-all border
                    ${qty === 0 ? "border-neutral-800 text-neutral-700 bg-neutral-950 cursor-not-allowed" : "border-[#d4af37] text-[#d4af37] bg-neutral-900 hover:bg-neutral-800"}`}>−</button>
                <span className="text-3xl font-bold w-10 text-center tabular-nums">{qty}</span>
                <button disabled={stock === 0 || qty >= stock} onClick={() => setQty(qty + 1)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl font-bold transition-all border-none
                    ${stock === 0 || qty >= stock ? "bg-neutral-800 text-neutral-600 cursor-not-allowed" : "bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842]"}`}>+</button>
                {qty > 0 && (
                  <div className="flex items-center gap-1 px-4 py-2 rounded-xl bg-green-950/30 border border-green-900/40 text-green-400 text-sm font-medium">
                    {qty} × {rupee(item.price)} = <strong className="ml-1">{rupee(subtotal)}</strong>
                  </div>
                )}
                {stock > 0 && qty >= stock && <span className="text-xs text-amber-400">Max stock reached</span>}
              </div>
            </div>

            <InlineMenuBrowser allItems={ALL_ITEMS} cart={cart} setCart={setCart} currentItemId={item.id} />
          </div>

          <div className="hidden lg:block w-[320px] xl:w-[340px] flex-shrink-0 lg:sticky lg:top-20 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
            <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
              <p className="text-xs font-bold tracking-widest uppercase text-[#d4af37]">Order Summary</p>
              <span className="text-[10px] flex items-center gap-1 text-green-400">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Signed in
              </span>
            </div>
            <DetailPaymentPanel />
            <DeliveryNote />
          </div>

          <div className="hidden sm:block lg:hidden w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 mt-1">
            <div className="px-5 py-4 border-b border-neutral-800">
              <p className="text-xs font-bold tracking-widest uppercase text-[#d4af37]">Order Summary</p>
            </div>
            <DetailPaymentPanel />
            <DeliveryNote />
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b0b0b]/95 backdrop-blur-xl border-t border-neutral-800 px-4 py-3">
          <div className="flex items-center gap-3">
            {totalQty > 0 && (
              <div className="flex flex-col">
                <span className="text-[10px] text-neutral-500">Total</span>
                <span className="text-base font-bold text-[#d4af37]">{rupee(mobileTotal)}</span>
              </div>
            )}
            <button onClick={() => setView("cart")}
              className="flex-1 py-3 rounded-xl border border-neutral-700 text-neutral-300 text-xs font-semibold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
              View Cart {totalQty > 0 && `(${totalQty})`}
            </button>
            <button disabled={totalQty === 0 || placing} onClick={handlePlaceOrder}
              className={`flex-[2] py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all
                ${totalQty > 0 ? "bg-[#d4af37] text-neutral-950 hover:bg-[#f0c842]" : "bg-neutral-900 text-neutral-600 cursor-not-allowed"}
                ${placing ? "opacity-60" : ""}`}>
              {placing ? "Placing…" : totalQty === 0 ? "Select Items" : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── MENU VIEW ──
  const tabItems = ALL_ITEMS.filter((i) => i.category === activeTab);
  return (
    <div className="min-h-screen w-full bg-[#0b0b0b] text-white" style={{ paddingBottom: cartCount > 0 ? 100 : 0 }}>
      <div className="sticky top-0 z-40 w-full px-4 md:px-6 py-4 bg-[#0b0b0b] border-b border-[#1d1d1d]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-5 gap-4">
            <div className="flex-1" />
            <h2 className="text-2xl md:text-3xl font-medium tracking-[3px] text-[#d4af37] whitespace-nowrap">OUR MENU</h2>
            <div className="flex-1 flex justify-end items-center gap-2">
              <button onClick={onGoOrders}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#2a2a2a] bg-[#151515] text-[#888] text-xs font-semibold hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#1a1a0a] transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                <span className="hidden sm:inline">My Orders</span>
              </button>
              <button onClick={() => setView("cart")}
                style={{ border: cartCount > 0 ? "1px solid #d4af37" : "1px solid #2a2a2a", background: cartCount > 0 ? "#1e1a0a" : "#151515", color: cartCount > 0 ? "#d4af37" : "#666" }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all hover:bg-[#2a2010]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                <span className="hidden sm:inline">View Cart</span>
                {cartCount > 0 && (
                  <>
                    <span className="w-5 h-5 rounded-full bg-[#d4af37] text-neutral-950 text-[10px] font-black flex items-center justify-center">{cartCount}</span>
                    <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <nav className="flex gap-3 overflow-x-auto pb-0.5">
            {CATEGORIES.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="relative whitespace-nowrap cursor-pointer border-none bg-transparent pb-2.5 text-sm font-medium transition-colors"
                style={{ color: activeTab === tab ? "#fff" : "#bfbfbf" }}>
                {tab}
                {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-[#f4a325]" />}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-10">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tabItems.map((item) => {
            const inCart = cart[item.id] || 0;
            const stock = Number(item.stock ?? 0);
            return (
              <div key={item.id} onClick={() => { setSelectedItem(item); setView("detail"); }}
                className="flex items-center justify-between gap-4 min-h-[160px] rounded-2xl p-4 bg-[#151515] border border-[#222] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-[0_10px_30px_rgba(212,175,55,0.08)] relative">
                {inCart > 0 && (
                  <div className="absolute top-2.5 left-2.5 w-5 h-5 rounded-full bg-[#d4af37] text-neutral-950 text-[11px] font-bold flex items-center justify-center z-10">{inCart}</div>
                )}
                {stock === 0 && (
                  <div className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center z-10 pointer-events-none">
                    <span className="text-xs font-bold text-red-400 px-3 py-1 rounded-full bg-black/80 border border-red-800">Out of Stock</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold leading-snug text-white mb-1 truncate">{item.name}</h3>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#1e1e1e] text-[#888] border border-[#2a2a2a] mb-2 inline-block">{item.quality}</span>
                  {item.description && (
                    <p className="text-xs text-[#777] leading-relaxed mb-2 overflow-hidden" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.description}</p>
                  )}
                  {item.cooking_time && (
                    <div className="flex items-center gap-1 mb-2">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f4a325" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span className="text-[11px] text-[#666]">{item.cooking_time}</span>
                    </div>
                  )}
                  <Stars rating={item.rating} size={11} />
                  <h4 className="text-xl font-bold text-[#d4af37] mt-2">₹{Number(item.price).toFixed(2)}</h4>
                </div>
                {/* FIXED: ItemImage instead of <img> */}
                <ItemImage item={item} className="w-24 h-24 rounded-xl flex-shrink-0" style={{ borderRadius: "0.75rem" }} />
              </div>
            );
          })}
        </div>
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <button onClick={() => setView("cart")}
            className="flex items-center gap-4 px-6 py-3.5 rounded-[18px] bg-[#d4af37] text-neutral-950 border-none min-w-[260px] cursor-pointer shadow-[0_8px_40px_rgba(212,175,55,0.35)] hover:bg-[#f0c842] transition-all">
            <div className="w-8 h-8 rounded-[10px] bg-black/15 flex items-center justify-center font-bold text-sm">{cartCount}</div>
            <span className="flex-1 font-semibold text-sm">View Cart</span>
            <span className="font-bold text-sm">₹{cartTotal.toFixed(2)}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE 2: ORDERS PAGE
// ═══════════════════════════════════════════════════════════════
function OrdersPage({ onBack }) {
  const [filter, setFilter] = useState("All");
  const [detail, setDetail] = useState(null);

  const FILTERS = ["All", "Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
  const filtered = filter === "All" ? ENRICHED_ORDERS : ENRICHED_ORDERS.filter((o) => o.orderStatus === filter);

  if (detail) {
    const order = detail;
    const cfg = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.Pending;
    const subtotal = order.items?.reduce((s, i) => s + Number(i.price) * i.quantity, 0) ?? 0;
    const discount = Math.round(subtotal * DISCOUNT / 100);
    const date = new Date(`${order.orderDate}T${order.orderTime}`);

    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white">
        <div className="sticky top-0 z-40 px-5 py-3.5 bg-[rgba(11,11,11,0.96)] border-b border-[#1d1d1d] backdrop-blur-xl flex items-center gap-3">
          <button onClick={() => setDetail(null)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#aaa] text-xs font-medium cursor-pointer hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#d4af37] m-0">ORDER DETAILS</p>
            <p className="text-[10px] text-[#555] m-0 font-mono">#{order.id.toUpperCase()}</p>
          </div>
          <StatusBadge status={order.orderStatus} />
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 pb-12 flex flex-col gap-4">
          <div style={{ border: `1px solid ${cfg.border ?? "#1e1e1e"}` }} className="rounded-2xl p-5 bg-[#111]">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#555] mb-4">Order Status</p>
            <ProgressBar status={order.orderStatus} />
            <div className="flex gap-5 mt-4 flex-wrap">
              {[["Order Date", date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })],
                ["Order Time", date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })],
                ["Payment", `💳 ${order.paymentMethod}`]].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[9px] text-[#555] uppercase tracking-wider mb-0.5">{k}</p>
                  <p className="text-xs text-[#ccc] font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#111] border border-[#1e1e1e] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1a1a1a]">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#d4af37]">Ordered Items</p>
            </div>
            {order.items?.map((item, idx) => (
              <div key={idx} style={{ borderBottom: idx < order.items.length - 1 ? "1px solid #1a1a1a" : "none" }}
                className="flex items-center gap-3 px-5 py-4">
                {/* FIXED: ItemImage instead of <img> */}
                <ItemImage item={item} className="w-14 h-14 rounded-xl flex-shrink-0" style={{ borderRadius: "0.75rem", border: "1px solid #2a2a2a" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#e5e5e5] truncate mb-0.5">{item.name}</p>
                  <p className="text-[10px] text-[#555] mb-1">{item.category}</p>
                  <Stars rating={item.rating} size={10} />
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-[#d4af37] mb-0.5">{rupee(Number(item.price) * item.quantity)}</p>
                  <p className="text-[10px] text-[#666]">{rupee(item.price)} × {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-[#111] border border-[#1e1e1e] p-5">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#555] mb-4">Bill Summary</p>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between text-sm text-[#aaa]"><span>Subtotal</span><span>{rupee(subtotal)}</span></div>
              <div className="flex justify-between text-sm text-green-400"><span>Discount ({DISCOUNT}%)</span><span>− {rupee(discount)}</span></div>
              <div className="flex justify-between text-sm text-[#aaa]"><span>Delivery</span><span className="text-green-400">Free</span></div>
              <div className="border-t border-dashed border-[#2a2a2a] pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-white">Total Paid</span>
                <span className="text-2xl font-bold text-[#d4af37]">{rupee(order.amount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="sticky top-0 z-40 bg-[rgba(11,11,11,0.96)] border-b border-[#1d1d1d] backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-5 py-3.5 flex items-center gap-3">
          <button onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#aaa] text-xs font-medium cursor-pointer hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <h1 className="flex-1 text-base font-bold tracking-widest text-[#d4af37]">MY ORDERS</h1>
          <span className="text-xs text-[#555]">{ENRICHED_ORDERS.length} total</span>
        </div>
        <div className="max-w-4xl mx-auto px-5 pb-3 flex gap-2 overflow-x-auto">
          {FILTERS.map((f) => {
            const count = f === "All" ? ENRICHED_ORDERS.length : ENRICHED_ORDERS.filter((o) => o.orderStatus === f).length;
            const active = filter === f;
            const cfg = f !== "All" ? STATUS_CONFIG[f] : null;
            return (
              <button key={f} onClick={() => setFilter(f)}
                style={{
                  border: active ? `1px solid ${cfg?.color ?? "#d4af37"}` : "1px solid #1e1e1e",
                  background: active ? (cfg?.bg ?? "rgba(212,175,55,0.1)") : "#111",
                  color: active ? (cfg?.color ?? "#d4af37") : "#555",
                }}
                className="px-3 py-1 rounded-full text-[11px] font-semibold cursor-pointer whitespace-nowrap flex-shrink-0 transition-all">
                {f} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-5 pb-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🛍️</div>
            <p className="text-neutral-400 font-semibold mb-1">{filter === "All" ? "No orders yet" : `No ${filter} orders`}</p>
            <p className="text-neutral-600 text-xs">{filter === "All" ? "Your order history will appear here." : "Try a different filter."}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((order) => {
              const cfg = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.Pending;
              const itemCount = order.items?.reduce((s, i) => s + i.quantity, 0) ?? 0;
              const date = new Date(`${order.orderDate}T${order.orderTime}`);
              return (
                <div key={order.id} onClick={() => setDetail(order)}
                  style={{ border: "1px solid #222" }}
                  className="rounded-2xl p-4 bg-[#151515] cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = cfg.color; e.currentTarget.style.boxShadow = `0 6px 24px ${cfg.color}18`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.boxShadow = "none"; }}>

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <StatusBadge status={order.orderStatus} />
                        <span className="text-[10px] text-[#555]">
                          {date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#555] font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xl font-bold text-[#d4af37]">{rupee(order.amount)}</p>
                      <p className="text-[10px] text-[#555]">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
                    </div>
                  </div>

                  {/* FIXED: ItemImage strip instead of <img> strip */}
                  {order.items?.length > 0 && (
                    <div className="flex gap-2 mb-3 overflow-x-auto">
                      {order.items.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="relative flex-shrink-0">
                          <ItemImage item={item} className="w-11 h-11 rounded-lg" style={{ borderRadius: "0.5rem", border: "1px solid #2a2a2a" }} />
                          {item.quantity > 1 && (
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#d4af37] text-neutral-950 text-[9px] font-bold flex items-center justify-center">{item.quantity}</span>
                          )}
                        </div>
                      ))}
                      {order.items.length > 4 && (
                        <div className="w-11 h-11 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[11px] text-[#666] flex-shrink-0">+{order.items.length - 4}</div>
                      )}
                    </div>
                  )}

                  <div className="mb-3"><ProgressBar status={order.orderStatus} /></div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-[#1a1a1a]">
                    <span className="text-[10px] text-[#555]">💳 {order.paymentMethod}</span>
                    <span className="text-[11px] text-[#d4af37] font-semibold flex items-center gap-1">
                      View Details
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("menu");
  if (page === "orders") return <OrdersPage onBack={() => setPage("menu")} />;
  return <MenuPage onGoOrders={() => setPage("orders")} />;
} 