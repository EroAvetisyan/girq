'use client';

import React from 'react';
import { Language, Currency, SubscriptionBox } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import { Check, Sparkles, Star, Package, BookOpen, Flame, Heart } from 'lucide-react';

interface SubscriptionBoxesProps {
  lang: Language;
  currency: Currency;
  boxes: SubscriptionBox[];
  onSelectBox: (boxId: string) => void;
}

export const SubscriptionBoxes: React.FC<SubscriptionBoxesProps> = ({
  lang,
  currency,
  boxes,
  onSelectBox,
}) => {
  return (
    <section id="boxes-section" className="py-16 lg:py-24 bg-[#FFFBF7]/60 border-y border-pastel-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-pastel-pink/80 border border-pastel-rose/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-pastel-text">
            <Package className="w-4 h-4 text-pastel-accent" />
            <span>{getTranslation(lang, 'boxesSectionTitle')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-pastel-text">
            {getTranslation(lang, 'boxesSectionTitle')}
          </h2>

          <p className="text-base text-pastel-muted font-light leading-relaxed">
            {getTranslation(lang, 'boxesSectionSubtitle')}
          </p>
        </div>

        {/* Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          {boxes.map((box) => {
            const isPopular = box.isPopular;
            const priceDisplay =
              currency === 'USD'
                ? `$${box.priceUSD.toFixed(2)}`
                : `֏${box.priceAMD.toLocaleString()}`;

            const items = lang === 'en' ? box.itemsEn : box.itemsHy;
            const boxName = lang === 'en' ? box.nameEn : box.nameHy;
            const boxDesc = lang === 'en' ? box.descriptionEn : box.descriptionHy;
            const badge = lang === 'en' ? (box.badgeEn || box.nameEn) : (box.badgeHy || box.nameHy);

            return (
              <div
                key={box.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F5] to-[#FAF0E6] border-2 border-pastel-accent/60 shadow-xl scale-[1.02]'
                    : 'bg-pastel-card border border-pastel-border shadow-md hover:shadow-lg'
                }`}
              >
                {/* Popular Ribbon / Badge */}
                {isPopular && (
                  <div className="absolute -top-4 right-8 bg-gradient-to-r from-pastel-accent to-rose-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{getTranslation(lang, 'popularBadge')}</span>
                  </div>
                )}

                <div>
                  {/* Top Badge */}
                  <div className="inline-block bg-pastel-pink/90 text-pastel-text text-xs font-semibold px-3 py-1 rounded-xl mb-4 border border-pastel-rose/30">
                    {badge}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-pastel-text mb-3">
                    {boxName}
                  </h3>

                  <p className="text-sm text-pastel-muted font-light mb-6 leading-relaxed">
                    {boxDesc}
                  </p>

                  {/* Pricing Header */}
                  <div className="flex items-baseline space-x-2 bg-white/70 p-4 rounded-2xl border border-pastel-border/60 mb-6">
                    <span className="font-serif text-4xl font-bold text-pastel-text tracking-tight">
                      {priceDisplay}
                    </span>
                    <span className="text-xs text-pastel-muted font-medium">
                      {getTranslation(lang, 'pricePerMonth')}
                    </span>
                    <span className="ml-auto text-[11px] bg-pastel-sage/70 px-2.5 py-1 rounded-lg text-pastel-text font-medium">
                      {box.itemCount} {lang === 'en' ? 'Curated Items' : 'Նվերներ'}
                    </span>
                  </div>

                  {/* Included Items Checklist */}
                  <div className="space-y-3 mb-8">
                    <h4 className="text-xs uppercase tracking-wider text-pastel-muted font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pastel-accent" />
                      {getTranslation(lang, 'itemsIncludedLabel')}
                    </h4>
                    
                    <ul className="space-y-2.5 text-sm text-pastel-text">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-pastel-pink flex items-center justify-center shrink-0 mt-0.5 border border-pastel-rose/40">
                            <Check className="w-3 h-3 text-pastel-accent" />
                          </div>
                          <span className="leading-snug text-xs sm:text-sm font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Subscribe CTA Button */}
                <button
                  onClick={() => onSelectBox(box.id)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    isPopular
                      ? 'pastel-button-primary'
                      : 'bg-pastel-text text-white hover:bg-pastel-text/90 shadow-md'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>{getTranslation(lang, 'subscribeBtn')} ({boxName})</span>
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
