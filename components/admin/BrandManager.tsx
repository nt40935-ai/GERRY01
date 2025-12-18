


import React from 'react';
import { BrandSettings, Language } from '../../types';
import ImageUploader from './ImageUploader';
import { Coffee, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../../constants';

interface BrandManagerProps {
  settings: BrandSettings;
  onUpdate: (settings: BrandSettings) => void;
  language: Language;
}

const BrandManager: React.FC<BrandManagerProps> = ({ settings, onUpdate, language }) => {
  const t = TRANSLATIONS[language];

  // Helper to extract src from iframe if user pastes full embed code
  const handleMapUrlChange = (val: string) => {
    const srcMatch = val.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
      onUpdate({ ...settings, googleMapsEmbedUrl: srcMatch[1] });
    } else {
      onUpdate({ ...settings, googleMapsEmbedUrl: val });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div>
        <h2 className="text-xl font-bold text-coffee-900 mb-2">{t.admin_brand.title}</h2>
        <p className="text-coffee-600">{t.admin_brand.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Visual Identity */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 h-fit">
          <h3 className="font-bold text-coffee-900 border-b border-gray-100 pb-2">Visual Identity</h3>
          
          {/* Brand Name Input */}
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">{t.admin_brand.name}</label>
            <input 
              type="text" 
              value={settings.brandName}
              onChange={(e) => onUpdate({ ...settings, brandName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
            />
          </div>

          {/* Brand Logo Uploader */}
          <ImageUploader 
            label={t.admin_brand.logo}
            currentImage={settings.logoUrl}
            onImageChange={(url) => onUpdate({ ...settings, logoUrl: url })}
            language={language}
          />

           {/* Assistant Avatar Uploader */}
           <ImageUploader 
            label="AI Assistant Avatar"
            currentImage={settings.assistantAvatar || ''}
            onImageChange={(url) => onUpdate({ ...settings, assistantAvatar: url })}
            language={language}
          />
        </div>

        {/* Right Column: Store Information */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
           <h3 className="font-bold text-coffee-900 border-b border-gray-100 pb-2">{t.admin_brand.store_info}</h3>

           <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {t.admin_brand.address}
            </label>
            <input 
              type="text" 
              value={settings.storeAddress || ''}
              onChange={(e) => onUpdate({ ...settings, storeAddress: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
              placeholder="123 Street Name, City, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" /> {t.admin_brand.phone}
            </label>
            <input 
              type="text" 
              value={settings.contactPhone || ''}
              onChange={(e) => onUpdate({ ...settings, contactPhone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
              placeholder="+1 234 567 890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" /> {t.admin_brand.email}
            </label>
            <input 
              type="text" 
              value={settings.contactEmail || ''}
              onChange={(e) => onUpdate({ ...settings, contactEmail: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
              placeholder="contact@brand.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" /> {t.admin_brand.map_url}
            </label>
            <textarea 
              value={settings.googleMapsEmbedUrl || ''}
              onChange={(e) => handleMapUrlChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none text-xs font-mono text-gray-600"
              placeholder="Paste HTML <iframe> code or URL here..."
              rows={4}
            />
            <p className="text-xs text-gray-400 mt-1">Go to Google Maps -&gt; Share -&gt; Embed a map -&gt; Copy HTML</p>
          </div>

          {/* Map Preview */}
          {settings.googleMapsEmbedUrl && (
            <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              <iframe 
                src={settings.googleMapsEmbedUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}

        </div>
      </div>

      {/* Live Preview Header */}
      <div className="mt-8 pt-8 border-t border-gray-100">
          <label className="block text-sm font-medium text-coffee-700 mb-4">{t.admin_brand.header_preview}</label>
          <div className="bg-coffee-900 p-6 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                  {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Coffee className="w-6 h-6 text-amber-500" />
                  )}
                </div>
                <span className="text-xl font-serif font-bold tracking-wider text-white">
                  {settings.brandName.toUpperCase()}<span className="text-amber-500">.</span>
                </span>
            </div>
            <div className="text-white/50 text-sm">Navigation Links...</div>
          </div>
      </div>
    </div>
  );
};

export default BrandManager;