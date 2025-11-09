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
      className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 cursor-pointer transition-all hover:border-elec-yellow/50 hover:shadow-lg hover:shadow-elec-yellow/10"
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity`} />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-elec-yellow transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>

        {/* Example queries */}
        <div className="space-y-2">
          {examples.slice(0, 2).map((example, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onClick(example);
              }}
              className="w-full text-left text-xs text-muted-foreground hover:text-elec-yellow transition-colors py-1 px-2 rounded hover:bg-elec-yellow/5 flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-elec-yellow/50" />
              {example}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
