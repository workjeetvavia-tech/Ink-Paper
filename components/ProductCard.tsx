import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, onClick }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="aspect-square w-full overflow-hidden bg-slate-100 relative cursor-pointer" onClick={() => onClick(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        )}
        {product.isSale && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            SALE
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
          className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-slate-900 shadow-md hover:bg-primary-500 hover:text-white transition-colors translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2 flex items-center space-x-1">
          <Star className="w-4 h-4 text-amber-400 fill-current" />
          <span className="text-xs text-slate-500 font-medium">{product.rating} ({product.reviews})</span>
        </div>
        <h3 
          onClick={() => onClick(product)}
          className="text-lg font-medium text-slate-900 hover:text-primary-600 cursor-pointer line-clamp-2 mb-1"
        >
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-xl font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</p>
          <button 
             onClick={() => onAdd(product)}
             className="text-sm font-medium text-primary-600 hover:text-primary-800 md:hidden"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
