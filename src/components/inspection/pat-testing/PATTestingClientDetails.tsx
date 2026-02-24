/**
 * PATTestingClientDetails — Tab 1: Client & Tester
 *
 * - Tester profile: "Load from Settings" button + normal fields
 * - Client: CRM dropdown (CertificateClientSection) or manual entry
 * - Test equipment: "Load from Settings" button + normal fields
 * - Certificate metadata
 */

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  User,
  Building2,
  Settings,
  FileText,
  UserCheck,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import CertificateClientSection, {
  DEFAULT_CLIENT_FIELDS,
} from '@/components/inspection/shared/CertificateClientSection';
import { useInspectorProfiles, InspectorProfile } from '@/hooks/useInspectorProfiles';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { TestingInstrument } from '@/types/company';
import { PATTesterAutocomplete } from './PATTesterAutocomplete';

interface PATTestingClientDetailsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
}

const PATTestingClientDetails: React.FC<PATTestingClientDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const { profiles, getDefaultProfile } = useInspectorProfiles();
  const { companyProfile } = useCompanyProfile();

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    tester: true,
    client: true,
    site: true,
    equipment: true,
    metadata: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateTestEquipment = (field: string, value: any) => {
    onUpdate('testEquipment', {
      ...formData.testEquipment,
      [field]: value,
    });
  };

  const loadProfile = (profile: InspectorProfile) => {
    const today = new Date().toISOString().split('T')[0];
    const qualifications = Array.isArray(profile.qualifications)
      ? profile.qualifications.join(', ')
      : '';

    onUpdate('testerName', profile.name);
    onUpdate('testerCompany', profile.companyName || '');
    onUpdate('testerQualifications', qualifications);
    onUpdate('testerDate', today);
    if (profile.signatureData) {
      onUpdate('testerSignature', profile.signatureData);
    }
  };

  const loadFromCompanyProfile = () => {
    if (!companyProfile) return;
    onUpdate('testerName', companyProfile.inspector_name || '');
    onUpdate('testerCompany', companyProfile.company_name || '');
    const quals = Array.isArray(companyProfile.inspector_qualifications)
      ? companyProfile.inspector_qualifications.join(', ')
      : '';
    onUpdate('testerQualifications', quals);
    onUpdate('testerDate', new Date().toISOString().split('T')[0]);
    if (companyProfile.signature_data) {
      onUpdate('testerSignature', companyProfile.signature_data);
    }
  };

  // Get the best available profile source for the button
  const hasProfileSource = profiles.length > 0 || companyProfile?.inspector_name;

  // Saved PAT instruments from company profile
  const savedPATInstruments = useMemo(() => {
    const instruments = companyProfile?.testing_instruments;
    if (!instruments) return [];
    return instruments.filter((i: TestingInstrument) => i.instrument_type === 'pat');
  }, [companyProfile?.testing_instruments]);

  const loadEquipmentFromSettings = (instrument?: TestingInstrument) => {
    if (instrument) {
      onUpdate('testEquipment', {
        make: instrument.make || '',
        model: instrument.model || '',
        serialNumber: instrument.serial_number || '',
        lastCalibrationDate: instrument.calibration_date || '',
        nextCalibrationDue: instrument.calibration_due || '',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Tester Profile */}
      <Collapsible open={openSections.tester} onOpenChange={() => toggleSection('tester')}>
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <CollapsibleTrigger asChild>
            <div
              className={cn(
                'cursor-pointer transition-colors p-4 touch-manipulation',
                isMobile ? 'bg-card/30 border-y border-border/20' : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg text-white">Tester Profile</span>
                    {formData.testerName && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400">{formData.testerName}</span>
                      </div>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.tester && 'rotate-180'
                  )}
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              {/* Load from Settings button */}
              {hasProfileSource && (
                <Button
                  type="button"
                  onClick={() => {
                    const defaultProfile = getDefaultProfile();
                    if (defaultProfile) {
                      loadProfile(defaultProfile);
                    } else if (profiles.length > 0) {
                      loadProfile(profiles[0]);
                    } else {
                      loadFromCompanyProfile();
                    }
                  }}
                  className="h-11 w-full touch-manipulation bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <User className="h-5 w-5 mr-2" />
                  Load from Settings
                </Button>
              )}

              {/* Profile selector (when multiple profiles exist) */}
              {profiles.length > 1 && (
                <div className="space-y-2">
                  <Label className="text-white text-sm">Select Profile</Label>
                  <Select
                    value=""
                    onValueChange={(profileId) => {
                      const profile = profiles.find((p) => p.id === profileId);
                      if (profile) loadProfile(profile);
                    }}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue
                        placeholder={formData.testerName || 'Choose a saved profile...'}
                      />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {profiles.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.name}
                          {profile.isDefault ? ' (Default)' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Normal fields — always visible */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white text-sm" htmlFor="testerName">
                    Tester Name *
                  </Label>
                  <Input
                    id="testerName"
                    placeholder="Full name"
                    value={formData.testerName || ''}
                    onChange={(e) => onUpdate('testerName', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm" htmlFor="testerCompany">
                    Company
                  </Label>
                  <Input
                    id="testerCompany"
                    placeholder="Company name"
                    value={formData.testerCompany || ''}
                    onChange={(e) => onUpdate('testerCompany', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-white text-sm" htmlFor="testerQualifications">
                    Qualifications
                  </Label>
                  <Input
                    id="testerQualifications"
                    placeholder="e.g., C&G 2377, NAPIT"
                    value={formData.testerQualifications || ''}
                    onChange={(e) => onUpdate('testerQualifications', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Client Details with CRM Integration */}
      <Collapsible open={openSections.client} onOpenChange={() => toggleSection('client')}>
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <CollapsibleTrigger asChild>
            <div
              className={cn(
                'cursor-pointer transition-colors p-4 touch-manipulation',
                isMobile ? 'bg-card/30 border-y border-border/20' : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="font-semibold text-lg text-white">Client Details</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.client && 'rotate-180'
                  )}
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <CertificateClientSection
                formData={formData}
                onUpdate={onUpdate}
                fieldMapping={DEFAULT_CLIENT_FIELDS}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white text-sm" htmlFor="clientName">
                    Client Name *
                  </Label>
                  <Input
                    id="clientName"
                    placeholder="Enter client name"
                    value={formData.clientName || ''}
                    onChange={(e) => onUpdate('clientName', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm" htmlFor="contactPerson">
                    Contact Person
                  </Label>
                  <Input
                    id="contactPerson"
                    placeholder="Contact name"
                    value={formData.contactPerson || ''}
                    onChange={(e) => onUpdate('contactPerson', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white text-sm" htmlFor="clientAddress">
                  Client Address
                </Label>
                <Textarea
                  id="clientAddress"
                  placeholder="Full address"
                  value={formData.clientAddress || ''}
                  onChange={(e) => onUpdate('clientAddress', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white text-sm" htmlFor="clientTelephone">
                    Telephone
                  </Label>
                  <Input
                    id="clientTelephone"
                    type="tel"
                    placeholder="Contact number"
                    value={formData.clientTelephone || ''}
                    onChange={(e) => onUpdate('clientTelephone', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm" htmlFor="clientEmail">
                    Email
                  </Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    placeholder="Email address"
                    value={formData.clientEmail || ''}
                    onChange={(e) => onUpdate('clientEmail', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Site Details */}
      <Collapsible open={openSections.site} onOpenChange={() => toggleSection('site')}>
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <CollapsibleTrigger asChild>
            <div
              className={cn(
                'cursor-pointer transition-colors p-4 touch-manipulation',
                isMobile ? 'border-b border-border/20' : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="font-semibold text-lg text-white">Site Details</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.site && 'rotate-180'
                  )}
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div>
                <Label className="text-white text-sm" htmlFor="siteName">
                  Site Name
                </Label>
                <Input
                  id="siteName"
                  placeholder="Building or site name"
                  value={formData.siteName || ''}
                  onChange={(e) => onUpdate('siteName', e.target.value)}
                  className="h-11 text-base touch-manipulation"
                />
              </div>
              <div>
                <Label className="text-white text-sm" htmlFor="siteAddress">
                  Site Address *
                </Label>
                <Textarea
                  id="siteAddress"
                  placeholder="Full test location address"
                  value={formData.siteAddress || ''}
                  onChange={(e) => onUpdate('siteAddress', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white text-sm" htmlFor="siteContactName">
                    Site Contact
                  </Label>
                  <Input
                    id="siteContactName"
                    placeholder="On-site contact name"
                    value={formData.siteContactName || ''}
                    onChange={(e) => onUpdate('siteContactName', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm" htmlFor="siteContactPhone">
                    Contact Phone
                  </Label>
                  <Input
                    id="siteContactPhone"
                    type="tel"
                    placeholder="Contact number"
                    value={formData.siteContactPhone || ''}
                    onChange={(e) => onUpdate('siteContactPhone', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Test Equipment */}
      <Collapsible open={openSections.equipment} onOpenChange={() => toggleSection('equipment')}>
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <CollapsibleTrigger asChild>
            <div
              className={cn(
                'cursor-pointer transition-colors p-4 touch-manipulation',
                isMobile ? 'border-b border-border/20' : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg text-white">Test Equipment</span>
                    {formData.testEquipment?.make && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400">
                          {formData.testEquipment.make} {formData.testEquipment.model}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.equipment && 'rotate-180'
                  )}
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              {/* Load from Settings button */}
              {savedPATInstruments.length > 0 && (
                <>
                  {savedPATInstruments.length === 1 ? (
                    <Button
                      type="button"
                      onClick={() => loadEquipmentFromSettings(savedPATInstruments[0])}
                      className="h-11 w-full touch-manipulation bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Load from Settings
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Label className="text-white text-sm">Saved PAT Testers</Label>
                      {savedPATInstruments.map((instrument: TestingInstrument) => (
                        <Button
                          key={instrument.id}
                          type="button"
                          variant="outline"
                          onClick={() => loadEquipmentFromSettings(instrument)}
                          className="w-full h-11 justify-start touch-manipulation"
                        >
                          <Download className="h-4 w-4 mr-2 shrink-0" />
                          {instrument.make} {instrument.model}
                          {instrument.serial_number && (
                            <span className="text-white text-xs ml-2">
                              (S/N: {instrument.serial_number})
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Browse PAT tester database */}
              <div>
                <Label className="text-white text-sm">Browse PAT Testers</Label>
                <PATTesterAutocomplete
                  currentMake={formData.testEquipment?.make || ''}
                  currentModel={formData.testEquipment?.model || ''}
                  onTesterSelect={(tester) => {
                    onUpdate('testEquipment', {
                      ...formData.testEquipment,
                      make: tester.make,
                      model: tester.model,
                    });
                  }}
                />
              </div>

              {/* Normal fields — always visible */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white text-sm" htmlFor="equipmentMake">
                    Make
                  </Label>
                  <Input
                    id="equipmentMake"
                    placeholder="e.g., Megger, Seaward, Kewtech"
                    value={formData.testEquipment?.make || ''}
                    onChange={(e) => updateTestEquipment('make', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm" htmlFor="equipmentModel">
                    Model
                  </Label>
                  <Input
                    id="equipmentModel"
                    placeholder="e.g., PAT420, Apollo 600"
                    value={formData.testEquipment?.model || ''}
                    onChange={(e) => updateTestEquipment('model', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white text-sm" htmlFor="equipmentSerial">
                  Serial Number
                </Label>
                <Input
                  id="equipmentSerial"
                  placeholder="Equipment serial number"
                  value={formData.testEquipment?.serialNumber || ''}
                  onChange={(e) => updateTestEquipment('serialNumber', e.target.value)}
                  className="h-11 text-base touch-manipulation"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white text-sm" htmlFor="lastCalibration">
                    Last Calibration Date
                  </Label>
                  <Input
                    id="lastCalibration"
                    type="date"
                    value={formData.testEquipment?.lastCalibrationDate || ''}
                    onChange={(e) => updateTestEquipment('lastCalibrationDate', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm" htmlFor="nextCalibration">
                    Next Calibration Due
                  </Label>
                  <Input
                    id="nextCalibration"
                    type="date"
                    value={formData.testEquipment?.nextCalibrationDue || ''}
                    onChange={(e) => updateTestEquipment('nextCalibrationDue', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Certificate Metadata (collapsed by default) */}
      <Collapsible open={openSections.metadata} onOpenChange={() => toggleSection('metadata')}>
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <CollapsibleTrigger asChild>
            <div
              className={cn(
                'cursor-pointer transition-colors p-4 touch-manipulation',
                isMobile ? 'border-b border-border/20' : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="font-semibold text-lg text-white">Certificate Details</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.metadata && 'rotate-180'
                  )}
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white text-sm" htmlFor="certificateNumber">
                    Certificate Number
                  </Label>
                  <Input
                    id="certificateNumber"
                    placeholder="Auto-generated if blank"
                    value={formData.certificateNumber || ''}
                    onChange={(e) => onUpdate('certificateNumber', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm" htmlFor="testDate">
                    Test Date
                  </Label>
                  <Input
                    id="testDate"
                    type="date"
                    value={formData.testDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => onUpdate('testDate', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white text-sm" htmlFor="reportReference">
                  Report Reference
                </Label>
                <Input
                  id="reportReference"
                  placeholder="Optional reference"
                  value={formData.reportReference || ''}
                  onChange={(e) => onUpdate('reportReference', e.target.value)}
                  className="h-11 text-base touch-manipulation"
                />
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default PATTestingClientDetails;
