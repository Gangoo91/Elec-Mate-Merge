import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Eye, 
  TrendingUp, 
  Target, 
  Award, 
  CheckCircle, 
  Clock, 
  Users,
  Lightbulb,
  BookOpen,
  GraduationCap,
  Building,
  Zap,
  Star,
  ArrowRight,
  Briefcase,
  Sparkles,
  TreePine,
  DollarSign,
  Network,
  Compass
} from "lucide-react";

const EnhancedCareerOverview = () => {
  const isMobile = useIsMobile();

  const careerMetrics = [
    {
      metric: "Average Progression Time",
      data: "3-5 years to senior level",
      icon: <Clock className="h-5 w-5 text-elec-yellow" />,
      detail: "From apprentice to fully qualified electrician"
    },
    {
      metric: "Salary Growth Potential", 
      data: "£18K to £45K+ per year",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      detail: "Based on experience and specialisation"
    },
    {
      metric: "Job Market Outlook",
      data: "15% growth by 2030",
      icon: <Target className="h-5 w-5 text-blue-400" />,
      detail: "Above average growth in electrical trades"
    },
    {
      metric: "Career Paths Available",
      data: "12+ distinct pathways",
      icon: <Award className="h-5 w-5 text-purple-400" />,
      detail: "From installation to engineering roles"
    }
  ];

  const progressionStages = [
    {
      stage: "Foundation Stage",
      duration: "6-18 months",
      level: "Entry Level",
      description: "Building core electrical knowledge and safety practices",
      keyMilestones: [
        "Complete Level 2 Electrical Installation course",
        "Understand basic circuit theory and Ohm's Law",
        "Master safe isolation procedures",
        "Learn fundamental wiring techniques",
        "Achieve 18th Edition BS 7671 certification"
      ],
      salaryRange: "£16,000 - £20,000",
      nextSteps: "Progress to apprenticeship or continue with Level 3 qualification"
    },
    {
      stage: "Development Stage", 
      duration: "2-3 years",
      level: "Intermediate",
      description: "Gaining practical experience and advanced installation skills",
      keyMilestones: [
        "Complete Level 3 Electrical Installation NVQ",
        "Pass AM2 practical assessment",
        "Gain 2+ years post-qualification experience",
        "Complete Inspection & Testing (2391) qualification",
        "Develop fault diagnosis skills"
      ],
      salaryRange: "£22,000 - £32,000",
      nextSteps: "Choose specialisation path or pursue supervisory roles"
    },
    {
      stage: "Specialisation Stage",
      duration: "2-4 years", 
      level: "Advanced",
      description: "Developing expertise in specific electrical disciplines",
      keyMilestones: [
        "Complete specialist training courses",
        "Gain manufacturer certifications",
        "Build portfolio of complex projects",
        "Develop leadership and mentoring skills",
        "Register with professional scheme (NICEIC/NAPIT)"
      ],
      salaryRange: "£30,000 - £42,000",
      nextSteps: "Advance to senior specialist, management, or contractor roles"
    },
    {
      stage: "Mastery Stage",
      duration: "3-5 years",
      level: "Expert",
      description: "Leading projects and developing others in the field",
      keyMilestones: [
        "Achieve senior electrician or supervisor status",
        "Complete management or business qualifications",
        "Mentor apprentices and junior electricians",
        "Lead complex installation projects",
        "Contribute to industry standards development"
      ],
      salaryRange: "£35,000 - £55,000+",
      nextSteps: "Electrical contractor, project management, or engineering roles"
    }
  ];

  const industryContext = [
    {
      title: "Digital Transformation",
      description: "Smart buildings, IoT systems, and automated controls are reshaping electrical work",
      impact: "High demand for tech-savvy electricians",
      icon: <Zap className="h-5 w-5 text-blue-400" />
    },
    {
      title: "Sustainability Focus",
      description: "Net-zero targets driving renewable energy adoption and energy efficiency measures",
      impact: "Growing opportunities in green technology",
      icon: <Lightbulb className="h-5 w-5 text-green-400" />
    },
    {
      title: "Infrastructure Investment",
      description: "Major investment in EV charging networks, grid modernisation, and housing",
      impact: "Sustained job creation across sectors",
      icon: <Building className="h-5 w-5 text-orange-400" />
    }
  ];

  const qualificationPathways = [
    {
      pathway: "Traditional Apprenticeship Route",
      duration: "3-4 years",
      structure: [
        "Level 2 Electrical Installation (18 months)",
        "Level 3 Electrical Installation NVQ (24 months)",
        "AM2 Assessment and Portfolio completion",
        "End Point Assessment (EPA)"
      ],
      advantages: [
        "Earn while you learn",
        "Comprehensive practical experience",
        "Mentorship from experienced professionals",
        "Direct pathway to employment"
      ]
    },
    {
      pathway: "Adult Career Change Route",
      duration: "12-24 months",
      structure: [
        "Intensive Level 2 & 3 courses (12 months)",
        "Work experience placement (6 months)",
        "Assessment and certification",
        "Job placement support"
      ],
      advantages: [
        "Accelerated learning for mature learners",
        "Recognition of prior experience",
        "Flexible study options",
        "Career change support services"
      ]
    },
    {
      pathway: "Higher Education Route",
      duration: "3-4 years",
      structure: [
        "HNC/HND in Electrical Engineering",
        "Degree Apprenticeship options",
        "Professional registration pathway",
        "Management development track"
      ],
      advantages: [
        "Academic depth and breadth",
        "Leadership preparation",
        "Research and innovation exposure",
        "Higher earning potential"
      ]
    }
  ];

  const professionalDevelopment = [
    {
      stage: "Early Career",
      focus: "Technical Competence",
      activities: [
        "Complete mandatory certifications (BS 7671, 2391)",
        "Gain experience across different electrical systems",
        "Develop diagnostic and problem-solving skills",
        "Build professional network through industry events"
      ]
    },
    {
      stage: "Mid Career",
      focus: "Specialisation & Leadership",
      activities: [
        "Choose specialisation area (renewable energy, industrial, etc.)",
        "Pursue advanced certifications and manufacturer training",
        "Develop project management and team leadership skills",
        "Consider business development or contracting"
      ]
    },
    {
      stage: "Senior Career",
      focus: "Innovation & Mentorship",
      activities: [
        "Lead complex projects and initiatives",
        "Mentor next generation of electricians",
        "Contribute to industry standards and best practices",
        "Explore entrepreneurship or consultancy opportunities"
      ]
    }
  ];

  const industrySectors = [
    {
      sector: "Residential & Domestic",
      growth: "Steady",
      opportunities: [
        "Smart home installations",
        "EV charging points",
        "Solar PV systems",
        "Home automation"
      ],
      salaryRange: "£25K - £40K"
    },
    {
      sector: "Commercial & Office",
      growth: "Growing",
      opportunities: [
        "Energy management systems",
        "LED lighting upgrades",
        "Emergency lighting compliance",
        "Data centre installations"
      ],
      salaryRange: "£30K - £45K"
    },
    {
      sector: "Industrial & Manufacturing",
      growth: "High",
      opportunities: [
        "Automation and robotics",
        "Process control systems",
        "Motor control and drives",
        "Predictive maintenance"
      ],
      salaryRange: "£35K - £55K"
    },
    {
      sector: "Renewable Energy",
      growth: "Very High",
      opportunities: [
        "Solar farm installations",
        "Wind turbine maintenance",
        "Battery storage systems",
        "Grid connection projects"
      ],
      salaryRange: "£32K - £52K"
    }
  ];

  const entrepreneurshipGuide = [
    {
      path: "Self-Employed Electrician",
      requirements: [
        "Minimum 3 years post-qualification experience (with relevant certifications)",
        "Comprehensive public liability insurance cover",
        "Professional scheme membership (NICEIC, NAPIT, or equivalent)",
        "Business registration with HMRC and proper accounting systems"
      ],
      earnings: "£30K - £60K+ dependent on client base and workload",
      considerations: [
        "Variable income during initial establishment period",
        "Personal responsibility for client acquisition and retention",
        "Essential business development and marketing capabilities required",
        "Significant initial investment in professional equipment and transport"
      ]
    },
    {
      path: "Electrical Contracting Business",
      requirements: [
        "Extensive industry experience with proven track record",
        "Business management qualifications or demonstrable skills",
        "Substantial capital investment for equipment, premises, and staff",
        "Established professional network and client relationships"
      ],
      earnings: "£40K - £100K+ scaling with business growth and market position",
      considerations: [
        "Elevated financial risk requiring careful business planning",
        "Full responsibility for staff recruitment, training, and management",
        "Complex regulatory and compliance obligations across multiple areas",
        "Significant potential for expansion but requires strategic planning"
      ]
    }
  ];

  const careerPathHighlights = [
    {
      path: "Domestic Installation Specialist",
      growth: "High demand",
      earning: "£25K - £40K",
      speciality: "Residential electrical systems, smart home technology",
      icon: <Building className="h-5 w-5 text-blue-400" />
    },
    {
      path: "Industrial Maintenance Engineer",
      growth: "Very high demand",
      earning: "£35K - £55K",
      speciality: "Complex machinery, PLC systems, fault diagnosis",
      icon: <Zap className="h-5 w-5 text-orange-400" />
    },
    {
      path: "Renewable Energy Technician",
      growth: "Rapidly growing",
      earning: "£30K - £50K",
      speciality: "Solar PV, wind systems, battery storage",
      icon: <Lightbulb className="h-5 w-5 text-green-400" />
    },
    {
      path: "Electrical Design Engineer",
      growth: "Stable growth", 
      earning: "£40K - £65K",
      speciality: "System design, CAD, project engineering",
      icon: <BookOpen className="h-5 w-5 text-purple-400" />
    }
  ];

  const advancementTips = [
    {
      category: "Skills Development",
      tips: [
        "Continuously update skills through courses and certifications",
        "Consider specialising in growth areas like renewable energy or smart systems",
        "Pursue additional qualifications like inspection and testing certification",
        "Gain experience across different sectors (domestic, commercial, industrial)"
      ]
    },
    {
      category: "Professional Development",
      tips: [
        "Join professional organisations like IET, ECA, or NICEIC",
        "Attend industry events and trade shows for networking",
        "Build relationships with suppliers and manufacturers",
        "Document your work and create a professional portfolio"
      ]
    },
    {
      category: "Business Skills",
      tips: [
        "Develop project management and leadership abilities",
        "Learn business fundamentals if considering self-employment",
        "Build strong communication and customer service skills",
        "Stay informed about industry regulations and standards"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Eye className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          The UK electrical industry offers diverse career paths with strong job security, competitive salaries, and opportunities for continuous professional growth.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {careerMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3 text-center space-y-2">
            {metric.icon}
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>{metric.metric}</div>
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.data}</div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="career-stages">
          <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-green-400" />}>
            Career Progression Stages
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-6">
            {progressionStages.map((stage, index) => (
              <div key={index} className="space-y-3">
                <div className="space-y-2">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{stage.stage}</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {stage.duration}
                    </Badge>
                    <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {stage.level}
                    </Badge>
                  </div>
                </div>
                
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{stage.description}</p>
                
                <div>
                  <h6 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Milestones</h6>
                  <ul className="space-y-1">
                    {stage.keyMilestones.map((milestone, milestoneIndex) => (
                      <li key={milestoneIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-2`}>
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                        {milestone}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-300 font-medium`}>Salary Range: </span>
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{stage.salaryRange}</span>
                </div>

                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-400" />
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{stage.nextSteps}</span>
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="career-paths">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-blue-400" />}>
            Popular Career Pathways
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
            {careerPathHighlights.map((path, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-3">
                  {path.icon}
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{path.path}</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-300 font-medium`}>Growth: </span>
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{path.growth}</span>
                  </div>
                  <div>
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-300 font-medium`}>Earning: </span>
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{path.earning}</span>
                  </div>
                </div>
                
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{path.speciality}</p>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="advancement-tips">
          <MobileAccordionTrigger icon={<GraduationCap className="h-5 w-5 text-purple-400" />}>
            Career Advancement Tips
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
            {advancementTips.map((section, index) => (
              <div key={index} className="space-y-3">
                <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{section.category}</h4>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-start gap-2`}>
                      <Star className="h-3 w-3 text-purple-400 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="industry-context">
          <MobileAccordionTrigger icon={<Sparkles className="h-5 w-5 text-orange-400" />}>
            Industry Context & Trends
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
            {industryContext.map((context, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-3">
                  {context.icon}
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{context.title}</h4>
                </div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{context.description}</p>
                <div className="space-y-2">
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-300 font-medium`}>Impact: </span>
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{context.impact}</span>
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="qualification-pathways">
          <MobileAccordionTrigger icon={<BookOpen className="h-5 w-5 text-indigo-400" />}>
            Qualification Pathways
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-6">
            {qualificationPathways.map((pathway, index) => (
              <div key={index} className="space-y-4">
                <div className="space-y-2">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{pathway.pathway}</h4>
                  <Badge variant="outline" className={`text-indigo-300 border-indigo-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Duration: {pathway.duration}
                  </Badge>
                </div>
                
                <div>
                  <h6 className={`font-medium text-indigo-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Structure</h6>
                  <ul className="space-y-1">
                    {pathway.structure.map((step, stepIndex) => (
                      <li key={stepIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-indigo-200 flex items-center gap-2`}>
                        <CheckCircle className="h-3 w-3 text-indigo-400 flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h6 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Advantages</h6>
                  <ul className="space-y-1">
                    {pathway.advantages.map((advantage, advantageIndex) => (
                      <li key={advantageIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-2`}>
                        <Star className="h-3 w-3 text-green-400 flex-shrink-0" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="professional-development">
          <MobileAccordionTrigger icon={<Network className="h-5 w-5 text-cyan-400" />}>
            Professional Development Journey
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
            {professionalDevelopment.map((stage, index) => (
              <div key={index} className="space-y-3">
                <div className="space-y-2">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{stage.stage}</h4>
                  <Badge variant="outline" className={`text-cyan-300 border-cyan-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Focus: {stage.focus}
                  </Badge>
                </div>
                
                <div>
                  <h6 className={`font-medium text-cyan-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Activities</h6>
                  <ul className="space-y-1">
                    {stage.activities.map((activity, activityIndex) => (
                      <li key={activityIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-200 flex items-start gap-2`}>
                        <ArrowRight className="h-3 w-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="industry-sectors">
          <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-teal-400" />}>
            Industry Sectors & Opportunities
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
            {industrySectors.map((sector, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{sector.sector}</h4>
                  <Badge variant="outline" className={`text-teal-300 border-teal-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {sector.growth}
                  </Badge>
                </div>
                
                <div>
                  <h6 className={`font-medium text-teal-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Growth Opportunities</h6>
                  <ul className="space-y-1">
                    {sector.opportunities.map((opportunity, oppIndex) => (
                      <li key={oppIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-teal-200 flex items-center gap-2`}>
                        <Lightbulb className="h-3 w-3 text-teal-400 flex-shrink-0" />
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-teal-300 font-medium`}>Salary Range: </span>
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-teal-200`}>{sector.salaryRange}</span>
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="entrepreneurship">
          <MobileAccordionTrigger icon={<Briefcase className="h-5 w-5 text-amber-400" />}>
            Entrepreneurship & Self-Employment
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-6">
            {entrepreneurshipGuide.map((path, index) => (
              <div key={index} className="space-y-4">
                <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{path.path}</h4>
                
                <div>
                  <h6 className={`font-medium text-amber-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Requirements</h6>
                  <ul className="space-y-1">
                    {path.requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200 flex items-center gap-2`}>
                        <CheckCircle className="h-3 w-3 text-amber-400 flex-shrink-0" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-300 font-medium`}>Potential Earnings: </span>
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200`}>{path.earnings}</span>
                </div>

                <div>
                  <h6 className={`font-medium text-orange-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Considerations</h6>
                  <ul className="space-y-1">
                    {path.considerations.map((consideration, consIndex) => (
                      <li key={consIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200 flex items-start gap-2`}>
                        <Compass className="h-3 w-3 text-orange-400 flex-shrink-0 mt-0.5" />
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default EnhancedCareerOverview;