import { MobileInput } from '@/components/ui/mobile-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { InstallationProjectDetails as ProjectDetailsType } from '@/types/installation-method';

interface InstallationProjectDetailsProps {
  projectDetails: ProjectDetailsType;
  onChange: (details: ProjectDetailsType) => void;
}

export const InstallationProjectDetails = ({
  projectDetails,
  onChange
}: InstallationProjectDetailsProps) => {
  const handleChange = (field: keyof ProjectDetailsType, value: string) => {
    onChange({
      ...projectDetails,
      [field]: value
    });
  };

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <MobileInput
          label="Project Name"
          value={projectDetails.projectName}
          onChange={(e) => handleChange('projectName', e.target.value)}
          placeholder="e.g., Smith Residence Kitchen Extension"
        />
        <MobileInput
          label="Location"
          value={projectDetails.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g., 123 High Street, London"
        />
        <MobileInput
          label="Client Name"
          value={projectDetails.clientName || ''}
          onChange={(e) => handleChange('clientName', e.target.value)}
          placeholder="e.g., John Smith"
        />
        <MobileInput
          label="Electrician Name"
          value={projectDetails.electricianName || ''}
          onChange={(e) => handleChange('electricianName', e.target.value)}
          placeholder="Your name"
        />
        <MobileInput
          label="Expected Start Date"
          type="date"
          value={projectDetails.expectedStartDate || ''}
          onChange={(e) => handleChange('expectedStartDate', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Additional Requirements</Label>
        <Textarea
          value={projectDetails.additionalNotes || ''}
          onChange={(e) => handleChange('additionalNotes', e.target.value)}
          placeholder="Any specific requirements, site constraints, or special considerations..."
          className="min-h-[80px] sm:min-h-[100px] resize-none text-base"
          rows={3}
          autoComplete="off"
          spellCheck={true}
        />
      </div>
    </div>
  );
};
