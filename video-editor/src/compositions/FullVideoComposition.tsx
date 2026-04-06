import React from "react";
import { Series } from "remotion";
import type { Project } from "../core/types";
import { SceneComposition } from "./SceneComposition";

interface FullVideoCompositionProps {
  project: Project;
}

export const FullVideoComposition: React.FC<FullVideoCompositionProps> = ({
  project,
}) => {
  return (
    <div
      style={{
        width: project.width,
        height: project.height,
        backgroundColor: project.theme.colors.background,
        overflow: "hidden",
      }}
    >
      <Series>
        {project.scenes.map((scene) => (
          <Series.Sequence key={scene.id} durationInFrames={scene.durationInFrames}>
            <SceneComposition
              scene={scene}
              width={project.width}
              height={project.height}
            />
          </Series.Sequence>
        ))}
      </Series>
    </div>
  );
};
