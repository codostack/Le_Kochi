import { useState, useEffect } from "react";
import { COLORS, StatCard } from "../constants";
import axiosInstance from "../../../axiosInstance/page";

export default function PaymentsPage() {
    const [period, setPeriod]           = useState("daily");
    const [paymentData, setPaymentData] = useState({ daily: [], monthly: [], yearly: [] });
    const [recentOrders, setRecentOrders] = useState([]);
    const [methodStats, setMethodStats]   = useState([]);
    const [loading, setLoading]           = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await axiosInstance.get("/orders/payments");
            if (res.data.success) {
                setPaymentData(res.data.paymentData   || { daily: [], monthly: [], yearly: [] });
                setRecentOrders(res.data.recentOrders || []);
                setMethodStats(res.data.methodStats   || []);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const data  = paymentData[period] || [];
    const total = data.reduce((s, d) => s + (d.amount || 0), 0);
    const max   = data.length ? Math.max(...data.map((d) => d.amount || 0)) : 1;
    const avg   = data.length ? Math.round(total / data.length) : 0;
    const peak  = data.find((d) => d.amount === max);

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: COLORS.muted, fontSize: 15 }}>
                Loading payments…
            </div>
        );
    }

    return (
        <div>
            <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700 }}>
                Payment Analytics
            </h2>

            {/* ── Stat Cards ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 24 }}>
                <StatCard
                    icon="💰" label="Total Revenue"
                    value={`₹${(total / 1000).toFixed(1)}K`}
                    sub="↑ 12% vs last period"
                    color={COLORS.success}
                />
                <StatCard
                    icon="📊" label="Average"
                    value={`₹${(avg / 1000).toFixed(1)}K`}
                    sub="Per period"
                    color={COLORS.info}
                />
                <StatCard
                    icon="🧾" label="Transactions"
                    value={recentOrders.length || 0}
                    sub="This period"
                    color={COLORS.gold}
                />
                <StatCard
                    icon="📈" label="Peak Day"
                    value={`₹${(max / 1000).toFixed(1)}K`}
                    sub={peak?.label || "—"}
                    color={COLORS.accent}
                />
            </div>

            {/* ── Revenue Bar Chart ── */}
            <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 16, padding: 24, marginBottom: 20,
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Revenue Overview</h3>
                    <div style={{ display: "flex", gap: 6 }}>
                        {["daily", "monthly", "yearly"].map((p) => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                style={{
                                    padding: "6px 14px", borderRadius: 20, border: "none",
                                    cursor: "pointer", fontSize: 13, fontWeight: 600,
                                    background: period === p ? COLORS.accent : COLORS.bg,
                                    color:      period === p ? "#fff"        : COLORS.muted,
                                }}
                            >
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {data.length === 0 ? (
                    <div style={{ textAlign: "center", color: COLORS.muted, padding: "30px 0" }}>
                        No data available for this period.
                    </div>
                ) : (
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 160 }}>
                        {data.map((d) => (
                            <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                <span style={{ fontSize: 9, color: COLORS.muted }}>
                                    ₹{d.amount >= 1000 ? (d.amount / 1000).toFixed(0) + "K" : d.amount}
                                </span>
                                <div style={{
                                    width: "100%",
                                    background: `linear-gradient(180deg,${COLORS.accent},${COLORS.accent}88)`,
                                    borderRadius: "4px 4px 0 0",
                                    height: `${(d.amount / max) * 130}px`,
                                    minHeight: 6,
                                }} />
                                <span style={{ fontSize: 9, color: COLORS.muted }}>{d.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Methods + Recent Transactions ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Payment Methods */}
                <div style={{
                    background: COLORS.card, border: `1px solid ${COLORS.border}`,
                    borderRadius: 16, padding: 20,
                }}>
                    <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Payment Methods</h3>
                    {methodStats.length === 0 ? (
                        <p style={{ color: COLORS.muted, fontSize: 13 }}>No data available.</p>
                    ) : (
                        methodStats.map((p) => (
                            <div key={p.method} style={{
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`,
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{p.method}</div>
                                    <div style={{ fontSize: 12, color: COLORS.muted }}>{p.count} transactions</div>
                                </div>
                                <div style={{ fontWeight: 700, color: COLORS.success }}>
                                    ₹{Number(p.amount).toLocaleString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Recent Transactions */}
                <div style={{
                    background: COLORS.card, border: `1px solid ${COLORS.border}`,
                    borderRadius: 16, padding: 20,
                }}>
                    <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Recent Transactions</h3>
                    {recentOrders.length === 0 ? (
                        <p style={{ color: COLORS.muted, fontSize: 13 }}>No recent transactions.</p>
                    ) : (
                        recentOrders.slice(0, 5).map((o) => (
                            <div key={o.id} style={{
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`,
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 13 }}>{o.id}</div>
                                    <div style={{ fontSize: 12, color: COLORS.muted }}>{o.customer} · {o.method}</div>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>₹{o.total}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}