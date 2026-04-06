import type { AnimationStyle, TransitionType, SceneType } from "../core/types";

export const sceneAnimationMap: Record<SceneType, AnimationStyle> = {
  hook: "kinetic-title",
  problem: "word-reveal",
  solution: "slide-up",
  proof: "bullet-list",
  cta: "kinetic-title",
  title: "kinetic-title",
  concept: "word-reveal",
  steps: "bullet-list",
  summary: "fade-in",
  quote: "typewriter",
  generic: "word-reveal",
};

export const sceneTransitionMap: Record<SceneType, TransitionType> = {
  hook: "fade",
  problem: "slide-left",
  solution: "zoom",
  proof: "slide-up",
  cta: "fade",
  title: "fade",
  concept: "slide-left",
  steps: "slide-up",
  summary: "fade",
  quote: "fade",
  generic: "fade",
};

export const sceneColorMap: Record<SceneType, { bg: string; accent: string }> = {
  hook: { bg: "#0a0e1a", accent: "#3b82f6" },
  problem: { bg: "#1a0a0e", accent: "#ef4444" },
  solution: { bg: "#0a1a0e", accent: "#10b981" },
  proof: { bg: "#0e0a1a", accent: "#8b5cf6" },
  cta: { bg: "#1a150a", accent: "#f59e0b" },
  title: { bg: "#0a0e1a", accent: "#3b82f6" },
  concept: { bg: "#0a0e1a", accent: "#06b6d4" },
  steps: { bg: "#0a0e1a", accent: "#3b82f6" },
  summary: { bg: "#0a0e1a", accent: "#8b5cf6" },
  quote: { bg: "#0e0a1a", accent: "#a78bfa" },
  generic: { bg: "#0a0e1a", accent: "#3b82f6" },
};
