import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { HardHat, AlertTriangle, Flame, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { itemVariants } from '@/components/college/primitives';
import { GUIDE_FRAME, GuidePage } from '@/components/apprentice/shared/GuideKit';
import {
  P_SEG_GROUP,
  P_TAB_LINE,
  P_TAB_RAIL,
  pSeg,
  pTab,
} from '@/components/apprentice-hub/portfolio2/ui';
import { cn } from '@/lib/utils';
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
      <GuidePage
        section="Apprentice · Safety scenarios"
        area="On-the-job tools"
        title="Real incidents, real decisions"
        backTo="/apprentice/on-job-tools"
        description="Step through anonymised real-world electrical incidents. Make the call, see the consequence, learn the pattern. Better here than on site."
      >
        {/* Progress strip */}
        <div className={cn(GUIDE_FRAME, 'flex items-center gap-4 px-4 py-3.5 sm:px-5')}>
          <div className="flex items-center gap-1.5">
            <Target className="h-4 w-4 text-white" strokeWidth={1.5} />
            <span className="text-white text-sm font-medium">
              {completedCount}/{totalCount}
            </span>
          </div>
          {currentStreak > 0 && (
            <div className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-orange-400" strokeWidth={1.5} />
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
            {/* Difficulty — a choice of four: one joined toggle */}
            <div className={P_SEG_GROUP} role="group" aria-label="Difficulty">
              {difficultyOptions.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficultyFilter(d)}
                  aria-pressed={difficultyFilter === d}
                  className={cn(pSeg(difficultyFilter === d), 'max-sm:px-1.5 max-sm:text-[12.5px]')}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Category — quiet text tabs */}
            <div className={P_TAB_RAIL} role="tablist" aria-label="Category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={categoryFilter === c}
                  onClick={() => setCategoryFilter(c)}
                  className={pTab(categoryFilter === c)}
                >
                  {c}
                  {categoryFilter === c && <span className={P_TAB_LINE} aria-hidden />}
                </button>
              ))}
            </div>

            {/* Scenario grid */}
            <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
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
            <Card className="border-red-500/30 bg-red-500/5 max-sm:-mx-4 max-sm:rounded-none max-sm:border-x-0">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white text-[14px] leading-relaxed">
                    These scenarios are based on real incidents in the UK electrical industry.
                    Always follow proper safety procedures and consult with qualified professionals
                    when uncertain.
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </GuidePage>
    </SafetyCasesErrorBoundary>
  );
};

export default OnJobSafetyCases;
