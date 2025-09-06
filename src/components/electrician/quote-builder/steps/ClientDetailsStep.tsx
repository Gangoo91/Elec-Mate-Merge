import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MobileInput } from "@/components/ui/mobile-input";
import { QuoteClient } from "@/types/quote";
import { useEffect } from "react";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";

const clientSchema = z.object({
  name: z.string().min(1, "Client name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  postcode: z.string().min(1, "Postcode is required"),
});

interface ClientDetailsStepProps {
  client?: QuoteClient;
  onUpdate: (client: QuoteClient) => void;
}

export const ClientDetailsStep = ({ client, onUpdate }: ClientDetailsStepProps) => {
  const { isMobile } = useMobileEnhanced();
  
  const form = useForm<QuoteClient>({
    resolver: zodResolver(clientSchema),
    defaultValues: client || {
      name: "",
      email: "",
      phone: "",
      address: "",
      postcode: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log('Form values:', value);
      console.log('Form valid:', form.formState.isValid);
      
      // Always update if all required fields have values, regardless of validation state
      if (value.name && value.email && value.phone && value.address && value.postcode) {
        console.log('Updating client with:', value);
        onUpdate(value as QuoteClient);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  return (
    <Form {...form}>
      <div className={`mobile-section-spacing ${isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MobileInput 
                  label="Client Name"
                  placeholder="Enter client name" 
                  error={form.formState.errors.name?.message}
                  clearError={() => form.clearErrors('name')}
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MobileInput 
                  label="Email Address"
                  type="email"
                  inputMode="email"
                  placeholder="client@example.com"
                  error={form.formState.errors.email?.message}
                  clearError={() => form.clearErrors('email')}
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MobileInput 
                  label="Phone Number"
                  type="tel"
                  inputMode="tel"
                  placeholder="07123 456789"
                  error={form.formState.errors.phone?.message}
                  clearError={() => form.clearErrors('phone')}
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MobileInput 
                  label="Postcode"
                  placeholder="SW1A 1AA"
                  error={form.formState.errors.postcode?.message}
                  clearError={() => form.clearErrors('postcode')}
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className={isMobile ? '' : 'md:col-span-2'}>
              <FormControl>
                <MobileInput 
                  label="Address"
                  placeholder="Enter full address"
                  error={form.formState.errors.address?.message}
                  clearError={() => form.clearErrors('address')}
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};