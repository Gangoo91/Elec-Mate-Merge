import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { QuoteSettings } from '@/types/quote';
import { useEffect } from 'react';
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

const inputClass =
  'h-11 px-3 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/20 outline-none touch-manipulation placeholder:text-white';

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
    // Initialise settings synchronously on mount so calculateTotals always has settings
    onUpdate(form.getValues() as QuoteSettings);
    const subscription = form.watch((value) => {
      onUpdate(value as QuoteSettings);
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
      <div className="space-y-5">
        {/* VAT */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-medium text-white">VAT Registered</p>
            <p className="text-[12px] text-white">Add VAT to this quote</p>
          </div>
          <FormField
            control={form.control}
            name="vatRegistered"
            render={({ field }) => (
              <FormItem className="p-0 m-0 space-y-0">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-elec-yellow" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {isVatRegistered && (
          <FormField
            control={form.control}
            name="vatRate"
            render={({ field }) => (
              <FormItem>
                <label className="text-xs font-medium text-white mb-1.5 block">VAT Rate (%)</label>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    placeholder="20"
                    className={cn(inputClass, 'max-w-[120px]')}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value) || '')}
                  />
                </FormControl>
                <FormMessage className="text-[12px] text-red-400" />
              </FormItem>
            )}
          />
        )}

        {/* Materials breakdown */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-medium text-white">Show Materials Breakdown</p>
            <p className="text-[12px] text-white">Display each material as a line item on PDF</p>
          </div>
          <FormField
            control={form.control}
            name="showMaterialsBreakdown"
            render={({ field }) => (
              <FormItem className="p-0 m-0 space-y-0">
                <FormControl>
                  <Switch checked={field.value !== false} onCheckedChange={field.onChange} className="data-[state=checked]:bg-elec-yellow" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Deductions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-medium text-white">Apply Deduction/Discount</p>
            <p className="text-[12px] text-white">CIS, OAP discount, etc.</p>
          </div>
          <FormField
            control={form.control}
            name="discountEnabled"
            render={({ field }) => (
              <FormItem className="p-0 m-0 space-y-0">
                <FormControl>
                  <Switch checked={field.value || false} onCheckedChange={field.onChange} className="data-[state=checked]:bg-elec-yellow" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {isDiscountEnabled && (
          <div className="space-y-4">
            {/* CIS presets */}
            <div className="flex gap-2">
              <button type="button" onClick={() => applyCisPreset(20)} className="h-11 px-4 rounded-xl text-[13px] font-medium bg-white/[0.04] text-white border border-white/[0.08] touch-manipulation active:scale-[0.97]">
                CIS 20%
              </button>
              <button type="button" onClick={() => applyCisPreset(30)} className="h-11 px-4 rounded-xl text-[13px] font-medium bg-white/[0.04] text-white border border-white/[0.08] touch-manipulation active:scale-[0.97]">
                CIS 30%
              </button>
            </div>

            {/* Type */}
            <div className="flex gap-1.5">
              {(['percentage', 'fixed'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => form.setValue('discountType', type)}
                  className={cn(
                    'flex-1 h-11 rounded-xl text-[13px] font-medium transition-all touch-manipulation active:scale-[0.98]',
                    discountType === type
                      ? 'bg-elec-yellow text-black font-semibold'
                      : 'bg-white/[0.04] text-white border border-white/[0.08]'
                  )}
                >
                  {type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                </button>
              ))}
            </div>

            {/* Value + Label */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-xs font-medium text-white mb-1.5 block">
                      {discountType === 'percentage' ? 'Percentage (%)' : 'Amount (£)'}
                    </label>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        placeholder={discountType === 'percentage' ? '20' : '50.00'}
                        className={inputClass}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountLabel"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-xs font-medium text-white mb-1.5 block">Label (optional)</label>
                    <FormControl>
                      <Input placeholder="e.g. CIS Deduction" className={inputClass} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </Form>
  );
};
