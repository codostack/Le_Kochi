import { useState } from "react";

const TABS = ["DOSAS", "KERALA SPECIALS", "SNACKS", "HAKKA"];

const MENU_ITEMS = [
  {
    id: 1,
    name: "Masala Dosa",
    desc: "Crispy & Delicious • 61+ Varieties",
    price: "$12.99",
    image:
      "https://img.freepik.com/premium-photo/assorted-indian-cuisine-black-background-thali-platter-dosa-dal-detailed-flavorful-ar-32-job-id-bab65113adb64088bac5335e892dac7e_875755-18925.jpg",
  },
  {
    id: 2,
    name: "Ghee Roast",
    desc: "With Pure Ghee",
    price: "$13.99",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Chicken Keema Dosa",
    desc: "Spicy Chicken Keema Dosa",
    price: "$14.99",
    image:
      "https://img.freepik.com/premium-photo/south-indian-dosa-brass-platter-dark-teak-table_992976-42.jpg",
  },
  {
    id: 4,
    name: "Podi Dosa",
    desc: "With Milagai Podi",
    price: "$11.99",
    image:
      "https://t3.ftcdn.net/jpg/18/74/09/14/360_F_1874091419_A4qZ5IRiayvA6DoGWyGbDIYBdqpqS6XN.jpg",
  },
];

export default function SignatureDishPage() {
  const [activeTab, setActiveTab] = useState("DOSAS");

  return (
    <div className="min-h-screen bg-[#06120a] text-white">

      {/* Menu Heading */}
      <div className="px-5 pt-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-yellow-700" />

          <h2 className="text-yellow-500 text-xl md:text-2xl font-bold tracking-[6px]">
            OUR MENU
          </h2>

          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-yellow-700" />
        </div>

        {/* Tabs */}
        <div className="flex scrollbar-hide border-b border-white/10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 text-xs md:text-sm font-semibold tracking-wider whitespace-nowrap transition-all duration-300 border-b-2 ${
                activeTab === tab
                  ? "text-yellow-500 border-yellow-500"
                  : "text-gray-500 border-transparent hover:text-yellow-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Menu List */}
      <div className="px-5 py-4 space-y-5">
        {MENU_ITEMS.map((item) => (
<div
  key={item.id}
  className="flex items-center gap-4 border border-[#0d2f22] bg-[#041a13] rounded-2xl p-4 group cursor-pointer hover:border-[#c29b40]/40 transition-all duration-300"
>
            {/* Text */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#f3e9d2] group-hover:text-yellow-500 transition">
                {item.name}
              </h3>

              <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-3 text-yellow-500 font-bold text-lg">
                {item.price}
              </div>
            </div>

            {/* Image */}
            <div className="w-[120px] h-[90px] rounded-2xl overflow-hidden border border-yellow-800/20 shadow-xl shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}