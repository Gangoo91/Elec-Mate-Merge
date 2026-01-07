import { ChevronLeft, Calculator } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CostEngineerInterface from "@/components/electrician-tools/cost-engineer/CostEngineerInterface";

const CostEngineerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromAgentSelector = location.state?.fromAgentSelector;
  const backPath = fromAgentSelector ? "/electrician/agent-selector" : "/electrician";
  const backLabel = fromAgentSelector ? "Agents" : "Hub";

  return (
    <div className="min-h-screen bg-black flex flex-col safe-top safe-bottom">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-elec-yellow/5 via-transparent to-transparent pointer-events-none" />

      {/* iOS-style Header */}
      <header className="relative w-full px-4 pt-4 pb-2 z-50">
        <div className="flex items-center justify-between">
          {/* Back button */}
          <Link
            to={backPath}
            className="flex items-center gap-1 text-elec-yellow ios-pressable p-2 -ml-2 rounded-xl"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-ios-body font-medium">{backLabel}</span>
          </Link>

          {/* Centered icon */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-elec-yellow flex items-center justify-center">
              <Calculator className="h-4 w-4 text-black" />
            </div>
          </div>

          {/* Spacer for alignment */}
          <div className="w-16" />
        </div>
      </header>

      {/* Main content */}
      <main className="relative flex-1 flex flex-col">
        <CostEngineerInterface />
      </main>
    </div>
  );
};

export default CostEngineerPage;
