import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface PremiumTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function PremiumTabs({ tabs, activeTab, onTabChange, className }: PremiumTabsProps) {
  return (
    <div
      className={cn(
        'relative flex w-full rounded-full p-1',
        'bg-[hsl(0_0%_12%)] border border-white/[0.06]',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'relative flex-1 flex items-center justify-center gap-2',
              'px-4 py-2.5 rounded-full',
              'text-[13px] font-medium',
              'transition-colors duration-200',
              'min-h-[44px] touch-manipulation',
              isActive ? 'text-black' : 'text-white'
            )}
          >
            {/* Background indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-elec-yellow rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={cn(
                    'text-[11px] px-1.5 py-0 rounded-full min-w-[20px] h-5 inline-flex items-center justify-center tabular-nums',
                    isActive ? 'bg-black/20 text-black' : 'bg-white/[0.08] text-white'
                  )}
                >
                  {tab.count > 99 ? '99+' : tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
