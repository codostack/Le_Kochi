import { Link } from "react-router-dom";

// Updated premium catering display image URL
const foodImage =
  "https://bollywoodbarcarina.com.au/wp-content/uploads/2024/07/AdobeStock_636471259-1024x574.jpeg";

const services = [
  {
    title: "Corporate\nCatering",
    icon: (
      <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="12" r="5" stroke="#C9A84C" strokeWidth="1.8" />
        <path d="M12 30c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 18h20" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Private\nEvents",
    icon: (
      <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="20" r="6" stroke="#C9A84C" strokeWidth="1.8" />
        <circle cx="25" cy="20" r="6" stroke="#C9A84C" strokeWidth="1.8" />
      </svg>
    ),
  },
];

export default function CateringPage() {

const EnquireBtn = ({ className = "" }) => (
  <Link
    to="/enquiry"
    className={`inline-flex items-center justify-center
    bg-[#D2A74B] text-[#111] font-bold uppercase tracking-widest
    rounded-xl transition-transform duration-100
    shadow-[0_4px_28px_rgba(210,167,75,0.45)]
    ${className}`}
  >
    Enquire Now
  </Link>
);

  return (
    <div className="bg-[#05110a] text-white min-h-screen font-sans">

      {/* ═══════════════ MOBILE LAYOUT (below lg) ═══════════════ */}
      <div
        className="flex lg:hidden flex-col overflow-hidden relative"
        style={{ height: "calc(100svh - 56px - 70px)" }}
      >
        {/* Ambient background glow */}
        <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[#c9a84c]/8 blur-[80px] rounded-full pointer-events-none z-0" />

        {/* Text Header Content */}
        <div className="flex-shrink-0 mt-[40px] sm:mt-[60px] px-6 text-center z-10">
          <h1 className="text-[#D2A74B] font-bold uppercase tracking-[0.12em] text-[6.2vw] leading-none whitespace-nowrap">
            Catering &amp; Events
          </h1>
          <h2 className="text-white text-[3.8vw] mt-[1vh] font-bold tracking-wide uppercase opacity-90">
            For Every Special Occasion
          </h2>

          {/* Enhanced Mobile Text Paragraph Blocks */}
          <div className="text-[#cccccc] text-[2.9vw] sm:text-[11px] leading-relaxed mt-[2vh] max-w-md mx-auto space-y-1.5 text-center">
            <p>
              LeKochi bring an uncompromised South Indian luxury dining setup straight to your venue. We specialize in reproducing timeless, historic Malabar and Travancore recipes with complete visual grace and operational precision.
            </p>
            <p>
              From corporate luncheons to personal celebrations, our specialized hospitality team handles every micro-detail seamlessly, introducing rich custom flavor menus engineered to leave a premium, lasting culinary mark.
            </p>
          </div>
        </div>

        {/* Dynamic Grid Mobile Service Cards */}
        <div className="flex-shrink-0 grid grid-cols-4 px-2 mt-[2.5vh] z-10">
          {services.map((s, i) => (
            <div key={i} className={`flex flex-col items-center text-center py-1.5 ${i < 3 ? "border-r border-white/10" : ""}`}>
              <div className="flex items-center justify-center mb-[0.8vh]">
                {s.icon}
              </div>
              <span className="text-white font-medium text-[2.4vw] sm:text-[10px] leading-tight whitespace-pre-line">
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Adaptive Bottom Image Container Block */}
        <div className="relative flex-1 min-h-0 mt-[2.5vh]">
          <div className="absolute inset-0 overflow-hidden">
            <img src={foodImage} alt="Premium Catering Service" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
          </div>
          {/* Button aligned clean of safe margins */}
          <div className="absolute bottom-6 left-6 z-10">
            <EnquireBtn className="text-[3vw] sm:text-xs px-6 py-3.5" />
          </div>
        </div>
      </div>

      {/* ═══════════════ DESKTOP LAYOUT (lg and above) ═══════════════ */}
      <div className="hidden lg:flex min-h-screen items-center justify-center px-10 xl:px-20 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-16 items-center w-full py-16">

          {/* LEFT SIDE: TEXTUAL PROSE & GRID CONTENT (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Elegant Section Identifier Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1px] bg-[#c9a84c]" />
              <span className="text-[#c9a84c] uppercase tracking-[0.3em] text-[11px] font-bold">
                LeKochi Premium Catering
              </span>
            </div>

            <h1 className="text-white text-5xl xl:text-[54px] font-black leading-[1.15] tracking-tight">
              Catering &amp; <span className="text-[#D2A74B]">Events</span>
            </h1>
            <h2 className="text-[#D2A74B] text-xl xl:text-2xl mt-2 font-bold tracking-wide uppercase">
              For Every Occasion
            </h2>

            {/* Well-Aligned, High-Density Desktop Paragraph Story */}
            <div className="text-[#cccccc] text-sm xl:text-base leading-relaxed mt-6 space-y-4 max-w-xl">
              <p>
                LeKochi Café & Kitchen raises the standard of event dining by delivering an unmatched, luxury South Indian culinary blueprint directly to your venue. We honor historic Kerala gastronomy, curating custom culinary experiences that bridge time-tested coastal traditions with striking modern presentations.
              </p>
              <p>
                Our team meticulously oversees every single detail—from sourcing premium, single-origin spices straight from farm networks in India to immaculate plate assembly. Whether managing an intimate home gathering or coordinating high-profile business functions, we execute with absolute structural precision.
              </p>
              <p>
                Allow our professional chefs and warm hospitality experts to custom-build a distinct, aromatic journey that completely elevates your celebration, leaving your guests with a genuinely memorable and deeply authentic impression.
              </p>
            </div>

            {/* Desktop Structured Service Modules */}
            <div className="grid grid-cols-2 gap-4 mt-8 max-w-xl">
              {services.map((s, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl px-4 py-3.5 hover:border-[#c9a84c]/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/5 flex items-center justify-center flex-shrink-0">
                    {s.icon}
                  </div>
                  <span className="text-white text-xs xl:text-sm font-semibold tracking-wide leading-snug whitespace-pre-line">
                    {s.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Premium CTA Trigger Option */}
            <div className="mt-8">
              <EnquireBtn className="text-xs xl:text-sm px-10 py-4" />
            </div>
          </div>

          {/* RIGHT SIDE: PREMIUM HERO DISPLAY BANNER (5 Columns) */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] w-full max-w-[440px] group">
              <img
                src={foodImage}
                alt="Luxury Catering Layout Setup"
                className="w-full h-[72vh] object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

              {/* Floating Contextual Brand Tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4">
                <p className="text-[#c9a84c] text-[9px] uppercase tracking-[0.25em] font-bold mb-1">
                  LeKochi Signatures
                </p>
                <p className="text-white text-xs xl:text-sm font-medium leading-relaxed opacity-90">
                  Refined hospitality blueprints paired with flawless flavor execution across Ontario.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Desktop ambient luxury backdrop glow */}
      <div className="hidden lg:block absolute top-0 left-0 w-[450px] h-[450px] bg-[#c9a84c]/5 blur-[130px] rounded-full pointer-events-none z-0" />
    </div>
  );
}