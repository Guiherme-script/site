import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { WordReveal } from "../../animations/text/WordReveal";
import { BackgroundGradient } from "../../animations/elements/BackgroundGradient";

interface ProblemSceneProps {
  text: string;
  width: number;
  height: number;
  durationInFrames: number;
  accentColor?: string;
  backgroundColor?: string;
}

export const ProblemScene: React.FC<ProblemSceneProps> = ({
  text,
  width,
  height,
  durationInFrames,
  accentColor = "#ef4444",
  backgroundColor = "#1a0a0e",
}) => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Warning stripes at top
  const stripeOffset = interpolate(frame, [0, 120], [0, 40], {
    extrapolateRight: "extend",
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

      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          transform: `translateX(${stripeOffset}px)`,
        }}
      />

      {/* Alert icon */}
      <div
        style={{
          position: "absolute",
          top: height * 0.15,
          opacity: interpolate(frame, [5, 20], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      <WordReveal
        text={text}
        startFrame={10}
        fontSize={Math.min(44, width * 0.025)}
        color="#f1f5f9"
        accentColor={accentColor}
      />
    </div>
  );
};
