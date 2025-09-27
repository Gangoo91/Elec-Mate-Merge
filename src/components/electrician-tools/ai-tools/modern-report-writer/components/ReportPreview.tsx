import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Eye, 
  Share2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  User,
  MapPin
} from "lucide-react";
import { WizardData } from "../types";

interface ReportPreviewProps {
  wizardData: WizardData;
  onGenerate?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  previewMode?: 'compact' | 'detailed';
}

const ReportPreview: React.FC<ReportPreviewProps> = ({
  wizardData,
  onGenerate,
  onDownload,
  onShare,
  previewMode = 'detailed'
}) => {
  const { template, clientDetails, inspectionDetails } = wizardData;

  const getComplianceStatus = () => {
    const assessment = inspectionDetails?.overallAssessment;
    if (assessment === 'satisfactory') return 'pass';
    if (assessment === 'unsatisfactory') return 'fail';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'fail': return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'pending': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      default: return 'text-muted-foreground border-muted/30 bg-muted/10';
    }
  };

  const estimatedPages = template?.id === 'eicr' ? '8-12' : 
                        template?.id === 'periodic-inspection' ? '6-10' : 
                        '3-6';

  const complianceStatus = getComplianceStatus();

  if (previewMode === 'compact') {
    return (
      <Card className="bg-elec-card border-elec-yellow/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <div>
              <div className="text-sm font-medium text-white">
                {template?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {clientDetails?.clientName} • {estimatedPages} pages
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={getStatusColor(complianceStatus)}
            >
              {complianceStatus === 'pass' && <CheckCircle2 className="h-3 w-3 mr-1" />}
              {complianceStatus === 'fail' && <AlertTriangle className="h-3 w-3 mr-1" />}
              {complianceStatus === 'pending' && <Info className="h-3 w-3 mr-1" />}
              {complianceStatus}
            </Badge>
            
            {onGenerate && (
              <Button size="sm" onClick={onGenerate} className="bg-elec-yellow text-elec-dark">
                Generate
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-card border-elec-yellow/30 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-elec-yellow/10 rounded-lg">
              <FileText className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Report Preview</h3>
              <p className="text-sm text-muted-foreground">
                {template?.name}
              </p>
            </div>
          </div>
          
          <Badge 
            variant="outline" 
            className={`${getStatusColor(complianceStatus)} text-sm`}
          >
            {complianceStatus === 'pass' && <CheckCircle2 className="h-4 w-4 mr-2" />}
            {complianceStatus === 'fail' && <AlertTriangle className="h-4 w-4 mr-2" />}
            {complianceStatus === 'pending' && <Info className="h-4 w-4 mr-2" />}
            {complianceStatus === 'pass' ? 'Compliant' : 
             complianceStatus === 'fail' ? 'Non-compliant' : 'Assessment Pending'}
          </Badge>
        </div>

        {/* Preview Content */}
        <div className="bg-elec-dark rounded-lg p-6 border border-elec-yellow/20">
          {/* Document Header */}
          <div className="space-y-4 pb-6 border-b border-elec-yellow/20">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">
                {template?.name}
              </h4>
              <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
                BS 7671:2018 Compliant
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Client:</span>
                  <span className="text-white">{clientDetails?.clientName || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Property:</span>
                  <span className="text-white truncate">{clientDetails?.installationAddress || 'Not specified'}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Date:</span>
                  <span className="text-white">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Pages:</span>
                  <span className="text-white">{estimatedPages} (estimated)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Summary */}
          {inspectionDetails?.overallAssessment && (
            <div className="py-4 border-b border-elec-yellow/20">
              <h5 className="text-sm font-medium text-white mb-2">Assessment Summary</h5>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Overall Assessment:</span>
                <Badge 
                  variant="outline" 
                  className={getStatusColor(complianceStatus)}
                >
                  {inspectionDetails.overallAssessment}
                </Badge>
              </div>
              
              {inspectionDetails?.faults && inspectionDetails.faults.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm text-muted-foreground">
                    {inspectionDetails.faults.length} fault(s) recorded
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Technical Details */}
          {(clientDetails?.earthingArrangements || clientDetails?.supplyCharacteristics) && (
            <div className="py-4">
              <h5 className="text-sm font-medium text-white mb-2">Technical Specifications</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {clientDetails.earthingArrangements && (
                  <div>
                    <span className="text-muted-foreground">Earthing: </span>
                    <span className="text-white">{clientDetails.earthingArrangements}</span>
                  </div>
                )}
                {clientDetails.supplyCharacteristics && (
                  <div>
                    <span className="text-muted-foreground">Supply: </span>
                    <span className="text-white">{clientDetails.supplyCharacteristics}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {onGenerate && (
            <Button
              onClick={onGenerate}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 flex-1"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          )}
          
          {onDownload && (
            <Button
              variant="outline"
              onClick={onDownload}
              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          )}
          
          {onShare && (
            <Button
              variant="outline"
              onClick={onShare}
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ReportPreview;