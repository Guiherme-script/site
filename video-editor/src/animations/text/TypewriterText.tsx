import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface TypewriterTextProps {
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  accentColor?: string;
  fontFamily?: string;
  framesPerChar?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame = 0,
  fontSize = 40,
  color = "#f1f5f9",
  accentColor = "#3b82f6",
  fontFamily = "Inter, sans-serif",
  framesPerChar = 2,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.floor(elapsed / framesPerChar);
  const visibleText = text.slice(0, charsToShow);
  const showCursor = elapsed % 16 < 10; // blinking cursor

  const cursorOpacity = interpolate(
    frame % 16,
    [0, 4, 8, 12, 16],
    [1, 1, 0, 0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        fontSize,
        fontFamily,
        fontWeight: 500,
        color,
        maxWidth: "80%",
        textAlign: "center",
        lineHeight: 1.5,
      }}
    >
      {visibleText}
      {charsToShow < text.length && (
        <span
          style={{
            color: accentColor,
            opacity: cursorOpacity,
            fontWeight: 300,
          }}
        >
          |
        </span>
      )}
    </div>
  );
};
