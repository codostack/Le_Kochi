import React, { useState } from 'react';
import {
    ArrowLeft,
    Search,
    ChevronRight,
    MessageSquareText,
    PhoneCall,
    AlertCircle
} from 'lucide-react';

export default function HelpSupport() {
    const [searchQuery, setSearchQuery] = useState('');

    // Structured query groups mimicking Swiggy / Zomato help architectures
    const supportCategories = [
        {
            id: "orders",
            title: "Issues with Recent Orders",
            items: [
                { q: "My food order is heavily delayed. Where is my delivery executive?", tag: "Live" },
                { q: "Items are missing from my package or the order is wrong.", tag: "Refund Eligible" },
                { q: "The food quality or packaging delivered was very poor.", tag: "Quality" }
            ]
        },
        {
            id: "refunds",
            title: "Refunds & Payment Queries",
            items: [
                { q: "My payment failed but money was debited from my bank account.", tag: "Payment" },
                { q: "Where can I track my active cancellation refund status?", tag: "Tracking" },
                { q: "I want to change or modify my saved credit card details.", tag: "Account" }
            ]
        },
        {
            id: "account",
            title: "Account & App Features",
            items: [
                { q: "How do I permanently delete my saved home or work addresses?", tag: "Address" },
                { q: "I am not receiving any SMS or WhatsApp updates for my orders.", tag: "Settings" }
            ]
        }
    ];

    // Filtering logic based on user search input
    const filteredCategories = supportCategories.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    return (
        <div className="min-h-screen bg-[#041a13] text-white font-sans antialiased pb-12">

            {/* Sticky Top Header Section */}
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
                        <h1 className="text-lg font-bold tracking-tight">Help & Support</h1>
                        <p className="text-xs text-zinc-400">Let's get your issues sorted instantly</p>
                    </div>
                </div>
            </header>

            {/* Hero Search Section */}
            <section className="max-w-xl mx-auto px-4 mt-6">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-400 transition-colors">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search queries (e.g., refund, missing food...)"
                        className="w-full bg-zinc-900/50 border border-zinc-800/80 focus:border-yellow-400/50 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
                    />
                </div>
            </section>

            {/* Main Support Lists */}
            <main className="max-w-xl mx-auto px-4 mt-8 space-y-6">

                {filteredCategories.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500 text-sm bg-zinc-900/20 border border-zinc-900 rounded-2xl">
                        <AlertCircle className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                        No matching support questions found.
                    </div>
                ) : (
                    filteredCategories.map((category) => (
                        <div key={category.id} className="space-y-3">
                            {/* Category Heading Header */}
                            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
                                {category.title}
                            </h2>

                            {/* Queries List Blocks */}
                            <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden divide-y divide-zinc-800/40">
                                {category.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-900/30 transition-colors group"
                                    >
                                        <div className="flex flex-col items-start pr-4 space-y-2">
                                            <span className="text-sm font-medium text-zinc-200 group-hover:text-yellow-400 transition-colors leading-snug">
                                                {item.q}
                                            </span>
                                            <span className="text-[9px] font-bold uppercase tracking-wide bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md">
                                                {item.tag}
                                            </span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0 group-hover:text-yellow-400 transition-colors transform group-hover:translate-x-0.5" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}

                {/* Real-time Emergency Escape Channels Section */}
                <div className="pt-4 border-t border-zinc-800/60 space-y-3">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
                        Still need human assistance?
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        {/* Live Chat Component Card */}
                        <div className="p-4 bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 rounded-2xl flex items-start space-x-3 cursor-pointer group transition-all">
                            <div className="p-2.5 bg-yellow-400/10 text-yellow-400 rounded-xl group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                                <MessageSquareText className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-zinc-200">Chat Support</h3>
                                <p className="text-xs text-zinc-400 mt-1">Average wait: <span className="text-emerald-400 font-semibold font-mono">~2 mins</span></p>
                            </div>
                        </div>

                        {/* Direct Calling Hotline Card */}
                        <div className="p-4 bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 rounded-2xl flex items-start space-x-3 cursor-pointer group transition-all">
                            <div className="p-2.5 bg-yellow-400/10 text-yellow-400 rounded-xl group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                                <PhoneCall className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-zinc-200">Call Support</h3>
                                <p className="text-xs text-zinc-400 mt-1">Operational <span className="text-zinc-300 font-semibold font-mono">24x7</span></p>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}