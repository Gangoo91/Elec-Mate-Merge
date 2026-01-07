import React, { useRef, useEffect, useState } from 'react';
import { Headphones, Wrench, Brain, BookOpen, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const categories: Category[] = [
  {
    id: 'all',
    label: 'All Podcasts',
    icon: <Headphones className="h-4 w-4" />,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20 border-orange-500/40'
  },
  {
    id: 'trades-specific',
    label: 'Trades & Construction',
    icon: <Wrench className="h-4 w-4" />,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20 border-amber-500/40'
  },
  {
    id: 'general-mental-health',
    label: 'General Wellbeing',
    icon: <Brain className="h-4 w-4" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20 border-blue-500/40'
  },
  {
    id: 'personal-stories',
    label: 'Personal Stories',
    icon: <BookOpen className="h-4 w-4" />,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20 border-pink-500/40'
  },
  {
    id: 'sleep-anxiety',
    label: 'Sleep & Anxiety',
    icon: <Moon className="h-4 w-4" />,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/20 border-indigo-500/40'
  },
];

interface CategoryFilterBarProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  podcastCounts?: Record<string, number>;
}

const CategoryFilterBar = ({ selectedCategory, onCategoryChange, podcastCounts }: CategoryFilterBarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <div className="relative group">
      {/* Left Scroll Fade - Mobile indicator */}
      {showLeftArrow && (
        <div className="sm:hidden absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      )}

      {/* Left Scroll Arrow - Desktop Only */}
      {showLeftArrow && (
        <div className="hidden sm:flex absolute left-0 top-0 bottom-0 z-10 items-center">
          <div className="bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pr-4 pl-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('left')}
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2 px-1 -mx-1 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const count = podcastCounts?.[category.id];

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border
                transition-all duration-300 whitespace-nowrap flex-shrink-0
                touch-manipulation active:scale-95
                ${isSelected
                  ? `${category.bgColor} ${category.color} shadow-lg`
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              {/* Icon */}
              <span className={isSelected ? category.color : 'text-white'}>
                {category.icon}
              </span>

              {/* Label */}
              <span className={`text-xs sm:text-sm font-medium ${isSelected ? '' : 'text-white'}`}>
                {category.label}
              </span>

              {/* Count Badge - hidden on mobile */}
              {count !== undefined && (
                <span className={`
                  hidden sm:inline text-xs px-1.5 py-0.5 rounded-full
                  ${isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-white'
                  }
                `}>
                  {count}
                </span>
              )}

              {/* Selection Indicator */}
              {isSelected && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-0.5 sm:h-1 rounded-full bg-current opacity-60" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Scroll Fade - Mobile indicator */}
      {showRightArrow && (
        <div className="sm:hidden absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      )}

      {/* Right Scroll Arrow - Desktop Only */}
      {showRightArrow && (
        <div className="hidden sm:flex absolute right-0 top-0 bottom-0 z-10 items-center">
          <div className="bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pl-4 pr-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('right')}
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryFilterBar;
