'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Package, Clock, CheckCircle, Truck, BookOpen, Globe } from 'lucide-react';
import { getStoredSubmissions } from '@/lib/store';
import { ReaderPreferenceSubmission, Language } from '@/lib/types';

const STATUS_STEPS = ['Pending', 'Curating', 'Shipped', 'Delivered'];

const STATUS_TRANSLATIONS: Record<string, { en: string; hy: string }> = {
  Pending: { en: 'Pending', hy: 'Սպասման Մեջ' },
  Curating: { en: 'Curating', hy: 'Կազմման Փուլում' },
  Shipped: { en: 'Shipped', hy: 'Առաքված է' },
  Delivered: { en: 'Delivered', hy: 'Հասցված է' },
};

const STATUS_ICONS = {
  Pending: Clock,
  Curating: BookOpen,
  Shipped: Truck,
  Delivered: CheckCircle,
};

const STATUS_COLORS = {
  Pending: 'text-amber-700 bg-amber-50 border-amber-200',
  Curating: 'text-blue-700 bg-blue-50 border-blue-200',
  Shipped: 'text-purple-700 bg-purple-50 border-purple-200',
  Delivered: 'text-emerald-700 bg-emerald-50 border-emerald-200',
};

export default function TrackPage() {
  const [lang, setLang] = useState<Language>('en');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<ReaderPreferenceSubmission | null | 'not-found'>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const submissions = getStoredSubmissions();
    const found = submissions.find((s) => s.email.toLowerCase() === email.toLowerCase().trim());
    setResult(found || 'not-found');
  };

  const stepIndex = result && result !== 'not-found' ? STATUS_STEPS.indexOf(result.status) : -1;

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

      <div className="max-w-2xl mx-auto px-4 py-16 space-y-10">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-pastel-pink border border-pastel-rose/30 flex items-center justify-center mx-auto shadow-xs">
            <Package className="w-8 h-8 text-pastel-accent" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-pastel-text">
            {lang === 'en' ? 'Track Your Order' : 'Հետևել Պատվերին'}
          </h1>
          <p className="text-pastel-muted text-xs sm:text-sm max-w-md mx-auto">
            {lang === 'en'
              ? 'Enter the email address you used when placing your order to see its current status.'
              : 'Մուտքագրեք Ձեր էլ. փոստի հասցեն՝ պատվերի ընթացիկ կարգավիճակը տեսնելու համար:'}
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white border border-pastel-border rounded-3xl p-6 shadow-xs space-y-4"
        >
          <label className="block text-xs font-bold text-pastel-text">
            {lang === 'en' ? 'Your Email Address' : 'Ձեր Էլ. Փոստի Հասցեն'}
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-pastel-muted" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-pastel-border bg-pastel-card text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-rose"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl pastel-button-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs"
          >
            <Search className="w-4 h-4" />
            <span>{lang === 'en' ? 'Check Order Status' : 'Ստուգել Կարգավիճակը'}</span>
          </button>
          <p className="text-[11px] text-center text-pastel-muted italic">
            Demo: <span className="font-bold text-pastel-accent">anahit.sargsyan@example.am</span> |{' '}
            <span className="font-bold text-pastel-accent">mmiller.reads@example.com</span>
          </p>
        </form>

        {/* Not Found */}
        {result === 'not-found' && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center space-y-2">
            <p className="font-bold text-red-700 text-sm">
              {lang === 'en' ? 'No order found for that email.' : 'Այս էլ. փոստով պատվեր չի գտնվել:'}
            </p>
            <p className="text-xs text-red-500">
              {lang === 'en'
                ? 'Please check the email you used when ordering, or contact hello@girqbox.am'
                : 'Խնդրում ենք ստուգել մուտքագրված էլ. փոստը կամ գրել մեզ՝ hello@girqbox.am'}
            </p>
          </div>
        )}

        {/* Found Result */}
        {result && result !== 'not-found' && (
          <div className="bg-white border border-pastel-border rounded-3xl shadow-md overflow-hidden">
            {/* Order Header */}
            <div className="bg-gradient-to-r from-pastel-pink/40 to-pastel-lavender/40 px-6 py-5 border-b border-pastel-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] text-pastel-muted font-semibold">
                    {lang === 'en' ? 'Order ID' : 'Պատվերի Համար'}
                  </p>
                  <p className="font-bold text-base text-pastel-text">#{result.id}</p>
                  <p className="text-xs text-pastel-muted mt-0.5">{result.customerName}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${STATUS_COLORS[result.status]}`}>
                  {STATUS_TRANSLATIONS[result.status]?.[lang] || result.status}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-8 space-y-6">
              <div className="relative">
                {/* Track line */}
                <div className="absolute top-5 left-5 right-5 h-0.5 bg-pastel-border">
                  <div
                    className="h-full bg-pastel-accent transition-all duration-500"
                    style={{ width: `${(stepIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                  {STATUS_STEPS.map((step, i) => {
                    const Icon = STATUS_ICONS[step as keyof typeof STATUS_ICONS];
                    const done = i <= stepIndex;
                    const active = i === stepIndex;
                    return (
                      <div key={step} className="flex flex-col items-center gap-2 w-16">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all z-10 ${
                            active
                              ? 'bg-pastel-accent border-pastel-accent text-white shadow-md scale-110'
                              : done
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'bg-white border-pastel-border text-pastel-muted'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-[10px] font-bold text-center leading-tight ${
                            done ? 'text-pastel-text' : 'text-pastel-muted'
                          }`}
                        >
                          {STATUS_TRANSLATIONS[step]?.[lang] || step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details */}
              <div className="bg-pastel-card rounded-2xl p-4 space-y-2 text-xs text-pastel-text border border-pastel-border/60">
                <p>
                  <strong>{lang === 'en' ? 'Shipping Address:' : 'Առաքման Հասցե՝'}</strong> {result.address}
                </p>
                <p>
                  <strong>{lang === 'en' ? 'Country:' : 'Երկիր՝'}</strong>{' '}
                  {result.country === 'Armenia' ? '🇦🇲 Armenia (Հայաստան)' : '🇺🇸 USA (ԱՄՆ)'}
                </p>
                <p>
                  <strong>{lang === 'en' ? 'Selected Box:' : 'Ընտրված Տուփ՝'}</strong>{' '}
                  {result.selectedBoxId === 'box-deluxe'
                    ? lang === 'en'
                      ? 'The Deluxe Sanctuary Box'
                      : 'Դելյուքս Սրբարան Տուփ'
                    : lang === 'en'
                    ? 'The Standard Cozy Box'
                    : 'Ստանդարտ Ջերմ Տուփ'}
                </p>
                <p>
                  <strong>{lang === 'en' ? 'Order Date:' : 'Պատվերի Ամսաթիվ՝'}</strong>{' '}
                  {new Date(result.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'hy-AM', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {result.status === 'Shipped' && (
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-xs text-purple-800 font-medium">
                  📦{' '}
                  {lang === 'en'
                    ? 'Your box is on its way! Estimated delivery: 7–14 business days.'
                    : 'Ձեր տուփը ճանապարհին է: Առաքման մոտավոր ժամկետը՝ 7–14 աշխատանքային օր:'}
                </div>
              )}
              {result.status === 'Delivered' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-800 font-medium">
                  🎉{' '}
                  {lang === 'en'
                    ? 'Your box has been delivered! Share your unboxing with @girqbox.'
                    : 'Ձեր տուփը հասցված է: Կիսվեք ձեր բացման տեսանյութերով @girqbox-ի հետ:'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
