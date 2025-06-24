
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  GraduationCap, 
  Lightbulb, 
  TrendingUp, 
  Users,
  Target,
  Award,
  Zap,
  Building
} from "lucide-react";

const ContinuingEducationTab = () => {
  const educationLevels = [
    {
      level: "Level 4 - HNC",
      icon: <BookOpen className="h-6 w-6 text-blue-400" />,
      duration: "2 years part-time",
      delivery: "Evening/Weekend classes",
      description: "Higher National Certificate in Electrical Engineering",
      benefits: [
        "Foundation for degree-level study",
        "Enhanced technical knowledge",
        "Better understanding of electrical principles",
        "Pathway to supervisory roles"
      ],
      careerProgression: "Technician → Senior Technician → Engineering roles",
      typicalProviders: "Further Education Colleges, Universities"
    },
    {
      level: "Level 5 - HND",
      icon: <GraduationCap className="h-6 w-6 text-green-400" />,
      duration: "3 years part-time",
      delivery: "Flexible study options",
      description: "Higher National Diploma in Electrical Engineering",
      benefits: [
        "Equivalent to 2nd year of degree",
        "Advanced design and analysis skills",
        "Project management capabilities",
        "Direct entry to final year of degree"
      ],
      careerProgression: "Engineering Technician → Assistant Engineer → Chartered Engineer path",
      typicalProviders: "Universities, Specialist Engineering Colleges"
    },
    {
      level: "Degree",
      icon: <Award className="h-6 w-6 text-purple-400" />,
      duration: "3-4 years part-time",
      delivery: "Distance learning/Part-time",
      description: "BEng/BSc Electrical Engineering",
      benefits: [
        "Professional engineering status",
        "Chartered Engineer eligibility",
        "Management and leadership roles",
        "Significant salary increase potential"
      ],
      careerProgression: "Engineer → Senior Engineer → Principal Engineer → Management",
      typicalProviders: "Universities (Open University popular for part-time)"
    }
  ];

  const specialistEducation = [
    {
      category: "Renewable Energy",
      icon: <Zap className="h-6 w-6 text-green-500" />,
      courses: [
        {
          title: "MSc Renewable Energy Engineering",
          provider: "Universities",
          duration: "1-2 years",
          focus: "Advanced renewable systems design"
        },
        {
          title: "Solar PV Design Courses",
          provider: "Industry specialists",
          duration: "2-5 days",
          focus: "System sizing and grid connection"
        },
        {
          title: "Energy Storage Systems",
          provider: "Technical colleges",
          duration: "3-5 days",
          focus: "Battery technology and integration"
        }
      ]
    },
    {
      category: "Building Services",
      icon: <Building className="h-6 w-6 text-amber-400" />,
      courses: [
        {
          title: "Building Services Engineering",
          provider: "Universities/CIBSE",
          duration: "1-3 years",
          focus: "Integrated building systems"
        },
        {
          title: "Smart Building Technology",
          provider: "Industry providers",
          duration: "3-5 days",
          focus: "IoT and automation systems"
        },
        {
          title: "Energy Management",
          provider: "Professional bodies",
          duration: "5-10 days",
          focus: "Energy efficiency and monitoring"
        }
      ]
    },
    {
      category: "Industrial Automation",
      icon: <Users className="h-6 w-6 text-red-400" />,
      courses: [
        {
          title: "Control Systems Engineering",
          provider: "Universities",
          duration: "1-2 years",
          focus: "Advanced control theory"
        },
        {
          title: "PLC Programming",
          provider: "Manufacturer training",
          duration: "5-10 days",
          focus: "Industrial automation"
        },
        {
          title: "SCADA Systems",
          provider: "Specialist providers",
          duration: "3-5 days",
          focus: "Supervisory control systems"
        }
      ]
    }
  ];

  const studyTips = [
    {
      tip: "Work-Life-Study Balance",
      icon: <Clock className="h-5 w-5 text-elec-yellow" />,
      advice: [
        "Set realistic study schedules that fit around work",
        "Use commute time for reading and revision",
        "Plan study breaks during quieter work periods",
        "Communicate with family about study commitments"
      ]
    },
    {
      tip: "Making Learning Relevant",
      icon: <Lightbulb className="h-5 w-5 text-elec-yellow" />,
      advice: [
        "Apply theoretical concepts to real work situations",
        "Discuss coursework with experienced colleagues",
        "Keep a learning journal linking theory to practice",
        "Choose project topics relevant to your work"
      ]
    },
    {
      tip: "Financial Planning",
      icon: <Target className="h-5 w-5 text-elec-yellow" />,
      advice: [
        "Research employer funding and study leave policies",
        "Look into professional body education grants",
        "Consider apprenticeship levy funding options",
        "Budget for course fees, books, and travel costs"
      ]
    }
  ];

  const fundingOptions = [
    {
      source: "Employer Support",
      description: "Many employers fund relevant training",
      typicalCoverage: "50-100% of fees",
      requirements: "Usually requires commitment to stay with employer"
    },
    {
      source: "Apprenticeship Levy",
      description: "Large employers can use levy funds",
      typicalCoverage: "Up to 100% of approved courses",
      requirements: "Course must be on approved apprenticeship framework"
    },
    {
      source: "Professional Body Grants",
      description: "IET and other bodies offer education support",
      typicalCoverage: "£500-2000 grants",
      requirements: "Membership and academic merit requirements"
    },
    {
      source: "Student Finance",
      description: "Government funding for degree-level study",
      typicalCoverage: "Loans for fees and maintenance",
      requirements: "Standard student finance eligibility"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Continuing Education Pathways</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Explore formal education opportunities to advance your electrical career. From HNC to degree level, 
          continuing education opens doors to engineering roles, higher salaries, and professional recognition.
        </p>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
            Formal Education Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {educationLevels.map((level, index) => (
              <div key={index} className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                <div className="flex items-center gap-3 mb-3">
                  {level.icon}
                  <div>
                    <h3 className="font-semibold text-white">{level.level}</h3>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Course Details</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-elec-yellow" />
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="text-white">{level.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-elec-yellow" />
                        <span className="text-muted-foreground">Delivery:</span>
                        <span className="text-white">{level.delivery}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Building className="h-4 w-4 text-elec-yellow mt-0.5" />
                        <span className="text-muted-foreground">Providers:</span>
                        <span className="text-white">{level.typicalProviders}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-2">Key Benefits</h4>
                    <ul className="space-y-1">
                      {level.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-elec-dark/30 p-3 rounded border border-elec-yellow/5">
                  <h4 className="font-medium text-green-300 mb-1">Career Progression</h4>
                  <p className="text-sm text-green-200">{level.careerProgression}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Specialist Education Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {specialistEducation.map((category, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-4">
                  {category.icon}
                  <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="bg-elec-dark/30 p-3 rounded-lg border border-elec-yellow/5">
                      <h4 className="font-medium text-white mb-2">{course.title}</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Provider:</span>
                          <span className="text-white">{course.provider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="text-white">{course.duration}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-muted-foreground">Focus:</span>
                          <p className="text-white">{course.focus}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Study Success Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyTips.map((tipCategory, index) => (
                <div key={index} className="bg-elec-dark/50 p-3 rounded-lg border border-elec-yellow/10">
                  <div className="flex items-center gap-2 mb-2">
                    {tipCategory.icon}
                    <h4 className="font-medium text-white">{tipCategory.tip}</h4>
                  </div>
                  <ul className="space-y-1">
                    {tipCategory.advice.map((advice, adviceIndex) => (
                      <li key={adviceIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                        {advice}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Funding Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fundingOptions.map((option, index) => (
                <div key={index} className="bg-elec-dark/50 p-3 rounded-lg border border-elec-yellow/10">
                  <h4 className="font-medium text-white mb-1">{option.source}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-300">Coverage: {option.typicalCoverage}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{option.requirements}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-green-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Award className="h-5 w-5" />
            Why Invest in Further Education?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Career Advancement</h3>
              <p className="text-sm text-muted-foreground">
                Engineering qualifications open doors to design, project management, and senior technical roles 
                that aren't accessible with trade qualifications alone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Earning Potential</h3>
              <p className="text-sm text-muted-foreground">
                Degree-qualified electrical engineers typically earn 30-50% more than trade-qualified electricians, 
                with greater long-term career security.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Professional Status</h3>
              <p className="text-sm text-muted-foreground">
                Engineering qualifications enable Chartered Engineer status, providing professional recognition 
                and opening international career opportunities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuingEducationTab;
