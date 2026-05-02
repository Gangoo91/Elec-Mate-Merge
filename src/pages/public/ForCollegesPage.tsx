/**
 * ForCollegesPage — public landing page at /for-colleges.
 *
 * The CTA from the college outreach email points here. Page sells the
 * platform briefly, then the form posts into Brevo list 9 via the
 * college-request-info edge function. Form submission is the consent
 * pivot — once they've filled it in, we have explicit permission to
 * keep talking to them.
 *
 * Public route, no auth. Uses the apprentice-app design language
 * (bg-elec-dark, elec-yellow accent) so the page feels native to the
 * platform a tutor will demo on.
 */

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';

interface FormState {
  name: string;
  email: string;
  college: string;
  role: string;
  phone: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  college: '',
  role: '',
  phone: '',
  message: '',
};

const FOUNDER_EMAIL = 'founder@elec-mate.com';

export default function ForCollegesPage() {
  useSEO({
    title: 'Elec-Mate for FE colleges — apprenticeship management, IQA, compliance',
    description:
      "Two-sided platform for UK FE colleges teaching electrical apprenticeships. Tutors manage in the College Hub, apprentices learn on their phone. Get in touch for a walkthrough.",
    noindex: false,
  });

  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Capture UTM tags from the email link so we know which campaign drove
  // each lead. Read once on mount — they don't change as the user types.
  const utm = useMemo(
    () => ({
      source: searchParams.get('utm_source') ?? undefined,
      medium: searchParams.get('utm_medium') ?? undefined,
      campaign: searchParams.get('utm_campaign') ?? undefined,
    }),
    [searchParams]
  );

  // Auto-scroll to the form if the URL has #form (so the email CTA can
  // skip past the marketing copy if a lead has already decided).
  useEffect(() => {
    if (window.location.hash === '#form') {
      const el = document.getElementById('form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const valid =
    form.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    form.college.trim().length >= 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke('college-request-info', {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          college: form.college.trim(),
          role: form.role.trim() || undefined,
          phone: form.phone.trim() || undefined,
          message: form.message.trim() || undefined,
          utm,
        },
      });
      if (fnErr) throw new Error(fnErr.message ?? 'request_failed');
      const out = (data ?? {}) as { ok?: boolean; error?: string };
      if (out.error) throw new Error(out.error);
      if (!out.ok) throw new Error('Could not submit, please try again.');
      setSubmitted(true);
    } catch (err) {
      setError((err as Error).message ?? 'Something went wrong. Please try again or email us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-[14px] font-semibold tracking-tight">
            Elec-Mate
          </a>
          <a
            href={`mailto:${FOUNDER_EMAIL}`}
            className="text-[12px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation"
          >
            {FOUNDER_EMAIL}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 sm:px-6 pt-10 sm:pt-16 pb-8">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
          For UK FE colleges
        </div>
        <h1 className="mt-3 font-semibold tracking-tight leading-[1.05] text-[34px] sm:text-[44px] lg:text-[56px]">
          <span className="text-elec-yellow">The college side</span>
          <span className="text-white"> of Elec-Mate is built.</span>
        </h1>
        <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-relaxed text-white/85 max-w-2xl">
          Tutors manage in the College Hub. Apprentices learn on their phone. Same data,
          no double entry. They submit OTJ → you verify → IQA samples it → the audit pack
          stamps it. Nobody retypes anything.
        </p>
        <a
          href="#form"
          className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-elec-yellow text-black text-[14px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
        >
          Get in touch
          <ArrowRight className="h-4 w-4" />
        </a>
      </section>

      {/* What's in it — short bullet view, the email has the full pitch */}
      <section className="mx-auto max-w-5xl px-5 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <FeatureBlock
            eyebrow="Teach"
            items={[
              'Lesson plans drafted in 90 seconds, cohort-aware',
              'PowerPoint-ready slide decks with image generation',
              'Quizzes that write themselves and grade free-response',
              'Materials library auto-tagged by AC',
            ]}
          />
          <FeatureBlock
            eyebrow="Assess"
            items={[
              'AC Coverage Matrix with bulk sign-off',
              'Marking copilot drafts grades + justifications',
              'IQA workflow with auto-cascading verdicts',
              'Predicted EPA band per learner',
            ]}
          />
          <FeatureBlock
            eyebrow="Run the cohort"
            items={[
              'Tutor Today morning view',
              'At-risk engine recomputes nightly',
              'ILP generator with SMART target drafting',
              '"Show me" natural-language search',
              'Unified inbox: comments, OTJ, IQA, messages',
            ]}
          />
          <FeatureBlock
            eyebrow="Stay compliant"
            items={[
              'Policy author + templates library',
              'DBS / CPD / qualifications vault with expiry alerts',
              'One-click Ofsted audit pack PDF',
            ]}
          />
        </div>
      </section>

      {/* Apprentice side */}
      <section className="mx-auto max-w-5xl px-5 sm:px-6 py-8">
        <div className="rounded-2xl border border-elec-yellow/15 bg-elec-yellow/[0.04] p-5 sm:p-7">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
            On the apprentice side
          </div>
          <h2 className="mt-2 text-[22px] sm:text-[26px] font-semibold tracking-tight">
            The platform your apprentices already learn on
          </h2>
          <ul className="mt-3 space-y-1.5 text-[14px] text-white/85 leading-relaxed">
            <li>• A weekly brief drafted from their grades, gap ACs and ILP targets</li>
            <li>• Live AC coverage card — they see what's signed off in realtime</li>
            <li>• OTJ submit with smart write-up from a one-line prompt</li>
            <li>• "What can I do next?" job ideas targeting their specific gaps</li>
            <li>• Two-way ILP — your goals appear in their card, they reply, you see it</li>
            <li>• Realtime activity feed — every comment, verdict, sign-off lands instantly</li>
            <li>• Pre-EPA brief: viva topics + must-revise ACs from their portfolio</li>
            <li>• ESFA traffic light from verified hours</li>
          </ul>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="mx-auto max-w-2xl px-5 sm:px-6 py-10 sm:py-14">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
          Get in touch
        </div>
        <h2 className="mt-2 text-[24px] sm:text-[28px] font-semibold tracking-tight">
          Fill in the form below and we'll come back to you.
        </h2>
        <p className="mt-2 text-[14px] text-white/85 leading-relaxed">
          Happy to walk you through any of this on a call, or just answer questions over
          email if that's easier. Reach Andrew directly at{' '}
          <a
            href={`mailto:${FOUNDER_EMAIL}`}
            className="text-elec-yellow hover:text-elec-yellow/85 underline underline-offset-2"
          >
            {FOUNDER_EMAIL}
          </a>
          .
        </p>

        {submitted ? (
          <div className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.06] p-6">
            <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              Got it — thank you
            </div>
            <p className="mt-3 text-[15px] text-white/95 leading-relaxed">
              Andrew will be in touch within a working day. In the meantime, any questions
              you'd rather get an instant answer to, just reply to the email and we'll
              come back to you.
            </p>
            <a
              href={`mailto:${FOUNDER_EMAIL}`}
              className="mt-4 inline-flex items-center gap-2 h-10 px-4 rounded-full border border-white/[0.10] bg-white/[0.02] text-[12.5px] font-medium text-white/95 hover:border-white/[0.22] transition-colors touch-manipulation"
            >
              <Mail className="h-3.5 w-3.5" />
              Email Andrew directly
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field label="Your name" required>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                disabled={submitting}
                autoComplete="name"
                className={inputClass}
                placeholder="Jane Smith"
              />
            </Field>

            <Field label="Email" required>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                disabled={submitting}
                autoComplete="email"
                className={inputClass}
                placeholder="jane.smith@college.ac.uk"
              />
            </Field>

            <Field label="College or organisation" required>
              <input
                type="text"
                value={form.college}
                onChange={(e) => update('college', e.target.value)}
                disabled={submitting}
                autoComplete="organization"
                className={inputClass}
                placeholder="e.g. Manchester College"
              />
            </Field>

            <Field label="Your role" hint="e.g. Head of Apprenticeships, DSL, IQA Lead">
              <input
                type="text"
                value={form.role}
                onChange={(e) => update('role', e.target.value)}
                disabled={submitting}
                autoComplete="organization-title"
                className={inputClass}
                placeholder="Head of Apprenticeships"
              />
            </Field>

            <Field label="Phone" hint="Optional — if you'd rather we call than email">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                disabled={submitting}
                autoComplete="tel"
                className={inputClass}
                placeholder="07…"
              />
            </Field>

            <Field
              label="What's your team currently struggling with?"
              hint="Optional — if you tell us, we'll send a 30-second clip showing how we'd handle it"
            >
              <textarea
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                disabled={submitting}
                rows={4}
                className={cn(inputClass, 'resize-y leading-relaxed')}
                placeholder="e.g. AC sign-off takes 90 minutes per apprentice at end of block."
              />
            </Field>

            {error && (
              <div className="rounded-lg border border-rose-400/30 bg-rose-500/[0.06] p-3 text-[12.5px] text-rose-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!valid || submitting}
              className={cn(
                'inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-[14px] font-semibold transition-colors touch-manipulation w-full sm:w-auto',
                submitting
                  ? 'bg-elec-yellow/40 text-black/70'
                  : !valid
                    ? 'bg-white/[0.05] text-white/40'
                    : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
              )}
            >
              {submitting ? (
                <>
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Sending…
                </>
              ) : (
                <>
                  Send <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-white/55 leading-relaxed">
              We'll only use these details to come back to you about Elec-Mate. You can
              ask us to remove your details at any time by emailing{' '}
              <a href={`mailto:${FOUNDER_EMAIL}`} className="underline underline-offset-2">
                {FOUNDER_EMAIL}
              </a>
              .
            </p>
          </form>
        )}
      </section>

      <footer className="mt-8 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 py-6 flex items-center justify-between text-[11px] text-white/55">
          <span>© Elec-Mate Ltd · UK</span>
          <a
            href={`mailto:${FOUNDER_EMAIL}`}
            className="hover:text-white/85 transition-colors"
          >
            {FOUNDER_EMAIL}
          </a>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────── form atoms ─────────────────────────── */

const inputClass =
  'w-full h-11 px-4 rounded-lg bg-white/[0.03] border border-white/[0.10] text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/25 touch-manipulation disabled:opacity-60';

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <span className="text-[12.5px] font-medium text-white">
          {label}
          {required && <span className="text-elec-yellow ml-1">*</span>}
        </span>
        {hint && <span className="text-[11px] text-white/55">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function FeatureBlock({ eyebrow, items }: { eyebrow: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
        {eyebrow}
      </div>
      <ul className="mt-3 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span className="mt-1.5 inline-block h-1 w-1 rounded-full bg-elec-yellow shrink-0" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
