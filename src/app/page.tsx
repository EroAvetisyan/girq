'use client';

import React, { useState, useEffect } from 'react';
import { Language, Currency, SubscriptionBox, CatalogProduct, BookItem, ReaderPreferenceSubmission } from '@/lib/types';
import {
  getStoredBoxes, getStoredProducts, getStoredStandaloneBooks,
  getStoredSubmissions, saveStoredSubmissions,
  INITIAL_BOXES, INITIAL_PRODUCTS, INITIAL_BOOKS, INITIAL_SUBMISSIONS,
} from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SubscriptionBoxes } from '@/components/SubscriptionBoxes';
import { BookCatalogSection } from '@/components/BookCatalogSection';
import { CatalogSection } from '@/components/CatalogSection';
import { HowItWorks } from '@/components/HowItWorks';
import { PreferenceQuiz } from '@/components/PreferenceQuiz';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { WelcomePopup } from '@/components/WelcomePopup';
import { DeliveryMap } from '@/components/DeliveryMap';
import { InstagramSection } from '@/components/InstagramSection';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');

  const [boxes, setBoxes] = useState<SubscriptionBox[]>(INITIAL_BOXES);
  const [books, setBooks] = useState<BookItem[]>(INITIAL_BOOKS);
  const [products, setProducts] = useState<CatalogProduct[]>(INITIAL_PRODUCTS);
  const [submissions, setSubmissions] = useState<ReaderPreferenceSubmission[]>(INITIAL_SUBMISSIONS);
  const [selectedBoxId, setSelectedBoxId] = useState<string>('box-deluxe');

  // Hydrate from localStorage
  useEffect(() => {
    setMounted(true);
    setBoxes(getStoredBoxes());
    setBooks(getStoredStandaloneBooks());
    setProducts(getStoredProducts());
    setSubmissions(getStoredSubmissions());
  }, []);

  // Auto-detect country by IP and set currency/lang
  useEffect(() => {
    const detected = localStorage.getItem('girqbox_country_detected');
    if (detected) return;
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        if (data.country_code === 'AM') {
          setCurrency('AMD');
          setLang('hy');
        }
        localStorage.setItem('girqbox_country_detected', 'true');
      })
      .catch(() => {/* silent fail */});
  }, []);

  // Scroll-reveal IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    const els = document.querySelectorAll('.reveal-on-scroll');
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted]);

  const handleSubmitPreference = (
    newSub: Omit<ReaderPreferenceSubmission, 'id' | 'createdAt' | 'status'>
  ) => {
    const fullSubmission: ReaderPreferenceSubmission = {
      ...newSub,
      id: `sub-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };
    const next = [fullSubmission, ...submissions];
    setSubmissions(next);
    saveStoredSubmissions(next);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Welcome popup (appears after 3s on first visit) */}
      <WelcomePopup lang={lang} />

      {/* Sticky Navbar */}
      <Navbar
        lang={lang} setLang={setLang}
        currency={currency} setCurrency={setCurrency}
        onScrollToQuiz={() => scrollTo('quiz-section')}
        onScrollToBoxes={() => scrollTo('boxes-section')}
        onScrollToBookstore={() => scrollTo('bookstore-section')}
      />

      <main className="flex-1">
        {/* Hero + Countdown */}
        <Hero
          lang={lang}
          currency={currency}
          onExploreBoxes={() => scrollTo('boxes-section')}
          onStartQuiz={() => scrollTo('quiz-section')}
        />

        {/* Subscription Boxes */}
        <div className="reveal-on-scroll">
          <SubscriptionBoxes
            lang={lang} currency={currency}
            boxes={boxes}
            onSelectBox={(boxId) => { setSelectedBoxId(boxId); scrollTo('quiz-section'); }}
          />
        </div>

        {/* How It Works */}
        <div className="reveal-on-scroll">
          <HowItWorks lang={lang} />
        </div>

        {/* Standalone Book Store */}
        <div className="reveal-on-scroll">
          <BookCatalogSection
            lang={lang} currency={currency}
            books={books}
            onOrderBook={() => scrollTo('quiz-section')}
          />
        </div>

        {/* Accessories */}
        <div className="reveal-on-scroll">
          <CatalogSection lang={lang} currency={currency} products={products} />
        </div>

        {/* Delivery Map */}
        <DeliveryMap lang={lang} />

        {/* Reader Quiz */}
        <div className="reveal-on-scroll">
          <PreferenceQuiz
            lang={lang} boxes={boxes}
            selectedBoxId={selectedBoxId}
            setSelectedBoxId={setSelectedBoxId}
            onSubmitPreference={handleSubmitPreference}
          />
        </div>

        {/* Testimonials Carousel */}
        <TestimonialsSection lang={lang} />

        {/* Instagram Feed */}
        <InstagramSection lang={lang} />

        {/* FAQ */}
        <div className="reveal-on-scroll">
          <FaqSection lang={lang} />
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
