
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Wrench,
  Shield,
  Users,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  GraduationCap,
  Briefcase,
  Star,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Package,
  Coffee,
  HardHat,
  Zap,
  FileText,
  Heart
} from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";

const Year1 = () => {
  const isMobile = useIsMobile();
  const [expandedMonth, setExpandedMonth] = useState<number | null>(0);
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null);

  const monthlyBreakdown = [
    {
      month: "Month 1-2",
      title: "Induction & Orientation",
      focus: "Workplace safety and basic introduction",
      icon: HardHat,
      color: "text-blue-400",
      activities: [
        "Health & Safety induction - learning site rules and emergency procedures",
        "Company policies and procedures - understanding your employer's expectations",
        "Basic tool introduction - identifying and handling common tools safely",
        "College enrolment process - registering for your qualification"
      ],
      dayInLife: "Your first weeks will feel overwhelming - but that's normal! You'll spend time shadowing experienced electricians, learning names, and getting familiar with how things work."
    },
    {
      month: "Month 3-4",
      title: "Foundation Learning",
      focus: "Basic electrical principles",
      icon: BookOpen,
      color: "text-green-400",
      activities: [
        "Ohm's Law fundamentals - V=IR and power calculations",
        "Basic circuit theory - understanding current flow",
        "Electrical symbols recognition - reading drawings",
        "Simple calculations - using formulas in practice"
      ],
      dayInLife: "You'll start connecting what you learn at college with what you see on site. Keep a notebook handy to write down questions!"
    },
    {
      month: "Month 5-6",
      title: "Practical Introduction",
      focus: "Hands-on experience begins",
      icon: Wrench,
      color: "text-yellow-400",
      activities: [
        "Cable stripping and termination - preparing cables properly",
        "Basic wiring techniques - making safe connections",
        "Tool usage practice - building muscle memory",
        "Site observation - understanding how projects progress"
      ],
      dayInLife: "This is when things get exciting! You'll start using your hands more, making real connections, and seeing your work come to life."
    },
    {
      month: "Month 7-8",
      title: "Skills Development",
      focus: "Building practical competencies",
      icon: Target,
      color: "text-purple-400",
      activities: [
        "Conduit bending basics - creating neat cable routes",
        "Socket and switch installation - your first complete jobs",
        "Trunking systems - commercial wiring methods",
        "Basic testing procedures - checking your work"
      ],
      dayInLife: "You might start being given small tasks to complete independently. This trust is earned - keep asking questions and double-check your work."
    },
    {
      month: "Month 9-10",
      title: "Knowledge Expansion",
      focus: "Broadening understanding",
      icon: GraduationCap,
      color: "text-cyan-400",
      activities: [
        "Three-phase systems introduction - industrial power basics",
        "Motor connections - understanding rotating machines",
        "Control circuits basics - switches and relays",
        "First college assessments - proving your knowledge"
      ],
      dayInLife: "College work ramps up now. Balancing site work and study takes effort - use your commute time to review notes or listen to electrical podcasts."
    },
    {
      month: "Month 11-12",
      title: "Year 1 Consolidation",
      focus: "Review and assessment preparation",
      icon: Star,
      color: "text-orange-400",
      activities: [
        "Portfolio development - documenting your achievements",
        "Skills assessment preparation - practicing for tests",
        "Theory revision - filling knowledge gaps",
        "Year 2 preparation - looking ahead"
      ],
      dayInLife: "Reflect on how far you've come! This is a good time to update your portfolio and set goals for Year 2."
    }
  ];

  const keyLearningAreas = [
    {
      title: "Health & Safety",
      icon: Shield,
      progress: 85,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      topics: [
        "Construction (Design and Management) Regulations",
        "Personal Protective Equipment (PPE) requirements",
        "Risk assessment principles and RAMS",
        "Emergency procedures and first aid awareness",
        "Safe working practices and isolation"
      ]
    },
    {
      title: "Basic Electrical Theory",
      icon: BookOpen,
      progress: 70,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      topics: [
        "Ohm's Law and power calculations (P=IV)",
        "Series and parallel circuits behaviour",
        "AC and DC fundamentals and waveforms",
        "Electrical symbols and circuit diagrams",
        "Units, prefixes and measurements"
      ]
    },
    {
      title: "Practical Skills",
      icon: Wrench,
      progress: 60,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      topics: [
        "Cable preparation, stripping and termination",
        "Basic wiring techniques and connections",
        "Tool usage, care and maintenance",
        "Socket, switch and light installation",
        "Conduit bending and trunking systems"
      ]
    },
    {
      title: "Professional Development",
      icon: Users,
      progress: 75,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      topics: [
        "Communication with colleagues and customers",
        "Teamwork and collaboration on projects",
        "Time management and punctuality",
        "Following instructions accurately",
        "Professional workplace behaviour"
      ]
    }
  ];

  const commonChallenges = [
    {
      challenge: "Information Overload",
      icon: BookOpen,
      description: "Feeling overwhelmed by the amount of new information coming at you from all directions",
      solutions: [
        "Take notes regularly - carry a small notebook on site",
        "Ask questions when unclear - there are no stupid questions",
        "Break learning into manageable chunks - focus on one topic at a time",
        "Use visual aids, diagrams and YouTube videos to reinforce learning"
      ]
    },
    {
      challenge: "Practical vs Theory Gap",
      icon: Lightbulb,
      description: "Difficulty connecting what you learn at college with what you see on site",
      solutions: [
        "Discuss college topics with your workplace mentor",
        "Ask to see real examples of theoretical concepts on site",
        "Keep a learning journal connecting theory to practice",
        "Practice calculations using real job scenarios"
      ]
    },
    {
      challenge: "Confidence Building",
      icon: Heart,
      description: "Feeling nervous about making mistakes, asking questions, or not knowing enough",
      solutions: [
        "Remember - everyone was a beginner once, including your mentor",
        "Asking questions shows you're engaged and want to learn",
        "Learn from mistakes rather than fearing them",
        "Celebrate small achievements - they all add up"
      ]
    },
    {
      challenge: "Physical Demands",
      icon: Zap,
      description: "Adjusting to the physical nature of the work - standing, lifting, working in awkward positions",
      solutions: [
        "Build stamina gradually - it gets easier",
        "Wear proper footwear with good support",
        "Learn proper lifting techniques to protect your back",
        "Stay hydrated and eat well to maintain energy"
      ]
    }
  ];

  const firstDaySurvival = [
    { item: "Arrive 15 minutes early", icon: Clock, tip: "Shows reliability and gives you time to settle" },
    { item: "Bring a notebook and pen", icon: FileText, tip: "You'll need to write down instructions and notes" },
    { item: "Wear appropriate clothing", icon: HardHat, tip: "Steel toe boots, work trousers, and layers" },
    { item: "Bring your lunch and water", icon: Coffee, tip: "You might not be near shops on site" },
    { item: "Have ID and documents ready", icon: Briefcase, tip: "CSCS card, driving licence, bank details" },
    { item: "Charge your phone fully", icon: Zap, tip: "You may need to call or use maps" }
  ];

  const basicToolkit = [
    { tool: "Side cutters", purpose: "Cutting cables cleanly", priority: "Essential" },
    { tool: "Pliers (combination)", purpose: "Gripping and twisting wires", priority: "Essential" },
    { tool: "Wire strippers", purpose: "Removing cable insulation safely", priority: "Essential" },
    { tool: "Flat screwdriver set", purpose: "Terminal connections", priority: "Essential" },
    { tool: "Phillips screwdriver set", purpose: "Accessory fixings", priority: "Essential" },
    { tool: "Voltage tester", purpose: "Checking circuits are dead", priority: "Essential" },
    { tool: "Tape measure (5m)", purpose: "Measuring cable runs", priority: "Essential" },
    { tool: "Stanley knife", purpose: "Cutting and stripping", priority: "Essential" },
    { tool: "Electrical tape", purpose: "Insulation and marking", priority: "Essential" },
    { tool: "Spirit level (small)", purpose: "Keeping things straight", priority: "Useful" },
    { tool: "Torch/headlamp", purpose: "Working in dark spaces", priority: "Useful" },
    { tool: "Tool belt/pouch", purpose: "Keeping tools accessible", priority: "Useful" }
  ];

  const weeklyScheduleExample = {
    monday: { location: "Site", activities: "Working with mentor on domestic rewire" },
    tuesday: { location: "Site", activities: "Continuing rewire, first fix work" },
    wednesday: { location: "College", activities: "Theory classes, practical workshop" },
    thursday: { location: "Site", activities: "Second fix and testing observation" },
    friday: { location: "Site", activities: "Finishing jobs, site cleanup, portfolio time" }
  };

  const renderHeroSection = () => (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-yellow/20 via-elec-yellow/10 to-transparent border border-elec-yellow/30 p-6 sm:p-8">
      <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />

      <div className="relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="p-4 bg-elec-yellow/20 rounded-xl border border-elec-yellow/30">
            <GraduationCap className="h-8 w-8 text-elec-yellow" />
          </div>
          <div>
            <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 mb-2">
              Foundation Year
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Year 1: Building Your Foundations</h1>
          </div>
        </div>

        <p className="text-white/80 text-lg mb-6 max-w-3xl">
          Your first year is all about learning the basics - safety comes first, then building your knowledge
          of electrical principles and developing practical skills that will serve you throughout your career.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1">
            <div className="w-12 h-3 rounded-full bg-elec-yellow" />
            <div className="w-12 h-3 rounded-full bg-white/20" />
            <div className="w-12 h-3 rounded-full bg-white/20" />
            <div className="w-12 h-3 rounded-full bg-white/20" />
          </div>
          <span className="text-white/60 text-sm ml-2">Year 1 of 4</span>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Calendar className="h-5 w-5 text-elec-yellow mb-2" />
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-white/60 text-sm">Months</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Briefcase className="h-5 w-5 text-green-400 mb-2" />
            <div className="text-2xl font-bold text-white">£15-18k</div>
            <div className="text-white/60 text-sm">Typical Salary</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <BookOpen className="h-5 w-5 text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-white">80/20</div>
            <div className="text-white/60 text-sm">Work/Training Split</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Target className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-white">Safety</div>
            <div className="text-white/60 text-sm">Primary Focus</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFirstDaySurvival = () => (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Star className="h-5 w-5" />
          First Day Survival Guide
        </CardTitle>
        <p className="text-white/70 text-sm">
          Your first day can be nerve-wracking. Here's how to make a great impression.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {firstDaySurvival.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="p-2 rounded-lg bg-green-500/20">
                <item.icon className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <div className="font-medium text-white text-sm">{item.item}</div>
                <div className="text-white/60 text-xs">{item.tip}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderBasicToolkit = () => (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Package className="h-5 w-5" />
          Your Basic Toolkit
        </CardTitle>
        <p className="text-white/70 text-sm">
          Tools you'll need to acquire during Year 1. Many employers provide these, but it's good to have your own.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {basicToolkit.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <Wrench className="h-4 w-4 text-elec-yellow" />
                <div>
                  <div className="font-medium text-white text-sm">{item.tool}</div>
                  <div className="text-white/60 text-xs">{item.purpose}</div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={item.priority === "Essential"
                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                }
              >
                {item.priority}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
          <p className="text-white/80 text-sm">
            <strong className="text-elec-yellow">Tip:</strong> Ask your employer what they provide before buying.
            Quality tools last longer - buy the best you can afford.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderMonthlyTimeline = () => (
    <Card className="border-elec-yellow/20 bg-white/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calendar className="h-5 w-5 text-elec-yellow" />
          Your Year 1 Journey
        </CardTitle>
        <p className="text-white/70 text-sm">
          Click each period to see what to expect and tips for success
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
        These are the main areas you'll develop during Year 1. Progress bars show typical expectations by year end.
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
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Typical Week Example
        </CardTitle>
        <p className="text-white/70 text-sm">
          Your schedule will vary, but here's what a typical week might look like
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
          Common Year 1 Challenges & How to Overcome Them
        </CardTitle>
        <p className="text-white/70 text-sm">
          Everyone faces these challenges - knowing about them helps you prepare
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

  const renderSuccessTips = () => (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Keys to Year 1 Success
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Do These Things
            </h4>
            <ul className="space-y-2">
              <li className="text-white/80 text-sm flex items-start gap-2">
                <span className="text-green-400">+</span>
                Ask questions - lots of them
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <span className="text-green-400">+</span>
                Be early, every day
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <span className="text-green-400">+</span>
                Keep your portfolio up to date
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <span className="text-green-400">+</span>
                Help with cleanup and tidying
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <span className="text-green-400">+</span>
                Stay off your phone on site
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              Avoid These Mistakes
            </h4>
            <ul className="space-y-2">
              <li className="text-white/80 text-sm flex items-start gap-2">
                <span className="text-red-400">-</span>
                Pretending you understand when you don't
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <span className="text-red-400">-</span>
                Skipping college or being late
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <span className="text-red-400">-</span>
                Leaving your portfolio until the end
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <span className="text-red-400">-</span>
                Being afraid to make mistakes
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <span className="text-red-400">-</span>
                Thinking you know it all
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible className="w-full">
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
                <p className="text-white/60 text-xs mb-2">{period.focus}</p>
                <div className="space-y-1">
                  {period.activities.slice(0, 2).map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-1">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-xs">{activity.split(' - ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="firstday">
        <MobileAccordionTrigger className="text-white">
          <Star className="h-5 w-5 mr-2 text-green-400" />
          First Day Guide
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-2 pt-2">
            {firstDaySurvival.map((item, index) => (
              <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
                <item.icon className="h-4 w-4 text-green-400 mt-0.5" />
                <div>
                  <div className="text-white text-sm font-medium">{item.item}</div>
                  <div className="text-white/60 text-xs">{item.tip}</div>
                </div>
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="toolkit">
        <MobileAccordionTrigger className="text-white">
          <Package className="h-5 w-5 mr-2 text-elec-yellow" />
          Basic Toolkit
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-2 pt-2">
            {basicToolkit.filter(t => t.priority === "Essential").map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-elec-yellow" />
                  <span className="text-white text-sm">{item.tool}</span>
                </div>
                <Badge variant="outline" className="text-xs bg-red-500/20 text-red-400 border-red-500/30">
                  Essential
                </Badge>
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="learning">
        <MobileAccordionTrigger className="text-white">
          <Target className="h-5 w-5 mr-2 text-blue-400" />
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
                  <strong>Solution:</strong> {item.solutions[0]}
                </div>
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="tips">
        <MobileAccordionTrigger className="text-white">
          <Lightbulb className="h-5 w-5 mr-2 text-elec-yellow" />
          Success Tips
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-4 pt-2">
            <div>
              <h4 className="font-medium text-green-400 text-sm mb-2">Do These:</h4>
              <ul className="space-y-1">
                <li className="text-white/80 text-xs">+ Ask questions - lots of them</li>
                <li className="text-white/80 text-xs">+ Be early, every day</li>
                <li className="text-white/80 text-xs">+ Keep your portfolio up to date</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-400 text-sm mb-2">Avoid These:</h4>
              <ul className="space-y-1">
                <li className="text-white/80 text-xs">- Pretending you understand when you don't</li>
                <li className="text-white/80 text-xs">- Skipping college or being late</li>
                <li className="text-white/80 text-xs">- Leaving your portfolio until the end</li>
              </ul>
            </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderFirstDaySurvival()}
            {renderBasicToolkit()}
          </div>

          {renderMonthlyTimeline()}

          {renderLearningAreas()}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderWeeklySchedule()}
            {renderSuccessTips()}
          </div>

          {renderChallenges()}
        </div>
      )}
    </div>
  );
};

export default Year1;
