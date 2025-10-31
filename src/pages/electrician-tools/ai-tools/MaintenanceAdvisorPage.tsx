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
    <div className="min-h-screen bg-gradient-to-b from-elec-grey via-elec-dark to-elec-grey">
      {/* Header */}
      <div className="border-b border-elec-gray/20">
        <div className="ai-tool-page-padding">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-4">
              <Link to="/electrician-tools/ai-tooling">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to AI Tooling
                </Button>
              </Link>
            </div>

            <div className="text-center mb-2">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl mb-2">
                <Calendar className="h-7 w-7 text-elec-yellow" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-elec-light mb-2">
                Maintenance Advisor
              </h1>
              
              <p className="text-base text-elec-light/70 max-w-2xl mx-auto">
                Generate comprehensive maintenance schedules with risk assessment, cost estimates, and compliance tracking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ai-tool-page-padding">
        <div className="max-w-5xl mx-auto">
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
      </div>
    </div>
  );
};

export default MaintenanceAdvisorPage;
