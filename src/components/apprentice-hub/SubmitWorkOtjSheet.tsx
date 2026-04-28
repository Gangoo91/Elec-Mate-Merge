import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/* ==========================================================================
   SubmitWorkOtjSheet — apprentice-side. Submit a work-based off-the-job
   training activity for tutor verification. Distinct from the apprentice's
   in-app time tracking (which auto-counts) — this path goes to
   college_otj_entries with source_kind='apprentice_submitted' and
   verification_status='pending', so the tutor can verify it for the
   ESFA-defensible "verified hours" total.

   Photos optionally upload to the portfolio-evidence bucket and become the
   evidence_urls array on the entry.
   ========================================================================== */

interface Prefill {
  title?: string;
  description?: string;
  duration_minutes?: number;
  activity_type?: string;
  unit_codes?: string[];
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Fired after a successful insert. Receives the new row's id so callers
      can persist filed-state (e.g. AI write-back proposal tracking). */
  onSubmitted?: (insertedId: string | null) => void;
  /** Optional pre-fill from an AI-drafted proposal. Apprentice can edit
      anything before submitting — nothing is auto-filed. */
  prefill?: Prefill;
}

// Subset of the schema's activity_type values, ordered for work-based first.
// 'workshop' / 'one_to_one' are intentionally hidden — those are college-led.
const ACTIVITY_TYPES: Array<{ value: string; label: string; hint: string }> = [
  { value: 'practical', label: 'Practical work', hint: 'Hands-on install / fault-find on site' },
  { value: 'shadowing', label: 'Shadowing', hint: 'Watching a qualified electrician work' },
  {
    value: 'manufacturer_training',
    label: 'Manufacturer training',
    hint: 'CPD from a kit supplier',
  },
  {
    value: 'industry_visit',
    label: 'Industry visit',
    hint: 'Site visit, factory tour, exhibition',
  },
  {
    value: 'employer_meeting',
    label: 'Toolbox talk / briefing',
    hint: 'Workplace H&S, method, debrief',
  },
  { value: 'simulation', label: 'Simulation', hint: 'Rig-based or off-the-tools practice' },
  { value: 'mentoring', label: 'Mentoring', hint: '1-2-1 with a senior — work-based' },
  { value: 'theory', label: 'Theory study', hint: 'Background reading at work, regs review' },
  { value: 'assessment', label: 'Assessment / observation', hint: 'Being assessed on a task' },
  { value: 'other', label: 'Other work-based', hint: 'Something else — describe in notes' },
];

const DURATION_PRESETS = [30, 60, 90, 120, 180, 240];

const todayIso = () => new Date().toISOString().slice(0, 10);

interface FormState {
  activity_date: string;
  activity_type: string;
  title: string;
  duration_minutes: string;
  description: string;
  unit_codes_text: string;
}

function emptyForm(): FormState {
  return {
    activity_date: todayIso(),
    activity_type: 'practical',
    title: '',
    duration_minutes: '',
    description: '',
    unit_codes_text: '',
  };
}

export function SubmitWorkOtjSheet({ open, onOpenChange, onSubmitted, prefill }: Props) {
  const [form, setForm] = useState<FormState>(emptyForm());
  const [photos, setPhotos] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Single open-time effect: when the sheet opens, either hydrate from the
  // AI-drafted prefill or start from an empty form. Apprentice keeps full
  // edit control — nothing is auto-filed. Fires only on the open transition
  // (refs to prefill captured then), so editing won't be wiped if the parent
  // re-renders mid-edit.
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (open && !wasOpenRef.current) {
      if (prefill) {
        setForm({
          activity_date: todayIso(),
          activity_type: prefill.activity_type ?? 'practical',
          title: prefill.title ?? '',
          duration_minutes:
            prefill.duration_minutes != null ? String(prefill.duration_minutes) : '',
          description: prefill.description ?? '',
          unit_codes_text:
            prefill.unit_codes && prefill.unit_codes.length > 0
              ? prefill.unit_codes.join(', ')
              : '',
        });
      } else {
        setForm(emptyForm());
      }
      setPhotos([]);
      setSavedTick(false);
    }
    wasOpenRef.current = open;
  }, [open, prefill]);

  const minutes = Number(form.duration_minutes) || 0;
  const valid =
    form.title.trim().length > 0 &&
    minutes > 0 &&
    minutes <= 1440 &&
    form.description.trim().length >= 12 &&
    form.activity_date.length === 10;

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const next = [...photos];
    for (const f of Array.from(files)) {
      if (next.length >= 4) break;
      if (f.size > 8 * 1024 * 1024) continue; // 8MB cap
      next.push(f);
    }
    setPhotos(next);
  };

  const handleSubmit = async () => {
    if (!valid || saving) return;
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) throw new Error('Not signed in');

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', uid)
        .maybeSingle();
      const recordedByName = (profile?.full_name as string | null) ?? null;

      const { data: cs } = await supabase
        .from('college_students')
        .select('college_id')
        .eq('user_id', uid)
        .maybeSingle();
      const collegeId = (cs?.college_id as string | null) ?? null;

      // Upload any photos in parallel into the portfolio-evidence bucket
      // under a per-user / per-day prefix.
      const evidenceUrls: string[] = [];
      if (photos.length > 0) {
        const datePrefix = form.activity_date.replace(/-/g, '');
        const uploads = photos.map(async (file, i) => {
          const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
          const path = `otj/${uid}/${datePrefix}/${Date.now()}_${i}.${ext}`;
          const { error: upErr } = await supabase.storage
            .from('portfolio-evidence')
            .upload(path, file, { upsert: false, contentType: file.type });
          if (upErr) throw upErr;
          const { data: pub } = supabase.storage.from('portfolio-evidence').getPublicUrl(path);
          return pub.publicUrl;
        });
        const urls = await Promise.all(uploads);
        evidenceUrls.push(...urls);
      }

      const unitCodes = form.unit_codes_text
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const { data: inserted, error: insErr } = await supabase
        .from('college_otj_entries')
        .insert({
          college_id: collegeId,
          student_id: uid,
          recorded_by: uid,
          recorded_by_name_snapshot: recordedByName,
          activity_date: form.activity_date,
          activity_type: form.activity_type,
          title: form.title.trim(),
          description: form.description.trim(),
          duration_minutes: minutes,
          unit_codes: unitCodes,
          evidence_url: evidenceUrls[0] ?? null,
          evidence_urls: evidenceUrls.length > 0 ? evidenceUrls : null,
          source: 'apprentice',
          source_kind: 'apprentice_submitted',
          verification_status: 'pending',
        })
        .select('id')
        .maybeSingle();
      if (insErr) throw insErr;

      setSavedTick(true);
      toast({
        title: 'Sent to your tutor',
        description: `${minutes}m · ${form.title.trim()} — awaiting verification.`,
      });
      onSubmitted?.((inserted as { id?: string } | null)?.id ?? null);
      setTimeout(() => {
        setSavedTick(false);
        onOpenChange(false);
      }, 800);
    } catch (e) {
      toast({
        title: 'Could not submit',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10 bg-[hsl(0_0%_8%)]"
      >
        <SheetTitle className="sr-only">Submit work-based off-the-job training</SheetTitle>
        <div className="flex h-full flex-col">
          <header className="px-4 sm:px-5 pt-5 pb-4 border-b border-white/[0.06]">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
              Submit to tutor
            </div>
            <h2 className="mt-1 text-[18px] sm:text-[20px] font-semibold text-white leading-tight">
              Off-the-job work activity
            </h2>
            <p className="mt-1 text-[12.5px] text-white/85 leading-snug">
              Counts toward your ESFA-verified hours once your tutor signs it off. Be specific about
              what you did and what you learned — the AI checks the evidence too.
            </p>
          </header>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-5">
            <Field label="Date">
              <input
                type="date"
                value={form.activity_date}
                max={todayIso()}
                onChange={(e) => setForm((f) => ({ ...f, activity_date: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="Activity type">
              <div className="grid grid-cols-2 gap-1.5">
                {ACTIVITY_TYPES.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, activity_type: a.value }))}
                    className={cn(
                      'h-auto py-2 px-3 rounded-lg border text-left transition-colors touch-manipulation',
                      form.activity_type === a.value
                        ? 'border-emerald-400/40 bg-emerald-500/[0.08] text-white'
                        : 'border-white/[0.07] bg-white/[0.02] text-white/95 hover:text-white hover:border-white/[0.18]'
                    )}
                  >
                    <div className="text-[12.5px] font-medium leading-tight">{a.label}</div>
                    <div
                      className={cn(
                        'mt-0.5 text-[10.5px] leading-snug',
                        form.activity_type === a.value ? 'text-emerald-100/75' : 'text-white/95'
                      )}
                    >
                      {a.hint}
                    </div>
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Headline">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Replaced consumer unit on domestic install"
                maxLength={120}
                className={inputClass}
              />
            </Field>

            <Field label="Duration">
              <div className="space-y-2">
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={1440}
                  value={form.duration_minutes}
                  onChange={(e) => setForm((f) => ({ ...f, duration_minutes: e.target.value }))}
                  placeholder="Minutes"
                  className={inputClass}
                />
                <div className="flex items-center flex-wrap gap-1.5">
                  {DURATION_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, duration_minutes: String(p) }))}
                      className="h-8 px-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-[11px] font-medium text-white/95 hover:text-white hover:border-white/[0.22] transition-colors touch-manipulation tabular-nums"
                    >
                      {p < 60 ? `${p}m` : `${p / 60}h`}
                    </button>
                  ))}
                </div>
              </div>
            </Field>

            <Field
              label="What did you do — and what did you learn?"
              hint="At least 12 characters. Be specific — your tutor can't verify a vague entry."
            >
              <textarea
                value={form.description}
                rows={4}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="The job, the people you worked with, the kit, what was different from anything you'd done before, where you got stuck and how you solved it."
                className={textareaClass}
              />
              <div className="mt-1 text-right text-[10.5px] text-white/95 tabular-nums">
                {form.description.trim().length} chars
              </div>
            </Field>

            <Field label="Unit codes covered" hint="Optional. Comma-separated, e.g. 304, 305">
              <input
                type="text"
                value={form.unit_codes_text}
                onChange={(e) => setForm((f) => ({ ...f, unit_codes_text: e.target.value }))}
                placeholder="304, 305"
                className={inputClass}
              />
            </Field>

            <Field
              label="Photo evidence"
              hint="Up to 4 photos · 8MB each · optional but strengthens verification"
            >
              <div className="space-y-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={photos.length >= 4}
                  className="w-full h-11 rounded-lg border border-white/[0.10] bg-white/[0.02] text-[12.5px] font-medium text-white/95 hover:text-white hover:border-white/[0.22] transition-colors disabled:opacity-50 touch-manipulation"
                >
                  {photos.length === 0 ? 'Add photos' : `Add more (${photos.length}/4)`}
                </button>
                {photos.length > 0 && (
                  <ul className="space-y-1">
                    {photos.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-md border border-white/[0.06] bg-white/[0.02]"
                      >
                        <span className="truncate text-[12px] text-white/80">{p.name}</span>
                        <button
                          type="button"
                          onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                          className="text-[11px] text-white/85 hover:text-white tabular-nums"
                        >
                          remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Field>
          </div>

          <footer className="border-t border-white/[0.06] px-4 sm:px-5 py-3 flex items-center gap-2 bg-[hsl(0_0%_6%)]">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={saving}
              className="flex-1 h-11 rounded-lg border border-white/[0.10] bg-white/[0.02] text-[13px] font-medium text-white/80 hover:text-white hover:border-white/[0.22] transition-colors touch-manipulation disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!valid || saving}
              className={cn(
                'flex-1 h-11 rounded-lg text-[13px] font-semibold transition-colors touch-manipulation',
                valid && !saving
                  ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                  : 'bg-white/[0.05] text-white/40'
              )}
            >
              {savedTick ? 'Sent ✓' : saving ? 'Sending…' : 'Send to tutor'}
            </button>
          </footer>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const inputClass =
  'w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13.5px] text-white placeholder:text-white/50 focus:outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/20 touch-manipulation';

const textareaClass =
  'w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13px] text-white placeholder:text-white/50 leading-relaxed focus:outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/20 touch-manipulation resize-none';

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/85">
          {label}
        </label>
        {hint && <span className="text-[10.5px] text-white/40 leading-snug">{hint}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
