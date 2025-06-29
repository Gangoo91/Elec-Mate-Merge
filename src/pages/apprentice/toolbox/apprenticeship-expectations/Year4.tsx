
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
  MapPin
} from "lucide-react";
import BackButton from "@/components/common/BackButton";

const Year4 = () => {
  const monthlyBreakdown = [
    {
      month: "Month 37-38",
      title: "Specialisation Focus",
      focus: "Choose and develop specialist skills",
      activities: [
        "Select specialisation pathway",
        "Advanced technical training",
        "Industry certification pursuit",
        "Specialist project involvement"
      ]
    },
    {
      month: "Month 39-40",
      title: "EPA Execution",
      focus: "Complete End Point Assessment",
      activities: [
        "Final EPA preparation",
        "Practical assessment completion",
        "Professional discussion",
        "Knowledge test completion"
      ]
    },
    {
      month: "Month 41-42",
      title: "Career Preparation",
      focus: "Transition to qualified electrician",
      activities: [
        "Job market research",
        "CV and portfolio finalisation",
        "Interview preparation",
        "Professional networking"
      ]
    },
    {
      month: "Month 43-44",
      title: "Professional Development",
      focus: "Industry recognition and advancement",
      activities: [
        "Professional body membership",
        "Continuing Professional Development planning",
        "Advanced qualification research",
        "Mentoring program participation"
      ]
    },
    {
      month: "Month 45-46",
      title: "Transition Planning",
      focus: "Prepare for post-apprenticeship career",
      activities: [
        "Employment contract negotiation",
        "Further education planning",
        "Professional goal setting",
        "Industry networking expansion"
      ]
    },
    {
      month: "Month 47-48",
      title: "Completion & Qualification",
      focus: "Apprenticeship completion and celebration",
      activities: [
        "Final assessments and reviews",
        "Qualification certification",
        "Career transition completion",
        "Apprenticeship graduation ceremony"
      ]
    }
  ];

  const specialisationOptions = [
    {
      title: "Industrial Electrical Systems",
      icon: "⚡",
      description: "High-voltage systems, motor control, and industrial automation",
      careerPaths: ["Industrial Electrician", "Maintenance Engineer", "Automation Specialist"],
      averageSalary: "£35,000 - £45,000"
    },
    {
      title: "Renewable Energy Systems",
      icon: "🌱",
      description: "Solar PV, wind turbines, battery storage, and green technology",
      careerPaths: ["Solar PV Installer", "Renewable Energy Technician", "Energy Systems Designer"],
      averageSalary: "£32,000 - £42,000"
    },
    {
      title: "Smart Building Technology",
      icon: "🏢",
      description: "Building automation, IoT systems, and intelligent controls",
      careerPaths: ["Smart Building Specialist", "BMS Engineer", "IoT Technician"],
      averageSalary: "£34,000 - £44,000"
    },
    {
      title: "Testing & Inspection",
      icon: "🔍",
      description: "Electrical testing, EICR, and compliance verification",
      careerPaths: ["Testing Engineer", "Compliance Specialist", "Inspection Contractor"],
      averageSalary: "£30,000 - £40,000"
    }
  ];

  const careerPathways = [
    {
      path: "Employed Electrician",
      description: "Join an established electrical contracting company",
      advantages: [
        "Steady income and job security",
        "Continued learning opportunities",
        "Team support and resources",
        "Career progression structure"
      ],
      considerations: [
        "Limited control over work schedule",
        "Potentially capped earning potential",
        "Company policy restrictions"
      ]
    },
    {
      path: "Self-Employed Contractor",
      description: "Start your own electrical contracting business",
      advantages: [
        "Higher earning potential",
        "Flexible working schedule",
        "Choose your own clients",
        "Build your own reputation"
      ],
      considerations: [
        "Business management responsibilities",
        "Irregular income initially",
        "Insurance and liability concerns",
        "Need for business skills"
      ]
    },
    {
      path: "Further Education Route",
      description: "Pursue higher qualifications while working",
      advantages: [
        "Enhanced career prospects",
        "Specialised technical knowledge",
        "Higher earning potential long-term",
        "Professional recognition"
      ],
      considerations: [
        "Time commitment for study",
        "Additional costs involved",
        "Balancing work and education"
      ]
    }
  ];

  const epaResults = {
    passRates: {
      overall: 87,
      practical: 89,
      professional: 85,
      knowledge: 91
    },
    outcomes: [
      "Pass - 87% of apprentices",
      "Partial Pass (resit required) - 8% of apprentices", 
      "Fail (full retake) - 5% of apprentices"
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Year 4: Mastery & Completion</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4 text-sm sm:text-base">
          Your final year focuses on specialisation, EPA completion, and transitioning to qualified electrician status
        </p>
        <BackButton customUrl="/apprentice/toolbox/apprenticeship-expectations" label="Back to Expectations" />
      </div>

      {/* Overview Card */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Award className="h-6 w-6" />
            Year 4 Overview - The Final Push
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <h4 className="font-semibold text-elec-yellow">Duration</h4>
              <p className="text-2xl font-bold">12 Months</p>
              <p className="text-sm text-muted-foreground">Months 37-48</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-green-400">Expected Salary</h4>
              <p className="text-2xl font-bold">£28k-£35k</p>
              <p className="text-sm text-muted-foreground">Per annum</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-purple-400">Main Focus</h4>
              <p className="text-lg font-semibold">EPA & Career</p>
              <p className="text-sm text-muted-foreground">Preparation</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-blue-400">End Goal</h4>
              <p className="text-lg font-semibold">Qualified</p>
              <p className="text-sm text-muted-foreground">Electrician</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EPA Success Statistics */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Star className="h-5 w-5" />
            EPA Success Statistics
          </CardTitle>
          <p className="text-sm text-muted-foreground">National statistics for electrical apprenticeship EPA outcomes</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Component Pass Rates</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overall EPA</span>
                  <div className="flex items-center gap-2">
                    <Progress value={epaResults.passRates.overall} className="w-20 h-2" />
                    <span className="text-sm font-bold">{epaResults.passRates.overall}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Practical Assessment</span>
                  <div className="flex items-center gap-2">
                    <Progress value={epaResults.passRates.practical} className="w-20 h-2" />
                    <span className="text-sm font-bold">{epaResults.passRates.practical}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Professional Discussion</span>
                  <div className="flex items-center gap-2">
                    <Progress value={epaResults.passRates.professional} className="w-20 h-2" />
                    <span className="text-sm font-bold">{epaResults.passRates.professional}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Knowledge Test</span>
                  <div className="flex items-center gap-2">
                    <Progress value={epaResults.passRates.knowledge} className="w-20 h-2" />
                    <span className="text-sm font-bold">{epaResults.passRates.knowledge}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Overall Outcomes</h4>
              <ul className="space-y-2">
                {epaResults.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Final Year Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyBreakdown.map((period, index) => (
              <div key={index} className="border border-elec-yellow/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{period.title}</h4>
                    <Badge variant="outline" className="text-xs">{period.month}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{period.focus}</div>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {period.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Specialisation Options */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Specialisation Pathways
          </CardTitle>
          <p className="text-sm text-muted-foreground">Choose your area of expertise to focus your final year learning</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialisationOptions.map((option, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{option.icon}</span>
                  <h4 className="font-semibold text-purple-400">{option.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                
                <div className="space-y-2">
                  <div>
                    <h5 className="font-medium text-white text-sm mb-1">Career Paths:</h5>
                    <div className="flex flex-wrap gap-1">
                      {option.careerPaths.map((path, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{path}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-green-400">Avg. Salary: </span>
                    <span className="text-muted-foreground">{option.averageSalary}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Pathways */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Post-Apprenticeship Career Pathways
          </CardTitle>
          <p className="text-sm text-muted-foreground">Consider your options as a newly qualified electrician</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {careerPathways.map((pathway, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">{pathway.path}</h4>
                <p className="text-sm text-muted-foreground mb-4">{pathway.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-400 mb-2">Advantages:</h5>
                    <ul className="space-y-1">
                      {pathway.advantages.map((advantage, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-400 mb-2">Considerations:</h5>
                    <ul className="space-y-1">
                      {pathway.considerations.map((consideration, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Target className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                          {consideration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Tips */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Year 4 Success Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-elec-yellow mb-3">EPA Preparation</h4>
              <ul className="space-y-2 text-sm">
                <li>• Start EPA preparation early in the year</li>
                <li>• Practice practical assessments regularly</li>
                <li>• Know your portfolio evidence inside out</li>
                <li>• Attend all preparation sessions</li>
                <li>• Get plenty of rest before assessment days</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-elec-yellow mb-3">Career Planning</h4>
              <ul className="space-y-2 text-sm">
                <li>• Research potential employers early</li>
                <li>• Network with industry professionals</li>
                <li>• Keep your CV updated throughout the year</li>
                <li>• Consider further education options</li>
                <li>• Plan your specialisation focus area</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Year4;
