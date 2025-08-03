
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
      icon: <Car className="h-5 w-5" />,
      cards: [
        {
          title: "Business Mileage",
          color: "blue",
          items: [
            "45p per mile (first 10,000 miles annually)",
            "25p per mile (over 10,000 miles)",
            "Keep detailed mileage log with dates",
            "Record start/end locations and purpose",
            "Include return journeys to base",
            "Separate business from personal use"
          ]
        },
        {
          title: "Vehicle Running Costs",
          color: "green", 
          items: [
            "Fuel for business journeys only",
            "Insurance (business use class)",
            "MOT, servicing, and repairs",
            "Vehicle tax and registration",
            "Breakdown cover and AA membership",
            "Commercial vehicle license fees"
          ]
        },
        {
          title: "Parking & Travel",
          color: "orange",
          items: [
            "Customer site parking fees",
            "Congestion and toll charges",
            "Public transport for site visits",
            "Hotel accommodation when necessary",
            "Subsistence during long jobs",
            "Travel to training courses"
          ]
        },
        {
          title: "Van Purchase/Lease",
          color: "purple",
          items: [
            "Vehicle depreciation (if purchased)",
            "Monthly lease or hire payments",
            "Initial deposit payments",
            "Vehicle modifications for trade use",
            "Racking and storage systems",
            "Sign writing and branding costs"
          ]
        },
        {
          title: "Record Keeping",
          color: "yellow",
          items: [
            "Digital mileage tracking apps",
            "Fuel receipt collection system",
            "Service and maintenance records",
            "Insurance certificate copies",
            "Business vs personal usage split",
            "Annual mileage reconciliation"
          ]
        },
        {
          title: "Common Mistakes",
          color: "red",
          items: [
            "Claiming personal/commuting mileage",
            "Missing fuel receipts for evidence",
            "Incorrect business use percentage",
            "Not updating insurance for business use",
            "Claiming both mileage and actual costs",
            "Poor documentation of journey purposes"
          ]
        }
      ]
    },
    {
      title: "Tools & Equipment",
      icon: <Wrench className="h-5 w-5" />,
      cards: [
        {
          title: "Hand Tools",
          color: "blue",
          items: [
            "Screwdrivers, spanners, and pliers",
            "Wire strippers and crimping tools",
            "Voltage testers and multimeters",
            "Socket sets and allen keys",
            "Torque wrenches for terminals",
            "Specialist electrical hand tools"
          ]
        },
        {
          title: "Power Tools",
          color: "green",
          items: [
            "Drills and SDS hammers",
            "Angle grinders and cutting discs", 
            "Jigsaw and reciprocating saws",
            "Cordless drivers and impacts",
            "Cable pulling equipment",
            "Conduit bending machines"
          ]
        },
        {
          title: "Testing Equipment",
          color: "orange",
          items: [
            "Installation testers (17th/18th edition)",
            "PAT testing equipment",
            "Insulation resistance testers",
            "Earth fault loop impedance testers",
            "RCD testers and proving units",
            "Calibration certificates annually"
          ]
        },
        {
          title: "Consumables",
          color: "purple",
          items: [
            "Cable and flex of various sizes",
            "Switches, sockets, and accessories",
            "Screws, rawl plugs, and fixings",
            "Cable ties and marking labels",
            "Junction boxes and connectors",
            "Fuses, MCBs, and RCDs"
          ]
        },
        {
          title: "Storage & Organisation",
          color: "yellow",
          items: [
            "Tool bags and storage cases",
            "Van racking and drawer systems",
            "Parts bins and component storage",
            "Tool security and locks",
            "Workshop storage solutions",
            "Inventory management systems"
          ]
        },
        {
          title: "Maintenance & Insurance",
          color: "red",
          items: [
            "Annual tool insurance policies",
            "Equipment repair and servicing",
            "Battery replacements and chargers",
            "Tool theft and loss coverage",
            "Professional indemnity for testing",
            "Equipment depreciation schedules"
          ]
        }
      ]
    },
    {
      title: "Home Office Costs",
      icon: <Home className="h-5 w-5" />,
      cards: [
        {
          title: "Simplified Expenses",
          color: "blue",
          items: [
            "£6 per week for 25+ hours use",
            "£4 per week for 101-200 hours/month",
            "£2 per week for 51-100 hours/month",
            "No receipts required for this method",
            "Covers heating, lighting, and utilities",
            "Cannot claim other home office costs"
          ]
        },
        {
          title: "Actual Cost Method",
          color: "green",
          items: [
            "Calculate office area percentage",
            "Proportion of utility bills",
            "Home insurance business use",
            "Council tax business rates",
            "Mortgage interest (if applicable)",
            "Cleaning and maintenance costs"
          ]
        },
        {
          title: "Office Equipment",
          color: "orange",
          items: [
            "Computer and laptop purchases",
            "Printer, scanner, and consumables",
            "Office furniture and chairs",
            "Filing systems and storage",
            "Lighting and electrical equipment",
            "Safety equipment and signage"
          ]
        },
        {
          title: "Communication Costs",
          color: "purple",
          items: [
            "Business telephone line rental",
            "Mobile phone contracts and calls",
            "Internet broadband packages",
            "Professional answering services",
            "Video conferencing subscriptions",
            "Business communication apps"
          ]
        },
        {
          title: "Software & Subscriptions",
          color: "yellow",
          items: [
            "Design and calculation software",
            "Accounting and invoicing systems",
            "Cloud storage and backup services",
            "Professional development courses",
            "Trade publication subscriptions",
            "Online training platforms"
          ]
        },
        {
          title: "Documentation Requirements",
          color: "red",
          items: [
            "Floor area measurements and plans",
            "Time logs for home office use",
            "Utility bill copies and calculations",
            "Equipment purchase receipts",
            "Home insurance policy details",
            "Business use percentage records"
          ]
        }
      ]
    },
    {
      title: "Professional Services",
      icon: <Receipt className="h-5 w-5" />,
      cards: [
        {
          title: "Accounting & Legal",
          color: "blue",
          items: [
            "Annual accountancy fees",
            "Bookkeeping and payroll services",
            "Tax advice and planning",
            "Legal consultation and contracts",
            "Debt collection services",
            "Employment law advice"
          ]
        },
        {
          title: "Insurance Premiums",
          color: "green",
          items: [
            "Public liability insurance",
            "Professional indemnity cover",
            "Employers' liability insurance",
            "Tool and equipment insurance",
            "Motor trade insurance",
            "Income protection policies"
          ]
        },
        {
          title: "Training & Certification",
          color: "orange",
          items: [
            "18th Edition course updates",
            "Part P certification costs",
            "PAT testing qualifications",
            "Health and safety training",
            "Manufacturer product training",
            "CPD and continuing education"
          ]
        },
        {
          title: "Professional Memberships",
          color: "purple",
          items: [
            "Trade association membership",
            "Professional body registration",
            "Competent person scheme fees",
            "Industry certification renewals",
            "Union membership subscriptions",
            "Networking group participation"
          ]
        },
        {
          title: "Banking & Finance",
          color: "yellow",
          items: [
            "Business bank account charges",
            "Card machine rental and fees",
            "Loan interest on business borrowing",
            "Overdraft fees and charges",
            "Currency exchange costs",
            "Financial advisory services"
          ]
        },
        {
          title: "Marketing & Advertising",
          color: "red",
          items: [
            "Website design and hosting",
            "Online advertising campaigns",
            "Business cards and stationery",
            "Vehicle signage and branding",
            "Trade directory listings",
            "Photography and promotional materials"
          ]
        }
      ]
    },
    {
      title: "Digital Tracking Systems",
      icon: <Smartphone className="h-5 w-5" />,
      cards: [
        {
          title: "Expense Tracking Apps",
          color: "blue",
          items: [
            "QuickBooks Self-Employed",
            "Xero expense management",
            "Receipt Bank photo capture",
            "Sage Business Cloud Expenses",
            "FreeAgent mobile app",
            "Expensify for business travel"
          ]
        },
        {
          title: "Mileage Tracking",
          color: "green",
          items: [
            "MileIQ automatic tracking",
            "TripLog GPS recording",
            "Everlance business mileage",
            "SherpaShare expense tracker",
            "Manual logbook alternatives",
            "Integration with accounting software"
          ]
        },
        {
          title: "Banking Integration",
          color: "orange",
          items: [
            "Open Banking connections",
            "Automatic transaction categorisation",
            "Bank feed reconciliation",
            "Real-time expense monitoring",
            "Duplicate transaction detection",
            "Multi-account consolidation"
          ]
        },
        {
          title: "Invoice Management",
          color: "purple",
          items: [
            "Digital invoice processing",
            "Supplier payment tracking",
            "Purchase order systems",
            "Approval workflow setup",
            "Budget monitoring alerts",
            "Cost centre allocation"
          ]
        },
        {
          title: "Cloud Storage",
          color: "yellow",
          items: [
            "Receipt and document backup",
            "Searchable expense archives",
            "Team collaboration features",
            "Version control systems",
            "Automatic data synchronisation",
            "Secure data encryption"
          ]
        },
        {
          title: "Reporting Features",
          color: "red",
          items: [
            "Real-time expense dashboards",
            "Tax year summary reports",
            "Category breakdown analysis",
            "Profit and loss integration",
            "Budget vs actual comparisons",
            "Custom reporting templates"
          ]
        }
      ]
    },
    {
      title: "Tax Optimisation Strategies",
      icon: <Calculator className="h-5 w-5" />,
      cards: [
        {
          title: "Annual Allowances",
          color: "blue",
          items: [
            "£1,000 trading allowance benefit",
            "Annual Investment Allowance limits",
            "Capital allowances on equipment",
            "Research and development credits",
            "Energy efficiency incentives",
            "Electric vehicle benefits"
          ]
        },
        {
          title: "Timing Strategies",
          color: "green",
          items: [
            "Year-end equipment purchases",
            "Expense timing optimisation",
            "Income smoothing techniques",
            "Capital vs revenue expenditure",
            "Pre-payment of annual costs",
            "Seasonal cash flow planning"
          ]
        },
        {
          title: "Business Structure",
          color: "orange",
          items: [
            "Sole trader vs limited company",
            "IR35 compliance considerations",
            "Dividend vs salary optimisation",
            "Pension contribution strategies",
            "Capital gains planning",
            "Inheritance tax mitigation"
          ]
        },
        {
          title: "Record Organisation",
          color: "purple",
          items: [
            "Monthly expense reconciliation",
            "Quarterly VAT preparation",
            "Annual accounts readiness",
            "Audit trail maintenance",
            "Document retention policies",
            "Digital backup strategies"
          ]
        },
        {
          title: "Professional Advice",
          color: "yellow",
          items: [
            "Regular accountant consultations",
            "Tax planning meetings",
            "Business structure reviews",
            "Compliance health checks",
            "Investment opportunity analysis",
            "Risk assessment procedures"
          ]
        },
        {
          title: "Common Pitfalls",
          color: "red",
          items: [
            "Mixed business/personal expenses",
            "Inadequate documentation",
            "Missing deadline penalties",
            "Incorrect expense categorisation",
            "Overlooked allowable costs",
            "Poor cash flow management"
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
              <div>
                <div className="text-lg font-bold text-white">{metric.data}</div>
                <div className="text-xs text-muted-foreground leading-tight">{metric.metric}</div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed px-1">{metric.detail}</p>
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
              <span className="text-elec-yellow font-semibold">{section.title}</span>
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
