import { useEffect, useState } from "react";
import { styles } from "./styles";

// Layout components
import Sidebar from "./components/Sidebar";
import DishScroller from "./components/DishScroller";

// Page components
import OrdersPage from "./pages/OrdersPage";
import PaymentPage from "./pages/PaymentPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import axiosInstance from "../../axiosInstance/page";

const tabs = [
  { key: "orders", label: "Orders", icon: "📦" },
  { key: "payment", label: "Payment", icon: "💳" },
  { key: "cart", label: "Cart", icon: "🛒" },
  { key: "profile", label: "Profile", icon: "👤" },
];

export default function CustomerPanel() {
  const [activeTab, setActiveTab] = useState("orders");

  // CUSTOMER STATE
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetchCustomer();
  }, []);

  // FETCH CUSTOMER
  const fetchCustomer = async () => {
    try {
      const res = await axiosInstance.get("/customer/profile");
console.log(res.data);

      if (res.data.success) {
        setCustomer(res.data.customer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.root}>
      {/* ── Top Nav ───────────────────────────────────────────── */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🔥</span>
          <span style={styles.logoText}>ZARĀ</span>
          <span style={styles.logoSub}>KITCHEN</span>
        </div>

        <nav style={styles.nav}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                ...styles.navBtn,
                ...(activeTab === tab.key
                  ? styles.navBtnActive
                  : {}),
              }}
            >
              <span style={styles.navIcon}>
                {tab.icon}
              </span>

              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div style={styles.headerRight}>
          <div style={styles.notifBadge}>3</div>

          <span style={{ fontSize: 22 }}>🔔</span>

          {/* CUSTOMER NAME */}
          {customer && (
            <div
              style={{
                marginLeft: 15,
                color: "#fff",
                fontWeight: 600,
              }}
            >
              {customer.name}
            </div>
          )}
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div style={styles.body}>
        {/* LEFT SIDEBAR */}
        <Sidebar customer={customer} />

        {/* MAIN CONTENT */}
        <main style={styles.main}>
          <DishScroller customer={customer} />

          <div style={styles.tabContent}>
            {activeTab === "orders" && (
              <OrdersPage customer={customer} />
            )}

            {activeTab === "payment" && (
              <PaymentPage customer={customer} />
            )}

            {activeTab === "cart" && (
              <CartPage customer={customer} />
            )}

            {activeTab === "profile" && (
              <ProfilePage customer={customer} />
            )}
          </div>
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: #0d0d0d;
        }

        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}