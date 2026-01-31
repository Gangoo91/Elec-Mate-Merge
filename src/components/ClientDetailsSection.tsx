import React, { useState, useCallback, useMemo } from 'react';
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
import { useMultiFieldSync } from '@/hooks/useFieldSync';

interface ClientDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

// Section header component - MUST be outside main component to prevent re-renders
const SectionTitle = ({ icon: Icon, title, isMobile }: { icon: React.ElementType; title: string; isMobile: boolean }) => (
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

// Input field wrapper - MUST be outside main component to prevent focus loss on re-renders
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

// Fields managed by this section (for memoization comparison)
const CLIENT_SECTION_FIELDS = [
  'clientName',
  'clientPhone',
  'clientEmail',
  'clientAddress',
  'occupier',
  'sameAsClientAddress',
  'installationAddress',
  'description',
  'otherPremisesDescription',
  'installationType',
  'estimatedAge',
  'ageUnit',
  'lastInspectionType',
  'dateOfLastInspection',
  'evidenceOfAlterations',
  'alterationsDetails',
  'alterationsAge',
  'installationRecordsAvailable',
] as const;

type ClientSectionFields = {
  [K in typeof CLIENT_SECTION_FIELDS[number]]?: string;
};

/**
 * ClientDetailsSection - Best-in-class mobile form for client & installation details
 * Edge-to-edge design with large touch targets and native app feel
 *
 * Performance optimised:
 * - Uses useMultiFieldSync for debounced state commits (500ms)
 * - Wrapped with React.memo for selective re-rendering
 * - Only re-renders when CLIENT_SECTION_FIELDS change
 */
const ClientDetailsSectionInner = ({ formData, onUpdate }: ClientDetailsSectionProps) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const [clientType, setClientType] = useState<'new' | 'existing'>('new');

  // Extract only the fields this section cares about
  const initialFieldValues = useMemo(() => {
    const values: ClientSectionFields = {};
    for (const field of CLIENT_SECTION_FIELDS) {
      values[field] = formData[field] || '';
    }
    return values;
  }, [formData]);

  // Batch updates to parent with debounce
  const handleBatchUpdate = useCallback((updates: Partial<ClientSectionFields>) => {
    for (const [field, value] of Object.entries(updates)) {
      onUpdate(field, value);
    }
  }, [onUpdate]);

  // Local state with debounced commits - 500ms delay prevents keystroke lag
  const { values: localValues, setValue, setValues, flush } = useMultiFieldSync(
    initialFieldValues,
    handleBatchUpdate,
    500
  );

  // Helper to update a single field
  const handleFieldChange = useCallback((field: keyof ClientSectionFields, value: string) => {
    setValue(field, value);
  }, [setValue]);

  const handleSameAddressToggle = useCallback((checked: boolean) => {
    haptics.tap();
    const updates: Partial<ClientSectionFields> = {
      sameAsClientAddress: checked ? 'true' : 'false',
    };
    if (checked && localValues.clientAddress) {
      updates.installationAddress = localValues.clientAddress;
    }
    setValues(updates);
    flush(); // Immediately commit toggle changes
  }, [haptics, localValues.clientAddress, setValues, flush]);

  const handleSelectCustomer = useCallback((customer: Customer | null) => {
    if (customer) {
      haptics.success();
      const updates: Partial<ClientSectionFields> = {
        clientName: customer.name || '',
        clientEmail: customer.email || '',
        clientPhone: customer.phone || '',
        clientAddress: customer.address || '',
      };
      if (localValues.sameAsClientAddress === 'true' && customer.address) {
        updates.installationAddress = customer.address;
      }
      setValues(updates);
      flush(); // Immediately commit customer selection
    }
  }, [haptics, localValues.sameAsClientAddress, setValues, flush]);

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
        <SectionTitle icon={Users} title="Client Information" isMobile={isMobile} />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Client Name" required>
            <Input
              value={localValues.clientName || ''}
              onChange={(e) => handleFieldChange('clientName', e.target.value)}
              placeholder="Full name of person ordering work"
              className="h-11 text-base touch-manipulation"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Phone">
              <Input
                type="tel"
                value={localValues.clientPhone || ''}
                onChange={(e) => handleFieldChange('clientPhone', e.target.value)}
                placeholder="Contact number"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
            <FormField label="Email">
              <Input
                type="email"
                value={localValues.clientEmail || ''}
                onChange={(e) => handleFieldChange('clientEmail', e.target.value)}
                placeholder="Email address"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          </div>

          <FormField label="Client Address" required>
            <Textarea
              value={localValues.clientAddress || ''}
              onChange={(e) => handleFieldChange('clientAddress', e.target.value)}
              placeholder="Client's full postal address"
              className="min-h-[100px] text-base touch-manipulation resize-none"
            />
          </FormField>

          <FormField label="Occupier" >
            <Input
              value={localValues.occupier || ''}
              onChange={(e) => handleFieldChange('occupier', e.target.value)}
              placeholder="Name of occupier (if different from client)"
              className="h-11 text-base touch-manipulation"
            />
          </FormField>
        </div>
      </div>

      {/* Installation Details Section */}
      <div>
        <SectionTitle icon={Building2} title="Installation Details" isMobile={isMobile} />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          {/* Same Address Toggle */}
          <button
            type="button"
            onClick={() => handleSameAddressToggle(localValues.sameAsClientAddress !== 'true')}
            className={cn(
              "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all touch-manipulation",
              localValues.sameAsClientAddress === 'true'
                ? "border-elec-yellow bg-elec-yellow/10"
                : "border-border/30 bg-card/30"
            )}
          >
            <Checkbox
              checked={localValues.sameAsClientAddress === 'true'}
              className="h-5 w-5 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
            />
            <div className="flex-1 text-left">
              <span className="font-medium">Same as client address</span>
              <p className="text-xs text-muted-foreground mt-0.5">Use client address for installation</p>
            </div>
            <MapPin className={cn(
              "h-5 w-5",
              localValues.sameAsClientAddress === 'true' ? "text-elec-yellow" : "text-muted-foreground"
            )} />
          </button>

          {localValues.sameAsClientAddress !== 'true' && (
            <FormField label="Installation Address" required>
              <Textarea
                value={localValues.installationAddress || ''}
                onChange={(e) => handleFieldChange('installationAddress', e.target.value)}
                placeholder="Full address of the installation"
                className="min-h-[100px] text-base touch-manipulation resize-none"
              />
            </FormField>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Premises Type" required>
              <Select
                value={localValues.description || ''}
                onValueChange={(value) => { haptics.tap(); handleFieldChange('description', value); flush(); }}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {localValues.description === 'other' && (
                <Input
                  value={localValues.otherPremisesDescription || ''}
                  onChange={(e) => handleFieldChange('otherPremisesDescription', e.target.value)}
                  placeholder="Specify premises type"
                  className="mt-2 h-11 text-base touch-manipulation"
                />
              )}
            </FormField>

            <FormField label="Installation Type">
              <Select
                value={localValues.installationType || ''}
                onValueChange={(value) => { haptics.tap(); handleFieldChange('installationType', value); flush(); }}
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
        <SectionTitle icon={History} title="Installation History" isMobile={isMobile} />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Estimated Age">
            <div className="flex gap-2">
              <Input
                type="number"
                min="0"
                max="100"
                value={localValues.estimatedAge || ''}
                onChange={(e) => handleFieldChange('estimatedAge', e.target.value)}
                placeholder="0"
                className="flex-1 h-11 text-base touch-manipulation"
              />
              <Select
                value={localValues.ageUnit || 'years'}
                onValueChange={(value) => { handleFieldChange('ageUnit', value); flush(); }}
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
                    // Toggle off if already selected
                    if (localValues.lastInspectionType === option.value) {
                      setValues({ lastInspectionType: '', dateOfLastInspection: '' });
                    } else {
                      const updates: Partial<ClientSectionFields> = { lastInspectionType: option.value };
                      if (option.value !== 'known') updates.dateOfLastInspection = '';
                      setValues(updates);
                    }
                    flush(); // Immediately commit toggle changes
                  }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                    localValues.lastInspectionType === option.value
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {localValues.lastInspectionType === 'known' && (
              <Input
                type="date"
                value={localValues.dateOfLastInspection || ''}
                onChange={(e) => handleFieldChange('dateOfLastInspection', e.target.value)}
                onBlur={flush}
                className="mt-3 h-11 text-base touch-manipulation"
              />
            )}
          </FormField>

          <FormField label="Evidence of Alterations">
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
                { value: 'not-apparent', label: 'Not Apparent' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    // Toggle off if already selected
                    if (localValues.evidenceOfAlterations === option.value) {
                      setValues({ evidenceOfAlterations: '', alterationsDetails: '', alterationsAge: '' });
                    } else {
                      const updates: Partial<ClientSectionFields> = { evidenceOfAlterations: option.value };
                      if (option.value !== 'yes') {
                        updates.alterationsDetails = '';
                        updates.alterationsAge = '';
                      }
                      setValues(updates);
                    }
                    flush(); // Immediately commit toggle changes
                  }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                    localValues.evidenceOfAlterations === option.value
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {localValues.evidenceOfAlterations === 'yes' && (
              <>
                <Textarea
                  value={localValues.alterationsDetails || ''}
                  onChange={(e) => handleFieldChange('alterationsDetails', e.target.value)}
                  placeholder="Describe the alterations observed..."
                  className="mt-3 min-h-[80px] text-base touch-manipulation resize-none"
                />
                <FormField label="Estimated Age of Alterations (years)">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={localValues.alterationsAge || ''}
                    onChange={(e) => handleFieldChange('alterationsAge', e.target.value)}
                    placeholder="e.g., 5"
                    className="h-11 text-base touch-manipulation"
                  />
                </FormField>
              </>
            )}
          </FormField>

          <FormField label="Installation Records Available (Reg 651.1)">
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    handleFieldChange('installationRecordsAvailable', localValues.installationRecordsAvailable === option.value ? '' : option.value);
                    flush(); // Immediately commit toggle changes
                  }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation",
                    localValues.installationRecordsAvailable === option.value
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>
        </div>
      </div>
    </div>
  );
};

// Memoized component - only re-renders when CLIENT_SECTION_FIELDS change
const ClientDetailsSection = React.memo(ClientDetailsSectionInner, (prevProps, nextProps) => {
  // Compare only the fields this section cares about
  for (const field of CLIENT_SECTION_FIELDS) {
    if (prevProps.formData[field] !== nextProps.formData[field]) {
      return false; // Re-render needed
    }
  }
  // Also compare onUpdate reference
  return prevProps.onUpdate === nextProps.onUpdate;
});

ClientDetailsSection.displayName = 'ClientDetailsSection';

export default ClientDetailsSection;
