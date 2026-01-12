import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  UserCheck,
  Award,
  Shield,
  User,
  FileText,
  Download,
  Save,
  Mail,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import SignatureInput from '@/components/signature/SignatureInput';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import EICCertificateActions from './EICCertificateActions';

interface EICCertificateTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  reportId: string;
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate: boolean;
}

const EICCertificateTab: React.FC<EICCertificateTabProps> = ({
  formData,
  onUpdate,
  reportId,
  onGenerateCertificate,
  onSaveDraft,
  canGenerateCertificate
}) => {
  const { toast } = useToast();
  const [openSections, setOpenSections] = useState({
    inspectedBy: true,
    reportAuthorised: true,
    compliance: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Completion checks
  const isInspectedByComplete = formData.inspectedByName && formData.inspectedBySignature;
  const isReportAuthorisedComplete = formData.reportAuthorisedByName && formData.reportAuthorisedBySignature && formData.reportAuthorisedByDate;
  const isComplianceComplete = formData.bs7671Compliance;

  const getCompletionPercentage = (section: string) => {
    switch (section) {
      case 'inspectedBy': {
        const fields = ['inspectedByName', 'inspectedBySignature'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'reportAuthorised': {
        const fields = ['reportAuthorisedByName', 'reportAuthorisedBySignature', 'reportAuthorisedByDate'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'compliance':
        return formData.bs7671Compliance ? 100 : 0;
      default:
        return 0;
    }
  };

  // Copy from inspector declaration
  const copyFromInspector = () => {
    onUpdate('inspectedByName', formData.inspectorName);
    onUpdate('inspectedBySignature', formData.inspectorSignature);
    onUpdate('inspectedByForOnBehalfOf', formData.inspectorCompany);
    onUpdate('inspectedByPosition', 'Inspector & Tester');
    onUpdate('inspectedByAddress', formData.inspectorCompany);
    onUpdate('inspectedByCpScheme', formData.inspectorQualifications?.split(',')[0] || '');
    toast({
      title: "Details copied",
      description: "Inspector details copied to 'Inspected By' authorisation"
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Section 1: Inspected By */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.inspectedBy} onOpenChange={() => toggleSection('inspectedBy')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Inspected By"
              icon={UserCheck}
              isOpen={openSections.inspectedBy}
              color="purple-500"
              completionPercentage={getCompletionPercentage('inspectedBy')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
              {/* Copy from Inspector Button */}
              {formData.inspectorName && (
                <Button
                  onClick={copyFromInspector}
                  variant="outline"
                  className="w-full h-11 touch-manipulation border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300"
                >
                  <User className="h-4 w-4 mr-2" />
                  Copy from Inspector Declaration
                </Button>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inspectedByName">Name (Capitals) *</Label>
                  <Input
                    id="inspectedByName"
                    value={formData.inspectedByName || ''}
                    onChange={(e) => onUpdate('inspectedByName', e.target.value.toUpperCase())}
                    placeholder="FULL NAME IN CAPITALS"
                    className="uppercase h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspectedByPosition">Position</Label>
                  <Input
                    id="inspectedByPosition"
                    value={formData.inspectedByPosition || ''}
                    onChange={(e) => onUpdate('inspectedByPosition', e.target.value)}
                    placeholder="e.g., Inspector & Tester"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inspectedByForOnBehalfOf">For/on behalf of</Label>
                  <Input
                    id="inspectedByForOnBehalfOf"
                    value={formData.inspectedByForOnBehalfOf || ''}
                    onChange={(e) => onUpdate('inspectedByForOnBehalfOf', e.target.value)}
                    placeholder="Company or organisation name"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspectedByCpScheme">CP Scheme</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="inspectedByCpScheme"
                      value={formData.inspectedByCpScheme || ''}
                      onChange={(e) => onUpdate('inspectedByCpScheme', e.target.value)}
                      placeholder="Competent Person Scheme"
                      disabled={formData.inspectedByCpSchemeNA}
                      className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500", formData.inspectedByCpSchemeNA && 'opacity-50')}
                    />
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Checkbox
                        id="inspectedByCpSchemeNA"
                        checked={formData.inspectedByCpSchemeNA || false}
                        onCheckedChange={(checked) => {
                          onUpdate('inspectedByCpSchemeNA', checked);
                          if (checked) onUpdate('inspectedByCpScheme', '');
                        }}
                        className="border-white/40 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                      />
                      <Label htmlFor="inspectedByCpSchemeNA" className="cursor-pointer text-sm">N/A</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspectedByAddress">Address</Label>
                <Textarea
                  id="inspectedByAddress"
                  rows={2}
                  value={formData.inspectedByAddress || ''}
                  onChange={(e) => onUpdate('inspectedByAddress', e.target.value)}
                  placeholder="Full business address"
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label>Signature *</Label>
                <SignatureInput
                  value={formData.inspectedBySignature || ''}
                  onChange={(value) => onUpdate('inspectedBySignature', value || '')}
                  placeholder="Signature of inspector"
                  required={true}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Section 2: Report Authorised For Issue By */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.reportAuthorised} onOpenChange={() => toggleSection('reportAuthorised')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Report Authorised For Issue"
              icon={Award}
              isOpen={openSections.reportAuthorised}
              color="amber-500"
              completionPercentage={getCompletionPercentage('reportAuthorised')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
              {/* Same as Inspected By Checkbox */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <Checkbox
                  id="eicSameAsInspectedBy"
                  checked={formData.eicSameAsInspectedBy || false}
                  onCheckedChange={(checked) => {
                    onUpdate('eicSameAsInspectedBy', checked);
                    if (checked) {
                      onUpdate('reportAuthorisedByName', formData.inspectedByName);
                      onUpdate('reportAuthorisedBySignature', formData.inspectedBySignature);
                      onUpdate('reportAuthorisedByDate', new Date().toISOString().split('T')[0]);
                      onUpdate('reportAuthorisedByForOnBehalfOf', formData.inspectedByForOnBehalfOf);
                      onUpdate('reportAuthorisedByPosition', formData.inspectedByPosition);
                      onUpdate('reportAuthorisedByAddress', formData.inspectedByAddress);
                      onUpdate('reportAuthorisedByMembershipNo', formData.inspectedByCpScheme);
                      toast({
                        title: "Details copied",
                        description: "Copied from 'Inspected By' section"
                      });
                    }
                  }}
                  className="border-amber-500/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 mt-0.5"
                />
                <Label htmlFor="eicSameAsInspectedBy" className="text-sm font-medium cursor-pointer leading-relaxed text-amber-200">
                  Same person as Inspected By (auto-populate fields)
                </Label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportAuthorisedByName">Name (Capitals) *</Label>
                  <Input
                    id="reportAuthorisedByName"
                    value={formData.reportAuthorisedByName || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByName', e.target.value.toUpperCase())}
                    placeholder="FULL NAME IN CAPITALS"
                    className="uppercase h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportAuthorisedByDate">Date *</Label>
                  <Input
                    id="reportAuthorisedByDate"
                    type="date"
                    value={formData.reportAuthorisedByDate || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportAuthorisedByForOnBehalfOf">For/on behalf of</Label>
                  <Input
                    id="reportAuthorisedByForOnBehalfOf"
                    value={formData.reportAuthorisedByForOnBehalfOf || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByForOnBehalfOf', e.target.value)}
                    placeholder="Company or organisation name"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportAuthorisedByPosition">Position</Label>
                  <Input
                    id="reportAuthorisedByPosition"
                    value={formData.reportAuthorisedByPosition || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByPosition', e.target.value)}
                    placeholder="Job title or position"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportAuthorisedByAddress">Address</Label>
                  <Textarea
                    id="reportAuthorisedByAddress"
                    rows={2}
                    value={formData.reportAuthorisedByAddress || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByAddress', e.target.value)}
                    placeholder="Full business address"
                    className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportAuthorisedByMembershipNo">Membership No</Label>
                  <Input
                    id="reportAuthorisedByMembershipNo"
                    value={formData.reportAuthorisedByMembershipNo || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByMembershipNo', e.target.value)}
                    placeholder="Membership or registration number"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Signature *</Label>
                <SignatureInput
                  value={formData.reportAuthorisedBySignature || ''}
                  onChange={(value) => onUpdate('reportAuthorisedBySignature', value || '')}
                  placeholder="Signature of authorising person"
                  required={true}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Section 3: Compliance Declarations */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.compliance} onOpenChange={() => toggleSection('compliance')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Compliance Declarations"
              icon={Shield}
              isOpen={openSections.compliance}
              color="green-500"
              completionPercentage={getCompletionPercentage('compliance')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <Checkbox
                    id="bs7671Compliance"
                    checked={formData.bs7671Compliance || false}
                    onCheckedChange={(checked) => onUpdate('bs7671Compliance', checked)}
                    className="border-green-500/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="bs7671Compliance" className="cursor-pointer font-medium text-green-200">
                      BS 7671 Compliance *
                    </Label>
                    <p className="text-xs text-white/60">
                      Installation complies with BS 7671:2018 (18th Edition) and Amendment 2
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <Checkbox
                    id="buildingRegsCompliance"
                    checked={formData.buildingRegsCompliance || false}
                    onCheckedChange={(checked) => onUpdate('buildingRegsCompliance', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="buildingRegsCompliance" className="cursor-pointer font-medium">
                      Building Regulations Compliance
                    </Label>
                    <p className="text-xs text-white/60">
                      Installation complies with relevant Building Regulations (Part P where applicable)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <Checkbox
                    id="competentPersonScheme"
                    checked={formData.competentPersonScheme || false}
                    onCheckedChange={(checked) => onUpdate('competentPersonScheme', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="competentPersonScheme" className="cursor-pointer font-medium">
                      Competent Person Scheme
                    </Label>
                    <p className="text-xs text-white/60">
                      Work carried out under a registered Competent Person Scheme (self-certification)
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <Label htmlFor="additionalNotes">Additional Notes & Comments</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Include any relevant information about the installation, design decisions, special considerations, or limitations..."
                  value={formData.additionalNotes || ''}
                  onChange={(e) => onUpdate('additionalNotes', e.target.value)}
                  rows={3}
                  className="text-base touch-manipulation min-h-[100px] border-white/30 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Validation Summary */}
      {isInspectedByComplete && isReportAuthorisedComplete && isComplianceComplete ? (
        <Alert className="border-green-500/30 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-200">
            <strong>Certificate Ready.</strong> All authorisation sections are complete. You can now generate the EIC.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-amber-500/30 bg-amber-500/10">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            <strong>Incomplete sections:</strong>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              {!isInspectedByComplete && (
                <li>Complete 'Inspected By' section with name and signature</li>
              )}
              {!isReportAuthorisedComplete && (
                <li>Complete 'Report Authorised For Issue' with name, date, and signature</li>
              )}
              {!isComplianceComplete && (
                <li>Confirm BS 7671 compliance declaration</li>
              )}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Certificate Actions */}
      <EICCertificateActions
        formData={formData}
        reportId={reportId}
        onGenerateCertificate={onGenerateCertificate}
        onSaveDraft={onSaveDraft}
      />
    </div>
  );
};

export default EICCertificateTab;
