import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../../axiosInstance/page";
import FoodDetailPage from "./Fooddetailpage";
import CartPage from "./Cartpage";

// ── IMPORT LOCAL IMAGE ──
import masalaDosaImg from "../../../assets/images/WhatsApp_Image_2026-05-26_at_11.54.06_AM-removebg-preview.png";
import { useNavigate } from "react-router-dom";

const dummyMenuData = {
  DOSAS: [
    {
      id: "1",
      name: "Plain Dosa",
      description: "Classic crispy dosa",
      price: 8.0,
      stock: 15,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "2",
      name: "Masala Dosa",
      description: "Stuffed potato masala dosa",
      price: 10.0,
      stock: 12,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "3",
      name: "Mysore Masala Dosa",
      description: "Spicy Mysore style dosa",
      price: 11.0,
      stock: 10,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "4",
      name: "Madras Dosa",
      description: "Traditional Madras dosa",
      price: 10.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "5",
      name: "Egg Dosa",
      description: "Dosa topped with egg",
      price: 10.0,
      stock: 6,
      available: true,
      image: masalaDosaImg,
    },
  ],

  UTTAPAM: [
    {
      id: "6",
      name: "Plain Uttapam",
      description: "Soft fluffy uttapam",
      price: 9.0,
      stock: 10,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "7",
      name: "Onion Uttapam",
      description: "Topped with fresh onions",
      price: 10.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "8",
      name: "Chilly Onion Uttapam",
      description: "Spicy onion uttapam",
      price: 10.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "9",
      name: "Tomato Chilly Onion Uttapam",
      description: "Tomato & chilli topping",
      price: 10.0,
      stock: 6,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "10",
      name: "Masala Chilly Onion Uttapam",
      description: "Masala loaded uttapam",
      price: 11.0,
      stock: 5,
      available: true,
      image: masalaDosaImg,
    },
  ],

  "RAVA DOSA": [
    {
      id: "11",
      name: "Rava Plain Dosa",
      description: "Crispy rava dosa",
      price: 9.0,
      stock: 10,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "12",
      name: "Rava Masala Dosa",
      description: "Rava dosa with masala",
      price: 10.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "13",
      name: "Rava Mysore Dosa",
      description: "Spicy Mysore rava dosa",
      price: 10.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "14",
      name: "Rava Mysore Masala Dosa",
      description: "Mysore masala rava dosa",
      price: 11.0,
      stock: 6,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "15",
      name: "Onion Rava Dosa",
      description: "Onion flavored rava dosa",
      price: 10.0,
      stock: 6,
      available: true,
      image: masalaDosaImg,
    },
  ],

  BREADS: [
    {
      id: "16",
      name: "Kerala Porotta",
      description: "Soft layered porotta",
      price: 2.0,
      stock: 20,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "17",
      name: "Appam (3)",
      description: "Traditional Kerala appam",
      price: 2.0,
      stock: 15,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "18",
      name: "Chapathi (2)",
      description: "Soft wheat chapathi",
      price: 2.0,
      stock: 15,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "19",
      name: "Puttu",
      description: "Steamed rice cake",
      price: 3.0,
      stock: 12,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "20",
      name: "Chicken Kuttu Porotta",
      description: "Porotta mixed with chicken",
      price: 10.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
  ],

  RICE: [
    {
      id: "21",
      name: "Chicken Biriyani",
      description: "Aromatic chicken biriyani",
      price: 12.0,
      stock: 10,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "22",
      name: "Mutton Biriyani",
      description: "Traditional mutton biriyani",
      price: 14.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "23",
      name: "Veg Biriyani",
      description: "Flavorful veg biriyani",
      price: 10.0,
      stock: 10,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "24",
      name: "Prawn Biriyani",
      description: "Prawn dum biriyani",
      price: 14.0,
      stock: 7,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "25",
      name: "Chicken Fried Rice",
      description: "Indo-Chinese fried rice",
      price: 12.0,
      stock: 10,
      available: true,
      image: masalaDosaImg,
    },
  ],

  "HAKKA / SEAFOOD": [
    {
      id: "26",
      name: "Chilly Chicken",
      description: "Spicy chicken starter",
      price: 12.0,
      stock: 10,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "27",
      name: "Ginger Chicken",
      description: "Chicken tossed in ginger sauce",
      price: 12.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "28",
      name: "Chicken Manchurian",
      description: "Indo-Chinese favorite",
      price: 12.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "29",
      name: "Chicken 65",
      description: "South Indian spicy chicken",
      price: 12.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "30",
      name: "Chilly Prawn",
      description: "Spicy seafood special",
      price: 14.0,
      stock: 6,
      available: true,
      image: masalaDosaImg,
    },
  ],

  "NON-VEG": [
    {
      id: "31",
      name: "Chicken Chutty Curry",
      description: "Kerala style chicken curry",
      price: 14.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "32",
      name: "Malabar Chicken Curry",
      description: "Authentic Malabar curry",
      price: 12.0,
      stock: 8,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "33",
      name: "Chicken Chokka",
      description: "Traditional chicken roast",
      price: 12.0,
      stock: 6,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "34",
      name: "Pepper Chicken",
      description: "Black pepper chicken",
      price: 12.0,
      stock: 6,
      available: true,
      image: masalaDosaImg,
    },
    {
      id: "35",
      name: "Chicken Roast",
      description: "Kerala chicken roast",
      price: 12.0,
      stock: 6,
      available: true,
      image: masalaDosaImg,
    },
  ],
};

const VIEW = { MENU: "menu", DETAIL: "detail", CART: "cart", ORDERS: "orders" };

export default function MenuMobilePage() {
  const [menuData, setMenuData] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || {};
    } catch {
      return {};
    }
  });
  const [view, setView] = useState(VIEW.MENU);
  const navigate = useNavigate();
console.log(view);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  useEffect(() => {
    setMenuData(dummyMenuData);
    setActiveTab(Object.keys(dummyMenuData)[0]);
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axiosInstance.get("/menu");
      if (res.data.success) {
        const grouped = res.data.items.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {});
        setMenuData(grouped);
        const first = Object.keys(grouped)[0];
        if (first) setActiveTab(first);
      }
    } catch (err) {
      console.error(err);
    }
  };

const allItems = useMemo(() => {
  return Object.entries(menuData).flatMap(([category, items]) =>
    items.map((item) => ({
      ...item,
      category,
    }))
  );
}, [menuData]);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = allItems.find((i) => String(i.id) === String(id));
    return sum + (item ? Number(item.price) * qty : 0);
  }, 0);

  const goCart = () => setView(VIEW.CART);
  const goMenu = () => { setView(VIEW.MENU); setSelectedItem(null); };
  const goDetail = (item) => { setSelectedItem(item); setView(VIEW.DETAIL); };

  if (view === VIEW.CART) {
    return (
      <CartPage
        cart={cart}
        setCart={setCart}
        allItems={allItems}
        onBack={() => setView(selectedItem ? VIEW.DETAIL : VIEW.MENU)}
        onOrderPlaced={fetchMenu}
      />
    );
  }

  if (view === VIEW.DETAIL && selectedItem) {
    return (
      <FoodDetailPage
        item={selectedItem}
        allItems={allItems}
        onBack={goMenu}
        onNavigateCart={goCart}
        cart={cart}
        setCart={setCart}
        onOrderPlaced={fetchMenu}
      />
    );
  }

  return (
    <div
      className={`min-h-screen w-full bg-[#06100a] font-sans antialiased text-white presentation-layer ${
        cartCount > 0 ? "pb-[110px]" : "pb-[40px]"
      }`}
    >
      {/* ── STICKY HEADER ── */}
      <div className="sticky top-0 z-40 w-full px-6 pt-3 pb-1 bg-[#06120a]">
        <div className="mx-auto w-full max-w-[1600px]">
          {/* Title Row */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex-1" />
            <div className="flex items-center gap-3.5">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#b45309]" />
              <h2 className="text-[16px] sm:text-[18px] font-bold tracking-[3px] sm:tracking-[5px] text-[#eab308] m-0 whitespace-nowrap">
                OUR MENU
              </h2>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#b45309]" />
            </div>
            <div className="flex-1 flex justify-end items-center gap-2">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-[#0d2f22] bg-[#041a13] text-gray-400 font-semibold text-[12px] transition-all hover:border-[rgba(194,155,64,0.5)] hover:text-[#d4af37] hover:bg-[#0a1f10] cursor-pointer tracking-tight"
                // onClick={() => setView(VIEW.ORDERS)}
              onClick={() => navigate("/my-orders")}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
                <span className="hidden sm:inline">My Orders</span>
              </button>
            </div>
          </div>

          {/* CATEGORY TABS - Scrollbar visibility completely forced out across browsers */}
          <nav className="flex gap-5 overflow-x-auto pb-1.5 border-b border-transparent bg-[#06120a] overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {Object.keys(menuData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative bg-transparent border-0 font-semibold text-[12px] tracking-[1.2px] px-1 py-1 cursor-pointer whitespace-nowrap border-b-2 transition-all duration-200 outline-none ${
                  activeTab === tab
                    ? "text-[#eab308] border-[#eab308]"
                    : "text-emerald-700/60 border-transparent hover:text-emerald-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── MENU LIST ── */}
      <div className="mx-auto w-full max-w-[1200px] px-4.5 pt-4 pb-[50px]">
        <div className="flex flex-col gap-4">
          {menuData[activeTab]
            ?.filter((item) => item.available)
            .map((item) => {
              const inCart = cart[item.id] || 0;
              const stock = Number(item.stock ?? 0);

              return (
                <div
                  key={item.id}
                  onClick={() => goDetail(item)}
                  className="group relative overflow-hidden rounded-[20px] border border-[rgba(180,131,35,0.15)] bg-[#04120b] min-h-[115px] md:min-h-[140px] cursor-pointer transition-all duration-400 ease-out hover:-translate-y-0.5 hover:border-[rgba(234,179,8,0.35)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.45)]"
                >
                  {/* IMAGE LAYER */}
                  <div className="absolute inset-0 w-full h-full flex justify-end items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[210%] md:w-[85%] h-[115%] md:h-[125%] object-contain object-right mr-0 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10 flex items-center min-h-[115px] md:min-h-[140px] p-4 md:px-8">
                    <div className="w-[45%] md:w-[40%]">
                      <h2 className="text-[14px] md:text-[16px] leading-tight text-[#f5f5f5] m-0 tracking-tight font-semibold">
                        {item.name}
                      </h2>

                      {/* DESCRIPTION */}
                      <p className="mt-1 text-[11px] md:text-[12px] leading-relaxed text-gray-400/80 max-w-[120px] md:max-w-[180px] break-words line-clamp-2 tracking-tight">
                        {item.description}
                      </p>

                      {/* PRICE */}
                      <div className="mt-1.5 text-[18px] md:text-[24px] font-bold text-[#f5b301] tracking-tight tabular-nums">
                        ${Number(item.price).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* CART COUNT */}
                  {inCart > 0 && (
                    <div className="absolute top-3 right-3 z-20 w-5.5 h-5.5 rounded-full bg-[#f5b301] text-black text-[11px] font-bold flex items-center justify-center tabular-nums">
                      {inCart}
                    </div>
                  )}

                  {/* OUT OF STOCK */}
                  {stock === 0 && (
                    <div className="absolute inset-0 z-30 bg-black/80 flex items-center justify-center text-white text-[15px] font-bold tracking-wide">
                      Out Of Stock
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* ── FLOATING CART BAR ── */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={goCart}
            className="flex items-center gap-4 px-6 py-3.5 rounded-[18px] bg-[#d4af37] text-[#0b0b0b] border-0 min-w-[280px] cursor-pointer shadow-[0_8px_40px_rgba(212,175,55,0.4)] transition-colors duration-200 hover:bg-[#f0c842]"
          >
            <div className="w-8 h-8 rounded-[10px] bg-black/15 flex items-center justify-center font-bold text-[14px] tabular-nums">
              {cartCount}
            </div>
            <span className="flex-1 font-semibold text-[14px] tracking-wide text-left">
              View Cart
            </span>
            <span className="font-bold text-[14px] tabular-nums">
              ${cartTotal.toFixed(2)}
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}