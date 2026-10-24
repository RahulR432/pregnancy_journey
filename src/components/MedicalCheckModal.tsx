import React, { useState } from 'react';
import { MedicalDilemma } from '../types/game';
import { ShieldAlert, CheckCircle2, XCircle, ArrowRight, Stethoscope, X, Award, Lightbulb } from 'lucide-react';
import { sound } from '../audio/soundEngine';

interface MedicalCheckModalProps {
  dilemma: MedicalDilemma;
  onResolved: (wasCorrect: boolean) => void;
}

export const MedicalCheckModal: React.FC<MedicalCheckModalProps> = ({ dilemma, onResolved }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedIndex(idx);
  };

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    setSubmitted(true);
    const chosenOption = dilemma.options[selectedIndex];
    if (chosenOption.isCorrect) {
      sound.playStageComplete();
    } else {
      sound.playMedicalAlert();
    }
  };

  const handleContinue = () => {
    const isCorrect = selectedIndex !== null ? dilemma.options[selectedIndex].isCorrect : false;
    onResolved(isCorrect);
  };

  const handleClose = () => {
    const isCorrect = selectedIndex !== null ? dilemma.options[selectedIndex].isCorrect : false;
    onResolved(isCorrect);
  };

  const selectedOption = selectedIndex !== null ? dilemma.options[selectedIndex] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      {/* ========================================================
          STEP 2: CLINICAL GUIDANCE POPUP (Appears immediately after submitting)
          ======================================================== */}
      {submitted && selectedOption ? (
        <div className="relative max-w-lg w-full max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-rose-100 flex flex-col overflow-hidden text-slate-800 animate-scaleUp">
          {/* Header Banner */}
          <div
            className={`p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-md ${
              selectedOption.isCorrect
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                : 'bg-gradient-to-r from-amber-600 to-rose-600'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                {selectedOption.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <ShieldAlert className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                  Clinical Guidance Result
                </div>
                <h3 className="text-base sm:text-lg font-bold leading-tight truncate">
                  {selectedOption.isCorrect ? 'Clinical Guidance Verified' : 'Important Clinical Takeaway'}
                </h3>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0 ml-2"
              aria-label="Close guidance popup"
              title="Close (X)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Popup Content Body (Crisp, focused, zero scrolling needed) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 overscroll-contain">
            {/* The Selected Option Badge */}
            <div
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-medium flex items-start gap-3 ${
                selectedOption.isCorrect
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-200 text-rose-950'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {selectedOption.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )}
              </div>
              <div>
                <span className="font-bold block mb-0.5 text-xs uppercase tracking-wider text-slate-500">
                  Your Answer:
                </span>
                <span>{selectedOption.text}</span>
              </div>
            </div>

            {/* Medical Rationale */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm leading-relaxed text-slate-800">
              <span className="font-bold block mb-1 text-slate-900 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-sky-600" />
                <span>Medical Explanation:</span>
              </span>
              <p>{selectedOption.feedback}</p>
            </div>

            {/* Foundational Medical Principle Card */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Essential Clinical Takeaway:</span>
              </div>
              <p>{dilemma.educationalTakeaway}</p>
            </div>

            {/* Rewards Tag */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-900">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Clinical Wisdom Earned:</span>
              </span>
              <span className="font-mono text-emerald-700 font-bold">
                {selectedOption.isCorrect ? '+100 Wisdom Score · +15 Teamwork' : '+20 Score · Safety Reviewed'}
              </span>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
            <button
              onClick={handleContinue}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue Adventure</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================
            STEP 1: QUESTION & SCENARIO OPTIONS
            ======================================================== */
        <div className="relative max-w-xl w-full max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-rose-100 flex flex-col overflow-hidden text-slate-800">
          {/* Top Alert Banner with Accessible Close Button */}
          <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-rose-200">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Health & Safety Clinical Wisdom</span>
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold leading-tight truncate">{dilemma.prompt}</h2>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0 ml-2"
              aria-label="Close scenario"
              title="Close (X)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Modal Body for Question & Choices */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-contain">
            {/* Situation Context */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs sm:text-sm leading-relaxed text-slate-700">
              <span className="font-semibold text-slate-900 block mb-1">Scenario:</span>
              {dilemma.context}
            </div>

            {/* Options List */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                What is the medically safe response?
              </div>

              {dilemma.options.map((option, idx) => {
                const isSelected = selectedIndex === idx;
                let borderClass = 'border-slate-200 hover:border-slate-400 bg-white';

                if (isSelected) {
                  borderClass = 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-400/30';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all text-xs sm:text-sm leading-relaxed cursor-pointer flex items-start gap-3 ${borderClass}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-rose-600 bg-rose-600' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                    <span className="font-medium text-slate-800">{option.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button
              onClick={handleSubmit}
              disabled={selectedIndex === null}
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              Confirm Choice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
