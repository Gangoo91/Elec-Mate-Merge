
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

import SafetyCasesErrorBoundary from "@/components/apprentice/safety-cases/SafetyCasesErrorBoundary";
import SafetyCasesLoading from "@/components/apprentice/safety-cases/SafetyCasesLoading";
import ScenarioCard from "@/components/apprentice/safety-cases/ScenarioCard";
import ScenarioDetail from "@/components/apprentice/safety-cases/ScenarioDetail";
import LearningOutcomes from "@/components/apprentice/safety-cases/LearningOutcomes";
import AboutCard from "@/components/apprentice/safety-cases/AboutCard";
import ProgressCard from "@/components/apprentice/safety-cases/ProgressCard";
import { useScenarios } from "@/components/apprentice/safety-cases/useScenarios";

const OnJobSafetyCases = () => {
  console.log('OnJobSafetyCases - Component rendering');
  
  const {
    scenarios,
    isLoading,
    error,
    selectedScenario,
    selectedOption,
    showFeedback,
    completedScenarios,
    isLastScenario,
    handleSelectScenario,
    handleOptionSelect,
    handleSubmitAnswer,
    handleReset,
    handleNextScenario
  } = useScenarios();

  console.log('OnJobSafetyCases - Hook state:', {
    isLoading,
    error,
    scenariosCount: scenarios?.length || 0,
    selectedScenarioId: selectedScenario?.id,
    completedCount: completedScenarios?.length || 0
  });

  // Show loading state
  if (isLoading) {
    console.log('OnJobSafetyCases - Showing loading state');
    return (
      <SafetyCasesErrorBoundary pageName="OnJobSafetyCases">
        <SafetyCasesLoading message="Loading interactive safety cases..." />
      </SafetyCasesErrorBoundary>
    );
  }

  // Show error state
  if (error) {
    console.error('OnJobSafetyCases - Showing error state:', error);
    return (
      <SafetyCasesErrorBoundary pageName="OnJobSafetyCases">
        <div className="min-h-screen bg-elec-dark p-6 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="text-xl font-semibold text-red-400">Error Loading Safety Cases</h2>
            <p className="text-elec-light/80">{error}</p>
            <Link to="/apprentice/on-job-tools">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tools
              </Button>
            </Link>
          </div>
        </div>
      </SafetyCasesErrorBoundary>
    );
  }

  // Show empty state if no scenarios
  if (!scenarios || scenarios.length === 0) {
    console.warn('OnJobSafetyCases - No scenarios available');
    return (
      <SafetyCasesErrorBoundary pageName="OnJobSafetyCases">
        <div className="min-h-screen bg-elec-dark p-6 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-xl font-semibold text-elec-yellow">No Safety Cases Available</h2>
            <p className="text-elec-light/80">Safety case scenarios are currently unavailable.</p>
            <Link to="/apprentice/on-job-tools">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tools
              </Button>
            </Link>
          </div>
        </div>
      </SafetyCasesErrorBoundary>
    );
  }

  console.log('OnJobSafetyCases - Rendering main content');

  return (
    <SafetyCasesErrorBoundary pageName="OnJobSafetyCases">
      <div className="space-y-6 animate-fade-in pb-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Interactive Safety Case Studies</h1>
            <p className="text-muted-foreground">Learn from real-world scenarios with decision-based learning</p>
          </div>
          <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Button>
          </Link>
        </div>

        {!selectedScenario ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map(scenario => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                onClick={() => handleSelectScenario(scenario)}
              />
            ))}
          </div>
        ) : (
          <ScenarioDetail
            scenario={selectedScenario}
            selectedOption={selectedOption}
            showFeedback={showFeedback}
            onOptionSelect={handleOptionSelect}
            onSubmitAnswer={handleSubmitAnswer}
            onReset={handleReset}
            onNextScenario={handleNextScenario}
            isLastScenario={isLastScenario}
          />
        )}

        {!selectedScenario && (
          <>
            <LearningOutcomes />
            <AboutCard />
            <ProgressCard 
              completedCount={completedScenarios.length} 
              totalScenarios={scenarios.length} 
            />
          </>
        )}
      </div>
    </SafetyCasesErrorBoundary>
  );
};

export default OnJobSafetyCases;
