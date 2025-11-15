interface StageIndicatorProps {
  currentStage: number;
  totalStages: number;
  className?: string;
}

export const StageIndicator = ({
  currentStage,
  totalStages,
  className = ''
}: StageIndicatorProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {[...Array(totalStages)].map((_, index) => {
        const isComplete = index < currentStage;
        const isCurrent = index === currentStage;
        const isPending = index > currentStage;
        
        return (
          <div
            key={index}
            className={`
              h-2 rounded-full transition-all duration-500
              ${isCurrent ? 'w-8 bg-gradient-to-r from-elec-yellow via-pink-500 to-orange-500 animate-pulse-glow' : 'w-2'}
              ${isComplete ? 'bg-elec-yellow' : ''}
              ${isPending ? 'bg-muted opacity-30' : ''}
            `}
          />
        );
      })}
    </div>
  );
};
