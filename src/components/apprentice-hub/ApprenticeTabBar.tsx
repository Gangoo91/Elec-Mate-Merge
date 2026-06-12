/**
 * ApprenticeTabBar — fixed bottom tab bar, the primary navigation for
 * apprentices.
 *
 *   Today · Learn · [CAPTURE] · Hours · Me
 *
 * - Role-gated: renders null unless profile.role === 'apprentice', so
 *   electricians / employers never see it.
 * - The centre CAPTURE button opens the shared UnifiedCaptureSheet. Other
 *   surfaces (e.g. TodayPage quick actions) can open the same sheet without
 *   duplicating it by dispatching `window.dispatchEvent(new
 *   CustomEvent('elecmate:open-capture'))` — we listen for it here.
 * - Layout clearance: the fixed bar itself has zero layout impact. The
 *   component renders an IN-FLOW spacer (h-20) before the fixed nav, so
 *   mounting `<ApprenticeTabBar />` after a route group's <Routes> pushes
 *   the end of page content clear of the bar — and because the spacer is
 *   inside this component, it's role-gated too (no stray 80px gap for
 *   electricians).
 */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Camera, Clock, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { UnifiedCaptureSheet } from '@/components/apprentice-hub/UnifiedCaptureSheet';

interface TabItem {
  label: string;
  icon: LucideIcon;
  /** Navigation target; active when pathname startsWith this. */
  to: string;
}

const LEFT_TABS: TabItem[] = [
  { label: 'Today', icon: Home, to: '/apprentice/today' },
  { label: 'Learn', icon: BookOpen, to: '/study-centre' },
];

const RIGHT_TABS: TabItem[] = [
  { label: 'Hours', icon: Clock, to: '/apprentice/ojt-hub' },
  { label: 'Me', icon: User, to: '/apprentice/hub' },
];

export function ApprenticeTabBar() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [captureOpen, setCaptureOpen] = useState(false);

  // Let other apprentice surfaces open the capture sheet without mounting
  // their own copy (TodayPage quick action dispatches this).
  useEffect(() => {
    const openCapture = () => setCaptureOpen(true);
    window.addEventListener('elecmate:open-capture', openCapture);
    return () => window.removeEventListener('elecmate:open-capture', openCapture);
  }, []);

  // Role gate — apprentices only. Hooks above run unconditionally.
  if (profile?.role !== 'apprentice') return null;

  const renderTab = ({ label, icon: Icon, to }: TabItem) => {
    const active = pathname.startsWith(to);
    return (
      <button
        key={to}
        type="button"
        onClick={() => navigate(to)}
        aria-label={label}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex h-14 min-w-0 flex-col items-center justify-center gap-1 touch-manipulation transition-colors',
          active ? 'text-elec-yellow' : 'text-white/55 hover:text-white/85'
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 2} />
        <span className="text-[10px] font-medium leading-none">{label}</span>
      </button>
    );
  };

  return (
    <>
      {/* In-flow spacer — keeps the last of the page content clear of the
          fixed bar (h-14 + safe-area inset on notched phones). Lives inside
          the component so it's role-gated with it. */}
      <div className="h-24" aria-hidden />

      <nav
        aria-label="Apprentice navigation"
        className="fixed bottom-0 inset-x-0 z-50 bg-[hsl(0_0%_6%)]/95 backdrop-blur-md border-t border-white/[0.08] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-5 items-center max-w-2xl mx-auto">
          {LEFT_TABS.map(renderTab)}

          {/* Centre — raised capture button */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setCaptureOpen(true)}
              aria-label="Capture evidence"
              className="h-14 w-14 -translate-y-4 rounded-full bg-elec-yellow text-black shadow-lg shadow-black/40 flex items-center justify-center touch-manipulation active:scale-95 transition-transform"
            >
              <Camera className="h-6 w-6" strokeWidth={2.25} />
            </button>
          </div>

          {RIGHT_TABS.map(renderTab)}
        </div>
      </nav>

      {/* Mounted only while open — the sheet pulls the full portfolio +
          qualification AC data on mount, which must not run on every
          apprentice page just because the tab bar exists. */}
      {captureOpen && (
        <UnifiedCaptureSheet
          open={captureOpen}
          onOpenChange={setCaptureOpen}
          onComplete={() => setCaptureOpen(false)}
        />
      )}
    </>
  );
}

export default ApprenticeTabBar;
