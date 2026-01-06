
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Zap, RotateCcw, ArrowLeft, Sparkles, Clock, TrendingUp, CheckCircle } from "lucide-react";

interface StudyMode {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  recommended?: boolean;
  benefits: string[];
  bestFor: string;
  color: string;
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
      description: "Go through cards in order - perfect for first-time learning and building foundations",
      icon: Target,
      recommended: true,
      benefits: ["Structured learning path", "Build knowledge step by step", "Great for beginners"],
      bestFor: "First-time study or new topics",
      color: "green"
    },
    {
      id: "random",
      title: "Random Practice",
      description: "Cards in random order - great for testing your knowledge under unpredictable conditions",
      icon: Zap,
      benefits: ["Tests true understanding", "Simulates real-world recall", "Prevents pattern recognition"],
      bestFor: "Testing retained knowledge",
      color: "yellow"
    },
    {
      id: "spaced",
      title: "Spaced Repetition",
      description: "Focus on difficult cards with scientifically-proven intervals for optimal retention",
      icon: Brain,
      benefits: ["Maximum retention", "Efficient use of time", "Targets weak areas"],
      bestFor: "Long-term memorization",
      color: "purple"
    },
    {
      id: "quick",
      title: "Quick Review",
      description: "Rapid-fire review mode - perfect for quick refreshers during breaks or on the go",
      icon: RotateCcw,
      benefits: ["Fast-paced learning", "Great for revision", "Build confidence quickly"],
      bestFor: "Short study sessions",
      color: "blue"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; icon: string; hoverBorder: string }> = {
      green: {
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        text: 'text-green-400',
        icon: 'from-green-500/20 to-green-500/5',
        hoverBorder: 'hover:border-green-500/50'
      },
      yellow: {
        bg: 'bg-elec-yellow/10',
        border: 'border-elec-yellow/20',
        text: 'text-elec-yellow',
        icon: 'from-elec-yellow/20 to-elec-yellow/5',
        hoverBorder: 'hover:border-elec-yellow/50'
      },
      purple: {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        text: 'text-purple-400',
        icon: 'from-purple-500/20 to-purple-500/5',
        hoverBorder: 'hover:border-purple-500/50'
      },
      blue: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        text: 'text-blue-400',
        icon: 'from-blue-500/20 to-blue-500/5',
        hoverBorder: 'hover:border-blue-500/50'
      }
    };
    return colors[color] || colors.yellow;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="border-white/20 hover:bg-white/5 hover:border-elec-yellow/50 transition-all touch-manipulation active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-elec-yellow" />
            Choose Your <span className="text-elec-yellow">Study Mode</span>
          </h2>
          <p className="text-white/70 mt-1">
            Select the learning style that best fits your current needs
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
              <TrendingUp className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-300 mb-1">Study Tip</h3>
              <p className="text-sm text-white/80">
                For best results, start with <span className="font-medium text-blue-300">Sequential Study</span> when learning new material,
                then switch to <span className="font-medium text-blue-300">Spaced Repetition</span> for long-term retention.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mode Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {studyModes.map((mode) => {
          const colorClasses = getColorClasses(mode.color);
          const ModeIcon = mode.icon;

          return (
            <Card
              key={mode.id}
              className={`
                bg-gradient-to-br from-elec-gray to-elec-card
                ${colorClasses.border} ${colorClasses.hoverBorder}
                transition-all duration-300 hover:scale-[1.02]
                cursor-pointer group touch-manipulation active:scale-[0.98]
              `}
              onClick={() => onSelectMode(mode.id)}
            >
              <CardContent className="p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`
                    p-3 rounded-xl flex-shrink-0 transition-all duration-300
                    bg-gradient-to-br ${colorClasses.icon}
                    border ${colorClasses.border}
                    group-hover:shadow-lg
                  `}>
                    <ModeIcon className={`h-6 w-6 ${colorClasses.text}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className={`font-semibold text-white text-lg group-hover:${colorClasses.text} transition-colors`}>
                        {mode.title}
                      </h3>
                      {mode.recommended && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-white/70">{mode.description}</p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2 mb-4 pl-1">
                  {mode.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle className={`h-4 w-4 ${colorClasses.text} flex-shrink-0`} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Best For + Action */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Best for: {mode.bestFor}</span>
                  </div>

                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMode(mode.id);
                    }}
                    className={`
                      ${colorClasses.bg} ${colorClasses.text} border ${colorClasses.border}
                      hover:bg-opacity-30 font-semibold
                      h-10 px-4 touch-manipulation active:scale-95
                      transition-all duration-200
                    `}
                  >
                    Select Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
          <CardContent className="p-4 text-center">
            <div className="p-2 rounded-lg bg-green-500/10 w-fit mx-auto mb-2">
              <Target className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-lg font-bold text-white">Sequential</div>
            <div className="text-xs text-white/60">For learning</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
          <CardContent className="p-4 text-center">
            <div className="p-2 rounded-lg bg-elec-yellow/10 w-fit mx-auto mb-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="text-lg font-bold text-white">Random</div>
            <div className="text-xs text-white/60">For testing</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
          <CardContent className="p-4 text-center">
            <div className="p-2 rounded-lg bg-purple-500/10 w-fit mx-auto mb-2">
              <Brain className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-white">Spaced</div>
            <div className="text-xs text-white/60">For retention</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
          <CardContent className="p-4 text-center">
            <div className="p-2 rounded-lg bg-blue-500/10 w-fit mx-auto mb-2">
              <RotateCcw className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-white">Quick</div>
            <div className="text-xs text-white/60">For revision</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyModeSelector;
