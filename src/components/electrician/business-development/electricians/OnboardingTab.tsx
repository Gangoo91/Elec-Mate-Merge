
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Calendar, 
  FileText, 
  Users, 
  Shield, 
  BookOpen, 
  Settings,
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
  ExternalLink,
  UserPlus
} from "lucide-react";

const OnboardingTab = () => {
  const isMobile = useIsMobile();

  // Employer-focused onboarding metrics
  const employerMetrics = [
    {
      metric: "Retention Increase",
      data: "82% higher retention with structured onboarding",
      icon: <Target className="h-5 w-5 text-green-400" />,
      detail: "Compared to informal onboarding processes"
    },
    {
      metric: "Productivity Timeline",
      data: "6 weeks to full productivity",
      icon: <TrendingUp className="h-5 w-5 text-elec-yellow" />,
      detail: "With proper mentoring and structured training"
    },
    {
      metric: "Investment Return",
      data: "£3,500 saved per successful onboarding",
      icon: <CheckCircle className="h-5 w-5 text-blue-400" />,
      detail: "Reduced turnover and faster productivity"
    },
    {
      metric: "Employee Satisfaction",
      data: "90% satisfaction after 90 days",
      icon: <Clock className="h-5 w-5 text-purple-400" />,
      detail: "With comprehensive onboarding programmes"
    }
  ];

  const onboardingTimeline = [
    {
      phase: "Week 1",
      title: "Documentation & Setup",
      tasks: [
        "Complete employment contracts and right to work checks",
        "Set up payroll, pension, and insurance details", 
        "Issue company ID, uniform, and basic equipment",
        "Complete health and safety induction",
        "Introduce to team and assign buddy/mentor"
      ]
    },
    {
      phase: "Week 2-4", 
      title: "Skills Assessment & Training",
      tasks: [
        "Conduct practical skills assessment",
        "Review existing qualifications and identify gaps",
        "Begin company-specific training programs",
        "Shadow experienced electricians on various job types",
        "Learn company procedures and quality standards"
      ]
    },
    {
      phase: "Month 2-3",
      title: "Independent Work Development", 
      tasks: [
        "Begin working independently on suitable tasks",
        "Regular progress reviews and feedback sessions",
        "Complete any required additional training",
        "Build relationships with regular customers",
        "Develop specialisation in company focus areas"
      ]
    },
    {
      phase: "Month 4-6",
      title: "Full Integration",
      tasks: [
        "Take on more complex and varied work",
        "Participate in company development initiatives",
        "Mentor newer team members",
        "Contribute to process improvements",
        "Complete probationary period review"
      ]
    }
  ];

  const onboardingFramework = [
    {
      area: "Pre-Arrival Preparation",
      timeline: "Before Day 1",
      description: "Set up new hire for immediate success from their first day",
      components: [
        "Prepare workspace, tools, and safety equipment",
        "Create personalised welcome pack with company information",
        "Schedule first week meetings and training sessions",
        "Notify team members and assign mentor/buddy",
        "Plan structured introduction to company culture"
      ],
      employerBenefit: "Reduce first-day anxiety and create positive first impression",
      kpis: ["First-day feedback score", "Equipment readiness", "Team awareness level"]
    },
    {
      area: "Week 1: Foundation Setting",
      timeline: "Days 1-7",
      description: "Establish fundamental knowledge and relationships",
      components: [
        "Comprehensive health and safety induction training",
        "Company policies, procedures, and quality standards",
        "Team introductions and communication protocols",
        "IT systems training and access setup",
        "Initial skills assessment and development planning"
      ],
      employerBenefit: "Ensure compliance and build strong foundation for future development",
      kpis: ["Induction completion rate", "Safety knowledge test scores", "System access setup time"]
    },
    {
      area: "Month 1: Skills Development",
      timeline: "Weeks 2-4",
      description: "Build technical competency and company-specific knowledge",
      components: [
        "Structured on-site training with experienced electricians",
        "Company-specific installation and testing procedures",
        "Customer service standards and communication training",
        "Quality control processes and documentation",
        "Regular feedback sessions and progress reviews"
      ],
      employerBenefit: "Accelerate competency development and reduce supervision requirements",
      kpis: ["Skills assessment scores", "Supervision time required", "Quality of work metrics"]
    }
  ];

  const essentialDocuments = [
    "Employment contract with clear terms and conditions",
    "Health and safety policies and procedures manual",
    "Company quality standards and procedures",
    "Customer service standards and communication guidelines",
    "Emergency contact procedures and escalation processes",
    "Equipment care and maintenance guidelines"
  ];

  const trainingAreas = [
    {
      category: "Company Systems",
      items: ["Job management software", "Invoicing and quoting systems", "Quality control processes"]
    },
    {
      category: "Customer Service",
      items: ["Communication standards", "Complaint handling", "Professional presentation"]
    },
    {
      category: "Technical Skills",
      items: ["Company installation methods", "Preferred suppliers and materials", "Diagnostic procedures"]
    },
    {
      category: "Health & Safety",
      items: ["Site-specific risk assessments", "Emergency procedures", "Equipment maintenance"]
    }
  ];

  const successMetrics = [
    {
      metric: "Time to Full Productivity",
      target: "6 weeks",
      industry: "8-12 weeks",
      description: "Time for new hire to work independently"
    },
    {
      metric: "90-Day Retention Rate",
      target: "> 95%",
      industry: "85%",
      description: "Percentage completing probationary period"
    },
    {
      metric: "Employee Satisfaction",
      target: "> 4.5/5",
      industry: "3.8/5",
      description: "New hire satisfaction with onboarding"
    },
    {
      metric: "Mentor Effectiveness",
      target: "> 90%",
      industry: "75%",
      description: "Successful mentor-mentee relationships"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-green-500/50 bg-green-500/10">
        <BookOpen className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          Structured onboarding increases employee retention by 82% and reduces time to productivity by 60%.
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
          <MobileAccordionTrigger icon={<Calendar className="h-5 w-5 text-blue-400" />}>
            Onboarding Framework
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {onboardingFramework.map((framework, index) => (
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

        <MobileAccordionItem value="timeline">
          <MobileAccordionTrigger icon={<Clock className="h-5 w-5 text-purple-400" />}>
            6-Month Timeline
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {onboardingTimeline.map((phase, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{phase.title}</h4>
                    <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {phase.phase}
                    </Badge>
                  </div>
                  <ul className="space-y-1">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-center gap-1`}>
                        <CheckCircle className="h-3 w-3 text-purple-400 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="documentation">
          <MobileAccordionTrigger icon={<FileText className="h-5 w-5 text-green-400" />}>
            Essential Documentation
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Required Documents</h4>
                  <ul className="space-y-1">
                    {essentialDocuments.map((doc, index) => (
                      <li key={index} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Training Areas</h4>
                  <div className="space-y-2">
                    {trainingAreas.map((area, index) => (
                      <div key={index} className="space-y-1">
                        <h5 className={`font-medium text-orange-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>{area.category}</h5>
                        <div className="flex flex-wrap gap-1">
                          {area.items.map((item, itemIndex) => (
                            <Badge key={itemIndex} variant="outline" className={`text-orange-200 border-orange-400/20 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="metrics">
          <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-orange-400" />}>
            Success Metrics
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {successMetrics.map((metric, index) => (
                  <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-2">
                    <h5 className={`font-medium text-orange-200 ${isMobile ? 'text-sm' : 'text-base'}`}>{metric.metric}</h5>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100`}>Target: <span className="font-medium">{metric.target}</span></div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100`}>Industry: <span className="font-medium">{metric.industry}</span></div>
                      </div>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100`}>{metric.description}</p>
                  </div>
                ))}
              </div>
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
                  onClick={() => window.open('https://www.gov.uk/employment-contracts-and-conditions', '_blank')}
                >
                  <FileText className="h-4 w-4 mr-3 text-green-400 flex-shrink-0" />
                  <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white`}>Employment Contract Templates</div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-blue-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.hse.gov.uk/construction/safetytopics/electrical.htm', '_blank')}
                >
                  <Shield className="h-4 w-4 mr-3 text-blue-400 flex-shrink-0" />
                  <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white`}>HSE Electrical Safety</div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-purple-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.cipd.co.uk/knowledge/fundamentals/people/induction', '_blank')}
                >
                  <UserPlus className="h-4 w-4 mr-3 text-purple-400 flex-shrink-0" />
                  <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white`}>CIPD Induction Guide</div>
                </Button>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <h4 className={`font-medium text-amber-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Implementation Checklist</h4>
                <ul className={`space-y-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Create structured onboarding timeline</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Assign experienced mentors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Prepare welcome packs and documentation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Schedule regular feedback sessions</span>
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

export default OnboardingTab;
