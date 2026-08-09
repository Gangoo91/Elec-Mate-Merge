import React, { useCallback, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { EVSectionHeader } from './EVSectionHeader';
import { FieldLabel, SubHeading, ToggleRow } from '@/components/forms';
import { pmeMeasureLabel } from '@/utils/evChargingJsonFormatter';
import { PORTAL_LINKS } from '@/utils/portalLinks';
import {
  inputCn,
  selectTriggerCn,
  cardCn,
  chipBase,
  chipOn,
  chipOff,
  checkRowCn,
  infoPanelCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useEVChargingSmartForm } from '@/hooks/inspection/useEVChargingSmartForm';
import EVCircuitPresets from './EVCircuitPresets';
import useReadingKeypad from '@/hooks/useReadingKeypad';

interface EVChargingSupplyDetailsProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
}

/** Numeric supply readings the keypad serves — free-number measurement and
 * recorded-value inputs only. Nominal voltage (parsed-number storage) and
 * cable length (parseFloat-on-change storage) stay keypad-free. Sequence
 * follows the natural order down the page. */
const KEYPAD_META = {
  ze: { label: 'Ze — external loop impedance', unit: 'Ω' },
  prospectiveFaultCurrent: { label: 'PSCC — prospective fault current', unit: 'kA' },
  externalLoopImpedance: { label: 'Zs at origin', unit: 'Ω' },
  earthElectrodeResistance: { label: 'Ra — earth electrode resistance', unit: 'Ω' },
  maxDemandExisting: { label: 'Existing demand', unit: 'A' },
  maxDemandEv: { label: 'EV charger load', unit: 'A' },
  maxDemandTotal: { label: 'Total demand', unit: 'A' },
  supplyCapacity: { label: 'Supply capacity', unit: 'A' },
};
const KEYPAD_SEQUENCE = [
  'ze',
  'prospectiveFaultCurrent',
  'externalLoopImpedance',
  'earthElectrodeResistance',
  'maxDemandExisting',
  'maxDemandEv',
  'maxDemandTotal',
  'supplyCapacity',
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/** Same keys the EIC uses, so an EV cert and an EIC agree on what was bonded. */
const BONDING_PARTS = [
  { key: 'water', label: 'Water' },
  { key: 'gas', label: 'Gas' },
  { key: 'oil', label: 'Oil' },
  { key: 'structural-steel', label: 'Structural steel' },
  { key: 'other', label: 'Other' },
] as const;

const EVChargingSupplyDetails: React.FC<EVChargingSupplyDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  const { lookupMaxZs, checkDNORequirements, powerToCurrent } = useEVChargingSmartForm();

  // Auto-lookup Max Zs when protection device details change
  const maxZsLookup = useMemo(() => {
    const deviceType = formData.protectionDeviceType;
    const rating = formData.protectionDeviceRating;
    const curve = formData.protectionDeviceCurve;

    if (!deviceType || !rating || !curve) return null;

    return lookupMaxZs(deviceType, rating, curve);
  }, [
    formData.protectionDeviceType,
    formData.protectionDeviceRating,
    formData.protectionDeviceCurve,
    lookupMaxZs,
  ]);

  // Auto-update maxZs in testResults when lookup changes
  useEffect(() => {
    if (maxZsLookup?.maxZs) {
      const currentResults = formData.testResults || {};
      if (currentResults.maxZs !== maxZsLookup.maxZs.toString()) {
        onUpdate('testResults', { ...currentResults, maxZs: maxZsLookup.maxZs.toString() });
      }
    }
  }, [maxZsLookup]);

  // Check DNO requirements based on power rating
  const dnoRequirement = useMemo(() => {
    const power = formData.powerRating || 7.4;
    const phases = formData.phases || 1;
    // The 60A / 13.8kW test is on the property total, which this form already
    // collects under Max Demand — it just was not being read.
    const totalDemandA = parseFloat((formData.maxDemandTotal as string) || '');
    return checkDNORequirements(power, phases, {
      totalDemandA: isNaN(totalDemandA) ? undefined : totalDemandA,
      isDcOutput: formData.chargerType === 'Mode4',
      loadManagement: Boolean(formData.loadManagement),
    });
  }, [
    formData.powerRating,
    formData.phases,
    formData.maxDemandTotal,
    formData.chargerType,
    formData.loadManagement,
    checkDNORequirements,
  ]);

  /*
   * Main protective bonding is stored as a comma-separated string, matching the
   * EIC's `mainBondingLocations`, so the two certificates stay interchangeable.
   */
  const bondedSet = useMemo(() => {
    const raw = (formData.mainBondingLocations as string) || '';
    return new Set(
      raw
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
    );
  }, [formData.mainBondingLocations]);

  const toggleBonded = useCallback(
    (key: string) => {
      const next = new Set(bondedSet);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      onUpdate('mainBondingLocations', Array.from(next).join(', '));
    },
    [bondedSet, onUpdate]
  );

  /*
   * A stored PME measure that the current list no longer offers.
   *
   * These came from an earlier options list that included methods Reg
   * 722.411.4.1 does not permit. Surfaced rather than hidden so an old
   * certificate shows what it actually says.
   */
  const legacyMeasure = useMemo(() => {
    const raw = (formData.pmeEarthingMeasures as string) || '';
    const PERMITTED = [
      'earth-electrode',
      'voltage-monitor-cpc',
      'voltage-monitor-supply',
      'alternative-device',
      'electrical-separation',
    ];
    if (!raw || PERMITTED.includes(raw)) return null;
    return { value: raw, label: `${pmeMeasureLabel(raw)} — not permitted` };
  }, [formData.pmeEarthingMeasures]);

  /*
   * Earth electrode ceiling — Annex A722.3 NOTE 1.
   *
   * Only the 200 Ω ceiling is asserted. The actual 70 V condition of
   * 722.411.4.1(b) needs Ud, Cmax and the per-phase load currents, none of
   * which this form holds, so it is stated as still to be demonstrated rather
   * than silently treated as satisfied by a low reading.
   */
  const electrodeCheck = useMemo(() => {
    const ra = parseFloat((formData.earthElectrodeResistance as string) || '');
    if (isNaN(ra)) return null;
    if (ra > 200)
      return {
        ok: false,
        message: `${ra}Ω exceeds the 200Ω ceiling of Annex A722.3 — electrodes above 200Ω may be unstable and the maximum value is to be taken as 200Ω.`,
      };
    return {
      ok: true,
      message: `${ra}Ω is within the 200Ω ceiling of Annex A722.3. The 70V condition of 722.411.4.1(b) also has to be demonstrated for this installation.`,
    };
  }, [formData.earthElectrodeResistance]);

  // Max-demand adequacy — green if total demand is within supply capacity.
  const demandStatus = useMemo(() => {
    const total = parseFloat(formData.maxDemandTotal || '');
    const cap = parseFloat(formData.supplyCapacity || '');
    if (isNaN(total) || isNaN(cap)) return null;
    return { ok: total <= cap, total, cap };
  }, [formData.maxDemandTotal, formData.supplyCapacity]);

  // ── Reading keypad — shared MW pattern ──
  // Values flow through the existing onUpdate paths; the demand verdict
  // reuses demandStatus computed above — no new compliance logic.
  const keypad = useReadingKeypad({
    meta: KEYPAD_META,
    sequence: KEYPAD_SEQUENCE,
    getValue: (field) => String(formData[field] ?? ''),
    setValue: (field, value) => onUpdate(field, value),
    getStatus: (field) => {
      if ((field === 'maxDemandTotal' || field === 'supplyCapacity') && demandStatus) {
        return demandStatus.ok
          ? { tone: 'pass', label: 'Within supply capacity' }
          : { tone: 'check', label: 'Exceeds supply capacity' };
      }
      return null;
    },
  });

  // Auto-fill DNO notification date when checkbox is ticked and date is empty
  useEffect(() => {
    if (formData.dnoNotified && !formData.dnoNotificationDate) {
      onUpdate('dnoNotificationDate', new Date().toISOString().split('T')[0]);
    }
  }, [formData.dnoNotified]);

  // Notification deadline on the connect-and-notify route: installation + 28 days
  const g98Deadline = useMemo(() => {
    if (!formData.installationDate) return null;
    const d = new Date(formData.installationDate as string);
    if (isNaN(d.getTime())) return null;
    d.setDate(d.getDate() + 28);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }, [formData.installationDate]);

  // Check if PME section should show warning
  const isPME = formData.earthingArrangement === 'TN-C-S' || formData.isPME;

  return (
    <div className="space-y-4">
      {/* EV Circuit Presets */}
      <EVCircuitPresets
        onApplyPreset={(preset) => {
          Object.entries(preset).forEach(([key, value]) => {
            onUpdate(key, value);
          });
        }}
      />

      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
        {/* ========== Supply Characteristics ========== */}
        <section className={cardCn}>
          <EVSectionHeader title="Supply Characteristics" />

          {/* Earthing type — toggle buttons */}
          <div>
            <FieldLabel>Earthing Arrangement *</FieldLabel>
            <ToggleRow
              options={[
                { label: 'TN-S', value: 'TN-S' },
                { label: 'TN-C-S (PME)', value: 'TN-C-S' },
                { label: 'TT', value: 'TT' },
              ]}
              value={(formData.earthingArrangement as string) || ''}
              onChange={(v) => {
                onUpdate('earthingArrangement', v);
                onUpdate('isPME', v === 'TN-C-S');
              }}
            />
          </div>

          {/* Phases — toggle buttons */}
          <div>
            <FieldLabel>Supply Phases</FieldLabel>
            <ToggleRow
              options={[
                { label: 'Single Phase', value: 'single' },
                { label: 'Three Phase', value: 'three' },
              ]}
              value={(formData.supplyPhases as string) || 'single'}
              onChange={(v) => {
                const phases = v === 'three' ? 3 : 1;
                onUpdate('supplyPhases', v);
                // Mirror into the numeric `phases` the Installation tab uses,
                // so the two can never disagree on the printed certificate.
                onUpdate('phases', phases);
                // ...and recompute the current, exactly as the Installation
                // tab's own phase toggle does. Without this, switching to three
                // phase here left the single-phase pair in place — 7.4kW next
                // to 32A, which is 22kW on three phase. The stale current is
                // what feeds the voltage-drop calculation.
                if (formData.powerRating)
                  onUpdate('ratedCurrent', powerToCurrent(Number(formData.powerRating), phases));
                // And the recorded supply voltage, which the EIC, minor works
                // and solar certs all already follow. The EV cert did not, so a
                // three-phase job printed "Voltage: 230V".
                onUpdate('supplyVoltage', phases === 3 ? 400 : 230);
              }}
            />
          </div>

          {/* Voltage + Ze — 2-up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <FieldLabel htmlFor="supplyVoltage">Voltage (V)</FieldLabel>
              <Input
                id="supplyVoltage"
                type="number"
                placeholder="e.g. 230"
                value={formData.supplyVoltage ?? ''}
                onChange={(e) =>
                  onUpdate(
                    'supplyVoltage',
                    e.target.value === '' ? '' : parseInt(e.target.value) || 0
                  )
                }
                className={inputCn}
              />
            </div>
            <div>
              <FieldLabel htmlFor="ze">Ze (Ohm)</FieldLabel>
              <Input
                id="ze"
                placeholder="e.g. 0.35"
                inputMode="decimal"
                step="0.01"
                value={formData.ze || ''}
                onChange={(e) => onUpdate('ze', e.target.value)}
                className={inputCn}
                {...keypad.field('ze')}
              />
            </div>
          </div>

          {/* PSCC + Zs at origin — 2-up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <FieldLabel htmlFor="prospectiveFaultCurrent">PSCC (kA)</FieldLabel>
              <Input
                id="prospectiveFaultCurrent"
                placeholder="e.g. 2.5"
                inputMode="decimal"
                step="0.01"
                value={formData.prospectiveFaultCurrent || ''}
                onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
                className={inputCn}
                {...keypad.field('prospectiveFaultCurrent')}
              />
            </div>
            <div>
              <FieldLabel htmlFor="externalLoopImpedance">Zs at Origin (Ohm)</FieldLabel>
              <Input
                id="externalLoopImpedance"
                placeholder="e.g. 0.35"
                inputMode="decimal"
                step="0.01"
                value={formData.externalLoopImpedance || ''}
                onChange={(e) => onUpdate('externalLoopImpedance', e.target.value)}
                className={inputCn}
                {...keypad.field('externalLoopImpedance')}
              />
            </div>
          </div>
        </section>

        {/*
          ========== Earthing & Main Protective Bonding ==========

          This certificate had no bonding fields at all, so an EV EIC could be
          issued saying nothing about the main protective bonding — on an
          installation where the earthing arrangement is the whole safety case.
          Same shape as the EIC's own section.
        */}
        <section className={cardCn}>
          <EVSectionHeader title="Earthing & Main Protective Bonding" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <FieldLabel htmlFor="earthingConductorCsa">
                Earthing Conductor csa (mm&sup2;)
              </FieldLabel>
              <Input
                id="earthingConductorCsa"
                placeholder="e.g. 16"
                inputMode="decimal"
                value={(formData.earthingConductorCsa as string) || ''}
                onChange={(e) => onUpdate('earthingConductorCsa', e.target.value)}
                className={inputCn}
                {...keypad.field('earthingConductorCsa')}
              />
            </div>
            <div>
              <FieldLabel htmlFor="mainBondingSize">
                Main Protective Bonding csa (mm&sup2;)
              </FieldLabel>
              <Input
                id="mainBondingSize"
                placeholder="e.g. 10"
                inputMode="decimal"
                value={(formData.mainBondingSize as string) || ''}
                onChange={(e) => onUpdate('mainBondingSize', e.target.value)}
                className={inputCn}
                disabled={Boolean(formData.mainBondingNA)}
                {...keypad.field('mainBondingSize')}
              />
            </div>
          </div>

          <div>
            <FieldLabel>Bonded Services</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {BONDING_PARTS.map((part) => {
                const on = bondedSet.has(part.key);
                return (
                  <button
                    key={part.key}
                    type="button"
                    disabled={Boolean(formData.mainBondingNA)}
                    onClick={() => toggleBonded(part.key)}
                    className={cn(
                      chipBase,
                      'px-3',
                      on ? chipOn : chipOff,
                      formData.mainBondingNA && 'opacity-40'
                    )}
                  >
                    {part.label}
                  </button>
                );
              })}
            </div>
          </div>

          <label htmlFor="mainBondingVerified" className={checkRowCn}>
            <Checkbox
              id="mainBondingVerified"
              checked={Boolean(formData.mainBondingVerified)}
              disabled={Boolean(formData.mainBondingNA)}
              onCheckedChange={(checked) => onUpdate('mainBondingVerified', checked)}
              className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
            />
            <span className="text-sm font-medium text-white">
              Main protective bonding verified as present and correctly sized
            </span>
          </label>

          <label htmlFor="mainBondingNA" className={checkRowCn}>
            <Checkbox
              id="mainBondingNA"
              checked={Boolean(formData.mainBondingNA)}
              onCheckedChange={(checked) => {
                onUpdate('mainBondingNA', checked);
                // Clearing the detail keeps "not applicable" from sitting next
                // to a recorded size on the printed certificate.
                if (checked) {
                  onUpdate('mainBondingVerified', false);
                  onUpdate('mainBondingSize', '');
                  onUpdate('mainBondingLocations', '');
                }
              }}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <span className="text-sm font-medium text-white">
              No extraneous-conductive-parts requiring bonding
            </span>
          </label>

          {/*
            Section 722 design confirmations live here rather than in their own
            card: they are the same subject — how the installation is earthed
            and which protective measures apply — and as a separate card they
            left a large dead area beside the much taller PME panel. Separated
            by a rule, per the sub-heading pattern.
          */}
          <div className="border-t border-white/[0.1] pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-white">Section 722 Confirmations</h3>

            <label htmlFor="noPenInFinalCircuit" className={checkRowCn}>
              <Checkbox
                id="noPenInFinalCircuit"
                checked={Boolean(formData.noPenInFinalCircuit)}
                onCheckedChange={(checked) => onUpdate('noPenInFinalCircuit', checked)}
                className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
              />
              <span className="text-sm font-medium text-white">
                The circuit supplying the charging equipment includes no PEN conductor
                <span className="block text-[11px] text-white mt-0.5">Reg 722.312.2.1</span>
              </span>
            </label>

            <label htmlFor="prohibitedMeasuresNotUsed" className={checkRowCn}>
              <Checkbox
                id="prohibitedMeasuresNotUsed"
                checked={Boolean(formData.prohibitedMeasuresNotUsed)}
                onCheckedChange={(checked) => onUpdate('prohibitedMeasuresNotUsed', checked)}
                className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
              />
              <span className="text-sm font-medium text-white">
                None of the prohibited protective measures is used — obstacles, placing out of
                reach, non-conducting location, or earth-free local equipotential bonding
                <span className="block text-[11px] text-white mt-0.5">
                  Regs 722.410.3.5 and 722.410.3.6
                </span>
              </span>
            </label>

            {/*
            Only shown on the separation route. Reg 722.413.1.2 limits it to one
            vehicle from one unearthed source through a BS EN 61558-2-4
            transformer — asking these of every job would be noise.
          */}
            {formData.pmeEarthingMeasures === 'electrical-separation' && (
              <div className="border-t border-white/[0.1] pt-4 space-y-4">
                <h3 className="text-sm font-semibold text-white">
                  Electrical Separation (Reg 722.413.1.2)
                </h3>

                <label htmlFor="separationSingleVehicle" className={checkRowCn}>
                  <Checkbox
                    id="separationSingleVehicle"
                    checked={Boolean(formData.separationSingleVehicle)}
                    onCheckedChange={(checked) => onUpdate('separationSingleVehicle', checked)}
                    className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                  />
                  <span className="text-sm font-medium text-white">
                    One vehicle supplied from one unearthed source
                  </span>
                </label>

                <div>
                  <FieldLabel htmlFor="separationTransformerStandard">
                    Isolating Transformer Standard
                  </FieldLabel>
                  <Input
                    id="separationTransformerStandard"
                    placeholder="BS EN 61558-2-4"
                    value={(formData.separationTransformerStandard as string) || ''}
                    onChange={(e) => onUpdate('separationTransformerStandard', e.target.value)}
                    className={inputCn}
                  />
                  <p className="text-[11px] text-white mt-1 leading-relaxed">
                    Reg 722.413.1.2 requires a fixed isolating transformer complying with BS EN
                    61558-2-4.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========== PME Considerations ========== */}
        <section className={cardCn}>
          <EVSectionHeader title="PME Considerations" />

          {isPME && formData.vehicleChargedOutdoors !== false && (
            <div className={infoPanelCn}>
              <p className="text-[12px] text-white leading-relaxed">
                <span className="font-semibold">Reg 722.411.4.1:</span> a PME earthing facility
                shall not be used as the means of earthing for the protective conductor contact of a
                charge point located outdoors, or one that might reasonably be expected to charge a
                vehicle outdoors, unless one of methods (b) to (e) is used. This is a requirement,
                not a recommendation.
              </p>
            </div>
          )}

          {/*
            The trigger for the whole of 722.411.4.1. The certificate had no
            field for it, so it could not record whether the requirement even
            applied — and the note above was shown to every PME job regardless.
          */}
          <div>
            <FieldLabel>Vehicle charged outdoors?</FieldLabel>
            <ToggleRow
              options={[
                { label: 'Yes', value: 'true' },
                { label: 'No', value: 'false' },
              ]}
              value={
                formData.vehicleChargedOutdoors === null ||
                formData.vehicleChargedOutdoors === undefined
                  ? ''
                  : String(formData.vehicleChargedOutdoors)
              }
              onChange={(v) => onUpdate('vehicleChargedOutdoors', v === 'true')}
            />
            <p className="text-[11px] text-white mt-1 leading-relaxed">
              Includes a charge point indoors that might reasonably be expected to charge a vehicle
              standing outside.
            </p>
          </div>

          {/* PME toggle */}
          <div>
            <FieldLabel>PME Supply</FieldLabel>
            <ToggleRow
              options={[
                { label: 'Yes', value: 'true' },
                { label: 'No', value: 'false' },
              ]}
              value={formData.isPME ? 'true' : 'false'}
              onChange={(v) => {
                const pme = v === 'true';
                onUpdate('isPME', pme);
                // One fact, one answer. A PME supply IS TN-C-S, and these were
                // separate flags: the measures fields keyed off `isPME`, the
                // O-PEN section off `earthingArrangement`, and the banner off a
                // third derived value. Turning PME off on a TN-C-S supply hid
                // the measures while leaving the O-PEN section on screen.
                if (pme) onUpdate('earthingArrangement', 'TN-C-S');
                else if (formData.earthingArrangement === 'TN-C-S')
                  onUpdate('earthingArrangement', '');
              }}
            />
          </div>

          {isPME && (
            <>
              {/*
                The permitted methods are exactly (b) to (e) of Reg 722.411.4.1.
                Indent (a) was deleted by A2:2022.

                This list previously offered "Integral RCD protection in
                charger", "Class II charger used" and "Additional protective
                bonding". None of those is a permitted method, and none of them
                detects an open PEN at all — an RCD sees no imbalance when the
                whole installation earth rises with the neutral. An electrician
                could select one, get a certificate that read as compliant, and
                leave a charge point with no open-PEN protection on a PME
                supply. That is the failure this section exists to prevent.

                "Separated extra-low voltage" is also gone: the separation route
                is Reg 722.413 (electrical separation, one vehicle from one
                unearthed source through a BS EN 61558-2-4 transformer), which
                is a different protective measure from SELV and is recorded
                below rather than as a PME measure.
              */}
              <div>
                <FieldLabel htmlFor="pmeEarthingMeasures">
                  PME Earthing Measure — Reg 722.411.4.1
                </FieldLabel>
                <MobileSelectPicker
                  label="PME Earthing Measure (Reg 722.411.4.1)"
                  value={(formData.pmeEarthingMeasures as string) || ''}
                  onValueChange={(value) => onUpdate('pmeEarthingMeasures', value)}
                  options={[
                    {
                      value: 'earth-electrode',
                      label: '(b) Earth electrode — MET to Earth ≤ 70V on PEN fault',
                    },
                    {
                      value: 'voltage-monitor-cpc',
                      label: '(c) Device disconnecting within 5s if CPC–Earth exceeds 70V',
                    },
                    {
                      value: 'voltage-monitor-supply',
                      label: '(d) Device disconnecting within 5s outside 207–253V',
                    },
                    {
                      value: 'alternative-device',
                      label: '(e) Alternative device of no lesser safety',
                    },
                    {
                      value: 'electrical-separation',
                      label: 'Not applicable — supply is electrically separated (722.413)',
                    },
                    // A certificate saved under the old list holds a value that
                    // is no longer offered. Without this the picker opens blank
                    // and reads as "nothing was recorded", so the electrician
                    // cannot see what needs correcting. 15 live certificates
                    // hold 'integral-rcd'.
                    ...(legacyMeasure
                      ? [{ value: legacyMeasure.value, label: legacyMeasure.label }]
                      : []),
                  ]}
                  placeholder="Select the method applied"
                  triggerClassName={selectTriggerCn}
                />
                {legacyMeasure && (
                  <p className="text-[11px] text-red-400 mt-1 leading-relaxed font-medium">
                    This certificate records a method that Reg 722.411.4.1 does not permit. Select
                    the method actually installed, or establish one before issuing.
                  </p>
                )}
                <p className="text-[11px] text-white mt-1 leading-relaxed">
                  A PME earthing facility must not be used for the protective conductor contact of
                  an outdoor charge point unless one of these applies. An RCD is not one of them —
                  it cannot detect an open PEN.
                </p>
              </div>

              <label htmlFor="earthElectrodeInstalled" className={checkRowCn}>
                <Checkbox
                  id="earthElectrodeInstalled"
                  checked={formData.earthElectrodeInstalled || false}
                  onCheckedChange={(checked) => onUpdate('earthElectrodeInstalled', checked)}
                  className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <span className="text-sm font-medium text-white">
                  Additional earth electrode installed
                </span>
              </label>

              {formData.earthElectrodeInstalled && (
                <div>
                  <FieldLabel htmlFor="earthElectrodeResistance">
                    Earth Electrode Resistance Ra (Ohm)
                  </FieldLabel>
                  <Input
                    id="earthElectrodeResistance"
                    placeholder="e.g. 150"
                    inputMode="decimal"
                    step="0.01"
                    value={formData.earthElectrodeResistance || ''}
                    onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                    className={cn(inputCn, 'sm:max-w-[12rem]')}
                    {...keypad.field('earthElectrodeResistance')}
                  />
                  {/*
                    Annex A722.3 NOTE 1: electrodes above 200 Ω may be unstable,
                    and where the formula gives more than 200 Ω the maximum is
                    to be taken as 200 Ω. The value was collected and never
                    looked at.

                    The 70 V condition itself depends on Ud, Cmax and the load
                    currents, which this form does not hold — so the ceiling is
                    checked and the rest is stated rather than guessed.
                  */}
                  {electrodeCheck && (
                    <p
                      className={cn(
                        'text-[11px] mt-1 leading-relaxed font-medium',
                        electrodeCheck.ok ? 'text-white' : 'text-red-400'
                      )}
                    >
                      {electrodeCheck.message}
                    </p>
                  )}
                </div>
              )}

              {/*
                722.411.4.1: downstream of a device fitted for (c), (d) or (e),
                protective conductors and exposed-conductive-parts must have no
                connection to another circuit's protective conductors or to any
                extraneous-conductive-part.
              */}
              {['voltage-monitor-cpc', 'voltage-monitor-supply', 'alternative-device'].includes(
                (formData.pmeEarthingMeasures as string) || ''
              ) && (
                <label htmlFor="openPENSegregationConfirmed" className={checkRowCn}>
                  <Checkbox
                    id="openPENSegregationConfirmed"
                    checked={Boolean(formData.openPENSegregationConfirmed)}
                    onCheckedChange={(checked) => onUpdate('openPENSegregationConfirmed', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <span className="text-sm font-medium text-white">
                    Downstream CPCs and exposed-conductive-parts are segregated — no connection to
                    other circuits&rsquo; CPCs or to any extraneous-conductive-part
                  </span>
                </label>
              )}
            </>
          )}
        </section>

        {/* ========== O-PEN Protection (TN-C-S only) ========== */}
        {isPME && (
          <section className={cardCn}>
            <EVSectionHeader title="Open-PEN Protection" />

            <label htmlFor="openPENDeviceFitted" className={checkRowCn}>
              <Checkbox
                id="openPENDeviceFitted"
                checked={formData.openPENDeviceFitted || false}
                onCheckedChange={(checked) => onUpdate('openPENDeviceFitted', checked)}
                className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
              />
              <span className="text-sm font-medium text-white">O-PEN detection device fitted</span>
            </label>

            {formData.openPENDeviceFitted && (
              <>
                {/*
                  Reg 722.411.4.1 says of methods (c), (d) and (e):
                  "Equivalent means of functionality could be included within the
                  charging equipment."

                  This section only ever offered a separate device with its own
                  make, model and serial. Most units fitted today — Zappi, Ohme,
                  Easee — do it internally, and there was no way to say so. That
                  is very likely what the deleted "Integral RCD protection in
                  charger" option was being used to mean.
                */}
                <div>
                  <FieldLabel>Device Location</FieldLabel>
                  <ToggleRow
                    options={[
                      { label: 'Separate device', value: 'separate' },
                      { label: 'Integral to charge point', value: 'integral' },
                    ]}
                    value={(formData.openPENDeviceLocation as string) || ''}
                    onChange={(v) => onUpdate('openPENDeviceLocation', v)}
                  />
                  <p className="text-[11px] text-white mt-1 leading-relaxed">
                    Reg 722.411.4.1 permits the equivalent functionality to be built into the
                    charging equipment — it does not have to be a separate device.
                  </p>
                </div>

                {formData.openPENDeviceLocation === 'integral' && (
                  <p className="text-[11px] text-white leading-relaxed">
                    Record the charge point&rsquo;s own make, model and serial on the Install tab.
                    The fields below are for a separate device only.
                  </p>
                )}

                <div
                  className={cn(
                    'grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4',
                    formData.openPENDeviceLocation === 'integral' && 'hidden'
                  )}
                >
                  <div>
                    <FieldLabel htmlFor="openPENManufacturer">Manufacturer</FieldLabel>
                    <Input
                      id="openPENManufacturer"
                      placeholder="e.g. Matt:e"
                      value={formData.openPENManufacturer || ''}
                      onChange={(e) => onUpdate('openPENManufacturer', e.target.value)}
                      className={inputCn}
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="openPENModel">Model</FieldLabel>
                    <Input
                      id="openPENModel"
                      placeholder="e.g. OPD-01"
                      value={formData.openPENModel || ''}
                      onChange={(e) => onUpdate('openPENModel', e.target.value)}
                      className={inputCn}
                    />
                  </div>
                </div>

                <div className={cn(formData.openPENDeviceLocation === 'integral' && 'hidden')}>
                  <FieldLabel htmlFor="openPENSerial">Serial Number</FieldLabel>
                  <Input
                    id="openPENSerial"
                    placeholder="Serial number"
                    value={formData.openPENSerial || ''}
                    onChange={(e) => onUpdate('openPENSerial', e.target.value)}
                    className={inputCn}
                  />
                </div>

                <label htmlFor="openPENTestVerified" className={checkRowCn}>
                  <Checkbox
                    id="openPENTestVerified"
                    checked={formData.openPENTestVerified || false}
                    onCheckedChange={(checked) => onUpdate('openPENTestVerified', checked)}
                    className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                  />
                  <span className="text-sm font-medium text-white">
                    Test button operation verified
                  </span>
                </label>
              </>
            )}
          </section>
        )}

        {/* ========== Distribution Board ========== */}
        <section className={cardCn}>
          <EVSectionHeader title="Distribution Board" />

          <div>
            <FieldLabel htmlFor="dbLocation">DB Location</FieldLabel>
            <Input
              id="dbLocation"
              placeholder="e.g. Under stairs cupboard"
              value={formData.dbLocation || ''}
              onChange={(e) => onUpdate('dbLocation', e.target.value)}
              className={inputCn}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <FieldLabel htmlFor="dbManufacturer">DB Manufacturer</FieldLabel>
              <Input
                id="dbManufacturer"
                placeholder="e.g. Hager"
                value={formData.dbManufacturer || ''}
                onChange={(e) => onUpdate('dbManufacturer', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <FieldLabel htmlFor="dbMainSwitchRating">Main Switch Rating</FieldLabel>
              <Input
                id="dbMainSwitchRating"
                placeholder="e.g. 100A"
                value={formData.dbMainSwitchRating || ''}
                onChange={(e) => onUpdate('dbMainSwitchRating', e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
        </section>

        {/* ========== Circuit Details ========== */}
        <section className={cn(cardCn, 'lg:col-span-2')}>
          <EVSectionHeader title="Circuit Details" />

          {/* Dedicated circuit checkbox */}
          <label htmlFor="dedicatedCircuit" className={checkRowCn}>
            <Checkbox
              id="dedicatedCircuit"
              checked={formData.dedicatedCircuit !== false}
              onCheckedChange={(checked) => onUpdate('dedicatedCircuit', checked)}
              className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
            />
            <span className="text-sm font-medium text-white">Dedicated circuit for EV charger</span>
          </label>

          {/* Cable Route helper */}
          <div>
            <FieldLabel>Cable Route</FieldLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Buried Underground', value: 'buried', suggestedCable: 'SWA' },
                { label: 'External Wall', value: 'external', suggestedCable: 'SWA' },
                { label: 'Internal', value: 'internal', suggestedCable: '6242Y' },
                { label: 'In Duct/Trunking', value: 'duct', suggestedCable: 'singles-conduit' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onUpdate('cableRoute', opt.value);
                    onUpdate('cableType', opt.suggestedCable);
                  }}
                  className={cn(
                    chipBase,
                    'px-2',
                    (formData.cableRoute as string) === opt.value ? chipOn : chipOff
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Circuit designation + cable type — 2-up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <FieldLabel htmlFor="circuitDesignation">Circuit Designation</FieldLabel>
              <Input
                id="circuitDesignation"
                placeholder="e.g. EV Charger"
                value={formData.circuitDesignation || ''}
                onChange={(e) => onUpdate('circuitDesignation', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <FieldLabel htmlFor="cableType">Cable Type *</FieldLabel>
              <MobileSelectPicker
                label="Cable Type"
                value={(formData.cableType as string) || ''}
                onValueChange={(value) => onUpdate('cableType', value)}
                options={[
                  { value: 'n/a', label: 'N/A' },
                  { value: '6242Y', label: '6242Y Twin & Earth' },
                  { value: '6243Y', label: '6243Y (3C + E)' },
                  { value: 'SWA', label: 'SWA Armoured (BS 5467)' },
                  // BS 6724 is the LSZH version of the same XLPE armoured
                  // cable — electrically identical, but it is what goes into
                  // schools, car parks and anywhere with a fire strategy, and
                  // an electrician should be able to record which they ran.
                  { value: 'SWA-LSZH', label: 'SWA Armoured LSZH (BS 6724)' },
                  { value: 'H07RN-F', label: 'H07RN-F Flex' },
                  // ELE-1518 (Sean). A manufacturer product rather than a BS
                  // 7671 cable designation, so its voltage-drop figures are an
                  // assumption — see the note in useEVChargingSmartForm.
                  { value: 'ev-ultra', label: 'EV Ultra (power + Cat5e)' },
                  // Cleveland Cable's equivalent combined power + data cable.
                  { value: 'connect-ev', label: 'ConnectEV (power + Cat5e)' },
                  { value: 'singles-conduit', label: 'Singles in Conduit' },
                  { value: 'singles-trunking', label: 'Singles in Trunking' },
                ]}
                placeholder="Select"
                triggerClassName={selectTriggerCn}
              />
            </div>
          </div>

          {/* Cable size — toggle grid */}
          <div>
            <FieldLabel>Cable Size (mm2)</FieldLabel>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {['2.5', '4', '6', '10', '16', '25', '35', '50', '70', '95', '120'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => onUpdate('cableSize', parseFloat(size))}
                  className={cn(
                    chipBase,
                    formData.cableSize?.toString() === size || (!formData.cableSize && size === '6')
                      ? chipOn
                      : chipOff
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Cable length + installation method — 2-up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <FieldLabel htmlFor="cableLength">Cable Length (m)</FieldLabel>
              <Input
                id="cableLength"
                type="number"
                inputMode="decimal"
                step="0.01"
                placeholder="metres"
                value={formData.cableLength || ''}
                onChange={(e) => onUpdate('cableLength', parseFloat(e.target.value) || 0)}
                className={inputCn}
              />
            </div>
            <div>
              <FieldLabel htmlFor="installationMethod">Installation Method</FieldLabel>
              <MobileSelectPicker
                label="Installation Method"
                value={(formData.installationMethod as string) || ''}
                onValueChange={(value) => onUpdate('installationMethod', value)}
                options={[
                  { value: 'n/a', label: 'N/A' },
                  { value: 'clipped-direct', label: 'Clipped Direct' },
                  { value: 'trunking', label: 'In Trunking' },
                  { value: 'conduit', label: 'In Conduit' },
                  { value: 'buried', label: 'Buried Direct' },
                  { value: 'ducting', label: 'In Ducting Underground' },
                  { value: 'cable-tray', label: 'On Cable Tray' },
                ]}
                placeholder="Select"
                triggerClassName={selectTriggerCn}
              />
            </div>
          </div>
        </section>

        {/* ========== Circuit Protection ========== */}
        <section className={cn(cardCn, 'lg:col-span-2')}>
          <EVSectionHeader title="Circuit Protection" />

          {/* Protection device type — toggle buttons */}
          <div>
            <FieldLabel>Device Type *</FieldLabel>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: 'MCB', value: 'MCB' },
                { label: 'RCBO', value: 'RCBO' },
                { label: 'MCCB', value: 'MCCB' },
                { label: 'BS 88 Fuse', value: 'BS88' },
                { label: 'BS 3036 Fuse', value: 'BS3036' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onUpdate('protectionDeviceType', opt.value);
                    // Clear curve for fuses (not applicable)
                    if (opt.value === 'BS88' || opt.value === 'BS3036') {
                      onUpdate('protectionDeviceCurve', '');
                    }
                  }}
                  className={cn(
                    chipBase,
                    'px-4',
                    (formData.protectionDeviceType as string) === opt.value ? chipOn : chipOff
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating — dynamic based on device type */}
          <div>
            <FieldLabel>Rating (A)</FieldLabel>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {(formData.protectionDeviceType === 'BS88'
                ? ['16', '20', '25', '32', '40', '50', '63', '80', '100', '125', '160', '200']
                : formData.protectionDeviceType === 'BS3036'
                  ? ['5', '15', '20', '30', '45', '60']
                  : formData.protectionDeviceType === 'MCCB'
                    ? ['16', '20', '32', '40', '50', '63', '80', '100', '125', '160', '200', '250']
                    : ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100']
              ).map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => onUpdate('protectionDeviceRating', parseInt(rating))}
                  className={cn(
                    chipBase,
                    formData.protectionDeviceRating?.toString() === rating ? chipOn : chipOff
                  )}
                >
                  {rating}A
                </button>
              ))}
            </div>
          </div>

          {/* Curve — only for MCB/RCBO/MCCB (not fuses) */}
          {formData.protectionDeviceType !== 'BS88' &&
            formData.protectionDeviceType !== 'BS3036' && (
              <div>
                <FieldLabel>Curve</FieldLabel>
                <ToggleRow
                  options={[
                    { label: 'Type B', value: 'B' },
                    { label: 'Type C', value: 'C' },
                    { label: 'Type D', value: 'D' },
                  ]}
                  value={(formData.protectionDeviceCurve as string) || 'B'}
                  onChange={(v) => onUpdate('protectionDeviceCurve', v)}
                />
              </div>
            )}

          {/* Max Zs Auto-lookup Display */}
          {maxZsLookup && (
            <div className={cn(infoPanelCn, 'flex items-center gap-3')}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-2xl font-semibold text-elec-yellow tabular-nums">
                  {maxZsLookup.maxZs}Ohm
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">Max Zs</p>
                  <p className="text-[11px] text-white/85">{maxZsLookup.source}</p>
                </div>
              </div>
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/[0.15] text-elec-yellow shrink-0">
                Auto
              </span>
            </div>
          )}

          {/* RCD Protection sub-heading */}
          <SubHeading>RCD Protection</SubHeading>

          {/* RCD type + rating — 2-up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <FieldLabel htmlFor="rcdType">RCD Type</FieldLabel>
              <MobileSelectPicker
                label="RCD Type"
                value={(formData.rcdType as string) || ''}
                onValueChange={(value) => onUpdate('rcdType', value)}
                options={[
                  { value: 'Type A', label: 'Type A' },
                  { value: 'Type B', label: 'Type B' },
                  { value: 'Type A + 6mA DC', label: 'Type A + 6mA DC' },
                ]}
                placeholder="Select"
                triggerClassName={selectTriggerCn}
              />
            </div>
            <div>
              <FieldLabel>RCD Rating (mA)</FieldLabel>
              <ToggleRow
                options={[
                  { label: '30', value: '30' },
                  { label: '100', value: '100' },
                  { label: '300', value: '300' },
                ]}
                value={formData.rcdRating?.toString() || '30'}
                onChange={(v) => onUpdate('rcdRating', parseInt(v))}
              />
            </div>
          </div>

          {/* Integral RCD toggle */}
          <label htmlFor="rcdIntegral" className={checkRowCn}>
            <Checkbox
              id="rcdIntegral"
              checked={formData.rcdIntegral || false}
              onCheckedChange={(checked) => onUpdate('rcdIntegral', checked)}
              className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
            />
            <span className="text-sm font-medium text-white">Integral RCD in charger</span>
          </label>
        </section>

        {/* ========== Protective Devices & External Influences (A4:2026) ========== */}
        <section className={cn(cardCn, 'lg:col-span-2')}>
          <EVSectionHeader title="Protective Devices (A4:2026)" />

          {/* SPD — A4:2026 Appendix 6 recording requirement */}
          <div>
            <FieldLabel>Surge Protective Device (SPD)</FieldLabel>
            <ToggleRow
              options={[
                { label: 'Fitted', value: 'yes' },
                { label: 'Not fitted', value: 'no' },
                { label: 'N/A', value: 'na' },
              ]}
              value={(formData.spdFitted as string) || ''}
              onChange={(v) => onUpdate('spdFitted', v)}
            />
          </div>
          {formData.spdFitted === 'yes' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <FieldLabel htmlFor="spdType">SPD Type</FieldLabel>
                  <MobileSelectPicker
                    label="SPD Type"
                    value={formData.spdType || ''}
                    onValueChange={(v) => onUpdate('spdType', v)}
                    options={[
                      { value: 'Type 1', label: 'Type 1' },
                      { value: 'Type 2', label: 'Type 2' },
                      { value: 'Type 1+2', label: 'Type 1+2' },
                      { value: 'Type 2+3', label: 'Type 2+3' },
                      { value: 'Type 3', label: 'Type 3' },
                    ]}
                    placeholder="Select"
                    triggerClassName={selectTriggerCn}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="spdLocation">SPD Location</FieldLabel>
                  <Input
                    id="spdLocation"
                    placeholder="e.g. Consumer unit"
                    value={formData.spdLocation || ''}
                    onChange={(e) => onUpdate('spdLocation', e.target.value)}
                    className={inputCn}
                  />
                </div>
              </div>
              <label htmlFor="spdStatusOk" className={checkRowCn}>
                <Checkbox
                  id="spdStatusOk"
                  checked={formData.spdStatusOk || false}
                  onCheckedChange={(checked) => onUpdate('spdStatusOk', checked)}
                  className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                />
                <span className="text-sm font-medium text-white">
                  SPD status indicator shows healthy
                </span>
              </label>
            </>
          )}

          {/* AFDD — A4:2026 recording (722.421.1.7.201 EV exemption) */}
          <div>
            <FieldLabel>Arc Fault Detection Device (AFDD)</FieldLabel>
            <ToggleRow
              options={[
                { label: 'Fitted', value: 'yes' },
                { label: 'Not fitted', value: 'no' },
                { label: 'Not required', value: 'not-required' },
              ]}
              value={(formData.afddFitted as string) || ''}
              onChange={(v) => onUpdate('afddFitted', v)}
            />
            <p className="text-[11px] text-white/85 mt-1.5 leading-relaxed">
              Reg 722.421.1.7.201: AFDDs are not required for circuits supplying EV charging
              equipment conforming to the BS EN 61851 series that incorporate socket-outlets or
              vehicle connectors conforming to BS EN IEC 62196-2. Equipment using another connector
              standard does not get the exemption.
            </p>
          </div>
          {formData.afddFitted === 'yes' && (
            <div>
              <FieldLabel htmlFor="afddType">AFDD Standard / Rating</FieldLabel>
              <Input
                id="afddType"
                placeholder="e.g. BS EN 62606"
                value={formData.afddType || ''}
                onChange={(e) => onUpdate('afddType', e.target.value)}
                className={inputCn}
              />
            </div>
          )}

          {/* External influences — enclosure protection ratings (722.512.2) */}
          <SubHeading>External Influences (722.512.2)</SubHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <FieldLabel htmlFor="ipRating">Enclosure IP Rating</FieldLabel>
              <MobileSelectPicker
                label="IP Rating"
                value={formData.ipRating || ''}
                onValueChange={(v) => onUpdate('ipRating', v)}
                options={[
                  { value: 'IP44', label: 'IP44' },
                  { value: 'IP54', label: 'IP54' },
                  { value: 'IP55', label: 'IP55' },
                  { value: 'IP65', label: 'IP65' },
                  { value: 'IP66', label: 'IP66' },
                ]}
                placeholder="Select"
                triggerClassName={selectTriggerCn}
              />
            </div>
            <div>
              <FieldLabel htmlFor="ikRating">IK Rating (impact)</FieldLabel>
              <MobileSelectPicker
                label="IK Rating"
                value={formData.ikRating || ''}
                onValueChange={(v) => onUpdate('ikRating', v)}
                options={[
                  { value: 'IK07', label: 'IK07' },
                  { value: 'IK08', label: 'IK08' },
                  { value: 'IK10', label: 'IK10' },
                ]}
                placeholder="Select"
                triggerClassName={selectTriggerCn}
              />
            </div>
          </div>
        </section>

        {/* ========== Maximum Demand (722.311.201) ========== */}
        <section className={cardCn}>
          <EVSectionHeader title="Maximum Demand (722.311.201)" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <FieldLabel htmlFor="maxDemandExisting">Existing Demand (A)</FieldLabel>
              <Input
                id="maxDemandExisting"
                inputMode="decimal"
                placeholder="e.g. 45"
                value={formData.maxDemandExisting || ''}
                onChange={(e) => onUpdate('maxDemandExisting', e.target.value)}
                className={inputCn}
                {...keypad.field('maxDemandExisting')}
              />
            </div>
            <div>
              <FieldLabel htmlFor="maxDemandEv">EV Charger Load (A)</FieldLabel>
              <Input
                id="maxDemandEv"
                inputMode="decimal"
                placeholder="e.g. 32 (no diversity)"
                value={formData.maxDemandEv || ''}
                onChange={(e) => onUpdate('maxDemandEv', e.target.value)}
                className={inputCn}
                {...keypad.field('maxDemandEv')}
              />
            </div>
            <div>
              <FieldLabel htmlFor="maxDemandTotal">Total Demand (A)</FieldLabel>
              <Input
                id="maxDemandTotal"
                inputMode="decimal"
                placeholder="existing + EV"
                value={formData.maxDemandTotal || ''}
                onChange={(e) => onUpdate('maxDemandTotal', e.target.value)}
                className={inputCn}
                {...keypad.field('maxDemandTotal')}
              />
            </div>
            <div>
              <FieldLabel htmlFor="supplyCapacity">Supply Capacity (A)</FieldLabel>
              <Input
                id="supplyCapacity"
                inputMode="decimal"
                placeholder="e.g. 80 or 100"
                value={formData.supplyCapacity || ''}
                onChange={(e) => onUpdate('supplyCapacity', e.target.value)}
                className={inputCn}
                {...keypad.field('supplyCapacity')}
              />
            </div>
          </div>

          {demandStatus && (
            <div
              className={cn(
                infoPanelCn,
                'text-sm font-semibold',
                demandStatus.ok ? 'text-green-400' : 'text-red-400'
              )}
            >
              {demandStatus.ok
                ? `Within supply capacity — ${demandStatus.total}A ≤ ${demandStatus.cap}A`
                : `Total demand ${demandStatus.total}A exceeds ${demandStatus.cap}A supply — apply load management or upgrade the supply`}
            </div>
          )}

          {formData.loadManagement && (
            <p className="text-[11px] text-white/85 leading-relaxed">
              Load curtailment is applied — per Reg 722.311.201, this may be taken into account when
              determining maximum demand.
            </p>
          )}
        </section>

        {/* ========== DNO Notification ========== */}
        <section className={cardCn}>
          <EVSectionHeader title="DNO Notification" />

          {/* DNO requirement info */}
          <div className={infoPanelCn}>
            <p className="text-sm font-semibold text-white">{dnoRequirement.message}</p>
            <p className="text-[12px] text-white/90 mt-0.5">{dnoRequirement.details}</p>
            {dnoRequirement.caveat && (
              <p className="text-[12px] text-white/90 mt-1.5">{dnoRequirement.caveat}</p>
            )}
          </div>

          {/*
            Notification route.

            The stored keys are still `g98Notification` / `g99Application` and
            the payload still spells them `g98_notification` / `g99_application`
            — renaming either would drop the fields out of the PDF template and
            orphan every certificate already saved. Only the labels change, to
            the process that actually applies to a demand connection:
            connect-and-notify, or apply-to-connect.
          */}
          <div>
            <FieldLabel>Notification Route</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdate('g98Notification', !formData.g98Notification)}
                className={cn(chipBase, 'px-2', formData.g98Notification ? chipOn : chipOff)}
              >
                Connect &amp; Notify
              </button>
              <button
                type="button"
                onClick={() => onUpdate('g99Application', !formData.g99Application)}
                className={cn(chipBase, 'px-2', formData.g99Application ? chipOn : chipOff)}
              >
                Apply to Connect
              </button>
            </div>
          </div>

          {/* DNO notified */}
          <label htmlFor="dnoNotified" className={checkRowCn}>
            <Checkbox
              id="dnoNotified"
              checked={formData.dnoNotified || false}
              onCheckedChange={(checked) => onUpdate('dnoNotified', checked)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <span className="text-sm font-medium text-white">DNO has been notified</span>
          </label>

          {formData.dnoNotified && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <FieldLabel htmlFor="dnoNotificationDate">Notification Date</FieldLabel>
                <Input
                  id="dnoNotificationDate"
                  type="date"
                  value={formData.dnoNotificationDate || ''}
                  onChange={(e) => onUpdate('dnoNotificationDate', e.target.value)}
                  className={inputCn}
                />
              </div>
              <div>
                <FieldLabel htmlFor="dnoReference">Reference Number</FieldLabel>
                <Input
                  id="dnoReference"
                  placeholder="DNO reference"
                  value={(formData.dnoReference as string) || ''}
                  onChange={(e) => onUpdate('dnoReference', e.target.value)}
                  className={inputCn}
                />
              </div>
            </div>
          )}

          {/*
            Connect Direct is where the notification actually gets made. The
            link saves leaving the platform to find it, and the reference comes
            back onto the certificate so the next inspection can trace it.
          */}
          <div className="border-t border-white/[0.1] pt-4 space-y-3">
            <div>
              <FieldLabel htmlFor="connectDirectReference">ENA Connect Direct Reference</FieldLabel>
              <Input
                id="connectDirectReference"
                placeholder="Application reference"
                value={(formData.connectDirectReference as string) || ''}
                onChange={(e) => onUpdate('connectDirectReference', e.target.value)}
                className={inputCn}
              />
            </div>
            <a
              href={PORTAL_LINKS.connectDirect.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex h-11 w-full items-center justify-center rounded-xl px-4',
                'bg-white/[0.06] border border-white/[0.12] text-sm font-semibold text-white',
                'touch-manipulation transition-colors hover:bg-white/[0.1]'
              )}
            >
              Open ENA Connect Direct
            </a>
            <p className="text-[11px] text-white leading-relaxed">
              {dnoRequirement.type === 'apply-to-connect'
                ? 'Submit the application and record the reference before energising.'
                : 'Notify within 28 days of commissioning and record the reference here.'}
            </p>
          </div>

          {/* 28-day deadline on the connect-and-notify route */}
          {formData.dnoNotified && g98Deadline && (
            <p className="text-[12px] text-white px-1">Notify the DNO by: {g98Deadline}</p>
          )}
        </section>
      </div>

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
};

export default EVChargingSupplyDetails;
