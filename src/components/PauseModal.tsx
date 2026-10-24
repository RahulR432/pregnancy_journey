import React from 'react';
import { Play, RotateCcw, Compass, BookOpen, Volume2, VolumeX, Home, X } from 'lucide-react';

interface PauseModalProps {
  onResume: () => void;
  onReplay: () => void;
  onOpenStageSelect: () => void;
  onOpenScrapbook: () => void;
  onExitToTitle: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  stageTitle: string;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  onResume,
  onReplay,
  onOpenStageSelect,
  onOpenScrapbook,
  onExitToTitle,
  isMuted,
  onToggleMute,
  stageTitle,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-sm w-full max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800">
        <div className="bg-slate-900 p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
          <div className="text-left min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">Game Paused</div>
            <h3 className="text-sm sm:text-base font-bold truncate">{stageTitle}</h3>
          </div>
          <button
            onClick={onResume}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Resume game"
            title="Resume (X)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5 overscroll-contain">
          <button
            onClick={onResume}
            className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Resume Journey</span>
          </button>

          <button
            onClick={onReplay}
            className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Restart Month</span>
          </button>

          <button
            onClick={onOpenStageSelect}
            className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-indigo-500" />
            <span>Stage Select</span>
          </button>

          <button
            onClick={onOpenScrapbook}
            className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-pink-500" />
            <span>Keepsake Scrapbook</span>
          </button>

          <button
            onClick={onToggleMute}
            className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
            <span>{isMuted ? 'Unmute Audio' : 'Mute Audio'}</span>
          </button>

          <button
            onClick={onExitToTitle}
            className="w-full py-2.5 px-4 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 text-rose-600" />
            <span>Return to Title Screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
