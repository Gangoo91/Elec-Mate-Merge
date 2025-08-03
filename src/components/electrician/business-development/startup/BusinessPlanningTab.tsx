
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Calculator, 
  TrendingUp, 
  BarChart3, 
  Target, 
  PoundSterling, 
  Users, 
  MapPin, 
  Lightbulb, 
  CheckCircle, 
  Building, 
  Clock,
  Award,
  FileText,
  AlertCircle
} from "lucide-react";

const BusinessPlanningTab = () => {
  const isMobile = useIsMobile();

  // Key business planning metrics for electrical contractors
  const planningMetrics = [
    {
      metric: "Average Startup Cost",
      data: "£15,000-35,000 initial investment",
      icon: <PoundSterling className="h-5 w-5 text-blue-400" />,
      detail: "Including tools, van, insurance, and working capital"
    },
    {
      metric: "Break-even Timeline", 
      data: "6-12 months with proper planning",
      icon: <Clock className="h-5 w-5 text-elec-yellow" />,
      detail: "Depends on local market and service focus"
    },
    {
      metric: "Market Success Rate",
      data: "85% survival with business plan",
      icon: <Target className="h-5 w-5 text-green-400" />,
      detail: "Structured planning reduces failure risk significantly"
    },
    {
      metric: "Average Monthly Revenue",
      data: "£8,000-15,000 in Year 1",
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      detail: "Based on UK electrical contractor benchmarks"
    }
  ];

  const marketResearchStrategy = [
    {
      strategy: "Local Market Analysis",
      timeline: "Week 1-2",
      description: "Comprehensive assessment of your service area and competition landscape",
      components: [
        "Map competitor locations and service areas using Google Maps",
        "Research pricing through mystery shopping and quote requests", 
        "Analyse local housing stock and commercial property development",
        "Study planning applications for new builds requiring electrical work"
      ],
      businessImpact: "Identify pricing opportunities and service gaps worth £2,000-5,000 monthly revenue",
      kpis: ["Competitor density per mile", "Average pricing per job type", "Market demand score"]
    },
    {
      strategy: "Customer Segmentation",
      timeline: "Week 2-3", 
      description: "Define target customer groups and understand their specific needs",
      components: [
        "Domestic customers: homeowners, landlords, property developers",
        "Commercial clients: offices, retail units, small industrial sites",
        "Emergency services: 24/7 callout and fault finding",
        "Specialist services: EV charging, solar installations, smart homes"
      ],
      businessImpact: "Focus resources on highest-value customers and premium services",
      kpis: ["Customer lifetime value", "Service profitability", "Repeat business rate"]
    },
    {
      strategy: "Revenue Forecasting",
      timeline: "Week 3-4",
      description: "Project realistic income based on market conditions and capacity",
      components: [
        "Calculate billable hours per week based on travel and admin time",
        "Research average job values for different service types",
        "Factor in seasonal variations (heating/lighting in winter)",
        "Plan for business growth and additional capacity needs"
      ],
      businessImpact: "Accurate forecasting prevents cash flow problems and guides pricing",
      kpis: ["Monthly revenue target", "Capacity utilisation %", "Average job value"]
    }
  ];

  const financialPlanning = [
    {
      category: "Essential Startup Costs",
      investments: [
        { item: "Professional tool kit", amount: "£3,000-8,000", necessity: "Essential" },
        { item: "Test equipment (multimeters, testers)", amount: "£1,500-3,000", necessity: "Essential" },
        { item: "Commercial vehicle", amount: "£8,000-20,000", necessity: "Essential" },
        { item: "Public liability insurance", amount: "£800-2,500", necessity: "Essential" }
      ],
      totalRange: "£13,300-33,500"
    },
    {
      category: "Business Setup Costs",
      investments: [
        { item: "Company registration & legal", amount: "£100-500", necessity: "Essential" },
        { item: "Professional qualifications", amount: "£2,000-4,000", necessity: "Essential" },
        { item: "Scheme membership (NICEIC/NAPIT)", amount: "£500-800", necessity: "Essential" },
        { item: "Marketing & website", amount: "£1,000-3,000", necessity: "Important" }
      ],
      totalRange: "£3,600-8,300"
    },
    {
      category: "Working Capital Reserve",
      investments: [
        { item: "3-month operating expenses", amount: "£6,000-12,000", necessity: "Critical" },
        { item: "Material stock & supplies", amount: "£2,000-5,000", necessity: "Important" },
        { item: "Emergency fund", amount: "£3,000-8,000", necessity: "Recommended" },
        { item: "Growth investment", amount: "£2,000-5,000", necessity: "Optional" }
      ],
      totalRange: "£13,000-30,000"
    }
  ];

  const businessStructure = [
    {
      structure: "Sole Trader Setup",
      timeline: "1-2 weeks",
      description: "Simplest business structure for individual electrical contractors",
      components: [
        "Register with HMRC for self-employment within 3 months",
        "Choose business name and check availability",
        "Set up business bank account for financial separation",
        "Obtain business insurance and professional indemnity cover"
      ],
      businessImpact: "Quick setup, full control, but personal liability for business debts",
      considerations: ["Personal liability", "Income tax on profits", "Simple accounting", "No corporation tax"]
    },
    {
      structure: "Limited Company Formation",
      timeline: "2-4 weeks",
      description: "Professional business structure offering liability protection",
      components: [
        "Register company name and directors with Companies House",
        "Issue share certificates and maintain statutory registers",
        "Register for corporation tax and VAT if applicable",
        "Set up business banking and accounting systems"
      ],
      businessImpact: "Limited liability protection and potential tax advantages for higher earners",
      considerations: ["Limited liability", "Corporation tax", "More complex accounting", "Professional image"]
    },
    {
      structure: "Partnership Formation",
      timeline: "2-3 weeks", 
      description: "Share business ownership and responsibilities with trusted partners",
      components: [
        "Draft partnership agreement covering profit sharing",
        "Register partnership with HMRC for tax purposes",
        "Define roles, responsibilities and decision-making processes",
        "Establish procedures for partnership changes and exits"
      ],
      businessImpact: "Shared resources and expertise but joint liability for partner actions",
      considerations: ["Shared liability", "Partnership tax", "Shared profits", "Joint decisions"]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Calculator className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Comprehensive business planning increases success rates by 300% and reduces time-to-profitability by 40%.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {planningMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="market-research">
          <MobileAccordionTrigger icon={<BarChart3 className="h-5 w-5 text-blue-400" />}>
            Market Research & Analysis
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {marketResearchStrategy.map((strategy, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.strategy}</h4>
                      <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {strategy.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{strategy.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Research Components</h5>
                    <ul className="space-y-1">
                      {strategy.components.map((component, compIndex) => (
                        <li key={compIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{strategy.businessImpact}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Performance Indicators</h5>
                    <div className="flex flex-wrap gap-1">
                      {strategy.kpis.map((kpi, kpiIndex) => (
                        <Badge key={kpiIndex} variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {kpi}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="financial-planning">
          <MobileAccordionTrigger icon={<PoundSterling className="h-5 w-5 text-green-400" />}>
            Financial Planning & Investment
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {financialPlanning.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-green-300 ${isMobile ? 'text-sm' : 'text-base'} border-b border-green-500/20 pb-1`}>
                    {category.category}
                  </h4>
                  <div className="border border-green-500/20 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Investment Breakdown</h5>
                      <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {category.totalRange}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {category.investments.map((investment, invIndex) => (
                        <div key={invIndex} className="flex items-center justify-between p-2 bg-green-500/5 border border-green-500/20 rounded">
                          <div className="flex-1">
                            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{investment.item}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {investment.necessity}
                            </Badge>
                            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white font-medium`}>{investment.amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="business-structure">
          <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-purple-400" />}>
            Business Structure & Legal Setup
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {businessStructure.map((structure, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{structure.structure}</h4>
                      <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {structure.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{structure.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Setup Requirements</h5>
                    <ul className="space-y-1">
                      {structure.components.map((component, compIndex) => (
                        <li key={compIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                    <h5 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{structure.businessImpact}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-amber-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Considerations</h5>
                    <div className="flex flex-wrap gap-1">
                      {structure.considerations.map((consideration, consIndex) => (
                        <Badge key={consIndex} variant="outline" className={`text-amber-300 border-amber-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {consideration}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="planning-checklist">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-orange-400" />}>
            Planning Checklist & Milestones
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                <h4 className={`font-medium text-orange-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Essential Planning Tasks</h4>
                <ul className="space-y-2">
                  {[
                    "Complete comprehensive market research in target area",
                    "Define service offerings and competitive pricing strategy", 
                    "Calculate detailed startup and 12-month operating costs",
                    "Choose business structure and complete legal registration",
                    "Secure appropriate insurance coverage and professional memberships",
                    "Develop marketing strategy and customer acquisition plan"
                  ].map((task, index) => (
                    <li key={index} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200 flex items-center gap-2 p-2 rounded bg-orange-500/10 border border-orange-500/20`}>
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className={`font-medium text-orange-300 ${isMobile ? 'text-sm' : 'text-base'} mb-3`}>Success Milestones</h4>
                <div className="space-y-3">
                  {[
                    { milestone: "First month revenue target", target: "£3,000-5,000" },
                    { milestone: "Break-even achievement", target: "Month 6-12" },
                    { milestone: "Customer acquisition goal", target: "10-15 regular clients" },
                    { milestone: "Market share objective", target: "5-10% local market" },
                    { milestone: "Profit margin target", target: "25-35% gross margin" },
                    { milestone: "Growth milestone", target: "First employee/subcontractor" }
                  ].map((item, index) => (
                    <div key={index} className={`${isMobile ? 'text-center py-3' : 'flex items-center justify-between py-2'}`}>
                      <div className={`${isMobile ? 'space-y-2' : ''}`}>
                        <div className={`${isMobile ? 'text-sm font-medium' : 'text-sm'} text-orange-200 ${isMobile ? 'leading-relaxed' : ''}`}>
                          {item.milestone}
                        </div>
                        <Badge variant="outline" className={`text-orange-300 border-orange-400/30 ${isMobile ? 'text-sm' : 'text-sm'} font-medium ${isMobile ? 'inline-block' : ''}`}>
                          {item.target}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default BusinessPlanningTab;

