import { ArrowLeft, Shield } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import HealthSafetyInterface from "@/components/electrician-tools/health-safety/HealthSafetyInterface";

const HealthSafetyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="min-h-screen bg-[#121212] pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3">
          <button
            onClick={() => navigate(fromAgentSelector ? "/electrician/agent-selector" : "/electrician")}
            className="flex items-center gap-2 text-white active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">
              {fromAgentSelector ? "Agent Selector" : "Electrician Hub"}
            </span>
          </button>
        </div>
      </div>

      <main className="px-4 py-4 space-y-5">
        {/* Hero Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/20">
            <Shield className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Health & Safety</h1>
            <p className="text-sm text-white/50">Risk assessments & RAMS documentation</p>
          </div>
        </div>

        <HealthSafetyInterface />
      </main>
    </div>
  );
};

export default HealthSafetyPage;
