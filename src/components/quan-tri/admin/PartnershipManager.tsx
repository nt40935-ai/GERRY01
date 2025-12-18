import React, { useState } from 'react';
import { Language, PartnershipContent, PartnershipCopy } from '../../../types';
import ImageUploader from './ImageUploader';
import { Plus, Trash2 } from 'lucide-react';

interface PartnershipManagerProps {
  content: PartnershipContent;
  onUpdate: (content: PartnershipContent) => void;
  language: Language;
}

const ICON_OPTIONS = ['LineChart', 'ShieldCheck', 'Store', 'Handshake', 'Globe', 'Target'];

const PartnershipManager: React.FC<PartnershipManagerProps> = ({ content, onUpdate, language }) => {
  const [langTab, setLangTab] = useState<'vi' | 'en'>(language);
  const data = content[langTab];

  const patchContent = (patch: Partial<PartnershipCopy>) => {
    onUpdate({
      ...content,
      [langTab]: { ...content[langTab], ...patch },
    });
  };

  const updatePillar = (index: number, key: 'icon' | 'title' | 'desc', value: string) => {
    const nextPillars = data.pillars.map((p, i) => (i === index ? { ...p, [key]: value } : p));
    patchContent({ pillars: nextPillars });
  };

  const addPillar = () => {
    const nextPillars = [...data.pillars, { icon: 'LineChart', title: 'New pillar', desc: 'Mô tả / Description' }];
    patchContent({ pillars: nextPillars });
  };

  const removePillar = (index: number) => {
    if (data.pillars.length <= 1) return;
    const nextPillars = data.pillars.filter((_, i) => i !== index);
    patchContent({ pillars: nextPillars });
  };

  const handleTagChange = (value: string) => {
    const tags = value.split(',').map(t => t.trim()).filter(Boolean);
    patchContent({ tags });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {(['vi', 'en'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLangTab(l)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
              langTab === l ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {l === 'vi' ? 'Tiếng Việt' : 'English'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-coffee-900">Nội dung chính</h3>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-coffee-700">Badge</label>
            <input
              value={data.badge}
              onChange={(e) => patchContent({ badge: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-coffee-700">Tiêu đề</label>
            <input
              value={data.title}
              onChange={(e) => patchContent({ title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-coffee-700">Mô tả</label>
            <textarea
              value={data.subtitle}
              onChange={(e) => patchContent({ subtitle: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-coffee-700">Tags (phân tách bằng dấu phẩy)</label>
            <input
              value={data.tags.join(', ')}
              onChange={(e) => handleTagChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
              placeholder="Playbook 90 ngày, Tech vận hành..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-coffee-700">CTA chính - nhãn</label>
              <input
                value={data.ctaPrimaryText}
                onChange={(e) => patchContent({ ctaPrimaryText: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
              />
              <input
                value={data.ctaPrimaryLink}
                onChange={(e) => patchContent({ ctaPrimaryLink: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none text-sm"
                placeholder="mailto: hoặc https://"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-coffee-700">CTA phụ - nhãn</label>
              <input
                value={data.ctaSecondaryText}
                onChange={(e) => patchContent({ ctaSecondaryText: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
              />
              <input
                value={data.ctaSecondaryLink}
                onChange={(e) => patchContent({ ctaSecondaryLink: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none text-sm"
                placeholder="tel: hoặc https://"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-coffee-700">Liên hệ / Contact note</label>
            <input
              value={data.contactNote}
              onChange={(e) => patchContent({ contactNote: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-coffee-700">Link chat trực tuyến (Messenger / Zalo / Livechat)</label>
            <input
              value={data.chatLink || ''}
              onChange={(e) => patchContent({ chatLink: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none text-sm"
              placeholder="https://m.me/yourpage hoặc https://zalo.me/..."
            />
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-coffee-900">Ảnh hero</h3>
          <ImageUploader
            currentImage={data.imageUrl}
            onImageChange={(url) => patchContent({ imageUrl: url })}
            label="Hero image"
            language={langTab}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-coffee-900">Các trụ cột giá trị</h3>
          <button
            onClick={addPillar}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-coffee-900 font-semibold hover:bg-amber-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Thêm
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.pillars.map((pillar, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-xl space-y-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">#{idx + 1}</span>
                {data.pillars.length > 1 && (
                  <button
                    onClick={() => removePillar(idx)}
                    className="text-red-500 hover:text-red-600"
                    aria-label="Remove pillar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-coffee-700">Icon</label>
                <select
                  value={pillar.icon}
                  onChange={(e) => updatePillar(idx, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none text-sm"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-coffee-700">Tiêu đề</label>
                <input
                  value={pillar.title}
                  onChange={(e) => updatePillar(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-coffee-700">Mô tả</label>
                <textarea
                  value={pillar.desc}
                  onChange={(e) => updatePillar(idx, 'desc', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnershipManager;





