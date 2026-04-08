import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, X } from 'lucide-react';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
    {children}
  </div>
);

interface EICClientDetailsSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const EICClientDetailsSection = ({
  formData,
  onUpdate,
}: EICClientDetailsSectionProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [savePromptDismissed, setSavePromptDismissed] = useState(false);

  const handleCustomerSelect = (customer: Customer | null) => {
    if (customer) {
      setSelectedCustomer(customer);
      onUpdate('customerId', customer.id);
      onUpdate('clientName', customer.name);
      if (customer.phone) onUpdate('clientPhone', customer.phone);
      if (customer.email) onUpdate('clientEmail', customer.email);
      if (customer.address) onUpdate('clientAddress', customer.address);
      setShowSavePrompt(false);
      setSavePromptDismissed(true);
    } else {
      setSelectedCustomer(null);
      onUpdate('customerId', '');
    }
  };

  const handleClearCustomer = () => {
    setSelectedCustomer(null);
    onUpdate('customerId', '');
    setSavePromptDismissed(false);
  };

  const handleCustomerSaved = (savedCustomerId: string) => {
    setShowSavePrompt(false);
    onUpdate('customerId', savedCustomerId);
  };

  const handleSameAddressToggle = (checked: boolean) => {
    if (checked && formData.clientAddress) {
      onUpdate('installationAddress', formData.clientAddress);
    }
    onUpdate('sameAsClientAddress', checked ? 'true' : 'false');
  };

  return (
    <div className="space-y-4">
      {/* Certificate Details */}
      <SectionTitle title="Certificate Details" />
      <FormField label="Certificate Number">
        <Input
          id="certificateNumber"
          value={formData.certificateNumber || ''}
          readOnly
          className="bg-white/[0.06] border-white/[0.08] cursor-not-allowed font-mono text-foreground"
          tabIndex={-1}
        />
        <p className="text-xs text-white mt-1">Auto-generated and cannot be changed</p>
      </FormField>

      {/* Client Information */}
      <SectionTitle title="Client Information" />

      {/* Customer Selector */}
      <FormField label="Select Existing Customer">
        {selectedCustomer ? (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-emerald-400">
                {selectedCustomer.name}
              </p>
              <p className="text-xs text-white truncate">
                {selectedCustomer.email || selectedCustomer.phone || ''}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearCustomer}
              className="p-2 rounded-lg hover:bg-white/5 touch-manipulation"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        ) : (
          <ClientSelector
            onSelectCustomer={handleCustomerSelect}
            selectedCustomerId={formData.customerId}
          />
        )}
      </FormField>

      <FormField label="Client Name" required>
        <Input
          id="clientName"
          value={formData.clientName || ''}
          onChange={(e) => onUpdate('clientName', e.target.value)}
          placeholder="Full name of person ordering work"
          className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Client Phone">
          <Input
            id="clientPhone"
            type="tel"
            value={formData.clientPhone || ''}
            onChange={(e) => onUpdate('clientPhone', e.target.value)}
            placeholder="Contact telephone number"
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
          />
        </FormField>
        <FormField label="Client Email">
          <Input
            id="clientEmail"
            type="email"
            value={formData.clientEmail || ''}
            onChange={(e) => onUpdate('clientEmail', e.target.value)}
            placeholder="Email address for correspondence"
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
          />
        </FormField>
      </div>

      <FormField label="Client Address" required>
        <Textarea
          id="clientAddress"
          value={formData.clientAddress || ''}
          onChange={(e) => onUpdate('clientAddress', e.target.value)}
          placeholder="Client's full postal address"
          rows={3}
          className="text-base touch-manipulation min-h-[120px] bg-white/[0.06] border-white/[0.08]"
        />
      </FormField>

      {/* Save Customer Prompt */}
      {!formData.customerId &&
        formData.clientName?.trim() &&
        !selectedCustomer &&
        !savePromptDismissed && (
          <SaveCustomerPrompt
            client={{
              name: formData.clientName,
              email: formData.clientEmail || undefined,
              phone: formData.clientPhone || undefined,
              address: formData.clientAddress || undefined,
            }}
            onSaved={handleCustomerSaved}
            onDismiss={() => setSavePromptDismissed(true)}
          />
        )}

      {/* Installation Details */}
      <SectionTitle title="Installation Details" />

      <div className="flex items-start gap-3 p-4 bg-white/[0.03] border border-white/[0.06] rounded-lg">
        <Checkbox
          id="sameAsClientAddress"
          checked={formData.sameAsClientAddress === 'true'}
          onCheckedChange={handleSameAddressToggle}
        />
        <Label
          htmlFor="sameAsClientAddress"
          className="text-base font-medium cursor-pointer leading-relaxed"
        >
          Installation address is the same as client address
        </Label>
      </div>

      <FormField label="Installation Address" required>
        <Textarea
          id="installationAddress"
          value={formData.installationAddress || ''}
          onChange={(e) => onUpdate('installationAddress', e.target.value)}
          placeholder="Full address of the installation"
          rows={3}
          disabled={formData.sameAsClientAddress === 'true'}
          className="text-base touch-manipulation min-h-[120px] bg-white/[0.06] border-white/[0.08]"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Description of Work" required>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => onUpdate('description', e.target.value)}
            placeholder="Describe the electrical installation or work carried out"
            rows={3}
            className="text-base touch-manipulation min-h-[120px] bg-white/[0.06] border-white/[0.08]"
          />
        </FormField>
        <FormField label="Installation Type">
          <Select
            value={formData.installationType || ''}
            onValueChange={(value) => onUpdate('installationType', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select installation type" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
              <SelectItem value="domestic">Domestic</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      {/* Installation Dates */}
      <SectionTitle title="Installation Dates" />

      <div className="grid grid-cols-3 gap-2 items-end">
        <FormField label="Date of Installation" required>
          <Input
            id="installationDate"
            type="date"
            value={formData.installationDate || ''}
            onChange={(e) => onUpdate('installationDate', e.target.value)}
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
          />
        </FormField>
        <FormField label="Date of Construction">
          <Input
            id="constructionDate"
            type="date"
            value={formData.constructionDate || ''}
            onChange={(e) => onUpdate('constructionDate', e.target.value)}
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
          />
        </FormField>
        <FormField label="Date of Testing">
          <Input
            id="testDate"
            type="date"
            value={formData.testDate || ''}
            onChange={(e) => onUpdate('testDate', e.target.value)}
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
          />
        </FormField>
      </div>
    </div>
  );
};

export default EICClientDetailsSection;
