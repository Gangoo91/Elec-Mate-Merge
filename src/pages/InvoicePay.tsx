/**
 * /pay/:invoiceId — the permanent Pay now link (ELE-1705).
 *
 * Every invoice email, PDF and reminder links here instead of straight to a
 * Stripe Checkout session, because those expire after 24 hours and the client
 * who opened the email on day two met a dead page. This asks `invoice-pay`
 * for a fresh session and goes straight on to it.
 *
 * Public — the person here is the electrician's customer, not a user. It says
 * whose invoice it is before handing them to Stripe, and when it cannot take
 * a card it says so and gives them the business's own contact details.
 */
import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CheckCircle2, Loader2, Lock, Mail, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type PayState =
  | { state: 'loading' }
  | {
      state: 'ready' | 'paid' | 'adjusted' | 'cancelled' | 'unavailable' | 'not_found';
      checkoutUrl?: string;
      amount?: number;
      invoiceNumber?: string | null;
      businessName?: string | null;
      businessEmail?: string | null;
      businessPhone?: string | null;
    };

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

const InvoicePay = () => {
  const { invoiceId = '' } = useParams();
  const [params] = useSearchParams();
  // Back from Stripe without paying: stay here and say so, never bounce them
  // straight back into the checkout they just left.
  const cancelled = params.get('cancelled') === '1';
  const [data, setData] = useState<PayState>({ state: 'loading' });
  const redirected = useRef(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data: res, error } = await supabase.functions.invoke('invoice-pay', {
          body: { invoiceId },
        });
        if (!alive) return;
        if (error || !res?.state) {
          setData({ state: 'unavailable' });
          return;
        }
        // L1: invoice-pay answers a cancelled or void invoice as 'adjusted'
        // with reason 'cancelled' (what the older page can show); this page
        // has its own cancelled view.
        setData(res.reason === 'cancelled' ? { ...res, state: 'cancelled' } : res);
        if (res.state === 'ready' && res.checkoutUrl && !cancelled && !redirected.current) {
          redirected.current = true;
          window.location.replace(res.checkoutUrl);
        }
      } catch {
        if (alive) setData({ state: 'unavailable' });
      }
    })();
    return () => {
      alive = false;
    };
  }, [invoiceId, cancelled]);

  const d = data.state === 'loading' ? null : data;
  const from = d?.businessName ? `from ${d.businessName}` : '';
  const heading = d?.invoiceNumber ? `Invoice ${d.invoiceNumber}` : 'Your invoice';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Helmet>
        <title>{d?.invoiceNumber ? `Pay invoice ${d.invoiceNumber}` : 'Pay invoice'}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="w-full max-w-sm space-y-6 text-center">
        {data.state === 'loading' && (
          <div className="space-y-4" role="status" aria-live="polite">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-elec-yellow" />
            <p className="text-[15px] font-medium text-white">Opening secure payment…</p>
          </div>
        )}

        {d && d.state !== 'not_found' && (
          <header className="space-y-1">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white">
              {heading}
            </p>
            {from && <p className="text-[15px] text-white">{from}</p>}
          </header>
        )}

        {d?.state === 'ready' && (
          <div className="space-y-5">
            {cancelled ? (
              <div className="space-y-1.5">
                <h1 className="text-[22px] font-semibold tracking-tight text-white">
                  Payment not completed
                </h1>
                <p className="text-[14px] text-white">
                  No money has been taken. You can try again now.
                </p>
              </div>
            ) : (
              <div className="space-y-3" role="status" aria-live="polite">
                <Loader2 className="mx-auto h-7 w-7 animate-spin text-elec-yellow" />
                <p className="text-[15px] font-medium text-white">Taking you to secure payment…</p>
              </div>
            )}
            {d.checkoutUrl && (
              <a
                href={d.checkoutUrl}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation active:scale-[0.98]"
              >
                <Lock className="h-4 w-4" />
                {typeof d.amount === 'number' ? `Pay ${gbp(d.amount)} by card` : 'Pay by card'}
              </a>
            )}
            <p className="text-[12px] text-white">Payments are processed securely by Stripe.</p>
          </div>
        )}

        {d?.state === 'paid' && (
          <div className="space-y-3">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
            <h1 className="text-[22px] font-semibold tracking-tight text-white">
              This invoice is paid
            </h1>
            <p className="text-[14px] text-white">Nothing more to do. Thank you.</p>
          </div>
        )}

        {d?.state === 'unavailable' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h1 className="text-[22px] font-semibold tracking-tight text-white">
                Card payment isn&rsquo;t available right now
              </h1>
              <p className="text-[14px] text-white">
                Please pay using the bank details on the invoice
                {d.businessName ? `, or get in touch with ${d.businessName}` : ''}.
              </p>
            </div>
            <ContactButtons email={d.businessEmail} phone={d.businessPhone} />
          </div>
        )}

        {d?.state === 'adjusted' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h1 className="text-[22px] font-semibold tracking-tight text-white">
                This invoice has been adjusted
              </h1>
              <p className="text-[14px] text-white">
                A credit note has been issued against it, so the amount owed has changed. Please
                check with {d.businessName ?? 'the business that sent it'} before paying.
              </p>
            </div>
            <ContactButtons email={d.businessEmail} phone={d.businessPhone} />
          </div>
        )}

        {d?.state === 'cancelled' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h1 className="text-[22px] font-semibold tracking-tight text-white">
                This invoice has been cancelled
              </h1>
              <p className="text-[14px] text-white">
                There is nothing to pay. If you think that is wrong, get in touch with{' '}
                {d.businessName ?? 'the business that sent it'}.
              </p>
            </div>
            <ContactButtons email={d.businessEmail} phone={d.businessPhone} />
          </div>
        )}

        {d?.state === 'not_found' && (
          <div className="space-y-1.5">
            <h1 className="text-[22px] font-semibold tracking-tight text-white">
              Invoice not found
            </h1>
            <p className="text-[14px] text-white">
              Check the link in your email, or contact the business that sent it.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

const ContactButtons = ({ email, phone }: { email?: string | null; phone?: string | null }) => {
  if (!email && !phone) return null;
  const btn =
    'flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[14px] font-semibold text-white touch-manipulation active:scale-[0.98]';
  return (
    <div className="space-y-2">
      {phone && (
        <a href={`tel:${phone.replace(/\s+/g, '')}`} className={btn}>
          <Phone className="h-4 w-4" />
          {phone}
        </a>
      )}
      {email && (
        <a href={`mailto:${email}`} className={btn}>
          <Mail className="h-4 w-4" />
          {email}
        </a>
      )}
    </div>
  );
};

export default InvoicePay;
