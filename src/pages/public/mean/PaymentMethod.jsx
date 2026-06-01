import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, CreditCard } from "lucide-react";

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, Rupay",
    icon: CreditCard,
  },
];

export default function PaymentMethod() {
  const navigate = useNavigate();
  const location = useLocation();

  const total = location.state?.total || 0;
  const cart = location.state?.cart || {};
  const allItems = location.state?.allItems || [];

  const [selected, setSelected] = useState("card");

  const handlePlaceOrder = () => {
    navigate("/payment", {
      state: {
        total,
        cart,
        allItems,
        paymentMethod: selected,
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#0a1411] text-yellow-500 flex flex-col">
      <div className="p-5 space-y-6 w-full max-w-md mx-auto flex-1">

        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full text-yellow-500 hover:bg-yellow-950/30 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <h1 className="text-xl font-bold text-yellow-500">
            Payment <span className="text-yellow-600">Process</span>
          </h1>

          <div className="w-10" />
        </div>

        {/* Amount Card */}
        <div className="bg-[#11201b]/40 border border-yellow-600/20 rounded-xl p-4 flex justify-between items-center">
          <span className="text-yellow-600/70 text-sm">Total Payable</span>
          <span className="text-lg font-semibold text-yellow-500">
            ${Number(total).toFixed(2)}
          </span>
        </div>

        {/* Section Label */}
        <h2 className="text-xs font-semibold uppercase tracking-wider text-yellow-600/40 px-1">
          Payment Method
        </h2>

        {/* Payment Options */}
        <div className="space-y-3">
          {PAYMENT_METHODS.map(({ id, label, description, icon: Icon }) => {
            const isSelected = selected === id;
            return (
              <button
                key={id}
                onClick={() => setSelected(id)}
                className={`w-full p-4 rounded-xl flex items-center justify-between transition-all text-left ${
                  isSelected
                    ? "bg-[#11201b]/60 border-2 border-yellow-500 shadow-sm"
                    : "bg-[#11201b]/20 border border-yellow-600/20 hover:border-yellow-600/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-lg transition-colors ${
                      isSelected ? "text-yellow-500" : "text-yellow-600/60"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${isSelected ? "text-yellow-500" : "text-yellow-600/80"}`}>
                      {label}
                    </p>
                    <p className="text-xs text-yellow-600/40 mt-0.5">{description}</p>
                  </div>
                </div>

                {/* Radio indicator */}
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected ? "border-yellow-500 bg-yellow-500" : "border-yellow-600/30 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0a1411]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Place Order */}
        <div className="pb-6 border-t border-yellow-600/10">
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#0a1411] font-bold py-4 px-5 rounded-xl flex items-center justify-center transition-colors"
          >
            <span className="text-sm uppercase tracking-wide">
              Place Order (${Number(total).toFixed(2)})
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}