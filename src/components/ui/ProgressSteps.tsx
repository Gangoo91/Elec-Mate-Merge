import React from 'react';
import { cn } from '@/lib/utils';
import { Check, LucideIcon } from 'lucide-react';

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

interface ProgressStepsProps {
  /** Array of step definitions */
  steps: Step[];
  /** Current active step (0-indexed) */
  currentStep: number;
  /** Completed steps */
  completedSteps?: Set<number>;
  /** Click handler for step navigation */
  onStepClick?: (stepIndex: number) => void;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Additional class names */
  className?: string;
  /** Compact mode for mobile */
  compact?: boolean;
}

/**
 * Progress steps indicator for multi-step forms
 * Shows current position and completion status
 */
export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  completedSteps = new Set(),
  onStepClick,
  orientation = 'horizontal',
  className = '',
  compact = false,
}) => {
  if (compact) {
    return (
      <CompactProgressSteps
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={onStepClick}
        className={className}
      />
    );
  }

  if (orientation === 'vertical') {
    return (
      <VerticalSteps
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={onStepClick}
        className={className}
      />
    );
  }

  return (
    <HorizontalSteps
      steps={steps}
      currentStep={currentStep}
      completedSteps={completedSteps}
      onStepClick={onStepClick}
      className={className}
    />
  );
};

/**
 * Horizontal step indicator
 */
const HorizontalSteps: React.FC<Omit<ProgressStepsProps, 'orientation' | 'compact'>> = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  className,
}) => (
  <div className={cn('w-full', className)}>
    {/* Progress bar */}
    <div className="relative">
      {/* Background line */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted" />
      {/* Active line */}
      <div
        className="absolute top-4 left-0 h-0.5 bg-elec-yellow transition-all duration-300"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      />

      {/* Step indicators */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps?.has(index) || index < currentStep;
          const isCurrent = index === currentStep;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={cn(
                'flex flex-col items-center',
                onStepClick && 'cursor-pointer'
              )}
              onClick={() => onStepClick?.(index)}
            >
              {/* Circle */}
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 z-10',
                  isCompleted && 'bg-elec-yellow text-black',
                  isCurrent && !isCompleted && 'bg-elec-yellow text-black ring-4 ring-elec-yellow/20',
                  !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : Icon ? (
                  <Icon className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'mt-2 text-xs font-medium text-center max-w-[80px]',
                  isCurrent ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

/**
 * Vertical step indicator for sidebars
 */
const VerticalSteps: React.FC<Omit<ProgressStepsProps, 'orientation' | 'compact'>> = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  className,
}) => (
  <div className={cn('space-y-4', className)}>
    {steps.map((step, index) => {
      const isCompleted = completedSteps?.has(index) || index < currentStep;
      const isCurrent = index === currentStep;
      const isLast = index === steps.length - 1;
      const Icon = step.icon;

      return (
        <div
          key={step.id}
          className={cn(
            'flex gap-3',
            onStepClick && 'cursor-pointer'
          )}
          onClick={() => onStepClick?.(index)}
        >
          {/* Circle and line */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200',
                isCompleted && 'bg-elec-yellow text-black',
                isCurrent && !isCompleted && 'bg-elec-yellow text-black ring-4 ring-elec-yellow/20',
                !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
              )}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : Icon ? (
                <Icon className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            {!isLast && (
              <div
                className={cn(
                  'w-0.5 flex-1 my-1 transition-colors duration-200',
                  index < currentStep ? 'bg-elec-yellow' : 'bg-muted'
                )}
              />
            )}
          </div>

          {/* Content */}
          <div className="pb-4">
            <span
              className={cn(
                'text-sm font-medium',
                isCurrent ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {step.label}
            </span>
            {step.description && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {step.description}
              </p>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

/**
 * Compact progress indicator for mobile
 * Shows tappable step dots with current step label
 */
const CompactProgressSteps: React.FC<{
  steps: Step[];
  currentStep: number;
  completedSteps?: Set<number>;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}> = ({ steps, currentStep, completedSteps, onStepClick, className }) => {
  const currentStepData = steps[currentStep];

  return (
    <div className={cn('space-y-2', className)}>
      {/* Current step label and position */}
      <div className="flex items-center justify-between text-sm px-1">
        <span className="font-medium text-foreground">
          {currentStepData?.label}
        </span>
        <span className="text-muted-foreground text-xs">
          {currentStep + 1}/{steps.length}
        </span>
      </div>

      {/* Tappable step indicators */}
      <div className="flex items-center gap-1.5">
        {steps.map((step, index) => {
          const isCompleted = completedSteps?.has(index) || index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick?.(index)}
              disabled={!onStepClick}
              className={cn(
                'flex-1 h-2 rounded-full transition-all duration-200 touch-manipulation',
                isCurrent && 'bg-elec-yellow',
                isCompleted && !isCurrent && 'bg-elec-yellow/60',
                !isCompleted && !isCurrent && 'bg-muted',
                onStepClick && 'active:scale-95 cursor-pointer',
                !onStepClick && 'cursor-default'
              )}
              aria-label={`${step.label} - Step ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

/**
 * Minimal dot indicators for carousel-style wizards
 */
export const StepDots: React.FC<{
  totalSteps: number;
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}> = ({ totalSteps, currentStep, onStepClick, className }) => (
  <div className={cn('flex items-center justify-center gap-2', className)}>
    {Array.from({ length: totalSteps }, (_, i) => (
      <button
        key={i}
        onClick={() => onStepClick?.(i)}
        disabled={!onStepClick}
        className={cn(
          'w-2 h-2 rounded-full transition-all duration-200',
          i === currentStep
            ? 'bg-elec-yellow w-6'
            : 'bg-muted hover:bg-muted-foreground/50',
          !onStepClick && 'cursor-default'
        )}
        aria-label={`Step ${i + 1}`}
      />
    ))}
  </div>
);

export default ProgressSteps;
