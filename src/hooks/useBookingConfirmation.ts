/**
 * Sending a booking confirmation, and remembering how you last sent one.
 *
 * Two small things that together turn a four-way choice into one button.
 */
import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

export type TellChannel = 'whatsapp' | 'sms' | 'email' | 'copy';

const CHANNEL_KEY = 'elec-mate-tell-channel';

/**
 * Which channel you last used for a given customer.
 *
 * Per customer, not global: the same electrician WhatsApps the landlord, emails
 * the letting agent and texts the old dear on Elm Street, and being asked which
 * every single time is the sort of small tax that makes an app tiring. Falls
 * back to whatever was used last for anyone.
 */
export function lastChannelFor(customerId?: string | null): TellChannel | null {
  const map = storageGetJSONSync<Record<string, TellChannel>>(CHANNEL_KEY, {});
  if (customerId && map[customerId]) return map[customerId];
  return map.__last ?? null;
}

export function rememberChannel(customerId: string | null | undefined, channel: TellChannel): void {
  // `copy` is a fallback for when nothing else is possible, never a preference
  // worth reinstating next time.
  if (channel === 'copy') return;
  const map = storageGetJSONSync<Record<string, TellChannel>>(CHANNEL_KEY, {});
  if (customerId) map[customerId] = channel;
  map.__last = channel;
  storageSetJSONSync(CHANNEL_KEY, map);
}

export interface SendConfirmationResult {
  ok: boolean;
  /** Set when the address is on the do-not-send list — offer another channel. */
  suppressed?: boolean;
  error?: string;
}

/**
 * The real email: branded, with the booking attached as a calendar file.
 *
 * Everything else in the "tell them" sheet opens the electrician's own app with
 * the message written. This one genuinely sends — which is why it is the only
 * channel that can attach an .ics, and the only one the app can honestly record
 * as having gone.
 */
export function useSendBookingConfirmation() {
  const [sending, setSending] = useState(false);
  const queryClient = useQueryClient();

  const send = useCallback(
    async (
      eventId: string,
      movedFrom?: { start: Date; end: Date; allDay: boolean } | null
    ): Promise<SendConfirmationResult> => {
      setSending(true);
      try {
        const { data, error } = await supabase.functions.invoke('send-booking-confirmation', {
          body: {
            eventId,
            movedFrom: movedFrom
              ? {
                  startIso: movedFrom.start.toISOString(),
                  endIso: movedFrom.end.toISOString(),
                  allDay: movedFrom.allDay,
                }
              : null,
          },
        });

        /*
         * A non-2xx from an edge function arrives as a FunctionsHttpError whose
         * `message` is just "Edge Function returned a non-2xx status code" —
         * the useful part is in the response body, which the client has
         * already parsed into `data`. Reading only `error.message` would show
         * the electrician that string instead of "that address has
         * unsubscribed", which is the one thing they need to know.
         */
        const payload = data as { error?: string; suppressed?: boolean; sent?: boolean } | null;
        if (payload?.error) {
          return { ok: false, error: payload.error, suppressed: payload.suppressed };
        }
        if (error) return { ok: false, error: error.message };

        /*
         * Refetch, or the event detail sheet goes on saying "Not emailed yet".
         *
         * `confirmation_sent_at` is stamped server-side, so the copy already in
         * the client is stale the moment this returns — and that row is the one
         * place you can check whether a customer has actually been told.
         */
        if (payload?.sent) {
          void queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
        }
        return { ok: !!payload?.sent };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : 'Could not send' };
      } finally {
        setSending(false);
      }
    },
    [queryClient]
  );

  return { send, sending };
}
