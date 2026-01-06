
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
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
    <Card className="border border-border/30 bg-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SectionHeader
          title="Purpose & Inspection Details"
          icon={ClipboardList}
          isOpen={isOpen}
          color="blue-500"
        />
        <CollapsibleContent>
          <CardContent className="p-4 space-y-6">
            {/* Purpose */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="purposeOfInspection">Purpose of Inspection <span className="text-elec-yellow">*</span></Label>
                <Select value={formData.purposeOfInspection || ''} onValueChange={(value) => onUpdate('purposeOfInspection', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="periodic">Periodic Inspection</SelectItem>
                    <SelectItem value="change-of-occupancy">Change of Occupancy</SelectItem>
                    <SelectItem value="change-of-use">Change of Use</SelectItem>
                    <SelectItem value="extension">Extension to Installation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {isOtherPurposeRequired && (
                <div className="space-y-1.5">
                  <Label htmlFor="otherPurpose">Other Purpose <span className="text-elec-yellow">*</span></Label>
                  <Input
                    id="otherPurpose"
                    value={formData.otherPurpose || ''}
                    onChange={(e) => onUpdate('otherPurpose', e.target.value)}
                    placeholder="Please specify the purpose"
                  />
                </div>
              )}
            </div>

            <Separator className="bg-border/30" />

            {/* Inspection Dates */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Inspection Dates
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="inspectionDate">Date of Inspection <span className="text-elec-yellow">*</span></Label>
                  <div className="flex gap-2">
                    <Input
                      id="inspectionDate"
                      type="date"
                      value={formData.inspectionDate || ''}
                      onChange={(e) => onUpdate('inspectionDate', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={setTodaysDate}
                      title="Set today's date"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="inspectionInterval">Inspection Interval (Years) <span className="text-elec-yellow">*</span></Label>
                  <Select value={formData.inspectionInterval || ''} onValueChange={(value) => onUpdate('inspectionInterval', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.description && (
                    <p className="text-xs text-elec-yellow/80 flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                      Recommended: {getRecommendedInterval(formData.description)} years for this property type
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="nextInspectionDate">Next Inspection Date</Label>
                  <div className="flex gap-2">
                    <Input
                      id="nextInspectionDate"
                      type="date"
                      value={formData.nextInspectionDate || ''}
                      onChange={(e) => onUpdate('nextInspectionDate', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={calculateNextInspectionDate}
                      title="Auto-calculate"
                      disabled={!formData.inspectionDate || !formData.inspectionInterval}
                    >
                      <Calculator className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-border/30" />

            {/* Inspection Scope */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Inspection Scope
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="extentOfInspection">Extent of Inspection <span className="text-elec-yellow">*</span></Label>
                  <Textarea
                    id="extentOfInspection"
                    value={formData.extentOfInspection || ''}
                    onChange={(e) => onUpdate('extentOfInspection', e.target.value)}
                    placeholder="Describe what areas/circuits/systems were inspected"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Include specific areas, circuits, and systems inspected
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="limitationsOfInspection">Limitations of Inspection</Label>
                  <Textarea
                    id="limitationsOfInspection"
                    value={formData.limitationsOfInspection || ''}
                    onChange={(e) => onUpdate('limitationsOfInspection', e.target.value)}
                    placeholder="Any areas not inspected or limitations encountered"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Note any areas that could not be accessed or inspected
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default InspectionDetailsSection;
