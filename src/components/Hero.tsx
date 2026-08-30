'use client';

import React, { useState, useEffect } from 'react';
import { Language, Currency } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import { BookOpen, Flame, Sparkles, Heart, Gift, ArrowRight, Clock } from 'lucide-react';

interface HeroProps {
  lang: Language;
  currency: Currency;
  onExploreBoxes: () => void;
  onStartQuiz: () => void;
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const getNextShipDate = () => {
      const now = new Date();
      const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      return next;
    };

    const update = () => {
      const now = new Date();
      const target = getNextShipDate();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

export const Hero: React.FC<HeroProps> = ({ lang, onExploreBoxes, onStartQuiz }) => {
  const { days, hours, minutes, seconds } = useCountdown();

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section suppressHydrationWarning className="relative py-10 sm:py-14 lg:py-20 overflow-hidden">
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-pastel-pink/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pastel-sage/60 rounded-full blur-3xl -z-10" />

      <div suppressHydrationWarning className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div suppressHydrationWarning className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column */}
          <div suppressHydrationWarning className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left reveal-on-scroll">

            {/* Delivery Badge */}
            <div className="inline-flex items-center space-x-2 bg-pastel-card border border-pastel-border px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-pastel-text shadow-xs">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pastel-accent" />
              <span>{getTranslation(lang, 'deliveryBanner')}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-pastel-text leading-tight sm:leading-tight">
              {getTranslation(lang, 'heroTitle')}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base lg:text-lg text-pastel-muted font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {getTranslation(lang, 'heroSubtitle')}
            </p>

            {/* Feature Pills */}
            <div suppressHydrationWarning className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pastel-pink/80 border border-pastel-rose/40 text-[11px] sm:text-xs font-medium text-pastel-text shadow-xs">
                <BookOpen className="w-3.5 h-3.5 text-pastel-accent" />
                <span>{lang === 'en' ? 'Handpicked Literature' : 'Ընտրված Գրականություն'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pastel-sage/80 border border-pastel-sageHover text-[11px] sm:text-xs font-medium text-pastel-text shadow-xs">
                <Flame className="w-3.5 h-3.5 text-amber-600/80" />
                <span>{lang === 'en' ? 'Soy Candles & Bookmarks' : 'Սոյայի Մոմեր և Էջանիշեր'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pastel-yellow border border-amber-200 text-[11px] sm:text-xs font-medium text-pastel-text shadow-xs">
                <Gift className="w-3.5 h-3.5 text-amber-700/80" />
                <span>{lang === 'en' ? 'No Duplicate Guarantee' : 'Կրկնօրինակման Բացառում'}</span>
              </span>
            </div>

            {/* Countdown Timer */}
            <div suppressHydrationWarning className="inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-2.5 sm:gap-3 bg-white border border-pastel-border rounded-2xl px-4 py-2.5 sm:px-5 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-pastel-muted font-medium">
                <Clock className="w-3.5 h-3.5 text-pastel-accent flex-shrink-0" />
                <span>{lang === 'en' ? 'Next box ships in:' : 'Հաջորդ տուփի առաքումը՝'}</span>
              </div>
              <div className="flex items-center gap-1 font-serif font-bold text-pastel-text">
                <span className="bg-pastel-pink px-2 py-0.5 rounded-lg text-xs sm:text-sm">{pad(days)}{lang === 'en' ? 'd' : 'օր'}</span>
                <span className="text-pastel-muted">:</span>
                <span className="bg-pastel-pink px-2 py-0.5 rounded-lg text-xs sm:text-sm">{pad(hours)}{lang === 'en' ? 'h' : 'ժ'}</span>
                <span className="text-pastel-muted">:</span>
                <span className="bg-pastel-pink px-2 py-0.5 rounded-lg text-xs sm:text-sm">{pad(minutes)}{lang === 'en' ? 'm' : 'ր'}</span>
                <span className="text-pastel-muted">:</span>
                <span className="bg-pastel-rose/40 px-2 py-0.5 rounded-lg text-xs sm:text-sm">{pad(seconds)}{lang === 'en' ? 's' : 'վ'}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreBoxes}
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl pastel-button-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 group"
              >
                <span>{getTranslation(lang, 'heroCta')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onStartQuiz}
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl pastel-button-secondary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-pastel-accent" />
                <span>{getTranslation(lang, 'heroQuizCta')}</span>
              </button>
            </div>
          </div>

          {/* Right Column - Box Card Illustration */}
          <div suppressHydrationWarning className="lg:col-span-5 relative flex justify-center reveal-on-scroll mt-4 lg:mt-0">
            <div suppressHydrationWarning className="relative w-full max-w-md bg-gradient-to-b from-[#FFFDF9] to-[#FFF5EE] p-5 sm:p-8 rounded-3xl border border-pastel-border shadow-xl space-y-5 sm:space-y-6">
              <div suppressHydrationWarning className="flex items-center justify-between border-b border-pastel-border/60 pb-3 sm:pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-300" />
                  <div className="w-3 h-3 rounded-full bg-emerald-200" />
                  <div className="w-3 h-3 rounded-full bg-amber-200" />
                </div>
                <span className="text-xs font-serif italic text-pastel-muted">
                  {lang === 'en' ? 'Curated Monthly Box' : 'Ամսական Տուփ'}
                </span>
              </div>

              <div suppressHydrationWarning className="space-y-3.5 sm:space-y-4">
                <div suppressHydrationWarning className="bg-pastel-pink/40 p-3.5 sm:p-4 rounded-2xl border border-pastel-pink flex items-center gap-3.5">
                  <div className="w-11 h-14 sm:w-12 sm:h-16 bg-gradient-to-tr from-rose-200 to-pink-100 rounded-lg shadow-xs border border-rose-300/40 flex items-center justify-center font-serif font-bold text-xs text-pastel-text text-center p-1 shrink-0">
                    📖 Book
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-pastel-text">
                      {lang === 'en' ? 'Hand-Selected Novel' : 'Ընտրված Վեպ'}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-pastel-muted">
                      {lang === 'en' ? 'Matched to your reading quiz' : 'Ըստ ձեր հարցաշարի նախասիրությունների'}
                    </p>
                  </div>
                </div>

                <div suppressHydrationWarning className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="bg-pastel-sage/50 p-2.5 sm:p-3 rounded-xl border border-pastel-sage flex items-center gap-2">
                    <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600/80 shrink-0" />
                    <span className="text-xs font-medium text-pastel-text">
                      {lang === 'en' ? 'Soy Candle' : 'Սոյայի Մոմ'}
                    </span>
                  </div>
                  <div className="bg-pastel-yellow p-2.5 sm:p-3 rounded-xl border border-amber-200/60 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700/80 shrink-0" />
                    <span className="text-xs font-medium text-pastel-text">
                      {lang === 'en' ? 'Bookmark' : 'Էջանիշ'}
                    </span>
                  </div>
                </div>

                <div suppressHydrationWarning className="bg-[#FAF0E6] p-3 rounded-xl border border-pastel-border flex items-center justify-between text-xs text-pastel-text">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-4 h-4 text-pastel-accent" />
                    {lang === 'en' ? 'No Duplicates Ever' : 'Երբեք Չենք Կրկնում'}
                  </span>
                  <span className="text-emerald-700 font-bold">✓ 100% Match</span>
                </div>
              </div>

              <div className="pt-2 text-center text-xs italic text-pastel-muted border-t border-pastel-border/60">
                &quot;{lang === 'en' ? 'A reader lives a thousand lives before he dies...' : '«Ընթերցողը ապրում է հազար կյանքով, նախքան կմահանա...»'}&quot;
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
