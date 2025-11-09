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
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-3 cursor-pointer transition-all hover:border-elec-yellow/50 hover:shadow-lg hover:shadow-elec-yellow/10"
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity`} />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
          <Icon className="w-4 h-4 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-elec-yellow transition-colors">
          {title}
        </h3>
        
        {/* Description - hidden on mobile, shown on desktop */}
        <p className="text-xs text-muted-foreground mb-2 hidden md:block line-clamp-2">
          {description}
        </p>

        {/* Example query - only show first one */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(examples[0]);
          }}
          className="w-full text-left text-xs text-muted-foreground hover:text-elec-yellow transition-colors py-1 rounded hover:bg-elec-yellow/5 flex items-center gap-1.5"
        >
          <span className="w-1 h-1 rounded-full bg-elec-yellow/50 flex-shrink-0" />
          <span className="line-clamp-1">{examples[0]}</span>
        </button>
      </div>
    </motion.div>
  );
}
