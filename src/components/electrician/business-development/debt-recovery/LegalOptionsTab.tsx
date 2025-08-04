
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Scale, CreditCard, FileText, Phone, TrendingUp, Clock, Target, CheckCircle, Calculator, Award } from "lucide-react";

const LegalOptionsTab = () => {
  const isMobile = useIsMobile();

  // Key legal recovery metrics
  const legalMetrics = [
    {
      metric: "Court Success Rate",
      data: "92% judgments granted",
      icon: <Scale className="h-5 w-5 text-blue-400" />,
      detail: "Well-documented cases have high success rates"
    },
    {
      metric: "Average Recovery Time", 
      data: "4-6 months process",
      icon: <Clock className="h-5 w-5 text-green-400" />,
      detail: "Legal process takes time but often successful"
    },
    {
      metric: "Cost Recovery Rate",
      data: "80% costs recoverable",
      icon: <Calculator className="h-5 w-5 text-purple-400" />,
      detail: "Winner typically recovers legal costs"
    },
    {
      metric: "Enforcement Success",
      data: "65% fully recovered",
      icon: <Award className="h-5 w-5 text-elec-yellow" />,
      detail: "Depends on debtor's assets and cooperation"
    }
  ];

  const legalOptions = [
    {
      option: "Money Claim Online",
      cost: "£35-£770 (based on claim value)",
      timeframe: "4-6 weeks for judgment",
      description: "HMRC's online service for debt recovery up to £100,000",
      process: [
        "Submit claim online with details and evidence",
        "Defendant has 14 days to respond",
        "If no response, judgment granted automatically",
        "If disputed, case may go to court hearing",
        "Judgment allows enforcement action"
      ],
      suitableFor: "Straightforward debts with clear documentation"
    },
    {
      option: "Small Claims Court",
      cost: "£35-£770 plus hearing fees",
      timeframe: "2-6 months depending on complexity",
      description: "Court proceedings for claims up to £10,000",
      process: [
        "File claim form N1 with court",
        "Serve papers on defendant",
        "Attend preliminary hearing if required",
        "Present case at final hearing",
        "Judge makes decision on liability and costs"
      ],
      suitableFor: "Disputed debts requiring evidence presentation"
    },
    {
      option: "High Court Enforcement",
      cost: "£66-£600 plus percentage of debt",
      timeframe: "2-4 weeks after judgment",
      description: "Transfer County Court judgment to High Court for enforcement",
      process: [
        "Apply to transfer judgment to High Court",
        "High Court Enforcement Officers attend debtor",
        "Can remove goods to value of debt",
        "Often more effective than bailiffs",
        "Higher recovery rates than County Court"
      ],
      suitableFor: "Judgments over £600 where debtor has assets"
    },
    {
      option: "Statutory Demand",
      cost: "£154 court fee",
      timeframe: "21 days for payment or challenge",
      description: "Formal demand for payment threatening bankruptcy/liquidation",
      process: [
        "Serve statutory demand on debtor",
        "Debtor has 21 days to pay or challenge",
        "If no response, can petition for bankruptcy",
        "Often prompts immediate payment",
        "Serious consequences for debtor's credit"
      ],
      suitableFor: "Debts over £750 where other methods failed"
    }
  ];

  const enforcementMethods = [
    {
      method: "Warrant of Execution",
      description: "Bailiffs seize and sell debtor's goods",
      cost: "£110 plus bailiff fees",
      effectiveness: "Moderate - depends on debtor's assets"
    },
    {
      method: "Attachment of Earnings",
      description: "Deductions taken directly from debtor's salary",
      cost: "£110 application fee",
      effectiveness: "High for employed debtors"
    },
    {
      method: "Third Party Debt Order",
      description: "Freeze and recover money from debtor's bank account",
      cost: "£110 application fee",
      effectiveness: "High if debtor has bank funds"
    },
    {
      method: "Charging Order",
      description: "Place legal charge on debtor's property",
      cost: "£110 application fee",
      effectiveness: "Long-term security for substantial debts"
    }
  ];

  const costConsiderations = [
    {
      factor: "Court Fees",
      details: "Based on claim value - £35 for claims up to £300, scaling up to £770 for £50,000+",
      recovery: "Usually recoverable from losing party"
    },
    {
      factor: "Legal Costs",
      details: "Solicitor fees typically £150-£600 per hour depending on location and complexity",
      recovery: "Limited recovery in small claims track"
    },
    {
      factor: "Enforcement Costs",
      details: "Additional fees for bailiffs, High Court enforcement, or other collection methods",
      recovery: "Usually added to the debt amount"
    },
    {
      factor: "Time Investment",
      details: "Court proceedings require significant time for preparation and attendance",
      recovery: "Consider opportunity cost of time spent"
    }
  ];

  const legalPreparationRequirements = [
    {
      category: "Essential Documentation",
      requirements: [
        "Original contract or terms of engagement with clear payment terms",
        "All invoices with detailed breakdown of work performed",
        "Proof of delivery/completion including photos and completion certificates",
        "All correspondence relating to the debt including emails and letters",
        "Evidence of goods supplied or services performed",
        "Any admissions of debt or partial payment acknowledgments"
      ],
      importance: "Fundamental to establishing your legal claim"
    },
    {
      category: "Evidence Collection",
      requirements: [
        "Detailed time sheets and work records for the job",
        "Material receipts and supplier invoices showing costs incurred",
        "Site photographs showing work in progress and completion",
        "Witness statements from site personnel or other contractors",
        "Email chains discussing work scope, changes, or payment issues",
        "Bank statements showing partial payments received"
      ],
      importance: "Supports the validity and value of your claim"
    },
    {
      category: "Debt Validation",
      requirements: [
        "Calculation of exact amount due including any late payment interest",
        "Breakdown of principal amount, interest, and any additional charges",
        "Evidence that payment terms have been exceeded",
        "Proof that formal demand for payment has been made",
        "Documentation showing reasonable attempts at settlement",
        "Clear timeline of events from contract to legal action"
      ],
      importance: "Proves the debt is legally enforceable"
    }
  ];

  const caseStrategyOptions = [
    {
      strategy: "Alternative Dispute Resolution (ADR)",
      timeframe: "4-8 weeks resolution",
      cost: "£300-£1,500 typically",
      process: [
        "Propose mediation to the debtor before court action",
        "Select qualified commercial mediator familiar with construction disputes",
        "Attend without prejudice mediation session",
        "Negotiate settlement with neutral third party assistance",
        "Formalize agreement if successful resolution achieved"
      ],
      advantages: [
        "Significantly lower costs than court proceedings",
        "Faster resolution maintaining business relationships",
        "Confidential process without public records",
        "Higher satisfaction rates for both parties",
        "Flexible solutions beyond simple monetary settlement"
      ],
      suitableFor: "Commercial disputes where ongoing relationship has value"
    },
    {
      strategy: "Accelerated Possession Claims",
      timeframe: "8-12 weeks for possession",
      cost: "£355-£770 plus legal costs",
      process: [
        "Serve formal notice seeking possession for non-payment",
        "File accelerated possession claim if no response",
        "Court reviews documentation without hearing",
        "Possession order granted if papers in order",
        "Enforce possession through court bailiffs"
      ],
      advantages: [
        "No court hearing required if undefended",
        "Faster than standard possession proceedings",
        "Can claim rent arrears alongside possession",
        "Court costs usually recoverable from tenant",
        "Strong leverage for negotiating settlement"
      ],
      suitableFor: "Property-related debts with clear rental agreements"
    },
    {
      strategy: "Multi-Defendant Claims",
      timeframe: "3-6 months depending on complexity",
      cost: "Standard court fees plus service costs",
      process: [
        "Identify all liable parties including directors and guarantors",
        "Serve proceedings on all defendants simultaneously",
        "Joint and several liability allows recovery from any defendant",
        "Consider which defendant most likely to satisfy judgment",
        "Pursue enforcement against defendant with best assets"
      ],
      advantages: [
        "Multiple sources of recovery increase success chances",
        "Can pursue directors where company has no assets",
        "Guarantors often settle to avoid court proceedings",
        "Protects against companies being dissolved to avoid debt",
        "Increases pressure for early settlement"
      ],
      suitableFor: "Company debts with personal guarantees or director liability"
    }
  ];

  const postJudgmentRecovery = [
    {
      method: "Asset Investigation & Tracing",
      description: "Professional investigation to locate debtor's assets and income sources",
      process: [
        "Conduct company searches and credit checks",
        "Review Land Registry for property ownership",
        "Check for business interests and directorships",
        "Investigate bank accounts and investment holdings",
        "Assess employment status and salary levels"
      ],
      cost: "£200-£800 for professional investigation",
      effectiveness: "Essential for targeting most effective enforcement method",
      timeframe: "2-4 weeks for comprehensive report"
    },
    {
      method: "Oral Examination (Order to Attend Court)",
      description: "Court order requiring debtor to attend court and disclose their financial position",
      process: [
        "Apply for oral examination order from court",
        "Serve order requiring debtor's attendance",
        "Question debtor under oath about assets and income",
        "Obtain detailed financial information",
        "Use information to pursue most appropriate enforcement"
      ],
      cost: "£55 application fee plus service costs",
      effectiveness: "Highly effective for obtaining financial information",
      timeframe: "4-6 weeks from application to hearing"
    },
    {
      method: "Insolvency Proceedings",
      description: "Bankruptcy or liquidation proceedings as ultimate enforcement tool",
      process: [
        "Serve statutory demand for debt over £750",
        "If unpaid after 21 days, petition for bankruptcy/liquidation",
        "Attend court hearing for winding up or bankruptcy order",
        "Appointed trustee/liquidator recovers assets",
        "Receive dividend from recovered assets"
      ],
      cost: "£154 statutory demand, £280-£1,090 petition fees",
      effectiveness: "Ultimate deterrent often prompting immediate payment",
      timeframe: "3-6 months for full process"
    }
  ];

  const complianceConsiderations = [
    {
      aspect: "Late Payment Legislation",
      details: [
        "Statutory right to claim interest at 8% above Bank of England base rate",
        "£40 fixed compensation for debts up to £999",
        "£70 compensation for debts £1,000-£9,999",
        "£100 compensation for debts £10,000+",
        "Right to reasonable debt recovery costs"
      ],
      importance: "Significantly increases the amount recoverable"
    },
    {
      aspect: "Construction Act Rights",
      details: [
        "Right to suspend work for non-payment after 7 days notice",
        "Adjudication process for payment disputes",
        "Pay when paid clauses are prohibited",
        "Retention money must be held in separate trust account",
        "Right to payment within specified timeframes"
      ],
      importance: "Additional legal protections specific to construction work"
    },
    {
      aspect: "GDPR & Data Protection",
      details: [
        "Lawful basis required for processing personal data in debt recovery",
        "Must inform debtors of data processing for debt collection",
        "Cannot share personal data with third parties without consent",
        "Right to be forgotten doesn't apply to legitimate debt recovery",
        "Must securely store and process all personal information"
      ],
      importance: "Ensures legal compliance during recovery process"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-purple-500/50 bg-purple-500/10">
        <Scale className="h-4 w-4 text-purple-400" />
        <AlertDescription className="text-purple-200">
          Legal action should be the last resort, but when used correctly, achieves 92% success rates in well-documented cases.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {legalMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="legal-options">
          <MobileAccordionTrigger icon={<Scale className="h-5 w-5 text-purple-400" />}>
            Legal Recovery Options & Procedures
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {legalOptions.map((option, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{option.option}</h4>
                      <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {option.cost}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{option.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Legal Process</h5>
                    <ul className="space-y-1">
                      {option.process.map((step, stepIndex) => (
                        <li key={stepIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Best Suited For</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{option.suitableFor}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Timeline & Cost</h5>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {option.timeframe}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="enforcement-methods">
          <MobileAccordionTrigger icon={<CreditCard className="h-5 w-5 text-green-400" />}>
            Enforcement Methods & Effectiveness
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {enforcementMethods.map((method, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{method.method}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{method.description}</p>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Cost</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{method.cost}</p>
                      </div>
                      <div>
                        <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Effectiveness</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{method.effectiveness}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="cost-considerations">
          <MobileAccordionTrigger icon={<Calculator className="h-5 w-5 text-orange-400" />}>
            Cost Considerations & Recovery
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {costConsiderations.map((consideration, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{consideration.factor}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{consideration.details}</p>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded p-2">
                    <h5 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Recovery Potential</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{consideration.recovery}</p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="legal-preparation">
          <MobileAccordionTrigger icon={<FileText className="h-5 w-5 text-blue-400" />}>
            Legal Case Preparation & Evidence Requirements
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {legalPreparationRequirements.map((category, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-300 italic`}>{category.importance}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Required Documentation</h5>
                    <ul className="space-y-1">
                      {category.requirements.map((requirement, reqIndex) => (
                        <li key={reqIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-start gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="case-strategies">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-green-400" />}>
            Advanced Case Strategies & Dispute Resolution
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {caseStrategyOptions.map((strategy, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.strategy}</h4>
                      <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {strategy.cost}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Timeline: {strategy.timeframe}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Process Steps</h5>
                    <ul className="space-y-1">
                      {strategy.process.map((step, stepIndex) => (
                        <li key={stepIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-start gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Advantages</h5>
                    <ul className="space-y-1">
                      {strategy.advantages.map((advantage, advIndex) => (
                        <li key={advIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-start gap-1`}>
                          <Award className="h-3 w-3 text-elec-yellow flex-shrink-0 mt-1" />
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Best Suited For</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{strategy.suitableFor}</p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="post-judgment">
          <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-purple-400" />}>
            Post-Judgment Recovery & Asset Tracing
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {postJudgmentRecovery.map((method, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{method.method}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{method.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Process</h5>
                    <ul className="space-y-1">
                      {method.process.map((step, stepIndex) => (
                        <li key={stepIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-start gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Cost</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{method.cost}</p>
                      </div>
                      <div>
                        <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Timeline</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{method.timeframe}</p>
                      </div>
                      <div>
                        <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Effectiveness</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{method.effectiveness}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="compliance">
          <MobileAccordionTrigger icon={<Phone className="h-5 w-5 text-orange-400" />}>
            Legal Compliance & Industry-Specific Rights
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {complianceConsiderations.map((compliance, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{compliance.aspect}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-300 italic`}>{compliance.importance}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-orange-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Legal Rights & Requirements</h5>
                    <ul className="space-y-1">
                      {compliance.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200 flex items-start gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-1" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default LegalOptionsTab;
