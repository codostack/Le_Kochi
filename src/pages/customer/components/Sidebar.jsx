import { styles } from "../styles";

function InfoRow({ icon, val }) {
  return (
    <div style={styles.infoRow}>
      <span style={styles.infoIcon}>{icon}</span>
      <span style={styles.infoVal}>{val}</span>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      {/* Avatar */}
      <div style={styles.avatarWrap}>
        <div style={styles.avatarRing}>
          <div style={styles.avatar}>AR</div>
        </div>
        <div style={styles.onlineDot} />
      </div>

      <h2 style={styles.custName}>Arjun Rajan</h2>
      <p style={styles.custHandle}>@arjun.rajan</p>

      <div style={styles.tierBadge}>⭐ Gold Member</div>

      {/* Stats */}
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

      {/* Info */}
      <div style={styles.profileInfo}>
        <InfoRow icon="📞" val="+91 98765 43210" />
        <InfoRow icon="📧" val="arjun@email.com" />
        <InfoRow icon="📍" val="Tirur, Kerala" />
        <InfoRow icon="🎂" val="Member since Jan 2024" />
      </div>

      {/* Loyalty */}
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
  );
}