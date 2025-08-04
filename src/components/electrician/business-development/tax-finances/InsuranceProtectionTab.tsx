
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  MobileAccordion, 
  MobileAccordionContent, 
  MobileAccordionItem, 
  MobileAccordionTrigger 
} from "@/components/ui/mobile-accordion";
import { 
  Shield, 
  AlertTriangle, 
  Heart, 
  Home,
  Calculator,
  Users,
  Building2,
  Receipt,
  FileText,
  Clock,
  CheckCircle2,
  Target,
  TrendingUp,
  PiggyBank,
  Briefcase,
  Phone,
  Globe,
  BookOpen,
  Map,
  Network,
  GraduationCap,
  CreditCard,
  Lightbulb,
  Car,
  Wrench,
  Zap
} from "lucide-react";

const InsuranceProtectionTab = () => {
  const insuranceMetrics = [
    {
      metric: "Public Liability Coverage",
      data: "£2 million minimum",
      icon: <Shield className="h-5 w-5 text-purple-400" />,
      detail: "Standard requirement for most clients"
    },
    {
      metric: "Professional Indemnity",
      data: "£250k - £2 million",
      icon: <AlertTriangle className="h-5 w-5 text-blue-400" />,
      detail: "For design and advisory work"
    },
    {
      metric: "Annual Insurance Cost",
      data: "£800 - £2,500",
      icon: <Calculator className="h-5 w-5 text-green-400" />,
      detail: "Typical comprehensive coverage"
    },
    {
      metric: "Employer Liability",
      data: "£10 million",
      icon: <Users className="h-5 w-5 text-orange-400" />,
      detail: "Legal minimum if employing staff"
    }
  ];

  const insuranceSections = [
    {
      title: "Essential Insurance Coverage",
      icon: <Shield className="h-5 w-5 text-purple-400" />,
      theme: "purple",
      cards: [
        {
          title: "Public Liability Insurance",
          color: "purple",
          icon: <Shield className="h-4 w-4" />,
          content: "Essential protection against third-party injury or property damage claims. £1-6 million coverage typical. Most clients require minimum £2 million. Covers legal costs and compensation. Annual premiums £150-500 depending on turnover and risk level."
        },
        {
          title: "Professional Indemnity",
          color: "blue", 
          icon: <AlertTriangle className="h-4 w-4" />,
          content: "Covers claims from professional advice, design errors, or negligent services. £250k-£2 million coverage. Essential for consultancy work, design services, and project management. Protects against financial losses to clients from your professional mistakes."
        },
        {
          title: "Employer's Liability",
          color: "green",
          icon: <Users className="h-4 w-4" />,
          content: "Legally required if employing staff, including apprentices and part-time workers. Minimum £10 million coverage. Covers employee injury claims and workplace accidents. Fines up to £2,500 per day without valid cover."
        },
        {
          title: "Tools & Equipment Cover",
          color: "orange",
          icon: <Wrench className="h-4 w-4" />,
          content: "Protects valuable tools and test equipment against theft, damage, or loss. Coverage at home, in van, or on-site. Consider new-for-old replacement and temporary hire costs. Essential for expensive testing equipment like PAT testers and installation testers."
        },
        {
          title: "Motor Insurance Enhancement",
          color: "yellow",
          icon: <Car className="h-4 w-4" />,
          content: "Commercial vehicle insurance with goods in transit cover. Business use classification essential. Tools cover while in vehicle. Breakdown and recovery services. Consider hired-in plant and equipment coverage for larger jobs."
        },
        {
          title: "Contract Works Insurance",
          color: "red",
          icon: <Building2 className="h-4 w-4" />,
          content: "Covers damage to work in progress and materials on-site. Required for larger projects. Protects against fire, theft, vandalism, and weather damage. Often client-required for contracts over £50,000 value."
        }
      ]
    },
    {
      title: "Business Protection Strategies",
      icon: <Heart className="h-5 w-5 text-blue-400" />,
      theme: "blue",
      cards: [
        {
          title: "Income Protection Insurance",
          color: "purple",
          icon: <PiggyBank className="h-4 w-4" />,
          content: "Replaces 50-70% of income if unable to work due to illness or injury. Short-term and long-term options available. Tax-deductible premiums for business policies. Essential for sole traders with no sick pay provision."
        },
        {
          title: "Critical Illness Cover",
          color: "blue",
          icon: <Heart className="h-4 w-4" />,
          content: "Lump sum payment upon diagnosis of serious illnesses like cancer, heart attack, stroke. Can pay off business debts or provide living expenses. Separate from life insurance. Premiums vary by age and health status."
        },
        {
          title: "Business Interruption",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Compensates for lost income during business disruption from fire, flood, or other covered events. Includes ongoing business expenses during recovery. Important for workshop-based electrical businesses with premises."
        },
        {
          title: "Key Person Insurance",
          color: "orange",
          icon: <Target className="h-4 w-4" />,
          content: "Protects business against financial loss from death or incapacity of key individuals. Particularly important for partnerships or businesses dependent on specific technical expertise or client relationships."
        },
        {
          title: "Product Liability",
          color: "yellow",
          icon: <Zap className="h-4 w-4" />,
          content: "Covers claims arising from defective electrical products or installations causing injury or damage. Important for contractors doing design work or specifying equipment. Extended cover for completed operations."
        },
        {
          title: "Cyber Liability",
          color: "red",
          icon: <Globe className="h-4 w-4" />,
          content: "Protection against data breaches, cyber attacks, and digital business interruption. Increasingly important as electrical work becomes more connected and smart. Covers client data protection failures and business system downtime."
        }
      ]
    },
    {
      title: "Cost Management & Savings",
      icon: <Calculator className="h-5 w-5 text-green-400" />,
      theme: "green",
      cards: [
        {
          title: "Insurance Cost Benchmarks",
          color: "purple",
          icon: <Calculator className="h-4 w-4" />,
          content: "Public Liability: £150-500 annually. Professional Indemnity: £200-800. Combined liability: £400-1,200. Tool insurance: 2-5% of tool value annually. Total business insurance: typically £800-2,500 for comprehensive coverage."
        },
        {
          title: "Bundle Policies Strategy",
          color: "blue",
          icon: <Target className="h-4 w-4" />,
          content: "Combine multiple policies with one insurer for significant discounts. Business packages often include public liability, professional indemnity, and employer's liability. Can save 15-30% compared to separate policies."
        },
        {
          title: "Risk Reduction Benefits",
          color: "green",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "NICEIC/NAPIT membership often provides insurance discounts. Health & safety training reduces premiums. Clean claims history maintains low rates. Risk assessments and safety procedures demonstrate good practice to insurers."
        },
        {
          title: "Excess Management",
          color: "orange",
          icon: <Receipt className="h-4 w-4" />,
          content: "Higher excess reduces premiums but increases out-of-pocket costs for claims. Typical excess: £250-1,000 for general claims, £100-500 for tools. Balance excess level against potential claim frequency and business cash flow."
        },
        {
          title: "Annual Review Process",
          color: "yellow",
          icon: <Clock className="h-4 w-4" />,
          content: "Review all policies annually before renewal. Compare quotes from multiple insurers. Update coverage levels for business growth. Remove unnecessary covers and add new protections as business evolves."
        },
        {
          title: "Tax Efficiency",
          color: "red",
          icon: <FileText className="h-4 w-4" />,
          content: "Business insurance premiums are fully tax-deductible expenses. Personal insurance through business may be more tax-efficient. Consider gross vs net cost when evaluating policies. Plan premium payments for optimal cash flow."
        }
      ]
    },
    {
      title: "Compliance & Legal Requirements",
      icon: <FileText className="h-5 w-5 text-orange-400" />,
      theme: "orange",
      cards: [
        {
          title: "Legal Requirements Overview",
          color: "purple",
          icon: <BookOpen className="h-4 w-4" />,
          content: "Employer's Liability: Compulsory if employing anyone. Motor Insurance: Legal requirement for business vehicles. Professional standards: NICEIC/NAPIT may require specific coverage levels. Client contracts often mandate minimum insurance levels."
        },
        {
          title: "Documentation Requirements",
          color: "blue",
          icon: <FileText className="h-4 w-4" />,
          content: "Maintain current certificates and policy documents. Provide insurance evidence to clients before starting work. Display Employer's Liability certificate if employing staff. Keep digital and physical copies accessible."
        },
        {
          title: "Claims Procedures",
          color: "green",
          icon: <Phone className="h-4 w-4" />,
          content: "Report claims immediately - most policies require notification within 7-30 days. Don't admit liability at incident scene. Take photos and collect witness details. Cooperate fully with insurer investigations. Keep detailed incident records."
        },
        {
          title: "Policy Terms Understanding",
          color: "orange",
          icon: <AlertTriangle className="h-4 w-4" />,
          content: "Read policy exclusions carefully. Understand territorial limits (usually UK only unless specified). Check policy periods and renewal dates. Understand notice periods for changes or cancellation. Be aware of warranty requirements."
        },
        {
          title: "Professional Standards",
          color: "yellow",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "NICEIC requires minimum £2m public liability, £250k professional indemnity. NAPIT has similar requirements. Some local authorities require higher limits for approved contractor status. Major clients often mandate £5m+ coverage."
        },
        {
          title: "Breach Consequences",
          color: "red",
          icon: <AlertTriangle className="h-4 w-4" />,
          content: "Uninsured work can void professional membership. Personal liability for uninsured claims. Inability to bid for larger contracts. Potential prosecution for employer's liability breaches. Reputation damage in tight-knit electrical industry."
        }
      ]
    },
    {
      title: "Specialist Insurance Areas",
      icon: <Lightbulb className="h-5 w-5 text-yellow-400" />,
      theme: "yellow",
      cards: [
        {
          title: "Renewable Energy Work",
          color: "purple",
          icon: <Zap className="h-4 w-4" />,
          content: "Solar panel installations require extended professional indemnity for design work. Product liability for specified equipment. Extended warranty periods up to 25 years. Higher coverage limits for large commercial installations."
        },
        {
          title: "Smart Home & Automation",
          color: "blue",
          icon: <Home className="h-4 w-4" />,
          content: "Cyber liability for connected systems. Extended professional indemnity for system design. Product liability for integrated solutions. Data protection insurance for customer information handling in smart systems."
        },
        {
          title: "Emergency Callout Services",
          color: "green",
          icon: <Phone className="h-4 w-4" />,
          content: "24/7 public liability cover. Enhanced motor insurance for emergency response. Key holder insurance if holding client keys. Increased professional indemnity for urgent diagnostic work. Consider call-out specific policies."
        },
        {
          title: "Commercial & Industrial",
          color: "orange",
          icon: <Building2 className="h-4 w-4" />,
          content: "Higher coverage limits for large commercial work. Contract works insurance for major projects. Plant and equipment hire coverage. Extended professional indemnity for design and specification work. Pollution liability for industrial sites."
        },
        {
          title: "Training & Assessment",
          color: "yellow",
          icon: <GraduationCap className="h-4 w-4" />,
          content: "Professional indemnity for training delivery. Public liability for training venues. Equipment insurance for portable training equipment. Employer's liability if employing training staff. Student injury coverage for practical training."
        },
        {
          title: "Electrical Testing Services",
          color: "red",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Enhanced professional indemnity for test reports and certification. Errors & omissions cover for PAT testing. Equipment insurance for expensive test instruments. Retrospective cover for historical test work. Calibration insurance for test equipment."
        }
      ]
    },
    {
      title: "Resources & Professional Support",
      icon: <Network className="h-5 w-5 text-red-400" />,
      theme: "red",
      cards: [
        {
          title: "Industry Associations",
          color: "purple",
          icon: <Network className="h-4 w-4" />,
          content: "NICEIC and NAPIT offer member insurance schemes with preferential rates. ECA provides insurance guidance and group schemes. SELECT (Scotland) offers member benefits. Federation of Small Businesses provides business insurance advice."
        },
        {
          title: "Insurance Brokers",
          color: "blue",
          icon: <Briefcase className="h-4 w-4" />,
          content: "Specialist construction insurance brokers understand electrical trade risks. Can access Lloyd's market for complex risks. Provide annual reviews and claims support. Help with risk assessments and loss prevention advice."
        },
        {
          title: "Legal Support Services",
          color: "green",
          icon: <BookOpen className="h-4 w-4" />,
          content: "Many insurance policies include legal helplines. Professional association legal support services. Employment law advice for staff issues. Contract review services for major projects. Dispute resolution support."
        },
        {
          title: "Claims Support",
          color: "orange",
          icon: <Phone className="h-4 w-4" />,
          content: "24/7 claims reporting lines. Online claims portals for easy submission. Loss adjusters for complex claims. Legal representation for disputed claims. Rehabilitation support for injury claims. Emergency repair services."
        },
        {
          title: "Risk Management",
          color: "yellow",
          icon: <Target className="h-4 w-4" />,
          content: "Free risk assessments from insurers. Health & safety training discounts. Equipment security advice. Business continuity planning support. Accident prevention guidance. Regular risk review meetings."
        },
        {
          title: "Emergency Contacts",
          color: "red",
          icon: <AlertTriangle className="h-4 w-4" />,
          content: "Insurer claims hotlines available 24/7. NICEIC technical helpline: 0333 015 6626. NAPIT support: 0370 444 1392. HSE incident reporting: 0345 300 9923. Emergency electrical supply: Local DNO numbers. Legal advice hotlines through policies."
        }
      ]
    }
  ];

  const getCardClasses = (color: string) => {
    const colors = {
      purple: "border-l-4 border-l-purple-500 bg-purple-500/5",
      blue: "border-l-4 border-l-blue-500 bg-blue-500/5",
      green: "border-l-4 border-l-green-500 bg-green-500/5", 
      orange: "border-l-4 border-l-orange-500 bg-orange-500/5",
      yellow: "border-l-4 border-l-yellow-500 bg-yellow-500/5",
      red: "border-l-4 border-l-red-500 bg-red-500/5"
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const getCardIconClasses = (color: string) => {
    const colors = {
      purple: "text-purple-400",
      blue: "text-blue-400", 
      green: "text-green-400",
      orange: "text-orange-400",
      yellow: "text-yellow-400",
      red: "text-red-400"
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="space-y-6">
      <Alert className="border-purple-400/50 bg-purple-400/10">
        <AlertTriangle className="h-4 w-4 text-purple-400" />
        <AlertDescription className="text-purple-400">
          <strong>Important Insurance Disclaimer:</strong> This guidance is for general information only and does not constitute professional insurance advice. Always consult with qualified insurance advisors and read policy terms carefully before making coverage decisions.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {insuranceMetrics.map((metric, index) => (
          <Card key={index} className="border-purple-400/30 bg-gradient-to-br from-purple-500/5 to-purple-600/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {metric.icon}
                <h3 className="font-semibold text-sm text-white">{metric.metric}</h3>
              </div>
              <p className="text-xl font-bold text-purple-300 mb-1">{metric.data}</p>
              <p className="text-xs text-purple-200/70">{metric.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        {insuranceSections.map((section, index) => (
          <MobileAccordionItem key={index} value={`section-${index}`}>
            <MobileAccordionTrigger icon={section.icon}>
              {section.title}
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                <div className="text-sm text-muted-foreground">
                  {section.title} guidance for UK electrical contractors covering compliance requirements and best practices.
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {section.cards.slice(0, 3).map((card, cardIndex) => (
                      <div key={cardIndex} className={`${getCardClasses(card.color)} p-3 rounded-lg border`}>
                        <h4 className={`font-semibold ${getCardIconClasses(card.color)} mb-2 flex items-center gap-2`}>
                          {card.icon}
                          {card.title}
                        </h4>
                        <p className="text-sm">{card.content}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    {section.cards.slice(3, 6).map((card, cardIndex) => (
                      <div key={cardIndex} className={`${getCardClasses(card.color)} p-3 rounded-lg border`}>
                        <h4 className={`font-semibold ${getCardIconClasses(card.color)} mb-2 flex items-center gap-2`}>
                          {card.icon}
                          {card.title}
                        </h4>
                        <p className="text-sm">{card.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        ))}
      </MobileAccordion>
    </div>
  );
};

export default InsuranceProtectionTab;
