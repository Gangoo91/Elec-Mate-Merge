/**
 * ApprenticeHubNav
 *
 * Top tab bar navigation with segmented control style.
 * Same design on mobile and desktop for consistency.
 *
 * Layout: [Home] [My Work] [Hours] [Me] [+ Add]
 */

import { Home, Briefcase, Clock, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ApprenticeHubTab = 'home' | 'work' | 'hours' | 'me';

interface NavItem {
  id: ApprenticeHubTab;
  label: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'work', label: 'My Work', icon: Briefcase },
  { id: 'hours', label: 'Hours', icon: Clock },
  { id: 'me', label: 'Me', icon: User },
];

interface ApprenticeHubNavProps {
  activeTab: ApprenticeHubTab;
  onTabChange: (tab: ApprenticeHubTab) => void;
  onCapture: () => void;
}

export function ApprenticeHubNav({
  activeTab,
  onTabChange,
  onCapture,
}: ApprenticeHubNavProps) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 lg:h-16 gap-4">
          {/* Tab Pills - Segmented Control Style */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/50">
              {navItems.map((item) => (
                <TabButton
                  key={item.id}
                  item={item}
                  active={activeTab === item.id}
                  onClick={() => onTabChange(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Add Button - Always visible */}
          <button
            onClick={onCapture}
            className={cn(
              'flex items-center gap-2',
              'px-4 py-2.5 rounded-xl',
              'bg-elec-yellow text-black font-semibold text-sm',
              'hover:bg-elec-yellow/90 active:scale-95',
              'transition-all shadow-sm'
            )}
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// Individual tab button component
function TabButton({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg',
        'text-sm font-medium transition-all active:scale-95',
        active
          ? 'bg-background text-elec-yellow shadow-sm'
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{item.label}</span>
    </button>
  );
}

export default ApprenticeHubNav;
