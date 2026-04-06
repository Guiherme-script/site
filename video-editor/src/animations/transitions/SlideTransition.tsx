import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface SlideTransitionProps {
  children: React.ReactNode;
  durationInFrames: number;
  direction?: "left" | "right" | "up" | "down";
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  durationInFrames,
  direction = "left",
}) => {
  const frame = useCurrentFrame();
  const slideFrames = 18;

  const getTransform = () => {
    const enterProgress = interpolate(frame, [0, slideFrames], [100, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

    const exitProgress = interpolate(
      frame,
      [durationInFrames - slideFrames, durationInFrames],
      [0, -100],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.in(Easing.cubic),
      }
    );

    const progress = frame < durationInFrames - slideFrames ? enterProgress : exitProgress;

    switch (direction) {
      case "left":
        return `translateX(${progress}%)`;
      case "right":
        return `translateX(${-progress}%)`;
      case "up":
        return `translateY(${progress}%)`;
      case "down":
        return `translateY(${-progress}%)`;
    }
  };

  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: getTransform(),
        opacity,
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};
