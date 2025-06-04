
import { Button } from "@/components/ui/button";
import { ArrowLeft, TestTube } from "lucide-react";
import { Link } from "react-router-dom";
import InspectionTestingWalkthrough from "@/components/inspection-testing/InspectionTestingWalkthrough";

const InspectionTesting = () => {
  console.log('InspectionTesting page rendered');
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <TestTube className="h-8 w-8 text-elec-yellow" />
            Inspection & Testing with EICR Integration
          </h1>
          <p className="text-muted-foreground">
            Professional testing procedures with automatic EICR report generation and fault code management.
          </p>
        </div>
        <Link to="/electrician-tools">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Electrician Tools
          </Button>
        </Link>
      </div>

      <InspectionTestingWalkthrough 
        mode="electrician"
        onComplete={(report) => {
          console.log('Test completed:', report);
          // Handle report generation/export
        }}
      />
    </div>
  );
};

export default InspectionTesting;
