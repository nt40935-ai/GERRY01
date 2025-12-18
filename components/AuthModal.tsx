

import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { User as UserType, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserType) => void;
  language: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, language }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanInput = email.trim(); // Can be email or phone
    const cleanPassword = password.trim();

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);

      // Admin Check (Hardcoded for demo - checks specifically against the email)
      if (cleanInput === 'nt40935@gmail.com' && cleanPassword === 'Khoahuynh1234@') {
        onLogin({
          id: 'admin-1',
          name: 'Admin User',
          email: cleanInput,
          role: 'admin',
          avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=a77f73&color=fff'
        });
        onClose();
        return;
      }

      // Customer Logic
      if (mode === 'login') {
         // Mock Login Success
         if (cleanInput && cleanPassword) {
            onLogin({
              id: 'user-' + Date.now(),
              name: cleanInput.includes('@') ? cleanInput.split('@')[0] : 'Coffee Lover',
              email: cleanInput,
              role: 'customer',
              avatar: `https://ui-avatars.com/api/?name=${cleanInput}&background=e0cec7&color=5e3a32`
            });
            onClose();
         } else {
            setError('Please check your credentials.');
         }
      } else {
        // Mock Register Success
        if (name && cleanInput && cleanPassword) {
          onLogin({
            id: 'user-' + Date.now(),
            name: name,
            email: cleanInput,
            role: 'customer',
             avatar: `https://ui-avatars.com/api/?name=${name}&background=e0cec7&color=5e3a32`
          });
          onClose();
        } else {
          setError('Please fill in all fields.');
        }
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-coffee-900 mb-2">
              {mode === 'login' ? t.auth.welcome : t.auth.join}
            </h2>
            <p className="text-coffee-600">
              {mode === 'login' ? t.auth.sign_in_desc : t.auth.create_desc}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-coffee-800 mb-1">{t.auth.name}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                    placeholder="John Doe"
                    required={mode === 'register'}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-coffee-800 mb-1">{t.auth.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  placeholder={language === 'vi' ? 'Email hoặc SĐT...' : 'Email or Phone...'}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-800 mb-1">{t.auth.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
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
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-coffee-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-amber-600 transition-colors shadow-lg shadow-coffee-900/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? t.auth.sign_in : t.auth.create}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-coffee-600 text-sm">
              {mode === 'login' ? `${t.auth.no_acc} ` : `${t.auth.have_acc} `}
              <button 
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                className="text-amber-600 font-bold hover:underline"
              >
                {mode === 'login' ? t.auth.create : t.auth.sign_in}
              </button>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
             <p className="text-xs text-gray-400">For Admin demo use: nt40935@gmail.com / Khoahuynh1234@</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;