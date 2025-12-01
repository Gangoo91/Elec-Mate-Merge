import { MobileInput } from '@/components/ui/mobile-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MaintenanceEquipmentDetails } from '@/types/maintenance-method';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { cn } from '@/lib/utils';

interface MaintenanceEquipmentDetailsFormProps {
  equipmentDetails: MaintenanceEquipmentDetails;
  onChange: (details: MaintenanceEquipmentDetails) => void;
}

export const MaintenanceEquipmentDetailsForm = ({
  equipmentDetails,
  onChange
}: MaintenanceEquipmentDetailsFormProps) => {
  const { isMobile } = useMobileEnhanced();

  const handleChange = (field: keyof MaintenanceEquipmentDetails, value: string | number) => {
    onChange({
      ...equipmentDetails,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <MobileInput
          label="Equipment Type"
          value={equipmentDetails.equipmentType}
          onChange={(e) => handleChange('equipmentType', e.target.value)}
          placeholder="e.g., Consumer Unit, Distribution Board"
        />
        <MobileInput
          label="Location"
          value={equipmentDetails.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g., Main Switch Room"
        />
        <MobileInput
          label="Age (Years)"
          type="number"
          value={equipmentDetails.ageYears || ''}
          onChange={(e) => handleChange('ageYears', parseInt(e.target.value) || 0)}
          placeholder="Approximate age"
        />
        <MobileInput
          label="Last Inspection Date"
          type="date"
          value={equipmentDetails.lastInspectionDate || ''}
          onChange={(e) => handleChange('lastInspectionDate', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Known Issues or Observations</Label>
        <Textarea
          value={equipmentDetails.knownIssues || ''}
          onChange={(e) => handleChange('knownIssues', e.target.value)}
          placeholder="Describe any known defects, wear, or concerns..."
          className={cn(
            "resize-none text-foreground placeholder:text-muted-foreground",
            isMobile ? "min-h-[100px] text-base" : "min-h-[80px] text-sm"
          )}
          rows={isMobile ? 4 : 3}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">Additional Requirements</Label>
        <Textarea
          value={equipmentDetails.additionalNotes || ''}
          onChange={(e) => handleChange('additionalNotes', e.target.value)}
          placeholder="Any specific maintenance requirements or site constraints..."
          className={cn(
            "resize-none text-foreground placeholder:text-muted-foreground",
            isMobile ? "min-h-[100px] text-base" : "min-h-[80px] text-sm"
          )}
          rows={isMobile ? 4 : 3}
        />
      </div>
    </div>
  );
};
