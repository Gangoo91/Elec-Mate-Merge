
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
  PiggyBank, 
  TrendingUp, 
  Calculator, 
  Users,
  AlertTriangle,
  Clock,
  Shield,
  Target,
  CheckCircle2,
  BookOpen,
  FileText,
  Briefcase,
  CreditCard,
  Building2,
  Heart,
  Globe,
  Receipt,
  Phone,
  Network,
  GraduationCap,
  Lightbulb,
  Map
} from "lucide-react";

const RetirementPensionsTab = () => {
  const pensionMetrics = [
    {
      metric: "Annual Allowance",
      data: "£60,000",
      icon: <PiggyBank className="h-5 w-5 text-purple-400" />
    },
    {
      metric: "State Pension (Full)",
      data: "£11,502",
      icon: <Calculator className="h-5 w-5 text-blue-400" />
    },
    {
      metric: "Tax-Free Lump Sum",
      data: "25%",
      icon: <Target className="h-5 w-5 text-green-400" />
    },
    {
      metric: "Pension Access Age",
      data: "55+",
      icon: <Clock className="h-5 w-5 text-orange-400" />
    }
  ];

  const pensionSections = [
    {
      title: "Pension Types & Selection",
      icon: <PiggyBank className="h-5 w-5 text-purple-400" />,
      theme: "purple",
      cards: [
        {
          title: "Self-Invested Personal Pension (SIPP)",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Maximum control and investment choice. Ideal for higher earners wanting flexibility. Wide range of investments including shares, bonds, commercial property. Annual charges 0.45%-1.5%. Tax relief on contributions up to annual allowance. Can consolidate multiple pensions."
        },
        {
          title: "Stakeholder Pension",
          color: "blue",
          icon: <Shield className="h-4 w-4" />,
          content: "Low-cost, simple option with charges capped at 1.5% annually. Minimum £20 contributions. Limited investment choices but reliable growth. Automatic tax relief applied. Good for consistent, modest contributions. Suitable for basic rate taxpayers."
        },
        {
          title: "Personal Pension Plans",
          color: "green",
          icon: <Calculator className="h-4 w-4" />,
          content: "Middle ground between stakeholder and SIPP. Wider investment choice than stakeholder. Higher charges than stakeholder but lower than full SIPP. Professional fund management available. Regular and lump sum contributions accepted."
        },
        {
          title: "Company Pension Schemes",
          color: "orange",
          icon: <Building2 className="h-4 w-4" />,
          content: "For limited company directors/employees. Employer contributions don't count towards personal annual allowance. Corporation tax relief for company. Auto-enrolment requirements for employees. Group schemes may offer better rates."
        },
        {
          title: "Small Self-Administered Schemes (SSAS)",
          color: "yellow",
          icon: <Briefcase className="h-4 w-4" />,
          content: "Occupational scheme for small companies. Can lend to sponsoring company. Property investment opportunities. Higher setup and running costs. Professional trustee required. Suitable for established businesses with property assets."
        },
        {
          title: "National Employment Savings Trust (NEST)",
          color: "red",
          icon: <Users className="h-4 w-4" />,
          content: "Government-backed workplace pension. Low charges of 0.3% annually. £1.80 monthly contribution charge. Designed for auto-enrolment. Limited investment options but professionally managed. Good for employees and small employers."
        }
      ]
    },
    {
      title: "Contribution Strategies & Tax Relief",
      icon: <Calculator className="h-5 w-5 text-blue-400" />,
      theme: "blue",
      cards: [
        {
          title: "Annual Allowance Planning",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "£60,000 annual allowance for 2024/25. Tapered to £10,000 for earnings over £200,000. Use carry forward rules for unused allowances from previous 3 years. Plan contributions around tax year end. Consider income smoothing strategies."
        },
        {
          title: "Tax Relief Optimisation",
          color: "blue",
          icon: <Receipt className="h-4 w-4" />,
          content: "Basic rate: 20% relief on contributions. Higher rate: 40% relief via self-assessment. Additional rate: 45% relief. Net pay vs relief at source schemes. Claim higher rate relief through tax return or HMRC adjustment."
        },
        {
          title: "Employer Contribution Benefits",
          color: "green",
          icon: <Building2 className="h-4 w-4" />,
          content: "Company contributions avoid employee National Insurance. Corporation tax deductible for employer. Annual allowance applies to total contributions. Consider salary sacrifice arrangements. Balance employer/employee contributions for tax efficiency."
        },
        {
          title: "Carry Forward Strategies",
          color: "orange",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Use unused allowances from previous 3 years. Must have been UK pension scheme member in carry forward years. Calculate available carry forward carefully. Good for irregular high earning years. Professional advice recommended for complex cases."
        },
        {
          title: "Age-Based Contribution Planning",
          color: "yellow",
          icon: <Clock className="h-4 w-4" />,
          content: "20s-30s: Consistent modest contributions benefit from compound growth. 40s: Increase as earnings peak, use higher rate relief. 50s: Maximum contributions to catch up. 60+: Consider contribution timing with withdrawal strategies."
        },
        {
          title: "Income Smoothing Techniques",
          color: "red",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Spread contributions across tax years to optimise relief. Time large contributions with high income years. Use spouse's allowances if applicable. Consider deferring income to lower tax years. Balance current tax relief with future flexibility."
        }
      ]
    },
    {
      title: "Investment Strategies & Risk Management",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      theme: "green",
      cards: [
        {
          title: "Lifecycle Investment Approach",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Early career: Growth focus with 80-100% equities. Mid-career: Balanced approach 60-80% equities. Pre-retirement: Gradual shift to defensive assets. At retirement: 40-60% equities for growth with stability. Regular rebalancing essential."
        },
        {
          title: "Diversification Strategies",
          color: "blue",
          icon: <Globe className="h-4 w-4" />,
          content: "Geographic diversification across UK, US, Europe, emerging markets. Asset class spread: equities, bonds, property, alternatives. Sector diversification within equity holdings. Currency exposure management. Size diversification: large, mid, small cap stocks."
        },
        {
          title: "Cost Management",
          color: "green",
          icon: <Calculator className="h-4 w-4" />,
          content: "Annual management charges: 0.2-1.5% typical range. Platform fees: £100-500 annually plus percentages. Transaction costs on fund switches. SIPP dealing charges for direct investments. Compare total cost of ownership across providers."
        },
        {
          title: "ESG and Ethical Investing",
          color: "orange",
          icon: <Heart className="h-4 w-4" />,
          content: "Environmental, Social, Governance factors increasingly important. Sustainable and responsible investment funds available. Impact investing options. Shariah-compliant funds for ethical requirements. Research fund methodologies and screening criteria."
        },
        {
          title: "Alternative Investments",
          color: "yellow",
          icon: <Lightbulb className="h-4 w-4" />,
          content: "Commercial property through REITs or direct ownership (SIPP). Commodities for inflation protection. Infrastructure investments. Private equity and venture capital (sophisticated investors). Gold and precious metals allocation."
        },
        {
          title: "Risk Assessment & Monitoring",
          color: "red",
          icon: <Shield className="h-4 w-4" />,
          content: "Regular risk profiling questionnaires. Stress testing portfolio against market scenarios. Monitoring correlation between assets. Volatility assessment relative to retirement timeline. Emergency fund outside pension for flexibility."
        }
      ]
    },
    {
      title: "Retirement Planning & Drawdown",
      icon: <Clock className="h-5 w-5 text-orange-400" />,
      theme: "orange",
      cards: [
        {
          title: "Withdrawal Strategies",
          color: "purple",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "4% rule as starting point for sustainable withdrawals. Flexible drawdown to manage tax efficiently. Bucket strategy: cash, bonds, equities for different timeframes. Natural yield approach using dividends and coupons. Dynamic withdrawal adjustment based on performance."
        },
        {
          title: "Tax-Efficient Retirement Income",
          color: "blue",
          icon: <Receipt className="h-4 w-4" />,
          content: "25% tax-free lump sum planning. Stagger withdrawals across tax years. Use personal allowances efficiently. Consider spouse's tax position for transfers. Manage marginal tax rates carefully. Plan for age-related allowances."
        },
        {
          title: "Annuity vs Drawdown Decision",
          color: "green",
          icon: <Target className="h-4 w-4" />,
          content: "Annuity provides guaranteed income for life. Drawdown offers flexibility and inheritance potential. Consider health and longevity factors. Interest rate environment affects annuity rates. Hybrid approaches combining both strategies."
        },
        {
          title: "State Pension Integration",
          color: "orange",
          icon: <Users className="h-4 w-4" />,
          content: "Check National Insurance record and entitlement. Consider voluntary contributions for gaps. Plan private pension around State Pension income. Deferral options for enhanced State Pension. Timing of claims for tax efficiency."
        },
        {
          title: "Healthcare Cost Planning",
          color: "yellow",
          icon: <Heart className="h-4 w-4" />,
          content: "Long-term care cost planning. Health insurance considerations. Immediate needs annuity for care fees. Equity release as care funding option. Health and lifestyle factors affecting longevity planning."
        },
        {
          title: "Legacy and Inheritance Planning",
          color: "red",
          icon: <Shield className="h-4 w-4" />,
          content: "Pension death benefits planning. Beneficiary nominations and updates. Inheritance tax implications. Trust structures for pension benefits. Drawdown vs annuity for inheritance purposes. Regular reviews of legacy arrangements."
        }
      ]
    },
    {
      title: "Business Structure Considerations",
      icon: <Building2 className="h-5 w-5 text-yellow-400" />,
      theme: "yellow",
      cards: [
        {
          title: "Sole Trader Pension Planning",
          color: "purple",
          icon: <Users className="h-4 w-4" />,
          content: "Personal pension contributions from business profits. Tax relief through self-assessment. Annual allowance based on relevant UK earnings. Consider income fluctuations in contribution planning. SIPP offers maximum flexibility for varying income."
        },
        {
          title: "Partnership Pension Strategies",
          color: "blue",
          icon: <Network className="h-4 w-4" />,
          content: "Individual partner pension arrangements. Consider partnership pension scheme for employees. Profit share implications for pension contributions. Partnership deed considerations for pension benefits. Tax relief for each partner individually."
        },
        {
          title: "Limited Company Pension Benefits",
          color: "green",
          icon: <Building2 className="h-4 w-4" />,
          content: "Employer and employee contribution strategies. Corporation tax relief on company contributions. Dividend vs pension contribution decisions. Auto-enrolment obligations for employees. Executive pension schemes for directors."
        },
        {
          title: "Contractor Pension Solutions",
          color: "orange",
          icon: <Briefcase className="h-4 w-4" />,
          content: "IR35 implications for pension planning. Contract vs permanent employment pension rights. Umbrella company pension schemes. Personal vs company pension arrangements. Pension contributions during contract gaps."
        },
        {
          title: "Subcontractor Considerations",
          color: "yellow",
          icon: <Network className="h-4 w-4" />,
          content: "CIS deductions and pension contributions. Self-employed vs employed status implications. Group pension scheme participation. Pension planning with irregular work patterns. Multiple client pension deduction coordination."
        },
        {
          title: "Business Sale and Pension Planning",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Business asset disposal relief implications. Pension contributions from sale proceeds. Timing business sale with retirement planning. Succession planning with pension benefits. Exit strategy coordination with pension goals."
        }
      ]
    },
    {
      title: "Professional Support & Resources",
      icon: <Network className="h-5 w-5 text-red-400" />,
      theme: "red",
      cards: [
        {
          title: "Independent Financial Advisors",
          color: "purple",
          icon: <Briefcase className="h-4 w-4" />,
          content: "Chartered and certified financial planners. Specialist pension and retirement advisors. Fee-only vs commission-based advisors. Initial consultation and ongoing review services. SIPP and complex pension specialists."
        },
        {
          title: "Pension Providers & Platforms",
          color: "blue",
          icon: <Building2 className="h-4 w-4" />,
          content: "Major SIPP providers: Hargreaves Lansdown, AJ Bell, Interactive Investor. Low-cost platforms: Vanguard, iWeb, Halifax Share Dealing. Workplace pension providers: NEST, Legal & General, Aviva. Comparison tools and switching services."
        },
        {
          title: "Professional Body Resources",
          color: "green",
          icon: <BookOpen className="h-4 w-4" />,
          content: "NICEIC and NAPIT member pension schemes. ECA group pension arrangements. Federation of Small Businesses pension guidance. Chartered Institute of Personnel Development retirement resources. Institution of Occupational Safety and Health guidance."
        },
        {
          title: "Government Resources",
          color: "orange",
          icon: <Shield className="h-4 w-4" />,
          content: "GOV.UK pension guidance and calculators. Pension Wise free guidance service. State Pension forecasting service. HMRC pension schemes services. The Pensions Regulator guidance and tools."
        },
        {
          title: "Online Tools & Calculators",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Pension contribution calculators. Retirement income planning tools. Tax relief calculators. SIPP comparison tools. Annuity vs drawdown calculators. Pension consolidation analysis tools."
        },
        {
          title: "Emergency Contacts & Support",
          color: "red",
          icon: <Phone className="h-4 w-4" />,
          content: "Pension provider helplines. HMRC pension scheme services: 0300 123 1079. The Pensions Advisory Service: free guidance. Financial Ombudsman Service for complaints. Pension Protection Fund for scheme failures."
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
          <strong>Important Pension Disclaimer:</strong> Pension and retirement planning guidance for general information only. Pension values can go down as well as up, and you may get back less than you invested. Always seek professional financial advice for your specific circumstances.
        </AlertDescription>
      </Alert>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
        {pensionMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className="text-sm font-medium text-white">{metric.metric}</div>
              <div className="text-sm text-muted-foreground">{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        {pensionSections.map((section, index) => (
          <MobileAccordionItem key={index} value={`section-${index}`}>
            <MobileAccordionTrigger icon={section.icon}>
              {section.title}
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                <div className="text-sm text-muted-foreground">
                  {section.title} guidance for UK electrical contractors covering pension planning, contributions, and retirement strategies.
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

export default RetirementPensionsTab;
