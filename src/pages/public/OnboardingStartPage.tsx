/**
 * /start/:token — the learner's or the employer's part of onboarding (ELE-2088).
 *
 * Learner (on their phone): eligibility and residency self-declarations, a
 * copy of their ID or right-to-work document, and their signature on the
 * apprenticeship agreement. A learner with an Elec-Mate account must be
 * signed in as themselves.
 * Employer (no account, by this link): the employment details, their
 * signature on the apprenticeship agreement, and the contract for services.
 *
 * Funding rules 2026/27 (v3), verified by exact quote: self-declarations must
 * "state the apprentice or employer's details and describe what is being
 * confirmed" (353); the words shown are built by the database with your
 * answers filled in (preview_onboarding_statement) and are exactly what is
 * stored. Each confirmation is fingerprinted and chained (346–347).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import {
  PublicCard,
  PublicEyebrow,
  PublicH1,
  PublicLead,
  PublicPageShell,
  PUBLIC_PRIMARY_CTA,
} from '@/components/public/PublicPageShell';
import {
  getOnboardingForLink,
  ID_DOCUMENT_TYPES,
  previewOnboardingStatement,
  submitOnboardingStep,
  uploadOnboardingId,
  type LinkStep,
  type LinkView,
  type OnbKey,
} from '@/hooks/useOnboarding';
import { cn } from '@/lib/utils';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  '[color-scheme:dark] touch-manipulation';
const labelCn = 'mb-1 block text-[13px] font-medium text-white';
const chipCls = (on: boolean) =>
  cn(
    'min-h-11 rounded-2xl border px-3.5 py-2 text-left text-[14px] leading-snug touch-manipulation transition-colors',
    on
      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
      : 'border-white/[0.15] bg-white/[0.06] font-medium text-white'
  );

const fmtDate = (iso: string | null | undefined) =>
  iso
    ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'not set';

const STEP_LEAD: Partial<Record<OnbKey, string>> = {
  eligibility: 'Confirm nothing stops this apprenticeship being funded.',
  residency: 'Say which residency statement describes you.',
  id_rtw: 'A photo or PDF of your passport or right-to-work document.',
  employer_eligibility: 'The employment, PAYE, working hours in England and line manager.',
  agreement: 'Read the agreement between the employer and the apprentice, then sign it.',
  contract_for_services: 'The reference of your contract with the college.',
};

function Agree({
  on,
  onToggle,
  children,
}: {
  on: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      data-testid="onb-agree"
      className={cn(
        'flex min-h-11 w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left touch-manipulation',
        on ? 'border-elec-yellow' : 'border-white/[0.15]'
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[13px] font-bold',
          on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
        )}
      >
        {on ? '✓' : ''}
      </span>
      <span className="text-[14px] leading-relaxed text-white">{children}</span>
    </button>
  );
}

export default function OnboardingStartPage() {
  const { token } = useParams<{ token: string }>();
  const [v, setV] = useState<LinkView | null>(null);
  const [loading, setLoading] = useState(true);
  const [openKey, setOpenKey] = useState<OnbKey | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    try {
      const view = await getOnboardingForLink(token);
      setV(view);
      setOpenKey((cur) => {
        if (cur && view.steps?.find((s) => s.key === cur && !s.done)) return cur;
        return view.steps?.find((s) => !s.done && s.open)?.key ?? null;
      });
    } catch {
      setV({ error: 'This link is not valid.' } as LinkView);
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return (
      <PublicPageShell>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        </div>
      </PublicPageShell>
    );
  }
  if (!v || v.error || !token) {
    return (
      <PublicPageShell>
        <PublicEyebrow>Apprenticeship onboarding</PublicEyebrow>
        <PublicH1>This link is not valid</PublicH1>
        <PublicLead>Ask the college to send the link again.</PublicLead>
      </PublicPageShell>
    );
  }

  const d = v.details;
  const isLearner = v.role === 'apprentice';
  const mustSignIn = isLearner && v.needs_sign_in && !v.signed_in_as_learner;
  const done = v.steps.filter((s) => s.done).length;
  const allDone = done === v.steps.length;

  return (
    <PublicPageShell>
      <PublicEyebrow>{isLearner ? 'Before you start' : 'Apprentice onboarding'}</PublicEyebrow>
      <PublicH1>
        {isLearner ? `${d.learner}, ready to start` : `${d.learner}'s apprenticeship`}
      </PublicH1>
      <PublicLead>
        {allDone
          ? `All ${v.steps.length} of your steps are done. ${d.college ?? 'The college'} has what it needs from you.`
          : `${done} of ${v.steps.length} done. ${
              isLearner
                ? `${d.college ?? 'Your college'} needs these before you start with ${d.employer ?? 'your employer'}.`
                : `${d.college ?? 'The college'} needs these from ${d.employer ?? 'you'} before ${d.learner} starts. No account needed.`
            }`}
      </PublicLead>

      {mustSignIn ? (
        <PublicCard className="mt-8">
          <p className="text-[15px] leading-relaxed text-white">
            Sign in to Elec-Mate as {d.learner} to continue.
          </p>
          <Link
            to="/auth/signin"
            state={{ from: { pathname: `/start/${token}` } }}
            className={`${PUBLIC_PRIMARY_CTA} mt-4`}
          >
            Sign in
          </Link>
        </PublicCard>
      ) : (
        <ol className="mt-8 space-y-3" data-testid="onb-steps">
          {v.steps.map((s, i) => (
            <li key={s.key}>
              <StepCard
                n={i + 1}
                step={s}
                open={openKey === s.key}
                onOpen={() => setOpenKey(openKey === s.key ? null : s.key)}
                token={token}
                view={v}
                onDone={() => void load()}
              />
            </li>
          ))}
        </ol>
      )}

      <p className="mt-8 text-[13px] leading-relaxed text-white">
        What you confirm is recorded with your name, the time and a fingerprint that shows it has
        not been changed since (apprenticeship funding rules 2026/27, paras 346 and 347). Questions?
        Contact {d.college ?? 'the college'}.
      </p>
    </PublicPageShell>
  );
}

function StepCard({
  n,
  step,
  open,
  onOpen,
  token,
  view,
  onDone,
}: {
  n: number;
  step: LinkStep;
  open: boolean;
  onOpen: () => void;
  token: string;
  view: LinkView;
  onDone: () => void;
}) {
  const waitingForCollege = !step.open;
  return (
    <PublicCard className="p-0 sm:p-0">
      <button
        type="button"
        onClick={onOpen}
        disabled={step.done || waitingForCollege}
        className="flex min-h-[64px] w-full items-center gap-3 px-5 py-4 text-left touch-manipulation sm:px-6"
        data-testid={`onb-step-${step.key}`}
        data-done={step.done ? 'yes' : 'no'}
      >
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[14px] font-bold',
            step.done ? 'border-emerald-400 text-emerald-300' : 'border-white/[0.3] text-white'
          )}
        >
          {step.done ? '✓' : n}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[16px] font-semibold text-white">{step.title}</span>
          <span className="block text-[13px] leading-snug text-white">
            {step.done
              ? 'Done'
              : waitingForCollege
                ? 'The college is preparing this. Come back to this link.'
                : STEP_LEAD[step.key]}
          </span>
        </span>
      </button>
      {open && !step.done && !waitingForCollege && (
        <div className="border-t border-white/[0.1] px-5 pb-5 pt-4 sm:px-6">
          <StepForm stepKey={step.key} token={token} view={view} onDone={onDone} />
          {step.para && (
            <p className="mt-4 text-[12px] text-white">Funding rules 2026/27, para {step.para}</p>
          )}
        </div>
      )}
    </PublicCard>
  );
}

function StepForm({
  stepKey,
  token,
  view,
  onDone,
}: {
  stepKey: OnbKey;
  token: string;
  view: LinkView;
  onDone: () => void;
}) {
  const d = view.details;
  const employer = view.role === 'employer';
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(employer ? (d.employer ?? '') : '');
  const [dob, setDob] = useState('');
  const [category, setCategory] = useState('');
  const [lineManager, setLineManager] = useState('');
  const [reference, setReference] = useState('');
  const [signedOn, setSignedOn] = useState('');
  const [docType, setDocType] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [agree, setAgree] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const item = stepKey === 'id_rtw' ? 'id_upload' : stepKey;
  const answers = useMemo(() => {
    const a: Record<string, unknown> = { signer_name: name.trim() };
    if (employer) {
      a.signer_title = title.trim() || null;
      a.signer_company = company.trim() || null;
    }
    if (stepKey === 'eligibility' || stepKey === 'residency') {
      if (dob) a.date_of_birth = dob;
    }
    if (stepKey === 'residency') a.category = category || null;
    if (stepKey === 'employer_eligibility') a.line_manager = lineManager.trim();
    if (stepKey === 'contract_for_services') {
      a.reference = reference.trim();
      a.signed_on = signedOn || null;
    }
    if (stepKey === 'id_rtw') a.document_type = docType;
    return a;
  }, [
    name,
    title,
    company,
    dob,
    category,
    lineManager,
    reference,
    signedOn,
    docType,
    employer,
    stepKey,
  ]);

  // The exact words, from the database, with the answers filled in.
  useEffect(() => {
    if (stepKey === 'residency' && !category) {
      setPreview(null);
      return;
    }
    const t = window.setTimeout(() => {
      void previewOnboardingStatement(token, item, {
        ...answers,
        signer_name: (answers.signer_name as string) || '[your name]',
      })
        .then(setPreview)
        .catch(() => setPreview(null));
    }, 250);
    return () => window.clearTimeout(t);
  }, [answers, token, item, stepKey, category]);

  const needs = (() => {
    if (name.trim().length < 2) return 'Type your full name.';
    if (employer && company.trim().length < 2) return 'Give the company name.';
    if (stepKey === 'residency' && !category) return 'Choose the statement that describes you.';
    if (stepKey === 'employer_eligibility' && lineManager.trim().length < 2)
      return 'Name the line manager.';
    if (stepKey === 'contract_for_services' && (reference.trim().length < 2 || !signedOn))
      return 'Give the contract reference and the date it was signed.';
    if (stepKey === 'id_rtw' && (!docType || !file)) return 'Choose the document and the file.';
    if (stepKey !== 'id_rtw' && !agree) return 'Tick to confirm.';
    return null;
  })();

  const submit = async () => {
    if (needs || saving) return;
    setSaving(true);
    setError(null);
    try {
      if (stepKey === 'id_rtw' && file) {
        await uploadOnboardingId({ token, file, documentType: docType, signerName: name.trim() });
      } else {
        const r = await submitOnboardingStep(token, item, answers);
        if (!r?.ok) throw new Error(r?.error ?? 'Could not save. Try again.');
      }
      onDone();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const ag = view.agreement?.content;

  return (
    <div className="space-y-5" data-testid={`onb-form-${stepKey}`}>
      {stepKey === 'agreement' && ag && (
        <dl
          className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.12] px-4"
          data-testid="onb-agreement"
        >
          {[
            ['Apprentice', ag.apprentice_name],
            ['Place of work', ag.place_of_work],
            ['Apprenticeship', `${ag.standard ?? ''}${ag.level ? `, level ${ag.level}` : ''}`],
            [
              'Apprenticeship dates, including assessment',
              `${fmtDate(ag.start_date)} to ${fmtDate(ag.end_date)}`,
            ],
            [
              'Practical period',
              `${fmtDate(ag.practical_start)} to ${fmtDate(ag.practical_end)}${ag.practical_duration_months ? ` (${ag.practical_duration_months} months)` : ''}`,
            ],
            ['Off-the-job training', ag.otj_hours ? `${ag.otj_hours} hours` : ''],
          ].map(([k, val]) => (
            <div
              key={k}
              className="grid grid-cols-1 gap-0.5 py-2.5 sm:grid-cols-[14rem_1fr] sm:gap-4"
            >
              <dt className="text-[13px] font-medium text-white">{k}</dt>
              <dd className="text-[15px] leading-relaxed text-white">{val || 'Not given'}</dd>
            </div>
          ))}
          <div className="py-2.5">
            <p className="break-all font-mono text-[12px] text-white">
              Version {view.agreement?.version} · fingerprint {view.agreement?.hash}
            </p>
          </div>
        </dl>
      )}

      {stepKey === 'residency' && (
        <div className="space-y-2" role="radiogroup" aria-label="Residency statement">
          {(['uk_3yrs', 'non_uk_3yrs', 'euss', 'other'] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={category === k}
              className={cn(chipCls(category === k), 'w-full')}
              onClick={() => setCategory(k)}
              data-testid={`onb-residency-${k}`}
            >
              {view.statements.residency[k]}
            </button>
          ))}
        </div>
      )}

      {stepKey === 'id_rtw' && (
        <>
          <div>
            <span className={labelCn}>Which document</span>
            <div className="flex flex-wrap gap-2">
              {ID_DOCUMENT_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={chipCls(docType === t)}
                  onClick={() => setDocType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className={labelCn}>Photo or PDF, up to 10 MB</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
              capture="environment"
              className="sr-only"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              data-testid="onb-file"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex min-h-11 w-full items-center justify-center rounded-2xl border border-white/[0.22] px-4 text-[15px] font-semibold text-white touch-manipulation"
            >
              {file ? file.name : 'Take a photo or choose a file'}
            </button>
            <p className="mt-2 text-[13px] leading-relaxed text-white">
              Only your college's staff can see it. Your college will still check the original.
            </p>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelCn}>Your full name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCn}
            autoComplete="name"
            data-testid="onb-name"
          />
        </label>
        {(stepKey === 'eligibility' || stepKey === 'residency') && !d.has_date_of_birth && (
          <label className="block">
            <span className={labelCn}>Date of birth</span>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={inputCn}
            />
          </label>
        )}
        {employer && (
          <>
            <label className="block">
              <span className={labelCn}>Your job title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputCn}
                placeholder="e.g. Director"
                data-testid="onb-title"
              />
            </label>
            <label className="block">
              <span className={labelCn}>Company</span>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputCn}
                autoComplete="organization"
              />
            </label>
          </>
        )}
        {stepKey === 'employer_eligibility' && (
          <label className="block">
            <span className={labelCn}>The apprentice's line manager</span>
            <input
              value={lineManager}
              onChange={(e) => setLineManager(e.target.value)}
              className={inputCn}
              data-testid="onb-line-manager"
            />
          </label>
        )}
        {stepKey === 'contract_for_services' && (
          <>
            <label className="block">
              <span className={labelCn}>Contract reference</span>
              <input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className={inputCn}
                data-testid="onb-reference"
              />
            </label>
            <label className="block">
              <span className={labelCn}>Date signed by both parties</span>
              <input
                type="date"
                value={signedOn}
                onChange={(e) => setSignedOn(e.target.value)}
                className={inputCn}
                data-testid="onb-signed-on"
              />
            </label>
          </>
        )}
      </div>

      {preview && (
        <div
          className="rounded-2xl border border-white/[0.15] px-4 py-3"
          data-testid="onb-statement"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
            {stepKey === 'id_rtw' ? 'What is recorded' : 'What you are confirming'}
          </p>
          <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-white">
            {preview}
          </p>
        </div>
      )}

      {stepKey !== 'id_rtw' && (
        <Agree on={agree} onToggle={() => setAgree((a) => !a)}>
          {stepKey === 'agreement'
            ? 'I have read the agreement and I sign it with my typed name.'
            : 'This is true, and I confirm it with my typed name. If any line is not true, do not confirm: tell the college.'}
        </Agree>
      )}

      {error && <p className="text-[14px] font-medium text-orange-300">{error}</p>}
      <button
        type="button"
        className={PUBLIC_PRIMARY_CTA}
        disabled={!!needs || saving}
        onClick={() => void submit()}
        data-testid="onb-submit"
      >
        {saving
          ? 'Saving…'
          : (needs ??
            (stepKey === 'agreement'
              ? 'Sign the agreement'
              : stepKey === 'id_rtw'
                ? 'Upload'
                : 'Confirm'))}
      </button>
    </div>
  );
}
