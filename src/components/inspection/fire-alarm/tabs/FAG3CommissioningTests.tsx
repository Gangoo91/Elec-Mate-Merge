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
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-red-500 to-rose-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const TestResultRow = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
    <span className="text-sm text-white font-medium flex-1">{label}</span>
    <div className="flex gap-1.5">
      {[
        { val: 'pass', label: 'Pass', active: 'bg-green-500 border-green-500 text-white', inactive: 'border-green-500/30 text-green-400' },
        { val: 'fail', label: 'Fail', active: 'bg-red-500 border-red-500 text-white', inactive: 'border-red-500/30 text-red-400' },
        { val: 'na', label: 'N/A', active: 'bg-white/20 border-white/30 text-white', inactive: 'border-white/20 text-white' },
      ].map((opt) => (
        <button key={opt.val} type="button" onClick={() => onChange(opt.val)}
          className={cn('px-3 py-1.5 rounded-lg text-xs font-bold border touch-manipulation active:scale-95 transition-all min-w-[44px]',
            value === opt.val ? opt.active : opt.inactive + ' bg-transparent')}>
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

// "All Pass" button
const AllPassButton = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick} className="w-full h-10 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider touch-manipulation active:scale-[0.98] transition-all mb-2">
    Mark All Pass
  </button>
);

// Coverage percentage badge
const CoverageBadge = ({ tested, total, label }: { tested: number; total: number; label: string }) => {
  if (!tested || !total) return null;
  const pct = Math.round((tested / total) * 100);
  return (
    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
      <p className={cn('text-xl font-bold', pct >= 100 ? 'text-green-400' : pct >= 80 ? 'text-elec-yellow' : 'text-red-400')}>{pct}%</p>
      <p className="text-[10px] text-white uppercase">{label}</p>
    </div>
  );
};

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function FAG3CommissioningTests({ formData, onUpdate }: Props) {
  const pt = formData.panelTests || {};
  const pw = formData.powerTests || {};
  const ft = formData.faultTests || {};

  const updatePanelTest = (field: string, value: string) => onUpdate('panelTests', { ...pt, [field]: value });
  const updatePowerTest = (field: string, value: string) => onUpdate('powerTests', { ...pw, [field]: value });
  const updateFaultTest = (field: string, value: string) => onUpdate('faultTests', { ...ft, [field]: value });

  // Test summary
  const testSummary = useMemo(() => {
    const all = [
      pt.powerOnTest, pt.zoneIndicators, pt.faultIndicators, pt.silenceFacility, pt.resetFunction, pt.eventLog, pt.remoteSignalling,
      pw.mainsSupply, pw.batteryCondition, pw.chargerOperation, pw.standbyDuration,
      ft.openCircuit, ft.shortCircuit, ft.earthFault, ft.powerFail,
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
    return Math.round((new Date(formData.soakTestEnd).getTime() - new Date(formData.soakTestStart).getTime()) / 86400000);
  }, [formData.soakTestStart, formData.soakTestEnd]);

  return (
    <div className="space-y-5">
      {/* Test Summary */}
      {testSummary.done > 0 && (
        <div className="grid grid-cols-4 gap-2">
          <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-lg font-bold text-white">{testSummary.done}/{testSummary.total}</p>
            <p className="text-[9px] text-white uppercase">Done</p>
          </div>
          <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
            <p className="text-lg font-bold text-green-400">{testSummary.pass}</p>
            <p className="text-[9px] text-white uppercase">Pass</p>
          </div>
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
            <p className="text-lg font-bold text-red-400">{testSummary.fail}</p>
            <p className="text-[9px] text-white uppercase">Fail</p>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-lg font-bold text-white">{testSummary.na}</p>
            <p className="text-[9px] text-white uppercase">N/A</p>
          </div>
        </div>
      )}

      {/* Panel Tests */}
      <Section title="Control Panel Tests" accentColor="from-red-500/40 to-rose-400/20">
        <AllPassButton onClick={() => onUpdate('panelTests', { ...pt, powerOnTest: 'pass', zoneIndicators: 'pass', faultIndicators: 'pass', silenceFacility: 'pass', resetFunction: 'pass', eventLog: 'pass', remoteSignalling: 'pass' })} />
        <div className="space-y-2">
          <TestResultRow label="Power-on Test" value={pt.powerOnTest || ''} onChange={(v) => updatePanelTest('powerOnTest', v)} />
          <TestResultRow label="Zone Indicators" value={pt.zoneIndicators || ''} onChange={(v) => updatePanelTest('zoneIndicators', v)} />
          <TestResultRow label="Fault Indicators" value={pt.faultIndicators || ''} onChange={(v) => updatePanelTest('faultIndicators', v)} />
          <TestResultRow label="Silence Facility" value={pt.silenceFacility || ''} onChange={(v) => updatePanelTest('silenceFacility', v)} />
          <TestResultRow label="Reset Function" value={pt.resetFunction || ''} onChange={(v) => updatePanelTest('resetFunction', v)} />
          <TestResultRow label="Event Log" value={pt.eventLog || ''} onChange={(v) => updatePanelTest('eventLog', v)} />
          <TestResultRow label="Remote Signalling" value={pt.remoteSignalling || ''} onChange={(v) => updatePanelTest('remoteSignalling', v)} />
        </div>
      </Section>

      {/* Power Tests */}
      <Section title="Power & Battery Tests" accentColor="from-green-500/40 to-emerald-400/20">
        <AllPassButton onClick={() => onUpdate('powerTests', { ...pw, mainsSupply: 'pass', batteryCondition: 'pass', chargerOperation: 'pass', standbyDuration: 'pass' })} />
        <div className="space-y-2">
          <TestResultRow label="Mains Supply" value={pw.mainsSupply || ''} onChange={(v) => updatePowerTest('mainsSupply', v)} />
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Label className="text-white text-xs mb-1.5 block">Battery Voltage (V)</Label>
            <Input value={pw.batteryVoltage || ''} onChange={(e) => updatePowerTest('batteryVoltage', e.target.value)} inputMode="decimal" className={inputCn} placeholder="e.g. 27.6" />
          </div>
          <TestResultRow label="Battery Condition" value={pw.batteryCondition || ''} onChange={(v) => updatePowerTest('batteryCondition', v)} />
          <TestResultRow label="Charger Operation" value={pw.chargerOperation || ''} onChange={(v) => updatePowerTest('chargerOperation', v)} />
          <TestResultRow label="Standby Duration" value={pw.standbyDuration || ''} onChange={(v) => updatePowerTest('standbyDuration', v)} />
        </div>
      </Section>

      {/* Fault Simulation */}
      <Section title="Fault Simulation Tests" accentColor="from-amber-500/40 to-yellow-400/20">
        <AllPassButton onClick={() => onUpdate('faultTests', { ...ft, openCircuit: 'pass', shortCircuit: 'pass', earthFault: 'pass', powerFail: 'pass' })} />
        <div className="space-y-2">
          <TestResultRow label="Open Circuit" value={ft.openCircuit || ''} onChange={(v) => updateFaultTest('openCircuit', v)} />
          <TestResultRow label="Short Circuit" value={ft.shortCircuit || ''} onChange={(v) => updateFaultTest('shortCircuit', v)} />
          <TestResultRow label="Earth Fault" value={ft.earthFault || ''} onChange={(v) => updateFaultTest('earthFault', v)} />
          <TestResultRow label="Power Fail" value={ft.powerFail || ''} onChange={(v) => updateFaultTest('powerFail', v)} />
        </div>
      </Section>

      {/* Cause & Effect Verification */}
      <Section title="Cause & Effect Verification" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <Checkbox checked={formData.causeAndEffectVerified || false} onCheckedChange={(v) => onUpdate('causeAndEffectVerified', v)} className={checkboxCn} />
          <Label className="text-sm text-white">Cause & effect matrix verified — all outputs respond correctly</Label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><Label className="text-white text-xs mb-1.5 block">C&E Reference</Label><Input value={formData.causeAndEffectRef || ''} onChange={(e) => onUpdate('causeAndEffectRef', e.target.value)} className={inputCn} /></div>
          <div><Label className="text-white text-xs mb-1.5 block">Verification Date</Label><Input type="date" value={formData.causeAndEffectDate || ''} onChange={(e) => onUpdate('causeAndEffectDate', e.target.value)} className={inputCn} /></div>
        </div>
      </Section>

      {/* Soak Test */}
      <Section title="Soak Test" accentColor="from-red-500/40 to-orange-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><Label className="text-white text-xs mb-1.5 block">Start Date</Label><Input type="date" value={formData.soakTestStart || ''} onChange={(e) => onUpdate('soakTestStart', e.target.value)} className={inputCn} /></div>
          <div><Label className="text-white text-xs mb-1.5 block">End Date</Label><Input type="date" value={formData.soakTestEnd || ''} onChange={(e) => onUpdate('soakTestEnd', e.target.value)} className={inputCn} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label className="text-white text-xs mb-1.5 block">Duration</Label>
            <Input value={formData.soakTestDuration || ''} onChange={(e) => onUpdate('soakTestDuration', e.target.value)} className={inputCn}
              placeholder={soakDays !== null ? `${soakDays} days (auto-calculated)` : 'e.g. 7 days'} />
            {soakDays !== null && !formData.soakTestDuration && (
              <p className="text-[10px] text-white mt-1">{soakDays} days calculated from dates</p>
            )}
            {soakDays !== null && soakDays < 7 && (
              <div className="flex items-center gap-1.5 mt-1">
                <AlertTriangle className="h-3 w-3 text-amber-400 flex-shrink-0" />
                <p className="text-[10px] text-amber-400">BS 5839-1 recommends minimum 7 days soak</p>
              </div>
            )}
          </div>
          <TestResultRow label="Result" value={formData.soakTestResult || ''} onChange={(v) => onUpdate('soakTestResult', v)} />
        </div>
        <div><Label className="text-white text-xs mb-1.5 block">Soak Test Notes</Label>
          <Textarea value={formData.soakTestNotes || ''} onChange={(e) => onUpdate('soakTestNotes', e.target.value)} className="touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500" placeholder="Any issues during soak period..." />
        </div>
      </Section>

      {/* Device Function Testing */}
      <Section title="Device Function Testing" accentColor="from-red-500/40 to-rose-400/20">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-white text-xs mb-1.5 block">Detectors Tested</Label>
            <div className="flex gap-2">
              <Input type="number" inputMode="numeric" value={formData.detectorsTestedCount || ''} onChange={(e) => onUpdate('detectorsTestedCount', e.target.value)} className={inputCn} placeholder="Tested" />
              <span className="flex items-center text-white text-sm">/</span>
              <Input type="number" inputMode="numeric" value={formData.detectorsTotalCount || ''} onChange={(e) => onUpdate('detectorsTotalCount', e.target.value)} className={inputCn} placeholder="Total" />
            </div>
          </div>
          <div>
            <Label className="text-white text-xs mb-1.5 block">Call Points Tested</Label>
            <div className="flex gap-2">
              <Input type="number" inputMode="numeric" value={formData.callPointsTestedCount || ''} onChange={(e) => onUpdate('callPointsTestedCount', e.target.value)} className={inputCn} placeholder="Tested" />
              <span className="flex items-center text-white text-sm">/</span>
              <Input type="number" inputMode="numeric" value={formData.callPointsTotalCount || ''} onChange={(e) => onUpdate('callPointsTotalCount', e.target.value)} className={inputCn} placeholder="Total" />
            </div>
          </div>
          <div>
            <Label className="text-white text-xs mb-1.5 block">Sounders Verified</Label>
            <div className="flex gap-2">
              <Input type="number" inputMode="numeric" value={formData.soundersTestedCount || ''} onChange={(e) => onUpdate('soundersTestedCount', e.target.value)} className={inputCn} placeholder="Tested" />
              <span className="flex items-center text-white text-sm">/</span>
              <Input type="number" inputMode="numeric" value={formData.soundersTotalCount || ''} onChange={(e) => onUpdate('soundersTotalCount', e.target.value)} className={inputCn} placeholder="Total" />
            </div>
          </div>
          <div>
            <Label className="text-white text-xs mb-1.5 block">Interfaces Verified</Label>
            <div className="flex gap-2">
              <Input type="number" inputMode="numeric" value={formData.interfacesTestedCount || ''} onChange={(e) => onUpdate('interfacesTestedCount', e.target.value)} className={inputCn} placeholder="Tested" />
              <span className="flex items-center text-white text-sm">/</span>
              <Input type="number" inputMode="numeric" value={formData.interfacesTotalCount || ''} onChange={(e) => onUpdate('interfacesTotalCount', e.target.value)} className={inputCn} placeholder="Total" />
            </div>
          </div>
        </div>
        {/* Coverage percentages for all 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <CoverageBadge tested={parseInt(formData.detectorsTestedCount || '0')} total={parseInt(formData.detectorsTotalCount || '0')} label="Detectors" />
          <CoverageBadge tested={parseInt(formData.callPointsTestedCount || '0')} total={parseInt(formData.callPointsTotalCount || '0')} label="Call Points" />
          <CoverageBadge tested={parseInt(formData.soundersTestedCount || '0')} total={parseInt(formData.soundersTotalCount || '0')} label="Sounders" />
          <CoverageBadge tested={parseInt(formData.interfacesTestedCount || '0')} total={parseInt(formData.interfacesTotalCount || '0')} label="Interfaces" />
        </div>
      </Section>
    </div>
  );
}
