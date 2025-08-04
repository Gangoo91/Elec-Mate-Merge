import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface BusinessInputs {
  annualSalary: number;
  annualOverheads: number;
  toolsAndEquipment: number;
  insurance: number;
  vehicleCosts: number;
  training: number;
  billableHoursPerWeek: number;
  weeksWorkedPerYear: number;
  desiredProfitMargin: number;
}

const HourlyRateCalculator = () => {
  const [inputs, setInputs] = useState<BusinessInputs>({
    annualSalary: 35000,
    annualOverheads: 8000,
    toolsAndEquipment: 3000,
    insurance: 1500,
    vehicleCosts: 4000,
    training: 1000,
    billableHoursPerWeek: 35,
    weeksWorkedPerYear: 48,
    desiredProfitMargin: 20
  });

  const updateInput = (field: keyof BusinessInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      annualSalary: 35000,
      annualOverheads: 8000,
      toolsAndEquipment: 3000,
      insurance: 1500,
      vehicleCosts: 4000,
      training: 1000,
      billableHoursPerWeek: 35,
      weeksWorkedPerYear: 48,
      desiredProfitMargin: 20
    });
  };

  // Calculations
  const totalAnnualCosts = inputs.annualSalary + inputs.annualOverheads + inputs.toolsAndEquipment + 
                          inputs.insurance + inputs.vehicleCosts + inputs.training;
  const totalBillableHours = inputs.billableHoursPerWeek * inputs.weeksWorkedPerYear;
  const breakEvenRate = totalBillableHours > 0 ? totalAnnualCosts / totalBillableHours : 0;
  const recommendedRate = breakEvenRate * (1 + inputs.desiredProfitMargin / 100);
  
  // Market comparison rates
  const traineeRate = 25;
  const qualifiedRate = 45;
  const experiencedRate = 65;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Hourly Rate Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your optimal hourly rate based on business costs and profit targets
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Business Costs & Targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="annualSalary">Annual Salary/Drawings (£)</Label>
              <Input
                id="annualSalary"
                type="number"
                value={inputs.annualSalary || ""}
                onChange={(e) => updateInput("annualSalary", parseFloat(e.target.value) || 0)}
                placeholder="Enter annual salary target"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualOverheads">Annual Overheads (£)</Label>
              <Input
                id="annualOverheads"
                type="number"
                value={inputs.annualOverheads || ""}
                onChange={(e) => updateInput("annualOverheads", parseFloat(e.target.value) || 0)}
                placeholder="Office, utilities, admin costs"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="toolsAndEquipment">Tools & Equipment (£/year)</Label>
              <Input
                id="toolsAndEquipment"
                type="number"
                value={inputs.toolsAndEquipment || ""}
                onChange={(e) => updateInput("toolsAndEquipment", parseFloat(e.target.value) || 0)}
                placeholder="Annual tool costs and replacements"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insurance">Insurance (£/year)</Label>
              <Input
                id="insurance"
                type="number"
                value={inputs.insurance || ""}
                onChange={(e) => updateInput("insurance", parseFloat(e.target.value) || 0)}
                placeholder="Public liability, tools insurance"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleCosts">Vehicle Costs (£/year)</Label>
              <Input
                id="vehicleCosts"
                type="number"
                value={inputs.vehicleCosts || ""}
                onChange={(e) => updateInput("vehicleCosts", parseFloat(e.target.value) || 0)}
                placeholder="Fuel, maintenance, insurance"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="training">Training & Certification (£/year)</Label>
              <Input
                id="training"
                type="number"
                value={inputs.training || ""}
                onChange={(e) => updateInput("training", parseFloat(e.target.value) || 0)}
                placeholder="Courses, certifications, CPD"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="billableHoursPerWeek">Billable Hours Per Week</Label>
              <Input
                id="billableHoursPerWeek"
                type="number"
                value={inputs.billableHoursPerWeek || ""}
                onChange={(e) => updateInput("billableHoursPerWeek", parseFloat(e.target.value) || 0)}
                placeholder="Hours you can charge for"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weeksWorkedPerYear">Weeks Worked Per Year</Label>
              <Input
                id="weeksWorkedPerYear"
                type="number"
                value={inputs.weeksWorkedPerYear || ""}
                onChange={(e) => updateInput("weeksWorkedPerYear", parseFloat(e.target.value) || 0)}
                placeholder="Typically 48-50 weeks"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredProfitMargin">Desired Profit Margin (%)</Label>
              <Input
                id="desiredProfitMargin"
                type="number"
                value={inputs.desiredProfitMargin || ""}
                onChange={(e) => updateInput("desiredProfitMargin", parseFloat(e.target.value) || 0)}
                placeholder="Target profit percentage"
              />
            </div>

            <Button onClick={resetCalculator} variant="outline" className="w-full">
              Reset Calculator
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Rate Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Annual Costs:</span>
                <span className="font-medium">£{totalAnnualCosts.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Billable Hours:</span>
                <span className="font-medium">{totalBillableHours.toLocaleString()} hours</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Break-Even Rate:</span>
                <span className="font-medium">£{breakEvenRate.toFixed(2)}/hour</span>
              </div>
              
              <div className="flex justify-between font-semibold text-elec-yellow text-lg">
                <span>Recommended Rate:</span>
                <span>£{recommendedRate.toFixed(2)}/hour</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Market Comparison</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between p-2 rounded-lg bg-muted/50">
                  <span className="text-sm">Trainee Electrician:</span>
                  <span className="text-sm font-medium">£{traineeRate}/hour</span>
                </div>
                
                <div className="flex justify-between p-2 rounded-lg bg-muted/50">
                  <span className="text-sm">Qualified Electrician:</span>
                  <span className="text-sm font-medium">£{qualifiedRate}/hour</span>
                </div>
                
                <div className="flex justify-between p-2 rounded-lg bg-muted/50">
                  <span className="text-sm">Experienced Electrician:</span>
                  <span className="text-sm font-medium">£{experiencedRate}/hour</span>
                </div>
              </div>
            </div>

            <div className={`p-3 rounded-lg ${
              recommendedRate <= experiencedRate 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
            }`}>
              {recommendedRate <= experiencedRate 
                ? '✅ Your rate is competitive with market standards' 
                : '⚠️ Your rate is above typical market rates - ensure you can justify the premium'
              }
            </div>

            <div className="text-xs text-muted-foreground">
              * Market rates are indicative averages for the UK. Adjust based on your location, 
              specialisation, and local market conditions.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HourlyRateCalculator;