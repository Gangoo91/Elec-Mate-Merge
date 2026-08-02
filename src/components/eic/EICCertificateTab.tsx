import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SignatureInput from '@/components/signature/SignatureInput';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import EICCertificateActions, { type EICPdfActionsRef } from './EICCertificateActions';
import { useEICForm } from './EICFormProvider';
import { useHaptic } from '@/hooks/useHaptic';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useQsTeamContext } from '@/hooks/useQsReview';
import QsReviewPanel from '@/components/inspection/shared/QsReviewPanel';

interface EICCertificateTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
  reportId: string;
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  /** Accepted for the shell's call-site compatibility; generation gating now
   * derives from useEICValidation inside EICCertificateActions. */
  canGenerateCertificate?: boolean;
  /** Shell footer's imperative Generate handle (MW pattern). */
  actionsRef?: EICPdfActionsRef;
}

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';

const CollapsibleSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  icon?: React.ElementType;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className={cardCn}>
    <button
      type="button"
      onClick={onToggle}
      className="w-full min-h-11 flex items-center justify-between gap-2 text-left touch-manipulation"
    >
      <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
      <span className="text-[11px] font-medium text-white">{isOpen ? 'Hide' : 'Show'}</span>
    </button>
    {isOpen && <div>{children}</div>}
  </div>
);

const EICCertificateTab: React.FC<EICCertificateTabProps> = ({
  formData,
  onUpdate,
  reportId,
  onGenerateCertificate,
  onSaveDraft,
  actionsRef,
}) => {
  const haptic = useHaptic();
  const { toast } = useToast();
  // Reopened certs must render their saved state — profile auto-fill is a
  // new-cert convenience only, and must never race async cloud hydration.
  const { isHydrating, isExistingReport } = useEICForm();
  const { companyProfile } = useCompanyProfile();
  const { getDefaultProfile } = useInspectorProfiles();
  // ELE-1307 — company team members who aren't the QS can't self-authorise.
  const { data: qsCtx } = useQsTeamContext();
  const lockedForQs = qsCtx?.is_team_member === true && qsCtx?.am_i_qs !== true;
  const [openSections, setOpenSections] = useState({
    // Auto-loaded from profile on mount — keep collapsed until user wants to edit.
    reportAuthorised: false,
    compliance: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    haptic.light();
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Auto-fill from inspector profile or company settings on mount if fields are empty.
  // ELE-1307 — never auto-fill while the QS context is still loading, and never
  // for a non-QS team member: it would silently write THEIR signature into the
  // QS countersignature block hidden behind the locked panel.
  useEffect(() => {
    if (qsCtx === undefined || lockedForQs) return;
    // Never auto-fill a reopened report (saved state may have intentionally
    // cleared fields) or while cloud hydration is still in flight.
    if (isHydrating || isExistingReport) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyProfile, getDefaultProfile, qsCtx, lockedForQs, isHydrating, isExistingReport]);

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
    haptic.light();
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
      {/* No pre-flight validation panel here — the header ring's tap-sheet and
          the actions card's missing-items hint already carry it (Andrew, 08-02). */}

      {/* QS review — submit/track/countersign. Renders nothing for solo users. */}
      <QsReviewPanel reportId={reportId} reportType="eic" onBeforeSubmit={onSaveDraft} />

      {/* ELE-1307 — Report Authorisation is the QS's countersignature. Team
          members who aren't the QS see a locked explainer instead of editable
          fields; solo users (not on a company team) remain their own QS. */}
      {lockedForQs ? (
        <div className={cardCn}>
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            Report authorisation
          </h2>
          <p className="text-[13px] leading-relaxed text-white">
            This section is completed by your company's Qualifying Supervisor. Use{' '}
            <span className="text-elec-yellow">Send for QS review</span> above — their
            countersignature is applied automatically when they approve this certificate.
          </p>
        </div>
      ) : (
      <CollapsibleSection
        title="Report authorisation"
        isOpen={openSections.reportAuthorised}
        onToggle={() => toggleSection('reportAuthorised')}
      >
        <div className="space-y-4 pt-1">
          {/* Quick Fill */}
          <button
            type="button"
            onClick={fillFromBusinessSettings}
            className="w-full h-11 rounded-xl text-sm bg-elec-yellow border border-elec-yellow text-black font-semibold touch-manipulation active:scale-[0.98] transition-all"
          >
            Load from Business Settings
          </button>
          {formData.inspectorName && (
            <button
              type="button"
              onClick={copyFromInspector}
              className={cn(
                'w-full h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
                chipOff
              )}
            >
              Copy from inspector declaration
            </button>
          )}

          {/* Authorising Person */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <Label className={labelCn}>Name *</Label>
                <Input
                  value={formData.reportAuthorisedByName || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByName', e.target.value.toUpperCase())}
                  placeholder="FULL NAME"
                  className={cn(inputCn, 'uppercase', !formData.reportAuthorisedByName && 'border-red-500/40')}
                />
              </div>
              <div>
                <Label className={labelCn}>Company</Label>
                <Input
                  value={formData.reportAuthorisedByForOnBehalfOf || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByForOnBehalfOf', e.target.value)}
                  placeholder="Company"
                  className={inputCn}
                />
              </div>
            </div>

            <div>
              <Label className={labelCn}>Position</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Qualified Supervisor', 'Approved Electrician', 'Installation Electrician', 'Electrical Engineer', 'Site Manager'].map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => {
                      haptic.light();
                      onUpdate('reportAuthorisedByPosition', pos);
                    }}
                    className={cn(
                      'min-h-11 rounded-xl px-2 py-1.5 text-xs touch-manipulation transition-all active:scale-[0.98]',
                      formData.reportAuthorisedByPosition === pos ? chipOn : chipOff
                    )}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className={labelCn}>Address</Label>
              <Input
                value={formData.reportAuthorisedByAddress || ''}
                onChange={(e) => onUpdate('reportAuthorisedByAddress', e.target.value)}
                placeholder="Full business address including postcode"
                className={inputCn}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <Label className={labelCn}>Tel</Label>
                <Input
                  type="tel"
                  value={formData.reportAuthorisedByPhone || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByPhone', e.target.value)}
                  placeholder="Phone number"
                  className={inputCn}
                />
              </div>
              <div>
                <Label className={labelCn}>Date *</Label>
                <Input
                  type="date"
                  value={formData.reportAuthorisedByDate || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByDate', e.target.value)}
                  className={cn(inputCn, !formData.reportAuthorisedByDate && 'border-red-500/40')}
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
      )}

      {/* Compliance Confirmations */}
      <div className={cardCn}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">Compliance</h2>

        <div className="grid grid-cols-3 gap-2">
          {[
            { field: 'bs7671Compliance', label: 'BS 7671 *' },
            { field: 'buildingRegsCompliance', label: 'Building Regs' },
            { field: 'competentPersonScheme', label: 'CP Scheme' },
          ].map(({ field, label }) => (
            <button
              key={field}
              type="button"
              onClick={() => {
                haptic.light();
                onUpdate(field, !formData[field]);
              }}
              className={cn(
                'min-h-11 rounded-xl px-2 py-1.5 text-xs transition-all touch-manipulation active:scale-[0.98]',
                formData[field] ? chipOn : chipOff
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div>
          <Label className={labelCn}>Additional notes</Label>
          <Input
            placeholder="Comments, observations, special considerations..."
            value={formData.additionalNotes || ''}
            onChange={(e) => onUpdate('additionalNotes', e.target.value)}
            className={inputCn}
          />
        </div>
      </div>

      {/* Certificate Actions */}
      <EICCertificateActions
        formData={formData}
        reportId={reportId}
        onGenerateCertificate={onGenerateCertificate}
        onUpdate={onUpdate}
        actionsRef={actionsRef}
      />
    </div>
  );
};

export default EICCertificateTab;
