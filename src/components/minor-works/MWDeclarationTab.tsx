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
    <div className="space-y-4 sm:space-y-6">
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
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              {/* Use My Profile Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleUseMyProfile}
                className="w-full h-12 border-dashed border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-500/50 text-amber-400"
              >
                <UserCircle className="h-5 w-5 mr-2" />
                Use My Profile Details
              </Button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Electrician Name *</Label>
                  <Input
                    value={formData.electricianName || ''}
                    onChange={(e) => onUpdate('electricianName', e.target.value)}
                    placeholder="Full name"
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500", !formData.electricianName && "border-red-500/50")}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">For and on behalf of (Company)</Label>
                  <Input
                    value={formData.forAndOnBehalfOf || ''}
                    onChange={(e) => onUpdate('forAndOnBehalfOf', e.target.value)}
                    placeholder="Company or trading name"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Position *</Label>
                <Input
                  value={formData.position || ''}
                  onChange={(e) => onUpdate('position', e.target.value)}
                  placeholder="e.g., Qualified Electrician"
                  className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500", !formData.position && "border-red-500/50")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Qualification Level</Label>
                  <MobileSelectPicker
                    value={formData.qualificationLevel || ''}
                    onValueChange={(v) => onUpdate('qualificationLevel', v)}
                    options={QUALIFICATION_LEVELS}
                    placeholder="Select level"
                    title="Qualification Level"
                    triggerClassName="bg-elec-gray border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Scheme Provider</Label>
                  <MobileSelectPicker
                    value={formData.schemeProvider || ''}
                    onValueChange={(v) => onUpdate('schemeProvider', v)}
                    options={SCHEME_PROVIDERS}
                    placeholder="Select provider"
                    title="Scheme Provider"
                    triggerClassName="bg-elec-gray border-white/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Registration Number</Label>
                <Input
                  value={formData.registrationNumber || ''}
                  onChange={(e) => onUpdate('registrationNumber', e.target.value)}
                  placeholder="Scheme registration number"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              {/* Contractor Address - IET Required */}
              <div className="space-y-2">
                <Label className="text-sm">Contractor Address</Label>
                <Textarea
                  value={formData.contractorAddress || ''}
                  onChange={(e) => onUpdate('contractorAddress', e.target.value)}
                  placeholder="Business address"
                  rows={2}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Contact Telephone</Label>
                  <Input
                    type="tel"
                    value={formData.electricianPhone || ''}
                    onChange={(e) => onUpdate('electricianPhone', e.target.value)}
                    placeholder="e.g., 07123 456789"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Email Address</Label>
                  <Input
                    type="email"
                    value={formData.electricianEmail || ''}
                    onChange={(e) => onUpdate('electricianEmail', e.target.value)}
                    placeholder="e.g., name@company.co.uk"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
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
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              {/* IET Official Declaration - Consolidated */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="ietDeclaration"
                      checked={formData.ietDeclaration || false}
                      onCheckedChange={(c) => onUpdate('ietDeclaration', c)}
                      className="mt-0.5 h-6 w-6 border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 touch-manipulation"
                    />
                    <Label htmlFor="ietDeclaration" className="text-sm cursor-pointer leading-relaxed">
                      I/We CERTIFY that the work does not impair the safety of the existing installation
                      and that the work has been designed, constructed, inspected and tested in accordance
                      with BS 7671:2018+A2:2022 (IET Wiring Regulations), subject to the departures detailed
                      above if any. The work is to the best of my/our knowledge and belief safe to be put
                      into service. *
                    </Label>
                  </div>
                </div>

                {/* Optional Additional Declarations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="partPNotification"
                        checked={formData.partPNotification || false}
                        onCheckedChange={(c) => onUpdate('partPNotification', c)}
                        className="mt-0.5 h-5 w-5 border-white/40 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500 touch-manipulation"
                      />
                      <Label htmlFor="partPNotification" className="text-sm cursor-pointer leading-relaxed">
                        Part P notification made (where applicable)
                      </Label>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="copyProvided"
                        checked={formData.copyProvided || false}
                        onCheckedChange={(c) => onUpdate('copyProvided', c)}
                        className="mt-0.5 h-5 w-5 border-white/40 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 touch-manipulation"
                      />
                      <Label htmlFor="copyProvided" className="text-sm cursor-pointer leading-relaxed">
                        Copy provided to person ordering work
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2 pt-2">
                <Label className="text-sm">Additional Notes / Comments</Label>
                <Textarea
                  value={formData.additionalNotes || ''}
                  onChange={(e) => onUpdate('additionalNotes', e.target.value)}
                  placeholder="Any additional notes, comments or recommendations..."
                  rows={3}
                  className="text-base touch-manipulation min-h-[100px] border-white/30 focus:border-green-500 focus:ring-green-500"
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
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Signature Date *</Label>
                <Input
                  type="date"
                  value={formData.signatureDate || ''}
                  onChange={(e) => onUpdate('signatureDate', e.target.value)}
                  className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500", !formData.signatureDate && "border-red-500/50")}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Signature *</Label>
                <SignatureInput
                  value={formData.signature || ''}
                  onChange={(v) => onUpdate('signature', v)}
                  placeholder="Sign here"
                  className={cn(!formData.signature && "border-red-500/50")}
                />
              </div>

              {/* Summary info */}
              {formData.electricianName && formData.signatureDate && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm text-white/60">
                    Certificate signed by <span className="text-white font-medium">{formData.electricianName}</span>
                    {formData.position && <span> ({formData.position})</span>}
                    {' '}on <span className="text-white font-medium">{new Date(formData.signatureDate).toLocaleDateString('en-GB')}</span>
                    {formData.schemeProvider && formData.schemeProvider !== 'none' && (
                      <>
                        {' '}
                        <span className="text-white/60">
                          registered with{' '}
                          <span className="text-white font-medium">
                            {SCHEME_PROVIDERS.find(s => s.value === formData.schemeProvider)?.label || formData.schemeProvider}
                          </span>
                        </span>
                      </>
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
