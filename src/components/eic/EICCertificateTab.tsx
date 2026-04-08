import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Award,
  Shield,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import SignatureInput from '@/components/signature/SignatureInput';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import EICCertificateActions from './EICCertificateActions';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';

interface EICCertificateTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
  reportId: string;
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate: boolean;
}

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const CollapsibleSection = ({
  title,
  icon: Icon,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <div className="border-b border-white/[0.06] pb-1">
      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
      <h3 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h3>
    </div>
    <div>{children}</div>
  </div>
);

const EICCertificateTab: React.FC<EICCertificateTabProps> = ({
  formData,
  onUpdate,
  reportId,
  onGenerateCertificate,
  onSaveDraft,
  canGenerateCertificate,
}) => {
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const { toast } = useToast();
  const { companyProfile } = useCompanyProfile();
  const { getDefaultProfile } = useInspectorProfiles();
  const [openSections, setOpenSections] = useState({
    reportAuthorised: true,
    compliance: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    haptic.light();
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
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
        const postcodeMatch = inspectorProfile.companyAddress?.match(
          /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i
        );
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
  const isReportAuthorisedComplete =
    formData.reportAuthorisedByName &&
    formData.reportAuthorisedBySignature &&
    formData.reportAuthorisedByDate;
  const isComplianceComplete = formData.bs7671Compliance;
  const allComplete = isReportAuthorisedComplete && isComplianceComplete;

  const getCompletionPercentage = (section: string) => {
    switch (section) {
      case 'reportAuthorised': {
        const fields = [
          'reportAuthorisedByName',
          'reportAuthorisedBySignature',
          'reportAuthorisedByDate',
        ];
        const filled = fields.filter((f) => formData[f]).length;
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
        title: 'No Profile Found',
        description: 'Please set up your inspector profile or business settings first.',
        variant: 'destructive',
      });
      return;
    }

    haptic.light();

    if (inspectorProfile) {
      onUpdate('reportAuthorisedByName', inspectorProfile.name?.toUpperCase() || '');
      onUpdate('reportAuthorisedByForOnBehalfOf', inspectorProfile.companyName || '');
      onUpdate('reportAuthorisedByPosition', 'Inspector & Tester');
      onUpdate('reportAuthorisedByAddress', inspectorProfile.companyAddress || '');
      const postcodeMatch = inspectorProfile.companyAddress?.match(
        /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i
      );
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
        title: 'Details Filled',
        description: 'Your inspector profile details have been applied',
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
        title: 'Details Filled',
        description: 'Your business details have been applied',
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
      title: 'Details Copied',
      description: 'Inspector details copied to authorisation section',
    });
  };

  return (
    <div className="space-y-4">
      {/* Report Authorised For Issue By */}
      <CollapsibleSection
        title="Report Authorisation"
        icon={Award}
        isOpen={openSections.reportAuthorised}
        onToggle={() => toggleSection('reportAuthorised')}
      >
        <div className="space-y-5">
          {/* Quick Fill */}
          <button
            type="button"
            onClick={fillFromBusinessSettings}
            className="w-full h-10 rounded-lg font-semibold text-xs bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow touch-manipulation active:scale-[0.98]"
          >
            Load from Business Settings
          </button>

          {/* Authorising Person */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 items-end">
              <div>
                <Label className="text-white text-xs mb-1 block">Name *</Label>
                <Input
                  value={formData.reportAuthorisedByName || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByName', e.target.value.toUpperCase())}
                  placeholder="FULL NAME"
                  className={cn('uppercase h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white', !formData.reportAuthorisedByName && 'border-red-500/30')}
                />
              </div>
              <div>
                <Label className="text-white text-xs mb-1 block">Company</Label>
                <Input
                  value={formData.reportAuthorisedByForOnBehalfOf || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByForOnBehalfOf', e.target.value)}
                  placeholder="Company"
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white text-xs mb-1 block">Position</Label>
              <div className="grid grid-cols-3 gap-1">
                {['Qualified Supervisor', 'Approved Electrician', 'Installation Electrician', 'Electrical Engineer', 'Site Manager'].map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => onUpdate('reportAuthorisedByPosition', pos)}
                    className={cn(
                      'h-8 rounded-md font-medium text-[9px] touch-manipulation transition-all active:scale-[0.98]',
                      formData.reportAuthorisedByPosition === pos
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] border border-white/[0.08] text-white'
                    )}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-white text-xs mb-1 block">Address</Label>
              <Input
                value={formData.reportAuthorisedByAddress || ''}
                onChange={(e) => onUpdate('reportAuthorisedByAddress', e.target.value)}
                placeholder="Full business address including postcode"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 items-end">
              <div>
                <Label className="text-white text-xs mb-1 block">Tel</Label>
                <Input
                  type="tel"
                  value={formData.reportAuthorisedByPhone || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByPhone', e.target.value)}
                  placeholder="Phone number"
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"
                />
              </div>
              <div>
                <Label className="text-white text-xs mb-1 block">Date *</Label>
                <Input
                  type="date"
                  value={formData.reportAuthorisedByDate || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByDate', e.target.value)}
                  className={cn('h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white text-xs', !formData.reportAuthorisedByDate && 'border-red-500/30')}
                  style={{ fontSize: '12px' }}
                />
              </div>
            </div>

            <SignatureInput
              value={formData.reportAuthorisedBySignature || ''}
              onChange={(value) => onUpdate('reportAuthorisedBySignature', value || '')}
              placeholder="Authorising signature"
              required={true}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Compliance Confirmations */}
      <div className="space-y-3">
        <div className="border-b border-white/[0.06] pb-1">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
          <h3 className="text-xs font-medium text-white uppercase tracking-wider">Compliance</h3>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {[
            { field: 'bs7671Compliance', label: 'BS 7671 *' },
            { field: 'buildingRegsCompliance', label: 'Building Regs' },
            { field: 'competentPersonScheme', label: 'CP Scheme' },
          ].map(({ field, label }) => (
            <button
              key={field}
              type="button"
              onClick={() => onUpdate(field, !formData[field])}
              className={cn(
                'h-10 rounded-lg font-semibold transition-all touch-manipulation text-[10px] active:scale-[0.98] flex items-center justify-center gap-1',
                formData[field]
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {formData[field] && <CheckCircle className="h-3 w-3" />}
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-1.5">
          <Label className="text-white text-xs">Additional Notes</Label>
          <Input
            placeholder="Comments, observations, special considerations..."
            value={formData.additionalNotes || ''}
            onChange={(e) => onUpdate('additionalNotes', e.target.value)}
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"
          />
        </div>
      </div>

      {/* Validation Summary */}
      {allComplete ? (
        <div className="border border-green-500/30 bg-green-500/10 rounded-lg p-4">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-300 mb-0.5">Certificate Ready</p>
              <p className="text-xs text-white">
                All sections complete. You can now generate the EIC.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-amber-500/30 bg-amber-500/10 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-300 mb-1.5">Incomplete Sections</p>
              <ul className="space-y-1">
                {!isReportAuthorisedComplete && (
                  <li className="text-xs text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Complete authorisation with name, date, and signature
                  </li>
                )}
                {!isComplianceComplete && (
                  <li className="text-xs text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Confirm BS 7671 compliance declaration
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
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
