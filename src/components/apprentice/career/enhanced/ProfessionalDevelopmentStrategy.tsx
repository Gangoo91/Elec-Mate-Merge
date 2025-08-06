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
  GraduationCap,
  Shield,
  Brain,
  Globe,
  Smartphone,
  FileText,
  Calendar,
  MessageSquare,
  Star,
  Rocket,
  Zap,
  Heart,
  Coffee,
  Camera,
  PenTool,
  TrendingDown
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

  const digitalProfessionalismSkills = [
    {
      category: "Digital Communication & Collaboration",
      developmentAreas: [
        {
          skill: "Virtual Team Leadership",
          description: "Leading and managing teams in hybrid and remote working environments",
          developmentPath: "Remote leadership training → Virtual team projects → Digital collaboration tools mastery",
          businessImpact: "Improved team productivity, better remote project outcomes, increased team engagement"
        },
        {
          skill: "Digital Marketing & Social Presence",
          description: "Building professional online presence and marketing electrical services digitally",
          developmentPath: "Social media training → LinkedIn optimisation → Content creation → Customer engagement",
          businessImpact: "Increased brand visibility, more leads, enhanced professional reputation"
        },
        {
          skill: "Customer Relationship Management (CRM)",
          description: "Managing client relationships and business processes through digital systems",
          developmentPath: "CRM system training → Process mapping → Data analysis → Customer journey optimisation",
          businessImpact: "Better customer retention, increased repeat business, streamlined operations"
        }
      ]
    }
  ];

  const innovationEntrepreneurship = [
    {
      category: "Innovation & Technology Adoption",
      developmentAreas: [
        {
          skill: "Technology Scouting & Assessment",
          description: "Identifying and evaluating emerging technologies for business applications",
          developmentPath: "Tech trend analysis → Pilot project management → ROI assessment → Implementation planning",
          businessImpact: "Competitive advantage, improved efficiency, new revenue streams, future-proofing"
        },
        {
          skill: "Business Model Innovation",
          description: "Developing new approaches to electrical service delivery and value creation",
          developmentPath: "Business model canvas training → Market research → Pilot testing → Business plan development",
          businessImpact: "New revenue opportunities, market differentiation, business growth, scalability"
        },
        {
          skill: "Intellectual Property & Patents",
          description: "Understanding and protecting intellectual property in electrical innovations",
          developmentPath: "IP law basics → Patent searching → Innovation documentation → Legal consultation",
          businessImpact: "Protected innovations, licensing opportunities, competitive barriers, asset value"
        }
      ]
    }
  ];

  const sustainabilityESG = [
    {
      category: "Environmental Sustainability",
      developmentAreas: [
        {
          skill: "Carbon Footprint Assessment",
          description: "Measuring and reducing environmental impact of electrical installations",
          developmentPath: "Carbon accounting training → Lifecycle assessment → Reduction strategies → Reporting",
          businessImpact: "Compliance with regulations, cost savings, competitive differentiation, client attraction"
        },
        {
          skill: "Circular Economy Principles",
          description: "Implementing waste reduction and resource efficiency in electrical work",
          developmentPath: "Circular economy training → Waste audit → Process redesign → Supplier collaboration",
          businessImpact: "Reduced material costs, waste minimisation, enhanced reputation, regulatory compliance"
        },
        {
          skill: "Green Building Certification",
          description: "Understanding BREEAM, LEED and other green building standards",
          developmentPath: "Green building courses → Certification processes → Sustainable design → Performance monitoring",
          businessImpact: "Access to premium projects, higher value contracts, future market positioning"
        }
      ]
    }
  ];

  const wellbeingResilience = [
    {
      category: "Personal Wellbeing & Resilience",
      developmentAreas: [
        {
          skill: "Stress Management & Work-Life Balance",
          description: "Maintaining physical and mental health in demanding electrical work environments",
          developmentPath: "Stress management training → Mindfulness practice → Time management → Health monitoring",
          businessImpact: "Improved performance, reduced sick leave, better decision making, longer career longevity"
        },
        {
          skill: "Emotional Intelligence & Self-Awareness",
          description: "Understanding and managing emotions in professional interactions",
          developmentPath: "EQ assessment → Self-reflection practice → Feedback sessions → Relationship building",
          businessImpact: "Better team relationships, improved client communication, effective conflict resolution"
        },
        {
          skill: "Continuous Learning Mindset",
          description: "Developing adaptability and openness to ongoing skill development",
          developmentPath: "Learning style assessment → Goal setting → Reflection practice → Knowledge sharing",
          businessImpact: "Faster adaptation to change, increased innovation, career advancement, job satisfaction"
        }
      ]
    }
  ];

  const industryAdvocacy = [
    {
      category: "Industry Leadership & Advocacy",
      developmentAreas: [
        {
          skill: "Policy & Regulation Engagement",
          description: "Understanding and influencing electrical industry policy and standards",
          developmentPath: "Regulatory awareness → Consultation responses → Committee participation → Policy advocacy",
          businessImpact: "Industry influence, early insight into changes, reputation enhancement, networking"
        },
        {
          skill: "Public Speaking & Thought Leadership",
          description: "Sharing expertise and representing the electrical industry publicly",
          developmentPath: "Presentation skills → Conference speaking → Article writing → Media training",
          businessImpact: "Enhanced reputation, business development, industry recognition, knowledge sharing"
        },
        {
          skill: "Diversity & Inclusion Champions",
          description: "Promoting inclusive practices and diversity within the electrical industry",
          developmentPath: "Diversity training → Bias awareness → Inclusive recruitment → Mentoring programmes",
          businessImpact: "Broader talent pool, improved team performance, industry modernisation, social impact"
        }
      ]
    }
  ];

  const internationalOpportunities = [
    {
      category: "Global Professional Development",
      developmentAreas: [
        {
          skill: "International Standards & Practices",
          description: "Understanding electrical standards and practices in different countries",
          developmentPath: "International standards study → Overseas projects → Cultural awareness → Language skills",
          businessImpact: "Global market access, international contracts, cultural competence, career mobility"
        },
        {
          skill: "Cross-Cultural Communication",
          description: "Effective communication and collaboration across different cultures",
          developmentPath: "Cultural awareness training → Language learning → International teamwork → Global networking",
          businessImpact: "Successful international projects, diverse team leadership, global client relationships"
        },
        {
          skill: "Export & International Business",
          description: "Developing electrical services and products for international markets",
          developmentPath: "Export training → Market research → International partnerships → Compliance understanding",
          businessImpact: "Revenue diversification, business growth, market expansion, risk reduction"
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
          <MobileAccordionContent className="space-y-4 p-4">
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
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="networking-strategy">
          <MobileAccordionTrigger icon={<Network className="h-5 w-5 text-green-400" />}>
            Professional Networking & Industry Engagement
          </MobileAccordionTrigger>
          <MobileAccordionContent className="space-y-4 p-4">
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
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="leadership-development">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-purple-400" />}>
            Leadership & Management Development
          </MobileAccordionTrigger>
          <MobileAccordionContent className="space-y-4 p-4">
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

        <MobileAccordionItem value="digital-professionalism">
          <MobileAccordionTrigger icon={<Smartphone className="h-5 w-5 text-cyan-400" />}>
            Digital Professionalism & Technology
          </MobileAccordionTrigger>
          <MobileAccordionContent className="space-y-4 p-4">
            {digitalProfessionalismSkills.map((category, index) => (
                <div key={index} className="border border-cyan-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'} border-b border-cyan-500/20 pb-1`}>
                    {category.category}
                  </h4>

                  <div className="space-y-3">
                    {category.developmentAreas.map((area, areaIndex) => (
                      <div key={areaIndex} className="bg-cyan-500/5 border border-cyan-500/20 rounded p-3 space-y-2">
                        <h5 className={`font-medium text-cyan-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{area.skill}</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{area.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-cyan-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Development Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-200`}>{area.developmentPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{area.businessImpact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="innovation-entrepreneurship">
          <MobileAccordionTrigger icon={<Rocket className="h-5 w-5 text-orange-400" />}>
            Innovation & Entrepreneurship
          </MobileAccordionTrigger>
          <MobileAccordionContent className="space-y-4 p-4">
            {innovationEntrepreneurship.map((category, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'} border-b border-orange-500/20 pb-1`}>
                    {category.category}
                  </h4>

                  <div className="space-y-3">
                    {category.developmentAreas.map((area, areaIndex) => (
                      <div key={areaIndex} className="bg-orange-500/5 border border-orange-500/20 rounded p-3 space-y-2">
                        <h5 className={`font-medium text-orange-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{area.skill}</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{area.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Development Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{area.developmentPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{area.businessImpact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="sustainability-esg">
          <MobileAccordionTrigger icon={<Lightbulb className="h-5 w-5 text-green-400" />}>
            Sustainability & ESG Leadership
          </MobileAccordionTrigger>
          <MobileAccordionContent className="space-y-4 p-4">
            {sustainabilityESG.map((category, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'} border-b border-green-500/20 pb-1`}>
                    {category.category}
                  </h4>

                  <div className="space-y-3">
                    {category.developmentAreas.map((area, areaIndex) => (
                      <div key={areaIndex} className="bg-green-500/5 border border-green-500/20 rounded p-3 space-y-2">
                        <h5 className={`font-medium text-green-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{area.skill}</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{area.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Development Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{area.developmentPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{area.businessImpact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="wellbeing-resilience">
          <MobileAccordionTrigger icon={<Heart className="h-5 w-5 text-pink-400" />}>
            Wellbeing & Personal Resilience
          </MobileAccordionTrigger>
          <MobileAccordionContent className="space-y-4 p-4">
            {wellbeingResilience.map((category, index) => (
                <div key={index} className="border border-pink-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'} border-b border-pink-500/20 pb-1`}>
                    {category.category}
                  </h4>

                  <div className="space-y-3">
                    {category.developmentAreas.map((area, areaIndex) => (
                      <div key={areaIndex} className="bg-pink-500/5 border border-pink-500/20 rounded p-3 space-y-2">
                        <h5 className={`font-medium text-pink-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{area.skill}</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{area.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-pink-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Development Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-pink-200`}>{area.developmentPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{area.businessImpact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="industry-advocacy">
          <MobileAccordionTrigger icon={<MessageSquare className="h-5 w-5 text-indigo-400" />}>
            Industry Leadership & Advocacy
          </MobileAccordionTrigger>
          <MobileAccordionContent className="space-y-4 p-4">
            {industryAdvocacy.map((category, index) => (
                <div key={index} className="border border-indigo-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'} border-b border-indigo-500/20 pb-1`}>
                    {category.category}
                  </h4>

                  <div className="space-y-3">
                    {category.developmentAreas.map((area, areaIndex) => (
                      <div key={areaIndex} className="bg-indigo-500/5 border border-indigo-500/20 rounded p-3 space-y-2">
                        <h5 className={`font-medium text-indigo-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{area.skill}</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{area.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-indigo-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Development Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-indigo-200`}>{area.developmentPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{area.businessImpact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="international-opportunities">
          <MobileAccordionTrigger icon={<Globe className="h-5 w-5 text-teal-400" />}>
            International & Global Development
          </MobileAccordionTrigger>
          <MobileAccordionContent className="space-y-4 p-4">
            {internationalOpportunities.map((category, index) => (
                <div key={index} className="border border-teal-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'} border-b border-teal-500/20 pb-1`}>
                    {category.category}
                  </h4>

                  <div className="space-y-3">
                    {category.developmentAreas.map((area, areaIndex) => (
                      <div key={areaIndex} className="bg-teal-500/5 border border-teal-500/20 rounded p-3 space-y-2">
                        <h5 className={`font-medium text-teal-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{area.skill}</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{area.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-teal-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Development Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-teal-200`}>{area.developmentPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{area.businessImpact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="career-planning-toolkit">
          <MobileAccordionTrigger icon={<Calendar className="h-5 w-5 text-violet-400" />}>
            Career Planning Toolkit
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-violet-500/20 bg-violet-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-violet-300 ${isMobile ? 'text-base' : 'text-lg'}`}>5-Year Career Plan Template</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>Year 1-2:</strong> Foundation skills mastery and professional qualification completion
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>Year 3:</strong> Specialisation selection and advanced training commencement
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>Year 4:</strong> Leadership role development and business skills acquisition
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>Year 5:</strong> Senior position achievement or business establishment
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-violet-500/20 bg-violet-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-violet-300 ${isMobile ? 'text-base' : 'text-lg'}`}>Personal SWOT Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <h6 className={`font-medium text-green-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Strengths</h6>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>Technical skills, work ethic, problem-solving</div>
                      </div>
                      <div className="space-y-1">
                        <h6 className={`font-medium text-red-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Weaknesses</h6>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-200`}>Business skills, networking, experience</div>
                      </div>
                      <div className="space-y-1">
                        <h6 className={`font-medium text-blue-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Opportunities</h6>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>Green energy, smart buildings, EV charging</div>
                      </div>
                      <div className="space-y-1">
                        <h6 className={`font-medium text-orange-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Threats</h6>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>Automation, competition, regulation changes</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-violet-500/20 bg-violet-500/5">
                <CardHeader className="pb-3">
                  <CardTitle className={`text-violet-300 ${isMobile ? 'text-base' : 'text-lg'}`}>Professional Development Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h6 className={`font-medium text-violet-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Career Coaching</h6>
                      <div className="space-y-1">
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Professional career coaching services</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Industry mentor matching programmes</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Peer coaching and support groups</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h6 className={`font-medium text-violet-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Skills Assessment</h6>
                      <div className="space-y-1">
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Professional competency assessments</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Skills gap analysis tools</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>360-degree feedback programmes</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h6 className={`font-medium text-violet-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Planning Tools</h6>
                      <div className="space-y-1">
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Career planning software and apps</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Goal setting and tracking systems</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Professional portfolio development</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default ProfessionalDevelopmentStrategy;
