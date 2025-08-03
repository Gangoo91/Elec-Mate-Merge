
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Calculator, Car, Home, Wrench, Receipt, Shield, FileCheck, FileText, 
  Scale, Building, TrendingUp, Clock, PoundSterling, Smartphone, 
  AlertTriangle, Target, Fuel, Settings, Archive, BookOpen, 
  CreditCard, MapPin, Calendar, Users, Trophy, Lightbulb
} from "lucide-react";

const ExpenseManagementTab = () => {
  const isMobile = useIsMobile();

  const expenseMetrics = [
    {
      metric: "Annual Vehicle Costs",
      data: "£4,500 - £8,000",
      icon: <Car className="h-5 w-5 text-blue-400" />,
      detail: "Average vehicle expenses for electrical contractors"
    },
    {
      metric: "Tool Investment",
      data: "£2,000 - £5,000",
      icon: <Wrench className="h-5 w-5 text-green-400" />,
      detail: "Initial tool setup plus annual replacements"
    },
    {
      metric: "Home Office Claim",
      data: "£6/week or actual",
      icon: <Home className="h-5 w-5 text-orange-400" />,
      detail: "HMRC simplified expenses or proportionate costs"
    },
    {
      metric: "Professional Costs",
      data: "£800 - £2,500",
      icon: <Receipt className="h-5 w-5 text-purple-400" />,
      detail: "Insurance, training, and professional services annually"
    }
  ];

  const expenseSections = [
    {
      title: "Vehicle & Travel Expenses",
      icon: <Car className="h-5 w-5 text-purple-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          items: [
            "Vehicle expenses are typically the largest deductible cost for electrical contractors",
            "Choose between simplified mileage rates or actual cost method",
            "Maintain clear distinction between business and personal use",
            "Consider capital allowances for vehicle purchases",
            "Optimize tax relief through proper documentation",
            "Plan vehicle replacement to maximize allowances"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green", 
          items: [
            "Day 1: Set up mileage tracking system (digital or manual)",
            "Week 1: Establish receipt collection process for fuel/expenses",
            "Week 2: Configure business bank account for vehicle costs",
            "Month 1: Review insurance policy for business use coverage",
            "Quarterly: Reconcile mileage logs with fuel receipts",
            "Annually: Calculate actual vs simplified method comparison"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          items: [
            "Significant tax relief on legitimate business travel",
            "45p per mile rate often exceeds actual costs",
            "Simplified record keeping with mileage method",
            "Capital allowances available on vehicle purchases",
            "Running costs fully deductible when business use",
            "Professional image through branded vehicle signage"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          items: [
            "Mileage rate: 45p first 10,000 miles, 25p thereafter",
            "Business use insurance classification essential",
            "Detailed journey logs with purpose and destinations",
            "Cannot claim both mileage and actual costs",
            "Parking, tolls, and congestion charges separately claimable",
            "Van modifications and racking systems allowable"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          items: [
            "Mileage allowance relief reduces taxable profit",
            "Annual Investment Allowance available on vehicle purchases",
            "Private use benefit-in-kind charges may apply",
            "VAT recovery possible on fuel for business use",
            "Capital gains implications on vehicle disposal",
            "Choose optimal timing for vehicle purchases (year-end)"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          items: [
            "Vehicle cost as percentage of turnover: Target <15%",
            "Mileage claim accuracy: 100% business journey verification",
            "Documentation compliance: Complete records for 6 years",
            "Tax relief optimization: Compare methods annually",
            "Fuel efficiency monitoring: Track mpg improvements",
            "Insurance claims: Maintain clean business driving record"
          ]
        }
      ]
    },
    {
      title: "Tools & Equipment",
      icon: <Wrench className="h-5 w-5 text-blue-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          items: [
            "Tool expenses are second largest after vehicles for electrical contractors",
            "Investment in quality tools improves efficiency and safety",
            "Balance between capital purchases and ongoing consumables",
            "Annual Investment Allowance available for tool purchases",
            "Consider tool hire vs purchase for specialist equipment",
            "Professional testing equipment essential for BS7671 compliance"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green",
          items: [
            "Day 1: Create tool inventory with purchase dates and values",
            "Week 1: Set up tool insurance policy and documentation",
            "Week 2: Establish supplier accounts for trade discounts",
            "Month 1: Implement tool tracking and maintenance system",
            "Quarterly: Review tool condition and replacement needs",
            "Annually: Update insurance valuations and depreciation"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          items: [
            "100% tax relief on tools purchased for business use",
            "Annual Investment Allowance covers most tool purchases",
            "Quality tools reduce job completion times",
            "Professional image with quality equipment",
            "Reduced liability through compliant testing equipment",
            "Trade discounts available through electrical wholesalers"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          items: [
            "Must be used wholly and exclusively for business",
            "Receipts required for all tool purchases",
            "Installation testers must meet BS7671 18th Edition",
            "Annual calibration certificates for testing equipment",
            "Tool theft insurance recommended (minimum £10,000)",
            "Consumables fully deductible as revenue expenses"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          items: [
            "Annual Investment Allowance: 100% first year relief",
            "Capital vs revenue distinction for accounting",
            "VAT recovery on business tool purchases",
            "Plant and machinery allowances for expensive equipment",
            "Pool depreciation at 18% for items over £1,000",
            "Timing purchases for optimal tax relief"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          items: [
            "Tool cost per job: Monitor efficiency improvements",
            "Insurance claims ratio: Target zero theft/damage",
            "Calibration compliance: 100% up-to-date certificates",
            "Tool utilisation: Track return on investment",
            "Replacement cycle: Optimise based on usage patterns",
            "Total tool value: Maintain appropriate insurance cover"
          ]
        }
      ]
    },
    {
      title: "Home Office Costs",
      icon: <Home className="h-5 w-5 text-green-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          items: [
            "Home office expenses provide valuable tax relief for electrical contractors",
            "Choose between simplified flat rate or actual cost method",
            "Simplified method often more advantageous for small offices",
            "Actual cost method better for larger dedicated office spaces",
            "Essential for administrative work and customer communications",
            "Must be used regularly and exclusively for business"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green",
          items: [
            "Day 1: Measure office space and calculate business use percentage",
            "Week 1: Set up time tracking for home office usage",
            "Week 2: Separate business communications from personal",
            "Month 1: Review utility bills and establish baseline costs",
            "Quarterly: Track actual vs simplified method benefits",
            "Annually: Review space usage and optimize method choice"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          items: [
            "Significant tax relief on home running costs",
            "Professional work environment for customer communications",
            "Reduced overhead compared to external office space",
            "Flexibility to work during non-standard hours",
            "Improved work-life balance and efficiency",
            "Lower business premises insurance costs"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          items: [
            "Simplified method: £6/week for 25+ hours usage",
            "Regular and exclusive business use essential",
            "Actual cost method requires detailed records",
            "Business use percentage calculation needed",
            "Cannot claim both methods simultaneously",
            "Office equipment 100% deductible if business only"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          items: [
            "Home office allowance reduces taxable profit",
            "No Capital Gains Tax implications with simplified method",
            "Actual costs may trigger CGT on property disposal",
            "VAT recovery possible on office equipment",
            "Annual Investment Allowance on office equipment",
            "Communication costs fully deductible"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          items: [
            "Office usage hours: Minimum 25 hours/week for £6 rate",
            "Documentation compliance: Complete usage logs",
            "Cost comparison: Simplified vs actual method annually",
            "Space efficiency: Optimize business use percentage",
            "Equipment productivity: Track technology improvements",
            "Communication costs: Monitor as percentage of turnover"
          ]
        }
      ]
    },
    {
      title: "Professional Services",
      icon: <PoundSterling className="h-5 w-5 text-yellow-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          items: [
            "Professional services ensure legal compliance and business protection",
            "Insurance premiums are essential business expenses",
            "Training costs maintain professional competence and certifications",
            "Professional advice prevents costly mistakes and penalties",
            "Marketing expenses build customer base and reputation",
            "Banking services facilitate professional business operations"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green",
          items: [
            "Day 1: Arrange essential insurance policies (liability, indemnity)",
            "Week 1: Set up business banking with appropriate facilities",
            "Week 2: Register with professional bodies and schemes",
            "Month 1: Establish relationships with accountant and solicitor",
            "Quarterly: Review insurance coverage and professional needs",
            "Annually: Update training, certifications and marketing strategy"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          items: [
            "100% tax relief on legitimate professional service costs",
            "Legal protection through appropriate insurance coverage",
            "Professional credibility through memberships and training",
            "Expert advice prevents expensive compliance failures",
            "Marketing investment generates new customer acquisition",
            "Efficient banking services improve cash flow management"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          items: [
            "Public liability insurance minimum £2 million essential",
            "Professional indemnity recommended for electrical testing",
            "18th Edition certification mandatory for electrical work",
            "Competent Person Scheme membership required for notification",
            "Annual accounts preparation for limited companies",
            "Marketing expenses must be wholly for business purpose"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          items: [
            "Insurance premiums fully deductible business expenses",
            "Training costs allowable if maintaining existing skills",
            "Professional fees reduce taxable profit",
            "Bank charges and loan interest fully deductible",
            "Marketing costs spread if benefiting multiple years",
            "Legal fees deductible if relating to business matters"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          items: [
            "Insurance cost as percentage of turnover: Target <3%",
            "Professional service ROI: Measure advice value vs cost",
            "Training compliance: Maintain 100% certification currency",
            "Banking efficiency: Minimize fees through relationship management",
            "Marketing effectiveness: Track customer acquisition cost",
            "Professional network: Build valuable industry relationships"
          ]
        }
      ]
    },
    {
      title: "Digital Tracking Systems",
      icon: <Smartphone className="h-5 w-5 text-red-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          items: [
            "Digital systems eliminate manual record keeping errors",
            "Real-time expense tracking improves cash flow visibility",
            "Automated categorisation saves time and improves accuracy",
            "Cloud-based systems provide secure backup and accessibility",
            "Integration reduces duplicate data entry across systems",
            "Professional reporting enhances tax preparation efficiency"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green",
          items: [
            "Week 1: Research and select appropriate expense tracking app",
            "Week 2: Set up bank feeds and automated categorisation",
            "Week 3: Configure mileage tracking and GPS systems",
            "Month 1: Train on receipt capture and document storage",
            "Month 2: Integrate with existing accounting software",
            "Ongoing: Regular system maintenance and updates"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          items: [
            "Significant time savings on expense administration",
            "Improved accuracy and reduced risk of HMRC queries",
            "Real-time business performance visibility",
            "Enhanced professional image with digital processes",
            "Better cash flow management through timely tracking",
            "Simplified tax return preparation and compliance"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          items: [
            "Receipt capture through smartphone camera essential",
            "GPS-based mileage tracking for accurate records",
            "Bank feed integration for automated transaction import",
            "VAT-ready categorisation for quarterly returns",
            "Secure cloud storage with encryption",
            "Export capabilities for accountant collaboration"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          items: [
            "Software subscriptions fully deductible business expenses",
            "Digital records acceptable for HMRC compliance",
            "Must maintain backup systems for data security",
            "Automatic categorisation improves expense claim accuracy",
            "Real-time tracking prevents missed expense opportunities",
            "Professional reporting supports tax investigation defence"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          items: [
            "Time savings: Target 75% reduction in manual processing",
            "Accuracy improvement: Aim for 99%+ expense categorisation",
            "Compliance rate: 100% receipts captured within 24 hours",
            "Cost-benefit: Software cost under 1% of total expenses",
            "User adoption: Daily system usage by all team members",
            "Integration efficiency: Seamless data flow between systems"
          ]
        }
      ]
    },
    {
      title: "Tax Optimisation Strategies",
      icon: <Calculator className="h-5 w-5 text-orange-400" />,
      cards: [
        {
          title: "Strategy Overview",
          color: "blue",
          items: [
            "Strategic expense timing maximizes tax relief benefits",
            "Annual allowances provide 100% first-year relief opportunities",
            "Proper business structure selection optimizes overall tax efficiency",
            "Professional advice ensures compliance and identifies opportunities",
            "Regular reviews prevent missed allowances and deadline penalties",
            "Long-term planning balances cash flow with tax optimization"
          ]
        },
        {
          title: "Implementation Timeline",
          color: "green",
          items: [
            "April: Annual review of allowances and tax rates changes",
            "Monthly: Monitor cumulative expenses against allowances",
            "September: Begin year-end tax planning with accountant",
            "December: Execute year-end purchase strategies",
            "January: Ensure all expenses properly documented",
            "March: Final reconciliation before tax year end"
          ]
        },
        {
          title: "Business Benefits",
          color: "orange",
          items: [
            "Significant tax savings through strategic expense timing",
            "Improved cash flow through optimized allowance utilization",
            "Reduced compliance risk through professional guidance",
            "Enhanced business efficiency through structured planning",
            "Better financial control through regular monitoring",
            "Competitive advantage through lower effective tax rates"
          ]
        },
        {
          title: "Key Features & Requirements",
          color: "purple",
          items: [
            "Annual Investment Allowance currently £1 million limit",
            "Trading allowance £1,000 for qualifying small businesses",
            "Capital vs revenue expenditure classification crucial",
            "Timing of payments affects tax year allocation",
            "Professional advice essential for complex situations",
            "Complete documentation required for all claims"
          ]
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          items: [
            "Annual Investment Allowance provides 100% relief in year 1",
            "Capital allowances pool at 18% for equipment over £1,000",
            "Revenue expenses deductible in full in year incurred",
            "Timing of payment determines tax year allocation",
            "Pre-payment strategies can accelerate relief",
            "Business structure affects available allowances and rates"
          ]
        },
        {
          title: "Success Metrics/KPIs",
          color: "red",
          items: [
            "Effective tax rate: Monitor year-on-year improvements",
            "Allowance utilisation: Target 100% of available reliefs",
            "Professional advice ROI: Tax savings vs advisory costs",
            "Compliance score: Zero penalties or interest charges",
            "Planning horizon: Maintain 3-year tax strategy",
            "Documentation quality: Pass any HMRC review"
          ]
        }
      ]
    }
  ];

  const getCardColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-500/30 bg-blue-500/10';
      case 'green':
        return 'border-green-500/30 bg-green-500/10';
      case 'orange':
        return 'border-orange-500/30 bg-orange-500/10';
      case 'purple':
        return 'border-purple-500/30 bg-purple-500/10';
      case 'yellow':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'red':
        return 'border-red-500/30 bg-red-500/10';
      default:
        return 'border-elec-yellow/20 bg-elec-gray';
    }
  };

  return (
    <div className="space-y-6">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Calculator className="h-4 w-4" />
        <AlertDescription className="text-green-300 font-medium">
          Proper expense management can significantly reduce your tax liability. Keep detailed records 
          and understand what qualifies as a legitimate business expense for electrical contractors.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {expenseMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                {metric.icon}
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>{metric.metric}</div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-4">
        {expenseSections.map((section, sectionIndex) => (
          <MobileAccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
            <MobileAccordionTrigger 
              icon={section.icon}
              className="text-left hover:bg-elec-gray/50 p-4 rounded-lg border border-elec-yellow/20"
            >
              <span className="text-white font-semibold">{section.title}</span>
            </MobileAccordionTrigger>
            <MobileAccordionContent className="space-y-3 pt-4">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {section.cards.map((card, cardIndex) => (
                  <Card key={cardIndex} className={`${getCardColorClasses(card.color)} p-4`}>
                    <h4 className="font-semibold text-white mb-3 text-sm">{card.title}</h4>
                    <ul className="space-y-1.5">
                      {card.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                          <span className="text-elec-yellow mt-0.5 shrink-0 text-xs">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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

export default ExpenseManagementTab;
