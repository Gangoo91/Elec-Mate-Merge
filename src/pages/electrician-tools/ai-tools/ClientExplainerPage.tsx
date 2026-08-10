/**
 * ClientExplainerPage — turn a technical finding into copy a client can read.
 *
 * Rebuilt as a workspace rather than a form you scroll to the bottom of.
 *
 * ── Desktop ────────────────────────────────────────────────────────────────
 * The brief is a 2x2 block of panels — audience, findings, tone, include —
 * beside a sticky rail holding the output. The rail is the point: this is a
 * tool you use by generating, reading, nudging a setting and generating again,
 * and the previous single 1024px column put the result far below the controls,
 * so every iteration was a scroll down to read and a scroll up to change. With
 * the rail, the copy stays on screen while you work on it.
 *
 * ── Mobile ─────────────────────────────────────────────────────────────────
 * One column, edge-to-edge panels, and the generate button lives in a fixed
 * bar at the bottom where a thumb already is. The result opens as an 85vh
 * bottom sheet instead of appending 800px to the page, so reading the copy
 * doesn't mean scrolling past the whole form, and dismissing it puts you back
 * exactly where you were.
 *
 * ── What was dropped ───────────────────────────────────────────────────────
 *
 *   The hero. "Plain English. Every time." over a two-line standfirst, on a
 *   page reached by tapping a card that already said what it does.
 *
 *   Two accordions. Templates and Options were both collapsed by default,
 *   which hid the fastest way to start and the four switches that most change
 *   the output. Nothing on this page is hidden now; it is arranged instead.
 *   Templates appear only while the findings box is empty — picking one
 *   overwrites that box, so offering it beside text you have just typed is
 *   offering to delete it.
 *
 *   The unlabelled dropdown row. Three selects reading "Professional",
 *   "Standard" and "Important" with nothing to say which was tone, which was
 *   reading level and which was urgency — and "Important" means nothing at all
 *   without its label.
 *
 *   `01 ·`–`05 ·` numbering, and the hand-rolled card surface. Panels are made
 *   of the same material as the rest of the app, and text is full white rather
 *   than the eleven runs of `text-white/65` this page used to carry.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, Trash2 } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { HubPage, HubMasthead } from '@/components/hub/HubPrimitives';

import ClientTypeSelector, {
  ClientType,
} from '@/components/electrician-tools/ai-tools/client-explainer/ClientTypeSelector';
import TemplateSelector, {
  Template,
} from '@/components/electrician-tools/ai-tools/client-explainer/TemplateSelector';
import OutputPanel from '@/components/electrician-tools/ai-tools/client-explainer/OutputPanel';

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'reassuring', label: 'Reassuring' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'technical', label: 'Technical' },
];

const READING_OPTIONS = [
  { value: 'simple', label: 'Simple', description: 'Short sentences, no jargon' },
  { value: 'standard', label: 'Standard', description: 'Plain English' },
  { value: 'technical', label: 'Technical', description: 'Assumes some knowledge' },
];

const URGENCY_OPTIONS = [
  { value: 'low', label: 'Routine' },
  { value: 'medium', label: 'Important' },
  { value: 'high', label: 'Safety' },
  { value: 'immediate', label: 'Immediate' },
];

const PICKER_TRIGGER =
  'h-11 rounded-lg border-white/[0.12] bg-white/[0.06] text-white text-[13.5px]';

// ───────────────────────────────────────────────────────────────────────────

/**
 * One panel of the brief. Edge-to-edge on a phone and inset from `sm:` up,
 * made of the same lit surface as every card in the app.
 */
const Panel = ({
  title,
  hint,
  children,
  className,
}: {
  title: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={cn(
      '-mx-4 border-y border-elec-yellow/35 p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5',
      'bg-gradient-to-br from-white/[0.14] via-white/[0.075] to-white/[0.045]',
      'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_2px_8px_-3px_rgba(0,0,0,0.75)]',
      className
    )}
  >
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2 className="text-[14px] font-semibold tracking-tight text-elec-yellow">{title}</h2>
      {hint && <span className="shrink-0 text-[11px] font-medium tabular-nums text-white">{hint}</span>}
    </div>
    {children}
  </section>
);

/** A labelled control. The row of three bare dropdowns had no labels at all. */
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="mb-1.5 block text-[12px] font-medium text-white">{label}</label>
    {children}
  </div>
);

const TOGGLES = [
  { key: 'analogy', label: 'Analogies', desc: 'Everyday comparisons' },
  { key: 'safety', label: 'Safety focus', desc: 'Lead with the risk' },
  { key: 'costs', label: 'Costs', desc: 'Pricing context' },
  { key: 'bs7671', label: 'BS 7671', desc: 'Cite the regulations' },
] as const;

// ───────────────────────────────────────────────────────────────────────────

const ClientExplainerPage = () => {
  const { toast } = useToast();
  const haptic = useHaptic();
  const isMobile = useIsMobile();

  useSEO({
    title: 'Client Explainer',
    description:
      'Turn test results, EICR codes and safety findings into plain English your client will understand.',
    noindex: true,
  });

  const [technicalNotes, setTechnicalNotes] = useState('');
  const [tone, setTone] = useState('professional');
  const [readingLevel, setReadingLevel] = useState('standard');
  const [clientType, setClientType] = useState<ClientType>('homeowner');
  const [urgencyLevel, setUrgencyLevel] = useState('medium');
  const [includeAnalogy, setIncludeAnalogy] = useState(true);
  const [includeCostInfo, setIncludeCostInfo] = useState(false);
  const [emphasizeSafety, setEmphasizeSafety] = useState(true);
  const [includeBS7671, setIncludeBS7671] = useState(false);
  const [generatedExplanation, setGeneratedExplanation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleValue: Record<string, boolean> = {
    analogy: includeAnalogy,
    safety: emphasizeSafety,
    costs: includeCostInfo,
    bs7671: includeBS7671,
  };
  const toggleSetter: Record<string, (v: boolean) => void> = {
    analogy: setIncludeAnalogy,
    safety: setEmphasizeSafety,
    costs: setIncludeCostInfo,
    bs7671: setIncludeBS7671,
  };

  const wordCount = technicalNotes.trim() ? technicalNotes.trim().split(/\s+/).length : 0;
  const canGenerate = Boolean(technicalNotes.trim()) && !isGenerating;
  /** Whether the rail has something that needs room to scroll. */
  const hasOutput = Boolean(generatedExplanation) || isGenerating;

  const handleSelectTemplate = (template: Template) => {
    haptic.light();
    setTechnicalNotes(template.sample);
    switch (template.urgency) {
      case 'high':
        setTone('urgent');
        setEmphasizeSafety(true);
        break;
      case 'medium':
        setTone('professional');
        break;
      case 'low':
        setTone('friendly');
        break;
    }
    setUrgencyLevel(template.urgency);
  };

  const handleGenerate = async () => {
    if (!technicalNotes.trim()) {
      toast({
        title: 'Add your findings first',
        description: 'Type what you found, or pick a scenario to start from.',
        variant: 'destructive',
      });
      return;
    }

    haptic.medium();
    setIsGenerating(true);
    // Open the sheet immediately on a phone so the spinner is visible where
    // the answer will appear, rather than behind the form.
    if (isMobile) setSheetOpen(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-electrical-report', {
        body: {
          template: 'client-explainer',
          formData: {
            technicalNotes,
            tone,
            readingLevel,
            clientType,
            urgencyLevel,
            includeAnalogy,
            includeCostInfo,
            emphasizeSafety,
            includeBS7671,
          },
        },
      });

      if (error) throw error;

      setGeneratedExplanation(data.report);
      haptic.success();
      toast({
        title: 'Explanation ready',
        description: 'Check it over before you send it.',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error generating explanation:', error);
      toast({
        title: 'Generation failed',
        description: 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const settings = {
    tone,
    readingLevel,
    clientType,
    includeAnalogy,
    emphasizeSafety,
    includeCostInfo,
  };

  const output = (
    <OutputPanel
      content={generatedExplanation}
      settings={settings}
      isGenerating={isGenerating}
    />
  );

  const generateButton = (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={!canGenerate}
      className={cn(
        'inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5',
        'text-[14px] font-semibold text-black',
        'bg-gradient-to-b from-[hsl(47_100%_57%)] to-[hsl(47_100%_47%)]',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_4px_14px_-8px_hsl(47_100%_50%_/_0.30)]',
        'transition-colors duration-150 touch-manipulation select-none',
        '[-webkit-tap-highlight-color:transparent] active:scale-[0.98]',
        'hover:from-[hsl(47_100%_61%)] hover:to-[hsl(47_100%_50%)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        'disabled:cursor-not-allowed disabled:opacity-40'
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Writing it up…
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" aria-hidden />
          {generatedExplanation ? 'Generate again' : 'Generate explanation'}
        </>
      )}
    </button>
  );

  return (
    <HubPage>
      <HubMasthead
        section="AI tools"
        title="Client Explainer"
        backTo="/electrician-tools/ai-tooling"
      />

      <div className="mx-auto max-w-[1600px] px-4 pb-32 pt-4 lg:px-8 lg:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            'grid gap-4',
            // The rail appears at the same width `useIsMobile` switches on, so
            // the sheet and the rail can never both be live.
            'lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-6',
            '2xl:grid-cols-[minmax(0,1fr)_minmax(0,520px)]'
          )}
        >
          {/* ── The brief ─────────────────────────────────────────────── */}
          <div className="min-w-0 space-y-4">
            {/* Two independent stacks, not a 2x2 grid of cells.

                A grid stretches every panel in a row to the height of the
                tallest, and "Who it's for" is four chips beside a findings box
                three times its height — so it sat in 180px of its own empty
                space. Stacking the short panel above the tall one in each
                column reads as the same 2x2 block with none of the holes. */}
            <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
              <div className="space-y-4">
                <Panel title="Who it's for">
                  <ClientTypeSelector selected={clientType} onSelect={setClientType} />
                </Panel>

                <Panel
                  title="What you found"
                hint={wordCount > 0 ? `${wordCount} ${wordCount === 1 ? 'word' : 'words'}` : undefined}
              >
                <Textarea
                  value={technicalNotes}
                  onChange={(e) => setTechnicalNotes(e.target.value)}
                  placeholder="Test results, work completed, EICR codes (C1/C2/C3), safety concerns…"
                  // 16px or iOS zooms the whole page on focus.
                  style={{ fontSize: '16px' }}
                  className={cn(
                    'min-h-[132px] resize-none rounded-xl border-white/[0.12] bg-black/20 text-white',
                    'placeholder:text-white/45 caret-elec-yellow',
                    'focus-visible:border-elec-yellow focus-visible:ring-0 focus-visible:ring-offset-0'
                  )}
                />

                {technicalNotes.trim() ? (
                  <button
                    type="button"
                    onClick={() => {
                      haptic.light();
                      setTechnicalNotes('');
                    }}
                    className="mt-2 inline-flex h-11 items-center gap-1.5 text-[12px] font-semibold text-white transition-colors touch-manipulation hover:text-elec-yellow"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    Clear and pick a scenario
                  </button>
                ) : (
                  <div className="mt-3">
                    <p className="mb-2 text-[12px] font-medium text-white">
                      Or start from a scenario
                    </p>
                    <TemplateSelector onSelectTemplate={handleSelectTemplate} />
                  </div>
                )}
                </Panel>
              </div>

              <div className="space-y-4">
                <Panel title="How it should read">
                  <div className="space-y-3">
                    <Field label="Tone">
                      <MobileSelectPicker
                        value={tone}
                        onValueChange={setTone}
                        options={TONE_OPTIONS}
                        title="Tone"
                        triggerClassName={PICKER_TRIGGER}
                      />
                    </Field>
                    <Field label="Reading level">
                      <MobileSelectPicker
                        value={readingLevel}
                        onValueChange={setReadingLevel}
                        options={READING_OPTIONS}
                        title="Reading level"
                        triggerClassName={PICKER_TRIGGER}
                      />
                    </Field>
                    <Field label="Urgency">
                      <MobileSelectPicker
                        value={urgencyLevel}
                        onValueChange={setUrgencyLevel}
                        options={URGENCY_OPTIONS}
                        title="Urgency"
                        // Urgency changes what the copy leads with, so the two
                        // levels meaning "this is a safety matter" are marked.
                        triggerClassName={cn(
                          PICKER_TRIGGER,
                          urgencyLevel === 'high' && 'border-orange-500/50',
                          urgencyLevel === 'immediate' && 'border-red-500/60'
                        )}
                      />
                    </Field>
                  </div>
                </Panel>

                <Panel title="Include">
                  <div className="grid grid-cols-2 gap-2">
                    {TOGGLES.map(({ key, label, desc }) => {
                      const on = toggleValue[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          role="switch"
                          aria-checked={on}
                          onClick={() => {
                            haptic.light();
                            toggleSetter[key](!on);
                          }}
                          className={cn(
                            'min-h-[60px] rounded-xl border px-3 py-2.5 text-left',
                            'transition-colors duration-150 touch-manipulation select-none',
                            '[-webkit-tap-highlight-color:transparent] active:scale-[0.97]',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
                            on
                              ? 'border-elec-yellow bg-elec-yellow'
                              : 'border-white/[0.12] bg-white/[0.06] hover:border-white/[0.28]'
                          )}
                        >
                          <span
                            className={cn(
                              'block text-[13.5px] font-semibold leading-tight',
                              on ? 'text-black' : 'text-white'
                            )}
                          >
                            {label}
                          </span>
                          <span
                            className={cn(
                              'mt-0.5 block text-[11px] leading-tight',
                              on ? 'text-black/70' : 'text-white'
                            )}
                          >
                            {desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Panel>
              </div>
            </div>

            {/* Desktop generate. On a phone this lives in the fixed bar. */}
            <div className="hidden lg:block">{generateButton}</div>
          </div>

          {/* ── The output rail ───────────────────────────────────────── */}
          {/* Rendered, not just hidden. Mounting the rail and the sheet
              together put two OutputPanels on the page, each holding its own
              format tab — pick SMS on a desktop, narrow the window, and the
              sheet opened on Standard. `useIsMobile` switches at 1024px, the
              same width as `lg:`, so exactly one of the two is ever live. */}
          {!isMobile && (
            <aside className="hidden lg:block">
              {/* Height only when there is something to hold.

                  With copy in it the panel is a scrolling region and wants the
                  full run of the screen: the app header is fixed at 64px and
                  the masthead another 48px, so this column starts about 130px
                  down — `top-20` clears the header once it sticks, and 9.5rem
                  is what must come off for the action row to sit above the fold
                  in BOTH states (unstuck at 130px, stuck at 80px).

                  Empty, that same calc drew a 770px box beside a 635px column
                  of controls, which read as a hole in the page. `h-full`
                  stretches it to the grid row instead, so it matches the brief
                  exactly — the row is sized by the controls, which are then the
                  tallest thing in it. */}
              <div
                className={cn(
                  'sticky top-20',
                  hasOutput ? 'h-[calc(100dvh-9.5rem)] min-h-[420px]' : 'h-full'
                )}
              >
                {output}
              </div>
            </aside>
          )}
        </motion.div>
      </div>

      {/* ── Mobile: fixed action bar ────────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-elec-dark via-elec-dark/95 to-transparent px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-4 lg:hidden">
        <div className="flex items-center gap-2">
          {generatedExplanation && (
            <button
              type="button"
              onClick={() => {
                haptic.light();
                setSheetOpen(true);
              }}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.14] bg-neutral-900 px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation active:bg-white/[0.10]"
            >
              View result
            </button>
          )}
          <div className="min-w-0 flex-1">{generateButton}</div>
        </div>
      </div>

      {/* ── Mobile: the result ──────────────────────────────────────────── */}
      {isMobile && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.10] bg-elec-dark p-0"
          >
            <SheetHeader className="border-b border-white/[0.10] px-4 py-3 text-left">
              <SheetTitle className="text-[15px] font-semibold text-white">
                Explanation for your {clientType}
              </SheetTitle>
            </SheetHeader>
            {/* 57px is the header above: 12px padding top and bottom around a
                33px title line. Measured against the rendered sheet. */}
            <div className="h-[calc(85vh-57px)] p-3">{output}</div>
          </SheetContent>
        </Sheet>
      )}
    </HubPage>
  );
};

export default ClientExplainerPage;
