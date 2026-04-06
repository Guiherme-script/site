import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { WordReveal } from "../../animations/text/WordReveal";
import { BackgroundGradient } from "../../animations/elements/BackgroundGradient";

interface SolutionSceneProps {
  text: string;
  width: number;
  height: number;
  durationInFrames: number;
  accentColor?: string;
  backgroundColor?: string;
}

export const SolutionScene: React.FC<SolutionSceneProps> = ({
  text,
  width,
  height,
  durationInFrames,
  accentColor = "#10b981",
  backgroundColor = "#0a1a0e",
}) => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Expanding rings
  const ring1Scale = interpolate(frame, [0, 30], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ring1Opacity = interpolate(frame, [0, 10, 30], [0, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ring2Scale = interpolate(frame, [10, 40], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ring2Opacity = interpolate(frame, [10, 20, 40], [0, 0.2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Checkmark
  const checkOpacity = interpolate(frame, [15, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const checkScale = interpolate(frame, [15, 25], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
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
        color2={`${accentColor}15`}
        width={width}
        height={height}
      />

      {/* Expanding rings */}
      {[
        { scale: ring1Scale, opacity: ring1Opacity },
        { scale: ring2Scale, opacity: ring2Opacity },
      ].map((ring, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: `2px solid ${accentColor}`,
            transform: `scale(${ring.scale})`,
            opacity: ring.opacity,
          }}
        />
      ))}

      {/* Check icon */}
      <div
        style={{
          position: "absolute",
          top: height * 0.15,
          opacity: checkOpacity,
          transform: `scale(${checkScale})`,
        }}
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <div style={{ marginTop: 30 }}>
        <WordReveal
          text={text}
          startFrame={15}
          fontSize={Math.min(44, width * 0.025)}
          color="#f1f5f9"
          accentColor={accentColor}
        />
      </div>
    </div>
  );
};
