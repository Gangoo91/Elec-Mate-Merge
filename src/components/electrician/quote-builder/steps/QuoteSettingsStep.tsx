import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { QuoteSettings } from "@/types/quote";
import { useEffect } from "react";
import { Settings, Receipt, List, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsSchema = z.object({
  vatRate: z.number().min(0).max(100, "VAT rate must be between 0-100%"),
  vatRegistered: z.boolean(),
  showMaterialsBreakdown: z.boolean().optional(),
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

  const isVatRegistered = form.watch("vatRegistered");

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
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                      field.value ? "bg-elec-yellow" : "bg-white/[0.1]"
                    )}>
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
                              field.onChange(value === "" ? "" : parseFloat(value) || "");
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
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                      field.value !== false ? "bg-elec-yellow" : "bg-white/[0.1]"
                    )}>
                      <List className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-medium text-white">Show Materials Breakdown</p>
                      <p className="text-[13px] text-white/70">Display each material as a separate line item</p>
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
      </div>
    </Form>
  );
};
