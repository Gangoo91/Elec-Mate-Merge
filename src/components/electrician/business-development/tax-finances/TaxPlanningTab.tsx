
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
  CreditCard,
  Globe,
  GraduationCap,
  Lightbulb,
  Map,
  Network
} from "lucide-react";

const TaxPlanningTab = () => {
  const taxMetrics = [
    {
      metric: "Self Assessment Deadline",
      data: "31st January 2025",
      icon: <Clock className="h-5 w-5 text-purple-400" />,
      detail: "Online submission and payment due"
    },
    {
      metric: "Corporation Tax Rate",
      data: "19% to 25%",
      icon: <Calculator className="h-5 w-5 text-blue-400" />,
      detail: "Based on profit levels from April 2024"
    },
    {
      metric: "Personal Allowance",
      data: "£12,570",
      icon: <Users className="h-5 w-5 text-green-400" />,
      detail: "Tax-free income for 2024/25"
    },
    {
      metric: "Pension Annual Allowance",
      data: "£60,000",
      icon: <PiggyBank className="h-5 w-5 text-orange-400" />,
      detail: "Maximum tax-relieved contributions"
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
          content: "Develop a comprehensive tax strategy that maximises allowances, reliefs, and timing opportunities. Focus on reducing overall tax burden whilst maintaining compliance and supporting business growth objectives."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "Begin planning in Q3 of tax year (October-December). Review income forecasts, plan major purchases, consider pension contributions, and prepare for year-end submissions by 31st January."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Effective tax planning reduces overall liability, improves cash flow through timing strategies, enables better investment decisions, and provides certainty for financial planning and growth."
        },
        {
          title: "Key Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Maintain detailed income and expense records, track allowable business deductions, monitor tax rate thresholds, plan timing of income and expenditure, ensure all reliefs are claimed."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Consider interaction between income tax, National Insurance, and VAT. Plan for tax rate changes, understand marginal rates impact, and factor in timing differences between cash received and tax liability."
        },
        {
          title: "Success Metrics",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Track effective tax rate year-on-year, monitor successful claim rates for allowances and reliefs, measure tax planning savings achieved, maintain 100% compliance with filing deadlines."
        }
      ]
    },
    {
      title: "Key Deadlines & Compliance",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      theme: "blue",
      cards: [
        {
          title: "Critical Deadlines",
          color: "purple",
          icon: <Calendar className="h-4 w-4" />,
          content: "Self Assessment: 31st October (paper) or 31st January (online). Corporation Tax: 9 months after year-end. VAT Returns: Monthly/quarterly. CIS Returns: Monthly by 19th of following month."
        },
        {
          title: "Planning Calendar",
          color: "blue",
          icon: <Clock className="h-4 w-4" />,
          content: "Set up calendar reminders for key dates. Plan quarterly reviews of tax position. Schedule annual review meetings with accountant. Create systematic approaches to deadline management."
        },
        {
          title: "Compliance Benefits",
          color: "green",
          icon: <Shield className="h-4 w-4" />,
          content: "Avoid costly penalties and interest charges, maintain good standing with HMRC, enable better cash flow planning, reduce stress through organised approach, create tax-efficient timing opportunities."
        },
        {
          title: "Documentation",
          color: "orange",
          icon: <FileText className="h-4 w-4" />,
          content: "Track all critical tax deadlines, maintain organised record-keeping systems, set up payment schedules for tax liabilities, respond promptly to HMRC correspondence, keep detailed evidence for claims."
        },
        {
          title: "Penalty Management",
          color: "yellow",
          icon: <AlertTriangle className="h-4 w-4" />,
          content: "Understand penalty regimes for late filing and payment, plan for payments on account system, consider interest charges on late payments, factor in timing of income recognition."
        },
        {
          title: "Performance Tracking",
          color: "red",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Achieve 100% on-time submission rate, maintain zero penalty record, meet all payment deadlines, respond to HMRC queries within required timeframes, keep compliance costs minimal."
        }
      ]
    },
    {
      title: "HMRC Resources",
      icon: <Globe className="h-5 w-5 text-green-400" />,
      theme: "green",
      cards: [
        {
          title: "GOV.UK Tax Portal",
          color: "purple",
          icon: <Globe className="h-4 w-4" />,
          content: "Access official HMRC guidance, submit returns online, view your tax account, make payments, and track correspondence. Essential for Managing Tax Digital compliance and real-time tax management."
        },
        {
          title: "CIS Helpline",
          color: "blue",
          icon: <Building2 className="h-4 w-4" />,
          content: "Dedicated Construction Industry Scheme support: 0300 200 3210. Get help with contractor registration, subcontractor verification, monthly returns, and gross payment status applications."
        },
        {
          title: "VAT Helpline",
          color: "green",
          icon: <Calculator className="h-4 w-4" />,
          content: "VAT-specific guidance and support: 0300 200 3700. Assistance with registration, scheme selection, Making Tax Digital queries, and complex VAT calculations for electrical work."
        },
        {
          title: "Self Assessment Support",
          color: "orange",
          icon: <FileText className="h-4 w-4" />,
          content: "Self Assessment helpline: 0300 200 3310. Help with return completion, allowable expenses queries, and deadline guidance. Online chat and digital assistant also available."
        },
        {
          title: "Business Support",
          color: "yellow",
          icon: <Briefcase className="h-4 w-4" />,
          content: "HMRC Business Support Team provides guidance for new businesses, compliance visits, and complex queries. Free webinars and workshops available for small business owners."
        },
        {
          title: "Digital Services",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "HMRC app for mobiles, online tax account access, digital record keeping guidance, and Making Tax Digital software recommendations. Essential for modern tax compliance."
        }
      ]
    },
    {
      title: "Common Scenarios",
      icon: <Lightbulb className="h-5 w-5 text-orange-400" />,
      theme: "orange",
      cards: [
        {
          title: "Starting as Sole Trader",
          color: "purple",
          icon: <Users className="h-4 w-4" />,
          content: "Register for Self Assessment, consider early voluntary VAT registration, understand allowable business expenses, plan for first year tax bill. Keep detailed records from day one."
        },
        {
          title: "Incorporating Your Business",
          color: "blue",
          icon: <Building2 className="h-4 w-4" />,
          content: "Timing considerations, share capital structure, salary vs dividend strategy, corporation tax planning, transfer of business assets. Professional advice essential for optimal structure."
        },
        {
          title: "High-Value Equipment Purchases",
          color: "green",
          icon: <Calculator className="h-4 w-4" />,
          content: "Annual Investment Allowance planning, timing purchases for maximum tax relief, VAT considerations, leasing vs buying analysis. Consider cash flow impact on tax planning."
        },
        {
          title: "Domestic vs Commercial Split",
          color: "orange",
          icon: <Shield className="h-4 w-4" />,
          content: "Different VAT rates (20% vs 5% for energy-saving), CIS applications vary, insurance requirements differ, record-keeping complexity increases. Plan systems to track both streams."
        },
        {
          title: "Subcontractor Arrangements",
          color: "yellow",
          icon: <Receipt className="h-4 w-4" />,
          content: "CIS registration requirements, gross payment status benefits, invoice requirements, tax treatment of payments received, interaction with VAT obligations on same work."
        },
        {
          title: "Retirement Planning",
          color: "red",
          icon: <PiggyBank className="h-4 w-4" />,
          content: "Pension contribution strategies, business sale considerations, capital gains planning, income drawdown vs annuity decisions. Start planning early for optimal outcomes."
        }
      ]
    },
    {
      title: "Quick Reference Cards",
      icon: <Map className="h-5 w-5 text-yellow-400" />,
      theme: "yellow",
      cards: [
        {
          title: "Key Tax Rates 2024/25",
          color: "purple",
          icon: <Calculator className="h-4 w-4" />,
          content: "Personal Allowance: £12,570 | Basic Rate: 20% (£12,571-£50,270) | Higher Rate: 40% (£50,271-£125,140) | Corporation Tax: 19%-25% | VAT: 20% standard, 5% energy-saving"
        },
        {
          title: "Important Deadlines",
          color: "blue",
          icon: <Clock className="h-4 w-4" />,
          content: "Self Assessment: 31st Jan | Corporation Tax: 9 months + 1 day | VAT Returns: 1 month + 7 days | CIS Returns: 19th of following month | Pension contributions: 5th April"
        },
        {
          title: "Allowable Business Expenses",
          color: "green",
          icon: <Receipt className="h-4 w-4" />,
          content: "Tools and equipment | Vehicle expenses | Professional fees | Training costs | Insurance premiums | Office costs | Protective clothing | Phone bills (business use) | Advertising"
        },
        {
          title: "VAT Registration Thresholds",
          color: "orange",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Mandatory: £90,000 turnover | Voluntary: Any level | Deregistration: Below £88,000 | Flat Rate Scheme: 12.5% for electrical contractors | Annual accounting available"
        },
        {
          title: "CIS Quick Facts",
          color: "yellow",
          icon: <Building2 className="h-4 w-4" />,
          content: "Standard Rate: 20% deduction | Higher Rate: 30% (unverified) | Gross Payment: 0% (if qualified) | Monthly returns due 19th | Applies to construction work only"
        },
        {
          title: "Emergency Contacts",
          color: "red",
          icon: <AlertTriangle className="h-4 w-4" />,
          content: "HMRC General: 0300 200 3300 | CIS: 0300 200 3210 | VAT: 0300 200 3700 | Self Assessment: 0300 200 3310 | Online services help: 0300 200 3600"
        }
      ]
    },
    {
      title: "Seasonal Planning",
      icon: <Calendar className="h-5 w-5 text-red-400" />,
      theme: "red",
      cards: [
        {
          title: "Q1 (April-June)",
          color: "purple",
          icon: <Calendar className="h-4 w-4" />,
          content: "New tax year begins. Review allowances and rates. Plan major equipment purchases. Consider pension contributions. Set up new year record-keeping systems. Register for CIS if needed."
        },
        {
          title: "Q2 (July-September)",
          color: "blue",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Mid-year tax review. Assess income projections. Plan timing of major expenses. Review business structure efficiency. Consider incorporation timing. Update insurance arrangements."
        },
        {
          title: "Q3 (October-December)",
          color: "green",
          icon: <Calculator className="h-4 w-4" />,
          content: "Tax planning intensifies. Make equipment purchases for maximum allowances. Plan pension contributions. Prepare for Self Assessment. Consider income timing strategies. Book accountant appointments."
        },
        {
          title: "Q4 (January-March)",
          color: "orange",
          icon: <FileText className="h-4 w-4" />,
          content: "Complete Self Assessment by 31st January. Make tax payments. Prepare corporation tax returns. Analyse previous year performance. Plan improvements for new tax year ahead."
        },
        {
          title: "Year-End Activities",
          color: "yellow",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Stocktake and valuations. Review bad debts. Check all expenses claimed. Confirm allowances maximised. Prepare accounts. Book tax payment dates. Plan cash flow for tax bills."
        },
        {
          title: "Continuous Tasks",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Monthly record reconciliation. VAT return preparation. CIS monthly returns. Invoice processing. Receipt storage. Bank reconciliation. Professional development tracking."
        }
      ]
    },
    {
      title: "Professional Network",
      icon: <Network className="h-5 w-5 text-indigo-400" />,
      theme: "indigo",
      cards: [
        {
          title: "Qualified Accountants",
          color: "purple",
          icon: <GraduationCap className="h-4 w-4" />,
          content: "ACCA, ICAEW, or CIMA qualified accountants with construction industry experience. Look for CIS and electrical trade specialisation. Check references and professional indemnity insurance."
        },
        {
          title: "Tax Advisors",
          color: "blue",
          icon: <Calculator className="h-4 w-4" />,
          content: "Chartered Tax Advisers (CTA) for complex planning. Specialists in small business taxation, incorporation planning, and succession planning. Essential for high-value tax decisions."
        },
        {
          title: "Business Mentors",
          color: "green",
          icon: <Users className="h-4 w-4" />,
          content: "SCORE mentors, Prince's Trust advisors, local business networks. Industry-specific mentoring through electrical trade associations. Peer support groups for business owners."
        },
        {
          title: "Legal Support",
          color: "orange",
          icon: <Shield className="h-4 w-4" />,
          content: "Solicitors specialising in small business, employment law, and contract disputes. Essential for incorporation, partnership agreements, and complex commercial arrangements."
        },
        {
          title: "Financial Services",
          color: "yellow",
          icon: <PiggyBank className="h-4 w-4" />,
          content: "Business bank relationships, equipment finance specialists, pension advisors. Insurance brokers with construction industry expertise. Factoring services for cash flow."
        },
        {
          title: "Professional Bodies",
          color: "red",
          icon: <BookOpen className="h-4 w-4" />,
          content: "NICEIC, NAPIT, SELECT for technical standards. Federation of Small Businesses for business support. Local Chamber of Commerce for networking and advocacy."
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
      red: "border-l-4 border-l-red-500 bg-red-500/5",
      indigo: "border-l-4 border-l-indigo-500 bg-indigo-500/5"
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
      red: "text-red-400",
      indigo: "text-indigo-400"
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
              {metric.icon}
              <div className="text-sm font-medium text-white">{metric.metric}</div>
              <div className="text-sm text-muted-foreground">{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        {taxSections.map((section, index) => (
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

export default TaxPlanningTab;
