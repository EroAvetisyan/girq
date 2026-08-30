'use client';

import React from 'react';
import { Language, Currency, SubscriptionBox } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import { Check, Sparkles, Star, Package, Heart, Eye } from 'lucide-react';
import { DetailItem } from '@/components/ItemDetailModal';

interface SubscriptionBoxesProps {
  lang: Language;
  currency: Currency;
  boxes: SubscriptionBox[];
  onSelectBox: (boxId: string) => void;
  onViewDetail?: (item: DetailItem) => void;
}

export const SubscriptionBoxes: React.FC<SubscriptionBoxesProps> = ({
  lang,
  currency,
  boxes,
  onSelectBox,
  onViewDetail,
}) => {
  return (
    <section id="boxes-section" className="py-12 sm:py-16 lg:py-24 bg-[#FFFBF7]/60 border-y border-pastel-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-pastel-pink/80 border border-pastel-rose/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-pastel-text shadow-xs">
            <Package className="w-4 h-4 text-pastel-accent" />
            <span>{getTranslation(lang, 'boxesSectionTitle')}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-pastel-text leading-tight">
            {getTranslation(lang, 'boxesSectionTitle')}
          </h2>

          <p className="text-xs sm:text-base text-pastel-muted font-light leading-relaxed px-2">
            {getTranslation(lang, 'boxesSectionSubtitle')}
          </p>
        </div>

        {/* Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
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
                className={`relative rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F5] to-[#FAF0E6] border-2 border-pastel-accent/60 shadow-xl md:scale-[1.02]'
                    : 'bg-pastel-card border border-pastel-border shadow-md hover:shadow-lg'
                }`}
              >
                {/* Popular Ribbon / Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 right-4 sm:right-8 bg-gradient-to-r from-pastel-accent to-rose-400 text-white text-[11px] sm:text-xs font-bold px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-10">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{getTranslation(lang, 'popularBadge')}</span>
                  </div>
                )}

                <div>
                  {/* Photo Preview Container (Clickable for Detail View) */}
                  {box.image && (
                    <div
                      onClick={() => onViewDetail && onViewDetail({ type: 'box', data: box })}
                      className="relative h-44 sm:h-52 rounded-2xl overflow-hidden mb-5 border border-pastel-border/60 shadow-xs cursor-pointer group"
                    >
                      <img
                        src={box.image}
                        alt={boxName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur-md text-pastel-text text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                          <Eye className="w-3.5 h-3.5 text-pastel-accent" />
                          <span>{lang === 'en' ? 'View Details' : 'Տեսնել Մանրամասները'}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Top Badge */}
                  <div className="inline-block bg-pastel-pink/90 text-pastel-text text-xs font-semibold px-3 py-1 rounded-xl mb-3 border border-pastel-rose/30">
                    {badge}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-xl sm:text-3xl font-bold text-pastel-text mb-2 sm:mb-3">
                    {boxName}
                  </h3>

                  <p className="text-xs sm:text-sm text-pastel-muted font-light mb-5 leading-relaxed">
                    {boxDesc}
                  </p>

                  {/* Pricing Header */}
                  <div className="flex flex-wrap items-baseline gap-2 bg-white/80 p-3.5 sm:p-4 rounded-2xl border border-pastel-border/60 mb-5">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-pastel-text tracking-tight">
                      {priceDisplay}
                    </span>
                    <span className="text-xs text-pastel-muted font-medium">
                      {getTranslation(lang, 'pricePerMonth')}
                    </span>
                    <span className="ml-auto text-[10px] sm:text-[11px] bg-pastel-sage/70 px-2.5 py-1 rounded-lg text-pastel-text font-medium">
                      {box.itemCount} {lang === 'en' ? 'Curated Items' : 'Նվերներ'}
                    </span>
                  </div>

                  {/* Included Items Checklist */}
                  <div className="space-y-2.5 mb-6">
                    <h4 className="text-[11px] uppercase tracking-wider text-pastel-muted font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pastel-accent" />
                      {getTranslation(lang, 'itemsIncludedLabel')}
                    </h4>
                    
                    <ul className="space-y-2 text-xs sm:text-sm text-pastel-text">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-pastel-pink flex items-center justify-center shrink-0 mt-0.5 border border-pastel-rose/40">
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

                {/* Buttons Row: Detail View & Subscribe */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => onViewDetail && onViewDetail({ type: 'box', data: box })}
                    className="p-3.5 rounded-2xl bg-white border border-pastel-border hover:bg-pastel-pink text-pastel-text transition-all shadow-xs"
                    title={lang === 'en' ? 'View Details' : 'Տեսնել Մանրամասները'}
                  >
                    <Eye className="w-4 h-4 text-pastel-accent" />
                  </button>

                  <button
                    onClick={() => onSelectBox(box.id)}
                    className={`flex-1 py-3.5 sm:py-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                      isPopular
                        ? 'pastel-button-primary'
                        : 'bg-pastel-text text-white hover:bg-pastel-text/90 shadow-md'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    <span>{getTranslation(lang, 'subscribeBtn')}</span>
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
