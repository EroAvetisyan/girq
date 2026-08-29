'use client';

import React from 'react';
import { Language } from '@/lib/types';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const POSTS = [
  { emoji: '📦', bg: 'bg-rose-100', label: 'Unboxing Day!', labelHy: 'Տուփի Բացում' },
  { emoji: '🕯️', bg: 'bg-amber-100', label: 'Cozy Reading Setup', labelHy: 'Ջերմ Ընթերցանություն' },
  { emoji: '📖', bg: 'bg-blue-100', label: 'Book of the Month', labelHy: 'Ամսվա Գիրքը' },
  { emoji: '🌿', bg: 'bg-emerald-100', label: 'Armenian Mountain Tea', labelHy: 'Հայկական Լեռնային Թեյ' },
  { emoji: '🔖', bg: 'bg-purple-100', label: 'Handmade Bookmark', labelHy: 'Ձեռագործ Էջանիշ' },
  { emoji: '🌸', bg: 'bg-pink-100', label: 'Spring Book Box', labelHy: 'Գարնանային Տուփ' },
];

interface InstagramSectionProps {
  lang: Language;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ lang }) => {
  return (
    <section className="py-16 bg-white reveal-on-scroll">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-pink-200 px-4 py-2 rounded-full shadow-xs">
            <InstagramIcon className="w-4 h-4 text-pink-600" />
            <span className="font-bold text-xs sm:text-sm text-pink-700">@girqbox</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pastel-text">
            {lang === 'en' ? 'Follow Our Journey 🌿' : 'Հետևեք Մեր Էջին 🌿'}
          </h2>
          <p className="text-pastel-muted text-xs sm:text-sm max-w-md mx-auto">
            {lang === 'en'
              ? 'Tag us @girqbox for a chance to be featured! We love seeing your cozy reading setups.'
              : 'Նշեք @girqbox-ը ձեր լուսանկարներում և հայտնվեք մեր էջում: Սիրում ենք տեսնել ձեր ընթերցանության անկյունները:'}
          </p>
        </div>

        {/* 2×3 Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {POSTS.map((post, i) => (
            <div
              key={i}
              className={`${post.bg} aspect-square rounded-2xl flex flex-col items-center justify-center border border-white shadow-xs hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer group relative overflow-hidden`}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 rounded-2xl" />
              <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
                {post.emoji}
              </span>
              <p className="text-[10px] font-bold text-pastel-text mt-2 px-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {lang === 'en' ? post.label : post.labelHy}
              </p>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <InstagramIcon className="w-3.5 h-3.5 text-white drop-shadow-md" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://instagram.com/girqbox"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs sm:text-sm hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>{lang === 'en' ? 'Follow @girqbox on Instagram' : 'Հետևել @girqbox-ին Instagram-ում'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
