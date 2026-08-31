/**
 * Public signing page for a maintenance agreement — /agreement/:token.
 *
 * The token in the URL is the capability: it addresses exactly one contract
 * and nothing else is reachable. Shows the agreement facts in the
 * electrician's branding, captures a drawn signature (same SignaturePad the
 * quote-acceptance flow uses in production), and confirms. One-shot — a
 * signed agreement shows its signed state instead of the form.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Check, FileText, Loader2, AlertCircle, Zap } from 'lucide-react';
import SignaturePad, { type SignaturePadRef } from '@/components/forms/SignaturePad';
import { Input } from '@/components/ui/input';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

const underlineCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow shadow-none transition-colors hover:border-white/[0.3] ' +
  'focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  '[color-scheme:dark] touch-manipulation';

interface Summary {
  company: {
    name: string;
    logo_url: string | null;
    primary_color: string | null;
    registration_number: string | null;
    vat_number: string | null;
  };
  client: { name: string; address: string | null };
  contract: {
    job_type: string;
    description: string | null;
    frequency_label: string;
    start_date: string;
    end_date: string;
    price: string | null;
    vat_applies: boolean;
    client_type: string;
    signed_at: string | null;
    signed_by: string | null;
    status: string;
  };
}

type Step = 'loading' | 'error' | 'ready' | 'submitting' | 'signed';

export default function AgreementSignPage() {
  const { token } = useParams<{ token: string }>();
  const [step, setStep] = useState<Step>('loading');
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [name, setName] = useState('');
  const [signature, setSignature] = useState('');
  const padRef = useRef<SignaturePadRef>(null);

  const call = useCallback(
    async (payload: Record<string, unknown>) => {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/maintenance-agreement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ token, ...payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      return data;
    },
    [token]
  );

  useEffect(() => {
    if (!token) {
      setError('This link is incomplete.');
      setStep('error');
      return;
    }
    (async () => {
      try {
        const data = (await call({ action: 'summary' })) as Summary;
        setSummary(data);
        setStep(data.contract.signed_at ? 'signed' : 'ready');
        if (data.contract.signed_by) setName(data.contract.signed_by);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load the agreement');
        setStep('error');
      }
    })();
  }, [token, call]);

  const handleSign = async () => {
    if (!name.trim() || !signature) return;
    setStep('submitting');
    setError('');
    try {
      await call({ action: 'sign', name: name.trim(), signature });
      setStep('signed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign the agreement');
      setStep('ready');
    }
  };

  if (step === 'loading') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <p className="text-sm text-white">Loading your agreement…</p>
      </div>
    );
  }

  if (step === 'error' && !summary) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6">
        <AlertCircle className="h-12 w-12 text-red-400" />
        <p className="text-center text-lg text-white">{error}</p>
      </div>
    );
  }

  const co = summary!.company;
  const c = summary!.contract;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Maintenance agreement with {co.name} | Elec-Mate</title>
      </Helmet>

      <div className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          {co.logo_url ? (
            <img src={co.logo_url} alt="" className="h-10 w-10 rounded-lg bg-white/[0.06] object-contain p-0.5" />
          ) : (
            <div className="rounded-lg bg-elec-yellow/10 p-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold text-white">{co.name}</h1>
            <p className="text-sm text-white">Maintenance agreement</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg space-y-5 px-4 py-6">
        {step === 'signed' ? (
          <div className="space-y-5 py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <Check className="h-8 w-8 text-green-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Agreement signed</h2>
              <p className="text-white">
                {c.job_type} · {c.frequency_label} with {co.name}.
              </p>
              <p className="px-2 text-sm text-white">
                You're all set — {co.name} has been told and will be in touch before the first
                visit{c.start_date ? ` on ${c.start_date}` : ''}.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/10 p-4">
              <p className="text-[15px] font-semibold text-white">{c.job_type}</p>
              <p className="mt-0.5 text-sm text-white">
                {c.frequency_label}
                {c.start_date ? ` · first visit ${c.start_date}` : ''}
                {c.end_date ? ` · until ${c.end_date}` : ''}
              </p>
              {c.price && (
                <p className="mt-1 text-sm font-semibold tabular-nums text-white">
                  £{c.price} per visit{c.vat_applies ? ' + VAT' : ''}
                </p>
              )}
              {c.description && <p className="mt-2 text-sm text-white">{c.description}</p>}
            </div>

            <div className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-4 text-sm text-white">
              <p>
                Each visit is carried out by {co.name}
                {co.registration_number ? ` (Company No. ${co.registration_number})` : ''} with
                reasonable care and skill. You'll get a reminder before each visit, any paperwork
                produced, and{' '}
                {c.client_type === 'business'
                  ? 'either side can end the agreement with 14 days’ written notice.'
                  : 'you can cancel within 14 days of signing, or end the agreement any time after that with 14 days’ notice.'}{' '}
                The full terms are in the agreement document {co.name} has for you.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-[12px] font-medium text-white">
                Your full name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={underlineCn}
                autoComplete="name"
              />
            </div>

            <div>
              <label className="mb-1 block text-[12px] font-medium text-white">
                Draw your signature
              </label>
              <div className="overflow-hidden rounded-xl border border-white/[0.15] bg-white">
                <SignaturePad ref={padRef} onSignatureChange={setSignature} />
              </div>
              {signature && (
                <button
                  onClick={() => {
                    padRef.current?.clear();
                    setSignature('');
                  }}
                  className="mt-1.5 text-[12px] font-medium text-elec-yellow touch-manipulation"
                >
                  Clear and redraw
                </button>
              )}
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                <p className="text-sm text-white">{error}</p>
              </div>
            )}

            <button
              onClick={handleSign}
              disabled={!name.trim() || !signature || step === 'submitting'}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70"
            >
              {step === 'submitting' ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Sign the agreement'
              )}
            </button>
            <p className="text-center text-xs text-white">
              Signing here has the same effect as signing on paper.
            </p>
          </>
        )}

        <div className="pb-4 pt-8 text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-white">
            Powered by
            <Zap className="h-3 w-3 text-elec-yellow" />
            <span className="font-medium text-elec-yellow">Elec-Mate</span>
          </p>
        </div>
      </div>
    </div>
  );
}
