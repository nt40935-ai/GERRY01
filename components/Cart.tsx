
import React from 'react';
import { CartItem, Language } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { TRANSLATIONS, formatPrice } from '../constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  language: Language;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout, language }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const t = TRANSLATIONS[language];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-coffee-50">
          <h2 className="text-2xl font-serif font-bold text-coffee-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-amber-600" />
            {t.cart.title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-coffee-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-coffee-700" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-coffee-400">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">{t.cart.empty}</p>
              <p className="text-sm">{t.cart.empty_desc}</p>
              <button 
                onClick={onClose}
                className="mt-6 text-amber-600 font-semibold hover:underline"
              >
                {t.cart.browse}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 animate-in slide-in-from-right-5 duration-300">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-coffee-900 line-clamp-1">{item.name}</h3>
                    <p className="text-amber-600 font-medium">{formatPrice(item.price, language)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        className="p-1 rounded-md hover:bg-white disabled:opacity-30 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-coffee-700" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 rounded-md hover:bg-white transition-colors"
                      >
                        <Plus className="w-4 h-4 text-coffee-700" />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-coffee-50 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4 text-coffee-600">
              <span>{t.cart.subtotal}</span>
              <span className="font-bold text-coffee-900 text-lg">{formatPrice(total, language)}</span>
            </div>
            <button 
              className="w-full bg-coffee-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition-colors shadow-lg shadow-coffee-900/20 flex items-center justify-center gap-2"
              onClick={onCheckout}
            >
              {t.cart.checkout}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
