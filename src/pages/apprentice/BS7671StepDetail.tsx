
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckSquare, AlertTriangle, BookOpen, Calculator, Eye, ClipboardCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

const BS7671StepDetail = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const currentStep = parseInt(stepId || "1");
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [stepCompleted, setStepCompleted] = useState(false);

  const stepData = {
    1: {
      title: "Initial Documentation Review",
      description: "Review all available documentation before starting any physical inspection",
      category: "Documentation",
      checklist: [
        "Check for current electrical installation certificate (EIC)",
        "Review building plans and electrical drawings",
        "Identify the type of electrical installation",
        "Note any previous inspection reports",
        "Check for any specific client requirements",
        "Verify the scope of inspection required"
      ],
      safetyNotes: [
        "Ensure you have permission to access all areas",
        "Note any areas that may require special safety precautions"
      ],
      regulations: [
        "BS7671 Chapter 64 - Initial verification",
        "IET Guidance Note 3 - Inspection & Testing"
      ],
      nextSteps: "Once documentation is reviewed, proceed to external visual inspection"
    },
    2: {
      title: "Visual Inspection - External",
      description: "Conduct a thorough external visual inspection of the electrical installation",
      category: "Visual Inspection",
      checklist: [
        "Check condition of incoming supply cables",
        "Inspect meter position and sealing",
        "Examine earthing arrangements (rod, clamp, conductor)",
        "Check main equipotential bonding connections",
        "Inspect external distribution boards/enclosures",
        "Check IP ratings are appropriate for location",
        "Verify adequate ventilation around equipment"
      ],
      safetyNotes: [
        "Do not remove any supplier seals",
        "Take photos for documentation but respect privacy",
        "Report any obvious damage to supplier equipment immediately"
      ],
      regulations: [
        "BS7671 Section 512 - Operational conditions",
        "BS7671 Section 522 - Selection and erection of wiring systems"
      ],
      nextSteps: "Move to internal visual inspection of consumer units and circuits"
    },
    3: {
      title: "Visual Inspection - Internal",
      description: "Detailed visual inspection of internal electrical installations",
      category: "Visual Inspection", 
      checklist: [
        "Inspect consumer unit/distribution board condition",
        "Check all protective devices are correctly rated",
        "Verify cable types and current carrying capacity",
        "Check cable supports and routing",
        "Examine socket outlets and switches",
        "Inspect lighting circuits and fittings",
        "Check for any signs of overheating or damage",
        "Verify compliance with current regulations"
      ],
      safetyNotes: [
        "Do not remove covers while installation is live",
        "Look for signs of DIY work that may not comply",
        "Note any immediate safety concerns for urgent attention"
      ],
      regulations: [
        "BS7671 Section 526 - Electrical connections",
        "BS7671 Section 543 - Protective conductors"
      ],
      nextSteps: "Prepare for safe isolation before electrical testing"
    },
    4: {
      title: "Safe Isolation Procedures",
      description: "Critical safety step - proper isolation and proving dead",
      category: "Safety Critical",
      checklist: [
        "Identify the correct isolation point",
        "Inform all relevant parties of isolation",
        "Isolate the supply using appropriate device",
        "Lock off and tag the isolation point",
        "Test voltage indicator on known live source",
        "Test all conductors to confirm dead",
        "Test voltage indicator again on known live source",
        "Apply warning notices at isolation point"
      ],
      safetyNotes: [
        "NEVER skip proving dead - this is life critical",
        "Use appropriate PPE at all times",
        "If in doubt, get supervision immediately",
        "Follow your company's isolation procedures exactly"
      ],
      regulations: [
        "HSE GS38 - Electrical test equipment for use by electricians",
        "BS7671 Section 462 - Isolation and switching"
      ],
      nextSteps: "Begin electrical testing with continuity measurements"
    },
    5: {
      title: "Continuity Testing (R1+R2)",
      description: "Test the continuity of protective conductors and ring circuits",
      category: "Electrical Testing",
      checklist: [
        "Set up continuity tester correctly",
        "Test each protective conductor continuity",
        "Measure R1+R2 values for each circuit",
        "Check ring circuit continuity (if applicable)",
        "Record all measurements accurately",
        "Compare readings with design values",
        "Investigate any anomalous readings"
      ],
      safetyNotes: [
        "Ensure installation remains isolated during testing",
        "Double-check test lead connections",
        "Be aware of parallel paths affecting readings"
      ],
      regulations: [
        "BS7671 Section 612.2 - Continuity of protective conductors",
        "IET Guidance Note 3 - Section 10.3"
      ],
      nextSteps: "Proceed to insulation resistance testing"
    }
    // Add remaining steps...
  };

  const currentStepData = stepData[currentStep as keyof typeof stepData];
  const totalItems = currentStepData?.checklist.length || 0;
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
    }
  };

  if (!currentStepData) {
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

  return (
    <div className="space-y-6 animate-fade-in pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Step {currentStep}: {currentStepData.title}
          </h1>
          <p className="text-muted-foreground">{currentStepData.description}</p>
        </div>
        <Link to="/apprentice/on-job-tools/bs7671-runthrough">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Button>
        </Link>
      </div>

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
      {currentStepData.safetyNotes && (
        <Card className="border-red-500/20 bg-red-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Safety Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentStepData.safetyNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-red-100">
                  <span className="text-red-400 mt-1">•</span>
                  {note}
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
            {currentStepData.category} Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentStepData.checklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Checkbox
                  id={`item-${index}`}
                  checked={checkedItems.has(item)}
                  onCheckedChange={(checked) => handleChecklistChange(item, checked as boolean)}
                  className="mt-1"
                />
                <label 
                  htmlFor={`item-${index}`}
                  className={`text-sm cursor-pointer ${
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

      {/* Regulations Reference */}
      <Card className="border-blue-500/20 bg-blue-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <BookOpen className="h-5 w-5" />
            Relevant Regulations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {currentStepData.regulations.map((reg, index) => (
              <li key={index} className="text-sm text-blue-100">
                • {reg}
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
            Related Tools
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
          </div>
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
          
          {currentStep < 10 && (
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
