import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, MapPin } from 'lucide-react';
import { JobDetails } from '@/types/quote';

interface InvoiceJobDetailsStepProps {
  jobDetails?: JobDetails;
  onUpdate: (jobDetails: Partial<JobDetails>) => void;
}

export const InvoiceJobDetailsStep = ({ jobDetails, onUpdate }: InvoiceJobDetailsStepProps) => {
  const handleChange = (field: keyof JobDetails, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Project Details</h2>
        <p className="text-muted-foreground">
          Add or update project information for this invoice
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Complete rewire of residential property"
            value={jobDetails?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            id="description"
            placeholder="Provide a detailed description of the project..."
            value={jobDetails?.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Work Location *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="Full address or postcode"
              className="pl-10"
              value={jobDetails?.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workStartDate">Work Start Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="workStartDate"
              type="date"
              className="pl-10"
              value={jobDetails?.workStartDate || ''}
              onChange={(e) => handleChange('workStartDate', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequirements">Special Requirements</Label>
          <Textarea
            id="specialRequirements"
            placeholder="Any special requirements, access restrictions, or notes..."
            value={jobDetails?.specialRequirements || ''}
            onChange={(e) => handleChange('specialRequirements', e.target.value)}
            rows={3}
          />
        </div>
      </Card>
    </div>
  );
};
