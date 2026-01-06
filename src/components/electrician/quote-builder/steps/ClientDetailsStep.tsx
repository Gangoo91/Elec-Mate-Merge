import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MobileInput } from "@/components/ui/mobile-input";
import { UnifiedAddressFinder } from "@/components/ui/unified-address-finder";
import { QuoteClient } from "@/types/quote";
import { useEffect, useState } from "react";
import { Clock, User, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

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
    const saved = localStorage.getItem("recentClients");
    if (saved) {
      setRecentClients(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  const handleAddressSelect = (address: string, postcode: string) => {
    form.setValue("address", address);
    form.setValue("postcode", postcode);
  };

  const handleUseRecentClient = (recentClient: QuoteClient) => {
    form.setValue("name", recentClient.name);
    form.setValue("email", recentClient.email);
    form.setValue("phone", recentClient.phone);
    form.setValue("address", recentClient.address);
    form.setValue("postcode", recentClient.postcode);
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      // Save to recent clients when complete
      if (value.name && value.email && value.phone && value.address && value.postcode) {
        onUpdate(value as QuoteClient);

        // Save to recent clients
        const saved = localStorage.getItem("recentClients");
        const recent: QuoteClient[] = saved ? JSON.parse(saved) : [];
        const updated = [value as QuoteClient, ...recent.filter((c) => c.email !== value.email)].slice(0, 5);
        localStorage.setItem("recentClients", JSON.stringify(updated));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-lg font-semibold">Client Information</h2>
        </div>

        {/* Recent Clients - Horizontal scroll chips */}
        {recentClients.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Clients
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {recentClients.map((recentClient, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleUseRecentClient(recentClient)}
                  className={cn(
                    "shrink-0 px-4 py-2.5 rounded-full border-2 transition-all",
                    "bg-elec-gray/50 border-border hover:border-elec-yellow/50 hover:bg-elec-gray",
                    "text-sm font-medium whitespace-nowrap active:scale-[0.98]"
                  )}
                >
                  {recentClient.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Client Name - Full width */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MobileInput
                  label="Client Name *"
                  placeholder="Enter client name"
                  className="h-14"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email and Phone - Grid on tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MobileInput
                    label="Email Address *"
                    type="email"
                    placeholder="client@example.com"
                    className="h-14"
                    {...field}
                  />
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
                  <MobileInput
                    label="Phone Number *"
                    type="tel"
                    inputMode="tel"
                    placeholder="07xxx xxxxxx"
                    className="h-14"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Address Section */}
        <div className="space-y-3">
          <p className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-elec-yellow" />
            Job Site Address
          </p>
          <UnifiedAddressFinder
            onAddressSelect={handleAddressSelect}
            defaultValue={form.watch("address") ? `${form.watch("address")}, ${form.watch("postcode")}` : ""}
          />
        </div>
      </div>
    </Form>
  );
};
