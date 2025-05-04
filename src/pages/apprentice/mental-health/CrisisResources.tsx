
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import ResourceCard from "@/components/mental-health/ResourceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { 
  AlertTriangle, Phone, MessageSquare, Globe, 
  LifeBuoy, Search, Calendar, Download, Users, MapPin 
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const postcodeSchema = z.object({
  postcode: z
    .string()
    .min(5, { message: "Please enter a valid postcode" })
    .max(8, { message: "Postcode is too long" })
});

const CrisisResources = () => {
  const [localResources, setLocalResources] = useState<Array<{name: string, distance: string, type: string}>>([]);
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm<z.infer<typeof postcodeSchema>>({
    resolver: zodResolver(postcodeSchema),
    defaultValues: {
      postcode: "",
    },
  });

  const emergencyContacts = [
    {
      name: "Electrical Trades Crisis Line",
      phone: "0800 123 4567",
      hours: "24/7",
      description: "Immediate support for electrical trade workers in crisis"
    },
    {
      name: "Samaritans",
      phone: "116 123",
      hours: "24/7",
      description: "Confidential emotional support for anyone in distress"
    },
    {
      name: "Construction Industry Helpline",
      phone: "0345 605 1956",
      hours: "8am - 8pm, 7 days",
      description: "Support for construction workers facing hardship or crisis"
    }
  ];

  const onlineResources = [
    {
      title: "Mind - Mental Health Crisis Support",
      description: "Information on what to do in a mental health crisis situation",
      type: "website" as const,
      url: "https://www.mind.org.uk/information-support/guides-to-support-and-services/crisis-services/getting-help-in-a-crisis/"
    },
    {
      title: "NHS Mental Health Crisis Resources",
      description: "NHS guidance on accessing urgent mental health support",
      type: "website" as const,
      url: "https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/"
    },
    {
      title: "Andy's Man Club",
      description: "Free, non-judgmental talking groups for men - #ITSOKAYTOTALK",
      type: "website" as const,
      url: "https://andysmanclub.co.uk/"
    },
    {
      title: "CALM - Campaign Against Living Miserably",
      description: "Support for men in the UK, of any age, who are down or in crisis",
      type: "website" as const,
      url: "https://www.thecalmzone.net/"
    },
    {
      title: "Shout Crisis Text Line",
      description: "Text 'SHOUT' to 85258 for free 24/7 mental health support",
      type: "website" as const,
      url: "https://giveusashout.org/"
    }
  ];

  const mockLocalResources = [
    { name: "Community Mental Health Team", distance: "1.2 miles", type: "NHS" },
    { name: "St. John's Wellbeing Centre", distance: "2.4 miles", type: "Charity" },
    { name: "Andy's Man Club - Local Group", distance: "3.5 miles", type: "Support Group" },
    { name: "Mind Support Centre", distance: "4.1 miles", type: "Charity" },
    { name: "Mental Health Crisis Team", distance: "5.0 miles", type: "NHS Emergency" }
  ];

  const onSubmit = (data: z.infer<typeof postcodeSchema>) => {
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setLocalResources(mockLocalResources);
      setIsSearching(false);
      toast.success("Local support services found", {
        description: `Found 5 services near ${data.postcode}`,
      });
    }, 1500);
  };

  const handleCopyNumber = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Phone number copied to clipboard");
  };

  return (
    <MentalHealthPageLayout
      title="Crisis Resources"
      description="Immediate support options for urgent mental health concerns"
      icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
      color="red"
    >
      <div className="space-y-6">
        <Card className="border-red-500/40 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <AlertTriangle className="h-10 w-10 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-500">In an emergency</h3>
                <p className="text-sm">
                  If you or someone else is in immediate danger, call <span className="font-bold text-red-500">999</span> or go to your nearest A&E department.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            Crisis Helplines
          </h3>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <Card 
                key={index}
                className="border-red-500/20 hover:border-red-500/40 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-base">{contact.name}</h4>
                        <p className="text-lg font-bold text-red-500">{contact.phone}</p>
                        <p className="text-xs text-muted-foreground">Hours: {contact.hours}</p>
                        <p className="text-sm mt-1">{contact.description}</p>
                      </div>
                    </div>
                    <Button 
                      className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 w-full sm:w-auto"
                      onClick={() => handleCopyNumber(contact.phone)}
                    >
                      <Phone className="h-4 w-4" /> Copy Number
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-red-500/20 bg-elec-gray col-span-1 sm:col-span-2">
            <CardHeader className="pb-3 border-b border-red-500/10">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-red-500" />
                Online Crisis Support
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {onlineResources.map((resource, index) => (
                  <ResourceCard 
                    key={index}
                    title={resource.title}
                    description={resource.description}
                    type={resource.type}
                    url={resource.url}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <Card className="border-red-500/20 bg-elec-gray hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 border-b border-red-500/10">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  Find Local Support
                </CardTitle>
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
                            <div className="flex gap-2">
                              <Input 
                                placeholder="Enter your postcode" 
                                className="text-sm" 
                                {...field} 
                              />
                              <Button 
                                type="submit"
                                className="bg-red-500 hover:bg-red-600 text-white"
                                disabled={isSearching}
                              >
                                {isSearching ? "Searching..." : "Search"}
                              </Button>
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs">
                            Find mental health services near you
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>

                {localResources.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h4 className="text-sm font-medium">Local Services:</h4>
                    {localResources.map((resource, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-background rounded-md border border-border flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium text-sm">{resource.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {resource.distance}
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded">
                          {resource.type}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="border-red-500/20 bg-elec-gray hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 border-b border-red-500/10">
                <CardTitle className="text-base flex items-center gap-2">
                  <Download className="h-4 w-4 text-red-500" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-6 space-y-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full flex items-center gap-2 text-xs hover:bg-red-500/5"
                  onClick={() => toast.success("Crisis plan template downloaded")}
                >
                  <Download className="h-3.5 w-3.5" />
                  Crisis Plan Template
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full flex items-center gap-2 text-xs hover:bg-red-500/5"
                  onClick={() => toast.success("Emergency contacts card downloaded")}
                >
                  <Phone className="h-3.5 w-3.5" />
                  Emergency Contacts Card
                </Button>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-500/5 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 border-b border-purple-500/10">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  Andy's Man Club
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-6">
                <div className="space-y-3">
                  <p className="text-sm">Free, peer-to-peer support group for men. Find your nearest group:</p>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm flex items-center gap-2"
                    onClick={() => window.open("https://andysmanclub.co.uk/find-your-nearest-group/", "_blank")}
                  >
                    <Users className="h-4 w-4" />
                    Find Nearest Group
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Groups meet every Monday at 7pm (excluding bank holidays)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MentalHealthPageLayout>
  );
};

export default CrisisResources;
