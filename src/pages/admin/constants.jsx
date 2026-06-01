// ─── CONSTANTS & SHARED DATA ─────────────────────────────────────────────────

export const COLORS = {
  primary: "#1a1a2e",
  accent: "#e94560",
  gold: "#f5a623",
  success: "#22c55e",
  info: "#3b82f6",
  warn: "#f59e0b",
  bg: "#f8f7f4",
  card: "#ffffff",
  border: "rgba(0,0,0,0.08)",
  text: "#1a1a2e",
  muted: "#6b7280",
};

export const INITIAL_MENU = [
  { id: 1, name: "Plain Rice", category: "Rice", price: 40, quality: "Premium", stock: 150, image: "🍚", available: true },
  { id: 2, name: "Ghee Rice", category: "Rice", price: 80, quality: "Premium", stock: 80, image: "🍛", available: true },
  { id: 3, name: "Biryani", category: "Rice", price: 150, quality: "Special", stock: 60, image: "🫕", available: true },
  { id: 4, name: "Plain Dosa", category: "Dosa", price: 50, quality: "Regular", stock: 200, image: "🫓", available: true },
  { id: 5, name: "Masala Dosa", category: "Dosa", price: 75, quality: "Premium", stock: 120, image: "🫓", available: true },
  { id: 6, name: "Rava Dosa", category: "Dosa", price: 65, quality: "Regular", stock: 90, image: "🫓", available: true },
  { id: 7, name: "Set Dosa", category: "Dosa", price: 60, quality: "Regular", stock: 110, image: "🫓", available: true },
  { id: 8, name: "Paneer Butter Masala", category: "Curry", price: 130, quality: "Premium", stock: 50, image: "🍲", available: true },
  { id: 9, name: "Dal Fry", category: "Curry", price: 90, quality: "Regular", stock: 70, image: "🍲", available: true },
  { id: 10, name: "Sambar", category: "Sides", price: 30, quality: "Regular", stock: 300, image: "🥣", available: true },
  { id: 11, name: "Filter Coffee", category: "Beverages", price: 25, quality: "Special", stock: 500, image: "☕", available: true },
  { id: 12, name: "Lassi", category: "Beverages", price: 45, quality: "Premium", stock: 80, image: "🥛", available: true },
];

export const INITIAL_CUSTOMERS = [
  { id: 1, name: "Arjun Nair", phone: "9876543210", email: "arjun@email.com", orders: 12, totalSpent: 2340, lastVisit: "2024-01-15", status: "Regular" },
  { id: 2, name: "Priya Menon", phone: "9123456789", email: "priya@email.com", orders: 28, totalSpent: 6800, lastVisit: "2024-01-16", status: "VIP" },
  { id: 3, name: "Rahul Kumar", phone: "9988776655", email: "rahul@email.com", orders: 5, totalSpent: 890, lastVisit: "2024-01-10", status: "New" },
  { id: 4, name: "Meera Krishnan", phone: "9765432100", email: "meera@email.com", orders: 45, totalSpent: 12500, lastVisit: "2024-01-16", status: "VIP" },
  { id: 5, name: "Suresh Pillai", phone: "9654321098", email: "suresh@email.com", orders: 8, totalSpent: 1560, lastVisit: "2024-01-14", status: "Regular" },
  { id: 6, name: "Anitha Das", phone: "9543210987", email: "anitha@email.com", orders: 3, totalSpent: 450, lastVisit: "2024-01-12", status: "New" },
];

export const INITIAL_ORDERS = [
  { id: "#ORD001", customer: "Arjun Nair", items: "Biryani x1, Filter Coffee x2", total: 200, date: "2024-01-16", time: "12:30", status: "Delivered", method: "Cash" },
  { id: "#ORD002", customer: "Priya Menon", items: "Masala Dosa x2, Sambar x2", total: 210, date: "2024-01-16", time: "13:00", status: "Preparing", method: "UPI" },
  { id: "#ORD003", customer: "Rahul Kumar", items: "Ghee Rice x1, Dal Fry x1", total: 170, date: "2024-01-16", time: "13:15", status: "Pending", method: "Card" },
  { id: "#ORD004", customer: "Meera Krishnan", items: "Biryani x2, Lassi x2", total: 390, date: "2024-01-16", time: "13:45", status: "Delivered", method: "UPI" },
  { id: "#ORD005", customer: "Suresh Pillai", items: "Plain Dosa x3, Filter Coffee x3", total: 225, date: "2024-01-15", time: "09:00", status: "Delivered", method: "Cash" },
  { id: "#ORD006", customer: "Anitha Das", items: "Paneer Butter Masala x1, Ghee Rice x1", total: 210, date: "2024-01-15", time: "19:30", status: "Delivered", method: "UPI" },
  { id: "#ORD007", customer: "Arjun Nair", items: "Set Dosa x2, Sambar x2", total: 180, date: "2024-01-15", time: "08:45", status: "Delivered", method: "Cash" },
  { id: "#ORD008", customer: "Priya Menon", items: "Biryani x1, Lassi x1", total: 195, date: "2024-01-14", time: "14:00", status: "Delivered", method: "Card" },
];

export const PAYMENT_DATA = {
  daily: [
    { label: "Mon", amount: 4200 }, { label: "Tue", amount: 3800 },
    { label: "Wed", amount: 5100 }, { label: "Thu", amount: 4600 },
    { label: "Fri", amount: 6200 }, { label: "Sat", amount: 7800 },
    { label: "Sun", amount: 8400 },
  ],
  monthly: [
    { label: "Jan", amount: 124000 }, { label: "Feb", amount: 98000 },
    { label: "Mar", amount: 135000 }, { label: "Apr", amount: 142000 },
    { label: "May", amount: 118000 }, { label: "Jun", amount: 156000 },
    { label: "Jul", amount: 162000 }, { label: "Aug", amount: 145000 },
    { label: "Sep", amount: 138000 }, { label: "Oct", amount: 171000 },
    { label: "Nov", amount: 189000 }, { label: "Dec", amount: 210000 },
  ],
  yearly: [
    { label: "2020", amount: 980000 }, { label: "2021", amount: 1240000 },
    { label: "2022", amount: 1580000 }, { label: "2023", amount: 1870000 },
    { label: "2024", amount: 2100000 },
  ],
};

export const CATEGORIES = ["All", "Rice", "Dosa", "Curry", "Sides", "Beverages"];
export const QUALITY_OPTIONS = ["Regular", "Premium", "Special"];

export const STATUS_COLORS = {
  Delivered: { bg: "#dcfce7", color: "#15803d" },
  Preparing: { bg: "#fef9c3", color: "#a16207" },
  Pending:   { bg: "#fee2e2", color: "#dc2626" },
  VIP:       { bg: "#ede9fe", color: "#7c3aed" },
  Regular:   { bg: "#dbeafe", color: "#1d4ed8" },
  New:       { bg: "#f3f4f6", color: "#374151" },
};

// ─── SHARED UI COMPONENTS ─────────────────────────────────────────────────────

export function Badge({ status }) {
  const style = STATUS_COLORS[status] || { bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{
      background: style.bg, color: style.color,
      padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
    }}>
      {status}
    </span>
  );
}

export function StatCard({ icon, label, value, sub, color = COLORS.accent }) {
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderRadius: 14, padding: "18px 20px", display: "flex", gap: 14, alignItems: "center",
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: color + "18", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 22,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text }}>{value}</div>
        <div style={{ fontSize: 13, color: COLORS.muted }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color, fontWeight: 600 }}>{sub}</div>}
      </div>
    </div>
  );
}

export function MiniBar({ data, color = COLORS.accent }) {
  const max = Math.max(...data.map((d) => d.amount));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80 }}>
      {data.map((d) => (
        <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{
            width: "100%", background: color, borderRadius: "3px 3px 0 0",
            height: `${(d.amount / max) * 64}px`, minHeight: 4, opacity: 0.85,
          }} />
          <span style={{ fontSize: 9, color: COLORS.muted, textAlign: "center" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
        zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div style={{
        background: COLORS.card, borderRadius: 18, width: "100%",
        maxWidth: 500, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 24px", borderBottom: `1px solid ${COLORS.border}`,
        }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: COLORS.muted }}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

export function FormInput({ label, value, onChange, type = "text", options }) {
  const base = {
    width: "100%", padding: "9px 12px", border: `1px solid ${COLORS.border}`,
    borderRadius: 8, fontSize: 14, background: COLORS.bg, color: COLORS.text,
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 5 }}>
        {label}
      </label>
      {options ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} style={base}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          style={{ ...base, boxSizing: "border-box" }} />
      )}
    </div>
  );
}