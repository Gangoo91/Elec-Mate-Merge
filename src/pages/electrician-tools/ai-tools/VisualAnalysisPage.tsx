import VisualAnalysisRedesigned from "@/components/electrician-tools/ai-tools/VisualAnalysisRedesigned";
import { ArrowLeft, Camera, Search, Wrench, AlertTriangle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnalysisMode } from "@/components/electrician-tools/ai-tools/ModeSelector";

// Mode configuration for dynamic page title/icon
const modeConfig: Record<string, { title: string; subtitle: string; icon: typeof Camera; gradient: string }> = {
  'component-identify': {
    title: 'Component Identification',
    subtitle: 'Identify specs & BS 7671 requirements',
    icon: Search,
    gradient: 'from-blue-500/20 to-blue-500/10'
  },
  'wiring-instruction': {
    title: 'Wiring Instructions',
    subtitle: 'Step-by-step UK wiring guide',
    icon: Wrench,
    gradient: 'from-emerald-500/20 to-green-500/10'
  },
  'fault-diagnosis': {
    title: 'Fault Diagnosis',
    subtitle: 'Identify issues & rectification steps',
    icon: AlertTriangle,
    gradient: 'from-orange-500/20 to-red-500/10'
  },
  'installation-verify': {
    title: 'Installation Verification',
    subtitle: 'BS 7671 compliance check',
    icon: CheckCircle,
    gradient: 'from-cyan-500/20 to-teal-500/10'
  }
};

const VisualAnalysisPage = () => {
  const navigate = useNavigate();
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
  const config = modeConfig[modeParam] || modeConfig['fault-diagnosis'];
  const IconComponent = config.icon;

  return (
    <div className="bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3">
          <button
            onClick={() => navigate('/electrician-tools/ai-tooling')}
            className="flex items-center gap-2 text-white active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">AI Tools</span>
          </button>
        </div>
      </div>

      <main className="px-4 py-4 space-y-5">
        {/* Hero Header */}
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} border border-white/10`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{config.title}</h1>
            <p className="text-sm text-white/50">{config.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <VisualAnalysisRedesigned initialMode={mode} />
      </main>
    </div>
  );
};

export default VisualAnalysisPage;