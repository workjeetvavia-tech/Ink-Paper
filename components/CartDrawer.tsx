import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition-transform ease-in-out duration-300 bg-white shadow-2xl flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 border-b border-slate-100 sm:px-6">
            <h2 className="text-lg font-medium text-slate-900 flex items-center">
              <ShoppingBag className="mr-2" size={20} />
              Shopping Cart ({items.length})
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-500">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-slate-50 rounded-full">
                    <ShoppingBag size={48} className="text-slate-300" />
                </div>
                <p className="text-slate-500 text-lg">Your cart is empty.</p>
                <button 
                  onClick={onClose}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Continue Shopping &rarr;
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex py-2 animate-fadeIn">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-slate-900">
                          <h3 className="line-clamp-2">{item.name}</h3>
                          <p className="ml-4">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center space-x-3 bg-slate-50 rounded-lg p-1">
                            <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="p-1 hover:bg-white rounded-md transition-colors text-slate-500 hover:text-slate-700 hover:shadow-sm"
                                disabled={item.quantity <= 1}
                            >
                                <Minus size={14} />
                            </button>
                            <span className="font-medium w-4 text-center">{item.quantity}</span>
                            <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="p-1 hover:bg-white rounded-md transition-colors text-slate-500 hover:text-slate-700 hover:shadow-sm"
                            >
                                <Plus size={14} />
                            </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          className="font-medium text-rose-500 hover:text-rose-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-100 px-4 py-6 sm:px-6 bg-slate-50">
              <div className="flex justify-between text-base font-medium text-slate-900 mb-4">
                <p>Subtotal</p>
                <p>₹{subtotal.toLocaleString('en-IN')}</p>
              </div>
              <p className="mt-0.5 text-sm text-slate-500 mb-6">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                className="w-full flex items-center justify-center rounded-full border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
                onClick={onCheckout}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;