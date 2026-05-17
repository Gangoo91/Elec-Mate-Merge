import { useEffect, useRef, useState } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { format, isToday } from 'date-fns';
import { Settings, ChevronLeft, ChevronRight, MoreHorizontal, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { CalendarView } from '@/types/calendar';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onOpenSettings: () => void;
  onCreateEvent: () => void;
}

function getHeaderLabel(date: Date, view: CalendarView): string {
  switch (view) {
    case 'day':
      return format(date, 'EEE d MMM');
    case 'week': {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay() + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${format(weekStart, 'd')}–${format(weekEnd, 'd MMM yyyy')}`;
      }
      return `${format(weekStart, 'd MMM')} – ${format(weekEnd, 'd MMM yyyy')}`;
    }
    case 'month':
      return format(date, 'MMMM yyyy');
  }
}

const CalendarHeader = ({
  currentDate,
  view,
  onPrevious,
  onNext,
  onToday,
  onOpenSettings,
}: CalendarHeaderProps) => {
  const todayVisible = isToday(currentDate);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
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
    const shareData = {
      title: 'Book an Appointment',
      text: 'Book a time slot with me:',
      url,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share — not an error
      }
    } else {
      const ok = await copyToClipboard(url);
      if (ok) toast({ title: 'Booking link copied to clipboard' });
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      {/* Left: month label — gets the room it needs */}
      <h2 className="text-[20px] sm:text-[22px] font-semibold tracking-tight text-white truncate flex-1 min-w-0">
        {getHeaderLabel(currentDate, view)}
      </h2>

      {/* Right: tight cluster — prev · next · today · kebab */}
      <div className="flex items-center gap-0.5 shrink-0">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous"
          className="h-10 w-10 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08] touch-manipulation"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          className="h-10 w-10 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08] touch-manipulation"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        {!todayVisible && (
          <button
            type="button"
            onClick={onToday}
            className="h-10 px-3 text-[12px] font-semibold rounded-lg text-elec-yellow hover:bg-elec-yellow/[0.08] active:bg-elec-yellow/[0.12] touch-manipulation"
          >
            Today
          </button>
        )}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="More options"
            aria-expanded={menuOpen}
            className={cn(
              'h-10 w-10 flex items-center justify-center rounded-lg touch-manipulation',
              menuOpen
                ? 'bg-white/[0.08] text-white'
                : 'text-white/70 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08]'
            )}
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-12 z-50 min-w-[200px] rounded-xl bg-neutral-900 border border-white/10 shadow-xl shadow-black/40 py-1 overflow-hidden">
              <button
                type="button"
                onClick={handleShareBookingLink}
                className="w-full px-3 py-2.5 flex items-center gap-2.5 text-left text-[13.5px] text-white hover:bg-white/[0.06] touch-manipulation"
              >
                <Share2 className="h-4 w-4 text-white/60" />
                Share booking link
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenSettings();
                }}
                className="w-full px-3 py-2.5 flex items-center gap-2.5 text-left text-[13.5px] text-white hover:bg-white/[0.06] touch-manipulation"
              >
                <Settings className="h-4 w-4 text-white/60" />
                Calendar settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
