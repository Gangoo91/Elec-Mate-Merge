
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Globe, BookOpen, Lightbulb } from "lucide-react";
import CommunicationSimulator from "./CommunicationSimulator";
import CulturalAwarenessQuiz from "./CulturalAwarenessQuiz";
import ProfessionalLanguageBuilder from "./ProfessionalLanguageBuilder";

type ActiveTool = "communication" | "quiz" | "language" | null;

const InteractiveToolsTab = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);

  const handleBack = () => {
    setActiveTool(null);
  };

  if (activeTool === "communication") {
    return <CommunicationSimulator onBack={handleBack} />;
  }

  if (activeTool === "quiz") {
    return <CulturalAwarenessQuiz onBack={handleBack} />;
  }

  if (activeTool === "language") {
    return <ProfessionalLanguageBuilder onBack={handleBack} />;
  }

  const tools = [
    {
      id: "communication" as ActiveTool,
      icon: MessageSquare,
      title: "Communication Simulator",
      subtitle: "Practice workplace conversations",
      description: "Interactive scenarios to practice professional communication in various workplace situations.",
      color: "elec-yellow",
      features: ["Real workplace scenarios", "Multiple response options", "Instant feedback"]
    },
    {
      id: "quiz" as ActiveTool,
      icon: Globe,
      title: "Cultural Awareness Quiz",
      subtitle: "Test your workplace culture knowledge",
      description: "Interactive quiz to test your understanding of UK workplace culture and etiquette.",
      color: "cyan",
      features: ["25+ questions", "Regional variations", "Score tracking"]
    },
    {
      id: "language" as ActiveTool,
      icon: BookOpen,
      title: "Professional Language Builder",
      subtitle: "Improve professional communication",
      description: "Build professional language skills with guided exercises and phrase suggestions.",
      color: "purple",
      features: ["50+ phrases", "Context examples", "Industry terminology"]
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Lightbulb className="h-5 w-5 text-elec-yellow" />
            </div>
            Interactive Communication Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70">
            Practice workplace communication skills through interactive scenarios, quizzes, and language building exercises designed specifically for the UK electrical industry.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon;
          const colorClasses = {
            "elec-yellow": {
              border: "border-elec-yellow/20 hover:border-elec-yellow/40",
              icon: "from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30",
              iconColor: "text-elec-yellow",
              button: "bg-elec-yellow hover:bg-elec-yellow/90 text-black",
              badge: "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30"
            },
            cyan: {
              border: "border-cyan-500/20 hover:border-cyan-500/40",
              icon: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
              iconColor: "text-cyan-400",
              button: "bg-cyan-500 hover:bg-cyan-500/90 text-black",
              badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
            },
            purple: {
              border: "border-purple-500/20 hover:border-purple-500/40",
              icon: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
              iconColor: "text-purple-400",
              button: "bg-purple-500 hover:bg-purple-500/90 text-white",
              badge: "bg-purple-500/10 text-purple-400 border-purple-500/30"
            }
          };
          const colors = colorClasses[tool.color as keyof typeof colorClasses];

          return (
            <Card
              key={tool.id}
              className={`bg-gradient-to-br from-elec-gray to-elec-card ${colors.border} transition-all overflow-hidden relative group`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="pb-3 relative">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colors.icon}`}>
                    <IconComponent className={`h-5 w-5 ${colors.iconColor}`} />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{tool.title}</CardTitle>
                    <p className="text-sm text-white/60">{tool.subtitle}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <p className="text-sm text-white/70">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature, idx) => (
                    <span key={idx} className={`text-xs px-2 py-1 rounded-full ${colors.badge} border`}>
                      {feature}
                    </span>
                  ))}
                </div>
                <Button
                  onClick={() => setActiveTool(tool.id)}
                  className={`w-full h-11 touch-manipulation active:scale-95 transition-all ${colors.button}`}
                >
                  Start Tool
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <Lightbulb className="h-4 w-4 text-blue-400" />
            </div>
            Getting Started Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { text: "Start with the Communication Simulator to practice common workplace scenarios", icon: MessageSquare },
              { text: "Take the Cultural Awareness Quiz to test your knowledge of UK workplace culture", icon: Globe },
              { text: "Use the Professional Language Builder to improve your communication skills", icon: BookOpen },
              { text: "Regular practice with these tools will build your confidence in workplace interactions", icon: Lightbulb }
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <tip.icon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">{tip.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
