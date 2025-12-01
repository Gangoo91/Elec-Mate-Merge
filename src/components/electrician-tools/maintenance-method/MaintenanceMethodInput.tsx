import { MobileInput } from '@/components/ui/mobile-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MaintenanceEquipmentDetails } from '@/types/maintenance-method';

interface MaintenanceMethodInputProps {
  equipmentDetails: MaintenanceEquipmentDetails;
  onChange: (details: MaintenanceEquipmentDetails) => void;
}

export const MaintenanceMethodInput = ({
  equipmentDetails,
  onChange
}: MaintenanceMethodInputProps) => {
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
          required
        />
        <MobileInput
          label="Location"
          value={equipmentDetails.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g., Main Switch Room"
          required
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
        <Label>Installation Type</Label>
        <RadioGroup
          value={equipmentDetails.installationType}
          onValueChange={(value) => handleChange('installationType', value)}
        >
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="domestic" id="domestic" />
              <Label htmlFor="domestic" className="font-normal cursor-pointer">
                Domestic
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="commercial" id="commercial" />
              <Label htmlFor="commercial" className="font-normal cursor-pointer">
                Commercial
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="industrial" id="industrial" />
              <Label htmlFor="industrial" className="font-normal cursor-pointer">
                Industrial
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Known Issues or Observations</Label>
        <Textarea
          value={equipmentDetails.knownIssues || ''}
          onChange={(e) => handleChange('knownIssues', e.target.value)}
          placeholder="Describe any known defects, wear, or concerns..."
          className="min-h-[80px] sm:min-h-[100px] resize-none text-base"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Additional Requirements</Label>
        <Textarea
          value={equipmentDetails.additionalNotes || ''}
          onChange={(e) => handleChange('additionalNotes', e.target.value)}
          placeholder="Any specific maintenance requirements or site constraints..."
          className="min-h-[80px] sm:min-h-[100px] resize-none text-base"
          rows={3}
        />
      </div>
    </div>
  );
};
