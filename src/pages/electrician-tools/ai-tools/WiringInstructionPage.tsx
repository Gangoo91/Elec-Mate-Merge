/**
 * WiringInstructionPage — what goes in which terminal, for the thing in front of you.
 *
 * Last of the five AI tools onto the shared shell: 2x2 brief beside a sticky
 * result rail on a desktop, one column with a fixed action bar and an 85vh
 * sheet on a phone.
 *
 * ── Fixed here ─────────────────────────────────────────────────────────────
 *
 * THE CAMERA NEVER OPENED — the last page carrying it. `setIsCameraActive`
 * was called from inside `if (videoRef.current)`, and the <video> holding that
 * ref only mounts once the flag is true, so the first tap acquired a
 * MediaStream, showed nothing, and never released it. Acquire → set state →
 * attach in an effect → stop every track on close and on unmount.
 *
 * FOUR PHOTOS OFFERED, ONE ACCEPTED. Unlike the sibling tools this is not a
 * request bug: `wiring-diagram-generator-rag` takes a single
 * `component_image_url`. The picker was the thing lying, so it now takes one
 * photo and says so, rather than collecting four and quietly binning three.
 *
 * THE STEP INDICATOR NEVER SHOWED STEP 1. `currentStep` was
 * `!selectedCircuit ? 2 : 3`, so the page opened on "02" with "01" already
 * greyed out as though something had been done. Gone — the panels are the
 * structure.
 *
 * PHOTO *OR* DESCRIPTION WAS AN ARTIFICIAL CHOICE. The two were behind a tab
 * pair, and the edge function happily takes both. A photo of the accessory
 * plus a line about where it's going is the best input this tool can get, and
 * the UI made you pick one.
 *
 * Plus: `URL.createObjectURL` in the thumbnail render and never revoked, a
 * `Math.random()` progress bar, a reset that left the property, context,
 * earthing, supply and notes populated, a CTA that did not exist until the
 * form was filled in, and an invalid `ragSourcesCount` prop that was a live
 * TypeScript error against WiringGuidanceDisplay.
 *
 * ── The answers ────────────────────────────────────────────────────────────
 *
 * Retrieval moved off the A3 corpus in the edge function (see the header
 * there). Clause numbers are now constrained to what retrieval actually
 * returned, so a step either cites a real A4:2026 clause or cites nothing.
 */

import { useState, useRef, useEffect, useMemo } from 'react';
import { X, Camera, Upload, Cable } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { mintFreshSignedUrl } from '@/utils/storageUrls';
import { cn } from '@/lib/utils';

import { Textarea } from '@/components/ui/textarea';
import { useCameraCapture } from '@/hooks/useCameraCapture';
import {
  AiToolPage,
  ToolPanel,
  ToolChip,
  ToolField,
  ToolAction,
  ToolResult,
  ToolWorking,
} from '@/components/electrician-tools/ai-tools/ToolShell';
import WiringGuidanceDisplay from '@/components/electrician-tools/ai-tools/WiringGuidanceDisplay';

const PROPERTY_TYPES = [
  { id: 'domestic', label: 'Domestic' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'industrial', label: 'Industrial' },
];

const CIRCUITS: Record<string, { id: string; label: string }[]> = {
  domestic: [
    { id: 'consumer-unit', label: 'Consumer unit' },
    { id: 'lighting', label: 'Lighting circuit' },
    { id: 'ring-main', label: 'Ring main' },
    { id: 'cooker', label: 'Cooker / hob' },
    { id: 'shower', label: 'Electric shower' },
    { id: 'ev-charger', label: 'EV charger' },
    { id: 'immersion', label: 'Immersion heater' },
    { id: 'solar-pv', label: 'Solar PV' },
    { id: 'other', label: 'Other' },
  ],
  commercial: [
    { id: 'distribution-board', label: 'Distribution board' },
    { id: 'three-phase', label: '3-phase supply' },
    { id: 'commercial-lighting', label: 'Commercial lighting' },
    { id: 'hvac', label: 'HVAC' },
    { id: 'commercial-kitchen', label: 'Commercial kitchen' },
    { id: 'server-room', label: 'Server room / IT' },
    { id: 'emergency-lighting', label: 'Emergency lighting' },
    { id: 'refrigeration', label: 'Refrigeration' },
    { id: 'other', label: 'Other' },
  ],
  industrial: [
    { id: 'main-switchgear', label: 'Main switchgear' },
    { id: 'motor-control', label: 'Motor control centre' },
    { id: 'high-voltage', label: 'HV systems' },
    { id: 'industrial-lighting', label: 'Industrial lighting' },
    { id: 'ups-systems', label: 'UPS systems' },
    { id: 'plc-automation', label: 'PLC / automation' },
    { id: 'crane-hoist', label: 'Crane / hoist' },
    { id: 'welding', label: 'Welding equipment' },
    { id: 'other', label: 'Other' },
  ],
};

const CONTEXTS = [
  { id: 'new', label: 'New install' },
  { id: 'replacement', label: 'Replacement' },
  { id: 'upgrade', label: 'Upgrade' },
  { id: 'extension', label: 'Extension' },
  { id: 'fault-repair', label: 'Fault repair' },
];

const EARTHING = [
  { id: 'tn-c-s', label: 'TN-C-S (PME)' },
  { id: 'tn-s', label: 'TN-S' },
  { id: 'tt', label: 'TT' },
  { id: 'unknown', label: 'Unknown' },
];

/** Main supply rating. Chips beat a free-text box on a phone. */
const SUPPLY = ['60 A', '80 A', '100 A', "Don't know"];

/* eslint-disable @typescript-eslint/no-explicit-any */
type WiringResult = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

// ───────────────────────────────────────────────────────────────────────────

const WiringInstructionPage = () => {
  const { toast } = useToast();
  const haptic = useHaptic();
  const isMobile = useIsMobile();

  useSEO({
    title: 'Wiring Guide',
    description:
      'Step-by-step UK wiring for the accessory in front of you — terminals, colours and sequence, cited to BS 7671.',
    noindex: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const camera = useCameraCapture({
    onError: () =>
      toast({
        title: 'No camera access',
        description: 'Allow camera access, or upload a photo instead.',
        variant: 'destructive',
      }),
  });

  const [image, setImage] = useState<File | null>(null);
  const [property, setProperty] = useState('domestic');
  const [circuit, setCircuit] = useState<string | null>(null);
  const [context, setContext] = useState('new');
  const [earthing, setEarthing] = useState('unknown');
  const [supply, setSupply] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [result, setResult] = useState<WiringResult>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const circuits = CIRCUITS[property] ?? CIRCUITS.domestic;

  // One URL for the one photo, revoked when it changes or the page unmounts.
  const preview = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  const handleCapture = async () => {
    const file = await camera.capture('accessory.jpg');
    if (file) {
      haptic.success();
      setImage(file);
    }
  };

  const hasInput = Boolean(image) || description.trim().length > 0;
  const canGenerate = Boolean(circuit) && hasInput && !isAnalysing;

  const handleGenerate = async () => {
    if (!circuit) {
      toast({
        title: 'Pick a circuit first',
        description: 'It changes which regulations apply.',
        variant: 'destructive',
      });
      return;
    }
    if (!hasInput) {
      toast({
        title: 'Describe it or photograph it',
        description: 'Either works — both together works best.',
        variant: 'destructive',
      });
      return;
    }

    haptic.medium();
    setIsAnalysing(true);
    if (isMobile) setSheetOpen(true);

    try {
      let imageUrl: string | null = null;

      if (image) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const path = `${user?.id}/visual-analysis/wiring-${Date.now()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('visual-uploads')
          .upload(path, image);
        if (uploadError) throw uploadError;

        // Fresh signed URL (1h) — the function fetches it server-side, so it
        // must stay valid once visual-uploads goes private.
        imageUrl = await mintFreshSignedUrl('visual-uploads', path);
        if (!imageUrl) throw new Error('Could not prepare the uploaded image for analysis');
      }

      const circuitLabel = circuits.find((c) => c.id === circuit)?.label ?? '';
      const earthingLabel = EARTHING.find((e) => e.id === earthing)?.label ?? '';
      const contextLabel = CONTEXTS.find((c) => c.id === context)?.label ?? '';

      const { data, error } = await supabase.functions.invoke('wiring-diagram-generator-rag', {
        body: {
          component_image_url: imageUrl,
          // Description and notes both go, with the job context folded in —
          // "replacement" and "new install" want different sequences.
          component_description:
            [description.trim(), notes.trim() && `Notes: ${notes.trim()}`, `Job: ${contextLabel}`]
              .filter(Boolean)
              .join('. ') || null,
          property_type: property,
          circuit_type: circuitLabel,
          earthing_system: earthingLabel,
          supply_amps: supply && supply !== "Don't know" ? supply : null,
        },
      });

      if (error) throw error;

      if (!data?.wiring_schematic) {
        toast({
          title: 'No guidance returned',
          description: 'Try naming the accessory more specifically, or add a photo.',
          variant: 'destructive',
        });
        return;
      }

      setResult(data);
      haptic.success();
      toast({
        title: 'Wiring guide ready',
        description: data.wiring_schematic.component_name ?? 'Work through it step by step.',
        variant: 'success',
      });
    } catch (err) {
      console.error('Wiring guidance failed:', err);
      toast({
        title: 'Could not generate',
        description: 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalysing(false);
    }
  };

  /** Everything. The old reset kept the property, context, earthing and notes. */
  const reset = () => {
    haptic.light();
    setResult(null);
    setImage(null);
    setDescription('');
    setNotes('');
    setCircuit(null);
    setProperty('domestic');
    setContext('new');
    setEarthing('unknown');
    setSupply(null);
    setSheetOpen(false);
  };

  // ── The result panel ─────────────────────────────────────────────────────
  const schematic = result?.wiring_schematic;

  const panel = (
    <div
      className={cn(
        'flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-elec-yellow/35',
        'bg-gradient-to-br from-white/[0.14] via-white/[0.075] to-white/[0.045]',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_2px_8px_-3px_rgba(0,0,0,0.75)]'
      )}
    >
      <div className="shrink-0 border-b border-white/[0.10] px-5 py-4">
        <h2 className="text-[14px] font-semibold tracking-tight text-elec-yellow">
          How to wire it
        </h2>
      </div>

      {schematic ? (
        <>
          <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
            <WiringGuidanceDisplay
              componentName={schematic.component_name}
              componentDetails={schematic.component_details}
              wiringScenarios={
                schematic.wiring_scenarios?.length
                  ? schematic.wiring_scenarios
                  : [
                      {
                        scenario_id: 'default',
                        scenario_name: 'Standard installation',
                        use_case: 'Standard BS 7671 compliant installation',
                        complexity: 'simple',
                        recommended: true,
                        wiring_steps: schematic.wiring_steps,
                        terminal_connections: schematic.terminal_connections,
                        safety_warnings: schematic.safety_warnings,
                        required_tests: schematic.required_tests,
                      },
                    ]
              }
              comparison={schematic.comparison}
              preInstallationTasks={schematic.pre_installation_tasks}
              boardLayoutGuide={schematic.board_layout_guide}
              wiringSequenceStrategy={schematic.wiring_sequence_strategy}
              practicalTips={schematic.practical_tips}
              commonMistakes={schematic.common_mistakes}
            />
          </div>
          <div className="shrink-0 border-t border-white/[0.10] p-2.5">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10]"
            >
              Wire something else
            </button>
          </div>
        </>
      ) : isAnalysing ? (
        <ToolWorking
          title="Working out the sequence…"
          detail="Matching the accessory against BS 7671 and the manufacturer install data."
        />
      ) : (
        <div className="flex-1 p-5">
          <p className="text-[12.5px] leading-relaxed text-white">
            Name the accessory or photograph it, pick the circuit, and you'll get:
          </p>
          <ul className="mt-4 space-y-2.5">
            {[
              ['Terminals', 'Which core goes where, and what the terminal is marked.'],
              ['Colours', 'Including when a blue core has to be sleeved brown.'],
              ['Sequence', 'The order to work in, and what to check at each step.'],
              ['Tests', 'What to prove before you energise it.'],
            ].map(([label, blurb]) => (
              <li key={label} className="flex gap-3">
                <span className="w-[68px] shrink-0 text-[12px] font-semibold text-white">
                  {label}
                </span>
                <span className="min-w-0 flex-1 text-[12px] leading-snug text-white">{blurb}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const generateButton = (
    <ToolAction
      onClick={handleGenerate}
      disabled={!canGenerate}
      busy={isAnalysing}
      busyLabel="Working it out…"
      icon={<Cable className="h-4 w-4" aria-hidden />}
    >
      {circuit ? 'Show me how to wire it' : 'Pick a circuit first'}
    </ToolAction>
  );

  return (
    <AiToolPage
      title="Wiring Guide"
      result={panel}
      resultTitle="Wiring guide"
      hasResult={Boolean(schematic) || isAnalysing}
      action={generateButton}
      sheetOpen={sheetOpen}
      onSheetOpenChange={setSheetOpen}
    >
      <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
              <div className="space-y-4">
                <ToolPanel title="What you're wiring">
                  <p className="mb-2 text-[12px] font-medium text-white">Property</p>
                  <div className="flex flex-wrap gap-1.5">
                    {PROPERTY_TYPES.map((p) => (
                      <ToolChip
                        key={p.id}
                        on={property === p.id}
                        onClick={() => {
                          haptic.light();
                          setProperty(p.id);
                          // The circuit lists don't overlap between property
                          // types, so a stale selection would be meaningless.
                          setCircuit(null);
                        }}
                      >
                        {p.label}
                      </ToolChip>
                    ))}
                  </div>

                  <p className="mb-2 mt-4 text-[12px] font-medium text-white">Circuit</p>
                  <div className="flex flex-wrap gap-1.5">
                    {circuits.map((c) => (
                      <ToolChip
                        key={c.id}
                        on={circuit === c.id}
                        onClick={() => {
                          haptic.light();
                          setCircuit(circuit === c.id ? null : c.id);
                        }}
                      >
                        {c.label}
                      </ToolChip>
                    ))}
                  </div>
                </ToolPanel>

                <ToolPanel title="The accessory" hint={image ? '1 photo' : undefined}>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is it? e.g. 2-gang 2-way switch, Hager 6kA Type B MCB, Wylex dual RCD board…"
                    style={{ fontSize: '16px' }}
                    className={cn(
                      'min-h-[84px] resize-none rounded-xl border-white/[0.12] bg-black/20 text-white',
                      'caret-elec-yellow placeholder:text-white/45',
                      'focus-visible:border-elec-yellow focus-visible:ring-0 focus-visible:ring-offset-0'
                    )}
                  />

                  {camera.isActive ? (
                    <div className="mt-3 space-y-2">
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-elec-yellow/40 bg-black">
                        <video
                          ref={camera.videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleCapture}
                          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[12.5px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90"
                        >
                          <Camera className="h-4 w-4" aria-hidden />
                          Capture
                        </button>
                        <button
                          type="button"
                          onClick={camera.stop}
                          aria-label="Close camera"
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-white transition-colors touch-manipulation hover:border-white/[0.28]"
                        >
                          <X className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    </div>
                  ) : preview ? (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-white/[0.12]">
                        <img src={preview} alt="" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setImage(null)}
                          aria-label="Remove photo"
                          className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/25 bg-black/75 touch-manipulation"
                        >
                          <X className="h-3 w-3 text-white" aria-hidden />
                        </button>
                      </div>
                      <p className="text-[11.5px] leading-snug text-white">
                        A photo of the terminals is worth more than the model number.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={camera.start}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10]"
                      >
                        <Camera className="h-4 w-4" aria-hidden />
                        Camera
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10]"
                      >
                        <Upload className="h-4 w-4" aria-hidden />
                        Upload
                      </button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      // Materialised immediately: clearing the input below
                      // empties the live FileList, and a lazy setState updater
                      // would then read nothing.
                      const picked = Array.from(e.target.files ?? []).find((f) =>
                        f.type.startsWith('image/')
                      );
                      if (picked) setImage(picked);
                      e.target.value = '';
                    }}
                    className="hidden"
                  />

                  <p className="mt-3 text-[11.5px] leading-snug text-white">
                    One photo — that's all this tool reads. Get the terminals in frame.
                  </p>
                </ToolPanel>
              </div>

              <div className="space-y-4">
                <ToolPanel title="The situation">
                  <p className="mb-2 text-[12px] font-medium text-white">Job</p>
                  <div className="flex flex-wrap gap-1.5">
                    {CONTEXTS.map((c) => (
                      <ToolChip
                        key={c.id}
                        on={context === c.id}
                        onClick={() => {
                          haptic.light();
                          setContext(c.id);
                        }}
                      >
                        {c.label}
                      </ToolChip>
                    ))}
                  </div>

                  <p className="mb-2 mt-4 text-[12px] font-medium text-white">Earthing</p>
                  <div className="flex flex-wrap gap-1.5">
                    {EARTHING.map((e) => (
                      <ToolChip
                        key={e.id}
                        on={earthing === e.id}
                        onClick={() => {
                          haptic.light();
                          setEarthing(e.id);
                        }}
                      >
                        {e.label}
                      </ToolChip>
                    ))}
                  </div>

                  <p className="mb-2 mt-4 text-[12px] font-medium text-white">Main supply</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUPPLY.map((a) => (
                      <ToolChip
                        key={a}
                        on={supply === a}
                        onClick={() => {
                          haptic.light();
                          setSupply(supply === a ? null : a);
                        }}
                      >
                        {a}
                      </ToolChip>
                    ))}
                  </div>
                </ToolPanel>

                <ToolPanel title="Anything else">
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Existing cabling, awkward access, what's already there…"
                    style={{ fontSize: '16px' }}
                    className={cn(
                      'min-h-[84px] resize-none rounded-xl border-white/[0.12] bg-black/20 text-white',
                      'caret-elec-yellow placeholder:text-white/45',
                      'focus-visible:border-elec-yellow focus-visible:ring-0 focus-visible:ring-offset-0'
                    )}
                  />
                </ToolPanel>
              </div>
            </div>

      <canvas ref={camera.canvasRef} className="hidden" />
    </AiToolPage>
  );
};

export default WiringInstructionPage;
