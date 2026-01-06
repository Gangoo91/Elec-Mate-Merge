
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Briefcase,
  TrendingUp,
  BookOpen,
  Calendar,
  Target,
  CheckCircle,
  Star,
  Users,
  MapPin,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Zap,
  Building2,
  Sun,
  Search,
  FileText,
  Clock,
  AlertTriangle,
  Lightbulb,
  PartyPopper,
  Rocket,
  DollarSign,
  Heart
} from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";

const Year4 = () => {
  const isMobile = useIsMobile();
  const [expandedMonth, setExpandedMonth] = useState<number | null>(0);
  const [expandedPathway, setExpandedPathway] = useState<number | null>(null);

  const monthlyBreakdown = [
    {
      month: "Month 37-38",
      title: "Specialisation Focus",
      focus: "Choose and develop specialist skills",
      icon: Target,
      color: "text-purple-400",
      activities: [
        "Select specialisation pathway - industrial, renewables, smart tech, or testing",
        "Advanced technical training - specialist courses and certifications",
        "Industry certification pursuit - manufacturer training and accreditations",
        "Specialist project involvement - getting hands-on with your chosen area"
      ],
      dayInLife: "This is where you start to shape your future. The specialisation you choose now can define your career for years."
    },
    {
      month: "Month 39-40",
      title: "EPA Execution",
      focus: "Complete End Point Assessment",
      icon: Award,
      color: "text-yellow-400",
      activities: [
        "Final EPA preparation - mock assessments and revision",
        "Practical assessment completion - 6 hours of demonstration",
        "Professional discussion - 1 hour presenting your portfolio",
        "Knowledge test completion - 90-minute written exam"
      ],
      dayInLife: "The big moment arrives. Everything you've worked for over 4 years comes down to these assessments. You've got this."
    },
    {
      month: "Month 41-42",
      title: "Career Preparation",
      focus: "Transition to qualified electrician",
      icon: Briefcase,
      color: "text-blue-400",
      activities: [
        "Job market research - understanding what's out there",
        "CV and portfolio finalisation - showing your best work",
        "Interview preparation - practicing common questions",
        "Professional networking - making connections in the industry"
      ],
      dayInLife: "You've passed EPA - now it's about your next chapter. This is an exciting time of possibilities."
    },
    {
      month: "Month 43-44",
      title: "Professional Development",
      focus: "Industry recognition and advancement",
      icon: GraduationCap,
      color: "text-green-400",
      activities: [
        "Professional body membership - JIB, IET, or similar",
        "Continuing Professional Development planning - staying sharp",
        "Advanced qualification research - HNC, degree apprenticeship?",
        "Mentoring program participation - giving back to new apprentices"
      ],
      dayInLife: "As a qualified sparky, you're now investing in your longer-term career development and reputation."
    },
    {
      month: "Month 45-46",
      title: "Transition Planning",
      focus: "Prepare for post-apprenticeship career",
      icon: Rocket,
      color: "text-cyan-400",
      activities: [
        "Employment contract negotiation - getting the pay you deserve",
        "Further education planning - if that's your path",
        "Professional goal setting - where do you want to be in 5 years?",
        "Industry networking expansion - building your reputation"
      ],
      dayInLife: "Whether staying with your employer or moving on, you're now negotiating as a qualified professional."
    },
    {
      month: "Month 47-48",
      title: "Completion & Qualification",
      focus: "Apprenticeship completion and celebration",
      icon: PartyPopper,
      color: "text-elec-yellow",
      activities: [
        "Final assessments and reviews - wrapping up loose ends",
        "Qualification certification - official recognition",
        "Career transition completion - starting your new role",
        "Apprenticeship graduation ceremony - celebrating your achievement!"
      ],
      dayInLife: "You did it! From that nervous first day to fully qualified electrician. Take a moment to appreciate how far you've come."
    }
  ];

  const specialisationOptions = [
    {
      title: "Industrial Electrical Systems",
      icon: Zap,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      description: "High-voltage systems, motor control, and industrial automation",
      careerPaths: ["Industrial Electrician", "Maintenance Engineer", "Automation Specialist"],
      averageSalary: "£35k - £45k",
      growth: "Strong demand",
      qualifications: ["CompEx", "HV Switching", "PLC Programming"]
    },
    {
      title: "Renewable Energy Systems",
      icon: Sun,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      description: "Solar PV, battery storage, EV charging, and green technology",
      careerPaths: ["Solar PV Installer", "EV Charger Specialist", "Energy Systems Designer"],
      averageSalary: "£32k - £42k",
      growth: "Rapid growth sector",
      qualifications: ["MCS Certification", "Solar PV Design", "EV Installation"]
    },
    {
      title: "Smart Building Technology",
      icon: Building2,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      description: "Building automation, IoT systems, and intelligent controls",
      careerPaths: ["Smart Building Specialist", "BMS Engineer", "Home Automation Expert"],
      averageSalary: "£34k - £44k",
      growth: "Growing demand",
      qualifications: ["KNX Certification", "BMS Programming", "Network Fundamentals"]
    },
    {
      title: "Testing & Inspection",
      icon: Search,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      description: "Electrical testing, EICR, and compliance verification",
      careerPaths: ["Testing Engineer", "Inspection Contractor", "Compliance Specialist"],
      averageSalary: "£30k - £40k",
      growth: "Steady demand",
      qualifications: ["2391 Inspection & Testing", "18th Edition", "Advanced Testing"]
    }
  ];

  const careerPathways = [
    {
      path: "Employed Electrician",
      icon: Building2,
      color: "text-blue-400",
      description: "Join an established electrical contracting company",
      advantages: [
        "Steady income and job security",
        "Continued learning from experienced colleagues",
        "Team support and resources",
        "Clear career progression structure"
      ],
      considerations: [
        "Limited control over work schedule",
        "Earning potential may be capped",
        "Subject to company policies"
      ],
      typicalSalary: "£28k - £40k"
    },
    {
      path: "Self-Employed Contractor",
      icon: Rocket,
      color: "text-green-400",
      description: "Start your own electrical contracting business",
      advantages: [
        "Higher earning potential",
        "Flexible working schedule",
        "Choose your own clients and jobs",
        "Build your own reputation and brand"
      ],
      considerations: [
        "Business management responsibilities",
        "Variable income - especially initially",
        "Need to handle insurance, tax, accounts",
        "Must find your own work"
      ],
      typicalSalary: "£35k - £60k+ (variable)"
    },
    {
      path: "Further Education Route",
      icon: GraduationCap,
      color: "text-purple-400",
      description: "Pursue higher qualifications while working",
      advantages: [
        "Enhanced career prospects",
        "Path to engineering roles",
        "Higher earning potential long-term",
        "Professional recognition and respect"
      ],
      considerations: [
        "Time commitment for study",
        "Course costs (though often employer-sponsored)",
        "Balancing work, study, and life"
      ],
      typicalSalary: "£35k - £55k (as engineer)"
    }
  ];

  const epaResults = {
    passRates: {
      overall: 87,
      practical: 89,
      professional: 85,
      knowledge: 91
    },
    tips: [
      "Start preparation 6+ months before EPA",
      "Complete portfolio well in advance",
      "Attend all mock assessments offered",
      "Get good sleep before each assessment"
    ]
  };

  const jobSearchTips = [
    {
      category: "CV & Portfolio",
      icon: FileText,
      tips: [
        "Keep it to 2 pages maximum",
        "Lead with your qualifications and EPA result",
        "Include specific projects with photos",
        "Get it reviewed by your mentor or tutor"
      ]
    },
    {
      category: "Interview Prep",
      icon: Users,
      tips: [
        "Research the company before interview",
        "Prepare examples of complex jobs you've done",
        "Be ready to discuss health & safety",
        "Ask questions about their projects and culture"
      ]
    },
    {
      category: "Salary Negotiation",
      icon: DollarSign,
      tips: [
        "Research market rates for your area",
        "Know your worth - you're newly qualified!",
        "Consider whole package: van, tools, training",
        "Don't accept the first offer if below market"
      ]
    }
  ];

  const renderHeroSection = () => (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-yellow/20 via-elec-yellow/10 to-transparent border border-elec-yellow/30 p-6 sm:p-8">
      <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />

      <div className="relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="p-4 bg-elec-yellow/20 rounded-xl border border-elec-yellow/30">
            <Award className="h-8 w-8 text-elec-yellow" />
          </div>
          <div>
            <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 mb-2">
              The Final Year
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Year 4: Qualification & Career Launch</h1>
          </div>
        </div>

        <p className="text-white/80 text-lg mb-6 max-w-3xl">
          The finish line is in sight. Year 4 is about completing your EPA, choosing your specialisation,
          and launching your career as a fully qualified electrician. This is what you've been working towards.
        </p>

        {/* Progress indicator - complete! */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1">
            <div className="w-12 h-3 rounded-full bg-green-500" />
            <div className="w-12 h-3 rounded-full bg-blue-500" />
            <div className="w-12 h-3 rounded-full bg-purple-500" />
            <div className="w-12 h-3 rounded-full bg-elec-yellow" />
          </div>
          <span className="text-white/60 text-sm ml-2">Year 4 of 4 - Final Year!</span>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Calendar className="h-5 w-5 text-elec-yellow mb-2" />
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-white/60 text-sm">Final Months</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Briefcase className="h-5 w-5 text-green-400 mb-2" />
            <div className="text-2xl font-bold text-white">£28-35k</div>
            <div className="text-white/60 text-sm">Final Year Salary</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Award className="h-5 w-5 text-yellow-400 mb-2" />
            <div className="text-2xl font-bold text-white">EPA</div>
            <div className="text-white/60 text-sm">Your Goal</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <GraduationCap className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-white">Qualified</div>
            <div className="text-white/60 text-sm">Electrician!</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSalaryJourney = () => (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Your Complete Salary Journey
        </CardTitle>
        <p className="text-white/70 text-sm">
          From apprentice to qualified - see how your earnings have grown
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2 text-center mb-4">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white/60 text-xs mb-1">Year 1</p>
            <p className="text-sm font-bold text-white">£16.5k</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white/60 text-xs mb-1">Year 2</p>
            <p className="text-sm font-bold text-white">£20k</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white/60 text-xs mb-1">Year 3</p>
            <p className="text-sm font-bold text-white">£26k</p>
          </div>
          <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
            <p className="text-elec-yellow text-xs mb-1">Year 4</p>
            <p className="text-sm font-bold text-elec-yellow">£32k</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30">
            <p className="text-green-400 text-xs mb-1">Qualified</p>
            <p className="text-sm font-bold text-green-400">£35k+</p>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-white/80 text-sm">
            <strong className="text-green-400">The payoff:</strong> From £16.5k to £35k+ in 4 years - more than
            double your starting salary. Specialists and those who go self-employed can earn £45k-£60k+.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderEPAStats = () => (
    <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <Star className="h-5 w-5" />
          EPA Success Statistics
        </CardTitle>
        <p className="text-white/70 text-sm">
          National statistics - you've got strong odds if you've done the work
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Component Pass Rates</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-white/80 text-sm">Overall EPA</span>
                <div className="flex items-center gap-2">
                  <Progress value={epaResults.passRates.overall} className="w-20 h-2" />
                  <span className="text-sm font-bold text-green-400">{epaResults.passRates.overall}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-white/80 text-sm">Practical Assessment</span>
                <div className="flex items-center gap-2">
                  <Progress value={epaResults.passRates.practical} className="w-20 h-2" />
                  <span className="text-sm font-bold text-green-400">{epaResults.passRates.practical}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-white/80 text-sm">Professional Discussion</span>
                <div className="flex items-center gap-2">
                  <Progress value={epaResults.passRates.professional} className="w-20 h-2" />
                  <span className="text-sm font-bold text-green-400">{epaResults.passRates.professional}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-white/80 text-sm">Knowledge Test</span>
                <div className="flex items-center gap-2">
                  <Progress value={epaResults.passRates.knowledge} className="w-20 h-2" />
                  <span className="text-sm font-bold text-green-400">{epaResults.passRates.knowledge}%</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Key Success Tips</h4>
            <div className="space-y-2">
              {epaResults.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSpecialisations = () => (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Target className="h-5 w-5" />
          Specialisation Pathways
        </CardTitle>
        <p className="text-white/70 text-sm">
          Choose your area of expertise to focus your career
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialisationOptions.map((option, index) => (
            <div key={index} className={`p-4 rounded-lg ${option.bgColor} border border-white/10`}>
              <div className="flex items-center gap-2 mb-3">
                <option.icon className={`h-6 w-6 ${option.color}`} />
                <span className={`font-semibold ${option.color}`}>{option.title}</span>
              </div>
              <p className="text-white/70 text-sm mb-3">{option.description}</p>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Salary Range:</span>
                  <span className="text-green-400 font-medium text-sm">{option.averageSalary}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Market:</span>
                  <Badge variant="outline" className="text-xs bg-white/10">{option.growth}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-white/60 text-xs">Career paths:</p>
                <div className="flex flex-wrap gap-1">
                  {option.careerPaths.map((path, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-white/5">
                      {path}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-white/60 text-xs mb-1">Useful qualifications:</p>
                <div className="flex flex-wrap gap-1">
                  {option.qualifications.map((qual, idx) => (
                    <Badge key={idx} variant="outline" className={`text-xs ${option.bgColor} ${option.color}`}>
                      {qual}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderCareerPathways = () => (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Post-Apprenticeship Career Options
        </CardTitle>
        <p className="text-white/70 text-sm">
          Three main paths for newly qualified electricians
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {careerPathways.map((pathway, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden transition-all ${
                expandedPathway === index
                  ? 'border-blue-500/40 bg-blue-500/5'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setExpandedPathway(expandedPathway === index ? null : index)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${pathway.color} bg-white/10`}>
                    <pathway.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{pathway.path}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm">{pathway.typicalSalary}</span>
                    </div>
                  </div>
                </div>
                {expandedPathway === index ? (
                  <ChevronUp className="h-5 w-5 text-white/60" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-white/60" />
                )}
              </button>

              {expandedPathway === index && (
                <div className="px-4 pb-4">
                  <p className="text-white/70 text-sm mb-4 pl-12">{pathway.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-12">
                    <div>
                      <p className="font-medium text-green-400 text-sm mb-2">Advantages:</p>
                      {pathway.advantages.map((adv, idx) => (
                        <div key={idx} className="flex items-start gap-2 mb-1">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/70 text-xs">{adv}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="font-medium text-orange-400 text-sm mb-2">Considerations:</p>
                      {pathway.considerations.map((con, idx) => (
                        <div key={idx} className="flex items-start gap-2 mb-1">
                          <AlertTriangle className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/70 text-xs">{con}</span>
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

  const renderMonthlyTimeline = () => (
    <Card className="border-elec-yellow/20 bg-white/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calendar className="h-5 w-5 text-elec-yellow" />
          Your Final Year Journey
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

  const renderJobSearchTips = () => (
    <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Job Search Success Guide
        </CardTitle>
        <p className="text-white/70 text-sm">
          Practical tips for landing your first qualified role
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobSearchTips.map((section, index) => (
            <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <section.icon className="h-5 w-5 text-cyan-400" />
                <span className="font-medium text-cyan-400">{section.category}</span>
              </div>
              <div className="space-y-2">
                {section.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-xs">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderFinalTips = () => (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-transparent">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Year 4 Success Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-yellow-400" />
              EPA Success
            </h4>
            <ul className="space-y-2">
              <li className="text-white/80 text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Start preparing 6+ months early
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Complete your portfolio well ahead
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Know your portfolio inside out
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Practice practical under time pressure
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <Rocket className="h-4 w-4 text-green-400" />
              Career Launch
            </h4>
            <ul className="space-y-2">
              <li className="text-white/80 text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Research employers before graduating
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Network at every opportunity
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Know your worth in negotiations
              </li>
              <li className="text-white/80 text-sm flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                Consider specialisation early
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium mb-1">Congratulations on making it this far!</p>
              <p className="text-white/70 text-sm">
                Whatever your first day felt like, you've grown into a skilled professional. Be proud of
                your achievement - you've earned the right to call yourself an electrician.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible className="w-full">
      <MobileAccordionItem value="salary">
        <MobileAccordionTrigger className="text-white">
          <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
          Salary Journey
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="grid grid-cols-5 gap-1 pt-2">
            <div className="p-2 rounded-lg bg-white/5 text-center">
              <p className="text-white/60 text-xs">Y1</p>
              <p className="font-bold text-white text-xs">£16k</p>
            </div>
            <div className="p-2 rounded-lg bg-white/5 text-center">
              <p className="text-white/60 text-xs">Y2</p>
              <p className="font-bold text-white text-xs">£20k</p>
            </div>
            <div className="p-2 rounded-lg bg-white/5 text-center">
              <p className="text-white/60 text-xs">Y3</p>
              <p className="font-bold text-white text-xs">£26k</p>
            </div>
            <div className="p-2 rounded-lg bg-elec-yellow/20 text-center">
              <p className="text-elec-yellow text-xs">Y4</p>
              <p className="font-bold text-elec-yellow text-xs">£32k</p>
            </div>
            <div className="p-2 rounded-lg bg-green-500/20 text-center">
              <p className="text-green-400 text-xs">Qual</p>
              <p className="font-bold text-green-400 text-xs">£35k+</p>
            </div>
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="epa">
        <MobileAccordionTrigger className="text-white">
          <Star className="h-5 w-5 mr-2 text-yellow-400" />
          EPA Stats
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
              <span className="text-white/80 text-sm">Overall Pass</span>
              <span className="text-green-400 font-bold">{epaResults.passRates.overall}%</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
              <span className="text-white/80 text-sm">Practical</span>
              <span className="text-green-400 font-bold">{epaResults.passRates.practical}%</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
              <span className="text-white/80 text-sm">Discussion</span>
              <span className="text-green-400 font-bold">{epaResults.passRates.professional}%</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
              <span className="text-white/80 text-sm">Knowledge</span>
              <span className="text-green-400 font-bold">{epaResults.passRates.knowledge}%</span>
            </div>
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="timeline">
        <MobileAccordionTrigger className="text-white">
          <Calendar className="h-5 w-5 mr-2 text-elec-yellow" />
          Timeline
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

      <MobileAccordionItem value="specialisation">
        <MobileAccordionTrigger className="text-white">
          <Target className="h-5 w-5 mr-2 text-purple-400" />
          Specialisations
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-3 pt-2">
            {specialisationOptions.map((option, index) => (
              <div key={index} className={`p-3 rounded-lg ${option.bgColor}`}>
                <div className="flex items-center gap-2 mb-1">
                  <option.icon className={`h-4 w-4 ${option.color}`} />
                  <span className={`font-medium text-sm ${option.color}`}>{option.title}</span>
                </div>
                <p className="text-white/60 text-xs mb-2">{option.description}</p>
                <p className="text-green-400 text-xs font-medium">{option.averageSalary}</p>
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="careers">
        <MobileAccordionTrigger className="text-white">
          <Briefcase className="h-5 w-5 mr-2 text-blue-400" />
          Career Paths
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-2 pt-2">
            {careerPathways.map((pathway, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-medium text-sm ${pathway.color}`}>{pathway.path}</span>
                  <span className="text-green-400 text-xs">{pathway.typicalSalary}</span>
                </div>
                <p className="text-white/60 text-xs">{pathway.description}</p>
              </div>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="jobsearch">
        <MobileAccordionTrigger className="text-white">
          <FileText className="h-5 w-5 mr-2 text-cyan-400" />
          Job Search Tips
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-3 pt-2">
            {jobSearchTips.map((section, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/5">
                <span className="font-medium text-cyan-400 text-sm">{section.category}</span>
                <div className="mt-2 space-y-1">
                  {section.tips.slice(0, 2).map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-xs">{tip}</span>
                    </div>
                  ))}
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
          {renderSalaryJourney()}

          {renderEPAStats()}

          {renderMonthlyTimeline()}

          {renderSpecialisations()}

          {renderCareerPathways()}

          {renderJobSearchTips()}

          {renderFinalTips()}
        </div>
      )}
    </div>
  );
};

export default Year4;
