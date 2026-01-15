/**
 * CertificateCompletionProgress
 *
 * Step-by-step visual checklist showing completion status.
 * Horizontal on desktop, vertical on mobile.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  User,
  ClipboardCheck,
  TestTube,
  PenLine,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export interface CompletionStep {
  id: string;
  label: string;
  shortLabel?: string;
  isComplete: boolean;
  missingItems?: string[];
  icon?: React.ElementType;
}

export interface CertificateCompletionProgressProps {
  steps: CompletionStep[];
  currentStep?: string;
  className?: string;
  onStepClick?: (stepId: string) => void;
}

const defaultSteps: CompletionStep[] = [
  { id: 'details', label: 'Client Details', shortLabel: 'Details', isComplete: false, icon: User },
  { id: 'inspection', label: 'Inspection', shortLabel: 'Inspect', isComplete: false, icon: ClipboardCheck },
  { id: 'testing', label: 'Testing', shortLabel: 'Testing', isComplete: false, icon: TestTube },
  { id: 'signatures', label: 'Signatures', shortLabel: 'Sign', isComplete: false, icon: PenLine },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

export const CertificateCompletionProgress: React.FC<CertificateCompletionProgressProps> = ({
  steps = defaultSteps,
  currentStep,
  className,
  onStepClick,
}) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const [expandedStep, setExpandedStep] = React.useState<string | null>(null);

  const handleStepClick = (step: CompletionStep) => {
    if (step.missingItems && step.missingItems.length > 0) {
      haptics.tap();
      setExpandedStep(expandedStep === step.id ? null : step.id);
    }
    onStepClick?.(step.id);
  };

  const completedCount = steps.filter(s => s.isComplete).length;
  const totalSteps = steps.length;

  // Mobile: Vertical layout
  if (isMobile) {
    return (
      <motion.div
        className={cn('space-y-2', className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Progress summary */}
        <div className="flex items-center justify-between px-1 mb-3">
          <span className="text-sm font-medium text-muted-foreground">
            Progress
          </span>
          <span className="text-sm font-semibold text-foreground">
            {completedCount}/{totalSteps} Complete
          </span>
        </div>

        {steps.map((step, index) => {
          const Icon = step.icon || Circle;
          const isLast = index === steps.length - 1;
          const hasMissing = step.missingItems && step.missingItems.length > 0;

          return (
            <motion.div key={step.id} variants={itemVariants}>
              <Collapsible
                open={expandedStep === step.id}
                onOpenChange={() => handleStepClick(step)}
              >
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl border transition-all touch-manipulation',
                      step.isComplete
                        ? 'bg-green-500/10 border-green-500/30'
                        : hasMissing
                        ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40'
                        : 'bg-card/50 border-border/50 hover:border-border'
                    )}
                  >
                    {/* Status icon */}
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                      step.isComplete
                        ? 'bg-green-500/20'
                        : 'bg-muted/30'
                    )}>
                      {step.isComplete ? (
                        <motion.div variants={checkVariants}>
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                        </motion.div>
                      ) : (
                        <Icon className={cn(
                          'h-5 w-5',
                          hasMissing ? 'text-amber-400' : 'text-muted-foreground'
                        )} />
                      )}
                    </div>

                    {/* Label */}
                    <div className="flex-1 text-left">
                      <span className={cn(
                        'font-medium',
                        step.isComplete ? 'text-green-400' : 'text-foreground'
                      )}>
                        {step.label}
                      </span>
                      {hasMissing && !step.isComplete && (
                        <p className="text-xs text-amber-400 mt-0.5">
                          {step.missingItems!.length} item{step.missingItems!.length > 1 ? 's' : ''} remaining
                        </p>
                      )}
                    </div>

                    {/* Expand indicator */}
                    {hasMissing && !step.isComplete && (
                      <ChevronDown className={cn(
                        'h-4 w-4 text-muted-foreground transition-transform',
                        expandedStep === step.id && 'transform rotate-180'
                      )} />
                    )}
                  </button>
                </CollapsibleTrigger>

                {hasMissing && (
                  <CollapsibleContent className="px-3 pb-2">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20"
                    >
                      <p className="text-xs font-medium text-amber-400 mb-2 flex items-center gap-1.5">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Missing:
                      </p>
                      <ul className="space-y-1">
                        {step.missingItems!.map((item, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-amber-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </CollapsibleContent>
                )}
              </Collapsible>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  // Desktop: Horizontal stepper
  return (
    <motion.div
      className={cn('w-full', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon || Circle;
          const isLast = index === steps.length - 1;
          const hasMissing = step.missingItems && step.missingItems.length > 0;

          return (
            <React.Fragment key={step.id}>
              <motion.button
                variants={itemVariants}
                onClick={() => handleStepClick(step)}
                className={cn(
                  'flex flex-col items-center gap-2 group relative',
                  onStepClick && 'cursor-pointer'
                )}
              >
                {/* Step circle */}
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all',
                  step.isComplete
                    ? 'bg-green-500/20 border-green-500/50 shadow-lg shadow-green-500/20'
                    : hasMissing
                    ? 'bg-amber-500/10 border-amber-500/30 group-hover:border-amber-500/50'
                    : 'bg-card border-border group-hover:border-border/80'
                )}>
                  {step.isComplete ? (
                    <motion.div variants={checkVariants}>
                      <CheckCircle2 className="h-6 w-6 text-green-400" />
                    </motion.div>
                  ) : (
                    <Icon className={cn(
                      'h-5 w-5 transition-colors',
                      hasMissing ? 'text-amber-400' : 'text-muted-foreground group-hover:text-foreground'
                    )} />
                  )}
                </div>

                {/* Label */}
                <span className={cn(
                  'text-xs font-medium transition-colors',
                  step.isComplete
                    ? 'text-green-400'
                    : hasMissing
                    ? 'text-amber-400'
                    : 'text-muted-foreground group-hover:text-foreground'
                )}>
                  {step.shortLabel || step.label}
                </span>

                {/* Tooltip for missing items */}
                {hasMissing && !step.isComplete && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-popover border border-border rounded-lg p-3 shadow-xl min-w-[180px]">
                      <p className="text-xs font-medium text-amber-400 mb-1.5 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Missing:
                      </p>
                      <ul className="space-y-1">
                        {step.missingItems!.slice(0, 3).map((item, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                            {item}
                          </li>
                        ))}
                        {step.missingItems!.length > 3 && (
                          <li className="text-xs text-muted-foreground">
                            +{step.missingItems!.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </motion.button>

              {/* Connector line */}
              {!isLast && (
                <motion.div
                  className="flex-1 h-0.5 mx-2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className={cn(
                    'h-full rounded-full transition-colors',
                    step.isComplete ? 'bg-green-500/50' : 'bg-border'
                  )} />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CertificateCompletionProgress;
