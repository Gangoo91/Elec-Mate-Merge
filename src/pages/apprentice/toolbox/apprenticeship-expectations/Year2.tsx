
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
  TrendingUp
} from "lucide-react";
import BackButton from "@/components/common/BackButton";

const Year2 = () => {
  const monthlyBreakdown = [
    {
      month: "Month 13-14",
      title: "Regulations Introduction",
      focus: "BS 7671 Wiring Regulations fundamentals",
      activities: [
        "Introduction to BS 7671",
        "Regulation structure understanding",
        "Design principles basics",
        "Cable selection fundamentals"
      ]
    },
    {
      month: "Month 15-16",
      title: "Installation Methods",
      focus: "Practical installation techniques",
      activities: [
        "Different wiring systems",
        "Cable routing and support",
        "Containment systems",
        "Protection methods"
      ]
    },
    {
      month: "Month 17-18",
      title: "Testing & Inspection Basics",
      focus: "Introduction to electrical testing",
      activities: [
        "Test equipment introduction",
        "Continuity testing",
        "Insulation resistance testing",
        "Basic fault finding"
      ]
    },
    {
      month: "Month 19-20",
      title: "Advanced Installations",
      focus: "More complex installation work",
      activities: [
        "Three-phase installations",
        "Motor control circuits",
        "Distribution board work",
        "Emergency lighting systems"
      ]
    },
    {
      month: "Month 21-22",
      title: "Portfolio Development",
      focus: "Evidence collection and documentation",
      activities: [
        "Work-based evidence gathering",
        "Portfolio structuring",
        "Photographic evidence",
        "Competency demonstration"
      ]
    },
    {
      month: "Month 23-24",
      title: "Year 2 Assessment",
      focus: "Skills consolidation and assessment",
      activities: [
        "Practical skills assessment",
        "Theory examination preparation",
        "Portfolio submission",
        "Year 3 preparation"
      ]
    }
  ];

  const keyLearningAreas = [
    {
      title: "BS 7671 Wiring Regulations",
      icon: BookOpen,
      progress: 75,
      topics: [
        "Regulation structure and navigation",
        "Design requirements and calculations",
        "Cable selection and sizing",
        "Protection and earthing",
        "Special locations"
      ]
    },
    {
      title: "Installation Techniques",
      icon: Wrench,
      progress: 80,
      topics: [
        "Different wiring systems",
        "Containment and support methods",
        "Jointing and termination",
        "Distribution board installation",
        "Circuit protection devices"
      ]
    },
    {
      title: "Testing & Inspection",
      icon: Zap,
      progress: 65,
      topics: [
        "Test equipment usage",
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
      topics: [
        "Installation certificates",
        "Test result recording",
        "Portfolio evidence collection",
        "Work method statements",
        "Risk assessment participation"
      ]
    }
  ];

  const salaryIncrease = {
    previousYear: 16500,
    currentYear: 20000,
    increase: 3500,
    percentage: 21.2
  };

  const developmentMilestones = [
    {
      milestone: "First BS 7671 Assessment",
      description: "Successfully pass your first wiring regulations examination",
      importance: "Foundation for all future electrical work",
      tips: ["Use the regulations book regularly", "Practice regulation finding exercises", "Join study groups"]
    },
    {
      milestone: "Practical Skills Assessment",
      description: "Demonstrate competency in installation techniques",
      importance: "Proves your hands-on capabilities",
      tips: ["Practice installations regularly", "Focus on quality and safety", "Time management is crucial"]
    },
    {
      milestone: "Portfolio Development",
      description: "Build comprehensive evidence collection",
      importance: "Required for apprenticeship completion",
      tips: ["Collect evidence regularly", "Include photos and documentation", "Get supervisor signatures"]
    },
    {
      milestone: "Testing Equipment Competency",
      description: "Safe and accurate use of electrical test equipment",
      importance: "Essential for future electrical work",
      tips: ["Understand each test purpose", "Practice with different equipment", "Learn to interpret results"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Year 2: Development Year</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4 text-sm sm:text-base">
          Building on your foundations with wiring regulations, installation methods, and basic testing procedures
        </p>
        <BackButton customUrl="/apprentice/toolbox/apprenticeship-expectations" label="Back to Expectations" />
      </div>

      {/* Overview Card */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-6 w-6" />
            Year 2 Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <h4 className="font-semibold text-elec-yellow">Duration</h4>
              <p className="text-2xl font-bold">12 Months</p>
              <p className="text-sm text-muted-foreground">Months 13-24</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-green-400">Expected Salary</h4>
              <p className="text-2xl font-bold">£18k-£22k</p>
              <p className="text-sm text-muted-foreground">Per annum</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-blue-400">Main Focus</h4>
              <p className="text-lg font-semibold">Regulations</p>
              <p className="text-sm text-muted-foreground">BS 7671 & Testing</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-purple-400">Key Skill</h4>
              <p className="text-lg font-semibold">Installation</p>
              <p className="text-sm text-muted-foreground">Methods & Testing</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Progress */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Salary Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Year 1 Average</p>
              <p className="text-2xl font-bold">£{salaryIncrease.previousYear.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Year 2 Average</p>
              <p className="text-2xl font-bold text-green-400">£{salaryIncrease.currentYear.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Increase</p>
              <p className="text-2xl font-bold text-green-400">+£{salaryIncrease.increase.toLocaleString()}</p>
              <p className="text-sm text-green-400">({salaryIncrease.percentage}% increase)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Monthly Progress Breakdown
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

      {/* Key Learning Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {keyLearningAreas.map((area, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <area.icon className="h-5 w-5 text-elec-yellow" />
                {area.title}
              </CardTitle>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress Expected</span>
                  <span>{area.progress}%</span>
                </div>
                <Progress value={area.progress} className="h-2" />
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {area.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Development Milestones */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Key Development Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {developmentMilestones.map((milestone, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">{milestone.milestone}</h4>
                <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                <p className="text-sm text-white mb-3"><strong>Why it matters:</strong> {milestone.importance}</p>
                <div>
                  <h5 className="font-medium text-white mb-2">Success Tips:</h5>
                  <ul className="space-y-1">
                    {milestone.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Year 2 Challenges */}
      <Card className="border-orange-500/30 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Year 2 Common Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-400">Regulation Complexity</h4>
              <p className="text-sm text-muted-foreground">
                BS 7671 can seem overwhelming with its size and technical language.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Start with the basics and build up</li>
                <li>• Use regulation finding exercises</li>
                <li>• Ask questions when confused</li>
                <li>• Practice with real scenarios</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-400">Increased Responsibility</h4>
              <p className="text-sm text-muted-foreground">
                More complex tasks and higher expectations from supervisors.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Communicate if you're unsure</li>
                <li>• Double-check your work</li>
                <li>• Learn from any mistakes</li>
                <li>• Ask for feedback regularly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Year2;
