'use client';

import React from 'react';
import Link from 'next/link';
import { Language } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import { BookOpen, Heart, Mail, Share2, Send, Clock } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-pastel-card border-t border-pastel-border pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-pastel-pink flex items-center justify-center border border-pastel-rose/40 shadow-xs">
                <BookOpen className="w-5 h-5 text-pastel-text" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-pastel-text">
                Girq<span className="text-pastel-accent">Box</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-pastel-muted font-light max-w-md leading-relaxed">
              {getTranslation(lang, 'footerAbout')}
            </p>

            <div className="flex items-center space-x-3 text-xs font-semibold text-pastel-text pt-2">
              <span className="bg-white px-3 py-1 rounded-xl border border-pastel-border flex items-center gap-1.5 shadow-xs">
                🇦🇲 Yerevan, Armenia
              </span>
              <span className="bg-white px-3 py-1 rounded-xl border border-pastel-border flex items-center gap-1.5 shadow-xs">
                🇺🇸 Los Angeles, CA
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center space-x-2 pt-1">
              <a
                href="https://instagram.com/girqbox"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-100 to-pink-100 border border-pink-200 flex items-center justify-center text-pink-600 hover:from-purple-200 hover:to-pink-200 transition-all shadow-xs"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white border border-pastel-border flex items-center justify-center text-pastel-text hover:bg-pastel-pink transition-all shadow-xs"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white border border-pastel-border flex items-center justify-center text-pastel-text hover:bg-pastel-pink transition-all shadow-xs"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-pastel-text mb-4">
              {lang === 'en' ? 'Quick Links' : 'Արագ Հղումներ'}
            </h4>
            <ul className="space-y-2.5 text-xs text-pastel-muted font-medium">
              <li>
                <a href="#boxes-section" className="hover:text-pastel-accent transition-colors">
                  {getTranslation(lang, 'navBoxes')}
                </a>
              </li>
              <li>
                <a href="#bookstore-section" className="hover:text-pastel-accent transition-colors">
                  {lang === 'en' ? 'Book Store' : 'Գրախանութ'}
                </a>
              </li>
              <li>
                <Link href="/books" className="hover:text-pastel-accent transition-colors">
                  {lang === 'en' ? 'Full Book Catalog' : 'Գրքերի Կատալոգ'}
                </Link>
              </li>
              <li>
                <a href="#quiz-section" className="hover:text-pastel-accent transition-colors">
                  {getTranslation(lang, 'navQuiz')}
                </a>
              </li>
              <li>
                <Link href="/about" className="hover:text-pastel-accent transition-colors">
                  {lang === 'en' ? 'About GirqBox' : 'Մեր Մասին'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Info */}
          <div>
            <h4 className="font-serif font-bold text-sm text-pastel-text mb-4">
              {lang === 'en' ? 'Help & Info' : 'Օգնություն և Տեղեկություն'}
            </h4>
            <ul className="space-y-2.5 text-xs text-pastel-muted font-medium">
              <li>
                <Link href="/track" className="hover:text-pastel-accent transition-colors flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>{lang === 'en' ? 'Track My Order' : 'Հետևել Պատվերին'}</span>
                </Link>
              </li>
              <li>
                <a href="mailto:hello@girqbox.am" className="hover:text-pastel-accent transition-colors flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-pastel-accent" />
                  hello@girqbox.am
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-pastel-accent transition-colors">
                  {lang === 'en' ? 'Privacy Policy' : 'Գաղտնիության Քաղաքականություն'}
                </Link>
              </li>
              <li>
                <Link href="/privacy#terms" className="hover:text-pastel-accent transition-colors">
                  {lang === 'en' ? 'Terms of Service' : 'Օգտագործման Պայմաններ'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pastel-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-pastel-muted gap-2">
          <p>© {new Date().getFullYear()} GirqBox. {getTranslation(lang, 'allRightsReserved')}</p>
          <p className="flex items-center gap-1 font-serif italic">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for readers in Armenia & America
          </p>
        </div>
      </div>
    </footer>
  );
};
