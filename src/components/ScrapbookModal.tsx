import React, { useState } from 'react';
import { STAGES_DATA } from '../data/stagesData';
import { GameProgress, FoodType } from '../types/game';
import { X, BookOpen, Apple, Heart, Award, Lock, Sparkles, CheckCircle } from 'lucide-react';

interface ScrapbookModalProps {
  progress: GameProgress;
  onClose: () => void;
  onSelectStageToPlay: (stageId: number) => void;
}

export const ScrapbookModal: React.FC<ScrapbookModalProps> = ({
  progress,
  onClose,
  onSelectStageToPlay,
}) => {
  const [activeTab, setActiveTab] = useState<'memories' | 'nutrition' | 'bump_growth'>('memories');

  const foodInfoList: { type: FoodType; name: string; title: string; fact: string; emoji: string }[] = [
    {
      type: 'banana',
      name: 'Banana',
      title: 'Energy Boost & Vitamin B6',
      fact: 'Restores quick energy without heavy digestion. High in potassium and vitamin B6, known to help ease morning sickness and leg cramps.',
      emoji: '🍌',
    },
    {
      type: 'orange',
      name: 'Orange',
      title: 'Vitamin C & Iron Absorption Shield',
      fact: 'Vitamin C is crucial for maternal collagen formation and immune vitality. Most importantly, it triples the absorption of non-heme plant iron.',
      emoji: '🍊',
    },
    {
      type: 'apple',
      name: 'Apple',
      title: 'Balanced Nutrition & Soluble Fiber',
      fact: 'Provides prebiotic pectin fiber to prevent common pregnancy constipation, offering steady, non-spiking carbohydrate energy.',
      emoji: '🍎',
    },
    {
      type: 'spinach',
      name: 'Leafy Spinach',
      title: 'Folate & Non-Heme Iron Power',
      fact: 'Folate is essential before and throughout pregnancy for neural tube development. Iron supports the 50% expansion of maternal blood volume.',
      emoji: '🥬',
    },
    {
      type: 'milk',
      name: 'Milk / Fortified Alternative',
      title: 'Calcium Power for Skeletal Growth',
      fact: 'Baby draws calcium rapidly during the 2nd and 3rd trimesters to mineralize bones and teeth. If intake is low, maternal bone stores are mobilized.',
      emoji: '🥛',
    },
    {
      type: 'water',
      name: 'Pure Water',
      title: 'Hydration Foundation',
      fact: 'Maintains amniotic fluid turnover, supports elevated kidney filtration, reduces head tension, and calms irritable uterine tightenings.',
      emoji: '💧',
    },
    {
      type: 'pillow',
      name: 'Pregnancy Body Pillow',
      title: 'Ergonomic Alignment & Rest',
      fact: 'While not a food, side-sleeping with pillow support between knees and under bump relieves pelvic strain and improves maternal sleep quality.',
      emoji: '🛏️',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-4xl w-full max-h-[90vh] bg-amber-50/95 rounded-3xl shadow-2xl border-2 border-amber-200 flex flex-col overflow-hidden text-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">Our Pregnancy Keepsake Scrapbook</h2>
              <p className="text-xs text-rose-100">Treasured moments, bump milestones & nutritional wisdom</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-amber-200 bg-amber-100/60 px-4 sm:px-6 gap-2 sm:gap-4 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('memories')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'memories'
                ? 'border-rose-600 text-rose-700 bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Memories ({progress.unlockedMemories.length}/10)</span>
          </button>

          <button
            onClick={() => setActiveTab('nutrition')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'nutrition'
                ? 'border-emerald-600 text-emerald-700 bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Apple className="w-4 h-4 text-emerald-500" />
            <span>Nutrition Handbook</span>
          </button>

          <button
            onClick={() => setActiveTab('bump_growth')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'bump_growth'
                ? 'border-purple-600 text-purple-700 bg-white/60 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Bump Growth Timeline</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'memories' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STAGES_DATA.map((stage) => {
                const isUnlocked = progress.unlockedMemories.includes(stage.memoryReward.id);

                return (
                  <div
                    key={stage.id}
                    className={`rounded-2xl p-4 transition-all border ${
                      isUnlocked
                        ? 'bg-white shadow-md border-amber-200 hover:shadow-lg'
                        : 'bg-amber-100/40 border-dashed border-amber-300 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                        {stage.monthNumber === 0 ? 'Pre-pregnancy' : `Month ${stage.monthNumber}`}
                      </span>
                      {isUnlocked ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Unlocked</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          <span>Locked</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1">{stage.memoryReward.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {isUnlocked ? stage.memoryReward.description : 'Complete this month to unlock this keepsake memory.'}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-amber-800 font-medium">🌱 {stage.babySizeComparison}</span>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectStageToPlay(stage.id);
                        }}
                        className="text-rose-600 hover:text-rose-700 font-semibold cursor-pointer underline"
                      >
                        {isUnlocked ? 'Replay' : 'Play Stage'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Important Medical Disclaimer Card */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm leading-relaxed">
                <div className="font-bold mb-1 flex items-center gap-1.5 text-emerald-800">
                  <Award className="w-4 h-4" />
                  <span>The Core Principle: Nourishment vs Medical Care</span>
                </div>
                Foods provide vital energy, cellular nourishment, hydration, and comfort during pregnancy.
                However, <strong>foods do not cure medical complications</strong> (such as preeclampsia, severe bleeding, or hyperemesis).
                Always consult your obstetrician, midwife, or maternity care team for any clinical concerns.
              </div>

              {/* Foods List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {foodInfoList.map((item) => (
                  <div key={item.type} className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                        <div className="text-[10px] font-semibold text-rose-600 uppercase tracking-wider">{item.title}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">{item.fact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bump_growth' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center">
                <h3 className="text-base font-bold text-slate-900">Baby Bump Growth Across the 10 Stages</h3>
                <p className="text-xs text-slate-600">Notice how Maya's bump naturally rounds and blossoms in-game each month!</p>
              </div>

              <div className="space-y-3">
                {STAGES_DATA.map((stage) => (
                  <div key={stage.id} className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0">
                        {stage.monthNumber === 0 ? 'P' : stage.monthNumber}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{stage.title}</div>
                        <div className="text-slate-500 text-[11px]">{stage.motherStateDesc}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-semibold text-amber-700">{stage.babySizeComparison}</div>
                      <div className="text-[10px] text-slate-400">Bump Scale: {(stage.bellyScale * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-amber-100/70 border-t border-amber-200 flex justify-between items-center text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span>Total Teamwork Points: <strong className="text-pink-600 font-mono">{progress.totalSupportScore}</strong></span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold transition-colors cursor-pointer"
          >
            Close Scrapbook
          </button>
        </div>
      </div>
    </div>
  );
};
