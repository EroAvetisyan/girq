'use client';

import React, { useState, useEffect } from 'react';
import { Language, Currency } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import { BookOpen, Globe, Menu, X } from 'lucide-react';
import { Cart } from '@/components/Cart';
import Link from 'next/link';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onScrollToQuiz: () => void;
  onScrollToBoxes: () => void;
  onScrollToBookstore: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  currency,
  setCurrency,
  onScrollToQuiz,
  onScrollToBoxes,
  onScrollToBookstore,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      suppressHydrationWarning
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-pastel-border/80'
          : 'bg-[#FFFEFC]/95 backdrop-blur-sm border-b border-pastel-border/60'
      }`}
    >
      <div
        suppressHydrationWarning
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4"
      >
        {/* Left: Brand Logo & Title */}
        <div
          suppressHydrationWarning
          className="flex items-center space-x-2 sm:space-x-3 cursor-pointer shrink-0 group select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-pastel-pink to-pastel-rose flex items-center justify-center shadow-xs border border-pastel-rose/30 group-hover:scale-105 transition-transform duration-200">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-pastel-text" />
          </div>
          <div>
            <div className="flex items-center space-x-1 sm:space-x-1.5 leading-none">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-pastel-text">
                Girq<span className="text-pastel-accent">Box</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold bg-pastel-pink text-pastel-text px-1.5 py-0.5 rounded-full border border-pastel-rose/30">
                AM & US
              </span>
            </div>
            <p className="text-[10px] text-pastel-muted font-light mt-0.5 hidden sm:block">
              {getTranslation(lang, 'tagline')}
            </p>
          </div>
        </div>

        {/* Center: Clean & Elegant Desktop Navigation */}
        <nav
          suppressHydrationWarning
          className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-pastel-text/90"
        >
          <button
            onClick={onScrollToBoxes}
            className="hover:text-pastel-accent transition-colors whitespace-nowrap py-1 px-1.5 relative hover:opacity-80"
          >
            {getTranslation(lang, 'navBoxes')}
          </button>

          <button
            onClick={onScrollToBookstore}
            className="hover:text-pastel-accent transition-colors whitespace-nowrap py-1 px-1.5 relative hover:opacity-80"
          >
            {getTranslation(lang, 'navStore')}
          </button>

          <button
            onClick={onScrollToQuiz}
            className="hover:text-pastel-accent transition-colors whitespace-nowrap py-1 px-1.5 relative hover:opacity-80"
          >
            {getTranslation(lang, 'navQuiz')}
          </button>

          <Link
            href="/track"
            className="hover:text-pastel-accent transition-colors whitespace-nowrap py-1 px-1.5 relative hover:opacity-80"
          >
            {getTranslation(lang, 'navTrack')}
          </Link>

          <Link
            href="/about"
            className="hover:text-pastel-accent transition-colors whitespace-nowrap py-1 px-1.5 relative hover:opacity-80"
          >
            {getTranslation(lang, 'navAbout')}
          </Link>
        </nav>

        {/* Right: Controls (Currency + Language + Cart) */}
        <div suppressHydrationWarning className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
          {/* Currency Toggle */}
          <div
            suppressHydrationWarning
            className="flex items-center bg-pastel-card rounded-xl p-0.5 border border-pastel-border shadow-xs"
          >
            <button
              onClick={() => setCurrency('USD')}
              className={`px-1.5 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                currency === 'USD'
                  ? 'bg-pastel-pink text-pastel-text shadow-xs'
                  : 'text-pastel-muted hover:text-pastel-text'
              }`}
            >
              $ USD
            </button>
            <button
              onClick={() => setCurrency('AMD')}
              className={`px-1.5 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                currency === 'AMD'
                  ? 'bg-pastel-pink text-pastel-text shadow-xs'
                  : 'text-pastel-muted hover:text-pastel-text'
              }`}
            >
              ֏ AMD
            </button>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hy' : 'en')}
            className="flex items-center space-x-1 bg-pastel-card hover:bg-pastel-pink px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-xs font-bold text-pastel-text border border-pastel-border transition-all shadow-xs whitespace-nowrap"
            title="Toggle Language / Փոխել Լեզուն"
          >
            <Globe className="w-3.5 h-3.5 text-pastel-accent shrink-0" />
            <span>{lang === 'en' ? '🇦🇲' : '🇺🇸'}</span>
          </button>

          {/* Cart Icon & Drawer */}
          <Cart lang={lang} currency={currency} />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-xl bg-pastel-card text-pastel-text border border-pastel-border hover:bg-pastel-pink transition-colors"
            title="Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-pastel-border px-5 py-4 space-y-2 text-sm font-semibold text-pastel-text animate-fade-in shadow-xl">
          <button
            onClick={() => {
              onScrollToBoxes();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-xl hover:bg-pastel-card transition-colors"
          >
            {lang === 'en' ? 'Subscription Boxes' : 'Բաժանորդագրության Տուփեր'}
          </button>

          <button
            onClick={() => {
              onScrollToBookstore();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-xl hover:bg-pastel-card transition-colors"
          >
            {lang === 'en' ? 'Book Store' : 'Գրքերի Խանութ'}
          </button>

          <Link
            href="/books"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-xl hover:bg-pastel-card transition-colors"
          >
            {lang === 'en' ? 'Full Book Catalog' : 'Գրքերի Կատալոգ'}
          </Link>

          <button
            onClick={() => {
              onScrollToQuiz();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-xl hover:bg-pastel-card transition-colors"
          >
            {lang === 'en' ? 'Personalize Quiz' : 'Անհատականացման Հարցաշար'}
          </button>

          <Link
            href="/track"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-xl hover:bg-pastel-card transition-colors"
          >
            {lang === 'en' ? 'Track Order' : 'Հետևել Պատվերին'}
          </Link>

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-xl hover:bg-pastel-card transition-colors"
          >
            {lang === 'en' ? 'About Us' : 'Մեր Մասին'}
          </Link>
        </div>
      )}
    </header>
  );
};
