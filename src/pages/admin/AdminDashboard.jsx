import { useState } from "react";
import { COLORS } from "./constants";

// ── Page imports ──────────────────────────────────────────────────────────────
import DashboardPage from "./pages/DashboardPage";
import PaymentsPage  from "./pages/PaymentsPage";
import OrdersPage    from "./pages/OrdersPage";
import MenuPage      from "./pages/MenuPage";
import CustomersPage from "./pages/CustomersPage";
import ProfilePage   from "./pages/ProfilePage";

// ── Navigation config ─────────────────────────────────────────────────────────
const NAV_SECTIONS = [
    {
        label: "Overview",
        items: [
            { id: "dashboard", icon: "🏠", label: "Dashboard" },
            { id: "payments",  icon: "💰", label: "Payments"  },
        ],
    },
    {
        label: "Operations",
        items: [
            { id: "orders", icon: "📋", label: "Orders" },
            { id: "menu",   icon: "🍽️", label: "Menu"   },
        ],
    },
    {
        label: "People",
        items: [
            { id: "customers", icon: "👥", label: "Customers" },
            { id: "profile",   icon: "👤", label: "Profile"   },
        ],
    },
];

// ── Page registry ─────────────────────────────────────────────────────────────
const PAGES = {
    dashboard: <DashboardPage />,
    payments:  <PaymentsPage  />,
    orders:    <OrdersPage    />,
    menu:      <MenuPage      />,
    customers: <CustomersPage />,
    profile:   <ProfilePage   />,
};

// ── Root component ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
    const [page, setPage] = useState("dashboard");

    return (
        <div style={{
            display: "flex", minHeight: "100vh",
            fontFamily: "'Segoe UI', sans-serif",
            background: COLORS.bg, color: COLORS.text,
        }}>
            {/* ── Sidebar ── */}
            <aside style={{
                width: 220, background: COLORS.primary, minHeight: "100vh",
                position: "fixed", left: 0, top: 0, zIndex: 100,
                display: "flex", flexDirection: "column",
            }}>
                {/* Logo */}
                <div style={{ padding: "24px 18px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10, background: COLORS.accent,
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                        }}>
                            🌶️
                        </div>
                        <div>
                            <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, lineHeight: 1 }}>Spice Garden</div>
                            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Restaurant Admin</div>
                        </div>
                    </div>
                </div>

                {/* Nav sections */}
                <nav style={{ flex: 1, padding: "10px 10px" }}>
                    {NAV_SECTIONS.map((section) => (
                        <div key={section.label}>
                            <div style={{
                                color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 700,
                                letterSpacing: "0.08em", textTransform: "uppercase",
                                padding: "14px 8px 6px",
                            }}>
                                {section.label}
                            </div>
                            {section.items.map((n) => (
                                <button
                                    key={n.id}
                                    onClick={() => setPage(n.id)}
                                    style={{
                                        width: "100%", display: "flex", alignItems: "center", gap: 12,
                                        padding: "11px 14px", borderRadius: 10, border: "none",
                                        cursor: "pointer", marginBottom: 3, textAlign: "left",
                                        fontSize: 14, transition: "all .15s",
                                        fontWeight: page === n.id ? 700 : 500,
                                        background: page === n.id ? COLORS.accent : "transparent",
                                        color:      page === n.id ? "#fff"        : "rgba(255,255,255,0.55)",
                                    }}
                                >
                                    <span style={{ fontSize: 18 }}>{n.icon}</span>
                                    {n.label}
                                </button>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* Footer / user chip */}
                <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: "50%", background: COLORS.gold,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 700, fontSize: 13, color: "#fff", flexShrink: 0,
                        }}>
                            RK
                        </div>
                        <div>
                            <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>Rajan Kumar</div>
                            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Admin</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ── Main content ── */}
            <main style={{ flex: 1, marginLeft: 220, padding: "28px 28px 40px", minWidth: 0 }}>
                {PAGES[page]}
            </main>
        </div>
    );
}