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
import { cn } from '@/lib/utils';
import { InterfaceEquipment, AspiratingUnit } from '@/types/fire-alarm';
import ComboboxCell from '@/components/table-cells/ComboboxCell';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const checkboxCn =
  'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const addButtonCn =
  'w-full h-11 rounded-xl border border-dashed border-white/[0.25] text-sm font-medium text-elec-yellow touch-manipulation active:scale-[0.98] transition-transform';

const SectionHeader = ({ title, count }: { title: string; count?: number }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
    {title}
    {count !== undefined && <span className="ml-2 font-normal text-white/80">({count})</span>}
  </h2>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
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
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Interface equipment */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Interface equipment" count={interfaces.length} />
        {interfaces.map((iface, idx) => (
          <div key={iface.id} className="border-t border-white/[0.08] pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">
                Interface {idx + 1} of {interfaces.length}
              </p>
              <button
                type="button"
                onClick={() => removeInterface(iface.id)}
                className="h-11 px-2 -mr-2 text-sm font-medium text-red-400 touch-manipulation active:opacity-70"
              >
                Remove
              </button>
            </div>
            <Field label="Type">
              <ComboboxCell
                value={iface.type}
                onChange={(v) => updateInterface(iface.id, 'type', v)}
                options={interfaceTypeOptions}
                placeholder="Select interface type..."
                className="h-11 text-base"
              />
            </Field>
            <Field label="Location">
              <Input
                value={iface.location}
                onChange={(e) => updateInterface(iface.id, 'location', e.target.value)}
                className={inputCn}
                placeholder="e.g. Main entrance"
              />
            </Field>
            <Field label="Interface method">
              <ComboboxCell
                value={iface.interfaceMethod}
                onChange={(v) => updateInterface(iface.id, 'interfaceMethod', v)}
                options={interfaceMethodOptions}
                placeholder="Select method..."
                className="h-11 text-base"
              />
            </Field>
            <Field label="Details">
              <Input
                value={iface.details || ''}
                onChange={(e) => updateInterface(iface.id, 'details', e.target.value)}
                className={inputCn}
                placeholder="Additional notes..."
              />
            </Field>
            <label className="flex min-h-11 items-center gap-3 cursor-pointer touch-manipulation">
              <Checkbox
                checked={iface.tested || false}
                onCheckedChange={(v) => updateInterface(iface.id, 'tested', v)}
                className={checkboxCn}
              />
              <span className="text-sm text-white">Tested and verified</span>
            </label>
          </div>
        ))}
        <button type="button" onClick={addInterface} className={addButtonCn}>
          Add interface
        </button>
      </div>

      {/* Repeater panels */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Repeater panels" count={repeaters.length} />
        {repeaters.map((rep: any, idx: number) => (
          <div key={rep.id} className="border-t border-white/[0.08] pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">
                Repeater {idx + 1} of {repeaters.length}
              </p>
              <button
                type="button"
                onClick={() => removeRepeater(rep.id)}
                className="h-11 px-2 -mr-2 text-sm font-medium text-red-400 touch-manipulation active:opacity-70"
              >
                Remove
              </button>
            </div>
            <Field label="Location">
              <Input
                value={rep.location}
                onChange={(e) => updateRepeater(rep.id, 'location', e.target.value)}
                className={inputCn}
                placeholder="e.g. Reception area"
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Make">
                <Input
                  value={rep.make}
                  onChange={(e) => updateRepeater(rep.id, 'make', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Advanced"
                />
              </Field>
              <Field label="Model">
                <Input
                  value={rep.model}
                  onChange={(e) => updateRepeater(rep.id, 'model', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Ax-Rep"
                />
              </Field>
            </div>
          </div>
        ))}
        <button type="button" onClick={addRepeater} className={addButtonCn}>
          Add repeater panel
        </button>
      </div>

      {/* Aspirating system details */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Aspirating system details" count={aspirating.length} />
        {aspirating.map((unit, idx) => (
          <div key={unit.id} className="border-t border-white/[0.08] pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">
                Unit {idx + 1} of {aspirating.length}
              </p>
              <button
                type="button"
                onClick={() => removeAspirating(unit.id)}
                className="h-11 px-2 -mr-2 text-sm font-medium text-red-400 touch-manipulation active:opacity-70"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Make">
                <Input
                  value={unit.make}
                  onChange={(e) => updateAspirating(unit.id, 'make', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Xtralis"
                />
              </Field>
              <Field label="Model">
                <Input
                  value={unit.model}
                  onChange={(e) => updateAspirating(unit.id, 'model', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. VESDA-E VEA"
                />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-x-3 gap-y-4">
              <Field label="Sample pts">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={unit.samplingPoints || ''}
                  onChange={(e) =>
                    updateAspirating(unit.id, 'samplingPoints', parseInt(e.target.value) || 0)
                  }
                  className={inputCn}
                />
              </Field>
              <Field label="Pipe (m)">
                <Input
                  value={unit.pipeLength}
                  onChange={(e) => updateAspirating(unit.id, 'pipeLength', e.target.value)}
                  className={inputCn}
                />
              </Field>
              <Field label="Transport (s)">
                <Input
                  value={unit.transportTime}
                  onChange={(e) => updateAspirating(unit.id, 'transportTime', e.target.value)}
                  className={inputCn}
                />
              </Field>
            </div>
            <Field label="Sensitivity class">
              <ComboboxCell
                value={unit.sensitivityLevel}
                onChange={(v) => updateAspirating(unit.id, 'sensitivityLevel', v)}
                options={sensitivityOptions}
                placeholder="Select class..."
                className="h-11 text-base"
              />
            </Field>
          </div>
        ))}
        <button type="button" onClick={addAspirating} className={addButtonCn}>
          Add aspirating unit
        </button>
      </div>

      {/* Loop details */}
      <div className={cardCn}>
        <SectionHeader title="Loop / addressable details" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Loops">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.loopCount || ''}
              onChange={(e) => onUpdate('loopCount', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Devices/loop">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.devicesPerLoop || ''}
              onChange={(e) => onUpdate('devicesPerLoop', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Total devices">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.totalDevices || ''}
              onChange={(e) => onUpdate('totalDevices', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Max capacity">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.maxCapacity || ''}
              onChange={(e) => onUpdate('maxCapacity', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* Documentation */}
      <div className={cardCn}>
        <SectionHeader title="Documentation" />
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
                'w-full min-h-11 rounded-xl border px-4 py-3 text-left text-sm touch-manipulation active:scale-[0.98] transition-all',
                formData[field]
                  ? 'bg-green-500 border-green-500 text-black font-semibold'
                  : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <Field label="Variations from design">
          <Textarea
            value={formData.variationsFromDesign || ''}
            onChange={(e) => onUpdate('variationsFromDesign', e.target.value)}
            className={textareaCn}
            placeholder="Any deviations from the G1 design specification..."
          />
        </Field>
        <Field label="Design document reference">
          <Input
            value={formData.designDocReference || ''}
            onChange={(e) => onUpdate('designDocReference', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      {/* Handover checklist */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Handover checklist" />
        <div className="space-y-2 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-2">
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
                'w-full min-h-11 rounded-xl border px-4 py-3 text-left text-sm touch-manipulation active:scale-[0.98] transition-all',
                formData[field]
                  ? 'bg-green-500 border-green-500 text-black font-semibold'
                  : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
