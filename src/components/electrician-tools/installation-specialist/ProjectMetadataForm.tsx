import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProjectMetadata {
  documentRef: string;
  issueDate: string;
  reviewDate: string;
  companyName: string;
  contractor: string;
  siteManagerName: string;
  siteManagerPhone: string;
  firstAiderName: string;
  firstAiderPhone: string;
  safetyOfficerName: string;
  safetyOfficerPhone: string;
  assemblyPoint: string;
  startDate: string;
  completionDate: string;
  siteSupervisor: string;
  clientContact: string;
  preparedByName: string;
  preparedByPosition: string;
  preparedDate: string;
  authorisedByName: string;
  authorisedByPosition: string;
  authorisedDate: string;
}

interface ProjectMetadataFormProps {
  metadata: ProjectMetadata;
  onChange: (metadata: ProjectMetadata) => void;
}

export const ProjectMetadataForm = ({ metadata, onChange }: ProjectMetadataFormProps) => {
  const handleChange = (field: keyof ProjectMetadata, value: string) => {
    onChange({ ...metadata, [field]: value });
  };

  // Auto-generate values on mount if empty
  const today = new Date().toISOString().split('T')[0];
  const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <Card className="p-4 sm:p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Project Metadata</h3>
        <p className="text-sm text-muted-foreground">Complete these details for the formal method statement document</p>
      </div>

      {/* Document Information */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary">Document Information</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="documentRef">Document Reference</Label>
            <Input
              id="documentRef"
              value={metadata.documentRef}
              onChange={(e) => handleChange('documentRef', e.target.value)}
              placeholder="MS-2024-001"
            />
          </div>
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={metadata.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="Your Company Ltd"
            />
          </div>
          <div>
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input
              id="issueDate"
              type="date"
              value={metadata.issueDate || today}
              onChange={(e) => handleChange('issueDate', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="reviewDate">Review Date</Label>
            <Input
              id="reviewDate"
              type="date"
              value={metadata.reviewDate || nextYear}
              onChange={(e) => handleChange('reviewDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Project Schedule */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary">Project Schedule</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={metadata.startDate || today}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="completionDate">Completion Date</Label>
            <Input
              id="completionDate"
              type="date"
              value={metadata.completionDate}
              onChange={(e) => handleChange('completionDate', e.target.value)}
              placeholder="Expected completion"
            />
          </div>
        </div>
      </div>

      {/* Key Personnel */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary">Key Personnel</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contractor">Main Contractor</Label>
            <Input
              id="contractor"
              value={metadata.contractor}
              onChange={(e) => handleChange('contractor', e.target.value)}
              placeholder="Main Contractor Ltd"
            />
          </div>
          <div>
            <Label htmlFor="siteSupervisor">Site Supervisor</Label>
            <Input
              id="siteSupervisor"
              value={metadata.siteSupervisor}
              onChange={(e) => handleChange('siteSupervisor', e.target.value)}
              placeholder="John Smith"
            />
          </div>
          <div>
            <Label htmlFor="siteManagerName">Site Manager Name</Label>
            <Input
              id="siteManagerName"
              value={metadata.siteManagerName}
              onChange={(e) => handleChange('siteManagerName', e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <Label htmlFor="siteManagerPhone">Site Manager Phone</Label>
            <Input
              id="siteManagerPhone"
              type="tel"
              value={metadata.siteManagerPhone}
              onChange={(e) => handleChange('siteManagerPhone', e.target.value)}
              placeholder="07700 900123"
            />
          </div>
          <div>
            <Label htmlFor="firstAiderName">First Aider Name</Label>
            <Input
              id="firstAiderName"
              value={metadata.firstAiderName}
              onChange={(e) => handleChange('firstAiderName', e.target.value)}
              placeholder="Sarah Williams"
            />
          </div>
          <div>
            <Label htmlFor="firstAiderPhone">First Aider Phone</Label>
            <Input
              id="firstAiderPhone"
              type="tel"
              value={metadata.firstAiderPhone}
              onChange={(e) => handleChange('firstAiderPhone', e.target.value)}
              placeholder="07700 900124"
            />
          </div>
          <div>
            <Label htmlFor="safetyOfficerName">Safety Officer Name</Label>
            <Input
              id="safetyOfficerName"
              value={metadata.safetyOfficerName}
              onChange={(e) => handleChange('safetyOfficerName', e.target.value)}
              placeholder="Mike Johnson"
            />
          </div>
          <div>
            <Label htmlFor="safetyOfficerPhone">Safety Officer Phone</Label>
            <Input
              id="safetyOfficerPhone"
              type="tel"
              value={metadata.safetyOfficerPhone}
              onChange={(e) => handleChange('safetyOfficerPhone', e.target.value)}
              placeholder="07700 900125"
            />
          </div>
          <div>
            <Label htmlFor="clientContact">Client Contact</Label>
            <Input
              id="clientContact"
              value={metadata.clientContact}
              onChange={(e) => handleChange('clientContact', e.target.value)}
              placeholder="Client Name - 07700 900130"
            />
          </div>
        </div>
      </div>

      {/* Emergency Information */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary">Emergency Information</h4>
        <div>
          <Label htmlFor="assemblyPoint">Assembly Point</Label>
          <Textarea
            id="assemblyPoint"
            value={metadata.assemblyPoint}
            onChange={(e) => handleChange('assemblyPoint', e.target.value)}
            placeholder="Main Car Park, North End"
            rows={2}
          />
        </div>
      </div>

      {/* Approval Signatures */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-primary">Document Approval</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="preparedByName">Prepared By (Name)</Label>
            <Input
              id="preparedByName"
              value={metadata.preparedByName}
              onChange={(e) => handleChange('preparedByName', e.target.value)}
              placeholder="John Smith"
            />
          </div>
          <div>
            <Label htmlFor="preparedByPosition">Prepared By (Position)</Label>
            <Input
              id="preparedByPosition"
              value={metadata.preparedByPosition}
              onChange={(e) => handleChange('preparedByPosition', e.target.value)}
              placeholder="Senior Electrician"
            />
          </div>
          <div>
            <Label htmlFor="preparedDate">Prepared Date</Label>
            <Input
              id="preparedDate"
              type="date"
              value={metadata.preparedDate || today}
              onChange={(e) => handleChange('preparedDate', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="authorisedByName">Authorised By (Name)</Label>
            <Input
              id="authorisedByName"
              value={metadata.authorisedByName}
              onChange={(e) => handleChange('authorisedByName', e.target.value)}
              placeholder="Mike Johnson"
            />
          </div>
          <div>
            <Label htmlFor="authorisedByPosition">Authorised By (Position)</Label>
            <Input
              id="authorisedByPosition"
              value={metadata.authorisedByPosition}
              onChange={(e) => handleChange('authorisedByPosition', e.target.value)}
              placeholder="Contracts Manager"
            />
          </div>
          <div>
            <Label htmlFor="authorisedDate">Authorised Date</Label>
            <Input
              id="authorisedDate"
              type="date"
              value={metadata.authorisedDate || today}
              onChange={(e) => handleChange('authorisedDate', e.target.value)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};