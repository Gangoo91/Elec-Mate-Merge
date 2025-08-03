import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  Home, 
  Car, 
  Sun, 
  Building, 
  Zap, 
  Clock, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Target,
  BookOpen,
  Settings,
  Award,
  Wrench,
  Calculator,
  PoundSterling,
  BarChart3
} from "lucide-react";

export const ServiceDiversificationTab = () => {
  const isMobile = useIsMobile();

  // Service diversification metrics matching the Pricing Strategies pattern
  const diversificationMetrics = [
    {
      metric: "Market Opportunities",
      data: "6 high-growth sectors identified",
      icon: <Target className="h-5 w-5 text-elec-yellow" />,
      detail: "Ready for immediate expansion potential"
    },
    {
      metric: "Investment Range",
      data: "£1K-15K per specialisation",
      icon: <PoundSterling className="h-5 w-5 text-blue-400" />,
      detail: "Including training, equipment and certification"
    },
    {
      metric: "ROI Timeline",
      data: "6-18 months to profitability",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      detail: "Varies by sector complexity and market entry"
    },
    {
      metric: "Revenue Potential",
      data: "£50-200k additional annually",
      icon: <BarChart3 className="h-5 w-5 text-purple-400" />,
      detail: "Through strategic service diversification"
    }
  ];

  const diversificationStrategies = [
    {
      id: "smart-home",
      title: "Smart Home Technology Services",
      timeline: "6-12 months implementation",
      description: "Expanding into smart home technology installation and automation services",
      components: [
        "Smart lighting systems installation",
        "Home automation hub setup",
        "Security system wiring",
        "Network infrastructure setup",
        "System maintenance and support"
      ],
      implementation: [
        {
          phase: "Training & Certification (Months 1-2)",
          tasks: [
            "Complete smart home installer courses and manufacturer certifications",
            "Obtain data protection training for connected devices",
            "Learn network installation and configuration skills"
          ]
        },
        {
          phase: "Tool Investment (Months 3-4)",
          tasks: [
            "Purchase specialised testing equipment and practice installations",
            "Invest in sample devices for demonstrations",
            "Set up workshop area for device configuration"
          ]
        },
        {
          phase: "Market Entry (Months 5-6)",
          tasks: [
            "Begin offering services and build portfolio of completed projects",
            "Establish partnerships with smart home retailers",
            "Launch marketing campaign targeting tech-savvy homeowners"
          ]
        }
      ],
      ukSpecific2025: [
        "Building Regulations Part P compliance for new circuits",
        "GDPR data protection requirements for connected devices",
        "Rapidly evolving technology standards and compatibility",
        "Insurance coverage for smart home installation work"
      ],
      investment: "£2,000-3,000 investment",
      roi: "25-40% premium pricing",
      riskLevel: "Medium risk, high reward"
    },
    {
      id: "ev-charging",
      title: "EV Charging Infrastructure",
      timeline: "3-6 months implementation",
      description: "Installing electric vehicle charging points for residential and commercial customers",
      components: [
        "Home charger installation (£500-1,500 per job)",
        "Commercial charging solutions (£2,000-15,000+)",
        "Consumer unit upgrades",
        "Load management systems",
        "OZEV grant applications"
      ],
      implementation: [
        {
          phase: "OZEV Approval (Month 1)",
          tasks: [
            "Complete OZEV installer training and approval process",
            "Understand grant scheme requirements and applications",
            "Learn PEN fault protection requirements"
          ]
        },
        {
          phase: "Equipment & Insurance (Month 2)",
          tasks: [
            "Purchase testing equipment and update insurance coverage",
            "Establish relationships with charger manufacturers",
            "Set up OZEV approved installer status"
          ]
        },
        {
          phase: "Market Launch (Month 3)",
          tasks: [
            "Begin installations and build customer base",
            "Focus on residential market initially",
            "Develop commercial customer pipeline"
          ]
        }
      ],
      ukSpecific2025: [
        "OZEV grant scheme requirements and approval process",
        "PEN fault protection mandatory for all installations",
        "Changing regulations and technical standards",
        "Competition increasing as market grows"
      ],
      investment: "£1,500-2,500 investment",
      roi: "£350 OZEV grants available",
      riskLevel: "Low risk, high growth"
    },
    {
      id: "solar-renewable",
      title: "Solar & Renewable Energy",
      timeline: "12-18 months implementation",
      description: "Installing solar panels, battery storage and renewable energy systems",
      components: [
        "Residential solar installations (£4,000-12,000)",
        "Battery storage systems (£3,000-8,000)",
        "Commercial solar arrays (£20,000+)",
        "Heat pump electrical connections",
        "DNO applications and grid connections"
      ],
      implementation: [
        {
          phase: "MCS Certification (Months 1-3)",
          tasks: [
            "Complete MCS training and assessment process",
            "Understand DNO application procedures",
            "Learn roof work safety requirements"
          ]
        },
        {
          phase: "Equipment & Training (Months 4-6)",
          tasks: [
            "Invest in specialist tools and complete manufacturer training",
            "Purchase testing and commissioning equipment",
            "Build relationships with panel and inverter suppliers"
          ]
        },
        {
          phase: "Market Development (Months 7-12)",
          tasks: [
            "Build portfolio and establish supply chains",
            "Focus on residential market entry",
            "Develop commercial project capabilities"
          ]
        }
      ],
      ukSpecific2025: [
        "MCS certification mandatory for government schemes",
        "DNO applications required for grid connection",
        "High initial investment and specialised training",
        "Roof work safety and structural considerations"
      ],
      investment: "£3,000-8,000 investment",
      roi: "30-50% profit margins",
      riskLevel: "Medium risk, very high reward"
    },
    {
      id: "commercial-services",
      title: "Commercial & Industrial Services",
      timeline: "6-12 months implementation",
      description: "Expanding into commercial electrical installations and maintenance contracts",
      components: [
        "Three-phase installations and upgrades",
        "Commercial lighting projects (£5,000-50,000)",
        "Fire alarm and emergency lighting systems",
        "Motor control and industrial automation",
        "Preventive maintenance contracts"
      ],
      implementation: [
        {
          phase: "Advanced Training (Months 1-3)",
          tasks: [
            "Complete three-phase and commercial electrical courses",
            "Obtain fire safety and emergency lighting certifications",
            "Learn motor control and industrial systems"
          ]
        },
        {
          phase: "Equipment & Insurance (Months 4-6)",
          tasks: [
            "Invest in commercial-grade testing equipment",
            "Upgrade insurance for commercial work",
            "Purchase specialised tools and safety equipment"
          ]
        },
        {
          phase: "Market Entry (Months 7-12)",
          tasks: [
            "Build commercial customer base and tender for contracts",
            "Establish maintenance contract offerings",
            "Develop relationships with commercial property managers"
          ]
        }
      ],
      ukSpecific2025: [
        "Commercial building regulations and compliance requirements",
        "Health and safety regulations for industrial environments",
        "Tender processes and commercial contract negotiations",
        "Public liability insurance requirements for commercial work"
      ],
      investment: "£2,000-5,000 investment",
      roi: "Higher value contracts (£5K-50K+)",
      riskLevel: "Medium risk, stable returns"
    },
    {
      id: "testing-inspection",
      title: "Testing, Inspection & Compliance",
      timeline: "3-6 months implementation",
      description: "Providing electrical testing, inspection and certification services",
      components: [
        "Periodic inspection and testing (EICR)",
        "Portable appliance testing (PAT)",
        "New installation testing and certification",
        "Electrical safety certificates",
        "Commercial compliance audits"
      ],
      implementation: [
        {
          phase: "Certification & Training (Months 1-2)",
          tasks: [
            "Complete inspection and testing courses (2391-52)",
            "Obtain PAT testing certification",
            "Learn BS 7671 requirements and test procedures"
          ]
        },
        {
          phase: "Equipment Investment (Months 3-4)",
          tasks: [
            "Purchase multifunction testers and PAT equipment",
            "Invest in ladder and access equipment",
            "Set up documentation and certification systems"
          ]
        },
        {
          phase: "Service Launch (Months 5-6)",
          tasks: [
            "Market testing services to existing customers",
            "Develop commercial testing contracts",
            "Build reputation for thorough and reliable testing"
          ]
        }
      ],
      ukSpecific2025: [
        "BS 7671 18th Edition compliance requirements",
        "Periodic inspection regulations for rental properties",
        "Commercial workplace safety regulations",
        "Insurance and certification requirements for testing work"
      ],
      investment: "£1,500-3,000 investment",
      roi: "Recurring revenue streams",
      riskLevel: "Low risk, steady income"
    },
    {
      id: "emergency-services",
      title: "Emergency & 24/7 Services",
      timeline: "1-3 months implementation",
      description: "Offering emergency electrical services and out-of-hours support",
      components: [
        "24/7 emergency call-out service",
        "Fault finding and rapid repairs",
        "Emergency lighting installations",
        "Power restoration services",
        "Weekend and evening availability"
      ],
      implementation: [
        {
          phase: "Service Setup (Month 1)",
          tasks: [
            "Set up emergency call-out systems and procedures",
            "Invest in emergency lighting and safety equipment",
            "Establish pricing for emergency services"
          ]
        },
        {
          phase: "Marketing & Operations (Month 2)",
          tasks: [
            "Launch emergency service marketing campaign",
            "Set up 24/7 phone system and response procedures",
            "Train team on emergency response protocols"
          ]
        },
        {
          phase: "Service Optimisation (Month 3)",
          tasks: [
            "Monitor response times and customer satisfaction",
            "Refine emergency procedures and equipment stock",
            "Build relationships with property managers and facilities teams"
          ]
        }
      ],
      ukSpecific2025: [
        "Emergency response time expectations and customer demands",
        "Higher pricing justified by urgency and convenience",
        "24/7 availability requiring staff scheduling considerations",
        "Emergency vehicle and equipment requirements"
      ],
      investment: "£500-1,500 investment",
      roi: "Premium emergency pricing (50-100% markup)",
      riskLevel: "Low risk, immediate returns"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
        <TrendingUp className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-yellow">
          Strategic service diversification can increase annual revenue by £50-200k while reducing dependency on single service areas.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {diversificationMetrics.map((metric, index) => (
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
        {diversificationStrategies.map((strategy) => (
          <MobileAccordionItem key={strategy.id} value={strategy.id}>
            <MobileAccordionTrigger icon={
              strategy.id === "smart-home" ? <Home className="h-5 w-5 text-blue-400" /> :
              strategy.id === "ev-charging" ? <Car className="h-5 w-5 text-green-400" /> :
              strategy.id === "solar-renewable" ? <Sun className="h-5 w-5 text-yellow-400" /> :
              strategy.id === "commercial-services" ? <Building className="h-5 w-5 text-purple-400" /> :
              strategy.id === "testing-inspection" ? <Zap className="h-5 w-5 text-cyan-400" /> :
              <AlertTriangle className="h-5 w-5 text-red-400" />
            }>
              {strategy.title}
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                <div className={`border ${
                  strategy.id === "smart-home" ? "border-blue-500/20" :
                  strategy.id === "ev-charging" ? "border-green-500/20" :
                  strategy.id === "solar-renewable" ? "border-yellow-500/20" :
                  strategy.id === "commercial-services" ? "border-purple-500/20" :
                  strategy.id === "testing-inspection" ? "border-cyan-500/20" :
                  "border-red-500/20"
                } rounded-lg p-3 space-y-3`}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.title}</h4>
                      <Badge variant="outline" className={`${
                        strategy.id === "smart-home" ? "text-blue-300 border-blue-400/30" :
                        strategy.id === "ev-charging" ? "text-green-300 border-green-400/30" :
                        strategy.id === "solar-renewable" ? "text-yellow-300 border-yellow-400/30" :
                        strategy.id === "commercial-services" ? "text-purple-300 border-purple-400/30" :
                        strategy.id === "testing-inspection" ? "text-cyan-300 border-cyan-400/30" :
                        "text-red-300 border-red-400/30"
                      } ${isMobile ? 'text-xs' : 'text-sm'}`}>
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
                    <h5 className={`font-medium ${
                      strategy.id === "smart-home" ? "text-blue-300" :
                      strategy.id === "ev-charging" ? "text-green-300" :
                      strategy.id === "solar-renewable" ? "text-yellow-300" :
                      strategy.id === "commercial-services" ? "text-purple-300" :
                      strategy.id === "testing-inspection" ? "text-cyan-300" :
                      "text-red-300"
                    } mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Components</h5>
                    <ul className="space-y-1">
                      {strategy.components.map((component, compIndex) => (
                        <li key={compIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className={`font-medium ${
                      strategy.id === "smart-home" ? "text-blue-300" :
                      strategy.id === "ev-charging" ? "text-green-300" :
                      strategy.id === "solar-renewable" ? "text-yellow-300" :
                      strategy.id === "commercial-services" ? "text-purple-300" :
                      strategy.id === "testing-inspection" ? "text-cyan-300" :
                      "text-red-300"
                    } mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Steps</h5>
                    <div className="space-y-2">
                      {strategy.implementation.map((phase, phaseIndex) => (
                        <div key={phaseIndex} className="flex items-start gap-2">
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold ${
                            strategy.id === "smart-home" ? "text-blue-400" :
                            strategy.id === "ev-charging" ? "text-green-400" :
                            strategy.id === "solar-renewable" ? "text-yellow-400" :
                            strategy.id === "commercial-services" ? "text-purple-400" :
                            strategy.id === "testing-inspection" ? "text-cyan-400" :
                            "text-red-400"
                          } mt-1`}>{phaseIndex + 1}.</span>
                          <div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{phase.phase}</p>
                            <div className="space-y-1">
                              {phase.tasks.map((task, taskIndex) => (
                                <p key={taskIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• {task}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className={`font-medium ${
                      strategy.id === "smart-home" ? "text-blue-300" :
                      strategy.id === "ev-charging" ? "text-green-300" :
                      strategy.id === "solar-renewable" ? "text-yellow-300" :
                      strategy.id === "commercial-services" ? "text-purple-300" :
                      strategy.id === "testing-inspection" ? "text-cyan-300" :
                      "text-red-300"
                    } mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>UK Specific Considerations (2025)</h5>
                    <ul className="space-y-1">
                      {strategy.ukSpecific2025.map((consideration, consIndex) => (
                        <li key={consIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                          <AlertTriangle className="h-3 w-3 text-orange-400" />
                          {consideration}
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

      <div className="bg-elec-yellow/10 rounded-lg p-3">
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground text-center font-medium`}>
          <strong className="text-elec-yellow">Key Success Factor:</strong> Focus on quality and compliance over speed of expansion. 
          Building reputation in one area often leads to natural opportunities in others.
        </p>
      </div>

    </div>
  );
};