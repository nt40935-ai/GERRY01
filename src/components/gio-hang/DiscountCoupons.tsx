
import React, { useState } from 'react';
import { DiscountCode, Language } from '../../types';
import { Copy, Check, Info } from 'lucide-react';
import { formatPrice } from '../../constants';

interface DiscountCouponsProps {
  promotions: DiscountCode[];
  language: Language;
  onCopyCode?: (code: string) => void;
}

const DiscountCoupons: React.FC<DiscountCouponsProps> = ({ promotions, language, onCopyCode }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    if (onCopyCode) onCopyCode(code);
  };

  const getDiscountAmount = (promo: DiscountCode): string => {
    if (promo.type === 'percent') {
      return `${promo.value}%`;
    }
    return formatPrice(promo.value, language);
  };


  // Filter active promotions
  const activePromos = promotions.filter(promo => {
    const now = new Date();
    const startDate = new Date(promo.startDate);
    const endDate = new Date(promo.endDate);
    return promo.isActive && now >= startDate && now <= endDate;
  });

  if (activePromos.length === 0) return null;

  return (
    <div className="py-8 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-6">
          {activePromos.slice(0, 3).map((promo) => {
            const discountValue = promo.type === 'percent' 
              ? `${promo.value}%` 
              : `${Math.round(promo.value / 1000)}K`;
            
            const minOrder = promo.type === 'percent' 
              ? (promo.value >= 50 ? 199 : promo.value >= 35 ? 149 : 129)
              : (promo.value >= 50000 ? 199 : promo.value >= 35000 ? 149 : 129);
            
            return (
              <div 
                key={promo.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-dashed border-gray-300 relative"
                style={{ 
                  maxWidth: '320px',
                  minWidth: '280px',
                  borderLeft: '4px dashed #d1d5db',
                  borderLeftWidth: '8px'
                }}
              >
                {/* Perforated edge effect */}
                <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="h-4 border-t border-dashed border-gray-300" />
                  ))}
                </div>

                <div className="flex items-stretch">
                  {/* Red Badge */}
                  <div className="bg-red-600 text-white px-6 py-8 flex flex-col items-center justify-center min-w-[100px]">
                    <div className="text-xs font-bold mb-2 uppercase tracking-wide">TẶNG</div>
                    <div className="text-3xl font-bold">{discountValue}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-bold text-gray-900 mb-2">
                        NHẬP MÃ: <span className="text-red-600 font-mono">{promo.code}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-4">
                        {language === 'vi' 
                          ? `- Giảm ${getDiscountAmount(promo)} cho hóa đơn từ ${minOrder}K.`
                          : `- Get ${getDiscountAmount(promo)} off for orders from ${minOrder}K.`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(promo.code)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        {copiedCode === promo.code ? (
                          <>
                            <Check className="w-4 h-4" />
                            Đã sao chép
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Sao chép mã
                          </>
                        )}
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 text-xs underline flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Điều kiện
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiscountCoupons;

