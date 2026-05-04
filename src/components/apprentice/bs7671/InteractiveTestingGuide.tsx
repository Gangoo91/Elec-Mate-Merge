import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BS7671Test } from '@/data/bs7671-testing/allBS7671Tests';
import type { useBS7671Progress } from './hooks/useBS7671Progress';
import StepDiagram from './StepDiagrams';

interface InteractiveTestingGuideProps {
  guide: BS7671Test;
  progress: ReturnType<typeof useBS7671Progress>;
  onComplete: () => void;
  onBack: () => void;
}

const InteractiveTestingGuide = ({
  guide,
  progress,
  onComplete,
  onBack,
}: InteractiveTestingGuideProps) => {
  const savedProgress = progress.getTestProgress(guide.id);
  const [currentStep, setCurrentStep] = useState(savedProgress?.lastStepViewed || 0);
  const [troubleshootingOpen, setTroubleshootingOpen] = useState(false);
  const stepperRef = useRef<HTMLDivElement>(null);

  const completedCount = progress.getCompletedStepCount(guide.id);
  const progressPercent = (completedCount / guide.steps.length) * 100;

  // Save last viewed step on navigation. `progress` is a fresh object every
  // render — depend on the stable callback only to avoid an infinite loop.
  const setLastStepViewed = progress.setLastStepViewed;
  useEffect(() => {
    setLastStepViewed(guide.id, currentStep);
  }, [currentStep, guide.id, setLastStepViewed]);

  // Close troubleshooting when changing steps
  useEffect(() => {
    setTroubleshootingOpen(false);
  }, [currentStep]);

  // Scroll active stepper pill into view
  useEffect(() => {
    if (stepperRef.current) {
      const activePill = stepperRef.current.querySelector('[data-active="true"]');
      if (activePill) {
        activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentStep]);

  const isStepCompleted = progress.isStepComplete(guide.id, currentStep);

  const handleStepComplete = () => {
    progress.markStepComplete(guide.id, currentStep);
    if (currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    progress.markStepComplete(guide.id, currentStep);
    progress.markTestComplete(guide.id);
    onComplete();
  };

  const currentStepData = guide.steps[currentStep];
  const isLastStep = currentStep === guide.steps.length - 1;

  const Section = ({
    eyebrow,
    children,
  }: {
    eyebrow: string;
    children: React.ReactNode;
  }) => (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {eyebrow}
      </span>
      <div className="text-[14px] text-white/85 leading-relaxed">{children}</div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* Header */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to tests
        </Button>

        <div className="space-y-2">
          <div className="flex items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            <span>{guide.difficulty}</span>
            <span className="text-white/25">·</span>
            <span>{guide.duration}</span>
            <span className="text-white/25">·</span>
            <span className="font-mono normal-case tracking-normal">{guide.regulationClause}</span>
          </div>
          <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
            {guide.title}
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">{guide.description}</p>
        </div>
      </div>

      {/* Progress strip */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Progress
          </span>
          <span className="text-[12px] text-white/85 font-mono">
            {completedCount}/{guide.steps.length} · {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div ref={stepperRef} className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {guide.steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = progress.isStepComplete(guide.id, index);

            const pillClasses = isActive
              ? 'bg-elec-yellow text-black font-semibold border-elec-yellow'
              : isCompleted
                ? 'bg-white/[0.04] text-white border-white/10'
                : 'bg-transparent text-white/55 border-white/10';

            return (
              <button
                key={step.id}
                data-active={isActive}
                onClick={() => setCurrentStep(index)}
                className={`flex-shrink-0 h-9 min-w-[36px] px-2.5 rounded-lg border flex items-center justify-center gap-1.5 text-[12px] transition-all touch-manipulation ${pillClasses}`}
              >
                {isCompleted && !isActive ? (
                  <CheckCircle className="h-3.5 w-3.5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Step */}
      <div className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Step {currentStep + 1} of {guide.steps.length}
            </span>
            <h3 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
              {currentStepData.title}
            </h3>
          </div>
          {isStepCompleted && (
            <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          )}
        </div>

        <StepDiagram test={guide} step={currentStepData} />

        {currentStepData.apprenticeTip && (
          <Section eyebrow="Why this matters">{currentStepData.apprenticeTip}</Section>
        )}

        <Section eyebrow="Instructions">
          <p>{currentStepData.instruction}</p>
          {currentStepData.regulationReference && (
            <p className="mt-2 text-[11px] text-white/55 font-mono">
              Ref: {currentStepData.regulationReference}
            </p>
          )}
        </Section>

        <Section eyebrow="Expected result">{currentStepData.expectedResult}</Section>

        {currentStepData.realWorldExample && (
          <Section eyebrow="On site">{currentStepData.realWorldExample}</Section>
        )}

        {currentStepData.safetyWarning && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
              Safety warning
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">
              {currentStepData.safetyWarning}
            </p>
          </div>
        )}

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Equipment
          </span>
          <div className="flex flex-wrap gap-1.5">
            {currentStepData.equipment.map((item, index) => (
              <span
                key={index}
                className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {currentStepData.tips && currentStepData.tips.length > 0 && (
          <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Pro tips
            </span>
            <ul className="space-y-1.5">
              {currentStepData.tips.map((tip, index) => (
                <li
                  key={index}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentStepData.troubleshooting && currentStepData.troubleshooting.length > 0 && (
          <Collapsible open={troubleshootingOpen} onOpenChange={setTroubleshootingOpen}>
            <CollapsibleTrigger asChild>
              <button className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center justify-between text-left touch-manipulation h-auto min-h-[44px]">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Troubleshooting
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-white/55 transition-transform duration-200 ${
                    troubleshootingOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
                <ul className="space-y-2">
                  {currentStepData.troubleshooting.map((item, index) => (
                    <li
                      key={index}
                      className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] disabled:opacity-40 touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto">
            {!isStepCompleted && (
              <Button
                variant="outline"
                onClick={handleStepComplete}
                className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark complete
              </Button>
            )}

            {isLastStep ? (
              <Button
                onClick={handleComplete}
                disabled={!isStepCompleted}
                className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40"
              >
                Complete test
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
              >
                Next step
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Test Overview */}
      <div className="space-y-4 pt-4 border-t border-white/[0.06]">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Test overview
        </span>

        <Section eyebrow="Purpose">{guide.purpose}</Section>

        {guide.testLimits.length > 0 && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Test limits
            </span>
            <div className="space-y-1">
              {guide.testLimits.map((limit, index) => (
                <div
                  key={index}
                  className="flex items-baseline justify-between text-[13px] text-white/85"
                >
                  <span>{limit.parameter}</span>
                  <span className="font-mono text-white">
                    {limit.limit} {limit.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Section eyebrow="Common issues">
          <ul className="space-y-1.5">
            {guide.commonIssues.map((issue, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
};

export default InteractiveTestingGuide;
