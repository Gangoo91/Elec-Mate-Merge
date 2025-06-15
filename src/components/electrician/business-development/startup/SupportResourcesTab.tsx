
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Globe, MessageCircle, FileText, Users, BookOpen, ExternalLink } from "lucide-react";

const SupportResourcesTab = () => {
  const helplines = [
    {
      name: "Business Support Helpline",
      phone: "0345 600 9 006",
      description: "Government support for new businesses",
      availability: "Monday to Friday, 9am to 6pm"
    },
    {
      name: "HMRC New Employer Helpline",
      phone: "0300 200 3211",
      description: "Help with tax and employment matters",
      availability: "Monday to Friday, 8am to 8pm"
    },
    {
      name: "Health & Safety Executive",
      phone: "0300 003 1747",
      description: "Workplace safety guidance and compliance",
      availability: "Monday to Friday, 8:30am to 5pm"
    }
  ];

  const onlineResources = [
    {
      name: "GOV.UK Business Support",
      url: "gov.uk/browse/business",
      description: "Official government guidance for starting a business"
    },
    {
      name: "NICEIC Business Resources",
      url: "niceic.com/business-support",
      description: "Industry-specific guidance and support"
    },
    {
      name: "Electrical Contractors' Association",
      url: "eca.co.uk",
      description: "Industry body with resources and networking"
    },
    {
      name: "FSB (Federation of Small Businesses)",
      url: "fsb.org.uk",
      description: "Support, advice and protection for small businesses"
    }
  ];

  const mentorshipPrograms = [
    {
      name: "SCORE Mentorship",
      description: "Free business mentoring for entrepreneurs",
      benefits: ["One-on-one guidance", "Industry expertise", "Business plan review"]
    },
    {
      name: "Prince's Trust Enterprise",
      description: "Support for young entrepreneurs (18-30)",
      benefits: ["Funding opportunities", "Mentoring", "Business training"]
    },
    {
      name: "Local Enterprise Partnerships",
      description: "Regional business support networks",
      benefits: ["Local market insights", "Networking events", "Grant opportunities"]
    }
  ];

  const emergencySupport = [
    {
      title: "Financial Difficulties",
      contacts: ["Business Debtline: 0800 197 6026", "Citizens Advice: 0808 223 1133"]
    },
    {
      title: "Legal Issues",
      contacts: ["Law Society Find a Solicitor", "Citizens Advice Legal Help"]
    },
    {
      title: "Mental Health Support",
      contacts: ["Samaritans: 116 123", "Mind: 0300 123 3393"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Business Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {emergencySupport.map((support, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium text-white">{support.title}</h4>
              <div className="space-y-1">
                {support.contacts.map((contact, contactIndex) => (
                  <div key={contactIndex} className="text-sm text-red-100">
                    {contact}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Business Helplines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {helplines.map((helpline, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium text-white">{helpline.name}</h4>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-blue-300 border-blue-400/30">
                  {helpline.phone}
                </Badge>
                <span className="text-sm text-muted-foreground">{helpline.availability}</span>
              </div>
              <p className="text-sm text-muted-foreground">{helpline.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Online Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {onlineResources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">{resource.name}</h4>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                Visit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Mentorship & Networking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mentorshipPrograms.map((program, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium text-white">{program.name}</h4>
              <p className="text-sm text-muted-foreground">{program.description}</p>
              <div className="flex flex-wrap gap-1">
                {program.benefits.map((benefit, benefitIndex) => (
                  <Badge key={benefitIndex} variant="outline" className="text-purple-300 border-purple-400/30">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Document Your Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-muted-foreground">Keep detailed records for tax and legal purposes:</p>
            <ul className="space-y-1 text-sm">
              <li>• All business expenses and receipts</li>
              <li>• Income records and invoices</li>
              <li>• Business registration documents</li>
              <li>• Insurance policies and certificates</li>
              <li>• Health and safety training records</li>
              <li>• Customer contracts and agreements</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportResourcesTab;
