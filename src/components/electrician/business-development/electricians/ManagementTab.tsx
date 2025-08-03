
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Shield, 
  Users, 
  Target, 
  Calendar, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen,
  BarChart3,
  Clock,
  TrendingUp,
  ExternalLink,
  Settings,
  Award
} from "lucide-react";

const ManagementTab = () => {
  const isMobile = useIsMobile();

  // Employer-focused management metrics
  const employerMetrics = [
    {
      metric: "Team Productivity",
      data: "25% increase with structured management",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      detail: "Compared to informal management approaches"
    },
    {
      metric: "Safety Performance",
      data: "60% reduction in incidents",
      icon: <Shield className="h-5 w-5 text-elec-yellow" />,
      detail: "With systematic safety leadership and monitoring"
    },
    {
      metric: "Employee Satisfaction",
      data: "4.2/5 with effective management",
      icon: <Users className="h-5 w-5 text-blue-400" />,
      detail: "Regular feedback and clear communication"
    },
    {
      metric: "Project Delivery",
      data: "95% on-time completion rate",
      icon: <Target className="h-5 w-5 text-purple-400" />,
      detail: "Through effective planning and resource allocation"
    }
  ];

  const managementAreas = [
    {
      area: "Performance Management",
      icon: <Target className="h-5 w-5" />,
      practices: [
        "Set clear, measurable objectives and KPIs",
        "Conduct regular performance reviews (quarterly/bi-annually)",
        "Provide ongoing feedback and coaching",
        "Document performance issues and improvements",
        "Link performance to career development opportunities"
      ]
    },
    {
      area: "Team Communication",
      icon: <Users className="h-5 w-5" />,
      practices: [
        "Hold regular team meetings and toolbox talks",
        "Maintain open-door policy for concerns",
        "Use digital communication tools effectively",
        "Encourage feedback and suggestions",
        "Share company updates and business progress"
      ]
    },
    {
      area: "Health & Safety Leadership",
      icon: <Shield className="h-5 w-5" />,
      practices: [
        "Lead by example in safety behaviours",
        "Conduct regular safety inspections and audits",
        "Investigate incidents thoroughly and transparently",
        "Provide ongoing safety training and updates",
        "Recognise and reward safe working practices"
      ]
    },
    {
      area: "Work Allocation & Planning",
      icon: <Calendar className="h-5 w-5" />,
      practices: [
        "Match electricians' skills to appropriate tasks",
        "Plan workloads to avoid burnout or underutilisation",
        "Consider travel time and job complexity",
        "Provide adequate resources and support",
        "Monitor progress and adjust plans as needed"
      ]
    }
  ];

  const managementFramework = [
    {
      area: "Daily Operations Management",
      timeline: "Day-to-Day Excellence",
      description: "Systematic approach to managing daily activities and team performance",
      components: [
        "Morning briefings covering daily priorities and safety requirements",
        "Real-time monitoring of job progress and quality standards",
        "Immediate support for technical challenges and problem-solving",
        "End-of-day reviews and planning for next day activities",
        "Continuous communication with customers and stakeholders"
      ],
      employerBenefit: "Increase operational efficiency by 30% and reduce project delays",
      kpis: ["Job completion rates", "Quality scores", "Customer satisfaction", "Team productivity"]
    },
    {
      area: "Performance Development System",
      timeline: "Continuous Improvement",
      description: "Structured approach to developing and maintaining high performance standards",
      components: [
        "Clear performance expectations and KPI frameworks",
        "Regular one-to-one feedback sessions and coaching",
        "Skills development planning and training coordination",
        "Recognition programmes for high performers",
        "Performance improvement plans for underperformers"
      ],
      employerBenefit: "Improve team performance by 40% and reduce staff turnover",
      kpis: ["Performance scores", "Employee engagement", "Training completion", "Retention rates"]
    },
    {
      area: "Risk & Safety Management",
      timeline: "Zero-Harm Culture",
      description: "Comprehensive safety leadership ensuring regulatory compliance and team welfare",
      components: [
        "Daily safety checks and hazard identification processes",
        "Regular safety training and competency assessments",
        "Incident investigation and prevention system implementation",
        "Safety culture development and behavioural leadership",
        "Regulatory compliance monitoring and documentation"
      ],
      employerBenefit: "Reduce safety incidents by 70% and ensure full regulatory compliance",
      kpis: ["Safety incident rates", "Near-miss reporting", "Compliance scores", "Safety training completion"]
    }
  ];

  const disciplinaryProcess = [
    {
      stage: "Informal Discussion",
      description: "Address minor issues through conversation and coaching",
      actions: ["Document the discussion", "Set clear expectations", "Offer support and training"],
      timeframe: "Immediate"
    },
    {
      stage: "Verbal Warning",
      description: "Formal verbal warning for continued or more serious issues",
      actions: ["Formal meeting with notes", "Clear improvement timeline", "Follow-up review date"],
      timeframe: "1-2 weeks"
    },
    {
      stage: "Written Warning",
      description: "Formal written warning if issues persist",
      actions: ["Written documentation", "Performance improvement plan", "Regular monitoring"],
      timeframe: "2-4 weeks"
    },
    {
      stage: "Final Written Warning",
      description: "Last formal warning before potential dismissal",
      actions: ["Final warning letter", "Clear consequences stated", "Close monitoring period"],
      timeframe: "4-12 weeks"
    },
    {
      stage: "Dismissal",
      description: "Termination of employment as last resort",
      actions: ["Dismissal meeting", "Notice period or pay in lieu", "Final documentation"],
      timeframe: "As per contract"
    }
  ];

  const kpiMetrics = [
    {
      category: "Quality & Safety",
      metrics: ["Safety incident rate", "Quality of work scores", "Customer satisfaction ratings", "Compliance with procedures"]
    },
    {
      category: "Productivity",
      metrics: ["Jobs completed per week", "Time to complete standard tasks", "Efficiency ratings", "Material waste reduction"]
    },
    {
      category: "Professional Development",
      metrics: ["Training hours completed", "Certifications achieved", "Skill assessments passed", "Knowledge sharing participation"]
    },
    {
      category: "Team Contribution",
      metrics: ["Attendance and punctuality", "Teamwork ratings", "Mentoring activities", "Process improvement suggestions"]
    }
  ];

  const managementChallenges = [
    {
      challenge: "Remote Site Management",
      solutions: [
        "Use project management apps for real-time updates",
        "Schedule regular check-ins via phone or video call",
        "Implement GPS tracking for work vehicles (with consent)",
        "Create clear reporting procedures for site issues",
        "Provide emergency contact protocols"
      ]
    },
    {
      challenge: "Skills Gap Management",
      solutions: [
        "Conduct regular skills assessments",
        "Create individual development plans",
        "Pair experienced electricians with newer team members",
        "Invest in targeted training programmes",
        "Consider outsourcing specialised work when needed"
      ]
    },
    {
      challenge: "Workload Balancing",
      solutions: [
        "Use scheduling software to optimise job allocation",
        "Monitor individual workloads and stress levels",
        "Maintain a pool of trusted subcontractors",
        "Cross-train team members for flexibility",
        "Plan for seasonal variations in demand"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Shield className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Effective management increases team productivity by 25% and reduces safety incidents by 60%.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {employerMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="framework">
          <MobileAccordionTrigger icon={<BookOpen className="h-5 w-5 text-blue-400" />}>
            Management Framework
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {managementFramework.map((framework, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{framework.area}</h4>
                      <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {framework.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{framework.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Components</h5>
                    <ul className="space-y-1">
                      {framework.components.map((component, compIndex) => (
                        <li key={compIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <h5 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{framework.employerBenefit}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Success Indicators</h5>
                    <div className="flex flex-wrap gap-1">
                      {framework.kpis.map((kpi, kpiIndex) => (
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

        <MobileAccordionItem value="areas">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-purple-400" />}>
            Core Management Areas
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {managementAreas.map((area, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    {area.icon}
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{area.area}</h4>
                  </div>
                  <ul className="space-y-1">
                    {area.practices.map((practice, practiceIndex) => (
                      <li key={practiceIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-center gap-1`}>
                        <CheckCircle className="h-3 w-3 text-purple-400 flex-shrink-0" />
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="disciplinary">
          <MobileAccordionTrigger icon={<AlertTriangle className="h-5 w-5 text-red-400" />}>
            Disciplinary Process
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {disciplinaryProcess.map((stage, index) => (
                <div key={index} className="border border-red-500/20 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className={`font-medium text-red-200 ${isMobile ? 'text-sm' : 'text-base'}`}>{stage.stage}</h5>
                    <Badge variant="outline" className={`text-red-300 border-red-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {stage.timeframe}
                    </Badge>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-100`}>{stage.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {stage.actions.map((action, actionIndex) => (
                      <Badge key={actionIndex} variant="outline" className={`text-red-200 border-red-400/20 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="kpis">
          <MobileAccordionTrigger icon={<BarChart3 className="h-5 w-5 text-green-400" />}>
            Performance KPIs
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {kpiMetrics.map((category, index) => (
                  <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-2">
                    <h5 className={`font-medium text-green-200 ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h5>
                    <ul className="space-y-1">
                      {category.metrics.map((metric, metricIndex) => (
                        <li key={metricIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-100 flex items-center gap-1`}>
                          <BarChart3 className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="challenges">
          <MobileAccordionTrigger icon={<Settings className="h-5 w-5 text-orange-400" />}>
            Common Challenges
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {managementChallenges.map((item, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <h5 className={`font-medium text-orange-200 ${isMobile ? 'text-sm' : 'text-base'}`}>{item.challenge}</h5>
                  <ul className="space-y-1">
                    {item.solutions.map((solution, solutionIndex) => (
                      <li key={solutionIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100 flex items-center gap-1`}>
                        <CheckCircle className="h-3 w-3 text-orange-400 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="resources">
          <MobileAccordionTrigger icon={<ExternalLink className="h-5 w-5 text-amber-400" />}>
            Quick Access Resources
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-green-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.hse.gov.uk/managing/', '_blank')}
                >
                  <Shield className="h-4 w-4 mr-3 text-green-400 flex-shrink-0" />
                  <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white`}>HSE Management Guide</div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-blue-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.cipd.co.uk/knowledge/fundamentals/people/performance', '_blank')}
                >
                  <Target className="h-4 w-4 mr-3 text-blue-400 flex-shrink-0" />
                  <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white`}>Performance Management</div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-purple-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.gov.uk/disciplinary-procedures-and-action', '_blank')}
                >
                  <FileText className="h-4 w-4 mr-3 text-purple-400 flex-shrink-0" />
                  <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white`}>Disciplinary Procedures</div>
                </Button>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <h4 className={`font-medium text-amber-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Management Essentials</h4>
                <ul className={`space-y-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Establish clear performance expectations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Implement regular feedback systems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Prioritise safety leadership</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Document all management decisions</span>
                  </li>
                </ul>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default ManagementTab;
