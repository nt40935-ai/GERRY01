
import React, { useState, useEffect } from 'react';
import { Product, ProductSize, Language, ProductCategory, Review, User, Topping } from '../../types';
import { X, Coffee, MessageSquare, Star, Layers, Check, Share2 } from 'lucide-react';
import { TRANSLATIONS, formatPrice, calculateItemPrice } from '../../constants';
import ReviewSection from './ReviewSection';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product, size?: ProductSize, note?: string, toppings?: Topping[]) => void;
  onShare?: (product: Product) => void;
  language: Language;
  reviews: Review[];
  onAddReview: (review: Review) => void;
  user: User | null;
  toppings: Topping[]; // Dynamic toppings passed from App state
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onConfirm, onShare, language, reviews, onAddReview, user, toppings, sizeLPrice }) => {
  const [size, setSize] = useState<ProductSize>('M');
  const [note, setNote] = useState('');
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (isOpen) {
      setSize('M');
      setNote('');
      setSelectedToppings([]);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  // Logic to determine if a product has sizes & toppings
  const isDrink = [
    ProductCategory.SIGNATURE,
    ProductCategory.HOT_COFFEE,
    ProductCategory.ICED_COFFEE,
    ProductCategory.FRUIT_TEA,
    ProductCategory.MILK_TEA,
    ProductCategory.MACCHIATO,
    ProductCategory.ICE_BLENDED,
    ProductCategory.MATCHA,
  ].some(cat => cat === product.category);

  const toggleTopping = (topping: Topping) => {
    if (selectedToppings.find(t => t.id === topping.id)) {
      setSelectedToppings(prev => prev.filter(t => t.id !== topping.id));
    } else {
      setSelectedToppings(prev => [...prev, topping]);
    }
  };

  const currentTotal = calculateItemPrice(product, isDrink ? size : undefined, selectedToppings, sizeLPrice);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl h-[95vh] sm:h-[90vh] rounded-xl sm:rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {onShare && (
          <button
            type="button"
            onClick={() => onShare(product)}
            className="absolute top-2 right-14 sm:top-4 sm:right-16 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-md z-10 active:scale-95 touch-manipulation"
            aria-label="Share"
            title={language === 'vi' ? 'Chia sẻ' : 'Share'}
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
        <button 
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-md z-10 active:scale-95 touch-manipulation"
            aria-label="Close"
        >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Header Image */}
            <div className="h-48 sm:h-56 md:h-64 relative">
            <img src={product.image} alt={product.name} className={`w-full h-full object-cover ${!product.isAvailable ? 'grayscale' : ''}`} />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white mb-1 shadow-sm">{product.name}</h3>
                <div className="flex items-center gap-2 text-white/90">
                   <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                   <span className="font-bold text-sm sm:text-base">{product.rating.toFixed(1)}</span>
                   <span className="text-xs sm:text-sm opacity-80">({product.reviewCount || 0} reviews)</span>
                </div>
            </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
            <p className="text-coffee-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">{product.description}</p>

            <div className="space-y-6">
                
                {/* Size Selector */}
                {isDrink && product.isAvailable && (
                <div>
                    <label className="block text-sm font-bold text-coffee-800 mb-3 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-amber-600" />
                    {t.modal.size}
                    </label>
                    <div className="flex gap-3 sm:gap-4">
                    <label className={`flex-1 cursor-pointer border rounded-lg sm:rounded-xl p-2.5 sm:p-3 flex flex-col items-center gap-1 transition-all active:scale-95 touch-manipulation ${
                        size === 'M' 
                        ? 'border-amber-500 bg-amber-50 text-amber-900' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}>
                        <input 
                        type="radio" 
                        name="size" 
                        value="M" 
                        checked={size === 'M'} 
                        onChange={() => setSize('M')}
                        className="hidden" 
                        />
                        <span className="font-bold text-base sm:text-lg">M</span>
                        <span className="text-xs">Regular</span>
                    </label>

                    <label className={`flex-1 cursor-pointer border rounded-lg sm:rounded-xl p-2.5 sm:p-3 flex flex-col items-center gap-1 transition-all active:scale-95 touch-manipulation ${
                        size === 'L' 
                        ? 'border-amber-500 bg-amber-50 text-amber-900' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}>
                        <input 
                        type="radio" 
                        name="size" 
                        value="L" 
                        checked={size === 'L'} 
                        onChange={() => setSize('L')}
                        className="hidden" 
                        />
                        <span className="font-bold text-base sm:text-lg">L</span>
                        <span className="text-xs">Large (+{formatPrice(sizeLPrice, language)})</span>
                    </label>
                    </div>
                </div>
                )}

                {/* Toppings Selector */}
                {isDrink && product.isAvailable && (
                  <div>
                    <label className="block text-sm font-bold text-coffee-800 mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-600" />
                      {t.modal.toppings}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {toppings.map((topping) => {
                        const isSelected = selectedToppings.some(t => t.id === topping.id);
                        return (
                          <div 
                            key={topping.id}
                            onClick={() => toggleTopping(topping)}
                            className={`cursor-pointer border rounded-lg p-2.5 sm:p-3 flex items-center justify-between transition-all active:scale-95 touch-manipulation ${
                              isSelected 
                                ? 'border-amber-500 bg-amber-50' 
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <span className={`text-sm ${isSelected ? 'font-bold text-coffee-900' : 'text-coffee-600'}`}>
                              {topping.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-amber-600 font-medium">+{formatPrice(topping.price, language)}</span>
                              <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-amber-500 border-amber-500' : 'border-gray-300 bg-white'}`}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Note Input */}
                {product.isAvailable && (
                  <div>
                  <label className="block text-sm font-bold text-coffee-800 mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-600" />
                      {t.modal.note}
                  </label>
                  <textarea 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={t.modal.note_placeholder}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/50 outline-none text-sm resize-none"
                      rows={2}
                  />
                  </div>
                )}
                
                {/* Reviews */}
                <ReviewSection 
                    productId={product.id}
                    reviews={reviews}
                    onAddReview={onAddReview}
                    user={user}
                    language={language}
                />
            </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl shadow-lg z-20">
            <div className="flex items-center justify-between gap-4">
               <div>
                  <p className="text-xs text-gray-500">Total Price</p>
                  <p className="text-2xl font-bold text-coffee-900">{formatPrice(currentTotal, language)}</p>
               </div>
               <button 
                 onClick={() => product.isAvailable && onConfirm(product, isDrink ? size : undefined, note, selectedToppings)}
                 disabled={!product.isAvailable}
                 className={`flex-1 py-3 rounded-xl font-bold transition-colors shadow-lg ${
                   product.isAvailable 
                     ? 'bg-coffee-900 text-white hover:bg-amber-600 shadow-coffee-900/20' 
                     : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                 }`}
               >
                 {product.isAvailable ? t.modal.add : t.modal.sold_out}
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
