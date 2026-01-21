import React from 'react';

const Hero: React.FC<{ onShopNow: () => void }> = ({ onShopNow }) => {
  return (
    <div className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-30"
          src="https://picsum.photos/id/180/1600/900"
          alt="Stationery Desk"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Curated Tools for <br />
          <span className="text-primary-400">Creative Minds</span>
        </h1>
        <p className="mt-6 text-xl text-slate-300 max-w-xl">
          Discover our collection of premium fountain pens, archival notebooks, and art supplies designed to inspire your best work.
        </p>
        <div className="mt-10">
          <button
            onClick={onShopNow}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 md:text-lg md:px-10 transition-transform transform hover:-translate-y-0.5 shadow-lg shadow-primary-500/30"
          >
            Shop Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
