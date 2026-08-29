'use client';

import React from 'react';
import { Language } from '@/lib/types';

interface DeliveryMapProps {
  lang: Language;
}

export const DeliveryMap: React.FC<DeliveryMapProps> = ({ lang }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-pastel-lavender/40 to-pastel-card reveal-on-scroll">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pastel-text">
            {lang === 'en' ? '✈️ We Ship With Love' : '✈️ Առաքում Ենք Սիրով'}
          </h2>
          <p className="mt-2.5 text-pastel-muted text-xs sm:text-sm max-w-xl mx-auto">
            {lang === 'en'
              ? 'Every box is carefully packed and shipped directly to your door in Armenia or the United States.'
              : 'Յուրաքանչյուր տուփ խնամքով փաթեթավորվում և առաքվում է ուղիղ Ձեր դռան մոտ՝ Հայաստանում կամ ԱՄՆ-ում:'}
          </p>
        </div>

        {/* SVG Map */}
        <div className="relative bg-white rounded-3xl border border-pastel-border shadow-xl p-6 sm:p-10 overflow-hidden">
          {/* Decorative background circles */}
          <div className="absolute top-4 left-4 w-32 h-32 bg-pastel-pink/30 rounded-full blur-2xl" />
          <div className="absolute bottom-4 right-4 w-40 h-40 bg-pastel-sage/30 rounded-full blur-2xl" />

          <svg
            viewBox="0 0 800 320"
            className="w-full max-w-3xl mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ocean background */}
            <rect width="800" height="320" fill="#F0F8FF" rx="16" />

            {/* Simple world landmass silhouettes (stylized) */}
            {/* North America */}
            <path
              d="M30,60 Q80,40 140,70 Q170,80 180,120 Q185,160 160,180 Q130,200 110,190 Q80,200 60,180 Q30,160 25,130 Q20,95 30,60Z"
              fill="#E8F5E9"
              stroke="#C8E6C9"
              strokeWidth="1.5"
            />
            {/* Central America */}
            <path
              d="M130,185 Q140,195 145,210 Q150,220 140,230 Q130,235 125,225 Q118,215 120,200Z"
              fill="#E8F5E9"
              stroke="#C8E6C9"
              strokeWidth="1"
            />
            {/* Europe */}
            <path
              d="M360,50 Q400,40 430,60 Q450,75 445,100 Q440,120 420,125 Q400,128 380,115 Q360,100 355,80 Q350,65 360,50Z"
              fill="#E8F5E9"
              stroke="#C8E6C9"
              strokeWidth="1.5"
            />
            {/* Asia / Armenia region */}
            <path
              d="M460,55 Q520,45 570,65 Q600,80 610,110 Q615,135 590,150 Q560,165 530,155 Q495,145 475,120 Q455,95 460,55Z"
              fill="#E8F5E9"
              stroke="#C8E6C9"
              strokeWidth="1.5"
            />
            {/* Africa */}
            <path
              d="M380,145 Q410,140 430,160 Q445,180 440,220 Q435,255 415,265 Q395,270 380,255 Q362,240 360,210 Q355,175 368,158Z"
              fill="#E8F5E9"
              stroke="#C8E6C9"
              strokeWidth="1"
            />

            {/* Dashed flight path arc */}
            <path
              d="M 135,130 Q 390,20 545,115"
              fill="none"
              stroke="#D48C90"
              strokeWidth="2.5"
              strokeDasharray="10,8"
              strokeLinecap="round"
            />

            {/* Animated plane icon along path */}
            <text x="330" y="48" fontSize="20" textAnchor="middle" className="animate-pulse">
              ✈️
            </text>

            {/* Los Angeles dot */}
            <circle cx="135" cy="130" r="10" fill="#D48C90" stroke="white" strokeWidth="2.5" />
            <circle cx="135" cy="130" r="18" fill="#D48C90" fillOpacity="0.2" />
            <text x="135" y="158" fontSize="12" textAnchor="middle" fill="#3D322C" fontWeight="bold">
              🇺🇸
            </text>
            <text x="135" y="172" fontSize="10" textAnchor="middle" fill="#7A6C63">
              Los Angeles
            </text>

            {/* Yerevan dot */}
            <circle cx="545" cy="115" r="10" fill="#D48C90" stroke="white" strokeWidth="2.5" />
            <circle cx="545" cy="115" r="18" fill="#D48C90" fillOpacity="0.2" />
            <text x="545" y="143" fontSize="12" textAnchor="middle" fill="#3D322C" fontWeight="bold">
              🇦🇲
            </text>
            <text x="545" y="157" fontSize="10" textAnchor="middle" fill="#7A6C63">
              Yerevan
            </text>
          </svg>

          {/* Stats row below map */}
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="text-center">
              <p className="font-serif font-bold text-xl text-pastel-accent">2</p>
              <p className="text-xs text-pastel-muted font-medium">
                {lang === 'en' ? 'Countries' : 'Երկիր (🇦🇲 & 🇺🇸)'}
              </p>
            </div>
            <div className="text-center border-x border-pastel-border">
              <p className="font-serif font-bold text-xl text-pastel-accent">7–14</p>
              <p className="text-xs text-pastel-muted font-medium">
                {lang === 'en' ? 'Days delivery' : 'Օր Առաքում'}
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif font-bold text-xl text-pastel-accent">100%</p>
              <p className="text-xs text-pastel-muted font-medium">
                {lang === 'en' ? 'Tracked' : 'Հետևելի Փոստ'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
