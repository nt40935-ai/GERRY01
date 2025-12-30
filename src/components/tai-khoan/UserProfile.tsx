
import React, { useState, useEffect } from 'react';
import { User, Order, Language } from '../../types';
import { X, User as UserIcon, ShoppingBag, MapPin, Phone, Mail, Save, Clock, Package, CheckCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { TRANSLATIONS, formatPrice, calculateItemPrice } from '../../constants';
import ImageUploader from '../quan-tri/admin/ImageUploader';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  orders: Order[];
  onUpdateUser: (updatedUser: User) => void;
  language: Language;
  sizeLPrice: number; // Size L upcharge price
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose, user, orders, onUpdateUser, language, sizeLPrice }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [formData, setFormData] = useState<Partial<User>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ ...user, ...formData } as User);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Ready': return 'bg-purple-100 text-purple-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 bg-coffee-50 p-6 flex flex-col gap-2 border-r border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-coffee-900 truncate max-w-[120px]">{user.name}</p>
              <p className="text-xs text-coffee-500">{user.role}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-coffee-900 text-white shadow-md' : 'text-coffee-700 hover:bg-white'}`}
          >
            <UserIcon className="w-5 h-5" />
            {t.profile.tab_profile}
          </button>
          
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-coffee-900 text-white shadow-md' : 'text-coffee-700 hover:bg-white'}`}
          >
            <ShoppingBag className="w-5 h-5" />
            {t.profile.tab_orders}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10">
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === 'profile' && (
              <div className="max-w-xl mx-auto space-y-8">
                <div>
                   <h2 className="text-2xl font-serif font-bold text-coffee-900 mb-2">{t.profile.personal_info}</h2>
                   <p className="text-coffee-600 text-sm">Update your personal details and shipping address.</p>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  
                  {/* Avatar Upload */}
                  <ImageUploader 
                    label="Profile Picture"
                    currentImage={formData.avatar || ''}
                    onImageChange={(url) => setFormData({...formData, avatar: url})}
                    language={language}
                  />

                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">{t.profile.name}</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-coffee-700 mb-1">{t.profile.email}</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="text" 
                          value={formData.email || ''}
                          disabled
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-coffee-700 mb-1">{t.profile.phone}</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="text" 
                          value={formData.phone || ''}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                          placeholder="+1 234 567 890"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">{t.profile.address}</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea 
                        value={formData.address || ''}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
                        rows={3}
                        placeholder="Street, City, Zip Code..."
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                     <button 
                       type="submit"
                       className="flex items-center justify-center gap-2 w-full bg-amber-600 text-white py-3 rounded-xl font-bold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20"
                     >
                       <Save className="w-5 h-5" />
                       {t.profile.save}
                     </button>
                     {saveSuccess && (
                       <div className="mt-3 flex items-center justify-center gap-2 text-green-600 animate-in fade-in slide-in-from-bottom-2">
                         <CheckCircle className="w-4 h-4" />
                         <span className="text-sm font-medium">Changes saved successfully!</span>
                       </div>
                     )}
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                   <h2 className="text-2xl font-serif font-bold text-coffee-900 mb-2">{t.profile.order_history}</h2>
                   <p className="text-coffee-600 text-sm">Track your past and current orders.</p>
                </div>

                <div className="space-y-4">
                   {orders.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                         <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                         <p className="text-gray-500 font-medium">{t.profile.no_orders}</p>
                      </div>
                   ) : (
                      orders.map(order => (
                         <div key={order.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div 
                              className="p-6 cursor-pointer"
                              onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                            >
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                   <div>
                                      <div className="flex items-center gap-3">
                                         <span className="font-mono font-bold text-coffee-900">#{order.id}</span>
                                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                         </span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                         <Clock className="w-3 h-3" />
                                         {order.date}
                                      </div>
                                   </div>
                                   <div className="text-right flex flex-col items-end">
                                      <p className="font-bold text-lg text-coffee-900">{formatPrice(order.total, language)}</p>
                                      <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <span>{order.itemsCount} Items</span>
                                        {expandedOrderId === order.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                      </div>
                                   </div>
                                </div>
                                
                                {/* Simple Order Progress Bar */}
                                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                                   <div 
                                     className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${
                                        order.status === 'Cancelled' ? 'bg-red-500 w-full' :
                                        order.status === 'Completed' ? 'bg-green-500 w-full' :
                                        order.status === 'Ready' ? 'bg-purple-500 w-3/4' :
                                        order.status === 'Processing' ? 'bg-blue-500 w-1/2' : 'bg-yellow-500 w-1/4'
                                     }`} 
                                   />
                                </div>
                            </div>

                            {/* Expanded Item Details */}
                            {expandedOrderId === order.id && (
                               <div className="bg-gray-50 p-4 border-t border-gray-100 animate-in slide-in-from-top-2">
                                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Items in this order</h4>
                                  <div className="space-y-3">
                                     {order.items && order.items.length > 0 ? (
                                        order.items.map((item, idx) => {
                                           // Use helper
                                           const itemPrice = calculateItemPrice(item, undefined, undefined, sizeLPrice);
                                           
                                           return (
                                              <div key={idx} className="flex gap-4 p-2 bg-white rounded border border-gray-100">
                                                 <img src={item.image} alt="" className="w-12 h-12 rounded object-cover bg-gray-200" />
                                                 <div className="flex-1">
                                                    <div className="flex justify-between">
                                                       <p className="text-sm font-bold text-coffee-900">{item.name}</p>
                                                       <p className="text-sm font-medium text-coffee-800">{formatPrice(itemPrice * item.quantity, language)}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1 text-xs text-gray-500 mt-1">
                                                       <span className="font-bold">x{item.quantity}</span>
                                                       <div className="flex flex-wrap gap-2">
                                                          {item.size && <span className="bg-gray-100 px-1 rounded">Size: {item.size}</span>}
                                                          {item.note && (
                                                            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-1 rounded">
                                                              <MessageSquare className="w-3 h-3" /> {item.note}
                                                            </span>
                                                          )}
                                                       </div>
                                                       {item.toppings && item.toppings.length > 0 && (
                                                          <span className="text-purple-700 italic">+ {item.toppings.map(t => t.name).join(', ')}</span>
                                                       )}
                                                    </div>
                                                 </div>
                                              </div>
                                           );
                                        })
                                     ) : (
                                        <p className="text-xs text-gray-400 italic">Item details not available.</p>
                                     )}
                                  </div>
                               </div>
                            )}
                         </div>
                      ))
                   )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;