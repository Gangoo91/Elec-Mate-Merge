import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MobileInput } from "@/components/ui/mobile-input";
import { Switch } from "@/components/ui/switch";
import { QuoteSettings } from "@/types/quote";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Percent, Calculator } from "lucide-react";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";

const settingsSchema = z.object({
  labourRate: z.number().min(1, "Labour rate must be greater than £0"),
  overheadPercentage: z.number().min(0).max(100, "Overhead must be between 0-100%"),
  profitMargin: z.number().min(0).max(100, "Profit margin must be between 0-100%"),
  vatRate: z.number().min(0).max(100, "VAT rate must be between 0-100%"),
  vatRegistered: z.boolean(),
});

interface QuoteSettingsStepProps {
  settings?: QuoteSettings;
  onUpdate: (settings: QuoteSettings) => void;
}

export const QuoteSettingsStep = ({ settings, onUpdate }: QuoteSettingsStepProps) => {
  const { isMobile } = useMobileEnhanced();
  
  const form = useForm<QuoteSettings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || {
      labourRate: 45,
      overheadPercentage: 15,
      profitMargin: 20,
      vatRate: 20,
      vatRegistered: true,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      const isValid = form.formState.isValid;
      if (isValid && value.labourRate && typeof value.overheadPercentage === 'number' && typeof value.profitMargin === 'number') {
        onUpdate(value as QuoteSettings);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  return (
    <Form {...form}>
      <div className={`mobile-section-spacing ${isMobile ? 'space-y-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}`}>
        {/* Pricing Settings */}
        <Card className="mobile-card bg-background/80 border-primary/20">
          <CardHeader className="mobile-card-spacing pb-4">
            <CardTitle className="mobile-subheading flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Pricing Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="mobile-card-spacing space-y-4">
            <FormField
              control={form.control}
              name="labourRate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MobileInput 
                      label="Labour Rate"
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      placeholder="45.00"
                      unit="£/hour"
                      error={form.formState.errors.labourRate?.message}
                      clearError={() => form.clearErrors('labourRate')}
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="overheadPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MobileInput 
                      label="Overhead Percentage"
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      placeholder="15"
                      unit="%"
                      error={form.formState.errors.overheadPercentage?.message}
                      clearError={() => form.clearErrors('overheadPercentage')}
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="profitMargin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MobileInput 
                      label="Profit Margin"
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      placeholder="20"
                      unit="%"
                      error={form.formState.errors.profitMargin?.message}
                      clearError={() => form.clearErrors('profitMargin')}
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* VAT Settings */}
        <Card className="mobile-card bg-background/80 border-primary/20">
          <CardHeader className="mobile-card-spacing pb-4">
            <CardTitle className="mobile-subheading flex items-center gap-2">
              <Percent className="h-5 w-5" />
              VAT Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="mobile-card-spacing space-y-4">
            <FormField
              control={form.control}
              name="vatRegistered"
              render={({ field }) => (
                <FormItem className="mobile-interactive flex flex-row items-center justify-between rounded-lg border mobile-card-spacing">
                  <div className="space-y-1">
                    <FormLabel className="mobile-text font-medium">VAT Registered</FormLabel>
                    <div className="mobile-small-text text-muted-foreground">
                      Are you VAT registered?
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="touch-target"
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
                      label="VAT Rate"
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      placeholder="20"
                      unit="%"
                      disabled={!form.watch('vatRegistered')}
                      error={form.formState.errors.vatRate?.message}
                      clearError={() => form.clearErrors('vatRate')}
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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