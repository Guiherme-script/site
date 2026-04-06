import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface AnimatedIconProps {
  children: React.ReactNode;
  startFrame?: number;
  size?: number;
  color?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  children,
  startFrame = 0,
  size = 64,
  color = "#3b82f6",
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });

  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rotation = interpolate(frame, [startFrame, startFrame + 20], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtle floating animation after entry
  const floatY = frame > startFrame + 20
    ? Math.sin((frame - startFrame - 20) * 0.05) * 4
    : 0;

  return (
    <div
      style={{
        width: size,
        height: size,
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg) translateY(${floatY}px)`,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
