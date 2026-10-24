export type Trimester = 'preconception' | 'first' | 'second' | 'third';

export type FoodType = 'banana' | 'orange' | 'apple' | 'spinach' | 'milk' | 'water' | 'pillow';

export interface FoodItemData {
  id: string;
  type: FoodType;
  name: string;
  x: number; // level coordinate
  y: number;
  width: number;
  height: number;
  collected?: boolean;
  effectDescription: string;
  nutritionFact: string;
}

export type ObstacleType =
  | 'nausea_wave'
  | 'vomiting_spasm'
  | 'heartburn_flare'
  | 'leg_cramp'
  | 'pelvic_pressure'
  | 'smell_trigger'
  | 'fatigue_puddle'
  | 'heavy_grocery'
  | 'stairs'
  | 'high_shelf'
  | 'clutter';

export interface ObstacleData {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ObstacleType;
  description: string;
  requiresJump?: boolean;
  jumpPrompt?: string;
  resolved?: boolean;
  jumpedOver?: boolean;
  partnerAssistRequired?: boolean;
  partnerAssistHint?: string;
}

export interface InteractiveNpc {
  id: string;
  name: string;
  role: 'doctor' | 'midwife' | 'friend' | 'support_group';
  x: number;
  y: number;
  dialogue: string[];
  advice: string;
  interacted?: boolean;
}

export interface MedicalDilemma {
  id: string;
  prompt: string;
  context: string;
  triggerX: number; // Triggers when player reaches this x position
  triggered?: boolean;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  educationalTakeaway: string;
}

export interface PartnerDialogueEvent {
  id: string;
  triggerX: number;
  triggered?: boolean;
  situation: string;
  partnerQuestion: string;
  choices: {
    label: string;
    supportDelta: number;
    partnerResponse: string;
    mayaResponse: string;
  }[];
}

export interface StageData {
  id: number;
  monthNumber: number; // 0 for preconception, 1-9 for months
  title: string;
  subtitle: string;
  trimester: Trimester;
  levelLength: number; // world width in pixels
  challengesSummary: string;
  motherStateDesc: string;
  bellyScale: number; // visual scale of baby bump (0.1 to 1.3)
  babySizeComparison: string; // e.g. "Poppy seed", "Lemon", "Avocado", "Pumpkin"
  objectives: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  foods: FoodItemData[];
  obstacles: ObstacleData[];
  medicalDilemma?: MedicalDilemma;
  partnerDialogue?: PartnerDialogueEvent;
  npc?: InteractiveNpc;
  memoryReward: {
    id: string;
    title: string;
    dateLabel: string;
    description: string;
    icon: string;
    badgeText: string;
  };
  themeColor: {
    primary: string;
    skyTop: string;
    skyBottom: string;
    groundColor: string;
    accentColor: string;
  };
}

export interface PlayerStats {
  energy: number; // 0 - 100
  hydration: number; // 0 - 100
  partnerSupport: number; // 0 - 100
  score: number;
}

export interface GameProgress {
  currentStageId: number;
  highestUnlockedStage: number;
  unlockedMemories: string[];
  collectedNutritionFacts: {
    foodType: FoodType;
    title: string;
    fact: string;
  }[];
  totalSupportScore: number;
}
