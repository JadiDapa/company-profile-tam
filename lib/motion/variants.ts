import { Variants } from "motion/react";

export type FadeDirection = "up" | "down" | "left" | "right" | "none";

const OFFSET = 64;

const directionOffset = (direction: FadeDirection) => {
  switch (direction) {
    case "up":
      return { y: OFFSET };
    case "down":
      return { y: -OFFSET };
    case "left":
      return { x: OFFSET };
    case "right":
      return { x: -OFFSET };
    case "none":
    default:
      return {};
  }
};

export const fadeVariants = (
  direction: FadeDirection = "up",
  duration = 0.45,
  delay = 0,
): Variants => ({
  hidden: {
    opacity: 0,
    ...directionOffset(direction),
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: "easeOut",
    },
  },
});
