
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
        "Create standardised templates (quotes, invoices, certificates)",
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

  const quickTips = [
    "Focus on building a strong reputation with impeccable workmanship",
    "Invest in quality tools that improve efficiency and last longer",
    "Build relationships with other trades for consistent referral business",
    "Price your services based on value, not just to be the cheapest option",
    "Set aside money for taxes from every job payment",
    "Maintain a cash reserve to handle unexpected business expenses",
    "Continuously update your technical knowledge and qualifications",
    "Consider specialising in growing areas like EV charging or renewables"
  ];

  const businessRequirements = [
    {
      title: "Essential Insurance",
      items: [
        "Public Liability Insurance (min. £2m cover)",
        "Professional Indemnity Insurance",
        "Employers' Liability Insurance (if employing staff)",
        "Contract Works Insurance",
        "Tools and Equipment Insurance"
      ]
    },
    {
      title: "Registration & Certification",
      items: [
        "NICEIC, NAPIT or ELECSA membership",
        "Gas Safe registration (if offering gas work)",
        "Construction Industry Scheme (CIS) registration",
        "Data protection registration (ICO)",
        "Waste carrier licence"
      ]
    },
    {
      title: "Legal Documentation",
      items: [
        "Terms and conditions of business",
        "Customer contracts and agreements",
        "Health and safety policy",
        "Risk assessment templates",
        "GDPR compliance documentation"
      ]
    },
    {
      title: "Financial Systems",
      items: [
        "Business bank account",
        "Accounting software setup",
        "Payment processing solutions",
        "Tax and VAT management system",
        "Cash flow forecasting tools"
      ]
    }
  ];

  const marketingStrategies = [
    {
      title: "Local SEO Optimisation",
      content: "Ensure your Google Business Profile is fully optimised with correct business category, service area, opening hours, and high-quality images. Regularly solicit reviews from satisfied customers."
    },
    {
      title: "Trade Network Development",
      content: "Build relationships with complementary trades (plumbers, builders, property managers) to establish a referral network. Join local trade associations and business networking groups."
    },
    {
      title: "Social Proof Collection",
      content: "Systematically collect before/after photos, testimonials, and case studies. Create a portfolio that highlights your expertise in various electrical services, particularly showcasing complex or interesting work."
    },
    {
      title: "Community Engagement",
      content: "Participate in local community events, sponsor sports teams, or offer electrical safety workshops to enhance visibility and demonstrate community commitment."
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
          <TabsTrigger value="requirements">Key Requirements</TabsTrigger>
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

              {/* Marketing strategies section */}
              <Card className="border-elec-yellow/20 bg-elec-card shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-elec-yellow" />
                    <span>Effective Marketing Strategies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {marketingStrategies.map((strategy, index) => (
                      <div key={index} className="bg-elec-gray/50 p-4 rounded-md border border-elec-yellow/10">
                        <h4 className="font-medium text-elec-yellow mb-2 text-sm">{strategy.title}</h4>
                        <p className="text-xs">{strategy.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

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

        {/* REQUIREMENTS TAB */}
        <TabsContent value="requirements" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray/80 to-elec-gray/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
                Key Business Requirements
              </CardTitle>
              <CardDescription>
                Essential elements needed to establish a compliant and professional electrical contracting business in the UK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {businessRequirements.map((category, index) => (
                  <Card key={index} className="border-elec-yellow/20 bg-elec-card shadow-md h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="border-elec-yellow/20 bg-elec-card shadow-md mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                    Key Business Metrics to Track
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-elec-dark p-4 rounded-md">
                      <h4 className="font-medium text-elec-yellow mb-2 text-sm">Financial Metrics</h4>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>Gross profit margin (industry avg: 40-60%)</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>Job profitability by service type</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>Monthly overhead recovery</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>Material vs labour cost ratio</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-elec-dark p-4 rounded-md">
                      <h4 className="font-medium text-elec-yellow mb-2 text-sm">Operational Metrics</h4>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>Billable hours per electrician</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>First-time fix rate</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>Response time to emergency calls</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>Vehicle utilisation and fuel efficiency</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-elec-dark p-4 rounded-md">
                      <h4 className="font-medium text-elec-yellow mb-2 text-sm">Customer Metrics</h4>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>Customer satisfaction rating</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>Repeat business percentage</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>Referral rate from existing customers</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                          <span>Quote-to-job conversion rate</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-elec-yellow/10 p-5 rounded-md border border-elec-yellow/30 mt-6">
                <h3 className="font-semibold text-elec-yellow mb-3">Common Pitfalls to Avoid</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-elec-gray/50 p-3 rounded-md">
                    <h4 className="font-medium text-sm mb-2">Inadequate Pricing Structure</h4>
                    <p className="text-xs">Don't undervalue your services. Calculate your true costs including overheads, travel time, and professional development before setting rates.</p>
                  </div>
                  <div className="bg-elec-gray/50 p-3 rounded-md">
                    <h4 className="font-medium text-sm mb-2">Poor Cash Flow Management</h4>
                    <p className="text-xs">Establish clear payment terms, take deposits for larger jobs, and consider staged payments for longer projects to maintain healthy cash flow.</p>
                  </div>
                  <div className="bg-elec-gray/50 p-3 rounded-md">
                    <h4 className="font-medium text-sm mb-2">Inadequate Insurance Coverage</h4>
                    <p className="text-xs">Ensure comprehensive coverage tailored for electrical contractors, including specific coverage for specialised work like commercial installations.</p>
                  </div>
                  <div className="bg-elec-gray/50 p-3 rounded-md">
                    <h4 className="font-medium text-sm mb-2">Taking on Inappropriate Work</h4>
                    <p className="text-xs">Only accept jobs within your competence and certification. Turning down work outside your expertise protects your reputation and compliance status.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                Growth Timeline Guidance
              </CardTitle>
              <CardDescription>Typical progression timeline for UK electrical contractors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-elec-dark p-4 rounded-md border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-2">Year 1: Establishment Phase</h4>
                  <p className="text-sm mb-2">Focus on building reputation through quality work, establishing systems, and securing steady client base.</p>
                  <ul className="text-xs space-y-1 ml-4 list-disc">
                    <li>Complete all certification and registration processes</li>
                    <li>Establish efficient administrative systems</li>
                    <li>Focus on domestic installations and small commercial work</li>
                    <li>Build portfolio of completed projects and testimonials</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-2">Years 2-3: Stabilisation Phase</h4>
                  <p className="text-sm mb-2">Refine business processes, potentially hire first employee or regular subcontractor, begin specialising.</p>
                  <ul className="text-xs space-y-1 ml-4 list-disc">
                    <li>Expand service offerings based on market demand</li>
                    <li>Develop partnerships with contractors and other trades</li>
                    <li>Consider adding specialist services (EV chargers, renewable energy)</li>
                    <li>Establish more robust financial management systems</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-2">Years 4-5: Growth Phase</h4>
                  <p className="text-sm mb-2">Possible expansion to multiple employees, larger commercial projects, and broader service area.</p>
                  <ul className="text-xs space-y-1 ml-4 list-disc">
                    <li>Establish formal recruitment and training processes</li>
                    <li>Consider expanding to larger commercial contracts</li>
                    <li>Develop management systems for multi-site operations</li>
                    <li>Seek advanced certification for specialised installations</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-2">Years 5+: Maturity Phase</h4>
                  <p className="text-sm mb-2">Established company with multiple teams, potentially specialised divisions, and systematic business processes.</p>
                  <ul className="text-xs space-y-1 ml-4 list-disc">
                    <li>Develop middle management structure</li>
                    <li>Consider formal business premises</li>
                    <li>Implement advanced project management systems</li>
                    <li>Establish apprenticeship programme and staff development pathways</li>
                  </ul>
                </div>
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

