import { styles } from "../styles";
import SectionHeader from "../components/SectionHeader";

export default function PaymentPage() {
  return (
    <div style={styles.section}>
      <SectionHeader title="Payment Methods" sub="Manage your cards & wallets" />

      <div style={styles.paymentGrid}>
        {/* Credit Card */}
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

        {/* Payment Methods List */}
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

      {/* Transaction History */}
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
              <div
                style={{
                  ...styles.statusChip,
                  background: t.status === "Success" ? "#1a3a2a" : "#3a2e0a",
                  color: t.status === "Success" ? "#4ade80" : "#facc15",
                  fontSize: 11,
                }}
              >
                {t.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}