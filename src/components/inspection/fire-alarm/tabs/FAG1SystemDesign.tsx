/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G1 Design — Tab 2: System Design
 * System category, design basis, coverage rationale, panel, cable, cause & effect, monitoring
 */

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FireAlarmSystemCategory } from '@/types/fire-alarm';
import { AlertTriangle } from 'lucide-react';
import { FireAlarmPanelAutocomplete } from '../FireAlarmPanelAutocomplete';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import {
  suggestGrade,
  getDesignWarnings,
  getEstimatedPowerSpecs,
  findPanelById,
} from '@/data/fireAlarmEquipmentDatabase';

const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const checkboxCn =
  'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';
const textareaCn =
  'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

const Section = ({
  title,
  accentColor,
  children,
}: {
  title: string;
  accentColor?: string;
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
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
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
    <Label className="text-white text-xs mb-1.5 block">
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
    <div className="space-y-5">
      {/* System Category */}
      <Section title="System Category" accentColor="from-red-500/40 to-orange-400/20">
        <Field label="Category" required>
          <div className="space-y-2">
            {systemCategories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => onUpdate('systemCategory', cat.value)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
                  formData.systemCategory === cat.value
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-white/[0.03] border-white/[0.06]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
                      formData.systemCategory === cat.value
                        ? 'bg-red-500 border-red-500'
                        : 'border-white/30'
                    )}
                  >
                    {formData.systemCategory === cat.value && (
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
                  <div>
                    <p
                      className={cn(
                        'text-sm font-semibold',
                        formData.systemCategory === cat.value ? 'text-red-400' : 'text-white'
                      )}
                    >
                      {cat.label}
                    </p>
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
                <p className="text-xs font-semibold text-amber-400">
                  AI Suggestion: {categorySuggestion.recommended}
                </p>
                <p className="text-xs text-white mt-1">{categorySuggestion.reason}</p>
              </div>
            </div>
          </div>
        )}
        <Field label="Category Justification" required>
          <Textarea
            value={formData.categoryJustification || ''}
            onChange={(e) => onUpdate('categoryJustification', e.target.value)}
            className={textareaCn}
            placeholder="Why this category was selected — must reference the FRA findings..."
          />
        </Field>
      </Section>

      {/* System Grade */}
      <Section title="System Grade" accentColor="from-red-500/40 to-orange-400/20">
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
              <button
                key={grade.value}
                type="button"
                onClick={() => onUpdate('systemGrade', grade.value)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
                  formData.systemGrade === grade.value
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-white/[0.03] border-white/[0.06]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
                      formData.systemGrade === grade.value
                        ? 'bg-red-500 border-red-500'
                        : 'border-white/30'
                    )}
                  >
                    {formData.systemGrade === grade.value && (
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
                  <div>
                    <p
                      className={cn(
                        'text-sm font-semibold',
                        formData.systemGrade === grade.value ? 'text-red-400' : 'text-white'
                      )}
                    >
                      {grade.label}
                    </p>
                    <p className="text-xs text-white mt-0.5">{grade.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Field>
        {gradeSuggestion && formData.systemGrade !== gradeSuggestion.grade && (
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-amber-400">
                  Suggested Grade: {gradeSuggestion.grade}
                </p>
                <p className="text-xs text-white mt-1">{gradeSuggestion.reason}</p>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* Compliance Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          {warnings.map((w, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20"
            >
              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-400">{w.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Design Basis (unique to G1) */}
      <Section title="Design Basis" accentColor="from-red-500/40 to-rose-400/20">
        <Field label="Design Basis" required>
          <Textarea
            value={formData.designBasis || ''}
            onChange={(e) => onUpdate('designBasis', e.target.value)}
            className={textareaCn}
            placeholder="Explain the rationale for this design — what fire risks were identified and how the design addresses them..."
          />
        </Field>
        <Field label="Coverage Rationale">
          <Textarea
            value={formData.coverageRationale || ''}
            onChange={(e) => onUpdate('coverageRationale', e.target.value)}
            className={textareaCn}
            placeholder="How the design provides adequate coverage for the identified fire hazards..."
          />
        </Field>
      </Section>

      {/* Panel Selection */}
      <Section title="Control Panel" accentColor="from-red-500/40 to-rose-400/20">
        <Field label="Panel Make & Model">
          <FireAlarmPanelAutocomplete
            value={formData.panelId || ''}
            onValueChange={(v) => onUpdate('panelId', v)}
            onPanelSelect={handlePanelSelect}
            showAutoFillBadge
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Network Type">
            <ComboboxCell
              value={formData.networkType || ''}
              onChange={(v) => onUpdate('networkType', v)}
              options={networkTypeOptions}
              placeholder="Select..."
              className="h-12 text-base"
            />
          </Field>
          <Field label="Zones / Loops">
            <div className="grid grid-cols-2 gap-2">
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
      </Section>

      {/* Cable Specification */}
      <Section title="Cable Specification" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Cable Type">
            <ComboboxCell
              value={formData.cableType || ''}
              onChange={(v) => onUpdate('cableType', v)}
              options={cableTypeOptions}
              placeholder="Select..."
              className="h-12 text-base"
            />
          </Field>
          <Field label="Circuit Integrity">
            <ComboboxCell
              value={formData.circuitIntegrity || ''}
              onChange={(v) => onUpdate('circuitIntegrity', v)}
              options={[
                { value: 'standard', label: 'Standard' },
                { value: 'enhanced', label: 'Enhanced' },
                { value: 'critical-signal-path', label: 'Critical Signal Path' },
              ]}
              placeholder="Select..."
              className="h-12 text-base"
            />
          </Field>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            checked={formData.redCableForMains || false}
            onCheckedChange={(v) => onUpdate('redCableForMains', v)}
            className={checkboxCn}
          />
          <Label className="text-sm text-white">
            Red cable specified for mains power circuits (BS 5839-1:2025)
          </Label>
        </div>
      </Section>

      {/* Battery Calculation (G1 unique) */}
      <Section title="Battery Calculation" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Quiescent Current (mA)">
            <Input
              type="number"
              inputMode="decimal"
              value={formData.quiescentCurrent || ''}
              onChange={(e) => onUpdate('quiescentCurrent', e.target.value)}
              className={inputCn}
              placeholder="e.g. 120"
            />
          </Field>
          <Field label="Alarm Current (mA)">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Required Standby (hrs)">
            <ComboboxCell
              value={formData.requiredStandby || ''}
              onChange={(v) => onUpdate('requiredStandby', v)}
              options={[
                { value: '24', label: '24 hours' },
                { value: '72', label: '72 hours' },
              ]}
              placeholder="Select..."
              className="h-12 text-base"
            />
          </Field>
          <Field label="Calculated Capacity (Ah)">
            <div className="h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center px-3 text-base text-white font-semibold">
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
      </Section>

      {/* Sound Level Design Targets */}
      <Section title="Sound Level Design Targets" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="General Areas Min (dB)">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.soundTargetGeneral || '65'}
              onChange={(e) => onUpdate('soundTargetGeneral', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Sleeping Areas Min (dB)">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.soundTargetSleeping || '75'}
              onChange={(e) => onUpdate('soundTargetSleeping', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Sound Design Notes">
          <Textarea
            value={formData.soundDesignNotes || ''}
            onChange={(e) => onUpdate('soundDesignNotes', e.target.value)}
            className="touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500"
            placeholder="How the design achieves required sound levels in all areas..."
          />
        </Field>
      </Section>

      {/* Cause & Effect */}
      <Section title="Cause & Effect" accentColor="from-blue-500/40 to-cyan-400/20">
        <Field label="Evacuation Strategy">
          <ComboboxCell
            value={formData.evacuationStrategy || ''}
            onChange={(v) => onUpdate('evacuationStrategy', v)}
            options={evacuationStrategyOptions}
            placeholder="Select..."
            className="h-12 text-base"
          />
        </Field>
        <Field label="Cause & Effect Reference">
          <Input
            value={formData.causeEffectReference || ''}
            onChange={(e) => onUpdate('causeEffectReference', e.target.value)}
            className={inputCn}
            placeholder="e.g. CE-001 Rev A"
          />
        </Field>
        <Field label="False Alarm Management Strategy">
          <Textarea
            value={formData.falseAlarmStrategy || ''}
            onChange={(e) => onUpdate('falseAlarmStrategy', e.target.value)}
            className="touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500"
            placeholder="e.g. Coincidence detection, investigation delay..."
          />
        </Field>
      </Section>

      {/* Monitoring / ARC */}
      <Section title="Monitoring / ARC" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={formData.systemMonitored || false}
            onCheckedChange={(v) => onUpdate('systemMonitored', v)}
            className={checkboxCn}
          />
          <Label className="text-sm text-white">
            System to be monitored by Alarm Receiving Centre
          </Label>
        </div>
        {formData.systemMonitored && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="ARC Name">
                <Input
                  value={formData.arcName || ''}
                  onChange={(e) => onUpdate('arcName', e.target.value)}
                  className={inputCn}
                />
              </Field>
              <Field label="Signalling Route">
                <ComboboxCell
                  value={formData.signallingRoute || ''}
                  onChange={(v) => onUpdate('signallingRoute', v)}
                  options={signallingRouteOptions}
                  placeholder="Select..."
                  className="h-12 text-base"
                />
              </Field>
            </div>
          </>
        )}
      </Section>
    </div>
  );
}
