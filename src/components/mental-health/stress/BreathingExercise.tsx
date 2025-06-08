
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(0);

  const phases = {
    inhale: { duration: 4, next: 'hold', instruction: 'Breathe in slowly' },
    hold: { duration: 4, next: 'exhale', instruction: 'Hold your breath' },
    exhale: { duration: 6, next: 'pause', instruction: 'Breathe out slowly' },
    pause: { duration: 2, next: 'inhale', instruction: 'Rest' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const currentPhase = phases[phase];
      const nextPhase = currentPhase.next as keyof typeof phases;
      
      setPhase(nextPhase);
      setTimeLeft(phases[nextPhase].duration);
      
      if (nextPhase === 'inhale') {
        setCycle(prev => prev + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase]);

  const startExercise = () => {
    setIsActive(true);
  };

  const pauseExercise = () => {
    setIsActive(false);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(4);
    setCycle(0);
  };

  const getCircleScale = () => {
    if (phase === 'inhale') return 1 + (4 - timeLeft) * 0.25;
    if (phase === 'exhale') return 2 - (6 - timeLeft) * 0.25;
    return phase === 'hold' ? 2 : 1;
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow">4-4-6 Breathing Exercise</CardTitle>
        <p className="text-sm text-muted-foreground">
          A calming technique to reduce stress and anxiety
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div 
              className="w-24 h-24 rounded-full bg-elec-yellow/20 border-2 border-elec-yellow transition-transform duration-1000 ease-in-out flex items-center justify-center"
              style={{ transform: `scale(${getCircleScale()})` }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">{timeLeft}</div>
                <div className="text-xs text-muted-foreground">seconds</div>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-white">
              {phases[phase].instruction}
            </h3>
            <p className="text-sm text-muted-foreground">
              Cycle {cycle} • {phase.charAt(0).toUpperCase() + phase.slice(1)} phase
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {!isActive ? (
            <Button
              onClick={startExercise}
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Start
            </Button>
          ) : (
            <Button
              onClick={pauseExercise}
              variant="outline"
              className="border-elec-yellow/20 hover:bg-elec-yellow/10 flex items-center gap-2"
            >
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          )}
          
          <Button
            onClick={resetExercise}
            variant="outline"
            size="icon"
            className="border-elec-yellow/20 hover:bg-elec-yellow/10"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center space-y-2 pt-4 border-t border-elec-yellow/20">
          <h4 className="font-semibold text-white">How it works:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>• Inhale for 4 seconds</div>
            <div>• Hold for 4 seconds</div>
            <div>• Exhale for 6 seconds</div>
            <div>• Pause for 2 seconds</div>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            Aim for 5-10 cycles for maximum benefit
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;
