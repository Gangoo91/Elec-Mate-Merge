
import { useState } from "react";
import { 
  MapPin, Search, Loader2, Info, ChevronRight, Phone 
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormDescription, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Define the type for local resources
interface LocalResource {
  name: string;
  distance: string;
  type: string;
  contact?: string;
  address?: string;
  open_now?: boolean;
}

interface SearchResult {
  services: LocalResource[];
  source?: string;
}

const postcodeSchema = z.object({
  postcode: z
    .string()
    .min(5, { message: "Please enter a valid postcode" })
    .max(8, { message: "Postcode is too long" })
});

const LocalResourceFinder = () => {
  const [localResources, setLocalResources] = useState<LocalResource[]>([]);
  const [dataSource, setDataSource] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<LocalResource | null>(null);

  const form = useForm<z.infer<typeof postcodeSchema>>({
    resolver: zodResolver(postcodeSchema),
    defaultValues: {
      postcode: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof postcodeSchema>) => {
    setIsSearching(true);
    setSearchError(null);
    setSelectedResource(null);
    setDataSource(null);
    
    try {
      const { data: response, error } = await supabase.functions.invoke('mental-health-services', {
        body: { postcode: data.postcode }
      });
      
      if (error) {
        console.error("Error calling API:", error);
        setSearchError("Failed to find services. Please try again.");
        toast.error("Error finding local services", {
          description: error.message || "Please try again later",
        });
      } else {
        setLocalResources(response.services);
        setDataSource(response.source || "Unknown Source");
        
        toast.success("Local support services found", {
          description: `Found ${response.services.length} services near ${data.postcode}`,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setSearchError("Failed to connect to service. Please try again.");
      toast.error("Service unavailable", {
        description: "Our service is currently unavailable. Please try again later.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleViewResourceDetails = (resource: LocalResource) => {
    setSelectedResource(resource);
  };

  const handleCopyContact = (contact: string) => {
    navigator.clipboard.writeText(contact);
    toast.success("Contact information copied to clipboard");
  };

  const handleGetDirections = (address: string) => {
    // Open in Google Maps
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, "_blank");
    toast.success("Directions opened in Google Maps");
  };

  return (
    <Card className="border-red-500/20 bg-elec-gray hover:shadow-md transition-shadow shadow-sm">
      <CardHeader className="pb-3 border-b border-red-500/10">
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-500" />
          Find Local Support
        </CardTitle>
        <CardDescription className="text-sm">
          Search for mental health services near you
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input 
                        placeholder="Enter your postcode" 
                        className="text-sm" 
                        {...field} 
                      />
                      <Button 
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white sm:w-auto"
                        disabled={isSearching}
                      >
                        {isSearching ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-1" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4 mr-1" />
                            Search
                          </>
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Enter a UK postcode to find local services
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {searchError && (
          <div className="mt-4 p-3 bg-red-500/10 text-red-500 rounded-md text-sm border border-red-500/20">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <p>{searchError}</p>
            </div>
          </div>
        )}

        {localResources.length > 0 && !selectedResource && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-sm font-medium flex items-center gap-1">
                <MapPin className="h-4 w-4 text-red-500" />
                Local Services:
              </h4>
              
              {dataSource && (
                <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  Source: {dataSource}
                </span>
              )}
            </div>
            
            {localResources.map((resource, index) => (
              <div 
                key={index} 
                onClick={() => handleViewResourceDetails(resource)}
                className="p-3 bg-background rounded-md border border-border flex justify-between items-center cursor-pointer hover:border-red-500/30 hover:bg-red-500/5 transition-colors"
              >
                <div>
                  <div className="font-medium text-sm">{resource.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {resource.distance}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded">
                    {resource.type}
                  </span>
                  {resource.open_now !== undefined && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      resource.open_now ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {resource.open_now ? "Open" : "Closed"}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedResource && (
          <div className="mt-4 space-y-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedResource(null)}
              className="flex items-center gap-1"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to results
            </Button>
            
            <div className="p-4 bg-background rounded-md border border-red-500/30">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <h3 className="font-medium flex items-center gap-2 flex-wrap">
                  {selectedResource.name}
                  <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded">
                    {selectedResource.type}
                  </span>
                </h3>
                
                {selectedResource.open_now !== undefined && (
                  <span className={`text-xs px-2 py-1 rounded ${
                    selectedResource.open_now ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                  }`}>
                    {selectedResource.open_now ? "Open Now" : "Currently Closed"}
                  </span>
                )}
              </div>
              
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Distance:</p>
                    <p>{selectedResource.distance}</p>
                  </div>
                </div>
                
                {selectedResource.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Address:</p>
                      <p>{selectedResource.address}</p>
                    </div>
                  </div>
                )}
                
                {selectedResource.contact && (
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Contact:</p>
                      <p className="break-words">{selectedResource.contact}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {selectedResource.contact && (
                  <Button 
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 w-full"
                    onClick={() => handleCopyContact(selectedResource.contact || '')}
                  >
                    <Phone className="h-4 w-4" /> Copy Contact
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center gap-2 w-full"
                  onClick={() => handleGetDirections(selectedResource.address || selectedResource.name)}
                >
                  <MapPin className="h-4 w-4" /> Get Directions
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocalResourceFinder;
