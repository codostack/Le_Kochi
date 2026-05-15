import { useState } from "react";

const foodImage =
  "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop";

const services = [
  {
    title: "Corporate\nCatering",
    icon: (
      <svg
        viewBox="0 0 40 40"
        width="34"
        height="34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="12" r="5" stroke="#C9A84C" strokeWidth="1.8" />
        <path
          d="M12 30c0-4.4 3.6-8 8-8s8 3.6 8 8"
          stroke="#C9A84C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M10 18h20"
          stroke="#C9A84C"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Private\nEvents",
    icon: (
      <svg
        viewBox="0 0 40 40"
        width="34"
        height="34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="14" cy="15" r="4" stroke="#C9A84C" strokeWidth="1.8" />
        <circle cx="26" cy="15" r="4" stroke="#C9A84C" strokeWidth="1.8" />
        <path
          d="M8 30c0-4 3-7 6-7"
          stroke="#C9A84C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M32 30c0-4-3-7-6-7"
          stroke="#C9A84C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Birthday\nParties",
    icon: (
      <svg
        viewBox="0 0 40 40"
        width="34"
        height="34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8"
          y="18"
          width="24"
          height="12"
          rx="2"
          stroke="#C9A84C"
          strokeWidth="1.8"
        />
        <path d="M14 18v-4" stroke="#C9A84C" strokeWidth="1.8" />
        <path d="M20 18v-4" stroke="#C9A84C" strokeWidth="1.8" />
        <path d="M26 18v-4" stroke="#C9A84C" strokeWidth="1.8" />
        <circle cx="14" cy="12" r="1.5" fill="#C9A84C" />
        <circle cx="20" cy="12" r="1.5" fill="#C9A84C" />
        <circle cx="26" cy="12" r="1.5" fill="#C9A84C" />
      </svg>
    ),
  },
  {
    title: "Weddings\n& More",
    icon: (
      <svg
        viewBox="0 0 40 40"
        width="34"
        height="34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="20" r="6" stroke="#C9A84C" strokeWidth="1.8" />
        <circle cx="25" cy="20" r="6" stroke="#C9A84C" strokeWidth="1.8" />
      </svg>
    ),
  },
];

export default function CateringPage() {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          width: "390px",
          minHeight: "100vh",
          background: "#050505",
          position: "relative",
          overflow: "hidden",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Top Content */}
        <div
          style={{
            paddingTop: "50px",
            paddingLeft: "28px",
            paddingRight: "28px",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
{/* Heading */}
<h1
  style={{
    color: "#D2A74B",
    fontSize: "30px",
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.1,
    letterSpacing: "1px",
    textTransform: "uppercase",
    whiteSpace: "nowrap", // keeps text in one line
  }}
>
  Catering & Events
</h1>

          <h2
            style={{
              color: "#ffffff",
              marginTop: "8px",
              marginBottom: "22px",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            For Every Occasion
          </h2>

          <p
            style={{
              color: "#dddddd",
              fontSize: "16px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            From small gatherings to corporate
            <br />
            events, we serve authentic Kerala
            <br />
            flavours that leave a lasting impression.
          </p>
        </div>

        {/* Services */}
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "10px",
            padding: "0 18px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                {service.icon}
              </div>

              <span
                style={{
                  color: "#ffffff",
                  fontSize: "13px",
                  lineHeight: 1.4,
                  whiteSpace: "pre-line",
                }}
              >
                {service.title}
              </span>
            </div>
          ))}
        </div>

{/* Image Section */}
<div
  style={{
    marginTop: "28px",
    position: "relative",
    overflow: "hidden",
  }}
>
  <img
    src={foodImage}
    alt="Buffet Catering"

  />

  {/* Dark overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15))",
    }}
  />

  {/* Button on image bottom right */}
  <button
    onMouseDown={() => setPressed(true)}
    onMouseUp={() => setPressed(false)}
    onMouseLeave={() => setPressed(false)}
    style={{
      position: "absolute",
      bottom: "24px",
      left: "24px",
      background: "#D2A74B",
      border: "none",
      color: "#111",
      padding: "14px 26px",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: 700,
      cursor: "pointer",
      zIndex: 5,
    }}
  >
    ENQUIRE NOW
  </button>
</div>
      </div>
    </div>
  );
}