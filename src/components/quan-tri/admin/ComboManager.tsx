import React, { useState } from 'react';
import { Combo, ComboItem, Product, Language } from '../../../types';
import { formatPrice } from '../../../constants';
import { Plus, Trash2, Edit3, PackagePlus, X } from 'lucide-react';

interface ComboManagerProps {
  combos: Combo[];
  products: Product[];
  onAdd: (combo: Combo) => void;
  onUpdate: (combo: Combo) => void;
  onDelete: (id: string) => void;
  language: Language;
}

const ComboManager: React.FC<ComboManagerProps> = ({ combos, products, onAdd, onUpdate, onDelete, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [draft, setDraft] = useState<Partial<Combo>>({
    name: '',
    description: '',
    image: '',
    price: 0,
    isActive: true,
    items: []
  });

  const reset = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormError('');
    setDraft({ name: '', description: '', image: '', price: 0, isActive: true, items: [] });
  };

  const handleCreate = () => {
    setDraft({
      id: `combo-${Date.now()}`,
      name: '',
      description: '',
      image: '',
      price: 0,
      isActive: true,
      items: [],
      createdAt: new Date().toISOString()
    });
    setEditingId(null);
    setIsEditing(true);
    setFormError('');
  };

  const handleEdit = (combo: Combo) => {
    setDraft({ ...combo });
    setEditingId(combo.id);
    setIsEditing(true);
    setFormError('');
  };

  const toggleProduct = (productId: string) => {
    const items = (draft.items || []) as ComboItem[];
    const idx = items.findIndex(i => i.productId === productId);
    if (idx >= 0) {
      setDraft({ ...draft, items: items.filter(i => i.productId !== productId) });
    } else {
      setDraft({ ...draft, items: [...items, { productId, quantity: 1 }] });
    }
  };

  const updateQty = (productId: string, qty: number) => {
    const items = (draft.items || []) as ComboItem[];
    setDraft({
      ...draft,
      items: items.map(i => (i.productId === productId ? { ...i, quantity: Math.max(1, qty) } : i))
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const name = (draft.name || '').trim();
    const description = (draft.description || '').trim();
    const price = Number(draft.price || 0);
    const items = (draft.items || []) as ComboItem[];

    if (!name || !description) {
      setFormError(language === 'vi' ? 'Vui lòng nhập tên và mô tả combo.' : 'Please enter combo name and description.');
      return;
    }
    if (!price || price <= 0) {
      setFormError(language === 'vi' ? 'Giá combo phải lớn hơn 0.' : 'Combo price must be greater than 0.');
      return;
    }
    if (!items.length) {
      setFormError(language === 'vi' ? 'Vui lòng chọn ít nhất 1 món trong combo.' : 'Please select at least 1 product for the combo.');
      return;
    }

    const payload: Combo = {
      id: (draft.id as string) || `combo-${Date.now()}`,
      name,
      description,
      image: (draft.image || '').trim() || undefined,
      price,
      isActive: !!draft.isActive,
      items,
      createdAt: (draft.createdAt as string) || new Date().toISOString()
    };

    if (editingId) onUpdate(payload);
    else onAdd(payload);

    reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-coffee-900">
            {language === 'vi' ? 'Quản lý Combo' : 'Combo Management'}
          </h2>
          <p className="text-sm text-coffee-600">
            {language === 'vi'
              ? 'Tạo combo (bundle) để khách đặt nhanh và tiết kiệm.'
              : 'Create bundles (combos) for faster ordering and better deals.'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreate}
          className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 transition-colors flex items-center gap-2 active:scale-95 touch-manipulation"
        >
          <Plus className="w-4 h-4" />
          {language === 'vi' ? 'Tạo combo' : 'New combo'}
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-coffee-50 text-coffee-700">
              <tr>
                <th className="p-4 text-left">{language === 'vi' ? 'Tên' : 'Name'}</th>
                <th className="p-4 text-left">{language === 'vi' ? 'Giá' : 'Price'}</th>
                <th className="p-4 text-left">{language === 'vi' ? 'Món' : 'Items'}</th>
                <th className="p-4 text-left">{language === 'vi' ? 'Trạng thái' : 'Status'}</th>
                <th className="p-4 text-right">{language === 'vi' ? 'Thao tác' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {combos.map(c => (
                <tr key={c.id} className="border-t border-gray-100">
                  <td className="p-4">
                    <div className="font-bold text-coffee-900">{c.name}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{c.description}</div>
                  </td>
                  <td className="p-4 font-bold text-amber-700">{formatPrice(c.price, language)}</td>
                  <td className="p-4">
                    <div className="text-coffee-700">{c.items.length} {language === 'vi' ? 'món' : 'items'}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {c.isActive ? (language === 'vi' ? 'Đang bán' : 'Active') : (language === 'vi' ? 'Ẩn' : 'Hidden')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(c)}
                        className="px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-coffee-800 font-semibold flex items-center gap-2 active:scale-95 touch-manipulation"
                      >
                        <Edit3 className="w-4 h-4" />
                        {language === 'vi' ? 'Sửa' : 'Edit'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(c.id)}
                        className="px-3 py-2 rounded-xl border border-red-100 hover:bg-red-50 text-red-700 font-semibold flex items-center gap-2 active:scale-95 touch-manipulation"
                      >
                        <Trash2 className="w-4 h-4" />
                        {language === 'vi' ? 'Xoá' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {combos.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                    {language === 'vi' ? 'Chưa có combo nào.' : 'No combos yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor */}
      {isEditing && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-coffee-900 flex items-center gap-2">
              <PackagePlus className="w-5 h-5 text-amber-600" />
              {editingId ? (language === 'vi' ? 'Sửa combo' : 'Edit combo') : (language === 'vi' ? 'Tạo combo' : 'Create combo')}
            </h3>
            <button
              type="button"
              onClick={reset}
              className="p-2 rounded-xl hover:bg-gray-50 active:scale-95 touch-manipulation"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSave} className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-coffee-700 mb-1">{language === 'vi' ? 'Tên combo' : 'Combo name'}</label>
              <input
                value={draft.name || ''}
                onChange={e => setDraft({ ...draft, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/40 outline-none"
                placeholder={language === 'vi' ? 'Ví dụ: Combo Đêm Khuya' : 'e.g. Late Night Combo'}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-coffee-700 mb-1">{language === 'vi' ? 'Mô tả' : 'Description'}</label>
              <textarea
                value={draft.description || ''}
                onChange={e => setDraft({ ...draft, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/40 outline-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1">{language === 'vi' ? 'Ảnh (URL)' : 'Image (URL)'}</label>
              <input
                value={draft.image || ''}
                onChange={e => setDraft({ ...draft, image: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/40 outline-none"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1">{language === 'vi' ? 'Giá (USD)' : 'Price (USD)'}</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={Number(draft.price || 0)}
                onChange={e => setDraft({ ...draft, price: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500/40 outline-none"
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-3">
              <input
                id="combo-active"
                type="checkbox"
                checked={!!draft.isActive}
                onChange={e => setDraft({ ...draft, isActive: e.target.checked })}
              />
              <label htmlFor="combo-active" className="text-sm font-semibold text-coffee-700">
                {language === 'vi' ? 'Hiển thị combo cho khách' : 'Show combo to customers'}
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-coffee-700 mb-2">
                {language === 'vi' ? 'Chọn món trong combo' : 'Select products in combo'}
              </label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {products.map(p => {
                  const items = (draft.items || []) as ComboItem[];
                  const selected = items.some(i => i.productId === p.id);
                  const qty = items.find(i => i.productId === p.id)?.quantity || 1;
                  return (
                    <div
                      key={p.id}
                      className={`border rounded-xl p-3 ${selected ? 'border-amber-300 bg-amber-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-bold text-coffee-900 truncate">{p.name}</div>
                          <div className="text-xs text-gray-500 truncate">{p.category}</div>
                        </div>
                        <input type="checkbox" checked={selected} onChange={() => toggleProduct(p.id)} />
                      </div>
                      {selected && (
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <span className="text-xs text-gray-600">{language === 'vi' ? 'Số lượng' : 'Qty'}</span>
                          <input
                            type="number"
                            min={1}
                            value={qty}
                            onChange={e => updateQty(p.id, Number(e.target.value))}
                            className="w-20 px-3 py-2 rounded-lg border border-gray-200 outline-none"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {formError && (
              <div className="md:col-span-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm font-semibold">
                {formError}
              </div>
            )}

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={reset}
                className="px-4 py-3 rounded-xl border border-gray-200 text-coffee-800 font-bold hover:bg-gray-50 active:scale-95 touch-manipulation"
              >
                {language === 'vi' ? 'Huỷ' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-coffee-900 text-white font-bold hover:bg-amber-600 active:scale-95 touch-manipulation"
              >
                {language === 'vi' ? 'Lưu combo' : 'Save combo'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ComboManager;


