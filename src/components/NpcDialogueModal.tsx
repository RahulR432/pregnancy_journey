import React from 'react';
import { InteractiveNpc } from '../types/game';
import { Stethoscope, CheckCircle, X } from 'lucide-react';

interface NpcDialogueModalProps {
  npc: InteractiveNpc;
  onClose: () => void;
}

export const NpcDialogueModal: React.FC<NpcDialogueModalProps> = ({ npc, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-md w-full max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-blue-100 flex flex-col overflow-hidden text-slate-800">
        {/* Header with Close X */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
                Clinical Care Consultation
              </div>
              <h3 className="text-sm sm:text-base font-bold truncate">{npc.name}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close consultation"
            title="Close (X)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Conversation Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-contain">
          <div className="space-y-3">
            {npc.dialogue.map((line, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                "{line}"
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
            <span className="font-bold block mb-1">Clinical Advice:</span>
            {npc.advice}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Thank You, Doctor</span>
          </button>
        </div>
      </div>
    </div>
  );
};
