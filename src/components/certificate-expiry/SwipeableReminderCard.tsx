import { useState } from 'react';
import { ExpiryReminder } from '@/types/expiryTypes';
import { useSwipeable } from '@/hooks/use-swipeable';
import { CheckCircle2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SwipeableReminderCardProps {
  reminder: ExpiryReminder;
  onMarkContacted: (id: string) => void;
  onMarkBooked: (reminder: ExpiryReminder) => void;
  children: React.ReactNode;
}

export const SwipeableReminderCard = ({
  reminder,
  onMarkContacted,
  onMarkBooked,
  children,
}: SwipeableReminderCardProps) => {
  const [offset, setOffset] = useState(0);

  const swipeRef = useSwipeable({
    onSwipeLeft: () => {
      if (reminder.reminder_status === 'pending') {
        onMarkContacted(reminder.id);
      }
    },
    onSwipeRight: () => {
      if (reminder.reminder_status !== 'booked' && reminder.reminder_status !== 'completed') {
        onMarkBooked(reminder);
      }
    },
    threshold: 100,
  });

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Swipe Actions Background */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-green-500">
          <Calendar className="h-5 w-5" />
          <span className="text-sm font-medium">Book</span>
        </div>
        <div className="flex items-center gap-2 text-blue-500">
          <span className="text-sm font-medium">Contact</span>
          <CheckCircle2 className="h-5 w-5" />
        </div>
      </div>

      {/* Card Content */}
      <div
        ref={swipeRef}
        className={cn(
          "relative bg-card transition-transform duration-200",
          "touch-pan-y"
        )}
        style={{ transform: `translateX(${offset}px)` }}
      >
        {children}
      </div>
    </div>
  );
};
