import React from "react";
import type { Scene } from "../core/types";
import { HookScene } from "../templates/vsl/HookScene";
import { ProblemScene } from "../templates/vsl/ProblemScene";
import { SolutionScene } from "../templates/vsl/SolutionScene";
import { CTAScene } from "../templates/vsl/CTAScene";
import { FadeTransition } from "../animations/transitions/FadeTransition";

interface SceneCompositionProps {
  scene: Scene;
  width: number;
  height: number;
}

export const SceneComposition: React.FC<SceneCompositionProps> = ({
  scene,
  width,
  height,
}) => {
  const commonProps = {
    text: scene.text,
    width,
    height,
    durationInFrames: scene.durationInFrames,
    accentColor: scene.accentColor,
    backgroundColor: scene.backgroundColor,
  };

  const renderScene = () => {
    switch (scene.type) {
      case "hook":
      case "title":
        return <HookScene {...commonProps} />;
      case "problem":
        return <ProblemScene {...commonProps} />;
      case "solution":
      case "proof":
      case "concept":
      case "steps":
        return <SolutionScene {...commonProps} />;
      case "cta":
        return <CTAScene {...commonProps} />;
      default:
        return <ProblemScene {...commonProps} />;
    }
  };

  return (
    <FadeTransition durationInFrames={scene.durationInFrames} type="both">
      {renderScene()}
    </FadeTransition>
  );
};
