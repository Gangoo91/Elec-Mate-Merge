import { ArrowLeft, Calculator } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CostEngineerInterface from "@/components/electrician-tools/cost-engineer/CostEngineerInterface";

const CostEngineerPage = () => {
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/20">
            <Calculator className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Cost Engineer</h1>
            <p className="text-sm text-white/50">Material pricing & labour analysis</p>
          </div>
        </div>

        <CostEngineerInterface />
      </main>
    </div>
  );
};

export default CostEngineerPage;
