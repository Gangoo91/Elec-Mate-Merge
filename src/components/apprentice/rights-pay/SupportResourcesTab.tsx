
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Heart, DollarSign, Users, ExternalLink, Mail } from "lucide-react";

const SupportResourcesTab = () => {
  const supportChannels = [
    {
      channel: "ACAS (Advisory, Conciliation and Arbitration Service)",
      contact: "0300 123 1100",
      website: "acas.org.uk",
      description: "Free advice on workplace rights and employment law",
      availability: "Mon-Fri 8am-6pm"
    },
    {
      channel: "Apprenticeship Support Helpline",
      contact: "0800 015 0400", 
      website: "gov.uk/apprenticeships-guide",
      description: "Help with apprenticeship-specific issues",
      availability: "Mon-Fri 9am-5pm"
    },
    {
      channel: "Citizens Advice",
      contact: "Visit local offices",
      website: "citizensadvice.org.uk",
      description: "General advice on employment rights and benefits",
      availability: "Varies by location"
    },
    {
      channel: "Unite the Union",
      contact: "0800 842 0069",
      website: "unitetheunion.org",
      description: "Trade union support for electrical workers",
      availability: "24/7 for emergencies"
    }
  ];

  const mentalHealthResources = [
    {
      service: "Samaritans",
      contact: "116 123",
      description: "Free confidential emotional support 24/7",
      type: "Crisis Support"
    },
    {
      service: "Andy's Man Club",
      contact: "Local groups nationwide",
      description: "Men's mental health support groups",
      type: "Peer Support"
    },
    {
      service: "Mind",
      contact: "0300 123 3393",
      description: "Mental health information and support",
      type: "Information & Support"
    },
    {
      service: "Mates in Mind",
      contact: "matesinmind.org",
      description: "Construction industry mental health charity",
      type: "Industry Specific"
    }
  ];

  const financialSupport = [
    {
      support: "Apprenticeship Bursary",
      amount: "Up to £1,000",
      description: "For care leavers and those receiving benefits",
      eligibility: "Specific criteria apply"
    },
    {
      support: "Advanced Learner Loan",
      amount: "Variable",
      description: "For Level 3+ apprenticeships if over 24",
      eligibility: "Age and course dependent"
    },
    {
      support: "Travel Support",
      amount: "Varies",
      description: "Help with travel costs to training",
      eligibility: "Low income households"
    },
    {
      support: "Hardship Fund",
      amount: "Case by case",
      description: "Emergency financial assistance",
      eligibility: "Training providers discretion"
    }
  ];

  const careerGuidance = [
    {
      service: "National Careers Service",
      description: "Free career guidance and advice",
      contact: "0800 100 900"
    },
    {
      service: "Construction Industry Training Board (CITB)",
      description: "Industry-specific career pathways",
      contact: "0344 994 4400"
    },
    {
      service: "ECS (Electrotechnical Certification Scheme)",
      description: "Qualification and certification guidance",
      contact: "0333 207 4230"
    },
    {
      service: "JIB (Joint Industry Board)",
      description: "Electrical industry grading and progression",
      contact: "020 7313 4800"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Phone className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Support When Things Go Wrong</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supportChannels.map((support, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{support.channel}</h4>
                    <p className="text-sm text-muted-foreground">{support.description}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow w-fit">
                      {support.contact}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{support.availability}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-blue-400">
                  <ExternalLink className="h-3 w-3" />
                  {support.website}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="mental-health" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="career">Career Guidance</TabsTrigger>
        </TabsList>

        <TabsContent value="mental-health">
          <Card className="border-purple-500/30 bg-purple-500/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-purple-400">Mental Health Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentalHealthResources.map((resource, index) => (
                  <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white">{resource.service}</h4>
                      <Badge variant="outline" className="border-purple-400/40 text-purple-400 text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <p className="text-sm text-purple-400 font-medium">{resource.contact}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <p className="text-sm text-purple-400 font-medium mb-1">Remember:</p>
                <p className="text-sm text-muted-foreground">
                  Mental health struggles are common and nothing to be ashamed of. 
                  Reaching out for help is a sign of strength, not weakness.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card className="border-green-500/30 bg-green-500/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                <CardTitle className="text-green-400">Financial Assistance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialSupport.map((support, index) => (
                  <div key={index} className="border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{support.support}</h4>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                        {support.amount}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{support.description}</p>
                    <p className="text-xs text-green-400">{support.eligibility}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <p className="text-sm text-blue-400 font-medium mb-1">How to Apply:</p>
                <p className="text-sm text-muted-foreground">
                  Contact your training provider first - they can help you access most financial support schemes 
                  and will know what's available in your area.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career">
          <Card className="border-blue-500/30 bg-blue-500/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <CardTitle className="text-blue-400">Career Guidance Services</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careerGuidance.map((service, index) => (
                  <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{service.service}</h4>
                      <Badge variant="outline" className="border-blue-400/40 text-blue-400">
                        {service.contact}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
                <p className="text-sm text-elec-yellow font-medium mb-1">Pro Tip:</p>
                <p className="text-sm text-muted-foreground">
                  Start thinking about your career progression early. The electrical industry offers many 
                  specialisations and advancement opportunities - it's never too early to plan your path.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportResourcesTab;
