import { ArrowLeft, Calculator } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { MobileButton } from "@/components/ui/mobile-button";
import CostEngineerInterface from "@/components/electrician-tools/cost-engineer/CostEngineerInterface";

const CostEngineerPage = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="mobile-safe-area py-3 sm:py-6 max-w-4xl mx-auto px-3 sm:px-6">
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          {/* Back Button - Mobile optimised */}
          <MobileButton 
            variant="outline" 
            size="default"
            className="gap-2 touch-target"
            asChild
          >
            <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
              <ArrowLeft className="h-4 w-4" /> 
              {fromAgentSelector ? "Back to Agent Selector" : "Back to Dashboard"}
            </Link>
          </MobileButton>

          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2 mb-1">
              <Calculator className="h-6 w-6 sm:h-7 sm:w-7 text-green-400" />
              AI Cost Engineer
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Accurate Material Pricing & Labour Cost Analysis
            </p>
          </div>

          {/* Main Content */}
          <CostEngineerInterface />
        </div>
      </div>
    </div>
  );
};

export default CostEngineerPage;
