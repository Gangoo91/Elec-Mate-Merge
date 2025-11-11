import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileButton } from "@/components/ui/mobile-button";
import TrueHourlyRateCalculator from "@/components/electrician-tools/cost-engineer/true-rate/TrueHourlyRateCalculator";

const TrueRateCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="mobile-safe-area py-4 sm:py-6 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          {/* Back Button */}
          <MobileButton 
            variant="outline" 
            size="default"
            className="gap-2 touch-target"
            asChild
          >
            <Link to="/electrician/cost-engineer">
              <ArrowLeft className="h-4 w-4" /> 
              Back to Cost Engineer
            </Link>
          </MobileButton>

          {/* Header */}
          <div className="text-center sm:text-left mb-2">
            <h1 className="mobile-heading font-bold text-foreground flex items-center justify-center sm:justify-start gap-3 mb-2">
              <Calculator className="h-7 w-7 sm:h-8 sm:w-8 text-orange-400" />
              True Hourly Rate Calculator
            </h1>
            <p className="mobile-text text-muted-foreground">
              Stop Underselling Yourself - Find Your REAL Required Rate
            </p>
          </div>

          {/* Main Content */}
          <TrueHourlyRateCalculator />
        </div>
      </div>
    </div>
  );
};

export default TrueRateCalculatorPage;
