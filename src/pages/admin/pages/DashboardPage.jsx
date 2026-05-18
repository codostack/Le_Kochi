import { COLORS, INITIAL_MENU, INITIAL_CUSTOMERS, INITIAL_ORDERS, PAYMENT_DATA, Badge, StatCard, MiniBar } from "../constants";

export default function DashboardPage() {
  const todayOrders = INITIAL_ORDERS.filter((o) => o.date === "2024-01-16");
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const lowStock = INITIAL_MENU.filter((i) => i.stock < 75);

  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700 }}>
        Welcome back, Chef Rajan 👋
      </h2>
      <p style={{ margin: "0 0 22px", color: COLORS.muted, fontSize: 14 }}>
        Here's what's happening at Spice Garden today.
      </p>

      {/* ── Stat Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 24 }}>
        <StatCard icon="💰" label="Today's Revenue" value={`₹${todayRevenue}`} sub={`${todayOrders.length} orders`} color={COLORS.success} />
        <StatCard icon="📋" label="Active Orders" value="3" sub="2 preparing" color={COLORS.warn} />
        <StatCard icon="🍽️" label="Menu Items" value={INITIAL_MENU.length} sub="All available" color={COLORS.info} />
        <StatCard icon="👥" label="Customers" value={INITIAL_CUSTOMERS.length} sub="2 VIP" color={COLORS.accent} />
      </div>

      {/* ── Recent Orders + Weekly Chart ── */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 18 }}>
        {/* Recent Orders */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Recent Orders</h3>
          {INITIAL_ORDERS.slice(0, 5).map((o) => (
            <div key={o.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`,
            }}>
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

        {/* Weekly Chart */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>This Week</h3>
          <MiniBar data={PAYMENT_DATA.daily} />
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 12, color: COLORS.muted }}>Weekly Total</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: COLORS.accent }}>
              ₹{(PAYMENT_DATA.daily.reduce((s, d) => s + d.amount, 0) / 1000).toFixed(1)}K
            </div>
          </div>
        </div>
      </div>

      {/* ── Low Stock Alert ── */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20 }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Low Stock Alert</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {lowStock.map((i) => (
            <div key={i.id} style={{
              background: "#fee2e2", borderRadius: 10, padding: "8px 14px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
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