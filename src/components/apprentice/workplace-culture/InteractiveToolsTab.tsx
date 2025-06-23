
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, MessageSquare, Users, Zap, PlayCircle, CheckSquare, ArrowLeft } from "lucide-react";
import CommunicationSimulator from "./interactive-tools/CommunicationSimulator";
import CulturalAwarenessQuiz from "./interactive-tools/CulturalAwarenessQuiz";
import ProfessionalLanguageBuilder from "./interactive-tools/ProfessionalLanguageBuilder";

type ActiveTool = 'communication-simulator' | 'cultural-quiz' | 'language-builder' | null;

const InteractiveToolsTab = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);

  const interactiveTools = [
    {
      id: 'communication-simulator' as const,
      title: "Communication Scenario Simulator",
      description: "Practice difficult workplace conversations in a safe environment",
      features: ["20+ real scenarios", "Multiple response options", "Expert feedback", "Progress tracking"],
      difficulty: "Intermediate",
      duration: "15-30 mins per scenario",
      icon: MessageSquare,
      status: "Available"
    },
    {
      id: 'cultural-quiz' as const,
      title: "Cultural Awareness Quiz",
      description: "Test your understanding of UK workplace culture and electrical industry norms",
      features: ["50 questions", "Instant scoring", "Detailed explanations", "Retake unlimited"],
      difficulty: "Beginner",
      duration: "20 mins",
      icon: CheckSquare,
      status: "Available"
    },
    {
      title: "Virtual Site Meeting",
      description: "Experience a typical site briefing meeting with interactive participation",
      features: ["3D environment", "Voice recognition", "Role-playing", "Safety focus"],
      difficulty: "Advanced",
      duration: "45 mins",
      icon: Users,
      status: "Coming Soon"
    },
    {
      id: 'language-builder' as const,
      title: "Professional Language Builder",
      description: "Build your electrical industry vocabulary and communication skills",
      features: ["500+ terms", "Audio pronunciation", "Context examples", "Daily challenges"],
      difficulty: "Beginner",
      duration: "10 mins daily",
      icon: Lightbulb,
      status: "Available"
    }
  ];

  const practiceScenarios = [
    {
      title: "Asking for Help from a Senior Electrician",
      situation: "You're stuck on a complex three-phase installation and need guidance",
      learningOutcome: "Learn how to ask for help professionally without appearing incompetent"
    },
    {
      title: "Dealing with an Impatient Client",
      situation: "A homeowner is frustrated about work taking longer than expected",
      learningOutcome: "Develop skills to manage client expectations and maintain professionalism"
    },
    {
      title: "Reporting a Safety Concern",
      situation: "You notice unsafe working conditions but need to speak up to senior staff",
      learningOutcome: "Practice assertive communication for safety-critical situations"
    },
    {
      title: "Team Meeting Participation",
      situation: "Weekly site meeting where you need to contribute and ask questions",
      learningOutcome: "Build confidence in group settings and professional meetings"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Coming Soon": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleStartTool = (toolId: string) => {
    setActiveTool(toolId as ActiveTool);
  };

  const handleBackToTools = () => {
    setActiveTool(null);
  };

  // Render active tool
  if (activeTool === 'communication-simulator') {
    return <CommunicationSimulator onBack={handleBackToTools} />;
  }

  if (activeTool === 'cultural-quiz') {
    return <CulturalAwarenessQuiz onBack={handleBackToTools} />;
  }

  if (activeTool === 'language-builder') {
    return <ProfessionalLanguageBuilder onBack={handleBackToTools} />;
  }

  // Default tools overview
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Learning Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Hands-on tools to practice workplace communication and cultural awareness in realistic scenarios. 
            Build confidence through interactive simulations and assessments.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {interactiveTools.map((tool, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-elec-yellow/10">
                    <tool.icon className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{tool.title}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge className={getDifficultyColor(tool.difficulty)} variant="outline">
                        {tool.difficulty}
                      </Badge>
                      <Badge className={getStatusColor(tool.status)} variant="outline">
                        {tool.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">{tool.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-green-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-elec-yellow/20">
                  <span className="text-xs text-muted-foreground">{tool.duration}</span>
                  <Button 
                    size="sm" 
                    disabled={tool.status === "Coming Soon"}
                    className="h-8"
                    onClick={() => 'id' in tool && handleStartTool(tool.id)}
                  >
                    <PlayCircle className="mr-2 h-3 w-3" />
                    {tool.status === "Coming Soon" ? "Coming Soon" : "Start Tool"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Practice Scenarios Available
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practiceScenarios.map((scenario, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">{scenario.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{scenario.situation}</p>
                <div className="bg-blue-500/10 rounded-lg p-2">
                  <p className="text-xs text-blue-200"><strong>Learning Outcome:</strong> {scenario.learningOutcome}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
