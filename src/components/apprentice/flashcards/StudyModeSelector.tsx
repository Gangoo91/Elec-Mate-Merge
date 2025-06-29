
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target, Zap, RotateCcw, ArrowLeft } from "lucide-react";

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
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onBack}
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-elec-yellow">Choose Your Study Mode</h2>
          <p className="text-elec-light/70">
            Select how you'd like to study these flashcards
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studyModes.map((mode) => (
          <Card 
            key={mode.id} 
            className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
            onClick={() => onSelectMode(mode.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-elec-yellow/15 border border-elec-yellow/30">
                  <mode.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2 text-elec-light">
                    {mode.title}
                    {mode.recommended && (
                      <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded border border-elec-yellow/30">
                        Recommended
                      </span>
                    )}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-elec-light/80 mb-4">{mode.description}</p>
              <Button 
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium transition-colors group-hover:bg-elec-yellow/90" 
                size="sm"
              >
                Start {mode.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudyModeSelector;
