import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  BarChart3, 
  PiggyBank, 
  TrendingUp, 
  AlertCircle, 
  Calculator, 
  CreditCard,
  DollarSign,
  Percent,
  Target,
  CheckCircle,
  Shield,
  FileText,
  Building,
  Banknote,
  Receipt,
  TrendingDown,
  Calendar,
  Clock,
  Zap,
  MapPin,
  BookOpen,
  Scale,
  Eye,
  Award,
  LineChart,
  Briefcase,
  Settings,
  Timer,
  Users
} from "lucide-react";

export const FinancialManagementTab = () => {
  const isMobile = useIsMobile();

  // Financial metrics matching the Growth Strategies pattern
  const financialMetrics = [
    {
      metric: "Profit Margin",
      data: "25-35% target range",
      icon: <Percent className="h-5 w-5 text-elec-yellow" />,
      detail: "Healthy electrical business margins"
    },
    {
      metric: "Cash Flow Cycle",
      data: "30-45 days optimal",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "From invoice to payment collection"
    },
    {
      metric: "Working Capital",
      data: "3-6 months coverage",
      icon: <Banknote className="h-5 w-5 text-green-400" />,
      detail: "Emergency fund and operations buffer"
    },
    {
      metric: "Growth Investment",
      data: "10-20% revenue reinvested",
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      detail: "For sustainable business expansion"
    }
  ];

  const financialSystems = [
    {
      id: "cash-flow-management",
      title: "Cash Flow Management & Forecasting",
      timeline: "1-2 months to implement",
      description: "Systematic approach to managing cash flow, payments, and financial forecasting for business stability",
      components: [
        "13-week rolling cash flow forecasts",
        "Customer payment terms optimisation",
        "Supplier payment scheduling",
        "Emergency fund establishment",
        "Seasonal variation planning"
      ],
      implementation: [
        {
          phase: "Current State Analysis (1-2 weeks)",
          tasks: [
            "Map all income sources and payment patterns from customers",
            "Analyse all expenses, supplier terms, and payment schedules",
            "Identify seasonal peaks and troughs in electrical work demand",
            "Calculate current average debtor days and payment delays"
          ]
        },
        {
          phase: "Cash Flow System Setup (2-3 weeks)",
          tasks: [
            "Implement 13-week rolling cash flow forecast spreadsheet or software",
            "Set up automated payment reminders and follow-up systems",
            "Negotiate improved payment terms with key suppliers",
            "Establish emergency fund target (3-6 months operating expenses)"
          ]
        },
        {
          phase: "Optimisation & Monitoring (4-6 weeks)",
          tasks: [
            "Monitor actual vs. forecast cash flow and refine predictions",
            "Implement payment incentives for early customer payments",
            "Review and optimise banking arrangements and overdraft facilities",
            "Create contingency plans for cash flow shortfalls"
          ]
        }
      ],
      ukSpecific2025: [
        "Making Tax Digital compliance for VAT and income tax",
        "Construction Industry Scheme (CIS) tax considerations",
        "IR35 regulations for electrical contractors using limited companies",
        "Brexit-related supply chain payment delays and currency fluctuations"
      ],
      investment: "£1,000-3,000 for software and professional advice",
      roi: "20-40% improvement in cash flow predictability",
      riskLevel: "Low risk with immediate cash flow benefits"
    },
    {
      id: "profit-margin-optimisation",
      title: "Profit Margin Analysis & Optimisation",
      timeline: "2-4 months comprehensive review",
      description: "Detailed analysis and improvement of profit margins across all services and customer segments",
      components: [
        "Job profitability analysis by service type",
        "Customer segment profitability review",
        "Cost structure optimisation",
        "Pricing strategy refinement",
        "Margin monitoring and reporting"
      ],
      implementation: [
        {
          phase: "Profitability Analysis (3-4 weeks)",
          tasks: [
            "Analyse historical job data to identify most and least profitable services",
            "Calculate true hourly rates including all overhead and indirect costs",
            "Review customer segments for profitability and payment behaviour",
            "Identify areas of cost inefficiency and waste in operations"
          ]
        },
        {
          phase: "Margin Improvement Strategy (4-6 weeks)",
          tasks: [
            "Develop tiered pricing strategy based on profitability analysis",
            "Implement value-based pricing for high-margin specialist services",
            "Negotiate better supplier terms and bulk purchasing arrangements",
            "Create upselling and cross-selling strategies for existing customers"
          ]
        },
        {
          phase: "Performance Monitoring (6-8 weeks)",
          tasks: [
            "Set up monthly profit margin reporting by service line",
            "Monitor impact of pricing changes on conversion rates",
            "Track customer response to value-based pricing initiatives",
            "Refine pricing and service delivery based on margin performance"
          ]
        }
      ],
      ukSpecific2025: [
        "Material cost inflation impact on margins and pricing strategies",
        "National minimum wage increases affecting labour cost calculations",
        "Energy price volatility considerations for mobile operations",
        "Post-pandemic insurance cost increases and margin impact"
      ],
      investment: "£2,000-5,000 for analysis tools and consulting",
      roi: "15-30% improvement in overall profit margins",
      riskLevel: "Low risk with data-driven approach"
    },
    {
      id: "tax-planning-compliance",
      title: "Tax Planning & Compliance Strategy",
      timeline: "Ongoing annual process",
      description: "Comprehensive tax planning and compliance management to minimise tax liability and ensure regulatory compliance",
      components: [
        "Business structure optimisation",
        "Allowable expense maximisation",
        "VAT planning and management",
        "Capital allowances strategy",
        "Professional development planning"
      ],
      implementation: [
        {
          phase: "Tax Structure Review (2-3 weeks)",
          tasks: [
            "Review current business structure (sole trader vs. limited company)",
            "Analyse tax efficiency of current arrangements",
            "Consider VAT registration benefits and drawbacks",
            "Evaluate IR35 implications for contractor arrangements"
          ]
        },
        {
          phase: "Compliance System Setup (3-4 weeks)",
          tasks: [
            "Implement Making Tax Digital compliant accounting software",
            "Set up automatic expense tracking and categorisation",
            "Create quarterly tax planning and payment schedules",
            "Establish record-keeping systems for HMRC compliance"
          ]
        },
        {
          phase: "Ongoing Optimisation (Quarterly)",
          tasks: [
            "Regular review of allowable expenses and tax reliefs",
            "Annual business structure optimisation review",
            "Capital investment timing for tax efficiency",
            "Professional development planning for tax relief"
          ]
        }
      ],
      ukSpecific2025: [
        "Corporation tax rate changes and small company reliefs",
        "Making Tax Digital quarterly reporting requirements",
        "Construction Industry Scheme compliance and verification",
        "Professional development and training tax reliefs"
      ],
      investment: "£1,500-4,000 annually for software and professional advice",
      roi: "10-25% reduction in overall tax liability",
      riskLevel: "Low risk with professional guidance"
    },
    {
      id: "funding-investment-strategy",
      title: "Business Funding & Investment Strategy",
      timeline: "3-6 months planning and execution",
      description: "Strategic approach to business funding, investment planning, and capital allocation for growth",
      components: [
        "Funding requirements analysis",
        "Investment opportunity evaluation",
        "Risk assessment and mitigation",
        "Return on investment planning",
        "Exit strategy development"
      ],
      implementation: [
        {
          phase: "Financial Planning (4-6 weeks)",
          tasks: [
            "Develop 3-5 year business growth plan with funding requirements",
            "Analyse different funding sources and their costs",
            "Create detailed investment cases for major purchases",
            "Assess risk tolerance and develop mitigation strategies"
          ]
        },
        {
          phase: "Funding Application (6-8 weeks)",
          tasks: [
            "Prepare comprehensive business plan and financial projections",
            "Apply for appropriate funding sources (loans, grants, asset finance)",
            "Negotiate terms and conditions with lenders and investors",
            "Set up governance and reporting structures for funders"
          ]
        },
        {
          phase: "Investment Execution (8-12 weeks)",
          tasks: [
            "Implement planned investments in equipment, training, and systems",
            "Monitor return on investment and adjust strategies as needed",
            "Regular reporting to funders and stakeholders",
            "Plan for future funding rounds and investment opportunities"
          ]
        }
      ],
      ukSpecific2025: [
        "Government grants for green technology and energy efficiency",
        "Help to Grow scheme benefits for digital adoption",
        "Regional development funding opportunities",
        "Brexit recovery fund eligibility for affected businesses"
      ],
      investment: "£2,000-8,000 for planning and professional fees",
      roi: "Variable based on investment type and timing",
      riskLevel: "Medium risk requiring careful planning and execution"
    }
  ];

  const financialBenchmarks = [
    {
      category: "Profitability Metrics",
      benchmarks: [
        { metric: "Gross Profit Margin", target: "50-70%", current: "Before overheads and tax" },
        { metric: "Net Profit Margin", target: "15-25%", current: "After all expenses" },
        { metric: "Return on Investment", target: "20-40% annually", current: "On major equipment purchases" },
        { metric: "Revenue per Employee", target: "£80-120k annually", current: "Including owner productivity" }
      ]
    },
    {
      category: "Liquidity & Cash Flow",
      benchmarks: [
        { metric: "Current Ratio", target: "1.5-2.5", current: "Current assets vs. liabilities" },
        { metric: "Days Sales Outstanding", target: "30-45 days", current: "Average collection period" },
        { metric: "Cash Conversion Cycle", target: "30-60 days", current: "Cash-to-cash cycle time" },
        { metric: "Emergency Fund", target: "3-6 months expenses", current: "Operating expense coverage" }
      ]
    }
  ];

  const growthStrategies = [
    {
      title: "Revenue Diversification",
      description: "Multiple income streams to reduce risk and increase financial stability",
      advantages: [
        "Maintenance contracts for recurring revenue",
        "Emergency call-out premium services",
        "Commercial and industrial client development",
        "Specialist services (smart homes, renewable energy)"
      ],
      impact: "30-50% improvement in revenue stability and predictability"
    },
    {
      title: "Financial Control Systems",
      description: "Robust financial management and control systems for business growth",
      advantages: [
        "Real-time profit and loss monitoring",
        "Automated invoicing and payment tracking",
        "Cost centre analysis and control",
        "Performance-based bonus and incentive systems"
      ],
      impact: "20-35% improvement in financial decision-making accuracy"
    },
    {
      title: "Investment Planning",
      description: "Strategic investment in business growth and efficiency improvements",
      advantages: [
        "Technology investments for operational efficiency",
        "Training and certification for premium pricing",
        "Marketing investments for customer acquisition",
        "Equipment upgrades for productivity gains"
      ],
      impact: "25-40% return on strategic investments over 2-3 years"
    }
  ];

  const riskManagement = [
    {
      category: "Financial Risk Management",
      risks: [
        "Customer payment delays and bad debt provision",
        "Material cost inflation and pricing pressure",
        "Seasonal demand variations and cash flow planning",
        "Economic downturn impact on construction sector"
      ]
    },
    {
      category: "Insurance & Protection",
      risks: [
        "Public liability and professional indemnity insurance",
        "Business interruption and key person insurance",
        "Equipment and vehicle comprehensive coverage",
        "Cyber liability insurance for digital business operations"
      ]
    },
    {
      category: "Compliance & Legal",
      risks: [
        "Tax compliance and HMRC audit preparation",
        "Health and safety regulatory compliance costs",
        "Employment law changes and staff cost implications",
        "Industry regulation changes and compliance investment"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
        <BarChart3 className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-yellow">
          Effective financial management can improve profit margins by 15-30% while ensuring sustainable business growth and stability.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {financialMetrics.map((metric, index) => (
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
        {financialSystems.map((system) => (
          <MobileAccordionItem key={system.id} value={system.id}>
            <MobileAccordionTrigger icon={
              system.id === "cash-flow-management" ? <CreditCard className="h-5 w-5 text-blue-400" /> :
              system.id === "profit-margin-optimisation" ? <TrendingUp className="h-5 w-5 text-green-400" /> :
              system.id === "tax-planning-compliance" ? <Calculator className="h-5 w-5 text-purple-400" /> :
              <PiggyBank className="h-5 w-5 text-yellow-400" />
            }>
              {system.title}
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{system.title}</h4>
                    <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {system.timeline}
                    </Badge>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{system.description}</p>
                </div>

                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{system.investment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{system.roi}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{system.riskLevel}</span>
                  </div>
                </div>

                <div>
                  <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Components</h5>
                  <ul className="space-y-1">
                    {system.components.map((component, compIndex) => (
                      <li key={compIndex} className={`flex items-start gap-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                        <CheckCircle className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-green-400 mt-0.5 shrink-0`} />
                        {component}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Phases</h5>
                  <div className="space-y-3">
                    {system.implementation.map((phase, phaseIndex) => (
                      <div key={phaseIndex} className="space-y-2">
                        <h6 className={`font-medium text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>{phase.phase}</h6>
                        <ul className="space-y-1">
                          {phase.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className={`flex items-start gap-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                              <Target className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-elec-yellow mt-0.5 shrink-0`} />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className={`font-medium text-yellow-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>UK Market Considerations (2025)</h5>
                  <ul className="space-y-1">
                    {system.ukSpecific2025.map((consideration, considerationIndex) => (
                      <li key={considerationIndex} className={`flex items-start gap-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                        <MapPin className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-yellow-400 mt-0.5 shrink-0`} />
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        ))}

        <MobileAccordionItem value="financial-benchmarks">
          <MobileAccordionTrigger icon={<BarChart3 className="h-5 w-5 text-orange-400" />}>
            Financial Benchmarks & KPIs
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Industry Financial Benchmarks</h4>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                Key financial performance indicators for electrical contracting businesses
              </p>
              
              <div className="space-y-4">
                {financialBenchmarks.map((category, index) => (
                  <div key={index}>
                    <h5 className={`font-medium text-orange-300 mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>{category.category}</h5>
                    <div className="space-y-2">
                      {category.benchmarks.map((benchmark, bIndex) => (
                        <div key={bIndex} className="flex justify-between items-center">
                          <span className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>{benchmark.metric}</span>
                          <Badge variant="outline" className="text-blue-300 border-blue-400/30">
                            {benchmark.target}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="growth-strategies">
          <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-green-400" />}>
            Financial Growth Strategies
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Strategic Financial Growth</h4>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                Financial strategies to drive sustainable business growth and profitability
              </p>
              
              <div className="space-y-4">
                {growthStrategies.map((strategy, index) => (
                  <div key={index} className="space-y-3">
                    <h5 className={`font-medium text-green-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>{strategy.title}</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{strategy.description}</p>
                    
                    <div>
                      <h6 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Strategies</h6>
                      <ul className="space-y-1">
                        {strategy.advantages.map((advantage, advIndex) => (
                          <li key={advIndex} className={`flex items-start gap-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                            <CheckCircle className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-green-400 mt-0.5 shrink-0`} />
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-green-500/10 rounded p-3">
                      <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Expected Impact</h6>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{strategy.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="risk-management">
          <MobileAccordionTrigger icon={<Shield className="h-5 w-5 text-red-400" />}>
            Financial Risk Management
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Risk Management Framework</h4>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                Comprehensive approach to identifying and managing financial risks in electrical contracting
              </p>
              
              <div className="space-y-4">
                {riskManagement.map((category, index) => (
                  <div key={index}>
                    <h5 className={`font-medium text-red-300 mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>{category.category}</h5>
                    <ul className="space-y-2">
                      {category.risks.map((risk, riskIndex) => (
                        <li key={riskIndex} className={`flex items-start gap-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                          <AlertCircle className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-red-400 mt-0.5 shrink-0`} />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};