import {
  FaInstagramSquare,
  FaFacebookF,
  FaTiktok,
  FaGoogle,
} from "react-icons/fa";
import { useState, useEffect, } from "react";



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
];

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    color: "#E1306C",
    icon: <FaInstagramSquare />,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    color: "#1877F2",
    icon: <FaFacebookF />,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    color: "#ffffff",
    icon: <FaTiktok />,
  },
  {
    name: "Google",
    href: "https://google.com",
    color: "#EA4335",
    icon: <FaGoogle />,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Best Kerala food in Brampton. The flavours are authentic and the service is amazing!",
    name: "Anu Joseph",
  },
  {
    quote:
      "Absolutely incredible catering experience with unforgettable taste.",
    name: "Ravi Menon",
  },
];

function SocialIcons({
  size = 56,
  gap = 16,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap,
        flexWrap: "wrap",
      }}
    >
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
            border:
              "1px solid rgba(197,160,89,0.35)",
            background:
              "#05110a",
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
            e.currentTarget.style.background =
              s.color + "22";
            e.currentTarget.style.borderColor =
              s.color;
            e.currentTarget.style.color =
              s.color;
            e.currentTarget.style.transform =
              "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "rgba(197,160,89,0.08)";
            e.currentTarget.style.borderColor =
              "rgba(197,160,89,0.35)";
            e.currentTarget.style.color =
              "#c5a059";
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

function GalleryCard({ item, onClick }) {
  return (
    <div
      onClick={() => onClick(item)}
      className="gallery-card"
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay" />

      <div className="card-info">
        <span>{item.category}</span>
        <h3>{item.title}</h3>
        <p>{item.subtitle}</p>
      </div>
    </div>
  );
}

function Modal({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-image"
          style={{
            backgroundImage: `url(${item.image})`,
          }}
        >
          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-content">
          <span>{item.category}</span>
          <h2>{item.title}</h2>
          <p>{item.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] =
    useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(
        (c) =>
          (c + 1) % TESTIMONIALS.length
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section className="testimonial-section bg-[#05110a]">

            
     
            <h1 className=" font-serif text-1xl tracking-widest">
                      <span className="text-3xl md:text-3xl text-[#c5a059] block"> WHAT OUR CUSTOMERS SAY</span>
        
            </h1>

      <div className="quote-mark">“</div>

      <p className="testimonial-text">
        {t.quote}
      </p>

      <div className="stars">
        ★★★★★
      </div>

      <p className="testimonial-name">
        — {t.name}
      </p>

      <div className="divider" />

      <p className="section-label">
  
      </p>

         <h1 className=" font-serif text-2xl tracking-widest mb-2">
                      <span className="text-3xl md:text-5xl text-[#c5a059] block"> FOLLOW US</span>
        
            </h1>

      <SocialIcons />

    </section>
  );
}

export default function CateringGallery() {
  const [selectedItem, setSelectedItem] =
    useState(null);

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          background:#05110a;
          color:white;
          font-family:Inter,sans-serif;
        }

        .gallery-wrapper{
          max-width:1280px;
          margin:auto;
          padding:80px 24px;
        }

        .gallery-grid{
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:18px;
        }

        .gallery-card{
          position:relative;
          height:300px;
          border-radius:24px;
          overflow:hidden;
          cursor:pointer;
          border:1px solid rgba(255,255,255,.06);
        }

        .overlay{
          position:absolute;
          inset:0;
          background:linear-gradient(to top, rgba(0,0,0,.8), transparent);
        }

        .card-info{
          position:absolute;
          bottom:0;
          left:0;
          right:0;
          padding:22px;
          z-index:2;
        }

        .card-info span{
          color:#c5a059;
          font-size:12px;
        }

        .card-info h3{
          font-size:26px;
          margin:8px 0;
        }

        .card-info p{
          color:#d1d5db;
          font-size:14px;
        }

        .testimonial-section{
          padding:80px 24px;
          text-align:center;
          background:#05110a;
          border-top:1px solid rgba(255,255,255,.06);
          border-bottom:1px solid rgba(255,255,255,.06);
        }

        .section-label{
          color:#c5a059;
          letter-spacing:.3em;
          font-size:13px;
          margin-bottom:24px;
        }

        .quote-mark{
          color:#c5a059;
          font-size:60px;
          margin-bottom:10px;
        }

        .testimonial-text{
          max-width:620px;
          margin:auto;
          line-height:1.9;
          color:white;
          font-size:18px;
        }

        .stars{
          color:#c5a059;
          margin:22px 0 12px;
          font-size:24px;
          letter-spacing:6px;
        }

        .testimonial-name{
          color:#d1d5db;
          font-size:14px;
        }

        .divider{
          width:100%;
          max-width:500px;
          height:1px;
          background:rgba(255,255,255,.08);
          margin:40px auto;
        }

        .social-labels{
          display:flex;
          justify-content:center;
          gap:18px;
          margin-top:12px;
          flex-wrap:wrap;
        }

        .social-labels span{
          width:56px;
          font-size:10px;
          color:rgba(255,255,255,.35);
        }

        .modal-overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.8);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:999;
          padding:20px;
        }

        .modal-box{
          width:100%;
          max-width:700px;
          background:#111;
          border-radius:24px;
          overflow:hidden;
        }

        .modal-image{
          height:320px;
          background-size:cover;
          background-position:center;
          position:relative;
        }

        .close-btn{
          position:absolute;
          top:16px;
          right:16px;
          width:40px;
          height:40px;
          border:none;
          border-radius:50%;
          background:#111;
          color:white;
          font-size:22px;
          cursor:pointer;
        }

        .modal-content{
          padding:28px;
        }

        .modal-content span{
          color:#c5a059;
          font-size:12px;
        }

        .modal-content h2{
          font-size:36px;
          margin:10px 0;
        }

        .modal-content p{
          color:#d1d5db;
        }

        @media(max-width:768px){

          .gallery-grid{
            grid-template-columns:1fr;
          }

          .gallery-card{
            height:240px;
          }

          .testimonial-text{
            font-size:15px;
          }

          .modal-image{
            height:220px;
          }

          .modal-content h2{
            font-size:28px;
          }

          .section-label{
            font-size:11px;
          }

        }
      `}</style>

      <section className="gallery-wrapper">
        <div
          style={{
            marginBottom: "50px",
          }}
        >
          <p
            style={{
              color: "#9ca3af",
              marginBottom: "14px",
              letterSpacing: ".1em",
            }}
          >
            OUR PORTFOLIO
          </p>

          <h1
            style={{
              fontSize:
                "clamp(40px,6vw,76px)",
              lineHeight: 1.1,
            }}
          >
            Crafted Event
            <br />
            Experiences
          </h1>
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={setSelectedItem}
            />
          ))}
        </div>
      </section>

      <TestimonialsSection />

      

      <Modal
        item={selectedItem}
        onClose={() =>
          setSelectedItem(null)
        }
      />
    </>
  );
}