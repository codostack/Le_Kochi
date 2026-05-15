import { useState } from "react";

const menuData = {
  DOSAS: [
    {
      name: "Masala Dosa",
      desc: "Crispy & Delicious\n61+ Varieties",
      price: "$12.99",
      image:
        "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Ghee Roast",
      desc: "With Pure Ghee",
      price: "$13.99",
      image:
        "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Chicken Keema Dosa",
      desc: "Spicy Chicken Filling",
      price: "$14.99",
      image:
        "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Podi Dosa",
      desc: "With Milagai Podi",
      price: "$11.99",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop",
    },
  ],
  "KERALA SPECIALS": [
    {
      name: "Kerala Porotta",
      desc: "Soft Layered Porotta",
      price: "$9.99",
      image:
        "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Beef Fry",
      desc: "Traditional Kerala Beef",
      price: "$16.99",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Appam & Stew",
      desc: "Authentic Kerala Breakfast",
      price: "$13.50",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Fish Curry Meal",
      desc: "Spicy Kerala Fish Curry",
      price: "$18.99",
      image:
        "https://images.unsplash.com/photo-1628294896516-0d73c91f8d10?q=80&w=1200&auto=format&fit=crop",
    },
  ],
  SNACKS: [
    {
      name: "Samosa",
      desc: "Crispy Veg Samosa",
      price: "$4.99",
      image:
        "https://images.unsplash.com/photo-1601050690117-94f5f6fa0c43?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Chicken Cutlet",
      desc: "Kerala Style Cutlet",
      price: "$6.99",
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Banana Fry",
      desc: "Sweet Pazhampori",
      price: "$5.50",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Uzhunnu Vada",
      desc: "Crispy Medu Vada",
      price: "$5.99",
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop",
    },
  ],
  HAKKA: [
    {
      name: "Hakka Noodles",
      desc: "Veg Chinese Noodles",
      price: "$12.50",
      image:
        "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Chilli Chicken",
      desc: "Spicy Indo Chinese",
      price: "$15.99",
      image:
        "https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Fried Rice",
      desc: "Chicken Fried Rice",
      price: "$13.99",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Dragon Chicken",
      desc: "Crispy Dragon Chicken",
      price: "$16.50",
      image:
        "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1200&auto=format&fit=crop",
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState("DOSAS");

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "#0b0b0b", fontFamily: "'Poppins', sans-serif", color: "white" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ── STICKY NAVBAR ── */}
      <div
className="sticky top-[90px] z-40 w-full px-6 pt-[18px] pb-[18px]"
        style={{ background: "#0b0b0b", borderBottom: "1px solid #1d1d1d" }}
      >
        <div className="mx-auto w-full max-w-[1600px]">

          {/* OUR MENU title row */}
          <div className="flex items-center justify-center gap-[18px] mb-[22px]">
            <span className="block h-[2px] w-20" style={{ background: "#d4af37" }} />
            <h2
              className="text-[34px] font-medium tracking-[3px] max-md:text-2xl max-md:tracking-[2px]"
              style={{ color: "#d4af37" }}
            >
              OUR MENU
            </h2>
            <span className="block h-[2px] w-20" style={{ background: "#d4af37" }} />
          </div>

          {/* Category tabs */}
          <nav className="flex gap-[14px] max-md:gap-[10px]">
            {Object.keys(menuData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative cursor-pointer border-none bg-transparent pb-[10px] text-[15px] font-medium max-md:px-4 max-md:py-[10px] max-md:text-xs"
                style={{ color: activeTab === tab ? "#ffffff" : "#bfbfbf" }}
              >
                {tab}
                {activeTab === tab && (
                  <span
                    className="absolute bottom-0 left-0 h-[3px] w-full rounded-[10px]"
                    style={{ background: "#f4a325" }}
                  />
                )}
              </button>
            ))}
          </nav>

        </div>
      </div>

      {/* ── MENU GRID ── */}
      <div className="mx-auto w-full max-w-[1600px] px-6 py-[50px] max-md:px-[14px] max-md:py-[35px]">
        <div
          className="
            grid gap-5
            grid-cols-4
            max-xl:grid-cols-2
            max-md:grid-cols-1
            min-[1600px]:grid-cols-5
          "
        >
          {menuData[activeTab].map((item, index) => (
            <div
              key={index}
              className="
                flex items-center justify-between gap-4
                min-h-[190px] rounded-[22px] p-[18px]
                transition-all duration-300 ease-in-out
                cursor-default
                max-md:min-h-0 max-md:rounded-[18px] max-md:p-[14px] max-md:gap-[14px]
              "
              style={{ background: "#151515", border: "1px solid #222" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "#d4af37";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(212,175,55,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#222";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* LEFT */}
              <div className="flex-1 min-w-0">
                <h3
                  className="mb-[10px] text-[19px] font-semibold leading-[1.3] text-white max-md:mb-2 max-md:text-[18px]"
                >
                  {item.name}
                </h3>
                <p
                  className="mb-[14px] text-[13px] leading-[1.5] max-md:mb-[10px] max-md:text-[12px]"
                  style={{ color: "#aaa" }}
                >
                  {item.desc.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <h4
                  className="text-[22px] font-bold max-md:text-[18px]"
                  style={{ color: "#d4af37" }}
                >
                  {item.price}
                </h4>
              </div>

              {/* RIGHT — image */}
              <div
                className="h-[120px] w-[120px] flex-shrink-0 overflow-hidden rounded-[16px] max-md:h-[110px] max-md:w-[110px] max-md:rounded-[14px]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}