import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BusinessBreakEven {
  fixedCosts: number;
  variableCostPercentage: number;
  averageJobValue: number;
}

interface JobBreakEven {
  materialCosts: number;
  labourHours: number;
  hourlyRate: number;
  overheads: number;
  desiredProfit: number;
}

const BreakEvenCalculator = () => {
  const [businessInputs, setBusinessInputs] = useState<BusinessBreakEven>({
    fixedCosts: 4000,
    variableCostPercentage: 35,
    averageJobValue: 800
  });

  const [jobInputs, setJobInputs] = useState<JobBreakEven>({
    materialCosts: 200,
    labourHours: 8,
    hourlyRate: 45,
    overheads: 100,
    desiredProfit: 150
  });

  const updateBusinessInput = (field: keyof BusinessBreakEven, value: number) => {
    setBusinessInputs(prev => ({ ...prev, [field]: value }));
  };

  const updateJobInput = (field: keyof JobBreakEven, value: number) => {
    setJobInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetBusinessCalculator = () => {
    setBusinessInputs({
      fixedCosts: 4000,
      variableCostPercentage: 35,
      averageJobValue: 800
    });
  };

  const resetJobCalculator = () => {
    setJobInputs({
      materialCosts: 200,
      labourHours: 8,
      hourlyRate: 45,
      overheads: 100,
      desiredProfit: 150
    });
  };

  // Business Break-Even Calculations
  const contributionMargin = (100 - businessInputs.variableCostPercentage) / 100;
  const contributionPerJob = businessInputs.averageJobValue * contributionMargin;
  const breakEvenJobs = contributionPerJob > 0 ? businessInputs.fixedCosts / contributionPerJob : 0;
  const breakEvenRevenue = breakEvenJobs * businessInputs.averageJobValue;
  const jobsPerWeek = breakEvenJobs / 52;
  const jobsPerMonth = breakEvenJobs / 12;

  // Job Break-Even Calculations
  const labourCosts = jobInputs.labourHours * jobInputs.hourlyRate;
  const totalCosts = jobInputs.materialCosts + labourCosts + jobInputs.overheads;
  const breakEvenPrice = totalCosts;
  const targetPrice = totalCosts + jobInputs.desiredProfit;
  const profitMargin = targetPrice > 0 ? (jobInputs.desiredProfit / targetPrice) * 100 : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Break-Even Calculator</h1>
        <p className="text-muted-foreground">
          Calculate break-even points for your business operations and individual jobs
        </p>
      </div>

      <Tabs defaultValue="business" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="business">Business Break-Even</TabsTrigger>
          <TabsTrigger value="job">Job Break-Even</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Business Costs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fixedCosts">Fixed Monthly Costs (£)</Label>
                  <Input
                    id="fixedCosts"
                    type="number"
                    value={businessInputs.fixedCosts || ""}
                    onChange={(e) => updateBusinessInput("fixedCosts", parseFloat(e.target.value) || 0)}
                    placeholder="Rent, insurance, vehicle costs, etc."
                  />
                  <div className="text-xs text-muted-foreground">
                    Include: rent, insurance, vehicle costs, loan payments, phone, utilities
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variableCostPercentage">Variable Costs (%)</Label>
                  <Input
                    id="variableCostPercentage"
                    type="number"
                    value={businessInputs.variableCostPercentage || ""}
                    onChange={(e) => updateBusinessInput("variableCostPercentage", parseFloat(e.target.value) || 0)}
                    placeholder="Percentage of revenue"
                  />
                  <div className="text-xs text-muted-foreground">
                    Materials, subcontractors, fuel (as % of job value)
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="averageJobValue">Average Job Value (£)</Label>
                  <Input
                    id="averageJobValue"
                    type="number"
                    value={businessInputs.averageJobValue || ""}
                    onChange={(e) => updateBusinessInput("averageJobValue", parseFloat(e.target.value) || 0)}
                    placeholder="Typical job invoice amount"
                  />
                </div>

                <Button onClick={resetBusinessCalculator} variant="outline" className="w-full">
                  Reset Calculator
                </Button>
              </CardContent>
            </Card>

            {/* Business Results Section */}
            <Card>
              <CardHeader>
                <CardTitle>Break-Even Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contribution Margin:</span>
                    <span className="font-medium">{(contributionMargin * 100).toFixed(1)}%</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contribution per Job:</span>
                    <span className="font-medium">£{contributionPerJob.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-elec-yellow">
                    <span>Break-Even Jobs/Month:</span>
                    <span>{breakEvenJobs.toFixed(1)} jobs</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jobs per Week:</span>
                    <span className="font-medium">{jobsPerWeek.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Revenue Target:</span>
                    <span className="font-medium">£{breakEvenRevenue.toFixed(0)}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Target Analysis</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-elec-yellow">{Math.ceil(breakEvenJobs)}</div>
                      <div className="text-xs text-muted-foreground">Minimum Jobs/Month</div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-elec-yellow">{Math.ceil(jobsPerWeek)}</div>
                      <div className="text-xs text-muted-foreground">Jobs per Week</div>
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${
                  jobsPerWeek <= 2 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : jobsPerWeek <= 4
                    ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {jobsPerWeek <= 2 
                    ? '✅ Achievable target - good business model' 
                    : jobsPerWeek <= 4
                    ? '⚠️ Moderate target - ensure consistent work flow'
                    : '⚠️ High target - consider reducing costs or increasing prices'
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="job" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Job Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>Job Costs & Targets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="materialCosts">Material Costs (£)</Label>
                  <Input
                    id="materialCosts"
                    type="number"
                    value={jobInputs.materialCosts || ""}
                    onChange={(e) => updateJobInput("materialCosts", parseFloat(e.target.value) || 0)}
                    placeholder="Cost of materials for this job"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="labourHours">Labour Hours</Label>
                  <Input
                    id="labourHours"
                    type="number"
                    step="0.5"
                    value={jobInputs.labourHours || ""}
                    onChange={(e) => updateJobInput("labourHours", parseFloat(e.target.value) || 0)}
                    placeholder="Time required for job"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (£)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={jobInputs.hourlyRate || ""}
                    onChange={(e) => updateJobInput("hourlyRate", parseFloat(e.target.value) || 0)}
                    placeholder="Your hourly rate"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overheads">Job Overheads (£)</Label>
                  <Input
                    id="overheads"
                    type="number"
                    value={jobInputs.overheads || ""}
                    onChange={(e) => updateJobInput("overheads", parseFloat(e.target.value) || 0)}
                    placeholder="Travel, vehicle costs, etc."
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="desiredProfit">Desired Profit (£)</Label>
                  <Input
                    id="desiredProfit"
                    type="number"
                    value={jobInputs.desiredProfit || ""}
                    onChange={(e) => updateJobInput("desiredProfit", parseFloat(e.target.value) || 0)}
                    placeholder="Target profit for this job"
                  />
                </div>

                <Button onClick={resetJobCalculator} variant="outline" className="w-full">
                  Reset Calculator
                </Button>
              </CardContent>
            </Card>

            {/* Job Results Section */}
            <Card>
              <CardHeader>
                <CardTitle>Job Pricing Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material Costs:</span>
                    <span className="font-medium">£{jobInputs.materialCosts.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Labour Costs:</span>
                    <span className="font-medium">£{labourCosts.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overheads:</span>
                    <span className="font-medium">£{jobInputs.overheads.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Costs:</span>
                    <span className="font-medium">£{totalCosts.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between font-semibold">
                    <span>Break-Even Price:</span>
                    <span className="text-red-600">£{breakEvenPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between font-semibold text-elec-yellow">
                    <span>Target Price:</span>
                    <span>£{targetPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profit Margin:</span>
                    <span className="font-medium">{profitMargin.toFixed(1)}%</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Pricing Guidance</h3>
                  
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-red-50 border border-red-200">
                      <div className="text-sm font-medium text-red-800">Minimum Quote: £{breakEvenPrice.toFixed(2)}</div>
                      <div className="text-xs text-red-600">Below this price, you lose money</div>
                    </div>
                    
                    <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                      <div className="text-sm font-medium text-green-800">Recommended Quote: £{targetPrice.toFixed(2)}</div>
                      <div className="text-xs text-green-600">Includes your target profit margin</div>
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${
                  profitMargin >= 20 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : profitMargin >= 10
                    ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {profitMargin >= 20 
                    ? '✅ Healthy profit margin for sustainable business' 
                    : profitMargin >= 10
                    ? '⚠️ Moderate margin - consider increasing if market allows'
                    : '⚠️ Low margin - increase price or reduce costs'
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreakEvenCalculator;