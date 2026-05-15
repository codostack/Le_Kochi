import { useState } from "react";

const foodImage =
  "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop";

const services = [
  {
    title: "Corporate\nCatering",
    icon: (
      <svg viewBox="0 0 40 40" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="12" r="5" stroke="#C9A84C" strokeWidth="1.8" />
        <path d="M12 30c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 18h20" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Private\nEvents",
    icon: (
      <svg viewBox="0 0 40 40" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="15" r="4" stroke="#C9A84C" strokeWidth="1.8" />
        <circle cx="26" cy="15" r="4" stroke="#C9A84C" strokeWidth="1.8" />
        <path d="M8 30c0-4 3-7 6-7" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M32 30c0-4-3-7-6-7" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Birthday\nParties",
    icon: (
      <svg viewBox="0 0 40 40" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="18" width="24" height="12" rx="2" stroke="#C9A84C" strokeWidth="1.8" />
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
      <svg viewBox="0 0 40 40" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="20" r="6" stroke="#C9A84C" strokeWidth="1.8" />
        <circle cx="25" cy="20" r="6" stroke="#C9A84C" strokeWidth="1.8" />
      </svg>
    ),
  },
];

export default function CateringPage() {
  const [pressed, setPressed] = useState(false);

  return (
    <div style={styles.pageWrapper}>
      <style>
        {`
          .app-container {
            width: 100%;
            max-width: 390px;
            background: #050505;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
          }

          .image-box {
            width: 100%;
            flex-grow: 1;
            position: relative;
            margin-top: 20px;
          }

          .image-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          /* Desktop Screen-Fit Adjustments */
          @media (min-width: 1024px) {
            .app-container {
              max-width: 1200px;
              height: 80vh; /* Fits within the screen height */
              min-height: 600px;
              flex-direction: row;
              border-radius: 30px;
              box-shadow: 0 30px 60px rgba(0,0,0,0.8);
            }

            .content-side {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: 0 80px !important;
              text-align: left !important;
            }

            .image-box {
              flex: 1.2;
              margin-top: 0;
            }

            .services-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 40px !important;
              margin-top: 50px !important;
            }

            .service-item {
              flex-direction: row !important;
              align-items: center !important;
              gap: 15px;
              text-align: left !important;
            }
          }
        `}
      </style>

      <div className="app-container">
        {/* TEXT CONTENT */}
        <div className="content-side" style={styles.contentSide}>
          <h1 style={styles.heading}>Catering & Events</h1>
          <h2 style={styles.subheading}>For Every Occasion</h2>
          <p style={styles.description}>
            From small gatherings to corporate events, we serve authentic Kerala
            flavours that leave a lasting impression.
          </p>

          <div className="services-grid" style={styles.servicesGrid}>
            {services.map((s) => (
              <div key={s.title} className="service-item" style={styles.serviceItem}>
                <div style={styles.iconBox}>{s.icon}</div>
                <span style={styles.serviceText}>{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE BOX */}
        <div className="image-box">
          <img src={foodImage} alt="Catering" />
          <div style={styles.overlay} />
          <button
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            style={{
              ...styles.btn,
              transform: pressed ? "scale(0.95)" : "scale(1)",
            }}
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#0d0d0d",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "sans-serif",
  },
  contentSide: {
    padding: "40px 24px 0",
    textAlign: "center",
  },
  heading: {
    color: "#D2A74B",
    fontSize: "26px",
    textTransform: "uppercase",
    margin: 0,
  },
  subheading: {
    color: "#fff",
    fontSize: "18px",
    marginTop: "10px",
    fontWeight: "600",
  },
  description: {
    color: "#ccc",
    fontSize: "15px",
    lineHeight: "1.6",
    marginTop: "15px",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    marginTop: "30px",
  },
  serviceItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconBox: {
    marginBottom: "8px",
  },
  serviceText: {
    color: "#fff",
    fontSize: "12px",
    whiteSpace: "pre-line",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
  },
btn: {
  position: "absolute",
  bottom: window.innerWidth <= 468 ? "150px" : "20px",
  left: "15px",
  backgroundColor: "#a1720b",
  border: "none",
  padding: "10px 25px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "transform 0.1s ease",
},
};