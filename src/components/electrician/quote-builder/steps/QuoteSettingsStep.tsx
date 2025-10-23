import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MobileInput } from "@/components/ui/mobile-input";
import { Switch } from "@/components/ui/switch";
import { QuoteSettings } from "@/types/quote";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Percent, ListTree } from "lucide-react";

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
    // Trigger initial validation immediately on mount
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* VAT Settings */}
        <Card className="bg-elec-gray/50 border border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Percent className="h-5 w-5" />
              VAT Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="vatRegistered"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">VAT Registered</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Are you VAT registered?
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
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
                      disabled={!form.watch('vatRegistered')}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === '' ? '' : parseFloat(value) || '');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Materials Display Settings */}
        <Card className="bg-elec-gray/50 border border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListTree className="h-5 w-5" />
              Materials Display
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="showMaterialsBreakdown"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Show Materials Breakdown</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Display each material as a separate line item. Turn off to group all materials into one line.
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value !== false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </Form>
  );
};