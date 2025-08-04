import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Clock, PoundSterling, Calculator, CheckCircle } from "lucide-react";

interface RateInputs {
  annualSalary: number;
  workingDaysPerYear: number;
  hoursPerDay: number;
  overheadPercentage: number;
  profitMargin: number;
  utilizationRate: number;
}

const HourlyRateCalculator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<RateInputs>({
    annualSalary: 30000,
    workingDaysPerYear: 230,
    hoursPerDay: 8,
    overheadPercentage: 25,
    profitMargin: 25,
    utilizationRate: 75,
  });
  const [calculated, setCalculated] = useState(false);

  const calculateRate = () => {
    setCalculated(true);
    toast({ title: "Rate Calculated", description: "Your hourly rate analysis is complete.", variant: "success" });
  };

  const updateInput = (field: keyof RateInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setCalculated(false);
  };

  // Calculations
  const totalWorkingHours = inputs.workingDaysPerYear * inputs.hoursPerDay;
  const billableHours = (totalWorkingHours * inputs.utilizationRate) / 100;
  const baseCostPerHour = inputs.annualSalary / billableHours;
  const overheadCostPerHour = baseCostPerHour * (inputs.overheadPercentage / 100);
  const totalCostPerHour = baseCostPerHour + overheadCostPerHour;
  const minimumRate = totalCostPerHour / (1 - inputs.profitMargin / 100);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Clock className="h-8 w-8 text-elec-yellow" />
          Hourly Rate Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Calculate your optimal hourly rate based on costs, overheads, and desired profit margins.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white">Rate Calculation Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MobileInput
              label="Desired Annual Salary"
              type="number"
              value={inputs.annualSalary || ""}
              onChange={(e) => updateInput('annualSalary', parseFloat(e.target.value) || 0)}
              unit="£"
              hint="Your target personal income"
            />
            <MobileInput
              label="Working Days Per Year"
              type="number"
              value={inputs.workingDaysPerYear || ""}
              onChange={(e) => updateInput('workingDaysPerYear', parseInt(e.target.value) || 0)}
              hint="Typically 230-250 days"
            />
            <MobileInput
              label="Hours Per Day"
              type="number"
              value={inputs.hoursPerDay || ""}
              onChange={(e) => updateInput('hoursPerDay', parseInt(e.target.value) || 0)}
              hint="Standard working hours"
            />
            <MobileInput
              label="Overhead Percentage"
              type="number"
              value={inputs.overheadPercentage || ""}
              onChange={(e) => updateInput('overheadPercentage', parseFloat(e.target.value) || 0)}
              unit="%"
              hint="Business costs (20-30%)"
            />
            <MobileInput
              label="Profit Margin"
              type="number"
              value={inputs.profitMargin || ""}
              onChange={(e) => updateInput('profitMargin', parseFloat(e.target.value) || 0)}
              unit="%"
              hint="Target profit (20-30%)"
            />
            <MobileInput
              label="Utilization Rate"
              type="number"
              value={inputs.utilizationRate || ""}
              onChange={(e) => updateInput('utilizationRate', parseFloat(e.target.value) || 0)}
              unit="%"
              hint="Billable vs total hours (70-80%)"
            />
            <Button onClick={calculateRate} className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Rate
            </Button>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PoundSterling className="h-5 w-5 text-elec-yellow" />
              Rate Analysis
              {calculated && <Badge variant="success" className="ml-auto">Calculated</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {calculated ? (
              <>
                <div className="text-center bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-2">Recommended Hourly Rate</h3>
                  <p className="text-4xl font-bold text-elec-yellow">£{minimumRate.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground mt-2">Minimum rate to achieve targets</p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Rate Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-white">
                      <span>Base cost per hour:</span>
                      <span>£{baseCostPerHour.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Overhead costs:</span>
                      <span>£{overheadCostPerHour.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Total cost per hour:</span>
                      <span>£{totalCostPerHour.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-semibold">
                      <span>Profit margin:</span>
                      <span className="text-green-400">£{(minimumRate - totalCostPerHour).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 text-green-300">
                    <CheckCircle className="h-5 w-5" />
                    <h4 className="font-medium">Rate Recommendations</h4>
                  </div>
                  <p className="text-sm text-green-200 mt-2">
                    Your calculated rate of £{minimumRate.toFixed(2)}/hour should cover all costs and deliver your target salary.
                    Consider market rates and adjust accordingly.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-elec-yellow/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Calculate</h3>
                <p className="text-muted-foreground">Enter your details and click "Calculate Rate"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HourlyRateCalculator;