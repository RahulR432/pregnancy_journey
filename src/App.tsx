import React, { useState, useEffect, useCallback } from 'react';
import { STAGES_DATA } from './data/stagesData';
import { StageData, PlayerStats, GameProgress, FoodItemData, ObstacleData } from './types/game';
import { GameCanvas } from './game/GameCanvas';
import { HUD } from './components/HUD';
import { TitleScreen } from './components/TitleScreen';
import { StageCompleteModal } from './components/StageCompleteModal';
import { MedicalCheckModal } from './components/MedicalCheckModal';
import { PartnerDialogueModal } from './components/PartnerDialogueModal';
import { NpcDialogueModal } from './components/NpcDialogueModal';
import { ScrapbookModal } from './components/ScrapbookModal';
import { StageSelectModal } from './components/StageSelectModal';
import { FoodGuideModal } from './components/FoodGuideModal';
import { PauseModal } from './components/PauseModal';
import { sound } from './audio/soundEngine';

const STORAGE_KEY = 'pregnancy_journey_save_v1';

export default function App() {
  // Game Screen State
  const [gameMode, setGameMode] = useState<'title' | 'playing' | 'stage_complete'>('title');
  const [currentStageId, setCurrentStageId] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [assistActive, setAssistActive] = useState<boolean>(false);
  const [stageSessionKey, setStageSessionKey] = useState<number>(1);

  // Modals & Overlays
  const [showStageSelect, setShowStageSelect] = useState<boolean>(false);
  const [showScrapbook, setShowScrapbook] = useState<boolean>(false);
  const [showFoodGuide, setShowFoodGuide] = useState<boolean>(false);
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);

  // In-Game Event Triggers
  const [showPartnerDialogue, setShowPartnerDialogue] = useState<boolean>(false);
  const [showMedicalModal, setShowMedicalModal] = useState<boolean>(false);
  const [showNpcModal, setShowNpcModal] = useState<boolean>(false);

  // Player Stats for Current Stage
  const [stats, setStats] = useState<PlayerStats>({
    energy: 85,
    hydration: 80,
    partnerSupport: 60,
    score: 100,
  });

  // Persistent Game Progress
  const [progress, setProgress] = useState<GameProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      currentStageId: 1,
      highestUnlockedStage: 1,
      unlockedMemories: [],
      collectedNutritionFacts: [],
      totalSupportScore: 0,
    };
  });

  // Current Stage Object (with mutable completed objectives for the run)
  const [currentStage, setCurrentStage] = useState<StageData>(() => {
    return JSON.parse(JSON.stringify(STAGES_DATA[0]));
  });

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Handle stage load
  const loadStage = useCallback((stageId: number) => {
    const base = STAGES_DATA.find((s) => s.id === stageId) || STAGES_DATA[0];
    setCurrentStage(JSON.parse(JSON.stringify(base)));
    setCurrentStageId(stageId);
    setStageSessionKey((k) => k + 1);
    setStats({
      energy: 85,
      hydration: 80,
      partnerSupport: 65,
      score: 100,
    });
    setIsPaused(false);
    setShowPauseModal(false);
    setShowPartnerDialogue(false);
    setShowMedicalModal(false);
    setShowNpcModal(false);
  }, []);

  // Escape key for pause toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        if (gameMode === 'playing') {
          setIsPaused((prev) => {
            const next = !prev;
            setShowPauseModal(next);
            return next;
          });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameMode]);

  // Audio mute toggle handler
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Start game from title screen
  const handleStartGame = () => {
    loadStage(progress.highestUnlockedStage);
    setGameMode('playing');
    sound.startMusic();
  };

  // Food collected handler
  const handleFoodCollected = (food: FoodItemData) => {
    setStats((prev) => {
      let energyBoost = 15;
      let hydrationBoost = 0;
      let supportBoost = 5;

      if (food.type === 'banana') {
        energyBoost = 30;
      } else if (food.type === 'water') {
        energyBoost = 5;
        hydrationBoost = 35;
      } else if (food.type === 'orange') {
        energyBoost = 15;
        hydrationBoost = 15;
      } else if (food.type === 'pillow') {
        energyBoost = 25;
        supportBoost = 20;
      } else if (food.type === 'milk' || food.type === 'spinach') {
        energyBoost = 20;
        supportBoost = 10;
      }

      return {
        ...prev,
        energy: Math.min(100, prev.energy + energyBoost),
        hydration: Math.min(100, prev.hydration + hydrationBoost),
        partnerSupport: Math.min(100, prev.partnerSupport + supportBoost),
        score: prev.score + 50,
      };
    });

    // Mark food-related objective complete
    setCurrentStage((prevStage) => {
      const updatedObjs = prevStage.objectives.map((obj) => {
        if (
          (food.type === 'spinach' && (obj.id.includes('spinach') || obj.id.includes('folate') || obj.id.includes('iron'))) ||
          (food.type === 'water' && (obj.id.includes('water') || obj.id.includes('hydrate') || obj.id.includes('sip'))) ||
          (food.type === 'banana' && (obj.id.includes('banana') || obj.id.includes('snack'))) ||
          (food.type === 'orange' && (obj.id.includes('orange') || obj.id.includes('fruit') || obj.id.includes('citrus'))) ||
          (food.type === 'milk' && (obj.id.includes('milk') || obj.id.includes('calcium') || obj.id.includes('protein'))) ||
          (food.type === 'pillow' && (obj.id.includes('pillow') || obj.id.includes('comfort')))
        ) {
          return { ...obj, completed: true };
        }
        return obj;
      });
      return { ...prevStage, objectives: updatedObjs };
    });

    // Track in collected nutrition facts
    setProgress((prev) => {
      const exists = prev.collectedNutritionFacts.some((f) => f.foodType === food.type);
      if (!exists) {
        return {
          ...prev,
          collectedNutritionFacts: [
            ...prev.collectedNutritionFacts,
            { foodType: food.type, title: food.name, fact: food.nutritionFact },
          ],
        };
      }
      return prev;
    });
  };

  // Obstacle cleared handler
  const handleObstacleCleared = (obstacle: ObstacleData) => {
    setCurrentStage((prevStage) => {
      const updatedObjs = prevStage.objectives.map((obj) => {
        if (obj.id.includes('teamwork') || obj.id.includes('partner') || obj.id.includes('assist') || obj.id.includes('lift')) {
          return { ...obj, completed: true };
        }
        return obj;
      });
      return { ...prevStage, objectives: updatedObjs };
    });
  };

  // Partner Dialogue Triggered
  const handlePartnerDialogueTrigger = () => {
    setIsPaused(true);
    setShowPartnerDialogue(true);
  };

  // Partner Choice Selected
  const handlePartnerChoiceSelected = (supportDelta: number) => {
    setShowPartnerDialogue(false);
    setIsPaused(false);
    setStats((prev) => ({
      ...prev,
      partnerSupport: Math.min(100, prev.partnerSupport + supportDelta),
      score: prev.score + supportDelta * 2,
    }));
    // Mark dialogue objective complete
    setCurrentStage((prevStage) => {
      const updatedObjs = prevStage.objectives.map((obj) => {
        if (obj.id.includes('talk') || obj.id.includes('feelings') || obj.id.includes('checkin') || obj.id.includes('kick')) {
          return { ...obj, completed: true };
        }
        return obj;
      });
      return { ...prevStage, objectives: updatedObjs };
    });
  };

  // Medical Dilemma Triggered
  const handleMedicalDilemmaTrigger = () => {
    setIsPaused(true);
    setShowMedicalModal(true);
  };

  // Medical Dilemma Resolved
  const handleMedicalResolved = (wasCorrect: boolean) => {
    setShowMedicalModal(false);
    setIsPaused(false);
    setStats((prev) => ({
      ...prev,
      score: prev.score + (wasCorrect ? 100 : 20),
      partnerSupport: Math.min(100, prev.partnerSupport + (wasCorrect ? 15 : 5)),
    }));
    // Complete medical/safety objective
    setCurrentStage((prevStage) => {
      const updatedObjs = prevStage.objectives.map((obj) => {
        if (obj.id.includes('call') || obj.id.includes('redflag') || obj.id.includes('screening') || obj.id.includes('rule') || obj.id.includes('time')) {
          return { ...obj, completed: true };
        }
        return obj;
      });
      return { ...prevStage, objectives: updatedObjs };
    });
  };

  // NPC Interaction
  const handleNpcInteract = () => {
    setIsPaused(true);
    setShowNpcModal(true);
    // Mark clinic visit objective complete
    setCurrentStage((prevStage) => {
      const updatedObjs = prevStage.objectives.map((obj) => {
        if (obj.id.includes('clinic') || obj.id.includes('scan') || obj.id.includes('doctor') || obj.id.includes('workshop') || obj.id.includes('midwife') || obj.id.includes('review') || obj.id.includes('arrival')) {
          return { ...obj, completed: true };
        }
        return obj;
      });
      return { ...prevStage, objectives: updatedObjs };
    });
  };

  // Stage Completed
  const handleStageComplete = () => {
    setGameMode('stage_complete');
    setIsPaused(true);

    // Save unlock progress
    setProgress((prev) => {
      const nextUnlocked = Math.min(10, Math.max(prev.highestUnlockedStage, currentStageId + 1));
      const memoryId = currentStage.memoryReward.id;
      const memories = prev.unlockedMemories.includes(memoryId)
        ? prev.unlockedMemories
        : [...prev.unlockedMemories, memoryId];

      return {
        ...prev,
        highestUnlockedStage: nextUnlocked,
        unlockedMemories: memories,
        totalSupportScore: prev.totalSupportScore + Math.round(stats.partnerSupport),
      };
    });
  };

  // Advance to Next Stage
  const handleNextStage = () => {
    const nextId = currentStageId + 1;
    if (nextId <= 10) {
      loadStage(nextId);
      setGameMode('playing');
    } else {
      setShowScrapbook(true);
    }
  };

  // Replay Current Stage
  const handleReplayStage = () => {
    loadStage(currentStageId);
    setGameMode('playing');
  };

  // Select Stage to Play
  const handleSelectStageToPlay = (stageId: number) => {
    loadStage(stageId);
    setGameMode('playing');
    sound.startMusic();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans select-none flex flex-col justify-center items-center">
      {/* 1. Title Screen Shell */}
      {gameMode === 'title' && (
        <TitleScreen
          onStartGame={handleStartGame}
          onOpenStageSelect={() => setShowStageSelect(true)}
          onOpenScrapbook={() => setShowScrapbook(true)}
          onOpenFoodGuide={() => setShowFoodGuide(true)}
          unlockedCount={progress.highestUnlockedStage}
        />
      )}

      {/* 2. Active 2D Game Shell */}
      {(gameMode === 'playing' || gameMode === 'stage_complete') && (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Main 2D Canvas */}
          <GameCanvas
            stage={currentStage}
            stageSessionKey={stageSessionKey}
            isPaused={isPaused}
            onFoodCollected={handleFoodCollected}
            onObstacleCleared={handleObstacleCleared}
            onPartnerDialogueTrigger={handlePartnerDialogueTrigger}
            onMedicalDilemmaTrigger={handleMedicalDilemmaTrigger}
            onNpcInteract={handleNpcInteract}
            onStageComplete={handleStageComplete}
            onStatsUpdate={(eDelta, hDelta, sDelta) => {
              setStats((prev) => ({
                ...prev,
                energy: Math.min(100, Math.max(10, prev.energy + eDelta)),
                hydration: Math.min(100, Math.max(10, prev.hydration + hDelta)),
                partnerSupport: Math.min(100, Math.max(10, prev.partnerSupport + sDelta)),
              }));
            }}
            onAssistActiveState={setAssistActive}
          />

          {/* Low-Occlusion HUD Overlay */}
          <HUD
            stats={stats}
            stage={currentStage}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onPause={() => {
              setIsPaused(true);
              setShowPauseModal(true);
            }}
            onOpenScrapbook={() => {
              setIsPaused(true);
              setShowScrapbook(true);
            }}
            onOpenStageSelect={() => {
              setIsPaused(true);
              setShowStageSelect(true);
            }}
            assistActive={assistActive}
          />
        </div>
      )}

      {/* 3. Stage Complete Modal */}
      {gameMode === 'stage_complete' && (
        <StageCompleteModal
          stage={currentStage}
          stats={stats}
          onNextStage={handleNextStage}
          onReplayStage={handleReplayStage}
          onOpenScrapbook={() => setShowScrapbook(true)}
          hasNextStage={currentStageId < 10}
        />
      )}

      {/* 4. Partner Dialogue Event Modal */}
      {showPartnerDialogue && currentStage.partnerDialogue && (
        <PartnerDialogueModal
          event={currentStage.partnerDialogue}
          onChoiceSelected={handlePartnerChoiceSelected}
        />
      )}

      {/* 5. Health & Safety Medical Dilemma Modal */}
      {showMedicalModal && currentStage.medicalDilemma && (
        <MedicalCheckModal
          dilemma={currentStage.medicalDilemma}
          onResolved={handleMedicalResolved}
        />
      )}

      {/* 6. Healthcare Provider NPC Consultation Modal */}
      {showNpcModal && currentStage.npc && (
        <NpcDialogueModal
          npc={currentStage.npc}
          onClose={() => {
            setShowNpcModal(false);
            setIsPaused(false);
          }}
        />
      )}

      {/* 7. Keepsake Scrapbook Album Modal */}
      {showScrapbook && (
        <ScrapbookModal
          progress={progress}
          onClose={() => {
            setShowScrapbook(false);
            if (gameMode === 'playing' && !showPauseModal) {
              setIsPaused(false);
            }
          }}
          onSelectStageToPlay={handleSelectStageToPlay}
        />
      )}

      {/* 8. Stage Select Roadmap Modal */}
      {showStageSelect && (
        <StageSelectModal
          highestUnlockedStage={progress.highestUnlockedStage}
          currentStageId={currentStageId}
          onSelectStage={handleSelectStageToPlay}
          onClose={() => {
            setShowStageSelect(false);
            if (gameMode === 'playing' && !showPauseModal) {
              setIsPaused(false);
            }
          }}
        />
      )}

      {/* 9. Food Power-Ups & Medical Philosophy Guide Modal */}
      {showFoodGuide && (
        <FoodGuideModal
          onClose={() => setShowFoodGuide(false)}
        />
      )}

      {/* 10. Pause Menu Modal */}
      {showPauseModal && (
        <PauseModal
          stageTitle={currentStage.title}
          onResume={() => {
            setShowPauseModal(false);
            setIsPaused(false);
          }}
          onReplay={() => {
            setShowPauseModal(false);
            handleReplayStage();
          }}
          onOpenStageSelect={() => {
            setShowPauseModal(false);
            setShowStageSelect(true);
          }}
          onOpenScrapbook={() => {
            setShowPauseModal(false);
            setShowScrapbook(true);
          }}
          onExitToTitle={() => {
            setShowPauseModal(false);
            setIsPaused(false);
            setGameMode('title');
            sound.stopMusic();
          }}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}
    </div>
  );
}
