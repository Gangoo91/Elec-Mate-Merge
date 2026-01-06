
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, AlertTriangle, Shield, Sparkles, TrendingUp, Play, BookOpen } from "lucide-react";
import ScenarioCard from "./ScenarioCard";
import ScenarioDetail from "./ScenarioDetail";
import ProgressCard from "./ProgressCard";
import { useScenarios } from "./useScenarios";
import SafetyCasesLoading from "./SafetyCasesLoading";
import SafetyCasesErrorBoundary from "./SafetyCasesErrorBoundary";

const InteractiveScenariosTab = () => {
  const {
    scenarios,
    allScenarios,
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
        <Card className="bg-gradient-to-br from-white/5 to-elec-card border-red-500/30 overflow-hidden relative animate-fade-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-8 text-center relative">
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 inline-block mb-4">
              <AlertTriangle className="h-12 w-12 text-red-400" />
            </div>
            <h4 className="font-medium text-white mb-2">Failed to Load Scenarios</h4>
            <p className="text-sm text-white/80 max-w-xs mx-auto">{error}</p>
          </CardContent>
        </Card>
      </SafetyCasesErrorBoundary>
    );
  }

  if (isLoading) {
    return <SafetyCasesLoading />;
  }

  const completionPercentage = allScenarios.length > 0
    ? Math.round((completedScenarios.length / allScenarios.length) * 100)
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Target className="h-5 w-5 text-elec-yellow" />
            </div>
            Interactive Safety Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 relative">
          <p className="text-white/70">
            Experience realistic safety scenarios through interactive decision-making exercises.
            Each scenario is based on real incidents and provides valuable learning outcomes for electrical safety.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-elec-yellow mb-1">
                {completedScenarios.length}
              </div>
              <div className="text-xs sm:text-sm text-white/60">Completed</div>
              <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-elec-yellow to-elec-yellow/70 transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">
                {allScenarios.length}
              </div>
              <div className="text-xs sm:text-sm text-white/60">Total Scenarios</div>
              <div className="mt-2 flex items-center justify-center gap-1">
                <Shield className="h-3 w-3 text-blue-400" />
                <span className="text-xs text-blue-400">Safety First</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">
                {completionPercentage}%
              </div>
              <div className="text-xs sm:text-sm text-white/60">Progress</div>
              <div className="mt-2 flex items-center justify-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-400" />
                <span className="text-xs text-green-400">On track</span>
              </div>
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
            totalScenarios={allScenarios.length}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                onClick={() => handleSelectScenario(scenario)}
                isCompleted={completedScenarios.includes(scenario.id)}
              />
            ))}
          </div>
        </>
      )}

      {/* Enhanced Features Card */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <Sparkles className="h-5 w-5 text-blue-400" />
            </div>
            Enhanced Learning Features
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <BookOpen className="h-4 w-4 text-green-400" />
                </div>
                <h4 className="font-semibold text-white">New Scenario Categories</h4>
              </div>
              <div className="ml-11 space-y-2">
                {[
                  "Working at Height scenarios",
                  "Tool Safety assessments",
                  "Site Safety protocols",
                  "Risk Assessment planning",
                  "Industry-specific scenarios"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Play className="h-4 w-4 text-purple-400" />
                </div>
                <h4 className="font-semibold text-white">Enhanced Features</h4>
              </div>
              <div className="ml-11 space-y-2">
                {[
                  "Interactive decision making",
                  "Real-world case studies",
                  "Progress tracking",
                  "Detailed feedback",
                  "Completion status indicators"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveScenariosTab;
