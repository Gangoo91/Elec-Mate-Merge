/**
 * RoadmapTimeline - Interactive timeline stepper
 *
 * Features:
 * - Three steps: Now, 3 Months, Long-term
 * - Horizontal step indicator with progress line
 * - Swipeable/tappable step selection
 * - Animated content transitions
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Calendar, Rocket, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSwipeable } from 'react-swipeable';

interface RoadmapStep {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  items: string[];
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 'now',
    label: 'Now',
    icon: Target,
    color: 'yellow',
    items: [
      'Update CV with latest certifications',
      'Research high-demand tech training',
      'Join professional networking groups',
      'Review JIB grade requirements',
      'Set up job alerts for target roles',
    ],
  },
  {
    id: '3-months',
    label: '3 Months',
    icon: Calendar,
    color: 'blue',
    items: [
      'Book specialist training courses',
      'Attend trade shows & exhibitions',
      'Compare contract rates vs salary',
      'Apply for professional membership',
      'Build specialist project portfolio',
    ],
  },
  {
    id: 'long-term',
    label: 'Long-term',
    icon: Rocket,
    color: 'green',
    items: [
      'Complete advanced qualifications',
      'Build deep expertise in specialism',
      'Pursue HNC/HND/Degree pathway',
      'Evaluate contracting vs employment',
      'Explore business ownership options',
    ],
  },
];

const colorStyles: Record<string, { dot: string; icon: string; line: string; bg: string }> = {
  yellow: {
    dot: 'bg-elec-yellow',
    icon: 'text-elec-yellow',
    line: 'bg-elec-yellow',
    bg: 'bg-elec-yellow/10',
  },
  blue: {
    dot: 'bg-blue-400',
    icon: 'text-blue-400',
    line: 'bg-blue-400',
    bg: 'bg-blue-500/10',
  },
  green: {
    dot: 'bg-green-400',
    icon: 'text-green-400',
    line: 'bg-green-400',
    bg: 'bg-green-500/10',
  },
};

export const RoadmapTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveStep((prev) => Math.min(prev + 1, roadmapSteps.length - 1)),
    onSwipedRight: () => setActiveStep((prev) => Math.max(prev - 1, 0)),
    trackMouse: false,
    trackTouch: true,
  });

  const currentStep = roadmapSteps[activeStep];
  const styles = colorStyles[currentStep.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden"
    >
      {/* Step Indicator */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between relative">
          {/* Progress Line Background */}
          <div className="absolute top-4 left-8 right-8 h-0.5 bg-white/10" />

          {/* Active Progress Line */}
          <motion.div
            className={cn("absolute top-4 left-8 h-0.5", styles.line)}
            initial={false}
            animate={{
              width: `calc(${(activeStep / (roadmapSteps.length - 1)) * 100}% - 32px)`,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {/* Steps */}
          {roadmapSteps.map((step, index) => {
            const stepStyles = colorStyles[step.color];
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className="relative z-10 flex flex-col items-center touch-manipulation"
              >
                {/* Dot */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    isActive && stepStyles.bg,
                    isActive && "ring-2 ring-offset-2 ring-offset-[#0a0a0a]",
                    isActive && step.color === 'yellow' && "ring-elec-yellow/50",
                    isActive && step.color === 'blue' && "ring-blue-400/50",
                    isActive && step.color === 'green' && "ring-green-400/50",
                    !isActive && !isCompleted && "bg-white/10",
                    isCompleted && stepStyles.bg
                  )}
                >
                  {isCompleted ? (
                    <Check className={cn("h-4 w-4", stepStyles.icon)} />
                  ) : (
                    <step.icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? stepStyles.icon : "text-white/40"
                      )}
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "text-xs font-medium mt-2 transition-colors",
                    isActive ? "text-white" : "text-white/40"
                  )}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div {...handlers} className="px-4 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-2.5"
          >
            {currentStep.items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 py-2"
              >
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                    styles.dot
                  )}
                />
                <span className="text-sm text-white/70">{item}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Swipe Hint */}
        <p className="text-center text-[11px] text-white/30 mt-3 sm:hidden">
          Swipe to navigate
        </p>
      </div>
    </motion.div>
  );
};

export default RoadmapTimeline;
