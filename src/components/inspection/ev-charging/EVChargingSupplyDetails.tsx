import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { useEVChargingSmartForm } from '@/hooks/inspection/useEVChargingSmartForm';
import EVCircuitPresets from './EVCircuitPresets';

interface EVChargingSupplyDetailsProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
}

/* ------------------------------------------------------------------ */
/*  Reusable bits                                                      */
/* ------------------------------------------------------------------ */

const SectionHeading = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FieldLabel = ({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) => (
  <Label htmlFor={htmlFor} className="text-white text-xs mb-1.5 block">
    {children}
  </Label>
);

const inputClass =
  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow text-white [color-scheme:dark]';

/** Toggle-button row — selects exactly one value */
const ToggleRow = ({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex gap-2">
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => onChange(opt.value)}
        className={cn(
          'flex-1 h-10 rounded-lg text-xs font-semibold transition-all touch-manipulation active:scale-[0.98]',
          value === opt.value
            ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
            : 'bg-white/[0.05] border border-white/[0.08] text-white'
        )}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const EVChargingSupplyDetails: React.FC<EVChargingSupplyDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  const { lookupMaxZs, checkDNORequirements } = useEVChargingSmartForm();

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
    return checkDNORequirements(power, phases);
  }, [formData.powerRating, formData.phases, checkDNORequirements]);

  // Auto-fill DNO notification date when checkbox is ticked and date is empty
  useEffect(() => {
    if (formData.dnoNotified && !formData.dnoNotificationDate) {
      onUpdate('dnoNotificationDate', new Date().toISOString().split('T')[0]);
    }
  }, [formData.dnoNotified]);

  // Compute G98 deadline (installationDate + 28 days)
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
    <div className="space-y-5 px-4 py-2">
      {/* EV Circuit Presets */}
      <EVCircuitPresets
        onApplyPreset={(preset) => {
          Object.entries(preset).forEach(([key, value]) => {
            onUpdate(key, value);
          });
        }}
      />

      {/* ========== Supply Characteristics ========== */}
      <section>
        <SectionHeading title="Supply Characteristics" />

        <div className="space-y-4">
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
              onChange={(v) => onUpdate('supplyPhases', v)}
            />
          </div>

          {/* Voltage + Ze — 2-col */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel htmlFor="supplyVoltage">Voltage (V)</FieldLabel>
              <Input
                id="supplyVoltage"
                type="number"
                value={formData.supplyVoltage ?? ''}
                onChange={(e) =>
                  onUpdate(
                    'supplyVoltage',
                    e.target.value === '' ? '' : parseInt(e.target.value) || 0
                  )
                }
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel htmlFor="ze">Ze (Ohm)</FieldLabel>
              <Input
                id="ze"
                placeholder="e.g., 0.35"
                inputMode="decimal"
                step="0.01"
                value={formData.ze || ''}
                onChange={(e) => onUpdate('ze', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* PSCC + Zs at origin — 2-col */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel htmlFor="prospectiveFaultCurrent">PSCC (kA)</FieldLabel>
              <Input
                id="prospectiveFaultCurrent"
                placeholder="e.g., 2.5"
                inputMode="decimal"
                step="0.01"
                value={formData.prospectiveFaultCurrent || ''}
                onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel htmlFor="externalLoopImpedance">Zs at Origin (Ohm)</FieldLabel>
              <Input
                id="externalLoopImpedance"
                placeholder="e.g., 0.35"
                inputMode="decimal"
                step="0.01"
                value={formData.externalLoopImpedance || ''}
                onChange={(e) => onUpdate('externalLoopImpedance', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== PME Considerations ========== */}
      <section>
        <SectionHeading title="PME Considerations" />

        <div className="space-y-4">
          {isPME && (
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5">
              <p className="text-[11px] text-white leading-relaxed">
                <span className="font-bold">IET CoP:</span> Special earthing arrangements may be required for EV chargers on PME supplies. Ensure compliance with Section 722.
              </p>
            </div>
          )}

          {/* PME toggle */}
          <div>
            <FieldLabel>PME Supply</FieldLabel>
            <ToggleRow
              options={[
                { label: 'Yes', value: 'true' },
                { label: 'No', value: 'false' },
              ]}
              value={formData.isPME ? 'true' : 'false'}
              onChange={(v) => onUpdate('isPME', v === 'true')}
            />
          </div>

          {formData.isPME && (
            <>
              <div>
                <FieldLabel htmlFor="pmeEarthingMeasures">PME Earthing Measures Applied</FieldLabel>
                <MobileSelectPicker
                  label="PME Earthing Measures Applied"
                  value={(formData.pmeEarthingMeasures as string) || ''}
                  onValueChange={(value) => onUpdate('pmeEarthingMeasures', value)}
                  options={[
                    { value: 'integral-rcd', label: 'Integral RCD protection in charger' },
                    { value: 'earth-electrode', label: 'Additional earth electrode installed' },
                    { value: 'class-ii', label: 'Class II charger used' },
                    { value: 'separated-extra-low', label: 'Separated extra-low voltage' },
                    { value: 'protective-bonding', label: 'Additional protective bonding' },
                  ]}
                  placeholder="Select measures"
                />
              </div>

              <label
                htmlFor="earthElectrodeInstalled"
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors touch-manipulation',
                  formData.earthElectrodeInstalled
                    ? 'border-elec-yellow/40 bg-elec-yellow/[0.06]'
                    : 'border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.06]'
                )}
              >
                <Checkbox
                  id="earthElectrodeInstalled"
                  checked={formData.earthElectrodeInstalled || false}
                  onCheckedChange={(checked) => onUpdate('earthElectrodeInstalled', checked)}
                  className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <span className="text-sm text-white">Additional earth electrode installed</span>
              </label>

              {formData.earthElectrodeInstalled && (
                <div>
                  <FieldLabel htmlFor="earthElectrodeResistance">
                    Earth Electrode Resistance Ra (Ohm)
                  </FieldLabel>
                  <Input
                    id="earthElectrodeResistance"
                    placeholder="e.g., 150"
                    inputMode="decimal"
                    step="0.01"
                    value={formData.earthElectrodeResistance || ''}
                    onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                    className={cn(inputClass, 'w-full sm:w-48')}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ========== O-PEN Protection (TN-C-S only) ========== */}
      {formData.earthingArrangement === 'TN-C-S' && (
        <section>
          <SectionHeading title="O-PEN Protection (IET01:2024)" />

          <div className="space-y-4">
            <label
              htmlFor="openPENDeviceFitted"
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors touch-manipulation',
                formData.openPENDeviceFitted
                  ? 'border-elec-yellow/40 bg-elec-yellow/[0.06]'
                  : 'border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.06]'
              )}
            >
              <Checkbox
                id="openPENDeviceFitted"
                checked={formData.openPENDeviceFitted || false}
                onCheckedChange={(checked) => onUpdate('openPENDeviceFitted', checked)}
                className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
              />
              <span className="text-sm text-white">O-PEN detection device fitted</span>
            </label>

            {formData.openPENDeviceFitted && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel htmlFor="openPENManufacturer">Manufacturer</FieldLabel>
                    <Input
                      id="openPENManufacturer"
                      placeholder="e.g., Matt:e"
                      value={formData.openPENManufacturer || ''}
                      onChange={(e) => onUpdate('openPENManufacturer', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="openPENModel">Model</FieldLabel>
                    <Input
                      id="openPENModel"
                      placeholder="e.g., OPD-01"
                      value={formData.openPENModel || ''}
                      onChange={(e) => onUpdate('openPENModel', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="openPENSerial">Serial Number</FieldLabel>
                  <Input
                    id="openPENSerial"
                    placeholder="Serial number"
                    value={formData.openPENSerial || ''}
                    onChange={(e) => onUpdate('openPENSerial', e.target.value)}
                    className={inputClass}
                  />
                </div>

                <label
                  htmlFor="openPENTestVerified"
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors touch-manipulation',
                    formData.openPENTestVerified
                      ? 'border-green-500/40 bg-green-500/[0.06]'
                      : 'border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.06]'
                  )}
                >
                  <Checkbox
                    id="openPENTestVerified"
                    checked={formData.openPENTestVerified || false}
                    onCheckedChange={(checked) => onUpdate('openPENTestVerified', checked)}
                    className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                  />
                  <span className="text-sm text-white">Test button operation verified</span>
                </label>
              </>
            )}
          </div>
        </section>
      )}

      {/* ========== Distribution Board ========== */}
      <section>
        <SectionHeading title="Distribution Board" />

        <div className="space-y-4">
          <div>
            <FieldLabel htmlFor="dbLocation">DB Location</FieldLabel>
            <Input
              id="dbLocation"
              placeholder="e.g., Under stairs cupboard"
              value={formData.dbLocation || ''}
              onChange={(e) => onUpdate('dbLocation', e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel htmlFor="dbManufacturer">DB Manufacturer</FieldLabel>
              <Input
                id="dbManufacturer"
                placeholder="e.g., Hager"
                value={formData.dbManufacturer || ''}
                onChange={(e) => onUpdate('dbManufacturer', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel htmlFor="dbMainSwitchRating">Main Switch Rating</FieldLabel>
              <Input
                id="dbMainSwitchRating"
                placeholder="e.g., 100A"
                value={formData.dbMainSwitchRating || ''}
                onChange={(e) => onUpdate('dbMainSwitchRating', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== Circuit Details ========== */}
      <section>
        <SectionHeading title="Circuit Details" />

        <div className="space-y-4">
          {/* Dedicated circuit checkbox */}
          <label
            htmlFor="dedicatedCircuit"
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors touch-manipulation',
              formData.dedicatedCircuit !== false
                ? 'border-green-500/40 bg-green-500/[0.06]'
                : 'border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.06]'
            )}
          >
            <Checkbox
              id="dedicatedCircuit"
              checked={formData.dedicatedCircuit !== false}
              onCheckedChange={(checked) => onUpdate('dedicatedCircuit', checked)}
              className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
            />
            <span className="text-sm text-white">Dedicated circuit for EV charger</span>
          </label>

          {/* Cable Route helper */}
          <div>
            <FieldLabel>Cable Route</FieldLabel>
            <div className="flex gap-2 flex-wrap">
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
                    'flex-1 min-w-[calc(50%-0.25rem)] h-10 rounded-lg text-xs font-semibold transition-all touch-manipulation active:scale-[0.98]',
                    (formData.cableRoute as string) === opt.value
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Circuit designation + cable type — 2-col */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel htmlFor="circuitDesignation">Circuit Designation</FieldLabel>
              <Input
                id="circuitDesignation"
                placeholder="e.g., EV Charger"
                value={formData.circuitDesignation || ''}
                onChange={(e) => onUpdate('circuitDesignation', e.target.value)}
                className={inputClass}
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
                  { value: 'SWA', label: 'SWA Armoured Cable' },
                  { value: 'H07RN-F', label: 'H07RN-F Flex' },
                  { value: 'singles-conduit', label: 'Singles in Conduit' },
                  { value: 'singles-trunking', label: 'Singles in Trunking' },
                ]}
                placeholder="Select"
              />
            </div>
          </div>

          {/* Cable size — toggle grid */}
          <div>
            <FieldLabel>Cable Size (mm2)</FieldLabel>
            <div className="grid grid-cols-5 gap-1.5">
              {['2.5', '4', '6', '10', '16', '25', '35', '50', '70', '95', '120'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => onUpdate('cableSize', parseFloat(size))}
                  className={cn(
                    'h-10 rounded-lg text-xs font-semibold transition-all touch-manipulation active:scale-[0.98]',
                    formData.cableSize?.toString() === size || (!formData.cableSize && size === '6')
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Cable length + installation method — 2-col */}
          <div className="grid grid-cols-2 gap-3">
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
                className={inputClass}
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
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== Circuit Protection ========== */}
      <section>
        <SectionHeading title="Circuit Protection" />

        <div className="space-y-4">
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
                    'h-10 px-3 rounded-lg text-xs font-semibold transition-all touch-manipulation active:scale-[0.98]',
                    (formData.protectionDeviceType as string) === opt.value
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
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
            <div className="grid grid-cols-5 gap-1.5">
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
                    'h-10 rounded-lg text-xs font-semibold transition-all touch-manipulation active:scale-[0.98]',
                    formData.protectionDeviceRating?.toString() === rating
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  {rating}A
                </button>
              ))}
            </div>
          </div>

          {/* Curve — only for MCB/RCBO/MCCB (not fuses) */}
          {formData.protectionDeviceType !== 'BS88' && formData.protectionDeviceType !== 'BS3036' && (
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
            <div className="flex items-center gap-3 rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] px-4 py-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-2xl font-semibold text-elec-yellow tabular-nums">
                  {maxZsLookup.maxZs}Ohm
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white">Max Zs</p>
                  <p className="text-[10px] text-white">{maxZsLookup.source}</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-elec-yellow/30 text-elec-yellow shrink-0">
                Auto
              </span>
            </div>
          )}

          {/* RCD Protection sub-heading */}
          <div className="border-b border-white/[0.06] pb-1 mb-3 mt-2">
            <div className="h-[1px] w-full rounded-full bg-gradient-to-r from-white/10 to-transparent mb-2" />
            <h3 className="text-[11px] font-medium text-white uppercase tracking-wider">
              RCD Protection
            </h3>
          </div>

          {/* RCD type + rating — 2-col */}
          <div className="grid grid-cols-2 gap-3">
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
          <label
            htmlFor="rcdIntegral"
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors touch-manipulation',
              formData.rcdIntegral
                ? 'border-green-500/40 bg-green-500/[0.06]'
                : 'border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.06]'
            )}
          >
            <Checkbox
              id="rcdIntegral"
              checked={formData.rcdIntegral || false}
              onCheckedChange={(checked) => onUpdate('rcdIntegral', checked)}
              className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
            />
            <span className="text-sm text-white">Integral RCD in charger</span>
          </label>
        </div>
      </section>

      {/* ========== DNO Notification ========== */}
      <section>
        <SectionHeading title="DNO Notification" />

        <div className="space-y-4">
          {/* DNO requirement info */}
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5">
            <p className="text-xs font-bold text-white">{dnoRequirement.message}</p>
            <p className="text-[11px] text-white mt-0.5">{dnoRequirement.details}</p>
          </div>

          {/* G98 / G99 toggles */}
          <div>
            <FieldLabel>Notification Type</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdate('g98Notification', !formData.g98Notification)}
                className={cn(
                  'h-10 rounded-lg text-xs font-semibold transition-all touch-manipulation active:scale-[0.98]',
                  formData.g98Notification
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                G98 Notification
              </button>
              <button
                type="button"
                onClick={() => onUpdate('g99Application', !formData.g99Application)}
                className={cn(
                  'h-10 rounded-lg text-xs font-semibold transition-all touch-manipulation active:scale-[0.98]',
                  formData.g99Application
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                G99 Application
              </button>
            </div>
          </div>

          {/* DNO notified */}
          <label htmlFor="dnoNotified" className="flex items-center gap-3 cursor-pointer touch-manipulation">
            <Checkbox
              id="dnoNotified"
              checked={formData.dnoNotified || false}
              onCheckedChange={(checked) => onUpdate('dnoNotified', checked)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <span className="text-xs text-white">DNO has been notified</span>
          </label>

          {formData.dnoNotified && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel htmlFor="dnoNotificationDate">Notification Date</FieldLabel>
                <Input
                  id="dnoNotificationDate"
                  type="date"
                  value={formData.dnoNotificationDate || ''}
                  onChange={(e) => onUpdate('dnoNotificationDate', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <FieldLabel htmlFor="dnoReference">Reference Number</FieldLabel>
                <Input
                  id="dnoReference"
                  placeholder="DNO reference"
                  value={formData.dnoReference || ''}
                  onChange={(e) => onUpdate('dnoReference', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* G98 deadline info */}
          {formData.dnoNotified && g98Deadline && (
            <p className="text-[11px] text-white px-1">
              G98 deadline: {g98Deadline}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default EVChargingSupplyDetails;
