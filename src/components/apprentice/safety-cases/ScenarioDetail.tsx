import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  CheckCircle,
  MapPin,
  AlertTriangle,
  BookOpen,
  Trophy,
  XCircle,
  Shield,
} from "lucide-react";
import ScenarioOption from "./ScenarioOption";
import { SafetyScenario } from "./safetyScenarios";

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
  const score =
    totalSteps > 0 ? Math.round((stepsCorrect / totalSteps) * 100) : 0;

  // Completion panel
  if (isComplete) {
    return (
      <div className="space-y-4 animate-fade-in">
        {/* Back */}
        <button
          onClick={onExit}
          className="flex items-center gap-2 text-white text-sm touch-manipulation active:opacity-70 h-11"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to scenarios
        </button>

        {/* Score card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl ${
                score >= 80
                  ? "bg-green-500/15 border border-green-500/30"
                  : score >= 50
                    ? "bg-elec-yellow/15 border border-elec-yellow/30"
                    : "bg-red-500/15 border border-red-500/30"
              }`}
            >
              <Trophy
                className={`h-6 w-6 ${
                  score >= 80
                    ? "text-green-400"
                    : score >= 50
                      ? "text-elec-yellow"
                      : "text-red-400"
                }`}
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {score >= 80
                  ? "Excellent work!"
                  : score >= 50
                    ? "Good effort"
                    : "Keep practising"}
              </h2>
              <p className="text-white text-sm">
                {stepsCorrect} of {totalSteps} steps correct
              </p>
            </div>
            <span
              className={`ml-auto text-3xl font-bold ${
                score >= 80
                  ? "text-green-400"
                  : score >= 50
                    ? "text-elec-yellow"
                    : "text-red-400"
              }`}
            >
              {score}%
            </span>
          </div>

          {/* Score bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                score >= 80
                  ? "bg-green-500"
                  : score >= 50
                    ? "bg-elec-yellow"
                    : "bg-red-500"
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Step-by-step review */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white text-sm flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-400" />
            Step Review
          </h3>
          {stepResults.map((result, idx) => {
            const s = scenario.steps[idx];
            const correctOption = s.options.find((o) => o.isCorrect);
            return (
              <div
                key={result.stepId}
                className={`p-3 rounded-xl bg-white/5 border-l-4 ${
                  result.isCorrect
                    ? "border-l-green-500"
                    : "border-l-red-500"
                } border border-white/10`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`mt-0.5 p-1 rounded-md flex-shrink-0 ${
                      result.isCorrect ? "bg-green-500/20" : "bg-red-500/20"
                    }`}
                  >
                    {result.isCorrect ? (
                      <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium leading-snug">
                      Step {idx + 1}: {s.question}
                    </p>
                    {result.isCorrect ? (
                      <p className="text-white text-xs mt-1">
                        Answered correctly
                      </p>
                    ) : (
                      <p className="text-white text-xs mt-1">
                        Correct answer: {correctOption?.text}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real incident */}
        {scenario.realCase && (
          <div className="p-4 rounded-xl bg-white/5 border-l-4 border-l-amber-500 border border-white/10 space-y-3">
            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Real Incident
            </h3>
            <p className="text-white text-sm leading-relaxed">
              {scenario.realCase.summary}
            </p>
            {scenario.realCase.fineAmount && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white bg-white/10 px-2 py-1 rounded">
                  Fine
                </span>
                <span className="text-white text-sm font-semibold">
                  {scenario.realCase.fineAmount}
                </span>
              </div>
            )}
            <p className="text-white text-sm leading-relaxed">
              {scenario.realCase.consequence}
            </p>
          </div>
        )}

        {/* Key regulation */}
        {scenario.steps[0]?.options.find((o) => o.isCorrect)?.regulation && (
          <div className="p-4 rounded-xl bg-white/5 border-l-4 border-l-blue-500 border border-white/10 space-y-2">
            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              Key Regulation
            </h3>
            <p className="text-white text-sm leading-relaxed">
              {
                scenario.steps[0]?.options.find((o) => o.isCorrect)
                  ?.regulation
              }
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Button
            onClick={onExit}
            variant="outline"
            className="flex-1 h-11 border-white/20 hover:bg-white/10 text-white touch-manipulation active:scale-95"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Scenarios
          </Button>
          <Button
            onClick={onNextScenario}
            className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95"
          >
            Next Scenario
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Active step view
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Back */}
      <button
        onClick={onExit}
        className="flex items-center gap-2 text-white text-sm touch-manipulation active:opacity-70 h-11"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to scenarios
      </button>

      {/* Step progress */}
      <div className="flex items-center gap-2">
        <span className="text-white text-sm font-medium">
          Step {currentStepIndex + 1} of {totalSteps}
        </span>
        <div className="flex-1 flex gap-1">
          {scenario.steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                idx < currentStepIndex
                  ? "bg-green-500"
                  : idx === currentStepIndex
                    ? "bg-elec-yellow"
                    : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Briefing (first step only) */}
      {currentStepIndex === 0 && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-elec-yellow" />
            <span className="text-white text-sm font-medium">
              {scenario.location}
            </span>
          </div>
          <p className="text-white text-sm leading-relaxed">
            {scenario.briefing}
          </p>
        </div>
      )}

      {/* Current situation */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-white text-sm leading-relaxed">{step.situation}</p>
      </div>

      {/* Question */}
      <div className="p-4 rounded-xl bg-white/10 border border-elec-yellow/30">
        <p className="font-medium text-white">{step.question}</p>
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
          className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold disabled:opacity-30 touch-manipulation active:scale-95 transition-all"
        >
          <Send className="h-4 w-4 mr-2" />
          Submit answer
        </Button>
      ) : (
        <Button
          onClick={onAdvanceStep}
          className="w-full h-11 bg-green-500 hover:bg-green-500/90 text-white font-semibold touch-manipulation active:scale-95 transition-all"
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
