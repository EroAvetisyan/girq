'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Heart, Leaf, ArrowLeft, Globe, Package } from 'lucide-react';
import { Language } from '@/lib/types';

export default function AboutPage() {
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-[#FFFDFB] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pastel-border shadow-xs px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pastel-card hover:bg-pastel-pink text-xs font-semibold text-pastel-text border border-pastel-border transition-all"
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

      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-pink/30 via-white to-pastel-lavender/30 -z-10" />
        <div className="absolute top-10 left-10 w-48 h-48 bg-pastel-rose/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-pastel-sage/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white border border-pastel-border px-4 py-2 rounded-full text-xs font-semibold text-pastel-text shadow-xs">
            <Heart className="w-4 h-4 text-pastel-accent" />
            <span>{lang === 'en' ? 'Our Story' : 'Մեր Պատմությունը'}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-pastel-text leading-tight">
            {lang === 'en' ? (
              <>
                We believe every book<br />
                <span className="text-pastel-accent">deserves a cozy home</span>
              </>
            ) : (
              <>
                Յուրաքանչյուր գիրք<br />
                <span className="text-pastel-accent">արժանի է ջերմ անկյան</span>
              </>
            )}
          </h1>
          <p className="text-sm sm:text-base text-pastel-muted leading-relaxed max-w-2xl mx-auto">
            {lang === 'en'
              ? 'GirqBox was born from a deep love of Armenian literature, cozy reading corners, and the belief that books should be celebrated — not just read.'
              : 'GirqBox-ը ստեղծվել է հայ գրականության, ջերմ ընթերցանության անկյունների և այն համոզմունքի շնորհիվ, որ գրքերը պետք է ոչ միայն կարդալ, այլև վայելել:'}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 max-w-4xl mx-auto px-4 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pastel-text">
              {lang === 'en' ? 'How it all began 🌱' : 'Ինչպե՞ս սկսվեց ամեն ինչ 🌱'}
            </h2>
            <p className="text-pastel-muted leading-relaxed text-xs sm:text-sm">
              {lang === 'en'
                ? 'GirqBox started in a small apartment in Yerevan, where two book-loving friends would spend Sunday afternoons brewing Armenian mountain tea, lighting handmade candles, and reading aloud to each other.'
                : 'GirqBox-ի գաղափարը ծնվեց Երևանում, որտեղ ընթերցասեր ընկերները կիրակնօրյա երեկոները միասին համտեսում էին լեռնային բուրավետ թեյ, վառում սոյայի մոմեր և ընթերցում:'}
            </p>
            <p className="text-pastel-muted leading-relaxed text-xs sm:text-sm">
              {lang === 'en'
                ? 'When one of us moved to Los Angeles, we realized how much the Armenian diaspora yearned for this same cozy, bookish experience. So we decided to package it up and share it across the ocean.'
                : 'Երբ մեր ընկերներից մեկը տեղափոխվեց Լոս Անջելես, մենք հասկացանք, թե որքան մեծ կարոտ կա սփյուռքում հայկական ջերմության ու գրականության նկատմամբ: Այդպես ծնվեց GirqBox-ը:'}
            </p>
            <p className="text-pastel-accent leading-relaxed text-xs sm:text-sm font-serif italic">
              {lang === 'en'
                ? '“Every box we send is a little piece of Armenia — a soft reminder that home is wherever you have a good book.”'
                : '«Յուրաքանչյուր տուփ Հայաստանի մի ջերմ մասնիկ է՝ հիշեցում, որ տունն այնտեղ է, որտեղ կա լավ գիրք:»'}
            </p>
          </div>

          <div className="bg-gradient-to-b from-pastel-pink/40 to-pastel-sage/30 rounded-3xl p-6 sm:p-8 border border-pastel-border shadow-xl text-center space-y-6">
            <div className="text-5xl">📚</div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white rounded-2xl p-4 border border-pastel-border shadow-xs">
                <p className="font-serif font-bold text-2xl sm:text-3xl text-pastel-accent">500+</p>
                <p className="text-[11px] text-pastel-muted font-medium">
                  {lang === 'en' ? 'Happy Readers' : 'Ընթերցասերներ'}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-pastel-border shadow-xs">
                <p className="font-serif font-bold text-2xl sm:text-3xl text-pastel-accent">2</p>
                <p className="text-[11px] text-pastel-muted font-medium">
                  {lang === 'en' ? 'Countries' : 'Երկրներ (🇦🇲 & 🇺🇸)'}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-pastel-border shadow-xs">
                <p className="font-serif font-bold text-2xl sm:text-3xl text-pastel-accent">0</p>
                <p className="text-[11px] text-pastel-muted font-medium">
                  {lang === 'en' ? 'Duplicates Sent' : 'Կրկնվող Գրքեր'}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-pastel-border shadow-xs">
                <p className="font-serif font-bold text-2xl sm:text-3xl text-pastel-accent">100%</p>
                <p className="text-[11px] text-pastel-muted font-medium">
                  {lang === 'en' ? 'Handcrafted Love' : 'Սիրով Պատրաստված'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 bg-pastel-card border-y border-pastel-border">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pastel-text">
              {lang === 'en' ? 'Our Values' : 'Մեր Արժեքները'}
            </h2>
            <p className="text-pastel-muted text-xs sm:text-sm">
              {lang === 'en'
                ? 'The principles that guide every box we curate'
                : 'Սկզբունքները, որոնցով մենք առաջնորդվում ենք'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: BookOpen,
                color: 'bg-rose-100 text-rose-700',
                border: 'border-rose-200',
                titleEn: '🇦🇲 Armenian Heritage',
                titleHy: '🇦🇲 Հայկական Ժառանգություն',
                descEn: 'Every box celebrates Armenian culture, language, and craft. We source locally and support native creators.',
                descHy: 'Յուրաքանչյուր տուփ ընդգծում է հայկական մշակույթն ու արվեստը՝ աջակցելով տեղական վարպետներին:',
              },
              {
                icon: Heart,
                color: 'bg-purple-100 text-purple-700',
                border: 'border-purple-200',
                titleEn: '📖 Curated With Care',
                titleHy: '📖 Խնամքով Ընտրված',
                descEn: 'We read and inspect every book before putting it into a box. Every reader receives a truly personalized experience.',
                descHy: 'Մենք անձամբ ծանոթանում ենք յուրաքանչյուր գրքի հետ, որպեսզի ընտրությունը լինի կատարյալ:',
              },
              {
                icon: Leaf,
                color: 'bg-emerald-100 text-emerald-700',
                border: 'border-emerald-200',
                titleEn: '🌱 Eco-Conscious Packaging',
                titleHy: '🌱 Էկոլոգիական Մոտեցում',
                descEn: 'We use natural materials, soy wax, real wood, and recyclable packaging.',
                descHy: 'Օգտագործում ենք բնական նյութեր՝ սոյայի մոմ, փայտ և վերամշակվող տուփեր:',
              },
            ].map((v, i) => (
              <div
                key={i}
                className={`bg-white border ${v.border} rounded-2xl p-5 space-y-3 shadow-xs hover:-translate-y-1 transition-transform`}
              >
                <div className={`w-10 h-10 rounded-xl ${v.color} flex items-center justify-center`}>
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-pastel-text">
                  {lang === 'en' ? v.titleEn : v.titleHy}
                </h3>
                <p className="text-xs text-pastel-muted leading-relaxed">
                  {lang === 'en' ? v.descEn : v.descHy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-r from-pastel-pink/40 to-pastel-lavender/40 border-t border-pastel-border text-center space-y-5">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pastel-text">
          {lang === 'en' ? 'Ready to join our reading family?' : 'Պատրա՞ստ եք միանալ մեր ընթերցասերների ընտանիքին:'}
        </h2>
        <p className="text-pastel-muted text-xs sm:text-sm max-w-md mx-auto">
          {lang === 'en'
            ? 'Pick your box, tell us your reading preferences, and let us send you a little piece of bookish joy.'
            : 'Ընտրեք Ձեր տուփը, լրացրեք հարցաշարը և ստացեք Ձեր անհատական գրքային տուփը:'}
        </p>
        <Link
          href="/#boxes-section"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl pastel-button-primary font-bold text-xs sm:text-sm shadow-xs"
        >
          <Package className="w-4 h-4" />
          <span>{lang === 'en' ? 'Choose Your Box' : 'Ընտրել Տուփը'}</span>
        </Link>
      </section>

      {/* Footer */}
      <div className="py-4 text-center text-xs text-pastel-muted border-t border-pastel-border">
        © {new Date().getFullYear()} GirqBox · {lang === 'en' ? 'Made with love in Armenia & America' : 'Պատրաստված է սիրով Հայաստանում և Ամերիկայում'}
      </div>
    </div>
  );
}
