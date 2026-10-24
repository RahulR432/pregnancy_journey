import React from 'react';
import { Play, Sparkles, BookOpen, Compass, Apple, HeartHandshake } from 'lucide-react';

interface TitleScreenProps {
  onStartGame: () => void;
  onOpenStageSelect: () => void;
  onOpenScrapbook: () => void;
  onOpenFoodGuide: () => void;
  unlockedCount: number;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartGame,
  onOpenStageSelect,
  onOpenScrapbook,
  onOpenFoodGuide,
  unlockedCount,
}) => {
  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50 via-amber-50 to-emerald-50 text-slate-800 overflow-hidden">
      {/* Background Decorative Soft Bokeh Rings */}
      <div className="absolute top-12 left-16 w-72 h-72 rounded-full bg-rose-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 right-20 w-80 h-80 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center">
        {/* Soft Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200 shadow-sm text-xs font-semibold text-rose-600 mb-6 backdrop-blur-sm animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>A 2D Emotional & Educational Pregnancy Adventure</span>
        </div>

        {/* Bespoke Inline SVG Title Lockup */}
        <div className="mb-4">
          <svg className="w-full max-w-lg h-auto overflow-visible" viewBox="0 0 540 100">
            <defs>
              <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="50%" stopColor="#db2777" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <text
              x="270"
              y="55"
              textAnchor="middle"
              className="font-extrabold text-4xl sm:text-5xl tracking-tight"
              fill="url(#titleGrad)"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              The Pregnancy Journey
            </text>
            <text
              x="270"
              y="85"
              textAnchor="middle"
              className="font-medium text-xs sm:text-sm tracking-widest uppercase fill-slate-600"
            >
              Ten Months of Love, Teamwork & Nourishment
            </text>
          </svg>
        </div>

        {/* Story Subtitle Description */}
        <p className="text-slate-600 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
          Walk beside Maya and Leo as they prepare for parenthood and navigate all nine months of pregnancy.
          Collect food power-ups for stamina, support each other through real obstacles, and celebrate the miracle of new life!
        </p>

        {/* Core Principles Pill Note */}
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100/70 border border-emerald-300/60 rounded-xl text-emerald-800 text-xs max-w-md mb-8">
          <HeartHandshake className="w-5 h-5 shrink-0 text-emerald-600" />
          <span className="text-left leading-snug">
            <strong>Key Medical Principle:</strong> Foods provide energy, comfort, and nourishment—they do not cure complications. The game celebrates teamwork and seeking expert clinical care.
          </span>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-8">
          <button
            onClick={onStartGame}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-base shadow-xl shadow-rose-500/25 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            <span>{unlockedCount > 1 ? 'Continue Journey' : 'Begin Journey'}</span>
          </button>

          <button
            onClick={onOpenStageSelect}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-indigo-500" />
            <span>Select Month ({unlockedCount}/10)</span>
          </button>
        </div>

        {/* Secondary Info Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
          <button
            onClick={onOpenScrapbook}
            className="flex items-center gap-1.5 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-rose-500" />
            <span>Keepsake Scrapbook</span>
          </button>

          <span>•</span>

          <button
            onClick={onOpenFoodGuide}
            className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            <Apple className="w-4 h-4 text-emerald-500" />
            <span>Nutrition Power-Up Guide</span>
          </button>
        </div>

        {/* Flat Control Hints Line */}
        <div className="mt-10 pt-4 border-t border-slate-200/80 w-full max-w-md text-xs text-slate-500 font-mono">
          WASD / Arrows to Move • Space to Jump • Q for Partner Support • E to Interact
        </div>
      </div>
    </div>
  );
};
