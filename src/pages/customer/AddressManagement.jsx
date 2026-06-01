import React, { useState } from 'react';
import {
    ArrowLeft,
    MapPin,
    Home,
    Briefcase,
    Heart,
    Trash2,
    Edit3,
    Plus,
    Check,
} from 'lucide-react';

export default function AddressManagement() {
    // Initial addresses state mock data
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            type: 'Home', // Home, Work, Other
            flatNo: '42, Orchid Elegance',
            landmark: 'Near Central Park',
            area: 'Town Centre, Palakkad',
            pincode: '678001'
        },
        {
            id: 2,
            type: 'Work',
            flatNo: 'Building 4B, 3rd Floor',
            landmark: 'Tech Zone Campus',
            area: 'Kizhakkancherry, Palakkad',
            pincode: '678684'
        }
    ]);

    // Form states for adding or editing an address
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formType, setFormType] = useState('Home'); // Home, Work, Other
    const [flatNo, setFlatNo] = useState('');
    const [landmark, setLandmark] = useState('');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState('');

    // Open form to create a new address
    const handleAddNewClick = () => {
        setEditingId(null);
        setFormType('Home');
        setFlatNo('');
        setLandmark('');
        setArea('');
        setPincode('');
        setIsFormOpen(true);
    };

    // Open form populated with existing data to edit an address
    const handleEditClick = (address) => {
        setEditingId(address.id);
        setFormType(address.type);
        setFlatNo(address.flatNo);
        setLandmark(address.landmark);
        setArea(address.area);
        setPincode(address.pincode);
        setIsFormOpen(true);
    };

    // Delete an address from state
    const handleDeleteClick = (id) => {
        setAddresses(prev => prev.filter(item => item.id !== id));
    };

    // Save changes (Handles both Add and Update logic)
    const handleSaveAddress = (e) => {
        e.preventDefault();

        if (editingId) {
            // Update action
            setAddresses(prev => prev.map(item =>
                item.id === editingId
                    ? { ...item, type: formType, flatNo, landmark, area, pincode }
                    : item
            ));
        } else {
            // Add action
            const newAddress = {
                id: Date.now(),
                type: formType,
                flatNo,
                landmark,
                area,
                pincode
            };
            setAddresses(prev => [...prev, newAddress]);
        }

        setIsFormOpen(false);
        setEditingId(null);
    };

    // Helper icon component map based on address type category tag
    const getAddressIcon = (type) => {
        switch (type) {
            case 'Home': return <Home className="w-4 h-4" />;
            case 'Work': return <Briefcase className="w-4 h-4" />;
            default: return <Heart className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#041a13] text-white font-sans antialiased pb-12">

            <header className="sticky top-0 z-40 bg-[#041a13]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-4">
                <div className="max-w-xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => window.history.back()}
                            className="p-2 -ml-2 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-yellow-400 rounded-full transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight">Manage Addresses</h1>
                            <p className="text-xs text-zinc-400">Add, edit, or remove your delivery pins</p>
                        </div>
                    </div>

                    {!isFormOpen && (
                        <button
                            onClick={handleAddNewClick}
                            className="p-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl transition-all shadow-md flex items-center space-x-1 text-xs font-bold"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Add New</span>
                        </button>
                    )}
                </div>
            </header>

            <main className="max-w-xl mx-auto px-4 mt-6">

                {/* Conditional Layout Rendering Block: Address Input Editor Form */}
                {isFormOpen ? (
                    <form onSubmit={handleSaveAddress} className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-200">
                        <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                            <h2 className="text-sm font-bold text-zinc-200">
                                {editingId ? 'Modify Address Details' : 'Add New Delivery Address'}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="text-xs text-zinc-500 hover:text-zinc-300"
                            >
                                Cancel
                            </button>
                        </div>

                        {/* Address Type Tag Picker Chips (Home, Work, Other) */}
                        <div className="space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Save Address As</span>
                            <div className="flex space-x-2">
                                {['Home', 'Work', 'Other'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormType(type)}
                                        className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${formType === type ? 'bg-yellow-400 border-yellow-400 text-black' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'}`}
                                    >
                                        {getAddressIcon(type)}
                                        <span>{type}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Element: Flat / House / Building Number */}
                        <div className="space-y-1.5">
                            <label htmlFor="flatNo" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Flat / House No. / Floor / Building</label>
                            <input
                                type="text"
                                id="flatNo"
                                required
                                value={flatNo}
                                onChange={(e) => setFlatNo(e.target.value)}
                                placeholder="e.g., 42, Orchid Elegance"
                                className="w-full bg-zinc-950 border border-zinc-800 focus:border-yellow-400/50 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Input Element: Landmark entry fields */}
                        <div className="space-y-1.5">
                            <label htmlFor="landmark" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Nearby Landmark (Optional)</label>
                            <input
                                type="text"
                                id="landmark"
                                value={landmark}
                                onChange={(e) => setLandmark(e.target.value)}
                                placeholder="e.g., Near Central Park"
                                className="w-full bg-zinc-950 border border-zinc-800 focus:border-yellow-400/50 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Two-Column input grid layout context for Area and Pincode components */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label htmlFor="area" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Area / Locality</label>
                                <input
                                    type="text"
                                    id="area"
                                    required
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    placeholder="e.g., Town Centre"
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-yellow-400/50 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="pincode" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Pincode</label>
                                <input
                                    type="text"
                                    id="pincode"
                                    required
                                    pattern="[0-9]{6}"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    placeholder="e.g., 678001"
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-yellow-400/50 rounded-xl px-3.5 py-2.5 text-xs font-mono tracking-wider text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* CTA Submit Form Button wrapper */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.99] flex items-center justify-center space-x-1.5"
                            >
                                <Check className="w-4 h-4" />
                                <span>Save and Verify Location</span>
                            </button>
                        </div>
                    </form>
                ) : (
                    /* Address List Overview Screen Display Component loop rendering state */
                    <div className="space-y-4">
                        {addresses.length === 0 ? (
                            <div className="text-center py-12 text-zinc-500 text-sm bg-zinc-900/20 border border-zinc-900 rounded-2xl">
                                <MapPin className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                                No saved addresses found. Click "Add New" to get started.
                            </div>
                        ) : (
                            addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 flex items-start justify-between space-x-4 hover:border-zinc-700 transition-all group"
                                >
                                    <div className="flex items-start space-x-3.5">
                                        {/* Floating dynamic icon badge indicators mapping addresses */}
                                        <div className="p-2.5 bg-zinc-800/80 group-hover:bg-yellow-400/10 border border-zinc-700/40 group-hover:border-yellow-400/20 rounded-xl mt-0.5 text-yellow-400 transition-colors shrink-0">
                                            {getAddressIcon(address.type)}
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="text-sm font-bold text-zinc-100">{address.type}</h3>
                                            </div>
                                            <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                                                {address.flatNo}, {address.landmark ? `${address.landmark}, ` : ''}{address.area}
                                            </p>
                                            <p className="text-[11px] font-mono tracking-wide text-zinc-500">Pincode: {address.pincode}</p>
                                        </div>
                                    </div>

                                    {/* Actions Tool Dock: Edit & Delete Buttons */}
                                    <div className="flex items-center space-x-1 shrink-0">
                                        <button
                                            onClick={() => handleEditClick(address)}
                                            className="p-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-yellow-400 transition-all"
                                            title="Edit Address"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(address.id)}
                                            className="p-2 bg-zinc-950 hover:bg-red-950/30 border border-zinc-800 hover:border-red-900/30 rounded-xl text-zinc-500 hover:text-red-400 transition-all"
                                            title="Delete Address"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

            </main>
        </div>
    );
}