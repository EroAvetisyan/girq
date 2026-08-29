'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Language, SubscriptionBox, ReaderPreferenceSubmission, CartItem } from '@/lib/types';
import { getTranslation, GENRE_OPTIONS, VIBE_OPTIONS } from '@/lib/i18n';
import { getStoredCart, saveStoredCart, getStoredSubmissions, saveStoredSubmissions } from '@/lib/store';
import { BookOpen, Heart, Plus, X, Sparkles, AlertCircle, ArrowRight, Lock } from 'lucide-react';

interface PreferenceQuizProps {
  lang: Language;
  boxes: SubscriptionBox[];
  selectedBoxId: string;
  setSelectedBoxId: (id: string) => void;
  onSubmitPreference: (submission: Omit<ReaderPreferenceSubmission, 'id' | 'createdAt' | 'status'>) => void;
}

export const PreferenceQuiz: React.FC<PreferenceQuizProps> = ({
  lang,
  boxes,
  selectedBoxId,
  setSelectedBoxId,
  onSubmitPreference,
}) => {
  const router = useRouter();

  // Form State
  const [country, setCountry] = useState<'Armenia' | 'USA'>('Armenia');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  
  // Genres state stores selected genre IDs
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>(['fiction', 'armenian']);
  const [readingVibeId, setReadingVibeId] = useState('cozy');
  const [bookLanguage, setBookLanguage] = useState<'English' | 'Armenian' | 'Both'>('Both');
  
  // Owned Books Tag Input State
  const [ownedBooks, setOwnedBooks] = useState<string[]>([
    'The Little Prince / Փոքրիկ Իշխանը'
  ]);
  const [bookInput, setBookInput] = useState('');

  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add Owned Book Tag
  const handleAddOwnedBook = () => {
    const trimmed = bookInput.trim();
    if (trimmed && !ownedBooks.includes(trimmed)) {
      setOwnedBooks([...ownedBooks, trimmed]);
      setBookInput('');
    }
  };

  const handleKeyDownBook = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddOwnedBook();
    }
  };

  const handleRemoveOwnedBook = (bookToRemove: string) => {
    setOwnedBooks(ownedBooks.filter((b) => b !== bookToRemove));
  };

  const toggleGenre = (genreId: string) => {
    if (selectedGenreIds.includes(genreId)) {
      if (selectedGenreIds.length > 1) {
        setSelectedGenreIds(selectedGenreIds.filter((g) => g !== genreId));
      }
    } else {
      setSelectedGenreIds([...selectedGenreIds, genreId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !address) return;

    setIsSubmitting(true);

    // Map selected genre IDs to current language names for stored record
    const genreNames = selectedGenreIds.map((id) => {
      const g = GENRE_OPTIONS.find((opt) => opt.id === id);
      return g ? (lang === 'en' ? g.nameEn : g.nameHy) : id;
    });

    const vibeObj = VIBE_OPTIONS.find((v) => v.id === readingVibeId);
    const vibeName = vibeObj ? (lang === 'en' ? vibeObj.nameEn : vibeObj.nameHy) : readingVibeId;

    const chosenBox = boxes.find((b) => b.id === selectedBoxId) || boxes[0];

    // Prepare Submission
    const submissionData: Omit<ReaderPreferenceSubmission, 'id' | 'createdAt' | 'status'> = {
      customerName,
      email,
      country,
      address,
      selectedBoxId: chosenBox ? chosenBox.id : 'box-deluxe',
      genres: genreNames,
      readingVibe: vibeName,
      bookLanguage,
      ownedBooks,
      notes,
    };

    onSubmitPreference(submissionData);

    // Ensure the selected Subscription Box is in the Cart for checkout
    if (chosenBox && typeof window !== 'undefined') {
      const currentCart = getStoredCart();
      const boxInCart = currentCart.find((i) => i.id === chosenBox.id);
      
      let nextCart: CartItem[];
      if (boxInCart) {
        nextCart = currentCart;
      } else {
        const newCartItem: CartItem = {
          id: chosenBox.id,
          type: 'box',
          nameEn: chosenBox.nameEn,
          nameHy: chosenBox.nameHy,
          priceUSD: chosenBox.priceUSD,
          priceAMD: chosenBox.priceAMD,
          quantity: 1,
        };
        nextCart = [...currentCart, newCartItem];
      }

      saveStoredCart(nextCart);
      window.dispatchEvent(new Event('girqbox-cart-update'));

      // Save pre-fill info for checkout form
      localStorage.setItem('girqbox_checkout_prefill', JSON.stringify({
        customerName,
        email,
        country,
        address,
        notes,
        selectedBoxId: chosenBox.id,
        genres: genreNames,
        readingVibe: vibeName,
        bookLanguage,
        ownedBooks,
      }));
    }

    // Redirect to Checkout & Card Payment page
    router.push('/checkout');
  };

  return (
    <section id="quiz-section" className="py-16 lg:py-24 relative">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-pastel-pink/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-pastel-sage/70 border border-pastel-sageHover px-4 py-1.5 rounded-full text-xs font-semibold text-pastel-text">
            <Heart className="w-4 h-4 text-pastel-accent" />
            <span>{getTranslation(lang, 'quizTitle')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pastel-text">
            {getTranslation(lang, 'quizTitle')}
          </h2>

          <p className="text-sm sm:text-base text-pastel-muted font-light leading-relaxed">
            {getTranslation(lang, 'quizSubtitle')}
          </p>
        </div>

        {/* Quiz Form Card */}
        <div className="bg-[#FFFDFB] border border-pastel-border rounded-3xl p-6 sm:p-10 shadow-xl relative">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Step 1: Select Box & Country */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-pastel-text flex items-center gap-2 border-b border-pastel-border/60 pb-2">
                <span className="w-7 h-7 rounded-lg bg-pastel-pink text-pastel-accent flex items-center justify-center text-xs font-bold">1</span>
                {getTranslation(lang, 'step1')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Select Box */}
                <div>
                  <label className="block text-xs font-bold text-pastel-text mb-2">
                    {getTranslation(lang, 'labelSelectBox')}
                  </label>
                  <select
                    value={selectedBoxId}
                    onChange={(e) => setSelectedBoxId(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-pastel-card border border-pastel-border text-xs sm:text-sm font-medium text-pastel-text focus:outline-none focus:border-pastel-rose shadow-sm"
                  >
                    {boxes.map((b) => (
                      <option key={b.id} value={b.id}>
                        {lang === 'en' ? b.nameEn : b.nameHy} ({lang === 'en' ? `$${b.priceUSD}` : `֏${b.priceAMD.toLocaleString()}`})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Country */}
                <div>
                  <label className="block text-xs font-bold text-pastel-text mb-2">
                    {getTranslation(lang, 'labelCountry')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCountry('Armenia')}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                        country === 'Armenia'
                          ? 'bg-pastel-pink border-pastel-rose text-pastel-text shadow-sm'
                          : 'bg-pastel-card border-pastel-border text-pastel-muted'
                      }`}
                    >
                      <span>🇦🇲 Armenia (Հայաստան)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCountry('USA')}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                        country === 'USA'
                          ? 'bg-pastel-pink border-pastel-rose text-pastel-text shadow-sm'
                          : 'bg-pastel-card border-pastel-border text-pastel-muted'
                      }`}
                    >
                      <span>🇺🇸 USA (ԱՄՆ)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Genres & Vibe (Fully Translated to Armenian!) */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-pastel-text flex items-center gap-2 border-b border-pastel-border/60 pb-2">
                <span className="w-7 h-7 rounded-lg bg-pastel-sage text-emerald-800 flex items-center justify-center text-xs font-bold">2</span>
                {getTranslation(lang, 'step2')}
              </h3>

              <div>
                <label className="block text-xs font-bold text-pastel-text mb-2">
                  {getTranslation(lang, 'labelGenres')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {GENRE_OPTIONS.map((g) => {
                    const active = selectedGenreIds.includes(g.id);
                    const genreLabel = lang === 'en' ? g.nameEn : g.nameHy;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => toggleGenre(g.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                          active
                            ? 'bg-pastel-rose/40 border-pastel-accent text-pastel-text shadow-sm font-semibold'
                            : 'bg-pastel-card border-pastel-border text-pastel-muted hover:border-pastel-rose/40'
                        }`}
                      >
                        {genreLabel} {active ? '✓' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Reading Vibe Translated */}
                <div>
                  <label className="block text-xs font-bold text-pastel-text mb-2">
                    {getTranslation(lang, 'labelVibe')}
                  </label>
                  <select
                    value={readingVibeId}
                    onChange={(e) => setReadingVibeId(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-pastel-card border border-pastel-border text-xs sm:text-sm font-medium text-pastel-text focus:outline-none focus:border-pastel-rose shadow-sm"
                  >
                    {VIBE_OPTIONS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {lang === 'en' ? v.nameEn : v.nameHy}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Book Language */}
                <div>
                  <label className="block text-xs font-bold text-pastel-text mb-2">
                    {getTranslation(lang, 'labelBookLang')}
                  </label>
                  <select
                    value={bookLanguage}
                    onChange={(e) => setBookLanguage(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-2xl bg-pastel-card border border-pastel-border text-xs sm:text-sm font-medium text-pastel-text focus:outline-none focus:border-pastel-rose shadow-sm"
                  >
                    <option value="Both">{lang === 'en' ? 'Bilingual Mix (EN & HY)' : 'Երկլեզու (Անգլերեն և Հայերեն)'}</option>
                    <option value="English">{lang === 'en' ? 'English Books Only' : 'Միայն Անգլերեն գրքեր'}</option>
                    <option value="Armenian">{lang === 'en' ? 'Armenian Books Only' : 'Միայն Հայերեն գրքեր'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Owned Books Tracker */}
            <div className="space-y-4 bg-pastel-yellow/60 p-5 rounded-2xl border border-amber-200/80">
              <h3 className="font-serif text-lg font-bold text-pastel-text flex items-center gap-2 border-b border-amber-200/80 pb-2">
                <span className="w-7 h-7 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold">3</span>
                {getTranslation(lang, 'step3')}
              </h3>

              <div className="flex items-start gap-2 text-xs text-amber-900 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                <p>{getTranslation(lang, 'ownedBooksHelp')}</p>
              </div>

              {/* Input row */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bookInput}
                  onChange={(e) => setBookInput(e.target.value)}
                  onKeyDown={handleKeyDownBook}
                  placeholder={getTranslation(lang, 'ownedBooksPlaceholder')}
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-amber-300 text-xs sm:text-sm font-medium text-pastel-text focus:outline-none focus:border-amber-500 shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleAddOwnedBook}
                  className="px-5 py-3 rounded-xl bg-amber-700 text-white font-bold text-xs hover:bg-amber-800 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Add Title' : 'Ավելացնել'}</span>
                </button>
              </div>

              {/* Owned Books Tag Chips */}
              {ownedBooks.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {ownedBooks.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-amber-300 text-xs font-semibold text-amber-950 shadow-sm"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                      <span>{b}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOwnedBook(b)}
                        className="hover:text-red-600 transition-colors p-0.5 rounded-full hover:bg-amber-100"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs italic text-amber-800/80">
                  {lang === 'en' ? 'No owned books added yet. Type a book title above!' : 'Դեռևս ունեցած գրքեր ավելացված չեն:'}
                </p>
              )}
            </div>

            {/* Step 4: Contact & Delivery Info */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-pastel-text flex items-center gap-2 border-b border-pastel-border/60 pb-2">
                <span className="w-7 h-7 rounded-lg bg-pastel-pink text-pastel-accent flex items-center justify-center text-xs font-bold">4</span>
                {getTranslation(lang, 'step4')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-pastel-text mb-1">
                    {getTranslation(lang, 'labelFullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sona Petrosyan"
                    className="w-full px-4 py-3 rounded-2xl bg-pastel-card border border-pastel-border text-xs sm:text-sm font-medium text-pastel-text focus:outline-none focus:border-pastel-rose shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-pastel-text mb-1">
                    {getTranslation(lang, 'labelEmail')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sona@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-pastel-card border border-pastel-border text-xs sm:text-sm font-medium text-pastel-text focus:outline-none focus:border-pastel-rose shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-pastel-text mb-1">
                  {getTranslation(lang, 'labelAddress')} *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={country === 'Armenia' ? 'e.g. 24 Mashtots Ave, Apt 12, Yerevan' : 'e.g. 1200 S Brand Blvd, Glendale, CA 91204'}
                  className="w-full px-4 py-3 rounded-2xl bg-pastel-card border border-pastel-border text-xs sm:text-sm font-medium text-pastel-text focus:outline-none focus:border-pastel-rose shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-pastel-text mb-1">
                  {getTranslation(lang, 'labelNotes')}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'en' ? 'Any favorite authors, tea allergies, or gift messages...' : 'Հատուկ ցանկություններ, հեղինակներ կամ նվերի մաղթանք...'}
                  className="w-full px-4 py-3 rounded-2xl bg-pastel-card border border-pastel-border text-xs sm:text-sm font-medium text-pastel-text focus:outline-none focus:border-pastel-rose shadow-sm"
                />
              </div>
            </div>

            {/* Submit & Redirect to Payment Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl pastel-button-primary font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'en' ? 'Redirecting to Payment...' : 'Անցում վճարման էջին...'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>
                    {lang === 'en'
                      ? 'Confirm Preferences & Proceed to Payment'
                      : 'Հաստատել նախասիրությունները և անցնել վճարման'}
                  </span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};
