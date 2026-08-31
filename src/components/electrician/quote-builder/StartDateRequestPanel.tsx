import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, supabase } from '@/integrations/supabase/client';
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
 *
 * ELE-1562: there is now a third move — suggest a different day. Dan reported
 * that when a client picks a date he cannot do, he has no way to counter from
 * inside the app; the conversation drops to WhatsApp and the quote is left
 * showing a request he has silently ignored. The dates offered here come from
 * the same `public-booking` availability the client saw, so he can only
 * propose a day he can actually work.
 */
const StartDateRequestPanel = ({ quote }: { quote: Quote }) => {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [openDates, setOpenDates] = useState<string[]>([]);
  const [chosenDate, setChosenDate] = useState<string>('');
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);

  const requested = quote.requested_start_date;
  const alreadyBooked = !!quote.booked_slot_start;

  /*
   * The days he can actually work, from the same endpoint the client's
   * booking page uses. Fetched only when he opens the suggest panel — most
   * requests get confirmed, and this is a network call on a page that is
   * often opened just to read the request.
   *
   * Falls back to a free-text date if the fetch fails: being unable to reach
   * an availability endpoint should not stop him answering his customer.
   */
  useEffect(() => {
    // Guarded here rather than by the component's early return below: hooks
    // must run in the same order on every render, and this one sits above it.
    if (!suggesting || !quote.user_id || openDates.length > 0) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/public-booking?electrician_id=${quote.user_id}&days=56`,
          { headers: { apikey: SUPABASE_PUBLISHABLE_KEY } }
        );
        const json = await res.json();
        if (!cancelled) {
          setOpenDates(
            (json.open_dates || []).filter((d: string) => d !== requested).slice(0, 21)
          );
        }
      } catch {
        // Non-fatal — the picker just shows nothing and he can still ring them.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [suggesting, quote.user_id, openDates.length, requested]);


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

  const handleSuggest = async () => {
    if (!quote.id || !chosenDate) return;
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('quote-propose-date', {
        body: { quoteId: quote.id, proposedDate: chosenDate, note: note.trim() || null },
      });
      if (error) throw error;

      // The function saves the proposal even when the email cannot go — say
      // which happened rather than a blanket "sent", so he knows whether he
      // still needs to ring them.
      toast({
        title: data?.emailed ? 'Suggestion sent' : 'Suggestion saved',
        description: data?.emailed
          ? `${clientName} has been emailed ${prettyDate(chosenDate)} to confirm.`
          : `Saved, but no email went out (${data?.reason === 'no_client_email' ? 'no email address on file' : 'email failed'}). Give them a ring.`,
        variant: data?.emailed ? undefined : 'destructive',
      });

      setSuggesting(false);
      setChosenDate('');
      setNote('');
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['start-date-requests'] });
    } catch (e) {
      toast({
        title: 'Could not send',
        description: e instanceof Error ? e.message : 'Try again',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

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

  const awaitingClient = !!quote.proposed_start_date;

  return (
    <div className="rounded-2xl border border-elec-yellow/30 bg-elec-yellow/[0.08] p-4 sm:p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
        {awaitingClient ? 'Waiting on them' : 'Waiting on you'}
      </p>
      <h3 className="mt-1.5 text-[17px] font-semibold tracking-tight text-white">
        {awaitingClient
          ? `You've suggested ${prettyDate(quote.proposed_start_date as string)}`
          : `${clientName} would like to start ${prettyDate(requested)}`}
      </h3>
      <p className="mt-1 text-[13px] leading-snug text-white">
        {awaitingClient
          ? `${clientName} asked for ${prettyDate(requested)} and has been emailed your suggestion. Nothing is in your diary until they accept.`
          : `They asked for ${prefLabel}. Nothing is in your diary until you confirm, and they know that — so they are waiting to hear back.`}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={saving}
          className="h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70"
        >
          {saving ? 'Confirming…' : awaitingClient ? 'Confirm their original date' : 'Confirm this date'}
        </button>

        <button
          type="button"
          onClick={() => setSuggesting((v) => !v)}
          className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-white/[0.10] touch-manipulation"
        >
          {awaitingClient ? 'Suggest a different day' : "Can't do that date"}
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

      {suggesting && (
        <div className="mt-4 rounded-xl border border-white/[0.12] bg-black/20 p-3.5">
          <p className="text-[12px] font-medium text-white">
            Pick a day you can do — they'll get an email to confirm it
          </p>

          {openDates.length > 0 ? (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {openDates.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setChosenDate(chosenDate === d ? '' : d)}
                  className={
                    'inline-flex min-h-11 items-center rounded-full border px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation ' +
                    (chosenDate === d
                      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                      : 'border-white/[0.12] bg-white/[0.06] text-white hover:border-white/[0.28]')
                  }
                >
                  {prettyDate(d)}
                </button>
              ))}
            </div>
          ) : (
            /* Availability unreachable, or genuinely nothing free in 8 weeks. */
            <input
              type="date"
              value={chosenDate}
              onChange={(e) => setChosenDate(e.target.value)}
              className="mt-2.5 h-11 w-full rounded-lg border border-white/[0.12] bg-white/[0.06] px-3 text-[14px] text-white [color-scheme:dark]"
            />
          )}

          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional — why, or anything else they should know"
            style={{ fontSize: '16px' }}
            className="mt-2.5 h-11 w-full rounded-lg border border-white/[0.12] bg-white/[0.06] px-3 text-white placeholder:text-white/45"
          />

          <button
            type="button"
            onClick={handleSuggest}
            disabled={!chosenDate || sending}
            className="mt-2.5 h-11 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70"
          >
            {sending ? 'Sending…' : chosenDate ? `Send ${prettyDate(chosenDate)}` : 'Pick a day'}
          </button>
        </div>
      )}

      <p className="mt-3 text-[11.5px] leading-snug text-white">
        Confirming blocks out the whole day as the start of the job. It does not guess how long the
        work runs — extend it in your diary once you know.
      </p>
    </div>
  );
};

export default StartDateRequestPanel;
