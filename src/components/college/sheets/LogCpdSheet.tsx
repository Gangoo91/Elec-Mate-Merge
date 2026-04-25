import { useEffect, useMemo, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  Field,
  FormCard,
  FormGrid,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  SuccessCheckmark,
} from '@/components/college/primitives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStaffCpdEntries, type CpdEntry } from '@/hooks/useStaffCpdEntries';

/* ==========================================================================
   LogCpdSheet — quick CPD entry + this-year recent list.
   Mobile-first 90vh bottom sheet, same chrome as the rest of the college hub.
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:h-[88vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow={`CPD · ${currentYear}`}
          title="Log CPD activity"
          description={`For ${staffName} · ${totalThisYear}/${targetHours} hrs logged`}
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)} disabled={submitting}>
                Done
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={handleSave} disabled={submitting}>
                {submitting
                  ? 'Saving…'
                  : `Log ${proposedHours || ''} hr${proposedHours === 1 ? '' : 's'}`.trim() + ' →'}
              </PrimaryButton>
            </>
          }
        >
          {/* Live progress */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                  Annual progress
                </div>
                <div className="mt-1 text-[18px] font-semibold tabular-nums text-white">
                  {totalThisYear}
                  <span className="text-white text-[14px]"> / {targetHours} hrs</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white">
                  After saving
                </div>
                <div className="mt-1 text-[14px] font-medium tabular-nums text-elec-yellow">
                  {projectedTotal}/{targetHours} · {projectedPct}%
                </div>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden relative">
              {/* Existing total */}
              <div
                className="absolute inset-y-0 left-0 bg-emerald-400/85 transition-all"
                style={{ width: `${Math.min(100, (totalThisYear / targetHours) * 100)}%` }}
              />
              {/* Proposed addition (translucent overlay) */}
              {proposedHours > 0 && (
                <div
                  className="absolute inset-y-0 bg-elec-yellow/70 transition-all"
                  style={{
                    left: `${Math.min(100, (totalThisYear / targetHours) * 100)}%`,
                    width: `${Math.min(
                      100 - Math.min(100, (totalThisYear / targetHours) * 100),
                      (proposedHours / targetHours) * 100
                    )}%`,
                  }}
                />
              )}
            </div>
          </div>

          <FormCard eyebrow="What did you do?">
            <Field label="Title" required>
              <input
                value={form.title}
                onChange={(e) => update({ title: e.target.value })}
                className={inputClass}
                placeholder='e.g. "BS 7671 A4:2026 update webinar"'
              />
            </Field>
            <Field label="Activity type" required>
              <Select
                value={form.activity_type}
                onValueChange={(v) => update({ activity_type: v })}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Pick a type…" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {ACTIVITY_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {QUICK_TYPES.map((v) => {
                  const t = ACTIVITY_TYPES.find((x) => x.value === v);
                  if (!t) return null;
                  const active = form.activity_type === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => update({ activity_type: v })}
                      className={cn(
                        'h-7 px-2.5 rounded-full text-[11px] font-medium border transition-colors touch-manipulation',
                        active
                          ? 'bg-elec-yellow text-black border-elec-yellow'
                          : 'bg-[hsl(0_0%_14%)] border-white/[0.08] text-white hover:text-white hover:border-white/[0.18]'
                      )}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </Field>
          </FormCard>

          <FormCard eyebrow="When & how long">
            <FormGrid cols={2}>
              <Field label="Date">
                <input
                  type="date"
                  value={form.activity_date}
                  max={todayIso()}
                  onChange={(e) => update({ activity_date: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Hours" required>
                <input
                  type="number"
                  min="0.25"
                  step="0.25"
                  value={form.hours}
                  onChange={(e) => update({ hours: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <div className="flex flex-wrap gap-1.5">
              {HOUR_PRESETS.map((h) => {
                const active = String(h) === form.hours;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => update({ hours: String(h) })}
                    className={cn(
                      'h-7 px-2.5 rounded-full text-[11px] font-medium tabular-nums border transition-colors touch-manipulation',
                      active
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-[hsl(0_0%_14%)] border-white/[0.08] text-white hover:text-white hover:border-white/[0.18]'
                    )}
                  >
                    {h}h
                  </button>
                );
              })}
            </div>
          </FormCard>

          <FormCard eyebrow="Reflection (recommended)">
            <Field
              label="What did you learn? How will it change practice?"
              hint="Auditors love a sentence or two — it shows impact, not just attendance."
            >
              <textarea
                value={form.reflection}
                onChange={(e) => update({ reflection: e.target.value })}
                rows={3}
                className={cn(textareaClass, 'min-h-[80px]')}
                placeholder="Two key takeaways, one thing I'll do differently in lessons…"
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Evidence (optional)">
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
                'border border-dashed rounded-xl px-4 py-4 text-center transition-colors touch-manipulation',
                dragOver
                  ? 'border-elec-yellow/60 bg-elec-yellow/[0.04]'
                  : 'border-white/[0.12] bg-[hsl(0_0%_9%)]'
              )}
            >
              {form.pending_file ? (
                <div className="flex items-center gap-3 text-left">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                    <span aria-hidden className="text-[13px]">
                      📄
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-white truncate">
                      {form.pending_file.name}
                    </div>
                    <div className="text-[10.5px] text-white tabular-nums">
                      {humanFileSize(form.pending_file.size)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => update({ pending_file: null })}
                    className="text-[11.5px] font-medium text-white/65 hover:text-red-300 transition-colors touch-manipulation"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-[12px] text-white">
                    Certificate, slides or screenshot —
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="ml-1 font-medium text-elec-yellow hover:text-elec-yellow/80 underline-offset-2 hover:underline touch-manipulation"
                    >
                      browse
                    </button>
                  </div>
                  <div className="mt-1 text-[10.5px] text-white">PDF, JPG, PNG · max 25MB</div>
                </>
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
          </FormCard>

          {/* Recent entries this year */}
          <section>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2.5">
              Logged this year · {thisYearEntries.length} entries
            </div>
            {loading && thisYearEntries.length === 0 ? (
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 py-4 animate-pulse">
                <div className="h-3 w-1/3 bg-white/[0.06] rounded" />
                <div className="mt-2 h-2 w-2/3 bg-white/[0.04] rounded" />
              </div>
            ) : thisYearEntries.length === 0 ? (
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5 text-center">
                <p className="text-[12px] text-white/65 leading-relaxed max-w-sm mx-auto">
                  Nothing logged for {currentYear} yet. Use the form above — it takes 30 seconds and
                  counts toward the {targetHours}-hour annual target.
                </p>
              </div>
            ) : (
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl divide-y divide-white/[0.04]">
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
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
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
    <div className="px-4 sm:px-5 py-3.5 flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-white truncate">{entry.title}</div>
        <div className="mt-0.5 text-[11px] text-white flex items-center flex-wrap gap-x-2.5 gap-y-0.5 tabular-nums">
          <span>
            {new Date(entry.activity_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span className="text-white/25">·</span>
          <span>{activityLabel(entry.activity_type)}</span>
          <span className="text-white/25">·</span>
          <span className="text-elec-yellow font-medium">{entry.hours}h</span>
          {filename && (
            <>
              <span className="text-white/25">·</span>
              <button
                type="button"
                onClick={onView}
                className="text-emerald-300/85 hover:text-emerald-200 transition-colors underline-offset-2 hover:underline touch-manipulation"
              >
                Evidence
              </button>
            </>
          )}
        </div>
        {entry.reflection && (
          <p className="mt-1 text-[11.5px] text-white/65 leading-snug line-clamp-2">
            {entry.reflection}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="shrink-0 h-8 px-2.5 rounded-md text-[11px] font-medium text-white hover:text-red-300 hover:bg-red-500/[0.06] transition-colors touch-manipulation"
        aria-label="Delete CPD entry"
      >
        Delete
      </button>
    </div>
  );
}
