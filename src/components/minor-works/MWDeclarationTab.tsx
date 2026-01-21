import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { User, CheckSquare, PenTool, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import SignatureInput from '@/components/signature/SignatureInput';
import {
  QUALIFICATION_LEVELS,
  SCHEME_PROVIDERS,
} from '@/constants/minorWorksOptions';

interface MWDeclarationTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const MWDeclarationTab: React.FC<MWDeclarationTabProps> = ({ formData, onUpdate }) => {
  const isMobile = useIsMobile();
  const [openSections, setOpenSections] = useState({
    electrician: true,
    compliance: true,
    signature: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getCompletionPercentage = (section: string) => {
    switch (section) {
      case 'electrician': {
        const fields = ['electricianName', 'position'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'compliance': {
        // Single IET declaration replaces 3 checkboxes
        return formData.ietDeclaration ? 100 : 0;
      }
      case 'signature': {
        const fields = ['signatureDate', 'signature'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      default:
        return 0;
    }
  };

  // Handler to load user profile data (placeholder - integrate with actual profile system)
  const handleUseMyProfile = () => {
    // This would typically load from user context/store
    // For now, show a toast or notification that this feature connects to profile
    console.log('Use My Profile clicked - integrate with user profile system');
    // Example integration:
    // const userProfile = useUserProfile();
    // if (userProfile) {
    //   onUpdate('electricianName', userProfile.fullName);
    //   onUpdate('forAndOnBehalfOf', userProfile.companyName);
    //   onUpdate('position', userProfile.position);
    //   onUpdate('qualificationLevel', userProfile.qualificationLevel);
    //   onUpdate('schemeProvider', userProfile.schemeProvider);
    //   onUpdate('registrationNumber', userProfile.registrationNumber);
    // }
  };

  return (
    <div className={cn("space-y-4 sm:space-y-6", isMobile && "-mx-4")}>
      {/* Electrician Details */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.electrician} onOpenChange={() => toggleSection('electrician')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Electrician Details"
              icon={User}
              isOpen={openSections.electrician}
              color="amber-500"
              completionPercentage={getCompletionPercentage('electrician')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-5">
              {/* Use My Profile Button - Premium Style */}
              <button
                type="button"
                onClick={handleUseMyProfile}
                className="w-full h-14 rounded-xl border-2 border-dashed border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all flex items-center justify-center gap-3 ios-pressable"
              >
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <UserCircle className="h-5 w-5 text-amber-400" />
                </div>
                <span className="text-amber-400 font-medium">Use My Profile Details</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Electrician Name *</label>
                  <Input
                    value={formData.electricianName || ''}
                    onChange={(e) => onUpdate('electricianName', e.target.value)}
                    placeholder="Full name"
                    className={cn("h-12 text-base bg-white/5 border-white/10 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20", !formData.electricianName && "border-red-500/30")}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Company Name</label>
                  <Input
                    value={formData.forAndOnBehalfOf || ''}
                    onChange={(e) => onUpdate('forAndOnBehalfOf', e.target.value)}
                    placeholder="Company or trading name"
                    className="h-12 text-base bg-white/5 border-white/10 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Position *</label>
                <Input
                  value={formData.position || ''}
                  onChange={(e) => onUpdate('position', e.target.value)}
                  placeholder="e.g., Qualified Electrician"
                  className={cn("h-12 text-base bg-white/5 border-white/10 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20", !formData.position && "border-red-500/30")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Qualification Level</label>
                  <MobileSelectPicker
                    value={formData.qualificationLevel || ''}
                    onValueChange={(v) => onUpdate('qualificationLevel', v)}
                    options={QUALIFICATION_LEVELS}
                    placeholder="Select level"
                    title="Qualification Level"
                    triggerClassName="h-12 bg-white/5 border-white/10 rounded-xl text-base"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Scheme Provider</label>
                  <MobileSelectPicker
                    value={formData.schemeProvider || ''}
                    onValueChange={(v) => onUpdate('schemeProvider', v)}
                    options={SCHEME_PROVIDERS}
                    placeholder="Select provider"
                    title="Scheme Provider"
                    triggerClassName="h-12 bg-white/5 border-white/10 rounded-xl text-base"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Registration Number</label>
                <Input
                  value={formData.registrationNumber || ''}
                  onChange={(e) => onUpdate('registrationNumber', e.target.value)}
                  placeholder="Scheme registration number"
                  className="h-12 text-base bg-white/5 border-white/10 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20"
                />
              </div>

              {/* Contractor Address */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Contractor Address</label>
                <Textarea
                  value={formData.contractorAddress || ''}
                  onChange={(e) => onUpdate('contractorAddress', e.target.value)}
                  placeholder="Business address"
                  rows={2}
                  className="text-base bg-white/5 border-white/10 rounded-xl min-h-[80px] focus:border-amber-500/50 focus:ring-amber-500/20"
                />
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Contact Telephone</label>
                  <Input
                    type="tel"
                    value={formData.electricianPhone || ''}
                    onChange={(e) => onUpdate('electricianPhone', e.target.value)}
                    placeholder="e.g., 07123 456789"
                    className="h-12 text-base bg-white/5 border-white/10 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Email Address</label>
                  <Input
                    type="email"
                    value={formData.electricianEmail || ''}
                    onChange={(e) => onUpdate('electricianEmail', e.target.value)}
                    placeholder="e.g., name@company.co.uk"
                    className="h-12 text-base bg-white/5 border-white/10 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20"
                  />
                </div>
              </div>
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
              icon={CheckSquare}
              isOpen={openSections.compliance}
              color="green-500"
              completionPercentage={getCompletionPercentage('compliance')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-5">
              {/* IET Official Declaration - Consolidated */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-green-500/5 border-l-2 border-l-green-500 border border-white/10">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="ietDeclaration"
                      checked={formData.ietDeclaration || false}
                      onCheckedChange={(c) => onUpdate('ietDeclaration', c)}
                      className="mt-0.5 h-6 w-6 rounded-lg border-white/30 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 touch-manipulation flex-shrink-0"
                    />
                    <label htmlFor="ietDeclaration" className="text-sm cursor-pointer leading-relaxed text-white/80 text-left">
                      I/We <span className="text-green-400 font-medium">CERTIFY</span> that the work does not impair the safety of the existing installation
                      and that the work has been designed, constructed, inspected and tested in accordance
                      with <span className="text-white font-medium">BS 7671:2018+A3:2024</span> (IET Wiring Regulations), subject to the departures detailed
                      above if any. The work is to the best of my/our knowledge and belief safe to be put
                      into service. <span className="text-red-400">*</span>
                    </label>
                  </div>
                </div>

                {/* Optional Additional Declarations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="partPNotification"
                        checked={formData.partPNotification || false}
                        onCheckedChange={(c) => onUpdate('partPNotification', c)}
                        className="h-5 w-5 rounded-md border-white/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500 touch-manipulation"
                      />
                      <label htmlFor="partPNotification" className="text-sm cursor-pointer text-white/70">
                        Part P notification made
                      </label>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="copyProvided"
                        checked={formData.copyProvided || false}
                        onCheckedChange={(c) => onUpdate('copyProvided', c)}
                        className="h-5 w-5 rounded-md border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 touch-manipulation"
                      />
                      <label htmlFor="copyProvided" className="text-sm cursor-pointer text-white/70">
                        Copy provided to client
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Additional Notes</label>
                <Textarea
                  value={formData.additionalNotes || ''}
                  onChange={(e) => onUpdate('additionalNotes', e.target.value)}
                  placeholder="Any additional notes, comments or recommendations..."
                  rows={3}
                  className="text-base bg-white/5 border-white/10 rounded-xl min-h-[100px] focus:border-green-500/50 focus:ring-green-500/20"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Signature */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.signature} onOpenChange={() => toggleSection('signature')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Signature"
              icon={PenTool}
              isOpen={openSections.signature}
              color="purple-500"
              completionPercentage={getCompletionPercentage('signature')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Signature Date *</label>
                <Input
                  type="date"
                  value={formData.signatureDate || ''}
                  onChange={(e) => onUpdate('signatureDate', e.target.value)}
                  className={cn("h-12 text-base bg-white/5 border-white/10 rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20", !formData.signatureDate && "border-red-500/30")}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Signature *</label>
                <SignatureInput
                  value={formData.signature || ''}
                  onChange={(v) => onUpdate('signature', v)}
                  placeholder="Sign here"
                  className={cn("rounded-xl", !formData.signature && "border-red-500/30")}
                />
              </div>

              {/* Summary info - Premium card */}
              {formData.electricianName && formData.signatureDate && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 rounded-lg bg-purple-500/20">
                      <PenTool className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-xs uppercase tracking-wide text-purple-400 font-medium">Certificate Signed</span>
                  </div>
                  <div className="text-sm text-white/70">
                    Signed by <span className="text-white font-medium">{formData.electricianName}</span>
                    {formData.position && <span className="text-white/50"> ({formData.position})</span>}
                    {' '}on <span className="text-white font-medium">{new Date(formData.signatureDate).toLocaleDateString('en-GB')}</span>
                    {formData.schemeProvider && formData.schemeProvider !== 'none' && (
                      <span className="text-white/50">
                        {' '}• {SCHEME_PROVIDERS.find(s => s.value === formData.schemeProvider)?.label || formData.schemeProvider}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default MWDeclarationTab;
