import { Wrench, ArrowLeft, Calendar, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MaintenanceAdvisor } from "@/components/electrician-tools/ai-tools/MaintenanceAdvisor";

const MaintenanceAdvisorPage = () => {
  return (
    <div className="min-h-screen bg-elec-dark">
      {/* Header */}
      <div className="border-b border-elec-gray/20">
        <div className="px-4 py-4 md:py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-4">
              <Link to="/electrician-tools/ai-tooling">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to AI Tooling
                </Button>
              </Link>
            </div>

            <div className="text-center mb-2">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl mb-2">
                <Calendar className="h-7 w-7 text-elec-yellow" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-elec-light mb-2">
                Maintenance Advisor
              </h1>
              
              <p className="text-base text-elec-light/70 max-w-2xl mx-auto">
                Generate equipment-specific maintenance schedules based on GN3 guidance and manufacturer recommendations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 md:py-8">
        <div className="max-w-5xl mx-auto">
          <MaintenanceAdvisor />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceAdvisorPage;
