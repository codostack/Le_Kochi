import React from 'react';
import { FaStar } from 'react-icons/fa';

const RestaurantLandingPage = () => {
  const menuCategories = [
    { name: 'Starters', img: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=200' },
    { name: 'Main Course', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200' },
    { name: 'Desserts', img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200' },
    { name: 'Beverages', img: 'https://images.unsplash.com/photo-1513558161293-cfff764629f6?w=200' },
    { name: 'Pizza', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200' },
    { name: 'Chef Specials', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200' },
  ];

  const menuItems = [
    { name: 'Grilled Salmon', price: '$24.99', rating: 4.8, tag: 'Bestseller', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400' },
    { name: 'Creamy Prawn Pasta', price: '$21.99', rating: 4.7, tag: 'New', img: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400' },
    { name: 'Ribeye Steak', price: '$29.99', rating: 4.9, img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400' },
    { name: 'Classic Tiramisu', price: '$8.99', rating: 4.6, img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400' },
  ];

  return (
    <div className="min-h-screen bg-[#041a13] text-gray-100 font-sans">
      
      {/* Header Banner */}
      <header className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1600" alt="Banner" className="absolute inset-0 w-full h-full object-cover brightness-50" />
        <div className="relative z-10 text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white">Where Every Bite<br />Tell A Story</h1>
          <button className="bg-transparent border-2 border-yellow-600 hover:bg-yellow-600 text-white px-10 py-3 rounded-sm font-bold transition-all">View Menu</button>
        </div>
      </header>

      {/* Categories (Original Circular Design) */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl text-center font-bold mb-8">OUR MENU CATEGORIES</h2>
        <div className="flex justify-center gap-6 overflow-x-auto pb-4">
          {menuCategories.map((cat, i) => (
            <div key={i} className="flex flex-col items-center">
              <img src={cat.img} alt={cat.name} className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-yellow-500" />
              <span className="font-semibold">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Column Single Row Menu */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl text-center font-bold mb-8">CHEF'S RECOMMENDATIONS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, i) => (
            <div key={i} className="bg-[#0a2e24] p-4 rounded-lg relative">
              {item.tag && <span className="absolute top-4 left-4 bg-yellow-600 text-xs px-2 py-1 rounded">{item.tag}</span>}
              <img src={item.img} alt={item.name} className="w-full h-40 object-cover rounded mb-4" />
              <h3 className="font-bold text-lg">{item.name}</h3>
              <div className="flex items-center text-yellow-500 my-2">
                <FaStar className="mr-1" /> {item.rating}
              </div>
              <p className="font-bold text-yellow-500">{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantLandingPage;