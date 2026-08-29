'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: lang === 'en' ? 'How do you guarantee I will not receive a book I already own?' : 'Ինչպե՞ս եք երաշխավորում, որ ես չեմ ստանա իմ ունեցած գիրքը:',
      a: lang === 'en'
        ? 'In our Personalization Quiz, you can type in titles you already have in your collection. Before packing your monthly box, our curation team cross-checks your registered books so you get a fresh discovery every single month!'
        : 'Հարցաշարում Դուք կարող եք գրել Ձեր ունեցած գրքերի ցանկը: Ամեն ամիս փաթեթավորելուց առաջ մեր թիմը ստուգում է ցանկը:'
    },
    {
      q: lang === 'en' ? 'Where do you ship, and what are the rates?' : 'Ու՞ր եք առաքում և որքա՞ն է առաքման արժեքը:',
      a: lang === 'en'
        ? 'We deliver all across Armenia (free delivery in Yerevan) and to all 50 states in the USA. Shipping is calculated transparently in $ USD or ֏ AMD during checkout.'
        : 'Մենք առաքում ենք ամբողջ Հայաստանում (Երևանում անվճար) և ԱՄՆ-ի բոլոր նահանգներում:'
    },
    {
      q: lang === 'en' ? 'Can I buy individual books without subscribing?' : 'Կարո՞ղ եմ գնել առանձին գրքեր առանց բաժանորդագրության:',
      a: lang === 'en'
        ? 'Yes! We have a standalone Book Store section on our home page where you can order single books (Armenian classics, translated fiction, poetry) individually anytime.'
        : 'Այո: Մեր կայքում գործում է առանձին Գրքերի Խանութ, որտեղ կարող եք պատվիրել ցանկացած գիրք առանձին:'
    },
    {
      q: lang === 'en' ? 'Can I request books in both Armenian and English?' : 'Կարո՞ղ եմ պատվիրել գրքեր և՛ հայերեն, և՛ անգլերեն:',
      a: lang === 'en'
        ? 'Absolutely! You can choose "Bilingual Mix (EN & HY)" in your reader quiz, or select "Armenian Only" / "English Only" depending on your reading preference.'
        : 'Անշուշտ: Հարցաշարում կարող եք ընտրել Երկլեզու (Անգլերեն և Հայերեն), Միայն Հայերեն կամ Միայն Անգլերեն:'
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FFFEFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-pastel-sage/80 border border-pastel-sageHover px-3.5 py-1.5 rounded-full text-xs font-semibold text-pastel-text">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>{lang === 'en' ? 'Got Questions?' : 'Հաճախ Տրվող Հարցեր'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pastel-text">
            {lang === 'en' ? 'Frequently Asked Questions' : 'Հաճախ Տրվող Հարցեր (FAQ)'}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-pastel-border rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-serif font-bold text-base text-pastel-text gap-4 hover:bg-pastel-pink/30 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-pastel-accent shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-pastel-muted font-light leading-relaxed border-t border-pastel-border/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
