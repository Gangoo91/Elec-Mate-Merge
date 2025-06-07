
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckSquare, Clock, BookOpen, AlertTriangle, Zap, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { enhancedBS7671Steps } from "@/data/bs7671-steps/enhancedStepData";

const BS7671RunThrough = () => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const totalSteps = enhancedBS7671Steps.length;
  const progressPercentage = (completedSteps.size / totalSteps) * 100;

  const getDifficultyColor = (category: string) => {
    switch (category) {
      case "Safety Critical": return "text-red-400";
      case "Electrical Testing": return "text-blue-400";
      case "Visual Inspection": return "text-green-400";
      case "Documentation": return "text-purple-400";
      default: return "text-gray-400";
    }
  };

  const getDifficultyIcon = (category: string) => {
    switch (category) {
      case "Safety Critical": return <AlertTriangle className="h-4 w-4" />;
      case "Electrical Testing": return <Zap className="h-4 w-4" />;
      case "Visual Inspection": return <CheckSquare className="h-4 w-4" />;
      case "Documentation": return <BookOpen className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case "Safety Critical": return "Life-critical safety procedures";
      case "Electrical Testing": return "Electrical measurements and testing";
      case "Visual Inspection": return "Physical inspection and observation";
      case "Documentation": return "Record keeping and compliance";
      default: return "General procedures";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">BS7671 Inspection & Testing Run-Through</h1>
          <p className="text-muted-foreground">Comprehensive electrical safety testing procedures for apprentices</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      {/* Enhanced Features Highlight */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Enhanced Learning Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-500/10 rounded border border-blue-500/30">
              <Zap className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <h4 className="font-medium text-blue-300 text-sm">MFT Settings</h4>
              <p className="text-xs text-blue-200">Detailed test equipment configuration</p>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded border border-green-500/30">
              <CheckSquare className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <h4 className="font-medium text-green-300 text-sm">Connection Guides</h4>
              <p className="text-xs text-green-200">Step-by-step wiring instructions</p>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
              <AlertTriangle className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <h4 className="font-medium text-yellow-300 text-sm">Troubleshooting</h4>
              <p className="text-xs text-yellow-200">Common issues and solutions</p>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded border border-purple-500/30">
              <BookOpen className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <h4 className="font-medium text-purple-300 text-sm">System Types</h4>
              <p className="text-xs text-purple-200">Single-phase & three-phase guidance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-elec-yellow" />
            Progress Overview
          </CardTitle>
          <CardDescription>
            Complete all {totalSteps} steps for a thorough inspection and testing process
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
              Estimated total time: 3-5 hours (depending on installation complexity)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Important Safety Notice */}
      <Card className="border-red-500/20 bg-red-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Safety First - Read This Before Starting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-red-100">
              This is a comprehensive learning tool for apprentices. <strong>Always work under supervision</strong> and 
              follow your company's safety procedures.
            </p>
            <ul className="text-sm text-red-100 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">⚠️</span>
                Never attempt electrical testing without proper training and authorisation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">⚠️</span>
                Use only calibrated test equipment that complies with GS38
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">⚠️</span>
                Follow safe isolation procedures - proving dead is life critical
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">⚠️</span>
                When in doubt, ask your supervisor - safety is paramount
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {enhancedBS7671Steps.map((step) => (
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
                  <div className="flex flex-col">
                    {step.title}
                    <span className="text-xs text-muted-foreground font-normal">
                      {getCategoryDescription(step.category)}
                    </span>
                  </div>
                </CardTitle>
                {completedSteps.has(step.id) && (
                  <CheckSquare className="h-5 w-5 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <CardDescription className="leading-relaxed">{step.description}</CardDescription>
              
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>10-20 min</span>
                </div>
                <div className={`flex items-center gap-1 ${getDifficultyColor(step.category)}`}>
                  {getDifficultyIcon(step.category)}
                  <span>{step.category}</span>
                </div>
              </div>

              {/* Step Features */}
              <div className="flex flex-wrap gap-1">
                {step.mftSettings && (
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                    MFT Settings
                  </span>
                )}
                {step.connections && (
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                    Connections
                  </span>
                )}
                {step.troubleshooting && (
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                    Troubleshooting
                  </span>
                )}
                {step.systemTypes && (
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                    System Types
                  </span>
                )}
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
            Quick Reference & Additional Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
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
            <Link to="/apprentice/on-job-tools/supervisor-knowledge">
              <Button variant="outline" className="w-full justify-start" size="sm">
                Ask a Supervisor
              </Button>
            </Link>
            <Link to="/apprentice/on-job-tools/flashcards">
              <Button variant="outline" className="w-full justify-start" size="sm">
                Quick Reference Cards
              </Button>
            </Link>
            <Link to="/apprentice/on-job-tools/incident-logging">
              <Button variant="outline" className="w-full justify-start" size="sm">
                Incident Logging
              </Button>
            </Link>
            <Link to="/apprentice/electrical-installation-guides/bs7671-reference">
              <Button variant="outline" className="w-full justify-start" size="sm">
                BS7671 Quick Reference
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BS7671RunThrough;
