/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { cn } from '@/lib/utils';
import { FireAlarmSystemCategory } from '@/types/fire-alarm';
import { FireAlarmPanelAutocomplete } from '../FireAlarmPanelAutocomplete';
import { SerialNumberScannerSheet } from '../SerialNumberScannerSheet';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
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

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <Label className={labelCn}>
      {label}
      {required && ' *'}
    </Label>
    {children}
  </div>
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

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FASystemPanel({ formData, onUpdate }: Props) {
  const [scannerOpen, setScannerOpen] = useState(false);
  const { suggestCategoryForPremises } = useFireAlarmSmartForm();

  const categorySuggestion = useMemo(() => {
    if (!formData.premisesType) return null;
    return suggestCategoryForPremises(formData.premisesType);
  }, [formData.premisesType, suggestCategoryForPremises]);

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* System category */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="System category" />
        <Field label="Category" required>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {systemCategories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => onUpdate('systemCategory', cat.value)}
                className={cn(
                  'w-full text-left rounded-xl border p-3.5 touch-manipulation active:scale-[0.98] transition-all',
                  formData.systemCategory === cat.value
                    ? 'bg-elec-yellow border-elec-yellow'
                    : 'bg-white/[0.06] border-white/[0.12]'
                )}
              >
                <p
                  className={cn(
                    'text-sm font-semibold',
                    formData.systemCategory === cat.value ? 'text-black' : 'text-white'
                  )}
                >
                  {cat.label}
                </p>
                <p
                  className={cn(
                    'text-[12px] mt-0.5',
                    formData.systemCategory === cat.value ? 'text-black/75' : 'text-white/80'
                  )}
                >
                  {cat.description}
                </p>
              </button>
            ))}
          </div>
        </Field>
        {categorySuggestion && formData.systemCategory !== categorySuggestion.recommended && (
          <div className="rounded-xl border border-amber-500/40 bg-white/[0.05] p-3">
            <p className="text-[12px] font-semibold text-amber-400">
              AI suggestion: {categorySuggestion.recommended}
            </p>
            <p className="text-[12px] text-white/85 mt-1">{categorySuggestion.reason}</p>
          </div>
        )}
        <Field label="Category justification">
          <Textarea
            value={formData.categoryJustification || ''}
            onChange={(e) => onUpdate('categoryJustification', e.target.value)}
            className={textareaCn}
            placeholder="Why this category was selected (linked to FRA)..."
          />
        </Field>
      </div>

      {/* Control panel */}
      <div className={cardCn}>
        <SectionHeader title="Control panel" />
        <Field label="Panel make & model">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Make">
            <Input
              value={formData.systemMake || ''}
              onChange={(e) => onUpdate('systemMake', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Model">
            <Input
              value={formData.systemModel || ''}
              onChange={(e) => onUpdate('systemModel', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Field label="Serial number">
              <Input
                value={formData.panelSerialNumber || ''}
                onChange={(e) => onUpdate('panelSerialNumber', e.target.value)}
                className={inputCn}
              />
            </Field>
          </div>
          <button
            type="button"
            onClick={() => setScannerOpen(true)}
            className="h-11 shrink-0 rounded-xl bg-elec-yellow px-4 text-sm font-semibold text-black touch-manipulation active:scale-[0.98] transition-transform"
          >
            Scan
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Panel location">
            <Input
              value={formData.panelLocation || ''}
              onChange={(e) => onUpdate('panelLocation', e.target.value)}
              className={inputCn}
              placeholder="e.g. Main entrance lobby"
            />
          </Field>
          <Field label="Firmware version">
            <Input
              value={formData.panelFirmware || ''}
              onChange={(e) => onUpdate('panelFirmware', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Network type">
            <ComboboxCell
              value={formData.networkType || ''}
              onChange={(v) => onUpdate('networkType', v)}
              options={networkTypeOptions}
              placeholder="Select..."
              className="h-11 text-base"
            />
          </Field>
          <Field label="Zones / loops">
            <div className="grid grid-cols-2 gap-3">
              <Input
                value={formData.zonesCount || ''}
                onChange={(e) => onUpdate('zonesCount', e.target.value)}
                className={inputCn}
                placeholder="Zones"
                type="number"
                inputMode="numeric"
              />
              <Input
                value={formData.loopCount || ''}
                onChange={(e) => onUpdate('loopCount', e.target.value)}
                className={inputCn}
                placeholder="Loops"
                type="number"
                inputMode="numeric"
              />
            </div>
          </Field>
        </div>
      </div>

      {/* Power supply */}
      <div className={cardCn}>
        <SectionHeader title="Power supply" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Mains supply">
            <Input
              value={formData.mainsSupplyDetails || ''}
              onChange={(e) => onUpdate('mainsSupplyDetails', e.target.value)}
              className={inputCn}
              placeholder="e.g. 230V, 6A MCB"
            />
          </Field>
          <Field label="Battery type">
            <ComboboxCell
              value={formData.batteryType || ''}
              onChange={(v) => onUpdate('batteryType', v)}
              options={batteryTypeOptions}
              placeholder="Select..."
              className="h-11 text-base"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Battery capacity (Ah)">
            <Input
              value={formData.batteryCapacity || ''}
              onChange={(e) => onUpdate('batteryCapacity', e.target.value)}
              inputMode="decimal"
              className={inputCn}
              placeholder="e.g. 3.2"
            />
          </Field>
          <Field label="Standby duration (hrs)">
            <ComboboxCell
              value={formData.standbyDuration || ''}
              onChange={(v) => onUpdate('standbyDuration', v)}
              options={standbyDurationOptions}
              placeholder="Select..."
              className="h-11 text-base"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Battery install date">
            <Input
              type="date"
              value={formData.batteryInstallDate || ''}
              onChange={(e) => onUpdate('batteryInstallDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Charger type">
            <Input
              value={formData.chargerType || ''}
              onChange={(e) => onUpdate('chargerType', e.target.value)}
              className={inputCn}
              placeholder="e.g. Float charge"
            />
          </Field>
        </div>
      </div>

      {/* Cable specification */}
      <div className={cardCn}>
        <SectionHeader title="Cable specification" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Cable type">
            <ComboboxCell
              value={formData.cableType || ''}
              onChange={(v) => onUpdate('cableType', v)}
              options={cableTypeOptions}
              placeholder="Select..."
              className="h-11 text-base"
            />
          </Field>
          <Field label="Fire rating">
            <ComboboxCell
              value={formData.cableFireRating || ''}
              onChange={(v) => onUpdate('cableFireRating', v)}
              options={fireRatingOptions}
              placeholder="Select..."
              className="h-11 text-base"
            />
          </Field>
        </div>
        <Field label="Circuit integrity">
          <ComboboxCell
            value={formData.circuitIntegrity || ''}
            onChange={(v) => onUpdate('circuitIntegrity', v)}
            options={[
              { value: 'standard', label: 'Standard' },
              { value: 'enhanced', label: 'Enhanced' },
              { value: 'critical-signal-path', label: 'Critical Signal Path' },
            ]}
            placeholder="Select..."
            className="h-11 text-base"
          />
        </Field>
        <label className="flex min-h-11 items-center gap-3 cursor-pointer touch-manipulation">
          <Checkbox
            checked={formData.redCableForMains || false}
            onCheckedChange={(v) => onUpdate('redCableForMains', v)}
            className={checkboxCn}
          />
          <span className="text-sm text-white">
            Red cable used for mains power circuits (BS 5839-1:2025 requirement)
          </span>
        </label>
        <Field label="Wiring notes">
          <Textarea
            value={formData.wiringNotes || ''}
            onChange={(e) => onUpdate('wiringNotes', e.target.value)}
            className={textareaCn}
            placeholder="Cable routing, segregation, mechanical protection details..."
          />
        </Field>
      </div>

      {/* Cause & effect */}
      <div className={cardCn}>
        <SectionHeader title="Cause & effect" />
        <Field label="Evacuation strategy">
          <ComboboxCell
            value={formData.evacuationStrategy || ''}
            onChange={(v) => onUpdate('evacuationStrategy', v)}
            options={evacuationStrategyOptions}
            placeholder="Select..."
            className="h-11 text-base"
          />
        </Field>
        <Field label="Cause & effect matrix reference">
          <Input
            value={formData.causeEffectReference || ''}
            onChange={(e) => onUpdate('causeEffectReference', e.target.value)}
            className={inputCn}
            placeholder="e.g. CE-001 Rev A"
          />
        </Field>
        <Field label="False alarm management strategy">
          <Textarea
            value={formData.falseAlarmStrategy || ''}
            onChange={(e) => onUpdate('falseAlarmStrategy', e.target.value)}
            className={textareaCn}
            placeholder="e.g. Coincidence detection, investigation delay, intelligent detectors..."
          />
        </Field>
      </div>

      {/* Monitoring / ARC */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Monitoring / ARC" />
        <label className="flex min-h-11 items-center gap-3 cursor-pointer touch-manipulation">
          <Checkbox
            checked={formData.systemMonitored || false}
            onCheckedChange={(v) => onUpdate('systemMonitored', v)}
            className={checkboxCn}
          />
          <span className="text-sm text-white">System monitored by Alarm Receiving Centre</span>
        </label>
        {formData.systemMonitored && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="ARC name">
                <Input
                  value={formData.arcName || ''}
                  onChange={(e) => onUpdate('arcName', e.target.value)}
                  className={inputCn}
                />
              </Field>
              <Field label="Account number">
                <Input
                  value={formData.arcAccountNumber || ''}
                  onChange={(e) => onUpdate('arcAccountNumber', e.target.value)}
                  className={inputCn}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Signalling route">
                <ComboboxCell
                  value={formData.signallingRoute || ''}
                  onChange={(v) => onUpdate('signallingRoute', v)}
                  options={signallingRouteOptions}
                  placeholder="Select..."
                  className="h-11 text-base"
                />
              </Field>
              <Field label="ARC phone">
                <Input
                  type="tel"
                  value={formData.arcPhone || ''}
                  onChange={(e) => onUpdate('arcPhone', e.target.value)}
                  className={inputCn}
                />
              </Field>
            </div>
          </>
        )}
      </div>

      {/* Serial number scanner */}
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
