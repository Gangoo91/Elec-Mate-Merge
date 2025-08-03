
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle, 
  FileText, 
  Users, 
  Heart, 
  ExternalLink, 
  Clock, 
  HelpCircle,
  Shield,
  TrendingUp,
  CheckCircle,
  Award,
  Target,
  Eye,
  BarChart3,
  Brain
} from "lucide-react";

const SupportResourcesTab = () => {
  const isMobile = useIsMobile();

  // Updated for 2025 - Key support metrics for employer focus
  const supportMetrics = [
    {
      metric: "Early Support Impact",
      data: "75% reduction in apprentice dropout risk",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      detail: "Timely support intervention prevents most apprentice failures"
    },
    {
      metric: "Average Response Time",
      data: "24 hours for critical support needs",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Professional support networks provide rapid assistance"
    },
    {
      metric: "Support Effectiveness",
      data: "90% of issues resolved within one week",
      icon: <Target className="h-5 w-5 text-elec-yellow" />,
      detail: "Structured support pathways ensure quick problem resolution"
    },
    {
      metric: "Mental Health ROI",
      data: "£5.20 saved per £1 invested in wellbeing",
      icon: <Heart className="h-5 w-5 text-purple-400" />,
      detail: "Proactive mental health support reduces sick leave and turnover"
    }
  ];

  // 2025 Digital Support Framework
  const digitalSupportPlatforms = [
    {
      platform: "AI-Powered Apprentice Support Hub",
      timing: "24/7 Availability",
      description: "Modern digital support platform with intelligent triage and instant guidance",
      components: [
        "24/7 AI chatbot for immediate basic queries and guidance",
        "Smart routing to appropriate human specialists within 2 hours",
        "Digital mental health screening and wellbeing resources",
        "Personalised support recommendations based on apprentice profile"
      ],
      employerBenefit: "Reduced supervisor burden while ensuring comprehensive apprentice support",
      accessPoints: ["Mobile app", "Web portal", "SMS service", "Voice activation"]
    },
    {
      platform: "Professional Crisis Intervention Network",
      timing: "Emergency Response",
      description: "Rapid response system for serious workplace or personal issues",
      components: [
        "Direct hotline to qualified counsellors and advisors",
        "Emergency workplace mediation and conflict resolution",
        "Legal advice triage for employment and training disputes",
        "Immediate safety and wellbeing assessment protocols"
      ],
      employerBenefit: "Professional crisis management reduces business disruption and liability",
      accessPoints: ["0800 emergency line", "Text crisis service", "Video counselling", "In-person visits"]
    },
    {
      platform: "Peer & Community Support Networks",
      timing: "Ongoing Community Building",
      description: "Building resilient apprentice communities with peer support systems",
      components: [
        "Moderated online communities for apprentice peer support",
        "Local apprentice meetups and networking events",
        "Mentor matching with experienced qualified electricians",
        "Skills-sharing workshops and collaborative learning sessions"
      ],
      employerBenefit: "Stronger apprentice retention through community belonging",
      accessPoints: ["Social platforms", "Local venues", "Company networks", "Industry events"]
    }
  ];

  const supportCategoryFramework = [
    {
      category: "Professional & Career Support",
      services: [
        {
          service: "Career Development Guidance",
          description: "Professional planning and progression support",
          providers: ["CITB Career Advisors", "Industry Mentorship Programmes", "Professional Bodies"],
          access: "Online booking + video consultations + local meetings",
          impact: "Clear career pathway reduces uncertainty and improves motivation"
        },
        {
          service: "Skills Development Support",
          description: "Additional training and competency development assistance",
          providers: ["Training Provider Support Teams", "Industry Skills Councils", "Employer Learning Coordinators"],
          access: "Integrated with training programmes + on-demand resources",
          impact: "Accelerated competency development and confidence building"
        }
      ]
    },
    {
      category: "Personal & Mental Wellbeing",
      services: [
        {
          service: "Mental Health & Resilience Support",
          description: "Comprehensive mental health services and stress management",
          providers: ["NHS Psychological Wellbeing Services", "Industry Wellbeing Programmes", "Employer Assistance Programmes"],
          access: "Self-referral + manager referral + emergency access",
          impact: "Reduced sick leave, improved performance and retention"
        },
        {
          service: "Financial Guidance & Support",
          description: "Money management, budgeting and financial crisis support",
          providers: ["Citizens Advice", "Financial Conduct Authority", "Industry Hardship Funds"],
          access: "Free face-to-face + online tools + emergency support",
          impact: "Financial stability enables focus on learning and development"
        }
      ]
    },
    {
      category: "Legal & Employment Rights",
      services: [
        {
          service: "Employment Rights Advisory",
          description: "Legal guidance on workplace rights and employment issues",
          providers: ["ACAS", "Trade Unions", "Employment Law Specialists", "Government Legal Support"],
          access: "Free helplines + legal aid + union representation",
          impact: "Protected employment rights and confident workplace relationships"
        },
        {
          service: "Training & Assessment Support",
          description: "Rights and support related to apprenticeship training requirements",
          providers: ["Apprenticeship Support Service", "Ofsted", "Training Provider Student Services"],
          access: "Dedicated apprentice helplines + online resources + advocacy",
          impact: "Ensured training quality and apprentice progression protection"
        }
      ]
    }
  ];

  const emergencyContactsModern = [
    {
      service: "Apprenticeship Crisis Support Line",
      contact: "0800 APPRENTICE (0800 277 736)",
      description: "24/7 support for serious apprenticeship-related crises",
      specialties: ["Training disputes", "Workplace safety", "Employer conflicts", "Assessment issues"],
      responseTime: "Immediate triage, specialist callback within 2 hours"
    },
    {
      service: "Mental Health Crisis Line",
      contact: "111 (NHS) or 116 123 (Samaritans)",
      description: "Immediate mental health crisis intervention and support",
      specialties: ["Suicide prevention", "Mental health emergency", "Crisis counselling", "Emergency referrals"],
      responseTime: "Immediate response, trained counsellors available 24/7"
    },
    {
      service: "Workplace Safety Emergency",
      contact: "HSE Incident Contact Centre: 0345 300 9923",
      description: "Serious workplace safety incidents and immediate danger reporting",
      specialties: ["Immediate danger", "Serious injury", "Safety violations", "Environmental hazards"],
      responseTime: "Immediate risk assessment, inspector response within 24 hours"
    }
  ];

  const supportResourcesDigital = [
    {
      category: "Government Digital Services",
      resources: [
        {
          name: "Apprenticeship Support Service Portal",
          url: "https://apprenticeshipsupport.apprenticeships.gov.uk",
          description: "Official government digital platform for apprentice support and guidance",
          features: ["Live chat support", "Resource library", "Progress tracking", "Complaint resolution"],
          availability: "24/7 online, live support Mon-Fri 8am-10pm"
        },
        {
          name: "NHS Mental Health Digital Services",
          url: "https://www.nhs.uk/mental-health/",
          description: "Comprehensive digital mental health support and self-help resources",
          features: ["Self-assessment tools", "Guided therapy programmes", "Crisis intervention", "Local service finder"],
          availability: "24/7 online access, crisis support always available"
        }
      ]
    },
    {
      category: "Industry-Specific Support",
      resources: [
        {
          name: "CITB Apprentice Support Hub",
          url: "https://www.citb.co.uk/apprentices/support",
          description: "Construction industry specialist support for apprentices",
          features: ["Career guidance", "Training support", "Financial assistance", "Industry networking"],
          availability: "Online 24/7, phone support Mon-Fri 8am-6pm"
        },
        {
          name: "ECA (Electrical Contractors' Association) Support",
          url: "https://www.eca.co.uk/apprentices",
          description: "Electrical industry professional support and career development",
          features: ["Professional development", "Industry insights", "Networking opportunities", "Technical support"],
          availability: "Business hours support with online resources"
        }
      ]
    }
  ];

  if (isMobile) {
    return (
      <div className="space-y-4">
        <Alert className="border-green-500/50 bg-green-500/10">
          <Heart className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-200">
            Early support intervention prevents 75% of apprentice failures. Getting help quickly makes all the difference.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-2 gap-3">
          {supportMetrics.map((metric, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
              <div className="text-center space-y-2">
                {metric.icon}
                <div className="text-xs font-medium text-white">{metric.metric}</div>
                <div className="text-xs text-muted-foreground">{metric.data}</div>
              </div>
            </Card>
          ))}
        </div>

        <MobileAccordion type="single" collapsible className="space-y-2">
          <MobileAccordionItem value="digital">
            <MobileAccordionTrigger icon={<Brain className="h-5 w-5 text-blue-400" />}>
              2025 Digital Support Platforms
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                {digitalSupportPlatforms.map((platform, index) => (
                  <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white text-sm">{platform.platform}</h4>
                        <Badge variant="outline" className="text-blue-300 border-blue-400/30 text-xs">
                          {platform.timing}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{platform.description}</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-blue-300 mb-2 text-xs">Support Components</h5>
                      <ul className="space-y-1">
                        {platform.components.map((component, compIndex) => (
                          <li key={compIndex} className="text-xs text-blue-200 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {component}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                      <h5 className="font-medium text-green-300 mb-1 text-xs">Employer Benefits</h5>
                      <p className="text-xs text-green-200">{platform.employerBenefit}</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-purple-300 mb-1 text-xs">Access Methods</h5>
                      <div className="flex flex-wrap gap-1">
                        {platform.accessPoints.map((access, accessIndex) => (
                          <Badge key={accessIndex} variant="outline" className="text-purple-300 border-purple-400/30 text-xs">
                            {access}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="categories">
            <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-green-400" />}>
              Support Service Categories
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                {supportCategoryFramework.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-medium text-green-300 text-sm border-b border-green-500/20 pb-1">
                      {category.category}
                    </h4>
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="border border-green-500/20 rounded-lg p-3 space-y-2">
                        <h5 className="font-medium text-white text-sm">{service.service}</h5>
                        <p className="text-xs text-muted-foreground">{service.description}</p>
                        
                        <div>
                          <h6 className="font-medium text-green-300 mb-1 text-xs">Available Through</h6>
                          <div className="flex flex-wrap gap-1">
                            {service.providers.map((provider, providerIndex) => (
                              <Badge key={providerIndex} variant="outline" className="text-green-200 border-green-400/20 text-xs">
                                {provider}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                          <h6 className="font-medium text-blue-300 mb-1 text-xs">How to Access</h6>
                          <p className="text-xs text-blue-200">{service.access}</p>
                        </div>

                        <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
                          <h6 className="font-medium text-amber-300 mb-1 text-xs">Impact</h6>
                          <p className="text-xs text-amber-200">{service.impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="emergency">
            <MobileAccordionTrigger icon={<Phone className="h-5 w-5 text-red-400" />}>
              Emergency & Crisis Support
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                {emergencyContactsModern.map((contact, index) => (
                  <div key={index} className="border border-red-500/20 rounded-lg p-3 space-y-3">
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium text-white text-sm">{contact.service}</h4>
                      <Badge variant="outline" className="text-red-300 border-red-400/30 w-fit text-xs">
                        {contact.contact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{contact.description}</p>
                    
                    <div>
                      <h5 className="font-medium text-red-300 mb-1 text-xs">Specialises In</h5>
                      <div className="flex flex-wrap gap-1">
                        {contact.specialties.map((specialty, specialtyIndex) => (
                          <Badge key={specialtyIndex} variant="outline" className="text-red-200 border-red-400/20 text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
                      <h5 className="font-medium text-amber-300 mb-1 text-xs">Response Time</h5>
                      <p className="text-xs text-amber-200">{contact.responseTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="resources">
            <MobileAccordionTrigger icon={<Globe className="h-5 w-5 text-purple-400" />}>
              Digital Resource Centre
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                {supportResourcesDigital.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-medium text-purple-300 text-sm border-b border-purple-500/20 pb-1">
                      {category.category}
                    </h4>
                    {category.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className="border border-purple-500/20 rounded-lg p-3 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-medium text-white text-sm flex-1">{resource.name}</h5>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-purple-500/30 shrink-0"
                            onClick={() => window.open(resource.url, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{resource.description}</p>
                        
                        <div>
                          <h6 className="font-medium text-purple-300 mb-1 text-xs">Features</h6>
                          <div className="flex flex-wrap gap-1">
                            {resource.features.map((feature, featureIndex) => (
                              <Badge key={featureIndex} variant="outline" className="text-purple-200 border-purple-400/20 text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                          <h6 className="font-medium text-green-300 mb-1 text-xs">Availability</h6>
                          <p className="text-xs text-green-200">{resource.availability}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>

        <Alert className="border-blue-500/50 bg-blue-500/10">
          <Shield className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>Remember:</strong> Support services are confidential and designed to help you succeed. Early intervention prevents most problems from escalating.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Desktop view fallback
  return (
    <div className="space-y-6">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Heart className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          <strong>2025 Update:</strong> Enhanced digital support platforms provide faster, more effective assistance for apprentices and employers.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {supportMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                {metric.icon}
                <div>
                  <div className="text-sm font-medium text-white">{metric.metric}</div>
                  <div className="text-xs text-muted-foreground">{metric.data}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-muted-foreground">
        <p>Switch to mobile view for the comprehensive support resources framework.</p>
      </div>
    </div>
  );
};

export default SupportResourcesTab;
