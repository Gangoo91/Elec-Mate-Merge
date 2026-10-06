/**
 * /review/:token — the employer's side of an apprentice's progress review,
 * with no account (ELE-1879 / ELE-1880).
 *
 * Funding rules 2025/26, para 97.2: the review is a three-way discussion. An
 * employer who cannot attend must be given the chance to contribute (97.2.1),
 * and the summary is shared with everyone (97.2.2). Before the review this
 * page asks three questions; after it, it shows the summary to read and sign.
 * Opening the link, answering and signing are all recorded for the college's
 * evidence pack. Wellbeing and safeguarding notes are never shown here, and
 * learning support only when the apprentice agreed (para 40.5.2).
 */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  PublicCard,
  PublicEyebrow,
  PublicH1,
  PublicLead,
  PublicPageShell,
  PUBLIC_PRIMARY_CTA,
  PUBLIC_SECONDARY_CTA,
} from '@/components/public/PublicPageShell';

// The app's own client: anonymous for the employer, but carrying the session
// when a tutor opens the link, so the database does not record a tutor's
// preview as "the employer opened it", and an Employer Hub signature is
// recorded as one.
const anon = supabase;

type Progress = 'ahead' | 'on_track' | 'behind';

interface PublicReview {
  learner_name: string;
  college_name: string | null;
  employer: string | null;
  tutor_name: string | null;
  scheduled_at: string | null;
  mode: 'in_person' | 'video' | 'phone' | 'email' | null;
  location: string | null;
  meeting_url: string | null;
  status: string;
  locked: boolean;
  held_on: string | null;
  course: string | null;
  progress_percent: number | null;
  expected_end_date: string | null;
  otj: {
    counted_hours: number;
    required_hours: number | null;
    planned_to_date_hours: number | null;
    slippage_hours: number;
  } | null;
  hours_since: number;
  since: string;
  attendance_since: { sessions: number; percent: number | null } | null;
  evidence_since: { signed_off: number; awaiting_assessment: number; witness_statements: number } | null;
  open_actions: Array<{ action: string; owner_party: string; due_date: string | null }>;
  employer_input: {
    progress: Progress;
    going_well?: string;
    focus_next?: string;
    concerns?: string;
    name?: string;
    role?: string;
    at?: string;
  } | null;
  summary: {
    summary: string | null;
    progress: string | null;
    otj: string | null;
    evidence: string | null;
    plan_change: string | null;
    plan_note: string | null;
    concerns: string | null;
    learning_support: string | null;
    checked_actions: Array<{ action: string; owner_party: string; status: string; outcome_note: string | null }> | null;
    agreed_actions: Array<{ action: string; owner_party: string; due_date: string | null }> | null;
    employer_attendance: string | null;
    employer_must_sign: boolean | null;
  } | null;
  signatures: {
    tutor_name: string | null;
    tutor_signed_at: string | null;
    student_name: string | null;
    student_signed_at: string | null;
    employer_name: string | null;
    employer_role: string | null;
    employer_signed_at: string | null;
  };
  error?: string;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  'touch-manipulation';
const textareaCn =
  'w-full resize-none rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base text-white placeholder:text-white/25 ' +
  'caret-elec-yellow focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-elec-yellow/50 touch-manipulation';
const labelCn = 'mb-1 block text-[13px] font-medium text-white';

const MODE: Record<string, string> = {
  in_person: 'In person',
  video: 'Video call',
  phone: 'Phone call',
  email: 'By email',
};
const OWNER: Record<string, string> = { apprentice: 'Apprentice', employer: 'Employer', college: 'College' };
const PLAN: Record<string, string> = {
  none: 'No change to the training plan',
  minor: 'A small change to the training plan',
  content: 'Training content added or removed',
  end_date: 'The planned end date changed',
  otj_release: 'The off-the-job training you release them for changed',
};
const CHECK: Record<string, string> = { done: 'Done', not_done: 'Not done', dropped: 'No longer needed' };
const PROGRESS: Array<{ value: Progress; label: string }> = [
  { value: 'ahead', label: 'Ahead' },
  { value: 'on_track', label: 'On track' },
  { value: 'behind', label: 'Behind' },
];

const fmtDate = (iso: string | null | undefined, time = false) => {
  if (!iso) return '';
  const d = iso.length === 10 ? new Date(`${iso}T12:00:00`) : new Date(iso);
  return d.toLocaleDateString('en-GB', {
    weekday: time ? 'long' : undefined,
    day: 'numeric',
    month: 'long',
    year: time ? undefined : 'numeric',
    ...(time ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
};
const fmtH = (h: number | null | undefined) =>
  h == null ? '—' : `${Number(h).toLocaleString('en-GB', { maximumFractionDigits: 1 })}h`;

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`h-11 w-full rounded-xl border px-3 text-[14px] touch-manipulation ${
        on ? 'border-elec-yellow bg-elec-yellow font-semibold text-black' : 'border-white/[0.15] text-white'
      }`}
    >
      {children}
    </button>
  );
}

export default function ReviewPublicPage() {
  const { token } = useParams<{ token: string }>();
  const [rv, setRv] = useState<PublicReview | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const load = () => {
    if (!token) return;
    anon.rpc('get_tripartite_review_public' as never, { p_token: token } as never).then(({ data, error }) => {
      setRv(error ? ({ error: 'invalid' } as PublicReview) : (data as unknown as PublicReview));
      setLoading(false);
    });
  };
  useEffect(load, [token]);

  if (loading) {
    return (
      <PublicPageShell>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        </div>
      </PublicPageShell>
    );
  }
  if (!rv || rv.error) {
    return (
      <PublicPageShell>
        <PublicEyebrow>Progress review</PublicEyebrow>
        <PublicH1>This link is not valid</PublicH1>
        <PublicLead>The review may have been cancelled. Ask the college to send the link again.</PublicLead>
      </PublicPageShell>
    );
  }

  const first = rv.learner_name.split(' ')[0];

  return (
    <PublicPageShell>
      <PublicEyebrow>{rv.college_name ?? 'Apprenticeship'} · progress review</PublicEyebrow>
      <PublicH1>
        {rv.locked ? `${rv.learner_name}'s review: summary` : `${rv.learner_name}'s progress review`}
      </PublicH1>
      <PublicLead>
        {rv.locked
          ? `Held on ${fmtDate(rv.held_on)}. Read what was agreed and sign for ${rv.employer ?? 'the employer'}.`
          : rv.scheduled_at
            ? `${fmtDate(rv.scheduled_at, true)}, ${MODE[rv.mode ?? ''] ?? ''}${rv.location ? `, ${rv.location}` : ''}. Every three months the college, ${first} and you review how the apprenticeship is going. It takes two minutes to add your view, whether or not you can be there.`
            : `Every three months the college, ${first} and you review how the apprenticeship is going. Add your view below.`}
      </PublicLead>

      {!rv.locked && rv.meeting_url && (
        <a
          href={rv.meeting_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${PUBLIC_SECONDARY_CTA} mt-6 inline-flex items-center justify-center`}
        >
          Join the video call
        </a>
      )}

      <PublicCard className="mt-8">
        <p className="text-[15px] font-semibold text-white">
          {rv.locked ? 'The record at the review' : `${first} so far`}
          {rv.course ? <span className="font-normal"> · {rv.course}</span> : null}
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {[
            ['Off-the-job training', rv.otj ? fmtH(rv.otj.counted_hours) : '—', rv.otj?.required_hours ? `of ${fmtH(rv.otj.required_hours)} needed` : ''],
            [
              'Planned by now',
              rv.otj?.planned_to_date_hours != null ? fmtH(rv.otj.planned_to_date_hours) : '—',
              rv.otj && rv.otj.slippage_hours > 0 ? `${fmtH(rv.otj.slippage_hours)} behind` : 'on plan',
            ],
            [
              'College attendance',
              rv.attendance_since?.percent != null ? `${rv.attendance_since.percent}%` : '—',
              `since ${fmtDate(rv.since)}`,
            ],
            ['Course progress', rv.progress_percent != null ? `${rv.progress_percent}%` : '—', rv.expected_end_date ? `ends ${fmtDate(rv.expected_end_date)}` : ''],
          ].map(([l, v, n]) => (
            <div key={l}>
              <dt className="text-[13px] font-medium text-white">{l}</dt>
              <dd className="mt-1 text-[22px] font-semibold tabular-nums text-white">{v}</dd>
              {n && <dd className="text-[12.5px] text-white">{n}</dd>}
            </div>
          ))}
        </dl>
        {rv.hours_since > 0 && (
          <p className="mt-5 text-[14px] leading-relaxed text-white">
            {fmtH(rv.hours_since)} of verified off-the-job training since {fmtDate(rv.since)}.
          </p>
        )}
      </PublicCard>

      {!rv.locked && rv.open_actions.length > 0 && (
        <PublicCard className="mt-4">
          <p className="text-[15px] font-semibold text-white">Agreed at the last review</p>
          <ul className="mt-3 divide-y divide-white/[0.1]">
            {rv.open_actions.map((a, i) => (
              <li key={i} className="py-3">
                <p className="text-[15px] text-white">{a.action}</p>
                <p className="text-[13px] text-white">
                  {OWNER[a.owner_party] ?? a.owner_party}
                  {a.due_date ? ` · by ${fmtDate(a.due_date)}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </PublicCard>
      )}

      {!rv.locked &&
        (rv.employer_input && !editing ? (
          <PublicCard className="mt-4">
            <p className="text-[15px] font-semibold text-white">Your view is with the college</p>
            <p className="mt-1 text-[14px] text-white">
              Sent by {rv.employer_input.name}
              {rv.employer_input.at ? ` on ${fmtDate(rv.employer_input.at)}` : ''}. {first} is{' '}
              {PROGRESS.find((p) => p.value === rv.employer_input?.progress)?.label.toLowerCase()} at work.
            </p>
            <button type="button" onClick={() => setEditing(true)} className={`${PUBLIC_SECONDARY_CTA} mt-5`}>
              Change your answers
            </button>
          </PublicCard>
        ) : (
          <EmployerViewForm
            token={token as string}
            first={first}
            initial={rv.employer_input}
            onSent={() => {
              setEditing(false);
              load();
            }}
          />
        ))}

      {rv.locked && rv.summary && <SummaryCards rv={rv} />}

      {rv.locked && (
        <PublicCard className="mt-4">
          <p className="text-[15px] font-semibold text-white">Signatures</p>
          <ul className="mt-3 space-y-2 text-[15px] text-white">
            <li>
              College: {rv.signatures.tutor_signed_at ? `${rv.signatures.tutor_name}, ${fmtDate(rv.signatures.tutor_signed_at)}` : 'not signed'}
            </li>
            <li>
              Apprentice:{' '}
              {rv.signatures.student_signed_at
                ? `${rv.signatures.student_name}, ${fmtDate(rv.signatures.student_signed_at)}`
                : 'not signed yet'}
            </li>
            <li>
              Employer:{' '}
              {rv.signatures.employer_signed_at
                ? `${rv.signatures.employer_name}${rv.signatures.employer_role ? `, ${rv.signatures.employer_role}` : ''}, ${fmtDate(rv.signatures.employer_signed_at)}`
                : 'not signed yet'}
            </li>
          </ul>
        </PublicCard>
      )}

      {rv.locked && !rv.signatures.employer_signed_at && (
        <EmployerSignForm token={token as string} mustSign={!!rv.summary?.employer_must_sign} onSigned={load} />
      )}

      {rv.locked && rv.signatures.employer_signed_at && (
        <div className="mt-6 print:hidden">
          <button type="button" onClick={() => window.print()} className={PUBLIC_SECONDARY_CTA}>
            Print or save as PDF
          </button>
        </div>
      )}

      <p className="mt-8 text-[13px] leading-relaxed text-white">
        Apprenticeship funding rules ask for a progress review at least every three months, with the employer taking
        part. This link is only for {rv.employer ?? 'the employer'}. Please do not forward it.
      </p>
    </PublicPageShell>
  );
}

function EmployerViewForm({
  token,
  first,
  initial,
  onSent,
}: {
  token: string;
  first: string;
  initial: PublicReview['employer_input'];
  onSent: () => void;
}) {
  const [progress, setProgress] = useState<Progress | null>(initial?.progress ?? null);
  const [well, setWell] = useState(initial?.going_well ?? '');
  const [next, setNext] = useState(initial?.focus_next ?? '');
  const [concerns, setConcerns] = useState(initial?.concerns ?? '');
  const [name, setName] = useState(initial?.name ?? '');
  const [role, setRole] = useState(initial?.role ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    if (!progress || name.trim().length < 2 || saving) return;
    setSaving(true);
    setError(null);
    const { data, error: e } = await anon.rpc(
      'submit_tripartite_employer_input' as never,
      {
        p_token: token,
        p_input: { progress, going_well: well, focus_next: next, concerns, name, role },
      } as never
    );
    setSaving(false);
    const res = data as unknown as { success?: boolean; error?: string } | null;
    if (e || !res?.success) {
      setError(res?.error ?? 'Could not send. Try again.');
      return;
    }
    onSent();
  };

  return (
    <PublicCard className="mt-4">
      <p className="text-[17px] font-semibold text-white">Your view</p>
      <p className="mt-1 text-[14px] leading-relaxed text-white">
        Three questions. The college reads them before the review, and they count as your contribution if you cannot
        attend.
      </p>
      <div className="mt-6 space-y-6">
        <div>
          <p className={labelCn}>1. How is {first} doing at work?</p>
          <div className="grid grid-cols-3 gap-2">
            {PROGRESS.map((p) => (
              <Chip key={p.value} on={progress === p.value} onClick={() => setProgress(p.value)}>
                {p.label}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <label className={labelCn} htmlFor="ev-well">
            2. What is going well?
          </label>
          <textarea id="ev-well" rows={3} value={well} onChange={(e) => setWell(e.target.value)} className={textareaCn} />
        </div>
        <div>
          <label className={labelCn} htmlFor="ev-next">
            3. What should {first} work on next, at work or at college?
          </label>
          <textarea id="ev-next" rows={3} value={next} onChange={(e) => setNext(e.target.value)} className={textareaCn} />
        </div>
        <div>
          <label className={labelCn} htmlFor="ev-con">
            Any concerns? (optional)
          </label>
          <textarea
            id="ev-con"
            rows={2}
            value={concerns}
            onChange={(e) => setConcerns(e.target.value)}
            className={textareaCn}
          />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCn} htmlFor="ev-name">
              Your name
            </label>
            <input id="ev-name" value={name} onChange={(e) => setName(e.target.value)} className={inputCn} autoComplete="name" />
          </div>
          <div>
            <label className={labelCn} htmlFor="ev-role">
              Your role
            </label>
            <input
              id="ev-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Supervisor"
              className={inputCn}
              autoComplete="organization-title"
            />
          </div>
        </div>
        {error && <p className="text-[14px] text-orange-300">{error}</p>}
        <button
          type="button"
          onClick={send}
          disabled={!progress || name.trim().length < 2 || saving}
          className={PUBLIC_PRIMARY_CTA}
        >
          {saving ? 'Sending…' : 'Send to the college'}
        </button>
      </div>
    </PublicCard>
  );
}

function SummaryCards({ rv }: { rv: PublicReview }) {
  const s = rv.summary!;
  const rows: Array<[string, string | null]> = [
    ['Summary', s.summary],
    ['Progress', s.progress],
    ['Off-the-job training', s.otj],
    ['Evidence', s.evidence],
    ['Training plan', s.plan_change ? `${PLAN[s.plan_change] ?? s.plan_change}${s.plan_note ? `. ${s.plan_note}` : ''}` : null],
    ['Concerns and new information', s.concerns],
    ['Learning support', s.learning_support],
  ];
  return (
    <>
      <PublicCard className="mt-4">
        <dl className="space-y-5">
          {rows
            .filter(([, v]) => v && v.trim())
            .map(([l, v]) => (
              <div key={l}>
                <dt className="text-[13px] font-medium text-white">{l}</dt>
                <dd className="mt-1 whitespace-pre-wrap text-[16px] leading-relaxed text-white">{v}</dd>
              </div>
            ))}
        </dl>
      </PublicCard>

      {s.checked_actions && s.checked_actions.length > 0 && (
        <PublicCard className="mt-4">
          <p className="text-[15px] font-semibold text-white">Actions from the last review</p>
          <ul className="mt-3 divide-y divide-white/[0.1]">
            {s.checked_actions.map((a, i) => (
              <li key={i} className="py-3">
                <p className="text-[15px] text-white">{a.action}</p>
                <p className="text-[13px] font-semibold text-white">
                  {CHECK[a.status] ?? a.status}
                  {a.outcome_note ? ` · ${a.outcome_note}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </PublicCard>
      )}

      {s.agreed_actions && s.agreed_actions.length > 0 && (
        <PublicCard className="mt-4">
          <p className="text-[15px] font-semibold text-white">Agreed for the next review</p>
          <ul className="mt-3 divide-y divide-white/[0.1]">
            {s.agreed_actions.map((a, i) => (
              <li key={i} className="py-3">
                <p className="text-[15px] font-semibold text-white">{a.action}</p>
                <p className="text-[13px] text-white">
                  {OWNER[a.owner_party] ?? a.owner_party}
                  {a.due_date ? ` · by ${fmtDate(a.due_date)}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </PublicCard>
      )}
    </>
  );
}

function EmployerSignForm({
  token,
  mustSign,
  onSigned,
}: {
  token: string;
  mustSign: boolean;
  onSigned: () => void;
}) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const valid = name.trim().length >= 2 && confirm;

  const sign = async () => {
    if (!valid || saving) return;
    setSaving(true);
    setError(null);
    const { data, error: e } = await anon.rpc(
      'sign_tripartite_review_employer' as never,
      { p_token: token, p_name: name, p_role: role } as never
    );
    setSaving(false);
    const res = data as unknown as { success?: boolean; error?: string } | null;
    if (e || !res?.success) {
      setError(res?.error ?? 'Could not sign. Try again.');
      return;
    }
    onSigned();
  };

  return (
    <PublicCard className="mt-4 print:hidden">
      <p className="text-[17px] font-semibold text-white">Sign for the employer</p>
      {mustSign && (
        <p className="mt-2 text-[14px] leading-relaxed text-orange-300">
          The training plan changed at this review, so the funding rules need the employer to agree it.
        </p>
      )}
      <div className="mt-5 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCn} htmlFor="es-name">
              Your full name
            </label>
            <input id="es-name" value={name} onChange={(e) => setName(e.target.value)} className={inputCn} autoComplete="name" />
          </div>
          <div>
            <label className={labelCn} htmlFor="es-role">
              Your role
            </label>
            <input id="es-role" value={role} onChange={(e) => setRole(e.target.value)} className={inputCn} placeholder="e.g. Director" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setConfirm((v) => !v)}
          aria-pressed={confirm}
          className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-[15px] leading-snug touch-manipulation ${
            confirm ? 'border-elec-yellow text-white' : 'border-white/[0.15] text-white'
          }`}
        >
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold ${
              confirm ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
            }`}
          >
            {confirm ? '✓' : ''}
          </span>
          I have read this summary and agree it reflects the review{mustSign ? ', including the change to the training plan' : ''}.
        </button>
        {error && <p className="text-[14px] text-orange-300">{error}</p>}
        <button type="button" onClick={sign} disabled={!valid || saving} className={PUBLIC_PRIMARY_CTA}>
          {saving ? 'Signing…' : 'Sign the review'}
        </button>
      </div>
    </PublicCard>
  );
}

