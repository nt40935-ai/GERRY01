
import React, { useState } from 'react';
import { Language } from '../../../types';
import { Edit2, Save, Ruler } from 'lucide-react';
import { formatPrice } from '../../../constants';

interface SizePriceManagerProps {
  sizeLPrice: number;
  onUpdate: (price: number) => void;
  language: Language;
}

const SizePriceManager: React.FC<SizePriceManagerProps> = ({ sizeLPrice, onUpdate, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editPrice, setEditPrice] = useState(sizeLPrice);

  const handleEdit = () => {
    setEditPrice(sizeLPrice);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditPrice(sizeLPrice);
    setIsEditing(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editPrice < 0) {
      alert(language === 'vi' ? 'Giá không thể âm' : 'Price cannot be negative');
      return;
    }
    onUpdate(editPrice);
    setIsEditing(false);
  };

  const t = {
    title: language === 'vi' ? 'Quản Lý Giá Kích Thước Ly' : 'Cup Size Price Management',
    description: language === 'vi' 
      ? 'Điều chỉnh giá phụ thu cho kích thước L (Large). Giá M (Medium) là giá gốc của sản phẩm.' 
      : 'Adjust the upcharge price for L (Large) size. M (Medium) size uses the base product price.',
    size_m: language === 'vi' ? 'Kích Thước M (Medium)' : 'Size M (Medium)',
    size_l: language === 'vi' ? 'Kích Thước L (Large)' : 'Size L (Large)',
    price: language === 'vi' ? 'Giá Phụ Thu' : 'Upcharge Price',
    base_price: language === 'vi' ? 'Giá Gốc (M)' : 'Base Price (M)',
    edit: language === 'vi' ? 'Chỉnh Sửa' : 'Edit',
    save: language === 'vi' ? 'Lưu' : 'Save',
    cancel: language === 'vi' ? 'Hủy' : 'Cancel',
    note: language === 'vi' 
      ? 'Giá L = Giá sản phẩm + Phụ thu L' 
      : 'Price L = Product price + L upcharge'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-coffee-900 flex items-center gap-2">
            <Ruler className="w-6 h-6 text-amber-600" />
            {t.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{t.description}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Size M Info */}
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-coffee-900 mb-1">{t.size_m}</h3>
                <p className="text-sm text-gray-500">{t.base_price}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-coffee-900">
                  {language === 'vi' ? '0đ' : '$0.00'}
                </p>
                <p className="text-xs text-gray-400">
                  {language === 'vi' ? '(Giá gốc)' : '(Base price)'}
                </p>
              </div>
            </div>
          </div>

          {/* Size L Management */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-coffee-900 mb-1">{t.size_l}</h3>
                <p className="text-sm text-gray-500">{t.price}</p>
              </div>
              {!isEditing && (
                <button 
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 text-coffee-600 hover:bg-coffee-50 rounded-lg transition-colors border border-coffee-200"
                >
                  <Edit2 className="w-4 h-4" />
                  {t.edit}
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-2">
                    {t.price} (USD)
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    value={editPrice}
                    onChange={e => setEditPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none text-lg font-semibold"
                    required
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-1">{t.note}</p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-coffee-600 hover:bg-coffee-50 rounded-lg font-medium transition-colors border border-coffee-200"
                  >
                    {t.cancel}
                  </button>
                  <button 
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {t.save}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t.price}</p>
                    <p className="text-2xl font-bold text-coffee-900">
                      {formatPrice(sizeLPrice, language)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {language === 'vi' ? 'Giá hiện tại' : 'Current price'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizePriceManager;

