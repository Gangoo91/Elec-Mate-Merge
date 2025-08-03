import { Calculator, PoundSterling, TrendingUp, Target, Zap, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobCostingCalculator } from "./tools/JobCostingCalculator";
import { PricingCalculator } from "./tools/PricingCalculator";
import { BreakEvenCalculator } from "./tools/BreakEvenCalculator";
import { ROICalculator } from "./tools/ROICalculator";
import { LabourRateCalculator } from "./tools/LabourRateCalculator";
import { MaterialMarkupCalculator } from "./tools/MaterialMarkupCalculator";

export const ToolsTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-elec-yellow/20 bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-4 text-center">
            <Calculator className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <div className="text-2xl font-bold text-elec-yellow">6</div>
            <div className="text-sm text-muted-foreground">Business Tools</div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-4 text-center">
            <PoundSterling className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <div className="text-2xl font-bold text-elec-yellow">Instant</div>
            <div className="text-sm text-muted-foreground">Calculations</div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <div className="text-2xl font-bold text-elec-yellow">Growth</div>
            <div className="text-sm text-muted-foreground">Focused</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="job-costing" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="job-costing" className="text-xs">Job Costing</TabsTrigger>
          <TabsTrigger value="pricing" className="text-xs">Pricing</TabsTrigger>
          <TabsTrigger value="break-even" className="text-xs">Break-Even</TabsTrigger>
          <TabsTrigger value="roi" className="text-xs">ROI</TabsTrigger>
          <TabsTrigger value="labour-rate" className="text-xs">Labour Rate</TabsTrigger>
          <TabsTrigger value="markup" className="text-xs">Markup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="job-costing" className="mt-6">
          <JobCostingCalculator />
        </TabsContent>
        
        <TabsContent value="pricing" className="mt-6">
          <PricingCalculator />
        </TabsContent>
        
        <TabsContent value="break-even" className="mt-6">
          <BreakEvenCalculator />
        </TabsContent>
        
        <TabsContent value="roi" className="mt-6">
          <ROICalculator />
        </TabsContent>
        
        <TabsContent value="labour-rate" className="mt-6">
          <LabourRateCalculator />
        </TabsContent>
        
        <TabsContent value="markup" className="mt-6">
          <MaterialMarkupCalculator />
        </TabsContent>
      </Tabs>

      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Using These Tools Effectively
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-elec-yellow mb-2">Before Quoting</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Use Job Costing to build accurate estimates</li>
                <li>• Check Labour Rate for competitive pricing</li>
                <li>• Apply Material Markup consistently</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-elec-yellow mb-2">Business Planning</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Calculate Break-Even for new services</li>
                <li>• Assess ROI for equipment purchases</li>
                <li>• Review pricing strategy regularly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};