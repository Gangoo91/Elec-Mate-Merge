/**
 * SectionOnboarding — ELE-2088, 10 Oct 2026.
 *
 * "Ready to start": one checklist per learner, each item with its status, who
 * confirmed or signed it, and the 2026/27 funding-rule paragraph (verified by
 * exact quote; mapped in college_funding_rule_refs):
 *   eligibility and residency self-declarations (29, 30, 34, 345.2, 353; Annex A),
 *   ID and right to work seen by the college (evidence box after 34; 354),
 *   the employer's confirmation of employment (24, 30.5, 69, 71.2),
 *   the apprenticeship agreement signed by both (70–72; 99.4),
 *   the contract for services (208, 208.1),
 *   and, from Student 360, the initial assessment, prior learning and the
 *   training plan (ELE-2039/2042).
 * The learner and the employer complete their parts on /start/:token. Every
 * confirmation is hash-chained (346–347) and lands in the evidence pack.
 */
import { useEffect, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import {
  chipCn,
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegeHeading,
} from '@/components/college/ui/CollegeUi';
import {
  confirmOnboardingIdSeen,
  ID_DOCUMENT_TYPES,
  onboardingLink,
  RESIDENCY_LABEL,
  saveOnboardingAgreement,
  startOnboarding,
  useOnboarding,
  verifyOnboarding,
  type AgreementContent,
  type OnboardingData,
  type OnbItem,
  type OnbStatus,
} from '@/hooks/useOnboarding';
import { openEvidenceFile } from '@/hooks/useEvidencePack';
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

const STATUS: Record<OnbStatus, { label: string; cls: string }> = {
  done: { label: 'Done', cls: 'border-emerald-400/40 text-emerald-300' },
  due: { label: 'Signing by day 42', cls: 'border-white/[0.2] text-white' },
  waiting: { label: 'Waiting', cls: 'border-orange-500/40 text-orange-300' },
  to_check: { label: 'To check', cls: 'border-orange-500/40 text-orange-300' },
  to_do: { label: 'To do', cls: 'border-orange-500/40 text-orange-300' },
};

const ROLE_WORD: Record<string, string> = {
  apprentice: 'apprentice',
  employer: 'employer',
  provider: 'college',
};

function scrollToAnchor(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function whoLine(item: OnbItem): string {
  if (item.key === 'agreement' && item.signatures && item.signatures.length > 0) {
    const signed = item.signatures
      .map((s) => `${s.signer_name} (${ROLE_WORD[s.role]}, ${fmtDate(s.signed_at)})`)
      .join(' and ');
    return item.status === 'done'
      ? `Version ${item.version} signed by ${signed}`
      : `Signed by ${signed}. Waiting on ${item.waiting_on}.`;
  }
  if (item.record) {
    const r = item.record;
    const extra = [
      r.category ? RESIDENCY_LABEL[r.category] : null,
      r.document_type,
      r.line_manager ? `line manager ${r.line_manager}` : null,
      r.reference ? `contract ref ${r.reference}` : null,
    ]
      .filter(Boolean)
      .join(' · ');
    return `${item.key === 'id_rtw' ? 'Seen by' : 'Confirmed by'} ${r.signer_name}${
      r.signer_company && r.role === 'employer' ? ` (${r.signer_company})` : ''
    } on ${fmtDate(r.signed_at)}, ${r.method === 'personal_link' ? 'by personal link' : 'signed in'}${
      extra ? ` · ${extra}` : ''
    }`;
  }
  if (item.detail)
    return item.waiting_on ? `${item.detail}. Waiting on ${item.waiting_on}.` : item.detail;
  if (item.key === 'id_rtw' && item.uploads && item.uploads.length > 0)
    return `${item.uploads.length} file${item.uploads.length > 1 ? 's' : ''} uploaded by the apprentice. Check them against the originals.`;
  return item.waiting_on ? `Waiting on ${item.waiting_on}.` : '';
}

export function SectionOnboarding({
  studentId,
  studentName,
}: {
  studentId: string;
  studentName: string;
}) {
  const first = studentName.split(' ')[0] || 'the learner';
  const { data, loading, refresh } = useOnboarding(studentId);
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const [agreementOpen, setAgreementOpen] = useState(false);
  const [idOpen, setIdOpen] = useState(false);

  const start = async () => {
    setBusy(true);
    try {
      await startOnboarding(studentId);
      await refresh();
      toast({
        title: 'Onboarding started',
        description: 'Copy the links for the learner and the employer.',
      });
    } catch (e) {
      toast({
        title: 'Could not start',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  const copy = async (role: 'apprentice' | 'employer') => {
    const token = data?.links?.[role];
    if (!token) return;
    const url = onboardingLink(token);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard blocked: the toast still shows the link */
    }
    toast({
      title: role === 'apprentice' ? `${first}'s link copied` : 'Employer link copied',
      description: url,
    });
  };

  const verify = async () => {
    try {
      const r = await verifyOnboarding(studentId);
      toast({
        title:
          r.signatures_intact && r.agreement_unchanged !== false
            ? 'Nothing has been altered'
            : 'A record does not match its fingerprint',
        description: `${r.records} confirmation${r.records === 1 ? '' : 's'} checked against the chain (para 347).`,
        variant: r.signatures_intact && r.agreement_unchanged !== false ? undefined : 'destructive',
      });
    } catch (e) {
      toast({
        title: 'Could not check',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const outstanding = (data?.items ?? []).filter((i) => i.status !== 'done' && i.status !== 'due');
  const sentence = !data?.started
    ? `Eligibility, ID, the apprenticeship agreement and the contract for services, confirmed and signed before ${first} starts.`
    : data.ready
      ? `${first} is ready to start: all ${data.total} items are done.`
      : `${data.done} of ${data.total} done. Waiting on ${outstanding.length} item${outstanding.length === 1 ? '' : 's'}.`;

  return (
    <section id="onboarding" className="scroll-mt-20 space-y-3" data-testid="onboarding-card">
      <div>
        <CollegeHeading>Ready to start</CollegeHeading>
        <p
          className="mt-1 text-[13px] leading-relaxed text-white"
          data-testid="onboarding-sentence"
        >
          {loading ? 'Loading…' : sentence}
        </p>
      </div>
      <div className={cn(COLLEGE_CARD, 'space-y-4')}>
        {loading ? (
          <div className="h-16 animate-pulse rounded-xl bg-white/[0.06]" />
        ) : !data?.started ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] leading-relaxed text-white">
              The learner confirms on their phone, the employer by a link with no account, and you
              check the ID here. Nine items, each with its funding rule.
            </p>
            {data?.can_edit && (
              <button
                type="button"
                className={cn(COLLEGE_BTN_PRIMARY, 'shrink-0')}
                disabled={busy}
                onClick={() => void start()}
                data-testid="onboarding-start"
              >
                {busy ? 'Starting…' : 'Start onboarding'}
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-[12px] font-semibold',
                    data.ready
                      ? 'border-emerald-400/40 text-emerald-300'
                      : 'border-orange-500/40 text-orange-300'
                  )}
                  data-testid="onboarding-ready"
                  data-ready={data.ready ? 'yes' : 'no'}
                >
                  {data.ready ? 'Ready to start' : 'Not ready'}
                </span>
                <span className="text-[12.5px] text-white">
                  Funding rules {data.rules_year ?? 'year not known'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {data.can_edit && data.links?.apprentice && (
                  <button
                    type="button"
                    className={COLLEGE_BTN}
                    onClick={() => void copy('apprentice')}
                    data-testid="onboarding-copy-learner"
                  >
                    Learner link
                  </button>
                )}
                {data.can_edit && data.links?.employer && (
                  <button
                    type="button"
                    className={COLLEGE_BTN}
                    onClick={() => void copy('employer')}
                    data-testid="onboarding-copy-employer"
                  >
                    Employer link
                  </button>
                )}
                <button type="button" className={COLLEGE_BTN} onClick={() => void verify()}>
                  Check fingerprints
                </button>
              </div>
            </div>

            <ul
              className="-mx-5 divide-y divide-white/[0.06] border-t border-white/[0.06] sm:-mx-6"
              data-testid="onboarding-items"
            >
              {data.items.map((item) => (
                <ItemRow
                  key={item.key}
                  item={item}
                  rulesYear={data.rules_year}
                  canEdit={data.can_edit}
                  onAgreement={() => setAgreementOpen(true)}
                  onCheckId={() => setIdOpen(true)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
      {data?.started && (
        <>
          <AgreementSheet
            open={agreementOpen}
            onOpenChange={setAgreementOpen}
            studentId={studentId}
            first={first}
            data={data}
            onSaved={() => void refresh()}
          />
          <IdSheet
            open={idOpen}
            onOpenChange={setIdOpen}
            studentId={studentId}
            first={first}
            item={data.items.find((i) => i.key === 'id_rtw') ?? null}
            residency={data.items.find((i) => i.key === 'residency') ?? null}
            onSaved={() => void refresh()}
          />
        </>
      )}
    </section>
  );
}

function ItemRow({
  item,
  rulesYear,
  canEdit,
  onAgreement,
  onCheckId,
}: {
  item: OnbItem;
  rulesYear: string | null;
  canEdit: boolean;
  onAgreement: () => void;
  onCheckId: () => void;
}) {
  const st = STATUS[item.status];
  const statement = item.record?.statement;
  const action =
    item.link && item.status !== 'done'
      ? { label: 'Open', run: () => scrollToAnchor(item.link as string) }
      : item.key === 'agreement' && canEdit
        ? {
            label: item.issued_at ? `Agreement v${item.version}` : 'Prepare agreement',
            run: onAgreement,
          }
        : item.key === 'id_rtw' && item.status !== 'done' && canEdit
          ? { label: 'Check ID', run: onCheckId }
          : null;
  return (
    <li
      className="px-5 py-3.5 sm:px-6"
      data-testid={`onboarding-item-${item.key}`}
      data-status={item.status}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[14.5px] font-semibold text-white">{item.title}</span>
            <span
              className={cn('rounded-full border px-2 py-0.5 text-[12px] font-semibold', st.cls)}
            >
              {st.label}
            </span>
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-white">{whoLine(item)}</p>
          <p className="mt-0.5 text-[12px] text-white" data-testid="onboarding-para">
            {item.para
              ? `Funding rules ${rulesYear ?? ''} para ${item.para}`
              : `Funding rules ${rulesYear ?? ''}: ${item.para_note ?? 'paragraph not checked'}`}
          </p>
          {statement && (
            <details className="mt-1">
              <summary className="flex min-h-11 cursor-pointer items-center text-[13px] font-semibold text-elec-yellow touch-manipulation">
                What was confirmed
              </summary>
              <p className="whitespace-pre-line text-[13px] leading-relaxed text-white">
                {statement}
              </p>
              <p className="mt-1 break-all font-mono text-[12px] text-white">
                Fingerprint {item.record?.signature_hash}
              </p>
            </details>
          )}
        </div>
        {action && (
          <button
            type="button"
            className={cn(COLLEGE_BTN, 'shrink-0')}
            onClick={action.run}
            data-testid={`onboarding-act-${item.key}`}
          >
            {action.label}
          </button>
        )}
      </div>
    </li>
  );
}

/* ── The apprenticeship agreement (para 72) ─────────────────────────── */

function AgreementSheet({
  open,
  onOpenChange,
  studentId,
  first,
  data,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  studentId: string;
  first: string;
  data: OnboardingData;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [c, setC] = useState<AgreementContent | null>(null);
  const [busy, setBusy] = useState(false);
  const [missing, setMissing] = useState<string[]>([]);
  const issued = !!data.agreement?.issued_at;
  const signed = (data.items.find((i) => i.key === 'agreement')?.signatures ?? []).length;

  useEffect(() => {
    if (!open) return;
    setC(data.agreement?.content ?? null);
    setMissing(data.agreement?.missing ?? []);
  }, [open, data.agreement]);

  const set = (k: keyof AgreementContent, v: string) =>
    setC((prev) => ({ ...(prev as AgreementContent), [k]: v === '' ? null : v }));

  const save = async (issue: boolean) => {
    if (!c) return;
    setBusy(true);
    try {
      const r = await saveOnboardingAgreement(studentId, c, issue);
      if (r.error) {
        setMissing(r.missing ?? []);
        toast({ title: 'Not issued', description: r.error, variant: 'destructive' });
        return;
      }
      onSaved();
      if (issue) {
        toast({
          title: `Agreement version ${r.version} issued`,
          description: 'The learner and the employer can now sign it from their links.',
        });
        onOpenChange(false);
      } else {
        setMissing(r.missing ?? []);
        toast({ title: 'Draft saved' });
      }
    } catch (e) {
      toast({ title: 'Could not save', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  const field = (
    k: keyof AgreementContent,
    label: string,
    type: 'text' | 'date' | 'number' = 'text',
    testid?: string
  ) => (
    <label className="block">
      <span className={labelCn}>{label}</span>
      <input
        type={type}
        inputMode={type === 'number' ? 'decimal' : undefined}
        className={inputCn}
        value={(c?.[k] as string | number | null | undefined) ?? ''}
        onChange={(e) => set(k, e.target.value)}
        data-testid={testid}
      />
    </label>
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Apprenticeship agreement"
      title={`${first}'s apprenticeship agreement`}
      description={
        issued
          ? `Version ${data.agreement?.version} was issued ${fmtDate(data.agreement?.issued_at)} and is frozen. ${signed} of 2 have signed. Issuing a new version keeps both (para 347).`
          : 'Between the employer and the apprentice; the college is not a signatory (para 99.4). It must include everything in para 72.'
      }
      footer={
        <div className="flex flex-wrap justify-end gap-2">
          <button type="button" className={COLLEGE_BTN} onClick={() => onOpenChange(false)}>
            Close
          </button>
          {!issued && (
            <button
              type="button"
              className={COLLEGE_BTN}
              disabled={busy}
              onClick={() => void save(false)}
            >
              Save draft
            </button>
          )}
          <button
            type="button"
            className={COLLEGE_BTN_PRIMARY}
            disabled={busy}
            onClick={() => void save(true)}
            data-testid="onboarding-agreement-issue"
          >
            {busy ? 'Saving…' : issued ? 'Issue a new version' : 'Issue for signature'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          {field('apprentice_name', "Apprentice's name (72.1)")}
          {field('place_of_work', 'Place of work (72.1)', 'text', 'onboarding-agreement-place')}
          {field(
            'standard',
            'Apprenticeship standard (72.2)',
            'text',
            'onboarding-agreement-standard'
          )}
          {field('level', 'Level (72.2)', 'text', 'onboarding-agreement-level')}
          {field(
            'otj_hours',
            'Off-the-job training hours (72.6)',
            'number',
            'onboarding-agreement-otj'
          )}
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {field('start_date', 'Apprenticeship starts (72.3)', 'date')}
            {field(
              'end_date',
              'Ends, including assessment (72.3)',
              'date',
              'onboarding-agreement-end'
            )}
            {field('practical_start', 'Practical period starts (72.4)', 'date')}
            {field('practical_end', 'Practical period ends (72.4)', 'date')}
          </div>
          <p className="text-[12.5px] leading-relaxed text-white">
            The practical period duration (72.5) is worked out from its dates when you issue it. The
            practical period start lines up with the ILR learning start date (72.4.3).
          </p>
          {missing.length > 0 && (
            <div
              className="rounded-xl border border-orange-500/40 px-3.5 py-3"
              data-testid="onboarding-agreement-missing"
            >
              <p className="text-[13px] font-semibold text-orange-300">Still needed</p>
              <ul className="mt-1 space-y-0.5">
                {missing.map((m) => (
                  <li key={m} className="text-[13px] text-white">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </FormSheet>
  );
}

/* ── The ID check (evidence box after para 34) ──────────────────────── */

function IdSheet({
  open,
  onOpenChange,
  studentId,
  first,
  item,
  residency,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  studentId: string;
  first: string;
  item: OnbItem | null;
  residency: OnbItem | null;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [docType, setDocType] = useState('');
  const [until, setUntil] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const uploads = item?.uploads ?? [];

  useEffect(() => {
    if (!open) return;
    setDocType(uploads[0]?.document_type ?? '');
    setUntil('');
    setName('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const openFile = async (path: string) => {
    try {
      window.open(await openEvidenceFile(path), '_blank', 'noopener');
    } catch (e) {
      toast({ title: 'Could not open', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const confirm = async () => {
    setBusy(true);
    try {
      const r = await confirmOnboardingIdSeen(
        studentId,
        docType,
        until || null,
        name.trim() || null
      );
      if (r.error) {
        toast({ title: 'Not recorded', description: r.error, variant: 'destructive' });
        return;
      }
      onSaved();
      onOpenChange(false);
      toast({
        title: 'ID check recorded',
        description: 'Filed in the evidence pack as identity and residency.',
      });
    } catch (e) {
      toast({
        title: 'Could not record',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="ID and right to work"
      title={`Check ${first}'s documents`}
      description="Confirm you have seen the identity documents or immigration permission, that they leave enough time to finish, and that residency is in line with Annex A (evidence box after para 34)."
      footer={
        <div className="flex justify-end gap-2">
          <button type="button" className={COLLEGE_BTN} onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button
            type="button"
            className={COLLEGE_BTN_PRIMARY}
            disabled={busy || docType.length < 2}
            onClick={() => void confirm()}
            data-testid="onboarding-id-confirm"
          >
            {busy ? 'Saving…' : 'I have seen the documents'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-[13px] font-semibold text-white">Uploaded by the apprentice</p>
          {uploads.length === 0 ? (
            <p className="text-[13px] leading-relaxed text-white">
              Nothing uploaded. You can still see the originals in person and record it here.
            </p>
          ) : (
            <ul className="space-y-2" data-testid="onboarding-id-uploads">
              {uploads.map((u) => (
                <li
                  key={u.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.12] px-3 py-2"
                >
                  <span className="min-w-0">
                    <span className="block line-clamp-2 text-[13px] font-semibold text-white">
                      {u.document_type}
                    </span>
                    <span className="block line-clamp-2 text-[12px] text-white">
                      {u.file_name} · {fmtDate(u.signed_at)}
                    </span>
                  </span>
                  <button
                    type="button"
                    className="h-11 shrink-0 rounded-lg px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                    onClick={() => void openFile(u.file_path)}
                  >
                    Open
                  </button>
                </li>
              ))}
            </ul>
          )}
          {residency?.record?.category && (
            <p className="text-[13px] leading-relaxed text-white">
              Residency declared: {RESIDENCY_LABEL[residency.record.category]}.
              {residency.record.category === 'other' &&
                ' Check which Annex A category applies (paras 366 to 375) before you confirm.'}
            </p>
          )}
          <p className="text-[12.5px] leading-relaxed text-white">
            Copies sit in the college's private evidence store, readable only by your staff. Only
            the document type is recorded, never its number.
          </p>
        </div>
        <div className="space-y-5">
          <div>
            <span className={labelCn}>Document seen</span>
            <div className="flex flex-wrap gap-2">
              {ID_DOCUMENT_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={chipCn(docType === t)}
                  onClick={() => setDocType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <label className="block">
            <span className={labelCn}>Permission to stay ends (if it has an end date)</span>
            <input
              type="date"
              className={inputCn}
              value={until}
              onChange={(e) => setUntil(e.target.value)}
            />
          </label>
          <label className="block">
            <span className={labelCn}>Your name (defaults to your profile name)</span>
            <input className={inputCn} value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
      </div>
    </FormSheet>
  );
}
