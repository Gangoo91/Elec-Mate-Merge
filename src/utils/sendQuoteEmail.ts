/**
 * Email a saved quote to its client — the one send path (ELE-1794).
 *
 * There were two copies of this (the Send dropdown and the quote page's
 * actions drawer) and they had drifted: the drawer read only the top-level
 * error, so a server "hint" never reached the user, and it recorded nothing,
 * so a quote sent from there never counted as sent in the analytics. "Save &
 * send" in the builder made a third caller — so it lives here once.
 *
 * `send-quote-resend` builds the PDF, emails it, and marks the quote sent
 * (status + first_sent_at) server-side. Throws an Error whose message is fit
 * to show the user; returns the address it went to.
 */
import type { Quote } from '@/types/quote';
import { supabase } from '@/integrations/supabase/client';
import { readEdgeFunctionError } from '@/lib/edgeFunctionError';
import { trackUserEvent } from '@/hooks/useActivityTracking';
import { trackQuoteSent } from '@/lib/analytics-events';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The client's address when it is usable, else null. Takes a quote that may
 * not have a client yet — the builder holds a Partial<Quote> until it is saved.
 */
export const quoteRecipient = (quote: {
  client?: { email?: string | null } | null;
}): string | null => {
  const to = quote.client?.email?.trim();
  return to && EMAIL.test(to) ? to : null;
};

export async function sendQuoteEmail(
  quote: Pick<Quote, 'id' | 'client' | 'quoteNumber' | 'total'> & { user_id?: string | null }
): Promise<string> {
  const to = quoteRecipient(quote);
  if (!to) throw new Error('Add a valid client email to the quote first, then try again.');
  if (!quote.id) throw new Error('Save the quote before sending it.');

  const { data: current, error: sessionError } = await supabase.auth.getSession();
  let session = current.session;
  if (sessionError || !session) {
    const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError || !refreshed.session) throw new Error('Please log in again to send quotes.');
    session = refreshed.session;
  }

  const { data, error } = await supabase.functions.invoke('send-quote-resend', {
    body: { quoteId: quote.id },
    headers: { Authorization: `Bearer ${session.access_token}` },
  });

  if (error) {
    // The function answers a failure with a non-2xx and a JSON body; supabase-js
    // puts the Response in `error.context`, so the body has to be READ — taken
    // as a string it printed "[object ReadableStream]" to the user.
    const body = await readEdgeFunctionError<{ error?: string; message?: string; hint?: string }>(
      error
    );
    const message =
      (body?.error && (body.hint ? `${body.error} (${body.hint})` : body.error)) ||
      body?.message ||
      (typeof error === 'string' ? error : null) ||
      'The email could not be sent. Please try again.';
    throw new Error(message);
  }
  if (data?.error) throw new Error(data.error + (data.hint ? ` (${data.hint})` : ''));
  if (!data?.success) throw new Error(data?.message || 'Unknown error sending quote');

  // ELE-2083: record who sent it (a firm's co-admin is told apart from the
  // owner). Attribution only, never blocks the send.
  if (session.user?.id) {
    void supabase
      .from('quotes')
      .update({ sent_by_user_id: session.user.id } as never)
      .eq('id', quote.id)
      .then(
        () => undefined,
        () => undefined
      );
  }

  // Sending a quote is the revenue-bearing action in the whole builder.
  if (quote.user_id) {
    void trackUserEvent(quote.user_id, 'feature_use', {
      eventName: 'quote_sent',
      eventData: { quote_number: quote.quoteNumber ?? null, channel: 'email' },
    });
  }
  trackQuoteSent({
    quote_id: quote.id,
    amount_pence: Math.round((quote.total || 0) * 100),
    channel: 'email',
  });
  return to;
}
