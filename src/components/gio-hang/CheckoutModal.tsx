
import React, { useState, useEffect } from 'react';
import { X, MapPin, Phone, CreditCard, Banknote, CheckCircle, Loader2, QrCode, User as UserIcon, MessageSquare, Ticket, Smartphone, Wallet } from 'lucide-react';
import { CartItem, User, Language, DiscountCode, BrandSettings } from '../../types';
import { TRANSLATIONS, formatPrice, calculateItemPrice, calculateLoyaltyDiscount, getLoyaltyTier } from '../../constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  user: User | null;
  onCheckout: (details: any) => void;
  language: Language;
  promotions?: DiscountCode[];
  brandSettings: BrandSettings;
  sizeLPrice: number; // Size L upcharge price
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems, total, user, onCheckout, language, promotions = [], brandSettings, sizeLPrice }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [discountError, setDiscountError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '', // NEW: General Order Note
    paymentMethod: 'cod' // default to cash
  });
  const t = TRANSLATIONS[language];

  const loyaltyInfo = user ? getLoyaltyTier(user.loyaltyPoints, {
    loyaltyBronzeMin: brandSettings.loyaltyBronzeMin,
    loyaltySilverMin: brandSettings.loyaltySilverMin,
    loyaltyGoldMin: brandSettings.loyaltyGoldMin,
    loyaltyDiamondMin: brandSettings.loyaltyDiamondMin
  }) : null;

  // Auto-fill form data when user changes or modal opens
  useEffect(() => {
    if (isOpen && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || '',     // Auto-fill phone from profile
        address: user.address || ''  // Auto-fill address from profile
      }));
    }
    // Reset discount when modal closes
    if (!isOpen) {
      setDiscountCode('');
      setAppliedDiscount(null);
      setDiscountError('');
    }
  }, [isOpen, user]);

  // Calculate discount amount
  const calculateDiscount = (code: DiscountCode): number => {
    const now = new Date();
    const startDate = new Date(code.startDate);
    const endDate = new Date(code.endDate);
    
    // Check if code is valid
    if (!code.isActive || now < startDate || now > endDate) {
      return 0;
    }

    // Calculate applicable total
    if (!code.applicableProductIds || code.applicableProductIds.length === 0) {
      return 0;
    }

    const applicableTotal = cartItems
      .filter(item => code.applicableProductIds.includes(item.originalId || item.id))
      .reduce((sum, item) => sum + calculateItemPrice(item, undefined, undefined, sizeLPrice) * item.quantity, 0);

    if (code.type === 'percent') {
      return (applicableTotal * code.value) / 100;
    } else {
      return Math.min(code.value, applicableTotal); // Fixed amount, but can't exceed total
    }
  };

  // Apply discount code
  const handleApplyDiscount = () => {
    setDiscountError('');
    const code = discountCode.trim().toUpperCase();
    
    if (!code) {
      setDiscountError(t.checkout.invalid_code);
      return;
    }

    const promo = promotions.find(p => p.code.toUpperCase() === code);
    
    if (!promo) {
      setDiscountError(t.checkout.invalid_code);
      return;
    }

    // Require targeted products for every code to avoid applying to all items
    if (!promo.applicableProductIds || promo.applicableProductIds.length === 0) {
      setDiscountError(t.checkout.invalid_code);
      return;
    }

    // Validate dates
    const now = new Date();
    const startDate = new Date(promo.startDate);
    const endDate = new Date(promo.endDate);
    
    if (!promo.isActive || now < startDate || now > endDate) {
      setDiscountError(t.checkout.discount_not_applicable);
      return;
    }

    // Check if applicable to cart items
    if (promo.applicableProductIds.length > 0) {
      const hasApplicableItem = cartItems.some(item => 
        promo.applicableProductIds.includes(item.originalId || item.id)
      );
      if (!hasApplicableItem) {
        setDiscountError(t.checkout.discount_not_applicable);
        return;
      }
    }

    setAppliedDiscount(promo);
    setDiscountCode('');
  };

  // Remove discount
  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    setDiscountError('');
  };

  // Calculate final total
  const discountAmount = appliedDiscount ? calculateDiscount(appliedDiscount) : 0;

  // Loyalty discount is applied on the subtotal after promo discount
  const loyalty = user
    ? calculateLoyaltyDiscount(
        user,
        Math.max(0, total - discountAmount),
        {
          loyaltyBronzeMin: brandSettings.loyaltyBronzeMin,
          loyaltySilverMin: brandSettings.loyaltySilverMin,
          loyaltyGoldMin: brandSettings.loyaltyGoldMin,
          loyaltyDiamondMin: brandSettings.loyaltyDiamondMin
        }
      )
    : { discountPercent: 0, discountAmount: 0 };

  const finalTotal = Math.max(0, total - discountAmount - loyalty.discountAmount);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent checkout without user account
    if (!user) {
      return;
    }

    // If user typed a code but it is not a valid / applied promotion, block checkout
    if (discountCode.trim() && !appliedDiscount) {
      setDiscountError(
        language === 'vi'
          ? 'Mã giảm giá không hợp lệ hoặc chưa được áp dụng. Vui lòng kiểm tra lại.'
          : 'Discount code is invalid or not applied. Please check again.'
      );
      return;
    }
    
    setLoading(true);
    
    // Simulate Payment Processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onCheckout({
          ...formData,
          discountCode: appliedDiscount?.code,
          discountAmount: discountAmount
        });
        setSuccess(false);
        // Reset discount after checkout
        setAppliedDiscount(null);
        setDiscountCode('');
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
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-coffee-50">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-coffee-900">{t.checkout.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-coffee-200 rounded-full transition-colors active:scale-95 touch-manipulation" aria-label="Close">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-coffee-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
             <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
             {/* Form */}
             <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
               <h3 className="font-bold text-lg text-coffee-900 border-b border-gray-100 pb-2">{t.checkout.shipping}</h3>
               
               <div>
                 <label className="block text-sm font-medium text-coffee-700 mb-1">{t.checkout.full_name}</label>
                 <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                      placeholder="Receiver's Name"
                    />
                 </div>
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
                      rows={2}
                    />
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-coffee-700 mb-1">{t.checkout.note}</label>
                 <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea 
                      value={formData.note}
                      onChange={e => setFormData({...formData, note: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                      placeholder={t.checkout.note_placeholder}
                      rows={2}
                    />
                 </div>
               </div>

               {/* Discount Code Section */}
               <div>
                 <label className="block text-sm font-medium text-coffee-700 mb-1">{t.checkout.discount_code}</label>
                 {!appliedDiscount ? (
                   <div className="flex gap-2">
                     <div className="relative flex-1">
                       <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                       <input 
                         type="text" 
                         value={discountCode}
                         onChange={e => {
                           setDiscountCode(e.target.value);
                           setDiscountError('');
                         }}
                         onKeyPress={e => e.key === 'Enter' && handleApplyDiscount()}
                         className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                         placeholder={t.checkout.discount_placeholder}
                       />
                     </div>
                     <button
                       type="button"
                       onClick={handleApplyDiscount}
                       className="px-6 py-3 bg-coffee-900 text-white rounded-lg font-semibold hover:bg-coffee-800 transition-colors whitespace-nowrap"
                     >
                       {t.checkout.apply}
                     </button>
                   </div>
                 ) : (
                   <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <Ticket className="w-5 h-5 text-green-600" />
                       <div>
                         <p className="font-semibold text-green-900">{appliedDiscount.code}</p>
                         <p className="text-xs text-green-700">
                           {appliedDiscount.type === 'percent' 
                             ? `${appliedDiscount.value}% ${t.checkout.discount}`
                             : `${formatPrice(appliedDiscount.value, language)} ${t.checkout.discount}`
                           }
                         </p>
                       </div>
                     </div>
                     <button
                       type="button"
                       onClick={handleRemoveDiscount}
                       className="text-green-700 hover:text-green-900 text-sm font-semibold"
                     >
                       {t.checkout.remove}
                     </button>
                   </div>
                 )}
                 {discountError && (
                   <p className="text-red-600 text-sm mt-1">{discountError}</p>
                 )}
               </div>

               <h3 className="font-bold text-lg text-coffee-900 border-b border-gray-100 pb-2 pt-4">{t.checkout.payment}</h3>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Bank Transfer */}
                  <label className={`cursor-pointer border p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'card' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'card'} onChange={() => setFormData({...formData, paymentMethod: 'card'})} />
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs font-semibold text-center">{t.checkout.online}</span>
                  </label>

                  {/* Cash on Delivery */}
                  <label className={`cursor-pointer border p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'cod' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'cod'} onChange={() => setFormData({...formData, paymentMethod: 'cod'})} />
                    <Banknote className="w-5 h-5" />
                    <span className="text-xs font-semibold text-center">{t.checkout.cod}</span>
                  </label>

                  {/* MoMo */}
                  <label className={`cursor-pointer border p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'momo' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'momo'} onChange={() => setFormData({...formData, paymentMethod: 'momo'})} />
                    <Smartphone className="w-5 h-5" />
                    <span className="text-xs font-semibold text-center">{t.checkout.momo}</span>
                  </label>

                  {/* ZaloPay */}
                  <label className={`cursor-pointer border p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'zalopay' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'zalopay'} onChange={() => setFormData({...formData, paymentMethod: 'zalopay'})} />
                    <Wallet className="w-5 h-5" />
                    <span className="text-xs font-semibold text-center">{t.checkout.zalopay}</span>
                  </label>

                  {/* VNPay */}
                  <label className={`cursor-pointer border p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'vnpay' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'vnpay'} onChange={() => setFormData({...formData, paymentMethod: 'vnpay'})} />
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs font-semibold text-center">{t.checkout.vnpay}</span>
                  </label>

                  {/* PayPal */}
                  <label className={`cursor-pointer border p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'paypal' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'paypal'} onChange={() => setFormData({...formData, paymentMethod: 'paypal'})} />
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs font-semibold text-center">{t.checkout.paypal}</span>
                  </label>

                  {/* Stripe (Credit/Debit Card) */}
                  <label className={`cursor-pointer border p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'stripe' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'stripe'} onChange={() => setFormData({...formData, paymentMethod: 'stripe'})} />
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs font-semibold text-center">{t.checkout.stripe}</span>
                  </label>

                  {/* QR Code */}
                  <label className={`cursor-pointer border p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'qr' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'qr'} onChange={() => setFormData({...formData, paymentMethod: 'qr'})} />
                    <QrCode className="w-5 h-5" />
                    <span className="text-xs font-semibold text-center">{t.checkout.qr}</span>
                  </label>
               </div>

               {/* Payment Method Info */}
               {formData.paymentMethod === 'card' && (
                 <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl animate-in fade-in slide-in-from-top-2 mt-4">
                   <div className="flex items-start gap-3">
                     <div className="bg-white p-2 rounded-lg border border-blue-100">
                        <CreditCard className="w-6 h-6 text-coffee-900" />
                     </div>
                     <div className="text-sm text-coffee-800">
                       <p className="font-bold mb-1">{language === 'vi' ? 'Thông Tin Chuyển Khoản' : 'Bank Transfer Info'}</p>
                       <p className="opacity-90 leading-relaxed">{t.checkout.bank_info}</p>
                     </div>
                   </div>
                 </div>
               )}

               {(formData.paymentMethod === 'momo' || formData.paymentMethod === 'zalopay' || formData.paymentMethod === 'vnpay') && (
                 <div className="bg-green-50 border border-green-100 p-4 rounded-xl animate-in fade-in slide-in-from-top-2 mt-4">
                   <div className="flex items-start gap-3">
                     <div className="bg-white p-2 rounded-lg border border-green-100">
                        <QrCode className="w-6 h-6 text-coffee-900" />
                     </div>
                     <div className="text-sm text-coffee-800">
                       <p className="font-bold mb-1">
                         {language === 'vi' 
                           ? formData.paymentMethod === 'momo' ? 'Quét mã MoMo' 
                             : formData.paymentMethod === 'zalopay' ? 'Quét mã ZaloPay'
                             : 'Quét mã VNPay'
                           : formData.paymentMethod === 'momo' ? 'Scan MoMo QR'
                             : formData.paymentMethod === 'zalopay' ? 'Scan ZaloPay QR'
                             : 'Scan VNPay QR'}
                       </p>
                       <p className="opacity-90 leading-relaxed">
                         {language === 'vi' 
                           ? 'Mở ứng dụng và quét mã QR để thanh toán'
                           : 'Open the app and scan the QR code to pay'}
                       </p>
                     </div>
                   </div>
                 </div>
               )}

               {formData.paymentMethod === 'paypal' && (
                 <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl animate-in fade-in slide-in-from-top-2 mt-4">
                   <div className="flex items-start gap-3">
                     <div className="bg-white p-2 rounded-lg border border-blue-100">
                        <CreditCard className="w-6 h-6 text-coffee-900" />
                     </div>
                     <div className="text-sm text-coffee-800">
                       <p className="font-bold mb-1">{language === 'vi' ? 'Thanh toán bằng PayPal' : 'Pay with PayPal'}</p>
                       <p className="opacity-90 leading-relaxed">
                         {language === 'vi' 
                           ? 'Bạn sẽ được chuyển hướng đến trang thanh toán PayPal'
                           : 'You will be redirected to PayPal payment page'}
                       </p>
                     </div>
                   </div>
                 </div>
               )}

               {formData.paymentMethod === 'stripe' && (
                 <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl animate-in fade-in slide-in-from-top-2 mt-4">
                   <div className="flex items-start gap-3">
                     <div className="bg-white p-2 rounded-lg border border-purple-100">
                        <CreditCard className="w-6 h-6 text-coffee-900" />
                     </div>
                     <div className="text-sm text-coffee-800">
                       <p className="font-bold mb-1">{language === 'vi' ? 'Thanh toán bằng thẻ' : 'Pay with Card'}</p>
                       <p className="opacity-90 leading-relaxed">
                         {language === 'vi' 
                           ? 'Nhập thông tin thẻ tín dụng/ghi nợ của bạn'
                           : 'Enter your credit/debit card information'}
                       </p>
                     </div>
                   </div>
                 </div>
               )}

               {formData.paymentMethod === 'qr' && (
                 <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl animate-in fade-in slide-in-from-top-2 mt-4">
                   <div className="flex items-start gap-3">
                     <div className="bg-white p-2 rounded-lg border border-gray-100">
                        <QrCode className="w-6 h-6 text-coffee-900" />
                     </div>
                     <div className="text-sm text-coffee-800">
                       <p className="font-bold mb-1">{language === 'vi' ? 'Quét mã QR để thanh toán' : 'Scan QR Code to Pay'}</p>
                       <p className="opacity-90 leading-relaxed">
                         {language === 'vi' 
                           ? 'Mở ứng dụng ngân hàng và quét mã QR'
                           : 'Open your banking app and scan the QR code'}
                       </p>
                     </div>
                   </div>
                 </div>
               )}

             </form>

             {/* Order Summary */}
             <div className="bg-gray-50 p-6 rounded-2xl h-fit">
                <h3 className="font-bold text-lg text-coffee-900 mb-1">{t.checkout.summary}</h3>
                {user && loyaltyInfo && (
                  <p className="text-xs text-amber-700 mb-3">
                    {language === 'vi'
                      ? `Hạng hội viên: ${loyaltyInfo.nameVi} • Điểm hiện tại: ${user.loyaltyPoints ?? 0} • Ưu đãi: ${loyaltyInfo.discountPercent}%`
                      : `Member tier: ${loyaltyInfo.nameEn} • Points: ${user.loyaltyPoints ?? 0} • Discount: ${loyaltyInfo.discountPercent}%`}
                  </p>
                )}
                <div className="space-y-3 mb-6 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
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
                   {discountAmount > 0 && (
                     <div className="flex justify-between text-green-600">
                        <span>{t.checkout.discount}</span>
                        <span>-{formatPrice(discountAmount, language)}</span>
                     </div>
                   )}
                   {loyalty.discountAmount > 0 && (
                     <div className="flex justify-between text-amber-700">
                        <span>
                          {language === 'vi' ? 'Giảm giá hội viên' : 'Membership discount'}
                          {` (-${loyalty.discountPercent}%)`}
                        </span>
                        <span>-{formatPrice(loyalty.discountAmount, language)}</span>
                     </div>
                   )}
                   <div className="flex justify-between text-coffee-600">
                      <span>Shipping</span>
                      <span>Free</span>
                   </div>
                   <div className="flex justify-between text-lg font-bold text-coffee-900 pt-2">
                      <span>{t.checkout.total}</span>
                      <span>{formatPrice(finalTotal, language)}</span>
                   </div>
                </div>
             </div>
           </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-white space-y-2">
           {discountError && (
             <p className="text-sm text-red-600 text-center">
               {language === 'vi'
                 ? 'Mã giảm giá không hợp lệ. Vui lòng sửa hoặc xóa mã để tiếp tục thanh toán.'
                 : 'Invalid discount code. Please fix or remove it to proceed to checkout.'}
             </p>
           )}
           <button 
             form="checkout-form"
             type="submit"
             disabled={loading || !!discountError}
             className="w-full bg-coffee-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-600 disabled:hover:bg-gray-400 transition-colors shadow-lg shadow-coffee-900/20 flex items-center justify-center gap-2"
           >
             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.checkout.confirm}
           </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;