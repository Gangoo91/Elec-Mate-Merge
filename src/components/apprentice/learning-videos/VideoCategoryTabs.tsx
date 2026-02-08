/**
 * VideoCategoryTabs
 *
 * Horizontal scrollable category pill tabs.
 */

import type { VideoCategory } from '@/data/apprentice/curatedVideos';
import { categoryLabels } from '@/data/apprentice/curatedVideos';

interface VideoCategoryTabsProps {
  categories: VideoCategory[];
  activeCategory: VideoCategory | 'all';
  onCategoryChange: (category: VideoCategory | 'all') => void;
}

export function VideoCategoryTabs({ categories, activeCategory, onCategoryChange }: VideoCategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
      <button
        onClick={() => onCategoryChange('all')}
        className={`flex-shrink-0 px-4 h-11 text-sm rounded-full border font-medium touch-manipulation transition-colors ${
          activeCategory === 'all'
            ? 'bg-elec-yellow/20 border-elec-yellow/50 text-elec-yellow'
            : 'bg-white/[0.04] border-white/10 text-white/60 active:bg-white/10'
        }`}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`flex-shrink-0 px-4 h-11 text-sm rounded-full border font-medium touch-manipulation transition-colors whitespace-nowrap ${
            activeCategory === cat
              ? 'bg-elec-yellow/20 border-elec-yellow/50 text-elec-yellow'
              : 'bg-white/[0.04] border-white/10 text-white/60 active:bg-white/10'
          }`}
        >
          {categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
}
