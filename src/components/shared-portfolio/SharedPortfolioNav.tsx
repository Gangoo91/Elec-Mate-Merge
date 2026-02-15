import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  FileText,
  Clock,
} from 'lucide-react';

export type SharedTab = 'overview' | 'units' | 'ksbs' | 'evidence' | 'hours';

interface SharedPortfolioNavProps {
  activeTab: SharedTab;
  onTabChange: (tab: SharedTab) => void;
  pendingCount?: number;
}

const tabs: { id: SharedTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'units', label: 'Units', icon: BookOpen },
  { id: 'ksbs', label: 'KSBs', icon: Brain },
  { id: 'evidence', label: 'Evidence', icon: FileText },
  { id: 'hours', label: 'Hours', icon: Clock },
];

export default function SharedPortfolioNav({
  activeTab,
  onTabChange,
  pendingCount,
}: SharedPortfolioNavProps) {
  return (
    <nav className="flex border-b border-white/10 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex-1 min-w-0 flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium transition-colors touch-manipulation relative',
              isActive
                ? 'text-yellow-400'
                : 'text-white hover:text-yellow-400/70'
            )}
          >
            <div className="relative">
              <Icon className="h-5 w-5" />
              {tab.id === 'evidence' && pendingCount && pendingCount > 0 && (
                <span className="absolute -top-1 -right-2 h-4 min-w-4 flex items-center justify-center rounded-full bg-yellow-400 text-black text-[10px] font-bold px-1">
                  {pendingCount}
                </span>
              )}
            </div>
            <span className="truncate">{tab.label}</span>
            {isActive && (
              <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-yellow-400 rounded-t" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
