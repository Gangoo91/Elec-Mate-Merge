import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import {
  RCD_RATINGS,
  RCD_TYPES,
  TEST_EQUIPMENT,
  INSULATION_TEST_VOLTAGES,
} from '@/constants/minorWorksOptions';
import { useMinorWorksSmartForm } from '@/hooks/useMinorWorksSmartForm';
import MWReadingKeypad, { KeypadStatus } from '@/components/minor-works/MWReadingKeypad';

interface MWTestingTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
}

/* ── Design recipe ─────────────────────────────────────────────── */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

/* ── Local helpers ─────────────────────────────────────────────── */

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const SubHeading = ({ title }: { title: string }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{title}</h3>
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
    <Label className={labelCn}>
      {label}
      {required && ' *'}
    </Label>
    {children}
    {hint && <span className="text-[11px] text-white/85 block mt-1">{hint}</span>}
  </div>
);

/** Unit suffix that sits inside a reading input's right padding. */
const UnitSuffix = ({ unit }: { unit: string }) => (
  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-sm">{unit}</span>
);

/** Toggle button row — used for pass/fail, voltage, etc. */
const ToggleButtons = ({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; color?: string }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex gap-2">
    {options.map((opt) => {
      const isActive = value === opt.value;
      const activeColor =
        opt.color === 'green'
          ? 'bg-green-500 border-green-500 text-black font-semibold'
          : opt.color === 'red'
            ? 'bg-red-500 border-red-500 text-white font-semibold'
            : opt.color === 'amber'
              ? 'bg-amber-500 border-amber-500 text-black font-semibold'
              : 'bg-elec-yellow border-elec-yellow text-black font-semibold';
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'h-11 px-3 rounded-xl border text-sm touch-manipulation transition-all active:scale-[0.98] flex-1',
            isActive ? activeColor : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
          )}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

/* ── Component ─────────────────────────────────────────────────── */

/** Every numeric reading the keypad can serve — single source for its header.
 * The sequence below is only the Next-reading ORDER; any field here can open
 * the keypad directly, in or out of that flow. Keeping render keyed off this
 * map (not the sequence) means a field can never suppress the native keyboard
 * without a keypad behind it. */
const KEYPAD_META: Record<string, { label: string; unit: string; inf?: boolean }> = {
  continuityR1R2: { label: 'R1 + R2 — continuity', unit: 'Ω' },
  r2Continuity: { label: 'R2 — continuity', unit: 'Ω' },
  ringR1: { label: 'Ring r1 (line) — end to end', unit: 'Ω' },
  ringRn: { label: 'Ring rn (neutral) — end to end', unit: 'Ω' },
  ringR2: { label: 'Ring r2 (cpc) — end to end', unit: 'Ω' },
  ringR1Cross: { label: 'Ring cross-connect r1', unit: 'Ω' },
  ringRnCross: { label: 'Ring cross-connect rn', unit: 'Ω' },
  ringR2Cross: { label: 'Ring cross-connect r2', unit: 'Ω' },
  ringFinalContinuity: { label: 'R1 + R2 — ring final', unit: 'Ω' },
  insulationLiveNeutral: { label: 'Insulation L-L', unit: 'MΩ', inf: true },
  insulationLiveEarth: { label: 'Insulation L-E', unit: 'MΩ', inf: true },
  insulationLiveLive: { label: 'Insulation L-L (3-phase)', unit: 'MΩ', inf: true },
  earthFaultLoopImpedance: { label: 'Zs — earth fault loop', unit: 'Ω' },
  prospectiveFaultCurrent: { label: 'Ipf — prospective fault current', unit: 'kA' },
  externalImpedance: { label: 'Ze — external loop', unit: 'Ω' },
  earthElectrodeResistance: { label: 'RA — earth electrode', unit: 'Ω' },
  rcdOneX: { label: 'RCD trip @ 1×IΔn', unit: 'ms' },
  rcdFiveX: { label: 'RCD trip @ 5×IΔn', unit: 'ms' },
  rcboTripTime: { label: 'RCBO trip time', unit: 'ms' },
  afddTripTime: { label: 'AFDD trip time', unit: 'ms' },
};

const MWTestingTab: React.FC<MWTestingTabProps> = ({ formData, onUpdate }) => {
  const [recentInstruments, setRecentInstruments] = useState<string[]>([]);
  // Cross-connect ring readings are optional — only expand if user already filled them in.
  const [showCrossConnect, setShowCrossConnect] = useState<boolean>(
    !!(formData.ringR1Cross || formData.ringRnCross || formData.ringR2Cross)
  );
  // Manual override for Max Permitted Zs — auto-calc is off when user edits this field.
  const [zsManualOverride, setZsManualOverride] = useState<boolean>(false);

  // ── Reading keypad — one reading at a time, explicit Next ──
  // Touch devices (any size — phones, iPads, Android tablets, iPad Pro
  // landscape) get the keypad via pointer coarseness; sub-desktop windows get
  // it regardless, which keeps behaviour predictable and testable. Wide
  // mouse-first machines keep native typing. inputMode='none' only suppresses
  // VIRTUAL keyboards, so a hardware keyboard can always type either way — the
  // input can never go dead. The same flag drives inputMode and the render.
  const [coarsePointer] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024)
  );
  const [activeKeypad, setActiveKeypad] = useState<string | null>(null);

  const threePhaseSupply = formData.supplyPhases === '3' || formData.supplyPhases === 'Three';
  const keypadSequence = useMemo<string[]>(
    () => [
      // GN3 ring test order: end-to-end r1/rn/r2 FIRST, then the ring-final R1+R2.
      ...(formData.circuitType === 'ring'
        ? ['ringR1', 'ringRn', 'ringR2', 'ringFinalContinuity']
        : ['continuityR1R2']),
      'insulationLiveNeutral',
      'insulationLiveEarth',
      ...(threePhaseSupply ? ['insulationLiveLive'] : []),
      'earthFaultLoopImpedance',
      'prospectiveFaultCurrent',
      ...(formData.protectionRcd || formData.protectionRcbo ? ['rcdOneX', 'rcdFiveX'] : []),
    ],
    [threePhaseSupply, formData.circuitType, formData.protectionRcd, formData.protectionRcbo]
  );

  /** Scroll a reading so it sits fully ABOVE the keypad panel. Centring is
   * wrong here — with the keypad owning the lower part of the screen, the
   * viewport centre is roughly the cut line, leaving the field half-hidden.
   * Double rAF lets the keypad mount before measuring its real top edge. */
  const scrollReadingClearOfKeypad = (el: HTMLElement | null) => {
    if (!el) return;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const panel = document.querySelector('[data-mw-keypad]');
        const keypadTop = panel ? panel.getBoundingClientRect().top : window.innerHeight * 0.6;
        const rect = el.getBoundingClientRect();
        const clearance = 32; // room for the verdict line under the input
        const headerBottom = 175; // app header + fixed shell (title row + step tabs)
        const needed = rect.bottom + clearance - keypadTop;
        if (needed > 0) {
          // Never scroll the field's top up under the fixed shell header.
          const allowed = Math.max(0, rect.top - headerBottom);
          window.scrollBy({ top: Math.min(needed, allowed), behavior: 'smooth' });
        }
      })
    );
  };

  /** Wires an input into the keypad on mobile; desktop keeps native typing. */
  const keypadField = (field: string) =>
    coarsePointer
      ? {
          inputMode: 'none' as const,
          autoComplete: 'off',
          'data-keypad-field': field,
          onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
            setActiveKeypad(field);
            scrollReadingClearOfKeypad(e.currentTarget);
          },
        }
      : {};

  /** Next visible reading input after `current`, in DOM order — used when the
   * active field sits outside the main sequence (ring end-to-ends, Ze, RA…). */
  const nextVisibleKeypadField = (current: string): string | null => {
    const fields = Array.from(document.querySelectorAll<HTMLElement>('[data-keypad-field]'));
    const ix = fields.findIndex((el) => el.dataset.keypadField === current);
    if (ix === -1) return null;
    const nextEl = fields.slice(ix + 1).find((el) => el.offsetParent !== null);
    return nextEl?.dataset.keypadField || null;
  };

  const keypadAdvance = () => {
    const current = activeKeypad || '';
    const ix = keypadSequence.indexOf(current);
    // In-sequence readings follow the test order; off-sequence readings fall
    // through to the next visible reading on the page instead of closing.
    const next = ix === -1 ? nextVisibleKeypadField(current) : keypadSequence[ix + 1];
    if (!next) {
      setActiveKeypad(null);
      return;
    }
    setActiveKeypad(next);
    scrollReadingClearOfKeypad(document.querySelector<HTMLElement>(`[data-keypad-field="${next}"]`));
  };

  // Smart form hook for saved instruments from Business Settings
  const { getAvailableInstruments, loadTestEquipment } = useMinorWorksSmartForm();
  const savedInstruments = getAvailableInstruments();

  // Load recent instruments on mount
  useEffect(() => {
    const loadInstruments = async () => {
      try {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        const instruments = await offlineStorage.getRecentInstruments();
        setRecentInstruments(instruments);
      } catch (e) {
        console.error('Failed to load recent instruments', e);
      }
    };
    loadInstruments();
  }, []);

  // Auto-fill serial and calibration when instrument is selected. Always
  // refills (empty when nothing is stored) — the previous instrument's serial
  // must never survive a switch onto the new instrument's certificate.
  const loadInstrumentDetails = async (make: string) => {
    if (!make || make === 'other') return;
    try {
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const details = await offlineStorage.getInstrumentDetails(make);
      onUpdate('testEquipmentSerial', details?.serialNumber || '');
      onUpdate('testEquipmentCalDate', details?.calibrationDate || '');
    } catch (e) {
      console.error('Failed to load instrument details', e);
    }
  };

  // Save instrument details when serial or calibration changes. Guarded so a
  // change of INSTRUMENT never saves the outgoing instrument's serial under the
  // new instrument's key — only edits made while the same instrument is
  // selected are persisted.
  const lastInstrumentRef = useRef<string>(formData.testEquipmentModel || '');
  useEffect(() => {
    const make = formData.testEquipmentModel;
    if (make !== lastInstrumentRef.current) {
      lastInstrumentRef.current = make || '';
      return;
    }
    if (!make || make === 'other') return;

    const serial = formData.testEquipmentSerial;
    const calibration = formData.testEquipmentCalDate;
    if (!serial) return;

    const timer = setTimeout(async () => {
      try {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        await offlineStorage.saveInstrumentDetails(make, {
          serialNumber: serial,
          calibrationDate: calibration || '',
        });
      } catch (e) {
        console.error('Failed to save instrument details', e);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.testEquipmentSerial, formData.testEquipmentCalDate, formData.testEquipmentModel]);

  // Save instrument to recent list and load its details
  const handleInstrumentSelect = async (value: string) => {
    onUpdate('testEquipmentModel', value);

    if (value && value !== 'other') {
      const savedInstrument = savedInstruments.find((i) => i.value === value);
      if (savedInstrument) {
        // Always refill — never leave the previous instrument's serial behind.
        onUpdate('testEquipmentSerial', savedInstrument.serialNumber || '');
        onUpdate('testEquipmentCalDate', savedInstrument.calibrationDate || '');
        return;
      }

      const updated = [value, ...recentInstruments.filter((i) => i !== value)].slice(0, 3);
      setRecentInstruments(updated);

      try {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        await offlineStorage.saveRecentInstrument(value);
      } catch (e) {
        console.error('Failed to save recent instrument', e);
      }

      loadInstrumentDetails(value);
    }
  };

  // Build options list with saved instruments from Business Settings at top
  const instrumentOptions = useMemo(() => {
    const savedOptions = savedInstruments.map((instrument) => ({
      value: instrument.value,
      label: instrument.label,
      description: 'From Business Settings',
    }));

    const recentOptions = recentInstruments
      .filter((instrument) => !savedInstruments.some((s) => s.value === instrument))
      .map((instrument) => ({
        value: instrument,
        label: instrument,
        description: 'Recently used',
      }));

    const allUsed = [...savedInstruments.map((s) => s.value), ...recentInstruments];
    const mainOptions = TEST_EQUIPMENT.filter((opt) => !allUsed.includes(opt.value));

    return [...savedOptions, ...recentOptions, ...mainOptions];
  }, [recentInstruments, savedInstruments]);

  // Auto-calculate max Zs from protective device details (skipped when sparky has manually overridden).
  // RCD-aware: on a TT install disconnection relies on the RCD, so the limit is
  // 50/IΔn (Reg 411.5.3) — NOT the TN overcurrent device tables. TN circuits go
  // through getMaxZsWithRcd (Table 41.x first, standalone-RCD 50/IΔn fallback),
  // matching the EIC schedule of testing.
  const [zsLimitSource, setZsLimitSource] = useState<'rcd' | 'overcurrent'>('overcurrent');
  useEffect(() => {
    if (zsManualOverride) return;
    const bsEn = formData.overcurrentDeviceBsEn || formData.bsEnStandard || '';
    const deviceType = formData.protectiveDeviceType || '';
    const rating = formData.protectiveDeviceRating || '';
    const isTT = formData.earthingArrangement === 'TT';

    if (!isTT && !(bsEn && rating)) return;

    import('@/utils/zsCalculations').then(({ getMaxZsWithRcd, getRcdMaxZs }) => {
      // Extract curve from device type (e.g., 'mcb-type-b' → 'B')
      const curve = deviceType.includes('type-b') ? 'B'
        : deviceType.includes('type-c') ? 'C'
        : deviceType.includes('type-d') ? 'D'
        : 'B';
      let maxZs: number | null = null;
      let source: 'rcd' | 'overcurrent' = 'overcurrent';
      if (isTT) {
        maxZs = getRcdMaxZs(formData.rcdIdn || formData.rcdRating || '30');
        source = 'rcd';
      } else {
        const lookup = getMaxZsWithRcd({
          bsStandard: bsEn,
          curve,
          rating,
          rcdRating:
            formData.protectionRcd || formData.protectionRcbo
              ? formData.rcdRating || formData.rcdIdn || null
              : null,
          rcdType: formData.rcdType || null,
          protectiveDeviceType: deviceType,
        });
        maxZs = lookup.maxZs;
        source = lookup.source === 'rcd' ? 'rcd' : 'overcurrent';
      }
      if (maxZs !== null) {
        setZsLimitSource(source);
        if (String(maxZs) !== formData.maxPermittedZs) {
          onUpdate('maxPermittedZs', String(maxZs));
        }
      }
    }).catch(() => {});
  }, [
    formData.overcurrentDeviceBsEn,
    formData.bsEnStandard,
    formData.protectiveDeviceType,
    formData.protectiveDeviceRating,
    formData.earthingArrangement,
    formData.rcdIdn,
    formData.rcdRating,
    formData.rcdType,
    formData.protectionRcd,
    formData.protectionRcbo,
    zsManualOverride,
  ]);

  // Reg ref for Zs verdicts: RCD-governed limits (TT installs, standalone
  // RCDs) cite Reg 411.5.3; overcurrent-device limits cite Reg 411.4.5.
  const zsRegRef =
    formData.earthingArrangement === 'TT' || zsLimitSource === 'rcd' ? '411.5.3' : '411.4.5';

  // Zs auto-calc from Ze + R1+R2 (EV cert parity). Cold-measured R1+R2 is
  // corrected to operating temperature with the 1.2 factor (NOTE 2 to Tables
  // 41.2-41.4 — tabulated Zs applies at Table 52.2 operating temperature)
  // unless toggled off. Only an empty field or our own previous auto-fill is
  // ever overwritten — a loaded cert's saved Zs and any typed/keypad entry win.
  const [zsTempCorrection, setZsTempCorrection] = useState(true);
  const lastAutoZsRef = useRef<string | null>(null);
  const zsFromZe = useMemo(() => {
    const ze = parseFloat(formData.externalImpedance);
    const r1r2 = parseFloat(formData.continuityR1R2);
    if (isNaN(ze) || isNaN(r1r2) || ze <= 0 || r1r2 <= 0) return null;
    const factor = zsTempCorrection ? 1.2 : 1.0;
    return (Math.round((ze + r1r2 * factor) * 100) / 100).toFixed(2);
  }, [formData.externalImpedance, formData.continuityR1R2, zsTempCorrection]);
  useEffect(() => {
    if (!zsFromZe) return;
    const current = (formData.earthFaultLoopImpedance as string) || '';
    if (current === zsFromZe) {
      lastAutoZsRef.current = zsFromZe;
      return;
    }
    if (current === '' || current === lastAutoZsRef.current) {
      lastAutoZsRef.current = zsFromZe;
      onUpdate('earthFaultLoopImpedance', zsFromZe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zsFromZe, formData.earthFaultLoopImpedance]);

  // Check if Zs is within limits
  const isZsValid = () => {
    if (!formData.earthFaultLoopImpedance || !formData.maxPermittedZs) return null;
    const measured = parseFloat(formData.earthFaultLoopImpedance);
    const max = parseFloat(formData.maxPermittedZs);
    if (isNaN(measured) || isNaN(max)) return null;
    return measured <= max;
  };

  const zsValidation = isZsValid();

  // Zs margin calculation (percentage headroom)
  const zsMargin = useMemo(() => {
    if (!formData.earthFaultLoopImpedance || !formData.maxPermittedZs) return null;
    const measured = parseFloat(formData.earthFaultLoopImpedance);
    const max = parseFloat(formData.maxPermittedZs);
    if (isNaN(measured) || isNaN(max) || max === 0) return null;
    const margin = max - measured;
    const percent = (margin / max) * 100;
    return { margin: Math.round(margin * 100) / 100, percent: Math.round(percent) };
  }, [formData.earthFaultLoopImpedance, formData.maxPermittedZs]);

  // PFC vs kA breaking capacity check (Reg 434.5.1)
  const pfcKaCheck = useMemo(() => {
    if (!formData.prospectiveFaultCurrent || !formData.protectiveDeviceKaRating) return null;
    const pfc = parseFloat(formData.prospectiveFaultCurrent);
    const ka = parseFloat(formData.protectiveDeviceKaRating);
    if (isNaN(pfc) || isNaN(ka)) return null;
    return { pass: pfc <= ka, pfc, ka };
  }, [formData.prospectiveFaultCurrent, formData.protectiveDeviceKaRating]);

  // RA x IDn <= 50V check for TT systems (Reg 411.5.3)
  const raIdnResult = useMemo(() => {
    if (formData.earthingArrangement !== 'TT') return null;
    if (!formData.earthElectrodeResistance) return null;
    const ra = parseFloat(formData.earthElectrodeResistance);
    if (isNaN(ra)) return null;
    const idn = parseFloat(formData.rcdIdn || '30');
    if (isNaN(idn)) return null;
    const touchVoltage = ra * (idn / 1000);
    return { pass: touchVoltage <= 50, touchVoltage: Math.round(touchVoltage * 100) / 100 };
  }, [formData.earthingArrangement, formData.earthElectrodeResistance, formData.rcdIdn]);

  const raIdnCheck = raIdnResult?.pass ?? null;
  const raIdnValue = raIdnResult?.touchVoltage ?? 0;

  // Minimum insulation resistance follows the selected test voltage —
  // BS 7671 Table 64: 0.5 MΩ at 250V (SELV/PELV), 1.0 MΩ at 500V/1000V.
  const insulationMin = formData.insulationTestVoltage === '250V' ? 0.5 : 1;

  // Check insulation resistance values — handles infinite readings (>999, inf)
  const checkInsulationValue = (value: string) => {
    if (!value) return null;
    const trimmed = value.trim();
    if (/^>\s*\d+/.test(trimmed) || trimmed === '∞' || trimmed.toLowerCase() === 'infinity') {
      return true;
    }
    const num = parseFloat(trimmed);
    if (isNaN(num)) return null;
    return num >= insulationMin; // Table 64 minimum per BS 7671 Reg 643.3
  };

  // Calibration expiry helper
  const calibrationStatus = useMemo(() => {
    if (!formData.testEquipmentCalDate) return null;
    const calDate = new Date(formData.testEquipmentCalDate);
    const today = new Date();
    const monthsAgo =
      (today.getFullYear() - calDate.getFullYear()) * 12 +
      (today.getMonth() - calDate.getMonth());
    return monthsAgo > 12 ? 'expired' : 'valid';
  }, [formData.testEquipmentCalDate]);

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* ── Dead testing ──────────────────────────────────────── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeading title="Dead testing" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="R1+R2 (Ω)">
            <div className="relative">
              <Input
                value={formData.continuityR1R2 || ''}
                onChange={(e) => onUpdate('continuityR1R2', e.target.value)}
                placeholder="e.g. 0.45"
                {...keypadField('continuityR1R2')}
                className={cn(inputCn, 'pr-10')}
              />
              <UnitSuffix unit="Ω" />
            </div>
          </FormField>
          <FormField label="R2 (Ω)">
            <div className="relative">
              <Input
                value={formData.r2Continuity || ''}
                onChange={(e) => onUpdate('r2Continuity', e.target.value)}
                placeholder="e.g. 0.25"
                {...keypadField('r2Continuity')}
                className={cn(inputCn, 'pr-10')}
              />
              <UnitSuffix unit="Ω" />
            </div>
          </FormField>
        </div>

        <FormField label="Polarity" required>
          <ToggleButtons
            options={[
              { value: 'correct', label: 'Correct', color: 'green' },
              { value: 'incorrect', label: 'Incorrect', color: 'red' },
            ]}
            value={formData.polarity || ''}
            onChange={(v) => onUpdate('polarity', v)}
          />
          {formData.polarity === 'correct' && (
            <span className="text-xs text-green-400 mt-1 block">Polarity confirmed</span>
          )}
          {formData.polarity === 'incorrect' && (
            <span className="text-xs text-red-400 mt-1 block">
              Polarity fault — must be corrected
            </span>
          )}
        </FormField>

        {/* Ring Circuit Continuity - shown only for ring circuits */}
        {formData.circuitType === 'ring' && (
          <div className="space-y-4">
            <SubHeading title="Ring circuit continuity" />

            <span className="text-[12px] font-medium text-white block">End to end</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
              {[
                { label: 'r₁ (L)', field: 'ringR1', placeholder: '0.52' },
                { label: 'rₙ (N)', field: 'ringRn', placeholder: '0.52' },
                { label: 'r₂ (CPC)', field: 'ringR2', placeholder: '0.87' },
              ].map(({ label, field, placeholder }) => (
                <FormField key={field} label={label}>
                  <div className="relative">
                    <Input
                      value={formData[field] || ''}
                      onChange={(e) => onUpdate(field, e.target.value)}
                      placeholder={placeholder}
                      {...keypadField(field)}
                      className={cn(inputCn, 'pr-8')}
                    />
                    <UnitSuffix unit="Ω" />
                  </div>
                </FormField>
              ))}
            </div>

            <FormField label="R₁+R₂ (ring final)">
              <div className="relative">
                <Input
                  value={formData.ringFinalContinuity || ''}
                  onChange={(e) => onUpdate('ringFinalContinuity', e.target.value)}
                  placeholder="0.69"
                  {...keypadField('ringFinalContinuity')}
                  className={cn(inputCn, 'pr-8')}
                />
                <UnitSuffix unit="Ω" />
              </div>
            </FormField>

            {/* Cross-connect readings — optional, hidden by default */}
            <button
              type="button"
              onClick={() => setShowCrossConnect((v) => !v)}
              className="w-full h-11 rounded-xl text-sm font-medium bg-white/[0.06] border border-white/[0.12] text-white touch-manipulation active:scale-[0.98]"
            >
              {showCrossConnect ? 'Hide cross-connect readings' : 'Show cross-connect readings (optional)'}
            </button>

            {showCrossConnect && (
              <>
                <span className="text-[12px] font-medium text-white block">Cross-connect</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                  {[
                    { label: 'r₁ (L)', field: 'ringR1Cross', placeholder: '0.26' },
                    { label: 'rₙ (N)', field: 'ringRnCross', placeholder: '0.26' },
                    { label: 'r₂ (CPC)', field: 'ringR2Cross', placeholder: '0.43' },
                  ].map(({ label, field, placeholder }) => (
                    <FormField key={field} label={label}>
                      <div className="relative">
                        <Input
                          value={formData[field] || ''}
                          onChange={(e) => onUpdate(field, e.target.value)}
                          placeholder={placeholder}
                          {...keypadField(field)}
                          className={cn(inputCn, 'pr-8')}
                        />
                        <UnitSuffix unit="Ω" />
                      </div>
                    </FormField>
                  ))}
                </div>
              </>
            )}
          </div>
        )}


        <FormField label="Test voltage">
          <ToggleButtons
            options={INSULATION_TEST_VOLTAGES.map((v) => ({
              value: v.value,
              label: v.value,
            }))}
            value={formData.insulationTestVoltage || '500V'}
            onChange={(v) => onUpdate('insulationTestVoltage', v)}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {[
            // A4:2026 MEIWC model form: single-phase L-N reading IS the "Live-Live" column (ELE-1228)
            { field: 'insulationLiveNeutral', label: (formData.supplyPhases === '3' || formData.supplyPhases === 'Three') ? 'L-N (MΩ)' : 'L-L (MΩ)' },
            { field: 'insulationLiveEarth', label: 'L-E (MΩ)' },
            // Explicit L-L only applicable to 3-phase
            ...(formData.supplyPhases === '3' || formData.supplyPhases === 'Three'
              ? [{ field: 'insulationLiveLive', label: 'L-L (MΩ)' }]
              : []),
          ].map(({ field, label }) => {
            const isValid = checkInsulationValue(formData[field]);
            const isInfinite = formData[field] === '>999' || formData[field] === '∞';
            return (
              <FormField key={field} label={label}>
                <div className="flex gap-2">
                  <Input
                    value={formData[field] || ''}
                    onChange={(e) => onUpdate(field, e.target.value)}
                    placeholder={`≥${insulationMin}MΩ`}
                    {...keypadField(field)}
                    className={cn(
                      inputCn,
                      'flex-1',
                      isValid === true && 'border-green-500/50',
                      isValid === false && 'border-red-500/50'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => onUpdate(field, '>999')}
                    className={cn(
                      'h-11 w-11 rounded-xl border text-base font-semibold touch-manipulation active:scale-[0.97] transition-all shrink-0',
                      isInfinite
                        ? 'bg-green-500 border-green-500 text-black'
                        : 'bg-white/[0.06] border-white/[0.12] text-white'
                    )}
                    aria-label="Set to infinite (no leakage)"
                  >
                    ∞
                  </button>
                </div>
                {isValid === true && (
                  <span className="text-xs text-green-400 mt-0.5 block">Pass</span>
                )}
                {isValid === false && (
                  <span className="text-xs text-red-400 mt-0.5 block">Below {insulationMin}MΩ</span>
                )}
              </FormField>
            );
          })}
        </div>
      </div>

      {/* ── Live testing ──────────────────────────────────────── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeading title="Live testing" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Zs (Ω)" required>
            <div className="relative">
              <Input
                value={formData.earthFaultLoopImpedance || ''}
                onChange={(e) => onUpdate('earthFaultLoopImpedance', e.target.value)}
                placeholder="e.g. 0.85"
                {...keypadField('earthFaultLoopImpedance')}
                className={cn(
                  inputCn,
                  'pr-10',
                  zsValidation === true && 'border-green-500/50',
                  zsValidation === false && 'border-red-500/50'
                )}
              />
              <UnitSuffix unit="Ω" />
            </div>
            {zsFromZe && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-white/85">
                  Ze {formData.externalImpedance} + (R1+R2 {formData.continuityR1R2}
                  {zsTempCorrection ? ' × 1.2' : ''}) = {zsFromZe} Ω
                </span>
                {(formData.earthFaultLoopImpedance || '') !== zsFromZe && (
                  <button
                    type="button"
                    onClick={() => {
                      lastAutoZsRef.current = zsFromZe;
                      onUpdate('earthFaultLoopImpedance', zsFromZe);
                    }}
                    className="h-11 px-3 rounded-xl bg-elec-yellow border border-elec-yellow text-black text-xs font-semibold touch-manipulation active:scale-[0.97] transition-all"
                  >
                    Use {zsFromZe}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setZsTempCorrection((v) => !v)}
                  aria-pressed={zsTempCorrection}
                  className={cn(
                    'h-11 px-3 rounded-xl border text-xs font-semibold touch-manipulation active:scale-[0.97] transition-all',
                    zsTempCorrection
                      ? 'bg-elec-yellow border-elec-yellow text-black'
                      : 'bg-white/[0.06] border-white/[0.12] text-white'
                  )}
                >
                  1.2 temp factor
                </button>
              </div>
            )}
          </FormField>
          <FormField
            label="Max permitted Zs"
            hint={zsManualOverride ? 'Manual override' : 'Auto-calculated'}
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={formData.maxPermittedZs || ''}
                  onChange={(e) => zsManualOverride && onUpdate('maxPermittedZs', e.target.value)}
                  readOnly={!zsManualOverride}
                  placeholder={zsManualOverride ? 'Enter Ω' : 'Auto'}
                  inputMode="decimal"
                  className={cn(
                    inputCn,
                    'pr-8',
                    !zsManualOverride && 'cursor-not-allowed opacity-60'
                  )}
                />
                <UnitSuffix unit="Ω" />
              </div>
              <button
                type="button"
                onClick={() => setZsManualOverride((v) => !v)}
                className={cn(
                  'h-11 px-2.5 rounded-xl border text-xs font-semibold touch-manipulation active:scale-[0.97] transition-all shrink-0',
                  zsManualOverride
                    ? 'bg-elec-yellow border-elec-yellow text-black'
                    : 'bg-white/[0.06] border-white/[0.12] text-white'
                )}
              >
                {zsManualOverride ? 'Auto' : 'Manual'}
              </button>
            </div>
          </FormField>
        </div>

        {zsValidation !== null && (
          <div
            className={cn(
              'rounded-xl bg-white/[0.05] px-3.5 py-3 text-xs',
              zsValidation === false
                ? 'text-red-400'
                : zsMargin && zsMargin.percent < 20
                  ? 'text-amber-400'
                  : 'text-green-400'
            )}
          >
            {zsValidation === false
              ? `Zs ${formData.earthFaultLoopImpedance}Ω exceeds max ${formData.maxPermittedZs}Ω — disconnection time not met (Reg ${zsRegRef})`
              : zsMargin
                ? zsMargin.percent < 20
                  ? `Zs ${formData.earthFaultLoopImpedance}Ω vs max ${formData.maxPermittedZs}Ω — only ${zsMargin.percent}% margin. Consider temperature rise`
                  : `Zs ${formData.earthFaultLoopImpedance}Ω vs max ${formData.maxPermittedZs}Ω — ${zsMargin.percent}% margin`
                : 'Zs is within acceptable limits'}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Ipf (kA)" required>
            <Input
              value={formData.prospectiveFaultCurrent || ''}
              onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
              placeholder="e.g. 2.5"
              {...keypadField('prospectiveFaultCurrent')}
              className={cn(
                inputCn,
                pfcKaCheck?.pass === true && 'border-green-500/50',
                pfcKaCheck?.pass === false && 'border-red-500/50'
              )}
            />
            {pfcKaCheck?.pass === true && (
              <span className="text-xs text-green-400 mt-0.5 block">
                Ipf {pfcKaCheck.pfc}kA ≤ {pfcKaCheck.ka}kA breaking capacity
              </span>
            )}
            {pfcKaCheck?.pass === false && (
              <span className="text-xs text-red-400 mt-0.5 block">
                Ipf {pfcKaCheck.pfc}kA exceeds {pfcKaCheck.ka}kA (Reg 434.5.1)
              </span>
            )}
            {!formData.protectiveDeviceKaRating && formData.prospectiveFaultCurrent && (
              <span className="text-xs text-amber-400 mt-0.5 block">
                Set breaking capacity (kA) on Circuit tab to verify
              </span>
            )}
          </FormField>
          <FormField label="Ze (Ω)">
            <div className="relative">
              <Input
                value={formData.externalImpedance || ''}
                onChange={(e) => onUpdate('externalImpedance', e.target.value)}
                placeholder="e.g. 0.35"
                {...keypadField('externalImpedance')}
                className={cn(inputCn, 'pr-10')}
              />
              <UnitSuffix unit="Ω" />
            </div>
          </FormField>
        </div>

        <FormField label="Functional testing">
          <ToggleButtons
            options={[
              { value: 'pass', label: 'Pass', color: 'green' },
              { value: 'fail', label: 'Fail', color: 'red' },
              { value: 'na', label: 'N/A', color: 'amber' },
            ]}
            value={formData.functionalTesting || ''}
            onChange={(v) => onUpdate('functionalTesting', v)}
          />
          {formData.functionalTesting && formData.functionalTesting !== 'na' && (
            <Input
              value={formData.functionalTestingNotes || ''}
              onChange={(e) => onUpdate('functionalTestingNotes', e.target.value)}
              placeholder="What was tested? (e.g. RCD trip, switch operation, isolator)"
              className={cn(inputCn, 'mt-2')}
            />
          )}
        </FormField>

        {/* Phase Rotation - only for 3-phase supplies */}
        {(formData.supplyPhases === '3' || formData.supplyPhases === 'Three') && (
          <FormField label="Phase rotation">
            <ToggleButtons
              options={[
                { value: 'clockwise', label: 'CW (L1-L2-L3)' },
                { value: 'anti-clockwise', label: 'ACW (L1-L3-L2)' },
              ]}
              value={formData.phaseRotation || ''}
              onChange={(v) => onUpdate('phaseRotation', v)}
            />
          </FormField>
        )}
      </div>

      {/* ── RCD testing ───────────────────────────────────────── */}
      {(formData.protectionRcd ||
        formData.protectionRcbo ||
        formData.protectionAfdd ||
        formData.protectionSpd) && (
        <div className={cn(cardCn, 'lg:col-span-2')}>
          <SectionHeading title="RCD testing" />

          <div className="space-y-4">
            {/* RCD/RCBO Testing */}
            {(formData.protectionRcd || formData.protectionRcbo) && (
              <div className="space-y-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <FormField label="RCD type">
                    <MobileSelectPicker
                      options={RCD_TYPES}
                      value={formData.rcdType || ''}
                      onValueChange={(v) => onUpdate('rcdType', v)}
                      placeholder="Select type"
                      title="RCD Type"
                      triggerClassName={pickerTriggerCn}
                    />
                  </FormField>
                  <FormField label="Rating (mA)">
                    <MobileSelectPicker
                      options={RCD_RATINGS}
                      value={formData.rcdRating || ''}
                      onValueChange={(v) => onUpdate('rcdRating', v)}
                      placeholder="Select"
                      title="RCD Rating"
                      triggerClassName={pickerTriggerCn}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                  <FormField label="1x IΔn (ms)" hint="<300ms">
                    <div className="relative">
                      <Input
                        value={formData.rcdOneX || ''}
                        onChange={(e) => onUpdate('rcdOneX', e.target.value)}
                        placeholder="<300"
                        {...keypadField('rcdOneX')}
                        className={cn(
                          inputCn,
                          'pr-10',
                          formData.rcdOneX &&
                            parseFloat(formData.rcdOneX) <= 300 &&
                            'border-green-500/50',
                          formData.rcdOneX &&
                            parseFloat(formData.rcdOneX) > 300 &&
                            'border-red-500/50'
                        )}
                      />
                      <UnitSuffix unit="ms" />
                    </div>
                    {formData.rcdOneX && parseFloat(formData.rcdOneX) <= 300 && (
                      <span className="text-xs text-green-400 block">Pass</span>
                    )}
                    {formData.rcdOneX && parseFloat(formData.rcdOneX) > 300 && (
                      <span className="text-xs text-red-400 block">Exceeds 300ms</span>
                    )}
                  </FormField>
                  <FormField label="5x IΔn (ms)" hint="<40ms">
                    <div className="relative">
                      <Input
                        value={formData.rcdFiveX || ''}
                        onChange={(e) => onUpdate('rcdFiveX', e.target.value)}
                        {...keypadField('rcdFiveX')}
                        placeholder="<40"
                        className={cn(
                          inputCn,
                          'pr-10',
                          formData.rcdFiveX &&
                            parseFloat(formData.rcdFiveX) <= 40 &&
                            'border-green-500/50',
                          formData.rcdFiveX &&
                            parseFloat(formData.rcdFiveX) > 40 &&
                            'border-red-500/50'
                        )}
                      />
                      <UnitSuffix unit="ms" />
                    </div>
                    {formData.rcdFiveX && parseFloat(formData.rcdFiveX) <= 40 && (
                      <span className="text-xs text-green-400 block">Pass</span>
                    )}
                  </FormField>
                  <FormField label="½x IΔn">
                    <ToggleButtons
                      options={[
                        { value: 'pass', label: 'Pass', color: 'green' },
                        { value: 'fail', label: 'Fail', color: 'red' },
                      ]}
                      value={formData.rcdHalfX || ''}
                      onChange={(v) => onUpdate('rcdHalfX', v)}
                    />
                  </FormField>
                </div>

                <FormField label="Test button">
                  <ToggleButtons
                    options={[
                      { value: 'pass', label: 'Pass', color: 'green' },
                      { value: 'fail', label: 'Fail', color: 'red' },
                    ]}
                    value={formData.rcdTestButton || ''}
                    onChange={(v) => onUpdate('rcdTestButton', v)}
                  />
                </FormField>

                {/* RCBO Trip Time - only when RCBO fitted */}
                {formData.protectionRcbo && (
                  <FormField label="RCBO trip time (ms)">
                    <div className="relative">
                      <Input
                        value={formData.rcboTripTime || ''}
                        onChange={(e) => onUpdate('rcboTripTime', e.target.value)}
                        {...keypadField('rcboTripTime')}
                        placeholder="e.g. 18"
                        className={cn(inputCn, 'pr-10')}
                      />
                      <UnitSuffix unit="ms" />
                    </div>
                  </FormField>
                )}
              </div>
            )}

            {/* AFDD Testing */}
            {formData.protectionAfdd && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <FormField label="Test button">
                    <ToggleButtons
                      options={[
                        { value: 'pass', label: 'Pass', color: 'green' },
                        { value: 'fail', label: 'Fail', color: 'red' },
                      ]}
                      value={formData.afddTestButton || ''}
                      onChange={(v) => onUpdate('afddTestButton', v)}
                    />
                  </FormField>
                  <FormField label="Trip time (ms)">
                    <div className="relative">
                      <Input
                        value={formData.afddTripTime || ''}
                        onChange={(e) => onUpdate('afddTripTime', e.target.value)}
                        placeholder="e.g. 30"
                        {...keypadField('afddTripTime')}
                        className={cn(inputCn, 'pr-10')}
                      />
                      <UnitSuffix unit="ms" />
                    </div>
                  </FormField>
                </div>
                <span className="text-[11px] text-white/85 block">
                  Note: not all AFDDs have a test button
                </span>
              </div>
            )}

            {/* SPD Testing */}
            {formData.protectionSpd && (
              <div className="space-y-4">
                <FormField label="Indicator status">
                  <ToggleButtons
                    options={[
                      { value: 'green', label: 'Green (OK)', color: 'green' },
                      { value: 'red', label: 'Red (Replace)', color: 'red' },
                      { value: 'na', label: 'N/A', color: 'amber' },
                    ]}
                    value={formData.spdIndicatorStatus || ''}
                    onChange={(v) => onUpdate('spdIndicatorStatus', v)}
                  />
                </FormField>
                <FormField label="Visual inspection">
                  <ToggleButtons
                    options={[
                      { value: 'satisfactory', label: 'Satisfactory', color: 'green' },
                      { value: 'unsatisfactory', label: 'Unsatisfactory', color: 'red' },
                    ]}
                    value={formData.spdVisualInspection || ''}
                    onChange={(v) => onUpdate('spdVisualInspection', v)}
                  />
                </FormField>
                <label className="flex min-h-11 items-center gap-3 rounded-xl bg-white/[0.05] p-3 cursor-pointer touch-manipulation">
                  <Checkbox
                    id="spdTestButton"
                    checked={formData.spdTestButton || false}
                    onCheckedChange={(c) => onUpdate('spdTestButton', c)}
                    className="h-6 w-6 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 touch-manipulation"
                  />
                  <span className="text-sm text-white">
                    SPD test button operates correctly
                  </span>
                </label>
                <span className="text-[11px] text-white/85 block">
                  Note: not all SPDs have visible functionality indication
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Earth electrode (TT only) ─────────────────────────── */}
      {formData.earthingArrangement === 'TT' && (
        <div className={cn(cardCn, 'lg:col-span-2')}>
          <SectionHeading title="Earth electrode" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="RA (Ω)" required hint="Required for TT (Reg 411.5.3)">
              <div className="relative">
                <Input
                  value={formData.earthElectrodeResistance || ''}
                  onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                  placeholder="e.g. 12"
                  {...keypadField('earthElectrodeResistance')}
                  className={cn(
                    inputCn,
                    'pr-10',
                    raIdnCheck === true && 'border-green-500/50',
                    raIdnCheck === false && 'border-red-500/50'
                  )}
                />
                <UnitSuffix unit="Ω" />
              </div>
            </FormField>
          </div>

          {raIdnCheck !== null && (
            <div
              className={cn(
                'rounded-xl bg-white/[0.05] px-3.5 py-3 text-xs',
                raIdnCheck ? 'text-green-400' : 'text-red-400'
              )}
            >
              {raIdnCheck
                ? `RA × IΔn = ${raIdnValue}V ≤ 50V — touch voltage safe (Reg 411.5.3)`
                : `RA × IΔn = ${raIdnValue}V exceeds 50V limit — earth electrode resistance too high for ${formData.rcdIdn || '30'}mA RCD (Reg 411.5.3)`}
            </div>
          )}

          {formData.earthingArrangement === 'TT' &&
            !formData.rcdIdn &&
            formData.earthElectrodeResistance && (
              <div className="rounded-xl bg-white/[0.05] px-3.5 py-3 text-xs text-amber-400">
                Set RCD IΔn on Circuit tab to verify RA × IΔn ≤ 50V compliance
              </div>
            )}
        </div>
      )}

      {/* ── Test equipment ────────────────────────────────────── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeading title="Test equipment" />

        <button
          type="button"
          onClick={() => {
            const equipment = loadTestEquipment?.();
            if (equipment) {
              if (equipment.testEquipmentModel) onUpdate('testEquipmentModel', equipment.testEquipmentModel);
              if (equipment.testEquipmentSerial) onUpdate('testEquipmentSerial', equipment.testEquipmentSerial);
              if (equipment.testEquipmentCalDate) onUpdate('testEquipmentCalDate', equipment.testEquipmentCalDate);
            }
          }}
          className={cn(
            'w-full h-11 rounded-xl border text-sm font-medium touch-manipulation active:scale-[0.98]',
            formData.testEquipmentModel && formData.testEquipmentSerial
              ? 'bg-white/[0.06] border-white/[0.12] text-white'
              : 'bg-elec-yellow border-elec-yellow text-black font-semibold'
          )}
        >
          {formData.testEquipmentModel && formData.testEquipmentSerial
            ? 'Reload from Business Settings'
            : 'Load from Business Settings'}
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Instrument">
            <MobileSelectPicker
              options={instrumentOptions}
              value={formData.testEquipmentModel || ''}
              onValueChange={handleInstrumentSelect}
              placeholder="Select"
              title="Test Instrument"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
          <FormField label="Serial no.">
            <Input
              value={formData.testEquipmentSerial || ''}
              onChange={(e) => onUpdate('testEquipmentSerial', e.target.value)}
              placeholder="Serial number"
              className={inputCn}
            />
          </FormField>
          <FormField label="Calibration">
            <Input
              type="date"
              value={formData.testEquipmentCalDate || ''}
              onChange={(e) => onUpdate('testEquipmentCalDate', e.target.value)}
              className={inputCn}
            />
          </FormField>
          <FormField label="Temp (°C)">
            <Input
              value={formData.testTemperature || '20°C'}
              onChange={(e) => onUpdate('testTemperature', e.target.value)}
              placeholder="20°C"
              className={inputCn}
            />
          </FormField>
        </div>

        {calibrationStatus === 'expired' && (
          <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
            <p className="text-xs font-semibold text-red-400">Calibration expired</p>
            <p className="text-xs text-white/85 mt-0.5">
              Test equipment must be calibrated within the last 12 months. This certificate may not be valid.
            </p>
          </div>
        )}
      </div>

      {/* Spacer while the keypad is up — lets the last readings scroll clear
          of the fixed panel (~290px), which the page's own bottom padding
          cannot cover. */}
      {coarsePointer && activeKeypad && (
        <div aria-hidden="true" className="h-72 lg:col-span-2" />
      )}

      {/* Reading keypad — touch devices only. Verdicts reuse the tab's own checks. */}
      {coarsePointer && activeKeypad && (() => {
        const meta = KEYPAD_META[activeKeypad];
        if (!meta) return null;
        const reading =
          activeKeypad === 'insulationLiveNeutral' && threePhaseSupply
            ? { ...meta, label: 'Insulation L-N' }
            : meta;
        const raw = (formData[activeKeypad] as string) || '';
        let status: KeypadStatus | null = null;
        let hint: string | undefined;
        if (
          activeKeypad === 'insulationLiveNeutral' ||
          activeKeypad === 'insulationLiveEarth' ||
          activeKeypad === 'insulationLiveLive'
        ) {
          const ok = checkInsulationValue(raw);
          if (ok === true) status = { tone: 'pass', label: `At or above the ${insulationMin} MΩ minimum (Reg 643.3)` };
          if (ok === false) status = { tone: 'check', label: `Below the ${insulationMin} MΩ minimum (Reg 643.3)` };
        } else if (activeKeypad === 'earthFaultLoopImpedance') {
          if (zsValidation === true && zsMargin)
            status = { tone: 'pass', label: `${zsMargin.percent}% margin vs max ${formData.maxPermittedZs} Ω` };
          if (zsValidation === false)
            status = { tone: 'check', label: `Exceeds max ${formData.maxPermittedZs} Ω (Reg ${zsRegRef})` };
          if (zsValidation === null) hint = formData.maxPermittedZs ? `Max permitted ${formData.maxPermittedZs} Ω` : 'Max Zs set on the Circuit tab';
        } else if (activeKeypad === 'prospectiveFaultCurrent') {
          if (pfcKaCheck?.pass === true) status = { tone: 'pass', label: `Within the ${pfcKaCheck.ka} kA device rating` };
          if (pfcKaCheck?.pass === false) status = { tone: 'check', label: `Exceeds ${pfcKaCheck.ka} kA (Reg 434.5.1)` };
        } else if (activeKeypad === 'rcdOneX' || activeKeypad === 'rcboTripTime') {
          const ms = parseFloat(raw);
          if (raw && !isNaN(ms)) status = ms <= 300
            ? { tone: 'pass', label: 'Within the 300 ms limit at 1×IΔn' }
            : { tone: 'check', label: 'Above the 300 ms limit at 1×IΔn' };
        } else if (activeKeypad === 'rcdFiveX') {
          const ms = parseFloat(raw);
          if (raw && !isNaN(ms)) status = ms <= 40
            ? { tone: 'pass', label: 'Within the 40 ms limit at 5×IΔn' }
            : { tone: 'check', label: 'Above the 40 ms limit at 5×IΔn' };
        } else if (activeKeypad === 'earthElectrodeResistance') {
          if (raIdnResult) status = raIdnResult.pass
            ? { tone: 'pass', label: `RA×IΔn = ${raIdnResult.touchVoltage} V — within 50 V (Reg 411.5.3)` }
            : { tone: 'check', label: `RA×IΔn = ${raIdnResult.touchVoltage} V — exceeds 50 V (Reg 411.5.3)` };
        } else {
          hint = 'No fixed limit — record the measured value';
        }
        const seqIx = keypadSequence.indexOf(activeKeypad);
        // Off-sequence fields advance through the DOM, so they are only "last"
        // when no visible reading follows them on the page.
        const isLast =
          seqIx === -1
            ? nextVisibleKeypadField(activeKeypad) === null
            : seqIx === keypadSequence.length - 1;
        return (
          <>
            {/* Scroll room so even the last reading on the page can rise clear
                of the keypad panel — removed the moment the keypad closes. */}
            <div className="h-[300px] lg:col-span-2" aria-hidden="true" />
            <MWReadingKeypad
              activeField={activeKeypad}
            label={reading.label}
            unit={reading.unit}
            value={raw}
            allowInfinity={!!reading.inf}
            status={status}
            hint={hint}
            isLastReading={isLast}
              onChange={(v) => onUpdate(activeKeypad, v)}
              onNext={keypadAdvance}
              onClose={() => setActiveKeypad(null)}
            />
          </>
        );
      })()}
    </div>
  );
};

export default MWTestingTab;
