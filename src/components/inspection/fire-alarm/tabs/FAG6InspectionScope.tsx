/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G6 Periodic Inspection — Tab 2: Inspection Scope
 * Extent of inspection, building changes, logbook review
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ComboboxCell from '@/components/table-cells/ComboboxCell';

const textareaCn =
  'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';
const checkboxCn =
  'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

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

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}</Label>
    {children}
  </div>
);

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAG6InspectionScope({ formData, onUpdate }: Props) {
  return (
    <div className="space-y-5">
      {/* Extent of Inspection */}
      <Section title="Extent of Inspection" accentColor="from-red-500/40 to-rose-400/20">
        <div className="space-y-2">
          {[
            {
              value: 'full-system',
              label: 'Full System Inspection',
              description: 'All areas, zones, and devices inspected',
            },
            {
              value: 'partial',
              label: 'Partial Inspection',
              description: 'Limited scope — specify below',
            },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onUpdate('extentOfInspection', opt.value)}
              className={cn(
                'w-full text-left p-4 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
                formData.extentOfInspection === opt.value
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-white/[0.03] border-white/[0.06]'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
                    formData.extentOfInspection === opt.value
                      ? 'bg-red-500 border-red-500'
                      : 'border-white/30'
                  )}
                >
                  {formData.extentOfInspection === opt.value && (
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
                      formData.extentOfInspection === opt.value ? 'text-red-400' : 'text-white'
                    )}
                  >
                    {opt.label}
                  </p>
                  <p className="text-xs text-white mt-0.5">{opt.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        {formData.extentOfInspection === 'partial' && (
          <>
            <Field label="Agreed Scope">
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
      </Section>

      {/* Building Changes */}
      <Section
        title="Building Changes Since Last Visit"
        accentColor="from-amber-500/40 to-yellow-400/20"
      >
        <div className="space-y-3">
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
            <div
              key={field}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <Checkbox
                checked={formData[field] || false}
                onCheckedChange={(v) => onUpdate(field, v)}
                className={checkboxCn}
              />
              <Label className="text-sm text-white">{label}</Label>
            </div>
          ))}
        </div>
        {(formData.changesStructural ||
          formData.changesOccupancy ||
          formData.changesEscapeRoutes ||
          formData.changesEnvironmental) && (
          <Field label="Change Details">
            <Textarea
              value={formData.buildingChangeNotes || ''}
              onChange={(e) => onUpdate('buildingChangeNotes', e.target.value)}
              className={textareaCn}
              placeholder="Describe the changes noted..."
            />
          </Field>
        )}
      </Section>

      {/* Logbook Review */}
      <Section title="System Logbook" accentColor="from-blue-500/40 to-cyan-400/20">
        <button
          type="button"
          onClick={() => onUpdate('logbookReviewed', !formData.logbookReviewed)}
          className={cn(
            'w-full text-left p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all flex items-center gap-3',
            formData.logbookReviewed
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-white/[0.03] border-white/[0.06]'
          )}
        >
          <div
            className={cn(
              'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
              formData.logbookReviewed ? 'bg-green-500 border-green-500' : 'border-white/30'
            )}
          >
            {formData.logbookReviewed && (
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
              formData.logbookReviewed ? 'text-green-400' : 'text-white'
            )}
          >
            System logbook reviewed
          </span>
        </button>
        <Field label="Logbook Notes">
          <Textarea
            value={formData.logbookNotes || ''}
            onChange={(e) => onUpdate('logbookNotes', e.target.value)}
            className={textareaCn}
            placeholder="Any entries noted in the logbook since last visit..."
          />
        </Field>
      </Section>

      {/* Weekly Testing Verification */}
      <Section title="Weekly Testing" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onUpdate('weeklyTestingConfirmed', !formData.weeklyTestingConfirmed)}
            className={cn(
              'w-full text-left p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all flex items-center gap-3',
              formData.weeklyTestingConfirmed
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-white/[0.03] border-white/[0.06]'
            )}
          >
            <div
              className={cn(
                'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
                formData.weeklyTestingConfirmed
                  ? 'bg-green-500 border-green-500'
                  : 'border-white/30'
              )}
            >
              {formData.weeklyTestingConfirmed && (
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
                formData.weeklyTestingConfirmed ? 'text-green-400' : 'text-white'
              )}
            >
              Responsible person confirms weekly call point / sounder testing
            </span>
          </button>
          <button
            type="button"
            onClick={() => onUpdate('weeklyRecordsReviewed', !formData.weeklyRecordsReviewed)}
            className={cn(
              'w-full text-left p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all flex items-center gap-3',
              formData.weeklyRecordsReviewed
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-white/[0.03] border-white/[0.06]'
            )}
          >
            <div
              className={cn(
                'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
                formData.weeklyRecordsReviewed ? 'bg-green-500 border-green-500' : 'border-white/30'
              )}
            >
              {formData.weeklyRecordsReviewed && (
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
                formData.weeklyRecordsReviewed ? 'text-green-400' : 'text-white'
              )}
            >
              Weekly test records reviewed
            </span>
          </button>
        </div>
      </Section>

      {/* False Alarm Records */}
      <Section title="False Alarm Records" accentColor="from-red-500/40 to-rose-400/20">
        <Field label="False alarms since last inspection">
          <Input
            type="number"
            inputMode="numeric"
            value={formData.falseAlarmCount || ''}
            onChange={(e) => onUpdate('falseAlarmCount', e.target.value)}
            className={
              'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]'
            }
            placeholder="0"
          />
        </Field>
        {parseInt(formData.falseAlarmCount || '0') > 0 && (
          <>
            <Field label="Primary Cause">
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
                className="h-12 text-base"
              />
            </Field>
            <Field label="Action Taken">
              <Textarea
                value={formData.falseAlarmAction || ''}
                onChange={(e) => onUpdate('falseAlarmAction', e.target.value)}
                className={textareaCn}
                placeholder="Actions taken to prevent recurrence..."
              />
            </Field>
            {parseInt(formData.falseAlarmCount || '0') > 3 && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-400">
                  More than 3 false alarms — consider a false alarm management review per BS
                  5839-1:2025 Clause 20. This may indicate detector contamination, environmental
                  issues, or inadequate alarm management strategy.
                </p>
              </div>
            )}
          </>
        )}
      </Section>
    </div>
  );
}
