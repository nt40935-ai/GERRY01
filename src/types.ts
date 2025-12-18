
export enum ProductCategory {
  SIGNATURE = 'Signature',
  HOT_COFFEE = 'Hot Coffee',
  ICED_COFFEE = 'Iced Coffee',
  FRUIT_TEA = 'Fruit Tea',
  MILK_TEA = 'Milk Tea',
  MACCHIATO = 'Macchiato',
  ICE_BLENDED = 'Ice Blended',
  MATCHA = 'Matcha',
  BEANS = 'Beans',
  PASTRY = 'Pastry',
  TOPPING = 'Topping',
  PROMOTION = 'Promotion',
}

export interface Category {
  id: string;
  name: string; // The display name (e.g. "Cà Phê Đá")
  key: string; // The internal key (e.g. "Iced Coffee")
}

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string; // Changed from ProductCategory enum to string to support dynamic categories
  image: string;
  rating: number;
  reviewCount?: number;
  isAvailable?: boolean; // NEW: Track stock status
  isBestSeller?: boolean; // NEW: Best seller badge
  isFeatured?: boolean; // NEW: Featured/Try now badge
}

export type ProductSize = 'M' | 'L';

export interface CartItem extends Product {
  quantity: number;
  size?: ProductSize;
  toppings?: Topping[]; // NEW: Selected toppings
  note?: string; // Item-specific note
  originalId?: string; 
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface PartnershipPillar {
  icon: string; // lucide icon key
  title: string;
  desc: string;
}

export interface PartnershipCopy {
  badge: string;
  title: string;
  subtitle: string;
  tags: string[];
  imageUrl: string;
  contactNote: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  chatLink?: string;
  pillars: PartnershipPillar[];
}

export interface PartnershipContent {
  vi: PartnershipCopy;
  en: PartnershipCopy;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Ready' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  userId?: string; 
  customerName: string;
  total: number;
  status: OrderStatus;
  date: string;
  itemsCount: number;
  items: CartItem[];
  address?: string;
  paymentMethod?: string;
  note?: string; // NEW: General order note
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  linkSection: string;
  isActive: boolean;
  endsAt?: string; 
}

export type DiscountType = 'percent' | 'fixed';

export interface DiscountCode {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  startDate: string;
  endDate: string;
  applicableProductIds: string[]; 
  isActive: boolean;
}

export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: UserRole;
  avatar?: string;
  // Loyalty program
  loyaltyPoints?: number; // total accumulated points
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
}

export interface BrandSettings {
  logoUrl: string;
  brandName: string;
  assistantAvatar?: string;
  storeAddress: string;
  contactPhone: string;
  contactEmail: string;
  googleMapsEmbedUrl: string;
  // Loyalty settings (admin configurable)
  loyaltyBronzeMin?: number;
  loyaltySilverMin?: number;
  loyaltyGoldMin?: number;
  loyaltyDiamondMin?: number;
}

export type Language = 'en' | 'vi';

// Recruitment
export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  isActive: boolean;
}

export interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience?: string;
  note?: string;
  cvFileName?: string;
  cvFileData?: string; // base64 data url for download/view
  submittedAt: string;
}
