/**
 * CategoryPills - Horizontal scrollable category chips
 * Native app feel with scroll snap, active state animations, and touch feedback
 */

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Layers,
  Star,
  Zap,
} from 'lucide-react';
import { pillVariants } from './animations/variants';

interface Category {
  name: string;
  count: number;
}

interface CategoryPillsProps {
  categories: Category[];
  selected: string | null;
  onSelect: (category: string | null) => void;
  className?: string;
}

// Map category names to icons
const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, typeof GraduationCap> = {
    Degree: GraduationCap,
    HNC: FileText,
    HND: FileText,
    Certificate: Award,
    Diploma: BookOpen,
    Apprenticeship: Briefcase,
    Foundation: Layers,
    Master: Star,
  };
  return iconMap[category] || Zap;
};

const CategoryPills = ({ categories, selected, onSelect, className }: CategoryPillsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll active category into view
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const active = activeRef.current;

      requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();

        if (activeRect.left < containerRect.left || activeRect.right > containerRect.right) {
          active.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          });
        }
      });
    }
  }, [selected]);

  // All categories with count
  const allCategory = {
    name: 'All',
    count: categories.reduce((sum, c) => sum + c.count, 0),
  };

  const allCategories = [allCategory, ...categories];

  return (
    <div className={cn('relative', className)}>
      {/* Right fade edge */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-1 pr-10 scroll-snap-x"
      >
        {allCategories.map((category, index) => {
          const isActive = selected === category.name || (category.name === 'All' && !selected);
          const Icon = category.name === 'All' ? Layers : getCategoryIcon(category.name);

          return (
            <motion.button
              key={category.name}
              ref={isActive ? activeRef : undefined}
              custom={index}
              variants={pillVariants}
              initial="initial"
              animate="animate"
              whileTap="tap"
              onClick={() => onSelect(category.name === 'All' ? null : category.name)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap',
                'border transition-all duration-200 scroll-snap-item touch-manipulation min-h-[36px]',
                isActive
                  ? 'bg-elec-yellow text-elec-dark border-elec-yellow shadow-sm shadow-elec-yellow/20'
                  : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/15'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{category.name}</span>
              <span
                className={cn(
                  'ml-0.5 text-xs font-semibold',
                  isActive ? 'text-elec-dark/60' : 'text-white'
                )}
              >
                {category.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPills;
