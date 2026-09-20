import React, { useState } from 'react';
import { ShoppingBag, Heart, X, Plus, Minus, ArrowRight, ShieldCheck, Truck, RefreshCw, PhoneCall, MessageCircle } from 'lucide-react';

// ==========================================
// Full Product Inventory with Updated Prices & Exact Files
// ==========================================
const PRODUCTS = [
  // --- Nike ---
  { id: 1, name: 'Nike Air Force 1 Low White / Black', price: 1550, category: 'Nike', image: '/images/nike-airforce-white-black.jpeg', tag: 'Hot' },
  { id: 2, name: 'Nike Air Force 1 Low Triple White', price: 1250, category: 'Nike', image: '/images/nike-airforce-triple-white.jpeg' },
  { id: 3, name: 'Nike Air Force 1 Low Fragment White / Black', price: 1550, category: 'Nike', image: '/images/nike-airforce-fragment.jpeg', tag: 'New' },

  // --- Adidas ---
  { id: 4, name: 'Adidas Campus 00s Black / White', price: 1600, category: 'Adidas', image: '/images/adidas-campus-black.jpeg' },
  { id: 5, name: 'Adidas Campus 00s Grey / White', price: 1600, category: 'Adidas', image: '/images/adidas-campus-grey.jpeg' },

  // --- Balenciaga ---
  { id: 6, name: 'Balenciaga Track Sneaker Black', price: 3900, category: 'Balenciaga', image: '/images/balenciaga-track-black.jpeg', tag: 'Hot' },
  { id: 7, name: 'Balenciaga Track Sneaker White', price: 3900, category: 'Balenciaga', image: '/images/balenciaga-track-white.jpeg' },
  { id: 8, name: 'Balenciaga Track Sneaker Light Blue', price: 3900, category: 'Balenciaga', image: '/images/balenciaga-track-blue.jpeg' },
  { id: 9, name: 'Balenciaga Track Sneaker Pink', price: 3900, category: 'Balenciaga', image: '/images/balenciaga-track-pink.jpeg' },

  // --- Asics ---
  { id: 10, name: 'Asics GEL Beige', price: 1650, category: 'Asics', image: '/images/asics-beige.jpeg' },
  { id: 11, name: 'Asics GEL Black', price: 1650, category: 'Asics', image: '/images/asics-black.jpeg' },
  { id: 12, name: 'Asics GEL Metallic Silver', price: 1650, category: 'Asics', image: '/images/asics-silver..jpeg' },
  { id: 13, name: 'Asics GEL Silver & Black', price: 1650, category: 'Asics', image: '/images/asics-silver.jpeg' },
  { id: 14, name: 'Asics GEL White / Black', price: 1650, category: 'Asics', image: '/images/asics-white-black.jpeg' },
  { id: 15, name: 'Asics GEL White / Grey', price: 1650, category: 'Asics', image: '/images/asics-white-grey.jpeg' },

  // --- Air Jordan ---
  { id: 16, name: 'Air Jordan 4 Red Thunder', price: 1600, category: 'Air Jordan', image: '/images/jordan4-red.jpeg', tag: 'Hot' },
  { id: 17, name: 'Air Jordan 4 White Cement', price: 1600, category: 'Air Jordan', image: '/images/jordan4-white.jpeg', tag: 'New' },

  // --- Alexander McQueen ---
  { id: 18, name: 'Alexander McQueen Black', price: 1200, category: 'Alexander McQueen', image: '/images/mcqueen-black.jpeg' },
  { id: 19, name: 'Alexander McQueen White / Black Heel', price: 1200, category: 'Alexander McQueen', image: '/images/mcqueen-black-back.jpeg' },
  { id: 20, name: 'Alexander McQueen Crystal', price: 2850, category: 'Alexander McQueen', image: '/images/mcqueen-crystal.jpeg' },
  { id: 21, name: 'Alexander McQueen Crystal Black', price: 2850, category: 'Alexander McQueen', image: '/images/mcqueen-crystal-black.jpeg', tag: 'Best Seller' },
  { id: 22, name: 'Alexander McQueen White', price: 1200, category: 'Alexander McQueen', image: '/images/mcqueen-white.jpeg' },
  { id: 23, name: 'Alexander McQueen White Edition', price: 1200, category: 'Alexander McQueen', image: '/images/mcqueen-white-v2.jpeg' },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});

  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });

  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const addToCart = (product) => {
    const size = selectedSizes[product.id] || '42';
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, size, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutWhatsApp = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill out all fields to place your order.');
      return;
    }

    const whatsappNumber = "201229309934"; // Primary WhatsApp Number
    
    let orderDetails = `*New Order from DROP SNEAKERS* 👟\n\n`;
    orderDetails += `*Customer Info:*\n`;
    orderDetails += `👤 Name: ${customerInfo.name}\n`;
    orderDetails += `📞 Phone: ${customerInfo.phone}\n`;
    orderDetails += `📍 Address: ${customerInfo.address}\n\n`;
    orderDetails += `*Items Ordered:*\n`;

    cart.forEach((item, index) => {
      orderDetails += `${index + 1}. ${item.name}\n   - Size: ${item.size}\n   - Qty: ${item.quantity}\n   - Subtotal: ${item.price * item.quantity} EGP\n`;
    });

    orderDetails += `\n💵 *Total Amount:* ${cartTotal.toLocaleString()} EGP`;

    const encodedMessage = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col justify-between" dir="ltr">
      <div>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/logo (2).png" alt="DROP SNEAKERS" className="w-12 h-12 rounded-full object-cover border border-black" />
              <span className="font-black text-xl tracking-wider hidden sm:inline">DROP SNEAKERS</span>
            </div>

            <nav className="hidden md:flex gap-6 font-medium overflow-x-auto">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`transition-colors whitespace-nowrap ${selectedCategory === cat ? 'text-red-600 font-bold border-b-2 border-red-600 pb-1' : 'text-neutral-600 hover:text-black'}`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative bg-white text-neutral-900 border-b border-neutral-200 py-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-red-600 font-bold tracking-widest text-sm uppercase">DROP SNEAKERS</span>
              <h1 className="text-5xl sm:text-7xl font-black italic tracking-tighter my-4">
                STEP INTO <br /><span className="text-red-600">YOUR STYLE</span>
              </h1>
              <p className="text-neutral-600 text-lg mb-8 max-w-md">
                Discover the finest Mirror Quality sneaker collection crafted for premium style and all-day comfort.
              </p>
              <a href="#products" className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105">
                Shop Now <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="relative flex justify-center">
              <div className="w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full overflow-hidden border-4 border-neutral-200 shadow-2xl bg-neutral-50 flex items-center justify-center p-4">
                <img src="/images/logo (2).png" alt="DROP SNEAKERS Logo" className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Banner */}
        <section className="bg-neutral-50 border-b border-neutral-200 py-6 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-6 h-6 text-red-600" />
              <span className="font-semibold text-sm">Fast Delivery Nationwide</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="w-6 h-6 text-red-600" />
              <span className="font-semibold text-sm">Inspect Before Receipt</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <RefreshCw className="w-6 h-6 text-red-600" />
              <span className="font-semibold text-sm">Easy Exchange Policy</span>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-red-600 font-bold text-sm tracking-wider uppercase">Our Collection</span>
              <h2 className="text-3xl font-black tracking-tight">Latest Drops</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => {
              const currentSize = selectedSizes[product.id] || '42';
              return (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-square bg-neutral-50 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {product.tag && (
                        <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                          {product.tag}
                        </span>
                      )}
                      <button 
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 left-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-red-600 text-red-600' : 'text-neutral-600'}`} />
                      </button>
                    </div>

                    <div className="p-5">
                      <span className="text-xs text-neutral-500 font-medium">{product.category}</span>
                      <h3 className="font-bold text-lg mt-1 group-hover:text-red-600 transition-colors">{product.name}</h3>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-xl font-black text-red-600">EGP {product.price.toLocaleString()}</span>
                      </div>

                      {/* Size Selector */}
                      <div className="mt-4">
                        <label className="text-xs font-bold text-neutral-500 block mb-2">Select Size:</label>
                        <div className="flex gap-2">
                          {['41', '42', '43', '44', '45'].map(size => (
                            <button
                              key={size}
                              onClick={() => handleSizeSelect(product.id, size)}
                              className={`px-2.5 py-1 text-xs font-bold rounded-md border transition-colors ${currentSize === size ? 'bg-black text-white border-black' : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-black'}`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white border-t border-neutral-800 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/images/logo (2).png" alt="DROP SNEAKERS" className="w-10 h-10 rounded-full object-cover border border-neutral-700" />
              <span className="font-black text-lg tracking-wider">DROP SNEAKERS</span>
            </div>
            <p className="text-neutral-400 text-sm">
              Your ultimate destination for premium mirror quality sneakers and unmatched style.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-bold text-sm text-neutral-300">Contact Us via WhatsApp:</span>
            <div className="flex flex-col gap-2">
              <a href="https://wa.me/20122930934" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm">
                <MessageCircle className="w-4 h-4 text-green-500 shrink-0" /> 01229309934
              </a>
              <a href="https://wa.me/201226351839" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm">
                <MessageCircle className="w-4 h-4 text-green-500 shrink-0" /> 01226351839
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-bold text-sm text-neutral-300">Follow Us:</span>
            <a 
              href="https://instagram.com/Drop.sneakers2026" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
            >
              <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg> Drop.sneakers2026
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-neutral-800 mt-8 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} DROP SNEAKERS. All rights reserved.
        </div>
      </footer>

      {/* Cart Drawer & Checkout Form */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-red-600" /> Shopping Cart
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500">
                    Your cart is empty
                  </div>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b pb-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-neutral-100" />
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <span className="text-xs text-neutral-500">Size: {item.size}</span>
                          <div className="text-red-600 font-bold text-sm mt-1">EGP {item.price.toLocaleString()}</div>
                          <div className="flex items-center gap-3 mt-2">
                            <button onClick={() => updateQuantity(item.id, item.size, -1)} className="p-1 rounded bg-neutral-100 hover:bg-neutral-200">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-xs">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.size, 1)} className="p-1 rounded bg-neutral-100 hover:bg-neutral-200">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <form onSubmit={handleCheckoutWhatsApp} className="mt-6 border-t pt-4 space-y-3">
                      <h3 className="font-bold text-sm text-neutral-700">Delivery Details:</h3>
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        required
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-red-600"
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        required
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-red-600"
                      />
                      <textarea 
                        placeholder="Detailed Address" 
                        required
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-red-600 h-20"
                      />
                      
                      <div className="pt-2">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Total Amount:</span>
                          <span className="text-2xl font-black text-red-600">EGP {cartTotal.toLocaleString()}</span>
                        </div>
                        <button 
                          type="submit" 
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          <PhoneCall className="w-5 h-5" /> Checkout via WhatsApp
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}