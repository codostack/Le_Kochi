export const colors = {
  bg: "#0f1a0f",
  bgDeep: "#0a120a",
  bgCard: "rgba(255,255,255,0.04)",
  gold: "#c8821e",
  goldLight: "#e8a030",
  goldSubtle: "rgba(200,130,30,0.1)",
  goldBorder: "rgba(200,130,30,0.2)",
  goldBorderMid: "rgba(200,130,30,0.3)",
  text: "#f5efe6",
  textMuted: "rgba(245,239,230,0.6)",
  textFaint: "rgba(245,239,230,0.4)",
  cardBorder: "rgba(255,255,255,0.07)",
  red: "#a93226",
  green: "#25D366",
};

export const fonts = {
  serif: "'Playfair Display', serif",
  sans: "'DM Sans', sans-serif",
};

export const shell = {
  padding: "28px 24px",
};

export const sectionTitleStyle = {
  fontFamily: fonts.serif,
  fontSize: 28,
  fontWeight: 900,
  color: colors.gold,
  letterSpacing: 3,
  textAlign: "center",
};

export const titleBarStyle = {
  width: 48,
  height: 2,
  background: colors.gold,
  margin: "8px auto 16px",
  borderRadius: 2,
};

export const subStyle = {
  fontSize: 14,
  color: colors.textMuted,
  textAlign: "center",
  marginBottom: 28,
};

export const cardStyle = {
  background: colors.bgCard,
  border: `1px solid ${colors.cardBorder}`,
  borderRadius: 14,
  padding: "14px 16px",
};

export const goldTagStyle = {
  fontSize: 10,
  padding: "2px 8px",
  borderRadius: 20,
  background: colors.goldSubtle,
  color: colors.gold,
  border: `1px solid ${colors.goldBorderMid}`,
};

export const ctaBtnStyle = {
  width: "100%",
  padding: "14px 0",
  background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
  border: "none",
  borderRadius: 12,
  color: "#1a0e00",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: fonts.sans,
};

export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  a { text-decoration: none; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;