import React, { useState } from 'react';
import {
    ArrowLeft,
    CheckCircle2,
    Receipt,
    TrendingUp,
    ChevronDown,
    ShoppingBag,
    Calendar,
    RefreshCw
} from 'lucide-react';

export default function PaymentHistory() {
    // Expanded detailed order state toggles for individual cards
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    // High-fidelity transaction data representing successful food orders
    const transactionHistory = [
        {
            id: "TXN-98402102",
            date: "May 28, 2026",
            time: "08:42 PM",
            restaurant: "Burger Lounge",
            location: "Town Centre, Palakkad",
            items: "1x Chicken Peri Peri Double Patty Burger, 1x Criss Cut Salted Fries",
            paymentMethod: "Google Pay (UPI)",
            amount: 450,
            status: "Delivered Successfully",
            breakdown: { subtotal: 369, delivery: 35, platform: 5, tax: 41 }
        },
        {
            id: "TXN-98319404",
            date: "May 24, 2026",
            time: "01:15 PM",
            restaurant: "Arabian Treat",
            location: "Chandranagar, Palakkad",
            items: "1x Full Chicken Al Faham, 3x Rumali Roti, 1x Mint Mayo",
            paymentMethod: "HDFC Visa Credit Card (•••• 4021)",
            amount: 620,
            status: "Delivered Successfully",
            breakdown: { subtotal: 540, delivery: 40, platform: 5, tax: 35 }
        },
        {
            id: "TXN-97201948",
            date: "May 18, 2026",
            time: "09:05 PM",
            restaurant: "Nila Bakers & Restaurant",
            location: "College Road, Palakkad",
            items: "2x Choice Kappa Biriyani, 1x Layered Kerala Parotta",
            paymentMethod: "Paytm Wallet",
            amount: 310,
            status: "Delivered Successfully",
            breakdown: { subtotal: 250, delivery: 35, platform: 5, tax: 20 }
        }
    ];

    const toggleExpandOrder = (id) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#041a13] text-white font-sans antialiased pb-12">

            {/* Sticky Header Block */}
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
                        <h1 className="text-lg font-bold tracking-tight">Payment History</h1>
                        <p className="text-xs text-zinc-400">Statement of successful orders and receipts</p>
                    </div>
                </div>
            </header>

            {/* Main Stream Area */}
            <main className="max-w-xl mx-auto px-4 mt-6 space-y-4">

                {/* Total Expense Metric Summary Banner */}
                <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-yellow-400/10 text-yellow-400 rounded-xl">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Monthly Food Spend</p>
                            <h2 className="text-xl font-black text-white font-mono mt-0.5">₹1,380.00</h2>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        May 2026
                    </span>
                </div>

                {/* Transaction Cards List Loop */}
                <div className="space-y-3">
                    {transactionHistory.map((txn) => {
                        const isExpanded = expandedOrderId === txn.id;

                        return (
                            <div
                                key={txn.id}
                                className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden transition-all hover:border-zinc-700/80"
                            >
                                {/* Main Interactive Summary Header Line */}
                                <div
                                    onClick={() => toggleExpandOrder(txn.id)}
                                    className="p-4 flex items-start justify-between gap-4 cursor-pointer select-none"
                                >
                                    <div className="flex items-start space-x-3.5 min-w-0">
                                        {/* Success Checked Payment Stamp Badge */}
                                        <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl mt-0.5 text-emerald-400 shrink-0">
                                            <CheckCircle2 className="w-5 h-5 fill-emerald-500/10" />
                                        </div>

                                        <div className="space-y-1 min-w-0">
                                            <h3 className="text-sm font-bold text-zinc-100 truncate group-hover:text-yellow-400">{txn.restaurant}</h3>
                                            <p className="text-xs text-zinc-400 truncate max-w-[280px]">{txn.items}</p>

                                            <div className="flex items-center space-x-3 pt-1 text-[10px] text-zinc-500">
                                                <span className="flex items-center gap-1 font-mono">
                                                    <Calendar className="w-3 h-3 text-zinc-600" /> {txn.date}
                                                </span>
                                                <span>•</span>
                                                <span className="truncate">{txn.paymentMethod}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing and Action Toggle block */}
                                    <div className="text-right shrink-0 space-y-1.5">
                                        <p className="text-sm font-black font-mono text-yellow-400">₹{txn.amount}.00</p>
                                        <div className="flex items-center justify-end text-zinc-500 gap-0.5">
                                            <span className="text-[10px] font-semibold text-zinc-400">Details</span>
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-yellow-400' : ''}`} />
                                        </div>
                                    </div>
                                </div>

                                {/* Collapsible Section containing explicit billing breakdowns */}
                                {isExpanded && (
                                    <div className="px-4 pb-4 pt-1 bg-zinc-950/40 border-t border-zinc-800/40 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">

                                        {/* Structured Itemization List Box */}
                                        <div className="space-y-2 bg-zinc-950 p-3 rounded-xl border border-zinc-900">
                                            <p className="text-[10px] uppercase font-black tracking-wider text-zinc-500 flex items-center gap-1">
                                                <ShoppingBag className="w-3 h-3" /> Order Items Summary
                                            </p>
                                            <p className="text-xs text-zinc-300 leading-relaxed font-medium pl-4">
                                                {txn.items}
                                            </p>
                                            <p className="text-[11px] text-zinc-500 italic pl-4">Prepared at: {txn.restaurant}, {txn.location}</p>
                                        </div>

                                        {/* Math Invoice Breakdown Receipt */}
                                        <div className="space-y-2 px-1">
                                            <p className="text-[10px] uppercase font-black tracking-wider text-zinc-500 flex items-center gap-1">
                                                <Receipt className="w-3 h-3" /> Cost & Statement Breakdown
                                            </p>

                                            <div className="space-y-1.5 text-xs text-zinc-400 pl-4 font-mono">
                                                <div className="flex justify-between">
                                                    <span>Food Base Subtotal:</span>
                                                    <span>₹{txn.breakdown.subtotal}.00</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Fulfillment & Delivery Fee:</span>
                                                    <span>₹{txn.breakdown.delivery}.00</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Platform Handling Fee:</span>
                                                    <span>₹{txn.breakdown.platform}.00</span>
                                                </div>
                                                <div className="flex justify-between text-zinc-500 pb-2 border-b border-zinc-900">
                                                    <span>GST & Restaurant Charges:</span>
                                                    <span>₹{txn.breakdown.tax}.00</span>
                                                </div>
                                                <div className="flex justify-between text-sm font-bold text-zinc-200 pt-1">
                                                    <span className="font-sans">Total Paid & Settled:</span>
                                                    <span className="text-yellow-400">₹{txn.amount}.00</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Lower Utility Block: Quick Action Buttons */}
                                        <div className="flex items-center justify-between pt-1 gap-2">
                                            <span className="text-[10px] font-mono text-zinc-600">ID: {txn.id}</span>
                                            <button className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-black rounded-lg transition-colors flex items-center gap-1">
                                                <RefreshCw className="w-3 h-3" /> Reorder Fresh
                                            </button>
                                        </div>

                                    </div>
                                )}

                            </div>
                        );
                    })}
                </div>

            </main>
        </div>
    );
}