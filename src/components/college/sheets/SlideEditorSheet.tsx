import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { type Slide, type SlideKind, type DiagramKind } from '@/hooks/useSlideDeck';
import { cn } from '@/lib/utils';

/* ==========================================================================
   SlideEditorSheet — kind-aware rich editor for a single slide.

   Exposes every field the slide schema supports (heading, body, bullets,
   key terms, reg cite, activity instructions, image prompt etc.) so the
   tutor can edit anything without dropping to the JSON. Save persists via
   the parent's updateSlide handler.

   Also surfaces "AI tweak" — tutor types a one-liner ("more practical, less
   academic") and the parent calls regenerateSlide.

   ELE-942 / [F1.3].
   ========================================================================== */

const KIND_LABELS: Record<SlideKind, string> = {
  title: 'Title',
  starter: 'Starter',
  objectives: 'Objectives',
  concept: 'Concept',
  reg_cite: 'Regulation cite',
  pull_quote: 'Pull quote',
  big_stat: 'Big stat',
  two_column: 'Two-column compare',
  image_concept: 'Image concept',
  diagram_caption: 'Diagram + caption',
  activity: 'Activity',
  worked_example: 'Worked example',
  check_understanding: 'Check for understanding',
  misconception: 'Misconception',
  summary: 'Summary',
  plenary: 'Plenary (Q-of-the-day)',
};

const DIAGRAM_OPTIONS: DiagramKind[] = [
  'ring_final',
  'radial',
  'lighting_final',
  'distribution_board',
  'voltage_drop_curve',
  'equipotential_bonding',
  'earthing_arrangement',
  'three_phase',
  'RCD_discrimination',
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slide: Slide | null;
  slideIndex: number | null;
  totalSlides: number;
  onSave: (patch: Partial<Slide>) => Promise<void> | void;
  onRegenerate?: (tweakPrompt: string) => Promise<boolean>;
  onDuplicate?: () => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
  regenerating?: boolean;
}

export function SlideEditorSheet({
  open,
  onOpenChange,
  slide,
  slideIndex,
  totalSlides,
  onSave,
  onRegenerate,
  onDuplicate,
  onDelete,
  regenerating = false,
}: Props) {
  const { toast } = useToast();
  const [draft, setDraft] = useState<Slide | null>(null);
  const [tweak, setTweak] = useState('');
  const [busy, setBusy] = useState(false);

  // Hydrate the draft when the sheet opens with a different slide.
  useEffect(() => {
    if (open && slide) setDraft({ ...slide });
    if (!open) {
      setTweak('');
    }
  }, [open, slide]);

  if (!slide || slideIndex == null) return null;

  const set = <K extends keyof Slide>(key: K, value: Slide[K]) =>
    setDraft((d) => (d ? { ...d, [key]: value } : d));

  const handleSave = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      await onSave(draft);
      toast({ title: 'Slide saved' });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  const handleTweak = async () => {
    if (!onRegenerate || !tweak.trim()) return;
    setBusy(true);
    const ok = await onRegenerate(tweak.trim());
    setBusy(false);
    if (ok) {
      toast({ title: 'Slide regenerated', description: 'Photo will refresh if prompt changed.' });
      setTweak('');
      onOpenChange(false);
    }
  };

  const k = (draft ?? slide).kind;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[520px] p-0 bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <SheetTitle className="sr-only">Edit slide</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
                Edit slide
              </div>
              <div className="mt-0.5 text-[14px] font-semibold text-white">
                {KIND_LABELS[k]} · {slideIndex + 1} of {totalSlides}
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-[12px] font-medium text-white/65 hover:text-white touch-manipulation"
            >
              Cancel
            </button>
          </div>

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {/* AI tweak */}
            {onRegenerate && (
              <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] px-4 py-3">
                <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                  AI tweak
                </div>
                <p className="mt-1 text-[11.5px] text-white">
                  Type how you'd like this slide changed. The AI rewrites the whole slide.
                </p>
                <textarea
                  value={tweak}
                  onChange={(e) => setTweak(e.target.value)}
                  placeholder="e.g. make it more practical with a real on-site example, swap the reg cite for 411.3.2.1, make the image close-up of the consumer unit"
                  rows={3}
                  className="mt-2 w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.10] text-[12.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/50 touch-manipulation resize-none"
                />
                <button
                  type="button"
                  onClick={handleTweak}
                  disabled={!tweak.trim() || busy || regenerating}
                  className="mt-2 h-9 px-4 rounded-lg bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 disabled:opacity-40 transition-colors touch-manipulation"
                >
                  {busy || regenerating ? 'Regenerating…' : 'Regenerate slide →'}
                </button>
              </div>
            )}

            {/* Common fields */}
            <Field label="Heading">
              <input
                value={draft?.heading ?? ''}
                onChange={(e) => set('heading', e.target.value)}
                className={inputCls}
              />
            </Field>
            {(k === 'title' || k === 'concept' || k === 'image_concept') && (
              <Field label="Subtitle">
                <input
                  value={draft?.subtitle ?? ''}
                  onChange={(e) => set('subtitle', e.target.value)}
                  className={inputCls}
                />
              </Field>
            )}

            {/* Body — present on most kinds */}
            {(k === 'title' ||
              k === 'concept' ||
              k === 'image_concept' ||
              k === 'starter' ||
              k === 'plenary' ||
              k === 'big_stat' ||
              k === 'diagram_caption') && (
              <Field label="Body" hint="2–4 sentences">
                <textarea
                  value={draft?.body ?? ''}
                  onChange={(e) => set('body', e.target.value)}
                  rows={5}
                  className={textareaCls}
                />
              </Field>
            )}

            {/* Bullets */}
            {(k === 'objectives' || k === 'summary') && (
              <Field label="Bullets" hint="One per line">
                <textarea
                  value={(draft?.bullets ?? []).join('\n')}
                  onChange={(e) => set('bullets', splitLines(e.target.value))}
                  rows={6}
                  className={textareaCls}
                />
              </Field>
            )}

            {/* Reg cite / pull quote */}
            {(k === 'reg_cite' || k === 'pull_quote') && (
              <>
                <Field label="Regulation number">
                  <input
                    value={draft?.reg_number ?? ''}
                    onChange={(e) => set('reg_number', e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 411.3.2.1"
                  />
                </Field>
                <Field label={k === 'pull_quote' ? 'Quote' : 'Clause'}>
                  <textarea
                    value={(k === 'pull_quote' ? draft?.quote : draft?.clause) ?? ''}
                    onChange={(e) => {
                      if (k === 'pull_quote') set('quote', e.target.value);
                      else set('clause', e.target.value);
                    }}
                    rows={4}
                    className={textareaCls}
                  />
                </Field>
                <Field label="Why it matters">
                  <textarea
                    value={draft?.why_it_matters ?? ''}
                    onChange={(e) => set('why_it_matters', e.target.value)}
                    rows={3}
                    className={textareaCls}
                  />
                </Field>
                {k === 'pull_quote' && (
                  <Field label="Attribution">
                    <input
                      value={draft?.attribution ?? ''}
                      onChange={(e) => set('attribution', e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                )}
              </>
            )}

            {/* Big stat */}
            {k === 'big_stat' && (
              <>
                <Field label="Stat value">
                  <input
                    value={draft?.stat_value ?? ''}
                    onChange={(e) => set('stat_value', e.target.value)}
                    className={inputCls}
                    placeholder="30 mA"
                  />
                </Field>
                <Field label="Stat caption">
                  <textarea
                    value={draft?.stat_caption ?? ''}
                    onChange={(e) => set('stat_caption', e.target.value)}
                    rows={2}
                    className={textareaCls}
                  />
                </Field>
                <Field label="Source">
                  <input
                    value={draft?.stat_source ?? ''}
                    onChange={(e) => set('stat_source', e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </>
            )}

            {/* Two-column */}
            {k === 'two_column' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                  <div className="space-y-3">
                    <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-purple-300">
                      Left column
                    </div>
                    <input
                      value={draft?.left_heading ?? ''}
                      onChange={(e) => set('left_heading', e.target.value)}
                      className={inputCls}
                      placeholder="Heading"
                    />
                    <textarea
                      value={draft?.left_body ?? ''}
                      onChange={(e) => set('left_body', e.target.value)}
                      rows={3}
                      placeholder="Body"
                      className={textareaCls}
                    />
                    <textarea
                      value={(draft?.left_bullets ?? []).join('\n')}
                      onChange={(e) => set('left_bullets', splitLines(e.target.value))}
                      rows={4}
                      placeholder="Bullets — one per line"
                      className={textareaCls}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                      Right column
                    </div>
                    <input
                      value={draft?.right_heading ?? ''}
                      onChange={(e) => set('right_heading', e.target.value)}
                      className={inputCls}
                      placeholder="Heading"
                    />
                    <textarea
                      value={draft?.right_body ?? ''}
                      onChange={(e) => set('right_body', e.target.value)}
                      rows={3}
                      placeholder="Body"
                      className={textareaCls}
                    />
                    <textarea
                      value={(draft?.right_bullets ?? []).join('\n')}
                      onChange={(e) => set('right_bullets', splitLines(e.target.value))}
                      rows={4}
                      placeholder="Bullets — one per line"
                      className={textareaCls}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Activity */}
            {k === 'activity' && (
              <>
                <Field label="Instruction" hint="Full task brief">
                  <textarea
                    value={draft?.instruction ?? ''}
                    onChange={(e) => set('instruction', e.target.value)}
                    rows={5}
                    className={textareaCls}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Time (min)">
                    <input
                      type="number"
                      min={1}
                      max={90}
                      value={draft?.time_minutes ?? ''}
                      onChange={(e) =>
                        set('time_minutes', e.target.value ? Number(e.target.value) : undefined)
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Group size">
                    <select
                      value={draft?.group_size ?? ''}
                      onChange={(e) =>
                        set('group_size', (e.target.value || undefined) as Slide['group_size'])
                      }
                      className={inputCls}
                    >
                      <option value="">—</option>
                      <option value="individual">Individual</option>
                      <option value="pairs">Pairs</option>
                      <option value="small_group">Small group</option>
                      <option value="whole_class">Whole class</option>
                    </select>
                  </Field>
                </div>
                <Field label="Success criteria">
                  <textarea
                    value={draft?.success_criteria ?? ''}
                    onChange={(e) => set('success_criteria', e.target.value)}
                    rows={2}
                    className={textareaCls}
                  />
                </Field>
              </>
            )}

            {/* Worked example */}
            {k === 'worked_example' && (
              <>
                <Field label="Problem">
                  <textarea
                    value={draft?.problem ?? ''}
                    onChange={(e) => set('problem', e.target.value)}
                    rows={4}
                    className={textareaCls}
                  />
                </Field>
                <Field label="Solution steps" hint="One per line, in order">
                  <textarea
                    value={(draft?.solution_steps ?? []).join('\n')}
                    onChange={(e) => set('solution_steps', splitLines(e.target.value))}
                    rows={6}
                    className={textareaCls}
                  />
                </Field>
              </>
            )}

            {/* Check understanding / starter questions */}
            {(k === 'check_understanding' || k === 'starter') && (
              <Field label="Questions" hint="One per line">
                <textarea
                  value={(draft?.questions ?? []).join('\n')}
                  onChange={(e) => set('questions', splitLines(e.target.value))}
                  rows={6}
                  className={textareaCls}
                />
              </Field>
            )}

            {/* Misconception */}
            {k === 'misconception' && (
              <>
                <Field label="Common belief">
                  <textarea
                    value={draft?.belief ?? ''}
                    onChange={(e) => set('belief', e.target.value)}
                    rows={3}
                    className={textareaCls}
                  />
                </Field>
                <Field label="Correction">
                  <textarea
                    value={draft?.correction ?? ''}
                    onChange={(e) => set('correction', e.target.value)}
                    rows={4}
                    className={textareaCls}
                  />
                </Field>
              </>
            )}

            {/* Plenary exit ticket */}
            {k === 'plenary' && (
              <Field label="Exit ticket">
                <textarea
                  value={draft?.exit_ticket ?? ''}
                  onChange={(e) => set('exit_ticket', e.target.value)}
                  rows={3}
                  className={textareaCls}
                />
              </Field>
            )}

            {/* Diagram */}
            {k === 'diagram_caption' && (
              <>
                <Field label="Diagram template">
                  <select
                    value={draft?.diagram_kind ?? ''}
                    onChange={(e) =>
                      set('diagram_kind', (e.target.value || undefined) as DiagramKind | undefined)
                    }
                    className={inputCls}
                  >
                    <option value="">—</option>
                    {DIAGRAM_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Diagram caption">
                  <textarea
                    value={draft?.diagram_caption ?? ''}
                    onChange={(e) => set('diagram_caption', e.target.value)}
                    rows={2}
                    className={textareaCls}
                  />
                </Field>
              </>
            )}

            {/* Image — present on any kind that supports it */}
            {(draft?.image_prompt != null ||
              k === 'image_concept' ||
              k === 'starter' ||
              k === 'plenary' ||
              k === 'concept') && (
              <>
                <Field label="Image prompt" hint="Specific, cinematic, 60–120 words">
                  <textarea
                    value={draft?.image_prompt ?? ''}
                    onChange={(e) => set('image_prompt', e.target.value)}
                    rows={5}
                    className={textareaCls}
                  />
                </Field>
                <Field label="Image caption">
                  <input
                    value={draft?.image_caption ?? ''}
                    onChange={(e) => set('image_caption', e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </>
            )}

            {/* Speaker notes — required on every slide */}
            <Field label="Speaker notes" hint="What the tutor SAYS off-slide">
              <textarea
                value={draft?.speaker_notes ?? ''}
                onChange={(e) => set('speaker_notes', e.target.value)}
                rows={4}
                className={textareaCls}
              />
            </Field>

            {/* AC mapping */}
            <Field label="Maps to ACs" hint="Comma-separated AC codes">
              <input
                value={(draft?.slide_acs ?? []).join(', ')}
                onChange={(e) =>
                  set(
                    'slide_acs',
                    e.target.value
                      .split(/[,\s]+/)
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                className={inputCls}
                placeholder="e.g. 1.1, 1.2"
              />
            </Field>
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-5 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_10%)] flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              {onDuplicate && (
                <button
                  type="button"
                  onClick={() => void onDuplicate()}
                  className="h-10 px-3 rounded-lg bg-transparent border border-white/[0.10] hover:border-white/25 text-white text-[11.5px] font-medium touch-manipulation"
                >
                  Duplicate
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Delete this slide?')) void onDelete();
                  }}
                  className="h-10 px-3 rounded-lg bg-transparent border border-rose-500/30 hover:border-rose-500/50 text-rose-300 text-[11.5px] font-medium touch-manipulation"
                >
                  Delete
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={busy}
              className="h-10 px-5 rounded-lg bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 disabled:opacity-40 transition-colors touch-manipulation"
            >
              {busy ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* helpers */

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
    <label className="block">
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white">
          {label}
        </span>
        {hint && <span className="text-[10.5px] text-white/55">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function splitLines(s: string): string[] {
  return s
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

const inputCls = cn(
  'w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/[0.10]',
  'text-[13px] text-white placeholder:text-white/40',
  'focus:outline-none focus:border-elec-yellow/50 touch-manipulation'
);

const textareaCls = cn(
  'w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.10]',
  'text-[13px] text-white placeholder:text-white/40 leading-relaxed',
  'focus:outline-none focus:border-elec-yellow/50 touch-manipulation resize-y'
);
