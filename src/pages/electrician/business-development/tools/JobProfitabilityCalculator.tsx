import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/common/BackButton";
import { Calculator, PoundSterling } from "lucide-react";

interface JobInputs {
  materialCost: number;
  labourHours: number;
  hourlyRate: number;
  overheadPercentage: number;
  desiredProfitMargin: number;
  quoteAmount: number;
}

const JobProfitabilityCalculator = () => {
  const [inputs, setInputs] = useState<JobInputs>({
    materialCost: 500,
    labourHours: 8,
    hourlyRate: 45,
    overheadPercentage: 20,
    desiredProfitMargin: 25,
    quoteAmount: 900,
  });

  const updateInput = (field: keyof JobInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
    setInputs({
      materialCost: 500,
      labourHours: 8,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25,
      quoteAmount: 900,
    });
  };

  // Calculations
  const labourCost = inputs.labourHours * inputs.hourlyRate;
  const directCosts = inputs.materialCost + labourCost;
  const overheadCosts = directCosts * (inputs.overheadPercentage / 100);
  const totalCosts = directCosts + overheadCosts;
  
  const minimumQuote = totalCosts / (1 - inputs.desiredProfitMargin / 100);
  const actualProfit = inputs.quoteAmount - totalCosts;
  const actualProfitMargin = (actualProfit / inputs.quoteAmount) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Calculator className="h-8 w-8 text-elec-yellow" />
          Job Profitability Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Analyse quote profitability and calculate minimum pricing to achieve your desired profit margins.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PoundSterling className="h-5 w-5 text-elec-yellow" />
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="materialCost" className="text-white">Material Cost (£)</Label>
              <Input
                id="materialCost"
                type="number"
                step="0.01"
                value={inputs.materialCost}
                onChange={(e) => updateInput('materialCost', parseFloat(e.target.value) || 0)}
                className="bg-elec-gray-light border-elec-yellow/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="labourHours" className="text-white">Labour Hours</Label>
              <Input
                id="labourHours"
                type="number"
                step="0.5"
                value={inputs.labourHours}
                onChange={(e) => updateInput('labourHours', parseFloat(e.target.value) || 0)}
                className="bg-elec-gray-light border-elec-yellow/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate" className="text-white">Hourly Rate (£)</Label>
              <Input
                id="hourlyRate"
                type="number"
                step="0.01"
                value={inputs.hourlyRate}
                onChange={(e) => updateInput('hourlyRate', parseFloat(e.target.value) || 0)}
                className="bg-elec-gray-light border-elec-yellow/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overheadPercentage" className="text-white">Overhead Percentage (%)</Label>
              <Input
                id="overheadPercentage"
                type="number"
                step="1"
                value={inputs.overheadPercentage}
                onChange={(e) => updateInput('overheadPercentage', parseFloat(e.target.value) || 0)}
                className="bg-elec-gray-light border-elec-yellow/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredProfitMargin" className="text-white">Desired Profit Margin (%)</Label>
              <Input
                id="desiredProfitMargin"
                type="number"
                step="1"
                value={inputs.desiredProfitMargin}
                onChange={(e) => updateInput('desiredProfitMargin', parseFloat(e.target.value) || 0)}
                className="bg-elec-gray-light border-elec-yellow/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quoteAmount" className="text-white">Your Quote (£)</Label>
              <Input
                id="quoteAmount"
                type="number"
                step="0.01"
                value={inputs.quoteAmount}
                onChange={(e) => updateInput('quoteAmount', parseFloat(e.target.value) || 0)}
                className="bg-elec-gray-light border-elec-yellow/30 text-white"
              />
            </div>

            <Button 
              onClick={resetCalculator}
              variant="outline"
              className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Reset Calculator
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              Profitability Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-white">
                <span>Material Costs:</span>
                <span>£{inputs.materialCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Labour Costs:</span>
                <span>£{labourCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Overhead Costs:</span>
                <span>£{overheadCosts.toFixed(2)}</span>
              </div>
              <Separator className="bg-elec-yellow/20" />
              <div className="flex justify-between text-white font-semibold">
                <span>Total Costs:</span>
                <span>£{totalCosts.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="bg-elec-yellow/30" />

            <div className="space-y-3">
              <div className="flex justify-between text-white">
                <span>Minimum Quote Required:</span>
                <span className="text-elec-yellow font-semibold">£{minimumQuote.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Your Quote:</span>
                <span>£{inputs.quoteAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Actual Profit:</span>
                <span className={actualProfit >= 0 ? "text-green-400" : "text-red-400"}>
                  £{actualProfit.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-white">
                <span>Actual Profit Margin:</span>
                <span className={actualProfitMargin >= inputs.desiredProfitMargin ? "text-green-400" : "text-red-400"}>
                  {actualProfitMargin.toFixed(1)}%
                </span>
              </div>
            </div>

            <Separator className="bg-elec-yellow/30" />

            <div className={`p-4 rounded-lg ${
              actualProfitMargin >= inputs.desiredProfitMargin 
                ? "bg-green-500/20 border border-green-500/30" 
                : "bg-red-500/20 border border-red-500/30"
            }`}>
              <h3 className={`font-semibold ${
                actualProfitMargin >= inputs.desiredProfitMargin ? "text-green-300" : "text-red-300"
              }`}>
                {actualProfitMargin >= inputs.desiredProfitMargin ? "✓ Profitable Quote" : "⚠ Unprofitable Quote"}
              </h3>
              <p className={`text-sm ${
                actualProfitMargin >= inputs.desiredProfitMargin ? "text-green-200" : "text-red-200"
              }`}>
                {actualProfitMargin >= inputs.desiredProfitMargin 
                  ? `Your quote exceeds the desired profit margin by ${(actualProfitMargin - inputs.desiredProfitMargin).toFixed(1)}%`
                  : `Increase quote by £${(minimumQuote - inputs.quoteAmount).toFixed(2)} to achieve desired margin`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobProfitabilityCalculator;