'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { CartItem, Currency, Language } from '@/lib/types';
import { getStoredCart, saveStoredCart } from '@/lib/store';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

interface CartProps {
  lang: Language;
  currency: Currency;
}

export const Cart: React.FC<CartProps> = ({ lang, currency }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const syncCart = useCallback(() => {
    setCart(getStoredCart());
  }, []);

  useEffect(() => {
    setMounted(true);
    syncCart();

    const handleUpdate = () => syncCart();
    window.addEventListener('girqbox-cart-update', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('girqbox-cart-update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [syncCart]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalUSD = cart.reduce((acc, i) => acc + i.priceUSD * i.quantity, 0);
  const totalAMD = cart.reduce((acc, i) => acc + i.priceAMD * i.quantity, 0);

  const updateQty = useCallback((id: string, delta: number) => {
    const current = getStoredCart();
    const next = current
      .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i))
      .filter((i) => i.quantity > 0);
    setCart(next);
    saveStoredCart(next);
    window.dispatchEvent(new Event('girqbox-cart-update'));
  }, []);

  const removeItem = useCallback((id: string) => {
    const current = getStoredCart();
    const next = current.filter((i) => i.id !== id);
    setCart(next);
    saveStoredCart(next);
    window.dispatchEvent(new Event('girqbox-cart-update'));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    saveStoredCart([]);
    window.dispatchEvent(new Event('girqbox-cart-update'));
  }, []);

  const handleProceedToCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
  };

  const drawerContent = (
    <div className="cart-portal-container font-sans">
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[440px] z-[9999] bg-white shadow-2xl border-l border-pastel-border transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-pastel-border bg-[#FFFDFB] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-pastel-pink flex items-center justify-center border border-pastel-rose/30 shadow-xs">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-pastel-accent" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base sm:text-lg text-pastel-text leading-tight">
                {lang === 'en' ? 'Your Shopping Cart' : 'Ձեր Գնումների Զամբյուղը'}
              </h2>
              <p className="text-[11px] sm:text-xs text-pastel-muted mt-0.5">
                {totalItems > 0
                  ? `${totalItems} ${lang === 'en' ? 'items in cart' : 'ապրանք զամբյուղում'}`
                  : lang === 'en'
                  ? 'Cart is currently empty'
                  : 'Զամբյուղը դատարկ է'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 sm:p-2 rounded-xl hover:bg-pastel-pink text-pastel-muted hover:text-pastel-text transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            /* Empty Cart View */
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-16">
              <div className="w-16 h-16 rounded-2xl bg-pastel-pink/70 flex items-center justify-center border border-pastel-rose/30 shadow-xs">
                <ShoppingBag className="w-7 h-7 text-pastel-accent" />
              </div>
              <div>
                <p className="font-serif font-bold text-lg text-pastel-text">
                  {lang === 'en' ? 'Your cart is empty' : 'Ձեր զամբյուղը դատարկ է'}
                </p>
                <p className="text-xs text-pastel-muted mt-1 max-w-xs leading-relaxed">
                  {lang === 'en'
                    ? 'Explore our curated books, scented candles, and wooden bookmarks to add items to your cart.'
                    : 'Ընտրեք գրքեր կամ աքսեսուարներ մեր կատալոգից և ավելացրեք զամբյուղ:'}
                </p>
              </div>
            </div>
          ) : (
            /* Cart Items List */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-pastel-muted pb-1">
                <span>{lang === 'en' ? 'Selected Items' : 'Ընտրված Ապրանքներ'}</span>
                <button onClick={clearCart} className="text-red-500 hover:underline">
                  {lang === 'en' ? 'Clear all' : 'Մաքրել բոլորը'}
                </button>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2.5 sm:gap-3 bg-pastel-card p-3 sm:p-3.5 rounded-2xl border border-pastel-border shadow-xs hover:border-pastel-rose/40 transition-colors"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-pastel-pink flex items-center justify-center text-lg sm:text-xl flex-shrink-0 border border-pastel-rose/30">
                    {item.type === 'book' ? '📖' : item.type === 'box' ? '🎁' : '🕯️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-pastel-text truncate">
                      {lang === 'en' ? item.nameEn : item.nameHy}
                    </p>
                    <p className="text-xs text-pastel-accent font-semibold mt-0.5">
                      {currency === 'USD'
                        ? `$${(item.priceUSD * item.quantity).toFixed(2)}`
                        : `֏${(item.priceAMD * item.quantity).toLocaleString()}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-pastel-pink hover:bg-pastel-rose/60 flex items-center justify-center text-pastel-text transition-colors"
                      title="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-pastel-pink hover:bg-pastel-rose/60 flex items-center justify-center text-pastel-text transition-colors"
                      title="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 ml-0.5 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Total & Checkout Action */}
        {cart.length > 0 && (
          <div className="border-t border-pastel-border p-4 sm:p-6 space-y-3.5 sm:space-y-4 bg-pastel-card shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-pastel-muted font-medium block">
                  {lang === 'en' ? 'Estimated Total' : 'Ընդհանուր Արժեք'}
                </span>
                <span className="text-[10px] text-emerald-700 font-medium">
                  {lang === 'en' ? 'Free worldwide shipping included' : 'Ներառյալ անվճար առաքումը'}
                </span>
              </div>
              <span className="font-serif font-bold text-xl sm:text-2xl text-pastel-accent">
                {currency === 'USD' ? `$${totalUSD.toFixed(2)}` : `֏${totalAMD.toLocaleString()}`}
              </span>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 sm:py-4 rounded-2xl pastel-button-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs group"
            >
              <span>{lang === 'en' ? 'Proceed to Payment' : 'Անցնել Վճարման'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Header Cart Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-pastel-card hover:bg-pastel-pink border border-pastel-border/80 transition-all duration-200 shadow-xs hover:shadow-sm group shrink-0"
        title={lang === 'en' ? 'Shopping Cart' : 'Գնումների Զամբյուղ'}
      >
        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pastel-text group-hover:scale-105 transition-transform" />
        {mounted && totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-4.5 sm:min-w-[20px] sm:h-5 px-1 bg-pastel-accent text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs border-2 border-white animate-fade-in">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>

      {mounted && typeof document !== 'undefined' ? createPortal(drawerContent, document.body) : null}
    </>
  );
};

export function addToCart(item: CartItem) {
  if (typeof window === 'undefined') return;
  const current = getStoredCart();
  const existing = current.find((i) => i.id === item.id);
  const next = existing
    ? current.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
    : [...current, { ...item, quantity: 1 }];
  saveStoredCart(next);
  window.dispatchEvent(new Event('girqbox-cart-update'));
}
