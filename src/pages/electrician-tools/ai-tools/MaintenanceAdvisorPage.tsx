import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMaintenanceAdvisor } from "@/components/electrician-tools/ai-tools/maintenance/useMaintenanceAdvisor";
import { MaintenanceInput } from "@/components/electrician-tools/ai-tools/maintenance/MaintenanceInput";
import { MaintenanceProcessingView } from "@/components/electrician-tools/ai-tools/maintenance/MaintenanceProcessingView";
import { MaintenanceResults } from "@/components/electrician-tools/ai-tools/maintenance/MaintenanceResults";

const MaintenanceAdvisorPage = () => {
  const {
    state,
    input,
    results,
    progress,
    isProcessing,
    updateInput,
    generateSchedule,
    resetForm,
  } = useMaintenanceAdvisor();

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Maintenance Advisor
              </h1>
              <p className="text-sm text-white/60">Schedules, risk assessment & compliance</p>
            </div>
          </div>
          <Link to="/electrician-tools/ai-tooling">
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to AI Tools
            </Button>
          </Link>
        </header>

        {/* Main Content */}
        <div className="space-y-6">
          {state === 'input' && (
            <MaintenanceInput
              input={input}
              onInputChange={updateInput}
              onGenerate={generateSchedule}
              isProcessing={isProcessing}
            />
          )}

          {state === 'processing' && (
            <MaintenanceProcessingView progress={progress} detailLevel={input.detailLevel} />
          )}

          {state === 'results' && results && (
            <MaintenanceResults results={results} onReset={resetForm} />
          )}
        </div>
      </main>
    </div>
  );
};

export default MaintenanceAdvisorPage;
