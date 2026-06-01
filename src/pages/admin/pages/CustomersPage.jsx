import { useState, useEffect } from "react";
import { COLORS, StatCard, Badge } from "../constants";
import adminAxios from "../../../axiosInstance/adminAxios";

export default function CustomersPage() {
    const [customers,    setCustomers]    = useState([]);
    const [search,       setSearch]       = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading,      setLoading]      = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await adminAxios.get("/admin/customers");
            if (res.data.success) {
             console.log(res.data.customers);
             
                setCustomers(res.data.customers || []);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const counts = {
        total:   customers.length,
        VIP:     customers.filter((c) => c.status === "VIP").length,
        Regular: customers.filter((c) => c.status === "Regular").length,
        New:     customers.filter((c) => c.status === "New").length,
    };

    const filtered = customers.filter((c) => {
        const matchSearch =
            (c.name  || "").toLowerCase().includes(search.toLowerCase()) ||
            (c.phone || "").includes(search);
        const matchStatus = statusFilter === "All" || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const getInitials = (name = "") =>
        name.split(" ").map((n) => n[0]).join("").toUpperCase();

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: COLORS.muted, fontSize: 15 }}>
                Loading customers…
            </div>
        );
    }

    return (
        <div>
            <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700 }}>Customer Details</h2>

            {/* ── Stat Cards ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 20 }}>
                <StatCard icon="👥" label="Total Customers" value={counts.total}   color={COLORS.info}    />
                <StatCard icon="⭐" label="VIP Customers"   value={counts.VIP}     color={COLORS.gold}    />
                <StatCard icon="🔄" label="Regular"          value={counts.Regular} color={COLORS.success} />
                <StatCard icon="🆕" label="New"              value={counts.New}     color={COLORS.accent}  />
            </div>

            <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 16, padding: 20,
            }}>
                {/* ── Search + Status Filter ── */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or phone…"
                        style={{
                            flex: 1, minWidth: 200, padding: "8px 14px",
                            border: `1px solid ${COLORS.border}`, borderRadius: 9,
                            fontSize: 14, background: COLORS.bg,
                        }}
                    />
                    <div style={{ display: "flex", gap: 6 }}>
                        {["All", "VIP", "Regular", "New"].map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                style={{
                                    padding: "7px 14px", borderRadius: 20, border: "none",
                                    cursor: "pointer", fontSize: 13, fontWeight: 600,
                                    background: statusFilter === s ? COLORS.accent : COLORS.bg,
                                    color:      statusFilter === s ? "#fff"        : COLORS.muted,
                                }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Customer Cards ── */}
                {filtered.length === 0 ? (
                    <p style={{ textAlign: "center", color: COLORS.muted, padding: 30 }}>No customers found.</p>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
                        {filtered.map((c) => (
                            <div key={c.id} style={{
                                background: COLORS.bg, borderRadius: 14,
                                padding: 16, border: `1px solid ${COLORS.border}`,
                            }}>
                                {/* Avatar row */}
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: "50%",
                                        background: COLORS.accent + "22",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontWeight: 700, fontSize: 16, color: COLORS.accent, flexShrink: 0,
                                    }}>
                                        {getInitials(c.name)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
                                        <div style={{ fontSize: 12, color: COLORS.muted }}>{c.phone}</div>
                                    </div>
                                    <div style={{ marginLeft: "auto" }}>
                                        <Badge status={c.status} />
                                    </div>
                                </div>

                                {/* Stats */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                    <div style={{ background: COLORS.card, borderRadius: 10, padding: "8px 12px" }}>
                                        <div style={{ fontSize: 11, color: COLORS.muted }}>Total Orders</div>
                                        <div style={{ fontWeight: 700, fontSize: 16 }}>{c.orders}</div>
                                    </div>
                                    <div style={{ background: COLORS.card, borderRadius: 10, padding: "8px 12px" }}>
                                        <div style={{ fontSize: 11, color: COLORS.muted }}>Total Spent</div>
                                        <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.success }}>
                                            ${Number(c.totalSpent).toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Email + last visit */}
                                <div style={{ marginTop: 10, fontSize: 12, color: COLORS.muted }}>
                                    📧 {c.email} · Last visit: {c.lastVisit}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}