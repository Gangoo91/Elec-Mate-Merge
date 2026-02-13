import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Wrench,
  BookOpen,
  Clock,
  Shield,
  ChevronDown,
  HardHat,
  Flame,
  SearchX,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BS7671Test } from "@/data/bs7671-testing/allBS7671Tests";
import type { useBS7671Progress } from "./hooks/useBS7671Progress";

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

  // Save last viewed step on navigation
  useEffect(() => {
    progress.setLastStepViewed(guide.id, currentStep);
  }, [currentStep, guide.id, progress]);

  // Close troubleshooting when changing steps
  useEffect(() => {
    setTroubleshootingOpen(false);
  }, [currentStep]);

  // Scroll active stepper pill into view
  useEffect(() => {
    if (stepperRef.current) {
      const activePill = stepperRef.current.querySelector('[data-active="true"]');
      if (activePill) {
        activePill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
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

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return {
          bg: "bg-green-500/10",
          text: "text-green-400",
          border: "border-green-500/30",
        };
      case "Intermediate":
        return {
          bg: "bg-elec-yellow/10",
          text: "text-elec-yellow",
          border: "border-elec-yellow/30",
        };
      case "Advanced":
        return {
          bg: "bg-red-500/10",
          text: "text-red-400",
          border: "border-red-500/30",
        };
      default:
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-400",
          border: "border-blue-500/30",
        };
    }
  };

  const currentStepData = guide.steps[currentStep];
  const isLastStep = currentStep === guide.steps.length - 1;
  const difficultyConfig = getDifficultyConfig(guide.difficulty);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-cyan-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/30 h-11 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tests
            </Button>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={`${difficultyConfig.bg} ${difficultyConfig.text} border ${difficultyConfig.border}`}
              >
                {guide.difficulty}
              </Badge>
              <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30">
                <Clock className="h-3 w-3 mr-1" />
                {guide.duration}
              </Badge>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <CardTitle className="text-white text-xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30">
                <BookOpen className="h-5 w-5 text-cyan-400" />
              </div>
              {guide.title}
            </CardTitle>
            <p className="text-white">{guide.description}</p>
            <span className="text-sm text-cyan-400 font-mono">
              {guide.regulationClause}
            </span>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="p-4 rounded-xl bg-white/10 border border-white/10">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-white">Progress</span>
              <span className="text-cyan-400 font-medium">
                {completedCount} of {guide.steps.length} steps
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm mt-3">
              <span className="text-white">
                Step {currentStep + 1} of {guide.steps.length}
              </span>
              <span className="text-green-400 font-medium">
                {Math.round(progressPercent)}% Complete
              </span>
            </div>
          </div>

          {/* Step Stepper Pills */}
          <div
            ref={stepperRef}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
          >
            {guide.steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = progress.isStepComplete(guide.id, index);

              let pillClasses = "";
              if (isActive) {
                pillClasses = "bg-elec-yellow text-black font-bold border-elec-yellow";
              } else if (isCompleted) {
                pillClasses = "bg-green-500/20 text-green-400 border-green-500/30";
              } else {
                pillClasses = "bg-white/10 text-white border-white/10";
              }

              return (
                <button
                  key={step.id}
                  data-active={isActive}
                  onClick={() => setCurrentStep(index)}
                  className={`flex-shrink-0 h-11 min-w-[44px] px-3 rounded-xl border flex items-center justify-center gap-1.5 text-sm transition-all touch-manipulation ${pillClasses}`}
                >
                  {isCompleted && !isActive ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Step */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-elec-yellow to-elec-yellow/80 text-black flex items-center justify-center text-lg font-bold">
                {currentStep + 1}
              </div>
              {currentStepData.title}
            </CardTitle>
            {isStepCompleted && (
              <div className="p-2 rounded-lg bg-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          {/* Why This Matters — Apprentice Tip */}
          {currentStepData.apprenticeTip && (
            <div className="p-4 rounded-xl bg-cyan-500/10 border-l-4 border-cyan-500">
              <h4 className="font-medium text-cyan-400 mb-2 flex items-center gap-2 text-sm">
                <HardHat className="h-4 w-4" />
                Why This Matters
              </h4>
              <p className="text-white">{currentStepData.apprenticeTip}</p>
            </div>
          )}

          {/* Step Instruction */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <h4 className="font-medium text-blue-400 mb-2 flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4" />
              Instructions
            </h4>
            <p className="text-white">{currentStepData.instruction}</p>
            {currentStepData.regulationReference && (
              <div className="mt-3 text-xs text-blue-400 font-mono px-2 py-1 rounded bg-blue-500/10 inline-block">
                Reference: {currentStepData.regulationReference}
              </div>
            )}
          </div>

          {/* Expected Result */}
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <h4 className="font-medium text-green-400 mb-2 flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4" />
              Expected Result
            </h4>
            <p className="text-white">{currentStepData.expectedResult}</p>
          </div>

          {/* On Site — Real World Example */}
          {currentStepData.realWorldExample && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <h4 className="font-medium text-amber-400 mb-2 flex items-center gap-2 text-sm">
                <Flame className="h-4 w-4" />
                On Site
              </h4>
              <p className="text-white">{currentStepData.realWorldExample}</p>
            </div>
          )}

          {/* Safety Warning */}
          {currentStepData.safetyWarning && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <h4 className="font-medium text-red-400 mb-2 flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4" />
                Safety Warning
              </h4>
              <p className="text-white">{currentStepData.safetyWarning}</p>
            </div>
          )}

          {/* Equipment Required */}
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <h4 className="font-medium text-purple-400 mb-3 flex items-center gap-2 text-sm">
              <Wrench className="h-4 w-4" />
              Equipment Required
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentStepData.equipment.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-purple-500/10 text-purple-300 border border-purple-500/30"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tips */}
          {currentStepData.tips && currentStepData.tips.length > 0 && (
            <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2 text-sm">
                <Lightbulb className="h-4 w-4" />
                Pro Tips
              </h4>
              <ul className="space-y-2">
                {currentStepData.tips.map((tip, index) => (
                  <li
                    key={index}
                    className="text-sm text-white flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Troubleshooting — Collapsible */}
          {currentStepData.troubleshooting && currentStepData.troubleshooting.length > 0 && (
            <Collapsible open={troubleshootingOpen} onOpenChange={setTroubleshootingOpen}>
              <CollapsibleTrigger asChild>
                <button className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between text-left touch-manipulation h-auto min-h-[44px]">
                  <div className="flex items-center gap-2 text-sm font-medium text-red-400">
                    <SearchX className="h-4 w-4" />
                    Troubleshooting
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-red-400 transition-transform duration-200 ${
                      troubleshootingOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <ul className="space-y-3">
                    {currentStepData.troubleshooting.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-white flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-white/10">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="h-11 border-white/20 text-white hover:bg-white/10 disabled:opacity-50 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex flex-col sm:flex-row gap-2">
              {!isStepCompleted && (
                <Button
                  onClick={handleStepComplete}
                  className="h-11 bg-green-600 hover:bg-green-500 text-white touch-manipulation active:scale-95 transition-all"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}

              {isLastStep ? (
                <Button
                  onClick={handleComplete}
                  disabled={!isStepCompleted}
                  className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95 transition-all disabled:opacity-50"
                >
                  Complete Test
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95 transition-all"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Overview */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <BookOpen className="h-5 w-5 text-blue-400" />
            </div>
            Test Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <h4 className="font-medium text-blue-400 mb-2 text-sm">Purpose</h4>
            <p className="text-sm text-white">{guide.purpose}</p>
          </div>

          {guide.testLimits.length > 0 && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <h4 className="font-medium text-green-400 mb-3 text-sm">
                Test Limits
              </h4>
              <div className="space-y-2">
                {guide.testLimits.map((limit, index) => (
                  <div
                    key={index}
                    className="text-sm text-white flex justify-between items-center p-2 rounded-lg bg-white/10"
                  >
                    <span>{limit.parameter}:</span>
                    <span className="font-mono text-green-300">
                      {limit.limit} {limit.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <h4 className="font-medium text-orange-400 mb-3 text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Common Issues
            </h4>
            <ul className="space-y-2">
              {guide.commonIssues.map((issue, index) => (
                <li
                  key={index}
                  className="text-sm text-white flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveTestingGuide;
