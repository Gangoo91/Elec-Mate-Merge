
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Anchor,
  Eye,
  Hand,
  Music,
  Footprints,
  Droplets,
  Wind,
  Square,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  Sparkles,
  Cloud,
  CloudOff
} from "lucide-react";
import { useGroundingProgress } from "@/hooks/useMentalHealthSync";
import { useAuth } from "@/contexts/AuthContext";

interface Exercise {
  id: string;
  name: string;
  shortName: string;
  icon: any;
  color: string;
  duration: string;
  description: string;
  steps: string[];
  type: 'guided' | 'interactive' | 'timed';
  interactiveData?: any;
}

const exercises: Exercise[] = [
  {
    id: "5-4-3-2-1",
    name: "5-4-3-2-1 Senses",
    shortName: "5-4-3-2-1",
    icon: Eye,
    color: "purple",
    duration: "2-3 min",
    description: "Ground yourself using all five senses",
    type: "interactive",
    steps: [
      "Name 5 things you can SEE",
      "Name 4 things you can TOUCH",
      "Name 3 things you can HEAR",
      "Name 2 things you can SMELL",
      "Name 1 thing you can TASTE"
    ],
    interactiveData: {
      senses: [
        { sense: "SEE", count: 5, emoji: "👁️", prompt: "Look around. What catches your eye?" },
        { sense: "TOUCH", count: 4, emoji: "🖐️", prompt: "Feel the textures around you" },
        { sense: "HEAR", count: 3, emoji: "👂", prompt: "Listen carefully. What sounds are there?" },
        { sense: "SMELL", count: 2, emoji: "👃", prompt: "Take a deep breath. What do you smell?" },
        { sense: "TASTE", count: 1, emoji: "👅", prompt: "What can you taste right now?" }
      ]
    }
  },
  {
    id: "box-breathing",
    name: "Box Breathing",
    shortName: "Box",
    icon: Square,
    color: "blue",
    duration: "2-4 min",
    description: "Calm your nervous system with this Navy SEAL technique",
    type: "guided",
    steps: [
      "Breathe IN for 4 seconds",
      "HOLD your breath for 4 seconds",
      "Breathe OUT for 4 seconds",
      "HOLD empty for 4 seconds",
      "Repeat the cycle"
    ]
  },
  {
    id: "body-scan",
    name: "Quick Body Scan",
    shortName: "Body Scan",
    icon: Hand,
    color: "green",
    duration: "3-5 min",
    description: "Release tension from head to toe",
    type: "guided",
    steps: [
      "Close your eyes and take 3 deep breaths",
      "Focus on your HEAD - release any tension in your forehead, jaw",
      "Move to your SHOULDERS - let them drop away from your ears",
      "Notice your ARMS and HANDS - unclench your fists",
      "Feel your CHEST and STOMACH - breathe into any tightness",
      "Relax your LEGS and FEET - let them feel heavy",
      "Take 3 more breaths and slowly open your eyes"
    ]
  },
  {
    id: "cold-water",
    name: "Cold Water Reset",
    shortName: "Cold Water",
    icon: Droplets,
    color: "cyan",
    duration: "1 min",
    description: "Activate your body's calming response instantly",
    type: "timed",
    steps: [
      "Get cold water (or ice if available)",
      "Splash cold water on your face",
      "Hold cold water on your wrists",
      "Focus on the sensation",
      "This activates your dive reflex and calms your heart rate"
    ]
  },
  {
    id: "grounding-feet",
    name: "Feet Grounding",
    shortName: "Feet",
    icon: Footprints,
    color: "amber",
    duration: "1-2 min",
    description: "Connect with the ground beneath you",
    type: "guided",
    steps: [
      "Stand or sit with both feet flat on the floor",
      "Press your feet firmly into the ground",
      "Notice the pressure under your heels",
      "Feel the pressure under your toes",
      "Imagine roots growing from your feet into the earth",
      "You are stable, grounded, and secure"
    ]
  },
  {
    id: "4-7-8-breathing",
    name: "4-7-8 Breathing",
    shortName: "4-7-8",
    icon: Wind,
    color: "indigo",
    duration: "2-3 min",
    description: "A natural tranquiliser for the nervous system",
    type: "guided",
    steps: [
      "Breathe IN through your nose for 4 seconds",
      "HOLD your breath for 7 seconds",
      "Breathe OUT through your mouth for 8 seconds",
      "This is one breath cycle",
      "Repeat 3-4 times"
    ]
  },
  {
    id: "safe-place",
    name: "Safe Place Visualisation",
    shortName: "Safe Place",
    icon: Anchor,
    color: "rose",
    duration: "3-5 min",
    description: "Create a mental sanctuary you can visit anytime",
    type: "guided",
    steps: [
      "Close your eyes and take slow breaths",
      "Imagine a place where you feel completely safe",
      "It could be real or imaginary - a beach, forest, or cosy room",
      "Notice what you SEE in this place",
      "Notice what you HEAR around you",
      "Feel the temperature and textures",
      "Stay here as long as you need",
      "Know you can return here anytime"
    ]
  },
  {
    id: "muscle-release",
    name: "Quick Muscle Release",
    shortName: "Muscle",
    icon: Hand,
    color: "orange",
    duration: "2-3 min",
    description: "Tense and release to relieve physical stress",
    type: "timed",
    steps: [
      "Make tight FISTS - hold 5 seconds - release",
      "Scrunch your FACE - hold 5 seconds - release",
      "Raise your SHOULDERS to ears - hold 5 seconds - release",
      "Tense your STOMACH - hold 5 seconds - release",
      "Curl your TOES tight - hold 5 seconds - release",
      "Notice the difference between tension and relaxation"
    ]
  }
];

const GroundingExercises = () => {
  const { user } = useAuth();
  const { completed, markCompleted, isLoading } = useGroundingProgress();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // For 5-4-3-2-1 interactive
  const [senseIndex, setSenseIndex] = useState(0);
  const [senseCount, setSenseCount] = useState(0);

  // For timed exercises
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // For breathing exercises
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out' | 'holdEmpty'>('in');
  const [breathCount, setBreathCount] = useState(0);

  const resetExercise = () => {
    setCurrentStep(0);
    setIsRunning(false);
    setSenseIndex(0);
    setSenseCount(0);
    setTimer(0);
    setBreathPhase('in');
    setBreathCount(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    resetExercise();
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
      purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/20", gradient: "from-purple-500/10" },
      blue: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/20", gradient: "from-blue-500/10" },
      green: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/20", gradient: "from-green-500/10" },
      cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/20", gradient: "from-cyan-500/10" },
      amber: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/20", gradient: "from-amber-500/10" },
      indigo: { bg: "bg-indigo-500/20", text: "text-indigo-400", border: "border-indigo-500/20", gradient: "from-indigo-500/10" },
      rose: { bg: "bg-rose-500/20", text: "text-rose-400", border: "border-rose-500/20", gradient: "from-rose-500/10" },
      orange: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/20", gradient: "from-orange-500/10" }
    };
    return colors[color] || colors.blue;
  };

  // Exercise list view
  if (!selectedExercise) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center py-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-3">
            <Anchor className="h-6 w-6 text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">Grounding Exercises</h2>
          <p className="text-sm text-white/80">
            Techniques to bring you back to the present moment
          </p>
        </div>

        {/* Cloud Sync Status */}
        <div className="flex items-center justify-center gap-2 text-xs">
          {user ? (
            <span className="flex items-center gap-1 text-green-400">
              <Cloud className="h-3 w-3" />
              Synced to cloud
            </span>
          ) : (
            <span className="flex items-center gap-1 text-white/80">
              <CloudOff className="h-3 w-3" />
              Local only - sign in to sync
            </span>
          )}
        </div>

        {/* Stats */}
        {completed.length > 0 && (
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm text-foreground">{completed.length} completed today</span>
              </div>
              <Sparkles className="h-5 w-5 text-green-400" />
            </CardContent>
          </Card>
        )}

        {/* Quick Access */}
        <div className="grid grid-cols-4 gap-2">
          {exercises.slice(0, 4).map(ex => {
            const colors = getColorClasses(ex.color);
            const Icon = ex.icon;
            const isComplete = completed.includes(ex.id);
            return (
              <button
                key={ex.id}
                onClick={() => startExercise(ex)}
                className={`p-3 rounded-xl ${colors.bg} flex flex-col items-center gap-1 relative
                  active:scale-95 transition-transform`}
              >
                {isComplete && (
                  <CheckCircle className="absolute top-1 right-1 h-3 w-3 text-green-400" />
                )}
                <Icon className={`h-5 w-5 ${colors.text}`} />
                <span className="text-[10px] text-foreground font-medium">{ex.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Exercise List */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white/80">All Exercises</h3>
          {exercises.map(exercise => {
            const colors = getColorClasses(exercise.color);
            const Icon = exercise.icon;
            const isComplete = completed.includes(exercise.id);

            return (
              <Card
                key={exercise.id}
                className={`${colors.border} overflow-hidden cursor-pointer active:scale-[0.99] transition-transform`}
                onClick={() => startExercise(exercise)}
              >
                <CardContent className={`p-3 bg-gradient-to-r ${colors.gradient} to-transparent`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground text-sm">{exercise.name}</h4>
                        {isComplete && <CheckCircle className="h-4 w-4 text-green-400" />}
                      </div>
                      <p className="text-xs text-white/80 line-clamp-1">{exercise.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white/80">
                      <Clock className="h-3 w-3" />
                      {exercise.duration}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tip */}
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/5">
          <CardContent className="p-4">
            <p className="text-sm text-blue-200">
              <strong className="text-blue-400">When to use:</strong> Feeling anxious, overwhelmed,
              or disconnected? These techniques help you reconnect with the present moment.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Exercise detail view
  const colors = getColorClasses(selectedExercise.color);
  const Icon = selectedExercise.icon;

  // 5-4-3-2-1 Interactive Exercise
  if (selectedExercise.id === "5-4-3-2-1") {
    const senses = selectedExercise.interactiveData.senses;
    const currentSense = senses[senseIndex];
    const isFinished = senseIndex >= senses.length;

    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setSelectedExercise(null)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <Button variant="ghost" size="sm" onClick={resetExercise}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Title */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${colors.bg} mb-3`}>
            <Icon className={`h-7 w-7 ${colors.text}`} />
          </div>
          <h2 className="text-xl font-bold text-foreground">{selectedExercise.name}</h2>
        </div>

        {isFinished ? (
          // Completion screen
          <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Well done!</h3>
              <p className="text-sm text-white/80 mb-4">
                You've grounded yourself using all five senses.
                How do you feel now?
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => { resetExercise(); }}
                >
                  Try Again
                </Button>
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    markCompleted(selectedExercise.id);
                    setSelectedExercise(null);
                  }}
                >
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Progress */}
            <div className="flex justify-center gap-2">
              {senses.map((_: any, i: number) => (
                <div
                  key={i}
                  className={`w-10 h-1 rounded-full transition-all ${
                    i < senseIndex ? 'bg-green-400' :
                    i === senseIndex ? colors.text.replace('text-', 'bg-') :
                    'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Current Sense */}
            <Card className={`${colors.border} bg-gradient-to-br ${colors.gradient} to-transparent`}>
              <CardContent className="p-6 text-center">
                <span className="text-4xl mb-3 block">{currentSense.emoji}</span>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {currentSense.count} things you can <span className={colors.text}>{currentSense.sense}</span>
                </h3>
                <p className="text-sm text-white/80">{currentSense.prompt}</p>
              </CardContent>
            </Card>

            {/* Counter */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: currentSense.count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i === senseCount) {
                      if (senseCount + 1 >= currentSense.count) {
                        setSenseIndex(senseIndex + 1);
                        setSenseCount(0);
                      } else {
                        setSenseCount(senseCount + 1);
                      }
                    }
                  }}
                  className={`w-10 h-10 rounded-full transition-all ${
                    i < senseCount
                      ? 'bg-green-500 text-foreground'
                      : i === senseCount
                        ? `${colors.bg} ${colors.text} ring-2 ring-white/50 animate-pulse`
                        : 'bg-white/10 text-foreground/30'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-white/80">
              Tap each number as you notice something
            </p>
          </>
        )}
      </div>
    );
  }

  // Guided/Timed Exercise
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setSelectedExercise(null)}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Button variant="ghost" size="sm" onClick={resetExercise}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Title */}
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${colors.bg} mb-3`}>
          <Icon className={`h-7 w-7 ${colors.text}`} />
        </div>
        <h2 className="text-xl font-bold text-foreground">{selectedExercise.name}</h2>
        <p className="text-sm text-white/80">{selectedExercise.description}</p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-1">
        {selectedExercise.steps.map((_, i) => (
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
      {currentStep < selectedExercise.steps.length ? (
        <>
          <Card className={`${colors.border} bg-gradient-to-br ${colors.gradient} to-transparent`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-sm font-bold ${colors.text}`}>{currentStep + 1}</span>
                </div>
                <p className="text-lg text-foreground leading-relaxed pt-1">
                  {selectedExercise.steps[currentStep]}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
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
              onClick={() => {
                if (currentStep + 1 >= selectedExercise.steps.length) {
                  setCurrentStep(currentStep + 1);
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
            >
              {currentStep + 1 >= selectedExercise.steps.length ? 'Finish' : 'Next'}
            </Button>
          </div>
        </>
      ) : (
        // Completion screen
        <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Exercise Complete!</h3>
            <p className="text-sm text-white/80 mb-4">
              Take a moment to notice how you feel now compared to when you started.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={resetExercise}
              >
                Repeat
              </Button>
              <Button
                className="flex-1 bg-green-500 hover:bg-green-600"
                onClick={() => {
                  markCompleted(selectedExercise.id);
                  setSelectedExercise(null);
                }}
              >
                Done
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Steps Reference */}
      {currentStep < selectedExercise.steps.length && (
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-3">
            <p className="text-xs font-medium text-white/80 mb-2">All steps</p>
            <div className="space-y-1">
              {selectedExercise.steps.map((step, i) => (
                <div
                  key={i}
                  className={`text-xs flex items-start gap-2 ${
                    i <= currentStep ? 'text-foreground' : 'text-white/80/50'
                  }`}
                >
                  <span className={i < currentStep ? 'text-green-400' : ''}>{i + 1}.</span>
                  <span className={i < currentStep ? 'line-through' : ''}>{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GroundingExercises;
