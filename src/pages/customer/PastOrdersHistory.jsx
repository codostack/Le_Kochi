import React, { useState } from 'react';
import {
    ArrowLeft,
    ShoppingBag,
    CheckCircle2,
    ChevronRight,
    RotateCcw,
    Star,
    Search
} from 'lucide-react';

export default function PastOrdersHistory() {
    const [searchQuery, setSearchQuery] = useState('');

    // Comprehensive mock data tracking past order items and states
    const pastOrders = [
        {
            id: "ORD-8740219",
            restaurant: "Burger Lounge",
            branch: "Town Centre, Palakkad",
            date: "May 28, 2026",
            time: "08:54 PM",
            amount: 450,
            items: [
                { name: "Chicken Peri Peri Double Patty Burger", qty: 1 },
                { name: "Criss Cut Salted Fries (Large)", qty: 1 }
            ],
            status: "Delivered",
            rating: 5
        },
        {
            id: "ORD-8610492",
            restaurant: "Arabian Treat",
            branch: "Chandranagar, Palakkad",
            date: "May 24, 2026",
            time: "01:32 PM",
            amount: 620,
            items: [
                { name: "Full Chicken Al Faham", qty: 1 },
                { name: "Rumali Roti", qty: 3 },
                { name: "Mint Mayo Dip", qty: 1 }
            ],
            status: "Delivered",
            rating: null
        },
        {
            id: "ORD-8401957",
            restaurant: "Nila Bakers & Restaurant",
            branch: "College Road, Palakkad",
            date: "May 18, 2026",
            time: "09:20 PM",
            amount: 310,
            items: [
                { name: "Choice Kappa Biriyani", qty: 2 },
                { name: "Layered Kerala Parotta", qty: 1 }
            ],
            status: "Delivered",
            rating: 4
        }
    ];

    // Filter history based on search typing inputs (restaurant name or specific item)
    const filteredOrders = pastOrders.filter(order =>
        order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-[#041a13] text-white font-sans antialiased pb-12">

            {/* Sticky Header Block Bar */}
            <header className="sticky top-0 z-40 bg-[#041a13]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-4">
                <div className="max-w-xl mx-auto flex items-center space-x-4">
                    <button
                        onClick={() => window.history.back()}
                        className="p-2 -ml-2 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-yellow-400 rounded-full transition-colors"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">Past Orders</h1>
                        <p className="text-xs text-zinc-400">View and repeat your previous meals</p>
                    </div>
                </div>
            </header>

            {/* Filter Search Field Row */}
            <section className="max-w-xl mx-auto px-4 mt-6">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-400 transition-colors">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by dishes or restaurant names..."
                        className="w-full bg-zinc-900/50 border border-zinc-800/80 focus:border-yellow-400/50 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
                    />
                </div>
            </section>

            {/* Main Stream Order History Cards Area */}
            <main className="max-w-xl mx-auto px-4 mt-6 space-y-4">

                {filteredOrders.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500 text-sm bg-zinc-900/20 border border-zinc-900 rounded-2xl">
                        <ShoppingBag className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                        No previous order records found matching that search parameters.
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 space-y-4 hover:border-zinc-700/80 transition-all"
                        >
                            {/* Card Layer Header: Merchant Identifier Context */}
                            <div className="flex justify-between items-start pb-3 border-b border-zinc-800/60">
                                <div className="space-y-0.5">
                                    <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5 group cursor-pointer">
                                        <span>{order.restaurant}</span>
                                        <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-yellow-400" />
                                    </h2>
                                    <p className="text-xs text-zinc-400 font-medium">{order.branch}</p>

                                    {/* Status & Timestamp parameters */}
                                    <div className="flex items-center space-x-2 pt-1 text-[11px] text-zinc-500 font-mono">
                                        <span className="flex items-center text-emerald-400 font-sans font-bold gap-1">
                                            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {order.status}
                                        </span>
                                        <span>•</span>
                                        <span>{order.date}, {order.time}</span>
                                    </div>
                                </div>

                                {/* Fixed Cost Metrics */}
                                <span className="text-sm font-black font-mono text-zinc-300 bg-zinc-950 px-2.5 py-1 rounded-xl border border-zinc-900">
                                    ₹{order.amount}
                                </span>
                            </div>

                            {/* Card Layer Middle: Itemized Quantity Checklist */}
                            <div className="space-y-1.5 pl-1">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="text-xs text-zinc-300 flex items-center justify-between">
                                        <span className="font-medium">
                                            <span className="text-yellow-400 font-mono font-bold mr-1.5">{item.qty}x</span>
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Card Layer Footer: Actions & Rating Row Control */}
                            <div className="pt-2 border-t border-zinc-800/40 flex items-center justify-between gap-4">

                                {/* Rating Interactive View Trigger */}
                                <div>
                                    {order.rating ? (
                                        <div className="flex items-center space-x-0.5 bg-zinc-950 border border-zinc-900 px-2.5 py-1 rounded-lg">
                                            <span className="text-[10px] text-zinc-400 font-bold mr-1">You Rated</span>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3 h-3 ${i < order.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-700'}`}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <button className="text-[11px] font-bold text-yellow-400/80 hover:text-yellow-400 flex items-center gap-1 transition-colors">
                                            <Star className="w-3.5 h-3.5" /> Rate this Meal
                                        </button>
                                    )}
                                </div>

                                {/* Core Action: Reorder Button */}
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center gap-1.5">
                                    <RotateCcw className="w-3.5 h-3.5 stroke-[3]" />
                                    <span>Reorder Dishes</span>
                                </button>

                            </div>

                        </div>
                    ))
                )}

            </main>
        </div>
    );
}