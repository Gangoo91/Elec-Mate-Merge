import React from 'react';
import {
  Zap,
  HardHat,
  Building2,
  AlertTriangle,
  Flame,
  Hammer,
  Users,
  Wind,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryPillProps {
  id: string;
  name: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

// Icon mapping for categories
const categoryIcons: Record<string, React.ElementType> = {
  electrical: Zap,
  height: HardHat,
  asbestos: AlertTriangle,
  structural: Building2,
  fire: Flame,
  manual: Hammer,
  environmental: Wind,
  people: Users,
  all: Layers,
};

export const CategoryPill: React.FC<CategoryPillProps> = ({
  id,
  name,
  count,
  active,
  onClick,
}) => {
  const Icon = categoryIcons[id] || AlertTriangle;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-200",
        "border active:scale-[0.97]",
        active
          ? "bg-elec-yellow text-black border-elec-yellow shadow-lg shadow-elec-yellow/20"
          : "bg-white/[0.03] text-white border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05]"
      )}
    >
      <Icon className={cn("h-4 w-4", active ? "text-black" : "text-current")} />
      <span className="text-sm font-medium">{name}</span>
      <span
        className={cn(
          "text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
          active
            ? "bg-black/20 text-black/70"
            : "bg-white/[0.1] text-white"
        )}
      >
        {count}
      </span>
    </button>
  );
};

// Category data with proper typing
export interface Category {
  id: string;
  name: string;
  count: number;
}

export const getCategoriesFromHazards = (
  hazards: Array<{ category: string }>
): Category[] => {
  const counts: Record<string, number> = {};
  hazards.forEach((h) => {
    counts[h.category] = (counts[h.category] || 0) + 1;
  });

  const categories: Category[] = [
    { id: 'all', name: 'All', count: hazards.length },
  ];

  // Add each category with proper name formatting
  const categoryNames: Record<string, string> = {
    electrical: 'Electrical',
    height: 'Working at Height',
    asbestos: 'Hazardous Materials',
    structural: 'Structural',
    fire: 'Fire',
    manual: 'Manual Handling',
    environmental: 'Environmental',
    people: 'People',
  };

  Object.entries(counts).forEach(([id, count]) => {
    categories.push({
      id,
      name: categoryNames[id] || id.charAt(0).toUpperCase() + id.slice(1),
      count,
    });
  });

  return categories;
};

export default CategoryPill;
