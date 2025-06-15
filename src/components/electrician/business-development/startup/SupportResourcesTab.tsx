
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Globe, PoundSterling, ExternalLink } from "lucide-react";

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
      name: "NICEIC Technical Helpline",
      phone: "0333 015 6626",
      description: "Technical and compliance support",
      availability: "Monday to Friday, 8:30am to 5pm"
    }
  ];

  const fundingOptions = [
    {
      name: "Start Up Loans",
      amount: "£500 - £25,000",
      description: "Government-backed loans for new businesses",
      rate: "6% fixed rate"
    },
    {
      name: "New Enterprise Allowance",
      amount: "£1,274 + £200/week",
      description: "For unemployed people starting a business",
      rate: "Grant + weekly allowance"
    },
    {
      name: "Prince's Trust Enterprise",
      amount: "Up to £7,500",
      description: "For 18-30 year olds starting a business",
      rate: "Low interest loan"
    }
  ];

  const resources = [
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
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Business Support Helplines
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
            <PoundSterling className="h-5 w-5" />
            Funding Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fundingOptions.map((option, index) => (
            <div key={index} className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-white">{option.name}</h4>
                <Badge className="bg-green-500/20 text-green-300">{option.amount}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
              <Badge variant="outline" className="text-green-300 border-green-400/30">
                {option.rate}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Online Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resources.map((resource, index) => (
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
    </div>
  );
};

export default SupportResourcesTab;
