export default function Navbar() {
  return (
      <nav style={styles.nav}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
              <path
                d="M18 2 C10 2 4 8 4 14 C4 20 10 26 18 26 C26 26 32 20 32 14"
                stroke="#c8821e"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M10 10 Q18 4 26 10"
                stroke="#c8821e"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <div style={styles.logoText}>
              <span style={styles.logoLe}>Le </span>
              <span style={styles.logoKochi}>Kochi</span>
            </div>

            <div style={styles.logoSub}>
              — Cafe &amp; Kitchen —
            </div>
          </div>
        </div>

        <button style={styles.menuBtn} aria-label="Menu">
          <span style={styles.menuLine} />
          <span style={styles.menuLine} />
          <span style={styles.menuLine} />
        </button>
      </nav>
  );
}

const styles = {

  nav: {
      position: "sticky",
  top: 0,
  zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px 12px",
    borderBottom: "1px solid rgba(200,130,30,0.15)",
    background: "#0f1a0f",
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  logoIcon: {
    lineHeight: 0,
  },

  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 900,
    lineHeight: 1.1,
  },

  logoLe: {
    color: "#c8821e",
  },

  logoKochi: {
    color: "#f5efe6",
  },

  logoSub: {
    fontSize: 9,
    color: "#c8821e",
    letterSpacing: 1,
    marginTop: 1,
  },

  menuBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    padding: 4,
  },

  menuLine: {
    display: "block",
    width: 22,
    height: 2,
    background: "#c8821e",
    borderRadius: 2,
  },
};