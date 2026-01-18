import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

interface ModuleCardProps {
  to: string;
  moduleNumber: number | string;
  title: string;
  description?: string;
  duration?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  isExam?: boolean;
  isCompleted?: boolean;
  progress?: number;
  index?: number;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  to,
  moduleNumber,
  title,
  description,
  duration,
  icon: Icon,
  isExam = false,
  isCompleted = false,
  progress,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={to} className="block h-full">
        <div
          className={`
            group relative overflow-hidden h-full min-h-[180px]
            bg-gradient-to-br from-white/[0.08] to-white/[0.02]
            backdrop-blur-xl
            border border-white/10
            rounded-2xl
            p-5
            transition-all duration-300 ease-out
            hover:border-elec-yellow/40
            hover:shadow-[0_8px_32px_rgba(250,204,21,0.15)]
            hover:translate-y-[-2px]
            active:scale-[0.97] active:translate-y-0
            touch-manipulation
            ${isExam ? 'ring-1 ring-elec-yellow/30' : ''}
            ${isCompleted ? 'border-green-500/30' : ''}
          `}
        >
          {/* Top accent gradient line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Ambient glow on hover */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-elec-yellow/30 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

          {/* Completed indicator */}
          {isCompleted && (
            <div className="absolute top-3 right-3">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
          )}

          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Icon */}
            <div className="mb-4">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10 border border-white/10 shadow-inner">
                <Icon className="h-6 w-6 text-elec-yellow" strokeWidth={1.8} />
              </div>
            </div>

            {/* Module label */}
            <span className="text-[11px] font-bold text-elec-yellow/80 uppercase tracking-wider mb-1.5">
              {isExam ? 'Final Assessment' : `Module ${moduleNumber}`}
            </span>

            {/* Title */}
            <h3 className="text-[15px] font-semibold text-white leading-snug mb-2 line-clamp-2 group-hover:text-elec-yellow transition-colors duration-200">
              {title}
            </h3>

            {/* Description (if provided) */}
            {description && (
              <p className="text-xs text-white/50 line-clamp-2 mb-auto">
                {description}
              </p>
            )}

            {/* Bottom row: Duration + Arrow */}
            <div className="flex items-center justify-between mt-auto pt-3">
              {duration && (
                <div className="flex items-center gap-1.5 text-white/40">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{duration}</span>
                </div>
              )}
              {progress !== undefined && progress > 0 && progress < 100 && (
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-elec-yellow rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/40">{progress}%</span>
                </div>
              )}
              <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-200 ml-auto" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ModuleCard;
