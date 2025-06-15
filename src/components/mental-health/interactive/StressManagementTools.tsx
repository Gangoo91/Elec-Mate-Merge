
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Play, Pause, RotateCcw, Volume2 } from "lucide-react";

const StressManagementTools = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [breathingProgress, setBreathingProgress] = useState(0);

  const exercises = [
    {
      id: "box-breathing",
      name: "Box Breathing",
      description: "4-4-4-4 breathing pattern for instant calm",
      duration: 240, // 4 minutes
      phases: [
        { name: "inhale", duration: 4, instruction: "Breathe in slowly" },
        { name: "hold", duration: 4, instruction: "Hold your breath" },
        { name: "exhale", duration: 4, instruction: "Breathe out slowly" },
        { name: "pause", duration: 4, instruction: "Pause briefly" }
      ]
    },
    {
      id: "quick-calm",
      name: "Quick Calm",
      description: "2-minute rapid stress relief technique",
      duration: 120,
      phases: [
        { name: "inhale", duration: 3, instruction: "Deep breath in" },
        { name: "exhale", duration: 6, instruction: "Slow breath out" }
      ]
    },
    {
      id: "progressive-relaxation",
      name: "Progressive Muscle Relaxation",
      description: "5-minute full body tension release",
      duration: 300,
      phases: [
        { name: "tense", duration: 5, instruction: "Tense muscle group" },
        { name: "release", duration: 10, instruction: "Release and relax" }
      ]
    }
  ];

  const startExercise = (exerciseId: string) => {
    setActiveExercise(exerciseId);
    setTimer(0);
    setBreathingProgress(0);
    setBreathingPhase('inhale');
    setIsRunning(true);
    
    // Start the exercise timer
    const exercise = exercises.find(e => e.id === exerciseId);
    if (exercise && exercise.id === 'box-breathing') {
      startBreathingCycle(exercise);
    }
  };

  const startBreathingCycle = (exercise: any) => {
    let currentPhaseIndex = 0;
    let phaseTimer = 0;
    
    const interval = setInterval(() => {
      if (!isRunning) {
        clearInterval(interval);
        return;
      }

      const currentPhase = exercise.phases[currentPhaseIndex];
      phaseTimer++;
      
      setBreathingProgress((phaseTimer / currentPhase.duration) * 100);
      setBreathingPhase(currentPhase.name);

      if (phaseTimer >= currentPhase.duration) {
        phaseTimer = 0;
        currentPhaseIndex = (currentPhaseIndex + 1) % exercise.phases.length;
        setBreathingProgress(0);
      }
      
      setTimer(prev => prev + 1);
    }, 1000);

    return interval;
  };

  const stopExercise = () => {
    setIsRunning(false);
    setActiveExercise(null);
    setTimer(0);
    setBreathingProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseInstruction = () => {
    if (!activeExercise) return "";
    const exercise = exercises.find(e => e.id === activeExercise);
    const phase = exercise?.phases.find(p => p.name === breathingPhase);
    return phase?.instruction || "";
  };

  return (
    <Card className="border-blue-500/50 bg-blue-500/10">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Stress Management Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!activeExercise ? (
          <div className="grid gap-3">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">{exercise.name}</h4>
                    <p className="text-sm text-blue-200 mb-2">{exercise.description}</p>
                    <Badge variant="outline" className="text-blue-300 border-blue-400/30">
                      {Math.floor(exercise.duration / 60)} min
                    </Badge>
                  </div>
                  <Button
                    onClick={() => startExercise(exercise.id)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                {exercises.find(e => e.id === activeExercise)?.name}
              </h3>
              <div className="text-3xl font-bold text-blue-300 mb-1">
                {formatTime(timer)}
              </div>
              <div className="text-sm text-muted-foreground">
                / {formatTime(exercises.find(e => e.id === activeExercise)?.duration || 0)}
              </div>
            </div>

            {activeExercise === 'box-breathing' && (
              <div className="space-y-4">
                <div className="w-32 h-32 mx-auto relative">
                  <div className={`w-full h-full rounded-full border-4 transition-all duration-1000 ${
                    breathingPhase === 'inhale' ? 'border-green-400 scale-110' :
                    breathingPhase === 'hold' ? 'border-yellow-400 scale-110' :
                    breathingPhase === 'exhale' ? 'border-blue-400 scale-90' :
                    'border-purple-400 scale-90'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl">
                        {breathingPhase === 'inhale' ? '↑' :
                         breathingPhase === 'hold' ? '⊙' :
                         breathingPhase === 'exhale' ? '↓' : '○'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-lg font-medium text-white mb-2 capitalize">
                    {getPhaseInstruction()}
                  </div>
                  <Progress value={breathingProgress} className="h-2" />
                </div>
              </div>
            )}

            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                variant="outline"
                size="sm"
              >
                {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              </Button>
              <Button
                onClick={stopExercise}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              Find a quiet space and follow the breathing guide
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StressManagementTools;
