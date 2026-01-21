
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Calculator, ClipboardList, CalendarCheck, Telescope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

interface InspectionDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

/**
 * InspectionDetailsSection - Best-in-class mobile form for inspection purpose and dates
 * Edge-to-edge design with large touch targets and native app feel
 */
const InspectionDetailsSection = ({ formData, onUpdate }: InspectionDetailsSectionProps) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const { toast } = useToast();

  // Auto-calculate next inspection date based on interval
  const calculateNextInspectionDate = () => {
    if (!formData.inspectionDate || !formData.inspectionInterval) return;

    const inspectionDate = new Date(formData.inspectionDate);
    const intervalYears = parseInt(formData.inspectionInterval);

    if (isNaN(intervalYears)) return;

    const nextDate = new Date(inspectionDate);
    nextDate.setFullYear(nextDate.getFullYear() + intervalYears);

    haptics.success();
    onUpdate('nextInspectionDate', nextDate.toISOString().split('T')[0]);
  };

  // Set today's date for inspection
  const setTodaysDate = () => {
    haptics.tap();
    const today = new Date().toISOString().split('T')[0];
    onUpdate('inspectionDate', today);
  };

  // Get recommended interval based on property type
  const getRecommendedInterval = (propertyType: string) => {
    const recommendations: { [key: string]: string } = {
      'domestic': '10',
      'commercial': '5',
      'industrial': '1',
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
        title: "Recommended Interval Set",
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

  // Section header component
  const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
    <div className={cn(
      "flex items-center gap-3 py-3",
      isMobile ? "-mx-4 px-4 bg-card/30 border-y border-border/20" : "pb-2 border-b border-border/30"
    )}>
      <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
        <Icon className="h-4 w-4 text-blue-400" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
    </div>
  );

  // Input field wrapper with proper mobile styling
  const FormField = ({
    label,
    required,
    hint,
    children
  }: {
    label: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm text-foreground/80">
        {label}
        {required && <span className="text-elec-yellow ml-1">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );

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
    <div className={cn("space-y-6", isMobile && "-mx-4")}>
      {/* Purpose of Inspection Section */}
      <div>
        <SectionTitle icon={ClipboardList} title="Purpose of Inspection" />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Purpose" required>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {purposeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    onUpdate('purposeOfInspection', option.value);
                  }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm px-2",
                    formData.purposeOfInspection === option.value
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
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
        <SectionTitle icon={Calendar} title="Inspection Dates" />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Date of Inspection" required>
            <div className="flex gap-2">
              <Input
                type="date"
                value={formData.inspectionDate || ''}
                onChange={(e) => onUpdate('inspectionDate', e.target.value)}
                className="flex-1 h-11 text-base touch-manipulation"
              />
              <Button
                type="button"
                variant="outline"
                onClick={setTodaysDate}
                className="h-11 px-4 touch-manipulation border-border/50"
              >
                <CalendarCheck className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Today</span>
              </Button>
            </div>
          </FormField>

          <FormField label="Inspection Interval" required>
            <div className="grid grid-cols-4 gap-2">
              {intervalOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    onUpdate('inspectionInterval', option.value);
                  }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                    formData.inspectionInterval === option.value
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {formData.description && (
              <p className="text-xs text-elec-yellow/80 flex items-center gap-1 mt-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Recommended: {getRecommendedInterval(formData.description)} years for this property type
              </p>
            )}
          </FormField>

          <FormField label="Next Inspection Date">
            <div className="flex gap-2">
              <Input
                type="date"
                value={formData.nextInspectionDate || ''}
                onChange={(e) => onUpdate('nextInspectionDate', e.target.value)}
                className="flex-1 h-11 text-base touch-manipulation"
              />
              <Button
                type="button"
                variant="outline"
                onClick={calculateNextInspectionDate}
                disabled={!formData.inspectionDate || !formData.inspectionInterval}
                className="h-11 px-4 touch-manipulation border-border/50"
              >
                <Calculator className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Calc</span>
              </Button>
            </div>
          </FormField>
        </div>
      </div>

      {/* Inspection Scope Section */}
      <div>
        <SectionTitle icon={Telescope} title="Inspection Scope" />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField
            label="Extent of Inspection"
            required
            hint="Include specific areas, circuits, and systems inspected"
          >
            <Textarea
              value={formData.extentOfInspection || ''}
              onChange={(e) => onUpdate('extentOfInspection', e.target.value)}
              placeholder="Describe what areas/circuits/systems were inspected"
              className="min-h-[100px] text-base touch-manipulation resize-none"
            />
          </FormField>

          <FormField
            label="Limitations of Inspection"
            hint="Note any areas that could not be accessed or inspected"
          >
            <Textarea
              value={formData.limitationsOfInspection || ''}
              onChange={(e) => onUpdate('limitationsOfInspection', e.target.value)}
              placeholder="Any areas not inspected or limitations encountered"
              className="min-h-[100px] text-base touch-manipulation resize-none"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default InspectionDetailsSection;
