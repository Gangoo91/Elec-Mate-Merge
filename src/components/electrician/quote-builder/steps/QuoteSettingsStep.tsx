import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { QuoteSettings } from '@/types/quote';
import { useEffect } from 'react';
import { Settings, Receipt, List, Percent, BadgePercent, PoundSterling } from 'lucide-react';
import { cn } from '@/lib/utils';

const settingsSchema = z.object({
  vatRate: z.number().min(0).max(100, 'VAT rate must be between 0-100%'),
  vatRegistered: z.boolean(),
  showMaterialsBreakdown: z.boolean().optional(),
  discountEnabled: z.boolean().optional(),
  discountType: z.enum(['percentage', 'fixed']).optional(),
  discountValue: z.number().min(0).optional(),
  discountLabel: z.string().optional(),
});

interface QuoteSettingsStepProps {
  settings?: QuoteSettings;
  onUpdate: (settings: QuoteSettings) => void;
}

export const QuoteSettingsStep = ({ settings, onUpdate }: QuoteSettingsStepProps) => {
  const form = useForm<QuoteSettings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || {
      vatRate: 20,
      vatRegistered: false,
      showMaterialsBreakdown: true,
      discountEnabled: false,
      discountType: 'percentage',
      discountValue: 0,
      discountLabel: '',
    },
  });

  useEffect(() => {
    form.trigger().then(() => {
      if (form.formState.isValid) {
        onUpdate(form.getValues() as QuoteSettings);
      }
    });

    const subscription = form.watch((value) => {
      const isValid = form.formState.isValid;
      if (isValid) {
        onUpdate(value as QuoteSettings);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  const isVatRegistered = form.watch('vatRegistered');
  const isDiscountEnabled = form.watch('discountEnabled');
  const discountType = form.watch('discountType');

  const applyCisPreset = (rate: number) => {
    form.setValue('discountEnabled', true);
    form.setValue('discountType', 'percentage');
    form.setValue('discountValue', rate);
    form.setValue('discountLabel', `CIS Deduction (${rate}%)`);
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        {/* VAT Settings Section */}
        <div>
          <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider px-1 mb-2 flex items-center gap-2">
            <Receipt className="h-3.5 w-3.5" />
            VAT Settings
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {/* VAT Registered Toggle */}
            <FormField
              control={form.control}
              name="vatRegistered"
              render={({ field }) => (
                <FormItem className="p-0">
                  <div className="flex items-center gap-3 p-3.5">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                        field.value ? 'bg-elec-yellow' : 'bg-white/[0.1]'
                      )}
                    >
                      <Receipt className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-medium text-white">VAT Registered</p>
                      <p className="text-[13px] text-white/70">Add VAT to this quote</p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-elec-yellow"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            {/* VAT Rate - Only shown if registered */}
            {isVatRegistered && (
              <FormField
                control={form.control}
                name="vatRate"
                render={({ field }) => (
                  <FormItem className="p-0">
                    <div className="flex items-center gap-3 p-3.5">
                      <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                        <Percent className="h-5 w-5 text-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="text-[12px] text-white/40 block">VAT Rate (%)</label>
                        <FormControl>
                          <Input
                            type="number"
                            inputMode="decimal"
                            step="0.1"
                            placeholder="20"
                            className="h-9 px-0 border-0 bg-transparent text-[15px] font-medium text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0 max-w-[100px]"
                            value={field.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === '' ? '' : parseFloat(value) || '');
                            }}
                          />
                        </FormControl>
                      </div>
                    </div>
                    <FormMessage className="px-4 pb-2 text-[12px]" />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Display Settings Section */}
        <div>
          <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider px-1 mb-2 flex items-center gap-2">
            <Settings className="h-3.5 w-3.5" />
            Display Options
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
            {/* Materials Breakdown Toggle */}
            <FormField
              control={form.control}
              name="showMaterialsBreakdown"
              render={({ field }) => (
                <FormItem className="p-0">
                  <div className="flex items-center gap-3 p-3.5">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                        field.value !== false ? 'bg-elec-yellow' : 'bg-white/[0.1]'
                      )}
                    >
                      <List className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-medium text-white">Show Materials Breakdown</p>
                      <p className="text-[13px] text-white/70">
                        Display each material as a separate line item
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value !== false}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-elec-yellow"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Deductions & Discounts Section */}
        <div>
          <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider px-1 mb-2 flex items-center gap-2">
            <BadgePercent className="h-3.5 w-3.5" />
            Deductions & Discounts
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            {/* Enable Toggle */}
            <FormField
              control={form.control}
              name="discountEnabled"
              render={({ field }) => (
                <FormItem className="p-0">
                  <div className="flex items-center gap-3 p-3.5">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                        field.value ? 'bg-elec-yellow' : 'bg-white/[0.1]'
                      )}
                    >
                      <BadgePercent className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-medium text-white">Apply Deduction/Discount</p>
                      <p className="text-[13px] text-white/70">CIS, OAP discount, etc.</p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-elec-yellow"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            {isDiscountEnabled && (
              <>
                {/* Quick CIS Presets */}
                <div className="p-3.5">
                  <label className="text-[12px] text-white/40 block mb-2">Quick Presets</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => applyCisPreset(20)}
                      className="px-4 py-2.5 rounded-xl text-[13px] font-medium bg-white/[0.03] text-white border border-white/[0.08] touch-manipulation active:scale-[0.97] transition-all"
                    >
                      CIS 20%
                    </button>
                    <button
                      type="button"
                      onClick={() => applyCisPreset(30)}
                      className="px-4 py-2.5 rounded-xl text-[13px] font-medium bg-white/[0.03] text-white border border-white/[0.08] touch-manipulation active:scale-[0.97] transition-all"
                    >
                      CIS 30%
                    </button>
                  </div>
                </div>

                {/* Type Picker */}
                <div className="p-3.5">
                  <label className="text-[12px] text-white/40 block mb-2">Type</label>
                  <div className="flex gap-2">
                    {([
                      { id: 'percentage' as const, label: 'Percentage', icon: Percent },
                      { id: 'fixed' as const, label: 'Fixed Amount', icon: PoundSterling },
                    ]).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => form.setValue('discountType', opt.id)}
                        className={cn(
                          'flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all touch-manipulation active:scale-[0.97]',
                          discountType === opt.id
                            ? 'bg-elec-yellow text-black'
                            : 'bg-white/[0.03] text-white border border-white/[0.08]'
                        )}
                      >
                        <opt.icon className="h-4 w-4" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Value Input */}
                <FormField
                  control={form.control}
                  name="discountValue"
                  render={({ field }) => (
                    <FormItem className="p-0">
                      <div className="flex items-center gap-3 p-3.5">
                        <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                          {discountType === 'percentage' ? (
                            <Percent className="h-5 w-5 text-black" />
                          ) : (
                            <PoundSterling className="h-5 w-5 text-black" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <label className="text-[12px] text-white/40 block">
                            {discountType === 'percentage' ? 'Percentage (%)' : 'Amount (£)'}
                          </label>
                          <FormControl>
                            <Input
                              type="number"
                              inputMode="decimal"
                              step="0.1"
                              placeholder={discountType === 'percentage' ? '20' : '150.00'}
                              className="h-9 px-0 border-0 bg-transparent text-[15px] font-medium text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0 max-w-[120px]"
                              value={field.value || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === '' ? 0 : parseFloat(value) || 0);
                              }}
                            />
                          </FormControl>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Label Input */}
                <FormField
                  control={form.control}
                  name="discountLabel"
                  render={({ field }) => (
                    <FormItem className="p-0">
                      <div className="flex items-center gap-3 p-3.5">
                        <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                          <Settings className="h-5 w-5 text-black" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <label className="text-[12px] text-white/40 block">Label (shown on PDF)</label>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="e.g. CIS Deduction (20%)"
                              className="h-9 px-0 border-0 bg-transparent text-[15px] font-medium text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0"
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};
