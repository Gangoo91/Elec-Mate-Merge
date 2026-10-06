/**
 * Report or edit a safety incident from the office (ELE-1945).
 * One form for both: create starts blank, edit starts from the record.
 */
import { useEffect, useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  SheetShell,
  Field,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  checkboxClass,
} from '@/components/employer/editorial';
import { useToast } from '@/hooks/use-toast';
import { useStorageUrls } from '@/utils/storageUrls';
import { cn } from '@/lib/utils';
import type { Employee } from '@/services/employeeService';
import type { Job } from '@/services/jobService';
import {
  uploadIncidentPhoto,
  useCreateIncident,
  useUpdateIncident,
  type Incident,
  type IncidentType,
  type SeverityLevel,
} from '@/hooks/useIncidents';

const TYPES: { value: IncidentType; label: string }[] = [
  { value: 'near_miss', label: 'Near miss' },
  { value: 'injury', label: 'Injury' },
  { value: 'unsafe_practice', label: 'Unsafe practice' },
  { value: 'faulty_equipment', label: 'Faulty equipment' },
  { value: 'property_damage', label: 'Property damage' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'security', label: 'Security' },
  { value: 'other', label: 'Other' },
];

const SEVERITIES: { value: SeverityLevel; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

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
  injuries_sustained: i.injuries_sustained ?? '',
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
  // Deriving it from the form on every keystroke hid the "Their name" field
  // the moment it was cleared.
  const [pickOther, setPickOther] = useState(false);
  useEffect(() => {
    if (!open) return;
    const next = editing ? fromIncident(editing) : blank();
    setForm(next);
    setPickOther(!next.injured_employee_id && !!next.injured_person);
  }, [open, editing]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));
  const { urls: photoUrls } = useStorageUrls('visual-uploads', form.photos);

  // Archived people drop off the picker, except the one already named on this
  // report — otherwise editing it would quietly unlink them.
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
  // Keep the current job pickable on edit even if it has since closed.
  if (form.job_id && !jobOptions.some((o) => o.value === form.job_id)) {
    const j = jobs.find((x) => x.id === form.job_id);
    if (j) jobOptions.push({ value: j.id, label: j.title, description: j.location || undefined });
  }

  const injury = form.incident_type === 'injury';

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

  const valid = form.title.trim() && form.description.trim() && form.location.trim();
  const saving = create.isPending || update.isPending;

  const submit = async () => {
    const days =
      form.days_off.trim() === '' ? null : Math.max(0, Math.round(Number(form.days_off)));
    const injured = roster.find((e) => e.id === form.injured_employee_id);
    const payload = {
      incident_type: form.incident_type,
      severity: form.severity,
      title: form.title.trim(),
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06]"
      >
        <SheetShell
          eyebrow="Safety"
          title={editing ? 'Edit report' : 'Report an incident'}
          description={
            editing
              ? undefined
              : 'Log it now while it is fresh. You can add the investigation after.'
          }
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={submit} disabled={!valid || saving || uploading}>
                {saving ? 'Saving…' : editing ? 'Save changes' : 'Log report'}
              </PrimaryButton>
            </>
          }
        >
          <Field label="What kind" required>
            <MobileSelectPicker
              value={form.incident_type}
              onValueChange={(v) => set('incident_type', v as IncidentType)}
              options={TYPES}
              title="What kind of incident"
            />
          </Field>

          <Field label="How serious" required>
            <div className="grid grid-cols-4 gap-2">
              {SEVERITIES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className={chipCn(form.severity === s.value)}
                  onClick={() => set('severity', s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Short title" required>
            <Input
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. Cut hand on bench saw"
              className={inputClass}
            />
          </Field>

          <Field label="What happened" required>
            <Textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={4}
              placeholder="What was being done, what went wrong, and who was involved"
              className={textareaClass}
            />
          </Field>

          <FormGrid cols={2}>
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
          </FormGrid>

          <Field label="Job">
            <MobileSelectPicker
              value={form.job_id || '__none'}
              onValueChange={(v) => set('job_id', v === '__none' ? '' : v)}
              options={jobOptions}
              title="Which job"
            />
          </Field>

          <Field label="Photos" hint="The hazard, the scene, the equipment. Up to 6.">
            <div className="grid grid-cols-4 gap-2">
              {form.photos.map((p) => (
                <div
                  key={p}
                  className="relative aspect-square overflow-hidden rounded-lg border border-white/[0.1]"
                >
                  {photoUrls[p] ? (
                    <img src={photoUrls[p]} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-white/[0.06] animate-pulse" />
                  )}
                  <button
                    type="button"
                    aria-label="Remove photo"
                    onClick={() =>
                      set(
                        'photos',
                        form.photos.filter((x) => x !== p)
                      )
                    }
                    className="absolute right-0 top-0 h-11 w-11 flex items-start justify-end p-1 touch-manipulation"
                  >
                    <span className="h-6 w-6 rounded-full bg-black/80 flex items-center justify-center">
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
                  className="aspect-square rounded-lg border border-dashed border-white/30 flex flex-col items-center justify-center gap-1 text-white touch-manipulation"
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

          {injury && (
            <div className="space-y-4 border-t border-white/[0.1] pt-4">
              <h3 className="text-sm font-semibold text-white">Who was hurt</h3>
              <Field label="Injured person">
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
              <Field label="Injuries" hint="The RIDDOR report uses this.">
                <Textarea
                  value={form.injuries_sustained}
                  onChange={(e) => set('injuries_sustained', e.target.value)}
                  rows={2}
                  placeholder="e.g. Laceration to left palm, 4 stitches"
                  className={textareaClass}
                />
              </Field>
              <FormGrid cols={2}>
                <label className="flex items-center gap-3 min-h-[44px] touch-manipulation cursor-pointer">
                  <Checkbox
                    checked={form.first_aid_given}
                    onCheckedChange={(c) => set('first_aid_given', c === true)}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white">First aid given</span>
                </label>
                <label className="flex items-center gap-3 min-h-[44px] touch-manipulation cursor-pointer">
                  <Checkbox
                    checked={form.hospital_visit}
                    onCheckedChange={(c) => set('hospital_visit', c === true)}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white">Went to hospital</span>
                </label>
              </FormGrid>
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

          <div className="space-y-4 border-t border-white/[0.1] pt-4">
            <Field label="Immediate action on the day">
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
            <label className="flex items-center gap-3 min-h-[44px] touch-manipulation cursor-pointer">
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
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
