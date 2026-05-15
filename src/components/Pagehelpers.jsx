import { colors, fonts, shell, sectionTitleStyle, titleBarStyle, subStyle } from "./theme";

export function PageShell({ children }) {
  return <div style={shell}>{children}</div>;
}

export function SectionTitle({ children }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <h1 style={sectionTitleStyle}>{children}</h1>
      <div style={titleBarStyle} />
    </div>
  );
}

export function PageSub({ children }) {
  return <p style={subStyle}>{children}</p>;
}

export function ActionPage({ emoji, color, title, sub, children }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "65vh",
      padding: "40px 28px",
      textAlign: "center",
    }}>
      <div style={{
        width: 90,
        height: 90,
        borderRadius: "50%",
        background: `${color}22`,
        border: `2px solid ${color}55`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}>
        <span style={{ fontSize: 40 }}>{emoji}</span>
      </div>
      <h2 style={{
        fontFamily: fonts.serif,
        fontSize: 26,
        fontWeight: 700,
        color,
        marginBottom: 8,
      }}>{title}</h2>
      <p style={{
        fontSize: 14,
        color: colors.textMuted,
        marginBottom: 30,
        lineHeight: 1.6,
        maxWidth: 280,
      }}>{sub}</p>
      <div style={{ width: "100%", maxWidth: 300, display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </div>
    </div>
  );
}

export function ActionBtn({ href, bg, color: textColor = "#1a0e00", children, onClick }) {
  const base = {
    display: "block",
    padding: "14px 0",
    background: bg || colors.gold,
    borderRadius: 12,
    color: textColor,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    textAlign: "center",
    fontFamily: fonts.sans,
    width: "100%",
  };
  if (href) return <a href={href} target="_blank" rel="noreferrer" style={base}>{children}</a>;
  return <button style={base} onClick={onClick}>{children}</button>;
}