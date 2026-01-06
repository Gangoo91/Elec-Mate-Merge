import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MobileInput } from "@/components/ui/mobile-input";
import { Switch } from "@/components/ui/switch";
import { QuoteSettings } from "@/types/quote";
import { useEffect } from "react";
import { Settings } from "lucide-react";

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

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-lg font-semibold">Quote Settings</h2>
        </div>

        {/* VAT Toggle - Clean switch row */}
        <FormField
          control={form.control}
          name="vatRegistered"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between p-4 bg-elec-gray/30 rounded-lg">
                <div>
                  <p className="font-medium">VAT Registered</p>
                  <p className="text-sm text-muted-foreground">Add VAT to this quote?</p>
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
        {form.watch("vatRegistered") && (
          <div className="pl-4">
            <FormField
              control={form.control}
              name="vatRate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MobileInput
                      label="VAT Rate (%)"
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      placeholder="20"
                      className="h-14 max-w-[150px]"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : parseFloat(value) || "");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Materials Breakdown Toggle */}
        <FormField
          control={form.control}
          name="showMaterialsBreakdown"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between p-4 bg-elec-gray/30 rounded-lg">
                <div>
                  <p className="font-medium">Show Materials Breakdown</p>
                  <p className="text-sm text-muted-foreground">
                    Display each material as a separate line item
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value !== false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};
