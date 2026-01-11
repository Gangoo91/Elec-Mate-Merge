import { motion } from 'framer-motion';
import { Search, PoundSterling, Calculator, CheckCircle, FileText, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stage {
  id: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const STAGES: Stage[] = [
  { id: 1, label: 'Analysing', icon: Search, description: 'Reading job details' },
  { id: 2, label: 'Pricing', icon: PoundSterling, description: 'Fetching trade prices' },
  { id: 3, label: 'Calculating', icon: Calculator, description: 'Computing costs' },
  { id: 4, label: 'Validating', icon: CheckCircle, description: 'Checking estimates' },
  { id: 5, label: 'Finalising', icon: FileText, description: 'Building quote' }
];

interface StageCardsProps {
  progress: number;
  currentStep?: string;
}

export function StageCards({ progress, currentStep }: StageCardsProps) {
  // Map progress (0-100) to current stage (1-5)
  const getCurrentStage = () => {
    if (progress >= 100) return 6; // All complete
    if (progress >= 85) return 5;
    if (progress >= 65) return 4;
    if (progress >= 40) return 3;
    if (progress >= 20) return 2;
    if (progress > 0) return 1;
    return 0;
  };

  const currentStage = getCurrentStage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="grid grid-cols-5 gap-2">
        {STAGES.map((stage, index) => {
          const isComplete = currentStage > stage.id;
          const isCurrent = currentStage === stage.id;
          const isPending = currentStage < stage.id;
          const Icon = stage.icon;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={cn(
                "relative flex flex-col items-center p-2 rounded-xl border transition-all duration-500",
                isComplete && "bg-emerald-500/10 border-emerald-500/30",
                isCurrent && "bg-elec-yellow/10 border-elec-yellow/30",
                isPending && "bg-white/5 border-white/10 opacity-40"
              )}
            >
              {/* Icon container */}
              <motion.div
                className={cn(
                  "relative p-2 rounded-lg mb-1 transition-all duration-300",
                  isComplete && "bg-emerald-500/20",
                  isCurrent && "bg-elec-yellow/20",
                  isPending && "bg-white/10"
                )}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
              >
                {isComplete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Check className="h-4 w-4 text-emerald-400" />
                  </motion.div>
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
                ) : (
                  <Icon className="h-4 w-4 text-white/40" />
                )}
              </motion.div>

              {/* Label */}
              <span
                className={cn(
                  "text-[10px] font-medium text-center transition-colors duration-300",
                  isComplete && "text-emerald-400",
                  isCurrent && "text-elec-yellow",
                  isPending && "text-white/40"
                )}
              >
                {stage.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress connectors */}
      <div className="relative h-1 mx-4 mt-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-elec-yellow rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Current step message */}
      {currentStep && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-white/60 flex items-center justify-center gap-2"
          >
            <Loader2 className="h-3 w-3 animate-spin text-elec-yellow" />
            {currentStep}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}
