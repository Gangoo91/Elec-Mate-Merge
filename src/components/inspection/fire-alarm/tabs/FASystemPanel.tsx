/**
 * Fire Alarm G2 — Tab 2: System & Panel
 * System category, panel details, cable spec, cause & effect, monitoring, power supply
 * ComboboxCell for all type selectors
 */

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Scan, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FireAlarmSystemCategory } from '@/types/fire-alarm';
import { FireAlarmPanelAutocomplete } from '../FireAlarmPanelAutocomplete';
import { SerialNumberScannerSheet } from '../SerialNumberScannerSheet';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import ComboboxCell from '@/components/table-cells/ComboboxCell';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';
const textareaCn = 'touch-manipulation text-base min-h-[60px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500';

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-red-500 to-rose-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

const systemCategories: { value: FireAlarmSystemCategory; label: string; description: string }[] = [
  { value: 'L1', label: 'L1 — Full Coverage', description: 'All areas of building' },
  { value: 'L2', label: 'L2 — Enhanced Coverage', description: 'Escape routes + high-risk areas' },
  { value: 'L3', label: 'L3 — Standard Coverage', description: 'Escape routes only' },
  { value: 'L4', label: 'L4 — Escape Route Only', description: 'Within escape routes only' },
  { value: 'L5', label: 'L5 — Engineered System', description: 'As risk assessment dictates' },
  { value: 'M', label: 'M — Manual', description: 'Manual call points only' },
  { value: 'P1', label: 'P1 — Property Full', description: 'Full property protection' },
  { value: 'P2', label: 'P2 — Property Partial', description: 'Partial property protection' },
];

/* ── Combobox option lists ── */

const networkTypeOptions = [
  { value: 'conventional', label: 'Conventional' },
  { value: 'addressable', label: 'Addressable' },
  { value: 'analogue-addressable', label: 'Analogue Addressable' },
  { value: 'wireless', label: 'Wireless' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'networked', label: 'Networked (multi-panel)' },
];

const cableTypeOptions = [
  { value: 'Standard (PH30)', label: 'Standard (PH30)' },
  { value: 'Enhanced (PH120)', label: 'Enhanced (PH120)' },
  { value: 'Mineral Insulated (MI)', label: 'Mineral Insulated (MI)' },
  { value: 'FP200', label: 'FP200 Gold' },
  { value: 'FP Plus', label: 'FP Plus' },
  { value: 'Firetuf', label: 'Firetuf' },
];

const fireRatingOptions = [
  { value: 'Standard', label: 'Standard' },
  { value: '30 min', label: '30 minutes' },
  { value: '60 min', label: '60 minutes' },
  { value: '120 min', label: '120 minutes' },
];

const evacuationStrategyOptions = [
  { value: 'Simultaneous', label: 'Simultaneous evacuation' },
  { value: 'Phased', label: 'Phased evacuation' },
  { value: 'Progressive horizontal', label: 'Progressive horizontal' },
  { value: 'Staff alarm', label: 'Staff alarm (silent / alert)' },
  { value: 'Defend in place', label: 'Defend in place' },
  { value: 'Custom', label: 'Custom (see cause & effect)' },
];

const signallingRouteOptions = [
  { value: 'Dual path', label: 'Dual path' },
  { value: 'Single path', label: 'Single path' },
  { value: 'RedCare', label: 'BT RedCare' },
  { value: 'Dualcom', label: 'Dualcom' },
  { value: 'GSM', label: 'GSM' },
  { value: 'IP', label: 'IP' },
  { value: 'GPRS', label: 'GPRS' },
];

const batteryTypeOptions = [
  { value: 'Sealed Lead Acid', label: 'Sealed Lead Acid (SLA)' },
  { value: 'NiCd', label: 'Nickel Cadmium (NiCd)' },
  { value: 'Lithium', label: 'Lithium' },
  { value: 'VRLA', label: 'VRLA (Valve Regulated)' },
];

const standbyDurationOptions = [
  { value: '24', label: '24 hours' },
  { value: '72', label: '72 hours' },
];

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function FASystemPanel({ formData, onUpdate }: Props) {
  const [scannerOpen, setScannerOpen] = useState(false);
  const { suggestCategoryForPremises } = useFireAlarmSmartForm();

  const categorySuggestion = useMemo(() => {
    if (!formData.premisesType) return null;
    return suggestCategoryForPremises(formData.premisesType);
  }, [formData.premisesType, suggestCategoryForPremises]);

  return (
    <div className="space-y-5">
      {/* System Category */}
      <Section title="System Category" accentColor="from-red-500/40 to-orange-400/20">
        <Field label="Category" required>
          <div className="space-y-2">
            {systemCategories.map((cat) => (
              <button key={cat.value} type="button" onClick={() => onUpdate('systemCategory', cat.value)}
                className={cn('w-full text-left p-4 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
                  formData.systemCategory === cat.value ? 'bg-red-500/10 border-red-500/30' : 'bg-white/[0.03] border-white/[0.06]')}>
                <div className="flex items-center gap-3">
                  <div className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
                    formData.systemCategory === cat.value ? 'bg-red-500 border-red-500' : 'border-white/30')}>
                    {formData.systemCategory === cat.value && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div>
                    <p className={cn('text-sm font-semibold', formData.systemCategory === cat.value ? 'text-red-400' : 'text-white')}>{cat.label}</p>
                    <p className="text-xs text-white mt-0.5">{cat.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Field>
        {categorySuggestion && formData.systemCategory !== categorySuggestion.recommended && (
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-amber-400">AI Suggestion: {categorySuggestion.recommended}</p>
                <p className="text-xs text-white mt-1">{categorySuggestion.reason}</p>
              </div>
            </div>
          </div>
        )}
        <Field label="Category Justification"><Textarea value={formData.categoryJustification || ''} onChange={(e) => onUpdate('categoryJustification', e.target.value)} className={textareaCn} placeholder="Why this category was selected (linked to FRA)..." /></Field>
      </Section>

      {/* Panel Details */}
      <Section title="Control Panel" accentColor="from-red-500/40 to-rose-400/20">
        <Field label="Panel Make & Model">
          <FireAlarmPanelAutocomplete
            value={formData.panelId || ''}
            onValueChange={(v) => onUpdate('panelId', v)}
            onPanelSelect={(panel, defaults) => {
              if (panel) {
                onUpdate('systemMake', panel.manufacturer);
                onUpdate('systemModel', panel.model);
                if (defaults) {
                  onUpdate('networkType', defaults.networkType || '');
                  onUpdate('zonesCount', defaults.zonesCount?.toString() || '');
                }
              }
            }}
            showAutoFillBadge
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Make"><Input value={formData.systemMake || ''} onChange={(e) => onUpdate('systemMake', e.target.value)} className={inputCn} /></Field>
          <Field label="Model"><Input value={formData.systemModel || ''} onChange={(e) => onUpdate('systemModel', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Field label="Serial Number"><Input value={formData.panelSerialNumber || ''} onChange={(e) => onUpdate('panelSerialNumber', e.target.value)} className={inputCn} /></Field>
          </div>
          <Button variant="outline" onClick={() => setScannerOpen(true)} className="h-12 mt-5 px-3 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation">
            <Scan className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Panel Location"><Input value={formData.panelLocation || ''} onChange={(e) => onUpdate('panelLocation', e.target.value)} className={inputCn} placeholder="e.g. Main entrance lobby" /></Field>
          <Field label="Firmware Version"><Input value={formData.panelFirmware || ''} onChange={(e) => onUpdate('panelFirmware', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Network Type">
            <ComboboxCell value={formData.networkType || ''} onChange={(v) => onUpdate('networkType', v)} options={networkTypeOptions} placeholder="Select..." className="h-12 text-base" />
          </Field>
          <Field label="Zones / Loops">
            <div className="grid grid-cols-2 gap-2">
              <Input value={formData.zonesCount || ''} onChange={(e) => onUpdate('zonesCount', e.target.value)} className={inputCn} placeholder="Zones" type="number" inputMode="numeric" />
              <Input value={formData.loopCount || ''} onChange={(e) => onUpdate('loopCount', e.target.value)} className={inputCn} placeholder="Loops" type="number" inputMode="numeric" />
            </div>
          </Field>
        </div>
      </Section>

      {/* Power Supply */}
      <Section title="Power Supply" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Mains Supply"><Input value={formData.mainsSupplyDetails || ''} onChange={(e) => onUpdate('mainsSupplyDetails', e.target.value)} className={inputCn} placeholder="e.g. 230V, 6A MCB" /></Field>
          <Field label="Battery Type">
            <ComboboxCell value={formData.batteryType || ''} onChange={(v) => onUpdate('batteryType', v)} options={batteryTypeOptions} placeholder="Select..." className="h-12 text-base" />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Battery Capacity (Ah)"><Input value={formData.batteryCapacity || ''} onChange={(e) => onUpdate('batteryCapacity', e.target.value)} inputMode="decimal" className={inputCn} placeholder="e.g. 3.2" /></Field>
          <Field label="Standby Duration (hrs)">
            <ComboboxCell value={formData.standbyDuration || ''} onChange={(v) => onUpdate('standbyDuration', v)} options={standbyDurationOptions} placeholder="Select..." className="h-12 text-base" />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Battery Install Date"><Input type="date" value={formData.batteryInstallDate || ''} onChange={(e) => onUpdate('batteryInstallDate', e.target.value)} className={inputCn} /></Field>
          <Field label="Charger Type"><Input value={formData.chargerType || ''} onChange={(e) => onUpdate('chargerType', e.target.value)} className={inputCn} placeholder="e.g. Float charge" /></Field>
        </div>
      </Section>

      {/* Cable Specification */}
      <Section title="Cable Specification" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Cable Type">
            <ComboboxCell value={formData.cableType || ''} onChange={(v) => onUpdate('cableType', v)} options={cableTypeOptions} placeholder="Select..." className="h-12 text-base" />
          </Field>
          <Field label="Fire Rating">
            <ComboboxCell value={formData.cableFireRating || ''} onChange={(v) => onUpdate('cableFireRating', v)} options={fireRatingOptions} placeholder="Select..." className="h-12 text-base" />
          </Field>
        </div>
        <Field label="Circuit Integrity">
          <ComboboxCell value={formData.circuitIntegrity || ''} onChange={(v) => onUpdate('circuitIntegrity', v)} options={[
            { value: 'standard', label: 'Standard' },
            { value: 'enhanced', label: 'Enhanced' },
            { value: 'critical-signal-path', label: 'Critical Signal Path' },
          ]} placeholder="Select..." className="h-12 text-base" />
        </Field>
        <div className="flex items-center gap-3">
          <Checkbox checked={formData.redCableForMains || false} onCheckedChange={(v) => onUpdate('redCableForMains', v)} className={checkboxCn} />
          <Label className="text-sm text-white">Red cable used for mains power circuits (BS 5839-1:2025 requirement)</Label>
        </div>
        <Field label="Wiring Notes"><Textarea value={formData.wiringNotes || ''} onChange={(e) => onUpdate('wiringNotes', e.target.value)} className={textareaCn} placeholder="Cable routing, segregation, mechanical protection details..." /></Field>
      </Section>

      {/* Cause & Effect */}
      <Section title="Cause & Effect" accentColor="from-purple-500/40 to-indigo-400/20">
        <Field label="Evacuation Strategy">
          <ComboboxCell value={formData.evacuationStrategy || ''} onChange={(v) => onUpdate('evacuationStrategy', v)} options={evacuationStrategyOptions} placeholder="Select..." className="h-12 text-base" />
        </Field>
        <Field label="Cause & Effect Matrix Reference"><Input value={formData.causeEffectReference || ''} onChange={(e) => onUpdate('causeEffectReference', e.target.value)} className={inputCn} placeholder="e.g. CE-001 Rev A" /></Field>
        <Field label="False Alarm Management Strategy"><Textarea value={formData.falseAlarmStrategy || ''} onChange={(e) => onUpdate('falseAlarmStrategy', e.target.value)} className={textareaCn} placeholder="e.g. Coincidence detection, investigation delay, intelligent detectors..." /></Field>
      </Section>

      {/* Monitoring / ARC */}
      <Section title="Monitoring / ARC" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="flex items-center gap-3">
          <Checkbox checked={formData.systemMonitored || false} onCheckedChange={(v) => onUpdate('systemMonitored', v)} className={checkboxCn} />
          <Label className="text-sm text-white">System monitored by Alarm Receiving Centre</Label>
        </div>
        {formData.systemMonitored && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="ARC Name"><Input value={formData.arcName || ''} onChange={(e) => onUpdate('arcName', e.target.value)} className={inputCn} /></Field>
              <Field label="Account Number"><Input value={formData.arcAccountNumber || ''} onChange={(e) => onUpdate('arcAccountNumber', e.target.value)} className={inputCn} /></Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Signalling Route">
                <ComboboxCell value={formData.signallingRoute || ''} onChange={(v) => onUpdate('signallingRoute', v)} options={signallingRouteOptions} placeholder="Select..." className="h-12 text-base" />
              </Field>
              <Field label="ARC Phone"><Input type="tel" value={formData.arcPhone || ''} onChange={(e) => onUpdate('arcPhone', e.target.value)} className={inputCn} /></Field>
            </div>
          </>
        )}
      </Section>

      {/* Serial Number Scanner */}
      <SerialNumberScannerSheet
        open={scannerOpen}
        onOpenChange={setScannerOpen}
        onSerialExtracted={(serial, photo) => {
          onUpdate('panelSerialNumber', serial);
          if (photo) onUpdate('panelPhoto', photo);
        }}
      />
    </div>
  );
}
