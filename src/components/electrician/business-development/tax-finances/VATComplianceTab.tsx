
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
  PoundSterling, 
  Calculator, 
  FileText, 
  Clock, 
  Shield,
  TrendingUp,
  Smartphone,
  Building2,
  Users,
  Target,
  CheckCircle2,
  Calendar,
  Briefcase,
  CreditCard,
  BookOpen,
  Receipt
} from "lucide-react";

const VATComplianceTab = () => {
  const vatMetrics = [
    {
      title: "VAT Registration Threshold",
      value: "£90,000",
      description: "Annual turnover threshold for 2024/25",
      icon: <PoundSterling className="h-5 w-5 text-purple-400" />,
      trend: "Must register within 30 days of exceeding"
    },
    {
      title: "Standard VAT Rate",
      value: "20%",
      description: "Applied to most electrical services",
      icon: <Calculator className="h-5 w-5 text-purple-400" />,
      trend: "Reduced rates available for some work"
    },
    {
      title: "CIS Deduction Rate", 
      value: "20%",
      description: "Standard rate for subcontractors",
      icon: <Building2 className="h-5 w-5 text-purple-400" />,
      trend: "0% available with gross payment status"
    },
    {
      title: "MTD Compliance",
      value: "Apr 2024",
      description: "Mandatory digital record keeping",
      icon: <Smartphone className="h-5 w-5 text-purple-400" />,
      trend: "Quarterly submissions required"
    }
  ];

  const vatSections = [
    {
      title: "VAT Registration & Schemes",
      icon: <FileText className="h-5 w-5 text-purple-400" />,
      theme: "purple",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Choose the optimal VAT registration strategy for your electrical contracting business. Consider registration timing, scheme selection, and long-term business planning to maximise cash flow and minimise administrative burden."
        },
        {
          title: "Implementation Timeline",
          color: "blue", 
          icon: <Calendar className="h-4 w-4" />,
          content: "Register for VAT within 30 days of exceeding the £90,000 threshold. Set up Making Tax Digital software, establish quarterly return schedules, and implement proper invoice numbering systems for compliance."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "VAT registration enables full input tax recovery on materials and equipment, improves business credibility with commercial clients, and provides access to business-to-business networks requiring VAT registration."
        },
        {
          title: "Key Features & Requirements", 
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Maintain VAT invoices with required information, register for Making Tax Digital, keep detailed purchase records, and choose between Standard VAT (20%) or Flat Rate Scheme (12.5% for electrical contractors)."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "VAT is separate from income tax and CIS. Plan for quarterly VAT payments affecting cash flow. Consider the VAT implications of different job types, including reduced rates for energy-saving installations."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Track VAT recovery rates, monitor compliance deadlines, measure cash flow impact of VAT payments, and review scheme efficiency annually. Aim for 100% on-time submissions and zero penalties."
        }
      ]
    },
    {
      title: "Making Tax Digital (MTD)",
      icon: <Smartphone className="h-5 w-5 text-blue-400" />,
      theme: "blue",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Implement digital record-keeping systems to comply with MTD VAT requirements. Choose compatible software that integrates with your existing business processes whilst maintaining audit trails and real-time VAT calculations."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "MTD VAT has been mandatory since April 2022 for VAT-registered businesses. Ensure your software is MTD-compatible, migrate historical data, train staff on new processes, and test submission procedures before your next VAT return."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Improved accuracy in VAT calculations, real-time visibility of VAT positions, reduced errors in submissions, streamlined record-keeping, and better integration between accounting and VAT reporting systems."
        },
        {
          title: "Key Features & Requirements",
          color: "orange", 
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Use HMRC-recognised software, maintain digital records, submit VAT returns digitally, keep digital copies of VAT invoices, and ensure software can produce the required VAT data for submissions."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "MTD doesn't change VAT rules but changes how you keep records and submit returns. Ensure your software correctly handles construction industry rates, domestic installation rates, and CIS interactions."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "100% digital submission compliance, reduced time spent on VAT preparation, improved accuracy rates, faster month-end processing, and positive feedback from accountants or advisors on record quality."
        }
      ]
    },
    {
      title: "Construction Industry Scheme (CIS)",
      icon: <Building2 className="h-5 w-5 text-green-400" />,
      theme: "green",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Navigate the dual requirements of VAT and CIS for construction work. Understand how both systems interact, plan for cash flow impacts of CIS deductions, and consider applying for gross payment status to improve cash flow."
        },
        {
          title: "Implementation Timeline", 
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "Register for CIS before starting subcontract work. Apply for gross payment status if eligible (requires good compliance history). Set up systems to track both VAT and CIS on invoices and payments."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "CIS deductions count towards your tax bill, reducing year-end payments. Gross payment status eliminates cash flow impact of deductions. Proper CIS management improves relationships with main contractors."
        },
        {
          title: "Key Features & Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Separate CIS and VAT on invoices, track deductions received, submit monthly CIS returns, maintain subcontractor verification records, and understand interaction between CIS and VAT on the same work."
        },
        {
          title: "Tax Considerations", 
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "CIS deductions reduce income tax liability but don't affect VAT obligations. Plan for different cash flow patterns between CIS jobs (deductions taken) and direct domestic work (full payment received)."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Maintain gross payment status eligibility, achieve 100% accurate monthly returns, minimise cash flow gaps from deductions, and establish strong relationships with main contractors for repeat work."
        }
      ]
    },
    {
      title: "VAT Schemes & Rates",
      icon: <Calculator className="h-5 w-5 text-orange-400" />,
      theme: "orange",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Select the most appropriate VAT scheme for your business size and type of work. Compare Standard VAT (full input tax recovery) versus Flat Rate Scheme (simplified calculations) based on your purchase patterns and administrative capacity."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "Review VAT scheme annually or when business changes significantly. Changes can be made at the start of a VAT period. Allow time for system updates and staff training when switching between schemes."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Standard VAT maximises input tax recovery on materials and equipment. Flat Rate Scheme simplifies calculations and may provide cash flow benefits for businesses with low material costs relative to labour."
        },
        {
          title: "Key Features & Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Standard VAT: charge 20% on supplies, reclaim VAT on purchases. Flat Rate: charge 20% but pay 12.5% of turnover to HMRC, limited input tax recovery. Different rates apply to domestic energy-saving work (5%)."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Consider the impact of high-value equipment purchases on scheme choice. Factor in the complexity of different VAT rates for different types of electrical work when choosing your approach."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Compare actual VAT costs between schemes, monitor input tax recovery rates, track administrative time savings, and review annually to ensure optimal scheme selection for current business operations."
        }
      ]
    },
    {
      title: "Record Keeping & Compliance",
      icon: <FileText className="h-5 w-5 text-yellow-400" />,
      theme: "yellow",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Establish comprehensive record-keeping systems that satisfy both VAT and business requirements. Focus on digital solutions that provide audit trails, integrate with MTD requirements, and support business decision-making."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "Set up record-keeping systems before starting VAT registration. Implement monthly reconciliation processes, establish filing systems for receipts and invoices, and create backup procedures for digital records."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Good records support accurate VAT returns, enable efficient business analysis, simplify year-end accounts preparation, and provide evidence for VAT inspections or disputes with suppliers/customers."
        },
        {
          title: "Key Features & Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Keep records for 6 years, maintain VAT invoices with all required details, record all business purchases with VAT receipts, track customer details and payment methods, and ensure MTD-compatible digital storage."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Separate records for different VAT rates and schemes, track partial exemption if applicable, maintain evidence for input tax claims, and keep detailed records of any private use adjustments."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Achieve monthly VAT reconciliation within 5 working days, maintain 100% documentation for input tax claims, reduce time spent on VAT return preparation, and receive positive feedback from VAT inspections."
        }
      ]
    },
    {
      title: "Penalties & Risk Management",
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      theme: "red",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Implement systems to avoid VAT penalties and manage compliance risks. Focus on deadline management, accuracy of returns, and maintaining good relationships with HMRC through proactive communication about any issues."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Calendar className="h-4 w-4" />,
          content: "Set up calendar reminders for VAT deadlines, implement monthly reconciliation procedures, establish error-checking processes for returns, and create contingency plans for dealing with potential compliance issues."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Avoid costly penalties and interest charges, maintain good standing with HMRC, protect business reputation, reduce stress and administrative burden of dealing with compliance issues, and improve cash flow predictability."
        },
        {
          title: "Key Features & Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Submit returns by the deadline (one month and 7 days after VAT period end), pay VAT by direct debit to avoid late payment, maintain accurate records, respond promptly to HMRC correspondence, and correct errors quickly."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Understand the penalty regime for late submission and payment, know when to make voluntary disclosures for errors, plan for interest charges on late payments, and consider the impact of penalties on business cash flow."
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Maintain zero penalty record, achieve 100% on-time submission rate, keep error rates below 2% of turnover, respond to HMRC queries within required timeframes, and maintain clean compliance history for gross payment status."
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
      {/* Alert Section */}
      <Alert className="border-purple-500/50 bg-purple-500/10">
        <AlertTriangle className="h-4 w-4 text-purple-400" />
        <AlertDescription className="text-purple-200">
          <strong>Important:</strong> VAT and HMRC compliance requirements for electrical contractors. This guidance covers UK regulations current as of 2024/25. 
          Always consult with a qualified accountant for business-specific advice and ensure compliance with the latest HMRC requirements.
        </AlertDescription>
      </Alert>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vatMetrics.map((metric, index) => (
          <Card key={index} className="border-purple-500/20 bg-purple-500/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  {metric.icon}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-purple-300">{metric.value}</p>
                <p className="text-sm font-medium text-white">{metric.title}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
                <p className="text-xs text-purple-400">{metric.trend}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Accordion Sections */}
      <MobileAccordion type="single" collapsible className="space-y-4">
        {vatSections.map((section, index) => (
          <MobileAccordionItem key={index} value={`section-${index}`}>
            <Card className={getThemeClasses(section.theme)}>
              <MobileAccordionTrigger 
                icon={section.icon}
                className="px-6 py-4 hover:no-underline"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className={`p-2 rounded-lg bg-${section.theme}-500/10`}>
                    <div className={getThemeIcon(section.theme)}>
                      {section.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                  </div>
                </div>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="px-6 pb-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {section.cards.map((card, cardIndex) => (
                      <Card key={cardIndex} className={`${getCardClasses(card.color)} border border-gray-700/50`}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                            <div className={getCardIconClasses(card.color)}>
                              {card.icon}
                            </div>
                            {card.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {card.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </MobileAccordionContent>
            </Card>
          </MobileAccordionItem>
        ))}
      </MobileAccordion>
    </div>
  );
};

export default VATComplianceTab;
