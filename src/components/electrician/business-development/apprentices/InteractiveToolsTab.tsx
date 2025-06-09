
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, FileText, Users, Calendar, PoundSterling, Download } from "lucide-react";
import { useState } from "react";

const InteractiveToolsTab = () => {
  const [costCalculator, setCostCalculator] = useState({
    apprenticeWage: "6.40",
    hoursPerWeek: "37.5",
    trainingCost: "2000",
    equipmentCost: "500"
  });

  const [results, setResults] = useState<any>(null);

  const calculateCosts = () => {
    const hourlyWage = parseFloat(costCalculator.apprenticeWage);
    const weeklyHours = parseFloat(costCalculator.hoursPerWeek);
    const training = parseFloat(costCalculator.trainingCost);
    const equipment = parseFloat(costCalculator.equipmentCost);

    const weeklyWage = hourlyWage * weeklyHours;
    const monthlyWage = weeklyWage * 4.33;
    const annualWage = weeklyWage * 52;
    
    // Add employer costs (NI, pension, etc.)
    const employerCosts = annualWage * 0.138; // 13.8% employer NI
    const totalAnnualCost = annualWage + employerCosts + training + equipment;
    const threeYearCost = (annualWage + employerCosts) * 3 + training + equipment;

    // Government incentives
    const incentive = 3000; // £3k for 16-18 year olds
    const netThreeYearCost = threeYearCost - incentive;

    setResults({
      weeklyWage: weeklyWage.toFixed(2),
      monthlyWage: monthlyWage.toFixed(2),
      annualWage: annualWage.toFixed(2),
      employerCosts: employerCosts.toFixed(2),
      totalAnnualCost: totalAnnualCost.toFixed(2),
      threeYearCost: threeYearCost.toFixed(2),
      netThreeYearCost: netThreeYearCost.toFixed(2),
      incentive: incentive.toFixed(2)
    });
  };

  const templateTypes = [
    { name: "Apprenticeship Agreement", description: "Legal employment contract template", category: "Legal" },
    { name: "Individual Learning Plan", description: "Training and development roadmap", category: "Training" },
    { name: "Progress Review Form", description: "Regular assessment template", category: "Assessment" },
    { name: "EPA Gateway Checklist", description: "End-point assessment readiness", category: "Assessment" },
    { name: "Mentor Feedback Form", description: "Structured feedback template", category: "Development" },
    { name: "Health & Safety Induction", description: "Site safety checklist", category: "Safety" },
    { name: "Skills Matrix", description: "Competency tracking spreadsheet", category: "Training" },
    { name: "Customer Feedback Form", description: "Client interaction assessment", category: "Development" }
  ];

  const planningTools = [
    { tool: "Training Schedule Planner", description: "20% off-the-job training organiser", icon: Calendar },
    { tool: "Competency Tracker", description: "Skills development monitoring", icon: Users },
    { tool: "Cost Analysis Tool", description: "ROI calculator for apprenticeships", icon: PoundSterling },
    { tool: "Performance Dashboard", description: "Progress visualisation", icon: FileText }
  ];

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(parseFloat(amount));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-elec-yellow/20 bg-elec-gray text-center">
          <CardContent className="pt-6">
            <Calculator className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Cost Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate apprentice costs & ROI</p>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/20 bg-blue-500/10 text-center">
          <CardContent className="pt-6">
            <FileText className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Document Templates</h3>
            <p className="text-sm text-muted-foreground">Ready-to-use forms and contracts</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/20 bg-green-500/10 text-center">
          <CardContent className="pt-6">
            <Calendar className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Planning Tools</h3>
            <p className="text-sm text-muted-foreground">Training and development planners</p>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/20 bg-purple-500/10 text-center">
          <CardContent className="pt-6">
            <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Progress Tracking</h3>
            <p className="text-sm text-muted-foreground">Monitor apprentice development</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Apprentice Cost Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-white mb-3">Cost Parameters</h4>
              
              <div className="space-y-2">
                <Label htmlFor="apprenticeWage">Hourly Wage (£)</Label>
                <Input
                  id="apprenticeWage"
                  type="number"
                  step="0.01"
                  value={costCalculator.apprenticeWage}
                  onChange={(e) => setCostCalculator(prev => ({ ...prev, apprenticeWage: e.target.value }))}
                  className="bg-elec-dark"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoursPerWeek">Hours per Week</Label>
                <Input
                  id="hoursPerWeek"
                  type="number"
                  step="0.5"
                  value={costCalculator.hoursPerWeek}
                  onChange={(e) => setCostCalculator(prev => ({ ...prev, hoursPerWeek: e.target.value }))}
                  className="bg-elec-dark"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainingCost">Training Costs (£)</Label>
                <Input
                  id="trainingCost"
                  type="number"
                  value={costCalculator.trainingCost}
                  onChange={(e) => setCostCalculator(prev => ({ ...prev, trainingCost: e.target.value }))}
                  className="bg-elec-dark"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipmentCost">Equipment/Tools (£)</Label>
                <Input
                  id="equipmentCost"
                  type="number"
                  value={costCalculator.equipmentCost}
                  onChange={(e) => setCostCalculator(prev => ({ ...prev, equipmentCost: e.target.value }))}
                  className="bg-elec-dark"
                />
              </div>

              <Button onClick={calculateCosts} className="w-full">
                Calculate Total Costs
              </Button>
            </div>

            {results && (
              <div className="space-y-4">
                <h4 className="font-semibold text-white mb-3">Cost Breakdown</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-elec-dark p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Weekly Wage</div>
                    <div className="text-lg font-bold text-blue-400">{formatCurrency(results.weeklyWage)}</div>
                  </div>
                  
                  <div className="bg-elec-dark p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Monthly Wage</div>
                    <div className="text-lg font-bold text-green-400">{formatCurrency(results.monthlyWage)}</div>
                  </div>
                  
                  <div className="bg-elec-dark p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Annual Total</div>
                    <div className="text-lg font-bold text-purple-400">{formatCurrency(results.totalAnnualCost)}</div>
                  </div>
                  
                  <div className="bg-elec-dark p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Employer Costs</div>
                    <div className="text-lg font-bold text-amber-400">{formatCurrency(results.employerCosts)}</div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">3-Year Investment</span>
                    <span className="text-xl font-bold text-green-400">{formatCurrency(results.threeYearCost)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Government Incentive</span>
                    <span className="text-lg font-bold text-green-400">-{formatCurrency(results.incentive)}</span>
                  </div>
                  <hr className="border-green-500/30 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-300">Net 3-Year Cost</span>
                    <span className="text-xl font-bold text-green-400">{formatCurrency(results.netThreeYearCost)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Templates Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templateTypes.map((template, index) => (
              <div key={index} className="p-4 border border-blue-500/20 rounded-lg hover:bg-blue-500/5 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-white">{template.name}</h4>
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <Button size="sm" variant="outline" className="w-full border-blue-500/30">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Planning & Management Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {planningTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <div key={index} className="p-4 border border-green-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <IconComponent className="h-6 w-6 text-green-400 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-green-300 mb-1">{tool.tool}</h4>
                      <p className="text-sm text-green-200 mb-3">{tool.description}</p>
                      <Button size="sm" variant="outline" className="border-green-500/30">
                        Access Tool
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
