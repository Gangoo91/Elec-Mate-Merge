
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Globe, MessageSquare, Users, AlertTriangle, BookOpen, ExternalLink } from "lucide-react";

const ResourcesTab = () => {
  const emergencyContacts = [
    {
      title: "Health & Safety Executive (HSE)",
      description: "Report serious workplace accidents, diseases and dangerous occurrences",
      phone: "0345 300 9923",
      website: "https://www.hse.gov.uk",
      type: "emergency"
    },
    {
      title: "ACAS (Advisory, Conciliation and Arbitration Service)",
      description: "Free and impartial advice on workplace relations and employment law",
      phone: "0300 123 1100",
      website: "https://www.acas.org.uk",
      type: "support"
    },
    {
      title: "Electrical Safety First",
      description: "UK charity dedicated to reducing deaths and injuries from electrical accidents",
      phone: "020 3463 5100",
      website: "https://www.electricalsafetyfirst.org.uk",
      type: "safety"
    }
  ];

  const supervisorContacts = [
    {
      title: "IET (Institution of Engineering and Technology)",
      description: "Professional body for electrical engineers and technicians",
      phone: "01438 313311",
      website: "https://www.theiet.org",
      type: "professional"
    },
    {
      title: "ECA (Electrical Contractors' Association)",
      description: "Trade association representing electrical contractors",
      phone: "020 7313 4800",
      website: "https://www.eca.co.uk",
      type: "trade"
    },
    {
      title: "SELECT (Scotland's Electrical Trade Body)",
      description: "Trade association for electrical contractors in Scotland",
      phone: "0131 445 5577",
      website: "https://www.select.org.uk",
      type: "trade"
    },
    {
      title: "NICEIC",
      description: "Leading voluntary regulatory body for electrical contracting industry",
      phone: "0333 015 6626",
      website: "https://www.niceic.com",
      type: "certification"
    }
  ];

  const learningResources = [
    {
      title: "City & Guilds",
      description: "Electrical qualifications and training resources",
      phone: "0844 543 0000",
      website: "https://www.cityandguilds.com",
      type: "education"
    },
    {
      title: "JTL Training",
      description: "Electrical apprenticeship training provider",
      phone: "0800 085 2308",
      website: "https://www.jtltraining.com",
      type: "training"
    },
    {
      title: "EAL (Excellence, Achievement & Learning Limited)",
      description: "Awarding organisation for technical and vocational qualifications",
      phone: "01923 652400",
      website: "https://www.eal.org.uk",
      type: "qualifications"
    }
  ];

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWebsite = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const ContactCard = ({ contact, icon }: { contact: any, icon: React.ReactNode }) => (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <CardTitle className="text-base">{contact.title}</CardTitle>
        </div>
        <CardDescription className="text-sm text-elec-light/80">
          {contact.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCall(contact.phone)}
            className="border-green-500/30 text-green-400 hover:bg-green-500/10 justify-start"
          >
            <Phone className="h-4 w-4 mr-2" />
            {contact.phone}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleWebsite(contact.website)}
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 justify-start"
          >
            <Globe className="h-4 w-4 mr-2" />
            Visit Website
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Emergency & Safety Contacts */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-semibold text-elec-yellow">Emergency & Safety Contacts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, index) => (
            <ContactCard 
              key={index} 
              contact={contact} 
              icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
            />
          ))}
        </div>
      </div>

      {/* Professional & Trade Bodies */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-elec-yellow">Professional & Trade Bodies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supervisorContacts.map((contact, index) => (
            <ContactCard 
              key={index} 
              contact={contact} 
              icon={<Users className="h-4 w-4 text-blue-500" />}
            />
          ))}
        </div>
      </div>

      {/* Learning & Training Resources */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-semibold text-elec-yellow">Learning & Training Resources</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {learningResources.map((contact, index) => (
            <ContactCard 
              key={index} 
              contact={contact} 
              icon={<BookOpen className="h-4 w-4 text-green-500" />}
            />
          ))}
        </div>
      </div>

      {/* Quick Help Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Quick Help Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-md">
              <h4 className="font-medium text-amber-300 mb-2">Before Calling:</h4>
              <ul className="text-sm text-amber-200/90 space-y-1">
                <li>• Have your question or issue clearly defined</li>
                <li>• Gather any relevant documentation or reference numbers</li>
                <li>• Note down the specific regulation or standard you're asking about</li>
                <li>• Be prepared to explain the context of your work situation</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-900/20 border border-blue-600/30 rounded-md">
              <h4 className="font-medium text-blue-300 mb-2">Best Times to Call:</h4>
              <ul className="text-sm text-blue-200/90 space-y-1">
                <li>• Most organisations: Monday-Friday, 9:00 AM - 5:00 PM</li>
                <li>• HSE: 24/7 for serious incidents</li>
                <li>• ACAS: Monday-Friday, 8:00 AM - 8:00 PM, Saturday 9:00 AM - 1:00 PM</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-md">
              <h4 className="font-medium text-green-300 mb-2">Alternative Support:</h4>
              <ul className="text-sm text-green-200/90 space-y-1">
                <li>• Many organisations offer online chat and email support</li>
                <li>• Check their websites for comprehensive FAQ sections</li>
                <li>• Join professional forums and online communities</li>
                <li>• Consider local electrical trade meetups and networking events</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
