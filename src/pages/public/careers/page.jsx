import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const positions = [
  { 
    title: "South Indian Chef", 
    details: "We are seeking an experienced chef skilled in authentic South Indian culinary traditions. Responsible for menu preparation, maintaining kitchen hygiene standards, and ensuring high-quality food presentation."
  },
  { 
    title: "Dosa Master", 
    details: "Looking for a skilled specialist dedicated to crafting perfect dosas, uttapams, and traditional accompaniments. Must be comfortable managing a fast-paced live counter while maintaining crispness and flavor consistency." 
  },
  { 
    title: "Server / Cashier", 
    details: "Join our front-of-house team. Responsibilities include welcoming guests, taking orders accurately, processing transactions swiftly, and delivering an exceptional, warm dining experience." 
  },
  { 
    title: "Kitchen Assistant", 
    details: "Assist our culinary team with daily prep work, ingredient organization, and maintaining kitchen cleanliness. Great opportunity for individuals looking to grow within a professional kitchen environment." 
  },
  { 
    title: "Dishwasher", 
    details: "Essential role focusing on maintaining clean tableware, utensils, and cooking equipment. Helps ensure the kitchen runs smoothly by adhering to safety and sanitization guidelines." 
  },
  { 
    title: "Social Media Coordinator", 
    details: "Manage our digital presence by creating engaging content, capturing kitchen highlights, and interacting with our online community. Perfect for a creative storyteller passionate about food." 
  },
];

const CareersPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleEnquiry = (e, title) => {
    e.stopPropagation();
    navigate("/career-form", {
      state: {
        position: title,
      },
    });
  };

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
        <div className="absolute rounded-full hidden md:block" style={{ width: 120, height: 120, background: "#1e3d22", top: "10%", left: "60%", opacity: 0.15, filter: "blur(40px)" }} />
        <div className="absolute rounded-full hidden md:block" style={{ width: 90, height: 90, background: "#4a7050", top: "50%", right: "5%", opacity: 0.12, filter: "blur(32px)" }} />
      </div>

      {/* Radial glow overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "#05110a" }} />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col flex-1">

        {/* ── DESKTOP LAYOUT (md+) ── */}
        <div className="hidden md:flex flex-col flex-1 px-16 py-12">
          {/* Header */}
          <div className="flex items-start justify-between mb-10 gap-10">
            <div className="max-w-2xl">
              <h1 className="text-[#c5a059] font-serif text-4xl tracking-widest mb-1">Careers</h1>
              <p className="text-white font-serif text-base tracking-widest opacity-80">Join Our Team</p>
              <div className="w-10 h-0.5 mt-4 mb-4" style={{ background: "#c5a059", opacity: 0.6 }} />
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Build your future with LeKochi. We believe that exceptional dining experiences start with an exceptional team. Our workspace brings together individuals dedicated to culinary innovation, outstanding hospitality, and heritage flavors.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Whether you are crafting regional delicacies behind the live counters or elevating the guest journey out front, you will discover an inclusive collaborative culture built on mutual respect and creative freedom.
              </p>
            </div>
            {/* Stats */}
            <div className="flex gap-10 mt-2 flex-shrink-0">
              {[{ num: "6", label: "Open roles" }, { num: "5★", label: "Team culture" }, { num: "∞", label: "Growth" }].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-[#c5a059] font-serif text-3xl font-semibold">{s.num}</div>
                  <div className="text-white/50 text-[10px] tracking-widest uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-2 gap-10 flex-1">
            {/* Left Image */}
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

            {/* Right Interactive List */}
            <div className="flex flex-col">
              <h3 className="text-[#C5A358] text-[10px] tracking-[0.3em] font-bold uppercase mb-4">
                Open Positions
              </h3>
              <div
                className="rounded-2xl border border-white/[0.08] overflow-y-auto max-h-[420px] flex-1"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
              >
                {positions.map((job, index) => {
                  const isExpanded = expandedIndex === index;
                  return (
                    <div 
                      key={index} 
                      onClick={() => toggleExpand(index)}
                      className={`px-5 group cursor-pointer transition-colors ${isExpanded ? "bg-[#c5a059]/[0.05]" : "hover:bg-[#c5a059]/[0.04]"}`}
                    >
                      <div className={`py-[18px] ${index !== positions.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-200 font-medium tracking-wide text-sm">{job.title}</span>
                          <ChevronRight className={`w-4 h-4 text-[#C5A358] opacity-80 transition-transform duration-300 ${isExpanded ? "rotate-90" : "group-hover:translate-x-1"}`} />
                        </div>
                        <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-56 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                          <p className="text-gray-400 text-xs leading-relaxed pl-3 border-l border-[#c5a059]/30">
                            {job.details}
                          </p>
                          <div className="pl-3 mt-3">
                            <button
                              onClick={(e) => handleEnquiry(e, job.title)}
                              className="px-4 py-1.5 rounded-lg border border-[#c5a059]/40 text-[#c5a059] font-medium text-[11px] tracking-wider uppercase transition-all duration-200 hover:bg-[#c5a059] hover:text-[#05110a]"
                            >
                              Enquiry Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE LAYOUT (md-) ── */}
        <div className="flex md:hidden flex-col flex-1">
          <header className="pt-10 pb-6 text-center flex-shrink-0 px-6">
            <h1 className="text-[#c5a059] font-serif text-2xl tracking-widest">Careers</h1>
            <p className="text-white font-serif text-sm mt-0.5 tracking-widest opacity-80">Join Our Team</p>
            <p className="text-gray-300 text-sm leading-relaxed mt-3">
              Build your future with LeKochi. We believe in passion, growth, and great teamwork. Here, we don't just craft meals; we celebrate heritage.
            </p>
          </header>

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

          <main className="flex-1 flex flex-col px-6 pt-8 pb-20 overflow-y-auto">
            <h3 className="text-[#C5A358] text-[10px] tracking-[0.3em] font-bold text-center mb-4 uppercase">
              Open Positions
            </h3>
            <div
              className="rounded-2xl border border-white/[0.08] overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            >
              {positions.map((job, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <div 
                    key={index} 
                    onClick={() => toggleExpand(index)}
                    className={`px-4 active:bg-[#05110a] transition-colors ${isExpanded ? "bg-[#c5a059]/[0.03]" : ""}`}
                  >
                    <div className={`py-3.5 ${index !== positions.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-200 font-medium tracking-wide text-sm">{job.title}</span>
                        <ChevronRight className={`w-4 h-4 text-[#C5A358] opacity-80 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                      </div>
                      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-56 mt-2 opacity-100" : "max-h-0 opacity-0"}`}>
                        <p className="text-gray-400 text-xs leading-relaxed pl-3 border-l border-[#c5a059]/30">
                          {job.details}
                        </p>
                        <div className="pl-3 mt-3">
                          <button
                            onClick={(e) => handleEnquiry(e, job.title)}
                            className="px-4 py-1.5 rounded-lg border border-[#c5a059]/40 text-[#c5a059] font-medium text-[11px] tracking-wider uppercase bg-[#c5a059]/5"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>

      </div>
    </div>
  );
};

export default CareersPage;