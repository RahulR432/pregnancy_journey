import { StageData } from '../types/game';

export const STAGES_DATA: StageData[] = [
  // Stage 1: Pre-pregnancy
  {
    id: 1,
    monthNumber: 0,
    title: 'Stage 1 — Preparing for Parenthood',
    subtitle: 'Pre-pregnancy Planning & Healthy Foundations',
    trimester: 'preconception',
    levelLength: 2400,
    challengesSummary: 'Preparing emotionally, managing stress, planning finances, adopting healthy habits, and scheduling preconception checkups.',
    motherStateDesc: 'Feeling hopeful and excited, focusing on preconception wellness and daily folic acid.',
    bellyScale: 0.1,
    babySizeComparison: 'A dream in your hearts',
    objectives: [
      { id: 'folate_greens', text: 'Collect Spinach for Folate / Folic Acid', completed: false },
      { id: 'water_habit', text: 'Hydrate with fresh water', completed: false },
      { id: 'preconception_talk', text: 'Discuss healthy lifestyle goals with Leo', completed: false },
      { id: 'clinic_visit', text: 'Reach the Preconception Wellness Clinic', completed: false },
    ],
    foods: [
      {
        id: 's1_spinach',
        type: 'spinach',
        name: 'Leafy Spinach',
        x: 420,
        y: 280,
        width: 36,
        height: 36,
        effectDescription: 'Nutrient Boost: Folate & Iron Foundation',
        nutritionFact: 'Folic acid (folate) is vital before conception and in early weeks to help prevent neural tube defects.'
      },
      {
        id: 's1_water',
        type: 'water',
        name: 'Fresh Water',
        x: 820,
        y: 310,
        width: 32,
        height: 36,
        effectDescription: 'Hydration Boost: +35 Hydration',
        nutritionFact: 'Establishing good hydration early supports blood volume expansion and overall cellular vitality.'
      },
      {
        id: 's1_apple',
        type: 'apple',
        name: 'Crisp Apple',
        x: 1300,
        y: 260,
        width: 34,
        height: 34,
        effectDescription: 'Balanced Nutrition: Fiber & Phytonutrients',
        nutritionFact: 'Whole fruits offer steady complex carbohydrates and prebiotic fiber for gut microbiome balance.'
      },
      {
        id: 's1_orange',
        type: 'orange',
        name: 'Juicy Orange',
        x: 1750,
        y: 270,
        width: 34,
        height: 34,
        effectDescription: 'Vitamin C Shield: Enhances non-heme iron absorption',
        nutritionFact: 'Vitamin C helps the body absorb plant-based iron from beans and leafy greens more effectively.'
      }
    ],
    obstacles: [
      {
        id: 's1_obs1',
        name: 'Stress & Overwhelm Surge',
        x: 640,
        y: 330,
        width: 75,
        height: 40,
        type: 'fatigue_puddle',
        requiresJump: true,
        jumpPrompt: 'Jump over stress surge! ⬆️',
        description: 'Everyday stress pile. Leap over with confidence!'
      },
      {
        id: 's1_obs2',
        name: 'Heavy Storage Box',
        x: 1100,
        y: 320,
        width: 60,
        height: 50,
        type: 'heavy_grocery',
        description: 'A heavy box of old paperwork. Ask Leo to carry it together!',
        partnerAssistRequired: true,
        partnerAssistHint: 'Press Q or tap "Partner Assist" so Leo can lift the heavy box!'
      }
    ],
    partnerDialogue: {
      id: 's1_dialogue',
      triggerX: 950,
      situation: 'Preparing our lifestyle before conceiving',
      partnerQuestion: 'Leo: "I want to support our journey from day one. What should we prioritize this month?"',
      choices: [
        {
          label: 'Let\'s both eat wholesome meals and start daily prenatal vitamins together',
          supportDelta: 25,
          partnerResponse: 'Leo: "Count me in! I\'ll set up a reminder and cook high-veggie dinners every week."',
          mayaResponse: 'Maya: "Having your active partnership makes me feel so supported and calm."'
        },
        {
          label: 'Let\'s review our budget and schedule our preconception checkup',
          supportDelta: 20,
          partnerResponse: 'Leo: "Great idea. I\'ll call the clinic tomorrow morning to book a joint consultation."',
          mayaResponse: 'Maya: "Checking off these practical steps gives us peace of mind."'
        }
      ]
    },
    medicalDilemma: {
      id: 's1_med',
      triggerX: 1600,
      prompt: 'Preconception Medical Wisdom Check',
      context: 'Maya asks about supplements: "I heard eating healthy is good enough. Do I still need a prenatal vitamin with folic acid?"',
      options: [
        {
          text: 'Yes! Medical guidelines advise 400 mcg of daily folic acid prior to conception, as the neural tube forms in the first 28 days.',
          isCorrect: true,
          feedback: 'Correct! The neural tube closes very early, often before a person even knows they are pregnant. Starting folic acid before conception is globally recommended.'
        },
        {
          text: 'No, eating a bowl of spinach once a week completely eliminates the need for any supplement.',
          isCorrect: false,
          feedback: 'Incorrect. While dietary greens are wonderful, clinical guidelines universally advise a folic acid supplement because synthetic folate is absorbed more reliably.'
        }
      ],
      educationalTakeaway: 'Nutritious foods provide wonderful fuel, but dedicated preconception medical advice and folic acid supplementation are essential clinical foundations.'
    },
    npc: {
      id: 's1_doctor',
      name: 'Dr. Evelyn, Preconception Clinician',
      role: 'doctor',
      x: 2200,
      y: 310,
      dialogue: [
        'Welcome! Taking steps before conception is the kindest gift you can give your future baby.',
        'Review medications with your doctor, verify immunizations, and prioritize stress reduction.'
      ],
      advice: 'Start daily folic acid, keep an active dialogue with your partner, and attend routine health screenings.'
    },
    memoryReward: {
      id: 'mem_s1',
      title: 'Our Preconception Roadmap',
      dateLabel: 'Pre-pregnancy Milestone',
      description: 'We started our prenatal vitamins, simplified our routines, and promised to approach this adventure as an equal, loving team.',
      icon: 'heart-handshake',
      badgeText: 'Team Foundation Laid'
    },
    themeColor: {
      primary: '#10b981',
      skyTop: '#ecfdf5',
      skyBottom: '#d1fae5',
      groundColor: '#34d399',
      accentColor: '#059669'
    }
  },

  // Stage 2: Month 1
  {
    id: 2,
    monthNumber: 1,
    title: 'Stage 2 — Month 1: A New Beginning',
    subtitle: 'The First Positive Test & Early Wonder',
    trimester: 'first',
    levelLength: 2500,
    challengesSummary: 'Uncertainty, early fatigue, possible mild implantation spotting, and the emotional wait for medical confirmation.',
    motherStateDesc: 'Experiencing sudden waves of sleepiness and deep excitement as cells rapidly divide.',
    bellyScale: 0.15,
    babySizeComparison: 'A tiny poppy seed (approx 1-2 mm)',
    objectives: [
      { id: 'water_refresh', text: 'Replenish hydration with fresh water', completed: false },
      { id: 'banana_energy', text: 'Collect a Banana for gentle potassium energy', completed: false },
      { id: 'partner_comfort', text: 'Talk with Leo about your early emotions', completed: false },
      { id: 'first_call', text: 'Call to schedule your first prenatal appointment', completed: false }
    ],
    foods: [
      {
        id: 's2_banana',
        type: 'banana',
        name: 'Ripe Banana',
        x: 480,
        y: 290,
        width: 34,
        height: 34,
        effectDescription: 'Energy Boost: +30 Energy',
        nutritionFact: 'Bananas provide easily digestible carbs, potassium, and vitamin B6, which may help ease early queasiness.'
      },
      {
        id: 's2_water',
        type: 'water',
        name: 'Cool Spring Water',
        x: 920,
        y: 300,
        width: 32,
        height: 36,
        effectDescription: 'Hydration Boost: +35 Hydration',
        nutritionFact: 'Water helps transport nutrients across the newly forming placenta and keeps cellular fluid balanced.'
      },
      {
        id: 's2_apple',
        type: 'apple',
        name: 'Crisp Apple Slices',
        x: 1450,
        y: 280,
        width: 34,
        height: 34,
        effectDescription: 'Gentle Snack: Easy on an empty stomach',
        nutritionFact: 'Small, mild carbohydrate snacks can help prevent the empty-stomach feeling that worsens morning tiredness.'
      }
    ],
    obstacles: [
      {
        id: 's2_fatigue',
        name: 'Progesterone Fatigue Surge',
        x: 680,
        y: 330,
        width: 80,
        height: 42,
        type: 'nausea_wave',
        requiresJump: true,
        jumpPrompt: 'Jump over fatigue surge! ⬆️',
        description: 'A sudden wave of first-month exhaustion. Leap over to keep your momentum!'
      },
      {
        id: 's2_shelf',
        name: 'High Pantry Shelf',
        x: 1250,
        y: 230,
        width: 50,
        height: 120,
        type: 'high_shelf',
        description: 'Pregnancy books and herbal teas on the top shelf. Let Leo fetch them safely.',
        partnerAssistRequired: true,
        partnerAssistHint: 'Ask Leo (press Q or tap Assist) to reach the high shelf without straining.'
      }
    ],
    partnerDialogue: {
      id: 's2_dialogue',
      triggerX: 1050,
      situation: 'Processing the two pink lines on the test',
      partnerQuestion: 'Leo: "Maya, my heart is racing. It\'s really happening! How are you feeling in your body right now?"',
      choices: [
        {
          label: '"I\'m amazed, but also feeling so unexpectedly tired. Can you hold me?"',
          supportDelta: 30,
          partnerResponse: 'Leo: "Always. You are growing human cells from scratch. Sleep as much as you need; I\'ve got dinner covered."',
          mayaResponse: 'Maya: "Hearing that takes away so much anxiety."'
        },
        {
          label: '"Let\'s keep it between us for a bit while we get our first ultrasound scheduled."',
          supportDelta: 25,
          partnerResponse: 'Leo: "Our little secret for now. I\'ll research the best local prenatal clinics tonight."',
          mayaResponse: 'Maya: "I love our little bubble."'
        }
      ]
    },
    medicalDilemma: {
      id: 's2_med',
      triggerX: 1750,
      prompt: 'Early Spotting & Warning Signs Check',
      context: 'Maya notices slight pink spotting on tissue and mild twinges. Her friend says: "Just drink extra orange juice to fix it!"',
      options: [
        {
          text: 'Understand that light spotting can be benign implantation, but persistent bleeding or sharp pain requires speaking with a healthcare provider—food cannot cure bleeding.',
          isCorrect: true,
          feedback: 'Accurate! Food provides nourishment, but bleeding or cramping should always be evaluated by a healthcare professional.'
        },
        {
          text: 'Drink three glasses of citrus juice because Vitamin C cures all early pregnancy complications.',
          isCorrect: false,
          feedback: 'False! Vitamin C is great for health, but it cannot treat or reverse pregnancy bleeding. Always contact clinical providers.'
        }
      ],
      educationalTakeaway: 'Food supports the mother\'s strength, but pregnancy bleeding or unilateral pelvic pain always requires professional medical assessment.'
    },
    npc: {
      id: 's2_nurse',
      name: 'Nurse Clara',
      role: 'midwife',
      x: 2300,
      y: 310,
      dialogue: [
        'Congratulations on your positive test!',
        'Early weeks bring surges of progesterone. Rest without apology.'
      ],
      advice: 'Stay hydrated, continue your prenatal vitamins, and call us anytime you have questions or concerning symptoms.'
    },
    memoryReward: {
      id: 'mem_s2',
      title: 'Two Pink Lines',
      dateLabel: 'Month 1 Milestone',
      description: 'The morning we found out. We held each other in the bathroom in disbelief and pure tenderness.',
      icon: 'sparkles',
      badgeText: 'The Journey Begins'
    },
    themeColor: {
      primary: '#3b82f6',
      skyTop: '#eff6ff',
      skyBottom: '#dbeafe',
      groundColor: '#60a5fa',
      accentColor: '#1d4ed8'
    }
  },

  // Stage 3: Month 2
  {
    id: 3,
    monthNumber: 2,
    title: 'Stage 3 — Month 2: The Nausea Challenge',
    subtitle: 'Navigating Morning (and Evening!) Sickness',
    trimester: 'first',
    levelLength: 2600,
    challengesSummary: 'Nausea, vomiting, sudden smell sensitivities, food aversions, and emotional sensitivity.',
    motherStateDesc: 'Super-sensitive sense of smell! Small, dry, plain snacks help keep energy steady.',
    bellyScale: 0.22,
    babySizeComparison: 'A little raspberry (approx 1.5 cm)',
    objectives: [
      { id: 'tolerated_snack', text: 'Collect dry crackers & banana snack', completed: false },
      { id: 'sip_water', text: 'Sip lemon-infused water frequently', completed: false },
      { id: 'dodge_smells', text: 'Bypass strong scent triggers with Leo', completed: false },
      { id: 'rest_bench', text: 'Reach the tranquil park rest bench', completed: false }
    ],
    foods: [
      {
        id: 's3_banana',
        type: 'banana',
        name: 'Gentle Banana Bites',
        x: 450,
        y: 280,
        width: 34,
        height: 34,
        effectDescription: 'Tolerated Fuel: Mild on sensitive stomach',
        nutritionFact: 'Vitamin B6 in bananas and whole grains is clinically recognized to help lessen the intensity of pregnancy nausea.'
      },
      {
        id: 's3_water',
        type: 'water',
        name: 'Chilled Lemon Water',
        x: 880,
        y: 300,
        width: 32,
        height: 36,
        effectDescription: 'Hydration Sip: Keeps fluids up',
        nutritionFact: 'Taking small, frequent sips between meals rather than chugging large amounts at mealtime prevents stomach stretching.'
      },
      {
        id: 's3_apple',
        type: 'apple',
        name: 'Cool Green Apple',
        x: 1350,
        y: 270,
        width: 34,
        height: 34,
        effectDescription: 'Tart Refreshment: Helps cut through nausea',
        nutritionFact: 'Tart flavors, like cold green apples or lemon wedges, often stimulate saliva and soothe the gag reflex.'
      },
      {
        id: 's3_milk',
        type: 'milk',
        name: 'Fortified Almond Milk',
        x: 1850,
        y: 280,
        width: 32,
        height: 36,
        effectDescription: 'Calcium & Gentle Protein',
        nutritionFact: 'If dairy milk feels heavy, calcium-fortified plant milks provide essential calcium without the strong dairy aroma.'
      }
    ],
    obstacles: [
      {
        id: 's3_nausea_wave',
        name: 'Morning Sickness Nausea Surge',
        x: 650,
        y: 330,
        width: 80,
        height: 46,
        type: 'nausea_wave',
        requiresJump: true,
        jumpPrompt: 'Jump over Nausea Surge! ⬆️',
        description: 'A swirling wave of pregnancy queasiness! Jump high to clear it.'
      },
      {
        id: 's3_vomiting_spasm',
        name: 'Sudden Vomiting Spasm',
        x: 1080,
        y: 330,
        width: 75,
        height: 48,
        type: 'vomiting_spasm',
        requiresJump: true,
        jumpPrompt: 'Leap over vomiting spasm! ⬆️',
        description: 'A bubbling gastro-spasm barrier. Leap over cleanly!'
      },
      {
        id: 's3_smell2',
        name: 'Pungent Cooking Odor Cloud',
        x: 1560,
        y: 330,
        width: 80,
        height: 42,
        type: 'smell_trigger',
        requiresJump: true,
        jumpPrompt: 'Jump over odor cloud! ⬆️',
        description: 'Intense scent trigger. Jump over to catch the fresh breeze!'
      }
    ],
    partnerDialogue: {
      id: 's3_dialogue',
      triggerX: 1100,
      situation: 'Maya cannot stomach the cooked dinner and feels guilty',
      partnerQuestion: 'Leo: "Maya, please don\'t force yourself to eat what makes you feel sick. How can I help right now?"',
      choices: [
        {
          label: '"Could you make me plain toast or crackers and open the window for fresh air?"',
          supportDelta: 30,
          partnerResponse: 'Leo: "On it right away! No guilt at all—eating whatever stays down is 100% fine right now."',
          mayaResponse: 'Maya: "Thank you for never making me feel bad for what I can or cannot eat."'
        },
        {
          label: '"Just sit with me while this wave passes, please."',
          supportDelta: 25,
          partnerResponse: 'Leo: "I\'m right here. Take slow, steady breaths with me."',
          mayaResponse: 'Maya: "Your calmness steadies me."'
        }
      ]
    },
    medicalDilemma: {
      id: 's3_med',
      triggerX: 1950,
      prompt: 'Recognizing Severe Hyperemesis Gravidarum',
      context: 'Maya asks: "If someone is vomiting multiple times an hour, unable to keep water down for 24 hours and feeling dizzy, what should they do?"',
      options: [
        {
          text: 'Seek immediate clinical assessment for Hyperemesis Gravidarum (which may require medical antiemetics and IV fluids), because severe dehydration cannot be solved by food power-ups.',
          isCorrect: true,
          feedback: 'Exactly right! While mild morning sickness benefits from ginger and snacks, severe non-stop vomiting is a medical complication that requires doctor care.'
        },
        {
          text: 'Force down a heavy salad because vegetables will cure the vomiting reflex.',
          isCorrect: false,
          feedback: 'Dangerously incorrect. Forcing food during severe vomiting exacerbates dehydration. Medical intervention is urgently needed.'
        }
      ],
      educationalTakeaway: 'Mild nausea can be soothed by tolerated snacks and ginger, but inability to retain fluids for 24h requires immediate clinical care.'
    },
    memoryReward: {
      id: 'mem_s3',
      title: 'The Bedside Cracker Jar',
      dateLabel: 'Month 2 Milestone',
      description: 'Leo placed dry crackers on the nightstand every evening so Maya could have a bite before lifting her head each morning.',
      icon: 'coffee',
      badgeText: 'Patience & Compassion'
    },
    themeColor: {
      primary: '#f59e0b',
      skyTop: '#fffbeb',
      skyBottom: '#fef3c7',
      groundColor: '#fbbf24',
      accentColor: '#d97706'
    }
  },

  // Stage 4: Month 3
  {
    id: 4,
    monthNumber: 3,
    title: 'Stage 4 — Month 3: The Energy Battle',
    subtitle: 'First Trimester Milestone & The 12-Week Ultrasound',
    trimester: 'first',
    levelLength: 2700,
    challengesSummary: 'Fatigue, lingering nausea, waiting for the end of the first trimester, and attending the 12-week ultrasound.',
    motherStateDesc: 'The placenta is taking over hormone production. Baby has tiny fingers and toes!',
    bellyScale: 0.32,
    babySizeComparison: 'A juicy lime (approx 5.4 cm)',
    objectives: [
      { id: 'iron_spinach', text: 'Collect leafy spinach for iron & folate', completed: false },
      { id: 'citrus_boost', text: 'Pick an orange for vitamin C synergy', completed: false },
      { id: 'chore_teamwork', text: 'Have Leo take over heavy household tasks', completed: false },
      { id: 'first_scan', text: 'Reach the Ultrasound Imaging Suite together', completed: false }
    ],
    foods: [
      {
        id: 's4_spinach',
        type: 'spinach',
        name: 'Iron-Rich Spinach',
        x: 520,
        y: 280,
        width: 36,
        height: 36,
        effectDescription: 'Nutrient Boost: Iron stores support maternal blood expansion',
        nutritionFact: 'A woman\'s blood volume increases by up to 50% during pregnancy. Iron is crucial to carry oxygen to the fetus.'
      },
      {
        id: 's4_orange',
        type: 'orange',
        name: 'Vitamin C Orange',
        x: 960,
        y: 290,
        width: 34,
        height: 34,
        effectDescription: 'Absorption Booster: Powers up non-heme iron uptake',
        nutritionFact: 'Pairing vitamin C with iron-containing foods can triple iron absorption in the digestive tract!'
      },
      {
        id: 's4_water',
        type: 'water',
        name: 'Cool Hydration Flask',
        x: 1480,
        y: 310,
        width: 32,
        height: 36,
        effectDescription: 'Hydration Boost: +30 Hydration',
        nutritionFact: 'Drinking plenty of fluids helps prevent constipation and supports amniotic fluid replenishment.'
      }
    ],
    obstacles: [
      {
        id: 's4_laundry',
        name: 'Giant Laundry Basket',
        x: 750,
        y: 320,
        width: 70,
        height: 50,
        type: 'heavy_grocery',
        description: 'Heavy chores. Let your partner take over heavy physical exertion.',
        partnerAssistRequired: true,
        partnerAssistHint: 'Press Q or tap Assist so Leo lifts and clears the laundry basket!'
      },
      {
        id: 's4_fatigue',
        name: 'First Trimester Fatigue Wall',
        x: 1720,
        y: 320,
        width: 70,
        height: 30,
        type: 'fatigue_puddle',
        description: 'Exhaustion. Take a brief resting breath before proceeding.'
      }
    ],
    partnerDialogue: {
      id: 's4_dialogue',
      triggerX: 1200,
      situation: 'Sitting in the waiting room for the 12-week ultrasound scan',
      partnerQuestion: 'Leo: "Maya, are you nervous about the scan? My palms are sweating!"',
      choices: [
        {
          label: '"A little nervous and so eager. Let\'s hold hands tightly."',
          supportDelta: 30,
          partnerResponse: 'Leo: "I\'ve got you. Whatever happens, we are in this together as a united team."',
          mayaResponse: 'Maya: "Your warmth makes all the waiting bearable."'
        },
        {
          label: '"I can\'t wait to hear the heartbeat for the first time!"',
          supportDelta: 25,
          partnerResponse: 'Leo: "The sonographer is calling our name right now. Let\'s go see our baby!"',
          mayaResponse: 'Maya: "Here we go!"'
        }
      ]
    },
    medicalDilemma: {
      id: 's4_med',
      triggerX: 2050,
      prompt: 'Prenatal Screening & Appointment Discipline',
      context: 'Someone comments: "Since you ate healthy this month, you don\'t really need to attend the 12-week ultrasound or blood panel."',
      options: [
        {
          text: 'Incorrect: Routine prenatal scans and screenings provide essential clinical information on fetal anatomy, growth, and maternal markers that nutrition alone cannot assess.',
          isCorrect: true,
          feedback: 'Exactly. Nutritional foods provide energy, but medical checkups verify fetal anatomy, placental position, and maternal blood pressure.'
        },
        {
          text: 'Correct: An apple a day replaces all ultrasound scans and clinical blood tests.',
          isCorrect: false,
          feedback: 'Completely false. Ultrasounds and clinical screenings are vital medical procedures.'
        }
      ],
      educationalTakeaway: 'Good food nourishes your cells, but clinical screenings give the care team the data needed to safeguard both mother and baby.'
    },
    npc: {
      id: 's4_sonographer',
      name: 'Sonographer Alex',
      role: 'doctor',
      x: 2450,
      y: 310,
      dialogue: [
        'There is the baby! See that little flicker? That is the heartbeat at 155 bpm.',
        'Ten tiny fingers, ten tiny toes, and a sweet little profile.'
      ],
      advice: 'The first trimester milestone is reached! You have navigated the toughest hormone shifts.'
    },
    memoryReward: {
      id: 'mem_s4',
      title: 'Baby\'s First Ultrasound Printout',
      dateLabel: 'Month 3 Milestone',
      description: 'Hearing that rhythmic "whoosh-whoosh-whoosh" heartbeat brought happy tears to both our eyes.',
      icon: 'camera',
      badgeText: 'First Trimester Completed'
    },
    themeColor: {
      primary: '#8b5cf6',
      skyTop: '#f5f3ff',
      skyBottom: '#ede9fe',
      groundColor: '#a78bfa',
      accentColor: '#6d28d9'
    }
  },

  // Stage 5: Month 4
  {
    id: 5,
    monthNumber: 4,
    title: 'Stage 5 — Month 4: The Fresh Start',
    subtitle: 'Entering the Second Trimester "Golden Period"',
    trimester: 'second',
    levelLength: 2800,
    challengesSummary: 'Changing body shape, adjusting maternity wear, appetite returning, building gentle fitness routines.',
    motherStateDesc: 'Energy is returning! The bump is starting to show, and morning sickness is easing.',
    bellyScale: 0.45,
    babySizeComparison: 'A fresh avocado (approx 12 cm)',
    objectives: [
      { id: 'protein_milk', text: 'Collect milk / fortified protein fuel', completed: false },
      { id: 'rainbow_fruit', text: 'Gather colorful apples and oranges', completed: false },
      { id: 'gentle_walk', text: 'Enjoy a scenic botanical walk with Leo', completed: false },
      { id: 'checkin_feelings', text: 'Talk about body positivity and changes', completed: false }
    ],
    foods: [
      {
        id: 's5_milk',
        type: 'milk',
        name: 'Calcium Milk / Kefir',
        x: 540,
        y: 280,
        width: 32,
        height: 36,
        effectDescription: 'Calcium Power: Essential for baby\'s developing skeleton',
        nutritionFact: 'If maternal calcium intake is low, the baby\'s growth will draw calcium from maternal bones. Stay stocked on calcium!'
      },
      {
        id: 's5_apple',
        type: 'apple',
        name: 'Sweet Honeycrisp Apple',
        x: 1050,
        y: 270,
        width: 34,
        height: 34,
        effectDescription: 'Fiber & Energy',
        nutritionFact: 'Dietary fiber keeps sluggish second-trimester digestion moving smoothly.'
      },
      {
        id: 's5_spinach',
        type: 'spinach',
        name: 'Fresh Garden Salad',
        x: 1600,
        y: 280,
        width: 36,
        height: 36,
        effectDescription: 'Antioxidants & Folate',
        nutritionFact: 'A diverse, colorful plate exposes baby to subtle flavor compounds via the amniotic fluid.'
      }
    ],
    obstacles: [
      {
        id: 's5_stairs',
        name: 'Steep Garden Stairway',
        x: 820,
        y: 310,
        width: 80,
        height: 40,
        type: 'stairs',
        description: 'Gentle stairs. Leo offers an arm so Maya can maintain her new center of gravity safely.'
      },
      {
        id: 's5_puddle',
        name: 'Uneven Cobblestone Path',
        x: 1380,
        y: 330,
        width: 70,
        height: 25,
        type: 'fatigue_puddle',
        description: 'Watch your footing as the hormone relaxin begins loosening ligaments.'
      }
    ],
    partnerDialogue: {
      id: 's5_dialogue',
      triggerX: 1150,
      situation: 'Maya trying on clothes and noticing nothing fits like before',
      partnerQuestion: 'Leo: "Maya, look at that sweet little bump! You look radiant and strong."',
      choices: [
        {
          label: '"I\'m getting used to my body changing. Let\'s go shopping for comfy maternity wear together."',
          supportDelta: 30,
          partnerResponse: 'Leo: "I would love to! Soft leggings and cozy dresses all the way. You deserve absolute comfort."',
          mayaResponse: 'Maya: "It feels wonderful to celebrate my changing silhouette."'
        },
        {
          label: '"I have so much more energy today! Let\'s plan some fun dates this trimester."',
          supportDelta: 25,
          partnerResponse: 'Leo: "Let\'s take full advantage of this second trimester boost. Weekend picnic is planned!"',
          mayaResponse: 'Maya: "I\'m feeling so much more like myself again."'
        }
      ]
    },
    medicalDilemma: {
      id: 's5_med',
      triggerX: 2150,
      prompt: 'Understanding Pregnancy Physical Activity',
      context: 'Maya wonders: "Now that I have my energy back, can I do any workout I want, or are there guidelines?"',
      options: [
        {
          text: 'Moderate, low-impact exercise (walking, swimming, prenatal yoga) is beneficial, but avoid contact sports, hot yoga, and scuba diving, and consult your provider if you have medical contraindications.',
          isCorrect: true,
          feedback: 'Precisely! Gentle movement boosts mood and stamina, but safe guidelines protect joint laxity and placental perfusion.'
        },
        {
          text: 'Never move your body at all until delivery, because even walking is dangerous.',
          isCorrect: false,
          feedback: 'Incorrect. Unless medically instructed on pelvic rest, moderate activity has clear cardiovascular and psychological benefits.'
        }
      ],
      educationalTakeaway: 'Gentle movement supports circulation and joint mobility, guided by comfort and obstetrical clearance.'
    },
    memoryReward: {
      id: 'mem_s5',
      title: 'The Botanical Garden Stroll',
      dateLabel: 'Month 4 Milestone',
      description: 'Sunlight filtering through the trees, feeling the first gentle flutters of energy return, and shopping for comfy clothes.',
      icon: 'sun',
      badgeText: 'Second Trimester Blossoms'
    },
    themeColor: {
      primary: '#06b6d4',
      skyTop: '#ecfeff',
      skyBottom: '#cffafe',
      groundColor: '#22d3ee',
      accentColor: '#0891b2'
    }
  },

  // Stage 6: Month 5
  {
    id: 6,
    monthNumber: 5,
    title: 'Stage 6 — Month 5: The Growing Baby',
    subtitle: 'Anatomy Scan & The First Magical Kick',
    trimester: 'second',
    levelLength: 2900,
    challengesSummary: 'Backaches, changing appetite, postural adjustments, and the emotional thrill of feeling fetal movement ("quickening").',
    motherStateDesc: 'Feeling little butterfly flutters that turn into unmistakable baby kicks! Center of gravity shifts.',
    bellyScale: 0.62,
    babySizeComparison: 'A sweet banana / mango (approx 25 cm)',
    objectives: [
      { id: 'calcium_spinach', text: 'Collect calcium-rich foods for bone ossification', completed: false },
      { id: 'water_replenish', text: 'Maintain strong hydration', completed: false },
      { id: 'feel_kick', text: 'Share the magical kick moment with Leo', completed: false },
      { id: 'anatomy_scan', text: 'Reach the Mid-Pregnancy Anatomy Ultrasound', completed: false }
    ],
    foods: [
      {
        id: 's6_banana',
        type: 'banana',
        name: 'Potassium Banana',
        x: 500,
        y: 280,
        width: 34,
        height: 34,
        effectDescription: 'Potassium power: Helps ward off nighttime calf cramps',
        nutritionFact: 'Electrolytes like potassium and magnesium help soothe pregnancy leg cramps that often emerge in the 5th month.'
      },
      {
        id: 's6_milk',
        type: 'milk',
        name: 'Calcium Rich Yogurt / Milk',
        x: 1020,
        y: 280,
        width: 32,
        height: 36,
        effectDescription: 'Bone & Tooth Mineralization',
        nutritionFact: 'In the 5th month, baby\'s bones are rapidly hardening (ossification), requiring around 1,000 mg of calcium daily.'
      },
      {
        id: 's6_water',
        type: 'water',
        name: 'Pure Spring Water',
        x: 1550,
        y: 300,
        width: 32,
        height: 36,
        effectDescription: 'Hydration Boost: +35 Hydration',
        nutritionFact: 'Adequate hydration helps keep Braxton Hicks practice tightenings calm and infrequent.'
      }
    ],
    obstacles: [
      {
        id: 's6_leg_cramp',
        name: 'Sudden Calf Leg Cramp',
        x: 760,
        y: 330,
        width: 75,
        height: 45,
        type: 'leg_cramp',
        requiresJump: true,
        jumpPrompt: 'Jump over leg cramp spasm! ⬆️',
        description: 'A sudden calf muscle spasm. Jump over to maintain your stride!'
      },
      {
        id: 's6_groceries',
        name: 'Heavy Grocery Bags',
        x: 1320,
        y: 320,
        width: 60,
        height: 50,
        type: 'heavy_grocery',
        description: 'Heavy groceries. Leo steps up to carry them with ease!',
        partnerAssistRequired: true,
        partnerAssistHint: 'Press Q or tap Assist so Leo carries the heavy load!'
      }
    ],
    partnerDialogue: {
      id: 's6_dialogue',
      triggerX: 1100,
      situation: 'Sitting on the sofa when Maya suddenly gasps with wide eyes',
      partnerQuestion: 'Leo: "Maya, are you okay? What was that look?"',
      choices: [
        {
          label: '"Put your hand right here, quickly! Feel that gentle tap?"',
          supportDelta: 35,
          partnerResponse: 'Leo: "Oh wow... WOW! I felt that! Hello little one! My eyes are completely watering."',
          mayaResponse: 'Maya: "It feels so real now that you can feel it from the outside too."'
        },
        {
          label: '"Baby is doing gymnastics! Can you give my lower back a gentle rub?"',
          supportDelta: 25,
          partnerResponse: 'Leo: "Right away. Lean into me, I\'ll massage out that lumbar tension."',
          mayaResponse: 'Maya: "That relieves so much pressure."'
        }
      ]
    },
    medicalDilemma: {
      id: 's6_med',
      triggerX: 2200,
      prompt: 'Anatomy Scan & Medical Observation',
      context: 'The anatomy scan evaluates 35+ fetal structures, the placenta location, and amniotic fluid volume. Why is this comprehensive exam essential?',
      options: [
        {
          text: 'It provides a thorough medical assessment of fetal heart chambers, brain, spine, and kidney development, ensuring optimal delivery planning.',
          isCorrect: true,
          feedback: 'Correct! The 20-week anatomy scan is one of the most critical clinical milestones in pregnancy.'
        },
        {
          text: 'It\'s just to find out the gender, and has no clinical or medical significance whatsoever.',
          isCorrect: false,
          feedback: 'False! While finding out biological sex is fun for some, the scan\'s primary purpose is medical evaluation of organ structures.'
        }
      ],
      educationalTakeaway: 'The mid-pregnancy ultrasound is a medical examination verifying organ development, growth velocity, and placental health.'
    },
    memoryReward: {
      id: 'mem_s6',
      title: 'The First Kick We Shared',
      dateLabel: 'Month 5 Milestone',
      description: 'Leo\'s hand on Maya\'s belly, feeling a tiny distinct thump right against his palm. An unforgettable connection.',
      icon: 'heart',
      badgeText: 'Life in Motion'
    },
    themeColor: {
      primary: '#ec4899',
      skyTop: '#fdf2f8',
      skyBottom: '#fce7f3',
      groundColor: '#f472b6',
      accentColor: '#db2777'
    }
  },

  // Stage 7: Month 6
  {
    id: 7,
    monthNumber: 6,
    title: 'Stage 7 — Month 6: The Growing Bump',
    subtitle: 'Heartburn, Posture & Clinical Vigilance',
    trimester: 'second',
    levelLength: 3000,
    challengesSummary: 'Heartburn, back discomfort, leg cramps, mild dependent swelling, and knowing which symptoms require immediate assessment.',
    motherStateDesc: 'The uterus presses upward on the stomach. Smaller, frequent, upright meals make all the difference.',
    bellyScale: 0.78,
    babySizeComparison: 'An ear of sweet corn (approx 30 cm)',
    objectives: [
      { id: 'small_meal', text: 'Eat smaller frequent snacks to avoid heartburn', completed: false },
      { id: 'hydration_flow', text: 'Stay hydrated to assist fluid balance', completed: false },
      { id: 'partner_assist', text: 'Have Leo support posture and comfort', completed: false },
      { id: 'redflag_check', text: 'Learn to distinguish normal swelling from preeclampsia signs', completed: false }
    ],
    foods: [
      {
        id: 's7_apple',
        type: 'apple',
        name: 'Cool Crisp Apple Slices',
        x: 520,
        y: 280,
        width: 34,
        height: 34,
        effectDescription: 'Light Snack: Easy digestion without triggering acid reflux',
        nutritionFact: 'Progesterone relaxes the esophageal sphincter. Eating smaller, non-greasy portions helps keep heartburn at bay.'
      },
      {
        id: 's7_milk',
        type: 'milk',
        name: 'Soothing Almond / Oat Milk',
        x: 1080,
        y: 280,
        width: 32,
        height: 36,
        effectDescription: 'Reflux Soother & Calcium',
        nutritionFact: 'A small cup of cool milk or yogurt can temporarily coat and neutralize stomach acidity after meals.'
      },
      {
        id: 's7_banana',
        type: 'banana',
        name: 'Gentle Banana',
        x: 1650,
        y: 280,
        width: 34,
        height: 34,
        effectDescription: 'Digestive Comfort & Minerals',
        nutritionFact: 'Bananas act as a natural antacid buffer in the stomach and supply restorative minerals.'
      }
    ],
    obstacles: [
      {
        id: 's7_heartburn',
        name: 'Acid Reflux Heartburn Flare',
        x: 780,
        y: 330,
        width: 80,
        height: 48,
        type: 'heartburn_flare',
        requiresJump: true,
        jumpPrompt: 'Leap over heartburn flare! ⬆️',
        description: 'A fiery acid reflux flare-up. Leap over it to stay comfortable!'
      },
      {
        id: 's7_stairs',
        name: 'Long Flight of Steps',
        x: 1400,
        y: 310,
        width: 80,
        height: 40,
        type: 'stairs',
        description: 'Leo offers steady support so Maya takes steps at an easy, measured pace.'
      }
    ],
    partnerDialogue: {
      id: 's7_dialogue',
      triggerX: 1200,
      situation: 'Evening heartburn flare-up and tired feet after work',
      partnerQuestion: 'Leo: "Maya, let me take your shoes off and elevate your feet. How is your chest feeling?"',
      choices: [
        {
          label: '"Elevating my feet sounds heavenly, and could you prop up my upper body with pillows so acid doesn\'t rise?"',
          supportDelta: 30,
          partnerResponse: 'Leo: "Done! 45-degree angle with the memory foam pillow, plus a cool glass of water."',
          mayaResponse: 'Maya: "That immediately takes the burn away."'
        },
        {
          label: '"I\'m going to walk around gently for 10 minutes rather than lying flat right after dinner."',
          supportDelta: 25,
          partnerResponse: 'Leo: "I\'ll walk with you. Gravity is our friend tonight."',
          mayaResponse: 'Maya: "Good teamwork as always."'
        }
      ]
    },
    medicalDilemma: {
      id: 's7_med',
      triggerX: 2350,
      prompt: 'Crucial Clinical Warning: Distinguishing Normal Swelling from Preeclampsia',
      context: 'Mild ankle puffiness at the end of the day is common. But what if a pregnant woman experiences SUDDEN severe facial swelling, an unrelenting severe headache, and visual sparkles/blurriness?',
      options: [
        {
          text: 'These are classic red-flag signs of Preeclampsia—an urgent medical emergency requiring immediate clinical evaluation and blood pressure check. Food cannot treat preeclampsia!',
          isCorrect: true,
          feedback: 'CRITICAL & CORRECT! Preeclampsia is a serious clinical condition involving hypertension and organ strain. Never attempt to treat sudden headaches, vision changes, or facial swelling with home food remedies.'
        },
        {
          text: 'Drink a glass of spinach juice and go to sleep; food will make preeclampsia disappear.',
          isCorrect: false,
          feedback: 'DANGEROUS MISTAKE. Food cannot treat preeclampsia. Urgent hospital evaluation is mandatory for severe headaches, visual disturbances, or sudden severe swelling.'
        }
      ],
      educationalTakeaway: 'Nutrition sustains maternal resilience, but acute signs like sudden severe headaches, visual disturbances, or rapid swelling demand emergency obstetrical triage.'
    },
    memoryReward: {
      id: 'mem_s7',
      title: 'Our Nursery Corner & Comfort Routine',
      dateLabel: 'Month 6 Milestone',
      description: 'Painting the nursery wall in calming sage green, sorting tiny onesies, and mastering evening comfort rituals together.',
      icon: 'palette',
      badgeText: 'Second Trimester Closes'
    },
    themeColor: {
      primary: '#6366f1',
      skyTop: '#eef2ff',
      skyBottom: '#e0e7ff',
      groundColor: '#818cf8',
      accentColor: '#4f46e5'
    }
  },

  // Stage 8: Month 7
  {
    id: 8,
    monthNumber: 7,
    title: 'Stage 8 — Month 7: The Comfort Quest',
    subtitle: 'Welcome to the Third Trimester & The Great Pillow Fort',
    trimester: 'third',
    levelLength: 3100,
    challengesSummary: 'Trouble sleeping, shortness of breath on mild exertion, hip aches, tracking fetal movement patterns, and birth preparation.',
    motherStateDesc: 'The bump is prominent! Side-sleeping with pillow support between knees and under belly is a lifesaver.',
    bellyScale: 0.95,
    babySizeComparison: 'A crisp head of cauliflower (approx 37 cm)',
    objectives: [
      { id: 'pillow_collect', text: 'Collect the Ergonomic Pregnancy Pillow', completed: false },
      { id: 'hydrate_steady', text: 'Sip water steadily throughout the day', completed: false },
      { id: 'kick_count', text: 'Sit calmly with Leo and track baby\'s active movement hour', completed: false },
      { id: 'birth_class', text: 'Attend the Prenatal Birth Education Workshop', completed: false }
    ],
    foods: [
      {
        id: 's8_pillow',
        type: 'pillow',
        name: 'Contoured Pregnancy Body Pillow',
        x: 480,
        y: 280,
        width: 38,
        height: 38,
        effectDescription: 'Maximum Comfort Boost: Relieves hips and spine',
        nutritionFact: 'Sleeping on your side (left side is optimal for IVC blood return) with a pillow between knees aligns pelvis and spine.'
      },
      {
        id: 's8_orange',
        type: 'orange',
        name: 'Hydrating Orange',
        x: 1040,
        y: 280,
        width: 34,
        height: 34,
        effectDescription: 'Vitamin C & Natural Hydration',
        nutritionFact: 'Third trimester tissues need steady collagen synthesis for pelvic stretching and skin elasticity.'
      },
      {
        id: 's8_water',
        type: 'water',
        name: 'Cool Hydration Bottle',
        x: 1600,
        y: 300,
        width: 32,
        height: 36,
        effectDescription: 'Fluid Replenishment: +35 Hydration',
        nutritionFact: 'Hydration reduces uterine irritability and helps flush kidneys as cardiac output peaks.'
      }
    ],
    obstacles: [
      {
        id: 's8_breathless',
        name: 'Restless Legs & Breathlessness Surge',
        x: 750,
        y: 330,
        width: 80,
        height: 44,
        type: 'leg_cramp',
        requiresJump: true,
        jumpPrompt: 'Jump over restless leg wave! ⬆️',
        description: 'Restless leg tension. Jump over to keep moving smoothly!'
      },
      {
        id: 's8_heavy_crib',
        name: 'Assembling Nursery Furniture',
        x: 1350,
        y: 310,
        width: 70,
        height: 60,
        type: 'heavy_grocery',
        description: 'Heavy crib package. Leo takes the heavy tools and assembly duty!',
        partnerAssistRequired: true,
        partnerAssistHint: 'Ask Leo (press Q or tap Assist) to assemble and position the crib safely!'
      }
    ],
    partnerDialogue: {
      id: 's8_dialogue',
      triggerX: 1100,
      situation: 'Waking up at 3:00 AM with hip pain and racing thoughts about birth',
      partnerQuestion: 'Leo: "Maya, are you awake? Let me flip the body pillow and get you a warm cup of water."',
      choices: [
        {
          label: '"Thank you. Can we practice the calming breath count from our prenatal class?"',
          supportDelta: 30,
          partnerResponse: 'Leo: "Inhale 1-2-3-4... exhale slowly 1-2-3-4-5-6. You are doing an incredible job."',
          mayaResponse: 'Maya: "My shoulders just dropped two inches. I feel so anchored with you."'
        },
        {
          label: '"I\'m tracking baby\'s movement rhythm—feeling three strong kicks right now!"',
          supportDelta: 25,
          partnerResponse: 'Leo: "Such a vigorous little dancer in there. Good strong kicks."',
          mayaResponse: 'Maya: "It\'s comforting knowing their active rhythm."'
        }
      ]
    },
    medicalDilemma: {
      id: 's8_med',
      triggerX: 2400,
      prompt: 'Fetal Movement Awareness & Safety',
      context: 'It is late in the third trimester. A mother notices her baby, who is usually very active after dinner, has barely moved all day. What should she do?',
      options: [
        {
          text: 'Contact maternity assessment triage / healthcare provider promptly for a non-stress test (CTG) evaluation—never wait until tomorrow or rely on sweet drinks alone.',
          isCorrect: true,
          feedback: 'CORRECT! A significant reduction or change in baby\'s normal movement pattern requires prompt clinical CTG assessment to verify fetal wellbeing.'
        },
        {
          text: 'Eat a chocolate bar and ignore it, because babies always stop moving when they get bigger.',
          isCorrect: false,
          feedback: 'DANGEROUS MYTH. While movement type shifts to rolls and jabs, frequency and strength should NOT decrease. Prompt clinical check is essential.'
        }
      ],
      educationalTakeaway: 'Babies do not run out of room to move. Any significant reduction in normal fetal movements demands prompt clinical evaluation.'
    },
    memoryReward: {
      id: 'mem_s8',
      title: 'The Great Pillow Fort & Birth Class',
      dateLabel: 'Month 7 Milestone',
      description: 'Surrounded by four pillows, laughing in bed, and mastering labor partner massage techniques.',
      icon: 'feather',
      badgeText: 'Third Trimester Comfort'
    },
    themeColor: {
      primary: '#14b8a6',
      skyTop: '#f0fdfa',
      skyBottom: '#ccfbf1',
      groundColor: '#2dd4bf',
      accentColor: '#0f766e'
    }
  },

  // Stage 9: Month 8
  {
    id: 9,
    monthNumber: 8,
    title: 'Stage 9 — Month 8: The Final Stretch',
    subtitle: 'Nesting, Hospital Bag Checklist & Pelvic Relief',
    trimester: 'third',
    levelLength: 3200,
    challengesSummary: 'Pelvic pressure, frequent bathroom trips, nesting urges, difficulty tying shoes, and organizing hospital essentials.',
    motherStateDesc: 'Baby is settling lower into the pelvis. Partner steps in for all heavy lifting and shoe-tying!',
    bellyScale: 1.15,
    babySizeComparison: 'A winter squash / cantaloupe (approx 44 cm)',
    objectives: [
      { id: 'pack_essentials', text: 'Pack maternity clothes & baby onesie into hospital bag', completed: false },
      { id: 'nourish_snack', text: 'Eat small energy snacks (banana & water)', completed: false },
      { id: 'partner_lift', text: 'Let Leo install car seat and carry luggage', completed: false },
      { id: 'birth_plan_review', text: 'Review birth preferences with the Midwife', completed: false }
    ],
    foods: [
      {
        id: 's9_banana',
        type: 'banana',
        name: 'Quick Energy Banana',
        x: 520,
        y: 280,
        width: 34,
        height: 34,
        effectDescription: 'Instant Sustained Energy',
        nutritionFact: 'Dates and bananas provide gentle fructose, potassium, and magnesium to sustain stamina in late pregnancy.'
      },
      {
        id: 's9_water',
        type: 'water',
        name: 'Chilled Electrolyte Water',
        x: 1050,
        y: 300,
        width: 32,
        height: 36,
        effectDescription: 'Hydration Vitality',
        nutritionFact: 'Even with frequent urination, maintaining adequate water intake prevents urinary tract infections and headaches.'
      },
      {
        id: 's9_apple',
        type: 'apple',
        name: 'Crisp Apple & Peanut Butter Dip',
        x: 1680,
        y: 280,
        width: 34,
        height: 34,
        effectDescription: 'Protein & Fiber Balance',
        nutritionFact: 'Combining healthy fats and complex carbs provides steady endurance for the mother\'s hard-working cardiovascular system.'
      }
    ],
    obstacles: [
      {
        id: 's9_pelvic_pressure',
        name: 'Pelvic Heaviness & Ligament Strain',
        x: 740,
        y: 330,
        width: 75,
        height: 45,
        type: 'pelvic_pressure',
        requiresJump: true,
        jumpPrompt: 'Leap over pelvic pressure wave! ⬆️',
        description: 'Heavy pelvic pressure. Jump over with steady momentum!'
      },
      {
        id: 's9_carseat',
        name: 'Heavy Infant Car Seat Base',
        x: 1380,
        y: 310,
        width: 70,
        height: 55,
        type: 'heavy_grocery',
        description: 'Securing the infant safety car seat. Leo takes charge of vehicle safety check!',
        partnerAssistRequired: true,
        partnerAssistHint: 'Press Q or tap Assist so Leo locks the car seat base into the vehicle.'
      }
    ],
    partnerDialogue: {
      id: 's9_dialogue',
      triggerX: 1100,
      situation: 'Packing the hospital bag by the doorway',
      partnerQuestion: 'Leo: "Maya, car seat is inspected, hospital bag is packed, and our gas tank is full. What else can I take off your plate?"',
      choices: [
        {
          label: '"Just remind me when labor starts that our bodies know what to do, and that you\'ll protect our calm space."',
          supportDelta: 30,
          partnerResponse: 'Leo: "I will be your calm shield, your voice, and your advocate every single minute."',
          mayaResponse: 'Maya: "I couldn\'t do this without your steady heart."'
        },
        {
          label: '"Let\'s do a practice drive to the maternity hospital so we know the exact entrance at night."',
          supportDelta: 25,
          partnerResponse: 'Leo: "Great plan. We\'ll map the quickest route and note the 24-hour labor triage entrance."',
          mayaResponse: 'Maya: "Prepared and peaceful."'
        }
      ]
    },
    medicalDilemma: {
      id: 's9_med',
      triggerX: 2500,
      prompt: 'Recognizing Fluid Rupture vs Normal Discharge',
      context: 'Maya feels a sudden trickle of fluid. How can you tell if the amniotic sac has ruptured, and what is the proper action?',
      options: [
        {
          text: 'Note the color, odor, and timing (clear/pinkish is normal, greenish/brownish meconium is urgent), and contact the maternity triage team immediately for clinical assessment.',
          isCorrect: true,
          feedback: 'EXCELLENT! Ruptured membranes create a direct path for infection; clinical teams must assess fetal status, fluid color, and GBS status.'
        },
        {
          text: 'Ignore fluid leakage and eat three apples to make the water bag grow back.',
          isCorrect: false,
          feedback: 'Completely untrue. Once membranes rupture, clinical oversight is necessary to ensure safety against infection.'
        }
      ],
      educationalTakeaway: 'When water breaks or leaks, note the time and fluid color and contact your maternity unit promptly.'
    },
    memoryReward: {
      id: 'mem_s9',
      title: 'The Packed Hospital Bag by the Door',
      dateLabel: 'Month 8 Milestone',
      description: 'Tiny newborn sleepers, comfortable nursing gowns, playlist ready, and the car seat clicked in place.',
      icon: 'briefcase',
      badgeText: 'Ready for Arrival'
    },
    themeColor: {
      primary: '#f97316',
      skyTop: '#fff7ed',
      skyBottom: '#ffedd5',
      groundColor: '#fb923c',
      accentColor: '#ea580c'
    }
  },

  // Stage 10: Month 9
  {
    id: 10,
    monthNumber: 9,
    title: 'Stage 10 — Month 9: The Arrival Quest',
    subtitle: 'Labor Signs, Calm Teamwork & Welcoming New Life',
    trimester: 'third',
    levelLength: 3400,
    challengesSummary: 'Anticipation, timing contractions, physical intensity, emotional fortitude, and reaching the maternity care setting.',
    motherStateDesc: 'Full term! Contractions are becoming rhythmic and strong. Leo provides counter-pressure and loving reassurance.',
    bellyScale: 1.3,
    babySizeComparison: 'A sweet watermelon / newborn baby (approx 50 cm)',
    objectives: [
      { id: 'time_contractions', text: 'Track contraction intervals (5-1-1 rule)', completed: false },
      { id: 'sip_endurance', text: 'Sip water for endurance and calm', completed: false },
      { id: 'partner_counterpressure', text: 'Receive Leo\'s sacral counter-pressure', completed: false },
      { id: 'maternity_arrival', text: 'Reach the Maternity Ward & Welcome Baby!', completed: false }
    ],
    foods: [
      {
        id: 's10_water',
        type: 'water',
        name: 'Electrolyte Hydration Sip',
        x: 520,
        y: 300,
        width: 32,
        height: 36,
        effectDescription: 'Endurance Hydration: Keeps muscles hydrated during labor',
        nutritionFact: 'Labor is an athletic marathon. Hydration supports efficient uterine contractions and prevents maternal exhaustion.'
      },
      {
        id: 's10_banana',
        type: 'banana',
        name: 'Quick Honey / Banana Bite',
        x: 1080,
        y: 280,
        width: 34,
        height: 34,
        effectDescription: 'Quick Glucose Fuel',
        nutritionFact: 'Light, clear carbohydrates supply gentle glucose for laboring uterine muscles without overloading digestion.'
      },
      {
        id: 's10_pillow',
        type: 'pillow',
        name: 'Labor Comfort Pillow',
        x: 1680,
        y: 280,
        width: 38,
        height: 38,
        effectDescription: 'Comfort Positioning',
        nutritionFact: 'Upright, forward, and resting positions with partner support allow gravity to aid baby\'s descent.'
      }
    ],
    obstacles: [
      {
        id: 's10_contraction1',
        name: 'Labor Contraction Surge Wave',
        x: 750,
        y: 330,
        width: 80,
        height: 46,
        type: 'nausea_wave',
        requiresJump: true,
        jumpPrompt: 'Leap over contraction wave! ⬆️',
        description: 'A powerful surge wave. Leap through the wave with partner support!'
      },
      {
        id: 's10_heavy_door',
        name: 'Hospital Entrance Heavy Double Doors',
        x: 1450,
        y: 300,
        width: 60,
        height: 70,
        type: 'heavy_grocery',
        description: 'Maternity entrance doors. Leo opens and guides Maya safely through!',
        partnerAssistRequired: true,
        partnerAssistHint: 'Press Q or tap Assist so Leo opens the hospital doors and guides Maya.'
      }
    ],
    partnerDialogue: {
      id: 's10_dialogue',
      triggerX: 1100,
      situation: 'Timing contractions in the living room as intensity rises',
      partnerQuestion: 'Leo: "Contractions are coming every 4 minutes, lasting 60 seconds for over an hour. Maya, you are doing this. What do you need right now?"',
      choices: [
        {
          label: '"Press firmly on my lower back during each wave and let\'s call the maternity unit!"',
          supportDelta: 40,
          partnerResponse: 'Leo: "Firm sacral counter-pressure applied. Calling the midwife triage right now. You are so powerful."',
          mayaResponse: 'Maya: "With you beside me, I can meet every wave."'
        },
        {
          label: '"Let\'s grab the bags and head to the car calmly."',
          supportDelta: 30,
          partnerResponse: 'Leo: "Everything is loaded. Take your time walking. One step at a time."',
          mayaResponse: 'Maya: "We are about to meet our baby!"'
        }
      ]
    },
    medicalDilemma: {
      id: 's10_med',
      triggerX: 2300,
      prompt: 'True Labor vs False Labor (Braxton Hicks)',
      context: 'How do you distinguish true active labor contractions from practice Braxton Hicks tightenings?',
      options: [
        {
          text: 'True labor contractions get progressively longer, stronger, closer together, and do not stop when resting or walking, signaling cervical dilation.',
          isCorrect: true,
          feedback: 'EXACTLY RIGHT! True labor shows a steady progressive pattern that intensifies and coordinates cervical change.'
        },
        {
          text: 'Eating an orange stops true labor from progressing.',
          isCorrect: false,
          feedback: 'False! Food does not stop physiological labor contractions.'
        }
      ],
      educationalTakeaway: 'Recognizing progressive labor signs helps couples arrive at their maternity care setting calmly and at the right time.'
    },
    npc: {
      id: 's10_midwife',
      name: 'Midwife Sarah & Dr. Chen',
      role: 'midwife',
      x: 3000,
      y: 310,
      dialogue: [
        'Welcome, Maya and Leo! You have arrived in active labor with wonderful teamwork.',
        'Your room is warm and ready. Take a deep breath: today you welcome your baby!'
      ],
      advice: 'Trust your body, lean on each other, and welcome this precious new chapter.'
    },
    memoryReward: {
      id: 'mem_s10',
      title: 'Welcome to the World, Little One',
      dateLabel: 'Month 9 Milestone & Beyond',
      description: 'The first cry, baby placed on Maya\'s chest, and Leo\'s tears falling on both of them. Ten months of love, health, and equal partnership.',
      icon: 'award',
      badgeText: 'Journey Complete: A Family Born'
    },
    themeColor: {
      primary: '#ec4899',
      skyTop: '#fff1f2',
      skyBottom: '#ffe4e6',
      groundColor: '#fb7185',
      accentColor: '#e11d48'
    }
  }
];
