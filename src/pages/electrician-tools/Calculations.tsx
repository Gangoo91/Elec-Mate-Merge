
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VoltageDropCalculator from "@/components/electrician-tools/VoltageDropCalculator";
import LoadCalculator from "@/components/electrician-tools/LoadCalculator";
import { PowerFactorCalculator } from "@/components/electrician-tools/PowerFactorCalculator";
import OhmsLawCalculator from "@/components/electrician-tools/OhmsLawCalculator";
import CalculatorCards from "@/components/electrician-tools/CalculatorCards";

const Calculations = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Electrical Calculations</h1>
          <p className="text-muted-foreground">
            Precise calculations for your electrical installation and maintenance work.
          </p>
        </div>
        <Link to="/electrician-tools">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Button>
        </Link>
      </div>

      {/* Quick Calculator */}
      <OhmsLawCalculator />

      <CalculatorCards />

      {/* Voltage Drop Calculator */}
      <VoltageDropCalculator />

      {/* Load Calculator */}
      <div id="load-calculator">
        <LoadCalculator />
      </div>

      {/* Power Factor Calculator */}
      <div id="power-factor-calculator">
        <PowerFactorCalculator />
      </div>
    </div>
  );
};

export default Calculations;
