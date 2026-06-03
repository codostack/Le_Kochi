import { Link } from "react-router-dom";
import { useState } from "react";

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

// Additional detailed desktop service list mapping image_48b1a8.png layout
const desktopExtendedServices = [
  {
    title: "Wedding Catering",
    desc: "Make your big day exceptional with thoughtfully crafted menus, refined presentation, and flawless service hospitality.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" strokeWidth="1.5">
        <circle cx="9" cy="14" r="5" />
        <circle cx="15" cy="14" r="5" />
        <path d="M12 9V5m0 0l-2 2m2-2l2 2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Corporate Catering",
    desc: "From small team board meetings to large scale high-profile multi-day events, we deliver impactful menus that keep your guests focused.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" strokeWidth="1.5">
        <path d="M3 21h18M5 21V7a2 2 0 012-2h10a2 2 0 012 2v14M9 9h2m-2 4h2m2-4h2m-2 4h2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Private Party Catering",
    desc: "Enjoy birthdays, landmark anniversaries, and intimate family gatherings with highly customized menus tailored exactly to your vision.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" strokeWidth="1.5">
        <path d="M12 22a10 10 0 100-20 10 10 0 000 20zM8 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2zm8 0c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2zM6 16c2 3 6 3 8 0" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Live Station Catering",
    desc: "Add theatrical energy to your event layout with live interactive food stations, customized dosa counters, and charcoal grills.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" strokeWidth="1.5">
        <path d="M4 7h16M6 7v10a3 3 0 003 3h6a3 3 0 003-3V7M12 3v4" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Buffet & Plated Service",
    desc: "Whether you require a traditional classic buffet line format or formal beautifully composed multi-course plated dinner menus.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" strokeWidth="1.5">
        <path d="M3 12h18M6 12V6a2 2 0 012-2h8a2 2 0 012 2v6M5 16h14a2 2 0 012 2v2H3v-2a2 2 0 012-2z" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Custom Menu Creation",
    desc: "Got a theme in mind? Our culinary chefs design custom specialized flavor pairings tailored around distinct dietary preferences.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#C9A84C" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6M9 8h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" strokeLinecap="round" />
      </svg>
    )
  },
];

const desktopCarouselImages = [
  { title: "Sweet Delights", url: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=500&auto=format&fit=crop" },
  { title: "Gourmet Starters", url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500&auto=format&fit=crop" },
  { title: "Grand Banquet Table", url: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=500&auto=format&fit=crop" },
  { title: "Salads & Appetizers", url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=500&auto=format&fit=crop" },
  { title: "Signature Mains", url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500&auto=format&fit=crop" }
];

export default function CateringPage() {
  const [activeSlide, setActiveSlide] = useState(0);

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
    <div className="bg-[#05110a] text-white min-h-screen font-sans overflow-x-hidden">

      {/* ═══════════════ MOBILE LAYOUT (BELOW LG) - UNTOUCHED ═══════════════ */}
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


      {/* ═══════════════ DESKTOP LAYOUT (LG & ABOVE) - RE-DESIGNED AS PER IMAGE ═══════════════ */}
      <div className="hidden lg:block w-full">
        
        {/* SECTION 1: HERO CONTAINER (Top Section of image_48b1a8.png) */}
        <div className="relative w-full h-[65vh] min-h-[500px] flex flex-col items-center justify-center text-center px-4 bg-cover bg-center border-b border-white/10"
             style={{ backgroundImage: `linear-gradient(rgba(5, 17, 10, 0.75), rgba(5, 17, 10, 0.85)), url(${foodImage})` }}>
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-4">
            <p className="text-[#D2A74B] uppercase tracking-[0.4em] text-xs font-bold">WELCOME TO LEKOCHI</p>
            <h1 className="text-white font-serif font-light text-5xl xl:text-6xl tracking-wide leading-tight">
              Elevate Your Events with Gourmet Catering
            </h1>
            <div className="w-24 h-[1px] bg-[#D2A74B] mx-auto my-4" />
            <p className="text-[#cccccc] text-sm tracking-widest uppercase max-w-2xl mx-auto opacity-80">
              Delicious Food. Exceptional Service. Memories Worth Savoring.
            </p>
            <div className="pt-6">
              <EnquireBtn className="text-xs px-10 py-4 !rounded-md" />
            </div>
          </div>
          
          {/* Jagged / Torn Paper Mask Effect Emulation at bottom edge of banner image */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#05110a]" 
               style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 95% 70%, 90% 10%, 85% 65%, 80% 20%, 75% 80%, 70% 30%, 65% 75%, 60% 15%, 55% 70%, 50% 25%, 45% 60%, 40% 10%, 35% 80%, 30% 20%, 25% 70%, 20% 15%, 15% 60%, 10% 30%, 5% 75%, 0% 0%)" }}/>
        </div>

        {/* SECTION 2: ABOUT US & ASYMMETRIC MOSAIC GRID (Middle Section of image_48b1a8.png) */}
        <div className="max-w-7xl mx-auto px-8 xl:px-16 py-24 grid grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* Left Block Description */}
          <div className="col-span-6 space-y-6">
            <div className="space-y-1">
              <p className="text-[#D2A74B] uppercase tracking-[0.25em] text-xs font-bold">ABOUT US</p>
              <h2 className="text-white text-3xl xl:text-4xl font-serif font-normal leading-snug">
                Great Catering Goes Beyond <span className="text-[#D2A74B] italic">Delicious Dishes</span>;<br/>It's Built on Outstanding Service.
              </h2>
            </div>
            <div className="w-16 h-[2px] bg-[#D2A74B]" />
            <div className="text-[#cccccc] text-sm xl:text-base leading-relaxed space-y-4 font-light">
              <p>
                LeKochi Café & Kitchen raises the standard of event dining by delivering an unmatched, luxury South Indian culinary blueprint directly to your venue. We honor historic Kerala gastronomy, curating custom culinary experiences that bridge time-tested coastal traditions with striking modern presentations.
              </p>
              <p>
                Our team meticulously oversees every single detail—from sourcing premium, single-origin spices straight from farm networks in India to immaculate plate assembly. Whether managing an intimate home gathering or coordinating high-profile business functions, we execute with absolute structural precision.
              </p>
            </div>
            <div className="pt-2">
              <Link to="/about" className="inline-block border border-[#D2A74B] text-[#D2A74B] px-8 py-3 rounded-md text-xs uppercase font-bold tracking-widest hover:bg-[#D2A74B] hover:text-[#05110a] transition-all duration-300">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Block Mosaic Matrix from image_48b1a8.png */}
          <div className="col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden h-[210px] border border-white/5 shadow-lg">
              <img src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=500&auto=format&fit=crop" 
                   alt="Plating detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div className="bg-[#8b3213] rounded-xl p-8 flex flex-col justify-center items-center text-center border border-white/5 shadow-lg h-[210px]">
              <div className="mb-3 text-[#D2A74B]">
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h4 className="text-white font-serif text-lg tracking-wide">Our Approach to<br/>Reducing Waste</h4>
            </div>

            <div className="bg-[#5c2310] rounded-xl p-6 flex flex-col justify-center items-center text-center border border-white/5 shadow-lg h-[150px]">
              <span className="text-[#D2A74B] uppercase tracking-[0.2em] text-[10px] font-bold mb-1">Opening Hours</span>
              <p className="text-white font-serif text-sm">MON - SAT: 9:00 AM - 11:00 PM</p>
              <p className="text-white/60 text-xs mt-1">Sun: Event bookings only</p>
            </div>

            <div className="rounded-xl overflow-hidden h-[150px] border border-white/5 shadow-lg">
              <img src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=500&auto=format&fit=crop" 
                   alt="Buffet serving setup" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>

        {/* SECTION 3: DETAILED SERVICES MODULE MATRIX (Structured Content Layout from image_48b1a8.png) */}
        <div className="w-full bg-[#030b07] border-y border-white/5 py-24 relative">
          {/* Subtle line background layout accent pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-repeat"
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 48c-2 0-3 1-4 2v4c0 1-1 2-2 2H4c-1 0-2-1-2-2v-4c0-1-1-2-4-2v-4c2 0 3-1 4-2v-4c0-1 1-2 2-2h44c1 0 2 1 2 2v4c0 1 1 2 4 2v4z' fill='%23C9A84C' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />

          <div className="max-w-7xl mx-auto px-8 xl:px-16 relative z-10">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-16">
              <p className="text-[#D2A74B] uppercase tracking-[0.3em] text-xs font-bold">OUR SERVICES</p>
              <h3 className="text-white text-3xl font-serif font-normal">Premium Catering Services for Every Occasion</h3>
              <div className="w-16 h-[1px] bg-[#D2A74B] mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-3 gap-6 xl:gap-8">
              {desktopExtendedServices.map((service, idx) => (
                <div key={idx} className="bg-[#05110a] border border-white/5 rounded-xl p-8 space-y-4 hover:border-[#D2A74B]/30 transition-all duration-300 shadow-xl group">
                  <div className="w-14 h-14 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:bg-[#D2A74B]/10 group-hover:border-[#D2A74B]/30 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white text-lg font-serif tracking-wide">{service.title}</h4>
                    <p className="text-[#b3b3b3] text-xs xl:text-sm leading-relaxed font-light">{service.desc}</p>
                  </div>
                  <div className="pt-2">
                    <Link to="/enquiry" className="inline-flex items-center gap-1.5 text-[#D2A74B] text-xs font-bold uppercase tracking-wider group-hover:underline">
                      Show More 
                      <span className="text-[10px]">&rarr;</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: FOOD PANELS HORIZONTAL PREVIEW CAROUSEL (Bottom Section of image_48b1a8.png) */}
        <div className="max-w-7xl mx-auto px-8 xl:px-16 py-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[#D2A74B] uppercase tracking-[0.25em] text-xs font-bold">VISUAL INSIGHTS</p>
              <h3 className="text-white text-2xl font-serif mt-1">Our Showcase Displays</h3>
            </div>
            
            {/* Nav Arrows */}
            <div className="flex gap-2">
              <button onClick={() => setActiveSlide(prev => prev === 0 ? desktopCarouselImages.length - 4 : prev - 1)}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D2A74B] hover:text-[#05110a] hover:border-[#D2A74B] transition-all">
                &#8592;
              </button>
              <button onClick={() => setActiveSlide(prev => prev >= desktopCarouselImages.length - 4 ? 0 : prev + 1)}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D2A74B] hover:text-[#05110a] hover:border-[#D2A74B] transition-all">
                &#8594;
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 overflow-hidden relative">
            {desktopCarouselImages.slice(activeSlide, activeSlide + 4).map((img, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden h-[300px] border border-white/10 shadow-md group">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/60 text-[10px] uppercase tracking-[0.15em] mb-0.5">LeKochi Catering</p>
                  <p className="text-white font-serif text-sm tracking-wide font-medium">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Shared Ambient luxury background blur glow */}
      <div className="hidden lg:block absolute top-0 left-0 w-[450px] h-[450px] bg-[#c9a84c]/5 blur-[130px] rounded-full pointer-events-none z-0" />
    </div>
  );
}