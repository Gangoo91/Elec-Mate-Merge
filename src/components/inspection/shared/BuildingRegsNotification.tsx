import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { isKnownNonDwelling, PART_P_NOT_APPLICABLE } from '@/utils/partP';

/**
 * Building Regulations (Part P) notification — ONE section, ONE set of keys,
 * used by every certificate that can carry notifiable work (ELE-1663).
 *
 * The EV form had two unlinked places for this: a "Building Regulations Part P"
 * compliance tick and a separate notification card, which could be set to
 * contradict each other. The EIC had nothing. Both now render this.
 *
 * Keys (already stored by EV rows, so nothing existing is re-keyed):
 *   buildingRegsRequired   — the work is notifiable under Part P
 *   buildingRegsViaScheme  — notified through a competent person scheme
 *   buildingRegsSubmitted  — notified directly to building control
 *   buildingRegsAnswered   — the question was answered (a "No" is an answer;
 *                            an untouched form is not, and must not print ✓)
 *   buildingRegsReference  — scheme / building control reference, optional
 *
 * Domestic only: a known commercial/industrial/public installation gets the
 * sentence instead (ELE-1662, see utils/partP). A blank premises type keeps
 * the section — see the note in utils/partP on why blank means "applies".
 */

export interface BuildingRegsFields {
  buildingRegsRequired?: boolean;
  buildingRegsViaScheme?: boolean;
  buildingRegsSubmitted?: boolean;
  buildingRegsAnswered?: boolean;
  buildingRegsReference?: string;
}

/** Was the question answered? Older EV rows have no `buildingRegsAnswered`; a tick anywhere counts. */
export const buildingRegsAnswered = (f: BuildingRegsFields): boolean =>
  !!(
    f.buildingRegsAnswered ||
    f.buildingRegsRequired ||
    f.buildingRegsViaScheme ||
    f.buildingRegsSubmitted
  );

/**
 * The single Part P statement a certificate can make: the installer has
 * addressed Building Regulations — the work is either not notifiable, or it
 * is and has been notified. Never true for an unanswered form.
 */
export const buildingRegsAddressed = (
  f: BuildingRegsFields,
  installationType?: unknown
): boolean => {
  if (isKnownNonDwelling(installationType)) return false;
  if (!buildingRegsAnswered(f)) return false;
  if (!f.buildingRegsRequired) return true;
  return !!(f.buildingRegsViaScheme || f.buildingRegsSubmitted);
};

const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';
const chipCn =
  'h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center';
const labelCn = 'text-[12px] font-medium text-white mb-1 block';
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

interface Props {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
  /** Rendered as a card by the caller — this is the body only. */
  className?: string;
}

const BuildingRegsNotification: React.FC<Props> = ({ formData, onUpdate, className }) => {
  const f = formData as BuildingRegsFields & { installationType?: unknown };

  if (isKnownNonDwelling(f.installationType)) {
    return (
      <p className={cn('text-[13px] leading-relaxed text-white', className)}>
        {PART_P_NOT_APPLICABLE}
      </p>
    );
  }

  const answered = buildingRegsAnswered(f);
  const notifiable = answered ? !!f.buildingRegsRequired : null;
  const route = f.buildingRegsViaScheme ? 'scheme' : f.buildingRegsSubmitted ? 'control' : '';

  const setNotifiable = (yes: boolean) => {
    onUpdate('buildingRegsAnswered', true);
    onUpdate('buildingRegsRequired', yes);
    if (!yes) {
      onUpdate('buildingRegsViaScheme', false);
      onUpdate('buildingRegsSubmitted', false);
    }
  };
  const setRoute = (r: 'scheme' | 'control') => {
    // Mutually exclusive — one job is notified one way.
    onUpdate('buildingRegsViaScheme', r === 'scheme');
    onUpdate('buildingRegsSubmitted', r === 'control');
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div data-field="buildingRegsRequired">
        <Label className={labelCn}>Notifiable work under Part P?</Label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setNotifiable(true)}
            className={cn(chipCn, notifiable === true ? chipOn : chipOff)}
          >
            Yes — notifiable
          </button>
          <button
            type="button"
            onClick={() => setNotifiable(false)}
            className={cn(chipCn, notifiable === false ? chipOn : chipOff)}
          >
            No — not notifiable
          </button>
        </div>
        {notifiable === false && (
          <p className="mt-2 text-[12px] leading-snug text-white">
            Not every domestic job is notifiable — like-for-like replacements and additions to an
            existing circuit outside a special location usually are not. The certificate records
            that it was considered.
          </p>
        )}
      </div>

      {notifiable && (
        <>
          <div data-field="buildingRegsViaScheme">
            <Label className={labelCn}>Notified through</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setRoute('scheme')}
                className={cn(chipCn, route === 'scheme' ? chipOn : chipOff)}
              >
                Competent person scheme
              </button>
              <button
                type="button"
                onClick={() => setRoute('control')}
                className={cn(chipCn, route === 'control' ? chipOn : chipOff)}
              >
                Building control directly
              </button>
            </div>
            {!route && (
              <p className="mt-2 text-[12px] leading-snug text-white">
                Choose how building control is being told. Notification is due within 30 days of
                completion.
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="buildingRegsReference" className={labelCn}>
              {route === 'control' ? 'Building control reference' : 'Scheme notification reference'}{' '}
              (optional)
            </Label>
            <Input
              id="buildingRegsReference"
              value={(f.buildingRegsReference as string) || ''}
              onChange={(e) => onUpdate('buildingRegsReference', e.target.value)}
              placeholder={
                route === 'control'
                  ? 'Application or notice number'
                  : 'Notification number once submitted'
              }
              className={inputCn}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BuildingRegsNotification;
