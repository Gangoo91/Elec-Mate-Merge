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
import { Sparkles, Trash2 } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  AiToolPage,
  ToolPanel,
  ToolField,
  ToolAction,
} from '@/components/electrician-tools/ai-tools/ToolShell';

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
    <ToolAction
      onClick={handleGenerate}
      disabled={!canGenerate}
      busy={isGenerating}
      busyLabel="Writing it up…"
      icon={<Sparkles className="h-4 w-4" aria-hidden />}
    >
      {generatedExplanation ? 'Generate again' : 'Generate explanation'}
    </ToolAction>
  );

  return (
    <AiToolPage
      title="Client Explainer"
      result={output}
      resultTitle={`Explanation for your ${clientType}`}
      hasResult={Boolean(generatedExplanation) || isGenerating}
      action={generateButton}
      sheetOpen={sheetOpen}
      onSheetOpenChange={setSheetOpen}
    >
      <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
              <div className="space-y-4">
                <ToolPanel title="Who it's for">
                  <ClientTypeSelector selected={clientType} onSelect={setClientType} />
                </ToolPanel>

                <ToolPanel
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
                </ToolPanel>
              </div>

              <div className="space-y-4">
                <ToolPanel title="How it should read">
                  <div className="space-y-3">
                    <ToolField label="Tone">
                      <MobileSelectPicker
                        value={tone}
                        onValueChange={setTone}
                        options={TONE_OPTIONS}
                        title="Tone"
                        triggerClassName={PICKER_TRIGGER}
                      />
                    </ToolField>
                    <ToolField label="Reading level">
                      <MobileSelectPicker
                        value={readingLevel}
                        onValueChange={setReadingLevel}
                        options={READING_OPTIONS}
                        title="Reading level"
                        triggerClassName={PICKER_TRIGGER}
                      />
                    </ToolField>
                    <ToolField label="Urgency">
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
                    </ToolField>
                  </div>
                </ToolPanel>

                <ToolPanel title="Include">
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
                </ToolPanel>
              </div>
            </div>

    </AiToolPage>
  );
};

export default ClientExplainerPage;
