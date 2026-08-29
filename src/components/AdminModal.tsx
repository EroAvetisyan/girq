'use client';

import React from 'react';
import Link from 'next/link';
import { Language } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl border border-pastel-border">
        <div className="w-14 h-14 bg-pastel-pink text-pastel-accent rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-pastel-rose/30">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="font-serif font-bold text-2xl text-pastel-text">
            {getTranslation(lang, 'adminTitle')}
          </h3>
          <p className="text-xs text-pastel-muted leading-relaxed">
            {getTranslation(lang, 'adminSubtitle')}
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/admin"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl pastel-button-primary font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{lang === 'en' ? 'Open Admin Dashboard (/admin)' : 'Բացել Ադմինիստրատիվ Պանելը (/admin)'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200 transition-all"
          >
            {getTranslation(lang, 'cancelBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};
