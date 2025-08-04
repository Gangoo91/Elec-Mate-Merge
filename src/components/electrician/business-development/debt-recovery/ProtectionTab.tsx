
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { CheckCircle, Database, Users, PiggyBank, Shield, TrendingUp, Clock, Target, Award, Building, Smartphone, Globe, Lock, FileCheck, CreditCard, Bot, Zap, Settings, AlertTriangle, BookOpen } from "lucide-react";

const ProtectionTab = () => {
  const isMobile = useIsMobile();

  // Key protection metrics
  const protectionMetrics = [
    {
      metric: "Risk Reduction Rate",
      data: "80% fewer repeat issues",
      icon: <Shield className="h-5 w-5 text-green-400" />,
      detail: "Strong systems prevent future problems"
    },
    {
      metric: "Business Resilience", 
      data: "60% better cash flow",
      icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
      detail: "Diversified client base improves stability"
    },
    {
      metric: "Professional Network",
      data: "5x more referrals",
      icon: <Users className="h-5 w-5 text-purple-400" />,
      detail: "Industry connections provide opportunities"
    },
    {
      metric: "Insurance Protection",
      data: "Up to 90% coverage",
      icon: <Award className="h-5 w-5 text-elec-yellow" />,
      detail: "Financial products protect against losses"
    }
  ];

  const protectionStrategies = [
    {
      title: "Client Database Management",
      icon: <Database className="h-5 w-5" />,
      description: "Build a comprehensive client risk database",
      strategies: [
        "Maintain records of payment history for all clients",
        "Flag clients with previous payment issues",
        "Share information with trusted trade networks",
        "Use industry credit reference services",
        "Document all communication and agreements",
        "Regular review and update of client risk ratings"
      ]
    },
    {
      title: "Industry Networking",
      icon: <Users className="h-5 w-5" />,
      description: "Leverage professional networks for protection",
      strategies: [
        "Join local electrical contractor associations",
        "Participate in trade-specific forums and groups",
        "Share experiences with problem clients (legally)",
        "Exchange credit references with other contractors",
        "Build relationships with reliable suppliers",
        "Attend industry events and networking sessions"
      ]
    },
    {
      title: "Financial Protection Products",
      icon: <PiggyBank className="h-5 w-5" />,
      description: "Use financial products to mitigate risk",
      strategies: [
        "Trade credit insurance for large contracts",
        "Invoice factoring for immediate cash flow",
        "Payment protection insurance",
        "Professional indemnity insurance",
        "Business interruption insurance",
        "Legal expenses insurance for debt recovery"
      ]
    },
    {
      title: "Business Process Improvements",
      icon: <CheckCircle className="h-5 w-5" />,
      description: "Strengthen your business operations",
      strategies: [
        "Implement robust invoicing and payment systems",
        "Use professional accounting software",
        "Establish clear credit control procedures",
        "Regular cash flow forecasting and monitoring",
        "Diversify client base to reduce dependency",
        "Build strong relationships with reliable clients"
      ]
    }
  ];

  const insuranceOptions = [
    {
      type: "Trade Credit Insurance",
      coverage: "Up to 90% of invoice value",
      cost: "0.1% - 0.5% of turnover",
      description: "Protects against customer insolvency and non-payment",
      benefits: ["Coverage for existing and new customers", "Credit monitoring services", "Debt collection support"]
    },
    {
      type: "Legal Expenses Insurance",
      coverage: "Up to £100,000 per claim",
      cost: "£200 - £500 annually",
      description: "Covers legal costs for debt recovery and disputes",
      benefits: ["Legal advice helpline", "Court representation", "Debt recovery costs covered"]
    },
    {
      type: "Invoice Protection",
      coverage: "Up to £25,000 per invoice",
      cost: "1% - 3% of invoice value",
      description: "Guarantees payment for specific invoices",
      benefits: ["Quick approval process", "Payment within 30 days", "No credit checks required"]
    }
  ];

  const businessPractices = [
    {
      practice: "Diversified Client Base",
      description: "Avoid dependency on single large clients",
      implementation: [
        "Target multiple market sectors",
        "Limit individual client to 20% of turnover",
        "Develop recurring maintenance contracts",
        "Build strong relationships with smaller clients"
      ]
    },
    {
      practice: "Strong Financial Controls",
      description: "Implement robust financial management",
      implementation: [
        "Monthly cash flow forecasting",
        "Regular debtor age analysis",
        "Automated payment reminders",
        "Professional credit control procedures"
      ]
    },
    {
      practice: "Professional Relationships",
      description: "Build a network of reliable contacts",
      implementation: [
        "Develop partnerships with other trades",
        "Maintain good supplier relationships",
        "Join professional associations",
        "Attend industry networking events"
      ]
    }
  ];

  const recoveryServices = [
    {
      service: "Debt Collection Agencies",
      when: "After 60-90 days of non-payment",
      cost: "15-25% of recovered amount",
      benefits: "Professional expertise, legal knowledge, time-saving"
    },
    {
      service: "Invoice Factoring",
      when: "For immediate cash flow needs",
      cost: "1-3% of invoice value plus interest",
      benefits: "Immediate payment, credit checking, sales ledger management"
    },
    {
      service: "Solicitor Services",
      when: "For complex disputes or large debts",
      cost: "£150-£600 per hour",
      benefits: "Legal expertise, court representation, formal procedures"
    },
    {
      service: "Trade Credit Agencies",
      when: "For credit checking and monitoring",
      cost: "£10-£50 per credit check",
      benefits: "Risk assessment, early warning systems, industry data"
    }
  ];

  const technologySolutions = [
    {
      solution: "Cloud-Based CRM Systems",
      description: "Modern customer relationship management for comprehensive client tracking",
      features: [
        "Real-time payment status monitoring with automated alerts",
        "Complete customer communication history and notes",
        "Integration with accounting software and banking systems",
        "Mobile access for on-site client information",
        "Automated credit scoring and risk assessment tools",
        "Document storage for contracts, certificates, and correspondence"
      ],
      providers: ["Salesforce", "HubSpot", "Zoho CRM", "Pipedrive"],
      cost: "£15-£150 per user per month",
      roi: "40% reduction in administrative time"
    },
    {
      solution: "AI-Powered Credit Assessment",
      description: "Artificial intelligence for real-time client risk evaluation",
      features: [
        "Machine learning algorithms for payment prediction",
        "Social media and online presence analysis",
        "Company financial health scoring",
        "Industry-specific risk factors assessment",
        "Early warning systems for potential defaults",
        "Automated credit limit recommendations"
      ],
      providers: ["Experian", "Credit Safe", "Dun & Bradstreet", "CreditHQ"],
      cost: "£5-£25 per credit check",
      roi: "60% reduction in bad debt exposure"
    },
    {
      solution: "Blockchain Payment Systems",
      description: "Secure, transparent payment processing with smart contracts",
      features: [
        "Immutable payment records and transaction history",
        "Smart contracts for automatic payment releases",
        "Cryptocurrency payment options for tech-savvy clients",
        "Reduced transaction fees and processing times",
        "Enhanced security and fraud prevention",
        "Global payment accessibility and currency conversion"
      ],
      providers: ["BitPay", "Coinbase Commerce", "PayPal Crypto", "Square Crypto"],
      cost: "1-3% transaction fee",
      roi: "25% faster payment processing"
    },
    {
      solution: "Digital Identity Verification",
      description: "Advanced client verification to prevent fraud and misrepresentation",
      features: [
        "Biometric verification and digital fingerprinting",
        "Government ID document verification",
        "Address verification and utility bill confirmation",
        "Bank account ownership verification",
        "Social media and digital footprint analysis",
        "Real-time fraud detection and prevention"
      ],
      providers: ["Jumio", "Onfido", "Trulioo", "Veriff"],
      cost: "£1-£5 per verification",
      roi: "90% reduction in fraudulent clients"
    }
  ];

  const industryPartnerships = [
    {
      partnership: "Electrical Contractors' Association (ECA)",
      description: "Leading trade association providing comprehensive member benefits",
      protectionBenefits: [
        "Member directory for trusted contractor referrals",
        "Dispute resolution services for payment issues",
        "Industry best practice guidelines and training",
        "Government liaison and regulatory updates",
        "Group insurance schemes with preferential rates",
        "Legal advice helpline for contract and payment issues"
      ],
      membershipCost: "£300-£800 annually",
      networkSize: "3,000+ members nationwide",
      additionalServices: "Technical support, certification schemes, marketing tools"
    },
    {
      partnership: "National Inspection Council for Electrical Installation Contracting (NICEIC)",
      description: "UK's leading voluntary regulatory body for electrical installation",
      protectionBenefits: [
        "Approved contractor status enhances credibility",
        "Access to technical helpline and support",
        "Insurance cover for approved contractors",
        "Consumer complaints procedure and resolution",
        "Marketing support and find-a-contractor service",
        "Regular assessment ensuring quality standards"
      ],
      membershipCost: "£400-£1,200 annually",
      networkSize: "30,000+ approved contractors",
      additionalServices: "Training courses, certification, technical bulletins"
    },
    {
      partnership: "SELECT (Scotland's electrical trade association)",
      description: "Scotland's premier electrical contractors' trade association",
      protectionBenefits: [
        "Member verification and quality assurance",
        "Industry networking and collaboration opportunities",
        "Technical training and skills development",
        "Government representation and advocacy",
        "Insurance schemes and financial services",
        "Business development support and mentoring"
      ],
      membershipCost: "£250-£600 annually (Scotland-based)",
      networkSize: "1,200+ members in Scotland",
      additionalServices: "Apprenticeship schemes, health & safety support"
    },
    {
      partnership: "Federation of Master Builders (FMB)",
      description: "Multi-trade association representing the building industry",
      protectionBenefits: [
        "Cross-trade networking and collaboration",
        "Warranty and insurance protection schemes",
        "Dispute resolution and mediation services",
        "Government lobbying and industry representation",
        "Business advice and commercial support",
        "Consumer protection and trust mark schemes"
      ],
      membershipCost: "£200-£500 annually",
      networkSize: "8,000+ members across all trades",
      additionalServices: "Health & safety guidance, training programmes"
    }
  ];

  const regulatoryCompliance = [
    {
      regulation: "Construction (Design and Management) Regulations 2015",
      relevance: "Legal obligations for construction work health and safety",
      protectionMeasures: [
        "Ensure all electrical work complies with CDM regulations",
        "Maintain detailed health and safety documentation",
        "Verify client awareness of their duties under CDM",
        "Document risk assessments and method statements",
        "Ensure proper coordination with other contractors",
        "Keep records of competency assessments and training"
      ],
      penalties: "Unlimited fines and potential imprisonment",
      complianceCost: "£500-£2,000 annual training and documentation",
      riskMitigation: "Protects against liability claims and project delays"
    },
    {
      regulation: "Electrical Safety Standards in the Private Rented Sector Regulations 2020",
      relevance: "Mandatory electrical safety checks for rental properties",
      protectionMeasures: [
        "Provide compliant Electrical Installation Condition Reports (EICR)",
        "Ensure all work meets current BS 7671 standards",
        "Maintain certification and qualification records",
        "Document all remedial work and safety improvements",
        "Verify landlord compliance with 5-year inspection cycles",
        "Keep detailed records of all electrical safety checks"
      ],
      penalties: "£30,000 maximum penalty per property",
      complianceCost: "Ongoing training and certification maintenance",
      riskMitigation: "Ensures payment for essential safety work"
    },
    {
      regulation: "General Data Protection Regulation (GDPR) 2018",
      relevance: "Data protection for customer information and business records",
      protectionMeasures: [
        "Implement robust data protection policies and procedures",
        "Secure storage and processing of client personal data",
        "Obtain proper consent for data collection and use",
        "Establish data breach notification procedures",
        "Provide clear privacy notices to customers",
        "Regular staff training on data protection requirements"
      ],
      penalties: "Up to €20 million or 4% of annual turnover",
      complianceCost: "£1,000-£5,000 for systems and training",
      riskMitigation: "Protects against data protection claims and fines"
    }
  ];

  const futureProofingStrategies = [
    {
      strategy: "Digital Transformation & Automation",
      timeframe: "1-2 years implementation",
      description: "Modernise business operations with digital tools and automation",
      implementation: [
        "Implement cloud-based project management and CRM systems",
        "Automate invoicing, payment processing, and debt collection",
        "Use digital signature solutions for contracts and agreements",
        "Deploy mobile apps for real-time job tracking and communication",
        "Integrate IoT devices for remote monitoring and diagnostics",
        "Develop online customer portals for self-service and transparency"
      ],
      investmentRequired: "£5,000-£20,000 initial setup",
      expectedROI: "200-300% within 24 months",
      riskReduction: "Eliminates human error, improves efficiency, enhances customer experience"
    },
    {
      strategy: "Renewable Energy & Smart Grid Specialisation",
      timeframe: "6-18 months training and certification",
      description: "Position business for the growing renewable energy market",
      implementation: [
        "Obtain certifications in solar PV, wind, and battery storage",
        "Develop expertise in smart home and energy management systems",
        "Partner with renewable energy equipment suppliers",
        "Create maintenance packages for renewable installations",
        "Offer energy efficiency audits and improvement services",
        "Develop expertise in electric vehicle charging point installation"
      ],
      investmentRequired: "£10,000-£30,000 training and equipment",
      expectedROI: "150-250% within 18 months",
      riskReduction: "Access to high-value, government-supported market segments"
    },
    {
      strategy: "Advanced Risk Management Systems",
      timeframe: "3-6 months implementation",
      description: "Implement sophisticated risk assessment and management protocols",
      implementation: [
        "Deploy AI-powered credit scoring and risk assessment tools",
        "Establish real-time financial monitoring and alert systems",
        "Create comprehensive client due diligence procedures",
        "Implement dynamic pricing based on risk assessment",
        "Develop tiered service levels based on client risk profiles",
        "Establish emergency fund and contingency planning"
      ],
      investmentRequired: "£3,000-£10,000 for systems and training",
      expectedROI: "300-500% through bad debt reduction",
      riskReduction: "Proactive identification and mitigation of financial risks"
    },
    {
      strategy: "Strategic Business Diversification",
      timeframe: "12-24 months full implementation",
      description: "Diversify service offerings and revenue streams for stability",
      implementation: [
        "Develop complementary services (security systems, data cabling)",
        "Create recurring revenue through maintenance contracts",
        "Offer training and consultancy services to other contractors",
        "Develop partnerships with related trades and services",
        "Create online courses and digital products",
        "Establish equipment rental and tool services"
      ],
      investmentRequired: "£15,000-£50,000 depending on diversification scope",
      expectedROI: "100-200% within 24 months",
      riskReduction: "Multiple revenue streams reduce dependency on single income source"
    }
  ];

  const emergencyResponseProtocols = [
    {
      scenario: "Major Client Default or Insolvency",
      triggerSigns: ["Delayed payments beyond normal terms", "Reduction in order volume", "Changes in payment methods", "Difficulty contacting client"],
      immediateActions: [
        "Cease all work immediately and secure tools/materials on site",
        "Issue formal notice of suspension of work due to non-payment",
        "Initiate legal proceedings for debt recovery within 7 days",
        "Contact insurance providers to report potential claim",
        "Secure retention of title for any materials supplied",
        "Document all communications and maintain detailed records"
      ],
      timeframe: "Action within 24-48 hours",
      preventionMeasures: "Enhanced credit monitoring, payment milestone structures"
    },
    {
      scenario: "Economic Downturn or Market Disruption",
      triggerSigns: ["Industry-wide payment delays", "Increased competition", "Material cost inflation", "Reduced project availability"],
      immediateActions: [
        "Implement enhanced credit control procedures",
        "Review and tighten payment terms for new contracts",
        "Accelerate collection of existing debts",
        "Reduce overhead costs and optimise operations",
        "Explore government support schemes and grants",
        "Strengthen relationships with reliable, creditworthy clients"
      ],
      timeframe: "Ongoing monitoring and adjustment",
      preventionMeasures: "Diversified client base, strong cash reserves, flexible cost structure"
    },
    {
      scenario: "Regulatory Changes or Compliance Issues",
      triggerSigns: ["New legislation announcements", "Industry guidance updates", "Insurance requirement changes", "Certification standard updates"],
      immediateActions: [
        "Assess impact on current operations and contracts",
        "Update terms and conditions to reflect new requirements",
        "Obtain necessary training and certifications promptly",
        "Review insurance coverage and update as needed",
        "Communicate changes to clients and adjust pricing accordingly",
        "Ensure all documentation and procedures are compliant"
      ],
      timeframe: "Compliance within regulatory deadlines",
      preventionMeasures: "Regular regulatory monitoring, industry association membership"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <Shield className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-yellow-200">
          Future protection strategies reduce repeat issues by 80% and build business resilience through systematic improvements.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {protectionMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="protection-strategies">
          <MobileAccordionTrigger icon={<Shield className="h-5 w-5 text-green-400" />}>
            Protection Strategies & Systems
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            {protectionStrategies.map((strategy, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {strategy.icon}
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.title}</h4>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{strategy.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Steps</h5>
                    <ul className="space-y-1">
                      {strategy.strategies.map((step, stepIndex) => (
                        <li key={stepIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="insurance-protection">
          <MobileAccordionTrigger icon={<PiggyBank className="h-5 w-5 text-purple-400" />}>
            Insurance & Financial Protection
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            {insuranceOptions.map((option, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{option.type}</h4>
                      <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {option.coverage}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{option.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Benefits</h5>
                    <ul className="space-y-1">
                      {option.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
                    <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Cost Structure</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{option.cost}</p>
                  </div>
                </div>
              ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="business-practices">
          <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-blue-400" />}>
            Best Business Practices & Systems
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            {businessPractices.map((practice, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{practice.practice}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{practice.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Steps</h5>
                    <ul className="space-y-1">
                      {practice.implementation.map((step, stepIndex) => (
                        <li key={stepIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="professional-services">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-orange-400" />}>
            Professional Recovery Services
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            {recoveryServices.map((service, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{service.service}</h4>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded p-2">
                    <div className="space-y-2">
                      <div>
                        <h5 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>When to Use</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{service.when}</p>
                      </div>
                      <div>
                        <h5 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Cost Structure</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{service.cost}</p>
                      </div>
                      <div>
                        <h5 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Benefits</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{service.benefits}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="technology-solutions">
          <MobileAccordionTrigger icon={<Smartphone className="h-5 w-5 text-blue-400" />}>
            Advanced Technology Solutions & Digital Protection
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            {technologySolutions.map((tech, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{tech.solution}</h4>
                    <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {tech.roi}
                    </Badge>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{tech.description}</p>
                </div>

                <div>
                  <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Features & Capabilities</h5>
                  <ul className="space-y-1">
                    {tech.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-start gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <h5 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Leading Providers</h5>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{tech.providers.join(', ')}</p>
                    </div>
                    <div>
                      <h5 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Cost Structure</h5>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{tech.cost}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="credit-protection">
          <MobileAccordionTrigger icon={<Lock className="h-5 w-5 text-purple-400" />}>
            Credit Protection & Payment Security Systems
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            {[
              {
                system: "Payment Milestone Protection",
                description: "Structure contracts to minimise exposure through staged payments",
                protections: [
                  "Maximum 30% upfront payment with materials on first milestone",
                  "Progress payments tied to measurable completion stages",
                  "Final payment retained until practical completion and testing",
                  "Retention clauses for warranty periods",
                  "Stop work clauses if payments become overdue",
                  "Clear variation order procedures with advance payment"
                ],
                riskReduction: "Limits maximum exposure to 30-50% of contract value"
              },
              {
                system: "Client Financial Health Monitoring",
                description: "Ongoing monitoring of client financial status throughout projects",
                protections: [
                  "Monthly credit report checks during long projects",
                  "Bank reference verification before large contracts",
                  "Company House filings monitoring for financial changes",
                  "Payment behaviour tracking across industry networks",
                  "Early warning alerts for deteriorating credit scores",
                  "Director guarantees for limited company clients"
                ],
                riskReduction: "85% early detection of potential payment problems"
              },
              {
                system: "Retention of Title Protection",
                description: "Legal protection for materials and equipment supplied",
                protections: [
                  "Clear retention of title clauses in all contracts",
                  "Detailed materials tracking and identification systems",
                  "Secure storage arrangements on client premises",
                  "Regular inventory checks and photographic records",
                  "Swift recovery procedures for unpaid materials",
                  "Insurance coverage for materials until payment received"
                ],
                riskReduction: "Recovery of 60-90% of unpaid material costs"
              }
            ].map((system, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                <div className="flex flex-col gap-2">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{system.system}</h4>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{system.description}</p>
                </div>

                <div>
                  <h5 className={`font-medium text-purple-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Protection Measures</h5>
                  <ul className="space-y-1">
                    {system.protections.map((protection, protectionIndex) => (
                      <li key={protectionIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-start gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                        {protection}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
                  <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Risk Reduction</h5>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{system.riskReduction}</p>
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="debt-prevention">
          <MobileAccordionTrigger icon={<CreditCard className="h-5 w-5 text-green-400" />}>
            Proactive Debt Prevention & Early Warning Systems
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            {[
              {
                strategy: "Client Payment Behaviour Analysis",
                description: "Track and analyse client payment patterns to predict risk",
                measures: [
                  "Detailed payment history database for all clients",
                  "Average payment time tracking and trend analysis",
                  "Seasonal payment pattern identification",
                  "Client communication responsiveness scoring",
                  "Project complexity vs payment reliability correlation",
                  "Industry sector payment risk assessment"
                ],
                implementation: "Use spreadsheets or CRM systems to track payment data",
                effectiveness: "Predicts 75% of payment problems before they occur"
              },
              {
                strategy: "Financial Red Flag Monitoring",
                description: "Systematic monitoring for early warning signs of financial distress",
                measures: [
                  "Delayed responses to communications and invoices",
                  "Requests for extended payment terms without justification",
                  "Increased complaints about work quality without basis",
                  "Difficulty reaching decision makers or finance departments",
                  "Changes in payment methods or banking arrangements",
                  "Staff turnover or office downsizing at client premises"
                ],
                implementation: "Weekly client contact reviews and monthly financial health checks",
                effectiveness: "Identifies 80% of at-risk clients 30-60 days in advance"
              },
              {
                strategy: "Relationship-Based Protection",
                description: "Build strong client relationships that encourage timely payment",
                measures: [
                  "Regular client check-ins and relationship building",
                  "Transparent communication about project progress",
                  "Quick resolution of any quality or service concerns",
                  "Flexible payment solutions for temporarily struggling clients",
                  "Long-term maintenance agreements and ongoing relationships",
                  "Client education about electrical standards and compliance"
                ],
                implementation: "Structured client communication schedule and feedback systems",
                effectiveness: "90% retention rate and 95% payment compliance from relationship clients"
              }
            ].map((strategy, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-3">
                <div className="flex flex-col gap-2">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.strategy}</h4>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{strategy.description}</p>
                </div>

                <div>
                  <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Measures</h5>
                  <ul className="space-y-1">
                    {strategy.measures.map((measure, measureIndex) => (
                      <li key={measureIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-start gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                        {measure}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded p-3 space-y-2">
                  <div>
                    <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{strategy.implementation}</p>
                  </div>
                  <div>
                    <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Effectiveness</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{strategy.effectiveness}</p>
                  </div>
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="future-proofing">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-orange-400" />}>
            Future-Proofing Strategies & Long-Term Protection
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            {futureProofingStrategies.map((strategy, index) => (
              <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.strategy}</h4>
                    <Badge variant="outline" className={`text-orange-300 border-orange-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {strategy.expectedROI}
                    </Badge>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{strategy.description}</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-300 italic`}>Timeline: {strategy.timeframe}</p>
                </div>

                <div>
                  <h5 className={`font-medium text-orange-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Roadmap</h5>
                  <ul className="space-y-1">
                    {strategy.implementation.map((step, stepIndex) => (
                      <li key={stepIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200 flex items-start gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <h5 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Investment Required</h5>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{strategy.investmentRequired}</p>
                    </div>
                    <div>
                      <h5 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Risk Reduction</h5>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{strategy.riskReduction}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="emergency-protocols">
          <MobileAccordionTrigger icon={<AlertTriangle className="h-5 w-5 text-red-400" />}>
            Emergency Response Protocols & Crisis Management
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            {emergencyResponseProtocols.map((protocol, index) => (
              <div key={index} className="border border-red-500/20 rounded-lg p-3 space-y-3">
                <div className="flex flex-col gap-2">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{protocol.scenario}</h4>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-300 italic`}>Response Time: {protocol.timeframe}</p>
                </div>

                <div>
                  <h5 className={`font-medium text-red-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Warning Signs to Monitor</h5>
                  <ul className="space-y-1">
                    {protocol.triggerSigns.map((sign, signIndex) => (
                      <li key={signIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-200 flex items-start gap-1`}>
                        <AlertTriangle className="h-3 w-3 text-red-400 flex-shrink-0 mt-1" />
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className={`font-medium text-red-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Immediate Action Plan</h5>
                  <ul className="space-y-1">
                    {protocol.immediateActions.map((action, actionIndex) => (
                      <li key={actionIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-200 flex items-start gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                  <h5 className={`font-medium text-red-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Prevention Strategy</h5>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-200`}>{protocol.preventionMeasures}</p>
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default ProtectionTab;
