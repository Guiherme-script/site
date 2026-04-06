import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { KineticTitle } from "../../animations/text/KineticTitle";
import { BackgroundGradient } from "../../animations/elements/BackgroundGradient";

interface CTASceneProps {
  text: string;
  width: number;
  height: number;
  durationInFrames: number;
  accentColor?: string;
  backgroundColor?: string;
}

export const CTAScene: React.FC<CTASceneProps> = ({
  text,
  width,
  height,
  durationInFrames,
  accentColor = "#f59e0b",
  backgroundColor = "#1a150a",
}) => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Pulsing button effect
  const buttonScale = interpolate(
    frame % 40,
    [0, 20, 40],
    [1, 1.05, 1],
    { extrapolateRight: "clamp" }
  );

  const buttonOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow animation
  const arrowX = interpolate(frame % 30, [0, 15, 30], [0, 8, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
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

      <KineticTitle
        text={text}
        fontSize={Math.min(56, width * 0.03)}
        color="#f1f5f9"
        accentColor={accentColor}
      />

      {/* CTA Button */}
      <div
        style={{
          opacity: buttonOpacity,
          transform: `scale(${buttonScale})`,
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
          padding: "18px 48px",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: `0 8px 32px ${accentColor}40`,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#0a0e1a",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          COMECE AGORA
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0e1a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: `translateX(${arrowX}px)` }}
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </div>
  );
};
