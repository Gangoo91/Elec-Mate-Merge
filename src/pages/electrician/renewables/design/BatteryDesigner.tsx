/**
 * Battery storage designer — size the battery against the customer's real
 * daily usage, settle AC vs DC coupling, prove the grid route and export
 * position, then pre-fill the BESS certificate.
 */

import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FileCheck2, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { draftStorage } from '@/utils/draftStorage';
import {
  defaultBatteryDesign,
  runBatteryDesign,
  buildBESSDraft,
  batterySummaryLines,
  type BatteryDesignState,
} from '@/utils/renewables/designEngine';
import { type DesignProposal } from '@/utils/renewables/designIntake';
import { batteryStateFromProposal } from '@/utils/renewables/designProposalResolvers';
import { batteryDesignToQuote, QUOTE_BUILDER_PATH } from '@/utils/renewables/designToQuote';
import { useDesignDraft } from './useDesignDraft';
import {
  DesignShell,
  DesignStatus,
  NumField,
  Segmented,
  SectionTitle,
  CheckCard,
  FooterNav,
  inputCn,
} from './designUi';
import DesignInsightsPanel from './DesignInsightsPanel';

const STEPS = ['System', 'Sizing & grid', 'Handover'];

export default function BatteryDesigner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [s, setS] = useState<BatteryDesignState>(() => {
    const proposal = (location.state as { proposal?: DesignProposal } | null)?.proposal;
    return proposal?.technology === 'battery'
      ? batteryStateFromProposal(proposal)
      : defaultBatteryDesign();
  });
  const [aiNotes, setAiNotes] = useState<string[] | null>(() => {
    const proposal = (location.state as { proposal?: DesignProposal } | null)?.proposal;
    return proposal?.technology === 'battery' ? proposal.notes : null;
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
    'design-battery',
    s,
    (saved) => setS({ ...defaultBatteryDesign(), ...saved }),
    hadProposal
  );

  const out = useMemo(() => runBatteryDesign(s), [s]);
  const set = <K extends keyof BatteryDesignState>(k: K, v: BatteryDesignState[K]) =>
    setS((p) => ({ ...p, [k]: v }));

  const goto = (i: number) => {
    setStep(i);
    setMaxStep((m) => Math.max(m, i));
  };

  const createCert = () => {
    const ok = draftStorage.saveDraft(
      'bess',
      null,
      buildBESSDraft(s, out) as Record<string, unknown>
    );
    if (!ok) {
      toast.error('Could not stage the certificate draft on this device');
      return;
    }
    toast.success('Design sent to a new Battery Storage certificate', {
      description: 'Recover the draft when the certificate opens — system details are pre-filled.',
    });
    navigate('/electrician/inspection-testing/bess/new');
  };

  return (
    <DesignShell
      eyebrow="Design · Battery storage"
      title="Battery storage"
      standard="IET CoP · Section 826"
      description="Size the battery against real daily usage, settle the coupling, and prove the grid connection route before you order kit."
      steps={STEPS}
      activeStep={step}
      maxReachedStep={maxStep}
      onStepChange={setStep}
      aiNotes={aiNotes ?? undefined}
      pulse={
        <DesignStatus
          compact
          figures={[
            { label: 'usable', value: `${s.usableKwh} kWh` },
            { label: 'inverter', value: `${s.inverterKw} kW` },
            { label: 'site gen', value: `${s.inverterKw + s.pvInverterKw} kW` },
          ]}
          checks={out.checks}
        />
      }
      aside={
        <DesignStatus
          figures={[
            { label: 'usable', value: `${s.usableKwh} kWh` },
            { label: 'inverter', value: `${s.inverterKw} kW` },
            { label: 'site generation', value: `${s.inverterKw + s.pvInverterKw} kW` },
            { label: 'coupling', value: s.coupling === 'ac' ? 'AC' : 'Hybrid' },
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
              onClick={createCert}
              disabled={!s.batteryMake.trim() || !s.batteryModel.trim()}
              className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-bold text-[15px] hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation gap-2 disabled:opacity-40"
            >
              <FileCheck2 className="h-4 w-4" />
              {!s.batteryMake.trim() || !s.batteryModel.trim()
                ? 'Enter battery make & model first'
                : 'Create Battery Storage certificate'}
            </Button>
          </>
        )
      }
    >
      {/* ── Step 1 · System ── */}
      {step === 0 && (
        <div className="space-y-6 max-w-2xl">
          <section className="space-y-3.5">
            <SectionTitle>Battery</SectionTitle>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label className="text-white text-[11.5px] font-medium mb-1.5 block tracking-wide">
                  Make
                </Label>
                <Input
                  value={s.batteryMake}
                  onChange={(e) => set('batteryMake', e.target.value)}
                  placeholder="e.g. GivEnergy"
                  className={inputCn}
                />
              </div>
              <div>
                <Label className="text-white text-[11.5px] font-medium mb-1.5 block tracking-wide">
                  Model
                </Label>
                <Input
                  value={s.batteryModel}
                  onChange={(e) => set('batteryModel', e.target.value)}
                  placeholder="e.g. All in One 13.5"
                  className={inputCn}
                />
              </div>
              <NumField
                label="Usable capacity"
                unit="kWh"
                value={s.usableKwh}
                step={0.5}
                onChange={(n) => set('usableKwh', n)}
              />
              <NumField
                label="Max charge / discharge"
                unit="kW"
                value={s.maxChargeKw}
                step={0.5}
                onChange={(n) => set('maxChargeKw', n)}
              />
            </div>
          </section>

          <section className="space-y-3.5">
            <SectionTitle>Coupling & inverter</SectionTitle>
            <Segmented
              label="Coupling"
              value={s.coupling}
              onChange={(v) => set('coupling', v)}
              options={[
                {
                  value: 'ac',
                  label: 'AC-coupled',
                  sub: 'Own inverter — retrofits beside existing PV',
                },
                {
                  value: 'dc-hybrid',
                  label: 'DC-coupled hybrid',
                  sub: 'One hybrid inverter runs PV + battery',
                },
              ]}
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <NumField
                label="Battery inverter rating"
                unit="kW"
                value={s.inverterKw}
                step={0.5}
                onChange={(n) => set('inverterKw', n)}
              />
              <NumField
                label="Separate AC PV inverter"
                unit="kW"
                value={s.pvInverterKw}
                step={0.5}
                onChange={(n) => set('pvInverterKw', n)}
                hint={
                  s.coupling === 'dc-hybrid'
                    ? 'Only a SEPARATE AC-coupled PV inverter — PV on this hybrid is already counted'
                    : '0 if battery-only'
                }
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
          </section>
        </div>
      )}

      {/* ── Step 2 · Sizing & grid ── */}
      {step === 1 && (
        <div className="space-y-5 max-w-2xl">
          <section className="space-y-3.5">
            <SectionTitle>Usage & export</SectionTitle>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <NumField
                label="Daily usage"
                unit="kWh"
                value={s.dailyUsageKwh}
                step={0.5}
                onChange={(n) => set('dailyUsageKwh', n)}
                hint="UK average home ≈ 8–10 kWh"
              />
              <NumField
                label="DNO export allowance"
                unit="kW"
                value={s.dnoExportKw}
                onChange={(n) => set('dnoExportKw', n)}
                hint="3.68 kW unless agreed otherwise"
              />
            </div>
          </section>
          <div className="space-y-3.5">
            {out.checks.map((c) => (
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
              {batterySummaryLines(s, out).map((l, i) => (
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
              if (!batteryDesignToQuote(s)) {
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

          <DesignInsightsPanel tech="battery" />

          <button
            type="button"
            onClick={() => {
              setS(defaultBatteryDesign());
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
