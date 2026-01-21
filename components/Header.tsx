import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  onCategoryClick: (cat: string) => void;
  onHomeClick: () => void;
  onAccountClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onSearch, onCategoryClick, onHomeClick, onAccountClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -ml-2 text-slate-600 hover:text-primary-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={onHomeClick}>
            <span className="font-serif text-2xl font-bold text-slate-900 tracking-tight">
              Ink <span className="text-primary-500">&</span> Paper
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryClick(cat)}
                className="text-slate-600 hover:text-primary-600 text-sm font-medium transition-colors"
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-1.5 rounded-full bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 w-48 transition-all focus:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </form>

            <button 
                onClick={onAccountClick}
                className="p-2 text-slate-600 hover:text-primary-600 transition-colors hidden sm:block"
            >
              <User size={20} />
            </button>

            <button
              onClick={onCartClick}
              className="p-2 text-slate-600 hover:text-primary-600 transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <form onSubmit={handleSearchSubmit} className="relative mb-4 px-2">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full rounded-md bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </form>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategoryClick(cat);
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 w-full text-left"
              >
                {cat}
              </button>
            ))}
            <div className="border-t border-slate-100 my-2 pt-2">
                <button
                    onClick={() => {
                        onAccountClick();
                        setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 w-full text-left flex items-center"
                >
                    <User size={18} className="mr-2" />
                    My Account
                </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;