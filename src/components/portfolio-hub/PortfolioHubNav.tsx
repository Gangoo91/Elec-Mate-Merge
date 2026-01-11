import { cn } from '@/lib/utils';
import { Home, Camera, BarChart3, MessageCircle, Share2 } from 'lucide-react';

export type NavSection = 'home' | 'evidence' | 'progress' | 'tutor' | 'export';

interface PortfolioHubNavProps {
  activeSection: NavSection;
  onSectionChange: (section: NavSection) => void;
  className?: string;
  tutorBadge?: number;
}

/**
 * PortfolioHubNav - Mobile-first bottom navigation bar
 *
 * Features:
 * - Fixed bottom position on mobile
 * - 5 navigation items with icons and labels
 * - Active state highlighting
 * - Badge support for notifications
 * - Safe area padding for notched devices
 */
export function PortfolioHubNav({
  activeSection,
  onSectionChange,
  className,
  tutorBadge = 0,
}: PortfolioHubNavProps) {
  const navItems: { id: NavSection; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'evidence', label: 'Evidence', icon: Camera },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'tutor', label: 'Tutor', icon: MessageCircle },
    { id: 'export', label: 'Export', icon: Share2 },
  ];

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-card/95 backdrop-blur-lg border-t border-border",
        "safe-area-inset-bottom",
        className
      )}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          const showBadge = item.id === 'tutor' && tutorBadge > 0;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative",
                "transition-all duration-200 ease-out",
                "active:scale-95 touch-manipulation"
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-elec-yellow/15"
                    : "bg-transparent"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    isActive
                      ? "text-elec-yellow"
                      : "text-muted-foreground"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                {/* Notification Badge */}
                {showBadge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] flex items-center justify-center px-1">
                    {tutorBadge > 9 ? '9+' : tutorBadge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-[10px] font-medium mt-0.5 transition-colors duration-200",
                  isActive
                    ? "text-elec-yellow"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>

              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute -bottom-0.5 w-1 h-1 bg-elec-yellow rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default PortfolioHubNav;
