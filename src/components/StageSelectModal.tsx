import React from 'react';
import { STAGES_DATA } from '../data/stagesData';
import { X, Lock, CheckCircle, Play, Sparkles } from 'lucide-react';

interface StageSelectModalProps {
  highestUnlockedStage: number;
  currentStageId: number;
  onSelectStage: (stageId: number) => void;
  onClose: () => void;
}

export const StageSelectModal: React.FC<StageSelectModalProps> = ({
  highestUnlockedStage,
  currentStageId,
  onSelectStage,
  onClose,
}) => {
  const trimesters = [
    { key: 'preconception', label: 'Pre-pregnancy & Conception Prep', stages: STAGES_DATA.filter((s) => s.trimester === 'preconception') },
    { key: 'first', label: 'First Trimester (Months 1 - 3)', stages: STAGES_DATA.filter((s) => s.trimester === 'first') },
    { key: 'second', label: 'Second Trimester (Months 4 - 6)', stages: STAGES_DATA.filter((s) => s.trimester === 'second') },
    { key: 'third', label: 'Third Trimester & Arrival (Months 7 - 9)', stages: STAGES_DATA.filter((s) => s.trimester === 'third') },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-3xl w-full max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-rose-100 flex flex-col overflow-hidden text-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="text-lg font-bold">Select Pregnancy Month</h2>
              <p className="text-xs text-rose-100">Revisit past milestones or continue the journey</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {trimesters.map((group) => (
            <div key={group.key} className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                {group.label}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.stages.map((stg) => {
                  const isUnlocked = stg.id <= highestUnlockedStage;
                  const isCurrent = stg.id === currentStageId;

                  return (
                    <button
                      key={stg.id}
                      onClick={() => {
                        if (isUnlocked) {
                          onSelectStage(stg.id);
                          onClose();
                        }
                      }}
                      disabled={!isUnlocked}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                        isCurrent
                          ? 'border-rose-500 bg-rose-50/70 ring-2 ring-rose-400/40 shadow-sm'
                          : isUnlocked
                          ? 'border-slate-200 hover:border-pink-300 hover:bg-slate-50 bg-white'
                          : 'border-slate-100 bg-slate-50/60 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                          {stg.monthNumber === 0 ? 'Pre-pregnancy' : `Month ${stg.monthNumber}`}
                        </span>

                        {isCurrent ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white flex items-center gap-1">
                            <Play className="w-2.5 h-2.5 fill-white" />
                            <span>Current</span>
                          </span>
                        ) : isUnlocked ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Lock className="w-4 h-4 text-slate-400" />
                        )}
                      </div>

                      <div className="font-bold text-sm text-slate-900 mb-1">{stg.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-2 mb-2">{stg.challengesSummary}</div>

                      <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100">
                        <span className="text-amber-700 font-medium">🌱 {stg.babySizeComparison}</span>
                        {isUnlocked && <span className="text-rose-600 font-semibold">Play →</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
