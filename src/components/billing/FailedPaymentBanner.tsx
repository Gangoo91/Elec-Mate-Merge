import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

/**
 * FailedPaymentBanner — the in-app half of failed-payment recovery.
 *
 * Retention plan, 20 Sep 2026: best-in-class recovers 70–85% of failed
 * charges; the emails alone were doing the work. A card that bounced is a
 * fact the person needs in front of them the next time they open the app,
 * with the fix one tap away. The row comes from failed_payment_emails
 * (written by check-failed-payments, resolved by the Stripe webhook when the
 * invoice is paid); RLS lets a user read only their own. Stripe's hosted
 * invoice page takes the payment and updates the card in one go, so no
 * portal round-trip is needed.
 */
export default function FailedPaymentBanner() {
  const { user, profile } = useAuth();
  const [searchParams] = useSearchParams();
  // Admin-only preview: any page with ?preview=payment-failed shows the banner
  // with a sample amount, so the design can be checked without a bounced card.
  const preview =
    !!(profile as { admin_role?: string | null } | null)?.admin_role &&
    searchParams.get('preview') === 'payment-failed';
  const { data: real } = useQuery({
    queryKey: ['failed-payment', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('failed_payment_emails')
        .select('amount_due, hosted_invoice_url, created_at')
        .eq('user_id', user!.id)
        .eq('resolved', false)
        // Voided invoices are never marked resolved, and dunning stops after
        // three emails anyway: nothing older than three weeks is actionable.
        .gte('created_at', new Date(Date.now() - 21 * 86_400_000).toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) return null;
      return data;
    },
  });

  const data = preview
    ? { amount_due: 1999, hosted_invoice_url: 'https://invoice.stripe.com/', created_at: '' }
    : real;
  if (!data) return null;
  const amount =
    typeof data.amount_due === 'number'
      ? `£${(data.amount_due / 100).toFixed(2)}`
      : 'your last payment';

  return (
    <div
      role="status"
      className="border-b border-amber-500/20 bg-amber-500/10 px-4 py-3 text-white"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400 sm:mt-0" aria-hidden />
          <p className="min-w-0 flex-1 text-[13px] leading-5">
            <span className="font-semibold">The card payment of {amount} didn’t go through.</span>{' '}
            Nothing is lost. Update the card and it retries straight away.
          </p>
        </div>
        {data.hosted_invoice_url && (
          <a
            href={data.hosted_invoice_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 shrink-0 touch-manipulation items-center justify-center rounded-xl bg-amber-400 px-4 text-[13px] font-semibold text-black sm:w-auto"
          >
            Update card
          </a>
        )}
      </div>
    </div>
  );
}
