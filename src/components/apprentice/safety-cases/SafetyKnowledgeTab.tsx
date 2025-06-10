
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  Zap,
  HardHat,
  Eye,
  FileText
} from "lucide-react";

interface KnowledgeModule {
  id: string;
  title: string;
  description: string;
  content: string[];
  keyPoints: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  icon: any;
  category: "safety" | "regulations" | "procedures" | "equipment";
}

const safetyModules: KnowledgeModule[] = [
  {
    id: "electrical-hazards",
    title: "Electrical Hazards Recognition",
    description: "Learn to identify and assess common electrical hazards in the workplace",
    content: [
      "Electrical shock occurs when current passes through the body",
      "Arc flash can cause severe burns and eye damage",
      "Electrical fires can spread rapidly and require special extinguishing methods",
      "Overhead power lines pose significant risks to mobile equipment",
      "Wet conditions dramatically increase electrical hazards"
    ],
    keyPoints: [
      "Always assume electrical equipment is live until proven otherwise",
      "Maintain safe working distances from overhead lines",
      "Use appropriate PPE for electrical work",
      "Never work on wet electrical equipment"
    ],
    difficulty: "Beginner",
    estimatedTime: "15 minutes",
    icon: Zap,
    category: "safety"
  },
  {
    id: "ppe-requirements",
    title: "Personal Protective Equipment",
    description: "Understanding PPE requirements for electrical work",
    content: [
      "Safety helmets must meet BS EN 397 standards",
      "Insulated gloves should be tested regularly",
      "Safety footwear must have electrical hazard protection",
      "Eye protection is essential for arc flash protection",
      "High-visibility clothing is required in many work environments"
    ],
    keyPoints: [
      "Inspect PPE before each use",
      "Replace damaged PPE immediately",
      "Store PPE properly to maintain effectiveness",
      "Understand the limitations of your PPE"
    ],
    difficulty: "Beginner",
    estimatedTime: "12 minutes",
    icon: HardHat,
    category: "equipment"
  },
  {
    id: "isolation-procedures",
    title: "Safe Isolation Procedures",
    description: "Step-by-step guide to safely isolating electrical systems",
    content: [
      "Identify the correct isolation point",
      "Secure the isolation with locks and tags",
      "Test that the isolation is effective",
      "Issue permits to work where required",
      "Monitor the isolation throughout the work"
    ],
    keyPoints: [
      "Follow the isolation procedure exactly",
      "Never bypass safety devices",
      "Ensure all team members understand the isolation",
      "Test equipment is proved before and after testing"
    ],
    difficulty: "Intermediate",
    estimatedTime: "20 minutes",
    icon: Shield,
    category: "procedures"
  },
  {
    id: "risk-assessment",
    title: "Risk Assessment Process",
    description: "How to conduct effective risk assessments for electrical work",
    content: [
      "Identify all potential hazards in the work area",
      "Assess the likelihood and severity of each hazard",
      "Implement control measures to reduce risks",
      "Monitor and review the effectiveness of controls",
      "Document the assessment and communicate findings"
    ],
    keyPoints: [
      "Risk assessment is a legal requirement",
      "Involve the work team in the assessment process",
      "Review assessments when conditions change",
      "Use the hierarchy of controls"
    ],
    difficulty: "Intermediate",
    estimatedTime: "25 minutes",
    icon: FileText,
    category: "procedures"
  },
  {
    id: "emergency-procedures",
    title: "Emergency Response Procedures",
    description: "What to do in electrical emergency situations",
    content: [
      "Electrical shock response and first aid",
      "Fire emergency procedures for electrical fires",
      "Evacuation procedures for electrical incidents",
      "Reporting requirements for electrical accidents",
      "Emergency contact procedures"
    ],
    keyPoints: [
      "Never touch someone receiving an electrical shock",
      "Turn off power at source if safely possible",
      "Call emergency services immediately",
      "Provide first aid only if trained and safe to do so"
    ],
    difficulty: "Beginner",
    estimatedTime: "18 minutes",
    icon: AlertTriangle,
    category: "procedures"
  },
  {
    id: "regulations-overview",
    title: "Key Electrical Regulations",
    description: "Overview of essential electrical safety regulations and standards",
    content: [
      "Health and Safety at Work Act 1974",
      "Electricity at Work Regulations 1989",
      "BS 7671 Wiring Regulations",
      "Construction (Design and Management) Regulations",
      "Personal Protective Equipment Regulations"
    ],
    keyPoints: [
      "Regulations are legally binding",
      "Standards provide guidance on compliance",
      "Regular updates to regulations occur",
      "Competence requirements are specified"
    ],
    difficulty: "Advanced",
    estimatedTime: "30 minutes",
    icon: BookOpen,
    category: "regulations"
  }
];

const categoryColors = {
  safety: "bg-red-500/10 text-red-400 border-red-500/20",
  regulations: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  procedures: "bg-green-500/10 text-green-400 border-green-500/20",
  equipment: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
};

const difficultyColors = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/20"
};

const SafetyKnowledgeTab = () => {
  const [selectedModule, setSelectedModule] = useState<KnowledgeModule | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const handleBackToList = () => {
    setSelectedModule(null);
  };

  if (selectedModule) {
    const IconComponent = selectedModule.icon;
    const isCompleted = completedModules.includes(selectedModule.id);

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <Button 
            variant="outline" 
            onClick={handleBackToList}
            className="self-start px-3 py-2 h-auto text-sm"
          >
            ← Back to Modules
          </Button>
          {isCompleted && (
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20 self-start sm:self-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>

        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
              <div className="p-3 rounded-lg bg-elec-yellow/20 self-start">
                <IconComponent className="h-6 w-6 text-elec-yellow" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg sm:text-xl mb-2 leading-tight">
                  {selectedModule.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3">
                  {selectedModule.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={difficultyColors[selectedModule.difficulty]}>
                    {selectedModule.difficulty}
                  </Badge>
                  <Badge className={categoryColors[selectedModule.category]}>
                    {selectedModule.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {selectedModule.estimatedTime}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">
                Learning Content
              </h3>
              <div className="space-y-3">
                {selectedModule.content.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-3 sm:p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/10"
                  >
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">
                Key Safety Points
              </h3>
              <div className="grid gap-3">
                {selectedModule.keyPoints.map((point, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 sm:p-4 bg-elec-yellow/5 rounded-lg border border-elec-yellow/20"
                  >
                    <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <p className="text-sm sm:text-base leading-relaxed text-white">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {!isCompleted && (
              <div className="pt-4 border-t border-elec-yellow/20">
                <Button 
                  onClick={() => handleModuleComplete(selectedModule.id)}
                  className="w-full sm:w-auto bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium py-2.5 px-6"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center py-4 sm:py-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Safety Knowledge Base
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto px-4">
          Comprehensive safety modules covering essential electrical safety knowledge. 
          Each module includes practical guidance and key safety points.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {safetyModules.map((module) => {
          const IconComponent = module.icon;
          const isCompleted = completedModules.includes(module.id);

          return (
            <Card 
              key={module.id}
              className="border-elec-yellow/20 bg-elec-gray/30 hover:bg-elec-gray/50 transition-all duration-200 cursor-pointer group"
              onClick={() => setSelectedModule(module)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="p-3 rounded-lg bg-elec-yellow/20 group-hover:bg-elec-yellow/30 transition-colors flex-shrink-0">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                          {module.title}
                        </h3>
                        {isCompleted && (
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20 self-start">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3">
                        {module.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge className={difficultyColors[module.difficulty]}>
                          {module.difficulty}
                        </Badge>
                        <Badge className={categoryColors[module.category]}>
                          {module.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {module.estimatedTime}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-elec-yellow/30 bg-elec-yellow/5">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="p-3 rounded-lg bg-elec-yellow/20 self-start sm:self-center">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Progress Tracking
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3">
                You've completed {completedModules.length} of {safetyModules.length} safety modules. 
                Keep learning to build your electrical safety knowledge.
              </p>
              <div className="w-full bg-elec-dark/50 rounded-full h-2 sm:h-3">
                <div 
                  className="bg-elec-yellow rounded-full h-2 sm:h-3 transition-all duration-300"
                  style={{ width: `${(completedModules.length / safetyModules.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyKnowledgeTab;
