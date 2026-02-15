import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * Hook for haptic-style visual feedback on actions.
 */
export function useHapticFeedback() {
  /** Trigger a success animation (checkmark + optional confetti) */
  const triggerSuccess = useCallback((withConfetti = false) => {
    if (withConfetti) {
      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#FFD700', '#FFA500', '#32CD32'],
        disableForReducedMotion: true,
      });
    }
  }, []);

  /** Trigger a subtle pulse on an element */
  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  /** Scale-on-tap animation props for cards */
  const tapAnimation = {
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  };

  /** Stagger children animation for lists */
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return {
    triggerSuccess,
    pulseVariants,
    tapAnimation,
    staggerContainer,
    staggerItem,
  };
}

/** Animated checkmark that appears after a successful action */
export function SuccessCheckmark({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-20 w-20 rounded-full bg-success/20 border-2 border-success flex items-center justify-center"
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Check className="h-10 w-10 text-success" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
