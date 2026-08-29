'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Language,
  SubscriptionBox,
  CatalogProduct,
  BookItem,
  ReaderPreferenceSubmission,
  OrderStatus
} from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import {
  getStoredBoxes,
  saveStoredBoxes,
  getStoredProducts,
  saveStoredProducts,
  getStoredStandaloneBooks,
  saveStoredStandaloneBooks,
  getStoredSubmissions,
  saveStoredSubmissions,
  resetAllDataToDefault,
  INITIAL_BOXES,
  INITIAL_PRODUCTS,
  INITIAL_BOOKS,
  INITIAL_SUBMISSIONS
} from '@/lib/store';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ShoppingBag,
  Package,
  Plus,
  Trash2,
  Edit2,
  Search,
  RotateCcw,
  ArrowLeft,
  DollarSign,
  Clock,
  Globe,
  AlertTriangle,
  X,
  Image as ImageIcon
} from 'lucide-react';

interface ConfirmDialogState {
  isOpen: boolean;
  titleEn: string;
  titleHy: string;
  messageEn: string;
  messageHy: string;
  confirmLabelEn?: string;
  confirmLabelHy?: string;
  onConfirm: () => void;
}

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  // Dynamic Stores initialized with static presets
  const [boxes, setBoxes] = useState<SubscriptionBox[]>(INITIAL_BOXES);
  const [books, setBooks] = useState<BookItem[]>(INITIAL_BOOKS);
  const [products, setProducts] = useState<CatalogProduct[]>(INITIAL_PRODUCTS);
  const [submissions, setSubmissions] = useState<ReaderPreferenceSubmission[]>(INITIAL_SUBMISSIONS);

  // Active Sidebar Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'books' | 'products' | 'boxes'>('overview');

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');

  // Modals State
  const [editingBox, setEditingBox] = useState<SubscriptionBox | null>(null);
  const [isCreatingBox, setIsCreatingBox] = useState(false);

  const [editingBook, setEditingBook] = useState<BookItem | null>(null);
  const [isCreatingBook, setIsCreatingBook] = useState(false);

  const [editingProduct, setEditingProduct] = useState<CatalogProduct | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // In-App Confirmation Modal State (No native browser alerts/confirms!)
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    titleEn: '',
    titleHy: '',
    messageEn: '',
    messageHy: '',
    onConfirm: () => {},
  });

  // Hydrate Store on Client after mount
  useEffect(() => {
    setMounted(true);
    setBoxes(getStoredBoxes());
    setBooks(getStoredStandaloneBooks());
    setProducts(getStoredProducts());
    setSubmissions(getStoredSubmissions());
  }, []);

  // --- Handlers ---
  const handleSaveBox = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBox) return;
    const exists = boxes.some((b) => b.id === editingBox.id);
    const next = exists
      ? boxes.map((b) => (b.id === editingBox.id ? editingBox : b))
      : [...boxes, editingBox];
    setBoxes(next);
    saveStoredBoxes(next);
    setEditingBox(null);
  };

  const requestDeleteBox = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      titleEn: 'Delete Subscription Box?',
      titleHy: 'Ջնջե՞լ Տուփը:',
      messageEn: `Are you sure you want to delete the box "${name}"? This action cannot be undone.`,
      messageHy: `Վստա՞հ եք, որ ցանկանում եք ջնջել «${name}» տուփը:`,
      confirmLabelEn: 'Delete Box',
      confirmLabelHy: 'Ջնջել Տուփը',
      onConfirm: () => {
        const next = boxes.filter((b) => b.id !== id);
        setBoxes(next);
        saveStoredBoxes(next);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;
    const exists = books.some((b) => b.id === editingBook.id);
    const next = exists
      ? books.map((b) => (b.id === editingBook.id ? editingBook : b))
      : [...books, editingBook];
    setBooks(next);
    saveStoredStandaloneBooks(next);
    setEditingBook(null);
  };

  const requestDeleteBook = (id: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      titleEn: 'Delete Book Title?',
      titleHy: 'Ջնջե՞լ Գիրքը:',
      messageEn: `Are you sure you want to delete "${title}" from the store catalog?`,
      messageHy: `Վստա՞հ եք, որ ցանկանում եք ջնջել «${title}» գիրքը կատալոգից:`,
      confirmLabelEn: 'Delete Book',
      confirmLabelHy: 'Ջնջել Գիրքը',
      onConfirm: () => {
        const next = books.filter((b) => b.id !== id);
        setBooks(next);
        saveStoredStandaloneBooks(next);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const exists = products.some((p) => p.id === editingProduct.id);
    const next = exists
      ? products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      : [...products, editingProduct];
    setProducts(next);
    saveStoredProducts(next);
    setEditingProduct(null);
  };

  const requestDeleteProduct = (id: string, name: string) => {
    setConfirmDialog({
      isOpen: true,
      titleEn: 'Delete Accessory?',
      titleHy: 'Ջնջե՞լ Աքսեսուարը:',
      messageEn: `Are you sure you want to delete "${name}" from accessories?`,
      messageHy: `Վստա՞հ եք, որ ցանկանում եք ջնջել «${name}» ապրանքը:`,
      confirmLabelEn: 'Delete Item',
      confirmLabelHy: 'Ջնջել',
      onConfirm: () => {
        const next = products.filter((p) => p.id !== id);
        setProducts(next);
        saveStoredProducts(next);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    const next = submissions.map((s) => (s.id === id ? { ...s, status: newStatus } : s));
    setSubmissions(next);
    saveStoredSubmissions(next);
  };

  const requestDeleteSubmission = (id: string, customerName: string) => {
    setConfirmDialog({
      isOpen: true,
      titleEn: 'Delete Customer Order?',
      titleHy: 'Ջնջե՞լ Պատվերը:',
      messageEn: `Are you sure you want to permanently delete order #${id} (${customerName})?`,
      messageHy: `Վստա՞հ եք, որ ցանկանում եք ջնջել #${id} պատվերը (${customerName}):`,
      confirmLabelEn: 'Delete Order',
      confirmLabelHy: 'Ջնջել Պատվերը',
      onConfirm: () => {
        const next = submissions.filter((s) => s.id !== id);
        setSubmissions(next);
        saveStoredSubmissions(next);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const requestResetData = () => {
    setConfirmDialog({
      isOpen: true,
      titleEn: 'Reset All Store Data?',
      titleHy: 'Վերականգնե՞լ Բոլոր Տվյալները:',
      messageEn: 'This will reset all subscription boxes, standalone books, accessories, and customer orders to initial demo state.',
      messageHy: 'Սա կվերականգնի բոլոր տուփերը, գրքերը, ապրանքները և պատվերները սկզբնական դեմո վիճակի:',
      confirmLabelEn: 'Reset Everything',
      confirmLabelHy: 'Վերականգնել',
      onConfirm: () => {
        resetAllDataToDefault();
        setBoxes(INITIAL_BOXES);
        setBooks(INITIAL_BOOKS);
        setProducts(INITIAL_PRODUCTS);
        setSubmissions(INITIAL_SUBMISSIONS);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Stats
  const totalSubscribers = submissions.length;
  const pendingOrdersCount = submissions.filter((s) => s.status === 'Pending' || s.status === 'Curating').length;
  const totalRevenueUSD = submissions.reduce((acc, sub) => {
    const b = boxes.find((box) => box.id === sub.selectedBoxId);
    return acc + (b ? b.priceUSD : 34.99);
  }, 0);
  const totalRevenueAMD = submissions.reduce((acc, sub) => {
    const b = boxes.find((box) => box.id === sub.selectedBoxId);
    return acc + (b ? b.priceAMD : 14000);
  }, 0);

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    const matchesCountry = countryFilter === 'all' || sub.country === countryFilter;
    return matchesSearch && matchesStatus && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-pastel-text flex flex-col font-sans">
      
      {/* Top Admin Header Bar */}
      <header className="bg-white border-b border-pastel-border px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pastel-card hover:bg-pastel-pink text-xs font-semibold text-pastel-text border border-pastel-border transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{getTranslation(lang, 'backToStore')}</span>
          </Link>
          <div className="h-5 w-px bg-pastel-border" />
          <h1 className="font-serif text-xl font-bold tracking-tight text-pastel-text flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-pastel-pink text-pastel-accent flex items-center justify-center text-xs">⚙️</span>
            {getTranslation(lang, 'adminTitle')}
          </h1>
        </div>

        {/* Dynamic Language Switcher in Admin Header */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setLang(lang === 'en' ? 'hy' : 'en')}
            className="px-3.5 py-1.5 rounded-xl bg-pastel-card hover:bg-pastel-pink border border-pastel-border text-xs font-bold text-pastel-text flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Globe className="w-4 h-4 text-pastel-accent" />
            <span>{lang === 'en' ? '🇦🇲 Հայերեն' : '🇺🇸 English'}</span>
          </button>

          <button
            onClick={requestResetData}
            className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{getTranslation(lang, 'resetDemoData')}</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body Layout (Sidebar + Main Content View) */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-pastel-border p-4 space-y-2 shrink-0">
          <div className="text-[11px] uppercase tracking-wider text-pastel-muted font-bold px-3 py-2">
            {lang === 'en' ? 'Management Menu' : 'Ղեկավարման Մենյու'}
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-pastel-pink text-pastel-text border border-pastel-rose/40 shadow-xs'
                : 'text-pastel-muted hover:bg-pastel-card hover:text-pastel-text'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4 text-pastel-accent" />
              <span>{getTranslation(lang, 'tabOverview')}</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'submissions'
                ? 'bg-pastel-pink text-pastel-text border border-pastel-rose/40 shadow-xs'
                : 'text-pastel-muted hover:bg-pastel-card hover:text-pastel-text'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-pastel-accent" />
              <span>{getTranslation(lang, 'tabSubscribers')}</span>
            </div>
            <span className="bg-pastel-rose/50 text-pastel-text px-2 py-0.5 rounded-full text-[10px]">
              {submissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('books')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'books'
                ? 'bg-pastel-pink text-pastel-text border border-pastel-rose/40 shadow-xs'
                : 'text-pastel-muted hover:bg-pastel-card hover:text-pastel-text'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-pastel-accent" />
              <span>{getTranslation(lang, 'tabBooks')}</span>
            </div>
            <span className="bg-pastel-rose/50 text-pastel-text px-2 py-0.5 rounded-full text-[10px]">
              {books.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-pastel-pink text-pastel-text border border-pastel-rose/40 shadow-xs'
                : 'text-pastel-muted hover:bg-pastel-card hover:text-pastel-text'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-pastel-accent" />
              <span>{getTranslation(lang, 'tabProducts')}</span>
            </div>
            <span className="bg-pastel-rose/50 text-pastel-text px-2 py-0.5 rounded-full text-[10px]">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('boxes')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'boxes'
                ? 'bg-pastel-pink text-pastel-text border border-pastel-rose/40 shadow-xs'
                : 'text-pastel-muted hover:bg-pastel-card hover:text-pastel-text'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-pastel-accent" />
              <span>{getTranslation(lang, 'tabBoxes')}</span>
            </div>
            <span className="bg-pastel-rose/50 text-pastel-text px-2 py-0.5 rounded-full text-[10px]">
              {boxes.length}
            </span>
          </button>
        </aside>

        {/* Right Main Content View */}
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-pastel-text">
                  {getTranslation(lang, 'tabOverview')}
                </h2>
                <p className="text-xs text-pastel-muted">
                  {getTranslation(lang, 'adminSubtitle')}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white border border-pastel-border rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-pastel-muted text-xs font-semibold">
                    <span>{getTranslation(lang, 'statActiveSubscribers')}</span>
                    <Users className="w-4 h-4 text-pastel-accent" />
                  </div>
                  <div className="font-serif font-bold text-3xl text-pastel-text">
                    {totalSubscribers}
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium">
                    {lang === 'en' ? 'Registered reader profiles' : 'Գրանցված բաժանորդներ'}
                  </p>
                </div>

                <div className="bg-white border border-pastel-border rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-pastel-muted text-xs font-semibold">
                    <span>{getTranslation(lang, 'statTotalRevenue')}</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-serif font-bold text-2xl text-pastel-text">
                    ${totalRevenueUSD.toFixed(2)}
                  </div>
                  <p className="text-[11px] text-pastel-muted font-medium">
                    (֏{totalRevenueAMD.toLocaleString()} AMD)
                  </p>
                </div>

                <div className="bg-white border border-pastel-border rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-pastel-muted text-xs font-semibold">
                    <span>{getTranslation(lang, 'statPendingOrders')}</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="font-serif font-bold text-3xl text-amber-700">
                    {pendingOrdersCount}
                  </div>
                  <p className="text-[11px] text-amber-800 font-medium">
                    {lang === 'en' ? 'Requires packing' : 'Ենթակա է առաքման'}
                  </p>
                </div>

                <div className="bg-white border border-pastel-border rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-pastel-muted text-xs font-semibold">
                    <span>{getTranslation(lang, 'statCatalogItems')}</span>
                    <BookOpen className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="font-serif font-bold text-3xl text-pastel-text">
                    {books.length}
                  </div>
                  <p className="text-[11px] text-pastel-muted font-medium">
                    {lang === 'en' ? 'In Standalone Book Store' : 'Գրքերի Խանութում'}
                  </p>
                </div>
              </div>

              {/* Recent Orders Preview Table */}
              <div className="bg-white border border-pastel-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-pastel-text">
                    {getTranslation(lang, 'recentOrdersTitle')}
                  </h3>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className="text-xs font-semibold text-pastel-accent hover:underline"
                  >
                    {getTranslation(lang, 'viewAllOrders')}
                  </button>
                </div>

                <div className="divide-y divide-pastel-border/60">
                  {submissions.slice(0, 5).map((sub) => (
                    <div key={sub.id} className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-pastel-accent font-bold mr-1.5">#{sub.id}</span>
                        <span className="font-bold text-pastel-text">{sub.customerName}</span>
                        <span className="text-pastel-muted ml-2">({sub.email})</span>
                        <span className="ml-2 font-semibold bg-pastel-pink px-2 py-0.5 rounded-md text-[10px]">
                          {sub.country === 'Armenia' ? '🇦🇲 Armenia' : '🇺🇸 USA'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
                          {sub.ownedBooks.length} {lang === 'en' ? 'owned books listed' : 'ունեցած գրքեր'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          sub.status === 'Shipped' || sub.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {sub.status}
                        </span>
                        <button
                          onClick={() => requestDeleteSubmission(sub.id, sub.customerName)}
                          className="p-1 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors"
                          title={lang === 'en' ? 'Delete Order' : 'Ջնջել Պատվերը'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEDICATED ORDERS & SUBSCRIBERS SECTION */}
          {activeTab === 'submissions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-pastel-text">
                    {getTranslation(lang, 'tabSubscribers')}
                  </h2>
                  <p className="text-xs text-pastel-muted">
                    {getTranslation(lang, 'subscribersCount')}: {submissions.length}
                  </p>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-pastel-card p-4 rounded-2xl border border-pastel-border shadow-xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-pastel-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={getTranslation(lang, 'searchPlaceholder')}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-pastel-border text-xs font-medium focus:outline-none focus:border-pastel-rose"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-pastel-border text-xs font-medium"
                  >
                    <option value="all">{getTranslation(lang, 'allCountries')}</option>
                    <option value="Armenia">🇦🇲 Armenia (Հայաստան)</option>
                    <option value="USA">🇺🇸 USA (ԱՄՆ)</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-pastel-border text-xs font-medium"
                  >
                    <option value="all">{getTranslation(lang, 'allStatuses')}</option>
                    <option value="Pending">Pending (Սպասման մեջ)</option>
                    <option value="Curating">Curating (Կազմման փուլում)</option>
                    <option value="Shipped">Shipped (Առաքված է)</option>
                    <option value="Delivered">Delivered (Հասցված է)</option>
                  </select>
                </div>
              </div>

              {/* Order Cards */}
              <div className="space-y-4">
                {filteredSubmissions.length === 0 ? (
                  <div className="bg-white border border-pastel-border rounded-2xl p-12 text-center text-pastel-muted text-xs">
                    {lang === 'en' ? 'No orders found matching your search.' : 'Համապատասխան պատվերներ չեն գտնվել:'}
                  </div>
                ) : (
                  filteredSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-white border border-pastel-border rounded-2xl p-6 shadow-xs space-y-4 relative group"
                    >
                      {/* Top Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pastel-border/60 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-pastel-accent">#{sub.id}</span>
                          <span className="font-bold text-base text-pastel-text">{sub.customerName}</span>
                          <span className="text-xs text-pastel-muted">({sub.email})</span>
                        </div>

                        {/* Status Switcher Buttons + Delete Order Button */}
                        <div className="flex items-center gap-1.5">
                          {(['Pending', 'Curating', 'Shipped', 'Delivered'] as OrderStatus[]).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleUpdateStatus(sub.id, st)}
                              className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                                sub.status === st
                                  ? 'bg-pastel-accent text-white border-pastel-accent shadow-xs'
                                  : 'bg-pastel-card hover:bg-pastel-pink border-pastel-border text-pastel-muted'
                              }`}
                            >
                              {st}
                            </button>
                          ))}

                          {/* Delete Order Button */}
                          <button
                            onClick={() => requestDeleteSubmission(sub.id, sub.customerName)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors ml-1"
                            title={lang === 'en' ? 'Delete this order' : 'Ջնջել պատվերը'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-pastel-text">
                        <div className="space-y-2 bg-pastel-card p-4 rounded-xl border border-pastel-border/60">
                          <p><strong>{getTranslation(lang, 'labelCountry')}:</strong> {sub.country === 'Armenia' ? '🇦🇲 Armenia' : '🇺🇸 USA'}</p>
                          <p><strong>{getTranslation(lang, 'labelAddress')}:</strong> {sub.address}</p>
                          <p><strong>{getTranslation(lang, 'vibeLabel')}:</strong> {sub.readingVibe}</p>
                          <p><strong>{getTranslation(lang, 'languageLabel')}:</strong> {sub.bookLanguage}</p>
                          <p><strong>{getTranslation(lang, 'genresList')}:</strong> {sub.genres.join(', ')}</p>
                        </div>

                        {/* Owned Books Tracker Inspector */}
                        <div className="space-y-2 bg-amber-50/80 p-4 rounded-xl border border-amber-200">
                          <p className="font-bold text-amber-900 flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-amber-700" />
                            {getTranslation(lang, 'ownedBooksList')}
                          </p>
                          {sub.ownedBooks && sub.ownedBooks.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1 text-amber-950 font-medium">
                              {sub.ownedBooks.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="italic text-amber-800">No owned books listed</p>
                          )}
                        </div>
                      </div>

                      {sub.notes && (
                        <div className="text-xs italic bg-pastel-pink/40 p-3 rounded-xl border border-pastel-pink text-pastel-text">
                          &quot;{sub.notes}&quot;
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: STANDALONE BOOK STORE MANAGER */}
          {activeTab === 'books' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-pastel-text">
                    {getTranslation(lang, 'tabBooks')}
                  </h2>
                  <p className="text-xs text-pastel-muted">
                    {lang === 'en' ? 'Add individual book titles, cover image URLs, prices ($ & ֏), and delete books.' : 'Ավելացրեք նոր գրքեր, նկարների հղումներ, սահմանեք գները ($ և ֏):'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingBook({
                      id: `book-${Date.now()}`,
                      titleEn: 'New Book Title',
                      titleHy: 'Նոր Գրքի Վերնագիր',
                      authorEn: 'Author Name',
                      authorHy: 'Հեղինակի Անուն',
                      genreEn: 'Fiction',
                      genreHy: 'Գեղարվեստական',
                      priceUSD: 15.99,
                      priceAMD: 6400,
                      descriptionEn: 'Book synopsis...',
                      descriptionHy: 'Գրքի նկարագրություն...',
                      inStock: true,
                      badgeEn: 'New',
                      badgeHy: 'Նոր',
                      image: '',
                    });
                    setIsCreatingBook(true);
                  }}
                  className="px-4 py-2 rounded-xl pastel-button-primary text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>{getTranslation(lang, 'addBookBtn')}</span>
                </button>
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {books.map((b) => {
                  const title = lang === 'en' ? b.titleEn : b.titleHy;
                  const author = lang === 'en' ? b.authorEn : b.authorHy;
                  const genre = lang === 'en' ? b.genreEn : b.genreHy;

                  return (
                    <div
                      key={b.id}
                      className="bg-white border border-pastel-border rounded-2xl p-4 shadow-xs flex gap-4"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-20 h-28 rounded-xl bg-pastel-card border border-pastel-border overflow-hidden shrink-0">
                        {b.image ? (
                          <img src={b.image} alt={title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-pastel-muted">
                            <BookOpen className="w-6 h-6 mb-1" />
                            <span className="text-[9px]">No photo</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[9px] font-bold bg-pastel-pink text-pastel-text px-2 py-0.5 rounded-md border border-pastel-rose/30 truncate">
                              {genre}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingBook(b);
                                  setIsCreatingBook(false);
                                }}
                                className="p-1 rounded-lg bg-pastel-sage hover:bg-pastel-sageHover text-pastel-text border border-pastel-sageHover"
                                title={getTranslation(lang, 'editBtn')}
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => requestDeleteBook(b.id, title)}
                                className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                                title={getTranslation(lang, 'deleteBtn')}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <h3 className="font-serif font-bold text-sm text-pastel-text mt-1 truncate">
                            {title}
                          </h3>
                          <p className="text-xs font-serif italic text-pastel-muted truncate">
                            by {author}
                          </p>
                        </div>

                        <div className="border-t border-pastel-border/60 pt-2 flex items-center justify-between text-xs font-bold text-pastel-accent">
                          <span>${b.priceUSD} / ֏{b.priceAMD.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ADD-ONS MANAGER */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-pastel-text">
                    {getTranslation(lang, 'tabProducts')}
                  </h2>
                  <p className="text-xs text-pastel-muted">
                    {lang === 'en' ? 'Manage candles, bookmarks, sleeves, and teas with photos.' : 'Կառավարեք մոմերը, էջանիշերը և նկարները:'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingProduct({
                      id: `prod-${Date.now()}`,
                      nameEn: 'Handmade Rose Soy Candle',
                      nameHy: 'Ձեռագործ Վարդի Սոյայի Մոմ',
                      categoryEn: 'Candles',
                      categoryHy: 'Մոմեր',
                      descriptionEn: 'Garden rose scent notes.',
                      descriptionHy: 'Վարդի բույրով:',
                      priceUSD: 13.99,
                      priceAMD: 5600,
                      inStock: true,
                      iconName: 'Flame',
                      image: '',
                    });
                    setIsCreatingProduct(true);
                  }}
                  className="px-4 py-2 rounded-xl pastel-button-primary text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>{getTranslation(lang, 'addProductBtn')}</span>
                </button>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((p) => {
                  const name = lang === 'en' ? p.nameEn : p.nameHy;
                  const category = lang === 'en' ? p.categoryEn : p.categoryHy;

                  return (
                    <div
                      key={p.id}
                      className="bg-white border border-pastel-border rounded-2xl p-4 shadow-xs flex gap-4"
                    >
                      <div className="w-20 h-20 rounded-xl bg-pastel-card border border-pastel-border overflow-hidden shrink-0">
                        {p.image ? (
                          <img src={p.image} alt={name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-pastel-muted">
                            <ShoppingBag className="w-5 h-5 mb-1" />
                            <span className="text-[9px]">No photo</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[9px] font-bold bg-pastel-pink text-pastel-text px-2 py-0.5 rounded-md border border-pastel-rose/30 truncate">
                              {category}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingProduct(p);
                                  setIsCreatingProduct(false);
                                }}
                                className="p-1 rounded-lg bg-pastel-sage text-pastel-text border border-pastel-sageHover"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => requestDeleteProduct(p.id, name)}
                                className="p-1 rounded-lg bg-red-50 text-red-600 border border-red-200"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <h3 className="font-serif font-bold text-sm text-pastel-text mt-1 truncate">
                            {name}
                          </h3>
                        </div>

                        <div className="border-t border-pastel-border/60 pt-2 flex items-center justify-between text-xs font-bold text-pastel-accent">
                          <span>${p.priceUSD} / ֏{p.priceAMD.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: BOXES MANAGER */}
          {activeTab === 'boxes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-pastel-text">
                    {getTranslation(lang, 'tabBoxes')}
                  </h2>
                  <p className="text-xs text-pastel-muted">
                    {lang === 'en' ? 'Edit subscription box sets, prices ($ & ֏), and box banner images.' : 'Խմբագրեք բաժանորդագրության տուփերը և նկարները:'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingBox({
                      id: `box-${Date.now()}`,
                      nameEn: 'New Custom Box',
                      nameHy: 'Նոր Տուփ',
                      badgeEn: 'Special Edition',
                      badgeHy: 'Հատուկ',
                      priceUSD: 29.99,
                      priceAMD: 12000,
                      itemCount: 4,
                      descriptionEn: 'Custom monthly box tier.',
                      descriptionHy: 'Նոր տուփ:',
                      itemsEn: ['1 Novel', '1 Soy Candle', '1 Bookmark'],
                      itemsHy: ['1 Վեպ', '1 Սոյայի մոմ', '1 Էջանիշ'],
                      isPopular: false,
                      image: '',
                    });
                    setIsCreatingBox(true);
                  }}
                  className="px-4 py-2 rounded-xl pastel-button-primary text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>{getTranslation(lang, 'addBoxBtn')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {boxes.map((b) => {
                  const boxName = lang === 'en' ? b.nameEn : b.nameHy;
                  const boxDesc = lang === 'en' ? b.descriptionEn : b.descriptionHy;
                  const badge = lang === 'en' ? b.badgeEn : b.badgeHy;

                  return (
                    <div
                      key={b.id}
                      className="bg-white border border-pastel-border rounded-2xl p-5 shadow-xs space-y-4"
                    >
                      {b.image && (
                        <div className="w-full h-32 rounded-xl overflow-hidden border border-pastel-border/60">
                          <img src={b.image} alt={boxName} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-pastel-pink text-pastel-text px-2 py-0.5 rounded-md border border-pastel-rose/30">
                            {badge}
                          </span>
                          <h3 className="font-serif font-bold text-xl text-pastel-text mt-1">
                            {boxName}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingBox(b);
                              setIsCreatingBox(false);
                            }}
                            className="p-1.5 rounded-lg bg-pastel-sage text-pastel-text border border-pastel-sageHover"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => requestDeleteBox(b.id, boxName)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-bold text-pastel-text bg-pastel-card p-3 rounded-xl border border-pastel-border/60">
                        <span>🇺🇸 ${b.priceUSD}</span>
                        <span>🇦🇲 ֏{b.priceAMD.toLocaleString()}</span>
                        <span className="ml-auto text-pastel-muted font-normal">{b.itemCount} items</span>
                      </div>

                      <p className="text-xs text-pastel-muted">
                        {boxDesc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* EDIT BOOK MODAL */}
      {editingBook && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xl max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl border border-pastel-border">
            <h3 className="font-serif font-bold text-xl text-pastel-text">
              {isCreatingBook
                ? (lang === 'en' ? 'Add New Standalone Book Title' : 'Ավելացնել Նոր Գիրք')
                : (lang === 'en' ? 'Edit Book Details' : 'Խմբագրել Գիրքը')}
            </h3>

            <form onSubmit={handleSaveBook} className="space-y-4 text-xs">
              {/* IMAGE URL INPUT & LIVE PREVIEW */}
              <div className="bg-pastel-pink/30 p-3.5 rounded-2xl border border-pastel-rose/40 space-y-2">
                <label className="block font-bold text-pastel-text flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-pastel-accent" />
                  <span>{lang === 'en' ? 'Book Cover Image URL (Link)' : 'Գրքի Նկարի Հղում (URL)'}</span>
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or image link"
                  value={editingBook.image || ''}
                  onChange={(e) => setEditingBook({ ...editingBook, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel-border bg-white font-mono text-xs focus:outline-none focus:border-pastel-rose"
                />
                {editingBook.image && (
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-16 h-24 rounded-lg overflow-hidden border border-pastel-border shrink-0 shadow-xs">
                      <img src={editingBook.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold">✓ Image preview loaded</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Title (English)</label>
                  <input
                    type="text"
                    required
                    value={editingBook.titleEn}
                    onChange={(e) => setEditingBook({ ...editingBook, titleEn: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Title (Armenian / Հայերեն)</label>
                  <input
                    type="text"
                    required
                    value={editingBook.titleHy}
                    onChange={(e) => setEditingBook({ ...editingBook, titleHy: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Author (English)</label>
                  <input
                    type="text"
                    required
                    value={editingBook.authorEn}
                    onChange={(e) => setEditingBook({ ...editingBook, authorEn: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Author (Armenian / Հայերեն)</label>
                  <input
                    type="text"
                    required
                    value={editingBook.authorHy}
                    onChange={(e) => setEditingBook({ ...editingBook, authorHy: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Genre (English)</label>
                  <input
                    type="text"
                    required
                    value={editingBook.genreEn}
                    onChange={(e) => setEditingBook({ ...editingBook, genreEn: e.target.value, genreHy: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">In Stock Status</label>
                  <select
                    value={editingBook.inStock ? 'true' : 'false'}
                    onChange={(e) => setEditingBook({ ...editingBook, inStock: e.target.value === 'true' })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">{getTranslation(lang, 'fieldPriceUSD')}</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingBook.priceUSD}
                    onChange={(e) => setEditingBook({ ...editingBook, priceUSD: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{getTranslation(lang, 'fieldPriceAMD')}</label>
                  <input
                    type="number"
                    required
                    value={editingBook.priceAMD}
                    onChange={(e) => setEditingBook({ ...editingBook, priceAMD: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Description / Synopsis</label>
                <textarea
                  rows={3}
                  value={editingBook.descriptionEn}
                  onChange={(e) => setEditingBook({ ...editingBook, descriptionEn: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 font-semibold"
                >
                  {getTranslation(lang, 'cancelBtn')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl pastel-button-primary font-bold"
                >
                  {getTranslation(lang, 'saveBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl border border-pastel-border">
            <h3 className="font-serif font-bold text-xl text-pastel-text">
              {isCreatingProduct ? getTranslation(lang, 'addProductBtn') : getTranslation(lang, 'editBtn')}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* IMAGE URL INPUT & LIVE PREVIEW */}
              <div className="bg-pastel-pink/30 p-3.5 rounded-2xl border border-pastel-rose/40 space-y-2">
                <label className="block font-bold text-pastel-text flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-pastel-accent" />
                  <span>{lang === 'en' ? 'Product Photo URL (Link)' : 'Ապրանքի Նկարի Հղում (URL)'}</span>
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or image link"
                  value={editingProduct.image || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel-border bg-white font-mono text-xs focus:outline-none focus:border-pastel-rose"
                />
                {editingProduct.image && (
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-pastel-border shrink-0 shadow-xs">
                      <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold">✓ Photo loaded</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">{getTranslation(lang, 'fieldProductNameEn')}</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.nameEn}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameEn: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{getTranslation(lang, 'fieldProductNameHy')}</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.nameHy}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameHy: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">{getTranslation(lang, 'fieldPriceUSD')}</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.priceUSD}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceUSD: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{getTranslation(lang, 'fieldPriceAMD')}</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.priceAMD}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceAMD: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">{getTranslation(lang, 'fieldDescEn')}</label>
                <textarea
                  rows={2}
                  value={editingProduct.descriptionEn}
                  onChange={(e) => setEditingProduct({ ...editingProduct, descriptionEn: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 font-semibold"
                >
                  {getTranslation(lang, 'cancelBtn')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl pastel-button-primary font-bold"
                >
                  {getTranslation(lang, 'saveBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT BOX MODAL */}
      {editingBox && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xl max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl border border-pastel-border">
            <h3 className="font-serif font-bold text-xl text-pastel-text">
              {isCreatingBox ? getTranslation(lang, 'addBoxBtn') : getTranslation(lang, 'editBtn')}
            </h3>

            <form onSubmit={handleSaveBox} className="space-y-4 text-xs">
              {/* IMAGE URL INPUT & LIVE PREVIEW */}
              <div className="bg-pastel-pink/30 p-3.5 rounded-2xl border border-pastel-rose/40 space-y-2">
                <label className="block font-bold text-pastel-text flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-pastel-accent" />
                  <span>{lang === 'en' ? 'Box Banner Photo URL (Link)' : 'Տուփի Նկարի Հղում (URL)'}</span>
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or image link"
                  value={editingBox.image || ''}
                  onChange={(e) => setEditingBox({ ...editingBox, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel-border bg-white font-mono text-xs focus:outline-none focus:border-pastel-rose"
                />
                {editingBox.image && (
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-24 h-16 rounded-lg overflow-hidden border border-pastel-border shrink-0 shadow-xs">
                      <img src={editingBox.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold">✓ Box image loaded</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">{getTranslation(lang, 'fieldBoxNameEn')}</label>
                  <input
                    type="text"
                    required
                    value={editingBox.nameEn}
                    onChange={(e) => setEditingBox({ ...editingBox, nameEn: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{getTranslation(lang, 'fieldBoxNameHy')}</label>
                  <input
                    type="text"
                    required
                    value={editingBox.nameHy}
                    onChange={(e) => setEditingBox({ ...editingBox, nameHy: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">{getTranslation(lang, 'fieldPriceUSD')}</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingBox.priceUSD}
                    onChange={(e) => setEditingBox({ ...editingBox, priceUSD: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{getTranslation(lang, 'fieldPriceAMD')}</label>
                  <input
                    type="number"
                    required
                    value={editingBox.priceAMD}
                    onChange={(e) => setEditingBox({ ...editingBox, priceAMD: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">{getTranslation(lang, 'fieldDescEn')}</label>
                <textarea
                  rows={2}
                  value={editingBox.descriptionEn}
                  onChange={(e) => setEditingBox({ ...editingBox, descriptionEn: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingBox(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 font-semibold"
                >
                  {getTranslation(lang, 'cancelBtn')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl pastel-button-primary font-bold"
                >
                  {getTranslation(lang, 'saveBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CUSTOM IN-APP CONFIRMATION MODAL (No browser alert/confirm!) */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-pastel-border space-y-5 text-center relative">
            <button
              onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-pastel-pink text-pastel-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-xl text-pastel-text">
                {lang === 'en' ? confirmDialog.titleEn : confirmDialog.titleHy}
              </h3>
              <p className="text-xs sm:text-sm text-pastel-muted leading-relaxed">
                {lang === 'en' ? confirmDialog.messageEn : confirmDialog.messageHy}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className="flex-1 py-2.5 rounded-xl bg-pastel-card hover:bg-pastel-pink text-pastel-text border border-pastel-border font-bold text-xs transition-colors"
              >
                {lang === 'en' ? 'Cancel' : 'Չեղարկել'}
              </button>

              <button
                type="button"
                onClick={() => confirmDialog.onConfirm()}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                {lang === 'en'
                  ? confirmDialog.confirmLabelEn || 'Confirm Delete'
                  : confirmDialog.confirmLabelHy || 'Ջնջել'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
