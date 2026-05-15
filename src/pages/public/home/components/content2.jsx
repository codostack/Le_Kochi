import React from "react";
import { Play, CheckCircle, MessageCircle } from "lucide-react";

export default function Headercontent3() {
  return (
    <section className="w-full bg-black py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* LEFT CARD */}
        <div className="relative rounded-3xl overflow-hidden border border-[#5a3b13] bg-black min-h-[360px]">
          
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1400&auto=format&fit=crop"
            alt="Live Kitchen"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 p-7 flex flex-col h-full">
            <div>
              <h2 className="text-[#f5b22e] text-3xl font-bold uppercase leading-tight">
                Live Kitchen.
                <br />
                Fresh Everyday.
              </h2>

              <p className="text-white/90 text-lg leading-8 mt-5 max-w-[260px]">
                From our live dosa counter to our chai, everything is made
                fresh, just the way it should be.
              </p>
            </div>

            {/* Button */}
            <div className="mt-auto pt-6">
              <button className="flex items-center gap-2 border border-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 uppercase tracking-wider text-sm">
                Watch Video
                <Play size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* CENTER CARD */}
        <div className="rounded-3xl border border-[#5a3b13] bg-black p-7 flex flex-col items-center justify-center text-center min-h-[360px]">

          <h2 className="text-[#f5b22e] text-3xl font-bold uppercase leading-tight">
            Join LeKochi Connect
          </h2>

          <p className="text-white uppercase text-sm tracking-wide mt-3">
            Exclusive Offers, Events, Updates.
          </p>

          {/* QR Box */}
          <div className="bg-white p-4 rounded-xl mt-7">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://wa.me/919999999999"
              alt="QR Code"
              className="w-[170px] h-[170px]"
            />
          </div>

          <p className="text-white text-xl font-semibold uppercase mt-6 leading-9">
            Scan & Join
            <br />
            WhatsApp Community
          </p>

          {/* Button */}
          <button className="mt-7 flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl uppercase tracking-wider font-semibold transition-all duration-300">
            <MessageCircle size={20} />
            Join Now
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="relative rounded-3xl overflow-hidden border border-[#5a3b13] bg-black min-h-[360px]">

          {/* Background */}
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1400&auto=format&fit=crop"
            alt="Catering"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"></div>

          {/* Content */}
          <div className="relative z-10 p-7 flex flex-col h-full">
            <div>
              <h2 className="text-[#f5b22e] text-3xl font-bold uppercase leading-tight max-w-[340px]">
                Catering & Events
                <br />
                For Every Occasion
              </h2>

              <p className="text-white/90 text-lg leading-8 mt-5 max-w-[320px]">
                From small gatherings to corporate events, we serve authentic
                Kerala flavours that leave a lasting impression.
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3">
                {[
                  "Corporate Catering",
                  "Private Events",
                  "Birthday Parties",
                  "Weddings & More",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-white text-base"
                  >
                    <CheckCircle
                      size={18}
                      className="text-red-600 fill-red-600"
                    />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="mt-auto pt-7">
              <button className="border border-[#f5b22e] text-[#f5b22e] px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-[#f5b22e] hover:text-black transition-all duration-300 text-sm">
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}