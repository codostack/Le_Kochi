import { styles, statusColor } from "../styles";
import SectionHeader from "../components/SectionHeader";

const orders = [
  { id: "#ORD-4821", items: "Butter Chicken, Naan x2", date: "May 14, 2026", status: "Delivered", total: "₹620" },
  { id: "#ORD-4790", items: "Prawn Moilee, Rice, Lassi", date: "May 10, 2026", status: "Delivered", total: "₹870" },
  { id: "#ORD-4763", items: "Paneer Tikka, Roti x3", date: "May 6, 2026", status: "Cancelled", total: "₹490" },
];

export default function OrdersPage() {
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