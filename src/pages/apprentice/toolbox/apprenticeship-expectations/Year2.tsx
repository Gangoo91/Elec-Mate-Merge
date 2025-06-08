
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, TrendingUp, Wrench, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Year2 = () => {
  const isMobile = useIsMobile();

  const learningOutcomes = [
    "Perform cable installation and basic wiring independently",
    "Understand circuit design principles and load calculations",
    "Use power tools safely and effectively",
    "Assist with installation planning and material ordering",
    "Pass 18th Edition Wiring Regulations examination"
  ];

  const skillProgression = [
    { 
      skill: "Circuit Understanding", 
      level: "Intermediate", 
      description: "Ring circuits, radial circuits, lighting circuits",
      progress: 75
    },
    { 
      skill: "Installation Techniques", 
      level: "Developing", 
      description: "Cable routing, containment systems, fixing methods",
      progress: 60
    },
    { 
      skill: "Power Tools", 
      level: "Competent", 
      description: "SDS drills, angle grinders, cable pullers",
      progress: 80
    },
    { 
      skill: "Planning Skills", 
      level: "Emerging", 
      description: "Job planning, material lists, time estimation",
      progress: 45
    }
  ];

  const responsibilities = [
    {
      category: "Increased Independence",
      items: [
        "Complete simple installations with minimal supervision",
        "Take ownership of specific tasks within larger projects",
        "Make decisions about cable routes and fixing methods",
        "Estimate time requirements for routine tasks",
        "Help train new first-year apprentices"
      ]
    },
    {
      category: "Technical Development",
      items: [
        "Install various types of electrical circuits",
        "Use design software and technical drawings",
        "Perform basic fault finding on simple circuits",
        "Understand Building Regulations Part P requirements",
        "Complete more complex college practical assessments"
      ]
    }
  ];

  const challenges = [
    {
      challenge: "18th Edition Exam",
      description: "Major milestone requiring extensive study of BS 7671",
      tips: ["Start revision early", "Use past papers", "Join study groups", "Book practice exams"]
    },
    {
      challenge: "Increased Expectations",
      description: "More responsibility and higher performance standards",
      tips: ["Communicate proactively", "Ask for feedback", "Set personal goals", "Track your progress"]
    },
    {
      challenge: "Complex Installations",
      description: "Working on larger, more complicated electrical systems",
      tips: ["Study circuit diagrams", "Plan before acting", "Double-check connections", "Learn from mistakes"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 animate-fade-in max-w-7xl">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <Link to="/apprentice/toolbox/apprenticeship-expectations">
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"} 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {isMobile ? "Back" : "Back to Journey"}
              </Button>
            </Link>
          </div>
          
          <div className="text-center space-y-3 px-2">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                <Users className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <h1 className={`font-bold tracking-tight text-elec-yellow leading-tight ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                  Year 2: Development
                </h1>
                <p className="text-green-400 font-medium">Building Skills & Taking Responsibility</p>
              </div>
            </div>
            <p className={`text-muted-foreground leading-relaxed max-w-3xl mx-auto ${isMobile ? 'text-sm px-1' : 'text-base'}`}>
              Year 2 is about developing practical skills, gaining more independence, and preparing for 
              the crucial 18th Edition examination that validates your electrical knowledge.
            </p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-green-400 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Year 2 Learning Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-elec-gray/50 rounded-lg border border-green-500/20">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{outcome}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Progression */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Skill Progression
            </CardTitle>
            <p className="text-sm text-muted-foreground">Your developing competencies in Year 2</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillProgression.map((skill, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{skill.skill}</h4>
                    <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                      {skill.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>
                  <div className="w-full bg-elec-dark rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-green-400 mt-1">{skill.progress}% competency</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Responsibilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {responsibilities.map((section, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  {section.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Challenges & Solutions */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow">Year 2 Challenges & How to Overcome Them</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {challenges.map((item, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <h4 className="font-medium text-white mb-2">{item.challenge}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tips.map((tip, tipIndex) => (
                      <Badge key={tipIndex} variant="outline" className="border-green-500/30 text-green-400 text-xs">
                        {tip}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 18th Edition Focus */}
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400">18th Edition Wiring Regulations - Your Major Milestone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-3">Exam Preparation</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Study BS 7671 regulations systematically</li>
                  <li>• Practice calculations and design principles</li>
                  <li>• Complete online mock examinations</li>
                  <li>• Join study groups with other apprentices</li>
                  <li>• Book your exam through an approved provider</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-3">Why It Matters</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Required for progression to Year 3</li>
                  <li>• Essential for future electrical qualifications</li>
                  <li>• Validates your electrical safety knowledge</li>
                  <li>• Industry standard requirement</li>
                  <li>• Foundation for advanced electrical work</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Indicators */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardHeader>
            <CardTitle className="text-green-400">You're Succeeding in Year 2 When...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Technical Skills</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• You can install circuits independently</li>
                  <li>• Supervisors trust you with more complex tasks</li>
                  <li>• You understand circuit design principles</li>
                  <li>• Power tool usage becomes second nature</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Professional Development</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• You help train newer apprentices</li>
                  <li>• Colleagues ask for your input on tasks</li>
                  <li>• You pass the 18th Edition exam</li>
                  <li>• College assessments show consistent progress</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Year2;
