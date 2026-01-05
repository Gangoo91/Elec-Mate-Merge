import { Menu, ArrowLeft, Briefcase, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "./NotificationBell";
import { cn } from "@/lib/utils";

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
  className
}: AppHeaderProps) {
  return (
    <header className={cn(
      "sticky top-0 z-50 border-b border-elec-yellow/20",
      "bg-elec-gray/95 backdrop-blur-lg supports-[backdrop-filter]:bg-elec-gray/80",
      "pt-safe",
      className
    )}>
      <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {showBack ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-10 w-10 shrink-0 text-foreground hover:text-elec-yellow hover:bg-elec-yellow/10 active:scale-95 transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="h-10 w-10 shrink-0 text-foreground hover:text-elec-yellow hover:bg-elec-yellow/10 active:scale-95 transition-all md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Logo or custom title */}
          {title ? (
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-foreground truncate">{title}</h1>
              {subtitle && (
                <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-elec-yellow/10 shrink-0">
                <Briefcase className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="flex items-center min-w-0">
                <span className="text-lg sm:text-xl font-bold text-elec-yellow">Elec</span>
                <span className="text-lg sm:text-xl font-bold text-foreground">-Mate</span>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground ml-2 hidden sm:inline">
                  for Business
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onSearch && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearch}
              className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted/50 active:scale-95 transition-all"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          <NotificationBell />
          <button className="h-10 w-10 rounded-full bg-elec-yellow flex items-center justify-center active:scale-95 hover:bg-elec-yellow/90 transition-all">
            <span className="text-elec-dark font-semibold text-sm">JW</span>
          </button>
        </div>
      </div>
    </header>
  );
}
