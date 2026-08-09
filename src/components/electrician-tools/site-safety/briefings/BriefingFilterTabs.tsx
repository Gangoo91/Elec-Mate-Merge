import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface BriefingFilterTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function BriefingFilterTabs({
  tabs,
  activeTab,
  onChange,
  className,
}: BriefingFilterTabsProps) {
  return (
    /* Volt underline, not a filled box — the same step-tab language the
       specialist certificates use. A filled pill on a dark card reads as a
       second surface; an underline just marks position. */
    <nav
      className={cn('flex border-b border-white/[0.1]', className)}
      aria-label="Briefings filter"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative flex-1 h-11 text-[13px] font-semibold touch-manipulation transition-colors',
              'flex items-center justify-center gap-1.5',
              isActive ? 'text-white' : 'text-white'
            )}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={cn(
                  'min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold tabular-nums',
                  'flex items-center justify-center',
                  isActive ? 'bg-elec-yellow text-black' : 'bg-white/10 text-white'
                )}
              >
                {tab.count}
              </span>
            )}
            <span
              className={cn(
                'absolute left-[14%] right-[14%] bottom-0 h-[2px] rounded-full transition-colors',
                isActive ? 'bg-elec-yellow' : 'bg-transparent'
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}

// Horizontal scrolling filter pills variant
interface FilterPill {
  id: string;
  label: string;
  count?: number;
  color?: 'default' | 'yellow' | 'green' | 'blue' | 'amber' | 'red';
}

interface BriefingFilterPillsProps {
  pills: FilterPill[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function BriefingFilterPills({
  pills,
  activeId,
  onChange,
  className,
}: BriefingFilterPillsProps) {
  const colorMap = {
    default: {
      active: 'bg-white/20 text-white border-white/30',
      inactive: 'bg-white/5 text-white border-white/10',
    },
    yellow: {
      active: 'bg-elec-yellow text-black border-elec-yellow/30',
      inactive: 'bg-white/5 text-white border-white/10',
    },
    green: {
      active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      inactive: 'bg-white/5 text-white border-white/10',
    },
    blue: {
      active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      inactive: 'bg-white/5 text-white border-white/10',
    },
    amber: {
      active: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      inactive: 'bg-white/5 text-white border-white/10',
    },
    red: {
      active: 'bg-red-500/20 text-red-400 border-red-500/30',
      inactive: 'bg-white/5 text-white border-white/10',
    },
  };

  return (
    <div
      className={cn(
        'flex gap-2 overflow-x-auto pb-2 scrollbar-hide',
        '-mx-4 px-4 md:mx-0 md:px-0',
        className
      )}
    >
      {pills.map((pill) => {
        const isActive = pill.id === activeId;
        const colors = colorMap[pill.color || 'default'];
        return (
          <button
            key={pill.id}
            onClick={() => onChange(pill.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-full',
              'text-sm font-medium whitespace-nowrap',
              'border transition-all duration-200',
              'touch-manipulation min-h-[44px]',
              'active:scale-95',
              isActive ? colors.active : colors.inactive
            )}
          >
            {pill.label}
            {pill.count !== undefined && pill.count > 0 && (
              <span
                className={cn(
                  'min-w-[18px] h-[18px] flex items-center justify-center',
                  'px-1 rounded-full text-xs font-bold',
                  isActive ? 'bg-white/20' : 'bg-white/10'
                )}
              >
                {pill.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
