import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  "All",
  "Corporate",
  "Weddings",
  "Gala Dinners",
  "Private Parties",
  "Outdoor Events",
];

const GALLERY_ITEMS = [
  {
    id: 1,
    category: "Weddings",
    title: "Ivory Elegance",
    subtitle: "Garden reception for 250 guests",
    aspect: "tall",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Corporate",
    title: "The Summit Dinner",
    subtitle: "Executive boardroom dining",
    aspect: "wide",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Gala Dinners",
    title: "Midnight Opulence",
    subtitle: "Charity gala, 400 covers",
    aspect: "square",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Outdoor Events",
    title: "Golden Hour Feast",
    subtitle: "Sunset terrace buffet",
    aspect: "tall",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Private Parties",
    title: "50th Soirée",
    subtitle: "Intimate birthday celebration",
    aspect: "square",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "Weddings",
    title: "Coastal Vows",
    subtitle: "Seafront reception, 180 guests",
    aspect: "wide",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    category: "Corporate",
    title: "Product Launch",
    subtitle: "Brand dinner for 120 VIPs",
    aspect: "square",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    category: "Gala Dinners",
    title: "La Belle Époque",
    subtitle: "Heritage ballroom experience",
    aspect: "tall",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
  },
];

const STATS = [
  { number: "1,200+", label: "Events Catered" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "14", label: "Years Experience" },
  { number: "42", label: "Industry Awards" },
];

function GalleryCard({ item, onClick, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  const heightMap = {
    tall: "320px",
    wide: "220px",
    square: "260px",
  };

  return (
    <div
      ref={ref}
      onClick={() => onClick(item)}
      className="gallery-card"
      style={{
        gridColumn: item.aspect === "wide" ? "span 2" : "span 1",
        height: heightMap[item.aspect],
backgroundImage: `url(${item.image})`,
backgroundSize: "cover",
backgroundPosition: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease ${index * 0.05}s`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.1))",
        }}
      />

      <div className="card-info">
        <span className="category-text">{item.category}</span>

        <h3>{item.title}</h3>

        <p>{item.subtitle}</p>
      </div>

      <div className="expand-btn">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <path d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" />
        </svg>
      </div>
    </div>
  );
}

function Modal({ item, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-image"
style={{
  backgroundImage: `url(${item.image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}}        >
          <div className="modal-content">
            <span>{item.category}</span>

            <h2>{item.title}</h2>

            <p>{item.subtitle}</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-details">
          {[
            ["Guests", "180–400"],
            ["Duration", "4–8 hrs"],
            ["Style", "Premium"],
          ].map(([k, v]) => (
            <div key={k}>
              <small>{k}</small>
              <h4>{v}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CateringGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(
          (i) => i.category === activeCategory
        );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          font-family:'Inter',sans-serif;
          background:#050505;
          color:white;
        }

        .gallery-grid{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:18px;
        }

        .gallery-card{
          position:relative;
          overflow:hidden;
          border-radius:24px;
          cursor:pointer;
          transition:all .35s ease;
          border:1px solid rgba(255,255,255,.06);
        }

        .gallery-card:hover{
          transform:translateY(-6px);
          box-shadow:0 20px 50px rgba(0,0,0,.55);
        }

        .card-info{
          position:absolute;
          bottom:0;
          left:0;
          right:0;
          z-index:2;
          padding:22px;
        }

        .category-text{
          display:inline-block;
          color:rgba(255,255,255,.75);
          font-size:12px;
          margin-bottom:10px;
          letter-spacing:.5px;
        }

        .card-info h3{
          color:white;
          font-size:24px;
          margin-bottom:8px;
          font-weight:600;
        }

        .card-info p{
          color:rgba(255,255,255,.8);
          font-size:14px;
        }

        .expand-btn{
          position:absolute;
          top:16px;
          right:16px;
          width:38px;
          height:38px;
          border-radius:50%;
          background:rgba(255,255,255,.08);
          border:1px solid rgba(255,255,255,.1);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:3;
          backdrop-filter:blur(10px);
        }

        .filter-scroll{
          display:flex;
          gap:12px;
          overflow-x:auto;
          padding-bottom:6px;
        }

        .filter-btn{
          border:none;
          background:#111111;
          border:1px solid rgba(255,255,255,.08);
          color:#d1d5db;
          padding:12px 20px;
          border-radius:999px;
          cursor:pointer;
          font-size:14px;
          transition:all .25s ease;
        }

        .filter-btn.active{
          background:white;
          color:black;
        }

        .filter-btn:hover{
          background:white;
          color:black;
        }

        .modal-overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.82);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:999;
          padding:20px;
          backdrop-filter:blur(8px);
        }

        .modal-box{
          background:#111111;
          width:100%;
          max-width:760px;
          border-radius:28px;
          overflow:hidden;
          border:1px solid rgba(255,255,255,.08);
        }

        .modal-image{
          position:relative;
          height:320px;
          display:flex;
          align-items:flex-end;
        }

        .modal-content{
          padding:30px;
          color:white;
          z-index:2;
        }

        .modal-content h2{
          font-size:42px;
          margin:10px 0;
        }

        .close-btn{
          position:absolute;
          top:16px;
          right:16px;
          width:40px;
          height:40px;
          border:none;
          border-radius:50%;
          background:#1f1f1f;
          color:white;
          font-size:22px;
          cursor:pointer;
        }

        .modal-details{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:20px;
          padding:30px;
        }

        .modal-details small{
          color:#9ca3af;
          display:block;
          margin-bottom:8px;
        }

        @media(max-width:900px){
          .gallery-grid{
            grid-template-columns:repeat(2,1fr);
          }
        }

        @media(max-width:650px){
          .gallery-grid{
            grid-template-columns:1fr;
          }

          .gallery-grid > *{
            grid-column:span 1 !important;
          }

          .modal-details{
            grid-template-columns:1fr;
          }
        }
      `}</style>

      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "40px",
            flexWrap: "wrap",
            marginBottom: "60px",
          }}
        >
          <div>
            <p
              style={{
                color: "#9ca3af",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            >
              OUR PORTFOLIO
            </p>

            <h1
              style={{
                fontSize: "clamp(42px,6vw,76px)",
                lineHeight: 1.1,
                fontWeight: 700,
              }}
            >
              Crafted Event
              <br />
              Experiences
            </h1>
          </div>

          <p
            style={{
              maxWidth: "420px",
              color: "#9ca3af",
              lineHeight: 1.8,
              fontSize: "16px",
            }}
          >
            Premium catering experiences designed for
            weddings, corporate gatherings, private
            celebrations and luxury events.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "18px",
            marginBottom: "60px",
          }}
        >
          {STATS.map((item) => (
            <div
              key={item.label}
              style={{
                background: "#111111",
                padding: "30px",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,.06)",
              }}
            >
              <h2
                style={{
                  fontSize: "42px",
                  marginBottom: "10px",
                }}
              >
                {item.number}
              </h2>

              <p style={{ color: "#9ca3af" }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "34px" }}>
          <div className="filter-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {filtered.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={i}
              onClick={setSelectedItem}
            />
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto 80px",
          padding: "70px 30px",
          background: "#111111",
          borderRadius: "32px",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <p
          style={{
            color: "#9ca3af",
            marginBottom: "16px",
          }}
        >
          PLAN YOUR EVENT
        </p>

        <h2
          style={{
            fontSize: "clamp(34px,5vw,58px)",
            marginBottom: "20px",
          }}
        >
          Let's Create Something Amazing
        </h2>

        <p
          style={{
            maxWidth: "620px",
            margin: "0 auto 34px",
            color: "#9ca3af",
            lineHeight: 1.8,
          }}
        >
          We craft unforgettable dining experiences
          tailored to your occasion with exceptional
          service and premium cuisine.
        </p>

        <button
          style={{
            background: "white",
            color: "black",
            border: "none",
            padding: "16px 34px",
            borderRadius: "999px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          Request Consultation
        </button>
      </section>

      <footer
        style={{
          padding: "30px",
          textAlign: "center",
          color: "#9ca3af",
          borderTop: "1px solid rgba(255,255,255,.06)",
        }}
      >
        Maison & Co. — Premium Catering Experiences
      </footer>

      <Modal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}