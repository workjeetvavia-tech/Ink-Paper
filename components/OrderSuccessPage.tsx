import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface OrderSuccessPageProps {
  onContinue: () => void;
}

const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ onContinue }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 animate-fadeIn">
      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 border border-green-100">
        <CheckCircle size={48} className="text-green-500" />
      </div>
      <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2 text-center">Order Confirmed!</h1>
      <p className="text-slate-500 text-center max-w-md mb-8 leading-relaxed">
        Thank you for your purchase. We've sent a confirmation email to your inbox. Your order ID is <span className="font-mono font-medium text-slate-900">#{Math.floor(Math.random() * 100000)}</span>.
      </p>
      <button 
        onClick={onContinue}
        className="flex items-center bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
      >
        Continue Shopping <ArrowRight size={18} className="ml-2" />
      </button>
    </div>
  );
};

export default OrderSuccessPage;