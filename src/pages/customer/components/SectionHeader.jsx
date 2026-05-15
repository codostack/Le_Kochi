import { styles } from "../styles";

export default function SectionHeader({ title, sub }) {
  return (
    <div style={styles.sectionHeader}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      <p style={styles.sectionSub}>{sub}</p>
    </div>
  );
}