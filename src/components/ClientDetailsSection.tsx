import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Building2, MapPin, UserPlus, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';

interface ClientDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

/**
 * ClientDetailsSection - Best-in-class mobile form for client & installation details
 * Edge-to-edge design with large touch targets and native app feel
 */
const ClientDetailsSection = ({ formData, onUpdate }: ClientDetailsSectionProps) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const [clientType, setClientType] = useState<'new' | 'existing'>('new');

  const handleSameAddressToggle = (checked: boolean) => {
    haptics.tap();
    if (checked && formData.clientAddress) {
      onUpdate('installationAddress', formData.clientAddress);
    }
    onUpdate('sameAsClientAddress', checked ? 'true' : 'false');
  };

  const handleSelectCustomer = (customer: Customer | null) => {
    if (customer) {
      haptics.success();
      onUpdate('clientName', customer.name || '');
      onUpdate('clientEmail', customer.email || '');
      onUpdate('clientPhone', customer.phone || '');
      onUpdate('clientAddress', customer.address || '');
      if (formData.sameAsClientAddress === 'true' && customer.address) {
        onUpdate('installationAddress', customer.address);
      }
    }
  };

  // Section header component
  const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
    <div className={cn(
      "flex items-center gap-3 py-3",
      isMobile ? "-mx-4 px-4 bg-card/30 border-y border-border/20" : "pb-2 border-b border-border/30"
    )}>
      <div className="h-8 w-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
        <Icon className="h-4 w-4 text-elec-yellow" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
    </div>
  );

  // Input field wrapper with proper mobile styling
  const FormField = ({
    label,
    required,
    children
  }: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm text-foreground/80">
        {label}
        {required && <span className="text-elec-yellow ml-1">*</span>}
      </Label>
      {children}
    </div>
  );

  return (
    <div className={cn("space-y-6", isMobile && "-mx-4")}>
      {/* Client Type Toggle - Edge-to-edge on mobile */}
      <div>
        <div className={cn(isMobile ? "px-4" : "")}>
          <Label className="text-sm text-foreground/60 mb-3 block text-center">Client Type</Label>
        </div>
        <div className={cn("grid grid-cols-2 gap-2", isMobile ? "px-4" : "")}>
          <Button
            type="button"
            variant={clientType === 'new' ? 'default' : 'outline'}
            className={cn(
              "h-12 font-medium touch-manipulation",
              clientType === 'new'
                ? "bg-elec-yellow text-black hover:bg-elec-yellow/90"
                : "border-border/50"
            )}
            onClick={() => { haptics.tap(); setClientType('new'); }}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            New Client
          </Button>
          <Button
            type="button"
            variant={clientType === 'existing' ? 'default' : 'outline'}
            className={cn(
              "h-12 font-medium touch-manipulation",
              clientType === 'existing'
                ? "bg-elec-yellow text-black hover:bg-elec-yellow/90"
                : "border-border/50"
            )}
            onClick={() => { haptics.tap(); setClientType('existing'); }}
          >
            <Users className="h-4 w-4 mr-2" />
            Existing Client
          </Button>
        </div>
      </div>

      {/* Existing Client Selector */}
      {clientType === 'existing' && (
        <div className={cn(isMobile ? "px-4" : "")}>
          <ClientSelector onSelectCustomer={handleSelectCustomer} />
        </div>
      )}

      {/* Client Information Section */}
      <div>
        <SectionTitle icon={Users} title="Client Information" />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Client Name" required>
            <Input
              value={formData.clientName || ''}
              onChange={(e) => onUpdate('clientName', e.target.value)}
              placeholder="Full name of person ordering work"
              className="h-11 text-base touch-manipulation"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Phone">
              <Input
                type="tel"
                value={formData.clientPhone || ''}
                onChange={(e) => onUpdate('clientPhone', e.target.value)}
                placeholder="Contact number"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
            <FormField label="Email">
              <Input
                type="email"
                value={formData.clientEmail || ''}
                onChange={(e) => onUpdate('clientEmail', e.target.value)}
                placeholder="Email address"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          </div>

          <FormField label="Client Address" required>
            <Textarea
              value={formData.clientAddress || ''}
              onChange={(e) => onUpdate('clientAddress', e.target.value)}
              placeholder="Client's full postal address"
              className="min-h-[100px] text-base touch-manipulation resize-none"
            />
          </FormField>
        </div>
      </div>

      {/* Installation Details Section */}
      <div>
        <SectionTitle icon={Building2} title="Installation Details" />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          {/* Same Address Toggle */}
          <button
            type="button"
            onClick={() => handleSameAddressToggle(formData.sameAsClientAddress !== 'true')}
            className={cn(
              "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all touch-manipulation",
              formData.sameAsClientAddress === 'true'
                ? "border-elec-yellow bg-elec-yellow/10"
                : "border-border/30 bg-card/30"
            )}
          >
            <Checkbox
              checked={formData.sameAsClientAddress === 'true'}
              className="h-5 w-5 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
            />
            <div className="flex-1 text-left">
              <span className="font-medium">Same as client address</span>
              <p className="text-xs text-muted-foreground mt-0.5">Use client address for installation</p>
            </div>
            <MapPin className={cn(
              "h-5 w-5",
              formData.sameAsClientAddress === 'true' ? "text-elec-yellow" : "text-muted-foreground"
            )} />
          </button>

          {formData.sameAsClientAddress !== 'true' && (
            <FormField label="Installation Address" required>
              <Textarea
                value={formData.installationAddress || ''}
                onChange={(e) => onUpdate('installationAddress', e.target.value)}
                placeholder="Full address of the installation"
                className="min-h-[100px] text-base touch-manipulation resize-none"
              />
            </FormField>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Premises Type" required>
              <Select
                value={formData.description || ''}
                onValueChange={(value) => { haptics.tap(); onUpdate('description', value); }}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Installation Type">
              <Select
                value={formData.installationType || ''}
                onValueChange={(value) => { haptics.tap(); onUpdate('installationType', value); }}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-installation">New Installation</SelectItem>
                  <SelectItem value="existing-installation">Existing Installation</SelectItem>
                  <SelectItem value="extended-installation">Extended Installation</SelectItem>
                  <SelectItem value="altered-installation">Altered Installation</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </div>
      </div>

      {/* Installation History Section */}
      <div>
        <SectionTitle icon={History} title="Installation History" />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Estimated Age">
            <div className="flex gap-2">
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.estimatedAge || ''}
                onChange={(e) => onUpdate('estimatedAge', e.target.value)}
                placeholder="0"
                className="flex-1 h-11 text-base touch-manipulation"
              />
              <Select
                value={formData.ageUnit || 'years'}
                onValueChange={(value) => onUpdate('ageUnit', value)}
              >
                <SelectTrigger className="w-28 h-11 touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="years">Years</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormField>

          <FormField label="Last Inspection">
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'known', label: 'Known' },
                { value: 'unknown', label: 'Unknown' },
                { value: 'not-applicable', label: 'First' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    onUpdate('lastInspectionType', option.value);
                    if (option.value !== 'known') onUpdate('dateOfLastInspection', '');
                  }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                    formData.lastInspectionType === option.value
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {formData.lastInspectionType === 'known' && (
              <Input
                type="date"
                value={formData.dateOfLastInspection || ''}
                onChange={(e) => onUpdate('dateOfLastInspection', e.target.value)}
                className="mt-3 h-11 text-base touch-manipulation"
              />
            )}
          </FormField>

          <FormField label="Evidence of Alterations">
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    onUpdate('evidenceOfAlterations', option.value);
                    if (option.value === 'no') onUpdate('alterationsDetails', '');
                  }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation",
                    formData.evidenceOfAlterations === option.value
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {formData.evidenceOfAlterations === 'yes' && (
              <Textarea
                value={formData.alterationsDetails || ''}
                onChange={(e) => onUpdate('alterationsDetails', e.target.value)}
                placeholder="Describe the alterations observed..."
                className="mt-3 min-h-[80px] text-base touch-manipulation resize-none"
              />
            )}
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsSection;
