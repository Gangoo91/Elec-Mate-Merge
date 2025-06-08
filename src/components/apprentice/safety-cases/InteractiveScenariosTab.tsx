
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, AlertTriangle } from "lucide-react";
import { useState } from "react";
import ScenarioCard from "./ScenarioCard";
import ScenarioDetail from "./ScenarioDetail";
import ProgressCard from "./ProgressCard";
import { useScenarios } from "./useScenarios";
import SafetyCasesLoading from "./SafetyCasesLoading";
import SafetyCasesErrorBoundary from "./SafetyCasesErrorBoundary";

const InteractiveScenariosTab = () => {
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

  if (error) {
    return (
      <SafetyCasesErrorBoundary>
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">Failed to load safety scenarios</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </SafetyCasesErrorBoundary>
    );
  }

  if (isLoading) {
    return <SafetyCasesLoading />;
  }

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Safety Scenarios</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Experience realistic safety scenarios through interactive decision-making exercises. 
            Each scenario is based on real incidents and provides valuable learning outcomes for electrical safety.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">
                {completedScenarios.length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {scenarios.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Scenarios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {scenarios.length > 0 ? Math.round((completedScenarios.length / scenarios.length) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedScenario ? (
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
      ) : (
        <>
          <ProgressCard
            completedCount={completedScenarios.length}
            totalScenarios={scenarios.length}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                onClick={() => handleSelectScenario(scenario)}
              />
            ))}
          </div>
        </>
      )}

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            How Interactive Scenarios Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Scenario Structure</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Realistic situation presentation</li>
                <li>• Multiple decision points</li>
                <li>• Immediate feedback on choices</li>
                <li>• Detailed explanations of outcomes</li>
                <li>• Best practice recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Learning Benefits</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Practice critical decision-making</li>
                <li>• Learn from mistakes safely</li>
                <li>• Understand consequences of actions</li>
                <li>• Build confidence in emergency response</li>
                <li>• Reinforce safety procedures</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveScenariosTab;
