import { useState } from "react";

const FOREST = "#08140B";
const BLACK = "#000000";

const categories = ["All", "Food", "Ambience", "Kitchen", "Customers", "Branding"];

const galleryItems = [
  { id: 1, cat: "Food", label: "Grilled Sea Bass", sub: "Chef's Signature", size: "tall", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80" },
  { id: 2, cat: "Food", label: "Kerala Prawn Curry", sub: "Coastal Special", size: "wide", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80" },
  { id: 3, cat: "Food", label: "Malabar Biryani", sub: "Heritage Recipe", size: "normal", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&q=80" },
  { id: 4, cat: "Food", label: "Crab Masala", sub: "Ocean Fresh", size: "normal", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80" },
  { id: 5, cat: "Food", label: "Toddy Shop Fish Fry", sub: "Street Classic", size: "tall", img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80" },
  { id: 6, cat: "Food", label: "Appam & Stew", sub: "Morning Ritual", size: "normal", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" },
  { id: 7, cat: "Food", label: "Coconut Dessert", sub: "Sweet Ending", size: "wide", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80" },
  { id: 8, cat: "Food", label: "Spiced Chai", sub: "Kerala Blend", size: "normal", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80" },
  { id: 9, cat: "Ambience", label: "Waterfront Terrace", sub: "Al Fresco Dining", size: "wide", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" },
  { id: 10, cat: "Ambience", label: "Candlelit Interior", sub: "Evening Mood", size: "tall", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" },
  { id: 11, cat: "Ambience", label: "Table Setup", sub: "Fine Detail", size: "normal", img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80" },
  { id: 12, cat: "Ambience", label: "Garden Seating", sub: "Open Air", size: "normal", img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80" },
  { id: 13, cat: "Ambience", label: "Private Dining", sub: "Exclusive Space", size: "normal", img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80" },
  { id: 14, cat: "Kitchen", label: "Flame Grill", sub: "Live Fire", size: "wide", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80" },
  { id: 15, cat: "Kitchen", label: "Head Chef", sub: "Artisan at Work", size: "tall", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80" },
  { id: 16, cat: "Kitchen", label: "Fresh Spices", sub: "Kerala Pantry", size: "normal", img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80" },
  { id: 17, cat: "Kitchen", label: "Plating Art", sub: "Final Touch", size: "normal", img: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=600&q=80" },
  { id: 18, cat: "Kitchen", label: "Dough Craft", sub: "Handmade Daily", size: "normal", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80" },
  { id: 19, cat: "Kitchen", label: "Coconut Prep", sub: "Morning Ritual", size: "normal", img: "https://images.unsplash.com/photo-1612392166886-ee8475b03af2?w=600&q=80" },
  { id: 20, cat: "Kitchen", label: "Sauce Crafting", sub: "Secret Recipe", size: "normal", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80" },
  { id: 21, cat: "Customers", label: "Friends & Food", sub: "Good Times", size: "wide", img: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80" },
  { id: 22, cat: "Customers", label: "Family Feast", sub: "Sunday Ritual", size: "tall", img: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&q=80" },
  { id: 23, cat: "Customers", label: "Birthday Glow", sub: "Celebrations", size: "normal", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80" },
  { id: 24, cat: "Customers", label: "Couple's Evening", sub: "Date Night", size: "normal", img: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=80" },
  { id: 25, cat: "Customers", label: "Corporate Lunch", sub: "Business Dining", size: "normal", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80" },
  { id: 26, cat: "Customers", label: "Group Events", sub: "Big Moments", size: "normal", img: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=600&q=80" },
  { id: 27, cat: "Customers", label: "Solo Diner", sub: "Your Space", size: "normal", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
  { id: 28, cat: "Branding", label: "Le Kochi Logo Wall", sub: "Our Identity", size: "wide", img: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&q=80" },
  { id: 29, cat: "Branding", label: "Signature Cup", sub: "Coffee Culture", size: "tall", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80" },
  { id: 30, cat: "Branding", label: "Menu Cards", sub: "Crafted Details", size: "normal", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" },
  { id: 31, cat: "Branding", label: "Takeaway Pack", sub: "On the Go", size: "normal", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80" },
  { id: 32, cat: "Branding", label: "Table Decor", sub: "Signature Style", size: "normal", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
  { id: 33, cat: "Branding", label: "Delivery Bag", sub: "Anywhere, Anytime", size: "normal", img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80" },
  { id: 34, cat: "Branding", label: "Chef Whites", sub: "Team Pride", size: "normal", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
];

function GalleryCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);

  const gridClass =
    item.size === "tall"
      ? "row-span-2"
      : item.size === "wide"
      ? "col-span-2"
      : "";

  return (
    <div
      className={`relative overflow-hidden cursor-pointer ${gridClass}`}
      style={{ background: BLACK, minHeight: item.size === "tall" ? 380 : 185 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(item)}
    >
      {/* Image */}
      <img
        src={item.img}
        alt={item.label}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease",
          transform: hovered ? "scale(1.09)" : "scale(1)",
          filter: hovered ? "brightness(0.28)" : "brightness(0.68)",
        }}
      />

      {/* Category pill */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 10,
          background: FOREST,
          color: "#a3c9a8",
          fontFamily: "'DM Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "4px 10px",
          border: "1px solid #1e3020",
        }}
      >
        {item.cat}
      </div>

      {/* Hover reveal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "20px",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      >
        <div
          style={{
            width: 36,
            height: 2,
            background: "#a3c9a8",
            marginBottom: 10,
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.45s 0.08s ease",
          }}
        />
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            color: "#f5f0eb",
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
            transform: hovered ? "translateY(0)" : "translateY(14px)",
            transition: "transform 0.4s 0.05s ease",
          }}
        >
          {item.label}
        </p>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "#a3c9a8",
            marginTop: 5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "transform 0.4s 0.1s ease",
          }}
        >
          {item.sub}
        </p>
      </div>

      {/* Default bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)",
          padding: "28px 14px 12px",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 13,
            color: "#f5f0eb",
            margin: 0,
          }}
        >
          {item.label}
        </p>
      </div>
    </div>
  );
}

function Modal({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.94)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: 680,
          width: "100%",
          border: `1px solid ${FOREST}`,
        }}
      >
        <img
          src={item.img}
          alt={item.label}
          style={{ width: "100%", maxHeight: 480, objectFit: "cover", display: "block" }}
        />
        <div style={{ background: FOREST, padding: "20px 24px" }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "#a3c9a8",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              margin: "0 0 6px",
            }}
          >
            {item.cat} · {item.sub}
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              color: "#f5f0eb",
              margin: 0,
              fontWeight: 700,
            }}
          >
            {item.label}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 36,
            height: 36,
            background: "rgba(0,0,0,0.75)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#f5f0eb",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default function LeKochiGallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [modal, setModal] = useState(null);

  const filtered =
    activeTab === "All" ? galleryItems : galleryItems.filter((i) => i.cat === activeTab);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap"
        rel="stylesheet"
      />

      <div style={{ background: BLACK, minHeight: "100vh", color: "#f5f0eb" }}>
        {/* ── HERO HEADER ── */}
        <div style={{ textAlign: "center", padding: "72px 24px 40px" }}>
          

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(52px, 10vw, 100px)",
              fontWeight: 700,
              margin: 0,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "#f5f0eb",
            }}
          >
            Le Kochi
          </h1>

          {/* Decorative rule */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              margin: "22px auto 16px",
              maxWidth: 240,
            }}
          >
            <div style={{ flex: 1, height: 1, background: FOREST, border: "0.5px solid #1e3a20" }} />
            <div
              style={{
                width: 6,
                height: 6,
                background: "#a3c9a8",
                transform: "rotate(45deg)",
              }}
            />
            <div style={{ flex: 1, height: 1, background: FOREST, border: "0.5px solid #1e3a20" }} />
          </div>

          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "#3a4e3c",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Gallery
          </p>
        </div>

        {/* ── CATEGORY TABS ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
            padding: "0 24px 36px",
          }}
        >
          {categories.map((cat) => {
            const active = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "8px 22px",
                  background: active ? FOREST : "transparent",
                  color: active ? "#a3c9a8" : "#3a4e3c",
                  border: active ? "1px solid #1e3a20" : "1px solid #111811",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#6b9a6e";
                    e.currentTarget.style.borderColor = "#1e3020";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#3a4e3c";
                    e.currentTarget.style.borderColor = "#111811";
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── MASONRY GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gridAutoRows: "185px",
            gap: 3,
            padding: "0 3px 3px",
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          {filtered.map((item) => (
            <GalleryCard key={item.id} item={item} onClick={setModal} />
          ))}
        </div>

        {/* ── COUNT STRIP ── */}
        <div style={{ textAlign: "center", padding: "28px 24px" }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "#2a3d2c",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {filtered.length} visuals · {activeTab}
          </p>
        </div>

        {/* ── FOOTER ── */}
       
      </div>

      <Modal item={modal} onClose={() => setModal(null)} />
    </>
  );
}