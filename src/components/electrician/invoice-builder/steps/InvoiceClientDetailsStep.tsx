import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { UnifiedAddressFinder } from '@/components/ui/unified-address-finder';
import { QuoteClient, JobDetails } from '@/types/quote';
import { useEffect, useState } from 'react';
import { Clock, User, Mail, Phone, MapPin, Briefcase, FileText, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  postcode: z.string().min(1, 'Postcode is required'),
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
}

export const InvoiceClientDetailsStep = ({ initialData, onUpdate }: InvoiceClientDetailsStepProps) => {
  const [recentClients, setRecentClients] = useState<QuoteClient[]>([]);

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

  // Load recent clients from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentClients');
    if (saved) {
      setRecentClients(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  const handleAddressSelect = (address: string, postcode: string) => {
    form.setValue('address', address);
    form.setValue('postcode', postcode);
  };

  const handleUseRecentClient = (recentClient: QuoteClient) => {
    form.setValue('name', recentClient.name);
    form.setValue('email', recentClient.email);
    form.setValue('phone', recentClient.phone);
    form.setValue('address', recentClient.address);
    form.setValue('postcode', recentClient.postcode);
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
      };

      const jobDetails: JobDetails = {
        title: value.jobTitle || '',
        description: value.jobDescription,
        location: value.jobLocation,
        workStartDate: value.workStartDate,
      };

      onUpdate(client, jobDetails);

      // Save to recent clients when complete
      if (value.name && value.email && value.phone && value.address && value.postcode) {
        const saved = localStorage.getItem('recentClients');
        const recent: QuoteClient[] = saved ? JSON.parse(saved) : [];
        const updated = [client, ...recent.filter((c) => c.email !== value.email)].slice(0, 5);
        localStorage.setItem('recentClients', JSON.stringify(updated));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  // Clean inline input style for seamless look
  const inputClassName = 'w-full h-8 bg-transparent border-0 outline-none text-[16px] font-medium text-white placeholder:text-white/50 caret-elec-yellow';

  return (
    <Form {...form}>
      <div className="space-y-5 text-left pb-24">
        {/* Recent Clients - Horizontal scroll chips */}
        {recentClients.length > 0 && (
          <div className="space-y-2">
            <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              Recent Clients
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {recentClients.map((recentClient, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleUseRecentClient(recentClient)}
                  className={cn(
                    'shrink-0 px-4 py-2.5 rounded-xl transition-all touch-manipulation active:scale-[0.98]',
                    'bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.06]',
                    'text-[14px] font-medium text-white whitespace-nowrap'
                  )}
                >
                  {recentClient.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Client Information Section */}
        <div>
          <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider mb-3">
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
                      <label className="text-[12px] text-white block mb-0.5">Email Address *</label>
                      <FormControl>
                        <input
                          {...field}
                          type="email"
                          inputMode="email"
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
                      <label className="text-[12px] text-white block mb-0.5">Phone Number *</label>
                      <FormControl>
                        <input
                          {...field}
                          type="tel"
                          inputMode="tel"
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
          <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider mb-3 flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            Job Site Address
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
            <UnifiedAddressFinder
              onAddressSelect={handleAddressSelect}
              defaultValue={form.watch('address') ? `${form.watch('address')}, ${form.watch('postcode')}` : ''}
            />
          </div>
        </div>

        {/* Job Details Section */}
        <div>
          <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider mb-3">
            Job Details
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {/* Job Title */}
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem className="m-0 p-0 space-y-0">
                  <div className="flex items-center gap-3 p-4">
                    <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <label className="text-[12px] text-white block mb-0.5">Job Title *</label>
                      <FormControl>
                        <input
                          {...field}
                          placeholder="e.g., Consumer Unit Replacement"
                          className={inputClassName}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage className="px-4 pb-3 text-[12px] text-red-400" />
                </FormItem>
              )}
            />

            {/* Job Description */}
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem className="m-0 p-0 space-y-0">
                  <div className="flex items-start gap-3 p-4">
                    <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <label className="text-[12px] text-white block mb-0.5">Description</label>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="Describe the work completed..."
                          className={cn(inputClassName, 'min-h-[80px] resize-none')}
                          rows={3}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage className="px-4 pb-3 text-[12px] text-red-400" />
                </FormItem>
              )}
            />

            {/* Work Completion Date */}
            <FormField
              control={form.control}
              name="workStartDate"
              render={({ field }) => (
                <FormItem className="m-0 p-0 space-y-0">
                  <div className="flex items-center gap-3 p-4">
                    <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <label className="text-[12px] text-white block mb-0.5">Work Completion Date</label>
                      <FormControl>
                        <input
                          {...field}
                          type="date"
                          className={cn(inputClassName, 'appearance-none')}
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
      </div>
    </Form>
  );
};
