import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { cardCn, chipBase, chipOff, chipOn } from '@/components/shared/surfaceStyles';
import { openExternalUrl } from '@/utils/open-external-url';
import { splitBookings, type PortalBooking } from '@/hooks/usePortalBookings';

const dayLabel = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

const timeLabel = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

/** "in 3 days" / "tomorrow" / "booked 2 weeks ago" — whichever is the news. */
function relativeDay(iso: string): string {
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days === -1) return 'yesterday';
  if (days > 0) return days < 14 ? `in ${days} days` : `in ${Math.round(days / 7)} weeks`;
  const ago = Math.abs(days);
  return ago < 14 ? `${ago} days ago` : `${Math.round(ago / 7)} weeks ago`;
}

const BookingRow = ({ booking }: { booking: PortalBooking }) => {
  const navigate = useNavigate();
  const phone = booking.client?.phone?.trim();

  return (
    <div className="px-4 py-3.5 sm:px-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="min-w-0 flex-1 truncate text-[15px] font-semibold tracking-tight text-white">
          {booking.client?.name ?? booking.title.replace(/^Booking:\s*/, '')}
        </p>
        {/* The slot, not just its start. A booking is an hour of your day and
            the row only ever admitted to the minute it began. */}
        <p className="shrink-0 text-[13px] font-semibold text-elec-yellow tabular-nums">
          {timeLabel(booking.start_at)}–{timeLabel(booking.end_at)}
        </p>
      </div>

      <p className="mt-0.5 text-[12px] text-white tabular-nums">
        {dayLabel(booking.start_at)} · {relativeDay(booking.start_at)}
      </p>

      {booking.location && (
        <p className="mt-0.5 truncate text-[12px] text-white">{booking.location}</p>
      )}

      {booking.description && (
        <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-white">
          {booking.description}
        </p>
      )}

      <div className="mt-2 flex flex-wrap gap-x-4">
        {phone && (
          <button
            type="button"
            onClick={() => openExternalUrl(`tel:${phone.replace(/[^\d+]/g, '')}`)}
            className="min-h-11 text-[13px] font-semibold text-elec-yellow transition-opacity hover:opacity-80 touch-manipulation"
          >
            Call
          </button>
        )}
        {booking.client && (
          <button
            type="button"
            // `/customers/:customerId`, not `?id=` — the query-string form
            // silently lands on the list with nothing selected.
            onClick={() => navigate(`/customers/${booking.client!.id}`)}
            className="min-h-11 text-[13px] font-semibold text-elec-yellow transition-opacity hover:opacity-80 touch-manipulation"
          >
            Customer
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate('/calendar')}
          className="min-h-11 text-[13px] font-semibold text-elec-yellow transition-opacity hover:opacity-80 touch-manipulation"
        >
          Diary
        </button>
      </div>
    </div>
  );
};

/**
 * What the link has actually brought in.
 *
 * Portal bookings go straight into the calendar and are indistinguishable
 * there from everything typed in by hand, so there has been no way to tell
 * whether sharing the link was worth doing. This is that answer.
 */
const PortalBookingsCard = ({
  bookings,
  isLoading,
}: {
  bookings: PortalBooking[];
  isLoading: boolean;
}) => {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const { upcoming, past } = splitBookings(bookings);
  const shown = tab === 'upcoming' ? upcoming : past;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Bookings received</h2>
        {past.length > 0 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTab('upcoming')}
              className={cn(chipBase, 'h-9 px-3.5 text-[12.5px]', tab === 'upcoming' ? chipOn : chipOff)}
            >
              Upcoming
            </button>
            <button
              type="button"
              onClick={() => setTab('past')}
              className={cn(chipBase, 'h-9 px-3.5 text-[12.5px]', tab === 'past' ? chipOn : chipOff)}
            >
              Been and gone
            </button>
          </div>
        )}
      </div>

      <div className={cn(cardCn, 'divide-y divide-white/[0.08] overflow-hidden p-0')}>
        {isLoading && (
          <p className="px-4 py-6 text-center text-[13px] text-white">Loading bookings…</p>
        )}

        {!isLoading && shown.length === 0 && (
          <p className="px-4 py-8 text-center text-[13px] leading-snug text-white">
            {bookings.length === 0
              ? 'Nothing booked through your link yet. Send it to a few customers and they will land here.'
              : tab === 'upcoming'
                ? 'Nothing coming up from the booking link.'
                : 'No past bookings from the link.'}
          </p>
        )}

        {!isLoading && shown.map((b) => <BookingRow key={b.id} booking={b} />)}
      </div>
    </section>
  );
};

export default PortalBookingsCard;
