export type Language = 'en' | 'hy';
export type Currency = 'USD' | 'AMD';

export interface SubscriptionBox {
  id: string;
  nameEn: string;
  nameHy: string;
  badgeEn?: string;
  badgeHy?: string;
  priceUSD: number;
  priceAMD: number;
  descriptionEn: string;
  descriptionHy: string;
  itemsEn: string[];
  itemsHy: string[];
  itemCount: number;
  isPopular?: boolean;
  image?: string;
}

export interface CatalogProduct {
  id: string;
  nameEn: string;
  nameHy: string;
  categoryEn: string;
  categoryHy: string;
  descriptionEn: string;
  descriptionHy: string;
  priceUSD: number;
  priceAMD: number;
  inStock: boolean;
  iconName: string;
  image?: string;
}

export interface BookItem {
  id: string;
  titleEn: string;
  titleHy: string;
  authorEn: string;
  authorHy: string;
  genreEn: string;
  genreHy: string;
  priceUSD: number;
  priceAMD: number;
  descriptionEn: string;
  descriptionHy: string;
  inStock: boolean;
  badgeEn?: string;
  badgeHy?: string;
  coverColor?: string;
  image?: string;
}

export type OrderStatus = 'Pending' | 'Curating' | 'Shipped' | 'Delivered';

export interface ReaderPreferenceSubmission {
  id: string;
  customerName: string;
  email: string;
  country: 'Armenia' | 'USA';
  address: string;
  selectedBoxId: string;
  genres: string[];
  readingVibe: string;
  bookLanguage: 'English' | 'Armenian' | 'Both';
  ownedBooks: string[];
  notes?: string;
  createdAt: string;
  status: OrderStatus;
}

export interface GenreOption {
  id: string;
  nameEn: string;
  nameHy: string;
}

export interface VibeOption {
  id: string;
  nameEn: string;
  nameHy: string;
}

export interface CartItem {
  id: string;
  type: 'book' | 'product' | 'box';
  nameEn: string;
  nameHy: string;
  priceUSD: number;
  priceAMD: number;
  quantity: number;
  image?: string;
}

export interface WishlistItem {
  id: string;
  type: 'book' | 'product';
  nameEn: string;
  nameHy: string;
  priceUSD: number;
  priceAMD: number;
  image?: string;
}
