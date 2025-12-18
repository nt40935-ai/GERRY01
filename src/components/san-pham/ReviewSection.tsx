import React, { useState } from 'react';
import { Review, User, Language } from '../../types';
import { Star, Send } from 'lucide-react';
import { TRANSLATIONS } from '../../constants';

interface ReviewSectionProps {
  productId: string;
  reviews: Review[];
  onAddReview: (review: Review) => void;
  user: User | null;
  language: Language;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId, reviews, onAddReview, user, language }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const t = TRANSLATIONS[language];

  // Filter reviews for this product
  const productReviews = reviews.filter(r => r.productId === productId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newReview: Review = {
      id: `r-${Date.now()}`,
      productId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    onAddReview(newReview);
    setComment('');
    setRating(5);
  };

  return (
    <div className="mt-8 border-t border-gray-100 pt-8">
      <h3 className="text-xl font-serif font-bold text-coffee-900 mb-6 flex items-center gap-2">
         {t.reviews.title}
         <span className="text-sm font-sans font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
           {productReviews.length}
         </span>
      </h3>

      {/* Review Form */}
      <div className="bg-coffee-50 rounded-xl p-6 mb-8">
        {!user ? (
          <div className="text-center py-4 text-coffee-600">
            {t.reviews.login_required}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h4 className="font-bold text-coffee-900 mb-4">{t.reviews.write_review}</h4>
            
            <div className="mb-4">
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{t.reviews.rating}</label>
               <div className="flex gap-1">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button
                     key={star}
                     type="button"
                     onClick={() => setRating(star)}
                     className="transition-transform hover:scale-110 focus:outline-none"
                   >
                     <Star 
                       className={`w-6 h-6 ${star <= rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
                     />
                   </button>
                 ))}
               </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{t.reviews.comment}</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.reviews.placeholder}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none text-sm bg-white"
                rows={3}
                required
              />
            </div>

            <button 
              type="submit"
              className="flex items-center gap-2 bg-coffee-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-amber-600 transition-colors shadow-lg shadow-coffee-900/10"
            >
              <Send className="w-4 h-4" />
              {t.reviews.submit}
            </button>
          </form>
        )}
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {productReviews.length === 0 ? (
          <p className="text-center text-gray-500 italic py-4">{t.reviews.no_reviews}</p>
        ) : (
          productReviews.map(review => (
            <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6">
              <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      <img 
                        src={review.userAvatar || `https://ui-avatars.com/api/?name=${review.userName}`} 
                        alt={review.userName} 
                        className="w-full h-full object-cover"
                      />
                   </div>
                   <div>
                     <p className="font-bold text-coffee-900 text-sm">{review.userName}</p>
                     <div className="flex gap-0.5">
                       {[1, 2, 3, 4, 5].map(star => (
                         <Star 
                           key={star} 
                           className={`w-3 h-3 ${star <= review.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-200'}`} 
                         />
                       ))}
                     </div>
                   </div>
                 </div>
                 <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-coffee-700 text-sm leading-relaxed pl-14">
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;