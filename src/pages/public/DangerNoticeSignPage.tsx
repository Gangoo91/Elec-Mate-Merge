import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { Loader2, AlertTriangle, FileText, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SignaturePad from '@/components/forms/SignaturePad';

/**
 * /danger-notice/sign/:token — public dutyholder sign-off for a Danger Notice
 * (ELE-1288/1289). Opening the page stamps the read receipt; the dutyholder
 * signs or refuses; past the deadline the notice auto-refuses server-side.
 * Cold public page — plain fetch to the RPC, no auth machinery in the path
 * (same rationale as TeamInviteAccept).
 */
async function publicRpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error(`${fn} failed (${res.status})`);
  return res.json() as Promise<T>;
}

type SignoffInfo = {
  error?: string;
  status: 'sent' | 'viewed' | 'signed' | 'refused' | 'auto_refused';
  recipient_name: string | null;
  signer_name: string | null;
  responded_at: string | null;
  response_deadline: string;
  sent_at: string;
  company_name: string;
  reference: string | null;
  installation_address: string | null;
  client_name: string | null;
  pdf_url: string | null;
};

const formatDeadline = (iso: string) => {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return 'Deadline passed';
  const hours = Math.floor(ms / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  return hours > 0 ? `${hours}h ${mins}m remaining` : `${mins}m remaining`;
};

export default function DangerNoticeSignPage() {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<SignoffInfo | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [mode, setMode] = useState<'view' | 'sign' | 'refuse'>('view');
  const [name, setName] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState<'signed' | 'refused' | null>(null);

  useEffect(() => {
    let active = true;
    const timeout = setTimeout(() => {
      if (!active) return;
      setLoadError('This is taking longer than expected — check your connection and reopen the link.');
      setLoading(false);
    }, 12000);

    (async () => {
      if (!token) {
        setLoadError('This link is not valid.');
        setLoading(false);
        clearTimeout(timeout);
        return;
      }
      try {
        const result = await publicRpc<SignoffInfo>('get_danger_notice_signoff', {
          p_token: token,
        });
        if (!active) return;
        if (result.error) {
          setLoadError('This link is not valid or has been removed.');
        } else {
          setInfo(result);
          setName(result.recipient_name || '');
        }
      } catch {
        if (active) setLoadError("We couldn't load this notice. Check your connection and try again.");
      } finally {
        if (active) setLoading(false);
        clearTimeout(timeout);
      }
    })();

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [token]);

  const respond = async (action: 'sign' | 'refuse') => {
    if (!token) return;
    setFormError(null);
    if (!name.trim()) {
      setFormError('Please enter your name');
      return;
    }
    // A blank canvas with a guide line is 2–4KB of dataURL; a real signature
    // is 8KB+ (same heuristic as CompletionSignOffPage)
    if (action === 'sign' && (!signature || signature.length < 6000)) {
      setFormError('Please provide a clear signature');
      return;
    }
    setSubmitting(true);
    try {
      const result = await publicRpc<{ error?: string; status?: string }>('sign_danger_notice', {
        p_token: token,
        p_action: action,
        p_name: name.trim(),
        p_signature: action === 'sign' ? signature : null,
      });
      if (result.error === 'deadline_passed') {
        setInfo((prev) => (prev ? { ...prev, status: 'auto_refused' } : prev));
        setFormError('The response window has closed — this notice has been recorded as refused.');
      } else if (result.error === 'already_responded') {
        setInfo((prev) =>
          prev ? { ...prev, status: (result.status as SignoffInfo['status']) || prev.status } : prev
        );
        setFormError('A response has already been recorded for this notice.');
      } else if (result.error === 'signature_required') {
        setFormError('Please provide a clear signature');
      } else if (result.error) {
        setFormError('Something went wrong — please try again.');
      } else {
        setDone(action === 'sign' ? 'signed' : 'refused');
      }
    } catch {
      setFormError('Something went wrong — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" />
            <p className="text-sm text-white/60">Loading notice…</p>
          </div>
        ) : loadError ? (
          <div className="text-center py-24 space-y-2">
            <AlertTriangle className="h-7 w-7 text-amber-400 mx-auto" />
            <p className="text-[15px] text-white">{loadError}</p>
          </div>
        ) : info ? (
          <div className="space-y-5">
            {/* Header */}
            <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-400">
                Electrical Danger Notice
              </div>
              <h1 className="mt-2 text-[22px] font-bold leading-tight">
                {info.installation_address || 'Electrical installation'}
              </h1>
              <p className="mt-1.5 text-[13px] text-white/70">
                Issued by {info.company_name}
                {info.reference ? ` · Ref ${info.reference}` : ''}
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">
                A danger has been identified at this installation. Please read the attached notice
                and confirm receipt below — your response is recorded with a timestamp.
              </p>
            </div>

            {/* View the notice */}
            {info.pdf_url && (
              <a
                href={info.pdf_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 touch-manipulation active:scale-[0.99] transition-all"
              >
                <FileText className="h-5 w-5 text-elec-yellow shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">View the Danger Notice</p>
                  <p className="text-[12px] text-white/60">Opens the full PDF document</p>
                </div>
                <span className="text-elec-yellow text-[13px] font-medium">Open →</span>
              </a>
            )}

            {/* Response states */}
            {done === 'signed' || info.status === 'signed' ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-5 text-center">
                <Check className="h-6 w-6 text-emerald-400 mx-auto" />
                <p className="mt-2 text-[15px] font-semibold">Receipt confirmed</p>
                <p className="mt-1 text-[13px] text-white/70">
                  {info.signer_name || name || 'You'} signed this notice
                  {info.responded_at
                    ? ` on ${new Date(info.responded_at).toLocaleString('en-GB')}`
                    : ''}
                  . The electrician has been notified.
                </p>
              </div>
            ) : done === 'refused' || info.status === 'refused' ? (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-5 text-center">
                <p className="text-[15px] font-semibold">Response recorded</p>
                <p className="mt-1 text-[13px] text-white/70">
                  You declined to sign. This has been recorded and the electrician notified.
                </p>
              </div>
            ) : info.status === 'auto_refused' ? (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-5 text-center">
                <p className="text-[15px] font-semibold">Response window closed</p>
                <p className="mt-1 text-[13px] text-white/70">
                  No response was received within the deadline, so this notice has been recorded as
                  refused. Contact {info.company_name} if you believe this is a mistake.
                </p>
              </div>
            ) : (
              <>
                {/* Deadline */}
                <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                  <span className="text-[12.5px] text-white/70">Response window</span>
                  <span className="text-[13px] font-semibold text-amber-400 tabular-nums">
                    {formatDeadline(info.response_deadline)}
                  </span>
                </div>

                {mode === 'view' && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setMode('sign')}
                      className="h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[15px] touch-manipulation active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Sign receipt
                    </button>
                    <button
                      onClick={() => setMode('refuse')}
                      className="h-12 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white font-medium text-[15px] touch-manipulation active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Refuse
                    </button>
                  </div>
                )}

                {mode !== 'view' && (
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-4">
                    <div>
                      <label className="text-[13px] font-medium text-white mb-1.5 block">
                        Your full name
                      </label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="h-12 text-base bg-[#0a0a0a] border-white/[0.1] text-white rounded-xl touch-manipulation focus:border-elec-yellow/50 focus:ring-0"
                      />
                    </div>

                    {mode === 'sign' && (
                      <div>
                        <label className="text-[13px] font-medium text-white mb-1.5 block">
                          Signature
                        </label>
                        <SignaturePad onSignatureChange={(data) => setSignature(data)} />
                      </div>
                    )}

                    {formError && <p className="text-[13px] text-red-400">{formError}</p>}

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setMode('view');
                          setFormError(null);
                        }}
                        disabled={submitting}
                        className="h-12 px-4 rounded-xl border border-white/[0.12] text-white text-[14px] font-medium touch-manipulation"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => respond(mode === 'sign' ? 'sign' : 'refuse')}
                        disabled={submitting}
                        className={`flex-1 h-12 rounded-xl font-semibold text-[15px] touch-manipulation active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 ${
                          mode === 'sign'
                            ? 'bg-elec-yellow text-black'
                            : 'bg-amber-500/15 border border-amber-500/40 text-amber-400'
                        }`}
                      >
                        {submitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : mode === 'sign' ? (
                          'Confirm & sign'
                        ) : (
                          'Confirm refusal'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <p className="text-center text-[11px] text-white/40 pt-2">
              Powered by Elec-Mate · Your response is timestamped and recorded
            </p>
          </div>
        ) : null}
      </main>
    </div>
  );
}
