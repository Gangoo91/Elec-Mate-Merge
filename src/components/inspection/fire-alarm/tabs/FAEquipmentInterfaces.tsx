/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G2 — Tab 4: Equipment & Interfaces
 * Interface equipment, repeater panels, aspirating, loop details, drawings, handover
 * ComboboxCell for all type selectors
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InterfaceEquipment, AspiratingUnit } from '@/types/fire-alarm';
import ComboboxCell from '@/components/table-cells/ComboboxCell';

const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const inputSmCn =
  'h-10 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';
const checkboxCn =
  'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const Section = ({
  title,
  accentColor,
  count,
  children,
}: {
  title: string;
  accentColor?: string;
  count?: number;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div
        className={cn(
          'h-[2px] w-full rounded-full bg-gradient-to-r mb-2',
          accentColor || 'from-red-500 to-rose-400'
        )}
      />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-2">
        {title}
        {count !== undefined && (
          <span className="text-[10px] font-bold text-white bg-white/[0.1] px-2 py-0.5 rounded">
            {count}
          </span>
        )}
      </h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}</Label>
    {children}
  </div>
);

/* ── Option lists ── */

const interfaceTypeOptions = [
  { value: 'door-holders', label: 'Door Holders' },
  { value: 'sprinkler-interface', label: 'Sprinkler Interface' },
  { value: 'lift-recall', label: 'Lift Recall' },
  { value: 'ventilation-dampers', label: 'Ventilation / Dampers' },
  { value: 'gas-shutdown', label: 'Gas Shutdown' },
  { value: 'access-control', label: 'Access Control Release' },
  { value: 'suppression', label: 'Suppression System' },
  { value: 'emergency-lighting', label: 'Emergency Lighting' },
  { value: 'hvac-shutdown', label: 'HVAC Shutdown' },
  { value: 'fire-shutter', label: 'Fire Shutter Control' },
  { value: 'smoke-extract', label: 'Smoke Extract System' },
  { value: 'stairwell-pressurisation', label: 'Stairwell Pressurisation' },
  { value: 'kitchen-suppression', label: 'Kitchen Suppression' },
  { value: 'other', label: 'Other' },
];

const interfaceMethodOptions = [
  { value: 'volt-free-relay', label: 'Volt-free Relay' },
  { value: 'monitored-output', label: 'Monitored Output' },
  { value: 'addressable-module', label: 'Addressable Module' },
  { value: 'hardwired', label: 'Hardwired' },
  { value: 'network-protocol', label: 'Network Protocol (BACnet/Modbus)' },
  { value: 'wireless', label: 'Wireless Module' },
];

const sensitivityOptions = [
  { value: 'class-a', label: 'Class A (Enhanced)' },
  { value: 'class-b', label: 'Class B (Standard)' },
  { value: 'class-c', label: 'Class C (Reduced)' },
];

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAEquipmentInterfaces({ formData, onUpdate }: Props) {
  const interfaces: InterfaceEquipment[] = formData.interfaceEquipment || [];
  const repeaters: any[] = formData.repeaterPanels || [];
  const aspirating: AspiratingUnit[] = formData.aspiratingUnits || [];

  const addInterface = () =>
    onUpdate('interfaceEquipment', [
      ...interfaces,
      {
        id: crypto.randomUUID(),
        type: '',
        location: '',
        interfaceMethod: '',
        details: '',
        tested: false,
      },
    ]);
  const removeInterface = (id: string) =>
    onUpdate(
      'interfaceEquipment',
      interfaces.filter((i) => i.id !== id)
    );
  const updateInterface = (id: string, field: string, value: any) =>
    onUpdate(
      'interfaceEquipment',
      interfaces.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );

  const addRepeater = () =>
    onUpdate('repeaterPanels', [
      ...repeaters,
      { id: crypto.randomUUID(), location: '', make: '', model: '' },
    ]);
  const removeRepeater = (id: string) =>
    onUpdate(
      'repeaterPanels',
      repeaters.filter((r: any) => r.id !== id)
    );
  const updateRepeater = (id: string, field: string, value: any) =>
    onUpdate(
      'repeaterPanels',
      repeaters.map((r: any) => (r.id === id ? { ...r, [field]: value } : r))
    );

  const addAspirating = () =>
    onUpdate('aspiratingUnits', [
      ...aspirating,
      {
        id: crypto.randomUUID(),
        make: '',
        model: '',
        samplingPoints: 0,
        pipeLength: '',
        transportTime: '',
        sensitivityLevel: '',
      },
    ]);
  const removeAspirating = (id: string) =>
    onUpdate(
      'aspiratingUnits',
      aspirating.filter((a) => a.id !== id)
    );
  const updateAspirating = (id: string, field: string, value: any) =>
    onUpdate(
      'aspiratingUnits',
      aspirating.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );

  return (
    <div className="space-y-5">
      {/* Interface Equipment */}
      <Section
        title="Interface Equipment"
        accentColor="from-purple-500/40 to-indigo-400/20"
        count={interfaces.length}
      >
        {interfaces.map((iface, idx) => (
          <div key={iface.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-purple-400">
                Interface {idx + 1} of {interfaces.length}
              </span>
              <button
                onClick={() => removeInterface(iface.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              <Field label="Type">
                <ComboboxCell
                  value={iface.type}
                  onChange={(v) => updateInterface(iface.id, 'type', v)}
                  options={interfaceTypeOptions}
                  placeholder="Select interface type..."
                  className="h-12 text-base"
                />
              </Field>
              <Field label="Location">
                <Input
                  value={iface.location}
                  onChange={(e) => updateInterface(iface.id, 'location', e.target.value)}
                  className={inputSmCn}
                  placeholder="e.g. Main entrance"
                />
              </Field>
              <Field label="Interface Method">
                <ComboboxCell
                  value={iface.interfaceMethod}
                  onChange={(v) => updateInterface(iface.id, 'interfaceMethod', v)}
                  options={interfaceMethodOptions}
                  placeholder="Select method..."
                  className="h-12 text-base"
                />
              </Field>
              <Field label="Details">
                <Input
                  value={iface.details || ''}
                  onChange={(e) => updateInterface(iface.id, 'details', e.target.value)}
                  className={inputSmCn}
                  placeholder="Additional notes..."
                />
              </Field>
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={iface.tested || false}
                  onCheckedChange={(v) => updateInterface(iface.id, 'tested', v)}
                  className={checkboxCn}
                />
                <Label className="text-sm text-white">Tested and verified</Label>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addInterface}
          className="w-full h-12 rounded-xl border-2 border-dashed border-purple-500/20 flex items-center justify-center gap-2 text-sm font-medium text-purple-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Interface
        </button>
      </Section>

      {/* Repeater Panels */}
      <Section
        title="Repeater Panels"
        accentColor="from-cyan-500/40 to-blue-400/20"
        count={repeaters.length}
      >
        {repeaters.map((rep: any, idx: number) => (
          <div key={rep.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-cyan-400">
                Repeater {idx + 1} of {repeaters.length}
              </span>
              <button
                onClick={() => removeRepeater(rep.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              <Field label="Location">
                <Input
                  value={rep.location}
                  onChange={(e) => updateRepeater(rep.id, 'location', e.target.value)}
                  className={inputSmCn}
                  placeholder="e.g. Reception area"
                />
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Make">
                  <Input
                    value={rep.make}
                    onChange={(e) => updateRepeater(rep.id, 'make', e.target.value)}
                    className={inputSmCn}
                    placeholder="e.g. Advanced"
                  />
                </Field>
                <Field label="Model">
                  <Input
                    value={rep.model}
                    onChange={(e) => updateRepeater(rep.id, 'model', e.target.value)}
                    className={inputSmCn}
                    placeholder="e.g. Ax-Rep"
                  />
                </Field>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addRepeater}
          className="w-full h-12 rounded-xl border-2 border-dashed border-cyan-500/20 flex items-center justify-center gap-2 text-sm font-medium text-cyan-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Repeater Panel
        </button>
      </Section>

      {/* Aspirating System Details */}
      <Section
        title="Aspirating System Details"
        accentColor="from-rose-500/40 to-pink-400/20"
        count={aspirating.length}
      >
        {aspirating.map((unit, idx) => (
          <div key={unit.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-rose-400">
                Unit {idx + 1} of {aspirating.length}
              </span>
              <button
                onClick={() => removeAspirating(unit.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              <div className="grid grid-cols-2 gap-2">
                <Field label="Make">
                  <Input
                    value={unit.make}
                    onChange={(e) => updateAspirating(unit.id, 'make', e.target.value)}
                    className={inputSmCn}
                    placeholder="e.g. Xtralis"
                  />
                </Field>
                <Field label="Model">
                  <Input
                    value={unit.model}
                    onChange={(e) => updateAspirating(unit.id, 'model', e.target.value)}
                    className={inputSmCn}
                    placeholder="e.g. VESDA-E VEA"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Field label="Sample Pts">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={unit.samplingPoints || ''}
                    onChange={(e) =>
                      updateAspirating(unit.id, 'samplingPoints', parseInt(e.target.value) || 0)
                    }
                    className={inputSmCn}
                  />
                </Field>
                <Field label="Pipe (m)">
                  <Input
                    value={unit.pipeLength}
                    onChange={(e) => updateAspirating(unit.id, 'pipeLength', e.target.value)}
                    className={inputSmCn}
                  />
                </Field>
                <Field label="Transport (s)">
                  <Input
                    value={unit.transportTime}
                    onChange={(e) => updateAspirating(unit.id, 'transportTime', e.target.value)}
                    className={inputSmCn}
                  />
                </Field>
              </div>
              <Field label="Sensitivity Class">
                <ComboboxCell
                  value={unit.sensitivityLevel}
                  onChange={(v) => updateAspirating(unit.id, 'sensitivityLevel', v)}
                  options={sensitivityOptions}
                  placeholder="Select class..."
                  className="h-12 text-base"
                />
              </Field>
            </div>
          </div>
        ))}
        <button
          onClick={addAspirating}
          className="w-full h-12 rounded-xl border-2 border-dashed border-rose-500/20 flex items-center justify-center gap-2 text-sm font-medium text-rose-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Aspirating Unit
        </button>
      </Section>

      {/* Loop Details */}
      <Section title="Loop / Addressable Details" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Field label="Loops">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.loopCount || ''}
              onChange={(e) => onUpdate('loopCount', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Devices/Loop">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.devicesPerLoop || ''}
              onChange={(e) => onUpdate('devicesPerLoop', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Total Devices">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.totalDevices || ''}
              onChange={(e) => onUpdate('totalDevices', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Max Capacity">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.maxCapacity || ''}
              onChange={(e) => onUpdate('maxCapacity', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </Section>

      {/* Documentation */}
      <Section title="Documentation" accentColor="from-white/20 to-white/5">
        <div className="space-y-2">
          {[
            { field: 'asFittedDrawingsProvided', label: 'As-fitted drawings produced' },
            { field: 'zonePlanProvided', label: 'Zone plan / chart produced' },
          ].map(({ field, label }) => (
            <button
              key={field}
              type="button"
              onClick={() => onUpdate(field, !formData[field])}
              className={cn(
                'w-full text-left p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all flex items-center gap-3',
                formData[field]
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-white/[0.03] border-white/[0.06]'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
                  formData[field] ? 'bg-green-500 border-green-500' : 'border-white/30'
                )}
              >
                {formData[field] && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  formData[field] ? 'text-green-400' : 'text-white'
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
        <Field label="Variations from Design">
          <Textarea
            value={formData.variationsFromDesign || ''}
            onChange={(e) => onUpdate('variationsFromDesign', e.target.value)}
            className="touch-manipulation text-base min-h-[60px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500"
            placeholder="Any deviations from the G1 design specification..."
          />
        </Field>
        <Field label="Design Document Reference">
          <Input
            value={formData.designDocReference || ''}
            onChange={(e) => onUpdate('designDocReference', e.target.value)}
            className={inputCn}
          />
        </Field>
      </Section>

      {/* Handover Checklist */}
      <Section title="Handover Checklist" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="space-y-2">
          {[
            { field: 'handoverAsBuiltDrawings', label: 'As-built drawings provided' },
            { field: 'handoverOperatingInstructions', label: 'Operating instructions provided' },
            { field: 'handoverLogBook', label: 'Log book provided' },
            { field: 'handoverSpares', label: 'Spares provided (keys, fuses, call point glasses)' },
            { field: 'handoverTraining', label: 'Training provided to responsible person' },
          ].map(({ field, label }) => (
            <button
              key={field}
              type="button"
              onClick={() => onUpdate(field, !formData[field])}
              className={cn(
                'w-full text-left p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all flex items-center gap-3',
                formData[field]
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-white/[0.03] border-white/[0.06]'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
                  formData[field] ? 'bg-green-500 border-green-500' : 'border-white/30'
                )}
              >
                {formData[field] && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  formData[field] ? 'text-green-400' : 'text-white'
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}
