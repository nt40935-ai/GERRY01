

import React, { useState } from 'react';
import { Coffee, ArrowLeft, Eye, EyeOff, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../../constants';
import { Language } from '../../types';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<Language>('vi'); // Local state for standalone login
  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'nt40935@gmail.com' && password === 'Khoahuynh1234@') {
      onLogin();
    } else {
      setError(t.admin_login.invalid);
    }
  };

  return (
    <div className="min-h-screen bg-coffee-50 flex flex-col items-center justify-center p-6 relative" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-coffee-700 hover:text-coffee-900 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        {t.admin_login.back}
      </button>

      <button 
         onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
         className="absolute top-6 right-6 flex items-center gap-1 text-coffee-700 hover:text-coffee-900 font-bold text-sm uppercase"
      >
        <Globe className="w-4 h-4" />
        {language}
      </button>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-coffee-100">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-coffee-900 rounded-full mb-4">
            <Coffee className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-coffee-900">{t.admin_login.title}</h2>
          <p className="text-coffee-500">{t.admin_login.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">{t.admin_login.email}</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              placeholder={language === 'vi' ? 'Email hoặc SĐT' : 'admin@gerrycoffee.com'}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">{t.admin_login.password}</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-coffee-900 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-coffee-900/20"
          >
            {t.admin_login.sign_in}
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-coffee-400">
          Demo Credentials: nt40935@gmail.com / Khoahuynh1234@
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;