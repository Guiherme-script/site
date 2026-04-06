import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface KineticTitleProps {
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  accentColor?: string;
  fontFamily?: string;
}

export const KineticTitle: React.FC<KineticTitleProps> = ({
  text,
  startFrame = 0,
  fontSize = 72,
  color = "#f1f5f9",
  accentColor = "#3b82f6",
  fontFamily = "Space Grotesk, sans-serif",
}) => {
  const frame = useCurrentFrame();

  // Title scales up and fades in
  const scale = interpolate(frame, [startFrame, startFrame + 20], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line grows from center
  const lineWidth = interpolate(frame, [startFrame + 10, startFrame + 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtle glow pulse
  const glowOpacity = interpolate(
    frame,
    [startFrame + 20, startFrame + 40, startFrame + 60],
    [0, 0.6, 0.3],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          fontSize,
          fontFamily,
          fontWeight: 700,
          color,
          textAlign: "center",
          maxWidth: "85%",
          lineHeight: 1.2,
          textShadow: `0 0 40px ${accentColor}${Math.round(glowOpacity * 255)
            .toString(16)
            .padStart(2, "0")}`,
        }}
      >
        {text}
      </div>
      <div
        style={{
          width: `${lineWidth}%`,
          maxWidth: 200,
          height: 3,
          backgroundColor: accentColor,
          borderRadius: 2,
          boxShadow: `0 0 20px ${accentColor}80`,
        }}
      />
    </div>
  );
};
