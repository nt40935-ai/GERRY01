
import { Product, ProductCategory, Banner, Category, Language, Review, Topping, CartItem, User, Job } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', key: ProductCategory.SIGNATURE, name: 'Signature' },
  { id: '2', key: ProductCategory.HOT_COFFEE, name: 'Hot Coffee' },
  { id: '3', key: ProductCategory.ICED_COFFEE, name: 'Iced Coffee' },
  { id: '4', key: ProductCategory.FRUIT_TEA, name: 'Fruit Tea' },
  { id: '5', key: ProductCategory.MILK_TEA, name: 'Milk Tea' },
  { id: '6', key: ProductCategory.MACCHIATO, name: 'Macchiato' },
  { id: '7', key: ProductCategory.ICE_BLENDED, name: 'Ice Blended' },
  { id: '8', key: ProductCategory.MATCHA, name: 'Matcha' },
  { id: '9', key: ProductCategory.BEANS, name: 'Beans' },
  { id: '10', key: ProductCategory.PASTRY, name: 'Pastry' },
  { id: '11', key: ProductCategory.TOPPING, name: 'Topping' },
  { id: '12', key: ProductCategory.PROMOTION, name: 'Promotion' },
];

export const TOPPINGS_LIST: Topping[] = [
  { id: 't1', name: 'Black Pearl (Trân châu đen)', price: 0.50 },
  { id: 't2', name: 'White Pearl (Trân châu trắng)', price: 0.50 },
  { id: 't3', name: 'Milk Foam (Kem Cheese)', price: 0.75 },
  { id: 't4', name: 'Egg Pudding (Bánh Flan)', price: 0.50 },
  { id: 't5', name: 'Aloe Vera (Nha đam)', price: 0.50 },
  { id: 't6', name: 'Fruit Jelly (Thạch trái cây)', price: 0.50 },
  { id: 't7', name: 'Extra Espresso Shot', price: 0.75 },
];

export const PRODUCTS: Product[] = [
  // --- SIGNATURE ---
  {
    id: '1',
    name: 'Gerry Signature Salted Coffee',
    description: 'Our famous Vietnamese Robusta topped with rich, salty cream foam.',
    price: 4.50,
    category: ProductCategory.SIGNATURE,
    image: 'https://images.unsplash.com/photo-1629906666718-477c77dc8150?auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewCount: 12,
    isAvailable: true
  },
  {
    id: '1a',
    name: 'Gerry Special Egg Coffee',
    description: 'Traditional Hanoi style egg coffee, rich custard flavor over bold espresso.',
    price: 5.00,
    category: ProductCategory.SIGNATURE,
    image: 'https://images.unsplash.com/photo-1633596679268-23963428d052?auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 8,
    isAvailable: true
  },

  // --- HOT COFFEE ---
  {
    id: '2',
    name: 'Velvet Cappuccino',
    description: 'Equal parts espresso, steamed milk, and foam. Smooth perfection.',
    price: 4.50,
    category: ProductCategory.HOT_COFFEE,
    image: 'https://picsum.photos/400/400?random=2',
    rating: 4.7,
    reviewCount: 5,
    isAvailable: true
  },
  {
    id: '3',
    name: 'Caramel Macchiato',
    description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle.',
    price: 5.25,
    category: ProductCategory.HOT_COFFEE,
    image: 'https://picsum.photos/400/400?random=3',
    rating: 4.9,
    isAvailable: true
  },

  // --- ICED COFFEE ---
  {
    id: '4',
    name: 'Nitro Cold Brew',
    description: 'Our cold brew infused with nitrogen for a creamy texture and velvety finish.',
    price: 5.50,
    category: ProductCategory.ICED_COFFEE,
    image: 'https://picsum.photos/400/400?random=4',
    rating: 5.0,
    isAvailable: true
  },
  {
    id: '5',
    name: 'Iced Oat Latte',
    description: 'Espresso combined with oat milk and served over ice. Vegan friendly.',
    price: 5.00,
    category: ProductCategory.ICED_COFFEE,
    image: 'https://picsum.photos/400/400?random=5',
    rating: 4.6,
    isAvailable: true
  },

  // --- FRUIT TEA ---
  {
    id: '11',
    name: 'Peach Lemongrass Tea',
    description: 'Refreshing black tea shaken with peach syrup and fresh lemongrass slices.',
    price: 4.75,
    category: ProductCategory.FRUIT_TEA,
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80',
    rating: 4.8,
    isAvailable: true
  },
  {
    id: '12',
    name: 'Tropical Lychee Lotus Tea',
    description: 'Fragrant lotus tea blended with sweet lychee fruit and aloe vera.',
    price: 4.95,
    category: ProductCategory.FRUIT_TEA,
    image: 'https://images.unsplash.com/photo-1621267860478-dbdd58ae3294?auto=format&fit=crop&q=80',
    rating: 4.9,
    isAvailable: true
  },

  // --- MILK TEA ---
  {
    id: '13',
    name: 'Royal Pearl Milk Tea',
    description: 'Classic rich black tea with milk and chewy tapioca pearls.',
    price: 4.50,
    category: ProductCategory.MILK_TEA,
    image: 'https://images.unsplash.com/photo-1558160918-649067b0d879?auto=format&fit=crop&q=80',
    rating: 4.7,
    isAvailable: true
  },
  {
    id: '14',
    name: 'Roasted Oolong Milk Tea',
    description: 'Premium roasted oolong tea with fresh milk, aromatic and smooth.',
    price: 4.80,
    category: ProductCategory.MILK_TEA,
    image: 'https://images.unsplash.com/photo-1626388942913-793540203a3d?auto=format&fit=crop&q=80',
    rating: 4.8,
    isAvailable: true
  },

  // --- MACCHIATO ---
  {
    id: '15',
    name: 'Black Tea Macchiato',
    description: 'Pure black tea topped with a thick, savory cheese foam layer.',
    price: 4.50,
    category: ProductCategory.MACCHIATO,
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80',
    rating: 4.6,
    isAvailable: true
  },

  // --- ICE BLENDED ---
  {
    id: '16',
    name: 'Cookie & Cream Frappe',
    description: 'Ice blended with oreo cookies, topped with whipped cream and cookie crumbles.',
    price: 5.75,
    category: ProductCategory.ICE_BLENDED,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80',
    rating: 4.9,
    isAvailable: true
  },
  {
    id: '17',
    name: 'Coffee Freeze',
    description: 'Strong espresso blended with ice and jelly for a refreshing kick.',
    price: 5.50,
    category: ProductCategory.ICE_BLENDED,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80',
    rating: 4.8,
    isAvailable: true
  },

  // --- MATCHA ---
  {
    id: '18',
    name: 'Uji Matcha Latte',
    description: 'Premium Japanese matcha whisked with steamed milk.',
    price: 5.25,
    category: ProductCategory.MATCHA,
    image: 'https://images.unsplash.com/photo-1515825838458-f2a94b20105a?auto=format&fit=crop&q=80',
    rating: 4.7,
    isAvailable: true
  },
  {
    id: '19',
    name: 'Matcha Ice Blended',
    description: 'Creamy matcha frappuccino topped with green tea powder.',
    price: 5.95,
    category: ProductCategory.MATCHA,
    image: 'https://images.unsplash.com/photo-1536283733221-872f2324683a?auto=format&fit=crop&q=80',
    rating: 4.8,
    isAvailable: true
  },

  // --- TOPPING ---
  {
    id: '20',
    name: 'Black Pearl',
    description: 'Add extra chewy tapioca pearls to your drink.',
    price: 0.50,
    category: ProductCategory.TOPPING,
    image: 'https://images.unsplash.com/photo-1628751506927-449e7943d2c9?auto=format&fit=crop&q=80',
    rating: 5.0,
    isAvailable: true
  },
  {
    id: '21',
    name: 'Milk Foam',
    description: 'Rich and salty cream cheese foam topping.',
    price: 0.75,
    category: ProductCategory.TOPPING,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80',
    rating: 5.0,
    isAvailable: true
  },

  // --- BEANS ---
  {
    id: '6',
    name: 'Ethiopian Yirgacheffe Beans',
    description: '340g bag. Bright, floral notes with a hint of citrus.',
    price: 18.00,
    category: ProductCategory.BEANS,
    image: 'https://picsum.photos/400/400?random=6',
    rating: 4.9,
    isAvailable: true
  },

  // --- PASTRY ---
  {
    id: '8',
    name: 'Almond Croissant',
    description: 'Buttery, flaky pastry filled with sweet almond paste.',
    price: 4.25,
    category: ProductCategory.PASTRY,
    image: 'https://picsum.photos/400/400?random=8',
    rating: 4.7,
    isAvailable: true
  },

  // --- PROMOTION ---
  {
    id: '10',
    name: 'Weekend Bundle Deal',
    description: '2 Lattes + 2 Pastries of your choice. Limited time offer!',
    price: 15.00,
    originalPrice: 19.50,
    category: ProductCategory.PROMOTION,
    image: 'https://images.unsplash.com/photo-1515442261605-65987783cb6a?auto=format&fit=crop&q=80',
    rating: 5.0,
    isAvailable: true
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userId: 'u1',
    userName: 'Sarah Jenkins',
    userAvatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random',
    rating: 5,
    comment: 'The best salted coffee I have ever tasted! The cream is so rich.',
    date: '2024-03-01'
  },
  {
    id: 'r2',
    productId: '1',
    userId: 'u2',
    userName: 'Mike T.',
    userAvatar: 'https://ui-avatars.com/api/?name=Mike+T&background=random',
    rating: 5,
    comment: 'Absolutely addictive. I order this every morning.',
    date: '2024-03-02'
  },
  {
    id: 'r3',
    productId: '2',
    userId: 'u3',
    userName: 'Emily Rose',
    userAvatar: 'https://ui-avatars.com/api/?name=Emily+Rose&background=random',
    rating: 4,
    comment: 'Very smooth cappuccino. Could be a bit hotter though.',
    date: '2024-03-05'
  }
];

// Set a date 2 days in the future for the demo
const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 2);

export const BANNERS: Banner[] = [
  {
    id: '1',
    title: 'Flash Sale: 20% OFF',
    subtitle: 'Get your morning brew for less. Hurry, time is ticking!',
    imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80',
    ctaText: 'Grab Deal',
    linkSection: 'menu',
    isActive: true,
    endsAt: futureDate.toISOString()
  },
  {
    id: '2',
    title: 'New: Salted Coffee',
    subtitle: 'Experience the unique blend of our new Signature Salted Coffee.',
    imageUrl: 'https://images.unsplash.com/photo-1629906666718-477c77dc8150?auto=format&fit=crop&q=80',
    ctaText: 'Try It Now',
    linkSection: 'menu',
    isActive: true
  }
];

// Default recruitment postings
export const DEFAULT_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Barista (Full-time)',
    location: 'Hà Nội • 85 Thái Hà',
    type: 'Toàn thời gian • 2 ca xoay',
    salary: '8 - 10 triệu + service charge',
    description: 'Phục vụ quầy pha chế, đảm bảo chất lượng đồ uống và trải nghiệm khách hàng.',
    requirements: ['Có ít nhất 6 tháng kinh nghiệm pha chế', 'Thái độ phục vụ tốt, chịu học hỏi', 'Ca linh hoạt, có thể làm cuối tuần'],
    benefits: ['Đào tạo nâng bậc barista', 'BHXH, phụ cấp ca đêm', 'Giảm 30% đồ uống cho người thân'],
    isActive: true,
  },
  {
    id: 'job-2',
    title: 'Barista Part-time',
    location: 'Hà Nội • 289 Giảng Võ',
    type: 'Ca 4-6h • Ưu tiên sinh viên',
    salary: '35.000 - 45.000đ/giờ + tip',
    description: 'Hỗ trợ pha chế và phục vụ trong giờ cao điểm, đảm bảo tốc độ và vệ sinh quầy.',
    requirements: ['Không yêu cầu kinh nghiệm, sẽ được đào tạo', 'Ưu tiên ca tối và cuối tuần', 'Siêng năng, giao tiếp tốt'],
    benefits: ['Ca linh hoạt', 'Tip chia theo ca', 'Được training miễn phí'],
    isActive: true,
  },
  {
    id: 'job-3',
    title: 'Cửa hàng trưởng',
    location: 'Hà Nội • Linh hoạt chi nhánh',
    type: 'Toàn thời gian • Quản lý ca',
    salary: '15 - 20 triệu + KPI',
    description: 'Quản lý vận hành cửa hàng, nhân sự, kiểm soát chất lượng và doanh thu.',
    requirements: ['Tối thiểu 1 năm quản lý F&B', 'Kỹ năng đào tạo và sắp ca', 'Hiểu quy trình an toàn thực phẩm'],
    benefits: ['Thưởng KPI theo tháng', 'Bảo hiểm đầy đủ', 'Lộ trình khu vực manager'],
    isActive: true,
  },
];

export const DEFAULT_PARTNERSHIP_CONTENT = {
  vi: {
    badge: 'Hợp tác phát triển',
    title: 'Kêu gọi đầu tư & nhượng quyền',
    subtitle: 'Cùng mở rộng hệ sinh thái cà phê công nghệ với quy trình chuẩn hóa, công nghệ vận hành và mô hình lợi nhuận rõ ràng.',
    tags: ['Playbook 90 ngày', 'Tech vận hành realtime', 'Chuẩn hóa chất lượng'],
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80',
    contactNote: 'Liên hệ: partners@gerrycoffee.com • 0936 000 888',
    ctaPrimaryText: 'Nhận bộ hồ sơ đầu tư',
    ctaPrimaryLink: 'mailto:partners@gerrycoffee.com?subject=GERRY%20COFFEE%20-%20Partnership',
    ctaSecondaryText: 'Đặt lịch trao đổi',
    ctaSecondaryLink: 'tel:+84936000888',
    chatLink: 'https://m.me/',
    pillars: [
      { icon: 'LineChart', title: 'ROI minh bạch', desc: 'Dự báo dòng tiền, KPI doanh thu theo từng giai đoạn khai trương và vận hành.' },
      { icon: 'ShieldCheck', title: 'Vận hành an toàn', desc: 'Bộ quy trình SOP, đào tạo nhân sự, kiểm soát chất lượng đồ uống và trải nghiệm khách hàng.' },
      { icon: 'Store', title: 'Mô hình linh hoạt', desc: 'Từ kiosk 20m² đến flagship 150m², tối ưu vốn đầu tư và thời gian hoàn vốn.' },
      { icon: 'Handshake', title: 'Đồng hành 360°', desc: 'Hỗ trợ tìm mặt bằng, thiết kế, marketing khai trương và vận hành 6 tháng đầu.' },
    ],
  },
  en: {
    badge: 'Partnership Program',
    title: 'Investment & Franchise Invitation',
    subtitle: 'Scale a tech-enabled coffee ecosystem with standardized playbooks, operating tech stack, and transparent profit models.',
    tags: ['90-day playbook', 'Realtime ops tech', 'Quality assurance'],
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80',
    contactNote: 'Contact: partners@gerrycoffee.com • +84 936 000 888',
    ctaPrimaryText: 'Request investment deck',
    ctaPrimaryLink: 'mailto:partners@gerrycoffee.com?subject=GERRY%20COFFEE%20-%20Partnership',
    ctaSecondaryText: 'Book a call',
    ctaSecondaryLink: 'tel:+84936000888',
    chatLink: 'https://m.me/',
    pillars: [
      { icon: 'LineChart', title: 'Transparent ROI', desc: 'Cashflow projection and revenue KPIs across pre-launch, launch, and run-rate stages.' },
      { icon: 'ShieldCheck', title: 'Operational safety', desc: 'End-to-end SOPs, crew training, and quality control for beverages and guest experience.' },
      { icon: 'Store', title: 'Flexible formats', desc: 'From 20m² kiosks to 150m² flagship stores to match capital and payback goals.' },
      { icon: 'Handshake', title: 'Full-stack support', desc: 'Site selection, design, launch marketing, and on-ground support for the first 6 months.' },
    ],
  },
};

export const SYSTEM_INSTRUCTION = `You are Gerry, a world-class AI Barista for GERRY COFFEE. 
Your goal is to help customers choose the perfect coffee, tea, or pastry from our specific menu.
Be friendly, warm, and sophisticated. Keep answers concise (under 50 words unless asked for a story).

Here is our CURRENT MENU (Only recommend these items):
${PRODUCTS.map(p => `- ${p.name} (${p.category}): $${p.price.toFixed(2)}`).join('\n')}

If a user asks for something we don't have, politely suggest the closest alternative from our menu.
If the user seems undecided, ask them about their flavor preferences (sweet, strong, fruity, creamy, etc.).
We now serve Fruit Tea, Milk Tea, Macchiato, and Ice Blended drinks in addition to Coffee.
`;

export const EXCHANGE_RATE = 25000;
export const SIZE_L_UPCHARGE = 0.50; // $0.50 upcharge for Large size
export const LOYALTY_POINT_VALUE_VND = 10000; // 10,000 VND = 1 point

// Helper to calculate total price of a cart item
export const calculateItemPrice = (item: CartItem | Product, size?: 'M' | 'L', toppings?: Topping[], sizeLPrice?: number) => {
  let price = item.price;
  
  // Handle size upcharge - use provided sizeLPrice or fallback to default
  const upcharge = sizeLPrice !== undefined ? sizeLPrice : SIZE_L_UPCHARGE;
  if ((item as CartItem).size === 'L' || size === 'L') {
    price += upcharge;
  }
  
  // Handle toppings
  const currentToppings = (item as CartItem).toppings || toppings || [];
  const toppingsPrice = currentToppings.reduce((sum, t) => sum + t.price, 0);
  
  return price + toppingsPrice;
};

export const formatPrice = (price: number, language: Language) => {
  if (language === 'vi') {
    return (price * EXCHANGE_RATE).toLocaleString('vi-VN') + 'đ';
  }
  return '$' + price.toFixed(2);
};

// --- LOYALTY HELPERS ---

export const getLoyaltyTier = (
  points: number | undefined,
  overrides?: {
    loyaltyBronzeMin?: number;
    loyaltySilverMin?: number;
    loyaltyGoldMin?: number;
    loyaltyDiamondMin?: number;
  }
) => {
  const p = points ?? 0;

  const bronzeMin = overrides?.loyaltyBronzeMin ?? 0;
  const silverMin = overrides?.loyaltySilverMin ?? 500;
  const goldMin = overrides?.loyaltyGoldMin ?? 850;
  const diamondMin = overrides?.loyaltyDiamondMin ?? 1350;

  if (p >= diamondMin) return { key: 'diamond', nameVi: 'Kim Cương', nameEn: 'Diamond', discountPercent: 15 };
  if (p >= goldMin) return { key: 'gold', nameVi: 'Vàng', nameEn: 'Gold', discountPercent: 10 };
  if (p >= silverMin) return { key: 'silver', nameVi: 'Bạc', nameEn: 'Silver', discountPercent: 5 };
  if (p >= bronzeMin) return { key: 'bronze', nameVi: 'Đồng', nameEn: 'Bronze', discountPercent: 0 };
  return { key: 'none', nameVi: 'Chưa xếp hạng', nameEn: 'Unranked', discountPercent: 0 };
};

export const calculateLoyaltyDiscount = (
  user: User | null,
  subtotal: number,
  overrides?: {
    loyaltyBronzeMin?: number;
    loyaltySilverMin?: number;
    loyaltyGoldMin?: number;
    loyaltyDiamondMin?: number;
  }
) => {
  if (!user) return { discountPercent: 0, discountAmount: 0 };
  const tier = getLoyaltyTier(user.loyaltyPoints, overrides);
  const discountAmount = (subtotal * tier.discountPercent) / 100;
  return { discountPercent: tier.discountPercent, discountAmount };
};

export const calculateEarnedPoints = (finalTotal: number) => {
  // finalTotal is in base currency (USD). Convert to VND then to points.
  const amountVnd = finalTotal * EXCHANGE_RATE;
  const rawPoints = Math.floor(amountVnd / LOYALTY_POINT_VALUE_VND);
  return rawPoints > 0 ? rawPoints : 0;
};

export const TRANSLATIONS = {
  en: {
    nav: { menu: 'Menu', combos: 'Combos', booking: 'Booking', about: 'About', contact: 'Contact', careers: 'Careers', apply: 'Apply', partner: 'Partnerships', sign_in: 'Sign In', sign_out: 'Sign Out', profile: 'Profile' },
    hero: { est: 'EST. 2024 • PREMIUM ROASTS & TEAS', ends_in: 'Ends In:', cta: 'Order Now' },
    menu: { title: 'Our Menu', special: 'Special Offers', found: 'Found', items: 'items', matching: 'matching', no_products: 'No products found', search_not_found: 'We do not currently have this product, we appreciate your understanding.', try_adjust: 'Try adjusting your filters', add_to_cart: 'Add to Cart', sale: 'SALE', search_placeholder: 'Search for coffee, tea, pastries...', sold_out: 'Sold Out' },
    cart: { title: 'Your Order', empty: 'Your cart is empty.', empty_desc: 'Time to fuel up with some coffee!', browse: 'Browse Menu', subtotal: 'Subtotal', checkout: 'Proceed to Checkout' },
    auth: { 
      welcome: 'Welcome Back', 
      join: 'Join Gerry Coffee', 
      sign_in_desc: 'Sign in to access your account', 
      create_desc: 'Create an account to start ordering', 
      name: 'Full Name', 
      email: 'Email / Phone', 
      password: 'Password', 
      confirm_password: 'Confirm Password',
      sign_in: 'Sign In', 
      create: 'Create Account', 
      no_acc: "Don't have an account?", 
      have_acc: "Already have an account?",
      account_not_found: "Account does not exist. Please create an account.",
      account_exists: "Account already exists. Please sign in.",
      password_mismatch: "Passwords do not match.",
      forgot_password: "Forgot Password?",
      reset_password: "Reset Password",
      reset_desc: "Enter your email or phone to reset your password",
      reset_success: "Password reset instructions sent!",
      reset_success_desc: "Please check your email or phone for reset instructions.",
      back_to_login: "Back to Login",
      continue_with: "Or continue with",
      sign_in_google: "Sign in with Google",
      sign_in_facebook: "Sign in with Facebook"
    },
    checkout: { 
      title: 'Checkout', shipping: 'Shipping Details', payment: 'Payment Method', online: 'Bank Transfer', cod: 'Cash on Delivery', 
      summary: 'Order Summary', total: 'Total', confirm: 'Confirm Order', success: 'Order Confirmed!', success_desc: 'Thank you for your purchase.', 
      full_name: 'Full Name', phone: 'Phone Number', address: 'Delivery Address', bank_info: 'Transfer to: GERRY COFFEE - VCB: 123456789 - Content: [Your Name] + [Phone]', 
      note: 'Order Note', note_placeholder: 'Any special instructions for delivery...', 
      discount_not_applicable: 'Code expired or not applicable to selected items.',
      invalid_code: 'Discount code is invalid.',
      discount_code: 'Discount code',
      discount_placeholder: 'Enter your code...',
      apply: 'Apply',
      discount: 'Discount',
      remove: 'Remove',
      momo: 'MoMo Wallet',
      zalopay: 'ZaloPay',
      vnpay: 'VNPay',
      paypal: 'PayPal',
      stripe: 'Credit/Debit Card',
      qr: 'QR Code'
    },
    sidebar: { menu_filters: 'Store Categories', categories: 'Product Types', price_range: 'Price Range', min: 'Min', max: 'Max', discover: 'Discover More', reset: 'Reset Filters', search_placeholder: 'Search... (Press Enter)' },
    footer: { quick_links: 'Quick Links', contact: 'Contact Us', hours: 'Opening Hours', rights: 'All rights reserved.', location: 'Our Location' },
    modal: { customize: 'Customize', size: 'Select Size', note: 'Notes for Barista', note_placeholder: 'E.g. Less sugar, extra ice...', add: 'Add to Order', cancel: 'Cancel', sold_out: 'Currently Unavailable', toppings: 'Add Toppings' },
    profile: { title: 'My Profile', personal_info: 'Personal Information', order_history: 'Order History', save: 'Save Changes', name: 'Full Name', email: 'Email', phone: 'Phone Number', address: 'Default Address', no_orders: 'No orders found.', tab_profile: 'Profile', tab_orders: 'Orders' },
    reviews: { title: 'Customer Reviews', no_reviews: 'No reviews yet. Be the first to review!', write_review: 'Write a Review', rating: 'Your Rating', comment: 'Your Review', submit: 'Submit Review', login_required: 'Please log in to leave a review.', placeholder: 'Share your thoughts about this product...', success: 'Review submitted!' },
    cats: { 
      All: 'All', 
      [ProductCategory.SIGNATURE]: 'Signature',
      [ProductCategory.HOT_COFFEE]: 'Hot Coffee', 
      [ProductCategory.ICED_COFFEE]: 'Iced Coffee', 
      [ProductCategory.FRUIT_TEA]: 'Fruit Tea',
      [ProductCategory.MILK_TEA]: 'Milk Tea',
      [ProductCategory.MACCHIATO]: 'Macchiato',
      [ProductCategory.ICE_BLENDED]: 'Ice Blended',
      [ProductCategory.MATCHA]: 'Matcha',
      [ProductCategory.BEANS]: 'Beans', 
      [ProductCategory.PASTRY]: 'Pastry', 
      [ProductCategory.TOPPING]: 'Topping',
      [ProductCategory.PROMOTION]: 'Promotion' 
    },
    // Admin Translations
    admin_nav: { overview: 'Overview', reports: 'Sales Reports', products: 'Products', orders: 'Orders', banners: 'Banners', settings: 'Brand Settings', categories: 'Categories', promotions: 'Promotions', combos: 'Combos', reservations: 'Reservations', users: 'Users', sign_out: 'Sign Out', recruitment: 'Recruitment', applications: 'Applications', partnership: 'Partnership' },
    admin_login: { title: 'Admin Portal', subtitle: 'GERRY COFFEE Management System', email: 'Email / Phone', password: 'Password', sign_in: 'Sign In', back: 'Back to Store', invalid: 'Invalid credentials.' },
    admin_dash: { welcome: 'Dashboard Overview', actions: 'Quick Actions', view_analytics: 'View Sales Analytics', add_product: 'Add New Product', manage_orders: 'Manage Recent Orders', update_banners: 'Update Website Banners' },
    admin_stats: { revenue: 'Total Revenue', orders: 'Total Orders', items: 'Menu Items', active_banners: 'Active Banners', order_value: 'Avg. Order Value' },
    admin_product: { title: 'Product Management', add: 'Add Product', name: 'Product Name', price: 'Price', original_price: 'Original Price', category: 'Category', description: 'Description', image: 'Product Image', save: 'Save Product', cancel: 'Cancel', edit: 'Edit Product', new: 'New Product', available: 'Available' },
    admin_order: { title: 'Recent Orders', showing: 'Showing', id: 'Order ID', customer: 'Customer', date: 'Date', items: 'Items', total: 'Total', status: 'Status', print: 'Print Invoice' },
    admin_banner: { title: 'Banner Management', add: 'Add Banner', headline: 'Headline', subtitle: 'Subtitle', cta: 'CTA Text', link: 'Link Section', countdown: 'Discount Countdown', image_url: 'Image URL', save: 'Save Banner', preview: 'Preview', status: 'Status', active: 'Active', hidden: 'Hidden' },
    admin_brand: { title: 'Brand Identity', desc: 'Update the look and feel of your store.', name: 'Brand Name', logo: 'Brand Logo / Icon', header_preview: 'Header Preview', store_info: 'Store Information', address: 'Store Address', phone: 'Contact Phone', email: 'Contact Email', map_url: 'Google Maps Embed HTML (iframe)' },
    admin_report: { title: 'Sales Analytics', subtitle: 'Performance overview for GERRY COFFEE', trends: 'Revenue Trends', by_category: 'Sales by Category', from_last: 'from last' },
    admin_category: { title: 'Category Management', add: 'Add Category', name: 'Category Name', key: 'Internal Key (No Spaces)', save: 'Save Category', edit: 'Edit Category' },
    admin_promotion: { title: 'Discount Codes', add: 'Add Code', code: 'Code', type: 'Type', value: 'Value', valid_period: 'Valid Period', applicable: 'Applicable Products', percent: 'Percentage', fixed: 'Fixed Amount', save: 'Save Promotion', select_products: 'Select Products', all_products: 'All Products', start_date: 'Start Date', end_date: 'End Date', require_product: 'Please select at least one product for this code.' },
    admin_users: { title: 'User Management', name: 'Name', email: 'Email', role: 'Role', actions: 'Actions', make_admin: 'Grant Admin', revoke: 'Revoke Admin', customer: 'Customer', admin: 'Admin', cannot_revoke_self: 'Main Admin cannot be modified' },
    uploader: { label: 'Image', paste: 'Paste Link', upload: 'Upload File', select: 'Click to select image', preview: 'Current Preview' }
  },
  vi: {
    nav: { menu: 'Thực Đơn', combos: 'Combo', booking: 'Đặt bàn', about: 'Về Chúng Tôi', contact: 'Liên Hệ', careers: 'Tuyển Dụng', apply: 'Ứng Tuyển', partner: 'Hợp Tác', sign_in: 'Đăng Nhập', sign_out: 'Đăng Xuất', profile: 'Hồ Sơ' },
    hero: { est: 'THÀNH LẬP 2024 • CÀ PHÊ & TRÀ', ends_in: 'Kết Thúc Sau:', cta: 'Đặt Ngay' },
    menu: { title: 'Thực Đơn', special: 'Khuyến Mãi', found: 'Tìm thấy', items: 'sản phẩm', matching: 'phù hợp với', no_products: 'Không tìm thấy sản phẩm', search_not_found: 'Sản phẩm này chúng tôi hiện chưa có, mong khách hàng thông cảm.', try_adjust: 'Hãy thử tìm kiếm từ khóa khác', add_to_cart: 'Thêm vào giỏ', sale: 'GIẢM', search_placeholder: 'Tìm trà, cà phê, bánh...', sold_out: 'HẾT HÀNG' },
    cart: { title: 'Giỏ Hàng', empty: 'Giỏ hàng trống.', empty_desc: 'Hãy nạp năng lượng bằng chút cà phê!', browse: 'Xem Thực Đơn', subtotal: 'Tạm tính', checkout: 'Thanh Toán' },
    auth: { 
      welcome: 'Chào Mừng', 
      join: 'Tham Gia Cùng Gerry', 
      sign_in_desc: 'Đăng nhập để truy cập tài khoản', 
      create_desc: 'Tạo tài khoản để bắt đầu đặt hàng', 
      name: 'Họ Tên', 
      email: 'Email / Số điện thoại', 
      password: 'Mật Khẩu',
      confirm_password: 'Xác Nhận Mật Khẩu',
      sign_in: 'Đăng Nhập', 
      create: 'Tạo Tài Khoản', 
      no_acc: "Chưa có tài khoản?", 
      have_acc: "Đã có tài khoản?",
      account_not_found: "Tài khoản không tồn tại. Vui lòng tạo tài khoản.",
      account_exists: "Tài khoản đã tồn tại. Vui lòng đăng nhập.",
      password_mismatch: "Mật khẩu không khớp.",
      forgot_password: "Quên mật khẩu?",
      reset_password: "Đặt Lại Mật Khẩu",
      reset_desc: "Nhập email hoặc số điện thoại để đặt lại mật khẩu",
      reset_success: "Đã gửi hướng dẫn đặt lại mật khẩu!",
      reset_success_desc: "Vui lòng kiểm tra email hoặc số điện thoại của bạn.",
      back_to_login: "Quay lại đăng nhập",
      continue_with: "Hoặc đăng nhập bằng",
      sign_in_google: "Đăng nhập bằng Google",
      sign_in_facebook: "Đăng nhập bằng Facebook"
    },
    checkout: { 
      title: 'Thanh Toán', shipping: 'Thông Tin Giao Hàng', payment: 'Phương Thức Thanh Toán', online: 'Chuyển Khoản Ngân Hàng', cod: 'Tiền Mặt Khi Nhận Hàng', 
      summary: 'Đơn Hàng', total: 'Tổng Cộng', confirm: 'Xác Nhận Đặt Hàng', success: 'Đặt Hàng Thành Công!', success_desc: 'Cảm ơn bạn đã mua hàng.', 
      full_name: 'Họ Tên', phone: 'Số Điện Thoại', address: 'Địa Chỉ Giao Hàng', bank_info: 'STK: 123456789 - NH: Vietcombank - Chủ TK: GERRY COFFEE - ND: [Tên] + [SĐT]', 
      note: 'Ghi Chú Đơn Hàng', note_placeholder: 'Lời nhắn cho người giao hàng, giờ giao...', 
      discount_not_applicable: 'Mã đã hết hạn hoặc không thể áp dụng cho món này.',
      invalid_code: 'Mã giảm giá không hợp lệ.',
      discount_code: 'Mã giảm giá',
      discount_placeholder: 'Nhập mã giảm giá...',
      apply: 'Áp dụng',
      discount: 'Giảm giá',
      remove: 'Xóa mã',
      momo: 'Ví MoMo',
      zalopay: 'ZaloPay',
      vnpay: 'VNPay',
      paypal: 'PayPal',
      stripe: 'Thẻ Tín Dụng/Ghi Nợ',
      qr: 'Mã QR'
    },
    sidebar: { menu_filters: 'Danh Mục Sản Phẩm', categories: 'Sản Phẩm Tại Cửa Hàng', price_range: 'Khoảng Giá', min: 'Thấp nhất', max: 'Cao nhất', discover: 'Khám Phá Thêm', reset: 'Đặt Lại Bộ Lọc', search_placeholder: 'Tìm kiếm... (Nhấn Enter)' },
    footer: { quick_links: 'Liên Kết Nhanh', contact: 'Liên Hệ', hours: 'Giờ Mở Cửa', rights: 'Đã đăng ký bản quyền.', location: 'Vị Trí Cửa Hàng' },
    modal: { customize: 'Tùy Chọn Món', size: 'Chọn Kích Thước', note: 'Ghi Chú Pha Chế', note_placeholder: 'VD: Ít đường, nhiều đá...', add: 'Thêm Vào Đơn', cancel: 'Hủy Bỏ', sold_out: 'Tạm Thời Hết Hàng', toppings: 'Thêm Topping' },
    profile: { title: 'Hồ Sơ Của Tôi', personal_info: 'Thông Tin Cá Nhân', order_history: 'Lịch Sử Đơn Hàng', save: 'Lưu Thay Đổi', name: 'Họ Tên', email: 'Email/SĐT', phone: 'Số Điện Thoại', address: 'Địa Chỉ Mặc Định', no_orders: 'Chưa có đơn hàng nào.', tab_profile: 'Hồ Sơ', tab_orders: 'Đơn Hàng' },
    reviews: { title: 'Đánh Giá Khách Hàng', no_reviews: 'Chưa có đánh giá nào. Hãy là người đầu tiên!', write_review: 'Viết Đánh Giá', rating: 'Đánh Giá Của Bạn', comment: 'Nội Dung', submit: 'Gửi Đánh Giá', login_required: 'Vui lòng đăng nhập để đánh giá.', placeholder: 'Chia sẻ cảm nhận về món này...', success: 'Đã gửi đánh giá!' },
    cats: { 
      All: 'Tất Cả', 
      [ProductCategory.SIGNATURE]: 'Món Đặc Trưng',
      [ProductCategory.HOT_COFFEE]: 'Cà Phê Nóng', 
      [ProductCategory.ICED_COFFEE]: 'Cà Phê Đá', 
      [ProductCategory.FRUIT_TEA]: 'Trà Trái Cây',
      [ProductCategory.MILK_TEA]: 'Trà Sữa',
      [ProductCategory.MACCHIATO]: 'Macchiato',
      [ProductCategory.ICE_BLENDED]: 'Đá Xay',
      [ProductCategory.MATCHA]: 'Matcha',
      [ProductCategory.BEANS]: 'Hạt Cà Phê', 
      [ProductCategory.PASTRY]: 'Bánh Ngọt', 
      [ProductCategory.TOPPING]: 'Topping',
      [ProductCategory.PROMOTION]: 'Khuyến Mãi' 
    },
    // Admin Translations (Vietnamese)
    admin_nav: { overview: 'Tổng Quan', reports: 'Báo Cáo Doanh Thu', products: 'Sản Phẩm', orders: 'Đơn Hàng', banners: 'Quảng Cáo', settings: 'Thương Hiệu', categories: 'Danh Mục', promotions: 'Mã Giảm Giá', combos: 'Combo', reservations: 'Đặt bàn', users: 'Người Dùng', sign_out: 'Đăng Xuất', recruitment: 'Tuyển Dụng', applications: 'Hồ Sơ Ứng Tuyển', partnership: 'Hợp Tác' },
    admin_login: { title: 'Cổng Quản Trị', subtitle: 'Hệ Thống Quản Lý GERRY COFFEE', email: 'Email / SĐT', password: 'Mật Khẩu', sign_in: 'Đăng Nhập', back: 'Quay Lại Cửa Hàng', invalid: 'Thông tin đăng nhập không đúng.' },
    admin_dash: { welcome: 'Tổng Quan Bảng Điều Khiển', actions: 'Thao Tác Nhanh', view_analytics: 'Xem Phân Tích Doanh Thu', add_product: 'Thêm Sản Phẩm Mới', manage_orders: 'Quản Lý Đơn Hàng Gần Đây', update_banners: 'Cập Nhật Banner Website' },
    admin_stats: { revenue: 'Tổng Doanh Thu', orders: 'Tổng Đơn Hàng', items: 'Món Trong Menu', active_banners: 'Banner Đang Chạy', order_value: 'Giá Trị Đơn TB' },
    admin_product: { title: 'Quản Lý Sản Phẩm', add: 'Thêm Sản Phẩm', name: 'Tên Sản Phẩm', price: 'Giá', original_price: 'Giá Gốc', category: 'Danh Mục', description: 'Mô Tả', image: 'Hình Ảnh', save: 'Lưu Sản Phẩm', cancel: 'Hủy', edit: 'Sửa Sản Phẩm', new: 'Sản Phẩm Mới', available: 'Trạng Thái' },
    admin_order: { title: 'Đơn Hàng Gần Đây', showing: 'Hiển thị', id: 'Mã ĐH', customer: 'Khách Hàng', date: 'Ngày', items: 'Số Lượng', total: 'Tổng', status: 'Trạng Thái', print: 'In Hóa Đơn' },
    admin_banner: { title: 'Quản Lý Banner', add: 'Thêm Banner', headline: 'Tiêu Đề', subtitle: 'Phụ Đề', cta: 'Nút Hành Động', link: 'Liên Kết Đến', countdown: 'Đếm Ngược Giảm Giá', image_url: 'Link Ảnh', save: 'Lưu Banner', preview: 'Xem Trước', status: 'Trạng Thái', active: 'Hiện', hidden: 'Ẩn' },
    admin_brand: { title: 'Nhận Diện Thương Hiệu', desc: 'Cập nhật giao diện cửa hàng của bạn.', name: 'Tên Thương Hiệu', logo: 'Logo / Biểu Tượng', header_preview: 'Xem Trước Header', store_info: 'Thông Tin Cửa Hàng', address: 'Địa Chỉ Cửa Hàng', phone: 'Hotline Liên Hệ', email: 'Email Liên Hệ', map_url: 'Mã Nhúng Google Maps (iframe)' },
    admin_report: { title: 'Phân Tích Doanh Thu', subtitle: 'Tổng quan hiệu suất cho GERRY COFFEE', trends: 'Xu Hướng Doanh Thu', by_category: 'Doanh Thu Theo Danh Mục', from_last: 'so với' },
    admin_category: { title: 'Quản Lý Danh Mục', add: 'Thêm Danh Mục', name: 'Tên Danh Mục', key: 'Mã Hệ Thống (Không Dấu)', save: 'Lưu Danh Mục', edit: 'Sửa Danh Mục' },
    admin_promotion: { title: 'Mã Giảm Giá', add: 'Tạo Mã Mới', code: 'Mã Code', type: 'Loại', value: 'Giá Trị', valid_period: 'Thời Gian', applicable: 'Sản Phẩm Áp Dụng', percent: 'Phần Trăm (%)', fixed: 'Số Tiền', save: 'Lưu Mã', select_products: 'Chọn Sản Phẩm', all_products: 'Tất Cả Sản Phẩm', start_date: 'Ngày Bắt Đầu', end_date: 'Ngày Kết Thúc', require_product: 'Vui lòng chọn ít nhất 1 sản phẩm cho mã giảm giá.' },
    admin_users: { title: 'Quản Lý Người Dùng', name: 'Họ Tên', email: 'Email/SĐT', role: 'Vai Trò', actions: 'Thao Tác', make_admin: 'Cấp Quyền Admin', revoke: 'Hủy Quyền Admin', customer: 'Khách Hàng', admin: 'Quản Trị Viên', cannot_revoke_self: 'Không thể sửa Admin chính' },
    uploader: { label: 'Hình Ảnh', paste: 'Dán Link', upload: 'Tải Ảnh Lên', select: 'Nhấn để chọn ảnh từ thiết bị', preview: 'Xem Trước Hiện Tại' }
  }
};