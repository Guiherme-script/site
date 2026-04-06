import type { ScriptBlock, Scene, Project, Theme, TemplateCategory, AspectRatio } from "../types";
import { sceneAnimationMap, sceneTransitionMap, sceneColorMap } from "../../styles/presets";
import { defaultTheme } from "../../styles/themes";
import { applyTiming } from "./timingEngine";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

const ASPECT_DIMENSIONS: Record<AspectRatio, { width: number; height: number }> = {
  "16:9": { width: 1920, height: 1080 },
  "9:16": { width: 1080, height: 1920 },
  "1:1": { width: 1080, height: 1080 },
};

function blockToScene(block: ScriptBlock): Scene {
  const colors = sceneColorMap[block.type] || sceneColorMap.generic;

  return {
    id: block.id,
    type: block.type,
    text: block.text,
    durationInFrames: block.estimatedDurationFrames,
    animation: sceneAnimationMap[block.type] || "word-reveal",
    transition: {
      type: sceneTransitionMap[block.type] || "fade",
      durationInFrames: 15,
    },
    backgroundColor: colors.bg,
    accentColor: colors.accent,
    icon: block.keywords[0],
    elements: [
      {
        type: "text",
        content: block.text,
        animation: sceneAnimationMap[block.type] || "word-reveal",
        delay: 0,
      },
    ],
  };
}

export function generateProject(
  blocks: ScriptBlock[],
  options: {
    template?: TemplateCategory;
    theme?: Theme;
    aspectRatio?: AspectRatio;
    fps?: number;
  } = {}
): Project {
  const {
    template = "vsl",
    theme = defaultTheme,
    aspectRatio = "16:9",
    fps = 30,
  } = options;

  const timedBlocks = applyTiming(blocks, fps);
  const scenes = timedBlocks.map(blockToScene);
  const dimensions = ASPECT_DIMENSIONS[aspectRatio];

  return {
    id: generateId(),
    title: "Novo Projeto",
    fps,
    width: dimensions.width,
    height: dimensions.height,
    scenes,
    theme,
    template,
    aspectRatio,
  };
}
