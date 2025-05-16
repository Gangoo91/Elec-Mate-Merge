
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// UI Components
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger 
} from "@/components/ui/hover-card";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

// Icons
import { 
  ArrowLeft, 
  Briefcase, 
  FileText, 
  LucideShieldCheck, 
  Building, 
  Users, 
  Download, 
  Landmark, 
  Receipt, 
  TrendingUp, 
  CheckCircle,
  BadgeCheck,
  UserCheck,
  FileCheck,
  CreditCard
} from "lucide-react";

const BusinessStartup = () => {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const handleDownload = () => {
    toast.success("Business Startup Checklist will download shortly", {
      description: "Your download has started"
    });
  };

  const handleBookConsultation = () => {
    toast.success("Consultation request received", {
      description: "Our team will contact you shortly to schedule your business consultation"
    });
  };

  const startupSteps = [
    {
      id: 1,
      title: "Business Formation",
      description: "Choose the right business structure for your electrical contracting business.",
      icon: <Landmark className="h-5 w-5 text-elec-yellow/80" />,
      content: [
        "Decide between sole trader, partnership, or limited company",
        "Register with HMRC and Companies House",
        "Set up business banking",
        "Arrange business insurance (public liability, professional indemnity)",
        "Register for VAT if applicable"
      ]
    },
    {
      id: 2,
      title: "Certifications & Compliance",
      description: "Ensure you have all necessary qualifications and certifications.",
      icon: <BadgeCheck className="h-5 w-5 text-elec-yellow/80" />,
      content: [
        "Maintain relevant electrical qualifications (Level 3 NVQ, 18th Edition)",
        "Join a competent person scheme (NICEIC, NAPIT, etc.)",
        "Prepare for assessment and inspections",
        "Set up document management systems for certifications",
        "Understand building regulations notification requirements"
      ]
    },
    {
      id: 3,
      title: "Operations Setup",
      description: "Establish core business systems and processes.",
      icon: <FileCheck className="h-5 w-5 text-elec-yellow/80" />,
      content: [
        "Set up accounting and invoicing systems",
        "Establish scheduling and job management processes",
        "Create standardized templates (quotes, invoices, certificates)",
        "Develop health and safety protocols",
        "Set up inventory and tool management systems"
      ]
    },
    {
      id: 4,
      title: "Market Presence",
      description: "Build your brand and start attracting customers.",
      icon: <TrendingUp className="h-5 w-5 text-elec-yellow/80" />,
      content: [
        "Design professional logo and branding",
        "Create business website and social media profiles",
        "Set up Google My Business listing",
        "Design vehicle signage and workwear",
        "Network with other trades and potential referral partners"
      ]
    },
    {
      id: 5,
      title: "Team Building",
      description: "Start building your team as your business grows.",
      icon: <Users className="h-5 w-5 text-elec-yellow/80" />,
      content: [
        "Understand employer responsibilities",
        "Consider using subcontractors initially",
        "Develop recruitment processes",
        "Create staff training and development plans",
        "Consider apprenticeship opportunities"
      ]
    }
  ];

  const businessResources = [
    {
      id: "businessPlan",
      title: "Business Plan Template",
      description: "Comprehensive business plan template tailored for electrical contractors",
      icon: <FileText className="h-10 w-10 text-elec-yellow" />,
      sections: [
        {
          title: "Executive Summary",
          content: "A template for creating a concise overview of your electrical business, including mission statement, key objectives, and unique selling proposition."
        },
        {
          title: "Market Analysis",
          content: "Framework for researching and analyzing the local electrical services market, competition, and identifying your target customers."
        },
        {
          title: "Service Offerings",
          content: "Templates to define your service packages, pricing strategy, and competitive advantages in the electrical contracting space."
        },
        {
          title: "Financial Projections",
          content: "Spreadsheets for forecasting startup costs, operating expenses, revenue projections, and break-even analysis specific to electrical businesses."
        }
      ]
    },
    {
      id: "legalCompliance",
      title: "Legal & Compliance Guide",
      description: "Essential legal and regulatory guidance for UK electrical contractors",
      icon: <LucideShieldCheck className="h-10 w-10 text-elec-yellow" />,
      sections: [
        {
          title: "Certification Requirements",
          content: "Detailed breakdown of all required qualifications and certifications, including NVQ Level 3, 18th Edition, inspection & testing qualifications."
        },
        {
          title: "Competent Person Schemes",
          content: "Comparison guide to different schemes (NICEIC, NAPIT, ELECSA) with application processes and requirements for each."
        },
        {
          title: "Building Regulations",
          content: "Comprehensive overview of Part P requirements and notification procedures for electrical work in dwellings."
        },
        {
          title: "Health & Safety Compliance",
          content: "Templates for risk assessments, method statements, and safety policies tailored for electrical contractors."
        }
      ]
    },
    {
      id: "financialTools",
      title: "Financial Management Kit",
      description: "Financial tools and templates for managing your electrical business",
      icon: <CreditCard className="h-10 w-10 text-elec-yellow" />,
      sections: [
        {
          title: "Pricing Calculator",
          content: "Spreadsheet tool to calculate accurate job prices, including labor, materials, overhead recovery, and profit margins."
        },
        {
          title: "Cash Flow Management",
          content: "Templates for tracking income, expenses, and maintaining healthy cash flow in your electrical business."
        },
        {
          title: "Tax Planning",
          content: "Guide to tax obligations, deductions, and planning specific to electrical contractors, including VAT considerations."
        },
        {
          title: "Investment Planning",
          content: "Tools for planning equipment purchases, vehicle investments, and business expansion with ROI calculations."
        }
      ]
    },
    {
      id: "marketingKit",
      title: "Marketing Toolkit",
      description: "Marketing resources to help grow your electrical contracting business",
      icon: <TrendingUp className="h-10 w-10 text-elec-yellow" />,
      sections: [
        {
          title: "Brand Development",
          content: "Templates and guides for creating a professional electrical business brand, including logo design brief and messaging guidelines."
        },
        {
          title: "Online Presence",
          content: "Step-by-step guide to creating a professional website, setting up Google My Business, and managing social media profiles."
        },
        {
          title: "Customer Acquisition",
          content: "Strategies for generating leads, building relationships with property developers, and establishing referral networks."
        },
        {
          title: "Customer Retention",
          content: "Templates for follow-up communications, service reminders, and developing ongoing maintenance contracts."
        }
      ]
    },
    {
      id: "operationsManual",
      title: "Operations Manual",
      description: "Systems and processes to streamline electrical business operations",
      icon: <Building className="h-10 w-10 text-elec-yellow" />,
      sections: [
        {
          title: "Job Management",
          content: "Workflows and templates for managing jobs from inquiry to completion, including scheduling, customer communications, and quality control."
        },
        {
          title: "Document Management",
          content: "Systems for managing certificates, test results, and compliance documentation with templates and filing structures."
        },
        {
          title: "Inventory Control",
          content: "Tools for managing materials, tracking usage, and optimizing supplier relationships to reduce costs."
        },
        {
          title: "Vehicle & Tool Management",
          content: "Systems for maintaining vehicles, tracking tool inventory, and planning equipment upgrades."
        }
      ]
    },
    {
      id: "teamBuilding",
      title: "Team Building Guide",
      description: "Resources for hiring and managing staff in your electrical business",
      icon: <UserCheck className="h-10 w-10 text-elec-yellow" />,
      sections: [
        {
          title: "Recruitment Process",
          content: "Templates for job descriptions, interview questions, and skills assessments specific to hiring electricians and support staff."
        },
        {
          title: "Onboarding Program",
          content: "Structured onboarding process to integrate new team members, including safety training and company procedures."
        },
        {
          title: "Performance Management",
          content: "Systems for setting expectations, providing feedback, and developing team members' skills and careers."
        },
        {
          title: "Apprenticeship Management",
          content: "Guide to establishing an apprenticeship program, including training frameworks and mentor systems."
        }
      ]
    }
  ];

  const quickTips = [
    "Focus on building a strong reputation with impeccable workmanship",
    "Invest in quality tools that improve efficiency and last longer",
    "Build relationships with other trades for consistent referral business",
    "Price your services based on value, not just to be the cheapest option",
    "Set aside money for taxes from every job payment",
    "Maintain a cash reserve to handle unexpected business expenses",
    "Continuously update your technical knowledge and qualifications",
    "Consider specializing in growing areas like EV charging or renewables"
  ];

  const keyRegulations = [
    {
      name: "BS 7671 (18th Edition)",
      description: "The UK standard for electrical installations"
    },
    {
      name: "Part P Building Regulations",
      description: "Requirements for domestic electrical work"
    },
    {
      name: "Electricity at Work Regulations",
      description: "Legal framework for electrical safety"
    },
    {
      name: "CDM Regulations 2015",
      description: "Requirements for construction projects"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Starting an Electrical Business</h1>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Business Overview</TabsTrigger>
          <TabsTrigger value="resources">Startup Resources</TabsTrigger>
          <TabsTrigger value="roadmap">Business Roadmap</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray/80 to-elec-gray/50">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-elec-yellow" />
                <CardTitle>Essential Business Startup Guide for UK Electricians</CardTitle>
              </div>
              <CardDescription>Comprehensive guidance to establish your electrical contracting business in the UK market</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Introduction */}
              <div className="bg-elec-gray/70 p-5 rounded-md border border-elec-yellow/20 shadow-inner">
                <p className="font-medium text-elec-yellow mb-2">Why start your own electrical business?</p>
                <p className="text-sm leading-relaxed">
                  Running your own electrical contracting business offers excellent earning potential, flexibility, 
                  and the opportunity to build something of your own. With the UK's ongoing demand for qualified 
                  electricians, particularly with the push towards renewable energy and smart home technologies, 
                  there's never been a better time to establish your own electrical business.
                </p>
              </div>
              
              {/* Key considerations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Card className="border-elec-yellow/20 bg-elec-card shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-elec-yellow" />
                      <span>Essential Qualifications</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></span>
                        <span>Level 3 NVQ Diploma in Electrotechnical Services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></span>
                        <span>18th Edition Wiring Regulations qualification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></span>
                        <span>Inspection and Testing qualification (2391 or 2394/2395)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></span>
                        <span>Competent person scheme membership (NICEIC, NAPIT, etc.)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/20 bg-elec-card shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Receipt className="h-5 w-5 text-elec-yellow" />
                      <span>Startup Costs</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></span>
                        <span>Tools and equipment: £2,000-£5,000</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></span>
                        <span>Vehicle and signage: £5,000-£15,000</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></span>
                        <span>Insurance: £500-£1,500 annually</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></span>
                        <span>Scheme registration: £500-£1,000 annually</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Quick tips */}
              <div className="bg-elec-yellow/10 p-5 rounded-md border border-elec-yellow/30">
                <h3 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Expert Quick Tips
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {quickTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key regulations */}
              <Card className="border-elec-yellow/20 bg-elec-dark shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <LucideShieldCheck className="h-5 w-5 text-elec-yellow" />
                    <span>Key Regulations to Know</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {keyRegulations.map((reg, index) => (
                      <HoverCard key={index}>
                        <HoverCardTrigger asChild>
                          <Button variant="outline" className="justify-start border-elec-yellow/20 hover:border-elec-yellow w-full">
                            <span>{reg.name}</span>
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 bg-elec-dark border-elec-yellow/20">
                          <div className="flex justify-between space-x-4">
                            <div>
                              <h4 className="text-sm font-semibold text-elec-yellow">{reg.name}</h4>
                              <p className="text-xs mt-1">{reg.description}</p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            
            <CardFooter className="flex-col space-y-4 pt-0">
              <Separator className="bg-elec-yellow/20" />
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button 
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 flex-1"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                  Download Business Startup Checklist
                </Button>
                <Button 
                  variant="outline" 
                  className="border-elec-yellow/30 hover:border-elec-yellow hover:bg-elec-yellow/10 flex-1"
                  onClick={handleBookConsultation}
                >
                  Book a Business Consultation
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* RESOURCES TAB */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessResources.map((resource) => (
              <Dialog key={resource.id}>
                <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray/80 to-elec-gray/50 hover:border-elec-yellow/50 transition-all shadow-md h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center mb-2">
                      {resource.icon}
                    </div>
                    <CardTitle className="text-center">{resource.title}</CardTitle>
                    <CardDescription className="text-center line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between pt-2">
                    <div className="space-y-3">
                      <h4 className="text-xs text-elec-yellow mb-1">What's Included:</h4>
                      <ul className="text-xs space-y-1.5 flex-1">
                        {resource.sections.map((section, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></span>
                            <span>{section.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <DialogTrigger asChild>
                      <Button 
                        className="w-full mt-4 bg-elec-yellow/90 text-black hover:bg-elec-yellow"
                        onClick={() => setSelectedResource(resource.id)}
                      >
                        Access Resource
                      </Button>
                    </DialogTrigger>
                  </CardContent>
                </Card>

                <DialogContent className="sm:max-w-lg bg-elec-dark border-elec-yellow/20">
                  <DialogHeader>
                    <DialogTitle className="text-elec-yellow flex items-center gap-2">
                      {resource.icon && <div className="h-5 w-5">{resource.icon}</div>}
                      {resource.title}
                    </DialogTitle>
                    <DialogDescription>
                      {resource.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {resource.sections.map((section, idx) => (
                      <div key={idx} className="bg-elec-gray/70 p-4 rounded-md border border-elec-yellow/10">
                        <h3 className="font-medium text-sm text-elec-yellow mb-2">{section.title}</h3>
                        <p className="text-xs">{section.content}</p>
                      </div>
                    ))}
                  </div>
                  
                  <DialogFooter className="flex justify-between items-center mt-4">
                    <Button 
                      variant="outline" 
                      className="border-elec-yellow/30"
                      onClick={() => toast.success("Resource saved to your account")}
                    >
                      Save Resource
                    </Button>
                    <Button 
                      className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
                      onClick={() => toast.success("Full guide will download shortly")}
                    >
                      Download Full Guide
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </TabsContent>

        {/* ROADMAP TAB */}
        <TabsContent value="roadmap" className="space-y-5">
          <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray/80 to-elec-gray/50 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                Business Establishment Roadmap
              </CardTitle>
              <CardDescription>
                Follow this step-by-step guide to successfully launch your electrical contracting business
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                {startupSteps.map((step, index) => (
                  <Popover key={step.id}>
                    <div className="relative flex">
                      {/* Timeline connector */}
                      {index < startupSteps.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-14 bg-elec-yellow/30 z-0"></div>
                      )}
                      
                      <div className="flex gap-4 items-start relative z-10">
                        {/* Step number */}
                        <div className="bg-elec-yellow text-black h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md flex-shrink-0">
                          {step.id}
                        </div>
                        
                        {/* Step content */}
                        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 flex-grow shadow-md">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              {step.icon}
                              <span>{step.title}</span>
                            </h3>
                            
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm" className="border-elec-yellow/30 hover:border-elec-yellow text-xs">
                                See Details
                              </Button>
                            </PopoverTrigger>
                          </div>
                          
                          <p className="text-sm text-gray-300">{step.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <PopoverContent className="w-80 bg-elec-dark border-elec-yellow/20">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {step.icon}
                          <h4 className="font-medium text-elec-yellow">{step.title}</h4>
                        </div>
                        <ul className="space-y-2">
                          {step.content.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5" />
                              <span className="text-xs">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray/80 to-elec-gray/50 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                Business Setup Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                The information provided is for general guidance only and does not constitute financial, legal, or business advice. 
                Always consult with qualified professionals regarding your specific business circumstances. ElecMate is not endorsed by, 
                directly affiliated with, maintained, authorised, or sponsored by any regulatory bodies or certification schemes mentioned. 
                All product names, logos, and brands are property of their respective owners.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessStartup;
