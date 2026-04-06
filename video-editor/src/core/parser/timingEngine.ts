import type { ScriptBlock } from "../types";

const DEFAULT_FPS = 30;
const WORDS_PER_MINUTE = 150;
const MIN_DURATION_SECONDS = 2.5;
const MAX_DURATION_SECONDS = 12;
const PADDING_SECONDS = 0.8; // extra breathing room per scene

export function calculateDuration(text: string, fps: number = DEFAULT_FPS): number {
  const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
  const readingSeconds = (wordCount / WORDS_PER_MINUTE) * 60 + PADDING_SECONDS;
  const clampedSeconds = Math.max(MIN_DURATION_SECONDS, Math.min(MAX_DURATION_SECONDS, readingSeconds));
  return Math.round(clampedSeconds * fps);
}

export function applyTiming(blocks: ScriptBlock[], fps: number = DEFAULT_FPS): ScriptBlock[] {
  return blocks.map((block) => ({
    ...block,
    estimatedDurationFrames: calculateDuration(block.text, fps),
  }));
}

export function totalDurationFrames(blocks: ScriptBlock[]): number {
  return blocks.reduce((sum, block) => sum + block.estimatedDurationFrames, 0);
}

export function framesToSeconds(frames: number, fps: number = DEFAULT_FPS): number {
  return Math.round((frames / fps) * 10) / 10;
}

export function secondsToFrames(seconds: number, fps: number = DEFAULT_FPS): number {
  return Math.round(seconds * fps);
}
