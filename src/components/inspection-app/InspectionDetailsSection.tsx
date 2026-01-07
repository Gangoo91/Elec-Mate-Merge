
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Calendar, Calculator, ClipboardList } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';

interface InspectionDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const InspectionDetailsSection = ({ formData, onUpdate }: InspectionDetailsSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { toast } = useToast();
  // Auto-calculate next inspection date based on interval
  const calculateNextInspectionDate = () => {
    if (!formData.inspectionDate || !formData.inspectionInterval) return;
    
    const inspectionDate = new Date(formData.inspectionDate);
    const intervalYears = parseInt(formData.inspectionInterval);
    
    if (isNaN(intervalYears)) return;
    
    const nextDate = new Date(inspectionDate);
    nextDate.setFullYear(nextDate.getFullYear() + intervalYears);
    
    onUpdate('nextInspectionDate', nextDate.toISOString().split('T')[0]);
  };

  // Set today's date for inspection
  const setTodaysDate = () => {
    const today = new Date().toISOString().split('T')[0];
    onUpdate('inspectionDate', today);
  };

  // Get recommended interval based on property type (updated for simplified types)
  const getRecommendedInterval = (propertyType: string) => {
    const recommendations: { [key: string]: string } = {
      'domestic': '10',
      'commercial': '5',
      'industrial': '1',
      // Legacy support for existing forms
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
            
            // Show user notification about recommended interval
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

  return (
    <div className="eicr-section-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SectionHeader
          title="Purpose & Inspection Details"
          icon={ClipboardList}
          isOpen={isOpen}
          color="blue-500"
        />
        <CollapsibleContent>
          <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Label htmlFor="purposeOfInspection">Purpose of Inspection *</Label>
            <Select value={formData.purposeOfInspection || ''} onValueChange={(value) => onUpdate('purposeOfInspection', value)}>
              <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                <SelectItem value="periodic">Periodic Inspection</SelectItem>
                <SelectItem value="change-of-occupancy">Change of Occupancy</SelectItem>
                <SelectItem value="change-of-use">Change of Use</SelectItem>
                <SelectItem value="extension">Extension to Installation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isOtherPurposeRequired && (
            <div className="space-y-2">
              <Label htmlFor="otherPurpose">Other Purpose *</Label>
              <Input
                id="otherPurpose"
                value={formData.otherPurpose || ''}
                onChange={(e) => onUpdate('otherPurpose', e.target.value)}
                placeholder="Please specify the purpose"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            Inspection Dates
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inspectionDate">Date of Inspection *</Label>
              <div className="flex gap-2">
                <Input
                  id="inspectionDate"
                  type="date"
                  value={formData.inspectionDate || ''}
                  onChange={(e) => onUpdate('inspectionDate', e.target.value)}
                  className="h-11 text-base touch-manipulation flex-1 border-white/30 focus:border-blue-500 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={setTodaysDate}
                  title="Set today's date"
                  className="px-3 border-white/30 hover:border-blue-500 hover:bg-blue-50"
                >
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspectionInterval">Inspection Interval (Years) *</Label>
              <Select value={formData.inspectionInterval || ''} onValueChange={(value) => onUpdate('inspectionInterval', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {formData.description && (
                <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                  Recommended: {getRecommendedInterval(formData.description)} years for this property type
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextInspectionDate">Next Inspection Date</Label>
              <div className="flex gap-2">
                <Input
                  id="nextInspectionDate"
                  type="date"
                  value={formData.nextInspectionDate || ''}
                  onChange={(e) => onUpdate('nextInspectionDate', e.target.value)}
                  className="h-11 text-base touch-manipulation flex-1 border-white/30 focus:border-blue-500 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={calculateNextInspectionDate}
                  title="Auto-calculate based on inspection date and interval"
                  disabled={!formData.inspectionDate || !formData.inspectionInterval}
                  className="px-3 border-white/30 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50"
                >
                  <Calculator className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            Inspection Scope
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="extentOfInspection">Extent of Inspection *</Label>
              <Textarea
                id="extentOfInspection"
                value={formData.extentOfInspection || ''}
                onChange={(e) => onUpdate('extentOfInspection', e.target.value)}
                placeholder="Describe what areas/circuits/systems were inspected"
                rows={4}
                className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Include specific areas, circuits, and systems inspected
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="limitationsOfInspection">Limitations of Inspection</Label>
              <Textarea
                id="limitationsOfInspection"
                value={formData.limitationsOfInspection || ''}
                onChange={(e) => onUpdate('limitationsOfInspection', e.target.value)}
                placeholder="Any areas not inspected or limitations encountered"
                rows={4}
                className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-blue-500"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Note any areas that could not be accessed or inspected
              </p>
            </div>
          </div>
        </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default InspectionDetailsSection;
