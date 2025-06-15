
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Globe, MessageCircle, FileText, Users } from "lucide-react";

const SupportResourcesTab = () => {
  const emergencyContacts = [
    {
      name: "ACAS (Advisory, Conciliation and Arbitration Service)",
      phone: "0300 123 1100",
      description: "Free employment advice and support",
      availability: "Monday to Friday, 8am to 6pm"
    },
    {
      name: "Apprenticeship Support Helpline",
      phone: "0800 015 0400",
      description: "Government support for apprentices",
      availability: "Monday to Friday, 8am to 10pm"
    }
  ];

  const onlineResources = [
    {
      name: "GOV.UK Apprenticeships",
      url: "gov.uk/apprenticeships-guide",
      description: "Official government guidance on apprentice rights"
    },
    {
      name: "ACAS Website",
      url: "acas.org.uk",
      description: "Employment rights and workplace issues"
    },
    {
      name: "Citizens Advice",
      url: "citizensadvice.org.uk",
      description: "Free advice on work, benefits, and legal issues"
    }
  ];

  const tradeUnions = [
    {
      name: "Unite the Union",
      description: "UK's largest trade union representing electrical workers",
      benefits: ["Legal support", "Workplace representation", "Training opportunities"]
    },
    {
      name: "GMB Union",
      description: "General union with strong electrical sector representation",
      benefits: ["24/7 legal helpline", "Career development", "Workplace protection"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium text-white">{contact.name}</h4>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-red-300 border-red-400/30">
                  {contact.phone}
                </Badge>
                <span className="text-sm text-muted-foreground">{contact.availability}</span>
              </div>
              <p className="text-sm text-muted-foreground">{contact.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
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
                <Globe className="h-4 w-4 mr-1" />
                Visit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Trade Union Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tradeUnions.map((union, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium text-white">{union.name}</h4>
              <p className="text-sm text-muted-foreground">{union.description}</p>
              <div className="flex flex-wrap gap-1">
                {union.benefits.map((benefit, benefitIndex) => (
                  <Badge key={benefitIndex} variant="outline" className="text-green-300 border-green-400/30">
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
            <MessageCircle className="h-5 w-5" />
            Document Everything
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-muted-foreground">Keep records of any issues:</p>
            <ul className="space-y-1 text-sm">
              <li>• Date, time, and details of incidents</li>
              <li>• Names of witnesses present</li>
              <li>• Photos of unsafe conditions (if safe to do so)</li>
              <li>• Copies of any written communications</li>
              <li>• Medical records if injured</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportResourcesTab;
