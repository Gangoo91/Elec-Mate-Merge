import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { UnifiedAddressFinder } from '@/components/ui/unified-address-finder';
import { QuoteClient } from '@/types/quote';
import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';
import { supabase } from '@/integrations/supabase/client';

const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  email: z
    .union([z.string().email('Please enter a valid email address'), z.literal(''), z.undefined()])
    .optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  postcode: z.string().optional(),
});

interface ClientDetailsStepProps {
  client?: QuoteClient;
  onUpdate: (client: QuoteClient) => void;
  quoteId?: string;
}

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

/** Section header with gradient line — matches certificate form pattern */
const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h2>
  </div>
);

const inputClass =
  'w-full h-11 px-3 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/20 outline-none touch-manipulation placeholder:text-white';

export const ClientDetailsStep = ({ client, onUpdate, quoteId }: ClientDetailsStepProps) => {
  const [customerId, setCustomerId] = useState<string | undefined>(client?.customerId);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [savePromptDismissed, setSavePromptDismissed] = useState(false);
  const [addressKey, setAddressKey] = useState(0);
  const [previousQuotes, setPreviousQuotes] = useState<{ id: string; quote_number: string; total: number; status: string; created_at: string }[]>([]);

  // Fetch previous quotes when customer is selected
  const fetchPreviousQuotes = useCallback(async (custId: string) => {
    const { data } = await supabase
      .from('quotes')
      .select('id, quote_number, total, status, created_at')
      .eq('customer_id', custId)
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setPreviousQuotes(data);
  }, []);

  useEffect(() => {
    if (customerId) fetchPreviousQuotes(customerId);
    else setPreviousQuotes([]);
  }, [customerId, fetchPreviousQuotes]);

  const form = useForm<QuoteClient>({
    resolver: zodResolver(clientSchema),
    defaultValues: client || { name: '', email: '', phone: '', address: '', postcode: '' },
  });

  const handleAddressSelect = (address: string, postcode: string) => {
    form.setValue('address', address);
    form.setValue('postcode', postcode);
  };

  const handleCustomerSelect = (customer: Customer | null) => {
    if (customer) {
      setSelectedCustomer(customer);
      setCustomerId(customer.id);
      const { address, postcode } = extractPostcode(customer.address || '');
      form.setValue('name', customer.name);
      form.setValue('email', customer.email || '');
      form.setValue('phone', customer.phone || '');
      form.setValue('address', address || customer.address || '');
      form.setValue('postcode', postcode);
      setAddressKey((k) => k + 1);
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
    setAddressKey((k) => k + 1);
  };

  const handleCustomerSaved = async (savedCustomerId: string) => {
    setCustomerId(savedCustomerId);
    setShowSavePrompt(false);
    if (quoteId) {
      await supabase.from('quotes').update({ customer_id: savedCustomerId }).eq('id', quoteId);
    }
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      onUpdate({ ...(value as QuoteClient), customerId });
      if (value.name?.trim() && !customerId && !savePromptDismissed) {
        setShowSavePrompt(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate, customerId, savePromptDismissed]);

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
          {/* Previous quotes for this client */}
          {previousQuotes.length > 0 && (
            <div className="mt-3">
              <p className="text-[11px] text-white font-medium mb-2">Previous Quotes</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-3 px-3 pb-1">
                {previousQuotes.map((pq) => (
                  <div key={pq.id} className="flex-shrink-0 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <p className="text-[12px] font-medium text-white">{pq.quote_number}</p>
                    <p className="text-[11px] text-elec-yellow font-bold">£{pq.total?.toFixed(2)}</p>
                    <p className="text-[10px] text-white">{pq.status} · {new Date(pq.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Client information */}
        <div>
          <SectionHeader title="Client Details" />
          <div className="space-y-3">
            {/* Name — full width */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <label className="text-white text-xs font-medium mb-1.5 block">Client Name *</label>
                  <FormControl>
                    <input {...field} placeholder="Full name" className={inputClass} autoComplete="name" />
                  </FormControl>
                  <FormMessage className="text-[12px] text-red-400" />
                </FormItem>
              )}
            />
            {/* Phone + Email — side by side */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-white text-xs font-medium mb-1.5 block">Phone</label>
                    <FormControl>
                      <input {...field} type="tel" inputMode="tel" placeholder="Contact number" className={inputClass} autoComplete="tel" />
                    </FormControl>
                    <FormMessage className="text-[12px] text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-white text-xs font-medium mb-1.5 block">Email</label>
                    <FormControl>
                      <input {...field} type="email" inputMode="email" placeholder="Email address" className={inputClass} autoComplete="email" />
                    </FormControl>
                    <FormMessage className="text-[12px] text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <SectionHeader title="Job Site Address (optional)" />
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
        {showSavePrompt && !customerId && form.watch('name')?.trim() && (
          <SaveCustomerPrompt
            client={{
              name: form.watch('name'),
              email: form.watch('email'),
              phone: form.watch('phone'),
              address: form.watch('address'),
            }}
            onSaved={handleCustomerSaved}
            onDismiss={() => {
              setShowSavePrompt(false);
              setSavePromptDismissed(true);
            }}
          />
        )}
      </div>
    </Form>
  );
};
