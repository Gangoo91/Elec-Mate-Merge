/**
 * Heat pump designer — estimate the heat load, derive the electrical demand
 * through the SCOP, and size the supply. The certificate handover arrives with
 * the Heat Pump certificate; until then the summary copies cleanly into
 * quotes, DNO applications and job notes.
 */

import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ClipboardCopy, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  defaultHeatPumpDesign,
  runHeatPumpDesign,
  heatPumpSummaryLines,
  type HeatPumpDesignState,
} from '@/utils/renewables/designEngine';
import { type DesignProposal } from '@/utils/renewables/designIntake';
import { heatPumpStateFromProposal } from '@/utils/renewables/designProposalResolvers';
import { heatPumpDesignToQuote, QUOTE_BUILDER_PATH } from '@/utils/renewables/designToQuote';
import { useDesignDraft } from './useDesignDraft';
import {
  DesignShell,
  DesignStatus,
  NumField,
  Segmented,
  SectionTitle,
  FigureGrid,
  CheckCard,
  FooterNav,
} from './designUi';
import DesignInsightsPanel from './DesignInsightsPanel';

const STEPS = ['Heat load', 'Electrical supply', 'Handover'];

export default function HeatPumpDesigner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [s, setS] = useState<HeatPumpDesignState>(() => {
    const proposal = (location.state as { proposal?: DesignProposal } | null)?.proposal;
    return proposal?.technology === 'heat-pump'
      ? heatPumpStateFromProposal(proposal)
      : defaultHeatPumpDesign();
  });
  const [aiNotes, setAiNotes] = useState<string[] | null>(() => {
    const proposal = (location.state as { proposal?: DesignProposal } | null)?.proposal;
    return proposal?.technology === 'heat-pump' ? proposal.notes : null;
  });
  const [hadProposal] = useState(
    () => !!(location.state as { proposal?: DesignProposal } | null)?.proposal
  );
  useEffect(() => {
    if (location.state) navigate(location.pathname, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const { clearDraft } = useDesignDraft(
    'design-heat-pump',
    s,
    (saved) => setS({ ...defaultHeatPumpDesign(), ...saved }),
    hadProposal
  );

  const out = useMemo(() => runHeatPumpDesign(s), [s]);
  const set = <K extends keyof HeatPumpDesignState>(k: K, v: HeatPumpDesignState[K]) =>
    setS((p) => ({ ...p, [k]: v }));

  const goto = (i: number) => {
    setStep(i);
    setMaxStep((m) => Math.max(m, i));
  };

  const copySummary = async () => {
    const text = heatPumpSummaryLines(s, out).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Design summary copied');
    } catch {
      toast.error('Could not copy on this device');
    }
  };

  const checksFor = (ids: string[]) => out.checks.filter((c) => ids.includes(c.id));

  return (
    <DesignShell
      eyebrow="Design · Heat pump"
      title="Heat pump supply"
      standard="MIS 3005 · BS EN 12831"
      description="Estimate the heat load, derive the electrical demand through the seasonal COP, and size the supply before the DNO conversation."
      steps={STEPS}
      activeStep={step}
      maxReachedStep={maxStep}
      onStepChange={setStep}
      aiNotes={aiNotes ?? undefined}
      pulse={
        <DesignStatus
          compact
          figures={[
            { label: 'heat load', value: `${out.thermalKw} kWth` },
            { label: 'electrical', value: `${out.electricalKw} kW` },
          ]}
          checks={out.checks}
        />
      }
      aside={
        <DesignStatus
          figures={[
            { label: 'heat load', value: `${out.thermalKw} kWth` },
            { label: 'electrical demand', value: `${out.electricalKw} kW` },
            { label: 'SCOP', value: String(s.scop) },
            { label: 'supply', value: s.phases === 3 ? '3-phase' : 'Single-phase' },
          ]}
          checks={out.checks}
        />
      }
      footer={
        step < STEPS.length - 1 ? (
          <FooterNav
            onBack={step > 0 ? () => setStep(step - 1) : undefined}
            onNext={() => goto(step + 1)}
          />
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              className="h-12 px-4 rounded-xl text-white hover:text-white hover:bg-white/[0.08] touch-manipulation"
            >
              Back
            </Button>
            <Button
              onClick={copySummary}
              className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-bold text-[15px] hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation gap-2"
            >
              <ClipboardCopy className="h-4 w-4" />
              Copy design summary
            </Button>
          </>
        )
      }
    >
      {/* ── Step 1 · Heat load ── */}
      {step === 0 && (
        <div className="space-y-5 max-w-2xl">
          <section className="space-y-3.5">
            <SectionTitle>The building</SectionTitle>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <NumField
                label="Floor area"
                unit="m²"
                value={s.floorArea}
                onChange={(n) => set('floorArea', n)}
              />
              <NumField
                label="Heat loss factor"
                unit="W/m²"
                value={s.heatLossFactor}
                onChange={(n) => set('heatLossFactor', n)}
                hint="New build ≈ 40 · solid-wall pre-war ≈ 80+"
              />
              <NumField
                label="Hot water allowance"
                unit="kW"
                value={s.dhwKw}
                step={0.5}
                onChange={(n) => set('dhwKw', n)}
              />
            </div>
          </section>
          <div className="space-y-3.5">
            {checksFor(['heat-pump-sizing']).map((c) => (
              <CheckCard key={c.id} check={c} />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2 · Electrical supply ── */}
      {step === 1 && (
        <div className="space-y-5 max-w-2xl">
          <section className="space-y-3.5">
            <SectionTitle>From heat to amps</SectionTitle>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <NumField
                label="Seasonal COP"
                value={s.scop}
                step={0.1}
                onChange={(n) => set('scop', n)}
                hint="Typical ASHP ≈ 3.0–3.5"
              />
            </div>
            <Segmented
              label="Supply"
              value={s.phases}
              onChange={(v) => set('phases', v)}
              options={[
                { value: 1, label: 'Single-phase', sub: '230 V' },
                { value: 3, label: 'Three-phase', sub: '400 V' },
              ]}
            />
            <FigureGrid
              figures={[
                { label: 'Design heat load', value: `${out.thermalKw} kWth` },
                {
                  label: 'Electrical demand',
                  value: `${out.electricalKw} kW`,
                  sub: `at SCOP ${s.scop}`,
                },
              ]}
            />
          </section>
          <div className="space-y-3.5">
            {checksFor(['heat-pump-supply']).map((c) => (
              <CheckCard key={c.id} check={c} />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 3 · Handover ── */}
      {step === 2 && (
        <div className="space-y-5 max-w-2xl">
          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-4 sm:p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Design summary
            </p>
            <ul className="mt-3 space-y-2">
              {heatPumpSummaryLines(s, out).map((l, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0" />
                  <span className="text-[13px] leading-relaxed text-white">{l}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              if (!heatPumpDesignToQuote(s, out)) {
                toast.error('Could not stage the quote on this device');
                return;
              }
              toast.success('Design sent to a new quote', {
                description:
                  'Restore the draft when the quote builder opens — the supply work is pre-filled.',
              });
              navigate(QUOTE_BUILDER_PATH);
            }}
            className="w-full h-12 rounded-xl border-elec-yellow/40 bg-elec-yellow/[0.06] text-elec-yellow font-semibold text-[14px] hover:bg-elec-yellow/[0.12] touch-manipulation"
          >
            Send to a quote — supply work pre-filled
          </Button>

          <DesignInsightsPanel tech="heat-pump" />

          <button
            type="button"
            onClick={() => {
              setS(defaultHeatPumpDesign());
              setAiNotes(null);
              setStep(0);
              setMaxStep(0);
              clearDraft();
            }}
            className="flex items-center gap-2 text-[12.5px] font-medium text-white/70 hover:text-white touch-manipulation h-11"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Start a new design
          </button>
        </div>
      )}
    </DesignShell>
  );
}
