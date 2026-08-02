import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormSelectSheet from '@/components/ui/form-select-sheet';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import useReadingKeypad from '@/hooks/useReadingKeypad';
import { useEICRSmartForm } from '@/hooks/inspection/useEICRSmartForm';
import {
  FieldLimitationBadge,
  FieldNotesInput,
  isFieldMarker,
} from '@/components/field-limitations';

// Fields managed by this section (for memoization comparison)
const EARTHING_SECTION_FIELDS = [
  'earthElectrodeType',
  'earthElectrodeResistance',
  'earthElectrodeLocation',
  'maximumDemand',
  'maximumDemandUnit',
  'meansOfEarthingDistributor',
  'meansOfEarthingElectrode',
  'mainEarthingConductorType',
  'mainEarthingConductorSize',
  'mainEarthingConductorSizeCustom',
  'earthingConductorContinuityVerified',
  'mainBondingConductorType',
  'mainBondingSize',
  'mainBondingSizeCustom',
  'bondingCompliance',
  'bondingConductorContinuityVerified',
  'mainBondingLocations',
  // ELE-849 — limitation reason notes
  'meansOfEarthingNotes',
  'mainEarthingConductorTypeNotes',
  'mainEarthingConductorSizeNotes',
  'earthingConductorContinuityVerifiedNotes',
  'mainBondingConductorTypeNotes',
  'mainBondingSizeNotes',
  'bondingConductorContinuityVerifiedNotes',
  'bondingComplianceNotes',
] as const;

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const selectTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 hover:border-white/[0.3] active:scale-100';

const chipBase =
  'h-11 rounded-xl border text-xs transition-all touch-manipulation active:scale-[0.98]';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chipGreenOn = 'bg-green-500 border-green-500 text-black font-semibold';
const chipRedOn = 'bg-red-500 border-red-500 text-white font-semibold';

// Every service the bonding chips can represent. Kept in ONE place so the
// chip-set parser and the free-text 'Other' classifier can never disagree —
// mirrors the EIC fix where a saved 'Lightning Protection' lit the Lightning
// chip AND filled the Other input, then printed twice after the next edit.
const KNOWN_SERVICES = [
  'water',
  'gas',
  'oil',
  'structural steel',
  'steel',
  'lightning',
  'telecom',
];

/** Free-text bonding entries that are NOT one of the known service chips. */
const parseOtherBondingParts = (value: string = ''): string[] => {
  if (value === 'N/A') return []; // limitation marker, not a service list
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((part) => !KNOWN_SERVICES.some((service) => part.toLowerCase().includes(service)));
};

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const FormField = ({
  label,
  required,
  hint,
  trailing,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    {/* h-8 clears the N/A / LIM badges and keeps every field on one baseline. */}
    <div className="mb-2 flex h-8 items-center justify-between gap-2">
      <Label className="text-[12px] font-medium text-white block">
        {label}
        {required && ' *'}
      </Label>
      {trailing}
    </div>
    {children}
    {hint && <span className="text-[11px] text-white block mt-1">{hint}</span>}
  </div>
);

interface EarthingBondingSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

const EarthingBondingSectionInner = ({ formData, onUpdate }: EarthingBondingSectionProps) => {
  const { getWarningsForField } = useEICRSmartForm(formData);
  const haptic = useHaptic();

  const showEarthElectrodeResistance =
    formData.earthElectrodeType &&
    formData.earthElectrodeType !== 'n/a' &&
    formData.earthElectrodeType !== '';

  const showCustomMainBonding = formData.mainBondingSize === 'custom';

  // Reading keypad — shared pattern for the two free-number inputs on this
  // step. Maximum demand's unit follows the existing A/kVA chip selection;
  // values flow through the existing onUpdate path.
  const keypad = useReadingKeypad({
    meta: {
      earthElectrodeResistance: { label: 'RA/Ze — electrode resistance', unit: 'Ω' },
      maximumDemand: {
        label: 'Maximum demand — load',
        unit: formData.maximumDemandUnit === 'kva' ? 'kVA' : 'A',
      },
    },
    sequence: ['earthElectrodeResistance', 'maximumDemand'],
    getValue: (field) => String(formData[field] ?? ''),
    setValue: (field, value) => onUpdate(field, value),
  });

  // Parse existing main bonding locations into chips
  const parseMainBondingLocations = (value: string = ''): Set<string> => {
    const normalized = value.toLowerCase().trim();
    const locations = new Set<string>();

    if (normalized === 'n/a') return locations; // limitation marker

    if (normalized.includes('water')) locations.add('water');
    if (normalized.includes('gas')) locations.add('gas');
    if (normalized.includes('oil')) locations.add('oil');
    if (normalized.includes('structural steel') || normalized.includes('steel'))
      locations.add('structural-steel');
    if (normalized.includes('lightning')) locations.add('lightning-protection');
    if (normalized.includes('telecom')) locations.add('telecoms');

    return locations;
  };

  const [bondingLocations, setBondingLocations] = useState<Set<string>>(() =>
    parseMainBondingLocations(formData.mainBondingLocations)
  );
  const [otherBonding, setOtherBonding] = useState<string>(() =>
    parseOtherBondingParts(formData.mainBondingLocations).join(', ')
  );
  const [otherChecked, setOtherChecked] = useState<boolean>(
    () => parseOtherBondingParts(formData.mainBondingLocations).length > 0
  );

  // The last string THIS section wrote — used to tell our own writes echoing
  // back through formData apart from genuinely external changes (async
  // localStorage/cloud hydration, board imports).
  const lastWrittenRef = useRef<string | null>(null);

  // Sync ALL local state when formData changes externally. The tab mounts
  // before the provider's async hydration lands, so a reopened cert arrives
  // AFTER the useState initialisers ran — without this full re-sync the
  // 'Other' chip stayed off and the next chip tap silently rewrote
  // mainBondingLocations without the saved free-text entry.
  useEffect(() => {
    const value: string = formData.mainBondingLocations || '';
    if (value === lastWrittenRef.current) return; // our own write — local state already ahead
    setBondingLocations(parseMainBondingLocations(value));
    const otherParts = parseOtherBondingParts(value);
    setOtherBonding(otherParts.join(', '));
    setOtherChecked(otherParts.length > 0);
  }, [formData.mainBondingLocations]);

  const handleBondingLocationChange = (service: string, checked: boolean) => {
    const updatedLocations = new Set(bondingLocations);

    if (checked) {
      updatedLocations.add(service);
    } else {
      updatedLocations.delete(service);
    }

    setBondingLocations(updatedLocations);
    updateMainBondingLocations(updatedLocations, otherBonding);
  };

  const handleOtherBondingChange = (value: string) => {
    setOtherBonding(value);
    updateMainBondingLocations(bondingLocations, value);
  };

  const updateMainBondingLocations = (locations: Set<string>, other: string) => {
    const serviceLabels: Record<string, string> = {
      water: 'Water',
      gas: 'Gas',
      oil: 'Oil',
      'structural-steel': 'Structural Steel',
      'lightning-protection': 'Lightning Protection',
      telecoms: 'Telecommunications',
    };

    const parts = Array.from(locations).map((s) => serviceLabels[s] || s);
    if (other.trim()) {
      parts.push(other.trim());
    }

    const joined = parts.join(', ');
    lastWrittenRef.current = joined;
    onUpdate('mainBondingLocations', joined);
  };

  // Conductor size options
  const conductorSizes = ['none', '6', '10', '16', '25', '35', 'custom'];

  // One-tap assist — typical UK domestic PME conductors: Cu 16mm² earthing,
  // Cu 10mm² main bonding. Values match the pickers above exactly (materials
  // are 'Cu'/'Al' chips; sizes are bare numbers rendered as `${size}mm²`).
  // Fills ONLY fields that are still empty — never overwrites a reading,
  // a custom entry or a LIM/N/V marker (all of which are non-empty strings).
  const TYPICAL_PME_FILLS: Array<[string, string]> = [
    ['mainEarthingConductorType', 'Cu'],
    ['mainEarthingConductorSize', '16'],
    ['mainBondingConductorType', 'Cu'],
    ['mainBondingSize', '10'],
  ];
  const typicalPmeActive = TYPICAL_PME_FILLS.every(([field, value]) => formData[field] === value);
  const typicalPmeNothingToFill = TYPICAL_PME_FILLS.every(([field]) => formData[field]);

  const applyTypicalPme = () => {
    if (typicalPmeNothingToFill) return;
    TYPICAL_PME_FILLS.forEach(([field, value]) => {
      if (!formData[field]) onUpdate(field, value);
    });
    haptic.success();
  };

  // Bonding services
  const bondingServices = [
    { id: 'water', label: 'Water' },
    { id: 'gas', label: 'Gas' },
    { id: 'oil', label: 'Oil' },
    { id: 'structural-steel', label: 'Steel' },
    { id: 'lightning-protection', label: 'Lightning' },
    { id: 'telecoms', label: 'Telecoms' },
  ];

  return (
    <div
      className="space-y-4"
      // Delegated press haptic — every chip/button tap in this section buzzes
      // without wiring each onClick individually.
      onPointerDown={(e) => {
        const btn = (e.target as HTMLElement).closest('button');
        // data-own-haptic buttons fire their own pattern (e.g. success) —
        // the delegated light would eat it via the hook's 50ms throttle.
        if (btn && !btn.hasAttribute('data-own-haptic')) haptic.light();
      }}
    >
      {/* Earth electrode */}
      {showEarthElectrodeResistance && (
        <section className={cardCn}>
          <SectionTitle title="Earth electrode" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField
              label="Electrode resistance/impedance, RA/Ze (Ω)"
              required
              hint="Typical values: TT systems <200Ω"
            >
              <Input
                value={formData.earthElectrodeResistance || ''}
                onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                placeholder="e.g., 21"
                type="text"
                inputMode="decimal"
                className={inputCn}
                {...keypad.field('earthElectrodeResistance')}
              />
            </FormField>
            <FormField label="Electrode location" hint="Physical location of the earth electrode">
              <Input
                value={formData.earthElectrodeLocation || ''}
                onChange={(e) => onUpdate('earthElectrodeLocation', e.target.value)}
                placeholder="e.g., Front garden, near meter"
                className={inputCn}
              />
            </FormField>
          </div>
        </section>
      )}

      {/* Maximum demand (Section J — BS 7671:2018+A4:2026) */}
      <section className={cardCn}>
        <SectionTitle title="Maximum demand" />
        <div className="grid grid-cols-3 gap-x-3 sm:gap-x-6 gap-y-4 items-end">
          <div className="col-span-2">
            <FormField label="Maximum demand (load)">
              <Input
                type="text"
                inputMode="decimal"
                value={formData.maximumDemand || ''}
                onChange={(e) => onUpdate('maximumDemand', e.target.value)}
                placeholder="e.g., 100"
                className={inputCn}
                {...keypad.field('maximumDemand')}
              />
            </FormField>
          </div>
          <FormField label="Unit">
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'kva', label: 'kVA' },
                { value: 'amps', label: 'A' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onUpdate('maximumDemandUnit', opt.value)}
                  className={cn(
                    chipBase,
                    (formData.maximumDemandUnit || 'amps') === opt.value ? chipOn : chipOff
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </FormField>
        </div>
      </section>

      {/* Means of earthing */}
      <section className={cardCn}>
        <div className="flex items-center justify-between gap-3">
          <SectionTitle title="Means of earthing" />
          <FieldLimitationBadge
            compact
            value={formData.meansOfEarthingDistributor === 'LIM' ? 'LIM' : ''}
            markers={['LIM']}
            onChange={(v) => {
              if (v === 'LIM') {
                onUpdate('meansOfEarthingDistributor', 'LIM');
                onUpdate('meansOfEarthingElectrode', 'false');
              } else {
                onUpdate('meansOfEarthingDistributor', 'false');
              }
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={formData.meansOfEarthingDistributor === 'LIM'}
            onClick={() =>
              onUpdate(
                'meansOfEarthingDistributor',
                formData.meansOfEarthingDistributor === 'true' ? 'false' : 'true'
              )
            }
            className={cn(
              chipBase,
              formData.meansOfEarthingDistributor === 'true' ? chipOn : chipOff,
              formData.meansOfEarthingDistributor === 'LIM' && 'opacity-40'
            )}
          >
            Distributor
          </button>
          <button
            type="button"
            disabled={formData.meansOfEarthingDistributor === 'LIM'}
            onClick={() =>
              onUpdate(
                'meansOfEarthingElectrode',
                formData.meansOfEarthingElectrode === 'true' ? 'false' : 'true'
              )
            }
            className={cn(
              chipBase,
              formData.meansOfEarthingElectrode === 'true' ? chipOn : chipOff,
              formData.meansOfEarthingDistributor === 'LIM' && 'opacity-40'
            )}
          >
            Electrode
          </button>
        </div>
        <FieldNotesInput
          parentValue={formData.meansOfEarthingDistributor === 'LIM' ? 'LIM' : ''}
          value={formData.meansOfEarthingNotes || ''}
          onChange={(v) => onUpdate('meansOfEarthingNotes', v)}
          placeholder="Reason (e.g. meter room locked)"
        />
      </section>

      {/* Main earthing conductor */}
      <section className={cardCn}>
        <SectionTitle title="Main earthing conductor" />
        {/* Common combo — one tap for typical UK domestic PME. Lit when the
            conductor fields hold exactly that combo (Water + gas pattern). */}
        <button
          type="button"
          data-own-haptic
          onClick={applyTypicalPme}
          className={cn(chipBase, 'w-full px-3', typicalPmeActive ? chipOn : chipOff)}
        >
          Typical domestic PME — Cu 16mm² earth, Cu 10mm² bonding
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField
            label="Material"
            required
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.mainEarthingConductorType || ''}
                markers={['LIM', 'N/V']}
                onChange={(v) => onUpdate('mainEarthingConductorType', v)}
              />
            }
          >
            {isFieldMarker(formData.mainEarthingConductorType) ? (
              <Input
                value={formData.mainEarthingConductorType}
                disabled
                className={cn(inputCn, 'opacity-60')}
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'Cu', label: 'Copper (Cu)' },
                  { value: 'Al', label: 'Aluminium (Al)' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      onUpdate(
                        'mainEarthingConductorType',
                        formData.mainEarthingConductorType === option.value ? '' : option.value
                      )
                    }
                    className={cn(
                      chipBase,
                      formData.mainEarthingConductorType === option.value ? chipOn : chipOff
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            <FieldNotesInput
              parentValue={formData.mainEarthingConductorType || ''}
              value={formData.mainEarthingConductorTypeNotes || ''}
              onChange={(v) => onUpdate('mainEarthingConductorTypeNotes', v)}
              placeholder="Reason"
            />
          </FormField>
          <FormField
            label="Size"
            required
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.mainEarthingConductorSize || ''}
                markers={['LIM', 'N/V']}
                onChange={(v) => onUpdate('mainEarthingConductorSize', v)}
              />
            }
          >
            {isFieldMarker(formData.mainEarthingConductorSize) ? (
              <Input
                value={formData.mainEarthingConductorSize}
                disabled
                className={cn(inputCn, 'opacity-60')}
              />
            ) : (
              <FormSelectSheet
                value={formData.mainEarthingConductorSize || ''}
                onValueChange={(value) => onUpdate('mainEarthingConductorSize', value)}
                placeholder="mm²"
                label="Earthing conductor size"
                allowCustom
                customLabel="Custom size"
                className={selectTriggerCn}
                options={conductorSizes
                  .filter((s) => s !== 'custom')
                  .map((size) => ({
                    value: size,
                    label: size === 'none' ? 'None' : `${size}mm²`,
                  }))}
              />
            )}
            <FieldNotesInput
              parentValue={formData.mainEarthingConductorSize || ''}
              value={formData.mainEarthingConductorSizeNotes || ''}
              onChange={(v) => onUpdate('mainEarthingConductorSizeNotes', v)}
              placeholder="Reason"
            />
          </FormField>
        </div>

        {formData.mainEarthingConductorSize === 'custom' && (
          <FormField label="Custom size">
            <Input
              value={formData.mainEarthingConductorSizeCustom || ''}
              onChange={(e) => onUpdate('mainEarthingConductorSizeCustom', e.target.value)}
              placeholder="50mm²"
              className={inputCn}
            />
          </FormField>
        )}

        <FormField label="Continuity verified">
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'true', label: 'Yes', activeClass: chipGreenOn },
              { value: 'false', label: 'No', activeClass: chipOn },
              { value: 'N/V', label: 'N/V', activeClass: chipOn },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  onUpdate(
                    'earthingConductorContinuityVerified',
                    formData.earthingConductorContinuityVerified === opt.value ? '' : opt.value
                  )
                }
                className={cn(
                  chipBase,
                  formData.earthingConductorContinuityVerified === opt.value
                    ? opt.activeClass
                    : chipOff
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <FieldNotesInput
            parentValue={formData.earthingConductorContinuityVerified === 'N/V' ? 'N/V' : ''}
            value={formData.earthingConductorContinuityVerifiedNotes || ''}
            onChange={(v) => onUpdate('earthingConductorContinuityVerifiedNotes', v)}
            placeholder="Reason (e.g. conductor concealed)"
          />
        </FormField>
      </section>

      {/* Main protective bonding */}
      <section className={cardCn}>
        <SectionTitle title="Main protective bonding" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField
            label="Material"
            required
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.mainBondingConductorType || ''}
                markers={['LIM', 'N/A']}
                onChange={(v) => onUpdate('mainBondingConductorType', v)}
              />
            }
          >
            {isFieldMarker(formData.mainBondingConductorType) ? (
              <Input
                value={formData.mainBondingConductorType}
                disabled
                className={cn(inputCn, 'opacity-60')}
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'Cu', label: 'Copper (Cu)' },
                  { value: 'Al', label: 'Aluminium (Al)' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      onUpdate(
                        'mainBondingConductorType',
                        formData.mainBondingConductorType === option.value ? '' : option.value
                      )
                    }
                    className={cn(
                      chipBase,
                      formData.mainBondingConductorType === option.value ? chipOn : chipOff
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            <FieldNotesInput
              parentValue={formData.mainBondingConductorType || ''}
              value={formData.mainBondingConductorTypeNotes || ''}
              onChange={(v) => onUpdate('mainBondingConductorTypeNotes', v)}
              placeholder="Reason"
            />
          </FormField>
          <FormField
            label="Size"
            required
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.mainBondingSize || ''}
                markers={['LIM', 'N/A']}
                onChange={(v) => onUpdate('mainBondingSize', v)}
              />
            }
          >
            {isFieldMarker(formData.mainBondingSize) ? (
              <Input
                value={formData.mainBondingSize}
                disabled
                className={cn(inputCn, 'opacity-60')}
              />
            ) : (
              <FormSelectSheet
                value={formData.mainBondingSize || ''}
                onValueChange={(value) => onUpdate('mainBondingSize', value)}
                placeholder="Select size"
                label="Main bonding size"
                allowCustom
                customLabel="Custom size"
                className={selectTriggerCn}
                options={conductorSizes
                  .filter((s) => s !== 'custom')
                  .map((size) => ({
                    value: size,
                    label: size === 'none' ? 'None' : `${size}mm²`,
                  }))}
              />
            )}
            <FieldNotesInput
              parentValue={formData.mainBondingSize || ''}
              value={formData.mainBondingSizeNotes || ''}
              onChange={(v) => onUpdate('mainBondingSizeNotes', v)}
              placeholder="Reason (e.g. no bonding services present)"
            />
          </FormField>
        </div>

        {/* Compliance (ELE-849 — 4-way with N/V added) */}
        <FormField label="Compliance" required>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { value: 'satisfactory', label: 'Satisfactory', activeClass: chipGreenOn },
              { value: 'unsatisfactory', label: 'Unsatisfactory', activeClass: chipRedOn },
              { value: 'N/V', label: 'N/V', activeClass: chipOn },
              { value: 'not-applicable', label: 'N/A', activeClass: chipOn },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  onUpdate(
                    'bondingCompliance',
                    formData.bondingCompliance === option.value ? '' : option.value
                  )
                }
                className={cn(
                  chipBase,
                  formData.bondingCompliance === option.value ? option.activeClass : chipOff
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <FieldNotesInput
            parentValue={formData.bondingCompliance === 'N/V' ? 'N/V' : ''}
            value={formData.bondingComplianceNotes || ''}
            onChange={(v) => onUpdate('bondingComplianceNotes', v)}
            placeholder="Reason (e.g. bonding not fully inspected)"
          />
        </FormField>

        {/* Smart validation warnings */}
        {[...getWarningsForField('mainBondingSize'), ...getWarningsForField('bondingCompliance')].map(
          (w, i) => (
            <p key={i} className="text-xs text-orange-300">
              {w.message}
              {w.regulation ? ` (${w.regulation})` : ''}
            </p>
          )
        )}

        {showCustomMainBonding && (
          <FormField label="Custom size">
            <Input
              value={formData.mainBondingSizeCustom || ''}
              onChange={(e) => onUpdate('mainBondingSizeCustom', e.target.value)}
              placeholder="35mm²"
              className={inputCn}
            />
          </FormField>
        )}

        {/* Continuity verified — 3-way toggle (Yes/No/N/V) */}
        <FormField label="Continuity verified">
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'true', label: 'Yes', activeClass: chipGreenOn },
              { value: 'false', label: 'No', activeClass: chipOn },
              { value: 'N/V', label: 'N/V', activeClass: chipOn },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  onUpdate(
                    'bondingConductorContinuityVerified',
                    formData.bondingConductorContinuityVerified === opt.value ? '' : opt.value
                  )
                }
                className={cn(
                  chipBase,
                  formData.bondingConductorContinuityVerified === opt.value
                    ? opt.activeClass
                    : chipOff
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <FieldNotesInput
            parentValue={formData.bondingConductorContinuityVerified === 'N/V' ? 'N/V' : ''}
            value={formData.bondingConductorContinuityVerifiedNotes || ''}
            onChange={(v) => onUpdate('bondingConductorContinuityVerifiedNotes', v)}
            placeholder="Reason (e.g. conductor not accessible)"
          />
        </FormField>

        {/* Bonding locations */}
        <div className="border-t border-white/[0.1] pt-4 space-y-4">
          <FormField
            label="Bonding locations"
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.mainBondingLocations === 'N/A' ? 'N/A' : ''}
                markers={['N/A']}
                onChange={(v) => {
                  if (v === 'N/A') {
                    onUpdate('mainBondingLocations', 'N/A');
                    setBondingLocations(new Set());
                  } else {
                    onUpdate('mainBondingLocations', '');
                  }
                }}
              />
            }
          >
            {formData.mainBondingLocations === 'N/A' ? (
              <Input
                value="N/A — no services to bond"
                disabled
                className={cn(inputCn, 'opacity-60')}
              />
            ) : (
              <div className="space-y-2">
                {/* Common combos — one tap for typical UK domestic. Lit when the
                    current selection is exactly that combo. */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { keys: ['water', 'gas'], label: 'Water + gas' },
                    { keys: ['water', 'gas', 'oil'], label: 'Water + gas + oil' },
                  ].map(({ keys, label }) => {
                    const isActive =
                      !otherChecked &&
                      bondingLocations.size === keys.length &&
                      keys.every((k) => bondingLocations.has(k));
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          const newLocs = new Set<string>(keys);
                          setBondingLocations(newLocs);
                          updateMainBondingLocations(newLocs, otherChecked ? otherBonding : '');
                        }}
                        className={cn(chipBase, isActive ? chipOn : chipOff)}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[...bondingServices, { id: 'other', label: 'Other' }].map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        if (service.id === 'other') {
                          const newVal = !otherChecked;
                          setOtherChecked(newVal);
                          if (!newVal) {
                            setOtherBonding('');
                            updateMainBondingLocations(bondingLocations, '');
                          }
                        } else {
                          handleBondingLocationChange(
                            service.id,
                            !bondingLocations.has(service.id)
                          );
                        }
                      }}
                      className={cn(
                        chipBase,
                        (service.id === 'other'
                          ? otherChecked
                          : bondingLocations.has(service.id))
                          ? chipOn
                          : chipOff
                      )}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </FormField>

          {otherChecked && formData.mainBondingLocations !== 'N/A' && (
            <FormField label="Other services">
              <Input
                value={otherBonding}
                onChange={(e) => handleOtherBondingChange(e.target.value)}
                placeholder="Lightning protection, Metal pipework"
                className={inputCn}
              />
            </FormField>
          )}
        </div>
      </section>

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
};

// Memoized component - only re-renders when EARTHING_SECTION_FIELDS change
const EarthingBondingSection = React.memo(EarthingBondingSectionInner, (prevProps, nextProps) => {
  // Compare only the fields this section cares about
  for (const field of EARTHING_SECTION_FIELDS) {
    if (prevProps.formData[field] !== nextProps.formData[field]) {
      return false; // Re-render needed
    }
  }
  return prevProps.onUpdate === nextProps.onUpdate;
});

EarthingBondingSection.displayName = 'EarthingBondingSection';

export default EarthingBondingSection;
