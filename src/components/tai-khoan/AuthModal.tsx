

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { User as UserType, Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserType) => void;
  language: Language;
  users: UserType[]; // Added users to check for existence
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, language, users }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const t = TRANSLATIONS[language];

  // Reset all fields to avoid leaking previous session data
  const resetForm = () => {
    setMode('login');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setError('');
    setSuccess(false);
    setShowPassword(false);
  };

  // Whenever modal closes, clear sensitive inputs
  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

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

      // Admin Check (Hardcoded for demo)
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
         if (cleanInput && cleanPassword) {
            // Check if user exists in the provided users list
            const existingUser = users.find(u => u.email === cleanInput || u.phone === cleanInput);
            
            if (existingUser) {
                // User exists, log them in
                onLogin(existingUser);
                onClose();
            } else {
                // User does not exist, show error
                setError(t.auth.account_not_found);
            }
         } else {
            setError('Please fill in credentials.');
         }
      } else {
        // Register Logic
        if (name && cleanInput && cleanPassword) {
          // Check Password Match
          if (cleanPassword !== confirmPassword) {
             setError(t.auth.password_mismatch);
             return;
          }

          // Check if user already exists
          const existingUser = users.find(u => u.email === cleanInput || u.phone === cleanInput);
          
          if (existingUser) {
             setError(t.auth.account_exists);
          } else {
             // Create new user
             onLogin({
                id: 'user-' + Date.now(),
                name: name,
                email: cleanInput,
                role: 'customer',
                avatar: `https://ui-avatars.com/api/?name=${name}&background=e0cec7&color=5e3a32`
              });
              onClose();
          }
        } else {
          setError('Please fill in all fields.');
        }
      }
    }, 1000);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    const cleanInput = email.trim();

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);

      if (!cleanInput) {
        setError(language === 'vi' ? 'Vui lòng nhập email hoặc số điện thoại.' : 'Please enter your email or phone.');
        return;
      }

      // Check if user exists
      const existingUser = users.find(u => u.email === cleanInput || u.phone === cleanInput);
      
      if (existingUser) {
        // User exists, show success message
        setSuccess(true);
        setError('');
      } else {
        // User does not exist
        setError(t.auth.account_not_found);
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
              {mode === 'login' ? t.auth.welcome : mode === 'register' ? t.auth.join : t.auth.reset_password}
            </h2>
            <p className="text-coffee-600">
              {mode === 'login' ? t.auth.sign_in_desc : mode === 'register' ? t.auth.create_desc : t.auth.reset_desc}
            </p>
          </div>

          {success && mode === 'forgot-password' ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 text-green-700 text-sm rounded-lg text-center font-medium">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-bold text-base mb-1">{t.auth.reset_success}</p>
                <p>{t.auth.reset_success_desc}</p>
              </div>
              <button 
                onClick={() => {
                  setMode('login');
                  setSuccess(false);
                  setError('');
                  setEmail('');
                }}
                className="w-full bg-coffee-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-amber-600 transition-colors shadow-lg shadow-coffee-900/20 flex items-center justify-center gap-2"
              >
                {t.auth.back_to_login}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
          <form onSubmit={mode === 'forgot-password' ? handleForgotPassword : handleSubmit} className="space-y-4">
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

            {mode !== 'forgot-password' && (
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
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-coffee-800 mb-1">{t.auth.confirm_password}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                    placeholder="••••••••"
                    required={mode === 'register'}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium animate-pulse">
                {error}
              </div>
            )}

            {mode === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot-password');
                    setError('');
                    setPassword('');
                  }}
                  className="text-sm text-amber-600 font-medium hover:underline"
                >
                  {t.auth.forgot_password}
                </button>
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
                  {mode === 'login' ? t.auth.sign_in : mode === 'register' ? t.auth.create : t.auth.reset_password}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          )}

          {mode !== 'forgot-password' && (
            <div className="mt-6 text-center">
              <p className="text-coffee-600 text-sm">
                {mode === 'login' ? `${t.auth.no_acc} ` : `${t.auth.have_acc} `}
                <button 
                  onClick={() => {
                    setMode(mode === 'login' ? 'register' : 'login');
                    setError('');
                    setConfirmPassword(''); // Reset confirm password on toggle
                  }}
                  className="text-amber-600 font-bold hover:underline"
                >
                  {mode === 'login' ? t.auth.create : t.auth.sign_in}
                </button>
              </p>
            </div>
          )}

          {mode === 'forgot-password' && !success && (
            <div className="mt-6 text-center">
              <button 
                onClick={() => {
                  setMode('login');
                  setError('');
                  setEmail('');
                }}
                className="text-coffee-600 text-sm font-medium hover:underline"
              >
                {t.auth.back_to_login}
              </button>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;