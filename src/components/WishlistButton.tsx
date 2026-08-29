'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Language } from '@/lib/types';
import { getStoredWishlist, saveStoredWishlist } from '@/lib/store';
import { Heart } from 'lucide-react';

interface WishlistButtonProps {
  itemId: string;
  nameEn: string;
  nameHy: string;
  priceUSD: number;
  priceAMD: number;
  type: 'book' | 'product';
  lang: Language;
  size?: 'sm' | 'md';
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  itemId, nameEn, nameHy, priceUSD, priceAMD, type, lang, size = 'sm'
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const wishlist = getStoredWishlist();
    setIsWishlisted(wishlist.some(w => w.id === itemId));
  }, [itemId]);

  const toggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const wishlist = getStoredWishlist();
    const exists = wishlist.some(w => w.id === itemId);
    const next = exists
      ? wishlist.filter(w => w.id !== itemId)
      : [...wishlist, { id: itemId, type, nameEn, nameHy, priceUSD, priceAMD }];
    saveStoredWishlist(next);
    setIsWishlisted(!exists);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
  }, [itemId, type, nameEn, nameHy, priceUSD, priceAMD]);

  const sizeClass = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      onClick={toggle}
      title={
        isWishlisted
          ? (lang === 'en' ? 'Remove from wishlist' : 'Հեռացնել ցանկությունների ցանկից')
          : (lang === 'en' ? 'Add to wishlist' : 'Ավելացնել ցանկությունների ցանկ')
      }
      className={`${sizeClass} rounded-xl flex items-center justify-center border transition-all duration-200 ${
        isWishlisted
          ? 'bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100'
          : 'bg-pastel-card border-pastel-border text-pastel-muted hover:bg-pastel-pink hover:text-rose-400'
      } ${animating ? 'scale-125' : 'scale-100'}`}
    >
      <Heart className={`${iconSize} ${isWishlisted ? 'fill-current' : ''} transition-transform`} />
    </button>
  );
};
