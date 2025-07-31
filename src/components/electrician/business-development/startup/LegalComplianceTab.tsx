
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { Shield, FileText, CheckCircle, AlertTriangle, ExternalLink, Scale, Clock, Building, Users, PoundSterling, Zap, BookOpen, Award, Phone, Calculator } from "lucide-react";
import { useState } from "react";

const LegalComplianceTab = () => {
  const [selectedCosts, setSelectedCosts] = useState<{[key: string]: boolean}>({
    "Level 3 Qualification": true,
    "18th Edition": true,
    "Testing & Inspection": true,
    "Scheme Membership": true,
    "Public Liability Insurance": true,
    "Professional Indemnity": false,
    "Company Registration": true,
    "Business Bank Account": true,
    "Basic Tool Kit": true,
    "Multimeter & Test Equipment": true,
    "Van/Transport": true,
    "Van Insurance": true,
    "Tool Insurance": false,
    "Mobile Phone & Plan": true,
    "Laptop/Tablet for Certificates": true,
    "Marketing & Website": false,
    "Accountancy Software": false,
    "Initial Marketing Budget": false,
    "Emergency Fund (3 months)": false,
    "Uniforms & PPE": true,
    "Office Setup (Home)": false,
    "Certificate Books & Stationery": true
  });

  const [customCosts, setCustomCosts] = useState<{[key: string]: {min: number, max: number}}>({});
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
            { text: "City & Guilds Courses", url: "https://www.cityandguilds.com/qualifications-and-apprenticeships/building-services-and-utilities/electrical-installation" },
            { text: "Training Providers", url: "https://www.gov.uk/government/publications/electrical-safety-training-providers" }
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
    { item: "Business Bank Account", minCost: 0, maxCost: 180, priority: "Essential" },
    { item: "Basic Tool Kit", minCost: 1500, maxCost: 5000, priority: "Essential" },
    { item: "Multimeter & Test Equipment", minCost: 500, maxCost: 2000, priority: "Essential" },
    { item: "Van/Transport", minCost: 8000, maxCost: 25000, priority: "Essential" },
    { item: "Van Insurance", minCost: 800, maxCost: 2000, priority: "Essential" },
    { item: "Tool Insurance", minCost: 200, maxCost: 600, priority: "Recommended" },
    { item: "Mobile Phone & Plan", minCost: 200, maxCost: 600, priority: "Essential" },
    { item: "Laptop/Tablet for Certificates", minCost: 300, maxCost: 1200, priority: "Essential" },
    { item: "Marketing & Website", minCost: 500, maxCost: 3000, priority: "Recommended" },
    { item: "Accountancy Software", minCost: 100, maxCost: 500, priority: "Recommended" },
    { item: "Initial Marketing Budget", minCost: 500, maxCost: 2000, priority: "Recommended" },
    { item: "Emergency Fund (3 months)", minCost: 3000, maxCost: 8000, priority: "Recommended" },
    { item: "Uniforms & PPE", minCost: 200, maxCost: 800, priority: "Essential" },
    { item: "Office Setup (Home)", minCost: 500, maxCost: 2000, priority: "Recommended" },
    { item: "Certificate Books & Stationery", minCost: 100, maxCost: 300, priority: "Essential" }
  ];

  const calculateSelectedCosts = () => {
    return costCalculator.reduce((totals, item) => {
      if (selectedCosts[item.item]) {
        const custom = customCosts[item.item];
        const minCost = custom?.min ?? item.minCost;
        const maxCost = custom?.max ?? item.maxCost;
        totals.min += minCost;
        totals.max += maxCost;
      }
      return totals;
    }, { min: 0, max: 0 });
  };

  const { min: totalMinCost, max: totalMaxCost } = calculateSelectedCosts();

  const toggleCostItem = (itemName: string) => {
    setSelectedCosts(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const updateCustomCost = (itemName: string, type: 'min' | 'max', value: number) => {
    setCustomCosts(prev => ({
      ...prev,
      [itemName]: {
        ...prev[itemName],
        [type]: value
      }
    }));
  };

  const qualificationPathways = [
    {
      route: "Traditional Apprenticeship",
      duration: "3-4 years",
      description: "Combination of workplace learning and college study",
      pros: ["Earn while you learn", "Comprehensive experience", "Industry recognition"],
      cons: ["Long duration", "Lower initial wages"],
      suitability: "School leavers, career changers with time"
    },
    {
      route: "Adult Training Course",
      duration: "6-18 months",
      description: "Intensive college-based training programs",
      pros: ["Faster qualification", "Focused learning", "Modern facilities"],
      cons: ["High upfront costs", "Limited practical experience", "No income during training"],
      suitability: "Career changers, mature students"
    },
    {
      route: "Distance Learning + Assessment",
      duration: "12-24 months",
      description: "Online study with practical assessments",
      pros: ["Flexible timing", "Study while working", "Lower costs"],
      cons: ["Requires self-discipline", "Limited practical guidance", "Less networking"],
      suitability: "Working professionals, geographically remote"
    }
  ];

  const regionalDifferences = [
    {
      region: "England",
      partP: "Mandatory for domestic electrical work",
      buildingRegs: "Part P of Building Regulations",
      schemes: "NICEIC, NAPIT, ELECSA, STROMA",
      notes: "Strictest enforcement, highest scheme costs"
    },
    {
      region: "Wales", 
      partP: "Mandatory for domestic electrical work",
      buildingRegs: "Part P of Building Regulations",
      schemes: "NICEIC, NAPIT, ELECSA, STROMA",
      notes: "Same as England but some Welsh language requirements"
    },
    {
      region: "Scotland",
      partP: "Not applicable",
      buildingRegs: "Building Standards - Section 4",
      schemes: "SELECT, NICEIC, NAPIT",
      notes: "Different building standards, SELECT scheme preferred"
    },
    {
      region: "Northern Ireland",
      partP: "Not applicable", 
      buildingRegs: "Building Regulations NI",
      schemes: "NICEIC, NAPIT",
      notes: "Separate jurisdiction, different regulations"
    }
  ];

  const commonMistakes = [
    {
      mistake: "Working without proper certification",
      consequence: "Unlimited fines, prosecution, insurance invalidation",
      howToAvoid: "Complete all qualifications before starting work",
      realCost: "£10,000+ in fines + legal costs"
    },
    {
      mistake: "Not registering for VAT when required",
      consequence: "Penalties up to 100% of VAT owed",
      howToAvoid: "Monitor turnover, register when approaching £85k",
      realCost: "£17,000+ in penalties for £85k turnover"
    },
    {
      mistake: "Inadequate insurance coverage",
      consequence: "Personal liability for claims, business closure",
      howToAvoid: "Get minimum £2M public liability, professional indemnity",
      realCost: "Unlimited personal liability"
    },
    {
      mistake: "Poor record keeping",
      consequence: "HMRC penalties, unable to prove compliance",
      howToAvoid: "Digital records, cloud backup, 6+ years retention",
      realCost: "£3,000+ in penalties + time costs"
    },
    {
      mistake: "Not updating qualifications",
      consequence: "Loss of competent person status, unable to certify work",
      howToAvoid: "Set calendar reminders for renewal dates",
      realCost: "Loss of income + re-qualification costs"
    }
  ];

  const implementationTimeline = [
    {
      phase: "Preparation Phase",
      duration: "2-6 months",
      tasks: [
        "Research qualification requirements",
        "Choose training provider",
        "Apply for funding if available",
        "Begin Level 3 course",
        "Start building emergency fund"
      ]
    },
    {
      phase: "Qualification Phase", 
      duration: "6-18 months",
      tasks: [
        "Complete Level 3 electrical installation",
        "Pass 18th Edition exam",
        "Complete testing & inspection (2391)",
        "Gain practical experience",
        "Build portfolio of work"
      ]
    },
    {
      phase: "Business Setup Phase",
      duration: "2-4 weeks",
      tasks: [
        "Choose business structure",
        "Register with Companies House/HMRC",
        "Open business bank account",
        "Get insurance quotes and coverage",
        "Apply for competent person scheme"
      ]
    },
    {
      phase: "Launch Phase",
      duration: "1-2 weeks",
      tasks: [
        "Final scheme assessment",
        "Register for VAT if needed",
        "Set up accounting systems",
        "Create certificates and documentation",
        "Begin marketing and networking"
      ]
    }
  ];

  const ongoingCompliance = [
    {
      requirement: "18th Edition Updates",
      frequency: "Every 3-5 years",
      cost: "£300-£500",
      consequence: "Cannot certify new work",
      reminder: "Set 2-year advance reminder"
    },
    {
      requirement: "Scheme Membership Renewal",
      frequency: "Annual",
      cost: "£300-£800",
      consequence: "Loss of competent person status",
      reminder: "Auto-renew to avoid lapses"
    },
    {
      requirement: "Insurance Renewal",
      frequency: "Annual",
      cost: "£800-£3,000",
      consequence: "Uninsured work, personal liability",
      reminder: "Review and compare 2 months before expiry"
    },
    {
      requirement: "CPD Training",
      frequency: "Ongoing (min 20 hours/year)",
      cost: "£200-£1,000",
      consequence: "Scheme membership issues",
      reminder: "Track hours monthly"
    },
    {
      requirement: "Tax Returns",
      frequency: "Annual (by 31 Jan)",
      cost: "£300-£1,500 (accountant)",
      consequence: "HMRC penalties starting at £100",
      reminder: "Prepare by December"
    }
  ];

  const documentTemplates = [
    {
      document: "Risk Assessment Template",
      description: "Standard electrical work risk assessment",
      format: "PDF/Word",
      link: "https://www.hse.gov.uk/electricity/information/risk.htm"
    },
    {
      document: "Method Statement Template", 
      description: "Safe working procedures for electrical tasks",
      format: "PDF/Word",
      link: "https://www.hse.gov.uk/construction/cdm/2015/method-statements.htm"
    },
    {
      document: "COSHH Assessment Forms",
      description: "Chemical/material safety assessments",
      format: "PDF/Excel",
      link: "https://www.hse.gov.uk/coshh/basics/assessment.htm"
    },
    {
      document: "Electrical Certificate Templates",
      description: "EIC, EICR, Minor Works certificates",
      format: "Carbonless books",
      link: "https://www.niceic.com/certificates"
    }
  ];

  const frequentlyAskedQuestions = [
    {
      question: "Can I start work while still training?",
      answer: "No. You must complete all qualifications and gain competent person status before working unsupervised on electrical installations. Working without proper certification is illegal and dangerous."
    },
    {
      question: "Do I need Part P registration for all electrical work?",
      answer: "Part P only applies to domestic electrical work in England and Wales. Commercial work doesn't require Part P, but you still need proper qualifications and scheme membership."
    },
    {
      question: "What happens if I don't renew my scheme membership?",
      answer: "You immediately lose competent person status and cannot self-certify electrical work. You'll need to use local authority building control for all jobs, which is expensive and time-consuming."
    },
    {
      question: "Can I be a sole trader and still get public liability insurance?",
      answer: "Yes. Business structure doesn't affect insurance availability. However, as a sole trader, you have unlimited personal liability, making insurance even more important."
    },
    {
      question: "How often do regulations change?",
      answer: "BS 7671 (Wiring Regulations) updates every 3-5 years with amendments in between. Building regulations and safety standards can change annually. Stay subscribed to industry updates."
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertDescription className="text-red-200">
          <div className="space-y-4 text-center">
            <div>
              <p className="font-semibold text-lg mb-2">Legal compliance is mandatory before starting electrical work.</p>
              <p className="text-red-300 font-medium">Non-compliance can result in:</p>
            </div>
            <div className="space-y-3">
              <div className="text-center">
                <span className="text-red-400 font-bold">•</span>
                <span className="text-sm leading-relaxed ml-2">Unlimited fines for serious safety breaches</span>
              </div>
              <div className="text-center">
                <span className="text-red-400 font-bold">•</span>
                <span className="text-sm leading-relaxed ml-2">Up to 2 years imprisonment for gross negligence</span>
              </div>
              <div className="text-center">
                <span className="text-red-400 font-bold">•</span>
                <span className="text-sm leading-relaxed ml-2">Insurance claims being invalidated</span>
              </div>
              <div className="text-center">
                <span className="text-red-400 font-bold">•</span>
                <span className="text-sm leading-relaxed ml-2">Prohibition from working in the electrical industry</span>
              </div>
              <div className="text-center">
                <span className="text-red-400 font-bold">•</span>
                <span className="text-sm leading-relaxed ml-2">Personal liability for accidents and damages</span>
              </div>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Interactive Cost Calculator */}
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Interactive Cost Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <h4 className="font-semibold text-green-200 mb-2">Your Minimum Cost</h4>
              <p className="text-2xl font-bold text-green-100">£{totalMinCost.toLocaleString()}</p>
              <p className="text-sm text-green-300">Selected items - minimum</p>
            </div>
            <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <h4 className="font-semibold text-green-200 mb-2">Your Maximum Cost</h4>
              <p className="text-2xl font-bold text-green-100">£{totalMaxCost.toLocaleString()}</p>
              <p className="text-sm text-green-300">Selected items - maximum</p>
            </div>
          </div>
          
          <MobileAccordion type="single" collapsible className="w-full">
            <MobileAccordionItem value="requirements">
              <MobileAccordionTrigger 
                icon={<PoundSterling className="h-5 w-5 text-green-400" />}
                className="border-green-500/50 bg-green-500/10 text-green-300"
              >
                <div className="flex flex-col items-center text-center w-full">
                  <span className="font-semibold text-lg mb-1">Select Your Requirements</span>
                  <span className="text-sm opacity-80">Choose items to include in your cost calculation</span>
                </div>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="space-y-4 p-4">
                  {costCalculator.map((item, index) => {
                    const isSelected = selectedCosts[item.item];
                    const custom = customCosts[item.item];
                    const displayMinCost = custom?.min ?? item.minCost;
                    const displayMaxCost = custom?.max ?? item.maxCost;
                    
                    return (
                      <div key={index} className={`p-4 border rounded-lg transition-all bg-elec-gray ${
                        isSelected 
                          ? 'border-green-500/40 bg-green-500/10' 
                          : 'border-green-500/20 bg-green-500/5'
                      }`}>
                        <div className="flex flex-col items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleCostItem(item.item)}
                            className="w-4 h-4 rounded border-green-500/30 bg-green-500/10 text-green-400 focus:ring-green-400 focus:ring-2"
                          />
                          <span className={`font-medium text-center ${isSelected ? 'text-green-200' : 'text-green-400'}`}>
                            {item.item}
                          </span>
                        </div>
                        
                        {isSelected && (
                          <div className="mt-3 pt-3 border-t border-green-500/20">
                            <div className="space-y-3">
                              <div>
                                <label className="text-xs text-green-300 block mb-1">Min Cost (£)</label>
                                <Input
                                  type="number"
                                  value={displayMinCost}
                                  onChange={(e) => updateCustomCost(item.item, 'min', parseInt(e.target.value) || 0)}
                                  className="bg-green-500/10 border-green-500/30 text-green-100 h-8"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-green-300 block mb-1">Max Cost (£)</label>
                                <Input
                                  type="number"
                                  value={displayMaxCost}
                                  onChange={(e) => updateCustomCost(item.item, 'max', parseInt(e.target.value) || 0)}
                                  className="bg-green-500/10 border-green-500/30 text-green-100 h-8"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {!isSelected && (
                          <div className="text-green-400 text-sm">
                            £{item.minCost.toLocaleString()} - £{item.maxCost.toLocaleString()}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Navigation back to totals */}
                <div className="p-4 border-t border-green-500/20">
                  <Button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30 h-auto py-3"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <Calculator className="h-4 w-4" />
                        <span>View Total Calculation</span>
                      </div>
                      <div className="text-xs">
                        <div>Min: £{totalMinCost.toLocaleString()}</div>
                        <div>Max: £{totalMaxCost.toLocaleString()}</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          </MobileAccordion>
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
        {/* Qualification Pathways */}
        <MobileAccordionItem value="qualification-pathways">
          <MobileAccordionTrigger 
            icon={<BookOpen className="h-5 w-5 text-blue-400" />}
            className="border-blue-500/50 bg-blue-500/10 text-blue-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Qualification Pathways</span>
              <span className="text-xs opacity-80">Different routes to becoming qualified</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-6 p-4">
              {qualificationPathways.map((pathway, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-primary">{pathway.route}</h4>
                    <Badge variant="outline" className="text-blue-300 border-blue-400/30 bg-blue-500/10">
                      {pathway.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{pathway.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="font-medium text-green-300 mb-2">Pros:</h5>
                      <ul className="space-y-1">
                        {pathway.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="text-sm text-green-200 flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-300 mb-2">Cons:</h5>
                      <ul className="space-y-1">
                        {pathway.cons.map((con, conIndex) => (
                          <li key={conIndex} className="text-sm text-red-200 flex items-start gap-2">
                            <AlertTriangle className="h-3 w-3 mt-1 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-primary/10 rounded border border-primary/20">
                    <p className="text-sm text-primary">
                      <strong>Best for:</strong> {pathway.suitability}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Regional Differences */}
        <MobileAccordionItem value="regional-differences">
          <MobileAccordionTrigger 
            icon={<Users className="h-5 w-5 text-purple-400" />}
            className="border-purple-500/50 bg-purple-500/10 text-purple-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Regional Differences</span>
              <span className="text-xs opacity-80">UK regulations vary by country</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-4 p-4">
              {regionalDifferences.map((region, index) => (
                <div key={index} className="border border-border rounded-lg p-4 bg-elec-gray">
                  <h4 className="font-semibold text-primary mb-3 text-center">{region.region}</h4>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-sm text-muted-foreground text-left">Part P:</span>
                      <span className="text-sm text-foreground text-right">{region.partP}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-sm text-muted-foreground text-left">Building Regs:</span>
                      <span className="text-sm text-foreground text-right">{region.buildingRegs}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-sm text-muted-foreground text-left">Main Schemes:</span>
                      <span className="text-sm text-foreground text-right">{region.schemes}</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                    <p className="text-sm text-yellow-300 text-center">{region.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Common Mistakes to Avoid */}
        <MobileAccordionItem value="common-mistakes">
          <MobileAccordionTrigger 
            icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
            className="border-red-500/50 bg-red-500/10 text-red-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Common Mistakes to Avoid</span>
              <span className="text-xs opacity-80">Learn from others' costly errors</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-4 p-4">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
                  <h4 className="font-semibold text-red-300 mb-2">{mistake.mistake}</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-500/10 rounded border border-red-500/20">
                      <p className="text-sm text-red-200">
                        <strong>Consequence:</strong> {mistake.consequence}
                      </p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
                      <p className="text-sm text-green-200">
                        <strong>How to avoid:</strong> {mistake.howToAvoid}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Potential cost:</span>
                      <Badge variant="outline" className="text-red-300 border-red-400/30 bg-red-500/10">
                        {mistake.realCost}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Implementation Timeline */}
        <MobileAccordionItem value="implementation-timeline">
          <MobileAccordionTrigger 
            icon={<Clock className="h-5 w-5 text-orange-400" />}
            className="border-orange-500/50 bg-orange-500/10 text-orange-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Implementation Timeline</span>
              <span className="text-xs opacity-80">Step-by-step roadmap to compliance</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-6 p-4">
              {implementationTimeline.map((phase, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-primary">{phase.phase}</h4>
                    <Badge variant="outline" className="text-orange-300 border-orange-400/30 bg-orange-500/10">
                      {phase.duration}
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary mt-0.5 flex-shrink-0">
                          {taskIndex + 1}
                        </div>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Ongoing Compliance Requirements */}
        <MobileAccordionItem value="ongoing-compliance">
          <MobileAccordionTrigger 
            icon={<Scale className="h-5 w-5 text-indigo-400" />}
            className="border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Ongoing Compliance Requirements</span>
              <span className="text-xs opacity-80">Annual renewals and updates</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-4 p-4">
              {ongoingCompliance.map((requirement, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-primary">{requirement.requirement}</h4>
                    <div className="text-right">
                      <Badge variant="outline" className="text-indigo-300 border-indigo-400/30 bg-indigo-500/10 mb-1">
                        {requirement.frequency}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{requirement.cost}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-red-500/10 rounded border border-red-500/20">
                      <p className="text-sm text-red-200">
                        <strong>If missed:</strong> {requirement.consequence}
                      </p>
                    </div>
                    <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20">
                      <p className="text-sm text-blue-200">
                        <strong>Reminder tip:</strong> {requirement.reminder}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Document Templates & Resources */}
        <MobileAccordionItem value="document-templates">
          <MobileAccordionTrigger 
            icon={<FileText className="h-5 w-5 text-teal-400" />}
            className="border-teal-500/50 bg-teal-500/10 text-teal-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Document Templates & Resources</span>
              <span className="text-xs opacity-80">Free templates and forms</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-4 p-4">
              {documentTemplates.map((doc, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-primary">{doc.document}</h4>
                    <Badge variant="outline" className="text-teal-300 border-teal-400/30 bg-teal-500/10">
                      {doc.format}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(doc.link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Frequently Asked Questions */}
        <MobileAccordionItem value="faq">
          <MobileAccordionTrigger 
            icon={<BookOpen className="h-5 w-5 text-cyan-400" />}
            className="border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Frequently Asked Questions</span>
              <span className="text-xs opacity-80">Common queries answered</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-4 p-4">
              {frequentlyAskedQuestions.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-3">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

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
              <div className="flex flex-col items-center text-center w-full">
                <span className="font-semibold text-lg mb-1">{section.category}</span>
                <span className="text-sm opacity-80 mb-3">{section.description}</span>
                <div className="flex gap-2 justify-center">
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
                  <div key={stepIndex} className="border border-border rounded-lg p-4 bg-elec-gray">
                    <div className="text-center mb-3">
                      <h4 className="font-semibold text-primary text-lg">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed text-center">{step.details}</p>
                    <div className="space-y-3">
                      <h5 className="font-medium text-sm text-primary text-center">Useful Links:</h5>
                      <div className="grid grid-cols-1 gap-2">
                        {step.links.map((link, linkIndex) => (
                          <Button 
                            key={linkIndex} 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-xs w-full justify-center"
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
        <AlertDescription className="text-yellow-200">
          <div className="space-y-4 text-center">
            <div>
              <p className="font-semibold text-lg mb-2">Legal Disclaimer</p>
              <p className="text-sm">This information is for guidance only and should not be considered as legal advice. Requirements may vary by location and circumstances. Always consult with qualified professionals including:</p>
            </div>
            <div className="space-y-3">
              <div className="text-center">
                <span className="text-yellow-400 font-bold">•</span>
                <span className="text-sm leading-relaxed ml-2">Qualified solicitors for legal structure advice</span>
              </div>
              <div className="text-center">
                <span className="text-yellow-400 font-bold">•</span>
                <span className="text-sm leading-relaxed ml-2">Chartered accountants for tax and VAT guidance</span>
              </div>
              <div className="text-center">
                <span className="text-yellow-400 font-bold">•</span>
                <span className="text-sm leading-relaxed ml-2">Insurance brokers for appropriate coverage</span>
              </div>
              <div className="text-center">
                <span className="text-yellow-400 font-bold">•</span>
                <span className="text-sm leading-relaxed ml-2">Your chosen competent person scheme for technical requirements</span>
              </div>
            </div>
            <p className="text-sm">Regulations change frequently - always verify current requirements with official sources.</p>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default LegalComplianceTab;
