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
  // ELE-891 — per-category adjustments (signed %; -20 = 20% off labour)
  categoryAdjustments: z
    .object({
      labour: z.number().optional(),
      materials: z.number().optional(),
      equipment: z.number().optional(),
    })
    .optional(),
  // ELE-975 — customer signature box on PDF (opt-in)
  showSignatureBox: z.boolean().optional(),
  // Bake category markup into displayed item totals on the customer-facing
  // quote + PDF, hide the explicit markup line.
  hideMarkupFromCustomer: z.boolean().optional(),
  // Construction invoicing — CIS deduction (labour only, ex-VAT) + VAT
  // domestic reverse charge. All opt-in; default off.
  cisEnabled: z.boolean().optional(),
  cisRate: z.number().optional(),
  reverseCharge: z.boolean().optional(),
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
  const isReverseCharge = form.watch('reverseCharge');
  const isCisEnabled = form.watch('cisEnabled');

  return (
    <Form {...form}>
      <div className="space-y-6 text-left">
        {/* VAT — section divider pattern matches InvoiceSettingsStep */}
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/5" />
        <div>
          <div className="flex items-center justify-between py-3 border-b border-white/[0.12]">
            <div>
              <p className="text-[14px] font-medium text-white">VAT Registered</p>
              <p className="text-[12px] text-white mt-0.5">Add VAT to this quote</p>
            </div>
            <FormField
              control={form.control}
              name="vatRegistered"
              render={({ field }) => (
                <FormItem className="p-0 m-0 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
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

        {/* Construction — CIS + VAT reverse charge (matches InvoiceSettingsStep) */}
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/5" />
        <div>
          <p className="text-[11px] text-white/60 uppercase tracking-wider mb-1">Construction (CIS &amp; VAT)</p>

          {/* VAT reverse charge */}
          <div className="flex items-center justify-between py-3 border-b border-white/[0.12]">
            <div className="pr-3">
              <p className="text-[14px] font-medium text-white">VAT reverse charge</p>
              <p className="text-[12px] text-white/70 mt-0.5">CIS supplies — charge £0 VAT; customer accounts to HMRC</p>
            </div>
            <FormField
              control={form.control}
              name="reverseCharge"
              render={({ field }) => (
                <FormItem className="p-0 m-0 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {isReverseCharge && (
            <p className="text-[11px] text-white/60 mt-2 leading-relaxed">
              Invoice shows £0 VAT with the statement <span className="text-white/80">&ldquo;Reverse charge: customer to account to HMRC for the VAT&rdquo;</span> — the notional VAT is shown for their records.
            </p>
          )}

          {/* CIS deduction */}
          <div className="flex items-center justify-between py-3 border-b border-white/[0.12] mt-1">
            <div className="pr-3">
              <p className="text-[14px] font-medium text-white">CIS deduction</p>
              <p className="text-[12px] text-white/70 mt-0.5">Deducted from labour only (ex-VAT)</p>
            </div>
            <FormField
              control={form.control}
              name="cisEnabled"
              render={({ field }) => (
                <FormItem className="p-0 m-0 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value || false}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (checked && !form.getValues('cisRate')) form.setValue('cisRate', 20);
                      }}
                      className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {isCisEnabled && (
            <div className="pt-3">
              <label className="text-xs font-medium text-white mb-1.5 block">CIS rate</label>
              <div className="grid grid-cols-2 gap-2">
                {[20, 30].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => form.setValue('cisRate', rate)}
                    className={cn(
                      'h-11 rounded-lg text-[13px] font-semibold border transition-colors touch-manipulation',
                      (form.watch('cisRate') ?? 20) === rate
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-white/[0.06] text-white border-white/[0.12]'
                    )}
                  >
                    {rate}% · {rate === 20 ? 'registered' : 'unverified'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-white/55 mt-2">Calculated on the Labour element only — categorise chargeable labour as Labour.</p>
            </div>
          )}
        </div>

        {/* Materials breakdown — section divider matches Invoice pattern */}
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/5" />
        <div>
          <div className="flex items-center justify-between py-3 border-b border-white/[0.12]">
            <div>
              <p className="text-[14px] font-medium text-white">Show Materials Breakdown</p>
              <p className="text-[12px] text-white mt-0.5">Display each material as a line item on PDF</p>
            </div>
            <FormField
              control={form.control}
              name="showMaterialsBreakdown"
              render={({ field }) => (
                <FormItem className="p-0 m-0 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value !== false}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ELE-975 — Customer signature box on PDF */}
        <div>
          <div className="flex items-center justify-between py-3 border-b border-white/[0.12]">
            <div>
              <p className="text-[14px] font-medium text-white">Customer Signature Box</p>
              <p className="text-[12px] text-white mt-0.5">
                Add a signed-by / date area at the bottom of the PDF
              </p>
            </div>
            <FormField
              control={form.control}
              name="showSignatureBox"
              render={({ field }) => (
                <FormItem className="p-0 m-0 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value === true}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Deductions — section divider matches Invoice pattern */}
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/5" />
        <div>
          <div className="flex items-center justify-between py-3 border-b border-white/[0.12]">
            <div>
              <p className="text-[14px] font-medium text-white">Apply Discount</p>
              <p className="text-[12px] text-white mt-0.5">Goodwill, retention, early-payment, etc.</p>
            </div>
            <FormField
              control={form.control}
              name="discountEnabled"
              render={({ field }) => (
                <FormItem className="p-0 m-0 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {isDiscountEnabled && (
          <div className="space-y-4">
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
                      <Input placeholder="e.g. Retention" className={inputClass} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* ELE-891 — per-category adjustments */}
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/5" />
        <div>
          <div className="py-3 border-b border-white/[0.12]">
            <p className="text-[14px] font-medium text-white">Per-category adjustment</p>
            <p className="text-[12px] text-white/70 mt-0.5">
              Signed %. Negative = discount, positive = markup. Applied before global discount.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['labour', 'materials', 'equipment'] as const).map((cat) => (
              <FormField
                key={cat}
                control={form.control}
                name={`categoryAdjustments.${cat}` as const}
                render={({ field }) => (
                  <FormItem>
                    <label className="text-xs font-medium text-white mb-1.5 block capitalize">
                      {cat}
                    </label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0"
                          className={cn(inputClass, 'pr-8')}
                          value={field.value ?? ''}
                          onChange={(e) => {
                            const v = e.target.value;
                            field.onChange(v === '' ? undefined : parseFloat(v));
                          }}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm pointer-events-none">
                          %
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Customer-facing presentation toggle — bake markup into line
              totals so the customer doesn't see a "+X% markup" row. The
              app's own quote view (QuoteDetailView) still shows the
              breakdown so you can see your margin. */}
          <div className="mt-5 flex items-center justify-between py-3 border-t border-white/[0.08]">
            <div className="pr-3">
              <p className="text-[14px] font-medium text-white">Hide markup from customer</p>
              <p className="text-[12px] text-white/70 mt-0.5">
                Bake the per-category markup into the displayed line prices on the customer's
                quote and PDF. They see one price per line, no separate markup row. You still
                see the breakdown in the app.
              </p>
            </div>
            <FormField
              control={form.control}
              name="hideMarkupFromCustomer"
              render={({ field }) => (
                <FormItem className="p-0 m-0 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value === true}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
