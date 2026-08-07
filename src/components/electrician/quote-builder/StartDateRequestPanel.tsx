import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { openExternalUrl } from '@/utils/open-external-url';
import type { Quote } from '@/types/quote';

const prettyDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

/**
 * A client has asked to start on a particular day; this is where it gets
 * confirmed.
 *
 * ELE-1513. The acceptance page no longer reserves an hour, because the length
 * of the job is not knowable from the quote for most quotes and is not elapsed
 * time even when it is. So the client states a date and this closes the loop.
 *
 * Confirming writes an ALL-DAY event rather than a timed one. That is the
 * honest shape: what has been agreed is the day work begins, not that it takes
 * from nine until ten. A timed event would put a made-up finish time in the
 * diary and let the old double-booking logic act on it.
 */
const StartDateRequestPanel = ({ quote }: { quote: Quote }) => {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);

  const requested = quote.requested_start_date;
  const alreadyBooked = !!quote.booked_slot_start;

  // Only while there is a request that has not been actioned.
  if (!requested || alreadyBooked) return null;

  const preference = quote.requested_time_preference || 'flexible';
  const prefLabel =
    preference === 'morning'
      ? 'in the morning'
      : preference === 'afternoon'
        ? 'in the afternoon'
        : 'any time of day';
  const clientName = quote.client?.name?.trim() || 'The client';
  const clientPhone = quote.client?.phone?.trim();

  const handleConfirm = async () => {
    if (!quote.id || !quote.user_id) return;
    setSaving(true);
    try {
      const startAt = new Date(`${requested}T00:00:00`);
      const endAt = new Date(`${requested}T23:59:59`);

      const { data: event, error: eventError } = await supabase
        .from('calendar_events')
        .insert({
          user_id: quote.user_id,
          title: `Start: ${clientName}${quote.quoteNumber ? ` — ${quote.quoteNumber}` : ''}`,
          description: quote.quoteNumber ? `Start of work for quote ${quote.quoteNumber}` : null,
          start_at: startAt.toISOString(),
          end_at: endAt.toISOString(),
          all_day: true,
          event_type: 'site_visit',
          colour: '#F59E0B',
          location: quote.client?.address || null,
          client_id: quote.customer_id || null,
          notes: `Start date confirmed from quote acceptance (client asked for ${prefLabel}).`,
          sync_status: 'local_only',
          reminder_minutes: 60,
        })
        .select('id')
        .single();

      if (eventError) throw eventError;

      const { error: quoteError } = await supabase
        .from('quotes')
        .update({
          booked_slot_start: startAt.toISOString(),
          booked_slot_end: endAt.toISOString(),
          booking_calendar_event_id: event.id,
        })
        .eq('id', quote.id)
        .eq('user_id', quote.user_id);

      if (quoteError) throw quoteError;

      toast({
        title: 'Start date confirmed',
        description: `${prettyDate(requested)} is in your diary. Let ${clientName} know.`,
      });
      /*
       * All three surfaces that show this request — Quotes, the Booking page
       * and the Calendar — plus the diary the event has just landed in.
       *
       * No pulse key: `useCalendarPulse` is a useMemo over the events it is
       * handed, so refreshing `calendar-events` carries it.
       */
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['start-date-requests'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    } catch (e) {
      toast({
        title: 'Could not confirm',
        description: e instanceof Error ? e.message : 'Try again',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-elec-yellow/30 bg-elec-yellow/[0.08] p-4 sm:p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
        Waiting on you
      </p>
      <h3 className="mt-1.5 text-[17px] font-semibold tracking-tight text-white">
        {clientName} would like to start {prettyDate(requested)}
      </h3>
      <p className="mt-1 text-[13px] leading-snug text-white">
        They asked for {prefLabel}. Nothing is in your diary until you confirm, and they know that
        — so they are waiting to hear back.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={saving}
          className="h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation disabled:opacity-50"
        >
          {saving ? 'Confirming…' : 'Confirm this date'}
        </button>

        {clientPhone && (
          <button
            type="button"
            onClick={() => openExternalUrl(`tel:${clientPhone.replace(/[^\d+]/g, '')}`)}
            className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-white/[0.10] touch-manipulation"
          >
            Ring them
          </button>
        )}
      </div>

      <p className="mt-3 text-[11.5px] leading-snug text-white">
        Confirming blocks out the whole day as the start of the job. It does not guess how long the
        work runs — extend it in your diary once you know.
      </p>
    </div>
  );
};

export default StartDateRequestPanel;
