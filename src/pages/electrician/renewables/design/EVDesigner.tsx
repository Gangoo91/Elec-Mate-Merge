/**
 * EV charging designer — pick a real charge point, prove the supply can take
 * it with diversity, settle the earthing approach, then pre-fill the EV
 * charging certificate.
 */

import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FileCheck2, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChargerAutocomplete } from '@/components/inspection/ev-charging/ChargerAutocomplete';
import { draftStorage } from '@/utils/draftStorage';
import {
  defaultEVDesign,
  runEVDesign,
  buildEVDraft,
  evSummaryLines,
  type EVDesignState,
} from '@/utils/renewables/designEngine';
import { type DesignProposal } from '@/utils/renewables/designIntake';
import { evStateFromProposal } from '@/utils/renewables/designProposalResolvers';
import { evDesignToQuote, QUOTE_BUILDER_PATH } from '@/utils/renewables/designToQuote';
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
import { cn } from '@/lib/utils';

const STEPS = ['Charge point', 'Supply & earthing', 'Handover'];

const EARTHING_OPTIONS: { value: EVDesignState['earthing']; label: string; sub: string }[] = [
  {
    value: 'pme-od',
    label: 'PME + open-PEN device',
    sub: 'Charge point with built-in O-PEN protection (722.411.4.1)',
  },
  {
    value: 'matt-e',
    label: 'PME + external O-PEN unit',
    sub: 'Separate protection device ahead of the charge point',
  },
  {
    value: 'tt',
    label: 'TT island',
    sub: 'Separated earth electrode for the charge point',
  },
];

export default function EVDesigner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [s, setS] = useState<EVDesignState>(() => {
    const proposal = (location.state as { proposal?: DesignProposal } | null)?.proposal;
    return proposal?.technology === 'ev' ? evStateFromProposal(proposal) : defaultEVDesign();
  });
  const [aiNotes, setAiNotes] = useState<string[] | null>(() => {
    const proposal = (location.state as { proposal?: DesignProposal } | null)?.proposal;
    return proposal?.technology === 'ev' ? proposal.notes : null;
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
    'design-ev',
    s,
    (saved) => setS({ ...defaultEVDesign(), ...saved }),
    hadProposal
  );

  const out = useMemo(() => runEVDesign(s), [s]);
  const set = <K extends keyof EVDesignState>(k: K, v: EVDesignState[K]) =>
    setS((p) => ({ ...p, [k]: v }));

  const goto = (i: number) => {
    setStep(i);
    setMaxStep((m) => Math.max(m, i));
  };

  const createCert = () => {
    const ok = draftStorage.saveDraft(
      'ev-charging',
      null,
      buildEVDraft(s, out) as Record<string, unknown>
    );
    if (!ok) {
      toast.error('Could not stage the certificate draft on this device');
      return;
    }
    toast.success('Design sent to a new EV Charging certificate', {
      description:
        'Recover the draft when the certificate opens — charge point and earthing are pre-filled.',
    });
    navigate('/electrician/inspection-testing/ev-charging/new');
  };

  return (
    <DesignShell
      eyebrow="Design · EV charging"
      title="EV charge point"
      standard="BS 7671 722 · Doc S"
      description="Pick a real charge point, prove the supply can take the load with diversity, and settle the earthing approach before you're stood at the intake."
      steps={STEPS}
      activeStep={step}
      maxReachedStep={maxStep}
      onStepChange={setStep}
      aiNotes={aiNotes ?? undefined}
      pulse={
        <DesignStatus
          compact
          figures={[
            { label: 'connected', value: `${(s.chargerKw * s.numChargers).toFixed(1)} kW` },
            {
              label: 'after diversity',
              value: `${((s.chargerKw * s.numChargers * s.diversityPct) / 100).toFixed(1)} kW`,
            },
          ]}
          checks={out.checks}
        />
      }
      aside={
        <DesignStatus
          figures={[
            { label: 'charge points', value: String(s.numChargers) },
            { label: 'connected', value: `${(s.chargerKw * s.numChargers).toFixed(1)} kW` },
            {
              label: 'after diversity',
              value: `${((s.chargerKw * s.numChargers * s.diversityPct) / 100).toFixed(1)} kW`,
            },
            { label: 'spare supply', value: `${s.spareKw} kW` },
          ]}
          checks={out.checks}
          emptyHint="Choose a charge point — the load builds live here as you go."
        />
      }
      footer={
        step < STEPS.length - 1 ? (
          <FooterNav
            onBack={step > 0 ? () => setStep(step - 1) : undefined}
            onNext={() => goto(step + 1)}
            nextDisabled={(step === 0 && !s.charger) || (step === 1 && s.earthing === '')}
            nextLabel={
              step === 0 && !s.charger
                ? 'Choose a charge point'
                : step === 1 && s.earthing === ''
                  ? 'Choose the earthing approach'
                  : 'Continue'
            }
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
              onClick={createCert}
              disabled={s.earthing === ''}
              className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-bold text-[15px] hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation gap-2 disabled:opacity-40"
            >
              <FileCheck2 className="h-4 w-4" />
              Create EV Charging certificate
            </Button>
          </>
        )
      }
    >
      {/* ── Step 1 · Charge point ── */}
      {step === 0 && (
        <div className="space-y-6 max-w-2xl">
          <section className="space-y-3.5">
            <SectionTitle>Charge point</SectionTitle>
            <ChargerAutocomplete
              value={s.charger ? { make: s.charger.make, model: s.charger.model } : undefined}
              onChange={(c) => {
                set('charger', c);
                if (c) set('chargerKw', c.powerOptions[0] ?? 7.4);
                else setMaxStep(0); // cleared kit — collapse the step rail
              }}
            />
            {s.charger && (
              <>
                <FigureGrid
                  figures={[
                    { label: 'Connection', value: s.charger.connection },
                    { label: 'RCD', value: s.charger.rcdType },
                    {
                      label: 'Recommended cable',
                      value: `${s.charger.recommendedCable} mm²`,
                    },
                    {
                      label: 'OZEV approved',
                      value: s.charger.ozevApproved ? 'Yes' : 'No',
                    },
                  ]}
                />
                {(s.charger.powerOptions?.length ?? 0) > 1 && (
                  <Segmented
                    label="Power option"
                    value={s.chargerKw}
                    onChange={(v) => set('chargerKw', v)}
                    options={(s.charger.powerOptions ?? []).map((p) => ({
                      value: p,
                      label: `${p} kW`,
                    }))}
                  />
                )}
              </>
            )}
          </section>
          <section className="space-y-3.5">
            <SectionTitle>How many</SectionTitle>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <NumField
                label="Charge points"
                value={s.numChargers}
                onChange={(n) => set('numChargers', Math.max(1, Math.round(n)))}
              />
              <NumField
                label="Diversity"
                unit="%"
                value={s.diversityPct}
                onChange={(n) => set('diversityPct', n)}
                hint="100% for a single domestic point"
              />
            </div>
          </section>
        </div>
      )}

      {/* ── Step 2 · Supply & earthing ── */}
      {step === 1 && (
        <div className="space-y-5 max-w-2xl">
          <section className="space-y-3.5">
            <SectionTitle>Supply headroom</SectionTitle>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <NumField
                label="Spare supply capacity"
                unit="kW"
                value={s.spareKw}
                onChange={(n) => set('spareKw', n)}
                hint="What's left after the existing maximum demand"
              />
            </div>
          </section>

          <div className="space-y-3.5">
            {out.checks.map((c) => (
              <CheckCard key={c.id} check={c} />
            ))}
          </div>

          <section className="space-y-3.5">
            <SectionTitle>Earthing approach</SectionTitle>
            <div className="space-y-2">
              {EARTHING_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => set('earthing', o.value)}
                  className={cn(
                    'w-full min-h-[44px] rounded-xl border px-4 py-3 text-left transition-colors touch-manipulation',
                    s.earthing === o.value
                      ? 'bg-elec-yellow/[0.12] border-elec-yellow/50'
                      : 'bg-white/[0.03] border-white/[0.1] hover:border-white/[0.2]'
                  )}
                >
                  <span
                    className={cn(
                      'block text-[13.5px] font-semibold',
                      s.earthing === o.value ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {o.label}
                  </span>
                  <span className="block text-[11px] text-white/60 mt-0.5">{o.sub}</span>
                </button>
              ))}
            </div>
            {out.warnings.map((w, i) => (
              <p
                key={i}
                className="text-[12.5px] leading-relaxed text-amber-100 bg-amber-500/[0.07] border border-amber-500/25 rounded-xl px-4 py-3"
              >
                {w}
              </p>
            ))}
          </section>
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
              {evSummaryLines(s, out).map((l, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0" />
                  <span className="text-[13px] leading-relaxed text-white">{l}</span>
                </li>
              ))}
              {s.earthing !== '' && (
                <li className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0" />
                  <span className="text-[13px] leading-relaxed text-white">
                    Earthing: {EARTHING_OPTIONS.find((o) => o.value === s.earthing)?.label}
                  </span>
                </li>
              )}
            </ul>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              if (!evDesignToQuote(s)) {
                toast.error('Could not stage the quote on this device');
                return;
              }
              toast.success('Design sent to a new quote', {
                description:
                  'Restore the draft when the quote builder opens — kit and quantities are pre-filled.',
              });
              navigate(QUOTE_BUILDER_PATH);
            }}
            className="w-full h-12 rounded-xl border-elec-yellow/40 bg-elec-yellow/[0.06] text-elec-yellow font-semibold text-[14px] hover:bg-elec-yellow/[0.12] touch-manipulation"
          >
            Send to a quote — kit & quantities pre-filled
          </Button>

          <DesignInsightsPanel tech="ev" />

          <button
            type="button"
            onClick={() => {
              setS(defaultEVDesign());
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
