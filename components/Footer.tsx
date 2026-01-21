import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  onLinkClick: (section: 'Shop' | 'Support', item: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <span className="font-serif text-2xl font-bold text-slate-900">
              Ink <span className="text-primary-500">&</span> Paper
            </span>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              Bringing the joy of writing to the digital age. Curated stationery for creators, dreamers, and doers.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-3">
              {['New Arrivals', 'Best Sellers', 'Pens', 'Notebooks', 'Sales'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => onLinkClick('Shop', item)}
                    className="text-sm text-slate-500 hover:text-primary-600 transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              {['FAQ', 'Shipping & Returns', 'Track Order', 'Contact Us'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => onLinkClick('Support', item)}
                    className="text-sm text-slate-500 hover:text-primary-600 transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-slate-400 hover:text-primary-500"><Instagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-primary-500"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-primary-500"><Facebook size={20} /></a>
            </div>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Ink & Paper. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;