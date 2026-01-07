import { cn } from '@/lib/utils';
import {
  Home,
  Clock,
  FileCheck,
  Award,
  Target,
  type LucideIcon,
} from 'lucide-react';

export type OJTNavSection = 'home' | 'time' | 'evidence' | 'assessments' | 'goals';

interface NavItem {
  id: OJTNavSection;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Dashboard', icon: Home },
  { id: 'time', label: 'Time', icon: Clock },
  { id: 'evidence', label: 'Evidence', icon: FileCheck },
  { id: 'assessments', label: 'Assessments', icon: Award },
  { id: 'goals', label: 'Goals', icon: Target },
];

interface OJTHubNavProps {
  activeSection: OJTNavSection;
  onSectionChange: (section: OJTNavSection) => void;
}

/**
 * OJTHubNav - Bottom navigation for OJT Hub
 *
 * iOS-style bottom tab navigation optimized for mobile.
 * Fixed to bottom on mobile, side panel on desktop.
 */
export function OJTHubNav({ activeSection, onSectionChange }: OJTHubNavProps) {
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-background/95 backdrop-blur-lg border-t border-border">
          <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    'flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200',
                    'min-w-[60px]',
                    isActive
                      ? 'text-elec-yellow'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <div
                    className={cn(
                      'p-1.5 rounded-lg transition-all duration-200',
                      isActive && 'bg-elec-yellow/10'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-5 w-5 transition-transform duration-200',
                        isActive && 'scale-110'
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      'text-[10px] mt-0.5 font-medium transition-all',
                      isActive ? 'opacity-100' : 'opacity-70'
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Safe area spacer for iOS */}
        <div className="h-safe-area-bottom bg-background" />
      </nav>

      {/* Desktop Side Navigation */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 shrink-0">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-elec-yellow to-amber-500 flex items-center justify-center">
              <Clock className="h-5 w-5 text-black" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">OJT Hub</h2>
              <p className="text-xs text-muted-foreground">20% Off-the-Job Training</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="p-4 border-t border-border">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">This Week</span>
              <span className="font-medium text-foreground">6.5h / 7.5h</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                style={{ width: '87%' }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Year Total</span>
              <span className="font-medium text-foreground">285h / 400h</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: '71%' }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default OJTHubNav;
