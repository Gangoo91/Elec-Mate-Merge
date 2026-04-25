/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Solar PV System Design Tab — Best-in-Class Mobile
 * PV Arrays, Inverters, Battery Storage
 */

import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SolarPVFormData,
  getDefaultPVArray,
  getDefaultInverter,
  ORIENTATIONS,
  SHADING_FACTORS,
  MOUNTING_TYPE_OPTIONS,
  INVERTER_TYPE_OPTIONS,
  BATTERY_CHEMISTRY_OPTIONS,
  DC_CABLE_TYPES,
  YIELD_CALCULATION_OPTIONS,
} from '@/types/solar-pv';
import { PVPanelAutocomplete } from './PVPanelAutocomplete';
import { InverterAutocomplete } from './InverterAutocomplete';
import { useSolarPVSmartForm } from '@/hooks/inspection/useSolarPVSmartForm';
import { useHaptic } from '@/hooks/useHaptic';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import { Section, Field, inputCn, inputSmCn, textareaCn, CheckboxCard, DesignWarningBanner } from './SolarPVSection';
import { estimateAnnualYield } from '@/data/solarPanelDatabase';

interface Props {
  formData: SolarPVFormData;
  onUpdate: (field: string, value: unknown) => void;
}

const SolarPVSystemDesign: React.FC<Props> = ({ formData, onUpdate }) => {
  const smartForm = useSolarPVSmartForm(formData, onUpdate);
  const haptic = useHaptic();

  // Show design warnings relevant to system design
  const warnings = smartForm.getDesignWarnings(formData as any).filter(
    (w) => w.field.startsWith('inverters') || w.field.startsWith('arrays') || w.field === 'mcsDetails.installerNumber'
  );

  const addArray = useCallback(() => {
    haptic.light();
    const newArray = getDefaultPVArray(formData.arrays.length + 1);
    onUpdate('arrays', [...formData.arrays, newArray]);
  }, [formData.arrays, onUpdate]);

  const removeArray = useCallback(
    (index: number) => {
      haptic.medium();
      const updatedArrays = formData.arrays
        .filter((_, i) => i !== index)
        .map((arr, i) => ({ ...arr, arrayNumber: i + 1 }));
      onUpdate('arrays', updatedArrays);
      smartForm.recalculateAllValues({ ...formData, arrays: updatedArrays }, onUpdate);
    },
    [formData, onUpdate, smartForm]
  );

  const updateArray = useCallback(
    (index: number, field: string, value: unknown) => {
      const updatedArrays = [...formData.arrays];
      updatedArrays[index] = { ...updatedArrays[index], [field]: value };
      if (
        ['panelWattage', 'panelCount', 'vocRated', 'iscRated', 'vmpRated', 'impRated', 'panelsPerString', 'stringsInParallel', 'orientation', 'tiltAngle', 'shadingFactor'].includes(field)
      ) {
        const calculated = smartForm.calculateArrayValues(updatedArrays[index]);
        updatedArrays[index] = { ...updatedArrays[index], ...calculated };
      }
      onUpdate('arrays', updatedArrays);
      const totalCapacity = updatedArrays.reduce((sum, a) => sum + (a.panelWattage * a.panelCount) / 1000, 0);
      onUpdate('totalCapacity', Math.round(totalCapacity * 100) / 100);
      const totalYield = updatedArrays.reduce((sum, a) => {
        const cap = (a.panelWattage * a.panelCount) / 1000;
        return sum + estimateAnnualYield(cap, a.orientation, a.tiltAngle, a.shadingFactor);
      }, 0);
      onUpdate('estimatedAnnualYield', Math.round(totalYield));
    },
    [formData.arrays, onUpdate, smartForm]
  );

  const addInverter = useCallback(() => {
    haptic.light();
    onUpdate('inverters', [...formData.inverters, getDefaultInverter()]);
  }, [formData.inverters, onUpdate]);

  const removeInverter = useCallback(
    (index: number) => {
      haptic.medium();
      onUpdate('inverters', formData.inverters.filter((_, i) => i !== index));
    },
    [formData.inverters, onUpdate]
  );

  const updateInverter = useCallback(
    (index: number, field: string, value: unknown) => {
      const updated = [...formData.inverters];
      updated[index] = { ...updated[index], [field]: value };
      onUpdate('inverters', updated);
    },
    [formData.inverters, onUpdate]
  );

  return (
    <div className="space-y-6">
      {/* System Summary — inline stats */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-xl font-bold text-amber-400">{formData.totalCapacity?.toFixed(1) || '0'}</span>
            <span className="text-xs text-white ml-1">kWp</span>
          </div>
          <div className="w-px h-5 bg-white/[0.08]" />
          <div>
            <span className="text-xl font-bold text-green-400">{formData.estimatedAnnualYield?.toLocaleString() || '0'}</span>
            <span className="text-xs text-white ml-1">kWh/yr</span>
          </div>
        </div>
        <div>
          <span className="text-sm font-semibold text-emerald-400">
            {formData.co2SavingsAnnual?.toLocaleString() || Math.round((formData.estimatedAnnualYield || 0) * 0.233).toLocaleString()}
          </span>
          <span className="text-[10px] text-white/30 ml-1">kg CO₂</span>
        </div>
      </div>

      <DesignWarningBanner warnings={warnings} />

      {/* PV Arrays */}
      <Section title="PV Arrays" accentColor="from-amber-500/40 to-yellow-400/20" count={formData.arrays?.length}>
        {formData.arrays?.map((array, index) => (
          <div key={array.id} className="space-y-4">
            {/* Array header — clean inline */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-xs font-bold text-amber-400">
                  {array.arrayNumber}
                </span>
                <div>
                  <span className="text-sm font-semibold text-white">Array {array.arrayNumber}</span>
                  {array.arrayCapacity > 0 && (
                    <span className="text-xs text-amber-400 ml-2">{array.arrayCapacity.toFixed(2)} kWp</span>
                  )}
                </div>
              </div>
              {formData.arrays.length > 1 && (
                <button
                  onClick={() => removeArray(index)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Panel selector */}
              <Field label="Panel Make & Model">
                <PVPanelAutocomplete
                  value={array.panelMake && array.panelModel ? `${array.panelMake} ${array.panelModel}` : ''}
                  onPanelSelect={(panel) => {
                    if (panel) smartForm.updateArrayWithPanelSelection(index, panel.id, formData, onUpdate);
                  }}
                  placeholder="Search for a panel..."
                />
                {array.mcsCertified && array.panelMake && (
                  <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
                    <CheckCircle className="h-3 w-3" /> MCS Certified
                  </div>
                )}
              </Field>

              {/* Panel specs — 2 cols mobile */}
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Wattage (Wp)">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={array.panelWattage || ''}
                    onChange={(e) => updateArray(index, 'panelWattage', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                    className={inputSmCn}
                  />
                </Field>
                <Field label="Panel Count">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={array.panelCount || ''}
                    onChange={(e) => updateArray(index, 'panelCount', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                    className={inputSmCn}
                  />
                </Field>
                <Field label="Voc (V)">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    value={array.vocRated || ''}
                    onChange={(e) => updateArray(index, 'vocRated', e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
                    className={inputSmCn}
                  />
                </Field>
                <Field label="Isc (A)">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    value={array.iscRated || ''}
                    onChange={(e) => updateArray(index, 'iscRated', e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
                    className={inputSmCn}
                  />
                </Field>
              </div>

              {/* String config — 2 cols */}
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Panels/String">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={array.panelsPerString || array.panelCount}
                    onChange={(e) => updateArray(index, 'panelsPerString', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                    className={inputSmCn}
                  />
                </Field>
                <Field label="Strings Parallel">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={array.stringsInParallel || 1}
                    onChange={(e) => updateArray(index, 'stringsInParallel', e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                    className={inputSmCn}
                  />
                </Field>
                <Field label="String Voc (V)">
                  <Input
                    value={array.stringVoltageVoc?.toFixed(1) || '—'}
                    disabled
                    className={cn(inputSmCn, 'bg-white/[0.03] text-amber-400')}
                  />
                </Field>
                <Field label="Total Isc (A)">
                  <Input
                    value={array.stringCurrentIsc?.toFixed(2) || '—'}
                    disabled
                    className={cn(inputSmCn, 'bg-white/[0.03] text-amber-400')}
                  />
                </Field>
              </div>

              {/* Orientation & Mounting — 2 cols */}
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Orientation">
                  <ComboboxCell
                    value={array.orientation || 'South'}
                    onChange={(v) => updateArray(index, 'orientation', v)}
                    options={ORIENTATIONS.map((o) => ({ value: o.value, label: o.label }))}
                    placeholder="Direction..."
                    className="h-10 text-sm"
                    allowCustom
                  />
                </Field>
                <Field label="Tilt Angle (°)">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={array.tiltAngle || 35}
                    onChange={(e) => updateArray(index, 'tiltAngle', parseInt(e.target.value) || 35)}
                    className={inputSmCn}
                  />
                </Field>
                <Field label="Shading Factor">
                  <ComboboxCell
                    value={array.shadingFactor?.toString() || '1'}
                    onChange={(v) => updateArray(index, 'shadingFactor', parseFloat(v))}
                    options={SHADING_FACTORS.map((s) => ({ value: s.value.toString(), label: s.label }))}
                    placeholder="Shading..."
                    className="h-10 text-sm"
                    allowCustom
                  />
                </Field>
                <Field label="Mounting Type">
                  <ComboboxCell
                    value={array.mountingType || 'roof-mounted'}
                    onChange={(v) => updateArray(index, 'mountingType', v)}
                    options={MOUNTING_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                    placeholder="Mounting..."
                    className="h-10 text-sm"
                    allowCustom
                  />
                </Field>
              </div>

              {/* DC Cabling */}
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="DC Cable Type">
                  <ComboboxCell
                    value={array.dcCableType || 'H1Z2Z2-K'}
                    onChange={(v) => updateArray(index, 'dcCableType', v)}
                    options={DC_CABLE_TYPES.map((c) => ({ value: c.value, label: c.label }))}
                    placeholder="Cable..."
                    className="h-10 text-sm"
                    allowCustom={true}
                  />
                </Field>
                <Field label="Cable Size (mm²)">
                  <Input
                    type="number"
                    inputMode="decimal"
                    value={array.dcCableSize || ''}
                    onChange={(e) => updateArray(index, 'dcCableSize', parseFloat(e.target.value) || 0)}
                    className={inputSmCn}
                    placeholder="e.g., 6"
                  />
                </Field>
              </div>

              {/* Notes */}
              <Field label="Array Notes">
                <Textarea
                  value={array.notes || ''}
                  onChange={(e) => updateArray(index, 'notes', e.target.value)}
                  className={textareaCn}
                  placeholder="Additional details..."
                />
              </Field>
            </div>
          </div>
        ))}

        <button
          onClick={addArray}
          className="w-full h-12 rounded-xl border-2 border-dashed border-amber-500/20 flex items-center justify-center gap-2 text-sm font-medium text-amber-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Array
        </button>
      </Section>

      {/* Inverters */}
      <Section title="Inverter(s)" accentColor="from-blue-500/40 to-cyan-400/20" count={formData.inverters?.length}>
        {formData.inverters?.map((inverter, index) => (
          <div key={inverter.id} className="space-y-4">
            {/* Inverter header — clean inline */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center text-xs font-bold text-blue-400">
                  {index + 1}
                </span>
                <div>
                  <span className="text-sm font-semibold text-white">Inverter {index + 1}</span>
                  {inverter.ratedPowerAc > 0 && (
                    <span className="text-xs text-blue-400 ml-2">{inverter.ratedPowerAc} kW</span>
                  )}
                </div>
              </div>
              {formData.inverters.length > 1 && (
                <button
                  onClick={() => removeInverter(index)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <Field label="Inverter Make & Model">
                <InverterAutocomplete
                  value={inverter.make && inverter.model ? `${inverter.make} ${inverter.model}` : ''}
                  onInverterSelect={(sel) => {
                    if (sel) smartForm.updateInverterWithSelection(index, sel.id, formData, onUpdate);
                  }}
                  placeholder="Search for an inverter..."
                />
                {inverter.mcsCertified && inverter.make && (
                  <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
                    <CheckCircle className="h-3 w-3" /> MCS Certified
                  </div>
                )}
              </Field>

              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Serial Number">
                  <Input
                    value={inverter.serialNumber || ''}
                    onChange={(e) => updateInverter(index, 'serialNumber', e.target.value)}
                    className={inputSmCn}
                  />
                </Field>
                <Field label="AC Power (kW)">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={inverter.ratedPowerAc || ''}
                    onChange={(e) => updateInverter(index, 'ratedPowerAc', parseFloat(e.target.value) || 0)}
                    className={inputSmCn}
                  />
                </Field>
                <Field label="Inverter Type">
                  <ComboboxCell
                    value={inverter.type || 'string'}
                    onChange={(v) => updateInverter(index, 'type', v)}
                    options={INVERTER_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                    placeholder="Type..."
                    className="h-10 text-sm"
                    allowCustom
                  />
                </Field>
                <Field label="MPPT Count">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={inverter.mpptCount || 2}
                    onChange={(e) => updateInverter(index, 'mpptCount', parseInt(e.target.value) || 1)}
                    className={inputSmCn}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Max DC Voltage (V)">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={inverter.maxInputVoltage || ''}
                    onChange={(e) => updateInverter(index, 'maxInputVoltage', parseInt(e.target.value) || 0)}
                    className={inputSmCn}
                  />
                </Field>
                <Field label="Location">
                  <Input
                    value={inverter.location || ''}
                    onChange={(e) => updateInverter(index, 'location', e.target.value)}
                    placeholder="e.g., Garage"
                    className={inputSmCn}
                  />
                </Field>
                <Field label="Phases">
                  <div className="flex gap-1.5">
                    {(['single', 'three'] as const).map((phase) => (
                      <button
                        key={phase}
                        type="button"
                        onClick={() => updateInverter(index, 'phases', phase)}
                        className={cn(
                          'flex-1 h-10 rounded-lg border text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all',
                          inverter.phases === phase
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-white/[0.03] border-white/[0.1] text-white/50'
                        )}
                      >
                        {phase === 'single' ? '1Φ' : '3Φ'}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Efficiency (%)">
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={inverter.efficiency || ''}
                    onChange={(e) => updateInverter(index, 'efficiency', parseFloat(e.target.value) || 0)}
                    className={inputSmCn}
                  />
                </Field>
              </div>

              <Field label="Notes">
                <Textarea
                  value={inverter.notes || ''}
                  onChange={(e) => updateInverter(index, 'notes', e.target.value)}
                  className={textareaCn}
                  placeholder="Additional details..."
                />
              </Field>
            </div>
          </div>
        ))}

        <button
          onClick={addInverter}
          className="w-full h-12 rounded-xl border-2 border-dashed border-blue-500/20 flex items-center justify-center gap-2 text-sm font-medium text-blue-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Inverter
        </button>
      </Section>

      {/* Battery Storage */}
      <Section title="Battery Storage" accentColor="from-green-500/40 to-emerald-400/20">
        <CheckboxCard
          label="Battery Storage Included"
          description="Battery storage included in this installation"
          checked={!!formData.battery?.installed}
          onChange={(v) => onUpdate('battery', { ...formData.battery, installed: v })}
          accentColor="green"
        />

        {formData.battery?.installed && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Make">
                <Input
                  value={formData.battery?.make || ''}
                  onChange={(e) => onUpdate('battery', { ...formData.battery, make: e.target.value })}
                  placeholder="e.g., GivEnergy"
                  className={inputSmCn}
                />
              </Field>
              <Field label="Model">
                <Input
                  value={formData.battery?.model || ''}
                  onChange={(e) => onUpdate('battery', { ...formData.battery, model: e.target.value })}
                  placeholder="e.g., All-in-One"
                  className={inputSmCn}
                />
              </Field>
              <Field label="Serial Number">
                <Input
                  value={formData.battery?.serialNumber || ''}
                  onChange={(e) => onUpdate('battery', { ...formData.battery, serialNumber: e.target.value })}
                  className={inputSmCn}
                />
              </Field>
              <Field label="Usable Capacity (kWh)">
                <Input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={formData.battery?.capacity || ''}
                  onChange={(e) => onUpdate('battery', { ...formData.battery, capacity: parseFloat(e.target.value) || 0 })}
                  className={inputSmCn}
                />
              </Field>
            </div>

            <Field label="Chemistry">
              <ComboboxCell
                value={formData.battery?.chemistry || 'lithium-ion'}
                onChange={(v) => onUpdate('battery', { ...formData.battery, chemistry: v })}
                options={BATTERY_CHEMISTRY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                placeholder="Select chemistry..."
                className="h-10 text-sm"
                allowCustom={false}
              />
            </Field>

            <Field label="Location">
              <Input
                value={formData.battery?.location || ''}
                onChange={(e) => onUpdate('battery', { ...formData.battery, location: e.target.value })}
                placeholder="e.g., Garage, Utility Room"
                className={inputCn}
              />
            </Field>
          </div>
        )}
      </Section>

      {/* Yield Calculation — MCS requirement */}
      <Section title="Yield Calculation" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Calculation Method *">
            <ComboboxCell
              value={formData.yieldCalculationMethod || 'mcs-estimator'}
              onChange={(v) => onUpdate('yieldCalculationMethod', v)}
              options={YIELD_CALCULATION_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
              placeholder="Method..."
              className="h-10 text-sm"
              allowCustom={false}
            />
          </Field>
          <Field label="Calculation Notes">
            <Input
              value={formData.yieldCalculationNotes || ''}
              onChange={(e) => onUpdate('yieldCalculationNotes', e.target.value)}
              placeholder="kWh/kWp ratio..."
              className={inputSmCn}
            />
          </Field>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <p className="text-[10px] text-white">
            <strong>MCS:</strong> Yield estimates must use an approved methodology. MCS Yield Estimator or SAP 2012 are most commonly accepted.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default SolarPVSystemDesign;
