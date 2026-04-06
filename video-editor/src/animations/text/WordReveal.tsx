import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface WordRevealProps {
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  accentColor?: string;
  fontFamily?: string;
  lineHeight?: number;
  centered?: boolean;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  startFrame = 0,
  fontSize = 48,
  color = "#f1f5f9",
  accentColor = "#3b82f6",
  fontFamily = "Inter, sans-serif",
  lineHeight = 1.4,
  centered = true,
}) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  const FRAMES_PER_WORD = 4;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: fontSize * 0.25,
        justifyContent: centered ? "center" : "flex-start",
        alignItems: "center",
        maxWidth: "80%",
        lineHeight,
      }}
    >
      {words.map((word, i) => {
        const delay = startFrame + i * FRAMES_PER_WORD;
        const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const translateY = interpolate(frame, [delay, delay + 12], [25, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const isHighlight = word.startsWith("*") && word.endsWith("*");
        const displayWord = isHighlight ? word.slice(1, -1) : word;

        return (
          <span
            key={i}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              fontSize,
              fontFamily,
              fontWeight: isHighlight ? 700 : 500,
              color: isHighlight ? accentColor : color,
              display: "inline-block",
            }}
          >
            {displayWord}
          </span>
        );
      })}
    </div>
  );
};
