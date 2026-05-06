/**
 * AttestOJT — public-facing employer attestation page.
 *
 * No auth required. URL: /attest-ojt/:id where :id is the
 * college_otj_entries.id (an unguessable UUID).
 *
 * Supervisor lands here from the link the apprentice shared. They see
 * the entry the apprentice logged, type their name + email, and tap
 * Attest. The entry flips to source_kind='employer_attested' /
 * verification_status='verified_by_employer'.
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertTriangle, Send } from 'lucide-react';
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
  attestation_email: string | null;
  learner_name: string | null;
}

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
  return h % 1 === 0 ? `${h}h` : `${h.toFixed(1)}h`;
};

export default function AttestOJT() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [entry, setEntry] = useState<EntryPreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const url = `${SUPABASE_URL}/functions/v1/ojt-employer-attest?id=${encodeURIComponent(id)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || !data.ok) {
          setError(data.error || `Could not load (${res.status})`);
        } else {
          setEntry(data.entry);
        }
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAttest = async () => {
    if (!id) return;
    setSubmitting(true);
    setError(null);
    try {
      const url = `${SUPABASE_URL}/functions/v1/ojt-employer-attest?id=${encodeURIComponent(id)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attester_name: name.trim(),
          attester_email: email.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `Attestation failed (${res.status})`);
      }
      setDone(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        <header className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Off-the-job training · Attestation
          </span>
          <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-tight leading-tight">
            Verify these training hours
          </h1>
          <p className="text-[13px] text-white/70 leading-relaxed">
            Your apprentice has shared this entry for your sign-off. By attesting
            you confirm they completed this work. The college and ESFA use this
            to verify their 20% off-the-job training.
          </p>
        </header>

        {loading && (
          <div className="flex items-center gap-3 py-12 justify-center">
            <Loader2 className="h-4 w-4 animate-spin text-white/55" />
            <span className="text-[12px] uppercase tracking-[0.18em] text-white/55">
              Loading entry…
            </span>
          </div>
        )}

        {!loading && error && !entry && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-300" />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
                Could not load
              </span>
            </div>
            <p className="text-[13px] text-white/85 leading-relaxed">{error}</p>
          </div>
        )}

        {!loading && entry && (
          <>
            <section className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 space-y-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Apprentice
                </span>
                <p className="text-[15px] font-medium text-white">
                  {entry.learner_name || 'Apprentice'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/[0.06]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Date
                  </span>
                  <p className="text-[13px] text-white">{fmtDate(entry.activity_date)}</p>
                </div>
                <div className="space-y-0.5 text-right">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Duration
                  </span>
                  <p className="text-[18px] font-mono font-semibold text-elec-yellow tabular-nums leading-none">
                    {fmtHours(entry.duration_minutes)}
                  </p>
                </div>
              </div>
              <div className="space-y-1 pt-2 border-t border-white/[0.06]">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Activity
                </span>
                <p className="text-[14px] font-medium text-white">{entry.title}</p>
                {entry.description && (
                  <p className="text-[13px] text-white/85 leading-relaxed pt-1">
                    {entry.description}
                  </p>
                )}
              </div>
            </section>

            {entry.already_attested && (
              <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.06] p-4 sm:p-5 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                    Already attested
                  </span>
                </div>
                <p className="text-[13px] text-white/85 leading-relaxed">
                  {entry.attested_by_name
                    ? `${entry.attested_by_name} signed this off${entry.attestation_email ? ` (${entry.attestation_email})` : ''}.`
                    : 'This entry has already been attested.'}
                </p>
              </div>
            )}

            {!entry.already_attested && !done && (
              <section className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 space-y-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Your details
                  </span>
                  <p className="text-[13px] text-white/70 leading-relaxed">
                    These are stamped onto the audit trail for the college / EPAO.
                  </p>
                </div>
                <div className="space-y-3">
                  <label className="block space-y-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Your full name
                    </span>
                    <input
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Murphy"
                      className="w-full h-11 px-3 rounded-lg bg-[hsl(0_0%_8%)] border border-white/[0.08] text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 outline-none"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Your work email
                    </span>
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.co.uk"
                      className="w-full h-11 px-3 rounded-lg bg-[hsl(0_0%_8%)] border border-white/[0.08] text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 outline-none"
                    />
                  </label>
                  <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirm}
                      onChange={(e) => setConfirm(e.target.checked)}
                      className="mt-1 h-4 w-4 accent-[#facc15] flex-shrink-0"
                    />
                    <span className="text-[12.5px] text-white/85 leading-relaxed">
                      I confirm that the apprentice completed the work above and that the
                      hours are accurate. I understand my name and email will be recorded
                      on their training record.
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="rounded-md border border-red-500/30 bg-red-500/[0.04] px-3 py-2">
                    <p className="text-[12px] text-red-300">{error}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAttest}
                  disabled={
                    submitting ||
                    !confirm ||
                    name.trim().length < 2 ||
                    !email.trim().includes('@')
                  }
                  className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Attest these hours
                    </>
                  )}
                </button>
              </section>
            )}

            {done && (
              <section className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.06] p-5 sm:p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                    Thanks — attested
                  </span>
                </div>
                <p className="text-[14px] text-white leading-relaxed">
                  These hours are now on the audit trail with your name and email. The
                  apprentice and their college can see the attestation immediately. You
                  can close this tab.
                </p>
              </section>
            )}
          </>
        )}

        <footer className="pt-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
            Powered by Elec-Mate · UK apprenticeship platform
          </p>
        </footer>
      </div>
    </div>
  );
}
