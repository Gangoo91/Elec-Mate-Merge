
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, Calendar, FileText, PoundSterling, TrendingUp, Users } from "lucide-react";

const InteractiveToolsTab = () => {
  const [apprenticeCosts, setApprenticeCosts] = useState({
    apprenticeWage: 6.40,
    hoursPerWeek: 35,
    weeksPerYear: 48,
    trainingCosts: 2000,
    equipmentCosts: 1500,
    supervisorHours: 5
  });

  const [timelineInputs, setTimelineInputs] = useState({
    startDate: "",
    apprenticeName: "",
    trainingProvider: ""
  });

  const calculateApprenticeROI = () => {
    const annualWages = apprenticeCosts.apprenticeWage * apprenticeCosts.hoursPerWeek * apprenticeCosts.weeksPerYear;
    const totalFirstYearCost = annualWages + apprenticeCosts.trainingCosts + apprenticeCosts.equipmentCosts;
    const governmentIncentive = 3000; // For 16-18 year olds
    const netFirstYearCost = totalFirstYearCost - governmentIncentive;
    
    // Projected productivity and value after 18 months
    const year2ProductiveHours = apprenticeCosts.hoursPerWeek * 48 * 0.7; // 70% productive
    const averageChargeRate = 45;
    const year2Revenue = year2ProductiveHours * averageChargeRate;
    const year2Wages = 10.42 * apprenticeCosts.hoursPerWeek * 48; // Minimum wage after first year
    const year2Profit = year2Revenue - year2Wages;

    return {
      firstYearCost: totalFirstYearCost,
      governmentIncentive,
      netFirstYearCost,
      year2Revenue,
      year2Profit,
      breakEvenMonths: Math.ceil(netFirstYearCost / (year2Profit / 12))
    };
  };

  const generateTimeline = () => {
    if (!timelineInputs.startDate) return [];

    const startDate = new Date(timelineInputs.startDate);
    const timeline = [
      {
        month: 0,
        title: "Pre-Arrival Setup",
        tasks: [
          "Complete apprenticeship agreement paperwork",
          "Set up training provider contracts",
          "Prepare workspace and safety equipment",
          "Schedule induction training"
        ]
      },
      {
        month: 1,
        title: "Induction & Safety",
        tasks: [
          "Health and safety induction",
          "Company procedures training",
          "Basic electrical theory",
          "Tool familiarisation"
        ]
      },
      {
        month: 3,
        title: "Foundation Skills",
        tasks: [
          "Cable installation techniques",
          "Basic testing procedures",
          "Customer interaction training",
          "First assessment milestone"
        ]
      },
      {
        month: 6,
        title: "Intermediate Development",
        tasks: [
          "Circuit design understanding",
          "More complex installations",
          "Independent task completion",
          "Mid-year review"
        ]
      },
      {
        month: 12,
        title: "Advanced Skills",
        tasks: [
          "Fault finding and diagnosis",
          "Customer consultation skills",
          "Project management basics",
          "End-of-year assessment"
        ]
      },
      {
        month: 24,
        title: "Competency & Independence",
        tasks: [
          "Independent job completion",
          "Quality assurance responsibilities",
          "Mentoring newer apprentices",
          "Preparation for final EPA"
        ]
      }
    ];

    return timeline.map(milestone => ({
      ...milestone,
      date: new Date(startDate.getTime() + milestone.month * 30.44 * 24 * 60 * 60 * 1000)
    }));
  };

  const complianceChecklist = [
    {
      category: "Legal Documentation",
      items: [
        { task: "Apprenticeship agreement signed", required: true, completed: false },
        { task: "Training provider contract", required: true, completed: false },
        { task: "Individual learning plan created", required: true, completed: false },
        { task: "Health and safety induction completed", required: true, completed: false }
      ]
    },
    {
      category: "Training Requirements",
      items: [
        { task: "20% off-the-job training scheduled", required: true, completed: false },
        { task: "Skills development plan agreed", required: true, completed: false },
        { task: "Assessment schedule confirmed", required: true, completed: false },
        { task: "End-point assessment organisation selected", required: true, completed: false }
      ]
    },
    {
      category: "Ongoing Compliance",
      items: [
        { task: "Monthly progress reviews", required: true, completed: false },
        { task: "Training records maintained", required: true, completed: false },
        { task: "Employer satisfaction surveys", required: false, completed: false },
        { task: "Career guidance sessions", required: false, completed: false }
      ]
    }
  ];

  const roiData = calculateApprenticeROI();
  const timeline = generateTimeline();

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Interactive Apprentice Management Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Use these interactive tools to plan, calculate costs, and manage your apprentice programme effectively.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <Calculator className="h-5 w-5 text-green-400 mb-2" />
              <div className="text-sm text-muted-foreground">ROI Calculator</div>
              <div className="text-xl font-bold text-green-400">Cost/Benefit</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <Calendar className="h-5 w-5 text-blue-400 mb-2" />
              <div className="text-sm text-muted-foreground">Timeline Planner</div>
              <div className="text-xl font-bold text-blue-400">48 Months</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <FileText className="h-5 w-5 text-purple-400 mb-2" />
              <div className="text-sm text-muted-foreground">Compliance Tracker</div>
              <div className="text-xl font-bold text-purple-400">Checklist</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-500/20 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <PoundSterling className="h-5 w-5" />
              Apprentice ROI Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="apprenticeWage">Hourly Wage (£)</Label>
                  <Input
                    id="apprenticeWage"
                    type="number"
                    step="0.01"
                    value={apprenticeCosts.apprenticeWage}
                    onChange={(e) => setApprenticeCosts(prev => ({
                      ...prev,
                      apprenticeWage: parseFloat(e.target.value) || 0
                    }))}
                    className="bg-elec-dark"
                  />
                </div>
                <div>
                  <Label htmlFor="hoursPerWeek">Hours/Week</Label>
                  <Input
                    id="hoursPerWeek"
                    type="number"
                    value={apprenticeCosts.hoursPerWeek}
                    onChange={(e) => setApprenticeCosts(prev => ({
                      ...prev,
                      hoursPerWeek: parseInt(e.target.value) || 0
                    }))}
                    className="bg-elec-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="trainingCosts">Training Costs (£)</Label>
                  <Input
                    id="trainingCosts"
                    type="number"
                    value={apprenticeCosts.trainingCosts}
                    onChange={(e) => setApprenticeCosts(prev => ({
                      ...prev,
                      trainingCosts: parseInt(e.target.value) || 0
                    }))}
                    className="bg-elec-dark"
                  />
                </div>
                <div>
                  <Label htmlFor="equipmentCosts">Equipment Costs (£)</Label>
                  <Input
                    id="equipmentCosts"
                    type="number"
                    value={apprenticeCosts.equipmentCosts}
                    onChange={(e) => setApprenticeCosts(prev => ({
                      ...prev,
                      equipmentCosts: parseInt(e.target.value) || 0
                    }))}
                    className="bg-elec-dark"
                  />
                </div>
              </div>

              <div className="bg-elec-dark/50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold text-white">Financial Projection</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">First Year Total Cost:</span>
                    <span className="text-white">£{roiData.firstYearCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Government Incentive:</span>
                    <span className="text-green-400">-£{roiData.governmentIncentive.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground">Net First Year Cost:</span>
                    <span className="text-white">£{roiData.netFirstYearCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year 2 Revenue Potential:</span>
                    <span className="text-blue-400">£{roiData.year2Revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year 2 Profit:</span>
                    <span className="text-green-400">£{roiData.year2Profit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground">Break-even Timeline:</span>
                    <span className="text-elec-yellow">{roiData.breakEvenMonths} months</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Training Timeline Planner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="startDate">Apprentice Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={timelineInputs.startDate}
                  onChange={(e) => setTimelineInputs(prev => ({
                    ...prev,
                    startDate: e.target.value
                  }))}
                  className="bg-elec-dark"
                />
              </div>

              <div>
                <Label htmlFor="apprenticeName">Apprentice Name</Label>
                <Input
                  id="apprenticeName"
                  type="text"
                  placeholder="Enter apprentice name"
                  value={timelineInputs.apprenticeName}
                  onChange={(e) => setTimelineInputs(prev => ({
                    ...prev,
                    apprenticeName: e.target.value
                  }))}
                  className="bg-elec-dark"
                />
              </div>

              {timeline.length > 0 && (
                <div className="bg-elec-dark/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Training Milestones</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {timeline.map((milestone, index) => (
                      <div key={index} className="border border-blue-500/20 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-white text-sm">{milestone.title}</h5>
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                            Month {milestone.month}
                          </Badge>
                        </div>
                        <div className="text-xs text-blue-300 mb-2">
                          {milestone.date?.toLocaleDateString('en-GB', { 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </div>
                        <ul className="space-y-1">
                          {milestone.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="text-xs text-muted-foreground flex items-start gap-1">
                              <span className="text-blue-400">•</span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Compliance Tracking Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {complianceChecklist.map((category, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{category.category}</h4>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3 p-2 bg-purple-500/5 rounded">
                      <input 
                        type="checkbox" 
                        className="rounded border-purple-500"
                        defaultChecked={item.completed}
                      />
                      <span className={`text-sm flex-1 ${item.required ? 'text-white' : 'text-muted-foreground'}`}>
                        {item.task}
                      </span>
                      <Badge className={item.required ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}>
                        {item.required ? 'Required' : 'Optional'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-purple-500/20">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-purple-500/30">
                <FileText className="h-4 w-4 mr-2" />
                Export Checklist
              </Button>
              <Button variant="outline" className="border-blue-500/30">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Review
              </Button>
              <Button variant="outline" className="border-green-500/30">
                <TrendingUp className="h-4 w-4 mr-2" />
                Progress Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
