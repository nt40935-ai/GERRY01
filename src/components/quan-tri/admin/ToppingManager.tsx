
import React, { useState } from 'react';
import { Topping, Language } from '../../../types';
import { Edit2, Trash2, Plus, X, Layers } from 'lucide-react';
import { formatPrice } from '../../../constants';

interface ToppingManagerProps {
  toppings: Topping[];
  onAdd: (topping: Topping) => void;
  onUpdate: (topping: Topping) => void;
  onDelete: (id: string) => void;
  language: Language;
}

const ToppingManager: React.FC<ToppingManagerProps> = ({ toppings, onAdd, onUpdate, onDelete, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTopping, setCurrentTopping] = useState<Partial<Topping>>({});

  const handleCreate = () => {
    setCurrentTopping({ id: Date.now().toString(), name: '', price: 0.50 });
    setIsEditing(true);
  };

  const handleEdit = (topping: Topping) => {
    setCurrentTopping(topping);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this topping?')) {
      onDelete(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTopping.name || currentTopping.price === undefined) return;
    
    const topping = currentTopping as Topping;
    if (toppings.some(t => t.id === topping.id)) {
      onUpdate(topping);
    } else {
      onAdd(topping);
    }
    setIsEditing(false);
    setCurrentTopping({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-coffee-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-600" />
            Topping Management
        </h2>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Topping
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-coffee-50 text-coffee-900 font-semibold border-b border-gray-100">
            <tr>
              <th className="p-4">Topping Name</th>
              <th className="p-4">Price (USD)</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {toppings.map(topping => (
              <tr key={topping.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-coffee-900">
                   {topping.name}
                </td>
                <td className="p-4 text-coffee-600 font-mono">
                    {formatPrice(topping.price, language)}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(topping)}
                      className="p-2 text-coffee-600 hover:bg-coffee-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(topping.id)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {toppings.length === 0 && (
                <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-400 italic">No toppings added yet.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-2xl">
              <h3 className="text-lg font-bold text-coffee-900">
                {toppings.some(t => t.id === currentTopping.id) ? 'Edit Topping' : 'New Topping'}
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
                <label className="block text-sm font-medium text-coffee-700 mb-1">Topping Name</label>
                <input 
                  type="text" 
                  value={currentTopping.name || ''}
                  onChange={e => setCurrentTopping({...currentTopping, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                  placeholder="e.g. Golden Pearl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">Price (USD)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={currentTopping.price}
                  onChange={e => setCurrentTopping({...currentTopping, price: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                  required
                />
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
                  Save Topping
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToppingManager;
