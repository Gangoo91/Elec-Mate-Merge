
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX, Check } from "lucide-react";

interface BreathingExerciseProps {
  onClose: () => void;
}

const BreathingExercise = ({ onClose }: BreathingExerciseProps) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale' | 'complete'>('ready');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [totalCycles] = useState(4);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const phaseConfig = {
    inhale: { duration: 4, instruction: "Breathe In", color: "from-blue-400 to-cyan-400" },
    hold: { duration: 4, instruction: "Hold", color: "from-purple-400 to-pink-400" },
    exhale: { duration: 4, instruction: "Breathe Out", color: "from-green-400 to-emerald-400" }
  };

  useEffect(() => {
    if (isActive && phase !== 'ready' && phase !== 'complete') {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              return phaseConfig.hold.duration;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return phaseConfig.exhale.duration;
            } else if (phase === 'exhale') {
              const newCycles = cyclesCompleted + 1;
              setCyclesCompleted(newCycles);
              if (newCycles >= totalCycles) {
                setPhase('complete');
                setIsActive(false);
                return 0;
              }
              setPhase('inhale');
              return phaseConfig.inhale.duration;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, phase, cyclesCompleted, totalCycles]);

  const startExercise = () => {
    setPhase('inhale');
    setTimeLeft(phaseConfig.inhale.duration);
    setCyclesCompleted(0);
    setIsActive(true);
  };

  const togglePause = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setPhase('ready');
    setTimeLeft(4);
    setCyclesCompleted(0);
  };

  const getCircleScale = () => {
    if (phase === 'ready' || phase === 'complete') return 1;
    const config = phaseConfig[phase as keyof typeof phaseConfig];
    const progress = (config.duration - timeLeft) / config.duration;

    if (phase === 'inhale') return 1 + progress * 0.5;
    if (phase === 'hold') return 1.5;
    if (phase === 'exhale') return 1.5 - progress * 0.5;
    return 1;
  };

  const getCurrentColor = () => {
    if (phase === 'ready') return "from-blue-400/50 to-cyan-400/50";
    if (phase === 'complete') return "from-green-400 to-emerald-400";
    return phaseConfig[phase as keyof typeof phaseConfig]?.color || "from-blue-400 to-cyan-400";
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-white/80"
        >
          {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {phase === 'complete' ? (
          /* Completion Screen */
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
              <Check className="h-12 w-12 text-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Well Done!</h2>
              <p className="text-white/80">
                You completed {totalCycles} breathing cycles.
              </p>
              <p className="text-sm text-white/80 mt-2">
                Take a moment to notice how you feel.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={reset} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Again
              </Button>
              <Button onClick={onClose}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          /* Exercise Screen */
          <>
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-1">Box Breathing</h2>
              <p className="text-sm text-white/80">
                {phase === 'ready' ? 'Find a comfortable position and relax' : `Cycle ${cyclesCompleted + 1} of ${totalCycles}`}
              </p>
            </div>

            {/* Breathing Circle */}
            <div className="relative w-64 h-64 mb-8">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/10" />

              {/* Progress ring */}
              {phase !== 'ready' && (
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="124"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={780}
                    strokeDashoffset={780 - (780 * (cyclesCompleted / totalCycles))}
                    className="text-green-400/30 transition-all duration-500"
                  />
                </svg>
              )}

              {/* Animated breathing circle */}
              <div
                className={`absolute inset-4 rounded-full bg-gradient-to-br ${getCurrentColor()}
                  flex items-center justify-center transition-transform duration-1000 ease-in-out
                  shadow-lg shadow-blue-500/20`}
                style={{ transform: `scale(${getCircleScale()})` }}
              >
                <div className="text-center text-foreground">
                  {phase === 'ready' ? (
                    <div className="text-lg font-medium">Ready?</div>
                  ) : (
                    <>
                      <div className="text-5xl font-bold mb-1">{timeLeft}</div>
                      <div className="text-sm font-medium opacity-90">
                        {phaseConfig[phase as keyof typeof phaseConfig]?.instruction}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Phase Indicators */}
            {phase !== 'ready' && (
              <div className="flex gap-4 mb-8">
                {['inhale', 'hold', 'exhale'].map((p) => (
                  <div
                    key={p}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                      phase === p
                        ? 'bg-white text-black font-medium'
                        : 'bg-white/10 text-foreground/60'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </div>
                ))}
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-3">
              {phase === 'ready' ? (
                <Button
                  onClick={startExercise}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-foreground px-8"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </Button>
              ) : (
                <>
                  <Button
                    onClick={togglePause}
                    size="lg"
                    variant="outline"
                    className="px-6"
                  >
                    {isActive ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        Resume
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={reset}
                    size="lg"
                    variant="ghost"
                    className="px-4"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Tips */}
      <Card className="mt-auto border-blue-500/20 bg-blue-500/5">
        <CardContent className="p-4">
          <p className="text-sm text-white/80 text-center">
            {phase === 'ready'
              ? "Box breathing helps activate your parasympathetic nervous system, reducing stress and anxiety."
              : phase === 'complete'
              ? "Regular practice can help manage stress, improve focus, and promote better sleep."
              : "Focus on the rhythm. Let your thoughts pass without judgment."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreathingExercise;
