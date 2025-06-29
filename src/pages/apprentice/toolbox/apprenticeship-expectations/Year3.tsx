
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
  Award
} from "lucide-react";
import BackButton from "@/components/common/BackButton";

const Year3 = () => {
  const monthlyBreakdown = [
    {
      month: "Month 25-26",
      title: "Advanced Installation Work",
      focus: "Complex electrical systems and installations",
      activities: [
        "Industrial installation principles",
        "High-current systems",
        "Advanced control systems",
        "Specialist equipment installation"
      ]
    },
    {
      month: "Month 27-28",
      title: "Fault Finding & Diagnostics",
      focus: "Advanced troubleshooting techniques",
      activities: [
        "Systematic fault finding",
        "Advanced test equipment usage",
        "Circuit analysis techniques",
        "Repair and maintenance procedures"
      ]
    },
    {
      month: "Month 29-30",
      title: "Commercial Systems",
      focus: "Commercial and industrial electrical systems",
      activities: [
        "Three-phase distribution systems",
        "Motor control and starters",
        "Building management systems",
        "Emergency and fire alarm systems"
      ]
    },
    {
      month: "Month 31-32",
      title: "Supervisory Experience",
      focus: "Leadership and mentoring skills",
      activities: [
        "Mentoring junior apprentices",
        "Work planning and coordination",
        "Quality control and inspection",
        "Health and safety leadership"
      ]
    },
    {
      month: "Month 33-34",
      title: "EPA Preparation",
      focus: "End Point Assessment preparation",
      activities: [
        "Portfolio completion and review",
        "Mock practical assessments",
        "Professional discussion preparation",
        "Knowledge test revision"
      ]
    },
    {
      month: "Month 35-36",
      title: "Year 3 Consolidation",
      focus: "Skills consolidation and assessment",
      activities: [
        "Advanced skills demonstration",
        "Professional competency review",
        "Career planning discussions",
        "Year 4 transition preparation"
      ]
    }
  ];

  const keyLearningAreas = [
    {
      title: "Advanced Installation Methods",
      icon: Wrench,
      progress: 85,
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
      icon: Zap,
      progress: 80,
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
      icon: BookOpen,
      progress: 75,
      topics: [
        "Three-phase power distribution",
        "Motor control systems",
        "Building services integration",
        "Emergency lighting systems",
        "Fire alarm and security systems"
      ]
    },
    {
      title: "Leadership & Mentoring",
      icon: Users,
      progress: 70,
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
      duration: "6 hours",
      description: "Demonstrate installation, testing, and fault-finding skills",
      preparationTips: [
        "Practice installations under time pressure",
        "Master all testing procedures",
        "Develop systematic fault-finding approach",
        "Ensure all portfolio evidence is complete"
      ]
    },
    {
      component: "Professional Discussion",
      duration: "1 hour",
      description: "Discuss portfolio evidence and demonstrate knowledge",
      preparationTips: [
        "Know your portfolio evidence thoroughly",
        "Practice explaining complex technical concepts",
        "Prepare for regulation-based questions",
        "Develop confidence in professional communication"
      ]
    },
    {
      component: "Knowledge Test",
      duration: "90 minutes",
      description: "Multiple choice test covering all apprenticeship content",
      preparationTips: [
        "Revise all theoretical knowledge systematically",
        "Practice past papers and mock tests",
        "Focus on weak areas identified in practice",
        "Understand regulations and their applications"
      ]
    }
  ];

  const leadershipOpportunities = [
    {
      opportunity: "Mentor New Apprentices",
      description: "Guide and support first-year apprentices in their learning journey",
      benefits: ["Develops leadership skills", "Reinforces your own knowledge", "Builds confidence"],
      responsibilities: ["Provide technical guidance", "Share experiences", "Support with challenges"]
    },
    {
      opportunity: "Lead Small Projects",
      description: "Take responsibility for planning and executing smaller electrical projects",
      benefits: ["Project management experience", "Increased responsibility", "Problem-solving skills"],
      responsibilities: ["Plan work activities", "Coordinate with team", "Ensure quality standards"]
    },
    {
      opportunity: "Quality Assurance Role",
      description: "Check and verify work completed by junior team members",
      benefits: ["Attention to detail", "Technical knowledge application", "Quality awareness"],
      responsibilities: ["Inspect completed work", "Identify issues", "Provide feedback"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Year 3: Progression Year</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4 text-sm sm:text-base">
          Advanced installations, fault-finding, and preparing for your End Point Assessment
        </p>
        <BackButton customUrl="/apprentice/toolbox/apprenticeship-expectations" label="Back to Expectations" />
      </div>

      {/* Overview Card */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-6 w-6" />
            Year 3 Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <h4 className="font-semibold text-elec-yellow">Duration</h4>
              <p className="text-2xl font-bold">12 Months</p>
              <p className="text-sm text-muted-foreground">Months 25-36</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-green-400">Expected Salary</h4>
              <p className="text-2xl font-bold">£24k-£28k</p>
              <p className="text-sm text-muted-foreground">Per annum</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-blue-400">Main Focus</h4>
              <p className="text-lg font-semibold">Advanced Skills</p>
              <p className="text-sm text-muted-foreground">& EPA Prep</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-purple-400">New Role</h4>
              <p className="text-lg font-semibold">Mentoring</p>
              <p className="text-sm text-muted-foreground">Junior Apprentices</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EPA Preparation */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Award className="h-5 w-5" />
            End Point Assessment (EPA) Preparation
          </CardTitle>
          <p className="text-sm text-muted-foreground">Your EPA is the final assessment to complete your apprenticeship</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {epaPreparation.map((component, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-purple-400">{component.component}</h4>
                  <Badge variant="outline" className="text-xs">{component.duration}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{component.description}</p>
                <div>
                  <h5 className="font-medium text-white mb-2">Preparation Tips:</h5>
                  <ul className="space-y-1">
                    {component.preparationTips.map((tip, idx) => (
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

      {/* Leadership Opportunities */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Leadership Opportunities
          </CardTitle>
          <p className="text-sm text-muted-foreground">Year 3 apprentices often take on mentoring and leadership roles</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {leadershipOpportunities.map((opportunity, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">{opportunity.opportunity}</h4>
                <p className="text-sm text-muted-foreground mb-3">{opportunity.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-white mb-2">Benefits:</h5>
                    <ul className="space-y-1">
                      {opportunity.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Responsibilities:</h5>
                    <ul className="space-y-1">
                      {opportunity.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Target className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                          {responsibility}
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

      {/* Year 3 Challenges */}
      <Card className="border-orange-500/30 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Year 3 Challenges & Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-orange-400 mb-3">Common Challenges</h4>
              <ul className="space-y-2 text-sm">
                <li>• EPA preparation pressure and anxiety</li>
                <li>• Balancing increased responsibilities</li>
                <li>• Complex technical problem-solving</li>
                <li>• Managing junior apprentice expectations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-3">Growth Opportunities</h4>
              <ul className="space-y-2 text-sm">
                <li>• Develop leadership and mentoring skills</li>
                <li>• Gain project management experience</li>
                <li>• Specialise in specific electrical areas</li>
                <li>• Build professional network and reputation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Year3;
