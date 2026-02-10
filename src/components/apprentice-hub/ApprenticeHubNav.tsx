/**
 * ApprenticeHubNav
 *
 * Spacious mobile-first navigation bar with back button.
 * Clean layout: back arrow | tab pills | yellow add button.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Briefcase, Clock, User, Plus, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ApprenticeHubTab = 'home' | 'work' | 'hours' | 'progress' | 'me';

interface NavItem {
  id: ApprenticeHubTab;
  label: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'work', label: 'My Work', icon: Briefcase },
  { id: 'hours', label: 'Hours', icon: Clock },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'me', label: 'Me', icon: User },
];

interface ApprenticeHubNavProps {
  activeTab: ApprenticeHubTab;
  onTabChange: (tab: ApprenticeHubTab) => void;
  onCapture: () => void;
}

export function ApprenticeHubNav({ activeTab, onTabChange, onCapture }: ApprenticeHubNavProps) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="flex items-center gap-2 h-14 px-3 lg:max-w-4xl lg:mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center justify-center h-11 w-11 rounded-xl text-white/80 hover:text-white active:scale-95 transition-all touch-manipulation flex-shrink-0"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Tab pills — scrollable row */}
        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 h-9 rounded-full whitespace-nowrap text-sm font-medium',
                  'touch-manipulation active:scale-95 transition-all',
                  isActive
                    ? 'bg-elec-yellow text-black'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Add button — always visible */}
        <button
          onClick={onCapture}
          className="flex items-center justify-center h-11 w-11 rounded-xl bg-elec-yellow text-black active:scale-90 transition-transform touch-manipulation shadow-md shadow-elec-yellow/25 flex-shrink-0"
          aria-label="Add evidence"
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
}

export default ApprenticeHubNav;
