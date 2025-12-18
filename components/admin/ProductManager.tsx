
import React, { useState } from 'react';
import { Product, ProductCategory, Language, Category } from '../../types';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { TRANSLATIONS, formatPrice } from '../../constants';

interface ProductManagerProps {
  products: Product[];
  categories: Category[]; // Added categories prop
  onAdd: (product: Product) => void;
  onUpdate: (product: Product) => void;
  onDelete: (id: string) => void;
  language: Language;
}

const ProductManager: React.FC<ProductManagerProps> = ({ products, categories, onAdd, onUpdate, onDelete, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const t = TRANSLATIONS[language];

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentProduct({
      id: Date.now().toString(),
      rating: 5.0,
      image: 'https://picsum.photos/400/400'
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.price) return;
    
    // Simple validation and type casting for the demo
    const product = currentProduct as Product;
    
    if (products.some(p => p.id === product.id)) {
      onUpdate(product);
    } else {
      onAdd(product);
    }
    setIsEditing(false);
    setCurrentProduct({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-coffee-900">{t.admin_product.title}</h2>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t.admin_product.add}
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-coffee-50 text-coffee-900 font-semibold border-b border-gray-100">
            <tr>
              <th className="p-4">{t.admin_product.name}</th>
              <th className="p-4">{t.admin_product.category}</th>
              <th className="p-4">{t.admin_product.price}</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                  <span className="font-medium text-coffee-800">{product.name}</span>
                </td>
                <td className="p-4 text-coffee-600">
                  <span className={`px-2 py-1 text-xs rounded-full ${product.category === ProductCategory.PROMOTION ? 'bg-red-100 text-red-800' : 'bg-coffee-100 text-coffee-800'}`}>
                    {t.cats[product.category] || product.category}
                  </span>
                </td>
                <td className="p-4 font-mono text-coffee-900">
                  {product.originalPrice ? (
                     <div>
                       <span className="text-xs text-red-400 line-through block">{formatPrice(product.originalPrice, language)}</span>
                       <span>{formatPrice(product.price, language)}</span>
                     </div>
                  ) : (
                    <span>{formatPrice(product.price, language)}</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="p-2 text-coffee-600 hover:bg-coffee-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(product.id)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-coffee-900">
                {products.some(p => p.id === currentProduct.id) ? t.admin_product.edit : t.admin_product.new}
              </h3>
              <button 
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-coffee-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_product.name}</label>
                <input 
                  type="text" 
                  value={currentProduct.name || ''}
                  onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_product.price} (USD)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={currentProduct.price || ''}
                    onChange={e => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                    required
                  />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_product.original_price} (USD)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={currentProduct.originalPrice || ''}
                    onChange={e => setCurrentProduct({...currentProduct, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                    placeholder="Optional"
                  />
                </div>
              </div>

               <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_product.category}</label>
                  <select 
                    value={currentProduct.category || ProductCategory.HOT_COFFEE}
                    onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.key}>{t.cats[c.key] || c.name}</option>
                    ))}
                  </select>
                </div>

              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_product.description}</label>
                <textarea 
                  value={currentProduct.description || ''}
                  onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                  rows={3}
                  required
                />
              </div>

              {/* Updated to use ImageUploader */}
              <ImageUploader 
                label={t.admin_product.image}
                currentImage={currentProduct.image || ''}
                onImageChange={(url) => setCurrentProduct({...currentProduct, image: url})}
                language={language}
              />

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-coffee-600 hover:bg-coffee-50 rounded-lg font-medium transition-colors"
                >
                  {t.admin_product.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20"
                >
                  {t.admin_product.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
