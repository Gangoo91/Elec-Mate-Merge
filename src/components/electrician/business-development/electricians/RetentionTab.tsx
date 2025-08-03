
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  TrendingUp, 
  PoundSterling, 
  Heart, 
  Trophy, 
  Users, 
  Gift, 
  Clock, 
  Star,
  CheckCircle,
  Target,
  ExternalLink,
  BarChart3,
  AlertTriangle
} from "lucide-react";

const RetentionTab = () => {
  const isMobile = useIsMobile();

  // Employer-focused retention metrics
  const employerMetrics = [
    {
      metric: "Cost Savings",
      data: "5x cheaper to retain than recruit",
      icon: <PoundSterling className="h-5 w-5 text-green-400" />,
      detail: "Average saving of £15,000 per retained electrician"
    },
    {
      metric: "Target Turnover Rate", 
      data: "< 15% annual turnover",
      icon: <Target className="h-5 w-5 text-elec-yellow" />,
      detail: "Industry average is 18-25% annually"
    },
    {
      metric: "Employee Satisfaction",
      data: "> 4/5 satisfaction score",
      icon: <Heart className="h-5 w-5 text-blue-400" />,
      detail: "Strong predictor of retention and performance"
    },
    {
      metric: "Career Development ROI",
      data: "£3.50 return per £1 invested",
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      detail: "Training investment drives loyalty and productivity"
    }
  ];

  const retentionStrategies = [
    {
      category: "Compensation & Benefits",
      icon: <PoundSterling className="h-5 w-5" />,
      impact: "High",
      strategies: [
        "Competitive salary reviews and performance bonuses",
        "Company vehicle or travel allowance provision",
        "Comprehensive pension scheme contributions",
        "Private healthcare and insurance benefits",
        "Tool allowance and equipment provision"
      ]
    },
    {
      category: "Career Development",
      icon: <TrendingUp className="h-5 w-5" />,
      impact: "High",
      strategies: [
        "Clear progression pathways and promotion criteria",
        "Funded training and certification opportunities",
        "Mentorship programmes and skill development",
        "Cross-training in different electrical specialisations",
        "Leadership development for senior positions"
      ]
    },
    {
      category: "Work Environment",
      icon: <Heart className="h-5 w-5" />,
      impact: "Medium",
      strategies: [
        "Flexible working arrangements where possible",
        "Modern tools and safety equipment provision",
        "Regular team-building activities and social events",
        "Open communication and feedback culture",
        "Recognition and appreciation programmes"
      ]
    },
    {
      category: "Job Satisfaction",
      icon: <Trophy className="h-5 w-5" />,
      impact: "High",
      strategies: [
        "Variety in work assignments and project types",
        "Autonomy in decision-making and problem-solving",
        "Regular feedback and performance discussions",
        "Employee of the month recognition schemes",
        "Involvement in company decision-making processes"
      ]
    }
  ];

  const retentionFramework = [
    {
      strategy: "Proactive Retention Management",
      timeline: "Ongoing Process",
      description: "Implement systematic approach to identify and address retention risks before they become problems",
      components: [
        "Monthly one-to-one meetings with all team members",
        "Quarterly stay interviews to understand motivation factors",
        "Employee satisfaction surveys with action planning",
        "Regular compensation benchmarking against market rates",
        "Clear documentation of career development discussions"
      ],
      employerBenefit: "Reduce unexpected departures by 70% through early intervention",
      kpis: ["Employee satisfaction scores", "Stay interview feedback", "Exit interview data trends"]
    },
    {
      strategy: "Career Development Investment",
      timeline: "Long-term Growth",
      description: "Create clear pathways for professional and financial advancement within the company",
      components: [
        "Structured progression pathways from apprentice to senior roles",
        "Annual training budget allocation per electrician",
        "Support for advanced qualifications and certifications",
        "Internal mentoring programmes and knowledge sharing",
        "Leadership development opportunities for high performers"
      ],
      employerBenefit: "Increase employee retention by 60% and build internal expertise",
      kpis: ["Internal promotion rate", "Training completion rates", "Employee engagement scores"]
    },
    {
      strategy: "Competitive Advantage Package",
      timeline: "Market Leadership",
      description: "Position company as employer of choice through superior compensation and benefits",
      components: [
        "Above-market salary rates with transparent review process",
        "Comprehensive benefits package including health and pension",
        "Company vehicle provision and tool allowances",
        "Flexible working arrangements where operationally possible",
        "Profit-sharing or performance bonus schemes"
      ],
      employerBenefit: "Attract and retain top talent while building strong employer brand",
      kpis: ["Employee turnover rates", "Recruitment application quality", "Market positioning surveys"]
    }
  ];

  const warningSignsData = [
    {
      category: "Performance Changes",
      signs: ["Declining work quality", "Increased errors or mistakes", "Reduced productivity", "Missing deadlines"]
    },
    {
      category: "Behavioural Changes",
      signs: ["Increased absenteeism", "Less participation in meetings", "Reduced communication", "Appearing disengaged"]
    },
    {
      category: "Attitude Changes",
      signs: ["Negative comments about work", "Complaints about management", "Expressing job dissatisfaction", "Talking about other opportunities"]
    }
  ];

  const exitInterviewTopics = [
    "Primary reasons for leaving the company",
    "Satisfaction with compensation and benefits",
    "Quality of management and supervision",
    "Opportunities for career advancement",
    "Work-life balance and job satisfaction",
    "Training and development opportunities",
    "Company culture and team dynamics",
    "Suggestions for improvement"
  ];

  const retentionMetrics = [
    {
      metric: "Annual Turnover Rate",
      target: "< 15%",
      industry: "18-25%",
      description: "Percentage of electricians who leave annually"
    },
    {
      metric: "Average Tenure",
      target: "> 3 years",
      industry: "2.5 years",
      description: "Average length of employment for electricians"
    },
    {
      metric: "Internal Promotion Rate",
      target: "> 30%",
      industry: "25%",
      description: "Percentage of senior positions filled internally"
    },
    {
      metric: "Employee Satisfaction",
      target: "> 4/5",
      industry: "3.5/5",
      description: "Average satisfaction score from surveys"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <TrendingUp className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Retaining skilled electricians is 5x more cost-effective than recruiting and drives 40% higher productivity.
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
        <MobileAccordionItem value="strategies">
          <MobileAccordionTrigger icon={<Trophy className="h-5 w-5 text-blue-400" />}>
            Retention Strategies
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {retentionFramework.map((framework, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{framework.strategy}</h4>
                      <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {framework.timeline}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{framework.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Components</h5>
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

        <MobileAccordionItem value="categories">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-purple-400" />}>
            Strategy Categories
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {retentionStrategies.map((category, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                    </div>
                    <Badge variant="outline" className={`${
                      category.impact === 'High' ? 'text-green-300 border-green-400/30' :
                      'text-yellow-300 border-yellow-400/30'
                    } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {category.impact} Impact
                    </Badge>
                  </div>
                  <ul className="space-y-1">
                    {category.strategies.map((strategy, strategyIndex) => (
                      <li key={strategyIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-center gap-1`}>
                        <CheckCircle className="h-3 w-3 text-purple-400 flex-shrink-0" />
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="warning">
          <MobileAccordionTrigger icon={<AlertTriangle className="h-5 w-5 text-orange-400" />}>
            Early Warning Signs
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  {warningSignsData.map((category, index) => (
                    <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-2">
                      <h5 className={`font-medium text-orange-200 ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h5>
                      <ul className="space-y-1">
                        {category.signs.map((sign, signIndex) => (
                          <li key={signIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100 flex items-center gap-1`}>
                            <AlertTriangle className="h-3 w-3 text-orange-400 flex-shrink-0" />
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="border border-purple-500/20 rounded-lg p-3 space-y-2">
                  <h5 className={`font-medium text-purple-200 ${isMobile ? 'text-sm' : 'text-base'}`}>Exit Interview Topics</h5>
                  <ul className="space-y-1">
                    {exitInterviewTopics.map((topic, index) => (
                      <li key={index} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-100 flex items-center gap-1`}>
                        <Star className="h-3 w-3 text-purple-400 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="metrics">
          <MobileAccordionTrigger icon={<BarChart3 className="h-5 w-5 text-green-400" />}>
            Success Metrics
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {retentionMetrics.map((metric, index) => (
                  <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-2">
                    <h5 className={`font-medium text-green-200 ${isMobile ? 'text-sm' : 'text-base'}`}>{metric.metric}</h5>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-100`}>Target: <span className="font-medium">{metric.target}</span></div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-100`}>Industry: <span className="font-medium">{metric.industry}</span></div>
                      </div>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-100`}>{metric.description}</p>
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
                  onClick={() => window.open('https://www.cipd.co.uk/knowledge/fundamentals/people/employee-retention', '_blank')}
                >
                  <Heart className="h-4 w-4 mr-3 text-green-400 flex-shrink-0" />
                  <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white`}>CIPD Retention Guide</div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-blue-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.gov.uk/browse/employing-people', '_blank')}
                >
                  <Users className="h-4 w-4 mr-3 text-blue-400 flex-shrink-0" />
                  <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white`}>Employment Law Guidance</div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-purple-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.glassdoor.co.uk/employers/', '_blank')}
                >
                  <Trophy className="h-4 w-4 mr-3 text-purple-400 flex-shrink-0" />
                  <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white`}>Employer Brand Building</div>
                </Button>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <h4 className={`font-medium text-amber-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Quick Win Actions</h4>
                <ul className={`space-y-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Conduct stay interviews with key team members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Review and benchmark compensation packages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Implement employee recognition programme</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Create clear career development pathways</span>
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

export default RetentionTab;
