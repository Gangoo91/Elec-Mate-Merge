import React, { useState, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Calculator, ClipboardList, CalendarCheck, Telescope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import { useMultiFieldSync } from '@/hooks/useFieldSync';

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
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">
      {label}
      {required && <span className="text-elec-yellow ml-1">*</span>}
    </Label>
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

  // Auto-set recommended interval when property type changes
  React.useEffect(() => {
    if (formData.description && !formData.inspectionInterval) {
      const recommended = getRecommendedInterval(formData.description);
      onUpdate('inspectionInterval', recommended);

      toast({
        title: 'Recommended Interval Set',
        description: `${recommended} years is recommended for ${formData.description?.replace('-', ' ')} properties according to BS7671`,
        duration: 3000,
      });
    }
  }, [formData.description]);

  // Auto-calculate next inspection when date or interval changes
  React.useEffect(() => {
    if (formData.inspectionDate && formData.inspectionInterval) {
      calculateNextInspectionDate();
    }
  }, [formData.inspectionDate, formData.inspectionInterval]);

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
                onChange={(e) => onUpdate('nextInspectionDate', e.target.value)}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
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
            {formData.description && (
              <span className="text-xs text-elec-yellow/80 flex items-center gap-1 mt-2">
                <span className="w-1 h-1 rounded-full bg-elec-yellow inline-block"></span>
                Recommended: {getRecommendedInterval(formData.description)} years for this property type
              </span>
            )}
          </FormField>

          <FormField label="Reasons for Interval">
            <Textarea
              value={formData.intervalReasons || ''}
              onChange={(e) => onUpdate('intervalReasons', e.target.value)}
              placeholder="e.g., Age of installation, type of premises, environmental conditions"
              className="min-h-[80px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
            />
          </FormField>
        </div>
      </div>

      {/* Inspection Scope Section */}
      <div>
        <SectionTitle icon={Telescope} title="Inspection Scope" isMobile={isMobile} />
        <div className="space-y-3 py-3">
          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField label="Agreed With">
              <Input
                value={formData.agreedWith || ''}
                onChange={(e) => onUpdate('agreedWith', e.target.value)}
                placeholder="Name of person"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
            <FormField label="BS 7671 Edition">
              <Select
                value={formData.bsAmendment || 'amd3-2024'}
                onValueChange={(value) => {
                  haptic.light();
                  onUpdate('bsAmendment', value);
                }}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amd1-2020">Amendment 1 (2020)</SelectItem>
                  <SelectItem value="amd2-2022">Amendment 2 (2022)</SelectItem>
                  <SelectItem value="amd3-2024">Amendment 3 (2024)</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <FormField label="Extent of Inspection" required>
            <Textarea
              value={formData.extentOfInspection || ''}
              onChange={(e) => onUpdate('extentOfInspection', e.target.value)}
              placeholder="Areas, circuits, and systems inspected"
              className="min-h-[70px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField label="Limitations">
              <Textarea
                value={formData.limitationsOfInspection || ''}
                onChange={(e) => onUpdate('limitationsOfInspection', e.target.value)}
                placeholder="Areas not inspected"
                className="min-h-[70px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
              />
            </FormField>
            <FormField label="Operational Limitations">
              <Textarea
                value={formData.operationalLimitations || ''}
                onChange={(e) => onUpdate('operationalLimitations', e.target.value)}
                placeholder="Circuits not isolated, etc."
                className="min-h-[70px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
              />
            </FormField>
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
