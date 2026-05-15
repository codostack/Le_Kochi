import { useState } from "react";
import { styles } from "../styles";
import SectionHeader from "../components/SectionHeader";

const initialItems = [
  { name: "Spicy Lamb Biryani", emoji: "🍛", qty: 1, price: 380 },
  { name: "Malabar Parotta x3", emoji: "🫓", qty: 3, price: 120 },
  { name: "Mango Lassi", emoji: "🥛", qty: 2, price: 90 },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);

  const updateQty = (index, delta) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, qty: Math.max(0, item.qty + delta) } : item
      )
    );
  };

  const activeItems = items.filter((item) => item.qty > 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const taxes = Math.round(subtotal * 0.05);
  const discount = Math.round(subtotal * 0.1);
  const total = subtotal + taxes - discount;

  return (
    <div style={styles.section}>
      <SectionHeader title="Your Cart" sub={`${activeItems.length} item${activeItems.length !== 1 ? "s" : ""}`} />

      <div style={styles.cartWrap}>
        {/* Cart Items */}
        <div style={styles.cartItems}>
          {items.map((item, i) => (
            <div key={i} style={{ ...styles.cartRow, opacity: item.qty === 0 ? 0.4 : 1 }}>
              <div style={styles.cartEmoji}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={styles.cartName}>{item.name}</div>
                <div style={styles.cartPrice}>₹{item.price}</div>
              </div>
              <div style={styles.qtyControl}>
                <button style={styles.qtyBtn} onClick={() => updateQty(i, -1)}>−</button>
                <span style={styles.qtyNum}>{item.qty}</span>
                <button style={styles.qtyBtn} onClick={() => updateQty(i, +1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={styles.cartSummary}>
          <div style={styles.summaryTitle}>Order Summary</div>
          <div style={styles.summaryRow}><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div style={styles.summaryRow}><span>Delivery</span><span style={{ color: "#4ade80" }}>FREE</span></div>
          <div style={styles.summaryRow}><span>Taxes (5%)</span><span>₹{taxes}</span></div>
          <div style={styles.summaryRow}><span>Discount (10%)</span><span style={{ color: "#f97316" }}>−₹{discount}</span></div>
          <div style={styles.summaryDivider} />
          <div style={{ ...styles.summaryRow, ...styles.summaryTotal }}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>
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