/**
 * Animation variants for premium CV builder components
 * Blue/cyan theme for CV builder
 */

import type { Variants, Transition } from "framer-motion";

// Native spring configuration
export const nativeSpringConfig: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
};

// Progress ring spring
export const progressSpringConfig = {
  stiffness: 50,
  damping: 20,
};

// Page enter/exit animations
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

// Step slide animations
export const stepSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: nativeSpringConfig,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};

// Staggered list container
export const listContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// List item animation
export const listItemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
};

// Card press feedback
export const cardPressVariants = {
  tap: { scale: 0.98 },
  hover: { scale: 1.02 },
};

// Card expand/collapse
export const cardExpandVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
};

// Bottom sheet animation
export const sheetVariants: Variants = {
  initial: { y: "100%" },
  animate: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    y: "100%",
    transition: { duration: 0.2 },
  },
};

// Fade up animation
export const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

// Scale in animation
export const scaleInVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: nativeSpringConfig,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

// Template card hover
export const templateCardVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
  selected: {
    scale: 1,
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
  },
};

// Step indicator animation
export const stepIndicatorVariants: Variants = {
  inactive: {
    scale: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  active: {
    scale: 1.1,
    backgroundColor: "rgba(59, 130, 246, 0.3)",
    transition: nativeSpringConfig,
  },
  completed: {
    scale: 1,
    backgroundColor: "rgba(34, 197, 94, 0.3)",
  },
};

// AI panel slide in
export const aiPanelVariants: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Celebration confetti burst
export const celebrationVariants: Variants = {
  initial: { scale: 0, rotate: 0 },
  animate: {
    scale: [0, 1.2, 1],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Pulse animation for live indicators
export const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Hero card entrance
export const heroCardVariants: Variants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
};
