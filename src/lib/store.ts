import { SubscriptionBox, CatalogProduct, BookItem, ReaderPreferenceSubmission, CartItem, WishlistItem } from './types';

export const INITIAL_BOXES: SubscriptionBox[] = [
  {
    id: 'box-standard',
    nameEn: 'The Standard Cozy Box',
    nameHy: 'Ստանդարտ Ջերմ Տուփ',
    badgeEn: 'Essential Comfort',
    badgeHy: 'Հիմնական Ջերմություն',
    priceUSD: 34.99,
    priceAMD: 14000,
    itemCount: 5,
    descriptionEn: 'A delightful monthly box featuring a specially curated novel, a hand-poured soy candle, a handcrafted bookmark, and cozy tea.',
    descriptionHy: 'Հաճելի ամսական տուփ ընտրված վեպով, ձեռագործ սոյայի մոմով, գեղեցիկ էջանիշով և բուրավետ թեյով:',
    itemsEn: [
      '1 Curated Novel (Based on your preference quiz)',
      '1 Hand-Poured Soy Wax Candle (Cozy Vanilla & Amber)',
      '1 Handcrafted Fabric Bookmark',
      '1 Organic Herbal Tea Blend Sample',
      '1 Curated Bookmark Quote & Sticker Set'
    ],
    itemsHy: [
      '1 Ընտրված վեպ (ըստ Ձեր հարցաշարի նախասիրությունների)',
      '1 Ձեռագործ սոյայի մոմ (Վանիլ և Ամբրային բույր)',
      '1 Ձեռագործ կտորե էջանիշ',
      '1 Օրգանիկ խոտաբուսային թեյի նմուշ',
      '1 Գրական ցիտատով էջանիշների և ստիկերների հավաքածու'
    ],
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'box-deluxe',
    nameEn: 'The Deluxe Sanctuary Box',
    nameHy: 'Դելյուքս Սրբարան Տուփ',
    badgeEn: 'Best Value & Deluxe Items',
    badgeHy: 'Առավելագույն Արժեք և Նվերներ',
    priceUSD: 38.99,
    priceAMD: 15500,
    itemCount: 7,
    descriptionEn: 'Our flagship box with maximum cozy items! Includes extra books or hardcover edition, wooden bookmark, ceramic mug/tote, and gourmet treats.',
    descriptionHy: 'Մեր լավագույն տուփը առավելագույն նվերներով: Ներառում է լրացուցիչ գիրք կամ կոշտ կազմով հրատարակություն, փայտյա էջանիշ, խեցեգործ բաժակ և քաղցրավենիք:',
    itemsEn: [
      '2 Curated Novels (or 1 Hardcover Special Edition)',
      '1 Hand-Carved Wooden Bookmark',
      '1 Premium Soy Candle with Crackling Wood Wick (8 oz)',
      '1 Handmade Ceramic Mug or Canvas Book Tote',
      '1 Literary Fine Art Print',
      '1 Gourmet Artisanal Treat / Sweets Set',
      '1 Monthly Reading Journal & Sticker Sheet'
    ],
    itemsHy: [
      '2 Ընտրված վեպ (կամ 1 կոշտ կազմով հատուկ հրատարակություն)',
      '1 Ձեռագործ փայտյա փորագրված էջանիշ',
      '1 Պրեմիում սոյայի մոմ փայտյա պատրույգով (8 oz)',
      '1 Ձեռագործ խեցեգործ բաժակ կամ կտորե պայուսակ',
      '1 Գրական արվեստի տպագրություն',
      '1 Գուրմե քաղցրավենիքի հավաքածու',
      '1 Ամսական ընթերցանության օրագիր և ստիկերներ'
    ],
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  }
];

export const INITIAL_BOOKS: BookItem[] = [
  {
    id: 'book-1',
    titleEn: 'The Forty Days of Musa Dagh',
    titleHy: 'Մուսա Լեռան Քառասուն Օրը',
    authorEn: 'Franz Werfel',
    authorHy: 'Ֆրանց Վերֆել',
    genreEn: 'Historical Fiction',
    genreHy: 'Պատմավեպ',
    priceUSD: 18.99,
    priceAMD: 7500,
    descriptionEn: 'An epic classic telling the heroic defense of Musa Dagh.',
    descriptionHy: 'Հերոսական դիմանկար Մուսա լեռան ինքնապաշտպանության մասին:',
    inStock: true,
    badgeEn: 'Bestseller',
    badgeHy: 'Բեսթսելեր',
    coverColor: 'bg-rose-100 border-rose-300 text-rose-900',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'book-2',
    titleEn: 'Samvel (Historical Novel)',
    titleHy: 'Սամվել',
    authorEn: 'Raffi',
    authorHy: 'Րաֆֆի',
    genreEn: 'Armenian Classics',
    genreHy: 'Հայ Դասական',
    priceUSD: 16.99,
    priceAMD: 6800,
    descriptionEn: 'The legendary 4th-century Armenian historical masterpiece.',
    descriptionHy: '4-րդ դարի Հայաստանի պատմական հզոր վեպը:',
    inStock: true,
    badgeEn: 'Armenian Heritage',
    badgeHy: 'Հայկական Ժառանգություն',
    coverColor: 'bg-amber-100 border-amber-300 text-amber-900',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'book-3',
    titleEn: 'The Little Prince',
    titleHy: 'Փոքրիկ Իշխանը',
    authorEn: 'Antoine de Saint-Exupéry',
    authorHy: 'Անտուան դը Սենտ-Էկզյուպերի',
    genreEn: 'Fable & Classics',
    genreHy: 'Դասական Առակ',
    priceUSD: 12.99,
    priceAMD: 5200,
    descriptionEn: 'A timeless story of love, friendship, and innocence.',
    descriptionHy: 'Սիրո, բարեկամության և անմեղության անմահ պատմությունը:',
    inStock: true,
    badgeEn: 'Illustrated',
    badgeHy: 'Նկարազարդ',
    coverColor: 'bg-blue-100 border-blue-300 text-blue-900',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'book-4',
    titleEn: 'Armenian Legends & Poems',
    titleHy: 'Հայկական Առասպելներ և Պոեզիա',
    authorEn: 'Zabelle C. Boyajian',
    authorHy: 'Զաբել Պոյաջյան',
    genreEn: 'Poetry & Folktales',
    genreHy: 'Պոեզիա և Հեքիաթներ',
    priceUSD: 19.99,
    priceAMD: 8000,
    descriptionEn: 'A rich anthology of ancient Armenian folklore and poetry.',
    descriptionHy: 'Հայկական հին բանահյուսության և պոեզիայի հարուստ ժողովածու:',
    inStock: true,
    badgeEn: 'Hardcover',
    badgeHy: 'Կոշտ Կազմով',
    coverColor: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'book-5',
    titleEn: '1984',
    titleHy: '1984',
    authorEn: 'George Orwell',
    authorHy: 'Ջորջ Օրուել',
    genreEn: 'Dystopian Sci-Fi',
    genreHy: 'Գիտական Ֆանտաստիկա',
    priceUSD: 14.99,
    priceAMD: 6000,
    descriptionEn: 'The profound dystopian masterpiece on freedom and truth.',
    descriptionHy: 'Ազատության և ճշմարտության մասին անմահ վեպը:',
    inStock: true,
    coverColor: 'bg-purple-100 border-purple-300 text-purple-900',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'book-6',
    titleEn: 'Pride and Prejudice',
    titleHy: 'Հպարտություն և Նախապաշարում',
    authorEn: 'Jane Austen',
    authorHy: 'Ջեյն Օստին',
    genreEn: 'Romance & Classics',
    genreHy: 'Ռոմանտիկ Դասականներ',
    priceUSD: 13.99,
    priceAMD: 5600,
    descriptionEn: 'The beloved classic romance that defined a genre.',
    descriptionHy: 'Ժանրը ձևավորած սիրված դասական ռոման:',
    inStock: true,
    badgeEn: 'Classic',
    badgeHy: 'Դասական',
    coverColor: 'bg-pink-100 border-pink-300 text-pink-900',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  },
];

export const INITIAL_PRODUCTS: CatalogProduct[] = [
  {
    id: 'prod-candle',
    nameEn: 'Hand-Poured Soy Candle (Old Library)',
    nameHy: 'Ձեռագործ սոյայի մոմ (Հին Գրադարան)',
    categoryEn: 'Candles',
    categoryHy: 'Մոմեր',
    descriptionEn: 'Notes of mahogany, antique paper, and cozy vanilla.',
    descriptionHy: 'Մահոգանի, հին թղթի և վանիլի ջերմ բույրով:',
    priceUSD: 14.99,
    priceAMD: 6000,
    inStock: true,
    iconName: 'Flame',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-bookmark',
    nameEn: 'Carved Pomegranate Wooden Bookmark',
    nameHy: 'Փորագրված Նռան Փայտյա Էջանիշ',
    categoryEn: 'Bookmarks',
    categoryHy: 'Էջանիշեր',
    descriptionEn: 'Hand-carved walnut wood featuring traditional Armenian pomegranate motif.',
    descriptionHy: 'Ընկուզենու փայտից ձեռագործ էջանիշ՝ հայկական նռան մոտիվներով:',
    priceUSD: 9.99,
    priceAMD: 4000,
    inStock: true,
    iconName: 'Bookmark',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-sleeve',
    nameEn: 'Pastel Linen Book Sleeve',
    nameHy: 'Պաստելային կտավե գրքի պատյան',
    categoryEn: 'Accessories',
    categoryHy: 'Աքսեսուարներ',
    descriptionEn: 'Padded protective sleeve in soft blush pink for keeping books safe in your bag.',
    descriptionHy: 'Փափուկ պաշտպանիչ պատյան՝ գրքերը պայուսակում ապահով պահելու համար:',
    priceUSD: 16.99,
    priceAMD: 6800,
    inStock: true,
    iconName: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-tea',
    nameEn: 'Armenian Mountain Thyme Tea',
    nameHy: 'Հայկական Լեռնային Ուրցով Թեյ',
    categoryEn: 'Tea & Treats',
    categoryHy: 'Թեյ և Քաղցրավենիք',
    descriptionEn: 'Wild harvested herbs from the mountains of Tavush.',
    descriptionHy: 'Տավուշի լեռներից հավաքված վայրի ուրցով բուրավետ թեյ:',
    priceUSD: 7.99,
    priceAMD: 3200,
    inStock: true,
    iconName: 'Coffee',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
  }
];

export const INITIAL_SUBMISSIONS: ReaderPreferenceSubmission[] = [];

// LocalStorage Keys
const BOXES_STORAGE_KEY = 'girqbox_boxes_v2';
const BOOKS_STORAGE_KEY = 'girqbox_standalone_books_v2';
const PRODUCTS_STORAGE_KEY = 'girqbox_products_v2';
const SUBMISSIONS_STORAGE_KEY = 'girqbox_submissions_v2';
const CART_STORAGE_KEY = 'girqbox_cart_v1';
const WISHLIST_STORAGE_KEY = 'girqbox_wishlist_v1';
const WELCOME_SHOWN_KEY = 'girqbox_welcome_shown';
const SUBSCRIBED_EMAIL_KEY = 'girqbox_subscribed_email';

// ---- Boxes ----
export function getStoredBoxes(): SubscriptionBox[] {
  if (typeof window === 'undefined') return INITIAL_BOXES;
  try {
    const data = localStorage.getItem(BOXES_STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_BOXES;
  } catch { return INITIAL_BOXES; }
}
export function saveStoredBoxes(boxes: SubscriptionBox[]) {
  if (typeof window !== 'undefined') localStorage.setItem(BOXES_STORAGE_KEY, JSON.stringify(boxes));
}

// ---- Books ----
export function getStoredStandaloneBooks(): BookItem[] {
  if (typeof window === 'undefined') return INITIAL_BOOKS;
  try {
    const data = localStorage.getItem(BOOKS_STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_BOOKS;
  } catch { return INITIAL_BOOKS; }
}
export function saveStoredStandaloneBooks(books: BookItem[]) {
  if (typeof window !== 'undefined') localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
}

// ---- Products ----
export function getStoredProducts(): CatalogProduct[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  try {
    const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_PRODUCTS;
  } catch { return INITIAL_PRODUCTS; }
}
export function saveStoredProducts(products: CatalogProduct[]) {
  if (typeof window !== 'undefined') localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
}

// ---- Submissions ----
export function getStoredSubmissions(): ReaderPreferenceSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
    if (!data) return [];
    const parsed: ReaderPreferenceSubmission[] = JSON.parse(data);
    // Filter out initial fake demo submissions (sub-101, sub-102)
    return parsed.filter((s) => s.id !== 'sub-101' && s.id !== 'sub-102');
  } catch { return []; }
}
export function saveStoredSubmissions(submissions: ReaderPreferenceSubmission[]) {
  if (typeof window !== 'undefined') localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions));
}

// ---- Cart ----
export function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}
export function saveStoredCart(cart: CartItem[]) {
  if (typeof window !== 'undefined') localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// ---- Wishlist ----
export function getStoredWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}
export function saveStoredWishlist(wishlist: WishlistItem[]) {
  if (typeof window !== 'undefined') localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
}

// ---- Welcome Popup ----
export function hasSeenWelcome(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(WELCOME_SHOWN_KEY) === 'true';
}
export function markWelcomeSeen() {
  if (typeof window !== 'undefined') localStorage.setItem(WELCOME_SHOWN_KEY, 'true');
}
export function saveSubscribedEmail(email: string) {
  if (typeof window !== 'undefined') localStorage.setItem(SUBSCRIBED_EMAIL_KEY, email);
}

// ---- Reset All ----
export function resetAllDataToDefault() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(BOXES_STORAGE_KEY);
    localStorage.removeItem(BOOKS_STORAGE_KEY);
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    localStorage.removeItem(SUBMISSIONS_STORAGE_KEY);
  }
}
