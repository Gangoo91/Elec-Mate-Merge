
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
    let timer: NodeJS.Timeout;

    const startTimer = () => {
      timer = setInterval(() => setTime(new Date()), 1000);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        setTime(new Date());
        startTimer();
      }
    };

    startTimer();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
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
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Re-measure after a delay to catch safe area inset
    const timer = setTimeout(updateHeaderHeight, 100);

    // Re-measure on resize
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [isMobile]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "backdrop-blur-xl bg-background/95",
        "border-b transition-all duration-300",
        isScrolled
          ? "border-white/10 shadow-lg shadow-black/20"
          : "border-white/[0.06]"
      )}
      style={{
        // Use CSS variable with fallback for safe area
        paddingTop: 'var(--safe-area-top, env(safe-area-inset-top, 0px))',
      }}
    >
      {/* Mobile: 48px | Desktop: 56px */}
      <div className="flex items-center justify-between h-12 sm:h-14 px-3 sm:px-4">
        {/* Left side - Menu toggle and branding */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <motion.div whileTap={{ scale: 0.92 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className={cn(
                  "h-10 w-10 min-w-[40px] min-h-[40px]",
                  "hover:bg-white/10 active:bg-white/15",
                  "touch-manipulation rounded-xl",
                  "transition-all duration-150"
                )}
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-5 w-5 text-white/80" />
              </Button>
            </motion.div>
          )}

          {/* Branding - Clean single wordmark */}
          <motion.div
            className="flex items-center"
            whileTap={{ scale: 0.97 }}
          >
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center">
              <span className="text-elec-yellow">Elec</span>
              <span className="text-white/40">-</span>
              <span className="text-white">Mate</span>
            </h1>
            <RecordingIndicator className="ml-1.5" />
          </motion.div>
        </div>

        {/* Center - Live Clock (desktop only) */}
        <LiveClock className="hidden md:flex" />

        {/* Right side - Profile */}
        <div className="flex items-center">
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
