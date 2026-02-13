
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  BookOpen,
  ArrowRight,
  Calendar,
  Target,
  TrendingUp,
  Zap,
  Award,
  Shield,
  Wrench,
  Briefcase,
  Heart,
  Phone,
  Mail,
  Building,
  Star,
  ChevronRight,
  CircleDot,
  FileText,
  PoundSterling,
  Timer,
  Coffee
} from "lucide-react";
import { Link } from "react-router-dom";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import SalaryProgressionChart from "@/components/apprentice/apprenticeship-expectations/SalaryProgressionChart";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const ApprenticeshipExpectations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });
  const isMobile = useIsMobile();

  const quickStats = [
    { label: "Duration", value: "4 Years", sublabel: "48 months full-time", icon: Clock, color: "text-blue-400" },
    { label: "Qualification", value: "Level 3", sublabel: "Advanced Apprenticeship", icon: Award, color: "text-purple-400" },
    { label: "Training Split", value: "80/20", sublabel: "Work / College", icon: BookOpen, color: "text-green-400" },
    { label: "Starting Salary", value: "£15-18k", sublabel: "Year 1 average", icon: PoundSterling, color: "text-elec-yellow" },
  ];

  const apprenticeshipStages = [
    {
      year: 1,
      title: "Foundation Year",
      duration: "Months 1-12",
      focus: "Basic electrical principles, safety fundamentals, and workplace orientation",
      salary: "£15,000 - £18,000",
      salaryNote: "National Minimum Wage for apprentices applies",
      keyMilestones: [
        "Health & Safety certification (CSCS card)",
        "Basic electrical theory mastery",
        "Tool familiarisation & safe usage",
        "First college assessments passed",
        "Portfolio started with first entries"
      ],
      skills: ["Cable stripping", "Basic wiring", "Tool usage", "Safety procedures"],
      challenges: [
        "Adjusting to early starts and physical work",
        "Learning vast amounts of technical vocabulary",
        "Balancing college work with site experience"
      ],
      dayInLife: "Arrive on site by 7:30am. Shadow qualified electricians, assist with basic tasks, attend toolbox talks. College one day per week.",
      quote: "The first year is tough but rewarding. You learn something new every single day."
    },
    {
      year: 2,
      title: "Development Year",
      duration: "Months 13-24",
      focus: "Installation methods, BS 7671 Wiring Regulations, and testing basics",
      salary: "£18,000 - £22,000",
      salaryNote: "Typically a 15-20% increase from Year 1",
      keyMilestones: [
        "BS 7671 Wiring Regulations understanding",
        "Installation techniques proficiency",
        "Basic testing and inspection skills",
        "Portfolio development with substantial evidence",
        "First independent work under supervision"
      ],
      skills: ["Conduit work", "Trunking", "Consumer units", "Basic testing"],
      challenges: [
        "Complex regulation interpretation",
        "Applying theory to real installations",
        "Increased responsibility and expectations"
      ],
      dayInLife: "More hands-on work. Installing sockets, switches, running cables. Starting to do work with less direct supervision.",
      quote: "Year 2 is when it starts clicking. The regs make sense, and you feel like a real sparky."
    },
    {
      year: 3,
      title: "Progression Year",
      duration: "Months 25-36",
      focus: "Advanced installations, fault-finding, and commercial work",
      salary: "£24,000 - £28,000",
      salaryNote: "Significant jump reflecting your increased value",
      keyMilestones: [
        "Advanced fault diagnosis skills",
        "Commercial installation experience",
        "Supervisory experience with Year 1s",
        "EPA preparation begins",
        "Specialisation interests identified"
      ],
      skills: ["Three-phase systems", "Fault finding", "Commercial work", "Supervision"],
      challenges: [
        "Leading and teaching junior apprentices",
        "Complex problem-solving under pressure",
        "EPA preparation alongside work"
      ],
      dayInLife: "Running your own jobs with check-ins. Training new apprentices. Taking on commercial projects.",
      quote: "Year 3 you realise how much you've learned. New apprentices ask you questions!"
    },
    {
      year: 4,
      title: "Mastery Year",
      duration: "Months 37-48",
      focus: "Specialisation, EPA completion, and career preparation",
      salary: "£28,000 - £35,000",
      salaryNote: "Close to qualified rates by end of year",
      keyMilestones: [
        "End Point Assessment completion",
        "Specialisation area chosen",
        "Industry certifications (18th Edition)",
        "JIB grading application",
        "Full qualification achieved"
      ],
      skills: ["Specialisation", "EPA skills", "Industry certs", "Career planning"],
      challenges: [
        "EPA examination pressure",
        "Career path decisions",
        "Job market navigation"
      ],
      dayInLife: "Working almost independently. Final college work. Preparing for EPA. Planning your qualified career.",
      quote: "The finish line is in sight. Four years of hard work about to pay off!"
    }
  ];

  const expectationCategories = [
    {
      title: "Learning Structure",
      icon: BookOpen,
      color: "blue",
      items: [
        { text: "20% off-the-job training (~7.5 hours/week)", detail: "College, self-study, online learning" },
        { text: "80% on-the-job practical experience", detail: "Real installations with supervision" },
        { text: "Regular college attendance (typically 1 day/week)", detail: "Day release or block release" },
        { text: "Portfolio development throughout", detail: "Evidence collection from day one" },
        { text: "Regular progress reviews with assessor", detail: "Every 6-8 weeks typically" }
      ]
    },
    {
      title: "Assessment Methods",
      icon: Target,
      color: "purple",
      items: [
        { text: "Continuous practical skill assessments", detail: "Ongoing throughout apprenticeship" },
        { text: "Written examinations at college", detail: "Theory tests and assignments" },
        { text: "Portfolio evidence collection", detail: "Photos, worksheets, sign-offs" },
        { text: "End Point Assessment (EPA)", detail: "Final assessment in Year 4" },
        { text: "Workplace observations", detail: "Assessor visits to your workplace" }
      ]
    },
    {
      title: "Support Available",
      icon: Users,
      color: "green",
      items: [
        { text: "Workplace mentor/supervisor", detail: "Day-to-day guidance and support" },
        { text: "College tutor support", detail: "Academic help and pastoral care" },
        { text: "Training provider coordinator", detail: "Overall apprenticeship management" },
        { text: "Peer learning with other apprentices", detail: "Share experiences and tips" },
        { text: "Mental health & wellbeing resources", detail: "Confidential support available" }
      ]
    },
    {
      title: "Career Progression",
      icon: TrendingUp,
      color: "yellow",
      items: [
        { text: "Fully qualified electrician status", detail: "JIB Approved Electrician grade" },
        { text: "Specialisation opportunities", detail: "EV, Solar, Fire Alarm, Data" },
        { text: "Further education pathways", detail: "HNC, Degree, Management" },
        { text: "Self-employment options", detail: "Start your own business" },
        { text: "Supervisor/management routes", detail: "Lead teams and projects" }
      ]
    }
  ];

  const whatsProvided = [
    { item: "Basic hand tools", note: "Most employers provide a starter kit", icon: Wrench },
    { item: "Safety equipment & PPE", note: "Hard hat, boots, hi-vis, gloves", icon: Shield },
    { item: "College tuition fees", note: "100% covered by funding", icon: GraduationCap },
    { item: "Regular wage", note: "Paid throughout your training", icon: PoundSterling },
    { item: "Workplace training", note: "Supervised practical experience", icon: Building },
    { item: "Professional qualification", note: "Level 3 Diploma & EPA", icon: Award }
  ];

  const yourResponsibilities = [
    { item: "Attend college regularly", note: "Missing sessions affects progress", icon: Calendar },
    { item: "Maintain your portfolio", note: "Update weekly, not monthly!", icon: FileText },
    { item: "Professional behaviour", note: "Punctuality, respect, work ethic", icon: Briefcase },
    { item: "Commitment to learning", note: "Study in your own time too", icon: BookOpen },
    { item: "Follow safety procedures", note: "No shortcuts, ever", icon: Shield },
    { item: "Meet assessment deadlines", note: "Plan ahead, don't rush", icon: Clock }
  ];

  const weeklySchedule = [
    { day: "Monday", activity: "Site Work", hours: "7:30-16:30", type: "work" },
    { day: "Tuesday", activity: "College Day", hours: "9:00-16:00", type: "college" },
    { day: "Wednesday", activity: "Site Work", hours: "7:30-16:30", type: "work" },
    { day: "Thursday", activity: "Site Work", hours: "7:30-16:30", type: "work" },
    { day: "Friday", activity: "Site Work", hours: "7:30-16:00", type: "work" },
    { day: "Weekend", activity: "Self-Study (1-2hrs)", hours: "Flexible", type: "study" }
  ];

  const industryStats = [
    { stat: "25,000+", label: "New electricians needed annually in UK" },
    { stat: "96%", label: "Employment rate after qualification" },
    { stat: "£42k", label: "Average qualified electrician salary" },
    { stat: "4.5★", label: "Job satisfaction rating" }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/15 via-elec-yellow/10 to-orange-500/5 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <CardHeader className="pb-2">
          <CardTitle className="text-elec-yellow flex items-center gap-3 text-xl sm:text-2xl">
            <div className="p-2 bg-elec-yellow/20 rounded-lg">
              <Zap className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            Your Electrical Apprenticeship Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-white text-base sm:text-lg leading-relaxed">
            An electrical apprenticeship is a <span className="text-elec-yellow font-semibold">4-year career investment</span> that
            combines hands-on practical training with college-based learning. You'll progress from complete beginner to
            <span className="text-green-400 font-semibold"> fully qualified electrician</span>, earning while you learn.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-3 sm:p-4 border border-white/10 hover:border-elec-yellow/30 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
                  <span className="text-white text-xs sm:text-sm">{stat.label}</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white text-xs">{stat.sublabel}</div>
              </div>
            ))}
          </div>

          {/* Industry Demand Banner */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-green-400" />
              <h4 className="font-semibold text-green-400">High Demand Industry</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {industryStats.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">{item.stat}</div>
                  <div className="text-white text-xs">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What Makes It Special */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Why Electrical Apprenticeships Stand Out
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Earn While You Learn", desc: "Get paid from day one, no student debt", icon: PoundSterling },
              { title: "Hands-On Training", desc: "Real work experience, not just theory", icon: Wrench },
              { title: "Guaranteed Qualification", desc: "Level 3 Diploma + Industry recognition", icon: Award },
              { title: "Career Security", desc: "Essential trade that's always in demand", icon: Shield },
              { title: "Clear Progression", desc: "Defined path from apprentice to qualified", icon: TrendingUp },
              { title: "Diverse Opportunities", desc: "Domestic, commercial, industrial, specialist", icon: Building }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
                  <item.icon className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                  <p className="text-white text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expectation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {expectationCategories.map((category, index) => (
          <Card key={index} className={`border-${category.color}-500/20 bg-white/5 hover:border-${category.color}-500/40 transition-all`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className={`p-2 bg-${category.color}-500/20 rounded-lg`}>
                  <category.icon className={`h-5 w-5 text-${category.color}-400`} />
                </div>
                <span className="text-white">{category.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="group">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white text-sm font-medium">{item.text}</span>
                        <p className="text-white text-xs mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Takeaways */}
      <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-yellow/10 to-orange-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { text: "Commit to 4 years of training", icon: Calendar },
              { text: "Balance work and college learning", icon: BookOpen },
              { text: "Build your portfolio from day one", icon: FileText },
              { text: "Stay safe - no shortcuts ever", icon: Shield }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                <item.icon className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                <span className="text-white text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderJourneyTab = () => (
    <div className="space-y-6">
      {/* Journey Timeline Visual */}
      <div className="relative">
        <div className="hidden lg:block absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-elec-yellow via-green-400 to-blue-400 transform -translate-x-1/2 rounded-full" />

        <div className="space-y-6">
          {apprenticeshipStages.map((stage, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-white/5 relative overflow-hidden hover:border-elec-yellow/40 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-elec-yellow/10 to-transparent" />

              {/* Year Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-elec-yellow rounded-full flex items-center justify-center">
                  <span className="text-elec-dark font-bold text-lg sm:text-2xl">{stage.year}</span>
                </div>
              </div>

              <CardHeader className="pr-20 sm:pr-24">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                    {stage.duration}
                  </Badge>
                  <Badge variant="outline" className="text-green-400 border-green-400/30">
                    {stage.salary}
                  </Badge>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-white">{stage.title}</CardTitle>
                <p className="text-white mt-1">{stage.focus}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Milestones */}
                <div>
                  <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Key Milestones
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {stage.keyMilestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm bg-white/5 border border-white/10 p-2 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-white">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills & Day in Life */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      Skills You'll Develop
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {stage.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-white border-white/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <h5 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                      <Coffee className="h-4 w-4" />
                      Day in the Life
                    </h5>
                    <p className="text-white text-sm">{stage.dayInLife}</p>
                  </div>
                </div>

                {/* Challenges */}
                <div className="border-t border-elec-yellow/10 pt-4">
                  <h4 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Common Challenges
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stage.challenges.map((challenge, idx) => (
                      <Badge key={idx} variant="outline" className="text-orange-400/80 border-orange-400/30 text-xs">
                        {challenge}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-gradient-to-r from-elec-yellow/10 to-transparent p-4 rounded-lg border-l-4 border-elec-yellow">
                  <p className="text-white italic text-sm">"{stage.quote}"</p>
                  <p className="text-white text-xs mt-1">- Former Year {stage.year} Apprentice</p>
                </div>

                {/* View Details Button */}
                <Link to={`/apprentice/toolbox/apprenticeship-expectations/year-${stage.year}`}>
                  <Button className="w-full sm:w-auto bg-elec-yellow/20 hover:bg-elec-yellow/30 text-elec-yellow border border-elec-yellow/30">
                    View Year {stage.year} Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Progression Summary */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your Progression at a Glance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apprenticeshipStages.map((stage, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-center">
                  <Badge className="bg-elec-yellow text-elec-dark">Yr {stage.year}</Badge>
                </div>
                <div className="flex-1">
                  <Progress value={(index + 1) * 25} className="h-3" />
                </div>
                <div className="w-24 text-right">
                  <span className="text-white text-sm font-semibold">{stage.salary.split(' - ')[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderExpectationsTab = () => (
    <div className="space-y-6">
      {/* Timeline Overview */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            What to Expect Throughout Your Apprenticeship
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timeline Phases */}
          <div className="space-y-4">
            {[
              {
                title: "First Few Months",
                color: "elec-yellow",
                icon: Star,
                items: [
                  "Workplace induction and comprehensive safety training",
                  "Basic tool introduction and proper handling techniques",
                  "College enrolment and initial diagnostic assessments",
                  "Meeting your mentor, supervisors, and training assessor",
                  "Understanding company policies and procedures",
                  "Getting your CSCS card and required certifications"
                ]
              },
              {
                title: "Mid-Apprenticeship (Years 2-3)",
                color: "blue-400",
                icon: Zap,
                items: [
                  "Increased independence on real installations",
                  "More complex college assignments and exams",
                  "Substantial portfolio evidence building",
                  "Potential for specialisation choices emerging",
                  "Taking on supervisory responsibilities",
                  "Regular progress reviews with assessor"
                ]
              },
              {
                title: "Final Year",
                color: "green-400",
                icon: Award,
                items: [
                  "Intensive End Point Assessment preparation",
                  "Advanced project work and complex installations",
                  "Career planning and job market research",
                  "Professional qualification completion",
                  "Industry certification (18th Edition)",
                  "JIB grading and registration"
                ]
              }
            ].map((phase, index) => (
              <div key={index} className={`border-l-4 border-${phase.color} pl-4 py-2`}>
                <div className="flex items-center gap-2 mb-3">
                  <phase.icon className={`h-5 w-5 text-${phase.color}`} />
                  <h4 className={`font-semibold text-${phase.color} text-lg`}>{phase.title}</h4>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule Example */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Typical Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {weeklySchedule.map((day, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-center ${
                  day.type === 'college' ? 'bg-blue-500/20 border border-blue-500/30' :
                  day.type === 'study' ? 'bg-purple-500/20 border border-purple-500/30' :
                  'bg-white/5 border border-white/10'
                }`}
              >
                <div className="font-semibold text-white text-sm">{day.day}</div>
                <div className={`text-xs mt-1 ${
                  day.type === 'college' ? 'text-blue-400' :
                  day.type === 'study' ? 'text-purple-400' :
                  'text-elec-yellow'
                }`}>
                  {day.activity}
                </div>
                <div className="text-white text-xs mt-1">{day.hours}</div>
              </div>
            ))}
          </div>
          <p className="text-white text-sm mt-4 text-center">
            Note: Schedules vary by employer and training provider. Some use block release instead of day release.
          </p>
        </CardContent>
      </Card>

      {/* What's Provided vs Responsibilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              What's Provided For You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {whatsProvided.map((item, index) => (
                <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-500/10 transition-colors">
                  <div className="p-2 bg-green-500/20 rounded-lg flex-shrink-0">
                    <item.icon className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">{item.item}</span>
                    <p className="text-white text-xs">{item.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Your Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {yourResponsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-orange-500/10 transition-colors">
                  <div className="p-2 bg-orange-500/20 rounded-lg flex-shrink-0">
                    <item.icon className="h-4 w-4 text-orange-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">{item.item}</span>
                    <p className="text-white text-xs">{item.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Support Network */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Your Support Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { role: "Workplace Mentor", desc: "Day-to-day guidance on site", icon: Wrench, contact: "Ask questions anytime" },
              { role: "College Tutor", desc: "Academic support and guidance", icon: BookOpen, contact: "During college hours" },
              { role: "Training Assessor", desc: "Progress reviews and portfolio", icon: Target, contact: "Regular visits" },
              { role: "HR/Apprentice Lead", desc: "Pastoral support and admin", icon: Heart, contact: "For any concerns" }
            ].map((person, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <person.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h4 className="font-semibold text-white">{person.role}</h4>
                <p className="text-white text-sm mt-1">{person.desc}</p>
                <Badge variant="outline" className="mt-2 text-xs text-white">{person.contact}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSalaryTab = () => (
    <div className="space-y-6">
      <SalaryProgressionChart />

      {/* Additional Salary Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Factors Affecting Your Salary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { factor: "Location", desc: "London pays ~20% more than other regions", impact: "High" },
                { factor: "Company Size", desc: "Larger companies often pay more", impact: "Medium" },
                { factor: "Sector", desc: "Commercial/Industrial pays more than domestic", impact: "Medium" },
                { factor: "Overtime", desc: "Many sites offer overtime at 1.5x rate", impact: "High" },
                { factor: "Performance", desc: "Good reviews can accelerate pay rises", impact: "Medium" }
              ].map((item, index) => (
                <li key={index} className="flex items-start justify-between gap-3 p-2 bg-white/5 border border-white/10 rounded-lg">
                  <div>
                    <span className="text-white font-medium">{item.factor}</span>
                    <p className="text-white text-xs">{item.desc}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs flex-shrink-0 ${
                    item.impact === 'High' ? 'text-green-400 border-green-400/30' : 'text-blue-400 border-blue-400/30'
                  }`}>
                    {item.impact} Impact
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-purple-500/5">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Benefits Beyond Salary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { benefit: "Paid Holiday", value: "20-28 days + bank holidays" },
                { benefit: "Sick Pay", value: "Statutory minimum, often enhanced" },
                { benefit: "Pension", value: "Workplace pension contributions" },
                { benefit: "Training", value: "All course fees covered" },
                { benefit: "Tools", value: "Basic kit provided by employer" },
                { benefit: "PPE", value: "All safety equipment provided" }
              ].map((item, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-white">{item.benefit}</span>
                  <span className="text-purple-400 text-sm font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* After Qualification */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Career Earnings After Qualification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Employed Electrician", salary: "£34k - £45k", desc: "Working for a company" },
              { title: "Self-Employed", salary: "£45k - £70k+", desc: "Running your own business" },
              { title: "Supervisor/Foreman", salary: "£45k - £55k", desc: "Leading teams on site" },
              { title: "Specialist (EV/Solar)", salary: "£50k - £70k+", desc: "Growing demand areas" }
            ].map((path, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-white">{path.title}</h4>
                <div className="text-2xl font-bold text-green-400 my-2">{path.salary}</div>
                <p className="text-white text-xs">{path.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Mobile Tab Content using Accordion
  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible defaultValue="overview" className="w-full">
      <MobileAccordionItem value="overview">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Overview
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderOverviewTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="journey">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Journey
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderJourneyTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="expectations">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Expectations
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderExpectationsTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="salary">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Salary
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderSalaryTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Apprenticeship Expectations
        </h1>
        <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
          Your comprehensive guide to what to expect during your electrical apprenticeship journey -
          from day one to qualification day
        </p>
        <SmartBackButton />
      </div>

      {/* Desktop Tabs / Mobile Accordion */}
      {isMobile ? (
        renderMobileContent()
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-white/5 border border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="journey" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Journey</span>
            </TabsTrigger>
            <TabsTrigger value="expectations" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Expectations</span>
            </TabsTrigger>
            <TabsTrigger value="salary" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Salary</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {renderOverviewTab()}
          </TabsContent>

          <TabsContent value="journey" className="mt-6">
            {renderJourneyTab()}
          </TabsContent>

          <TabsContent value="expectations" className="mt-6">
            {renderExpectationsTab()}
          </TabsContent>

          <TabsContent value="salary" className="mt-6">
            {renderSalaryTab()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ApprenticeshipExpectations;
