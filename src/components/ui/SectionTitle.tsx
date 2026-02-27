import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  icon: React.ElementType;
  title: string;
  color?: string;
  isOpen: boolean;
  badge?: string;
  isMobile: boolean;
}

// Section header - MUST be outside main component to prevent focus loss
const SectionTitle = ({ icon: Icon, title, color = 'blue', isOpen, badge, isMobile }: SectionTitleProps) => (
  <div
    className={cn(
      'w-full flex items-center gap-3 py-4 text-left touch-manipulation transition-colors cursor-pointer',
      isMobile ? 'px-4 bg-card/30 border-y border-border/20' : 'pb-3 border-b border-border/30',
      'active:bg-card/50'
    )}
  >
    <div
      className={cn('h-10 w-10 rounded-xl flex items-center justify-center', `bg-${color}-500/20`)}
    >
      <Icon className={cn('h-5 w-5', `text-${color}-400`)} />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-foreground">{title}</h3>
      {badge && <span className="text-xs text-white">{badge}</span>}
    </div>
    <ChevronDown
      className={cn('h-5 w-5 text-white transition-transform', isOpen && 'rotate-180')}
    />
  </div>
);

export default SectionTitle;
