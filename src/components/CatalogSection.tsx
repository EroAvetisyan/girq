'use client';

import React, { useState } from 'react';
import { Language, Currency, CatalogProduct } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import { Flame, Bookmark, BookOpen, Coffee, ShoppingBag, Plus, Check, Eye } from 'lucide-react';
import { addToCart } from '@/components/Cart';
import { DetailItem } from '@/components/ItemDetailModal';

interface CatalogSectionProps {
  lang: Language;
  currency: Currency;
  products: CatalogProduct[];
  onViewDetail?: (item: DetailItem) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  lang,
  currency,
  products,
  onViewDetail,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-600" />;
      case 'Bookmark':
        return <Bookmark className="w-5 h-5 text-rose-500" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-emerald-600" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-700" />;
      default:
        return <ShoppingBag className="w-5 h-5 text-pastel-accent" />;
    }
  };

  const handleAddProduct = (prod: CatalogProduct) => {
    addToCart({
      id: prod.id,
      type: 'product',
      nameEn: prod.nameEn,
      nameHy: prod.nameHy,
      priceUSD: prod.priceUSD,
      priceAMD: prod.priceAMD,
      quantity: 1,
      image: prod.image,
    });
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-pastel-pink/80 border border-pastel-rose/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-pastel-text shadow-xs">
            <ShoppingBag className="w-4 h-4 text-pastel-accent" />
            <span>{getTranslation(lang, 'navCatalog')}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-pastel-text leading-tight">
            {lang === 'en' ? 'Cozy Standalone Goods & Add-Ons' : 'Առանձին Ապրանքներ և Աքսեսուարներ'}
          </h2>

          <p className="text-xs sm:text-base text-pastel-muted font-light px-2">
            {lang === 'en'
              ? 'Handcrafted items available individually or as add-ons to your monthly box.'
              : 'Ձեռագործ ապրանքներ, որոնք կարող եք ձեռք բերել առանձին կամ ավելացնել Ձեր տուփին:'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {products.map((prod) => {
            const prodName = lang === 'en' ? prod.nameEn : prod.nameHy;
            const prodCategory = lang === 'en' ? prod.categoryEn : prod.categoryHy;
            const prodDesc = lang === 'en' ? prod.descriptionEn : prod.descriptionHy;
            const isJustAdded = addedId === prod.id;
            const priceDisplay =
              currency === 'USD'
                ? `$${prod.priceUSD.toFixed(2)}`
                : `֏${prod.priceAMD.toLocaleString()}`;

            return (
              <div
                key={prod.id}
                className="bg-white border border-pastel-border rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  {/* Photo Container */}
                  <div
                    onClick={() => onViewDetail && onViewDetail({ type: 'product', data: prod })}
                    className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-pastel-pink/20 border border-pastel-border/60 shadow-xs cursor-pointer"
                  >
                    {prod.image ? (
                      <img
                        src={prod.image}
                        alt={prodName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-pastel-card">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-pastel-border flex items-center justify-center shadow-xs">
                          {getIcon(prod.iconName)}
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-white/90 backdrop-blur-md text-pastel-text text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                        <Eye className="w-3.5 h-3.5 text-pastel-accent" />
                        <span>{lang === 'en' ? 'Quick View' : 'Մանրամասներ'}</span>
                      </span>
                    </div>

                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-pastel-text shadow-xs border border-white/50">
                      {prodCategory}
                    </span>
                  </div>

                  <h3
                    onClick={() => onViewDetail && onViewDetail({ type: 'product', data: prod })}
                    className="font-serif font-bold text-base text-pastel-text group-hover:text-pastel-accent transition-colors mb-1 line-clamp-1 cursor-pointer"
                  >
                    {prodName}
                  </h3>

                  <p className="text-xs text-pastel-muted font-light mb-4 leading-relaxed line-clamp-2">
                    {prodDesc}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-pastel-border/60 pt-3">
                  <span className="font-serif font-bold text-base text-pastel-accent">
                    {priceDisplay}
                  </span>
                  <button
                    onClick={() => handleAddProduct(prod)}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all shadow-xs shrink-0 ${
                      isJustAdded
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-pastel-sage hover:bg-pastel-sageHover border-pastel-sageHover text-pastel-text'
                    }`}
                  >
                    {isJustAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isJustAdded ? (lang === 'en' ? 'Added!' : 'Ավելացված է!') : (lang === 'en' ? 'Add' : 'Ավելացնել')}</span>
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
