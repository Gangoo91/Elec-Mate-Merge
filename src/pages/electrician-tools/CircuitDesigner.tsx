import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AIInstallationDesigner } from "@/components/electrician-tools/circuit-designer/AIInstallationDesigner";

const CircuitDesigner = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-3 sm:px-4 lg:px-12 xl:px-20 py-4 sm:py-6 pb-safe">
        <div className="space-y-3 sm:space-y-4 animate-fade-in">
          {/* Back Button - Mobile optimized */}
          <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
            <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-10">
              <ArrowLeft className="h-4 w-4" /> {fromAgentSelector ? "Back to Agent Selector" : "Back to Dashboard"}
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
              <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              AI Circuit Designer
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1 leading-snug">
              BS 7671 18th Edition Compliant Design Generation
            </p>
          </div>

          {/* Main Content */}
          <AIInstallationDesigner />
        </div>
      </div>
    </div>
  );
};

export default CircuitDesigner;
