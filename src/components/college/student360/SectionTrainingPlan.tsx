/**
 * SectionTrainingPlan — ELE-2039, 10 Oct 2026.
 *
 * The training plan as a structured record instead of an upload, built to
 * the Apprenticeship funding rules 2026/27 (v3), verified against the PDF:
 *   100      the contents (100.1 to 100.14); the builder lists what is missing;
 *   99.1.1   signed by all three by the end of the 42-day qualifying period;
 *   99.4     the provider is a signatory;
 *   103.4.1  a new version is re-signed when content, the end date or
 *            re-planned hours change;
 *   346–347  irrefutable e-signatures: the content is frozen and hashed when
 *            issued, each signature binds that hash and chains to the one
 *            before, nothing can be edited or deleted, and every version is
 *            kept with the dates it was in force;
 *   101      at the end all three agree the plan was delivered (2026/27 starts);
 *   89       the planned hours on the plan in force become the ILR planned
 *            hours (HRS1).
 */
import { useEffect, useMemo, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import {
  chipCn,
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegeHeading,
} from '@/components/college/ui/CollegeUi';
import {
  discardTrainingPlanDraft,
  getTrainingPlanLinks,
  issueTrainingPlan,
  planSignLink,
  requestTrainingPlanDelivered,
  ROLE_LABEL,
  saveTrainingPlanDraft,
  signTrainingPlanAsProvider,
  useTrainingPlans,
  verifyTrainingPlan,
  type EmStatus,
  type PlanPurpose,
  type PlanRole,
  type TrainingPlanContent,
  type TrainingPlanVersion,
  type TrainingRow,
} from '@/hooks/useTrainingPlans';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const fmtDate = (d: string | null | undefined) =>
  d
    ? new Date(d.length === 10 ? `${d}T12:00:00` : d).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

const ROLES: PlanRole[] = ['apprentice', 'employer', 'provider'];
const STATUS_LABEL: Record<string, string> = {
  draft: 'Draft',
  awaiting_signatures: 'Waiting for signatures',
  in_force: 'In force',
  superseded: 'Replaced',
  withdrawn: 'Withdrawn',
};

export function SectionTrainingPlan({
  studentId,
  studentName,
  startDate,
}: {
  studentId: string;
  studentName: string;
  startDate?: string | null;
}) {
  const first = studentName.split(' ')[0] || 'the learner';
  const { data, loading, error, refresh, inForce, waiting, draft } = useTrainingPlans(studentId);
  const [builder, setBuilder] = useState(false);
  const [signFor, setSignFor] = useState<null | {
    plan: TrainingPlanVersion;
    purpose: PlanPurpose;
  }>(null);
  const { toast } = useToast();
  const canEdit = !!data?.can_edit;
  const day42 = startDate
    ? new Date(new Date(`${startDate}T12:00:00`).getTime() + 42 * 86400000)
        .toISOString()
        .slice(0, 10)
    : null;

  const current = waiting ?? inForce;
  const history = (data?.versions ?? []).filter((v) => v.status !== 'draft');

  const copyLink = async (
    plan: TrainingPlanVersion,
    purpose: PlanPurpose,
    role: 'apprentice' | 'employer'
  ) => {
    try {
      const links = await getTrainingPlanLinks(plan.id);
      const l = links.find((x) => x.purpose === purpose && x.role === role);
      if (!l) throw new Error('No link for that person yet.');
      const url = planSignLink(l.token);
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        /* clipboard blocked: the toast still shows the link */
      }
      toast({ title: `${ROLE_LABEL[role]}'s signing link copied`, description: url });
    } catch (e) {
      toast({
        title: 'Could not get the link',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const verify = async (plan: TrainingPlanVersion) => {
    try {
      const r = await verifyTrainingPlan(plan.id);
      toast({
        title:
          r.content_unchanged && r.signatures_intact
            ? `Version ${plan.version} is unaltered since signing`
            : `Version ${plan.version} does not match its signatures`,
        description: r.content_hash ? `Fingerprint ${r.content_hash.slice(0, 16)}…` : undefined,
        variant: r.content_unchanged && r.signatures_intact ? undefined : 'destructive',
      });
    } catch (e) {
      toast({ title: 'Check failed', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const askDelivered = async (plan: TrainingPlanVersion) => {
    try {
      await requestTrainingPlanDelivered(plan.id);
      await refresh();
      toast({ title: 'Ready for the three to agree it was delivered' });
    } catch (e) {
      toast({
        title: 'Could not start it',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const sentence = (() => {
    if (loading) return 'Loading the plan…';
    if (error) return error;
    if (waiting) {
      const left = ROLES.filter(
        (r) => !waiting.signatures.some((g) => g.purpose === 'plan' && g.role === r)
      ).map((r) => ROLE_LABEL[r].toLowerCase());
      return `Version ${waiting.version} is waiting for ${left.join(', ')}${inForce ? `. Version ${inForce.version} stays in force until then.` : '.'}`;
    }
    if (inForce)
      return `Version ${inForce.version} in force since ${fmtDate(inForce.in_force_from)}, signed by all three. ${Math.round(inForce.planned_otj_hours ?? 0)} planned off-the-job hours.`;
    if (draft) return `A draft (version ${draft.version}) is started but not issued.`;
    return day42
      ? `No plan built yet. It must be signed by all three by ${fmtDate(day42)} (day 42).`
      : 'No plan built yet.';
  })();

  return (
    <section id="training-plan" className="scroll-mt-20 space-y-3" data-testid="training-plan">
      <div>
        <CollegeHeading>Training plan</CollegeHeading>
        <p
          className="mt-1 text-[13px] leading-relaxed text-white"
          data-testid="training-plan-sentence"
        >
          {sentence}
        </p>
      </div>

      <div className={COLLEGE_CARD}>
        <div className="flex flex-wrap gap-2">
          {canEdit && (
            <button
              type="button"
              className={COLLEGE_BTN}
              onClick={() => setBuilder(true)}
              data-testid="training-plan-build"
            >
              {draft
                ? `Continue draft v${draft.version}`
                : inForce || waiting
                  ? 'Start a new version'
                  : 'Build the plan'}
            </button>
          )}
          {current && current.status === 'awaiting_signatures' && canEdit && (
            <>
              {!current.signatures.some((g) => g.purpose === 'plan' && g.role === 'provider') && (
                <button
                  type="button"
                  className={COLLEGE_BTN}
                  onClick={() => setSignFor({ plan: current, purpose: 'plan' })}
                  data-testid="training-plan-sign-provider"
                >
                  Sign for the college
                </button>
              )}
              <button
                type="button"
                className={COLLEGE_BTN}
                onClick={() => void copyLink(current, 'plan', 'apprentice')}
              >
                Copy apprentice link
              </button>
              <button
                type="button"
                className={COLLEGE_BTN}
                onClick={() => void copyLink(current, 'plan', 'employer')}
              >
                Copy employer link
              </button>
            </>
          )}
        </div>

        {current && (
          <div className="mt-5 border-t border-white/[0.1] pt-4">
            <h3 className="text-sm font-semibold text-white">
              Version {current.version} · {STATUS_LABEL[current.status]}
            </h3>
            <SignatureList plan={current} purpose="plan" />
          </div>
        )}

        {inForce && (
          <div
            className="mt-5 border-t border-white/[0.1] pt-4"
            data-testid="training-plan-delivered"
          >
            <h3 className="text-sm font-semibold text-white">Plan delivered (para 101)</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-white">
              {inForce.delivered_at
                ? `All three agreed the plan was delivered on ${fmtDate(inForce.delivered_at)}.`
                : inForce.delivered_requested_at
                  ? 'Waiting for all three to agree the content of the plan has been delivered.'
                  : `At the end of the programme, ${first}, the employer and the college agree the plan was delivered.`}
            </p>
            {inForce.delivered_requested_at && <SignatureList plan={inForce} purpose="delivered" />}
            {canEdit && !inForce.delivered_at && (
              <div className="mt-3 flex flex-wrap gap-2">
                {!inForce.delivered_requested_at ? (
                  <button
                    type="button"
                    className={COLLEGE_BTN}
                    onClick={() => void askDelivered(inForce)}
                    data-testid="training-plan-ask-delivered"
                  >
                    Ask all three to confirm
                  </button>
                ) : (
                  <>
                    {!inForce.signatures.some(
                      (g) => g.purpose === 'delivered' && g.role === 'provider'
                    ) && (
                      <button
                        type="button"
                        className={COLLEGE_BTN}
                        onClick={() => setSignFor({ plan: inForce, purpose: 'delivered' })}
                        data-testid="training-plan-delivered-sign"
                      >
                        Confirm for the college
                      </button>
                    )}
                    <button
                      type="button"
                      className={COLLEGE_BTN}
                      onClick={() => void copyLink(inForce, 'delivered', 'apprentice')}
                    >
                      Copy apprentice link
                    </button>
                    <button
                      type="button"
                      className={COLLEGE_BTN}
                      onClick={() => void copyLink(inForce, 'delivered', 'employer')}
                    >
                      Copy employer link
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-5 border-t border-white/[0.1] pt-4">
            <h3 className="text-sm font-semibold text-white">Versions</h3>
            <ul className="mt-2 divide-y divide-white/[0.06]" data-testid="training-plan-versions">
              {history.map((v) => (
                <li
                  key={v.id}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 text-[13px] text-white">
                    <span className="font-semibold">Version {v.version}</span> ·{' '}
                    {STATUS_LABEL[v.status]}
                    {v.in_force_from &&
                      ` · from ${fmtDate(v.in_force_from)}${v.superseded_at ? ` to ${fmtDate(v.superseded_at)}` : ''}`}
                    {v.change_reason && <span className="block">Changed: {v.change_reason}</span>}
                  </div>
                  {v.content_hash && (
                    <button
                      type="button"
                      className={cn(COLLEGE_BTN, 'shrink-0')}
                      onClick={() => void verify(v)}
                    >
                      Check unaltered
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {data && (
        <TrainingPlanBuilder
          open={builder}
          onOpenChange={setBuilder}
          studentId={studentId}
          first={first}
          start={draft?.content ?? inForce?.content ?? waiting?.content ?? data.prefill}
          draft={draft}
          needsReason={!!(inForce || waiting || history.length)}
          onDone={async (msg) => {
            await refresh();
            toast({ title: msg });
          }}
        />
      )}
      {signFor && (
        <ProviderSignSheet
          plan={signFor.plan}
          purpose={signFor.purpose}
          onClose={() => setSignFor(null)}
          onSigned={async () => {
            setSignFor(null);
            await refresh();
            toast({ title: 'Signed for the college' });
          }}
        />
      )}
    </section>
  );
}

function SignatureList({ plan, purpose }: { plan: TrainingPlanVersion; purpose: PlanPurpose }) {
  return (
    <ul className="mt-2 space-y-2">
      {ROLES.map((r) => {
        const g = plan.signatures.find((x) => x.purpose === purpose && x.role === r);
        return (
          <li
            key={r}
            className="flex flex-wrap items-baseline justify-between gap-2 text-[13px] text-white"
          >
            <span className="font-semibold">{ROLE_LABEL[r]}</span>
            <span className="min-w-0 text-right">
              {g
                ? `${g.signer_name}${g.signer_title ? `, ${g.signer_title}` : ''} · ${fmtDate(g.signed_at)} · ${
                    g.method === 'signed_in' ? 'signed in' : 'personal link'
                  } · ${g.signature_hash.slice(0, 10)}`
                : 'Not signed yet'}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function ProviderSignSheet({
  plan,
  purpose,
  onClose,
  onSigned,
}: {
  plan: TrainingPlanVersion;
  purpose: PlanPurpose;
  onClose: () => void;
  onSigned: () => void;
}) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const sign = async () => {
    setBusy(true);
    setErr(null);
    try {
      const r = await signTrainingPlanAsProvider(plan.id, purpose, name, title || null);
      if (r.error) setErr(r.error);
      else onSigned();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      eyebrow="Training plan"
      title={
        purpose === 'plan'
          ? `Sign version ${plan.version} for the college`
          : 'Confirm the plan was delivered'
      }
      description={
        purpose === 'plan'
          ? 'Your signature is bound to this exact version. Any later change needs a new version and new signatures.'
          : 'At the end of the programme the college, employer and apprentice agree the content of the plan has been delivered (para 101).'
      }
      footer={
        <div className="flex justify-end gap-2">
          <button type="button" className={COLLEGE_BTN} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={COLLEGE_BTN_PRIMARY}
            disabled={busy || name.trim().length < 2 || !agree}
            onClick={() => void sign()}
            data-testid="provider-sign-submit"
          >
            {busy ? 'Signing…' : 'Sign'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <label className="block">
            <span className={labelCn}>Your full name</span>
            <input
              className={inputCn}
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="provider-sign-name"
            />
          </label>
          <label className="block">
            <span className={labelCn}>Your role</span>
            <input
              className={inputCn}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Apprenticeship tutor"
            />
          </label>
        </div>
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setAgree((v) => !v)}
            aria-pressed={agree}
            data-testid="provider-sign-agree"
            className={cn(
              'flex w-full items-start gap-3 rounded-xl border p-4 text-left text-[13.5px] leading-snug text-white touch-manipulation',
              agree ? 'border-elec-yellow' : 'border-white/[0.15]'
            )}
          >
            <span
              className={cn(
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold',
                agree ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
              )}
            >
              {agree ? '✓' : ''}
            </span>
            {purpose === 'plan'
              ? 'On behalf of the provider, I agree this training plan with the apprentice and the employer.'
              : 'I agree that the content of this training plan has been delivered.'}
          </button>
          {plan.content_hash && (
            <p className="text-[12px] text-white">
              Version fingerprint {plan.content_hash.slice(0, 24)}…
            </p>
          )}
          {err && <p className="text-[12.5px] font-medium text-orange-300">{err}</p>}
        </div>
      </div>
    </FormSheet>
  );
}

/* ── The builder ───────────────────────────────────────────────────── */

const STEPS = [
  'People and programme',
  'Training and hours',
  'Starting point',
  'Reviews and agreement',
];
const EM_OPTIONS: Array<{ v: EmStatus; label: string }> = [
  { v: 'achieved', label: 'Already achieved' },
  { v: 'exempt', label: 'Exempt' },
  { v: 'to_deliver', label: 'To be delivered' },
];
const DELIVERY = [
  'Day release',
  'Block release',
  'Front-loaded',
  'Roll-on roll-off',
  'Workplace-based',
];
const blankRow = (): TrainingRow => ({ content: '', hours: null, in_otj: true, when: '', who: '' });

function TrainingPlanBuilder({
  open,
  onOpenChange,
  studentId,
  first,
  start,
  draft,
  needsReason,
  onDone,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  studentId: string;
  first: string;
  start: TrainingPlanContent;
  draft: TrainingPlanVersion | null;
  needsReason: boolean;
  onDone: (msg: string) => Promise<void>;
}) {
  const [c, setC] = useState<TrainingPlanContent>(start);
  const [step, setStep] = useState(0);
  const [reason, setReason] = useState('');
  const [missing, setMissing] = useState<string[]>(draft?.missing ?? []);
  const [busy, setBusy] = useState<null | 'save' | 'issue' | 'discard'>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setC({
      ...start,
      occupational_training: start.occupational_training?.length
        ? start.occupational_training
        : [blankRow()],
    });
    setReason(draft?.change_reason ?? '');
    setMissing(draft?.missing ?? []);
    setStep(0);
    setErr(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = <K extends keyof TrainingPlanContent>(k: K, v: TrainingPlanContent[K]) =>
    setC((p) => ({ ...p, [k]: v }));
  const otjRowHours = useMemo(
    () =>
      (c.occupational_training ?? [])
        .filter((r) => r.in_otj)
        .reduce((a, r) => a + (Number(r.hours) || 0), 0),
    [c.occupational_training]
  );

  const save = async (): Promise<string | null> => {
    const clean: TrainingPlanContent = {
      ...c,
      occupational_training: (c.occupational_training ?? []).filter(
        (r) => r.content.trim() || r.when.trim() || r.who.trim()
      ),
    };
    const r = await saveTrainingPlanDraft(studentId, clean, needsReason ? reason : reason || null);
    setMissing(r.missing ?? []);
    return r.id;
  };

  const onSave = async () => {
    setBusy('save');
    setErr(null);
    try {
      await save();
      await onDone('Draft saved');
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const onIssue = async () => {
    setBusy('issue');
    setErr(null);
    try {
      const id = await save();
      if (!id) return;
      const r = await issueTrainingPlan(id);
      if (r.error) {
        setMissing(r.missing ?? []);
        setErr(r.error);
        await onDone('Draft saved');
        return;
      }
      onOpenChange(false);
      await onDone('Issued for signature');
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const onDiscard = async () => {
    if (!draft) return;
    setBusy('discard');
    try {
      await discardTrainingPlanDraft(draft.id);
      onOpenChange(false);
      await onDone('Draft discarded');
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const txt = (
    label: string,
    value: string | null | undefined,
    on: (v: string) => void,
    opts?: { type?: string; testid?: string; placeholder?: string }
  ) => (
    <label className="block">
      <span className={labelCn}>{label}</span>
      <input
        type={opts?.type ?? 'text'}
        className={inputCn}
        value={value ?? ''}
        onChange={(e) => on(e.target.value)}
        placeholder={opts?.placeholder}
        data-testid={opts?.testid}
      />
    </label>
  );
  const area = (
    label: string,
    value: string | null | undefined,
    on: (v: string) => void,
    testid?: string
  ) => (
    <label className="block">
      <span className={labelCn}>{label}</span>
      <textarea
        className={cn(textareaCn, 'min-h-[90px]')}
        value={value ?? ''}
        onChange={(e) => on(e.target.value)}
        data-testid={testid}
      />
    </label>
  );
  const tick = (on: boolean | null, label: string, toggle: () => void, testid?: string) => (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!!on}
      data-testid={testid}
      className={cn(
        'flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-[13px] leading-snug text-white touch-manipulation',
        on ? 'border-elec-yellow' : 'border-white/[0.15]'
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold',
          on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
        )}
      >
        {on ? '✓' : ''}
      </span>
      {label}
    </button>
  );

  const rows = c.occupational_training ?? [];
  const setRow = (i: number, patch: Partial<TrainingRow>) =>
    set(
      'occupational_training',
      rows.map((r, j) => (j === i ? { ...r, ...patch } : r))
    );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Training plan"
      title={`${first}'s training plan${draft ? `, draft v${draft.version}` : ''}`}
      description="Everything paragraph 100 of the funding rules asks for. Issue it when nothing is missing; all three then sign."
      subheader={
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 hide-scrollbar sm:mx-0 sm:px-0">
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              className={chipCn(step === i)}
              onClick={() => setStep(i)}
              data-testid={`tp-step-${i}`}
            >
              {i + 1}. {s}
            </button>
          ))}
        </div>
      }
      footer={
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {err && (
              <p className="text-[12.5px] font-medium text-orange-300" data-testid="tp-error">
                {err}
              </p>
            )}
            {draft && (
              <button
                type="button"
                className={COLLEGE_BTN}
                disabled={!!busy}
                onClick={() => void onDiscard()}
              >
                Discard draft
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className={COLLEGE_BTN}
              disabled={!!busy}
              onClick={() => void onSave()}
              data-testid="tp-save"
            >
              {busy === 'save' ? 'Saving…' : 'Save draft'}
            </button>
            <button
              type="button"
              className={COLLEGE_BTN_PRIMARY}
              disabled={!!busy || (needsReason && !reason.trim())}
              onClick={() => void onIssue()}
              data-testid="tp-issue"
            >
              {busy === 'issue' ? 'Issuing…' : 'Issue for signature'}
            </button>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          {step === 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {txt('Apprentice (100.1)', c.apprentice.name, (v) =>
                set('apprentice', { ...c.apprentice, name: v })
              )}
              {txt(
                'Job role (100.1)',
                c.apprentice.job_role,
                (v) => set('apprentice', { ...c.apprentice, job_role: v }),
                {
                  testid: 'tp-job-role',
                  placeholder: 'e.g. Apprentice electrician',
                }
              )}
              {txt(
                'Normal weekly paid hours, excluding overtime (100.1)',
                c.apprentice.weekly_hours != null ? String(c.apprentice.weekly_hours) : '',
                (v) => set('apprentice', { ...c.apprentice, weekly_hours: v ? Number(v) : null }),
                { type: 'number', testid: 'tp-weekly-hours' }
              )}
              {txt('Provider (100.2)', c.parties.provider, (v) =>
                set('parties', { ...c.parties, provider: v })
              )}
              {txt(
                'Employer (100.2)',
                c.parties.employer,
                (v) => set('parties', { ...c.parties, employer: v }),
                { testid: 'tp-employer' }
              )}
              {txt('Subcontractors, if any (100.2)', c.parties.subcontractors, (v) =>
                set('parties', { ...c.parties, subcontractors: v })
              )}
              {txt(
                'End-point assessment organisation (100.2.1)',
                c.parties.epao,
                (v) => set('parties', { ...c.parties, epao: v }),
                {
                  placeholder: 'Can be added later, no later than 6 months before the end',
                }
              )}
              {txt('Apprenticeship standard (100.4)', c.programme.standard, (v) =>
                set('programme', { ...c.programme, standard: v })
              )}
              {txt(
                'Level (100.4)',
                c.programme.level,
                (v) => set('programme', { ...c.programme, level: v }),
                { testid: 'tp-level' }
              )}
              {txt(
                'Apprenticeship starts (100.4)',
                c.programme.start_date,
                (v) => set('programme', { ...c.programme, start_date: v }),
                { type: 'date' }
              )}
              {txt(
                'Apprenticeship ends, including assessment (100.4)',
                c.programme.end_date,
                (v) => set('programme', { ...c.programme, end_date: v }),
                {
                  type: 'date',
                  testid: 'tp-end-date',
                }
              )}
              {txt(
                'Practical period starts (100.4)',
                c.programme.practical_start,
                (v) => set('programme', { ...c.programme, practical_start: v }),
                { type: 'date' }
              )}
              {txt(
                'Practical period ends (100.4)',
                c.programme.practical_end,
                (v) => set('programme', { ...c.programme, practical_end: v }),
                { type: 'date' }
              )}
              <div className="md:col-span-2">
                <span className={labelCn}>Delivery model (100.6)</span>
                <div className="flex flex-wrap gap-2">
                  {DELIVERY.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={chipCn(c.delivery_model === d)}
                      onClick={() => set('delivery_model', d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              {txt(
                'Total planned off-the-job hours (100.5). This becomes the ILR planned hours (HRS1).',
                c.planned_otj_hours != null ? String(c.planned_otj_hours) : '',
                (v) => set('planned_otj_hours', v ? Number(v) : null),
                { type: 'number', testid: 'tp-planned-hours' }
              )}
              <p className="text-[12.5px] text-white">
                Rows marked off-the-job add up to {Math.round(otjRowHours)} hours
                {c.planned_otj_hours ? ` of ${Math.round(c.planned_otj_hours)} planned` : ''}.
              </p>
              <div className="space-y-4">
                {rows.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/[0.12] p-4"
                    data-testid={`tp-row-${i}`}
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {txt(
                        'Training: KSBs, units or activity (100.7)',
                        r.content,
                        (v) => setRow(i, { content: v }),
                        { testid: `tp-row-${i}-content` }
                      )}
                      {txt('When (100.10)', r.when, (v) => setRow(i, { when: v }), {
                        testid: `tp-row-${i}-when`,
                        placeholder: 'e.g. Year 1, terms 1 to 3',
                      })}
                      {txt('Who delivers it (100.11)', r.who, (v) => setRow(i, { who: v }), {
                        testid: `tp-row-${i}-who`,
                        placeholder: 'College, employer or subcontractor',
                      })}
                      {txt(
                        'Hours',
                        r.hours != null ? String(r.hours) : '',
                        (v) => setRow(i, { hours: v ? Number(v) : null }),
                        { type: 'number' }
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-[12.5px] text-white">
                        Counts as off-the-job (100.7.1)
                      </span>
                      <button
                        type="button"
                        className={chipCn(r.in_otj === true)}
                        onClick={() => setRow(i, { in_otj: true })}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={chipCn(r.in_otj === false)}
                        onClick={() => setRow(i, { in_otj: false })}
                      >
                        No
                      </button>
                      {rows.length > 1 && (
                        <button
                          type="button"
                          className={cn(COLLEGE_BTN, 'ml-auto')}
                          onClick={() =>
                            set(
                              'occupational_training',
                              rows.filter((_, j) => j !== i)
                            )
                          }
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className={COLLEGE_BTN}
                  onClick={() => set('occupational_training', [...rows, blankRow()])}
                >
                  Add a training row
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                {area(
                  'Summary of the initial assessment (100.3)',
                  c.initial_assessment_summary,
                  (v) => set('initial_assessment_summary', v),
                  'tp-ia'
                )}
              </div>
              {(['english', 'maths'] as const).map((s) => (
                <div key={s}>
                  <span className={labelCn}>{s === 'english' ? 'English' : 'Maths'} (100.8)</span>
                  <div className="flex flex-wrap gap-2">
                    {EM_OPTIONS.map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        className={chipCn(c.english_maths[s] === o.v)}
                        onClick={() => set('english_maths', { ...c.english_maths, [s]: o.v })}
                        data-testid={`tp-${s}-${o.v}`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {(c.english_maths.english === 'to_deliver' ||
                c.english_maths.maths === 'to_deliver') && (
                <div className="md:col-span-2">
                  {tick(
                    c.english_maths.not_in_otj,
                    'English and maths qualifications are not included in the planned off-the-job hours (100.8.1).',
                    () =>
                      set('english_maths', {
                        ...c.english_maths,
                        not_in_otj: !c.english_maths.not_in_otj,
                      })
                  )}
                </div>
              )}
              <div className="md:col-span-2 space-y-3">
                <span className={labelCn}>Prior learning (100.9)</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={chipCn(
                      c.prior_learning.recorded === true && !c.prior_learning.hours_reduced
                    )}
                    onClick={() =>
                      set('prior_learning', {
                        ...c.prior_learning,
                        recorded: true,
                        hours_reduced: 0,
                      })
                    }
                    data-testid="tp-rpl-none"
                  >
                    None found
                  </button>
                  <button
                    type="button"
                    className={chipCn(
                      c.prior_learning.recorded === true && c.prior_learning.hours_reduced > 0
                    )}
                    onClick={() => set('prior_learning', { ...c.prior_learning, recorded: true })}
                  >
                    Content left out
                  </button>
                </div>
                {area('What was found and left out of the plan', c.prior_learning.summary, (v) =>
                  set('prior_learning', { ...c.prior_learning, summary: v })
                )}
              </div>
              <div className="md:col-span-2">
                {area('Learning support and adjustments', c.support, (v) => set('support', v))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {txt(
                'Progress reviews every (months) (100.13)',
                c.reviews.frequency_months != null ? String(c.reviews.frequency_months) : '',
                (v) => set('reviews', { ...c.reviews, frequency_months: v ? Number(v) : null }),
                { type: 'number' }
              )}
              {txt('Review format (100.13)', c.reviews.format, (v) =>
                set('reviews', { ...c.reviews, format: v })
              )}
              <div className="md:col-span-2">
                {area(
                  'Queries and complaints, with the escalation route (100.14)',
                  c.complaints,
                  (v) => set('complaints', v)
                )}
              </div>
              <div className="md:col-span-2">
                {tick(
                  c.employer_otj_confirmation,
                  'The employer confirms in writing that the apprentice will do their off-the-job training, and any English and maths, within their normal working hours (100.12). The employer confirms this again when they sign.',
                  () => set('employer_otj_confirmation', !c.employer_otj_confirmation),
                  'tp-employer-confirm'
                )}
              </div>
              {needsReason && (
                <div className="md:col-span-2">
                  {area('What changed in this version (103.4.1) *', reason, setReason, 'tp-reason')}
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="space-y-3" data-testid="tp-missing">
          <h3 className="text-sm font-semibold text-white">Still needed</h3>
          {missing.length === 0 ? (
            <p className="text-[13px] text-white">
              {draft
                ? 'Nothing missing at the last save.'
                : 'Save the draft to check it against paragraph 100.'}
            </p>
          ) : (
            <ul className="space-y-1.5 text-[13px] text-white">
              {missing.map((m) => (
                <li key={m} className="leading-snug">
                  {m}
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </FormSheet>
  );
}
