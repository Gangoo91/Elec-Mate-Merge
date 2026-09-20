import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isSameMonth, isToday } from 'date-fns';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Settings,
  Printer,
  Share2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { eyebrowCn } from './calendarStyles';
import CalendarViewSwitcher from './CalendarViewSwitcher';
import type { CalendarView } from '@/types/calendar';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onOpenSettings: () => void;
  onViewChange: (view: CalendarView) => void;
  /** Google Calendar sync state — the connect button lives in the header so
   *  nobody has to find it inside the "…" menu. Hidden once connected. */
  googleConnected: boolean;
  googleConnecting: boolean;
  onConnectGoogle: () => void;
  /** Tap the title → pick a date to jump to. */
  onJumpTo: (date: Date) => void;
  /** The week on paper, black on white. */
  onPrint: () => void;
}

const GoogleG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

function getHeaderLabel(date: Date, view: CalendarView): string {
  switch (view) {
    case 'day':
      return format(date, 'EEE d MMM');
    case 'week': {
      const weekStart = new Date(date);
      // Monday-start, matching the grid. getDay() is 0 on a Sunday, which has
      // to reach back six days rather than forward one.
      const offset = (date.getDay() + 6) % 7;
      weekStart.setDate(date.getDate() - offset);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return isSameMonth(weekStart, weekEnd)
        ? `${format(weekStart, 'd')}–${format(weekEnd, 'd MMM yyyy')}`
        : `${format(weekStart, 'd MMM')} – ${format(weekEnd, 'd MMM yyyy')}`;
    }
    case 'three': {
      const end = new Date(date);
      end.setDate(date.getDate() + 2);
      return isSameMonth(date, end)
        ? `${format(date, 'EEE d')} – ${format(end, 'EEE d MMM')}`
        : `${format(date, 'EEE d MMM')} – ${format(end, 'EEE d MMM')}`;
    }
    case 'month':
      return format(date, 'MMMM yyyy');
  }
}

/**
 * The calendar's own sticky header.
 *
 * It replaces the shared `BusinessPageLayout` bar, which scrolled away: on a
 * calendar the period you are looking at and the control that changes it have
 * to stay put while the agenda underneath moves. Two rows, matching the Price
 * Book — identity and actions, then the chips.
 *
 * The word "Calendar" is gone from the title on purpose. The month IS the
 * title, and it is the thing being navigated; a fixed label above it was
 * spending the widest line on the screen saying nothing.
 */
const CalendarHeader = ({
  currentDate,
  view,
  onPrevious,
  onNext,
  onToday,
  onOpenSettings,
  onViewChange,
  googleConnected,
  googleConnecting,
  onConnectGoogle,
  onJumpTo,
  onPrint,
}: CalendarHeaderProps) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [jumpOpen, setJumpOpen] = useState(false);
  const jumpRef = useRef<HTMLDivElement>(null);
  const weekNumber = format(currentDate, 'I');

  useEffect(() => {
    if (!jumpOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (jumpRef.current && !jumpRef.current.contains(e.target as Node)) setJumpOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [jumpOpen]);
  const menuRef = useRef<HTMLDivElement>(null);
  const showToday = !isToday(currentDate);

  useEffect(() => {
    if (!menuOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  /*
   * Straight to the booking page rather than the OS share sheet.
   *
   * The sheet listed WhatsApp and Mail on a phone and looked like a send
   * screen, but on desktop `navigator.share` does not exist — so this fell
   * through to a silent clipboard copy and appeared to do nothing at all.
   * `/electrician/booking` sends properly on both, and also shows what the
   * link has actually brought in.
   */
  const handleOpenBookingPage = () => {
    setMenuOpen(false);
    navigate('/electrician/booking');
  };

  // The shell's top bar is fixed and publishes its height; sticking at 0 put
  // this header underneath it the moment the page scrolled.
  return (
    <div className="sticky top-[var(--header-height,56px)] z-50 border-b border-white/[0.10] bg-background/95 backdrop-blur-sm">
      <div className="px-4 py-2">
        <div className="flex h-11 items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/electrician/business')}
            aria-label="Back to Business Hub"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* From `sm` the period is stepped from the title itself — ‹ Month ›
              — with the view chips on the same row, the way every desktop
              calendar is laid out. On a phone the arrows live with the chips
              on the row below, within reach of the thumb. */}
          <button
            type="button"
            onClick={onPrevious}
            aria-label={`Previous ${view}`}
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.96] sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {/* The title is the jump control: tap it, pick a date. The ISO week
              number sits beside it from `sm` for anyone who plans by week. */}
          <div className="relative min-w-0 flex-1 sm:flex-none" ref={jumpRef}>
            <button
              type="button"
              onClick={() => setJumpOpen((v) => !v)}
              aria-expanded={jumpOpen}
              aria-label="Jump to a date"
              className="flex h-11 min-w-0 max-w-full items-center gap-2 rounded-xl px-1 text-left touch-manipulation hover:bg-white/[0.06]"
            >
              <h1 className="min-w-0 truncate text-[19px] font-semibold tracking-tight text-white sm:text-[21px]">
                {getHeaderLabel(currentDate, view)}
              </h1>
              {view !== 'month' && (
                <span className="hidden shrink-0 rounded-md border border-white/[0.14] px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-white sm:inline">
                  Wk {weekNumber}
                </span>
              )}
            </button>
            {jumpOpen && (
              <div className="absolute left-0 top-12 z-50 w-[260px] space-y-2 rounded-xl border border-white/[0.12] bg-neutral-900 p-3 shadow-xl shadow-black/40">
                <span className={cn(eyebrowCn, 'block')}>Go to</span>
                <input
                  type="date"
                  autoFocus
                  defaultValue={format(currentDate, 'yyyy-MM-dd')}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (!v) return;
                    const [y, m, d] = v.split('-').map(Number);
                    onJumpTo(new Date(y, m - 1, d));
                    setJumpOpen(false);
                  }}
                  className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 [color-scheme:dark] touch-manipulation"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: 'Today', days: 0 },
                    { label: 'Next week', days: 7 },
                    { label: 'In 2 weeks', days: 14 },
                    { label: 'Next month', days: 30 },
                  ].map((q) => (
                    <button
                      key={q.label}
                      type="button"
                      onClick={() => {
                        const t = new Date();
                        t.setDate(t.getDate() + q.days);
                        onJumpTo(t);
                        setJumpOpen(false);
                      }}
                      className="h-9 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 text-[12px] font-medium text-white touch-manipulation active:scale-[0.97]"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onNext}
            aria-label={`Next ${view}`}
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.96] sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="hidden min-w-0 flex-1 items-center gap-2 sm:flex">
            <div className="ml-2">
              <CalendarViewSwitcher view={view} onViewChange={onViewChange} />
            </div>
          </div>

          {!googleConnected && (
            <button
              type="button"
              onClick={onConnectGoogle}
              disabled={googleConnecting}
              aria-label="Connect Google Calendar"
              className="flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[13px] font-semibold text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.98] disabled:opacity-60 sm:w-auto sm:px-3"
            >
              <GoogleG className="h-4 w-4" />
              <span className="hidden sm:inline">Connect Google Calendar</span>
            </button>
          )}

          {showToday && (
            <button
              type="button"
              onClick={onToday}
              className="h-11 shrink-0 rounded-xl px-3 text-[13px] font-semibold text-elec-yellow transition-colors hover:bg-elec-yellow/[0.10] touch-manipulation"
            >
              Today
            </button>
          )}

          <div className="relative shrink-0" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="More options"
              aria-expanded={menuOpen}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors touch-manipulation',
                menuOpen ? 'bg-white/[0.10]' : 'hover:bg-white/10'
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-12 z-50 min-w-[220px] overflow-hidden rounded-xl border border-white/[0.12] bg-neutral-900 py-1 shadow-xl shadow-black/40">
                <button
                  type="button"
                  onClick={handleOpenBookingPage}
                  className="flex h-11 w-full items-center gap-2.5 px-3 text-left text-[13.5px] font-medium text-white hover:bg-white/[0.06] touch-manipulation"
                >
                  <Share2 className="h-4 w-4 text-elec-yellow" />
                  Booking link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onPrint();
                  }}
                  className="flex h-11 w-full items-center gap-2.5 px-3 text-left text-[13.5px] font-medium text-white hover:bg-white/[0.06] touch-manipulation"
                >
                  <Printer className="h-4 w-4 text-elec-yellow" />
                  Print this week
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenSettings();
                  }}
                  className="flex h-11 w-full items-center gap-2.5 px-3 text-left text-[13.5px] font-medium text-white hover:bg-white/[0.06] touch-manipulation"
                >
                  <Settings className="h-4 w-4 text-elec-yellow" />
                  Calendar settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* The period controls sit WITH the view chips, not in the title row:
          "next week" belongs beside "Week". They were 36px chevrons by the ⋯
          menu, top right — the furthest thing from the grid on a laptop and
          invisible enough that a customer asked whether the calendar could
          move week by week at all. 44px, both. */}
      <div className="flex items-center gap-2 px-4 pb-3 sm:hidden">
        <CalendarViewSwitcher view={view} onViewChange={onViewChange} />
        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={onPrevious}
            aria-label={`Previous ${view}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.96]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label={`Next ${view}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.96]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
