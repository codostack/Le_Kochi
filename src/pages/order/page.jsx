export default function OrderPage() {
  const items = [
    {
      name: "Masala Dosa",
      price: "$10",
    },
    {
      name: "Chicken Biryani",
      price: "$15",
    },
    {
      name: "Filter Coffee",
      price: "$5",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1a0f",
        color: "#f5efe6",
        padding: 20,
      }}
    >
      <h1
        style={{
          color: "#c8821e",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Order Online
      </h1>

      {items.map((item) => (
        <div
          key={item.name}
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: 20,
            borderRadius: 12,
            marginBottom: 15,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{item.name}</span>
          <span>{item.price}</span>
        </div>
      ))}
    </div>
  );
}