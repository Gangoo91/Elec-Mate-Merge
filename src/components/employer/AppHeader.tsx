import { Menu, ArrowLeft, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "./NotificationBell";

interface AppHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  onMenuClick?: () => void;
}

export function AppHeader({ showBack, onBack, onMenuClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-elec-yellow/20 bg-elec-gray/95 backdrop-blur supports-[backdrop-filter]:bg-elec-gray/80 pt-safe">
      <div className="flex h-14 items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {showBack ? (
            <Button variant="ghost" size="icon" onClick={onBack} className="text-foreground hover:text-elec-yellow hover:bg-elec-yellow/10 touch-target touch-feedback transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-foreground hover:text-elec-yellow hover:bg-elec-yellow/10 touch-target touch-feedback transition-colors">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-elec-yellow/10">
              <Briefcase className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="flex items-center">
              <span className="text-lg sm:text-xl font-bold text-elec-yellow">Elec</span>
              <span className="text-lg sm:text-xl font-bold text-foreground">-Mate</span>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground ml-2 hidden sm:inline">for Business</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <NotificationBell />
          <div className="w-9 h-9 rounded-full bg-elec-yellow flex items-center justify-center touch-feedback hover:bg-elec-yellow/90 transition-colors">
            <span className="text-elec-dark font-semibold text-sm">JW</span>
          </div>
        </div>
      </div>
    </header>
  );
}
