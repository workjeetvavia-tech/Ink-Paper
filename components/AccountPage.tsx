import React, { useState } from 'react';
import { User, Package, MapPin, LogOut, Settings, ChevronRight, CreditCard, HelpCircle } from 'lucide-react';

interface AccountPageProps {
  onLogout: () => void;
  onNavigateToSupport: () => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ onLogout, onNavigateToSupport }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'addresses' | 'details'>('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'details', label: 'Account Details', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h2 className="text-xl font-serif font-bold text-slate-900 mb-2">Hello, Alex!</h2>
                <p className="text-slate-600">
                    From your account dashboard you can view your <button onClick={() => setActiveTab('orders')} className="text-primary-600 font-medium hover:underline">recent orders</button>, manage your <button onClick={() => setActiveTab('addresses')} className="text-primary-600 font-medium hover:underline">shipping and billing addresses</button>, and <button onClick={() => setActiveTab('details')} className="text-primary-600 font-medium hover:underline">edit your password and account details</button>.
                </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
                <div 
                    onClick={() => setActiveTab('orders')}
                    className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Package size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Orders</h3>
                    <p className="text-sm text-slate-500">Check order status</p>
                </div>

                <div 
                    onClick={() => setActiveTab('addresses')}
                    className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <MapPin size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Addresses</h3>
                    <p className="text-sm text-slate-500">Manage delivery info</p>
                </div>

                <div 
                    onClick={onNavigateToSupport}
                    className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <HelpCircle size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Support</h3>
                    <p className="text-sm text-slate-500">Get help & FAQs</p>
                </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Order History</h2>
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
                    <Package size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No orders yet</h3>
                <p className="text-slate-500">You haven't placed any orders yet.</p>
            </div>
          </div>
        );
      case 'addresses':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold text-slate-900">Addresses</h2>
                <button className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">Add New</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-slate-200 rounded-xl p-6 relative group">
                    <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs text-primary-600 hover:underline">Edit</button>
                        <button className="text-xs text-rose-500 hover:underline">Delete</button>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900">Default Shipping</h3>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Primary</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Alex Johnson<br/>
                        123 Stationery Lane, Creative City<br/>
                        Mumbai, Maharashtra 400001<br/>
                        India
                    </p>
                </div>
                <div className="border border-slate-200 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:text-primary-500 hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer min-h-[160px]">
                    <PlusIcon />
                    <span className="mt-2 text-sm font-medium">Add another address</span>
                </div>
            </div>
          </div>
        );
      case 'details':
        return (
           <div className="space-y-6 animate-fadeIn max-w-2xl">
             <h2 className="text-2xl font-serif font-bold text-slate-900">Account Details</h2>
             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                        <input type="text" defaultValue="Alex" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                        <input type="text" defaultValue="Johnson" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input type="email" defaultValue="alex.johnson@example.com" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
                
                <div className="pt-4 border-t border-slate-100 mt-6">
                    <h3 className="font-bold text-slate-900 mb-4">Password Change</h3>
                    <div className="space-y-4">
                        <input type="password" placeholder="Current Password" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                        <input type="password" placeholder="New Password" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                        <input type="password" placeholder="Confirm New Password" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    </div>
                </div>

                <div className="pt-4">
                    <button className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">
                        Save Changes
                    </button>
                </div>
             </form>
           </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[70vh]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
                <div className="p-6 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Welcome back,</p>
                            <p className="font-bold text-slate-900">Alex Johnson</p>
                        </div>
                    </div>
                </div>
                <nav className="p-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === tab.id 
                                ? 'bg-primary-50 text-primary-700' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <div className="flex items-center">
                                <tab.icon size={18} className={`mr-3 ${activeTab === tab.id ? 'text-primary-600' : 'text-slate-400'}`} />
                                {tab.label}
                            </div>
                            {activeTab === tab.id && <ChevronRight size={16} />}
                        </button>
                    ))}
                    <div className="my-2 border-t border-slate-100"></div>
                    <button 
                        onClick={onLogout}
                        className="w-full flex items-center p-3 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                        <LogOut size={18} className="mr-3" />
                        Log Out
                    </button>
                </nav>
            </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

const PlusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
)

export default AccountPage;