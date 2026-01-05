
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  Phone, 
  Mail, 
  FileText, 
  MapPin,
  CreditCard,
  Shield,
  Hash
} from 'lucide-react';

interface CompanyDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
  companyDetailsMode: 'structured' | 'freeform';
  onToggleMode: () => void;
  onQuickFill: (template: string) => void;
}

const CompanyDetailsSection = ({ 
  formData, 
  onUpdate, 
  companyDetailsMode, 
  onToggleMode, 
  onQuickFill 
}: CompanyDetailsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-300 border-b border-elec-gray pb-2">
          <Building2 className="h-4 w-4 text-elec-yellow" />
          Company/Organisation Details
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={onQuickFill}>
            <SelectTrigger className="w-52 bg-elec-gray border-elec-gray text-foreground focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Quick fill template" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-elec-gray">
              <SelectItem value="sole_trader">Sole Trader Template</SelectItem>
              <SelectItem value="limited_company">Limited Company Template</SelectItem>
              <SelectItem value="partnership">Partnership Template</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleMode}
            className="border-elec-gray text-gray-300 hover:bg-elec-gray"
          >
            {companyDetailsMode === 'structured' ? 'Switch to Freeform' : 'Switch to Structured'}
          </Button>
        </div>
      </div>

      {companyDetailsMode === 'structured' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Building2 className="h-4 w-4" />
                Company Name
              </Label>
              <Input
                id="companyName"
                value={formData.companyName || ''}
                onChange={(e) => onUpdate('companyName', e.target.value)}
                placeholder="Company or organisation name"
                className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyRegistration" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Hash className="h-4 w-4" />
                Registration Number
              </Label>
              <Input
                id="companyRegistration"
                value={formData.companyRegistration || ''}
                onChange={(e) => onUpdate('companyRegistration', e.target.value)}
                placeholder="Companies House number"
                className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyAddress" className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <MapPin className="h-4 w-4" />
              Company Address
            </Label>
            <Textarea
              id="companyAddress"
              value={formData.companyAddress || ''}
              onChange={(e) => onUpdate('companyAddress', e.target.value)}
              placeholder="Full company address including postcode"
              rows={3}
              className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyPhone" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="companyPhone"
                value={formData.companyPhone || ''}
                onChange={(e) => onUpdate('companyPhone', e.target.value)}
                placeholder="Company phone number"
                className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyEmail" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="companyEmail"
                type="email"
                value={formData.companyEmail || ''}
                onChange={(e) => onUpdate('companyEmail', e.target.value)}
                placeholder="Company email address"
                className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyNICEIC" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <CreditCard className="h-4 w-4" />
                NICEIC/NAPIT Registration
              </Label>
              <Input
                id="companyNICEIC"
                value={formData.companyNICEIC || ''}
                onChange={(e) => onUpdate('companyNICEIC', e.target.value)}
                placeholder="NICEIC, NAPIT, or other registration number"
                className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyInsurance" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Shield className="h-4 w-4" />
                Insurance Details
              </Label>
              <Input
                id="companyInsurance"
                value={formData.companyInsurance || ''}
                onChange={(e) => onUpdate('companyInsurance', e.target.value)}
                placeholder="Professional indemnity insurance details"
                className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="companyDetails" className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <FileText className="h-4 w-4" />
            Company Details (Freeform)
          </Label>
          <Textarea
            id="companyDetails"
            value={formData.companyDetails || ''}
            onChange={(e) => onUpdate('companyDetails', e.target.value)}
            placeholder="Company name, address, registration details, contact information..."
            rows={8}
            className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow font-mono text-sm"
          />
          
          <div className="mt-2 text-xs text-gray-400 bg-muted p-3 rounded-md border border-border">
            <div className="flex flex-wrap gap-4">
              <span className="font-medium">Include:</span>
              <span>Company name & address</span>
              <span>Phone & email</span>
              <span>Registration numbers (Companies House, NICEIC, NAPIT)</span>
              <span>Professional indemnity insurance details</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetailsSection;
