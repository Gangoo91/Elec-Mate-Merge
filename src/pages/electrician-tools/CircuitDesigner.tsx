import { ArrowLeft, Zap } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AIInstallationDesigner } from "@/components/electrician-tools/circuit-designer/AIInstallationDesigner";
import { Card, CardContent } from "@/components/ui/card";

const CircuitDesigner = () => {
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/20">
            <Zap className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Circuit Designer</h1>
            <p className="text-sm text-white/50">BS 7671 compliant circuit design</p>
          </div>
        </div>

        {/* Compliance Badge Card */}
        <Card className="bg-[#1e1e1e] border border-amber-500/20 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-white">BS 7671:2018+A3:2024 Compliant</span>
              </div>
              <span className="px-2 py-1 text-xs bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20">
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
