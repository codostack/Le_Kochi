import { styles } from "../styles";

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

const tagColor = {
  "New": "#f97316",
  "Signature": "#8b5cf6",
  "Chef's Special": "#059669",
};

export default function DishScroller() {
  return (
    <div style={styles.scrollerOuter}>
      <span style={styles.scrollerTag}>✦ TODAY'S HIGHLIGHTS</span>
      <div style={styles.scrollerTrack}>
        <div style={styles.scrollerInner}>
          {[...dishes, ...dishes].map((d, i) => (
            <div key={i} style={styles.dishCard}>
              <div style={styles.dishEmoji}>{d.emoji}</div>
              <div style={styles.dishInfo}>
                <span style={styles.dishName}>{d.name}</span>
                <span style={{ ...styles.dishTag, background: tagColor[d.tag] }}>
                  {d.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}