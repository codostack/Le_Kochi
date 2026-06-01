import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  FileText, 
  Bike, 
  ShieldCheck, 
  MapPin,
  ArrowRight
} from 'lucide-react';

export default function FoodCart() {
  // Mock State for Cart Items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chicken Peri Peri Double Patty Burger",
      type: "non-veg", 
      price: 249,
      quantity: 1,
      customization: "Extra Cheese, Whole Wheat Bun"
    },
    {
      id: 2,
      name: "Criss Cut Salted Fries (Large)",
      type: "veg",
      price: 120,
      quantity: 2,
      customization: "With Peri Peri Dip"
    }
  ]);

  const [cookingInstruction, setCookingInstruction] = useState("");

  // Quantity Handlers
  const updateQuantity = (id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  // Calculations
  const itemTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = itemTotal > 0 ? 35 : 0;
  const platformFee = itemTotal > 0 ? 5 : 0;
  const gstAndRestaurantCharges = itemTotal > 0 ? Math.round(itemTotal * 0.05) : 0;
  const grandTotal = itemTotal + deliveryFee + platformFee + gstAndRestaurantCharges;

  return (
    <div className="min-h-screen bg-[#041a13] text-white font-sans antialiased pb-12">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#041a13]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-5 h-5 text-yellow-400" />
            <h1 className="text-lg font-bold tracking-tight">Secure Checkout</h1>
          </div>
          <span className="text-xs bg-zinc-800 text-zinc-300 font-medium px-2.5 py-1 rounded-full">
            {cartItems.reduce((sum, i) => sum + i.quantity, 0)} Items Selected
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Items & Customizations */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Restaurant Header Summary */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Burger Lounge</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Town Centre, Palakkad</p>
            </div>
            <span className="text-xs font-semibold text-yellow-400 cursor-pointer hover:underline">
              + Add More Items
            </span>
          </div>

          {/* Cart Items Card */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 space-y-5">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-zinc-500 text-sm">Your cart is empty</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-start justify-between space-x-4 pb-4 border-b border-zinc-800/50 last:border-0 last:pb-0">
                  {/* Indicator & Details */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`w-3 h-3 flex items-center justify-center border text-[8px] font-bold rounded-sm ${item.type === 'veg' ? 'border-emerald-600 text-emerald-500' : 'border-red-600 text-red-500'}`}>
                        ●
                      </span>
                      <h3 className="text-sm font-bold text-zinc-100 line-clamp-2 leading-snug">{item.name}</h3>
                    </div>
                    {item.customization && (
                      <p className="text-[11px] text-zinc-400 italic pl-5">{item.customization}</p>
                    )}
                    <p className="text-sm font-bold text-yellow-400 pl-5 mt-1">₹{item.price * item.quantity}</p>
                  </div>

                  {/* Quantity Modifier Controller */}
                  <div className="flex items-center bg-zinc-950 border border-zinc-700/60 rounded-lg overflow-hidden h-8 shrink-0 shadow-inner">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2.5 h-full hover:bg-zinc-900 text-zinc-400 hover:text-yellow-400 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold font-mono text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2.5 h-full hover:bg-zinc-900 text-zinc-400 hover:text-yellow-400 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cooking Instructions Input */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4">
            <div className="flex items-center space-x-2 text-zinc-300 text-sm font-bold mb-2">
              <FileText className="w-4 h-4 text-yellow-400" />
              <label htmlFor="instructions">Cooking Instructions</label>
            </div>
            <input 
              id="instructions"
              type="text" 
              placeholder="e.g., Make it extra spicy, Don't add onions, Leave at door..." 
              value={cookingInstruction}
              onChange={(e) => setCookingInstruction(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-yellow-400/50 rounded-xl px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Right Column: Address, Bill Summary & Main Action */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active Target Address Info Card */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Delivery Location</h3>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">Home</p>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  42, Orchid Elegance, Near Central Park, Palakkad, Kerala - 678001
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Bill Summary Card */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 space-y-4">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Bill Details</h3>
              
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span className="font-mono">₹{itemTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center space-x-1">
                    <span>Delivery Fee</span>
                    <Bike className="w-3.5 h-3.5 text-zinc-500" />
                  </span>
                  <span className="font-mono">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="font-mono">₹{platformFee}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-zinc-800/60">
                  <span>GST & Restaurant Charges</span>
                  <span className="font-mono">₹{gstAndRestaurantCharges}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-sm font-bold text-white">To Pay</span>
                <span className="text-lg font-black text-yellow-400 font-mono">₹{grandTotal}</span>
              </div>
            </div>

            {/* Main Action Proceed Button integrated directly inside the card */}
            <button 
              disabled={cartItems.length === 0}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.99] flex items-center justify-center space-x-2"
            >
              <span>Proceed to Pay</span>
              <span className="font-mono bg-black/10 px-2 py-0.5 rounded text-xs">₹{grandTotal}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Cancellation Policy note */}
          <div className="p-3 bg-zinc-950/40 border border-zinc-900 rounded-xl flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-zinc-500 leading-normal">
              Orders cannot be cancelled once packed or accepted by the restaurant. Kindly verify your items and address before proceeding to pay.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}