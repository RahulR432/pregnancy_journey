import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StageData, PlayerStats } from '../types/game';
import { Trophy, Star, ArrowRight, RotateCcw, BookOpen, Heart, Sparkles, X } from 'lucide-react';
import { sound } from '../audio/soundEngine';

interface StageCompleteModalProps {
  stage: StageData;
  stats: PlayerStats;
  onNextStage: () => void;
  onReplayStage: () => void;
  onOpenScrapbook: () => void;
  hasNextStage: boolean;
}

export const StageCompleteModal: React.FC<StageCompleteModalProps> = ({
  stage,
  stats,
  onNextStage,
  onReplayStage,
  onOpenScrapbook,
  hasNextStage,
}) => {
  useEffect(() => {
    sound.playStageComplete();

    // Burst celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#34d399', '#38bdf8'],
    });

    const timeout = setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-lg w-full max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-rose-100 flex flex-col overflow-hidden text-slate-800">
        {/* Close X Button in Top Right */}
        <button
          onClick={hasNextStage ? onNextStage : onOpenScrapbook}
          className="absolute top-4 right-4 p-2 rounded-xl bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer z-20 backdrop-blur-sm"
          aria-label="Close milestone"
          title="Close (X)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-5 sm:p-6 text-white text-center relative overflow-hidden shrink-0 shadow-sm">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Milestone Achieved</span>
          </div>

          <h2 className="text-2xl font-black">{stage.title}</h2>
          <p className="text-xs text-rose-100 mt-1">{stage.subtitle}</p>

          {/* Three Stars */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[1, 2, 3].map((star) => (
              <Star key={star} className="w-6 h-6 fill-amber-300 text-amber-300 animate-bounce" />
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-contain">
          {/* Unlocked Memory Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50/50 border border-pink-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-700 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>New Scrapbook Memory Unlocked</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pink-200 text-pink-800">
                {stage.memoryReward.badgeText}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">{stage.memoryReward.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{stage.memoryReward.description}</p>
          </div>

          {/* Stats Summary Cluster */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] uppercase font-semibold text-slate-500">Maternal Energy</div>
              <div className="text-lg font-black text-amber-500 font-mono tabular-nums">{Math.round(stats.energy)}%</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] uppercase font-semibold text-slate-500">Hydration</div>
              <div className="text-lg font-black text-sky-500 font-mono tabular-nums">{Math.round(stats.hydration)}%</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] uppercase font-semibold text-slate-500 flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                <span>Teamwork</span>
              </div>
              <div className="text-lg font-black text-pink-500 font-mono tabular-nums">{Math.round(stats.partnerSupport)}%</div>
            </div>
          </div>

          {/* Educational Takeaway Reminder */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 leading-snug">
            <strong>Key Insight:</strong> Nourishing meals provided sustained stamina, while partner care and clinical checkups kept mother and baby thriving.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onReplayStage}
              className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
              title="Replay Month"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenScrapbook}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-pink-600" />
              <span>View Keepsake Album</span>
            </button>
          </div>

          {hasNextStage ? (
            <button
              onClick={onNextStage}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next Month</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenScrapbook}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              <span>Celebrate Journey!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
