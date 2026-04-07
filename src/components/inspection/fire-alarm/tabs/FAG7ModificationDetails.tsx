/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G7 Modification — Tab 2: Modification Details
 * What was modified, why, extent, impact assessment
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAG7ModificationDetails({ formData, onUpdate }: Props) {
  return (
    <div className="space-y-5">
      {/* Modification Type */}
      <Section title="Type of Work" accentColor="from-red-500/40 to-rose-400/20">
        <div className="space-y-2">
          {[
            {
              value: 'extension',
              label: 'Extension',
              description: 'Adding new devices or zones to existing system',
            },
            {
              value: 'alteration',
              label: 'Alteration',
              description: 'Changing existing devices, circuits, or programming',
            },
            {
              value: 'replacement',
              label: 'Replacement',
              description: 'Replacing components with equivalent or upgraded',
            },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onUpdate('modificationType', opt.value)}
              className={cn(
                'w-full text-left p-4 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
                formData.modificationType === opt.value
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-white/[0.03] border-white/[0.06]'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
                    formData.modificationType === opt.value
                      ? 'bg-red-500 border-red-500'
                      : 'border-white/30'
                  )}
                >
                  {formData.modificationType === opt.value && (
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
                      formData.modificationType === opt.value ? 'text-red-400' : 'text-white'
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
      </Section>

      {/* Modification Description */}
      <Section title="Modification Details" accentColor="from-amber-500/40 to-yellow-400/20">
        <Field label="Description of Modification" required>
          <Textarea
            value={formData.modificationDescription || ''}
            onChange={(e) => onUpdate('modificationDescription', e.target.value)}
            className={textareaCn}
            placeholder="Describe what was modified, added, or altered..."
          />
        </Field>
        <Field label="Reason for Modification">
          <Textarea
            value={formData.modificationReason || ''}
            onChange={(e) => onUpdate('modificationReason', e.target.value)}
            className={textareaCn}
            placeholder="Why the modification was needed..."
          />
        </Field>
        <Field label="Extent of Modification">
          <Textarea
            value={formData.modificationExtent || ''}
            onChange={(e) => onUpdate('modificationExtent', e.target.value)}
            className={textareaCn}
            placeholder="Which zones, areas, or floors were affected..."
          />
        </Field>
      </Section>

      {/* Impact Assessment */}
      <Section title="Impact Assessment" accentColor="from-blue-500/40 to-cyan-400/20">
        <Field label="Impact on Existing System">
          <Textarea
            value={formData.impactAssessment || ''}
            onChange={(e) => onUpdate('impactAssessment', e.target.value)}
            className={textareaCn}
            placeholder="How the modification affects the existing system — coverage, zoning, cause & effect, power supply..."
          />
        </Field>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Checkbox
              checked={formData.causeEffectUpdated || false}
              onCheckedChange={(v) => onUpdate('causeEffectUpdated', v)}
              className={checkboxCn}
            />
            <Label className="text-sm text-white">Cause & effect matrix updated</Label>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Checkbox
              checked={formData.drawingsUpdated || false}
              onCheckedChange={(v) => onUpdate('drawingsUpdated', v)}
              className={checkboxCn}
            />
            <Label className="text-sm text-white">System drawings updated</Label>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Checkbox
              checked={formData.logbookUpdated || false}
              onCheckedChange={(v) => onUpdate('logbookUpdated', v)}
              className={checkboxCn}
            />
            <Label className="text-sm text-white">System logbook updated</Label>
          </div>
        </div>
      </Section>

      {/* Device Counts */}
      <Section title="Device Changes" accentColor="from-red-500/40 to-rose-400/20">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Detectors Added">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.detectorsAdded || ''}
              onChange={(e) => onUpdate('detectorsAdded', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Detectors Removed">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.detectorsRemoved || ''}
              onChange={(e) => onUpdate('detectorsRemoved', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Call Points Added">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.callPointsAdded || ''}
              onChange={(e) => onUpdate('callPointsAdded', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Call Points Removed">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.callPointsRemoved || ''}
              onChange={(e) => onUpdate('callPointsRemoved', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Sounders Added">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.soundersAdded || ''}
              onChange={(e) => onUpdate('soundersAdded', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Sounders Removed">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.soundersRemoved || ''}
              onChange={(e) => onUpdate('soundersRemoved', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Zones Added">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.zonesAdded || ''}
              onChange={(e) => onUpdate('zonesAdded', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Zones Removed">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.zonesRemoved || ''}
              onChange={(e) => onUpdate('zonesRemoved', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
        </div>
        {/* Net change summary */}
        {(() => {
          const netDet =
            parseInt(formData.detectorsAdded || '0') - parseInt(formData.detectorsRemoved || '0');
          const netCP =
            parseInt(formData.callPointsAdded || '0') - parseInt(formData.callPointsRemoved || '0');
          const netSnd =
            parseInt(formData.soundersAdded || '0') - parseInt(formData.soundersRemoved || '0');
          const netZones =
            parseInt(formData.zonesAdded || '0') - parseInt(formData.zonesRemoved || '0');
          if (!netDet && !netCP && !netSnd && !netZones) return null;
          const format = (n: number, label: string) =>
            n === 0 ? null : `${n > 0 ? '+' : ''}${n} ${label}`;
          const changes = [
            format(netDet, 'detectors'),
            format(netCP, 'call points'),
            format(netSnd, 'sounders'),
            format(netZones, 'zones'),
          ].filter(Boolean);
          return (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
              <p className="text-[10px] text-white uppercase tracking-wider mb-1">Net Change</p>
              <p className="text-sm font-semibold text-elec-yellow">{changes.join('  ·  ')}</p>
            </div>
          );
        })()}
      </Section>

      {/* Design Modified? */}
      <Section title="Design Authority" accentColor="from-amber-500/40 to-yellow-400/20">
        <button
          type="button"
          onClick={() => onUpdate('designModified', !formData.designModified)}
          className={cn(
            'w-full text-left p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all flex items-center gap-3',
            formData.designModified
              ? 'bg-amber-500/10 border-amber-500/30'
              : 'bg-white/[0.03] border-white/[0.06]'
          )}
        >
          <div
            className={cn(
              'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
              formData.designModified ? 'bg-amber-500 border-amber-500' : 'border-white/30'
            )}
          >
            {formData.designModified && (
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
              formData.designModified ? 'text-amber-400' : 'text-white'
            )}
          >
            System design was modified
          </span>
        </button>
        {formData.designModified && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Designer Name">
              <Input
                value={formData.modificationDesignerName || ''}
                onChange={(e) => onUpdate('modificationDesignerName', e.target.value)}
                className={inputCn}
              />
            </Field>
            <Field label="Designer Company">
              <Input
                value={formData.modificationDesignerCompany || ''}
                onChange={(e) => onUpdate('modificationDesignerCompany', e.target.value)}
                className={inputCn}
              />
            </Field>
          </div>
        )}
      </Section>

      {/* Impact warnings */}
      {parseInt(formData.zonesAdded || '0') > 0 && !formData.causeEffectUpdated && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-400">
            Zones have been added but the cause & effect matrix has not been updated. This should be
            reviewed.
          </p>
        </div>
      )}
      {parseInt(formData.detectorsAdded || '0') > 0 && !formData.drawingsUpdated && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-400">
            Devices have been added but drawings have not been updated.
          </p>
        </div>
      )}

      {/* Updated Drawings */}
      <Section title="Documentation" accentColor="from-green-500/40 to-emerald-400/20">
        <Field label="Updated Drawing Numbers">
          <Input
            value={formData.updatedDrawings || ''}
            onChange={(e) => onUpdate('updatedDrawings', e.target.value)}
            className={inputCn}
            placeholder="e.g. FA-001 Rev B, FA-003 Rev A"
          />
        </Field>
      </Section>
    </div>
  );
}
