import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Check, AlertCircle, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

interface InvoiceSummary {
  id: string;
  invoice_number: string;
  client_name: string;
  total: number;
  currency: string;
  invoice_status: string | null;
  invoice_paid_at: string | null;
}

type Phase = 'loading' | 'error' | 'expired' | 'preview' | 'submitting' | 'done' | 'already-paid';

const ENDPOINT = `${SUPABASE_URL}/functions/v1/mark-invoice-paid-token`;

function formatCurrency(value: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

const InvoiceMarkPaid = () => {
  const { token } = useParams<{ token: string }>();
  const [phase, setPhase] = useState<Phase>('loading');
  const [error, setError] = useState('');
  const [invoice, setInvoice] = useState<InvoiceSummary | null>(null);

  const apikey = SUPABASE_PUBLISHABLE_KEY;

  const loadPreview = useCallback(async () => {
    if (!token) {
      setPhase('error');
      setError('Missing token in URL');
      return;
    }
    try {
      const res = await fetch(`${ENDPOINT}?token=${encodeURIComponent(token)}`, {
        method: 'GET',
        headers: { apikey, Authorization: `Bearer ${apikey}` },
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.detail || data.error || 'Could not load invoice');
        setPhase(res.status === 410 ? 'expired' : 'error');
        return;
      }
      setInvoice(data.invoice);
      if (data.alreadyPaid) {
        setPhase('already-paid');
      } else if (data.token?.expired) {
        setPhase('expired');
      } else if (data.token?.consumed) {
        setPhase('already-paid');
      } else {
        setPhase('preview');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
      setPhase('error');
    }
  }, [token, apikey]);

  useEffect(() => {
    loadPreview();
  }, [loadPreview]);

  const handleConfirm = async () => {
    if (!token) return;
    setPhase('submitting');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          apikey,
          Authorization: `Bearer ${apikey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.detail || data.error || 'Could not mark paid');
        setPhase('error');
        return;
      }
      setInvoice(data.invoice);
      setPhase('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
      setPhase('error');
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white flex flex-col">
      <Helmet>
        <title>Mark Invoice as Paid · Elec-Mate</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Top brand bar */}
      <header className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-elec-yellow text-black flex items-center justify-center">
          <Zap className="h-4 w-4" />
        </div>
        <span className="text-[14px] font-semibold tracking-tight">Elec-Mate</span>
      </header>

      <main className="flex-1 flex items-start justify-center px-5 py-10">
        <div className="w-full max-w-md">
          {phase === 'loading' && (
            <div className="text-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-white/60 mx-auto" />
              <p className="mt-3 text-[13px] text-white/60">Loading invoice…</p>
            </div>
          )}

          {phase === 'error' && (
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-red-500/25 p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <h1 className="text-[16px] font-semibold tracking-tight">Couldn't load invoice</h1>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed">{error}</p>
              <p className="mt-3 text-[12px] text-white/50">
                Check the link or generate a fresh one from the invoice in Elec-Mate.
              </p>
            </div>
          )}

          {phase === 'expired' && (
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-amber-500/25 p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-amber-400" />
                <h1 className="text-[16px] font-semibold tracking-tight">Link expired</h1>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed">
                Mark-paid links are valid for 30 days. Generate a fresh one from the invoice in
                Elec-Mate.
              </p>
            </div>
          )}

          {phase === 'already-paid' && invoice && (
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-emerald-500/30 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Check className="h-5 w-5 text-emerald-400" />
                <h1 className="text-[16px] font-semibold tracking-tight">Already marked paid</h1>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed mb-4">
                Invoice <span className="font-medium text-white">{invoice.invoice_number}</span>{' '}
                for <span className="font-medium text-white">{invoice.client_name}</span> is
                already marked as paid in Elec-Mate.
              </p>
              <div className="text-[20px] font-semibold tabular-nums tracking-tight">
                {formatCurrency(invoice.total, invoice.currency)}
              </div>
              {invoice.invoice_paid_at && (
                <p className="mt-1 text-[11px] text-white/50">
                  Paid on {new Date(invoice.invoice_paid_at).toLocaleDateString('en-GB')}
                </p>
              )}
            </div>
          )}

          {(phase === 'preview' || phase === 'submitting') && invoice && (
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-6">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">
                Mark invoice paid
              </p>
              <h1 className="mt-2 text-[22px] font-semibold tracking-tight leading-tight">
                {invoice.invoice_number}
              </h1>
              <p className="mt-1 text-[13px] text-white/70">{invoice.client_name}</p>

              <div className="mt-6 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06] p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">Amount</p>
                <p className="mt-1 text-[28px] font-semibold tabular-nums tracking-tight">
                  {formatCurrency(invoice.total, invoice.currency)}
                </p>
              </div>

              <p className="mt-5 text-[12.5px] text-white/65 leading-relaxed">
                Tap <span className="font-medium text-white">Mark as paid</span> to record this
                invoice as paid in Elec-Mate. Reminder emails to the client will stop.
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <Button
                  onClick={handleConfirm}
                  disabled={phase === 'submitting'}
                  className="h-12 w-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold rounded-xl active:scale-[0.98]"
                >
                  {phase === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Marking paid…
                    </>
                  ) : (
                    'Mark as paid'
                  )}
                </Button>
                <p className="text-[11px] text-white/45 text-center mt-1">
                  This action is one-tap and final. The link will then expire.
                </p>
              </div>
            </div>
          )}

          {phase === 'done' && invoice && (
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-emerald-500/30 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 mx-auto mb-4">
                <Check className="h-6 w-6 text-emerald-400" />
              </div>
              <h1 className="text-[18px] font-semibold tracking-tight text-center">
                Invoice marked as paid
              </h1>
              <p className="mt-2 text-[13px] text-white/70 leading-relaxed text-center">
                {invoice.invoice_number} — {invoice.client_name}
              </p>
              <div className="mt-4 text-center text-[20px] font-semibold tabular-nums tracking-tight">
                {formatCurrency(invoice.total, invoice.currency)}
              </div>
              <p className="mt-5 text-[12px] text-white/55 leading-relaxed text-center">
                You can close this page. Reminder emails to the client will stop automatically.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InvoiceMarkPaid;
