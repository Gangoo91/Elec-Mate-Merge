import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PostcodeFinder } from "@/components/ui/postcode-finder";
import { QuoteClient } from "@/types/quote";
import { useEffect, useState } from "react";

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
  const [showAddressFinder, setShowAddressFinder] = useState(false);
  
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

  const handleAddressSelect = (address: any) => {
    form.setValue("address", address.line_1);
    form.setValue("postcode", address.postcode);
    setShowAddressFinder(false);
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter client name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="client@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number *</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postcode *</FormLabel>
              <FormControl>
                <Input placeholder="Enter postcode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Postcode Finder Section */}
      <div className="mt-6 pt-4 border-t">
        <PostcodeFinder 
          onAddressSelect={handleAddressSelect}
          placeholder="Search for address by postcode..."
          className="mb-4"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address *</FormLabel>
              <FormControl>
                <Input placeholder="Enter full address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};