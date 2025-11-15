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
    <div className={`flex items-center gap-1.5 ${className}`}>
      {[...Array(totalStages)].map((_, index) => (
        <div
          key={index}
          className={`h-1.5 rounded-full transition-all ${
            index < currentStage ? 'w-6 bg-green-500' :
            index === currentStage ? 'w-8 bg-elec-yellow' :
            'w-1.5 bg-muted'
          }`}
        />
      ))}
    </div>
  );
};
