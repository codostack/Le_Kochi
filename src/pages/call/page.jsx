export default function CallPage() {
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
        Call Us
      </h1>

      <p style={{ marginBottom: 20 }}>
        Tap below to call Le Kochi
      </p>

      <a
        href="tel:9054562015"
        style={{
          background: "#c8821e",
          color: "#000",
          padding: "14px 24px",
          borderRadius: 10,
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Call Now
      </a>
    </div>
  );
}