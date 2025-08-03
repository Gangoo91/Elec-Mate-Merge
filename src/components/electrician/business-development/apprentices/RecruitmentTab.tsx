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
  Award
} from "lucide-react";

const RecruitmentTab = () => {
  const isMobile = useIsMobile();

  // Updated for 2025 - Employer-focused recruitment data with modern digital channels
  const employerMetrics = [
    {
      metric: "Average Time to Hire",
      data: "6-8 weeks for quality candidates",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Including pre-screening, interviews, and reference checks"
    },
    {
      metric: "First-Year Investment ROI",
      data: "£7.50 return per £1 invested",
      icon: <TrendingUp className="h-5 w-5 text-elec-yellow" />,
      detail: "With government incentives and proper training structure"
    },
    {
      metric: "Recruitment Success Rate",
      data: "85% completion with structured hiring",
      icon: <Target className="h-5 w-5 text-green-400" />,
      detail: "Proper screening increases apprentice retention significantly"
    },
    {
      metric: "Cost Per Quality Hire",
      data: "£1,200-2,500 total investment",
      icon: <PoundSterling className="h-5 w-5 text-purple-400" />,
      detail: "Including advertising, assessment, and onboarding costs"
    }
  ];

  const digitalChannels = [
    {
      channel: "Government Digital Gateway",
      platforms: [
        {
          name: "Find an Apprenticeship (Gov.uk)",
          description: "Primary government recruitment portal",
          features: ["Automated matching", "Built-in messaging", "Application tracking"],
          cost: "Free",
          benefits: "Access to motivated candidates, government-backed credibility"
        },
        {
          name: "Apprenticeship Service Portal",
          description: "Employer dashboard for managing vacancies",
          features: ["Vacancy management", "Candidate screening", "Provider linking"],
          cost: "Free",
          benefits: "Integrated training provider connection, streamlined process"
        }
      ]
    },
    {
      channel: "Social Media & Professional Networks",
      platforms: [
        {
          name: "LinkedIn Business",
          description: "Professional networking and targeted advertising",
          features: ["Skills-based targeting", "Company page promotion", "InMail messaging"],
          cost: "£150-400/month",
          benefits: "Quality professional candidates, employer branding"
        },
        {
          name: "TikTok For Business",
          description: "Gen Z recruitment through authentic content",
          features: ["Video job postings", "Behind-scenes content", "Apprentice testimonials"],
          cost: "£200-500/month",
          benefits: "Reach younger demographics, showcase company culture"
        }
      ]
    }
  ];

  const modernRecruitmentStrategy = [
    {
      strategy: "Digital-First Approach",
      timeline: "2025 Best Practice",
      description: "Leverage digital platforms to reach and engage modern apprentice candidates",
      components: [
        "Social media presence showcasing apprentice success stories",
        "Video content demonstrating day-in-the-life experiences",
        "Interactive online application process with skills assessments",
        "Virtual open days and workplace tours"
      ],
      employerBenefit: "Attract tech-savvy candidates and reduce recruitment timeline by 30%",
      kpis: ["Application quality score", "Time to shortlist", "Candidate engagement rate"]
    },
    {
      strategy: "Partnership Ecosystem",
      timeline: "Ongoing Relationship Building",
      description: "Build strategic partnerships with education providers and community organisations",
      components: [
        "College partnership agreements for direct referrals",
        "School career day participation and sponsorship",
        "Community group engagement (scouts, cadets, sports clubs)",
        "Industry events and apprenticeship fairs presence"
      ],
      employerBenefit: "Lower cost per hire and higher quality candidates through trusted referrals",
      kpis: ["Partner referral rate", "Candidate quality scores", "Long-term relationships"]
    },
    {
      strategy: "Employer Brand Development",
      timeline: "6-Month Brand Building",
      description: "Establish company as an employer of choice for apprentices",
      components: [
        "Professional company website with apprentice section",
        "Google My Business optimisation for local recruitment",
        "Employee testimonials and success story content",
        "Industry awards and certification displays"
      ],
      employerBenefit: "Reduce advertising costs as candidates seek you out directly",
      kpis: ["Direct application rate", "Brand recognition", "Referral percentage"]
    }
  ];

  const selectionFramework = [
    {
      stage: "Digital Pre-Screening",
      timing: "Week 1-2",
      description: "Modern assessment tools to identify potential before face-to-face meetings",
      components: [
        "Online skills assessment (basic maths, safety awareness)",
        "Video introduction submissions",
        "Digital portfolio review (school projects, interests)",
        "Availability and commitment verification"
      ],
      employerView: "Filter 60-80% of applications efficiently, saving time on unsuitable candidates",
      successTips: ["Set clear pass marks", "Use consistent scoring", "Provide feedback to all applicants"]
    },
    {
      stage: "Structured Interview Process",
      timing: "Week 3",
      description: "Competency-based interviews focusing on potential and attitude",
      components: [
        "Core competency assessment (communication, problem-solving)",
        "Practical skills demonstration (basic hand tools, following instructions)",
        "Scenario-based questions (safety situations, teamwork)",
        "Career aspirations and commitment discussion"
      ],
      employerView: "Identify candidates with highest success probability and cultural fit",
      successTips: ["Use scoring matrix", "Include team members in process", "Check references thoroughly"]
    },
    {
      stage: "Final Selection & Onboarding",
      timing: "Week 4-5",
      description: "Comprehensive background checks and onboarding preparation",
      components: [
        "Enhanced DBS check and right to work verification",
        "Medical fitness assessment for electrical work",
        "Training provider liaison and enrollment",
        "Workplace induction planning and mentor assignment"
      ],
      employerView: "Ensure compliance and set apprentice up for success from day one",
      successTips: ["Plan first month in detail", "Assign experienced mentor", "Set clear expectations"]
    }
  ];

  const costInvestmentAnalysis = [
    {
      category: "Initial Recruitment Investment",
      costs: [
        { item: "Job advertising (multi-platform)", amount: "£800-1,500", timeframe: "Per campaign" },
        { item: "Assessment tools and platforms", amount: "£300-600", timeframe: "Annual subscription" },
        { item: "Interview time and resources", amount: "£400-800", timeframe: "Per successful hire" },
        { item: "Background checks and medical", amount: "£200-400", timeframe: "Per hire" }
      ],
      total: "£1,700-3,300 per successful apprentice hire"
    },
    {
      category: "Government Support Available",
      incentives: [
        { item: "Apprentice hiring incentive (16-18)", amount: "£3,000", eligibility: "Per apprentice (2025)" },
        { item: "Small employer additional support", amount: "£1,000", eligibility: "Companies <50 employees" },
        { item: "Training cost coverage", amount: "95-100%", eligibility: "Government co-investment" },
        { item: "Apprenticeship levy offset", amount: "£15,000", eligibility: "Annual levy credit" }
      ],
      netBenefit: "Often results in net positive recruitment ROI"
    }
  ];

  if (isMobile) {
    return (
      <div className="space-y-4">
        <Alert className="border-green-500/50 bg-green-500/10">
          <Users className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-200">
            Strategic recruitment reduces time-to-hire by 40% and increases apprentice completion rates to 85%+.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-2 gap-3">
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
          <MobileAccordionItem value="strategy">
            <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-blue-400" />}>
              2025 Recruitment Strategy
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                {modernRecruitmentStrategy.map((strategy, index) => (
                  <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white text-sm">{strategy.strategy}</h4>
                        <Badge variant="outline" className="text-blue-300 border-blue-400/30 text-xs">
                          {strategy.timeline}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{strategy.description}</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-blue-300 mb-2 text-xs">Implementation Components</h5>
                      <ul className="space-y-1">
                        {strategy.components.map((component, compIndex) => (
                          <li key={compIndex} className="text-xs text-blue-200 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {component}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                      <h5 className="font-medium text-green-300 mb-1 text-xs">Business Impact</h5>
                      <p className="text-xs text-green-200">{strategy.employerBenefit}</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-purple-300 mb-1 text-xs">Key Performance Indicators</h5>
                      <div className="flex flex-wrap gap-1">
                        {strategy.kpis.map((kpi, kpiIndex) => (
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

          <MobileAccordionItem value="channels">
            <MobileAccordionTrigger icon={<Brain className="h-5 w-5 text-purple-400" />}>
              Digital Recruitment Channels
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                {digitalChannels.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-medium text-purple-300 text-sm border-b border-purple-500/20 pb-1">
                      {category.channel}
                    </h4>
                    {category.platforms.map((platform, platformIndex) => (
                      <div key={platformIndex} className="border border-purple-500/20 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-white text-sm">{platform.name}</h5>
                          <Badge variant="outline" className="text-purple-300 border-purple-400/30 text-xs">
                            {platform.cost}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{platform.description}</p>
                        
                        <div>
                          <h6 className="font-medium text-purple-300 mb-1 text-xs">Features</h6>
                          <div className="flex flex-wrap gap-1">
                            {platform.features.map((feature, featureIndex) => (
                              <Badge key={featureIndex} variant="outline" className="text-purple-200 border-purple-400/20 text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                          <p className="text-xs text-green-200">{platform.benefits}</p>
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
                        <h4 className="font-medium text-white text-sm">{stage.stage}</h4>
                        <Badge variant="outline" className="text-green-300 border-green-400/30 text-xs">
                          {stage.timing}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{stage.description}</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-green-300 mb-2 text-xs">Assessment Components</h5>
                      <ul className="space-y-1">
                        {stage.components.map((component, compIndex) => (
                          <li key={compIndex} className="text-xs text-green-200 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {component}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                      <h5 className="font-medium text-blue-300 mb-1 text-xs">Employer Benefits</h5>
                      <p className="text-xs text-blue-200">{stage.employerView}</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-amber-300 mb-1 text-xs">Success Tips</h5>
                      <ul className="space-y-1">
                        {stage.successTips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-xs text-amber-200 flex items-center gap-1">
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
                    <h4 className="font-medium text-white text-sm">{category.category}</h4>
                    
                    {category.costs && (
                      <div>
                        <h5 className="font-medium text-orange-300 mb-2 text-xs">Cost Breakdown</h5>
                        <div className="space-y-2">
                          {category.costs.map((cost, costIndex) => (
                            <div key={costIndex} className="flex justify-between items-center text-xs">
                              <span className="text-orange-200">{cost.item}</span>
                              <div className="text-right">
                                <div className="text-orange-300 font-medium">{cost.amount}</div>
                                <div className="text-orange-400/60">{cost.timeframe}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {category.total && (
                          <div className="mt-3 pt-2 border-t border-orange-500/20">
                            <div className="flex justify-between items-center text-sm font-medium">
                              <span className="text-orange-300">Total Investment</span>
                              <span className="text-orange-400">{category.total}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {category.incentives && (
                      <div>
                        <h5 className="font-medium text-green-300 mb-2 text-xs">Available Support</h5>
                        <div className="space-y-2">
                          {category.incentives.map((incentive, incentiveIndex) => (
                            <div key={incentiveIndex} className="flex justify-between items-center text-xs">
                              <span className="text-green-200">{incentive.item}</span>
                              <div className="text-right">
                                <div className="text-green-300 font-medium">{incentive.amount}</div>
                                <div className="text-green-400/60">{incentive.eligibility}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {category.netBenefit && (
                          <div className="mt-3 pt-2 border-t border-green-500/20">
                            <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                              <p className="text-xs text-green-200 font-medium">{category.netBenefit}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
                  <h4 className="font-medium text-elec-yellow mb-2 text-sm">ROI Summary</h4>
                  <p className="text-xs text-elec-yellow/80">
                    With strategic recruitment and government incentives, quality apprentice hiring 
                    typically shows positive ROI within 12-18 months, with significant long-term value.
                  </p>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="resources">
            <MobileAccordionTrigger icon={<ExternalLink className="h-5 w-5 text-indigo-400" />}>
              Essential Resources
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-indigo-300 text-sm border-b border-indigo-500/20 pb-1">
                    Government & Official Resources
                  </h4>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-blue-500/30 text-left h-auto p-3"
                    onClick={() => window.open('https://www.apprenticeships.gov.uk/', '_blank')}
                  >
                    <FileText className="h-4 w-4 mr-3 text-blue-400 flex-shrink-0" />
                    <div className="text-left flex-1 min-w-0">
                      <div className="text-sm text-white truncate">Find an Apprenticeship</div>
                      <div className="text-xs text-muted-foreground break-words">Government recruitment portal and guidance</div>
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
                    onClick={() => window.open('https://www.apprenticeships.gov.uk/employers', '_blank')}
                  >
                    <Brain className="h-4 w-4 mr-3 text-purple-400 flex-shrink-0" />
                    <div className="text-left flex-1 min-w-0">
                      <div className="text-sm text-white truncate">Employer Apprenticeship Service</div>
                      <div className="text-xs text-muted-foreground break-words">Manage vacancies and funding</div>
                    </div>
                  </Button>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                  <h4 className="font-medium text-amber-300 mb-2 text-sm">Next Steps</h4>
                  <ul className="space-y-1 text-xs">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-amber-400" />
                      <span className="text-amber-200">Register on Find an Apprenticeship portal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-amber-400" />
                      <span className="text-amber-200">Contact local training providers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-amber-400" />
                      <span className="text-amber-200">Develop employer brand presence</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-amber-400" />
                      <span className="text-amber-200">Plan selection process and criteria</span>
                    </li>
                  </ul>
                </div>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>
      </div>
    );
  }

  // Desktop view fallback (keeping existing structure for now)
  return (
    <div className="space-y-6">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Users className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          <strong>2025 Update:</strong> Strategic digital recruitment increases candidate quality by 45% and reduces time-to-hire significantly.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {employerMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                {metric.icon}
                <div>
                  <div className="text-sm font-medium text-white">{metric.metric}</div>
                  <div className="text-xs text-muted-foreground">{metric.data}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-muted-foreground">
        <p>Switch to mobile view for the enhanced recruitment framework experience.</p>
      </div>
    </div>
  );
};

export default RecruitmentTab;