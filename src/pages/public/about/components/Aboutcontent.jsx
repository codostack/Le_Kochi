import React from "react";
import { Clock, MapPin, Phone, ChevronRight } from "lucide-react";

/* ─── COLOR TOKENS (matches AboutHeader theme) ─── */
const GOLD      = "#c5a059";
const GOLD_LIGHT= "#e2c07a";
const GOLD_DIM  = "rgba(197,160,89,0.12)";
const GOLD_DIM2 = "rgba(197,160,89,0.22)";
const BG        = "#05110a";
const BG_CARD   = "#0c1e12";
const BG_CARD2  = "#081508";
const WHITE     = "#f5f0e8";
const MUTED     = "#7a9080";
const BORDER    = "rgba(197,160,89,0.15)";
const BORDER2   = "rgba(197,160,89,0.30)";

export default function AboutContent() {
  return (
    <section
      style={{
        background: BG,
        fontFamily: "'Poppins', sans-serif",
        color: WHITE,
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Poppins:wght@300;400;500;600&display=swap');

        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ac-shimmer {
          background: linear-gradient(90deg, ${GOLD} 0%, ${GOLD_LIGHT} 40%, ${GOLD} 60%, ${GOLD_LIGHT} 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3.5s linear infinite;
        }

        .ac-section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 100px;
          border: 1px solid ${BORDER2};
          background: ${GOLD_DIM};
          font-size: 9px;
          letter-spacing: 0.25em;
          color: ${GOLD};
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .ac-card {
          background: linear-gradient(135deg, ${BG_CARD} 0%, ${BG_CARD2} 100%);
          border: 1px solid ${BORDER};
          border-radius: 18px;
          transition: border-color 0.25s, transform 0.2s;
        }
        .ac-card:active {
          border-color: ${BORDER2};
          transform: scale(0.985);
        }

        .ac-gold-hr {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, ${GOLD}, transparent);
        }

        .ac-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 700;
        }

        .ac-timeline-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${GOLD};
          border: 2px solid ${BG_CARD};
          box-shadow: 0 0 0 3px ${GOLD_DIM2};
          flex-shrink: 0;
          margin-top: 4px;
        }

        .ac-review-star {
          color: ${GOLD};
          font-size: 12px;
        }

        /* Desktop tweaks */
        @media (min-width: 1024px) {
          .ac-mobile-only { display: none !important; }
          .ac-desktop-grid { display: grid !important; }
        }
        @media (max-width: 1023px) {
          .ac-desktop-only { display: none !important; }
        }
      `}</style>

      {/* ════════════════════════════════════════
          BLOCK 1 — OUR STORY TIMELINE
      ════════════════════════════════════════ */}
      <div style={{ padding: "48px 20px 40px", maxWidth: 680, margin: "0 auto" }}>

        {/* top divider */}
        <hr className="ac-gold-hr" style={{ marginBottom: 36 }} />

        <div className="ac-section-label">
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD, display: "inline-block" }} />
          Our Journey
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, lineHeight: 1.2, marginBottom: 28 }}>
          A Decade of<br />
          <span className="ac-shimmer" style={{ fontStyle: "italic" }}>Authentic Flavours</span>
        </h2>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            {
              year: "2015",
              title: "The Beginning",
              text: "LeKochi opened its doors with a single mission — to bring the true taste of Kerala homes to every plate. What started as a small café quickly became a community staple.",
            },
            {
              year: "2018",
              title: "Kerala Specials Launched",
              text: "We introduced our signature Kerala Specials section — Beef Fry, Porotta, and traditional curries slow-cooked with authentic spices that became instant crowd favourites.",
            },
            {
              year: "2021",
              title: "Growing the Family",
              text: "Expanded our kitchen team with chefs trained in authentic Kerala households, ensuring every dish carries the warmth and precision of home cooking.",
            },
            {
              year: "2024",
              title: "Digital Experience",
              text: "Launched our online menu and ordering system, making LeKochi accessible at your fingertips while preserving every bit of the warmth in our service.",
              last: true,
            },
          ].map((item) => (
            <div key={item.year} style={{ display: "flex", gap: 16, paddingBottom: item.last ? 0 : 24 }}>
              {/* dot + line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 10, flexShrink: 0 }}>
                <div className="ac-timeline-dot" />
                {!item.last && (
                  <div style={{ flex: 1, width: 1, background: `linear-gradient(to bottom, ${GOLD}, transparent)`, marginTop: 4 }} />
                )}
              </div>
              {/* content */}
              <div style={{ paddingBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: GOLD, fontWeight: 600, letterSpacing: "0.1em" }}>{item.year}</span>
                  <div style={{ height: 1, width: 16, background: BORDER2 }} />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: WHITE }}>{item.title}</span>
                </div>
                <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.7 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          BLOCK 2 — STATS STRIP
      ════════════════════════════════════════ */}
      <div style={{ background: `linear-gradient(135deg, ${BG_CARD} 0%, ${BG_CARD2} 100%)`, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "28px 20px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0, position: "relative" }}>
          {/* vertical separators */}
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ position: "absolute", left: `${i * 25}%`, top: "10%", bottom: "10%", width: 1, background: BORDER }} />
          ))}
          {[
            { num: "10+", label: "Years\nServing" },
            { num: "60+", label: "Menu\nItems" },
            { num: "5K+", label: "Happy\nGuests" },
            { num: "4.8★", label: "Avg\nRating" },
          ].map((s) => (
            <div key={s.num} style={{ textAlign: "center", padding: "4px 8px" }}>
              <div className="ac-shimmer ac-stat-num">{s.num}</div>
              <div style={{ fontSize: 9, color: MUTED, lineHeight: 1.4, marginTop: 4, whiteSpace: "pre-line" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          BLOCK 3 — FOUNDER'S QUOTE
      ════════════════════════════════════════ */}
      <div style={{ padding: "40px 20px", maxWidth: 680, margin: "0 auto" }}>

        <div style={{ border: `1px solid ${BORDER2}`, borderLeft: `3px solid ${GOLD}`, borderRadius: "0 18px 18px 0", padding: "20px 18px", background: GOLD_DIM, marginBottom: 36 }}>
          <div style={{ color: GOLD, fontSize: 32, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1, marginBottom: 10, opacity: 0.6 }}>"</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: WHITE, lineHeight: 1.7 }}>
            We cook the way Kerala mothers cook — with patience, love, and the finest spices passed down through generations.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
            <div style={{ height: 1, width: 24, background: BORDER2 }} />
            <span style={{ fontSize: 10, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase" }}>Founder, LeKochi Café & Kitchen</span>
          </div>
        </div>

        {/* ─ WHAT MAKES US SPECIAL ─ */}
        <div className="ac-section-label">
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD, display: "inline-block" }} />
          What Makes Us Special
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, lineHeight: 1.25, marginBottom: 20 }}>
          Crafted with Care,<br />
          <span className="ac-shimmer" style={{ fontStyle: "italic" }}>Served with Heart</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
          {[
            {
              icon: "🌿",
              title: "Farm-Fresh Ingredients",
              text: "Every ingredient is sourced fresh daily. We partner with local suppliers who share our commitment to quality and authenticity.",
            },
            {
              icon: "🔥",
              title: "Traditional Cooking Methods",
              text: "Our chefs use clay pots, wood-fire techniques, and slow-cooking methods inherited from Kerala's rich culinary heritage.",
            },
            {
              icon: "🧂",
              title: "Homemade Spice Blends",
              text: "Our signature masala blends are ground in-house every morning — never store-bought, never compromised.",
            },
            {
              icon: "💚",
              title: "Hygienic Open Kitchen",
              text: "We believe food tastes better when you trust how it's made. Our kitchen is clean, transparent, and inspected regularly.",
            },
          ].map((item) => (
            <div key={item.title} className="ac-card" style={{ display: "flex", gap: 14, padding: "16px 14px", alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: GOLD_DIM2, border: `1px solid ${BORDER2}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: WHITE, marginBottom: 4 }}>{item.title}</h4>
                <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.65 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="ac-gold-hr" style={{ marginBottom: 36 }} />

        {/* ─ REVIEWS ─ */}
        <div className="ac-section-label">
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD, display: "inline-block" }} />
          Guest Reviews
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, marginBottom: 18 }}>
          Loved by Every<br />
          <span className="ac-shimmer" style={{ fontStyle: "italic" }}>Dosa Lover</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
          {[
            { name: "Arjun M.", text: "The Masala Dosa here is the closest thing to my grandmother's cooking. Absolutely worth every penny.", stars: 5 },
            { name: "Priya K.", text: "Kerala Porotta with Beef Fry — perfection. The spices are spot on and the service is always warm.", stars: 5 },
            { name: "Rahul T.", text: "Best South Indian food in the city. The Ghee Roast is crispy, golden and utterly addictive.", stars: 5 },
          ].map((r) => (
            <div key={r.name} className="ac-card" style={{ padding: "16px 16px" }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} className="ac-review-star">★</span>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "#c8d5c8", lineHeight: 1.7, marginBottom: 10, fontStyle: "italic" }}>"{r.text}"</p>
              <span style={{ fontSize: 10, color: GOLD, fontWeight: 600, letterSpacing: "0.08em" }}>— {r.name}</span>
            </div>
          ))}
        </div>

        <hr className="ac-gold-hr" style={{ marginBottom: 36 }} />

        {/* ─ VISIT US ─ */}
        <div className="ac-section-label">
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD, display: "inline-block" }} />
          Find Us
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, marginBottom: 18 }}>
          Come Visit<br />
          <span className="ac-shimmer" style={{ fontStyle: "italic" }}>LeKochi Kitchen</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {[
            { icon: <MapPin size={16} />, label: "Address", value: "52-6141 Mayfield road Brampton L7A0C4, Ontario" },
            { icon: <Clock size={16} />,  label: "Hours",   value: "Mon – Sun: 8:00 AM – 10:00 PM" },
            { icon: <Phone size={16} />,  label: "Phone",   value: "9057940444" },
          ].map((info) => (
            <div key={info.label} className="ac-card" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 14px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: GOLD_DIM2, border: `1px solid ${BORDER2}`, display: "flex", alignItems: "center", justifyContent: "center", color: GOLD, flexShrink: 0 }}>
                {info.icon}
              </div>
              <div>
                <div style={{ fontSize: 9, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{info.label}</div>
                <div style={{ fontSize: 12, color: WHITE, fontWeight: 500 }}>{info.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: 16,
            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
            color: "#0b0b0b",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: "0.04em",
            border: "none",
            cursor: "pointer",
            boxShadow: `0 8px 28px rgba(197,160,89,0.35)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          Explore Our Menu
          <ChevronRight size={16} />
        </button>

        {/* bottom spacer */}
        <div style={{ height: 32 }} />
      </div>
    </section>
  );
}