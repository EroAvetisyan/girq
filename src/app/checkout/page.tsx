'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Language, Currency, CartItem, ReaderPreferenceSubmission } from '@/lib/types';
import { getStoredCart, saveStoredCart, getStoredSubmissions, saveStoredSubmissions, getStoredBoxes } from '@/lib/store';
import {
  ArrowLeft,
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Globe,
  Tag,
  ArrowRight,
  Package,
} from 'lucide-react';

interface QuizPrefillData {
  customerName?: string;
  email?: string;
  country?: 'Armenia' | 'USA';
  address?: string;
  notes?: string;
  selectedBoxId?: string;
  genres?: string[];
  readingVibe?: string;
  bookLanguage?: 'English' | 'Armenian' | 'Both';
  ownedBooks?: string[];
}

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cart, setCart] = useState<CartItem[]>([]);

  // Quiz Prefill info
  const [quizInfo, setQuizInfo] = useState<QuizPrefillData | null>(null);

  // Shipping Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<'Armenia' | 'USA'>('Armenia');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'idram'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  // Submission / Loading State
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<ReaderPreferenceSubmission | null>(null);

  useEffect(() => {
    setMounted(true);
    let storedCart = getStoredCart();

    const rawPrefill = localStorage.getItem('girqbox_checkout_prefill');
    if (rawPrefill) {
      try {
        const prefill: QuizPrefillData = JSON.parse(rawPrefill);
        setQuizInfo(prefill);
        if (prefill.customerName) {
          setName(prefill.customerName);
          setCardHolder(prefill.customerName.toUpperCase());
        }
        if (prefill.email) setEmail(prefill.email);
        if (prefill.country) setCountry(prefill.country);
        if (prefill.address) setAddress(prefill.address);

        if (storedCart.length === 0 && prefill.selectedBoxId) {
          const boxes = getStoredBoxes();
          const targetBox = boxes.find((b) => b.id === prefill.selectedBoxId) || boxes[0];
          if (targetBox) {
            const initialItem: CartItem = {
              id: targetBox.id,
              type: 'box',
              nameEn: targetBox.nameEn,
              nameHy: targetBox.nameHy,
              priceUSD: targetBox.priceUSD,
              priceAMD: targetBox.priceAMD,
              quantity: 1,
            };
            storedCart = [initialItem];
            saveStoredCart(storedCart);
          }
        }
      } catch {
        /* silent catch */
      }
    }

    setCart(storedCart);
  }, []);

  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const baseTotalUSD = cart.reduce((acc, i) => acc + i.priceUSD * i.quantity, 0);
  const baseTotalAMD = cart.reduce((acc, i) => acc + i.priceAMD * i.quantity, 0);

  const discountAmountUSD = baseTotalUSD * (discountPercent / 100);
  const discountAmountAMD = baseTotalAMD * (discountPercent / 100);

  const finalTotalUSD = Math.max(0, baseTotalUSD - discountAmountUSD);
  const finalTotalAMD = Math.max(0, baseTotalAMD - discountAmountAMD);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    setCvv(value);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'GIRQ10' || code === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError(lang === 'en' ? 'Invalid code. Try "GIRQ10"' : 'Անվավեր կոդ: Փորձեք «GIRQ10»');
      setPromoSuccess(false);
    }
  };

  const handlePayOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) return;

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `GB-${Date.now().toString().slice(-6)}`;
      const itemsList = cart.map((i) => `${i.quantity}x ${i.nameEn}`).join(', ');

      const newOrder: ReaderPreferenceSubmission = {
        id: orderId,
        customerName: name,
        email,
        country,
        address: `${address}${city ? `, ${city}` : ''}${postalCode ? ` ${postalCode}` : ''}`.trim(),
        selectedBoxId: quizInfo?.selectedBoxId || cart[0]?.id || 'custom-order',
        genres: quizInfo?.genres && quizInfo.genres.length > 0 ? quizInfo.genres : ['Online Card Checkout'],
        readingVibe: quizInfo?.readingVibe || 'Store Direct Order',
        bookLanguage: quizInfo?.bookLanguage || (lang === 'en' ? 'English' : 'Armenian'),
        ownedBooks: quizInfo?.ownedBooks || [],
        notes: `Paid via ${paymentMethod.toUpperCase()} (${itemsList})${quizInfo?.notes ? ` | Notes: ${quizInfo.notes}` : ''} | Total: $${finalTotalUSD.toFixed(2)} / ֏${finalTotalAMD.toLocaleString()}`,
        createdAt: new Date().toISOString(),
        status: 'Pending',
      };

      const existing = getStoredSubmissions();
      const updated = [newOrder, ...existing];
      saveStoredSubmissions(updated);

      saveStoredCart([]);
      localStorage.removeItem('girqbox_checkout_prefill');
      window.dispatchEvent(new Event('girqbox-cart-update'));

      setIsProcessing(false);
      setCompletedOrder(newOrder);
    }, 1600);
  };

  const getCardType = () => {
    const clean = cardNumber.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'VISA';
    if (clean.startsWith('5') || clean.startsWith('2')) return 'MASTERCARD';
    if (clean.startsWith('90')) return 'ARCA';
    return 'CARD';
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FFFDFB] font-sans">
      {/* Top Checkout Header - Optimized for Mobile */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pastel-border shadow-xs px-3 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-pastel-card hover:bg-pastel-pink text-xs font-semibold text-pastel-text border border-pastel-border transition-all shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{lang === 'en' ? 'Back' : 'Վերադառնալ'}</span>
        </Link>

        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          <span className="font-serif text-base sm:text-xl font-bold text-pastel-text">
            Girq<span className="text-pastel-accent">Box</span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold bg-pastel-pink text-pastel-text px-1.5 sm:px-2 py-0.5 rounded-full border border-pastel-rose/30">
            🔒 Checkout
          </span>
        </div>

        {/* Currency & Language Toggle */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <div className="flex items-center bg-pastel-card rounded-lg p-0.5 border border-pastel-border shadow-xs">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-1.5 sm:px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold ${
                currency === 'USD' ? 'bg-pastel-pink text-pastel-text shadow-xs' : 'text-pastel-muted'
              }`}
            >
              $ USD
            </button>
            <button
              onClick={() => setCurrency('AMD')}
              className={`px-1.5 sm:px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold ${
                currency === 'AMD' ? 'bg-pastel-pink text-pastel-text shadow-xs' : 'text-pastel-muted'
              }`}
            >
              ֏ AMD
            </button>
          </div>

          <button
            onClick={() => setLang((l) => (l === 'en' ? 'hy' : 'en'))}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-pastel-card hover:bg-pastel-pink border border-pastel-border text-xs font-bold text-pastel-text shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 text-pastel-accent" />
            <span>{lang === 'en' ? '🇦🇲' : '🇺🇸'}</span>
          </button>
        </div>
      </header>

      {/* Main Checkout Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {completedOrder ? (
          /* SUCCESSFUL ORDER CONFIRMATION */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-pastel-border shadow-2xl space-y-6 sm:space-y-8 animate-fade-in text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Payment Successful' : 'Վճարումը Կատարված Է'}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pastel-text">
                {lang === 'en' ? 'Thank You for Your Order!' : 'Շնորհակալություն Պատվերի Համար!'}
              </h2>
              <p className="text-xs sm:text-sm text-pastel-muted max-w-md mx-auto leading-relaxed">
                {lang === 'en'
                  ? 'Your payment was authorized and your personalized reading box is now registered in our system.'
                  : 'Ձեր վճարումը հաջողությամբ հաստատված է, և պատվերը գրանցված է մեր համակարգում:'}
              </p>
            </div>

            {/* Order Receipt Box */}
            <div className="bg-pastel-card rounded-2xl p-4 sm:p-6 border border-pastel-border/80 text-left space-y-2.5 text-xs text-pastel-text">
              <div className="flex justify-between items-center border-b border-pastel-border pb-2.5">
                <span className="text-pastel-muted font-medium">
                  {lang === 'en' ? 'Order Number' : 'Պատվերի Համար'}:
                </span>
                <span className="font-mono font-bold text-pastel-accent text-xs sm:text-sm">#{completedOrder.id}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-pastel-muted">{lang === 'en' ? 'Customer' : 'Հաճախորդ'}:</span>
                <span className="font-bold">{completedOrder.customerName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-pastel-muted">{lang === 'en' ? 'Email' : 'Էլ. Փոստ'}:</span>
                <span className="truncate max-w-[180px]">{completedOrder.email}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-pastel-muted">{lang === 'en' ? 'Destination' : 'Հասցե'}:</span>
                <span className="font-medium text-right max-w-xs truncate">{completedOrder.address}</span>
              </div>

              <div className="flex justify-between items-center border-t border-pastel-border pt-2.5 font-bold text-xs sm:text-sm">
                <span>{lang === 'en' ? 'Amount Paid' : 'Վճարված Գումար'}:</span>
                <span className="text-pastel-accent font-serif text-sm sm:text-base">
                  {currency === 'USD' ? `$${finalTotalUSD.toFixed(2)}` : `֏${finalTotalAMD.toLocaleString()}`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <Link
                href="/track"
                className="flex-1 py-3.5 rounded-2xl pastel-button-primary font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <Package className="w-4 h-4" />
                <span>{lang === 'en' ? 'Track Your Parcel' : 'Հետևել Պատվերին'}</span>
              </Link>
              <Link
                href="/"
                className="flex-1 py-3.5 rounded-2xl bg-pastel-card hover:bg-pastel-pink border border-pastel-border text-pastel-text font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>{lang === 'en' ? 'Return to Store' : 'Վերադառնալ Խանութ'}</span>
              </Link>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* EMPTY CART VIEW */
          <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-pastel-border shadow-xs max-w-md mx-auto p-6 sm:p-8 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-pastel-pink flex items-center justify-center mx-auto border border-pastel-rose/30">
              <ShoppingBag className="w-8 h-8 text-pastel-accent" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-pastel-text">
              {lang === 'en' ? 'Your cart is empty' : 'Ձեր զամբյուղը դատարկ է'}
            </h2>
            <p className="text-xs text-pastel-muted leading-relaxed">
              {lang === 'en'
                ? 'Complete our reader quiz or add books to proceed with payment.'
                : 'Լրացրեք հարցաշարը կամ ավելացրեք գրքեր՝ վճարումը շարունակելու համար:'}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl pastel-button-primary text-xs font-bold shadow-xs"
            >
              <span>{lang === 'en' ? 'Take Reader Quiz & Explore' : 'Լրացնել Հարցաշարը'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* TWO-COLUMN CHECKOUT FORM VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Column (7 cols): Shipping & Card Payment Form */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              {/* Quiz Summary Badge */}
              {quizInfo && quizInfo.genres && quizInfo.genres.length > 0 && (
                <div className="bg-pastel-pink/50 border border-pastel-rose/40 rounded-3xl p-4 sm:p-5 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-pastel-pink flex items-center justify-center border border-pastel-rose/40 shrink-0">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pastel-accent" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-pastel-text">
                      {lang === 'en' ? 'Reader Profile Attached' : 'Ընթերցողի պրոֆիլը կցված է'}
                    </p>
                    <p className="text-pastel-muted text-[11px] mt-0.5 line-clamp-1">
                      {lang === 'en'
                        ? `Genres: ${quizInfo.genres.join(', ')} • Vibe: ${quizInfo.readingVibe}`
                        : `Ժանրեր՝ ${quizInfo.genres.join(', ')} • Տրամադրություն՝ ${quizInfo.readingVibe}`}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handlePayOrder} className="space-y-5 sm:space-y-6">
                
                {/* SECTION 1: SHIPPING DETAILS */}
                <div className="bg-white rounded-3xl p-5 sm:p-8 border border-pastel-border shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-pastel-border pb-3">
                    <span className="w-7 h-7 rounded-lg bg-pastel-pink text-pastel-accent flex items-center justify-center text-xs font-bold">1</span>
                    <h2 className="font-serif font-bold text-base sm:text-lg text-pastel-text">
                      {lang === 'en' ? 'Shipping Address' : 'Առաքման Հասցե'}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold mb-1">{lang === 'en' ? 'Full Name *' : 'Անուն Ազգանուն *'}</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (!cardHolder) setCardHolder(e.target.value.toUpperCase());
                        }}
                        placeholder="Sona Petrosyan"
                        className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card font-medium focus:outline-none focus:border-pastel-rose"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">{lang === 'en' ? 'Email Address *' : 'Էլ. Փոստ *'}</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sona@example.am"
                        className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card font-medium focus:outline-none focus:border-pastel-rose"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold mb-1">{lang === 'en' ? 'Phone Number' : 'Հեռախոսահամար'}</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+374 (00) 00-00-00"
                        className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card font-medium focus:outline-none focus:border-pastel-rose"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">{lang === 'en' ? 'Shipping Country *' : 'Երկիր *'}</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setCountry('Armenia')}
                          className={`py-2 rounded-xl font-bold border transition-all text-xs ${
                            country === 'Armenia'
                              ? 'bg-pastel-pink border-pastel-rose text-pastel-text shadow-xs'
                              : 'bg-pastel-card border-pastel-border text-pastel-muted'
                          }`}
                        >
                          🇦🇲 Armenia
                        </button>
                        <button
                          type="button"
                          onClick={() => setCountry('USA')}
                          className={`py-2 rounded-xl font-bold border transition-all text-xs ${
                            country === 'USA'
                              ? 'bg-pastel-pink border-pastel-rose text-pastel-text shadow-xs'
                              : 'bg-pastel-card border-pastel-border text-pastel-muted'
                          }`}
                        >
                          🇺🇸 USA
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block font-bold mb-1">{lang === 'en' ? 'Street Address *' : 'Փողոց և Բնակարան *'}</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={country === 'Armenia' ? 'e.g. 15 Tumanyan St, Apt 20' : 'e.g. 250 N Brand Blvd, Suite 400'}
                      className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card font-medium focus:outline-none focus:border-pastel-rose"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold mb-1">{lang === 'en' ? 'City' : 'Քաղաք'}</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={country === 'Armenia' ? 'Yerevan' : 'Los Angeles'}
                        className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card font-medium focus:outline-none focus:border-pastel-rose"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">{lang === 'en' ? 'ZIP Code' : 'Ինդեքս'}</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="0001"
                        className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card font-medium focus:outline-none focus:border-pastel-rose"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: PAYMENT & CARD INFORMATION */}
                <div className="bg-white rounded-3xl p-5 sm:p-8 border border-pastel-border shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-pastel-border pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-pastel-sage text-emerald-800 flex items-center justify-center text-xs font-bold">2</span>
                      <h2 className="font-serif font-bold text-base sm:text-lg text-pastel-text">
                        {lang === 'en' ? 'Payment Method' : 'Վճարման Եղանակ'}
                      </h2>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>256-Bit SSL</span>
                    </span>
                  </div>

                  {/* Payment Method Selector Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 sm:p-3 rounded-2xl border flex flex-col items-center justify-center gap-0.5 sm:gap-1 transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-pastel-pink border-pastel-rose text-pastel-text shadow-xs font-bold'
                          : 'bg-pastel-card border-pastel-border text-pastel-muted hover:text-pastel-text'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-pastel-accent" />
                      <span className="text-[10px] sm:text-[11px] font-bold">Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`p-2.5 sm:p-3 rounded-2xl border flex flex-col items-center justify-center gap-0.5 sm:gap-1 transition-all ${
                        paymentMethod === 'applepay'
                          ? 'bg-pastel-pink border-pastel-rose text-pastel-text shadow-xs font-bold'
                          : 'bg-pastel-card border-pastel-border text-pastel-muted hover:text-pastel-text'
                      }`}
                    >
                      <span className="text-sm font-bold">🍎 Pay</span>
                      <span className="text-[10px] sm:text-[11px]">Apple / GPay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('idram')}
                      className={`p-2.5 sm:p-3 rounded-2xl border flex flex-col items-center justify-center gap-0.5 sm:gap-1 transition-all ${
                        paymentMethod === 'idram'
                          ? 'bg-pastel-pink border-pastel-rose text-pastel-text shadow-xs font-bold'
                          : 'bg-pastel-card border-pastel-border text-pastel-muted hover:text-pastel-text'
                      }`}
                    >
                      <span className="text-xs font-bold text-orange-600">⚡ Idram</span>
                      <span className="text-[10px] sm:text-[11px]">Telcell</span>
                    </button>
                  </div>

                  {/* INTERACTIVE CREDIT CARD VISUALIZER */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 sm:space-y-5 animate-fade-in">
                      {/* Virtual Card Graphic */}
                      <div className="relative mx-auto w-full max-w-sm h-44 sm:h-48 rounded-2xl bg-gradient-to-tr from-[#3D322C] via-[#5C4D44] to-[#2B231E] text-white p-4 sm:p-5 shadow-xl flex flex-col justify-between overflow-hidden border border-white/20">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pastel-accent/20 rounded-full blur-xl" />
                        
                        <div className="flex items-center justify-between z-10">
                          <div className="w-8 h-6 sm:w-9 sm:h-7 rounded-md bg-amber-400/80 border border-amber-300 flex items-center justify-center">
                            <div className="w-4 h-3 border border-amber-800/40 rounded-xs" />
                          </div>
                          <span className="font-mono font-bold tracking-widest text-xs opacity-90">
                            {getCardType()}
                          </span>
                        </div>

                        <div className="font-mono tracking-widest text-base sm:text-lg text-center z-10 drop-shadow-sm">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </div>

                        <div className="flex items-center justify-between text-[11px] sm:text-xs z-10 uppercase tracking-wider opacity-90">
                          <div>
                            <span className="text-[8px] block text-white/60">Card Holder</span>
                            <span className="font-semibold truncate max-w-[140px] block">{cardHolder || 'FULL NAME'}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] block text-white/60">Expires</span>
                            <span className="font-mono font-semibold">{expiry || 'MM/YY'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Input Fields */}
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block font-bold mb-1">{lang === 'en' ? 'Card Number *' : 'Քարտի Համար *'}</label>
                          <div className="relative">
                            <CreditCard className="w-4 h-4 absolute left-3 top-3 text-pastel-muted" />
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="0000 0000 0000 0000"
                              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-pastel-border bg-pastel-card font-mono text-xs sm:text-sm focus:outline-none focus:border-pastel-rose"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold mb-1">{lang === 'en' ? 'Cardholder Name *' : 'Քարտապանի Անուն Ազգանուն *'}</label>
                          <input
                            type="text"
                            required
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                            placeholder="SONA PETROSYAN"
                            className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card font-medium uppercase text-xs focus:outline-none focus:border-pastel-rose"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-bold mb-1">{lang === 'en' ? 'Expiry Date *' : 'Գործողության Ժամկետ *'}</label>
                            <input
                              type="text"
                              required
                              value={expiry}
                              onChange={handleExpiryChange}
                              placeholder="MM/YY"
                              className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card font-mono text-xs focus:outline-none focus:border-pastel-rose"
                            />
                          </div>
                          <div>
                            <label className="block font-bold mb-1">{lang === 'en' ? 'CVV Code *' : 'CVV Կոդ *'}</label>
                            <input
                              type="password"
                              required
                              maxLength={4}
                              value={cvv}
                              onChange={handleCvvChange}
                              placeholder="•••"
                              className="w-full p-2.5 rounded-xl border border-pastel-border bg-pastel-card font-mono text-xs focus:outline-none focus:border-pastel-rose"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'applepay' && (
                    <div className="bg-pastel-card p-5 rounded-2xl border border-pastel-border text-center space-y-2 text-xs animate-fade-in">
                      <span className="text-3xl">🍎</span>
                      <p className="font-bold text-pastel-text">
                        {lang === 'en' ? 'Express Checkout with Apple Pay / Google Pay' : 'Արագ վճարում Apple Pay-ով'}
                      </p>
                      <p className="text-pastel-muted">
                        {lang === 'en'
                          ? 'Click the Pay button below to authorize payment using your connected device biometric authentication.'
                          : 'Սեղմեք ստորև նշված կոճակը՝ վճարումը հաստատելու համար:'}
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'idram' && (
                    <div className="bg-orange-50/70 p-5 rounded-2xl border border-orange-200 text-center space-y-2 text-xs animate-fade-in">
                      <span className="text-3xl">⚡</span>
                      <p className="font-bold text-orange-950">
                        {lang === 'en' ? 'Pay with Idram / Telcell Wallet' : 'Վճարել Idram / Telcell դրամապանակով'}
                      </p>
                      <p className="text-orange-900/80">
                        {lang === 'en'
                          ? 'Instant QR code payment supported across Armenia.'
                          : 'Ակնթարթային վճարում QR կոդով Հայաստանի ողջ տարածքում:'}
                      </p>
                    </div>
                  )}

                  {/* Payment Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                      isProcessing
                        ? 'bg-pastel-muted text-white cursor-wait'
                        : 'pastel-button-primary hover:scale-[1.01]'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{lang === 'en' ? 'Authorizing Payment...' : 'Վճարումը Հաստատվում է...'}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          {lang === 'en' ? 'Authorize Payment' : 'Կատարել Վճարում'} (
                          {currency === 'USD'
                            ? `$${finalTotalUSD.toFixed(2)}`
                            : `֏${finalTotalAMD.toLocaleString()}`}
                          )
                        </span>
                      </>
                    )}
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] text-pastel-muted pt-1">
                    <span>🔒 Encrypted</span>
                    <span>•</span>
                    <span>✓ No Duplicate</span>
                    <span>•</span>
                    <span>✈️ Express Shipping</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column (5 cols): Order Summary & Promo Code */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-5 sm:p-8 border border-pastel-border shadow-xs space-y-5 sticky top-24">
                <div className="flex items-center justify-between border-b border-pastel-border pb-3">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-pastel-text">
                    {lang === 'en' ? 'Order Summary' : 'Պատվերի Ամփոփում'}
                  </h3>
                  <span className="bg-pastel-pink text-pastel-text text-xs font-bold px-2 py-0.5 rounded-full border border-pastel-rose/30">
                    {totalItems} {lang === 'en' ? 'items' : 'ապրանք'}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <div className="w-9 h-9 rounded-xl bg-pastel-pink flex items-center justify-center text-sm flex-shrink-0 border border-pastel-rose/30">
                        {item.type === 'book' ? '📖' : item.type === 'box' ? '🎁' : '🕯️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-pastel-text truncate">
                          {lang === 'en' ? item.nameEn : item.nameHy}
                        </p>
                        <p className="text-pastel-muted text-[11px]">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-semibold text-pastel-accent shrink-0">
                        {currency === 'USD'
                          ? `$${(item.priceUSD * item.quantity).toFixed(2)}`
                          : `֏${(item.priceAMD * item.quantity).toLocaleString()}`}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input Form */}
                <div className="pt-2 border-t border-pastel-border/80">
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-pastel-muted" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="GIRQ10"
                        className="w-full pl-8 pr-3 py-2 rounded-xl border border-pastel-border bg-pastel-card text-xs uppercase font-medium focus:outline-none focus:border-pastel-rose"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-pastel-sage hover:bg-pastel-sageHover border border-pastel-sageHover text-pastel-text text-xs font-bold transition-colors shrink-0"
                    >
                      {lang === 'en' ? 'Apply' : 'Կիրառել'}
                    </button>
                  </form>

                  {promoSuccess && (
                    <p className="text-[11px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                      ✓ 10% {lang === 'en' ? 'Discount Applied!' : 'Զեղչը կիրառված է!'}
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-600 mt-1.5">{promoError}</p>
                  )}
                </div>

                {/* Pricing Calculation Breakdown */}
                <div className="space-y-2 pt-2 border-t border-pastel-border/80 text-xs">
                  <div className="flex justify-between text-pastel-muted">
                    <span>{lang === 'en' ? 'Subtotal' : 'Ընդամենը'}:</span>
                    <span className="font-semibold text-pastel-text">
                      {currency === 'USD' ? `$${baseTotalUSD.toFixed(2)}` : `֏${baseTotalAMD.toLocaleString()}`}
                    </span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>{lang === 'en' ? 'Promo Discount (10%)' : 'Զեղչ (10%)'}:</span>
                      <span>
                        -{currency === 'USD' ? `$${discountAmountUSD.toFixed(2)}` : `֏${discountAmountAMD.toLocaleString()}`}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-pastel-muted">
                    <span>{lang === 'en' ? 'Shipping' : 'Առաքում'}:</span>
                    <span className="text-emerald-700 font-bold">FREE</span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-pastel-text pt-2 border-t border-pastel-border font-serif">
                    <span>{lang === 'en' ? 'Total Amount' : 'Ընդհանուր Վճար'}:</span>
                    <span className="text-pastel-accent text-base">
                      {currency === 'USD' ? `$${finalTotalUSD.toFixed(2)}` : `֏${finalTotalAMD.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
