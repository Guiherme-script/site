import React from "react";
import { useEditorStore } from "../store";
import type { SceneType } from "../../core/types";

const sceneTypeLabels: Record<SceneType, string> = {
  hook: "Gancho",
  problem: "Problema",
  solution: "Solução",
  proof: "Prova",
  cta: "CTA",
  title: "Título",
  concept: "Conceito",
  steps: "Passos",
  summary: "Resumo",
  quote: "Citação",
  generic: "Genérico",
};

const sceneTypeColors: Record<SceneType, string> = {
  hook: "#3b82f6",
  problem: "#ef4444",
  solution: "#10b981",
  proof: "#8b5cf6",
  cta: "#f59e0b",
  title: "#3b82f6",
  concept: "#06b6d4",
  steps: "#3b82f6",
  summary: "#8b5cf6",
  quote: "#a78bfa",
  generic: "#6b7280",
};

export const Timeline: React.FC = () => {
  const { project, selectedSceneId, selectScene } = useEditorStore();

  if (!project) return null;

  const totalFrames = project.scenes.reduce((sum, s) => sum + s.durationInFrames, 0);

  return (
    <div className="bg-editor-panel border-t border-editor-border">
      {/* Header */}
      <div className="px-4 py-2 border-b border-editor-border flex items-center justify-between">
        <h2 className="text-xs font-semibold text-editor-muted uppercase tracking-wider">
          Timeline
        </h2>
        <span className="text-xs text-editor-muted">
          {Math.round(totalFrames / project.fps)}s total
        </span>
      </div>

      {/* Scene Blocks */}
      <div className="flex gap-1 p-3 overflow-x-auto">
        {project.scenes.map((scene) => {
          const widthPercent = (scene.durationInFrames / totalFrames) * 100;
          const isSelected = scene.id === selectedSceneId;
          const color = sceneTypeColors[scene.type];

          return (
            <button
              key={scene.id}
              onClick={() => selectScene(isSelected ? null : scene.id)}
              className="flex-shrink-0 rounded-md transition-all hover:brightness-110 cursor-pointer"
              style={{
                width: `${Math.max(widthPercent, 8)}%`,
                minWidth: 80,
                height: 56,
                background: `linear-gradient(135deg, ${color}30, ${color}15)`,
                border: `2px solid ${isSelected ? color : color + "40"}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <span
                style={{ color, fontSize: 11, fontWeight: 600 }}
              >
                {sceneTypeLabels[scene.type]}
              </span>
              <span className="text-editor-muted" style={{ fontSize: 10 }}>
                {Math.round(scene.durationInFrames / project.fps)}s
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
