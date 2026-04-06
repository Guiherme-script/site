import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface BulletListProps {
  items: string[];
  startFrame?: number;
  fontSize?: number;
  color?: string;
  accentColor?: string;
  fontFamily?: string;
  framesPerItem?: number;
}

export const BulletList: React.FC<BulletListProps> = ({
  items,
  startFrame = 0,
  fontSize = 36,
  color = "#f1f5f9",
  accentColor = "#3b82f6",
  fontFamily = "Inter, sans-serif",
  framesPerItem = 20,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: fontSize * 0.6,
        maxWidth: "75%",
      }}
    >
      {items.map((item, i) => {
        const delay = startFrame + i * framesPerItem;
        const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const translateX = interpolate(frame, [delay, delay + 15], [-30, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const dotScale = interpolate(frame, [delay + 5, delay + 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.back(2)),
        });

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateX(${translateX}px)`,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: accentColor,
                transform: `scale(${dotScale})`,
                flexShrink: 0,
                boxShadow: `0 0 12px ${accentColor}60`,
              }}
            />
            <span
              style={{
                fontSize,
                fontFamily,
                fontWeight: 400,
                color,
                lineHeight: 1.4,
              }}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
};
