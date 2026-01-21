import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import SupportPage from './components/SupportPage';
import AccountPage from './components/AccountPage';
import CheckoutPage from './components/CheckoutPage';
import OrderSuccessPage from './components/OrderSuccessPage';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Navigation State
  const [view, setView] = useState<'home' | 'listing' | 'detail' | 'support' | 'account' | 'checkout' | 'order-success'>('home');
  const [currentCategory, setCurrentCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [specialFilter, setSpecialFilter] = useState<'none' | 'new' | 'sale' | 'bestseller'>('none');
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [supportPageType, setSupportPageType] = useState<string>('');

  // Filter Products Logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (specialFilter !== 'none') {
        if (specialFilter === 'new') result = result.filter(p => p.isNew);
        if (specialFilter === 'sale') result = result.filter(p => p.isSale);
        if (specialFilter === 'bestseller') result = result.filter(p => p.rating >= 4.8 || p.reviews > 1000);
    } else if (currentCategory !== 'All') {
      result = result.filter(p => p.category === currentCategory);
    }

    return result;
  }, [currentCategory, searchQuery, specialFilter]);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  // Navigation Handlers
  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
    setSearchQuery('');
    setSpecialFilter('none');
    setView('listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentCategory('All');
    setSpecialFilter('none');
    setView('listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setView('home');
    setSearchQuery('');
    setCurrentCategory('All');
    setSpecialFilter('none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleProductClick = (product: Product) => {
      setSelectedProduct(product);
      setView('detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  const handleAccountClick = () => {
      setView('account');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleCheckoutClick = () => {
      setIsCartOpen(false);
      setView('checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handlePlaceOrder = () => {
      setCartItems([]);
      setView('order-success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleFooterLinkClick = (section: 'Shop' | 'Support', item: string) => {
      if (section === 'Shop') {
          setSearchQuery('');
          setCurrentCategory('All');
          
          switch(item) {
              case 'New Arrivals':
                  setSpecialFilter('new');
                  setView('listing');
                  break;
              case 'Best Sellers':
                  setSpecialFilter('bestseller');
                  setView('listing');
                  break;
              case 'Sales':
                  setSpecialFilter('sale');
                  setView('listing');
                  break;
              case 'Pens':
                  setCurrentCategory('Pens');
                  setSpecialFilter('none');
                  setView('listing');
                  break;
              case 'Notebooks':
                  setCurrentCategory('Notebooks');
                  setSpecialFilter('none');
                  setView('listing');
                  break;
              default:
                  setView('home');
          }
      } else if (section === 'Support') {
          setSupportPageType(item);
          setView('support');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Render different views
  const renderContent = () => {
    if (view === 'checkout') {
        return (
            <CheckoutPage 
                cartItems={cartItems}
                onPlaceOrder={handlePlaceOrder}
                onBack={() => {
                    setView('home');
                    setIsCartOpen(true);
                }}
                onHome={handleHomeClick}
            />
        );
    }

    if (view === 'order-success') {
        return <OrderSuccessPage onContinue={handleHomeClick} />;
    }

    if (view === 'account') {
        return (
            <AccountPage 
                onLogout={handleHomeClick} 
                onNavigateToSupport={() => {
                    setSupportPageType('FAQ');
                    setView('support');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            />
        );
    }

    if (view === 'support') {
        return <SupportPage type={supportPageType} onBack={handleHomeClick} />;
    }

    if (view === 'home') {
      return (
        <main>
          <Hero onShopNow={() => handleCategoryClick('All')} />
          
          {/* Featured Categories (Visual Only) */}
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {['Pens', 'Notebooks', 'Art Supplies', 'Desk Accessories'].map((cat, idx) => (
                   <div 
                    key={cat} 
                    onClick={() => handleCategoryClick(cat)}
                    className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/5] shadow-md"
                   >
                       <img 
                        src={`https://picsum.photos/id/${idx * 55 + 20}/400/600`} 
                        alt={cat} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                       />
                       <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                           <h3 className="text-white text-xl font-bold tracking-wide border-2 border-white px-4 py-2 uppercase">{cat}</h3>
                       </div>
                   </div>
               ))}
            </div>
          </section>

          {/* New Arrivals */}
          <section className="py-16 bg-slate-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-8">
                <div>
                   <h2 className="text-3xl font-serif font-bold text-slate-900">New Arrivals</h2>
                   <p className="mt-2 text-slate-500">Fresh from the manufacturers.</p>
                </div>
                <button 
                  onClick={() => handleFooterLinkClick('Shop', 'New Arrivals')}
                  className="text-primary-600 font-medium hover:text-primary-700 hidden sm:block"
                >
                  View all &rarr;
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.slice(0, 4).map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAdd={addToCart} 
                    onClick={handleProductClick}
                  />
                ))}
              </div>
              <div className="mt-8 text-center sm:hidden">
                 <button 
                  onClick={() => handleFooterLinkClick('Shop', 'New Arrivals')}
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  View all &rarr;
                </button>
              </div>
            </div>
          </section>
        </main>
      );
    }

    if (view === 'listing') {
        let title = '';
        if (searchQuery) title = `Search: "${searchQuery}"`;
        else if (specialFilter === 'new') title = 'New Arrivals';
        else if (specialFilter === 'sale') title = 'On Sale';
        else if (specialFilter === 'bestseller') title = 'Best Sellers';
        else if (currentCategory === 'All') title = 'Shop All';
        else title = currentCategory;

      return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-slate-900">
                    {title}
                </h1>
                <p className="text-slate-500 mt-2">{filteredProducts.length} products found</p>
            </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAdd={addToCart} 
                    onClick={handleProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
                <p className="text-xl text-slate-400 mb-4">No products found.</p>
                <button 
                    onClick={() => { setSearchQuery(''); setCurrentCategory('All'); setSpecialFilter('none'); }}
                    className="text-primary-600 hover:underline"
                >
                    Clear filters
                </button>
            </div>
          )}
        </main>
      );
    }
    
    if (view === 'detail' && selectedProduct) {
        return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button onClick={() => setView('listing')} className="mb-8 text-slate-500 hover:text-primary-600 flex items-center">
                    &larr; Back to shop
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100">
                        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{selectedProduct.category}</span>
                            {selectedProduct.isNew && <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">New</span>}
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">{selectedProduct.name}</h1>
                        <p className="text-2xl font-medium text-slate-900 mb-6">₹{selectedProduct.price.toLocaleString('en-IN')}</p>
                        <p className="text-slate-600 leading-relaxed mb-8">{selectedProduct.description}</p>
                        
                        <button 
                            onClick={() => addToCart(selectedProduct)}
                            className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                        >
                            Add to Cart
                        </button>
                        
                        <div className="mt-12 border-t border-slate-100 pt-8">
                            <h3 className="font-bold text-slate-900 mb-4">Why we love it</h3>
                            <ul className="space-y-2 text-slate-600 list-disc list-inside">
                                <li>Premium quality materials</li>
                                <li>Ethically sourced</li>
                                <li>Perfect for professionals and students</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hide Header on Checkout to reduce distraction, or keep minimal */}
      {view !== 'checkout' && view !== 'order-success' && (
          <Header 
            cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
            onCartClick={() => setIsCartOpen(true)}
            onSearch={handleSearch}
            onCategoryClick={handleCategoryClick}
            onHomeClick={handleHomeClick}
            onAccountClick={handleAccountClick}
          />
      )}
      
      {renderContent()}
      
      {view !== 'checkout' && view !== 'order-success' && <Footer onLinkClick={handleFooterLinkClick} />}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckoutClick}
      />
    </div>
  );
}

export default App;