/**
 * EmployerPortalView — /employer-view/:token. The employer's one link (ELE-1879).
 *
 * No account, nothing to learn. The college issues the link (and the weekly
 * email carries it); it opens every apprentice placed with this employer:
 *   - off-the-job hours against the minimum and against the plan to date
 *   - the next progress review: add your view before it, sign after it
 *     (funding rules para 97.2 — the employer takes part every 3 months)
 *   - training the apprentice asked them to confirm (/attest-ojt/:id)
 *   - what was logged this week
 *   - ELE-2040: the per-behaviour verification for gateway (BehaviourVerification);
 *     the weekly email links to it as #behaviours-<student id>
 *   - ELE-2049: how often they have done safe isolation, inspection and testing
 *     and fault finding on site, and what to give them more of (Am2ExposureSection)
 * Every figure is the one the apprentice and tutor see (get_otj_summary).
 *
 * Rebuilt 6 Oct 2026 on the public page shell: the old page used grey text,
 * translucent tints and an icon per heading, against the design rules.
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import {
  PublicCard,
  PublicEyebrow,
  PublicH1,
  PublicLead,
  PublicPageShell,
  PUBLIC_PRIMARY_CTA,
  PUBLIC_SECONDARY_CTA,
} from '@/components/public/PublicPageShell';
import { BehaviourVerification } from '@/components/public/BehaviourVerification';
import {
  Am2ExposureSection,
  type Am2Exposure,
} from '@/components/employer-portal/Am2ExposureSection';

const anon = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
});

interface Apprentice {
  id: string;
  name: string;
  course_name: string | null;
  progress_percent: number;
  attendance_percent: number | null;
  epa_status: string | null;
  epa_gateway_date: string | null;
  /** Counted off-the-job hours (get_otj_summary): verified plus measured app learning. */
  otj_total_hours: number;
  otj_verified_hours: number;
  otj_required_hours?: number | null;
  otj_app_learning_hours?: number;
  otj_planned_to_date_hours?: number | null;
  start_date: string | null;
  expected_end_date: string | null;
  review_due_by?: string | null;
  review?: {
    token: string;
    scheduled_at: string | null;
    mode: string | null;
    locked: boolean;
    employer_input: boolean;
    employer_signed: boolean;
  } | null;
  to_confirm?: Array<{
    id: string;
    title: string;
    activity_date: string;
    duration_minutes: number;
  }>;
  this_week?: Array<{
    title: string;
    activity_date: string;
    duration_minutes: number;
    verification_status: string;
  }>;
  /** ELE-2049. Null when the course has no AM2 or the learner has no account. */
  am2_exposure?: Am2Exposure | null;
}

interface PayloadOk {
  ok: true;
  employer: {
    company_name: string;
    contact_name: string | null;
    has_email?: boolean;
    weekly_digest?: boolean;
  };
  college_name: string | null;
  apprentices: Apprentice[];
  generated_at: string;
}

interface PayloadErr {
  ok: false;
  error: string;
}

const MODE: Record<string, string> = {
  in_person: 'in person',
  video: 'by video call',
  phone: 'by phone',
  email: 'by email',
};

const fmtDate = (iso: string | null | undefined, time = false) => {
  if (!iso) return '';
  const d = iso.length === 10 ? new Date(`${iso}T12:00:00`) : new Date(iso);
  return d.toLocaleDateString('en-GB', {
    weekday: time ? 'short' : undefined,
    day: 'numeric',
    month: 'short',
    year: time ? undefined : 'numeric',
    ...(time ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
};
const fmtH = (h: number | null | undefined) =>
  h == null
    ? '—'
    : `${Number(h).toLocaleString('en-GB', { maximumFractionDigits: h < 10 ? 1 : 0 })}h`;
const fmtMin = (m: number) => (m < 60 ? `${m}m` : `${(m / 60).toFixed(m % 60 ? 1 : 0)}h`);

export default function EmployerPortalView() {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PayloadOk | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [digestOn, setDigestOn] = useState<boolean | null>(null);
  const [digestMsg, setDigestMsg] = useState<string | null>(null);
  const [askStop, setAskStop] = useState(false);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        // ?digest=off — the "Stop these weekly emails" link. Asks for a tap:
        // mail scanners open links, and must not unsubscribe anyone.
        if (new URLSearchParams(window.location.search).get('digest') === 'off') setAskStop(true);
        const url = `${SUPABASE_URL}/functions/v1/employer-portal-view?token=${encodeURIComponent(token)}`;
        const res = await fetch(url);
        const body = (await res.json()) as PayloadOk | PayloadErr;
        if (cancelled) return;
        if (!res.ok || !body.ok)
          setError((body as PayloadErr).error || `Could not load (${res.status})`);
        else {
          setData(body);
          setDigestOn(body.employer.weekly_digest ?? true);
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
  }, [token]);

  // The weekly email links straight to a card (#behaviours-<id>). The page
  // renders after the fetch, so the browser's own jump to the hash has
  // already missed; do it once the cards are there.
  useEffect(() => {
    if (!data) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    }, 400);
    return () => window.clearTimeout(t);
  }, [data]);

  const toggleDigest = async () => {
    if (!token || digestOn == null) return;
    const next = !digestOn;
    const { data: r } = await anon.rpc(
      'employer_portal_set_digest' as never,
      { p_token: token, p_on: next } as never
    );
    if ((r as unknown as { success?: boolean })?.success) {
      setDigestOn(next);
      setAskStop(false);
      setDigestMsg(
        next
          ? 'Weekly emails are on.'
          : 'Weekly emails stopped. You can turn them back on at the bottom of this page.'
      );
    }
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

  if (error || !data) {
    return (
      <PublicPageShell>
        <PublicEyebrow>Your apprentices</PublicEyebrow>
        <PublicH1>This link has stopped working</PublicH1>
        <PublicLead>
          {error ? `${error}. ` : ''}Ask the college to send you a fresh link.
        </PublicLead>
      </PublicPageShell>
    );
  }

  const list = data.apprentices;
  const waiting = list.reduce(
    (n, a) =>
      n +
      (a.to_confirm?.length ?? 0) +
      (a.review &&
      ((a.review.locked && !a.review.employer_signed) ||
        (!a.review.locked && !a.review.employer_input))
        ? 1
        : 0),
    0
  );

  return (
    <PublicPageShell width="wide">
      <PublicEyebrow>{data.college_name ?? 'Apprenticeships'} · your apprentices</PublicEyebrow>
      <PublicH1>{data.employer.company_name}</PublicH1>
      <div className="max-w-[46rem]">
        <PublicLead>
          {list.length === 0
            ? 'No apprentices are placed with you at the moment.'
            : `${list.length} ${list.length === 1 ? 'apprentice' : 'apprentices'} at ${data.college_name ?? 'college'}. ${
                waiting > 0
                  ? `${waiting} ${waiting === 1 ? 'thing needs' : 'things need'} you, marked below.`
                  : 'Nothing needs you right now.'
              } No account needed; this page is yours.`}
        </PublicLead>
      </div>

      {askStop && digestOn && (
        <PublicCard className="mt-6 max-w-[40rem]">
          <p className="text-[15px] font-semibold text-white">Stop the Monday email?</p>
          <p className="mt-1 text-[14px] text-white">This page keeps working either way.</p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setAskStop(false)}
              className={PUBLIC_SECONDARY_CTA}
            >
              Keep it
            </button>
            <button type="button" onClick={toggleDigest} className={PUBLIC_PRIMARY_CTA}>
              Stop it
            </button>
          </div>
        </PublicCard>
      )}
      {digestMsg && (
        <p className="mt-6 rounded-xl border border-white/[0.2] px-4 py-3 text-[14px] text-white">
          {digestMsg}
        </p>
      )}

      <div className="mt-8 space-y-4">
        {list.map((a) => (
          <ApprenticeCard key={a.id} a={a} token={token as string} />
        ))}
      </div>

      <PublicCard className="mt-8">
        <p className="text-[15px] font-semibold text-white">What the apprenticeship asks of you</p>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-white">
          <li>
            Release them for off-the-job training in paid hours: at least the total their standard
            sets.
          </li>
          <li>
            Take part in a progress review with the college every three months, or add your view if
            you cannot attend.
          </li>
          <li>Confirm training they did at work when they ask you to.</li>
          <li>
            Before gateway, confirm each behaviour in their standard with an example you have seen
            at work.
          </li>
        </ul>
      </PublicCard>

      {data.employer.has_email && digestOn != null && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] text-white">
            {digestOn
              ? 'You get a short email about your apprentices every Monday.'
              : 'Weekly emails are off.'}
          </p>
          <button type="button" onClick={toggleDigest} className={PUBLIC_SECONDARY_CTA}>
            {digestOn ? 'Stop weekly emails' : 'Turn weekly emails on'}
          </button>
        </div>
      )}

      <p className="mt-8 text-[12.5px] text-white">
        Updated{' '}
        {new Date(data.generated_at).toLocaleString('en-GB', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        })}
        . This link is only for {data.employer.company_name}; please do not forward it.
      </p>
    </PublicPageShell>
  );
}

function ApprenticeCard({ a, token }: { a: Apprentice; token: string }) {
  const planned = a.otj_planned_to_date_hours;
  const behind =
    planned != null && planned - a.otj_total_hours > 1 ? planned - a.otj_total_hours : 0;
  const pct =
    a.otj_required_hours && a.otj_required_hours > 0
      ? Math.min(100, Math.round((100 * a.otj_total_hours) / a.otj_required_hours))
      : null;
  const r = a.review;
  const first = a.name.split(' ')[0];

  return (
    <PublicCard>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[18px] font-semibold text-white">{a.name}</p>
          <p className="text-[13px] text-white">
            {a.course_name ?? 'Apprenticeship'}
            {a.expected_end_date ? ` · ends ${fmtDate(a.expected_end_date)}` : ''}
          </p>
        </div>
        {a.epa_status && (
          <span className="shrink-0 rounded-full border border-white/[0.25] px-2.5 py-1 text-[11px] font-semibold text-white">
            {a.epa_status}
          </span>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
        <div className="min-w-0">
          {/* Off-the-job hours against the minimum */}
          <div className="mt-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[13px] font-medium text-white">Off-the-job training</p>
              <p className="text-[15px] font-semibold tabular-nums text-white">
                {fmtH(a.otj_total_hours)}
                {a.otj_required_hours ? (
                  <span className="font-normal"> of {fmtH(a.otj_required_hours)}</span>
                ) : null}
              </p>
            </div>
            {pct != null && (
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.1]">
                <div className="h-full rounded-full bg-elec-yellow" style={{ width: `${pct}%` }} />
              </div>
            )}
            <p className={`mt-1.5 text-[13px] ${behind > 0 ? 'text-orange-300' : 'text-white'}`}>
              {planned == null || planned < 1
                ? 'Too early to compare with the plan.'
                : behind > 0
                  ? `${fmtH(behind)} behind the plan to date (${fmtH(planned)}).`
                  : `On plan: ${fmtH(planned)} planned by now.`}
            </p>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-white/[0.1] pt-4">
            <div>
              <dt className="text-[12px] font-medium text-white">Attendance</dt>
              <dd className="text-[16px] font-semibold tabular-nums text-white">
                {a.attendance_percent != null ? `${a.attendance_percent}%` : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] font-medium text-white">Course progress</dt>
              <dd className="text-[16px] font-semibold tabular-nums text-white">
                {a.progress_percent}%
              </dd>
            </div>
            <div>
              <dt className="text-[12px] font-medium text-white">Gateway</dt>
              <dd className="text-[16px] font-semibold text-white">
                {a.epa_gateway_date ? fmtDate(a.epa_gateway_date) : '—'}
              </dd>
            </div>
          </dl>

          {/* Progress review */}
          <div className="mt-4 border-t border-white/[0.1] pt-4">
            <p className="text-[13px] font-medium text-white">Progress review</p>
            {r ? (
              r.locked ? (
                r.employer_signed ? (
                  <p className="mt-1 text-[14px] text-white">Signed. Thank you.</p>
                ) : (
                  <a
                    href={`/review/${r.token}`}
                    className={`${PUBLIC_PRIMARY_CTA} mt-3 inline-flex items-center justify-center`}
                  >
                    Read and sign the review summary
                  </a>
                )
              ) : (
                <>
                  <p className="mt-1 text-[14px] text-white">
                    {r.scheduled_at
                      ? `${fmtDate(r.scheduled_at, true)}${r.mode ? `, ${MODE[r.mode] ?? ''}` : ''}`
                      : 'Being arranged'}
                    {r.employer_input ? ' · your view is in' : ''}
                  </p>
                  <a
                    href={`/review/${r.token}`}
                    className={`${r.employer_input ? PUBLIC_SECONDARY_CTA : PUBLIC_PRIMARY_CTA} mt-3 inline-flex items-center justify-center`}
                  >
                    {r.employer_input ? 'Change your view' : 'Add your view (2 minutes)'}
                  </a>
                </>
              )
            ) : (
              <p className="mt-1 text-[14px] text-white">
                {a.review_due_by
                  ? `Next one due by ${fmtDate(a.review_due_by)}. The college will be in touch.`
                  : 'The college will be in touch.'}
              </p>
            )}
          </div>

          {/* ELE-2040: the per-behaviour verification for gateway. The weekly
            email links here (#behaviours-<id>). */}
          <div id={`behaviours-${a.id}`} className="scroll-mt-24">
            <BehaviourVerification token={token} studentId={a.id} firstName={first} />
          </div>

          {/* Training to confirm */}
          {a.to_confirm && a.to_confirm.length > 0 && (
            <div className="mt-4 border-t border-white/[0.1] pt-4">
              <p className="text-[13px] font-medium text-white">Asked you to confirm</p>
              <ul className="mt-1 divide-y divide-white/[0.1]">
                {a.to_confirm.map((e) => (
                  <li key={e.id}>
                    <a
                      href={`/attest-ojt/${e.id}`}
                      className="flex min-h-[52px] items-center justify-between gap-3 py-2 touch-manipulation"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] font-semibold text-white">
                          {e.title}
                        </span>
                        <span className="block text-[12.5px] text-white">
                          {fmtDate(e.activity_date)} · {fmtMin(e.duration_minutes)}
                        </span>
                      </span>
                      <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">
                        Confirm
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="min-w-0">
          {/* ELE-2049: practice for the AM2. The exposure alert email links to this page. */}
          {a.am2_exposure && (
            <div id={`am2-${a.id}`} className="scroll-mt-24">
              <Am2ExposureSection
                data={a.am2_exposure}
                firstName={first}
                className="lg:mt-5 lg:border-t-0 lg:pt-0"
              />
            </div>
          )}

          {/* This week */}
          {a.this_week && a.this_week.length > 0 && (
            <div className="mt-4 border-t border-white/[0.1] pt-4">
              <p className="text-[13px] font-medium text-white">Training this week</p>
              <ul className="mt-1 space-y-1.5">
                {a.this_week.map((e, i) => (
                  <li
                    key={i}
                    className="flex items-baseline justify-between gap-3 text-[14px] text-white"
                  >
                    <span className="min-w-0 truncate">{e.title}</span>
                    <span className="shrink-0 tabular-nums">
                      {fmtMin(e.duration_minutes)}
                      {e.verification_status === 'pending' ? ' · to check' : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </PublicCard>
  );
}
