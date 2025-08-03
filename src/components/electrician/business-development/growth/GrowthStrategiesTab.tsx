import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";
import { 
  TrendingUp, 
  Target, 
  Users, 
  MapPin, 
  Building, 
  DollarSign, 
  Clock, 
  BarChart3,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Calculator,
  Globe,
  Zap,
  Shield,
  Smartphone,
  Leaf,
  PiggyBank,
  FileText,
  UserCheck,
  Settings
} from "lucide-react";

export const GrowthStrategiesTab = () => {
  const { isMobile } = useMobileEnhanced();

  const growthMetrics = [
    { metric: "Annual Revenue Growth", target: "15-25%", industry: "12%", status: "good" },
    { metric: "Customer Acquisition Rate", target: "8-12/month", industry: "6/month", status: "excellent" },
    { metric: "Employee Productivity", target: "£180k/employee", industry: "£150k", status: "good" },
    { metric: "Profit Margin", target: "18-25%", industry: "15%", status: "target" }
  ];

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "success";
      case "good": return "gold";
      case "target": return "yellow";
      default: return "outline";
    }
  };

  const growthStrategies = [
    {
      id: "market-expansion",
      title: "Market Expansion Strategy",
      icon: <MapPin className="h-5 w-5" />,
      color: "bg-blue-500/10 border-blue-500/20",
      description: "Expand into new geographical areas and market segments",
      timeline: "6-18 months",
      investment: "£15,000 - £50,000",
      roi: "150-300%",
      riskLevel: "Medium",
      components: [
        "Market Research & Analysis",
        "Geographic Expansion Planning", 
        "Service Diversification",
        "Customer Segmentation",
        "Competitive Positioning"
      ],
      implementation: [
        {
          phase: "Research Phase (1-2 months)",
          tasks: [
            "Analyse local market demand and competition",
            "Identify underserved geographical areas",
            "Research commercial vs domestic opportunities",
            "Assess rural and urban market potential"
          ]
        },
        {
          phase: "Planning Phase (2-3 months)",
          tasks: [
            "Develop expansion strategy and timeline",
            "Calculate investment requirements",
            "Plan marketing and brand presence",
            "Establish local partnerships"
          ]
        },
        {
          phase: "Implementation Phase (3-12 months)",
          tasks: [
            "Launch targeted marketing campaigns",
            "Establish local business relationships",
            "Hire or relocate staff to new areas",
            "Monitor performance and adjust strategy"
          ]
        }
      ],
      ukSpecific2025: [
        "Post-Brexit opportunities in domestic manufacturing",
        "Green energy infrastructure development",
        "Rural broadband and EV charging networks",
        "Government infrastructure investment programmes"
      ],
      successMetrics: [
        "New customer acquisition in target areas",
        "Revenue growth from new markets",
        "Market share increase",
        "Brand recognition improvement"
      ],
      tips: [
        "Start with adjacent geographical areas to minimise risk",
        "Partner with local businesses for faster market entry",
        "Leverage digital marketing for cost-effective reach",
        "Focus on one new market segment at a time"
      ]
    },
    {
      id: "team-scaling",
      title: "Strategic Team Scaling",
      icon: <Users className="h-5 w-5" />,
      color: "bg-green-500/10 border-green-500/20",
      description: "Build and scale your workforce strategically for sustainable growth",
      timeline: "3-24 months",
      investment: "£25,000 - £100,000",
      roi: "200-400%",
      riskLevel: "Medium-High",
      components: [
        "Recruitment Strategy",
        "Training & Development",
        "Team Structure Design",
        "Performance Management",
        "Retention Planning"
      ],
      implementation: [
        {
          phase: "Planning Phase (1-2 months)",
          tasks: [
            "Assess current team capacity and skills",
            "Identify future workforce requirements",
            "Design optimal team structure",
            "Develop recruitment and training plans"
          ]
        },
        {
          phase: "Recruitment Phase (2-6 months)",
          tasks: [
            "Recruit qualified electricians and apprentices",
            "Establish subcontractor partnerships",
            "Hire specialist roles (project managers, admin)",
            "Implement robust onboarding processes"
          ]
        },
        {
          phase: "Development Phase (Ongoing)",
          tasks: [
            "Provide continuous skills training",
            "Implement performance management systems",
            "Develop career progression pathways",
            "Focus on employee retention strategies"
          ]
        }
      ],
      ukSpecific2025: [
        "Apprenticeship Levy utilisation for training",
        "Skills shortage in renewable energy sectors",
        "EU worker availability post-Brexit",
        "Government skills development programmes"
      ],
      successMetrics: [
        "Employee retention rate (target: >85%)",
        "Productivity per employee increase",
        "Skills assessment scores improvement",
        "Project delivery timeline adherence"
      ],
      tips: [
        "Invest heavily in apprenticeship programmes",
        "Create clear career progression pathways",
        "Offer competitive packages including benefits",
        "Build a strong company culture and values"
      ]
    },
    {
      id: "business-structure",
      title: "Business Structure Optimisation",
      icon: <Building className="h-5 w-5" />,
      color: "bg-purple-500/10 border-purple-500/20",
      description: "Optimise your business model and structure for efficient growth",
      timeline: "3-12 months",
      investment: "£10,000 - £30,000",
      roi: "250-500%",
      riskLevel: "Low-Medium",
      components: [
        "Legal Structure Review",
        "Process Systematisation",
        "Technology Integration",
        "Quality Management",
        "Financial Optimisation"
      ],
      implementation: [
        {
          phase: "Assessment Phase (1-2 months)",
          tasks: [
            "Review current business structure and processes",
            "Identify inefficiencies and bottlenecks",
            "Assess technology and system requirements",
            "Evaluate legal and tax implications"
          ]
        },
        {
          phase: "Design Phase (1-3 months)",
          tasks: [
            "Design optimised business processes",
            "Select and implement business systems",
            "Establish quality management procedures",
            "Create standard operating procedures"
          ]
        },
        {
          phase: "Implementation Phase (2-6 months)",
          tasks: [
            "Implement new systems and processes",
            "Train team on new procedures",
            "Monitor and refine operations",
            "Measure efficiency improvements"
          ]
        }
      ],
      ukSpecific2025: [
        "IR35 compliance for contractor relationships",
        "Making Tax Digital requirements",
        "GDPR compliance for customer data",
        "Construction Industry Scheme (CIS) optimisation"
      ],
      successMetrics: [
        "Process efficiency improvement (target: 20-30%)",
        "Customer satisfaction scores",
        "Employee productivity metrics",
        "Profit margin improvement"
      ],
      tips: [
        "Consider incorporation for tax efficiency",
        "Implement project management software",
        "Standardise all key business processes",
        "Regular process reviews and improvements"
      ]
    },
    {
      id: "financial-growth",
      title: "Financial Growth Strategy",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-yellow-500/10 border-yellow-500/20",
      description: "Strategic financial planning and investment for sustainable growth",
      timeline: "6-36 months",
      investment: "£20,000 - £150,000",
      roi: "180-350%",
      riskLevel: "Medium",
      components: [
        "Financial Planning",
        "Investment Strategy",
        "Cash Flow Management",
        "Funding Options",
        "Risk Management"
      ],
      implementation: [
        {
          phase: "Financial Assessment (1-2 months)",
          tasks: [
            "Comprehensive financial health review",
            "Cash flow analysis and forecasting",
            "Investment requirement calculation",
            "Risk assessment and mitigation planning"
          ]
        },
        {
          phase: "Funding & Investment (2-6 months)",
          tasks: [
            "Explore funding options (loans, grants, investors)",
            "Implement financial management systems",
            "Establish business credit facilities",
            "Create investment allocation strategy"
          ]
        },
        {
          phase: "Growth Execution (6-24 months)",
          tasks: [
            "Execute strategic investments",
            "Monitor financial performance",
            "Adjust strategy based on results",
            "Prepare for next growth phase"
          ]
        }
      ],
      ukSpecific2025: [
        "Government green energy grants and incentives",
        "Business rates relief opportunities",
        "R&D tax credits for innovation",
        "Export finance support post-Brexit"
      ],
      successMetrics: [
        "Revenue growth rate",
        "Profit margin improvement",
        "Cash flow stability",
        "Return on investment (ROI)"
      ],
      tips: [
        "Maintain 3-6 months cash flow reserves",
        "Diversify revenue streams to reduce risk",
        "Regular financial reviews and forecasting",
        "Consider professional financial advice"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Growth Metrics Dashboard */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            Growth Metrics Dashboard
          </CardTitle>
          <CardDescription>
            Key performance indicators for electrical business growth in 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {growthMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-elec-gray/20 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{metric.metric}</h4>
                  <Badge variant={getMetricStatusColor(metric.status)} className="text-xs">
                    {metric.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Target:</span>
                    <span className="font-medium text-elec-yellow">{metric.target}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Industry Avg:</span>
                    <span>{metric.industry}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Growth Frameworks */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Strategic Growth Frameworks
          </CardTitle>
          <CardDescription>
            Comprehensive strategies for scaling your electrical contracting business
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <MobileAccordion type="single" collapsible className="w-full">
            {growthStrategies.map((strategy) => (
              <MobileAccordionItem key={strategy.id} value={strategy.id}>
                <MobileAccordionTrigger 
                  icon={strategy.icon}
                  className={`${strategy.color} hover:${strategy.color.replace('/10', '/20')}`}
                >
                  <div className="text-left">
                    <div className="font-semibold">{strategy.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {strategy.timeline} • ROI: {strategy.roi}
                    </div>
                  </div>
                </MobileAccordionTrigger>
                
                <MobileAccordionContent>
                  <div className="p-6 space-y-6 bg-background/50">
                    {/* Strategy Overview */}
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{strategy.description}</p>
                      
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Timeline: {strategy.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calculator className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Investment: {strategy.investment}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Expected ROI: {strategy.roi}</span>
                        </div>
                      </div>

                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Risk Level: <strong>{strategy.riskLevel}</strong> - Proper planning and phased implementation recommended
                        </AlertDescription>
                      </Alert>
                    </div>

                    {/* Key Components */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Key Components
                      </h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        {strategy.components.map((component, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-elec-gray/20 rounded">
                            <CheckCircle className="h-3 w-3 text-elec-yellow shrink-0" />
                            <span className="text-sm">{component}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Implementation Timeline */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Implementation Timeline
                      </h4>
                      <div className="space-y-4">
                        {strategy.implementation.map((phase, index) => (
                          <div key={index} className="border-l-2 border-elec-yellow/30 pl-4 space-y-2">
                            <h5 className="font-medium text-elec-yellow">{phase.phase}</h5>
                            <div className="space-y-1">
                              {phase.tasks.map((task, taskIndex) => (
                                <div key={taskIndex} className="flex items-start gap-2 text-sm">
                                  <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 shrink-0" />
                                  <span>{task}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* UK-Specific 2025 Opportunities */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        UK Market Opportunities 2025
                      </h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        {strategy.ukSpecific2025.map((opportunity, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                            <Zap className="h-3 w-3 text-blue-500 shrink-0" />
                            <span className="text-sm">{opportunity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Success Metrics */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Success Metrics
                      </h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        {strategy.successMetrics.map((metric, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                            <UserCheck className="h-3 w-3 text-green-500 shrink-0" />
                            <span className="text-sm">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Success Tips */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Success Tips
                      </h4>
                      <div className="space-y-2">
                        {strategy.tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded">
                            <Lightbulb className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                            <span className="text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </MobileAccordionContent>
              </MobileAccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* 2025 UK Market Insights */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray/20 to-elec-gray/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-elec-yellow" />
            2025 UK Market Insights
          </CardTitle>
          <CardDescription>
            Key trends and opportunities shaping the electrical industry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-500" />
                Sustainability & Green Energy
              </h4>
              <div className="space-y-2 text-sm">
                <p>• Heat pump installations growing 300% annually</p>
                <p>• EV charging infrastructure expansion</p>
                <p>• Solar panel integration opportunities</p>
                <p>• Energy storage system installations</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-blue-500" />
                Digital Transformation
              </h4>
              <div className="space-y-2 text-sm">
                <p>• Smart home automation systems</p>
                <p>• IoT device installation and maintenance</p>
                <p>• Digital project management tools</p>
                <p>• Online customer service platforms</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Phase Assessment */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Business Growth Assessment
          </CardTitle>
          <CardDescription>
            Evaluate your current position and plan your next growth phase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <PiggyBank className="h-4 w-4" />
              <AlertDescription>
                <strong>Financial Health Check:</strong> Ensure 3-6 months operating capital before major expansion
              </AlertDescription>
            </Alert>
            
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                <strong>Documentation Review:</strong> Update contracts, insurance, and compliance records before scaling
              </AlertDescription>
            </Alert>
            
            <Alert>
              <Users className="h-4 w-4" />
              <AlertDescription>
                <strong>Team Capacity:</strong> Assess current workload and team efficiency before expansion
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};