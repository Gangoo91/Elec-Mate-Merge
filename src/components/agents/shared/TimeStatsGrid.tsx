import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock, Timer } from "lucide-react";

interface TimeStatsGridProps {
  elapsedSeconds: number;
  remainingSeconds: number;
  className?: string;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(Math.max(0, seconds) / 60);
  const secs = Math.floor(Math.max(0, seconds) % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function TimeStatsGrid({
  elapsedSeconds,
  remainingSeconds,
  className,
}: TimeStatsGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}>
      {/* Elapsed Time */}
      <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center border border-white/10">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
          <span className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wide">
            Elapsed
          </span>
        </div>
        <span
          className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #a855f7, #ec4899)",
          }}
        >
          {formatTime(elapsedSeconds)}
        </span>
      </div>

      {/* Remaining Time */}
      <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center border border-white/10">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Timer className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
          <span className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wide">
            Remaining
          </span>
        </div>
        <span
          className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          }}
        >
          {formatTime(remainingSeconds)}
        </span>
      </div>
    </div>
  );
}

// Hook for managing time tracking
export function useTimeTracking(estimatedSeconds: number, isRunning: boolean) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      setElapsed(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    elapsed,
    remaining: Math.max(0, estimatedSeconds - elapsed),
    progress: Math.min(100, (elapsed / estimatedSeconds) * 100),
  };
}
