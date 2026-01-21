import React, { useState } from 'react';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, Lock } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onPlaceOrder: () => void;
  onBack: () => void;
  onHome: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onPlaceOrder, onBack, onHome }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardName: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder();
  };

  return (
    <div className="min-h-screen bg-white animate-fadeIn">
        {/* Navigation/Header for checkout */}
        <div className="border-b border-slate-100 py-4 px-4 sm:px-6 lg:px-8 bg-white sticky top-0 z-20">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={onBack} className="flex items-center text-slate-500 hover:text-slate-900 transition-colors mr-4 group">
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline ml-1 font-medium">Back to Cart</span>
                    </button>
                    <button onClick={onHome} className="font-serif text-xl font-bold text-slate-900 cursor-pointer hover:opacity-80 transition-opacity">
                        Ink <span className="text-primary-500">&</span> Paper
                    </button>
                </div>
                <div className="flex items-center text-slate-400 text-sm font-medium">
                    <ShieldCheck size={16} className="mr-1 text-green-600" />
                    <span className="text-slate-600">Secure Checkout</span>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                {/* Left Column: Forms */}
                <div className="lg:col-span-7">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Contact Info */}
                        <section>
                            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">Contact Information</h2>
                            <div className="bg-white">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input 
                                    required
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow placeholder:text-slate-400" 
                                    placeholder="you@example.com"
                                />
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section>
                            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">Shipping Address</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400" placeholder="Alex" />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400" placeholder="Johnson" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                    <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400" placeholder="123 Main St, Apt 4B" />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400" placeholder="Mumbai" />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                                    <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400" placeholder="Maharashtra" />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">PIN Code</label>
                                    <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400" placeholder="400001" />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400" placeholder="+91 98765 43210" />
                                </div>
                            </div>
                        </section>

                        {/* Payment */}
                        <section className="pt-4 border-t border-slate-100">
                            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">Payment Details</h2>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <div className="mb-4 flex space-x-4">
                                    <div className="flex items-center bg-white border border-primary-200 px-4 py-2 rounded-lg shadow-sm text-primary-700 font-medium cursor-pointer ring-1 ring-primary-500">
                                        <CreditCard size={18} className="mr-2" />
                                        Credit Card
                                    </div>
                                    <div className="flex items-center bg-white border border-slate-200 px-4 py-2 rounded-lg text-slate-500 opacity-60 cursor-not-allowed">
                                        UPI / Netbanking
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                                        <div className="relative">
                                            <input required type="text" name="cardNumber" placeholder="0000 0000 0000 0000" className="w-full pl-10 border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                                            <input required type="text" name="expiry" placeholder="MM/YY" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                                            <input required type="text" name="cvc" placeholder="123" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Cardholder Name</label>
                                        <input required type="text" name="cardName" placeholder="Name on card" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <button 
                            type="submit" 
                            className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 transform hover:-translate-y-0.5"
                        >
                            Pay ₹{total.toLocaleString('en-IN')}
                        </button>
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-5 mt-10 lg:mt-0">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-24">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>
                        <ul className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map(item => (
                                <li key={item.id} className="flex gap-4">
                                    <div className="w-16 h-16 rounded-md border border-slate-200 overflow-hidden bg-white flex-shrink-0 relative">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        <span className="absolute -top-1 -right-1 bg-slate-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-50">{item.quantity}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-slate-900 line-clamp-2">{item.name}</h3>
                                        <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                                    </div>
                                    <p className="text-sm font-medium text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-3 pt-6 border-t border-slate-200">
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-600">
                                <span className="flex items-center"><Truck size={14} className="mr-1" /> Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-6 mt-6 border-t border-slate-200">
                            <span className="text-base font-bold text-slate-900">Total</span>
                            <span className="text-2xl font-serif font-bold text-slate-900">₹{total.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CheckoutPage;