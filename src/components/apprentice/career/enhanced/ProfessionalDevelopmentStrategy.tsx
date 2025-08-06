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
    }
  ];

  const businessSkills = [
    {
      category: "Communication & Leadership",
      skills: [
        {
          skill: "Client Communication",
          description: "Effective communication with clients, explaining technical concepts clearly",
          competencyLevel: "Essential",
          learningPath: "Communication workshops → Role-playing exercises → Client interaction practice",
          businessImpact: "Improved client relationships, better project outcomes, increased referrals"
        },
        {
          skill: "Team Leadership",
          description: "Leading electrical teams, delegating tasks, and managing project workflows",
          competencyLevel: "Advanced",
          learningPath: "Leadership training → Mentoring experience → Team management practice",
          businessImpact: "Higher team productivity, better project delivery, career advancement"
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
          <MobileAccordionContent className="space-y-4 p-4 bg-elec-gray">
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

                      <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Career Impact</h6>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{programme.careerImpact}</p>

                      <h6 className={`font-medium text-amber-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Prerequisites</h6>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200`}>{programme.prerequisites}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="business-skills">
          <MobileAccordionTrigger icon={<Briefcase className="h-5 w-5 text-orange-400" />}>
            Business & Soft Skills Development
          </MobileAccordionTrigger>
          <MobileAccordionContent className="space-y-4 p-4 bg-elec-gray">
            {businessSkills.map((category, index) => (
              <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'} border-b border-orange-500/20 pb-1`}>
                  {category.category}
                </h4>

                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="bg-orange-500/5 border border-orange-500/20 rounded p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className={`font-medium text-orange-300 ${isMobile ? 'text-sm' : 'text-base'}`}>{skill.skill}</h5>
                        <Badge variant="outline" className={`${
                          skill.competencyLevel === 'Essential' ? 'text-green-300 border-green-400/30' :
                          skill.competencyLevel === 'Advanced' ? 'text-blue-300 border-blue-400/30' :
                          'text-yellow-300 border-yellow-400/30'
                        } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {skill.competencyLevel}
                        </Badge>
                      </div>
                      
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{skill.description}</p>
                      
                      <h6 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Learning Path</h6>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{skill.learningPath}</p>

                      <h6 className={`font-medium text-green-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Business Impact</h6>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>{skill.businessImpact}</p>
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
          <MobileAccordionContent className="space-y-4 p-4 bg-elec-gray">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader className="pb-3">
                <CardTitle className={`text-green-300 ${isMobile ? 'text-base' : 'text-lg'}`}>Networking Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h5 className={`font-medium text-green-300 ${isMobile ? 'text-sm' : 'text-base'}`}>Key Activities</h5>
                  <ul className="space-y-1">
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                      Join IET local network and attend monthly meetings
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                      Participate in SELECT or ECA regional events and workshops
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                      Attend annual conferences and exhibition visits
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="career-planning">
          <MobileAccordionTrigger icon={<Calendar className="h-5 w-5 text-violet-400" />}>
            Career Planning Framework
          </MobileAccordionTrigger>
          <MobileAccordionContent className="space-y-4 p-4 bg-elec-gray">
            <Card className="border-violet-500/20 bg-violet-500/5">
              <CardHeader className="pb-3">
                <CardTitle className={`text-violet-300 ${isMobile ? 'text-base' : 'text-lg'}`}>5-Year Development Plan</CardTitle>
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
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default ProfessionalDevelopmentStrategy;