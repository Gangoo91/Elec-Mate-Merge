import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Phone, 
  Globe, 
  Users, 
  BookOpen, 
  ExternalLink, 
  FileText, 
  Heart,
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  Briefcase
} from "lucide-react";

const SupportResourcesTab = () => {
  const isMobile = useIsMobile();

  // Key support metrics for electrical contractors
  const supportMetrics = [
    {
      metric: "Available Support Lines",
      data: "15+ dedicated business helplines",
      icon: <Phone className="h-5 w-5 text-blue-400" />,
      detail: "Government and industry-specific support available"
    },
    {
      metric: "Online Resources",
      data: "50+ official guidance sources",
      icon: <Globe className="h-5 w-5 text-elec-yellow" />,
      detail: "Free government and industry resources"
    },
    {
      metric: "Success Rate with Support",
      data: "90% business success with mentoring",
      icon: <Users className="h-5 w-5 text-green-400" />,
      detail: "Mentored businesses have higher survival rates"
    },
    {
      metric: "Training Providers",
      data: "100+ certified course providers",
      icon: <BookOpen className="h-5 w-5 text-purple-400" />,
      detail: "Nationwide electrical training availability"
    }
  ];

  const emergencySupport = [
    {
      category: "Financial Crisis Support",
      urgency: "24/7",
      services: [
        {
          name: "Business Debt Helpline",
          contact: "0800 197 6026",
          description: "Free debt advice for business owners",
          availability: "Monday-Friday 9am-8pm, Saturday 9:30am-1pm"
        },
        {
          name: "Citizens Advice Business Support",
          contact: "0808 223 1133",
          description: "Emergency financial and legal guidance",
          availability: "24/7 online, telephone hours vary"
        },
        {
          name: "HMRC Business Payment Support",
          contact: "0300 200 3835",
          description: "Tax payment difficulties and Time to Pay arrangements",
          availability: "Monday-Friday 8am-6pm"
        }
      ]
    },
    {
      category: "Mental Health & Wellbeing",
      urgency: "Immediate",
      services: [
        {
          name: "Samaritans",
          contact: "116 123",
          description: "Free 24/7 emotional support for anyone in distress",
          availability: "24/7, 365 days a year"
        },
        {
          name: "Mind Business Support",
          contact: "0300 123 3393",
          description: "Mental health advice for business owners",
          availability: "Monday-Friday 9am-6pm"
        },
        {
          name: "Business in the Community Wellbeing",
          contact: "020 7566 8650",
          description: "Business wellbeing support and resources",
          availability: "Monday-Friday 9am-5pm"
        }
      ]
    }
  ];

  const businessHelplines = [
    {
      category: "Government Business Support",
      services: [
        {
          name: "GOV.UK Business Support",
          contact: "0345 600 9006",
          description: "General business guidance and signposting to support",
          speciality: "Regulations, licensing, grants",
          cost: "Free"
        },
        {
          name: "HMRC New Employer Helpline",
          contact: "0300 200 3211", 
          description: "Tax, PAYE, and employment guidance for new businesses",
          speciality: "Tax obligations, PAYE setup",
          cost: "Free"
        },
        {
          name: "Companies House Support",
          contact: "0303 123 4500",
          description: "Company registration and filing requirements",
          speciality: "Company formation, annual returns",
          cost: "Free"
        }
      ]
    },
    {
      category: "Industry-Specific Support",
      services: [
        {
          name: "NICEIC Technical Helpline",
          contact: "0333 015 6626",
          description: "Technical electrical queries and regulations guidance",
          speciality: "BS 7671, Part P, certification",
          cost: "Members only"
        },
        {
          name: "NAPIT Technical Support",
          contact: "0845 543 0330",
          description: "Electrical regulations and compliance advice",
          speciality: "Competent person schemes, technical queries",
          cost: "Members only"
        },
        {
          name: "Electrical Safety First",
          contact: "020 3463 5100",
          description: "Electrical safety guidance and best practices",
          speciality: "Safety standards, product recalls",
          cost: "Free"
        }
      ]
    }
  ];

  const onlineResources = [
    {
      category: "Government Resources",
      platforms: [
        {
          name: "GOV.UK Business Support",
          url: "https://www.gov.uk/browse/business",
          description: "Comprehensive business guidance including licensing and regulations",
          features: ["Business planning tools", "Regulatory guidance", "Grant finder"],
          cost: "Free"
        },
        {
          name: "Companies House WebFiling",
          url: "https://www.gov.uk/government/organisations/companies-house",
          description: "Online company registration and management",
          features: ["Company formation", "Annual returns", "Director changes"],
          cost: "Statutory fees apply"
        },
        {
          name: "HMRC Business Tax Account",
          url: "https://www.gov.uk/government/organisations/hm-revenue-customs",
          description: "Manage business taxes, PAYE, and VAT online",
          features: ["Tax returns", "Payment schedules", "PAYE management"],
          cost: "Free"
        }
      ]
    },
    {
      category: "Industry Resources",
      platforms: [
        {
          name: "IET Wiring Regulations",
          url: "https://electrical.theiet.org/wiring-regulations",
          description: "Official BS 7671 regulations and guidance",
          features: ["Regulation updates", "Technical guidance", "Online courses"],
          cost: "Membership required"
        },
        {
          name: "Electrical Contractors' Association",
          url: "https://www.eca.co.uk",
          description: "Trade association with business support and networking",
          features: ["Business templates", "Legal guidance", "Networking events"],
          cost: "Membership fees"
        },
        {
          name: "BEAMA Industry Standards",
          url: "https://www.beama.org.uk",
          description: "Manufacturing standards and technical resources",
          features: ["Product standards", "Technical bulletins", "Safety alerts"],
          cost: "Free"
        }
      ]
    }
  ];

  const mentorshipPrograms = [
    {
      category: "Business Mentorship",
      programs: [
        {
          name: "Prince's Trust Enterprise Programme",
          description: "Comprehensive support for entrepreneurs aged 18-30",
          benefits: ["1-to-1 mentoring", "Business loans", "Marketing support"],
          eligibility: "18-30 years old, business idea or early-stage business",
          duration: "12-18 months",
          cost: "Free"
        },
        {
          name: "Local Enterprise Partnerships (LEPs)",
          description: "Regional business support and mentoring networks",
          benefits: ["Local market insights", "Networking", "Grant opportunities"],
          eligibility: "SMEs in specific regions",
          duration: "Ongoing",
          cost: "Usually free"
        },
        {
          name: "Federation of Small Businesses Mentoring",
          description: "Peer-to-peer mentoring for small business owners",
          benefits: ["Experienced mentors", "Industry expertise", "Business networks"],
          eligibility: "FSB members",
          duration: "6-12 months",
          cost: "Membership fees"
        }
      ]
    },
    {
      category: "Technical Mentorship",
      programs: [
        {
          name: "NICEIC Contractor Development",
          description: "Technical and business development for electrical contractors",
          benefits: ["Technical guidance", "Business planning", "Compliance support"],
          eligibility: "NICEIC members or applicants",
          duration: "Ongoing",
          cost: "Included in membership"
        },
        {
          name: "ECA Apprentice to Business Owner",
          description: "Pathway programme for electricians starting their own business",
          benefits: ["Business skills training", "Legal guidance", "Peer support"],
          eligibility: "ECA members, qualified electricians",
          duration: "6 months",
          cost: "Member rates"
        }
      ]
    }
  ];

  const trainingProviders = [
    {
      category: "Electrical Qualifications",
      providers: [
        {
          name: "City & Guilds",
          speciality: "Comprehensive electrical qualifications",
          courses: ["Level 3 Electrical Installation", "18th Edition", "Testing & Inspection"],
          locations: "Nationwide",
          features: ["Flexible learning", "Industry recognition", "Career support"]
        },
        {
          name: "EAL Awards",
          speciality: "Vocational electrical engineering qualifications",
          courses: ["Electrical Installation", "Renewable Energy", "Smart Technology"],
          locations: "UK-wide",
          features: ["Practical focus", "Industry partnerships", "Modern facilities"]
        },
        {
          name: "NICEIC Training Academy",
          speciality: "Industry-specific courses and updates",
          courses: ["Part P Training", "Solar PV", "EV Charging Installation"],
          locations: "Regional centres",
          features: ["Industry expertise", "Certification", "Ongoing support"]
        }
      ]
    },
    {
      category: "Business Skills Training",
      providers: [
        {
          name: "Start Up Loans Business School",
          speciality: "Free business training for entrepreneurs",
          courses: ["Business Planning", "Financial Management", "Marketing"],
          locations: "Online and regional",
          features: ["Free training", "Expert tutors", "Ongoing support"]
        },
        {
          name: "British Chambers of Commerce",
          speciality: "Business development and export training",
          courses: ["Business Growth", "Export Documentation", "Digital Marketing"],
          locations: "Local chambers",
          features: ["Local focus", "Networking", "Government accredited"]
        }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Heart className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          Support networks increase business success rates by 300% - you don't have to build your electrical business alone.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {supportMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>{metric.metric}</div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="emergency-support">
          <MobileAccordionTrigger icon={<AlertCircle className="h-5 w-5 text-red-400" />}>
            Emergency Support Services
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {emergencySupport.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-red-300 ${isMobile ? 'text-sm' : 'text-base'} border-b border-red-500/20 pb-1`}>
                    {category.category}
                  </h4>
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="border border-red-500/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{service.name}</h5>
                        <Badge variant="outline" className={`text-red-300 border-red-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {service.contact}
                        </Badge>
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{service.description}</p>
                      
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                        <h6 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Availability</h6>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{service.availability}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="helplines">
          <MobileAccordionTrigger icon={<Phone className="h-5 w-5 text-blue-400" />}>
            Business Helplines & Support
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {businessHelplines.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-blue-300 ${isMobile ? 'text-sm' : 'text-base'} border-b border-blue-500/20 pb-1`}>
                    {category.category}
                  </h4>
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="border border-blue-500/20 rounded-lg p-3 space-y-2">
                      <div className={`${isMobile ? 'text-center space-y-2' : 'flex items-center justify-between'}`}>
                        <h5 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{service.name}</h5>
                        <div className={`flex items-center gap-2 ${isMobile ? 'justify-center' : ''}`}>
                          <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {service.contact}
                          </Badge>
                          <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {service.cost}
                          </Badge>
                        </div>
                      </div>
                      <p className={`${isMobile ? 'text-xs text-center' : 'text-sm'} text-muted-foreground`}>{service.description}</p>
                      
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                        <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Speciality: {service.speciality}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="online-resources">
          <MobileAccordionTrigger icon={<Globe className="h-5 w-5 text-green-400" />}>
            Online Resources & Platforms
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {onlineResources.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-green-300 ${isMobile ? 'text-sm' : 'text-base'} border-b border-green-500/20 pb-1`}>
                    {category.category}
                  </h4>
                  {category.platforms.map((platform, platformIndex) => (
                    <div key={platformIndex} className="border border-green-500/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{platform.name}</h5>
                        <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {platform.cost}
                        </Badge>
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{platform.description}</p>
                      
                      <div>
                        <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Features</h6>
                        <div className="flex flex-wrap gap-1">
                          {platform.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="outline" className={`text-green-200 border-green-400/20 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="mentorship">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-purple-400" />}>
            Mentorship & Networking Programs
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {mentorshipPrograms.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-purple-300 ${isMobile ? 'text-sm' : 'text-base'} border-b border-purple-500/20 pb-1`}>
                    {category.category}
                  </h4>
                  {category.programs.map((program, programIndex) => (
                    <div key={programIndex} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                      <div className="flex flex-col gap-2">
                        <div className={`${isMobile ? 'text-center space-y-1' : 'flex items-center justify-between'}`}>
                          <h5 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{program.name}</h5>
                          <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {program.cost}
                          </Badge>
                        </div>
                        <p className={`${isMobile ? 'text-xs text-center' : 'text-sm'} text-muted-foreground`}>{program.description}</p>
                      </div>

                      <div>
                        <h6 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Benefits</h6>
                        <div className="flex flex-wrap gap-1">
                          {program.benefits.map((benefit, benefitIndex) => (
                            <Badge key={benefitIndex} variant="outline" className={`text-purple-200 border-purple-400/20 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                        <div className="flex flex-col gap-1">
                          <div className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                            <span className="font-medium text-blue-300">Duration: </span>
                            <span className="text-blue-200">{program.duration}</span>
                          </div>
                          <div className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                            <span className="font-medium text-blue-300">Eligibility: </span>
                            <span className="text-blue-200">{program.eligibility}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="training">
          <MobileAccordionTrigger icon={<BookOpen className="h-5 w-5 text-orange-400" />}>
            Training Providers & Education
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {trainingProviders.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-orange-300 ${isMobile ? 'text-sm' : 'text-base'} border-b border-orange-500/20 pb-1`}>
                    {category.category}
                  </h4>
                  {category.providers.map((provider, providerIndex) => (
                    <div key={providerIndex} className="border border-orange-500/20 rounded-lg p-3 space-y-2">
                      <div className={`${isMobile ? 'text-center space-y-1' : 'flex items-center justify-between'}`}>
                        <h5 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{provider.name}</h5>
                        <Badge variant="outline" className={`text-orange-300 border-orange-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {provider.locations}
                        </Badge>
                      </div>
                      <p className={`${isMobile ? 'text-xs text-center' : 'text-sm'} text-muted-foreground`}>{provider.speciality}</p>
                      
                      <div>
                        <h6 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Popular Courses</h6>
                        <div className="flex flex-wrap gap-1">
                          {provider.courses.map((course, courseIndex) => (
                            <Badge key={courseIndex} variant="outline" className={`text-orange-200 border-orange-400/20 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {provider.features && (
                        <div>
                          <h6 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Features</h6>
                          <div className="flex flex-wrap gap-1">
                            {provider.features.map((feature, featureIndex) => (
                              <Badge key={featureIndex} variant="outline" className={`text-orange-200 border-orange-400/20 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default SupportResourcesTab;
