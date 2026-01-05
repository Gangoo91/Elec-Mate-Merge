import VisualAnalysisRedesigned from "@/components/electrician-tools/ai-tools/VisualAnalysisRedesigned";
import { ArrowLeft, Camera } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <Camera className="h-6 w-6 sm:h-7 sm:w-7 text-rose-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Visual Analysis
              </h1>
              <p className="text-sm text-white/60">AI-powered image analysis</p>
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

        {/* Content */}
        <VisualAnalysisRedesigned initialMode={mode} />
      </main>
    </div>
  );
};

export default VisualAnalysisPage;