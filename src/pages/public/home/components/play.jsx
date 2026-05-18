import React from 'react';

const LeKochiDownloadBanner = () => {
  return (
    /* REMOVED UNWANTED SPACE:
       Changed 'min-h-screen' to 'h-auto' and adjusted padding.
       The component now takes up only its exact content height.
    */
    <div className="w-full h-auto bg-black text-zinc-100 font-sans px-4 pb-24 select-none flex items-center justify-center">
      
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden">
        
        {/* Subtle Ambient Background Highlight Accent */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Promotion Copy */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 leading-tight mb-2">
          Start your free trial.
          <span className="block mt-1 text-yellow-400 font-black">
            Join Le Kochi @ ₹0
          </span>
        </h2>

        {/* Call to Action App Store Buttons */}
        <div className="mt-6 flex flex-col gap-3.5 px-2">
          
          {/* iOS App Store Button */}
          <button className="w-full h-12 bg-neutral-900 border border-zinc-800 rounded-full flex items-center justify-center gap-3 shadow-inner group active:bg-neutral-800/80 transition-colors">
            <svg className="w-5 h-5 text-yellow-400 group-hover:scale-105 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94 1.07.08 2.16-.52 2.82-1.33z" />
            </svg>
            <span className="text-xs sm:text-sm font-bold tracking-wide text-zinc-300">
              Download on App Store
            </span>
          </button>

          {/* Android Play Store Button */}
          <button className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center gap-3 shadow-inner group active:bg-zinc-800/80 transition-colors">
            <svg className="w-4 h-4 text-yellow-400 group-hover:scale-105 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.783 12 3.609 22.186c-.181.181-.29.423-.29.685 0 .526.425.952.952.952.122 0 .242-.023.355-.069l14.991-7.221c.84-.404 1.383-1.258 1.383-2.193 0-.935-.543-1.789-1.383-2.193L4.626.338c-.113-.046-.233-.069-.355-.069-.527 0-.952.426-.952.952 0 .262.11.504.29.685z" />
            </svg>
            <span className="text-xs sm:text-sm font-bold tracking-wide text-zinc-300">
              Download on Play Store
            </span>
          </button>
          
        </div>
      </div>

    </div>
  );
};

export default LeKochiDownloadBanner;