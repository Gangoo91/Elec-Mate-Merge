import React, { useState, useEffect, useRef } from 'react';
import { useHaptic } from '@/hooks/useHaptic';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import useReadingKeypad from '@/hooks/useReadingKeypad';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const chipBase =
  'h-11 rounded-xl border text-xs transition-all touch-manipulation active:scale-[0.98]';

// Every service the bonding chips can represent. Kept in ONE place so the
// chip-set parser and the free-text 'Other' classifier can never disagree —
// they previously did ('lightning' was missing from the Other classifier), so
// a saved 'Lightning Protection' lit the Lightning chip AND filled the Other
// input, then printed twice on the certificate after the next edit.
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
const parseOtherBondingParts = (value: string = ''): string[] =>
  value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((part) => !KNOWN_SERVICES.some((service) => part.toLowerCase().includes(service)));
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chipGreenOn = 'bg-green-500 border-green-500 text-black font-semibold';

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const FormField = ({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-[12px] font-medium text-white mb-1 block">{label}{required && ' *'}</Label>
    {children}
    {hint && <span className="text-[11px] text-white block mt-1">{hint}</span>}
  </div>
);

interface EarthingAndBondingSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
}

const EarthingAndBondingSection: React.FC<EarthingAndBondingSectionProps> = ({
  formData,
  onUpdate,
}) => {
  // No physical electrode → hide Resistance/Location. Covers the new 'na' option,
  // an empty selection, and legacy saves that stored 'pme' (removed — ELE-1389).
  const isElectrodeAbsent =
    !formData.earthElectrodeType ||
    formData.earthElectrodeType === 'na' ||
    formData.earthElectrodeType === 'pme';

  // Reading keypad — shared MW pattern for the two free-number inputs on this
  // step. Maximum demand's unit follows the existing A/kVA chip selection;
  // values flow through the existing onUpdate path.
  const keypad = useReadingKeypad({
    meta: {
      earthElectrodeResistance: { label: 'RA — earth electrode resistance', unit: 'Ω' },
      maximumDemand: {
        label: 'Maximum demand — load',
        unit: formData.maximumDemandUnit === 'kva' ? 'kVA' : 'A',
      },
    },
    sequence: ['earthElectrodeResistance', 'maximumDemand'],
    getValue: (field) => String(formData[field] ?? ''),
    setValue: (field, value) => onUpdate(field, value),
  });

  // Parse existing main bonding locations into checkboxes
  const parseMainBondingLocations = (value: string = ''): Set<string> => {
    const normalized = value.toLowerCase().trim();
    const locations = new Set<string>();

    if (normalized.includes('water')) locations.add('water');
    if (normalized.includes('gas')) locations.add('gas');
    if (normalized.includes('oil')) locations.add('oil');
    if (normalized.includes('structural steel') || normalized.includes('steel'))
      locations.add('structural-steel');
    if (normalized.includes('lightning')) locations.add('lightning');
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
      lightning: 'Lightning Protection',
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


  const haptic = useHaptic();
  return (
    <div
      // lg:contents — on desktop each card becomes its own grid item of the
      // parent 2-col grid (the MW per-card layout), so a short neighbouring
      // section no longer leaves a section-tall blank band. Events still
      // bubble through display:contents, so the delegated haptic keeps working.
      className="space-y-4 lg:space-y-0 lg:contents"
      // Delegated press haptic — every chip/button tap in this section buzzes
      // like the MW tabs without wiring each onClick individually.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      {/* Earth Electrode */}
      <section className={cardCn}>
        <SectionTitle title="Earth electrode" />
        <FormField label="Electrode type">
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'rod', label: 'Rod' },
              { value: 'plate', label: 'Plate' },
              { value: 'tape', label: 'Tape' },
              { value: 'foundation', label: 'Foundation' },
              { value: 'na', label: 'N/A' },
              { value: 'other', label: 'Other' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  const newVal = formData.earthElectrodeType === opt.value ? '' : opt.value;
                  onUpdate('earthElectrodeType', newVal);
                  if (newVal === 'na') onUpdate('earthElectrodeResistance', '');
                }}
                className={cn(
                  chipBase,
                  formData.earthElectrodeType === opt.value ? chipOn : chipOff
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FormField>

        {!isElectrodeAbsent && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Resistance (Ω)">
              <Input
                type="text"
                inputMode="decimal"
                value={formData.earthElectrodeResistance || ''}
                onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                placeholder="e.g., 0.5"
                className={inputCn}
                {...keypad.field('earthElectrodeResistance')}
              />
            </FormField>
            <FormField label="Location">
              <Input
                value={formData.earthElectrodeLocation || ''}
                onChange={(e) => onUpdate('earthElectrodeLocation', e.target.value)}
                placeholder="e.g., Garden adjacent to building"
                className={inputCn}
              />
            </FormField>
          </div>
        )}
      </section>

      {/* Means of Earthing */}
      <section className={cardCn}>
        <SectionTitle title="Means of earthing" />
        <FormField label="Means of earthing" required>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={cn(
                chipBase,
                formData.meansOfEarthing === 'distributor' ? chipOn : chipOff
              )}
              onClick={() =>
                onUpdate(
                  'meansOfEarthing',
                  formData.meansOfEarthing === 'distributor' ? '' : 'distributor'
                )
              }
            >
              Distributor's facility
            </button>
            <button
              type="button"
              className={cn(
                chipBase,
                formData.meansOfEarthing === 'electrode' ? chipOn : chipOff
              )}
              onClick={() =>
                onUpdate(
                  'meansOfEarthing',
                  formData.meansOfEarthing === 'electrode' ? '' : 'electrode'
                )
              }
            >
              Installation earth electrode
            </button>
          </div>
        </FormField>
      </section>

      {/* Maximum Demand */}
      <section className={cardCn}>
        <SectionTitle title="Maximum demand" />
        <div className="grid grid-cols-3 gap-x-3 sm:gap-x-6 gap-y-4 items-end">
          <div className="col-span-2">
            <FormField label="Load">
              <Input
                type="text"
                inputMode="decimal"
                value={formData.maximumDemand || ''}
                onChange={(e) => onUpdate('maximumDemand', e.target.value)}
                placeholder="e.g., 60"
                className={inputCn}
                {...keypad.field('maximumDemand')}
              />
            </FormField>
          </div>
          <FormField label="Unit">
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'amps', label: 'A' },
                { value: 'kva', label: 'kVA' },
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

      {/* Main Protective Conductors */}
      <section className={cardCn}>
        <SectionTitle title="Main protective conductors" />

        {/* Earthing Conductor */}
        <div className="space-y-2">
          <Label className="text-[12px] font-medium text-white mb-1 block">Earthing conductor</Label>
          <div className="grid grid-cols-3 gap-2">
            {['Copper', 'Aluminium', 'Steel'].map((mat) => (
              <button
                key={mat}
                type="button"
                onClick={() => onUpdate('earthingConductorMaterial', formData.earthingConductorMaterial === mat.toLowerCase() ? '' : mat.toLowerCase())}
                className={cn(
                  chipBase,
                  formData.earthingConductorMaterial === mat.toLowerCase() ? chipOn : chipOff
                )}
              >
                {mat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {['6', '10', '16', '25', '35', '50'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onUpdate('earthingConductorCsa', formData.earthingConductorCsa === size ? '' : size)}
                className={cn(
                  'h-11 rounded-xl border text-[11px] transition-all touch-manipulation active:scale-[0.98]',
                  formData.earthingConductorCsa === size ? chipOn : chipOff
                )}
              >
                {size}mm²
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onUpdate('earthingConductorVerified', !formData.earthingConductorVerified)}
            className={cn(
              'w-full h-11 rounded-xl border text-xs transition-all touch-manipulation active:scale-[0.98]',
              formData.earthingConductorVerified ? chipGreenOn : chipOff
            )}
          >
            Connection / continuity verified
          </button>
        </div>

        {/* Main Protective Bonding Conductors */}
        <div className="border-t border-white/[0.1] pt-4 space-y-2">
          <Label className="text-[12px] font-medium text-white mb-1 block">Main protective bonding conductors</Label>
          <div className="grid grid-cols-3 gap-2">
            {['Copper', 'Aluminium', 'Steel'].map((mat) => (
              <button
                key={mat}
                type="button"
                onClick={() => onUpdate('mainBondingMaterial', formData.mainBondingMaterial === mat.toLowerCase() ? '' : mat.toLowerCase())}
                className={cn(
                  chipBase,
                  formData.mainBondingMaterial === mat.toLowerCase() ? chipOn : chipOff
                )}
              >
                {mat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {['6mm', '10mm', '16mm', '25mm', '35mm', '50mm'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onUpdate('mainBondingSize', formData.mainBondingSize === size ? '' : size)}
                className={cn(
                  'h-11 rounded-xl border text-[11px] transition-all touch-manipulation active:scale-[0.98]',
                  formData.mainBondingSize === size ? chipOn : chipOff
                )}
              >
                {size}²
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onUpdate('mainBondingVerified', !formData.mainBondingVerified)}
            className={cn(
              'w-full h-11 rounded-xl border text-xs transition-all touch-manipulation active:scale-[0.98]',
              formData.mainBondingVerified ? chipGreenOn : chipOff
            )}
          >
            Connection / continuity verified
          </button>
        </div>
      </section>

      {/* Bonding Connections */}
      <section className={cardCn}>
        <SectionTitle title="Bonding connections to" />

        {/* Common combos — one tap for typical UK domestic. Lit when the
            current selection is exactly that combo (MW presets reflect state). */}
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
          {[
            { key: 'water', label: 'Water' },
            { key: 'gas', label: 'Gas' },
            { key: 'oil', label: 'Oil' },
            { key: 'structural-steel', label: 'Steel' },
            { key: 'lightning', label: 'Lightning' },
            { key: 'telecoms', label: 'Telecoms' },
            { key: 'other', label: 'Other' },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (key === 'other') {
                  const newVal = !otherChecked;
                  setOtherChecked(newVal);
                  if (!newVal) { setOtherBonding(''); updateMainBondingLocations(bondingLocations, ''); }
                } else {
                  handleBondingLocationChange(key, !bondingLocations.has(key));
                }
              }}
              className={cn(
                chipBase,
                (key === 'other' ? otherChecked : bondingLocations.has(key)) ? chipOn : chipOff
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {otherChecked && (
          <FormField label="Specify other">
            <Input
              value={otherBonding}
              onChange={(e) => handleOtherBondingChange(e.target.value)}
              placeholder="e.g., Central heating pipework"
              className={inputCn}
            />
          </FormField>
        )}
      </section>

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
};

export default EarthingAndBondingSection;
