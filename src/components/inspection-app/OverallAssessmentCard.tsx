
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';

interface OverallAssessmentCardProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const OverallAssessmentCard = ({ formData, onUpdate }: OverallAssessmentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-elec-yellow">Overall Assessment</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        <div>
          <Label>Overall assessment of the installation</Label>
          <MobileSelectPicker
            value={formData.overallAssessment || ''}
            onValueChange={(value) => onUpdate('overallAssessment', value)}
            options={[
              { value: 'satisfactory', label: 'Satisfactory' },
              { value: 'unsatisfactory', label: 'Unsatisfactory' },
            ]}
            placeholder="Select overall assessment"
            title="Overall Assessment"
          />
        </div>
        <div>
          <Label>Installation is satisfactory for continued use</Label>
          <MobileSelectPicker
            value={formData.satisfactoryForContinuedUse || ''}
            onValueChange={(value) => onUpdate('satisfactoryForContinuedUse', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'yes-with-observations', label: 'Yes, with observations' },
            ]}
            placeholder="Select recommendation"
            title="Satisfactory for Continued Use"
          />
        </div>
        <div>
          <Label>Additional Comments</Label>
          <Textarea
            placeholder="Any additional comments or recommendations..."
            value={formData.additionalComments || ''}
            onChange={(e) => onUpdate('additionalComments', e.target.value)}
            rows={4}
            className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallAssessmentCard;
