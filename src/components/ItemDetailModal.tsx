'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Language, Currency, SubscriptionBox, BookItem, CatalogProduct } from '@/lib/types';
import { X, ShoppingCart, Heart, Check, BookOpen, ShieldCheck, Sparkles, Plus, Minus } from 'lucide-react';
import { addToCart } from '@/components/Cart';
import { WishlistButton } from '@/components/WishlistButton';

export type DetailItem =
  | { type: 'box'; data: SubscriptionBox }
  | { type: 'book'; data: BookItem }
  | { type: 'product'; data: CatalogProduct };

interface ItemDetailModalProps {
  item: DetailItem | null;
  onClose: () => void;
  lang: Language;
  currency: Currency;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  lang,
  currency,
}) => {
  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setMounted(true);
    setQuantity(1);
    setIsAdded(false);

    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  if (!mounted || !item) return null;

  const handleAddToCart = () => {
    if (item.type === 'box') {
      const box = item.data;
      addToCart({
        id: box.id,
        type: 'box',
        nameEn: box.nameEn,
        nameHy: box.nameHy,
        priceUSD: box.priceUSD,
        priceAMD: box.priceAMD,
        quantity,
        image: box.image,
      });
    } else if (item.type === 'book') {
      const book = item.data;
      addToCart({
        id: book.id,
        type: 'book',
        nameEn: book.titleEn,
        nameHy: book.titleHy,
        priceUSD: book.priceUSD,
        priceAMD: book.priceAMD,
        quantity,
        image: book.image,
      });
    } else if (item.type === 'product') {
      const prod = item.data;
      addToCart({
        id: prod.id,
        type: 'product',
        nameEn: prod.nameEn,
        nameHy: prod.nameHy,
        priceUSD: prod.priceUSD,
        priceAMD: prod.priceAMD,
        quantity,
        image: prod.image,
      });
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Helper values based on item type
  let title = '';
  let subtitle = '';
  let categoryTag = '';
  let badge = '';
  let description = '';
  let priceUSD = 0;
  let priceAMD = 0;
  let imageUrl = '';
  let itemsListEn: string[] = [];
  let itemsListHy: string[] = [];

  if (item.type === 'box') {
    const box = item.data;
    title = lang === 'en' ? box.nameEn : box.nameHy;
    subtitle = lang === 'en' ? 'Monthly Curated Subscription Box' : 'Ամսական Ընտրված Բաժանորդագրության Տուփ';
    categoryTag = lang === 'en' ? 'Subscription Box' : 'Բաժանորդագրության Տուփ';
    badge = lang === 'en' ? box.badgeEn || '' : box.badgeHy || '';
    description = lang === 'en' ? box.descriptionEn : box.descriptionHy;
    priceUSD = box.priceUSD;
    priceAMD = box.priceAMD;
    imageUrl = box.image || '';
    itemsListEn = box.itemsEn || [];
    itemsListHy = box.itemsHy || [];
  } else if (item.type === 'book') {
    const book = item.data;
    title = lang === 'en' ? book.titleEn : book.titleHy;
    subtitle = lang === 'en' ? `by ${book.authorEn}` : `հեղինակ՝ ${book.authorHy}`;
    categoryTag = lang === 'en' ? book.genreEn : book.genreHy;
    badge = lang === 'en' ? book.badgeEn || '' : book.badgeHy || '';
    description = lang === 'en' ? book.descriptionEn : book.descriptionHy;
    priceUSD = book.priceUSD;
    priceAMD = book.priceAMD;
    imageUrl = book.image || '';
  } else if (item.type === 'product') {
    const prod = item.data;
    title = lang === 'en' ? prod.nameEn : prod.nameHy;
    subtitle = lang === 'en' ? 'Handcrafted Reading Accessory' : 'Ձեռագործ Ընթերցանության Աքսեսուար';
    categoryTag = lang === 'en' ? prod.categoryEn : prod.categoryHy;
    description = lang === 'en' ? prod.descriptionEn : prod.descriptionHy;
    priceUSD = prod.priceUSD;
    priceAMD = prod.priceAMD;
    imageUrl = prod.image || '';
  }

  const priceDisplay =
    currency === 'USD' ? `$${priceUSD.toFixed(2)}` : `֏${priceAMD.toLocaleString()}`;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Backdrop Click to Close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card - Full Mobile Scrollable Wrapper */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full border border-pastel-border shadow-2xl overflow-y-auto z-10 my-auto max-h-[90vh] sm:max-h-[85vh] flex flex-col md:flex-row">
        
        {/* Sticky Close Button (Always visible on mobile & desktop) */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-30 p-2 rounded-full bg-white/90 backdrop-blur-md text-pastel-text hover:bg-pastel-pink border border-pastel-border/60 transition-all shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photo & Badges */}
        <div className="w-full md:w-5/12 bg-pastel-pink/20 relative min-h-[240px] sm:min-h-[300px] md:min-h-[420px] flex items-center justify-center border-b md:border-b-0 md:border-r border-pastel-border/60 shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover max-h-[320px] md:max-h-none"
            />
          ) : (
            <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-pastel-pink/40 to-pastel-yellow/30 text-pastel-text min-h-[220px]">
              <BookOpen className="w-14 h-14 text-pastel-accent/60 mb-2" />
              <h4 className="font-serif font-bold text-lg px-4 leading-tight">{title}</h4>
              <p className="text-xs italic text-pastel-muted mt-1.5">{subtitle}</p>
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start pointer-events-none">
            {badge && (
              <span className="pointer-events-auto text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-pastel-text px-2.5 py-1 rounded-md shadow-xs border border-white/60">
                {badge}
              </span>
            )}
            <span className="pointer-events-auto text-[10px] font-semibold bg-pastel-pink text-pastel-text px-2.5 py-1 rounded-md border border-pastel-rose/40 shadow-xs">
              {categoryTag}
            </span>
          </div>

          {/* Wishlist Button */}
          {item.type !== 'box' && (
            <div className="absolute bottom-3.5 right-3.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-md z-20">
              <WishlistButton
                itemId={item.data.id}
                nameEn={item.type === 'book' ? item.data.titleEn : item.data.nameEn}
                nameHy={item.type === 'book' ? item.data.titleHy : item.data.nameHy}
                priceUSD={priceUSD}
                priceAMD={priceAMD}
                type={item.type}
                lang={lang}
              />
            </div>
          )}
        </div>

        {/* Right Side: Content Details & Actions */}
        <div className="w-full md:w-7/12 p-5 sm:p-7 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            
            {/* Header Title & Subtitle */}
            <div className="space-y-1 pr-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-pastel-accent">
                {categoryTag}
              </span>
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-pastel-text leading-tight">
                {title}
              </h3>
              <p className="text-xs sm:text-sm font-serif italic text-pastel-muted">
                {subtitle}
              </p>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-2 pt-1 border-t border-pastel-border/60">
              <span className="font-serif font-bold text-2xl sm:text-3xl text-pastel-accent">
                {priceDisplay}
              </span>
              <span className="text-[11px] sm:text-xs text-pastel-muted">
                {lang === 'en' ? 'Taxes included • Express shipping available' : 'Հարկերը ներառված են • Արագ առաքում'}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-pastel-muted">
                {lang === 'en' ? 'About this item' : 'Ապրանքի մասին'}
              </h4>
              <p className="text-xs sm:text-sm text-pastel-muted leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* Included Items Checklist (For Subscription Boxes) */}
            {item.type === 'box' && (
              <div className="space-y-2 bg-pastel-pink/20 p-3.5 sm:p-4 rounded-2xl border border-pastel-rose/30">
                <h4 className="text-xs font-bold text-pastel-text flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pastel-accent" />
                  <span>{lang === 'en' ? 'What is inside this box?' : 'Ի՞նչ կա այս տուփում'}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-pastel-text font-medium">
                  {(lang === 'en' ? itemsListEn : itemsListHy).map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-pastel-accent text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] sm:text-[11px] font-medium text-pastel-muted">
              <div className="flex items-center gap-2 bg-pastel-card p-2.5 rounded-xl border border-pastel-border/60">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'en' ? '100% Curated Quality' : '100% Երաշխավորված Որակ'}</span>
              </div>
              <div className="flex items-center gap-2 bg-pastel-card p-2.5 rounded-xl border border-pastel-border/60">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{lang === 'en' ? 'Armenia & US Delivery' : 'Առաքում ՀՀ և ԱՄՆ'}</span>
              </div>
            </div>
          </div>

          {/* Action Row: Quantity Selector & Add to Cart */}
          <div className="pt-4 border-t border-pastel-border/60 space-y-3">
            <div className="flex items-center gap-3">
              
              {/* Quantity Selector */}
              <div className="flex items-center bg-pastel-card border border-pastel-border rounded-xl p-1 shadow-xs shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg hover:bg-pastel-pink flex items-center justify-center text-pastel-text transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-xs text-pastel-text">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg hover:bg-pastel-pink flex items-center justify-center text-pastel-text transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'pastel-button-primary'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{lang === 'en' ? '✓ Added to Cart!' : '✓ Ավելացված է!'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Add to Cart' : 'Ավելացնել Զամբյուղ'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
