import { useState, useEffect } from "react";
import { COLORS, StatCard, Badge } from "../constants";
import axiosInstance from "../../../axiosInstance/page";

const STATUSES = ["All", "Pending", "Preparing", "Delivered", "Cancelled"];

// ── STATUS COLOR MAP for the action select ────────────────────────────────────
const SELECT_COLORS = {
    Pending:   { bg: "#fee2e2", color: "#dc2626" },
    Preparing: { bg: "#fef9c3", color: "#a16207" },
    Delivered: { bg: "#dcfce7", color: "#15803d" },
    Cancelled: { bg: "#f3f4f6", color: "#374151" },
};

export default function OrdersPage() {
    const [orders,   setOrders]   = useState([]);
    const [filter,   setFilter]   = useState("All");
    const [search,   setSearch]   = useState("");
    const [loading,  setLoading]  = useState(true);
    const [updating, setUpdating] = useState(null); // id of row being updated

    useEffect(() => {
        fetchOrders();
    }, []);

    // ── FETCH ─────────────────────────────────────────────────────────────────
    const fetchOrders = async () => {
        try {
            const res = await axiosInstance.get("/admin/orders");
            if (res.data.success) {
                setOrders(res.data.orders || []);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // ── UPDATE STATUS ─────────────────────────────────────────────────────────
    const handleStatusUpdate = async (id, newStatus) => {
        setUpdating(id);
        try {
            const res = await axiosInstance.put(`/admin/orders/${id}`, { status: newStatus });
            if (res.data.success) {
                // Optimistic update – no full refetch needed
                setOrders((prev) =>
                    prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
                );
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Update failed");
        } finally {
            setUpdating(null);
        }
    };

    // ── DELETE ORDER ──────────────────────────────────────────────────────────
    const handleDelete = async (id, orderId) => {
        if (!window.confirm(`Delete order ${orderId}? This cannot be undone.`)) return;
        try {
            const res = await axiosInstance.delete(`/admin/orders/${id}`);
            if (res.data.success) {
                setOrders((prev) => prev.filter((o) => o.id !== id));
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Delete failed");
        }
    };

    // ── DERIVED DATA ──────────────────────────────────────────────────────────
    const counts = { Pending: 0, Preparing: 0, Delivered: 0, Cancelled: 0 };
    orders.forEach((o) => {
        if (counts[o.status] !== undefined) counts[o.status]++;
    });

    const filtered = orders.filter((o) => {
        const matchStatus = filter === "All" || o.status === filter;
        const term = search.toLowerCase();
        const matchSearch =
            (o.customer || "").toLowerCase().includes(term) ||
            (o.orderId  || "").toLowerCase().includes(term) ||
            (o.id       || "").toString().includes(term);
        return matchStatus && matchSearch;
    });

    // ── LOADING ───────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: COLORS.muted, fontSize: 15 }}>
                Loading orders…
            </div>
        );
    }

    // ── RENDER ────────────────────────────────────────────────────────────────
    return (
        <div>
            <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700 }}>Orders</h2>

            {/* ── Stat Cards ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 20 }}>
                <StatCard icon="🕐" label="Pending"     value={counts.Pending}    color={COLORS.accent}  />
                <StatCard icon="🍳" label="Preparing"   value={counts.Preparing}  color={COLORS.warn}    />
                <StatCard icon="✅" label="Delivered"   value={counts.Delivered}  color={COLORS.success} />
                <StatCard icon="📋" label="Total"       value={orders.length}     color={COLORS.info}    />
            </div>

            <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 16, padding: 20,
            }}>
                {/* ── Filters ── */}
                <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by order ID or customer…"
                        style={{
                            flex: 1, minWidth: 200, padding: "9px 14px",
                            border: `1px solid ${COLORS.border}`, borderRadius: 10,
                            fontSize: 14, background: COLORS.bg,
                        }}
                    />
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {STATUSES.map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                style={{
                                    padding: "8px 14px", borderRadius: 20, border: "none",
                                    cursor: "pointer", fontSize: 13, fontWeight: 600,
                                    background: filter === s ? COLORS.accent : COLORS.bg,
                                    color:      filter === s ? "#fff"        : COLORS.muted,
                                }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Table ── */}
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                        <thead>
                            <tr style={{ background: COLORS.bg }}>
                                {["Order ID", "Customer", "Items", "Amount", "Date", "Time", "Method", "Status", "Change Status", "Delete"].map((h) => (
                                    <th key={h} style={{
                                        padding: "10px 14px", textAlign: "left",
                                        fontWeight: 600, fontSize: 12, color: COLORS.muted,
                                        borderBottom: `1px solid ${COLORS.border}`,
                                        whiteSpace: "nowrap",
                                    }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((o) => {
                                const sc = SELECT_COLORS[o.status] || SELECT_COLORS.Pending;
                                const isUpdating = updating === o.id;

                                return (
                                    <tr
                                        key={o.id}
                                        style={{
                                            borderBottom: `1px solid ${COLORS.border}`,
                                            opacity: isUpdating ? 0.6 : 1,
                                            transition: "opacity 0.2s",
                                        }}
                                    >
                                        {/* Order ID (readable) */}
                                        <td style={{ padding: "12px 14px", fontWeight: 700, color: COLORS.accent, whiteSpace: "nowrap" }}>
                                            {o.orderId || `#${o.id}`}
                                        </td>

                                        {/* Customer */}
                                        <td style={{ padding: "12px 14px", fontWeight: 600, whiteSpace: "nowrap" }}>
                                            {o.customer || "—"}
                                        </td>

                                        {/* Items */}
                                        <td style={{ padding: "12px 14px", color: COLORS.muted, maxWidth: 220, fontSize: 12 }}>
                                            <span style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}>
                                                {o.items || "—"}
                                            </span>
                                        </td>

                                        {/* Amount */}
                                        <td style={{ padding: "12px 14px", fontWeight: 700, whiteSpace: "nowrap" }}>
                                            ₹{Number(o.total).toFixed(2)}
                                        </td>

                                        {/* Date */}
                                        <td style={{ padding: "12px 14px", color: COLORS.muted, fontSize: 12, whiteSpace: "nowrap" }}>
                                            {o.date}
                                        </td>

                                        {/* Time */}
                                        <td style={{ padding: "12px 14px", color: COLORS.muted, fontSize: 12, whiteSpace: "nowrap" }}>
                                            {o.time}
                                        </td>

                                        {/* Payment Method */}
                                        <td style={{ padding: "12px 14px", fontSize: 12, whiteSpace: "nowrap" }}>
                                            {o.method}
                                        </td>

                                        {/* Status Badge */}
                                        <td style={{ padding: "12px 14px" }}>
                                            <Badge status={o.status} />
                                        </td>

                                        {/* Change Status select */}
                                        <td style={{ padding: "12px 14px" }}>
                                            <select
                                                value={o.status}
                                                disabled={isUpdating}
                                                onChange={(e) => handleStatusUpdate(o.id, e.target.value)}
                                                style={{
                                                    padding: "5px 10px", borderRadius: 8, fontSize: 12,
                                                    border: `1px solid ${sc.color}44`,
                                                    background: sc.bg, color: sc.color,
                                                    cursor: isUpdating ? "not-allowed" : "pointer",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {["Pending", "Preparing", "Delivered", "Cancelled"].map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </td>

                                        {/* Delete button */}
                                        <td style={{ padding: "12px 14px" }}>
                                            <button
                                                onClick={() => handleDelete(o.id, o.orderId || `#${o.id}`)}
                                                style={{
                                                    background: "#fee2e2", color: "#dc2626",
                                                    border: "none", borderRadius: 8,
                                                    padding: "6px 12px", fontWeight: 600,
                                                    cursor: "pointer", fontSize: 12,
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <p style={{ textAlign: "center", color: COLORS.muted, padding: 30 }}>
                            No orders found.
                        </p>
                    )}
                </div>

                {/* Result count */}
                {filtered.length > 0 && (
                    <div style={{ marginTop: 12, fontSize: 12, color: COLORS.muted, textAlign: "right" }}>
                        Showing {filtered.length} of {orders.length} orders
                    </div>
                )}
            </div>
        </div>
    );
}