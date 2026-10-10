/**
 * Complaints log (ELE-2075), opened from Compliance. Customer complaints and
 * data protection complaints in one list: received, channel, summary, owner,
 * response due, outcome, closed. Export as CSV for an assessor; the scheme
 * assessment pack (ELE-2069) reads the same rows.
 *
 * Data protection complaints (DPA 2018 s.164A, inserted by the Data (Use and
 * Access) Act 2025, in force 19 June 2026): make it easy to complain,
 * acknowledge within 30 days, investigate, keep them updated and tell the
 * person the outcome. s.164A does not require pointing them to the ICO, so
 * that box is labelled good practice. We add the 30-day acknowledgement
 * date for them.
 */
import { useEffect, useMemo, useState } from 'react';
import { FileDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useEmployees } from '@/hooks/useEmployees';
import { useJobs } from '@/hooks/useJobs';
import { saveOrShareFile } from '@/utils/save-or-share-file';
import {
  CHANNEL_LABEL,
  KIND_LABEL,
  OUTCOME_LABEL,
  addDays,
  complaintState,
  complaintsCsv,
  useComplaints,
  useDeleteComplaint,
  useSaveComplaint,
  type Complaint,
  type ComplaintChannel,
  type ComplaintKind,
  type ComplaintOutcomeKind,
} from '@/hooks/useComplaints';
import {
  Field,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  LoadingBlocks,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import {
  panel,
  PanelHead,
  Row,
  RowList,
  PlainEmpty,
  Segments,
  StatusPill,
  plural,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const ukDate = (iso?: string | null) =>
  iso
    ? new Date(`${iso.slice(0, 10)}T00:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chip = 'h-11 rounded-full border px-4 text-[13px] touch-manipulation';

type Filter = 'open' | 'closed' | 'all';

const EMPTY = {
  kind: 'customer' as ComplaintKind,
  received_on: todayIso(),
  channel: 'phone' as ComplaintChannel,
  complainant_name: '',
  complainant_contact: '',
  summary: '',
  job_id: '',
  owner_employee_id: '',
  acknowledged_on: '',
  response_due: addDays(todayIso(), 14),
  outcome_kind: '' as ComplaintOutcomeKind | '',
  outcome: '',
  ico_route_given: false,
  closed_on: '',
};
type Form = typeof EMPTY;

const stateOf = (c: Complaint, today: string): { label: string; tone: PillTone } => {
  const s = complaintState(c, today);
  if (s === 'closed') return { label: 'Closed', tone: 'green' };
  if (s === 'overdue')
    return {
      label:
        c.kind === 'data_protection' && !c.acknowledged_on ? 'Acknowledge now' : 'Reply overdue',
      tone: 'red',
    };
  if (s === 'due') return { label: 'Reply due', tone: 'volt' };
  return { label: 'Open', tone: 'neutral' };
};

export function ComplaintsSheet({
  open,
  onOpenChange,
  openId,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** Open one complaint straight away (?complaint=<id>). */
  openId?: string | null;
}) {
  const today = todayIso();
  const { data: complaints = [], isLoading } = useComplaints(open);
  const save = useSaveComplaint();
  const del = useDeleteComplaint();
  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useJobs();
  const [filter, setFilter] = useState<Filter>('open');
  const [editing, setEditing] = useState<'new' | string | null>(null);
  const [form, setForm] = useState<Form>(EMPTY);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const jobTitle = useMemo(() => new Map(jobs.map((j) => [j.id, j.title])), [jobs]);

  const startEdit = (c: Complaint | null) => {
    setConfirmDelete(false);
    if (!c) {
      setForm({ ...EMPTY, received_on: today, response_due: addDays(today, 14) });
      setEditing('new');
      return;
    }
    setForm({
      kind: c.kind,
      received_on: c.received_on,
      channel: c.channel,
      complainant_name: c.complainant_name ?? '',
      complainant_contact: c.complainant_contact ?? '',
      summary: c.summary,
      job_id: c.job_id ?? '',
      owner_employee_id: c.owner_employee_id ?? '',
      acknowledged_on: c.acknowledged_on ?? '',
      response_due: c.response_due ?? '',
      outcome_kind: c.outcome_kind ?? '',
      outcome: c.outcome ?? '',
      ico_route_given: c.ico_route_given,
      closed_on: c.closed_on ?? '',
    });
    setEditing(c.id);
  };

  useEffect(() => {
    if (!open || !openId || isLoading) return;
    const c = complaints.find((x) => x.id === openId);
    if (c) startEdit(c);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, openId, isLoading]);

  const counts = useMemo(() => {
    const c = { open: 0, closed: 0, overdue: 0 };
    for (const x of complaints) {
      const s = complaintState(x, today);
      if (s === 'closed') c.closed += 1;
      else c.open += 1;
      if (s === 'overdue') c.overdue += 1;
    }
    return c;
  }, [complaints, today]);

  const list = complaints.filter((c) =>
    filter === 'all' ? true : filter === 'closed' ? !!c.closed_on : !c.closed_on
  );

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((p) => ({ ...p, [k]: v }));

  const onKind = (k: ComplaintKind) =>
    setForm((p) => ({
      ...p,
      kind: k,
      // Data protection: acknowledge within 30 days (DPA 2018 s.164A(3)).
      response_due:
        k === 'data_protection' &&
        (!p.response_due || p.response_due === addDays(p.received_on, 14))
          ? addDays(p.received_on, 30)
          : p.response_due,
    }));

  const handleSave = async () => {
    if (!form.summary.trim()) return;
    const owner = employees.find((e) => e.id === form.owner_employee_id);
    try {
      await save.mutateAsync({
        ...(editing && editing !== 'new' ? { id: editing } : {}),
        kind: form.kind,
        received_on: form.received_on || today,
        channel: form.channel,
        complainant_name: form.complainant_name.trim() || null,
        complainant_contact: form.complainant_contact.trim() || null,
        summary: form.summary.trim(),
        job_id: form.job_id || null,
        owner_employee_id: form.owner_employee_id || null,
        owner_name: owner?.name ?? null,
        acknowledged_on: form.acknowledged_on || null,
        response_due: form.response_due || null,
        outcome_kind: (form.outcome_kind || null) as ComplaintOutcomeKind | null,
        outcome: form.outcome.trim() || null,
        ico_route_given: form.kind === 'data_protection' ? form.ico_route_given : false,
        closed_on: form.closed_on || null,
      });
      toast({ title: editing === 'new' ? 'Complaint logged' : 'Complaint saved' });
      setEditing(null);
    } catch (e) {
      toast({
        title: 'Could not save the complaint',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const exportCsv = async () => {
    if (!complaints.length) return;
    const csv = complaintsCsv(complaints, (id) => jobTitle.get(id));
    await saveOrShareFile(
      new Blob([csv], { type: 'text/csv;charset=utf-8' }),
      `complaints-log-${today}.csv`
    );
  };

  const editingRow = editing && editing !== 'new' ? complaints.find((c) => c.id === editing) : null;

  /* ── Edit / add ─────────────────────────────────────────── */
  if (editing) {
    const closing = !!form.closed_on;
    return (
      <FormSheet
        open={open}
        onOpenChange={(o) => {
          if (!o) {
            setEditing(null);
            onOpenChange(false);
          }
        }}
        width="wide"
        eyebrow="Complaints log"
        title={editing === 'new' ? 'Log a complaint' : editingRow?.complainant_name || 'Complaint'}
        description={
          form.kind === 'data_protection'
            ? 'By law: acknowledge within 30 days, look into it, keep them updated and tell them the outcome. Good practice: remind them they can also complain to the ICO.'
            : 'Record what was said, who owns it and when you will reply.'
        }
        footer={
          <div className="flex gap-3">
            <SecondaryButton onClick={() => setEditing(null)} className="flex-1 sm:flex-none">
              Back to the log
            </SecondaryButton>
            {editingRow &&
              (confirmDelete ? (
                <DestructiveButton
                  disabled={del.isPending}
                  onClick={async () => {
                    await del.mutateAsync(editingRow.id);
                    setEditing(null);
                  }}
                  className="flex-1 sm:flex-none"
                >
                  Yes, delete it
                </DestructiveButton>
              ) : (
                <DestructiveButton
                  onClick={() => setConfirmDelete(true)}
                  className="flex-1 sm:flex-none"
                >
                  Delete
                </DestructiveButton>
              ))}
            <PrimaryButton
              onClick={handleSave}
              disabled={!form.summary.trim() || save.isPending}
              className="flex-1"
            >
              {save.isPending ? 'Saving' : editing === 'new' ? 'Log complaint' : 'Save'}
            </PrimaryButton>
          </div>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <Field label="Type">
              <div className="flex flex-wrap gap-2">
                {(['customer', 'data_protection'] as ComplaintKind[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => onKind(k)}
                    className={cn(chip, form.kind === k ? chipOn : chipOff)}
                  >
                    {k === 'customer' ? 'Customer' : 'Data protection'}
                  </button>
                ))}
              </div>
            </Field>
            <FormGrid cols={2}>
              <Field label="Received" required>
                <input
                  type="date"
                  value={form.received_on}
                  onChange={(e) => set('received_on', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="How it came in">
                <MobileSelectPicker
                  value={form.channel}
                  onValueChange={(v) => set('channel', v as ComplaintChannel)}
                  options={Object.entries(CHANNEL_LABEL).map(([value, label]) => ({
                    value,
                    label,
                  }))}
                  title="How it came in"
                />
              </Field>
            </FormGrid>
            <FormGrid cols={2}>
              <Field label="Who complained">
                <input
                  value={form.complainant_name}
                  onChange={(e) => set('complainant_name', e.target.value)}
                  placeholder="Name"
                  className={inputClass}
                />
              </Field>
              <Field label="Their phone or email">
                <input
                  value={form.complainant_contact}
                  onChange={(e) => set('complainant_contact', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field label="What the complaint is about" required>
              <textarea
                value={form.summary}
                onChange={(e) => set('summary', e.target.value)}
                rows={4}
                placeholder="In their words, as near as you can"
                className={textareaClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Job (optional)">
                <MobileSelectPicker
                  value={form.job_id || '__none__'}
                  onValueChange={(v) => set('job_id', v === '__none__' ? '' : v)}
                  options={[
                    { value: '__none__', label: 'No job' },
                    ...jobs
                      .filter((j) => !j.is_template)
                      .map((j) => ({ value: j.id, label: j.title || 'Untitled job' })),
                  ]}
                  title="Job"
                />
              </Field>
              <Field label="Who owns it">
                <MobileSelectPicker
                  value={form.owner_employee_id || '__none__'}
                  onValueChange={(v) => set('owner_employee_id', v === '__none__' ? '' : v)}
                  options={[
                    { value: '__none__', label: 'Not given yet' },
                    ...employees.map((e) => ({ value: e.id, label: e.name })),
                  ]}
                  title="Who owns it"
                />
              </Field>
            </FormGrid>
          </div>

          <div className="space-y-4">
            <FormGrid cols={2}>
              <Field
                label="Acknowledged"
                hint={
                  form.kind === 'data_protection'
                    ? `By ${ukDate(addDays(form.received_on || today, 30))} at the latest.`
                    : undefined
                }
              >
                <input
                  type="date"
                  value={form.acknowledged_on}
                  onChange={(e) => set('acknowledged_on', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Reply due">
                <input
                  type="date"
                  value={form.response_due}
                  onChange={(e) => set('response_due', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field label="Outcome">
              <MobileSelectPicker
                value={form.outcome_kind || '__none__'}
                onValueChange={(v) =>
                  set('outcome_kind', (v === '__none__' ? '' : v) as ComplaintOutcomeKind | '')
                }
                options={[
                  { value: '__none__', label: 'Still open' },
                  ...Object.entries(OUTCOME_LABEL).map(([value, label]) => ({ value, label })),
                ]}
                title="Outcome"
              />
            </Field>
            <Field label="What you did and told them">
              <textarea
                value={form.outcome}
                onChange={(e) => set('outcome', e.target.value)}
                rows={3}
                className={textareaClass}
              />
            </Field>
            {form.kind === 'data_protection' && (
              <label className="flex min-h-[44px] items-center gap-3 text-[14px] text-white touch-manipulation">
                <input
                  type="checkbox"
                  checked={form.ico_route_given}
                  onChange={(e) => set('ico_route_given', e.target.checked)}
                  className="h-5 w-5 accent-elec-yellow"
                />
                Reminded them they can complain to the ICO (good practice)
              </label>
            )}
            <Field label="Closed" hint={closing ? undefined : 'Set when it is finished with.'}>
              <input
                type="date"
                value={form.closed_on}
                onChange={(e) => set('closed_on', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </FormSheet>
    );
  }

  /* ── The log ────────────────────────────────────────────── */
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Compliance"
      title="Complaints log"
      description={
        isLoading
          ? 'Loading the log.'
          : complaints.length === 0
            ? 'No complaints logged. Assessors ask to see the log even when it is empty.'
            : `${plural(counts.open, 'open complaint')}${counts.overdue ? `, ${counts.overdue} overdue` : ''}. ${counts.closed} closed.`
      }
      footer={
        <div className="flex gap-3">
          <SecondaryButton
            onClick={exportCsv}
            disabled={!complaints.length}
            className="flex-1 sm:flex-none"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export CSV
          </SecondaryButton>
          <PrimaryButton onClick={() => startEdit(null)} className="flex-1">
            <Plus className="mr-2 h-4 w-4" />
            Log a complaint
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-4">
          <Segments
            items={[
              { value: 'open' as Filter, label: 'Open', count: counts.open },
              { value: 'closed' as Filter, label: 'Closed', count: counts.closed },
              { value: 'all' as Filter, label: 'All', count: complaints.length },
            ]}
            value={filter}
            onChange={setFilter}
          />
          {isLoading ? (
            <LoadingBlocks />
          ) : list.length === 0 ? (
            <PlainEmpty
              text={
                complaints.length === 0
                  ? 'Log every complaint, even ones sorted on the phone. It shows the assessor you deal with them.'
                  : 'Nothing in this view.'
              }
              action={complaints.length === 0 ? 'Log a complaint' : undefined}
              onAction={complaints.length === 0 ? () => startEdit(null) : undefined}
            />
          ) : (
            <RowList>
              {list.map((c) => {
                const st = stateOf(c, today);
                return (
                  <Row
                    key={c.id}
                    onClick={() => startEdit(c)}
                    title={c.complainant_name || KIND_LABEL[c.kind]}
                    detail={[
                      ukDate(c.received_on),
                      c.kind === 'data_protection' ? 'Data protection' : CHANNEL_LABEL[c.channel],
                      c.summary,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                    trailing={<StatusPill tone={st.tone}>{st.label}</StatusPill>}
                  />
                );
              })}
            </RowList>
          )}
        </div>
        <section className={cn(panel, 'overflow-hidden')}>
          <PanelHead title="What it is for" />
          <div className="space-y-3 px-4 py-3 text-[13.5px] leading-snug text-white sm:px-5">
            <p>
              Your scheme assessor asks to see your complaints procedure and the log at each visit.
              It goes into the assessment pack.
            </p>
            <p>
              Data protection complaints: since 19 June 2026 you must let people complain,
              acknowledge within 30 days, look into it without undue delay and tell them the
              outcome.
            </p>
          </div>
        </section>
      </div>
    </FormSheet>
  );
}
