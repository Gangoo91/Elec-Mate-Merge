import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';

/* ==========================================================================
   PublicEmployerQuote — the client-facing accept page for an employer's
   quote (token-keyed definer RPCs; no login). Mobile-first, branded with
   the company's name/logo.
   ========================================================================== */

interface LineItem {
  description?: string;
  quantity?: number;
  total?: number;
}

const money = (v: number | string | null | undefined) =>
  `£${Number(v || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function PublicEmployerQuote() {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [signedName, setSignedName] = useState('');
  const [deciding, setDeciding] = useState(false);
  const [decided, setDecided] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!token) return;
      const { data: result, error: rpcError } = await supabase.rpc('get_employer_quote_by_token', {
        p_token: token,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = result as any;
      if (rpcError || !r || r.error) {
        setError(
          r?.error === 'expired'
            ? 'This quote link has expired — ask for a fresh one.'
            : 'Quote not found. Check the link or ask for a new one.'
        );
      } else {
        setData(r);
        setSignedName(r.client_name || '');
        if (r.acceptance_status && r.acceptance_status !== 'pending') {
          setDecided(r.acceptance_status);
        }
      }
      setLoading(false);
    })();
  }, [token]);

  const decide = async (decision: 'accepted' | 'declined') => {
    if (!token) return;
    setDeciding(true);
    const { data: result, error: rpcError } = await supabase.rpc('decide_employer_quote', {
      p_token: token,
      p_decision: decision,
      p_signed_name: signedName || null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = result as any;
    if (rpcError || r?.error) {
      setError('Could not record your decision — the link may have expired.');
    } else {
      setDecided(decision);
    }
    setDeciding(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(0_0%_7%)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[hsl(0_0%_7%)] flex items-center justify-center px-6">
        <p className="text-white/70 text-center">{error}</p>
      </div>
    );
  }

  const quote = data.quote;
  const company = data.company;
  const items: LineItem[] = Array.isArray(quote.line_items) ? quote.line_items : [];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_7%)] text-white">
      <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          {company?.logo_url ? (
            <img src={company.logo_url} alt="" className="h-12 w-12 rounded-xl object-contain bg-white/5" />
          ) : (
            <div className="h-12 w-12 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
              <FileText className="h-6 w-6 text-elec-yellow" />
            </div>
          )}
          <div>
            <p className="text-[15px] font-semibold">{company?.company_name || 'Quote'}</p>
            <p className="text-[12px] text-white/50">Quote {quote.quote_number}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-[hsl(0_0%_11%)] border border-white/[0.08] p-5 space-y-4">
          {quote.description && (
            <p className="text-[13.5px] text-white/80 leading-relaxed">{quote.description}</p>
          )}

          {items.length > 0 && (
            <div className="space-y-2">
              {items.map((it, i) => (
                <div key={i} className="flex justify-between text-[13px]">
                  <span className="text-white/70">
                    {it.description}
                    {it.quantity && it.quantity > 1 ? ` ×${it.quantity}` : ''}
                  </span>
                  <span className="tabular-nums">{money(it.total)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-white/[0.08] pt-4 flex justify-between items-baseline">
            <span className="text-[13px] text-white/60">Quote total</span>
            <span className="text-[26px] font-bold tabular-nums">{money(quote.value)}</span>
          </div>
        </div>

        {decided ? (
          <div
            className={`rounded-2xl border p-5 flex items-center gap-3 ${
              decided === 'accepted'
                ? 'bg-emerald-500/10 border-emerald-500/25'
                : 'bg-red-500/10 border-red-500/25'
            }`}
          >
            {decided === 'accepted' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-red-400 shrink-0" />
            )}
            <p className="text-[13.5px]">
              {decided === 'accepted'
                ? `Quote accepted — ${company?.company_name || 'the company'} has been notified and will be in touch.`
                : 'Quote declined — thanks for letting us know.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <Input
              value={signedName}
              onChange={(e) => setSignedName(e.target.value)}
              placeholder="Your name"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
            <button
              type="button"
              onClick={() => decide('accepted')}
              disabled={deciding || !signedName.trim()}
              className="h-12 w-full rounded-xl bg-elec-yellow text-black text-[14px] font-semibold touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {deciding ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              Accept quote
            </button>
            <button
              type="button"
              onClick={() => decide('declined')}
              disabled={deciding}
              className="h-11 w-full rounded-xl bg-white/[0.06] border border-white/[0.1] text-white/80 text-[13px] font-medium touch-manipulation disabled:opacity-50"
            >
              Decline
            </button>
          </div>
        )}

        <p className="text-center text-[11px] text-white/30">Powered by Elec-Mate</p>
      </div>
    </div>
  );
}
