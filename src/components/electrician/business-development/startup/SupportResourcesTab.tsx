
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
      url: "https://www.gov.uk/browse/business",
      description: "Official government guidance for starting a business",
      category: "Government"
    },
    {
      name: "NICEIC Business Resources",
      url: "https://www.niceic.com/business-support",
      description: "Industry-specific guidance and support",
      category: "Industry Body"
    },
    {
      name: "NAPIT Business Support",
      url: "https://www.napit.org.uk/business-support",
      description: "Competent person scheme with business guidance",
      category: "Industry Body"
    },
    {
      name: "Electrical Contractors' Association",
      url: "https://www.eca.co.uk",
      description: "Industry body with resources and networking",
      category: "Industry Body"
    },
    {
      name: "FSB (Federation of Small Businesses)",
      url: "https://www.fsb.org.uk",
      description: "Support, advice and protection for small businesses",
      category: "Business Support"
    },
    {
      name: "British Electrotechnical & Allied Manufacturers Association",
      url: "https://www.beama.org.uk",
      description: "Industry standards and technical resources",
      category: "Industry Body"
    },
    {
      name: "Health & Safety Executive (HSE)",
      url: "https://www.hse.gov.uk/electricity",
      description: "Electrical safety regulations and guidance",
      category: "Safety"
    },
    {
      name: "IET Wiring Regulations",
      url: "https://electrical.theiet.org/wiring-regulations",
      description: "BS 7671 wiring regulations and updates",
      category: "Standards"
    },
    {
      name: "Companies House",
      url: "https://www.gov.uk/government/organisations/companies-house",
      description: "Register your company and file annual returns",
      category: "Government"
    },
    {
      name: "HMRC Business Support",
      url: "https://www.gov.uk/government/organisations/hm-revenue-customs/contact/new-employer-enquiries",
      description: "Tax guidance for new business owners",
      category: "Government"
    }
  ];

  const mentorshipPrograms = [
    {
      name: "SCORE Mentorship",
      description: "Free business mentoring for entrepreneurs",
      benefits: ["One-on-one guidance", "Industry expertise", "Business plan review"],
      url: "https://www.score.org"
    },
    {
      name: "Prince's Trust Enterprise",
      description: "Support for young entrepreneurs (18-30)",
      benefits: ["Funding opportunities", "Mentoring", "Business training"],
      url: "https://www.princes-trust.org.uk/support-our-work/programmes/enterprise"
    },
    {
      name: "Local Enterprise Partnerships",
      description: "Regional business support networks",
      benefits: ["Local market insights", "Networking events", "Grant opportunities"],
      url: "https://www.lepnetwork.net"
    },
    {
      name: "Business Mentors Alliance",
      description: "Industry-specific mentoring for electrical contractors",
      benefits: ["Technical guidance", "Business development", "Client acquisition"],
      url: "https://www.businessmentorsalliance.org"
    }
  ];

  const trainingProviders = [
    {
      name: "City & Guilds",
      speciality: "Electrical qualifications and apprenticeships",
      courses: ["Level 3 Electrical Installation", "18th Edition", "Testing & Inspection"],
      url: "https://www.cityandguilds.com"
    },
    {
      name: "EAL Awards",
      speciality: "Vocational qualifications in electrical engineering",
      courses: ["Electrical Installation", "Renewable Energy", "Smart Technology"],
      url: "https://www.eal.org.uk"
    },
    {
      name: "NICEIC Training",
      speciality: "Industry-specific courses and updates",
      courses: ["Part P Training", "Solar PV", "EV Charging Points"],
      url: "https://www.niceic.com/training"
    }
  ];

  const industryEvents = [
    {
      name: "Electrical Safety First Annual Conference",
      type: "Safety & Standards",
      frequency: "Annual - September",
      benefits: ["Latest safety updates", "Networking", "CPD points"]
    },
    {
      name: "IET Electrical Exhibition",
      type: "Technology & Innovation",
      frequency: "Biennial - March",
      benefits: ["New technologies", "Product demos", "Technical seminars"]
    },
    {
      name: "Local Electrical Trade Shows",
      type: "Regional Networking",
      frequency: "Various dates",
      benefits: ["Supplier connections", "Local market insights", "Cost comparisons"]
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
            <div key={index} className="p-4 border border-green-500/20 rounded-lg bg-green-500/5">
              <div className="space-y-3">
                <h4 className="font-semibold text-white text-lg">{resource.name}</h4>
                <p className="text-muted-foreground">{resource.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-green-500/30 text-green-300 hover:bg-green-500/20"
                  onClick={() => window.open(resource.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit
                </Button>
              </div>
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
        <CardContent className="grid gap-4 md:grid-cols-2">
          {mentorshipPrograms.map((program, index) => (
            <div key={index} className="p-4 border border-purple-500/20 rounded-lg bg-purple-500/5 space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium text-white">{program.name}</h4>
                <p className="text-sm text-muted-foreground">{program.description}</p>
                <div className="flex flex-wrap gap-1">
                  {program.benefits.map((benefit, benefitIndex) => (
                    <Badge key={benefitIndex} variant="outline" className="text-purple-300 border-purple-400/30 text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                onClick={() => window.open(program.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-amber-500/50 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Training Providers
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          {trainingProviders.map((provider, index) => (
            <div key={index} className="p-4 border border-amber-500/20 rounded-lg bg-amber-500/5 space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium text-white">{provider.name}</h4>
                <p className="text-sm text-muted-foreground">{provider.speciality}</p>
                <div className="space-y-1">
                  <h5 className="text-xs font-medium text-amber-300">Popular Courses:</h5>
                  <div className="flex flex-wrap gap-1">
                    {provider.courses.map((course, courseIndex) => (
                      <Badge key={courseIndex} variant="outline" className="text-amber-400 border-amber-400/30 text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                onClick={() => window.open(provider.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-cyan-500/50 bg-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Industry Events & Networking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {industryEvents.map((event, index) => (
            <div key={index} className="p-4 border border-cyan-500/20 rounded-lg bg-cyan-500/5 space-y-3">
              <h4 className="font-semibold text-white text-lg">{event.name}</h4>
              <p className="text-cyan-200">{event.frequency}</p>
              <div className="flex flex-wrap gap-1">
                {event.benefits.map((benefit, benefitIndex) => (
                  <Badge key={benefitIndex} variant="outline" className="text-cyan-400 border-cyan-400/30 text-xs">
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
