/**
 * Framer Motion animation variants for premium native app feel
 */

import { Variants } from "framer-motion";

// Page enter/exit transitions
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
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

// Staggered list item
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

// Card press/hover feedback
export const cardPressVariants = {
  tap: { scale: 0.98 },
  hover: { scale: 1.02 },
};

// Subtle card press (for lists)
export const cardPressSubtleVariants = {
  tap: { scale: 0.99 },
};

// Bottom sheet enter/exit
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

// Fade in from bottom (for content inside sheets)
export const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

// Header collapse animation
export const headerVariants = {
  expanded: { height: 72, paddingTop: 16, paddingBottom: 16 },
  collapsed: { height: 56, paddingTop: 8, paddingBottom: 8 },
};

// Tab content slide
export const tabContentVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 20 : -20,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};

// Category pill animation
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

// Skeleton shimmer (using CSS animation instead)
export const skeletonVariants: Variants = {
  animate: {
    backgroundPosition: ["-200%", "200%"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Pull to refresh indicator
export const pullIndicatorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  refreshing: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: "linear" },
  },
};

// Floating action button
export const fabVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
      delay: 0.5,
    },
  },
  tap: { scale: 0.9 },
  hover: { scale: 1.1 },
};

// Badge pop animation
export const badgePopVariants: Variants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
    },
  },
};

// Counter spring config
export const counterSpringConfig = {
  stiffness: 100,
  damping: 30,
};

// Native spring config (for most animations)
export const nativeSpringConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
};

// Swipe action reveal
export const swipeActionVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

// Progress ring animation
export const progressRingVariants = (progress: number): Variants => ({
  initial: { pathLength: 0 },
  animate: {
    pathLength: progress / 100,
    transition: { duration: 1.5, ease: "easeOut" },
  },
});

// Parallax hero effect (for sheets)
export const parallaxVariants = (scrollY: number) => ({
  y: scrollY * 0.5,
  scale: 1 + scrollY * 0.001,
});
