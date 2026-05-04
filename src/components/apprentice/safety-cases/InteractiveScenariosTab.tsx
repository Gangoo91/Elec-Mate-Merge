import { AlertTriangle } from 'lucide-react';
import ScenarioCard from './ScenarioCard';
import ScenarioDetail from './ScenarioDetail';
import ProgressCard from './ProgressCard';
import { useScenarios } from './useScenarios';
import SafetyCasesLoading from './SafetyCasesLoading';
import SafetyCasesErrorBoundary from './SafetyCasesErrorBoundary';

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
    handleNextScenario,
  } = useScenarios();

  if (error) {
    return (
      <SafetyCasesErrorBoundary>
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-6 sm:p-8 space-y-3 animate-fade-in text-center">
          <AlertTriangle className="h-8 w-8 text-red-400 mx-auto" />
          <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
            Failed to load scenarios
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed max-w-xs mx-auto">{error}</p>
        </div>
      </SafetyCasesErrorBoundary>
    );
  }

  if (isLoading) {
    return <SafetyCasesLoading />;
  }

  const completionPercentage =
    allScenarios.length > 0
      ? Math.round((completedScenarios.length / allScenarios.length) * 100)
      : 0;

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Interactive scenarios
        </span>
        <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
          Safety scenarios
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Experience realistic safety scenarios through interactive decision-making exercises. Each
          scenario is based on real incidents and provides valuable learning outcomes for electrical
          safety.
        </p>
      </div>

      {/* Stats strip */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Progress
          </span>
          <span className="text-[12px] text-white/85 font-mono">
            {completedScenarios.length}/{allScenarios.length} · {completionPercentage}%
          </span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
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
    </div>
  );
};

export default InteractiveScenariosTab;
