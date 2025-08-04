
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Shield, CreditCard, FileText, UserCheck, AlertTriangle, TrendingDown, CheckCircle, Users, Target, Clock, TrendingUp } from "lucide-react";

const PreventionTab = () => {
  const isMobile = useIsMobile();

  // Key prevention metrics for debt avoidance
  const preventionMetrics = [
    {
      metric: "Prevention Success Rate",
      data: "95% fewer bad debts",
      icon: <Shield className="h-5 w-5 text-green-400" />,
      detail: "Proper screening reduces non-payment risk significantly"
    },
    {
      metric: "Average Recovery Time", 
      data: "3-7 days vs 90+ days",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Prevention costs far less than recovery"
    },
    {
      metric: "Client Retention Rate",
      data: "85% with clear terms",
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      detail: "Professional approach builds lasting relationships"
    },
    {
      metric: "Cash Flow Impact",
      data: "40% improvement",
      icon: <Target className="h-5 w-5 text-elec-yellow" />,
      detail: "Proactive measures stabilise business finances"
    }
  ];

  const preventionStrategies = [
    {
      title: "Credit Checks & Verification",
      icon: <UserCheck className="h-5 w-5" />,
      description: "Research your clients before starting work",
      strategies: [
        "Use credit reference agencies for commercial clients",
        "Check Companies House for business details",
        "Search online for client reviews and experiences",
        "Ask for trade references from other contractors",
        "Verify business registration and VAT numbers",
        "Check for County Court Judgments (CCJs)"
      ]
    },
    {
      title: "Clear Contract Terms",
      icon: <FileText className="h-5 w-5" />,
      description: "Establish payment expectations upfront",
      strategies: [
        "Include detailed payment terms in contracts",
        "Specify late payment charges (8% above base rate)",
        "Add retention of title clauses",
        "Define what constitutes completion",
        "Include dispute resolution procedures",
        "Get contracts signed before starting work"
      ]
    },
    {
      title: "Payment Security Measures",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Protect your cash flow with advance payments",
      strategies: [
        "Request deposits for materials and labour",
        "Use staged payment schedules for larger jobs",
        "Accept credit card payments for instant settlement",
        "Consider payment guarantees for high-value work",
        "Invoice promptly upon completion",
        "Offer early payment discounts"
      ]
    },
    {
      title: "Legal Protections",
      icon: <Shield className="h-5 w-5" />,
      description: "Build legal safeguards into your business",
      strategies: [
        "Use retention of title clauses",
        "Include personal guarantees for limited companies",
        "Register company charges at Companies House",
        "Consider credit insurance for large contracts",
        "Use construction lien rights where applicable",
        "Maintain comprehensive business insurance"
      ]
    }
  ];

  const riskAssessmentTools = [
    {
      tool: "Credit Reference Agencies",
      description: "Professional credit checking services for commercial clients",
      implementation: [
        "Experian Business Express for instant credit reports",
        "Creditsafe for comprehensive business intelligence",
        "Dun & Bradstreet for international clients",
        "Check payment history and financial stability"
      ],
      cost: "£5-£25 per check",
      benefit: "Reduces bad debt risk by 70%"
    },
    {
      tool: "Companies House Research",
      description: "Free official records for UK limited companies",
      implementation: [
        "Check annual accounts and filing history",
        "Review director information and changes",
        "Look for recent charges or mortgages",
        "Verify business address and trading status"
      ],
      cost: "Free",
      benefit: "Identifies financially unstable companies"
    },
    {
      tool: "Trade Reference Network",
      description: "Information sharing with other electrical contractors",
      implementation: [
        "Join local electrical contractor groups",
        "Exchange client payment experiences",
        "Share problematic client information legally",
        "Build trusted referral network"
      ],
      cost: "Membership fees vary",
      benefit: "Real-world payment behaviour insights"
    }
  ];

  const contractBestPractices = [
    {
      section: "Payment Terms Clarity",
      requirements: [
        "Specify exact payment dates (e.g., 'within 30 days of invoice date')",
        "Include late payment charges (8% above Bank of England base rate)",
        "Define what constitutes 'completion' for payment trigger",
        "State preferred payment methods and bank details"
      ]
    },
    {
      section: "Retention of Title Clauses",
      requirements: [
        "Include clause stating materials remain your property until paid",
        "Specify right to remove unpaid materials from site",
        "Register charges at Companies House for large contracts",
        "Include personal guarantees from company directors"
      ]
    },
    {
      section: "Dispute Resolution",
      requirements: [
        "Include mediation clause before legal action",
        "Specify jurisdiction (England & Wales)",
        "Define process for variations and additional work",
        "Include right to suspend work for non-payment"
      ]
    }
  ];

  const clientScreeningProcedures = [
    {
      category: "Initial Contact Assessment",
      redFlags: [
        "Pressure to start work immediately without contracts",
        "Reluctance to provide business references",
        "Vague about budget or payment terms",
        "No fixed business address or landline number"
      ],
      actions: [
        "Always request written brief before quoting",
        "Verify identity and business credentials",
        "Check online reviews and reputation",
        "Request previous contractor references"
      ]
    },
    {
      category: "Financial Verification",
      redFlags: [
        "Recently incorporated with no trading history",
        "Multiple previous company dissolutions by directors",
        "Accounts showing consistent losses",
        "High director loan accounts or minimal assets"
      ],
      actions: [
        "Request bank references for large projects",
        "Check credit ratings and CCJ history",
        "Verify insurance and bonding capacity",
        "Consider requiring deposits for new clients"
      ]
    }
  ];

  const paymentStructures = [
    {
      jobType: "Small Domestic Jobs (Under £1,000)",
      structure: "Payment on completion",
      terms: [
        "Full payment within 7 days of completion",
        "Accept cash, card, or bank transfer",
        "Provide detailed invoice with breakdown",
        "Follow up if not paid within agreed timeframe"
      ]
    },
    {
      jobType: "Medium Projects (£1,000-£5,000)",
      structure: "Staged payments",
      terms: [
        "25% deposit on signing contract",
        "50% on materials delivery/rough-in complete",
        "25% on completion and testing",
        "Maximum 30 days payment terms"
      ]
    },
    {
      jobType: "Large Commercial Projects (£5,000+)",
      structure: "Monthly applications",
      terms: [
        "10% deposit with signed contract",
        "Monthly progress payments within 30 days",
        "5% retention for 12 months post-completion",
        "Include inflation protection clauses"
      ]
    }
  ];

  const earlyWarningSystem = [
    {
      indicator: "Communication Changes",
      warnings: [
        "Delayed responses to calls or emails",
        "Avoiding direct contact with you",
        "Making excuses about payment delays",
        "Requesting payment term extensions"
      ],
      response: "Immediate phone call to discuss concerns directly"
    },
    {
      indicator: "Financial Stress Signs",
      warnings: [
        "Asking to reduce scope of work to save money",
        "Delaying material orders or deliveries",
        "Other contractors reporting payment issues",
        "Business premises looking neglected"
      ],
      response: "Consider requesting security or payment in advance"
    },
    {
      indicator: "Project Behaviour",
      warnings: [
        "Nitpicking work quality without valid reason",
        "Claiming work doesn't meet specification falsely",
        "Requesting unnecessary changes or variations",
        "Being unreasonably demanding about timescales"
      ],
      response: "Document everything and prepare for potential dispute"
    }
  ];

  const redFlags = [
    {
      category: "Financial",
      warning: "Poor credit history or multiple CCJs",
      action: "Request larger deposit or payment guarantees"
    },
    {
      category: "Communication",
      warning: "Evasive about payment terms or timeline",
      action: "Clarify expectations before starting work"
    },
    {
      category: "Reputation",
      warning: "Negative reviews from other tradespeople",
      action: "Seek additional references or avoid"
    },
    {
      category: "Business",
      warning: "Recently incorporated with no trading history",
      action: "Request personal guarantees from directors"
    },
    {
      category: "Behaviour",
      warning: "Pressure to start immediately without paperwork",
      action: "Insist on proper contracts and payment terms"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Shield className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          Prevention reduces bad debt risk by 95% and saves thousands in recovery costs. Implement these strategies before problems arise.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {preventionMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="risk-assessment">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-blue-400" />}>
            Risk Assessment Tools & Techniques
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {riskAssessmentTools.map((tool, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{tool.tool}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{tool.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Steps</h5>
                    <ul className="space-y-1">
                      {tool.implementation.map((step, stepIndex) => (
                        <li key={stepIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                      <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Cost</h5>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{tool.cost}</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
                      <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Benefit</h5>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{tool.benefit}</p>
                    </div>
                  </div>

                  {index < riskAssessmentTools.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="contract-practices">
          <MobileAccordionTrigger icon={<FileText className="h-5 w-5 text-purple-400" />}>
            Contract Best Practices & Templates
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {contractBestPractices.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'} border-b border-purple-500/20 pb-1`}>
                    {section.section}
                  </h4>
                  
                  <div>
                    <h5 className={`font-medium text-purple-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Essential Requirements</h5>
                    <ul className="space-y-2">
                      {section.requirements.map((requirement, reqIndex) => (
                        <li key={reqIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 p-2 bg-purple-500/5 border border-purple-500/20 rounded flex items-start gap-2`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {index < contractBestPractices.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="client-screening">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-orange-400" />}>
            Client Screening Procedures
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {clientScreeningProcedures.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <h5 className={`font-medium text-red-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Red Flags to Watch</h5>
                      <ul className="space-y-1">
                        {category.redFlags.map((flag, flagIndex) => (
                          <li key={flagIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-200 flex items-start gap-1`}>
                            <AlertTriangle className="h-3 w-3 text-red-400 flex-shrink-0 mt-1" />
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Recommended Actions</h5>
                      <ul className="space-y-1">
                        {category.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-start gap-1`}>
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {index < clientScreeningProcedures.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="payment-structures">
          <MobileAccordionTrigger icon={<CreditCard className="h-5 w-5 text-green-400" />}>
            Payment Terms & Structure Guidelines
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {paymentStructures.map((structure, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{structure.jobType}</h4>
                      <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {structure.structure}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Payment Terms</h5>
                    <ul className="space-y-1">
                      {structure.terms.map((term, termIndex) => (
                        <li key={termIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {index < paymentStructures.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="early-warning">
          <MobileAccordionTrigger icon={<AlertTriangle className="h-5 w-5 text-amber-400" />}>
            Early Warning System Implementation
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {earlyWarningSystem.map((system, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{system.indicator}</h4>
                  
                  <div>
                    <h5 className={`font-medium text-amber-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Warning Signs</h5>
                    <ul className="space-y-1">
                      {system.warnings.map((warning, warningIndex) => (
                        <li key={warningIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200 flex items-start gap-1`}>
                          <AlertTriangle className="h-3 w-3 text-amber-400 flex-shrink-0 mt-1" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
                    <h5 className={`font-medium text-amber-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Immediate Response</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200`}>{system.response}</p>
                  </div>

                  {index < earlyWarningSystem.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="prevention-strategies">
          <MobileAccordionTrigger icon={<Shield className="h-5 w-5 text-green-400" />}>
            Core Prevention Strategies & Implementation
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {preventionStrategies.map((strategy, index) => (
                <div key={index} className="space-y-3">
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

                  {index < preventionStrategies.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="warning-signs">
          <MobileAccordionTrigger icon={<AlertTriangle className="h-5 w-5 text-red-400" />}>
            Warning Signs & Red Flags
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {redFlags.map((flag, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{flag.warning}</h4>
                      <Badge variant="outline" className={`text-red-300 border-red-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {flag.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                    <h5 className={`font-medium text-red-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Recommended Action</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-200`}>{flag.action}</p>
                  </div>

                  {index < redFlags.length - 1 && <div className="border-t border-elec-yellow/10 pt-4"></div>}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default PreventionTab;
