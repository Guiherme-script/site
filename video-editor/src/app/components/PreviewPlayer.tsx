import React, { useCallback, useMemo } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { FullVideoComposition } from "../../compositions/FullVideoComposition";
import { useEditorStore } from "../store";
import { totalDurationFrames } from "../../core/parser/timingEngine";

export const PreviewPlayer: React.FC = () => {
  const { project } = useEditorStore();
  const playerRef = React.useRef<PlayerRef>(null);

  const totalFrames = useMemo(() => {
    if (!project) return 1;
    return project.scenes.reduce((sum, s) => sum + s.durationInFrames, 0);
  }, [project]);

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center bg-editor-bg">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-20">▶</div>
          <p className="text-editor-muted text-sm">
            Escreva um roteiro e clique em "Gerar Animação"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-editor-bg">
      {/* Header */}
      <div className="px-4 py-3 border-b border-editor-border flex items-center justify-between">
        <h2 className="text-sm font-semibold text-editor-text">Preview</h2>
        <span className="text-xs text-editor-muted">
          {project.scenes.length} cenas · {Math.round(totalFrames / project.fps)}s
        </span>
      </div>

      {/* Player Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          style={{
            width: "100%",
            maxWidth: 800,
            aspectRatio: `${project.width}/${project.height}`,
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
          }}
        >
          <Player
            ref={playerRef}
            component={FullVideoComposition}
            inputProps={{ project }}
            durationInFrames={Math.max(1, totalFrames)}
            fps={project.fps}
            compositionWidth={project.width}
            compositionHeight={project.height}
            style={{ width: "100%", height: "100%" }}
            controls
            autoPlay
            loop
          />
        </div>
      </div>
    </div>
  );
};
