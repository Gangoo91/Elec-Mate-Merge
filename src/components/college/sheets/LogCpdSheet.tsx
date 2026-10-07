import { useEffect, useMemo, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { useStaffCpdEntries, type CpdEntry } from '@/hooks/useStaffCpdEntries';

/* ==========================================================================
   LogCpdSheet — quick CPD entry + this-year recent list.
   FormSheet, wide on desktop: the form on the left, this year's log on the right.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffId: string | null;
  staffName: string;
  /** Annual CPD target (defaults to 30 hrs for FE tutors). */
  targetHours?: number;
  onSaved?: () => void;
}

const ACTIVITY_TYPES = [
  { value: 'subject_knowledge', label: 'Subject knowledge update' },
  { value: 'pedagogy', label: 'Pedagogy / teaching practice' },
  { value: 'industry_placement', label: 'Industry placement / employer engagement' },
  { value: 'awarding_body', label: 'Awarding body briefing' },
  { value: 'safeguarding', label: 'Safeguarding refresher' },
  { value: 'standardisation', label: 'Standardisation meeting' },
  { value: 'mentoring', label: 'Mentoring / coaching' },
  { value: 'conference', label: 'Conference / webinar' },
  { value: 'reading', label: 'Reading / research' },
  { value: 'other', label: 'Other' },
];

const QUICK_TYPES = [
  'subject_knowledge',
  'pedagogy',
  'standardisation',
  'safeguarding',
  'awarding_body',
];

const HOUR_PRESETS = [0.5, 1, 2, 4, 6, 8];

interface FormState {
  title: string;
  activity_type: string;
  activity_date: string;
  hours: string;
  reflection: string;
  pending_file: File | null;
}

const todayIso = () => new Date().toISOString().slice(0, 10);

const EMPTY: FormState = {
  title: '',
  activity_type: '',
  activity_date: todayIso(),
  hours: '1',
  reflection: '',
  pending_file: null,
};

function fileExt(filename: string): string {
  const m = filename.match(/\.([a-zA-Z0-9]+)$/);
  return m ? m[1].toLowerCase() : 'bin';
}

function humanFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function activityLabel(value: string): string {
  return ACTIVITY_TYPES.find((t) => t.value === value)?.label ?? value;
}

/* ──────────────────────────────────────────────────────── */

export function LogCpdSheet({
  open,
  onOpenChange,
  staffId,
  staffName,
  targetHours = 30,
  onSaved,
}: Props) {
  const { toast } = useToast();
  const { entries, loading, create, remove } = useStaffCpdEntries(staffId);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (open) setForm(EMPTY);
  }, [open]);

  const update = (patch: Partial<FormState>) => setForm((p) => ({ ...p, ...patch }));

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const onPickFile = (file: File | null) => {
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Max 25MB.',
        variant: 'destructive',
      });
      return;
    }
    update({ pending_file: file });
  };

  const currentYear = new Date().getFullYear();
  const thisYearEntries = useMemo(
    () => entries.filter((e) => e.year_covered === currentYear),
    [entries, currentYear]
  );
  const totalThisYear = useMemo(
    () => thisYearEntries.reduce((s, e) => s + Number(e.hours), 0),
    [thisYearEntries]
  );

  const proposedHours = Number(form.hours) || 0;
  const projectedTotal = totalThisYear + proposedHours;
  const projectedPct = Math.min(100, Math.round((projectedTotal / targetHours) * 100));

  const handleSave = async () => {
    if (!staffId) return;
    if (!form.title.trim()) {
      toast({
        title: 'Add a title',
        description: 'Describe the activity in a short title.',
        variant: 'destructive',
      });
      return;
    }
    if (!form.activity_type) {
      toast({
        title: 'Pick an activity type',
        description: 'Categorising helps your CPD audit.',
        variant: 'destructive',
      });
      return;
    }
    const hoursNum = Number(form.hours);
    if (!Number.isFinite(hoursNum) || hoursNum <= 0) {
      toast({
        title: 'Hours must be positive',
        variant: 'destructive',
      });
      return;
    }
    if (form.activity_date > todayIso()) {
      toast({
        title: "Date can't be in the future",
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      // Upload evidence if any
      let evidencePath: string | null = null;
      if (form.pending_file) {
        const ext = fileExt(form.pending_file.name);
        const path = `${staffId}/cpd-${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from('compliance-evidence')
          .upload(path, form.pending_file, { upsert: false });
        if (upErr) throw upErr;
        evidencePath = path;
      }

      await create({
        title: form.title.trim(),
        activity_type: form.activity_type,
        activity_date: form.activity_date,
        hours: hoursNum,
        reflection: form.reflection.trim() || null,
        evidence_path: evidencePath,
      });

      setShowSuccess(true);
      toast({
        title: 'CPD logged',
        description: `${hoursNum}h added — ${Math.min(100, Math.round(((totalThisYear + hoursNum) / targetHours) * 100))}% of annual target.`,
      });
      onSaved?.();
      // Reset form for another quick add
      setTimeout(() => {
        setShowSuccess(false);
        setForm(EMPTY);
      }, 700);
    } catch (e) {
      toast({
        title: 'Save failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (entry: CpdEntry) => {
    const confirmed = window.confirm(
      `Delete "${entry.title}" (${entry.hours}h)? Logged in audit trail.`
    );
    if (!confirmed) return;
    try {
      await remove(entry.id, entry.evidence_path);
      toast({ title: 'Entry removed' });
    } catch (e) {
      toast({
        title: 'Delete failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    }
  };

  const filenameFromPath = (path: string) => path.split('/').pop() ?? path;

  const existingPct = Math.min(100, (totalThisYear / targetHours) * 100);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={`CPD · ${currentYear}`}
      title="Log CPD activity"
      description={`For ${staffName} · ${totalThisYear}/${targetHours} hrs logged`}
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
            className={buttonSecondaryCn}
          >
            Done
          </button>
          <button type="button" onClick={handleSave} disabled={submitting} className={buttonPrimaryCn}>
            {showSuccess
              ? 'Logged'
              : submitting
                ? 'Saving…'
                : proposedHours > 0
                  ? `Log ${proposedHours} hr${proposedHours === 1 ? '' : 's'}`
                  : 'Log hours'}
          </button>
        </div>
      }
    >
      <div className="min-w-0 space-y-6">
        {/* Live progress */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[12px] font-medium text-white">Annual progress</p>
              <p className="mt-0.5 text-[20px] font-semibold tabular-nums text-white">
                {totalThisYear}
                <span className="text-[14px] font-medium"> / {targetHours} hrs</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[12px] font-medium text-white">After saving</p>
              <p className="mt-0.5 text-[14px] font-semibold tabular-nums text-white">
                {projectedTotal}/{targetHours} · {projectedPct}%
              </p>
            </div>
          </div>
          <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="absolute inset-y-0 left-0 bg-emerald-400 transition-all"
              style={{ width: `${existingPct}%` }}
            />
            {proposedHours > 0 && (
              <div
                className="absolute inset-y-0 bg-elec-yellow transition-all"
                style={{
                  left: `${existingPct}%`,
                  width: `${Math.min(100 - existingPct, (proposedHours / targetHours) * 100)}%`,
                }}
              />
            )}
          </div>
        </div>

        <div className="h-px bg-white/[0.08]" />

        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">What did you do?</h3>
          <div>
            <label className={labelCn} htmlFor="cpd-title">
              Title
            </label>
            <input
              id="cpd-title"
              value={form.title}
              onChange={(e) => update({ title: e.target.value })}
              className={inputCn}
              placeholder='e.g. "BS 7671 A4:2026 update webinar"'
            />
          </div>
          <div>
            <p className={labelCn}>Activity type</p>
            <MobileSelectPicker
              triggerClassName={selectTriggerCn}
              value={form.activity_type}
              onValueChange={(v) => update({ activity_type: v })}
              title="Activity type"
              placeholder="Pick a type"
              options={ACTIVITY_TYPES}
            />
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {QUICK_TYPES.map((v) => {
                const t = ACTIVITY_TYPES.find((x) => x.value === v);
                if (!t) return null;
                const active = form.activity_type === v;
                return (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={active}
                    onClick={() => update({ activity_type: v })}
                    className={chipCn(active)}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="h-px bg-white/[0.08]" />

        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">When and how long</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className={labelCn} htmlFor="cpd-date">
                Date
              </label>
              <input
                id="cpd-date"
                type="date"
                value={form.activity_date}
                max={todayIso()}
                onChange={(e) => update({ activity_date: e.target.value })}
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="cpd-hours">
                Hours
              </label>
              <input
                id="cpd-hours"
                type="number"
                inputMode="decimal"
                min="0.25"
                step="0.25"
                value={form.hours}
                onChange={(e) => update({ hours: e.target.value })}
                className={inputCn}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {HOUR_PRESETS.map((h) => {
              const active = String(h) === form.hours;
              return (
                <button
                  key={h}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ hours: String(h) })}
                  className={cn(chipCn(active), 'tabular-nums')}
                >
                  {h}h
                </button>
              );
            })}
          </div>
        </section>

        <div className="h-px bg-white/[0.08]" />

        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">Reflection (recommended)</h3>
          <div>
            <label className={labelCn} htmlFor="cpd-reflection">
              What did you learn? How will it change practice?
            </label>
            <textarea
              id="cpd-reflection"
              value={form.reflection}
              onChange={(e) => update({ reflection: e.target.value })}
              rows={3}
              className={cn(textareaCn, 'min-h-[100px]')}
              placeholder="Two key takeaways, one thing I'll do differently in lessons…"
            />
            <p className="mt-1.5 text-[12px] leading-snug text-white">
              A sentence or two shows auditors impact, not just attendance.
            </p>
          </div>
        </section>

        <div className="h-px bg-white/[0.08]" />

        <section className="space-y-3">
          <h3 className="text-[15px] font-semibold text-white">Evidence (optional)</h3>
          <div
            onDragEnter={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragOver(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              onPickFile(e.dataTransfer.files?.[0] ?? null);
            }}
            className={cn(
              'rounded-xl border border-dashed px-4 py-4 transition-colors touch-manipulation',
              dragOver ? 'border-elec-yellow bg-white/[0.04]' : 'border-white/[0.15]'
            )}
          >
            {form.pending_file ? (
              <div className="flex items-center gap-3 text-left">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-white">{form.pending_file.name}</p>
                  <p className="text-[12px] tabular-nums text-white">
                    {humanFileSize(form.pending_file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => update({ pending_file: null })}
                  className="h-11 shrink-0 px-2 text-[13px] font-medium text-white transition-colors hover:text-red-300 touch-manipulation"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-[13px] text-white">
                  Certificate, slides or screenshot.
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="ml-1 font-semibold text-elec-yellow underline-offset-2 hover:underline touch-manipulation"
                  >
                    Browse
                  </button>
                </p>
                <p className="mt-1 text-[12px] text-white">PDF, JPG, PNG · max 25MB</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="application/pdf,image/*"
              onChange={(e) => {
                onPickFile(e.target.files?.[0] ?? null);
                e.target.value = '';
              }}
            />
          </div>
        </section>
      </div>

      {/* Recent entries this year */}
      <section className="min-w-0 border-t border-white/[0.08] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <h3 className="text-[15px] font-semibold text-white">
          Logged this year · {thisYearEntries.length} {thisYearEntries.length === 1 ? 'entry' : 'entries'}
        </h3>
        {loading && thisYearEntries.length === 0 ? (
          <div className="mt-3 animate-pulse py-3">
            <div className="h-3 w-1/3 rounded bg-white/[0.08]" />
            <div className="mt-2 h-2 w-2/3 rounded bg-white/[0.06]" />
          </div>
        ) : thisYearEntries.length === 0 ? (
          <p className="mt-2 text-[13px] leading-relaxed text-white">
            Nothing logged for {currentYear} yet. The form takes 30 seconds and counts toward the{' '}
            {targetHours}-hour annual target.
          </p>
        ) : (
          <div className="mt-2 divide-y divide-white/[0.08]">
            {thisYearEntries.map((e) => (
              <CpdRow
                key={e.id}
                entry={e}
                onDelete={() => handleDelete(e)}
                onView={async () => {
                  if (!e.evidence_path) return;
                  const { data, error } = await supabase.storage
                    .from('compliance-evidence')
                    .createSignedUrl(e.evidence_path, 60);
                  if (data?.signedUrl) {
                    window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
                  } else if (error) {
                    toast({
                      title: 'Could not open',
                      description: error.message,
                      variant: 'destructive',
                    });
                  }
                }}
                filename={e.evidence_path ? filenameFromPath(e.evidence_path) : null}
              />
            ))}
          </div>
        )}
      </section>
    </FormSheet>
  );
}

/* ──────────────────────────────────────────────────────── */

function CpdRow({
  entry,
  onDelete,
  onView,
  filename,
}: {
  entry: CpdEntry;
  onDelete: () => void;
  onView: () => void;
  filename: string | null;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-medium text-white">{entry.title}</p>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] tabular-nums text-white">
          <span>
            {new Date(entry.activity_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span>·</span>
          <span>{activityLabel(entry.activity_type)}</span>
          <span>·</span>
          <span className="font-semibold">{entry.hours}h</span>
          {filename && (
            <>
              <span>·</span>
              <button
                type="button"
                onClick={onView}
                className="font-medium text-elec-yellow underline-offset-2 hover:underline touch-manipulation"
              >
                Evidence
              </button>
            </>
          )}
        </div>
        {entry.reflection && (
          <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-white">{entry.reflection}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="h-11 shrink-0 px-2 text-[12.5px] font-medium text-white transition-colors hover:text-red-300 touch-manipulation"
        aria-label="Delete CPD entry"
      >
        Delete
      </button>
    </div>
  );
}
