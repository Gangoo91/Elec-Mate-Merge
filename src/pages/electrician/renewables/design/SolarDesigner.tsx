/**
 * Solar PV designer — pick real kit, get a compliant string plan, prove the
 * electrical design, see the yield, walk away with a single-line diagram and a
 * pre-filled MCS certificate. Every number comes from the same audited engine
 * as the renewable calculators.
 */

import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FileCheck2, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PVPanelAutocomplete from '@/components/inspection/solar-pv/PVPanelAutocomplete';
import InverterAutocomplete from '@/components/inspection/solar-pv/InverterAutocomplete';
import SolarSLD from '@/components/renewables/SolarSLD';
import DesignInsightsPanel from './DesignInsightsPanel';
import { draftStorage } from '@/utils/draftStorage';
import {
  defaultSolarDesign,
  runSolarDesign,
  buildSolarPVDraft,
  solarSummaryLines,
  type SolarDesignState,
} from '@/utils/renewables/designEngine';
import { type DesignProposal } from '@/utils/renewables/designIntake';
import { solarStateFromProposal } from '@/utils/renewables/designProposalResolvers';
import { solarDesignToQuote, QUOTE_BUILDER_PATH } from '@/utils/renewables/designToQuote';
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

const STEPS = ['System', 'Strings', 'Cabling', 'Grid & yield', 'Handover'];

export default function SolarDesigner() {
  const navigate = useNavigate();
  const location = useLocation();
  // Consume the AI proposal ONCE — a refresh mid-design must not silently
  // re-apply it over the user's edits, so the history state is cleared after.
  const [s, setS] = useState<SolarDesignState>(() => {
    const proposal = (location.state as { proposal?: DesignProposal } | null)?.proposal;
    return proposal?.technology === 'solar'
      ? solarStateFromProposal(proposal).state
      : defaultSolarDesign();
  });
  const [aiNotes, setAiNotes] = useState<string[] | null>(() => {
    const proposal = (location.state as { proposal?: DesignProposal } | null)?.proposal;
    return proposal?.technology === 'solar' ? proposal.notes : null;
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
    'design-solar',
    s,
    (saved) => setS({ ...defaultSolarDesign(), ...saved }),
    hadProposal
  );

  const out = useMemo(() => runSolarDesign(s), [s]);
  const plan = out.plan;
  const set = <K extends keyof SolarDesignState>(k: K, v: SolarDesignState[K]) =>
    setS((p) => ({ ...p, [k]: v }));

  // Changing the kit invalidates everything downstream — clear any string
  // override and collapse the step rail so stale results can't be revisited.
  const setKit = (patch: Partial<SolarDesignState>) => {
    setS((p) => ({ ...p, ...patch, panelsPerStringOverride: null }));
    setMaxStep(0);
  };

  const goto = (i: number) => {
    setStep(i);
    setMaxStep((m) => Math.max(m, i));
  };

  const createCert = () => {
    const draft = buildSolarPVDraft(s, out);
    const ok = draftStorage.saveDraft('solar-pv', null, draft as Record<string, unknown>);
    if (!ok) {
      toast.error('Could not stage the certificate draft on this device');
      return;
    }
    toast.success('Design sent to a new Solar PV certificate', {
      description:
        'Recover the draft when the certificate opens — panels, strings and inverter are pre-filled.',
    });
    navigate('/electrician/inspection-testing/solar-pv/new');
  };

  const kitChosen = !!s.panel && !!s.inverter;
  const planOk = !!plan && plan.panelCount > 0 && plan.sizing.valid;

  const checksFor = (ids: string[]) => out.checks.filter((c) => ids.includes(c.id));

  const statusFigures =
    plan && plan.panelCount > 0
      ? [
          { label: 'array', value: `${plan.kwp} kWp` },
          { label: 'panels', value: String(plan.panelCount) },
          { label: 'strings', value: `${plan.strings} × ${plan.panelsPerString}` },
          {
            label: 'route',
            value: out.checks.find((c) => c.id === 'g98-g99')?.result.headline.split(' ')[0] ?? '—',
          },
        ]
      : [];

  return (
    <DesignShell
      eyebrow="Design · Solar PV"
      title="Solar PV system"
      standard="IET CoP · MIS 3002"
      description="Choose real MCS-listed kit and a target size — the suite plans the strings, proves the cabling and grid route, then hands the design straight to the certificate."
      steps={STEPS}
      activeStep={step}
      maxReachedStep={maxStep}
      onStepChange={setStep}
      aiNotes={aiNotes ?? undefined}
      pulse={<DesignStatus compact figures={statusFigures} checks={out.checks} />}
      aside={
        <DesignStatus
          figures={statusFigures}
          checks={out.checks}
          emptyHint="Choose a panel and inverter — the design builds live here as you go."
        >
          {plan && plan.panelCount > 0 && s.panel && s.inverter && (
            <div className="rounded-xl bg-black/40 border border-white/[0.1] p-2">
              <SolarSLD
                plan={plan}
                panelName={`${s.panel.make} ${s.panel.model}`}
                inverterName={`${s.inverter.make} ${s.inverter.model}`}
                inverterKw={s.inverter.ratedPowerAc}
                phases={s.inverter.phases === 'three' ? 3 : 1}
                className="w-full h-auto"
              />
            </div>
          )}
        </DesignStatus>
      }
      footer={
        step < STEPS.length - 1 ? (
          <FooterNav
            onBack={step > 0 ? () => setStep(step - 1) : undefined}
            onNext={() => goto(step + 1)}
            nextDisabled={(step === 0 && !kitChosen) || (step === 1 && !planOk)}
            nextLabel={step === 0 && !kitChosen ? 'Choose panel & inverter' : 'Continue'}
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
              disabled={!planOk}
              className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-bold text-[15px] hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation gap-2 disabled:opacity-40"
            >
              <FileCheck2 className="h-4 w-4" />
              Create Solar PV certificate
            </Button>
          </>
        )
      }
    >
      {/* ── Step 1 · System ── */}
      {step === 0 && (
        <div className="space-y-6 max-w-2xl">
          <section className="space-y-3.5">
            <SectionTitle>Panel</SectionTitle>
            <PVPanelAutocomplete
              value={s.panel ? `${s.panel.make} ${s.panel.model}` : ''}
              onPanelSelect={(p) => setKit({ panel: p })}
              placeholder="Search MCS-listed panels…"
            />
            {s.panel && (
              <FigureGrid
                figures={[
                  { label: 'Power', value: `${s.panel.wattage} Wp` },
                  { label: 'Voc / Vmp', value: `${s.panel.voc} / ${s.panel.vmp} V` },
                  { label: 'Isc / Imp', value: `${s.panel.isc} / ${s.panel.imp} A` },
                  { label: 'Temp coeff Voc', value: `${s.panel.tempCoeffVoc} %/°C` },
                ]}
              />
            )}
          </section>

          <section className="space-y-3.5">
            <SectionTitle>Inverter</SectionTitle>
            <InverterAutocomplete
              value={s.inverter ? `${s.inverter.make} ${s.inverter.model}` : ''}
              onInverterSelect={(inv) => setKit({ inverter: inv })}
              placeholder="Search MCS-listed inverters…"
            />
            {s.inverter && (
              <FigureGrid
                figures={[
                  { label: 'AC output', value: `${s.inverter.ratedPowerAc} kW` },
                  { label: 'MPPTs', value: `${s.inverter.mpptCount}` },
                  {
                    label: 'MPPT window',
                    value: `${s.inverter.mpptVoltageMin}–${s.inverter.mpptVoltageMax} V`,
                  },
                  { label: 'Max DC input', value: `${s.inverter.maxInputVoltage} V` },
                ]}
              />
            )}
          </section>

          <section className="space-y-3.5">
            <SectionTitle>Target</SectionTitle>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <NumField
                label="Target array size"
                unit="kWp"
                value={s.targetKwp}
                step={0.5}
                onChange={(n) => set('targetKwp', n)}
              />
              <NumField
                label="Coldest cell temp"
                unit="°C"
                value={s.tMin}
                min={-40}
                onChange={(n) => set('tMin', n)}
                hint="UK design value −10 °C"
              />
              <NumField
                label="Hottest cell temp"
                unit="°C"
                value={s.tCellMax}
                onChange={(n) => set('tCellMax', n)}
                hint="Roof-mounted design value +70 °C"
              />
            </div>
          </section>
        </div>
      )}

      {/* ── Step 2 · Strings ── */}
      {step === 1 && plan && s.panel && s.inverter && (
        <div className="space-y-4 max-w-2xl">
          <div className="rounded-2xl border border-elec-yellow/30 bg-gradient-to-b from-elec-yellow/[0.09] to-elec-yellow/[0.02] p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/70 font-semibold">
              String plan
            </p>
            {plan.panelCount > 0 ? (
              <>
                <p className="text-[28px] sm:text-[32px] font-bold text-elec-yellow leading-[1.06] mt-1 tracking-tight">
                  {plan.strings} × {plan.panelsPerString} panels = {plan.kwp} kWp
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white">
                  {plan.panelCount} × {s.panel.make} {s.panel.model} across {plan.mpptsUsed} MPPT
                  {plan.mpptsUsed > 1 ? 's' : ''} — asked for {s.targetKwp} kWp.
                </p>
                <div className="mt-4">
                  <FigureGrid
                    figures={[
                      {
                        label: 'String Voc (cold)',
                        value: `${plan.stringVocCold} V`,
                        sub: `limit ${s.inverter.maxInputVoltage} V`,
                      },
                      {
                        label: 'String Vmp',
                        value: `${plan.stringVmp} V`,
                        sub: `window ${s.inverter.mpptVoltageMin}–${s.inverter.mpptVoltageMax} V`,
                      },
                      {
                        label: 'Panels per string',
                        value: `${plan.sizing.nMin}–${Math.min(plan.sizing.nMax, plan.sizing.nMaxMppt)}`,
                        sub: 'valid range',
                      },
                      {
                        label: 'DC design current',
                        value: `${plan.sizing.designCurrent} A`,
                        sub: '1.25 × Isc · BS 7671 712',
                      },
                    ]}
                  />
                </div>
              </>
            ) : (
              <p className="text-[17px] font-bold text-red-400 mt-1">
                No valid string length — this panel and inverter don't match. Try a different
                inverter or panel.
              </p>
            )}
          </div>

          {plan.panelCount > 0 && (
            <Segmented
              label="Panels per string"
              value={plan.panelsPerString}
              onChange={(v) =>
                set('panelsPerStringOverride', v === plan.sizing.recommended ? null : v)
              }
              options={Array.from(
                {
                  length: Math.max(
                    0,
                    Math.min(plan.sizing.nMax, plan.sizing.nMaxMppt) - plan.sizing.nMin + 1
                  ),
                },
                (_, i) => {
                  const n = plan.sizing.nMin + i;
                  return {
                    value: n,
                    label: `${n} panels`,
                    sub:
                      n === plan.sizing.recommended
                        ? 'Recommended'
                        : `${(n * (s.panel?.vmp ?? 0)).toFixed(0)} V string`,
                  };
                }
              )}
            />
          )}

          {out.warnings.map((w, i) => (
            <p
              key={i}
              className="text-[12.5px] leading-relaxed text-amber-100 bg-amber-500/[0.07] border border-amber-500/25 rounded-xl px-4 py-3"
            >
              {w}
            </p>
          ))}
        </div>
      )}

      {/* ── Step 3 · Cabling ── */}
      {step === 2 && (
        <div className="space-y-5 max-w-2xl">
          <section className="space-y-3.5">
            <SectionTitle>Cable runs</SectionTitle>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <NumField
                label="DC run (one way)"
                unit="m"
                value={s.dcRunM}
                onChange={(n) => set('dcRunM', n)}
              />
              <NumField
                label="DC cable CSA"
                unit="mm²"
                value={s.dcCsa}
                onChange={(n) => set('dcCsa', n)}
                hint="Solar cable, typically 4 or 6 mm²"
              />
              <NumField
                label="AC run, inverter → CU"
                unit="m"
                value={s.acRunM}
                onChange={(n) => set('acRunM', n)}
              />
              <NumField
                label="AC cable CSA"
                unit="mm²"
                value={s.acCsa}
                onChange={(n) => set('acCsa', n)}
              />
            </div>
          </section>
          <div className="space-y-3.5">
            {checksFor(['dc-vd', 'ac-vd']).map((c) => (
              <CheckCard key={c.id} check={c} />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 4 · Grid & yield ── */}
      {step === 3 && (
        <div className="space-y-5 max-w-2xl">
          <section className="space-y-3.5">
            <SectionTitle>Site</SectionTitle>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <NumField
                label="Specific yield"
                unit="kWh/kWp"
                value={s.specificYield}
                onChange={(n) => set('specificYield', n)}
                hint="UK typical 850–1,000 (PVGIS)"
              />
              <NumField
                label="Battery inverter"
                unit="kW"
                value={s.batteryKw}
                onChange={(n) => set('batteryKw', n)}
                hint="0 if no battery"
              />
              <NumField
                label="DNO export allowance"
                unit="kW"
                value={s.dnoExportKw}
                onChange={(n) => set('dnoExportKw', n)}
                hint="3.68 kW unless agreed otherwise"
              />
              <NumField
                label="System cost (optional)"
                unit="£"
                value={s.systemCost}
                onChange={(n) => set('systemCost', n)}
                hint="Adds savings & payback"
              />
            </div>
          </section>
          <div className="space-y-3.5">
            {checksFor(['inverter-ratio', 'g98-g99', 'export-limit', 'yield-co2', 'payback']).map(
              (c) => (
                <CheckCard key={c.id} check={c} />
              )
            )}
          </div>
        </div>
      )}

      {/* ── Step 5 · Handover ── */}
      {step === 4 && plan && s.panel && s.inverter && (
        <div className="space-y-5 max-w-2xl">
          <div className="rounded-2xl border border-white/[0.12] bg-black/40 p-3 sm:p-4">
            <SolarSLD
              plan={plan}
              panelName={`${s.panel.make} ${s.panel.model}`}
              inverterName={`${s.inverter.make} ${s.inverter.model}`}
              inverterKw={s.inverter.ratedPowerAc}
              phases={s.inverter.phases === 'three' ? 3 : 1}
              className="w-full h-auto"
            />
          </div>

          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-4 sm:p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Design summary
            </p>
            <ul className="mt-3 space-y-2">
              {solarSummaryLines(s, out).map((l, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0" />
                  <span className="text-[13px] leading-relaxed text-white">{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="outline"
            disabled={!planOk}
            onClick={() => {
              if (!solarDesignToQuote(s, out)) {
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

          <DesignInsightsPanel tech="solar" />

          <button
            type="button"
            onClick={() => {
              setS(defaultSolarDesign());
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
