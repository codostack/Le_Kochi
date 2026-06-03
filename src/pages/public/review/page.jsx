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
    desktopSize: "size-wide" // Spans 2 columns on desktop
  },
  {
    id: 2,
    category: "MAINS",
    title: "THALASSERY CHICKEN BIRYANI",
    subtitle: "Fragrant, short-grain Khaima rice cooked dum-style with slow-infused Malabar spices, ghee-fried cashews, raisins, and tender marinated chicken.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200&auto=format&fit=crop",
    desktopSize: "size-standard"
  },
  {
    id: 3,
    category: "CHEF'S SPECIALS",
    title: "TRADITIONAL KERALA SADHYA",
    subtitle: "An elaborate vegetarian banquet served on a pristine banana leaf featuring Parippu, Sambar, Avial, Thoran, Olan, and sweet Payasam.",
    image: "https://images.unsplash.com/photo-1610440042657-612fdb44a507?q=80&w=1200&auto=format&fit=crop",
    desktopSize: "size-tall" // Spans 1 column wide, but double-height across 2 rows
  },
  {
    id: 4,
    category: "STARTERS",
    title: "STEAMED IDLI & MEDU VADA",
    subtitle: "Fluffy, pillow-soft fermented rice cakes paired alongside a crunchy, split-black-gram donut fritter steeped in hot lentil soup.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
    desktopSize: "size-standard"
  },
  {
    id: 5,
    category: "STARTERS",
    title: "MALABAR PAROTTA WITH CHICKEN ROAST",
    subtitle: "Flaky, multi-layered spiral flatbread beaten to soft ribbons, served alongside a caramelized, semi-dry Kerala chicken masala.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=1200&auto=format&fit=crop",
    desktopSize: "size-standard"
  },
  {
    id: 6,
    category: "MAINS",
    title: "HYDERABADI DUM BIRYANI",
    subtitle: "Long-grain basmati rice layered meticulously with saffron, mint, and tightly sealed spiced meat slow-cooked to ultimate perfection.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop",
    desktopSize: "size-wide"
  },
  {
    id: 7,
    category: "CHEF'S SPECIALS",
    title: "KARIMEEN POLLICHATHU",
    subtitle: "Pearl spot fish marinated in a rich, fiery red spice paste, wrapped delicately in fresh banana leaves, and pan-seared to lock in moisture.",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=1200&auto=format&fit=crop",
    desktopSize: "size-standard"
  },
  {
    id: 8,
    category: "DRINKS",
    title: "METRO FILTER COFFEE",
    subtitle: "A dark roasted chicory coffee blend frothed and pulled through air into an authentic brass tumbler and dabarah set.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",
    desktopSize: "size-standard"
  },
  {
    id: 9,
    category: "DRINKS",
    title: "SPICED SAMBHARAM (BUTTERMILK)",
    subtitle: "Churned yogurt watered down and cooled with crushed green chilies, minced ginger, shallots, and fresh curry leaves.",
    image: "https://images.unsplash.com/photo-1546173159-315724a4f69b?q=80&w=1200&auto=format&fit=crop",
    desktopSize: "size-standard"
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
  { 
    quote: "Best Kerala food in Brampton. The flavours are authentic and the service is amazing!", 
    desktopQuote: "Best Kerala food in Brampton. The culinary richness, true-to-roots spices, and pristine execution reminded us exactly of home. Every single dish served at our gathering carried incredible depth, leaving all our guests completely amazed by the quality. The management team went above and beyond to tailor the spice profiles flawlessly.",
    name: "Anu Joseph",
    role: "Corporate Event Host",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  { 
    quote: "Absolutely incredible catering experience with unforgettable taste.", 
    desktopQuote: "Absolutely incredible catering experience with unforgettable taste. From the layered setup to the flawless presentation on the serving tables, everything was handled with pristine professionalism. The traditional dishes were the highlight of our family celebration, striking the perfect balance between authenticity and rich flavor.",
    name: "Ravi Menon",
    role: "Private Grand Celebration",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
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
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section className="testimonial-section">
      <h1 className="testimonial-section-title">
        <span className="text-[#c5a059] block">WHAT OUR CUSTOMERS SAY</span>
      </h1>
      
      <div className="quote-container-layout">
        <div className="desktop-avatar-badge">
          <img src={t.avatar} alt={t.name} className="client-avatar-img" />
          <span className="verified-dining-tag">Verified Review</span>
        </div>

        <div className="quote-text-block">
          <div className="quote-mark">“</div>
          <p className="testimonial-text mobile-text-view">{t.quote}</p>
          <p className="testimonial-text desktop-text-view">{t.desktopQuote}</p>
          
          <div className="stars">★★★★★</div>
          <p className="testimonial-name">— {t.name}</p>
          <p className="client-context-role">{t.role}</p>
        </div>
      </div>

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

        /* ── DESKTOP HERO BANNER ── */
        .app-desktop-hero {
          display: none;
          width: 100%;
          height: 300px;
          background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
                            url('https://i.pinimg.com/736x/fe/70/dc/fe70dcf91a1ba639f70f7a1e5920ed3d.jpg');
          background-size: cover;
          background-position: center;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(197, 160, 89, 0.15);
        }

        .app-desktop-hero h1 {
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 46px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
        }

        /* ── WORKSPACE CORE LAYOUT CONTAINER ── */
        .gallery-container {
          max-width: 1470px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        /* ── MAIN LAYOUT BLOCK ── */
        .gallery-workspace-layout {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* ── HEADER STRIP (MOBILE ONLY) ── */
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

        /* ── FILTER TABS NAVIGATION (MOBILE DEFAULT) ── */
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
          text-align: center;
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

        /* ── GRID SYSTEM DEFAULT (MOBILE STACK) ── */
        .showcase-display-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          width: 100%;
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

        /* ── MODAL WINDOW CONFIGURATION ── */
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
          height: 55vh;
          position: relative;
          background: #020d09;
        }

        .modal-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          text-transform: uppercase;
        }

        .modal-desc-strip p {
          color: #b3c7c0;
          font-size: 15px;
          line-height: 1.6;
        }

        /* ── FOOTER & TESTIMONIALS (BASE STYLE) ── */
        .testimonial-section {
          padding: 80px 24px;
          text-align: center;
          background: #041a13;
          border-top: 1px solid rgba(197, 160, 89, 0.1);
        }

        .testimonial-section-title {
          font-family: 'Cinzel', serif;
          font-size: 26px;
          letter-spacing: 0.12em;
          margin-bottom: 30px;
        }

        .quote-container-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .desktop-avatar-badge { display: none; }
        .quote-mark {
          color: #c5a059;
          font-size: 64px;
          line-height: 1;
          margin-bottom: 8px;
          font-family: serif;
        }

        .testimonial-text { line-height: 1.8; color: #e5e7eb; font-size: 17px; }
        .desktop-text-view { display: none; }
        .stars { color: #c5a059; margin: 20px 0 10px; font-size: 18px; letter-spacing: 4px; }
        .testimonial-name { color: #ffffff; font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .client-context-role { display: none; }
        .divider { width: 80px; height: 1px; background: #c5a059; margin: 48px auto; }

        /* ── ORIGINAL SMARTPHONE LAYOUT CONFIG (UNTOUCHED) ── */
        @media (max-width: 768px) {
          .gallery-container {
            padding: 0;
            width: 100%;
            max-width: 100%;
          }
          .showcase-block {
            height: 280px;
            border-radius: 0;
            border-left: 0;
            border-right: 0;
          }
          .modal-desc-strip { padding: 20px; }
          .modal-desc-strip h2 { font-size: 20px; }
          .app-main-title { font-size: 22px; }
          .modal-image-container { height: 35vh; }
          .mobile-text-view { display: block; }
        }

        /* ── EXCLUSIVE DESKTOP STYLING ADJUSTMENTS ── */
        @media (min-width: 769px) {
          .app-desktop-hero {
            display: flex;
          }

          .app-header-strip {
            display: none !important;
          }

          .gallery-container {
            max-width: 1400px;
            padding: 60px 40px;
          }

          /* ── CENTERED TABS POSITIONING SYSTEM (DESKTOP) ── */
          .tabs-row {
            justify-content: center;
            align-items: center;
            width: 100%;
            margin: 0 auto 50px auto;
            gap: 16px;
            overflow-x: visible;
          }

          .tab-pill {
            padding: 14px 28px;
            border-radius: 12px;
            font-size: 13px;
            letter-spacing: 0.08em;
          }

          /* ── PREMIUM FLUSH-MOUNT MASONRY MOSAIC DISPLAY GRID ── */
          .showcase-display-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
          }

          /* Layout Sizing Parameters for Perfectly Proportioned Blocks */
          .showcase-block.size-standard {
            grid-column: span 1;
            height: 340px;
          }

          .showcase-block.size-wide {
            grid-column: span 2;
            height: 340px;
          }

          .showcase-block.size-tall {
            grid-column: span 1;
            grid-row: span 2;
            height: 710px; /* Aligns smoothly down two block heights alongside the gap metrics */
          }

          /* Testimonial Section Adjustments */
          .testimonial-section {
            padding: 120px 40px;
            background: radial-gradient(circle at center, #05241b 0%, #041a13 70%);
          }

          .testimonial-section-title {
            font-size: 36px;
            letter-spacing: 0.18em;
            margin-bottom: 50px;
          }

          .quote-container-layout {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            max-width: 1150px;
            gap: 60px;
            text-align: left;
            background: rgba(255, 255, 255, 0.02);
            padding: 50px 60px;
            border-radius: 24px;
            border: 1px solid rgba(197, 160, 89, 0.15);
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          }

          .desktop-avatar-badge {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            flex-shrink: 0;
          }

          .client-avatar-img {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #c5a059;
          }

          .verified-dining-tag {
            display: inline-block;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            color: #041a13;
            background: #c5a059;
            padding: 4px 12px;
            border-radius: 20px;
          }

          .quote-text-block { flex-grow: 1; }
          .quote-mark { font-size: 80px; height: 40px; line-height: 0.8; margin-bottom: 10px; }
          .mobile-text-view { display: none !important; }
          .desktop-text-view { display: block !important; font-size: 20px; line-height: 1.8; color: #e2f0eb; font-weight: 300; }
          .stars { margin: 22px 0 8px 0; font-size: 22px; }
          .testimonial-name { font-size: 18px; letter-spacing: 0.08em; color: #c5a059; }
          .client-context-role { display: block; font-size: 13px; color: #8fa39c; margin-top: 2px; }
        }
      `}</style>

      {/* ── DESKTOP HERO BANNER ── */}
      <div className="app-desktop-hero">
        <h1>Our Gallery</h1>
      </div>

      <div className="gallery-container">

        {/* ── MINIMAL HEADLINE STRIP (MOBILE ONLY) ── */}
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

        {/* ── CENTRALIZED MASTER WORKSPACE LAYOUT ── */}
        <div className="gallery-workspace-layout">
          
          {/* ── HORIZONTALLY CENTERED FILTER BAR (DESKTOP) ── */}
          <nav className="tabs-row">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`tab-pill ${activeTab === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* ── SHOWCASE MASONRY MOSAIC DISPLAY GRID ── */}
          <main className="showcase-display-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`showcase-block ${item.desktopSize}`}
                onClick={() => setSelectedItem(item)}
              >
                {item.id === 3 && (
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
            ))}
          </main>

        </div>
      </div>

      {/* ── FOOTER REVIEW ARCHITECTURE ── */}
      <TestimonialsSection />

      {/* ── FULL-WIDTH OVERLAY MODAL LIGHTBOX ── */}
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