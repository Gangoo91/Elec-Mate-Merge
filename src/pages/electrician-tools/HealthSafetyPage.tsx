import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import HealthSafetyInterface from "@/components/electrician-tools/health-safety/HealthSafetyInterface";

const HealthSafetyPage = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-elec-dark/80 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Health & Safety
                </h1>
                <p className="text-xs text-white/50 hidden sm:block">Risk assessments & RAMS</p>
              </div>
            </div>
            <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 px-3 sm:px-4 text-white/70 hover:text-white hover:bg-white/10 gap-1.5 touch-manipulation"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{fromAgentSelector ? "Agents" : "Hub"}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-safe">
        <HealthSafetyInterface />
      </main>
    </div>
  );
};

export default HealthSafetyPage;
