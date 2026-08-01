/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G7 Modification — Tab 2: Modification Details
 * What was modified, why, extent, impact assessment
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

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

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAG7ModificationDetails({ formData, onUpdate }: Props) {
  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Type of work */}
      <div className={cardCn}>
        <SectionHeader title="Type of work" />
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
          ].map((opt) => {
            const selected = formData.modificationType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate('modificationType', opt.value)}
                className={cn(
                  'w-full text-left rounded-xl border p-4 touch-manipulation active:scale-[0.98] transition-all',
                  selected
                    ? 'bg-elec-yellow border-elec-yellow'
                    : 'bg-white/[0.06] border-white/[0.12]'
                )}
              >
                <p className={cn('text-sm font-semibold', selected ? 'text-black' : 'text-white')}>
                  {opt.label}
                </p>
                <p className={cn('text-xs mt-0.5', selected ? 'text-black/70' : 'text-white/80')}>
                  {opt.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modification details */}
      <div className={cardCn}>
        <SectionHeader title="Modification details" />
        <Field label="Description of modification" required>
          <Textarea
            value={formData.modificationDescription || ''}
            onChange={(e) => onUpdate('modificationDescription', e.target.value)}
            className={textareaCn}
            placeholder="Describe what was modified, added, or altered..."
          />
        </Field>
        <Field label="Reason for modification">
          <Textarea
            value={formData.modificationReason || ''}
            onChange={(e) => onUpdate('modificationReason', e.target.value)}
            className={textareaCn}
            placeholder="Why the modification was needed..."
          />
        </Field>
        <Field label="Extent of modification">
          <Textarea
            value={formData.modificationExtent || ''}
            onChange={(e) => onUpdate('modificationExtent', e.target.value)}
            className={textareaCn}
            placeholder="Which zones, areas, or floors were affected..."
          />
        </Field>
      </div>

      {/* Impact assessment */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Impact assessment" />
        <Field label="Impact on existing system">
          <Textarea
            value={formData.impactAssessment || ''}
            onChange={(e) => onUpdate('impactAssessment', e.target.value)}
            className={textareaCn}
            placeholder="How the modification affects the existing system — coverage, zoning, cause & effect, power supply..."
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2">
          <label className="flex min-h-11 items-center gap-3 cursor-pointer touch-manipulation">
            <Checkbox
              checked={formData.causeEffectUpdated || false}
              onCheckedChange={(v) => onUpdate('causeEffectUpdated', v)}
              className={checkboxCn}
            />
            <span className="text-sm text-white">Cause & effect matrix updated</span>
          </label>
          <label className="flex min-h-11 items-center gap-3 cursor-pointer touch-manipulation">
            <Checkbox
              checked={formData.drawingsUpdated || false}
              onCheckedChange={(v) => onUpdate('drawingsUpdated', v)}
              className={checkboxCn}
            />
            <span className="text-sm text-white">System drawings updated</span>
          </label>
          <label className="flex min-h-11 items-center gap-3 cursor-pointer touch-manipulation">
            <Checkbox
              checked={formData.logbookUpdated || false}
              onCheckedChange={(v) => onUpdate('logbookUpdated', v)}
              className={checkboxCn}
            />
            <span className="text-sm text-white">System logbook updated</span>
          </label>
        </div>
      </div>

      {/* Device changes */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Device changes" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4">
          <Field label="Detectors added">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.detectorsAdded || ''}
              onChange={(e) => onUpdate('detectorsAdded', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Detectors removed">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.detectorsRemoved || ''}
              onChange={(e) => onUpdate('detectorsRemoved', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Call points added">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.callPointsAdded || ''}
              onChange={(e) => onUpdate('callPointsAdded', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Call points removed">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.callPointsRemoved || ''}
              onChange={(e) => onUpdate('callPointsRemoved', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Sounders added">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.soundersAdded || ''}
              onChange={(e) => onUpdate('soundersAdded', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Sounders removed">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.soundersRemoved || ''}
              onChange={(e) => onUpdate('soundersRemoved', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Zones added">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.zonesAdded || ''}
              onChange={(e) => onUpdate('zonesAdded', e.target.value)}
              className={inputCn}
              placeholder="0"
            />
          </Field>
          <Field label="Zones removed">
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
            <div className="rounded-xl bg-white/[0.05] px-3.5 py-3 text-center">
              <p className="text-[12px] font-medium text-white mb-1">Net change</p>
              <p className="text-sm font-semibold text-elec-yellow">{changes.join('  ·  ')}</p>
            </div>
          );
        })()}

        {/* Impact warnings */}
        {parseInt(formData.zonesAdded || '0') > 0 && !formData.causeEffectUpdated && (
          <div className="rounded-xl border border-amber-500/40 bg-white/[0.05] p-3">
            <p className="text-xs text-amber-400 leading-relaxed">
              Zones have been added but the cause & effect matrix has not been updated. This should
              be reviewed.
            </p>
          </div>
        )}
        {parseInt(formData.detectorsAdded || '0') > 0 && !formData.drawingsUpdated && (
          <div className="rounded-xl border border-amber-500/40 bg-white/[0.05] p-3">
            <p className="text-xs text-amber-400 leading-relaxed">
              Devices have been added but drawings have not been updated.
            </p>
          </div>
        )}
      </div>

      {/* Design authority */}
      <div className={cardCn}>
        <SectionHeader title="Design authority" />
        <button
          type="button"
          onClick={() => onUpdate('designModified', !formData.designModified)}
          className={cn(
            'w-full h-11 rounded-xl border px-4 text-left text-sm touch-manipulation active:scale-[0.98] transition-all',
            formData.designModified
              ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
              : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
          )}
        >
          System design was modified
        </button>
        {formData.designModified && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Designer name">
              <Input
                value={formData.modificationDesignerName || ''}
                onChange={(e) => onUpdate('modificationDesignerName', e.target.value)}
                className={inputCn}
              />
            </Field>
            <Field label="Designer company">
              <Input
                value={formData.modificationDesignerCompany || ''}
                onChange={(e) => onUpdate('modificationDesignerCompany', e.target.value)}
                className={inputCn}
              />
            </Field>
          </div>
        )}
      </div>

      {/* Documentation */}
      <div className={cardCn}>
        <SectionHeader title="Documentation" />
        <Field label="Updated drawing numbers">
          <Input
            value={formData.updatedDrawings || ''}
            onChange={(e) => onUpdate('updatedDrawings', e.target.value)}
            className={inputCn}
            placeholder="e.g. FA-001 Rev B, FA-003 Rev A"
          />
        </Field>
      </div>
    </div>
  );
}
