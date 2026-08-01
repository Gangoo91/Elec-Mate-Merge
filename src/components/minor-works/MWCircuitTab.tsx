import React, { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { SPD_MAKES, SPD_RATED_KA } from '@/constants/spdData';
import MWSmartDefaults from './MWSmartDefaults';
import {
  PROTECTIVE_DEVICE_TYPES,
  BS_EN_STANDARDS,
  DEVICE_RATINGS,
  BREAKING_CAPACITIES,
  CABLE_TYPES,
  INSTALLATION_METHODS,
  REFERENCE_METHODS,
  CONDUCTOR_SIZES,
  RCD_RATINGS,
  RCD_TYPES,
  CIRCUIT_TYPES,
  SmartDefault,
} from '@/constants/minorWorksOptions';
import {
  STANDARD_TO_DEVICE_TYPES,
  DEVICE_TYPE_RATINGS,
  DEVICE_TYPE_KA_RATINGS,
  getDeviceCategory,
} from '@/constants/deviceMappings';

// ---------------------------------------------------------------------------
// Local UI recipe (specialist-cert design system)
// ---------------------------------------------------------------------------

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const FormField = ({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div>
    <Label className={labelCn}>
      {label}
      {required && ' *'}
    </Label>
    {children}
    {hint && <span className="text-[11px] text-white/85 block mt-1">{hint}</span>}
  </div>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface MWCircuitTabProps {
  formData: Record<string, string | boolean>;
  onUpdate: (field: string, value: string | boolean) => void;
}

// Protection state a preset must own outright: any of these it doesn't set are
// reset on apply, so a previously applied preset (e.g. Ring Final's RCBO) can't
// leak into one that doesn't use them (e.g. Cooker on an MCB standard).
const PRESET_PROTECTION_RESETS: Record<string, string | boolean> = {
  protectionRcd: false,
  protectionRcbo: false,
  protectionAfdd: false,
  protectionSpd: false,
  rcdType: '',
  rcdIdn: '',
  rcdBsEn: '',
  rcdRatingAmps: '',
};

const MWCircuitTab: React.FC<MWCircuitTabProps> = ({ formData, onUpdate }) => {
  // ============================================================================
  // Smart defaults
  // ============================================================================

  const handleSmartDefaultApply = (values: SmartDefault['values']) => {
    Object.entries(PRESET_PROTECTION_RESETS).forEach(([key, resetValue]) => {
      if ((values as Record<string, string | boolean | undefined>)[key] === undefined) {
        onUpdate(key, resetValue);
      }
    });
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        onUpdate(key, value);
      }
    });
  };

  // ============================================================================
  // Auto-fill reference method based on installation method
  // ============================================================================

  const handleInstallationMethodChange = (value: string) => {
    onUpdate('installationMethod', value);
    if (!value) return;

    const methodMapping: { [key: string]: string } = {
      'clipped-direct': 'C',
      'surface-conduit': 'B',
      'concealed-conduit': 'A',
      'surface-trunking': 'B',
      'flush-trunking': 'B',
      'cable-tray': 'C',
      'cable-basket': 'E',
      'under-plaster': 'A',
      'thermally-insulated': '100',
      'accessible-floor': 'C',
      'ceiling-void': 'C',
      'buried-direct': 'D',
      'in-duct': 'D',
    };

    if (methodMapping[value] && !formData.referenceMethod) {
      onUpdate('referenceMethod', methodMapping[value]);
    }
  };

  // ============================================================================
  // Cascading Protective Device Selectors
  // ============================================================================

  const filteredDeviceTypes = useMemo(() => {
    if (!formData.overcurrentDeviceBsEn) return PROTECTIVE_DEVICE_TYPES;
    const allowedTypes = STANDARD_TO_DEVICE_TYPES[formData.overcurrentDeviceBsEn as string];
    if (!allowedTypes || allowedTypes.length === 0) return PROTECTIVE_DEVICE_TYPES;
    return PROTECTIVE_DEVICE_TYPES.filter((d) => allowedTypes.includes(d.value));
  }, [formData.overcurrentDeviceBsEn]);

  const filteredRatings = useMemo(() => {
    if (!formData.protectiveDeviceType) return DEVICE_RATINGS;
    const deviceKey = getDeviceCategory(formData.protectiveDeviceType as string);
    const allowedRatings = DEVICE_TYPE_RATINGS[deviceKey];
    if (!allowedRatings) return DEVICE_RATINGS;
    return DEVICE_RATINGS.filter(
      (r) => r.value === 'LIM' || allowedRatings.includes(parseInt(r.value, 10))
    );
  }, [formData.protectiveDeviceType]);

  const filteredKaRatings = useMemo(() => {
    if (!formData.protectiveDeviceType) return BREAKING_CAPACITIES;
    const deviceKey = getDeviceCategory(formData.protectiveDeviceType as string);
    const allowedKa = DEVICE_TYPE_KA_RATINGS[deviceKey];
    if (!allowedKa) return BREAKING_CAPACITIES;
    return BREAKING_CAPACITIES.filter((k) => allowedKa.includes(parseFloat(k.value)));
  }, [formData.protectiveDeviceType]);

  // CPC sizes based on live conductor (BS 7671 Table 54.7)
  const filteredCpcSizes = useMemo(() => {
    if (!formData.liveConductorSize) return CONDUCTOR_SIZES;
    const liveSize = parseFloat(formData.liveConductorSize as string);
    const maxCpc = Math.max(liveSize, 16);
    return CONDUCTOR_SIZES.filter((o) => parseFloat(o.value) <= maxCpc);
  }, [formData.liveConductorSize]);

  // Handle BS EN standard change with cascading reset
  const handleStandardChange = (value: string) => {
    onUpdate('overcurrentDeviceBsEn', value);
    if (value) {
      const allowedTypes = STANDARD_TO_DEVICE_TYPES[value];
      if (allowedTypes && allowedTypes.length > 0 && formData.protectiveDeviceType) {
        if (!allowedTypes.includes(formData.protectiveDeviceType as string)) {
          onUpdate('protectiveDeviceType', '');
          onUpdate('protectiveDeviceRating', '');
          onUpdate('protectiveDeviceKaRating', '');
        }
      }
    }
  };

  // Handle device type change with cascading reset
  const handleDeviceTypeChange = (value: string) => {
    onUpdate('protectiveDeviceType', value);
    if (!value) return;
    const deviceKey = getDeviceCategory(value);

    const allowedRatings = DEVICE_TYPE_RATINGS[deviceKey];
    if (allowedRatings && formData.protectiveDeviceRating) {
      if (!allowedRatings.includes(parseInt(formData.protectiveDeviceRating as string, 10))) {
        onUpdate('protectiveDeviceRating', '');
      }
    }

    const allowedKa = DEVICE_TYPE_KA_RATINGS[deviceKey];
    if (allowedKa && formData.protectiveDeviceKaRating) {
      if (!allowedKa.includes(parseFloat(formData.protectiveDeviceKaRating as string))) {
        onUpdate('protectiveDeviceKaRating', '');
      }
    }
  };

  // Handle live conductor size change, reconciling a stored CPC that the new
  // size no longer permits (mirrors the filteredCpcSizes rule, BS 7671 Table 54.7)
  const handleLiveConductorSizeChange = (value: string) => {
    onUpdate('liveConductorSize', value);
    if (!value || !formData.cpcSize) return;
    const maxCpc = Math.max(parseFloat(value), 16);
    if (parseFloat(formData.cpcSize as string) > maxCpc) {
      onUpdate('cpcSize', '');
    }
  };

  // Auto-fill RCD defaults when protection type is toggled on
  const handleProtectionToggle = (field: string, checked: boolean) => {
    onUpdate(field, checked);
    if (checked && (field === 'protectionRcbo' || field === 'protectionRcd')) {
      if (!formData.rcdType) onUpdate('rcdType', 'A');
      if (!formData.rcdIdn) onUpdate('rcdIdn', '30');
      if (!formData.rcdBsEn) {
        onUpdate('rcdBsEn', field === 'protectionRcbo' ? 'BS EN 61009' : 'BS EN 61008');
      }
    }
  };

  // ============================================================================
  // Toggle button helper
  // ============================================================================

  const ToggleButton = ({
    selected,
    label,
    onClick,
    disabled,
  }: {
    selected: boolean;
    label: string;
    onClick: () => void;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={cn(
        'h-11 rounded-lg transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1',
        selected
          ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
          : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium',
        disabled && 'opacity-40 active:scale-100'
      )}
    >
      {label}
    </button>
  );

  // ============================================================================
  // Conductor size toggle grid (common sizes)
  // ============================================================================

  const COMMON_CABLE_SIZES = ['1.5', '2.5', '4.0', '6.0', '10.0', '16.0'];

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="px-4 sm:px-0 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Smart Defaults Quick Fill */}
      <div className="lg:col-span-2">
        <MWSmartDefaults onApply={handleSmartDefaultApply} />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CIRCUIT DETAILS                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className={cardCn}>
        <SectionTitle title="Circuit details" />

        <FormField label="Distribution board">
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {['Main DB', 'Submain', 'Garage CU', 'EV CU'].map((preset) => (
              <ToggleButton
                key={preset}
                selected={formData.distributionBoard === preset}
                label={preset}
                onClick={() => onUpdate('distributionBoard', preset)}
              />
            ))}
          </div>
          <Input
            value={(formData.distributionBoard as string) || ''}
            onChange={(e) => onUpdate('distributionBoard', e.target.value)}
            placeholder="Or type custom name"
            className={inputCn}
          />
        </FormField>

        <FormField label="DB location">
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {['Under stairs', 'Hallway', 'Garage', 'Loft'].map((preset) => (
              <ToggleButton
                key={preset}
                selected={formData.dbLocationType === preset}
                label={preset}
                onClick={() => onUpdate('dbLocationType', preset)}
              />
            ))}
          </div>
          <Input
            value={(formData.dbLocationType as string) || ''}
            onChange={(e) => onUpdate('dbLocationType', e.target.value)}
            placeholder="Or type custom location"
            className={inputCn}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Circuit no." required>
            <Input
              data-field="circuitDesignation"
              value={(formData.circuitDesignation as string) || ''}
              onChange={(e) => onUpdate('circuitDesignation', e.target.value)}
              placeholder="e.g., C1 or MCB-05"
              className={inputCn}
            />
          </FormField>
          <FormField label="Circuit description">
            <Input
              value={(formData.circuitDescription as string) || ''}
              onChange={(e) => onUpdate('circuitDescription', e.target.value)}
              placeholder="Tap a preset or type"
              className={inputCn}
            />
          </FormField>
        </div>

        {/* Circuit description presets */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            'Sockets', 'Lighting', 'Cooker', 'Shower',
            'Immersion', 'Hob', 'EV charger', 'Heating',
          ].map((preset) => (
            <ToggleButton
              key={preset}
              selected={formData.circuitDescription === preset}
              label={preset}
              onClick={() => onUpdate('circuitDescription', preset)}
            />
          ))}
        </div>

        <FormField label="Circuit type">
          <div className="grid grid-cols-2 gap-1.5">
            {CIRCUIT_TYPES.map((opt) => (
              <ToggleButton
                key={opt.value}
                selected={formData.circuitType === opt.value}
                label={opt.label}
                onClick={() => onUpdate('circuitType', opt.value)}
              />
            ))}
          </div>
        </FormField>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* PROTECTIVE DEVICE                                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className={cardCn}>
        <SectionTitle title="Protective device" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="BS (EN) standard">
            <MobileSelectPicker
              value={(formData.overcurrentDeviceBsEn as string) || ''}
              onValueChange={handleStandardChange}
              options={BS_EN_STANDARDS}
              placeholder="Select standard"
              title="BS (EN) standard"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
          <FormField label="Device type" required>
            <MobileSelectPicker
              value={(formData.protectiveDeviceType as string) || ''}
              onValueChange={handleDeviceTypeChange}
              options={filteredDeviceTypes}
              placeholder="Select type"
              title="Device type"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
        </div>
        {formData.overcurrentDeviceBsEn &&
          filteredDeviceTypes.length < PROTECTIVE_DEVICE_TYPES.length && (
            <span className="text-[11px] text-white/85 block">
              Filtered for {formData.overcurrentDeviceBsEn as string}
            </span>
          )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Rating (A)" required>
            <MobileSelectPicker
              value={(formData.protectiveDeviceRating as string) || ''}
              onValueChange={(v) => onUpdate('protectiveDeviceRating', v)}
              options={filteredRatings}
              placeholder="Rating"
              title="Device rating (A)"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
          <FormField label="Breaking capacity (kA)">
            <MobileSelectPicker
              value={(formData.protectiveDeviceKaRating as string) || ''}
              onValueChange={(v) => onUpdate('protectiveDeviceKaRating', v)}
              options={filteredKaRatings}
              placeholder="kA rating"
              title="Breaking capacity (kA)"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
        </div>
        {formData.protectiveDeviceType && filteredRatings.length < DEVICE_RATINGS.length && (
          <span className="text-[11px] text-white/85 block">
            BS 7671 ratings for{' '}
            {PROTECTIVE_DEVICE_TYPES.find((d) => d.value === formData.protectiveDeviceType)
              ?.label || (formData.protectiveDeviceType as string)}
          </span>
        )}

        {/* Additional Protection toggles */}
        <FormField label="Additional protection">
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'protectionRcd', label: 'RCD' },
              { id: 'protectionRcbo', label: 'RCBO' },
              { id: 'protectionAfdd', label: 'AFDD' },
              { id: 'protectionSpd', label: 'SPD' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  const next = !formData[item.id];
                  if (item.id === 'protectionRcd' || item.id === 'protectionRcbo') {
                    handleProtectionToggle(item.id, next);
                  } else {
                    onUpdate(item.id, next);
                  }
                }}
                className={cn(
                  'h-11 rounded-lg transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1',
                  formData[item.id]
                    ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
                    : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </FormField>

        {/* RCD Details sub-panel */}
        {(formData.protectionRcd || formData.protectionRcbo) && (
          <div className="border-t border-white/[0.1] pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-white">RCD details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <FormField label="BS (EN) standard">
                <MobileSelectPicker
                  value={(formData.rcdBsEn as string) || ''}
                  onValueChange={(v) => onUpdate('rcdBsEn', v)}
                  options={[
                    { value: 'BS EN 61008', label: 'BS EN 61008', description: 'RCDs without overcurrent protection' },
                    { value: 'BS EN 61009', label: 'BS EN 61009', description: 'RCBOs' },
                    { value: 'BS EN 62423', label: 'BS EN 62423', description: 'Type F and Type B RCDs' },
                  ]}
                  placeholder="Select standard"
                  title="RCD BS (EN) standard"
                  triggerClassName={pickerTriggerCn}
                />
              </FormField>
              <FormField label="IΔn (mA)">
                <MobileSelectPicker
                  value={(formData.rcdIdn as string) || ''}
                  onValueChange={(v) => onUpdate('rcdIdn', v)}
                  options={RCD_RATINGS}
                  placeholder="Select rating"
                  title="RCD rating (mA)"
                  triggerClassName={pickerTriggerCn}
                />
              </FormField>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <FormField label="Type">
                <div className="grid grid-cols-4 gap-1.5">
                  {RCD_TYPES.map((opt) => (
                    <ToggleButton
                      key={opt.value}
                      selected={formData.rcdType === opt.value}
                      label={opt.label.replace('Type ', '')}
                      onClick={() => onUpdate('rcdType', opt.value)}
                    />
                  ))}
                </div>
              </FormField>
              <FormField label="Rating (A)">
                <Input
                  type="number"
                  value={(formData.rcdRatingAmps as string) || ''}
                  onChange={(e) => onUpdate('rcdRatingAmps', e.target.value)}
                  placeholder="63"
                  className={inputCn}
                />
              </FormField>
            </div>
          </div>
        )}

        {/* AFDD Details */}
        {formData.protectionAfdd && (
          <div className="border-t border-white/[0.1] pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-white">AFDD details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <FormField label="AFDD BS (EN)">
                <MobileSelectPicker
                  value={(formData.afddBsEn as string) || ''}
                  onValueChange={(v) => onUpdate('afddBsEn', v)}
                  options={[
                    { value: 'BS EN 62606', label: 'BS EN 62606' },
                  ]}
                  placeholder="Standard"
                  title="AFDD BS (EN)"
                  triggerClassName={pickerTriggerCn}
                />
              </FormField>
              <FormField label="AFDD rating (A)">
                <MobileSelectPicker
                  value={(formData.afddRating as string) || ''}
                  onValueChange={(v) => onUpdate('afddRating', v)}
                  options={DEVICE_RATINGS}
                  placeholder="Rating"
                  title="AFDD rating (A)"
                  triggerClassName={pickerTriggerCn}
                />
              </FormField>
            </div>
          </div>
        )}

        {/* SPD Details */}
        {formData.protectionSpd && (
          <div className="border-t border-white/[0.1] pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-white">SPD details</h3>
            <FormField label="SPD type">
              <div className="grid grid-cols-5 gap-1.5">
                {['1', '2', '3', '1+2', '2+3'].map((t) => (
                  <ToggleButton
                    key={t}
                    selected={formData.spdType === t}
                    label={`T${t}`}
                    onClick={() => onUpdate('spdType', t)}
                  />
                ))}
              </div>
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
              <FormField label="SPD BS (EN)">
                <MobileSelectPicker
                  value={(formData.spdBsEn as string) || ''}
                  onValueChange={(v) => onUpdate('spdBsEn', v)}
                  options={[
                    { value: 'BS EN 61643-11', label: 'BS EN 61643-11' },
                    { value: 'BS EN 61643-21', label: 'BS EN 61643-21' },
                  ]}
                  placeholder="Standard"
                  title="SPD BS (EN)"
                  triggerClassName={pickerTriggerCn}
                />
              </FormField>
              <FormField label="SPD make">
                <MobileSelectPicker
                  value={(formData.spdMake as string) || ''}
                  onValueChange={(v) => onUpdate('spdMake', v)}
                  options={SPD_MAKES}
                  placeholder="Select"
                  title="SPD make"
                  triggerClassName={pickerTriggerCn}
                />
              </FormField>
              <FormField label="Rated kA">
                <MobileSelectPicker
                  value={(formData.spdRatedKa as string) || ''}
                  onValueChange={(v) => onUpdate('spdRatedKa', v)}
                  options={SPD_RATED_KA}
                  placeholder="Select"
                  title="Rated kA"
                  triggerClassName={pickerTriggerCn}
                />
              </FormField>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CABLE & INSTALLATION                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionTitle title="Cable & installation" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="No. of conductors">
            <div className="grid grid-cols-4 gap-1.5">
              {['2', '3', '4', '5'].map((n) => (
                <ToggleButton
                  key={n}
                  selected={formData.numberOfConductors === n}
                  label={`${n}C`}
                  onClick={() => onUpdate('numberOfConductors', n)}
                />
              ))}
            </div>
          </FormField>
          <FormField label="Cable type">
            <MobileSelectPicker
              value={(formData.cableType as string) || ''}
              onValueChange={(v) => onUpdate('cableType', v)}
              options={CABLE_TYPES}
              placeholder="Type"
              title="Cable type"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
        </div>

        {/* Live Conductor Size — common sizes as chips, "Other" opens picker for full list */}
        <FormField label="Live conductor size" required>
          <div className="grid grid-cols-7 gap-1">
            {COMMON_CABLE_SIZES.map((size) => (
              <ToggleButton
                key={size}
                selected={formData.liveConductorSize === size}
                label={size}
                onClick={() => handleLiveConductorSizeChange(size)}
              />
            ))}
            <div className="col-span-1">
              <MobileSelectPicker
                value={
                  COMMON_CABLE_SIZES.includes(formData.liveConductorSize as string)
                    ? ''
                    : (formData.liveConductorSize as string) || ''
                }
                onValueChange={handleLiveConductorSizeChange}
                options={CONDUCTOR_SIZES.filter((o) => !COMMON_CABLE_SIZES.includes(o.value))}
                placeholder="Other"
                title="Live conductor size (mm²)"
                triggerClassName={cn(
                  'h-11 rounded-lg font-semibold text-xs touch-manipulation',
                  !COMMON_CABLE_SIZES.includes(formData.liveConductorSize as string) &&
                    formData.liveConductorSize
                    ? 'bg-elec-yellow border border-elec-yellow text-black'
                    : 'bg-white/[0.06] border border-white/[0.12] text-white'
                )}
              />
            </div>
          </div>
          {!COMMON_CABLE_SIZES.includes(formData.liveConductorSize as string) &&
            formData.liveConductorSize && (
              <span className="text-[11px] text-elec-yellow mt-1 block">
                {formData.liveConductorSize as string}mm²
              </span>
            )}
        </FormField>

        <FormField label="CPC size">
          <div className="grid grid-cols-7 gap-1">
            {COMMON_CABLE_SIZES.map((size) => {
              const allowed = filteredCpcSizes.some((o) => o.value === size);
              return (
                <ToggleButton
                  key={size}
                  selected={formData.cpcSize === size}
                  label={size}
                  disabled={!allowed}
                  onClick={() => onUpdate('cpcSize', size)}
                />
              );
            })}
            <div className="col-span-1">
              <MobileSelectPicker
                value={
                  COMMON_CABLE_SIZES.includes(formData.cpcSize as string)
                    ? ''
                    : (formData.cpcSize as string) || ''
                }
                onValueChange={(v) => onUpdate('cpcSize', v)}
                options={filteredCpcSizes.filter((o) => !COMMON_CABLE_SIZES.includes(o.value))}
                placeholder="Other"
                title="CPC size (mm²)"
                triggerClassName={cn(
                  'h-11 rounded-lg font-semibold text-xs touch-manipulation',
                  !COMMON_CABLE_SIZES.includes(formData.cpcSize as string) && formData.cpcSize
                    ? 'bg-elec-yellow border border-elec-yellow text-black'
                    : 'bg-white/[0.06] border border-white/[0.12] text-white'
                )}
              />
            </div>
          </div>
          {!COMMON_CABLE_SIZES.includes(formData.cpcSize as string) &&
            formData.cpcSize && (
              <span className="text-[11px] text-elec-yellow mt-1 block">
                {formData.cpcSize as string}mm²
              </span>
            )}
          {formData.liveConductorSize &&
            parseFloat(formData.liveConductorSize as string) > 16 && (
              <span className="text-[11px] text-white/85 block mt-1">
                CPC limited to {formData.liveConductorSize as string}mm² (BS 7671)
              </span>
            )}
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Installation method">
            <MobileSelectPicker
              value={(formData.installationMethod as string) || ''}
              onValueChange={handleInstallationMethodChange}
              options={INSTALLATION_METHODS}
              placeholder="Method"
              title="Installation method"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
          <FormField label="Reference method">
            <MobileSelectPicker
              value={(formData.referenceMethod as string) || ''}
              onValueChange={(v) => onUpdate('referenceMethod', v)}
              options={REFERENCE_METHODS}
              placeholder="e.g., A, B, C"
              title="Reference method (BS 7671)"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
        </div>
        {formData.referenceMethod && (
          <span className="text-[11px] text-white/85 block">
            {REFERENCE_METHODS.find((r) => r.value === formData.referenceMethod)?.description}
          </span>
        )}
      </div>
    </div>
  );
};

export default MWCircuitTab;
