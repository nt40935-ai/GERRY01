
import React, { useState } from 'react';
import { Banner, Language } from '../../../types';
import { Edit2, Trash2, Plus, X, Eye, EyeOff } from 'lucide-react';
import { TRANSLATIONS } from '../../../constants';
import ImageUploader from './ImageUploader';

interface BannerManagerProps {
  banners: Banner[];
  onAdd: (banner: Banner) => void;
  onUpdate: (banner: Banner) => void;
  onDelete: (id: string) => void;
  language: Language;
}

const BannerManager: React.FC<BannerManagerProps> = ({ banners, onAdd, onUpdate, onDelete, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<Partial<Banner>>({});
  const t = TRANSLATIONS[language];

  const handleEdit = (banner: Banner) => {
    setCurrentBanner(banner);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentBanner({
      id: Date.now().toString(),
      isActive: true,
      imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80',
      linkSection: 'menu'
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBanner.title) return;
    
    const banner = currentBanner as Banner;
    
    if (banners.some(b => b.id === banner.id)) {
      onUpdate(banner);
    } else {
      onAdd(banner);
    }
    setIsEditing(false);
    setCurrentBanner({});
  };

  const toggleStatus = (banner: Banner) => {
    onUpdate({ ...banner, isActive: !banner.isActive });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-coffee-900">{t.admin_banner.title}</h2>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t.admin_banner.add}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-coffee-50 text-coffee-900 font-semibold border-b border-gray-100">
            <tr>
              <th className="p-4">{t.admin_banner.preview}</th>
              <th className="p-4">{t.admin_banner.headline} & {t.admin_banner.subtitle}</th>
              <th className="p-4">{t.admin_banner.countdown}</th>
              <th className="p-4">{t.admin_banner.status}</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {banners.map(banner => (
              <tr key={banner.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <img src={banner.imageUrl} alt="" className="w-20 h-12 rounded-lg object-cover bg-gray-100" />
                </td>
                <td className="p-4">
                  <div className="font-medium text-coffee-900">{banner.title}</div>
                  <div className="text-xs text-coffee-500 truncate max-w-[200px]">{banner.subtitle}</div>
                </td>
                <td className="p-4 text-sm text-coffee-600">
                  {banner.endsAt ? (
                     <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md font-mono text-xs">
                       {new Date(banner.endsAt).toLocaleDateString()}
                     </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => toggleStatus(banner)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      banner.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {banner.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {banner.isActive ? t.admin_banner.active : t.admin_banner.hidden}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(banner)}
                      className="p-2 text-coffee-600 hover:bg-coffee-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(banner.id)}
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
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-coffee-900">
                {banners.some(b => b.id === currentBanner.id) ? t.admin_product.edit : t.admin_banner.add}
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
                <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_banner.headline}</label>
                <input 
                  type="text" 
                  value={currentBanner.title || ''}
                  onChange={e => setCurrentBanner({...currentBanner, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_banner.subtitle}</label>
                <textarea 
                  value={currentBanner.subtitle || ''}
                  onChange={e => setCurrentBanner({...currentBanner, subtitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_banner.cta}</label>
                  <input 
                    type="text" 
                    value={currentBanner.ctaText || ''}
                    onChange={e => setCurrentBanner({...currentBanner, ctaText: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                    placeholder="e.g. Order Now"
                  />
                 </div>
                 <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_banner.link}</label>
                  <select 
                    value={currentBanner.linkSection || 'menu'}
                    onChange={e => setCurrentBanner({...currentBanner, linkSection: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                  >
                    <option value="menu">Menu</option>
                    <option value="about">About</option>
                    <option value="contact">Contact</option>
                  </select>
                 </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-1">{t.admin_banner.countdown} (Optional)</label>
                <input 
                  type="datetime-local" 
                  value={currentBanner.endsAt ? new Date(currentBanner.endsAt).toISOString().slice(0, 16) : ''}
                  onChange={e => setCurrentBanner({...currentBanner, endsAt: e.target.value ? new Date(e.target.value).toISOString() : undefined})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                />
              </div>

              <div>
                <ImageUploader
                  currentImage={currentBanner.imageUrl || ''}
                  onImageChange={(url) => setCurrentBanner({...currentBanner, imageUrl: url})}
                  label={t.admin_banner.image_url}
                  language={language}
                />
              </div>

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
                  {t.admin_banner.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManager;

