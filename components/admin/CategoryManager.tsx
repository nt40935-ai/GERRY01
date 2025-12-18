
import React, { useState } from 'react';
import { Category, Language } from '../../types';
import { Edit2, Trash2, Plus, X, Tag } from 'lucide-react';
import { TRANSLATIONS } from '../../constants';

interface CategoryManagerProps {
  categories: Category[];
  onAdd: (cat: Category) => void;
  onUpdate: (cat: Category) => void;
  onDelete: (id: string) => void;
  language: Language;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onAdd, onUpdate, onDelete, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCat, setCurrentCat] = useState<Partial<Category>>({});
  const t = TRANSLATIONS[language];

  const handleCreate = () => {
    setCurrentCat({ id: Date.now().toString(), name: '', key: '' });
    setIsEditing(true);
  };

  const handleEdit = (cat: Category) => {
    setCurrentCat(cat);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCat.name || !currentCat.key) return;
    
    const cat = currentCat as Category;
    if (categories.some(c => c.id === cat.id)) {
      onUpdate(cat);
    } else {
      onAdd(cat);
    }
    setIsEditing(false);
    setCurrentCat({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-coffee-900">{t.admin_category.title}</h2>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t.admin_category.add}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-coffee-50 text-coffee-900 font-semibold border-b border-gray-100">
            <tr>
              <th className="p-4">{t.admin_category.name}</th>
              <th className="p-4">{t.admin_category.key}</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-coffee-900 flex items-center gap-2">
                   <Tag className="w-4 h-4 text-amber-500" />
                   {cat.name}
                </td>
                <td className="p-4 text-coffee-600 font-mono text-sm bg-gray-50 rounded w-fit px-2">{cat.key}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(cat)}
                      className="p-2 text-coffee-600 hover:bg-coffee-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(cat.id)}
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

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-2xl">
              <h3 className="text-lg font-bold text-coffee-900">
                {categories.some(c => c.id === currentCat.id) ? t.admin_category.edit : t.admin_category.add}
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
                <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_category.name}</label>
                <input 
                  type="text" 
                  value={currentCat.name || ''}
                  onChange={e => setCurrentCat({...currentCat, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                  placeholder="e.g. Vietnamese Coffee"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_category.key}</label>
                <input 
                  type="text" 
                  value={currentCat.key || ''}
                  onChange={e => setCurrentCat({...currentCat, key: e.target.value.replace(/\s+/g, '_').toUpperCase()})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none font-mono text-sm"
                  placeholder="e.g. VN_COFFEE"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Unique identifier for the system.</p>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-coffee-600 hover:bg-coffee-50 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  {t.admin_category.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
