/**
 * ResultsSuccessAnimation.tsx
 * Premium celebration animation when design results arrive
 * Features: confetti burst, animated checkmark, scale-in text
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ResultsSuccessAnimationProps {
  onComplete: () => void;
  circuitCount?: number;
  projectName?: string;
}

// Confetti particle component
const ConfettiParticle = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ backgroundColor: color, left: `${x}%` }}
    initial={{ y: '50vh', opacity: 1, scale: 1, rotate: 0 }}
    animate={{
      y: ['-10vh', '110vh'],
      opacity: [1, 1, 0],
      scale: [1, 0.8],
      rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
      x: [0, (Math.random() - 0.5) * 100],
    }}
    transition={{
      duration: 2.5 + Math.random(),
      delay: delay,
      ease: 'easeOut',
    }}
  />
);

// Spark/burst particle
const SparkParticle = ({ angle, delay }: { angle: number; delay: number }) => {
  const radians = (angle * Math.PI) / 180;
  const distance = 80 + Math.random() * 40;

  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-elec-yellow"
      style={{
        left: '50%',
        top: '50%',
        marginLeft: -3,
        marginTop: -3,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(radians) * distance,
        y: Math.sin(radians) * distance,
        opacity: [1, 1, 0],
        scale: [1, 0.5],
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  );
};

// Animated checkmark SVG
const AnimatedCheckmark = () => (
  <motion.svg
    viewBox="0 0 52 52"
    className="w-20 h-20"
    initial="hidden"
    animate="visible"
  >
    {/* Circle */}
    <motion.circle
      cx="26"
      cy="26"
      r="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-elec-yellow"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 0.5, ease: 'easeOut' },
        },
      }}
    />
    {/* Checkmark */}
    <motion.path
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 27l8 8 16-16"
      className="text-elec-yellow"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 0.4, delay: 0.4, ease: 'easeOut' },
        },
      }}
    />
  </motion.svg>
);

export const ResultsSuccessAnimation = ({
  onComplete,
  circuitCount = 0,
  projectName,
}: ResultsSuccessAnimationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Handle exit animation complete
  const handleExitComplete = () => {
    onComplete();
  };

  // Handle tap to dismiss
  const handleTapToDismiss = () => {
    setIsVisible(false);
  };

  // Generate confetti colors
  const confettiColors = [
    '#F7D02C', // elec-yellow
    '#FFE066',
    '#FFF9DB',
    '#4ADE80', // green
    '#60A5FA', // blue
    '#A78BFA', // purple
    '#FACC15', // amber/yellow
  ];

  // Generate confetti particles
  const confettiParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.3,
    x: Math.random() * 100,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
  }));

  // Generate spark particles (radial burst)
  const sparkParticles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 16,
    delay: 0.3 + (i % 4) * 0.05,
  }));

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            "bg-elec-dark/95 backdrop-blur-md"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleTapToDismiss}
        >
          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {confettiParticles.map((particle) => (
              <ConfettiParticle
                key={particle.id}
                delay={particle.delay}
                x={particle.x}
                color={particle.color}
              />
            ))}
          </div>

          {/* Central content */}
          <motion.div
            className="relative flex flex-col items-center justify-center text-center px-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Spark burst behind checkmark */}
            <div className="relative">
              {sparkParticles.map((spark) => (
                <SparkParticle
                  key={spark.id}
                  angle={spark.angle}
                  delay={spark.delay}
                />
              ))}

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-elec-yellow/20 blur-2xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: [0, 0.5, 0] }}
                transition={{ duration: 1, delay: 0.3 }}
              />

              {/* Checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
              >
                <AnimatedCheckmark />
              </motion.div>
            </div>

            {/* Title */}
            <motion.h1
              className="mt-6 text-3xl font-bold text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Design Complete!
            </motion.h1>

            {/* Subtitle with circuit count */}
            <motion.p
              className="mt-2 text-base text-white/60"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {circuitCount > 0 ? (
                <>
                  <span className="text-elec-yellow font-semibold">{circuitCount}</span>
                  {' '}circuit{circuitCount !== 1 ? 's' : ''} designed
                </>
              ) : (
                'BS 7671 compliant design ready'
              )}
            </motion.p>

            {/* Project name */}
            {projectName && (
              <motion.p
                className="mt-1 text-sm text-white/40"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                {projectName}
              </motion.p>
            )}

            {/* Tap to continue hint */}
            <motion.p
              className="mt-8 text-xs text-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              Tap anywhere to continue
            </motion.p>
          </motion.div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-elec-yellow to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
