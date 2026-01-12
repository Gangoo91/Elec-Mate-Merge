import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CommissioningInterface from "@/components/electrician-tools/commissioning/CommissioningInterface";

const CommissioningPage = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="min-h-screen bg-elec-dark pt-safe pb-safe">
      <div className="container mx-auto px-2 sm:px-4 lg:px-12 py-3 sm:py-6 max-w-7xl">
        <div className="space-y-3 sm:space-y-4 animate-fade-in">
          {/* Back Button - Mobile optimised */}
          <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
            <Button variant="outline" className="gap-2 touch-manipulation h-11 active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" /> {fromAgentSelector ? "Back to Agent Selector" : "Back to Dashboard"}
            </Button>
          </Link>

          {/* Main Content */}
          <CommissioningInterface />
        </div>
      </div>
    </div>
  );
};

export default CommissioningPage;
