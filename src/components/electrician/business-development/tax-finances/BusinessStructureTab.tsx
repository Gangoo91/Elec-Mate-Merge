
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  MobileAccordion, 
  MobileAccordionContent, 
  MobileAccordionItem, 
  MobileAccordionTrigger 
} from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  FileText, 
  Building, 
  Users, 
  CreditCard, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Calculator,
  ArrowRight,
  CheckCircle,
  XCircle,
  Scale,
  Banknote,
  UserCheck,
  FileCheck
} from "lucide-react";

const BusinessStructureTab = () => {
  const isMobile = useIsMobile();
  
  const businessTypes = [
    {
      id: "sole-trader",
      type: "Sole Trader",
      icon: <FileText className="h-5 w-5" />,
      color: "blue",
      description: "Simplest business structure for individual electricians",
      bestFor: "New electricians with annual profits under £50,000",
      pros: [
        "Easy to set up and manage",
        "Complete control over business decisions", 
        "All profits belong to you",
        "Simple tax obligations",
        "Can start trading immediately"
      ],
      cons: [
        "Unlimited personal liability",
        "Harder to raise capital",
        "Business ends if you become unable to work",
        "May pay more tax as profits increase",
        "Less professional credibility"
      ],
      taxImplications: [
        "Pay income tax on profits (20%, 40%, or 45%)",
        "Class 2 NI (£3.45/week if profits over £6,515)",
        "Class 4 NI (9% on profits £12,570-£50,270)",
        "Self Assessment tax return required",
        "Can claim business expenses against tax"
      ],
      considerations2025: [
        "Personal allowance: £12,570",
        "Basic rate threshold: £50,270", 
        "Higher rate: 40% above £50,270",
        "Additional rate: 45% above £125,140"
      ]
    },
    {
      id: "limited-company",
      type: "Limited Company",
      icon: <Building className="h-5 w-5" />,
      color: "green",
      description: "Separate legal entity providing liability protection",
      bestFor: "Established electricians with annual profits over £50,000",
      pros: [
        "Limited personal liability",
        "More tax-efficient for higher profits",
        "Professional credibility",
        "Easier to raise investment",
        "Can retain profits in company"
      ],
      cons: [
        "More complex administration",
        "Annual filing requirements at Companies House",
        "Directors' responsibilities and duties",
        "Less flexibility with money",
        "Additional accountancy costs"
      ],
      taxImplications: [
        "Corporation tax: 19% (profits under £50k), 25% (over £250k)",
        "Marginal rate 26.5% (profits £50k-£250k)",
        "PAYE and National Insurance on salary",
        "Dividend tax: 8.75%, 33.75%, 39.35%",
        "Annual accounts and CT600 required"
      ],
      considerations2025: [
        "Small profits rate: 19% (up to £50,000)",
        "Main rate: 25% (over £250,000)",
        "Marginal relief band: £50,000 - £250,000",
        "IR35 off-payroll working rules apply"
      ]
    },
    {
      id: "partnership",
      type: "Partnership",
      icon: <Users className="h-5 w-5" />,
      color: "purple",
      description: "Two or more people running a business together",
      bestFor: "Electricians working together with shared skills and costs",
      pros: [
        "Shared responsibilities and workload",
        "Combined skills and resources",
        "Shared startup costs and risks",
        "Simple tax structure",
        "Flexible profit sharing"
      ],
      cons: [
        "Joint and several liability",
        "Potential for disputes between partners",
        "Shared profits and decision-making",
        "Partners liable for each other's actions",
        "Partnership dissolves if partner leaves"
      ],
      taxImplications: [
        "Each partner pays income tax on their share",
        "Partnership tax return (SA800) required",
        "Class 2 and Class 4 National Insurance",
        "Partners submit individual Self Assessment",
        "Profit sharing agreement crucial for tax"
      ],
      considerations2025: [
        "Same tax rates as sole trader",
        "Partnership agreement legally essential",
        "Consider partnership insurance",
        "May convert to LLP for liability protection"
      ]
    },
    {
      id: "llp",
      type: "Limited Liability Partnership (LLP)",
      icon: <Shield className="h-5 w-5" />,
      color: "cyan",
      description: "Partnership with limited liability protection",
      bestFor: "Professional partnerships requiring liability protection",
      pros: [
        "Limited liability protection",
        "Flexible management structure", 
        "Tax transparency like partnership",
        "Professional credibility",
        "Members not personally liable"
      ],
      cons: [
        "More complex than standard partnership",
        "Annual filing requirements",
        "Designated members have extra duties",
        "Less common for trades",
        "Higher setup and running costs"
      ],
      taxImplications: [
        "Members taxed like partners",
        "LLP files information return",
        "No corporation tax liability",
        "Members pay income tax and NI",
        "Salaried members may be employees"
      ],
      considerations2025: [
        "PSC (People with Significant Control) rules",
        "Annual confirmation statement required",
        "Consider if liability protection worth extra costs",
        "May be overkill for small electrical businesses"
      ]
    }
  ];

  const metrics = [
    {
      title: "Tax Efficiency Threshold",
      value: "£50,000",
      description: "Annual profit level where limited company becomes more tax efficient",
      icon: <Calculator className="h-4 w-4" />,
      color: "blue"
    },
    {
      title: "Corporation Tax Rate",
      value: "19-25%",
      description: "2025 rates: 19% (under £50k), 25% (over £250k)",
      icon: <Banknote className="h-4 w-4" />,
      color: "green"
    },
    {
      title: "Personal Allowance",
      value: "£12,570",
      description: "Tax-free personal allowance for 2024/25",
      icon: <UserCheck className="h-4 w-4" />,
      color: "purple"
    },
    {
      title: "VAT Threshold",
      value: "£90,000",
      description: "Annual turnover threshold for mandatory VAT registration",
      icon: <FileCheck className="h-4 w-4" />,
      color: "cyan"
    }
  ];

  const accordionItems = [
    {
      value: "overview",
      title: "Business Structure Overview",
      icon: <Building className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical Decision Point</AlertTitle>
            <AlertDescription>
              Your business structure choice affects taxation, liability, compliance requirements, and growth potential. 
              Consider your current situation and 3-5 year business plans.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {metrics.map((metric, index) => (
              <Card key={index} className={`border-${metric.color}-500/20 bg-${metric.color}-500/5`}>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`p-1 rounded bg-${metric.color}-500/10`}>
                      {metric.icon}
                    </div>
                    <span className={`text-${metric.color}-400 font-semibold text-sm`}>{metric.value}</span>
                  </div>
                  <h4 className="font-medium text-xs leading-tight mb-1">{metric.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-3">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="border-blue-500/30 shrink-0 text-xs">Key Factor</Badge>
              <span className="text-sm leading-relaxed">Annual turnover and profit projections</span>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="border-green-500/30 shrink-0 text-xs">Key Factor</Badge>
              <span className="text-sm leading-relaxed">Personal liability and risk tolerance</span>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="border-purple-500/30 shrink-0 text-xs">Key Factor</Badge>
              <span className="text-sm leading-relaxed">Administrative capacity and complexity preference</span>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="border-cyan-500/30 shrink-0 text-xs">Key Factor</Badge>
              <span className="text-sm leading-relaxed">Growth plans and investment requirements</span>
            </div>
          </div>
        </div>
      )
    },
    {
      value: "structures",
      title: "Business Structure Comparison",
      icon: <Scale className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          {businessTypes.map((business, index) => (
            <Card key={index} className={`border-${business.color}-500/20 bg-elec-gray`}>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-${business.color}-500/10 shrink-0`}>
                    {business.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className={`text-lg text-${business.color}-400 leading-tight`}>{business.type}</CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">{business.description}</p>
                    <Badge variant="outline" className={`border-${business.color}-500/30 text-xs`}>
                      Best for: {business.bestFor}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Advantages
                    </h4>
                    <ul className="space-y-1">
                      {business.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="text-green-400 mt-1 shrink-0">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      Disadvantages
                    </h4>
                    <ul className="space-y-1">
                      {business.cons.map((con, conIndex) => (
                        <li key={conIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="text-red-400 mt-1 shrink-0">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-elec-yellow/20 pt-4">
                  <h4 className={`font-semibold text-${business.color}-400 mb-2 flex items-center gap-2`}>
                    <CreditCard className="h-4 w-4" />
                    Tax Implications 2024/25
                  </h4>
                  <ul className="space-y-1 mb-3">
                    {business.taxImplications.map((tax, taxIndex) => (
                      <li key={taxIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className={`text-${business.color}-400 mt-1 shrink-0`}>•</span>
                        <span>{tax}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Alert>
                    <AlertTitle className="text-sm">2025 Considerations</AlertTitle>
                    <AlertDescription>
                      <ul className="space-y-1 mt-2">
                        {business.considerations2025.map((consideration, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-amber-400 mt-1 shrink-0">•</span>
                            <span>{consideration}</span>
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    },
    {
      value: "decision-tool",
      title: "Structure Decision Tool",
      icon: <Calculator className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertTitle>Decision Framework</AlertTitle>
            <AlertDescription>
              Use these criteria to evaluate which business structure suits your electrical business best.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-400 text-base flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  Annual Profit Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Badge variant="outline" className="border-green-500/30">Under £20,000</Badge>
                  <p className="text-sm text-muted-foreground">Sole Trader - Simple and cost-effective</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="border-amber-500/30">£20,000 - £50,000</Badge>
                  <p className="text-sm text-muted-foreground">Sole Trader or Limited Company - Consider growth plans</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="border-red-500/30">Over £50,000</Badge>
                  <p className="text-sm text-muted-foreground">Limited Company - Tax efficiency becomes significant</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 text-base flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Liability Risk Evaluation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Badge variant="outline" className="border-blue-500/30">Low Risk Work</Badge>
                  <p className="text-sm text-muted-foreground">Domestic rewiring, basic installations - Sole Trader acceptable</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="border-amber-500/30">Medium Risk</Badge>
                  <p className="text-sm text-muted-foreground">Commercial installations - Consider Limited Company</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="border-red-500/30">High Risk</Badge>
                  <p className="text-sm text-muted-foreground">Industrial, high-voltage work - Limited Company recommended</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-400 text-base flex items-center gap-2">
                  <FileCheck className="h-4 w-4" />
                  Administrative Capacity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                  <span className="text-sm">Limited time for admin - Sole Trader</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <span className="text-sm">Can handle moderate admin - Either structure</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-sm">Professional accountant support - Limited Company viable</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      value: "transition",
      title: "Structure Transition Planning",
      icon: <ArrowRight className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Transition Timing</AlertTitle>
            <AlertDescription>
              Most electricians start as sole traders and transition to limited companies as their business grows. 
              Plan transitions carefully to minimise tax implications.
            </AlertDescription>
          </Alert>

          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardHeader>
              <CardTitle className="text-orange-400 text-base">Sole Trader to Limited Company</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <h4 className="font-semibold text-sm">When to Consider Transition:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1 shrink-0">•</span>
                  <span>Annual profits consistently exceed £50,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1 shrink-0">•</span>
                  <span>Need for liability protection increases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1 shrink-0">•</span>
                  <span>Planning to retain profits for business growth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1 shrink-0">•</span>
                  <span>Seeking investment or business loans</span>
                </li>
              </ul>
              
              <h4 className="font-semibold text-sm mt-4">Transition Process:</h4>
              <div className="space-y-2">
                <Badge variant="outline" className="border-orange-500/30">1. Choose incorporation date</Badge>
                <Badge variant="outline" className="border-orange-500/30">2. Transfer business assets</Badge>
                <Badge variant="outline" className="border-orange-500/30">3. Notify HMRC and customers</Badge>
                <Badge variant="outline" className="border-orange-500/30">4. Set up company bank account</Badge>
                <Badge variant="outline" className="border-orange-500/30">5. Implement PAYE system</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-pink-500/20 bg-pink-500/5">
            <CardHeader>
              <CardTitle className="text-pink-400 text-base">Tax Considerations During Transition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Timing can affect tax efficiency - consider year-end dates</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Asset transfers may trigger capital gains implications</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Consider incorporation relief for business asset transfers</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Professional advice essential for complex transitions</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      value: "compliance",
      title: "Legal Compliance & Setup",
      icon: <FileCheck className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <Alert>
            <UserCheck className="h-4 w-4" />
            <AlertTitle>Compliance Requirements</AlertTitle>
            <AlertDescription>
              Each business structure has specific legal and regulatory requirements. Ensure full compliance to avoid penalties.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4">
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-emerald-400 text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Sole Trader Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-semibold text-sm">Registration Requirements:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>Register for Self Assessment with HMRC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>Choose business name (if different from your name)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>Set up business bank account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>Obtain relevant electrical qualifications and certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>Register with electrical competent person scheme</span>
                  </li>
                </ul>
                
                <Alert>
                  <AlertDescription className="text-xs">
                    <strong>Deadline:</strong> Register by 5 October following the tax year you started trading
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-400 text-base flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Limited Company Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-semibold text-sm">Incorporation Process:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-blue-400 mt-1 shrink-0" />
                    <span>Register with Companies House (£12 online fee)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-blue-400 mt-1 shrink-0" />
                    <span>Choose unique company name ending in 'Ltd' or 'Limited'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-blue-400 mt-1 shrink-0" />
                    <span>Appoint directors and company secretary (optional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-blue-400 mt-1 shrink-0" />
                    <span>Create Memorandum and Articles of Association</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-blue-400 mt-1 shrink-0" />
                    <span>Register for Corporation Tax within 3 months</span>
                  </li>
                </ul>
                
                <h4 className="font-semibold text-sm">Ongoing Obligations:</h4>
                <div className="space-y-1">
                  <Badge variant="outline" className="border-blue-500/30 text-xs">Annual accounts filing</Badge>
                  <Badge variant="outline" className="border-blue-500/30 text-xs">Confirmation statement</Badge>
                  <Badge variant="outline" className="border-blue-500/30 text-xs">Corporation tax return</Badge>
                  <Badge variant="outline" className="border-blue-500/30 text-xs">PAYE submissions</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="text-amber-400 text-base">Electrical Industry Specific Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-amber-400 mt-1 shrink-0">•</span>
                <span><strong>Competent Person Scheme:</strong> NICEIC, NAPIT, ELECSA, or similar registration</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 mt-1 shrink-0">•</span>
                <span><strong>Public Liability Insurance:</strong> Minimum £2 million coverage recommended</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 mt-1 shrink-0">•</span>
                <span><strong>Electrical Installation Certificates:</strong> Must be issued for all work</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 mt-1 shrink-0">•</span>
                <span><strong>BS 7671 Compliance:</strong> 18th Edition IET Wiring Regulations</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 mt-1 shrink-0">•</span>
                <span><strong>Health & Safety:</strong> CDM regulations for construction work</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {isMobile ? (
        <MobileAccordion type="single" collapsible defaultValue="overview" className="space-y-3">
          {accordionItems.map((item) => (
            <MobileAccordionItem key={item.value} value={item.value}>
              <MobileAccordionTrigger icon={item.icon}>
                {item.title}
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                {item.content}
              </MobileAccordionContent>
            </MobileAccordionItem>
          ))}
        </MobileAccordion>
      ) : (
        <div className="space-y-6">
          {accordionItems.map((item) => (
            <Card key={item.value} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow flex items-center gap-2 text-lg">
                  {item.icon}
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {item.content}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessStructureTab;
