
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Play, Pause, RotateCcw } from "lucide-react";

const StressManagementTools = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const exercises = [
    {
      id: "box-breathing",
      name: "Box Breathing",
      description: "4-4-4-4 breathing pattern for instant calm",
      duration: 240, // 4 minutes
      phases: [
        { name: "inhale" as const, duration: 4, instruction: "Breathe in slowly" },
        { name: "hold" as const, duration: 4, instruction: "Hold your breath" },
        { name: "exhale" as const, duration: 4, instruction: "Breathe out slowly" },
        { name: "pause" as const, duration: 4, instruction: "Pause briefly" }
      ]
    },
    {
      id: "quick-calm",
      name: "Quick Calm",
      description: "2-minute rapid stress relief technique",
      duration: 120,
      phases: [
        { name: "inhale" as const, duration: 3, instruction: "Deep breath in" },
        { name: "exhale" as const, duration: 6, instruction: "Slow breath out" }
      ]
    },
    {
      id: "progressive-relaxation",
      name: "Progressive Muscle Relaxation",
      description: "5-minute full body tension release",
      duration: 300,
      phases: [
        { name: "inhale" as const, duration: 5, instruction: "Tense muscle group" },
        { name: "exhale" as const, duration: 10, instruction: "Release and relax" }
      ]
    }
  ];

  const currentExercise = exercises.find(e => e.id === activeExercise);
  const currentPhase = currentExercise?.phases.find(p => p.name === breathingPhase);

  useEffect(() => {
    if (isRunning && activeExercise) {
      intervalRef.current = setInterval(() => {
        setTotalElapsed(prev => {
          const newTotal = prev + 1;
          // Check if exercise is complete
          if (currentExercise && newTotal >= currentExercise.duration) {
            setIsRunning(false);
            return newTotal;
          }
          return newTotal;
        });

        setPhaseTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            // Move to next phase
            if (currentExercise) {
              const currentPhaseIndex = currentExercise.phases.findIndex(p => p.name === breathingPhase);
              const nextPhaseIndex = (currentPhaseIndex + 1) % currentExercise.phases.length;
              const nextPhase = currentExercise.phases[nextPhaseIndex];
              
              setBreathingPhase(nextPhase.name);
              
              // If we completed a full cycle (back to first phase)
              if (nextPhaseIndex === 0) {
                setCycleCount(prev => prev + 1);
              }
              
              return nextPhase.duration;
            }
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, activeExercise, breathingPhase, currentExercise]);

  const startExercise = (exerciseId: string) => {
    const exercise = exercises.find(e => e.id === exerciseId);
    if (exercise) {
      setActiveExercise(exerciseId);
      setTotalElapsed(0);
      setBreathingPhase(exercise.phases[0].name);
      setPhaseTimeLeft(exercise.phases[0].duration);
      setCycleCount(0);
      setIsRunning(true);
    }
  };

  const togglePause = () => {
    setIsRunning(!isRunning);
  };

  const stopExercise = () => {
    setIsRunning(false);
    setActiveExercise(null);
    setTotalElapsed(0);
    setPhaseTimeLeft(4);
    setCycleCount(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (!currentExercise) return 0;
    return (totalElapsed / currentExercise.duration) * 100;
  };

  const getPhaseProgress = () => {
    if (!currentPhase) return 0;
    return ((currentPhase.duration - phaseTimeLeft) / currentPhase.duration) * 100;
  };

  const getCircleScale = () => {
    if (breathingPhase === 'inhale') return 1 + (getPhaseProgress() / 100) * 0.5;
    if (breathingPhase === 'exhale') return 1.5 - (getPhaseProgress() / 100) * 0.5;
    return breathingPhase === 'hold' ? 1.5 : 1;
  };

  const getRemainingTime = () => {
    if (!currentExercise) return 0;
    return currentExercise.duration - totalElapsed;
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
                {currentExercise?.name}
              </h3>
              <div className="text-3xl font-bold text-blue-300 mb-1">
                {formatTime(getRemainingTime())}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                Time remaining • Cycle {cycleCount + 1}
              </div>
              <Progress value={getProgressPercentage()} className="h-2 mb-4" />
            </div>

            {activeExercise === 'box-breathing' && (
              <div className="space-y-4">
                <div className="w-32 h-32 mx-auto relative">
                  <div 
                    className={`w-full h-full rounded-full border-4 transition-all duration-1000 ease-in-out flex items-center justify-center ${
                      breathingPhase === 'inhale' ? 'border-green-400' :
                      breathingPhase === 'hold' ? 'border-yellow-400' :
                      breathingPhase === 'exhale' ? 'border-blue-400' :
                      'border-purple-400'
                    }`}
                    style={{ transform: `scale(${getCircleScale()})` }}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{phaseTimeLeft}</div>
                      <div className="text-xs text-muted-foreground">seconds</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-lg font-medium text-white mb-2 capitalize">
                    {currentPhase?.instruction}
                  </div>
                  <Progress value={getPhaseProgress()} className="h-2" />
                </div>
              </div>
            )}

            <div className="flex gap-2 justify-center">
              <Button
                onClick={togglePause}
                variant="outline"
                size="sm"
                className="border-blue-500/20 hover:bg-blue-500/10"
              >
                {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              </Button>
              <Button
                onClick={stopExercise}
                variant="outline"
                size="sm"
                className="border-blue-500/20 hover:bg-blue-500/10"
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
