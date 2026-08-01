/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G1 Design — Tab 2: System Design
 * System category, design basis, coverage rationale, panel, cable, cause & effect, monitoring
 */

import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { FireAlarmSystemCategory } from '@/types/fire-alarm';
import { FireAlarmPanelAutocomplete } from '../FireAlarmPanelAutocomplete';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import {
  suggestGrade,
  getDesignWarnings,
  getEstimatedPowerSpecs,
  findPanelById,
} from '@/data/fireAlarmEquipmentDatabase';

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

/* Solid volt chip rows for category / grade choices */
const ChipRow = ({
  isActive,
  label,
  description,
  onClick,
}: {
  isActive: boolean;
  label: string;
  description: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'w-full text-left p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
      isActive ? 'bg-elec-yellow border-elec-yellow' : 'bg-white/[0.06] border-white/[0.12]'
    )}
  >
    <p className={cn('text-sm font-semibold', isActive ? 'text-black' : 'text-white')}>{label}</p>
    <p className={cn('text-xs mt-0.5', isActive ? 'text-black/70' : 'text-white/80')}>
      {description}
    </p>
  </button>
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
];

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAG1SystemDesign({ formData, onUpdate }: Props) {
  const { suggestCategoryForPremises } = useFireAlarmSmartForm();

  // Smart: grade suggestion
  const gradeSuggestion = useMemo(() => {
    if (!formData.premisesType) return null;
    return suggestGrade(formData.premisesType);
  }, [formData.premisesType]);

  // Smart: compliance warnings
  const warnings = useMemo(() => getDesignWarnings(formData), [formData]);

  // Smart: auto-fill battery from panel
  const handlePanelSelect = (panel: any, defaults: any) => {
    if (panel) {
      onUpdate('systemMake', panel.manufacturer);
      onUpdate('systemModel', panel.model);
      if (defaults) {
        onUpdate('networkType', defaults.networkType || '');
        onUpdate('zonesCount', defaults.zonesCount?.toString() || '');
      }
      // Auto-fill battery specs from panel
      const fullPanel = findPanelById(panel.id || formData.panelId);
      if (fullPanel) {
        const specs = getEstimatedPowerSpecs(fullPanel);
        if (!formData.quiescentCurrent)
          onUpdate('quiescentCurrent', specs.quiescentCurrent.toString());
        if (!formData.alarmCurrent) onUpdate('alarmCurrent', specs.alarmCurrent.toString());
      }
    }
  };

  const categorySuggestion = useMemo(() => {
    if (!formData.premisesType) return null;
    return suggestCategoryForPremises(formData.premisesType);
  }, [formData.premisesType, suggestCategoryForPremises]);

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* System category */}
      <div className={cardCn}>
        <SectionHeader title="System category" />
        <Field label="Category" required>
          <div className="space-y-2">
            {systemCategories.map((cat) => (
              <ChipRow
                key={cat.value}
                isActive={formData.systemCategory === cat.value}
                label={cat.label}
                description={cat.description}
                onClick={() => onUpdate('systemCategory', cat.value)}
              />
            ))}
          </div>
        </Field>
        {categorySuggestion && formData.systemCategory !== categorySuggestion.recommended && (
          <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] p-3">
            <p className="text-xs font-semibold text-amber-400">
              AI Suggestion: {categorySuggestion.recommended}
            </p>
            <p className="text-xs text-white/85 mt-1">{categorySuggestion.reason}</p>
          </div>
        )}
        <Field label="Category justification" required>
          <Textarea
            value={formData.categoryJustification || ''}
            onChange={(e) => onUpdate('categoryJustification', e.target.value)}
            className={textareaCn}
            placeholder="Why this category was selected — must reference the FRA findings..."
          />
        </Field>
      </div>

      {/* System grade */}
      <div className={cardCn}>
        <SectionHeader title="System grade" />
        <Field label="Grade" required>
          <div className="space-y-2">
            {[
              {
                value: 'A',
                label: 'Grade A',
                description: 'Wired to BS EN 54-2 panel with BS EN 54 devices',
              },
              {
                value: 'B',
                label: 'Grade B',
                description: 'Wired to BS EN 54-2 panel with proprietary devices',
              },
              {
                value: 'C',
                label: 'Grade C',
                description: 'Conventional system using BS EN 54 devices',
              },
              {
                value: 'D',
                label: 'Grade D',
                description: 'Domestic — mains-powered with battery backup',
              },
              { value: 'E', label: 'Grade E', description: 'Domestic — battery-only' },
              { value: 'F', label: 'Grade F', description: 'Non-BS EN 54 devices' },
            ].map((grade) => (
              <ChipRow
                key={grade.value}
                isActive={formData.systemGrade === grade.value}
                label={grade.label}
                description={grade.description}
                onClick={() => onUpdate('systemGrade', grade.value)}
              />
            ))}
          </div>
        </Field>
        {gradeSuggestion && formData.systemGrade !== gradeSuggestion.grade && (
          <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] p-3">
            <p className="text-xs font-semibold text-amber-400">
              Suggested Grade: {gradeSuggestion.grade}
            </p>
            <p className="text-xs text-white/85 mt-1">{gradeSuggestion.reason}</p>
          </div>
        )}
      </div>

      {/* Compliance warnings */}
      {warnings.length > 0 && (
        <div className="space-y-2 lg:col-span-2">
          {warnings.map((w, i) => (
            <div key={i} className="p-3 rounded-xl border border-red-500/40 bg-white/[0.05]">
              <p className="text-xs text-red-400">{w.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Design basis (unique to G1) */}
      <div className={cardCn}>
        <SectionHeader title="Design basis" />
        <Field label="Design basis" required>
          <Textarea
            value={formData.designBasis || ''}
            onChange={(e) => onUpdate('designBasis', e.target.value)}
            className={textareaCn}
            placeholder="Explain the rationale for this design — what fire risks were identified and how the design addresses them..."
          />
        </Field>
        <Field label="Coverage rationale">
          <Textarea
            value={formData.coverageRationale || ''}
            onChange={(e) => onUpdate('coverageRationale', e.target.value)}
            className={textareaCn}
            placeholder="How the design provides adequate coverage for the identified fire hazards..."
          />
        </Field>
      </div>

      {/* Panel selection */}
      <div className={cardCn}>
        <SectionHeader title="Control panel" />
        <Field label="Panel make & model">
          <FireAlarmPanelAutocomplete
            value={formData.panelId || ''}
            onValueChange={(v) => onUpdate('panelId', v)}
            onPanelSelect={handlePanelSelect}
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
            <div className="grid grid-cols-2 gap-x-6">
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
        </div>
        <label className="flex min-h-11 items-center gap-3 cursor-pointer touch-manipulation">
          <Checkbox
            checked={formData.redCableForMains || false}
            onCheckedChange={(v) => onUpdate('redCableForMains', v)}
            className={checkboxCn}
          />
          <span className="text-sm text-white">
            Red cable specified for mains power circuits (BS 5839-1:2025)
          </span>
        </label>
      </div>

      {/* Battery calculation (G1 unique) */}
      <div className={cardCn}>
        <SectionHeader title="Battery calculation" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Quiescent current (mA)">
            <Input
              type="number"
              inputMode="decimal"
              value={formData.quiescentCurrent || ''}
              onChange={(e) => onUpdate('quiescentCurrent', e.target.value)}
              className={inputCn}
              placeholder="e.g. 120"
            />
          </Field>
          <Field label="Alarm current (mA)">
            <Input
              type="number"
              inputMode="decimal"
              value={formData.alarmCurrent || ''}
              onChange={(e) => onUpdate('alarmCurrent', e.target.value)}
              className={inputCn}
              placeholder="e.g. 850"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Required standby (hrs)">
            <ComboboxCell
              value={formData.requiredStandby || ''}
              onChange={(v) => onUpdate('requiredStandby', v)}
              options={[
                { value: '24', label: '24 hours' },
                { value: '72', label: '72 hours' },
              ]}
              placeholder="Select..."
              className="h-11 text-base"
            />
          </Field>
          <Field label="Calculated capacity (Ah)">
            <div className="flex h-11 items-center rounded-xl bg-white/[0.05] px-3.5 text-base font-semibold text-elec-yellow">
              {(() => {
                const q = parseFloat(formData.quiescentCurrent || '0');
                const a = parseFloat(formData.alarmCurrent || '0');
                const h = parseFloat(formData.requiredStandby || '24');
                if (!q && !a) return '—';
                const capacity = (q * h + a * 0.5) / 1000;
                return `${capacity.toFixed(1)} Ah`;
              })()}
            </div>
          </Field>
        </div>
      </div>

      {/* Sound level design targets */}
      <div className={cardCn}>
        <SectionHeader title="Sound level design targets" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="General areas min (dB)">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.soundTargetGeneral || '65'}
              onChange={(e) => onUpdate('soundTargetGeneral', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Sleeping areas min (dB)">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.soundTargetSleeping || '75'}
              onChange={(e) => onUpdate('soundTargetSleeping', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Sound design notes">
          <Textarea
            value={formData.soundDesignNotes || ''}
            onChange={(e) => onUpdate('soundDesignNotes', e.target.value)}
            className={textareaCn}
            placeholder="How the design achieves required sound levels in all areas..."
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
        <Field label="Cause & effect reference">
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
            placeholder="e.g. Coincidence detection, investigation delay..."
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
          <span className="text-sm text-white">
            System to be monitored by Alarm Receiving Centre
          </span>
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
              <Field label="Signalling route">
                <ComboboxCell
                  value={formData.signallingRoute || ''}
                  onChange={(v) => onUpdate('signallingRoute', v)}
                  options={signallingRouteOptions}
                  placeholder="Select..."
                  className="h-11 text-base"
                />
              </Field>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
