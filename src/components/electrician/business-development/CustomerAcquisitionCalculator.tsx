import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, Users, Target, TrendingUp, PoundSterling, BarChart3, RefreshCw } from "lucide-react";

interface CustomerInputs {
  // Current Business Metrics
  monthlyRevenue: number;
  averageJobValue: number;
  monthlyJobs: number;
  conversionRate: number;
  
  // Marketing Investment
  marketingBudget: number;
  digitalMarketingSpend: number;
  traditionaMarketingSpend: number;
  
  // Growth Targets
  targetGrowthRate: number;
  targetMarketShare: number;
  competitorAnalysis: number;
}

const CustomerAcquisitionCalculator = () => {
  const [inputs, setInputs] = useState<CustomerInputs>({
    monthlyRevenue: 15000,
    averageJobValue: 850,
    monthlyJobs: 18,
    conversionRate: 25,
    marketingBudget: 2000,
    digitalMarketingSpend: 1200,
    traditionaMarketingSpend: 800,
    targetGrowthRate: 20,
    targetMarketShare: 5,
    competitorAnalysis: 15
  });

  const updateInput = (field: keyof CustomerInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      monthlyRevenue: 15000,
      averageJobValue: 850,
      monthlyJobs: 18,
      conversionRate: 25,
      marketingBudget: 2000,
      digitalMarketingSpend: 1200,
      traditionaMarketingSpend: 800,
      targetGrowthRate: 20,
      targetMarketShare: 5,
      competitorAnalysis: 15
    });
  };

  // Calculations
  const currentCustomerAcquisitionCost = inputs.marketingBudget / inputs.monthlyJobs;
  const leadsNeeded = inputs.monthlyJobs / (inputs.conversionRate / 100);
  const costPerLead = inputs.marketingBudget / leadsNeeded;
  
  // Growth calculations
  const targetMonthlyJobs = inputs.monthlyJobs * (1 + inputs.targetGrowthRate / 100);
  const additionalJobsNeeded = targetMonthlyJobs - inputs.monthlyJobs;
  const additionalRevenueFromGrowth = additionalJobsNeeded * inputs.averageJobValue;
  const requiredMarketingInvestment = currentCustomerAcquisitionCost * additionalJobsNeeded;
  
  // ROI calculations
  const marketingROI = (inputs.monthlyRevenue - inputs.marketingBudget) / inputs.marketingBudget * 100;
  const projectedROI = (inputs.monthlyRevenue + additionalRevenueFromGrowth - inputs.marketingBudget - requiredMarketingInvestment) / (inputs.marketingBudget + requiredMarketingInvestment) * 100;

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Users className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl font-bold">Customer Acquisition Calculator</h1>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Analyse your customer acquisition costs, conversion rates, and develop strategies to grow your customer base effectively.
          </p>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-elec-gray">
            <TabsTrigger value="current">Current Metrics</TabsTrigger>
            <TabsTrigger value="growth">Growth Planning</TabsTrigger>
            <TabsTrigger value="analysis">Analysis & ROI</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-elec-yellow" />
                    Business Metrics
                  </CardTitle>
                  <CardDescription>Your current business performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="monthlyRevenue">Monthly Revenue (£)</Label>
                    <Input
                      id="monthlyRevenue"
                      type="number"
                      value={inputs.monthlyRevenue}
                      onChange={(e) => updateInput('monthlyRevenue', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="averageJobValue">Average Job Value (£)</Label>
                    <Input
                      id="averageJobValue"
                      type="number"
                      value={inputs.averageJobValue}
                      onChange={(e) => updateInput('averageJobValue', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="monthlyJobs">Monthly Jobs Completed</Label>
                    <Input
                      id="monthlyJobs"
                      type="number"
                      value={inputs.monthlyJobs}
                      onChange={(e) => updateInput('monthlyJobs', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="conversionRate">Lead Conversion Rate (%)</Label>
                    <Input
                      id="conversionRate"
                      type="number"
                      value={inputs.conversionRate}
                      onChange={(e) => updateInput('conversionRate', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PoundSterling className="h-5 w-5 text-elec-yellow" />
                    Marketing Investment
                  </CardTitle>
                  <CardDescription>Your current marketing spend breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="marketingBudget">Total Monthly Marketing Budget (£)</Label>
                    <Input
                      id="marketingBudget"
                      type="number"
                      value={inputs.marketingBudget}
                      onChange={(e) => updateInput('marketingBudget', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="digitalMarketingSpend">Digital Marketing (£)</Label>
                    <Input
                      id="digitalMarketingSpend"
                      type="number"
                      value={inputs.digitalMarketingSpend}
                      onChange={(e) => updateInput('digitalMarketingSpend', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="traditionaMarketingSpend">Traditional Marketing (£)</Label>
                    <Input
                      id="traditionaMarketingSpend"
                      type="number"
                      value={inputs.traditionaMarketingSpend}
                      onChange={(e) => updateInput('traditionaMarketingSpend', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-elec-yellow" />
                  Growth Targets & Market Analysis
                </CardTitle>
                <CardDescription>Set your growth targets and market positioning</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="targetGrowthRate">Target Growth Rate (%)</Label>
                  <Input
                    id="targetGrowthRate"
                    type="number"
                    value={inputs.targetGrowthRate}
                    onChange={(e) => updateInput('targetGrowthRate', Number(e.target.value))}
                    className="bg-elec-dark border-elec-yellow/30"
                  />
                </div>
                
                <div>
                  <Label htmlFor="targetMarketShare">Target Market Share (%)</Label>
                  <Input
                    id="targetMarketShare"
                    type="number"
                    value={inputs.targetMarketShare}
                    onChange={(e) => updateInput('targetMarketShare', Number(e.target.value))}
                    className="bg-elec-dark border-elec-yellow/30"
                  />
                </div>
                
                <div>
                  <Label htmlFor="competitorAnalysis">Competitor Avg. CAC (£)</Label>
                  <Input
                    id="competitorAnalysis"
                    type="number"
                    value={inputs.competitorAnalysis}
                    onChange={(e) => updateInput('competitorAnalysis', Number(e.target.value))}
                    className="bg-elec-dark border-elec-yellow/30"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-elec-yellow" />
                    Customer Acquisition Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current CAC:</span>
                    <span className="font-medium">£{currentCustomerAcquisitionCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Leads Needed/Month:</span>
                    <span className="font-medium">{leadsNeeded.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost Per Lead:</span>
                    <span className="font-medium">£{costPerLead.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Marketing ROI:</span>
                    <span className={`font-medium ${marketingROI > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {marketingROI.toFixed(1)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-elec-yellow" />
                    Growth Projections
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Target Monthly Jobs:</span>
                    <span className="font-medium">{targetMonthlyJobs.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Additional Jobs Needed:</span>
                    <span className="font-medium">{additionalJobsNeeded.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Additional Revenue:</span>
                    <span className="font-medium">£{additionalRevenueFromGrowth.toFixed(0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Required Marketing Investment:</span>
                    <span className="font-medium">£{requiredMarketingInvestment.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projected ROI:</span>
                    <span className={`font-medium ${projectedROI > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {projectedROI.toFixed(1)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button
            onClick={resetCalculator}
            variant="outline"
            className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Calculator
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerAcquisitionCalculator;