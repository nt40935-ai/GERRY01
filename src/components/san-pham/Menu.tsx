
import React, { useState, useEffect } from 'react';
import { Product, FilterState, Language, Category } from '../../types';
import { Plus, Star, Tag, SearchX, Search, Ban } from 'lucide-react';
import { TRANSLATIONS, formatPrice } from '../../constants';

interface MenuProps {
  products: Product[];
  categories: Category[]; // Added dynamic categories
  onAddToCart: (product: Product) => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  language: Language;
}

const Menu: React.FC<MenuProps> = ({ products, categories, onAddToCart, filters, setFilters, language }) => {
  const t = TRANSLATIONS[language];
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);

  useEffect(() => {
    setLocalSearch(filters.searchQuery);
  }, [filters.searchQuery]);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setFilters({ ...filters, searchQuery: localSearch });
    }
  };
  
  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = filters.category === 'All' || product.category === filters.category;
    
    // Normalize query for broader matching
    const query = filters.searchQuery.toLowerCase().trim();
    const matchesSearch = product.name.toLowerCase().includes(query) || 
                          product.description.toLowerCase().includes(query);
                          
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // 'All' is a special UI category, not in the database
  const uiCategories = [{ id: 'all', key: 'All', name: t.cats['All'] || 'All' }, ...categories];

  return (
    <section id="menu" className="py-24 bg-coffee-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif font-bold text-coffee-900 mb-4">{t.menu.title}</h2>
          <div className="w-20 h-1 bg-amber-600 mx-auto rounded-full mb-8"></div>
          
          {/* Main Search Bar */}
          <div className="max-w-md mx-auto mb-10 relative">
             <input 
               type="text"
               value={localSearch}
               onChange={(e) => setLocalSearch(e.target.value)}
               onKeyDown={handleSearchKeyDown}
               placeholder={t.menu.search_placeholder}
               className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-white"
             />
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Quick Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {uiCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilters({ ...filters, category: cat.key })}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filters.category === cat.key
                    ? 'bg-coffee-900 text-white shadow-lg'
                    : cat.key === 'Promotion' // Fallback check or specific ID check if needed
                      ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 shadow-sm'
                      : 'bg-white text-coffee-700 hover:bg-coffee-200 shadow-sm'
                }`}
              >
                {cat.key === 'Promotion' ? (
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {t.menu.special}
                  </span>
                ) : ((t.cats as any)[cat.key] || cat.name)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info if Searching/Filtering */}
        {(filters.searchQuery || filters.minPrice > 0 || filters.maxPrice < 50) && filteredProducts.length > 0 && (
           <div className="text-center mb-8 text-coffee-600">
             {t.menu.found} {filteredProducts.length} {t.menu.items} 
             {filters.searchQuery && <span> {t.menu.matching} "{filters.searchQuery}"</span>}
             {filters.minPrice > 0 && <span> ({formatPrice(filters.minPrice, language)} - {formatPrice(filters.maxPrice, language)})</span>}
           </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative flex flex-col ${!product.isAvailable ? 'opacity-70' : ''}`}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!product.isAvailable ? 'grayscale' : ''}`}
                  />
                  
                  {/* Best Seller or Featured Badge - Bottom Left */}
                  {product.isAvailable && (
                    <>
                      {product.isBestSeller && (
                        <div className="absolute bottom-0 left-0 bg-red-600 text-white px-4 py-2 text-xs font-bold shadow-lg z-10">
                          BÁN CHẠY!
                        </div>
                      )}
                      {product.isFeatured && !product.isBestSeller && (
                        <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-4 py-2 text-xs font-bold shadow-lg z-10">
                          THỬ NGAY!
                        </div>
                      )}
                    </>
                  )}

                  {/* Sale Badge - Top Left */}
                  {product.originalPrice && product.originalPrice > product.price && product.isAvailable && (
                    <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {t.menu.sale}
                    </div>
                  )}

                  {/* Sold Out Badge */}
                  {!product.isAvailable && (
                    <div className="absolute top-4 left-4 z-10 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                      <Ban className="w-3 h-3" />
                      {t.menu.sold_out}
                    </div>
                  )}

                  {/* Rating - Top Right */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-coffee-900">{product.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-coffee-900 group-hover:text-red-600 transition-colors mb-2">
                      {product.name}
                    </h3>
                    <p className="text-coffee-600 text-sm leading-relaxed mb-4 flex-1">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice, language)}
                        </span>
                      )}
                      <span className={`text-xl font-bold ${product.originalPrice ? 'text-red-600' : 'text-red-600'}`}>
                        {formatPrice(product.price, language)}
                      </span>
                    </div>
                    <button
                      onClick={() => product.isAvailable && onAddToCart(product)}
                      disabled={!product.isAvailable}
                      className={`flex-shrink-0 w-10 h-10 rounded-full font-semibold transition-all flex items-center justify-center group/btn ${
                        product.isAvailable 
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:scale-110' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {product.isAvailable ? (
                        <Plus className="w-6 h-6 group-hover/btn:rotate-90 transition-transform" />
                      ) : (
                        <Ban className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-75">
             <SearchX className="w-16 h-16 mx-auto mb-4 text-coffee-400" />
             <h3 className="text-xl font-bold text-coffee-800 mb-2">
               {/* Show specific message if searching, otherwise generic message */}
               {filters.searchQuery ? t.menu.search_not_found : t.menu.no_products}
             </h3>
             <p className="text-coffee-600">{t.menu.try_adjust}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;