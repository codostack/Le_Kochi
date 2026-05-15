export default function DirectionsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1a0f",
        color: "#f5efe6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#c8821e", marginBottom: 10 }}>
        Directions
      </h1>

      <p style={{ marginBottom: 20 }}>
        Open location in Google Maps
      </p>

      <a
        href="https://www.google.com/maps"
        target="_blank"
        rel="noreferrer"
        style={{
          background: "#c8821e",
          color: "#000",
          padding: "14px 24px",
          borderRadius: 10,
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Open Maps
      </a>
    </div>
  );
}