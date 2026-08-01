import React, { useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { EVSectionHeader } from './EVSectionHeader';
import { cn } from '@/lib/utils';
import { useEVChargingSmartForm } from '@/hooks/inspection/useEVChargingSmartForm';
import EVCircuitPresets from './EVCircuitPresets';

interface EVChargingSupplyDetailsProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
}

/* ------------------------------------------------------------------ */
/*  Shared styling                                                     */
/* ------------------------------------------------------------------ */

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const selectTriggerCn =
  'h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none data-[state=open]:border-elec-yellow data-[state=open]:ring-0 touch-manipulation';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const chipBase =
  'h-11 rounded-xl border text-sm transition-all touch-manipulation active:scale-[0.98]';
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

const checkRowCn =
  'flex min-h-[44px] items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-3 cursor-pointer transition-colors hover:bg-white/[0.07] touch-manipulation';

const infoPanelCn = 'rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-3';

const FieldLabel = ({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) => (
  <Label htmlFor={htmlFor} className="text-[12px] font-medium text-white mb-1 block">
    {children}
  </Label>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{children}</h3>
  </div>
);

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
        className={cn(chipBase, 'flex-1 px-2', value === opt.value ? chipOn : chipOff)}
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

  // Max-demand adequacy — green if total demand is within supply capacity.
  const demandStatus = useMemo(() => {
    const total = parseFloat(formData.maxDemandTotal || '');
    const cap = parseFloat(formData.supplyCapacity || '');
    if (isNaN(total) || isNaN(cap)) return null;
    return { ok: total <= cap, total, cap };
  }, [formData.maxDemandTotal, formData.supplyCapacity]);

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
              onChange={(v) => onUpdate('supplyPhases', v)}
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
              />
            </div>
          </div>
        </section>

        {/* ========== PME Considerations ========== */}
        <section className={cardCn}>
          <EVSectionHeader title="PME Considerations" />

          {isPME && (
            <div className={infoPanelCn}>
              <p className="text-[12px] text-white leading-relaxed">
                <span className="font-semibold">IET CoP:</span> Special earthing arrangements may
                be required for EV chargers on PME supplies. Ensure compliance with Section 722.
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
                  triggerClassName={selectTriggerCn}
                />
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
                  />
                </div>
              )}
            </>
          )}
        </section>

        {/* ========== O-PEN Protection (TN-C-S only) ========== */}
        {formData.earthingArrangement === 'TN-C-S' && (
          <section className={cardCn}>
            <EVSectionHeader title="O-PEN Protection (IET01:2024)" />

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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

                <div>
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
                  { value: 'SWA', label: 'SWA Armoured Cable' },
                  { value: 'H07RN-F', label: 'H07RN-F Flex' },
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
              equipment conforming to the BS EN 61851 series.
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
              Load curtailment is applied — per Reg 722.311.201, this may be taken into account
              when determining maximum demand.
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
          </div>

          {/* G98 / G99 toggles */}
          <div>
            <FieldLabel>Notification Type</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdate('g98Notification', !formData.g98Notification)}
                className={cn(chipBase, 'px-2', formData.g98Notification ? chipOn : chipOff)}
              >
                G98 Notification
              </button>
              <button
                type="button"
                onClick={() => onUpdate('g99Application', !formData.g99Application)}
                className={cn(chipBase, 'px-2', formData.g99Application ? chipOn : chipOff)}
              >
                G99 Application
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
                  value={formData.dnoReference || ''}
                  onChange={(e) => onUpdate('dnoReference', e.target.value)}
                  className={inputCn}
                />
              </div>
            </div>
          )}

          {/* G98 deadline info */}
          {formData.dnoNotified && g98Deadline && (
            <p className="text-[12px] text-white px-1">G98 deadline: {g98Deadline}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default EVChargingSupplyDetails;
