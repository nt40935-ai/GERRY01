
import React, { useState, useEffect } from 'react';
import { X, Search, Filter, ChevronRight, Gift, BookOpen, ShoppingBag, Briefcase, User as UserIcon, LogOut, UserCog, LayoutDashboard, Coffee, Leaf, IceCream, Cookie, Droplets, Package } from 'lucide-react';
import { FilterState, Language, Category, User, ProductCategory } from '../../types';
import { TRANSLATIONS, EXCHANGE_RATE } from '../../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  language: Language;
  categories: Category[];
  user?: User | null;
  onOpenProfile?: () => void;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onOpenAdmin?: () => void; // New prop
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  filters, 
  setFilters, 
  language, 
  categories,
  user,
  onOpenProfile,
  onOpenAuth,
  onLogout,
  onOpenAdmin
}) => {
  const t = TRANSLATIONS[language];
  const uiCategories = [{ id: 'all', key: 'All', name: t.cats['All'] || 'All' }, ...categories];
  
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);

  useEffect(() => {
    setLocalSearch(filters.searchQuery);
  }, [filters.searchQuery]);

  const handleCategoryClick = (catKey: string) => {
    setFilters({ ...filters, category: catKey });
    onClose();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setFilters({ ...filters, searchQuery: localSearch });
      onClose();
    }
  };

  const getDisplayPrice = (price: number) => {
    return language === 'vi' ? Math.round(price * EXCHANGE_RATE) : price;
  };

  // Get icon for category
  const getCategoryIcon = (catKey: string) => {
    const key = catKey.toLowerCase();
    if (key.includes('coffee') || key.includes('signature') || catKey === ProductCategory.SIGNATURE || catKey === ProductCategory.HOT_COFFEE || catKey === ProductCategory.ICED_COFFEE) {
      return <Coffee className="w-5 h-5" />;
    }
    if (key.includes('tea') || key.includes('matcha') || catKey === ProductCategory.FRUIT_TEA || catKey === ProductCategory.MILK_TEA || catKey === ProductCategory.MATCHA) {
      return <Leaf className="w-5 h-5" />;
    }
    if (key.includes('blended') || key.includes('freeze') || catKey === ProductCategory.ICE_BLENDED) {
      return <IceCream className="w-5 h-5" />;
    }
    if (key.includes('pastry') || key.includes('cake') || key.includes('bánh') || catKey === ProductCategory.PASTRY) {
      return <Cookie className="w-5 h-5" />;
    }
    if (key.includes('bean') || catKey === ProductCategory.BEANS) {
      return <Package className="w-5 h-5" />;
    }
    if (key.includes('topping') || catKey === ProductCategory.TOPPING) {
      return <Droplets className="w-5 h-5" />;
    }
    return <ShoppingBag className="w-5 h-5" />;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = Number(e.target.value);
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
          
          {/* User Section - Added for mobile visibility */}
          <div className="bg-coffee-50 p-4 rounded-xl">
             {user ? (
               <div>
                 <div className="flex items-center gap-3 mb-4">
                   <img 
                     src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
                     alt={user.name} 
                     className="w-10 h-10 rounded-full border border-amber-500 object-cover"
                   />
                   <div className="overflow-hidden">
                     <p className="font-bold text-coffee-900 truncate">{user.name}</p>
                     <p className="text-xs text-coffee-500 truncate">{user.email}</p>
                   </div>
                 </div>
                 
                 {/* Admin Link Mobile */}
                 {user.role === 'admin' && onOpenAdmin && (
                    <button 
                      onClick={() => { onOpenAdmin(); }}
                      className="w-full flex items-center justify-center gap-2 bg-coffee-900 text-white py-2 rounded-lg text-xs font-bold mb-2 hover:bg-amber-600 transition-colors"
                    >
                      <LayoutDashboard className="w-3 h-3" />
                      Dashboard
                    </button>
                 )}

                 <div className="grid grid-cols-2 gap-2">
                   <button 
                     onClick={() => { onOpenProfile?.(); onClose(); }}
                     className="flex items-center justify-center gap-2 bg-white border border-gray-200 py-2 rounded-lg text-xs font-bold text-coffee-700 hover:bg-amber-50 transition-colors"
                   >
                     <UserCog className="w-3 h-3" />
                     {t.profile.tab_profile}
                   </button>
                   <button 
                     onClick={() => { onLogout?.(); onClose(); }}
                     className="flex items-center justify-center gap-2 bg-white border border-gray-200 py-2 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                   >
                     <LogOut className="w-3 h-3" />
                     {t.nav.sign_out}
                   </button>
                 </div>
               </div>
             ) : (
               <button 
                 onClick={() => { onOpenAuth?.(); onClose(); }}
                 className="w-full flex items-center justify-center gap-2 bg-coffee-900 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-sm"
               >
                 <UserIcon className="w-4 h-4" />
                 {t.nav.sign_in}
               </button>
             )}
          </div>

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
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                    filters.category === cat.key 
                      ? 'bg-red-50 text-red-700 font-bold border-l-4 border-red-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className={`${filters.category === cat.key ? 'text-red-600' : 'text-gray-500'}`}>
                    {getCategoryIcon(cat.key)}
                  </span>
                  <span className="flex-1">{(t.cats as any)[cat.key] || cat.name}</span>
                  {filters.category === cat.key && <ChevronRight className="w-4 h-4 text-red-600" />}
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