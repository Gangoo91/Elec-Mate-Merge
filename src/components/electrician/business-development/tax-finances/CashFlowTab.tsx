
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { 
  TrendingUp, 
  Calendar, 
  PiggyBank, 
  CreditCard, 
  AlertTriangle,
  DollarSign,
  Calculator,
  FileText,
  Clock,
  Target,
  Shield,
  Lightbulb,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Building,
  Receipt,
  PoundSterling,
  Banknote
} from "lucide-react";

const CashFlowTab = () => {
  const metrics = [
    { label: "Target Reserve Fund", value: "6 months", icon: <PiggyBank className="h-4 w-4" /> },
    { label: "Payment Terms", value: "14 days", icon: <Calendar className="h-4 w-4" /> },
    { label: "Cash Conversion", value: "21 days", icon: <TrendingUp className="h-4 w-4" /> },
    { label: "Emergency Buffer", value: "£15,000", icon: <Shield className="h-4 w-4" /> }
  ];

  const cashFlowSections = [
    {
      title: "Invoice & Payment Management",
      icon: <Receipt className="h-5 w-5 text-blue-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          content: [
            "Implement immediate invoicing upon job completion",
            "Establish clear payment terms (7, 14, or 30 days)",
            "Use professional invoicing software with tracking",
            "Set up automated payment reminders",
            "Offer multiple payment methods for convenience"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green", 
          content: [
            "Week 1: Choose and set up invoicing software",
            "Week 2: Design professional invoice templates",
            "Week 3: Establish payment processing systems",
            "Week 4: Train team on new invoicing procedures",
            "Ongoing: Monitor and optimise payment times"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          content: [
            "Improved cash flow predictability",
            "Reduced debtor days and late payments",
            "Professional business image enhancement",
            "Better financial planning capabilities",
            "Reduced administrative burden"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          content: [
            "Cloud-based invoicing software subscription",
            "Payment gateway integration (2-3% fees)",
            "Bank account for direct debits",
            "Professional invoice design templates",
            "Customer payment portal access"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          content: [
            "VAT implications of different payment methods",
            "Record keeping for HMRC compliance",
            "Business expense deductions for software",
            "Payment processing fees as allowable costs",
            "Cash vs accrual accounting considerations"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          content: [
            "Average debtor days: Target <21 days",
            "Invoice processing time: <24 hours",
            "Payment success rate: >95%",
            "Late payment reduction: >50%",
            "Customer satisfaction with payment process"
          ]
        }
      ]
    },
    {
      title: "Cash Flow Forecasting",
      icon: <BarChart3 className="h-5 w-5 text-green-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          content: [
            "Develop 13-week rolling cash flow forecasts",
            "Monitor seasonal business patterns",
            "Track actual vs predicted cash positions",
            "Identify potential cash shortfalls early",
            "Plan for major expenditures and investments"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green",
          content: [
            "Month 1: Analyse historical cash flow patterns",
            "Month 2: Create forecasting spreadsheets/software",
            "Month 3: Implement weekly forecast reviews",
            "Month 4: Refine forecasting accuracy",
            "Ongoing: Weekly forecast updates and reviews"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          content: [
            "Early warning of cash shortfalls",
            "Better decision making for investments",
            "Improved seasonal planning",
            "Enhanced bank relationship management",
            "Reduced financial stress and uncertainty"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          content: [
            "Historical financial data (12+ months)",
            "Forecasting software or advanced spreadsheets",
            "Weekly time allocation for updates",
            "Integration with accounting systems",
            "Scenario planning capabilities"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          content: [
            "Quarterly VAT payment planning",
            "Corporation tax payment scheduling",
            "PAYE and NIC timing considerations",
            "Capital allowance claim timing",
            "Self-assessment tax payment dates"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          content: [
            "Forecast accuracy: Target >90%",
            "Cash position never below minimum threshold",
            "Seasonal variation prediction accuracy",
            "Zero missed payment obligations",
            "Improved bank facility negotiations"
          ]
        }
      ]
    },
    {
      title: "Emergency Fund Management",
      icon: <PiggyBank className="h-5 w-5 text-orange-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          content: [
            "Maintain 3-6 months operating expenses reserve",
            "Separate business and personal emergency funds",
            "Use high-yield business savings accounts",
            "Regular review and adjustment of fund targets",
            "Clear criteria for fund utilisation"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green",
          content: [
            "Month 1: Calculate required emergency fund size",
            "Month 2: Open dedicated high-yield savings account",
            "Month 3-12: Build fund through monthly transfers",
            "Quarterly: Review fund adequacy and performance",
            "Annual: Reassess fund size requirements"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          content: [
            "Financial security during emergencies",
            "Ability to weather seasonal downturns",
            "Confidence to take calculated business risks",
            "Reduced reliance on expensive credit",
            "Peace of mind for business operations"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          content: [
            "Business savings account with competitive rates",
            "Easy access without penalties",
            "Separate from operational accounts",
            "Regular automated contributions",
            "Clear fund access policies"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          content: [
            "Interest income taxation on savings",
            "Corporation tax implications of reserves",
            "Optimal timing for fund contributions",
            "Business investment vs savings decisions",
            "Emergency fund vs pension contributions"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          content: [
            "Fund size: 3-6 months operating expenses",
            "Monthly contribution consistency: 100%",
            "Fund growth rate vs inflation",
            "Zero emergency borrowing requirements",
            "Annual fund adequacy review completion"
          ]
        }
      ]
    },
    {
      title: "Seasonal Planning & Adjustment",
      icon: <Clock className="h-5 w-5 text-purple-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          content: [
            "Plan for seasonal revenue fluctuations",
            "Adjust workforce and expenses seasonally",
            "Build reserves during peak periods",
            "Develop winter revenue streams",
            "Create flexible cost structures"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green",
          content: [
            "Spring: Plan summer peak capacity",
            "Summer: Build cash reserves for winter",
            "Autumn: Secure winter work contracts",
            "Winter: Manage costs and preserve cash",
            "Year-round: Monitor seasonal performance"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          content: [
            "Smoother cash flow throughout the year",
            "Reduced winter financial stress",
            "Better workforce retention",
            "Improved customer service consistency",
            "Enhanced business sustainability"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          content: [
            "Historical seasonal performance data",
            "Flexible employment contracts",
            "Diverse service offerings",
            "Strong customer relationships",
            "Effective marketing strategies"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          content: [
            "Timing of major equipment purchases",
            "Seasonal staff vs subcontractor implications",
            "VAT registration threshold management",
            "Expense timing for tax efficiency",
            "Year-end tax planning considerations"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          content: [
            "Seasonal revenue variance: <30%",
            "Winter cash flow positive months: >2",
            "Seasonal staff retention rate: >80%",
            "Customer satisfaction consistency",
            "Annual profit margin stability"
          ]
        }
      ]
    },
    {
      title: "Credit & Financing Management",
      icon: <CreditCard className="h-5 w-5 text-yellow-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          content: [
            "Establish business credit facilities before needed",
            "Maintain strong business credit score",
            "Diversify financing options available",
            "Negotiate favourable terms with suppliers",
            "Use credit strategically for growth"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green",
          content: [
            "Month 1: Review current credit position",
            "Month 2: Apply for business credit facilities",
            "Month 3: Establish supplier credit accounts",
            "Month 4: Implement credit monitoring systems",
            "Ongoing: Regular credit review and optimisation"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          content: [
            "Access to emergency funding when needed",
            "Improved supplier payment terms",
            "Enhanced business credibility",
            "Growth financing availability",
            "Better cash flow management tools"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          content: [
            "Strong business credit history",
            "Good personal credit score (initially)",
            "Proper business registration and accounts",
            "Regular financial statement preparation",
            "Professional banking relationships"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          content: [
            "Interest payment deductibility",
            "Timing of credit facility establishment",
            "Asset purchase vs lease decisions",
            "Working capital vs equipment financing",
            "Corporation tax implications of borrowing"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          content: [
            "Business credit score: >700",
            "Credit utilisation ratio: <30%",
            "Number of financing options: >3",
            "Average supplier payment terms: >30 days",
            "Credit availability vs business needs ratio"
          ]
        }
      ]
    },
    {
      title: "Financial Monitoring & Control",
      icon: <Target className="h-5 w-5 text-red-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          content: [
            "Implement daily cash position monitoring",
            "Establish financial performance dashboards",
            "Regular variance analysis against budgets",
            "Set up automated financial alerts",
            "Monthly financial review meetings"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green",
          content: [
            "Week 1: Set up daily cash monitoring",
            "Week 2: Create financial dashboard templates",
            "Week 3: Establish reporting procedures",
            "Week 4: Train team on financial metrics",
            "Monthly: Implement regular review cycles"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          content: [
            "Early identification of financial issues",
            "Improved decision-making speed",
            "Better cost control and management",
            "Enhanced profitability tracking",
            "Increased financial discipline"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          content: [
            "Cloud-based accounting system",
            "Daily bank balance monitoring",
            "Key performance indicator tracking",
            "Regular financial reporting schedule",
            "Management accounting expertise"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          content: [
            "Real-time VAT position monitoring",
            "Corporation tax provision tracking",
            "Expense categorisation for tax purposes",
            "Capital vs revenue expenditure tracking",
            "Tax deadline calendar integration"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          content: [
            "Daily cash position accuracy: 100%",
            "Financial report timeliness: <5 days",
            "Budget variance identification: <10%",
            "Financial issue resolution time: <48 hours",
            "Management decision response time"
          ]
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-500/50 bg-blue-500/10';
      case 'green':
        return 'border-green-500/50 bg-green-500/10';
      case 'orange':
        return 'border-orange-500/50 bg-orange-500/10';
      case 'purple':
        return 'border-purple-500/50 bg-purple-500/10';
      case 'yellow':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'red':
        return 'border-red-500/50 bg-red-500/10';
      default:
        return 'border-elec-yellow/20 bg-elec-gray';
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Section */}
      <Alert className="border-elec-yellow/20 bg-elec-yellow/10">
        <AlertTriangle className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-white">
          Effective cash flow management is critical for electrical business success. Monitor your cash position daily and plan for seasonal variations.
        </AlertDescription>
      </Alert>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-elec-yellow">{metric.icon}</div>
              <span className="text-xs text-muted-foreground font-medium">{metric.label}</span>
            </div>
            <div className="text-lg font-bold text-white">{metric.value}</div>
          </Card>
        ))}
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        <MobileAccordion type="multiple" className="space-y-4">
          {cashFlowSections.map((section, index) => (
            <MobileAccordionItem key={index} value={`section-${index}`}>
              <MobileAccordionTrigger
                icon={section.icon}
                className="text-left hover:bg-elec-gray/50 p-4 rounded-lg border border-elec-yellow/20"
              >
                <span className="text-white font-semibold">{section.title}</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent className="space-y-3 pt-4">
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {section.cards.map((card, cardIndex) => (
                    <Card key={cardIndex} className={getColorClasses(card.color)}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold text-white">
                          {card.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {card.content.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-2">
                            <ArrowRight className="h-3 w-3 text-white/60 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-muted-foreground leading-relaxed">
                              {item}
                            </span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          ))}
        </MobileAccordion>
      </div>
    </div>
  );
};

export default CashFlowTab;
