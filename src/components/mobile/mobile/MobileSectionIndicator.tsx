import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ColumnGroup, columnGroups, getVisibleColumnGroup } from '@/utils/mobileTableUtils';

interface MobileSectionIndicatorProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export const MobileSectionIndicator: React.FC<MobileSectionIndicatorProps> = ({
  scrollContainerRef,
}) => {
  const [currentSection, setCurrentSection] = useState<ColumnGroup>('circuit');

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const visibleGroup = getVisibleColumnGroup(scrollLeft, containerWidth);
      setCurrentSection(visibleGroup);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef]);

  const currentGroup = columnGroups.find(g => g.id === currentSection);
  if (!currentGroup) return null;

  const getSectionColor = (id: ColumnGroup) => {
    switch (id) {
      case 'circuit':
        return 'bg-blue-500/90';
      case 'conductors':
        return 'bg-green-500/90';
      case 'protection':
        return 'bg-amber-500/90';
      case 'rcd':
        return 'bg-red-500/90';
      case 'continuity':
        return 'bg-blue-500/90';
      case 'insulation':
        return 'bg-green-500/90';
      case 'other':
        return 'bg-purple-500/90';
      default:
        return 'bg-gray-500/90';
    }
  };

  return (
    <div className="sticky top-0 z-40 px-2 py-2">
      <div
        className={cn(
          'rounded-lg px-3 py-2 text-foreground text-sm font-medium shadow-lg transition-colors duration-200',
          getSectionColor(currentSection)
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg">{currentGroup.icon}</span>
          <span className="flex-1">{currentGroup.label}</span>
          <span className="text-xs opacity-90">
            {columnGroups.findIndex(g => g.id === currentSection) + 1}/{columnGroups.length}
          </span>
        </div>
      </div>
    </div>
  );
};
