import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Brain, 
  Target, 
  Award, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Lightbulb,
  Users,
  Shield,
  Smartphone,
  Briefcase,
  Zap,
  Rocket,
  GraduationCap,
  MapPin,
  TrendingDown,
  Library,
  Monitor,
  Settings,
  Network,
  Cpu,
  Globe,
  BarChart,
  Search
} from "lucide-react";

const SkillsDevelopmentMatrix = () => {
  const isMobile = useIsMobile();

  const skillsMetrics = [
    {
      metric: "Core Skills Required",
      data: "12-15 essential competencies",
      icon: <Brain className="h-5 w-5 text-blue-400" />,
      detail: "From basic wiring to advanced industrial systems"
    },
    {
      metric: "Average Development Time",
      data: "3-5 years full competency",
      icon: <Clock className="h-5 w-5 text-elec-yellow" />,
      detail: "Including apprenticeship and post-qualification experience"
    },
    {
      metric: "Skill Progression Rate",
      data: "6-8 new skills per year",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      detail: "With structured development planning"
    },
    {
      metric: "Specialisation Value",
      data: "£5,000-15,000 salary boost",
      icon: <Award className="h-5 w-5 text-purple-400" />,
      detail: "Specialist skills command premium rates"
    }
  ];

  const foundationSkills = [
    {
      category: "Electrical Fundamentals",
      level: "Foundation",
      duration: "6-12 months",
      skills: [
        {
          skill: "Basic Circuit Theory",
          description: "Understanding Ohm's Law, power calculations, and circuit analysis",
          competencyLevel: "Essential",
          learningPath: "Level 2 Electrical Installation → Practice calculations → Apply in real circuits",
          assessmentCriteria: ["Calculate voltage, current, and resistance", "Analyse series and parallel circuits", "Apply power formulas"]
        },
        {
          skill: "Safe Isolation Procedures",
          description: "Lock-off, tag-out, and proving dead procedures for all electrical work",
          competencyLevel: "Critical",
          learningPath: "Health & Safety course → Practical demonstrations → Supervised practice",
          assessmentCriteria: ["Demonstrate safe isolation", "Use proving units correctly", "Apply lock-off procedures"]
        },
        {
          skill: "Wiring Regulations Knowledge",
          description: "Understanding BS 7671 18th Edition requirements and applications",
          competencyLevel: "Essential",
          learningPath: "18th Edition course → Regulation study → Practical application",
          assessmentCriteria: ["Quote relevant regulations", "Apply cable sizing rules", "Understand protection requirements"]
        }
      ]
    },
    {
      category: "Practical Installation",
      level: "Foundation",
      duration: "12-18 months",
      skills: [
        {
          skill: "Cable Installation Techniques",
          description: "Proper cable routing, support, and protection methods",
          competencyLevel: "Essential",
          learningPath: "Hands-on training → Different installation methods → Quality standards",
          assessmentCriteria: ["Install cables to regulations", "Use appropriate fixings", "Maintain neat workmanship"]
        },
        {
          skill: "Basic Testing Procedures",
          description: "Continuity, insulation resistance, and polarity testing",
          competencyLevel: "Essential",
          learningPath: "Testing course → Equipment familiarisation → Practice testing",
          assessmentCriteria: ["Perform basic tests correctly", "Record results accurately", "Identify test failures"]
        },
        {
          skill: "Tool Proficiency",
          description: "Safe and efficient use of electrical hand tools and equipment",
          competencyLevel: "Essential",
          learningPath: "Tool training → Supervised use → Independent application",
          assessmentCriteria: ["Select correct tools", "Use tools safely", "Maintain equipment properly"]
        }
      ]
    }
  ];

  const intermediateSkills = [
    {
      category: "Advanced Installation",
      level: "Intermediate",
      duration: "18-24 months",
      skills: [
        {
          skill: "Motor Control Systems",
          description: "Single and three-phase motor control, DOL and star-delta starters",
          competencyLevel: "Advanced",
          learningPath: "Motor control course → Industrial placement → Complex installations",
          assessmentCriteria: ["Wire motor control circuits", "Diagnose motor faults", "Implement control strategies"]
        },
        {
          skill: "Inspection & Testing Certification",
          description: "Comprehensive electrical installation testing and certification",
          competencyLevel: "Professional",
          learningPath: "2391 qualification → Assessment practice → Real-world testing",
          assessmentCriteria: ["Complete full installation tests", "Issue valid certificates", "Identify code violations"]
        },
        {
          skill: "PLC Programming Basics",
          description: "Introduction to programmable logic controllers and ladder programming",
          competencyLevel: "Specialist",
          learningPath: "PLC training course → Programming practice → Industrial applications",
          assessmentCriteria: ["Create basic ladder programs", "Troubleshoot PLC issues", "Interface with HMI systems"]
        }
      ]
    },
    {
      category: "Commercial & Industrial",
      level: "Intermediate", 
      duration: "24-36 months",
      skills: [
        {
          skill: "High Voltage Awareness",
          description: "Understanding HV systems, safety procedures, and authorisation requirements",
          competencyLevel: "Specialist",
          learningPath: "HV awareness course → Safety training → Authorised person development",
          assessmentCriteria: ["Identify HV hazards", "Apply HV safety procedures", "Understand switching procedures"]
        },
        {
          skill: "Fire Alarm Systems",
          description: "Design, installation, and commissioning of fire detection systems",
          competencyLevel: "Specialist",
          learningPath: "Fire alarm course → BS 5839 study → System commissioning",
          assessmentCriteria: ["Design system layouts", "Install detection devices", "Commission and test systems"]
        },
        {
          skill: "Emergency Lighting",
          description: "Emergency lighting design, installation, and maintenance procedures",
          competencyLevel: "Advanced",
          learningPath: "Emergency lighting course → Design calculations → Testing procedures",
          assessmentCriteria: ["Calculate lighting requirements", "Install emergency systems", "Perform periodic testing"]
        }
      ]
    }
  ];

  const specialistSkills = [
    {
      category: "Renewable Energy",
      level: "Specialist",
      duration: "12-18 months",
      skills: [
        {
          skill: "Solar PV Installation",
          description: "Design and installation of photovoltaic solar systems",
          competencyLevel: "Specialist",
          learningPath: "Solar PV course → MCS certification → Real installations",
          assessmentCriteria: ["Design PV systems", "Install mounting systems", "Connect inverters and batteries"]
        },
        {
          skill: "EV Charging Infrastructure",
          description: "Electric vehicle charging point installation and maintenance",
          competencyLevel: "Emerging",
          learningPath: "EV charging course → Manufacturer training → Installation practice",
          assessmentCriteria: ["Install domestic chargers", "Configure smart charging", "Maintain charging networks"]
        },
        {
          skill: "Battery Storage Systems",
          description: "Energy storage system installation and commissioning",
          competencyLevel: "Advanced",
          learningPath: "Battery storage course → Safety training → System integration",
          assessmentCriteria: ["Install battery systems safely", "Configure energy management", "Perform safety testing"]
        }
      ]
    },
    {
      category: "Smart Building Technology",
      level: "Specialist",
      duration: "18-24 months",
      skills: [
        {
          skill: "Building Management Systems",
          description: "Integration and programming of BMS for building automation",
          competencyLevel: "Advanced",
          learningPath: "BMS training → Protocol understanding → System programming",
          assessmentCriteria: ["Configure BMS controllers", "Program automation sequences", "Integrate building systems"]
        },
        {
          skill: "Access Control Systems",
          description: "Electronic access control and security system installation",
          competencyLevel: "Specialist",
          learningPath: "Security systems course → Networking training → System commissioning",
          assessmentCriteria: ["Install access controllers", "Configure user permissions", "Integrate with building systems"]
        },
        {
          skill: "Lighting Control Systems",
          description: "Advanced lighting control including DALI and wireless systems",
          competencyLevel: "Advanced",
          learningPath: "Lighting control course → Protocol training → Complex installations",
          assessmentCriteria: ["Program lighting scenes", "Commission DALI systems", "Integrate presence detection"]
        }
      ]
    }
  ];

  const digitalTechSkills = [
    {
      category: "Digital Installation Tools",
      level: "Digital Foundation",
      duration: "6-12 months",
      skills: [
        {
          skill: "BIM Software Proficiency",
          description: "Building Information Modelling for electrical design and installation planning",
          competencyLevel: "Emerging",
          learningPath: "BIM training → CAD software → 3D modelling practice",
          assessmentCriteria: ["Create electrical layouts in BIM", "Extract installation data", "Collaborate on digital models"]
        },
        {
          skill: "Electrical Design Software",
          description: "AutoCAD Electrical, ETAP, or similar design and simulation tools",
          competencyLevel: "Advanced",
          learningPath: "Software training → Design projects → Professional certification",
          assessmentCriteria: ["Design electrical schematics", "Perform load calculations", "Generate installation drawings"]
        },
        {
          skill: "Digital Testing Equipment",
          description: "Modern digital multimeters, oscilloscopes, and smart testing devices",
          competencyLevel: "Essential",
          learningPath: "Equipment training → Practical use → Data interpretation",
          assessmentCriteria: ["Use advanced testing features", "Record digital data", "Analyse measurement trends"]
        }
      ]
    },
    {
      category: "Smart Building Integration",
      level: "Digital Advanced",
      duration: "12-18 months",
      skills: [
        {
          skill: "IoT Device Installation",
          description: "Internet of Things sensors, controllers, and smart building devices",
          competencyLevel: "Specialist",
          learningPath: "IoT fundamentals → Device programming → Network integration",
          assessmentCriteria: ["Configure IoT devices", "Establish communication protocols", "Integrate with building systems"]
        },
        {
          skill: "Network Infrastructure",
          description: "Ethernet, WiFi, and building automation network installation",
          competencyLevel: "Advanced",
          learningPath: "Networking course → Protocol understanding → Infrastructure setup",
          assessmentCriteria: ["Install structured cabling", "Configure network switches", "Troubleshoot connectivity issues"]
        },
        {
          skill: "Cybersecurity for Buildings",
          description: "Securing electrical and building automation systems from cyber threats",
          competencyLevel: "Critical",
          learningPath: "Cybersecurity training → Risk assessment → Security implementation",
          assessmentCriteria: ["Identify security vulnerabilities", "Implement access controls", "Monitor system security"]
        }
      ]
    }
  ];

  const businessSoftSkills = [
    {
      category: "Communication & Leadership",
      level: "Professional Skills",
      duration: "Ongoing",
      skills: [
        {
          skill: "Client Communication",
          description: "Effective communication with clients, explaining technical concepts clearly",
          competencyLevel: "Essential",
          learningPath: "Communication workshops → Role-playing exercises → Client interaction practice",
          assessmentCriteria: ["Explain technical issues in layman terms", "Handle client complaints professionally", "Deliver clear project updates"]
        },
        {
          skill: "Team Leadership",
          description: "Leading electrical teams, delegating tasks, and managing project workflows",
          competencyLevel: "Advanced",
          learningPath: "Leadership training → Mentoring experience → Team management practice",
          assessmentCriteria: ["Coordinate team activities", "Resolve team conflicts", "Motivate team performance"]
        },
        {
          skill: "Project Management",
          description: "Planning, executing, and delivering electrical projects on time and budget",
          competencyLevel: "Professional",
          learningPath: "Project management course → PM software training → Real project experience",
          assessmentCriteria: ["Create project schedules", "Manage project budgets", "Deliver projects successfully"]
        }
      ]
    },
    {
      category: "Business Development",
      level: "Entrepreneurial",
      duration: "12-24 months",
      skills: [
        {
          skill: "Cost Estimation & Pricing",
          description: "Accurate pricing of electrical work, material costs, and labour calculations",
          competencyLevel: "Critical",
          learningPath: "Estimating course → Software training → Bid preparation practice",
          assessmentCriteria: ["Prepare accurate estimates", "Calculate material costs", "Price competitive bids"]
        },
        {
          skill: "Marketing & Sales",
          description: "Promoting electrical services, building client relationships, and business growth",
          competencyLevel: "Advanced",
          learningPath: "Marketing course → Digital marketing → Sales technique training",
          assessmentCriteria: ["Develop marketing strategies", "Build client relationships", "Close sales effectively"]
        },
        {
          skill: "Quality Management",
          description: "Implementing quality control processes and continuous improvement",
          competencyLevel: "Professional",
          learningPath: "Quality management training → Process development → Audit experience",
          assessmentCriteria: ["Implement QC processes", "Conduct quality audits", "Drive continuous improvement"]
        }
      ]
    }
  ];

  const emergingTechSkills = [
    {
      category: "Future Technologies",
      level: "Innovation",
      duration: "6-18 months",
      skills: [
        {
          skill: "Hydrogen Fuel Systems",
          description: "Installation and maintenance of hydrogen fuel cell and generation systems",
          competencyLevel: "Emerging",
          learningPath: "Hydrogen technology course → Safety training → Practical installations",
          assessmentCriteria: ["Understand hydrogen safety", "Install fuel cell systems", "Maintain hydrogen equipment"]
        },
        {
          skill: "AI-Powered Building Systems",
          description: "Artificial intelligence integration in building automation and energy management",
          competencyLevel: "Specialist",
          learningPath: "AI fundamentals → Building automation → Machine learning applications",
          assessmentCriteria: ["Configure AI controllers", "Implement predictive maintenance", "Optimise energy systems"]
        },
        {
          skill: "Wireless Power Transfer",
          description: "Installation and maintenance of wireless charging and power transmission systems",
          competencyLevel: "Advanced",
          learningPath: "Wireless technology course → Safety training → System commissioning",
          assessmentCriteria: ["Install wireless charging systems", "Ensure electromagnetic compliance", "Troubleshoot wireless issues"]
        }
      ]
    }
  ];

  const professionalFramework = [
    {
      category: "Continuous Learning",
      level: "Professional Development",
      duration: "Career-long",
      skills: [
        {
          skill: "CPD Planning & Management",
          description: "Structured approach to Continuing Professional Development and career planning",
          competencyLevel: "Essential",
          learningPath: "CPD planning workshop → Goal setting → Progress tracking",
          assessmentCriteria: ["Create annual CPD plans", "Track learning outcomes", "Reflect on skill development"]
        },
        {
          skill: "Industry Research & Trends",
          description: "Staying current with electrical industry developments and emerging technologies",
          competencyLevel: "Advanced",
          learningPath: "Industry publications → Conference attendance → Professional networking",
          assessmentCriteria: ["Identify industry trends", "Evaluate new technologies", "Share knowledge with peers"]
        },
        {
          skill: "Mentoring & Teaching",
          description: "Sharing knowledge and developing the next generation of electrical professionals",
          competencyLevel: "Professional",
          learningPath: "Teaching skills course → Mentoring programme → Knowledge transfer activities",
          assessmentCriteria: ["Mentor apprentices effectively", "Deliver training sessions", "Develop learning materials"]
        }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Brain className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Structured skills development increases earning potential by 40% and reduces career progression time by 18 months.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {skillsMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="foundation-skills">
          <MobileAccordionTrigger icon={<BookOpen className="h-5 w-5 text-blue-400" />}>
            Foundation Skills (Years 1-2)
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {foundationSkills.map((category, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                    <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {category.duration}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="bg-blue-500/5 border border-blue-500/20 rounded p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium text-blue-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{skill.skill}</h5>
                          <Badge variant="outline" className={`${
                            skill.competencyLevel === 'Critical' ? 'text-red-300 border-red-400/30' :
                            skill.competencyLevel === 'Essential' ? 'text-green-300 border-green-400/30' :
                            'text-yellow-300 border-yellow-400/30'
                          } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {skill.competencyLevel}
                          </Badge>
                        </div>
                        
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{skill.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Learning Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200`}>{skill.learningPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Assessment Criteria</h6>
                          <ul className="space-y-1">
                            {skill.assessmentCriteria.map((criteria, criteriaIndex) => (
                              <li key={criteriaIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                                <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                                {criteria}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="intermediate-skills">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-green-400" />}>
            Intermediate Skills (Years 2-4)
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {intermediateSkills.map((category, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                    <Badge variant="outline" className={`text-green-300 border-green-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {category.duration}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="bg-green-500/5 border border-green-500/20 rounded p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium text-green-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{skill.skill}</h5>
                          <Badge variant="outline" className={`${
                            skill.competencyLevel === 'Professional' ? 'text-purple-300 border-purple-400/30' :
                            skill.competencyLevel === 'Advanced' ? 'text-orange-300 border-orange-400/30' :
                            'text-yellow-300 border-yellow-400/30'
                          } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {skill.competencyLevel}
                          </Badge>
                        </div>
                        
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{skill.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Learning Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{skill.learningPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Assessment Criteria</h6>
                          <ul className="space-y-1">
                            {skill.assessmentCriteria.map((criteria, criteriaIndex) => (
                              <li key={criteriaIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                                <CheckCircle className="h-3 w-3 text-blue-400 flex-shrink-0" />
                                {criteria}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="specialist-skills">
          <MobileAccordionTrigger icon={<Award className="h-5 w-5 text-purple-400" />}>
            Specialist Skills (Years 3-5)
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {specialistSkills.map((category, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                    <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {category.duration}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="bg-purple-500/5 border border-purple-500/20 rounded p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium text-purple-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{skill.skill}</h5>
                          <Badge variant="outline" className={`${
                            skill.competencyLevel === 'Emerging' ? 'text-cyan-300 border-cyan-400/30' :
                            skill.competencyLevel === 'Advanced' ? 'text-orange-300 border-orange-400/30' :
                            'text-yellow-300 border-yellow-400/30'
                          } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {skill.competencyLevel}
                          </Badge>
                        </div>
                        
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{skill.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Learning Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{skill.learningPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-cyan-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Assessment Criteria</h6>
                          <ul className="space-y-1">
                            {skill.assessmentCriteria.map((criteria, criteriaIndex) => (
                              <li key={criteriaIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-200 flex items-center gap-1`}>
                                <CheckCircle className="h-3 w-3 text-cyan-400 flex-shrink-0" />
                                {criteria}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="digital-tech-skills">
          <MobileAccordionTrigger icon={<Smartphone className="h-5 w-5 text-cyan-400" />}>
            Digital & Technology Skills
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {digitalTechSkills.map((category, index) => (
                <div key={index} className="border border-cyan-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                    <Badge variant="outline" className={`text-cyan-300 border-cyan-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {category.duration}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="bg-cyan-500/5 border border-cyan-500/20 rounded p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium text-cyan-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{skill.skill}</h5>
                          <Badge variant="outline" className={`${
                            skill.competencyLevel === 'Critical' ? 'text-red-300 border-red-400/30' :
                            skill.competencyLevel === 'Essential' ? 'text-green-300 border-green-400/30' :
                            skill.competencyLevel === 'Advanced' ? 'text-orange-300 border-orange-400/30' :
                            skill.competencyLevel === 'Emerging' ? 'text-pink-300 border-pink-400/30' :
                            'text-yellow-300 border-yellow-400/30'
                          } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {skill.competencyLevel}
                          </Badge>
                        </div>
                        
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{skill.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-cyan-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Learning Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-200`}>{skill.learningPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Assessment Criteria</h6>
                          <ul className="space-y-1">
                            {skill.assessmentCriteria.map((criteria, criteriaIndex) => (
                              <li key={criteriaIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                                <CheckCircle className="h-3 w-3 text-blue-400 flex-shrink-0" />
                                {criteria}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="business-soft-skills">
          <MobileAccordionTrigger icon={<Briefcase className="h-5 w-5 text-orange-400" />}>
            Business & Soft Skills
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {businessSoftSkills.map((category, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                    <Badge variant="outline" className={`text-orange-300 border-orange-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {category.duration}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="bg-orange-500/5 border border-orange-500/20 rounded p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium text-orange-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{skill.skill}</h5>
                          <Badge variant="outline" className={`${
                            skill.competencyLevel === 'Critical' ? 'text-red-300 border-red-400/30' :
                            skill.competencyLevel === 'Essential' ? 'text-green-300 border-green-400/30' :
                            skill.competencyLevel === 'Advanced' ? 'text-blue-300 border-blue-400/30' :
                            skill.competencyLevel === 'Professional' ? 'text-purple-300 border-purple-400/30' :
                            'text-yellow-300 border-yellow-400/30'
                          } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {skill.competencyLevel}
                          </Badge>
                        </div>
                        
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{skill.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Learning Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{skill.learningPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Assessment Criteria</h6>
                          <ul className="space-y-1">
                            {skill.assessmentCriteria.map((criteria, criteriaIndex) => (
                              <li key={criteriaIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                                <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                                {criteria}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="emerging-tech-skills">
          <MobileAccordionTrigger icon={<Rocket className="h-5 w-5 text-pink-400" />}>
            Emerging Technologies
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {emergingTechSkills.map((category, index) => (
                <div key={index} className="border border-pink-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                    <Badge variant="outline" className={`text-pink-300 border-pink-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {category.duration}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="bg-pink-500/5 border border-pink-500/20 rounded p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium text-pink-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{skill.skill}</h5>
                          <Badge variant="outline" className={`${
                            skill.competencyLevel === 'Emerging' ? 'text-cyan-300 border-cyan-400/30' :
                            skill.competencyLevel === 'Advanced' ? 'text-orange-300 border-orange-400/30' :
                            'text-yellow-300 border-yellow-400/30'
                          } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {skill.competencyLevel}
                          </Badge>
                        </div>
                        
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{skill.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-pink-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Learning Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-pink-200`}>{skill.learningPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-cyan-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Assessment Criteria</h6>
                          <ul className="space-y-1">
                            {skill.assessmentCriteria.map((criteria, criteriaIndex) => (
                              <li key={criteriaIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-200 flex items-center gap-1`}>
                                <CheckCircle className="h-3 w-3 text-cyan-400 flex-shrink-0" />
                                {criteria}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="professional-framework">
          <MobileAccordionTrigger icon={<GraduationCap className="h-5 w-5 text-indigo-400" />}>
            Professional Development Framework
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {professionalFramework.map((category, index) => (
                <div key={index} className="border border-indigo-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{category.category}</h4>
                    <Badge variant="outline" className={`text-indigo-300 border-indigo-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {category.duration}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="bg-indigo-500/5 border border-indigo-500/20 rounded p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium text-indigo-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{skill.skill}</h5>
                          <Badge variant="outline" className={`${
                            skill.competencyLevel === 'Essential' ? 'text-green-300 border-green-400/30' :
                            skill.competencyLevel === 'Advanced' ? 'text-orange-300 border-orange-400/30' :
                            skill.competencyLevel === 'Professional' ? 'text-purple-300 border-purple-400/30' :
                            'text-yellow-300 border-yellow-400/30'
                          } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {skill.competencyLevel}
                          </Badge>
                        </div>
                        
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{skill.description}</p>
                        
                        <div>
                          <h6 className={`font-medium text-indigo-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Learning Path</h6>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-indigo-200`}>{skill.learningPath}</p>
                        </div>

                        <div>
                          <h6 className={`font-medium text-blue-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Assessment Criteria</h6>
                          <ul className="space-y-1">
                            {skill.assessmentCriteria.map((criteria, criteriaIndex) => (
                              <li key={criteriaIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                                <CheckCircle className="h-3 w-3 text-blue-400 flex-shrink-0" />
                                {criteria}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="regional-skills">
          <MobileAccordionTrigger icon={<MapPin className="h-5 w-5 text-teal-400" />}>
            Regional Skills Intelligence
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <Card className="border-teal-500/20 bg-teal-500/5">
                <CardHeader className="pb-3">
                  <CardTitle className={`text-teal-300 ${isMobile ? 'text-base' : 'text-lg'}`}>UK Regional Skills Demand</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className={`font-medium text-teal-300 ${isMobile ? 'text-sm' : 'text-base'}`}>High Demand Regions</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-teal-200`}>London & South East</span>
                          <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                            High
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-teal-200`}>Manchester & North West</span>
                          <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                            High
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-teal-200`}>Birmingham & Midlands</span>
                          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                            Medium
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className={`font-medium text-teal-300 ${isMobile ? 'text-sm' : 'text-base'}`}>In-Demand Skills by Region</h5>
                      <div className="space-y-2">
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-teal-200`}>
                          <strong>London:</strong> Smart building tech, data centres
                        </div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-teal-200`}>
                          <strong>Scotland:</strong> Renewable energy, offshore wind
                        </div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-teal-200`}>
                          <strong>North:</strong> Industrial automation, manufacturing
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="skills-marketplace">
          <MobileAccordionTrigger icon={<BarChart className="h-5 w-5 text-emerald-400" />}>
            Skills Marketplace Analysis
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <Card className="border-emerald-500/20 bg-emerald-500/5">
                <CardHeader className="pb-3">
                  <CardTitle className={`text-emerald-300 ${isMobile ? 'text-base' : 'text-lg'}`}>Skills Market Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className={`font-medium text-emerald-300 ${isMobile ? 'text-sm' : 'text-base'}`}>High-Value Skills</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-emerald-200`}>HV Switching</span>
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-elec-yellow`}>+£15k</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-emerald-200`}>PLC Programming</span>
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-elec-yellow`}>+£12k</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-emerald-200`}>Solar PV Design</span>
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-elec-yellow`}>+£8k</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className={`font-medium text-emerald-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Growth Opportunities</h5>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-green-400" />
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-emerald-200`}>EV Charging: 45% growth</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-green-400" />
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-emerald-200`}>Smart Buildings: 38% growth</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-green-400" />
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-emerald-200`}>Battery Storage: 42% growth</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="learning-resources">
          <MobileAccordionTrigger icon={<Library className="h-5 w-5 text-violet-400" />}>
            Learning Resources Hub
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-violet-500/20 bg-violet-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-violet-300 ${isMobile ? 'text-base' : 'text-lg'}`}>Training Providers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>City & Guilds:</strong> Industry-standard qualifications
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>EAL:</strong> Awarding organisation for electrical
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>NICEIC:</strong> Professional development courses
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>Local Colleges:</strong> Part-time and evening courses
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-violet-500/20 bg-violet-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-violet-300 ${isMobile ? 'text-base' : 'text-lg'}`}>Online Learning</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>Virtual Classrooms:</strong> Interactive online courses
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>Simulation Software:</strong> Practice without risk
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>Video Libraries:</strong> Technique demonstrations
                      </div>
                      <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>
                        <strong>Mobile Apps:</strong> Learn on the go
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-violet-500/20 bg-violet-500/5">
                <CardHeader className="pb-3">
                  <CardTitle className={`text-violet-300 ${isMobile ? 'text-base' : 'text-lg'}`}>Professional Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h6 className={`font-medium text-violet-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Publications</h6>
                      <div className="space-y-1">
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Electrical Review</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Professional Electrician</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Electrical Times</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h6 className={`font-medium text-violet-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Professional Bodies</h6>
                      <div className="space-y-1">
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>IET (Institution of Engineering and Technology)</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>ECA (Electrical Contractors' Association)</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>SELECT (Scottish electrical trade association)</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h6 className={`font-medium text-violet-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Events & Networking</h6>
                      <div className="space-y-1">
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Electrical Safety First conferences</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Regional trade events</div>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-violet-200`}>Manufacturer training days</div>
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

export default SkillsDevelopmentMatrix;