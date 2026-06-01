import React, { useState } from "react";
import { MapPin, CreditCard, ShieldCheck, ArrowLeft, Wallet, Landmark, Smartphone, QrCode } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const METHOD_META = {
  card:       { label: "Credit / Debit Card", sub: "•••• •••• •••• 5370", Icon: CreditCard },
  upi:        { label: "UPI Payment",          sub: "yourname@upi",        Icon: Smartphone },
  qr:         { label: "Scan & Pay",           sub: "QR code payment",     Icon: QrCode },
  wallet:     { label: "Mobile Wallet",        sub: "Paytm Wallet",        Icon: Wallet },
  netbanking: { label: "Net Banking",          sub: "HDFC Bank",           Icon: Landmark },
};

const SHIPPING = 2.50;

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const total         = location.state?.total         || 0;
  const cart          = location.state?.cart          || {};
  const allItems      = location.state?.allItems      || [];
  const paymentMethod = location.state?.paymentMethod || "card";

  const method = METHOD_META[paymentMethod] || METHOD_META.card;
  const { Icon: MethodIcon } = method;

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState({
    name: "Addison Nelson",
    address: "Muradpur Punjab, Sialkot, Punjab Pakistan",
  });
  const [tempAddress, setTempAddress] = useState(address);

  const handleSaveAddress = () => {
    setAddress(tempAddress);
    setShowAddressModal(false);
  };

  // Build line items from cart + allItems
  const lineItems = Object.entries(cart)
    .map(([id, entry]) => {
      const product = allItems.find((i) => String(i.id) === String(id));
      if (!product || !entry?.qty) return null;
      const unitPrice = Number(product.price) + (entry.extraPrice || 0);
      return {
        id,
        name: product.name,
        image: product.image,
        qty: entry.qty,
        unitPrice,
        lineTotal: unitPrice * entry.qty,
      };
    })
    .filter(Boolean);

  const hasItems = lineItems.length > 0;
  const grandTotal = total + SHIPPING;

  return (
    <>
      {/* Background changed to Brand Green */}
      <div className="min-h-screen w-full bg-[#041a13] text-yellow-400 flex flex-col pt-4 pb-6 ">
        <div className="w-full max-w-md mx-auto p-6 flex-1 flex flex-col">

          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border border-yellow-500/30 flex items-center justify-center hover:bg-white/5 transition-colors text-yellow-400"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="flex-1 text-center font-bold text-lg mr-10 text-yellow-400">
              Order Confirmation
            </h2>
          </div>

          <div className="space-y-5">

            {/* ── Cart Items ── */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase text-yellow-500/70 pl-1">
                Your Order
              </h4>

              {hasItems ? (
                lineItems.map((li) => {
                  const imgSrc =
                    li.image ||
                    `https://placehold.co/80x80/041a13/facc15?text=${encodeURIComponent(li.name)}`;
                  return (
                    <div
                      key={li.id}
                      className="bg-[#0b2920] border border-yellow-500/20 rounded-2xl p-4 flex items-center gap-4 shadow-md"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-yellow-500/30">
                        <img
                          src={imgSrc}
                          alt={li.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-sm text-yellow-100 truncate">
                            {li.name}
                          </h3>
                          <span className="text-xs font-bold text-yellow-400 bg-yellow-500/10 px-2.5 py-0.5 rounded-full border border-yellow-500/30 shrink-0">
                            ×{li.qty}
                          </span>
                        </div>

                        <p className="text-xs text-yellow-500/60 mt-0.5 tabular-nums">
                          ${li.unitPrice.toFixed(2)} each
                        </p>

                        <p className="text-sm font-bold text-yellow-400 mt-1.5 tabular-nums">
                          ${li.lineTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-[#0b2920] border border-yellow-500/20 rounded-2xl p-4 flex items-center justify-between shadow-md">
                  <span className="text-sm text-yellow-500/70">Cart subtotal</span>
                  <span className="font-bold text-yellow-400 tabular-nums">
                    ${Number(total).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* ── Delivery Address ── */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-yellow-500/70 pl-1">
                Delivery Address
              </h4>

              <div className="bg-[#0b2920] border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3 shadow-md">
                <MapPin className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0 text-sm">
                  <p className="font-bold text-yellow-100">{address.name}</p>
                  <p className="text-yellow-500/80 mt-1">{address.address}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setTempAddress(address); setShowAddressModal(true); }}
                  className="text-xs font-semibold text-yellow-400 hover:underline shrink-0"
                >
                  Change
                </button>
              </div>
            </div>

            {/* ── Payment Method ── */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-yellow-500/70 pl-1">
                Payment Method
              </h4>

              <div className="bg-[#0b2920] border border-yellow-500/20 rounded-xl p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <MethodIcon className="w-5 h-5 text-yellow-400 shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold text-yellow-100">{method.label}</p>
                    <p className="text-yellow-500/60 text-xs mt-0.5">{method.sub}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/payment-method", { state: { total, cart, allItems } })}
                  className="text-xs font-semibold text-yellow-400 hover:underline"
                >
                  Change
                </button>
              </div>
            </div>

            {/* ── Billing Summary ── */}
            <div className="pt-4 space-y-3 text-sm border-t border-yellow-500/20">
              <div className="flex justify-between text-yellow-500/80">
                <span>Item Total</span>
                <span className="font-semibold text-yellow-400 tabular-nums">
                  ${Number(total).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-yellow-500/80">
                <span>Shipping Charges</span>
                <span className="font-semibold text-yellow-400 tabular-nums">
                  ${SHIPPING.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between pt-3 border-t border-dashed border-yellow-500/30 text-lg font-bold">
                <span>Grand Total</span>
                <span className="text-yellow-400 tabular-nums">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* ── Confirm Button ── */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-center gap-1.5 text-xs text-yellow-500/60">
                <ShieldCheck className="w-4 h-4 text-yellow-400" />
                <span>Secure 256-bit SSL checkout processing</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("cart");
                  navigate("/payment-successful", {
                    state: {
                      total: grandTotal,
                      paymentMethod,
                    },
                  });
                }}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#041a13] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <span>Confirm & Pay</span>
                <span>•</span>
                <span className="tabular-nums">${grandTotal.toFixed(2)}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b2920] w-full max-w-md rounded-2xl p-5 shadow-2xl border border-yellow-500/20 text-yellow-400">
            <h3 className="font-bold text-lg mb-4 text-yellow-100">Change Delivery Address</h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={tempAddress.name}
                onChange={(e) => setTempAddress({ ...tempAddress, name: e.target.value })}
                className="w-full bg-[#041a13] border border-yellow-500/30 rounded-lg px-3 py-3 outline-none focus:border-yellow-400 text-sm text-yellow-100 placeholder-yellow-500/40"
              />
              <textarea
                rows={4}
                placeholder="Address"
                value={tempAddress.address}
                onChange={(e) => setTempAddress({ ...tempAddress, address: e.target.value })}
                className="w-full bg-[#041a13] border border-yellow-500/30 rounded-lg px-3 py-3 outline-none focus:border-yellow-400 text-sm text-yellow-100 placeholder-yellow-500/40 resize-none"
              />
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex-1 border border-yellow-500/30 py-3 rounded-xl text-sm font-medium text-yellow-400 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                className="flex-1 bg-yellow-400 text-[#041a13] py-3 rounded-xl text-sm font-bold hover:bg-yellow-500 transition-colors"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}