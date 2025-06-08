
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target, Zap, RotateCcw } from "lucide-react";

interface StudyMode {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  recommended?: boolean;
}

interface StudyModeSelectorProps {
  onSelectMode: (mode: string) => void;
  onBack: () => void;
}

const StudyModeSelector = ({ onSelectMode, onBack }: StudyModeSelectorProps) => {
  const studyModes: StudyMode[] = [
    {
      id: "sequential",
      title: "Sequential Study",
      description: "Go through cards in order - perfect for first-time learning",
      icon: Target,
      recommended: true
    },
    {
      id: "random",
      title: "Random Practice",
      description: "Cards in random order - great for testing knowledge",
      icon: Zap
    },
    {
      id: "spaced",
      title: "Spaced Repetition",
      description: "Focus on difficult cards - optimal for retention",
      icon: Brain
    },
    {
      id: "quick",
      title: "Quick Review",
      description: "Rapid-fire review - perfect for breaks",
      icon: RotateCcw
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Study Mode</h2>
        <p className="text-muted-foreground">
          Select how you'd like to study these flashcards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studyModes.map((mode) => (
          <Card 
            key={mode.id} 
            className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors cursor-pointer"
            onClick={() => onSelectMode(mode.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <mode.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {mode.title}
                    {mode.recommended && (
                      <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">
                        Recommended
                      </span>
                    )}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{mode.description}</p>
              <Button className="w-full" size="sm">
                Start {mode.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={onBack}>
          Back to Flashcard Sets
        </Button>
      </div>
    </div>
  );
};

export default StudyModeSelector;
