/**
 * ForCollegesPage — public page at /for-colleges (ELE-1924, ELE-1979).
 *
 * The learner-owned story for curriculum leads: the apprentice keeps their
 * record for life, the tutor's morning is one screen, evidence goes to a
 * decision on a phone. For FE colleges, independent training providers and
 * employers that are their own provider.
 *
 * The request flow is "request access for your college": it posts to the
 * existing college-request-info edge function, which adds the person to the
 * warm-leads list, keeps the request (college_access_requests) and emails
 * founder@elec-mate.com. Nothing here offers a call, session or demo.
 *
 * Copy rules: describe Elec-Mate only (never another company), no invented
 * figures, no promises about funding, and pricing is a marked placeholder
 * until Andrew confirms the commercial model (COLLEGE_PRICING_COPY below).
 *
 * Landing v4 design via PublicPageShell. All text white; one solid yellow
 * action per block.
 */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import {
  PUBLIC_PRIMARY_CTA,
  PUBLIC_SECONDARY_CTA,
  PublicCard,
  PublicEyebrow,
  PublicPageShell,
} from '@/components/public/PublicPageShell';
import { PROVIDER_TYPES, PROVIDER_WORDS, type ProviderType } from '@/lib/collegeProviderType';

/**
 * 🔴 PRICING PLACEHOLDER. Andrew to confirm the commercial model before this
 * page goes live. Leave it null and the page shows a clearly marked
 * placeholder. Never state a model or a figure here that Andrew has not
 * signed off, and never describe the apprentice paying for anything the
 * college uses to deliver the programme.
 */
const COLLEGE_PRICING_COPY: string | null = null;
const PRICING_PLACEHOLDER = '[PRICING: Andrew to confirm, college-paid per learner per year]';

const FOUNDER_EMAIL = 'founder@elec-mate.com';

interface FormState {
  name: string;
  email: string;
  organisation: string;
  role: string;
  providerType: ProviderType;
  learners: string;
  programmes: string;
  message: string;
}

const EMPTY: FormState = {
  name: '',
  email: '',
  organisation: '',
  role: '',
  providerType: 'fe_college',
  learners: '',
  programmes: '',
  message: '',
};

const FACTS = [
  {
    title: 'The learner keeps their record for life',
    body: 'Evidence, hours, feedback and progress against every criterion sit in the apprentice’s own Elec-Mate account. When they finish, move on or change employer, the record goes with them. Your staff see all of it while they are with you.',
  },
  {
    title: 'The tutor’s morning in one screen',
    body: 'The next class, hours waiting to be checked, evidence waiting for a decision and messages from learners, in one list. Every row has the button that deals with it: take the register, verify, decide, reply.',
  },
  {
    title: 'Evidence to decision on a phone',
    body: 'The apprentice photographs the job and submits it against the criteria. The assessor passes it or asks for more from their own phone, and the learner sees the decision straight away. Internal quality assurance samples from the same record.',
  },
];

const LEARNER_SIDE = [
  'Their college, cohort and tutor, shown in the app from the day they join',
  'Lessons and quizzes their tutor sets, on their phone',
  'Off-the-job hours logged as they go, then confirmed by the tutor',
  'Every criterion on their qualification, where it stands and what the assessor said',
  'A supervisor can witness their work from a link, with no account needed',
  'Study centre, mock exams and the electrical tools they will use in the trade',
];

const STAFF_SIDE = [
  'Registers, lesson plans and quizzes for each cohort',
  'Off-the-job hours to verify, with the month-by-month picture per learner',
  'Assessment decisions per criterion, with internal quality assurance sampling',
  'Three-way progress reviews and individual learning plans',
  'An evidence pack showing what is missing before an audit',
  'A month in numbers page, counted from your own records',
];

const STEPS = [
  {
    title: 'Request access',
    body: 'Fill in the short form below. It goes straight to Andrew, who founded Elec-Mate.',
  },
  {
    title: 'Get your college code',
    body: 'Andrew replies by email with your set-up code and posters with the join code for your learners.',
  },
  {
    title: 'Set up in a week',
    body: 'A week-one plan in the hub shows who does what on days one to five: staff, cohorts, learners, first registers, first evidence.',
  },
  {
    title: 'Learners join',
    body: 'Apprentices open the join link or type the code, and land in their cohort with their tutor already set.',
  },
];

export default function ForCollegesPage() {
  useSEO({
    title: 'Elec-Mate for colleges and training providers',
    description:
      'An app electrical apprentices keep for life and a College Hub for the staff who teach and assess them. For FE colleges, training providers and employer-providers.',
    noindex: false,
  });

  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const utm = useMemo(
    () => ({
      source: searchParams.get('utm_source') ?? undefined,
      medium: searchParams.get('utm_medium') ?? undefined,
      campaign: searchParams.get('utm_campaign') ?? undefined,
    }),
    [searchParams]
  );

  // Old email links point at #form; keep them landing on the request form.
  useEffect(() => {
    if (window.location.hash === '#form' || window.location.hash === '#request') {
      document.getElementById('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));
  const words = PROVIDER_WORDS[form.providerType];

  const valid =
    form.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    form.organisation.trim().length >= 2;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke('college-request-info', {
        body: {
          audience: 'college',
          name: form.name.trim(),
          email: form.email.trim(),
          organisation: form.organisation.trim(),
          role: form.role.trim() || undefined,
          provider_type: form.providerType,
          learner_estimate: form.learners.trim() || undefined,
          programmes: form.programmes.trim() || undefined,
          message: form.message.trim() || undefined,
          signup_source: 'for_colleges_request_access',
          utm,
        },
      });
      if (fnErr) throw new Error(fnErr.message ?? 'request_failed');
      const out = (data ?? {}) as { ok?: boolean; error?: string };
      if (out.error) throw new Error(out.error);
      if (!out.ok) throw new Error('That did not go through. Please try again.');
      setSubmitted(true);
    } catch (err) {
      setError(
        (err as Error).message ||
          `Something went wrong. Please try again or email ${FOUNDER_EMAIL}.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicPageShell width="wide">
      {/* Hero */}
      <section className="max-w-3xl">
        <PublicEyebrow>For colleges and training providers</PublicEyebrow>
        <h1 className="mt-3 text-[34px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[52px]">
          The apprentice keeps the record. Your tutors see it every day.
        </h1>
        <p className="mt-5 text-[17px] leading-[1.6] text-white sm:text-[19px]">
          Elec-Mate is an app your electrical apprentices carry on their own phone, and a College
          Hub for the staff who teach and assess them. Evidence, hours and progress live in the
          learner’s own account, so the record stays with them when the course ends.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#form" className={cn(PUBLIC_PRIMARY_CTA, 'sm:w-auto')}>
            Request access for your college
          </a>
          <a href="#how" className={cn(PUBLIC_SECONDARY_CTA, 'sm:w-auto')}>
            How it starts
          </a>
        </div>
      </section>

      {/* Three facts */}
      <section className="mt-16 sm:mt-24" aria-labelledby="facts">
        <h2 id="facts" className="text-[24px] font-bold tracking-tight text-white sm:text-[30px]">
          Three things that change on day one
        </h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {FACTS.map((f, i) => (
            <PublicCard key={f.title} className="h-full">
              <p className="text-[13px] font-semibold tabular-nums text-elec-yellow">0{i + 1}</p>
              <h3 className="mt-2 text-[19px] font-semibold leading-snug text-white">{f.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white">{f.body}</p>
            </PublicCard>
          ))}
        </div>
      </section>

      {/* Both sides */}
      <section
        className="mt-16 grid gap-4 sm:mt-24 lg:grid-cols-2"
        aria-label="What each side gets"
      >
        <SideList title="What the apprentice has" items={LEARNER_SIDE} />
        <SideList title="What your staff have" items={STAFF_SIDE} />
      </section>

      {/* Provider types */}
      <section className="mt-16 sm:mt-24" aria-labelledby="who">
        <h2 id="who" className="text-[24px] font-bold tracking-tight text-white sm:text-[30px]">
          Colleges, training providers and employers
        </h2>
        <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-white">
          The same hub works for an FE college, an independent training provider or an employer that
          runs its own apprenticeship programme. The words and the set-up steps change to suit you.
          The product does not.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {PROVIDER_TYPES.map((t) => (
            <div key={t} className="rounded-2xl border border-white/[0.12] p-5">
              <p className="text-[16px] font-semibold text-white">{PROVIDER_WORDS[t].label}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-white">
                {PROVIDER_WORDS[t].setupNote}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it starts */}
      <section id="how" className="mt-16 scroll-mt-24 sm:mt-24" aria-labelledby="how-title">
        <h2
          id="how-title"
          className="text-[24px] font-bold tracking-tight text-white sm:text-[30px]"
        >
          How it starts
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/[0.12] p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-elec-yellow text-[15px] font-bold text-black">
                {i + 1}
              </span>
              <p className="mt-4 text-[17px] font-semibold text-white">{s.title}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing + data */}
      <section className="mt-16 grid gap-4 sm:mt-24 lg:grid-cols-2">
        <PublicCard>
          <h2 className="text-[20px] font-semibold text-white">Pricing</h2>
          {COLLEGE_PRICING_COPY ? (
            <p className="mt-3 text-[15px] leading-relaxed text-white">{COLLEGE_PRICING_COPY}</p>
          ) : (
            <p
              className="mt-3 rounded-xl border-2 border-dashed border-elec-yellow px-4 py-3 font-mono text-[14px] font-semibold text-elec-yellow"
              data-testid="pricing-placeholder"
            >
              {PRICING_PLACEHOLDER}
            </p>
          )}
        </PublicCard>
        <PublicCard>
          <h2 className="text-[20px] font-semibold text-white">Your data</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white">
            Elec-Mate Ltd is registered with the Information Commissioner’s Office (ZB935897). Our
            privacy notice and data processing agreement are public, and your IT team gets the full
            security pack, DPIA and sub-processor list inside the College Hub.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
            <a
              href="/privacy"
              className="inline-flex h-11 items-center text-[15px] font-semibold text-elec-yellow underline-offset-4 hover:underline"
            >
              Privacy notice
            </a>
            <a
              href="/dpa"
              className="inline-flex h-11 items-center text-[15px] font-semibold text-elec-yellow underline-offset-4 hover:underline"
            >
              Data processing agreement
            </a>
          </div>
        </PublicCard>
      </section>

      {/* Request access */}
      <section
        id="form"
        className="mt-16 max-w-2xl scroll-mt-24 sm:mt-24"
        aria-labelledby="form-title"
      >
        <PublicEyebrow>Request access</PublicEyebrow>
        <h2
          id="form-title"
          className="mt-3 text-[28px] font-bold tracking-tight text-white sm:text-[36px]"
        >
          Get your college code
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-white">
          Tell us who you are and Andrew will reply by email with your set-up code and posters for
          your learners. You can also write to{' '}
          <a
            href={`mailto:${FOUNDER_EMAIL}`}
            className="font-semibold text-elec-yellow underline underline-offset-2"
          >
            {FOUNDER_EMAIL}
          </a>
          .
        </p>

        {submitted ? (
          <PublicCard className="mt-8">
            <p className="text-[18px] font-semibold text-white" data-testid="request-sent">
              Thanks, that is with Andrew
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-white">
              He will reply to {form.email.trim()} with your set-up code and posters for your
              learners. If anything changes, just reply to his email.
            </p>
          </PublicCard>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5" data-testid="request-form">
            <fieldset>
              <legend className="mb-2 text-[14px] font-medium text-white">You are</legend>
              <div className="grid gap-2 sm:grid-cols-3" role="radiogroup">
                {PROVIDER_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={form.providerType === t}
                    onClick={() => set('providerType', t)}
                    className={cn(
                      'min-h-[52px] rounded-xl border px-3.5 text-left text-[14px] font-semibold text-white transition-colors touch-manipulation',
                      form.providerType === t
                        ? 'border-elec-yellow'
                        : 'border-white/[0.16] hover:border-white/[0.32]'
                    )}
                  >
                    {PROVIDER_WORDS[t].label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" required>
                <input
                  className={inputCn}
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  autoComplete="name"
                  disabled={submitting}
                />
              </Field>
              <Field label="Work email" required>
                <input
                  className={inputCn}
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  autoComplete="email"
                  disabled={submitting}
                />
              </Field>
            </div>
            <Field label={form.providerType === 'fe_college' ? 'College' : 'Organisation'} required>
              <input
                className={inputCn}
                value={form.organisation}
                onChange={(e) => set('organisation', e.target.value)}
                autoComplete="organization"
                disabled={submitting}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your role">
                <input
                  className={inputCn}
                  value={form.role}
                  onChange={(e) => set('role', e.target.value)}
                  placeholder="e.g. Curriculum lead"
                  autoComplete="organization-title"
                  disabled={submitting}
                />
              </Field>
              <Field label="Roughly how many learners">
                <input
                  className={inputCn}
                  inputMode="numeric"
                  value={form.learners}
                  onChange={(e) => set('learners', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  disabled={submitting}
                />
              </Field>
            </div>
            <Field label="Which programmes">
              <input
                className={inputCn}
                value={form.programmes}
                onChange={(e) => set('programmes', e.target.value)}
                placeholder="e.g. Installation apprenticeship, Level 2 and 3 diplomas"
                disabled={submitting}
              />
            </Field>
            <Field label="Anything else">
              <textarea
                className={cn(inputCn, 'h-auto min-h-[110px] py-3 leading-relaxed')}
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                disabled={submitting}
              />
            </Field>
            {error && (
              <p
                className="rounded-xl border border-orange-400/50 px-4 py-3 text-[14px] text-white"
                role="alert"
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={!valid || submitting}
              className={cn(PUBLIC_PRIMARY_CTA, 'sm:w-auto')}
            >
              {submitting ? 'Sending…' : `Request access for ${words.yours}`}
            </button>
            <p className="text-[13px] leading-relaxed text-white">
              We use these details only to reply about Elec-Mate. Ask us to delete them at any time
              at {FOUNDER_EMAIL}.
            </p>
          </form>
        )}
      </section>
    </PublicPageShell>
  );
}

const inputCn =
  'h-12 w-full rounded-xl border border-white/[0.16] bg-white/[0.04] px-4 text-[16px] text-white placeholder:text-white/70 focus:border-elec-yellow focus:outline-none touch-manipulation disabled:opacity-60';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[14px] font-medium text-white">
        {label}
        {required && <span className="ml-1 text-elec-yellow">*</span>}
      </span>
      {children}
    </label>
  );
}

function SideList({ title, items }: { title: string; items: string[] }) {
  return (
    <PublicCard className="h-full">
      <h2 className="text-[20px] font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-white">
            <span
              aria-hidden
              className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-elec-yellow"
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </PublicCard>
  );
}
