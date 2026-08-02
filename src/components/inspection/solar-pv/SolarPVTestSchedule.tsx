/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Solar PV Test Schedule — Best-in-Class Mobile
 * DC array tests, inverter tests, AC tests, commissioning
 * BS EN 62446 + BS 7671:2018+A4:2026
 */

import { useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import {
  SolarPVFormData,
  getDefaultArrayTestResult,
  getDefaultInverterTestResult,
  RCD_TYPES,
  ANTI_ISLANDING_METHODS,
  EARTHING_ARRANGEMENT_OPTIONS,
  BIDIRECTIONAL_DEVICE_TYPES,
} from '@/types/solar-pv';
import { useSolarPVSmartForm } from '@/hooks/inspection/useSolarPVSmartForm';
import { rcdBsStandardOptions } from '@/types/protectiveDeviceTypes';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import {
  Section,
  Field,
  inputCn,
  inputSmCn,
  textareaCn,
  TestResultRow,
  AllPassButton,
  CheckboxCard,
  ResultPill,
  DesignWarningBanner,
} from './SolarPVSection';
import useReadingKeypad, { ReadingMeta } from '@/hooks/useReadingKeypad';

interface Props {
  formData: SolarPVFormData;
  onUpdate: (field: string, value: unknown) => void;
}

const TEST_EQUIPMENT_TYPES = [
  { value: 'mft', label: 'Multifunction Tester (MFT)' },
  { value: 'ir-tester', label: 'Insulation Resistance Tester' },
  { value: 'clamp-meter', label: 'Clamp Meter' },
  { value: 'irradiance-meter', label: 'Irradiance Meter' },
  { value: 'thermometer', label: 'Thermometer' },
  { value: 'pv-string-tester', label: 'PV String Tester' },
  { value: 'earth-tester', label: 'Earth Electrode Tester' },
  { value: 'voltage-indicator', label: 'Voltage Indicator' },
  { value: 'proving-unit', label: 'Proving Unit' },
];

// ── Reading keypad field maps — shared MW pattern ──
// Free-text numeric READINGS only; selects/combos/chips and design/spec fields
// stay on their native inputs. Per-array/per-inverter fields carry the record
// id so data-keypad-field stays unique when several cards render on one page.
interface ReadingFieldDef {
  prefix: string;
  prop: string;
  label: string;
  unit: string;
  inf?: boolean;
}

const ARRAY_READING_FIELDS: ReadingFieldDef[] = [
  { prefix: 'voc', prop: 'vocMeasured', label: 'Voc — measured open circuit', unit: 'V' },
  { prefix: 'isc', prop: 'iscMeasured', label: 'Isc — measured short circuit', unit: 'A' },
  { prefix: 'irpos', prop: 'irPositiveToEarth', label: 'Insulation +ve to earth', unit: 'MΩ', inf: true },
  { prefix: 'irneg', prop: 'irNegativeToEarth', label: 'Insulation −ve to earth', unit: 'MΩ', inf: true },
  { prefix: 'irr', prop: 'irradiance', label: 'Irradiance', unit: 'W/m²' },
  { prefix: 'amb', prop: 'ambientTemp', label: 'Ambient temperature', unit: '°C' },
  { prefix: 'mod', prop: 'moduleTemp', label: 'Module temperature', unit: '°C' },
];

const INVERTER_READING_FIELDS: ReadingFieldDef[] = [
  { prefix: 'dcra', prop: 'dcIsolatorRatingA', label: 'DC isolator current rating', unit: 'A' },
  { prefix: 'dcrv', prop: 'dcIsolatorRatingV', label: 'DC isolator voltage rating', unit: 'V' },
];

const AC_READING_PROPS: Record<string, string> = {
  ze: 'zeValue',
  zs: 'zsValue',
  rcdtrip: 'rcdTripTime',
  r1r2: 'r1r2Value',
  irac: 'insulationResistance',
};

const COMMISSIONING_READING_PROPS: Record<string, string> = {
  power: 'initialPowerOutput',
  genmeter: 'generationMeterReading',
  exportmeter: 'exportMeterReading',
};

const FIXED_READING_META: Record<string, ReadingMeta> = {
  ze: { label: 'Ze — external loop impedance', unit: 'Ω' },
  zs: { label: 'Zs — earth fault loop', unit: 'Ω' },
  rcdtrip: { label: 'RCD trip time', unit: 'ms' },
  r1r2: { label: 'R1+R2 — continuity', unit: 'Ω' },
  irac: { label: 'Insulation resistance — AC circuit', unit: 'MΩ', inf: true },
  power: { label: 'Initial power output', unit: 'kW' },
  genmeter: { label: 'Generation meter reading', unit: 'kWh' },
  exportmeter: { label: 'Export meter reading', unit: 'kWh' },
};

/** Natural test order for the fixed (non-repeated) readings. */
const FIXED_READING_SEQUENCE = ['ze', 'zs', 'rcdtrip', 'r1r2', 'irac', 'power', 'genmeter', 'exportmeter'];

/** Resolve a prefixed per-record field name back to its definition + record id. */
const matchPrefixed = (field: string, defs: ReadingFieldDef[]) => {
  for (const def of defs) {
    if (field.startsWith(def.prefix + '-')) {
      return { def, id: field.slice(def.prefix.length + 1) };
    }
  }
  return null;
};

const SolarPVTestSchedule: React.FC<Props> = ({ formData, onUpdate }) => {
  const { validateTestConditions, suggestRCDType, getDesignWarnings } = useSolarPVSmartForm(formData, onUpdate);
  const haptic = useHaptic();

  // Initialize test results when arrays/inverters exist
  useEffect(() => {
    const currentArrayTests = formData.testResults?.arrayTests || [];
    const currentInverterTests = formData.testResults?.inverterTests || [];

    if (formData.arrays?.length > 0 && currentArrayTests.length !== formData.arrays.length) {
      const newArrayTests = formData.arrays.map((array) => {
        const existing = currentArrayTests.find((t: any) => t.arrayId === array.id);
        if (existing) return existing;
        const test = getDefaultArrayTestResult(array.id);
        test.vocExpected = array.stringVoltageVoc || 0;
        test.iscExpected = array.stringCurrentIsc || 0;
        return test;
      });
      onUpdate('testResults', { ...formData.testResults, arrayTests: newArrayTests });
    }

    if (formData.inverters?.length > 0 && currentInverterTests.length !== formData.inverters.length) {
      const newInverterTests = formData.inverters.map((inv) => {
        const existing = currentInverterTests.find((t: any) => t.inverterId === inv.id);
        if (existing) return existing;
        return getDefaultInverterTestResult(inv.id);
      });
      onUpdate('testResults', { ...formData.testResults, inverterTests: newInverterTests });
    }
  }, [formData.arrays, formData.inverters]);

  const updateArrayTest = (arrayId: string, field: string, value: unknown) => {
    const tests = (formData.testResults?.arrayTests || []).map((t: any) =>
      t.arrayId === arrayId ? { ...t, [field]: value } : t
    );
    onUpdate('testResults', { ...formData.testResults, arrayTests: tests });
  };

  const updateInverterTest = (inverterId: string, field: string, value: unknown) => {
    const tests = (formData.testResults?.inverterTests || []).map((t: any) =>
      t.inverterId === inverterId ? { ...t, [field]: value } : t
    );
    onUpdate('testResults', { ...formData.testResults, inverterTests: tests });
  };

  const updateAcTest = (field: string, value: unknown) => {
    onUpdate('testResults', {
      ...formData.testResults,
      acTests: { ...formData.testResults?.acTests, [field]: value },
    });
  };

  const updateCommissioning = (field: string, value: unknown) => {
    onUpdate('testResults', {
      ...formData.testResults,
      commissioning: { ...formData.testResults?.commissioning, [field]: value },
    });
  };

  const getArrayById = (id: string) => formData.arrays?.find((a) => a.id === id);
  const getInverterById = (id: string) => formData.inverters?.find((i) => i.id === id);

  // ── Reading keypad — shared MW pattern ──
  // One instance serves every reading on the tab. Values flow through the
  // existing testResults update paths; getValue mirrors what each input
  // renders (zero/empty both display as '', matching `value={x || ''}`).
  const findArrayTest = (id: string) =>
    (formData.testResults?.arrayTests || []).find((t: any) => t.arrayId === id);
  const findInverterTest = (id: string) =>
    (formData.testResults?.inverterTests || []).find((t: any) => t.inverterId === id);

  const keypadMeta = useMemo(() => {
    const meta: Record<string, ReadingMeta> = { ...FIXED_READING_META };
    (formData.testResults?.arrayTests || []).forEach((t: any, i: number) => {
      ARRAY_READING_FIELDS.forEach((f) => {
        meta[`${f.prefix}-${t.arrayId}`] = {
          label: `Array ${i + 1} — ${f.label}`,
          unit: f.unit,
          ...(f.inf ? { inf: true } : {}),
        };
      });
    });
    (formData.testResults?.inverterTests || []).forEach((t: any, i: number) => {
      INVERTER_READING_FIELDS.forEach((f) => {
        meta[`${f.prefix}-${t.inverterId}`] = { label: `Inverter ${i + 1} — ${f.label}`, unit: f.unit };
      });
    });
    return meta;
  }, [formData.testResults]);

  const keypadSequence = useMemo(
    () => [
      ...(formData.testResults?.arrayTests || []).flatMap((t: any) =>
        ARRAY_READING_FIELDS.map((f) => `${f.prefix}-${t.arrayId}`)
      ),
      ...(formData.testResults?.inverterTests || []).flatMap((t: any) =>
        INVERTER_READING_FIELDS.map((f) => `${f.prefix}-${t.inverterId}`)
      ),
      ...FIXED_READING_SEQUENCE,
    ],
    [formData.testResults]
  );

  const keypad = useReadingKeypad({
    meta: keypadMeta,
    sequence: keypadSequence,
    getValue: (field) => {
      const a = matchPrefixed(field, ARRAY_READING_FIELDS);
      if (a) return String((findArrayTest(a.id) as any)?.[a.def.prop] || '');
      const inv = matchPrefixed(field, INVERTER_READING_FIELDS);
      if (inv) return String((findInverterTest(inv.id) as any)?.[inv.def.prop] || '');
      if (AC_READING_PROPS[field]) {
        return String((formData.testResults?.acTests as any)?.[AC_READING_PROPS[field]] || '');
      }
      if (COMMISSIONING_READING_PROPS[field]) {
        return String(
          (formData.testResults?.commissioning as any)?.[COMMISSIONING_READING_PROPS[field]] || ''
        );
      }
      return '';
    },
    setValue: (field, value) => {
      const a = matchPrefixed(field, ARRAY_READING_FIELDS);
      if (a) {
        if (a.def.prop === 'vocMeasured' || a.def.prop === 'iscMeasured') {
          // Mirror the typed handlers' ±10% tolerance verdict, but write the
          // measured value and the verdict in ONE testResults update — two
          // sequential updateArrayTest calls each derive from the same stale
          // formData closure, so the second write would clobber the first.
          const isVoc = a.def.prop === 'vocMeasured';
          const measured = parseFloat(value) || 0;
          const tests = (formData.testResults?.arrayTests || []).map((t: any) => {
            if (t.arrayId !== a.id) return t;
            const expected = (isVoc ? t.vocExpected : t.iscExpected) || 0;
            const tol = expected * 0.1;
            const within = measured >= expected - tol && measured <= expected + tol;
            return isVoc
              ? { ...t, vocMeasured: value, vocWithinTolerance: within }
              : { ...t, iscMeasured: value, iscWithinTolerance: within };
          });
          onUpdate('testResults', { ...formData.testResults, arrayTests: tests });
        } else {
          updateArrayTest(a.id, a.def.prop, value);
        }
        return;
      }
      const inv = matchPrefixed(field, INVERTER_READING_FIELDS);
      if (inv) {
        updateInverterTest(inv.id, inv.def.prop, value);
        return;
      }
      if (AC_READING_PROPS[field]) {
        updateAcTest(AC_READING_PROPS[field], value);
        return;
      }
      if (COMMISSIONING_READING_PROPS[field]) {
        updateCommissioning(COMMISSIONING_READING_PROPS[field], value);
      }
    },
    getStatus: (field, value) => {
      // Reuses only the verdicts this file already computes — the ±10%
      // tolerance flags, the ≥1 MΩ IR minimum and the ≤300 ms RCD pill.
      if (!value) return null;
      const a = matchPrefixed(field, ARRAY_READING_FIELDS);
      if (a) {
        const t = findArrayTest(a.id) as any;
        if (!t) return null;
        if (a.def.prop === 'vocMeasured' || a.def.prop === 'iscMeasured') {
          const within = a.def.prop === 'vocMeasured' ? t.vocWithinTolerance : t.iscWithinTolerance;
          if (within === true) return { tone: 'pass', label: 'Within ±10% of expected' };
          if (within === false) return { tone: 'check', label: 'Outside ±10% tolerance' };
          return null;
        }
        if (a.def.prop === 'irPositiveToEarth' || a.def.prop === 'irNegativeToEarth') {
          const min = t.irMinimumRequired || 1;
          const v = parseFloat(value);
          if (isNaN(v)) return null;
          if (v >= min) return { tone: 'pass', label: `Meets ${min} MΩ minimum` };
          if (v > 0) return { tone: 'check', label: `Below ${min} MΩ minimum` };
          return null;
        }
        return null;
      }
      if (field === 'rcdtrip') {
        const v = parseFloat(value);
        if (isNaN(v)) return null;
        return v <= 300
          ? { tone: 'pass', label: '≤300 ms' }
          : { tone: 'check', label: 'Exceeds 300 ms' };
      }
      return null;
    },
  });

  // RCD suggestion
  const hasBattery = !!formData.battery?.installed;
  const rcdSuggestion = suggestRCDType(formData.systemType || 'grid-tied', hasBattery);

  // Design warnings for testing context
  const warnings = getDesignWarnings(formData as any).filter(
    (w) => w.field.startsWith('acTests') || w.field.startsWith('arrays')
  );

  return (
    <div className="space-y-6">
      <DesignWarningBanner warnings={warnings} />

      {/* Test Equipment */}
      <Section title="Test Equipment" accentColor="from-white/20 to-white/5" count={(formData.testResults?.testEquipment || []).length}>
        {(formData.testResults?.testEquipment || []).map((eq: any, idx: number) => (
          <div key={eq.id || idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-white">Instrument {idx + 1}</p>
              <button
                onClick={() => {
                  haptic.medium();
                  const updated = (formData.testResults?.testEquipment || []).filter((_: any, i: number) => i !== idx);
                  onUpdate('testResults', { ...formData.testResults, testEquipment: updated });
                }}
                className="h-11 shrink-0 rounded-xl px-2.5 text-sm font-medium text-red-400 touch-manipulation active:scale-[0.97]"
              >
                Remove
              </button>
            </div>
            <Field label="Type">
              <ComboboxCell
                value={eq.type || ''}
                onChange={(v) => {
                  const updated = [...(formData.testResults?.testEquipment || [])];
                  updated[idx] = { ...updated[idx], type: v };
                  onUpdate('testResults', { ...formData.testResults, testEquipment: updated });
                }}
                options={TEST_EQUIPMENT_TYPES}
                className="h-10 text-sm"
                allowCustom
              />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Make & Model">
                <Input
                  value={eq.makeModel || ''}
                  onChange={(e) => {
                    const updated = [...(formData.testResults?.testEquipment || [])];
                    updated[idx] = { ...updated[idx], makeModel: e.target.value };
                    onUpdate('testResults', { ...formData.testResults, testEquipment: updated });
                  }}
                  placeholder="e.g., Megger MFT1741"
                  className={inputSmCn}
                />
              </Field>
              <Field label="Serial No.">
                <Input
                  value={eq.serialNumber || ''}
                  onChange={(e) => {
                    const updated = [...(formData.testResults?.testEquipment || [])];
                    updated[idx] = { ...updated[idx], serialNumber: e.target.value };
                    onUpdate('testResults', { ...formData.testResults, testEquipment: updated });
                  }}
                  className={inputSmCn}
                />
              </Field>
              <Field label="Calibration Date">
                <Input
                  type="date"
                  value={eq.calibrationDate || ''}
                  onChange={(e) => {
                    const updated = [...(formData.testResults?.testEquipment || [])];
                    updated[idx] = { ...updated[idx], calibrationDate: e.target.value };
                    onUpdate('testResults', { ...formData.testResults, testEquipment: updated });
                  }}
                  className={cn(inputSmCn, '[color-scheme:dark]')}
                />
              </Field>
              <Field label="Calibration Due">
                <Input
                  type="date"
                  value={eq.calibrationDue || ''}
                  onChange={(e) => {
                    const updated = [...(formData.testResults?.testEquipment || [])];
                    updated[idx] = { ...updated[idx], calibrationDue: e.target.value };
                    onUpdate('testResults', { ...formData.testResults, testEquipment: updated });
                  }}
                  className={cn(inputSmCn, '[color-scheme:dark]')}
                />
              </Field>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            haptic.light();
            const eq = { id: crypto.randomUUID(), type: '', makeModel: '', serialNumber: '', calibrationDate: '', calibrationDue: '' };
            onUpdate('testResults', { ...formData.testResults, testEquipment: [...(formData.testResults?.testEquipment || []), eq] });
          }}
          className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.1] flex items-center justify-center gap-2 text-sm font-medium text-white/50 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Test Instrument
        </button>
      </Section>

      {/* DC Array Tests */}
      <Section title="DC Array Tests" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <p className="text-[10px] text-white">
            <strong>BS EN 62446:</strong> Record irradiance &gt;400 W/m² for valid Isc. Temperature affects Voc.
          </p>
        </div>

        {(formData.testResults?.arrayTests || []).length === 0 && (
          <div className="p-6 text-center rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-white/20" />
            <p className="text-sm text-white">Add arrays in System Design tab first</p>
          </div>
        )}

        {(formData.testResults?.arrayTests || []).map((test: any, index: number) => {
          const array = getArrayById(test.arrayId);
          return (
            <div key={test.arrayId} className="space-y-4">
              {/* Array header */}
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-white">
                  {array?.panelMake || 'Array'} {array?.panelModel || index + 1}
                </span>
              </div>

              {/* Voc — expected as context label, measured as main input */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-white">Voc — Open Circuit Voltage</p>
                  <ResultPill result={test.vocWithinTolerance === true ? 'pass' : test.vocWithinTolerance === false ? 'fail' : ''} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-white mb-1">Expected (V)</p>
                    <Input type="number" inputMode="decimal" step="0.1" value={test.vocExpected || array?.stringVoltageVoc || ''} onChange={(e) => updateArrayTest(test.arrayId, 'vocExpected', parseFloat(e.target.value) || 0)} className={cn(inputSmCn, 'bg-white/[0.03] text-amber-400')} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white mb-1">Measured (V)</p>
                    <Input inputMode="decimal" step="0.1" value={test.vocMeasured || ''} onChange={(e) => {
                      const measured = parseFloat(e.target.value) || 0;
                      const expected = test.vocExpected || 0;
                      const tol = expected * 0.1;
                      updateArrayTest(test.arrayId, 'vocMeasured', measured);
                      updateArrayTest(test.arrayId, 'vocWithinTolerance', measured >= expected - tol && measured <= expected + tol);
                    }} className={inputSmCn} placeholder="±10% tolerance" {...keypad.field(`voc-${test.arrayId}`)} />
                  </div>
                </div>
              </div>

              {/* Isc */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-white">Isc — Short Circuit Current</p>
                  <ResultPill result={test.iscWithinTolerance === true ? 'pass' : test.iscWithinTolerance === false ? 'fail' : ''} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-white mb-1">Expected (A)</p>
                    <Input type="number" inputMode="decimal" step="0.01" value={test.iscExpected || array?.stringCurrentIsc || ''} onChange={(e) => updateArrayTest(test.arrayId, 'iscExpected', parseFloat(e.target.value) || 0)} className={cn(inputSmCn, 'bg-white/[0.03] text-amber-400')} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white mb-1">Measured (A)</p>
                    <Input inputMode="decimal" step="0.01" value={test.iscMeasured || ''} onChange={(e) => {
                      const measured = parseFloat(e.target.value) || 0;
                      const expected = test.iscExpected || 0;
                      const tol = expected * 0.1;
                      updateArrayTest(test.arrayId, 'iscMeasured', measured);
                      updateArrayTest(test.arrayId, 'iscWithinTolerance', measured >= expected - tol && measured <= expected + tol);
                    }} className={inputSmCn} placeholder="±10% tolerance" {...keypad.field(`isc-${test.arrayId}`)} />
                  </div>
                </div>
              </div>

              {/* Insulation Resistance */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-white">Insulation Resistance ({test.irTestVoltage || 1000}V)</p>
                  <ResultPill result={
                    test.irPositiveToEarth >= (test.irMinimumRequired || 1) && test.irNegativeToEarth >= (test.irMinimumRequired || 1)
                      ? 'pass' : test.irPositiveToEarth > 0 ? 'fail' : ''
                  } />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-white mb-1">+ve to Earth (MΩ)</p>
                    <Input inputMode="decimal" step="0.1" value={test.irPositiveToEarth || ''} onChange={(e) => updateArrayTest(test.arrayId, 'irPositiveToEarth', parseFloat(e.target.value) || 0)} className={inputSmCn} placeholder="≥1 MΩ" {...keypad.field(`irpos-${test.arrayId}`)} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white mb-1">-ve to Earth (MΩ)</p>
                    <Input inputMode="decimal" step="0.1" value={test.irNegativeToEarth || ''} onChange={(e) => updateArrayTest(test.arrayId, 'irNegativeToEarth', parseFloat(e.target.value) || 0)} className={inputSmCn} placeholder="≥1 MΩ" {...keypad.field(`irneg-${test.arrayId}`)} />
                  </div>
                </div>
              </div>

              {/* Environment */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <p className="text-xs font-medium text-white">Test Conditions</p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-[10px] text-white mb-1">Irradiance</p>
                    <Input inputMode="numeric" value={test.irradiance || ''} onChange={(e) => updateArrayTest(test.arrayId, 'irradiance', parseFloat(e.target.value) || 0)} placeholder="W/m²" className={inputSmCn} {...keypad.field(`irr-${test.arrayId}`)} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white mb-1">Ambient</p>
                    <Input inputMode="decimal" step="0.5" value={test.ambientTemp || ''} onChange={(e) => updateArrayTest(test.arrayId, 'ambientTemp', parseFloat(e.target.value) || 0)} placeholder="°C" className={inputSmCn} {...keypad.field(`amb-${test.arrayId}`)} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white mb-1">Module</p>
                    <Input inputMode="decimal" step="0.5" value={test.moduleTemp || ''} onChange={(e) => updateArrayTest(test.arrayId, 'moduleTemp', parseFloat(e.target.value) || 0)} placeholder="°C" className={inputSmCn} {...keypad.field(`mod-${test.arrayId}`)} />
                  </div>
                </div>
                {test.irradiance > 0 && test.irradiance < 400 && (
                  <p className="text-[10px] text-orange-400">⚠ Low irradiance — Isc results may be unreliable per BS EN 62446</p>
                )}
              </div>

              {/* Polarity & Continuity */}
              <TestResultRow label="Polarity Correct" value={test.polarityCorrect ? 'pass' : ''} onChange={(v) => updateArrayTest(test.arrayId, 'polarityCorrect', v === 'pass')} />
              <TestResultRow label="String Continuity" value={test.stringContinuity ? 'pass' : ''} onChange={(v) => updateArrayTest(test.arrayId, 'stringContinuity', v === 'pass')} />

              <Field label="Notes">
                <Input value={test.notes || ''} onChange={(e) => updateArrayTest(test.arrayId, 'notes', e.target.value)} placeholder="Observations..." className={inputSmCn} />
              </Field>

              {/* Divider between arrays */}
              {index < (formData.testResults?.arrayTests || []).length - 1 && (
                <div className="h-px bg-white/[0.06]" />
              )}
            </div>
          );
        })}
      </Section>

      {/* Inverter Tests */}
      <Section title="Inverter Tests" accentColor="from-blue-500/40 to-cyan-400/20">
        {(formData.testResults?.inverterTests || []).length === 0 && (
          <div className="p-6 text-center rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-white/20" />
            <p className="text-sm text-white">Add inverters in System Design tab first</p>
          </div>
        )}

        {(formData.testResults?.inverterTests || []).map((test: any, index: number) => {
          const inverter = getInverterById(test.inverterId);
          const markAllPass = () => {
            const updates: Record<string, any> = {
              dcIsolatorOperational: true,
              acIsolatorOperational: true,
              antiIslandingTest: true,
              earthFaultProtection: true,
              overvoltageProtection: true,
            };
            Object.entries(updates).forEach(([k, v]) => updateInverterTest(test.inverterId, k, v));
            updateInverterTest(test.inverterId, 'commissioning', {
              ...test.commissioning,
              powerOnTest: true,
              gridSyncTest: true,
              displayFunctional: true,
              communicationsTest: true,
            });
          };

          return (
            <div key={test.inverterId} className="space-y-4">
              {/* Inverter header */}
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-white">{inverter?.make || 'Inverter'} {inverter?.model || index + 1}</span>
                </div>
                <AllPassButton onClick={markAllPass} />
              </div>

              {/* Isolators */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <p className="text-xs font-medium text-white">Isolators</p>
                <TestResultRow label="DC Isolator" value={test.dcIsolatorOperational ? 'pass' : test.dcIsolatorOperational === false ? 'fail' : ''} onChange={(v) => updateInverterTest(test.inverterId, 'dcIsolatorOperational', v === 'pass')} />
                <Input value={test.dcIsolatorLocation || ''} onChange={(e) => updateInverterTest(test.inverterId, 'dcIsolatorLocation', e.target.value)} placeholder="DC isolator location..." className={inputSmCn} />
                <div className="grid grid-cols-2 gap-2">
                  <Input inputMode="decimal" value={test.dcIsolatorRatingA || ''} onChange={(e) => updateInverterTest(test.inverterId, 'dcIsolatorRatingA', parseFloat(e.target.value) || 0)} placeholder="DC isolator rating (A)" className={inputSmCn} {...keypad.field(`dcra-${test.inverterId}`)} />
                  <Input inputMode="decimal" value={test.dcIsolatorRatingV || ''} onChange={(e) => updateInverterTest(test.inverterId, 'dcIsolatorRatingV', parseFloat(e.target.value) || 0)} placeholder="DC isolator rating (V)" className={inputSmCn} {...keypad.field(`dcrv-${test.inverterId}`)} />
                </div>
                <TestResultRow label="AC Isolator" value={test.acIsolatorOperational ? 'pass' : test.acIsolatorOperational === false ? 'fail' : ''} onChange={(v) => updateInverterTest(test.inverterId, 'acIsolatorOperational', v === 'pass')} />
                <Input value={test.acIsolatorLocation || ''} onChange={(e) => updateInverterTest(test.inverterId, 'acIsolatorLocation', e.target.value)} placeholder="AC isolator location..." className={inputSmCn} />
              </div>

              {/* Protection */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <p className="text-xs font-medium text-white">Protection</p>
                <TestResultRow label="Anti-Islanding" value={test.antiIslandingTest ? 'pass' : ''} onChange={(v) => updateInverterTest(test.inverterId, 'antiIslandingTest', v === 'pass')} />
                <ComboboxCell
                  value={test.antiIslandingMethod || ''}
                  onChange={(v) => updateInverterTest(test.inverterId, 'antiIslandingMethod', v)}
                  options={ANTI_ISLANDING_METHODS.map((m) => ({ value: m.value, label: m.label }))}
                  placeholder="Anti-islanding method..."
                  className="h-10 text-sm"
                  allowCustom
                />
                <TestResultRow label="Earth Fault" value={test.earthFaultProtection ? 'pass' : ''} onChange={(v) => updateInverterTest(test.inverterId, 'earthFaultProtection', v === 'pass')} />
                <TestResultRow label="Overvoltage" value={test.overvoltageProtection ? 'pass' : ''} onChange={(v) => updateInverterTest(test.inverterId, 'overvoltageProtection', v === 'pass')} />
              </div>

              {/* Commissioning */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <p className="text-xs font-medium text-white">Commissioning</p>
                <TestResultRow label="Power On" value={test.commissioning?.powerOnTest ? 'pass' : ''} onChange={(v) => updateInverterTest(test.inverterId, 'commissioning', { ...test.commissioning, powerOnTest: v === 'pass' })} />
                <TestResultRow label="Grid Sync" value={test.commissioning?.gridSyncTest ? 'pass' : ''} onChange={(v) => updateInverterTest(test.inverterId, 'commissioning', { ...test.commissioning, gridSyncTest: v === 'pass' })} />
                <TestResultRow label="Display" value={test.commissioning?.displayFunctional ? 'pass' : ''} onChange={(v) => updateInverterTest(test.inverterId, 'commissioning', { ...test.commissioning, displayFunctional: v === 'pass' })} />
                <TestResultRow label="Comms" value={test.commissioning?.communicationsTest ? 'pass' : ''} onChange={(v) => updateInverterTest(test.inverterId, 'commissioning', { ...test.commissioning, communicationsTest: v === 'pass' })} />
              </div>

              <Field label="Firmware Version">
                <Input value={test.firmwareVersion || ''} onChange={(e) => updateInverterTest(test.inverterId, 'firmwareVersion', e.target.value)} placeholder="Optional" className={inputSmCn} />
              </Field>

              {index < (formData.testResults?.inverterTests || []).length - 1 && (
                <div className="h-px bg-white/[0.06]" />
              )}
            </div>
          );
        })}
      </Section>

      {/* AC Tests */}
      {/* AC Installation Tests */}
      <Section title="AC Installation Tests" accentColor="from-blue-500/40 to-cyan-400/20">
        {/* Earthing */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <p className="text-xs font-medium text-white">Earthing & Impedance</p>
          <Field label="Earthing Arrangement">
            <ComboboxCell
              value={formData.testResults?.acTests?.earthingArrangement || 'TN-C-S'}
              onChange={(v) => updateAcTest('earthingArrangement', v)}
              options={EARTHING_ARRANGEMENT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
              className="h-10 text-sm"
              allowCustom
            />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Ze (Ω)">
              <Input inputMode="decimal" step="0.01" value={formData.testResults?.acTests?.zeValue || ''} onChange={(e) => updateAcTest('zeValue', parseFloat(e.target.value) || 0)} className={inputSmCn} {...keypad.field('ze')} />
            </Field>
            <Field label="Zs (Ω)">
              <Input inputMode="decimal" step="0.01" value={formData.testResults?.acTests?.zsValue || ''} onChange={(e) => updateAcTest('zsValue', parseFloat(e.target.value) || 0)} className={inputSmCn} {...keypad.field('zs')} />
            </Field>
          </div>
        </div>

        {/* RCD */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-white">RCD Protection</p>
            <ResultPill result={formData.testResults?.acTests?.rcdTripTime ? (formData.testResults.acTests.rcdTripTime <= 300 ? 'pass' : 'fail') : ''} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Type">
              <ComboboxCell
                value={formData.testResults?.acTests?.rcdType || 'Type A'}
                onChange={(v) => updateAcTest('rcdType', v)}
                options={RCD_TYPES.map((r) => ({ value: r.value, label: r.label }))}
                className="h-10 text-sm"
                allowCustom
              />
            </Field>
            <Field label="Rating (mA)">
              <ComboboxCell
                value={formData.testResults?.acTests?.rcdRating?.toString() || '30'}
                onChange={(v) => updateAcTest('rcdRating', parseInt(v) || 30)}
                options={[{ value: '30', label: '30mA' }, { value: '100', label: '100mA' }, { value: '300', label: '300mA' }]}
                className="h-10 text-sm"
                allowCustom
              />
            </Field>
          </div>
          <Field label="Trip Time (ms)">
            <Input inputMode="numeric" value={formData.testResults?.acTests?.rcdTripTime || ''} onChange={(e) => updateAcTest('rcdTripTime', parseInt(e.target.value) || 0)} placeholder="≤300ms" className={inputSmCn} {...keypad.field('rcdtrip')} />
          </Field>
          <Field label="BS Standard">
            <ComboboxCell
              value={formData.testResults?.acTests?.rcdBsStandard || ''}
              onChange={(v) => updateAcTest('rcdBsStandard', v)}
              options={rcdBsStandardOptions}
              placeholder="Select standard..."
              className="h-10 text-sm"
              allowCustom
            />
          </Field>
          {rcdSuggestion && hasBattery && formData.testResults?.acTests?.rcdType !== 'Type B' && (
            <p className="text-[10px] text-orange-400">⚠ {rcdSuggestion.reason}</p>
          )}
        </div>

        {/* Continuity & IR */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <p className="text-xs font-medium text-white">Continuity & Insulation</p>
          <div className="grid grid-cols-2 gap-2">
            <Field label="R1+R2 (Ω)">
              <Input inputMode="decimal" step="0.01" value={formData.testResults?.acTests?.r1r2Value || ''} onChange={(e) => updateAcTest('r1r2Value', parseFloat(e.target.value) || 0)} className={inputSmCn} {...keypad.field('r1r2')} />
            </Field>
            <Field label="IR (MΩ)">
              <Input inputMode="decimal" step="0.1" value={formData.testResults?.acTests?.insulationResistance || ''} onChange={(e) => updateAcTest('insulationResistance', parseFloat(e.target.value) || 0)} placeholder="≥1 MΩ" className={inputSmCn} {...keypad.field('irac')} />
            </Field>
          </div>
        </div>

        {/* Protection Device — Smart cascading */}
        <ProtectionDeviceCard
          formData={formData}
          updateAcTest={updateAcTest}
        />

        <TestResultRow label="AC Polarity Correct" value={formData.testResults?.acTests?.polarityCorrect ? 'pass' : ''} onChange={(v) => updateAcTest('polarityCorrect', v === 'pass')} />

        {/* Bidirectional Device */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <p className="text-xs font-medium text-white">Bidirectional Protection</p>
          <p className="text-[10px] text-white">BS 7671:2018+A4:2026 Reg. 530.3.201</p>
          <CheckboxCard
            label="Bidirectional Device Installed"
            description="Required for hybrid/battery systems"
            checked={!!formData.testResults?.acTests?.bidirectionalDeviceInstalled}
            onChange={(v) => updateAcTest('bidirectionalDeviceInstalled', v)}
            accentColor="blue"
          />
          {formData.testResults?.acTests?.bidirectionalDeviceInstalled && (
            <div className="grid grid-cols-2 gap-2">
              <Field label="Device Type">
                <ComboboxCell
                  value={formData.testResults?.acTests?.bidirectionalDeviceType || ''}
                  onChange={(v) => updateAcTest('bidirectionalDeviceType', v)}
                  options={BIDIRECTIONAL_DEVICE_TYPES.map((d) => ({ value: d.value, label: d.label }))}
                  className="h-10 text-sm"
                  allowCustom
                />
              </Field>
              <Field label="Make & Model">
                <Input
                  value={`${formData.testResults?.acTests?.bidirectionalDeviceMake || ''} ${formData.testResults?.acTests?.bidirectionalDeviceModel || ''}`.trim()}
                  onChange={(e) => {
                    const parts = e.target.value.split(' ');
                    updateAcTest('bidirectionalDeviceMake', parts[0] || '');
                    updateAcTest('bidirectionalDeviceModel', parts.slice(1).join(' ') || '');
                  }}
                  placeholder="e.g., Hager Type B RCBO"
                  className={inputSmCn}
                />
              </Field>
            </div>
          )}
        </div>
      </Section>

      {/* Commissioning */}
      <Section title="Commissioning" accentColor="from-green-500/40 to-emerald-400/20">
        {/* Performance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Initial Power Output (kW)">
            <Input inputMode="decimal" step="0.1" value={formData.testResults?.commissioning?.initialPowerOutput || ''} onChange={(e) => updateCommissioning('initialPowerOutput', parseFloat(e.target.value) || 0)} placeholder="Observed" className={inputCn} {...keypad.field('power')} />
          </Field>
          <Field label="Weather Conditions">
            <Input value={formData.testResults?.commissioning?.weatherConditions || ''} onChange={(e) => updateCommissioning('weatherConditions', e.target.value)} placeholder="e.g., Clear, full sun" className={inputCn} />
          </Field>
        </div>

        {/* Meter readings */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Generation Meter (kWh)">
            <Input inputMode="decimal" step="0.1" value={formData.testResults?.commissioning?.generationMeterReading || ''} onChange={(e) => updateCommissioning('generationMeterReading', parseFloat(e.target.value) || 0)} placeholder="Initial" className={inputSmCn} {...keypad.field('genmeter')} />
          </Field>
          <Field label="Export Meter (kWh)">
            <Input inputMode="decimal" step="0.1" value={formData.testResults?.commissioning?.exportMeterReading || ''} onChange={(e) => updateCommissioning('exportMeterReading', parseFloat(e.target.value) || 0)} placeholder="If fitted" className={inputSmCn} {...keypad.field('exportmeter')} />
          </Field>
        </div>

        {/* Checklist as CheckboxCards */}
        <div className="space-y-2">
          <p className="text-[10px] text-white uppercase tracking-wider">System & Customer Handover</p>
          <CheckboxCard label="System Operational & Generating" checked={!!formData.testResults?.commissioning?.systemOperational} onChange={(v) => updateCommissioning('systemOperational', v)} accentColor="green" />
          <CheckboxCard label="Export to Grid Verified" checked={!!formData.testResults?.commissioning?.exportVerified} onChange={(v) => updateCommissioning('exportVerified', v)} accentColor="green" />
          <CheckboxCard label="Customer Briefed on System" checked={!!formData.testResults?.commissioning?.customerBriefed} onChange={(v) => updateCommissioning('customerBriefed', v)} accentColor="green" />
          <CheckboxCard label="Emergency Shutdown Explained" checked={!!formData.testResults?.commissioning?.shutdownProcedureExplained} onChange={(v) => updateCommissioning('shutdownProcedureExplained', v)} accentColor="green" />
          <CheckboxCard label="Performance Expectations Set" checked={!!formData.testResults?.commissioning?.systemPerformanceExplained} onChange={(v) => updateCommissioning('systemPerformanceExplained', v)} accentColor="green" />
          <CheckboxCard label="Maintenance Requirements Explained" checked={!!formData.testResults?.commissioning?.maintenanceRequirementsExplained} onChange={(v) => updateCommissioning('maintenanceRequirementsExplained', v)} accentColor="green" />
          <CheckboxCard label="Warranty Details Explained" checked={!!formData.testResults?.commissioning?.warrantyDetailsExplained} onChange={(v) => updateCommissioning('warrantyDetailsExplained', v)} accentColor="green" />
          <CheckboxCard label="All Documentation Provided" checked={!!formData.testResults?.commissioning?.documentationProvided} onChange={(v) => updateCommissioning('documentationProvided', v)} accentColor="green" />
          <CheckboxCard label="Emergency Contact Details Given" checked={!!formData.testResults?.commissioning?.emergencyContactProvided} onChange={(v) => updateCommissioning('emergencyContactProvided', v)} accentColor="green" />
        </div>

        <Field label="Commissioning Notes">
          <Textarea value={formData.testResults?.commissioning?.notes || ''} onChange={(e) => updateCommissioning('notes', e.target.value)} placeholder="Observations, issues resolved, follow-up..." className={textareaCn} />
        </Field>
      </Section>

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
};

// ============================================================================
// Protection Device Card — smart cascading from EICR/EIC data
// ============================================================================

import {
  PROTECTIVE_DEVICE_TYPES,
  DEVICE_RATINGS,
  BREAKING_CAPACITIES,
} from '@/constants/minorWorksOptions';

function ProtectionDeviceCard({
  formData,
  updateAcTest,
}: {
  formData: SolarPVFormData;
  updateAcTest: (field: string, value: unknown) => void;
}) {
  const deviceValue = formData.testResults?.acTests?.protectionDeviceType || '';
  const isFuse = deviceValue.includes('fuse');
  const isMcb = deviceValue.startsWith('mcb-');
  const isRcbo = deviceValue.startsWith('rcbo-');
  const showCurve = isMcb || isRcbo || deviceValue === 'mccb';

  // Smart rating filter based on device type
  const getRatingsForDevice = () => {
    if (isFuse && deviceValue.includes('bs3036')) {
      return DEVICE_RATINGS.filter((r) => ['5', '15', '20', '30', '45', '60'].includes(r.value));
    }
    if (isFuse && deviceValue.includes('bs1361')) {
      return DEVICE_RATINGS.filter((r) => ['5', '15', '20', '30', '45', '60', '80', '100'].includes(r.value));
    }
    if (isFuse && deviceValue.includes('bs1362')) {
      return DEVICE_RATINGS.filter((r) => ['3', '5', '13'].includes(r.value));
    }
    if (isFuse && deviceValue.includes('bs88')) {
      return DEVICE_RATINGS.filter((r) => ['2', '4', '6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100', '125', '160', '200'].includes(r.value));
    }
    // MCB/RCBO/MCCB — standard BS EN 60898 values
    return DEVICE_RATINGS.filter((r) => ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100'].includes(r.value));
  };

  // Smart breaking capacity based on device type
  const getBreakingCapacities = () => {
    if (isFuse && deviceValue.includes('bs3036')) {
      return BREAKING_CAPACITIES.filter((b) => ['1', '1.5', '2', '4'].includes(b.value));
    }
    if (isFuse && deviceValue.includes('bs1361')) {
      return BREAKING_CAPACITIES.filter((b) => ['16.5'].includes(b.value));
    }
    if (isFuse && deviceValue.includes('bs88')) {
      return BREAKING_CAPACITIES.filter((b) => ['80'].includes(b.value));
    }
    // MCB/RCBO
    return BREAKING_CAPACITIES.filter((b) => ['6', '10', '15', '16', '20', '25'].includes(b.value));
  };

  return (
    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
      <p className="text-xs font-medium text-white">Protection Device</p>

      <Field label="Device Type">
        <ComboboxCell
          value={deviceValue}
          onChange={(v) => {
            updateAcTest('protectionDeviceType', v);
            // Reset curve if switching to fuse
            if (v.includes('fuse')) updateAcTest('mcbType', '');
          }}
          options={PROTECTIVE_DEVICE_TYPES.map((d) => ({ value: d.value, label: `${d.label} — ${d.description}` }))}
          className="h-12 text-base"
          allowCustom
        />
      </Field>

      <div className="grid grid-cols-2 gap-2">
        <Field label="Rating (A)">
          <ComboboxCell
            value={formData.testResults?.acTests?.mcbRating?.toString() || ''}
            onChange={(v) => updateAcTest('mcbRating', parseInt(v) || 0)}
            options={getRatingsForDevice().map((r) => ({ value: r.value, label: `${r.label} — ${r.description}` }))}
            className="h-10 text-sm"
            allowCustom
          />
        </Field>

        {showCurve ? (
          <Field label="Curve">
            <ComboboxCell
              value={formData.testResults?.acTests?.mcbType || 'B'}
              onChange={(v) => updateAcTest('mcbType', v)}
              options={[
                { value: 'B', label: 'Type B — 3-5× In' },
                { value: 'C', label: 'Type C — 5-10× In' },
                { value: 'D', label: 'Type D — 10-20× In' },
              ]}
              className="h-10 text-sm"
              allowCustom
            />
          </Field>
        ) : (
          <Field label="Breaking Capacity">
            <ComboboxCell
              value={formData.testResults?.acTests?.pfc?.toString() || ''}
              onChange={(v) => updateAcTest('pfc', parseFloat(v) || 0)}
              options={getBreakingCapacities().map((b) => ({ value: b.value, label: `${b.label} — ${b.description}` }))}
              className="h-10 text-sm"
              allowCustom
            />
          </Field>
        )}
      </div>

      {showCurve && (
        <Field label="PFC (kA)">
          <ComboboxCell
            value={formData.testResults?.acTests?.pfc?.toString() || ''}
            onChange={(v) => updateAcTest('pfc', parseFloat(v) || 0)}
            options={getBreakingCapacities().map((b) => ({ value: b.value, label: `${b.label} — ${b.description}` }))}
            className="h-10 text-sm"
            allowCustom
          />
        </Field>
      )}

      <Field label="Location">
        <Input value={formData.testResults?.acTests?.mcbLocation || ''} onChange={(e) => updateAcTest('mcbLocation', e.target.value)} placeholder="e.g., Main CU, Way 12" className={inputSmCn} />
      </Field>
    </div>
  );
}

export default SolarPVTestSchedule;
