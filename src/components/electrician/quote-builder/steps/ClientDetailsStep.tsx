import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { UnifiedAddressFinder } from '@/components/ui/unified-address-finder';
import { QuoteClient } from '@/types/quote';
import { useEffect, useState } from 'react';
import { User, MapPin, Mail, Phone, Users, Check, X } from 'lucide-react';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';
import { supabase } from '@/integrations/supabase/client';

const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  email: z.union([z.string().email('Please enter a valid email address'), z.literal(''), z.undefined()]).optional(),
  phone: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  postcode: z.string().min(1, 'Postcode is required'),
});

interface ClientDetailsStepProps {
  client?: QuoteClient;
  onUpdate: (client: QuoteClient) => void;
  quoteId?: string;
}

/** Extract UK postcode from a combined address string */
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

export const ClientDetailsStep = ({ client, onUpdate, quoteId }: ClientDetailsStepProps) => {
  const [customerId, setCustomerId] = useState<string | undefined>(client?.customerId);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [savePromptDismissed, setSavePromptDismissed] = useState(false);
  const [addressKey, setAddressKey] = useState(0);

  const form = useForm<QuoteClient>({
    resolver: zodResolver(clientSchema),
    defaultValues: client || {
      name: '',
      email: '',
      phone: '',
      address: '',
      postcode: '',
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
      const { address, postcode } = extractPostcode(customer.address || '');
      form.setValue('name', customer.name);
      form.setValue('email', customer.email || '');
      form.setValue('phone', customer.phone || '');
      form.setValue('address', address || customer.address || '');
      form.setValue('postcode', postcode);
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
    if (quoteId) {
      await supabase.from('quotes').update({ customer_id: savedCustomerId }).eq('id', quoteId);
    }
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      // Always propagate form state to parent — email and phone are optional
      onUpdate({ ...(value as QuoteClient), customerId });

      // Show save prompt once required fields are filled but no customer is linked
      if (value.name && value.address && value.postcode && !customerId && !savePromptDismissed && value.name.trim()) {
        setShowSavePrompt(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate, customerId, savePromptDismissed]);

  const inputClassName =
    'w-full h-8 bg-transparent border-0 outline-none text-[16px] font-medium text-white placeholder:text-white caret-elec-yellow';
  const darkStyle: React.CSSProperties = {
    colorScheme: 'dark',
  };

  return (
    <Form {...form}>
      <div className="space-y-4 text-left">
        {/* Customer Selector */}
        <div className="space-y-2">
          <p className="text-[13px] font-medium text-white uppercase tracking-wider flex items-center gap-2">
            <Users className="h-3.5 w-3.5" />
            Select Existing Customer
          </p>

          {selectedCustomer ? (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-emerald-400">{selectedCustomer.name}</p>
                <p className="text-[13px] text-white truncate">
                  {selectedCustomer.email || selectedCustomer.phone || 'No contact details'}
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
              selectedCustomerId={customerId}
            />
          )}
        </div>

        {/* Client Information Section */}
        <div>
          <p className="text-[13px] font-medium text-white uppercase tracking-wider mb-3">
            Client Information
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {/* Client Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="m-0 p-0 space-y-0">
                  <div className="flex items-center gap-3 p-4">
                    <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <label className="text-[12px] text-white block mb-0.5">Client Name *</label>
                      <FormControl>
                        <input
                          {...field}
                          style={darkStyle}
                          placeholder="Enter client name"
                          className={inputClassName}
                          autoComplete="name"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage className="px-4 pb-3 text-[12px] text-red-400" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="m-0 p-0 space-y-0">
                  <div className="flex items-center gap-3 p-4">
                    <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <label className="text-[12px] text-white block mb-0.5">Email Address (optional)</label>
                      <FormControl>
                        <input
                          {...field}
                          type="email"
                          inputMode="email"
                          style={darkStyle}
                          placeholder="client@example.com"
                          className={inputClassName}
                          autoComplete="email"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage className="px-4 pb-3 text-[12px] text-red-400" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="m-0 p-0 space-y-0">
                  <div className="flex items-center gap-3 p-4">
                    <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <label className="text-[12px] text-white block mb-0.5">Phone Number (optional)</label>
                      <FormControl>
                        <input
                          {...field}
                          type="tel"
                          inputMode="tel"
                          style={darkStyle}
                          placeholder="07xxx xxxxxx"
                          className={inputClassName}
                          autoComplete="tel"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage className="px-4 pb-3 text-[12px] text-red-400" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Address Section */}
        <div>
          <p className="text-[13px] font-medium text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            Job Site Address
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
            <UnifiedAddressFinder
              key={addressKey}
              onAddressSelect={handleAddressSelect}
              defaultValue={
                form.watch('address') ? `${form.watch('address')}${form.watch('postcode') ? ', ' + form.watch('postcode') : ''}` : ''
              }
            />
          </div>
        </div>

        {/* Save Customer Prompt */}
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
