export default function WhatsappPage() {
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
      <h1 style={{ color: "#25D366", marginBottom: 10 }}>
        WhatsApp
      </h1>

      <p style={{ marginBottom: 20 }}>
        Chat with us instantly
      </p>

      <a
        href="https://wa.me/19054562015"
        target="_blank"
        rel="noreferrer"
        style={{
          background: "#25D366",
          color: "#000",
          padding: "14px 24px",
          borderRadius: 10,
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Open WhatsApp
      </a>
    </div>
  );
}