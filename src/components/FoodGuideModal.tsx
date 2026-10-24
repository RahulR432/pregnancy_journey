import React from 'react';
import { X, Apple, HeartHandshake, ShieldCheck } from 'lucide-react';

interface FoodGuideModalProps {
  onClose: () => void;
}

export const FoodGuideModal: React.FC<FoodGuideModalProps> = ({ onClose }) => {
  const items = [
    {
      emoji: '🍌',
      name: 'Banana — Energy Boost',
      benefit: 'Restores vital in-game maternal energy.',
      fact: 'Easily digestible carbohydrates, rich in potassium and Vitamin B6 to help with nausea.',
    },
    {
      emoji: '🍊',
      name: 'Orange — Vitamin C Shield',
      benefit: 'Unlocks iron-absorption synergy and cellular vitality.',
      fact: 'Vitamin C promotes collagen synthesis and triples non-heme plant iron absorption in the gut.',
    },
    {
      emoji: '🍎',
      name: 'Apple — Balanced Nutrition',
      benefit: 'Adds balanced energy points and fiber support.',
      fact: 'Soluble pectin fiber assists digestion and prevents blood glucose spikes.',
    },
    {
      emoji: '🥬',
      name: 'Spinach — Folate & Iron Power',
      benefit: 'Unlocks crucial neural tube and maternal blood insights.',
      fact: 'Folic acid before and during early pregnancy is vital for neural tube development; iron supports blood expansion.',
    },
    {
      emoji: '🥛',
      name: 'Milk — Calcium Power',
      benefit: 'Mineralizes baby\'s bone skeleton and shields maternal bones.',
      fact: 'Crucial in trimesters 2 and 3 when baby is calcifying bones and tooth buds.',
    },
    {
      emoji: '💧',
      name: 'Water — Hydration Boost',
      benefit: 'Restores the in-game hydration meter.',
      fact: 'Supports amniotic fluid production, transports nutrients, and prevents uterine irritability.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-xl w-full max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-emerald-100 flex flex-col overflow-hidden text-slate-800">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Apple className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="text-lg font-bold">Food Power-Ups & Medical Principle</h2>
              <p className="text-xs text-emerald-100">Nutrition for stamina, comfort & resilience</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Fundamental Design Rule */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-1 text-amber-900">Foundational Design Principle:</strong>
              Foods provide nourishment, comfort, and steady resilience, but <strong>they do NOT cure pregnancy complications</strong>. Serious symptoms (such as vaginal bleeding, sudden severe headache, or decreased fetal movements) require prompt clinical care.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="font-bold text-xs text-slate-900">{item.name}</div>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700">{item.benefit}</div>
                <div className="text-[11px] text-slate-600 leading-snug">{item.fact}</div>
              </div>
            ))}
          </div>

          {/* Partner Support Highlight */}
          <div className="p-3.5 rounded-2xl bg-pink-50 border border-pink-200 text-xs text-pink-950 flex items-start gap-2.5">
            <HeartHandshake className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-pink-900">Partner Support System:</strong>
              Press <strong>Q</strong> or tap the Assist button so Leo steps in to lift heavy loads, relieve fatigue, and prepare comfort items!
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
