import React, { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
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
// Local UI helpers (matching EIC pattern)
// ---------------------------------------------------------------------------

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
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
    <Label className="text-white text-xs mb-1.5 block">
      {label}
      {required && ' *'}
    </Label>
    {children}
    {hint && <span className="text-[10px] text-white block mt-1">{hint}</span>}
  </div>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface MWCircuitTabProps {
  formData: Record<string, string | boolean>;
  onUpdate: (field: string, value: string | boolean) => void;
  isMobile?: boolean;
}

const inputClass =
  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]';

const MWCircuitTab: React.FC<MWCircuitTabProps> = ({ formData, onUpdate }) => {
  // ============================================================================
  // Smart defaults
  // ============================================================================

  const handleSmartDefaultApply = (values: SmartDefault['values']) => {
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
  }: {
    selected: boolean;
    label: string;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1',
        selected
          ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
          : 'bg-white/[0.05] border border-white/[0.08] text-white'
      )}
    >
      {selected && <Check className="h-3.5 w-3.5" />}
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
    <div className="space-y-4">
      {/* Smart Defaults Quick Fill */}
      <MWSmartDefaults onApply={handleSmartDefaultApply} />

      {/* ------------------------------------------------------------------ */}
      {/* CIRCUIT DETAILS                                                     */}
      {/* ------------------------------------------------------------------ */}
      <SectionTitle title="Circuit Details" />
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="Distribution Board">
            <Input
              value={(formData.distributionBoard as string) || ''}
              onChange={(e) => onUpdate('distributionBoard', e.target.value)}
              placeholder="e.g., Main DB"
              className={inputClass}
            />
          </FormField>
          <FormField label="DB Location & Type">
            <Input
              value={(formData.dbLocationType as string) || ''}
              onChange={(e) => onUpdate('dbLocationType', e.target.value)}
              placeholder="e.g., Under stairs"
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="Circuit Designation" required>
            <Input
              value={(formData.circuitDesignation as string) || ''}
              onChange={(e) => onUpdate('circuitDesignation', e.target.value)}
              placeholder="e.g., Circuit 1"
              className={inputClass}
            />
          </FormField>
          <FormField label="Circuit Description">
            <Input
              value={(formData.circuitDescription as string) || ''}
              onChange={(e) => onUpdate('circuitDescription', e.target.value)}
              placeholder="e.g., Kitchen sockets"
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Circuit Type">
          <div className="grid grid-cols-2 gap-1">
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
      <SectionTitle title="Protective Device" />
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="BS (EN) Standard">
            <MobileSelectPicker
              value={(formData.overcurrentDeviceBsEn as string) || ''}
              onValueChange={handleStandardChange}
              options={BS_EN_STANDARDS}
              placeholder="Select standard"
              title="BS (EN) Standard"
            />
          </FormField>
          <FormField label="Device Type" required>
            <MobileSelectPicker
              value={(formData.protectiveDeviceType as string) || ''}
              onValueChange={handleDeviceTypeChange}
              options={filteredDeviceTypes}
              placeholder="Select type"
              title="Device Type"
              
            />
          </FormField>
        </div>
        {formData.overcurrentDeviceBsEn &&
          filteredDeviceTypes.length < PROTECTIVE_DEVICE_TYPES.length && (
            <span className="text-[10px] text-white block">
              Filtered for {formData.overcurrentDeviceBsEn as string}
            </span>
          )}

        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="Rating (A)" required>
            <MobileSelectPicker
              value={(formData.protectiveDeviceRating as string) || ''}
              onValueChange={(v) => onUpdate('protectiveDeviceRating', v)}
              options={filteredRatings}
              placeholder="Rating"
              title="Device Rating (A)"
              
            />
          </FormField>
          <FormField label="Breaking Capacity (kA)">
            <MobileSelectPicker
              value={(formData.protectiveDeviceKaRating as string) || ''}
              onValueChange={(v) => onUpdate('protectiveDeviceKaRating', v)}
              options={filteredKaRatings}
              placeholder="kA rating"
              title="Breaking Capacity (kA)"
            />
          </FormField>
        </div>
        {formData.protectiveDeviceType && filteredRatings.length < DEVICE_RATINGS.length && (
          <span className="text-[10px] text-white block">
            BS 7671 ratings for{' '}
            {PROTECTIVE_DEVICE_TYPES.find((d) => d.value === formData.protectiveDeviceType)
              ?.label || (formData.protectiveDeviceType as string)}
          </span>
        )}

        {/* Additional Protection toggles */}
        <FormField label="Additional Protection">
          <div className="grid grid-cols-4 gap-1">
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
                  'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1',
                  formData[item.id]
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {formData[item.id] && <Check className="h-3.5 w-3.5" />}
                {item.label}
              </button>
            ))}
          </div>
        </FormField>

        {/* RCD Details sub-panel */}
        {(formData.protectionRcd || formData.protectionRcbo) && (
          <div className="rounded-xl border border-white/10 bg-blue-500/5 border-l-2 border-l-blue-500 overflow-hidden">
            <div className="px-3 py-2 bg-blue-500/10 border-b border-white/5">
              <span className="text-sm font-medium text-white">RCD Details</span>
            </div>
            <div className="p-3 space-y-3">
              <div className="grid grid-cols-2 gap-2 items-end">
                <FormField label="BS (EN) Standard">
                  <MobileSelectPicker
                    value={(formData.rcdBsEn as string) || ''}
                    onValueChange={(v) => onUpdate('rcdBsEn', v)}
                    options={[
                      { value: 'BS EN 61008', label: 'BS EN 61008', description: 'RCDs without overcurrent protection' },
                      { value: 'BS EN 61009', label: 'BS EN 61009', description: 'RCBOs' },
                      { value: 'BS EN 62423', label: 'BS EN 62423', description: 'Type F and Type B RCDs' },
                    ]}
                    placeholder="Select standard"
                    title="RCD BS (EN) Standard"
                  />
                </FormField>
                <FormField label="IΔn (mA)">
                  <MobileSelectPicker
                    value={(formData.rcdIdn as string) || ''}
                    onValueChange={(v) => onUpdate('rcdIdn', v)}
                    options={RCD_RATINGS}
                    placeholder="Select rating"
                    title="RCD Rating (mA)"
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-2 items-end">
                <FormField label="Type">
                  <div className="grid grid-cols-4 gap-1">
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
                    className={inputClass}
                  />
                </FormField>
              </div>
            </div>
          </div>
        )}

        {/* AFDD Details */}
        {formData.protectionAfdd && (
          <div className="grid grid-cols-2 gap-2 items-end">
            <FormField label="AFDD BS (EN)">
              <MobileSelectPicker
                value={(formData.afddBsEn as string) || ''}
                onValueChange={(v) => onUpdate('afddBsEn', v)}
                options={[
                  { value: 'BS EN 62606', label: 'BS EN 62606' },
                ]}
                placeholder="Standard"
                title="AFDD BS (EN)"
              />
            </FormField>
            <FormField label="AFDD Rating (A)">
              <Input
                type="number"
                value={(formData.afddRating as string) || ''}
                onChange={(e) => onUpdate('afddRating', e.target.value)}
                placeholder="16"
                className={inputClass}
              />
            </FormField>
          </div>
        )}

        {/* SPD Details */}
        {formData.protectionSpd && (
          <div className="space-y-2">
            <FormField label="SPD Type">
              <div className="grid grid-cols-5 gap-1">
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
            <div className="grid grid-cols-3 gap-2 items-end">
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
                />
              </FormField>
              <FormField label="SPD Make">
                <MobileSelectPicker
                  value={(formData.spdMake as string) || ''}
                  onValueChange={(v) => onUpdate('spdMake', v)}
                  options={SPD_MAKES}
                  placeholder="Select"
                  title="SPD Make"
                />
              </FormField>
              <FormField label="Rated kA">
                <MobileSelectPicker
                  value={(formData.spdRatedKa as string) || ''}
                  onValueChange={(v) => onUpdate('spdRatedKa', v)}
                  options={SPD_RATED_KA}
                  placeholder="Select"
                  title="Rated kA"
                />
              </FormField>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CABLE & INSTALLATION                                                */}
      {/* ------------------------------------------------------------------ */}
      <SectionTitle title="Cable & Installation" />
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="No. of Conductors">
            <div className="grid grid-cols-4 gap-1">
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
          <FormField label="Cable Type">
            <MobileSelectPicker
              value={(formData.cableType as string) || ''}
              onValueChange={(v) => onUpdate('cableType', v)}
              options={CABLE_TYPES}
              placeholder="Type"
              title="Cable Type"
            />
          </FormField>
        </div>

        {/* Live Conductor Size — toggle grid for common, picker for all */}
        <FormField label="Live Conductor Size" required>
          <div className="grid grid-cols-6 gap-1">
            {COMMON_CABLE_SIZES.map((size) => (
              <ToggleButton
                key={size}
                selected={formData.liveConductorSize === size}
                label={`${size}`}
                onClick={() => onUpdate('liveConductorSize', size)}
              />
            ))}
          </div>
          {!COMMON_CABLE_SIZES.includes(formData.liveConductorSize as string) &&
            formData.liveConductorSize && (
              <span className="text-[10px] text-elec-yellow mt-1 block">
                Selected: {(formData.liveConductorSize as string)}mm²
              </span>
            )}
          <MobileSelectPicker
            value={(formData.liveConductorSize as string) || ''}
            onValueChange={(v) => onUpdate('liveConductorSize', v)}
            options={CONDUCTOR_SIZES}
            placeholder="All sizes..."
            title="Live Conductor Size (mm²)"
            triggerClassName={cn(
              'mt-1',
              false
            )}
          />
        </FormField>

        <FormField label="CPC Size">
          <div className="grid grid-cols-6 gap-1">
            {COMMON_CABLE_SIZES.map((size) => {
              const allowed = filteredCpcSizes.some((o) => o.value === size);
              return (
                <ToggleButton
                  key={size}
                  selected={formData.cpcSize === size}
                  label={`${size}`}
                  onClick={() => allowed && onUpdate('cpcSize', size)}
                />
              );
            })}
          </div>
          <MobileSelectPicker
            value={(formData.cpcSize as string) || ''}
            onValueChange={(v) => onUpdate('cpcSize', v)}
            options={filteredCpcSizes}
            placeholder="All sizes..."
            title="CPC Size (mm²)"
            triggerClassName="mt-1"
          />
          {formData.liveConductorSize &&
            parseFloat(formData.liveConductorSize as string) > 16 && (
              <span className="text-[10px] text-white block mt-1">
                Sizes shown up to {formData.liveConductorSize as string}mm² (per BS 7671)
              </span>
            )}
        </FormField>

        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="Installation Method">
            <MobileSelectPicker
              value={(formData.installationMethod as string) || ''}
              onValueChange={handleInstallationMethodChange}
              options={INSTALLATION_METHODS}
              placeholder="Method"
              title="Installation Method"
            />
          </FormField>
          <FormField label="Reference Method">
            <MobileSelectPicker
              value={(formData.referenceMethod as string) || ''}
              onValueChange={(v) => onUpdate('referenceMethod', v)}
              options={REFERENCE_METHODS}
              placeholder="e.g., A, B, C"
              title="Reference Method (BS 7671)"
            />
          </FormField>
        </div>
        {formData.referenceMethod && (
          <span className="text-[10px] text-white block">
            {REFERENCE_METHODS.find((r) => r.value === formData.referenceMethod)?.description}
          </span>
        )}
      </div>
    </div>
  );
};

export default MWCircuitTab;
