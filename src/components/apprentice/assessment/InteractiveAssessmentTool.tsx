
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Camera, FileText, Award } from "lucide-react";

interface AssessmentItem {
  id: string;
  text: string;
  category: string;
  riskLevel: "low" | "medium" | "high";
  guidance?: string;
  required: boolean;
}

interface AssessmentTool {
  id: string;
  title: string;
  description: string;
  items: string[];
}

interface InteractiveAssessmentToolProps {
  tool: AssessmentTool;
  onComplete: () => void;
  isCompleted: boolean;
}

const InteractiveAssessmentTool = ({ tool, onComplete, isCompleted }: InteractiveAssessmentToolProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [notes, setNotes] = useState("");
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  // Convert basic items to detailed assessment items
  const assessmentItems: AssessmentItem[] = tool.items.map((item, index) => ({
    id: `item-${index}`,
    text: item,
    category: getItemCategory(item),
    riskLevel: getRiskLevel(item),
    guidance: getGuidanceForItem(item),
    required: true
  }));

  function getItemCategory(item: string): string {
    if (item.toLowerCase().includes("ppe")) return "Personal Protective Equipment";
    if (item.toLowerCase().includes("hazard")) return "Hazard Identification";
    if (item.toLowerCase().includes("electrical")) return "Electrical Safety";
    if (item.toLowerCase().includes("emergency")) return "Emergency Procedures";
    if (item.toLowerCase().includes("lighting")) return "Environmental Conditions";
    if (item.toLowerCase().includes("access")) return "Site Access";
    return "General Safety";
  }

  function getRiskLevel(item: string): "low" | "medium" | "high" {
    if (item.toLowerCase().includes("electrical") || item.toLowerCase().includes("hazard")) return "high";
    if (item.toLowerCase().includes("emergency") || item.toLowerCase().includes("isolation")) return "medium";
    return "low";
  }

  function getGuidanceForItem(item: string): string {
    const guidanceMap: Record<string, string> = {
      "ppe requirement assessment": "Ensure all required PPE is available, in good condition, and appropriate for the task. Check for hard hat, safety glasses, insulated gloves, and appropriate footwear.",
      "electrical hazard identification": "Look for exposed conductors, damaged equipment, water ingress, overhead power lines, and underground cables. Use appropriate detection equipment.",
      "safe isolation verification": "Follow the 5-step safe isolation procedure: identify, isolate, secure, test, and retest. Use approved voltage indicators and proving units.",
      "emergency procedure review": "Confirm location of emergency stops, first aid kits, fire extinguishers, and emergency contact numbers. Ensure all team members know evacuation routes.",
      "working space adequacy": "Verify minimum working distances as per BS 7671. Ensure adequate space for safe movement and equipment operation.",
      "lighting conditions": "Assess natural and artificial lighting. Minimum 500 lux for electrical work. Consider portable lighting for confined spaces.",
      "weather considerations": "Check for rain, wind, temperature extremes. Electrical work should not be performed in wet conditions unless specifically protected.",
      "access route safety": "Ensure clear, stable access routes. Check for trip hazards, adequate lighting, and secure barriers where needed."
    };
    
    return guidanceMap[item.toLowerCase()] || "Follow relevant safety procedures and regulations for this assessment item.";
  }

  const currentItem = assessmentItems[currentStep];
  const progress = ((currentStep + 1) / assessmentItems.length) * 100;

  const handleResponse = (response: any) => {
    setResponses({
      ...responses,
      [currentItem.id]: response
    });
  };

  const nextStep = () => {
    if (currentStep < assessmentItems.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setAssessmentComplete(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
    setAssessmentComplete(true);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "text-red-400 bg-red-400/10";
      case "medium": return "text-yellow-400 bg-yellow-400/10";
      case "low": return "text-green-400 bg-green-400/10";
      default: return "text-elec-yellow bg-elec-yellow/10";
    }
  };

  if (assessmentComplete) {
    const completedItems = Object.keys(responses).length;
    const successRate = (completedItems / assessmentItems.length) * 100;
    
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Award className="h-6 w-6" />
            Assessment Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <h3 className="text-2xl font-bold text-white">Well Done!</h3>
            <p className="text-muted-foreground">
              You've successfully completed the {tool.title}
            </p>
            
            <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-elec-yellow">{completedItems}</div>
                  <div className="text-sm text-muted-foreground">Items Assessed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{successRate.toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
              </div>
            </div>
          </div>

          {notes && (
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Your Notes:</h4>
              <p className="text-sm text-muted-foreground">{notes}</p>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-semibold text-white">Key Points Summary:</h4>
            <ul className="space-y-2">
              {assessmentItems.map((item, index) => (
                <li key={item.id} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow">{tool.title}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {assessmentItems.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded ${getRiskColor(currentItem.riskLevel)}`}>
                {currentItem.riskLevel.toUpperCase()} RISK
              </span>
              <span className="text-xs text-muted-foreground">{currentItem.category}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-white">{currentItem.text}</h3>
            
            {currentItem.guidance && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-400 mb-1">Guidance</h4>
                    <p className="text-sm text-muted-foreground">{currentItem.guidance}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-white">Assessment Status</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant={responses[currentItem.id] === "compliant" ? "default" : "outline"}
                onClick={() => handleResponse("compliant")}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Compliant
              </Button>
              <Button
                variant={responses[currentItem.id] === "non-compliant" ? "destructive" : "outline"}
                onClick={() => handleResponse("non-compliant")}
                className="flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Non-Compliant
              </Button>
              <Button
                variant={responses[currentItem.id] === "not-applicable" ? "secondary" : "outline"}
                onClick={() => handleResponse("not-applicable")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                N/A
              </Button>
            </div>
          </div>

          {responses[currentItem.id] && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Additional Details (Optional)
                </label>
                <Input
                  placeholder="Enter specific observations, measurements, or notes..."
                  value={responses[currentItem.id]?.details || ""}
                  onChange={(e) => handleResponse({
                    ...responses[currentItem.id],
                    details: e.target.value
                  })}
                />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Add Photo Evidence
              </Button>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            {currentStep === assessmentItems.length - 1 ? (
              <Button
                onClick={nextStep}
                disabled={!responses[currentItem.id]}
                className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              >
                Complete Assessment
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!responses[currentItem.id]}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg">Assessment Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add general notes about the site conditions, any concerns, or recommendations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveAssessmentTool;
