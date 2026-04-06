import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { KineticTitle } from "../../animations/text/KineticTitle";
import { BackgroundGradient } from "../../animations/elements/BackgroundGradient";

interface HookSceneProps {
  text: string;
  width: number;
  height: number;
  durationInFrames: number;
  accentColor?: string;
  backgroundColor?: string;
}

export const HookScene: React.FC<HookSceneProps> = ({
  text,
  width,
  height,
  durationInFrames,
  accentColor = "#3b82f6",
  backgroundColor = "#0a0e1a",
}) => {
  const frame = useCurrentFrame();

  // Scene-level fade out at the end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Accent circle pulse
  const circleScale = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const circleOpacity = interpolate(frame, [0, 15, 40], [0, 0.15, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: fadeOut,
      }}
    >
      <BackgroundGradient
        color1={backgroundColor}
        color2={`${accentColor}20`}
        width={width}
        height={height}
      />

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `2px solid ${accentColor}`,
          opacity: circleOpacity,
          transform: `scale(${circleScale})`,
        }}
      />

      <KineticTitle
        text={text}
        fontSize={Math.min(64, width * 0.035)}
        color="#f1f5f9"
        accentColor={accentColor}
      />
    </div>
  );
};
