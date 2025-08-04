import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/common/BackButton";
import { Calculator, PoundSterling } from "lucide-react";

interface StartupInputs {
  tools: number;
  testEquipment: number;
  vehicle: number;
  insurance: number;
  qualifications: number;
  marketing: number;
  workingCapital: number;
}

interface MonthlyInputs {
  insurance: number;
  fuel: number;
  toolMaintenance: number;
  marketing: number;
  phoneInternet: number;
  accountancy: number;
  rent: number;
  utilities: number;
}

const BusinessCostCalculator = () => {
  const [inputs, setInputs] = useState<StartupInputs>({
    tools: 5000,
    testEquipment: 2000,
    vehicle: 15000,
    insurance: 2000,
    qualifications: 3000,
    marketing: 2000,
    workingCapital: 8000,
  });

  const [monthlyInputs, setMonthlyInputs] = useState<MonthlyInputs>({
    insurance: 300,
    fuel: 400,
    toolMaintenance: 150,
    marketing: 250,
    phoneInternet: 80,
    accountancy: 150,
    rent: 0,
    utilities: 100,
  });

  const updateInput = (field: keyof StartupInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateMonthlyInput = (field: keyof MonthlyInputs, value: number) => {
    setMonthlyInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
    setInputs({
      tools: 5000,
      testEquipment: 2000,
      vehicle: 15000,
      insurance: 2000,
      qualifications: 3000,
      marketing: 2000,
      workingCapital: 8000,
    });
    setMonthlyInputs({
      insurance: 300,
      fuel: 400,
      toolMaintenance: 150,
      marketing: 250,
      phoneInternet: 80,
      accountancy: 150,
      rent: 0,
      utilities: 100,
    });
  };

  const totalStartupCosts = Object.values(inputs).reduce((sum, value) => sum + value, 0);
  const totalMonthlyCosts = Object.values(monthlyInputs).reduce((sum, value) => sum + value, 0);
  const yearOneTotal = totalStartupCosts + (totalMonthlyCosts * 12);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Calculator className="h-8 w-8 text-elec-yellow" />
          Business Cost Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Calculate startup costs and ongoing expenses for your electrical contracting business.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-elec-yellow" />
            Interactive Business Cost Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Initial Startup Costs */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-elec-yellow/20 pb-2">
                Initial Startup Costs
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tools" className="text-white">Professional Tools (£)</Label>
                  <Input
                    id="tools"
                    type="number"
                    value={inputs.tools}
                    onChange={(e) => updateInput('tools', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testEquipment" className="text-white">Test Equipment (£)</Label>
                  <Input
                    id="testEquipment"
                    type="number"
                    value={inputs.testEquipment}
                    onChange={(e) => updateInput('testEquipment', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle" className="text-white">Vehicle (£)</Label>
                  <Input
                    id="vehicle"
                    type="number"
                    value={inputs.vehicle}
                    onChange={(e) => updateInput('vehicle', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insurance" className="text-white">Initial Insurance (£)</Label>
                  <Input
                    id="insurance"
                    type="number"
                    value={inputs.insurance}
                    onChange={(e) => updateInput('insurance', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualifications" className="text-white">Qualifications & Certifications (£)</Label>
                  <Input
                    id="qualifications"
                    type="number"
                    value={inputs.qualifications}
                    onChange={(e) => updateInput('qualifications', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketing" className="text-white">Initial Marketing (£)</Label>
                  <Input
                    id="marketing"
                    type="number"
                    value={inputs.marketing}
                    onChange={(e) => updateInput('marketing', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workingCapital" className="text-white">Working Capital (£)</Label>
                  <Input
                    id="workingCapital"
                    type="number"
                    value={inputs.workingCapital}
                    onChange={(e) => updateInput('workingCapital', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <Separator className="bg-elec-yellow/20" />
                <div className="flex justify-between text-white font-semibold text-lg">
                  <span>Total Initial Startup:</span>
                  <span className="text-elec-yellow">£{totalStartupCosts.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Monthly Running Costs */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-elec-yellow/20 pb-2">
                Monthly Running Costs
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyInsurance" className="text-white">Insurance (£/month)</Label>
                  <Input
                    id="monthlyInsurance"
                    type="number"
                    value={monthlyInputs.insurance}
                    onChange={(e) => updateMonthlyInput('insurance', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuel" className="text-white">Fuel & Travel (£/month)</Label>
                  <Input
                    id="fuel"
                    type="number"
                    value={monthlyInputs.fuel}
                    onChange={(e) => updateMonthlyInput('fuel', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toolMaintenance" className="text-white">Tool Maintenance (£/month)</Label>
                  <Input
                    id="toolMaintenance"
                    type="number"
                    value={monthlyInputs.toolMaintenance}
                    onChange={(e) => updateMonthlyInput('toolMaintenance', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyMarketing" className="text-white">Marketing (£/month)</Label>
                  <Input
                    id="monthlyMarketing"
                    type="number"
                    value={monthlyInputs.marketing}
                    onChange={(e) => updateMonthlyInput('marketing', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneInternet" className="text-white">Phone & Internet (£/month)</Label>
                  <Input
                    id="phoneInternet"
                    type="number"
                    value={monthlyInputs.phoneInternet}
                    onChange={(e) => updateMonthlyInput('phoneInternet', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountancy" className="text-white">Accountancy (£/month)</Label>
                  <Input
                    id="accountancy"
                    type="number"
                    value={monthlyInputs.accountancy}
                    onChange={(e) => updateMonthlyInput('accountancy', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rent" className="text-white">Office/Storage Rent (£/month)</Label>
                  <Input
                    id="rent"
                    type="number"
                    value={monthlyInputs.rent}
                    onChange={(e) => updateMonthlyInput('rent', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="utilities" className="text-white">Utilities (£/month)</Label>
                  <Input
                    id="utilities"
                    type="number"
                    value={monthlyInputs.utilities}
                    onChange={(e) => updateMonthlyInput('utilities', parseFloat(e.target.value) || 0)}
                    className="bg-elec-gray-light border-elec-yellow/30 text-white"
                  />
                </div>

                <Separator className="bg-elec-yellow/20" />
                <div className="flex justify-between text-white font-semibold text-lg">
                  <span>Total Monthly Running:</span>
                  <span className="text-elec-yellow">£{totalMonthlyCosts.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-elec-yellow/30 my-8" />

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Year One Total Investment</h3>
            <div className="space-y-3 text-lg">
              <div className="flex justify-between text-white">
                <span>Initial Startup Costs:</span>
                <span>£{totalStartupCosts.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>12 Months Running Costs:</span>
                <span>£{(totalMonthlyCosts * 12).toFixed(2)}</span>
              </div>
              <Separator className="bg-elec-yellow/20" />
              <div className="flex justify-between text-white font-bold text-xl">
                <span>Total Year One:</span>
                <span className="text-elec-yellow">£{yearOneTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              onClick={resetCalculator}
              variant="outline"
              className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Reset Calculator
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessCostCalculator;