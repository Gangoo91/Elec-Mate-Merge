
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CableSizingCalculator from "@/components/apprentice/calculators/CableSizingCalculator";
import OhmsLawCalculator from "@/components/electrician-tools/OhmsLawCalculator";

const OnJobCalculations = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">On-the-Job Calculations</h1>
          <p className="text-muted-foreground">
            Essential calculators for electrical installations and troubleshooting
          </p>
        </div>
        <Link to="/apprentice/on-job-tools">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Button>
        </Link>
      </div>

      {/* Ohm's Law Calculator */}
      <OhmsLawCalculator />
      
      {/* Cable Sizing Calculator */}
      <CableSizingCalculator />
    </div>
  );
};

export default OnJobCalculations;
