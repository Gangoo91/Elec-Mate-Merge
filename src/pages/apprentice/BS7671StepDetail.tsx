
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckSquare, AlertTriangle, BookOpen, Calculator, Timer, ClipboardCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { enhancedBS7671Steps } from "@/data/bs7671-steps/enhancedStepData";
import TestingInstructions from "@/components/apprentice/bs7671/TestingInstructions";
import TroubleshootingGuide from "@/components/apprentice/bs7671/TroubleshootingGuide";
import SystemTypeSelector from "@/components/apprentice/bs7671/SystemTypeSelector";

const BS7671StepDetail = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const currentStep = parseInt(stepId || "1");
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [stepCompleted, setStepCompleted] = useState(false);
  const [systemType, setSystemType] = useState<string>("");
  const [installationType, setInstallationType] = useState<string>("");

  const stepData = enhancedBS7671Steps.find(step => step.id === currentStep);
  const totalItems = stepData?.checklist.length || 0;
  const completionPercentage = totalItems > 0 ? (checkedItems.size / totalItems) * 100 : 0;

  const handleChecklistChange = (item: string, checked: boolean) => {
    const newCheckedItems = new Set(checkedItems);
    if (checked) {
      newCheckedItems.add(item);
    } else {
      newCheckedItems.delete(item);
    }
    setCheckedItems(newCheckedItems);
  };

  const markStepComplete = () => {
    if (completionPercentage === 100) {
      setStepCompleted(true);
      // In a real app, this would save to localStorage or database
      console.log(`Step ${currentStep} completed with system: ${systemType}, installation: ${installationType}`);
    }
  };

  const handleSystemSelection = (system: string, installation: string) => {
    setSystemType(system);
    setInstallationType(installation);
  };

  if (!stepData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="border-red-500/20 bg-red-900/10">
          <CardContent className="pt-6">
            <p className="text-center text-red-400">Step not found</p>
            <Link to="/apprentice/on-job-tools/bs7671-runthrough">
              <Button className="w-full mt-4" variant="outline">
                Return to Overview
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Safety Critical": return "text-red-400 bg-red-500/10 border-red-500/30";
      case "Electrical Testing": return "text-blue-400 bg-blue-500/10 border-blue-500/30";
      case "Visual Inspection": return "text-green-400 bg-green-500/10 border-green-500/30";
      case "Documentation": return "text-purple-400 bg-purple-500/10 border-purple-500/30";
      default: return "text-elec-yellow bg-elec-yellow/10 border-elec-yellow/30";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              Step {currentStep}: {stepData.title}
            </h1>
            <div className={`px-2 py-1 rounded text-xs border ${getCategoryColor(stepData.category)}`}>
              {stepData.category}
            </div>
          </div>
          <p className="text-muted-foreground">{stepData.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Timer className="h-4 w-4" />
            <span>Estimated time: 10-20 minutes</span>
          </div>
        </div>
        <Link to="/apprentice/on-job-tools/bs7671-runthrough">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Button>
        </Link>
      </div>

      {/* System Type Selection - Show for first step or testing steps */}
      {(currentStep === 1 || stepData.category === "Electrical Testing") && (
        <SystemTypeSelector onSelectionChange={handleSystemSelection} />
      )}

      {/* Progress */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg">Step Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Checklist Items</span>
              <span>{checkedItems.size} of {totalItems}</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Safety Notes */}
      {stepData.safetyNotes && stepData.safetyNotes.length > 0 && (
        <Card className="border-red-500/20 bg-red-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Safety Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {stepData.safetyNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-red-100">
                  <span className="text-red-400 mt-1">⚠️</span>
                  {note}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Testing Instructions - MFT Settings, Connections, Expected Results */}
      <TestingInstructions stepData={stepData} />

      {/* Installation Type Specific Guidance */}
      {stepData.installationTypes && installationType && (
        <Card className="border-indigo-500/30 bg-indigo-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-300">
              <BookOpen className="h-5 w-5" />
              {installationType.charAt(0).toUpperCase() + installationType.slice(1)} Installation Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {stepData.installationTypes[installationType as keyof typeof stepData.installationTypes]?.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-indigo-100">
                  <span className="text-indigo-400 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Checklist */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
            {stepData.category} Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stepData.checklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Checkbox
                  id={`item-${index}`}
                  checked={checkedItems.has(item)}
                  onCheckedChange={(checked) => handleChecklistChange(item, checked as boolean)}
                  className="mt-1"
                />
                <label 
                  htmlFor={`item-${index}`}
                  className={`text-sm cursor-pointer leading-relaxed ${
                    checkedItems.has(item) ? 'text-green-400 line-through' : ''
                  }`}
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting Guide */}
      <TroubleshootingGuide stepData={stepData} />

      {/* Regulations Reference */}
      <Card className="border-blue-500/20 bg-blue-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <BookOpen className="h-5 w-5" />
            Relevant Regulations & Standards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {stepData.regulations.map((reg, index) => (
              <li key={index} className="text-sm text-blue-100 flex items-start gap-2">
                <span className="text-blue-400 mt-1">📋</span>
                {reg}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Related Tools */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Related Tools & Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentStep >= 5 && (
              <Link to="/apprentice/on-job-tools/testing-procedures">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Testing Procedures Guide
                </Button>
              </Link>
            )}
            <Link to="/apprentice/on-job-tools/calculations">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Electrical Calculations
              </Button>
            </Link>
            <Link to="/apprentice/on-job-tools/supervisor-knowledge">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Ask a Supervisor
              </Button>
            </Link>
            <Link to="/apprentice/on-job-tools/flashcards">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Quick Reference Cards
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-300">
            <ArrowRight className="h-5 w-5" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-200">{stepData.nextSteps}</p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div>
          {currentStep > 1 && (
            <Link to={`/apprentice/on-job-tools/bs7671-runthrough/step/${currentStep - 1}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
            </Link>
          )}
        </div>
        
        <div className="flex gap-2">
          {completionPercentage === 100 && !stepCompleted && (
            <Button onClick={markStepComplete} className="bg-green-600 hover:bg-green-700">
              <CheckSquare className="mr-2 h-4 w-4" />
              Mark Complete
            </Button>
          )}
          
          {currentStep < enhancedBS7671Steps.length && (
            <Link to={`/apprentice/on-job-tools/bs7671-runthrough/step/${currentStep + 1}`}>
              <Button>
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BS7671StepDetail;
