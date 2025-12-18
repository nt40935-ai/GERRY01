

import React, { useState } from 'react';
import { X, MapPin, Phone, CreditCard, Banknote, CheckCircle, Loader2, QrCode } from 'lucide-react';
import { CartItem, User, Language } from '../types';
import { TRANSLATIONS, formatPrice } from '../constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  user: User | null;
  onCheckout: (details: any) => void;
  language: Language;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems, total, user, onCheckout, language }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    paymentMethod: 'cod' // default to cash
  });
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Payment Processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onCheckout(formData);
        setSuccess(false);
      }, 1500);
    }, 2000);
  };

  if (success) {
    return (
       <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white">
          <div className="text-center animate-in zoom-in duration-300">
             <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
             </div>
             <h2 className="text-3xl font-serif font-bold text-coffee-900 mb-2">{t.checkout.success}</h2>
             <p className="text-coffee-600 text-lg">{t.checkout.success_desc}</p>
          </div>
       </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-coffee-50">
          <h2 className="text-2xl font-serif font-bold text-coffee-900">{t.checkout.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-coffee-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-coffee-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
           <div className="grid md:grid-cols-2 gap-8">
             {/* Form */}
             <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
               <h3 className="font-bold text-lg text-coffee-900 border-b border-gray-100 pb-2">{t.checkout.shipping}</h3>
               
               <div>
                 <label className="block text-sm font-medium text-coffee-700 mb-1">{t.checkout.full_name}</label>
                 <input 
                   required
                   type="text" 
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                   placeholder="Receiver's Name"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-coffee-700 mb-1">{t.checkout.phone}</label>
                 <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                      placeholder="+1 (555) 000-0000"
                    />
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-coffee-700 mb-1">{t.checkout.address}</label>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea 
                      required
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                      placeholder="Street, City, Zip Code"
                      rows={3}
                    />
                 </div>
               </div>

               <h3 className="font-bold text-lg text-coffee-900 border-b border-gray-100 pb-2 pt-4">{t.checkout.payment}</h3>
               <div className="grid grid-cols-2 gap-4">
                  <label className={`cursor-pointer border p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'card' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'card'} onChange={() => setFormData({...formData, paymentMethod: 'card'})} />
                    <CreditCard className="w-6 h-6" />
                    <span className="text-sm font-semibold text-center">{t.checkout.online}</span>
                  </label>

                  <label className={`cursor-pointer border p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'cod' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'cod'} onChange={() => setFormData({...formData, paymentMethod: 'cod'})} />
                    <Banknote className="w-6 h-6" />
                    <span className="text-sm font-semibold text-center">{t.checkout.cod}</span>
                  </label>
               </div>

               {/* Bank Transfer Info */}
               {formData.paymentMethod === 'card' && (
                 <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
                   <div className="flex items-start gap-3">
                     <div className="bg-white p-2 rounded-lg border border-blue-100">
                        <QrCode className="w-8 h-8 text-coffee-900" />
                     </div>
                     <div className="text-sm text-coffee-800">
                       <p className="font-bold mb-1">Bank Transfer Info</p>
                       <p className="opacity-90 leading-relaxed">{t.checkout.bank_info}</p>
                     </div>
                   </div>
                 </div>
               )}

             </form>

             {/* Order Summary */}
             <div className="bg-gray-50 p-6 rounded-2xl h-fit">
                <h3 className="font-bold text-lg text-coffee-900 mb-4">{t.checkout.summary}</h3>
                <div className="space-y-3 mb-6 max-h-[200px] overflow-y-auto pr-2">
                   {cartItems.map(item => (
                     <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-coffee-600">
                          <span className="font-bold text-coffee-900">{item.quantity}x</span> {item.name}
                        </span>
                        <span className="font-medium text-coffee-900">{formatPrice(item.price * item.quantity, language)}</span>
                     </div>
                   ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                   <div className="flex justify-between text-coffee-600">
                      <span>{t.cart.subtotal}</span>
                      <span>{formatPrice(total, language)}</span>
                   </div>
                   <div className="flex justify-between text-coffee-600">
                      <span>Shipping</span>
                      <span>Free</span>
                   </div>
                   <div className="flex justify-between text-lg font-bold text-coffee-900 pt-2">
                      <span>{t.checkout.total}</span>
                      <span>{formatPrice(total, language)}</span>
                   </div>
                </div>
             </div>
           </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-white">
           <button 
             form="checkout-form"
             type="submit"
             disabled={loading}
             className="w-full bg-coffee-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition-colors shadow-lg shadow-coffee-900/20 flex items-center justify-center gap-2"
           >
             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.checkout.confirm}
           </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;