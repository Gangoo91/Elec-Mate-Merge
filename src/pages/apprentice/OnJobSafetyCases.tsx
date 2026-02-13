import React from "react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { HardHat, AlertTriangle, Flame, Target } from "lucide-react";
import ScenarioCard from "@/components/apprentice/safety-cases/ScenarioCard";
import ScenarioDetail from "@/components/apprentice/safety-cases/ScenarioDetail";
import QuickReferenceSection from "@/components/apprentice/safety-cases/QuickReferenceSection";
import SafetyCasesErrorBoundary from "@/components/apprentice/safety-cases/SafetyCasesErrorBoundary";
import {
  useScenarios,
  DifficultyFilter,
} from "@/components/apprentice/safety-cases/useScenarios";

const difficultyOptions: DifficultyFilter[] = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

const OnJobSafetyCases = () => {
  const {
    scenarios,
    categories,
    totalCount,
    completedCount,
    completionPercentage,
    currentStreak,
    selectedScenario,
    currentStepIndex,
    selectedOption,
    showFeedback,
    stepResults,
    isComplete,
    difficultyFilter,
    categoryFilter,
    setDifficultyFilter,
    setCategoryFilter,
    startScenario,
    selectOption,
    submitStep,
    advanceStep,
    exitScenario,
    nextScenario,
    isScenarioCompleted,
  } = useScenarios();

  return (
    <SafetyCasesErrorBoundary pageName="Safety Scenarios">
      <div className="bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
                <HardHat className="h-5 w-5 text-red-400" />
              </div>
              <h1 className="text-xl font-bold text-white">
                Safety Scenarios
              </h1>
            </div>
            <SmartBackButton />
          </div>

          {/* Progress strip */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-elec-yellow" />
              <span className="text-white text-sm font-medium">
                {completedCount}/{totalCount}
              </span>
            </div>
            {currentStreak > 0 && (
              <div className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-400" />
                <span className="text-white text-sm">
                  {currentStreak}-day streak
                </span>
              </div>
            )}
            <div className="flex-1">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
            <span className="text-white text-sm font-medium">
              {completionPercentage}%
            </span>
          </div>

          {/* Active scenario detail */}
          {selectedScenario ? (
            <ScenarioDetail
              scenario={selectedScenario}
              currentStepIndex={currentStepIndex}
              selectedOption={selectedOption}
              showFeedback={showFeedback}
              stepResults={stepResults}
              isComplete={isComplete}
              onSelectOption={selectOption}
              onSubmitStep={submitStep}
              onAdvanceStep={advanceStep}
              onExit={exitScenario}
              onNextScenario={nextScenario}
            />
          ) : (
            <>
              {/* Filter chips — difficulty */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {difficultyOptions.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficultyFilter(d)}
                    className={`
                      flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium
                      touch-manipulation active:scale-95 transition-all min-h-[36px]
                      ${
                        difficultyFilter === d
                          ? "bg-elec-yellow text-black"
                          : "bg-white/10 text-white border border-white/10"
                      }
                    `}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Filter chips — category */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    className={`
                      flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium
                      touch-manipulation active:scale-95 transition-all min-h-[32px]
                      ${
                        categoryFilter === c
                          ? "bg-white/20 text-white border border-white/30"
                          : "bg-white/5 text-white border border-white/10"
                      }
                    `}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Scenario grid */}
              <div className="space-y-3">
                {scenarios.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-white text-sm">
                      No scenarios match these filters.
                    </p>
                  </div>
                ) : (
                  scenarios.map((scenario) => (
                    <ScenarioCard
                      key={scenario.id}
                      scenario={scenario}
                      onClick={() => startScenario(scenario)}
                      isCompleted={isScenarioCompleted(scenario.id)}
                    />
                  ))
                )}
              </div>

              {/* Quick reference */}
              <QuickReferenceSection />

              {/* Safety disclaimer */}
              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-white text-xs leading-relaxed">
                      These scenarios are based on real incidents in the UK
                      electrical industry. Always follow proper safety procedures
                      and consult with qualified professionals when uncertain.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </SafetyCasesErrorBoundary>
  );
};

export default OnJobSafetyCases;
