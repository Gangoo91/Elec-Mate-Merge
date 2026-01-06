
import { Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import RecordingIndicator from "../apprentice/timer/RecordingIndicator";
import NotificationDropdown from "../notifications/NotificationDropdown";
import { MessagesDropdown } from "./MessagesDropdown";
import UserProfileDropdown from "../auth/UserProfileDropdown";
import { useRef, useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface HeaderProps {
  toggleSidebar: () => void;
}

// Live clock component with smooth animations
const LiveClock = ({ className }: { className?: string }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = format(time, 'h');
  const minutes = format(time, 'mm');
  const seconds = format(time, 'ss');
  const period = format(time, 'a');
  const day = format(time, 'EEE');
  const date = format(time, 'd MMM');

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Date pill - hidden on mobile */}
      <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
        <span className="text-xs font-medium text-white/60">{day}</span>
        <span className="text-xs font-semibold text-white/80">{date}</span>
      </div>

      {/* Time display */}
      <div className="flex items-center">
        <div className="flex items-baseline gap-0.5 px-2 sm:px-2.5 py-1 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm">
          {/* Hours */}
          <span className="text-sm sm:text-base font-bold tabular-nums text-white tracking-tight">
            {hours}
          </span>
          {/* Colon with pulse animation */}
          <span className="text-sm sm:text-base font-bold text-elec-yellow animate-pulse">
            :
          </span>
          {/* Minutes */}
          <span className="text-sm sm:text-base font-bold tabular-nums text-white tracking-tight">
            {minutes}
          </span>
          {/* Seconds - subtle, hidden on smallest screens */}
          <span className="hidden sm:inline-flex items-baseline">
            <span className="text-xs font-medium text-white/40 ml-0.5">:</span>
            <span className="text-xs font-medium tabular-nums text-white/40 w-4">
              {seconds}
            </span>
          </span>
          {/* AM/PM badge */}
          <span className="ml-1 px-1 sm:px-1.5 py-0.5 text-[10px] sm:text-xs font-bold rounded bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30">
            {period.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

const Header = ({ toggleSidebar }: HeaderProps) => {
  const isMobile = useIsMobile();
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for visual effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    }
  }, [isMobile]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "backdrop-blur-xl bg-elec-dark/80",
        "border-b transition-all duration-300",
        // Scroll-based styling changes
        isScrolled
          ? "border-white/15 shadow-xl shadow-black/40"
          : "border-white/5 shadow-lg shadow-black/20",
        // Safe area for notch devices
        "safe-area-inset-top"
      )}
    >
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4">
        {/* Left side - Menu toggle and branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isMobile && (
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className={cn(
                  "h-10 w-10 min-w-[44px] min-h-[44px]",
                  "hover:bg-white/10 active:bg-white/15",
                  "touch-manipulation rounded-xl",
                  "transition-colors duration-150"
                )}
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {/* Enhanced branding with gradient icon container */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 shadow-lg shadow-elec-yellow/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
            </motion.div>
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

        {/* Center - Live Clock (desktop) */}
        <LiveClock className="hidden md:flex" />

        {/* Right side - Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <MessagesDropdown />
          <NotificationDropdown />
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
