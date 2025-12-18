
import React, { useState, useRef } from 'react';
import { Link, Upload } from 'lucide-react';
import { Language } from '../../../types';
import { TRANSLATIONS } from '../../../constants';

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (url: string) => void;
  label?: string;
  language?: Language;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageChange, label = "Image", language = 'en' }) => {
  const [mode, setMode] = useState<'url' | 'file'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert file to base64 for localStorage persistence
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onImageChange(base64String);
      };
      reader.onerror = () => {
        // Fallback to object URL if base64 conversion fails
        const objectUrl = URL.createObjectURL(file);
        onImageChange(objectUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-coffee-700">{label}</label>
      
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors ${
            mode === 'url' ? 'bg-coffee-100 text-coffee-900 ring-2 ring-coffee-200' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Link className="w-4 h-4" />
          {t.uploader.paste}
        </button>
        <button
          type="button"
          onClick={() => setMode('file')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors ${
            mode === 'file' ? 'bg-coffee-100 text-coffee-900 ring-2 ring-coffee-200' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Upload className="w-4 h-4" />
          {t.uploader.upload}
        </button>
      </div>

      <div className="space-y-4">
        {mode === 'url' ? (
          <input 
            type="text" 
            value={currentImage}
            onChange={(e) => onImageChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none text-sm"
            placeholder="https://example.com/image.jpg"
          />
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">{t.uploader.select}</span>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </div>
        )}

        {currentImage && (
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
             <img src={currentImage} alt="Preview" className="w-full h-full object-contain" />
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
               {t.uploader.preview}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;

