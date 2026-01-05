
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
          <Select
            value={formData.overallAssessment || ''}
            onValueChange={(value) => onUpdate('overallAssessment', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
              <SelectValue placeholder="Select overall assessment" />
            </SelectTrigger>
            <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
              <SelectItem value="satisfactory">Satisfactory</SelectItem>
              <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Installation is satisfactory for continued use</Label>
          <Select
            value={formData.satisfactoryForContinuedUse || ''}
            onValueChange={(value) => onUpdate('satisfactoryForContinuedUse', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
              <SelectValue placeholder="Select recommendation" />
            </SelectTrigger>
            <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes-with-observations">Yes, with observations</SelectItem>
            </SelectContent>
          </Select>
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
