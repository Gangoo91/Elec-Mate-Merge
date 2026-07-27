import { useState, ReactNode } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type ColorVariant = 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'yellow' | 'emerald' | 'rose';

interface ContentSectionProps {
  title: string;
  summary?: string;
  icon: LucideIcon;
  color?: ColorVariant;
  children: ReactNode;
  defaultExpanded?: boolean;
  badge?: string;
  className?: string;
}

const colorConfig: Record<
  ColorVariant,
  { iconBg: string; iconText: string; border: string; headerBg: string }
> = {
  blue: {
    iconBg: 'bg-white/[0.05]',
    iconText: 'text-elec-yellow',
    border: 'border-white/[0.08]',
    headerBg: '',
  },
  green: {
    iconBg: 'bg-white/[0.05]',
    iconText: 'text-elec-yellow',
    border: 'border-white/[0.08]',
    headerBg: '',
  },
  orange: {
    iconBg: 'bg-white/[0.05]',
    iconText: 'text-elec-yellow',
    border: 'border-white/[0.08]',
    headerBg: '',
  },
  purple: {
    iconBg: 'bg-white/[0.05]',
    iconText: 'text-elec-yellow',
    border: 'border-white/[0.08]',
    headerBg: '',
  },
  pink: {
    iconBg: 'bg-white/[0.05]',
    iconText: 'text-elec-yellow',
    border: 'border-white/[0.08]',
    headerBg: '',
  },
  yellow: {
    iconBg: 'bg-white/[0.05]',
    iconText: 'text-elec-yellow',
    border: 'border-white/[0.08]',
    headerBg: '',
  },
  emerald: {
    iconBg: 'bg-white/[0.05]',
    iconText: 'text-elec-yellow',
    border: 'border-white/[0.08]',
    headerBg: '',
  },
  rose: {
    iconBg: 'bg-white/[0.05]',
    iconText: 'text-elec-yellow',
    border: 'border-white/[0.08]',
    headerBg: '',
  },
};

const ContentSection = ({
  title,
  summary,
  icon: Icon,
  color = 'blue',
  children,
  defaultExpanded = false,
  badge,
  className,
}: ContentSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const colors = colorConfig[color];

  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        'border-2 transition-all duration-300',
        isExpanded ? 'border-white/20' : 'border-white/10',
        className
      )}
    >
      {/* Header - Always visible, clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-full p-4 text-left transition-all duration-200',
          'touch-manipulation active:scale-[0.99]',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 focus-visible:ring-inset',
          colors.headerBg
        )}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={cn(
              'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
              colors.iconBg
            )}
          >
            <Icon className={cn('h-5 w-5', colors.iconText)} />
          </div>

          {/* Title and Summary */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white">{title}</h3>
              {badge && (
                <span
                  className={cn(
                    'px-2 py-0.5 text-[10px] font-semibold rounded-full',
                    colors.iconBg,
                    colors.iconText
                  )}
                >
                  {badge}
                </span>
              )}
            </div>
            {summary && <p className="text-sm text-white mt-1 line-clamp-2">{summary}</p>}
          </div>

          {/* Expand indicator */}
          <div
            className={cn(
              'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300',
              isExpanded ? 'bg-white/[0.08] rotate-180' : 'bg-white/[0.06]'
            )}
          >
            <ChevronDown
              className={cn(
                'h-5 w-5 transition-colors',
                isExpanded ? 'text-yellow-400' : 'text-white'
              )}
            />
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="p-4 pt-0 border-t border-white/10">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
