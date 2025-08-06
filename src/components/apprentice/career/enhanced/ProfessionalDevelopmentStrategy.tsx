import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Target, 
  Users, 
  Briefcase, 
  Award, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  BookOpen,
  Network,
  Lightbulb,
  Building,
  GraduationCap
} from "lucide-react";

const ProfessionalDevelopmentStrategy = () => {
  const isMobile = useIsMobile();

  const developmentMetrics = [
    {
      metric: "CPD Hours Required",
      data: "30 hours annually for professionals",
      icon: <BookOpen className="h-5 w-5 text-blue-400" />,
      detail: "Mandatory for scheme membership maintenance"
    },
    {
      metric: "Network Growth Impact",
      data: "300% more opportunities",
      icon: <Network className="h-5 w-5 text-elec-yellow" />,
      detail: "Active professional networking increases career options"
    },
    {
      metric: "Mentorship Success Rate",
      data: "85% achieve career goals faster",
      icon: <Users className="h-5 w-5 text-green-400" />,
      detail: "With structured mentorship programmes"
    },
    {
      metric: "Leadership Premium",
      data: "£8,000-25,000 salary increase",
      icon: <Target className="h-5 w-5 text-purple-400" />,
      detail: "Management and leadership skills command higher salaries"
    }
  ];

  const continuingEducation = [
    {
      category: "Professional Qualifications",
      timeline: "Ongoing development",
      description: "Advanced qualifications for career progression and professional recognition",
      programmes: [
        {
          qualification: "HNC/HND Electrical Engineering",
          provider: "Universities and FE Colleges",
          duration: "2-3 years part-time",
          cost: "£3,000-6,000",
          careerImpact: "Supervisory and design roles, foundation for degree study",
          prerequisites: "Level 3 qualification and relevant experience"
        },
        {
          qualification: "BEng/MEng Electrical Engineering",
          provider: "Universities (full-time and part-time)",
          duration: "3-6 years",
          cost: "£9,000+ per year",
          careerImpact: "Engineering roles, chartered engineer pathway, management positions",
          prerequisites: "A-levels or equivalent, HND for direct entry to year 2/3"
        },
        {
          qualification: "Project Management (APM/PRINCE2)",
          provider: "Professional training organisations",
          duration: "3-6 months",
          cost: "£2,000-4,000",
          careerImpact: "Project leadership roles, contractor management, higher responsibility",
          prerequisites: "Relevant experience and employer support"
        }
      ]
    },
    {
      category: "Professional Certifications",
      timeline: "Annual renewals",
      description: "Industry-specific certifications maintaining professional competence",
      programmes: [
        {
          qualification: "IET Professional Registration (IEng/CEng)",
          provider: "Institution of Engineering and Technology",
          duration: "Application process 6-12 months",
          cost: "£200-500 application + annual fees",
          careerImpact: "Professional recognition, chartered status, enhanced credibility",
          prerequisites: "Appropriate qualifications and demonstrated competence"
        },
        {
          qualification: "Scheme Provider Assessment (AP/QS)",
          provider: "NICEIC, NAPIT, STROMA",
          duration: "Assessment process 3-6 months",
          cost: "£800-2,000 annually",
          careerImpact: "Business development, self-certification rights, customer confidence",
          prerequisites: "Relevant qualifications and business registration"
        },
        {
          qualification: "Specialist Manufacturer Certifications",
          provider: "Equipment manufacturers",
          duration: "1-5 days per course",
          cost: "£500-2,000 per certification",
          careerImpact: "Specialist installation rights, warranty approvals, premium rates",
          prerequisites: "Basic electrical qualifications and experience"
        }
      ]
    }
  ];

  const networkingStrategy = [
    {
      strategy: "Professional Bodies Engagement",
      timeCommitment: "2-4 hours monthly",
      description: "Active participation in professional institutions and trade organisations",
      activities: [
        "Join IET local network and attend monthly meetings",
        "Participate in SELECT or ECA regional events and workshops",
        "Attend annual conferences and exhibition visits",
        "Volunteer for committee roles and working groups"
      ],
      careerBenefits: "Industry insights, technical updates, career opportunities, professional credibility",
      networkingValue: "Connect with senior professionals, potential employers, and industry leaders",
      costs: "£150-400 annual membership plus event costs"
    },
    {
      strategy: "Industry Events & Exhibitions",
      timeCommitment: "1-2 days quarterly",
      description: "Strategic attendance at key industry events for learning and networking",
      activities: [
        "Visit Electrical Wholesale Show and regional trade exhibitions",
        "Attend manufacturer product launches and technical seminars", 
        "Participate in skills competitions and apprentice showcases",
        "Join trade publication reader events and networking sessions"
      ],
      careerBenefits: "Product knowledge, market trends, supplier relationships, business opportunities",
      networkingValue: "Meet potential clients, suppliers, partners, and learn from competitors",
      costs: "£500-2,000 annually including travel and accommodation"
    },
    {
      strategy: "Mentorship & Knowledge Sharing",
      timeCommitment: "1-2 hours weekly",
      description: "Structured learning relationships with experienced professionals",
      activities: [
        "Find experienced mentor through professional bodies or employer",
        "Join or create peer learning groups with other apprentices",
        "Participate in reverse mentoring with senior professionals",
        "Share knowledge through presentations and training sessions"
      ],
      careerBenefits: "Accelerated learning, career guidance, skill development, confidence building",
      networkingValue: "Build long-term professional relationships and industry advocacy",
      costs: "Time investment, potential training course fees"
    }
  ];

  const leadershipDevelopment = [
    {
      category: "Team Leadership Skills",
      developmentAreas: [
        {
          skill: "Communication & Interpersonal Skills",
          description: "Effective communication with teams, clients, and stakeholders",
          developmentPath: "Communication courses → Practice in team settings → 360-degree feedback",
          businessImpact: "Improved team performance, better client relationships, reduced conflicts"
        },
        {
          skill: "Project Planning & Coordination",
          description: "Managing electrical projects from inception to completion",
          developmentPath: "Project management training → Lead small projects → Formal qualification",
          businessImpact: "On-time delivery, budget control, quality outcomes, team efficiency"
        },
        {
          skill: "Problem Solving & Decision Making",
          description: "Analytical thinking and decisive action in complex situations",
          developmentPath: "Technical problem solving → Case study analysis → Leadership scenarios",
          businessImpact: "Faster issue resolution, better outcomes, increased team confidence"
        }
      ]
    },
    {
      category: "Business Management Capabilities",
      developmentAreas: [
        {
          skill: "Financial Management & Budgeting",
          description: "Understanding business finances, cost control, and profitability",
          developmentPath: "Finance for non-finance managers → Budgeting experience → Business planning",
          businessImpact: "Better project profitability, cost control, business growth planning"
        },
        {
          skill: "Health & Safety Leadership",
          description: "Creating and maintaining safe working environments",
          developmentPath: "IOSH Managing Safely → Risk assessment training → Safety culture development",
          businessImpact: "Reduced accidents, legal compliance, insurance benefits, team wellbeing"
        },
        {
          skill: "Quality Management Systems",
          description: "Implementing and maintaining quality standards and processes",
          developmentPath: "Quality management training → ISO standards awareness → Process improvement",
          businessImpact: "Consistent quality delivery, customer satisfaction, business efficiency"
        }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Target className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          Strategic professional development reduces career progression time by 50% and increases lifetime earning potential by £200,000+.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {developmentMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="continuing-education">
          <MobileAccordionTrigger icon={<GraduationCap className="h-5 w-5 text-blue-400" />}>
            Continuing Education & Advanced Qualifications
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {continuingEducation.map((category, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                    <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {category.timeline}
                    </Badge>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{category.description}</p>

                  <div className="space-y-3">
                    {category.programmes.map((programme, progIndex) => (
                      <div key={progIndex} className="bg-blue-500/5 border border-blue-500/20 rounded p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium text-blue-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{programme.qualification}</h5>
                          <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {programme.cost}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <h6 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Provider</h6>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{programme.provider}</p>
                          </div>
                          <div>
                            <h6 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Duration</h6>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{programme.duration}</p>
                          </div>
                        </div>

                        <div>
                          <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Career Impact</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{programme.careerImpact}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-amber-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Prerequisites</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200`}>{programme.prerequisites}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="networking-strategy">
          <MobileAccordionTrigger icon={<Network className="h-5 w-5 text-green-400" />}>
            Professional Networking & Industry Engagement
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {networkingStrategy.map((strategy, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.strategy}</h4>
                    <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {strategy.timeCommitment}
                    </Badge>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{strategy.description}</p>

                  <div>
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Activities</h5>
                    <ul className="space-y-1">
                      {strategy.activities.map((activity, actIndex) => (
                        <li key={actIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                      <h5 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Career Benefits</h5>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{strategy.careerBenefits}</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
                      <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Networking Value</h5>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{strategy.networkingValue}</p>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
                    <h5 className={`font-medium text-amber-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Investment Required</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200`}>{strategy.costs}</p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="leadership-development">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-purple-400" />}>
            Leadership & Management Development
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {leadershipDevelopment.map((category, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'} border-b border-purple-500/20 pb-1`}>
                    {category.category}
                  </h4>

                  <div className="space-y-3">
                    {category.developmentAreas.map((area, areaIndex) => (
                      <div key={areaIndex} className="bg-purple-500/5 border border-purple-500/20 rounded p-3 space-y-2">
                        <h5 className={`font-medium text-purple-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{area.skill}</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{area.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Development Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{area.developmentPath}</p>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                          <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{area.businessImpact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="development-planning">
          <MobileAccordionTrigger icon={<Lightbulb className="h-5 w-5 text-orange-400" />}>
            Personal Development Planning
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                <h4 className={`font-medium text-orange-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Strategic Career Development Framework</h4>
                
                <div className="space-y-3">
                  <div className="bg-orange-500/5 border border-orange-500/20 rounded p-3">
                    <h5 className={`font-medium text-orange-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Annual Development Planning</h5>
                    <ul className="space-y-1">
                      {[
                        "Set specific, measurable career objectives for the next 12 months",
                        "Identify required skills and knowledge gaps for target roles",
                        "Create learning schedule with formal and informal development activities",
                        "Establish mentorship relationships and professional networking goals"
                      ].map((item, index) => (
                        <li key={index} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-orange-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-500/5 border border-blue-500/20 rounded p-3">
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Progress Monitoring & Review</h5>
                    <ul className="space-y-1">
                      {[
                        "Quarterly review sessions with line manager or mentor",
                        "Document learning outcomes and evidence collection",
                        "Track completion of planned development activities",
                        "Adjust plans based on career opportunities and industry changes"
                      ].map((item, index) => (
                        <li key={index} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-blue-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/5 border border-green-500/20 rounded p-3">
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Portfolio Development</h5>
                    <ul className="space-y-1">
                      {[
                        "Maintain comprehensive CPD portfolio with evidence",
                        "Document project achievements and learning outcomes",
                        "Collect testimonials and feedback from colleagues and clients",
                        "Build professional online presence and thought leadership"
                      ].map((item, index) => (
                        <li key={index} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default ProfessionalDevelopmentStrategy;