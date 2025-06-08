
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

const RunThroughStepsTab = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const inspectionSteps = [
    {
      step: 1,
      title: "Initial Verification",
      description: "Complete inspection and testing process for new installations",
      duration: "2-4 hours",
      complexity: "Advanced",
      category: "New Installation",
      keyPoints: [
        "Schedule of inspections completed",
        "All circuits tested and documented",
        "Electrical Installation Certificate issued"
      ]
    },
    {
      step: 2, 
      title: "Periodic Inspection (EICR)",
      description: "EICR inspection process for existing installations",
      duration: "1-3 hours",
      complexity: "Intermediate",
      category: "Existing Installation",
      keyPoints: [
        "Visual inspection of accessible parts",
        "Testing of protective measures",
        "EICR report completion"
      ]
    },
    {
      step: 3,
      title: "Visual Inspection",
      description: "Step-by-step visual inspection checklist",
      duration: "30-60 mins",
      complexity: "Beginner",
      category: "Initial Check",
      keyPoints: [
        "Connection of conductors",
        "Identification of conductors",
        "Routing of cables in safe zones"
      ]
    },
    {
      step: 4,
      title: "Testing Procedures", 
      description: "Complete testing sequence with MFT",
      duration: "1-2 hours",
      complexity: "Intermediate",
      category: "Electrical Testing",
      keyPoints: [
        "Continuity of protective conductors",
        "Insulation resistance testing",
        "Earth fault loop impedance"
      ]
    }
  ];

  const handleStartStep = (stepNumber: number) => {
    console.log(`Starting step ${stepNumber}`);
  };

  const handleCompleteStep = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(s => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{completedSteps.length}</div>
              <div className="text-sm text-muted-foreground">Completed Steps</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{inspectionSteps.length - completedSteps.length}</div>
              <div className="text-sm text-muted-foreground">Remaining Steps</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {Math.round((completedSteps.length / inspectionSteps.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">BS 7671</div>
              <div className="text-sm text-muted-foreground">18th Edition</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inspectionSteps.map((step) => (
          <Card 
            key={step.step} 
            className={`border-elec-yellow/20 bg-elec-gray transition-all ${
              completedSteps.includes(step.step) ? 'ring-2 ring-green-500/50' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    completedSteps.includes(step.step) 
                      ? 'bg-green-500 text-black' 
                      : 'bg-elec-yellow text-elec-dark'
                  }`}>
                    {completedSteps.includes(step.step) ? <CheckCircle className="h-4 w-4" /> : step.step}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <Badge variant="outline" className="border-blue-500/40 text-blue-400 mt-1">
                      {step.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                  <Clock className="h-3 w-3 mr-1" />
                  {step.duration}
                </Badge>
                <Badge variant="outline" className={getComplexityColor(step.complexity)}>
                  {step.complexity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-elec-light/80 mb-4">{step.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">Key Requirements:</h4>
                <ul className="space-y-1">
                  {step.keyPoints.map((point, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  size="sm"
                  onClick={() => handleStartStep(step.step)}
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Start Run-Through
                </Button>
                <Button 
                  variant={completedSteps.includes(step.step) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCompleteStep(step.step)}
                >
                  {completedSteps.includes(step.step) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RunThroughStepsTab;
