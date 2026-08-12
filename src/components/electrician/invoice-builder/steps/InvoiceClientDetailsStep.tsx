import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { UnifiedAddressFinder } from '@/components/ui/unified-address-finder';
import { QuoteClient, JobDetails } from '@/types/quote';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parse, isValid } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';
import { supabase } from '@/integrations/supabase/client';
import { inputCn, labelCn, cardCn } from '@/components/forms/fieldStyles';

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

  const [dateOpen, setDateOpen] = useState(false);
  const completionRaw = form.watch('workStartDate');
  const completionDate = completionRaw ? parse(completionRaw, 'yyyy-MM-dd', new Date()) : undefined;
  const completionValid = completionDate && isValid(completionDate) ? completionDate : undefined;

  /** Numbered eyebrow — matches the quote wizard steps */
  const SectionHeader = ({ n, title }: { n: string; title: string }) => (
    <div className="flex items-baseline gap-2 mb-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">{n}</span>
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">· {title}</span>
    </div>
  );

  return (
    <Form {...form}>
      {/* Two columns from lg up, mirroring the quote wizard's Client | Job
          pairing. The invoice merges client and job into one step, so the
          split happens between its sections instead of between panels. */}
      <div className="space-y-4 text-left lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">

        {/* Customer selector */}
        <section className={cardCn}>
          <SectionHeader n="01" title="Existing customer" />
          {selectedCustomer ? (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.05] border border-white/[0.12]">
              <div className="h-10 w-10 rounded-full bg-elec-yellow flex items-center justify-center flex-shrink-0">
                <span className="text-[13px] font-bold text-black">
                  {selectedCustomer.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-white truncate">{selectedCustomer.name}</p>
                <p className="text-[12px] text-white truncate">
                  {selectedCustomer.email || selectedCustomer.phone || 'No contact details'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearCustomer}
                className="h-11 px-3.5 rounded-lg text-[12px] font-medium text-white bg-white/[0.06] border border-white/[0.12] touch-manipulation active:brightness-125 transition-all flex-shrink-0"
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
        </section>

        {/* Client details */}
        <section className={cardCn}>
          <SectionHeader n="02" title="Client details" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="col-span-2">
                <label className={labelCn}>Client name <span className="text-elec-yellow">*</span></label>
                <FormControl>
                  <input {...field} placeholder="Full name" className={inputCn} autoComplete="name" />
                </FormControl>
                <FormMessage className="text-[12px] text-red-400" />
              </FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <label className={labelCn}>Phone</label>
                <FormControl>
                  <input {...field} type="tel" inputMode="tel" placeholder="Contact number" className={inputCn} autoComplete="tel" />
                </FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <label className={labelCn}>Email</label>
                <FormControl>
                  <input {...field} type="email" inputMode="email" placeholder="Email address" className={inputCn} autoComplete="email" />
                </FormControl>
                <FormMessage className="text-[12px] text-red-400" />
              </FormItem>
            )} />
          </div>
        </section>

        {/* Address */}
        <section className={cardCn}>
          <SectionHeader n="03" title="Job site address" />
          <div className="lg:max-w-2xl">
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
        </section>

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
        <section className={cardCn}>
          <SectionHeader n="04" title="Job details" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
              <FormField control={form.control} name="jobTitle" render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <label className={labelCn}>Job title <span className="text-elec-yellow">*</span></label>
                  <FormControl>
                    <input {...field} placeholder="e.g. Consumer Unit Replacement" className={inputCn} />
                  </FormControl>
                  <FormMessage className="text-[12px] text-red-400" />
                </FormItem>
              )} />
              <FormField control={form.control} name="workStartDate" render={({ field }) => (
                <FormItem>
                  <label className={labelCn}>Work completion date</label>
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        // Empty state reads as a placeholder, so it uses the
                        // kit's placeholder shade rather than an arbitrary one.
                        className={cn(
                          inputCn,
                          'flex items-center justify-between text-left',
                          !completionValid && 'text-white/25'
                        )}
                      >
                        {completionValid ? format(completionValid, 'EEE d MMM yyyy') : 'Pick a date'}
                        <CalendarIcon className="h-4 w-4 text-white flex-shrink-0 ml-2" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0 z-[100] bg-elec-gray border-white/10">
                      <Calendar
                        mode="single"
                        selected={completionValid}
                        onSelect={(date) => {
                          field.onChange(date ? format(date, 'yyyy-MM-dd') : '');
                          setDateOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="jobDescription" render={({ field }) => (
              <FormItem>
                <label className={labelCn}>Description</label>
                <FormControl>
                  <textarea {...field} placeholder="Describe the work completed — your client reads this on the invoice" className={`${inputCn} min-h-[100px] resize-none py-3`} rows={4} />
                </FormControl>
              </FormItem>
            )} />
          </div>
        </section>
      </div>
    </Form>
  );
};
