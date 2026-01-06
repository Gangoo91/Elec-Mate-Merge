
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Zap,
  Users,
  Wrench,
  BookOpen,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Award,
  GraduationCap,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Clock,
  Search,
  Shield,
  Brain,
  Star,
  ClipboardCheck,
  FileText,
  MessageSquare
} from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";

const Year3 = () => {
  const isMobile = useIsMobile();
  const [expandedMonth, setExpandedMonth] = useState<number | null>(0);
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null);

  const monthlyBreakdown = [
    {
      month: "Month 25-26",
      title: "Advanced Installation Work",
      focus: "Complex electrical systems and installations",
      icon: Wrench,
      color: "text-green-400",
      activities: [
        "Industrial installation principles - three-phase commercial work",
        "High-current systems - larger cables and busbars",
        "Advanced control systems - PLCs and automation basics",
        "Specialist equipment installation - machinery and plant"
      ],
      dayInLife: "You're trusted with more complex work now. Jobs that seemed impossible in Year 1 are now your bread and butter."
    },
    {
      month: "Month 27-28",
      title: "Fault Finding & Diagnostics",
      focus: "Advanced troubleshooting techniques",
      icon: Search,
      color: "text-yellow-400",
      activities: [
        "Systematic fault finding - logical approach to any problem",
        "Advanced test equipment usage - oscilloscopes and thermal imaging",
        "Circuit analysis techniques - reading and interpreting schematics",
        "Repair and maintenance procedures - fixing what others can't"
      ],
      dayInLife: "When something's broken, you're increasingly the one they call. The satisfaction of finding a tricky fault is unmatched."
    },
    {
      month: "Month 29-30",
      title: "Commercial Systems",
      focus: "Commercial and industrial electrical systems",
      icon: Zap,
      color: "text-blue-400",
      activities: [
        "Three-phase distribution systems - substations and HV/LV",
        "Motor control and starters - star-delta, soft starters, VSDs",
        "Building management systems - BMS and integration",
        "Emergency and fire alarm systems - critical life safety"
      ],
      dayInLife: "Commercial work opens new opportunities. Understanding how whole buildings work electrically gives you valuable perspective."
    },
    {
      month: "Month 31-32",
      title: "Supervisory Experience",
      focus: "Leadership and mentoring skills",
      icon: Users,
      color: "text-purple-400",
      activities: [
        "Mentoring junior apprentices - passing on what you've learned",
        "Work planning and coordination - organising jobs efficiently",
        "Quality control and inspection - checking others' work",
        "Health and safety leadership - setting the example"
      ],
      dayInLife: "Remember your first day? Now you're helping others through theirs. Teaching reinforces your own knowledge too."
    },
    {
      month: "Month 33-34",
      title: "EPA Preparation",
      focus: "End Point Assessment preparation",
      icon: Award,
      color: "text-cyan-400",
      activities: [
        "Portfolio completion and review - gathering final evidence",
        "Mock practical assessments - practicing under exam conditions",
        "Professional discussion preparation - talking about your work",
        "Knowledge test revision - filling any gaps"
      ],
      dayInLife: "EPA prep time. Everything you've done for 3+ years comes together now. Trust your training - you're ready for this."
    },
    {
      month: "Month 35-36",
      title: "Year 3 Consolidation",
      focus: "Skills consolidation and assessment",
      icon: Star,
      color: "text-orange-400",
      activities: [
        "Advanced skills demonstration - showing what you can do",
        "Professional competency review - supervisor sign-offs",
        "Career planning discussions - what comes next?",
        "Year 4 transition preparation - final stretch planning"
      ],
      dayInLife: "You can see the finish line. This year is about proving you're ready to be called a qualified electrician."
    }
  ];

  const keyLearningAreas = [
    {
      title: "Advanced Installation Methods",
      icon: Wrench,
      progress: 85,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      topics: [
        "Industrial installation techniques",
        "High-voltage systems (up to 1kV)",
        "Specialist containment systems",
        "Advanced jointing techniques",
        "Complex distribution arrangements"
      ]
    },
    {
      title: "Fault Finding & Diagnostics",
      icon: Search,
      progress: 80,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      topics: [
        "Systematic troubleshooting approaches",
        "Advanced test equipment operation",
        "Circuit analysis and diagnosis",
        "Repair techniques and procedures",
        "Preventive maintenance principles"
      ]
    },
    {
      title: "Commercial & Industrial Systems",
      icon: Zap,
      progress: 75,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      topics: [
        "Three-phase power distribution",
        "Motor control systems (DOL, star-delta, VSD)",
        "Building services integration",
        "Emergency lighting systems",
        "Fire alarm and security systems"
      ]
    },
    {
      title: "Leadership & Mentoring",
      icon: Users,
      progress: 70,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      topics: [
        "Supervising junior apprentices",
        "Work planning and organisation",
        "Communication and delegation",
        "Quality assurance procedures",
        "Health and safety leadership"
      ]
    }
  ];

  const epaPreparation = [
    {
      component: "Practical Assessment",
      icon: Wrench,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      duration: "6 hours",
      weighting: "50%",
      description: "Demonstrate installation, testing, and fault-finding skills under exam conditions",
      preparationTips: [
        "Practice installations under time pressure",
        "Master all testing procedures thoroughly",
        "Develop systematic fault-finding approach",
        "Ensure all portfolio evidence is complete"
      ],
      whatToExpect: "You'll complete a real installation task, test your work, and diagnose a fault - all while being observed and assessed."
    },
    {
      component: "Professional Discussion",
      icon: MessageSquare,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      duration: "60 minutes",
      weighting: "25%",
      description: "Discuss your portfolio evidence and demonstrate knowledge through conversation",
      preparationTips: [
        "Know your portfolio evidence thoroughly",
        "Practice explaining complex technical concepts simply",
        "Prepare for regulation-based questions",
        "Develop confidence in professional communication"
      ],
      whatToExpect: "An assessor will ask about your work experience, how you've applied knowledge, and test your understanding through discussion."
    },
    {
      component: "Knowledge Test",
      icon: Brain,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      duration: "90 minutes",
      weighting: "25%",
      description: "Multiple choice test covering all apprenticeship content areas",
      preparationTips: [
        "Revise all theoretical knowledge systematically",
        "Practice past papers and mock tests",
        "Focus on weak areas identified in practice",
        "Understand regulations and their applications"
      ],
      whatToExpect: "An online or paper-based test with questions covering the entire apprenticeship standard. Use of Regs book allowed."
    }
  ];

  const leadershipOpportunities = [
    {
      opportunity: "Mentor New Apprentices",
      icon: Users,
      color: "text-green-400",
      description: "Guide and support first-year apprentices in their learning journey",
      benefits: ["Develops leadership skills", "Reinforces your own knowledge", "Builds confidence"],
      responsibilities: ["Provide technical guidance", "Share experiences and tips", "Support with challenges"]
    },
    {
      opportunity: "Lead Small Projects",
      icon: ClipboardCheck,
      color: "text-blue-400",
      description: "Take responsibility for planning and executing smaller electrical projects",
      benefits: ["Project management experience", "Increased responsibility", "Problem-solving skills"],
      responsibilities: ["Plan work activities", "Coordinate with team members", "Ensure quality standards"]
    },
    {
      opportunity: "Quality Assurance Role",
      icon: Shield,
      color: "text-purple-400",
      description: "Check and verify work completed by junior team members",
      benefits: ["Attention to detail", "Technical knowledge application", "Quality awareness"],
      responsibilities: ["Inspect completed work", "Identify issues early", "Provide constructive feedback"]
    }
  ];

  const commonChallenges = [
    {
      challenge: "EPA Anxiety",
      icon: Award,
      description: "The End Point Assessment can feel overwhelming after years of preparation",
      solutions: [
        "Start preparation early - don't cram at the end",
        "Attend mock assessments if offered by college",
        "Talk to apprentices who've passed recently",
        "Remember - you've been preparing for 3+ years",
        "Trust your training and experience"
      ]
    },
    {
      challenge: "Increased Responsibility",
      icon: TrendingUp,
      description: "More complex work and expectations to guide others can feel pressuring",
      solutions: [
        "Delegate appropriately - you can't do everything",
        "Ask for help when needed - it's not weakness",
        "Set realistic expectations for yourself",
        "Learn from mistakes without dwelling on them",
        "Remember - even qualified sparkies ask questions"
      ]
    },
    {
      challenge: "Complex Technical Problems",
      icon: Search,
      description: "Advanced fault finding and diagnostics can be frustrating when solutions aren't obvious",
      solutions: [
        "Develop a systematic approach to every fault",
        "Document what you've tried and the results",
        "Don't be afraid to ask for a second opinion",
        "Use manufacturer resources and tech support",
        "Every tricky fault teaches you something new"
      ]
    },
    {
      challenge: "Mentoring Others",
      icon: Users,
      description: "Guiding junior apprentices while still learning yourself can be challenging",
      solutions: [
        "Be patient - remember your first days",
        "You don't need to know everything to help",
        "It's okay to say 'let's find out together'",
        "Teaching reinforces your own learning",
        "Set boundaries - your work matters too"
      ]
    }
  ];

  const weeklyScheduleExample = {
    monday: { location: "Site", activities: "Industrial installation - motor control panel" },
    tuesday: { location: "Site", activities: "Commissioning and testing" },
    wednesday: { location: "College", activities: "EPA preparation, revision sessions" },
    thursday: { location: "Site", activities: "Fault finding on production line" },
    friday: { location: "Site", activities: "Mentoring Y1 apprentice, documentation" }
  };

  const renderHeroSection = () => (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent border border-purple-500/30 p-6 sm:p-8">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-elec-yellow/10 rounded-full blur-2xl" />

      <div className="relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
            <Award className="h-8 w-8 text-purple-400" />
          </div>
          <div>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-2">
              Progression Year
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Year 3: Advanced Skills & EPA Prep</h1>
          </div>
        </div>

        <p className="text-white/80 text-lg mb-6 max-w-3xl">
          Year 3 is where you step up - more complex installations, fault finding, and the beginning of your
          End Point Assessment preparation. You'll also start mentoring junior apprentices.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1">
            <div className="w-12 h-3 rounded-full bg-green-500" />
            <div className="w-12 h-3 rounded-full bg-blue-500" />
            <div className="w-12 h-3 rounded-full bg-purple-500" />
            <div className="w-12 h-3 rounded-full bg-white/20" />
          </div>
          <span className="text-white/60 text-sm ml-2">Year 3 of 4</span>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Calendar className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-white/60 text-sm">Months</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Briefcase className="h-5 w-5 text-green-400 mb-2" />
            <div className="text-2xl font-bold text-white">£24-28k</div>
            <div className="text-white/60 text-sm">Typical Salary</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Award className="h-5 w-5 text-yellow-400 mb-2" />
            <div className="text-2xl font-bold text-white">EPA</div>
            <div className="text-white/60 text-sm">Preparation</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Users className="h-5 w-5 text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-white">Mentor</div>
            <div className="text-white/60 text-sm">New Role</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSalaryProgress = () => (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Salary Progression
        </CardTitle>
        <p className="text-white/70 text-sm">
          Your skills and experience are worth more each year
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white/60 text-xs mb-1">Year 1</p>
            <p className="text-lg font-bold text-white">£16.5k</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white/60 text-xs mb-1">Year 2</p>
            <p className="text-lg font-bold text-white">£20k</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-green-400 text-xs mb-1">Year 3</p>
            <p className="text-lg font-bold text-green-400">£26k</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30">
            <p className="text-white/60 text-xs mb-1">Total Rise</p>
            <p className="text-lg font-bold text-green-400">+58%</p>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-white/80 text-sm">
            <strong className="text-green-400">Looking ahead:</strong> Qualified electricians typically earn £32k-£45k,
            with specialists earning significantly more. Your investment is nearly paying off.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderEPAPrep = () => (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Award className="h-5 w-5" />
          End Point Assessment (EPA) Guide
        </CardTitle>
        <p className="text-white/70 text-sm">
          The final assessment to complete your apprenticeship - here's what to expect
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {epaPreparation.map((item, index) => (
            <div key={index} className={`p-4 rounded-lg ${item.bgColor} border border-white/10`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span className={`font-medium ${item.color}`}>{item.component}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-white/10 text-white/80 border-white/20">
                    {item.duration}
                  </Badge>
                  <Badge variant="outline" className={`${item.bgColor} ${item.color}`}>
                    {item.weighting}
                  </Badge>
                </div>
              </div>
              <p className="text-white/70 text-sm mb-3">{item.description}</p>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 mb-3">
                <p className="text-white/60 text-xs mb-1">What to expect:</p>
                <p className="text-white/80 text-sm">{item.whatToExpect}</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/80 text-xs font-medium mb-2">Preparation Tips:</p>
                {item.preparationTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-xs">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <p className="text-white/80 text-sm">
            <strong className="text-purple-400">EPA Success Rate:</strong> Over 90% of apprentices who attend regularly
            and maintain their portfolio pass first time. If you've put in the work, you're ready.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderLeadership = () => (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Leadership Opportunities
        </CardTitle>
        <p className="text-white/70 text-sm">
          Year 3 apprentices often take on mentoring and leadership roles
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leadershipOpportunities.map((item, index) => (
            <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className={`font-medium ${item.color}`}>{item.opportunity}</span>
              </div>
              <p className="text-white/70 text-sm mb-3">{item.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/80 text-xs font-medium mb-2">Benefits:</p>
                  {item.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-xs">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white/80 text-xs font-medium mb-2">Responsibilities:</p>
                  {item.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Target className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-xs">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderMonthlyTimeline = () => (
    <Card className="border-elec-yellow/20 bg-white/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calendar className="h-5 w-5 text-elec-yellow" />
          Your Year 3 Journey
        </CardTitle>
        <p className="text-white/70 text-sm">
          Click each period to see what to expect
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {monthlyBreakdown.map((period, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden transition-all ${
                expandedMonth === index
                  ? 'border-elec-yellow/40 bg-elec-yellow/5'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setExpandedMonth(expandedMonth === index ? null : index)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${period.color} bg-white/10`}>
                    <period.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{period.title}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-white/5">
                        {period.month}
                      </Badge>
                      <span className="text-white/60 text-sm hidden sm:inline">{period.focus}</span>
                    </div>
                  </div>
                </div>
                {expandedMonth === index ? (
                  <ChevronUp className="h-5 w-5 text-white/60" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-white/60" />
                )}
              </button>

              {expandedMonth === index && (
                <div className="px-4 pb-4 space-y-4">
                  <div className="pl-12">
                    <p className="text-white/70 text-sm italic mb-3">"{period.dayInLife}"</p>
                    <div className="space-y-2">
                      {period.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderLearningAreas = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Target className="h-5 w-5 text-elec-yellow" />
        Key Learning Areas
      </h2>
      <p className="text-white/70">
        By Year 3 end, you should be at or above these competency levels.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keyLearningAreas.map((area, index) => (
          <Card key={index} className={`${area.borderColor} ${area.bgColor} hover:border-opacity-60 transition-all`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className={`flex items-center gap-2 text-lg ${area.color}`}>
                  <area.icon className="h-5 w-5" />
                  {area.title}
                </CardTitle>
                <span className={`text-sm font-bold ${area.color}`}>{area.progress}%</span>
              </div>
              <Progress value={area.progress} className="h-2" />
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {area.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderWeeklySchedule = () => (
    <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Typical Week Example
        </CardTitle>
        <p className="text-white/70 text-sm">
          Complex projects, EPA prep, and mentoring responsibilities
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(weeklyScheduleExample).map(([day, info], index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="w-24 font-medium text-white capitalize">{day}</div>
              <Badge
                variant="outline"
                className={info.location === "College"
                  ? "bg-purple-500/20 text-purple-400 border-purple-500/30 w-16 justify-center"
                  : "bg-green-500/20 text-green-400 border-green-500/30 w-16 justify-center"
                }
              >
                {info.location}
              </Badge>
              <span className="text-white/70 text-sm flex-1">{info.activities}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderChallenges = () => (
    <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-orange-400 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Year 3 Challenges & Solutions
        </CardTitle>
        <p className="text-white/70 text-sm">
          Common hurdles and how to overcome them
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {commonChallenges.map((item, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden transition-all ${
                expandedChallenge === index
                  ? 'border-orange-500/40 bg-orange-500/5'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setExpandedChallenge(expandedChallenge === index ? null : index)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <item.icon className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{item.challenge}</div>
                    <div className="text-white/60 text-sm hidden sm:block">{item.description}</div>
                  </div>
                </div>
                {expandedChallenge === index ? (
                  <ChevronUp className="h-5 w-5 text-white/60 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-white/60 flex-shrink-0" />
                )}
              </button>

              {expandedChallenge === index && (
                <div className="px-4 pb-4">
                  <div className="pl-12 space-y-2">
                    <div className="font-medium text-white text-sm mb-2">Solutions:</div>
                    {item.solutions.map((solution, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible className="w-full">
      <MobileAccordionItem value="salary">
        <MobileAccordionTrigger className="text-white">
          <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
          Salary Progress
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="grid grid-cols-4 gap-2 pt-2">
            <div className="p-2 rounded-lg bg-white/5 text-center">
              <p className="text-white/60 text-xs">Y1</p>
              <p className="font-bold text-white text-sm">£16.5k</p>
            </div>
            <div className="p-2 rounded-lg bg-white/5 text-center">
              <p className="text-white/60 text-xs">Y2</p>
              <p className="font-bold text-white text-sm">£20k</p>
            </div>
            <div className="p-2 rounded-lg bg-green-500/20 text-center">
              <p className="text-green-400 text-xs">Y3</p>
              <p className="font-bold text-green-400 text-sm">£26k</p>
            </div>
            <div className="p-2 rounded-lg bg-green-500/10 text-center">
              <p className="text-white/60 text-xs">Rise</p>
              <p className="font-bold text-green-400 text-sm">+58%</p>
            </div>
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="epa">
        <MobileAccordionTrigger className="text-white">
          <Award className="h-5 w-5 mr-2 text-purple-400" />
          EPA Guide
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-3 pt-2">
            {epaPreparation.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg ${item.bgColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium text-sm ${item.color}`}>{item.component}</span>
                  <Badge variant="outline" className="text-xs bg-white/10">{item.weighting}</Badge>
                </div>
                <p className="text-white/60 text-xs mb-2">{item.description}</p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">{item.duration}</Badge>
                </div>
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="timeline">
        <MobileAccordionTrigger className="text-white">
          <Calendar className="h-5 w-5 mr-2 text-elec-yellow" />
          Monthly Timeline
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-3 pt-2">
            {monthlyBreakdown.map((period, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <period.icon className={`h-4 w-4 ${period.color}`} />
                  <span className="font-medium text-white">{period.title}</span>
                </div>
                <Badge variant="outline" className="mb-2 text-xs">{period.month}</Badge>
                <p className="text-white/60 text-xs">{period.focus}</p>
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="learning">
        <MobileAccordionTrigger className="text-white">
          <Target className="h-5 w-5 mr-2 text-elec-yellow" />
          Learning Areas
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-3 pt-2">
            {keyLearningAreas.map((area, index) => (
              <div key={index} className={`p-3 rounded-lg ${area.bgColor} border ${area.borderColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${area.color}`}>{area.title}</span>
                  <span className={`text-sm ${area.color}`}>{area.progress}%</span>
                </div>
                <Progress value={area.progress} className="h-1.5" />
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="leadership">
        <MobileAccordionTrigger className="text-white">
          <Users className="h-5 w-5 mr-2 text-blue-400" />
          Leadership Roles
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-2 pt-2">
            {leadershipOpportunities.map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  <span className={`font-medium text-sm ${item.color}`}>{item.opportunity}</span>
                </div>
                <p className="text-white/60 text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="challenges">
        <MobileAccordionTrigger className="text-white">
          <AlertTriangle className="h-5 w-5 mr-2 text-orange-400" />
          Common Challenges
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-3 pt-2">
            {commonChallenges.map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="font-medium text-orange-400 text-sm mb-1">{item.challenge}</div>
                <p className="text-white/60 text-xs mb-2">{item.description}</p>
                <div className="text-white/70 text-xs">
                  <strong>Top tip:</strong> {item.solutions[0]}
                </div>
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20 sm:pb-8">
      <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
        <SmartBackButton />
      </div>

      {renderHeroSection()}

      {isMobile ? (
        renderMobileContent()
      ) : (
        <div className="space-y-6">
          {renderSalaryProgress()}

          {renderEPAPrep()}

          {renderMonthlyTimeline()}

          {renderLearningAreas()}

          {renderLeadership()}

          {renderWeeklySchedule()}

          {renderChallenges()}
        </div>
      )}
    </div>
  );
};

export default Year3;
