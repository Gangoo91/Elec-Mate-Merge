/**
 * PortfolioSetupAnimation
 *
 * Full-screen animated overlay shown while setting up portfolio.
 * Shows step-by-step progress with smooth animations.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Zap, FolderOpen, Settings, CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortfolioSetupAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
  qualificationTitle?: string;
}

const steps = [
  {
    id: 'creating',
    label: 'Creating your portfolio',
    icon: FolderOpen,
    duration: 800,
  },
  {
    id: 'categories',
    label: 'Setting up categories',
    icon: FolderOpen,
    duration: 1000,
  },
  {
    id: 'requirements',
    label: 'Configuring requirements',
    icon: Settings,
    duration: 1200,
  },
  {
    id: 'finishing',
    label: 'Almost ready',
    icon: Sparkles,
    duration: 600,
  },
];

export function PortfolioSetupAnimation({
  isVisible,
  onComplete,
  qualificationTitle,
}: PortfolioSetupAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setIsComplete(false);
      return;
    }

    // Progress through steps
    let stepIndex = 0;
    const progressStep = () => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        stepIndex++;
        setTimeout(progressStep, steps[stepIndex - 1]?.duration || 1000);
      } else {
        // Complete
        setIsComplete(true);
        setTimeout(() => {
          onComplete?.();
        }, 1000);
      }
    };

    const timer = setTimeout(progressStep, 300);
    return () => clearTimeout(timer);
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
        >
          <div className="max-w-md w-full mx-4 space-y-8">
            {/* Animated Logo/Icon */}
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <div className="relative">
                {/* Outer Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-elec-yellow/20"
                  style={{ width: 96, height: 96 }}
                />
                {/* Spinning Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-elec-yellow"
                  style={{ width: 96, height: 96 }}
                  animate={{ rotate: isComplete ? 0 : 360 }}
                  transition={{
                    repeat: isComplete ? 0 : Infinity,
                    duration: 1.5,
                    ease: 'linear',
                  }}
                />
                {/* Center Icon */}
                <motion.div
                  className={cn(
                    'w-24 h-24 rounded-full flex items-center justify-center',
                    isComplete ? 'bg-green-500/20' : 'bg-elec-yellow/10'
                  )}
                  animate={{
                    scale: isComplete ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isComplete ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                    >
                      <CheckCircle2 className="h-12 w-12 text-green-500" />
                    </motion.div>
                  ) : (
                    <Zap className="h-12 w-12 text-elec-yellow" />
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              className="text-center space-y-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-foreground">
                {isComplete ? 'Portfolio Ready!' : 'Setting Up Portfolio'}
              </h2>
              {qualificationTitle && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {qualificationTitle}
                </p>
              )}
            </motion.div>

            {/* Steps */}
            <motion.div
              className="space-y-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {steps.map((step, index) => {
                const isActive = currentStep === index && !isComplete;
                const isDone = currentStep > index || isComplete;

                return (
                  <motion.div
                    key={step.id}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-xl transition-colors',
                      isActive && 'bg-elec-yellow/10',
                      isDone && 'bg-green-500/5'
                    )}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index + 0.4 }}
                  >
                    {/* Step Icon */}
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                        isDone
                          ? 'bg-green-500/20'
                          : isActive
                          ? 'bg-elec-yellow/20'
                          : 'bg-muted'
                      )}
                    >
                      {isDone ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : isActive ? (
                        <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
                      ) : (
                        <step.icon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>

                    {/* Step Label */}
                    <span
                      className={cn(
                        'text-sm font-medium transition-colors',
                        isDone
                          ? 'text-green-500'
                          : isActive
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {step.label}
                    </span>

                    {/* Animated ellipsis for active step */}
                    {isActive && !isComplete && (
                      <motion.span
                        className="text-elec-yellow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        ...
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    'h-full rounded-full',
                    isComplete ? 'bg-green-500' : 'bg-elec-yellow'
                  )}
                  initial={{ width: '0%' }}
                  animate={{
                    width: isComplete
                      ? '100%'
                      : `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {isComplete
                  ? 'Your portfolio is ready to use'
                  : `Step ${currentStep + 1} of ${steps.length}`}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PortfolioSetupAnimation;
