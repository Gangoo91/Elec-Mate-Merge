
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Users, 
  Search, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Calculator, 
  PoundSterling, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Shield, 
  Clock,
  Eye,
  BarChart3,
  Brain,
  Award,
  Briefcase,
  Building,
  UserCheck
} from "lucide-react";

const RecruitmentTab = () => {
  const isMobile = useIsMobile();

  // Employer-focused recruitment data for qualified electricians
  const employerMetrics = [
    {
      metric: "Average Time to Hire",
      data: "4-6 weeks for quality candidates",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Including advertising, screening, interviews, and references"
    },
    {
      metric: "Recruitment Investment ROI",
      data: "£8.20 return per £1 invested",
      icon: <TrendingUp className="h-5 w-5 text-elec-yellow" />,
      detail: "Quality hires reduce turnover and increase productivity"
    },
    {
      metric: "Successful Hire Rate",
      data: "75% retention at 12 months",
      icon: <Target className="h-5 w-5 text-green-400" />,
      detail: "With proper screening and competitive packages"
    },
    {
      metric: "Cost Per Quality Hire",
      data: "£2,500-4,500 total investment",
      icon: <PoundSterling className="h-5 w-5 text-purple-400" />,
      detail: "Including advertising, agency fees, and onboarding"
    }
  ];

  const digitalChannels = [
    {
      channel: "Professional Trade Platforms",
      platforms: [
        {
          name: "ElectricalJobs.com",
          description: "Leading specialist electrical recruitment platform",
          features: ["Skills-based matching", "Qualification verification", "Salary benchmarking"],
          cost: "£300-600/post",
          benefits: "Access to pre-qualified, industry-specific candidates"
        },
        {
          name: "LinkedIn Professional",
          description: "Target qualified electricians with proven experience",
          features: ["Advanced targeting", "Company showcase", "Professional messaging"],
          cost: "£200-500/month",
          benefits: "Reach passive candidates and build employer brand"
        }
      ]
    },
    {
      channel: "Industry Networks & Associations",
      platforms: [
        {
          name: "Trade Association Networks",
          description: "ECA, NICEIC, NAPIT member networks",
          features: ["Member directories", "Event networking", "Referral systems"],
          cost: "£100-300/year",
          benefits: "Access to verified, qualified professionals"
        },
        {
          name: "Specialist Recruitment Agencies",
          description: "Electrical trade recruitment specialists",
          features: ["Pre-screened candidates", "Temporary-to-permanent", "Skills assessment"],
          cost: "15-25% of salary",
          benefits: "Immediate access to quality candidates with guarantees"
        }
      ]
    }
  ];

  const modernRecruitmentStrategy = [
    {
      strategy: "Professional Brand Development",
      timeline: "Ongoing Excellence",
      description: "Position your company as the preferred employer for skilled electricians",
      components: [
        "Professional website showcasing projects and team culture",
        "Google My Business optimisation with project galleries",
        "Industry award applications and certifications display",
        "Client testimonials highlighting team expertise"
      ],
      employerBenefit: "Reduce recruitment costs by 40% as quality candidates approach you directly",
      kpis: ["Direct application rate", "Brand recognition score", "Employee referral percentage"]
    },
    {
      strategy: "Competitive Compensation Strategy",
      timeline: "Market-Leading Packages",
      description: "Attract top talent with competitive and comprehensive benefit packages",
      components: [
        "Annual salary benchmarking against local market rates",
        "Comprehensive benefits package (van, tools, pension, healthcare)",
        "Performance bonuses and overtime premium rates",
        "Career progression pathways and training opportunities"
      ],
      employerBenefit: "Attract higher-quality candidates and reduce turnover by 50%",
      kpis: ["Application quality scores", "Candidate acceptance rate", "Employee retention"]
    },
    {
      strategy: "Network-Based Recruitment",
      timeline: "Relationship Building",
      description: "Leverage professional networks and industry connections",
      components: [
        "Trade association active membership and networking",
        "Supplier and contractor relationship leverage",
        "Employee referral programmes with attractive incentives",
        "Industry event participation and sponsorship"
      ],
      employerBenefit: "Access to pre-vetted candidates through trusted referrals",
      kpis: ["Network referral rate", "Quality of referred candidates", "Cost per hire reduction"]
    }
  ];

  const selectionFramework = [
    {
      stage: "Skills & Qualification Verification",
      timing: "Week 1-2",
      description: "Comprehensive assessment of technical competency and certification",
      components: [
        "Qualification verification (18th Edition, AM2, etc.)",
        "Experience portfolio review and project examples",
        "Reference checks with previous employers",
        "Right to work and DBS background verification"
      ],
      employerView: "Ensure candidates meet essential requirements before investing interview time",
      successTips: ["Use standardised scoring criteria", "Verify all qualifications directly", "Check recent project experience"]
    },
    {
      stage: "Technical Assessment & Interview",
      timing: "Week 2-3",
      description: "Practical evaluation of technical skills and cultural fit",
      components: [
        "Practical fault-finding exercise using real scenarios",
        "Technical knowledge interview covering regulations and safety",
        "Problem-solving scenarios relevant to your work type",
        "Team fit assessment and communication skills evaluation"
      ],
      employerView: "Identify candidates who can deliver quality work and integrate effectively",
      successTips: ["Include team members in assessment", "Use job-relevant scenarios", "Assess both technical and soft skills"]
    },
    {
      stage: "Final Selection & Onboarding",
      timing: "Week 3-4",
      description: "Complete due diligence and structured onboarding preparation",
      components: [
        "Final reference checks and employer verification",
        "Medical assessment for electrical work fitness",
        "Negotiation of terms and comprehensive job offer",
        "Structured onboarding plan with mentor assignment"
      ],
      employerView: "Ensure smooth transition and set new hire up for long-term success",
      successTips: ["Plan first month meticulously", "Assign experienced mentor", "Set clear performance expectations"]
    }
  ];

  const costInvestmentAnalysis = [
    {
      category: "Recruitment Investment Breakdown",
      costs: [
        { item: "Professional job board advertising", amount: "£800-1,500", timeframe: "Per campaign" },
        { item: "Recruitment agency fees (if used)", amount: "£5,000-12,500", timeframe: "Per successful hire" },
        { item: "Assessment and interview resources", amount: "£300-600", timeframe: "Per hire process" },
        { item: "Background checks and verification", amount: "£200-400", timeframe: "Per successful hire" }
      ],
      total: "£1,300-2,500 direct recruitment (£6,300-15,000 with agency)"
    },
    {
      category: "Return on Investment Factors",
      benefits: [
        { item: "Reduced training time (qualified electrician)", amount: "£2,000-4,000", benefit: "Immediate productivity" },
        { item: "Lower supervision requirements", amount: "£1,500-3,000", benefit: "Management time savings" },
        { item: "Quality work reduces call-backs", amount: "£1,000-2,500", benefit: "Reputation protection" },
        { item: "Customer satisfaction and retention", amount: "£3,000-8,000", benefit: "Ongoing revenue" }
      ],
      netBenefit: "Quality recruitment pays for itself within 2-3 months"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Users className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          Quality electrician recruitment reduces project delays by 60% and increases customer satisfaction ratings significantly.
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
        <MobileAccordionItem value="strategy">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-blue-400" />}>
            Recruitment Strategy
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {modernRecruitmentStrategy.map((strategy, index) => (
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
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Components</h5>
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
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{strategy.employerBenefit}</p>
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

        <MobileAccordionItem value="channels">
          <MobileAccordionTrigger icon={<Brain className="h-5 w-5 text-purple-400" />}>
            Digital Recruitment Channels
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {digitalChannels.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium text-purple-300 ${isMobile ? 'text-sm' : 'text-base'} border-b border-purple-500/20 pb-1`}>
                    {category.channel}
                  </h4>
                  {category.platforms.map((platform, platformIndex) => (
                    <div key={platformIndex} className="border border-purple-500/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{platform.name}</h5>
                        <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {platform.cost}
                        </Badge>
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{platform.description}</p>
                      
                      <div>
                        <h6 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Features</h6>
                        <div className="flex flex-wrap gap-1">
                          {platform.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="outline" className={`text-purple-200 border-purple-400/20 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{platform.benefits}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="selection">
          <MobileAccordionTrigger icon={<Search className="h-5 w-5 text-green-400" />}>
            Selection Framework
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {selectionFramework.map((stage, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{stage.stage}</h4>
                      <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {stage.timing}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{stage.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Assessment Components</h5>
                    <ul className="space-y-1">
                      {stage.components.map((component, compIndex) => (
                        <li key={compIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                    <h5 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Employer Benefits</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{stage.employerView}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-amber-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Success Tips</h5>
                    <ul className="space-y-1">
                      {stage.successTips.map((tip, tipIndex) => (
                        <li key={tipIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200 flex items-center gap-1`}>
                          <Award className="h-3 w-3 text-amber-400 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="investment">
          <MobileAccordionTrigger icon={<PoundSterling className="h-5 w-5 text-orange-400" />}>
            Investment Analysis
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {costInvestmentAnalysis.map((category, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                  
                  {category.costs && (
                    <div>
                      <h5 className={`font-medium text-orange-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Cost Breakdown</h5>
                      <div className="space-y-2">
                        {category.costs.map((cost, costIndex) => (
                          <div key={costIndex} className="flex justify-between items-center p-2 bg-orange-500/10 rounded">
                            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{cost.item}</span>
                            <div className="text-right">
                              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-orange-300`}>{cost.amount}</div>
                              <div className="text-xs text-orange-400">{cost.timeframe}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 p-2 bg-orange-500/20 rounded">
                        <div className={`${isMobile ? 'text-sm' : 'text-base'} font-medium text-orange-200`}>
                          Total: {category.total}
                        </div>
                      </div>
                    </div>
                  )}

                  {category.benefits && (
                    <div>
                      <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Return on Investment</h5>
                      <div className="space-y-2">
                        {category.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex justify-between items-center p-2 bg-green-500/10 rounded">
                            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{benefit.item}</span>
                            <div className="text-right">
                              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-green-300`}>{benefit.amount}</div>
                              <div className="text-xs text-green-400">{benefit.benefit}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 p-2 bg-green-500/20 rounded">
                        <div className={`${isMobile ? 'text-sm' : 'text-base'} font-medium text-green-200`}>
                          {category.netBenefit}
                        </div>
                      </div>
                    </div>
                  )}
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
                  onClick={() => window.open('https://www.electricaljobs.com/', '_blank')}
                >
                  <Search className="h-4 w-4 mr-3 text-green-400 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white truncate`}>ElectricalJobs.com</div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground break-words`}>Specialist electrical recruitment platform</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-blue-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.eca.co.uk/', '_blank')}
                >
                  <Award className="h-4 w-4 mr-3 text-blue-400 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white truncate`}>ECA Member Network</div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground break-words`}>Access to qualified electrical contractors</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-purple-500/30 text-left h-auto p-3"
                  onClick={() => window.open('https://www.linkedin.com/business/talent/', '_blank')}
                >
                  <Users className="h-4 w-4 mr-3 text-purple-400 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className={`${isMobile ? 'text-sm' : 'text-base'} text-white truncate`}>LinkedIn Talent Solutions</div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground break-words`}>Professional recruitment tools</div>
                  </div>
                </Button>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <h4 className={`font-medium text-amber-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Next Steps</h4>
                <ul className={`space-y-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Define ideal candidate profile and requirements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Research local salary benchmarks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Develop compelling job descriptions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-200">Plan structured selection process</span>
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

export default RecruitmentTab;
