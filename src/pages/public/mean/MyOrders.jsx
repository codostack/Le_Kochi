import React, { useState } from 'react';
import { ChevronLeft, Search, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    {
      id: 'IT-ORD-23984XQ7',
      store: 'Dosa Hub',
      date: 'Today, 01:15 PM',
      status: 'pending',
      statusText: 'Preparing your food',
      items: [
        { name: 'Masala Dosa', quantity: 1, price: 12.99, icon: '🥞' }
      ],
      deliveryAddress: 'Addison Nelson, Muradpur Punjab...',
      total: 15.49,
    },
    {
      id: 'IT-ORD-11043PL2',
      store: 'Pizza Mart',
      date: '25 May 2026',
      status: 'completed',
      statusText: 'Delivered',
      items: [
        { name: 'Tomato Pizza', quantity: 1, price: 12.99, icon: '🍕' },
        { name: 'Tomato Pizza (Large)', quantity: 1, price: 14.99, icon: '🍕' }
      ],
      deliveryAddress: 'Addison Nelson, Muradpur Punjab...',
      total: 28.88,
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 text-[#041a13] flex flex-col pb-8">
      
      {/* FIXED TOP HEADER */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="w-full max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
<button
  type="button"
  onClick={() => navigate(-1)}
  className="p-1 text-[#041a13] hover:bg-gray-100 rounded-full transition-colors"
>
  <ChevronLeft className="w-6 h-6" />
</button>
            <h1 className="text-xl font-bold text-[#041a13]">My Orders</h1>
          </div>
          <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* SWIGGY / AMAZON STYLE TABS */}
        <div className="w-full max-w-md mx-auto px-4 flex gap-6 text-sm font-medium">
          <button 
            onClick={() => setActiveTab('all')}
            className={`pb-3 relative ${activeTab === 'all' ? 'text-green-600 font-bold' : 'text-gray-500'}`}
          >
            All Orders
            {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('pending')}
            className={`pb-3 relative ${activeTab === 'pending' ? 'text-green-600 font-bold' : 'text-gray-500'}`}
          >
            Pending
            {activeTab === 'pending' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={`pb-3 relative ${activeTab === 'completed' ? 'text-green-600 font-bold' : 'text-gray-500'}`}
          >
            Completed
            {activeTab === 'completed' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full" />}
          </button>
        </div>
      </div>

      {/* MAIN ORDERS LIST BLOCK */}
      <div className="w-full max-w-md mx-auto px-4 pt-4 flex-1 space-y-4">
        
        {orders
          .filter(order => activeTab === 'all' || order.status === activeTab)
          .map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-4">
              
              {/* Card Header: Store Info & Top Status */}
              <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                <div>
                  <h2 className="font-bold text-base text-[#041a13]">{order.store}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">ID: {order.id}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                </div>

                {/* Status Badges */}
                {order.status === 'pending' ? (
                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-orange-100">
                    <Clock className="w-3.5 h-3.5" />
                    Pending
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </span>
                )}
              </div>

              {/* Card Body: Ordered Items Details */}
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0 text-sm">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-[#041a13] truncate">
                          {item.name} <span className="text-xs text-gray-400 font-normal">x {item.quantity}</span>
                        </p>
                        <p className="font-bold text-[#041a13]">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Rate: ${item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer: Summary & Action Footer Row */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Paid</p>
                  <p className="text-base font-bold text-green-600">${order.total.toFixed(2)}</p>
                </div>
                
                {/* Adaptive Action Buttons based on status */}
                {order.status === 'pending' ? (
                  <button type="button" className="text-xs font-bold text-green-600 border border-green-200 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-xl transition-colors flex items-center gap-1">
                    Track Order
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button type="button" className="text-xs font-bold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors">
                    Reorder Items
                  </button>
                )}
              </div>

            </div>
        ))}

      </div>
    </div>
  );
}