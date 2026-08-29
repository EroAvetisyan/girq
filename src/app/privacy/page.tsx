'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Trash2, Mail, Globe } from 'lucide-react';
import { Language } from '@/lib/types';

export default function PrivacyPage() {
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-[#FFFDFB] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pastel-border shadow-xs px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pastel-card hover:bg-pastel-pink text-xs font-semibold text-pastel-text border border-pastel-border transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'en' ? 'Back to Store' : 'Վերադառնալ Խանութ'}</span>
        </Link>
        <span className="font-serif text-xl font-bold text-pastel-text">
          Girq<span className="text-pastel-accent">Box</span>
        </span>
        <button
          onClick={() => setLang((l) => (l === 'en' ? 'hy' : 'en'))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pastel-card hover:bg-pastel-pink border border-pastel-border text-xs font-bold text-pastel-text shadow-xs"
        >
          <Globe className="w-3.5 h-3.5 text-pastel-accent" />
          <span>{lang === 'en' ? '🇦🇲 Հայերեն' : '🇺🇸 English'}</span>
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-pastel-sage/60 border border-pastel-sageHover flex items-center justify-center mx-auto shadow-xs">
            <Shield className="w-8 h-8 text-emerald-700" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-pastel-text">
            {lang === 'en' ? 'Privacy Policy' : 'Գաղտնիության Քաղաքականություն'}
          </h1>
          <p className="text-pastel-muted text-xs sm:text-sm">
            {lang === 'en' ? 'Last updated: August 2026' : 'Թարմացված է՝ Օգոստոս 2026'}
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6 text-xs sm:text-sm text-pastel-text leading-relaxed">
          {[
            {
              icon: Eye,
              color: 'bg-blue-50 text-blue-600 border-blue-200',
              titleEn: '1. What We Collect',
              titleHy: '1. Ի՞նչ տվյալներ ենք մենք հավաքագրում',
              contentEn:
                'We collect the following information when you subscribe to GirqBox or use our website: your full name, email address, shipping address, reading genre preferences, and a list of books you already own (to prevent duplicates). We never sell your personal data to third parties.',
              contentHy:
                'Մենք պահպանում ենք միայն անհրաժեշտ տվյալները՝ անուն, ազգանուն, էլ. փոստ, առաքման հասցե, նախընտրելի ժանրեր և Ձեր ունեցած գրքերի ցանկը (կրկնօրինակումը բացառելու համար): Մենք երբեք չենք վաճառում կամ փոխանցում Ձեր տվյալները երրորդ կողմերին:',
            },
            {
              icon: Lock,
              color: 'bg-purple-50 text-purple-600 border-purple-200',
              titleEn: '2. How We Use Your Data',
              titleHy: '2. Ինչպե՞ս ենք օգտագործում տվյալները',
              contentEn:
                'Your data is used exclusively to: (a) curate and ship your monthly book subscription box, (b) customize book selections based on your reading preferences, (c) avoid sending books you already own, and (d) send you order updates and shipping notifications.',
              contentHy:
                'Ձեր տվյալներն օգտագործվում են բացառապես գրքային տուփը ձևավորելու, անհատականացնելու, ունեցած գրքերի կրկնությունը բացառելու և առաքման մասին ծանուցումներ ուղարկելու համար:',
            },
            {
              icon: Shield,
              color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
              titleEn: '3. Data Security',
              titleHy: '3. Տվյալների Անվտանգություն',
              contentEn:
                'We store your preferences securely and use HTTPS encryption for all data transmitted through our website. Book preference data is stored locally in your browser and on our secure servers.',
              contentHy:
                'Բոլոր տվյալները փոխանցվում են պաշտպանված HTTPS կապուղով և պահպանվում են գաղտնիության խիստ սկզբունքներին համապատասխան:',
            },
            {
              icon: Trash2,
              color: 'bg-rose-50 text-rose-600 border-rose-200',
              titleEn: '4. Your Rights',
              titleHy: '4. Ձեր Իրավունքները',
              contentEn:
                'You have the right to access, modify, or completely delete your reading profile and address at any time by contacting privacy@girqbox.am.',
              contentHy:
                'Դուք ցանկացած պահի կարող եք պահանջել թարմացնել կամ ամբողջությամբ ջնջել Ձեր տվյալները՝ գրելով privacy@girqbox.am հասցեին:',
            },
          ].map((section, i) => (
            <div key={i} className="bg-white border border-pastel-border rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${section.color} border flex items-center justify-center flex-shrink-0`}>
                  <section.icon className="w-4 h-4" />
                </div>
                <h2 className="font-serif font-bold text-base sm:text-lg text-pastel-text">
                  {lang === 'en' ? section.titleEn : section.titleHy}
                </h2>
              </div>
              <p className="text-pastel-muted text-xs sm:text-sm leading-relaxed pl-12">
                {lang === 'en' ? section.contentEn : section.contentHy}
              </p>
            </div>
          ))}
        </div>

        {/* Terms of Service */}
        <div id="terms" className="pt-8 border-t border-pastel-border space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pastel-text">
              {lang === 'en' ? 'Terms of Service' : 'Օգտագործման Պայմաններ'}
            </h2>
            <p className="text-pastel-muted text-xs">
              {lang === 'en' ? 'Last updated: August 2026' : 'Թարմացված է՝ Օգոստոս 2026'}
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-pastel-muted leading-relaxed">
            <div className="bg-white border border-pastel-border rounded-2xl p-5 space-y-1.5 shadow-xs">
              <h3 className="font-bold text-pastel-text text-sm">
                {lang === 'en' ? 'Subscription Terms' : 'Բաժանորդագրության Պայմաններ'}
              </h3>
              <p>
                {lang === 'en'
                  ? 'GirqBox subscriptions renew monthly. You may pause or cancel at any time.'
                  : 'GirqBox-ի բաժանորդագրությունը թարմացվում է ամեն ամիս: Դուք կարող եք դադարեցնել այն ցանկացած պահի:'}
              </p>
            </div>
            <div className="bg-white border border-pastel-border rounded-2xl p-5 space-y-1.5 shadow-xs">
              <h3 className="font-bold text-pastel-text text-sm">
                {lang === 'en' ? 'Duplicate Book Guarantee' : 'Կրկնօրինակման Բացառման Երաշխիք'}
              </h3>
              <p>
                {lang === 'en'
                  ? 'We cross-check your registered owned books before every shipment. If we ever send a duplicate, we will replace it free of charge.'
                  : 'Մենք ստուգում ենք Ձեր ունեցած գրքերի ցանկը ամեն առաքումից առաջ: Եթե պատահաբար ուղարկվի Ձեր ունեցած գիրքը, մենք այն անվճար կփոխարինենք:'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
