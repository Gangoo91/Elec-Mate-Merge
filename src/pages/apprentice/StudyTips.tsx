
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Target, Brain } from "lucide-react";

const StudyTips = () => {
  const studyStrategies = [
    {
      category: "18th Edition Exam",
      tips: [
        "Focus on Part 4 (Protection for Safety) - it's heavily tested",
        "Practice cable calculation questions daily",
        "Use the On-Site Guide alongside BS 7671",
        "Time yourself on practice papers - speed matters",
        "Learn the appendix tables by heart"
      ]
    },
    {
      category: "Level 3 Theory",
      tips: [
        "Understand concepts, don't just memorise formulas",
        "Draw circuit diagrams to visualise problems",
        "Practice three-phase calculations regularly",
        "Connect theory to practical work you've done",
        "Form study groups with other apprentices"
      ]
    },
    {
      category: "Practical Assessments",
      tips: [
        "Practice the same task repeatedly until it's automatic",
        "Time yourself doing installations",
        "Get familiar with different cable types",
        "Practice fault-finding on mock circuits",
        "Keep your tools sharp and organised"
      ]
    }
  ];

  const freeResources = [
    {
      resource: "IET Wiring Matters Magazine",
      description: "Free technical articles and regulation updates",
      access: "Available online at theiet.org"
    },
    {
      resource: "City & Guilds SmartScreen",
      description: "Practice questions and mock exams",
      access: "Through your training provider"
    },
    {
      resource: "YouTube Channels",
      description: "Joe Robinson, Electrical2go, and ElectricalBible",
      access: "Free video tutorials and explanations"
    },
    {
      resource: "NICEIC Technical Helpline",
      description: "Free advice on technical questions",
      access: "0333 015 6626 for registered electricians"
    }
  ];

  const revisionTechniques = [
    {
      technique: "Active Recall",
      description: "Test yourself without looking at notes",
      example: "Cover formulas and try to write them from memory"
    },
    {
      technique: "Spaced Repetition", 
      description: "Review material at increasing intervals",
      example: "Study today, review in 3 days, then 1 week, then 2 weeks"
    },
    {
      technique: "Practice Testing",
      description: "Take mock exams in real conditions",
      example: "Time yourself, use only allowed references, no phone"
    },
    {
      technique: "Teaching Others",
      description: "Explain concepts to fellow apprentices",
      example: "Run through cable calculations with your study group"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Study Tips for Electrical Apprentices</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Proven revision strategies for 18th Edition and Level 3 exams, plus free resources to help you succeed
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Exam-Specific Study Strategies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {studyStrategies.map((strategy, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{strategy.category}</h4>
                <ul className="space-y-2">
                  {strategy.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Effective Revision Techniques</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {revisionTechniques.map((item, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{item.technique}</h4>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="bg-elec-yellow/10 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-elec-yellow">Example:</strong> {item.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Free Study Resources</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {freeResources.map((item, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-white">{item.resource}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow w-fit">
                    {item.access}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Study Schedule Template</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Daily Routine (30-45 minutes)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 10 mins: Review yesterday's notes</li>
                <li>• 20 mins: New material or practice questions</li>
                <li>• 10 mins: Quick quiz or flashcards</li>
                <li>• 5 mins: Plan tomorrow's session</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Weekly Goals</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Monday: New regulations/theory</li>
                <li>• Tuesday: Calculations practice</li>
                <li>• Wednesday: Review and consolidate</li>
                <li>• Thursday: Mock exam questions</li>
                <li>• Friday: Weekend revision planning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300">Success Mindset</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Remember: consistent daily study beats cramming every time. 30 minutes every day 
            for 3 months is better than 8-hour sessions the week before your exam. 
            The electrical trade rewards methodical, steady progress - apply that same 
            approach to your studies.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyTips;
