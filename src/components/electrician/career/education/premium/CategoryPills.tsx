/**
 * CategoryPills — editorial category chips.
 *
 * Horizontally-scrolling pills, type-led. Drops the icon-led chrome and the
 * yellow-flood selected state for a uniform editorial cadence: idle pills
 * are bordered + transparent, selected pills use the elec-yellow tint.
 */

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
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

const CategoryPills = ({ categories, selected, onSelect, className }: CategoryPillsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeRef.current || !scrollRef.current) return;
    const container = scrollRef.current;
    const active = activeRef.current;
    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      if (activeRect.left < containerRect.left || activeRect.right > containerRect.right) {
        active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  }, [selected]);

  const allCategory: Category = {
    name: 'All',
    count: categories.reduce((sum, c) => sum + c.count, 0),
  };

  const allCategories = [allCategory, ...categories];

  return (
    <div className={cn('relative', className)}>
      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto scrollbar-hide py-1 pr-10 scroll-snap-x"
      >
        {allCategories.map((category, index) => {
          const isActive =
            selected === category.name || (category.name === 'All' && !selected);
          return (
            <motion.button
              key={category.name}
              ref={isActive ? activeRef : undefined}
              type="button"
              custom={index}
              variants={pillVariants}
              initial="initial"
              animate="animate"
              whileTap="tap"
              onClick={() => onSelect(category.name === 'All' ? null : category.name)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap',
                'text-[11px] font-semibold uppercase tracking-[0.12em] border transition-colors duration-200',
                'scroll-snap-item touch-manipulation min-h-[36px]',
                isActive
                  ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                  : 'text-white/85 border-white/15 hover:border-white/30 bg-transparent'
              )}
            >
              <span>{category.name}</span>
              <span
                className={cn(
                  'tabular-nums font-semibold',
                  isActive ? 'text-elec-yellow' : 'text-white/65'
                )}
              >
                {category.count}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Right fade edge */}
      <div
        className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[hsl(0_0%_8%)] to-transparent pointer-events-none"
        aria-hidden
      />
    </div>
  );
};

export default CategoryPills;
