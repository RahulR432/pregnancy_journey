import React, { useState } from 'react';
import { PartnerDialogueEvent } from '../types/game';
import { Heart, MessageCircleHeart, Sparkles, ArrowRight, X } from 'lucide-react';
import { sound } from '../audio/soundEngine';

interface PartnerDialogueModalProps {
  event: PartnerDialogueEvent;
  onChoiceSelected: (supportDelta: number) => void;
}

export const PartnerDialogueModal: React.FC<PartnerDialogueModalProps> = ({ event, onChoiceSelected }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    setShowResponse(true);
    sound.playPartnerSupport();
  };

  const handleContinue = () => {
    if (selectedIndex === null) return;
    const choice = event.choices[selectedIndex];
    onChoiceSelected(choice.supportDelta);
  };

  const handleClose = () => {
    const delta = selectedIndex !== null ? event.choices[selectedIndex].supportDelta : 15;
    onChoiceSelected(delta);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-lg w-full max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-pink-100 flex flex-col overflow-hidden text-slate-800">
        {/* Header with Accessible Close Button */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <MessageCircleHeart className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wider text-pink-100">
                Partner Teamwork Moment
              </div>
              <h3 className="text-sm sm:text-base font-bold truncate">{event.situation}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            <Heart className="w-5 h-5 text-pink-200 fill-pink-200 animate-pulse hidden sm:block" />
            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close scenario"
              title="Close (X)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Conversation Box */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-contain">
          {/* Partner Prompt */}
          <div className="flex items-start gap-3 bg-pink-50/70 p-4 rounded-2xl border border-pink-100">
            <div className="w-9 h-9 rounded-full bg-pink-500 text-white font-bold flex items-center justify-center shrink-0 text-sm shadow">
              L
            </div>
            <div className="text-xs sm:text-sm font-medium text-pink-950 leading-relaxed">
              {event.partnerQuestion}
            </div>
          </div>

          {!showResponse ? (
            /* Choices */
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Choose Maya's response:
              </div>
              {event.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-pink-400 hover:bg-pink-50/50 text-left text-xs sm:text-sm font-medium text-slate-700 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span>{choice.label}</span>
                  <Sparkles className="w-4 h-4 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                </button>
              ))}
            </div>
          ) : (
            /* Dialogue Resolution */
            <div className="space-y-3 animate-fadeIn">
              {/* Partner reply */}
              <div className="bg-blue-50/80 p-3.5 rounded-2xl border border-blue-100 text-xs sm:text-sm text-blue-950 leading-relaxed">
                {event.choices[selectedIndex!].partnerResponse}
              </div>

              {/* Maya reply */}
              <div className="bg-rose-50/80 p-3.5 rounded-2xl border border-rose-100 text-xs sm:text-sm text-rose-950 leading-relaxed">
                {event.choices[selectedIndex!].mayaResponse}
              </div>

              {/* Support meter boost reward badge */}
              <div className="flex items-center justify-center gap-2 py-2 px-3 bg-pink-100/70 rounded-xl text-pink-800 text-xs font-semibold">
                <Heart className="w-4 h-4 text-pink-600 fill-pink-600" />
                <span>Teamwork Boosted: +{event.choices[selectedIndex!].supportDelta} Support Points!</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {showResponse && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
            <button
              onClick={handleContinue}
              className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Keep Journeying</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
