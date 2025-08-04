
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
  AlertTriangle, 
  Clock, 
  Calendar, 
  Calculator, 
  FileText, 
  Shield,
  TrendingUp,
  PiggyBank,
  BookOpen,
  Target,
  CheckCircle2,
  Briefcase,
  Receipt,
  Building2,
  Users,
  CreditCard
} from "lucide-react";

const TaxPlanningTab = () => {
  const taxMetrics = [
    {
      metric: "Tax Efficiency Threshold",
      data: "£50,000",
      subtext: "annual profit",
      icon: <Calculator className="h-5 w-5 text-purple-400" />
    },
    {
      metric: "Corporation Tax Rates",
      data: "19% to 25%",
      subtext: "",
      icon: <CreditCard className="h-5 w-5 text-blue-400" />
    },
    {
      metric: "Personal Allowance",
      data: "£12,570",
      subtext: "tax-free",
      icon: <Users className="h-5 w-5 text-green-400" />
    },
    {
      metric: "Liability Protection",
      data: "Limited company",
      subtext: "advantage",
      icon: <Shield className="h-5 w-5 text-orange-400" />
    }
  ];

  const taxSections = [
    {
      title: "Tax Planning Fundamentals",
      icon: <BookOpen className="h-5 w-5 text-purple-400" />,
      theme: "purple",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Develop a comprehensive tax strategy that maximises allowances, reliefs, and timing opportunities. Focus on reducing overall tax burden whilst maintaining compliance and supporting business growth objectives throughout the tax year."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "Begin planning in Q3 of tax year (October-December). Review income forecasts, plan major purchases, consider pension contributions, and prepare for year-end. Submit self-assessment by 31st January with all supporting documentation."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Effective tax planning reduces overall tax liability, improves cash flow through timing strategies, enables better business investment decisions, and provides certainty for financial planning and business growth strategies."
        },
        {
          title: "Key Features & Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Maintain detailed income and expense records, track allowable business deductions, monitor tax rate thresholds, plan timing of income and expenditure, and ensure all reliefs and allowances are properly claimed."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Consider interaction between income tax, National Insurance, and VAT. Plan for tax rate changes, understand marginal rates impact, and factor in timing differences between cash received and tax liability dates."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Track effective tax rate year-on-year, monitor successful claim rates for allowances and reliefs, measure tax planning savings achieved, and maintain 100% compliance with filing deadlines and payment dates."
        }
      ]
    },
    {
      title: "Key Deadlines & Compliance",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      theme: "blue",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Master the critical tax calendar to avoid penalties and maximise planning opportunities. Build systems that ensure compliance whilst creating opportunities for tax-efficient timing of business activities and payments."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "Set up calendar reminders for key dates: 5th April (tax year end), 31st October (registration deadline), 31st January (self-assessment), 31st July (payments on account). Plan quarterly reviews of tax position."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Avoid costly penalties and interest charges, maintain good standing with HMRC, enable better cash flow planning, reduce stress through organised approach, and create opportunities for tax-efficient timing decisions."
        },
        {
          title: "Key Features & Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Track all critical tax deadlines, maintain organised record-keeping systems, set up payment schedules for tax liabilities, respond promptly to HMRC correspondence, and keep detailed evidence for all claims and deductions."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Understand penalty regimes for late filing and payment, plan for payments on account system, consider interest charges on late payments, and factor in timing of income recognition for tax purposes."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Achieve 100% on-time submission rate, maintain zero penalty record, meet all payment deadlines, respond to HMRC queries within required timeframes, and keep compliance costs below 2% of turnover."
        }
      ]
    },
    {
      title: "Business Tax Strategies",
      icon: <Briefcase className="h-5 w-5 text-green-400" />,
      theme: "green",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Implement tax-efficient business structures and practices that support growth whilst minimising tax burden. Consider sole trader, partnership, or limited company structures based on income levels and business objectives."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "Review business structure annually or when significant income changes occur. Plan major equipment purchases for maximum capital allowances. Time income recognition and expense claims for optimal tax efficiency."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Optimise business structure for tax efficiency, maximise available reliefs and allowances, improve cash flow through timing strategies, and create opportunities for reinvestment and business expansion."
        },
        {
          title: "Key Features & Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Claim all eligible business expenses, maximise capital allowances on equipment, consider incorporation when beneficial, utilise available reliefs like R&D credits, and maintain proper business/personal expense separation."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Compare sole trader income tax vs corporation tax rates, consider National Insurance implications, factor in dividend tax for limited companies, and understand timing differences between different business structures."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Monitor effective tax rate by business structure, track successful claims for reliefs and allowances, measure administrative costs vs tax savings, and review structure efficiency annually against income levels."
        }
      ]
    },
    {
      title: "Pension & Retirement Planning",
      icon: <PiggyBank className="h-5 w-5 text-orange-400" />,
      theme: "orange",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Maximise pension contributions for tax relief whilst building retirement security. Consider annual allowance, carry forward rules, and lifetime allowance to create tax-efficient retirement funding strategies."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "Review pension strategy annually before 5th April. Calculate optimal contribution levels based on income and available allowances. Set up regular contributions or plan timing of lump sum payments for maximum efficiency."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Reduce current year tax liability through pension contributions, build retirement security, benefit from tax-free growth within pension wrapper, and create flexible income options for future retirement."
        },
        {
          title: "Key Features & Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Understand annual allowance limits (£60,000 for 2024/25), utilise carry forward of unused allowances from previous three years, choose appropriate pension schemes, and maintain detailed contribution records."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Calculate tax relief rates on contributions, understand tapered allowance for high earners, consider timing of contributions with income fluctuations, and plan for future tax treatment of pension withdrawals."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Maximise annual allowance usage, track tax relief claimed on contributions, monitor retirement fund growth, review contribution efficiency against income levels, and maintain on-track progress towards retirement goals."
        }
      ]
    },
    {
      title: "Record Keeping Systems",
      icon: <FileText className="h-5 w-5 text-yellow-400" />,
      theme: "yellow",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Establish comprehensive record-keeping systems that support accurate tax returns, enable effective business analysis, and provide audit trails for HMRC compliance. Focus on digital solutions that integrate with tax requirements."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "Set up record-keeping systems before starting business operations. Implement monthly reconciliation processes, establish systematic filing for receipts and invoices, and create backup procedures for all financial records."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Support accurate tax return preparation, enable effective business performance analysis, simplify year-end accounts process, provide evidence for expense claims, and reduce risk of errors or missed deductions."
        },
        {
          title: "Key Features & Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Keep records for minimum 5 years after submission deadline, maintain detailed income and expense records, track mileage and travel expenses, store receipts and invoices systematically, and separate business from personal expenses."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Ensure records support all tax claims and deductions, maintain evidence for capital allowance claims, track any private use adjustments, and keep detailed records of any cash transactions or payments."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Achieve monthly reconciliation within 5 working days, maintain 100% documentation for all claims, reduce time spent on year-end accounts preparation, and receive positive feedback from accountants or HMRC inspections."
        }
      ]
    },
    {
      title: "Risk Management & Compliance",
      icon: <Shield className="h-5 w-5 text-red-400" />,
      theme: "red",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Implement robust systems to manage tax compliance risks and avoid penalties. Focus on accurate record-keeping, timely submissions, and proactive communication with HMRC to maintain good standing and protect business reputation."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "Establish risk management procedures from business start. Set up systematic deadline tracking, implement error-checking processes for returns, create contingency plans for compliance issues, and schedule regular compliance reviews."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Avoid costly penalties and interest charges, maintain good relationships with HMRC, protect business reputation and credit rating, reduce stress through organised approach, and ensure predictable tax costs."
        },
        {
          title: "Key Features & Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Implement deadline management systems, maintain accurate and complete records, establish error-checking procedures, respond promptly to HMRC correspondence, and make voluntary disclosures when errors are discovered."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Understand penalty regimes for different types of non-compliance, know when to make voluntary disclosures, consider professional indemnity insurance, and factor compliance costs into business planning."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Maintain zero penalty record, achieve 100% on-time submission rate, keep error rates below 1% of turnover, respond to all HMRC queries within required timeframes, and maintain comprehensive audit trail for all transactions."
        }
      ]
    }
  ];

  const getThemeClasses = (theme: string) => {
    const themes = {
      purple: "border-purple-500/30 bg-purple-500/5",
      blue: "border-blue-500/30 bg-blue-500/5", 
      green: "border-green-500/30 bg-green-500/5",
      orange: "border-orange-500/30 bg-orange-500/5",
      yellow: "border-yellow-500/30 bg-yellow-500/5",
      red: "border-red-500/30 bg-red-500/5"
    };
    return themes[theme as keyof typeof themes] || themes.purple;
  };

  const getThemeIcon = (theme: string) => {
    const themes = {
      purple: "text-purple-400",
      blue: "text-blue-400",
      green: "text-green-400", 
      orange: "text-orange-400",
      yellow: "text-yellow-400",
      red: "text-red-400"
    };
    return themes[theme as keyof typeof themes] || themes.purple;
  };

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
          Tax planning and deadline guidance for electrical contractors. This information covers UK tax regulations current as of 2024/25. Always consult with a qualified tax advisor for business-specific advice.
        </AlertDescription>
      </Alert>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
        {taxMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              <div className="flex justify-center">{metric.icon}</div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium leading-tight">{metric.metric}</p>
                <p className="text-sm font-bold text-elec-yellow leading-tight">{metric.data}</p>
                <p className="text-xs text-muted-foreground leading-tight">{metric.subtext}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-4">
        {taxSections.map((section, index) => (
          <MobileAccordionItem key={index} value={`item-${index}`} className={getThemeClasses(section.theme)}>
            <MobileAccordionTrigger 
              icon={section.icon}
              className={`px-6 py-4 hover:no-underline ${getThemeIcon(section.theme)}`}
            >
              <span className={`font-semibold text-base ${getThemeIcon(section.theme)}`}>
                {section.title}
              </span>
            </MobileAccordionTrigger>
            <MobileAccordionContent className="px-6 pb-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.cards.map((card, cardIndex) => (
                  <Card key={cardIndex} className={`p-4 ${getCardClasses(card.color)}`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className={getCardIconClasses(card.color)}>
                          {card.icon}
                        </span>
                        <h4 className={`font-semibold text-sm ${getCardIconClasses(card.color)}`}>
                          {card.title}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {card.content}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        ))}
      </MobileAccordion>
    </div>
  );
};

export default TaxPlanningTab;
