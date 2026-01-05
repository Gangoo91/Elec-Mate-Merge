
import { Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import RecordingIndicator from "../apprentice/timer/RecordingIndicator";
import NotificationDropdown from "../notifications/NotificationDropdown";
import UserProfileDropdown from "../auth/UserProfileDropdown";
import { useRef, useEffect } from "react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const isMobile = useIsMobile();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    }
  }, [isMobile]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-elec-dark/80 border-b border-white/10 shadow-lg shadow-black/20"
    >
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4">
        {/* Left side - Menu toggle and branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-10 w-10 hover:bg-white/10 touch-target mobile-tap-highlight rounded-xl"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Enhanced branding with gradient icon container */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 shadow-lg shadow-elec-yellow/10">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
            </div>
            <div className="flex items-center gap-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-elec-yellow to-amber-400 bg-clip-text text-transparent">Elec</span>
                <span className="text-white/90">-</span>
                <span className="text-white">Mate</span>
              </h1>
              <RecordingIndicator className="ml-1" />
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <NotificationDropdown />
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
