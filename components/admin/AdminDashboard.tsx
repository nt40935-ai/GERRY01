

import React, { useState } from 'react';
import { Product, Order, OrderStatus, Banner, BrandSettings, Category, DiscountCode, Language, User } from '../../types';
import { LayoutDashboard, Coffee, ShoppingBag, LogOut, TrendingUp, Users, DollarSign, Image as ImageIcon, Settings, BarChart3, Globe, List, Ticket } from 'lucide-react';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';
import BannerManager from './BannerManager';
import BrandManager from './BrandManager';
import CategoryManager from './CategoryManager';
import PromotionManager from './PromotionManager';
import SalesReports from './SalesReports';
import UserManager from './UserManager';
import { TRANSLATIONS } from '../../constants';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  banners: Banner[];
  brandSettings: BrandSettings;
  categories: Category[];
  promotions: DiscountCode[];
  users: User[];
  onLogout: () => void;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: OrderStatus) => void;
  onAddBanner: (banner: Banner) => void;
  onUpdateBanner: (banner: Banner) => void;
  onDeleteBanner: (id: string) => void;
  onUpdateBrand: (settings: BrandSettings) => void;
  onAddCategory: (cat: Category) => void;
  onUpdateCategory: (cat: Category) => void;
  onDeleteCategory: (id: string) => void;
  onAddPromotion: (promo: DiscountCode) => void;
  onDeletePromotion: (id: string) => void;
  onUpdateUserRole: (userId: string, newRole: 'admin' | 'customer') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, 
  orders,
  banners, 
  brandSettings,
  categories,
  promotions,
  users,
  onLogout,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onAddBanner,
  onUpdateBanner,
  onDeleteBanner,
  onUpdateBrand,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddPromotion,
  onDeletePromotion,
  onUpdateUserRole,
  language,
  setLanguage
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'banners' | 'settings' | 'reports' | 'categories' | 'promotions' | 'users'>('overview');
  const t = TRANSLATIONS[language];

  // Simple stats calculation
  const totalRevenue = orders.reduce((acc, order) => acc + (order.status !== 'Cancelled' ? order.total : 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const activeBannersCount = banners.filter(b => b.isActive).length;

  const NavItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id 
          ? 'bg-amber-100 text-amber-900 font-bold' 
          : 'text-coffee-300 hover:bg-coffee-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-coffee-900 text-white p-6 flex flex-col flex-shrink-0">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
            {brandSettings.logoUrl ? (
               <img src={brandSettings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
               <Coffee className="w-6 h-6 text-amber-500" />
            )}
          </div>
          <span className="text-xl font-serif font-bold tracking-wider truncate">
            {brandSettings.brandName}
          </span>
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <NavItem id="overview" icon={LayoutDashboard} label={t.admin_nav.overview} />
          <NavItem id="reports" icon={BarChart3} label={t.admin_nav.reports} />
          <NavItem id="products" icon={Coffee} label={t.admin_nav.products} />
          <NavItem id="categories" icon={List} label={t.admin_nav.categories} />
          <NavItem id="orders" icon={ShoppingBag} label={t.admin_nav.orders} />
          <NavItem id="users" icon={Users} label={t.admin_nav.users} />
          <NavItem id="banners" icon={ImageIcon} label={t.admin_nav.banners} />
          <NavItem id="promotions" icon={Ticket} label={t.admin_nav.promotions} />
          <NavItem id="settings" icon={Settings} label={t.admin_nav.settings} />
        </nav>

        <div className="pt-6 border-t border-coffee-800 space-y-3">
          <button 
             onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
             className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-coffee-300 hover:bg-white/10 transition-colors uppercase text-sm font-bold"
          >
            <Globe className="w-5 h-5" />
            {language === 'en' ? 'English' : 'Tiếng Việt'}
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-coffee-800 hover:text-red-200 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t.admin_nav.sign_out}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-2xl font-serif font-bold text-coffee-900 capitalize">
            {activeTab === 'overview' ? t.admin_nav.overview : 
             activeTab === 'settings' ? t.admin_nav.settings : 
             activeTab === 'reports' ? t.admin_nav.reports : 
             activeTab === 'products' ? t.admin_nav.products :
             activeTab === 'categories' ? t.admin_nav.categories :
             activeTab === 'promotions' ? t.admin_nav.promotions :
             activeTab === 'users' ? t.admin_nav.users :
             activeTab === 'orders' ? t.admin_nav.orders :
             t.admin_nav.banners}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-coffee-900">Admin User</p>
              <p className="text-xs text-coffee-500">Store Manager</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">
              AU
            </div>
          </div>
        </header>

        <main className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="p-4 bg-green-100 rounded-xl">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{t.admin_stats.revenue}</p>
                    <p className="text-2xl font-bold text-coffee-900">${totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="p-4 bg-blue-100 rounded-xl">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{t.admin_stats.orders}</p>
                    <p className="text-2xl font-bold text-coffee-900">{totalOrders}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="p-4 bg-amber-100 rounded-xl">
                    <Coffee className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{t.admin_stats.items}</p>
                    <p className="text-2xl font-bold text-coffee-900">{totalProducts}</p>
                  </div>
                </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="p-4 bg-purple-100 rounded-xl">
                    <ImageIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{t.admin_stats.active_banners}</p>
                    <p className="text-2xl font-bold text-coffee-900">{activeBannersCount}</p>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity / Simplified view of other components */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                   <h3 className="text-lg font-bold text-coffee-900 mb-4">{t.admin_dash.actions}</h3>
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                      <button onClick={() => setActiveTab('reports')} className="w-full text-left p-4 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors flex justify-between items-center group">
                        <span className="font-medium text-coffee-800">{t.admin_dash.view_analytics}</span>
                        <BarChart3 className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
                      </button>
                      <button onClick={() => setActiveTab('products')} className="w-full text-left p-4 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors flex justify-between items-center group">
                        <span className="font-medium text-coffee-800">{t.admin_dash.add_product}</span>
                        <TrendingUp className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
                      </button>
                      <button onClick={() => setActiveTab('orders')} className="w-full text-left p-4 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors flex justify-between items-center group">
                        <span className="font-medium text-coffee-800">{t.admin_dash.manage_orders}</span>
                        <Users className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
                      </button>
                      <button onClick={() => setActiveTab('banners')} className="w-full text-left p-4 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors flex justify-between items-center group">
                        <span className="font-medium text-coffee-800">{t.admin_dash.update_banners}</span>
                        <ImageIcon className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <SalesReports 
              orders={orders} 
              products={products}
              language={language}
            />
          )}

          {activeTab === 'products' && (
            <ProductManager 
              products={products}
              categories={categories}
              onAdd={onAddProduct}
              onUpdate={onUpdateProduct}
              onDelete={onDeleteProduct}
              language={language}
            />
          )}

          {activeTab === 'categories' && (
            <CategoryManager 
              categories={categories}
              onAdd={onAddCategory}
              onUpdate={onUpdateCategory}
              onDelete={onDeleteCategory}
              language={language}
            />
          )}

          {activeTab === 'orders' && (
             <OrderManager 
              orders={orders}
              onUpdateStatus={onUpdateOrderStatus}
              language={language}
             />
          )}

          {activeTab === 'banners' && (
             <BannerManager 
              banners={banners}
              onAdd={onAddBanner}
              onUpdate={onUpdateBanner}
              onDelete={onDeleteBanner}
              language={language}
             />
          )}

          {activeTab === 'promotions' && (
             <PromotionManager 
              promotions={promotions}
              products={products}
              onAdd={onAddPromotion}
              onDelete={onDeletePromotion}
              language={language}
             />
          )}

          {activeTab === 'users' && (
             <UserManager 
              users={users}
              onUpdateRole={onUpdateUserRole}
              language={language}
             />
          )}

          {activeTab === 'settings' && (
            <BrandManager 
              settings={brandSettings}
              onUpdate={onUpdateBrand}
              language={language}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
