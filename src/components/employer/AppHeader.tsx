import { Menu, ArrowLeft, Briefcase, Search } from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  onMenuClick?: () => void;
  title?: string;
  subtitle?: string;
  onSearch?: () => void;
  className?: string;
}

export function AppHeader({
  showBack,
  onBack,
  onMenuClick,
  title,
  subtitle,
  onSearch,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-white/[0.06]',
        'bg-[hsl(0_0%_8%)]/95 backdrop-blur-lg supports-[backdrop-filter]:bg-[hsl(0_0%_8%)]/80',
        'pt-safe',
        className
      )}
    >
      <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {showBack ? (
            <button
              onClick={onBack}
              className="h-10 w-10 shrink-0 rounded-full text-white hover:text-elec-yellow hover:bg-white/[0.08] active:scale-95 transition-all touch-manipulation flex items-center justify-center"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={onMenuClick}
              className="h-10 w-10 shrink-0 rounded-full text-white hover:text-elec-yellow hover:bg-white/[0.08] active:scale-95 transition-all md:hidden touch-manipulation flex items-center justify-center"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          {/* Logo or custom title */}
          {title ? (
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-white truncate">{title}</h1>
              {subtitle && <p className="text-xs text-white truncate">{subtitle}</p>}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-elec-yellow/10 shrink-0">
                <Briefcase className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="flex items-center min-w-0">
                <span className="text-lg sm:text-xl font-bold text-elec-yellow">Elec</span>
                <span className="text-lg sm:text-xl font-bold text-white">-Mate</span>
                <span className="text-xs sm:text-sm font-medium text-white ml-2 hidden sm:inline">
                  for Business
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onSearch && (
            <button
              onClick={onSearch}
              className="h-10 w-10 rounded-full text-white hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all touch-manipulation flex items-center justify-center"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
          <NotificationBell />
          <button className="h-11 w-11 rounded-full bg-elec-yellow flex items-center justify-center active:scale-95 hover:bg-elec-yellow/90 transition-all touch-manipulation">
            <span className="text-black font-semibold text-sm">JW</span>
          </button>
        </div>
      </div>
    </header>
  );
}
