import React from "react";
import { ChevronRight } from "lucide-react";

const positions = [
  { title: "South Indian Chef", type: "Full-time" },
  { title: "Dosa Master", type: "Full-time" },
  { title: "Server / Cashier", type: "Part-time" },
  { title: "Kitchen Assistant", type: "Full-time" },
  { title: "Dishwasher", type: "Part-time" },
  { title: "Social Media Coordinator", type: "Remote" },
];

const CareersPage = () => {
  return (
    <div
      className="min-h-screen w-full text-white flex flex-col font-sans overflow-hidden relative"
      style={{ background: "#05110a" }}
    >
      {/* Bokeh blur blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute rounded-full" style={{ width: 90, height: 90, background: "#05110a", top: "8%", left: "10%", opacity: 0.22, filter: "blur(28px)" }} />
        <div className="absolute rounded-full" style={{ width: 60, height: 60, background: "#05110a", top: "15%", left: "55%", opacity: 0.15, filter: "blur(22px)" }} />
        <div className="absolute rounded-full" style={{ width: 50, height: 50, background: "#05110a", top: "40%", left: "75%", opacity: 0.18, filter: "blur(20px)" }} />
        <div className="absolute rounded-full" style={{ width: 80, height: 80, background: "#1e3d22", top: "55%", left: "5%", opacity: 0.2, filter: "blur(26px)" }} />
        <div className="absolute rounded-full" style={{ width: 45, height: 45, background: "#4a7050", top: "70%", left: "60%", opacity: 0.14, filter: "blur(18px)" }} />
        <div className="absolute rounded-full" style={{ width: 70, height: 70, background: "#253d28", top: "80%", left: "30%", opacity: 0.16, filter: "blur(24px)" }} />
        <div className="absolute rounded-full" style={{ width: 35, height: 35, background: "#05110a", top: "25%", left: "35%", opacity: 0.1, filter: "blur(16px)" }} />
        {/* Extra blobs for desktop only */}
        <div className="absolute rounded-full hidden md:block" style={{ width: 120, height: 120, background: "#1e3d22", top: "10%", left: "60%", opacity: 0.15, filter: "blur(40px)" }} />
        <div className="absolute rounded-full hidden md:block" style={{ width: 90, height: 90, background: "#4a7050", top: "50%", right: "5%", opacity: 0.12, filter: "blur(32px)" }} />
      </div>

      {/* Radial glow overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "#05110a" }} />

      {/* All content above bg layers */}
      <div className="relative z-10 flex flex-col flex-1">

        {/* ── DESKTOP LAYOUT (md+) ── */}
        <div className="hidden md:flex flex-col flex-1 px-16 py-12">
          {/* Desktop Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-[#c5a059] font-serif text-4xl tracking-widest mb-1">Careers</h1>
              <p className="text-white font-serif text-base tracking-widest opacity-80">Join Our Team</p>
              <div className="w-10 h-0.5 mt-4 mb-4" style={{ background: "#c5a059", opacity: 0.6 }} />
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                Build your future with LeKochi. We believe in passion, growth and great teamwork.
              </p>
            </div>
            {/* Stats */}
            <div className="flex gap-10 mt-2">
              {[{ num: "6", label: "Open roles" }, { num: "5★", label: "Team culture" }, { num: "∞", label: "Growth" }].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-[#c5a059] font-serif text-3xl font-semibold">{s.num}</div>
                  <div className="text-white/50 text-[10px] tracking-widest uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Two-column */}
          <div className="grid grid-cols-2 gap-10 flex-1">
            {/* Left: Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ minHeight: 360 }}>
              <img
                src="https://www.shutterstock.com/image-photo/confident-man-head-chef-posing-600nw-2577981885.jpg"
                alt="LeKochi Culinary Team"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(20%) contrast(110%) brightness(70%)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/70 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[10px] text-[#c5a059] tracking-[0.3em] uppercase font-bold mb-1">Our Kitchen</p>
                <p className="text-white text-lg font-serif">Where passion meets plate</p>
              </div>
            </div>

            {/* Right: Positions */}
            <div className="flex flex-col">
              <h3 className="text-[#C5A358] text-[10px] tracking-[0.3em] font-bold uppercase mb-4">
                Open Positions
              </h3>
              <div
                className="rounded-2xl border border-white/[0.08] overflow-hidden flex-1"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
              >
                {positions.map((job, index) => (
                  <div key={index} className="px-5 group cursor-pointer hover:bg-[#c5a059]/[0.07] transition-colors">
                    <div className={`flex items-center justify-between py-[18px] ${index !== positions.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                      <span className="text-gray-200 font-medium tracking-wide text-sm">{job.title}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/20 rounded-full px-3 py-0.5">
                          {job.type}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#C5A358] opacity-80 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="mt-5 w-full py-3.5 rounded-xl text-[#05110a] font-bold text-xs tracking-widest uppercase transition-colors"
                style={{ background: "#c5a059" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#d4b070")}
                onMouseLeave={e => (e.currentTarget.style.background = "#c5a059")}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE LAYOUT (unchanged) ── */}
        <div className="flex md:hidden flex-col flex-1">
          {/* Header Section */}
          <header className="pt-10 pb-6 text-center flex-shrink-0">
            <h1 className="text-[#c5a059] font-serif text-2xl tracking-widest">Careers</h1>
            <p className="text-white font-serif text-sm mt-0.5 tracking-widest opacity-80">Join Our Team</p>
            <p className="text-gray-300 text-sm leading-relaxed px-10 mt-3">
              Build your future with LeKochi.
              <br />
              We believe in passion, growth
              <br />
              and great teamwork.
            </p>
          </header>

          {/* Team Image Section */}
          <div className="px-4 flex-shrink-0">
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://www.shutterstock.com/image-photo/confident-man-head-chef-posing-600nw-2577981885.jpg"
                alt="LeKochi Culinary Team"
                className="w-full h-48 object-cover grayscale-[20%] contrast-[110%] brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/60 to-transparent" />
            </div>
          </div>

          {/* Open Positions Section */}
          <main className="flex-1 flex flex-col px-6 pt-8 pb-20 overflow-y-auto">
            <h3 className="text-[#C5A358] text-[10px] tracking-[0.3em] font-bold text-center mb-4 uppercase">
              Open Positions
            </h3>
            <div
              className="rounded-2xl border border-white/[0.08] overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            >
              {positions.map((job, index) => (
                <div key={index} className="px-4 group cursor-pointer active:bg-[#05110a] transition-colors">
                  <div className={`flex items-center justify-between py-2 ${index !== positions.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                    <span className="text-gray-200 font-medium tracking-wide text-sm">{job.title}</span>
                    <ChevronRight className="w-4 h-4 text-[#C5A358] opacity-80 group-active:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

      </div>
    </div>
  );
};

export default CareersPage;