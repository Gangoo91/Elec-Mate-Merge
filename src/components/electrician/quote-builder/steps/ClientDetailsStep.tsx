import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MobileInput } from "@/components/ui/mobile-input";
import { SmartAddressFinder } from "@/components/ui/smart-address-finder";
import { QuoteClient } from "@/types/quote";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, UserPlus } from "lucide-react";

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
  const [recentClients, setRecentClients] = useState<QuoteClient[]>([]);
  
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

  // Load recent clients from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentClients');
    if (saved) {
      setRecentClients(JSON.parse(saved).slice(0, 3));
    }
  }, []);

  const handleAddressSelect = (address: any) => {
    form.setValue("address", address.line_1 || address.formatted_address);
    form.setValue("postcode", address.postcode);
  };

  const handleUseRecentClient = (client: QuoteClient) => {
    form.setValue("name", client.name);
    form.setValue("email", client.email);
    form.setValue("phone", client.phone);
    form.setValue("address", client.address);
    form.setValue("postcode", client.postcode);
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      // Save to recent clients when complete
      if (value.name && value.email && value.phone && value.address && value.postcode) {
        onUpdate(value as QuoteClient);
        
        // Save to recent clients
        const saved = localStorage.getItem('recentClients');
        const recent: QuoteClient[] = saved ? JSON.parse(saved) : [];
        const updated = [value as QuoteClient, ...recent.filter(c => c.email !== value.email)].slice(0, 5);
        localStorage.setItem('recentClients', JSON.stringify(updated));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  return (
    <Form {...form}>
      {/* Recent Clients Quick Select */}
      {recentClients.length > 0 && (
        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Recently Used Clients</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentClients.map((recentClient, idx) => (
                <Button
                  key={idx}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleUseRecentClient(recentClient)}
                  className="h-auto py-2 px-3 flex items-center gap-2"
                >
                  <UserPlus className="h-3 w-3" />
                  <div className="text-left">
                    <div className="font-medium text-xs">{recentClient.name}</div>
                    <div className="text-xs text-muted-foreground">{recentClient.email}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MobileInput label="Client Name *" placeholder="Enter client name" {...field} />
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
              <FormControl>
                <MobileInput label="Email Address *" type="email" placeholder="client@example.com" {...field} />
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
              <FormControl>
                <MobileInput label="Phone Number *" type="tel" inputMode="tel" placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Smart Address Finder */}
      <div className="mt-6">
        <SmartAddressFinder
          onAddressSelect={handleAddressSelect}
          postcodeValue={form.watch("postcode")}
          addressValue={form.watch("address")}
          onPostcodeChange={(value) => form.setValue("postcode", value)}
          onAddressChange={(value) => form.setValue("address", value)}
        />
      </div>
    </Form>
  );
};