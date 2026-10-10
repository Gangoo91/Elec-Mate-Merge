/**
 * /training-plan/sign/:token — the apprentice or employer reads a training
 * plan version and signs it (ELE-2039), or agrees at the end that it was
 * delivered (para 101).
 *
 * Funding rules 2026/27 (v3): the provider, employer and apprentice all sign
 * the plan (99, 99.4); signatures must be irrefutable (346–347). The employer
 * signs by this personal link with no account. The apprentice signs here too,
 * but must be signed in to their own Elec-Mate account when they have one.
 * Each signature is bound to the version's SHA-256 fingerprint shown below.
 */
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Label } from '@/components/ui/label';
import {
  PublicCard,
  PublicEyebrow,
  PublicH1,
  PublicLead,
  PublicPageShell,
  PUBLIC_PRIMARY_CTA,
} from '@/components/public/PublicPageShell';
import type { TrainingPlanContent } from '@/hooks/useTrainingPlans';

interface SignView {
  error?: string;
  purpose: 'plan' | 'delivered';
  role: 'apprentice' | 'employer';
  plan: {
    id: string;
    version: number;
    status: string;
    content: TrainingPlanContent;
    content_hash: string | null;
    issued_at: string | null;
    in_force_from: string | null;
    change_reason: string | null;
    delivered_at: string | null;
  };
  learner: string;
  college: string | null;
  needs_sign_in: boolean;
  signed_in_as_learner: boolean;
  statement: string;
  open: boolean;
  signatures: Array<{
    role: string;
    signer_name: string;
    signed_at: string;
    signature_hash: string;
  }>;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  'touch-manipulation';

const fmtDate = (iso: string | null | undefined) =>
  iso
    ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'not set';

const EM: Record<string, string> = {
  achieved: 'Already achieved',
  exempt: 'Exempt',
  to_deliver: 'To be delivered',
};
const ROLE: Record<string, string> = {
  apprentice: 'Apprentice',
  employer: 'Employer',
  provider: 'College',
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-[16rem_1fr] sm:gap-4">
      <dt className="text-[13px] font-medium text-white">{label}</dt>
      <dd className="text-[15px] leading-relaxed text-white">{value || 'Not given'}</dd>
    </div>
  );
}

export default function TrainingPlanSignPage() {
  const { token } = useParams<{ token: string }>();
  const [v, setV] = useState<SignView | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [agree, setAgree] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!token) return;
    void supabase
      .rpc('get_training_plan_for_signing' as never, { p_token: token } as never)
      .then(({ data, error: e }) => {
        setV(
          e ? ({ error: 'This link is not valid.' } as SignView) : (data as unknown as SignView)
        );
        setLoading(false);
      });
  }, [token]);
  useEffect(load, [load]);

  const sign = async () => {
    if (!token || saving) return;
    setSaving(true);
    setError(null);
    const { data, error: e } = await supabase.rpc(
      'sign_training_plan_by_link' as never,
      {
        p_token: token,
        p_name: name,
        p_title: title || null,
        p_company: company || null,
        p_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      } as never
    );
    setSaving(false);
    const res = data as unknown as { ok?: boolean; error?: string } | null;
    if (e || !res?.ok) {
      setError(res?.error ?? e?.message ?? 'Could not sign. Try again.');
      return;
    }
    load();
  };

  if (loading) {
    return (
      <PublicPageShell>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        </div>
      </PublicPageShell>
    );
  }
  if (!v || v.error) {
    return (
      <PublicPageShell>
        <PublicEyebrow>Training plan</PublicEyebrow>
        <PublicH1>This link is not valid</PublicH1>
        <PublicLead>Ask the college to send the link again.</PublicLead>
      </PublicPageShell>
    );
  }

  const c = v.plan.content;
  const mine = v.signatures.find((s) => s.role === v.role);
  const mustSignIn = v.role === 'apprentice' && v.needs_sign_in && !v.signed_in_as_learner;
  const valid =
    name.trim().length >= 2 && agree && (v.role !== 'employer' || company.trim().length >= 2);

  return (
    <PublicPageShell>
      <PublicEyebrow>
        {v.purpose === 'plan' ? 'Training plan' : 'Training plan delivered'}
      </PublicEyebrow>
      <PublicH1>
        {v.learner}: training plan, version {v.plan.version}
      </PublicH1>
      <PublicLead>
        {v.purpose === 'plan'
          ? `${v.college ?? 'The college'} has issued this plan. The apprentice, the employer and the college each sign it.`
          : 'At the end of the programme the apprentice, the employer and the college agree that the content of this plan has been delivered.'}
      </PublicLead>

      <PublicCard className="mt-8">
        <dl className="divide-y divide-white/[0.08]" data-testid="plan-content">
          <Row
            label="Apprentice and job role"
            value={`${c.apprentice.name ?? v.learner} · ${c.apprentice.job_role ?? ''}`}
          />
          <Row
            label="Normal weekly paid hours"
            value={c.apprentice.weekly_hours ? `${c.apprentice.weekly_hours} hours` : ''}
          />
          <Row
            label="Who is involved"
            value={[
              `Provider: ${c.parties.provider ?? ''}`,
              `Employer: ${c.parties.employer ?? ''}`,
              c.parties.subcontractors ? `Subcontractors: ${c.parties.subcontractors}` : null,
              `End-point assessment organisation: ${c.parties.epao || 'to be confirmed'}`,
            ]
              .filter(Boolean)
              .join(' · ')}
          />
          <Row
            label="Apprenticeship"
            value={`${c.programme.standard ?? ''}${c.programme.level ? `, level ${c.programme.level}` : ''}`}
          />
          <Row
            label="Dates"
            value={`Apprenticeship ${fmtDate(c.programme.start_date)} to ${fmtDate(c.programme.end_date)} · practical period ${fmtDate(c.programme.practical_start)} to ${fmtDate(c.programme.practical_end)}`}
          />
          <Row
            label="Planned off-the-job hours"
            value={c.planned_otj_hours ? `${c.planned_otj_hours} hours` : ''}
          />
          <Row label="Delivery model" value={c.delivery_model} />
          <Row
            label="Training to be delivered"
            value={
              <ul className="space-y-1.5">
                {(c.occupational_training ?? []).map((r, i) => (
                  <li key={i}>
                    {r.content}: {r.when}, by {r.who}
                    {r.hours ? `, ${r.hours} hours` : ''}
                    {r.in_otj ? ' (off-the-job)' : ' (not off-the-job)'}
                  </li>
                ))}
              </ul>
            }
          />
          <Row
            label="English and maths"
            value={`English: ${EM[c.english_maths.english ?? ''] ?? ''} · Maths: ${EM[c.english_maths.maths ?? ''] ?? ''}${
              c.english_maths.not_in_otj ? ' · not included in the off-the-job hours' : ''
            }`}
          />
          <Row label="Initial assessment" value={c.initial_assessment_summary} />
          <Row
            label="Prior learning"
            value={
              c.prior_learning.hours_reduced > 0
                ? `${c.prior_learning.hours_reduced} hours left out. ${c.prior_learning.summary ?? ''}`
                : c.prior_learning.summary || 'None found'
            }
          />
          {c.support && <Row label="Support" value={c.support} />}
          <Row
            label="Progress reviews"
            value={`Every ${c.reviews.frequency_months ?? 3} months · ${c.reviews.format ?? ''}`}
          />
          <Row label="Queries and complaints" value={c.complaints} />
          {v.plan.change_reason && (
            <Row label="What changed in this version" value={v.plan.change_reason} />
          )}
        </dl>
        <p className="mt-4 break-all text-[12px] text-white">
          Version fingerprint (SHA-256): {v.plan.content_hash}
        </p>
      </PublicCard>

      <PublicCard className="mt-4">
        <p className="text-[15px] font-semibold text-white">Signatures</p>
        <ul className="mt-3 space-y-1.5 text-[15px] text-white" data-testid="plan-signatures">
          {(['apprentice', 'employer', 'provider'] as const).map((r) => {
            const s = v.signatures.find((x) => x.role === r);
            return (
              <li key={r}>
                {ROLE[r]}: {s ? `${s.signer_name}, ${fmtDate(s.signed_at)}` : 'not signed yet'}
              </li>
            );
          })}
        </ul>
      </PublicCard>

      {mine ? (
        <p className="mt-6 text-[15px] text-white" data-testid="plan-signed">
          You signed on {fmtDate(mine.signed_at)}. Signature {mine.signature_hash.slice(0, 16)}.
        </p>
      ) : !v.open ? (
        <p className="mt-6 text-[15px] text-white">
          This version is no longer open for signing. Ask the college for the current link.
        </p>
      ) : mustSignIn ? (
        <PublicCard className="mt-4">
          <p className="text-[15px] text-white">
            Sign in to Elec-Mate as {v.learner} to sign your training plan.
          </p>
          <Link
            to="/auth/signin"
            state={{ from: { pathname: `/training-plan/sign/${token}` } }}
            className={`${PUBLIC_PRIMARY_CTA} mt-4`}
          >
            Sign in
          </Link>
        </PublicCard>
      ) : (
        <PublicCard className="mt-4 print:hidden">
          <p className="text-[17px] font-semibold text-white">
            {v.purpose === 'plan' ? `Sign as the ${v.role}` : `Agree as the ${v.role}`}
          </p>
          <div className="mt-5 space-y-5">
            <div>
              <Label className="mb-1 block text-[13px] font-medium text-white">
                Your full name
              </Label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCn}
                autoComplete="name"
                data-testid="sign-name"
              />
            </div>
            {v.role === 'employer' && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label className="mb-1 block text-[13px] font-medium text-white">Your role</Label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputCn}
                    placeholder="e.g. Director"
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-[13px] font-medium text-white">Company</Label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={inputCn}
                    autoComplete="organization"
                    data-testid="sign-company"
                  />
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => setAgree((x) => !x)}
              aria-pressed={agree}
              data-testid="sign-agree"
              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-[15px] leading-snug text-white touch-manipulation ${
                agree ? 'border-elec-yellow' : 'border-white/[0.15]'
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold ${
                  agree ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
                }`}
              >
                {agree ? '✓' : ''}
              </span>
              {v.statement}
            </button>
            {error && <p className="text-[14px] text-orange-300">{error}</p>}
            <button
              type="button"
              onClick={() => void sign()}
              disabled={!valid || saving}
              className={PUBLIC_PRIMARY_CTA}
              data-testid="sign-submit"
            >
              {saving ? 'Signing…' : v.purpose === 'plan' ? 'Sign the plan' : 'Agree'}
            </button>
          </div>
        </PublicCard>
      )}
    </PublicPageShell>
  );
}
