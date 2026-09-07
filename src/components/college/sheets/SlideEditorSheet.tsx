import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { type Slide, type SlideKind, type DiagramKind } from '@/hooks/useSlideDeck';
import {
  buttonPrimaryCn,
  inputCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';

/* ==========================================================================
   SlideEditorSheet — kind-aware editor for a single slide.

   Exposes every field the slide schema supports (heading, body, bullets,
   key terms, reg cite, activity instructions, image prompt etc.) so the
   tutor can edit anything without dropping to the JSON. Save persists via
   the parent's updateSlide handler.

   A bottom sheet on the form design language: underline inputs, soft
   textareas, sentence-case labels, one solid volt Save. The "AI tweak" box
   that used to sit at the top of this sheet — a second volt button on the
   same screen — now lives on the slide card's own Regenerate action, so
   this sheet does one job.

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
  diagram_caption: 'Diagram and caption',
  activity: 'Activity',
  worked_example: 'Worked example',
  check_understanding: 'Check for understanding',
  misconception: 'Misconception',
  summary: 'Summary',
  plenary: 'Plenary',
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
  onDuplicate?: () => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
}

export function SlideEditorSheet({
  open,
  onOpenChange,
  slide,
  slideIndex,
  totalSlides,
  onSave,
  onDuplicate,
  onDelete,
}: Props) {
  const { toast } = useToast();
  const [draft, setDraft] = useState<Slide | null>(null);
  const [busy, setBusy] = useState(false);

  // Hydrate the draft when the sheet opens with a different slide.
  useEffect(() => {
    if (open && slide) setDraft({ ...slide });
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

  const k = (draft ?? slide).kind;
  const textAction =
    'flex h-12 items-center px-3 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:text-elec-yellow';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hideCloseButton
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-shrink-0 justify-center pb-1 pt-2.5">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex flex-shrink-0 items-start justify-between gap-3 border-b border-white/[0.06] px-5 pb-4">
            <div className="min-w-0">
              <SheetTitle className="text-[20px] font-semibold leading-tight text-white">
                Edit slide
              </SheetTitle>
              <SheetDescription className="mt-1 text-[12.5px] text-white">
                {KIND_LABELS[k]} · slide {slideIndex + 1} of {totalSlides}
              </SheetDescription>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="-mr-2 flex h-11 shrink-0 items-center px-2 text-[12.5px] font-medium text-white touch-manipulation"
            >
              Cancel
            </button>
          </div>

          {/* Body — scrollable */}
          <div className="flex-1 space-y-5 overflow-y-auto overscroll-contain p-5">
            {/* Common fields */}
            <Field label="Heading">
              <input
                value={draft?.heading ?? ''}
                onChange={(e) => set('heading', e.target.value)}
                className={inputCn}
              />
            </Field>
            {(k === 'title' || k === 'concept' || k === 'image_concept') && (
              <Field label="Subtitle">
                <input
                  value={draft?.subtitle ?? ''}
                  onChange={(e) => set('subtitle', e.target.value)}
                  className={inputCn}
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
              <Field label="Body" hint="Two to four sentences">
                <textarea
                  value={draft?.body ?? ''}
                  onChange={(e) => set('body', e.target.value)}
                  rows={5}
                  className={cn(textareaCn, 'w-full')}
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
                  className={cn(textareaCn, 'w-full')}
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
                    className={inputCn}
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
                    className={cn(textareaCn, 'w-full')}
                  />
                </Field>
                <Field label="Why it matters">
                  <textarea
                    value={draft?.why_it_matters ?? ''}
                    onChange={(e) => set('why_it_matters', e.target.value)}
                    rows={3}
                    className={cn(textareaCn, 'w-full')}
                  />
                </Field>
                {k === 'pull_quote' && (
                  <Field label="Attribution">
                    <input
                      value={draft?.attribution ?? ''}
                      onChange={(e) => set('attribution', e.target.value)}
                      className={inputCn}
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
                    className={inputCn}
                    placeholder="30 mA"
                  />
                </Field>
                <Field label="Stat caption">
                  <textarea
                    value={draft?.stat_caption ?? ''}
                    onChange={(e) => set('stat_caption', e.target.value)}
                    rows={2}
                    className={cn(textareaCn, 'w-full')}
                  />
                </Field>
                <Field label="Source">
                  <input
                    value={draft?.stat_source ?? ''}
                    onChange={(e) => set('stat_source', e.target.value)}
                    className={inputCn}
                  />
                </Field>
              </>
            )}

            {/* Two-column */}
            {k === 'two_column' && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
                {(['left', 'right'] as const).map((side) => (
                  <div key={side} className="space-y-3">
                    <div className="text-[13px] font-semibold text-elec-yellow">
                      {side === 'left' ? 'Left column' : 'Right column'}
                    </div>
                    <input
                      value={(side === 'left' ? draft?.left_heading : draft?.right_heading) ?? ''}
                      onChange={(e) =>
                        set(side === 'left' ? 'left_heading' : 'right_heading', e.target.value)
                      }
                      className={inputCn}
                      placeholder="Heading"
                    />
                    <textarea
                      value={(side === 'left' ? draft?.left_body : draft?.right_body) ?? ''}
                      onChange={(e) =>
                        set(side === 'left' ? 'left_body' : 'right_body', e.target.value)
                      }
                      rows={3}
                      placeholder="Body"
                      className={cn(textareaCn, 'w-full')}
                    />
                    <textarea
                      value={(
                        (side === 'left' ? draft?.left_bullets : draft?.right_bullets) ?? []
                      ).join('\n')}
                      onChange={(e) =>
                        set(
                          side === 'left' ? 'left_bullets' : 'right_bullets',
                          splitLines(e.target.value)
                        )
                      }
                      rows={4}
                      placeholder="Bullets — one per line"
                      className={cn(textareaCn, 'w-full')}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Activity */}
            {k === 'activity' && (
              <>
                <Field label="Instruction" hint="The full task brief">
                  <textarea
                    value={draft?.instruction ?? ''}
                    onChange={(e) => set('instruction', e.target.value)}
                    rows={5}
                    className={cn(textareaCn, 'w-full')}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-6">
                  <Field label="Time (minutes)">
                    <input
                      type="number"
                      min={1}
                      max={90}
                      value={draft?.time_minutes ?? ''}
                      onChange={(e) =>
                        set('time_minutes', e.target.value ? Number(e.target.value) : undefined)
                      }
                      className={inputCn}
                    />
                  </Field>
                  <Field label="Group size">
                    <select
                      value={draft?.group_size ?? ''}
                      onChange={(e) =>
                        set('group_size', (e.target.value || undefined) as Slide['group_size'])
                      }
                      className={cn(selectTriggerCn, 'w-full [color-scheme:dark]')}
                    >
                      <option value="">Not set</option>
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
                    className={cn(textareaCn, 'w-full')}
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
                    className={cn(textareaCn, 'w-full')}
                  />
                </Field>
                <Field label="Solution steps" hint="One per line, in order">
                  <textarea
                    value={(draft?.solution_steps ?? []).join('\n')}
                    onChange={(e) => set('solution_steps', splitLines(e.target.value))}
                    rows={6}
                    className={cn(textareaCn, 'w-full')}
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
                  className={cn(textareaCn, 'w-full')}
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
                    className={cn(textareaCn, 'w-full')}
                  />
                </Field>
                <Field label="Correction">
                  <textarea
                    value={draft?.correction ?? ''}
                    onChange={(e) => set('correction', e.target.value)}
                    rows={4}
                    className={cn(textareaCn, 'w-full')}
                  />
                </Field>
              </>
            )}

            {/* Plenary */}
            {k === 'plenary' && (
              <Field label="Exit ticket">
                <textarea
                  value={draft?.exit_ticket ?? ''}
                  onChange={(e) => set('exit_ticket', e.target.value)}
                  rows={3}
                  className={cn(textareaCn, 'w-full')}
                />
              </Field>
            )}

            {/* Key terms — concept kinds */}
            {(k === 'concept' || k === 'image_concept') && (
              <Field label="Key terms" hint="One per line as term: definition">
                <textarea
                  value={(draft?.key_terms ?? [])
                    .map((t) => `${t.term}: ${t.definition}`)
                    .join('\n')}
                  onChange={(e) =>
                    set(
                      'key_terms',
                      splitLines(e.target.value).map((line) => {
                        const idx = line.indexOf(':');
                        if (idx === -1) return { term: line, definition: '' };
                        return {
                          term: line.slice(0, idx).trim(),
                          definition: line.slice(idx + 1).trim(),
                        };
                      })
                    )
                  }
                  rows={4}
                  className={cn(textareaCn, 'w-full')}
                />
              </Field>
            )}

            {/* Diagram */}
            {k === 'diagram_caption' && (
              <>
                <Field label="Diagram">
                  <select
                    value={draft?.diagram_kind ?? ''}
                    onChange={(e) =>
                      set('diagram_kind', (e.target.value || undefined) as DiagramKind | undefined)
                    }
                    className={cn(selectTriggerCn, 'w-full [color-scheme:dark]')}
                  >
                    <option value="">Not set</option>
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
                    className={cn(textareaCn, 'w-full')}
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
                <Field label="Image prompt" hint="Specific and visual, 60–120 words">
                  <textarea
                    value={draft?.image_prompt ?? ''}
                    onChange={(e) => set('image_prompt', e.target.value)}
                    rows={5}
                    className={cn(textareaCn, 'w-full')}
                  />
                </Field>
                <Field label="Image caption">
                  <input
                    value={draft?.image_caption ?? ''}
                    onChange={(e) => set('image_caption', e.target.value)}
                    className={inputCn}
                  />
                </Field>
              </>
            )}

            {/* Speaker notes — every slide */}
            <Field label="Speaker notes" hint="What the tutor says off-slide">
              <textarea
                value={draft?.speaker_notes ?? ''}
                onChange={(e) => set('speaker_notes', e.target.value)}
                rows={4}
                className={cn(textareaCn, 'w-full')}
              />
            </Field>

            {/* AC mapping */}
            <Field label="Maps to assessment criteria" hint="Comma-separated codes">
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
                className={inputCn}
                placeholder="e.g. 1.1, 1.2"
              />
            </Field>
          </div>

          {/* Footer — one solid volt Save; duplicate and delete are text actions */}
          <div
            className="flex flex-shrink-0 items-center gap-2 border-t border-white/[0.06] p-4"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            {onDuplicate && (
              <button type="button" onClick={() => void onDuplicate()} className={textAction}>
                Duplicate
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this slide?')) void onDelete();
                }}
                className={textAction}
              >
                Delete
              </button>
            )}
            <span className="flex-1" />
            <button
              type="button"
              onClick={handleSave}
              disabled={busy}
              className={cn(buttonPrimaryCn, 'px-6')}
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
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className={cn(labelCn, 'mb-0')}>{label}</span>
        {hint && <span className="text-[11px] text-white">{hint}</span>}
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
