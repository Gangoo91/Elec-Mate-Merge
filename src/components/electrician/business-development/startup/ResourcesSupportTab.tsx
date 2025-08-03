
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  MobileAccordion,
  MobileAccordionContent,
  MobileAccordionItem,
  MobileAccordionTrigger,
} from "@/components/ui/mobile-accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  AlertTriangle, 
  Building2, 
  Globe, 
  Scale, 
  Heart, 
  GraduationCap, 
  FileCheck,
  ExternalLink,
  Clock,
  MapPin,
  Users
} from "lucide-react";

const ResourcesSupportTab = () => {
  const isMobile = useIsMobile();
  const [defaultOpenValues] = useState(["emergency"]);

  const supportCategories = [
    {
      id: "emergency",
      title: "Emergency Support",
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      description: "Critical support when you need it most",
      resources: [
        {
          name: "Samaritans",
          type: "Mental Health Crisis",
          phone: "116 123",
          description: "Free 24/7 emotional support for anyone in distress",
          availability: "24/7, 365 days",
          urgent: true
        },
        {
          name: "Business Debtline",
          type: "Financial Crisis",
          phone: "0800 197 6026",
          description: "Free, confidential advice on business debt problems",
          availability: "Mon-Fri 9am-8pm, Sat 9:30am-1pm"
        },
        {
          name: "ACAS Helpline",
          type: "Employment Disputes",
          phone: "0300 123 1100",
          description: "Free advice on employment disputes and workplace issues",
          availability: "Mon-Fri 8am-6pm, Sat 9am-1pm"
        },
        {
          name: "HSE Emergency",
          type: "Safety Incidents",
          phone: "0345 300 9923",
          description: "Report serious workplace accidents and incidents",
          availability: "24/7 for emergencies"
        }
      ]
    },
    {
      id: "government",
      title: "Government Support",
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      description: "Official government support services",
      resources: [
        {
          name: "Business Support Helpline",
          type: "General Business",
          phone: "0345 600 9 006",
          website: "gov.uk/business-support-helpline",
          description: "Government support for new and existing businesses",
          availability: "Mon-Fri 9am-6pm"
        },
        {
          name: "HMRC New Employer Helpline",
          type: "Tax & Employment",
          phone: "0300 200 3211",
          website: "gov.uk/contact-hmrc",
          description: "Help with PAYE, tax, and employment matters",
          availability: "Mon-Fri 8am-8pm, Sat 8am-4pm"
        },
        {
          name: "Companies House",
          type: "Registration",
          phone: "0303 123 4500",
          website: "companieshouse.gov.uk",
          description: "Company registration and filing services",
          availability: "Mon-Fri 8:30am-6pm"
        },
        {
          name: "Health & Safety Executive",
          type: "Safety Compliance",
          phone: "0300 003 1747",
          website: "hse.gov.uk",
          description: "Workplace safety guidance and compliance",
          availability: "Mon-Fri 8:30am-5pm"
        }
      ]
    },
    {
      id: "industry",
      title: "Industry Bodies",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      description: "Electrical industry specific support",
      resources: [
        {
          name: "NICEIC",
          type: "Certification Body",
          phone: "0333 015 6626",
          website: "niceic.com",
          description: "Electrical contractor certification and support",
          services: ["Assessment", "Certification", "Technical Support", "Business Resources"]
        },
        {
          name: "NAPIT",
          type: "Certification Body",
          phone: "0345 543 0330",
          website: "napit.org.uk",
          description: "Competent person scheme for electrical work",
          services: ["Registration", "Assessment", "Technical Helpline", "CPD Training"]
        },
        {
          name: "Electrical Contractors' Association",
          type: "Trade Association",
          phone: "020 7313 4800",
          website: "eca.co.uk",
          description: "UK's leading trade association for electrical contractors",
          services: ["Industry Standards", "Training", "Networking", "Advocacy"]
        },
        {
          name: "SELECT (Scotland)",
          type: "Trade Association",
          phone: "0131 445 5577",
          website: "select.org.uk",
          description: "Scotland's trade association for electrical contractors",
          services: ["Training", "Standards", "Apprenticeships", "Support"]
        }
      ]
    },
    {
      id: "financial",
      title: "Financial & Legal",
      icon: Scale,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      description: "Financial planning and legal support",
      resources: [
        {
          name: "Citizens Advice",
          type: "General Advice",
          phone: "0808 223 1133",
          website: "citizensadvice.org.uk",
          description: "Free, confidential advice on legal and financial matters",
          services: ["Debt Advice", "Legal Help", "Consumer Rights", "Employment"]
        },
        {
          name: "Law Society Find a Solicitor",
          type: "Legal Services",
          website: "solicitors.lawsociety.org.uk",
          description: "Find qualified solicitors in your area",
          services: ["Business Law", "Employment Law", "Contract Law", "Dispute Resolution"]
        },
        {
          name: "Federation of Small Businesses",
          type: "Business Support",
          phone: "0808 202 0888",
          website: "fsb.org.uk",
          description: "Support and protection for small businesses",
          services: ["Legal Protection", "Business Banking", "Networking", "Advocacy"]
        },
        {
          name: "Institute of Chartered Accountants",
          type: "Financial Services",
          website: "icaew.com/find-an-accountant",
          description: "Find qualified chartered accountants",
          services: ["Tax Planning", "Business Accounts", "Financial Advice", "Compliance"]
        }
      ]
    },
    {
      id: "mental-health",
      title: "Mental Health & Wellbeing",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
      description: "Support for mental health and wellbeing",
      resources: [
        {
          name: "Mind",
          type: "Mental Health",
          phone: "0300 123 3393",
          website: "mind.org.uk",
          description: "Mental health support and information",
          availability: "Mon-Fri 9am-6pm"
        },
        {
          name: "Anxiety UK",
          type: "Anxiety Support",
          phone: "03444 775 774",
          website: "anxietyuk.org.uk",
          description: "Support for anxiety and anxiety-related conditions",
          availability: "Mon-Fri 9:30am-5:30pm"
        },
        {
          name: "Mates in Mind",
          type: "Construction Mental Health",
          website: "matesinmind.org",
          description: "Mental health support specifically for construction workers",
          services: ["Training", "Resources", "Awareness", "Support Networks"]
        },
        {
          name: "NHS 111",
          type: "Health Services",
          phone: "111",
          website: "nhs.uk",
          description: "Non-emergency health advice and services",
          availability: "24/7"
        }
      ]
    },
    {
      id: "professional",
      title: "Professional Development",
      icon: GraduationCap,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
      description: "Training and professional growth",
      resources: [
        {
          name: "CITB",
          type: "Training Board",
          phone: "0344 994 4400",
          website: "citb.co.uk",
          description: "Construction Industry Training Board",
          services: ["Apprenticeships", "Training Grants", "Qualifications", "Levy Support"]
        },
        {
          name: "JTL",
          type: "Training Provider",
          phone: "0800 652 9669",
          website: "jtltraining.com",
          description: "Leading electrical and plumbing training provider",
          services: ["Apprenticeships", "Adult Training", "Assessments", "Career Support"]
        },
        {
          name: "City & Guilds",
          type: "Qualifications",
          phone: "0844 543 0033",
          website: "cityandguilds.com",
          description: "Vocational qualifications and training",
          services: ["Qualifications", "Assessments", "Training Centres", "CPD"]
        },
        {
          name: "Learning & Work Institute",
          type: "Skills Development",
          website: "learningandwork.org.uk",
          description: "Skills development and lifelong learning",
          services: ["Career Guidance", "Skills Training", "Employment Support", "Research"]
        }
      ]
    },
    {
      id: "compliance",
      title: "Compliance & Standards",
      icon: FileCheck,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      description: "Regulatory compliance and standards",
      resources: [
        {
          name: "IET (Institution of Engineering and Technology)",
          type: "Standards Body",
          phone: "01438 313 311",
          website: "theiet.org",
          description: "Professional body for electrical engineers and technicians",
          services: ["BS 7671 Standards", "Technical Support", "CPD", "Professional Registration"]
        },
        {
          name: "BSI (British Standards Institution)",
          type: "Standards",
          phone: "020 8996 9001",
          website: "bsigroup.com",
          description: "UK national standards body",
          services: ["Standards", "Certification", "Training", "Compliance"]
        },
        {
          name: "Ofgem",
          type: "Energy Regulator",
          phone: "0207 901 7000",
          website: "ofgem.gov.uk",
          description: "Gas and electricity markets regulator",
          services: ["Licensing", "Standards", "Consumer Protection", "Market Regulation"]
        },
        {
          name: "Building Control",
          type: "Local Authority",
          website: "gov.uk/building-regulations-approval",
          description: "Building regulations compliance and approval",
          services: ["Approvals", "Inspections", "Compliance", "Certificates"]
        }
      ]
    }
  ];

  const renderDesktopView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {supportCategories.map((category) => {
        const IconComponent = category.icon;
        return (
          <div 
            key={category.id}
            className={`p-6 rounded-lg border ${category.borderColor} ${category.bgColor} transition-all duration-200 hover:shadow-lg`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${category.bgColor}`}>
                <IconComponent className={`h-5 w-5 ${category.color}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {category.resources.map((resource, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{resource.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                        {resource.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                      
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {resource.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span className="font-mono">{resource.phone}</span>
                          </div>
                        )}
                        {resource.availability && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{resource.availability}</span>
                          </div>
                        )}
                      </div>

                      {resource.services && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {resource.services.slice(0, 3).map((service, serviceIndex) => (
                            <Badge key={serviceIndex} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {resource.services.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{resource.services.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      {resource.phone && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs"
                          onClick={() => window.open(`tel:${resource.phone}`)}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      )}
                      {resource.website && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs"
                          onClick={() => window.open(`https://${resource.website}`, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderMobileView = () => (
    <MobileAccordion 
      type="multiple" 
      defaultValue={defaultOpenValues}
      className="space-y-3"
    >
      {supportCategories.map((category) => {
        const IconComponent = category.icon;
        return (
          <MobileAccordionItem 
            key={category.id} 
            value={category.id}
            className={`border ${category.borderColor} ${category.bgColor} rounded-lg overflow-hidden`}
          >
            <MobileAccordionTrigger 
              className="px-4 py-3 hover:no-underline"
              icon={<IconComponent className={`h-5 w-5 ${category.color}`} />}
            >
              <div className="text-left">
                <div className="font-semibold text-foreground">{category.title}</div>
                <div className="text-sm text-muted-foreground">{category.description}</div>
              </div>
            </MobileAccordionTrigger>
            
            <MobileAccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {category.resources.map((resource, index) => (
                  <div key={index} className="space-y-3 pb-4 border-b border-border/50 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-medium text-foreground">{resource.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          {resource.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                        
                        <div className="space-y-1 text-xs text-muted-foreground">
                          {resource.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span className="font-mono">{resource.phone}</span>
                            </div>
                          )}
                          {resource.availability && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{resource.availability}</span>
                            </div>
                          )}
                          {resource.website && (
                            <div className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              <span>{resource.website}</span>
                            </div>
                          )}
                        </div>

                        {resource.services && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {resource.services.slice(0, 2).map((service, serviceIndex) => (
                              <Badge key={serviceIndex} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                            {resource.services.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{resource.services.length - 2} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {resource.phone && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs flex-1"
                          onClick={() => window.open(`tel:${resource.phone}`)}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      )}
                      {resource.website && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs flex-1"
                          onClick={() => window.open(`https://${resource.website}`, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        );
      })}
    </MobileAccordion>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Support & Resources</h2>
        <p className="text-muted-foreground">
          Comprehensive UK support services for electrical contractors
        </p>
      </div>
      
      {isMobile ? renderMobileView() : renderDesktopView()}
      
      <div className="mt-8 p-6 rounded-lg border border-elec-yellow/20 bg-elec-gray">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-elec-yellow/10">
            <FileCheck className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Important Documentation</h3>
            <p className="text-muted-foreground mb-3">
              Keep these essential records for legal, tax, and professional compliance:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-elec-yellow" />
                  <span>Business registration documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-elec-yellow" />
                  <span>Insurance policies & certificates</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-elec-yellow" />
                  <span>Health & safety training records</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-elec-yellow" />
                  <span>All expenses & receipts</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-elec-yellow" />
                  <span>Customer contracts & invoices</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-elec-yellow" />
                  <span>Certification & qualification records</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSupportTab;
