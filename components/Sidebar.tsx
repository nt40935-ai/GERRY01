
import React, { useState, useEffect } from 'react';
import { X, Search, Filter, ChevronRight, Gift, BookOpen, ShoppingBag, Briefcase } from 'lucide-react';
import { FilterState, Language, Category } from '../types';
import { TRANSLATIONS, EXCHANGE_RATE } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  language: Language;
  categories: Category[]; // Added categories prop
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, filters, setFilters, language, categories }) => {
  const t = TRANSLATIONS[language];
  // const categories = ['All', ...Object.values(ProductCategory)]; // Replaced by prop
  const uiCategories = [{ id: 'all', key: 'All', name: t.cats['All'] || 'All' }, ...categories];
  
  // Local state for search input to implement "Enter to Search"
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);

  // Sync local state if filters update externally (e.g. clear filters)
  useEffect(() => {
    setLocalSearch(filters.searchQuery);
  }, [filters.searchQuery]);

  const handleCategoryClick = (catKey: string) => {
    setFilters({ ...filters, category: catKey });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setFilters({ ...filters, searchQuery: localSearch });
    }
  };

  // Convert filter price (USD) to display price based on language
  const getDisplayPrice = (price: number) => {
    return language === 'vi' ? Math.round(price * EXCHANGE_RATE) : price;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = Number(e.target.value);
    // Convert display price back to USD for state
    const realValue = language === 'vi' ? value / EXCHANGE_RATE : value;
    
    setFilters({ 
      ...filters, 
      [type === 'min' ? 'minPrice' : 'maxPrice']: realValue 
    });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-[300px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-coffee-900 text-white">
          <span className="font-serif font-bold text-xl tracking-wide">{t.sidebar.menu_filters}</span>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Search */}
          <div className="relative">
            <input 
              type="text" 
              placeholder={t.sidebar.search_placeholder} 
              value={localSearch}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif font-bold text-coffee-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-600" />
              {t.sidebar.categories}
            </h3>
            <div className="space-y-2">
              {uiCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.key)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex justify-between items-center transition-colors ${
                    filters.category === cat.key 
                      ? 'bg-amber-50 text-amber-700 font-bold' 
                      : 'text-coffee-600 hover:bg-gray-50'
                  }`}
                >
                  {/* Translate Category if possible */}
                  {t.cats[cat.key] || cat.name}
                  {filters.category === cat.key && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-serif font-bold text-coffee-900 mb-4">{t.sidebar.price_range}</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                 <div className="flex-1">
                   <label className="text-xs text-gray-500 mb-1 block">{t.sidebar.min} ({language === 'vi' ? 'VND' : '$'})</label>
                   <input 
                    type="number" 
                    value={getDisplayPrice(filters.minPrice)}
                    onChange={(e) => handlePriceChange(e, 'min')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                   />
                 </div>
                 <span className="text-gray-300">-</span>
                 <div className="flex-1">
                   <label className="text-xs text-gray-500 mb-1 block">{t.sidebar.max} ({language === 'vi' ? 'VND' : '$'})</label>
                   <input 
                    type="number" 
                    value={getDisplayPrice(filters.maxPrice)}
                    onChange={(e) => handlePriceChange(e, 'max')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                   />
                 </div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={filters.maxPrice}
                onChange={(e) => {
                    // Slider always works on base USD value for simplicity in logic
                    const val = Number(e.target.value);
                    setFilters({...filters, maxPrice: val});
                }}
                className="w-full accent-amber-600"
              />
            </div>
          </div>

          <div className="h-px bg-gray-100"></div>

          {/* Other Categories */}
          <div>
            <h3 className="font-serif font-bold text-coffee-900 mb-4">{t.sidebar.discover}</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-coffee-600 hover:text-amber-600 transition-colors p-2 hover:bg-gray-50 rounded-lg">
                <Gift className="w-5 h-5" />
                <span>Gift Cards</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-coffee-600 hover:text-amber-600 transition-colors p-2 hover:bg-gray-50 rounded-lg">
                <ShoppingBag className="w-5 h-5" />
                <span>Merchandise</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-coffee-600 hover:text-amber-600 transition-colors p-2 hover:bg-gray-50 rounded-lg">
                <BookOpen className="w-5 h-5" />
                <span>The Coffee Blog</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-coffee-600 hover:text-amber-600 transition-colors p-2 hover:bg-gray-50 rounded-lg">
                <Briefcase className="w-5 h-5" />
                <span>Careers</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button 
            onClick={() => {
              setFilters({ category: 'All', minPrice: 0, maxPrice: 100, searchQuery: '' });
              setLocalSearch('');
            }}
            className="w-full py-3 text-coffee-600 font-semibold text-sm hover:text-coffee-900 transition-colors"
          >
            {t.sidebar.reset}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
