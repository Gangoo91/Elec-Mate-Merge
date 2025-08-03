import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  TrendingUp, 
  Target, 
  Users, 
  MapPin, 
  Building, 
  PoundSterling, 
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
  Settings,
  ShieldCheck,
  FileCheck,
  Eye,
  Scale,
  Siren
} from "lucide-react";

export const GrowthStrategiesTab = () => {
  const isMobile = useIsMobile();

  // Growth metrics matching the pattern from other tabs
  const growthMetrics = [
    {
      metric: "Revenue Growth Target",
      data: "15-25% annually sustainable",
      icon: <TrendingUp className="h-5 w-5 text-elec-yellow" />,
      detail: "With strategic planning and market expansion"
    },
    {
      metric: "Market Expansion ROI",
      data: "150-300% return on investment",
      icon: <MapPin className="h-5 w-5 text-blue-400" />,
      detail: "Geographic and service diversification benefits"
    },
    {
      metric: "Team Scaling Efficiency",
      data: "200-400% productivity increase",
      icon: <Users className="h-5 w-5 text-green-400" />,
      detail: "Strategic workforce development and training"
    },
    {
      metric: "Business Value Growth",
      data: "£50-200k annual value increase",
      icon: <Building className="h-5 w-5 text-purple-400" />,
      detail: "Systematic business development approach"
    }
  ];

  const growthStrategies = [
    {
      id: "market-expansion",
      title: "Market Expansion Strategy",
      timeline: "6-18 months",
      description: "Expand into new geographical areas and market segments for sustainable revenue growth",
      components: [
        "Market research and competitive analysis",
        "Geographic expansion planning",
        "Service diversification strategy",
        "Customer segmentation and targeting",
        "Local partnership development"
      ],
      implementation: [
        {
          phase: "Research & Analysis (1-2 months)",
          tasks: [
            "Analyse local market demand and competition levels",
            "Identify underserved geographical areas within 50-mile radius",
            "Research commercial vs domestic market opportunities",
            "Assess rural vs urban market potential and accessibility"
          ]
        },
        {
          phase: "Strategic Planning (2-3 months)",
          tasks: [
            "Develop comprehensive expansion strategy and timeline",
            "Calculate investment requirements and expected ROI",
            "Plan targeted marketing campaigns and brand presence",
            "Establish local business partnerships and referral networks"
          ]
        },
        {
          phase: "Market Entry (3-12 months)",
          tasks: [
            "Launch targeted digital marketing campaigns",
            "Establish local business relationships and networking",
            "Hire or relocate qualified staff to new areas",
            "Monitor performance metrics and adjust strategy accordingly"
          ]
        }
      ],
      ukSpecific2025: [
        "Post-Brexit domestic manufacturing growth opportunities",
        "Government green energy infrastructure development programmes",
        "Rural broadband and EV charging network expansion",
        "Levelling Up investment in regional infrastructure projects"
      ],
      investment: "£15,000-50,000 initial investment",
      roi: "150-300% expected return",
      riskLevel: "Medium risk with proper planning"
    },
    {
      id: "team-scaling",
      title: "Strategic Team Development",
      timeline: "3-24 months",
      description: "Build and scale your workforce strategically for sustainable business growth",
      components: [
        "Strategic recruitment planning",
        "Comprehensive training programmes",
        "Performance management systems",
        "Career progression pathways",
        "Retention and motivation strategies"
      ],
      implementation: [
        {
          phase: "Workforce Assessment (1-2 months)",
          tasks: [
            "Assess current team capacity, skills, and performance levels",
            "Identify future workforce requirements for growth targets",
            "Design optimal team structure and reporting lines",
            "Develop recruitment, training, and retention strategies"
          ]
        },
        {
          phase: "Strategic Recruitment (2-6 months)",
          tasks: [
            "Recruit qualified electricians and skilled apprentices",
            "Establish reliable subcontractor partnership networks",
            "Hire specialist roles (project managers, admin support)",
            "Implement comprehensive onboarding and training processes"
          ]
        },
        {
          phase: "Team Development (Ongoing)",
          tasks: [
            "Provide continuous skills training and certification updates",
            "Implement robust performance management systems",
            "Develop clear career progression and advancement pathways",
            "Focus on employee retention through competitive packages"
          ]
        }
      ],
      ukSpecific2025: [
        "Apprenticeship Levy utilisation for cost-effective training",
        "Skills shortage opportunities in renewable energy sectors",
        "Post-Brexit skilled worker availability changes",
        "Government skills development and retraining programmes"
      ],
      investment: "£25,000-100,000 workforce investment",
      roi: "200-400% productivity return",
      riskLevel: "Medium-high with proper management"
    },
    {
      id: "digital-transformation",
      title: "Digital Business Transformation",
      timeline: "3-12 months",
      description: "Modernise operations with digital tools and smart technology integration",
      components: [
        "Digital project management systems",
        "Customer relationship management (CRM)",
        "Mobile workforce management",
        "Smart technology integration",
        "Online presence and marketing"
      ],
      implementation: [
        {
          phase: "Digital Assessment (1-2 months)",
          tasks: [
            "Evaluate current digital capabilities and system gaps",
            "Identify key areas for digital transformation impact",
            "Research and select appropriate technology solutions",
            "Plan implementation timeline and training requirements"
          ]
        },
        {
          phase: "System Implementation (2-6 months)",
          tasks: [
            "Implement project management and CRM systems",
            "Set up mobile workforce management tools",
            "Integrate smart technology offerings for customers",
            "Develop professional online presence and digital marketing"
          ]
        },
        {
          phase: "Optimisation (Ongoing)",
          tasks: [
            "Train team on new digital tools and processes",
            "Monitor system performance and efficiency gains",
            "Continuously improve digital customer experience",
            "Stay updated with emerging technology trends"
          ]
        }
      ],
      ukSpecific2025: [
        "Smart home technology adoption surge post-pandemic",
        "Government Digital Skills Support Scheme access",
        "Making Tax Digital compliance requirements",
        "Cybersecurity grant funding for small businesses"
      ],
      investment: "£10,000-30,000 technology investment",
      roi: "250-500% efficiency return",
      riskLevel: "Low-medium with proper planning"
    },
    {
      id: "financial-growth",
      title: "Financial Growth Strategy",
      timeline: "6-36 months",
      description: "Strategic financial planning and investment for sustainable business expansion",
      components: [
        "Cash flow optimisation",
        "Investment strategy development",
        "Revenue stream diversification",
        "Cost management systems",
        "Growth funding solutions"
      ],
      implementation: [
        {
          phase: "Financial Health Assessment (1-2 months)",
          tasks: [
            "Comprehensive financial review and cash flow analysis",
            "Identify investment opportunities and funding requirements",
            "Assess current profitability and cost structure efficiency",
            "Develop risk management and contingency planning"
          ]
        },
        {
          phase: "Growth Investment (2-6 months)",
          tasks: [
            "Secure appropriate funding (loans, grants, investment)",
            "Implement robust financial management and tracking systems",
            "Establish business credit facilities and relationships",
            "Create strategic investment allocation and monitoring"
          ]
        },
        {
          phase: "Financial Execution (6-24 months)",
          tasks: [
            "Execute strategic investments according to plan",
            "Monitor financial performance against growth targets",
            "Adjust strategy based on market conditions and results",
            "Prepare financial foundation for next growth phase"
          ]
        }
      ],
      ukSpecific2025: [
        "Green energy grants and renewable incentive schemes",
        "Business rates relief and government support programmes",
        "R&D tax credits for innovation and technology adoption",
        "Export finance support for international expansion opportunities"
      ],
      investment: "£20,000-150,000 capital investment",
      roi: "180-350% financial return",
      riskLevel: "Medium with professional guidance"
    },
    {
      id: "risk-management",
      title: "Risk Management & Mitigation Strategies",
      timeline: "1-6 months",
      description: "Comprehensive risk assessment and mitigation framework to protect and strengthen your business",
      components: [
        "Business risk assessment framework",
        "Crisis management planning",
        "Insurance and protection strategies",
        "Legal and compliance risk management",
        "UK-specific risk factors for 2025"
      ],
      implementation: [
        {
          phase: "Risk Assessment (1-2 months)",
          tasks: [
            "Conduct comprehensive business risk audit and vulnerability analysis",
            "Identify operational, financial, legal, and market-based risks",
            "Assess current insurance coverage and protection gaps",
            "Evaluate compliance status with BS7671 18th edition requirements"
          ]
        },
        {
          phase: "Protection Strategy Development (1-2 months)",
          tasks: [
            "Design comprehensive risk mitigation strategies and protocols",
            "Update insurance policies to match current business scale",
            "Develop crisis management procedures and emergency protocols",
            "Create legal compliance monitoring and update systems"
          ]
        },
        {
          phase: "Implementation & Monitoring (2-6 months)",
          tasks: [
            "Implement risk monitoring systems and regular review processes",
            "Train team on emergency procedures and risk awareness",
            "Establish quarterly risk assessment and strategy reviews",
            "Monitor regulatory changes and update compliance accordingly"
          ]
        }
      ],
      ukSpecific2025: [
        "Brexit-related trade and supply chain disruption mitigation",
        "Building Safety Act compliance and new regulations",
        "Economic uncertainty and inflation protection strategies",
        "Skills shortage and labour market risk management"
      ],
      investment: "£2,000-10,000 protection investment",
      roi: "300-500% risk reduction value",
      riskLevel: "Essential for business protection"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
        <TrendingUp className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-yellow">
          Strategic growth planning can increase business value by 200-400% over 2-3 years with proper execution.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {growthMetrics.map((metric, index) => (
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
        {growthStrategies.map((strategy) => (
          <MobileAccordionItem key={strategy.id} value={strategy.id}>
            <MobileAccordionTrigger icon={
              strategy.id === "market-expansion" ? <MapPin className="h-5 w-5 text-blue-400" /> :
              strategy.id === "team-scaling" ? <Users className="h-5 w-5 text-green-400" /> :
              strategy.id === "digital-transformation" ? <Smartphone className="h-5 w-5 text-purple-400" /> :
              strategy.id === "risk-management" ? <ShieldCheck className="h-5 w-5 text-red-400" /> :
              <PoundSterling className="h-5 w-5 text-yellow-400" />
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

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-muted-foreground" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{strategy.investment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{strategy.roi}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{strategy.riskLevel}</span>
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

      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray/20 to-elec-gray/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Growth Success Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-300">Essential Prerequisites</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <PiggyBank className="h-4 w-4 text-green-400" />
                  <span>3-6 months operating capital reserve</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-green-400" />
                  <span>Updated insurance and compliance documentation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <UserCheck className="h-4 w-4 text-green-400" />
                  <span>Stable team performance and capacity</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-300">Success Indicators</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="h-4 w-4 text-blue-400" />
                  <span>15%+ annual revenue growth</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span>85%+ customer retention rate</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Settings className="h-4 w-4 text-blue-400" />
                  <span>Systematic operations and processes</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};