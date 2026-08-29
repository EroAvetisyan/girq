import { Language, GenreOption, VibeOption } from './types';

export const GENRE_OPTIONS: GenreOption[] = [
  { id: 'fiction', nameEn: 'Fiction & Novels', nameHy: 'Գեղարվեստական վեպեր' },
  { id: 'armenian', nameEn: 'Armenian History & Lit', nameHy: 'Հայոց պատմություն և գրականություն' },
  { id: 'fantasy', nameEn: 'Fantasy & Magic', nameHy: 'Ֆենթեզի և մոգություն' },
  { id: 'mystery', nameEn: 'Mystery & Thriller', nameHy: 'Դետեկտիվ և թրիլեր' },
  { id: 'romance', nameEn: 'Romance & Heartwarming', nameHy: 'Ռոմանտիկա և ջերմ պատմություններ' },
  { id: 'scifi', nameEn: 'Sci-Fi & Dystopian', nameHy: 'Գիտական ֆանտաստիկա' },
  { id: 'poetry', nameEn: 'Poetry & Classics', nameHy: 'Պոեզիա և դասականներ' },
  { id: 'nonfiction', nameEn: 'Non-Fiction & Philosophy', nameHy: 'Ոչ գեղարվեստական և փիլիսոփայություն' },
];

export const VIBE_OPTIONS: VibeOption[] = [
  { id: 'cozy', nameEn: 'Cozy & Soft', nameHy: 'Ջերմ և նուրբ' },
  { id: 'dark', nameEn: 'Dark Academia', nameHy: 'Մութ ակադեմիական' },
  { id: 'uplifting', nameEn: 'Uplifting & Inspiring', nameHy: 'Ոգեշնչող և բարձր տրամադրություն' },
  { id: 'mindful', nameEn: 'Deep & Mindful', nameHy: 'Խորհրդավոր և իմաստալից' },
];

export const dictionary = {
  en: {
    // Header & Nav (Concise labels for navigation bar)
    brandName: 'GirqBox',
    tagline: 'Cozy Book Subscriptions for Armenia & America',
    navBoxes: 'Boxes',
    navStore: 'Books',
    navQuiz: 'Quiz',
    navTrack: 'Track',
    navAbout: 'About',
    navAdmin: 'Admin Access',
    navCatalog: 'Add-Ons & Goods',
    switchLang: 'Հայերեն',
    
    // Hero
    heroTitle: 'A Soft & Gentle Bookish Surprise Delivered to Your Door',
    heroSubtitle: 'Every month, we curate lovely boxes with handcrafted books, scented candles, artisanal bookmarks, and cozy delights. Tailored for readers in Armenia and the USA.',
    heroCta: 'Choose Your Box',
    heroQuizCta: 'Fill Reading Quiz',
    deliveryBanner: '✈️ Worldwide Shipping to 🇦🇲 Armenia & 🇺🇸 USA',

    // Subscription Boxes Section
    boxesSectionTitle: 'Curated Subscription Boxes',
    boxesSectionSubtitle: 'Two thoughtfully balanced sets packed with warmth, stories, and cozy aesthetic goods. Prices designed to be accessible for both regions.',
    pricePerMonth: '/ month',
    subscribeBtn: 'Subscribe to Box',
    itemsIncludedLabel: 'What is inside this box:',
    popularBadge: 'Most Popular',

    // Preference Form / Quiz
    quizTitle: 'Personalize Your Reading Box',
    quizSubtitle: 'Tell us what you love to read, your favorite genres, and books you already own so we never send a duplicate!',
    step1: '1. Select Your Box & Country',
    step2: '2. Literary Preferences & Vibe',
    step3: '3. Books You Already Own (Avoid Duplicates)',
    step4: '4. Delivery Information',
    
    labelFullName: 'Full Name',
    labelEmail: 'Email Address',
    labelCountry: 'Shipping Country',
    labelAddress: 'Full Shipping Address',
    labelSelectBox: 'Selected Subscription Box',
    labelGenres: 'Select Preferred Genres',
    labelVibe: 'Reading Vibe / Mood',
    labelBookLang: 'Preferred Book Language',
    labelOwnedBooks: 'Books You Already Own',
    ownedBooksPlaceholder: 'Type a book title & author, then press Enter (e.g. "1984 by George Orwell", "The Little Prince")',
    ownedBooksHelp: 'We check this list before every shipment so you never get a book you already have!',
    labelNotes: 'Special Wishes or Favorites (Optional)',
    submitQuizBtn: 'Save Preferences & Order Subscription',
    quizSuccessTitle: 'Thank You for Your Subscription Request!',
    quizSuccessMessage: 'We have recorded your reading preferences and owned books list. Our curating team will craft your personalized box with care.',

    // Admin Security & Panel
    adminTitle: 'GirqBox Administration Panel',
    adminSubtitle: 'Private Dashboard for order processing, subscriber wishlist reviews, and catalog edits.',
    backToStore: 'Back to Storefront',
    
    tabOverview: 'Dashboard Overview',
    tabSubscribers: 'Orders & Subscribers',
    tabBooks: 'Standalone Book Store',
    tabProducts: 'Add-Ons & Accessories',
    tabBoxes: 'Subscription Box Tiers',
    
    statActiveSubscribers: 'Total Active Subscribers',
    statTotalRevenue: 'Estimated Monthly Revenue',
    statPendingOrders: 'Pending Shipments',
    statCatalogItems: 'Standalone Book Titles',
    recentOrdersTitle: 'Recent Customer Orders & Preferences',
    viewAllOrders: 'View All Orders →',

    searchPlaceholder: 'Search by customer name, email, address...',
    searchBookPlaceholder: 'Search by title or author...',
    allCountries: 'All Shipping Countries',
    allStatuses: 'All Order Statuses',
    
    addBookBtn: '+ Add New Book Title',
    addBoxBtn: '+ Create Subscription Box',
    addProductBtn: '+ Add New Accessory',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    saveBtn: 'Save Changes',
    cancelBtn: 'Cancel',
    confirmDelete: 'Are you sure you want to delete this item?',
    
    fieldBoxNameEn: 'Box Name (English)',
    fieldBoxNameHy: 'Box Name (Armenian)',
    fieldPriceUSD: 'Price ($ USD)',
    fieldPriceAMD: 'Price (֏ AMD)',
    fieldDescEn: 'Description (English)',
    fieldDescHy: 'Description (Armenian)',
    fieldItemsEn: 'Items included (one per line, English)',
    fieldItemsHy: 'Items included (one per line, Armenian)',

    fieldProductNameEn: 'Item Name (English)',
    fieldProductNameHy: 'Item Name (Armenian)',
    fieldCategoryEn: 'Category (English)',
    fieldCategoryHy: 'Category (Armenian)',
    
    subscribersCount: 'Total Active Preference Profiles',
    noSubscribersYet: 'No subscriber requests yet. Submit a test form from the homepage!',
    ownedBooksList: 'Already Owned Books (Do Not Send Duplicate!):',
    genresList: 'Preferred Genres:',
    vibeLabel: 'Vibe:',
    languageLabel: 'Book Language:',
    resetDemoData: 'Reset Demo Data',

    // How It Works
    howItWorksTitle: 'How GirqBox Works',
    step1Title: 'Select Your Tier',
    step1Desc: 'Pick between our Standard Cozy Box or Deluxe Sanctuary Box.',
    step2Title: 'Tell Us Your Tastes',
    step2Desc: 'Fill out our preference quiz and list books you already own.',
    step3Title: 'We Curate & Pack',
    step3Desc: 'We select a fresh book, hand pour candles, and pack your aesthetic goodies.',
    step4Title: 'Delivered With Love',
    step4Desc: 'Fast shipping directly to your home in Armenia or the United States.',

    // Footer
    footerAbout: 'GirqBox brings gentle bookish joy, handcrafted Armenian candles, artisan bookmarks, and handpicked literature straight to your doorstep in Yerevan, Los Angeles, and beyond.',
    allRightsReserved: 'All rights reserved.',
  },
  hy: {
    // Header & Nav (Concise labels that never overflow header)
    brandName: 'ԳիրքBox',
    tagline: 'Ջերմ գրքային բաժանորդագրություն Հայաստանի և ԱՄՆ-ի համար',
    navBoxes: 'Տուփեր',
    navStore: 'Գրքեր',
    navQuiz: 'Հարցաշար',
    navTrack: 'Հետևել',
    navAbout: 'Մեր մասին',
    navAdmin: 'Ադմին Մուտք',
    navCatalog: 'Ապրանքատեսականի',
    switchLang: 'English',

    // Hero
    heroTitle: 'Նուրբ և ջերմ գրքային անակնկալ՝ ուղիղ Ձեր դռան մոտ',
    heroSubtitle: 'Ամեն ամիս մենք սիրով պատրաստում ենք տուփեր ընտրված գրքերով, բուրավետ մոմերով, ձեռագործ էջանիշերով և հաճելի անակնկալներով: Հատուկ Հայաստանի և ԱՄՆ-ի ընթերցասերների համար:',
    heroCta: 'Ընտրել տուփը',
    heroQuizCta: 'Լրացնել հարցաշարը',
    deliveryBanner: '✈️ Առաքում ամբողջ 🇦🇲 Հայաստանում և 🇺🇸 ԱՄՆ-ում',

    // Subscription Boxes Section
    boxesSectionTitle: 'Բաժանորդագրության Տուփեր',
    boxesSectionSubtitle: 'Երկու խնամքով մշակված հավաքածու՝ լցված ջերմությամբ, պատմություններով և գեղեցիկ աքսեսուարներով: Գները հավասարակշռված են երկու երկրների համար:',
    pricePerMonth: '/ ամիս',
    subscribeBtn: 'Բաժանորդագրվել',
    itemsIncludedLabel: 'Ինչ կա տուփի ներսում.',
    popularBadge: 'Ամենանախընտրելի',

    // Preference Form / Quiz
    quizTitle: 'Անհատականացրեք Ձեր Գրքային Տուփը',
    quizSubtitle: 'Պատմեք մեզ, թե ինչ ժանրեր եք սիրում և նշեք այն գրքերը, որոնք արդեն ունեք, որպեսզի կրկնօրինակ չուղարկենք:',
    step1: '1. Ընտրեք տուփը և երկիրը',
    step2: '2. Գրական նախասիրություններ',
    step3: '3. Գրքեր, որոնք արդեն ունեք (կրկնօրինակումից խուսափելու համար)',
    step4: '4. Առաքման տվյալներ',

    labelFullName: 'Անուն Ազգանուն',
    labelEmail: 'Էլ. փոստ',
    labelCountry: 'Առաքման երկիր',
    labelAddress: 'Առաքման հասցե',
    labelSelectBox: 'Ընտրված տուփը',
    labelGenres: 'Ընտրեք նախընտրելի ժանրերը',
    labelVibe: 'Ընթերցանության տրամադրություն / Vibe',
    labelBookLang: 'Գրքերի նախընտրելի լեզուն',
    labelOwnedBooks: 'Գրքեր, որոնք ես արդեն ունեմ',
    ownedBooksPlaceholder: 'Գրեք գրքի վերնագիրը և հեղինակին, ապա սեղմեք Enter (օր. "1984", "Փոքրիկ իշխանը")',
    ownedBooksHelp: 'Մենք ստուգում ենք այս ցանկը ամեն առաքումից առաջ, որպեսզի երբեք չստանաք Ձեր ունեցած գիրքը:',
    labelNotes: 'Հատուկ ցանկություններ (ըստ ցանկության)',
    submitQuizBtn: 'Պահպանել նախասիրությունները և պատվիրել',
    quizSuccessTitle: 'Շնորհակալություն պատվերի համար!',
    quizSuccessMessage: 'Մենք պահպանել ենք Ձեր նախասիրությունները և ունեցած գրքերի ցանկը: Մեր թիմը մեծ սիրով կհավաքի Ձեր անհատական տուփը:',

    // Admin Security & Panel
    adminTitle: 'ԳիրքBox Ադմինիստրատիվ Պանել',
    adminSubtitle: 'Ղեկավարման համակարգ պատվերների, բաժանորդների և ապրանքների համար:',
    backToStore: 'Վերադառնալ Խանութ',

    tabOverview: 'Վիճակագրություն',
    tabSubscribers: 'Պատվերներ և Բաժանորդներ',
    tabBooks: 'Գրքերի Կատալոգ',
    tabProducts: 'Աքսեսուարներ',
    tabBoxes: 'Տուփերի Տեսականի',

    statActiveSubscribers: 'Ակտիվ Բաժանորդներ',
    statTotalRevenue: 'Ամսական Եկամուտ',
    statPendingOrders: 'Սպասող Առաքումներ',
    statCatalogItems: 'Առանձին Գրքեր',
    recentOrdersTitle: 'Վերջին Պատվերները և Նախասիրությունները',
    viewAllOrders: 'Դիտել Բոլորը →',

    searchPlaceholder: 'Փնտրել ըստ անվան, էլ. փոստի, հասցեի...',
    searchBookPlaceholder: 'Փնտրել վերնագիր կամ հեղինակ...',
    allCountries: 'Բոլոր Երկրները',
    allStatuses: 'Բոլոր Կարգավիճակները',

    addBookBtn: '+ Ավելացնել Նոր Գիրք',
    addBoxBtn: '+ Ավելացնել Տուփ',
    addProductBtn: '+ Ավելացնել Ապրանք',
    editBtn: 'Խմբագրել',
    deleteBtn: 'Ջնջել',
    saveBtn: 'Պահպանել',
    cancelBtn: 'Չեղարկել',
    confirmDelete: 'Վստա՞հ եք, որ ցանկանում եք ջնջել այս ապրանքը:',

    fieldBoxNameEn: 'Տուփի անվանումը (Անգլերեն)',
    fieldBoxNameHy: 'Տուփի անվանումը (Հայերեն)',
    fieldPriceUSD: 'Գինը ($ USD)',
    fieldPriceAMD: 'Գինը (֏ AMD)',
    fieldDescEn: 'Նկարագրություն (Անգլերեն)',
    fieldDescHy: 'Նկարագրություն (Հայերեն)',
    fieldItemsEn: 'Ներառված ներդիրներ (ամեն տողում մեկը, Անգլերեն)',
    fieldItemsHy: 'Ներառված ներդիրներ (ամեն տողում մեկը, Հայերեն)',

    fieldProductNameEn: 'Ապրանքի անվանումը (Անգլերեն)',
    fieldProductNameHy: 'Ապրանքի անվանումը (Հայերեն)',
    fieldCategoryEn: 'Կատեգորիա (Անգլերեն)',
    fieldCategoryHy: 'Կատեգորիա (Հայերեն)',

    subscribersCount: 'Ընդհանուր ակտիվ բաժանորդներ',
    noSubscribersYet: 'Դեռևս հարցումներ չկան: Լրացրեք փորձնական ձևաչափը գլխավոր էջում:',
    ownedBooksList: 'Արդեն ունեցած գրքեր (կրկնօրինակ չուղարկել!):',
    genresList: 'Նախընտրելի ժանրեր.',
    vibeLabel: 'Տրամադրություն.',
    languageLabel: 'Գրքի լեզուն.',
    resetDemoData: 'Վերականգնել տվյալները',

    // How It Works
    howItWorksTitle: 'Ինչպես է աշխատում ԳիրքBox-ը',
    step1Title: 'Ընտրեք Ձեր տուփը',
    step1Desc: 'Ընտրեք Standard Cozy Box-ի կամ Deluxe Sanctuary Box-ի միջև:',
    step2Title: 'Նշեք Ձեր ճաշակը',
    step2Desc: 'Լրացրեք հարցաշարը և նշեք Ձեր ունեցած գրքերը:',
    step3Title: 'Մենք հավաքում ենք',
    step3Desc: 'Ընտրում ենք թարմ գիրք, պատրաստում բուրավետ մոմեր և փաթեթավորում:',
    step4Title: 'Առաքում սիրով',
    step4Desc: 'Արագ առաքում ուղիղ Ձեր հասցեով՝ Հայաստանում կամ ԱՄՆ-ում:',

    // Footer
    footerAbout: 'ԳիրքBox-ը բերում է գրքային ջերմություն, հայկական ձեռագործ մոմեր, էջանիշեր և ընտրված գրականություն ուղիղ Ձեր տուն՝ Երևանում, Լոս Անջելեսում և այլուր:',
    allRightsReserved: 'Բոլոր իրավունքները պաշտպանված են:',
  }
};

export function getTranslation(lang: Language, key: keyof typeof dictionary['en']): string {
  const langDict = dictionary[lang] || dictionary.en;
  return langDict[key] || dictionary.en[key] || key;
}
