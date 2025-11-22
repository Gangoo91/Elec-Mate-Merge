import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import HealthSafetyInterface from "@/components/electrician-tools/health-safety/HealthSafetyInterface";

const HealthSafetyPage = () => {
  const location = useLocation();
  const fromAgentSelector = location.state?.fromAgentSelector;

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-3 sm:px-6 lg:px-12 py-3 sm:py-6 max-w-4xl">
        <div className="space-y-0 animate-fade-in">
          {/* Back Button */}
          <Link to={fromAgentSelector ? "/electrician/agent-selector" : "/electrician"}>
            <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-10 mb-4">
              <ArrowLeft className="h-4 w-4" /> {fromAgentSelector ? "Back to Agent Selector" : "Back to Dashboard"}
            </Button>
          </Link>

          {/* Main Content */}
          <HealthSafetyInterface />
        </div>
      </div>
    </div>
  );
};

export default HealthSafetyPage;
