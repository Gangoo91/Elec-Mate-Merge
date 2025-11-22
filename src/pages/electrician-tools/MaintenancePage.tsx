import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useMaintenanceAdvisor } from "@/components/electrician-tools/ai-tools/maintenance/useMaintenanceAdvisor";
import { MaintenanceInput } from "@/components/electrician-tools/ai-tools/maintenance/MaintenanceInput";
import { MaintenanceProcessingView } from "@/components/electrician-tools/ai-tools/maintenance/MaintenanceProcessingView";
import { MaintenanceResults } from "@/components/electrician-tools/ai-tools/maintenance/MaintenanceResults";

const MaintenancePage = () => {
  const {
    state,
    input,
    results,
    progress,
    isProcessing,
    startTime,
    updateInput,
    generateSchedule,
    resetForm,
  } = useMaintenanceAdvisor();

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-3 sm:px-6 lg:px-12 py-3 sm:py-6 max-w-4xl">
        <div className="space-y-0 animate-fade-in">
          {/* Back Button */}
          <Link to="/electrician/agent-selector">
            <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-10 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Agent Selector
            </Button>
          </Link>

          {/* Main Interface */}
          {state === 'input' && (
            <MaintenanceInput
              input={input}
              onInputChange={updateInput}
              onGenerate={generateSchedule}
              isProcessing={isProcessing}
            />
          )}
          
          {state === 'processing' && (
            <MaintenanceProcessingView 
              progress={progress} 
              detailLevel={input.detailLevel} 
              startTime={startTime}
            />
          )}
          
          {state === 'results' && results && (
            <MaintenanceResults results={results} onReset={resetForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
