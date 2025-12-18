
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Coffee, Menu as MenuIcon, User as UserIcon, LogOut, Globe, UserCog, LayoutDashboard } from 'lucide-react';
import { CartItem, User, Language, BrandSettings } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenSidebar: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onScrollTo: (sectionId: string) => void;
  user: User | null;
  onLogout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  brandSettings: BrandSettings;
  onOpenAdmin?: () => void; // New prop
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartItems, 
  onOpenCart, 
  onOpenSidebar, 
  onOpenAuth, 
  onOpenProfile,
  onScrollTo, 
  user, 
  onLogout,
  language,
  setLanguage,
  brandSettings,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-coffee-900/95 backdrop-blur-md shadow-lg py-3' 
      : 'bg-transparent py-6'
  }`;

  const textColor = isScrolled ? 'text-white' : 'text-coffee-900 md:text-white'; 

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
           {/* Sidebar Toggle */}
           <button 
             onClick={onOpenSidebar}
             className={`p-2 rounded-lg transition-colors hover:bg-white/20 ${textColor}`}
           >
             <MenuIcon className="w-6 h-6" />
           </button>

           {/* Logo */}
           <div 
             className="flex items-center gap-2 cursor-pointer group" 
             onClick={() => onScrollTo('hero')}
           >
             {brandSettings.logoUrl ? (
               <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${isScrolled ? 'border-amber-500' : 'border-white/50'}`}>
                 <img src={brandSettings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
               </div>
             ) : (
               <div className={`p-2 rounded-full hidden sm:block ${isScrolled ? 'bg-coffee-800' : 'bg-white/20 backdrop-blur-sm'}`}>
                 <Coffee className={`w-5 h-5 ${isScrolled ? 'text-amber-500' : 'text-amber-400'}`} />
               </div>
             )}
             
             <span className={`text-xl md:text-2xl font-serif font-bold tracking-wider ${textColor}`}>
               {brandSettings.brandName.toUpperCase()}<span className="text-amber-500">.</span>
             </span>
           </div>
        </div>

        {/* Center: Desktop Menu Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: 'menu', label: t.nav.menu },
            { id: 'careers', label: t.nav.careers },
            { id: 'apply', label: t.nav.apply },
            { id: 'partnership', label: t.nav.partner || 'Partnerships' },
            { id: 'about', label: t.nav.about },
            { id: 'contact', label: t.nav.contact }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
              className={`text-sm font-medium uppercase tracking-widest hover:text-amber-500 transition-colors ${textColor}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Icons (Lang + Auth + Cart) */}
        <div className="flex items-center gap-3">
          
          {/* Language Toggle */}
          <button 
             onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
             className={`p-2 rounded-lg flex items-center gap-1 font-bold text-xs uppercase ${textColor} hover:bg-white/20 transition-all`}
          >
            <Globe className="w-4 h-4" />
            <span>{language}</span>
          </button>

          {/* Auth Button */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full border-2 border-amber-500 object-cover"
                />
                <span className={`hidden md:block text-sm font-bold ${textColor}`}>{user.name}</span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-coffee-900 truncate">{user.name}</p>
                    <p className="text-xs text-coffee-500 truncate">{user.email}</p>
                  </div>
                  
                  {user.role === 'admin' && onOpenAdmin && (
                    <button 
                      onClick={() => {
                          onOpenAdmin();
                          setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-coffee-700 hover:bg-coffee-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                  )}

                  <button 
                    onClick={() => {
                        onOpenProfile();
                        setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-coffee-700 hover:bg-coffee-50 flex items-center gap-2"
                  >
                    <UserCog className="w-4 h-4" />
                    {t.nav.profile}
                  </button>

                  <button 
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {t.nav.sign_out}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                 isScrolled 
                   ? 'bg-amber-600 text-white hover:bg-amber-700' 
                   : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-bold">{t.nav.sign_in}</span>
            </button>
          )}

          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className={`relative p-2 rounded-full transition-colors ${
              isScrolled ? 'hover:bg-coffee-800 text-white' : 'hover:bg-white/20 text-coffee-900 md:text-white'
            }`}
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-transparent">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;