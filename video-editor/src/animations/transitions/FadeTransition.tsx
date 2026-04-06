import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface FadeTransitionProps {
  children: React.ReactNode;
  durationInFrames: number;
  type?: "in" | "out" | "both";
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  durationInFrames,
  type = "both",
}) => {
  const frame = useCurrentFrame();
  const fadeFrames = 15;

  let opacity = 1;

  if (type === "in" || type === "both") {
    const fadeIn = interpolate(frame, [0, fadeFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    opacity = Math.min(opacity, fadeIn);
  }

  if (type === "out" || type === "both") {
    const fadeOut = interpolate(
      frame,
      [durationInFrames - fadeFrames, durationInFrames],
      [1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
    opacity = Math.min(opacity, fadeOut);
  }

  return <div style={{ opacity, width: "100%", height: "100%" }}>{children}</div>;
};
