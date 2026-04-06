import { create } from "zustand";
import type { Project, Scene, EditorState } from "../core/types";

export const useEditorStore = create<EditorState>((set) => ({
  project: null,
  selectedSceneId: null,
  isPlaying: false,
  currentFrame: 0,
  scriptText: `[GANCHO]
Você sabia que 90% das pessoas nunca alcançam seus objetivos?

[PROBLEMA]
A maioria tenta seguir métodos genéricos, mas acaba frustrada porque não tem um caminho personalizado.

[SOLUCAO]
Com o método Alquimia da Energia, você transforma sua rotina em apenas 3 passos simples e comprovados.

[CTA]
Clique no link abaixo e comece sua transformação agora.`,

  setScriptText: (text: string) => set({ scriptText: text }),

  setProject: (project: Project) => set({ project }),

  selectScene: (id: string | null) => set({ selectedSceneId: id }),

  updateScene: (id: string, updates: Partial<Scene>) =>
    set((state) => {
      if (!state.project) return state;
      return {
        project: {
          ...state.project,
          scenes: state.project.scenes.map((scene) =>
            scene.id === id ? { ...scene, ...updates } : scene
          ),
        },
      };
    }),

  setPlaying: (playing: boolean) => set({ isPlaying: playing }),

  setCurrentFrame: (frame: number) => set({ currentFrame: frame }),
}));
