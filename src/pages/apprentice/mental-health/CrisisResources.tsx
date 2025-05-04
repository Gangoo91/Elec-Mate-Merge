
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import ResourceCard from "@/components/mental-health/ResourceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, Phone, MessageSquare, Globe, 
  LifeBuoy, Search, Calendar, Download 
} from "lucide-react";
import { toast } from "sonner";

const CrisisResources = () => {
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Search results ready", {
      description: "Showing local mental health support services near you",
    });
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
              <AlertTriangle className="h-10 w-10 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-red-500">In an emergency</h3>
                <p className="text-sm">
                  If you or someone else is in immediate danger, call <span className="font-bold">999</span> or go to your nearest A&E department.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Crisis Helplines</h3>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div 
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-lg gap-3"
              >
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
                  onClick={() => navigator.clipboard.writeText(contact.phone)}
                >
                  <Phone className="h-4 w-4" /> Copy Number
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-red-500/20 bg-elec-gray col-span-1 sm:col-span-2">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Globe className="h-5 w-5 text-red-500" />
                Online Crisis Support
              </h3>
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
            <Card className="border-red-500/20 bg-elec-gray">
              <CardContent className="p-4">
                <h3 className="text-base font-medium flex items-center gap-2 mb-3">
                  <Search className="h-4 w-4 text-red-500" />
                  Find Local Support
                </h3>
                <form className="space-y-3" onSubmit={handleSearch}>
                  <Input 
                    placeholder="Enter your postcode" 
                    className="text-sm"
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-sm"
                  >
                    Search
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="border-red-500/20 bg-elec-gray">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-base font-medium flex items-center gap-2">
                  <Download className="h-4 w-4 text-red-500" />
                  Resources
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full flex items-center gap-2 text-xs"
                  onClick={() => toast.success("Crisis plan template downloaded")}
                >
                  <Download className="h-3.5 w-3.5" />
                  Crisis Plan Template
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full flex items-center gap-2 text-xs"
                  onClick={() => toast.success("Emergency contacts card downloaded")}
                >
                  <Phone className="h-3.5 w-3.5" />
                  Emergency Contacts Card
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MentalHealthPageLayout>
  );
};

export default CrisisResources;
