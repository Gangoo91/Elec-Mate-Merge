import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { UnifiedAddressFinder } from '@/components/ui/unified-address-finder';
import { QuoteClient, JobDetails } from '@/types/quote';
import { User, Mail, Phone, MapPin, Briefcase, FileText, Calendar, Users, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
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

      // Show save prompt if details complete but no customer linked
      if (!customerId && !savePromptDismissed && value.name?.trim()) {
        setShowSavePrompt(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate, customerId, savePromptDismissed]);

  const inputClassName =
    'w-full h-8 bg-transparent border-0 outline-none text-[16px] font-medium text-white placeholder:text-white caret-elec-yellow';
  const darkStyle: React.CSSProperties = { colorScheme: 'dark' };

  return (
    <Form {...form}>
      <div className="space-y-5 text-left pb-24">

        {/* Saved Client Selector */}
        <div className="space-y-2">
          <p className="text-[13px] font-medium text-white uppercase tracking-wider flex items-center gap-2">
            <Users className="h-3.5 w-3.5" />
            Select Existing Client
          </p>

          {selectedCustomer ? (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-white truncate">{selectedCustomer.name}</p>
                <p className="text-[12px] text-white/50 truncate">{selectedCustomer.email || selectedCustomer.phone || 'No contact details'}</p>
              </div>
              <button
                type="button"
                onClick={handleClearCustomer}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"
              >
                <X className="h-4 w-4 text-white/60" />
              </button>
            </div>
          ) : (
            <ClientSelector
              onSelectCustomer={handleCustomerSelect}
              selectedCustomerId={customerId}
            />
          )}
        </div>

        {/* Client Information */}
        <div>
          <p className="text-[13px] font-medium text-white uppercase tracking-wider mb-3">
            Client Information
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {/* Name */}
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="m-0 p-0 space-y-0">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <label className="text-[12px] text-white block mb-0.5">Client Name *</label>
                    <FormControl>
                      <input {...field} style={darkStyle} placeholder="Enter client name" className={inputClassName} autoComplete="name" />
                    </FormControl>
                  </div>
                </div>
                <FormMessage className="px-4 pb-3 text-[12px] text-red-400" />
              </FormItem>
            )} />

            {/* Email */}
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem className="m-0 p-0 space-y-0">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <label className="text-[12px] text-white block mb-0.5">Email Address (optional)</label>
                    <FormControl>
                      <input {...field} type="email" inputMode="email" style={darkStyle} placeholder="client@example.com" className={inputClassName} autoComplete="email" />
                    </FormControl>
                  </div>
                </div>
                <FormMessage className="px-4 pb-3 text-[12px] text-red-400" />
              </FormItem>
            )} />

            {/* Phone */}
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem className="m-0 p-0 space-y-0">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <label className="text-[12px] text-white block mb-0.5">Phone Number (optional)</label>
                    <FormControl>
                      <input {...field} type="tel" inputMode="tel" style={darkStyle} placeholder="07xxx xxxxxx" className={inputClassName} autoComplete="tel" />
                    </FormControl>
                  </div>
                </div>
                <FormMessage className="px-4 pb-3 text-[12px] text-red-400" />
              </FormItem>
            )} />
          </div>
        </div>

        {/* Address */}
        <div>
          <p className="text-[13px] font-medium text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            Job Site Address (optional)
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
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
          <p className="text-[13px] font-medium text-white uppercase tracking-wider mb-3">
            Job Details
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {/* Job Title */}
            <FormField control={form.control} name="jobTitle" render={({ field }) => (
              <FormItem className="m-0 p-0 space-y-0">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <label className="text-[12px] text-white block mb-0.5">Job Title *</label>
                    <FormControl>
                      <input {...field} style={darkStyle} placeholder="e.g., Consumer Unit Replacement" className={inputClassName} />
                    </FormControl>
                  </div>
                </div>
                <FormMessage className="px-4 pb-3 text-[12px] text-red-400" />
              </FormItem>
            )} />

            {/* Job Description */}
            <FormField control={form.control} name="jobDescription" render={({ field }) => (
              <FormItem className="m-0 p-0 space-y-0">
                <div className="flex items-start gap-3 p-4">
                  <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <label className="text-[12px] text-white block mb-0.5">Description</label>
                    <FormControl>
                      <textarea {...field} style={darkStyle} placeholder="Describe the work completed..." className={cn(inputClassName, 'min-h-[80px] resize-none')} rows={3} />
                    </FormControl>
                  </div>
                </div>
              </FormItem>
            )} />

            {/* Work Completion Date */}
            <FormField control={form.control} name="workStartDate" render={({ field }) => (
              <FormItem className="m-0 p-0 space-y-0">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <label className="text-[12px] text-white block mb-0.5">Work Completion Date</label>
                    <FormControl>
                      <input {...field} type="date" style={darkStyle} className={cn(inputClassName, 'appearance-none')} />
                    </FormControl>
                  </div>
                </div>
              </FormItem>
            )} />
          </div>
        </div>
      </div>
    </Form>
  );
};
