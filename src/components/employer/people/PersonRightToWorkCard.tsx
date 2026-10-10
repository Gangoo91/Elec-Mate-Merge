/**
 * Right to work on the person sheet (ELE-2061).
 *
 * Everyone who can open the sheet sees the status (Checked / Due / Missing).
 * Owner and admins see the check itself, the private copies, anything the
 * person sent from Worker Tools, and record a new check.
 */
import { useMemo, useRef, useState } from 'react';
import { addMonths, format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import FormSheet from '@/components/forms/FormSheet';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import {
  KeyValue,
  PlainEmpty,
  Row,
  RowList,
  StatusPill,
  rowBtnPrimary,
  rowBtnSecondary,
  rowsClass,
} from '@/components/employer/pageParts/PageParts';
import { Field, inputClass, textareaClass } from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  RTW_CHECK_TYPE_LABEL,
  RTW_STATUS_LABEL,
  RTW_STATUS_TONE,
  SHARE_CODE_RE,
  normaliseShareCode,
  openRtwEvidence,
  useDismissRtwSubmission,
  useRtwChecks,
  useRtwEngagement,
  useRtwStatusMap,
  useSetRtwEngagement,
  useRtwSubmissions,
  useSaveRtwCheck,
  type RtwCheckType,
  type RtwSubmission,
} from '@/hooks/useRightToWork';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chip = 'h-11 rounded-full border px-4 text-[13px] touch-manipulation';

const nice = (d: string | null | undefined) => (d ? format(parseISO(d), 'd MMM yyyy') : '');

export function PersonRightToWorkCard({
  person,
  canRecord,
}: {
  person: { id: string; name: string; teamRole?: string | null };
  canRecord: boolean;
}) {
  const { map, isLoading } = useRtwStatusMap();
  const st = map.get(person.id);
  const { data: checks = [] } = useRtwChecks(person.id, canRecord);
  const { data: subs = [] } = useRtwSubmissions(person.id, canRecord);
  const dismiss = useDismissRtwSubmission();
  const [recordOpen, setRecordOpen] = useState(false);
  const [fromSub, setFromSub] = useState<RtwSubmission | null>(null);
  const first = person.name.split(' ')[0] || 'They';
  const latest = checks[0];
  const waiting = subs.filter((s) => s.status === 'submitted');
  const isSub = person.teamRole === 'Subcontractor';
  // Gap 3C #32: a subcontractor engaged through their limited company is not
  // in the Right to Work Scheme (Home Office guide, Example 6). Read from the
  // trading name unless the owner or an admin has said otherwise.
  const { data: eng } = useRtwEngagement(person.id, canRecord && isSub);
  const setEng = useSetRtwEngagement();
  const viaCompany = isSub && eng?.engaged_as === 'company';
  const changeEngagement = (to: 'company' | 'individual') =>
    setEng.mutate(
      { rosterId: person.id, engagedAs: to },
      {
        onSuccess: () =>
          toast({
            title:
              to === 'company'
                ? 'Marked as a limited company'
                : `Marked as engaging ${first} directly`,
          }),
        onError: () => toast({ title: 'Not saved', variant: 'destructive' }),
      }
    );

  const status = st?.status ?? (isLoading ? undefined : 'missing');
  const meta = status ? (
    <StatusPill tone={RTW_STATUS_TONE[status]}>{RTW_STATUS_LABEL[status]}</StatusPill>
  ) : undefined;

  const open = async (path: string) => {
    try {
      await openRtwEvidence(path);
    } catch {
      toast({ title: 'Could not open the file', variant: 'destructive' });
    }
  };

  return (
    <section data-help="team.right-to-work">
      <PanelTitle
        title="Right to work"
        meta={meta}
        // The empty card carries its own Record a check button.
        action={canRecord && (latest || waiting.length > 0) ? 'Record a check' : undefined}
        onAction={
          canRecord && (latest || waiting.length > 0)
            ? () => {
                setFromSub(null);
                setRecordOpen(true);
              }
            : undefined
        }
      />
      {!canRecord ? (
        <PlainEmpty
          text={
            status === 'checked'
              ? `Checked${st?.checked_on ? ` on ${nice(st.checked_on)}` : ''}. The owner and admins hold the copies.`
              : status === 'not_required'
                ? `Not required${st?.reason ? `: ${st.reason}` : ''}.`
                : status === 'due'
                  ? `Follow-up check due ${nice(st?.follow_up_due)}. The owner or an admin records it.`
                  : `No valid check for ${first}. The owner or an admin records it.`
          }
        />
      ) : (
        <div className="space-y-3">
          {waiting.length > 0 && (
            <RowList>
              {waiting.map((s) => (
                <Row
                  key={s.id}
                  title={
                    s.share_code
                      ? `Share code ${s.share_code}`
                      : `${s.document_paths.length} document photo${s.document_paths.length === 1 ? '' : 's'}`
                  }
                  detail={`Sent by ${first} on ${format(parseISO(s.submitted_at), 'd MMM')}${s.date_of_birth ? ` · born ${nice(s.date_of_birth)}` : ''}`}
                  trailing={
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className={rowBtnSecondary}
                        disabled={dismiss.isPending}
                        onClick={() => dismiss.mutate(s.id)}
                      >
                        Dismiss
                      </button>
                      <button
                        type="button"
                        className={rowBtnPrimary}
                        onClick={() => {
                          setFromSub(s);
                          setRecordOpen(true);
                        }}
                      >
                        Check
                      </button>
                    </div>
                  }
                />
              ))}
            </RowList>
          )}
          {latest ? (
            <div className={cn(panel, 'overflow-hidden')}>
              <div className={rowsClass}>
                <KeyValue label="Check" value={RTW_CHECK_TYPE_LABEL[latest.check_type]} />
                <KeyValue
                  label="Checked"
                  value={`${nice(latest.checked_on)}${latest.checked_by_name ? ` by ${latest.checked_by_name}` : ''}`}
                />
                {latest.check_type === 'not_required' ? (
                  <KeyValue label="Reason" value={latest.not_required_reason || 'Not given'} />
                ) : (
                  <KeyValue
                    label="Permission"
                    value={
                      latest.permission === 'time_limited'
                        ? `Until ${nice(latest.permission_expires_on) || 'date not set'}`
                        : 'No time limit'
                    }
                  />
                )}
                {latest.follow_up_due && (
                  <KeyValue
                    label="Follow-up due"
                    value={nice(latest.follow_up_due)}
                    tone={status === 'overdue' ? 'red' : status === 'due' ? 'yellow' : undefined}
                  />
                )}
                {latest.restrictions && (
                  <KeyValue label="Restrictions" value={latest.restrictions} />
                )}
                {latest.documents_seen && (
                  <Row title="Documents seen" detail={latest.documents_seen} wrapDetail />
                )}
                {latest.evidence_paths.map((p, i) => (
                  <Row
                    key={p}
                    title={`Copy ${i + 1}`}
                    detail="Private. Owner and admins only"
                    onClick={() => open(p)}
                  />
                ))}
                {latest.evidence_paths.length === 0 && latest.check_type !== 'not_required' && (
                  <Row
                    title="No copy stored"
                    detail="The Home Office expects a copy for the engagement plus 2 years"
                  />
                )}
              </div>
            </div>
          ) : viaCompany ? (
            <PlainEmpty
              stacked
              text={
                <>
                  Not required: engaged through a limited company
                  {eng?.source === 'name' && eng.from ? `, read from “${eng.from}”` : ''}. On
                  work you are contracted to do for a customer, your contract with the company
                  should make it check its own people.
                </>
              }
              action={setEng.isPending ? 'Saving…' : `We engage ${first} directly`}
              onAction={setEng.isPending ? undefined : () => changeEngagement('individual')}
            />
          ) : (
            <div className="space-y-3">
              <PlainEmpty
                text={
                  status === 'not_required' && st?.reason
                    ? `Not required: ${st.reason}. You can still record a check.`
                    : isSub
                      ? `No check for ${first}. Individual subcontractors engaged from 1 Oct 2026 need one before they start.`
                      : `No check for ${first}. Check before they start work and keep a copy.`
                }
                action={waiting.length === 0 ? 'Record a check' : undefined}
                onAction={() => {
                  setFromSub(null);
                  setRecordOpen(true);
                }}
              />
              {isSub && (
                <RowList>
                  <Row
                    title="Engaged through their limited company?"
                    detail="Then no check is needed by you"
                    trailing={
                      <button
                        type="button"
                        className={rowBtnSecondary}
                        disabled={setEng.isPending}
                        onClick={() => changeEngagement('company')}
                      >
                        {setEng.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Limited company'
                        )}
                      </button>
                    }
                  />
                </RowList>
              )}
            </div>
          )}
        </div>
      )}
      {canRecord && (
        <RecordRtwCheckSheet
          open={recordOpen}
          onOpenChange={setRecordOpen}
          person={person}
          fromSubmission={fromSub}
        />
      )}
    </section>
  );
}

export function RecordRtwCheckSheet({
  open,
  onOpenChange,
  person,
  fromSubmission,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  person: { id: string; name: string; teamRole?: string | null };
  fromSubmission?: RtwSubmission | null;
}) {
  const save = useSaveRtwCheck();
  const today = format(new Date(), 'yyyy-MM-dd');
  const [type, setType] = useState<RtwCheckType>(fromSubmission?.share_code ? 'online' : 'manual');
  const [checkedOn, setCheckedOn] = useState(today);
  const [checkedBy, setCheckedBy] = useState('');
  const [docs, setDocs] = useState('');
  const [shareCode, setShareCode] = useState(fromSubmission?.share_code ?? '');
  const [permission, setPermission] = useState<'unlimited' | 'time_limited'>('unlimited');
  const [expires, setExpires] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [lastKey, setLastKey] = useState<string | null>(null);

  // Fresh form each time it opens (or for a different submission).
  const key = `${open}:${person.id}:${fromSubmission?.id ?? ''}`;
  if (open && key !== lastKey) {
    setLastKey(key);
    setType(fromSubmission?.share_code ? 'online' : 'manual');
    setCheckedOn(today);
    setCheckedBy('');
    setDocs('');
    setShareCode(fromSubmission?.share_code ?? '');
    setPermission('unlimited');
    setExpires('');
    setFollowUp('');
    setRestrictions('');
    setReason('');
    setNotes(fromSubmission?.note ?? '');
    setFiles([]);
  }
  if (!open && lastKey !== null) setLastKey(null);

  // ECS: the Positive Verification Notice lasts 6 months (Home Office guide).
  const suggestedFollowUp = useMemo(() => {
    if (type === 'ecs' && checkedOn) return format(addMonths(parseISO(checkedOn), 6), 'yyyy-MM-dd');
    if (permission === 'time_limited' && expires) return expires;
    return '';
  }, [type, checkedOn, permission, expires]);
  const followUpValue = followUp || suggestedFollowUp;

  const code = normaliseShareCode(shareCode);
  const codeBad = type === 'online' && code.length > 0 && !SHARE_CODE_RE.test(code);
  const needsReason = type === 'not_required' && reason.trim().length < 3;
  const needsExpiry = type !== 'not_required' && permission === 'time_limited' && !expires;
  const canSave = !!checkedOn && !codeBad && !needsReason && !needsExpiry && !save.isPending;

  const submit = async () => {
    try {
      await save.mutateAsync({
        rosterId: person.id,
        personName: person.name,
        checkType: type,
        checkedOn,
        checkedByName: checkedBy.trim() || null,
        documentsSeen: type === 'not_required' ? null : docs.trim() || null,
        shareCode: type === 'online' && code ? code : null,
        permission: type === 'not_required' ? null : type === 'ecs' ? 'time_limited' : permission,
        permissionExpiresOn:
          type === 'not_required' || permission !== 'time_limited' ? null : expires || null,
        followUpDue: type === 'not_required' ? null : followUpValue || null,
        restrictions: type === 'not_required' ? null : restrictions.trim() || null,
        notRequiredReason: type === 'not_required' ? reason.trim() : null,
        notes: notes.trim() || null,
        files,
        submissionId: fromSubmission?.id ?? null,
      });
      toast({
        title: 'Check recorded',
        description:
          followUpValue && type !== 'not_required'
            ? `You get a reminder before the follow-up on ${nice(followUpValue)}.`
            : `${person.name.split(' ')[0]} shows as checked.`,
      });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const types: RtwCheckType[] = ['manual', 'online', 'idsp', 'ecs', 'not_required'];

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Right to work"
      title={`Record a check for ${person.name}`}
      description="Do the check before they start. Keep a copy for as long as they work for you and 2 years after."
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            className={cn(rowBtnSecondary, 'flex-1')}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={cn(rowBtnPrimary, 'flex-1')}
            disabled={!canSave}
            onClick={submit}
          >
            {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save check
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0 space-y-5">
          <Field label="How you checked">
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={type === t}
                  onClick={() => setType(t)}
                  className={cn(chip, type === t ? chipOn : chipOff)}
                >
                  {t === 'online'
                    ? 'Online share code'
                    : t === 'idsp'
                      ? 'Digital ID (IDSP)'
                      : t === 'manual'
                        ? 'Original documents'
                        : t === 'ecs'
                          ? 'Employer Checking Service'
                          : 'Not required'}
                </button>
              ))}
            </div>
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Date checked" required>
              <input
                type="date"
                className={inputClass}
                value={checkedOn}
                max={today}
                onChange={(e) => setCheckedOn(e.target.value)}
              />
            </Field>
            <Field label="Checked by">
              <input
                className={inputClass}
                value={checkedBy}
                placeholder="Your name"
                onChange={(e) => setCheckedBy(e.target.value)}
              />
            </Field>
          </div>

          {type === 'not_required' ? (
            <Field
              label="Why no check is needed"
              required
              hint="For example: they trade through a limited company, or you are their customer and they run their own business."
            >
              <input
                className={inputClass}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Field>
          ) : (
            <>
              {type === 'online' && (
                <Field
                  label="Share code"
                  hint={
                    codeBad
                      ? 'A right to work share code has 9 characters and starts with W.'
                      : 'Check it on gov.uk "Check a job applicant\'s right to work", then save the profile page as a PDF below.'
                  }
                >
                  <input
                    className={cn(inputClass, 'uppercase tracking-wider')}
                    value={shareCode}
                    placeholder="W12 345 678"
                    onChange={(e) => setShareCode(e.target.value)}
                  />
                </Field>
              )}
              {type !== 'online' && (
                <Field
                  label="Documents seen"
                  hint="Originals, seen with the person present. For example: UK passport, photo page."
                >
                  <textarea
                    className={textareaClass}
                    rows={2}
                    value={docs}
                    onChange={(e) => setDocs(e.target.value)}
                  />
                </Field>
              )}
            </>
          )}
        </div>

        <div className="min-w-0 space-y-5">
          {type !== 'not_required' && (
            <>
              {type !== 'ecs' && (
                <Field label="Permission to work">
                  <div className="flex flex-wrap gap-2">
                    {(['unlimited', 'time_limited'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        aria-pressed={permission === p}
                        onClick={() => setPermission(p)}
                        className={cn(chip, permission === p ? chipOn : chipOff)}
                      >
                        {p === 'unlimited' ? 'No time limit' : 'Time-limited'}
                      </button>
                    ))}
                  </div>
                </Field>
              )}
              <div className="grid gap-5 sm:grid-cols-2">
                {permission === 'time_limited' && type !== 'ecs' && (
                  <Field label="Permission ends" required>
                    <input
                      type="date"
                      className={inputClass}
                      value={expires}
                      onChange={(e) => setExpires(e.target.value)}
                    />
                  </Field>
                )}
                {(permission === 'time_limited' || type === 'ecs') && (
                  <Field
                    label="Follow-up check due"
                    hint={
                      type === 'ecs'
                        ? 'A Positive Verification Notice lasts 6 months.'
                        : 'On or before the day their permission ends.'
                    }
                  >
                    <input
                      type="date"
                      className={inputClass}
                      value={followUpValue}
                      onChange={(e) => setFollowUp(e.target.value)}
                    />
                  </Field>
                )}
              </div>
              <Field label="Work restrictions" hint="For example: 20 hours a week in term time.">
                <textarea
                  className={textareaClass}
                  rows={2}
                  value={restrictions}
                  onChange={(e) => setRestrictions(e.target.value)}
                />
              </Field>
              <Field
                label="Copies"
                hint="Photos or PDFs. Stored privately: only the owner and admins can open them."
              >
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const picked = Array.from(e.target.files ?? []).filter(
                      (f) => f.size <= 10 * 1024 * 1024
                    );
                    setFiles((prev) => [...prev, ...picked].slice(0, 6));
                    e.target.value = '';
                  }}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className={rowBtnSecondary}
                    onClick={() => fileRef.current?.click()}
                  >
                    Add a copy
                  </button>
                  {files.map((f, i) => (
                    <button
                      key={`${f.name}-${i}`}
                      type="button"
                      className={cn(chip, chipOff)}
                      onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                      title="Remove"
                    >
                      {f.name.length > 22 ? `${f.name.slice(0, 20)}…` : f.name} ×
                    </button>
                  ))}
                </div>
                {fromSubmission && fromSubmission.document_paths.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {fromSubmission.document_paths.map((p, i) => (
                      <button
                        key={p}
                        type="button"
                        className={cn(chip, chipOff)}
                        onClick={() => openRtwEvidence(p).catch(() => undefined)}
                      >
                        Open what they sent {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </Field>
            </>
          )}
          <Field label="Notes">
            <textarea
              className={textareaClass}
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>
        </div>
      </div>
    </FormSheet>
  );
}
