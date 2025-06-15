
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
      availability: "Monday to Friday, 9am to 6pm",
      website: "gov.uk/business-support"
    },
    {
      name: "HMRC New Employer Helpline",
      phone: "0300 200 3211",
      description: "Help with tax and employment matters",
      availability: "Monday to Friday, 8am to 8pm",
      website: "gov.uk/contact-hmrc"
    },
    {
      name: "NICEIC Technical Helpline",
      phone: "0333 015 6626",
      description: "Technical and compliance support",
      availability: "Monday to Friday, 8:30am to 5pm",
      website: "niceic.com"
    },
    {
      name: "Citizens Advice Business Support",
      phone: "0800 138 7777",
      description: "Free business advice and guidance",
      availability: "Monday to Friday, 9am to 5pm",
      website: "citizensadvice.org.uk"
    }
  ];

  const fundingOptions = [
    {
      name: "Start Up Loans",
      amount: "£500 - £25,000",
      description: "Government-backed loans for new businesses",
      rate: "6% fixed rate",
      eligibility: "UK resident, viable business plan",
      website: "startuploans.co.uk"
    },
    {
      name: "New Enterprise Allowance",
      amount: "£1,274 + £200/week",
      description: "For unemployed people starting a business",
      rate: "Grant + weekly allowance",
      eligibility: "Currently claiming benefits",
      website: "gov.uk/new-enterprise-allowance"
    },
    {
      name: "Prince's Trust Enterprise",
      amount: "Up to £7,500",
      description: "For 18-30 year olds starting a business",
      rate: "Low interest loan + grant",
      eligibility: "Age 18-30, business plan required",
      website: "princes-trust.org.uk"
    },
    {
      name: "Bounce Back Loan Scheme",
      amount: "£2,000 - £50,000",
      description: "Government-guaranteed business loans",
      rate: "2.5% after first year",
      eligibility: "Established business affected by COVID",
      website: "british-business-bank.co.uk"
    }
  ];

  const mentorshipPrograms = [
    {
      name: "SCORE Mentors",
      description: "Free business mentoring from experienced professionals",
      benefits: ["One-on-one mentoring", "Industry expertise", "Business plan review", "Ongoing support"],
      contact: "score.org.uk"
    },
    {
      name: "ECA Mentoring Scheme",
      description: "Electrical industry specific mentoring",
      benefits: ["Technical guidance", "Business development", "Industry connections", "Career progression"],
      contact: "eca.co.uk"
    },
    {
      name: "Local Enterprise Partnerships",
      description: "Regional business support and mentoring",
      benefits: ["Local market knowledge", "Networking events", "Grant opportunities", "Training programs"],
      contact: "lepnetwork.net"
    }
  ];

  const resources = [
    {
      name: "GOV.UK Business Support",
      url: "gov.uk/browse/business",
      description: "Official government guidance for starting a business",
      category: "Government"
    },
    {
      name: "NICEIC Business Resources",
      url: "niceic.com/business-support",
      description: "Industry-specific guidance and support",
      category: "Industry"
    },
    {
      name: "Electrical Contractors' Association",
      url: "eca.co.uk",
      description: "Industry body with resources and networking",
      category: "Industry"
    },
    {
      name: "Small Business Support Network",
      url: "smallbusiness.co.uk",
      description: "Comprehensive business advice and resources",
      category: "Business"
    },
    {
      name: "HMRC Business Tax Support",
      url: "gov.uk/topic/business-tax",
      description: "Tax guidance for new businesses",
      category: "Tax & Legal"
    },
    {
      name: "Companies House",
      url: "companieshouse.gov.uk",
      description: "Business registration and filing services",
      category: "Legal"
    }
  ];

  const trainingProviders = [
    {
      name: "City & Guilds",
      courses: ["Business Skills", "Health & Safety", "Management Training"],
      description: "Recognised qualifications and business training",
      website: "cityandguilds.com"
    },
    {
      name: "Electrical Training Alliance",
      courses: ["Advanced Electrical", "Business Management", "Customer Service"],
      description: "Industry-specific training and development",
      website: "eta.org.uk"
    },
    {
      name: "NEBOSH",
      courses: ["Health & Safety Management", "Risk Assessment", "Construction Safety"],
      description: "Health and safety qualifications",
      website: "nebosh.org.uk"
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
            <div key={index} className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <h4 className="font-medium text-white mb-2">{helpline.name}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-blue-300 border-blue-400/30">
                      {helpline.phone}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{helpline.description}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200 mb-1">{helpline.availability}</p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit Website
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Funding & Financial Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fundingOptions.map((option, index) => (
            <div key={index} className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-white">{option.name}</h4>
                <Badge className="bg-green-500/20 text-green-300">{option.amount}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-green-200 mb-1">
                    <strong>Rate:</strong> {option.rate}
                  </p>
                  <p className="text-sm text-green-200">
                    <strong>Eligibility:</strong> {option.eligibility}
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Mentorship & Networking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mentorshipPrograms.map((program, index) => (
            <div key={index} className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
              <h4 className="font-medium text-white mb-2">{program.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {program.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center gap-2 text-sm text-orange-200">
                    <CheckCircle className="h-3 w-3" />
                    {benefit}
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                Join Program
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Online Resources & Training
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {resources.map((resource, index) => (
              <div key={index} className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{resource.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {resource.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Visit
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t border-purple-500/20 pt-4">
            <h4 className="font-medium text-purple-200 mb-3">Professional Development Training</h4>
            <div className="space-y-3">
              {trainingProviders.map((provider, index) => (
                <div key={index} className="p-3 bg-purple-500/5 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-medium text-white">{provider.name}</h5>
                      <p className="text-sm text-muted-foreground mb-2">{provider.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.courses.map((course, courseIndex) => (
                          <Badge key={courseIndex} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Explore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportResourcesTab;
