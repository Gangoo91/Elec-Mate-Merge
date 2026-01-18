import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

interface SectionCardProps {
  to: string;
  sectionNumber: number | string;
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  isCompleted?: boolean;
  index?: number;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  to,
  sectionNumber,
  title,
  description,
  icon: Icon,
  isCompleted = false,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
    >
      <Link to={to} className="block h-full">
        <div
          className={`
            group relative overflow-hidden h-full min-h-[160px]
            bg-gradient-to-br from-white/[0.06] to-white/[0.01]
            backdrop-blur-xl
            border border-white/[0.08]
            rounded-2xl
            p-4 sm:p-5
            transition-all duration-300 ease-out
            hover:border-elec-yellow/30
            hover:bg-white/[0.08]
            hover:shadow-[0_4px_20px_rgba(250,204,21,0.1)]
            hover:translate-y-[-1px]
            active:scale-[0.98] active:translate-y-0
            touch-manipulation
            ${isCompleted ? 'border-green-500/20 bg-green-500/5' : ''}
          `}
        >
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

          {/* Ambient glow */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-elec-yellow/20 blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500" />

          {/* Completed checkmark */}
          {isCompleted && (
            <div className="absolute top-3 right-3">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
          )}

          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Icon + Section badge row */}
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/15 via-amber-500/10 to-transparent border border-white/[0.06] shadow-inner flex-shrink-0">
                <Icon className="h-5 w-5 text-elec-yellow" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                {/* Section badge */}
                <div className="inline-flex px-2 py-0.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-1.5">
                  <span className="text-[10px] font-bold text-elec-yellow tracking-wide">
                    SECTION {sectionNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-[15px] font-semibold text-white leading-snug mb-2 line-clamp-2 group-hover:text-elec-yellow transition-colors duration-200">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-xs text-white/40 line-clamp-2 mb-auto leading-relaxed">
                {description}
              </p>
            )}

            {/* Arrow indicator */}
            <div className="flex items-center justify-end mt-auto pt-2">
              <div className="flex items-center gap-1 text-white/30 group-hover:text-elec-yellow transition-colors">
                <span className="text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Start
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default SectionCard;
