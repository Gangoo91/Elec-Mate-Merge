import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Zap, Home, Shield, Wrench, ArrowRight, CheckCircle } from "lucide-react";

const QuickToolFinder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: "workType",
      title: "What type of work are you doing?",
      icon: Wrench,
      options: [
        { id: "installation", label: "New Installation", description: "Installing new circuits, outlets, or fixtures" },
        { id: "maintenance", label: "Maintenance", description: "Routine checks, cleaning, and minor repairs" },
        { id: "troubleshooting", label: "Troubleshooting", description: "Finding and fixing electrical faults" },
        { id: "testing", label: "Testing & Certification", description: "EICR, PAT testing, or compliance checks" }
      ]
    },
    {
      id: "environment",
      title: "Where are you working?",
      icon: Home,
      options: [
        { id: "domestic", label: "Domestic Property", description: "Houses, flats, residential buildings" },
        { id: "commercial", label: "Commercial Building", description: "Offices, shops, restaurants" },
        { id: "industrial", label: "Industrial Site", description: "Factories, warehouses, manufacturing" },
        { id: "outdoor", label: "Outdoor/External", description: "Garden lighting, external supplies" }
      ]
    },
    {
      id: "voltage",
      title: "What voltage are you working with?",
      icon: Zap,
      options: [
        { id: "low", label: "Low Voltage (12-48V)", description: "LED lighting, doorbells, garden lights" },
        { id: "mains", label: "Mains Voltage (230V)", description: "Standard household circuits" },
        { id: "three-phase", label: "Three Phase (400V)", description: "Commercial/industrial supplies" },
        { id: "mixed", label: "Mixed Voltages", description: "Working with multiple voltage levels" }
      ]
    },
    {
      id: "urgency",
      title: "How urgent is this work?",
      icon: Shield,
      options: [
        { id: "emergency", label: "Emergency Call-out", description: "Immediate safety concern or power loss" },
        { id: "planned", label: "Planned Work", description: "Scheduled installation or maintenance" },
        { id: "diagnostic", label: "Diagnostic Only", description: "Initial assessment or quote preparation" },
        { id: "routine", label: "Routine Maintenance", description: "Regular servicing or inspection" }
      ]
    }
  ];

  const getRecommendations = () => {
    const { workType, environment, voltage, urgency } = selections;
    
    let recommendations: { name: string; priority: "Essential" | "Recommended" | "Optional"; reason: string }[] = [];

    // Base tools for all work
    recommendations.push(
      { name: "Insulated Screwdriver Set", priority: "Essential", reason: "Required for safe electrical work" },
      { name: "Voltage Tester", priority: "Essential", reason: "Safety requirement for all electrical work" }
    );

    // Work type specific
    if (workType === "installation") {
      recommendations.push(
        { name: "Wire Strippers", priority: "Essential", reason: "Needed for new cable connections" },
        { name: "Cable Cutters", priority: "Essential", reason: "Required for cutting new cables" },
        { name: "Crimping Tool", priority: "Recommended", reason: "For professional terminal connections" }
      );
    }

    if (workType === "troubleshooting") {
      recommendations.push(
        { name: "Multimeter", priority: "Essential", reason: "Essential for fault finding" },
        { name: "Clamp Meter", priority: "Recommended", reason: "For measuring current without disconnection" },
        { name: "Cable Detector", priority: "Recommended", reason: "Helps locate hidden cables" }
      );
    }

    if (workType === "testing") {
      recommendations.push(
        { name: "Insulation Tester", priority: "Essential", reason: "Required for EICR testing" },
        { name: "RCD Tester", priority: "Essential", reason: "Mandatory for safety testing" },
        { name: "Earth Loop Impedance Tester", priority: "Essential", reason: "Required for certification" }
      );
    }

    // Environment specific
    if (environment === "industrial") {
      recommendations.push(
        { name: "Lock-out Tag-out Kit", priority: "Essential", reason: "Safety requirement for industrial work" },
        { name: "Arc Flash PPE", priority: "Essential", reason: "Protection against arc flash incidents" }
      );
    }

    if (environment === "outdoor") {
      recommendations.push(
        { name: "Waterproof Tool Bag", priority: "Recommended", reason: "Protection from weather" },
        { name: "Ground Spike Kit", priority: "Recommended", reason: "For outdoor earthing requirements" }
      );
    }

    // Voltage specific
    if (voltage === "three-phase") {
      recommendations.push(
        { name: "Phase Rotation Tester", priority: "Essential", reason: "Required for three-phase installations" },
        { name: "High Voltage Detector", priority: "Essential", reason: "Safety for higher voltage work" }
      );
    }

    // Urgency specific
    if (urgency === "emergency") {
      recommendations.push(
        { name: "Torch/Headlamp", priority: "Essential", reason: "Emergency work often in poor lighting" },
        { name: "Socket Tester", priority: "Essential", reason: "Quick fault identification" }
      );
    }

    return recommendations.slice(0, 8); // Limit to 8 recommendations
  };

  const handleSelection = (questionId: string, optionId: string) => {
    setSelections({ ...selections, [questionId]: optionId });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setSelections({});
    setShowResults(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Essential": return "bg-red-600/90 text-white border-red-400";
      case "Recommended": return "bg-orange-600/90 text-white border-orange-400";
      case "Optional": return "bg-green-600/90 text-white border-green-400";
      default: return "bg-blue-600/90 text-white border-blue-400";
    }
  };

  if (showResults) {
    const recommendations = getRecommendations();
    return (
      <Card className="bg-gradient-to-br from-green-500/5 via-transparent to-teal-500/5 border-green-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600/20 text-green-400">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-white">Your Tool Recommendations</CardTitle>
                <p className="text-white/80 text-sm">Based on your specific requirements</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={reset}
              className="border-white/20 text-white hover:border-green-500/50"
            >
              Start Over
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg bg-elec-card/30 border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white">{rec.name}</h4>
                  <Badge className={getPriorityColor(rec.priority)}>
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-white/80">{rec.reason}</p>
              </div>
            ))}
          </div>
          
          <div className="p-4 rounded-lg bg-green-600/10 border border-green-500/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <h5 className="font-medium text-white mb-1">Your Selections</h5>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selections).map(([key, value]) => {
                    const question = questions.find(q => q.id === key);
                    const option = question?.options.find(o => o.id === value);
                    return (
                      <Badge key={key} variant="outline" className="border-green-500/30 text-green-400">
                        {option?.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentStep];
  const Icon = currentQuestion.icon;

  return (
    <Card className="bg-gradient-to-br from-green-500/5 via-transparent to-teal-500/5 border-green-500/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-600/20 text-green-400">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-white">Quick Tool Finder</CardTitle>
            <p className="text-white/80 text-sm">
              Answer a few questions to get personalised tool recommendations
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/80">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-green-400" />
            <h3 className="text-xl font-semibold text-white">{currentQuestion.title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-wrap">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                onClick={() => handleSelection(currentQuestion.id, option.id)}
                className="h-auto p-4 border-white/20 text-left hover:border-green-500/50 hover:bg-green-500/10 break-words overflow-hidden"
              >
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white">{option.label}</span>
                    <ArrowRight className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-sm text-white/80">{option.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {currentStep > 0 && (
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(currentStep - 1)}
              className="border-white/20 text-white hover:border-green-500/50"
            >
              Previous Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickToolFinder;