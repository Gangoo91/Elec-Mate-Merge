/**
 * BookingSlotRedirect — legacy /book-slot/:quoteId route.
 *
 * Looks up the quote's electrician via the public RPC and forwards the
 * client to the canonical /book/:electricianId?quote=:quoteId URL on the
 * existing PublicBooking page. Avoids 404s for already-sent emails and
 * Stripe success_urls that still reference the old path.
 */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function BookingSlotRedirect() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quoteId) {
      setError('Missing quote reference');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data, error: rpcErr } = await supabase.rpc('get_public_quote_for_booking', {
          quote_id_param: quoteId,
        });
        if (rpcErr) throw rpcErr;
        const row = (Array.isArray(data) ? data[0] : data) as { user_id?: string } | null;
        if (cancelled) return;
        if (!row?.user_id) {
          setError('Quote not found');
          return;
        }
        navigate(`/book/${row.user_id}?quote=${quoteId}`, { replace: true });
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Could not load booking');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [quoteId, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 max-w-sm w-full p-8 text-center">
          <h1 className="text-lg font-semibold text-slate-900 mb-1">Booking link expired</h1>
          <p className="text-sm text-slate-500">
            {error}. Please reply to the quote email and we'll send a new link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="text-center">
        <Loader2 className="h-7 w-7 text-slate-400 animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-500">Loading your booking page…</p>
      </div>
    </div>
  );
}
