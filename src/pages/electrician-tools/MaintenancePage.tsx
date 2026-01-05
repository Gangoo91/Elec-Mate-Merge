import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { MaintenanceMethodInterface } from "@/components/electrician-tools/maintenance-method/MaintenanceMethodInterface";

const MaintenancePage = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Settings className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Maintenance Specialist
              </h1>
              <p className="text-sm text-white/60">Inspections & fault diagnosis</p>
            </div>
          </div>
          <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              {fromAgentSelector ? "Back to Agents" : "Back to Hub"}
            </Button>
          </Link>
        </header>

        <MaintenanceMethodInterface />
      </main>
    </div>
  );
};

export default MaintenancePage;
