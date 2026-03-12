import { format, isToday } from 'date-fns';
import { Settings, ChevronLeft, ChevronRight, Plus, Share2 } from 'lucide-react';
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
        return `${format(weekStart, 'd')}–${format(weekEnd, 'd MMM')}`;
      }
      return `${format(weekStart, 'd MMM')} – ${format(weekEnd, 'd MMM')}`;
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
  onCreateEvent,
}: CalendarHeaderProps) => {
  const todayVisible = isToday(currentDate);

  const handleShareBookingLink = async () => {
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
      await navigator.clipboard.writeText(url);
      toast({ title: 'Booking link copied to clipboard' });
    }
  };

  return (
    <div className="flex items-center justify-between">
      {/* Left: Nav arrows + date label */}
      <div className="flex items-center gap-1 flex-1 min-w-0">
        <button
          type="button"
          onClick={onPrevious}
          className="h-11 w-10 flex items-center justify-center rounded-xl text-white active:bg-white/[0.08] touch-manipulation flex-shrink-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <h2 className="text-base font-bold text-white truncate">
          {getHeaderLabel(currentDate, view)}
        </h2>

        <button
          type="button"
          onClick={onNext}
          className="h-11 w-10 flex items-center justify-center rounded-xl text-white active:bg-white/[0.08] touch-manipulation flex-shrink-0"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Right: Today + Add + Settings */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          type="button"
          onClick={onToday}
          className={cn(
            'h-9 px-3 text-xs font-bold rounded-lg touch-manipulation transition-colors',
            todayVisible
              ? 'text-white/40 pointer-events-none'
              : 'text-elec-yellow border border-elec-yellow/30 active:bg-elec-yellow/10'
          )}
        >
          Today
        </button>
        <button
          type="button"
          onClick={onCreateEvent}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-elec-yellow text-black touch-manipulation active:scale-[0.95]"
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={handleShareBookingLink}
          className="h-11 w-10 flex items-center justify-center rounded-xl text-white active:bg-white/[0.08] touch-manipulation"
          title="Share booking link"
        >
          <Share2 className="h-[18px] w-[18px]" />
        </button>
        <button
          type="button"
          onClick={onOpenSettings}
          className="h-11 w-10 flex items-center justify-center rounded-xl text-white active:bg-white/[0.08] touch-manipulation"
        >
          <Settings className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
