import React from "react";
import { useEditorStore } from "../store";
import { parseScript } from "../../core/parser/scriptParser";
import { generateProject } from "../../core/parser/sceneGenerator";

export const ScriptInput: React.FC = () => {
  const { scriptText, setScriptText, setProject } = useEditorStore();

  const handleGenerate = () => {
    const blocks = parseScript(scriptText);
    if (blocks.length === 0) return;
    const project = generateProject(blocks);
    setProject(project);
  };

  return (
    <div className="flex flex-col h-full bg-editor-panel border-r border-editor-border">
      {/* Header */}
      <div className="px-4 py-3 border-b border-editor-border flex items-center justify-between">
        <h2 className="text-sm font-semibold text-editor-text">Roteiro</h2>
        <span className="text-xs text-editor-muted">
          Use [GANCHO], [PROBLEMA], [SOLUCAO], [CTA]
        </span>
      </div>

      {/* Text Input */}
      <textarea
        value={scriptText}
        onChange={(e) => setScriptText(e.target.value)}
        placeholder={`[GANCHO]\nSeu texto aqui...\n\n[PROBLEMA]\nDescreva o problema...\n\n[SOLUCAO]\nApresente a solução...\n\n[CTA]\nChamada para ação...`}
        className="flex-1 p-4 bg-transparent text-editor-text text-sm font-mono resize-none outline-none placeholder:text-editor-muted/50"
        spellCheck={false}
      />

      {/* Generate Button */}
      <div className="p-4 border-t border-editor-border">
        <button
          onClick={handleGenerate}
          className="w-full py-2.5 px-4 bg-editor-accent hover:bg-blue-600 text-white font-semibold text-sm rounded-lg transition-colors"
        >
          Gerar Animação
        </button>
      </div>
    </div>
  );
};
