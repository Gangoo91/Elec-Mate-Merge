import { motion } from 'framer-motion';

interface StepProgressProps {
  current: number;
  total: number;
}

export function StepProgress({ current, total }: StepProgressProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          Step {current + 1} of {total}
        </span>
        <span className="text-muted-foreground">
          {Math.round(percentage)}% Complete
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-elec-yellow rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
