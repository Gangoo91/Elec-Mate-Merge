
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, Mail, Globe, MessageCircle, FileText, Users, Heart, ExternalLink, Clock, HelpCircle } from "lucide-react";

const SupportResourcesTab = () => {
  const emergencyContacts = [
    {
      name: "ACAS (Advisory, Conciliation and Arbitration Service)",
      phone: "0300 123 1100",
      description: "Free employment advice and support",
      availability: "Monday to Friday, 8am to 6pm",
      website: "acas.org.uk"
    },
    {
      name: "Apprenticeship Support Helpline",
      phone: "0800 015 0400",
      description: "Government support for apprentices and employers",
      availability: "Monday to Friday, 8am to 10pm",
      website: "apprenticeships.gov.uk"
    },
    {
      name: "CITB Apprenticeship Support",
      phone: "0344 994 4400",
      description: "Construction industry training support",
      availability: "Monday to Friday, 8am to 5pm",
      website: "citb.co.uk"
    }
  ];

  const onlineResources = [
    {
      name: "GOV.UK Apprenticeships Guide",
      url: "gov.uk/apprenticeships-guide",
      description: "Official government guidance on apprentice rights and responsibilities",
      category: "Government"
    },
    {
      name: "ACAS Apprentice Guide",
      url: "acas.org.uk/apprentices",
      description: "Employment rights and workplace issues for apprentices",
      category: "Employment Rights"
    },
    {
      name: "Citizens Advice",
      url: "citizensadvice.org.uk",
      description: "Free advice on work, benefits, and legal issues",
      category: "General Support"
    },
    {
      name: "CITB Apprentice Hub",
      url: "citb.co.uk/apprentices",
      description: "Construction-specific apprentice resources and support",
      category: "Industry Specific"
    },
    {
      name: "National Apprenticeship Service",
      url: "apprenticeships.gov.uk",
      description: "Find training providers, employers, and career information",
      category: "Career Development"
    }
  ];

  const tradeUnions = [
    {
      name: "Unite the Union",
      description: "UK's largest trade union representing electrical workers",
      benefits: ["Legal support", "Workplace representation", "Training opportunities", "Discounted services"],
      contact: "0800 842 0069",
      website: "unitetheunion.org"
    },
    {
      name: "GMB Union",
      description: "General union with strong electrical sector representation",
      benefits: ["24/7 legal helpline", "Career development", "Workplace protection", "Member benefits"],
      contact: "020 7391 6700",
      website: "gmb.org.uk"
    },
    {
      name: "EIS (Electrical Installation Section)",
      description: "Specialist section for electrical installation workers",
      benefits: ["Technical support", "Industry advocacy", "Specialist training", "Networking"],
      contact: "Via Unite the Union",
      website: "unitetheunion.org/sectors/electrical"
    }
  ];

  const trainingProviders = [
    {
      name: "Local Further Education Colleges",
      services: ["Level 3 Electrical Installation", "Functional Skills", "Additional qualifications"],
      support: ["Learning support", "Study skills", "Career guidance"],
      cost: "Government funded for 16-18 year olds"
    },
    {
      name: "Private Training Providers",
      services: ["Flexible delivery", "Workplace assessment", "Additional certifications"],
      support: ["One-to-one tutoring", "Digital learning platforms", "Progress tracking"],
      cost: "Various funding options available"
    },
    {
      name: "Industry Training Centres",
      services: ["Specialist equipment training", "Advanced techniques", "Industry updates"],
      support: ["Expert instruction", "Real-world scenarios", "Career networking"],
      cost: "Employer funded or apprenticeship levy"
    }
  ];

  const mentorshipResources = [
    {
      resource: "Industry Mentorship Programmes",
      description: "Formal mentoring schemes connecting apprentices with experienced electricians",
      providers: ["CITB", "ECA", "NICEIC", "Local electrical associations"],
      benefits: ["Career guidance", "Technical support", "Industry insights", "Networking opportunities"]
    },
    {
      resource: "Peer Support Networks",
      description: "Connect with other apprentices for mutual support and learning",
      providers: ["Apprentice forums", "Social media groups", "Local apprentice meetups"],
      benefits: ["Shared experiences", "Study groups", "Problem solving", "Motivation"]
    },
    {
      resource: "Digital Learning Communities",
      description: "Online platforms for apprentice support and resources",
      providers: ["LinkedIn groups", "Facebook communities", "Specialised forums"],
      benefits: ["24/7 support", "Resource sharing", "Q&A with experts", "Career advice"]
    }
  ];

  const wellbeingSupport = [
    {
      service: "Mental Health First Aid",
      description: "Support for stress, anxiety, and mental health issues",
      providers: ["Samaritans: 116 123", "Mind: 0300 123 3393", "Workplace counselling services"],
      availability: "24/7 support available"
    },
    {
      service: "Financial Support",
      description: "Help with financial difficulties and budgeting",
      providers: ["Citizens Advice", "StepChange Debt Charity", "Local credit unions"],
      availability: "Free advice and support"
    },
    {
      service: "Housing Support",
      description: "Assistance with accommodation issues",
      providers: ["Local housing associations", "Shelter: 0808 800 4444", "Local councils"],
      availability: "Emergency support available"
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Heart className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          Remember: Asking for help is a sign of strength, not weakness. Early support prevents small issues becoming big problems.
        </AlertDescription>
      </Alert>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Support & Helplines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="space-y-3 border border-red-500/20 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-white">{contact.name}</h4>
                <Badge variant="outline" className="text-red-300 border-red-400/30">
                  {contact.phone}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{contact.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-red-200 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {contact.availability}
                </span>
                <span className="text-red-300">{contact.website}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Online Resources & Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {onlineResources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between border border-blue-500/20 rounded-lg p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-white">{resource.name}</h4>
                  <Badge variant="outline" className="text-blue-300 border-blue-400/30 text-xs">
                    {resource.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                <p className="text-xs text-blue-300 mt-1">{resource.url}</p>
              </div>
              <Button variant="outline" size="sm" className="border-blue-500/30">
                <ExternalLink className="h-4 w-4" />
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
            <div key={index} className="space-y-3 border border-green-500/20 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-white">{union.name}</h4>
                <Badge variant="outline" className="text-green-300 border-green-400/30">
                  {union.contact}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{union.description}</p>
              <div className="flex flex-wrap gap-2">
                {union.benefits.map((benefit, benefitIndex) => (
                  <Badge key={benefitIndex} variant="outline" className="text-green-300 border-green-400/30 text-xs">
                    {benefit}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-green-300">{union.website}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Training Provider Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trainingProviders.map((provider, index) => (
            <div key={index} className="space-y-3 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-medium text-white">{provider.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-purple-300 mb-2">Services</h5>
                  <ul className="space-y-1">
                    {provider.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="text-xs text-purple-200 flex items-center gap-1">
                        <div className="w-1 h-1 bg-purple-400 rounded-full" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-300 mb-2">Support</h5>
                  <ul className="space-y-1">
                    {provider.support.map((supportItem, supportIndex) => (
                      <li key={supportIndex} className="text-xs text-purple-200 flex items-center gap-1">
                        <div className="w-1 h-1 bg-purple-400 rounded-full" />
                        {supportItem}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-300 mb-2">Funding</h5>
                  <p className="text-xs text-purple-200">{provider.cost}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Mentorship & Peer Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mentorshipResources.map((resource, index) => (
            <div key={index} className="space-y-3 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-medium text-white">{resource.resource}</h4>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
              <div>
                <h5 className="font-medium text-orange-300 mb-2">Available Through</h5>
                <div className="flex flex-wrap gap-2">
                  {resource.providers.map((provider, providerIndex) => (
                    <Badge key={providerIndex} variant="outline" className="text-orange-300 border-orange-400/30 text-xs">
                      {provider}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-orange-300 mb-2">Benefits</h5>
                <div className="flex flex-wrap gap-2">
                  {resource.benefits.map((benefit, benefitIndex) => (
                    <Badge key={benefitIndex} variant="outline" className="text-orange-200 border-orange-400/20 text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-pink-500/50 bg-pink-500/10">
        <CardHeader>
          <CardTitle className="text-pink-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Wellbeing & Personal Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {wellbeingSupport.map((support, index) => (
            <div key={index} className="space-y-3 border border-pink-500/20 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-white">{support.service}</h4>
                <Badge variant="outline" className="text-pink-300 border-pink-400/30 text-xs">
                  {support.availability}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{support.description}</p>
              <p className="text-sm text-pink-200">{support.providers}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Document Everything & Know Your Rights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">Keep Records Of</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">Date, time, and details of any incidents</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">Names of witnesses present</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">Copies of any written communications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">Medical records if injured</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Your Key Rights</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-400" />
                  <span className="text-muted-foreground">20% off-the-job training time</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-400" />
                  <span className="text-muted-foreground">Qualified mentor support</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-400" />
                  <span className="text-muted-foreground">Safe working environment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-400" />
                  <span className="text-muted-foreground">Right to raise concerns</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportResourcesTab;
