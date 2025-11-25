import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MobileInput } from '@/components/ui/mobile-input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface ConstraintsSectionProps {
  onConstraintsChange: (constraints: ProjectConstraints) => void;
  initialConstraints?: ProjectConstraints;
}

export interface ProjectConstraints {
  accessRestrictions: string;
  workingHours: string;
  occupiedProperty: boolean;
  medicalEquipment: boolean;
  budgetLimit?: number;
  otherTrades: string;
  specialRequirements: string;
}

export const ConstraintsSection = ({
  onConstraintsChange,
  initialConstraints,
}: ConstraintsSectionProps) => {
  const [constraints, setConstraints] = useState<ProjectConstraints>(
    initialConstraints || {
      accessRestrictions: '',
      workingHours: '8:00 AM - 5:00 PM',
      occupiedProperty: false,
      medicalEquipment: false,
      otherTrades: '',
      specialRequirements: '',
    }
  );

  const handleUpdate = (updates: Partial<ProjectConstraints>) => {
    const updated = { ...constraints, ...updates };
    setConstraints(updated);
    onConstraintsChange(updated);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Project Constraints</CardTitle>
        <CardDescription>
          Specify any limitations or special requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Access Restrictions */}
        <MobileInput
          label="Access Restrictions"
          placeholder="e.g., Keys available from 9am, alarm code required"
          value={constraints.accessRestrictions}
          onChange={(e) => handleUpdate({ accessRestrictions: e.target.value })}
          hint="How to access the property"
        />

        {/* Working Hours */}
        <MobileInput
          label="Working Hours"
          placeholder="e.g., 8:00 AM - 5:00 PM, weekends allowed"
          value={constraints.workingHours}
          onChange={(e) => handleUpdate({ workingHours: e.target.value })}
        />

        {/* Property Occupation */}
        <div className="space-y-3 p-4 border border-border/40 rounded-lg">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="occupied"
              checked={constraints.occupiedProperty}
              onCheckedChange={(checked) => handleUpdate({ occupiedProperty: checked as boolean })}
            />
            <Label htmlFor="occupied" className="text-sm cursor-pointer">
              Property will be occupied during works
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="medical"
              checked={constraints.medicalEquipment}
              onCheckedChange={(checked) => handleUpdate({ medicalEquipment: checked as boolean })}
            />
            <Label htmlFor="medical" className="text-sm cursor-pointer">
              Medical equipment requires continuous power
            </Label>
          </div>
        </div>

        {/* Budget Limit */}
        <MobileInput
          label="Budget Limit (optional)"
          type="number"
          placeholder="5000"
          unit="£"
          value={constraints.budgetLimit || ''}
          onChange={(e) => handleUpdate({ budgetLimit: e.target.value ? Number(e.target.value) : undefined })}
        />

        {/* Other Trades */}
        <div className="space-y-2">
          <Label htmlFor="other-trades" className="text-sm font-medium">
            Other Trades On Site
          </Label>
          <Textarea
            id="other-trades"
            placeholder="e.g., Plasterer booked for Day 5, plumber working Days 2-3"
            value={constraints.otherTrades}
            onChange={(e) => handleUpdate({ otherTrades: e.target.value })}
            className="min-h-[80px] resize-none"
          />
        </div>

        {/* Special Requirements */}
        <div className="space-y-2">
          <Label htmlFor="special-requirements" className="text-sm font-medium">
            Special Requirements
          </Label>
          <Textarea
            id="special-requirements"
            placeholder="e.g., Dust sheets essential, no drilling after 4pm, protect antique furniture"
            value={constraints.specialRequirements}
            onChange={(e) => handleUpdate({ specialRequirements: e.target.value })}
            className="min-h-[80px] resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
};
