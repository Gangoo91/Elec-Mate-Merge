/**
 * Solar PV Installation Details Tab
 * Client details, installation address, and MCS compliance information
 */

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Building2,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Shield,
  Sparkles,
  Sun,
  Home,
  AlertTriangle,
  HardHat,
  ClipboardCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SolarPVFormData,
  SystemType,
  MountingType,
  CertificateType,
  WorkType,
  PropertyType,
  OwnershipType,
  YieldCalculationMethod,
} from '@/types/solar-pv';
import { useSolarPVSmartForm } from '@/hooks/inspection/useSolarPVSmartForm';

interface SolarPVInstallationDetailsProps {
  formData: SolarPVFormData;
  onUpdate: (field: string, value: any) => void;
}

interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  color?: string;
  badge?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon: Icon,
  isOpen,
  color = 'amber-500',
  badge,
}) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 sm:p-5 hover:bg-white/5 transition-colors rounded-t-xl">
    <div className="flex items-center gap-3">
      <div className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center',
        `bg-${color}/15`
      )}>
        <Icon className={cn('h-5 w-5', `text-${color}`)} />
      </div>
      <div className="text-left">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          {title}
          {badge && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-amber-500/10 text-amber-400 border-amber-500/30">
              {badge}
            </Badge>
          )}
        </h3>
      </div>
    </div>
    {isOpen ? (
      <ChevronUp className="h-5 w-5 text-muted-foreground" />
    ) : (
      <ChevronDown className="h-5 w-5 text-muted-foreground" />
    )}
  </CollapsibleTrigger>
);

const SolarPVInstallationDetails: React.FC<SolarPVInstallationDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  const [openSections, setOpenSections] = useState({
    certificate: true,
    client: true,
    property: true,
    siteAccess: false,
    installation: true,
    mcs: true,
    system: true,
  });

  const { suggestDNOByPostcode } = useSolarPVSmartForm(formData, onUpdate);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Auto-suggest DNO when installation postcode changes
  useEffect(() => {
    const postcode = formData.installationSameAsClient
      ? formData.clientPostcode
      : formData.installationPostcode;

    if (postcode && (!formData.gridConnection?.dnoName)) {
      const dno = suggestDNOByPostcode(postcode);
      if (dno) {
        onUpdate('gridConnection', {
          ...formData.gridConnection,
          dnoName: dno.name,
          dnoRegion: dno.region,
        });
      }
    }
  }, [formData.clientPostcode, formData.installationPostcode, formData.installationSameAsClient]);

  return (
    <div className="space-y-4 px-4 sm:px-0">
      {/* Certificate Details */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.certificate} onOpenChange={() => toggleSection('certificate')}>
          <SectionHeader
            title="Certificate Details"
            icon={FileCheck}
            isOpen={openSections.certificate}
            color="amber-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              {/* MCS Certificate Type Info */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-sm text-amber-200">
                  <strong>MCS Requirement:</strong> Certificate must be issued within 10 working days of commissioning.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Certificate Type - MCS Requirement */}
                <div className="space-y-2">
                  <Label htmlFor="certificateType" className="text-sm font-medium text-foreground">
                    Certificate Type *
                  </Label>
                  <Select
                    value={formData.certificateType || 'installation'}
                    onValueChange={(value) => onUpdate('certificateType', value as CertificateType)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="installation">Installation Certificate</SelectItem>
                      <SelectItem value="commissioning">Commissioning Report Only</SelectItem>
                      <SelectItem value="design-only">Design Report Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Work Type */}
                <div className="space-y-2">
                  <Label htmlFor="workType" className="text-sm font-medium text-foreground">
                    Work Type *
                  </Label>
                  <Select
                    value={formData.workType || 'new-installation'}
                    onValueChange={(value) => onUpdate('workType', value as WorkType)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="new-installation">New Installation</SelectItem>
                      <SelectItem value="retrofit">Retrofit / Addition to Existing</SelectItem>
                      <SelectItem value="extension">System Extension</SelectItem>
                      <SelectItem value="replacement">Component Replacement</SelectItem>
                      <SelectItem value="repair">Repair / Remedial Work</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificateNumber" className="text-sm font-medium text-foreground">
                    Certificate Number
                  </Label>
                  <Input
                    id="certificateNumber"
                    value={formData.certificateNumber || ''}
                    onChange={(e) => onUpdate('certificateNumber', e.target.value)}
                    placeholder="e.g., SPV-2025-001"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designReference" className="text-sm font-medium text-foreground">
                    Design/Quote Reference
                  </Label>
                  <Input
                    id="designReference"
                    value={formData.designReference || ''}
                    onChange={(e) => onUpdate('designReference', e.target.value)}
                    placeholder="e.g., QT-2025-001"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installationDate" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber-400" />
                    Installation Date *
                  </Label>
                  <Input
                    id="installationDate"
                    type="date"
                    value={formData.installationDate || ''}
                    onChange={(e) => onUpdate('installationDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commissioningDate" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber-400" />
                    Commissioning Date *
                  </Label>
                  <Input
                    id="commissioningDate"
                    type="date"
                    value={formData.commissioningDate || ''}
                    onChange={(e) => onUpdate('commissioningDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="systemType" className="text-sm font-medium text-foreground">
                    System Type *
                  </Label>
                  <Select
                    value={formData.systemType || 'grid-tied'}
                    onValueChange={(value) => onUpdate('systemType', value as SystemType)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="grid-tied">Grid-Tied (Most Common)</SelectItem>
                      <SelectItem value="hybrid">Hybrid (with Battery)</SelectItem>
                      <SelectItem value="off-grid">Off-Grid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Previous Installation Reference - shown for retrofit/extension */}
                {(formData.workType === 'retrofit' || formData.workType === 'extension') && (
                  <div className="space-y-2">
                    <Label htmlFor="previousInstallationRef" className="text-sm font-medium text-foreground">
                      Previous MCS Certificate No.
                    </Label>
                    <Input
                      id="previousInstallationRef"
                      value={formData.previousInstallationRef || ''}
                      onChange={(e) => onUpdate('previousInstallationRef', e.target.value)}
                      placeholder="Reference to existing installation"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Client Details */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.client} onOpenChange={() => toggleSection('client')}>
          <SectionHeader
            title="Client Details"
            icon={User}
            isOpen={openSections.client}
            color="blue-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="clientName" className="text-sm font-medium text-foreground">
                    Client Name *
                  </Label>
                  <Input
                    id="clientName"
                    value={formData.clientName || ''}
                    onChange={(e) => onUpdate('clientName', e.target.value)}
                    placeholder="Enter client name"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="clientAddress" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    Address *
                  </Label>
                  <Input
                    id="clientAddress"
                    value={formData.clientAddress || ''}
                    onChange={(e) => onUpdate('clientAddress', e.target.value)}
                    placeholder="Street address"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientPostcode" className="text-sm font-medium text-foreground">
                    Postcode *
                  </Label>
                  <Input
                    id="clientPostcode"
                    value={formData.clientPostcode || ''}
                    onChange={(e) => onUpdate('clientPostcode', e.target.value.toUpperCase())}
                    placeholder="e.g., SW1A 1AA"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 uppercase"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientPhone" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-400" />
                    Phone
                  </Label>
                  <Input
                    id="clientPhone"
                    type="tel"
                    value={formData.clientPhone || ''}
                    onChange={(e) => onUpdate('clientPhone', e.target.value)}
                    placeholder="e.g., 07123 456789"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="clientEmail" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-400" />
                    Email
                  </Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail || ''}
                    onChange={(e) => onUpdate('clientEmail', e.target.value)}
                    placeholder="client@example.com"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Property & Ownership - MCS Requirement */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.property} onOpenChange={() => toggleSection('property')}>
          <SectionHeader
            title="Property & Ownership"
            icon={Home}
            isOpen={openSections.property}
            color="green-500"
            badge="MCS"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-sm font-medium text-foreground">
                    Property Type *
                  </Label>
                  <Select
                    value={formData.propertyType || 'domestic'}
                    onValueChange={(value) => onUpdate('propertyType', value as PropertyType)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="domestic">Domestic / Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="agricultural">Agricultural / Farm</SelectItem>
                      <SelectItem value="mixed-use">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownershipType" className="text-sm font-medium text-foreground">
                    Ownership / Client Type *
                  </Label>
                  <Select
                    value={formData.ownershipType || 'owner-occupied'}
                    onValueChange={(value) => onUpdate('ownershipType', value as OwnershipType)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select ownership" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="owner-occupied">Owner Occupied</SelectItem>
                      <SelectItem value="landlord">Private Landlord</SelectItem>
                      <SelectItem value="tenant">Tenant (with permission)</SelectItem>
                      <SelectItem value="housing-association">Housing Association</SelectItem>
                      <SelectItem value="commercial-owner">Commercial Owner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.ownershipType === 'other' && (
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="ownershipOther" className="text-sm font-medium text-foreground">
                      Specify Ownership Type
                    </Label>
                    <Input
                      id="ownershipOther"
                      value={formData.ownershipOther || ''}
                      onChange={(e) => onUpdate('ownershipOther', e.target.value)}
                      placeholder="Describe ownership arrangement"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="propertyAge" className="text-sm font-medium text-foreground">
                    Property Age / Era
                  </Label>
                  <Select
                    value={formData.propertyAge || ''}
                    onValueChange={(value) => onUpdate('propertyAge', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select approximate age" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="pre-1919">Pre-1919</SelectItem>
                      <SelectItem value="1919-1944">1919-1944</SelectItem>
                      <SelectItem value="1945-1964">1945-1964</SelectItem>
                      <SelectItem value="1965-1980">1965-1980</SelectItem>
                      <SelectItem value="1981-2000">1981-2000</SelectItem>
                      <SelectItem value="2001-2010">2001-2010</SelectItem>
                      <SelectItem value="2011-present">2011-Present</SelectItem>
                      <SelectItem value="new-build">New Build</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roofAge" className="text-sm font-medium text-foreground">
                    Roof Condition / Age
                  </Label>
                  <Select
                    value={formData.roofAge || ''}
                    onValueChange={(value) => onUpdate('roofAge', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select roof condition" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="excellent">Excellent (new/recent)</SelectItem>
                      <SelectItem value="good">Good (5-15 years)</SelectItem>
                      <SelectItem value="fair">Fair (15-25 years)</SelectItem>
                      <SelectItem value="poor">Poor (needs attention)</SelectItem>
                      <SelectItem value="replaced">Recently Replaced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Site Access & Safety */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.siteAccess} onOpenChange={() => toggleSection('siteAccess')}>
          <SectionHeader
            title="Site Access & Safety"
            icon={HardHat}
            isOpen={openSections.siteAccess}
            color="orange-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              <div className="space-y-2">
                <Label htmlFor="siteAccessNotes" className="text-sm font-medium text-foreground">
                  Site Access Notes
                </Label>
                <Input
                  id="siteAccessNotes"
                  value={formData.siteAccessNotes || ''}
                  onChange={(e) => onUpdate('siteAccessNotes', e.target.value)}
                  placeholder="Parking, access restrictions, key holder details..."
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              {/* Safety Checks */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  Pre-Installation Safety Checks
                </h4>

                <div className="space-y-3 pl-1">
                  <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Checkbox
                      id="safeIsolationVerified"
                      checked={formData.safeIsolationVerified}
                      onCheckedChange={(checked) => onUpdate('safeIsolationVerified', checked)}
                      className="mt-0.5 h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                    />
                    <div>
                      <Label
                        htmlFor="safeIsolationVerified"
                        className="text-sm text-foreground cursor-pointer font-medium"
                      >
                        Safe Isolation Verified
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Confirmed safe isolation can be achieved at the property
                      </p>
                    </div>
                  </div>

                  {/* Asbestos Check - shown for pre-2000 properties */}
                  {(formData.propertyAge === 'pre-1919' ||
                    formData.propertyAge === '1919-1944' ||
                    formData.propertyAge === '1945-1964' ||
                    formData.propertyAge === '1965-1980' ||
                    formData.propertyAge === '1981-2000') && (
                    <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg space-y-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="asbestosCheckRequired"
                          checked={formData.asbestosCheckRequired}
                          onCheckedChange={(checked) => onUpdate('asbestosCheckRequired', checked)}
                          className="mt-0.5 h-5 w-5 border-white/40 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 data-[state=checked]:text-white"
                        />
                        <div>
                          <Label
                            htmlFor="asbestosCheckRequired"
                            className="text-sm text-foreground cursor-pointer font-medium"
                          >
                            Asbestos Survey Required
                          </Label>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Pre-2000 property - check for asbestos in roof/soffit materials
                          </p>
                        </div>
                      </div>

                      {formData.asbestosCheckRequired && (
                        <div className="flex items-start gap-3 ml-6">
                          <Checkbox
                            id="asbestosCheckCompleted"
                            checked={formData.asbestosCheckCompleted}
                            onCheckedChange={(checked) => onUpdate('asbestosCheckCompleted', checked)}
                            className="mt-0.5 h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                          />
                          <div>
                            <Label
                              htmlFor="asbestosCheckCompleted"
                              className="text-sm text-foreground cursor-pointer"
                            >
                              Asbestos check completed - safe to proceed
                            </Label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Structural Assessment */}
                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      id="structuralAssessmentRequired"
                      checked={formData.structuralAssessmentRequired}
                      onCheckedChange={(checked) => onUpdate('structuralAssessmentRequired', checked)}
                      className="mt-0.5 h-5 w-5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <div>
                      <Label
                        htmlFor="structuralAssessmentRequired"
                        className="text-sm text-foreground cursor-pointer font-medium"
                      >
                        Structural Assessment Required
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        For older roofs, flat roofs, or systems over 4kWp
                      </p>
                    </div>
                  </div>

                  {formData.structuralAssessmentRequired && (
                    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg ml-6">
                      <Checkbox
                        id="structuralAssessmentCompleted"
                        checked={formData.structuralAssessmentCompleted}
                        onCheckedChange={(checked) => onUpdate('structuralAssessmentCompleted', checked)}
                        className="mt-0.5 h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                      />
                      <div>
                        <Label
                          htmlFor="structuralAssessmentCompleted"
                          className="text-sm text-foreground cursor-pointer"
                        >
                          Structural assessment completed - approved for installation
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Installation Address */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.installation} onOpenChange={() => toggleSection('installation')}>
          <SectionHeader
            title="Installation Address"
            icon={Building2}
            isOpen={openSections.installation}
            color="cyan-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg min-h-[48px]">
                <Checkbox
                  id="installationSameAsClient"
                  checked={formData.installationSameAsClient}
                  onCheckedChange={(checked) => {
                    onUpdate('installationSameAsClient', checked);
                    if (checked) {
                      onUpdate('installationAddress', formData.clientAddress);
                      onUpdate('installationPostcode', formData.clientPostcode);
                    }
                  }}
                  className="h-5 w-5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <Label
                  htmlFor="installationSameAsClient"
                  className="text-sm text-foreground cursor-pointer"
                >
                  Same as client address
                </Label>
              </div>

              {!formData.installationSameAsClient && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="installationAddress" className="text-sm font-medium text-foreground">
                      Installation Address *
                    </Label>
                    <Input
                      id="installationAddress"
                      value={formData.installationAddress || ''}
                      onChange={(e) => onUpdate('installationAddress', e.target.value)}
                      placeholder="Street address"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="installationPostcode" className="text-sm font-medium text-foreground">
                      Postcode *
                    </Label>
                    <Input
                      id="installationPostcode"
                      value={formData.installationPostcode || ''}
                      onChange={(e) => onUpdate('installationPostcode', e.target.value.toUpperCase())}
                      placeholder="e.g., SW1A 1AA"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 uppercase"
                    />
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* MCS Compliance */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.mcs} onOpenChange={() => toggleSection('mcs')}>
          <SectionHeader
            title="MCS Compliance"
            icon={Shield}
            isOpen={openSections.mcs}
            color="purple-500"
            badge="Required"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              {/* MCS Info Banner */}
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-sm text-purple-200">
                  MCS certification is required for Smart Export Guarantee (SEG) eligibility and most grant schemes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mcsInstallerNumber" className="text-sm font-medium text-foreground">
                    MCS Installer Number *
                  </Label>
                  <Input
                    id="mcsInstallerNumber"
                    value={formData.mcsDetails?.installerNumber || ''}
                    onChange={(e) => onUpdate('mcsDetails', {
                      ...formData.mcsDetails,
                      installerNumber: e.target.value,
                    })}
                    placeholder="e.g., NAP-12345"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mcsInstallationNumber" className="text-sm font-medium text-foreground">
                    MCS Installation Number
                  </Label>
                  <Input
                    id="mcsInstallationNumber"
                    value={formData.mcsDetails?.installationNumber || ''}
                    onChange={(e) => onUpdate('mcsDetails', {
                      ...formData.mcsDetails,
                      installationNumber: e.target.value,
                    })}
                    placeholder="Generated after registration"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                  <p className="text-xs text-muted-foreground">
                    This is generated when you register the installation on the MCS database
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consumerCode" className="text-sm font-medium text-foreground">
                    Consumer Code
                  </Label>
                  <Select
                    value={formData.mcsDetails?.consumerCode || ''}
                    onValueChange={(value) => onUpdate('mcsDetails', {
                      ...formData.mcsDetails,
                      consumerCode: value,
                    })}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select consumer code" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="RECC">RECC (Renewable Energy Consumer Code)</SelectItem>
                      <SelectItem value="HIES">HIES (Home Insulation & Energy Systems)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* System Overview (Auto-calculated) */}
      <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Sun className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                System Overview
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Auto-calculated
                </Badge>
              </h3>
              <p className="text-xs text-muted-foreground">
                Values update as you add arrays and inverters
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="p-3 bg-background/50 rounded-lg border border-white/10">
              <p className="text-xs text-muted-foreground mb-1">Total Capacity</p>
              <p className="text-xl font-bold text-amber-400">
                {formData.totalCapacity?.toFixed(2) || '0.00'} <span className="text-sm font-normal">kWp</span>
              </p>
            </div>

            <div className="p-3 bg-background/50 rounded-lg border border-white/10">
              <p className="text-xs text-muted-foreground mb-1">Est. Annual Yield</p>
              <p className="text-xl font-bold text-green-400">
                {formData.estimatedAnnualYield?.toLocaleString() || '0'} <span className="text-sm font-normal">kWh</span>
              </p>
            </div>

            <div className="p-3 bg-background/50 rounded-lg border border-white/10">
              <p className="text-xs text-muted-foreground mb-1">Arrays</p>
              <p className="text-xl font-bold text-blue-400">
                {formData.arrays?.length || 0}
              </p>
            </div>

            <div className="p-3 bg-background/50 rounded-lg border border-white/10">
              <p className="text-xs text-muted-foreground mb-1">CO₂ Savings</p>
              <p className="text-xl font-bold text-emerald-400">
                {formData.co2SavingsAnnual?.toLocaleString() || Math.round((formData.estimatedAnnualYield || 0) * 0.233).toLocaleString()} <span className="text-sm font-normal">kg/yr</span>
              </p>
            </div>
          </div>

          {/* Yield Calculation Method - MCS Requirement */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <Label htmlFor="yieldCalculationMethod" className="text-sm font-medium text-foreground flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-amber-400" />
                Yield Calculation Method *
              </Label>
              <Select
                value={formData.yieldCalculationMethod || 'mcs-estimator'}
                onValueChange={(value) => onUpdate('yieldCalculationMethod', value as YieldCalculationMethod)}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-background/50 border-white/20 focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                  <SelectItem value="mcs-estimator">MCS Yield Estimator (Recommended)</SelectItem>
                  <SelectItem value="sap-2012">SAP 2012 Appendix M</SelectItem>
                  <SelectItem value="pvgis">PVGIS (EU)</SelectItem>
                  <SelectItem value="pvsyst">PVsyst Simulation</SelectItem>
                  <SelectItem value="manufacturer">Manufacturer Tool</SelectItem>
                  <SelectItem value="other">Other Method</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="yieldCalculationNotes" className="text-sm font-medium text-foreground">
                Calculation Notes
              </Label>
              <Input
                id="yieldCalculationNotes"
                value={formData.yieldCalculationNotes || ''}
                onChange={(e) => onUpdate('yieldCalculationNotes', e.target.value)}
                placeholder="e.g., kWh/kWp ratio used, shading factors..."
                className="h-11 text-base touch-manipulation bg-background/50 border-white/20 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* MCS Info */}
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <p className="text-xs text-amber-200">
              <strong>MCS Requirement:</strong> Yield estimates must be calculated using an approved methodology.
              The MCS Yield Estimator or SAP 2012 are the most commonly accepted methods for domestic installations.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SolarPVInstallationDetails;
