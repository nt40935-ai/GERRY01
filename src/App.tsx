
import React, { useState, useEffect } from 'react';
import Navbar from './components/giao-dien/Navbar';
import Hero from './components/giao-dien/Hero';
import Menu from './components/san-pham/Menu';
import About from './components/giao-dien/About';
import Partnership from './components/giao-dien/Partnership';
import Footer from './components/giao-dien/Footer';
import Careers from './components/giao-dien/Careers';
import ApplicationSection from './components/giao-dien/ApplicationSection';
import ComboSection from './components/giao-dien/ComboSection';
import TableBooking from './components/giao-dien/TableBooking';
import Cart from './components/gio-hang/Cart';
import DiscountCoupons from './components/gio-hang/DiscountCoupons';
import Assistant from './components/tien-ich/Assistant';
import SupportChat from './components/tien-ich/SupportChat';
import AdminDashboard from './components/quan-tri/admin/AdminDashboard';
import AuthModal from './components/tai-khoan/AuthModal';
import CheckoutModal from './components/gio-hang/CheckoutModal';
import Sidebar from './components/tien-ich/Sidebar';
import ProductModal from './components/san-pham/ProductModal';
import UserProfile from './components/tai-khoan/UserProfile';
import { CartItem, Product, Order, OrderStatus, Banner, User, FilterState, Language, BrandSettings, Category, DiscountCode, ProductSize, Review, Topping, Job, JobApplication, PartnershipContent, Combo, Reservation, ReservationStatus } from './types';
import { PRODUCTS, BANNERS, INITIAL_CATEGORIES, MOCK_REVIEWS, TOPPINGS_LIST, DEFAULT_JOBS, DEFAULT_PARTNERSHIP_CONTENT, calculateItemPrice, calculateEarnedPoints } from './constants';

const App: React.FC = () => {
  // --- APPLICATION STATE WITH PERSISTENCE ---

  // 1. User Session
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('gerry_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });
  
  const [language, setLanguage] = useState<Language>('vi'); 
  
  // NEW: State to toggle Admin View vs Store View
  const [adminView, setAdminView] = useState(false);

  // 2. Database: Users
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_all_users');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'admin-1',
        name: 'Super Admin',
        email: 'nt40935@gmail.com',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=a77f73&color=fff'
      },
      {
        id: 'user-demo-1',
        name: 'Nguyen Van A',
        email: 'user1@gmail.com',
        role: 'customer',
        avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=e0cec7&color=5e3a32',
        phone: '0901234567',
        address: '123 Đường Lê Lợi, Quận 1, TP.HCM'
      }
    ];
  });

  // 3. Database: Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_products');
      if (saved) {
         // Migration: Ensure all loaded products have isAvailable property
         const parsed = JSON.parse(saved);
         return parsed.map((p: any) => ({ ...p, isAvailable: p.isAvailable ?? true }));
      }
      return PRODUCTS;
    } catch (e) { return PRODUCTS; }
  });

  // 4. Database: Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch (e) { return INITIAL_CATEGORIES; }
  });

  // 5. Database: Banners
  const [banners, setBanners] = useState<Banner[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_banners');
      return saved ? JSON.parse(saved) : BANNERS;
    } catch (e) { return BANNERS; }
  });

  // 6. Database: Promotions
  const [promotions, setPromotions] = useState<DiscountCode[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_promotions');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  // 7. Database: Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_reviews');
      return saved ? JSON.parse(saved) : MOCK_REVIEWS;
    } catch (e) { return MOCK_REVIEWS; }
  });

  // 8. Database: Orders (Updated with Mock items)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { 
        id: '1001', 
        userId: 'user-demo-1', 
        customerName: 'Alex Johnson', 
        total: 12.50, 
        status: 'Completed', 
        date: '2024-03-10', 
        itemsCount: 3,
        items: [
           { ...PRODUCTS[0], quantity: 2, size: 'M' },
           { ...PRODUCTS[2], quantity: 1, size: 'L' }
        ]
      },
      { 
        id: '1002', 
        userId: 'user-demo-1', 
        customerName: 'Maria Garcia', 
        total: 8.75, 
        status: 'Processing', 
        date: '2024-03-11', 
        itemsCount: 2,
        items: [
           { ...PRODUCTS[3], quantity: 2, size: 'M', note: 'Less ice' }
        ]
      },
    ];
  });

  // 9. Database: Brand Settings
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(() => {
    try {
      const saved = localStorage.getItem('gerry_brand_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      logoUrl: '',
      brandName: 'GERRY',
      storeAddress: '123 Coffee Lane, Brew District, Seattle, WA 98101',
      contactPhone: '+1 (555) 123-4567',
      contactEmail: 'hello@gerrycoffee.com',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681007846!2d106.69976391480076!3d10.773374292323608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f43f07f4337%3A0x7d287123d61b34b1!2sBitexco%20Financial%20Tower!5e0!3m2!1sen!2s!4v1626244382531!5m2!1sen!2s',
      loyaltyBronzeMin: 0,
      loyaltySilverMin: 500,
      loyaltyGoldMin: 850,
      loyaltyDiamondMin: 1350
    };
  });

  // 10. Database: Toppings (NEW)
  const [toppings, setToppings] = useState<Topping[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_toppings');
      return saved ? JSON.parse(saved) : TOPPINGS_LIST;
    } catch (e) { return TOPPINGS_LIST; }
  });

  // 10.5. Database: Size L Price (NEW)
  const [sizeLPrice, setSizeLPrice] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('gerry_size_l_price');
      return saved ? parseFloat(saved) : 0.50; // Default to $0.50
    } catch (e) { return 0.50; }
  });

  // 11. Database: Jobs (Recruitment)
  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_jobs');
      return saved ? JSON.parse(saved) : DEFAULT_JOBS;
    } catch (e) { return DEFAULT_JOBS; }
  });

  // 12. Database: Applications
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_applications');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  // 13. Partnership content
  const [partnershipContent, setPartnershipContent] = useState<PartnershipContent>(() => {
    try {
      const saved = localStorage.getItem('gerry_partnership');
      return saved ? JSON.parse(saved) : DEFAULT_PARTNERSHIP_CONTENT;
    } catch (e) { return DEFAULT_PARTNERSHIP_CONTENT; }
  });

  // 14. Combos (Bundles)
  const [combos, setCombos] = useState<Combo[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_combos');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Default sample combos
    return [
      {
        id: 'combo-1',
        name: 'Combo Đêm Khuya',
        description: 'Giảm giá sau 22:00 • 1 burger + 1 khoai + 1 nước',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80',
        items: [
          { productId: '1a', quantity: 1 },
          { productId: '13', quantity: 1 },
        ],
        price: 8.50,
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
  });

  // 15. Reservations (Table booking)
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('gerry_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // UI State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Customization Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [applyRole, setApplyRole] = useState('');

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    minPrice: 0,
    maxPrice: 50,
    searchQuery: ''
  });

  // --- PERSISTENCE EFFECTS (Save on Change) ---
  useEffect(() => localStorage.setItem('gerry_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('gerry_all_users', JSON.stringify(allUsers)), [allUsers]);
  useEffect(() => localStorage.setItem('gerry_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('gerry_categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('gerry_banners', JSON.stringify(banners)), [banners]);
  useEffect(() => localStorage.setItem('gerry_promotions', JSON.stringify(promotions)), [promotions]);
  useEffect(() => localStorage.setItem('gerry_reviews', JSON.stringify(reviews)), [reviews]);
  useEffect(() => localStorage.setItem('gerry_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('gerry_brand_settings', JSON.stringify(brandSettings)), [brandSettings]);
  useEffect(() => localStorage.setItem('gerry_toppings', JSON.stringify(toppings)), [toppings]);
  useEffect(() => localStorage.setItem('gerry_size_l_price', sizeLPrice.toString()), [sizeLPrice]);
  useEffect(() => localStorage.setItem('gerry_jobs', JSON.stringify(jobs)), [jobs]);
  useEffect(() => localStorage.setItem('gerry_applications', JSON.stringify(applications)), [applications]);
  useEffect(() => localStorage.setItem('gerry_partnership', JSON.stringify(partnershipContent)), [partnershipContent]);
  useEffect(() => localStorage.setItem('gerry_combos', JSON.stringify(combos)), [combos]);
  useEffect(() => localStorage.setItem('gerry_reservations', JSON.stringify(reservations)), [reservations]);

  // Login Handler
  const handleLogin = (incomingUser: User) => {
    const existingUser = allUsers.find(u => u.email === incomingUser.email);
    
    if (existingUser) {
      const updatedUser = { 
          ...existingUser, 
          name: incomingUser.name, 
          avatar: incomingUser.avatar || existingUser.avatar 
      };
      setAllUsers(prev => prev.map(u => u.id === existingUser.id ? updatedUser : u));
      setUser(updatedUser);
    } else {
      setAllUsers(prev => [...prev, incomingUser]);
      setUser(incomingUser);
    }
    // Default to admin view on login if admin
    if (incomingUser.role === 'admin') setAdminView(true);
  };

  // Logout Handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gerry_user');
    setAdminView(false); // Reset to show store view after logout
  };

  // Update User Profile Handler
  const handleUpdateUserProfile = (updatedUser: User) => {
    setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setUser(updatedUser);
  };

  // Add Review Handler
  const handleAddReview = (newReview: Review) => {
    setReviews(prev => [...prev, newReview]);
    
    // Update product rating and count
    setProducts(prevProducts => prevProducts.map(p => {
      if (p.id === newReview.productId) {
        // Calculate new average
        const productReviews = [...reviews, newReview].filter(r => r.productId === p.id);
        const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
        const newRating = totalRating / productReviews.length;
        
        // Update selected product if it's currently open
        if (selectedProduct && selectedProduct.id === p.id) {
            setSelectedProduct({ ...p, rating: newRating, reviewCount: productReviews.length });
        }

        return { ...p, rating: newRating, reviewCount: productReviews.length };
      }
      return p;
    }));
  };

  // Trigger Modal
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);

    // Update URL for shareable product detail
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('product', product.id);
      window.history.replaceState({}, '', url.toString());
    } catch (e) {}
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    // Clear product param
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('product');
      window.history.replaceState({}, '', url.toString());
    } catch (e) {}
  };

  // Open product modal if user visits with ?product=...
  const [didParseProductParam, setDidParseProductParam] = useState(false);
  useEffect(() => {
    if (didParseProductParam) return;
    setDidParseProductParam(true);
    try {
      const url = new URL(window.location.href);
      const pid = url.searchParams.get('product');
      if (!pid) return;
      const p = products.find(x => x.id === pid);
      if (p) {
        setSelectedProduct(p);
        setIsProductModalOpen(true);
      }
    } catch (e) {}
  }, [didParseProductParam, products]);

  // AddToCart with Grouping by Size/Note/Toppings
  const handleAddToCart = (product: Product, size?: ProductSize, note?: string, toppings?: Topping[]) => {
    setCartItems(prev => {
        // Helper to sort topping IDs for comparison
        const getToppingIds = (t: Topping[] | undefined) => t ? t.map(x => x.id).sort().join(',') : '';

        // Check for exact match (Product ID + Size + Note + Toppings)
        const existingItemIndex = prev.findIndex(item => 
            item.originalId === product.id && 
            item.size === size && 
            item.note === note &&
            getToppingIds(item.toppings) === getToppingIds(toppings)
        );

        if (existingItemIndex >= 0) {
            const newItems = [...prev];
            newItems[existingItemIndex].quantity += 1;
            return newItems;
        }

        // Add new item with unique Cart ID
        const newItem: CartItem = { 
            ...product, 
            id: `${product.id}-${Date.now()}-${Math.random()}`, // Unique ID for cart item
            originalId: product.id, 
            quantity: 1, 
            size, 
            note,
            toppings 
        };
        return [...prev, newItem];
    });
    setIsProductModalOpen(false);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === cartId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartId));
  };

  // Combo -> Add to Cart as a single bundle item
  const handleAddComboToCart = (combo: Combo) => {
    // Build a short note for display
    const note = combo.items
      .map(it => {
        const p = products.find(x => x.id === it.productId);
        return p ? `${it.quantity}x ${p.name}` : `${it.quantity}x ${it.productId}`;
      })
      .slice(0, 4)
      .join(', ');

    const bundleItem: CartItem = {
      id: `${combo.id}-${Date.now()}-${Math.random()}`,
      originalId: combo.id,
      name: combo.name,
      description: combo.description,
      price: combo.price,
      category: 'Combo',
      image: combo.image || 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80',
      rating: 5,
      reviewCount: 0,
      isAvailable: true,
      quantity: 1,
      note: note ? `Combo: ${note}` : undefined,
      bundle: {
        type: 'combo',
        comboId: combo.id,
        comboName: combo.name,
        items: combo.items
      }
    };

    setCartItems(prev => [...prev, bundleItem]);
    setIsCartOpen(true);
  };

  // Checkout Logic (FIXED: Now saves cart items to order + loyalty points)
  const handleCheckout = (details: any) => {
    const orderSubtotal = cartItems.reduce(
      (sum, item) => sum + calculateItemPrice(item, undefined, undefined, sizeLPrice) * item.quantity,
      0
    );

    // details.discountAmount đã gồm cả giảm giá từ mã khuyến mãi + hội viên
    const orderTotal = Math.max(0, orderSubtotal - (details.discountAmount || 0));

    const newOrder: Order = {
      id: Math.floor(Math.random() * 10000).toString(),
      userId: user?.id, // Link to current user if logged in
      customerName: details.name,
      total: orderTotal,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      itemsCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      items: [...cartItems], // IMPORTANT: Clone the items array
      address: details.address,
      paymentMethod: details.paymentMethod,
      note: details.note // General order note
    };

    setOrders(prev => [newOrder, ...prev]);

    // Cộng điểm hội viên sau khi thanh toán
    if (user) {
      const earnedPoints = calculateEarnedPoints(orderTotal);
      if (earnedPoints > 0) {
        const updatedUser: User = {
          ...user,
          loyaltyPoints: (user.loyaltyPoints || 0) + earnedPoints
        };
        setUser(updatedUser);
        setAllUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
      }
    }

    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // Admin Logic Handlers
  const handleAddProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const handleUpdateProduct = (updatedProduct: Product) => setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  const handleDeleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  
  const handleUpdateOrderStatus = (id: string, status: OrderStatus) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  
  const handleAddBanner = (banner: Banner) => setBanners(prev => [...prev, banner]);
  const handleUpdateBanner = (updatedBanner: Banner) => setBanners(prev => prev.map(b => b.id === updatedBanner.id ? updatedBanner : b));
  const handleDeleteBanner = (id: string) => setBanners(prev => prev.filter(b => b.id !== id));
  
  const handleUpdateBrand = (settings: BrandSettings) => setBrandSettings(settings);

  // New Admin Handlers for Categories and Promotions
  const handleAddCategory = (cat: Category) => setCategories(prev => [...prev, cat]);
  const handleUpdateCategory = (updatedCat: Category) => setCategories(prev => prev.map(c => c.id === updatedCat.id ? updatedCat : c));
  const handleDeleteCategory = (id: string) => setCategories(prev => prev.filter(c => c.id !== id));

  const handleAddPromotion = (promo: DiscountCode) => setPromotions(prev => [...prev, promo]);
  const handleDeletePromotion = (id: string) => setPromotions(prev => prev.filter(p => p.id !== id));

  // User Role Management Handler
  const handleUpdateUserRole = (userId: string, newRole: 'admin' | 'customer') => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
         if (u.email === 'nt40935@gmail.com') return u;
         return { ...u, role: newRole };
      }
      return u;
    }));
  };

  // Topping Logic
  const handleAddTopping = (topping: Topping) => setToppings(prev => [...prev, topping]);
  const handleUpdateTopping = (updatedTopping: Topping) => setToppings(prev => prev.map(t => t.id === updatedTopping.id ? updatedTopping : t));
  const handleDeleteTopping = (id: string) => setToppings(prev => prev.filter(t => t.id !== id));

  // Size Price Logic
  const handleUpdateSizeLPrice = (price: number) => setSizeLPrice(price);

  // Combo Logic
  const handleAddCombo = (combo: Combo) => setCombos(prev => [combo, ...prev]);
  const handleUpdateCombo = (combo: Combo) => setCombos(prev => prev.map(c => (c.id === combo.id ? combo : c)));
  const handleDeleteCombo = (id: string) => setCombos(prev => prev.filter(c => c.id !== id));

  // Reservation Logic
  const handleCreateReservation = (reservation: Reservation) => setReservations(prev => [reservation, ...prev]);
  const handleUpdateReservationStatus = (id: string, status: ReservationStatus) =>
    setReservations(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));

  // Recruitment Logic
  const handleAddJob = (job: Job) => setJobs(prev => [...prev, job]);
  const handleUpdateJob = (job: Job) => setJobs(prev => prev.map(j => j.id === job.id ? job : j));
  const handleDeleteJob = (id: string) => setJobs(prev => prev.filter(j => j.id !== id));

  const handleAddApplication = (app: JobApplication) => setApplications(prev => [app, ...prev]);

  const handleUpdatePartnership = (content: PartnershipContent) => setPartnershipContent(content);

  // Page navigation helpers
  const scrollToSection = (id: string) => {
    if (id === 'apply') setApplyRole('');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyNavigation = (role?: string) => {
    setApplyRole(role || '');
    scrollToSection('apply');
  };

  // Render Admin View (Only if admin role AND adminView toggle is true)
  if (user?.role === 'admin' && adminView) {
    return (
      <AdminDashboard 
        currentUser={user}
        products={products}
        orders={orders}
        banners={banners}
        brandSettings={brandSettings}
        categories={categories}
        promotions={promotions}
        combos={combos}
        reservations={reservations}
        users={allUsers}
        toppings={toppings} // Pass toppings to dashboard
        jobs={jobs}
        applications={applications}
        onLogout={handleLogout}
        onSwitchToStore={() => setAdminView(false)} // Pass toggle handler
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onAddBanner={handleAddBanner}
        onUpdateBanner={handleUpdateBanner}
        onDeleteBanner={handleDeleteBanner}
        onUpdateBrand={handleUpdateBrand}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
        onAddPromotion={handleAddPromotion}
        onDeletePromotion={handleDeletePromotion}
        onAddCombo={handleAddCombo}
        onUpdateCombo={handleUpdateCombo}
        onDeleteCombo={handleDeleteCombo}
        onUpdateReservationStatus={handleUpdateReservationStatus}
        onUpdateUserRole={handleUpdateUserRole}
        onUpdateUser={handleUpdateUserProfile}
        onAddTopping={handleAddTopping}
        onUpdateTopping={handleUpdateTopping}
        onDeleteTopping={handleDeleteTopping}
        sizeLPrice={sizeLPrice}
        onUpdateSizeLPrice={handleUpdateSizeLPrice}
        onAddJob={handleAddJob}
        onUpdateJob={handleUpdateJob}
        onDeleteJob={handleDeleteJob}
        partnershipContent={partnershipContent}
        onUpdatePartnership={handleUpdatePartnership}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  // Render Customer View (Also used by Admin when adminView is false)
  return (
    <div className="min-h-screen">
      <Navbar 
        cartItems={cartItems} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onScrollTo={scrollToSection}
        user={user}
        onLogout={handleLogout}
        language={language}
        setLanguage={setLanguage}
        brandSettings={brandSettings}
        // Pass a way to go back to admin dashboard if user is admin
        onOpenAdmin={() => setAdminView(true)}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        filters={filters}
        setFilters={setFilters}
        language={language}
        categories={categories}
        user={user}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        // Pass a way to go back to admin dashboard in sidebar too
        onOpenAdmin={() => { setAdminView(true); setIsSidebarOpen(false); }}
      />

      <Hero 
        onCtaClick={() => scrollToSection('menu')} 
        banners={banners}
        language={language}
      />
      
      <DiscountCoupons 
        promotions={promotions}
        language={language}
      />

      <ComboSection
        combos={combos}
        products={products}
        language={language}
        onAddComboToCart={handleAddComboToCart}
      />
      
      <Menu 
        products={products}
        categories={categories}
        onAddToCart={openProductModal} 
        filters={filters}
        setFilters={setFilters}
        language={language}
      />

      <Careers 
        jobs={jobs}
        onApplyClick={handleApplyNavigation} 
        onShare={(job) => {
          const shareData = {
            title: job.title,
            text: `${job.title} - ${job.salary} • ${job.location}`,
            url: `${window.location.href.split('#')[0]}#apply`,
          };
          if (navigator.share) {
            navigator.share(shareData).catch(() => {});
          } else {
            navigator.clipboard.writeText(`${shareData.title} - ${shareData.text} ${shareData.url}`).catch(() => {});
            alert('Đã sao chép link tuyển dụng!');
          }
        }}
      />

      <ApplicationSection 
        presetRole={applyRole} 
        jobs={jobs}
        onSubmit={(payload) => {
          const app = {
            id: `app-${Date.now()}`,
            ...payload,
            submittedAt: new Date().toISOString(),
          };
          handleAddApplication(app);
        }}
      />

      <Partnership language={language} content={partnershipContent} />

      <TableBooking
        language={language}
        user={user}
        reservations={reservations}
        onCreateReservation={handleCreateReservation}
      />

      <About />
      
      <Footer 
        onAdminClick={() => {
           if(user?.role === 'admin') setAdminView(true);
           else setIsAuthOpen(true);
        }} 
        language={language}
        brandSettings={brandSettings}
      />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => {
          if (user) { 
             setIsCheckoutOpen(true);
             setIsCartOpen(false); 
          } else {
             setIsAuthOpen(true);
             setIsCartOpen(false);
          }
        }}
        language={language}
        sizeLPrice={sizeLPrice}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        language={language}
        users={allUsers}
      />

      <CheckoutModal 
         isOpen={isCheckoutOpen}
         onClose={() => setIsCheckoutOpen(false)}
         cartItems={cartItems}
         total={cartItems.reduce((sum, item) => sum + calculateItemPrice(item, undefined, undefined, sizeLPrice) * item.quantity, 0)}
         user={user}
         onCheckout={handleCheckout}
         language={language}
         brandSettings={brandSettings}
         sizeLPrice={sizeLPrice}
      />
      
      <Assistant 
        language={language} 
        brandSettings={brandSettings}
      />

      <SupportChat 
        language={language}
        brandSettings={brandSettings}
      />

      <ProductModal 
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={closeProductModal}
        onConfirm={handleAddToCart}
        language={language}
        reviews={reviews}
        onAddReview={handleAddReview}
        user={user}
        toppings={toppings} // Pass dynamic toppings
        sizeLPrice={sizeLPrice} // Pass size L price
        onShare={(product) => {
          const shareUrl = new URL(window.location.href);
          shareUrl.searchParams.set('product', product.id);
          const urlStr = shareUrl.toString();
          const title = product.name;
          const text = product.description;
          if ((navigator as any).share) {
            (navigator as any).share({ title, text, url: urlStr }).catch(() => {});
          } else {
            navigator.clipboard.writeText(urlStr).catch(() => {});
            alert(language === 'vi' ? 'Đã sao chép link món!' : 'Product link copied!');
          }
        }}
      />

      {user && (
        <UserProfile 
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          orders={orders.filter(o => o.userId === user.id || o.customerName === user.name)}
          onUpdateUser={handleUpdateUserProfile}
          language={language}
          sizeLPrice={sizeLPrice}
        />
      )}
    </div>
  );
};

export default App;