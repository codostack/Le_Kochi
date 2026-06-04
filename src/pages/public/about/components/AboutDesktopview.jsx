import React from 'react';

const AboutUsPage = () => {
  // Array of images for the bottom food gallery
  const galleryImages = [
    'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400',
    'https://images.unsplash.com/photo-1513558161293-cfff764629f6?w=400',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
  ];

  return (
    <div className="min-h-screen bg-[#041a13] text-gray-100 font-sans">
      
      {/* Banner Section */}
      <div className="relative h-64 flex flex-col items-center justify-center bg-black/40">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600" alt="Banner" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <h1 className="relative z-10 text-5xl font-bold text-white">About Us</h1>
        <p className="relative z-10 text-yellow-500 mt-2">Home / About Us</p>
      </div>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto py-20 px-6 flex flex-col md:flex-row gap-16 items-center">
        <div className="flex gap-4">
          <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300" alt="Cooking" className="rounded-lg w-48 h-64 object-cover" />
          <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300" alt="Chef" className="rounded-lg w-64 h-96 object-cover mt-12" />
        </div>
        <div className="flex-1 space-y-6">
          <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">About Our Restaurant</span>
          <h2 className="text-5xl font-bold leading-tight">The Cleanest, Most Delicious <br /> Food Ever.</h2>
          <p className="text-gray-400">Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            {['500+ Popular Menu', '6000+ Global Customers', '25+ Years Experience', '400+ Online Orders'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-yellow-500 font-semibold"><span>✦</span> {item}</div>
            ))}
          </div>
          <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-3 rounded font-bold">LEARN MORE</button>
        </div>
      </section>

      {/* Chefs Section */}
      <section className="bg-[#0a2e24] py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 space-y-4">
            <h2 className="text-4xl font-bold">Meet Our Exclusive & Master Chefs</h2>
            <p className="text-gray-400">Experience the artistry of our culinary team.</p>
            <button className="border border-yellow-600 text-yellow-500 px-8 py-3 rounded font-bold hover:bg-yellow-600 hover:text-white">LEARN MORE</button>
          </div>
          <div className="flex gap-6 flex-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#041a13] p-4 rounded-lg flex-1">
                <div className="h-60 bg-gray-600 rounded mb-4"></div>
                <h3 className="text-xl font-bold">Jimmie K. Cryer</h3>
                <p className="text-yellow-500">Senior Chef</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Food Gallery Section */}
      <section className="w-full flex">
        {galleryImages.map((img, i) => (
          <div key={i} className="flex-1 h-64 overflow-hidden">
            <img src={img} alt="Food Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutUsPage;