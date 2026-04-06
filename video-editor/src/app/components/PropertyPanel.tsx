import React from "react";
import { useEditorStore } from "../store";
import type { SceneType, AnimationStyle } from "../../core/types";

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

const animationOptions: { value: AnimationStyle; label: string }[] = [
  { value: "word-reveal", label: "Revelar Palavras" },
  { value: "typewriter", label: "Máquina de Escrever" },
  { value: "kinetic-title", label: "Título Cinético" },
  { value: "bullet-list", label: "Lista Animada" },
  { value: "fade-in", label: "Fade In" },
  { value: "slide-up", label: "Slide Para Cima" },
];

export const PropertyPanel: React.FC = () => {
  const { project, selectedSceneId, updateScene } = useEditorStore();

  if (!project || !selectedSceneId) {
    return (
      <div className="w-72 bg-editor-panel border-l border-editor-border flex items-center justify-center">
        <p className="text-editor-muted text-xs text-center px-4">
          Selecione uma cena na timeline para editar suas propriedades
        </p>
      </div>
    );
  }

  const scene = project.scenes.find((s) => s.id === selectedSceneId);
  if (!scene) return null;

  return (
    <div className="w-72 bg-editor-panel border-l border-editor-border overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-3 border-b border-editor-border">
        <h2 className="text-sm font-semibold text-editor-text">Propriedades</h2>
        <span className="text-xs text-editor-muted">{sceneTypeLabels[scene.type]}</span>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Text */}
        <div>
          <label className="block text-xs font-medium text-editor-muted mb-1.5">
            Texto
          </label>
          <textarea
            value={scene.text}
            onChange={(e) => updateScene(scene.id, { text: e.target.value })}
            className="w-full p-2.5 bg-editor-bg border border-editor-border rounded-md text-editor-text text-sm resize-none outline-none focus:border-editor-accent"
            rows={4}
          />
        </div>

        {/* Animation Style */}
        <div>
          <label className="block text-xs font-medium text-editor-muted mb-1.5">
            Animação
          </label>
          <select
            value={scene.animation}
            onChange={(e) =>
              updateScene(scene.id, { animation: e.target.value as AnimationStyle })
            }
            className="w-full p-2.5 bg-editor-bg border border-editor-border rounded-md text-editor-text text-sm outline-none focus:border-editor-accent"
          >
            {animationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Accent Color */}
        <div>
          <label className="block text-xs font-medium text-editor-muted mb-1.5">
            Cor de Destaque
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={scene.accentColor}
              onChange={(e) => updateScene(scene.id, { accentColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-editor-border"
            />
            <span className="text-xs text-editor-muted font-mono">
              {scene.accentColor}
            </span>
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-xs font-medium text-editor-muted mb-1.5">
            Cor de Fundo
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={scene.backgroundColor}
              onChange={(e) => updateScene(scene.id, { backgroundColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border border-editor-border"
            />
            <span className="text-xs text-editor-muted font-mono">
              {scene.backgroundColor}
            </span>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-medium text-editor-muted mb-1.5">
            Duração: {(scene.durationInFrames / (project.fps || 30)).toFixed(1)}s
          </label>
          <input
            type="range"
            min={30}
            max={360}
            step={15}
            value={scene.durationInFrames}
            onChange={(e) =>
              updateScene(scene.id, { durationInFrames: Number(e.target.value) })
            }
            className="w-full accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
