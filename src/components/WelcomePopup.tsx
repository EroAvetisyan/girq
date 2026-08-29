'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/lib/types';
import { hasSeenWelcome, markWelcomeSeen, saveSubscribedEmail } from '@/lib/store';
import { X, BookOpen, Sparkles } from 'lucide-react';

interface WelcomePopupProps {
  lang: Language;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSeenWelcome()) {
        setIsVisible(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    markWelcomeSeen();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    saveSubscribedEmail(email);
    markWelcomeSeen();
    setSubmitted(true);
    setTimeout(() => setIsVisible(false), 2500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="relative bg-white rounded-3xl shadow-2xl border border-pastel-border max-w-md w-full overflow-hidden">
        {/* Decorative top band */}
        <div className="h-2 w-full bg-gradient-to-r from-pastel-pink via-pastel-rose to-pastel-lavender" />

        <div className="p-7 sm:p-8 space-y-5">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-pastel-pink transition-all"
            title="Close"
          >
            <X className="w-4 h-4 text-pastel-muted" />
          </button>

          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pastel-pink to-pastel-rose flex items-center justify-center shadow-xs border border-pastel-rose/30">
              <BookOpen className="w-7 h-7 text-pastel-text" />
            </div>
          </div>

          {!submitted ? (
            <>
              {/* Headline */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-pastel-yellow border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{lang === 'en' ? 'Welcome Gift — 10% OFF' : 'Բարի Գալուստ — 10% Զեղչ'}</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-pastel-text">
                  {lang === 'en' ? 'Your first cozy box awaits! 🌸' : 'Ձեր առաջին ջերմ տուփը սպասում է 🌸'}
                </h2>
                <p className="text-xs sm:text-sm text-pastel-muted leading-relaxed">
                  {lang === 'en'
                    ? 'Subscribe to our newsletter and receive 10% off your very first GirqBox subscription.'
                    : 'Բաժանորդագրվեք մեր նորություններին և ստացեք 10% զեղչ Ձեր առաջին GirqBox տուփի պատվերի համար:'}
                </p>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'en' ? 'your@email.com' : 'Ձեր@էլ.փոստ.com'}
                  className="w-full px-4 py-3 rounded-xl border border-pastel-border bg-pastel-card text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-rose"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl pastel-button-primary font-bold text-xs sm:text-sm shadow-xs"
                >
                  {lang === 'en' ? '🎁 Claim My 10% Discount' : '🎁 Ստանալ Իմ 10% Զեղչը'}
                </button>
              </form>

              <button
                onClick={handleClose}
                className="w-full text-center text-xs text-pastel-muted hover:text-pastel-text transition-colors"
              >
                {lang === 'en' ? "No thanks, I'll continue browsing" : 'Ոչ, շնորհակալություն, շարունակել դիտել'}
              </button>
            </>
          ) : (
            <div className="text-center space-y-3 py-4">
              <div className="text-4xl">🎉</div>
              <h3 className="font-serif text-xl font-bold text-pastel-text">
                {lang === 'en' ? "You're all set!" : 'Շնորհավորում ենք!'}
              </h3>
              <p className="text-xs sm:text-sm text-pastel-muted">
                {lang === 'en'
                  ? 'Your 10% discount code has been applied. Happy reading!'
                  : 'Ձեր 10% զեղչը գրանցված է: Մաղթում ենք հաճելի ընթերցանություն:'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
