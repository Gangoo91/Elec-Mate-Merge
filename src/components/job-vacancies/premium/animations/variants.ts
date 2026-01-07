/**
 * Animation variants for premium job vacancies components
 * Reuses patterns from education premium for consistency
 */

import type { Variants, Transition } from "framer-motion";

// Native spring configuration for natural motion
export const nativeSpringConfig: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
};

// Counter animation spring
export const counterSpringConfig = {
  stiffness: 100,
  damping: 30,
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

// Staggered list container
export const listContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
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

export const cardPressSubtleVariants = {
  tap: { scale: 0.99 },
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

// Pill/chip animation with stagger
export const pillVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.05,
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  }),
  tap: { scale: 0.95 },
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

// Skeleton shimmer animation
export const shimmerVariants: Variants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
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
