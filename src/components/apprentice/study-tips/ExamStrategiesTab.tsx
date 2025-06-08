
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, BookOpen, Calculator } from "lucide-react";

const ExamStrategiesTab = () => {
  const examTypes = [
    {
      title: "18th Edition Exam",
      icon: BookOpen,
      color: "border-blue-500/20 bg-blue-500/10",
      iconColor: "text-blue-400",
      strategies: [
        {
          strategy: "Focus on Part 4 (Protection for Safety)",
          description: "This section is heavily tested and forms the foundation of electrical safety",
          tips: ["Learn Table 41.3 by heart", "Understand discrimination principles", "Practice shock protection scenarios"]
        },
        {
          strategy: "Master Cable Calculations",
          description: "Cable sizing appears in multiple question formats",
          tips: ["Practice current-carrying capacity", "Understand derating factors", "Learn correction factors table"]
        },
        {
          strategy: "Use References Effectively",
          description: "Learn to navigate BS 7671 and On-Site Guide quickly",
          tips: ["Practice finding regulations fast", "Use index efficiently", "Mark key pages with tabs"]
        }
      ]
    },
    {
      title: "Level 3 Theory",
      icon: Calculator,
      color: "border-yellow-500/20 bg-yellow-500/10",
      iconColor: "text-yellow-400",
      strategies: [
        {
          strategy: "Understand, Don't Memorise",
          description: "Focus on understanding concepts rather than rote learning formulas",
          tips: ["Draw circuit diagrams", "Work through derivations", "Connect theory to practical work"]
        },
        {
          strategy: "Three-Phase Calculations",
          description: "Master the relationship between line and phase values",
          tips: ["Practice star-delta conversions", "Understand power triangles", "Learn phasor diagrams"]
        },
        {
          strategy: "AC Theory Foundation",
          description: "Build strong understanding of AC fundamentals",
          tips: ["Master RLC circuits", "Understand impedance", "Practice resonance calculations"]
        }
      ]
    }
  ];

  const examTechniques = [
    {
      technique: "Question Analysis",
      description: "Read questions carefully and identify what's being asked",
      steps: ["Read the question twice", "Identify key information", "Determine what formula/method to use", "Check units in the answer"]
    },
    {
      technique: "Time Management",
      description: "Allocate time effectively during the exam",
      steps: ["Spend 1-2 minutes per mark", "Skip difficult questions initially", "Return to review answers", "Leave time for checking"]
    },
    {
      technique: "Show Your Working",
      description: "Even if the final answer is wrong, you can get partial marks",
      steps: ["Write down the formula", "Show substitution clearly", "Include units at each step", "Circle your final answer"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Exam-Specific Strategies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {examTypes.map((exam, index) => {
              const IconComponent = exam.icon;
              return (
                <div key={index} className={`border rounded-lg p-6 ${exam.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className={`h-6 w-6 ${exam.iconColor}`} />
                    <h3 className="text-xl font-semibold text-white">{exam.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {exam.strategies.map((strategy, strategyIndex) => (
                      <div key={strategyIndex} className="bg-black/20 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">{strategy.strategy}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {strategy.tips.map((tip, tipIndex) => (
                            <Badge key={tipIndex} variant="outline" className="text-xs border-white/20">
                              {tip}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">General Exam Techniques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examTechniques.map((technique, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{technique.technique}</h4>
                <p className="text-sm text-muted-foreground mb-3">{technique.description}</p>
                <ol className="space-y-1">
                  {technique.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow font-medium">{stepIndex + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamStrategiesTab;
