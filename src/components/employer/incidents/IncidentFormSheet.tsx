/**
 * Log or edit a safety report from the office (ELE-1945, ELE-2031).
 *
 * A new report is filed in Site Safety under the firm: an injury in the
 * accident book, anything else in the near-miss register. Editing is for
 * reports the office made (and older employer_incidents rows); a worker's own
 * report is never edited here.
 */
import { useEffect, useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  checkboxClass,
} from '@/components/employer/editorial';
import { StoragePhoto } from '@/components/ui/storage-photo';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Employee } from '@/services/employeeService';
import type { Job } from '@/services/jobService';
import {
  BODY_PARTS,
  INJURY_SEVERITY_LABEL,
  INJURY_TYPES,
  uploadIncidentPhoto,
  useCreateIncident,
  useUpdateIncident,
  type Incident,
  type IncidentType,
  type SeverityLevel,
} from '@/hooks/useIncidents';

const TYPES: { value: IncidentType; label: string; description?: string }[] = [
  { value: 'near_miss', label: 'Near miss', description: 'Nobody hurt, but it could have been' },
  { value: 'injury', label: 'Injury', description: 'Someone was hurt. Goes in the accident book' },
  { value: 'dangerous_occurrence', label: 'Dangerous occurrence', description: 'A listed RIDDOR event' },
  { value: 'unsafe_practice', label: 'Unsafe practice' },
  { value: 'faulty_equipment', label: 'Faulty equipment' },
  { value: 'property_damage', label: 'Property damage' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'security', label: 'Security' },
  { value: 'other', label: 'Other' },
];

const SEVERITIES: SeverityLevel[] = ['low', 'medium', 'high', 'critical'];
const SEVERITY_LABEL: Record<SeverityLevel, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

const MAX_PHOTOS = 6;

/** datetime-local wants local time without a zone. */
const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

interface FormState {
  incident_type: IncidentType;
  severity: SeverityLevel;
  title: string;
  description: string;
  location: string;
  job_id: string;
  date_occurred: string;
  immediate_action_taken: string;
  witnesses: string;
  supervisor_notified: boolean;
  supervisor_name: string;
  injured_employee_id: string;
  injured_person: string;
  injury_type: string;
  body_part: string;
  injuries_sustained: string;
  first_aid_given: boolean;
  hospital_visit: boolean;
  days_off: string;
  photos: string[];
}

const blank = (): FormState => ({
  incident_type: 'near_miss',
  severity: 'medium',
  title: '',
  description: '',
  location: '',
  job_id: '',
  date_occurred: new Date().toISOString(),
  immediate_action_taken: '',
  witnesses: '',
  supervisor_notified: false,
  supervisor_name: '',
  injured_employee_id: '',
  injured_person: '',
  injury_type: '',
  body_part: '',
  injuries_sustained: '',
  first_aid_given: false,
  hospital_visit: false,
  days_off: '',
  photos: [],
});

const fromIncident = (i: Incident): FormState => ({
  incident_type: i.incident_type,
  severity: i.severity,
  title: i.title,
  description: i.description,
  location: i.location,
  job_id: i.job_id ?? '',
  date_occurred: i.date_occurred,
  immediate_action_taken: i.immediate_action_taken ?? '',
  witnesses: i.witnesses ?? '',
  supervisor_notified: !!i.supervisor_notified,
  supervisor_name: i.supervisor_name ?? '',
  injured_employee_id: i.injured_employee_id ?? '',
  injured_person: i.injured_person ?? '',
  injury_type: i.injury_type ?? '',
  body_part: i.body_part ?? '',
  // An accident book row reads back as "Burn to hand fingers. <description>";
  // the form edits only the description after the first full stop.
  injuries_sustained:
    i.source === 'accident'
      ? (() => {
          const t = i.injuries_sustained ?? '';
          const at = t.indexOf('. ');
          return at === -1 ? '' : t.slice(at + 2);
        })()
      : (i.injuries_sustained ?? ''),
  first_aid_given: !!i.first_aid_given,
  hospital_visit: !!i.hospital_visit,
  days_off: i.days_off != null ? String(i.days_off) : '',
  photos: i.photos ?? [],
});

const chipCn = (on: boolean) =>
  cn(
    'h-11 rounded-xl border text-[13px] touch-manipulation transition-colors',
    on
      ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
      : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
  );

export function IncidentFormSheet({
  open,
  onOpenChange,
  editing,
  employees,
  jobs,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Null = new report. */
  editing: Incident | null;
  employees: Employee[];
  jobs: Job[];
  onSaved?: (incident: Incident) => void;
}) {
  const { toast } = useToast();
  const create = useCreateIncident();
  const update = useUpdateIncident();
  const [form, setForm] = useState<FormState>(blank);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // "Someone else" (not on the roster) is a UI choice, set once per opening.
  const [pickOther, setPickOther] = useState(false);
  useEffect(() => {
    if (!open) return;
    const next = editing ? fromIncident(editing) : blank();
    setForm(next);
    setPickOther(!next.injured_employee_id && !!next.injured_person);
  }, [open, editing]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const legacy = editing?.source === 'legacy';
  // A Site Safety record stays in its book: an injury cannot become a near
  // miss (or the other way round) by editing.
  const typeOptions =
    editing && !legacy
      ? TYPES.filter((t) => (editing.source === 'accident') === (t.value === 'injury'))
      : TYPES;

  // Archived people drop off the picker, except the one already named on this
  // report, otherwise editing it would quietly unlink them.
  const roster = employees.filter(
    (e) => e.status !== 'Archived' || e.id === form.injured_employee_id
  );
  const injuredOptions = [
    ...roster.map((e) => ({ value: e.id, label: e.name, description: e.role || undefined })),
    {
      value: '__other',
      label: 'Someone else',
      description: 'Member of the public, client or another trade',
    },
  ];
  const jobOptions = [
    { value: '__none', label: 'No job' },
    ...jobs
      .filter((j) => j.status !== 'Completed' && j.status !== 'Cancelled')
      .map((j) => ({ value: j.id, label: j.title, description: j.location || undefined })),
  ];
  if (form.job_id && !jobOptions.some((o) => o.value === form.job_id)) {
    const j = jobs.find((x) => x.id === form.job_id);
    if (j) jobOptions.push({ value: j.id, label: j.title, description: j.location || undefined });
  }

  const injury = form.incident_type === 'injury';
  const accidentBook = injury && !legacy;

  const addPhotos = async (files: FileList | null) => {
    if (!files?.length) return;
    const room = MAX_PHOTOS - form.photos.length;
    const list = Array.from(files).slice(0, room);
    setUploading(true);
    try {
      const paths: string[] = [];
      for (const f of list) paths.push(await uploadIncidentPhoto(f));
      setForm((s) => ({ ...s, photos: [...s.photos, ...paths] }));
    } catch (e) {
      toast({
        title: 'Photo not added',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const missing = (() => {
    if (legacy && !form.title.trim()) return 'Add a short title.';
    if (!form.description.trim()) return 'Say what happened.';
    if (!form.location.trim()) return 'Say where it happened.';
    if (accidentBook) {
      if (!(form.injured_employee_id || form.injured_person.trim())) return 'Say who was hurt.';
      if (!form.injury_type) return 'Pick the injury.';
      if (!form.body_part) return 'Pick where on the body.';
    }
    return null;
  })();
  const saving = create.isPending || update.isPending;

  const submit = async () => {
    const days =
      form.days_off.trim() === '' ? null : Math.max(0, Math.round(Number(form.days_off)));
    const injured = roster.find((e) => e.id === form.injured_employee_id);
    const payload = {
      incident_type: form.incident_type,
      severity: form.severity,
      ...(legacy ? { title: form.title.trim() } : {}),
      description: form.description.trim(),
      location: form.location.trim(),
      job_id: form.job_id || null,
      date_occurred: form.date_occurred,
      immediate_action_taken: form.immediate_action_taken.trim(),
      witnesses: form.witnesses.trim(),
      supervisor_notified: form.supervisor_notified,
      supervisor_name: form.supervisor_notified ? form.supervisor_name.trim() : '',
      photos: form.photos,
      ...(injury
        ? {
            injured_employee_id: injured?.id ?? null,
            injured_person: injured?.name ?? form.injured_person.trim(),
            injury_type: form.injury_type || null,
            body_part: form.body_part || null,
            injuries_sustained: form.injuries_sustained.trim(),
            first_aid_given: form.first_aid_given,
            hospital_visit: form.hospital_visit,
            days_off: Number.isFinite(days as number) ? days : null,
          }
        : {}),
    };
    const saved = editing
      ? await update.mutateAsync({ id: editing.id, toastTitle: 'Report updated', ...payload })
      : await create.mutateAsync({ ...payload, status: 'open' });
    onOpenChange(false);
    onSaved?.(saved);
  };

  const sevLabel = (s: SeverityLevel) => (injury ? INJURY_SEVERITY_LABEL[s] : SEVERITY_LABEL[s]);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Safety"
      title={editing ? 'Edit report' : 'Report an incident'}
      description={
        editing
          ? undefined
          : 'Log it while it is fresh. It is filed in the firm’s Site Safety records, and you can add the investigation after.'
      }
      width="wide"
      footer={
        <div className="space-y-2">
          {missing && <p className="text-center text-[12.5px] text-white">{missing}</p>}
          <div className="flex gap-2">
            <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton fullWidth onClick={submit} disabled={!!missing || saving || uploading}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Log report'}
            </PrimaryButton>
          </div>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Left: what happened */}
        <div className="space-y-5">
          <Field label="What kind" required>
            <div data-help="incidents.form-type">
              <MobileSelectPicker
                value={form.incident_type}
                onValueChange={(v) => set('incident_type', v as IncidentType)}
                options={typeOptions}
                title="What kind of report"
              />
            </div>
          </Field>

          <Field label={injury ? 'How bad' : 'How serious'} required>
            <div className="grid grid-cols-4 gap-2">
              {SEVERITIES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={form.severity === s}
                  className={chipCn(form.severity === s)}
                  onClick={() => set('severity', s)}
                >
                  {sevLabel(s)}
                </button>
              ))}
            </div>
          </Field>

          {legacy && (
            <Field label="Short title" required>
              <Input
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="e.g. Cut hand on bench saw"
                className={inputClass}
              />
            </Field>
          )}

          <Field label="What happened" required>
            <Textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={4}
              placeholder="What was being done, what went wrong, and who was involved"
              className={textareaClass}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Where" required>
              <Input
                value={form.location}
                onChange={(e) => set('location', e.target.value)}
                placeholder="Site and exact spot"
                className={inputClass}
              />
            </Field>
            <Field label="When">
              <Input
                type="datetime-local"
                value={toLocalInput(form.date_occurred)}
                max={toLocalInput(new Date().toISOString())}
                onChange={(e) =>
                  e.target.value && set('date_occurred', new Date(e.target.value).toISOString())
                }
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Job">
            <MobileSelectPicker
              value={form.job_id || '__none'}
              onValueChange={(v) => set('job_id', v === '__none' ? '' : v)}
              options={jobOptions}
              title="Which job"
            />
          </Field>

          <Field label="Photos" hint="The hazard, the scene, the equipment. Up to 6.">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
              {form.photos.map((p) => (
                <div
                  key={p}
                  className="relative aspect-square overflow-hidden rounded-lg border border-white/[0.1]"
                >
                  <StoragePhoto src={p} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    aria-label="Remove photo"
                    onClick={() =>
                      set(
                        'photos',
                        form.photos.filter((x) => x !== p)
                      )
                    }
                    className="absolute right-0 top-0 flex h-11 w-11 items-start justify-end p-1 touch-manipulation"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/80">
                      <X className="h-3.5 w-3.5 text-white" />
                    </span>
                  </button>
                </div>
              ))}
              {form.photos.length < MAX_PHOTOS && (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-white/30 text-white touch-manipulation"
                >
                  <Camera className="h-5 w-5" />
                  <span className="text-[11px]">{uploading ? 'Adding…' : 'Add'}</span>
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => addPhotos(e.target.files)}
            />
          </Field>
        </div>

        {/* Right: who was hurt, and what was done on the day */}
        <div className="space-y-5">
          {injury && (
            <div className="space-y-5">
              <h3 className="text-[15px] font-semibold text-white">Who was hurt</h3>
              <Field label="Injured person" required={accidentBook}>
                <MobileSelectPicker
                  value={pickOther ? '__other' : form.injured_employee_id}
                  onValueChange={(v) => {
                    if (v === '__other') {
                      setPickOther(true);
                      set('injured_employee_id', '');
                    } else {
                      setPickOther(false);
                      setForm((f) => ({ ...f, injured_employee_id: v, injured_person: '' }));
                    }
                  }}
                  options={injuredOptions}
                  placeholder="Choose a person"
                  title="Who was hurt"
                />
              </Field>
              {pickOther && (
                <Field label="Their name">
                  <Input
                    value={form.injured_person}
                    onChange={(e) => set('injured_person', e.target.value)}
                    className={inputClass}
                  />
                </Field>
              )}
              {!legacy && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Injury" required>
                    <MobileSelectPicker
                      value={form.injury_type}
                      onValueChange={(v) => set('injury_type', v)}
                      options={INJURY_TYPES}
                      placeholder="Choose the injury"
                      title="Injury"
                    />
                  </Field>
                  <Field label="Where on the body" required>
                    <MobileSelectPicker
                      value={form.body_part}
                      onValueChange={(v) => set('body_part', v)}
                      options={BODY_PARTS}
                      placeholder="Choose where"
                      title="Where on the body"
                    />
                  </Field>
                </div>
              )}
              <Field label="Injuries" hint="The RIDDOR report uses this.">
                <Textarea
                  value={form.injuries_sustained}
                  onChange={(e) => set('injuries_sustained', e.target.value)}
                  rows={2}
                  placeholder="e.g. Laceration to left palm, 4 stitches"
                  className={textareaClass}
                />
              </Field>
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="flex min-h-[44px] cursor-pointer items-center gap-3 touch-manipulation">
                  <Checkbox
                    checked={form.first_aid_given}
                    onCheckedChange={(c) => set('first_aid_given', c === true)}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white">First aid given</span>
                </label>
                <label className="flex min-h-[44px] cursor-pointer items-center gap-3 touch-manipulation">
                  <Checkbox
                    checked={form.hospital_visit}
                    onCheckedChange={(c) => set('hospital_visit', c === true)}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white">Went to hospital</span>
                </label>
              </div>
              <Field
                label="Days off work"
                hint="Over 7 days in a row, not counting the day itself, makes it reportable."
              >
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={form.days_off}
                  onChange={(e) => set('days_off', e.target.value)}
                  placeholder="Leave blank if not known yet"
                  className={inputClass}
                />
              </Field>
            </div>
          )}

          <div className={cn('space-y-5', injury && 'border-t border-white/[0.1] pt-5')}>
            <Field label={injury && !legacy ? 'First aid and action on the day' : 'Action on the day'}>
              <Textarea
                value={form.immediate_action_taken}
                onChange={(e) => set('immediate_action_taken', e.target.value)}
                rows={2}
                placeholder="e.g. Area isolated, first aid given"
                className={textareaClass}
              />
            </Field>
            <Field label="Witnesses">
              <Input
                value={form.witnesses}
                onChange={(e) => set('witnesses', e.target.value)}
                placeholder="Names"
                className={inputClass}
              />
            </Field>
            <label className="flex min-h-[44px] cursor-pointer items-center gap-3 touch-manipulation">
              <Checkbox
                checked={form.supervisor_notified}
                onCheckedChange={(c) => set('supervisor_notified', c === true)}
                className={checkboxClass}
              />
              <span className="text-sm text-white">Supervisor told</span>
            </label>
            {form.supervisor_notified && (
              <Field label="Supervisor">
                <Input
                  value={form.supervisor_name}
                  onChange={(e) => set('supervisor_name', e.target.value)}
                  className={inputClass}
                />
              </Field>
            )}
          </div>
        </div>
      </div>
    </FormSheet>
  );
}
