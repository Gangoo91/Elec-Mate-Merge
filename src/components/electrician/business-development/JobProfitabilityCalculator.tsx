import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface JobInputs {
  materialCosts: number;
  labourHours: number;
  hourlyRate: number;
  overheadPercentage: number;
  desiredProfitMargin: number;
  quoteAmount: number;
}

const JobProfitabilityCalculator = () => {
  const [inputs, setInputs] = useState<JobInputs>({
    materialCosts: 0,
    labourHours: 0,
    hourlyRate: 45,
    overheadPercentage: 20,
    desiredProfitMargin: 25,
    quoteAmount: 0
  });

  const updateInput = (field: keyof JobInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      materialCosts: 0,
      labourHours: 0,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25,
      quoteAmount: 0
    });
  };

  // Calculations
  const labourCosts = inputs.labourHours * inputs.hourlyRate;
  const directCosts = inputs.materialCosts + labourCosts;
  const overheadCosts = directCosts * (inputs.overheadPercentage / 100);
  const totalCosts = directCosts + overheadCosts;
  const minimumQuote = totalCosts * (1 + inputs.desiredProfitMargin / 100);
  
  // Analysis of current quote
  const actualProfit = inputs.quoteAmount - totalCosts;
  const actualProfitMargin = inputs.quoteAmount > 0 ? (actualProfit / inputs.quoteAmount) * 100 : 0;
  const profitability = actualProfitMargin >= inputs.desiredProfitMargin ? "good" : "poor";

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Job Profitability Calculator</h1>
        <p className="text-muted-foreground">
          Calculate profit margins and determine optimal pricing for electrical jobs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="materialCosts">Material Costs (£)</Label>
              <Input
                id="materialCosts"
                type="number"
                value={inputs.materialCosts || ""}
                onChange={(e) => updateInput("materialCosts", parseFloat(e.target.value) || 0)}
                placeholder="Enter material costs"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="labourHours">Labour Hours</Label>
              <Input
                id="labourHours"
                type="number"
                step="0.5"
                value={inputs.labourHours || ""}
                onChange={(e) => updateInput("labourHours", parseFloat(e.target.value) || 0)}
                placeholder="Enter labour hours"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (£)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={inputs.hourlyRate || ""}
                onChange={(e) => updateInput("hourlyRate", parseFloat(e.target.value) || 0)}
                placeholder="Enter hourly rate"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overheadPercentage">Overhead Percentage (%)</Label>
              <Input
                id="overheadPercentage"
                type="number"
                value={inputs.overheadPercentage || ""}
                onChange={(e) => updateInput("overheadPercentage", parseFloat(e.target.value) || 0)}
                placeholder="Enter overhead percentage"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredProfitMargin">Desired Profit Margin (%)</Label>
              <Input
                id="desiredProfitMargin"
                type="number"
                value={inputs.desiredProfitMargin || ""}
                onChange={(e) => updateInput("desiredProfitMargin", parseFloat(e.target.value) || 0)}
                placeholder="Enter desired profit margin"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="quoteAmount">Your Quote Amount (£)</Label>
              <Input
                id="quoteAmount"
                type="number"
                value={inputs.quoteAmount || ""}
                onChange={(e) => updateInput("quoteAmount", parseFloat(e.target.value) || 0)}
                placeholder="Enter your quote amount"
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
            <CardTitle>Profitability Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Material Costs:</span>
                <span className="font-medium">£{inputs.materialCosts.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Labour Costs:</span>
                <span className="font-medium">£{labourCosts.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overhead Costs:</span>
                <span className="font-medium">£{overheadCosts.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold">
                <span>Total Costs:</span>
                <span>£{totalCosts.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between font-semibold text-elec-yellow">
                <span>Minimum Quote:</span>
                <span>£{minimumQuote.toFixed(2)}</span>
              </div>
            </div>

            {inputs.quoteAmount > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Quote Analysis</h3>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Your Quote:</span>
                    <span className="font-medium">£{inputs.quoteAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profit:</span>
                    <span className={`font-medium ${actualProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      £{actualProfit.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profit Margin:</span>
                    <span className={`font-medium ${profitability === 'good' ? 'text-green-600' : 'text-red-600'}`}>
                      {actualProfitMargin.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${
                    profitability === 'good' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {profitability === 'good' 
                      ? '✅ This quote meets your profit margin target' 
                      : '⚠️ This quote is below your target profit margin'
                    }
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobProfitabilityCalculator;