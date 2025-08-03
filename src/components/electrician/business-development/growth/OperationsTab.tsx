import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Settings, 
  Clock, 
  FileText, 
  Truck, 
  Shield, 
  Smartphone,
  TrendingUp,
  Users,
  BarChart3,
  CheckCircle,
  Cog,
  Database,
  Network,
  Brain,
  Target,
  AlertTriangle,
  Calendar,
  Timer,
  Zap,
  Building,
  MapPin,
  Eye,
  Briefcase,
  LineChart,
  Star,
  Crown,
  Award,
  Scale,
  Wrench,
  Lightbulb,
  BookOpen,
  DollarSign,
  Percent,
  ShieldCheck
} from "lucide-react";

export const OperationsTab = () => {
  const isMobile = useIsMobile();

  // Operations metrics matching the Growth Strategies pattern
  const operationsMetrics = [
    {
      metric: "Efficiency Gain",
      data: "25-40% time savings",
      icon: <Timer className="h-5 w-5 text-elec-yellow" />,
      detail: "Through digital systems and process automation"
    },
    {
      metric: "Revenue Impact",
      data: "£15-30k annual increase",
      icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
      detail: "From improved operational efficiency"
    },
    {
      metric: "Customer Satisfaction",
      data: "85-95% satisfaction rate",
      icon: <Star className="h-5 w-5 text-green-400" />,
      detail: "Through streamlined service delivery"
    },
    {
      metric: "Cost Reduction",
      data: "10-20% operational savings",
      icon: <DollarSign className="h-5 w-5 text-purple-400" />,
      detail: "From optimised processes and waste reduction"
    }
  ];

  const operationalSystems = [
    {
      id: "digital-workflow-system",
      title: "Digital Workflow Management",
      timeline: "2-4 months to implement",
      description: "Comprehensive digital transformation of core business processes for maximum efficiency",
      components: [
        "Job scheduling and dispatch system",
        "Customer relationship management (CRM)",
        "Digital forms and documentation",
        "Real-time progress tracking",
        "Automated invoicing and payments"
      ],
      implementation: [
        {
          phase: "System Selection & Setup (3-4 weeks)",
          tasks: [
            "Evaluate and select appropriate business management software",
            "Configure system for electrical contracting workflows",
            "Import customer data and historical job information",
            "Set up user accounts and permissions for team members"
          ]
        },
        {
          phase: "Process Digitisation (4-6 weeks)",
          tasks: [
            "Create digital job templates for common electrical work",
            "Develop standard operating procedures within the system",
            "Set up automated workflows for quotes, scheduling, and invoicing",
            "Integrate payment processing and customer communication tools"
          ]
        },
        {
          phase: "Team Training & Rollout (4-6 weeks)",
          tasks: [
            "Train all team members on new digital processes",
            "Gradually transition from paper-based to digital workflows",
            "Monitor adoption and provide ongoing support",
            "Optimise processes based on real-world usage and feedback"
          ]
        }
      ],
      ukSpecific2025: [
        "GDPR compliance features for customer data protection",
        "Integration with UK banking systems for direct debits",
        "VAT reporting functionality for Making Tax Digital compliance",
        "Building Safety Act documentation and compliance tracking"
      ],
      investment: "£3,000-8,000 for software and implementation",
      roi: "25-40% efficiency improvement",
      riskLevel: "Low risk with proven technology solutions"
    },
    {
      id: "mobile-field-operations",
      title: "Mobile Field Operations Platform",
      timeline: "1-3 months implementation",
      description: "Equip field teams with mobile technology for real-time job management and customer service",
      components: [
        "Mobile job management apps",
        "Digital testing and certification tools",
        "Photo documentation and reporting",
        "GPS tracking and route optimisation",
        "Customer communication portal"
      ],
      implementation: [
        {
          phase: "Mobile Infrastructure Setup (2-3 weeks)",
          tasks: [
            "Select and procure appropriate mobile devices and accessories",
            "Set up mobile data plans and device management systems",
            "Install and configure field management applications",
            "Create secure access to company systems and customer data"
          ]
        },
        {
          phase: "Digital Tools Integration (3-4 weeks)",
          tasks: [
            "Integrate electrical testing equipment with mobile devices",
            "Set up digital certificate generation and storage systems",
            "Configure customer communication and photo sharing tools",
            "Implement GPS tracking and route optimisation features"
          ]
        },
        {
          phase: "Field Team Deployment (4-6 weeks)",
          tasks: [
            "Train technicians on mobile app usage and best practices",
            "Implement standardised job documentation procedures",
            "Monitor field adoption and troubleshoot technical issues",
            "Gather feedback and refine mobile workflows for optimal efficiency"
          ]
        }
      ],
      ukSpecific2025: [
        "4G/5G network coverage considerations for remote areas",
        "Offline functionality for areas with poor signal coverage",
        "Integration with UK electrical testing standards and regulations",
        "Emergency contact systems for lone worker safety compliance"
      ],
      investment: "£2,000-5,000 for devices and applications",
      roi: "20-35% productivity increase",
      riskLevel: "Low risk with immediate practical benefits"
    },
    {
      id: "inventory-supply-chain",
      title: "Smart Inventory & Supply Chain Management",
      timeline: "2-5 months full implementation",
      description: "Optimise stock management and supplier relationships for reduced costs and improved service",
      components: [
        "Automated inventory tracking systems",
        "Supplier integration and ordering",
        "Van stock management and optimisation",
        "Predictive analytics for demand forecasting",
        "Cost tracking and procurement optimisation"
      ],
      implementation: [
        {
          phase: "Inventory System Implementation (4-6 weeks)",
          tasks: [
            "Install barcode or RFID tracking systems for all stock items",
            "Set up automated reorder points and supplier integration",
            "Configure van stock management and mobile inventory updates",
            "Implement cost tracking and margin analysis for all materials"
          ]
        },
        {
          phase: "Supplier Integration (4-6 weeks)",
          tasks: [
            "Negotiate improved terms with key electrical suppliers",
            "Set up electronic ordering and delivery scheduling systems",
            "Implement supplier performance tracking and evaluation",
            "Develop backup supplier relationships for critical components"
          ]
        },
        {
          phase: "Optimisation & Analytics (6-8 weeks)",
          tasks: [
            "Implement predictive analytics for seasonal demand patterns",
            "Optimise van stock levels based on job type analysis",
            "Monitor and reduce waste through better inventory management",
            "Develop KPIs for procurement efficiency and cost reduction"
          ]
        }
      ],
      ukSpecific2025: [
        "Brexit-related supply chain disruption mitigation strategies",
        "Local supplier preference for reduced carbon footprint",
        "Energy-efficient product sourcing for sustainability compliance",
        "Integration with UK wholesaler electronic ordering systems"
      ],
      investment: "£5,000-12,000 for systems and integration",
      roi: "15-25% inventory cost reduction",
      riskLevel: "Medium risk requiring careful supplier management"
    },
    {
      id: "quality-compliance-system",
      title: "Quality Assurance & Compliance Management",
      timeline: "3-6 months comprehensive setup",
      description: "Systematic approach to quality control, safety compliance, and regulatory adherence",
      components: [
        "Digital quality control checklists",
        "Compliance tracking and reporting",
        "Safety management systems",
        "Training and certification management",
        "Audit trail and documentation"
      ],
      implementation: [
        {
          phase: "Compliance Framework Development (4-6 weeks)",
          tasks: [
            "Document all regulatory requirements and industry standards",
            "Create digital checklists for BS 7671 and building regulations compliance",
            "Develop quality control procedures for all service categories",
            "Set up training tracking and certification management systems"
          ]
        },
        {
          phase: "Safety System Implementation (6-8 weeks)",
          tasks: [
            "Implement risk assessment and method statement templates",
            "Set up incident reporting and investigation procedures",
            "Create safety training programmes and competency tracking",
            "Develop emergency response and communication protocols"
          ]
        },
        {
          phase: "Continuous Improvement (8-12 weeks)",
          tasks: [
            "Monitor quality metrics and customer feedback systems",
            "Implement corrective action and improvement processes",
            "Regular compliance audits and system updates",
            "Benchmark performance against industry standards and best practices"
          ]
        }
      ],
      ukSpecific2025: [
        "Building Safety Act compliance and golden thread documentation",
        "Competent Person Scheme requirements and updates",
        "Health and Safety Executive regulatory changes",
        "Professional development requirements for electrical qualifications"
      ],
      investment: "£3,000-7,000 for systems and training",
      roi: "Risk reduction and insurance savings",
      riskLevel: "Low risk with essential compliance benefits"
    }
  ];

  const operationalBenchmarks = [
    {
      category: "Service Delivery Metrics",
      benchmarks: [
        { metric: "Job Completion Time", target: "15-25% reduction", current: "Through optimised processes" },
        { metric: "First-Time Fix Rate", target: "85-95%", current: "With proper van stock management" },
        { metric: "Customer Response Time", target: "Within 2 hours", current: "For non-emergency enquiries" },
        { metric: "Quote Turnaround", target: "Same day delivery", current: "For standard electrical work" }
      ]
    },
    {
      category: "Operational Efficiency",
      benchmarks: [
        { metric: "Travel Time Optimisation", target: "20-30% reduction", current: "Through route planning" },
        { metric: "Administrative Time", target: "50% reduction", current: "Via digital automation" },
        { metric: "Stock Accuracy", target: "95%+ accuracy", current: "With digital tracking systems" },
        { metric: "Documentation Speed", target: "70% faster", current: "Using digital certificates" }
      ]
    }
  ];

  const scalingAdvantages = [
    {
      title: "Technology-Enabled Growth",
      description: "Leverage digital systems to scale operations without proportional cost increases",
      advantages: [
        "Cloud-based systems accessible from anywhere",
        "Automated scheduling and resource allocation",
        "Real-time performance monitoring and analytics",
        "Seamless communication between office and field teams"
      ],
      impact: "Support 2-3x business growth with minimal admin overhead"
    },
    {
      title: "Process Standardisation Benefits",
      description: "Create consistent, repeatable processes that enable reliable service delivery",
      advantages: [
        "Standardised job procedures and quality checklists",
        "Consistent pricing and quotation processes",
        "Uniform customer communication and service levels",
        "Systematic training and competency development"
      ],
      impact: "Improved service quality and reduced training time for new staff"
    },
    {
      title: "Data-Driven Decision Making",
      description: "Use operational data and analytics to make informed business decisions",
      advantages: [
        "Real-time visibility of job profitability and performance",
        "Predictive analytics for maintenance and inventory needs",
        "Customer behaviour analysis for service improvement",
        "Financial reporting and cash flow forecasting"
      ],
      impact: "15-25% improvement in operational decision making accuracy"
    }
  ];

  const performanceMetrics = [
    {
      category: "Operational Efficiency",
      kpis: [
        "Job completion time and first-time fix rates",
        "Travel time optimisation and route efficiency",
        "Administrative time reduction and automation benefits",
        "Resource utilisation and capacity management"
      ]
    },
    {
      category: "Customer Service Quality",
      kpis: [
        "Response time to customer enquiries and emergencies",
        "Customer satisfaction scores and feedback analysis",
        "Service delivery consistency and quality metrics",
        "Communication effectiveness and transparency"
      ]
    },
    {
      category: "Financial Performance",
      kpis: [
        "Operational cost reduction and efficiency savings",
        "Inventory turnover and stock management effectiveness",
        "Profit margin improvement through better processes",
        "Return on investment for operational improvements"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
        <Settings className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-yellow">
          Systematic operational improvements can increase efficiency by 25-40% while reducing costs and improving customer satisfaction.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {operationsMetrics.map((metric, index) => (
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
        {operationalSystems.map((system) => (
          <MobileAccordionItem key={system.id} value={system.id}>
            <MobileAccordionTrigger icon={
              system.id === "digital-workflow-system" ? <Cog className="h-5 w-5 text-blue-400" /> :
              system.id === "mobile-field-operations" ? <Smartphone className="h-5 w-5 text-green-400" /> :
              system.id === "inventory-supply-chain" ? <Database className="h-5 w-5 text-purple-400" /> :
              <ShieldCheck className="h-5 w-5 text-yellow-400" />
            }>
              {system.title}
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{system.title}</h4>
                    <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {system.timeline}
                    </Badge>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{system.description}</p>
                </div>

                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{system.investment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{system.roi}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{system.riskLevel}</span>
                  </div>
                </div>

                <div>
                  <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Components</h5>
                  <ul className="space-y-1">
                    {system.components.map((component, compIndex) => (
                      <li key={compIndex} className={`flex items-start gap-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                        <CheckCircle className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-green-400 mt-0.5 shrink-0`} />
                        {component}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Phases</h5>
                  <div className="space-y-3">
                    {system.implementation.map((phase, phaseIndex) => (
                      <div key={phaseIndex} className="space-y-2">
                        <h6 className={`font-medium text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>{phase.phase}</h6>
                        <ul className="space-y-1">
                          {phase.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className={`flex items-start gap-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                              <Target className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-elec-yellow mt-0.5 shrink-0`} />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className={`font-medium text-yellow-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>UK Market Considerations (2025)</h5>
                  <ul className="space-y-1">
                    {system.ukSpecific2025.map((consideration, considerationIndex) => (
                      <li key={considerationIndex} className={`flex items-start gap-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                        <MapPin className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-yellow-400 mt-0.5 shrink-0`} />
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        ))}

        <MobileAccordionItem value="operational-benchmarks">
          <MobileAccordionTrigger icon={<BarChart3 className="h-5 w-5 text-orange-400" />}>
            Operational Benchmarks
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Performance Benchmarks</h4>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                Industry-standard metrics to track operational improvements and business growth
              </p>
              
              <div className="space-y-4">
                {operationalBenchmarks.map((category, index) => (
                  <div key={index}>
                    <h5 className={`font-medium text-orange-300 mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>{category.category}</h5>
                    <div className="space-y-2">
                      {category.benchmarks.map((benchmark, bIndex) => (
                        <div key={bIndex} className="flex justify-between items-center">
                          <span className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>{benchmark.metric}</span>
                          <Badge variant="outline" className="text-blue-300 border-blue-400/30">
                            {benchmark.target}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="scaling-advantages">
          <MobileAccordionTrigger icon={<Award className="h-5 w-5 text-green-400" />}>
            Scaling Advantages
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Growth Through Operations</h4>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                Strategic operational advantages that enable sustainable business scaling
              </p>
              
              <div className="space-y-4">
                {scalingAdvantages.map((advantage, index) => (
                  <div key={index} className="space-y-3">
                    <h5 className={`font-medium text-green-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>{advantage.title}</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{advantage.description}</p>
                    
                    <div>
                      <h6 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Advantages</h6>
                      <ul className="space-y-1">
                        {advantage.advantages.map((adv, advIndex) => (
                          <li key={advIndex} className={`flex items-start gap-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                            <CheckCircle className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-green-400 mt-0.5 shrink-0`} />
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-green-500/10 rounded p-3">
                      <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h6>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{advantage.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="performance-metrics">
          <MobileAccordionTrigger icon={<LineChart className="h-5 w-5 text-purple-400" />}>
            Performance Monitoring & KPIs
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Key Performance Indicators</h4>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                Essential metrics to monitor operational performance and drive continuous improvement
              </p>
              
              <div className="space-y-4">
                {performanceMetrics.map((category, index) => (
                  <div key={index}>
                    <h5 className={`font-medium text-purple-300 mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>{category.category}</h5>
                    <ul className="space-y-2">
                      {category.kpis.map((kpi, kpiIndex) => (
                        <li key={kpiIndex} className={`flex items-start gap-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                          <Zap className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-elec-yellow mt-0.5 shrink-0`} />
                          {kpi}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};