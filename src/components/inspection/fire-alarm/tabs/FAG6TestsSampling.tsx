/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G6 Periodic Inspection — Tab 3: Tests & Sampling
 * Panel tests, power tests, fault simulation, device sampling
 * Same test structure as G3 but with sampling focus and no soak test
 */

import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import useReadingKeypad from '@/hooks/useReadingKeypad';

/** Numeric test readings the keypad serves — free-number inputs only. */
const KEYPAD_META = {
  batteryVoltage: { label: 'Battery voltage — standby supply', unit: 'V' },
};

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const TestResultRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex min-h-11 items-center justify-between gap-3">
    <span className="flex-1 text-sm font-medium text-white">{label}</span>
    <div className="flex gap-1.5">
      {[
        { val: 'pass', label: 'Pass', active: 'border-green-500 bg-green-500 text-black' },
        { val: 'fail', label: 'Fail', active: 'border-red-500 bg-red-500 text-white' },
        { val: 'na', label: 'N/A', active: 'border-white/40 bg-white/25 text-white' },
      ].map((opt) => (
        <button
          key={opt.val}
          type="button"
          onClick={() => onChange(opt.val)}
          className={cn(
            'h-11 min-w-[52px] rounded-xl border px-3 text-[12px] font-semibold touch-manipulation transition-all active:scale-95',
            value === opt.val ? opt.active : 'border-white/[0.12] bg-white/[0.06] text-white'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

// "Mark all pass" speed tool
const AllPassButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="h-11 w-full rounded-xl border border-green-500/30 bg-white/[0.06] text-sm font-semibold text-green-400 touch-manipulation transition-all active:scale-[0.98]"
  >
    Mark all pass
  </button>
);

// Coverage percentage tile
const CoverageBadge = ({
  tested,
  total,
  label,
}: {
  tested: number;
  total: number;
  label: string;
}) => {
  if (!tested || !total) return null;
  const pct = Math.round((tested / total) * 100);
  return (
    <div className="rounded-xl bg-white/[0.05] p-3 text-center">
      <p
        className={cn(
          'text-xl font-bold',
          pct >= 100 ? 'text-green-400' : pct >= 80 ? 'text-elec-yellow' : 'text-red-400'
        )}
      >
        {pct}%
      </p>
      <p className="text-[11px] text-white/80">{label}</p>
    </div>
  );
};

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAG6TestsSampling({ formData, onUpdate }: Props) {
  const pt = formData.panelTests || {};
  const pw = formData.powerTests || {};
  const ft = formData.faultTests || {};

  const updatePanelTest = (field: string, value: string) =>
    onUpdate('panelTests', { ...pt, [field]: value });
  const updatePowerTest = (field: string, value: string) =>
    onUpdate('powerTests', { ...pw, [field]: value });
  const updateFaultTest = (field: string, value: string) =>
    onUpdate('faultTests', { ...ft, [field]: value });

  // Reading keypad — shared MW pattern. Values flow through the existing
  // updatePowerTest path; the spread only ADDS props to the reading input.
  const keypad = useReadingKeypad({
    meta: KEYPAD_META,
    getValue: () => String(pw.batteryVoltage ?? ''),
    setValue: (_field, value) => updatePowerTest('batteryVoltage', value),
  });

  // Test summary
  const testSummary = useMemo(() => {
    const all = [
      pt.powerOnTest,
      pt.zoneIndicators,
      pt.faultIndicators,
      pt.silenceFacility,
      pt.resetFunction,
      pt.eventLog,
      pt.remoteSignalling,
      pw.mainsSupply,
      pw.batteryCondition,
      pw.chargerOperation,
      pw.standbyDuration,
      ft.openCircuit,
      ft.shortCircuit,
      ft.earthFault,
      ft.powerFail,
    ];
    const pass = all.filter((v) => v === 'pass').length;
    const fail = all.filter((v) => v === 'fail').length;
    const na = all.filter((v) => v === 'na').length;
    const total = all.length;
    const done = pass + fail + na;
    return { pass, fail, na, total, done };
  }, [pt, pw, ft]);

  // Soak test duration auto-calc
  const soakDays = useMemo(() => {
    if (!formData.soakTestStart || !formData.soakTestEnd) return null;
    return Math.round(
      (new Date(formData.soakTestEnd).getTime() - new Date(formData.soakTestStart).getTime()) /
        86400000
    );
  }, [formData.soakTestStart, formData.soakTestEnd]);

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Test summary */}
      {testSummary.done > 0 && (
        <div className={cn(cardCn, 'lg:col-span-2')}>
          <SectionHeader title="Test summary" />
          <div className="grid grid-cols-4 gap-2">
            <div className="rounded-xl bg-white/[0.05] p-3 text-center">
              <p className="text-lg font-bold text-white">
                {testSummary.done}/{testSummary.total}
              </p>
              <p className="text-[11px] text-white/80">Done</p>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3 text-center">
              <p className="text-lg font-bold text-green-400">{testSummary.pass}</p>
              <p className="text-[11px] text-white/80">Pass</p>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3 text-center">
              <p className="text-lg font-bold text-red-400">{testSummary.fail}</p>
              <p className="text-[11px] text-white/80">Fail</p>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3 text-center">
              <p className="text-lg font-bold text-white">{testSummary.na}</p>
              <p className="text-[11px] text-white/80">N/A</p>
            </div>
          </div>
        </div>
      )}

      {/* Panel tests */}
      <div className={cardCn}>
        <SectionHeader title="Control panel tests" />
        <AllPassButton
          onClick={() =>
            onUpdate('panelTests', {
              ...pt,
              powerOnTest: 'pass',
              zoneIndicators: 'pass',
              faultIndicators: 'pass',
              silenceFacility: 'pass',
              resetFunction: 'pass',
              eventLog: 'pass',
              remoteSignalling: 'pass',
            })
          }
        />
        <div className="space-y-2">
          <TestResultRow
            label="Power-on test"
            value={pt.powerOnTest || ''}
            onChange={(v) => updatePanelTest('powerOnTest', v)}
          />
          <TestResultRow
            label="Zone indicators"
            value={pt.zoneIndicators || ''}
            onChange={(v) => updatePanelTest('zoneIndicators', v)}
          />
          <TestResultRow
            label="Fault indicators"
            value={pt.faultIndicators || ''}
            onChange={(v) => updatePanelTest('faultIndicators', v)}
          />
          <TestResultRow
            label="Silence facility"
            value={pt.silenceFacility || ''}
            onChange={(v) => updatePanelTest('silenceFacility', v)}
          />
          <TestResultRow
            label="Reset function"
            value={pt.resetFunction || ''}
            onChange={(v) => updatePanelTest('resetFunction', v)}
          />
          <TestResultRow
            label="Event log"
            value={pt.eventLog || ''}
            onChange={(v) => updatePanelTest('eventLog', v)}
          />
          <TestResultRow
            label="Remote signalling"
            value={pt.remoteSignalling || ''}
            onChange={(v) => updatePanelTest('remoteSignalling', v)}
          />
        </div>
      </div>

      {/* Power tests */}
      <div className={cardCn}>
        <SectionHeader title="Power & battery tests" />
        <AllPassButton
          onClick={() =>
            onUpdate('powerTests', {
              ...pw,
              mainsSupply: 'pass',
              batteryCondition: 'pass',
              chargerOperation: 'pass',
              standbyDuration: 'pass',
            })
          }
        />
        <div className="space-y-2">
          <TestResultRow
            label="Mains supply"
            value={pw.mainsSupply || ''}
            onChange={(v) => updatePowerTest('mainsSupply', v)}
          />
          <div>
            <Label className={labelCn}>Battery voltage (V)</Label>
            <Input
              value={pw.batteryVoltage || ''}
              onChange={(e) => updatePowerTest('batteryVoltage', e.target.value)}
              inputMode="decimal"
              className={inputCn}
              placeholder="e.g. 27.6"
              {...keypad.field('batteryVoltage')}
            />
          </div>
          <TestResultRow
            label="Battery condition"
            value={pw.batteryCondition || ''}
            onChange={(v) => updatePowerTest('batteryCondition', v)}
          />
          <TestResultRow
            label="Charger operation"
            value={pw.chargerOperation || ''}
            onChange={(v) => updatePowerTest('chargerOperation', v)}
          />
          <TestResultRow
            label="Standby duration"
            value={pw.standbyDuration || ''}
            onChange={(v) => updatePowerTest('standbyDuration', v)}
          />
        </div>
      </div>

      {/* Fault simulation */}
      <div className={cardCn}>
        <SectionHeader title="Fault simulation tests" />
        <AllPassButton
          onClick={() =>
            onUpdate('faultTests', {
              ...ft,
              openCircuit: 'pass',
              shortCircuit: 'pass',
              earthFault: 'pass',
              powerFail: 'pass',
            })
          }
        />
        <div className="space-y-2">
          <TestResultRow
            label="Open circuit"
            value={ft.openCircuit || ''}
            onChange={(v) => updateFaultTest('openCircuit', v)}
          />
          <TestResultRow
            label="Short circuit"
            value={ft.shortCircuit || ''}
            onChange={(v) => updateFaultTest('shortCircuit', v)}
          />
          <TestResultRow
            label="Earth fault"
            value={ft.earthFault || ''}
            onChange={(v) => updateFaultTest('earthFault', v)}
          />
          <TestResultRow
            label="Power fail"
            value={ft.powerFail || ''}
            onChange={(v) => updateFaultTest('powerFail', v)}
          />
        </div>
      </div>

      {/* Cause & effect verification */}
      <div className={cardCn}>
        <SectionHeader title="Cause & effect verification" />
        <button
          type="button"
          onClick={() => onUpdate('causeAndEffectVerified', !formData.causeAndEffectVerified)}
          className={cn(
            'flex min-h-11 w-full items-center rounded-xl border px-3.5 py-3 text-left text-sm touch-manipulation transition-all active:scale-[0.98]',
            formData.causeAndEffectVerified
              ? 'border-green-500 bg-green-500 font-semibold text-black'
              : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
          )}
        >
          Cause & effect matrix verified — all outputs respond correctly
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn}>C&E reference</Label>
            <Input
              value={formData.causeAndEffectRef || ''}
              onChange={(e) => onUpdate('causeAndEffectRef', e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <Label className={labelCn}>Verification date</Label>
            <Input
              type="date"
              value={formData.causeAndEffectDate || ''}
              onChange={(e) => onUpdate('causeAndEffectDate', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
      </div>

      {/* Soak test */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Soak test" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn}>Start date</Label>
            <Input
              type="date"
              value={formData.soakTestStart || ''}
              onChange={(e) => onUpdate('soakTestStart', e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <Label className={labelCn}>End date</Label>
            <Input
              type="date"
              value={formData.soakTestEnd || ''}
              onChange={(e) => onUpdate('soakTestEnd', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn}>Duration</Label>
            <Input
              value={formData.soakTestDuration || ''}
              onChange={(e) => onUpdate('soakTestDuration', e.target.value)}
              className={inputCn}
              placeholder={soakDays !== null ? `${soakDays} days (auto-calculated)` : 'e.g. 7 days'}
            />
            {soakDays !== null && !formData.soakTestDuration && (
              <p className="mt-1 text-[11px] text-white/80">{soakDays} days calculated from dates</p>
            )}
            {soakDays !== null && soakDays < 7 && (
              <p className="mt-1 text-[11px] text-amber-400">
                BS 5839-1 recommends minimum 7 days soak
              </p>
            )}
          </div>
          <TestResultRow
            label="Result"
            value={formData.soakTestResult || ''}
            onChange={(v) => onUpdate('soakTestResult', v)}
          />
        </div>
        <div>
          <Label className={labelCn}>Soak test notes</Label>
          <Textarea
            value={formData.soakTestNotes || ''}
            onChange={(e) => onUpdate('soakTestNotes', e.target.value)}
            className={textareaCn}
            placeholder="Any issues during soak period..."
          />
        </div>
      </div>

      {/* Device function testing */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Device function testing" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn}>Detectors tested</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                inputMode="numeric"
                value={formData.detectorsTestedCount || ''}
                onChange={(e) => onUpdate('detectorsTestedCount', e.target.value)}
                className={inputCn}
                placeholder="Tested"
              />
              <span className="flex items-center text-sm text-white/80">/</span>
              <Input
                type="number"
                inputMode="numeric"
                value={formData.detectorsTotalCount || ''}
                onChange={(e) => onUpdate('detectorsTotalCount', e.target.value)}
                className={inputCn}
                placeholder="Total"
              />
            </div>
          </div>
          <div>
            <Label className={labelCn}>Call points tested</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                inputMode="numeric"
                value={formData.callPointsTestedCount || ''}
                onChange={(e) => onUpdate('callPointsTestedCount', e.target.value)}
                className={inputCn}
                placeholder="Tested"
              />
              <span className="flex items-center text-sm text-white/80">/</span>
              <Input
                type="number"
                inputMode="numeric"
                value={formData.callPointsTotalCount || ''}
                onChange={(e) => onUpdate('callPointsTotalCount', e.target.value)}
                className={inputCn}
                placeholder="Total"
              />
            </div>
          </div>
          <div>
            <Label className={labelCn}>Sounders verified</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                inputMode="numeric"
                value={formData.soundersTestedCount || ''}
                onChange={(e) => onUpdate('soundersTestedCount', e.target.value)}
                className={inputCn}
                placeholder="Tested"
              />
              <span className="flex items-center text-sm text-white/80">/</span>
              <Input
                type="number"
                inputMode="numeric"
                value={formData.soundersTotalCount || ''}
                onChange={(e) => onUpdate('soundersTotalCount', e.target.value)}
                className={inputCn}
                placeholder="Total"
              />
            </div>
          </div>
          <div>
            <Label className={labelCn}>Interfaces verified</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                inputMode="numeric"
                value={formData.interfacesTestedCount || ''}
                onChange={(e) => onUpdate('interfacesTestedCount', e.target.value)}
                className={inputCn}
                placeholder="Tested"
              />
              <span className="flex items-center text-sm text-white/80">/</span>
              <Input
                type="number"
                inputMode="numeric"
                value={formData.interfacesTotalCount || ''}
                onChange={(e) => onUpdate('interfacesTotalCount', e.target.value)}
                className={inputCn}
                placeholder="Total"
              />
            </div>
          </div>
        </div>
        {/* Coverage percentages for all 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <CoverageBadge
            tested={parseInt(formData.detectorsTestedCount || '0')}
            total={parseInt(formData.detectorsTotalCount || '0')}
            label="Detectors"
          />
          <CoverageBadge
            tested={parseInt(formData.callPointsTestedCount || '0')}
            total={parseInt(formData.callPointsTotalCount || '0')}
            label="Call points"
          />
          <CoverageBadge
            tested={parseInt(formData.soundersTestedCount || '0')}
            total={parseInt(formData.soundersTotalCount || '0')}
            label="Sounders"
          />
          <CoverageBadge
            tested={parseInt(formData.interfacesTestedCount || '0')}
            total={parseInt(formData.interfacesTotalCount || '0')}
            label="Interfaces"
          />
        </div>
        {/* Annual sampling message */}
        {(() => {
          const detPct =
            parseInt(formData.detectorsTotalCount || '0') > 0
              ? Math.round(
                  (parseInt(formData.detectorsTestedCount || '0') /
                    parseInt(formData.detectorsTotalCount || '0')) *
                    100
                )
              : 0;
          if (detPct > 0 && detPct < 100) {
            return (
              <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] px-3.5 py-3">
                <p className="text-sm text-amber-400">
                  You tested {detPct}% of detectors this visit. The remaining {100 - detPct}% must
                  be tested within the next 6 months to meet annual 100% coverage (BS 5839-1:2025).
                </p>
              </div>
            );
          }
          if (detPct >= 100) {
            return (
              <div className="rounded-xl border border-green-500/30 bg-white/[0.05] px-3.5 py-3">
                <p className="text-sm text-green-400">
                  100% detector coverage achieved this visit.
                </p>
              </div>
            );
          }
          return null;
        })()}

        {/* Which devices, specifically — assessors want the list, not a percentage */}
        <div>
          <div className="flex items-center justify-between">
            <Label className="text-[12px] font-medium text-white block">
              Devices tested this visit
            </Label>
            <button
              type="button"
              onClick={() => {
                const list = Array.isArray(formData.sampledDevices) ? formData.sampledDevices : [];
                // result starts UNSET — a sampled device the engineer adds and does not
                // assess must not be recorded (or printed) as a pass.
                onUpdate('sampledDevices', [...list, { ref: '', zone: '', result: '' }]);
              }}
              className="min-h-11 px-2 text-sm font-semibold text-elec-yellow touch-manipulation"
            >
              + Add device
            </button>
          </div>
          {(Array.isArray(formData.sampledDevices) ? formData.sampledDevices : []).length === 0 && (
            <p className="text-[12px] leading-relaxed text-white/80">
              Optional but recommended — record each device by reference (e.g. Z2/D14) so the next
              visit knows exactly what's still to test in the cycle.
            </p>
          )}
          <div className="space-y-4">
            {(Array.isArray(formData.sampledDevices) ? formData.sampledDevices : []).map(
              (d: { ref: string; zone: string; result: string }, i: number) => {
                const list = formData.sampledDevices as {
                  ref: string;
                  zone: string;
                  result: string;
                }[];
                const set = (field: string, value: string) =>
                  onUpdate(
                    'sampledDevices',
                    list.map((row, idx) => (idx === i ? { ...row, [field]: value } : row))
                  );
                return (
                  <div key={i} className="border-t border-white/[0.08] pt-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">Device {i + 1}</p>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdate(
                            'sampledDevices',
                            list.filter((_, idx) => idx !== i)
                          )
                        }
                        className="min-h-11 shrink-0 px-2 text-sm font-medium text-red-400 touch-manipulation"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={d.ref}
                        onChange={(e) => set('ref', e.target.value)}
                        className={cn(inputCn, 'flex-1')}
                        placeholder="Device ref (Z2/D14)"
                      />
                      <Input
                        value={d.zone}
                        onChange={(e) => set('zone', e.target.value)}
                        className={cn(inputCn, 'w-24')}
                        placeholder="Zone"
                      />
                      <button
                        type="button"
                        onClick={() => set('result', d.result === 'pass' ? 'fail' : 'pass')}
                        className={cn(
                          'h-11 w-16 shrink-0 rounded-xl border text-[12px] font-semibold touch-manipulation',
                          d.result === 'pass'
                            ? 'border-green-500 bg-green-500 text-black'
                            : d.result === 'fail'
                              ? 'border-red-500 bg-red-500 text-white'
                              : 'border-white/[0.12] bg-white/[0.06] text-white'
                        )}
                      >
                        {d.result === 'pass' ? 'Pass' : d.result === 'fail' ? 'Fail' : 'Set'}
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Reason devices were not tested */}
        <div>
          <Label className={labelCn}>
            Devices not tested — reason (access, occupied areas…)
          </Label>
          <Textarea
            value={formData.devicesNotTestedReason || ''}
            onChange={(e) => onUpdate('devicesNotTestedReason', e.target.value)}
            className={textareaCn}
            placeholder="e.g. Rooms 210-214 occupied — to be covered at the next visit"
          />
        </div>

        {/* 12-month cycle statement — recorded, not just hinted */}
        <div>
          <Label className={labelCn}>
            Have all devices been tested within the last 12 months?
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ['yes', 'Yes'],
                ['no', 'No'],
                ['unknown', 'Not known'],
              ] as [string, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onUpdate('allDevicesTested12mo', value)}
                className={cn(
                  'h-11 rounded-xl border text-sm touch-manipulation transition-colors',
                  formData.allDevicesTested12mo === value
                    ? value === 'no'
                      ? 'border-red-500 bg-red-500 font-semibold text-white'
                      : 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                    : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
                )}
              >
                {label}
              </button>
            ))}
          </div>
          {formData.allDevicesTested12mo === 'no' && (
            <p className="mt-1.5 text-[12px] leading-relaxed text-red-400">
              Record which areas are outstanding above — BS 5839-1:2025 expects every device
              functionally tested over the 12-month cycle.
            </p>
          )}
        </div>
      </div>

      {/* Compliance score */}
      {(() => {
        const pt = formData.panelTests || {};
        const pw = formData.powerTests || {};
        const checks = [
          pt.powerOnTest === 'pass',
          pt.zoneIndicators === 'pass',
          pt.faultIndicators === 'pass',
          pt.silenceFacility === 'pass',
          pt.resetFunction === 'pass',
          pt.eventLog === 'pass',
          pt.remoteSignalling === 'pass',
          pw.mainsSupply === 'pass',
          pw.batteryCondition === 'pass',
          formData.logbookReviewed === true,
          formData.weeklyTestingConfirmed === true,
          parseInt(formData.detectorsTestedCount || '0') > 0,
        ];
        const passed = checks.filter(Boolean).length;
        const total = checks.length;
        const score = Math.round((passed / total) * 100);
        if (passed === 0) return null;
        return (
          <div className={cn(cardCn, 'lg:col-span-2')}>
            <SectionHeader title="Compliance score" />
            <div className="rounded-xl bg-white/[0.05] p-4 text-center">
              <p
                className={cn(
                  'text-3xl font-bold',
                  score >= 90 ? 'text-green-400' : score >= 70 ? 'text-elec-yellow' : 'text-red-400'
                )}
              >
                {score}%
              </p>
              <p className="mt-1 text-[12px] text-white/80">
                {passed} of {total} compliance checks passed
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    score >= 90 ? 'bg-green-500' : score >= 70 ? 'bg-elec-yellow' : 'bg-red-500'
                  )}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          </div>
        );
      })()}

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
}
