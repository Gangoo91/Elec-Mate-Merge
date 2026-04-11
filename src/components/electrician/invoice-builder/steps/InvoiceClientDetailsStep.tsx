import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { UnifiedAddressFinder } from '@/components/ui/unified-address-finder';
import { QuoteClient, JobDetails } from '@/types/quote';
import { X } from 'lucide-react';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';
import { supabase } from '@/integrations/supabase/client';

const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  email: z.union([z.string().email('Please enter a valid email address'), z.literal(''), z.undefined()]).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  postcode: z.string().optional(),
  jobTitle: z.string().min(1, 'Job title is required'),
  jobDescription: z.string().optional(),
  jobLocation: z.string().optional(),
  workStartDate: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface InvoiceClientDetailsStepProps {
  initialData?: {
    client?: QuoteClient;
    jobDetails?: JobDetails;
  };
  onUpdate: (client: QuoteClient, jobDetails: JobDetails) => void;
  invoiceId?: string;
}

/** Extract UK postcode from an address string */
const extractPostcode = (address: string): { address: string; postcode: string } => {
  const postcodeRegex = /\b([A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2})\b/i;
  const match = address.match(postcodeRegex);
  if (match) {
    const postcode = match[1].toUpperCase().replace(/\s+/, ' ');
    const cleanAddress = address.replace(postcodeRegex, '').replace(/,\s*$/, '').trim();
    return { address: cleanAddress, postcode };
  }
  return { address: address.trim(), postcode: '' };
};

export const InvoiceClientDetailsStep = ({
  initialData,
  onUpdate,
  invoiceId,
}: InvoiceClientDetailsStepProps) => {
  const [customerId, setCustomerId] = useState<string | undefined>(initialData?.client?.customerId);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [savePromptDismissed, setSavePromptDismissed] = useState(false);
  const [addressKey, setAddressKey] = useState(0); // Force UnifiedAddressFinder remount on customer select

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: initialData?.client?.name || '',
      email: initialData?.client?.email || '',
      phone: initialData?.client?.phone || '',
      address: initialData?.client?.address || '',
      postcode: initialData?.client?.postcode || '',
      jobTitle: initialData?.jobDetails?.title || '',
      jobDescription: initialData?.jobDetails?.description || '',
      jobLocation: initialData?.jobDetails?.location || '',
      workStartDate: initialData?.jobDetails?.workStartDate || '',
    },
  });

  const handleAddressSelect = (address: string, postcode: string) => {
    form.setValue('address', address);
    form.setValue('postcode', postcode);
  };

  const handleCustomerSelect = (customer: Customer | null) => {
    if (customer) {
      setSelectedCustomer(customer);
      setCustomerId(customer.id);

      // Parse postcode from address string if stored together
      const { address, postcode } = extractPostcode(customer.address || '');

      form.setValue('name', customer.name);
      form.setValue('email', customer.email || '');
      form.setValue('phone', customer.phone || '');
      form.setValue('address', address || customer.address || '');
      form.setValue('postcode', postcode);

      // Force UnifiedAddressFinder to remount with the new address
      setAddressKey(k => k + 1);
      setShowSavePrompt(false);
      setSavePromptDismissed(true);
    } else {
      setSelectedCustomer(null);
      setCustomerId(undefined);
    }
  };

  const handleClearCustomer = () => {
    setSelectedCustomer(null);
    setCustomerId(undefined);
    setSavePromptDismissed(false);
    form.setValue('name', '');
    form.setValue('email', '');
    form.setValue('phone', '');
    form.setValue('address', '');
    form.setValue('postcode', '');
    setAddressKey(k => k + 1);
  };

  const handleCustomerSaved = async (savedCustomerId: string) => {
    setCustomerId(savedCustomerId);
    setShowSavePrompt(false);
    if (invoiceId) {
      await supabase.from('quotes').update({ customer_id: savedCustomerId }).eq('id', invoiceId);
    }
  };

  // Watch form changes and update parent
  useEffect(() => {
    const subscription = form.watch((value) => {
      const client: QuoteClient = {
        name: value.name || '',
        email: value.email || '',
        phone: value.phone || '',
        address: value.address || '',
        postcode: value.postcode || '',
        customerId,
      };
      const jobDetails: JobDetails = {
        title: value.jobTitle || '',
        description: value.jobDescription,
        location: value.jobLocation,
        workStartDate: value.workStartDate,
      };
      onUpdate(client, jobDetails);

      // Show save prompt if details complete but no customer linked (and not already selected one)
      if (!customerId && !savePromptDismissed && !selectedCustomer && value.name?.trim()) {
        setShowSavePrompt(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate, customerId, savePromptDismissed]);

  const inputClass =
    'w-full h-11 px-3 rounded-lg text-[15px] text-white bg-white/[0.06] border border-white/[0.12] focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20 outline-none touch-manipulation placeholder:text-white/60';

  /** Section label with gold gradient */
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-3">
      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
      <h2 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h2>
    </div>
  );

  return (
    <Form {...form}>
      <div className="space-y-6 text-left">

        {/* Customer selector */}
        <div>
          <SectionHeader title="Select Existing Customer" />
          {selectedCustomer ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-emerald-500/20">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-white">{selectedCustomer.name}</p>
                <p className="text-[12px] text-white truncate">
                  {selectedCustomer.email || selectedCustomer.phone || 'No contact details'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearCustomer}
                className="text-[11px] font-medium text-red-400 touch-manipulation ml-3 flex-shrink-0"
              >
                Clear
              </button>
            </div>
          ) : (
            <ClientSelector
              onSelectCustomer={handleCustomerSelect}
              selectedCustomerId={customerId}
            />
          )}
        </div>

        {/* Client details */}
        <div>
          <SectionHeader title="Client Details" />
          <div className="space-y-3">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <label className="text-[11px] text-white uppercase tracking-wider mb-1.5 block">Client Name *</label>
                <FormControl>
                  <input {...field} placeholder="Full name" className={inputClass} autoComplete="name" />
                </FormControl>
                <FormMessage className="text-[12px] text-red-400" />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <label className="text-[11px] text-white uppercase tracking-wider mb-1.5 block">Phone</label>
                  <FormControl>
                    <input {...field} type="tel" inputMode="tel" placeholder="07xxx xxxxxx" className={inputClass} autoComplete="tel" />
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <label className="text-[11px] text-white uppercase tracking-wider mb-1.5 block">Email</label>
                  <FormControl>
                    <input {...field} type="email" inputMode="email" placeholder="client@example.com" className={inputClass} autoComplete="email" />
                  </FormControl>
                  <FormMessage className="text-[12px] text-red-400" />
                </FormItem>
              )} />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <SectionHeader title="Job Site Address" />
          <UnifiedAddressFinder
            key={addressKey}
            onAddressSelect={handleAddressSelect}
            defaultValue={
              form.watch('address')
                ? `${form.watch('address')}${form.watch('postcode') ? ', ' + form.watch('postcode') : ''}`
                : ''
            }
          />
        </div>

        {/* Save customer prompt */}
        {showSavePrompt && !customerId && (
          <SaveCustomerPrompt
            client={{
              name: form.watch('name'),
              email: form.watch('email') || undefined,
              phone: form.watch('phone') || undefined,
              address: `${form.watch('address')}${form.watch('postcode') ? ', ' + form.watch('postcode') : ''}`,
            }}
            onSaved={handleCustomerSaved}
            onDismiss={() => { setShowSavePrompt(false); setSavePromptDismissed(true); }}
          />
        )}

        {/* Job Details */}
        <div>
          <SectionHeader title="Job Details" />
          <div className="space-y-3">
            <FormField control={form.control} name="jobTitle" render={({ field }) => (
              <FormItem>
                <label className="text-[11px] text-white uppercase tracking-wider mb-1.5 block">Job Title *</label>
                <FormControl>
                  <input {...field} placeholder="e.g., Consumer Unit Replacement" className={inputClass} />
                </FormControl>
                <FormMessage className="text-[12px] text-red-400" />
              </FormItem>
            )} />
            <FormField control={form.control} name="jobDescription" render={({ field }) => (
              <FormItem>
                <label className="text-[11px] text-white uppercase tracking-wider mb-1.5 block">Description</label>
                <FormControl>
                  <textarea {...field} placeholder="Describe the work completed..." className={`${inputClass} min-h-[80px] resize-none`} rows={3} />
                </FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="workStartDate" render={({ field }) => (
              <FormItem>
                <label className="text-[11px] text-white uppercase tracking-wider mb-1.5 block">Work Completion Date</label>
                <FormControl>
                  <input {...field} type="date" style={{ colorScheme: 'dark' }} className={inputClass} />
                </FormControl>
              </FormItem>
            )} />
          </div>
        </div>
      </div>
    </Form>
  );
};
