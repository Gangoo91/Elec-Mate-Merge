import { Menu, Search, Info } from 'lucide-react';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import RecordingIndicator from '../apprentice/timer/RecordingIndicator';
import UserProfileDropdown from '../auth/UserProfileDropdown';
import NotificationBell from './NotificationBell';
import { CommandPalette } from '../search/CommandPalette';
import AppTipsSheet from './AppTipsSheet';
import { useRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface HeaderProps {
  toggleSidebar: () => void;
  /** Desktop-only: when sidebar is collapsed, header grows to full width and shows an expand button. */
  sidebarCollapsed?: boolean;
}

/**
 * Header clock — desktop only.
 *
 * What this replaces was five spans at three sizes for one time value: bold
 * hours, a volt colon on `animate-pulse`, bold minutes, then a smaller colon
 * and seconds, then AM/PM in a `bg-elec-yellow/20` badge — all beside a second,
 * differently-styled pill for the date. Six elements to say "Friday, ten past
 * three".
 *
 * Three things were wrong beyond the fussiness:
 *
 *   SECONDS. A `setInterval(…, 1000)` re-rendered the app header once a second,
 *   on every page, for a digit nobody reads. This now schedules a single
 *   timeout to the next MINUTE boundary — one render a minute instead of sixty,
 *   and it flips exactly when the minute does rather than drifting by however
 *   many seconds into the minute the page happened to load.
 *
 *   THE PULSING COLON. A permanent animation on a piece of furniture. Motion
 *   should mean something is happening; this meant the clock was on.
 *
 *   THE VOLT WASH. `bg-elec-yellow/20` behind `border-elec-yellow/30` is
 *   translucent volt over near-black, which goes muddy brown — the exact thing
 *   the card recipe warns about. The period is quiet lower-case text now.
 */
const LiveClock = ({ className }: { className?: string }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const now = new Date();
      setTime(now);
      // Land on the boundary, not 60s from whenever this mounted.
      const msToNextMinute = 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds());
      timeout = setTimeout(schedule, msToNextMinute);
    };

    const handleVisibility = () => {
      clearTimeout(timeout);
      // Resync on return: a backgrounded tab's timers are throttled, so the
      // clock would otherwise come back showing whenever it last fired.
      if (!document.hidden) schedule();
    };

    schedule();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className={cn('flex items-center', className)}>
      {/* One pill, not two. Same material as every card in the app — gold
          hairline edge over the shared surface — so the header belongs to the
          same product as the page under it. */}
      <div
        className={cn(
          'relative flex items-baseline gap-2 overflow-hidden rounded-lg border border-elec-yellow/35 px-3 py-1.5',
          CARD_SURFACE
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
        />
        <span className="text-[12px] font-medium text-white">{format(time, 'EEE d MMM')}</span>
        <span className="text-[15px] font-semibold tabular-nums tracking-tight text-white">
          {format(time, 'h:mm')}
          <span className="ml-1 text-[11px] font-medium lowercase text-white">
            {format(time, 'aaa')}
          </span>
        </span>
      </div>
    </div>
  );
};

const Header = ({ toggleSidebar, sidebarCollapsed = false }: HeaderProps) => {
  const isMobile = useIsMobile();
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        // ELE-869 — main app header sits above all in-page sticky sub-headers
        // (which use z-50). Modals/dialogs/sheets/drawers/toasts run at z-[100]+
        // and still cover the header when active.
        'fixed top-0 left-0 right-0 z-[60]',
        sidebarCollapsed ? 'lg:left-0' : 'lg:left-64',
        'transition-[left] duration-300 ease-in-out',
        'backdrop-blur-xl bg-elec-dark/90',
        'border-b transition-all duration-300',
        isScrolled ? 'border-white/10 shadow-2xl shadow-black/40' : 'border-white/[0.06]'
      )}
      style={{
        // Use CSS variable with fallback for safe area
        paddingTop: 'var(--safe-area-top, env(safe-area-inset-top, 0px))',
      }}
    >
      {/* Mobile: 48px | Desktop: 64px (matches sidebar logo section h-16) */}
      <div className="flex items-center justify-between h-12 lg:h-16 px-3 sm:px-4">
        {/* Left side - Menu toggle and branding */}
        <div className="flex items-center gap-2.5">
          {isMobile && (
            <motion.div whileTap={{ scale: 0.92 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className={cn(
                  'h-10 w-10 min-w-[40px] min-h-[40px]',
                  'hover:bg-white/10 active:bg-white/15',
                  'touch-manipulation rounded-xl',
                  'transition-all duration-150'
                )}
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </motion.div>
          )}

          {/* Desktop: expand sidebar button, only when collapsed */}
          {!isMobile && sidebarCollapsed && (
            <motion.div whileTap={{ scale: 0.92 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-10 w-10 hover:bg-white/10 rounded-xl"
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </motion.div>
          )}

          {/* Branding - Logo + gradient wordmark (mobile only — sidebar shows it on desktop) */}
          <motion.div className="flex items-center gap-2 lg:hidden" whileTap={{ scale: 0.97 }}>
            <div className="rounded-lg overflow-hidden h-8 w-8 border border-elec-yellow/20 shadow-md shadow-elec-yellow/5 flex-shrink-0">
              <img src="/logo.jpg" alt="Elec-Mate" className="h-full w-full object-cover" />
            </div>
            <h1 className="text-lg font-bold tracking-tight flex items-center">
              <span className="bg-gradient-to-r from-elec-yellow to-amber-400 bg-clip-text text-transparent">
                Elec
              </span>
              <span className="text-white">-Mate</span>
            </h1>
            <RecordingIndicator className="ml-0.5" />
          </motion.div>
          {/* Desktop: just the recording indicator (branding is in sidebar) */}
          <RecordingIndicator className="hidden lg:block" />
        </div>

        {/* Center - Live Clock (desktop only) */}
        <LiveClock className="hidden lg:flex" />

        {/* Right side - Action buttons + Profile */}
        <div className="flex items-center gap-1">
          <motion.div whileTap={{ scale: 0.92 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTipsOpen(true)}
              className={cn(
                'h-9 w-9 min-w-[36px] min-h-[36px] sm:h-10 sm:w-10 sm:min-w-[40px] sm:min-h-[40px]',
                'bg-white/5 border border-white/10',
                'hover:bg-white/10 active:bg-white/15',
                'touch-manipulation rounded-xl',
                'transition-all duration-150'
              )}
              aria-label="Tips and guidance"
            >
              <Info className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-white" />
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.92 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCommandOpen(true)}
              className={cn(
                'h-9 w-9 min-w-[36px] min-h-[36px] sm:h-10 sm:w-10 sm:min-w-[40px] sm:min-h-[40px]',
                'bg-white/5 border border-white/10',
                'hover:bg-white/10 active:bg-white/15',
                'touch-manipulation rounded-xl',
                'transition-all duration-150'
              )}
              aria-label="Search pages"
            >
              <Search className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-white" />
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.92 }}>
            <NotificationBell />
          </motion.div>
          <div className="ml-0.5">
            <UserProfileDropdown />
          </div>
        </div>
      </div>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <AppTipsSheet open={tipsOpen} onOpenChange={setTipsOpen} />
    </header>
  );
};

export default Header;
