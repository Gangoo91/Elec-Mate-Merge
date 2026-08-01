/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G3 Commissioning — Tab 2: Commissioning Tests
 * Panel tests, power tests, fault simulation, cause & effect, soak test, device testing
 * Smart: "All Pass" buttons, test summary, soak duration warning, coverage percentages
 */

import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const checkboxCn =
  'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

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
  <div className="flex items-center justify-between gap-3 min-h-11">
    <span className="text-sm text-white font-medium flex-1">{label}</span>
    <div className="flex gap-1.5">
      {[
        { val: 'pass', label: 'Pass', active: 'bg-green-500 border-green-500 text-black font-semibold' },
        { val: 'fail', label: 'Fail', active: 'bg-red-500 border-red-500 text-white font-semibold' },
        { val: 'na', label: 'N/A', active: 'bg-white/20 border-white/20 text-white font-semibold' },
      ].map((opt) => (
        <button
          key={opt.val}
          type="button"
          onClick={() => onChange(opt.val)}
          className={cn(
            'h-11 min-w-[52px] rounded-xl border px-3 text-sm touch-manipulation active:scale-95 transition-all',
            value === opt.val
              ? opt.active
              : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

// "All Pass" button
const AllPassButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full h-11 rounded-xl bg-green-500 text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-transform"
  >
    Mark all pass
  </button>
);

// Coverage percentage badge
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

export default function FAG3CommissioningTests({ formData, onUpdate }: Props) {
  const pt = formData.panelTests || {};
  const pw = formData.powerTests || {};
  const ft = formData.faultTests || {};

  const updatePanelTest = (field: string, value: string) =>
    onUpdate('panelTests', { ...pt, [field]: value });
  const updatePowerTest = (field: string, value: string) =>
    onUpdate('powerTests', { ...pw, [field]: value });
  const updateFaultTest = (field: string, value: string) =>
    onUpdate('faultTests', { ...ft, [field]: value });

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
        <div className="grid grid-cols-4 gap-2 lg:col-span-2">
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
          <div className="pt-1">
            <Label className={labelCn}>Battery voltage (V)</Label>
            <Input
              value={pw.batteryVoltage || ''}
              onChange={(e) => updatePowerTest('batteryVoltage', e.target.value)}
              inputMode="decimal"
              className={inputCn}
              placeholder="e.g. 27.6"
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
        <label className="flex min-h-11 items-center gap-3 cursor-pointer touch-manipulation">
          <Checkbox
            checked={formData.causeAndEffectVerified || false}
            onCheckedChange={(v) => onUpdate('causeAndEffectVerified', v)}
            className={checkboxCn}
          />
          <span className="text-sm text-white">
            Cause & effect matrix verified — all outputs respond correctly
          </span>
        </label>
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
              <p className="text-[11px] text-white/80 mt-1">
                {soakDays} days calculated from dates
              </p>
            )}
            {soakDays !== null && soakDays < 7 && (
              <p className="text-[11px] text-amber-400 mt-1">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn}>Detectors tested</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                inputMode="numeric"
                value={formData.detectorsTestedCount || ''}
                onChange={(e) => onUpdate('detectorsTestedCount', e.target.value)}
                className={inputCn}
                placeholder="Tested"
              />
              <span className="text-white/80 text-sm">/</span>
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
            <div className="flex items-center gap-2">
              <Input
                type="number"
                inputMode="numeric"
                value={formData.callPointsTestedCount || ''}
                onChange={(e) => onUpdate('callPointsTestedCount', e.target.value)}
                className={inputCn}
                placeholder="Tested"
              />
              <span className="text-white/80 text-sm">/</span>
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
            <div className="flex items-center gap-2">
              <Input
                type="number"
                inputMode="numeric"
                value={formData.soundersTestedCount || ''}
                onChange={(e) => onUpdate('soundersTestedCount', e.target.value)}
                className={inputCn}
                placeholder="Tested"
              />
              <span className="text-white/80 text-sm">/</span>
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
            <div className="flex items-center gap-2">
              <Input
                type="number"
                inputMode="numeric"
                value={formData.interfacesTestedCount || ''}
                onChange={(e) => onUpdate('interfacesTestedCount', e.target.value)}
                className={inputCn}
                placeholder="Tested"
              />
              <span className="text-white/80 text-sm">/</span>
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
      </div>
    </div>
  );
}
