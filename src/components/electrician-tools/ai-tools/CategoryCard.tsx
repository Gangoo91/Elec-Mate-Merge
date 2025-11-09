import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  examples: string[];
  color: string;
  onClick: (example: string) => void;
}

export default function CategoryCard({
  icon: Icon,
  title,
  description,
  examples,
  color,
  onClick,
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative overflow-hidden rounded-xl border-2 border-border/30 bg-card/80 backdrop-blur-sm p-4 transition-all hover:border-elec-yellow/60 hover:shadow-xl hover:shadow-elec-yellow/20"
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity`} />
      
      <div className="relative z-10 space-y-3">
        {/* Icon & Title */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-elec-yellow transition-colors">
            {title}
          </h3>
        </div>
        
        {/* Description - visible on all screens but smaller on mobile */}
        <p className="text-xs text-white/60 line-clamp-2 min-h-[2rem]">
          {description}
        </p>

        {/* Example query button - more prominent */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(examples[0]);
          }}
          className="w-full text-left text-xs font-medium text-white/80 hover:text-elec-yellow transition-all py-2 px-3 rounded-lg bg-elec-yellow/10 hover:bg-elec-yellow/20 border border-elec-yellow/20 hover:border-elec-yellow/40 flex items-center gap-2 group/btn"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow flex-shrink-0 group-hover/btn:animate-pulse" />
          <span className="line-clamp-1 flex-1">{examples[0]}</span>
          <svg className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 transition-opacity flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
