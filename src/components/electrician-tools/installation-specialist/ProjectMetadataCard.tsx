import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, User, Calendar, Shield, AlertTriangle } from "lucide-react";

interface ProjectMetadataCardProps {
  metadata: {
    workType: string;
    location: string;
    principalContractor: string;
    reference: string;
    preparedBy: string;
    date: string;
    programmeDuration: string;
    reviewDate: string;
    documentStatus: string;
    emergencyContacts: {
      emergency: string;
      siteManager: string;
      firstAider: string;
      hsOfficer: string;
      assemblyPoint: string;
    };
    riskAssessmentReference: string;
  };
}

export const ProjectMetadataCard = ({ metadata }: ProjectMetadataCardProps) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'default';
      case 'For Review':
        return 'secondary';
      case 'Draft':
        return 'outline';
      default:
        return 'destructive';
    }
  };

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-background">
      <CardContent className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <FileText className="h-5 w-5 text-blue-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-bold text-lg">Document Information</h3>
            <p className="text-xs text-muted-foreground">
              Method Statement Metadata
            </p>
          </div>
          <Badge variant={getStatusBadgeVariant(metadata.documentStatus)}>
            {metadata.documentStatus}
          </Badge>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <MetadataField icon={<FileText className="h-4 w-4" />} label="Work Type" value={metadata.workType} />
          <MetadataField icon={<MapPin className="h-4 w-4" />} label="Location" value={metadata.location} />
          <MetadataField icon={<User className="h-4 w-4" />} label="Principal Contractor" value={metadata.principalContractor} />
          <MetadataField icon={<FileText className="h-4 w-4" />} label="Reference" value={metadata.reference} />
          <MetadataField icon={<User className="h-4 w-4" />} label="Prepared By" value={metadata.preparedBy} />
          <MetadataField icon={<Calendar className="h-4 w-4" />} label="Date" value={metadata.date} />
          <MetadataField icon={<Calendar className="h-4 w-4" />} label="Programme Duration" value={metadata.programmeDuration} />
          <MetadataField icon={<Calendar className="h-4 w-4" />} label="Review Date" value={metadata.reviewDate} />
        </div>

        {/* Emergency Contacts Section */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-4">
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-400" />
            Emergency Contacts & Key Personnel
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-muted-foreground">Emergency:</span>
              <p className="font-bold text-amber-400">{metadata.emergencyContacts.emergency}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Site Manager:</span>
              <p className="font-medium">{metadata.emergencyContacts.siteManager}</p>
            </div>
            <div>
              <span className="text-muted-foreground">First Aider:</span>
              <p className="font-medium">{metadata.emergencyContacts.firstAider}</p>
            </div>
            <div>
              <span className="text-muted-foreground">H&S Officer:</span>
              <p className="font-medium">{metadata.emergencyContacts.hsOfficer}</p>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Assembly Point:</span>
              <p className="font-medium">{metadata.emergencyContacts.assemblyPoint}</p>
            </div>
          </div>
        </div>

        {/* Risk Assessment Reference */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs mb-4">
          <span className="text-muted-foreground">Associated Risk Assessment:</span>
          <p className="font-semibold text-blue-400 mb-2">{metadata.riskAssessmentReference}</p>
          <p className="text-muted-foreground leading-relaxed">
            This method statement must be read in conjunction with Risk Assessment Reference: {metadata.riskAssessmentReference}. All personnel must be briefed on both documents before commencing work.
          </p>
        </div>

        {/* Statutory Compliance Footer */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-400 mb-1">STATUTORY COMPLIANCE:</p>
              <p className="text-muted-foreground leading-relaxed">
                This method statement complies with CDM 2015, Health & Safety at Work Act 1974, and Management of Health & Safety at Work Regulations 1999. All work must be carried out in accordance with BS 7671:2018+A3:2024.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MetadataField = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-2">
    <div className="text-muted-foreground mt-0.5">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="font-medium text-sm truncate">{value}</p>
    </div>
  </div>
);
