
import React, { useState } from 'react';
import { DiscountCode, Product, Language } from '../../types';
import { Ticket, Plus, Trash2, Calendar, CheckSquare, Square, X } from 'lucide-react';
import { TRANSLATIONS, formatPrice } from '../../constants';

interface PromotionManagerProps {
  promotions: DiscountCode[];
  products: Product[];
  onAdd: (promo: DiscountCode) => void;
  onDelete: (id: string) => void;
  language: Language;
}

const PromotionManager: React.FC<PromotionManagerProps> = ({ promotions, products, onAdd, onDelete, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromo, setCurrentPromo] = useState<Partial<DiscountCode>>({
    type: 'percent',
    applicableProductIds: [],
    isActive: true
  });
  const t = TRANSLATIONS[language];

  const handleCreate = () => {
    setCurrentPromo({
      id: Date.now().toString(),
      type: 'percent',
      applicableProductIds: [],
      isActive: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPromo.code || !currentPromo.value) return;
    onAdd(currentPromo as DiscountCode);
    setIsEditing(false);
    setCurrentPromo({});
  };

  const toggleProduct = (productId: string) => {
    const currentIds = currentPromo.applicableProductIds || [];
    if (currentIds.includes(productId)) {
      setCurrentPromo({ ...currentPromo, applicableProductIds: currentIds.filter(id => id !== productId) });
    } else {
      setCurrentPromo({ ...currentPromo, applicableProductIds: [...currentIds, productId] });
    }
  };

  const toggleAllProducts = () => {
    if ((currentPromo.applicableProductIds?.length || 0) === products.length) {
      setCurrentPromo({ ...currentPromo, applicableProductIds: [] });
    } else {
      setCurrentPromo({ ...currentPromo, applicableProductIds: products.map(p => p.id) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-coffee-900">{t.admin_promotion.title}</h2>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t.admin_promotion.add}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-coffee-50 text-coffee-900 font-semibold border-b border-gray-100">
            <tr>
              <th className="p-4">{t.admin_promotion.code}</th>
              <th className="p-4">{t.admin_promotion.value}</th>
              <th className="p-4">{t.admin_promotion.valid_period}</th>
              <th className="p-4">{t.admin_promotion.applicable}</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {promotions.map(promo => (
              <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <span className="font-mono font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100">
                    {promo.code}
                  </span>
                </td>
                <td className="p-4 font-bold text-coffee-900">
                  {promo.type === 'percent' ? `${promo.value}%` : formatPrice(promo.value, language)}
                </td>
                <td className="p-4 text-sm text-coffee-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {promo.startDate} <span className="text-gray-400">to</span> {promo.endDate}
                  </div>
                </td>
                <td className="p-4 text-sm text-coffee-600">
                  {promo.applicableProductIds.length === products.length 
                    ? t.admin_promotion.all_products 
                    : `${promo.applicableProductIds.length} Products`}
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => onDelete(promo.id)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {promotions.length === 0 && (
               <tr>
                 <td colSpan={5} className="p-8 text-center text-gray-400 italic">No active promotions</td>
               </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-coffee-900">{t.admin_promotion.add}</h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-coffee-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_promotion.code}</label>
                  <input 
                    type="text" 
                    value={currentPromo.code || ''}
                    onChange={e => setCurrentPromo({...currentPromo, code: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none font-mono uppercase"
                    placeholder="SUMMER2024"
                    required
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_promotion.value} (Base USD)</label>
                   <div className="flex gap-2">
                     <input 
                        type="number" 
                        value={currentPromo.value || ''}
                        onChange={e => setCurrentPromo({...currentPromo, value: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                        required
                      />
                      <select 
                        value={currentPromo.type}
                        onChange={e => setCurrentPromo({...currentPromo, type: e.target.value as any})}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none"
                      >
                        <option value="percent">%</option>
                        <option value="fixed">$</option>
                      </select>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_promotion.start_date}</label>
                   <input 
                      type="date"
                      value={currentPromo.startDate || ''}
                      onChange={e => setCurrentPromo({...currentPromo, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                    />
                </div>
                <div>
                   <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_promotion.end_date}</label>
                   <input 
                      type="date"
                      value={currentPromo.endDate || ''}
                      onChange={e => setCurrentPromo({...currentPromo, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                    />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                   <label className="block text-sm font-medium text-coffee-700">{t.admin_promotion.select_products}</label>
                   <button onClick={toggleAllProducts} className="text-xs text-amber-600 font-bold hover:underline">
                      {(currentPromo.applicableProductIds?.length || 0) === products.length ? 'Deselect All' : 'Select All'}
                   </button>
                </div>
                <div className="h-48 overflow-y-auto border border-gray-200 rounded-lg p-2 grid grid-cols-1 gap-1">
                  {products.map(product => {
                    const isSelected = currentPromo.applicableProductIds?.includes(product.id);
                    return (
                      <button 
                        key={product.id}
                        type="button"
                        onClick={() => toggleProduct(product.id)}
                        className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${isSelected ? 'bg-amber-50 border border-amber-200' : 'hover:bg-gray-50 border border-transparent'}`}
                      >
                         {isSelected ? <CheckSquare className="w-4 h-4 text-amber-600" /> : <Square className="w-4 h-4 text-gray-400" />}
                         <img src={product.image} className="w-8 h-8 rounded object-cover bg-gray-200" alt="" />
                         <span className={`text-sm ${isSelected ? 'font-medium text-amber-900' : 'text-gray-600'}`}>{product.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-coffee-600 hover:bg-coffee-50 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  {t.admin_promotion.save}
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionManager;
