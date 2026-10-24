import React, { useState } from 'react';
import { PlayerStats, StageData } from '../types/game';
import { Volume2, VolumeX, Pause, BookOpen, Heart, Zap, Droplets, CheckCircle, ListChecks, ChevronDown, ChevronUp } from 'lucide-react';

interface HUDProps {
  stats: PlayerStats;
  stage: StageData;
  isMuted: boolean;
  onToggleMute: () => void;
  onPause: () => void;
  onOpenScrapbook: () => void;
  onOpenStageSelect: () => void;
  assistActive: boolean;
}

export const HUD: React.FC<HUDProps> = ({
  stats,
  stage,
  isMuted,
  onToggleMute,
  onPause,
  onOpenScrapbook,
  onOpenStageSelect,
  assistActive,
}) => {
  const [isMobileObjectivesOpen, setIsMobileObjectivesOpen] = useState(false);
  const completedObjectivesCount = stage.objectives.filter((o) => o.completed).length;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 md:p-5 z-10">
      {/* Top Header Cluster: Low-occlusion floating pill status */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Stage & Baby Size Badge */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 text-white shadow-lg">
          <button
            onClick={onOpenStageSelect}
            className="flex items-center gap-2 hover:text-rose-300 transition-colors cursor-pointer group"
            title="Choose Stage"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-left">
              <div className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider group-hover:underline">
                {stage.monthNumber === 0 ? 'Pre-pregnancy' : `Month ${stage.monthNumber} • Trimester ${stage.trimester.toUpperCase()}`}
              </div>
              <div className="text-xs md:text-sm font-bold truncate max-w-[170px] md:max-w-[240px]">
                {stage.title}
              </div>
            </div>
          </button>

          <div className="hidden sm:block h-7 w-[1px] bg-white/20 mx-1" />

          {/* Baby Size Snapshot */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-200 bg-amber-950/40 px-2.5 py-1 rounded-xl border border-amber-500/20">
            <span>🌱</span>
            <span className="font-medium">{stage.babySizeComparison}</span>
          </div>
        </div>

        {/* Center: Vital Wellbeing Meters (Energy, Hydration, Partner Support) */}
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg text-white">
          {/* Energy */}
          <div className="flex items-center gap-1.5" title="Maternal Energy: Replenished by rest and nourishing snacks">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-[10px] text-slate-300">
                <span>Energy</span>
                <span className="font-mono tabular-nums font-bold text-amber-300 ml-1">{Math.round(stats.energy)}%</span>
              </div>
              <div className="w-16 md:w-20 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, Math.min(100, stats.energy))}%` }}
                />
              </div>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-white/15" />

          {/* Hydration */}
          <div className="flex items-center gap-1.5" title="Hydration Meter: Replenished by fresh water and fluid sips">
            <Droplets className="w-4 h-4 text-sky-400 fill-sky-400" />
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-[10px] text-slate-300">
                <span>Hydration</span>
                <span className="font-mono tabular-nums font-bold text-sky-300 ml-1">{Math.round(stats.hydration)}%</span>
              </div>
              <div className="w-16 md:w-20 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-sky-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, Math.min(100, stats.hydration))}%` }}
                />
              </div>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-white/15" />

          {/* Partner Support Meter */}
          <div
            className={`flex items-center gap-1.5 transition-all ${
              assistActive ? 'scale-105 ring-2 ring-pink-500 rounded-xl px-1' : ''
            }`}
            title="Partner Support: Boosted by listening, chores, back rubs, and teamwork"
          >
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-[10px] text-slate-300">
                <span>Teamwork</span>
                <span className="font-mono tabular-nums font-bold text-pink-300 ml-1">{Math.round(stats.partnerSupport)}%</span>
              </div>
              <div className="w-16 md:w-20 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, Math.min(100, stats.partnerSupport))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 text-white shadow-lg">
          {/* Scrapbook Button */}
          <button
            onClick={onOpenScrapbook}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-xs font-medium text-rose-200 transition-colors cursor-pointer"
            title="Open Journey Keepsake Scrapbook"
          >
            <BookOpen className="w-4 h-4 text-rose-300" />
            <span className="hidden sm:inline">Scrapbook</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Pause Button */}
          <button
            onClick={onPause}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
            title="Pause Game (Esc)"
          >
            <Pause className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Area: Mission Objectives Tracker (lifted comfortably above mobile controls via mb-24 md:mb-0) & Keyboard Hints */}
      <div className="flex items-end justify-between gap-4 mb-24 md:mb-0">
        {/* Active Objectives Widget with mobile toggle */}
        <div className="pointer-events-auto max-w-[280px] sm:max-w-sm bg-slate-900/90 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/10 text-white shadow-xl transition-all">
          <button
            onClick={() => setIsMobileObjectivesOpen((prev) => !prev)}
            className="flex items-center justify-between gap-2 w-full text-left cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <ListChecks className="w-3.5 h-3.5" />
              <span>Month Objectives</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {completedObjectivesCount} / {stage.objectives.length} Done
              </span>
              <span className="md:hidden text-slate-400 group-hover:text-white transition-colors">
                {isMobileObjectivesOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </span>
            </div>
          </button>

          {/* Objectives Checklist: always visible on desktop, toggleable on mobile */}
          <div className={`mt-2 space-y-1 text-xs pt-1.5 border-t border-white/10 ${isMobileObjectivesOpen ? 'block' : 'hidden md:block'}`}>
            {stage.objectives.slice(0, 3).map((obj) => (
              <div key={obj.id} className="flex items-center gap-2">
                {obj.completed ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-500 shrink-0" />
                )}
                <span className={`truncate text-[11px] ${obj.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                  {obj.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Keyboard Hints (Minimal flat line) */}
        <div className="hidden lg:flex items-center gap-3 bg-slate-950/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-slate-300">
          <span><strong className="text-white">A / D</strong> Walk</span>
          <span>•</span>
          <span><strong className="text-white">Space</strong> Jump</span>
          <span>•</span>
          <span><strong className="text-white">Q</strong> Partner Assist</span>
          <span>•</span>
          <span><strong className="text-white">E</strong> Interact</span>
        </div>
      </div>
    </div>
  );
};
