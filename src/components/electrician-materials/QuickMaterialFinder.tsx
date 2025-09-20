import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Zap, Home, Shield, Package, ArrowRight, CheckCircle } from "lucide-react";

const QuickMaterialFinder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: "projectType",
      title: "What type of electrical project?",
      icon: Package,
      options: [
        { id: "rewire", label: "Full Rewire", description: "Complete electrical installation replacement" },
        { id: "extension", label: "Extension/Addition", description: "New circuits for home extensions" },
        { id: "upgrade", label: "Consumer Unit Upgrade", description: "18th Edition compliance upgrade" },
        { id: "circuits", label: "Additional Circuits", description: "New sockets, lights, or dedicated circuits" }
      ]
    },
    {
      id: "environment",
      title: "Installation environment?",
      icon: Home,
      options: [
        { id: "domestic", label: "Domestic Property", description: "Houses, flats, residential buildings" },
        { id: "commercial", label: "Commercial Building", description: "Offices, shops, restaurants" },
        { id: "industrial", label: "Industrial Site", description: "Factories, warehouses, manufacturing" },
        { id: "outdoor", label: "Outdoor Installation", description: "External supplies, garden lighting" }
      ]
    },
    {
      id: "load",
      title: "Expected electrical load?",
      icon: Zap,
      options: [
        { id: "light", label: "Light Load (Under 40A)", description: "Basic lighting and socket circuits" },
        { id: "medium", label: "Medium Load (40-100A)", description: "Standard domestic with electric shower" },
        { id: "heavy", label: "Heavy Load (100A+)", description: "Multiple high-power appliances" },
        { id: "three-phase", label: "Three-Phase Required", description: "Industrial equipment or large loads" }
      ]
    },
    {
      id: "protection",
      title: "Special protection requirements?",
      icon: Shield,
      options: [
        { id: "standard", label: "Standard Protection", description: "Basic RCD and MCB protection" },
        { id: "surge", label: "Surge Protection", description: "SPD for sensitive equipment" },
        { id: "fire", label: "Fire Resistance", description: "Fire-rated cables and systems" },
        { id: "zones", label: "Special Locations", description: "Bathrooms, swimming pools, medical" }
      ]
    }
  ];

  const getRecommendations = () => {
    const { projectType, environment, load, protection } = selections;
    
    let recommendations: { name: string; priority: "Critical" | "Essential" | "Recommended"; reason: string; price: string }[] = [];

    // Base materials for all projects
    recommendations.push(
      { name: "Consumer Unit (suitable capacity)", priority: "Critical", reason: "Central protection and distribution", price: "£80-300" },
      { name: "RCD Protection", priority: "Critical", reason: "Earth leakage protection requirement", price: "£25-60" }
    );

    // Project type specific
    if (projectType === "rewire") {
      recommendations.push(
        { name: "2.5mm² Twin & Earth Cable", priority: "Critical", reason: "Ring main circuits", price: "£45-65/50m" },
        { name: "1.5mm² Twin & Earth Cable", priority: "Critical", reason: "Lighting circuits", price: "£30-45/50m" },
        { name: "Main Earthing Conductor", priority: "Critical", reason: "Safety earthing system", price: "£20-40" }
      );
    }

    if (projectType === "extension") {
      recommendations.push(
        { name: "Submain Cable (SWA)", priority: "Critical", reason: "Supply to extension", price: "£80-150/25m" },
        { name: "RCBO Protection", priority: "Essential", reason: "Individual circuit protection", price: "£15-25 each" }
      );
    }

    if (projectType === "upgrade") {
      recommendations.push(
        { name: "18th Edition Consumer Unit", priority: "Critical", reason: "Regulation compliance", price: "£120-250" },
        { name: "Type A RCDs", priority: "Essential", reason: "Electronic load compatibility", price: "£40-70" }
      );
    }

    // Environment specific
    if (environment === "outdoor") {
      recommendations.push(
        { name: "IP65 Rated Enclosures", priority: "Critical", reason: "Weather protection", price: "£30-80" },
        { name: "UV Resistant Cable", priority: "Essential", reason: "Outdoor durability", price: "£50-90/25m" }
      );
    }

    if (environment === "industrial") {
      recommendations.push(
        { name: "Steel Wire Armoured Cable", priority: "Critical", reason: "Mechanical protection", price: "£120-200/50m" },
        { name: "Industrial MCCBs", priority: "Critical", reason: "High fault current rating", price: "£150-300" }
      );
    }

    // Load specific
    if (load === "three-phase") {
      recommendations.push(
        { name: "3-Phase Distribution Board", priority: "Critical", reason: "Three-phase supply distribution", price: "£200-500" },
        { name: "Phase Monitoring Relay", priority: "Essential", reason: "Phase sequence protection", price: "£80-150" }
      );
    }

    if (load === "heavy") {
      recommendations.push(
        { name: "Large Capacity Meter Tails", priority: "Critical", reason: "High current capacity", price: "£40-80" },
        { name: "Enhanced Earthing System", priority: "Essential", reason: "Safety for high loads", price: "£60-120" }
      );
    }

    // Protection specific
    if (protection === "surge") {
      recommendations.push(
        { name: "Type 2 Surge Protection Device", priority: "Essential", reason: "Equipment protection", price: "£80-150" }
      );
    }

    if (protection === "fire") {
      recommendations.push(
        { name: "Fire Resistant Cables", priority: "Critical", reason: "Fire safety systems", price: "£100-180/50m" }
      );
    }

    if (protection === "zones") {
      recommendations.push(
        { name: "IP44+ Rated Equipment", priority: "Critical", reason: "Special location requirements", price: "£40-100" },
        { name: "Supplementary Bonding", priority: "Essential", reason: "Additional safety measures", price: "£25-50" }
      );
    }

    return recommendations.slice(0, 8);
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
      case "Critical": return "bg-red-600/90 text-white border-red-400";
      case "Essential": return "bg-orange-600/90 text-white border-orange-400";
      case "Recommended": return "bg-green-600/90 text-white border-green-400";
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
                <CardTitle className="text-white">Your Material Recommendations</CardTitle>
                <p className="text-white/80 text-sm">Based on your project requirements</p>
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
                <p className="text-sm text-white/80 mb-2">{rec.reason}</p>
                <p className="text-sm text-elec-yellow font-medium">{rec.price}</p>
              </div>
            ))}
          </div>
          
          <div className="p-4 rounded-lg bg-green-600/10 border border-green-500/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <h5 className="font-medium text-white mb-1">Your Project Requirements</h5>
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

          <div className="p-4 rounded-lg bg-green-600/10 border border-green-500/20">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <h5 className="font-medium text-white mb-1">BS 7671 Compliance Note</h5>
                <p className="text-sm text-white/80">
                  All recommendations align with 18th Edition wiring regulations. 
                  Ensure proper installation and testing procedures for full compliance.
                </p>
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
            <CardTitle className="text-white">Quick Material Finder</CardTitle>
            <p className="text-white/80 text-sm">
              Answer a few questions to get personalised material recommendations
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                onClick={() => handleSelection(currentQuestion.id, option.id)}
                className="h-auto p-4 border-white/20 text-left hover:border-green-500/50 hover:bg-green-500/10"
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

export default QuickMaterialFinder;