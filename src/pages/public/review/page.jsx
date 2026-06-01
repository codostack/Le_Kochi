import {
  FaInstagramSquare,
  FaFacebookF,
  FaTiktok,
  FaGoogle,
  FaSearch,
  FaShoppingBag,
  FaChevronLeft,
} from "react-icons/fa";
import { useState, useEffect } from "react";

// ── SOUTH INDIAN CUISINE VISUAL CATALOG DATA ──
const GALLERY_ITEMS = [
  {
    id: 1,
    category: "MAINS",
    title: "GHEE ROAST MASALA DOSA",
    subtitle: "Crispy golden fermented rice crepe layered with pure ghee, served with spiced potato masala, sambar, and a trio of fresh chutneys.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "MAINS",
    title: "THALASSERY CHICKEN BIRYANI",
    subtitle: "Fragrant, short-grain Khaima rice cooked dum-style with slow-infused Malabar spices, ghee-fried cashews, raisins, and tender marinated chicken.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "CHEF'S SPECIALS",
    title: "TRADITIONAL KERALA SADHYA",
    subtitle: "An elaborate vegetarian banquet served on a pristine banana leaf featuring Parippu, Sambar, Avial, Thoran, Olan, and sweet Payasam.",
    image: "https://images.unsplash.com/photo-1610440042657-612fdb44a507?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "STARTERS",
    title: "STEAMED IDLI & MEDU VADA",
    subtitle: "Fluffy, pillow-soft fermented rice cakes paired alongside a crunchy, split-black-gram donut fritter steeped in hot lentil soup.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "STARTERS",
    title: "MALABAR PAROTTA WITH CHICKEN ROAST",
    subtitle: "Flaky, multi-layered spiral flatbread beaten to soft ribbons, served alongside a caramelized, semi-dry Kerala chicken masala.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "MAINS",
    title: "HYDERABADI DUM BIRYANI",
    subtitle: "Long-grain basmati rice layered meticulously with saffron, mint, and tightly sealed spiced meat slow-cooked to ultimate perfection.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    category: "CHEF'S SPECIALS",
    title: "KARIMEEN POLLICHATHU",
    subtitle: "Pearl spot fish marinated in a rich, fiery red spice paste, wrapped delicately in fresh banana leaves, and pan-seared to lock in moisture.",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    category: "DRINKS",
    title: "METRO FILTER COFFEE",
    subtitle: "A dark roasted chicory coffee blend frothed and pulled through air into an authentic brass tumbler and dabarah set.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 9,
    category: "DRINKS",
    title: "SPICED SAMBHARAM (BUTTERMILK)",
    subtitle: "Churned yogurt watered down and cooled with crushed green chilies, minced ginger, shallots, and fresh curry leaves.",
    image: "https://images.unsplash.com/photo-1546173159-315724a4f69b?q=80&w=1200&auto=format&fit=crop",
  },
];

const CATEGORIES = ["ALL DISHES", "STARTERS", "MAINS", "DRINKS", "CHEF'S SPECIALS"];

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://instagram.com", color: "#E1306C", icon: <FaInstagramSquare /> },
  { name: "Facebook", href: "https://facebook.com", color: "#1877F2", icon: <FaFacebookF /> },
  { name: "TikTok", href: "https://tiktok.com", color: "#ffffff", icon: <FaTiktok /> },
  { name: "Google", href: "https://google.com", color: "#EA4335", icon: <FaGoogle /> },
];

const TESTIMONIALS = [
  { quote: "Best Kerala food in Brampton. The flavours are authentic and the service is amazing!", name: "Anu Joseph" },
  { quote: "Absolutely incredible catering experience with unforgettable taste.", name: "Ravi Menon" },
];

function SocialIcons({ size = 56, gap = 16 }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap, flexWrap: "wrap" }}>
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            border: "1px solid rgba(197,160,89,0.25)",
            background: "#041a13",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#c5a059",
            textDecoration: "none",
            fontSize: "24px",
            transition: "all .3s ease",
            backdropFilter: "blur(10px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = s.color + "22";
            e.currentTarget.style.borderColor = s.color;
            e.currentTarget.style.color = s.color;
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(197,160,89,0.05)";
            e.currentTarget.style.borderColor = "rgba(197,160,89,0.25)";
            e.currentTarget.style.color = "#c5a059";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section className="testimonial-section">
      <h1 className="font-serif text-1xl tracking-widest">
        <span className="text-3xl text-[#c5a059] block">WHAT OUR CUSTOMERS SAY</span>
      </h1>
      <div className="quote-mark">“</div>
      <p className="testimonial-text">{t.quote}</p>
      <div className="stars">★★★★★</div>
      <p className="testimonial-name">— {t.name}</p>
      <div className="divider" />
      <h1 className="font-serif text-2xl tracking-widest mb-2">
        <span className="text-3xl md:text-5xl text-[#c5a059] block">FOLLOW US</span>
      </h1>
      <SocialIcons />
    </section>
  );
}

export default function CateringGallery() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL DISHES");

  const filteredItems = activeTab === "ALL DISHES"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeTab);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #041a13;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .gallery-container {
          max-width: 1470px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        /* ── HEADER STRIP ── */
        .app-header-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0 30px 0;
        }

        .app-back-btn {
          background: transparent;
          border: none;
          color: #c5a059;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .app-back-btn:hover {
          transform: scale(1.1);
        }

        .app-main-title {
          font-family: 'Cinzel', serif, system-ui;
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 0.15em;
          color: #d1c2a5;
          text-transform: uppercase;
          text-align: center;
        }

        .app-action-group {
          display: flex;
          align-items: center;
          gap: 22px;
          color: #c5a059;
        }

        .app-icon-action {
          background: transparent;
          border: none;
          color: #c5a059;
          font-size: 19px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .app-icon-action:hover {
          transform: scale(1.1);
        }

        /* ── FILTER CAPSULES ── */
        .tabs-row {
          display: flex;
          gap: 12px;
          margin-bottom: 35px;
          overflow-x: auto;
          padding-bottom: 12px;
          scrollbar-width: none;
        }
        .tabs-row::-webkit-scrollbar {
          display: none;
        }

        .tab-pill {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: #9cb0a9;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          padding: 12px 26px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab-pill:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
        }

        .tab-pill.active {
          color: #c5a059;
          border-color: #8c6f3e;
          background: rgba(197, 160, 89, 0.1);
          box-shadow: inset 0 0 6px rgba(197, 160, 89, 0.15);
        }

        /* ── GRID SYSTEM ── */
        .showcase-display-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 32px;
        }

        .showcase-block {
          position: relative;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(197, 160, 89, 0.12);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .showcase-block:hover {
          transform: translateY(-4px);
          border-color: #c5a059;
          box-shadow: 0 12px 30px rgba(4, 26, 19, 0.5);
        }

        .showcase-block.size-wide { grid-column: span 4; height: 360px; }
        .showcase-block.size-tall { grid-column: span 2; height: 360px; }
        .showcase-block.size-full { grid-column: span 6; height: 400px; }
        .showcase-block.size-semi { grid-column: span 3; height: 320px; }

        .showcase-image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .showcase-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .showcase-block:hover .showcase-img {
          transform: scale(1.03);
        }

        .showcase-text-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(4, 26, 19, 0.98) 15%, rgba(4, 26, 19, 0.4) 65%, transparent);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .showcase-text-overlay h3 {
          font-family: 'Cinzel', serif, system-ui;
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: #ffffff;
        }

        .signature-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(4, 26, 19, 0.9);
          border: 1px solid #8c6f3e;
          color: #c5a059;
          font-size: 10px;
          letter-spacing: 0.12em;
          padding: 5px 14px;
          border-radius: 4px;
          text-transform: uppercase;
          z-index: 2;
        }

        /* ── MODAL FULL-WIDTH EDGE-TO-EDGE NO-GAP CONFIGURATION ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4, 26, 19, 0.98);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 16px;
          backdrop-filter: blur(20px);
        }

        .modal-box {
          width: 100%;
          max-width: 1100px;
          max-height: 95vh;
          background: #041a13;
          border: 1px solid rgba(197, 160, 89, 0.25);
          border-radius: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8);
        }

        .modal-image-container {
          width: 100%;
          height: 55vh; /* Responsive responsive footprint height scale anchor */
          position: relative;
          background: #020d09;
        }

        .modal-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Stretches and maps out fully to both left/right edges with zero empty side space */
          object-position: center;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(197, 160, 89, 0.4);
          border-radius: 50%;
          background: rgba(4, 26, 19, 0.85);
          color: #c5a059;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 1000;
        }

        .close-btn:hover {
          background: #c5a059;
          color: #041a13;
          border-color: #c5a059;
          transform: rotate(90deg);
        }

        .modal-desc-strip {
          padding: 28px 32px;
          background: #03150f;
          border-top: 1px solid rgba(197, 160, 89, 0.15);
        }

        .modal-desc-strip h2 {
          font-family: 'Cinzel', serif;
          font-size: 24px;
          color: #c5a059;
          margin-bottom: 10px;
          letter-spacing: 0.05em;
        }

        .modal-desc-strip p {
          color: #b3c7c0;
          font-size: 15px;
          line-height: 1.6;
        }

        /* ── FOOTER & TESTIMONIALS ── */
        .testimonial-section {
          padding: 100px 24px;
          text-align: center;
          background: #041a13;
          border-top: 1px solid rgba(197, 160, 89, 0.1);
        }

        .quote-mark {
          color: #c5a059;
          font-size: 64px;
          line-height: 1;
          margin-bottom: 8px;
        }

        .testimonial-text {
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
          color: #e5e7eb;
          font-size: 19px;
        }

        .stars {
          color: #c5a059;
          margin: 24px 0 12px;
          font-size: 20px;
          letter-spacing: 4px;
        }

        .testimonial-name {
          color: #9cb0a9;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .divider {
          width: 80px;
          height: 1px;
          background: #c5a059;
          margin: 48px auto;
        }

        /* ── BREAKPOINTS ── */
        @media (max-width: 1024px) {
          .showcase-display-grid {
            gap: 24px;
          }
          .showcase-block.size-wide,
          .showcase-block.size-tall,
          .showcase-block.size-semi {
            grid-column: span 3;
            height: 320px;
          }
          .showcase-block.size-full {
            grid-column: span 6;
            height: 360px;
          }
          .modal-image-container { height: 45vh; }
        }

        @media (max-width: 768px) {
  .gallery-container {
    padding: 0;
    width: 100%;
    max-width: 100%;
  }          .showcase-display-grid { grid-template-columns: 1fr; gap: 24px; }
.showcase-block.size-wide,
.showcase-block.size-tall,
.showcase-block.size-full,
.showcase-block.size-semi {
  grid-column: span 1;
  height: 280px;
  border-radius: 0;
  overflow: hidden;
  border-left: 0;
  border-right: 0;
}
          .modal-desc-strip { padding: 20px; }
          .modal-desc-strip h2 { font-size: 20px; }
          .app-main-title { font-size: 22px; }
          .modal-image-container { height: 35vh; }
        }
      `}</style>

      <div className="gallery-container">

        {/* ── MINIMAL HEADLINE STRIP ── */}
        <div className="app-header-strip">
          <button className="app-back-btn" aria-label="Go Back">
            <FaChevronLeft />
          </button>

          <h1 className="app-main-title">Gallery</h1>

          <div className="app-action-group">
            <button className="app-icon-action" aria-label="Search">
              <FaSearch />
            </button>
            <button className="app-icon-action" aria-label="Shopping Bag">
              <FaShoppingBag />
            </button>
          </div>
        </div>

        {/* ── PILL FILTER OPTIONS ── */}
        <div className="tabs-row">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`tab-pill ${activeTab === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── SHOWCASE MASONRY DISPLAY ── */}
        <main className="showcase-display-grid">
          {filteredItems.map((item, index) => {
            let gridLayoutClass = "size-semi";
            if (index === 0) gridLayoutClass = "size-wide";
            if (index === 1) gridLayoutClass = "size-tall";
            if (index === 2) gridLayoutClass = "size-full";
            if (index === 6) gridLayoutClass = "size-wide";
            if (index === 7) gridLayoutClass = "size-tall";

            return (
              <div
                key={item.id}
                className={`showcase-block ${gridLayoutClass}`}
                onClick={() => setSelectedItem(item)}
              >
                {index === 2 && (
                  <span className="signature-badge">Grand Feast</span>
                )}
                <div className="showcase-image-wrapper">
                  <img
                    className="showcase-img"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                <div className="showcase-text-overlay">
                  <h3>{item.title}</h3>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {/* ── FOOTER REVIEW ARCHITECTURE ── */}
      <TestimonialsSection />

      {/* ── FULL-WIDTH FLUSH INTERFACE MODAL LIGHTBOX ── */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedItem(null)} aria-label="Dismiss Modal">
              ×
            </button>
            <div className="modal-image-container">
              <img
                className="modal-cover-img"
                src={selectedItem.image}
                alt={selectedItem.title}
              />
            </div>
            <div className="modal-desc-strip">
              <h2>{selectedItem.title}</h2>
              <p>{selectedItem.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}