import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  PoundSterling, 
  Calculator, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Users,
  Clock,
  FileText,
  Lightbulb,
  BarChart3,
  Zap,
  Shield,
  CheckCircle,
  Brain,
  Calendar,
  Plus,
  MapPin,
  Building,
  Smartphone,
  Eye,
  Scale,
  Award,
  Heart,
  Settings,
  Timer,
  LineChart,
  Star,
  Crown,
  Briefcase,
  BookOpen,
  DollarSign,
  Percent,
  Network,
  ShieldCheck
} from "lucide-react";

export const PricingStrategiesTab = () => {
  const isMobile = useIsMobile();

  // Pricing metrics matching the Growth Strategies pattern
  const pricingMetrics = [
    {
      metric: "Average Hourly Rate",
      data: "£45-65/hour nationally",
      icon: <PoundSterling className="h-5 w-5 text-elec-yellow" />,
      detail: "With regional variations and specialisation premiums"
    },
    {
      metric: "Profit Margin Target",
      data: "25-35% sustainable margin",
      icon: <Target className="h-5 w-5 text-blue-400" />,
      detail: "Including overheads and competitive positioning"
    },
    {
      metric: "Quote Win Rate",
      data: "65-75% conversion target",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      detail: "Balanced pricing for optimal success rates"
    },
    {
      metric: "Revenue Growth",
      data: "£80-150k annual increase",
      icon: <BarChart3 className="h-5 w-5 text-purple-400" />,
      detail: "Through strategic pricing optimisation"
    }
  ];

  const pricingStrategies = [
    {
      id: "cost-plus-strategy",
      title: "Cost-Plus Pricing Strategy",
      timeline: "1-3 months to implement",
      description: "Build sustainable pricing based on true costs plus desired profit margin",
      components: [
        "Complete cost analysis and breakdown",
        "Overhead calculation and allocation",
        "Profit margin determination",
        "Pricing calculator development",
        "Quote template standardisation"
      ],
      implementation: [
        {
          phase: "Cost Analysis (2-4 weeks)",
          tasks: [
            "Calculate hourly labour costs including NI, pension, and benefits",
            "Determine vehicle costs per mile including depreciation",
            "Assess tool and equipment depreciation and maintenance costs",
            "Calculate overhead allocation (insurance, rent, admin, marketing)"
          ]
        },
        {
          phase: "Pricing Structure Development (2-4 weeks)",
          tasks: [
            "Set profit margin targets based on business goals and market position",
            "Create pricing tiers for different service complexities",
            "Develop emergency and out-of-hours pricing premiums",
            "Build quote calculator with all cost components included"
          ]
        },
        {
          phase: "Implementation & Testing (4-8 weeks)",
          tasks: [
            "Apply new pricing to 10-20 quotes and monitor results",
            "Train team on cost justification and value communication",
            "Refine pricing based on customer feedback and win rates",
            "Document pricing policies and create customer-facing explanations"
          ]
        }
      ],
      ukSpecific2025: [
        "National Insurance increase impact on labour costs",
        "Fuel cost volatility affecting travel pricing",
        "Material cost inflation requiring quarterly reviews",
        "Apprenticeship Levy considerations in pricing structure"
      ],
      investment: "£2,000-5,000 for systems and training",
      roi: "10-25% margin improvement",
      riskLevel: "Low risk with predictable outcomes"
    },
    {
      id: "value-based-pricing",
      title: "Value-Based Pricing Strategy",
      timeline: "3-6 months to master",
      description: "Price based on customer value received rather than just costs incurred",
      components: [
        "Customer value assessment techniques",
        "Benefit quantification methods",
        "Premium service positioning",
        "Value communication skills",
        "Customer education strategies"
      ],
      implementation: [
        {
          phase: "Value Analysis (4-6 weeks)",
          tasks: [
            "Identify unique value propositions and competitive advantages",
            "Quantify customer benefits (safety, compliance, efficiency, reliability)",
            "Research customer willingness to pay for premium services",
            "Develop value-based service packages and offerings"
          ]
        },
        {
          phase: "Sales Process Development (6-8 weeks)",
          tasks: [
            "Train team on consultative selling and value communication",
            "Create benefit-focused marketing materials and case studies",
            "Develop ROI calculators for customers showing value delivered",
            "Implement customer feedback systems to validate value perception"
          ]
        },
        {
          phase: "Market Testing (8-12 weeks)",
          tasks: [
            "Test value-based pricing with selected customer segments",
            "Monitor customer response and adjust value communication",
            "Document successful value propositions and refine messaging",
            "Scale successful approaches across all customer interactions"
          ]
        }
      ],
      ukSpecific2025: [
        "Building Safety Act compliance creating additional value",
        "Energy efficiency requirements driving premium service demand",
        "Smart home technology adoption creating value opportunities",
        "Post-pandemic safety and reliability concerns increasing value perception"
      ],
      investment: "£5,000-15,000 for training and materials",
      roi: "20-50% price premium potential",
      riskLevel: "Medium risk requiring sales skills development"
    },
    {
      id: "dynamic-pricing",
      title: "Dynamic Pricing Strategy",
      timeline: "2-4 months implementation",
      description: "Adjust pricing based on demand, urgency, and market conditions",
      components: [
        "Demand forecasting systems",
        "Urgency-based pricing tiers",
        "Seasonal pricing adjustments",
        "Market monitoring tools",
        "Automated pricing triggers"
      ],
      implementation: [
        {
          phase: "Market Analysis (3-4 weeks)",
          tasks: [
            "Analyse historical demand patterns and seasonal variations",
            "Identify peak and off-peak periods for different services",
            "Research competitor pricing patterns and market responses",
            "Map customer urgency levels to willingness to pay premiums"
          ]
        },
        {
          phase: "System Development (4-6 weeks)",
          tasks: [
            "Create dynamic pricing matrix based on demand and urgency",
            "Implement booking system with real-time pricing adjustments",
            "Develop clear pricing communication for customers",
            "Set up monitoring systems for pricing effectiveness tracking"
          ]
        },
        {
          phase: "Optimisation (6-8 weeks)",
          tasks: [
            "Monitor pricing performance and customer acceptance rates",
            "Adjust pricing triggers based on actual demand patterns",
            "Train customer service team on pricing explanation techniques",
            "Refine pricing model based on profitability and market feedback"
          ]
        }
      ],
      ukSpecific2025: [
        "Winter heating system failures creating emergency demand spikes",
        "Summer solar installation peak season opportunities",
        "Economic uncertainty affecting customer price sensitivity",
        "Supply chain disruptions creating material cost volatility"
      ],
      investment: "£3,000-8,000 for systems and software",
      roi: "15-30% revenue optimisation",
      riskLevel: "Medium risk requiring careful customer communication"
    },
    {
      id: "competitive-pricing",
      title: "Competitive Pricing Intelligence",
      timeline: "Ongoing monthly process",
      description: "Strategic pricing based on comprehensive market intelligence and positioning",
      components: [
        "Competitor pricing monitoring",
        "Market positioning analysis",
        "Service differentiation strategies",
        "Price point optimisation",
        "Competitive advantage identification"
      ],
      implementation: [
        {
          phase: "Market Intelligence (2-3 weeks)",
          tasks: [
            "Map all direct competitors within 25-mile radius",
            "Gather pricing data through mystery shopping and quote requests",
            "Analyse competitor service offerings and value propositions",
            "Identify market gaps and pricing opportunities"
          ]
        },
        {
          phase: "Positioning Strategy (3-4 weeks)",
          tasks: [
            "Define unique market position relative to competitors",
            "Determine optimal pricing strategy (premium, competitive, value)",
            "Develop competitive response strategies and pricing flexibility",
            "Create differentiation strategies to justify pricing position"
          ]
        },
        {
          phase: "Monitoring & Adjustment (Ongoing)",
          tasks: [
            "Monitor competitor pricing changes and market responses",
            "Adjust pricing strategy based on competitive landscape shifts",
            "Track win/loss rates against specific competitors",
            "Continuously refine competitive positioning and messaging"
          ]
        }
      ],
      ukSpecific2025: [
        "Brexit-related labour shortages affecting competitor capacity",
        "Regional price variations due to economic disparities",
        "New technology adoption creating competitive advantages",
        "Government grants affecting competitor pricing strategies"
      ],
      investment: "£1,000-3,000 for research and monitoring tools",
      roi: "10-20% market share improvement",
      riskLevel: "Low risk with regular monitoring required"
    }
  ];

  const pricingBenchmarks = [
    {
      category: "Regional Pricing Standards",
      benchmarks: [
        { metric: "London Premium", target: "+25-35%", current: "£65-85/hour average" },
        { metric: "South East", target: "+15-25%", current: "£55-70/hour average" },
        { metric: "Northern England", target: "Baseline", current: "£40-55/hour average" },
        { metric: "Rural Areas", target: "-10-20%", current: "£35-45/hour average" }
      ]
    },
    {
      category: "Service Type Premiums",
      benchmarks: [
        { metric: "Emergency Call-out", target: "+50-100%", current: "£75-120/hour typical" },
        { metric: "Commercial Work", target: "+20-40%", current: "£55-80/hour average" },
        { metric: "Specialist Installation", target: "+30-60%", current: "£60-90/hour range" },
        { metric: "Maintenance Contracts", target: "10-20% discount", current: "£35-50/hour ongoing" }
      ]
    }
  ];

  const competitiveAdvantages = [
    {
      title: "Specialisation Premium",
      description: "Command higher rates through expertise and niche positioning",
      advantages: [
        "Smart home automation and IoT systems installation",
        "Commercial renewable energy and EV charging systems", 
        "Emergency electrical services and rapid response",
        "Industrial maintenance and breakdown specialists"
      ],
      impact: "Premium pricing 25-50% above general electrical work"
    },
    {
      title: "Service Excellence Differentiation",
      description: "Justify premium pricing through superior service delivery",
      advantages: [
        "Comprehensive warranties and satisfaction guarantees",
        "Real-time project updates and transparent communication",
        "Professional certifications and continuing education",
        "24/7 customer support and emergency availability"
      ],
      impact: "Customer retention increase 40-60% and referral growth"
    },
    {
      title: "Technology-Enhanced Services",
      description: "Use technology to deliver superior value and efficiency",
      advantages: [
        "Thermal imaging and advanced diagnostic equipment",
        "Digital project management and customer portals",
        "Drone inspections for high-access electrical work",
        "IoT monitoring and predictive maintenance services"
      ],
      impact: "Efficiency gains 20-35% enabling competitive pricing"
    }
  ];

  const performanceMetrics = [
    {
      category: "Pricing Performance",
      kpis: [
        "Quote-to-job conversion rates by price range",
        "Average job value and profit margin trends",
        "Customer price objection frequency and responses",
        "Pricing strategy ROI and revenue impact measurement"
      ]
    },
    {
      category: "Market Position",
      kpis: [
        "Competitive pricing position and market share",
        "Premium service uptake and customer satisfaction",
        "Brand perception and value proposition effectiveness",
        "Customer lifetime value and repeat business rates"
      ]
    },
    {
      category: "Financial Health",
      kpis: [
        "Gross profit margin stability and improvement",
        "Cash flow impact of pricing strategy changes",
        "Working capital efficiency and payment terms",
        "Cost structure optimisation and overhead allocation"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
        <TrendingUp className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-yellow">
          Strategic pricing optimisation can increase profit margins by 15-35% while maintaining competitive market position.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {pricingMetrics.map((metric, index) => (
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
        {pricingStrategies.map((strategy) => (
          <MobileAccordionItem key={strategy.id} value={strategy.id}>
            <MobileAccordionTrigger icon={
              strategy.id === "cost-plus-strategy" ? <Calculator className="h-5 w-5 text-blue-400" /> :
              strategy.id === "value-based-pricing" ? <Target className="h-5 w-5 text-green-400" /> :
              strategy.id === "dynamic-pricing" ? <TrendingUp className="h-5 w-5 text-purple-400" /> :
              <Eye className="h-5 w-5 text-yellow-400" />
            }>
              {strategy.title}
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                <div className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.title}</h4>
                      <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {strategy.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{strategy.description}</p>
                  </div>

                  <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                    <div className="flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-muted-foreground" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{strategy.investment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{strategy.roi}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{strategy.riskLevel}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Components</h5>
                    <ul className="space-y-1">
                      {strategy.components.map((component, compIndex) => (
                        <li key={compIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Timeline</h5>
                    <div className="space-y-3">
                      {strategy.implementation.map((phase, phaseIndex) => (
                        <div key={phaseIndex} className="border-l-2 border-elec-yellow/30 pl-3 space-y-1">
                          <h6 className={`font-medium text-elec-yellow ${isMobile ? 'text-xs' : 'text-sm'}`}>{phase.phase}</h6>
                          <ul className="space-y-0.5">
                            {phase.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-start gap-1`}>
                                <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 shrink-0" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className={`font-medium text-yellow-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>UK Market Opportunities 2025</h5>
                    <ul className="space-y-1">
                      {strategy.ukSpecific2025.map((opportunity, oppIndex) => (
                        <li key={oppIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-yellow-200 flex items-center gap-1`}>
                          <Zap className="h-3 w-3 text-elec-yellow shrink-0" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        ))}
      </MobileAccordion>

      {/* Pricing Benchmarks Section */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray/20 to-elec-gray/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            UK Pricing Benchmarks & Regional Standards
          </CardTitle>
          <CardDescription>
            Compare your pricing against current UK electrical industry standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {pricingBenchmarks.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h4 className="font-semibold text-elec-yellow">{category.category}</h4>
                <div className="space-y-3">
                  {category.benchmarks.map((benchmark, benchmarkIndex) => (
                    <div key={benchmarkIndex} className="border border-blue-500/20 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-medium text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {benchmark.metric}
                        </span>
                        <Badge variant="outline" className="text-green-300 border-green-400/30">
                          {benchmark.target}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-muted-foreground" />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                          {benchmark.current}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Advantages Section */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray/20 to-elec-gray/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-elec-yellow" />
            Pricing Competitive Advantages
          </CardTitle>
          <CardDescription>
            Strategies to justify premium pricing and differentiate your services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitiveAdvantages.map((advantage, advantageIndex) => (
              <div key={advantageIndex} className="border border-purple-500/20 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className={`font-semibold text-purple-300 ${isMobile ? 'text-sm' : 'text-base'}`}>
                      {advantage.title}
                    </h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mt-1`}>
                      {advantage.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-purple-300 border-purple-400/30 ml-2">
                    <Star className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
                
                <div className="grid gap-2">
                  {advantage.advantages.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <Award className="h-3 w-3 text-purple-400 shrink-0" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 pt-2 border-t border-purple-500/20">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-300 font-medium`}>
                    Impact: {advantage.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Measurement Section */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray/20 to-elec-gray/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Pricing Performance Measurement
          </CardTitle>
          <CardDescription>
            Key metrics to track pricing strategy success and optimisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {performanceMetrics.map((metricCategory, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h4 className="font-semibold text-elec-yellow flex items-center gap-2">
                  {metricCategory.category === "Pricing Performance" && <PoundSterling className="h-4 w-4" />}
                  {metricCategory.category === "Market Position" && <Eye className="h-4 w-4" />}
                  {metricCategory.category === "Financial Health" && <Heart className="h-4 w-4" />}
                  {metricCategory.category}
                </h4>
                <div className="space-y-2">
                  {metricCategory.kpis.map((kpi, kpiIndex) => (
                    <div key={kpiIndex} className="flex items-start gap-2 p-2 bg-elec-gray/30 rounded-lg">
                      <CheckCircle className="h-3 w-3 text-green-400 shrink-0 mt-0.5" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                        {kpi}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 30-Day Pricing Action Plan */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray/20 to-elec-gray/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            30-Day Pricing Optimisation Plan
          </CardTitle>
          <CardDescription>
            Immediate steps to improve your pricing strategy and profitability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-300">Week 1-2: Analysis & Foundation</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Timer className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Complete comprehensive cost analysis and overhead calculation
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Calculator className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Research competitor pricing and market positioning
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Set profit margin targets and pricing objectives
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-300">Week 3-4: Implementation & Testing</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Settings className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Implement new pricing structure and quote templates
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Train team on value communication and pricing justification
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Monitor quote success rates and customer feedback
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};