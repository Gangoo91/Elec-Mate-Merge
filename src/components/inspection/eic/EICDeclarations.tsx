import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield, FileCheck, User } from 'lucide-react';
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

  // Check if all required fields are completed
  const isDesignerComplete = formData.designerName && formData.designerSignature;
  const isConstructorComplete = formData.constructorName && formData.constructorSignature;
  const isInspectorComplete = formData.inspectorName && formData.inspectorSignature;
  const allDeclarationsComplete =
    isDesignerComplete && isConstructorComplete && isInspectorComplete;

  // Auto-fill from default profile on initial mount
  useEffect(() => {
    if (isInitialMount) {
      const defaultProfile = getDefaultProfile();
      const areAllFieldsEmpty =
        !formData.designerName && !formData.constructorName && !formData.inspectorName;

      if (defaultProfile && areAllFieldsEmpty) {
        // Auto-populate all three declarations
        loadProfileToSection('designer', defaultProfile);
        loadProfileToSection('constructor', defaultProfile);
        loadProfileToSection('inspector', defaultProfile);
      }
      setIsInitialMount(false);
    }
  }, [isInitialMount]);

  // Load profile data into a specific declaration section
  const loadProfileToSection = (
    section: 'designer' | 'constructor' | 'inspector',
    profile?: any
  ) => {
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
    <div className="space-y-6">
      {/* Legal Notice */}
      <Alert className="border-amber-200 bg-amber-50">
        <Shield className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 text-xs sm:text-sm">
          <strong>Legal Requirement:</strong> This Electrical Installation Certificate (EIC) is
          required by BS 7671 and must be completed by competent persons responsible for the design,
          construction, and inspection & testing of the electrical installation. Digital signatures
          are legally binding when properly executed.
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
                title: 'Profile Loaded',
                description: 'Your saved profile has been applied to all declaration sections.',
              });
            }
          }}
          className="h-11 w-full touch-manipulation bg-primary hover:bg-primary/90"
          size="lg"
        >
          <User className="h-5 w-5 mr-2" />
          Use Saved Profile
        </Button>
      )}

      {/* Progress Indicator */}
      <Card className="bg-card border border-border">
        <CardContent className="pt-3 sm:pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
            <span className="font-medium">Declaration Progress:</span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div
                className={`flex items-center gap-1.5 ${isDesignerComplete ? 'text-green-600' : 'text-gray-400'}`}
              >
                <FileCheck className="h-4 w-4" />
                <span>Designer</span>
              </div>
              <div
                className={`flex items-center gap-1.5 ${isConstructorComplete ? 'text-green-600' : 'text-gray-400'}`}
              >
                <FileCheck className="h-4 w-4" />
                <span>Constructor</span>
              </div>
              <div
                className={`flex items-center gap-1.5 ${isInspectorComplete ? 'text-green-600' : 'text-gray-400'}`}
              >
                <FileCheck className="h-4 w-4" />
                <span>Inspector</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Designer Declaration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-elec-gray flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isDesignerComplete ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
            >
              1
            </span>
            Designer Declaration
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            I being the person responsible for the design of the electrical installation (as
            indicated by my signature below), particulars of which are described above, having
            exercised reasonable skill and care when carrying out the design hereby CERTIFY that the
            design work for which I have been responsible is to the best of my knowledge and belief
            in accordance with BS 7671:{currentYear}.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="designerName">Designer Name *</Label>
              <Input
                id="designerName"
                placeholder="Enter designer full name"
                value={formData.designerName || ''}
                onChange={(e) => onUpdate('designerName', e.target.value)}
                className={cn(
                  'h-11 text-base touch-manipulation',
                  !formData.designerName && 'border-red-300 focus:border-red-500'
                )}
              />
            </div>
            <div>
              <Label htmlFor="designerQualifications">Professional Qualifications</Label>
              <Input
                id="designerQualifications"
                placeholder="e.g., C&G 2391, NVQ Level 3, IET Member"
                value={formData.designerQualifications || ''}
                onChange={(e) => onUpdate('designerQualifications', e.target.value)}
                className="h-11 text-base touch-manipulation"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="designerCompany">Company/Organisation</Label>
              <Input
                id="designerCompany"
                placeholder="Registered company name"
                value={formData.designerCompany || ''}
                onChange={(e) => onUpdate('designerCompany', e.target.value)}
                className="h-11 text-base touch-manipulation"
              />
            </div>
            <div>
              <Label htmlFor="designerDate">Date of Declaration</Label>
              <Input
                id="designerDate"
                type="date"
                value={formData.designerDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => onUpdate('designerDate', e.target.value)}
                className="h-11 text-base touch-manipulation"
              />
            </div>
          </div>

          <SignatureInput
            label="Designer Digital Signature *"
            value={formData.designerSignature}
            onChange={(signature) => onUpdate('designerSignature', signature)}
            placeholder="Draw or type designer signature"
            required={true}
          />
        </CardContent>
      </Card>

      {/* Constructor Declaration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-elec-gray flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isConstructorComplete ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
            >
              2
            </span>
            Constructor Declaration
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            I being the person responsible for the construction of the electrical installation (as
            indicated by my signature below), particulars of which are described above, having
            exercised reasonable skill and care when carrying out the construction work hereby
            CERTIFY that the construction work for which I have been responsible is to the best of
            my knowledge and belief in accordance with BS 7671:{currentYear}.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 mb-4 p-4 bg-elec-gray rounded-lg">
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
            />
            <Label
              htmlFor="sameAsDesigner"
              className="text-base font-medium cursor-pointer leading-relaxed"
            >
              Same person as Designer (auto-populate fields)
            </Label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="constructorName">Constructor Name *</Label>
              <Input
                id="constructorName"
                placeholder="Enter constructor full name"
                value={formData.constructorName || ''}
                onChange={(e) => onUpdate('constructorName', e.target.value)}
                disabled={formData.sameAsDesigner}
                className={cn(
                  'h-11 text-base touch-manipulation',
                  !formData.constructorName && 'border-red-300 focus:border-red-500'
                )}
              />
            </div>
            <div>
              <Label htmlFor="constructorQualifications">Professional Qualifications</Label>
              <Input
                id="constructorQualifications"
                placeholder="e.g., C&G 2391, NVQ Level 3, IET Member"
                value={formData.constructorQualifications || ''}
                onChange={(e) => onUpdate('constructorQualifications', e.target.value)}
                disabled={formData.sameAsDesigner}
                className="h-11 text-base touch-manipulation"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="constructorCompany">Company/Organisation</Label>
              <Input
                id="constructorCompany"
                placeholder="Registered company name"
                value={formData.constructorCompany || ''}
                onChange={(e) => onUpdate('constructorCompany', e.target.value)}
                disabled={formData.sameAsDesigner}
                className="h-11 text-base touch-manipulation"
              />
            </div>
            <div>
              <Label htmlFor="constructorDate">Date of Declaration</Label>
              <Input
                id="constructorDate"
                type="date"
                value={formData.constructorDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => onUpdate('constructorDate', e.target.value)}
                disabled={formData.sameAsDesigner}
                className="h-11 text-base touch-manipulation"
              />
            </div>
          </div>

          <SignatureInput
            label="Constructor Digital Signature *"
            value={formData.constructorSignature}
            onChange={(signature) => onUpdate('constructorSignature', signature)}
            placeholder="Draw or type constructor signature"
            required={true}
            className={formData.sameAsDesigner ? 'opacity-50 pointer-events-none' : ''}
          />
        </CardContent>
      </Card>

      {/* Inspector Declaration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-elec-gray flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isInspectorComplete ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
            >
              3
            </span>
            Inspector Declaration
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            I being the person responsible for the inspection & testing of the electrical
            installation (as indicated by my signature below), particulars of which are described
            above, having exercised reasonable skill and care when carrying out the inspection &
            testing hereby CERTIFY that the work for which I have been responsible is to the best of
            my knowledge and belief in accordance with BS 7671:{currentYear}.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 mb-4 p-4 bg-elec-gray rounded-lg">
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
            />
            <Label
              htmlFor="sameAsConstructor"
              className="text-base font-medium cursor-pointer leading-relaxed"
            >
              Same person as Constructor (auto-populate fields)
            </Label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="inspectorName">Inspector Name *</Label>
              <Input
                id="inspectorName"
                placeholder="Enter inspector full name"
                value={formData.inspectorName || ''}
                onChange={(e) => onUpdate('inspectorName', e.target.value)}
                disabled={formData.sameAsConstructor}
                className={cn(
                  'h-11 text-base touch-manipulation',
                  !formData.inspectorName && 'border-red-300 focus:border-red-500'
                )}
              />
            </div>
            <div>
              <Label htmlFor="inspectorQualifications">Professional Qualifications</Label>
              <Input
                id="inspectorQualifications"
                placeholder="e.g., C&G 2391, NVQ Level 3, IET Member"
                value={formData.inspectorQualifications || ''}
                onChange={(e) => onUpdate('inspectorQualifications', e.target.value)}
                disabled={formData.sameAsConstructor}
                className="h-11 text-base touch-manipulation"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="inspectorCompany">Company/Organisation</Label>
              <Input
                id="inspectorCompany"
                placeholder="Registered company name"
                value={formData.inspectorCompany || ''}
                onChange={(e) => onUpdate('inspectorCompany', e.target.value)}
                disabled={formData.sameAsConstructor}
                className="h-11 text-base touch-manipulation"
              />
            </div>
            <div>
              <Label htmlFor="inspectorDate">Date of Declaration</Label>
              <Input
                id="inspectorDate"
                type="date"
                value={formData.inspectorDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => onUpdate('inspectorDate', e.target.value)}
                disabled={formData.sameAsConstructor}
                className="h-11 text-base touch-manipulation"
              />
            </div>
          </div>

          <SignatureInput
            label="Inspector Digital Signature *"
            value={formData.inspectorSignature}
            onChange={(signature) => onUpdate('inspectorSignature', signature)}
            placeholder="Draw or type inspector signature"
            required={true}
            className={formData.sameAsConstructor ? 'opacity-50 pointer-events-none' : ''}
          />
        </CardContent>
      </Card>

      {/* Additional Information & Compliance Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-elec-gray">
            Additional Information & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="additionalNotes">Additional Notes & Comments</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Include any relevant information about the installation, design decisions, special considerations, or limitations..."
              value={formData.additionalNotes || ''}
              onChange={(e) => onUpdate('additionalNotes', e.target.value)}
              rows={4}
              className="text-base touch-manipulation min-h-[120px]"
            />
          </div>

          {/* Authorisation Signatures Section */}
          <div className="space-y-4 sm:space-y-6 pt-4 border-t border-border">
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-semibold text-elec-gray">
                Authorisation Signatures
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Both signatures are required per BS 7671 regulations to authorise this EIC for
                issue.
              </p>
            </div>

            {/* Copy from Inspector Declaration Button */}
            <div className="p-3 sm:p-4 bg-blue-500/5 sm:bg-blue-500/10 border border-blue-500/20 sm:border-blue-500/30 rounded-lg">
              <Button
                onClick={() => {
                  onUpdate('inspectedByName', formData.inspectorName);
                  onUpdate('inspectedBySignature', formData.inspectorSignature);
                  onUpdate('inspectedByForOnBehalfOf', formData.inspectorCompany);
                  onUpdate('inspectedByPosition', 'Inspector & Tester');
                  onUpdate('inspectedByAddress', formData.inspectorCompany);
                  onUpdate(
                    'inspectedByCpScheme',
                    formData.inspectorQualifications?.split(',')[0] || ''
                  );
                  toast({
                    title: 'Details copied',
                    description: "Inspector details copied to 'Inspected By' authorisation",
                  });
                }}
                className="w-full h-11 touch-manipulation text-sm sm:text-base"
                variant="outline"
              >
                <User className="h-4 w-4 sm:mr-2" />
                <span className="ml-2 sm:ml-0">Copy from Inspector Declaration</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* INSPECTED BY Section */}
              <Card className="p-4 sm:p-6 space-y-4">
                <h4 className="font-semibold text-base sm:text-lg">INSPECTED BY:</h4>

                <div>
                  <Label htmlFor="inspectedByName">Name (Capitals): *</Label>
                  <Input
                    id="inspectedByName"
                    value={formData.inspectedByName || ''}
                    onChange={(e) => onUpdate('inspectedByName', e.target.value.toUpperCase())}
                    placeholder="FULL NAME IN CAPITALS"
                    className="uppercase h-11 text-base touch-manipulation"
                  />
                </div>

                <div>
                  <Label htmlFor="inspectedBySignature">Signature: *</Label>
                  <SignatureInput
                    value={formData.inspectedBySignature || ''}
                    onChange={(value) => onUpdate('inspectedBySignature', value || '')}
                    placeholder="Signature of inspector"
                    required={true}
                  />
                </div>

                <div>
                  <Label htmlFor="inspectedByForOnBehalfOf">For/on behalf of:</Label>
                  <Input
                    id="inspectedByForOnBehalfOf"
                    value={formData.inspectedByForOnBehalfOf || ''}
                    onChange={(e) => onUpdate('inspectedByForOnBehalfOf', e.target.value)}
                    placeholder="Company or organisation name"
                    className="h-11 text-base touch-manipulation"
                  />
                </div>

                <div>
                  <Label htmlFor="inspectedByPosition">Position:</Label>
                  <Input
                    id="inspectedByPosition"
                    value={formData.inspectedByPosition || ''}
                    onChange={(e) => onUpdate('inspectedByPosition', e.target.value)}
                    placeholder="Job title or position"
                    className="h-11 text-base touch-manipulation"
                  />
                </div>

                <div>
                  <Label htmlFor="inspectedByAddress">Address:</Label>
                  <Textarea
                    id="inspectedByAddress"
                    rows={3}
                    value={formData.inspectedByAddress || ''}
                    onChange={(e) => onUpdate('inspectedByAddress', e.target.value)}
                    placeholder="Full address"
                    className="text-base touch-manipulation min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inspectedByCpScheme">CP Scheme:</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="inspectedByCpScheme"
                      value={formData.inspectedByCpScheme || ''}
                      onChange={(e) => onUpdate('inspectedByCpScheme', e.target.value)}
                      placeholder="Competent Person Scheme"
                      disabled={formData.inspectedByCpSchemeNA}
                      className={cn(
                        'h-11 text-base touch-manipulation',
                        formData.inspectedByCpSchemeNA && 'opacity-50'
                      )}
                    />
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Checkbox
                        id="inspectedByCpSchemeNA"
                        checked={formData.inspectedByCpSchemeNA || false}
                        onCheckedChange={(checked) => {
                          onUpdate('inspectedByCpSchemeNA', checked);
                          if (checked) onUpdate('inspectedByCpScheme', '');
                        }}
                      />
                      <Label htmlFor="inspectedByCpSchemeNA" className="cursor-pointer">
                        N/A
                      </Label>
                    </div>
                  </div>
                </div>
              </Card>

              {/* REPORT AUTHORISED FOR ISSUE BY Section */}
              <Card className="p-4 sm:p-6 space-y-4">
                {/* Same as Inspected By Checkbox */}
                <div className="p-3 sm:p-4 bg-purple-500/5 sm:bg-purple-500/10 border border-purple-500/20 sm:border-purple-500/30 rounded-lg">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Checkbox
                      id="eicSameAsInspectedBy"
                      checked={formData.eicSameAsInspectedBy || false}
                      onCheckedChange={(checked) => {
                        onUpdate('eicSameAsInspectedBy', checked);
                        if (checked) {
                          onUpdate('reportAuthorisedByName', formData.inspectedByName);
                          onUpdate('reportAuthorisedBySignature', formData.inspectedBySignature);
                          onUpdate(
                            'reportAuthorisedByDate',
                            new Date().toISOString().split('T')[0]
                          );
                          onUpdate(
                            'reportAuthorisedByForOnBehalfOf',
                            formData.inspectedByForOnBehalfOf
                          );
                          onUpdate('reportAuthorisedByPosition', formData.inspectedByPosition);
                          onUpdate('reportAuthorisedByAddress', formData.inspectedByAddress);
                          onUpdate('reportAuthorisedByMembershipNo', formData.inspectedByCpScheme);
                          toast({
                            title: 'Details copied',
                            description: "Copied from 'Inspected By' section",
                          });
                        }
                      }}
                    />
                    <Label
                      htmlFor="eicSameAsInspectedBy"
                      className="text-sm sm:text-base font-medium cursor-pointer leading-relaxed"
                    >
                      Same person as Inspected By (auto-populate fields)
                    </Label>
                  </div>
                </div>

                <h4 className="font-semibold text-base sm:text-lg">
                  REPORT AUTHORISED FOR ISSUE BY:
                </h4>

                <div>
                  <Label htmlFor="reportAuthorisedByName">Name (Capitals): *</Label>
                  <Input
                    id="reportAuthorisedByName"
                    value={formData.reportAuthorisedByName || ''}
                    onChange={(e) =>
                      onUpdate('reportAuthorisedByName', e.target.value.toUpperCase())
                    }
                    placeholder="FULL NAME IN CAPITALS"
                    className="uppercase h-11 text-base touch-manipulation"
                  />
                </div>

                <div>
                  <Label htmlFor="reportAuthorisedBySignature">Signature: *</Label>
                  <SignatureInput
                    value={formData.reportAuthorisedBySignature || ''}
                    onChange={(value) => onUpdate('reportAuthorisedBySignature', value || '')}
                    placeholder="Signature of authorising person"
                    required={true}
                  />
                </div>

                <div>
                  <Label htmlFor="reportAuthorisedByDate">Date: *</Label>
                  <Input
                    id="reportAuthorisedByDate"
                    type="date"
                    value={formData.reportAuthorisedByDate || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByDate', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>

                <div>
                  <Label htmlFor="reportAuthorisedByForOnBehalfOf">For/on behalf of:</Label>
                  <Input
                    id="reportAuthorisedByForOnBehalfOf"
                    value={formData.reportAuthorisedByForOnBehalfOf || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByForOnBehalfOf', e.target.value)}
                    placeholder="Company or organisation name"
                    className="h-11 text-base touch-manipulation"
                  />
                </div>

                <div>
                  <Label htmlFor="reportAuthorisedByPosition">Position:</Label>
                  <Input
                    id="reportAuthorisedByPosition"
                    value={formData.reportAuthorisedByPosition || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByPosition', e.target.value)}
                    placeholder="Job title or position"
                    className="h-11 text-base touch-manipulation"
                  />
                </div>

                <div>
                  <Label htmlFor="reportAuthorisedByAddress">Address:</Label>
                  <Textarea
                    id="reportAuthorisedByAddress"
                    rows={3}
                    value={formData.reportAuthorisedByAddress || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByAddress', e.target.value)}
                    placeholder="Full address"
                    className="text-base touch-manipulation min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="reportAuthorisedByMembershipNo">Membership No:</Label>
                  <Input
                    id="reportAuthorisedByMembershipNo"
                    value={formData.reportAuthorisedByMembershipNo || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByMembershipNo', e.target.value)}
                    placeholder="Membership or registration number"
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </Card>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Regulatory Compliance Checklist</Label>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="bs7671Compliance"
                  checked={formData.bs7671Compliance || false}
                  onCheckedChange={(checked) => onUpdate('bs7671Compliance', checked)}
                />
                <Label htmlFor="bs7671Compliance" className="cursor-pointer leading-relaxed">
                  Installation complies with BS 7671:{currentYear} (18th Edition)
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="buildingRegsCompliance"
                  checked={formData.buildingRegsCompliance || false}
                  onCheckedChange={(checked) => onUpdate('buildingRegsCompliance', checked)}
                />
                <Label htmlFor="buildingRegsCompliance" className="cursor-pointer leading-relaxed">
                  Installation complies with relevant Building Regulations
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="competentPersonScheme"
                  checked={formData.competentPersonScheme || false}
                  onCheckedChange={(checked) => onUpdate('competentPersonScheme', checked)}
                />
                <Label htmlFor="competentPersonScheme" className="cursor-pointer leading-relaxed">
                  Installation carried out under Competent Person Scheme
                </Label>
              </div>
            </div>
          </div>

          {/* Part P Notification */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-semibold text-elec-gray flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                Part P Building Regulations
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Under Part P of the Building Regulations, notifiable electrical work must be
                submitted to your Competent Person Scheme (NICEIC/NAPIT) or Local Authority Building
                Control within 30 days of completion.
              </p>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="partPNotification"
                  checked={formData.partPNotification || false}
                  onCheckedChange={(checked) => onUpdate('partPNotification', checked)}
                  className="border-amber-500/50 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:text-black h-6 w-6"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="partPNotification"
                    className="text-base font-medium cursor-pointer leading-relaxed"
                  >
                    This work requires Part P notification
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tick this if the work includes: new circuits, consumer unit replacement, work in
                    bathrooms/kitchens, outdoor installations, or any other notifiable work under
                    Building Regulations.
                  </p>
                </div>
              </div>
            </div>

            {formData.partPNotification && (
              <Alert className="border-amber-500/30 bg-amber-500/5">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-300 text-xs">
                  <strong>Reminder:</strong> A Part P notification will be created when you generate
                  this certificate. You can track and submit it via Part P Notifications in the app.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Final Validation Summary */}
      {allDeclarationsComplete ? (
        <Alert className="border-green-200 bg-green-50">
          <FileCheck className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 text-xs sm:text-sm">
            <strong>All declarations completed.</strong> The EIC is ready for generation and
            submission. Ensure all previous sections are complete before generating the final
            certificate.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 text-xs sm:text-sm">
            <strong>Incomplete declarations.</strong> All three declarations (Designer, Constructor,
            Inspector) must be completed with names and signatures before the EIC can be finalised.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EICDeclarations;
