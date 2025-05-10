
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import ScenarioCard from "@/components/apprentice/safety-cases/ScenarioCard";
import ScenarioDetail from "@/components/apprentice/safety-cases/ScenarioDetail";
import LearningOutcomes from "@/components/apprentice/safety-cases/LearningOutcomes";
import AboutCard from "@/components/apprentice/safety-cases/AboutCard";
import ProgressCard from "@/components/apprentice/safety-cases/ProgressCard";
import { useScenarios } from "@/components/apprentice/safety-cases/useScenarios";

const OnJobSafetyCases = () => {
  const {
    scenarios,
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

  return (
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
  );
};

export default OnJobSafetyCases;
