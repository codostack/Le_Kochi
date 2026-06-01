import React from "react";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0a1411] text-yellow-500 flex flex-col pt-4 pb-6">
      
      {/* MOBILE CANVAS FRAME */}
      <div className="w-full max-w-md mx-auto p-6 flex-1 flex flex-col">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between mt-[-10px] mb-8">
          
          {/* Back Arrow → Menu Page */}
          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="p-2 -ml-2 text-yellow-500 hover:bg-[#11201b]/40 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <h1 className="text-xl font-bold text-yellow-500">
            Checkout
          </h1>

          {/* Cart Icon → My Orders */}
          <button
            type="button"
            onClick={() => navigate("/my-orders")}
            className="p-2 -mr-2 text-yellow-500 hover:bg-[#11201b]/40 rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>

        {/* INNER WHITE CARD CONTAINER */}
        <div className="relative   p-8  flex flex-col items-center text-center overflow-hidden">
          
          {/* DECORATIVE ELEMENTS */}
          <div className="absolute top-8 left-12 w-3 h-3 rounded-full bg-blue-500 opacity-80 animate-bounce" />
          <div className="absolute top-16 right-16 w-2.5 h-2.5 rounded-full bg-emerald-500 opacity-80" />
          <div className="absolute top-28 left-8 w-4 h-4 text-blue-400 font-bold select-none rotate-12 text-xl">
            ~
          </div>
          <div className="absolute top-14 right-8 w-5 h-5 text-purple-500 font-bold select-none -rotate-45 text-2xl">
            )
          </div>
          <div className="absolute bottom-36 left-10 w-2.5 h-2.5 rounded-full bg-purple-400" />
          <div className="absolute bottom-40 right-12 w-3 h-3 rounded-full bg-pink-500" />
          <div className="absolute bottom-28 right-8 w-4 h-4 text-blue-500 font-bold select-none rotate-45 text-lg">
            ~
          </div>

          {/* SUCCESS ICON */}
          <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center my-6 shadow-sm shadow-yellow-600/20">
            <svg
              className="w-12 h-12 text-[#0a1411]"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* SUCCESS MESSAGE */}
          <h3 className="text-xl font-bold text-yellow-500 mt-2">
            Payment Successfully
          </h3>

          <p className="text-sm text-yellow-600/60 mt-6 font-medium">
            Thanks for your order
          </p>

          {/* ORDER ID */}
          <p className="text-sm font-bold text-yellow-500 mt-1">
            Order ID:{" "}
            <span className="font-mono text-yellow-600/80">
              IT-ORD-23984XQ7
            </span>
          </p>

          {/* Back to Home */}
          <div className="w-full mt-10 mb-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#0a1411] font-bold py-4 px-6 rounded-2xl transition-colors shadow-md active:scale-[0.99]"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}