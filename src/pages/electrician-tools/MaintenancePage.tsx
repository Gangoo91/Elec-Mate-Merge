import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { MaintenanceMethodInterface } from "@/components/electrician-tools/maintenance-method/MaintenanceMethodInterface";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-3 sm:px-6 lg:px-12 py-3 sm:py-6 max-w-4xl">
        <div className="space-y-0 animate-fade-in">
          {/* Back Button */}
          <Link to="/electrician/agent-selector">
            <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-10 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Agent Selector
            </Button>
          </Link>

          {/* Main Interface */}
          <MaintenanceMethodInterface />
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
