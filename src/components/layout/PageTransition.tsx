import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

// Opacity only — a transform here (the old x: 8 slide) makes this wrapper the
// containing block for every position:fixed descendant while animating, which
// mis-anchors fixed headers/footers on all routed pages. Fade carries the same
// feel at 150ms without that hazard.
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.15,
  ease: 'easeOut',
};

export const PageTransition = ({ children }: PageTransitionProps) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
    className="w-full"
  >
    {children}
  </motion.div>
);

export default PageTransition;
