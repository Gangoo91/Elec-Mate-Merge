
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckSquare, Clock, BookOpen, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const BS7671RunThrough = () => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const inspectionSteps = [
    {
      id: 1,
      title: "Initial Documentation Review",
      description: "Check electrical installation certificates and drawings",
      estimatedTime: "10-15 minutes",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Visual Inspection - External",
      description: "External condition of installation, intake position, earthing arrangements",
      estimatedTime: "15-20 minutes", 
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Visual Inspection - Internal",
      description: "Consumer unit, circuit protection, cable routing and support",
      estimatedTime: "20-30 minutes",
      difficulty: "Medium"
    },
    {
      id: 4,
      title: "Safe Isolation Procedures",
      description: "Proper isolation and proving dead before testing",
      estimatedTime: "10-15 minutes",
      difficulty: "Critical"
    },
    {
      id: 5,
      title: "Continuity Testing (R1+R2)",
      description: "Test continuity of protective conductors and CPC",
      estimatedTime: "15-25 minutes",
      difficulty: "Medium"
    },
    {
      id: 6,
      title: "Insulation Resistance Testing",
      description: "Test insulation resistance between conductors",
      estimatedTime: "15-20 minutes",
      difficulty: "Medium"
    },
    {
      id: 7,
      title: "Polarity Testing",
      description: "Verify correct connection of phase and neutral conductors",
      estimatedTime: "10-15 minutes",
      difficulty: "Easy"
    },
    {
      id: 8,
      title: "Earth Fault Loop Impedance (Zs)",
      description: "Measure earth fault loop impedance values",
      estimatedTime: "15-25 minutes",
      difficulty: "Medium"
    },
    {
      id: 9,
      title: "RCD Testing",
      description: "Test operation and trip times of RCD devices",
      estimatedTime: "10-20 minutes",
      difficulty: "Medium"
    },
    {
      id: 10,
      title: "Final Documentation",
      description: "Complete certificates and schedule any remedial work",
      estimatedTime: "15-20 minutes",
      difficulty: "Easy"
    }
  ];

  const totalSteps = inspectionSteps.length;
  const progressPercentage = (completedSteps.size / totalSteps) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-400";
      case "Medium": return "text-yellow-400";
      case "Critical": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Critical": return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">BS7671 Inspection & Testing Run-Through</h1>
          <p className="text-muted-foreground">Complete step-by-step inspection and testing process</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      {/* Progress Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-elec-yellow" />
            Progress Overview
          </CardTitle>
          <CardDescription>
            Complete all 10 steps for a thorough inspection and testing process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Steps Completed</span>
              <span>{completedSteps.size} of {totalSteps}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Estimated total time: 2.5 - 3.5 hours
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Important Safety Notice */}
      <Card className="border-red-500/20 bg-red-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Safety First
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-100">
            This is a learning tool for apprentices. <strong>Always work under supervision</strong> and 
            follow your company's safety procedures. Never attempt electrical testing without proper 
            training and authorisation.
          </p>
        </CardContent>
      </Card>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inspectionSteps.map((step) => (
          <Card 
            key={step.id} 
            className={`border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors cursor-pointer ${
              completedSteps.has(step.id) ? 'ring-2 ring-green-500/30' : ''
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="bg-elec-yellow/10 text-elec-yellow rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </span>
                  {step.title}
                </CardTitle>
                {completedSteps.has(step.id) && (
                  <CheckSquare className="h-5 w-5 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <CardDescription>{step.description}</CardDescription>
              
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{step.estimatedTime}</span>
                </div>
                <div className={`flex items-center gap-1 ${getDifficultyColor(step.difficulty)}`}>
                  {getDifficultyIcon(step.difficulty)}
                  <span>{step.difficulty}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link to={`/apprentice/on-job-tools/bs7671-runthrough/step/${step.id}`}>
                  <Button className="w-full" size="sm">
                    {completedSteps.has(step.id) ? 'Review Step' : 'Start Step'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Reference Links */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link to="/apprentice/on-job-tools/testing-procedures">
              <Button variant="outline" className="w-full justify-start" size="sm">
                Testing Procedures Mini Toolkit
              </Button>
            </Link>
            <Link to="/apprentice/on-job-tools/calculations">
              <Button variant="outline" className="w-full justify-start" size="sm">
                Electrical Calculations
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BS7671RunThrough;
