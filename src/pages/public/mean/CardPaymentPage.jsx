import React, { useState } from 'react';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// ─── Card Payment UI ───────────────────────────────────────────────────────────
function CardPayment() {
  const [activeTab, setActiveTab] = useState('debit');
  const [saveCard, setSaveCard] = useState(true);

  return (
    <div className="space-y-6">
      {/* Debit / Credit Toggle */}
      <div className="flex bg-[#0b2920] rounded-xl p-1 border border-yellow-500/20">
        {['debit', 'credit'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center text-sm font-medium rounded-lg transition-all capitalize ${
              activeTab === tab
                ? 'bg-yellow-400 text-[#041a13] shadow-sm font-bold'
                : 'text-yellow-500/60 hover:text-yellow-400'
            }`}
          >
            {tab} Card
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {/* Card Number */}
        <div className="space-y-1.5">
          <label className="text-xs text-yellow-500/70 font-medium pl-1">Card Number</label>
          <div className="w-full bg-[#0b2920] border border-yellow-500/20 rounded-xl px-4 py-3.5 flex items-center justify-between focus-within:border-yellow-400 transition-colors">
            <input
              type="text"
              placeholder="5534  2834  8857  5370"
              className="bg-transparent w-full text-sm font-mono tracking-wider focus:outline-none placeholder-yellow-500/30 text-yellow-100"
            />
            <div className="flex gap-0.5 shrink-0 ml-2">
              <div className="w-5 h-5 rounded-full bg-red-500 opacity-90" />
              <div className="w-5 h-5 rounded-full bg-amber-500 opacity-90 -ml-2.5" />
            </div>
          </div>
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7 space-y-1.5">
            <label className="text-xs text-yellow-500/70 font-medium pl-1">Expiry date</label>
            <div className="w-full bg-[#0b2920] border border-yellow-500/20 rounded-xl px-4 py-3.5 flex items-center gap-2 cursor-pointer hover:border-yellow-500/40 transition-colors">
              <span className="text-sm text-yellow-100 font-medium">Jan</span>
              <ChevronDown className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-500/30 mx-0.5">|</span>
              <span className="text-sm text-yellow-100 font-medium">2027</span>
            </div>
          </div>
          <div className="col-span-5 space-y-1.5">
            <label className="text-xs text-yellow-500/70 font-medium pl-1">CVV</label>
            <div className="w-full bg-[#0b2920] border border-yellow-500/20 rounded-xl px-4 py-3.5 focus-within:border-yellow-400 transition-colors">
              <input
                type="password"
                placeholder="•••"
                className="bg-transparent w-full text-sm tracking-widest font-bold focus:outline-none placeholder-yellow-500/30 text-yellow-100"
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs text-yellow-500/70 font-medium pl-1">Name on Card</label>
          <div className="w-full bg-[#0b2920] border border-yellow-500/20 rounded-xl px-4 py-3.5 focus-within:border-yellow-400 transition-colors">
            <input
              type="text"
              placeholder="ADDISON NELSON"
              className="bg-transparent w-full text-sm uppercase font-medium focus:outline-none placeholder-yellow-500/30 text-yellow-100"
            />
          </div>
        </div>
      </div>

      {/* Save card */}
      <div className="flex items-center gap-2.5 pt-1 pl-1">
        <input
          type="checkbox"
          id="saveCardCheckbox"
          checked={saveCard}
          onChange={(e) => setSaveCard(e.target.checked)}
          className="w-4 h-4 rounded border-yellow-500/30 bg-[#0b2920] focus:ring-0 cursor-pointer accent-yellow-400"
        />
        <label htmlFor="saveCardCheckbox" className="text-xs text-yellow-500/70 cursor-pointer select-none hover:text-yellow-400 transition-colors">
          Save card for future checkouts
        </label>
      </div>
    </div>
  );
}

// ─── UPI Payment UI ────────────────────────────────────────────────────────────
function UpiPayment() {
  const apps = [
    { id: 'gpay', label: 'Google Pay', text: 'G' },
    { id: 'phonepe', label: 'PhonePe', text: 'P' },
    { id: 'paytm', label: 'Paytm', text: 'PT' },
    { id: 'bhim', label: 'BHIM', text: 'B' },
  ];
  const [selectedApp, setSelectedApp] = useState('gpay');

  return (
    <div className="space-y-6">
      {/* UPI App selector */}
      <div className="grid grid-cols-4 gap-3">
        {apps.map(({ id, label, text }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelectedApp(id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
              selectedApp === id
                ? 'border-yellow-400 bg-yellow-500/10'
                : 'border-yellow-500/10 bg-[#0b2920] hover:border-yellow-500/30'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              selectedApp === id ? 'bg-yellow-400 text-[#041a13]' : 'bg-[#041a13] text-yellow-400 border border-yellow-500/20'
            }`}>
              {text}
            </div>
            <span className="text-[10px] text-yellow-500/80 font-medium text-center leading-tight">{label}</span>
          </button>
        ))}
      </div>

      {/* UPI ID input */}
      <div className="space-y-1.5">
        <label className="text-xs text-yellow-500/70 font-medium pl-1">UPI ID</label>
        <div className="w-full bg-[#0b2920] border border-yellow-500/20 rounded-xl px-4 py-3.5 flex items-center gap-2 focus-within:border-yellow-400 transition-colors">
          <input
            type="text"
            placeholder="yourname@upi"
            className="bg-transparent w-full text-sm focus:outline-none placeholder-yellow-500/30 text-yellow-100"
          />
          <button type="button" className="text-xs text-yellow-400 font-bold shrink-0 hover:text-yellow-300">VERIFY</button>
        </div>
      </div>

      <p className="text-xs text-yellow-500/50 pl-1">
        Enter your UPI ID and tap Verify before proceeding.
      </p>
    </div>
  );
}

// ─── QR / Scan & Pay UI ───────────────────────────────────────────────────────
function QrPayment({ total }) {
  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Mock QR Code box */}
      <div className="w-48 h-48 bg-[#0b2920] border-2 border-dashed border-yellow-500/30 rounded-2xl flex flex-col items-center justify-center gap-2">
        {/* Simulated QR pattern */}
        <div className="grid grid-cols-6 gap-0.5">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-[1px] ${Math.random() > 0.45 ? 'bg-yellow-400' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-yellow-100">Scan with any UPI app</p>
        <p className="text-xs text-yellow-500/60">GPay · PhonePe · Paytm · BHIM · and more</p>
        <p className="text-xl font-bold text-yellow-400 mt-2">${Number(total).toFixed(2)}</p>
      </div>

      <div className="w-full bg-[#0b2920] border border-yellow-500/20 rounded-xl px-4 py-3.5 flex items-center justify-between">
        <span className="text-xs text-yellow-500/60">QR expires in</span>
        <span className="text-sm font-semibold text-yellow-400 tabular-nums">09:58</span>
      </div>
    </div>
  );
}

// ─── Wallet Payment UI ────────────────────────────────────────────────────────
function WalletPayment() {
  const wallets = [
    { id: 'paytm', label: 'Paytm Wallet', balance: '$12.40' },
    { id: 'amazon', label: 'Amazon Pay', balance: '$5.00' },
    { id: 'freecharge', label: 'Freecharge', balance: '$0.00' },
  ];
  const [selected, setSelected] = useState('paytm');

  return (
    <div className="space-y-3">
      {wallets.map(({ id, label, balance }) => (
        <button
          key={id}
          type="button"
          onClick={() => setSelected(id)}
          className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
            selected === id
              ? 'border-yellow-400 bg-yellow-500/10'
              : 'border-yellow-500/10 bg-[#0b2920] hover:border-yellow-500/20'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              selected === id ? 'bg-yellow-400 text-[#041a13]' : 'bg-[#041a13] text-yellow-400 border border-yellow-500/20'
            }`}>
              {label[0]}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-yellow-100">{label}</p>
              <p className="text-xs text-yellow-500/60">Balance: {balance}</p>
            </div>
          </div>
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            selected === id ? 'border-yellow-400' : 'border-yellow-500/30'
          }`}>
            {selected === id && <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />}
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Net Banking UI ───────────────────────────────────────────────────────────
function NetBankingPayment() {
  const banks = [
    { id: 'sbi', label: 'State Bank of India' },
    { id: 'hdfc', label: 'HDFC Bank' },
    { id: 'icici', label: 'ICICI Bank' },
    { id: 'axis', label: 'Axis Bank' },
    { id: 'kotak', label: 'Kotak Mahindra' },
    { id: 'other', label: 'Other Bank' },
  ];
  const [selected, setSelected] = useState('hdfc');

  return (
    <div className="space-y-3">
      <p className="text-xs text-yellow-500/60 pl-1">Select your bank</p>
      <div className="grid grid-cols-2 gap-3">
        {banks.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelected(id)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selected === id
                ? 'border-yellow-400 bg-yellow-500/10'
                : 'border-yellow-500/10 bg-[#0b2920] hover:border-yellow-500/20'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold mb-2 transition-colors ${
              selected === id ? 'bg-yellow-400 text-[#041a13]' : 'bg-[#041a13] text-yellow-400 border border-yellow-500/20'
            }`}>
              {id === 'other' ? '···' : label.split(' ').map(w => w[0]).join('').slice(0, 3)}
            </div>
            <p className="text-xs font-medium text-yellow-100 leading-tight">{label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}


// ─── TITLES & CONFIG ──────────────────────────────────────────────────────────
const METHOD_CONFIG = {
  card:       { title: 'Card Payment' },
  upi:        { title: 'UPI Payment' },
  qr:         { title: 'Scan & Pay' },
  wallet:     { title: 'Mobile Wallet' },
  netbanking: { title: 'Net Banking' },
};


// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CardPaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const total = location.state?.total || 0;
  const cart = location.state?.cart || {};
  const allItems = location.state?.allItems || [];
  const paymentMethod = location.state?.paymentMethod || 'card';

  const config = METHOD_CONFIG[paymentMethod] || METHOD_CONFIG.card;

  const renderMethod = () => {
    switch (paymentMethod) {
      case 'card':       return <CardPayment />;
      case 'upi':        return <UpiPayment />;
      case 'qr':         return <QrPayment total={total} />;
      case 'wallet':     return <WalletPayment />;
      case 'netbanking': return <NetBankingPayment />;
      default:           return <CardPayment />;
    }
  };

  return (
    /* Changed wrapper layout background to brand green, global text palette to yellow variants */
    <div className="min-h-screen w-full bg-[#041a13] text-yellow-400 font-sans antialiased flex flex-col">
      <div className="w-full max-w-md mx-auto p-6 flex-1 flex flex-col">
        <div className="space-y-6 flex-1">

          {/* Header */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full text-yellow-400 hover:bg-white/5 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-yellow-100">
              {config.title.split(' ')[0]}{' '}
              <span className="text-yellow-400">{config.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <div className="w-10" />
          </div>

          {/* Amount strip */}
          <div className="bg-[#0b2920] border border-yellow-500/20 rounded-xl p-4 flex justify-between items-center shadow-md">
            <span className="text-yellow-500/70 text-sm">Total Payable</span>
            <span className="text-lg font-bold text-yellow-400">${Number(total).toFixed(2)}</span>
          </div>

          {/* Dynamic payment UI */}
          {renderMethod()}

        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pb-4 mt-8">
          <button
            onClick={() => navigate('/menu')}
            type="button"
            className="flex-1 border border-yellow-500/30 hover:bg-white/5 text-yellow-400 font-semibold text-sm py-4 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => navigate('/order-confirm', {
              state: { total, cart, allItems, paymentMethod },
            })}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-[#041a13] font-bold text-sm py-4 rounded-xl transition-colors shadow-lg"
          >
            Pay ${Number(total).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}