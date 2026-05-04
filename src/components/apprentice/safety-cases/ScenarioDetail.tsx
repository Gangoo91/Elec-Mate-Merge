import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  Send,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import ScenarioOption from './ScenarioOption';
import { SafetyScenario } from './safetyScenarios';

interface StepResult {
  stepId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

interface ScenarioDetailProps {
  scenario: SafetyScenario;
  currentStepIndex: number;
  selectedOption: string | null;
  showFeedback: boolean;
  stepResults: StepResult[];
  isComplete: boolean;
  onSelectOption: (optionId: string) => void;
  onSubmitStep: () => void;
  onAdvanceStep: () => void;
  onExit: () => void;
  onNextScenario: () => void;
}

const ScenarioDetail: React.FC<ScenarioDetailProps> = ({
  scenario,
  currentStepIndex,
  selectedOption,
  showFeedback,
  stepResults,
  isComplete,
  onSelectOption,
  onSubmitStep,
  onAdvanceStep,
  onExit,
  onNextScenario,
}) => {
  const step = scenario.steps[currentStepIndex];
  const totalSteps = scenario.steps.length;
  const stepsCorrect = stepResults.filter((r) => r.isCorrect).length;
  const score = totalSteps > 0 ? Math.round((stepsCorrect / totalSteps) * 100) : 0;

  // Completion panel
  if (isComplete) {
    const headline =
      score >= 80 ? 'Excellent work' : score >= 50 ? 'Good effort' : 'Keep practising';

    return (
      <div className="space-y-6 animate-fade-in text-left">
        <Button
          variant="ghost"
          onClick={onExit}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to scenarios
        </Button>

        {/* Score card */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Result
            </span>
            <span className="text-[12px] text-white/85 font-mono">
              {stepsCorrect}/{totalSteps} · {score}%
            </span>
          </div>

          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>

          <p className="text-[16px] sm:text-[18px] font-medium text-white">{headline}</p>
        </div>

        {/* Step-by-step review */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Step review
          </span>

          <ul className="space-y-2">
            {stepResults.map((result, idx) => {
              const s = scenario.steps[idx];
              const correctOption = s.options.find((o) => o.isCorrect);
              return (
                <li key={result.stepId} className="flex items-start gap-2">
                  {result.isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="h-4 w-4 text-white/55 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="text-[14px] text-white/85 leading-relaxed">
                      Step {idx + 1}: {s.question}
                    </p>
                    {!result.isCorrect && correctOption && (
                      <p className="text-[12px] text-white/55 mt-0.5">
                        Correct answer: {correctOption.text}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Real incident */}
        {scenario.realCase && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Real incident
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">{scenario.realCase.summary}</p>
            {scenario.realCase.fineAmount && (
              <p className="text-[12px] text-white/55">Fine: {scenario.realCase.fineAmount}</p>
            )}
            <p className="text-[14px] text-white/85 leading-relaxed">
              {scenario.realCase.consequence}
            </p>
          </div>
        )}

        {/* Key regulation */}
        {scenario.steps[0]?.options.find((o) => o.isCorrect)?.regulation && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Key regulation
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">
              {scenario.steps[0]?.options.find((o) => o.isCorrect)?.regulation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            variant="outline"
            onClick={onExit}
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            All scenarios
          </Button>
          <Button
            onClick={onNextScenario}
            className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] sm:ml-auto"
          >
            Next scenario
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Active step view
  return (
    <div className="space-y-6 animate-fade-in text-left">
      <Button
        variant="ghost"
        onClick={onExit}
        className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to scenarios
      </Button>

      {/* Step progress */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
          <span className="text-[12px] text-white/85 font-mono">
            {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className="flex gap-1.5">
          {scenario.steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all ${
                idx < currentStepIndex
                  ? 'bg-elec-yellow'
                  : idx === currentStepIndex
                    ? 'bg-elec-yellow'
                    : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Briefing (first step only) */}
      {currentStepIndex === 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            {scenario.location}
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">{scenario.briefing}</p>
        </div>
      )}

      {/* Current situation */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Situation
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">{step.situation}</p>
      </div>

      {/* Question */}
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Question
        </span>
        <p className="text-[16px] sm:text-[18px] font-medium text-white leading-snug">
          {step.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {step.options.map((option) => (
          <ScenarioOption
            key={option.id}
            optionId={option.id}
            text={option.text}
            isSelected={selectedOption === option.id}
            isCorrect={option.isCorrect}
            feedback={option.feedback}
            outcome={option.outcome}
            regulation={option.regulation}
            showFeedback={showFeedback}
            onClick={() => onSelectOption(option.id)}
          />
        ))}
      </div>

      {/* Submit / Continue */}
      {!showFeedback ? (
        <Button
          onClick={onSubmitStep}
          disabled={!selectedOption}
          className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold disabled:opacity-40 touch-manipulation active:scale-[0.98]"
        >
          <Send className="h-4 w-4 mr-2" />
          Submit answer
        </Button>
      ) : (
        <Button
          onClick={onAdvanceStep}
          className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
        >
          {currentStepIndex < totalSteps - 1 ? (
            <>
              Continue to step {currentStepIndex + 2}
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              See results
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default ScenarioDetail;
