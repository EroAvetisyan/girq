'use client';

import React from 'react';
import { Language } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import { Package, Heart, Sparkles, Truck } from 'lucide-react';

interface HowItWorksProps {
  lang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang }) => {
  const steps = [
    {
      icon: <Package className="w-6 h-6 text-pastel-accent" />,
      title: getTranslation(lang, 'step1Title'),
      desc: getTranslation(lang, 'step1Desc'),
      bg: 'bg-pastel-pink/70',
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: getTranslation(lang, 'step2Title'),
      desc: getTranslation(lang, 'step2Desc'),
      bg: 'bg-pastel-sage/70',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      title: getTranslation(lang, 'step3Title'),
      desc: getTranslation(lang, 'step3Desc'),
      bg: 'bg-pastel-yellow',
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-700" />,
      title: getTranslation(lang, 'step4Title'),
      desc: getTranslation(lang, 'step4Desc'),
      bg: 'bg-pastel-lavender/70',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF0E6]/50 border-t border-pastel-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-bold text-pastel-text">
            {getTranslation(lang, 'howItWorksTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm border border-pastel-border rounded-2xl p-6 relative flex flex-col items-start space-y-3 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center border border-pastel-border shadow-inner`}>
                {s.icon}
              </div>
              <span className="text-xs font-bold font-serif text-pastel-muted uppercase tracking-wider">
                {lang === 'en' ? `Step 0${idx + 1}` : `Քայլ 0${idx + 1}`}
              </span>
              <h3 className="font-serif font-bold text-lg text-pastel-text">
                {s.title}
              </h3>
              <p className="text-xs text-pastel-muted font-light leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
