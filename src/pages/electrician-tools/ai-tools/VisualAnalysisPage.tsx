import VisualAnalysisRedesigned from "@/components/electrician-tools/ai-tools/VisualAnalysisRedesigned";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { AnalysisMode } from "@/components/electrician-tools/ai-tools/ModeSelector";

const VisualAnalysisPage = () => {
  const params = useParams();
  const pathSegments = window.location.pathname.split('/');
  const modeParam = pathSegments[pathSegments.length - 1];
  
  // Map URL segment to AnalysisMode
  const modeMap: Record<string, AnalysisMode> = {
    'component-identify': 'component_identify',
    'wiring-instruction': 'wiring_instruction',
    'fault-diagnosis': 'fault_diagnosis',
    'installation-verify': 'installation_verify'
  };
  
  const mode = modeMap[modeParam] || 'fault_diagnosis';
  
  return (
    <div className="min-h-screen bg-elec-grey text-foreground">
      <div className="max-w-6xl mx-auto ai-tool-page-padding space-y-4 sm:space-y-8">
        {/* Simple back navigation */}
        <div className="flex justify-start">
          <Link to="/electrician-tools/ai-tooling">
            <Button variant="outline" className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 border-border">
              <ArrowLeft className="h-4 w-4" /> Back to AI Tools
            </Button>
          </Link>
        </div>
        <VisualAnalysisRedesigned initialMode={mode} />
      </div>
    </div>
  );
};

export default VisualAnalysisPage;