import React, { useEffect, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield, FileCheck, User, PenTool, Hammer, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SignatureInput from '@/components/signature/SignatureInput';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface EICDeclarationsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EICDeclarations: React.FC<EICDeclarationsProps> = ({ formData, onUpdate }) => {
  const currentYear = new Date().getFullYear();
  const { getDefaultProfile } = useInspectorProfiles();
  const { toast } = useToast();
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [openSections, setOpenSections] = useState({
    designer: true,
    constructor: true,
    inspector: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Check if all required fields are completed
  const isDesignerComplete = formData.designerName && formData.designerSignature;
  const isConstructorComplete = formData.constructorName && formData.constructorSignature;
  const isInspectorComplete = formData.inspectorName && formData.inspectorSignature;
  const allDeclarationsComplete = isDesignerComplete && isConstructorComplete && isInspectorComplete;

  const getCompletionPercentage = (section: string) => {
    switch (section) {
      case 'designer': {
        const fields = ['designerName', 'designerSignature'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'constructor': {
        const fields = ['constructorName', 'constructorSignature'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'inspector': {
        const fields = ['inspectorName', 'inspectorSignature'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      default:
        return 0;
    }
  };

  // Auto-fill from default profile on initial mount
  useEffect(() => {
    if (isInitialMount) {
      const defaultProfile = getDefaultProfile();
      const areAllFieldsEmpty = !formData.designerName && !formData.constructorName && !formData.inspectorName;

      if (defaultProfile && areAllFieldsEmpty) {
        loadProfileToSection('designer', defaultProfile);
        loadProfileToSection('constructor', defaultProfile);
        loadProfileToSection('inspector', defaultProfile);
      }
      setIsInitialMount(false);
    }
  }, [isInitialMount]);

  // Load profile data into a specific declaration section
  const loadProfileToSection = (section: 'designer' | 'constructor' | 'inspector', profile?: any) => {
    const selectedProfile = profile || getDefaultProfile();
    if (!selectedProfile) return;

    const today = new Date().toISOString().split('T')[0];
    const qualifications = Array.isArray(selectedProfile.qualifications)
      ? selectedProfile.qualifications.join(', ')
      : '';

    onUpdate(`${section}Name`, selectedProfile.name);
    onUpdate(`${section}Qualifications`, qualifications);
    onUpdate(`${section}Company`, selectedProfile.companyName);
    onUpdate(`${section}Date`, today);
    if (selectedProfile.signatureData) {
      onUpdate(`${section}Signature`, selectedProfile.signatureData);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Legal Notice */}
      <Alert className="border-amber-500/30 bg-amber-500/10">
        <Shield className="h-4 w-4 text-amber-400" />
        <AlertDescription className="text-amber-200 text-xs sm:text-sm">
          <strong>Legal Requirement:</strong> This Electrical Installation Certificate (EIC) must be completed by
          competent persons responsible for the design, construction, and inspection & testing of the electrical
          installation per BS 7671.
        </AlertDescription>
      </Alert>

      {/* Use Saved Profile Button */}
      {getDefaultProfile() && (
        <Button
          onClick={() => {
            const profile = getDefaultProfile();
            if (profile) {
              loadProfileToSection('designer', profile);
              loadProfileToSection('constructor', profile);
              loadProfileToSection('inspector', profile);
              toast({
                title: "Profile Loaded",
                description: "Your saved profile has been applied to all declaration sections.",
              });
            }
          }}
          className="h-11 w-full touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
          size="lg"
        >
          <User className="h-5 w-5 mr-2" />
          Use Saved Profile for All Declarations
        </Button>
      )}

      {/* Designer Declaration */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.designer} onOpenChange={() => toggleSection('designer')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Designer Declaration"
              icon={PenTool}
              isOpen={openSections.designer}
              color="blue-500"
              completionPercentage={getCompletionPercentage('designer')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                I being the person responsible for the design of the electrical installation, having exercised
                reasonable skill and care when carrying out the design hereby CERTIFY that the design work for which
                I have been responsible is to the best of my knowledge and belief in accordance with BS 7671:{currentYear}.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designerName">Designer Name *</Label>
                  <Input
                    id="designerName"
                    placeholder="Enter designer full name"
                    value={formData.designerName || ''}
                    onChange={(e) => onUpdate('designerName', e.target.value)}
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500", !formData.designerName && 'border-red-500/50')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designerQualifications">Professional Qualifications</Label>
                  <Input
                    id="designerQualifications"
                    placeholder="e.g., C&G 2391, NVQ Level 3"
                    value={formData.designerQualifications || ''}
                    onChange={(e) => onUpdate('designerQualifications', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designerCompany">Company/Organisation</Label>
                  <Input
                    id="designerCompany"
                    placeholder="Registered company name"
                    value={formData.designerCompany || ''}
                    onChange={(e) => onUpdate('designerCompany', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designerDate">Date of Declaration</Label>
                  <Input
                    id="designerDate"
                    type="date"
                    value={formData.designerDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => onUpdate('designerDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Designer Digital Signature *</Label>
                <SignatureInput
                  value={formData.designerSignature}
                  onChange={(signature) => onUpdate('designerSignature', signature)}
                  placeholder="Draw or type designer signature"
                  required={true}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Constructor Declaration */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.constructor} onOpenChange={() => toggleSection('constructor')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Constructor Declaration"
              icon={Hammer}
              isOpen={openSections.constructor}
              color="green-500"
              completionPercentage={getCompletionPercentage('constructor')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                I being the person responsible for the construction of the electrical installation, having exercised
                reasonable skill and care when carrying out the construction work hereby CERTIFY that the construction
                work for which I have been responsible is to the best of my knowledge and belief in accordance with
                BS 7671:{currentYear}.
              </p>

              {/* Same as Designer Checkbox */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <Checkbox
                  id="sameAsDesigner"
                  checked={formData.sameAsDesigner || false}
                  onCheckedChange={(checked) => {
                    onUpdate('sameAsDesigner', checked);
                    if (checked) {
                      onUpdate('constructorName', formData.designerName);
                      onUpdate('constructorQualifications', formData.designerQualifications);
                      onUpdate('constructorCompany', formData.designerCompany);
                      onUpdate('constructorDate', formData.designerDate);
                      onUpdate('constructorSignature', formData.designerSignature);
                    }
                  }}
                  className="border-green-500/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-0.5"
                />
                <Label htmlFor="sameAsDesigner" className="text-sm font-medium cursor-pointer leading-relaxed text-green-200">
                  Same person as Designer (auto-populate fields)
                </Label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="constructorName">Constructor Name *</Label>
                  <Input
                    id="constructorName"
                    placeholder="Enter constructor full name"
                    value={formData.constructorName || ''}
                    onChange={(e) => onUpdate('constructorName', e.target.value)}
                    disabled={formData.sameAsDesigner}
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-green-500 focus:ring-green-500", !formData.constructorName && 'border-red-500/50', formData.sameAsDesigner && 'opacity-50')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="constructorQualifications">Professional Qualifications</Label>
                  <Input
                    id="constructorQualifications"
                    placeholder="e.g., C&G 2391, NVQ Level 3"
                    value={formData.constructorQualifications || ''}
                    onChange={(e) => onUpdate('constructorQualifications', e.target.value)}
                    disabled={formData.sameAsDesigner}
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-green-500 focus:ring-green-500", formData.sameAsDesigner && 'opacity-50')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="constructorCompany">Company/Organisation</Label>
                  <Input
                    id="constructorCompany"
                    placeholder="Registered company name"
                    value={formData.constructorCompany || ''}
                    onChange={(e) => onUpdate('constructorCompany', e.target.value)}
                    disabled={formData.sameAsDesigner}
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-green-500 focus:ring-green-500", formData.sameAsDesigner && 'opacity-50')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="constructorDate">Date of Declaration</Label>
                  <Input
                    id="constructorDate"
                    type="date"
                    value={formData.constructorDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => onUpdate('constructorDate', e.target.value)}
                    disabled={formData.sameAsDesigner}
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-green-500 focus:ring-green-500", formData.sameAsDesigner && 'opacity-50')}
                  />
                </div>
              </div>

              <div className={cn("space-y-2", formData.sameAsDesigner && 'opacity-50 pointer-events-none')}>
                <Label>Constructor Digital Signature *</Label>
                <SignatureInput
                  value={formData.constructorSignature}
                  onChange={(signature) => onUpdate('constructorSignature', signature)}
                  placeholder="Draw or type constructor signature"
                  required={true}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Inspector Declaration */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.inspector} onOpenChange={() => toggleSection('inspector')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Inspector Declaration"
              icon={Search}
              isOpen={openSections.inspector}
              color="amber-500"
              completionPercentage={getCompletionPercentage('inspector')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                I being the person responsible for the inspection & testing of the electrical installation, having
                exercised reasonable skill and care when carrying out the inspection & testing hereby CERTIFY that
                the work for which I have been responsible is to the best of my knowledge and belief in accordance
                with BS 7671:{currentYear}.
              </p>

              {/* Same as Constructor Checkbox */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <Checkbox
                  id="sameAsConstructor"
                  checked={formData.sameAsConstructor || false}
                  onCheckedChange={(checked) => {
                    onUpdate('sameAsConstructor', checked);
                    if (checked) {
                      onUpdate('inspectorName', formData.constructorName);
                      onUpdate('inspectorQualifications', formData.constructorQualifications);
                      onUpdate('inspectorCompany', formData.constructorCompany);
                      onUpdate('inspectorDate', formData.constructorDate);
                      onUpdate('inspectorSignature', formData.constructorSignature);
                    }
                  }}
                  className="border-amber-500/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 mt-0.5"
                />
                <Label htmlFor="sameAsConstructor" className="text-sm font-medium cursor-pointer leading-relaxed text-amber-200">
                  Same person as Constructor (auto-populate fields)
                </Label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inspectorName">Inspector Name *</Label>
                  <Input
                    id="inspectorName"
                    placeholder="Enter inspector full name"
                    value={formData.inspectorName || ''}
                    onChange={(e) => onUpdate('inspectorName', e.target.value)}
                    disabled={formData.sameAsConstructor}
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500", !formData.inspectorName && 'border-red-500/50', formData.sameAsConstructor && 'opacity-50')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspectorQualifications">Professional Qualifications</Label>
                  <Input
                    id="inspectorQualifications"
                    placeholder="e.g., C&G 2391, NVQ Level 3"
                    value={formData.inspectorQualifications || ''}
                    onChange={(e) => onUpdate('inspectorQualifications', e.target.value)}
                    disabled={formData.sameAsConstructor}
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500", formData.sameAsConstructor && 'opacity-50')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inspectorCompany">Company/Organisation</Label>
                  <Input
                    id="inspectorCompany"
                    placeholder="Registered company name"
                    value={formData.inspectorCompany || ''}
                    onChange={(e) => onUpdate('inspectorCompany', e.target.value)}
                    disabled={formData.sameAsConstructor}
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500", formData.sameAsConstructor && 'opacity-50')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspectorDate">Date of Declaration</Label>
                  <Input
                    id="inspectorDate"
                    type="date"
                    value={formData.inspectorDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => onUpdate('inspectorDate', e.target.value)}
                    disabled={formData.sameAsConstructor}
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500", formData.sameAsConstructor && 'opacity-50')}
                  />
                </div>
              </div>

              <div className={cn("space-y-2", formData.sameAsConstructor && 'opacity-50 pointer-events-none')}>
                <Label>Inspector Digital Signature *</Label>
                <SignatureInput
                  value={formData.inspectorSignature}
                  onChange={(signature) => onUpdate('inspectorSignature', signature)}
                  placeholder="Draw or type inspector signature"
                  required={true}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Final Validation Summary */}
      {allDeclarationsComplete ? (
        <Alert className="border-green-500/30 bg-green-500/10">
          <FileCheck className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-200 text-xs sm:text-sm">
            <strong>All declarations completed.</strong> Proceed to the Certificate tab to complete authorisation
            signatures and generate the EIC.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-amber-500/30 bg-amber-500/10">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200 text-xs sm:text-sm">
            <strong>Incomplete declarations.</strong> All three declarations (Designer, Constructor, Inspector)
            must be completed with names and signatures before the EIC can be finalised.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EICDeclarations;
