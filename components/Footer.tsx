


import React from 'react';
import { Coffee, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Lock } from 'lucide-react';
import { Language, BrandSettings } from '../types';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  onAdminClick: () => void;
  language: Language;
  brandSettings?: BrandSettings; // Made optional to support old usage but should be passed
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, language, brandSettings }) => {
  const t = TRANSLATIONS[language];
  
  // Default values fallback if brandSettings not yet loaded (though App passes defaults)
  const brandName = brandSettings?.brandName || 'GERRY';
  const logoUrl = brandSettings?.logoUrl;
  const address = brandSettings?.storeAddress || '123 Coffee Lane, Brew District, Seattle, WA 98101';
  const phone = brandSettings?.contactPhone || '+1 (555) 123-4567';
  const email = brandSettings?.contactEmail || 'hello@gerrycoffee.com';
  const mapUrl = brandSettings?.googleMapsEmbedUrl;

  return (
    <footer id="contact" className="bg-coffee-900 text-coffee-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-coffee-800 flex items-center justify-center overflow-hidden">
                {logoUrl ? (
                   <img src={logoUrl} alt={brandName} className="w-full h-full object-cover" />
                ) : (
                   <Coffee className="w-6 h-6 text-amber-500" />
                )}
              </div>
              <span className="text-2xl font-serif font-bold tracking-wider text-white">
                {brandName.toUpperCase()}<span className="text-amber-500">.</span>
              </span>
            </div>
            <p className="text-coffee-300 leading-relaxed">
              Brewing moments of joy, one cup at a time. Experience the future of coffee today.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-coffee-800 rounded-full hover:bg-amber-600 transition-colors">
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-serif">{t.footer.quick_links}</h3>
            <ul className="space-y-4">
              {['Home', 'Menu', 'About', 'Sustainability', 'Careers'].map(link => (
                <li key={link}>
                  <a href="#" className="text-coffee-300 hover:text-amber-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-serif">{t.footer.contact}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-coffee-300">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3 text-coffee-300">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-3 text-coffee-300">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
          </div>

          {/* Map & Hours */}
          <div className="space-y-6">
             {mapUrl ? (
                <div className="w-full h-40 rounded-xl overflow-hidden border border-coffee-800 shadow-lg">
                  <iframe 
                    src={mapUrl} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Store Location"
                  ></iframe>
                </div>
             ) : (
                <div>
                  <h3 className="text-lg font-bold text-white mb-6 font-serif">{t.footer.hours}</h3>
                  <ul className="space-y-3 text-coffee-300">
                    <li className="flex justify-between">
                      <span>Mon - Fri</span>
                      <span className="text-white font-medium">7:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Weekend</span>
                      <span className="text-white font-medium">8:00 AM - 9:00 PM</span>
                    </li>
                  </ul>
                </div>
             )}
             {/* If map exists, show abbreviated hours below it */}
             {mapUrl && (
                <div className="text-sm text-coffee-300 flex justify-between">
                   <span>Daily:</span>
                   <span className="text-white">7:00 AM - 9:00 PM</span>
                </div>
             )}
          </div>
        </div>

        <div className="border-t border-coffee-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-coffee-400 text-sm">
            © 2024 {brandName}. {t.footer.rights}
          </p>
          <div className="flex gap-6 text-sm text-coffee-400 items-center">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <button onClick={onAdminClick} className="flex items-center gap-1 hover:text-white ml-4">
               <Lock className="w-3 h-3" /> Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;