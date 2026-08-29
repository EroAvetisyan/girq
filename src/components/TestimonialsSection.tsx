'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Language } from '@/lib/types';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialItem {
  nameEn: string;
  nameHy: string;
  locationEn: string;
  locationHy: string;
  textEn: string;
  textHy: string;
  rating: number;
  flag: string;
  avatarColor: string;
  initial: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    nameEn: 'Anahit Sargsyan',
    nameHy: 'Անահիտ Սարգսյան',
    locationEn: 'Yerevan, Armenia',
    locationHy: 'Երևան, Հայաստան',
    textEn: 'Every month I look forward to opening my GirqBox. The candles smell absolutely divine and the books are always perfectly matched to my tastes. I\'ve never received a duplicate!',
    textHy: 'Ամեն ամիս անհամբերությամբ սպասում եմ իմ GirqBox-ին: Մոմերի բույրը պարզապես հրաշալի է, իսկ գրքերը լիովին համապատասխանում են իմ ճաշակին: Երբեք կրկնվող գիրք չեմ ստացել!',
    rating: 5,
    flag: '🇦🇲',
    avatarColor: 'bg-rose-200',
    initial: 'Ա'
  },
  {
    nameEn: 'Emma Wilson',
    nameHy: 'Էմմա Վիլսոն',
    locationEn: 'Los Angeles, CA',
    locationHy: 'Լոս Անջելես, Կալիֆոռնիա',
    textEn: 'I subscribed to the Deluxe Box and it\'s simply magical. The Armenian wooden bookmark I received is now my most treasured possession. Highly recommend to any book lover!',
    textHy: 'Բաժանորդագրվել եմ Deluxe տուփին, և այն պարզապես կախարդական է: Ձեռագործ փայտյա հայկական էջանիշը դարձել է իմ ամենասիրելի իրը: Խորհուրդ եմ տալիս բոլոր գրքասերներին!',
    rating: 5,
    flag: '🇺🇸',
    avatarColor: 'bg-blue-200',
    initial: 'E'
  },
  {
    nameEn: 'Armen Petrosyan',
    nameHy: 'Արմեն Պետրոսյան',
    locationEn: 'Gyumri, Armenia',
    locationHy: 'Գյումրի, Հայաստան',
    textEn: 'GirqBox introduced me to two authors I\'d never heard of. Both books were phenomenal. The cozy accessories complete the whole reading experience beautifully.',
    textHy: 'GirqBox-ի շնորհիվ ես բացահայտեցի երկու հիանալի հեղինակների, որոնց մասին նախկինում չգիտեի: Ջերմ աքսեսուարները ընթերցանության պրոցեսը դարձնում են անմոռանալի:',
    rating: 5,
    flag: '🇦🇲',
    avatarColor: 'bg-amber-200',
    initial: 'Ա'
  },
  {
    nameEn: 'Sophie Chen',
    nameHy: 'Սոֆի Չեն',
    locationEn: 'Glendale, CA',
    locationHy: 'Գլենդել, Կալիֆոռնիա',
    textEn: 'The Armenian-American community in Glendale absolutely loves GirqBox. It\'s the perfect gift for any occasion and the bilingual packaging is such a thoughtful touch!',
    textHy: 'Գլենդելի հայ-ամերիկյան համայնքը պարզապես հիացած է GirqBox-ով: Հիանալի նվեր է ցանկացած առիթի համար, իսկ երկլեզու ձևավորումը շատ հաճելի և ուշադիր մոտեցում է:',
    rating: 5,
    flag: '🇺🇸',
    avatarColor: 'bg-purple-200',
    initial: 'S'
  },
  {
    nameEn: 'Nare Hovhannisyan',
    nameHy: 'Նարե Հովհաննիսյան',
    locationEn: 'Vanadzor, Armenia',
    locationHy: 'Վանաձոր, Հայաստան',
    textEn: 'The preference quiz is genius! They actually use it — every book has been exactly what I wanted. The "no duplicates" promise has been kept perfectly for 6 months!',
    textHy: 'Նախասիրությունների հարցաշարը հիանալի է մտածված: Յուրաքանչյուր գիրք ընտրվում է մեծ ուշադրությամբ: Արդեն 6 ամիս է՝ ստանում եմ միայն նոր և հետաքրքիր գրքեր:',
    rating: 5,
    flag: '🇦🇲',
    avatarColor: 'bg-emerald-200',
    initial: 'Ն'
  }
];

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((idx + TESTIMONIALS.length) % TESTIMONIALS.length);
      setIsAnimating(false);
    }, 200);
  };

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, 4500);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-pastel-pink/20 reveal-on-scroll">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pastel-text">
            {lang === 'en' ? '💬 What Readers Say' : '💬 Ի՞նչ են ասում ընթերցողները'}
          </h2>
          <p className="text-pastel-muted text-sm">
            {lang === 'en'
              ? 'Real stories from our reading community in Armenia & the USA'
              : 'Իրական պատմություններ Հայաստանի և ԱՄՆ-ի մեր ընթերցասերներից'}
          </p>
        </div>

        {/* Carousel Card */}
        <div
          className="relative bg-white rounded-3xl border border-pastel-border shadow-xl p-8 sm:p-12"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {/* Quote mark */}
          <div className="absolute top-6 left-8 text-6xl font-serif text-pastel-rose/40 leading-none select-none">
            &ldquo;
          </div>

          <div className={`transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'} space-y-6`}>
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 pt-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="text-center text-base sm:text-lg text-pastel-text font-light leading-relaxed italic max-w-2xl mx-auto">
              &ldquo;{lang === 'en' ? t.textEn : t.textHy}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl ${t.avatarColor} flex items-center justify-center font-serif font-bold text-xl text-pastel-text border border-white shadow-xs`}
              >
                {t.initial}
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-pastel-text">
                  {lang === 'en' ? t.nameEn : t.nameHy} {t.flag}
                </p>
                <p className="text-xs text-pastel-muted">
                  {lang === 'en' ? t.locationEn : t.locationHy}
                </p>
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-pastel-card hover:bg-pastel-pink border border-pastel-border flex items-center justify-center transition-all"
            title="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-pastel-text" />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-pastel-card hover:bg-pastel-pink border border-pastel-border flex items-center justify-center transition-all"
            title="Next"
          >
            <ChevronRight className="w-4 h-4 text-pastel-text" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-8 h-2.5 bg-pastel-accent' : 'w-2.5 h-2.5 bg-pastel-rose/50 hover:bg-pastel-rose'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
