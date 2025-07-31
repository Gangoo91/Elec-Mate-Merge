
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { Shield, FileText, CheckCircle, AlertTriangle, ExternalLink, Scale, Clock, Building, Users, PoundSterling, Zap, BookOpen, Award, Phone } from "lucide-react";

const LegalComplianceTab = () => {
  const legalRequirements = [
    {
      category: "Business Registration & Structure",
      icon: <Building className="h-5 w-5" />,
      priority: "essential",
      timeframe: "1-2 weeks",
      description: "Establish your business legally and set up proper financial structures",
      detailedSteps: [
        {
          title: "Choose Business Structure",
          details: "Sole trader: Simple setup, personal liability, pay income tax. Limited company: More complex, limited liability, pay corporation tax.",
          cost: "£12-£100",
          links: [
            { text: "GOV.UK Business Structures Guide", url: "https://www.gov.uk/set-up-business" },
            { text: "Companies House Registration", url: "https://www.gov.uk/government/organisations/companies-house" }
          ]
        },
        {
          title: "Register with HMRC",
          details: "Register for self-employment (sole trader) or corporation tax (limited company). Must be done within 3 months of starting business.",
          cost: "Free",
          links: [
            { text: "Register as Self-Employed", url: "https://www.gov.uk/register-for-self-assessment" },
            { text: "Register a Company for Tax", url: "https://www.gov.uk/register-company-corporation-tax" }
          ]
        },
        {
          title: "Business Bank Account",
          details: "Separate business and personal finances. Required for limited companies, recommended for sole traders.",
          cost: "£0-£15/month",
          links: [
            { text: "Compare Business Accounts", url: "https://www.which.co.uk/money/banking/current-accounts/business-current-accounts" }
          ]
        },
        {
          title: "VAT Registration",
          details: "Mandatory if turnover exceeds £85,000. Can register voluntarily to reclaim VAT on business purchases.",
          cost: "Free",
          links: [
            { text: "VAT Registration", url: "https://www.gov.uk/vat-registration" },
            { text: "VAT Calculator", url: "https://www.gov.uk/vat-rates" }
          ]
        }
      ]
    },
    {
      category: "Professional Qualifications & Certifications",
      icon: <Award className="h-5 w-5" />,
      priority: "essential",
      timeframe: "Ongoing",
      description: "Essential qualifications to work legally as an electrician in the UK",
      detailedSteps: [
        {
          title: "Level 3 Electrical Installation",
          details: "City & Guilds 2365, EAL, or equivalent. Foundation for all electrical work in the UK.",
          cost: "£2,000-£4,000",
          links: [
            { text: "City & Guilds Electrical Courses", url: "https://www.cityandguilds.com/qualifications-and-apprenticeships/building-services-and-utilities/electrical-installation" },
            { text: "Find Training Providers", url: "https://www.gov.uk/government/publications/electrical-safety-training-providers" }
          ]
        },
        {
          title: "18th Edition IET Wiring Regulations (BS 7671)",
          details: "Updated every 3-5 years. Current edition essential for all electrical work. Amendment 2 is the latest.",
          cost: "£300-£500",
          links: [
            { text: "IET 18th Edition", url: "https://electrical.theiet.org/wiring-regulations/" },
            { text: "Book Training Course", url: "https://electrical.theiet.org/wiring-regulations/courses/" }
          ]
        },
        {
          title: "Inspection & Testing (2391)",
          details: "Essential for testing electrical installations. Required for Part P work and certification.",
          cost: "£800-£1,200",
          links: [
            { text: "2391 Course Providers", url: "https://www.cityandguilds.com/qualifications-and-apprenticeships/building-services-and-utilities/electrical-installation/2391" }
          ]
        },
        {
          title: "Part P Building Regulations",
          details: "Legal requirement for domestic electrical work in England and Wales. Need competent person registration.",
          cost: "£400-£800/year",
          links: [
            { text: "Part P Explained", url: "https://www.gov.uk/building-regulations-approval" },
            { text: "Competent Person Schemes", url: "https://www.gov.uk/competent-person-scheme-current-schemes-and-how-schemes-are-authorised" }
          ]
        }
      ]
    },
    {
      category: "Industry Scheme Membership",
      icon: <Shield className="h-5 w-5" />,
      priority: "essential",
      timeframe: "2-4 weeks",
      description: "Join recognised schemes for credibility and compliance",
      detailedSteps: [
        {
          title: "Choose Your Scheme",
          details: "NICEIC, NAPIT, ELECSA, or STROMA. Each offers Part P registration and industry recognition.",
          cost: "£300-£800/year",
          links: [
            { text: "NICEIC", url: "https://www.niceic.com/" },
            { text: "NAPIT", url: "https://www.napit.org.uk/" },
            { text: "ELECSA", url: "https://www.elecsa.co.uk/" },
            { text: "STROMA", url: "https://www.stroma.com/" }
          ]
        },
        {
          title: "Assessment Process",
          details: "Technical assessment, portfolio review, and ongoing monitoring. Usually takes 2-4 weeks.",
          cost: "Included in membership",
          links: [
            { text: "NICEIC Assessment", url: "https://www.niceic.com/find-a-contractor/approved-contractor-scheme/assessment-process" }
          ]
        },
        {
          title: "TrustMark Registration",
          details: "Government-endorsed quality scheme. Recommended for domestic work and customer trust.",
          cost: "£300-£500/year",
          links: [
            { text: "TrustMark", url: "https://www.trustmark.org.uk/" }
          ]
        }
      ]
    },
    {
      category: "Insurance Requirements",
      icon: <Shield className="h-5 w-5" />,
      priority: "essential",
      timeframe: "1 week",
      description: "Comprehensive insurance coverage for electrical work",
      detailedSteps: [
        {
          title: "Public Liability Insurance",
          details: "Minimum £2M coverage. Essential for all electrical work. Covers damage to third-party property and injury claims.",
          cost: "£800-£2,500/year",
          links: [
            { text: "Simply Business", url: "https://www.simplybusiness.co.uk/public-liability-insurance/" },
            { text: "Checkatrade Insurance", url: "https://www.checkatrade.com/trades/business-insurance/" }
          ]
        },
        {
          title: "Professional Indemnity",
          details: "Covers errors in design or advice. £250K-£1M coverage recommended for electrical design work.",
          cost: "£300-£800/year",
          links: [
            { text: "Professional Indemnity Guide", url: "https://www.simplybusiness.co.uk/professional-indemnity-insurance/" }
          ]
        },
        {
          title: "Employers' Liability",
          details: "Legal requirement if you employ staff. Minimum £10M coverage. £5M fine for non-compliance.",
          cost: "£500-£1,500/year",
          links: [
            { text: "Employers' Liability Info", url: "https://www.hse.gov.uk/insurance/employers-liability.htm" }
          ]
        },
        {
          title: "Tool Insurance",
          details: "Covers theft and damage to tools and equipment. Many policies include cover away from home.",
          cost: "£200-£600/year",
          links: [
            { text: "Tool Insurance Comparison", url: "https://www.simplybusiness.co.uk/tools-insurance/" }
          ]
        }
      ]
    },
    {
      category: "Health & Safety Compliance",
      icon: <AlertTriangle className="h-5 w-5" />,
      priority: "essential",
      timeframe: "1 week",
      description: "Legal H&S requirements for electrical contractors",
      detailedSteps: [
        {
          title: "Risk Assessments",
          details: "Legal requirement under Management of Health and Safety at Work Regulations. Must be written if 5+ employees.",
          cost: "Time investment",
          links: [
            { text: "HSE Risk Assessment", url: "https://www.hse.gov.uk/simple-health-safety/risk/" },
            { text: "Electrical Risk Templates", url: "https://www.hse.gov.uk/electricity/information/risk.htm" }
          ]
        },
        {
          title: "Method Statements",
          details: "Written procedures for high-risk electrical work. Required for many commercial contracts.",
          cost: "Time investment",
          links: [
            { text: "Method Statement Guide", url: "https://www.hse.gov.uk/construction/cdm/2015/method-statements.htm" }
          ]
        },
        {
          title: "COSHH Assessments",
          details: "Required for hazardous substances. Many electrical materials require COSHH assessment.",
          cost: "Time investment",
          links: [
            { text: "COSHH Regulations", url: "https://www.hse.gov.uk/coshh/" }
          ]
        }
      ]
    },
    {
      category: "Data Protection & Documentation",
      icon: <FileText className="h-5 w-5" />,
      priority: "important",
      timeframe: "1-2 weeks",
      description: "GDPR compliance and proper documentation systems",
      detailedSteps: [
        {
          title: "GDPR Compliance",
          details: "If you store customer data electronically or on paper, you must comply with GDPR. Includes customer contact details, site information.",
          cost: "Time investment",
          links: [
            { text: "ICO GDPR Guide", url: "https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/" },
            { text: "Small Business GDPR", url: "https://ico.org.uk/for-organisations/sme-web-hub/" }
          ]
        },
        {
          title: "Electrical Certification",
          details: "Must issue correct certificates for all electrical work. Keep copies for minimum 6 years.",
          cost: "Certificate books £30-£50",
          links: [
            { text: "NICEIC Certificates", url: "https://www.niceic.com/certificates" },
            { text: "Certificate Requirements", url: "https://electrical.theiet.org/wiring-matters/years/2018/95-april-2018/certification/" }
          ]
        }
      ]
    }
  ];

  const emergencyContacts = [
    {
      organisation: "HSE Emergency",
      contact: "0151 922 9235",
      purpose: "Report serious accidents/incidents",
      hours: "24/7"
    },
    {
      organisation: "Electrical Safety First",
      contact: "020 3463 5100",
      purpose: "Technical guidance and safety advice",
      hours: "9am-5pm weekdays"
    },
    {
      organisation: "Local Building Control",
      contact: "Contact your local council",
      purpose: "Building regulations advice",
      hours: "Office hours"
    }
  ];

  const costCalculator = [
    { item: "Level 3 Qualification", minCost: 2000, maxCost: 4000, priority: "Essential" },
    { item: "18th Edition", minCost: 300, maxCost: 500, priority: "Essential" },
    { item: "Testing & Inspection", minCost: 800, maxCost: 1200, priority: "Essential" },
    { item: "Scheme Membership", minCost: 300, maxCost: 800, priority: "Essential" },
    { item: "Public Liability Insurance", minCost: 800, maxCost: 2500, priority: "Essential" },
    { item: "Professional Indemnity", minCost: 300, maxCost: 800, priority: "Recommended" },
    { item: "Company Registration", minCost: 12, maxCost: 100, priority: "Essential" },
    { item: "Business Bank Account", minCost: 0, maxCost: 180, priority: "Essential" }
  ];

  const totalMinCost = costCalculator.filter(item => item.priority === "Essential").reduce((sum, item) => sum + item.minCost, 0);
  const totalMaxCost = costCalculator.filter(item => item.priority === "Essential").reduce((sum, item) => sum + item.maxCost, 0);

  return (
    <div className="space-y-4">
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">
          <div className="space-y-2">
            <p className="font-semibold">Legal compliance is mandatory before starting electrical work.</p>
            <p>Non-compliance can result in:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Unlimited fines for serious safety breaches</li>
              <li>Up to 2 years imprisonment for gross negligence</li>
              <li>Insurance claims being invalidated</li>
              <li>Prohibition from working in the electrical industry</li>
              <li>Personal liability for accidents and damages</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      {/* Cost Summary */}
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Essential Setup Costs Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <h4 className="font-semibold text-green-200 mb-2">Minimum Essential Costs</h4>
              <p className="text-2xl font-bold text-green-100">£{totalMinCost.toLocaleString()}</p>
              <p className="text-sm text-green-300">Basic setup to start legally</p>
            </div>
            <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <h4 className="font-semibold text-green-200 mb-2">Comprehensive Setup</h4>
              <p className="text-2xl font-bold text-green-100">£{totalMaxCost.toLocaleString()}</p>
              <p className="text-sm text-green-300">Full professional setup</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold text-green-200">Cost Breakdown:</h4>
            {costCalculator.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-green-300">{item.item}</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-200">£{item.minCost.toLocaleString()} - £{item.maxCost.toLocaleString()}</span>
                  <Badge variant="outline" className={`text-xs ${item.priority === 'Essential' ? 'border-red-400/50 text-red-300' : 'border-yellow-400/50 text-yellow-300'}`}>
                    {item.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency & Support Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
                <h4 className="font-semibold text-red-200">{contact.organisation}</h4>
                <p className="text-red-100 font-mono">{contact.contact}</p>
                <p className="text-sm text-red-300">{contact.purpose}</p>
                <p className="text-xs text-red-400">{contact.hours}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <MobileAccordion type="single" collapsible className="space-y-4">
        {legalRequirements.map((section, index) => (
          <MobileAccordionItem key={index} value={`legal-${index}`}>
            <MobileAccordionTrigger 
              icon={section.icon}
              className={`${
                section.priority === 'essential' 
                  ? 'border-red-500/50 bg-red-500/10 text-red-300' 
                  : 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300'
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="font-semibold">{section.category}</span>
                <span className="text-xs opacity-80">{section.description}</span>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className={`text-xs ${
                    section.priority === 'essential' 
                      ? 'border-red-400/50 text-red-300 bg-red-500/10' 
                      : 'border-yellow-400/50 text-yellow-300 bg-yellow-500/10'
                  }`}>
                    {section.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-primary/50 text-primary bg-primary/10">
                    <Clock className="h-3 w-3 mr-1" />
                    {section.timeframe}
                  </Badge>
                </div>
              </div>
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="space-y-6 p-4">
                {section.detailedSteps.map((step, stepIndex) => (
                  <div key={stepIndex} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-primary">{step.title}</h4>
                      <Badge variant="outline" className="text-green-300 border-green-400/30 bg-green-500/10">
                        {step.cost}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{step.details}</p>
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm text-primary">Useful Links:</h5>
                      <div className="flex flex-wrap gap-2">
                        {step.links.map((link, linkIndex) => (
                          <Button 
                            key={linkIndex} 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-xs"
                            onClick={() => window.open(link.url, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {link.text}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        ))}
      </MobileAccordion>

      {/* Legal Disclaimer */}
      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <BookOpen className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-yellow-200">
          <div className="space-y-2">
            <p className="font-semibold">Legal Disclaimer</p>
            <p className="text-sm">This information is for guidance only and should not be considered as legal advice. Requirements may vary by location and circumstances. Always consult with qualified professionals including:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Qualified solicitors for legal structure advice</li>
              <li>Chartered accountants for tax and VAT guidance</li>
              <li>Insurance brokers for appropriate coverage</li>
              <li>Your chosen competent person scheme for technical requirements</li>
            </ul>
            <p className="text-sm">Regulations change frequently - always verify current requirements with official sources.</p>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default LegalComplianceTab;
