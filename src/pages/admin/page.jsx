import { useState, useMemo } from "react";

const COLORS = {
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

const INITIAL_MENU = [
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

const INITIAL_CUSTOMERS = [
  { id: 1, name: "Arjun Nair", phone: "9876543210", email: "arjun@email.com", orders: 12, totalSpent: 2340, lastVisit: "2024-01-15", status: "Regular" },
  { id: 2, name: "Priya Menon", phone: "9123456789", email: "priya@email.com", orders: 28, totalSpent: 6800, lastVisit: "2024-01-16", status: "VIP" },
  { id: 3, name: "Rahul Kumar", phone: "9988776655", email: "rahul@email.com", orders: 5, totalSpent: 890, lastVisit: "2024-01-10", status: "New" },
  { id: 4, name: "Meera Krishnan", phone: "9765432100", email: "meera@email.com", orders: 45, totalSpent: 12500, lastVisit: "2024-01-16", status: "VIP" },
  { id: 5, name: "Suresh Pillai", phone: "9654321098", email: "suresh@email.com", orders: 8, totalSpent: 1560, lastVisit: "2024-01-14", status: "Regular" },
  { id: 6, name: "Anitha Das", phone: "9543210987", email: "anitha@email.com", orders: 3, totalSpent: 450, lastVisit: "2024-01-12", status: "New" },
];

const INITIAL_ORDERS = [
  { id: "#ORD001", customer: "Arjun Nair", items: "Biryani x1, Filter Coffee x2", total: 200, date: "2024-01-16", time: "12:30", status: "Delivered", method: "Cash" },
  { id: "#ORD002", customer: "Priya Menon", items: "Masala Dosa x2, Sambar x2", total: 210, date: "2024-01-16", time: "13:00", status: "Preparing", method: "UPI" },
  { id: "#ORD003", customer: "Rahul Kumar", items: "Ghee Rice x1, Dal Fry x1", total: 170, date: "2024-01-16", time: "13:15", status: "Pending", method: "Card" },
  { id: "#ORD004", customer: "Meera Krishnan", items: "Biryani x2, Lassi x2", total: 390, date: "2024-01-16", time: "13:45", status: "Delivered", method: "UPI" },
  { id: "#ORD005", customer: "Suresh Pillai", items: "Plain Dosa x3, Filter Coffee x3", total: 225, date: "2024-01-15", time: "09:00", status: "Delivered", method: "Cash" },
  { id: "#ORD006", customer: "Anitha Das", items: "Paneer Butter Masala x1, Ghee Rice x1", total: 210, date: "2024-01-15", time: "19:30", status: "Delivered", method: "UPI" },
  { id: "#ORD007", customer: "Arjun Nair", items: "Set Dosa x2, Sambar x2", total: 180, date: "2024-01-15", time: "08:45", status: "Delivered", method: "Cash" },
  { id: "#ORD008", customer: "Priya Menon", items: "Biryani x1, Lassi x1", total: 195, date: "2024-01-14", time: "14:00", status: "Delivered", method: "Card" },
];

const PAYMENT_DATA = {
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

const CATEGORIES = ["All", "Rice", "Dosa", "Curry", "Sides", "Beverages"];
const QUALITY_OPTIONS = ["Regular", "Premium", "Special"];
const STATUS_COLORS = {
  Delivered: { bg: "#dcfce7", color: "#15803d" },
  Preparing: { bg: "#fef9c3", color: "#a16207" },
  Pending: { bg: "#fee2e2", color: "#dc2626" },
  VIP: { bg: "#ede9fe", color: "#7c3aed" },
  Regular: { bg: "#dbeafe", color: "#1d4ed8" },
  New: { bg: "#f3f4f6", color: "#374151" },
};

function Badge({ status }) {
  const style = STATUS_COLORS[status] || { bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{ background: style.bg, color: style.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
      {status}
    </span>
  );
}

function MiniBar({ data, color = COLORS.accent }) {
  const max = Math.max(...data.map((d) => d.amount));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80 }}>
      {data.map((d) => (
        <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: "100%", background: color, borderRadius: "3px 3px 0 0", height: `${(d.amount / max) * 64}px`, minHeight: 4, opacity: 0.85 }} />
          <span style={{ fontSize: 9, color: COLORS.muted, textAlign: "center" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function StatCard({ icon, label, value, sub, color = COLORS.accent }) {
  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "18px 20px", display: "flex", gap: 14, alignItems: "center" }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text }}>{value}</div>
        <div style={{ fontSize: 13, color: COLORS.muted }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: color, fontWeight: 600 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: COLORS.card, borderRadius: 18, width: "100%", maxWidth: 500, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${COLORS.border}` }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: COLORS.muted, lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", options }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 5 }}>{label}</label>
      {options ? (
        <select value={value} onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "9px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, background: COLORS.bg, color: COLORS.text }}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%", padding: "9px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, background: COLORS.bg, color: COLORS.text, boxSizing: "border-box" }} />
      )}
    </div>
  );
}

// ─── PAYMENTS PAGE ─────────────────────────────────────────────────────────
function PaymentsPage() {
  const [period, setPeriod] = useState("daily");
  const data = PAYMENT_DATA[period];
  const total = data.reduce((s, d) => s + d.amount, 0);
  const max = Math.max(...data.map((d) => d.amount));
  const avg = Math.round(total / data.length);

  const recentPayments = [
    { method: "UPI", count: 145, amount: 28900 },
    { method: "Cash", count: 89, amount: 17800 },
    { method: "Card", count: 56, amount: 14200 },
  ];

  return (
    <div>
      <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700 }}>Payment Analytics</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 24 }}>
        <StatCard icon="💰" label="Total Revenue" value={`₹${(total / 1000).toFixed(1)}K`} sub="↑ 12% vs last period" color={COLORS.success} />
        <StatCard icon="📊" label="Average" value={`₹${(avg / 1000).toFixed(1)}K`} sub="Per period" color={COLORS.info} />
        <StatCard icon="🧾" label="Transactions" value="290" sub="This period" color={COLORS.gold} />
        <StatCard icon="📈" label="Peak Day" value={`₹${(max / 1000).toFixed(1)}K`} sub={data.find((d) => d.amount === max)?.label} color={COLORS.accent} />
      </div>

      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Revenue Overview</h3>
          <div style={{ display: "flex", gap: 6 }}>
            {["daily", "monthly", "yearly"].map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: period === p ? COLORS.accent : COLORS.bg, color: period === p ? "#fff" : COLORS.muted }}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 160 }}>
          {data.map((d) => (
            <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 9, color: COLORS.muted }}>₹{d.amount >= 1000 ? (d.amount / 1000).toFixed(0) + "K" : d.amount}</span>
              <div style={{ width: "100%", background: `linear-gradient(180deg,${COLORS.accent},${COLORS.accent}88)`, borderRadius: "4px 4px 0 0", height: `${(d.amount / max) * 130}px`, minHeight: 6 }} />
              <span style={{ fontSize: 9, color: COLORS.muted }}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Payment Methods</h3>
          {recentPayments.map((p) => (
            <div key={p.method} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.method}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{p.count} transactions</div>
              </div>
              <div style={{ fontWeight: 700, color: COLORS.success }}>₹{p.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Recent Transactions</h3>
          {INITIAL_ORDERS.slice(0, 4).map((o) => (
            <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{o.id}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{o.customer} · {o.method}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>₹{o.total}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ORDERS PAGE ────────────────────────────────────────────────────────────
function OrdersPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const statuses = ["All", "Pending", "Preparing", "Delivered"];

  const filtered = INITIAL_ORDERS.filter((o) => {
    const matchStatus = filter === "All" || o.status === filter;
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = { Pending: 0, Preparing: 0, Delivered: 0 };
  INITIAL_ORDERS.forEach((o) => counts[o.status]++);

  return (
    <div>
      <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700 }}>Orders</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 20 }}>
        <StatCard icon="🕐" label="Pending" value={counts.Pending} color={COLORS.accent} />
        <StatCard icon="🍳" label="Preparing" value={counts.Preparing} color={COLORS.warn} />
        <StatCard icon="✅" label="Delivered" value={counts.Delivered} color={COLORS.success} />
        <StatCard icon="📋" label="Total Today" value={INITIAL_ORDERS.length} color={COLORS.info} />
      </div>

      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders or customers…"
            style={{ flex: 1, minWidth: 200, padding: "9px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, background: COLORS.bg }} />
          <div style={{ display: "flex", gap: 6 }}>
            {statuses.map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                style={{ padding: "8px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: filter === s ? COLORS.accent : COLORS.bg, color: filter === s ? "#fff" : COLORS.muted }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: COLORS.bg }}>
                {["Order ID", "Customer", "Items", "Amount", "Date", "Time", "Method", "Status"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, fontSize: 12, color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  <td style={{ padding: "12px 14px", fontWeight: 700, color: COLORS.accent }}>{o.id}</td>
                  <td style={{ padding: "12px 14px", fontWeight: 600 }}>{o.customer}</td>
                  <td style={{ padding: "12px 14px", color: COLORS.muted, maxWidth: 200, fontSize: 12 }}>{o.items}</td>
                  <td style={{ padding: "12px 14px", fontWeight: 700 }}>₹{o.total}</td>
                  <td style={{ padding: "12px 14px", color: COLORS.muted, fontSize: 12 }}>{o.date}</td>
                  <td style={{ padding: "12px 14px", color: COLORS.muted, fontSize: 12 }}>{o.time}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12 }}>{o.method}</td>
                  <td style={{ padding: "12px 14px" }}><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p style={{ textAlign: "center", color: COLORS.muted, padding: 30 }}>No orders found</p>}
        </div>
      </div>
    </div>
  );
}

// ─── MENU PAGE ───────────────────────────────────────────────────────────────
function MenuPage() {
  const [items, setItems] = useState(INITIAL_MENU);
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "", category: "Rice", price: "", quality: "Regular", stock: "", image: "🍽️", available: true });
  const [editId, setEditId] = useState(null);

  const openAdd = () => { setForm({ name: "", category: "Rice", price: "", quality: "Regular", stock: "", image: "🍽️", available: true }); setEditId(null); setModal("form"); };
  const openEdit = (item) => { setForm({ ...item }); setEditId(item.id); setModal("form"); };
  const handleDelete = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editId) {
      setItems((prev) => prev.map((i) => i.id === editId ? { ...form, id: editId, price: +form.price, stock: +form.stock } : i));
    } else {
      setItems((prev) => [...prev, { ...form, id: Date.now(), price: +form.price, stock: +form.stock }]);
    }
    setModal(null);
  };

  const filtered = useMemo(() => {
    let list = items;
    if (catFilter !== "All") list = list.filter((i) => i.category === catFilter);
    if (search) list = list.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    list = [...list].sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "priceDesc") return b.price - a.price;
      if (sortBy === "stock") return b.stock - a.stock;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [items, catFilter, search, sortBy]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Menu Management</h2>
        <button onClick={openAdd}
          style={{ background: COLORS.accent, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
          + Add Item
        </button>
      </div>

      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search menu items…"
            style={{ flex: 1, minWidth: 180, padding: "8px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 9, fontSize: 14, background: COLORS.bg }} />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "8px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 9, fontSize: 13, background: COLORS.bg }}>
            <option value="name">Sort: Name A–Z</option>
            <option value="price">Sort: Price Low–High</option>
            <option value="priceDesc">Sort: Price High–Low</option>
            <option value="stock">Sort: Stock</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCatFilter(c)}
              style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: catFilter === c ? COLORS.accent : COLORS.bg, color: catFilter === c ? "#fff" : COLORS.muted }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 14 }}>
        {filtered.map((item) => (
          <div key={item.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden", transition: "box-shadow .2s" }}>
            <div style={{ background: `${COLORS.accent}12`, height: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, position: "relative" }}>
              {item.image}
              {!item.available && (
                <span style={{ position: "absolute", top: 8, right: 8, background: "#ef4444", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>Unavailable</span>
              )}
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</div>
                <div style={{ fontWeight: 800, color: COLORS.accent, fontSize: 16 }}>₹{item.price}</div>
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <span style={{ background: COLORS.bg, fontSize: 11, padding: "2px 8px", borderRadius: 10, color: COLORS.muted, fontWeight: 600 }}>{item.category}</span>
                <span style={{ background: item.quality === "Special" ? "#fef9c3" : item.quality === "Premium" ? "#ede9fe" : "#f3f4f6", fontSize: 11, padding: "2px 8px", borderRadius: 10, color: COLORS.muted, fontWeight: 600 }}>{item.quality}</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12 }}>Stock: <strong style={{ color: item.stock < 30 ? "#ef4444" : COLORS.text }}>{item.stock}</strong> units</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => openEdit(item)} style={{ flex: 1, background: COLORS.info + "18", color: COLORS.info, border: "none", borderRadius: 8, padding: "7px 0", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ flex: 1, background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, padding: "7px 0", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal === "form"} title={editId ? "Edit Menu Item" : "Add Menu Item"} onClose={() => setModal(null)}>
        <Input label="Item Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}><Input label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={["Rice", "Dosa", "Curry", "Sides", "Beverages", "Snacks"]} /></div>
          <div style={{ flex: 1 }}><Input label="Quality" value={form.quality} onChange={(v) => setForm({ ...form, quality: v })} options={QUALITY_OPTIONS} /></div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}><Input label="Price (₹)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" /></div>
          <div style={{ flex: 1 }}><Input label="Stock (units)" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} type="number" /></div>
        </div>
        <Input label="Emoji Icon" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
        <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Available</label>
          <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} style={{ width: 18, height: 18, cursor: "pointer" }} />
        </div>
        <button onClick={handleSave}
          style={{ width: "100%", background: COLORS.accent, color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
          {editId ? "Update Item" : "Add Item"}
        </button>
      </Modal>
    </div>
  );
}

// ─── CUSTOMERS PAGE ──────────────────────────────────────────────────────────
function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = INITIAL_CUSTOMERS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700 }}>Customer Details</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 20 }}>
        <StatCard icon="👥" label="Total Customers" value={INITIAL_CUSTOMERS.length} color={COLORS.info} />
        <StatCard icon="⭐" label="VIP Customers" value={INITIAL_CUSTOMERS.filter((c) => c.status === "VIP").length} color={COLORS.gold} />
        <StatCard icon="🔄" label="Regular" value={INITIAL_CUSTOMERS.filter((c) => c.status === "Regular").length} color={COLORS.success} />
        <StatCard icon="🆕" label="New" value={INITIAL_CUSTOMERS.filter((c) => c.status === "New").length} color={COLORS.accent} />
      </div>

      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or phone…"
            style={{ flex: 1, minWidth: 200, padding: "8px 14px", border: `1px solid ${COLORS.border}`, borderRadius: 9, fontSize: 14, background: COLORS.bg }} />
          <div style={{ display: "flex", gap: 6 }}>
            {["All", "VIP", "Regular", "New"].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                style={{ padding: "7px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: statusFilter === s ? COLORS.accent : COLORS.bg, color: statusFilter === s ? "#fff" : COLORS.muted }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
          {filtered.map((c) => (
            <div key={c.id} style={{ background: COLORS.bg, borderRadius: 14, padding: 16, border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: COLORS.accent + "22", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: COLORS.accent }}>
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>{c.phone}</div>
                </div>
                <div style={{ marginLeft: "auto" }}><Badge status={c.status} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ background: COLORS.card, borderRadius: 10, padding: "8px 12px" }}>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>Total Orders</div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{c.orders}</div>
                </div>
                <div style={{ background: COLORS.card, borderRadius: 10, padding: "8px 12px" }}>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>Total Spent</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.success }}>₹{c.totalSpent.toLocaleString()}</div>
                </div>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: COLORS.muted }}>📧 {c.email} · Last visit: {c.lastVisit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ────────────────────────────────────────────────────────────
function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Chef Rajan Kumar",
    role: "Restaurant Admin",
    email: "rajan@spicegardenrestaurant.com",
    phone: "9876543210",
    restaurant: "Spice Garden Restaurant",
    address: "Main Street, Tirur, Kerala",
    since: "2018",
    avatar: "RK",
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });

  const handleSave = () => { setProfile(form); setEditing(false); };

  const stats = [
    { label: "Years Active", value: new Date().getFullYear() - +profile.since },
    { label: "Menu Items", value: INITIAL_MENU.length },
    { label: "Customers", value: INITIAL_CUSTOMERS.length },
    { label: "Orders Today", value: INITIAL_ORDERS.length },
  ];

  return (
    <div style={{ maxWidth: 700 }}>
      <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700 }}>Admin Profile</h2>
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 20, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`, height: 120, position: "relative" }}>
          <div style={{ position: "absolute", bottom: -36, left: 28, width: 72, height: 72, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, color: "#fff", border: "4px solid #fff" }}>
            {profile.avatar}
          </div>
        </div>
        <div style={{ padding: "44px 28px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800 }}>{profile.name}</h3>
              <span style={{ background: COLORS.accent + "22", color: COLORS.accent, fontSize: 13, fontWeight: 700, padding: "3px 12px", borderRadius: 20 }}>{profile.role}</span>
            </div>
            <button onClick={() => { setForm({ ...profile }); setEditing(true); }}
              style={{ background: COLORS.accent, color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              Edit Profile
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 20 }}>
            {[["📧 Email", profile.email], ["📱 Phone", profile.phone], ["🍽️ Restaurant", profile.restaurant], ["📍 Address", profile.address]].map(([l, v]) => (
              <div key={l} style={{ background: COLORS.bg, borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 2 }}>{l.split(" ")[0]} {l.split(" ").slice(1).join(" ")}</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.accent }}>{s.value}</div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <Modal open={editing} title="Edit Profile" onClose={() => setEditing(false)}>
        <Input label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Input label="Restaurant Name" value={form.restaurant} onChange={(v) => setForm({ ...form, restaurant: v })} />
        <Input label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
        <button onClick={handleSave}
          style={{ width: "100%", background: COLORS.accent, color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
          Save Changes
        </button>
      </Modal>
    </div>
  );
}

// ─── DASHBOARD PAGE ──────────────────────────────────────────────────────────
function DashboardPage() {
  const todayRevenue = INITIAL_ORDERS.filter((o) => o.date === "2024-01-16").reduce((s, o) => s + o.total, 0);
  return (
    <div>
      <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700 }}>Welcome back, Chef Rajan 👋</h2>
      <p style={{ margin: "0 0 20px", color: COLORS.muted, fontSize: 14 }}>Here's what's happening at Le Kochi today.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 24 }}>
        <StatCard icon="💰" label="Today's Revenue" value={`₹${todayRevenue}`} sub="4 orders" color={COLORS.success} />
        <StatCard icon="📋" label="Active Orders" value="3" sub="2 preparing" color={COLORS.warn} />
        <StatCard icon="🍽️" label="Menu Items" value={INITIAL_MENU.length} sub="All available" color={COLORS.info} />
        <StatCard icon="👥" label="Customers" value={INITIAL_CUSTOMERS.length} sub="2 VIP" color={COLORS.accent} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Recent Orders</h3>
          {INITIAL_ORDERS.slice(0, 5).map((o) => (
            <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{o.id} — {o.customer}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{o.items}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 700 }}>₹{o.total}</span>
                <Badge status={o.status} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>This Week</h3>
          <MiniBar data={PAYMENT_DATA.daily} />
          <div style={{ marginTop: 12, padding: "10px 0", borderTop: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 12, color: COLORS.muted }}>Weekly Total</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: COLORS.accent }}>₹{(PAYMENT_DATA.daily.reduce((s, d) => s + d.amount, 0) / 1000).toFixed(1)}K</div>
          </div>
        </div>
      </div>
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20 }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Low Stock Alert</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {INITIAL_MENU.filter((i) => i.stock < 70).map((i) => (
            <div key={i.id} style={{ background: "#fee2e2", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>{i.image}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#991b1b" }}>{i.name}</div>
                <div style={{ fontSize: 11, color: "#dc2626" }}>{i.stock} units left</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [page, setPage] = useState("dashboard");

  const navItems = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "payments", icon: "💰", label: "Payments" },
    { id: "orders", icon: "📋", label: "Orders" },
    { id: "menu", icon: "🍽️", label: "Menu" },
    { id: "customers", icon: "👥", label: "Customers" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  const pages = { dashboard: <DashboardPage />, payments: <PaymentsPage />, orders: <OrdersPage />, menu: <MenuPage />, customers: <CustomersPage />, profile: <ProfilePage /> };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", background: COLORS.bg, color: COLORS.text }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: COLORS.primary, minHeight: "100vh", position: "fixed", left: 0, top: 0, zIndex: 100, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌶️</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, lineHeight: 1 }}>Le Kochi</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Restaurant Admin</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "8px 12px" }}>
          {navItems.map((n) => (
            <button key={n.id} onClick={() => setPage(n.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 3, textAlign: "left", fontSize: 14, fontWeight: page === n.id ? 700 : 500, background: page === n.id ? COLORS.accent : "transparent", color: page === n.id ? "#fff" : "rgba(255,255,255,0.6)", transition: "all .2s" }}>
              <span style={{ fontSize: 18 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#fff" }}>RK</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>Rajan Kumar</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: 220, padding: "28px 28px 40px", minWidth: 0 }}>
        {pages[page]}
      </div>
    </div>
  );
}