/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G6 Periodic Inspection — Tab 2: Inspection Scope
 * Extent of inspection, building changes, logbook review
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import FAG6LogBookBridge from '../FAG6LogBookBridge';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const comboTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:bg-transparent hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const checkboxCn =
  'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
    {children}
  </div>
);

// Full-width confirm toggle — solid green when on
const ToggleRow = ({
  checked,
  onClick,
  label,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex min-h-11 w-full items-center rounded-xl border px-3.5 py-3 text-left text-sm touch-manipulation transition-all active:scale-[0.98]',
      checked
        ? 'border-green-500 bg-green-500 font-semibold text-black'
        : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
    )}
  >
    {label}
  </button>
);

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAG6InspectionScope({ formData, onUpdate }: Props) {
  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Extent of inspection */}
      <div className={cardCn}>
        <SectionHeader title="Extent of inspection" />
        <div className="space-y-2">
          {[
            {
              value: 'full-system',
              label: 'Full system inspection',
              description: 'All areas, zones, and devices inspected',
            },
            {
              value: 'partial',
              label: 'Partial inspection',
              description: 'Limited scope — specify below',
            },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onUpdate('extentOfInspection', opt.value)}
              className={cn(
                'w-full rounded-xl border p-4 text-left touch-manipulation transition-all active:scale-[0.98]',
                formData.extentOfInspection === opt.value
                  ? 'border-elec-yellow bg-elec-yellow'
                  : 'border-white/[0.12] bg-white/[0.06]'
              )}
            >
              <p
                className={cn(
                  'text-sm font-semibold',
                  formData.extentOfInspection === opt.value ? 'text-black' : 'text-white'
                )}
              >
                {opt.label}
              </p>
              <p
                className={cn(
                  'mt-0.5 text-[12px]',
                  formData.extentOfInspection === opt.value ? 'text-black/70' : 'text-white/80'
                )}
              >
                {opt.description}
              </p>
            </button>
          ))}
        </div>
        {formData.extentOfInspection === 'partial' && (
          <>
            <Field label="Agreed scope">
              <Textarea
                value={formData.agreedScope || ''}
                onChange={(e) => onUpdate('agreedScope', e.target.value)}
                className={textareaCn}
                placeholder="Describe the agreed scope of this inspection..."
              />
            </Field>
            <Field label="Limitations">
              <Textarea
                value={formData.inspectionLimitations || ''}
                onChange={(e) => onUpdate('inspectionLimitations', e.target.value)}
                className={textareaCn}
                placeholder="List any areas or equipment NOT inspected and why..."
              />
            </Field>
          </>
        )}
      </div>

      {/* Building changes */}
      <div className={cardCn}>
        <SectionHeader title="Building changes since last visit" />
        <div className="space-y-1">
          {[
            {
              field: 'changesStructural',
              label: 'Structural changes noted (walls, partitions, ceiling)',
            },
            { field: 'changesOccupancy', label: 'Changes in occupancy or use of premises' },
            { field: 'changesEscapeRoutes', label: 'Changes to escape routes or layout' },
            {
              field: 'changesEnvironmental',
              label: 'Environmental changes (dust, temperature, ventilation)',
            },
          ].map(({ field, label }) => (
            <label
              key={field}
              className="flex min-h-11 cursor-pointer items-center gap-3 touch-manipulation"
            >
              <Checkbox
                checked={formData[field] || false}
                onCheckedChange={(v) => onUpdate(field, v)}
                className={checkboxCn}
              />
              <span className="text-sm text-white">{label}</span>
            </label>
          ))}
        </div>
        {(formData.changesStructural ||
          formData.changesOccupancy ||
          formData.changesEscapeRoutes ||
          formData.changesEnvironmental) && (
          <Field label="Change details">
            <Textarea
              value={formData.buildingChangeNotes || ''}
              onChange={(e) => onUpdate('buildingChangeNotes', e.target.value)}
              className={textareaCn}
              placeholder="Describe the changes noted..."
            />
          </Field>
        )}
      </div>

      {/* System logbook */}
      <div className={cardCn}>
        <SectionHeader title="System logbook" />
        <ToggleRow
          checked={!!formData.logbookReviewed}
          onClick={() => onUpdate('logbookReviewed', !formData.logbookReviewed)}
          label="System logbook reviewed"
        />
        <Field label="Logbook notes">
          <Textarea
            value={formData.logbookNotes || ''}
            onChange={(e) => onUpdate('logbookNotes', e.target.value)}
            className={textareaCn}
            placeholder="Any entries noted in the logbook since last visit..."
          />
        </Field>
      </div>

      {/* Weekly testing */}
      <div className={cardCn}>
        <SectionHeader title="Weekly testing" />
        <div className="space-y-2">
          <ToggleRow
            checked={!!formData.weeklyTestingConfirmed}
            onClick={() => onUpdate('weeklyTestingConfirmed', !formData.weeklyTestingConfirmed)}
            label="Responsible person confirms weekly call point / sounder testing"
          />
          <ToggleRow
            checked={!!formData.weeklyRecordsReviewed}
            onClick={() => onUpdate('weeklyRecordsReviewed', !formData.weeklyRecordsReviewed)}
            label="Weekly test records reviewed"
          />
        </div>
      </div>

      {/* Log book bridge — pulls history from the ELE-1396 digital log */}
      <div className="lg:col-span-2">
        <FAG6LogBookBridge formData={formData} onUpdate={onUpdate} />
      </div>

      {/* False alarm records */}
      <div className={cardCn}>
        <SectionHeader title="False alarm records" />
        <Field label="False alarms since last inspection">
          <Input
            type="number"
            inputMode="numeric"
            value={formData.falseAlarmCount || ''}
            onChange={(e) => onUpdate('falseAlarmCount', e.target.value)}
            className={inputCn}
            placeholder="0"
          />
        </Field>
        {parseInt(formData.falseAlarmCount || '0') > 0 && (
          <>
            <Field label="Primary cause">
              <ComboboxCell
                value={formData.falseAlarmCause || ''}
                onChange={(v) => onUpdate('falseAlarmCause', v)}
                options={[
                  { value: 'cooking', label: 'Cooking fumes' },
                  { value: 'dust', label: 'Dust / construction' },
                  { value: 'contractor', label: 'Contractor work' },
                  { value: 'system-fault', label: 'System fault' },
                  { value: 'detector-contamination', label: 'Detector contamination' },
                  { value: 'environmental', label: 'Environmental (steam, humidity)' },
                  { value: 'malicious', label: 'Malicious activation' },
                  { value: 'unknown', label: 'Unknown' },
                ]}
                placeholder="Select cause..."
                className={comboTriggerCn}
              />
            </Field>
            <Field label="Action taken">
              <Textarea
                value={formData.falseAlarmAction || ''}
                onChange={(e) => onUpdate('falseAlarmAction', e.target.value)}
                className={textareaCn}
                placeholder="Actions taken to prevent recurrence..."
              />
            </Field>
            {parseInt(formData.falseAlarmCount || '0') > 3 && (
              <div className="rounded-xl border border-red-500/30 bg-white/[0.05] px-3.5 py-3">
                <p className="text-sm text-red-400">
                  More than 3 false alarms — consider a false alarm management review per BS
                  5839-1:2025 Clause 20. This may indicate detector contamination, environmental
                  issues, or inadequate alarm management strategy.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Service History (G6 — BS 5839-1:2025 expects the cert to reference
          maintenance carried out since the last inspection) */}
      <div className={cardCn}>
        <SectionHeader title="Service history since last inspection" />
        <Field label="Maintenance and service visits in the period">
          <Textarea
            value={formData.serviceHistorySummary || ''}
            onChange={(e) => onUpdate('serviceHistorySummary', e.target.value)}
            className={cn(textareaCn, 'min-h-[110px]')}
            placeholder={'One per line, e.g.\n12 Mar 2026 — service visit by FireCo: six-monthly inspection (satisfactory)\n03 May 2026 — battery change (panel standby)'}
          />
        </Field>
        <p className="-mt-1 text-[12px] leading-relaxed text-white/80">
          Linked a log book above? This fills itself — service visits, battery changes and
          firmware updates recorded in the period.
        </p>
      </div>

      {/* Plan & cause-and-effect references */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Zone plan & cause-and-effect" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Zone plan reference">
            <Input
              value={formData.zonePlanRef || ''}
              onChange={(e) => onUpdate('zonePlanRef', e.target.value)}
              className={inputCn}
              placeholder="Drawing no. / chart by panel"
            />
          </Field>
          <Field label="Cause &amp; effect reference">
            <Input
              value={formData.causeEffectReference || ''}
              onChange={(e) => onUpdate('causeEffectReference', e.target.value)}
              className={inputCn}
              placeholder="Matrix ref / 'simultaneous evacuation'"
            />
          </Field>
        </div>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 touch-manipulation">
          <Checkbox
            checked={formData.zonePlanVerified || false}
            onCheckedChange={(v) => onUpdate('zonePlanVerified', v)}
            className={checkboxCn}
          />
          <span className="text-sm text-white">
            Zone plan present at the panel and checked against the CIE zone text
          </span>
        </label>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 touch-manipulation">
          <Checkbox
            checked={formData.causeEffectVerified || false}
            onCheckedChange={(v) => onUpdate('causeEffectVerified', v)}
            className={checkboxCn}
          />
          <span className="text-sm text-white">
            Cause &amp; effect operation verified during this inspection
          </span>
        </label>
        <p className="text-[12px] leading-relaxed text-white/80">
          BS 5839-1:2025 treats a missing zone plan in multi-zone premises as an unacceptable
          variation — flag it as a defect if absent.
        </p>
      </div>
    </div>
  );
}
