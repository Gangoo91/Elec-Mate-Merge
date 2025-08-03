
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  FileText, 
  Award, 
  Users, 
  Eye, 
  BarChart3, 
  Calendar, 
  Shield,
  Brain,
  ExternalLink,
  AlertTriangle
} from "lucide-react";

const AssessmentProgressTab = () => {
  const isMobile = useIsMobile();

  // Updated for 2025 - EPA standards and digital assessment
  const assessmentFramework = [
    {
      phase: "Digital Onboarding Assessment",
      timing: "Week 1-2",
      description: "Comprehensive digital skills baseline using EPA-aligned standards",
      components: [
        "Interactive knowledge assessment (BS 7671:2018+A2:2022)",
        "Digital portfolio setup and training",
        "Health & safety competency evaluation",
        "Functional skills diagnostic (Maths & English)"
      ],
      employerView: "Identifies skill gaps early, enables targeted development planning",
      kpis: ["Baseline score", "Skills matrix completion", "Development priorities identified"]
    },
    {
      phase: "Progress Gateway Reviews",
      timing: "Every 12 weeks",
      description: "Structured progress assessments aligned with apprenticeship standards",
      components: [
        "Practical competency demonstrations",
        "Digital portfolio evidence review",
        "Employer feedback and workplace observation",
        "Personal development planning session"
      ],
      employerView: "Track ROI, identify training needs, ensure workplace integration",
      kpis: ["Competency progression", "Employer satisfaction", "Portfolio quality score"]
    },
    {
      phase: "EPA Gateway Assessment",
      timing: "Month 15-18",
      description: "Final preparation for End Point Assessment readiness",
      components: [
        "Comprehensive portfolio validation",
        "Mock EPA practical assessment",
        "Professional discussion preparation",
        "Final knowledge verification"
      ],
      employerView: "Confidence in apprentice readiness, reduced EPA failure risk",
      kpis: ["EPA readiness score", "Portfolio completion", "Mock assessment results"]
    }
  ];

  const digitalTools = [
    {
      category: "Assessment Platforms",
      tools: [
        {
          name: "Skills Bank Pro",
          description: "EPA-aligned digital assessment platform",
          features: ["Real-time progress tracking", "Automated reporting", "Competency mapping"],
          cost: "£25/month per apprentice",
          benefits: "Reduces admin by 60%, improves completion rates by 25%"
        },
        {
          name: "OneFile Portfolio",
          description: "Industry-standard digital portfolio system",
          features: ["Mobile evidence capture", "Supervisor sign-off", "Progress analytics"],
          cost: "£20/month per apprentice",
          benefits: "Streamlined evidence collection, faster EPA preparation"
        }
      ]
    },
    {
      category: "Performance Analytics",
      tools: [
        {
          name: "Apprentice Insights Dashboard",
          description: "Real-time performance monitoring for employers",
          features: ["Progress visualisation", "Risk alerts", "ROI tracking"],
          cost: "£150/month (unlimited users)",
          benefits: "Early intervention, improved retention, clear ROI visibility"
        }
      ]
    }
  ];

  const employerMetrics = [
    {
      metric: "Completion Rate Impact",
      data: "Structured assessment increases completion rates from 68% to 87%",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      detail: "Regular progress reviews and early intervention significantly improve outcomes"
    },
    {
      metric: "Training Provider Performance",
      data: "95% of apprentices rate their college support as 'good' or 'excellent'",
      icon: <Award className="h-5 w-5 text-blue-400" />,
      detail: "Strong college partnerships are essential for apprentice success"
    },
    {
      metric: "Employer ROI",
      data: "£7.50 return for every £1 invested in apprentice assessment tracking",
      icon: <BarChart3 className="h-5 w-5 text-elec-yellow" />,
      detail: "Digital tracking reduces admin costs and improves productivity"
    },
    {
      metric: "Time to Competency",
      data: "Structured assessment reduces time to independence by 3-4 months",
      icon: <Clock className="h-5 w-5 text-purple-400" />,
      detail: "Clear progression paths accelerate skill development"
    }
  ];

  const collegePerformance = [
    {
      indicator: "Teaching Quality",
      metrics: [
        "Ofsted ratings for electrical courses",
        "Pass rates for functional skills",
        "Student satisfaction scores",
        "Industry partnership strength"
      ],
      benchmark: "Look for 'Good' or 'Outstanding' Ofsted ratings with 85%+ pass rates"
    },
    {
      indicator: "Assessment Standards",
      metrics: [
        "EPA first-time pass rates",
        "Portfolio completion rates",
        "Time to EPA gateway",
        "Assessment consistency"
      ],
      benchmark: "Target 80%+ EPA pass rate and 95%+ portfolio completion"
    },
    {
      indicator: "Support Systems",
      metrics: [
        "Response time to employer queries",
        "Apprentice support availability",
        "Digital platform effectiveness",
        "Progress reporting frequency"
      ],
      benchmark: "Weekly progress updates and same-day response to concerns"
    }
  ];

  const interventionStrategies = [
    {
      trigger: "Assessment scores below 60%",
      actions: [
        "Immediate skills gap analysis",
        "Additional college support sessions",
        "Workplace mentor assignment",
        "Learning style assessment"
      ],
      timeline: "Within 48 hours of identification"
    },
    {
      trigger: "Poor portfolio engagement",
      actions: [
        "Digital skills training",
        "Simplified evidence templates",
        "Peer mentoring programme",
        "Workplace evidence opportunities"
      ],
      timeline: "Weekly review sessions until improvement"
    },
    {
      trigger: "Employer concern reports",
      actions: [
        "Three-way meeting (employer-apprentice-college)",
        "Workplace adjustment plan",
        "Additional supervision",
        "Skills reinforcement programme"
      ],
      timeline: "Meeting within 5 working days"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Eye className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Effective assessment tracking increases apprentice completion rates by 19% and provides clear ROI visibility for employers.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {employerMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className="text-xs font-medium text-white">{metric.metric}</div>
              <div className="text-xs text-muted-foreground">{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="framework">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-blue-400" />}>
            2025 Assessment Framework
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {assessmentFramework.map((phase, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white text-sm">{phase.phase}</h4>
                      <Badge variant="outline" className="text-blue-300 border-blue-400/30 text-xs">
                        {phase.timing}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{phase.description}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-blue-300 mb-2 text-xs">Assessment Components</h5>
                    <ul className="space-y-1">
                      {phase.components.map((component, compIndex) => (
                        <li key={compIndex} className="text-xs text-blue-200 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className="font-medium text-green-300 mb-1 text-xs">Employer Benefits</h5>
                    <p className="text-xs text-green-200">{phase.employerView}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-purple-300 mb-1 text-xs">Key Performance Indicators</h5>
                    <div className="flex flex-wrap gap-1">
                      {phase.kpis.map((kpi, kpiIndex) => (
                        <Badge key={kpiIndex} variant="outline" className="text-purple-300 border-purple-400/30 text-xs">
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

        <MobileAccordionItem value="tools">
          <MobileAccordionTrigger icon={<Brain className="h-5 w-5 text-purple-400" />}>
            Digital Assessment Tools
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {digitalTools.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium text-purple-300 text-sm border-b border-purple-500/20 pb-1">
                    {category.category}
                  </h4>
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="border border-purple-500/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-white text-sm">{tool.name}</h5>
                        <Badge variant="outline" className="text-purple-300 border-purple-400/30 text-xs">
                          {tool.cost}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                      
                      <div>
                        <h6 className="font-medium text-purple-300 mb-1 text-xs">Features</h6>
                        <div className="flex flex-wrap gap-1">
                          {tool.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="outline" className="text-purple-200 border-purple-400/20 text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                        <p className="text-xs text-green-200">{tool.benefits}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="college">
          <MobileAccordionTrigger icon={<Award className="h-5 w-5 text-green-400" />}>
            College Performance Monitoring
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {collegePerformance.map((indicator, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <h4 className="font-medium text-white text-sm">{indicator.indicator}</h4>
                  
                  <div>
                    <h5 className="font-medium text-green-300 mb-2 text-xs">Key Metrics to Monitor</h5>
                    <ul className="space-y-1">
                      {indicator.metrics.map((metric, metricIndex) => (
                        <li key={metricIndex} className="text-xs text-green-200 flex items-center gap-1">
                          <BarChart3 className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                    <h5 className="font-medium text-blue-300 mb-1 text-xs">Quality Benchmark</h5>
                    <p className="text-xs text-blue-200">{indicator.benchmark}</p>
                  </div>
                </div>
              ))}

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <h4 className="font-medium text-amber-300 mb-2 text-sm">Regular Review Schedule</h4>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Monthly progress reports from college</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Quarterly three-way review meetings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Annual college performance evaluation</span>
                  </li>
                </ul>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="interventions">
          <MobileAccordionTrigger icon={<AlertTriangle className="h-5 w-5 text-orange-400" />}>
            Early Intervention Strategies
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {interventionStrategies.map((strategy, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <h4 className="font-medium text-white text-sm">{strategy.trigger}</h4>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-orange-300 mb-2 text-xs">Immediate Actions</h5>
                    <ul className="space-y-1">
                      {strategy.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="text-xs text-orange-200 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                    <h5 className="font-medium text-red-300 mb-1 text-xs">Response Timeline</h5>
                    <p className="text-xs text-red-200">{strategy.timeline}</p>
                  </div>
                </div>
              ))}

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <h4 className="font-medium text-green-300 mb-2 text-sm">Success Indicators</h4>
                <p className="text-xs text-green-200">
                  Early intervention reduces dropout risk by 75% and improves overall completion rates. 
                  Regular monitoring and prompt action are key to apprentice success.
                </p>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="resources">
          <MobileAccordionTrigger icon={<ExternalLink className="h-5 w-5 text-elec-yellow" />}>
            Additional Resources & Support
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-elec-yellow text-sm">Essential Resources</h4>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-blue-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.instituteforapprenticeships.org/', '_blank')}
                >
                  <FileText className="h-4 w-4 mr-3 text-blue-400 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-sm text-white truncate">Institute for Apprenticeships</div>
                    <div className="text-xs text-muted-foreground break-words">Official standards and EPA guidance</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-green-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.citb.co.uk/apprenticeships/', '_blank')}
                >
                  <Shield className="h-4 w-4 mr-3 text-green-400 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-sm text-white truncate">CITB Apprenticeship Hub</div>
                    <div className="text-xs text-muted-foreground break-words">Industry-specific guidance and support</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-purple-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.apprenticeships.gov.uk/', '_blank')}
                >
                  <Brain className="h-4 w-4 mr-3 text-purple-400 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-sm text-white truncate">Apprenticeships.gov.uk</div>
                    <div className="text-xs text-muted-foreground break-words">Government support and funding information</div>
                  </div>
                </Button>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <h4 className="font-medium text-blue-300 mb-2 text-sm">Best Practice Tip</h4>
                <p className="text-xs text-blue-200">
                  Establish a regular review cycle with your training provider. Monthly progress meetings and 
                  quarterly performance reviews ensure issues are identified and addressed quickly.
                </p>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default AssessmentProgressTab;
