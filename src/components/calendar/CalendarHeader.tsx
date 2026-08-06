import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isSameMonth, isToday } from 'date-fns';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Settings,
  Share2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { copyToClipboard } from '@/utils/clipboard';
import { toast } from '@/hooks/use-toast';
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
}

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
}: CalendarHeaderProps) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleShareBookingLink = async () => {
    setMenuOpen(false);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: 'Please sign in to share your booking link', variant: 'destructive' });
      return;
    }
    const url = `${window.location.origin}/book/${user.id}`;
    const shareData = { title: 'Book an appointment', text: 'Book a time slot with me:', url };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // Cancelled — not an error.
      }
    } else {
      const ok = await copyToClipboard(url);
      if (ok) toast({ title: 'Booking link copied to clipboard' });
    }
  };

  return (
    <div className="sticky top-0 z-50 border-b border-white/[0.10] bg-background/95 backdrop-blur-sm">
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

          <h1 className="min-w-0 flex-1 truncate text-[19px] font-semibold tracking-tight text-white sm:text-[21px]">
            {getHeaderLabel(currentDate, view)}
          </h1>

          {showToday && (
            <button
              type="button"
              onClick={onToday}
              className="h-11 shrink-0 rounded-xl px-3 text-[13px] font-semibold text-elec-yellow transition-colors hover:bg-elec-yellow/[0.10] touch-manipulation"
            >
              Today
            </button>
          )}

          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Previous"
              className="flex h-11 w-9 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next"
              className="flex h-11 w-9 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

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
                  onClick={handleShareBookingLink}
                  className="flex h-11 w-full items-center gap-2.5 px-3 text-left text-[13.5px] font-medium text-white hover:bg-white/[0.06] touch-manipulation"
                >
                  <Share2 className="h-4 w-4 text-elec-yellow" />
                  Share booking link
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

      <div className="px-4 pb-3">
        <CalendarViewSwitcher view={view} onViewChange={onViewChange} />
      </div>
    </div>
  );
};

export default CalendarHeader;
