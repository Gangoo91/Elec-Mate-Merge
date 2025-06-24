
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

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Communication Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Practice workplace communication skills through interactive scenarios, quizzes, and language building exercises designed specifically for the UK electrical industry.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-elec-yellow/10">
                <MessageSquare className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">Communication Simulator</CardTitle>
                <p className="text-sm text-muted-foreground">Practice workplace conversations</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Interactive scenarios to practice professional communication in various workplace situations.
            </p>
            <Button 
              onClick={() => setActiveTool("communication")}
              className="w-full"
            >
              Start Tool
            </Button>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-elec-yellow/10">
                <Globe className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">Cultural Awareness Quiz</CardTitle>
                <p className="text-sm text-muted-foreground">Test your workplace culture knowledge</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Interactive quiz to test your understanding of UK workplace culture and etiquette.
            </p>
            <Button 
              onClick={() => setActiveTool("quiz")}
              className="w-full"
            >
              Start Tool
            </Button>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-elec-yellow/10">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">Professional Language Builder</CardTitle>
                <p className="text-sm text-muted-foreground">Improve professional communication</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Build professional language skills with guided exercises and phrase suggestions.
            </p>
            <Button 
              onClick={() => setActiveTool("language")}
              className="w-full"
            >
              Start Tool
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300">Getting Started Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-blue-200 text-sm space-y-2">
            <li>• Start with the Communication Simulator to practice common workplace scenarios</li>
            <li>• Take the Cultural Awareness Quiz to test your knowledge of UK workplace culture</li>
            <li>• Use the Professional Language Builder to improve your communication skills</li>
            <li>• Regular practice with these tools will build your confidence in workplace interactions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
