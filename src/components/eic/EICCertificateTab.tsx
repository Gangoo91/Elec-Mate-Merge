import React, { useState, useEffect } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Award,
  Shield,
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
  Building2,
  PenTool,
  Calendar,
  BadgeCheck,
  ClipboardCheck,
  FileWarning,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import SignatureInput from '@/components/signature/SignatureInput';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import EICCertificateActions from './EICCertificateActions';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';

interface EICCertificateTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  reportId: string;
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate: boolean;
}

// Reusable glass card component
const GlassCard = ({ children, className, color = 'white' }: { children: React.ReactNode; className?: string; color?: string }) => {
  const borderColors: Record<string, string> = {
    white: 'border-white/[0.08]',
    amber: 'border-amber-500/20',
    green: 'border-green-500/20',
    purple: 'border-purple-500/20',
  };

  return (
    <div className={cn(
      "rounded-xl bg-white/[0.02] backdrop-blur-sm border p-5",
      borderColors[color] || borderColors.white,
      className
    )}>
      {children}
    </div>
  );
};

// Sub-section header component
const SubSectionHeader = ({ icon: Icon, title, color }: { icon: any; title: string; color: string }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <div className={cn("p-1.5 rounded-lg", `bg-${color}/10`)}>
      <Icon className={cn("h-4 w-4", `text-${color}`)} />
    </div>
    <h4 className={cn("text-sm font-semibold", `text-${color}`)}>{title}</h4>
  </div>
);

const EICCertificateTab: React.FC<EICCertificateTabProps> = ({
  formData,
  onUpdate,
  reportId,
  onGenerateCertificate,
  onSaveDraft,
  canGenerateCertificate
}) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const { toast } = useToast();
  const { companyProfile } = useCompanyProfile();
  const { getDefaultProfile } = useInspectorProfiles();
  const [openSections, setOpenSections] = useState({
    reportAuthorised: true,
    compliance: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    haptics.tap();
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Auto-fill from inspector profile or company settings on mount if fields are empty
  useEffect(() => {
    if (!formData.reportAuthorisedByName) {
      const inspectorProfile = getDefaultProfile();

      // Try inspector profile first (more specific), then fall back to company profile
      if (inspectorProfile) {
        onUpdate('reportAuthorisedByName', inspectorProfile.name?.toUpperCase() || '');
        onUpdate('reportAuthorisedByForOnBehalfOf', inspectorProfile.companyName || '');
        onUpdate('reportAuthorisedByAddress', inspectorProfile.companyAddress || '');
        // Try to extract postcode from address
        const postcodeMatch = inspectorProfile.companyAddress?.match(/[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i);
        if (postcodeMatch) {
          onUpdate('reportAuthorisedByPostcode', postcodeMatch[0]);
        }
        onUpdate('reportAuthorisedByPhone', inspectorProfile.companyPhone || '');
        if (inspectorProfile.registrationNumber) {
          const membershipNo = inspectorProfile.registrationScheme
            ? `${inspectorProfile.registrationScheme} - ${inspectorProfile.registrationNumber}`
            : inspectorProfile.registrationNumber;
          onUpdate('reportAuthorisedByMembershipNo', membershipNo);
        }
        if (inspectorProfile.signatureData) {
          onUpdate('reportAuthorisedBySignature', inspectorProfile.signatureData);
        }
        onUpdate('reportAuthorisedByDate', new Date().toISOString().split('T')[0]);
      } else if (companyProfile) {
        // Fall back to company profile if no inspector profile
        if (companyProfile.inspector_name) {
          onUpdate('reportAuthorisedByName', companyProfile.inspector_name.toUpperCase());
        }
        if (companyProfile.company_name) {
          onUpdate('reportAuthorisedByForOnBehalfOf', companyProfile.company_name);
        }
        if (companyProfile.company_address) {
          onUpdate('reportAuthorisedByAddress', companyProfile.company_address);
        }
        if (companyProfile.company_postcode) {
          onUpdate('reportAuthorisedByPostcode', companyProfile.company_postcode);
        }
        if (companyProfile.company_phone) {
          onUpdate('reportAuthorisedByPhone', companyProfile.company_phone);
        }
        if (companyProfile.registration_number) {
          const membershipNo = companyProfile.registration_scheme
            ? `${companyProfile.registration_scheme} - ${companyProfile.registration_number}`
            : companyProfile.registration_number;
          onUpdate('reportAuthorisedByMembershipNo', membershipNo);
        }
        if (companyProfile.signature_data) {
          onUpdate('reportAuthorisedBySignature', companyProfile.signature_data);
        }
        onUpdate('reportAuthorisedByDate', new Date().toISOString().split('T')[0]);
      }
    }
  }, [companyProfile, getDefaultProfile]);

  // Completion checks
  const isReportAuthorisedComplete = formData.reportAuthorisedByName && formData.reportAuthorisedBySignature && formData.reportAuthorisedByDate;
  const isComplianceComplete = formData.bs7671Compliance;
  const allComplete = isReportAuthorisedComplete && isComplianceComplete;

  const getCompletionPercentage = (section: string) => {
    switch (section) {
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

  // Fill from inspector profile or business settings
  const fillFromBusinessSettings = () => {
    const inspectorProfile = getDefaultProfile();

    if (!inspectorProfile && !companyProfile) {
      toast({
        title: "No Profile Found",
        description: "Please set up your inspector profile or business settings first.",
        variant: "destructive"
      });
      return;
    }

    haptics.tap();

    // Prefer inspector profile, fall back to company profile
    if (inspectorProfile) {
      onUpdate('reportAuthorisedByName', inspectorProfile.name?.toUpperCase() || '');
      onUpdate('reportAuthorisedByForOnBehalfOf', inspectorProfile.companyName || '');
      onUpdate('reportAuthorisedByPosition', 'Inspector & Tester');
      onUpdate('reportAuthorisedByAddress', inspectorProfile.companyAddress || '');
      // Try to extract postcode from address
      const postcodeMatch = inspectorProfile.companyAddress?.match(/[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i);
      if (postcodeMatch) {
        onUpdate('reportAuthorisedByPostcode', postcodeMatch[0]);
      }
      onUpdate('reportAuthorisedByPhone', inspectorProfile.companyPhone || '');
      if (inspectorProfile.registrationNumber) {
        const membershipNo = inspectorProfile.registrationScheme
          ? `${inspectorProfile.registrationScheme} - ${inspectorProfile.registrationNumber}`
          : inspectorProfile.registrationNumber;
        onUpdate('reportAuthorisedByMembershipNo', membershipNo);
      }
      if (inspectorProfile.signatureData) {
        onUpdate('reportAuthorisedBySignature', inspectorProfile.signatureData);
      }
      onUpdate('reportAuthorisedByDate', new Date().toISOString().split('T')[0]);

      toast({
        title: "Details Filled",
        description: "Your inspector profile details have been applied"
      });
    } else if (companyProfile) {
      if (companyProfile.inspector_name) {
        onUpdate('reportAuthorisedByName', companyProfile.inspector_name.toUpperCase());
      }
      if (companyProfile.company_name) {
        onUpdate('reportAuthorisedByForOnBehalfOf', companyProfile.company_name);
      }
      onUpdate('reportAuthorisedByPosition', 'Inspector & Tester');
      if (companyProfile.company_address) {
        onUpdate('reportAuthorisedByAddress', companyProfile.company_address);
      }
      if (companyProfile.company_postcode) {
        onUpdate('reportAuthorisedByPostcode', companyProfile.company_postcode);
      }
      if (companyProfile.company_phone) {
        onUpdate('reportAuthorisedByPhone', companyProfile.company_phone);
      }
      if (companyProfile.registration_number) {
        const membershipNo = companyProfile.registration_scheme
          ? `${companyProfile.registration_scheme} - ${companyProfile.registration_number}`
          : companyProfile.registration_number;
        onUpdate('reportAuthorisedByMembershipNo', membershipNo);
      }
      if (companyProfile.signature_data) {
        onUpdate('reportAuthorisedBySignature', companyProfile.signature_data);
      }
      onUpdate('reportAuthorisedByDate', new Date().toISOString().split('T')[0]);

      toast({
        title: "Details Filled",
        description: "Your business details have been applied"
      });
    }
  };

  // Copy from inspector declaration
  const copyFromInspector = () => {
    onUpdate('reportAuthorisedByName', formData.inspectorName?.toUpperCase() || '');
    onUpdate('reportAuthorisedBySignature', formData.inspectorSignature);
    onUpdate('reportAuthorisedByDate', new Date().toISOString().split('T')[0]);
    onUpdate('reportAuthorisedByForOnBehalfOf', formData.inspectorCompany);
    onUpdate('reportAuthorisedByPosition', 'Inspector & Tester');
    onUpdate('reportAuthorisedByAddress', formData.inspectorAddress);
    onUpdate('reportAuthorisedByPostcode', formData.inspectorPostcode);
    onUpdate('reportAuthorisedByPhone', formData.inspectorPhone);
    toast({
      title: "Details Copied",
      description: "Inspector details copied to authorisation section"
    });
  };

  return (
    <div className="space-y-5">
      {/* Report Authorised For Issue By */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.reportAuthorised} onOpenChange={() => toggleSection('reportAuthorised')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Report Authorisation"
              icon={Award}
              isOpen={openSections.reportAuthorised}
              color="amber-500"
              completionPercentage={getCompletionPercentage('reportAuthorised')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "p-4 sm:p-5 space-y-5",
              isMobile && "px-3" // Slightly tighter padding on mobile for wider content
            )}>
              {/* Quick Fill Buttons */}
              <div className={cn(
                "flex gap-3",
                isMobile ? "flex-col" : "flex-row"
              )}>
                {/* Fill from Business Settings - Primary action */}
                <Button
                  onClick={fillFromBusinessSettings}
                  className={cn(
                    "h-12 touch-manipulation bg-elec-yellow/20 hover:bg-elec-yellow/30 border border-elec-yellow/40 text-elec-yellow font-medium rounded-xl active:scale-[0.98] transition-transform",
                    isMobile ? "w-full" : "flex-1"
                  )}
                  variant="outline"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Fill from Business Settings
                </Button>

              </div>

              {/* Signatory Details Card */}
              <GlassCard color="amber">
                <SubSectionHeader icon={User} title="Authorising Person" color="amber-400" />
                <div className="space-y-5">
                  {/* Name & Date Row */}
                  <div className="grid grid-cols-1 gap-5">
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Name (Capitals) *</Label>
                      <Input
                        id="reportAuthorisedByName"
                        value={formData.reportAuthorisedByName || ''}
                        onChange={(e) => onUpdate('reportAuthorisedByName', e.target.value.toUpperCase())}
                        placeholder="FULL NAME IN CAPITALS"
                        className={cn(
                          "uppercase h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl",
                          !formData.reportAuthorisedByName && 'border-red-500/30'
                        )}
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Company / For and on behalf of</Label>
                      <Input
                        id="reportAuthorisedByForOnBehalfOf"
                        value={formData.reportAuthorisedByForOnBehalfOf || ''}
                        onChange={(e) => onUpdate('reportAuthorisedByForOnBehalfOf', e.target.value)}
                        placeholder="Company or organisation"
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Position */}
                  <div className="space-y-2.5">
                    <Label className="text-sm text-white">Position</Label>
                    <Input
                      id="reportAuthorisedByPosition"
                      value={formData.reportAuthorisedByPosition || ''}
                      onChange={(e) => onUpdate('reportAuthorisedByPosition', e.target.value)}
                      placeholder="Job title or position"
                      className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2.5">
                    <Label className="text-sm text-white">Address</Label>
                    <Textarea
                      id="reportAuthorisedByAddress"
                      rows={2}
                      value={formData.reportAuthorisedByAddress || ''}
                      onChange={(e) => onUpdate('reportAuthorisedByAddress', e.target.value)}
                      placeholder="Full business address"
                      className="text-base touch-manipulation min-h-[70px] bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                    />
                  </div>

                  {/* Postcode, Tel, Date Row - Stack on mobile */}
                  <div className={cn(
                    "grid gap-4",
                    isMobile ? "grid-cols-1" : "grid-cols-3"
                  )}>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Postcode</Label>
                      <Input
                        id="reportAuthorisedByPostcode"
                        value={formData.reportAuthorisedByPostcode || ''}
                        onChange={(e) => onUpdate('reportAuthorisedByPostcode', e.target.value)}
                        placeholder="AB1 2CD"
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Tel No</Label>
                      <Input
                        id="reportAuthorisedByPhone"
                        type="tel"
                        value={formData.reportAuthorisedByPhone || ''}
                        onChange={(e) => onUpdate('reportAuthorisedByPhone', e.target.value)}
                        placeholder="Phone number"
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Date *</Label>
                      <Input
                        id="reportAuthorisedByDate"
                        type="date"
                        value={formData.reportAuthorisedByDate || ''}
                        onChange={(e) => onUpdate('reportAuthorisedByDate', e.target.value)}
                        className={cn(
                          "h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl",
                          !formData.reportAuthorisedByDate && 'border-red-500/30'
                        )}
                      />
                    </div>
                  </div>

                  {/* Membership No */}
                  <div className="space-y-2.5">
                    <Label className="text-sm text-white">CP Scheme / Membership No</Label>
                    <Input
                      id="reportAuthorisedByMembershipNo"
                      value={formData.reportAuthorisedByMembershipNo || ''}
                      onChange={(e) => onUpdate('reportAuthorisedByMembershipNo', e.target.value)}
                      placeholder="Membership or registration number"
                      className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                    />
                  </div>
                </div>
              </GlassCard>

              {/* Signature Card */}
              <GlassCard color="amber">
                <SubSectionHeader icon={PenTool} title="Authorising Signature *" color="amber-400" />
                <SignatureInput
                  value={formData.reportAuthorisedBySignature || ''}
                  onChange={(value) => onUpdate('reportAuthorisedBySignature', value || '')}
                  placeholder="Signature of authorising person"
                  required={true}
                />
              </GlassCard>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Compliance Declarations */}
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
            <div className="p-4 sm:p-5 space-y-5">
              {/* Compliance Checkboxes */}
              <GlassCard color="green">
                <SubSectionHeader icon={BadgeCheck} title="Compliance Confirmations" color="green-400" />
                <div className="space-y-4">
                  {/* BS 7671 Compliance - Required */}
                  <label className={cn(
                    "flex items-start gap-4 p-4 rounded-xl cursor-pointer touch-manipulation active:scale-[0.99] transition-transform",
                    formData.bs7671Compliance
                      ? "bg-green-500/15 border border-green-500/40"
                      : "bg-white/[0.03] border border-white/10"
                  )}>
                    <Checkbox
                      id="bs7671Compliance"
                      checked={formData.bs7671Compliance || false}
                      onCheckedChange={(checked) => onUpdate('bs7671Compliance', checked)}
                      className="h-6 w-6 mt-0.5 border-green-500/50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <div className="space-y-1 flex-1">
                      <span className="text-sm font-medium text-white block">BS 7671 Compliance *</span>
                      <span className="text-xs text-white/70 block leading-relaxed">
                        Installation complies with BS 7671:2018 (18th Edition) and Amendment 2
                      </span>
                    </div>
                  </label>

                  {/* Building Regs Compliance - Optional */}
                  <label className={cn(
                    "flex items-start gap-4 p-4 rounded-xl cursor-pointer touch-manipulation active:scale-[0.99] transition-transform",
                    formData.buildingRegsCompliance
                      ? "bg-elec-yellow/10 border border-elec-yellow/30"
                      : "bg-white/[0.03] border border-white/10"
                  )}>
                    <Checkbox
                      id="buildingRegsCompliance"
                      checked={formData.buildingRegsCompliance || false}
                      onCheckedChange={(checked) => onUpdate('buildingRegsCompliance', checked)}
                      className="h-6 w-6 mt-0.5 border-elec-yellow/50 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <div className="space-y-1 flex-1">
                      <span className="text-sm font-medium text-white block">Building Regulations Compliance</span>
                      <span className="text-xs text-white/70 block leading-relaxed">
                        Installation complies with Building Regulations (Part P where applicable)
                      </span>
                    </div>
                  </label>

                  {/* Competent Person Scheme - Optional */}
                  <label className={cn(
                    "flex items-start gap-4 p-4 rounded-xl cursor-pointer touch-manipulation active:scale-[0.99] transition-transform",
                    formData.competentPersonScheme
                      ? "bg-elec-yellow/10 border border-elec-yellow/30"
                      : "bg-white/[0.03] border border-white/10"
                  )}>
                    <Checkbox
                      id="competentPersonScheme"
                      checked={formData.competentPersonScheme || false}
                      onCheckedChange={(checked) => onUpdate('competentPersonScheme', checked)}
                      className="h-6 w-6 mt-0.5 border-elec-yellow/50 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <div className="space-y-1 flex-1">
                      <span className="text-sm font-medium text-white block">Competent Person Scheme</span>
                      <span className="text-xs text-white/70 block leading-relaxed">
                        Work carried out under a registered Competent Person Scheme
                      </span>
                    </div>
                  </label>
                </div>
              </GlassCard>

              {/* Additional Notes Card */}
              <GlassCard color="white">
                <SubSectionHeader icon={FileText} title="Additional Notes" color="white" />
                <div className="space-y-2.5">
                  <Label className="text-sm text-white">Comments & Observations</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Any relevant information about the installation, design decisions, or special considerations..."
                    value={formData.additionalNotes || ''}
                    onChange={(e) => onUpdate('additionalNotes', e.target.value)}
                    rows={3}
                    className="text-base touch-manipulation min-h-[100px] bg-white/[0.03] border-white/10 focus:border-elec-yellow focus:ring-elec-yellow/20 rounded-xl"
                  />
                </div>
              </GlassCard>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Validation Summary */}
      {allComplete ? (
        <GlassCard className="border-green-500/30 bg-green-500/10">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-green-500/20 h-fit">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-300 mb-1">Certificate Ready</p>
              <p className="text-xs text-white/70">
                All sections complete. You can now generate the EIC.
              </p>
            </div>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="border-amber-500/30 bg-amber-500/10">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 h-fit">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-300 mb-2">Incomplete Sections</p>
              <ul className="space-y-1.5">
                {!isReportAuthorisedComplete && (
                  <li className="text-xs text-white/70 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Complete authorisation with name, date, and signature
                  </li>
                )}
                {!isComplianceComplete && (
                  <li className="text-xs text-white/70 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Confirm BS 7671 compliance declaration
                  </li>
                )}
              </ul>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Certificate Actions */}
      <EICCertificateActions
        formData={formData}
        reportId={reportId}
        onGenerateCertificate={onGenerateCertificate}
        onSaveDraft={onSaveDraft}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default EICCertificateTab;
