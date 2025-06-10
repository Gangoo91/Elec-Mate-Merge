
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, PoundSterling } from "lucide-react";
import { useState } from "react";

const ToolBudgetCalculator = () => {
  const [monthlyBudget, setMonthlyBudget] = useState<string>("100");
  const [apprenticeLevel, setApprenticeLevel] = useState<string>("first-year");
  const [workType, setWorkType] = useState<string>("domestic");
  const [toolAllowance, setToolAllowance] = useState<string>("0");
  const [results, setResults] = useState<any>(null);

  const toolCategories = {
    "first-year": {
      handTools: 250,
      powerTools: 300,
      testEquipment: 400,
      ppe: 150,
      storage: 100
    },
    "second-year": {
      handTools: 350,
      powerTools: 500,
      testEquipment: 600,
      ppe: 200,
      storage: 150
    },
    "qualified": {
      handTools: 500,
      powerTools: 800,
      testEquipment: 1200,
      ppe: 300,
      storage: 300
    }
  };

  const workTypeMultipliers = {
    domestic: 1.0,
    commercial: 1.2,
    industrial: 1.4,
    mixed: 1.1
  };

  const calculateBudget = () => {
    const monthly = parseFloat(monthlyBudget);
    const allowance = parseFloat(toolAllowance);
    const baseTools = toolCategories[apprenticeLevel as keyof typeof toolCategories];
    const multiplier = workTypeMultipliers[workType as keyof typeof workTypeMultipliers];
    
    const totalNeeded = Object.values(baseTools).reduce((sum, cost) => sum + (cost * multiplier), 0);
    const availablePerYear = (monthly * 12) + allowance;
    const timeToComplete = Math.ceil(totalNeeded / availablePerYear);
    
    const priorityOrder = [
      { category: "PPE & Safety", cost: baseTools.ppe * multiplier, priority: 1 },
      { category: "Test Equipment", cost: baseTools.testEquipment * multiplier, priority: 2 },
      { category: "Hand Tools", cost: baseTools.handTools * multiplier, priority: 3 },
      { category: "Power Tools", cost: baseTools.powerTools * multiplier, priority: 4 },
      { category: "Tool Storage", cost: baseTools.storage * multiplier, priority: 5 }
    ];

    setResults({
      totalNeeded: totalNeeded.toFixed(0),
      yearlyBudget: availablePerYear.toFixed(0),
      timeToComplete,
      priorityOrder,
      monthlyTarget: (totalNeeded / (timeToComplete * 12)).toFixed(0)
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle className="text-elec-yellow">Tool Budget Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="apprentice-level">Apprenticeship Level</Label>
              <Select value={apprenticeLevel} onValueChange={setApprenticeLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-year">First Year</SelectItem>
                  <SelectItem value="second-year">Second Year+</SelectItem>
                  <SelectItem value="qualified">Newly Qualified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="work-type">Primary Work Type</Label>
              <Select value={workType} onValueChange={setWorkType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="monthly-budget">Monthly Tool Budget (£)</Label>
              <Input
                id="monthly-budget"
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="tool-allowance">Annual Tool Allowance (£)</Label>
              <Input
                id="tool-allowance"
                type="number"
                value={toolAllowance}
                onChange={(e) => setToolAllowance(e.target.value)}
              />
            </div>
            
            <Button onClick={calculateBudget} className="w-full">
              Calculate Budget Plan
            </Button>
          </div>
          
          {results && (
            <div className="space-y-4">
              <h4 className="font-semibold text-white mb-3">Your Budget Plan</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-elec-yellow/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Total Tools Needed:</span>
                  <span className="font-bold text-elec-yellow">£{results.totalNeeded}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Annual Budget:</span>
                  <span className="font-bold text-blue-400">£{results.yearlyBudget}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Time to Complete:</span>
                  <span className="font-bold text-green-400">{results.timeToComplete} years</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Recommended Monthly:</span>
                  <span className="font-bold text-purple-400">£{results.monthlyTarget}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="font-medium text-white mb-2">Purchase Priority Order:</h5>
                <div className="space-y-2">
                  {results.priorityOrder.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{item.priority}. {item.category}</span>
                      <span className="text-white">£{item.cost.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolBudgetCalculator;
