import { useState } from "react";

const dishes = [
  { name: "Spicy Lamb Biryani", emoji: "🍛", tag: "Chef's Special" },
  { name: "Butter Chicken Masala", emoji: "🍗", tag: "Signature" },
  { name: "Prawn Moilee", emoji: "🦐", tag: "New" },
  { name: "Kerala Fish Curry", emoji: "🐟", tag: "Signature" },
  { name: "Paneer Tikka", emoji: "🧀", tag: "New" },
  { name: "Mutton Rogan Josh", emoji: "🍖", tag: "Chef's Special" },
  { name: "Malabar Parotta", emoji: "🫓", tag: "New" },
  { name: "Chicken 65", emoji: "🍗", tag: "Signature" },
];

const orders = [
  { id: "#ORD-4821", items: "Butter Chicken, Naan x2", date: "May 14, 2026", status: "Delivered", total: "₹620" },
  { id: "#ORD-4790", items: "Prawn Moilee, Rice, Lassi", date: "May 10, 2026", status: "Delivered", total: "₹870" },
  { id: "#ORD-4763", items: "Paneer Tikka, Roti x3", date: "May 6, 2026", status: "Cancelled", total: "₹490" },
];

const cartItems = [
  { name: "Spicy Lamb Biryani", qty: 1, price: "₹380" },
  { name: "Malabar Parotta x3", qty: 3, price: "₹120" },
  { name: "Mango Lassi", qty: 2, price: "₹90" },
];

const statusColor = {
  Delivered: { bg: "#1a3a2a", text: "#4ade80" },
  Pending: { bg: "#3a2e0a", text: "#facc15" },
  Cancelled: { bg: "#3a1a1a", text: "#f87171" },
};

export default function CustomerPanel() {
  const [activeTab, setActiveTab] = useState("orders");

  const tabs = [
    { key: "orders", label: "Orders", icon: "📦" },
    { key: "payment", label: "Payment", icon: "💳" },
    { key: "cart", label: "Cart", icon: "🛒" },
    { key: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div style={styles.root}>
      {/* TOP NAV */}
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
                ...(activeTab === tab.key ? styles.navBtnActive : {}),
              }}
            >
              <span style={styles.navIcon}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div style={styles.headerRight}>
          <div style={styles.notifBadge}>3</div>
          <span style={{ fontSize: 22 }}>🔔</span>
        </div>
      </header>

      <div style={styles.body}>
        {/* LEFT SIDEBAR */}
        <aside style={styles.sidebar}>
          <div style={styles.avatarWrap}>
            <div style={styles.avatarRing}>
              <div style={styles.avatar}>AR</div>
            </div>
            <div style={styles.onlineDot} />
          </div>
          <h2 style={styles.custName}>Arjun Rajan</h2>
          <p style={styles.custHandle}>@arjun.rajan</p>

          <div style={styles.tierBadge}>⭐ Gold Member</div>

          <div style={styles.profileStats}>
            <div style={styles.statBox}>
              <span style={styles.statNum}>47</span>
              <span style={styles.statLabel}>Orders</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statBox}>
              <span style={styles.statNum}>₹12k</span>
              <span style={styles.statLabel}>Spent</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statBox}>
              <span style={styles.statNum}>4.8★</span>
              <span style={styles.statLabel}>Rating</span>
            </div>
          </div>

          <div style={styles.profileInfo}>
            <InfoRow icon="📞" val="+91 98765 43210" />
            <InfoRow icon="📧" val="arjun@email.com" />
            <InfoRow icon="📍" val="Tirur, Kerala" />
            <InfoRow icon="🎂" val="Member since Jan 2024" />
          </div>

          <div style={styles.loyaltyWrap}>
            <div style={styles.loyaltyLabel}>
              <span>Loyalty Points</span>
              <span style={styles.loyaltyPts}>1,240 pts</span>
            </div>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressBar, width: "62%" }} />
            </div>
            <p style={styles.loyaltyNote}>760 pts to Platinum</p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.main}>
          {/* SCROLLER */}
          <div style={styles.scrollerOuter}>
            <span style={styles.scrollerTag}>✦ TODAY'S HIGHLIGHTS</span>
            <div style={styles.scrollerTrack}>
              <div style={styles.scrollerInner}>
                {[...dishes, ...dishes].map((d, i) => (
                  <div key={i} style={styles.dishCard}>
                    <div style={styles.dishEmoji}>{d.emoji}</div>
                    <div style={styles.dishInfo}>
                      <span style={styles.dishName}>{d.name}</span>
                      <span
                        style={{
                          ...styles.dishTag,
                          background: d.tag === "New" ? "#f97316" : d.tag === "Signature" ? "#8b5cf6" : "#059669",
                        }}
                      >
                        {d.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TAB CONTENT */}
          <div style={styles.tabContent}>
            {activeTab === "orders" && <OrdersTab orders={orders} />}
            {activeTab === "payment" && <PaymentTab />}
            {activeTab === "cart" && <CartTab items={cartItems} />}
            {activeTab === "profile" && <ProfileTab />}
          </div>
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>
    </div>
  );
}

function InfoRow({ icon, val }) {
  return (
    <div style={styles.infoRow}>
      <span style={styles.infoIcon}>{icon}</span>
      <span style={styles.infoVal}>{val}</span>
    </div>
  );
}

function OrdersTab({ orders }) {
  return (
    <div style={styles.section}>
      <SectionHeader title="Recent Orders" sub="Your order history" />
      <div style={styles.cardGrid}>
        {orders.map((o, i) => (
          <div key={i} style={{ ...styles.card, animationDelay: `${i * 80}ms` }}>
            <div style={styles.cardTop}>
              <span style={styles.orderId}>{o.id}</span>
              <span
                style={{
                  ...styles.statusChip,
                  background: statusColor[o.status]?.bg,
                  color: statusColor[o.status]?.text,
                }}
              >
                {o.status}
              </span>
            </div>
            <p style={styles.orderItems}>{o.items}</p>
            <div style={styles.cardBottom}>
              <span style={styles.orderDate}>{o.date}</span>
              <span style={styles.orderTotal}>{o.total}</span>
            </div>
            <button style={styles.reorderBtn}>↺ Reorder</button>
          </div>
        ))}
        <div style={{ ...styles.card, ...styles.newOrderCard }}>
          <span style={{ fontSize: 36 }}>+</span>
          <span style={{ marginTop: 8, fontFamily: "'DM Sans', sans-serif", color: "#888", fontSize: 14 }}>
            Place New Order
          </span>
        </div>
      </div>
    </div>
  );
}

function PaymentTab() {
  return (
    <div style={styles.section}>
      <SectionHeader title="Payment Methods" sub="Manage your cards & wallets" />
      <div style={styles.paymentGrid}>
        <div style={styles.creditCard}>
          <div style={styles.cardChip}>▦</div>
          <div style={styles.cardNum}>•••• •••• •••• 4821</div>
          <div style={styles.cardMeta}>
            <div>
              <div style={styles.cardMetaLabel}>Card Holder</div>
              <div style={styles.cardMetaVal}>Arjun Rajan</div>
            </div>
            <div>
              <div style={styles.cardMetaLabel}>Expires</div>
              <div style={styles.cardMetaVal}>09 / 28</div>
            </div>
            <div style={styles.cardNetwork}>VISA</div>
          </div>
        </div>

        <div style={styles.paymentList}>
          {[
            { icon: "🏦", name: "HDFC Net Banking", last: "Linked", active: true },
            { icon: "📱", name: "PhonePe UPI", last: "arjun@ybl", active: true },
            { icon: "💰", name: "Zara Wallet", last: "Balance: ₹340", active: true },
          ].map((m, i) => (
            <div key={i} style={styles.payMethod}>
              <span style={{ fontSize: 22 }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={styles.payMethodName}>{m.name}</div>
                <div style={styles.payMethodSub}>{m.last}</div>
              </div>
              <div style={styles.activeIndicator}>✓ Active</div>
            </div>
          ))}
          <button style={styles.addPayBtn}>+ Add Payment Method</button>
        </div>
      </div>

      <div style={{ ...styles.card, marginTop: 20 }}>
        <SectionHeader title="Transaction History" sub="Recent payments" />
        {[
          { id: "#TXN-9821", amount: "₹620", date: "May 14", method: "VISA •4821", status: "Success" },
          { id: "#TXN-9790", amount: "₹870", date: "May 10", method: "PhonePe", status: "Success" },
          { id: "#TXN-9763", amount: "₹490", date: "May 6", method: "Wallet", status: "Refunded" },
        ].map((t, i) => (
          <div key={i} style={styles.txnRow}>
            <div style={styles.txnIcon}>💸</div>
            <div style={{ flex: 1 }}>
              <div style={styles.txnId}>{t.id}</div>
              <div style={styles.txnMeta}>{t.date} · {t.method}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={styles.txnAmount}>{t.amount}</div>
              <div style={{ ...styles.statusChip, background: t.status === "Success" ? "#1a3a2a" : "#3a2e0a", color: t.status === "Success" ? "#4ade80" : "#facc15", fontSize: 11 }}>{t.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartTab({ items }) {
  const [quantities, setQuantities] = useState(items.map((item) => item.qty));
  const total = ["₹380", "₹120", "₹90"];

  return (
    <div style={styles.section}>
      <SectionHeader title="Your Cart" sub={`${items.length} items`} />
      <div style={styles.cartWrap}>
        <div style={styles.cartItems}>
          {items.map((item, i) => (
            <div key={i} style={styles.cartRow}>
              <div style={styles.cartEmoji}>{["🍛", "🫓", "🥛"][i]}</div>
              <div style={{ flex: 1 }}>
                <div style={styles.cartName}>{item.name}</div>
                <div style={styles.cartPrice}>{total[i]}</div>
              </div>
              <div style={styles.qtyControl}>
                <button
                  style={styles.qtyBtn}
                  onClick={() =>
                    setQuantities((q) => q.map((v, j) => (j === i ? Math.max(0, v - 1) : v)))
                  }
                >
                  −
                </button>
                <span style={styles.qtyNum}>{quantities[i]}</span>
                <button
                  style={styles.qtyBtn}
                  onClick={() =>
                    setQuantities((q) => q.map((v, j) => (j === i ? v + 1 : v)))
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.cartSummary}>
          <div style={styles.summaryTitle}>Order Summary</div>
          <div style={styles.summaryRow}><span>Subtotal</span><span>₹860</span></div>
          <div style={styles.summaryRow}><span>Delivery</span><span style={{ color: "#4ade80" }}>FREE</span></div>
          <div style={styles.summaryRow}><span>Taxes (5%)</span><span>₹43</span></div>
          <div style={styles.summaryRow}><span>Discount</span><span style={{ color: "#f97316" }}>−₹86</span></div>
          <div style={styles.summaryDivider} />
          <div style={{ ...styles.summaryRow, ...styles.summaryTotal }}><span>Total</span><span>₹817</span></div>
          <div style={styles.promoWrap}>
            <input style={styles.promoInput} placeholder="Promo code" />
            <button style={styles.promoBtn}>Apply</button>
          </div>
          <button style={styles.checkoutBtn}>🛒 Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div style={styles.section}>
      <SectionHeader title="My Profile" sub="Manage your account details" />
      <div style={styles.profileGrid}>
        <div style={styles.card}>
          <div style={styles.formTitle}>Personal Information</div>
          {[
            { label: "Full Name", val: "Arjun Rajan" },
            { label: "Email", val: "arjun@email.com" },
            { label: "Phone", val: "+91 98765 43210" },
            { label: "Date of Birth", val: "March 12, 1995" },
          ].map((f, i) => (
            <div key={i} style={styles.formField}>
              <label style={styles.formLabel}>{f.label}</label>
              <input style={styles.formInput} defaultValue={f.val} />
            </div>
          ))}
          <button style={styles.saveBtn}>Save Changes</button>
        </div>
        <div style={styles.card}>
          <div style={styles.formTitle}>Delivery Addresses</div>
          {[
            { tag: "Home", addr: "14/B, Rose Garden, Tirur, Kerala 676101" },
            { tag: "Work", addr: "Zara Tech Park, Malappuram, Kerala 676505" },
          ].map((a, i) => (
            <div key={i} style={styles.addressCard}>
              <span style={styles.addrTag}>{a.tag}</span>
              <p style={styles.addrText}>{a.addr}</p>
              <button style={styles.editAddrBtn}>Edit</button>
            </div>
          ))}
          <button style={styles.addPayBtn}>+ Add Address</button>
          <div style={{ marginTop: 24 }}>
            <div style={styles.formTitle}>Food Preferences</div>
            <div style={styles.prefTags}>
              {["Non-Veg", "Spicy", "No Onion", "Gluten-free ok"].map((p, i) => (
                <span key={i} style={styles.prefTag}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, sub }) {
  return (
    <div style={styles.sectionHeader}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      <p style={styles.sectionSub}>{sub}</p>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0a",
    fontFamily: "'DM Sans', sans-serif",
    color: "#e8e0d5",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: 64,
    background: "#111",
    borderBottom: "1px solid #222",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: { display: "flex", alignItems: "baseline", gap: 6 },
  logoIcon: { fontSize: 22 },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 900,
    color: "#f97316",
    letterSpacing: 4,
  },
  logoSub: { fontSize: 11, letterSpacing: 3, color: "#666", textTransform: "uppercase" },
  nav: { display: "flex", gap: 4 },
  navBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 18px",
    background: "transparent",
    border: "1px solid transparent",
    borderRadius: 8,
    color: "#888",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s",
  },
  navBtnActive: {
    background: "#1a1a1a",
    border: "1px solid #f97316",
    color: "#f97316",
  },
  navIcon: { fontSize: 16 },
  headerRight: { position: "relative", cursor: "pointer" },
  notifBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    background: "#f97316",
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    width: 16,
    height: 16,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  body: { display: "flex", flex: 1, overflow: "hidden" },
  sidebar: {
    width: 240,
    minHeight: "calc(100vh - 64px)",
    background: "#111",
    borderRight: "1px solid #1e1e1e",
    padding: "24px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto",
  },
  avatarWrap: { position: "relative", marginBottom: 12 },
  avatarRing: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f97316, #8b5cf6)",
    padding: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#1a1a1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: 700,
    color: "#f97316",
    fontFamily: "'Playfair Display', serif",
  },
  onlineDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#4ade80",
    border: "2px solid #111",
  },
  custName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 17,
    fontWeight: 700,
    color: "#f0e8de",
    textAlign: "center",
  },
  custHandle: { fontSize: 12, color: "#555", marginTop: 2, marginBottom: 10 },
  tierBadge: {
    background: "linear-gradient(135deg, #78350f, #d97706)",
    color: "#fef3c7",
    fontSize: 11,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 20,
    marginBottom: 16,
  },
  profileStats: {
    display: "flex",
    width: "100%",
    background: "#161616",
    borderRadius: 12,
    padding: "12px 0",
    marginBottom: 16,
    border: "1px solid #222",
  },
  statBox: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center" },
  statNum: { fontSize: 16, fontWeight: 700, color: "#f97316" },
  statLabel: { fontSize: 10, color: "#555", marginTop: 2 },
  statDivider: { width: 1, background: "#222" },
  profileInfo: { width: "100%", marginBottom: 16 },
  infoRow: { display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid #1a1a1a" },
  infoIcon: { fontSize: 13, width: 18, textAlign: "center" },
  infoVal: { fontSize: 11, color: "#888" },
  loyaltyWrap: { width: "100%", background: "#161616", borderRadius: 12, padding: 14, border: "1px solid #222" },
  loyaltyLabel: { display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12, color: "#888" },
  loyaltyPts: { color: "#f97316", fontWeight: 600 },
  progressTrack: { background: "#222", borderRadius: 4, height: 6, overflow: "hidden" },
  progressBar: { height: "100%", background: "linear-gradient(90deg, #f97316, #8b5cf6)", borderRadius: 4 },
  loyaltyNote: { fontSize: 10, color: "#555", marginTop: 6, textAlign: "right" },
  main: { flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" },
  scrollerOuter: {
    background: "#111",
    borderBottom: "1px solid #1e1e1e",
    padding: "10px 24px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    overflow: "hidden",
  },
  scrollerTag: { fontSize: 10, letterSpacing: 2, color: "#f97316", whiteSpace: "nowrap", fontWeight: 600 },
  scrollerTrack: { flex: 1, overflow: "hidden" },
  scrollerInner: {
    display: "flex",
    gap: 12,
    animation: "scrollLeft 28s linear infinite",
    width: "max-content",
  },
  dishCard: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#1a1a1a",
    borderRadius: 8,
    padding: "6px 14px",
    border: "1px solid #2a2a2a",
    whiteSpace: "nowrap",
  },
  dishEmoji: { fontSize: 20 },
  dishInfo: { display: "flex", flexDirection: "column", gap: 2 },
  dishName: { fontSize: 12, color: "#e8e0d5", fontWeight: 500 },
  dishTag: { fontSize: 9, color: "#fff", padding: "1px 6px", borderRadius: 10, fontWeight: 600, width: "fit-content" },
  tabContent: { flex: 1, padding: "24px 28px", animation: "fadeUp 0.3s ease" },
  section: {},
  sectionHeader: { marginBottom: 20 },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#f0e8de" },
  sectionSub: { fontSize: 12, color: "#555", marginTop: 2 },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 },
  card: {
    background: "#141414",
    border: "1px solid #222",
    borderRadius: 14,
    padding: 18,
    animation: "fadeUp 0.3s ease both",
  },
  newOrderCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "1px dashed #333",
    color: "#555",
    fontSize: 32,
    minHeight: 140,
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  orderId: { fontSize: 13, fontWeight: 600, color: "#a0a0a0" },
  statusChip: { fontSize: 12, padding: "3px 10px", borderRadius: 20, fontWeight: 600 },
  orderItems: { fontSize: 13, color: "#888", marginBottom: 12 },
  cardBottom: { display: "flex", justifyContent: "space-between", marginBottom: 12 },
  orderDate: { fontSize: 11, color: "#555" },
  orderTotal: { fontSize: 15, fontWeight: 700, color: "#f97316" },
  reorderBtn: {
    width: "100%",
    padding: "8px",
    background: "transparent",
    border: "1px solid #333",
    borderRadius: 8,
    color: "#888",
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s",
  },
  paymentGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  creditCard: {
    background: "linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)",
    border: "1px solid #f97316",
    borderRadius: 18,
    padding: 24,
    height: 180,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 0 40px #f9731620",
  },
  cardChip: { fontSize: 24, color: "#f97316" },
  cardNum: { fontSize: 18, letterSpacing: 3, color: "#f0e8de", fontWeight: 600 },
  cardMeta: { display: "flex", alignItems: "flex-end", gap: 20 },
  cardMetaLabel: { fontSize: 9, color: "#888", letterSpacing: 1 },
  cardMetaVal: { fontSize: 13, color: "#e8e0d5", fontWeight: 500 },
  cardNetwork: { marginLeft: "auto", fontSize: 18, fontWeight: 900, color: "#f97316", fontStyle: "italic" },
  paymentList: { display: "flex", flexDirection: "column", gap: 10 },
  payMethod: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#141414",
    border: "1px solid #222",
    borderRadius: 12,
    padding: "12px 16px",
  },
  payMethodName: { fontSize: 13, fontWeight: 600, color: "#e8e0d5" },
  payMethodSub: { fontSize: 11, color: "#555", marginTop: 2 },
  activeIndicator: { fontSize: 11, color: "#4ade80", fontWeight: 600 },
  addPayBtn: {
    width: "100%",
    padding: "10px",
    background: "transparent",
    border: "1px dashed #333",
    borderRadius: 10,
    color: "#555",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  txnRow: { display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid #1a1a1a" },
  txnIcon: { fontSize: 20 },
  txnId: { fontSize: 13, fontWeight: 600, color: "#a0a0a0" },
  txnMeta: { fontSize: 11, color: "#555", marginTop: 2 },
  txnAmount: { fontSize: 15, fontWeight: 700, color: "#f97316", marginBottom: 4 },
  cartWrap: { display: "grid", gridTemplateColumns: "1fr 360px", gap: 24 },
  cartItems: { display: "flex", flexDirection: "column", gap: 12 },
  cartRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: "#141414",
    border: "1px solid #222",
    borderRadius: 14,
    padding: "14px 18px",
  },
  cartEmoji: { fontSize: 30, width: 44, textAlign: "center" },
  cartName: { fontSize: 14, fontWeight: 600, color: "#e8e0d5" },
  cartPrice: { fontSize: 13, color: "#f97316", marginTop: 3 },
  qtyControl: { display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "1px solid #333",
    background: "#1e1e1e",
    color: "#e8e0d5",
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
  },
  qtyNum: { fontSize: 15, fontWeight: 700, color: "#f97316", minWidth: 20, textAlign: "center" },
  cartSummary: {
    background: "#141414",
    border: "1px solid #222",
    borderRadius: 14,
    padding: 22,
    height: "fit-content",
    position: "sticky",
    top: 80,
  },
  summaryTitle: { fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#f0e8de", marginBottom: 16 },
  summaryRow: { display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888", marginBottom: 10 },
  summaryDivider: { height: 1, background: "#222", margin: "12px 0" },
  summaryTotal: { fontSize: 16, fontWeight: 700, color: "#f0e8de" },
  promoWrap: { display: "flex", gap: 8, marginTop: 14, marginBottom: 14 },
  promoInput: {
    flex: 1,
    background: "#0d0d0d",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    padding: "8px 12px",
    color: "#e8e0d5",
    fontSize: 12,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
  },
  promoBtn: {
    background: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: 8,
    color: "#888",
    fontSize: 12,
    padding: "8px 12px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  checkoutBtn: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 20px #f9731640",
  },
  profileGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 },
  formTitle: { fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#f0e8de", marginBottom: 16 },
  formField: { marginBottom: 14 },
  formLabel: { display: "block", fontSize: 11, color: "#555", marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" },
  formInput: {
    width: "100%",
    background: "#0d0d0d",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    padding: "10px 14px",
    color: "#e8e0d5",
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
  },
  saveBtn: {
    marginTop: 8,
    padding: "10px 24px",
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  addressCard: {
    background: "#0d0d0d",
    border: "1px solid #222",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    position: "relative",
  },
  addrTag: {
    fontSize: 10,
    fontWeight: 700,
    background: "#f97316",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: 10,
    letterSpacing: 1,
  },
  addrText: { fontSize: 12, color: "#888", marginTop: 6, marginBottom: 6 },
  editAddrBtn: {
    fontSize: 11,
    color: "#f97316",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  prefTags: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 },
  prefTag: {
    fontSize: 11,
    background: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: 20,
    padding: "4px 12px",
    color: "#888",
  },
};