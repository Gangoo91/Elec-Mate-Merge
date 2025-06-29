
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Wrench, 
  Shield, 
  Users, 
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import BackButton from "@/components/common/BackButton";

const Year1 = () => {
  const monthlyBreakdown = [
    {
      month: "Month 1-2",
      title: "Induction & Orientation",
      focus: "Workplace safety and basic introduction",
      activities: [
        "Health & Safety induction",
        "Company policies and procedures",
        "Basic tool introduction",
        "College enrolment process"
      ]
    },
    {
      month: "Month 3-4",
      title: "Foundation Learning",
      focus: "Basic electrical principles",
      activities: [
        "Ohm's Law fundamentals",
        "Basic circuit theory",
        "Electrical symbols recognition",
        "Simple calculations"
      ]
    },
    {
      month: "Month 5-6",
      title: "Practical Introduction",
      focus: "Hands-on experience begins",
      activities: [
        "Cable stripping and termination",
        "Basic wiring techniques",
        "Tool usage practice",
        "Site observation"
      ]
    },
    {
      month: "Month 7-8",
      title: "Skills Development",
      focus: "Building practical competencies",
      activities: [
        "Conduit bending basics",
        "Socket and switch installation",
        "Trunking systems",
        "Basic testing procedures"
      ]
    },
    {
      month: "Month 9-10",
      title: "Knowledge Expansion",
      focus: "Broadening understanding",
      activities: [
        "Three-phase systems introduction",
        "Motor connections",
        "Control circuits basics",
        "First college assessments"
      ]
    },
    {
      month: "Month 11-12",
      title: "Year 1 Consolidation",
      focus: "Review and assessment preparation",
      activities: [
        "Portfolio development",
        "Skills assessment preparation",
        "Theory revision",
        "Year 2 preparation"
      ]
    }
  ];

  const keyLearningAreas = [
    {
      title: "Health & Safety",
      icon: Shield,
      progress: 85,
      topics: [
        "Construction (Design and Management) Regulations",
        "Personal Protective Equipment (PPE)",
        "Risk assessment principles",
        "Emergency procedures",
        "Safe working practices"
      ]
    },
    {
      title: "Basic Electrical Theory",
      icon: BookOpen,
      progress: 70,
      topics: [
        "Ohm's Law and power calculations",
        "Series and parallel circuits",
        "AC and DC fundamentals",
        "Electrical symbols and diagrams",
        "Units and measurements"
      ]
    },
    {
      title: "Practical Skills",
      icon: Wrench,
      progress: 60,
      topics: [
        "Cable preparation and termination",
        "Basic wiring techniques",
        "Tool usage and care",
        "Socket and switch installation",
        "Conduit and trunking systems"
      ]
    },
    {
      title: "Professional Development",
      icon: Users,
      progress: 75,
      topics: [
        "Communication skills",
        "Teamwork and cooperation",
        "Time management",
        "Following instructions",
        "Workplace behaviour"
      ]
    }
  ];

  const commonChallenges = [
    {
      challenge: "Information Overload",
      description: "Feeling overwhelmed by the amount of new information",
      solutions: [
        "Take notes regularly and review daily",
        "Ask questions when unclear",
        "Break learning into manageable chunks",
        "Use visual aids and diagrams"
      ]
    },
    {
      challenge: "Practical vs Theory Gap",
      description: "Difficulty connecting college theory with workplace practice",
      solutions: [
        "Discuss college work with workplace mentor",
        "Ask to see real examples of theoretical concepts",
        "Keep a learning journal",
        "Practice calculations with real scenarios"
      ]
    },
    {
      challenge: "Confidence Building",
      description: "Feeling nervous about making mistakes or asking questions",
      solutions: [
        "Remember everyone was a beginner once",
        "Ask questions - it shows you're engaged",
        "Learn from mistakes rather than fear them",
        "Celebrate small achievements"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Year 1: Foundation Year</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4 text-sm sm:text-base">
          Your first year focuses on building solid foundations in electrical theory, safety, and basic practical skills
        </p>
        <BackButton customUrl="/apprentice/toolbox/apprenticeship-expectations" label="Back to Expectations" />
      </div>

      {/* Overview Card */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-6 w-6" />
            Year 1 Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-semibold text-elec-yellow">Duration</h4>
              <p className="text-2xl font-bold">12 Months</p>
              <p className="text-sm text-muted-foreground">Months 1-12</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-green-400">Expected Salary</h4>
              <p className="text-2xl font-bold">£15k-£18k</p>
              <p className="text-sm text-muted-foreground">Per annum</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-blue-400">Main Focus</h4>
              <p className="text-lg font-semibold">Foundations</p>
              <p className="text-sm text-muted-foreground">Theory & Safety</p>
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

      {/* Common Challenges */}
      <Card className="border-orange-500/30 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Year 1 Challenges & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {commonChallenges.map((item, index) => (
              <div key={index} className="border border-orange-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 mb-2">{item.challenge}</h4>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div>
                  <h5 className="font-medium text-white mb-2">Solutions:</h5>
                  <ul className="space-y-1">
                    {item.solutions.map((solution, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Year1;
