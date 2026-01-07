
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import RecordingIndicator from "../apprentice/timer/RecordingIndicator";
import UserProfileDropdown from "../auth/UserProfileDropdown";
import { useRef, useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface HeaderProps {
  toggleSidebar: () => void;
}

// Live clock component - desktop only
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
      {/* Date pill */}
      <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
        <span className="text-xs font-medium text-white/60">{day}</span>
        <span className="text-xs font-semibold text-white/80">{date}</span>
      </div>

      {/* Time display */}
      <div className="flex items-center">
        <div className="flex items-baseline gap-0.5 px-2.5 py-1 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm">
          <span className="text-base font-bold tabular-nums text-white tracking-tight">
            {hours}
          </span>
          <span className="text-base font-bold text-elec-yellow animate-pulse">:</span>
          <span className="text-base font-bold tabular-nums text-white tracking-tight">
            {minutes}
          </span>
          <span className="inline-flex items-baseline">
            <span className="text-xs font-medium text-white/40 ml-0.5">:</span>
            <span className="text-xs font-medium tabular-nums text-white/40 w-4">{seconds}</span>
          </span>
          <span className="ml-1 px-1.5 py-0.5 text-xs font-bold rounded bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30">
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
        "backdrop-blur-xl bg-elec-dark/90",
        "border-b transition-all duration-300",
        isScrolled
          ? "border-white/15 shadow-xl shadow-black/40"
          : "border-white/5",
        "safe-area-inset-top"
      )}
    >
      {/* Mobile: Compact 52px | Desktop: 64px */}
      <div className="flex items-center justify-between h-[52px] sm:h-16 px-2 sm:px-4">
        {/* Left side - Menu toggle and branding */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {isMobile && (
            <motion.div whileTap={{ scale: 0.92 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className={cn(
                  "h-9 w-9 min-w-[36px] min-h-[36px]",
                  "hover:bg-white/10 active:bg-white/20",
                  "touch-manipulation rounded-lg",
                  "transition-all duration-150"
                )}
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-[18px] w-[18px]" />
              </Button>
            </motion.div>
          )}

          {/* Branding - compact on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <motion.div
              className={cn(
                "rounded-lg sm:rounded-xl overflow-hidden",
                "border border-elec-yellow/30"
              )}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/logo.jpg"
                alt="Elec-Mate"
                className="h-8 w-8 sm:h-10 sm:w-10 object-cover"
              />
            </motion.div>
            <div className="flex items-center">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-elec-yellow to-amber-400 bg-clip-text text-transparent">Elec</span>
                <span className="text-white/90">-</span>
                <span className="text-white">Mate</span>
              </h1>
              <RecordingIndicator className="ml-1" />
            </div>
          </div>
        </div>

        {/* Center - Live Clock (desktop only) */}
        <LiveClock className="hidden md:flex" />

        {/* Right side - Profile with combined notifications/messages */}
        <div className="flex items-center">
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
