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
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-4 sm:py-6">
        <div className="space-y-6 animate-fade-in">
          {/* Back Button */}
          <Link to="/electrician/agent-selector">
            <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-10">
              <ArrowLeft className="h-4 w-4" /> Back to Agent Selector
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Maintenance Specialist
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Periodic inspections, preventive maintenance & fault diagnosis guidance
            </p>
          </div>

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
