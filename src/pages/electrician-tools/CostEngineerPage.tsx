import { ArrowLeft, Calculator } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { MobileButton } from "@/components/ui/mobile-button";
import CostEngineerInterface from "@/components/electrician-tools/cost-engineer/CostEngineerInterface";

const CostEngineerPage = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="mobile-container mobile-safe-area py-4 sm:py-6">
        <div className="mobile-section-spacing animate-fade-in">
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
          <div className="text-center sm:text-left mb-2">
            <h1 className="mobile-heading font-bold text-foreground flex items-center justify-center sm:justify-start gap-3 mb-2">
              <Calculator className="h-7 w-7 sm:h-8 sm:w-8 text-green-400" />
              AI Cost Engineer
            </h1>
            <p className="mobile-text text-muted-foreground">
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
