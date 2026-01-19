import { ArrowLeft, Zap } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AIInstallationDesigner } from "@/components/electrician-tools/circuit-designer/AIInstallationDesigner";
import { Card, CardContent } from "@/components/ui/card";

const CircuitDesigner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="bg-elec-dark min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.08]">
        <div className="px-2 py-2">
          <button
            onClick={() => navigate(fromAgentSelector ? "/electrician/agent-selector" : "/electrician")}
            className="flex items-center gap-2 text-white active:scale-[0.98] transition-all touch-manipulation h-11 -ml-1 px-2 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">
              {fromAgentSelector ? "Agent Selector" : "Electrician Hub"}
            </span>
          </button>
        </div>
      </div>

      <main className="px-2 py-3 space-y-3">
        {/* Hero Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Zap className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AI Circuit Designer</h1>
            <p className="text-xs text-white/50">BS 7671 compliant circuit design</p>
          </div>
        </div>

        {/* Compliance Badge Card */}
        <Card className="bg-white/[0.03] border border-white/[0.08] rounded-xl">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-white">BS 7671:2018+A3:2024</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] bg-elec-yellow/10 text-elec-yellow rounded-md border border-elec-yellow/20">
                18th Edition
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <AIInstallationDesigner />
      </main>
    </div>
  );
};

export default CircuitDesigner;
