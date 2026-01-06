
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileInput } from "@/components/ui/mobile-input";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle, AlertTriangle, Camera, FileText, Award,
  ChevronLeft, ChevronRight, Lightbulb, Target, Sparkles
} from "lucide-react";

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

  const getRiskConfig = (level: string) => {
    switch (level) {
      case "high": return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
      case "medium": return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
      case "low": return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
      default: return { bg: 'bg-white/5', text: 'text-white/70', border: 'border-white/20' };
    }
  };

  if (assessmentComplete) {
    const completedItems = Object.keys(responses).length;
    const successRate = (completedItems / assessmentItems.length) * 100;

    return (
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <Award className="h-6 w-6 text-green-400" />
            </div>
            Assessment Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 relative">
          <div className="text-center space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 inline-block">
              <Sparkles className="h-12 w-12 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Well Done!</h3>
            <p className="text-white/60">
              You've successfully completed the {tool.title}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
                <div className="text-3xl font-bold text-elec-yellow mb-1">{completedItems}</div>
                <div className="text-sm text-white/60">Items Assessed</div>
              </div>
              <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">{successRate.toFixed(0)}%</div>
                <div className="text-sm text-white/60">Completion Rate</div>
              </div>
            </div>
          </div>

          {notes && (
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <h4 className="font-semibold text-purple-300 mb-2">Your Notes:</h4>
              <p className="text-sm text-white/70">{notes}</p>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Key Points Summary
            </h4>
            <div className="space-y-2">
              {assessmentItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/10 border border-white/10">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const riskConfig = getRiskConfig(currentItem.riskLevel);

  return (
    <div className="space-y-6">
      {/* Main Assessment Card */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <Target className="h-5 w-5 text-elec-yellow" />
              </div>
              {tool.title}
            </CardTitle>
            <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
              {currentStep + 1} / {assessmentItems.length}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-elec-yellow to-elec-yellow/70"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative">
          {/* Current Item Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={`${riskConfig.bg} ${riskConfig.text} border ${riskConfig.border}`}>
                {currentItem.riskLevel.toUpperCase()} RISK
              </Badge>
              <span className="text-xs text-white/60">{currentItem.category}</span>
            </div>

            <h3 className="text-lg font-semibold text-white">{currentItem.text}</h3>

            {currentItem.guidance && (
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-400 mb-1">Guidance</h4>
                    <p className="text-sm text-white/70">{currentItem.guidance}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Response Buttons */}
          <div className="space-y-3">
            <h4 className="font-medium text-white">Assessment Status</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleResponse("compliant")}
                className={`
                  flex items-center justify-center gap-2 p-4 rounded-xl
                  border transition-all duration-200
                  touch-manipulation active:scale-[0.98]
                  ${responses[currentItem.id] === "compliant"
                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                    : 'bg-white/10 border-white/10 hover:border-green-500/30 text-white/70'
                  }
                `}
              >
                <CheckCircle className="h-5 w-5" />
                Compliant
              </button>
              <button
                onClick={() => handleResponse("non-compliant")}
                className={`
                  flex items-center justify-center gap-2 p-4 rounded-xl
                  border transition-all duration-200
                  touch-manipulation active:scale-[0.98]
                  ${responses[currentItem.id] === "non-compliant"
                    ? 'bg-red-500/20 border-red-500/50 text-red-400'
                    : 'bg-white/10 border-white/10 hover:border-red-500/30 text-white/70'
                  }
                `}
              >
                <AlertTriangle className="h-5 w-5" />
                Non-Compliant
              </button>
              <button
                onClick={() => handleResponse("not-applicable")}
                className={`
                  flex items-center justify-center gap-2 p-4 rounded-xl
                  border transition-all duration-200
                  touch-manipulation active:scale-[0.98]
                  ${responses[currentItem.id] === "not-applicable"
                    ? 'bg-white/10 border-white/30 text-white'
                    : 'bg-white/10 border-white/10 hover:border-white/30 text-white/70'
                  }
                `}
              >
                <FileText className="h-5 w-5" />
                N/A
              </button>
            </div>
          </div>

          {/* Additional Details */}
          {responses[currentItem.id] && (
            <div className="space-y-4">
              <MobileInput
                label="Additional Details (Optional)"
                placeholder="Enter specific observations, measurements, or notes..."
                value={responses[currentItem.id]?.details || ""}
                onChange={(e) => handleResponse({
                  ...responses[currentItem.id],
                  details: e.target.value
                })}
              />

              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/20 hover:bg-white/5 hover:border-purple-500/50"
              >
                <Camera className="h-4 w-4" />
                Add Photo Evidence
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 border-white/20 hover:bg-white/5 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentStep === assessmentItems.length - 1 ? (
              <Button
                onClick={nextStep}
                disabled={!responses[currentItem.id]}
                className="bg-green-500 hover:bg-green-500/90 text-white disabled:opacity-30"
              >
                Complete Assessment
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!responses[currentItem.id]}
                className="bg-elec-yellow hover:bg-elec-yellow/90 text-black disabled:opacity-30"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notes Card */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <FileText className="h-5 w-5 text-purple-400" />
            </div>
            Assessment Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileInput
            label="General Notes"
            placeholder="Add general notes about the site conditions, any concerns, or recommendations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveAssessmentTool;
