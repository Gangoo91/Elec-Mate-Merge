import { Button } from "@/components/ui/button";
import { ArrowLeft, Wrench } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import InstallationSpecialistInterface from "@/components/electrician-tools/installation-specialist/InstallationSpecialistInterface";

const InstallationSpecialistPage = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          {/* Back Button - Mobile optimised */}
          <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
            <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-10">
              <ArrowLeft className="h-4 w-4" /> {fromAgentSelector ? "Back to Agent Selector" : "Back to Dashboard"}
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
              <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              AI Installation Specialist
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Step-by-Step Installation Methods & Practical Guidance
            </p>
          </div>

          {/* Main Content */}
          <InstallationSpecialistInterface />
        </div>
      </div>
    </div>
  );
};

export default InstallationSpecialistPage;
