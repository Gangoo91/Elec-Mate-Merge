import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, HardHat, AlertTriangle, Flame, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import ScenarioCard from '@/components/apprentice/safety-cases/ScenarioCard';
import ScenarioDetail from '@/components/apprentice/safety-cases/ScenarioDetail';
import QuickReferenceSection from '@/components/apprentice/safety-cases/QuickReferenceSection';
import SafetyCasesErrorBoundary from '@/components/apprentice/safety-cases/SafetyCasesErrorBoundary';
import { useScenarios, DifficultyFilter } from '@/components/apprentice/safety-cases/useScenarios';

const difficultyOptions: DifficultyFilter[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const OnJobSafetyCases = () => {
  const navigate = useNavigate();
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
      <PageFrame className="px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants}>
          <Button
            variant="ghost"
            onClick={() => navigate('/apprentice/on-job-tools')}
            className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Apprentice · Safety scenarios"
            title="Real incidents, real decisions"
            description="Step through anonymised real-world electrical incidents. Make the call, see the consequence, learn the pattern. Better here than on site."
            tone="yellow"
          />
        </motion.div>

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
                <span className="text-white text-sm">{currentStreak}-day streak</span>
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
            <span className="text-white text-sm font-medium">{completionPercentage}%</span>
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
                      touch-manipulation active:scale-95 transition-all min-h-[44px]
                      ${
                        difficultyFilter === d
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/10 text-white border border-white/10'
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
                      touch-manipulation active:scale-95 transition-all min-h-[44px]
                      ${
                        categoryFilter === c
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'bg-white/5 text-white border border-white/10'
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
                    <p className="text-white text-sm">No scenarios match these filters.</p>
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
                      These scenarios are based on real incidents in the UK electrical industry.
                      Always follow proper safety procedures and consult with qualified
                      professionals when uncertain.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
      </PageFrame>
    </SafetyCasesErrorBoundary>
  );
};

export default OnJobSafetyCases;
