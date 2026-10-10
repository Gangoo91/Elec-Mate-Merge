/**
 * One safety report, the office's whole workflow (ELE-1945, ELE-2031).
 * Left: what happened, the injury, why it happened, what will change.
 * Right: the next step, RIDDOR, the record, and closing it.
 *
 * Opening the sheet marks the report as seen (acknowledge_incident), which
 * also tells the worker who reported it. A worker's own report stays theirs:
 * the office adds its follow-up and countersigns, it never edits their words.
 */
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Check, ExternalLink, FileText, Pencil, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import { panel, StatusPill } from '@/components/employer/pageParts/PageParts';
import { StoragePhoto } from '@/components/ui/storage-photo';
import { useToast } from '@/hooks/use-toast';
import { openExternalUrl } from '@/utils/open-external-url';
import { resolveSafetyPhoto } from '@/utils/storagePhoto';
import { cn } from '@/lib/utils';
import type { Employee } from '@/services/employeeService';
import {
  INCIDENT_TYPE_LABEL,
  INJURY_SEVERITY_LABEL,
  RIDDOR_CATEGORIES,
  getIncidentReportPdf,
  incidentNextStep,
  isIncidentClosed,
  isRiddorReportable,
  newActionId,
  riddorDeadline,
  useAcknowledgeIncident,
  useCountersignIncident,
  useUpdateIncident,
  useUpdateIncidentStatus,
  type CorrectiveAction,
  type Incident,
  type RiddorCategory,
} from '@/hooks/useIncidents';

const SEVERITY_LABEL: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

const HSE_RIDDOR_URL = 'https://notifications.hse.gov.uk/riddorforms';

function Block({
  title,
  children,
  aside,
}: {
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className={cn(panel, 'space-y-3 px-4 py-4 sm:px-5')}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[16px] font-semibold tracking-tight text-white">{title}</h3>
        {aside}
      </div>
      {children}
    </section>
  );
}

function Detail({ label, value }: { label: string; value?: ReactNode }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] py-2 last:border-0">
      <span className="shrink-0 text-[13px] text-white">{label}</span>
      <span className="text-right text-[13px] font-medium text-white">{value}</span>
    </div>
  );
}

export function IncidentDetailSheet({
  incident,
  open,
  onOpenChange,
  onEdit,
  employees,
  reporterName,
  jobTitle,
}: {
  incident: Incident | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (incident: Incident) => void;
  employees: Employee[];
  reporterName: string;
  jobTitle?: string | null;
}) {
  const { toast } = useToast();
  const acknowledge = useAcknowledgeIncident();
  const update = useUpdateIncident();
  const updateStatus = useUpdateIncidentStatus();
  const countersign = useCountersignIncident();

  // Local drafts, reset whenever a different report opens.
  const [rootCause, setRootCause] = useState('');
  const [notes, setNotes] = useState('');
  const [closeout, setCloseout] = useState('');
  const [hseRef, setHseRef] = useState('');
  const [hseDate, setHseDate] = useState('');
  const [newAction, setNewAction] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newDue, setNewDue] = useState('');
  const [pdfBusy, setPdfBusy] = useState<'incident' | 'riddor' | null>(null);
  const [confirmReopen, setConfirmReopen] = useState(false);

  const id = incident?.id;
  useEffect(() => {
    if (!incident) return;
    setRootCause(incident.root_cause ?? '');
    setNotes(incident.investigation_notes ?? '');
    setCloseout(incident.closeout_summary ?? '');
    setHseRef(incident.riddor_reference ?? '');
    setHseDate(
      incident.riddor_reported_at
        ? incident.riddor_reported_at.slice(0, 10)
        : new Date().toISOString().slice(0, 10)
    );
    setNewAction('');
    setNewOwner('');
    setNewDue('');
    setConfirmReopen(false);
    // Only when the report itself changes, not on every refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Opening = seen. The RPC is idempotent and notifies the reporter once.
  // Keyed on the id, not the row object: every refetch hands back a new
  // object, which re-fired the call while the first was still in flight.
  const ackMutate = acknowledge.mutate;
  const ackId = open && incident && !incident.acknowledged_at ? incident.id : null;
  useEffect(() => {
    if (ackId) ackMutate(ackId);
  }, [ackId, ackMutate]);

  const ownerOptions = useMemo(
    () =>
      employees
        .filter((e) => e.status !== 'Archived')
        .map((e) => ({
          value: e.id,
          label: e.name,
          description: e.user_id ? undefined : 'Not on the app, so will not be notified',
        })),
    [employees]
  );

  if (!incident) return null;

  const closed = isIncidentClosed(incident);
  const next = incidentNextStep(incident);
  const actions = incident.corrective_actions ?? [];
  const today = new Date().toISOString().slice(0, 10);
  const reportable = isRiddorReportable(incident.riddor_category);
  const deadline = riddorDeadline(incident);
  const isInjury = incident.incident_type === 'injury';
  const showRiddor =
    isInjury ||
    !!incident.riddor_category ||
    incident.incident_type === 'near_miss' ||
    incident.incident_type === 'dangerous_occurrence';
  const busy = update.isPending || updateStatus.isPending;
  const workerReport = incident.source !== 'legacy' && !incident.firm_made;
  const kind = INCIDENT_TYPE_LABEL[incident.incident_type] ?? 'Report';
  const severity = isInjury
    ? INJURY_SEVERITY_LABEL[incident.severity]
    : SEVERITY_LABEL[incident.severity];

  const save = (
    patch: Omit<Parameters<typeof update.mutateAsync>[0], 'id' | 'toastTitle'>,
    toastTitle: string | false = 'Saved'
  ) => update.mutateAsync({ id: incident.id, toastTitle, ...patch });

  const saveActions = (list: CorrectiveAction[], toastTitle: string | false = false) =>
    save({ corrective_actions: list }, toastTitle);

  const addAction = async () => {
    const text = newAction.trim();
    if (!text) return;
    const owner = employees.find((e) => e.id === newOwner);
    await saveActions(
      [
        ...actions,
        {
          id: newActionId(),
          action: text,
          owner_employee_id: owner?.id ?? null,
          owner_name: owner?.name ?? null,
          due_date: newDue || null,
          done_at: null,
        },
      ],
      owner?.user_id ? `Action added. ${owner.name.split(' ')[0]} has been told` : 'Action added'
    );
    setNewAction('');
    setNewOwner('');
    setNewDue('');
  };

  const toggleAction = (a: CorrectiveAction) =>
    saveActions(
      actions.map((x) =>
        x.id === a.id
          ? x.done_at
            ? { ...x, done_at: null, done_note: null, reopened_at: new Date().toISOString() }
            : { ...x, done_at: new Date().toISOString() }
          : x
      )
    );

  const removeAction = (a: CorrectiveAction) =>
    saveActions(
      actions.filter((x) => x.id !== a.id),
      'Action removed'
    );

  const setCategory = (c: RiddorCategory) =>
    save(
      { riddor_category: c },
      c === 'not_reportable' ? 'Recorded as not reportable' : 'RIDDOR decision saved'
    );

  const markReported = () =>
    save(
      {
        riddor_reported_at: new Date(`${hseDate}T12:00:00`).toISOString(),
        riddor_reference: hseRef.trim() || null,
      },
      'Recorded as reported to the HSE'
    );

  const closeReport = async () => {
    await save({ closeout_summary: closeout.trim() }, false);
    await updateStatus.mutateAsync({ id: incident.id, status: 'closed' });
  };

  const reopen = async () => {
    await updateStatus.mutateAsync({ id: incident.id, status: 'investigating' });
    setConfirmReopen(false);
  };

  const downloadPdf = async (pdf: 'incident' | 'riddor') => {
    setPdfBusy(pdf);
    try {
      const url = await getIncidentReportPdf(incident.id, pdf);
      await openExternalUrl(url);
    } catch (e) {
      toast({
        title: 'Report not ready',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setPdfBusy(null);
    }
  };

  const openActions = actions.filter((a) => !a.done_at);
  const canClose =
    !closed && closeout.trim().length >= 10 && !(reportable && !incident.riddor_reported_at);
  const closeBlocker =
    reportable && !incident.riddor_reported_at
      ? 'Record the HSE report first.'
      : closeout.trim().length < 10
        ? 'Say what was done. The person who reported it will see this.'
        : openActions.length > 0
          ? `${openActions.length} action${openActions.length === 1 ? ' is' : 's are'} still open. You can still close it.`
          : null;

  const statusPill = closed ? (
    <StatusPill tone="green">Closed</StatusPill>
  ) : incident.status === 'investigating' ? (
    <StatusPill tone="volt">Investigating</StatusPill>
  ) : (
    <StatusPill tone="neutral">Open</StatusPill>
  );

  /* ── Left column ───────────────────────────────────────────────────── */
  const left = (
    <div className="space-y-5">
      <Block title="What happened">
        <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">
          {incident.description || 'No description recorded.'}
        </p>
        {(incident.photos?.length ?? 0) > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {incident.photos!.map((p) => (
              <button
                key={p}
                type="button"
                onClick={async () => {
                  const url = await resolveSafetyPhoto(p);
                  if (url) await openExternalUrl(url);
                }}
                aria-label="Open photo"
                className="aspect-square overflow-hidden rounded-lg border border-white/[0.1] touch-manipulation"
              >
                <StoragePhoto src={p} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
        <div>
          <Detail label="Where" value={incident.location} />
          <Detail label="Job" value={jobTitle} />
          <Detail label="Reported by" value={reporterName} />
          <Detail
            label="Logged"
            value={formatDistanceToNow(new Date(incident.created_at), { addSuffix: true })}
          />
          <Detail
            label="Supervisor told"
            value={incident.supervisor_notified ? incident.supervisor_name || 'Yes' : undefined}
          />
          <Detail label="Witnesses" value={incident.witnesses} />
          <Detail
            label={incident.source === 'accident' ? 'First aid and action' : 'Action on the day'}
            value={incident.immediate_action_taken}
          />
        </div>
      </Block>

      {isInjury && (
        <Block title="Injury">
          <div>
            <Detail label="Injured person" value={incident.injured_person || 'Not recorded'} />
            <Detail label="Injuries" value={incident.injuries_sustained || 'Not recorded'} />
            <Detail label="First aid" value={incident.first_aid_given ? 'Given' : 'No'} />
            <Detail label="Went to hospital" value={incident.hospital_visit ? 'Yes' : 'No'} />
            <Detail
              label="Days off work"
              value={incident.days_off != null ? String(incident.days_off) : 'Not recorded'}
            />
          </div>
          {!incident.injured_person && incident.can_edit && (
            <SecondaryButton fullWidth onClick={() => onEdit(incident)}>
              Add who was hurt
            </SecondaryButton>
          )}
        </Block>
      )}

      <Block title="Why it happened">
        <Field
          label="Root cause"
          hint="The real reason, not just what went wrong. Ask why until you reach something you can change."
        >
          <Input
            value={rootCause}
            onChange={(e) => setRootCause(e.target.value)}
            placeholder="e.g. Saw guard removed for a blade change and not refitted"
            className={inputClass}
            disabled={closed}
          />
        </Field>
        <Field label="Investigation notes">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Who you spoke to, what you found"
            className={textareaClass}
            disabled={closed}
          />
        </Field>
        {!closed &&
          (rootCause !== (incident.root_cause ?? '') ||
            notes !== (incident.investigation_notes ?? '')) && (
            <PrimaryButton
              fullWidth
              disabled={busy}
              onClick={async () => {
                await save(
                  { root_cause: rootCause.trim(), investigation_notes: notes.trim() },
                  'Investigation saved'
                );
                if (incident.status !== 'investigating')
                  await updateStatus.mutateAsync({ id: incident.id, status: 'investigating' });
              }}
            >
              Save investigation
            </PrimaryButton>
          )}
      </Block>

      <Block
        title="What will change"
        aside={
          actions.length > 0 ? (
            <span className="text-[13px] text-white">
              {actions.length - openActions.length} of {actions.length} done
            </span>
          ) : undefined
        }
      >
        {actions.length === 0 && (
          <p className="text-[13px] text-white">
            Add each fix with an owner and a date. Owners on the app are told straight away and can
            tick it off themselves.
          </p>
        )}
        <ul className="divide-y divide-white/[0.07]">
          {actions.map((a) => {
            const overdue = !closed && !a.done_at && !!a.due_date && a.due_date < today;
            const notDone = closed && !a.done_at;
            return (
              <li key={a.id} className="flex items-start gap-3 py-2.5">
                <button
                  type="button"
                  onClick={() => toggleAction(a)}
                  disabled={closed || busy}
                  aria-label={a.done_at ? 'Mark not done' : 'Mark done'}
                  className="-m-1.5 flex h-11 w-11 shrink-0 items-center justify-center touch-manipulation"
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-md border',
                      a.done_at ? 'border-elec-yellow bg-elec-yellow' : 'border-white/40'
                    )}
                  >
                    {a.done_at && <Check className="h-4 w-4 text-black" />}
                  </span>
                </button>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      'text-[14px] text-white',
                      a.done_at && 'line-through decoration-white/50'
                    )}
                  >
                    {a.action}
                  </p>
                  <p className="mt-0.5 text-[12.5px] text-white">
                    {a.owner_name || 'No owner'}
                    {a.due_date && ` · due ${format(new Date(a.due_date), 'd MMM')}`}
                    {a.done_at && ` · done ${format(new Date(a.done_at), 'd MMM')}`}
                  </p>
                  {a.done_note && <p className="mt-1 text-[12.5px] text-white">“{a.done_note}”</p>}
                </div>
                {overdue && <StatusPill tone="red">Overdue</StatusPill>}
                {notDone && <StatusPill tone="neutral">Not done</StatusPill>}
                {!closed && (
                  <button
                    type="button"
                    onClick={() => removeAction(a)}
                    disabled={busy}
                    aria-label="Remove action"
                    className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center text-white touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {!closed && (
          <div className="space-y-3 border-t border-white/[0.1] pt-3">
            <Field label="New action">
              <Input
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="e.g. Add saw guard to the pre-use check"
                className={inputClass}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Owner">
                <MobileSelectPicker
                  value={newOwner}
                  onValueChange={setNewOwner}
                  options={ownerOptions}
                  placeholder="Who will do it"
                  title="Action owner"
                />
              </Field>
              <Field label="Due">
                <Input
                  type="date"
                  value={newDue}
                  min={today}
                  onChange={(e) => setNewDue(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
            <SecondaryButton fullWidth onClick={addAction} disabled={!newAction.trim() || busy}>
              <Plus className="mr-2 h-4 w-4" />
              Add action
            </SecondaryButton>
          </div>
        )}
      </Block>
    </div>
  );

  /* ── Right column ──────────────────────────────────────────────────── */
  const right = (
    <div className="space-y-5">
      {showRiddor && (
        <Block
          title="RIDDOR"
          aside={
            reportable && deadline && !incident.riddor_reported_at ? (
              <StatusPill tone="red">Due {format(deadline, 'd MMM')}</StatusPill>
            ) : undefined
          }
        >
          <p className="text-[13px] leading-relaxed text-white">
            {incident.riddor_category
              ? RIDDOR_CATEGORIES.find((c) => c.value === incident.riddor_category)?.description
              : 'Decide whether the HSE must be told. Pick the first one that applies.'}
          </p>
          <MobileSelectPicker
            value={incident.riddor_category ?? ''}
            onValueChange={(v) => setCategory(v as RiddorCategory)}
            options={RIDDOR_CATEGORIES}
            placeholder="Choose a RIDDOR decision"
            title="RIDDOR decision"
            disabled={closed || busy}
          />

          {reportable && (
            <>
              {incident.riddor_reported_at ? (
                <div className="border-l-2 border-emerald-500 pl-3">
                  <p className="text-[13px] font-semibold text-white">
                    Reported to the HSE on{' '}
                    {format(new Date(incident.riddor_reported_at), 'd MMMM yyyy')}
                  </p>
                  {incident.riddor_reference && (
                    <p className="mt-0.5 text-[12.5px] text-white">
                      Reference {incident.riddor_reference}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <p className="text-[13px] text-white">
                    {deadline
                      ? `The HSE must be told by ${format(deadline, 'EEEE d MMMM')}. Deaths and specified injuries must also be reported without delay.`
                      : 'Report it as soon as a doctor confirms the diagnosis in writing.'}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Date reported">
                      <Input
                        type="date"
                        value={hseDate}
                        onChange={(e) => setHseDate(e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="HSE reference" hint="On the confirmation the HSE sends you">
                      <Input
                        value={hseRef}
                        onChange={(e) => setHseRef(e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  <PrimaryButton fullWidth onClick={markReported} disabled={busy || !hseDate}>
                    I have reported it
                  </PrimaryButton>
                </>
              )}
              <div className="grid grid-cols-2 gap-2">
                <SecondaryButton onClick={() => downloadPdf('riddor')} disabled={pdfBusy !== null}>
                  <FileText className="mr-2 h-4 w-4" />
                  {pdfBusy === 'riddor' ? 'Building…' : 'RIDDOR PDF'}
                </SecondaryButton>
                <SecondaryButton onClick={() => openExternalUrl(HSE_RIDDOR_URL)}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  HSE form
                </SecondaryButton>
              </div>
            </>
          )}
        </Block>
      )}

      <Block title="The record">
        <div>
          <Detail
            label="Kept in"
            value={
              incident.source === 'accident'
                ? 'Accident book'
                : incident.source === 'near_miss'
                  ? 'Near-miss register'
                  : 'Incidents (older report)'
            }
          />
          <Detail label="Record number" value={incident.record_number} />
          <Detail
            label="Seen by the office"
            value={
              incident.acknowledged_at
                ? format(new Date(incident.acknowledged_at), 'd MMM, HH:mm')
                : 'Just now'
            }
          />
          <Detail
            label="Countersigned"
            value={
              incident.countersigned_at
                ? `${incident.countersigned_name ?? 'Firm manager'}, ${format(new Date(incident.countersigned_at), 'd MMM yyyy')}`
                : incident.source === 'legacy'
                  ? undefined
                  : 'Not yet'
            }
          />
        </div>
        {workerReport && (
          <p className="text-[13px] leading-snug text-white">
            {reporterName} made this report from site, so it stays theirs. You can add the
            follow-up and countersign it; you cannot change what they wrote.
          </p>
        )}
        {incident.source !== 'legacy' && (
          <SecondaryButton
            fullWidth
            disabled={countersign.isPending}
            onClick={() =>
              countersign.mutate({ incident, withdraw: !!incident.countersigned_at })
            }
          >
            {incident.countersigned_at ? 'Withdraw countersignature' : 'Countersign for the firm'}
          </SecondaryButton>
        )}
      </Block>

      <Block title={closed ? 'Closed' : 'Close the report'}>
        {closed ? (
          <>
            <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">
              {incident.closeout_summary || 'Closed without a summary.'}
            </p>
            {incident.closed_at && (
              <p className="text-[12.5px] text-white">
                Closed {format(new Date(incident.closed_at), 'd MMMM yyyy, HH:mm')}
              </p>
            )}
            {confirmReopen ? (
              <div className="grid grid-cols-2 gap-2">
                <SecondaryButton onClick={() => setConfirmReopen(false)}>Keep closed</SecondaryButton>
                <PrimaryButton onClick={reopen} disabled={busy}>
                  Reopen
                </PrimaryButton>
              </div>
            ) : (
              <SecondaryButton fullWidth onClick={() => setConfirmReopen(true)}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reopen
              </SecondaryButton>
            )}
          </>
        ) : (
          <>
            <Field
              label="What was done"
              hint="The person who reported it is sent this when you close it."
            >
              <Textarea
                value={closeout}
                onChange={(e) => setCloseout(e.target.value)}
                rows={3}
                placeholder="e.g. Guard refitted, pre-use check updated, toolbox talk given to the whole team"
                className={textareaClass}
              />
            </Field>
            {closeBlocker && <p className="text-[12.5px] text-white">{closeBlocker}</p>}
            <PrimaryButton fullWidth onClick={closeReport} disabled={!canClose || busy}>
              Close report
            </PrimaryButton>
          </>
        )}
      </Block>
    </div>
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={`${kind} · ${format(new Date(incident.date_occurred), 'd MMM yyyy, HH:mm')}`}
      title={incident.title}
      description={
        <span className="flex flex-wrap items-center gap-2 pt-1">
          {statusPill}
          {severity && (
            <StatusPill
              tone={
                incident.severity === 'high' || incident.severity === 'critical' ? 'red' : 'neutral'
              }
            >
              {severity}
            </StatusPill>
          )}
          {reportable && (
            <StatusPill tone={incident.riddor_reported_at ? 'green' : 'red'}>RIDDOR</StatusPill>
          )}
        </span>
      }
      width="wide"
      footer={
        <div className="flex gap-2">
          {incident.can_edit && (
            <SecondaryButton fullWidth onClick={() => onEdit(incident)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </SecondaryButton>
          )}
          <SecondaryButton
            fullWidth
            onClick={() => downloadPdf('incident')}
            disabled={pdfBusy !== null}
          >
            <FileText className="mr-2 h-4 w-4" />
            {pdfBusy === 'incident' ? 'Building…' : 'Report PDF'}
          </SecondaryButton>
        </div>
      }
    >
      <div className="space-y-5">
      {!closed && (
          <section className={cn(panel, 'px-4 py-3 sm:px-5')}>
            <p className="text-[12px] font-semibold text-white">Next step</p>
            <p
              className={cn(
                'text-[15px] font-semibold',
                next.tone === 'red'
                  ? 'text-red-400'
                  : next.tone === 'amber'
                    ? 'text-elec-yellow'
                    : 'text-emerald-400'
              )}
            >
              {next.label}
            </p>
          </section>
        )}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
          {left}
          {right}
        </div>
      </div>
    </FormSheet>
  );
}
