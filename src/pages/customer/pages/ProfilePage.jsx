import { styles } from "../styles";
import SectionHeader from "../components/SectionHeader";

export default function ProfilePage() {
  return (
    <div style={styles.section}>
      <SectionHeader title="My Profile" sub="Manage your account details" />

      <div style={styles.profileGrid}>
        {/* Personal Information */}
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

        {/* Addresses & Preferences */}
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