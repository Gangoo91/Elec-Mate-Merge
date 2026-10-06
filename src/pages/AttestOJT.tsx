/**
 * AttestOJT — public page where a supervisor confirms an apprentice's
 * off-the-job training hours.
 *
 * No login. URL: /attest-ojt/:id (the college_otj_entries id).
 *
 * ELE-1949 (6 Oct): the link alone is no longer enough. The supervisor gives
 * their name and work email, we email them a 6-digit code, and the hours are
 * only attested once that code is entered. Links stop working 30 days after
 * the entry was logged. Firms on Elec-Mate attest inside the Employer Hub and
 * never need this page.
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertTriangle, Send, Mail } from 'lucide-react';
import { SUPABASE_URL } from '@/integrations/supabase/client';

interface EntryPreview {
  id: string;
  activity_date: string;
  activity_type: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  source_kind: string;
  verification_status: string;
  already_attested: boolean;
  attested_by_name: string | null;
  learner_name: string | null;
  link_expired?: boolean;
}

type Step = 'details' | 'code' | 'done';

const fmtDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

const fmtHours = (mins: number) => {
  const h = mins / 60;
  return h % 1 === 0 ? `${h} hours` : `${h.toFixed(1)} hours`;
};

const inputCn =
  'h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';
const cardCn =
  'rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5 space-y-4';
const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const endpoint = (id: string) =>
  `${SUPABASE_URL}/functions/v1/ojt-employer-attest?id=${encodeURIComponent(id)}`;

export default function AttestOJT() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [entry, setEntry] = useState<EntryPreview | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState<Step>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [code, setCode] = useState('');
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(endpoint(id));
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || !data.ok) setLoadError(data.error || `Could not load (${res.status})`);
        else setEntry(data.entry);
      } catch (err) {
        if (!cancelled) setLoadError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const post = async (body: Record<string, unknown>) => {
    const res = await fetch(endpoint(id!), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) throw new Error(data.error || `Something went wrong (${res.status})`);
    return data;
  };

  const sendCode = async () => {
    if (!id) return;
    setBusy(true);
    setError(null);
    try {
      const data = await post({
        action: 'send_code',
        attester_name: name.trim(),
        attester_email: email.trim(),
      });
      setSentTo(data.sent_to ?? email.trim());
      setCode('');
      setStep('code');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const confirmCode = async () => {
    if (!id) return;
    setBusy(true);
    setError(null);
    try {
      await post({
        action: 'confirm',
        code: code.trim(),
        attester_comment: comment.trim() || undefined,
      });
      setStep('done');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const canSend = confirm && name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        <header className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
            Off-the-job training · Confirmation
          </p>
          <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-tight leading-tight">
            Confirm these training hours
          </h1>
          <p className="text-[14px] text-white leading-relaxed">
            An apprentice has asked you to confirm work you supervised. We'll email you a code to
            check it's you, then record your confirmation on their training record.
          </p>
        </header>

        {loading && (
          <div className="flex items-center gap-3 py-12 justify-center">
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <span className="text-[13px] text-white">Loading…</span>
          </div>
        )}

        {!loading && loadError && !entry && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-300" />
              <span className="text-[13px] font-semibold text-red-300">Could not load this entry</span>
            </div>
            <p className="text-[14px] text-white leading-relaxed">{loadError}</p>
          </div>
        )}

        {!loading && entry && (
          <>
            <section className={cardCn}>
              <div>
                <p className={labelCn}>Apprentice</p>
                <p className="text-[16px] font-semibold text-white">
                  {entry.learner_name || 'Apprentice'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 border-t border-white/[0.1] pt-4">
                <div>
                  <p className={labelCn}>Date</p>
                  <p className="text-[14px] text-white">{fmtDate(entry.activity_date)}</p>
                </div>
                <div className="text-right">
                  <p className={labelCn}>Time</p>
                  <p className="text-[18px] font-semibold text-white tabular-nums">
                    {fmtHours(entry.duration_minutes)}
                  </p>
                </div>
              </div>
              <div className="border-t border-white/[0.1] pt-4">
                <p className={labelCn}>What they did</p>
                <p className="text-[15px] font-semibold text-white">{entry.title}</p>
                {entry.description && (
                  <p className="text-[14px] text-white leading-relaxed pt-1">{entry.description}</p>
                )}
              </div>
            </section>

            {entry.already_attested && (
              <div className={cardCn}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-[14px] font-semibold text-white">Already confirmed</span>
                </div>
                <p className="text-[14px] text-white leading-relaxed">
                  {entry.attested_by_name
                    ? `${entry.attested_by_name} has already confirmed these hours.`
                    : 'These hours have already been confirmed.'}
                </p>
              </div>
            )}

            {!entry.already_attested && entry.link_expired && (
              <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5 space-y-1.5">
                <p className="text-[14px] font-semibold text-orange-300">This link has expired</p>
                <p className="text-[14px] text-white leading-relaxed">
                  Confirmation links last 30 days. Ask the apprentice to send you a new one.
                </p>
              </div>
            )}

            {!entry.already_attested && !entry.link_expired && step === 'details' && (
              <section className={cardCn}>
                <div>
                  <h2 className="text-[15px] font-semibold text-white">Your details</h2>
                  <p className="text-[13px] text-white leading-relaxed mt-1">
                    Recorded on the apprentice's training record for their college and assessor.
                  </p>
                </div>
                <div className="space-y-4">
                  <label className="block">
                    <span className={labelCn}>Your full name</span>
                    <input
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Murphy"
                      className={inputCn}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCn}>Your work email — we'll send the code here</span>
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.co.uk"
                      className={inputCn}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCn}>Comment (optional)</span>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value.slice(0, 2000))}
                      placeholder="Anything the college should know — what went well, any concerns."
                      rows={3}
                      className="w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 resize-none"
                    />
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer touch-manipulation">
                    <input
                      type="checkbox"
                      checked={confirm}
                      onChange={(e) => setConfirm(e.target.checked)}
                      className="mt-1 h-5 w-5 accent-[#facc15] flex-shrink-0"
                    />
                    <span className="text-[13.5px] text-white leading-relaxed">
                      I supervised this work, the apprentice completed it, and the hours are
                      accurate. My name, email and comment will be recorded.
                    </span>
                  </label>
                </div>

                {error && <p className="text-[13px] text-red-300">{error}</p>}

                <button
                  type="button"
                  onClick={sendCode}
                  disabled={busy || !canSend}
                  className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[15px] transition-colors disabled:bg-white/[0.08] disabled:text-white inline-flex items-center justify-center gap-2 touch-manipulation"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                  {busy ? 'Sending code…' : 'Email me a code'}
                </button>
              </section>
            )}

            {!entry.already_attested && !entry.link_expired && step === 'code' && (
              <section className={cardCn}>
                <div>
                  <h2 className="text-[15px] font-semibold text-white">Enter your code</h2>
                  <p className="text-[13.5px] text-white leading-relaxed mt-1">
                    We sent a 6-digit code to {sentTo}. It lasts 15 minutes.
                  </p>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className={`${inputCn} text-center text-[24px] tracking-[0.4em] tabular-nums`}
                />
                {error && <p className="text-[13px] text-red-300">{error}</p>}
                <button
                  type="button"
                  onClick={confirmCode}
                  disabled={busy || code.length !== 6}
                  className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[15px] disabled:bg-white/[0.08] disabled:text-white inline-flex items-center justify-center gap-2 touch-manipulation"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {busy ? 'Confirming…' : 'Confirm these hours'}
                </button>
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('details');
                      setError(null);
                    }}
                    className="h-11 text-[13px] font-medium text-white underline underline-offset-2 touch-manipulation"
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    onClick={sendCode}
                    disabled={busy}
                    className="h-11 text-[13px] font-medium text-white underline underline-offset-2 touch-manipulation"
                  >
                    Send a new code
                  </button>
                </div>
              </section>
            )}

            {step === 'done' && (
              <section className={cardCn}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-[15px] font-semibold text-white">Thanks — hours confirmed</span>
                </div>
                <p className="text-[14px] text-white leading-relaxed">
                  Your confirmation is on the apprentice's training record with your name and email.
                  They've been told. Their college still checks the hours separately. You can close
                  this page.
                </p>
              </section>
            )}
          </>
        )}

        <footer className="pt-6 text-center">
          <p className="text-[12px] text-white">Elec-Mate · UK electrical apprenticeships</p>
        </footer>
      </div>
    </div>
  );
}
