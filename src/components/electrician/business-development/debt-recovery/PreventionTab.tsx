
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
      detail: "Proper client screening reduces non-payment risk significantly"
    },
    {
      metric: "Recovery Cost Savings", 
      data: "90% less than debt recovery",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Prevention costs far less than pursuing unpaid invoices"
    },
    {
      metric: "Client Retention Rate",
      data: "85% with clear contracts",
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      detail: "Professional approach builds lasting business relationships"
    },
    {
      metric: "Cash Flow Improvement",
      data: "40% more predictable",
      icon: <Target className="h-5 w-5 text-elec-yellow" />,
      detail: "Proactive measures create stable business finances"
    }
  ];

  const preventionStrategies = [
    {
      title: "Credit Checks & Client Verification",
      icon: <UserCheck className="h-5 w-5 text-blue-400" />,
      description: "Research and verify client credentials before commencing work",
      strategies: [
        "Use credit reference agencies for commercial clients and large projects",
        "Check Companies House records for business registration and financial health", 
        "Search online reviews and testimonials from other contractors",
        "Request trade references from previous electrical contractors",
        "Verify business registration, VAT numbers, and trading addresses",
        "Check for County Court Judgments (CCJs) and payment defaults"
      ]
    },
    {
      title: "Clear Contract Terms & Documentation",
      icon: <FileText className="h-5 w-5 text-green-400" />,
      description: "Establish comprehensive payment expectations and legal protections",
      strategies: [
        "Include detailed payment terms with specific due dates in all contracts",
        "Specify late payment charges (8% above Bank of England base rate)",
        "Add retention of title clauses to protect material investments",
        "Define precise completion criteria and sign-off procedures",
        "Include mediation and dispute resolution procedures",
        "Ensure all contracts are signed before any work commences"
      ]
    },
    {
      title: "Payment Security & Cash Flow Protection", 
      icon: <CreditCard className="h-5 w-5 text-purple-400" />,
      description: "Implement secure payment structures to protect business cash flow",
      strategies: [
        "Request material deposits and labour advances for larger projects",
        "Use staged payment schedules aligned with project milestones",
        "Accept multiple payment methods including instant card payments",
        "Consider payment guarantees or bonds for high-value contracts",
        "Issue invoices promptly upon reaching agreed milestones",
        "Offer early payment discounts to encourage prompt settlement"
      ]
    },
    {
      title: "Legal Safeguards & Business Protection",
      icon: <Shield className="h-5 w-5 text-orange-400" />,
      description: "Build comprehensive legal protections into business operations",
      strategies: [
        "Use retention of title clauses to protect ownership until payment",
        "Include personal guarantees from company directors for limited companies",
        "Register company charges at Companies House for significant contracts",
        "Consider trade credit insurance for high-value or risky projects",
        "Utilise construction lien rights where legally applicable",
        "Maintain comprehensive professional indemnity and public liability insurance"
      ]
    }
  ];

  const riskAssessmentTools = [
    {
      tool: "Credit Reference Agencies",
      description: "Professional credit assessment services for commercial client evaluation",
      implementation: [
        "Experian Business Express for instant credit reports and risk scores",
        "Creditsafe for comprehensive business intelligence and monitoring",
        "Dun & Bradstreet for international clients and corporate structures",
        "Assess payment history, financial stability, and creditworthiness patterns"
      ],
      cost: "£5-£25 per check",
      benefit: "Reduces bad debt risk by up to 70%"
    },
    {
      tool: "Companies House Intelligence",
      description: "Official UK business records and financial disclosure research",
      implementation: [
        "Review annual accounts, filing history, and financial performance trends",
        "Examine director information, appointments, and recent changes",
        "Investigate outstanding charges, mortgages, and security interests",
        "Verify current business address, trading status, and operational capacity"
      ],
      cost: "Free access",
      benefit: "Identifies financially unstable or dormant companies"
    },
    {
      tool: "Trade Reference Networks",
      description: "Industry intelligence sharing with fellow electrical contractors",
      implementation: [
        "Join local electrical contractor associations and trade groups",
        "Exchange client payment experiences through professional networks",
        "Share information about problematic clients within legal boundaries",
        "Build trusted referral networks for reliable business opportunities"
      ],
      cost: "£50-£200 annual membership",
      benefit: "Real-world payment behaviour insights from industry peers"
    }
  ];

  const contractBestPractices = [
    {
      section: "Payment Terms & Conditions",
      requirements: [
        "Specify exact payment dates (e.g., 'within 30 days of invoice date, not statement date')",
        "Include statutory late payment charges (8% above Bank of England base rate plus £40 recovery costs)",
        "Define precise completion criteria and certification procedures for payment triggers",
        "State preferred payment methods, bank details, and acceptable proof of payment"
      ]
    },
    {
      section: "Retention of Title & Security",
      requirements: [
        "Include comprehensive retention of title clauses stating materials remain contractor property until full payment",
        "Specify contractual right to remove unpaid materials from site with reasonable notice",
        "Register charges at Companies House for contracts exceeding £5,000 value",
        "Include personal guarantees from company directors for limited company clients"
      ]
    },
    {
      section: "Dispute Resolution & Legal Framework",
      requirements: [
        "Include mandatory mediation clause before any legal proceedings commence",
        "Specify jurisdiction as England & Wales courts for all contractual disputes",
        "Define clear process for variations, additional work authorisation, and cost approvals",
        "Include contractual right to suspend work immediately for non-payment of certified invoices"
      ]
    }
  ];

  const clientScreeningProcedures = [
    {
      category: "Initial Contact & Communication Assessment",
      redFlags: [
        "Excessive pressure to commence work immediately without proper documentation or contracts",
        "Reluctance or refusal to provide business references, previous contractor contacts, or credentials",
        "Vague or evasive responses about project budget, timeline, or payment capabilities",
        "No fixed business address, only mobile contact, or reluctance to meet at business premises"
      ],
      actions: [
        "Always request detailed written project brief and specifications before preparing quotations",
        "Verify client identity through official documentation and business registration checks",
        "Research online presence, reviews, and reputation through multiple independent sources",
        "Request and verify references from at least two previous electrical contractors or suppliers"
      ]
    },
    {
      category: "Financial Verification & Business Stability",
      redFlags: [
        "Recently incorporated company with no trading history or established business relationships",
        "Multiple previous company dissolutions or bankruptcies linked to current directors",
        "Filed accounts showing consistent losses, declining revenue, or minimal business assets",
        "High director loan accounts, inter-company debt, or unusual financial arrangements suggesting cash flow issues"
      ],
      actions: [
        "Request bank references or financial statements for contracts exceeding £2,000 value",
        "Conduct comprehensive credit rating checks and search for County Court Judgments",
        "Verify current insurance coverage, professional memberships, and bonding capacity",
        "Consider requiring material deposits or staged payments for clients with limited trading history"
      ]
    }
  ];

  const paymentStructures = [
    {
      jobType: "Small Domestic Projects (Under £1,000)",
      structure: "Payment upon completion",
      terms: [
        "Full payment required within 7 days of project completion and final inspection",
        "Accept cash, debit/credit cards, bank transfer, or digital payment platforms",
        "Provide detailed invoice with itemised breakdown of labour and materials",
        "Implement immediate follow-up procedure if payment not received within agreed timeframe"
      ]
    },
    {
      jobType: "Medium Commercial Projects (£1,000-£5,000)",
      structure: "Staged payment milestones",
      terms: [
        "25% deposit required upon contract signing and before material procurement",
        "50% progress payment upon materials delivery and rough installation completion",
        "25% final payment upon project completion, testing, and certification handover",
        "Maximum 30-day payment terms with 2% early payment discount for 14-day settlement"
      ]
    },
    {
      jobType: "Large Commercial Contracts (£5,000+)",
      structure: "Monthly valuation applications",
      terms: [
        "10% contract deposit with signed agreement and before any work commencement",
        "Monthly progress payments based on certified work completion within 30 days of application",
        "5% retention held for 12 months post-completion as defects liability security",
        "Include contractual inflation protection and material cost fluctuation clauses"
      ]
    }
  ];

  const earlyWarningSystem = [
    {
      indicator: "Communication Pattern Changes",
      warnings: [
        "Increasingly delayed responses to phone calls, emails, or text messages",
        "Avoiding direct contact or delegating all communication to junior staff members",
        "Making frequent excuses about payment delays or requesting extensions without valid justification",
        "Requesting significant changes to previously agreed payment terms or project scope to reduce costs"
      ],
      response: "Initiate immediate face-to-face meeting to discuss concerns and clarify project status"
    },
    {
      indicator: "Financial Stress Indicators",
      warnings: [
        "Requesting scope reductions, material downgrades, or cost-cutting measures mid-project",
        "Delaying material orders, deliveries, or asking for extended credit terms from suppliers",
        "Reports from other contractors or suppliers about payment difficulties or disputes",
        "Visible signs of business premises deterioration, staff reductions, or operational scaling-back"
      ],
      response: "Consider requesting additional security deposits or advance payments before continuing work"
    },
    {
      indicator: "Project Behaviour & Attitude Shifts",
      warnings: [
        "Excessive scrutiny or nitpicking of work quality without valid technical grounds",
        "False claims that completed work doesn't meet agreed specifications or industry standards",
        "Requesting unnecessary variations, changes, or additional work without budget discussions",
        "Becoming unreasonably demanding about project timescales or creating artificial urgency"
      ],
      response: "Document all interactions meticulously and prepare comprehensive evidence for potential payment disputes"
    }
  ];

  const redFlags = [
    {
      category: "Financial Risk",
      warning: "Poor credit history with multiple County Court Judgments or payment defaults",
      action: "Request larger deposits, payment guarantees, or consider declining the contract"
    },
    {
      category: "Communication Risk",
      warning: "Evasive or inconsistent responses about payment terms, project timeline, or budget",
      action: "Clarify all expectations in writing and obtain signed acknowledgment before proceeding"
    },
    {
      category: "Reputation Risk",
      warning: "Negative reviews or reports from other electrical contractors about payment issues",
      action: "Seek additional independent references or avoid taking on the client entirely"
    },
    {
      category: "Business Structure Risk",
      warning: "Recently incorporated company with no established trading history or business relationships",
      action: "Request personal guarantees from all company directors and higher deposit requirements"
    },
    {
      category: "Behavioural Risk",
      warning: "Excessive pressure to commence work immediately without proper contracts or documentation",
      action: "Insist on comprehensive signed contracts and full payment terms agreement before any work begins"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Shield className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          Comprehensive prevention strategies reduce bad debt risk by 95% and save thousands in recovery costs. Implement these measures before problems arise.
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
