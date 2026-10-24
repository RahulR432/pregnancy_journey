import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StageData, FoodItemData, ObstacleData } from '../types/game';
import { sound } from '../audio/soundEngine';

interface GameCanvasProps {
  stage: StageData;
  stageSessionKey: number;
  isPaused: boolean;
  onFoodCollected: (food: FoodItemData) => void;
  onObstacleCleared: (obstacle: ObstacleData) => void;
  onPartnerDialogueTrigger: () => void;
  onMedicalDilemmaTrigger: () => void;
  onNpcInteract: () => void;
  onStageComplete: () => void;
  onStatsUpdate: (energyDelta: number, hydrationDelta: number, supportDelta: number) => void;
  onAssistActiveState: (active: boolean) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: 'heart' | 'sparkle' | 'bubble';
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  stage,
  stageSessionKey,
  isPaused,
  onFoodCollected,
  onObstacleCleared,
  onPartnerDialogueTrigger,
  onMedicalDilemmaTrigger,
  onNpcInteract,
  onStageComplete,
  onStatsUpdate,
  onAssistActiveState
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [nearNpcState, setNearNpcState] = useState<boolean>(false);

  // Keep latest stage and callback references so loop and events never cause component resets
  const stageRef = useRef(stage);
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  const callbacksRef = useRef({
    onFoodCollected,
    onObstacleCleared,
    onPartnerDialogueTrigger,
    onMedicalDilemmaTrigger,
    onNpcInteract,
    onStageComplete,
    onStatsUpdate,
    onAssistActiveState,
  });
  useEffect(() => {
    callbacksRef.current = {
      onFoodCollected,
      onObstacleCleared,
      onPartnerDialogueTrigger,
      onMedicalDilemmaTrigger,
      onNpcInteract,
      onStageComplete,
      onStatsUpdate,
      onAssistActiveState,
    };
  });

  // Core gameplay mutable state stored in refs to avoid re-triggering React renders in 60fps loop
  const gameStateRef = useRef({
    // Player (Maya) state
    player: {
      x: 100,
      y: 320,
      vx: 0,
      vy: 0,
      width: 44,
      height: 72,
      isGrounded: true,
      facing: 1 as 1 | -1, // 1 for right, -1 for left
      walkFrame: 0,
      isWalking: false,
      handOnBelly: true,
      isStumbled: false,
      stumbleTimer: 0,
    },
    // Partner (Leo) state
    partner: {
      x: 50,
      y: 320,
      vx: 0,
      vy: 0,
      width: 44,
      height: 76,
      facing: 1 as 1 | -1,
      walkFrame: 0,
      isWalking: false,
      isAssisting: false,
      assistTimer: 0,
    },
    cameraX: 0,
    keys: {
      left: false,
      right: false,
      jump: false,
      interact: false,
      assist: false,
    },
    touchControls: {
      left: false,
      right: false,
      jump: false,
      assist: false,
    },
    jumpBuffer: 0,
    coyoteTime: 0,
    foods: [] as (FoodItemData & { collected?: boolean })[],
    obstacles: [] as (ObstacleData & { resolved?: boolean })[],
    dialogueTriggered: false,
    medicalTriggered: false,
    npcInteracted: false,
    isNearNpc: false,
    stageFinished: false,
    particles: [] as Particle[],
    floatingTexts: [] as FloatingText[],
    lastTime: performance.now(),
    ambientFloatingAngle: 0,
  });

  // Re-initialize level objects ONLY when stageSessionKey changes (new month or explicit restart)
  useEffect(() => {
    const s = gameStateRef.current;
    s.player.x = 100;
    s.player.y = 320;
    s.player.vx = 0;
    s.player.vy = 0;
    s.player.isStumbled = false;
    s.player.stumbleTimer = 0;
    s.partner.x = 40;
    s.partner.y = 320;
    s.cameraX = 0;
    s.foods = stage.foods.map((f) => ({ ...f, collected: false }));
    s.obstacles = stage.obstacles.map((o) => ({ ...o, resolved: false }));
    s.dialogueTriggered = false;
    s.medicalTriggered = false;
    s.npcInteracted = false;
    s.isNearNpc = false;
    s.stageFinished = false;
    s.particles = [];
    s.floatingTexts = [];
    s.lastTime = performance.now();
    setNearNpcState(false);
  }, [stageSessionKey]);

  // Spawn visual particles
  const spawnParticles = useCallback((x: number, y: number, color: string, type: 'heart' | 'sparkle' | 'bubble', count = 12) => {
    const state = gameStateRef.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 80 + 30;
      state.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 40,
        life: 0,
        maxLife: Math.random() * 0.6 + 0.4,
        color,
        size: Math.random() * 6 + 4,
        type,
      });
    }
  }, []);

  // Keyboard input listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = gameStateRef.current.keys;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') k.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') k.right = true;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        k.jump = true;
        gameStateRef.current.jumpBuffer = 0.15; // 150ms buffer
      }
      if (e.code === 'KeyQ') {
        k.assist = true;
        triggerPartnerAssist();
      }
      if (e.code === 'KeyE') {
        k.interact = true;
        checkProximityInteraction();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = gameStateRef.current.keys;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') k.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') k.right = false;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') k.jump = false;
      if (e.code === 'KeyQ') k.assist = false;
      if (e.code === 'KeyE') k.interact = false;
    };

    const handleBlur = () => {
      const k = gameStateRef.current.keys;
      k.left = false;
      k.right = false;
      k.jump = false;
      k.assist = false;
      k.interact = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Trigger partner assist (Leo steps forward, gives supportive comfort / clears heavy obstacle)
  const triggerPartnerAssist = () => {
    const s = gameStateRef.current;
    if (s.partner.isAssisting) return;

    s.partner.isAssisting = true;
    s.partner.assistTimer = 1.2;
    callbacksRef.current.onAssistActiveState(true);
    sound.playPartnerSupport();

    // Check if near any heavy obstacle
    let clearedAny = false;
    s.obstacles.forEach((obs) => {
      if (!obs.resolved && obs.partnerAssistRequired) {
        const dist = Math.abs(s.player.x - obs.x);
        if (dist < 130) {
          obs.resolved = true;
          clearedAny = true;
          callbacksRef.current.onObstacleCleared(obs);
          spawnParticles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#ec4899', 'heart', 16);
          callbacksRef.current.onStatsUpdate(5, 0, 20); // Energy & Partner Support boost!
        }
      }
    });

    if (!clearedAny) {
      // General support hug/cheer
      spawnParticles(s.player.x + 20, s.player.y - 20, '#f43f5e', 'heart', 10);
      callbacksRef.current.onStatsUpdate(5, 0, 10);
    }
  };

  // Consult Doctor / Midwife NPC
  const triggerNpcConsult = useCallback((force = false) => {
    const s = gameStateRef.current;
    const currentStageObj = stageRef.current;
    if (currentStageObj.npc && !s.npcInteracted) {
      const dist = Math.abs(s.player.x - currentStageObj.npc.x);
      if (force || dist < 170) {
        s.npcInteracted = true;
        sound.playInteract();
        callbacksRef.current.onNpcInteract();
      }
    }
  }, []);

  // Check proximity interaction (NPC or Bench)
  const checkProximityInteraction = useCallback(() => {
    triggerNpcConsult(false);
  }, [triggerNpcConsult]);

  // Handle direct tap/click on canvas (vital for mobile users tapping Doctor or world)
  const handleCanvasInteraction = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const screenX = (clientX - rect.left) * scaleX;
    const worldX = screenX + gameStateRef.current.cameraX;

    const s = gameStateRef.current;
    const currentStageObj = stageRef.current;
    if (currentStageObj.npc && !s.npcInteracted) {
      const distWorld = Math.abs(worldX - currentStageObj.npc.x);
      const distMaya = Math.abs(s.player.x - currentStageObj.npc.x);
      // If tap was on/near doctor OR if Maya is already near doctor and user taps the screen
      if (distWorld < 140 || distMaya < 170) {
        triggerNpcConsult(true);
      }
    }
  }, [triggerNpcConsult]);

  // Main 60fps Animation Loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const groundY = 380;
    const gravity = 1100;
    const baseMoveSpeed = 190;
    const jumpVelocity = -480;

    const loop = (currentTime: number) => {
      const s = gameStateRef.current;
      const rawDt = (currentTime - s.lastTime) / 1000;
      s.lastTime = currentTime;
      const dt = Math.min(rawDt, 0.05); // clamp delta time for stability

      if (!isPaused) {
        s.ambientFloatingAngle += dt * 3;

        // Assist timer update
        if (s.partner.isAssisting) {
          s.partner.assistTimer -= dt;
          if (s.partner.assistTimer <= 0) {
            s.partner.isAssisting = false;
            callbacksRef.current.onAssistActiveState(false);
          }
        }

        // Stumble recovery timer (when encountering a symptom without jumping)
        if (s.player.isStumbled) {
          s.player.stumbleTimer -= dt;
          if (s.player.stumbleTimer <= 0) {
            s.player.isStumbled = false;
          }
        }

        const moveSpeed = s.player.isStumbled ? baseMoveSpeed * 0.45 : baseMoveSpeed;

        // Combine keyboard and touch controls
        const goLeft = s.keys.left || s.touchControls.left;
        const goRight = s.keys.right || s.touchControls.right;

        // Player horizontal movement
        if (goLeft && !goRight) {
          s.player.vx = -moveSpeed;
          s.player.facing = -1;
          s.player.isWalking = true;
          s.player.walkFrame += dt * 8;
        } else if (goRight && !goLeft) {
          s.player.vx = moveSpeed;
          s.player.facing = 1;
          s.player.isWalking = true;
          s.player.walkFrame += dt * 8;
        } else {
          s.player.vx = 0;
          s.player.isWalking = false;
        }

        // Apply jump buffer & coyote time
        if (s.player.isGrounded) {
          s.coyoteTime = 0.12; // 120ms coyote time
        } else {
          s.coyoteTime = Math.max(0, s.coyoteTime - dt);
        }

        if (s.jumpBuffer > 0) {
          s.jumpBuffer -= dt;
        }

        if (s.jumpBuffer > 0 && s.coyoteTime > 0) {
          s.player.vy = jumpVelocity;
          s.player.isGrounded = false;
          s.jumpBuffer = 0;
          s.coyoteTime = 0;
          sound.playJump();
          spawnParticles(s.player.x + 20, groundY, '#cbd5e1', 'bubble', 5);
        }

        // Apply gravity
        s.player.vy += gravity * dt;
        s.player.y += s.player.vy * dt;
        s.player.x += s.player.vx * dt;

        // Ground collision for player
        if (s.player.y + s.player.height >= groundY) {
          s.player.y = groundY - s.player.height;
          s.player.vy = 0;
          s.player.isGrounded = true;
        }

        const currentStageData = stageRef.current;

        // Clamp player within level boundaries
        s.player.x = Math.max(40, Math.min(s.player.x, currentStageData.levelLength - 100));

        // Partner (Leo) AI movement - follows Maya supportively
        const targetPartnerX = s.partner.isAssisting
          ? s.player.x + (s.player.facing === 1 ? 50 : -50)
          : s.player.x - 55 * s.player.facing;

        const pDiff = targetPartnerX - s.partner.x;
        if (Math.abs(pDiff) > 8) {
          const partnerSpeed = Math.abs(pDiff) > 100 ? baseMoveSpeed * 1.3 : baseMoveSpeed;
          s.partner.vx = Math.sign(pDiff) * partnerSpeed;
          s.partner.facing = pDiff > 0 ? 1 : -1;
          s.partner.isWalking = true;
          s.partner.walkFrame += dt * 8;
        } else {
          s.partner.vx = 0;
          s.partner.isWalking = false;
        }

        s.partner.x += s.partner.vx * dt;
        s.partner.y = groundY - s.partner.height;

        // Camera follow (smooth lerp toward player with offset)
        const targetCamX = s.player.x - 280;
        s.cameraX += (targetCamX - s.cameraX) * Math.min(1, dt * 6);
        s.cameraX = Math.max(0, Math.min(s.cameraX, currentStageData.levelLength - 800));

        // Check Food Collection
        s.foods.forEach((food) => {
          if (!food.collected) {
            const overlapX = Math.abs(s.player.x + s.player.width / 2 - (food.x + food.width / 2));
            const overlapY = Math.abs(s.player.y + s.player.height / 2 - (food.y + food.height / 2));
            if (overlapX < 36 && overlapY < 45) {
              food.collected = true;
              sound.playCollect(food.type);
              spawnParticles(food.x + food.width / 2, food.y + food.height / 2, '#fbbf24', 'sparkle', 14);
              callbacksRef.current.onFoodCollected(food);
            }
          }
        });

        // Check Obstacle Interactions & Jump Clears
        s.obstacles.forEach((obs) => {
          if (obs.resolved) return;

          const playerLeft = s.player.x + 8;
          const playerRight = s.player.x + s.player.width - 8;
          const playerBottom = s.player.y + s.player.height;
          const obsLeft = obs.x;
          const obsRight = obs.x + obs.width;
          const obsTop = groundY - obs.height;

          const isHorizontalOverlap = playerRight > obsLeft && playerLeft < obsRight;

          if (obs.requiresJump) {
            if (isHorizontalOverlap) {
              // If Maya is mid-air and her feet are above or clearing the obstacle top
              if (!s.player.isGrounded && playerBottom <= obsTop + 26) {
                obs.resolved = true;
                obs.jumpedOver = true;
                sound.playJump();
                spawnParticles(obs.x + obs.width / 2, obsTop, '#10b981', 'sparkle', 16);
                s.floatingTexts.push({
                  id: Math.random(),
                  x: obs.x + obs.width / 2,
                  y: obsTop - 18,
                  text: `Leaped over ${obs.name}! 🌟`,
                  color: '#34d399',
                  life: 0,
                  maxLife: 1.5,
                });
                callbacksRef.current.onObstacleCleared(obs);
                callbacksRef.current.onStatsUpdate(4, 0, 5); // Energy & Resilience boost
              } else if (playerBottom > obsTop + 26) {
                // Involuntary pregnancy symptom encounter:
                // Anti-blame rule: NEVER deduct points or penalize the mother.
                // Maya pauses to catch her breath, Leo provides comfort, and they continue.
                s.player.isStumbled = true;
                s.player.stumbleTimer = 0.8;
                obs.resolved = true;
                sound.playInteract();
                spawnParticles(obs.x + obs.width / 2, groundY - 20, '#f59e0b', 'bubble', 10);
                s.floatingTexts.push({
                  id: Math.random(),
                  x: s.player.x + 20,
                  y: s.player.y - 18,
                  text: 'Breathed through it 🌿',
                  color: '#fef08a',
                  life: 0,
                  maxLife: 1.5,
                });
                callbacksRef.current.onObstacleCleared(obs);
                callbacksRef.current.onStatsUpdate(0, 0, 8); // Partner support reassurance boost
              }
            }
          } else if (!obs.partnerAssistRequired) {
            // Standard ground interaction (puddle or odor)
            if (isHorizontalOverlap && s.player.isGrounded) {
              obs.resolved = true;
              callbacksRef.current.onObstacleCleared(obs);
              spawnParticles(obs.x + obs.width / 2, groundY - 20, '#60a5fa', 'bubble', 8);
            }
          }
        });

        // Check Doctor / Midwife NPC Proximity for Mobile Consult Badge
        if (currentStageData.npc && !s.npcInteracted) {
          const dist = Math.abs(s.player.x - currentStageData.npc.x);
          const isNear = dist < 140;
          if (isNear !== s.isNearNpc) {
            s.isNearNpc = isNear;
            setNearNpcState(isNear);
          }
        } else if (s.isNearNpc) {
          s.isNearNpc = false;
          setNearNpcState(false);
        }

        // Check Story Dialogue Trigger
        if (currentStageData.partnerDialogue && !s.dialogueTriggered) {
          if (s.player.x >= currentStageData.partnerDialogue.triggerX) {
            s.dialogueTriggered = true;
            sound.playInteract();
            callbacksRef.current.onPartnerDialogueTrigger();
          }
        }

        // Check Medical Dilemma Trigger
        if (currentStageData.medicalDilemma && !s.medicalTriggered) {
          if (s.player.x >= currentStageData.medicalDilemma.triggerX) {
            s.medicalTriggered = true;
            sound.playMedicalAlert();
            callbacksRef.current.onMedicalDilemmaTrigger();
          }
        }

        // Check Finish Point
        if (!s.stageFinished && s.player.x >= currentStageData.levelLength - 160) {
          s.stageFinished = true;
          sound.playStageComplete();
          spawnParticles(s.player.x, groundY - 60, '#ec4899', 'heart', 25);
          callbacksRef.current.onStageComplete();
        }

        // Update Floating Text Feedback
        for (let i = s.floatingTexts.length - 1; i >= 0; i--) {
          const ft = s.floatingTexts[i];
          ft.life += dt;
          ft.y -= dt * 26; // gentle upward float
          if (ft.life >= ft.maxLife) {
            s.floatingTexts.splice(i, 1);
          }
        }

        // Update Particles
        for (let i = s.particles.length - 1; i >= 0; i--) {
          const p = s.particles[i];
          p.life += dt;
          if (p.life >= p.maxLife) {
            s.particles.splice(i, 1);
          } else {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += 80 * dt; // slight downward drift
          }
        }
      }

      // --- RENDERING PIPELINE ---
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const renderStage = stageRef.current;

      // 1. Sky Gradient Background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
      skyGrad.addColorStop(0, renderStage.themeColor.skyTop);
      skyGrad.addColorStop(1, renderStage.themeColor.skyBottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(-s.cameraX, 0);

      // 2. Parallax Distant Layer (Clouds & Distant Hills)
      drawDistantScenery(ctx, renderStage, s.cameraX, groundY);

      // 3. Ground & Environment Scenery
      drawGroundAndEnvironment(ctx, renderStage, groundY);

      // 4. Obstacles (Nausea, Heartburn, Cramps, Fatigue, etc.)
      drawObstacles(ctx, s.obstacles, groundY);

      // 5. Food Power-Ups
      drawFoodItems(ctx, s.foods, s.ambientFloatingAngle);

      // 6. Interactive NPC (Midwife / Doctor)
      if (renderStage.npc) {
        drawNpc(ctx, renderStage.npc, groundY, s.player.x);
      }

      // 7. Finish Milestone Arch / Destination
      drawMilestoneFinish(ctx, renderStage.levelLength - 140, groundY, renderStage.title);

      // 8. Leo (Partner) Sprite
      drawPartnerSprite(ctx, s.partner.x, s.partner.y, s.partner.facing, s.partner.isWalking, s.partner.walkFrame, s.partner.isAssisting);

      // 9. Maya (Expecting Mother) Sprite with Dynamic Bump Growth
      drawMayaSprite(
        ctx,
        s.player.x,
        s.player.y,
        s.player.facing,
        s.player.isWalking,
        s.player.walkFrame,
        s.player.isGrounded,
        renderStage.bellyScale,
        s.player.isStumbled
      );

      // 10. Render Particles
      drawParticles(ctx, s.particles);

      // 11. Render Floating Texts
      drawFloatingTexts(ctx, s.floatingTexts);

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    if (!isPaused) {
      gameStateRef.current.lastTime = performance.now();
    }
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPaused, stageSessionKey, spawnParticles]);

  // Touch button handlers
  const handleTouchStart = (action: 'left' | 'right' | 'jump' | 'assist') => {
    const t = gameStateRef.current.touchControls;
    t[action] = true;
    if (action === 'jump') {
      gameStateRef.current.jumpBuffer = 0.15;
    }
    if (action === 'assist') {
      triggerPartnerAssist();
    }
  };

  const handleTouchEnd = (action: 'left' | 'right' | 'jump' | 'assist') => {
    gameStateRef.current.touchControls[action] = false;
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden bg-slate-900">
      {/* 2D Viewport Canvas with direct touch & click detection */}
      <canvas
        ref={canvasRef}
        width={960}
        height={480}
        onClick={(e) => handleCanvasInteraction(e.clientX, e.clientY)}
        onTouchEnd={(e) => {
          if (e.changedTouches.length > 0) {
            handleCanvasInteraction(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
          }
        }}
        className="w-full h-full max-h-[85vh] object-contain rounded-2xl shadow-2xl bg-white border border-rose-100 cursor-pointer"
      />

      {/* On-Screen Mobile Virtual Controls (Sleek, transparent, low-occlusion) */}
      <div className="md:hidden absolute bottom-4 left-0 right-0 px-4 sm:px-6 flex justify-between items-center pointer-events-none z-20">
        {/* Left / Right D-Pad */}
        <div className="flex gap-2.5 pointer-events-auto">
          <button
            onTouchStart={() => handleTouchStart('left')}
            onTouchEnd={() => handleTouchEnd('left')}
            onMouseDown={() => handleTouchStart('left')}
            onMouseUp={() => handleTouchEnd('left')}
            className="w-13 h-13 rounded-full bg-slate-800/85 active:bg-rose-500 text-white font-bold text-2xl shadow-lg border border-white/20 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Move Left"
          >
            ←
          </button>
          <button
            onTouchStart={() => handleTouchStart('right')}
            onTouchEnd={() => handleTouchEnd('right')}
            onMouseDown={() => handleTouchStart('right')}
            onMouseUp={() => handleTouchEnd('right')}
            className="w-13 h-13 rounded-full bg-slate-800/85 active:bg-rose-500 text-white font-bold text-2xl shadow-lg border border-white/20 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Move Right"
          >
            →
          </button>
        </div>

        {/* Center / Doctor Consult Button (Prominent when near Doctor or Midwife) */}
        {nearNpcState && (
          <div className="pointer-events-auto animate-bounce">
            <button
              onClick={() => triggerNpcConsult(true)}
              onTouchEnd={(e) => {
                e.preventDefault();
                triggerNpcConsult(true);
              }}
              className="px-4 h-13 rounded-full bg-cyan-600 active:bg-cyan-700 text-white font-bold text-xs shadow-xl border-2 border-cyan-300 flex items-center gap-1.5 backdrop-blur-md active:scale-95 transition-transform cursor-pointer"
            >
              <span className="text-base">🩺</span>
              <span>Talk to Dr.</span>
            </button>
          </div>
        )}

        {/* Action Buttons: Partner Assist & Jump */}
        <div className="flex gap-2.5 pointer-events-auto">
          <button
            onTouchStart={() => handleTouchStart('assist')}
            onTouchEnd={() => handleTouchEnd('assist')}
            onClick={triggerPartnerAssist}
            className="px-3.5 h-13 rounded-full bg-pink-600/90 active:bg-pink-700 text-white font-semibold text-xs shadow-lg border border-pink-300/40 backdrop-blur-sm flex flex-col items-center justify-center active:scale-95 transition-transform"
          >
            <span className="text-sm">🤝</span>
            <span>Leo</span>
          </button>
          <button
            onTouchStart={() => handleTouchStart('jump')}
            onTouchEnd={() => handleTouchEnd('jump')}
            onMouseDown={() => handleTouchStart('jump')}
            onMouseUp={() => handleTouchEnd('jump')}
            className="w-13 h-13 rounded-full bg-emerald-600/90 active:bg-emerald-700 text-white font-bold text-sm shadow-lg border border-emerald-300/40 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
          >
            Jump
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PROCEDURAL CANVAS ARTWORK & SPRITE DRAWING
// ==========================================

function drawDistantScenery(ctx: CanvasRenderingContext2D, stage: StageData, cameraX: number, groundY: number) {
  // Soft floating clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  for (let i = 0; i < 15; i++) {
    const cloudX = (i * 320) + (cameraX * 0.3);
    const cloudY = 50 + (i % 3) * 35;
    ctx.beginPath();
    ctx.arc(cloudX, cloudY, 28, 0, Math.PI * 2);
    ctx.arc(cloudX + 22, cloudY - 10, 34, 0, Math.PI * 2);
    ctx.arc(cloudX + 46, cloudY, 26, 0, Math.PI * 2);
    ctx.fill();
  }

  // Distant pastel rolling hills
  ctx.fillStyle = stage.themeColor.groundColor + '33'; // 20% opacity
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  for (let x = 0; x <= stage.levelLength; x += 120) {
    const hillY = groundY - 130 + Math.sin(x * 0.003) * 45;
    ctx.lineTo(x, hillY);
  }
  ctx.lineTo(stage.levelLength, groundY);
  ctx.fill();
}

function drawGroundAndEnvironment(ctx: CanvasRenderingContext2D, stage: StageData, groundY: number) {
  // Main ground soil and path
  ctx.fillStyle = stage.themeColor.groundColor;
  ctx.fillRect(0, groundY, stage.levelLength, 120);

  // Surface grass/path accent line
  ctx.fillStyle = stage.themeColor.accentColor;
  ctx.fillRect(0, groundY, stage.levelLength, 8);

  // Background trees, flowers, and gentle streetlights along the route
  for (let x = 160; x < stage.levelLength; x += 220) {
    // Tree trunk
    ctx.fillStyle = '#854d0e';
    ctx.fillRect(x - 6, groundY - 80, 12, 80);

    // Tree foliage
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.arc(x, groundY - 100, 36, 0, Math.PI * 2);
    ctx.arc(x - 20, groundY - 85, 28, 0, Math.PI * 2);
    ctx.arc(x + 20, groundY - 85, 28, 0, Math.PI * 2);
    ctx.fill();

    // Cute small ground flowers
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(x + 40, groundY - 12, 4, 0, Math.PI * 2);
    ctx.arc(x + 55, groundY - 14, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawObstacles(ctx: CanvasRenderingContext2D, obstacles: (ObstacleData & { resolved?: boolean })[], groundY: number) {
  obstacles.forEach((obs) => {
    ctx.save();
    if (obs.resolved) {
      ctx.globalAlpha = 0.35;
    }

    const obsTop = groundY - obs.height;
    const centerX = obs.x + obs.width / 2;

    if (obs.type === 'nausea_wave') {
      // 🤢 Morning sickness nausea wave: bubbling teal/mint wave
      const grad = ctx.createLinearGradient(obs.x, obsTop, obs.x, groundY);
      grad.addColorStop(0, '#34d399');
      grad.addColorStop(0.5, '#10b981');
      grad.addColorStop(1, '#059669');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(obs.x, groundY);
      ctx.quadraticCurveTo(obs.x + obs.width * 0.25, obsTop - 6, centerX, obsTop + 4);
      ctx.quadraticCurveTo(obs.x + obs.width * 0.75, obsTop - 10, obs.x + obs.width, groundY);
      ctx.closePath();
      ctx.fill();

      // Nausea swirl & bubbles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.beginPath();
      ctx.arc(centerX - 8, obsTop + 14, 4, 0, Math.PI * 2);
      ctx.arc(centerX + 10, obsTop + 10, 5, 0, Math.PI * 2);
      ctx.arc(centerX + 2, obsTop + 24, 3, 0, Math.PI * 2);
      ctx.fill();

      // Nausea icon
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🤢', centerX, obsTop + 24);
    } else if (obs.type === 'vomiting_spasm') {
      // 🤮 Sudden vomiting spasm: sharp lime/yellow energetic wave
      const grad = ctx.createLinearGradient(obs.x, obsTop, obs.x, groundY);
      grad.addColorStop(0, '#facc15');
      grad.addColorStop(0.6, '#84cc16');
      grad.addColorStop(1, '#4d7c0f');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(obs.x, groundY);
      ctx.lineTo(obs.x + 8, obsTop + 10);
      ctx.lineTo(centerX - 4, obsTop - 4);
      ctx.lineTo(centerX + 6, obsTop + 12);
      ctx.lineTo(obs.x + obs.width - 6, obsTop);
      ctx.lineTo(obs.x + obs.width, groundY);
      ctx.closePath();
      ctx.fill();

      // Spasm icon
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚡', centerX, obsTop + 22);
    } else if (obs.type === 'heartburn_flare') {
      // 🔥 Acid reflux heartburn flare: glowing flame gradient
      const grad = ctx.createLinearGradient(obs.x, obsTop, obs.x, groundY);
      grad.addColorStop(0, '#f97316');
      grad.addColorStop(0.5, '#ef4444');
      grad.addColorStop(1, '#991b1b');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(obs.x, groundY);
      ctx.quadraticCurveTo(obs.x + obs.width * 0.3, obsTop - 10, centerX, obsTop);
      ctx.quadraticCurveTo(obs.x + obs.width * 0.7, obsTop - 8, obs.x + obs.width, groundY);
      ctx.closePath();
      ctx.fill();

      // Flame core
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.ellipse(centerX, groundY - 14, obs.width * 0.22, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🔥', centerX, obsTop + 20);
    } else if (obs.type === 'leg_cramp') {
      // ⚡ Sudden calf leg cramp: jagged muscle spasm arc
      ctx.fillStyle = 'rgba(234, 179, 8, 0.25)';
      ctx.beginPath();
      ctx.roundRect(obs.x, obsTop + 8, obs.width, obs.height - 8, 6);
      ctx.fill();

      // Jagged electric spasm line
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(obs.x + 4, groundY - 8);
      ctx.lineTo(obs.x + obs.width * 0.3, obsTop + 8);
      ctx.lineTo(obs.x + obs.width * 0.5, groundY - 6);
      ctx.lineTo(obs.x + obs.width * 0.75, obsTop + 10);
      ctx.lineTo(obs.x + obs.width - 4, groundY - 10);
      ctx.stroke();

      ctx.font = '15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🦵', centerX, obsTop + 20);
    } else if (obs.type === 'pelvic_pressure') {
      // 💜 Pelvic pressure / weight wave
      const grad = ctx.createLinearGradient(obs.x, obsTop, obs.x, groundY);
      grad.addColorStop(0, '#c084fc');
      grad.addColorStop(0.7, '#7e22ce');
      grad.addColorStop(1, '#581c87');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.roundRect(obs.x, obsTop + 4, obs.width, obs.height - 4, 10);
      ctx.fill();

      ctx.fillStyle = '#f3e8ff';
      ctx.beginPath();
      ctx.arc(centerX, obsTop + 16, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚖️', centerX, obsTop + 22);
    } else if (obs.type === 'smell_trigger') {
      // 💨 Pungent odor cloud
      ctx.fillStyle = 'rgba(217, 119, 6, 0.4)';
      ctx.beginPath();
      ctx.arc(centerX - 12, obsTop + 18, 14, 0, Math.PI * 2);
      ctx.arc(centerX + 12, obsTop + 16, 16, 0, Math.PI * 2);
      ctx.arc(centerX, obsTop + 24, 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👃💨', centerX, obsTop + 22);
    } else if (obs.type === 'fatigue_puddle') {
      // 💤 Fatigue puddle
      ctx.fillStyle = 'rgba(96, 165, 250, 0.45)';
      ctx.beginPath();
      ctx.ellipse(centerX, groundY - 8, obs.width / 2, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💤', centerX, groundY - 14);
    } else if (obs.type === 'heavy_grocery' || obs.type === 'clutter') {
      // 📦 Heavy boxes requiring partner assist
      ctx.fillStyle = '#92400e';
      ctx.fillRect(obs.x, groundY - obs.height, obs.width, obs.height);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(obs.x + 4, groundY - obs.height + 4, obs.width - 8, obs.height - 8);

      if (!obs.resolved && obs.partnerAssistRequired) {
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.roundRect(obs.x - 12, groundY - obs.height - 28, obs.width + 24, 22, 6);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🤝 Press Q / Leo', centerX, groundY - obs.height - 13);
      }
    } else {
      // Steps / stairs
      ctx.fillStyle = '#64748b';
      for (let s = 0; s < 3; s++) {
        ctx.fillRect(obs.x + s * 25, groundY - (s + 1) * 14, 30, (s + 1) * 14);
      }
    }

    // Telegraph Jump Badge for jumpable obstacles
    if (!obs.resolved && obs.requiresJump) {
      const badgeY = obsTop - 26;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.roundRect(centerX - 36, badgeY, 72, 20, 6);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⬆️ JUMP', centerX, badgeY + 14);
    }

    ctx.restore();
  });
}

function drawFoodItems(ctx: CanvasRenderingContext2D, foods: (FoodItemData & { collected?: boolean })[], angle: number) {
  foods.forEach((food) => {
    if (food.collected) return;

    const hoverY = food.y + Math.sin(angle + food.x) * 6;
    const centerX = food.x + food.width / 2;
    const centerY = hoverY + food.height / 2;

    ctx.save();

    // Gentle glow ring
    ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
    ctx.fill();

    // Specific food shape rendering
    if (food.type === 'banana') {
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 14, 7, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#854d0e';
      ctx.fillRect(centerX + 8, centerY - 8, 3, 4);
    } else if (food.type === 'orange') {
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY - 14, 4, 2, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (food.type === 'apple') {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(centerX - 4, centerY, 11, 0, Math.PI * 2);
      ctx.arc(centerX + 4, centerY, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#15803d';
      ctx.fillRect(centerX - 1, centerY - 15, 3, 6);
    } else if (food.type === 'spinach') {
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.ellipse(centerX - 5, centerY, 10, 15, -Math.PI / 6, 0, Math.PI * 2);
      ctx.ellipse(centerX + 5, centerY, 10, 15, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (food.type === 'milk') {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(centerX - 8, centerY - 12, 16, 24, 3);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(centerX - 7, centerY + 2, 14, 8);
    } else if (food.type === 'water') {
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(centerX, centerY + 4, 11, 0, Math.PI * 2);
      ctx.moveTo(centerX, centerY - 13);
      ctx.lineTo(centerX + 11, centerY + 2);
      ctx.lineTo(centerX - 11, centerY + 2);
      ctx.closePath();
      ctx.fill();
    } else if (food.type === 'pillow') {
      ctx.fillStyle = '#c084fc';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 18, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f3e8ff';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 12, 7, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Name label
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(food.name, centerX, centerY + 28);

    ctx.restore();
  });
}

function drawNpc(ctx: CanvasRenderingContext2D, npc: StageData['npc'], groundY: number, playerX: number) {
  if (!npc) return;
  const isNear = Math.abs(playerX - npc.x) < 140;

  ctx.save();
  // Doctor/Midwife body
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(npc.x - 16, groundY - 65, 32, 65);
  // Stethoscope
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(npc.x, groundY - 45, 10, 0, Math.PI);
  ctx.stroke();
  // Head
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(npc.x, groundY - 80, 14, 0, Math.PI * 2);
  ctx.fill();
  // Hair
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(npc.x, groundY - 85, 14, Math.PI, Math.PI * 2);
  ctx.fill();

  // Speech bubble if player is near
  if (isNear) {
    ctx.shadowColor = 'rgba(2, 132, 199, 0.4)';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(npc.x - 80, groundY - 146, 160, 48, 10);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Small arrow pointing down to NPC head
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.moveTo(npc.x - 8, groundY - 98);
    ctx.lineTo(npc.x + 8, groundY - 98);
    ctx.lineTo(npc.x, groundY - 90);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`🩺 ${npc.name}`, npc.x, groundY - 128);

    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#e0f2fe';
    ctx.fillText('👉 Tap or Press [E] to Talk', npc.x, groundY - 110);
  }

  ctx.restore();
}

function drawMilestoneFinish(ctx: CanvasRenderingContext2D, x: number, groundY: number, stageTitle: string) {
  ctx.save();
  // Arch pillars
  ctx.fillStyle = '#fb7185';
  ctx.fillRect(x, groundY - 130, 16, 130);
  ctx.fillRect(x + 100, groundY - 130, 16, 130);

  // Arch top banner
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.roundRect(x - 15, groundY - 160, 146, 38, 8);
  ctx.fill();

  // Banner text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⭐ MILESTONE ⭐', x + 58, groundY - 144);
  ctx.font = '10px sans-serif';
  ctx.fillText('Step Together Here', x + 58, groundY - 130);

  // Golden heart icon above arch
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(x + 58, groundY - 180, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawMayaSprite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  facing: 1 | -1,
  isWalking: boolean,
  walkFrame: number,
  isGrounded: boolean,
  bellyScale: number,
  isStumbled?: boolean
) {
  ctx.save();
  ctx.translate(x + 22, y + 36);
  ctx.scale(facing, 1);

  const bob = isWalking ? Math.sin(walkFrame * 2) * 2.5 : 0;
  const legSwing = isWalking ? Math.sin(walkFrame) * 8 : 0;

  // Gentle breath aura when stumbling into symptom (recovery breath)
  if (isStumbled) {
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(0, 0, 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Legs / feet
  ctx.fillStyle = '#1e293b';
  // Left leg
  ctx.fillRect(-12 + legSwing, 24, 8, 14);
  // Right leg
  ctx.fillRect(4 - legSwing, 24, 8, 14);

  // Maternity dress body
  ctx.fillStyle = '#f43f5e'; // vibrant coral dress
  ctx.beginPath();
  ctx.moveTo(-14, -10 + bob);
  ctx.lineTo(14, -10 + bob);
  ctx.lineTo(18, 26 + bob);
  ctx.lineTo(-18, 26 + bob);
  ctx.closePath();
  ctx.fill();

  // THE BABY BUMP (Dynamically scales with bellyScale: from tiny month 1 flutter to month 9 round bump!)
  const bumpRadiusX = 9 + bellyScale * 14;
  const bumpRadiusY = 10 + bellyScale * 12;
  const bumpCenterX = 6 + bellyScale * 8;
  const bumpCenterY = 10 + bob;

  ctx.fillStyle = '#fb7185';
  ctx.beginPath();
  ctx.ellipse(bumpCenterX, bumpCenterY, bumpRadiusX, bumpRadiusY, 0, 0, Math.PI * 2);
  ctx.fill();

  // Maya's loving hand gently resting on the bump
  ctx.fillStyle = '#fecdd3';
  ctx.beginPath();
  ctx.arc(bumpCenterX + bumpRadiusX * 0.4, bumpCenterY + 4, 5, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = '#fed7aa'; // gentle warm skin tone
  ctx.beginPath();
  ctx.arc(0, -22 + bob, 15, 0, Math.PI * 2);
  ctx.fill();

  // Hair (soft wavy brown hair with cute ribbon)
  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.arc(0, -26 + bob, 16, Math.PI, Math.PI * 2);
  ctx.arc(-10, -18 + bob, 8, 0, Math.PI * 2);
  ctx.fill();

  // Pink headband
  ctx.fillStyle = '#ec4899';
  ctx.fillRect(-14, -28 + bob, 28, 4);

  // Cute eye
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(5, -22 + bob, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Smile
  ctx.strokeStyle = '#e11d48';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(5, -17 + bob, 3, 0, Math.PI);
  ctx.stroke();

  // Blush
  ctx.fillStyle = '#fda4af';
  ctx.beginPath();
  ctx.arc(6, -18 + bob, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawPartnerSprite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  facing: 1 | -1,
  isWalking: boolean,
  walkFrame: number,
  isAssisting: boolean
) {
  ctx.save();
  ctx.translate(x + 22, y + 38);
  ctx.scale(facing, 1);

  const bob = isWalking ? Math.sin(walkFrame * 2) * 2.5 : 0;
  const legSwing = isWalking ? Math.sin(walkFrame) * 8 : 0;

  // Partner legs
  ctx.fillStyle = '#334155';
  ctx.fillRect(-12 + legSwing, 24, 9, 16);
  ctx.fillRect(3 - legSwing, 24, 9, 16);

  // Partner sweater/jacket
  ctx.fillStyle = isAssisting ? '#3b82f6' : '#0284c7';
  ctx.beginPath();
  ctx.roundRect(-15, -12 + bob, 30, 36, 4);
  ctx.fill();

  // Arm reaching out if assisting (supportive stance)
  ctx.fillStyle = '#0284c7';
  if (isAssisting) {
    ctx.fillRect(10, -5 + bob, 20, 8); // reaching forward
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(32, -1 + bob, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Head
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(0, -24 + bob, 15, 0, Math.PI * 2);
  ctx.fill();

  // Short cropped hair
  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.arc(0, -29 + bob, 15, Math.PI * 0.8, Math.PI * 2.2);
  ctx.fill();

  // Partner eye & warm smile
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(5, -24 + bob, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#0369a1';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(5, -19 + bob, 3.5, 0, Math.PI);
  ctx.stroke();

  // Heart above partner when assisting
  if (isAssisting) {
    ctx.fillStyle = '#ec4899';
    ctx.font = '16px sans-serif';
    ctx.fillText('❤️', -6, -42 + bob);
  }

  ctx.restore();
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  particles.forEach((p) => {
    ctx.save();
    const alpha = 1 - p.life / p.maxLife;
    ctx.globalAlpha = Math.max(0, alpha);

    if (p.type === 'heart') {
      ctx.fillStyle = p.color;
      ctx.font = `${Math.floor(p.size * 2)}px sans-serif`;
      ctx.fillText('❤️', p.x, p.y);
    } else {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  });
}

function drawFloatingTexts(ctx: CanvasRenderingContext2D, texts: FloatingText[]) {
  texts.forEach((ft) => {
    ctx.save();
    const alpha = Math.max(0, 1 - ft.life / ft.maxLife);
    ctx.globalAlpha = alpha;

    ctx.font = 'bold 12px sans-serif';
    const textWidth = ctx.measureText(ft.text).width;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(ft.x - textWidth / 2 - 10, ft.y - 14, textWidth + 20, 22, 11);
    ctx.fill();

    ctx.strokeStyle = ft.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = ft.color;
    ctx.textAlign = 'center';
    ctx.fillText(ft.text, ft.x, ft.y + 2);

    ctx.restore();
  });
}
