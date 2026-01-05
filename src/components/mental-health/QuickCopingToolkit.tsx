
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Wind,
  Eye,
  Droplets,
  Hand,
  Music,
  MessageCircle,
  ChevronLeft,
  Clock,
  CheckCircle,
  Sparkles,
  Phone,
  Heart
} from "lucide-react";

interface QuickTechnique {
  id: string;
  name: string;
  duration: string;
  icon: any;
  color: string;
  description: string;
  steps: string[];
  fastTrack?: string; // Single line for ultra-quick version
}

const techniques: QuickTechnique[] = [
  {
    id: "breath",
    name: "4-7-8 Breath",
    duration: "1 min",
    icon: Wind,
    color: "blue",
    description: "Instantly calm your nervous system",
    fastTrack: "Breathe in 4 sec, hold 7 sec, out 8 sec. Repeat 3x.",
    steps: [
      "Breathe IN through nose for 4 seconds",
      "HOLD for 7 seconds",
      "Breathe OUT through mouth for 8 seconds",
      "Repeat 3 times"
    ]
  },
  {
    id: "ground",
    name: "5-4-3-2-1",
    duration: "2 min",
    icon: Eye,
    color: "purple",
    description: "Ground yourself with your senses",
    fastTrack: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.",
    steps: [
      "Name 5 things you can SEE",
      "Name 4 things you can FEEL",
      "Name 3 things you can HEAR",
      "Name 2 things you can SMELL",
      "Name 1 thing you can TASTE"
    ]
  },
  {
    id: "cold",
    name: "Cold Reset",
    duration: "30 sec",
    icon: Droplets,
    color: "cyan",
    description: "Activate your calming response",
    fastTrack: "Splash cold water on face or hold ice cubes. Focus on the sensation.",
    steps: [
      "Get cold water or ice",
      "Splash on your face or hold on wrists",
      "Focus on the cold sensation",
      "This activates your dive reflex and slows heart rate"
    ]
  },
  {
    id: "muscle",
    name: "Tension Release",
    duration: "1 min",
    icon: Hand,
    color: "orange",
    description: "Quick muscle relaxation",
    fastTrack: "Clench fists tight for 5 sec, release. Repeat with shoulders and face.",
    steps: [
      "Make tight FISTS for 5 seconds, release",
      "Scrunch your FACE for 5 seconds, release",
      "Raise SHOULDERS to ears for 5 seconds, release",
      "Notice the relaxation in each area"
    ]
  },
  {
    id: "mantra",
    name: "Calming Mantra",
    duration: "30 sec",
    icon: MessageCircle,
    color: "rose",
    description: "Reassure yourself",
    fastTrack: "Repeat slowly: 'This feeling will pass. I am safe right now.'",
    steps: [
      "Take a slow breath",
      "Repeat: 'This feeling will pass'",
      "Repeat: 'I am safe right now'",
      "Repeat: 'I can handle this'",
      "Continue until you feel calmer"
    ]
  },
  {
    id: "distract",
    name: "Quick Distraction",
    duration: "2 min",
    icon: Zap,
    color: "yellow",
    description: "Break the thought loop",
    fastTrack: "Count backwards from 100 by 7s (100, 93, 86...) or name countries A-Z.",
    steps: [
      "Count backwards from 100 by 7s",
      "OR: Name a country for each letter A-Z",
      "OR: List your favourite films alphabetically",
      "This interrupts anxious thoughts"
    ]
  }
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/20" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/20" },
    cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/20" },
    orange: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/20" },
    rose: { bg: "bg-rose-500/20", text: "text-rose-400", border: "border-rose-500/20" },
    yellow: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/20" }
  };
  return colors[color] || colors.blue;
};

const QuickCopingToolkit = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<QuickTechnique | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFastTrack, setShowFastTrack] = useState(false);

  const resetTechnique = () => {
    setSelectedTechnique(null);
    setCurrentStep(0);
    setShowFastTrack(false);
  };

  // Technique detail view
  if (selectedTechnique) {
    const colors = getColorClasses(selectedTechnique.color);
    const Icon = selectedTechnique.icon;

    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={resetTechnique}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {selectedTechnique.duration}
          </div>
        </div>

        {/* Title */}
        <div className="text-center py-2">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${colors.bg} mb-3`}>
            <Icon className={`h-7 w-7 ${colors.text}`} />
          </div>
          <h2 className="text-xl font-bold text-foreground">{selectedTechnique.name}</h2>
          <p className="text-sm text-muted-foreground">{selectedTechnique.description}</p>
        </div>

        {/* Fast Track Toggle */}
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowFastTrack(!showFastTrack)}
            className={showFastTrack ? `${colors.bg} ${colors.text}` : ''}
          >
            <Zap className="h-4 w-4 mr-1" />
            {showFastTrack ? 'Show Full Steps' : 'Quick Version'}
          </Button>
        </div>

        {showFastTrack && selectedTechnique.fastTrack ? (
          // Fast track view
          <Card className={`${colors.border} bg-gradient-to-br ${colors.bg.replace('/20', '/10')} to-transparent`}>
            <CardContent className="p-6 text-center">
              <Zap className={`h-8 w-8 ${colors.text} mx-auto mb-3`} />
              <p className="text-lg text-foreground leading-relaxed">
                {selectedTechnique.fastTrack}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Progress */}
            <div className="flex justify-center gap-2">
              {selectedTechnique.steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all ${
                    i < currentStep ? 'bg-green-400 w-8' :
                    i === currentStep ? `${colors.text.replace('text-', 'bg-')} w-8` :
                    'bg-white/20 w-4'
                  }`}
                />
              ))}
            </div>

            {/* Current Step */}
            {currentStep < selectedTechnique.steps.length ? (
              <Card className={`${colors.border} bg-gradient-to-br ${colors.bg.replace('/20', '/10')} to-transparent`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <span className={`font-bold ${colors.text}`}>{currentStep + 1}</span>
                    </div>
                    <p className="text-lg text-foreground leading-relaxed pt-1">
                      {selectedTechnique.steps[currentStep]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Completed
              <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Well done!</h3>
                  <p className="text-sm text-muted-foreground">
                    How do you feel now? Remember you can use this anytime.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            {currentStep < selectedTechnique.steps.length && (
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  className={`flex-1 ${colors.bg} ${colors.text} hover:opacity-90`}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  {currentStep + 1 >= selectedTechnique.steps.length ? 'Finish' : 'Next'}
                </Button>
              </div>
            )}

            {currentStep >= selectedTechnique.steps.length && (
              <Button className="w-full" onClick={resetTechnique}>
                Back to Toolkit
              </Button>
            )}
          </>
        )}
      </div>
    );
  }

  // Main toolkit view
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 mb-3">
          <Zap className="h-6 w-6 text-yellow-400" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">Quick Coping Toolkit</h2>
        <p className="text-sm text-muted-foreground">
          Fast techniques for difficult moments
        </p>
      </div>

      {/* Urgent Help Banner */}
      <Card className="border-red-500/20 bg-gradient-to-r from-red-500/10 to-rose-500/5">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-red-400" />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium">Need to talk right now?</p>
              <p className="text-xs text-muted-foreground">Samaritans: 116 123 (free, 24/7)</p>
            </div>
            <a
              href="tel:116123"
              className="px-3 py-1.5 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
            >
              Call
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Technique Cards */}
      <div className="space-y-2">
        {techniques.map((technique) => {
          const colors = getColorClasses(technique.color);
          const Icon = technique.icon;

          return (
            <Card
              key={technique.id}
              className={`${colors.border} cursor-pointer active:scale-[0.99] transition-transform`}
              onClick={() => setSelectedTechnique(technique)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground text-sm">{technique.name}</h3>
                      <span className="text-[11px] sm:text-xs px-2 py-0.5 rounded-full bg-white/10 text-foreground/60">
                        {technique.duration}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{technique.description}</p>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-muted-foreground rotate-180 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tip Card */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-indigo-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-purple-200">
                <strong className="text-purple-400">Pro tip:</strong> Practice these when you're
                feeling calm so they become automatic during stressful moments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Self-compassion reminder */}
      <Card className="border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-rose-500/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-pink-400" />
            <p className="text-sm text-pink-200">
              Remember: It's okay to struggle. Reaching for these tools shows strength.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickCopingToolkit;
