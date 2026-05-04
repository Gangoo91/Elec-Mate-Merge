interface QuizTimerDisplayProps {
  timeRemaining: number;
  totalTime: number;
}

const QuizTimerDisplay = ({ timeRemaining, totalTime }: QuizTimerDisplayProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timeProgress = 100 - (timeRemaining / totalTime) * 100;
  const isTimeRunningLow = timeRemaining < 300;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
      <div className="flex justify-between items-baseline">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Time remaining
        </span>
        <span
          className={`font-mono text-[16px] ${isTimeRunningLow ? 'text-red-400 animate-pulse' : 'text-white'}`}
        >
          {formatTime(timeRemaining)}
        </span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${isTimeRunningLow ? 'bg-red-400' : 'bg-elec-yellow'}`}
          style={{ width: `${timeProgress}%` }}
        />
      </div>
    </div>
  );
};

export default QuizTimerDisplay;
