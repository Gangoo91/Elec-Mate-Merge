
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Briefcase, ArrowLeft, FileText, LucideShieldCheck, CreditCard, Users, Building, Download, FileCheck, CheckCircle, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { toast } from "sonner";
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

const BusinessStartup = () => {
  const [openSection, setOpenSection] = useState<string | null>("legal");
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleDownload = () => {
    toast.success("Business Startup Checklist will download shortly", {
      description: "Your download has started"
    });
  };

  const handleAccessResource = (resourceId: string) => {
    setSelectedResource(resourceId);
    toast.success("Resource content loaded", {
      description: "You can now view the detailed guide"
    });
  };

  const infoBoxes = [
    {
      id: "startupKit",
      title: "Business Start-up Kit",
      icon: <Briefcase className="h-6 w-6 text-elec-yellow" />,
      description: "Essential templates and resources for establishing your electrical contracting business.",
      contents: [
        "Business plan template", 
        "Market research guide", 
        "Brand development workbook",
        "Business registration checklist"
      ]
    },
    {
      id: "certification",
      title: "Contractor Certification",
      icon: <FileCheck className="h-6 w-6 text-elec-yellow" />,
      description: "Information on becoming NICEIC, NAPIT, or ELECSA approved, essential for building customer trust.",
      contents: [
        "Certification requirements guide", 
        "Application process walkthrough", 
        "Assessment preparation tips",
        "First-year compliance checklist"
      ]
    },
    {
      id: "taxes",
      title: "Accounting & Tax Guidance",
      icon: <CreditCard className="h-6 w-6 text-elec-yellow" />,
      description: "Financial management resources specifically for electrical contractors.",
      contents: [
        "Tax obligations overview", 
        "Bookkeeping templates", 
        "Expense tracking systems",
        "VAT registration guide"
      ]
    }
  ];

  const roadmapSteps = [
    {
      id: 1,
      title: "Business Structure Setup",
      description: "Choose between sole trader, partnership, or limited company structures, each with different legal and tax implications.",
      timeline: "Month 1-2",
      keyTasks: [
        "Register with HMRC",
        "Set up business banking",
        "Arrange business insurance",
        "Register for VAT (if applicable)"
      ]
    },
    {
      id: 2,
      title: "Certification & Compliance",
      description: "Ensure you have all necessary certifications to operate legally and build trust with customers.",
      timeline: "Month 2-4",
      keyTasks: [
        "Apply for competent person scheme membership",
        "Prepare for assessment visits",
        "Set up notification processes for building control",
        "Establish health and safety policies"
      ]
    },
    {
      id: 3,
      title: "Marketing & Client Acquisition",
      description: "Develop your brand and marketing strategy to attract your first clients.",
      timeline: "Month 3-6",
      keyTasks: [
        "Create business website and social profiles",
        "Design business cards and brochures",
        "Establish relationships with builders and other trades",
        "Set up online business listings"
      ]
    }
  ];

  const resourceDialogContent = {
    startupKit: {
      title: "Business Start-up Kit",
      description: "Comprehensive resources to help you establish your electrical business",
      content: [
        {
          title: "Business Plan Template",
          description: "A detailed template specific to electrical contracting businesses, including market analysis, financial projections, and business strategy sections. Use this to secure funding and establish clear business objectives.",
        },
        {
          title: "Market Research Guide",
          description: "Learn how to identify your target market, analyze local competition, and determine the most profitable electrical services to offer in your area.",
        },
        {
          title: "Brand Development Workbook",
          description: "Step-by-step exercises to develop your unique branding, including logo design brief, messaging guidelines, and customer persona development.",
        },
        {
          title: "Business Registration Checklist",
          description: "A complete checklist for registering your business with HMRC, Companies House, and relevant trade bodies, ensuring you meet all legal requirements.",
        }
      ]
    },
    certification: {
      title: "Contractor Certification",
      description: "Everything you need to know about becoming a certified electrical contractor",
      content: [
        {
          title: "Certification Requirements Guide",
          description: "Detailed breakdown of the qualifications, experience, and documentation needed for NICEIC, NAPIT, and ELECSA approval.",
        },
        {
          title: "Application Process Walkthrough",
          description: "Step-by-step guide to the application and assessment process for competent person schemes, including timelines and costs.",
        },
        {
          title: "Assessment Preparation Tips",
          description: "Expert guidance on preparing for technical assessments, including common questions, inspection points, and required documentation.",
        },
        {
          title: "First-year Compliance Checklist",
          description: "Essential tasks to maintain your certification in the first year, including periodic notifications, record-keeping, and continuing professional development.",
        }
      ]
    },
    taxes: {
      title: "Accounting & Tax Guidance",
      description: "Financial management resources for electrical contractors",
      content: [
        {
          title: "Tax Obligations Overview",
          description: "Comprehensive guide to tax obligations for electrical contractors, including income tax, National Insurance, VAT, and corporation tax if applicable.",
        },
        {
          title: "Bookkeeping Templates",
          description: "Ready-to-use spreadsheets and templates for tracking income, expenses, mileage, and other financial data essential for tax reporting.",
        },
        {
          title: "Expense Tracking Systems",
          description: "Comparison of digital tools and apps specifically designed for tradespeople to track business expenses and maximise legitimate tax deductions.",
        },
        {
          title: "VAT Registration Guide",
          description: "Detailed guidance on when and how to register for VAT, flat rate vs standard schemes, and managing VAT returns for electrical businesses.",
        }
      ]
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Starting an Electrical Business</h1>
      </div>
      
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Essential Business Startup Guide for UK Electricians</CardTitle>
          </div>
          <CardDescription>Comprehensive guidance to establish your electrical contracting business in the UK market</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Introduction section */}
          <div className="bg-elec-gray/50 p-4 rounded-md border border-elec-yellow/20">
            <p className="font-medium text-elec-yellow mb-2">Why start your own electrical business?</p>
            <p className="text-sm">
              Running your own electrical contracting business offers excellent earning potential, flexibility, and the opportunity to build 
              something of your own. With the UK's ongoing demand for qualified electricians, particularly with the push towards renewable 
              energy and smart home technologies, there's never been a better time to establish your own electrical business.
            </p>
          </div>

          {/* Resource boxes with dialog functionality */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoBoxes.map((box) => (
              <Dialog key={box.id}>
                <Card className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col hover:border-elec-yellow/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      {box.icon}
                      <CardTitle className="text-lg">{box.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-1 flex flex-col flex-grow">
                    <p className="text-sm mb-4">{box.description}</p>
                    
                    <div className="mt-auto space-y-3">
                      <div>
                        <h4 className="text-xs text-elec-yellow mb-1.5">What's Included:</h4>
                        <ul className="text-xs space-y-1.5">
                          {box.contents.map((content, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-elec-yellow mt-1.5"></span>
                              <span>{content}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full mt-3 border-elec-yellow/30 hover:border-elec-yellow text-xs"
                          onClick={() => handleAccessResource(box.id)}
                        >
                          Access Resource
                        </Button>
                      </DialogTrigger>
                    </div>
                  </CardContent>
                </Card>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-elec-yellow">
                      {resourceDialogContent[box.id as keyof typeof resourceDialogContent]?.title}
                    </DialogTitle>
                    <DialogDescription>
                      {resourceDialogContent[box.id as keyof typeof resourceDialogContent]?.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {resourceDialogContent[box.id as keyof typeof resourceDialogContent]?.content.map((item, idx) => (
                      <div key={idx} className="bg-elec-gray/70 p-3 rounded-md border border-elec-yellow/10">
                        <h3 className="font-medium text-sm text-elec-yellow">{item.title}</h3>
                        <p className="text-xs mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <DialogFooter className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      className="border-elec-yellow/30"
                      onClick={() => toast.success("Resource added to your saved items")}
                    >
                      Save Resource
                    </Button>
                    <Button 
                      className="bg-elec-yellow hover:bg-elec-yellow/80 text-black"
                      onClick={() => toast.success("Full guide will download shortly")}
                    >
                      Download Full Guide
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* Business Roadmap */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Building className="h-5 w-5 text-elec-yellow" />
              <span>Business Establishment Roadmap</span>
            </h3>
            
            <div className="space-y-4">
              {roadmapSteps.map((step, index) => (
                <Card key={step.id} className="border-elec-yellow/20 bg-elec-gray/80 transition-all hover:border-elec-yellow/40">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 flex items-start">
                        <div className="bg-elec-yellow text-elec-dark h-8 w-8 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                          {index + 1}
                        </div>
                      </div>
                      
                      <div className="space-y-2 flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="font-medium text-lg text-elec-yellow/90">{step.title}</h4>
                          <span className="text-xs bg-elec-dark px-3 py-1 rounded-full text-elec-yellow border border-elec-yellow/20">
                            {step.timeline}
                          </span>
                        </div>
                        
                        <p className="text-sm">{step.description}</p>
                        
                        <div className="pt-2">
                          <h5 className="text-xs text-elec-yellow mb-1.5">Key Tasks:</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                            {step.keyTasks.map((task, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-elec-yellow" />
                                <span className="text-xs">{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Collapsible 
            open={openSection === "legal"} 
            onOpenChange={() => toggleSection("legal")}
            className="border rounded-md overflow-hidden border-elec-yellow/20"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-elec-gray/70">
              <div className="flex items-center gap-3">
                <LucideShieldCheck className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Legal Requirements & Qualifications</h3>
              </div>
              <span className="text-elec-yellow">{openSection === "legal" ? "−" : "+"}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t border-elec-yellow/20 bg-elec-gray/40">
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Essential Qualifications</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Level 3 NVQ Diploma in Electrotechnical Services</li>
                    <li>City & Guilds 2365 Diploma in Electrical Installations</li>
                    <li>18th Edition Wiring Regulations (BS7671)</li>
                    <li>Inspection and Testing qualification (2391 or 2394/2395)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Competent Person Scheme Registration</h4>
                  <p className="text-sm mb-2">
                    You should register with one of the following competent person schemes:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>NICEIC (National Inspection Council for Electrical Installation Contracting)</li>
                    <li>NAPIT (National Association of Professional Inspectors and Testers)</li>
                    <li>ELECSA</li>
                    <li>SELECT (Scotland)</li>
                  </ul>
                  <p className="text-sm mt-2">
                    These organisations will assess your technical competence and provide certification that allows you to self-certify 
                    your work as compliant with Building Regulations, including Part P for domestic work.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Business Registration</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Register with HMRC as self-employed (sole trader) or establish a limited company via Companies House</li>
                    <li>Register for VAT if your turnover exceeds £85,000 (as of 2023/24 tax year)</li>
                    <li>Set up proper accounting systems to track income and expenses</li>
                    <li>Register with the Information Commissioner's Office (ICO) if handling customer data</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible 
            open={openSection === "financial"} 
            onOpenChange={() => toggleSection("financial")}
            className="border rounded-md overflow-hidden border-elec-yellow/20"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-elec-gray/70">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Financial Planning & Insurance</h3>
              </div>
              <span className="text-elec-yellow">{openSection === "financial" ? "−" : "+"}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t border-elec-yellow/20 bg-elec-gray/40">
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Essential Insurance</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><span className="font-medium">Public Liability Insurance</span> - Protects against claims for injury or damage caused to third parties or property (typically £2-5 million cover)</li>
                    <li><span className="font-medium">Professional Indemnity Insurance</span> - Covers errors or omissions in your work or advice</li>
                    <li><span className="font-medium">Employers' Liability Insurance</span> - Mandatory if you employ anyone (minimum £5 million cover)</li>
                    <li><span className="font-medium">Tool and Equipment Insurance</span> - Protects your tools against theft, damage or loss</li>
                    <li><span className="font-medium">Personal Accident Insurance</span> - Provides income if you're unable to work due to injury</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Startup Costs Estimation</h4>
                  <p className="text-sm mb-2">Typical startup costs include:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Tools and equipment: £2,000-£5,000</li>
                    <li>Vehicle and signage: £5,000-£15,000</li>
                    <li>Insurance: £500-£1,500 annually</li>
                    <li>Competent person scheme registration: £500-£1,000 annually</li>
                    <li>Accounting software: £10-£30 monthly</li>
                    <li>Marketing and website: £500-£2,000</li>
                    <li>Initial operational costs (3 months): £3,000-£5,000</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Pricing Your Services</h4>
                  <p className="text-sm">
                    When setting your rates, consider:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Your overhead costs (vehicle, tools, insurance, certifications)</li>
                    <li>Material costs and markup (typically 10-20%)</li>
                    <li>Your desired hourly rate (£30-£60 depending on location and expertise)</li>
                    <li>Market rates in your area (research competitors)</li>
                    <li>Include travel time and parking costs</li>
                    <li>Factor in time for quoting and administrative tasks</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible 
            open={openSection === "operations"} 
            onOpenChange={() => toggleSection("operations")}
            className="border rounded-md overflow-hidden border-elec-yellow/20"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-elec-gray/70">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Business Operations & Marketing</h3>
              </div>
              <span className="text-elec-yellow">{openSection === "operations" ? "−" : "+"}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t border-elec-yellow/20 bg-elec-gray/40">
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Essential Business Systems</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><span className="font-medium">Quoting system</span> - Standardised quoting process to ensure accuracy and consistency</li>
                    <li><span className="font-medium">Invoicing system</span> - Professional invoices with clear payment terms</li>
                    <li><span className="font-medium">Job scheduling</span> - System to track and manage appointments</li>
                    <li><span className="font-medium">Document management</span> - For certificates, invoices, and compliance documents</li>
                    <li><span className="font-medium">Customer database</span> - To build and maintain customer relationships</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Effective Marketing Strategies</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><span className="font-medium">Professional website</span> - With examples of your work, services, and contact information</li>
                    <li><span className="font-medium">Google My Business</span> - Essential for local search visibility</li>
                    <li><span className="font-medium">Social media presence</span> - Particularly Facebook and Instagram to showcase work</li>
                    <li><span className="font-medium">Vehicle branding</span> - A mobile billboard for your business</li>
                    <li><span className="font-medium">Local advertising</span> - Community noticeboards, local papers</li>
                    <li><span className="font-medium">Partnerships</span> - With builders, property managers, and estate agents</li>
                    <li><span className="font-medium">Customer reviews</span> - Build and showcase positive feedback</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Building Customer Trust</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Always provide detailed written quotes before starting work</li>
                    <li>Explain work clearly and in non-technical language</li>
                    <li>Be punctual and communicate any delays immediately</li>
                    <li>Leave work areas clean and tidy</li>
                    <li>Provide all necessary certification promptly</li>
                    <li>Offer warranties on your workmanship</li>
                    <li>Follow up after completing jobs</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible 
            open={openSection === "scalability"} 
            onOpenChange={() => toggleSection("scalability")}
            className="border rounded-md overflow-hidden border-elec-yellow/20"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-elec-gray/70">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Growth & Building a Team</h3>
              </div>
              <span className="text-elec-yellow">{openSection === "scalability" ? "−" : "+"}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t border-elec-yellow/20 bg-elec-gray/40">
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Growing Your Business</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Focus on a specific niche (domestic, commercial, industrial, renewable)</li>
                    <li>Develop recurring revenue streams (maintenance contracts, periodic testing)</li>
                    <li>Expand your service offering (EV chargers, smart home installations)</li>
                    <li>Pursue larger contracts as your capacity grows</li>
                    <li>Invest in efficiency improvements (tools, software, systems)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Taking on Staff</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Understand employer responsibilities (PAYE, National Insurance, pensions)</li>
                    <li>Consider subcontractors initially before full-time employees</li>
                    <li>Create clear job descriptions and performance expectations</li>
                    <li>Ensure proper health and safety policies are in place</li>
                    <li>Invest in training and development</li>
                    <li>Consider apprenticeships to develop talent with government support</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Common Pitfalls to Avoid</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Undercharging for services</li>
                    <li>Poor cash flow management</li>
                    <li>Taking on too much work too quickly</li>
                    <li>Inadequate record-keeping</li>
                    <li>Not setting aside funds for tax obligations</li>
                    <li>Failing to adapt to regulatory changes</li>
                    <li>Not investing in continued professional development</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible 
            open={openSection === "compliance"} 
            onOpenChange={() => toggleSection("compliance")}
            className="border rounded-md overflow-hidden border-elec-yellow/20"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-elec-gray/70">
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Regulatory Compliance & Standards</h3>
              </div>
              <span className="text-elec-yellow">{openSection === "compliance" ? "−" : "+"}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t border-elec-yellow/20 bg-elec-gray/40">
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Key Regulations to Know</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><span className="font-medium">BS 7671 (18th Edition Wiring Regulations)</span> - The UK standard for electrical installations</li>
                    <li><span className="font-medium">Building Regulations Part P</span> - Requires domestic electrical work to meet safety standards</li>
                    <li><span className="font-medium">Electricity at Work Regulations 1989</span> - Legal framework for electrical safety at work</li>
                    <li><span className="font-medium">Health and Safety at Work Act 1974</span> - Overall framework for workplace safety</li>
                    <li><span className="font-medium">Construction Design and Management (CDM) Regulations 2015</span> - For construction projects</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Notification Requirements</h4>
                  <p className="text-sm mb-2">
                    Certain electrical work must be notified to local building control authorities, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>New circuits in domestic properties</li>
                    <li>Work in special locations (bathrooms, swimming pools)</li>
                    <li>Consumer unit replacements</li>
                  </ul>
                  <p className="text-sm mt-2">
                    Membership in a competent person scheme allows you to self-certify work instead of going through building control.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-elec-yellow/90">Documentation Requirements</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Electrical Installation Certificate (EIC) for new installations</li>
                    <li>Electrical Installation Condition Report (EICR) for inspections</li>
                    <li>Minor Electrical Installation Works Certificate (MEIWC)</li>
                    <li>Building Regulations compliance certificates</li>
                    <li>Risk assessments and method statements</li>
                    <li>Public liability insurance certificates</li>
                    <li>Waste carrier license and waste transfer notes</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="bg-elec-yellow/10 p-4 rounded-md border border-elec-yellow/30 mt-6">
            <h3 className="font-semibold text-elec-yellow mb-2">Expert Tips for Success</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><span className="font-medium">Focus on reputation</span> - Word-of-mouth is your most powerful marketing tool</li>
              <li><span className="font-medium">Stay current</span> - Keep up with the latest regulations and technology trends</li>
              <li><span className="font-medium">Network effectively</span> - Join trade associations and local business groups</li>
              <li><span className="font-medium">Manage your finances carefully</span> - Set aside tax money and maintain a cash reserve</li>
              <li><span className="font-medium">Value your time</span> - Charge appropriately for your expertise and experience</li>
              <li><span className="font-medium">Invest in quality tools</span> - They increase efficiency and demonstrate professionalism</li>
              <li><span className="font-medium">Consider specialising</span> - Develop expertise in growing areas like renewable energy</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 pt-0">
          <Separator className="w-full bg-elec-yellow/20" />
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-elec-yellow" />
              <p className="text-sm font-medium">Need more help? Download our comprehensive business startup checklist</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-elec-yellow hover:bg-elec-yellow/80 text-black flex-grow shadow-md"
                onClick={handleDownload}
              >
                Download Business Startup Checklist
              </Button>
              <Button 
                variant="outline" 
                className="border-elec-yellow/30 hover:border-elec-yellow hover:bg-elec-yellow/10 flex-grow"
                onClick={() => toast.success("Consultation request received", {
                  description: "Our team will contact you shortly to schedule your business consultation"
                })}
              >
                Book a Business Consultation
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BusinessStartup;
