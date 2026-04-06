// ==========================================
// Core Types for the Video Editor
// ==========================================

export type SceneType =
  | "hook"
  | "problem"
  | "solution"
  | "proof"
  | "cta"
  | "title"
  | "concept"
  | "steps"
  | "summary"
  | "quote"
  | "generic";

export type AnimationStyle =
  | "word-reveal"
  | "typewriter"
  | "kinetic-title"
  | "bullet-list"
  | "fade-in"
  | "slide-up";

export type TransitionType = "fade" | "slide-left" | "slide-right" | "slide-up" | "wipe" | "zoom" | "none";

export type TemplateCategory = "vsl" | "course" | "social";

export type AspectRatio = "16:9" | "9:16" | "1:1";

export interface ScriptBlock {
  id: string;
  type: SceneType;
  text: string;
  keywords: string[];
  estimatedDurationFrames: number;
}

export interface SceneElement {
  type: "text" | "icon" | "shape" | "counter";
  content: string;
  animation: AnimationStyle;
  delay: number;
}

export interface TransitionConfig {
  type: TransitionType;
  durationInFrames: number;
}

export interface Scene {
  id: string;
  type: SceneType;
  text: string;
  elements: SceneElement[];
  durationInFrames: number;
  transition: TransitionConfig;
  animation: AnimationStyle;
  backgroundColor: string;
  accentColor: string;
  icon?: string;
}

export interface Theme {
  name: string;
  colors: {
    background: string;
    backgroundAlt: string;
    accent: string;
    accentSecondary: string;
    text: string;
    textMuted: string;
  };
  fontFamily: {
    heading: string;
    body: string;
  };
}

export interface Project {
  id: string;
  title: string;
  fps: number;
  width: number;
  height: number;
  scenes: Scene[];
  theme: Theme;
  template: TemplateCategory;
  aspectRatio: AspectRatio;
}

export interface EditorState {
  project: Project | null;
  selectedSceneId: string | null;
  isPlaying: boolean;
  currentFrame: number;
  scriptText: string;
  setScriptText: (text: string) => void;
  setProject: (project: Project) => void;
  selectScene: (id: string | null) => void;
  updateScene: (id: string, updates: Partial<Scene>) => void;
  setPlaying: (playing: boolean) => void;
  setCurrentFrame: (frame: number) => void;
}
