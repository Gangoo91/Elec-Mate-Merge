
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Year1 = () => {
  const isMobile = useIsMobile();

  const learningOutcomes = [
    "Understand basic electrical theory and principles",
    "Recognise electrical hazards and safety procedures",
    "Use basic hand tools correctly and safely",
    "Follow instructions from qualified electricians",
    "Complete basic college coursework in electrical fundamentals"
  ];

  const skillsDeveloped = [
    { skill: "Safety Awareness", level: "Fundamental", description: "PPE usage, hazard recognition, safe working practices" },
    { skill: "Tool Familiarity", level: "Basic", description: "Hand tools, measuring equipment, basic power tools" },
    { skill: "Electrical Theory", level: "Foundation", description: "Ohm's law, basic circuits, voltage and current" },
    { skill: "Communication", level: "Development", description: "Following instructions, asking questions effectively" }
  ];

  const expectations = [
    {
      category: "On Site",
      items: [
        "Arrive 15 minutes early every day",
        "Carry materials and assist qualified electricians",
        "Keep work areas clean and organised",
        "Ask questions when uncertain about tasks",
        "Observe and learn from experienced tradespeople"
      ]
    },
    {
      category: "College Work",
      items: [
        "Attend all college sessions punctually",
        "Complete assignments on time",
        "Study electrical theory fundamentals",
        "Prepare for 18th Edition Wiring Regulations",
        "Build a portfolio of learning evidence"
      ]
    }
  ];

  const milestones = [
    { month: "Month 1-3", task: "Site induction and basic safety training", status: "critical" },
    { month: "Month 4-6", task: "Basic tool usage and material handling", status: "important" },
    { month: "Month 7-9", task: "Simple wiring tasks under supervision", status: "development" },
    { month: "Month 10-12", task: "College assessments and portfolio building", status: "assessment" }
  ];

  const getMilestoneColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "important": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "development": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "assessment": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

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
              <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <BookOpen className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h1 className={`font-bold tracking-tight text-elec-yellow leading-tight ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                  Year 1: Foundation
                </h1>
                <p className="text-blue-400 font-medium">Building Your Electrical Career Foundation</p>
              </div>
            </div>
            <p className={`text-muted-foreground leading-relaxed max-w-3xl mx-auto ${isMobile ? 'text-sm px-1' : 'text-base'}`}>
              Your first year is about learning the fundamentals, developing safety awareness, and 
              establishing good working habits that will serve you throughout your career.
            </p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-blue-400 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Learning Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-elec-gray/50 rounded-lg border border-blue-500/20">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{outcome}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Development */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow">Skills Development Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillsDeveloped.map((skill, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{skill.skill}</h4>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                      {skill.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expectations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {expectations.map((section, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {section.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Milestones */}
        <Card className="border-elec-yellow/20 bg-elec-gray/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-elec-yellow">Year 1 Milestones</CardTitle>
            <p className="text-sm text-muted-foreground">Key achievements and focus areas throughout your first year</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{milestone.month}</h4>
                    <Badge className={getMilestoneColor(milestone.status)}>
                      {milestone.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{milestone.task}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Success Tips */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Success Tips for Year 1
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Mindset</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Stay curious and ask questions</li>
                  <li>• Accept that learning takes time</li>
                  <li>• Focus on safety above all else</li>
                  <li>• Build good work habits early</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Practical</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Invest in quality basic tools</li>
                  <li>• Keep a learning diary</li>
                  <li>• Network with other apprentices</li>
                  <li>• Take college work seriously</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning Card */}
        <Card className="border-orange-500/50 bg-orange-500/10">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Common First Year Challenges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              It's normal to feel overwhelmed in your first year. You're learning a new trade, adapting to site culture, 
              and balancing work with college. Remember that every qualified electrician went through this phase. 
              Focus on safety, ask questions, and be patient with your progress.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Year1;
