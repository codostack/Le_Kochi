import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '', 
    name: '',      
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <section className="min-h-screen bg-[#041a13] text-[#f5efe6] flex flex-col overflow-hidden font-sans">
      
      {/* ==========================================================
          1. HEADER BANNER SECTION
         ========================================================== */}
      <header className="w-full relative">
        {/* Mobile Header Structure */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto pt-8 px-6 md:hidden">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-white uppercase mb-3">
            GET IN TOUCH
          </span>
          <h1 className="text-2xl font-light tracking-[0.15em] text-yellow-400 uppercase mb-4">
            Contact Us
          </h1>
          <div className="h-[1px] w-12 bg-yellow-400/30 mb-5"></div>
          <p className="text-sm font-light text-[#b3c7c0] leading-relaxed tracking-wide">
            We'd love to hear from you. Reach out through any of our channels or drop by our kitchen frame.
          </p>
        </div>

        {/* Desktop Header Banner Structure */}
        <div className="hidden md:block w-full h-[320px] relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600" 
            alt="LeKochi Kitchen Backdrop" 
            className="w-full h-full object-cover brightness-[0.25] contrast-[105%]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-xs font-semibold tracking-[0.3em] text-yellow-400 uppercase mb-4">
              GET IN TOUCH
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Contact <span className="font-light text-yellow-400">Us</span>
            </h1>
            <div className="h-[2px] w-16 bg-yellow-400/50 mb-6"></div>
            <p className="text-sm lg:text-base text-[#b3c7c0] max-w-2xl leading-relaxed font-light">
              We would love to hear from you. Reach out through any of our channels or drop by our kitchen frame.
            </p>
          </div>
        </div>
      </header>


      {/* ==========================================================
          2. CORE CONTENT WRAPPER (DESKTOP)
         ========================================================== */}
      <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 max-w-[95rem] w-full mx-auto px-8 lg:px-16 xl:px-20 py-16 bg-[#041a13]">
        
        {/* LEFT COLUMN: 2x2 Grid + Stretched Map Frame */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-6 h-full">
          
          {/* 2x2 Info Grid */}
          <div className="grid grid-cols-2 gap-4 xl:gap-5">
            
            {/* Card: Phone */}
            <div className="bg-[#06261c] p-5 lg:p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center shadow-md hover:border-yellow-400/20 transition-all duration-300 aspect-[1.15/1]">
              <div className="text-yellow-400 mb-3 p-2.5 bg-yellow-400/5 rounded-xl border border-yellow-400/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1 tracking-wide">Phone</h3>
              <p className="text-[11px] text-[#b3c7c0] font-light tracking-wider">905-794-0444</p>
            </div>

            {/* Card: Whatsapp */}
            <div className="bg-[#06261c] p-5 lg:p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center shadow-md hover:border-yellow-400/20 transition-all duration-300 aspect-[1.15/1]">
              <div className="text-yellow-400 mb-3 p-2.5 bg-yellow-400/5 rounded-xl border border-yellow-400/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1 tracking-wide">Whatsapp</h3>
              <p className="text-[11px] text-[#b3c7c0] font-light tracking-wider">905-794-0444</p>
            </div>

            {/* Card: Email */}
            <div className="bg-[#06261c] p-5 lg:p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center shadow-md hover:border-yellow-400/20 transition-all duration-300 aspect-[1.15/1]">
              <div className="text-yellow-400 mb-3 p-2.5 bg-yellow-400/5 rounded-xl border border-yellow-400/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1 tracking-wide">Email</h3>
              <p className="text-[11px] text-[#b3c7c0] font-light tracking-wide break-all">info@lekochi.ca</p>
            </div>

            {/* Card: Our Kitchen */}
            <div className="bg-[#06261c] p-5 lg:p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center shadow-md hover:border-yellow-400/20 transition-all duration-300 aspect-[1.15/1]">
              <div className="text-yellow-400 mb-3 p-2.5 bg-yellow-400/5 rounded-xl border border-yellow-400/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 14 8 14s8-8.75 8-14c0-4.42-3.58-8-8-8z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1 tracking-wide">Our Kitchen</h3>
              <p className="text-[11px] text-[#b3c7c0] font-light leading-relaxed">17 Advance Blvd, Brampton, ON</p>
            </div>

          </div>

          {/* Map Frame Container */}
          <div className="w-full flex-grow min-h-[220px] relative rounded-2xl overflow-hidden border border-white/5 shadow-inner">
            <iframe
              title="LeKochi Location Dark Desktop View"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.2834784406243!2d-79.684144323415!3d43.7046467710996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3967d7107777%3A0x6d953a9686036814!2s17%20Advance%20Blvd%2C%20Brampton%2C%20ON%20L6T%204Z6!5e0!3m2!1sen!2sca!4v1714200000000!5m2!1sen!2sca"
              className="absolute inset-0 w-full h-full border-none grayscale-[40%] contrast-[110%] brightness-[80%] hover:grayscale-0 transition-all duration-500"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        {/* RIGHT COLUMN: Messaging Input Form Layout + Enhanced Paragraph Content */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-between h-full">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-yellow-400 uppercase mb-1 block">
              LETS SEND A MESSAGE
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-white tracking-wide mb-3">
              Get In <span className="text-yellow-400 font-semibold">Touch</span>
            </h2>
            
            {/* Rich, extended brand copy specifically tailoring Le Kochi Cafe's message */}
            <div className="text-xs text-[#b3c7c0]/80 space-y-3 mb-6 leading-relaxed font-light max-w-2xl">
              <p>
                Have a question about our menu, looking to plan a specialized corporate event, or want to bring the authentic craft flavors of <span className="text-yellow-400 font-medium">Le Kochi Café</span> to your next catering gathering? Drop us a line below. Our dedicated culinary team in Brampton is ready to coordinate your arrangements flawlessly.
              </p>
              <p>
                Your feedback keeps our kitchen inspired. Fill out the safe message frame below, and a member of our management crew will get back to you within 24 business hours. *
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-white/80 uppercase tracking-widest">Name *</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name..." 
                className="w-full bg-[#06261c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-yellow-400/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-white/80 uppercase tracking-widest">Email *</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="info@lekochi.ca" 
                className="w-full bg-[#06261c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-yellow-400/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-white/80 uppercase tracking-widest">Subject</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject Line..." 
                className="w-full bg-[#06261c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-yellow-400/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-white/80 uppercase tracking-widest">Message *</label>
              <textarea 
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type your message here..." 
                className="w-full bg-[#06261c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-yellow-400/40 transition-colors resize-none"
              />
            </div>

            <button 
              type="submit" 
              className="w-full sm:w-48 bg-[#128a70] hover:bg-[#1abc9c] text-white text-[11px] font-bold tracking-widest uppercase py-3.5 rounded-xl shadow-lg transition-all duration-300 hover:translate-y-[-1px] active:translate-y-[0px] mt-1"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>

      {/* ==========================================================
          3. MOBILE ONLY VIEWPORT CONTAINER
         ========================================================== */}
      <div className="md:hidden w-full flex flex-col">
        <div className="flex flex-col justify-center px-6 py-12 max-w-xl mx-auto w-full">
          <div className="flex flex-col gap-8">
            {/* Address Row */}
            <div className="flex items-start gap-5 group">
              <div className="flex-shrink-0 p-3 bg-[rgba(250,204,21,0.04)] rounded-xl border border-[rgba(250,204,21,0.15)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

            {/* Phone Row */}
            <div className="flex items-start gap-5 group">
              <div className="flex-shrink-0 p-3 bg-[rgba(250,204,21,0.04)] rounded-xl border border-[rgba(250,204,21,0.15)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="#facc15" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="flex flex-col pt-1">
                <span className="text-[10px] font-medium text-yellow-400 tracking-[0.18em] uppercase mb-1.5">Call Us</span>
                <span className="text-base font-light tracking-wide text-white">
                  <a href="tel:9057940444">9057940444</a>
                </span>
              </div>
            </div>

            {/* Email Row */}
            <div className="flex items-start gap-5 group">
              <div className="flex-shrink-0 p-3 bg-[rgba(250,204,21,0.04)] rounded-xl border border-[rgba(250,204,21,0.15)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#facc15" strokeWidth="1.5" />
                  <path d="M3 7l9 6 9-6" stroke="#facc15" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="flex flex-col pt-1">
                <span className="text-[10px] font-medium text-yellow-400 tracking-[0.18em] uppercase mb-1.5">Email Us</span>
                <span className="text-base font-light tracking-wide text-white">
                  <a href="mailto:info@lekochi.ca">info@lekochi.ca</a>
                </span>
              </div>
            </div>

            {/* Hours Row */}
            <div className="flex items-start gap-5 group">
              <div className="flex-shrink-0 p-3 bg-[rgba(250,204,21,0.04)] rounded-xl border border-[rgba(250,204,21,0.15)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

        {/* Mobile Map */}
        <div className="w-full h-[350px] relative mt-4">
          <iframe
            title="LeKochi Location Mobile View Segment"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.2834784406243!2d-79.684144323415!3d43.7046467710996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3967d7107777%3A0x6d953a9686036814!2s17%20Advance%20Blvd%2C%20Brampton%2C%20ON%20L6T%204Z6!5e0!3m2!1sen!2sca!4v1714200000000!5m2!1sen!2sca"
            className="absolute inset-0 w-full h-full border-none grayscale-[25%] contrast-[105%] brightness-[90%]"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

    </section>
  );
}