import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CostEngineerInterface from "@/components/electrician-tools/cost-engineer/CostEngineerInterface";

const CostEngineerPage = () => {
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
              <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
              AI Cost Engineer
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
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
