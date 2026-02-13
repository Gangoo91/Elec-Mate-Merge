
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Zap,
  FileText,
  Wrench,
  BookOpen,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  GraduationCap,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Shield,
  Settings,
  Gauge,
  ClipboardCheck,
  Brain,
  Award,
  Clock
} from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";

const Year2 = () => {
  const isMobile = useIsMobile();
  const [expandedMonth, setExpandedMonth] = useState<number | null>(0);
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null);

  const monthlyBreakdown = [
    {
      month: "Month 13-14",
      title: "Regulations Introduction",
      focus: "BS 7671 Wiring Regulations fundamentals",
      icon: BookOpen,
      color: "text-blue-400",
      activities: [
        "Introduction to BS 7671 - understanding its purpose and structure",
        "Regulation structure - learning to navigate the 'Regs'",
        "Design principles basics - understanding circuit design",
        "Cable selection fundamentals - choosing the right cables"
      ],
      dayInLife: "The 'Big Blue Book' becomes your new best friend. It seems daunting at first, but you'll soon learn how to find what you need quickly."
    },
    {
      month: "Month 15-16",
      title: "Installation Methods",
      focus: "Practical installation techniques",
      icon: Wrench,
      color: "text-green-400",
      activities: [
        "Different wiring systems - PVC, SWA, MICC, conduit",
        "Cable routing and support - clipping distances and methods",
        "Containment systems - trunking, tray, and ladder",
        "Protection methods - MCBs, RCDs, and isolators"
      ],
      dayInLife: "You'll start working more independently on installations. Your mentor will check your work but give you more responsibility."
    },
    {
      month: "Month 17-18",
      title: "Testing & Inspection Basics",
      focus: "Introduction to electrical testing",
      icon: Gauge,
      color: "text-yellow-400",
      activities: [
        "Test equipment introduction - multifunction testers and their uses",
        "Continuity testing - ring final circuits and protective conductors",
        "Insulation resistance testing - understanding acceptable values",
        "Basic fault finding - systematic approaches to problem solving"
      ],
      dayInLife: "Learning to test properly is crucial. Your first tests will feel slow, but accuracy matters more than speed at this stage."
    },
    {
      month: "Month 19-20",
      title: "Advanced Installations",
      focus: "More complex installation work",
      icon: Zap,
      color: "text-purple-400",
      activities: [
        "Three-phase installations - commercial and industrial basics",
        "Motor control circuits - DOL starters and contactors",
        "Distribution board work - sub-main installations",
        "Emergency lighting systems - maintained and non-maintained"
      ],
      dayInLife: "Industrial work opens up new challenges. Three-phase can be intimidating but follows the same principles you already know."
    },
    {
      month: "Month 21-22",
      title: "Portfolio Development",
      focus: "Evidence collection and documentation",
      icon: FileText,
      color: "text-cyan-400",
      activities: [
        "Work-based evidence gathering - photos, signatures, documents",
        "Portfolio structuring - organising evidence properly",
        "Photographic evidence - quality images of your work",
        "Competency demonstration - proving what you can do"
      ],
      dayInLife: "If you've been keeping up, this is just about organising. If not, it's time to catch up - don't leave it until Year 4!"
    },
    {
      month: "Month 23-24",
      title: "Year 2 Assessment",
      focus: "Skills consolidation and assessment",
      icon: Award,
      color: "text-orange-400",
      activities: [
        "Practical skills assessment - demonstrating competence",
        "Theory examination preparation - revision and practice",
        "Portfolio submission - end of year review",
        "Year 3 preparation - looking ahead to advanced topics"
      ],
      dayInLife: "Assessment time! Stay calm, trust your training, and remember - you've been doing this work all year. The exam just proves it."
    }
  ];

  const keyLearningAreas = [
    {
      title: "BS 7671 Wiring Regulations",
      icon: BookOpen,
      progress: 75,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      topics: [
        "Regulation structure and navigation",
        "Design requirements and calculations",
        "Cable selection and sizing",
        "Protection and earthing arrangements",
        "Special locations introduction"
      ]
    },
    {
      title: "Installation Techniques",
      icon: Wrench,
      progress: 80,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      topics: [
        "Different wiring systems and applications",
        "Containment and support methods",
        "Jointing and termination techniques",
        "Distribution board installation",
        "Circuit protection device selection"
      ]
    },
    {
      title: "Testing & Inspection",
      icon: Gauge,
      progress: 65,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      topics: [
        "Test equipment usage and calibration",
        "Continuity testing procedures",
        "Insulation resistance testing",
        "Earth fault loop impedance",
        "RCD testing basics"
      ]
    },
    {
      title: "Documentation Skills",
      icon: FileText,
      progress: 70,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      topics: [
        "Electrical installation certificates",
        "Test result recording and interpretation",
        "Portfolio evidence collection",
        "Work method statements",
        "Risk assessment participation"
      ]
    }
  ];

  const testEquipmentGuide = [
    {
      equipment: "Multifunction Tester",
      purpose: "Performs multiple electrical tests in one unit",
      tests: ["Continuity", "Insulation resistance", "Loop impedance", "RCD testing"],
      tips: "Learn one test at a time - master continuity first"
    },
    {
      equipment: "Voltage Indicator",
      purpose: "Confirms circuits are dead before working",
      tests: ["Voltage presence", "Live/Neutral/Earth identification"],
      tips: "Always prove - test - prove. Never assume a circuit is dead"
    },
    {
      equipment: "Earth Loop Tester",
      purpose: "Measures impedance of earth fault path",
      tests: ["Ze (external)", "Zs (total loop)"],
      tips: "Understand what the readings mean, not just how to get them"
    },
    {
      equipment: "RCD Tester",
      purpose: "Tests Residual Current Device operation",
      tests: ["Trip time", "Trip current"],
      tips: "Know the different test modes (x1, x5, ramp)"
    }
  ];

  const bs7671Survival = {
    parts: [
      { number: 1, title: "Scope, object and fundamental principles", key: "Safety first - always" },
      { number: 2, title: "Definitions", key: "Know the terminology" },
      { number: 3, title: "Assessment of general characteristics", key: "Understanding the installation" },
      { number: 4, title: "Protection for safety", key: "Most referenced section" },
      { number: 5, title: "Selection and erection of equipment", key: "Practical applications" },
      { number: 6, title: "Inspection and testing", key: "Your testing bible" },
      { number: 7, title: "Special installations or locations", key: "Bathrooms, swimming pools, etc" }
    ],
    topTips: [
      "Use the index - don't try to memorise everything",
      "Highlight key regulations you use often",
      "Practice 'regulation finding' exercises",
      "Understand the 'why' not just the 'what'",
      "Compare On-Site Guide with full regulations"
    ]
  };

  const commonChallenges = [
    {
      challenge: "BS 7671 Overwhelm",
      icon: BookOpen,
      description: "The regulations book can seem impossibly large and complex at first",
      solutions: [
        "Start with Part 1 (scope) and Part 6 (testing) - most practical sections",
        "Use the On-Site Guide alongside the full regulations",
        "Practice finding regulations using the index",
        "Join study groups with other apprentices",
        "Don't try to memorise - learn to navigate"
      ]
    },
    {
      challenge: "Testing Confidence",
      icon: Gauge,
      description: "Using expensive test equipment and interpreting results correctly",
      solutions: [
        "Ask to observe testing before doing it yourself",
        "Understand what each test is checking for",
        "Learn acceptable values for common tests",
        "Practice on known-good circuits first",
        "Always follow the test sequence correctly"
      ]
    },
    {
      challenge: "Increased Expectations",
      icon: TrendingUp,
      description: "More responsibility and complex tasks expected compared to Year 1",
      solutions: [
        "Communicate when you need guidance",
        "Double-check your work before saying it's complete",
        "Ask for feedback regularly",
        "Take notes on corrections and learn from them",
        "It's okay to say 'I haven't done this before'"
      ]
    },
    {
      challenge: "Balancing Theory & Practice",
      icon: Brain,
      description: "College work gets harder while site work demands more attention",
      solutions: [
        "Connect what you learn in college to real work",
        "Use commute time for revision or podcasts",
        "Set aside dedicated study time each week",
        "Ask mentors to explain theory behind site work",
        "Keep your portfolio updated weekly, not monthly"
      ]
    }
  ];

  const developmentMilestones = [
    {
      milestone: "First BS 7671 Assessment",
      icon: BookOpen,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      description: "Successfully pass your first wiring regulations examination",
      importance: "Foundation for all future electrical work and certification",
      tips: [
        "Use the regulations book regularly - get comfortable with it",
        "Practice regulation finding exercises daily",
        "Join study groups with other apprentices"
      ]
    },
    {
      milestone: "First Independent Test",
      icon: Gauge,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      description: "Complete your first full electrical test sequence independently",
      importance: "Testing is a core skill for qualified electricians",
      tips: [
        "Understand each test purpose before performing it",
        "Follow the correct test sequence every time",
        "Learn to interpret results, not just record them"
      ]
    },
    {
      milestone: "Distribution Board Install",
      icon: Zap,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      description: "Complete a consumer unit or distribution board installation",
      importance: "Shows you can handle complex, critical work",
      tips: [
        "Plan the layout before starting",
        "Label everything clearly",
        "Take photos for your portfolio"
      ]
    },
    {
      milestone: "Portfolio 50% Complete",
      icon: FileText,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      description: "Reach the halfway point in your evidence collection",
      importance: "Staying on track prevents Year 4 panic",
      tips: [
        "Review portfolio requirements regularly",
        "Collect evidence as you complete work",
        "Get supervisor signatures while tasks are fresh"
      ]
    }
  ];

  const weeklyScheduleExample = {
    monday: { location: "Site", activities: "Commercial installation - containment work" },
    tuesday: { location: "Site", activities: "Distribution board installation" },
    wednesday: { location: "College", activities: "BS 7671 theory, testing practical" },
    thursday: { location: "Site", activities: "Final circuits and testing under supervision" },
    friday: { location: "Site", activities: "Snagging, documentation, portfolio time" }
  };

  const renderHeroSection = () => (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent border border-blue-500/30 p-6 sm:p-8">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-elec-yellow/10 rounded-full blur-2xl" />

      <div className="relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
            <BookOpen className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-2">
              Development Year
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Year 2: Regulations & Testing</h1>
          </div>
        </div>

        <p className="text-white text-lg mb-6 max-w-3xl">
          Building on your foundations, Year 2 introduces the critical skills of understanding wiring regulations
          and electrical testing. This knowledge underpins everything you'll do as a qualified electrician.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1">
            <div className="w-12 h-3 rounded-full bg-green-500" />
            <div className="w-12 h-3 rounded-full bg-blue-500" />
            <div className="w-12 h-3 rounded-full bg-white/20" />
            <div className="w-12 h-3 rounded-full bg-white/20" />
          </div>
          <span className="text-white text-sm ml-2">Year 2 of 4</span>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Calendar className="h-5 w-5 text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-white text-sm">Months</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Briefcase className="h-5 w-5 text-green-400 mb-2" />
            <div className="text-2xl font-bold text-white">£18-22k</div>
            <div className="text-white text-sm">Typical Salary</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <BookOpen className="h-5 w-5 text-yellow-400 mb-2" />
            <div className="text-2xl font-bold text-white">BS 7671</div>
            <div className="text-white text-sm">Key Learning</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Gauge className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-white">Testing</div>
            <div className="text-white text-sm">New Skill</div>
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
        <p className="text-white text-sm">
          Your value increases as your skills develop
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white text-sm mb-1">Year 1</p>
            <p className="text-xl font-bold text-white">£16,500</p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-green-400 text-sm mb-1">Year 2</p>
            <p className="text-xl font-bold text-green-400">£20,000</p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30">
            <p className="text-white text-sm mb-1">Increase</p>
            <p className="text-xl font-bold text-green-400">+21%</p>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-white text-sm">
            <strong className="text-green-400">Note:</strong> Salaries vary by employer, region, and overtime.
            Your growing skills and productivity justify regular pay increases.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderBS7671Guide = () => (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          BS 7671 Survival Guide
        </CardTitle>
        <p className="text-white text-sm">
          The Wiring Regulations - your new best friend
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-white">The 7 Parts:</h4>
          {bs7671Survival.parts.map((part, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 w-8 justify-center">
                  {part.number}
                </Badge>
                <span className="text-white text-sm">{part.title}</span>
              </div>
              <span className="text-white text-xs hidden sm:block">{part.key}</span>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <h4 className="font-medium text-blue-400 mb-2">Top Tips:</h4>
          <ul className="space-y-1">
            {bs7671Survival.topTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  const renderTestEquipment = () => (
    <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          Test Equipment Guide
        </CardTitle>
        <p className="text-white text-sm">
          Understanding your testing tools
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {testEquipmentGuide.map((item, index) => (
            <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-yellow-400" />
                <span className="font-medium text-white">{item.equipment}</span>
              </div>
              <p className="text-white text-sm mb-2">{item.purpose}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {item.tests.map((test, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                    {test}
                  </Badge>
                ))}
              </div>
              <p className="text-white text-xs italic">Tip: {item.tips}</p>
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
          Your Year 2 Journey
        </CardTitle>
        <p className="text-white text-sm">
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
                      <span className="text-white text-sm hidden sm:inline">{period.focus}</span>
                    </div>
                  </div>
                </div>
                {expandedMonth === index ? (
                  <ChevronUp className="h-5 w-5 text-white" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-white" />
                )}
              </button>

              {expandedMonth === index && (
                <div className="px-4 pb-4 space-y-4">
                  <div className="pl-12">
                    <p className="text-white text-sm italic mb-3">"{period.dayInLife}"</p>
                    <div className="space-y-2">
                      {period.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white text-sm">{activity}</span>
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
      <p className="text-white">
        Progress bars show typical expectations by Year 2 end.
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
                    <span className="text-white">{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMilestones = () => (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Award className="h-5 w-5" />
          Key Development Milestones
        </CardTitle>
        <p className="text-white text-sm">
          Major achievements to target during Year 2
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {developmentMilestones.map((item, index) => (
            <div key={index} className={`p-4 rounded-lg ${item.bgColor} border border-white/10`}>
              <div className="flex items-center gap-2 mb-2">
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className={`font-medium ${item.color}`}>{item.milestone}</span>
              </div>
              <p className="text-white text-sm mb-2">{item.description}</p>
              <p className="text-white text-xs mb-3">
                <strong className="text-white">Why it matters:</strong> {item.importance}
              </p>
              <div className="space-y-1">
                {item.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-xs">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderWeeklySchedule = () => (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Typical Week Example
        </CardTitle>
        <p className="text-white text-sm">
          More complex work and increased responsibility
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
              <span className="text-white text-sm flex-1">{info.activities}</span>
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
          Year 2 Challenges & Solutions
        </CardTitle>
        <p className="text-white text-sm">
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
                    <div className="text-white text-sm hidden sm:block">{item.description}</div>
                  </div>
                </div>
                {expandedChallenge === index ? (
                  <ChevronUp className="h-5 w-5 text-white flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-white flex-shrink-0" />
                )}
              </button>

              {expandedChallenge === index && (
                <div className="px-4 pb-4">
                  <div className="pl-12 space-y-2">
                    <div className="font-medium text-white text-sm mb-2">Solutions:</div>
                    {item.solutions.map((solution, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-sm">{solution}</span>
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
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="p-2 rounded-lg bg-white/5 text-center">
              <p className="text-white text-xs">Year 1</p>
              <p className="font-bold text-white">£16.5k</p>
            </div>
            <div className="p-2 rounded-lg bg-green-500/20 text-center">
              <p className="text-green-400 text-xs">Year 2</p>
              <p className="font-bold text-green-400">£20k</p>
            </div>
            <div className="p-2 rounded-lg bg-green-500/10 text-center">
              <p className="text-white text-xs">Increase</p>
              <p className="font-bold text-green-400">+21%</p>
            </div>
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
                <p className="text-white text-xs">{period.focus}</p>
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="bs7671">
        <MobileAccordionTrigger className="text-white">
          <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
          BS 7671 Guide
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-2 pt-2">
            {bs7671Survival.parts.slice(0, 4).map((part, index) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 w-6 justify-center text-xs">
                  {part.number}
                </Badge>
                <span className="text-white text-xs">{part.title}</span>
              </div>
            ))}
            <p className="text-white text-xs mt-2">+ 3 more parts...</p>
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="testing">
        <MobileAccordionTrigger className="text-white">
          <Gauge className="h-5 w-5 mr-2 text-yellow-400" />
          Test Equipment
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-2 pt-2">
            {testEquipmentGuide.map((item, index) => (
              <div key={index} className="p-2 rounded-lg bg-white/5">
                <span className="font-medium text-white text-sm">{item.equipment}</span>
                <p className="text-white text-xs">{item.purpose}</p>
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

      <MobileAccordionItem value="milestones">
        <MobileAccordionTrigger className="text-white">
          <Award className="h-5 w-5 mr-2 text-elec-yellow" />
          Key Milestones
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-2 pt-2">
            {developmentMilestones.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg ${item.bgColor}`}>
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  <span className={`font-medium text-sm ${item.color}`}>{item.milestone}</span>
                </div>
                <p className="text-white text-xs">{item.description}</p>
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
                <p className="text-white text-xs mb-2">{item.description}</p>
                <div className="text-white text-xs">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderBS7671Guide()}
            {renderTestEquipment()}
          </div>

          {renderMonthlyTimeline()}

          {renderLearningAreas()}

          {renderMilestones()}

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {renderWeeklySchedule()}
          </div>

          {renderChallenges()}
        </div>
      )}
    </div>
  );
};

export default Year2;
