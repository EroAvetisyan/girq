'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Heart, ShoppingCart, Filter, BookOpen, Eye } from 'lucide-react';
import { BookItem, Language, Currency } from '@/lib/types';
import { getStoredStandaloneBooks, INITIAL_BOOKS } from '@/lib/store';
import { addToCart, Cart } from '@/components/Cart';
import { ItemDetailModal, DetailItem } from '@/components/ItemDetailModal';

interface GenreFilterItem {
  id: string;
  nameEn: string;
  nameHy: string;
}

const GENRE_FILTERS: GenreFilterItem[] = [
  { id: 'All', nameEn: 'All Genres', nameHy: 'Բոլոր Ժանրերը' },
  { id: 'Historical Fiction', nameEn: 'Historical Fiction', nameHy: 'Պատմավեպ' },
  { id: 'Armenian Classics', nameEn: 'Armenian Classics', nameHy: 'Հայ Դասական' },
  { id: 'Fable & Classics', nameEn: 'Fable & Classics', nameHy: 'Դասական Առակ' },
  { id: 'Poetry & Folktales', nameEn: 'Poetry & Folktales', nameHy: 'Պոեզիա և Հեքիաթներ' },
  { id: 'Dystopian Sci-Fi', nameEn: 'Dystopian Sci-Fi', nameHy: 'Գիտական Ֆանտաստիկա' },
  { id: 'Romance & Classics', nameEn: 'Romance & Classics', nameHy: 'Ռոմանտիկ Դասական' },
];

export default function BooksPage() {
  const [lang, setLang] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [books, setBooks] = useState<BookItem[]>(INITIAL_BOOKS);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<DetailItem | null>(null);

  useEffect(() => {
    setBooks(getStoredStandaloneBooks());
    const w = JSON.parse(localStorage.getItem('girqbox_wishlist_v1') || '[]');
    setWishlist(w.map((x: { id: string }) => x.id));
  }, []);

  const filtered = books.filter((b) => {
    const title = lang === 'en' ? b.titleEn : b.titleHy;
    const author = lang === 'en' ? b.authorEn : b.authorHy;
    const matchSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      author.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === 'All' || b.genreEn === genre;
    return matchSearch && matchGenre;
  });

  const handleAddCart = (book: BookItem) => {
    addToCart({
      id: book.id,
      type: 'book',
      nameEn: book.titleEn,
      nameHy: book.titleHy,
      priceUSD: book.priceUSD,
      priceAMD: book.priceAMD,
      quantity: 1,
      image: book.image,
    });
    setAddedId(book.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const toggleWishlist = (book: BookItem) => {
    const stored = JSON.parse(localStorage.getItem('girqbox_wishlist_v1') || '[]');
    const exists = stored.some((w: { id: string }) => w.id === book.id);
    const next = exists
      ? stored.filter((w: { id: string }) => w.id !== book.id)
      : [
          ...stored,
          {
            id: book.id,
            type: 'book',
            nameEn: book.titleEn,
            nameHy: book.titleHy,
            priceUSD: book.priceUSD,
            priceAMD: book.priceAMD,
            image: book.image,
          },
        ];
    localStorage.setItem('girqbox_wishlist_v1', JSON.stringify(next));
    setWishlist(next.map((x: { id: string }) => x.id));
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] font-sans">
      {/* Detail Modal */}
      <ItemDetailModal
        item={detailItem}
        onClose={() => setDetailItem(null)}
        lang={lang}
        currency={currency}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pastel-border shadow-xs px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
        <Link
          href="/"
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-pastel-card hover:bg-pastel-pink text-xs font-semibold text-pastel-text border border-pastel-border transition-all shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'en' ? 'Back' : 'Վերադառնալ'}</span>
        </Link>

        <h1 className="font-serif text-base sm:text-xl font-bold text-pastel-text flex items-center gap-2 truncate">
          <BookOpen className="w-5 h-5 text-pastel-accent shrink-0" />
          <span className="truncate">{lang === 'en' ? 'Standalone Books' : 'Գրքերի Կատալոգ'}</span>
        </h1>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="flex items-center bg-pastel-card rounded-lg p-0.5 border border-pastel-border shadow-xs">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-1.5 sm:px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold ${
                currency === 'USD' ? 'bg-pastel-pink text-pastel-text shadow-xs' : 'text-pastel-muted'
              }`}
            >
              $ USD
            </button>
            <button
              onClick={() => setCurrency('AMD')}
              className={`px-1.5 sm:px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold ${
                currency === 'AMD' ? 'bg-pastel-pink text-pastel-text shadow-xs' : 'text-pastel-muted'
              }`}
            >
              ֏ AMD
            </button>
          </div>

          <button
            onClick={() => setLang((l) => (l === 'en' ? 'hy' : 'en'))}
            className="px-2 py-1.5 rounded-lg bg-pastel-card hover:bg-pastel-pink border border-pastel-border text-xs font-bold text-pastel-text shadow-xs"
          >
            {lang === 'en' ? '🇦🇲' : '🇺🇸'}
          </button>

          <Cart lang={lang} currency={currency} />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Search & Genre Filters */}
        <div className="space-y-3 bg-white p-4 sm:p-5 rounded-3xl border border-pastel-border shadow-xs">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-pastel-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'en' ? 'Search by title or author...' : 'Փնտրել ըստ վերնագրի կամ հեղինակի...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-pastel-card border border-pastel-border text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-rose"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-4 h-4 text-pastel-muted flex-shrink-0" />
            {GENRE_FILTERS.map((g) => (
              <button
                key={g.id}
                onClick={() => setGenre(g.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  genre === g.id
                    ? 'bg-pastel-accent text-white border-pastel-accent shadow-xs'
                    : 'bg-pastel-card border-pastel-border text-pastel-muted hover:bg-pastel-pink hover:text-pastel-text'
                }`}
              >
                {lang === 'en' ? g.nameEn : g.nameHy}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-pastel-muted font-medium">
          {lang === 'en' ? `${filtered.length} books found` : `Գտնվել է ${filtered.length} գիրք`}
        </p>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((book) => {
            const title = lang === 'en' ? book.titleEn : book.titleHy;
            const author = lang === 'en' ? book.authorEn : book.authorHy;
            const bookGenre = lang === 'en' ? book.genreEn : book.genreHy;
            const desc = lang === 'en' ? book.descriptionEn : book.descriptionHy;
            const badge = lang === 'en' ? book.badgeEn : book.badgeHy;
            const isWished = wishlist.includes(book.id);
            const justAdded = addedId === book.id;

            return (
              <div
                key={book.id}
                className="bg-white border border-pastel-border rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 space-y-4 flex flex-col justify-between group"
              >
                <div>
                  {/* REAL BOOK COVER / HIGH END PLACEHOLDER */}
                  <div
                    onClick={() => setDetailItem({ type: 'book', data: book })}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-pastel-pink/20 border border-pastel-border/60 shadow-xs group-hover:shadow-md transition-all cursor-pointer"
                  >
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div
                        className={`w-full h-full p-4 flex flex-col justify-between border shadow-inner ${
                          book.coverColor || 'bg-gradient-to-br from-rose-50 to-pink-100 text-rose-950 border-rose-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <BookOpen className="w-5 h-5 text-pastel-accent/70" />
                          <span className="text-[10px] font-mono opacity-60">GIRQ</span>
                        </div>
                        <div className="my-auto text-center px-2">
                          <p className="font-serif font-bold text-base leading-tight line-clamp-3">
                            {title}
                          </p>
                          <p className="text-xs font-serif italic opacity-80 mt-1.5 line-clamp-1">
                            {author}
                          </p>
                        </div>
                        <div className="w-full h-1 rounded-full bg-black/10" />
                      </div>
                    )}

                    {/* Quick View Hover Banner */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-white/90 backdrop-blur-md text-pastel-text text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                        <Eye className="w-3.5 h-3.5 text-pastel-accent" />
                        <span>{lang === 'en' ? 'Quick View' : 'Մանրամասներ'}</span>
                      </span>
                    </div>

                    {/* Top Overlay Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      {badge ? (
                        <span className="pointer-events-auto text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-pastel-text px-2 py-0.5 rounded-md shadow-xs border border-white/50">
                          {badge}
                        </span>
                      ) : (
                        <span />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(book);
                        }}
                        className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center border transition-all shadow-xs backdrop-blur-md ${
                          isWished
                            ? 'bg-rose-50 border-rose-200 text-rose-500'
                            : 'bg-white/80 border-white/60 text-pastel-muted hover:text-rose-400 hover:bg-white'
                        }`}
                        title="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] font-bold bg-pastel-sage/80 text-pastel-text px-2 py-0.5 rounded-md border border-pastel-sageHover">
                      {bookGenre}
                    </span>
                    <h3
                      onClick={() => setDetailItem({ type: 'book', data: book })}
                      className="font-serif font-bold text-base text-pastel-text group-hover:text-pastel-accent transition-colors line-clamp-1 pt-1 cursor-pointer"
                    >
                      {title}
                    </h3>
                    <p className="text-xs text-pastel-muted italic">
                      {lang === 'en' ? `by ${author}` : `հեղինակ՝ ${author}`}
                    </p>
                    <p className="text-xs text-pastel-muted leading-relaxed line-clamp-2 pt-1">{desc}</p>
                  </div>
                </div>

                {/* Price + Cart */}
                <div className="flex items-center justify-between pt-3 border-t border-pastel-border/60 gap-2">
                  <span className="font-serif font-bold text-lg text-pastel-accent">
                    {currency === 'USD' ? `$${book.priceUSD}` : `֏${book.priceAMD.toLocaleString()}`}
                  </span>
                  <button
                    onClick={() => handleAddCart(book)}
                    disabled={!book.inStock}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 ${
                      justAdded
                        ? 'bg-emerald-600 text-white'
                        : book.inStock
                        ? 'pastel-button-primary'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>
                      {justAdded
                        ? lang === 'en'
                          ? '✓ Added!'
                          : '✓ Ավելացված է!'
                        : book.inStock
                        ? lang === 'en'
                          ? 'Add'
                          : 'Ավելացնել'
                        : lang === 'en'
                        ? 'Out of Stock'
                        : 'Առկա չէ'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
