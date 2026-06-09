import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FormSelectSheet from '@/components/ui/form-select-sheet';
import { Button } from '@/components/ui/button';
import { Calendar, Calculator, ClipboardList, CalendarCheck, Telescope, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import { useMultiFieldSync } from '@/hooks/useFieldSync';
import {
  FieldLimitationBadge,
  isFieldMarker,
} from '@/components/field-limitations';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

// Fields managed by this section (for memoization comparison)
const INSPECTION_SECTION_FIELDS = [
  'purposeOfInspection',
  'otherPurpose',
  'inspectionDate',
  'nextInspectionDate',
  'inspectionInterval',
  'intervalReasons',
  'agreedWith',
  'extentOfInspection',
  'limitationsOfInspection',
  'operationalLimitations',
  'bsAmendment',
  'description', // Referenced for recommended interval
] as const;

// Standard model-form wording for the extent & limitations of the inspection
// (BS 7671 Appendix 6 convention). Surfaced via the "Apply standard wording"
// actions so inspectors don't retype the same boilerplate on every EICR.
const STANDARD_SCOPE_TEXT = {
  extentOfInspection:
    'A periodic inspection and test of the electrical installation has been carried out in accordance with BS 7671. The inspection covered the consumer unit(s)/distribution board(s) and the final circuits detailed in the attached schedules of inspection and test results.',
  limitationsOfInspection:
    'Cables concealed within trunking and conduits, under floors, in roof spaces, and generally within the fabric of the building or underground, have not been inspected. No checks for safety alerts, corrective actions or product recalls for electrical equipment forming part of the installation have been made.',
  operationalLimitations:
    'None agreed prior to the inspection, unless otherwise stated above.',
} as const;

type StandardScopeField = keyof typeof STANDARD_SCOPE_TEXT;

// Remembers the inspector's last-used scope wording (per device) so it can be
// re-applied on future EICRs without retyping — see the "Apply my saved" action.
const SAVED_SCOPE_KEY = 'eicr:savedInspectionScope';
type SavedScope = Record<StandardScopeField, string>;

interface InspectionDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const SectionTitle = ({ title }: { icon?: any; title: string; isMobile?: boolean }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({
  label,
  required,
  hint,
  trailing,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center justify-between gap-2 mb-1.5">
      <Label className="text-white text-xs">
        {label}
        {required && <span className="text-elec-yellow ml-1">*</span>}
      </Label>
      {trailing}
    </div>
    {children}
    {hint && <span className="text-xs text-white block mt-1">{hint}</span>}
  </div>
);

/**
 * InspectionDetailsSection - Best-in-class mobile form for inspection purpose and dates
 * Edge-to-edge design with large touch targets and native app feel
 *
 * Performance optimised with React.memo and useMultiFieldSync
 */
const InspectionDetailsSectionInner = ({ formData, onUpdate }: InspectionDetailsSectionProps) => {
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const { toast } = useToast();

  // Auto-calculate next inspection date based on interval
  const calculateNextInspectionDate = () => {
    if (!formData.inspectionDate || !formData.inspectionInterval) return;

    const inspectionDate = new Date(formData.inspectionDate);
    const intervalYears = parseInt(formData.inspectionInterval);

    if (isNaN(intervalYears)) return;

    const nextDate = new Date(inspectionDate);
    nextDate.setFullYear(nextDate.getFullYear() + intervalYears);

    haptic.success();
    onUpdate('nextInspectionDate', nextDate.toISOString().split('T')[0]);
  };

  // Set today's date for inspection
  const setTodaysDate = () => {
    haptic.light();
    const today = new Date().toISOString().split('T')[0];
    onUpdate('inspectionDate', today);
  };

  // Standard wording auto-fill (Craig Soper request). A single field can be
  // filled via its "Use standard" link, or all blanks at once via the
  // section button. Bulk fill never overwrites text the inspector has typed.
  const applyStandardField = useCallback(
    (field: StandardScopeField) => {
      haptic.light();
      onUpdate(field, STANDARD_SCOPE_TEXT[field]);
    },
    [haptic, onUpdate]
  );

  const applyAllStandard = useCallback(() => {
    const fields = Object.keys(STANDARD_SCOPE_TEXT) as StandardScopeField[];
    let filled = 0;
    fields.forEach((field) => {
      const current = (formData[field] || '').trim();
      if (!current && !isFieldMarker(formData[field])) {
        onUpdate(field, STANDARD_SCOPE_TEXT[field]);
        filled += 1;
      }
    });
    haptic.success();
    toast({
      title: filled > 0 ? 'Standard wording applied' : 'Nothing to fill',
      description:
        filled > 0
          ? `Filled ${filled} blank field${filled === 1 ? '' : 's'}. Any text you'd already entered was left untouched.`
          : 'All scope fields already contain text — nothing was overwritten.',
    });
  }, [formData, haptic, onUpdate, toast]);

  // Remember the inspector's last-used scope wording so it can be re-applied on
  // future EICRs without retyping. Persists whenever a scope field holds real text.
  const [savedScope, setSavedScope] = useState<SavedScope | null>(() =>
    storageGetJSONSync<SavedScope | null>(SAVED_SCOPE_KEY, null)
  );

  useEffect(() => {
    const fields = Object.keys(STANDARD_SCOPE_TEXT) as StandardScopeField[];
    const trio = {} as SavedScope;
    let hasText = false;
    fields.forEach((f) => {
      const v = (formData[f] ?? '').toString();
      trio[f] = v;
      if (v.trim() && !isFieldMarker(v)) hasText = true;
    });
    if (hasText) {
      storageSetJSONSync(SAVED_SCOPE_KEY, trio);
      setSavedScope(trio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.extentOfInspection,
    formData.limitationsOfInspection,
    formData.operationalLimitations,
  ]);

  const hasSavedScope =
    !!savedScope && Object.values(savedScope).some((v) => (v || '').trim());

  const applyMySaved = useCallback(() => {
    if (!savedScope) return;
    const fields = Object.keys(STANDARD_SCOPE_TEXT) as StandardScopeField[];
    let filled = 0;
    fields.forEach((field) => {
      const current = (formData[field] || '').trim();
      const saved = (savedScope[field] || '').trim();
      if (saved && !current && !isFieldMarker(formData[field])) {
        onUpdate(field, savedScope[field]);
        filled += 1;
      }
    });
    haptic.success();
    toast({
      title: filled > 0 ? 'Your saved wording applied' : 'Nothing to fill',
      description:
        filled > 0
          ? `Filled ${filled} blank field${filled === 1 ? '' : 's'} from your saved scope. Existing text was left untouched.`
          : 'All scope fields already contain text — nothing was overwritten.',
    });
  }, [savedScope, formData, haptic, onUpdate, toast]);

  // Get recommended interval based on property type
  const getRecommendedInterval = (propertyType: string) => {
    const recommendations: { [key: string]: string } = {
      domestic: '10',
      commercial: '5',
      industrial: '1',
      'domestic-dwelling': '10',
      'commercial-office': '5',
      'retail-shop': '5',
      'industrial-unit': '1',
      'healthcare-facility': '1',
      'hotel-accommodation': '1',
      'school-education': '5',
    };
    return recommendations[propertyType] || '5';
  };

  // ELE-882 — Track whether the user has manually overridden the next
  // inspection date. Once they have, never silently recompute it again.
  // Initial value: if a date already exists when the component mounts (loaded
  // cert), assume it's intentional unless the user explicitly clears it.
  const [manualNextDate, setManualNextDate] = useState<boolean>(
    !!formData.nextInspectionDate
  );

  // ELE-882 — Removed silent auto-set of inspectionInterval on description
  // change. Was setting 10y for domestic without consent, and 5y as a
  // fallback for unrecognised property types. The recommended interval is
  // now only surfaced visually next to the interval picker (see render below)
  // — the user must tap a button to apply it. No silent writes.

  // Auto-calculate next inspection only when the user hasn't manually set it.
  // ELE-882 — was overwriting any manual edit on every parent re-render.
  React.useEffect(() => {
    if (manualNextDate) return;
    if (formData.inspectionDate && formData.inspectionInterval) {
      calculateNextInspectionDate();
    }
  }, [formData.inspectionDate, formData.inspectionInterval, manualNextDate]);

  const isOtherPurposeRequired = formData.purposeOfInspection === 'other';

  // Purpose option buttons
  const purposeOptions = [
    { value: 'periodic', label: 'Periodic', shortLabel: 'Periodic' },
    { value: 'change-of-occupancy', label: 'Change of Occupancy', shortLabel: 'Occupancy' },
    { value: 'change-of-use', label: 'Change of Use', shortLabel: 'Use Change' },
    { value: 'extension', label: 'Extension', shortLabel: 'Extension' },
    { value: 'other', label: 'Other', shortLabel: 'Other' },
  ];

  // Interval options
  const intervalOptions = [
    { value: '1', label: '1 Year' },
    { value: '3', label: '3 Years' },
    { value: '5', label: '5 Years' },
    { value: '10', label: '10 Years' },
  ];

  return (
    <div className={cn('space-y-6', '')}>
      {/* Purpose of Inspection Section */}
      <div>
        <SectionTitle icon={ClipboardList} title="Purpose of Inspection" isMobile={isMobile} />
        <div className={cn('space-y-4 py-4', '')}>
          <FormField label="Purpose" required>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {purposeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate(
                      'purposeOfInspection',
                      formData.purposeOfInspection === option.value ? '' : option.value
                    );
                  }}
                  className={cn(
                    'h-11 rounded-lg font-medium transition-all touch-manipulation text-sm px-2',
                    formData.purposeOfInspection === option.value
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.03] text-white border border-white/[0.06]'
                  )}
                >
                  {isMobile ? option.shortLabel : option.label}
                </button>
              ))}
            </div>
          </FormField>

          {isOtherPurposeRequired && (
            <FormField label="Other Purpose" required>
              <Input
                value={formData.otherPurpose || ''}
                onChange={(e) => onUpdate('otherPurpose', e.target.value)}
                placeholder="Please specify the purpose"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          )}
        </div>
      </div>

      {/* Inspection Dates Section */}
      <div>
        <SectionTitle icon={Calendar} title="Inspection Dates" isMobile={isMobile} />
        <div className={cn('space-y-4 py-4', '')}>
          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField label="Date of Inspection" required>
              <Input
                type="date"
                value={formData.inspectionDate || ''}
                onChange={(e) => onUpdate('inspectionDate', e.target.value)}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
            <FormField label="Next Inspection">
              <Input
                type="date"
                value={formData.nextInspectionDate || ''}
                onChange={(e) => {
                  // ELE-882 — flag manual edit so the auto-calc effect stops
                  // overwriting it on every parent re-render.
                  setManualNextDate(true);
                  onUpdate('nextInspectionDate', e.target.value);
                }}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
              {manualNextDate && (
                <button
                  type="button"
                  onClick={() => {
                    haptic.light();
                    setManualNextDate(false); // hand control back to auto-calc
                  }}
                  className="text-[10px] text-white/60 hover:text-elec-yellow underline mt-1"
                >
                  Reset to auto-calculate from interval
                </button>
              )}
            </FormField>
          </div>

          <FormField label="Inspection Interval" required>
            <div className="grid grid-cols-4 gap-2">
              {intervalOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate(
                      'inspectionInterval',
                      formData.inspectionInterval === option.value ? '' : option.value
                    );
                  }}
                  className={cn(
                    'h-11 rounded-lg font-medium transition-all touch-manipulation text-sm',
                    formData.inspectionInterval === option.value
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.03] text-white border border-white/[0.06]'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {/* ELE-882 — explicit suggestion + Apply button instead of silent
                auto-set. User must tap to apply the BS 7671 recommendation. */}
            {formData.description &&
              formData.inspectionInterval !== getRecommendedInterval(formData.description) && (
                <div className="flex items-center justify-between gap-2 mt-2 px-3 py-2 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
                  <span className="text-xs text-elec-yellow/80 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-elec-yellow inline-block"></span>
                    BS 7671 recommends {getRecommendedInterval(formData.description)} years for this
                    property type
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      haptic.light();
                      onUpdate(
                        'inspectionInterval',
                        getRecommendedInterval(formData.description)
                      );
                    }}
                    className="text-[10px] font-semibold text-elec-yellow border border-elec-yellow/40 rounded-md px-2 py-1 hover:bg-elec-yellow/10 touch-manipulation"
                  >
                    Apply
                  </button>
                </div>
              )}
          </FormField>

          <FormField
            label="Reasons for Interval"
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.intervalReasons || ''}
                markers={['N/A']}
                onChange={(v) => onUpdate('intervalReasons', v)}
              />
            }
          >
            {isFieldMarker(formData.intervalReasons) ? (
              <Input
                value={formData.intervalReasons}
                disabled
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
              />
            ) : (
              <Textarea
                value={formData.intervalReasons || ''}
                onChange={(e) => onUpdate('intervalReasons', e.target.value)}
                placeholder="e.g., Age of installation, type of premises, environmental conditions"
                className="min-h-[80px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
              />
            )}
          </FormField>
        </div>
      </div>

      {/* Inspection Scope Section */}
      <div>
        <SectionTitle icon={Telescope} title="Inspection Scope" isMobile={isMobile} />
        <div className="space-y-3 py-3">
          {/* Scope wording shortcuts — fill blank fields in one tap */}
          <div className="flex justify-end gap-2 -mt-1">
            {hasSavedScope && (
              <Button
                type="button"
                variant="ghost"
                onClick={applyMySaved}
                className="h-8 gap-1.5 px-2.5 text-xs font-medium text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
              >
                <ClipboardList className="h-3.5 w-3.5" />
                Apply my saved
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              onClick={applyAllStandard}
              className="h-8 gap-1.5 px-2.5 text-xs font-medium text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
            >
              <ClipboardList className="h-3.5 w-3.5" />
              Apply standard wording
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField
              label="Agreed With"
              trailing={
                <FieldLimitationBadge
                  compact
                  value={formData.agreedWith || ''}
                  markers={['N/A']}
                  onChange={(v) => onUpdate('agreedWith', v)}
                />
              }
            >
              <Input
                value={formData.agreedWith || ''}
                onChange={(e) => onUpdate('agreedWith', e.target.value)}
                placeholder="Name of person"
                disabled={isFieldMarker(formData.agreedWith)}
                className={cn(
                  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]',
                  isFieldMarker(formData.agreedWith) && 'opacity-60'
                )}
              />
            </FormField>
            <FormField label="BS 7671 Edition">
              <FormSelectSheet
                value={formData.bsAmendment || 'amd4-2026'}
                onValueChange={(value) => onUpdate('bsAmendment', value)}
                label="BS 7671 Edition"
                placeholder="Select"
                options={[
                  { value: 'amd1-2020', label: 'Amendment 1 (2020)' },
                  { value: 'amd2-2022', label: 'Amendment 2 (2022)' },
                  { value: 'amd3-2024', label: 'Amendment 3 (2024)' },
                  { value: 'amd4-2026', label: 'Amendment 4 (2026)' },
                ]}
              />
            </FormField>
          </div>

          <FormField
            label="Extent of Inspection"
            required
            trailing={
              <div className="flex items-center gap-2.5">
                {!isFieldMarker(formData.extentOfInspection) && (
                  <button
                    type="button"
                    onClick={() => applyStandardField('extentOfInspection')}
                    className="text-[11px] font-medium text-elec-yellow/80 hover:text-elec-yellow touch-manipulation"
                  >
                    Use standard
                  </button>
                )}
                <FieldLimitationBadge
                  compact
                  value={formData.extentOfInspection || ''}
                  markers={['LIM']}
                  onChange={(v) => onUpdate('extentOfInspection', v)}
                />
              </div>
            }
          >
            {isFieldMarker(formData.extentOfInspection) ? (
              <Input
                value={formData.extentOfInspection}
                disabled
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
              />
            ) : (
              <Textarea
                value={formData.extentOfInspection || ''}
                onChange={(e) => onUpdate('extentOfInspection', e.target.value)}
                placeholder="Areas, circuits, and systems inspected"
                className="min-h-[70px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
              />
            )}
          </FormField>

          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField
              label="Limitations"
              trailing={
                <div className="flex items-center gap-2.5">
                  {!isFieldMarker(formData.limitationsOfInspection) && (
                    <button
                      type="button"
                      onClick={() => applyStandardField('limitationsOfInspection')}
                      className="text-[11px] font-medium text-elec-yellow/80 hover:text-elec-yellow touch-manipulation whitespace-nowrap"
                    >
                      Use standard
                    </button>
                  )}
                  <FieldLimitationBadge
                    compact
                    value={formData.limitationsOfInspection || ''}
                    markers={['N/A']}
                    onChange={(v) => onUpdate('limitationsOfInspection', v)}
                  />
                </div>
              }
            >
              {isFieldMarker(formData.limitationsOfInspection) ? (
                <Input
                  value={formData.limitationsOfInspection}
                  disabled
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
                />
              ) : (
                <Textarea
                  value={formData.limitationsOfInspection || ''}
                  onChange={(e) => onUpdate('limitationsOfInspection', e.target.value)}
                  placeholder="Areas not inspected"
                  className="min-h-[70px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
                />
              )}
            </FormField>
            <FormField
              label="Operational Limitations"
              trailing={
                <div className="flex items-center gap-2.5">
                  {!isFieldMarker(formData.operationalLimitations) && (
                    <button
                      type="button"
                      onClick={() => applyStandardField('operationalLimitations')}
                      className="text-[11px] font-medium text-elec-yellow/80 hover:text-elec-yellow touch-manipulation whitespace-nowrap"
                    >
                      Use standard
                    </button>
                  )}
                  <FieldLimitationBadge
                    compact
                    value={formData.operationalLimitations || ''}
                    markers={['N/A']}
                    onChange={(v) => onUpdate('operationalLimitations', v)}
                  />
                </div>
              }
            >
              {isFieldMarker(formData.operationalLimitations) ? (
                <Input
                  value={formData.operationalLimitations}
                  disabled
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
                />
              ) : (
                <Textarea
                  value={formData.operationalLimitations || ''}
                  onChange={(e) => onUpdate('operationalLimitations', e.target.value)}
                  placeholder="Circuits not isolated, etc."
                  className="min-h-[70px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
                />
              )}
            </FormField>
          </div>

          {/* A4:2026 Standard Disclaimers (Section D) */}
          <div className="rounded-lg border border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/[0.08] to-amber-600/[0.04] overflow-hidden">
            <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border-b border-elec-yellow/30 px-4 py-2.5 flex items-center gap-2">
              <Info className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              <h4 className="text-sm font-semibold text-white tracking-wide">
                Standard Limitations <span className="text-white font-normal">(BS 7671:2018+A4:2026)</span>
              </h4>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-white leading-relaxed">
                Unless specifically agreed between the client and inspector prior to the inspection:
              </p>
              <ul className="text-sm text-white leading-relaxed space-y-2 pl-1">
                <li className="flex gap-2.5">
                  <span className="text-elec-yellow mt-1 flex-shrink-0 font-bold">•</span>
                  <span>Cables concealed within trunking and conduits, under floors, in roof spaces, and generally within the fabric of the building or underground, have not been inspected.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-elec-yellow mt-1 flex-shrink-0 font-bold">•</span>
                  <span>No checks for safety alerts, corrective actions or product recalls for electrical equipment forming part of the installation have been made.</span>
                </li>
              </ul>
              <div className="pt-3 border-t border-white/10">
                <p className="text-sm text-white leading-relaxed italic">
                  An inspection should be made of other electrical equipment housed within an accessible roof space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoized component - only re-renders when INSPECTION_SECTION_FIELDS change
const InspectionDetailsSection = React.memo(
  InspectionDetailsSectionInner,
  (prevProps, nextProps) => {
    // Compare only the fields this section cares about
    for (const field of INSPECTION_SECTION_FIELDS) {
      if (prevProps.formData[field] !== nextProps.formData[field]) {
        return false; // Re-render needed
      }
    }
    return prevProps.onUpdate === nextProps.onUpdate;
  }
);

InspectionDetailsSection.displayName = 'InspectionDetailsSection';

export default InspectionDetailsSection;
