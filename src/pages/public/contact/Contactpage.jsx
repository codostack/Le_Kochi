import React from 'react';

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-[#041a13] text-[#f5efe6] flex flex-col overflow-hidden">
      
      {/* 1. EDITORIAL HEADER SECTION */}
      <header className="w-full max-w-7xl mx-auto pt-8 px-6">
        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
          {/* Subtle Accent Tagline */}
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-white uppercase mb-3">
            GET IN TOUCH
          </span>
          
          {/* Scaled Down Minimalist Heading */}
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.15em] text-yellow-400 uppercase mb-4">
            Contact Us
          </h1>
          
          {/* Elegant Fine-line Accent Divider */}
          <div className="h-[1px] w-12 bg-yellow-400/30 mb-5"></div>
          
          {/* Low-Density Description Prose */}
          <p className="text-sm md:text-base font-light text-[#b3c7c0] leading-relaxed tracking-wide">
            We'd love to hear from you. Reach out through any of our channels or drop by our kitchen frame.
          </p>
        </div>
      </header>

      {/* 2. MAIN SPLIT SECTION */}
      <div className="flex flex-col md:flex-row flex-1 w-full items-stretch">
        
        {/* Left Column: Contact Details */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 md:p-16 lg:p-24 max-w-xl mx-auto md:mx-0 w-full">
          <div className="flex flex-col gap-8 md:gap-10">
            
            {/* Address */}
            <div className="flex items-start gap-5 group">
              <div className="flex-shrink-0 p-3 bg-[rgba(250,204,21,0.04)] rounded-xl border border-[rgba(250,204,21,0.15)] transition-colors duration-300 group-hover:bg-[rgba(250,204,21,0.12)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110">
                  <circle cx="12" cy="10" r="3" stroke="#facc15" strokeWidth="1.5" />
                  <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 14 8 14s8-8.75 8-14c0-4.42-3.58-8-8-8z" stroke="#facc15" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="flex flex-col pt-1">
                <span className="text-[10px] font-medium text-yellow-400 tracking-[0.18em] uppercase mb-1.5">Our Location</span>
                <span className="text-base font-light leading-relaxed">17 Advance Boulevard,</span>
                <span className="text-base font-light leading-relaxed opacity-70">52-6141 Mayfield road Brampton L7A0C4, Ontario</span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-5 group">
              <div className="flex-shrink-0 p-3 bg-[rgba(250,204,21,0.04)] rounded-xl border border-[rgba(250,204,21,0.15)] transition-colors duration-300 group-hover:bg-[rgba(250,204,21,0.12)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="#facc15" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="flex flex-col pt-1">
                <span className="text-[10px] font-medium text-yellow-400 tracking-[0.18em] uppercase mb-1.5">Call Us</span>
                <span className="text-base font-light tracking-wide hover:text-yellow-400 transition-colors duration-200">
                  <a href="tel:9057940444">9057940444</a>
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-5 group">
              <div className="flex-shrink-0 p-3 bg-[rgba(250,204,21,0.04)] rounded-xl border border-[rgba(250,204,21,0.15)] transition-colors duration-300 group-hover:bg-[rgba(250,204,21,0.12)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#facc15" strokeWidth="1.5" />
                  <path d="M3 7l9 6 9-6" stroke="#facc15" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="flex flex-col pt-1">
                <span className="text-[10px] font-medium text-yellow-400 tracking-[0.18em] uppercase mb-1.5">Email Us</span>
                <span className="text-base font-light tracking-wide hover:text-yellow-400 transition-colors duration-200">
                  <a href="mailto:info@lekochi.ca">info@lekochi.ca</a>
                </span>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-5 group">
              <div className="flex-shrink-0 p-3 bg-[rgba(250,204,21,0.04)] rounded-xl border border-[rgba(250,204,21,0.15)] transition-colors duration-300 group-hover:bg-[rgba(250,204,21,0.12)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110">
                  <circle cx="12" cy="12" r="9" stroke="#facc15" strokeWidth="1.5" />
                  <path d="M12 7v5l3 3" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col pt-1">
                <span className="text-[10px] font-medium text-yellow-400 tracking-[0.18em] uppercase mb-1.5">Opening Hours</span>
                <span className="text-base font-light leading-relaxed">11:00 AM – 11:00 PM</span>
                <span className="text-xs font-light text-[#b3c7c0] opacity-60 mt-0.5">Everyday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Complete Edge-to-Edge Map Frame */}
        <div className="flex-1 w-full h-[350px] md:h-auto min-h-[450px] relative">
          <iframe
            title="LeKochi Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.2834784406243!2d-79.684144323415!3d43.7046467710996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3967d7107777%3A0x6d953a9686036814!2s17%20Advance%20Blvd%2C%20Brampton%2C%20ON%20L6T%204Z6!5e0!3m2!1sen!2sca!4v1714200000000!5m2!1sen!2sca"
            className="absolute inset-0 w-full h-full border-none grayscale-[25%] contrast-[105%] brightness-[90%] hover:grayscale-0 transition-all duration-500 ease-in-out"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}