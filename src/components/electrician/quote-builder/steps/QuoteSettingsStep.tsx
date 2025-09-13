import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { QuoteSettings } from "@/types/quote";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Percent, Brain } from "lucide-react";

const settingsSchema = z.object({
  vatRate: z.number().min(0).max(100, "VAT rate must be between 0-100%"),
  vatRegistered: z.boolean(),
  aiEnhancedPDF: z.boolean().optional(),
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
      vatRegistered: true,
      aiEnhancedPDF: true,
    },
  });

  useEffect(() => {
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
        <Card className="bg-elec-gray/50 border-elec-yellow/20">
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
                  <FormLabel>VAT Rate (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
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

        {/* AI Enhancement Settings */}
        <Card className="bg-elec-gray/50 border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5" />
              AI Enhancement Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="aiEnhancedPDF"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">AI-Enhanced PDF Generation</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Generate professional PDFs with AI-enhanced descriptions, executive summary, and smart terms & conditions
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value || false}
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