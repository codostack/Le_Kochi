// App.js
import React, { useState } from "react";
import "./styles.css";

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
    <div className="desktop-container">

      {/* STICKY HEADER */}
      <div className="menu-sticky">

        <div className="menu-title">
          <span></span>
          <h2>OUR MENU</h2>
          <span></span>
        </div>

        <nav className="nav-tabs">
          {Object.keys(menuData).map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

      </div>

      {/* MENU GRID */}
      <div className="menu-grid">
        {menuData[activeTab].map((item, index) => (
          <div className="menu-card" key={index}>

            <div className="card-left">
              <h3>{item.name}</h3>

              <p>
                {item.desc.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>

              <h4>{item.price}</h4>
            </div>

            <div className="card-right">
              <img src={item.image} alt={item.name} />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}