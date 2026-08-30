'use client';

import React, { useState } from 'react';
import { Language, Currency, BookItem } from '@/lib/types';
import { BookOpen, ShoppingCart, Search, Eye } from 'lucide-react';
import { addToCart } from '@/components/Cart';
import { WishlistButton } from '@/components/WishlistButton';
import { DetailItem } from '@/components/ItemDetailModal';

interface BookCatalogSectionProps {
  lang: Language;
  currency: Currency;
  books: BookItem[];
  onOrderBook: (book: BookItem) => void;
  onViewDetail?: (item: DetailItem) => void;
}

export const BookCatalogSection: React.FC<BookCatalogSectionProps> = ({
  lang,
  currency,
  books,
  onOrderBook,
  onViewDetail,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const genres = Array.from(
    new Set(books.map((b) => (lang === 'en' ? b.genreEn : b.genreHy)))
  );

  const filteredBooks = books.filter((b) => {
    const genre = lang === 'en' ? b.genreEn : b.genreHy;
    const title = lang === 'en' ? b.titleEn : b.titleHy;
    const author = lang === 'en' ? b.authorEn : b.authorHy;

    const matchesGenre = selectedGenre === 'all' || genre === selectedGenre;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesGenre && matchesSearch;
  });

  const handleAddToCart = (book: BookItem) => {
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

  return (
    <section id="bookstore-section" className="py-12 sm:py-16 lg:py-24 bg-[#FFFEFC] relative">
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-pastel-yellow/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-pastel-pink/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-pastel-pink/90 border border-pastel-rose/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-pastel-text shadow-xs">
            <BookOpen className="w-4 h-4 text-pastel-accent" />
            <span>{lang === 'en' ? 'Standalone Book Store' : 'Առանձին Գրքերի Խանութ'}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-pastel-text leading-tight">
            {lang === 'en' ? 'Order Individual Curated Books' : 'Պատվիրեք Առանձին Գրքեր'}
          </h2>

          <p className="text-xs sm:text-base text-pastel-muted font-light leading-relaxed px-2">
            {lang === 'en'
              ? 'Prefer buying single titles instead of a subscription box? Explore our handpicked collection of Armenian classics, bestsellers, and timeless poetry.'
              : 'Ցանկանո՞ւմ եք ձեռք բերել առանձին գրքեր առանց բաժանորդագրության: Ծանոթացեք մեր ընտրված հայ և համաշխարհային գրականությանը:'}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 bg-pastel-card p-3.5 sm:p-4 rounded-2xl border border-pastel-border shadow-xs">
          {/* Genre Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedGenre('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                selectedGenre === 'all'
                  ? 'bg-pastel-pink border-pastel-rose text-pastel-text shadow-xs'
                  : 'bg-white text-pastel-muted hover:text-pastel-text border-pastel-border'
              }`}
            >
              {lang === 'en' ? 'All Genres' : 'Բոլոր Ժանրերը'}
            </button>
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedGenre === g
                    ? 'bg-pastel-pink border-pastel-rose text-pastel-text shadow-xs'
                    : 'bg-white text-pastel-muted hover:text-pastel-text border-pastel-border'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-pastel-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search by title or author...' : 'Փնտրել գիրք կամ հեղինակ...'}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-pastel-border text-xs font-medium focus:outline-none focus:border-pastel-rose"
            />
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredBooks.map((book) => {
            const title = lang === 'en' ? book.titleEn : book.titleHy;
            const author = lang === 'en' ? book.authorEn : book.authorHy;
            const genre = lang === 'en' ? book.genreEn : book.genreHy;
            const desc = lang === 'en' ? book.descriptionEn : book.descriptionHy;
            const badge = lang === 'en' ? book.badgeEn : book.badgeHy;
            const isJustAdded = addedId === book.id;
            const priceDisplay =
              currency === 'USD'
                ? `$${book.priceUSD.toFixed(2)}`
                : `֏${book.priceAMD.toLocaleString()}`;

            return (
              <div
                key={book.id}
                className="bg-white border border-pastel-border rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Clickable Image Container */}
                  <div
                    onClick={() => onViewDetail && onViewDetail({ type: 'book', data: book })}
                    className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-pastel-pink/20 border border-pastel-border/60 shadow-xs group-hover:shadow-md transition-all cursor-pointer"
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

                    {/* Hover Inspect Banner */}
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
                      <div className="pointer-events-auto bg-white/80 backdrop-blur-md rounded-full p-1 shadow-xs hover:bg-white transition-colors">
                        <WishlistButton
                          itemId={book.id}
                          nameEn={book.titleEn}
                          nameHy={book.titleHy}
                          priceUSD={book.priceUSD}
                          priceAMD={book.priceAMD}
                          type="book"
                          lang={lang}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 mb-4">
                    <span className="inline-block text-[10px] font-semibold bg-pastel-pink text-pastel-text px-2 py-0.5 rounded-md border border-pastel-rose/30">
                      {genre}
                    </span>
                    <h3
                      onClick={() => onViewDetail && onViewDetail({ type: 'book', data: book })}
                      className="font-serif font-bold text-base text-pastel-text group-hover:text-pastel-accent transition-colors line-clamp-1 pt-1 cursor-pointer"
                    >
                      {title}
                    </h3>
                    <p className="text-xs font-serif italic text-pastel-muted line-clamp-1">
                      by {author}
                    </p>
                    <p className="text-xs text-pastel-muted font-light line-clamp-2 pt-1">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="border-t border-pastel-border/60 pt-3 flex items-center justify-between gap-2">
                  <span className="font-serif font-bold text-base text-pastel-accent">
                    {priceDisplay}
                  </span>
                  <button
                    onClick={() => handleAddToCart(book)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white'
                        : 'pastel-button-primary'
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>
                      {isJustAdded
                        ? lang === 'en'
                          ? '✓ Added'
                          : '✓ Ավելացված է'
                        : lang === 'en'
                        ? 'Add'
                        : 'Ավելացնել'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
