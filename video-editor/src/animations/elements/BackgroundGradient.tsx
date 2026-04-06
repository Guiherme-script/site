import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface BackgroundGradientProps {
  color1: string;
  color2: string;
  width: number;
  height: number;
  animated?: boolean;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  color1,
  color2,
  width,
  height,
  animated = true,
}) => {
  const frame = useCurrentFrame();

  const angle = animated
    ? interpolate(frame, [0, 300], [135, 225], {
        extrapolateRight: "extend",
      })
    : 135;

  // Subtle vignette
  const vignetteOpacity = 0.4;

  return (
    <div style={{ position: "absolute", width, height }}>
      {/* Main gradient */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`,
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at center, transparent 50%, ${color1} 150%)`,
          opacity: vignetteOpacity,
        }}
      />
      {/* Subtle noise texture via grid pattern */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `radial-gradient(circle, ${color2}15 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          opacity: 0.3,
        }}
      />
    </div>
  );
};
