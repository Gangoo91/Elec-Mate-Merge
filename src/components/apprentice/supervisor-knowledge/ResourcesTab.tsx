
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ExternalLink, Clock, Shield, AlertTriangle, BookOpen, Users, Briefcase } from "lucide-react";

interface ContactResource {
  id: string;
  name: string;
  description: string;
  phone?: string;
  website?: string;
  category: string;
  availability?: string;
  cost?: string;
  icon: any;
}

const emergencyContacts: ContactResource[] = [
  {
    id: "emergency-001",
    name: "Health and Safety Executive (HSE)",
    description: "Report serious workplace accidents, dangerous occurrences, and safety concerns",
    phone: "0345 300 9923",
    website: "https://www.hse.gov.uk",
    category: "Emergency & Safety",
    availability: "24/7 for serious incidents",
    cost: "Free",
    icon: Shield
  },
  {
    id: "emergency-002", 
    name: "Electrical Safety First",
    description: "Electrical safety advice and guidance for professionals and consumers",
    phone: "020 3463 5100",
    website: "https://www.electricalsafetyfirst.org.uk",
    category: "Emergency & Safety",
    availability: "Mon-Fri 9am-5pm",
    cost: "Free advice line",
    icon: AlertTriangle
  },
  {
    id: "emergency-003",
    name: "RIDDOR Incident Reporting",
    description: "Online reporting system for serious workplace accidents and incidents",
    website: "https://www.hse.gov.uk/riddor/report.htm",
    category: "Emergency & Safety",
    availability: "24/7 online",
    cost: "Free",
    icon: AlertTriangle
  }
];

const professionalResources: ContactResource[] = [
  {
    id: "prof-001",
    name: "Institution of Engineering and Technology (IET)",
    description: "Professional development, technical guidance, and career support for electrical engineers",
    phone: "01438 313311",
    website: "https://www.theiet.org",
    category: "Professional Development",
    availability: "Mon-Fri 8:30am-5pm",
    cost: "Membership required for some services",
    icon: BookOpen
  },
  {
    id: "prof-002",
    name: "Electrical Contractors' Association (ECA)",
    description: "Trade association providing business support, training, and technical advice",
    phone: "020 7313 4800",
    website: "https://www.eca.co.uk",
    category: "Professional Development",
    availability: "Mon-Fri 9am-5pm",
    cost: "Member services available",
    icon: Briefcase
  },
  {
    id: "prof-003",
    name: "National Inspection Council for Electrical Installation Contracting (NICEIC)",
    description: "Assessment, certification, and technical support for electrical contractors",
    phone: "0333 015 6626",
    website: "https://www.niceic.com",
    category: "Professional Development", 
    availability: "Mon-Fri 8am-6pm, Sat 9am-1pm",
    cost: "Registration fees apply",
    icon: Shield
  },
  {
    id: "prof-004",
    name: "SELECT (Electrical Contractors Association of Scotland)",
    description: "Scottish electrical contractors association providing training and support",
    phone: "0131 445 5577",
    website: "https://www.select.org.uk",
    category: "Professional Development",
    availability: "Mon-Fri 9am-5pm",
    cost: "Member services",
    icon: BookOpen
  }
];

const trainingResources: ContactResource[] = [
  {
    id: "train-001",
    name: "City & Guilds",
    description: "Electrical qualifications, apprenticeships, and professional development courses",
    phone: "0844 543 0000",
    website: "https://www.cityandguilds.com",
    category: "Training & Education",
    availability: "Mon-Fri 8:30am-5pm",
    cost: "Course fees apply",
    icon: BookOpen
  },
  {
    id: "train-002",
    name: "EAL (Excellence, Achievement & Learning)",
    description: "Electrical qualifications and specialist electrical training programmes",
    phone: "01923 652400",
    website: "https://www.eal.org.uk",
    category: "Training & Education",
    availability: "Mon-Fri 9am-5pm",
    cost: "Course fees apply",
    icon: BookOpen
  },
  {
    id: "train-003",
    name: "JTL Training",
    description: "Electrical apprenticeships and training programmes across the UK",
    phone: "0800 085 2308",
    website: "https://www.jtltraining.com",
    category: "Training & Education",
    availability: "Mon-Fri 8:30am-5pm",
    cost: "Apprenticeship funding available",
    icon: Users
  }
];

const supportResources: ContactResource[] = [
  {
    id: "support-001",
    name: "ACAS (Advisory, Conciliation and Arbitration Service)",
    description: "Workplace rights, employment law, and dispute resolution advice",
    phone: "0300 123 1100",
    website: "https://www.acas.org.uk",
    category: "Employment Support",
    availability: "Mon-Fri 8am-8pm, Sat 9am-1pm",
    cost: "Free advice service",
    icon: Users
  },
  {
    id: "support-002",
    name: "Unite the Union (Construction Workers)",
    description: "Trade union representing construction and electrical workers",
    phone: "020 7611 2500",
    website: "https://www.unitetheunion.org",
    category: "Employment Support",
    availability: "Mon-Fri 9am-5pm",
    cost: "Membership fees apply",
    icon: Users
  },
  {
    id: "support-003",
    name: "Citizens Advice",
    description: "Free advice on employment rights, benefits, and legal issues",
    phone: "03444 111 444",
    website: "https://www.citizensadvice.org.uk",
    category: "Employment Support",
    availability: "Varies by local office",
    cost: "Free service",
    icon: Users
  }
];

const allResources = [
  ...emergencyContacts,
  ...professionalResources,
  ...trainingResources,
  ...supportResources
];

const ResourcesTab = () => {
  const handlePhoneCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWebsiteVisit = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Emergency & Safety': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Professional Development': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Training & Education': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Employment Support': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const renderResourceSection = (title: string, resources: ContactResource[], description: string) => (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-elec-yellow mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <resource.icon className="h-6 w-6 text-elec-yellow shrink-0 mt-1" />
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{resource.name}</CardTitle>
                  <Badge variant="outline" className={getCategoryColor(resource.category)}>
                    {resource.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-elec-light/80">
                {resource.description}
              </CardDescription>
              
              <div className="space-y-2 text-sm">
                {resource.availability && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{resource.availability}</span>
                  </div>
                )}
                {resource.cost && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Cost: {resource.cost}</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                {resource.phone && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handlePhoneCall(resource.phone!)}
                    className="flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                )}
                {resource.website && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleWebsiteVisit(resource.website!)}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Website
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-elec-yellow" />
            Professional Support Contacts
          </CardTitle>
          <CardDescription>
            Real contact information for organisations that can help with workplace issues, 
            safety concerns, career development, and professional guidance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-200 mb-1">Important Notice</p>
                <p className="text-amber-200/80 text-sm">
                  For immediate electrical safety emergencies, always call 999. 
                  These contacts are for professional guidance, reporting, and non-emergency support.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {renderResourceSection(
        "Emergency & Safety",
        emergencyContacts,
        "Contacts for reporting safety incidents and getting emergency electrical safety advice"
      )}

      {renderResourceSection(
        "Professional Development",
        professionalResources,
        "Professional bodies and organisations supporting career development and technical guidance"
      )}

      {renderResourceSection(
        "Training & Education",
        trainingResources,
        "Training providers and qualification bodies for electrical qualifications and courses"
      )}

      {renderResourceSection(
        "Employment Support",
        supportResources,
        "Support for workplace rights, employment issues, and professional representation"
      )}

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> Contact information is provided for guidance only. 
              Always verify current details before making contact. For workplace emergencies, 
              follow your company's emergency procedures first.
            </p>
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-GB')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
