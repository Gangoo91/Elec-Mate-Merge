import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, User, FileText, RotateCcw } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CompanyProfile } from "@/types/company";
import { InstallPlanDataV2 } from "@/components/install-planner-v2/types";

export interface ProjectDetailsData {
  // Company
  companyName: string;
  companyLogoUrl?: string;
  companyAddress: string;
  companyPostcode: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite?: string;
  registrationNumber?: string;
  vatNumber?: string;
  
  // Client
  clientName: string;
  propertyAddress: string;
  postcode: string;
  contactNumber: string;
  clientEmail: string;
  
  // Project
  projectName: string;
  location: string;
  designEngineer: string;
  designDate: string;
  installationType: string;
}

interface ProjectDetailsFormProps {
  companyProfile: CompanyProfile | null;
  planData: InstallPlanDataV2;
  value: ProjectDetailsData;
  onChange: (data: ProjectDetailsData) => void;
}

export const ProjectDetailsForm = ({ 
  companyProfile, 
  planData, 
  value, 
  onChange 
}: ProjectDetailsFormProps) => {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(['company', 'client', 'project'])
  );

  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const handleReset = (section: 'company' | 'client' | 'project') => {
    const defaults = getDefaultValues();
    if (section === 'company') {
      onChange({
        ...value,
        companyName: defaults.companyName,
        companyLogoUrl: defaults.companyLogoUrl,
        companyAddress: defaults.companyAddress,
        companyPostcode: defaults.companyPostcode,
        companyPhone: defaults.companyPhone,
        companyEmail: defaults.companyEmail,
        companyWebsite: defaults.companyWebsite,
        registrationNumber: defaults.registrationNumber,
        vatNumber: defaults.vatNumber,
      });
    } else if (section === 'client') {
      onChange({
        ...value,
        clientName: defaults.clientName,
        propertyAddress: defaults.propertyAddress,
        postcode: defaults.postcode,
        contactNumber: defaults.contactNumber,
        clientEmail: defaults.clientEmail,
      });
    } else {
      onChange({
        ...value,
        projectName: defaults.projectName,
        location: defaults.location,
        designEngineer: defaults.designEngineer,
        designDate: defaults.designDate,
        installationType: defaults.installationType,
      });
    }
  };

  const getDefaultValues = (): ProjectDetailsData => ({
    companyName: companyProfile?.company_name || 'Your Company',
    companyLogoUrl: companyProfile?.logo_url,
    companyAddress: companyProfile?.company_address || '',
    companyPostcode: companyProfile?.company_postcode || '',
    companyPhone: companyProfile?.company_phone || '',
    companyEmail: companyProfile?.company_email || '',
    companyWebsite: companyProfile?.company_website,
    registrationNumber: companyProfile?.company_registration,
    vatNumber: companyProfile?.vat_number,
    
    clientName: planData.siteInfo?.clientName || '',
    propertyAddress: planData.siteInfo?.propertyAddress || '',
    postcode: planData.siteInfo?.postcode || '',
    contactNumber: planData.siteInfo?.contactNumber || '',
    clientEmail: '',
    
    projectName: `${planData.installationType} Installation`,
    location: planData.siteInfo?.propertyAddress || '',
    designEngineer: planData.projectInfo?.leadElectrician || '',
    designDate: new Date().toISOString().split('T')[0],
    installationType: planData.installationType,
  });

  const updateField = (field: keyof ProjectDetailsData, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  const requiredFields: (keyof ProjectDetailsData)[] = [
    'companyName', 'clientName', 'propertyAddress', 'projectName', 'designEngineer'
  ];

  const isComplete = requiredFields.every(field => value[field]?.trim());

  return (
    <div className="space-y-4">
      {/* Completion Badge */}
      <Card className="p-4 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border-elec-yellow/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-elec-yellow" />
            <div>
              <h3 className="font-semibold text-foreground">Project Information</h3>
              <p className="text-xs text-muted-foreground">
                Complete all required fields for PDF generation
              </p>
            </div>
          </div>
          <Badge variant={isComplete ? "default" : "secondary"}>
            {isComplete ? "✓ Complete" : "Incomplete"}
          </Badge>
        </div>
      </Card>

      {/* Company Details Section */}
      <Card>
        <Collapsible 
          open={openSections.has('company')} 
          onOpenChange={() => toggleSection('company')}
        >
          <CollapsibleTrigger className="w-full">
            <div className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-elec-yellow" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Company Details</h3>
                  <p className="text-xs text-muted-foreground">Your business information</p>
                </div>
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleReset('company')}
                  className="gap-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset to Profile
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="companyName" className="text-sm font-medium">
                    Company Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    value={value.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="mt-1"
                    placeholder="Your Company Ltd"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="companyAddress" className="text-sm font-medium">Address</Label>
                    <Input
                      id="companyAddress"
                      value={value.companyAddress}
                      onChange={(e) => updateField('companyAddress', e.target.value)}
                      className="mt-1"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyPostcode" className="text-sm font-medium">Postcode</Label>
                    <Input
                      id="companyPostcode"
                      value={value.companyPostcode}
                      onChange={(e) => updateField('companyPostcode', e.target.value)}
                      className="mt-1"
                      placeholder="M1 1AA"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="companyPhone" className="text-sm font-medium">Phone</Label>
                    <Input
                      id="companyPhone"
                      value={value.companyPhone}
                      onChange={(e) => updateField('companyPhone', e.target.value)}
                      className="mt-1"
                      placeholder="0161 123 4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyEmail" className="text-sm font-medium">Email</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={value.companyEmail}
                      onChange={(e) => updateField('companyEmail', e.target.value)}
                      className="mt-1"
                      placeholder="info@company.co.uk"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="companyWebsite" className="text-sm font-medium">Website</Label>
                    <Input
                      id="companyWebsite"
                      value={value.companyWebsite || ''}
                      onChange={(e) => updateField('companyWebsite', e.target.value)}
                      className="mt-1"
                      placeholder="www.company.co.uk"
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationNumber" className="text-sm font-medium">Registration No.</Label>
                    <Input
                      id="registrationNumber"
                      value={value.registrationNumber || ''}
                      onChange={(e) => updateField('registrationNumber', e.target.value)}
                      className="mt-1"
                      placeholder="12345678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vatNumber" className="text-sm font-medium">VAT Number</Label>
                    <Input
                      id="vatNumber"
                      value={value.vatNumber || ''}
                      onChange={(e) => updateField('vatNumber', e.target.value)}
                      className="mt-1"
                      placeholder="GB123456789"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Client Details Section */}
      <Card>
        <Collapsible 
          open={openSections.has('client')} 
          onOpenChange={() => toggleSection('client')}
        >
          <CollapsibleTrigger className="w-full">
            <div className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-elec-yellow" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Client Details</h3>
                  <p className="text-xs text-muted-foreground">Customer information</p>
                </div>
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleReset('client')}
                  className="gap-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset to Defaults
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="clientName" className="text-sm font-medium">
                    Client Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="clientName"
                    value={value.clientName}
                    onChange={(e) => updateField('clientName', e.target.value)}
                    className="mt-1"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="propertyAddress" className="text-sm font-medium">
                      Property Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="propertyAddress"
                      value={value.propertyAddress}
                      onChange={(e) => updateField('propertyAddress', e.target.value)}
                      className="mt-1"
                      placeholder="45 High Street"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postcode" className="text-sm font-medium">Postcode</Label>
                    <Input
                      id="postcode"
                      value={value.postcode}
                      onChange={(e) => updateField('postcode', e.target.value)}
                      className="mt-1"
                      placeholder="M2 3BB"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="contactNumber" className="text-sm font-medium">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      value={value.contactNumber}
                      onChange={(e) => updateField('contactNumber', e.target.value)}
                      className="mt-1"
                      placeholder="07700 900000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientEmail" className="text-sm font-medium">Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={value.clientEmail}
                      onChange={(e) => updateField('clientEmail', e.target.value)}
                      className="mt-1"
                      placeholder="client@email.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Project Information Section */}
      <Card>
        <Collapsible 
          open={openSections.has('project')} 
          onOpenChange={() => toggleSection('project')}
        >
          <CollapsibleTrigger className="w-full">
            <div className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-elec-yellow" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Project Information</h3>
                  <p className="text-xs text-muted-foreground">Installation details</p>
                </div>
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleReset('project')}
                  className="gap-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset to Defaults
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="projectName" className="text-sm font-medium">
                    Project Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="projectName"
                    value={value.projectName}
                    onChange={(e) => updateField('projectName', e.target.value)}
                    className="mt-1"
                    placeholder="Kitchen Rewire"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                    <Input
                      id="location"
                      value={value.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      className="mt-1"
                      placeholder="Manchester"
                    />
                  </div>
                  <div>
                    <Label htmlFor="designEngineer" className="text-sm font-medium">
                      Design Engineer <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="designEngineer"
                      value={value.designEngineer}
                      onChange={(e) => updateField('designEngineer', e.target.value)}
                      className="mt-1"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="designDate" className="text-sm font-medium">Design Date</Label>
                    <Input
                      id="designDate"
                      type="date"
                      value={value.designDate}
                      onChange={(e) => updateField('designDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="installationType" className="text-sm font-medium">Installation Type</Label>
                    <Input
                      id="installationType"
                      value={value.installationType}
                      onChange={(e) => updateField('installationType', e.target.value)}
                      className="mt-1"
                      placeholder="Domestic"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};
