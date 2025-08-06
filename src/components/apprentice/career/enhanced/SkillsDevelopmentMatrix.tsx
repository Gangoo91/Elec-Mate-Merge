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
  Shield
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
                          <h6 className={`font-medium text-amber-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Assessment Criteria</h6>
                          <ul className="space-y-1">
                            {skill.assessmentCriteria.map((criteria, criteriaIndex) => (
                              <li key={criteriaIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200 flex items-center gap-1`}>
                                <CheckCircle className="h-3 w-3 text-amber-400 flex-shrink-0" />
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

        <MobileAccordionItem value="skills-assessment">
          <MobileAccordionTrigger icon={<Lightbulb className="h-5 w-5 text-orange-400" />}>
            Skills Assessment & Planning
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                <h4 className={`font-medium text-orange-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Personal Development Planning</h4>
                
                <div className="space-y-3">
                  <div className="bg-orange-500/5 border border-orange-500/20 rounded p-3">
                    <h5 className={`font-medium text-orange-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Skills Gap Analysis</h5>
                    <ul className="space-y-1">
                      {[
                        "Assess current competency levels against industry standards",
                        "Identify priority skills for career progression",
                        "Map skills to specific job roles and salary expectations",
                        "Create personalised learning timeline and milestones"
                      ].map((item, index) => (
                        <li key={index} className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-orange-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-500/5 border border-blue-500/20 rounded p-3">
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Learning Resources</h5>
                    <ul className="space-y-1">
                      {[
                        "City & Guilds and EAL qualification centres",
                        "Employer training schemes and modern apprenticeships",
                        "Professional body CPD programmes (IET, SELECT)",
                        "Online learning platforms and virtual reality training"
                      ].map((item, index) => (
                        <li key={index} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-blue-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/5 border border-green-500/20 rounded p-3">
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Competency Tracking</h5>
                    <ul className="space-y-1">
                      {[
                        "Regular skills assessments with qualified assessors",
                        "Portfolio development with evidence collection",
                        "Industry certification and scheme membership",
                        "Continuous professional development records"
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

export default SkillsDevelopmentMatrix;